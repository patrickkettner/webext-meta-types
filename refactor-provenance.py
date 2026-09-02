#!/usr/bin/env python3
"""
INT-001..004: turn Provenance from a string union into a browser set.

Why: `"Chrome" | "Firefox" | "Chrome, Firefox"` enumerates every combination as
a literal. Two browsers give 3; three give 7; four give 15. Safari cannot be
added without rewriting every consumer, and the string doubles as both the data
and its rendering.

After this change Provenance is a set of BrowserId, with one function that
renders it for display and one that tests membership. Adding a browser becomes
appending to BROWSER_ORDER.

This must be a pure refactor: with only Chrome and Firefox loaded the emitted
output has to be byte-identical. That check is the entire safety net, and it
stops being available once a third browser's data flows, which is why the
refactor comes first.
"""
import re

P = "/home/pdk/webext-meta-types/src/generator.ts"
s = open(P).read()

# ---- 1. the type itself -----------------------------------------------------
s = s.replace(
    'export type Provenance = "Chrome" | "Firefox" | "Chrome, Firefox";',
    '''/**
 * Browsers this project can emit types for, in canonical display order.
 * Adding one means appending here, not enumerating combinations elsewhere.
 */
export const BROWSER_ORDER = ["chrome", "firefox"] as const;
export type BrowserId = (typeof BROWSER_ORDER)[number];

const BROWSER_LABEL: Record<BrowserId, string> = {
  chrome: "Chrome",
  firefox: "Firefox",
};

/**
 * Which browsers support a declaration. A set rather than a string union: two
 * browsers give 3 combinations, three give 7, four give 15, and enumerating
 * them as literals is what made Safari impossible to add.
 */
export type Provenance = ReadonlySet<BrowserId>;

/** Build a Provenance in canonical order, whatever order the ids arrive in. */
export function mkProv(...ids: BrowserId[]): Provenance {
  return new Set(BROWSER_ORDER.filter((b) => ids.includes(b)));
}

/** Render for the `@supported` annotation: "Chrome", "Chrome, Firefox". */
export function formatProvenance(p: Provenance): string {
  return BROWSER_ORDER.filter((b) => p.has(b)).map((b) => BROWSER_LABEL[b]).join(", ");
}

/** The browser ids in canonical order, for metadata. */
export function provList(p: Provenance): BrowserId[] {
  return BROWSER_ORDER.filter((b) => p.has(b));
}''')

# ---- 2. membership test -----------------------------------------------------
s = s.replace(
    '''function keptForTarget(p: Provenance, target?: "chrome" | "firefox"): boolean {
  if (!target) return true;
  if (p === "Chrome, Firefox") return true;
  return target === "chrome" ? p === "Chrome" : p === "Firefox";
}''',
    '''function keptForTarget(p: Provenance, target?: BrowserId): boolean {
  // Equivalent to the old three-way literal comparison: a declaration survives
  // a target-pruned build exactly when that target is in its provenance.
  return !target || p.has(target);
}''')

# ---- 3. rendering -----------------------------------------------------------
s = s.replace(
    'return `/**\\n * @supported ${supported}${noteLine}${bugLine}\\n */\\n`;',
    'return `/**\\n * @supported ${formatProvenance(supported)}${noteLine}${bugLine}\\n */\\n`;')

# ---- 4. construction sites --------------------------------------------------
s = re.sub(r'(:\s*Provenance\s*=\s*)"Chrome, Firefox"', r'\1mkProv("chrome", "firefox")', s)
s = re.sub(r'(:\s*Provenance\s*=\s*)"Chrome"', r'\1mkProv("chrome")', s)
s = re.sub(r'(:\s*Provenance\s*=\s*)"Firefox"', r'\1mkProv("firefox")', s)
# ternaries: ... ? "Chrome, Firefox" : "Chrome"  etc.
s = re.sub(r'\?\s*"Chrome, Firefox"', '? mkProv("chrome", "firefox")', s)
s = re.sub(r':\s*"Chrome, Firefox"(?=[;\s)])', ': mkProv("chrome", "firefox")', s)
s = re.sub(r'\?\s*"Chrome"(?=\s*:)', '? mkProv("chrome")', s)
s = re.sub(r':\s*"Chrome"(?=[;\s)])', ': mkProv("chrome")', s)
s = re.sub(r'\?\s*"Firefox"(?=\s*:)', '? mkProv("firefox")', s)
s = re.sub(r':\s*"Firefox"(?=[;\s)])', ': mkProv("firefox")', s)
# direct calls: formatSupportComment("Chrome, Firefox", ...)
s = s.replace('formatSupportComment("Chrome, Firefox"', 'formatSupportComment(mkProv("chrome", "firefox")')
s = s.replace('formatSupportComment("Chrome"', 'formatSupportComment(mkProv("chrome")')
s = s.replace('formatSupportComment("Firefox"', 'formatSupportComment(mkProv("firefox")')

# ---- 5. metadata export -----------------------------------------------------
s = s.replace(
    '''      supported: entry.supported === "Chrome, Firefox" ? ["chrome", "firefox"]
        : entry.supported === "Chrome" ? ["chrome"] : ["firefox"],''',
    '''      supported: provList(entry.supported),''')

open(P, "w").write(s)

left = [l.strip()[:88] for l in s.splitlines()
        if re.search(r'"Chrome, Firefox"|(?<!_)"Chrome"|"Firefox"', l)
        and "BROWSER_LABEL" not in l and "formatProvenance" not in l]
print("rewrote Provenance to a browser set")
print("remaining string-literal provenance sites:", len(left))
for l in left:
    print("   ", l)
