/**
 * Derive one name per concept per namespace, instead of curating it.
 *
 * `action.getTitle` takes `TabDetails` in Chrome, `Details` in Firefox and
 * `ActionDetails` in Safari. The merger matches by exact name, so all three
 * ship, each tagged with one browser, while the concept is supported by all.
 * This script finds every such group by the slot the names share (WORKPLAN
 * CAN-002) and picks the surviving name by the CAN-001 order among the
 * browsers that contribute one. The rules live in src/canonical-names.ts.
 *
 * Inputs:  the three upstream packages, through buildIr(), with structural
 *          forms reconciled and NO patches applied: the derivation cites
 *          upstream declarations, never our overrides.
 *          canonical-names-curated.json, the hand verdicts (CAN-007).
 * Output:  canonical-names-derived.json, one row per (namespace, browser, name).
 *
 * Anything unresolved exits non-zero: a group one browser splits into two
 * shapes, a curated pair that still meets, a de-prefixed Safari name that
 * collides. Each has to be argued for in the curated file, not guessed here.
 *
 * A single pass over the raw IR misses a member slot inside an interface
 * that only becomes multi-browser after a first-order rename unifies its
 * containing declaration: collectSlots only scans an interface's members
 * when `browsersOf(el).length > 1` already, so a member slot like
 * declarativeNetRequest's `RuleCondition.domainType` is invisible until
 * `RuleCondition` itself has one name across browsers. So this script
 * iterates: derive on the current IR, apply the rename rows found so far to
 * a fresh working copy (never the IR `buildIr()` returned, in case a caller
 * keeps that reference), re-collect and derive again, and stop the first
 * time a pass finds nothing the accumulated rows don't already cover. Each
 * row is tagged with the pass that found it. A curated verdict is static
 * across passes and is honoured identically on every one of them.
 *
 * Usage: npx tsx scripts/derive-names.ts
 */
import fs from "fs";
import { Node, Project, type ModuleDeclaration, type SourceFile } from "ts-morph";
import { buildIr, reconcileStructuralForms, applyCanonicalNames, readChromeChannels, type CanonicalNameMap, type MergeIssue } from "../src/generator";
import { deriveCanonicalNames, type CuratedVerdicts, type DeriveOptions, type DerivedRow, type Group } from "../src/canonical-names";

const CURATED = "canonical-names-curated.json";
const OUT = "canonical-names-derived.json";
const MAX_PASSES = 10;

const ir = buildIr();
reconcileStructuralForms(ir, []);

const curated: CuratedVerdicts = fs.existsSync(CURATED)
  ? JSON.parse(fs.readFileSync(CURATED, "utf8"))
  : {};

// A browser votes only with what it ships to stable. chrome-types marks a
// namespace it ships to the dev channel alone with `@chrome-channel dev` on
// the namespace's own doc block (dns, processes, sockets.*, system.network).
// Chrome's names in such a namespace still merge; they just do not win.
// Which namespaces are tagged is read once, by readChromeChannels
// (src/generator.ts), and shared with buildIr()'s own use of it; this walk
// exists only to attach a citation (file + line) to each hit.
const CHROME_TYPES = "node_modules/chrome-types/index.d.ts";
const noVote: NonNullable<DeriveOptions["noVote"]> = [];
{
  const project = new Project();
  project.addSourceFilesAtPaths(CHROME_TYPES);
  const chrome = project.getSourceFileOrThrow("index.d.ts").getModuleOrThrow("chrome");
  const channels = readChromeChannels(chrome);
  const walk = (m: ModuleDeclaration, prefix = "") => {
    for (const ns of m.getModules()) {
      const name = prefix + ns.getName();
      const channel = channels.get(name);
      if (channel) {
        noVote.push({ browser: "chrome", namespace: name,
                      citation: `@chrome-channel ${channel} (${CHROME_TYPES}:${ns.getStartLineNumber()})` });
      }
      walk(ns, name + ".");
    }
  };
  walk(chrome);
}

