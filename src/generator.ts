import { Project, ModuleDeclaration, SyntaxKind, Node, SourceFile, VariableStatement } from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import { PREAMBLE } from "./preamble";

/** Structural interface for AST nodes that expose getModules() and getStatements(). */
interface HasModulesAndStatements {
  getModules(): ModuleDeclaration[];
  getStatements(): Node[];
}

// Intermediate Representation
export interface IRNamespace {
  name: string;
  elements: Map<string, IRElement>;
}

export interface IRElement {
  name: string;
  kind: "function" | "interface" | "type" | "variable" | "namespace";
  /** Declaration text per browser. Keyed, not named: adding a browser is a
   *  new key, not a new field and 89 new references. */
  sources: Map<BrowserId, string>;
  /** Generic parameter count per browser. Absent means 0. */
  typeParams: Map<BrowserId, number>;
  bugUrl?: string;
  patchReason?: string;
}


/* --------------------------------------------------------------------------
 * Per-browser access to IRElement.
 *
 * Call sites go through these rather than naming a browser-specific field, so
 * the storage underneath can change (step B swaps it for a Map) and so adding
 * a browser does not mean touching every reference.
 * ------------------------------------------------------------------------ */

/** The only place IRElement objects are constructed. Storage lives here and in
 *  the accessors below, so changing it (as the Map swap did) touches nothing
 *  else in src/. Adding a browser is a new key, not a new field. */
export function mkElement(
  name: string,
  kind: IRElement["kind"],
  init?: Partial<Record<BrowserId, { source?: string; typeParams?: number }>>
): IRElement {
  const el: IRElement = {
    name,
    kind,
    sources: new Map<BrowserId, string>(),
    typeParams: new Map<BrowserId, number>(),
  };
  for (const b of BROWSER_ORDER) {
    const v = init?.[b];
    if (!v) continue;
    if (v.source !== undefined) setSource(el, b, v.source);
    if (v.typeParams !== undefined) setTypeParams(el, b, v.typeParams);
  }
  return el;
}

export function getSource(el: IRElement, b: BrowserId): string | undefined {
  return el.sources.get(b);
}
export function setSource(el: IRElement, b: BrowserId, src: string | undefined): void {
  // Deleting rather than storing undefined keeps `sources.size` and
  // `browsersOf` honest; reconcileStructuralForms clears a side this way.
  if (src === undefined) el.sources.delete(b);
  else el.sources.set(b, src);
}
export function hasSource(el: IRElement, b: BrowserId): boolean {
  return el.sources.has(b);
}
/** Browsers that declare this element, in canonical order. */
export function browsersOf(el: IRElement): BrowserId[] {
  return BROWSER_ORDER.filter((b) => hasSource(el, b));
}
export function getTypeParams(el: IRElement, b: BrowserId): number {
  return el.typeParams.get(b) ?? 0;
}
export function setTypeParams(el: IRElement, b: BrowserId, n: number): void {
  el.typeParams.set(b, n);
}

/** Patch file schema. */
/** Why a patch exists. Required on every entry. */
/**
 * `upstream-lag` is not a defect: the member is absent from the browser's own
 * schema at the version our pinned dependency describes and present at tip, so
 * the dependency is correct about the version it claims to describe. Keeping
 * these separate from `upstream-defect` is what stops them being filed.
 * Derived, not asserted: see `scripts/derive-lag.ts`.
 */
export type PatchReason =
  | "upstream-defect"
  | "upstream-lag"
  | "convergence"
  | "naming"
  | "enhancement";

interface PatchFile {
  namespace: string;
  element: string;
  reason: PatchReason;
  bug_url?: string;
  mode?: "replace" | "merge";
  /** Per-browser override text, keyed rather than named. */
  overrides: Partial<Record<BrowserId, string>>;
  /**
   * Text for every browser that ALREADY declares this element.
   *
   * Deliberately not "every browser in BROWSER_ORDER": nothing supplies Safari
   * sources yet, so fanning out unconditionally would stamp a Safari support
   * claim onto an element no Safari data has ever touched. A shared override
   * corrects declarations that exist; it does not invent them. An element that
   * exists in no upstream must name its browsers explicitly.
   */
  overrideShared?: string;
}

/** JSON key carrying the override for a browser: chrome -> overrideChrome. */
export function overrideKey(b: BrowserId): string {
  return `override${b[0].toUpperCase()}${b.slice(1)}`;
}

/** Normalize source text for comparison by stripping comments and collapsing whitespace. */
export function normalizeSource(source: string): string {
  return source
    .replace(/\/\*\*[\s\S]*?\*\//g, '')  // Strip JSDoc comments
    .replace(/\/\*[\s\S]*?\*\//g, '')     // Strip block comments
    .replace(/(?<!:)\/\/.*/g, '')         // Strip line comments (ignore urls)
    .replace(/\s*([(),:;{}|<>])\s*/g, '$1') // Collapse whitespace around punctuation
    .replace(/\s+/g, ' ')                 // Collapse remaining whitespace
    .trim();
}

/** Canonicalize a declaration signature by normalizing syntax differences (export keywords, undefined optional syntax, event wrappers). */
export function canonicalizeSignature(source: string | undefined, isFunction = false): string {
  if (!source) return "";
  let normalized = normalizeSource(source)
    .replace(/\bexport\s+/g, "")         // Normalize export modifier inside namespaces
    .replace(/(\b\w+\?:\s*[^;,]+?)\s*\|\s*undefined\b/g, "$1") // Normalize optional parameter syntax only (tab?: Tab | undefined -> tab?: Tab)
    .replace(/=\s*\|\s*/g, "= ")         // Normalize leading union bar (type X = | "a" | "b" -> type X = "a" | "b")
    .replace(/events\.Event\s*</g, "Event<")  // Normalize event wrapper references
    .replace(/WebExtEvent\s*</g, "Event<");
  if (isFunction || /Event\s*</.test(normalized)) {
    normalized = normalized.replace(/\b[a-zA-Z0-9_]+:\s*(Alarm|Tab|Window)\b/g, "arg: $1"); // Normalize common argument name variations only for functions and event callbacks
  }
  return normalized
    .replace(/\s*([(),:;{}|<>])\s*/g, "$1")  // Normalize whitespace around punctuation
    .replace(/,\s*\)/g, ")")                 // Normalize trailing commas in parameter lists
    .replace(/\s+/g, " ")
    .trim();
}

/** Split multi-overload function source strings into individual overload statements without regex backtracking (ReDoS safe). */
export function splitFunctionOverloads(src: string): string[] {
  if (!src) return [];
  const statements: string[] = [];
  let current = "";
  let depth = 0;
  let inSingleLineComment = false;
  let inBlockComment = false;
  let stringQuote: string | null = null;
  let isEscaped = false;

  for (let i = 0; i < src.length; i++) {
    const char = src[i];
    const nextChar = i + 1 < src.length ? src[i + 1] : "";
    current += char;

    if (inSingleLineComment) {
      if (char === "\n") {
        inSingleLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && nextChar === "/") {
        current += "/";
        i++;
        inBlockComment = false;
      }
      continue;
    }

    if (stringQuote !== null) {
      if (isEscaped) {
        isEscaped = false;
      } else if (char === "\\") {
        isEscaped = true;
      } else if (char === stringQuote) {
        stringQuote = null;
      }
      continue;
    }

    if (char === "/" && nextChar === "/") {
      current += "/";
      i++;
      inSingleLineComment = true;
      continue;
    }
    if (char === "/" && nextChar === "*") {
      current += "*";
      i++;
      inBlockComment = true;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      stringQuote = char;
      isEscaped = false;
      continue;
    }

    if (char === '(' || char === '{' || char === '[') {
      depth++;
    } else if (char === ')' || char === '}' || char === ']') {
      if (depth > 0) depth--;
    } else if (char === ';' && depth === 0) {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed);
      current = "";
    }
  }

  const remaining = current.trim();
  if (remaining) statements.push(remaining);
  return statements;
}

/** Ensure an emitted statement has the export keyword inside ambient namespace declarations. */
export function ensureExport(src: string): string {
  const trimmed = src.trim();
  if (/\bexport\s+/.test(trimmed)) return trimmed;
  if (/^(?:\/\*\*[\s\S]*?\*\/\s*|\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)/.test(trimmed)) {
    return trimmed.replace(
      /^((?:\/\*\*[\s\S]*?\*\/\s*|\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)*)(function|const|let|var|interface|type|class|namespace|enum)\b/,
      "$1export $2"
    );
  }
  return `export ${trimmed}`;
}

