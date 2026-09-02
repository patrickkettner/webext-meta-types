/**
 * WORKPLAN CAN-005: a losing name (CAN-002/CAN-003's derivation) must not
 * survive anywhere the merger could reach it, and no slot may still
 * disagree. Three checks, independent of each other:
 *
 * 1. Leak: a losing name still appears under dist/ (as its own declaration,
 *    a bare reference, or a qualified one), scoped to its own namespace.
 * 2. Unconverged slot: rebuild the IR, apply the recorded canonical names,
 *    re-run collectSlots(); a slot still holding two or more distinct names
 *    has drifted from upstream since derive-names.ts last ran. Curated
 *    `ignore` and `distinct` verdicts are applied as deriveCanonicalNames()
 *    applies them; `accept` never bears on a slot collision. Works from
 *    source alone; checks 1 and 3 are the ones `--dist <dir>` redirects.
 * 3. Runtime claim (CLAUDE.md rule 9): an emitted `@supported` tag must name
 *    a browser that actually declares that element upstream.
 *
 * Usage: npx tsx scripts/verify-names.ts [--dist <dir>]
 */
import { Node, Project, ModuleDeclaration, SourceFile, SyntaxKind } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  buildIr,
  reconcileStructuralForms,
  applyCanonicalNames,
  loadCanonicalNames,
  type BrowserId,
  type IRNamespace,
  type MergeIssue,
} from "../src/generator";
import { collectSlots, type DerivedRow, type CuratedVerdicts } from "../src/canonical-names";

const CANONICAL_NAMES_FILE = "canonical-names-derived.json";
const CURATED_FILE = "canonical-names-curated.json";

function parseArgs(): { distDir: string } {
  const i = process.argv.indexOf("--dist");
  const distDir = i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : "dist";
  return { distDir };
}

function loadCurated(file = CURATED_FILE): CuratedVerdicts {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as CuratedVerdicts;
}

// Check 1. Losing names must not appear under dist/.

export interface LeakHit {
  file: string;
  line: number;
  namespace: string;
  name: string;
  kind: "interface declaration" | "type declaration" | "bare reference" | "qualified reference";
}

/**
 * namespace -> losing names in it. A losing row is one the derivation did not
 * hand-verdict (`basis !== "verdict"`) and whose name differs from the
 * canonical it lost to. A deferred namespace has no losing column yet
 * (nothing there has been renamed, so its own names are not leaks) and is
 * excluded, same as `loadCanonicalNames()` excludes it from `renames`.
 */
export function losingNamesByNamespace(doc: {
  derived: DerivedRow[];
  deferred: Array<{ namespace: string }>;
}): Map<string, Set<string>> {
  const deferredNs = new Set(doc.deferred.map((d) => d.namespace));
  const out = new Map<string, Set<string>>();
  for (const row of doc.derived) {
    if (row.basis === "verdict") continue;
    if (row.name === row.canonical) continue;
    if (deferredNs.has(row.namespace)) continue;
    if (!out.has(row.namespace)) out.set(row.namespace, new Set());
    out.get(row.namespace)!.add(row.name);
  }
  return out;
}

function stripWrapper(text: string): string {
  return text.replace(/^(chrome|browser)\./, "");
}

/** One dist artifact, scoped per namespace to that namespace's own losing names. */
function checkDistFile(filePath: string, losingByNs: Map<string, Set<string>>): LeakHit[] {
  const hits: LeakHit[] = [];
  if (!fs.existsSync(filePath)) return hits;
  const project = new Project();
  const sf = project.addSourceFileAtPath(filePath);

  function walk(mod: ModuleDeclaration) {
    const nsName = mod.getName();
    const losing = losingByNs.get(nsName);
    if (losing && losing.size > 0) {
      for (const iface of mod.getInterfaces()) {
        if (losing.has(iface.getName())) {
          hits.push({ file: filePath, line: iface.getStartLineNumber(), namespace: nsName, name: iface.getName(), kind: "interface declaration" });
        }
      }
      for (const alias of mod.getTypeAliases()) {
        if (losing.has(alias.getName())) {
          hits.push({ file: filePath, line: alias.getStartLineNumber(), namespace: nsName, name: alias.getName(), kind: "type declaration" });
        }
      }
      for (const ref of mod.getDescendantsOfKind(SyntaxKind.TypeReference)) {
        const text = stripWrapper(ref.getTypeName().getText());
        if (losing.has(text)) {
          hits.push({ file: filePath, line: ref.getStartLineNumber(), namespace: nsName, name: text, kind: "bare reference" });
          continue;
        }
        const prefix = `${nsName}.`;
        if (text.startsWith(prefix) && losing.has(text.slice(prefix.length))) {
          hits.push({ file: filePath, line: ref.getStartLineNumber(), namespace: nsName, name: text.slice(prefix.length), kind: "qualified reference" });
        }
      }
    }
    for (const sub of mod.getModules()) walk(sub);
  }

  for (const mod of sf.getModules()) walk(mod);
  return hits;
}

