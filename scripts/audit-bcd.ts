import { BROWSER_ORDER, type BrowserId } from "../src/generator";
import fs from "fs";
import bcd from "@mdn/browser-compat-data" with { type: "json" };
import type { CoverageManifest, BrowserFlags } from "../shared/coverage-types";

const coverage = JSON.parse(fs.readFileSync("coverage.json", "utf-8")) as CoverageManifest;

// Safely extract bcd.webextensions without `any`
const bcdRoot = bcd as unknown as {
  webextensions: { api: Record<string, unknown>; manifest: Record<string, unknown> };
};
const bcdWebExt = bcdRoot.webextensions.api;
const bcdManifest = bcdRoot.webextensions.manifest;

let output = "# BCD Discrepancies Report\n\n";
output += "This report compares the machine-generated `coverage.json` against `@mdn/browser-compat-data`.\n\n";

const missingNamespaces: string[] = [];
const missingElements: string[] = [];
const supportConflicts: string[] = [];

// Helper to resolve nested BCD paths (e.g. "privacy.network")
function getBcdNode(pathString: string): Record<string, unknown> | undefined {
  const parts = pathString.split(".");
  let current: unknown = bcdWebExt;
  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current as Record<string, unknown> | undefined;
}

// Helper to determine if a BCD support statement means "currently supported"
function isSupported(supportData: unknown): boolean {
  if (!supportData) return false;
  
  // If it's an array, supportData[0] is the primary standard support statement; subsequent entries represent historical flags or prefixes.
  if (Array.isArray(supportData)) {
    return supportData.length > 0 ? isSupported(supportData[0]) : false;
  }

  const s = supportData as { version_added?: string | boolean | null; version_removed?: string | boolean };
  // version_added: false means explicitly not supported
  // version_added: null means supported, but version unknown
  // version_added: string means supported since that version
  // version_added: true means supported (very rare, but possible)
  if (s.version_added === false) return false;
  
  // Check if the feature was later removed
  if (s.version_removed !== undefined && s.version_removed !== false) return false;
  
  if (s.version_added !== undefined) return true;
  
  return false;
}

/**
 * BCD keys per browser. Safari has two, desktop and iOS, and our types make no
 * distinction between them, so either supporting an API satisfies the claim.
 */
const EXEMPT = new Set(
  (JSON.parse(fs.readFileSync("bcd-exemptions.json", "utf8")).exempt as
    Array<{ namespace: string; browser: string }>).map((e) => `${e.namespace}|${e.browser}`)
);

const BCD_KEYS: Record<BrowserId, string[]> = {
  chrome: ["chrome"],
  firefox: ["firefox"],
  safari: ["safari", "safari_ios"],
};

/**
 * Namespaces BCD documents under `webextensions.manifest` instead of
 * `webextensions.api`, because they are manifest-key stubs rather than runtime
 * APIs. Looking them up in the api tree reported them as absent from BCD.
 * `bcd-manifest-keys.json` carries the upstream citation for each mapping and
 * explains why only Chrome's flag is compared.
 */
const MANIFEST_KEYS = new Map<string, string>(
  (JSON.parse(fs.readFileSync("bcd-manifest-keys.json", "utf8")).keys as
    Array<{ namespace: string; bcdKey: string }>).map((k) => [k.namespace, k.bcdKey])
);

/**
 * Every name BCD records in an `alternative_name`, and the support statement
 * that records it, keyed `path|browserKey`.
 *
 * BCD documents one canonical name and states, per browser, what that browser
 * calls it instead: Chrome's `contextMenus.create` is `menus.create` with
 * `alternative_name: "contextMenus.create"`. Resolving only the canonical name
 * reported `contextMenus` as absent from BCD, when BCD covers it and says so.
 */