export function validatePatch(raw: unknown, filePath: string): PatchFile {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Patch in ${filePath} must be a JSON object`);
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.namespace !== "string" || !obj.namespace) {
    throw new Error(`Patch in ${filePath} has missing or non-string "namespace"`);
  }
  if (typeof obj.element !== "string" || !obj.element) {
    throw new Error(`Patch in ${filePath} has missing or non-string "element"`);
  }
  const REASONS = ["upstream-defect", "upstream-lag", "convergence", "naming", "enhancement"];
  if (typeof obj.reason !== "string" || !REASONS.includes(obj.reason)) {
    throw new Error(
      `Patch in ${filePath} (${obj.namespace}.${obj.element}) must declare "reason" as one of ` +
      `${REASONS.join(", ")}. A patch is a claim about a browser; say which kind.`
    );
  }
  // Only an upstream-defect patch may cite a bug, and a placeholder is worse
  // than nothing.
  if (obj.reason !== "upstream-defect" && obj.bug_url !== undefined) {
    throw new Error(
      `Patch in ${filePath} (${obj.namespace}.${obj.element}) has reason "${obj.reason}" but carries ` +
      `a bug_url. Only upstream-defect patches cite a bug.`
    );
  }
  if (typeof obj.bug_url === "string" && /^(TBD|todo|xxx|placeholder)$/i.test(obj.bug_url.trim())) {
    throw new Error(
      `Patch in ${filePath} (${obj.namespace}.${obj.element}) has a placeholder bug_url ` +
      `"${obj.bug_url}". File the bug and use its URL, or drop the field.`
    );
  }
  if (obj.mode !== undefined && obj.mode !== "replace" && obj.mode !== "merge") {
    throw new Error(`Patch in ${filePath} "mode" must be "replace" or "merge"`);
  }
  // Reject anything not in the schema. An unrecognised key applies nothing and
  // is never removal-tested, since the harness derives its work list from these
  // same names, so a misspelling would read as a patch while doing nothing.
  const KNOWN_KEYS = new Set<string>([
    "namespace", "element", "reason", "bug_url", "mode", "overrideShared", "evidence",
    ...BROWSER_ORDER.map(overrideKey),
  ]);
  for (const key of Object.keys(obj)) {
    if (!KNOWN_KEYS.has(key)) {
      throw new Error(
        `Patch in ${filePath} (${obj.namespace}.${obj.element}) has unknown field "${key}". ` +
        `Accepted: ${[...KNOWN_KEYS].sort().join(", ")}.`
      );
    }
  }

  // `evidence` cites a browser's own source for a claim its type package does
  // not carry. Shape is checked here; that the quote still resolves is checked
  // by verify:evidence --resolve, which needs the checkouts.
  if (obj.evidence !== undefined) {
    if (!Array.isArray(obj.evidence)) {
      throw new Error(`Patch in ${filePath} "evidence" must be an array`);
    }
    for (const item of obj.evidence) {
      const ev = item as Record<string, unknown>;
      for (const field of ["browser", "repo", "ref", "path", "quote"]) {
        if (typeof ev[field] !== "string" || !ev[field]) {
          throw new Error(
            `Patch in ${filePath} (${obj.namespace}.${obj.element}) has an evidence item ` +
            `missing "${field}". Every citation needs browser, repo, ref, path and quote.`
          );
        }
      }
      if (!BROWSER_ORDER.includes(ev.browser as BrowserId)) {
        throw new Error(
          `Patch in ${filePath} evidence names unknown browser "${ev.browser}"`
        );
      }
    }
  }

  const overrides: Partial<Record<BrowserId, string>> = {};
  for (const b of BROWSER_ORDER) {
    const key = overrideKey(b);
    const v = obj[key];
    if (v === undefined) continue;
    if (typeof v !== "string") {
      throw new Error(`Patch in ${filePath} "${key}" must be a string`);
    }
    overrides[b] = v;
  }
  if (obj.overrideShared !== undefined && typeof obj.overrideShared !== "string") {
    throw new Error(`Patch in ${filePath} "overrideShared" must be a string`);
  }
  if (Object.keys(overrides).length === 0 && obj.overrideShared === undefined) {
    throw new Error(
      `Patch in ${filePath} must have at least one of ` +
      `${BROWSER_ORDER.map(overrideKey).join(", ")}, or "overrideShared"`
    );
  }
  return {
    namespace: obj.namespace,
    element: obj.element,
    reason: obj.reason as PatchReason,
    bug_url: typeof obj.bug_url === "string" ? obj.bug_url : undefined,
    mode: obj.mode === "replace" ? "replace" : "merge",
    overrides,
    overrideShared: typeof obj.overrideShared === "string" ? obj.overrideShared : undefined,
  };
}

/**
 * The text a patch supplies for each browser, resolving `overrideShared`
 * against the element as it stands.
 */
function patchSources(
  patch: PatchFile,
  existing?: IRElement
): Partial<Record<BrowserId, string>> {
  const out: Partial<Record<BrowserId, string>> = {};
  for (const b of BROWSER_ORDER) {
    const explicit = patch.overrides[b];
    if (explicit !== undefined) out[b] = explicit;
    else if (patch.overrideShared !== undefined && existing && hasSource(existing, b)) {
      out[b] = patch.overrideShared;
    }
  }
  return out;
}

export function parseSource(
  fileOrNamespace: HasModulesAndStatements,
  browser: BrowserId,
  ir: Map<string, IRNamespace>,
  namespaceNames?: string[],
  prefix = "",
  /**
   * Where a declaration sitting at the ROOT of `browser` belongs.
   *
   * WebKit declares its extension dictionaries at file scope, so the Safari
   * package emits them as `browser.Cookie` rather than
   * `browser.cookies.Cookie`. A declaration with no namespace has nowhere to
   * go, so without this it is dropped. The map is derived rather than curated:
   * see scripts/derive-relocations.ts.
   */
  relocations?: ReadonlyMap<string, string>
) {
  // 1. Process nested modules/namespaces
  for (const mod of fileOrNamespace.getModules()) {
    const rawName = mod.getName().replace(/['"]/g, '');
    let cleanName = rawName;
    if (browser === "firefox" || browser === "safari") {
      if (cleanName.startsWith("browser.")) {
        cleanName = cleanName.substring("browser.".length);
      } else if (cleanName === "browser") {
        parseSource(mod, browser, ir, namespaceNames, "", relocations);
        continue;
      }
    }
    const currentFullName = prefix ? `${prefix}.${cleanName}` : cleanName;

    // Check if this namespace or any subnamespace is in our target coverage (or traverse all if filter omitted)
    const isTarget = !namespaceNames || namespaceNames.length === 0 || namespaceNames.some(ns => ns === currentFullName || ns.startsWith(`${currentFullName}.`));
    if (isTarget) {
      parseSource(mod, browser, ir, namespaceNames, currentFullName, relocations);
    }
  }

  // 2. Extract top-level elements for the current namespace
  if (prefix || relocations) {
    if (prefix && !ir.has(prefix)) {
      ir.set(prefix, { name: prefix, elements: new Map() });
    }
    /** The namespace a declaration belongs to: its own, or its derived home. */
    const nsFor = (name: string): IRNamespace | undefined => {
      const target = prefix || relocations?.get(name);
      if (!target) return undefined;
      if (!ir.has(target)) ir.set(target, { name: target, elements: new Map() });
      return ir.get(target)!;
    };

    for (const statement of fileOrNamespace.getStatements()) {
      let source = statement.getText();
      if (relocations) {
        // Relocating a declaration is only half the job: every reference to it
        // still reads `browser.Tab`, which stops resolving the moment the type
        // moves into `tabs`. Rewrite references with the same derived map, so
        // the two halves cannot disagree. A `browser.X` that is not a relocated
        // type is a namespace reference, and simply loses the prefix.
        source = source.replace(/\bbrowser\.(\w+)/g, (_m, name: string) => {
          const target = relocations.get(name);
          return target ? `${target}.${name}` : name;
        });
      }

      let declsToProcess: { name: string; kind: IRElement["kind"]; typeParamsCount: number }[] = [];

      if (Node.isFunctionDeclaration(statement)) {
        declsToProcess.push({
          name: statement.getName() || "",
          kind: "function",
          typeParamsCount: statement.getTypeParameters().filter(tp => !tp.getDefault()).length
        });
      } else if (Node.isInterfaceDeclaration(statement)) {
        declsToProcess.push({
          name: statement.getName(),
          kind: "interface",
          typeParamsCount: statement.getTypeParameters().filter(tp => !tp.getDefault()).length
        });
      } else if (Node.isClassDeclaration(statement)) {
        declsToProcess.push({
          name: statement.getName() || "",
          kind: "type",
          typeParamsCount: statement.getTypeParameters().filter(tp => !tp.getDefault()).length
        });
      } else if (Node.isTypeAliasDeclaration(statement)) {
        declsToProcess.push({
          name: statement.getName(),
          kind: "type",
          typeParamsCount: statement.getTypeParameters().filter(tp => !tp.getDefault()).length
        });
      } else if (Node.isEnumDeclaration(statement)) {
        declsToProcess.push({
          name: statement.getName(),
          kind: "type",
          typeParamsCount: 0
        });
      } else if (Node.isVariableStatement(statement)) {
        for (const decl of statement.getDeclarations()) {
          declsToProcess.push({
            name: decl.getName(),
            kind: "variable",
            typeParamsCount: 0
          });
        }
      }

      for (const { name, kind, typeParamsCount } of declsToProcess) {
        if (!name) continue;
        const irNs = nsFor(name);
        // A root-level declaration with no derived home is dropped rather than
        // guessed at. derive-relocations exits non-zero when that happens, so
        // this cannot go unnoticed.
        if (!irNs) continue;

        if (!irNs.elements.has(name)) {
          irNs.elements.set(name, mkElement(name, kind));
        }
        const el = irNs.elements.get(name)!;
        const prior = getSource(el, browser);
        setSource(el, browser, prior ? prior + "\n" + source : source);
        if (getTypeParams(el, browser) === 0) setTypeParams(el, browser, typeParamsCount);
      }
    }
  }
}

function extractTypeParams(source?: string, name?: string): string[] {
  if (!source) return [];
  const clean = normalizeSource(source);

  let startIdx = -1;
  if (name) {
    const match = new RegExp(`\\b${name}\\s*<`).exec(clean);
    if (match) startIdx = match.index + match[0].length;
  } else {
    const idx = clean.indexOf("<");
    if (idx !== -1 && !clean.slice(0, idx).includes("{") && !clean.slice(0, idx).includes("=")) {
      startIdx = idx + 1;
    }
  }

  if (startIdx === -1) return [];

  let depth = 1;
  let endIdx = -1;
  for (let i = startIdx; i < clean.length; i++) {
    if (clean[i] === '=' && clean[i + 1] === '>') {
      i++;
      continue;
    }
    if (clean[i] === '<') {
      depth++;
    } else if (clean[i] === '>') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) return [];
  const paramStr = clean.slice(startIdx, endIdx);

  const params: string[] = [];
  let current = "";
  let pDepth = 0;
  let bDepth = 0;
  let aDepth = 0;
  for (let i = 0; i < paramStr.length; i++) {
    const ch = paramStr[i];
    if (ch === '=' && paramStr[i + 1] === '>') {
      current += "=>";
      i++;
      continue;
    }
    if (ch === '(') pDepth++;
    else if (ch === ')') pDepth--;
    else if (ch === '[') bDepth++;
    else if (ch === ']') bDepth--;
    else if (ch === '<') aDepth++;
    else if (ch === '>') aDepth--;
    else if (ch === ',' && pDepth === 0 && bDepth === 0 && aDepth === 0) {
      params.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) params.push(current.trim());

  return params;
}

function countTypeParams(source: string | undefined, name: string): number {
  return extractTypeParams(source, name).length;
}

/**
 * Apply the patch layer to the IR.
 *
 * `patchDir` exists so tooling can evaluate a modified patch set without
 * rewriting the real `patches/` directory. Anything that mutates tracked files
 * to answer a question will eventually be interrupted and leave them mutated,
 * so verification tools must pass a scratch directory instead.
 */
export function applyPatches(ir: Map<string, IRNamespace>, patchDir = "patches") {
  if (fs.existsSync(patchDir)) {
    const files = fs.readdirSync(patchDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const patchPath = path.join(patchDir, file);
        const raw = JSON.parse(fs.readFileSync(patchPath, "utf8"));
        const items = Array.isArray(raw) ? raw : [raw];
        for (const item of items) {
          const patch = validatePatch(item, patchPath);
          let irNs = ir.get(patch.namespace);
          if (!irNs) {
            irNs = { name: patch.namespace, elements: new Map() };
            ir.set(patch.namespace, irNs);
          }
          let el = irNs.elements.get(patch.element);
          const sources = patchSources(patch, el);
          if (Object.keys(sources).length === 0) {
            throw new Error(
              `Patch ${patchPath} (${patch.namespace}.${patch.element}) applies to no browser. ` +
              `"overrideShared" only corrects declarations that already exist, and no upstream ` +
              `declares this element, so name the browsers explicitly with ` +
              `${BROWSER_ORDER.map(overrideKey).join(" / ")}.`
            );
          }
          if (!el) {
            const first = BROWSER_ORDER.map((b) => sources[b]).find((v) => v) ?? "";
            const source = normalizeSource(first.trim());
            let kind: IRElement["kind"] = "type";
            if (/(?:^|\s)function\b/.test(source)) kind = "function";
            else if (/(?:^|\s)interface\b/.test(source)) kind = "interface";
            else if (/(?:^|\s)(?:var|const|let)\b/.test(source)) kind = "variable";
            else if (/(?:^|\s)namespace\b/.test(source)) kind = "namespace";
            const init: Partial<Record<BrowserId, { source?: string; typeParams?: number }>> = {};
            for (const b of BROWSER_ORDER) {
              init[b] = {
                source: sources[b],
                typeParams: countTypeParams(sources[b], patch.element),
              };
            }
            el = mkElement(patch.element, kind, init);
            el.bugUrl = patch.bug_url;
            el.patchReason = patch.reason;
            irNs.elements.set(patch.element, el);
          } else {
            el.bugUrl = patch.bug_url || el.bugUrl;
            el.patchReason = patch.reason || el.patchReason;
            if (patch.mode === "replace") {
              for (const b of BROWSER_ORDER) {
                const text = sources[b];
                if (text === undefined) continue;
                setSource(el, b, text);
                setTypeParams(el, b, countTypeParams(text, patch.element));
              }
            } else {
              // Default: merge via declaration merging (append)
              if (el.kind === "type") {
                throw new Error(`Patch ${patchPath} specifies merge mode for type alias ${patch.namespace}.${patch.element}. Type aliases do not support declaration merging; use mode: "replace" instead.`);
              }
              for (const b of BROWSER_ORDER) {
                const text = sources[b];
                if (!text) continue;
                const prior = getSource(el, b);
                setSource(el, b, (prior ? prior + "\n" : "") + text);
              }
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
 * Decision 20: unified declaration set
 *
 * `chrome.*` and `browser.*` are ALIASES, not browser-specific surfaces: in
 * Firefox `browser === chrome`, and in Chrome `browser` is `chrome` minus a
 * few renderer-injected legacy members that never appear in `chrome-types`.
 * Which browser's signature applies is decided by the runtime, not by the
 * namespace the developer typed.
 *
 * So we emit ONE canonical merged set under `chrome` and alias `browser` to
 * it. That turns the old per-namespace routing into real element merging,
 * because TypeScript rejects the alternatives outright:
 *
 *   two same-name type aliases in one namespace  -> TS2300 duplicate identifier
 *   two same-name interfaces w/ conflicting member -> TS2717
 *   two same-name consts                         -> TS2451
 *
 * Only interfaces with strictly disjoint members survive naive duplication.
 * ========================================================================== */

/**
 * Browsers this project can emit types for, in canonical display order.
 * Adding one means appending here, not enumerating combinations elsewhere.
 */
export const BROWSER_ORDER = ["chrome", "firefox", "safari"] as const;
export type BrowserId = (typeof BROWSER_ORDER)[number];

const BROWSER_LABEL: Record<BrowserId, string> = {
  chrome: "Chrome",
  firefox: "Firefox",
  safari: "Safari",
};

/**
 * Which browsers support a declaration. A set rather than a string union: two
 * browsers give 3 combinations, three give 7, four give 15, and enumerating
 * them as literals is what made Safari impossible to add.
 */
export type Provenance = ReadonlySet<BrowserId>;

/** Build a Provenance in canonical order, whatever order the ids arrive in. */
export function mkProv(...ids: BrowserId[]): Provenance {
  const set = new Set(BROWSER_ORDER.filter((b) => ids.includes(b)));
  if (set.size === 0) {
    // The old string union had no value for "no browsers", and the emitter has
    // no sensible output for it: `@supported ` with nothing after it.
    throw new Error("mkProv() requires at least one browser");
  }
  return set;
}

/** "Safari declares" / "Chrome, Firefox declare", for prose inside a note. */
function labelVerb(bs: BrowserId[], verb: string): string {
  return `${labelList(bs)} ${verb}${bs.length === 1 ? "s" : ""}`;
}

/** Render a browser list for prose inside a note: "Chrome", "Chrome, Safari". */
function labelList(bs: BrowserId[]): string {
  return BROWSER_ORDER.filter((b) => bs.includes(b)).map((b) => BROWSER_LABEL[b]).join(", ");
}

/** Render for the `@supported` annotation: "Chrome", "Chrome, Firefox". */
export function formatProvenance(p: Provenance): string {
  return BROWSER_ORDER.filter((b) => p.has(b)).map((b) => BROWSER_LABEL[b]).join(", ");
}

/** The browser ids in canonical order, for metadata. */
export function provList(p: Provenance): BrowserId[] {
  return BROWSER_ORDER.filter((b) => p.has(b));
}

/** An element the merger could not combine. Must be resolved by the patch layer. */
export interface MergeIssue {
  namespace: string;
  element: string;
  kind: string;
  reason: string;
}

/** Per-member provenance for the queryable metadata export (RFC §4). */
export interface MetaEntry {
  path: string;
  supported: Provenance;
  note?: string;
}

const scratchProject = new Project({ useInMemoryFileSystem: true });
let scratchSeq = 0;
function parseFragment(text: string): SourceFile {
  return scratchProject.createSourceFile(`__merge${scratchSeq++}.d.ts`, text, { overwrite: true });
}

/**
 * The browsers a target-pruned build may draw declaration text from.
 *
 * A target build is that browser's own view. Merging all browsers and then
 * dropping the unsupported declarations keeps union arms contributed by
 * browsers whose types were pruned, which is why dist/chrome-only.d.ts shipped
 * 108 dangling references to things it does not declare.
 */
function sourceOrder(target?: BrowserId): readonly BrowserId[] {
  return target ? BROWSER_ORDER.filter((b) => b === target) : BROWSER_ORDER;
}

/** True when a declaration with this provenance survives a target-pruned build. */
function keptForTarget(p: Provenance, target?: BrowserId): boolean {
  // Equivalent to the old three-way literal comparison: a declaration survives
  // a target-pruned build exactly when that target is in its provenance.
  return !target || p.has(target);
}

function formatSupportComment(
  supported: Provenance,
  bugUrl?: string,
  note?: string,
  patchReason?: string
): string {
  // Only a patch that claims an upstream defect may say so in shipped output.
  // Convergence, naming and enhancement patches assert nothing about upstream.
  const bugLine = patchReason === "upstream-defect" && bugUrl
    ? `\n * @see ${bugUrl}`
    : "";
  const noteLine = note ? `\n * @note ${note}` : "";
  return `/**\n * @supported ${formatProvenance(supported)}${noteLine}${bugLine}\n */\n`;
}

const dedupe = <T,>(xs: T[]): T[] => [...new Set(xs)];

/**
 * Add or remove the `?` marking a method signature optional.
 *
 * TypeScript requires every signature in an overload set to agree on
 * optionality (TS2386), so a merged set has to be normalized as a whole --
 * per-signature handling is not enough once one browser contributes several
 * overloads and the other contributes an optional one.
 */
function setMethodOptional(text: string, optional: boolean): string {
  const m = /^(\s*)([A-Za-z0-9_$]+)(\??)(\s*[<(])/.exec(text);
  if (!m) return text;
  const marker = optional ? "?" : "";
  return text.slice(0, m[1].length + m[2].length) + marker + text.slice(m.index + m[0].length - m[4].length);
}

/** True when this member signature is marked optional. */
function isOptionalMember(text: string): boolean {
  return /^\s*[A-Za-z0-9_$]+\?\s*[<(:]/.test(text);
}

/** Drop the `?` that marks an optional member, so two members can be compared modulo optionality. */
function stripOptionalMarker(canonical: string): string {
  return canonical.replace(/\?(?=\s*[<(:])/, "");
}

/**
 * `[k: string]: A` + `[k: string]: B` -> `[k: string]: A | B` (TS2374 forbids
 * duplicate index signatures). N-ary and deduplicating: folding this pairwise
 * emitted an arm per browser, so two browsers that agree produced `A | B | A`.
 */
function unionIndexSignatures(texts: string[]): string {
  const cut = (s: string) => {
    const i = s.indexOf("]:");
    return i === -1 ? undefined : { head: s.slice(0, i + 2), type: s.slice(i + 2).trim() };
  };
  const parts = texts.map(cut);
  if (parts.some((p) => !p)) return texts[0];
  const arms = distinctArms(parts.map((p) => p!.type));
  return arms.length === 1 ? texts[0]
    : `${parts[0]!.head} ${arms.map((a) => (endsInArrow(a) ? `(${a})` : wrapUnion(a))).join(" | ")}`;
}
const wrapUnion = (t: string) => (/[|&]/.test(t) && !/^\(/.test(t) ? `(${t})` : t);
/**
 * Does this type end in a function return, so that a following `| X` would be
 * swallowed into it? Only a `=>` at bracket depth 0 can do that; one inside
 * `{ cb: () => void }` is already delimited.
 */
function endsInArrow(t: string): boolean {
  let depth = 0;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === "(" || c === "[" || c === "{" || c === "<") depth++;
    else if (c === ")" || c === "]" || c === "}" || c === ">") depth--;
    else if (c === "=" && t[i + 1] === ">" && depth === 0) return true;
  }
  return false;
}

/**
 * Parenthesise a union arm that would otherwise reassociate.
 *
 * `() => string | () => number` does not parse as two function arms: the union
 * binds inside the first arm's return type. Unions themselves are associative,
 * so an arm carrying `|` needs no brackets and wrapping it only made the output
 * uglier across 46 declarations.
 */
const wrapArm = (t: string) => (endsInArrow(t) ? `(${t})` : t);
/** Distinct arms in order, compared the way every other fold compares types. */
function distinctArms(types: string[]): string[] {
  const out: string[] = [];
  for (const t of types) {
    if (!out.some((u) => canonicalizeSignature(u) === canonicalizeSignature(t))) out.push(t);
  }
  return out;
}

/**
 * `foo: A` + `foo: B` -> `foo: A | B`, optional if any browser makes it
 * optional. N-ary and deduplicating: a pairwise fold compares each type only
 * against the accumulated union, so three browsers where the first and third
 * agree emitted `A | B | A`.
 */
function unionMembers(texts: string[]): string {
  const split = (s: string) => {
    const i = s.indexOf(":");
    return i === -1 ? undefined : { head: s.slice(0, i), type: s.slice(i + 1).trim().replace(/^\|\s*/, "") };
  };
  const parts = texts.map(split);
  if (parts.some((p) => !p)) return texts[0]; // defensive: callers gate on PropertySignature
  const optional = parts.some((p) => p!.head.includes("?"));
  const head = parts[0]!.head.replace("?", "") + (optional ? "?" : "");
  const arms = distinctArms(parts.map((p) => p!.type));
  return `${head}: ${arms.length === 1 ? arms[0] : arms.map(wrapArm).join(" | ")}`;
}

/**
 * A property only one browser declares may be absent at runtime, so it is
 * emitted optional. Callers must gate this on the AST kind, since it assumes the
 * first colon separates the member name from its type, which is only true for
 * a PropertySignature.
 */
function makeOptional(text: string): string {
  const i = text.indexOf(":");
  if (i === -1) return text;
  const head = text.slice(0, i);
  if (head.includes("?")) return text;
  return `${head}?${text.slice(i)}`;
}

interface MemberDecl {
  text: string;
  /** True only for PropertySignature. Methods, call/construct/index signatures are not properties. */
  isProperty: boolean;
  /** Index signatures cannot be duplicated for the same key type (TS2374); their value types are unioned. */
  isIndex: boolean;
}

interface ParsedInterface {
  text: string;
  typeParams: string;
  extendsList: string[];
  members: Map<string, MemberDecl[]>;
}

function parseInterface(src?: string): ParsedInterface | undefined {
  if (!src) return undefined;
  // ALL interface declarations in the fragment, not just the first. A patch
  // applied with mode "merge" appends its body to the upstream source, so the
  // fragment holds two same-named declarations that TypeScript would merge.
  // Reading only [0] silently discarded the patch, which made merge mode look
  // like it did nothing for interfaces.
  const decls = parseFragment(src).getInterfaces();
  const decl = decls[0];
  if (!decl) return undefined;
  const members = new Map<string, MemberDecl[]>();
  const unnamedSeen: Record<string, number> = {};
  const allMembers = decls.flatMap(d => d.getMembers());
  for (const m of allMembers) {
    const named = (m as unknown as { getName?: () => string }).getName;
    let key: string;
    if (named) {
      key = named.call(m);
    } else {
      const k = m.getKind();
      const tag = k === SyntaxKind.IndexSignature ? "index"
        : k === SyntaxKind.CallSignature ? "call"
          : k === SyntaxKind.ConstructSignature ? "construct" : "sig";
      unnamedSeen[tag] = (unnamedSeen[tag] ?? 0);
      key = `__${tag}_${unnamedSeen[tag]++}`;
    }
    if (!members.has(key)) members.set(key, []);
    // Kind comes from the AST, never from scanning the text for a colon: the
    // first colon in `createStatusBarButton(iconPath?: string, ...)` belongs to
    // a parameter, and treating it as the member separator splices signatures
    // together into invalid syntax.
    const entry = {
      text: m.getText().replace(/;$/, ""),
      isProperty: m.getKind() === SyntaxKind.PropertySignature,
      isIndex: m.getKind() === SyntaxKind.IndexSignature,
    };
    const prior = members.get(key)!;
    // A patch fragment appended after the upstream one re-declares a member to
    // correct it. Later wins for properties and index signatures; methods
    // accumulate, because those are overload sets.
    if (entry.isProperty || entry.isIndex) {
      const at = prior.findIndex(d => d.isProperty || d.isIndex);
      if (at >= 0) { prior[at] = entry; continue; }
    }
    prior.push(entry);
  }
  const tp = decl.getTypeParameters();
  return {
    text: decl.getText(),
    typeParams: tp.length ? `<${tp.map(p => p.getText()).join(", ")}>` : "",
    extendsList: dedupe(decls.flatMap(d => d.getExtends().map(e => e.getText()))),
    members,
  };
}

/**
 * Merge two interfaces member by member, carrying per-member provenance.
 *
 * Per-member tagging is what the metadata export needs: audit data showed
 * divergence is overwhelmingly property-level (384 property-level findings
 * against 53 signature-level), concentrated in a handful of recurring
 * properties such as cookieStoreId, windowId and origins.
 */
function mergeInterface(
  ns: string,
  el: IRElement,
  issues: MergeIssue[],
  meta: MetaEntry[],
  target?: BrowserId
): string | undefined {
  // Keyed by browser and populated in BROWSER_ORDER, so every "first one wins"
  // decision below resolves in canonical order without naming a browser.
  const order = sourceOrder(target);
  const parsed = new Map<BrowserId, ParsedInterface>();
  for (const b of order) {
    const p = parseInterface(getSource(el, b));
    if (p) parsed.set(b, p);
  }

  if (parsed.size === 0) {
    // Declared as an interface in the IR but not parseable as one: emit the raw
    // source rather than dropping the element.
    const present = order.filter((b) => getSource(el, b) !== undefined);
    if (present.length === 0) return undefined;
    const kept = present[0];
    const src = getSource(el, kept)!;
    // Only claim the browsers whose declaration actually agrees with the one
    // being emitted. This previously claimed both browsers whenever both
    // existed while emitting Chrome's text, so a divergent pair shipped a false
    // support claim.
    const canon = canonicalizeSignature(src);
    const agreeing = present.filter((b) => canonicalizeSignature(getSource(el, b)!) === canon);
    const prov = mkProv(...agreeing);
    if (!keptForTarget(prov, target)) return undefined;
    issues.push({
      namespace: ns, element: el.name, kind: "interface",
      reason: agreeing.length < present.length
        ? `not parseable as an interface and declarations differ; ${BROWSER_LABEL[kept]} kept`
        : "not parseable as an interface; raw source emitted",
    });
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + ensureExport(src) + "\n";
  }

  if (parsed.size === 1) {
    const [browser, only] = [...parsed][0];
    const prov = mkProv(browser);
    if (!keptForTarget(prov, target)) return undefined;
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    const heritage = only.extendsList.length ? ` extends ${only.extendsList.join(", ")}` : "";
    const memberLines = [...only.members.values()].flatMap(mList => mList.map(m => `    ${m.text};`));
    const body = memberLines.length ? ` {\n${memberLines.join("\n")}\n}` : ` {}`;
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + `export interface ${el.name}${only.typeParams}${heritage}${body}\n`;
  }

  const browsers = [...parsed.keys()];
  const forms = browsers.map((b) => parsed.get(b)!);

  const typeParamForms = forms.map((p) => p.typeParams);
  const keptParams = typeParamForms.find((t) => t) ?? "";

  // Two browsers can declare the same generic with different letters:
  // `InjectionResult<R = unknown>` and `InjectionResult<T = unknown>` are the
  // same type, and treating them as divergent dropped one browser's members and
  // its support claim for nothing. Rename each browser's parameters positionally
  // onto the kept names before comparing, and rewrite its member text with them,
  // so the emitted declaration is one type rather than two.
  const paramNames = (tp: string): string[] =>
    tp ? [...tp.slice(1, -1).matchAll(/(^|,)\s*([A-Za-z_$][\w$]*)/g)].map((m) => m[2]) : [];
  const keptNames = paramNames(keptParams);
  /**
   * Canonical form of a type-parameter list, read from the AST, with an
   * optional rename applied.
   *
   * Built from the parsed nodes rather than from the source text, so the two
   * sides of a comparison cannot differ over spacing, and so a rename touches
   * parameter names and the type references inside constraints and defaults,
   * never anything else. Comparing normalized forms is what makes
   * `<T = unknown>` and `<R = unknown>` recognisably the same list.
   */
  const normalizeParams = (tp: string, map?: Map<string, string>): string => {
    if (!tp) return "";
    let decl;
    try {
      decl = parseFragment(`interface __P${tp} {}`).getInterfaces()[0];
    } catch {
      return tp;
    }
    if (!decl) return tp;
    const rename = (node: Node | undefined): string => {
      if (!node) return "";
      if (!map || map.size === 0) return node.getText();
      const edits: Array<{ start: number; end: number; to: string }> = [];
      for (const id of [node, ...node.getDescendants()]) {
        if (!Node.isIdentifier(id)) continue;
        const to = map.get(id.getText());
        if (to === undefined) continue;
        const parent = id.getParent();
        if (!Node.isTypeReference(parent)) continue;
        edits.push({ start: id.getStart(), end: id.getEnd(), to });
      }
      const base = node.getStart();
      let out = "";
      let cursor = base;
      for (const e of edits.sort((a, b) => a.start - b.start)) {
        out += node.getSourceFile().getFullText().slice(cursor, e.start) + e.to;
        cursor = e.end;
      }
      return out + node.getSourceFile().getFullText().slice(cursor, node.getEnd());
    };
    const parts = decl.getTypeParameters().map((p) => {
      const name = map?.get(p.getName()) ?? p.getName();
      const constraint = p.getConstraint();
      const dflt = p.getDefault();
      return name +
        (constraint ? ` extends ${rename(constraint)}` : "") +
        (dflt ? ` = ${rename(dflt)}` : "");
    });
    return parts.length ? `<${parts.join(", ")}>` : "";
  };

  const renameFor = (tp: string): Map<string, string> | undefined => {
    const names = paramNames(tp);
    if (names.length !== keptNames.length) return undefined;
    const map = new Map<string, string>();
    names.forEach((n, i) => map.set(n, keptNames[i]));
    return map;
  };
  /**
   * Rewrite type-parameter references, structurally.
   *
   * Only identifiers the parser reports as type references are candidates. A
   * property name and the contents of a string literal are not type references,
   * so neither can be rewritten: a textual substitution cannot make that
   * distinction, and rewriting either one would emit a declaration no input
   * contains.
   */
  const applyRename = (text: string, map: Map<string, string>): string => {
    if (map.size === 0) return text;
    let file;
    try {
      file = parseFragment(`interface __R {\n${text.replace(/;?\s*$/, "")};\n}`);
    } catch {
      return text;
    }
    const iface = file.getInterfaces()[0];
    if (!iface) return text;
    const member = iface.getMembers()[0];
    if (!member) return text;

    // Collect first, edit after: renaming invalidates positions as it goes.
    const edits: Array<{ start: number; end: number; to: string }> = [];
    for (const id of member.getDescendantsOfKind(SyntaxKind.Identifier)) {
      const to = map.get(id.getText());
      if (to === undefined) continue;
      const parent = id.getParent();
      // A type reference, or the name side of one. Never a property name, a
      // string literal, or a member of a qualified name like `tabs.Tab`.
      const isTypeRef = Node.isTypeReference(parent) ||
        (Node.isQualifiedName(parent) && parent.getLeft() === id);
      if (!isTypeRef) continue;
      edits.push({ start: id.getStart(), end: id.getEnd(), to });
    }
    if (edits.length === 0) return text;

    const full = file.getFullText();
    let out = "";
    let cursor = 0;
    for (const e of edits.sort((a, b) => a.start - b.start)) {
      out += full.slice(cursor, e.start) + e.to;
      cursor = e.end;
    }
    out += full.slice(cursor);

    // Recover the member text from the synthetic wrapper.
    const body = out.slice(out.indexOf("{") + 1, out.lastIndexOf("}"));
    const result = body.trim().replace(/;$/, "");

    // Backstop: the walk above should make this unreachable. A transformation
    // attributed to a browser must never alter that browser's literals.
    const lits = (t: string) => (t.match(/"[^"\n]*"|'[^'\n]*'/g) ?? []).join("\u0000");
    if (lits(result) !== lits(text)) {
      throw new Error(
        `Renaming type parameters altered a string literal:\n  before: ${text}\n  after:  ${result}\n` +
        `A transformation attributed to a browser must preserve that browser's literals.`
      );
    }
    return result;
  };

  /**
   * A parameter name that already means something else in the target form
   * would be captured by the rename, silently merging two different types.
   */
  const capturesName = (form: ParsedInterface, map: Map<string, string>): boolean => {
    const incoming = new Set(map.values());
    return [...form.members].some(([name, decls]) =>
      incoming.has(name) || decls.some((d) => {
        const head = /^\s*([A-Za-z_$][\w$]*)/.exec(d.text)?.[1];
        return head !== undefined && incoming.has(head) && !map.has(head);
      }));
  };

  for (let i = 0; i < browsers.length; i++) {
    const tp = typeParamForms[i];
    if (tp === keptParams || !tp) continue;
    const map = renameFor(tp);
    if (!map || normalizeParams(tp, map) !== normalizeParams(keptParams)) continue;
    if (capturesName(forms[i], map)) continue;
    // Same shape, different letters: rewrite this browser's members onto the
    // kept names so they merge instead of being discarded.
    const form = forms[i];
    for (const [, decls] of form.members) {
      for (const d of decls) d.text = applyRename(d.text, map);
    }
    typeParamForms[i] = keptParams;
  }

  // A browser can decline the generic entirely: Chrome and Firefox declare
  // `StorageChange<T = unknown>` while Safari declares `StorageChange`. If every
  // parameter has a default, the ungeneric form IS the generic one instantiated
  // at those defaults, so the two are the same type written two ways. Where the
  // members agree under that substitution, adopt the parameterized text for the
  // ungeneric browser: it keeps one declaration and one honest support claim
  // instead of discarding a browser over spelling.
  const keptIndex = typeParamForms.findIndex((t) => t === keptParams && t);
  const defaults = new Map<string, string>();
  if (keptParams) {
    for (const part of keptParams.slice(1, -1).split(",")) {
      const m = /^\s*([A-Za-z_$][\w$]*)[^=]*=\s*(.+?)\s*$/.exec(part);
      if (m) defaults.set(m[1], m[2]);
    }
  }
  // Only a TOP-TYPE default is safe to substitute. With `T = string`, the
  // ungeneric browser supports exactly the string instantiation, and adopting
  // the generic text would claim it for every instantiation.
  const allDefaulted = keptNames.length > 0 &&
    keptNames.every((n) => defaults.get(n) === "unknown" || defaults.get(n) === "any");

  if (keptIndex >= 0 && allDefaulted) {
    const keptForm = forms[keptIndex];
    const substitute = (text: string) => applyRename(text, defaults);
    for (let i = 0; i < browsers.length; i++) {
      if (typeParamForms[i] !== "" || i === keptIndex) continue;
      const form = forms[i];
      const sameNames = form.members.size === keptForm.members.size &&
        [...form.members.keys()].every((k) => keptForm.members.has(k));
      if (!sameNames) continue;
      const equivalent = [...form.members].every(([name, decls]) => {
        const keptDecls = keptForm.members.get(name)!;
        return decls.length === keptDecls.length && decls.every((d, j) =>
          canonicalizeSignature(d.text) === canonicalizeSignature(substitute(keptDecls[j].text)));
      });
      if (!equivalent) continue;
      for (const [name, decls] of form.members) {
        const keptDecls = keptForm.members.get(name)!;
        decls.forEach((d, j) => { d.text = keptDecls[j].text; });
      }
      typeParamForms[i] = keptParams;
    }
  }
  /**
   * Browsers whose declaration uses a DIFFERENT type parameter list than the
   * one being emitted.
   *
   * Their member text names parameters that will not exist: Safari declares
   * `Event<T>` where Chrome declares `Event<H, C, A>`, and emitting Safari's
   * `addListener(callback: T)` under Chrome's parameter list produced
   * `Cannot find name 'T'`. Their members are dropped, and the support claim
   * drops with them, because a form we do not emit is not a form we support.
   */
  const incompatible = new Set(
    browsers.filter((b, i) => typeParamForms[i] !== keptParams)
  );
  if (new Set(typeParamForms).size > 1) {
    issues.push({
      namespace: ns, element: el.name, kind: "interface",
      reason: `type parameters differ (${typeParamForms.map((t) => t || "none").join(" vs ")}); ` +
        `${labelList([...incompatible])} member forms omitted`,
    });
  }

  const names = new Set(
    forms.filter((_, i) => !incompatible.has(browsers[i])).flatMap((p) => [...p.members.keys()])
  );
  const lines: string[] = [];

  for (const name of names) {
    const declaredBy = new Map<BrowserId, MemberDecl[]>();
    for (const b of browsers) {
      if (incompatible.has(b)) continue;
      const m = parsed.get(b)!.members.get(name);
      if (m) declaredBy.set(b, m);
    }
    const declaring = [...declaredBy.keys()];
    const lists = declaring.map((b) => declaredBy.get(b)!);
    const prov = mkProv(...declaring);
    let text: string;
    let note: string | undefined;

    if (declaring.length === 1) {
      const only = lists[0];
      const anyOptional = only.some(d => isOptionalMember(d.text));
      text = only
        .map(d => (d.isProperty ? d.text : setMethodOptional(d.text, anyOptional)))
        .join(";\n    ");
    } else {
      const sameList = (x: MemberDecl[], y: MemberDecl[]) =>
        x.length === y.length &&
        x.every((d, i) => canonicalizeSignature(d.text) === canonicalizeSignature(y[i].text));
      const allSingle = lists.every(l => l.length === 1);
      const identical = lists.every(l => sameList(l, lists[0]));
      const sameModuloOptional = !identical && allSingle &&
        lists.every(l =>
          stripOptionalMarker(canonicalizeSignature(l[0].text)) ===
          stripOptionalMarker(canonicalizeSignature(lists[0][0].text)));

      if (identical) {
        text = lists[0].map(d => d.text).join(";\n    ");
      } else if (sameModuloOptional) {
        // Same signature, optional in some browsers only (Chrome declares
        // `createStatusBarButton(...)`, Firefox `createStatusBarButton?(...)`).
        // Emitting both would collide; widen to the optional form.
        const optionalIn = declaring.filter((b, i) => /\?\s*[(:]/.test(lists[i][0].text));
        const requiredIn = declaring.filter((b) => !optionalIn.includes(b));
        const pick = optionalIn.length ? declaring.indexOf(optionalIn[0]) : 0;
        text = lists[pick][0].text;
        note = `optional in ${labelList(optionalIn)}, required in ${labelList(requiredIn)}`;
      } else if (allSingle && lists.every(l => l[0].isIndex)) {
        text = unionIndexSignatures(lists.map((l) => l[0].text));
        note = "value type differs between browsers";
      } else if (allSingle && lists.every(l => l[0].isProperty)) {
        // Only property signatures can be unioned by type.
        text = unionMembers(lists.map((l) => l[0].text));
        const optionalIn = declaring.filter((b, i) => isOptionalMember(lists[i][0].text));
        const requiredIn = declaring.filter((b) => !optionalIn.includes(b));
        note = optionalIn.length && requiredIn.length
          ? `optional in ${labelList(optionalIn)}, required in ${labelList(requiredIn)}`
          : "shape differs between browsers";
      } else {
        // Methods and call/index signatures: keep every form. Interface methods
        // may be overloaded, so each browser's signatures coexist legally and
        // the developer can reach any calling form.
        // Dedupe modulo optionality: the same signature required in one browser
        // and optional in another is ONE signature, and the set's optionality
        // is decided below. Comparing with the `?` still attached would emit it
        // twice.
        const sameSig = (a: string, b: string) =>
          stripOptionalMarker(canonicalizeSignature(a)) === stripOptionalMarker(canonicalizeSignature(b));
        const combined: string[] = [...lists[0].map(d => d.text)];
        for (const list of lists.slice(1)) {
          for (const d of list) {
            if (!combined.some(u => sameSig(u, d.text))) combined.push(d.text);
          }
        }
        // TS2386: every signature in an overload set must agree on optionality.
        // If any browser declares the member optional it may be absent at
        // runtime, so the whole set is widened to optional.
        // Read optionality from the ORIGINAL lists: dedupe may have dropped the
        // optional variant as a duplicate of the required one, which would lose
        // the fact that a browser can omit this member entirely.
        const anyOptional = lists.flat().some(d => isOptionalMember(d.text));
        text = combined
          .map(t => (lists[0][0].isProperty ? t : setMethodOptional(t, anyOptional)))
          .join(";\n    ");
        note = anyOptional
          ? "signature differs between browsers; both forms emitted, optional in at least one"
          : "signature differs between browsers; both forms emitted";
      }
    }

    if (!keptForTarget(prov, target)) continue;
    meta.push({ path: `${ns}.${el.name}.${name}`, supported: prov, note });
    // The note goes on its own @note line, never appended to @supported.
    // Anything parsing the tag value (the metadata consumers, editors, lint
    // rules) reads to end-of-line, so an inline note corrupts the browser list.
    const doc = note
      ? `    /**\n     * @supported ${formatProvenance(prov)}\n     * @note ${note}\n     */`
      : `    /** @supported ${formatProvenance(prov)} */`;
    lines.push(`${doc}\n    ${text};`);
  }

  const ext = dedupe(
    forms.filter((_, i) => !incompatible.has(browsers[i])).flatMap((p) => p.extendsList)
  );
  const heritage = ext.length ? ` extends ${ext.join(", ")}` : "";
  const prov = mkProv(...browsers.filter((b) => !incompatible.has(b)));
  meta.push({ path: `${ns}.${el.name}`, supported: prov });
  return (
    formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) +
    `export interface ${el.name}${keptParams}${heritage} {\n${lines.join("\n")}\n}\n`
  );
}