// Namespace -> group id, for namespaces Safari's package treats as aliases of
// each other: `export import contextMenus = browser.menus` in
// safari-webextension-types/index.d.ts means contextMenus and menus are one
// API under two names, so the concept inside them gets one canonical name
// too. Found the same way applyNamespaceAliases (src/generator.ts) finds
// them: every `export import X = browser.Y` ImportEqualsDeclaration,
// anywhere in the file including nested inside `declare namespace chrome {
// ... }`. An identity alias (`menus = browser.menus`, `action =
// browser.action`) joins a namespace to itself and is a no-op; only a pair
// with two different names produces a group of size 2+.
const SAFARI_TYPES = "node_modules/safari-webextension-types/index.d.ts";
const aliasGroups: Map<string, string> = (() => {
  const project = new Project();
  project.addSourceFilesAtPaths(SAFARI_TYPES);
  const file = project.getSourceFileOrThrow("index.d.ts");

  const parent = new Map<string, string>();
  const find = (x: string): string => {
    if (!parent.has(x)) parent.set(x, x);
    let r = x;
    while (parent.get(r) !== r) r = parent.get(r)!;
    let c = x;
    while (parent.get(c) !== r) { const next = parent.get(c)!; parent.set(c, r); c = next; }
    return r;
  };
  const union = (a: string, b: string) => {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  };
  const walk = (node: SourceFile | ModuleDeclaration) => {
    for (const st of node.getStatements()) {
      if (Node.isImportEqualsDeclaration(st)) {
        const target = st.getModuleReference().getText().replace(/^browser\./, "");
        union(st.getName(), target);
      }
    }
    for (const mod of node.getModules()) walk(mod);
  };
  walk(file);

  const components = new Map<string, Set<string>>();
  for (const n of parent.keys()) {
    const r = find(n);
    if (!components.has(r)) components.set(r, new Set());
    components.get(r)!.add(n);
  }
  const out = new Map<string, string>();
  for (const members of components.values()) {
    if (members.size < 2) continue; // identity alias only: not a real group
    const groupId = [...members].sort().join("+");
    for (const m of members) out.set(m, groupId);
  }
  return out;
})();

console.log("alias groups (from safari-webextension-types export import):");
{
  const byGroup = new Map<string, string[]>();
  for (const [ns, gid] of aliasGroups) (byGroup.get(gid) ?? byGroup.set(gid, []).get(gid)!).push(ns);
  for (const members of [...byGroup.values()].sort()) console.log(`  {${members.sort().join(", ")}}`);
}
console.log();

// Fixpoint over collectSlots + deriveCanonicalNames (CAN-002/CAN-005): a pass
// only sees the slots the current ir exposes, so a member slot that only
// becomes multi-browser after an earlier pass's rename is invisible until a
// later pass re-collects against the renamed ir. See the module comment.
type TaggedRow = DerivedRow & { pass: number };
const rowKey = (r: DerivedRow) => `${r.namespace} ${r.browser} ${r.name} ${r.canonical} ${r.basis}`;

const allRows: TaggedRow[] = [];
const allGroups: Group[] = [];
const seen = new Set<string>();
let currentIr = ir;
let last: ReturnType<typeof deriveCanonicalNames> | undefined;
// A slot is decided in the first pass that sees it undecided; decided slots
// carry forward via `aliasGroupSkipSlots`, and aliasGroupLeftovers is the
// union of every pass's leftovers. crossNamespace is read from pass 1 alone.
let firstPass: ReturnType<typeof deriveCanonicalNames> | undefined;
let passesRun = 0;
const mergeIssuesByPass = new Map<number, MergeIssue[]>();
const aliasGroupSkipSlots = new Set<string>();
const aliasGroupLeftovers: string[] = [];

