/**
 * Decide, from the Gecko schemas alone, which `upstream-defect` patches are
 * really version lag.
 *
 * WHY
 * `final-filing-list.json` retracts 27 claims as version lag, but all 27 still
 * sit in `patches/` labelled `upstream-defect`. The filing record and the patch
 * record disagree about the same 27 claims and nothing notices.
 *
 * "Lag" has an exact definition that needs no judgement: the member is absent
 * from the Gecko schema at the version our pinned `@types` package describes,
 * and present at tip. The @types package is generated from those schemas, so a
 * member that upstream had not written yet is not a defect in the package.
 *
 * This derives that verdict directly, member by member, at two refs. It does
 * not read the earlier retraction list, the reviewer's prose, or the hardcoded
 * member names in `prefiling-check.py` (`LAG_MEMBERS`), all of which are
 * someone's conclusion rather than a measurement. It compares its answer to the
 * retraction list at the end, and a disagreement is a finding either way.
 *
 * Requires the local mozilla-central checkout, so it is not part of
 * `npm run check`.
 *
 * Usage:
 *   npx tsx scripts/derive-lag.ts            # report only
 *   npx tsx scripts/derive-lag.ts --write    # relabel the entries it proves
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { Project } from "ts-morph";
import { loadPin } from "./verify-gecko-pin";
import {
  parseSource,
  reconcileStructuralForms,
  applyCanonicalNames,
  loadCanonicalNames,
  normalizeSource,
  getSource,
  type IRNamespace,
} from "../src/generator";

const PIN = loadPin("gecko-pin.json");
const FF = PIN.checkout;
const PATCH_DIR = "patches";
const PINNED_TAG = PIN.tag;
const TIP = "origin/main";

const SCHEMA_DIRS = [
  "toolkit/components/extensions/schemas",
  "browser/components/extensions/schemas",
];

/** The subset of the Gecko schema shape this script reads. */
interface SchemaNode {
  namespace?: string;
  id?: string;
  name?: string;
  type?: string;
  async?: string | boolean;
  returns?: SchemaNode;
  properties?: Record<string, unknown>;
  items?: { properties?: Record<string, unknown> };
  parameters?: SchemaNode[];
  types?: SchemaNode[];
  functions?: SchemaNode[];
  events?: SchemaNode[];
}

interface PatchEntry {
  namespace: string;
  element: string;
  reason: string;
  overrideChrome?: string;
  overrideFirefox?: string;
}