const ALT_NAMES = new Set<string>();
const ALT_BY_STATEMENT = new Map<string, string>();
(function indexAlternativeNames(node: Record<string, unknown>, path: string): void {
  const compat = node.__compat as { support?: Record<string, unknown> } | undefined;
  for (const [key, value] of Object.entries(compat?.support ?? {})) {
    for (const s of Array.isArray(value) ? value : [value]) {
      const alt = (s as { alternative_name?: string } | null)?.alternative_name;
      if (!alt) continue;
      ALT_NAMES.add(alt);
      ALT_BY_STATEMENT.set(`${path}|${key}`, alt);
    }
  }
  for (const [key, child] of Object.entries(node)) {
    if (key !== "__compat" && child && typeof child === "object") {
      indexAlternativeNames(child as Record<string, unknown>, path ? `${path}.${key}` : key);
    }
  }
})(bcdWebExt, "");

/** "Chrome, Safari", for a coverage row. */
const declaredBy = (row: BrowserFlags): string =>
  BROWSER_ORDER.filter((b) => row[b]).map((b) => b[0].toUpperCase() + b.slice(1)).join(", ") || "none";

/** The coverage row for a dotted path, or undefined when we declare no such thing. */
function coverageRow(dotted: string): BrowserFlags | undefined {
  const ns = coverage.namespaces[dotted];
  if (ns) return ns;
  const cut = dotted.lastIndexOf(".");
  if (cut < 0) return undefined;
  return coverage.namespaces[dotted.slice(0, cut)]?.elements[dotted.slice(cut + 1)];
}

/**
 * Does `browser` declare this path, under either shape we record it in?
 *
 * A nested API lands in coverage twice and differently per browser.
 * `devtools.inspectedWindow` is a nested namespace for Chrome and Firefox (its
 * own top-level row) and a typed variable for Safari (an element of
 * `devtools`). Reading only the element row reported Chrome as not declaring
 * things Chrome declares.
 */
function declares(dotted: string, browser: BrowserId): boolean {
  if (coverage.namespaces[dotted]?.[browser]) return true;
  const cut = dotted.lastIndexOf(".");
  if (cut < 0) return false;
  const [parent, leaf] = [dotted.slice(0, cut), dotted.slice(cut + 1)];
  const elements = coverage.namespaces[parent]?.elements;
  // `chrome-types` prefixes a reserved word to keep it a legal identifier, so
  // BCD's `devtools.inspectedWindow.eval` is our `_eval`, and Safari's package
  // spells the same member without the prefix. Both shapes are the member.
  return Boolean(elements?.[leaf]?.[browser]) || Boolean(elements?.[`_${leaf}`]?.[browser]);
}

/**
 * Members a browser reaches only under an earlier manifest version.
 *
 * `chrome-types` describes MV3, so an MV2-only member is absent from it by
 * design while BCD still documents it. Comparing the two produced 27 conflicts
 * that were purely a difference in scope. Each entry cites the Chromium feature
 * table that gates it.
 */
const mv2Doc = JSON.parse(fs.readFileSync("bcd-mv2-only.json", "utf8")) as {
  members: Array<{ member: string }>;
  namespaces: { entries: Array<{ namespace: string }> };
};
const MV2_ONLY = new Set(mv2Doc.members.map((m) => m.member));
/** Whole namespaces MV3 dropped, so every member under them is MV2-only too. */
const MV2_ONLY_NAMESPACES = new Set(mv2Doc.namespaces.entries.map((e) => e.namespace));

/**
 * Push a types-versus-BCD disagreement, or nothing when they agree.
 *
 * `path` is BCD's canonical path, used to find the browser's own spelling. A
 * browser that calls the thing something else declares it under that name in
 * its package, so its flag sits on the alternative name's coverage row.
 */
function compareSupport(
  label: string, browser: BrowserId, claimed: boolean,
  support: Record<string, unknown>, path?: string,
): void {
  let claims = claimed;
  if (!claims && path) {
    for (const key of BCD_KEYS[browser]) {
      const alt = ALT_BY_STATEMENT.get(`${path}|${key}`);
      if (alt && coverageRow(alt)?.[browser]) { claims = true; break; }
    }
  }
  const inBcd = BCD_KEYS[browser].some((k) => isSupported(support[k]));
  const name = browser[0].toUpperCase() + browser.slice(1);
  if (claims && !inBcd) supportConflicts.push(`- **${label}**: Types say ${name} YES, BCD says ${name} NO.`);
  if (!claims && inBcd) supportConflicts.push(`- **${label}**: Types say ${name} NO, BCD says ${name} YES.`);
}