/** Type aliases cannot be declared twice (TS2300), so divergent ones become a union (RFC §2 "Incompatible"). */
function mergeTypeAlias(
  ns: string,
  el: IRElement,
  issues: MergeIssue[],
  meta: MetaEntry[],
  target?: BrowserId
): string | undefined {
  const get = (src?: string) => (src ? parseFragment(src).getTypeAliases()[0] : undefined);
  const present = sourceOrder(target).filter((b) => getSource(el, b) !== undefined);
  if (present.length === 0) return undefined;

  const alias = new Map<BrowserId, NonNullable<ReturnType<typeof get>>>();
  for (const b of present) {
    const a = get(getSource(el, b));
    if (a) alias.set(b, a);
  }

  // Classes and anything else that isn't a parseable type alias cannot be
  // merged mechanically.
  if (present.length > 1 && alias.size < present.length) {
    const kept = present[0];
    const keptSrc = getSource(el, kept)!;
    const canon = canonicalizeSignature(keptSrc);
    const agreeing = present.filter((b) => canonicalizeSignature(getSource(el, b)!) === canon);
    if (agreeing.length === present.length) {
      const prov = mkProv(...present);
      meta.push({ path: `${ns}.${el.name}`, supported: prov });
      return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + ensureExport(keptSrc) + "\n";
    }
    // One browser that cannot be parsed as an alias must not cancel a merge the
    // others can do: keep the ones that parse, and report the ones that cannot.
    const unparsed = present.filter((b) => !alias.has(b));

    // ENUM MIRROR. A browser can model the same closed set as a VALUE rather
    // than a type: Chrome and Firefox declare
    // `type ExecutionWorld = "ISOLATED" | "MAIN"`, Safari declares
    // `const ExecutionWorld: { readonly ISOLATED: "ISOLATED"; ... }`. Those are
    // the same fact in the two declaration spaces TypeScript keeps separate, so
    // both can be emitted under one name and each claims exactly the browsers
    // whose input declares it. Nothing is invented: the const text is Safari's
    // own, and Chrome and Firefox are NOT claimed for it even though their
    // implementations expose the value, because no input of ours says so.
    const literalsOf = (node: Node | undefined): string[] =>
      node ? [...node.getText().matchAll(/"([^"]*)"/g)].map((m) => m[1]).sort() : [];
    const aliasLiterals = alias.size
      ? literalsOf([...alias.values()][0].getTypeNode() ?? undefined)
      : [];
    const mirrors = unparsed.filter((b) => {
      const decl = parseFragment(getSource(el, b)!).getVariableStatements()[0]
        ?.getDeclarations()[0];
      const t = decl?.getTypeNode();
      if (!t || t.getKind() !== SyntaxKind.TypeLiteral) return false;
      const members = t.asKindOrThrow(SyntaxKind.TypeLiteral).getMembers();
      // Every member must be `readonly NAME: "NAME"`, and the set of values
      // must match the alias exactly. A near-miss is a real difference.
      const values: string[] = [];
      for (const m of members) {
        if (!Node.isPropertySignature(m)) return false;
        if (!m.getText().trimStart().startsWith("readonly ")) return false;
        const lit = /^"([^"]*)"$/.exec(m.getTypeNode()?.getText() ?? "");
        if (!lit || lit[1] !== m.getName()) return false;
        values.push(lit[1]);
      }
      return values.length > 0 &&
        values.sort().join("\u0000") === aliasLiterals.join("\u0000");
    });

    if (alias.size > 0 && mirrors.length === unparsed.length && mirrors.length > 0) {
      const aliasProv = mkProv(...alias.keys());
      const mirrorProv = mkProv(...mirrors);
      if (!keptForTarget(aliasProv, target) && !keptForTarget(mirrorProv, target)) return undefined;
      meta.push({ path: `${ns}.${el.name}`, supported: mkProv(...present),
                  note: "declared as a type in some browsers and as a value in others" });
      let out = "";
      if (keptForTarget(aliasProv, target)) {
        out += formatSupportComment(aliasProv, el.bugUrl,
          `${labelVerb(mirrors, "declare")} this as a value; the const below carries it`,
          el.patchReason) + ensureExport([...alias.values()][0].getText()) + "\n";
      }
      if (keptForTarget(mirrorProv, target)) {
        out += formatSupportComment(mirrorProv, el.bugUrl,
          `${labelVerb([...alias.keys()], "declare")} this name as a type only, and no value for it. ` +
          `Whether those runtimes expose the value is a question their type packages do not answer`, el.patchReason) +
          ensureExport(getSource(el, mirrors[0])!) + "\n";
      }
      return out;
    }

    issues.push({
      namespace: ns, element: el.name, kind: "type",
      reason: `not parseable as a type alias in ${labelList(unparsed)}; merged from ${labelList([...alias.keys()])}`,
    });
    if (alias.size === 0) {
      meta.push({ path: `${ns}.${el.name}`, supported: mkProv(kept) });
      return formatSupportComment(mkProv(kept), el.bugUrl, undefined, el.patchReason) + ensureExport(keptSrc) + "\n";
    }
    if (alias.size === 1) {
      const only = [...alias.keys()][0];
      const prov = mkProv(only);
      if (!keptForTarget(prov, target)) return undefined;
      meta.push({ path: `${ns}.${el.name}`, supported: prov });
      return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + ensureExport(alias.get(only)!.getText()) + "\n";
    }
  }

  // Single-sided element. Emit it whatever its form: classes, enums and any
  // declaration ts-morph does not surface as a TypeAliasDeclaration still have
  // valid source text, and dropping them loses API surface silently.
  if (present.length === 1) {
    const browser = present[0];
    const prov = mkProv(browser);
    if (!keptForTarget(prov, target)) return undefined;
    const parsed = alias.get(browser);
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) +
      ensureExport(parsed ? parsed.getText() : getSource(el, browser)!) + "\n";
  }

  const browsers = [...alias.keys()];
  const typeParamForms = browsers.map((b) =>
    alias.get(b)!.getTypeParameters().map(p => p.getText()).join(", "));
  if (new Set(typeParamForms).size > 1) {
    const kept = browsers[0];
    issues.push({
      namespace: ns, element: el.name, kind: "type",
      reason: `type parameters differ (${typeParamForms.map(t => `<${t}>`).join(" vs ")}); ${BROWSER_LABEL[kept]} kept`,
    });
    meta.push({ path: `${ns}.${el.name}`, supported: mkProv(kept) });
    return formatSupportComment(mkProv(kept), el.bugUrl, undefined, el.patchReason) + ensureExport(alias.get(kept)!.getText()) + "\n";
  }

  const tp = typeParamForms[0] ? `<${typeParamForms[0]}>` : "";
  const rhs = browsers.map((b) => alias.get(b)!.getTypeNode()?.getText() ?? "");
  // Distinct right-hand sides in browser order. Two browsers that agree
  // contribute one arm, so a third browser adds an arm only when it really
  // differs.
  const distinct: string[] = [];
  for (const r of rhs) {
    if (!distinct.some(d => canonicalizeSignature(d) === canonicalizeSignature(r))) distinct.push(r);
  }
  const prov = mkProv(...browsers);

  if (distinct.length === 1) {
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + `export type ${el.name}${tp} = ${distinct[0]};\n`;
  }

  meta.push({ path: `${ns}.${el.name}`, supported: prov, note: "union of divergent definitions" });
  return (
    formatSupportComment(prov, el.bugUrl, "definitions differ between browsers; emitted as a union", el.patchReason) +
    `export type ${el.name}${tp} = ${distinct.map(wrapUnion).join(" | ")};\n`
  );
}