export function checkDistLeaks(distDir: string, losingByNs: Map<string, Set<string>>): LeakHit[] {
  const files = ["index.d.ts", "chrome-only.d.ts", "firefox-only.d.ts", "safari-only.d.ts"];
  return files.flatMap((f) => checkDistFile(path.join(distDir, f), losingByNs));
}

// Check 2. Every slot converges to one name per browser (per arity).

export interface SlotCollision {
  namespace: string;
  kind: string;
  label: string;
  /** "" or "[]", per CAN-002's arity split. */
  arity: "" | "[]";
  names: Map<BrowserId, string[]>;
}

/**
 * name -> its curated-rename canonical, within one namespace. Only
 * `_UpdateRegisteredUserScript` -> `UpdateRegisteredUserScript` exists today;
 * this is what lets a `distinct` pair written against the pre-rename name
 * still match the post-`applyCanonicalNames` IR checkSlotCollisions sees.
 */
function renameTranslation(curated: CuratedVerdicts): (namespace: string, name: string) => string {
  const map = new Map<string, string>();
  for (const r of curated.rename ?? []) map.set(`${r.namespace} ${r.name}`, r.canonical);
  return (namespace, name) => map.get(`${namespace} ${name}`) ?? name;
}

export function checkSlotCollisions(
  ir: Map<string, IRNamespace>,
  deferred: ReadonlySet<string>,
  curated: CuratedVerdicts = {}
): { collisions: SlotCollision[]; checked: number; suppressed: Array<{ namespace: string; label: string; reason: string }> } {
  const translate = renameTranslation(curated);
  const ignored = new Set((curated.ignore ?? []).map((i) => `${i.namespace} ${i.slot} ${i.browser}`));
  const distinctPairs = new Set<string>();
  for (const d of curated.distinct ?? []) {
    const a = translate(d.namespace, d.names[0]);
    const b = translate(d.namespace, d.names[1]);
    distinctPairs.add(`${d.namespace} ${a} ${b}`);
    distinctPairs.add(`${d.namespace} ${b} ${a}`);
  }

  const { slots } = collectSlots(ir);
  const collisions: SlotCollision[] = [];
  const suppressed: Array<{ namespace: string; label: string; reason: string }> = [];
  let checked = 0;
  for (const slot of slots) {
    if (deferred.has(slot.namespace)) continue;
    checked++;
    for (const arity of ["", "[]"] as const) {
      const perBrowser = new Map<BrowserId, string[]>();
      const distinctNames = new Set<string>();
      let ignoredSome = false;
      const rawDistinctCount = new Set<string>();
      for (const [b, names] of slot.names) {
        const matching = [...names].filter((n) => n.endsWith("[]") === (arity === "[]"));
        for (const n of matching) rawDistinctCount.add(n);
        if (ignored.has(`${slot.namespace} ${slot.label} ${b}`)) { if (matching.length) ignoredSome = true; continue; }
        if (matching.length === 0) continue;
        perBrowser.set(b, matching);
        for (const n of matching) distinctNames.add(n);
      }
      if (distinctNames.size < 2) {
        if (ignoredSome && rawDistinctCount.size >= 2) {
          suppressed.push({ namespace: slot.namespace, label: `${slot.kind} ${slot.label}${arity}`, reason: "curated ignore" });
        }
        continue;
      }

      // Every pair among the live names is a curated `distinct` verdict: the
      // disagreement is settled, not a bug. (A partial cover, some pairs
      // curated and one not, still reports, same as deriveCanonicalNames
      // only skipping the covered pair's union.)
      const names = [...distinctNames];
      const bare = (n: string) => n.replace(/\[\]$/, "");
      const allPairsCurated = names.every((a, ai) =>
        names.every((b, bi) => ai >= bi || distinctPairs.has(`${slot.namespace} ${bare(a)} ${bare(b)}`)));
      if (allPairsCurated) {
        suppressed.push({ namespace: slot.namespace, label: `${slot.kind} ${slot.label}${arity}`, reason: "curated distinct" });
        continue;
      }

      collisions.push({ namespace: slot.namespace, kind: slot.kind, label: slot.label, arity, names: perBrowser });
    }
  }
  return { collisions, checked, suppressed };
}

