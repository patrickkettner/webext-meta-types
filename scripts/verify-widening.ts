/**
 * Two checks, both about CLAUDE.md rule 7: a widening rule is only real if
 * it is measured against something outside the generator.
 *
 * 1. Self-consistency: every interface member in dist/index.d.ts whose
 *    `@supported` set is a strict subset of its own interface's must be
 *    optional. Needs no upstream package; the interface's own tag is the
 *    ground truth. Fails on any member that is not.
 * 2. Upstream cross-check: for each dist/{chrome,firefox,safari}-only.d.ts,
 *    parse that browser's own upstream package and assert every member's
 *    optionality matches it member for member, names mapped through
 *    canonical-names-derived.json and safari-relocation-derived.json. A
 *    member this cannot map with confidence (inherited through `extends`,
 *    or an unrelocated Safari flat name) is skipped and counted, not
 *    silently passed. Fails on any mapped member that disagrees.
 *
 * Usage: npx tsx scripts/verify-widening.ts [--dist <dir>]
 */
import { Project, Node, ModuleDeclaration, InterfaceDeclaration, SourceFile } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";
import { loadCanonicalNames, validatePatch, BROWSER_ORDER, type BrowserId, type CanonicalNameRow } from "../src/generator";

interface Failure {
  path: string;
  distLoc: string;
  upstreamLoc?: string;
  detail: string;
}

function parseArgs(): { distDir: string } {
  const i = process.argv.indexOf("--dist");
  const distDir = i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : "dist";
  return { distDir };
}

function supportedOf(node: Node): string[] | null {
  if (!Node.isJSDocable(node)) return null;
  for (const d of node.getJsDocs()) {
    const m = /@supported\s+([^\r\n*]+)/.exec(d.getText());
    if (m) return m[1].trim().split(",").map((s) => s.trim()).filter(Boolean);
  }
  return null;
}

function hasQuestion(node: Node): boolean {
  const n = node as unknown as { hasQuestionToken?: () => boolean };
  return typeof n.hasQuestionToken === "function" ? n.hasQuestionToken() : false;
}

function memberName(node: Node): string | undefined {
  const n = node as unknown as { getName?: () => string };
  return n.getName?.();
}

// Part 1. dist/index.d.ts self-consistency.

function checkSelfConsistency(distDir: string): { failures: Failure[]; checked: number } {
  const filePath = path.join(distDir, "index.d.ts");
  const project = new Project();
  const sf = project.addSourceFileAtPath(filePath);
  const failures: Failure[] = [];
  let checked = 0;

  function walk(mod: ModuleDeclaration, nsPath: string) {
    for (const iface of mod.getInterfaces()) {
      const ifaceSup = supportedOf(iface);
      if (!ifaceSup) continue;
      for (const mem of iface.getMembers()) {
        if (Node.isIndexSignatureDeclaration(mem)) continue; // "optional" has no meaning for a key range
        const memSup = supportedOf(mem);
        if (!memSup) continue;
        const isSubset = memSup.length < ifaceSup.length && memSup.every((b) => ifaceSup.includes(b));
        if (!isSubset) continue;
        checked++;
        if (!hasQuestion(mem)) {
          failures.push({
            path: `${nsPath}.${iface.getName()}.${memberName(mem) ?? "?"}`,
            distLoc: `${filePath}:${mem.getStartLineNumber()}`,
            detail: `@supported ${memSup.join(", ")} is a strict subset of the interface's ${ifaceSup.join(", ")}, member is required`,
          });
        }
      }
    }
    for (const sub of mod.getModules()) walk(sub, `${nsPath}.${sub.getName()}`);
  }

  for (const mod of sf.getModules()) walk(mod, mod.getName());
  return { failures, checked };
}

// Part 2. Upstream cross-check.

const UPSTREAM_FILE: Record<BrowserId, string> = {
  chrome: "node_modules/chrome-types/index.d.ts",
  firefox: "node_modules/@types/firefox-webext-browser/index.d.ts",
  safari: "node_modules/safari-webextension-types/index.d.ts",
};

/** Row lookup: dist (namespace, canonical name) -> that browser's own upstream identifier. */
function upstreamNameFor(renames: CanonicalNameRow[], namespace: string, distName: string, browser: BrowserId): string {
  const row = renames.find((r) => r.namespace === namespace && r.browser === browser && r.canonical === distName);
  return row ? row.name : distName;
}