/** Consts cannot be declared twice (TS2451), so divergent ones get a unioned type. */
function mergeVariable(
  ns: string,
  el: IRElement,
  meta: MetaEntry[],
  target?: BrowserId
): string | undefined {
  const typeOf = (src?: string): string | undefined => {
    if (!src) return undefined;
    const st = parseFragment(src).getVariableStatements()[0] as VariableStatement | undefined;
    return st?.getDeclarations()[0]?.getTypeNode()?.getText();
  };
  const present = sourceOrder(target).filter((b) => getSource(el, b) !== undefined);
  const types = new Map<BrowserId, string>();
  for (const b of present) {
    const t = typeOf(getSource(el, b));
    if (t !== undefined) types.set(b, t);
  }

  if (types.size === 0) {
    if (present.length === 0) return undefined;
    // No parseable variable type anywhere: keep the first browser's raw text.
    // Deliberately not the agreement rule used elsewhere, because widening the
    // claim here would change what shipped declarations assert without any test
    // reaching this branch.
    const browser = present[0];
    const prov = mkProv(browser);
    if (!keptForTarget(prov, target)) return undefined;
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + ensureExport(getSource(el, browser)!) + "\n";
  }

  const declaring = [...types.keys()];
  if (declaring.length === 1) {
    const prov = mkProv(declaring[0]);
    if (!keptForTarget(prov, target)) return undefined;
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + `export const ${el.name}: ${types.get(declaring[0])};\n`;
  }

  const distinct: string[] = [];
  for (const b of declaring) {
    const t = types.get(b)!;
    if (!distinct.some(d => canonicalizeSignature(d) === canonicalizeSignature(t))) distinct.push(t);
  }
  const prov = mkProv(...declaring);

  if (distinct.length === 1) {
    meta.push({ path: `${ns}.${el.name}`, supported: prov });
    return formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + `export const ${el.name}: ${distinct[0]};\n`;
  }
  meta.push({ path: `${ns}.${el.name}`, supported: prov, note: "type differs between browsers" });
  return (
    formatSupportComment(prov, el.bugUrl, "type differs between browsers; emitted as a union", el.patchReason) +
    `export const ${el.name}: ${distinct.map(wrapUnion).join(" | ")};\n`
  );
}