// Check 3. Every emitted name is a runtime availability claim (CLAUDE.md rule 9).
//
// A declaration tagged `@supported X` says a running X exposes that name.
// Two shapes carry that claim at the namespace level and neither is checked
// anywhere else: `export namespace X { ... }` in dist/index.d.ts, whose
// members' `@supported` tags union to a browser set for X itself, and each
// `export import Y = chrome.X;` alias inside `declare namespace browser`,
// which claims `browser.Y` for the same set. This reads the three raw
// upstream packages fresh (not the generator's IR, which has already run
// relocations and exclusions) to answer one question per (namespace,
// browser) pair: does that browser's own package declare this name at all.

const BROWSER_LABEL_TO_ID: Record<string, BrowserId> = { Chrome: "chrome", Firefox: "firefox", Safari: "safari" };

/**
 * Namespace name (dotted, e.g. "devtools.inspectedWindow") -> browsers whose
 * own upstream package declares a namespace by that exact name.
 *
 * chrome-types and @types/firefox-webext-browser both declare every
 * namespace as one flat dotted top-level module (`export namespace
 * devtools.inspectedWindow { ... }` in chrome-types, `declare namespace
 * browser.devtools.inspectedWindow { ... }` in Firefox's package; there are
 * none this deep today, but the form exists). Safari's package
 * nests real `namespace X { ... }` blocks inside its own `declare namespace
 * browser { ... }`, and separately aliases more names via `export import X =
 * ...` (used both inside its internal `chrome` mirror block for
 * browserAction/pageAction/contextMenus, and it is the same shape
 * derive-names.ts's alias-group scan already reads for those three).
 */
export function upstreamDeclaredNamespaces(): Map<string, Set<BrowserId>> {
  const out = new Map<string, Set<BrowserId>>();
  const add = (name: string, b: BrowserId) => {
    if (!out.has(name)) out.set(name, new Set());
    out.get(name)!.add(b);
  };

  {
    const project = new Project();
    project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
    const chrome = project.getSourceFileOrThrow("index.d.ts").getModuleOrThrow("chrome");
    for (const m of chrome.getModules()) {
      add(m.getName(), "chrome");
      // chrome-types sometimes models a sub-API as `export const network: {
      // ...typed members... }` where Firefox declares a real sub-namespace
      // (`privacy.network`, `privacy.services`, `privacy.websites`:
      // node_modules/chrome-types/index.d.ts:16868 vs. @types/firefox-webext
      // -browser/index.d.ts:3992). Decision 14's reconcileStructuralForms
      // (src/generator.ts) treats these as the same namespace on purpose, so
      // this check must too, or every such reconciled namespace would read
      // as a false rule-9 violation on real, already-ruled output.
      for (const v of m.getVariableStatements()) {
        for (const decl of v.getDeclarations()) {
          const t = decl.getTypeNode();
          if (t && Node.isTypeLiteral(t) && t.getMembers().length > 0) {
            add(`${m.getName()}.${decl.getName()}`, "chrome");
          }
        }
      }
    }
  }
  {
    const project = new Project();
    project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
    const sf = project.getSourceFileOrThrow("index.d.ts");
    for (const m of sf.getModules()) {
      const name = m.getName();
      if (name === "browser" || name.startsWith("browser.")) {
        add(name === "browser" ? "" : name.slice("browser.".length), "firefox");
      }
    }
  }
  {
    const project = new Project();
    project.addSourceFilesAtPaths("node_modules/safari-webextension-types/index.d.ts");
    const sf = project.getSourceFileOrThrow("index.d.ts");
    const browserMod = sf.getModules().find((m) => m.getName() === "browser");
    if (browserMod) {
      for (const m of browserMod.getModules()) add(m.getName(), "safari");

      // WebKit's own IDL splits a sub-API into an `interface Foo { ... }`
      // plus a `const foo: Foo` instance, where Chrome and Firefox declare a
      // real sub-namespace (`devtools.inspectedWindow`, `.network`,
      // `.panels`: safari-webextension-types/index.d.ts's `devtools` name is
      // declaration-merged from two separate blocks, one with the
      // `InspectedWindow`/`Network`/`Panels` interfaces, one with the
      // `inspectedWindow`/`network`/`panels` consts of those types, so the
      // interface and its instance are gathered across every occurrence of
      // the namespace, not just one. INT-020 (WORKPLAN.md) rules this the
      // same namespace; this check must agree or it flags already-ruled,
      // correct output.
      const byName = new Map<string, ModuleDeclaration[]>();
      for (const m of browserMod.getModules()) {
        if (!byName.has(m.getName())) byName.set(m.getName(), []);
        byName.get(m.getName())!.push(m);
      }
      for (const [name, occurrences] of byName) {
        const ifaceNames = new Set(occurrences.flatMap((m) => m.getInterfaces().map((i) => i.getName())));
        for (const decl of occurrences.flatMap((m) => m.getVariableStatements()).flatMap((v) => v.getDeclarations())) {
          const t = decl.getTypeNode();
          const qualified = t && Node.isTypeReference(t) ? t.getTypeName().getText() : undefined;
          const typeName = qualified?.split(".").at(-1);
          if (typeName && ifaceNames.has(typeName)) add(`${name}.${decl.getName()}`, "safari");
        }
      }
    }
    const walkImports = (node: SourceFile | ModuleDeclaration) => {
      for (const st of node.getStatements()) {
        if (Node.isImportEqualsDeclaration(st)) add(st.getName(), "safari");
      }
      for (const mod of node.getModules()) walkImports(mod);
    };
    walkImports(sf);
  }
  return out;
}

