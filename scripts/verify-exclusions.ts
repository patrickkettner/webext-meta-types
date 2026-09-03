/**
 * Proves, for every entry in excluded-members.json and excluded-namespaces.json,
 * that removing it changes the emitted output; identical output means INERT
 * and the gate fails. applyExclusions() (src/generator.ts) silently skips
 * an entry whose target no longer matches the merged IR, so an entry can
 * stop matching with no gate noticing. The variant exclusion lists live in
 * memory, never written back to the JSON files.
 *
 * Usage: npx tsx scripts/verify-exclusions.ts [--filter <substring>]
 */
import fs from "fs";
import {
  buildIr,
  applyExclusions,
  applyPatches,
  applyCanonicalNames,
  loadCanonicalNames,
  reconcileStructuralForms,
  emitDtsDetailed,
  type IRNamespace,
  type BrowserId,
  type MergeIssue,
} from "../src/generator";

export interface MemberEntry {
  namespace: string;
  member: string;
  browser: BrowserId;
  [k: string]: unknown;
}

export interface NamespaceEntry {
  namespace: string;
  browser: BrowserId;
  [k: string]: unknown;
}

const MEMBERS_FILE = "excluded-members.json";
const NAMESPACES_FILE = "excluded-namespaces.json";

function loadMembers(file = MEMBERS_FILE): MemberEntry[] {
  return JSON.parse(fs.readFileSync(file, "utf8")).excluded;
}

function loadNamespaces(file = NAMESPACES_FILE): NamespaceEntry[] {
  return JSON.parse(fs.readFileSync(file, "utf8")).excluded;
}

/**
 * Per-browser stores are Maps, so the clone is deep; a shallow spread would
 * share them across variants.
 */
function cloneIr(src: Map<string, IRNamespace>): Map<string, IRNamespace> {
  const out = new Map<string, IRNamespace>();
  for (const [nsName, ns] of src) {
    const elements = new Map(
      [...ns.elements].map(([k, v]) => [k, {
        ...v,
        sources: new Map(v.sources),
        typeParams: new Map(v.typeParams),
      }] as const)
    );
    out.set(nsName, { name: ns.name, elements, channel: ns.channel });
  }
  return out;
}

/**
 * Rebuilds a namespace's emitted text using the same sequence generate()
 * runs. Both applyExclusions() calls are kept because reconcileStructuralForms
 * creates namespaces the first call cannot see.
 */
function emitNamespace(
  rawIr: Map<string, IRNamespace>,
  members: MemberEntry[],
  namespaces: NamespaceEntry[],
  nsName: string
): string {
  const ir = cloneIr(rawIr);
  applyExclusions(ir, members, namespaces);
  const issues: MergeIssue[] = [];
  reconcileStructuralForms(ir, issues);
  applyCanonicalNames(ir, loadCanonicalNames(), issues);
  applyPatches(ir);
  applyExclusions(ir, members, namespaces);
  const one = new Map<string, IRNamespace>();
  const ns = ir.get(nsName);
  if (ns) one.set(nsName, ns);
  return emitDtsDetailed(one).dts;
}

export type Verdict = "INERT" | "LOAD-BEARING";

export interface Result {
  kind: "namespace" | "member";
  file: string;
  namespace: string;
  member?: string;
  browser: BrowserId;
  /** Which field holds the entry's reason: a namespace entry's `note`, or a
   *  member entry's `note` or `flag`. */
  reason: string;
  verdict: Verdict;
}

function reasonOf(e: MemberEntry | NamespaceEntry): string {
  return (e.note as string) ?? (e.flag as string) ?? "";
}

/**
 * Classify every entry in `members`/`namespaces` against `rawIr`, the IR
 * before any exclusion runs (buildIr(false)). Reads the real patches/
 * directory and canonical-names-derived.json (see emitNamespace): both sides
 * of a comparison go through them identically, so they cannot bias a verdict,
 * the same way verify-patch-necessity.ts reads loadCanonicalNames() for real.
 */
export function classifyExclusions(
  rawIr: Map<string, IRNamespace>,
  members: MemberEntry[],
  namespaces: NamespaceEntry[],
  filter?: string
): Result[] {
  const results: Result[] = [];
  const baselineByNs = new Map<string, string>();
  const baseline = (nsName: string): string => {
    let dts = baselineByNs.get(nsName);
    if (dts === undefined) {
      dts = emitNamespace(rawIr, members, namespaces, nsName);
      baselineByNs.set(nsName, dts);
    }
    return dts;
  };

  for (const e of members) {
    if (filter && !`${e.namespace}.${e.member}`.includes(filter)) continue;
    const without = members.filter((m) => m !== e);
    const got = emitNamespace(rawIr, without, namespaces, e.namespace);
    results.push({
      kind: "member",
      file: MEMBERS_FILE,
      namespace: e.namespace,
      member: e.member,
      browser: e.browser,
      reason: reasonOf(e),
      verdict: got === baseline(e.namespace) ? "INERT" : "LOAD-BEARING",
    });
  }

  for (const e of namespaces) {
    if (filter && !e.namespace.includes(filter)) continue;
    const without = namespaces.filter((n) => n !== e);
    const got = emitNamespace(rawIr, members, without, e.namespace);
    results.push({
      kind: "namespace",
      file: NAMESPACES_FILE,
      namespace: e.namespace,
      browser: e.browser,
      reason: reasonOf(e),
      verdict: got === baseline(e.namespace) ? "INERT" : "LOAD-BEARING",
    });
  }

  return results;
}

function main(): void {
  const filterIdx = process.argv.indexOf("--filter");
  const filter = filterIdx !== -1 ? process.argv[filterIdx + 1] : undefined;

  const members = loadMembers();
  const namespaces = loadNamespaces();
  console.log(`Testing ${members.length + namespaces.length} exclusion(s): ${members.length} member(s), ${namespaces.length} namespace(s).`);

  // Parsed once. applyExclusions() normally runs inside buildIr(), so the
  // raw (pre-exclusion) IR has to come from buildIr(false) rather than a
  // fresh three-package reparse per entry.
  const rawIr = buildIr(false);

  const results = classifyExclusions(rawIr, members, namespaces, filter);
  for (const r of results) {
    const key = r.kind === "member" ? `${r.namespace}.${r.member}` : r.namespace;
    console.log(`  ${r.verdict.padEnd(12)} ${r.browser.padEnd(7)} ${key}`);
  }

  const inert = results.filter((r) => r.verdict === "INERT");
  const load = results.filter((r) => r.verdict === "LOAD-BEARING");
  console.log("\n=== SUMMARY ===");
  console.log(`  LOAD-BEARING: ${load.length}`);
  console.log(`  INERT:        ${inert.length}`);

  if (inert.length) {
    console.error(`\n${inert.length} exclusion(s) change nothing in the emitted output:`);
    for (const r of inert) {
      const key = r.kind === "member" ? `${r.namespace}.${r.member}` : r.namespace;
      console.error(`    ${r.file}  ${key}  browser=${r.browser}  reason="${r.reason}"`);
    }
    console.error("\nEach removes nothing today and should be deleted.");
    process.exit(1);
  }

  console.log("\nEvery exclusion removes something from the emitted output.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