/**
 * Union both browsers' overload sets into ONE sequence (Decision 21).
 *
 * Matched overloads are emitted once as `Chrome, Firefox`; previously each was
 * emitted twice, once per namespace. Unmatched overloads from either side
 * follow with their own provenance, so a developer working in either namespace
 * can reach every calling form the runtime accepts and can see which browser
 * each belongs to.
 */
function mergeFunction(
  ns: string,
  el: IRElement,
  meta: MetaEntry[],
  target?: BrowserId
): string | undefined {
  const overloads = new Map<BrowserId, string[]>();
  for (const b of sourceOrder(target)) {
    const list = splitFunctionOverloads(getSource(el, b) || "");
    if (list.length) overloads.set(b, list);
  }
  if (overloads.size === 0) return undefined;

  const browsers = [...overloads.keys()];
  /** Overloads already emitted as part of an earlier browser's entry. */
  const claimed = new Map<BrowserId, Set<number>>(browsers.map((b) => [b, new Set<number>()]));
  let out = "";
  let position = 0;

  // Walk browsers in canonical order. Each unclaimed overload is emitted once,
  // claiming the matching overload in every later browser, so an overload all
  // browsers share appears once carrying all of them. Overloads that remain are
  // emitted in their original relative order, since overload precedence is
  // significant.
  for (let bi = 0; bi < browsers.length; bi++) {
    const browser = browsers[bi];
    const list = overloads.get(browser)!;
    for (let idx = 0; idx < list.length; idx++) {
      if (claimed.get(browser)!.has(idx)) continue;
      const canon = canonicalizeSignature(list[idx], true);
      const supporting: BrowserId[] = [browser];
      for (const other of browsers.slice(bi + 1)) {
        const otherList = overloads.get(other)!;
        const match = otherList.findIndex(
          (o, j) => !claimed.get(other)!.has(j) && canonicalizeSignature(o, true) === canon
        );
        if (match >= 0) {
          claimed.get(other)!.add(match);
          supporting.push(other);
        }
      }
      const prov = mkProv(...supporting);
      if (keptForTarget(prov, target)) {
        meta.push({ path: `${ns}.${el.name}.overload[${position}]`, supported: prov });
        out += formatSupportComment(prov, el.bugUrl, undefined, el.patchReason) + ensureExport(list[idx]) + "\n";
      }
      position++;
    }
  }

  return out || undefined;
}


