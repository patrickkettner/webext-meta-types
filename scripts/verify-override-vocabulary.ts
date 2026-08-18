/**
 * Every type name a patch override uses must belong to the browser that
 * override is for.
 *
 * A patch's overrideChrome/overrideFirefox/overrideSafari is hand-written text
 * that replaces a browser's upstream declaration and lands verbatim in that
 * browser's pruned build. Nothing stopped an override from naming a type only
 * another browser declares. In the meta build the foreign type happens to
 * exist, so it compiled; in the pruned build the reference either fails or, if
 * the name also exists in lib.dom, binds to the DOM type and silently ships the
 * wrong shape (notifications.getAll bound `NotificationOptions` to the Web
 * Notifications API type). tsc cannot see this class because check-artifacts
 * compiles with --lib dom; this gate can, because it resolves names against
 * each browser's own vocabulary, not the DOM.
 *
 * Legal vocabulary for browser B: the types B's own upstream declares, the
 * preamble, and names other patches inject into B. A reference outside that set
 * is a leak only when some OTHER browser declares it as a real type (an
 * interface, or a type alias that is not a bare `any` stub); a genuine DOM/ES
 * global that no browser re-declares is left alone, because extension APIs use
 * ImageData and Blob for real. Injected names resolve here; whether the
 * injecting patch is itself justified is verify:evidence's concern, not this
 * gate's.
 */
import { Project, Node, SyntaxKind, InterfaceDeclaration, TypeAliasDeclaration } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";
import { PREAMBLE } from "../src/preamble";

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

/** Real named types a package declares: interfaces, and aliases that are not a bare `any` stub. */
function declaredTypes(file: string): Set<string> {
  const p = new Project();
  const sf = p.addSourceFileAtPath(file);
  const names = new Set<string>();
  sf.forEachDescendant((n) => {
    if (Node.isInterfaceDeclaration(n)) names.add((n as InterfaceDeclaration).getName());
    else if (Node.isTypeAliasDeclaration(n)) {
      const a = n as TypeAliasDeclaration;
      if (a.getTypeNode()?.getKind() !== SyntaxKind.AnyKeyword) names.add(a.getName());
    }
  });
  return names;
}

/** Type-reference identifiers in an override fragment, structurally (never property names or string literals). */
function referencedTypes(text: string): Set<string> {
  const p = new Project({ useInMemoryFileSystem: true });
  let sf;
  try { sf = p.createSourceFile("__o.d.ts", `declare namespace __N {\n${text}\n}`); }
  catch { return new Set(); }
  const out = new Set<string>();
  for (const id of sf.getDescendantsOfKind(SyntaxKind.Identifier)) {
    const parent = id.getParent();
    const isTypeRef = Node.isTypeReference(parent) ||
      (Node.isQualifiedName(parent) && parent.getLeft() === id);
    if (isTypeRef) out.add(id.getText());
  }
  return out;
}

// JavaScript language intrinsics. Present with --lib es2020, no DOM, so they
// are legal vocabulary for every browser regardless of what one names locally
// (chrome declares `type Error = "GENERAL_ERROR"` in a namespace; a Firefox
// Port.error still means the global Error). This is the language surface, a
// finite stable set, not a vendor allowlist.
const ES_INTRINSICS = new Set<string>([
  "Error", "TypeError", "RangeError", "SyntaxError", "EvalError", "ReferenceError", "URIError",
  "Promise", "Date", "RegExp", "Map", "Set", "WeakMap", "WeakSet", "Array", "ReadonlyArray",
  "Object", "Function", "Symbol", "BigInt", "Boolean", "Number", "String",
  "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "Int8Array", "Int16Array",
  "Int32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array",
  "ArrayBuffer", "SharedArrayBuffer", "DataView", "Iterator", "IterableIterator",
  "Record", "Partial", "Readonly", "Required", "Pick", "Omit", "Exclude", "Extract",
  "NonNullable", "ReturnType", "Parameters", "InstanceType", "Awaited",
]);

const preambleTypes = new Set(
  [...PREAMBLE.matchAll(/(?:interface|type|class|enum)\s+(\w+)/g)].map((m) => m[1]),
);

/** A patch entry: fixed keys plus per-browser override strings under dynamic keys. */
interface PatchEntry {
  namespace: string;
  element: string;
  overrideShared?: string;
  [key: string]: unknown;
}

export interface VocabLeak {
  file: string; namespace: string; element: string; browser: string;
  name: string; alsoDeclaredBy: string[];
}

export function checkOverrideVocabulary(patchesDir = "patches"): VocabLeak[] {
  const browsers = Object.keys(UPSTREAM);
  const own: Record<string, Set<string>> = {};
  for (const b of browsers) own[b] = declaredTypes(UPSTREAM[b]);

  // Names each patch INJECTS into a browser: the element it declares, per browser override present.
  const injected: Record<string, Set<string>> = {};
  for (const b of browsers) injected[b] = new Set();
  const files = fs.existsSync(patchesDir) ? fs.readdirSync(patchesDir).filter((f) => f.endsWith(".json")) : [];
  const parsed = files.map((f) => ({ f, entries: JSON.parse(fs.readFileSync(path.join(patchesDir, f), "utf8")) as PatchEntry[] }));
  for (const { entries } of parsed) {
    for (const e of entries) {
      for (const b of browsers) {
        if (e[OVERRIDE_KEY[b]] || e.overrideShared) injected[b].add(e.element);
      }
    }
  }

  const leaks: VocabLeak[] = [];
  for (const { f, entries } of parsed) {
    for (const e of entries) {
      for (const b of browsers) {
        const text = e[OVERRIDE_KEY[b]] ?? e.overrideShared;
        if (typeof text !== "string") continue;
        const legal = new Set<string>([...own[b], ...preambleTypes, ...ES_INTRINSICS, ...injected[b], e.element]);
        for (const name of referencedTypes(text)) {
          if (legal.has(name)) continue;
          const alsoDeclaredBy = browsers.filter((o) => o !== b && own[o].has(name));
          if (alsoDeclaredBy.length > 0) {
            leaks.push({ file: f, namespace: e.namespace, element: e.element, browser: b, name, alsoDeclaredBy });
          }
        }
      }
    }
  }
  return leaks;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const leaks = checkOverrideVocabulary();
  if (leaks.length === 0) {
    console.log("SUCCESS: every override names only its own browser's vocabulary.");
    process.exit(0);
  }
  console.error(`FAILED: ${leaks.length} override reference(s) name a type the browser does not declare:`);
  for (const l of leaks) {
    console.error(`  ${l.namespace}.${l.element} (${l.browser}) uses "${l.name}" — declared by ${l.alsoDeclaredBy.join(", ")}, not ${l.browser}.`);
  }
  process.exit(1);
}