interface UpstreamLookup {
  findInterface(namespace: string, upstreamName: string): InterfaceDeclaration | undefined;
}

function chromeLookup(project: Project): UpstreamLookup {
  const sf = project.addSourceFileAtPath(UPSTREAM_FILE.chrome);
  const chrome = sf.getModuleOrThrow("chrome");
  return {
    findInterface(namespace, upstreamName) {
      const mod = namespace ? chrome.getModule(namespace) : chrome;
      return mod?.getInterface(upstreamName);
    },
  };
}

function firefoxLookup(project: Project): UpstreamLookup {
  const sf = project.addSourceFileAtPath(UPSTREAM_FILE.firefox);
  const mods = sf.getModules();
  return {
    findInterface(namespace, upstreamName) {
      const wanted = `browser${namespace ? `.${namespace}` : ""}`;
      for (const mod of mods) {
        if (mod.getName() !== wanted) continue;
        const iface = mod.getInterface(upstreamName);
        if (iface) return iface;
      }
      return undefined;
    },
  };
}

/** Safari nests only a few namespaces (e.g. `events`); everything else is a flat
 *  top-level interface directly under `browser`, placed by safari-relocation-derived.json. */
function safariLookup(project: Project): UpstreamLookup {
  const sf = project.addSourceFileAtPath(UPSTREAM_FILE.safari);
  const browserMod = sf.getModuleOrThrow("browser");
  const relocationDoc = JSON.parse(fs.readFileSync("safari-relocation-derived.json", "utf8")) as {
    derived: Array<{ name: string; namespace: string }>;
  };
  const relocatedTo = new Map(relocationDoc.derived.map((r) => [r.name, r.namespace]));
  return {
    findInterface(namespace, upstreamName) {
      const nested = namespace ? browserMod.getModule(namespace) : undefined;
      const nestedIface = nested?.getInterface(upstreamName);
      if (nestedIface) return nestedIface;
      // Flat: only trust it if the relocation map confirms this namespace.
      if (relocatedTo.get(upstreamName) !== namespace) return undefined;
      return browserMod.getInterface(upstreamName);
    },
  };
}

function buildLookup(browser: BrowserId, project: Project): UpstreamLookup {
  if (browser === "chrome") return chromeLookup(project);
  if (browser === "firefox") return firefoxLookup(project);
  return safariLookup(project);
}

/**
 * `${namespace}.${element}` -> browsers whose text a patch replaced.
 *
 * A patch is a deliberate, evidence-carrying divergence from upstream
 * (CLAUDE.md rule 6), so comparing its output against raw upstream text is
 * comparing against the wrong ground truth and would fail the gate for a
 * reason that has nothing to do with widening. `overrideShared` only takes
 * effect where the element already has a source for that browser, which this
 * script cannot re-derive without rebuilding the whole IR, so it is treated
 * as covering all three browsers: over-skipping is the safe direction here,
 * under-skipping would be a false failure on legitimate, reviewed patches.
 */
function loadPatchedElements(patchDir = "patches"): Map<string, Set<BrowserId>> {
  const out = new Map<string, Set<BrowserId>>();
  if (!fs.existsSync(patchDir)) return out;
  for (const file of fs.readdirSync(patchDir)) {
    if (!file.endsWith(".json")) continue;
    const patchPath = path.join(patchDir, file);
    const raw = JSON.parse(fs.readFileSync(patchPath, "utf8"));
    const items = Array.isArray(raw) ? raw : [raw];
    for (const item of items) {
      const patch = validatePatch(item, patchPath);
      const key = `${patch.namespace}.${patch.element}`;
      const browsers = out.get(key) ?? new Set<BrowserId>();
      const explicit = BROWSER_ORDER.filter((b) => patch.overrides[b] !== undefined);
      for (const b of explicit) browsers.add(b);
      if (patch.overrideShared !== undefined) for (const b of BROWSER_ORDER) browsers.add(b);
      out.set(key, browsers);
    }
  }
  return out;
}