/**
 * Reconcile structural-form mismatches between the two upstreams (Decision 14).
 *
 * The upstreams sometimes model the same API with different TypeScript shapes.
 * `chrome-types` declares grouped settings as a const with an inline object
 * type, while `@types/firefox-webext-browser` declares the same group as a
 * nested namespace:
 *
 *   chrome-types:  namespace privacy   { const network: { networkPredictionEnabled: ... } }
 *   firefox types: namespace privacy.network { const networkPredictionEnabled: ... }
 *
 * Under the old split emission these lived in different top-level namespaces
 * and never met. In the unified set of Decision 20 they collide: a `const` and
 * a `namespace` of the same name cannot merge, so the namespace meaning is lost
 * and `chrome.privacy.network` stops resolving.
 *
 * This expands the const form into the namespace form, but ONLY when the other
 * upstream already models that name as a namespace. That keeps the rewrite
 * targeted -- unrelated consts with object types are left alone.
 */
/**
 * Turn the members of an object type into namespace-level declarations: a
 * property becomes a const, a method becomes a function.
 */
function literalMembers(
  nodes: Node[]
): Array<{ name: string; kind: IRElement["kind"]; source: string }> {
  const out: Array<{ name: string; kind: IRElement["kind"]; source: string }> = [];
  for (const m of nodes) {
    if (Node.isPropertySignature(m)) {
      const t = m.getTypeNode()?.getText();
      if (t) out.push({ name: m.getName(), kind: "variable", source: `export const ${m.getName()}: ${t};` });
    } else if (Node.isMethodSignature(m)) {
      const text = m.getText().replace(/;$/, "");
      out.push({ name: m.getName(), kind: "function", source: `export function ${text};` });
    }
  }
  return out;
}

