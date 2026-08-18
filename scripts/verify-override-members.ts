/**
 * Check the members an override attributes to a browser, not just the type
 * names (that is verify-override-vocabulary's job). For each override on browser
 * B, collect the property and method names it asserts and require each to be a
 * member B's own upstream declares in that API namespace. A member foreign to B
 * is one B's API does not have.
 */
import { Project, Node, SyntaxKind, ModuleDeclaration } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";

const UPSTREAM: Record<string, string> = {
  chrome: "node_modules/chrome-types/index.d.ts",
  firefox: "node_modules/@types/firefox-webext-browser/index.d.ts",
  safari: "node_modules/safari-webextension-types/index.d.ts",
};
const OVERRIDE_KEY: Record<string, string> = {
  chrome: "overrideChrome",
  firefox: "overrideFirefox",
  safari: "overrideSafari",
};

// The three upstreams declare namespaces differently: chrome-types uses flat
// top-level modules with plain names (`downloads`) plus a `chrome` wrapper;
// firefox uses flat top-level modules with `browser.`-prefixed dotted names
// (`browser.downloads`, `browser.devtools.panels`); safari nests API modules
// under `browser`/`chrome` wrapper modules. Stripping a leading wrapper segment
// and recursing normalizes all three to the same dotted API path.
const WRAPPERS = new Set(["chrome", "browser", "safari"]);