/** Every browser named on an `@supported` tag anywhere inside `mod` (dist's namespace blocks do not nest, so this never crosses into a different namespace). */
function supportedBrowsersIn(mod: ModuleDeclaration): Set<BrowserId> {
  const out = new Set<BrowserId>();
  for (const doc of mod.getDescendantsOfKind(SyntaxKind.JSDoc)) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() !== "supported") continue;
      for (const label of (tag.getCommentText() ?? "").split(",").map((s) => s.trim()).filter(Boolean)) {
        const id = BROWSER_LABEL_TO_ID[label];
        if (id) out.add(id);
      }
    }
  }
  return out;
}

export interface Rule9Violation {
  kind: "namespace" | "alias";
  /** The namespace the claim is about: X for a namespace check, Y (the alias name) for an alias check. */
  namespace: string;
  browser: BrowserId;
  reason: string;
}

export function checkRule9(distDir: string): Rule9Violation[] {
  const violations: Rule9Violation[] = [];
  const indexPath = path.join(distDir, "index.d.ts");
  if (!fs.existsSync(indexPath)) return violations;

  const project = new Project();
  const sf = project.addSourceFileAtPath(indexPath);
  const declared = upstreamDeclaredNamespaces();

  // dist mirrors chrome-types' own shape: `declare namespace chrome { export
  // namespace X { ... } ... }`, one flat (possibly dotted) namespace per
  // module nested one level inside `chrome`. `declare namespace browser {
  // export import Y = chrome.X; ... }` sits beside it at the top level.
  const chromeBlock = sf.getModuleOrThrow("chrome");

  // Every `export namespace X { ... }` whose members carry an @supported set.
  const supportedByNs = new Map<string, Set<BrowserId>>();
  for (const mod of chromeBlock.getModules()) {
    const supported = supportedBrowsersIn(mod);
    if (supported.size === 0) continue;
    supportedByNs.set(mod.getName(), supported);
    for (const b of supported) {
      if (!declared.get(mod.getName())?.has(b)) {
        violations.push({
          kind: "namespace", namespace: mod.getName(), browser: b,
          reason: `dist tags ${mod.getName()} @supported ${b}, but ${b}'s own upstream package declares no namespace called ${mod.getName()}`,
        });
      }
    }
  }

  // Every `export import Y = chrome.X;` inside `declare namespace browser`:
  // the claim is X's own @supported set, made about the name Y under
  // `browser`, so both Y and X must exist in each tagged browser's upstream.
  const browserBlock = sf.getModules().find((m) => m.getName() === "browser");
  if (browserBlock) {
    for (const st of browserBlock.getStatements()) {
      if (!Node.isImportEqualsDeclaration(st)) continue;
      const y = st.getName();
      const x = st.getModuleReference().getText().replace(/^chrome\./, "");
      const supported = supportedByNs.get(x) ?? new Set<BrowserId>();
      for (const b of supported) {
        if (!declared.get(x)?.has(b)) {
          violations.push({
            kind: "alias", namespace: y, browser: b,
            reason: `browser.${y} = chrome.${x} is tagged ${b} (from ${x}'s own @supported set), but ${b}'s upstream declares no namespace called ${x}`,
          });
        } else if (y !== x && !declared.get(y)?.has(b)) {
          violations.push({
            kind: "alias", namespace: y, browser: b,
            reason: `browser.${y} = chrome.${x} is tagged ${b} (from ${x}'s own @supported set), but ${b}'s upstream declares no namespace called ${y}`,
          });
        }
      }
    }
  }

  return violations;
}