// A curated-tagged unresolved message (the four templates in
// canonical-names.ts all contain the word "curated") only counts as real if
// it fails on every pass: once an earlier pass renames its subject away, a
// later pass can report "unresolved" for a reason unrelated to the curated
// verdict. A non-curated message (a genuine slot conflict) is real the
// moment any pass reports it.
const isCurated = (m: string) => m.includes("curated");
const curatedUnresolvedPerPass: Array<Set<string>> = [];
const nonCuratedUnresolved = new Set<string>();

for (let pass = 1; pass <= MAX_PASSES; pass++) {
  const passResult = deriveCanonicalNames(currentIr, curated, { noVote, aliasGroups, aliasGroupSkipSlots });
  last = passResult;
  if (pass === 1) firstPass = passResult;
  for (const key of passResult.aliasGroupConsidered) aliasGroupSkipSlots.add(key);
  // A slot a local group already settled this pass also collapses to one
  // name in the next pass's ir and looks like a fresh single-voter slot;
  // skip these too, the same protection aliasGroupConsidered gives, reached
  // through deriveCanonicalNames's own `canonicalAt` guard instead of the
  // single-voter loop.
  for (const g of passResult.groups) for (const s of g.slots) aliasGroupSkipSlots.add(`${g.namespace} ${s}`);
  aliasGroupLeftovers.push(...passResult.aliasGroupLeftovers);
  curatedUnresolvedPerPass.push(new Set(passResult.unresolved.filter(isCurated)));
  for (const m of passResult.unresolved) if (!isCurated(m)) nonCuratedUnresolved.add(m);
  const newRows = passResult.rows.filter((r) => !seen.has(rowKey(r)));

  if (pass > 1 && newRows.length === 0) {
    passesRun = pass - 1;
    break;
  }
  if (pass === MAX_PASSES) {
    console.error(
      `derive-names did not reach a fixpoint in ${MAX_PASSES} passes: pass ${MAX_PASSES} still found ` +
      `${newRows.length} new row(s) (${newRows.slice(0, 5).map((r) => `${r.namespace}.${r.name}`).join(", ")}${newRows.length > 5 ? ", ..." : ""})`
    );
    process.exit(1);
  }

  for (const r of newRows) { allRows.push({ ...r, pass }); seen.add(rowKey(r)); }
  allGroups.push(...passResult.groups);
  passesRun = pass;

  const renameMap: CanonicalNameMap = {
    renames: allRows.filter((r) => r.name !== r.canonical),
    deferred: new Set(passResult.deferred.map((d) => d.namespace)),
  };
  const nextIr = structuredClone(ir); // never mutate buildIr()'s own ir in place
  const issues: MergeIssue[] = [];
  applyCanonicalNames(nextIr, renameMap, issues);
  mergeIssuesByPass.set(pass, issues);
  currentIr = nextIr;
}

// Alias collapse and de-prefix (src/canonical-names.ts) run once here,
// after the fixpoint: a member slot like declarativeNetRequest.RuleActionType
// is still mid-unification on early passes and would be reported as a collision.
const finalPass = deriveCanonicalNames(currentIr, curated, { noVote, aliasGroups, aliasGroupSkipSlots, finalPass: true });
last = finalPass;
for (const m of finalPass.unresolved) if (!isCurated(m)) nonCuratedUnresolved.add(m);
const finalNewRows = finalPass.rows.filter((r) => !seen.has(rowKey(r)));
for (const r of finalNewRows) { allRows.push({ ...r, pass: passesRun + 1 }); seen.add(rowKey(r)); }
{
  const renameMap: CanonicalNameMap = {
    renames: allRows.filter((r) => r.name !== r.canonical),
    deferred: new Set(finalPass.deferred.map((d) => d.namespace)),
  };
  const nextIr = structuredClone(ir);
  const issues: MergeIssue[] = [];
  applyCanonicalNames(nextIr, renameMap, issues);
  mergeIssuesByPass.set(passesRun + 1, issues);
  currentIr = nextIr;
}
const aliasCollapseRows = finalNewRows.filter((r) => r.basis === "alias-collapse");
const deprefixRows = finalNewRows.filter((r) => r.basis === "deprefix");
console.log(
  `final pass (pass ${passesRun + 1}, ALIAS COLLAPSE + DE-PREFIX): ` +
  `${aliasCollapseRows.length} alias-collapse row(s), ${deprefixRows.length} deprefix row(s), ` +
  `${finalPass.unresolved.length} unresolved`
);
passesRun += 1;

