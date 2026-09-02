/**
 * Derive where each top-level Safari type belongs, instead of curating it.
 *
 * WebKit declares extension dictionaries at file scope, so the Safari types put
 * them at the top level of `browser` (`browser.Cookie`) while Chrome and
 * Firefox nest them (`cookies.Cookie`). Something has to say where each one
 * goes, and the hand-reviewed map that did produced at least one known-wrong
 * row: `MessageOptions` was matched to `systemLog` by name while coming from
 * WebExtensionAPIRuntime.idl.
 *
 * Three rules, tried in order, each citing a file rather than a judgement:
 *
 *   1. declared   the type is declared in an IDL file, and that file names its
 *                 namespace. `WebExtensionCookieDetails` lives in
 *                 WebExtensionAPICookies.idl, so it belongs to `cookies`.
 *   2. mentioned  the type is not declared anywhere, but its name appears
 *                 inside a method name in exactly one IDL file.
 *                 `getAllCookieStores` is the only trace of `CookieStore`.
 *   3. ir-unique  no IDL trace at all. Take the namespaces that declare this
 *                 name in the Chrome and Firefox IR, and keep only those
 *                 WebKit actually implements. `InjectionResult` sits in
 *                 `scripting` and `userScripts` upstream, and Safari has no
 *                 userScripts namespace, so one candidate survives.
 *
 * Anything left unresolved is an error, not a default: a type whose home cannot
 * be derived must be argued for explicitly, and this exits non-zero rather than
 * guessing.
 *
 * Usage: IDL_DIR=<webkit>/Source/WebKit/WebProcess/Extensions/Interfaces \
 *          npx tsx scripts/derive-relocations.ts
 */
import fs from "fs";
import path from "path";
import { Project } from "ts-morph";
import { parseSource, reconcileStructuralForms, type IRNamespace } from "../src/generator";

const IDL_DIR = process.env.IDL_DIR ??
  "/home/pdk/webkit/Source/WebKit/WebProcess/Extensions/Interfaces";
const SURFACE = "safari-surface-analysis.json";
const OUT = "safari-relocation-derived.json";

/**
 * IDL file stem -> namespace, for the stems that are not simply lowercased.
 *
 * This is the one hand-maintained table left, and it is about WebKit's file
 * naming rather than about any API's shape: `Localization.idl` holds `i18n`.
 */
const NAMESPACE_EXCEPTIONS: Record<string, string> = {
  Localization: "i18n",
  DeclarativeNetRequest: "declarativeNetRequest",
  DevToolsInspectedWindow: "devtools.inspectedWindow",
  DevToolsNetwork: "devtools.network",
  DevToolsPanels: "devtools.panels",
  DevToolsExtensionPanel: "devtools.panels",
  DevTools: "devtools",
  SidePanel: "sidePanel",
  SidebarAction: "sidebarAction",
  WebNavigation: "webNavigation",
  WebRequest: "webRequest",
  WebPageNamespace: "runtime",
  WebPageRuntime: "runtime",
  StorageArea: "storage",
  Namespace: "runtime",
  DOM: "dom",
};

function namespaceFor(stem: string): string | undefined {
  const core = stem.replace("WebExtensionAPI", "");
  if (core in NAMESPACE_EXCEPTIONS) return NAMESPACE_EXCEPTIONS[core];
  return core ? core[0].toLowerCase() + core.slice(1) : undefined;
}

interface Relocation {
  name: string;
  verdict: string;
}

interface DerivedRow {
  name: string;
  namespace: string;
  basis: "declared" | "mentioned" | "referenced" | "ir-unique";
  citation: string;
  curatedVerdict: string;
}

// ---- WebKit IDL -------------------------------------------------------------
const files = fs.readdirSync(IDL_DIR).filter((f) => f.endsWith(".idl")).sort();
const stripComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, "");

/** Type name -> the IDL file declaring it. */
const declaredIn = new Map<string, string>();
/** Type name fragment -> IDL files whose method names contain it. */
const methodText = new Map<string, string>();