/**
 * Follow `export import browserAction = browser.action` style aliases.
 *
 * The Safari package exposes browserAction, pageAction and contextMenus as
 * import-equals aliases of action and menus. parseSource ignores those
 * declarations, so 104 paths under those three namespaces claimed no Safari
 * support at all while Safari does implement them. An alias is a real support
 * claim, and dropping it under-reports the browser.
 *
 * Only members the alias target actually declares are claimed, and only where
 * the element already exists: an alias says "the same API is reachable under
 * this second name", not "this browser has every member the other two do".
 */
function applyNamespaceAliases(
  ir: Map<string, IRNamespace>,
  file: HasModulesAndStatements,
  browser: BrowserId
): void {
  const walk = (node: HasModulesAndStatements): Array<[string, string]> => {
    const found: Array<[string, string]> = [];
    for (const st of node.getStatements()) {
      if (Node.isImportEqualsDeclaration(st)) {
        const target = st.getModuleReference().getText().replace(/^browser\./, "");
        found.push([st.getName(), target]);
      }
    }
    for (const mod of node.getModules()) found.push(...walk(mod));
    return found;
  };

  for (const [aliasName, targetName] of walk(file)) {
    const target = ir.get(targetName);
    const alias = ir.get(aliasName);
    if (!target || !alias) continue;
    for (const [name, targetEl] of target.elements) {
      const src = getSource(targetEl, browser);
      const aliasEl = alias.elements.get(name);
      if (!src || !aliasEl || hasSource(aliasEl, browser)) continue;
      setSource(aliasEl, browser, src);
      setTypeParams(aliasEl, browser, getTypeParams(targetEl, browser));
    }
  }
}

export function reconcileStructuralForms(ir: Map<string, IRNamespace>, issues: MergeIssue[] = []): void {
  for (const [nsName, ns] of [...ir.entries()]) {
    for (const [elName, el] of [...ns.elements.entries()]) {
      if (el.kind !== "variable") continue;
      const dotted = `${nsName}.${elName}`;
      const targetNs = ir.get(dotted);
      if (!targetNs) continue; // the other upstream does not model this as a namespace

      for (const side of BROWSER_ORDER) {
        const src = getSource(el, side);
        if (!src) continue;

        const decl = parseFragment(src).getVariableStatements()[0]?.getDeclarations()[0];
        const typeNode = decl?.getTypeNode();
        if (!typeNode) continue;

        // Two shapes reach here. An INLINE object literal is the original case
        // (chrome-types writes `const network: { ... }`). A NAMED reference is
        // the Safari case: WebKit models the API object as an interface, so the
        // package emits `const inspectedWindow: devtools.InspectedWindow`,
        // which collides with the namespace of the same name the other two
        // declare. Resolving the reference is what turns that collision into a
        // merge.
        let members: ReturnType<typeof literalMembers> = [];
        let referenced: { ns: IRNamespace; name: string } | undefined;
        if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
          members = literalMembers(typeNode.asKindOrThrow(SyntaxKind.TypeLiteral).getMembers());
        } else {
          const ref = typeNode.getText().trim();
          const dot = ref.lastIndexOf(".");
          const refNs = dot === -1 ? nsName : ref.slice(0, dot);
          const refName = dot === -1 ? ref : ref.slice(dot + 1);
          const holder = ir.get(refNs);
          const target = holder?.elements.get(refName);
          const refSrc = target ? getSource(target, side) : undefined;
          if (!holder || !target || !refSrc) continue;
          const iface = parseFragment(refSrc).getInterfaces()[0];
          if (!iface) continue;
          members = literalMembers(iface.getMembers());
          referenced = { ns: holder, name: refName };
        }

        if (!members.length) {
          issues.push({
            namespace: nsName, element: elName, kind: "variable",
            reason: `models ${dotted} as a value the other upstream declares as a namespace, but it has no expandable members; needs a patch`,
          });
          continue;
        }

        for (const m of members) {
          let member = targetNs.elements.get(m.name);
          if (!member) {
            member = mkElement(m.name, m.kind);
            targetNs.elements.set(m.name, member);
          }
          setSource(member, side, m.source);
        }

        // The interface only existed to give the const a type; its members now
        // live in the namespace, so leaving it behind would ship the same API
        // twice under two spellings.
        if (referenced) {
          const holder = referenced.ns.elements.get(referenced.name);
          if (holder) {
            setSource(holder, side, undefined);
            if (browsersOf(holder).length === 0) referenced.ns.elements.delete(referenced.name);
          }
        }

        // Drop the const form: the namespace form is now authoritative.
        setSource(el, side, undefined);
      }

      if (browsersOf(el).length === 0) ns.elements.delete(elName);
    }
  }
}

export interface EmitResult {
  dts: string;
  metadata: MetaEntry[];
  issues: MergeIssue[];
}

export function emitDtsDetailed(
  ir: Map<string, IRNamespace>,
  target?: BrowserId
): EmitResult {
  const metadata: MetaEntry[] = [];
  const issues: MergeIssue[] = [];
  const namespaces: string[] = [];

  for (const [nsName, ns] of ir.entries()) {
    let body = "";
    for (const [, el] of ns.elements.entries()) {
      let emitted: string | undefined;
      if (el.kind === "function") {
        emitted = mergeFunction(nsName, el, metadata, target);
      } else if (el.kind === "interface") {
        emitted = mergeInterface(nsName, el, issues, metadata, target);
      } else if (el.kind === "variable") {
        emitted = mergeVariable(nsName, el, metadata, target);
      } else {
        emitted = mergeTypeAlias(nsName, el, issues, metadata, target);
      }
      if (emitted) {
        body += emitted;
      } else {
        // A target-pruned build legitimately drops elements that target does
        // not declare; only a real merge failure is worth reporting.
        const prunable = target !== undefined && !getSource(el, target);
        if (!prunable) {
          issues.push({
            namespace: nsName,
            element: el.name,
            kind: el.kind,
            reason: `produced no output (declared by: ${browsersOf(el).join(", ") || "no browser"})`,
          });
        }
      }
    }
    if (!body && ns.elements.size > 0 && !target) {
      issues.push({
        namespace: nsName, element: "*", kind: "namespace",
        reason: `namespace has ${ns.elements.size} IR element(s) but emitted nothing`,
      });
    }
    if (body) namespaces.push(`export namespace ${nsName} {\n${body}\n}`);
  }

  let output = PREAMBLE + "\n";
  output += `declare namespace chrome {\n`;
  output += namespaces.join("\n\n");
  output += `\n}\n\n`;

  // `browser` aliases the canonical set. `export import X = chrome.X` re-exports
  // BOTH the type and the value meaning, so `browser.tabs.Tab` resolves as a type
  // and `browser.tabs.query()` as a value. A `declare const browser: {...}` form
  // does not, and would break every qualified type reference in the output.
  //
  // The exclusion list is empty (Decision 20): the members Chrome exposes on
  // `chrome` but not `browser` are deprecated app bindings and renderer-injected
  // page APIs, none of which appear in `chrome-types`.
  // Alias only what this build actually emitted. Deriving the list from the IR
  // instead aliased namespaces a target build prunes, so chrome-only.d.ts
  // referenced chrome.urlbar, chrome.sidebarAction and 15 other Firefox-only
  // namespaces that are not in the file.
  const emitted = new Set(
    namespaces.map((n) => /^export namespace ([\w.]+) \{/.exec(n)?.[1]?.split(".")[0])
      .filter((n): n is string => !!n)
  );
  const topLevel = [...emitted].sort();
  output += `declare namespace browser {\n`;
  output += topLevel.map(n => `  export import ${n} = chrome.${n};`).join("\n");
  output += `\n}\n`;

  return { dts: annotateUpstreamAny(output), metadata, issues };
}

/** Backwards-compatible wrapper: returns just the emitted text. */
export function emitDts(ir: Map<string, IRNamespace>, target?: BrowserId): string {
  return emitDtsDetailed(ir, target).dts;
}

export function annotateUpstreamAny(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile("temp.d.ts", content);
  const lines = content.split(/\r?\n/);
  const anyNodes = sourceFile.getDescendantsOfKind(SyntaxKind.AnyKeyword);

  const replacements: number[] = [];
  for (const node of anyNodes) {
    const lineIdx = node.getStartLineNumber() - 1;
    let hasTodo = lines[lineIdx]?.includes("TODO:") ?? false;
    if (lineIdx >= 1 && (lines[lineIdx - 1]?.includes("TODO:") ?? false)) hasTodo = true;
    if (lineIdx >= 2 && (lines[lineIdx - 2]?.includes("TODO:") ?? false)) hasTodo = true;
    if (!hasTodo) {
      replacements.push(node.getStart());
    }
  }

  let result = content;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const idx = replacements[i];
    result = result.slice(0, idx) + "/* TODO: Upstream type uses any */ " + result.slice(idx);
  }

  return result;
}