const curatedUnresolvedEveryPass = curatedUnresolvedPerPass.reduce(
  (acc, s) => new Set([...acc].filter((m) => s.has(m)))
);
const unresolvedFinal = [...new Set([...curatedUnresolvedEveryPass, ...nonCuratedUnresolved])].sort();

const result = {
  rows: allRows as DerivedRow[],
  groups: allGroups,
  unresolved: unresolvedFinal,
  deferred: last!.deferred,
  crossNamespace: firstPass!.crossNamespace,
  aliasGroupLeftovers: aliasGroupLeftovers.sort(),
};

console.log(`fixpoint reached in ${passesRun} pass(es) (a confirmation pass with no new rows is not counted)`);
for (const [pass, issues] of mergeIssuesByPass) {
  if (issues.length) console.log(`  pass ${pass}: ${issues.length} merge issue(s) applying that pass's renames: ${issues.map((i) => `${i.namespace}.${i.element}`).join(", ")}`);
}
console.log();

const byRule = new Map<string, number>();
for (const g of result.groups) byRule.set(g.rule, (byRule.get(g.rule) ?? 0) + 1);
const losers = result.rows.filter((r) => r.basis !== "verdict" && r.name !== r.canonical);

console.log(`groups     ${result.groups.length}`);
for (const [k, v] of [...byRule].sort()) console.log(`  ${k.padEnd(18)} ${v}`);
console.log(`losing names ${new Set(losers.map((r) => `${r.namespace}.${r.name}`)).size}`);
console.log(`unresolved ${result.unresolved.length}`);
console.log();
for (const g of result.groups) {
  const parts = (["chrome", "firefox", "safari"] as const)
    .filter((b) => g.names[b]?.length)
    .map((b) => `${b}: ${g.names[b]!.join("|")}`);
  console.log(`${g.namespace}.${g.canonical.padEnd(28)} <- ${parts.join("  ")}   [${g.rule}]`);
  for (const v of g.noVote ?? []) console.log(`    no vote for ${v}`);
}
for (const d of result.deferred) console.log(`deferred ${d.namespace}: ${d.reason}`);
if (result.aliasGroupLeftovers.length) {
  console.log(`\n${result.aliasGroupLeftovers.length} alias-group leftover(s): a single-voter slot whose alias-group sibling has no canonical for it, so nothing was adopted:`);
  for (const l of result.aliasGroupLeftovers) console.log(`  ${l}`);
}
if (result.crossNamespace.length) {
  console.log(`\n${result.crossNamespace.length} cross-namespace reference(s), out of scope for CAN (one name per concept per namespace):`);
  for (const c of result.crossNamespace) console.log(`  ${c}`);
}

fs.writeFileSync(OUT, JSON.stringify({
  derived: result.rows,
  groups: result.groups,
  deferred: result.deferred,
  unresolved: result.unresolved,
  aliasGroupLeftovers: result.aliasGroupLeftovers,
}, null, 2) + "\n");
console.log(`\nwrote ${OUT}`);

if (result.unresolved.length) {
  console.error(`\n${result.unresolved.length} group(s) cannot be derived:`);
  for (const u of result.unresolved) console.error(`  ${u}`);
  console.error(`Settle each in ${CURATED} with a reason; nothing here guesses.`);
  process.exit(1);
}
