/**
 * Research-only analysis of safari-webextension-types against the existing
 * Chrome/Firefox IR, to size the work of making Safari a first-class browser.
 *
 * Run from the webext-meta-types root:
 *   SAFARI_DTS=../safari-webextension-types/index.d.ts npx tsx analyze-safari.ts
 */
import fs from "fs";
import { Project, Node, SyntaxKind, SourceFile, ModuleDeclaration } from "ts-morph";
import { parseSource, reconcileStructuralForms, hasSource, type IRNamespace } from "./src/generator";

const SAFARI_DTS = process.env.SAFARI_DTS || "../safari-webextension-types/index.d.ts";
const outDir = process.env.OUT_DIR || ".";

// ---------------------------------------------------------------- Chrome/FF IR
function buildCrossIr(): Map<string, IRNamespace> {
  const project = new Project();
  project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
  const chromeNs = project.getSourceFileOrThrow("index.d.ts").getModuleOrThrow("chrome");
  project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
  const ffFile = project
    .getSourceFiles()
    .filter((f) => f.getFilePath().includes("firefox-webext-browser"))[0];
  const ir = new Map<string, IRNamespace>();
  parseSource(chromeNs, "chrome", ir);
  parseSource(ffFile, "firefox", ir);
  reconcileStructuralForms(ir, []);
  return ir;
}

const crossIr = buildCrossIr();

/** element name -> namespaces that declare it, per browser */
const crossIndex = new Map<string, { chrome: string[]; firefox: string[] }>();
for (const [nsName, ns] of crossIr) {
  for (const [elName, el] of ns.elements) {
    if (!crossIndex.has(elName)) crossIndex.set(elName, { chrome: [], firefox: [] });
    const rec = crossIndex.get(elName)!;
    if (hasSource(el, "chrome")) rec.chrome.push(nsName);
    if (hasSource(el, "firefox")) rec.firefox.push(nsName);
  }
}

// ------------------------------------------------------------------- Safari IR
const safariProject = new Project();
const safariFile: SourceFile = safariProject.addSourceFileAtPath(SAFARI_DTS);
const browserNs = safariFile.getModuleOrThrow("browser");
const chromeAliasNs = safariFile.getModule("chrome");

interface SafariEl {
  name: string;
  kind: string;
  namespace: string; // "" for top-level browser.*
  text: string;
  typeParams: number;
}

const safariEls: SafariEl[] = [];

function kindOf(st: Node): string {
  if (Node.isInterfaceDeclaration(st)) return "interface";
  if (Node.isTypeAliasDeclaration(st)) return "type";
  if (Node.isFunctionDeclaration(st)) return "function";
  if (Node.isVariableStatement(st)) return "variable";
  if (Node.isEnumDeclaration(st)) return "enum";
  if (Node.isClassDeclaration(st)) return "class";
  if (Node.isModuleDeclaration(st)) return "namespace";
  return "other";
}