for (const [nsName, nsData] of Object.entries(coverage.namespaces)) {
  const manifestKey = MANIFEST_KEYS.get(nsName);
  if (manifestKey) {
    // A manifest key has no members that correspond to our declarations: its
    // BCD children are sub-properties of the key, not functions and events.
    // Compare the key itself and skip the element walk.
    const support = (bcdManifest[manifestKey] as { __compat?: { support?: Record<string, unknown> } } | undefined)
      ?.__compat?.support;
    if (!support) {
      missingNamespaces.push(`- **${nsName}**: Present in types (${declaredBy(nsData)}) but completely missing from BCD.`);
      continue;
    }
    compareSupport(nsName, "chrome", Boolean(nsData.chrome), support);
    continue;
  }

  const bcdTarget = getBcdNode(nsName);

  if (!bcdTarget) {
    // BCD may cover it under its canonical name and record ours as the
    // browser's alternative spelling, which is not the same as absence.
    if (!ALT_NAMES.has(nsName)) {
      missingNamespaces.push(`- **${nsName}**: Present in types (${declaredBy(nsData)}) but completely missing from BCD.`);
    }
    continue;
  }

  // Browsers that reach this namespace only as a typed variable on its parent
  // (Chrome's `privacy.network`) rather than as a namespace of its own. Their
  // members are properties of a type, so coverage never lists them and a
  // member-level comparison would read that shape as missing support.
  const opaqueFor = new Set<BrowserId>();
  if (nsName.includes(".")) {
    const parent = nsName.slice(0, nsName.lastIndexOf("."));
    const leaf = nsName.slice(nsName.lastIndexOf(".") + 1);
    for (const b of BROWSER_ORDER) {
      if (!nsData[b] && coverage.namespaces[parent]?.elements[leaf]?.[b]) opaqueFor.add(b);
    }
  }

  for (const [elName, elData] of Object.entries(nsData.elements)) {
    // Skip static compile-time TypeScript type definitions in runtime BCD tables
    if (elData.kind === "interface" || elData.kind === "type") continue;
    const bcdEl = bcdTarget[elName] as Record<string, unknown> | undefined;
    if (!bcdEl) {
      if (!ALT_NAMES.has(`${nsName}.${elName}`)) {
        missingElements.push(`- **${nsName}.${elName}**: Present in types (${declaredBy(elData)}) but missing from BCD.`);
      }
      continue;
    }

    const compat = bcdEl.__compat as { support?: Record<string, unknown> } | undefined;
    const support = compat?.support;
    if (support) {
      if (nsName.startsWith("_")) continue;
      for (const b of BROWSER_ORDER) {
        // Some namespaces share a name across browsers while describing
        // different APIs, so BCD's tree does not describe ours and a conflict
        // is a category error. BCD says which ones itself.
        if (EXEMPT.has(`${nsName.split(".")[0]}|${b}`)) continue;
        // A member the browser only has under an earlier manifest version is
        // absent from an MV3-only package by design, not by disagreement.
        if (MV2_ONLY.has(`${nsName}.${elName}`) || MV2_ONLY_NAMESPACES.has(nsName)) continue;
        // The members of a container a browser models as a typed variable are
        // properties of that type, not namespace elements, so they never reach
        // coverage and their absence says nothing about support.
        if (opaqueFor.has(b)) continue;
        compareSupport(`${nsName}.${elName}`, b, declares(`${nsName}.${elName}`, b), support, `${nsName}.${elName}`);
      }
    }
  }
}

output += "## Missing Namespaces in BCD\n\n";
output += missingNamespaces.join("\n") + "\n\n";

output += "## Missing Elements in BCD\n\n";
output += missingElements.join("\n") + "\n\n";

output += "## Support Conflicts (Types vs BCD)\n\n";
output += supportConflicts.join("\n") + "\n\n";

fs.writeFileSync("BCD-DISCREPANCIES.md", output);
console.log("Wrote BCD-DISCREPANCIES.md");
