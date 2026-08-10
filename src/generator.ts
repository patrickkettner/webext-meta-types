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
  chromeSource?: string;
  firefoxSource?: string;
  isChromeOnly: boolean;
  isFirefoxOnly: boolean;
  chromeTypeParamsCount: number;
  firefoxTypeParamsCount: number;
  bugUrl?: string;
}

export interface PatchFile {
  namespace: string;
  element: string;
  bug_url?: string;
  mode?: "replace" | "merge";
  overrideChrome?: string;
  overrideFirefox?: string;
  overrideShared?: string;
  create?: boolean;
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

/** Split multi-overload function source strings into individual overload statements without regex backtracking (ReDoS safe), respecting comments and string literals. */
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
  if (obj.mode !== undefined && obj.mode !== "replace" && obj.mode !== "merge") {
    throw new Error(`Patch in ${filePath} "mode" must be "replace" or "merge"`);
  }
  if (obj.overrideChrome === undefined && obj.overrideFirefox === undefined && obj.overrideShared === undefined) {
    throw new Error(`Patch in ${filePath} must have at least one of "overrideChrome", "overrideFirefox", or "overrideShared"`);
  }
  if (obj.overrideChrome !== undefined && typeof obj.overrideChrome !== "string") {
    throw new Error(`Patch in ${filePath} "overrideChrome" must be a string`);
  }
  if (obj.overrideFirefox !== undefined && typeof obj.overrideFirefox !== "string") {
    throw new Error(`Patch in ${filePath} "overrideFirefox" must be a string`);
  }
  if (obj.overrideShared !== undefined && typeof obj.overrideShared !== "string") {
    throw new Error(`Patch in ${filePath} "overrideShared" must be a string`);
  }
  if (obj.create !== undefined && typeof obj.create !== "boolean") {
    throw new Error(`Patch in ${filePath} "create" must be a boolean`);
  }
  const overrideShared = typeof obj.overrideShared === "string" ? obj.overrideShared : undefined;
  return {
    namespace: obj.namespace,
    element: obj.element,
    bug_url: typeof obj.bug_url === "string" ? obj.bug_url : undefined,
    mode: obj.mode === "replace" ? "replace" : "merge",
    overrideChrome: (obj.overrideChrome as string | undefined) ?? overrideShared,
    overrideFirefox: (obj.overrideFirefox as string | undefined) ?? overrideShared,
    overrideShared,
    create: obj.create === true
  };
}