function walk(mod: ModuleDeclaration, prefix: string) {
  for (const st of mod.getStatements()) {
    if (Node.isModuleDeclaration(st)) {
      const name = st.getName().replace(/['"]/g, "");
      walk(st, prefix ? `${prefix}.${name}` : name);
      continue;
    }
    const kind = kindOf(st);
    const names: string[] = [];
    let typeParams = 0;
    if (Node.isVariableStatement(st)) {
      for (const d of st.getDeclarations()) names.push(d.getName());
    } else {
      const g = (st as unknown as { getName?: () => string | undefined }).getName;
      const n = typeof g === "function" ? g.call(st) : undefined;
      if (n) names.push(n);
      const tp = (st as unknown as { getTypeParameters?: () => unknown[] }).getTypeParameters;
      if (typeof tp === "function") typeParams = tp.call(st).length;
    }
    for (const n of names) {
      safariEls.push({ name: n, kind, namespace: prefix, text: st.getText(), typeParams });
    }
  }
}

walk(browserNs, "");

// ------------------------------------------------------------------- reporting
const safariNamespaces = new Map<string, SafariEl[]>();
for (const el of safariEls) {
  const key = el.namespace || "(top-level browser)";
  if (!safariNamespaces.has(key)) safariNamespaces.set(key, []);
  safariNamespaces.get(key)!.push(el);
}

const topLevel = safariEls.filter((e) => e.namespace === "");
const namespaced = safariEls.filter((e) => e.namespace !== "");

// Where would Chrome/Firefox put each top-level Safari type?
interface Relocation {
  name: string;
  kind: string;
  chromeNamespaces: string[];
  firefoxNamespaces: string[];
  verdict: string;
}
const relocations: Relocation[] = [];
for (const el of topLevel) {
  const hit = crossIndex.get(el.name);
  const c = hit?.chrome ?? [];
  const f = hit?.firefox ?? [];
  let verdict: string;
  if (!hit) verdict = "safari-only name: needs a namespace decision";
  else if (c.length === 1 && f.length === 1 && c[0] === f[0]) verdict = `relocate to \`${c[0]}\``;
  else if (c.length === 1 && f.length === 0) verdict = `relocate to \`${c[0]}\` (chrome-only name)`;
  else if (f.length === 1 && c.length === 0) verdict = `relocate to \`${f[0]}\` (firefox-only name)`;
  else verdict = `ambiguous: declared in ${[...new Set([...c, ...f])].join(", ")}`;
  relocations.push({ name: el.name, kind: el.kind, chromeNamespaces: c, firefoxNamespaces: f, verdict });
}

// Namespace-level comparison
const crossNsNames = new Set(crossIr.keys());
const safariNsNames = new Set(namespaced.map((e) => e.namespace));
const safariOnlyNs = [...safariNsNames].filter((n) => !crossNsNames.has(n)).sort();
const sharedNs = [...safariNsNames].filter((n) => crossNsNames.has(n)).sort();
const missingInSafariNs = [...crossNsNames].filter((n) => !safariNsNames.has(n) && !n.startsWith("_")).sort();

// Element-level comparison inside shared namespaces
interface NsCompare {
  namespace: string;
  safariCount: number;
  crossCount: number;
  safariOnly: string[];
  missingInSafari: string[];
  shared: string[];
}
const nsCompares: NsCompare[] = [];
for (const ns of sharedNs) {
  const sEls = new Set(namespaced.filter((e) => e.namespace === ns).map((e) => e.name));
  const cEls = new Set([...(crossIr.get(ns)?.elements.keys() ?? [])]);
  nsCompares.push({
    namespace: ns,
    safariCount: sEls.size,
    crossCount: cEls.size,
    safariOnly: [...sEls].filter((n) => !cEls.has(n)).sort(),
    missingInSafari: [...cEls].filter((n) => !sEls.has(n) && !n.startsWith("_")).sort(),
    shared: [...sEls].filter((n) => cEls.has(n)).sort(),
  });
}

// Hygiene checks on the Safari output
const anyCount = safariFile.getDescendantsOfKind(SyntaxKind.AnyKeyword).length;
const neverArgs = (safariFile.getFullText().match(/\(\.\.\.args:\s*never\[\]\)/g) ?? []).length;
const promiseSigs = (safariFile.getFullText().match(/:\s*Promise</g) ?? []).length;
const callbackSigs = (safariFile.getFullText().match(/callback[?]?:\s*\(/g) ?? []).length;

const aliasPairs: Array<[string, string]> = [];
if (chromeAliasNs) {
  for (const st of chromeAliasNs.getStatements()) {
    const m = st.getText().match(/export import (\w+)\s*=\s*browser\.(\w+);/);
    if (m) aliasPairs.push([m[1], m[2]]);
  }
}

const report = {
  safari: {
    totalElements: safariEls.length,
    topLevelElements: topLevel.length,
    namespacedElements: namespaced.length,
    namespaces: [...safariNsNames].sort(),
    namespaceCount: safariNsNames.size,
    anyCount,
    neverArgsEventConstraints: neverArgs,
    promiseSignatures: promiseSigs,
    callbackSignatures: callbackSigs,
    chromeAliasPairs: aliasPairs,
    aliasRenames: aliasPairs.filter(([a, b]) => a !== b),
  },
  namespaceComparison: {
    sharedWithChromeFirefox: sharedNs,
    safariOnly: safariOnlyNs,
    presentInChromeFirefoxButNotSafari: missingInSafariNs,
  },
  topLevelRelocations: relocations,
  perNamespace: nsCompares,
};

fs.writeFileSync(`${outDir}/safari-surface-analysis.json`, JSON.stringify(report, null, 2));

console.log(`Safari elements: ${safariEls.length} (top-level ${topLevel.length}, namespaced ${namespaced.length})`);
console.log(`Safari namespaces (${safariNsNames.size}): ${[...safariNsNames].sort().join(", ")}`);
console.log(`\nSafari 'any' count: ${anyCount}  | never[] event constraints: ${neverArgs}`);
console.log(`Promise signatures: ${promiseSigs} | callback signatures: ${callbackSigs}`);
console.log(`\nchrome alias renames: ${report.safari.aliasRenames.map(([a, b]) => `${a}->${b}`).join(", ")}`);

console.log(`\n--- namespaces shared with chrome/firefox (${sharedNs.length}) ---\n  ${sharedNs.join(", ")}`);
console.log(`\n--- safari-only namespaces (${safariOnlyNs.length}) ---\n  ${safariOnlyNs.join(", ") || "(none)"}`);
console.log(`\n--- in chrome/firefox but NOT safari (${missingInSafariNs.length}) ---\n  ${missingInSafariNs.join(", ")}`);

const reloc = new Map<string, number>();
for (const r of relocations) reloc.set(r.verdict.split(" ")[0], (reloc.get(r.verdict.split(" ")[0]) ?? 0) + 1);
console.log(`\n--- top-level relocation verdicts (${relocations.length} types) ---`);
for (const [k, v] of [...reloc].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