// Main.

function main(): void {
  const { distDir } = parseArgs();
  let hasFailure = false;

  const rawDoc = JSON.parse(fs.readFileSync(CANONICAL_NAMES_FILE, "utf8")) as {
    derived: DerivedRow[];
    deferred: Array<{ namespace: string; reason: string }>;
  };
  const losingByNs = losingNamesByNamespace(rawDoc);
  const totalLosing = [...losingByNs.values()].reduce((n, s) => n + s.size, 0);

  console.log(`=== Check 1: losing names must not appear under ${distDir}/ ===`);
  console.log(`Losing (namespace, name) pairs: ${totalLosing} across ${losingByNs.size} namespace(s); ${rawDoc.deferred.length} namespace(s) deferred and skipped`);
  const leaks = checkDistLeaks(distDir, losingByNs);
  for (const h of leaks) {
    console.log(`  ✗ ${h.file}:${h.line}  ${h.namespace}.${h.name}  [${h.kind}]`);
    hasFailure = true;
  }
  console.log(`Leaks: ${leaks.length}`);

  console.log(`\n=== Check 2: every slot converges to one name per contributor, post-applyCanonicalNames ===`);
  const ir = buildIr();
  reconcileStructuralForms(ir, []);
  const canonMap = loadCanonicalNames(CANONICAL_NAMES_FILE);
  const applyIssues: MergeIssue[] = [];
  applyCanonicalNames(ir, canonMap, applyIssues);
  const curated = loadCurated();
  const { collisions, checked, suppressed } = checkSlotCollisions(ir, canonMap.deferred, curated);
  for (const s of suppressed) {
    console.log(`  (ok, curated) ${s.namespace} ${s.label}  [${s.reason}]`);
  }
  for (const c of collisions) {
    const perBrowser = [...c.names.entries()].map(([b, ns]) => `${b}: ${ns.join("|")}`).join("  ");
    console.log(`  ✗ ${c.namespace} ${c.kind} ${c.label}${c.arity ? " (array)" : ""}  ${perBrowser}`);
    hasFailure = true;
  }
  console.log(`Slots checked: ${checked}; curated-suppressed: ${suppressed.length}; collisions: ${collisions.length}`);
  if (applyIssues.length) {
    console.log(`applyCanonicalNames left ${applyIssues.length} rename(s) unapplied (shape/kind conflict); see dist/merge-issues.json after a build`);
  }

  console.log(`\n=== Check 3: every @supported browser on a namespace or browser.* alias is one whose own upstream declares it (CLAUDE.md rule 9) ===`);
  const rule9 = checkRule9(distDir);
  for (const v of rule9) {
    console.log(`  ✗ [${v.kind}] ${v.namespace} / ${v.browser}: ${v.reason}`);
    hasFailure = true;
  }
  console.log(`Rule 9 violations: ${rule9.length}`);

  if (hasFailure) {
    console.error(
      `\nFAIL: verify:names found ${leaks.length} leaked losing name(s), ${collisions.length} slot collision(s), ` +
      `and ${rule9.length} rule 9 violation(s).`
    );
    process.exit(1);
  }
  console.log(
    `\nOK: ${totalLosing} losing name(s) checked absent from dist/, ${checked} slot(s) carry one name per contributor, ` +
    `0 rule 9 violations.`
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