/** Drop a leading wrapper segment: `browser._manifest` -> `_manifest`, `browser` -> "". */
function nsPathOf(raw: string): string {
  const parts = raw.replace(/^["']|["']$/g, "").split(".");
  if (WRAPPERS.has(parts[0])) parts.shift();
  return parts.join(".");
}

interface NsIndex {
  /** ns -> member (property/method) names declared under it. */
  members: Map<string, Set<string>>;
  /** ns -> top-level element names (interfaces, aliases, functions, consts, enums) declared in it. */
  elements: Map<string, Set<string>>;
}

/** Index a browser's upstream by API-namespace path (e.g. "downloads", "devtools.panels"). */
function indexUpstream(file: string): NsIndex {
  const p = new Project();
  const sf = p.addSourceFileAtPath(file);
  const members = new Map<string, Set<string>>();
  const elements = new Map<string, Set<string>>();
  const into = (map: Map<string, Set<string>>, ns: string, name: string) => {
    if (!ns || !name) return;
    if (!map.has(ns)) map.set(ns, new Set());
    map.get(ns)!.add(name);
  };
  const walk = (node: { getStatements(): ReturnType<ModuleDeclaration["getStatements"]> }, ns: string): void => {
    for (const st of node.getStatements()) {
      if (Node.isModuleDeclaration(st)) {
        const rel = nsPathOf(st.getName());
        const child = rel ? (ns ? `${ns}.${rel}` : rel) : ns;
        walk(st, child);
        continue;
      }
      // The element this statement declares (the name an override entry targets).
      if (Node.isInterfaceDeclaration(st) || Node.isTypeAliasDeclaration(st) ||
          Node.isFunctionDeclaration(st) || Node.isEnumDeclaration(st) || Node.isClassDeclaration(st)) {
        into(elements, ns, st.getName() ?? "");
      } else if (Node.isVariableStatement(st)) {
        for (const d of st.getDeclarations()) into(elements, ns, d.getName());
      }
      // Every property/method name in this statement's types is a member of `ns`.
      for (const m of st.getDescendantsOfKind(SyntaxKind.PropertySignature)) into(members, ns, m.getName());
      for (const m of st.getDescendantsOfKind(SyntaxKind.MethodSignature)) into(members, ns, m.getName());
    }
  };
  walk(sf, "");
  return { members, elements };
}

/** Member (property/method) names an override fragment asserts. */
function assertedMembers(text: string): Set<string> {
  const p = new Project({ useInMemoryFileSystem: true });
  let sf;
  try { sf = p.createSourceFile("__o.d.ts", `declare namespace __N {\n${text}\n}`); }
  catch { return new Set(); }
  const out = new Set<string>();
  for (const m of sf.getDescendantsOfKind(SyntaxKind.PropertySignature)) out.add(m.getName());
  for (const m of sf.getDescendantsOfKind(SyntaxKind.MethodSignature)) out.add(m.getName());
  return out;
}

/** Union of the sets for `ns` and its descendant namespaces. */
function scoped(map: Map<string, Set<string>>, ns: string): Set<string> {
  const out = new Set<string>();
  for (const [key, set] of map) {
    if (key === ns || key.startsWith(`${ns}.`)) for (const n of set) out.add(n);
  }
  return out;
}

export interface MemberLeak {
  file: string; namespace: string; element: string; browser: string; member: string; reason: string;
}

export function checkOverrideMembers(patchesDir = "patches"): MemberLeak[] {
  const browsers = Object.keys(UPSTREAM);
  const idx: Record<string, NsIndex> = {};
  for (const b of browsers) idx[b] = indexUpstream(UPSTREAM[b]);

  const files = fs.existsSync(patchesDir) ? fs.readdirSync(patchesDir).filter((f) => f.endsWith(".json")) : [];
  const leaks: MemberLeak[] = [];
  for (const f of files) {
    const entries = JSON.parse(fs.readFileSync(path.join(patchesDir, f), "utf8")) as Array<Record<string, unknown>>;
    for (const e of entries) {
      const ns = String(e.namespace ?? "");
      const element = String(e.element ?? "");
      for (const b of browsers) {
        const text = e[OVERRIDE_KEY[b]] ?? e.overrideShared;
        if (typeof text !== "string") continue;
        // Element absent from B's upstream: nothing to check against (synthesized
        // _manifest types, Chromium *Private APIs, DOM types; see rule 4).
        if (!scoped(idx[b].elements, ns).has(element)) continue;
        const known = scoped(idx[b].members, ns);
        for (const member of assertedMembers(text)) {
          if (!known.has(member)) {
            leaks.push({ file: f, namespace: ns, element, browser: b, member, reason: String(e.reason ?? "(none)") });
          }
        }
      }
    }
  }
  return leaks;
}

const BASELINE_FILE = "members-baseline.json";

/** Stable key for a foreign-member assertion. Reason is part of the key: relabelling one is a change worth catching. */
function keyOf(l: MemberLeak): string {
  return `${l.namespace}\t${l.element}\t${l.browser}\t${l.member}\t${l.reason}`;
}

// Baseline is two-sided and shrink-only: a new foreign member fails, a recorded
// one no longer produced fails. Same contract as evidence-baseline.json.
if (import.meta.url === `file://${process.argv[1]}`) {
  const leaks = checkOverrideMembers();
  const current = new Map(leaks.map((l) => [keyOf(l), l]));
  const update = process.argv.includes("--update");

  if (update || !fs.existsSync(BASELINE_FILE)) {
    const rows = leaks.map((l) => ({ namespace: l.namespace, element: l.element, browser: l.browser, member: l.member, reason: l.reason }))
      .sort((a, b) => keyOf(a as MemberLeak).localeCompare(keyOf(b as MemberLeak)));
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(rows, null, 2) + "\n");
    console.log(`baseline ${update ? "updated" : "created"}: ${rows.length} recorded foreign-member assertion(s)`);
    process.exit(0);
  }

  const baseline = (JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8")) as MemberLeak[]);
  const baseKeys = new Set(baseline.map(keyOf));
  const isNew = [...current.values()].filter((l) => !baseKeys.has(keyOf(l)));
  const stale = baseline.filter((b) => !current.has(keyOf(b)));

  if (isNew.length === 0 && stale.length === 0) {
    console.log(`SUCCESS: no fabricated members; ${baseline.length} recorded foreign-member assertion(s) unchanged.`);
    process.exit(0);
  }
  if (isNew.length) {
    console.error(`FAILED: ${isNew.length} NEW member(s) an override attributes to a browser whose upstream does not declare them:`);
    for (const l of isNew) console.error(`  ${l.namespace}.${l.element} (${l.browser}) asserts "${l.member}" [reason:${l.reason}] — not in ${l.browser}'s ${l.namespace}. Fabrication? Or record it deliberately with --update.`);
  }
  if (stale.length) {
    console.error(`FAILED: ${stale.length} baseline entr(y/ies) no longer produced (upstream caught up?). Shrink the baseline with --update:`);
    for (const b of stale) console.error(`  ${b.namespace}.${b.element} (${b.browser}) "${b.member}" [reason:${b.reason}]`);
  }
  process.exit(1);
}