for (const file of files) {
  const src = stripComments(fs.readFileSync(path.join(IDL_DIR, file), "utf8"));
  const stem = file.slice(0, -4);
  // Dictionaries, enums and interfaces all become top-level Safari types, so
  // all three declaration forms locate a namespace.
  for (const m of src.matchAll(/\b(?:dictionary|enum|interface)\s+(\w+)\s*[:{]/g)) {
    if (!declaredIn.has(m[1])) declaredIn.set(m[1], stem);
  }
  methodText.set(stem, [...src.matchAll(/\b(\w+)\s*\(/g)].map((m) => m[1]).join(" "));
}

/** Namespaces WebKit actually implements, from the file set. */
const webkitNamespaces = new Set(
  files.map((f) => namespaceFor(f.slice(0, -4))).filter((n): n is string => !!n)
);

// ---- Chrome and Firefox IR --------------------------------------------------
const project = new Project();
project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
const chromeNs = project.getSourceFileOrThrow("index.d.ts").getModuleOrThrow("chrome");
project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
const ffFile = project.getSourceFiles()
  .filter((f) => f.getFilePath().includes("firefox-webext-browser"))[0];
const ir = new Map<string, IRNamespace>();
parseSource(chromeNs, "chrome", ir);
parseSource(ffFile, "firefox", ir);
reconcileStructuralForms(ir, []);

const irNamespacesFor = (name: string): string[] =>
  [...ir.entries()].filter(([, ns]) => ns.elements.has(name)).map(([n]) => n);

// ---- resolve ----------------------------------------------------------------
const surface = JSON.parse(fs.readFileSync(SURFACE, "utf8")) as {
  topLevelRelocations: Relocation[];
};

// The surface analysis is a snapshot of the package as it stood when it was
// written. The package's own provenance.json is what it ships now, and every
// entity type it emits at the root of `browser` is listed there. Take the
// union, so a type the package adds is placed rather than left dangling; the
// snapshot's verdict is carried when it has one and marked absent otherwise.
const provenance = JSON.parse(
  fs.readFileSync("node_modules/safari-webextension-types/provenance.json", "utf8"),
) as { members: { interface: string; origin: string }[] };
const entityTypes = new Set(
  provenance.members.filter((m) => m.origin === "entity").map((m) => m.interface),
);
const listed = new Map(surface.topLevelRelocations.map((r) => [r.name, r]));
for (const name of [...entityTypes].sort()) {
  if (!listed.has(name)) {
    listed.set(name, { name, verdict: "(not in the surface snapshot; placed by derivation alone)" });
  }
}

// For each entity type, the set of namespaces whose operations or attributes
// name it in a declaration. An entity referenced only from inside another
// entity (InjectionTarget from CSSInjection.target) inherits that entity's
// referrers, so the search is closed transitively.
const referencedFrom = new Map<string, Set<string>>();
{
  const opRefs = new Map<string, Set<string>>();
  const entityRefs = new Map<string, Set<string>>();
  const decls = provenance.members as { interface: string; kind: string; origin: string; declarations: string[] }[];
  for (const m of decls) {
    for (const line of m.declarations ?? []) {
      for (const e of entityTypes) {
        if (!new RegExp(`browser\\.${e}\\b`).test(line)) continue;
        if (m.origin === "entity") {
          if (!entityRefs.has(e)) entityRefs.set(e, new Set());
          entityRefs.get(e)!.add(m.interface);
        } else if (m.interface.startsWith("WebExtensionAPI")) {
          const stem = m.interface.slice("WebExtensionAPI".length);
          const ns = namespaceFor(stem) ?? stem.charAt(0).toLowerCase() + stem.slice(1);
          if (!opRefs.has(e)) opRefs.set(e, new Set());
          opRefs.get(e)!.add(ns);
        }
      }
    }
  }
  const resolve = (e: string, seen = new Set<string>()): Set<string> => {
    if (seen.has(e)) return new Set();
    seen.add(e);
    const out = new Set(opRefs.get(e) ?? []);
    for (const parent of entityRefs.get(e) ?? []) for (const ns of resolve(parent, seen)) out.add(ns);
    return out;
  };
  for (const e of entityTypes) referencedFrom.set(e, resolve(e));
}

const derived: DerivedRow[] = [];
const unresolved: string[] = [];

for (const r of [...listed.values()]) {
  // Safari's emitted name drops the WebExtension prefix, so the IDL name is
  // exactly `WebExtension<Name>`. A suffix match instead of an exact one is
  // what produced two wrong rows: WebExtensionAPIDevToolsInspectedWindow ends
  // with "Window" and WebExtensionAPIPort ends with "Port", so both captured
  // unrelated types by their tails.
  const idlName = declaredIn.has(`WebExtension${r.name}`)
    ? `WebExtension${r.name}`
    : declaredIn.has(r.name) ? r.name : undefined;
  if (idlName) {
    const stem = declaredIn.get(idlName)!;
    const ns = namespaceFor(stem);
    if (ns) {
      derived.push({ name: r.name, namespace: ns, basis: "declared",
                     citation: `${stem}.idl declares ${idlName}`, curatedVerdict: r.verdict });
      continue;
    }
  }

  const mentioning = [...methodText.entries()]
    .filter(([, text]) => text.includes(r.name))
    .map(([stem]) => stem);
  if (mentioning.length === 1) {
    const ns = namespaceFor(mentioning[0]);
    if (ns) {
      derived.push({ name: r.name, namespace: ns, basis: "mentioned",
                     citation: `${mentioning[0]}.idl names it in a method`, curatedVerdict: r.verdict });
      continue;
    }
  }

  // A type the package declares outside any IDL, read from a .mm validation
  // table, has no IDL trace for the tiers above to find. The package records
  // which operations take or return it; when they all sit in one namespace,
  // that is the package stating where it belongs. Ranked above IR-unique,
  // which guessed FrameDetails into cookies on the strength of a name shared
  // with the cross-browser IR.
  const referrers = referencedFrom.get(r.name);
  if (referrers && referrers.size === 1) {
    const ns = [...referrers][0];
    if (webkitNamespaces.has(ns)) {
      derived.push({ name: r.name, namespace: ns, basis: "referenced",
                     citation: `every operation in the package that names it is in ${ns}`,
                     curatedVerdict: r.verdict });
      continue;
    }
  }

  const candidates = irNamespacesFor(r.name).filter((n) => webkitNamespaces.has(n));
  if (candidates.length === 1) {
    derived.push({ name: r.name, namespace: candidates[0], basis: "ir-unique",
                   citation: `upstream declares it only in ${candidates[0]} among namespaces WebKit implements`,
                   curatedVerdict: r.verdict });
    continue;
  }

  unresolved.push(
    `${r.name}: ${mentioning.length} idl mention(s), ` +
    `ir candidates [${irNamespacesFor(r.name).join(", ") || "none"}]`
  );
}

// ---- report -----------------------------------------------------------------
const byBasis = new Map<string, number>();
for (const d of derived) byBasis.set(d.basis, (byBasis.get(d.basis) ?? 0) + 1);

console.log(`top-level Safari types : ${surface.topLevelRelocations.length}`);
for (const [k, v] of [...byBasis].sort()) console.log(`  ${k.padEnd(12)} ${v}`);
console.log(`  unresolved   ${unresolved.length}`);

const disagreements = derived.filter((d) => {
  const m = /relocate to `(\w[\w.]*)`/.exec(d.curatedVerdict);
  return m && m[1] !== d.namespace;
});
if (disagreements.length) {
  console.log(`\nDisagreements with the hand-curated map (the derivation cites a file):`);
  for (const d of disagreements) {
    const curated = /relocate to `(\w[\w.]*)`/.exec(d.curatedVerdict)?.[1];
    console.log(`  ${d.name.padEnd(28)} curated=${(curated ?? "?").padEnd(16)} derived=${d.namespace.padEnd(22)} [${d.citation}]`);
  }
}

fs.writeFileSync(OUT, JSON.stringify({ derived, unresolved }, null, 2) + "\n");
console.log(`\nwrote ${OUT}`);

if (unresolved.length) {
  console.error(`\n${unresolved.length} type(s) have no derivable home:`);
  for (const u of unresolved) console.error(`  ${u}`);
  console.error("A type whose namespace cannot be derived must be argued for explicitly.");
  process.exit(1);
}