function show(ref: string, path: string): string | null {
  {
    try {
      // stderr ignored on purpose: probing two schema roots means one lookup
      // legitimately fails every time, and that noise trains readers to skip
      // this tool's output.
      return execFileSync("git", ["show", `${ref}:${path}`], {
        cwd: FF, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {
      return null;
    }
  }
}

/**
 * Which file declares each namespace, read from the schemas themselves.
 *
 * This was a hand-written `namespace -> filename` map with a `<namespace>.json`
 * fallback, and it was wrong: `action` is declared in `browser_action.json`
 * (line 68 at the pinned tag) and there is no `action.json`, so three entries
 * were reported as having no schema when the schema was right there. A missing
 * map entry is indistinguishable from a genuinely absent member, which is the
 * "empty output is not a result" failure built into a permanent tool.
 *
 * Every namespace object in every schema file is indexed instead, so a
 * namespace that moves file, or a new one, needs no curation.
 */
const indexCache = new Map<string, Map<string, string>>();
function namespaceIndex(ref: string): Map<string, string> {
  const cached = indexCache.get(ref);
  if (cached) return cached;
  const index = new Map<string, string>();
  for (const dir of SCHEMA_DIRS) {
    let listing: string;
    try {
      listing = execFileSync("git", ["ls-tree", "--name-only", `${ref}:${dir}`], {
        cwd: FF, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {
      continue;
    }
    for (const file of listing.split("\n").filter((f) => f.endsWith(".json"))) {
      const raw = show(ref, `${dir}/${file}`);
      if (raw === null) continue;
      const stripped = raw.split("\n").filter((l) => !l.trimStart().startsWith("//")).join("\n");
      let doc: SchemaNode[];
      try {
        doc = JSON.parse(stripped) as SchemaNode[];
      } catch {
        continue;
      }
      for (const nsObj of doc) {
        // First file wins, so a namespace declared in both roots resolves
        // deterministically rather than by directory order chance.
        if (nsObj?.namespace && !index.has(nsObj.namespace)) {
          index.set(nsObj.namespace, `${dir}/${file}`);
        }
      }
    }
  }
  indexCache.set(ref, index);
  return index;
}

const schemaCache = new Map<string, string | null>();
function schemaText(ref: string, namespace: string): string | null {
  const file = namespaceIndex(ref).get(namespace);
  if (!file) return null;
  const key = `${ref}|${file}`;
  if (!schemaCache.has(key)) schemaCache.set(key, show(ref, file));
  return schemaCache.get(key)!;
}

function schemaJson(ref: string, namespace: string): SchemaNode[] | null {
  const text = schemaText(ref, namespace);
  if (text === null) return null;
  const stripped = text.split("\n").filter((l) => !l.trimStart().startsWith("//")).join("\n");
  try {
    return JSON.parse(stripped) as SchemaNode[];
  } catch {
    return null;
  }
}

/**
 * Locate the schema declaration a patch element refers to.
 *
 * A whole-namespace search is not good enough here, and the failure is not
 * hypothetical: `documentId` occurs in `runtime.json` at the pinned tag inside
 * `ExtensionContext`, and `groupId` occurs in `tabs.json` inside `Tab` and the
 * query parameters. Searching the whole file reports both as present, which
 * flips two real lag verdicts to "not lag". Presence must be checked in the
 * declaration the patch is actually about.
 *
 * The Firefox type package names inline parameter types `_<Member><Param>`, so
 * the element name decomposes mechanically: strip the leading underscore, match
 * the longest function or event name that prefixes it case-insensitively, and
 * read the remainder as the parameter (or the return value, for `Return*`).
 * A plain name is a `types[]` entry by `id`.
 */
function locate(schema: SchemaNode[], namespace: string, element: string): SchemaNode | null {
  // A schema file holds several namespace objects and the first is usually
  // `manifest`, so the target has to be selected by name rather than taken
  // positionally.
  const ns = schema.find((n) => n?.namespace === namespace);
  if (!ns) return null;
  const types: SchemaNode[] = ns.types ?? [];
  const callables: SchemaNode[] = [...(ns.functions ?? []), ...(ns.events ?? [])];

  const byId = types.find((t) => t.id === element);
  if (byId) return byId;
  if (!element.startsWith("_")) return null;

  const rest = element.slice(1);
  const owner = callables
    .filter((c): c is SchemaNode & { name: string } =>
      typeof c.name === "string" && rest.toLowerCase().startsWith(c.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length)[0];
  if (!owner) return null;

  const tail = rest.slice(owner.name.length);
  if (tail.startsWith("Return")) {
    if (typeof owner.returns === "object") return owner.returns;
    // Gecko writes an async result as the sole parameter of the callback
    // parameter, so `_GetFrameReturnDetails` lives two levels down rather than
    // in a `returns` key.
    const cb = (owner.parameters ?? []).find(
      (p) => p.type === "function" || p.name === owner.async
    );
    return cb?.parameters?.[0] ?? null;
  }
  const param = (owner.parameters ?? []).find(
    (p) => typeof p.name === "string" && p.name.toLowerCase() === tail.toLowerCase()
  );
  return param ?? null;
}

const CANONICAL = loadCanonicalNames();

/**
 * Names to try when locating a patch element in the Gecko schema. A patch is
 * keyed by canonical name (CAN-003, CAN-004), and that name carries none of
 * the `_<Function><Param>` structure the locator decodes, so every Firefox
 * name the map sends to this canonical is tried after the key itself. A
 * many-to-one key resolves if any original resolves; the caller reports
 * which one.
 */
function locatorNames(namespace: string, element: string): string[] {
  return [element, ...CANONICAL.renames
    .filter((r) => r.browser === "firefox" && r.namespace === namespace && r.canonical === element)
    .map((r) => r.name)];
}

/** Does the located declaration declare `member` as a property? */
function declaredAt(
  ref: string, namespace: string, element: string, member: string
): { declared: boolean; via: string } | "unmapped" | null {
  const schema = schemaJson(ref, namespace);
  if (schema === null) return null;
  for (const via of locatorNames(namespace, element)) {
    const node = locate(schema, namespace, via);
    if (!node) continue;
    const props = node.properties ?? node.items?.properties ?? {};
    return { declared: Object.prototype.hasOwnProperty.call(props, member), via };
  }
  return "unmapped";
}

/** Member names a declaration source declares. */
function members(source: string | undefined): Set<string> {
  const out = new Set<string>();
  if (!source) return out;
  for (const m of normalizeSource(source).matchAll(/([A-Za-z_$][\w$]*)\??:/g)) out.add(m[1]);
  return out;
}

// ---- upstream IR, unpatched -------------------------------------------------
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
// Patches are keyed by canonical name; the upstream member set must be read
// from the element under that name, as the generator does before patching.
applyCanonicalNames(ir, CANONICAL);

// ---- verdicts ---------------------------------------------------------------
type Verdict = "LAG" | "NOT-LAG" | "NO-SCHEMA" | "NO-NOVEL-MEMBERS" | "UNVERIFIABLE";
interface Row {
  file: string;
  namespace: string;
  element: string;
  declared: string;
  verdict: Verdict;
  detail: string[];
}

const files = fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort();
const rows: Row[] = [];

for (const file of files) {
  const entries = JSON.parse(fs.readFileSync(path.join(PATCH_DIR, file), "utf8")) as PatchEntry[];
  for (const e of entries) {
    if (e.reason !== "upstream-defect" && e.reason !== "upstream-lag") continue;
    const el = ir.get(e.namespace)?.elements.get(e.element);

    // Anything this derivation cannot reach is UNVERIFIABLE, never "fine".
    // Skipping such entries silently let a chrome-only `upstream-lag` entry
    // pass the gate with exit 0, which is the label the gate exists to police.
    // There is no Chromium schema oracle wired here, and a function is a
    // signature rather than a bag of members, so neither can be derived.
    const unreachable =
      e.overrideFirefox === undefined ? "no firefox override; lag is derived from the Gecko schemas only"
      : el?.kind === "function" ? "function signature; lag is defined member-wise"
      : undefined;
    if (unreachable) {
      rows.push({ file, namespace: e.namespace, element: e.element,
                  declared: e.reason, verdict: "UNVERIFIABLE", detail: [unreachable] });
      continue;
    }

    const upstream = members(el ? getSource(el, "firefox") : undefined);
    const novel = [...members(e.overrideFirefox)].filter((m) => !upstream.has(m));

    if (novel.length === 0) {
      rows.push({ file, namespace: e.namespace, element: e.element,
                  declared: e.reason, verdict: "NO-NOVEL-MEMBERS", detail: [] });
      continue;
    }

    const detail: string[] = [];
    let lagged = 0;
    let unresolved = false;
    for (const m of novel) {
      const atPinned = declaredAt(PINNED_TAG, e.namespace, e.element, m);
      const atTip = declaredAt(TIP, e.namespace, e.element, m);
      if (atPinned === null || atTip === null) {
        unresolved = true;
        detail.push(`${m}: no schema file for namespace ${e.namespace}`);
        continue;
      }
      if (atPinned === "unmapped" || atTip === "unmapped") {
        unresolved = true;
        detail.push(`${m}: ${e.element} does not resolve to a schema declaration`);
        continue;
      }
      const via = atPinned.via === e.element ? "" : ` (located via ${atPinned.via})`;
      if (!atPinned.declared && atTip.declared) {
        lagged++;
        detail.push(`${m}: absent @${PINNED_TAG}, present @tip -> lag${via}`);
      } else if (atPinned.declared) {
        detail.push(`${m}: present @${PINNED_TAG}; the package dropped it -> not lag${via}`);
      } else {
        detail.push(`${m}: absent at both refs -> not lag${via}`);
      }
    }

    const verdict: Verdict = unresolved && lagged === 0 ? "NO-SCHEMA"
      : lagged === novel.length ? "LAG"
      : "NOT-LAG";
    rows.push({ file, namespace: e.namespace, element: e.element,
                declared: e.reason, verdict, detail });
  }
}

// ---- report -----------------------------------------------------------------
const tally: Record<string, number> = {};
for (const r of rows) tally[r.verdict] = (tally[r.verdict] ?? 0) + 1;

console.log(`Gecko schemas at ${PINNED_TAG} vs ${TIP}\n`);
for (const r of rows.filter((r) => r.verdict === "LAG")) {
  console.log(`  LAG      ${r.namespace}.${r.element}`);
  for (const d of r.detail) console.log(`             ${d}`);
}
for (const r of rows.filter((r) => r.verdict === "NOT-LAG" || r.verdict === "NO-SCHEMA")) {
  console.log(`  ${r.verdict.padEnd(8)} ${r.namespace}.${r.element}`);
  for (const d of r.detail) console.log(`             ${d}`);
}
console.log(`\n${rows.length} defect/lag entr(ies) examined:`);
for (const [k, v] of Object.entries(tally).sort()) console.log(`  ${k}: ${v}`);

// ---- does every declared label match the derivation? ------------------------
// An `upstream-lag` label is only as good as the derivation behind it, so an
// entry carrying that label must come back LAG. An entry not carrying it must
// not. UNVERIFIABLE therefore fails when claimed as lag and passes otherwise,
// since this gate makes no claim about `upstream-defect`.
const wrongLabel = rows.filter(
  (r) => (r.verdict === "LAG") !== (r.declared === "upstream-lag")
);

console.log(`\nLabel agreement:`);
if (wrongLabel.length === 0) {
  console.log("  every upstream-lag entry is derivable as lag, and no upstream-defect entry is");
} else {
  for (const r of wrongLabel) {
    console.log(
      `  MISLABELLED ${r.namespace}.${r.element}: declared ${r.declared}, derived ` +
      `${r.verdict === "LAG" ? "upstream-lag" : "not lag"}`
    );
    for (const d of r.detail) console.log(`                ${d}`);
  }
}

// ---- compare with the earlier retraction list -------------------------------
const filing = JSON.parse(fs.readFileSync("final-filing-list.json", "utf8")) as {
  retracted: Array<{ browser: string; api: string }>;
};
const retracted = new Set(
  filing.retracted.filter((r) => r.browser === "firefox").map((r) => r.api)
);
const derivedLag = new Set(
  rows.filter((r) => r.verdict === "LAG").map((r) => `${r.namespace}.${r.element}`)
);
const onlyRetracted = [...retracted].filter((a) => !derivedLag.has(a));
const onlyDerived = [...derivedLag].filter((a) => !retracted.has(a));

console.log(`\nAgainst final-filing-list.json (${retracted.size} firefox retractions):`);
console.log(`  agreed                       : ${[...derivedLag].filter((a) => retracted.has(a)).length}`);
console.log(`  retracted there, not lag here: ${onlyRetracted.length}`);
for (const a of onlyRetracted) console.log(`      ${a}`);
console.log(`  lag here, not retracted there: ${onlyDerived.length}`);
for (const a of onlyDerived) console.log(`      ${a}`);

// ---- write ------------------------------------------------------------------
if (process.argv.includes("--write")) {
  let changed = 0;
  for (const file of files) {
    const p = path.join(PATCH_DIR, file);
    const entries = JSON.parse(fs.readFileSync(p, "utf8")) as PatchEntry[];
    let touched = false;
    for (const e of entries) {
      const hit = rows.find(
        (r) => r.file === file && r.namespace === e.namespace &&
               r.element === e.element && r.verdict === "LAG"
      );
      if (hit && e.reason !== "upstream-lag") {
        e.reason = "upstream-lag";
        touched = true;
        changed++;
      }
    }
    if (touched) fs.writeFileSync(p, JSON.stringify(entries, null, 2) + "\n");
  }
  console.log(`\nrelabelled ${changed} entr(ies) to upstream-lag`);
} else if (wrongLabel.length > 0 || onlyRetracted.length > 0 || onlyDerived.length > 0) {
  console.error(
    "\nThe patch labels and the schemas disagree. Re-run with --write after " +
    "checking the detail above; a lag entry that stopped being lag means the " +
    "pinned dependency caught up and the patch may be deletable."
  );
  process.exit(1);
}