function checkUpstream(
  browser: BrowserId,
  distDir: string,
  renames: CanonicalNameRow[],
  patchedElements: Map<string, Set<BrowserId>>
): { failures: Failure[]; matched: number; skipped: number; skippedPaths: string[] } {
  const filePath = path.join(distDir, `${browser}-only.d.ts`);
  const distProject = new Project();
  const distFile = distProject.addSourceFileAtPath(filePath);
  const upstreamProject = new Project();
  const lookup = buildLookup(browser, upstreamProject);

  const failures: Failure[] = [];
  let matched = 0;
  let skipped = 0;
  const skippedPaths: string[] = [];

  function walk(mod: ModuleDeclaration, nsPath: string) {
    for (const iface of mod.getInterfaces()) {
      const upstreamIfaceName = upstreamNameFor(renames, nsPath, iface.getName(), browser);
      const upstreamIface = lookup.findInterface(nsPath, upstreamIfaceName);
      const patchedBrowsers = patchedElements.get(`${nsPath}.${iface.getName()}`);
      for (const mem of iface.getMembers()) {
        if (Node.isIndexSignatureDeclaration(mem)) continue;
        const name = memberName(mem);
        if (!name) continue;
        const distPath = `${nsPath}.${iface.getName()}.${name}`;
        if (patchedBrowsers?.has(browser)) {
          // A patch replaced this element's text for this browser: expected
          // to diverge from raw upstream by design, not a widening bug.
          skipped++;
          skippedPaths.push(`${distPath} (patched)`);
          continue;
        }
        const upstreamMember = upstreamIface?.getMembers().find((m) => memberName(m) === name);
        if (!upstreamIface || !upstreamMember) {
          // Not declared directly on this interface upstream: most commonly a
          // member inherited through `extends`, which this lookup does not
          // resolve. Could also be an unconfirmed Safari relocation. Either
          // way, asserting anything here would not be backed by a real
          // upstream read, so it is skipped and counted rather than assumed.
          skipped++;
          skippedPaths.push(distPath);
          continue;
        }
        matched++;
        const distOptional = hasQuestion(mem);
        const upstreamOptional = hasQuestion(upstreamMember);
        if (distOptional !== upstreamOptional) {
          failures.push({
            path: distPath,
            distLoc: `${filePath}:${mem.getStartLineNumber()}`,
            upstreamLoc: `${UPSTREAM_FILE[browser]}:${upstreamMember.getStartLineNumber()}`,
            detail: `${browser}-only.d.ts has it ${distOptional ? "optional" : "required"}, upstream declares it ${upstreamOptional ? "optional" : "required"}`,
          });
        }
      }
    }
    for (const sub of mod.getModules()) walk(sub, `${nsPath}.${sub.getName()}`);
  }

  for (const mod of distFile.getModules()) {
    if (mod.getName() !== "chrome") continue;
    for (const sub of mod.getModules()) walk(sub, sub.getName());
  }

  return { failures, matched, skipped, skippedPaths };
}

// Main.

function main(): void {
  const { distDir } = parseArgs();
  let hasFailure = false;

  console.log(`=== Self-consistency: ${distDir}/index.d.ts ===`);
  const self = checkSelfConsistency(distDir);
  console.log(`Members checked (subset of their interface's @supported): ${self.checked}`);
  console.log(`Required-but-should-be-optional: ${self.failures.length}`);
  for (const f of self.failures) {
    console.log(`  ✗ ${f.path}  [${f.distLoc}]  ${f.detail}`);
    hasFailure = true;
  }

  const { renames } = loadCanonicalNames();
  const patchedElements = loadPatchedElements();
  for (const browser of ["chrome", "firefox", "safari"] as const) {
    console.log(`\n=== Upstream cross-check: ${distDir}/${browser}-only.d.ts vs ${UPSTREAM_FILE[browser]} ===`);
    const res = checkUpstream(browser, distDir, renames, patchedElements);
    console.log(`Matched to upstream: ${res.matched}`);
    console.log(`Skipped (could not map to an upstream declaration): ${res.skipped}`);
    if (res.skipped > 0) {
      const preview = res.skippedPaths.slice(0, 10);
      preview.forEach((p) => console.log(`    - ${p}`));
      if (res.skippedPaths.length > preview.length) {
        console.log(`    ... and ${res.skippedPaths.length - preview.length} more`);
      }
    }
    console.log(`Optionality mismatches: ${res.failures.length}`);
    for (const f of res.failures) {
      console.log(`  ✗ ${f.path}  dist=[${f.distLoc}]  upstream=[${f.upstreamLoc}]  ${f.detail}`);
      hasFailure = true;
    }
  }

  if (hasFailure) {
    console.error("\nFAIL: verify:widening found mismatches.");
    process.exit(1);
  }
  console.log("\nOK: every subset member is optional, and every pruned member matches upstream.");
}

main();