function resolveTypeArguments(source?: string, paramCount = 0, name?: string): { args: string; hasAny: boolean } {
  if (paramCount === 0 || !source) return { args: "", hasAny: false };

  const params = extractTypeParams(source, name);
  let hasAny = false;
  const argTypes: string[] = [];

  if (params.length > 0) {
    for (let i = 0; i < paramCount; i++) {
      const param = params[i] || "";
      if (/\bextends\s*\([^\)]*\)\s*=>/.test(param)) {
        argTypes.push("(...args: any[]) => void");
        hasAny = true;
      } else if (/\bextends\s*.*any\[\]/.test(param)) {
        argTypes.push("any[]");
        hasAny = true;
      } else if (/\bextends\s*.*\[\]/.test(param)) {
        argTypes.push("unknown[]");
      } else {
        argTypes.push("unknown");
      }
    }
    return { args: "<" + argTypes.join(", ") + ">", hasAny };
  }

  // Fallback if parameter extraction fails
  if (/<[a-zA-Z0-9_]+\s+extends\s*\([^\)]*\)\s*=>/.test(source)) {
    return { args: "<" + new Array(paramCount).fill("(...args: any[]) => void").join(", ") + ">", hasAny: true };
  }
  return { args: "<" + new Array(paramCount).fill("unknown").join(", ") + ">", hasAny: false };
}

/**
 * Remove what a browser's own source says it does not expose.
 *
 * Runs after patching as well as during the build: a patch may correct a
 * declaration, but it may not grant support the browser's schema denies. A
 * claim that needs to survive this needs evidence, which verify:evidence
 * enforces.
 */
export function applyExclusions(ir: Map<string, IRNamespace>): void {
  const members = (JSON.parse(fs.readFileSync("excluded-members.json", "utf8")).excluded as
    Array<{ namespace: string; member: string; browser: BrowserId }>);
  for (const { namespace, member, browser } of members) {
    const el = ir.get(namespace)?.elements.get(member);
    if (!el) continue;
    setSource(el, browser, undefined);
    if (browsersOf(el).length === 0) ir.get(namespace)!.elements.delete(member);
  }
  const namespaces = (JSON.parse(fs.readFileSync("excluded-namespaces.json", "utf8")).excluded as
    Array<{ namespace: string; browser: BrowserId }>);
  for (const { namespace, browser } of namespaces) {
    const ns = ir.get(namespace);
    if (!ns) continue;
    for (const el of ns.elements.values()) setSource(el, browser, undefined);
    for (const [name, el] of [...ns.elements]) {
      if (browsersOf(el).length === 0) ns.elements.delete(name);
    }
    if (ns.elements.size === 0) ir.delete(namespace);
  }
}

/**
 * The IR as the inputs describe it: parse every package, place Safari's
 * root-level declarations, follow namespace aliases, then drop what the
 * browsers' own sources say they do not expose.
 *
 * One builder, used by the generator, the coverage report and the evidence
 * gate. Each previously assembled its own, which is how the coverage report
 * came to describe a different set of APIs than the one that ships.
 */
export function buildIr(): Map<string, IRNamespace> {
  const project = new Project();

  // Load chrome-types
  project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
  const chromeFile = project.getSourceFileOrThrow("index.d.ts");
  const chromeNs = chromeFile.getModuleOrThrow("chrome");

  // Load firefox-types
  project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
  const firefoxFiles = project.getSourceFiles().filter(f => f.getFilePath().includes("firefox-webext-browser"));
  if (firefoxFiles.length === 0) {
    throw new Error("Could not find firefox-webext-browser types. Did you run npm install?");
  }
  const firefoxFile = firefoxFiles[0];

  // Load safari-types. WebKit declares its extension dictionaries at file
  // scope, so this package emits 73 of them at the root of `browser`. The map
  // saying where each one belongs is derived from the IDL and checked in; see
  // scripts/derive-relocations.ts.
  project.addSourceFilesAtPaths("node_modules/safari-webextension-types/index.d.ts");
  const safariFiles = project.getSourceFiles().filter(f => f.getFilePath().includes("safari-webextension-types"));
  if (safariFiles.length === 0) {
    throw new Error("Could not find safari-webextension-types. Did you run npm install?");
  }
  const relocationDoc = JSON.parse(fs.readFileSync("safari-relocation-derived.json", "utf8")) as {
    derived: Array<{ name: string; namespace: string }>;
  };
  const relocations = new Map(relocationDoc.derived.map((d) => [d.name, d.namespace]));

  // Namespaces an input declares that the browser does not expose to a normal
  // extension. Each is cited to the browser's own source in
  // excluded-namespaces.json and resolved by verify:evidence --resolve.
  // Scoped per browser: another browser may implement the same namespace fully.
  const excluded = (JSON.parse(fs.readFileSync("excluded-namespaces.json", "utf8")).excluded as
    Array<{ namespace: string; browser: BrowserId }>);

  const ir = new Map<string, IRNamespace>();

  parseSource(chromeNs, "chrome", ir);
  parseSource(firefoxFile, "firefox", ir);
  parseSource(safariFiles[0], "safari", ir, undefined, "", relocations);
  applyNamespaceAliases(ir, safariFiles[0], "safari");
  applyExclusions(ir);

  return ir;
}

export function generate() {
  const ir = buildIr();

  // Normalize structural-form mismatches before merging or patching, so the
  // patch layer sees one consistent shape per API (Decision 14).
  const structuralIssues: MergeIssue[] = [];
  reconcileStructuralForms(ir, structuralIssues);

  applyPatches(ir);
  applyExclusions(ir);

  fs.mkdirSync("dist", { recursive: true });
  fs.mkdirSync("tests", { recursive: true });

  // 1. Static package delivery (union of both browsers, single declaration set)
  const full = emitDtsDetailed(ir);
  fs.writeFileSync("dist/index.d.ts", full.dts);

  // 2. Local generation delivery (pruned to Chrome)
  fs.writeFileSync("dist/chrome-only.d.ts", emitDts(ir, "chrome"));
  fs.writeFileSync("dist/firefox-only.d.ts", emitDts(ir, "firefox"));
  fs.writeFileSync("dist/safari-only.d.ts", emitDts(ir, "safari"));

  // 3. Queryable metadata export (RFC §4). This is a first-class deliverable, not
  //    a convenience: JavaScript consumers never see the .d.ts or its JSDoc, and
  //    per RFC §1a it is the only channel where graded cross-browser feedback can
  //    live, since TypeScript has no warning severity.
  const metadata: Record<string, { supported: string[]; note?: string }> = {};
  for (const entry of full.metadata) {
    metadata[entry.path] = {
      supported: provList(entry.supported),
      ...(entry.note ? { note: entry.note } : {}),
    };
  }
  fs.writeFileSync("dist/metadata.json", JSON.stringify(metadata, null, 2));

  // 4. Elements the merger could not combine. Decision 15 routes these to the
  //    patch layer rather than letting a lossy automatic merge ship silently.
  const allIssues = [...structuralIssues, ...full.issues];
  // Always write the file, including when empty. Writing only on failure leaves
  // a stale artifact behind after the last issue is fixed, so the repo keeps
  // reporting a problem that no longer exists.
  fs.writeFileSync("dist/merge-issues.json", JSON.stringify(allIssues, null, 2));
  if (allIssues.length) {
    // Not "need patches": a merge failure is usually a canonicalizer gap, and
    // treating this counter as a number to zero out is what produced 53
    // convergence patches mislabelled as upstream defects. A red gate on
    // generated output is a question about the generator or the upstream
    // data, never a number to drive to zero by writing overrides.
    console.warn(`${allIssues.length} element(s) failed to merge; diagnose canonicalization before considering a patch (see dist/merge-issues.json)`);
  }

  // 5. Generate type-existence tests for all exported declarations
  // TODO: TypeScript contravariant parameter typing forbids unknown[] in event listener constraints (TS2344); any[] is strictly required.
  let testFile = `import "../dist/index.d.ts";\n\n// TODO: TypeScript contravariant constraint requirement (TS2344) requires any[] here.\ntype CustomChromeEvent<H extends (...args: any[]) => void> = chrome.events.Event<H>;\n\n`;
  for (const [nsName, ns] of ir.entries()) {
    for (const [elName, el] of ns.elements.entries()) {
      const resolved = BROWSER_ORDER.map((b) =>
        resolveTypeArguments(getSource(el, b), getTypeParams(el, b), elName));
      const args = resolved.map((r) => r.args).find((a) => a) ?? "";
      const safeNsName = nsName.replace(/\./g, "_");
      const todoComment = resolved.some((r) => r.hasAny) ? "// TODO: TypeScript contravariance requires any[] for event listeners.\n" : "";
      // Under Decision 20 every element is reachable from BOTH namespaces, so both
      // assertions are emitted unconditionally, which is precisely the invariant
      // the alias block must uphold.
      if (el.kind === "function" || el.kind === "variable" || el.kind === "namespace") {
        testFile += `${todoComment}declare let _${safeNsName}_${elName}_chrome: typeof chrome.${nsName}.${elName};\n`;
        testFile += `${todoComment}declare let _${safeNsName}_${elName}_browser: typeof browser.${nsName}.${elName};\n`;
      } else {
        testFile += `${todoComment}declare let _${safeNsName}_${elName}_chrome: chrome.${nsName}.${elName}${args};\n`;
        testFile += `${todoComment}declare let _${safeNsName}_${elName}_browser: browser.${nsName}.${elName}${args};\n`;
      }
    }
  }
  fs.writeFileSync("tests/index.test-d.ts", testFile);

  console.log(`Generation complete. ${full.metadata.length} metadata entries, ${allIssues.length} merge issues.`);
}

// Guard entry point so generator can be safely imported without top-level side effects
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("generator.ts")) {
  generate();
}