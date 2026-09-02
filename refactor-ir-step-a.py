#!/usr/bin/env python3
"""
INT-010 step A: put an accessor layer in front of IRElement's per-browser fields.

The IR stores a browser's data in fields named after that browser
(`chromeSource`, `firefoxSource`, `chromeTypeParamsCount`, ...). Adding Safari
means adding another field and touching all 89 references. Step A introduces
`getSource(el, browser)` and friends and migrates every reference to them, with
the existing fields still doing the storing. Step B then swaps the storage for a
Map without touching a single call site.

Two provable steps beat one risky rewrite: each is verified by byte-identical
output, and that safety net disappears the moment a third browser's data flows.
"""
import re

P = "/home/pdk/webext-meta-types/src/generator.ts"
s = open(P).read()

# ---- accessor layer ---------------------------------------------------------
ACCESSORS = '''
/* --------------------------------------------------------------------------
 * Per-browser access to IRElement.
 *
 * Call sites go through these rather than naming a browser-specific field, so
 * the storage underneath can change (step B swaps it for a Map) and so adding
 * a browser does not mean touching every reference.
 * ------------------------------------------------------------------------ */

const SOURCE_FIELD: Record<BrowserId, "chromeSource" | "firefoxSource"> = {
  chrome: "chromeSource",
  firefox: "firefoxSource",
};
const TPCOUNT_FIELD: Record<BrowserId, "chromeTypeParamsCount" | "firefoxTypeParamsCount"> = {
  chrome: "chromeTypeParamsCount",
  firefox: "firefoxTypeParamsCount",
};

export function getSource(el: IRElement, b: BrowserId): string | undefined {
  return el[SOURCE_FIELD[b]];
}
export function setSource(el: IRElement, b: BrowserId, src: string | undefined): void {
  el[SOURCE_FIELD[b]] = src;
}
export function hasSource(el: IRElement, b: BrowserId): boolean {
  return el[SOURCE_FIELD[b]] !== undefined;
}
/** Browsers that declare this element, in canonical order. */
export function browsersOf(el: IRElement): BrowserId[] {
  return BROWSER_ORDER.filter((b) => hasSource(el, b));
}
/** True when exactly this browser declares the element. Replaces isChromeOnly. */
export function onlyBrowser(el: IRElement, b: BrowserId): boolean {
  const bs = browsersOf(el);
  return bs.length === 1 && bs[0] === b;
}
export function getTypeParams(el: IRElement, b: BrowserId): number {
  return el[TPCOUNT_FIELD[b]];
}
export function setTypeParams(el: IRElement, b: BrowserId, n: number): void {
  el[TPCOUNT_FIELD[b]] = n;
}
'''

anchor = "/** Patch file schema. */"
s = s.replace(anchor, ACCESSORS + "\n" + anchor, 1)

# ---- migrate reads and writes ----------------------------------------------
# Order matters: assignments first, so the read rewrite does not capture them.
pairs = [("chrome", "chromeSource"), ("firefox", "firefoxSource")]
for browser, field in pairs:
    # compound append: el.X = el.X ? el.X + ... : ...   handled by generic rules below
    s = re.sub(rf"\b(\w+)\.{field}\s*=\s*", rf"__SET__\1__{browser}__ = ", s)
    s = re.sub(rf"\b(\w+)\.{field}\b", rf"getSource(\1, \"{browser}\")", s)

# Turn the marked assignments into setSource calls. The right-hand side runs to
# the end of the statement, which in this file is always a single line.
def fix_assign(m):
    var, browser, rhs = m.group(1), m.group(2), m.group(3)
    return f'setSource({var}, "{browser}", {rhs.rstrip().rstrip(";")});'

s = re.sub(r"__SET__(\w+)__(\w+)__ = (.+);", fix_assign, s)

for browser, field in [("chrome", "chromeTypeParamsCount"), ("firefox", "firefoxTypeParamsCount")]:
    s = re.sub(rf"\b(\w+)\.{field}\s*=\s*(.+?);", rf'setTypeParams(\1, "{browser}", \2);', s)
    s = re.sub(rf"\b(\w+)\.{field}\b", rf'getTypeParams(\1, "{browser}")', s)

# isChromeOnly / isFirefoxOnly reads become onlyBrowser(); their assignments are
# dropped, since the value is now derived rather than stored.
s = re.sub(r"^\s*\w+\.is(Chrome|Firefox)Only\s*=\s*.+?;\s*$\n", "", s, flags=re.M)
s = re.sub(r"\b(\w+)\.isChromeOnly\b", r'onlyBrowser(\1, "chrome")', s)
s = re.sub(r"\b(\w+)\.isFirefoxOnly\b", r'onlyBrowser(\1, "firefox")', s)

open(P, "w").write(s)

leftover = [l.strip()[:96] for l in s.splitlines()
            if re.search(r"\.(chromeSource|firefoxSource|isChromeOnly|isFirefoxOnly|"
                         r"chromeTypeParamsCount|firefoxTypeParamsCount)\b", l)
            and "SOURCE_FIELD" not in l and "TPCOUNT_FIELD" not in l]
print(f"migrated. remaining direct field references: {len(leftover)}")
for l in leftover:
    print("   ", l)