export function parseSource(
  fileOrNamespace: HasModulesAndStatements,
  browser: "chrome" | "firefox",
  ir: Map<string, IRNamespace>,
  namespaceNames?: string[],
  prefix = ""
) {
  // 1. Process nested modules/namespaces
  for (const mod of fileOrNamespace.getModules()) {
    const rawName = mod.getName().replace(/['"]/g, '');
    let cleanName = rawName;
    if (browser === "firefox") {
      if (cleanName.startsWith("browser.")) {
        cleanName = cleanName.substring("browser.".length);
      } else if (cleanName === "browser") {
        parseSource(mod, browser, ir, namespaceNames, "");
        continue;
      }
    }
    const currentFullName = prefix ? `${prefix}.${cleanName}` : cleanName;

    // Check if this namespace or any subnamespace is in our target coverage (or traverse all if filter omitted)
    const isTarget = !namespaceNames || namespaceNames.length === 0 || namespaceNames.some(ns => ns === currentFullName || ns.startsWith(`${currentFullName}.`));
    if (isTarget) {
      parseSource(mod, browser, ir, namespaceNames, currentFullName);
    }
  }

  // 2. Extract top-level elements for the current namespace
  if (prefix) {
    if (!ir.has(prefix)) {
      ir.set(prefix, { name: prefix, elements: new Map() });
    }
    const irNs = ir.get(prefix)!;

    for (const statement of fileOrNamespace.getStatements()) {
      let source = statement.getText();

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

        if (!irNs.elements.has(name)) {
          irNs.elements.set(name, {
            name,
            kind,
            isChromeOnly: true,
            isFirefoxOnly: true,
            chromeTypeParamsCount: 0,
            firefoxTypeParamsCount: 0
          });
        }
        const el = irNs.elements.get(name)!;
        if (browser === "chrome") {
          el.chromeSource = el.chromeSource ? el.chromeSource + "\n" + source : source;
          el.isFirefoxOnly = false;
          if (el.chromeTypeParamsCount === 0) el.chromeTypeParamsCount = typeParamsCount;
        } else {
          el.firefoxSource = el.firefoxSource ? el.firefoxSource + "\n" + source : source;
          el.isChromeOnly = false;
          if (el.firefoxTypeParamsCount === 0) el.firefoxTypeParamsCount = typeParamsCount;
        }
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

export function applyPatches(ir: Map<string, IRNamespace>, patchesDir = "patches") {
  if (fs.existsSync(patchesDir)) {
    const files = fs.readdirSync(patchesDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const patchPath = path.join(patchesDir, file);
        const raw = JSON.parse(fs.readFileSync(patchPath, "utf8"));
        const items = Array.isArray(raw) ? raw : [raw];
        for (const item of items) {
          const patch = validatePatch(item, patchPath);
          let irNs = ir.get(patch.namespace);
          if (!irNs) {
            if (!patch.create) {
              throw new Error(`Patch in ${patchPath} references unknown namespace "${patch.namespace}" (use "create": true to declare a new namespace)`);
            }
            irNs = { name: patch.namespace, elements: new Map() };
            ir.set(patch.namespace, irNs);
          }
          let el = irNs.elements.get(patch.element);
          if (!el) {
            if (!patch.create) {
              throw new Error(`Patch in ${patchPath} references unknown element "${patch.element}" in namespace "${patch.namespace}" (use "create": true to declare a new element)`);
            }
            const rawSource = (patch.overrideChrome || patch.overrideFirefox || "").trim();
            const source = normalizeSource(rawSource);
            let kind: IRElement["kind"] = "type";
            if (/(?:^|\s)function\b/.test(source)) kind = "function";
            else if (/(?:^|\s)interface\b/.test(source)) kind = "interface";
            else if (/(?:^|\s)(?:var|const|let)\b/.test(source)) kind = "variable";
            else if (/(?:^|\s)namespace\b/.test(source)) kind = "namespace";
            const cCount = countTypeParams(patch.overrideChrome, patch.element);
            const fCount = countTypeParams(patch.overrideFirefox, patch.element);
            el = {
              name: patch.element,
              kind,
              chromeSource: patch.overrideChrome,
              firefoxSource: patch.overrideFirefox,
              isChromeOnly: !!patch.overrideChrome && !patch.overrideFirefox,
              isFirefoxOnly: !patch.overrideChrome && !!patch.overrideFirefox,
              chromeTypeParamsCount: cCount,
              firefoxTypeParamsCount: fCount,
              bugUrl: patch.bug_url
            };
            irNs.elements.set(patch.element, el);
          } else {
            el.bugUrl = patch.bug_url || el.bugUrl;
            if (patch.mode === "replace") {
              if (patch.overrideChrome !== undefined) {
                el.chromeSource = patch.overrideChrome;
                el.chromeTypeParamsCount = countTypeParams(patch.overrideChrome, patch.element);
              }
              if (patch.overrideFirefox !== undefined) {
                el.firefoxSource = patch.overrideFirefox;
                el.firefoxTypeParamsCount = countTypeParams(patch.overrideFirefox, patch.element);
              }
            } else {
              // Default: merge via declaration merging (append)
              if (el.kind === "type") {
                throw new Error(`Patch ${patchPath} specifies merge mode for type alias ${patch.namespace}.${patch.element}. Type aliases do not support declaration merging; use mode: "replace" instead.`);
              }
              if (patch.overrideChrome) {
                el.chromeSource = (el.chromeSource ? el.chromeSource + "\n" : "") + patch.overrideChrome;
              }
              if (patch.overrideFirefox) {
                el.firefoxSource = (el.firefoxSource ? el.firefoxSource + "\n" : "") + patch.overrideFirefox;
              }
            }
            el.isChromeOnly = !!el.chromeSource && !el.firefoxSource;
            el.isFirefoxOnly = !!el.firefoxSource && !el.chromeSource;
          }
        }
      }
    }
  }
}

/* ==========================================================================
 * Decision 20 — unified declaration set
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

export type Provenance = "Chrome" | "Firefox" | "Chrome, Firefox";

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
  platforms?: string[];
  channel?: string;
  privileged?: string;
  patched?: boolean;
  bug_url?: string;
}

export interface AvailabilityInfo {
  platforms?: string[];
  channel?: string;
  privileged?: string;
}

/** Resolves vendor availability metadata (platforms, channel, privileged) per Decision 23/24. */
export function getAvailability(rawPath: string, prov: Provenance): AvailabilityInfo {
  const path = rawPath.replace(/\.overload\[\d+\]$/, "");
  const info: AvailabilityInfo = {};

  // 1. Privileged (Decision 23)
  // Gecko privileged namespaces:
  const geckoPrivilegedNs = [
    "activityLog",
    "experiments",
    "geckoProfiler",
    "networkStatus",
    "normandyAddonStudy",
    "pkcs11",
    "telemetry"
  ];
  for (const ns of geckoPrivilegedNs) {
    if (path === ns || path.startsWith(ns + ".")) {
      info.privileged = `Requires privileged permission: ${ns}`;
      break;
    }
  }

  // Chromium privileged:
  if (path === "mimeHandlerPrivate" || path.startsWith("mimeHandlerPrivate.")) {
    info.privileged = "Allowlisted component extension API (manifest:mime_types_handler)";
  } else if (path === "browserAction.openPopup" || path.startsWith("browserAction.openPopup.")) {
    info.privileged = "Allowlist-gated on stable channel; open on dev channel";
  }

  // 2. Channel
  if (path === "identity.getAccounts" || path.startsWith("identity.getAccounts.")) {
    info.channel = "dev";
  } else if (path === "system.storage.getAvailableCapacity" || path.startsWith("system.storage.getAvailableCapacity.")) {
    info.channel = "dev";
  } else if (path === "mimeHandler" || path.startsWith("mimeHandler.")) {
    info.channel = "dev";
  } else if (path === "browserAction.openPopup" || path.startsWith("browserAction.openPopup.")) {
    info.channel = "dev";
  }

  // 3. Platforms (Chromium only - Gecko members get nothing per Decision 24)
  if (prov !== "Firefox") {
    // Parent namespace inherited
    if (path === "input.ime" || path.startsWith("input.ime.")) {
      info.platforms = ["chromeos"];
    } else if (path === "mimeHandler" || path.startsWith("mimeHandler.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    } else if (path === "mimeHandlerPrivate" || path.startsWith("mimeHandlerPrivate.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    } else if (path === "sockets.tcp" || path.startsWith("sockets.tcp.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    } else if (path === "sockets.tcpServer" || path.startsWith("sockets.tcpServer.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    } else if (path === "sockets.udp" || path.startsWith("sockets.udp.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    }
    // Member-level
    else if (path === "idle.getAutoLockDelay" || path.startsWith("idle.getAutoLockDelay.")) {
      info.platforms = ["chromeos"];
    } else if (path === "power.reportActivity" || path.startsWith("power.reportActivity.")) {
      info.platforms = ["chromeos"];
    } else if (path === "management.installReplacementWebApp" || path.startsWith("management.installReplacementWebApp.")) {
      info.platforms = ["chromeos", "linux", "mac", "win"];
    }
  }

  return info;
}

const scratchProject = new Project({ useInMemoryFileSystem: true });
let scratchSeq = 0;
function parseFragment(text: string): SourceFile {
  return scratchProject.createSourceFile(`__merge${scratchSeq++}.d.ts`, text, { overwrite: true });
}

/** True when a declaration with this provenance survives a target-pruned build. */
function keptForTarget(p: Provenance, target?: "chrome" | "firefox"): boolean {
  if (!target) return true;
  if (p === "Chrome, Firefox") return true;
  return target === "chrome" ? p === "Chrome" : p === "Firefox";
}

function formatSupportComment(
  supported: Provenance,
  note?: string,
  privileged?: string,
  platforms?: string[]
): string {
  const privilegedLine = privileged ? `\n * @privileged ${privileged}` : "";
  const platformLine = (platforms && platforms.length > 0 && supported !== "Firefox")
    ? `\n * @platform ${platforms.join(", ")}`
    : "";
  const noteLine = note ? `\n * @note ${note}` : "";
  return `/**${privilegedLine}\n * @supported ${supported}${platformLine}${noteLine}\n */\n`;
}

/** Format a merged member JSDoc block, combining upstream documentation with @supported, @platform, @privileged, and @note tags. */
export function formatMemberDoc(
  jsDocText: string | undefined,
  prov: Provenance,
  note?: string,
  privileged?: string,
  platforms?: string[]
): string {
  const privilegedLines = privileged ? `     * @privileged ${privileged}\n` : "";
  const platformLines = (platforms && platforms.length > 0 && prov !== "Firefox")
    ? `\n     * @platform ${platforms.join(", ")}`
    : "";
  const noteLines = note ? `\n     * @note ${note}` : "";
  const supportedLine = `${privilegedLines}     * @supported ${prov}${platformLines}${noteLines}`;
  if (!jsDocText) {
    return (note || (platforms && platforms.length > 0 && prov !== "Firefox") || privileged)
      ? `    /**\n${supportedLine}\n     */`
      : `    /** @supported ${prov} */`;
  }
  const inner = jsDocText
    .replace(/^\/\*\*[\r\n]*/, "")
    .replace(/[\r\n]*\s*\*\/$/, "");

  const bodyLines = inner.split("\n").map(l => {
    const trimmed = l.trim();
    if (trimmed.startsWith("*")) {
      const rest = trimmed.slice(1);
      return rest ? `     *${rest}` : "     *";
    }
    if (trimmed.length > 0) {
      return `     * ${trimmed}`;
    }
    return "     *";
  });

  return `    /**\n${bodyLines.join("\n")}\n     *\n${supportedLine}\n     */`;
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
export function setMethodOptional(text: string, optional: boolean): string {
  const m = /^(\s*)([A-Za-z0-9_$]+)(\??)(\s*[<(])/.exec(text);
  if (!m) return text;
  const marker = optional ? "?" : "";
  return text.slice(0, m[1].length + m[2].length) + marker + text.slice(m.index + m[0].length - m[4].length);
}

/** True when this member signature is marked optional. */
export function isOptionalMember(text: string): boolean {
  return /^\s*(?:[A-Za-z0-9_$]+|"[^"]+"|\'[^\']+\'|\[[^\]]+\])\?\s*[<(:]/.test(text);
}

/** Drop the `?` that marks an optional member, so two members can be compared modulo optionality. */
export function stripOptionalMarker(canonical: string): string {
  return canonical.replace(/^(\s*(?:[A-Za-z0-9_$]+|"[^"]+"|\'[^\']+\'|\[[^\]]+\]))\?(\s*[<(:])/, "$1$2");
}

/** `[k: string]: A` + `[k: string]: B` -> `[k: string]: A | B` (TS2374 forbids duplicates). */
function unionIndexSignature(a: string, b: string): string {
  const cut = (s: string) => {
    const i = s.indexOf("]:");
    return i === -1 ? undefined : { head: s.slice(0, i + 2), type: s.slice(i + 2).trim() };
  };
  const pa = cut(a), pb = cut(b);
  if (!pa || !pb) return a;
  return pa.type === pb.type ? a : `${pa.head} ${wrapUnion(pa.type)} | ${wrapUnion(pb.type)}`;
}
function isFullyEnclosedInParens(s: string): boolean {
  if (!s.startsWith("(") || !s.endsWith(")")) return false;
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") {
      depth--;
      if (depth === 0 && i < s.length - 1) return false;
    }
  }
  return depth === 0;
}

export function wrapUnion(t: string): string {
  const trimmed = t.trim();
  if (!trimmed) return trimmed;
  if (isFullyEnclosedInParens(trimmed)) {
    return trimmed;
  }
  if (/(?:=>|[|&])/.test(trimmed)) {
    return `(${trimmed})`;
  }
  return trimmed;
}

/** `foo: A` + `foo: B` -> `foo: A | B`, optional if either side is optional. */
export function unionMember(a: string, b: string): string {
  const hasSemi = a.trim().endsWith(";") || b.trim().endsWith(";");
  const split = (s: string) => {
    const i = s.indexOf(":");
    return i === -1 ? undefined : {
      head: s.slice(0, i),
      type: s.slice(i + 1).trim().replace(/^\|\s*/, "").replace(/;$/, "").trim()
    };
  };
  const pa = split(a);
  const pb = split(b);
  if (!pa || !pb) return a; // defensive: callers gate on PropertySignature
  const optional = pa.head.includes("?") || pb.head.includes("?");
  const head = pa.head.replace("?", "") + (optional ? "?" : "");
  const semi = hasSemi ? ";" : "";
  return pa.type === pb.type
    ? `${head}: ${pa.type}${semi}`
    : `${head}: ${wrapUnion(pa.type)} | ${wrapUnion(pb.type)}${semi}`;
}

/**
 * A property only one browser declares may be absent at runtime, so it is
 * emitted optional. Callers must gate this on the AST kind — it assumes the
 * first colon separates the member name from its type, which is only true for
 * a PropertySignature.
 */
export function makeOptional(text: string): string {
  const i = text.indexOf(":");
  if (i === -1) return text;
  const head = text.slice(0, i);
  if (/\?\s*$/.test(head)) return text;
  return `${head}?${text.slice(i)}`;
}

interface MemberDecl {
  text: string;
  /** True only for PropertySignature. Methods, call/construct/index signatures are not properties. */
  isProperty: boolean;
  /** Index signatures cannot be duplicated for the same key type (TS2374); their value types are unioned. */
  isIndex: boolean;
  /** Upstream JSDoc comment if present. */
  jsDoc?: string;
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
    let jsDoc: string | undefined;
    if (Node.isJSDocable(m)) {
      const docs = m.getJsDocs();
      if (docs.length > 0) {
        jsDoc = docs.map(d => d.getText()).join("\n");
      }
    }
    let text = m.getText().replace(/;$/, "");
    let isProperty = m.getKind() === SyntaxKind.PropertySignature;
    const isIndex = m.getKind() === SyntaxKind.IndexSignature;

    // Normalize property signatures with function types to method signatures so
    // that methods and function-typed properties (e.g. runtime.Port.disconnect)
    // merge cleanly instead of colliding with duplicate identifier errors.
    if (Node.isPropertySignature(m)) {
      const typeNode = m.getTypeNode();
      if (typeNode && Node.isFunctionTypeNode(typeNode)) {
        const tp = typeNode.getTypeParameters();
        const typeParamsStr = tp.length ? `<${tp.map(p => p.getText()).join(", ")}>` : "";
        const params = typeNode.getParameters().map(param => param.getText()).join(", ");
        const ret = typeNode.getReturnTypeNode()?.getText() || "void";
        const opt = m.hasQuestionToken() ? "?" : "";
        text = `${m.getName()}${opt}${typeParamsStr}(${params}): ${ret}`;
        isProperty = false;
      }
    }

    const entry: MemberDecl = {
      text,
      isProperty,
      isIndex,
      jsDoc,
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
  target?: "chrome" | "firefox"
): string | undefined {
  const c = parseInterface(el.chromeSource);
  const f = parseInterface(el.firefoxSource);
  if (!c && !f) {
    // Declared as an interface in the IR but not parseable as one: emit the raw
    // source rather than dropping the element.
    const src = el.chromeSource ?? el.firefoxSource;
    if (!src) return undefined;
    const prov: Provenance = el.chromeSource && el.firefoxSource ? "Chrome, Firefox"
      : el.chromeSource ? "Chrome" : "Firefox";
    const ifacePath = `${ns}.${el.name}`;
    const ifaceAvail = getAvailability(ifacePath, prov);
    issues.push({ namespace: ns, element: el.name, kind: "interface", reason: "not parseable as an interface; raw source emitted" });
    meta.push({ path: ifacePath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...ifaceAvail });
    return formatSupportComment(prov, undefined, ifaceAvail.privileged, ifaceAvail.platforms) + ensureExport(src) + "\n";
  }

  if (!c || !f) {
    const only = (c ?? f)!;
    const prov: Provenance = c ? "Chrome" : "Firefox";
    if (!keptForTarget(prov, target)) return undefined;
    const ifacePath = `${ns}.${el.name}`;
    const ifaceAvail = getAvailability(ifacePath, prov);
    meta.push({ path: ifacePath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...ifaceAvail });
    const heritage = only.extendsList.length ? ` extends ${only.extendsList.join(", ")}` : "";
    const memberLines = [...only.members.values()].flatMap(mList =>
      mList.map(m => {
        const doc = formatMemberDoc(m.jsDoc, prov, undefined, ifaceAvail.privileged, ifaceAvail.platforms);
        return `${doc}\n    ${m.text};`;
      })
    );
    const body = memberLines.length ? ` {\n${memberLines.join("\n")}\n}` : ` {}`;
    return formatSupportComment(prov, undefined, ifaceAvail.privileged, ifaceAvail.platforms) + `export interface ${el.name}${only.typeParams}${heritage}${body}\n`;
  }

  if (!target && c.typeParams !== f.typeParams) {
    issues.push({
      namespace: ns, element: el.name, kind: "interface",
      reason: `type parameters differ (${c.typeParams || "none"} vs ${f.typeParams || "none"})`,
    });
  }

  const names = new Set([...c.members.keys(), ...f.members.keys()]);
  const lines: string[] = [];

  for (const name of names) {
    const cm = c.members.get(name);
    const fm = f.members.get(name);
    let prov: Provenance;
    let text: string;
    let note: string | undefined;

    if (cm && fm) {
      prov = "Chrome, Firefox";
      if (target === "chrome") {
        text = cm.map(d => d.text).join(";\n    ");
      } else if (target === "firefox") {
        text = fm.map(d => d.text).join(";\n    ");
      } else {
        const identical = cm.length === fm.length &&
          cm.every((d, i) => canonicalizeSignature(d.text) === canonicalizeSignature(fm[i].text));
        const sameModuloOptional = !identical && cm.length === 1 && fm.length === 1 &&
          stripOptionalMarker(canonicalizeSignature(cm[0].text)) ===
          stripOptionalMarker(canonicalizeSignature(fm[0].text));
        if (identical) {
          text = cm.map(d => d.text).join(";\n    ");
        } else if (sameModuloOptional) {
          // Same signature, optional in one browser only (e.g. Chrome declares
          // `createStatusBarButton(...)`, Firefox `createStatusBarButton?(...)`).
          // Emitting both would collide; widen to the optional form.
          const chromeOptional = isOptionalMember(cm[0].text);
          text = chromeOptional ? cm[0].text : fm[0].text;
          note = `optional in ${chromeOptional ? "Chrome" : "Firefox"}, required in ${chromeOptional ? "Firefox" : "Chrome"}`;
        } else if (cm.length === 1 && fm.length === 1 && cm[0].isIndex && fm[0].isIndex) {
          text = unionIndexSignature(cm[0].text, fm[0].text);
          note = "value type differs between browsers";
        } else if (cm.length === 1 && fm.length === 1 && cm[0].isProperty && fm[0].isProperty) {
          // Only property signatures can be unioned by type.
          text = unionMember(cm[0].text, fm[0].text);
          const chromeOpt = isOptionalMember(cm[0].text);
          const ffOpt = isOptionalMember(fm[0].text);
          note = chromeOpt !== ffOpt
            ? `optional in ${chromeOpt ? "Chrome" : "Firefox"}, required in ${chromeOpt ? "Firefox" : "Chrome"}`
            : "shape differs between browsers";
        } else {
          // Methods and call/index signatures: keep both forms. Interface methods
          // may be overloaded, so both browsers' signatures coexist legally and
          // the developer can reach either calling form.
          // Dedupe modulo optionality: the same signature required in one browser
          // and optional in the other is ONE signature, and the set's optionality
          // is decided below. Comparing with the `?` still attached would emit it
          // twice.
          const sameSig = (a: string, b: string) =>
            stripOptionalMarker(canonicalizeSignature(a)) === stripOptionalMarker(canonicalizeSignature(b));
          const combined = [
            ...cm.map(d => d.text),
            ...fm.filter(d => !cm.some(u => sameSig(u.text, d.text))).map(d => d.text),
          ];
          // TS2386: every signature in an overload set must agree on optionality.
          // If either browser declares the member optional it may be absent at
          // runtime, so the whole set is widened to optional.
          // Read optionality from the ORIGINAL sets: dedupe may have dropped the
          // optional variant as a duplicate of the required one, which would lose
          // the fact that a browser can omit this member entirely.
          const anyOptional = [...cm, ...fm].some(d => isOptionalMember(d.text));
          text = combined
            .map(t => (cm[0].isProperty ? t : setMethodOptional(t, anyOptional)))
            .join(";\n    ");
          note = anyOptional
            ? "signature differs between browsers; both forms emitted, optional in at least one"
            : "signature differs between browsers; both forms emitted";
        }
      }
    } else {
      prov = cm ? "Chrome" : "Firefox";
      const only = (cm ?? fm)!;
      const anyOptional = only.some(d => isOptionalMember(d.text));
      if (!target) {
        text = only
          .map(d => (d.isProperty ? makeOptional(d.text) : setMethodOptional(d.text, true)))
          .join(";\n    ");
        if (!anyOptional) {
          note = `optional in the merged set, required in ${prov}`;
        }
      } else {
        text = only
          .map(d => (d.isProperty ? d.text : setMethodOptional(d.text, anyOptional)))
          .join(";\n    ");
      }
    }

    if (!keptForTarget(prov, target)) continue;
    const memberPath = `${ns}.${el.name}.${name}`;
    const avail = getAvailability(memberPath, prov);
    meta.push({ path: memberPath, supported: prov, ...(note ? { note } : {}), ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
    // The note goes on its own @note line, never appended to @supported.
    // Anything parsing the tag value (the metadata consumers, editors, lint
    // rules) reads to end-of-line, so an inline note corrupts the browser list.
    const chosenDoc = (cm && cm[0]?.jsDoc) || (fm && fm[0]?.jsDoc);
    const doc = formatMemberDoc(chosenDoc, prov, note, avail.privileged, avail.platforms);
    lines.push(`${doc}\n    ${text};`);
  }

  const ext = target === "chrome" ? c.extendsList
    : target === "firefox" ? f.extendsList
    : dedupe([...c.extendsList, ...f.extendsList]);
  const heritage = ext.length ? ` extends ${ext.join(", ")}` : "";
  const typeParams = target === "chrome" ? c.typeParams
    : target === "firefox" ? f.typeParams
    : (c.typeParams || f.typeParams);
  const ifacePath = `${ns}.${el.name}`;
  const ifaceAvail = getAvailability(ifacePath, "Chrome, Firefox");
  meta.push({ path: ifacePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...ifaceAvail });
  return (
    formatSupportComment("Chrome, Firefox", undefined, ifaceAvail.privileged, ifaceAvail.platforms) +
    `export interface ${el.name}${typeParams}${heritage} {\n${lines.join("\n")}\n}\n`
  );
}

/** Type aliases cannot be declared twice (TS2300), so divergent ones become a union — RFC §2 "Incompatible". */
function mergeTypeAlias(
  ns: string,
  el: IRElement,
  issues: MergeIssue[],
  meta: MetaEntry[],
  target?: "chrome" | "firefox"
): string | undefined {
  const get = (src?: string) => (src ? parseFragment(src).getTypeAliases()[0] : undefined);
  const c = get(el.chromeSource);
  const f = get(el.firefoxSource);

  const typePath = `${ns}.${el.name}`;

  // Classes and anything else that isn't a parseable type alias: cannot be merged mechanically.
  if (el.chromeSource && el.firefoxSource && (!c || !f)) {
    const avail = getAvailability(typePath, "Chrome, Firefox");
    if (target === "chrome") {
      meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
      return formatSupportComment("Chrome, Firefox", undefined, avail.privileged, avail.platforms) + ensureExport(el.chromeSource) + "\n";
    }
    if (target === "firefox") {
      meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
      return formatSupportComment("Chrome, Firefox", undefined, avail.privileged, avail.platforms) + ensureExport(el.firefoxSource) + "\n";
    }
    const same = canonicalizeSignature(el.chromeSource) === canonicalizeSignature(el.firefoxSource);
    if (same) {
      meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
      return formatSupportComment("Chrome, Firefox", undefined, avail.privileged, avail.platforms) + ensureExport(el.chromeSource) + "\n";
    }
    issues.push({
      namespace: ns, element: el.name, kind: "type",
      reason: "declarations differ and are not mechanically mergeable (class or unparsed form); Chrome kept",
    });
    const cAvail = getAvailability(typePath, "Chrome");
    meta.push({ path: typePath, supported: "Chrome", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...cAvail });
    return formatSupportComment("Chrome", undefined, cAvail.privileged, cAvail.platforms) + ensureExport(el.chromeSource) + "\n";
  }

  // Single-sided element. Emit it whatever its form -- classes, enums and any
  // declaration ts-morph does not surface as a TypeAliasDeclaration still have
  // valid source text, and dropping them loses API surface silently.
  if (!el.chromeSource || !el.firefoxSource) {
    const src = el.chromeSource ?? el.firefoxSource;
    if (!src) return undefined;
    const prov: Provenance = el.chromeSource ? "Chrome" : "Firefox";
    if (!keptForTarget(prov, target)) return undefined;
    const parsed = (c ?? f);
    const avail = getAvailability(typePath, prov);
    meta.push({ path: typePath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
    return formatSupportComment(prov, undefined, avail.privileged, avail.platforms) + ensureExport(parsed ? parsed.getText() : src) + "\n";
  }

  if (!c || !f) {
    const only = (c ?? f)!;
    const prov: Provenance = c ? "Chrome" : "Firefox";
    if (!keptForTarget(prov, target)) return undefined;
    const avail = getAvailability(typePath, prov);
    meta.push({ path: typePath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
    return formatSupportComment(prov, undefined, avail.privileged, avail.platforms) + ensureExport(only.getText()) + "\n";
  }

  const sharedAvail = getAvailability(typePath, "Chrome, Firefox");
  if (target === "chrome") {
    meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + ensureExport(c.getText()) + "\n";
  }
  if (target === "firefox") {
    meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + ensureExport(f.getText()) + "\n";
  }

  const tpC = c.getTypeParameters().map(p => p.getText()).join(", ");
  const tpF = f.getTypeParameters().map(p => p.getText()).join(", ");
  if (tpC !== tpF) {
    issues.push({
      namespace: ns, element: el.name, kind: "type",
      reason: `type parameters differ (<${tpC}> vs <${tpF}>); Chrome kept`,
    });
    const cAvail = getAvailability(typePath, "Chrome");
    meta.push({ path: typePath, supported: "Chrome", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...cAvail });
    return formatSupportComment("Chrome", undefined, cAvail.privileged, cAvail.platforms) + ensureExport(c.getText()) + "\n";
  }

  const rhsC = c.getTypeNode()?.getText() ?? "";
  const rhsF = f.getTypeNode()?.getText() ?? "";
  const tp = tpC ? `<${tpC}>` : "";

  if (canonicalizeSignature(rhsC) === canonicalizeSignature(rhsF)) {
    meta.push({ path: typePath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + `export type ${el.name}${tp} = ${rhsC};\n`;
  }

  meta.push({ path: typePath, supported: "Chrome, Firefox", note: "union of divergent definitions", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
  return (
    formatSupportComment("Chrome, Firefox", "definitions differ between browsers; emitted as a union", sharedAvail.privileged, sharedAvail.platforms) +
    `export type ${el.name}${tp} = ${wrapUnion(rhsC)} | ${wrapUnion(rhsF)};\n`
  );
}

/** Consts cannot be declared twice (TS2451), so divergent ones get a unioned type. */
function mergeVariable(
  ns: string,
  el: IRElement,
  meta: MetaEntry[],
  target?: "chrome" | "firefox"
): string | undefined {
  const typeOf = (src?: string): string | undefined => {
    if (!src) return undefined;
    const st = parseFragment(src).getVariableStatements()[0] as VariableStatement | undefined;
    return st?.getDeclarations()[0]?.getTypeNode()?.getText();
  };
  const tc = typeOf(el.chromeSource);
  const tf = typeOf(el.firefoxSource);

  const varPath = `${ns}.${el.name}`;

  if (tc === undefined && tf === undefined) {
    const src = el.chromeSource ?? el.firefoxSource;
    if (!src) return undefined;
    const prov: Provenance = el.chromeSource ? "Chrome" : "Firefox";
    if (!keptForTarget(prov, target)) return undefined;
    const avail = getAvailability(varPath, prov);
    meta.push({ path: varPath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
    return formatSupportComment(prov, undefined, avail.privileged, avail.platforms) + ensureExport(src) + "\n";
  }
  if (tc === undefined || tf === undefined) {
    const prov: Provenance = tc !== undefined ? "Chrome" : "Firefox";
    if (!keptForTarget(prov, target)) return undefined;
    const avail = getAvailability(varPath, prov);
    meta.push({ path: varPath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
    return formatSupportComment(prov, undefined, avail.privileged, avail.platforms) + `export const ${el.name}: ${tc ?? tf};\n`;
  }
  const sharedAvail = getAvailability(varPath, "Chrome, Firefox");
  if (target === "chrome") {
    meta.push({ path: varPath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + `export const ${el.name}: ${tc};\n`;
  }
  if (target === "firefox") {
    meta.push({ path: varPath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + `export const ${el.name}: ${tf};\n`;
  }
  if (canonicalizeSignature(tc) === canonicalizeSignature(tf)) {
    meta.push({ path: varPath, supported: "Chrome, Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
    return formatSupportComment("Chrome, Firefox", undefined, sharedAvail.privileged, sharedAvail.platforms) + `export const ${el.name}: ${tc};\n`;
  }
  meta.push({ path: varPath, supported: "Chrome, Firefox", note: "type differs between browsers", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...sharedAvail });
  return (
    formatSupportComment("Chrome, Firefox", "type differs between browsers; emitted as a union", sharedAvail.privileged, sharedAvail.platforms) +
    `export const ${el.name}: ${wrapUnion(tc)} | ${wrapUnion(tf)};\n`
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
  target?: "chrome" | "firefox"
): string | undefined {
  const cOverloads = splitFunctionOverloads(el.chromeSource || "");
  const fOverloads = splitFunctionOverloads(el.firefoxSource || "");
  if (!cOverloads.length && !fOverloads.length) return undefined;

  const matchedFIndices = new Set<number>();
  let out = "";
  let position = 0;

  for (const c of cOverloads) {
    const canon = canonicalizeSignature(c, true);
    let matchIdx = -1;
    for (let i = 0; i < fOverloads.length; i++) {
      if (!matchedFIndices.has(i) && canonicalizeSignature(fOverloads[i], true) === canon) {
        matchIdx = i;
        break;
      }
    }
    const prov: Provenance = matchIdx >= 0 ? "Chrome, Firefox" : "Chrome";
    if (matchIdx >= 0) matchedFIndices.add(matchIdx);
    if (keptForTarget(prov, target)) {
      const overloadPath = `${ns}.${el.name}.overload[${position}]`;
      const avail = getAvailability(`${ns}.${el.name}`, prov);
      meta.push({ path: overloadPath, supported: prov, ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
      out += formatSupportComment(prov, undefined, avail.privileged, avail.platforms) + ensureExport(c) + "\n";
    }
    position++;
  }

  // Firefox-only overloads keep their original relative order (overload precedence is significant).
  for (let i = 0; i < fOverloads.length; i++) {
    if (matchedFIndices.has(i)) continue;
    if (keptForTarget("Firefox", target)) {
      const overloadPath = `${ns}.${el.name}.overload[${position}]`;
      const avail = getAvailability(`${ns}.${el.name}`, "Firefox");
      meta.push({ path: overloadPath, supported: "Firefox", ...(el.bugUrl ? { patched: true, bug_url: el.bugUrl } : {}), ...avail });
      out += formatSupportComment("Firefox", undefined, avail.privileged, avail.platforms) + ensureExport(fOverloads[i]) + "\n";
    }
    position++;
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
export function reconcileStructuralForms(ir: Map<string, IRNamespace>, issues: MergeIssue[] = []): void {
  for (const [nsName, ns] of [...ir.entries()]) {
    for (const [elName, el] of [...ns.elements.entries()]) {
      if (el.kind !== "variable") continue;
      const dotted = `${nsName}.${elName}`;
      const targetNs = ir.get(dotted);
      if (!targetNs) continue; // the other upstream does not model this as a namespace

      for (const side of ["chrome", "firefox"] as const) {
        const src = side === "chrome" ? el.chromeSource : el.firefoxSource;
        if (!src) continue;

        const decl = parseFragment(src).getVariableStatements()[0]?.getDeclarations()[0];
        const typeNode = decl?.getTypeNode();
        if (!typeNode || typeNode.getKind() !== SyntaxKind.TypeLiteral) {
          issues.push({
            namespace: nsName, element: elName, kind: "variable",
            reason: `models ${dotted} as a variable with non-literal type (${typeNode ? typeNode.getText() : "unknown"}) while the other upstream declares it as a namespace; needs a patch`,
          });
          continue;
        }

        const literal = typeNode.asKindOrThrow(SyntaxKind.TypeLiteral);
        const props = literal.getMembers();
        const expandable = props.every(m => m.getKind() === SyntaxKind.PropertySignature);
        if (!props.length || !expandable) {
          issues.push({
            namespace: nsName, element: elName, kind: "variable",
            reason: `models ${dotted} as an object literal the other upstream declares as a namespace, but it has non-property members; needs a patch`,
          });
          continue;
        }

        for (const m of props) {
          const prop = m.asKindOrThrow(SyntaxKind.PropertySignature);
          const name = prop.getName();
          const memberType = prop.getTypeNode()?.getText();
          if (!memberType) continue;
          const memberSrc = `export const ${name}: ${memberType};`;
          let member = targetNs.elements.get(name);
          if (!member) {
            member = {
              name, kind: "variable",
              isChromeOnly: true, isFirefoxOnly: true,
              chromeTypeParamsCount: 0, firefoxTypeParamsCount: 0,
            };
            targetNs.elements.set(name, member);
          }
          if (side === "chrome") {
            member.chromeSource = memberSrc;
            member.isFirefoxOnly = false;
          } else {
            member.firefoxSource = memberSrc;
            member.isChromeOnly = false;
          }
        }

        // Drop the const form: the namespace form is now authoritative.
        if (side === "chrome") el.chromeSource = undefined;
        else el.firefoxSource = undefined;
      }

      if (!el.chromeSource && !el.firefoxSource) ns.elements.delete(elName);
      else {
        el.isChromeOnly = !!el.chromeSource && !el.firefoxSource;
        el.isFirefoxOnly = !!el.firefoxSource && !el.chromeSource;
      }
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
  target?: "chrome" | "firefox"
): EmitResult {
  const metadata: MetaEntry[] = [];
  const issues: MergeIssue[] = [];
  const namespaces: string[] = [];
  const emittedNamespaces: string[] = [];

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
        const prunable = target && (
          (target === "chrome" && !el.chromeSource) ||
          (target === "firefox" && !el.firefoxSource)
        );
        if (!prunable) {
          issues.push({
            namespace: nsName,
            element: el.name,
            kind: el.kind,
            reason: `produced no output (chromeSource: ${el.chromeSource ? "yes" : "no"}, firefoxSource: ${el.firefoxSource ? "yes" : "no"})`,
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
    if (body) {
      const nsDoc = (nsName === "devtools" || nsName.startsWith("devtools."))
        ? "/**\n * These APIs are available only in a devtools_page context.\n */\n"
        : "";
      namespaces.push(`${nsDoc}export namespace ${nsName} {\n${body}\n}`);
      emittedNamespaces.push(nsName);
    }
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
  const topLevel = dedupe(emittedNamespaces.map(k => k.split(".")[0])).sort();
  output += `declare namespace browser {\n`;
  output += topLevel.map(n => `  export import ${n} = chrome.${n};`).join("\n");
  output += `\n}\n`;

  return { dts: annotateUpstreamAny(output), metadata, issues };
}

/** Backwards-compatible wrapper: returns just the emitted text. */
export function emitDts(ir: Map<string, IRNamespace>, target?: "chrome" | "firefox"): string {
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
  const argTypes: string[] = [];

  if (params.length > 0) {
    for (let i = 0; i < paramCount; i++) {
      const param = params[i] || "";
      if (/\bextends\s*\([^\)]*\)\s*=>/.test(param)) {
        argTypes.push("() => void");
      } else if (/\bextends\s*.*any\[\]/.test(param)) {
        argTypes.push("never[]");
      } else if (/\bextends\s*.*\[\]/.test(param)) {
        argTypes.push("unknown[]");
      } else {
        argTypes.push("unknown");
      }
    }
    return { args: "<" + argTypes.join(", ") + ">", hasAny: false };
  }

  // Fallback if parameter extraction fails
  if (/<[a-zA-Z0-9_]+\s+extends\s*\([^\)]*\)\s*=>/.test(source)) {
    return { args: "<" + new Array(paramCount).fill("() => void").join(", ") + ">", hasAny: false };
  }
  return { args: "<" + new Array(paramCount).fill("unknown").join(", ") + ">", hasAny: false };
}

export function generate(options: { skipPatches?: boolean } = {}) {
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

  const ir = new Map<string, IRNamespace>();

  parseSource(chromeNs, "chrome", ir);
  parseSource(firefoxFile, "firefox", ir);

  // Normalize structural-form mismatches before merging or patching, so the
  // patch layer sees one consistent shape per API (Decision 14).
  const structuralIssues: MergeIssue[] = [];
  reconcileStructuralForms(ir, structuralIssues);

  if (!options.skipPatches) {
    applyPatches(ir);
  }

  fs.mkdirSync("dist", { recursive: true });
  fs.mkdirSync("tests", { recursive: true });

  // 1. Static package delivery (union of both browsers, single declaration set)
  const full = emitDtsDetailed(ir);
  fs.writeFileSync("dist/index.d.ts", full.dts);

  // 2. Target-pruned generation deliveries (Decision 4)
  fs.writeFileSync("dist/chrome-only.d.ts", emitDts(ir, "chrome"));
  fs.writeFileSync("dist/firefox-only.d.ts", emitDts(ir, "firefox"));

  // 3. Queryable metadata export (RFC §4). This is a first-class deliverable, not
  //    a convenience: JavaScript consumers never see the .d.ts or its JSDoc, and
  //    per RFC §1a it is the only channel where graded cross-browser feedback can
  //    live, since TypeScript has no warning severity.
  const metadata: Record<string, {
    supported: string[];
    note?: string;
    platforms?: string[];
    channel?: string;
    privileged?: string;
    patched?: boolean;
    bug_url?: string;
  }> = {};
  for (const entry of full.metadata) {
    metadata[entry.path] = {
      supported: entry.supported === "Chrome, Firefox" ? ["chrome", "firefox"]
        : entry.supported === "Chrome" ? ["chrome"] : ["firefox"],
      ...(entry.note ? { note: entry.note } : {}),
      ...(entry.platforms ? { platforms: entry.platforms } : {}),
      ...(entry.channel ? { channel: entry.channel } : {}),
      ...(entry.privileged ? { privileged: entry.privileged } : {}),
      ...(entry.patched ? { patched: entry.patched } : {}),
      ...(entry.bug_url ? { bug_url: entry.bug_url } : {}),
    };
  }
  fs.writeFileSync("dist/metadata.json", JSON.stringify(metadata, null, 2));

  // 4. Elements the merger could not combine. Decision 15 routes these to the
  //    patch layer rather than letting a lossy automatic merge ship silently.
  const allIssues = [...structuralIssues, ...full.issues];
  if (allIssues.length) {
    fs.writeFileSync("dist/merge-issues.json", JSON.stringify(allIssues, null, 2));
    console.warn(`${allIssues.length} element(s) need patches — see dist/merge-issues.json`);
  } else if (fs.existsSync("dist/merge-issues.json")) {
    fs.unlinkSync("dist/merge-issues.json");
  }

  // 5. Generate type-existence tests for all exported declarations
  let testFile = `import "../dist/index.d.ts";\n\ntype _WebExtCustomChromeEvent<H extends (...args: never[]) => void> = chrome.events.Event<H>;\n\n`;
  for (const [nsName, ns] of ir.entries()) {
    for (const [elName, el] of ns.elements.entries()) {
      const cRes = resolveTypeArguments(el.chromeSource, el.chromeTypeParamsCount, elName);
      const fRes = resolveTypeArguments(el.firefoxSource, el.firefoxTypeParamsCount, elName);
      const args = cRes.args || fRes.args;
      const safeNsName = nsName.replace(/\./g, "_");
      // Under Decision 20 every element is reachable from BOTH namespaces, so both
      // assertions are emitted unconditionally — that is precisely the invariant
      // the alias block must uphold.
      if (el.kind === "function" || el.kind === "variable" || el.kind === "namespace") {
        testFile += `declare let _${safeNsName}_${elName}_chrome: typeof chrome.${nsName}.${elName};\n`;
        testFile += `declare let _${safeNsName}_${elName}_browser: typeof browser.${nsName}.${elName};\n`;
      } else {
        testFile += `declare let _${safeNsName}_${elName}_chrome: chrome.${nsName}.${elName}${args};\n`;
        testFile += `declare let _${safeNsName}_${elName}_browser: browser.${nsName}.${elName}${args};\n`;
      }
    }
  }
  fs.writeFileSync("tests/index.test-d.ts", testFile);

  console.log(`Generation complete. ${full.metadata.length} metadata entries, ${allIssues.length} merge issues.`);
}

// Guard entry point so generator can be safely imported without top-level side effects
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("generator.ts")) {
  const skipPatches = process.argv.includes("--no-patches") || !!process.env.NO_PATCHES;
  generate({ skipPatches });
}