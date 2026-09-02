#!/usr/bin/env python3
"""
Build the single full work register from the analysis artifacts.

Inputs (all produced by the research pass):
  upstream-bug-findings.json      298 patch/browser findings
  safari-surface-analysis.json    Safari surface + relocation verdicts
  webkit-idl-analysis.json        orphaned dictionaries + `any` operations
  patches/*.json                  the patch corpus itself
  <idl dir>                       the 37 fetched WebKit IDL files

Output:
  WORKPLAN.md                     every item that needs to be done
"""
import json
import os
import re
import glob
import collections

IDL_DIR = os.environ.get("IDL_DIR", "")
OUT = os.environ.get("OUT", "WORKPLAN.md")

findings = json.load(open("upstream-bug-findings.json"))
safari = json.load(open("safari-surface-analysis.json"))
webkit = json.load(open("webkit-idl-analysis.json"))

# Patch necessity is NEVER taken from the heuristic classifier in
# upstream-bug-findings.json. That classifier was 75% wrong (see
# POSTMORTEM-dead-patch-audit.md). It comes from the empirical tool, which
# removes each override and regenerates.
try:
    necessity = json.load(open("verify-patch-necessity-results.json"))
except FileNotFoundError:
    raise SystemExit(
        "verify-patch-necessity-results.json missing. Run:\n"
        "  npx tsx scripts/verify-patch-necessity.ts --json verify-patch-necessity-results.json"
    )
INERT = [r for r in necessity if r["verdict"] == "INERT"]

# Bug claims come from the ADVERSARIALLY REVIEWED inventory, never from the raw
# classifier. The raw classifier's 181 "filable" claims were reduced to 60 by
# empirical testing plus 7 independent reviewers. See ADVERSARIAL-REVIEW.md.
try:
    corrected = json.load(open("corrected-bug-inventory.json"))
except FileNotFoundError:
    raise SystemExit(
        "corrected-bug-inventory.json missing. Run: python3 synthesize-adversarial.py"
    )
CORRECTED = {(r["browser"], r["api"]): r for r in corrected}
REGRESSION_SIGNALS = ("regression", "loses information", "less precise", "strictly less",
                      "rejects legal", "is in fact wrong", "may be flatly wrong",
                      "deletes upstream", "unfounded", "not documented anywhere",
                      "wrong for firefox", "silently removes", "degrades")
REGRESSIONS = [r for r in corrected
               if any(sig in (r["reason"] or "").lower() for sig in REGRESSION_SIGNALS)]
LOAD_BEARING = [r for r in necessity if r["verdict"] == "LOAD-BEARING"]

# --------------------------------------------------------------- helpers
def esc(s):
    """Make a source fragment safe for a single markdown table cell / inline code."""
    if s is None:
        return ""
    s = re.sub(r"/\*[\s\S]*?\*/", "", s)
    s = re.sub(r"//.*", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s.replace("|", "\\|").replace("`", "'").replace("\u2014", ":")

def clip(s, n=220):
    s = esc(s)
    return s if len(s) <= n else s[: n - 1] + "..."

SEVERITY = {
    "missing-from-upstream": "high",
    "upstream-any": "high",
    "missing-members": "medium",
    "wrong-member-types": "medium",
    "missing-generics": "medium",
    "upstream-weak-type": "medium",
    "missing-overloads": "medium",
    "missing-promise-form": "medium",
    "return-type-mismatch": "medium",
    "wrong-optionality": "low",
    "spurious-members": "low",
    "other-signature-diff": "triage",
}

# Findings that must be checked by hand before filing, with the reason.
# These came out of direct verification against the upstream packages.
VERIFY_FIRST = {
    ("chrome", "tabs.executeScript"):
        "chrome-types is correct to omit this: MV3 removed tabs.executeScript. Do NOT file.",
    ("chrome", "action.ColorArray"):
        "Our invented name for a shape chrome-types inlines. Naming difference, not a gap.",
    ("chrome", "action.IconSizeMap"):
        "Our invented name for a shape chrome-types inlines. Naming difference, not a gap.",
    ("chrome", "action.ImageDataSizeMap"):
        "Our invented name for a shape chrome-types inlines. Naming difference, not a gap.",
    ("chrome", "devtools.inspectedWindow.EvalOptions"):
        "Our name for an inlined parameter shape. Verify against the real chrome-types inline type first.",
    ("chrome", "devtools.inspectedWindow.EvaluationExceptionInfo"):
        "Our name for an inlined parameter shape. Verify against the real chrome-types inline type first.",
    ("chrome", "runtime.UpdateAvailableDetails"):
        "Verify chrome-types does not inline this on runtime.onUpdateAvailable before filing.",
    ("chrome", "tabs.MessageSendOptions"):
        "Verify chrome-types does not inline this on tabs.sendMessage before filing.",
}

TRACKER = {
    "chrome": "crbug.com (Chromium extension schema) primarily; GoogleChrome/chrome-types only when the generator itself is at fault",
    "firefox": "DefinitelyTyped (@types/firefox-webext-browser); bugzilla.mozilla.org when the Gecko schemas/*.json is the root cause",
}

lines = []
W = lines.append

# --------------------------------------------------------------- partition findings
filable = [f for f in findings if f["filable"]]
nonfilable = [f for f in findings if not f["filable"]]
def _confirmed(browser):
    out = []
    for f in filable:
        c = CORRECTED.get((f["browser"], f["path"]))
        if f["browser"] == browser and c and c["final_verdict"] == "CONFIRMED":
            f = dict(f)
            f["_review"] = c
            out.append(f)
    return sorted(out, key=lambda f: (list(SEVERITY).index(f["primary"]), f["path"]))

chrome_bugs = _confirmed("chrome")
firefox_bugs = _confirmed("firefox")
RETRACTED = [r for r in corrected if r["final_verdict"] != "CONFIRMED"]
dead = sorted(INERT, key=lambda r: (r["namespace"], r["element"], r["browser"]))
naming = sorted([f for f in nonfilable if f["primary"] not in ("cosmetic-only", "redundant-patch")],
                key=lambda f: (f["primary"], f["path"], f["browser"]))
# A naming row is resolved once the canonical-name map (CAN-002) has a verdict
# for its path, whether that verdict is a rename or "distinct". The row leaves
# workstream G at that moment, decided by the artifact and not by anyone
# remembering to delete it. Until the map exists every row stays.
try:
    _canon = json.load(open("canonical-names-derived.json"))
    _resolved = {f"{r['namespace']}.{r['name']}" for r in _canon.get("derived", [])}
    naming = [f for f in naming if f["path"] not in _resolved]
except FileNotFoundError:
    pass

# --------------------------------------------------------------- WebKit IDL pairing
idl_files = {}
if IDL_DIR and os.path.isdir(IDL_DIR):
    for p in sorted(glob.glob(os.path.join(IDL_DIR, "*.idl"))):
        idl_files[os.path.basename(p)] = re.sub(r"/\*[\s\S]*?\*/", "", open(p).read())

dicts_by_file = collections.defaultdict(list)
for name in webkit["dicts"]:
    for fn, src in idl_files.items():
        if re.search(r"\bdictionary\s+" + name + r"\s*\{", src):
            dicts_by_file[fn].append(name)
            break

def candidate_dicts(fn, iface, op, param):
    """
    Rank the dictionaries declared in the same IDL file for an `any` parameter.

    Matching is done on the dictionary's suffix once the `WebExtension<Api>`
    prefix is stripped, in tiers:
      1. suffix == <Op><Param>   e.g. setTitle(details) -> ...ActionSetTitleDetails
      2. suffix == <Param>       e.g. getTitle(details) -> ...ActionDetails
      3. suffix ends with <Param>
      4. everything declared in the file
    Anything resolving to more than one candidate is reported as ambiguous
    rather than guessed at.
    """
    cands = dicts_by_file.get(fn, [])
    if not cands:
        return [], "no dictionary declared in this file; one must be added"

    api = iface.replace("WebExtensionAPI", "")
    prefixes = ["WebExtension" + api]
    if api.endswith("s"):
        prefixes.append("WebExtension" + api[:-1])
    prefixes.append("WebExtension")

    def suffix(d):
        for p in prefixes:
            if d.startswith(p):
                return d[len(p):]
        return d

    opcap = op[0].upper() + op[1:] if op else ""
    pcap = param[0].upper() + param[1:] if param else ""

    tiers = [
        [d for d in cands if suffix(d) == opcap + pcap],
        [d for d in cands if pcap and suffix(d) == pcap],
        [d for d in cands if pcap and suffix(d).endswith(pcap)],
        cands,
    ]
    for i, t in enumerate(tiers):
        if t:
            if len(t) == 1:
                return t, ""
            if i == 3:
                return t, "no name match; pick one or add a dictionary"
            return t, "ambiguous, pick one"
    return cands, "ambiguous, pick one"

anyops = webkit["anyparams"]
ops_by_file = collections.defaultdict(list)
for o in anyops:
    ops_by_file[o["file"]].append(o)

def param_names(params):
    out = []
    for chunk in params.split(","):
        chunk = re.sub(r"\[[^\]]*\]", "", chunk).strip()
        m = re.match(r"(?:\w+\s+)*?(\w+)\s+(\w+)$", chunk)
        if m and m.group(1) == "any":
            out.append(m.group(2))
    if not out:
        out = re.findall(r"\bany\s+(\w+)", params)
    return out

# =====================================================================
# Document
# =====================================================================
W("# WORKPLAN: every item that needs to be done")
W("")
W("Single source of truth for the webext-meta-types cross-browser type effort,")
W("covering upstream bug filing, repo cleanup, WebKit IDL follow-up, and Safari")
W("integration.")
W("")
W("Generated from the research pass on 2026-08-15 by `build-workplan.py`, which")
W("reads `upstream-bug-findings.json`, `safari-surface-analysis.json` and")
W("`webkit-idl-analysis.json`. Regenerate after any change to `patches/` so the")
W("counts stay honest.")
W("")
# The status block is computed from live data at generation time. An earlier
# revision carried hand-maintained counts and stale generator line numbers, and
# both drifted from reality within hours.
import importlib.util as _ilu
_spec = _ilu.spec_from_file_location("wstatus", "/home/pdk/webext-meta-types/workplan-status.py")
_mod = _ilu.module_from_spec(_spec); _spec.loader.exec_module(_mod)
for _line in _mod.emit().split("\n"):
    W(_line)
W("---")
W("")

total_items = (len(chrome_bugs) + len(firefox_bugs) + len(dead) + len(naming)
               + len(anyops) + len(safari["topLevelRelocations"]))
W("## Item count")
W("")
W("| Workstream | Prefix | Items |")
W("|---|---|---|")
W(f"| A. Repo hygiene, webext-meta-types | HYG | {len(dead) + 8} |")
W(f"| B. Chrome bugs to file (confirmed) | CHR | {len(chrome_bugs)} |")
W(f"| C. Firefox bugs to file (confirmed) | FF | {len(firefox_bugs)} |")
W(f"| D. WebKit IDL wiring | WK | {len(anyops)} |")
W(f"| E. safari-webextension-types repo | SWT | 9 |")
W(f"| F. Safari integration | INT | {len(safari['topLevelRelocations']) + 25} |")
W(f"| G. Naming and normalization decisions | NAM | {len(naming)} |")
W(f"| H. BCD discrepancies | BCD | 9 |")
W(f"| **I. Guardrails and project setup** | **GRD** | **9** (5 landed) |")
W(f"| J. Repo regressions (patches worse than upstream) | REG | {len(REGRESSIONS)} (all fixed) |")
W(f"| K. Retracted claims (relabel only, do NOT file) | - | {len(RETRACTED)} |")
W(f"| L. Canonical type names | CAN | 8 |")
W("")
W("Workstream I is the priority: it is the reason the other numbers were wrong")
W("twice. Workstream B and C counts are post-review (60 confirmed of 181 claimed).")
W("")
W(f"Roughly **{total_items + 53} discrete items**. The large counts are")
W("intentionally itemized rather than summarized, because each one is a separate")
W("filing, deletion or edit.")
W("")

# --------------------------------------------------------------- ordering
W("## Execution order and dependencies")
W("")
W("```")
W("HYG-001..HYG-006  (parser + generator fixes)      ─┐")
W("HYG-D-*           (delete dead patches)           ─┼─> measurement is trustworthy")
W("                                                   │")
W("CHR-*, FF-*       (file upstream bugs)  <──────────┘   needs dead patches gone first,")
W("                                                       else we file bugs for patches we delete")
W("")
W("WK-*              (WebKit IDL wiring PRs)  ── independent, start immediately, long lead time")
W("SWT-*             (safari types repo)      ── independent, small")
W("")
W("INT-001..INT-004  (Provenance refactor)    ── verifiable by byte-identical output")
W("        ↓")
W("INT-010..INT-016  (IR pairwise -> N-ary)   ── verifiable by byte-identical output")
W("        ↓")
W("INT-R-*           (73 relocation entries)  ── curated map, needs review")
W("INT-020..INT-023  (structural reconcile, event type decision)")
W("        ↓")
W("INT-030..INT-036  (Safari ingestion, coverage, BCD, targets, tests)")
W("")
W("CAN-001           (naming decision, taken 2026-09-02)")
W("CAN-002           (derive-names.ts)            ── the group list is reviewed before anything moves")
W("        ↓")
W("CAN-003..CAN-005  (generator, patches, gate)   ── one change; the dist/ diff is the review")
W("        ↓")
W("CAN-006, CAN-008  (union ratchet, release)")
W("```")
W("")
W("Do not start INT-R-* before INT-016 is green. The two refactors are the only")
W("steps with a free correctness check (output must not change while only two")
W("browsers are loaded), and that check is worthless once Safari data is flowing.")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream A. Repo hygiene, webext-meta-types")
W("")
W("These come first. They are small, and until they are done the bug counts")
W("overstate the real defect load.")
W("")

W("### HYG-001. Handle `export { X as Y }` re-export aliases in `parseSource()`")
W("")
W("- **File:** `src/generator.ts`, `parseSource()` around line 145.")
W("- **Problem:** the statement loop handles function, interface, class, type alias,")
W("  enum and variable declarations, but not `ExportDeclaration`. `chrome-types`")
W("  uses that form twice to work around reserved words:")
W("  - `export {_debugger as debugger};` at `node_modules/chrome-types/index.d.ts:4564`")
W("  - `export {_eval as eval};` at `node_modules/chrome-types/index.d.ts:6150`")
W("- **Impact today:** `dist/index.d.ts:3400` emits `export namespace _debugger`, so")
W("  the entire `chrome.debugger` namespace is unreachable under its real name.")
W("  `devtools.inspectedWindow` carries both a leaked `_eval` and a patched `eval`.")
W("- **Fix:** in `parseSource()`, read `ExportDeclaration` named exports and record")
W("  the alias so the element is registered under the exported name, not the local one.")
W("- **Acceptance:** `dist/index.d.ts` contains `export namespace debugger` (quoted or")
W("  escaped as TypeScript requires) and no `_debugger`; `devtools.inspectedWindow`")
W("  exposes exactly one `eval` and no `_eval`.")
W("- **Occurrences to cover:** 2 in `chrome-types`, 0 in `@types/firefox-webext-browser`.")
W("")

W("### HYG-002. Remove the patch that masked the `eval` parser gap")
W("")
W("- **Depends on:** HYG-001.")
W("- **File:** `patches/subsystem-8-ui-devtools.json`, entry")
W("  `devtools.inspectedWindow.eval`.")
W("- **Problem:** the patch adds a correct `eval`, which hid HYG-001 rather than")
W("  fixing it. Once the parser handles the alias, re-evaluate whether the patch is")
W("  still needed or becomes a genuine upstream finding.")
W("- **Acceptance:** patch deleted or re-justified with a real upstream diff.")
W("")

W("### HYG-003. Wire real bug URLs through the patch schema")
W("")
W("- **Files:** `patches/*.json` (all 200 entries), `src/generator.ts`")
W("  `formatSupportComment()` around line 445.")
W("- **Problem:** every patch carries `bug_url: \"TBD\"`, which the generator renders")
W("  into shipped output as `@note Upstream type inaccuracy patched (Bug URL: TBD)`.")
W("- **Note:** the real-URL path already exists and emits `@see <url>`. No generator")
W("  change is needed beyond populating the data.")
W("- **Acceptance:** after CHR-* and FF-* are filed, zero `TBD` values remain for")
W("  surviving patches.")
W("")

W("### HYG-004. Add a patch-justification test")
W("")
W("- **File:** `test/generator.test.ts`.")
W("- **Superseded by `scripts/verify-patch-necessity.ts`.** The originally proposed")
W("  test compared canonicalized patch text against upstream text. That is exactly")
W("  the reasoning that was 75% wrong, so it must not be built.")
W("- **Remaining work:** HYG-008 wires the empirical tool into `npm run check`.")
W("")

W("### HYG-005. Decide the policy on `Record<string, unknown>` versus the zero-any rule")
W("")
W("- **File:** `scripts/enforce-zero-any.ts`.")
W("- **Problem:** the zero-any policy greps for `any`. `Record<string, unknown>` passes,")
W("  but Safari will contribute 88 of them (see workstream D). The policy needs an")
W("  explicit position before Safari lands, or the guarantee quietly weakens.")
W("- **Acceptance:** documented decision, and if the policy is extended, the script")
W("  enforces it.")
W("")

W("### HYG-006. Regenerate and commit `coverage.json` / `COVERAGE.md` policy")
W("")
W("- **Problem:** `npm run check` regenerates `COVERAGE.md` as an untracked file.")
W("  Decide whether it is a build product (gitignore it) or a committed artifact.")
W("- **Acceptance:** either ignored or committed, consistently.")
W("")

W(f"### HYG-D-*. Delete {len(dead)} inert patch overrides (VERIFIED)")
W("")
W("**An earlier version of this plan listed 80 overrides here as dead. That claim")
W("was wrong and has been retracted.** Removing all 80 changed 380 lines of")
W("`dist/index.d.ts`; per-override testing found 60 of them load-bearing, a 75%")
W("false-positive rate. See `POSTMORTEM-dead-patch-audit.md`.")
W("")
W("The list below comes from `npm run verify:patches`, which removes each override,")
W("regenerates, and compares emitted output. Of all 298 overrides in the corpus,")
W(f"**{len(LOAD_BEARING)} are load-bearing and {len(INERT)} are inert**.")
W("")
W("A patch is not only an upstream correction. It also forces convergence between")
W("Chrome's `,`-separated and Firefox's `;`-separated inline type literals, which")
W("the merger cannot collapse on its own. A patch can be textually redundant and")
W("behaviourally essential at the same time, so necessity is decided by removal,")
W("never by reading.")
W("")
W("**Deletion is gated on Patrick's approval.** Nothing has been deleted.")
W("")
W("Removing a browser-specific override may leave an entry with no overrides at")
W("all, in which case drop the whole entry: `validatePatch` rejects it otherwise.")
W("")
W("| ID | Namespace.Element | Override to remove | Patch file |")
W("|---|---|---|---|")
for i, r in enumerate(dead, 1):
    key = "overrideChrome" if r["browser"] == "chrome" else "overrideFirefox"
    W(f"| HYG-D-{i:03d} | `{r['namespace']}.{r['element']}` | `{key}` | `{r['file']}` |")
W("")
W(f"The other {len(LOAD_BEARING)} overrides are proven load-bearing and must stay.")
W("Many carry `bug_url: \"TBD\"` while doing convergence work rather than fixing an")
W("upstream defect, so they need reclassifying rather than filing. See HYG-007.")
W("")
W("### HYG-007. Separate convergence patches from upstream-defect patches")
W("")
W("- **Problem:** the patch schema has one `bug_url` field and no way to record why")
W("  a patch exists. A patch that only normalizes `,` versus `;` so the merger can")
W("  converge has no upstream bug to file, but it still emits")
W("  `@note Upstream type inaccuracy patched (Bug URL: TBD)` into shipped output,")
W("  asserting an upstream defect that may not exist.")
W("- **Fix:** add a `reason` field (`upstream-defect` | `convergence` | `naming`) and")
W("  emit the `@note` only for `upstream-defect`.")
W("- **Acceptance:** every patch carries a reason; convergence patches stop claiming")
W("  an upstream inaccuracy.")
W("")
W("### HYG-008. Wire `verify:patches` into `npm run check`")
W("")
W("- **Depends on:** HYG-D-*, since the check fails while inert overrides exist.")
W("- **Acceptance:** `npm run check` fails if any override becomes inert.")
W("")

# =====================================================================
def bug_section(prefix, bugs, browser, title):
    W("---")
    W("")
    W(f"## {title}")
    W("")
    W(f"**File against:** {TRACKER[browser]}")
    W("")
    W(f"**{len(bugs)} items, all adversarially confirmed.** An earlier version of this")
    W("plan listed every classifier hit here. That inventory was reduced from 181 to")
    W("60 by empirical testing plus seven independent reviewers instructed to refute;")
    W("121 of those claims were retracted on review; `corrected-bug-inventory.json`")
    W("carries the per-claim verdicts.")
    W("")
    W("Each item carries the verbatim upstream declaration, the shape our patch")
    W("asserts, and the reviewer's evidence, so a report can be written without")
    W("re-deriving anything.")
    W("")
    W("**Do not file these as individual issues without first reading the root-cause")
    W("section below.** Most collapse into a handful of upstream causes, and")
    W("maintainers should receive the cause rather than dozens of symptoms.")
    W("")
    bycat = collections.OrderedDict()
    for f in bugs:
        bycat.setdefault(f["primary"], []).append(f)
    W("| Category | Severity | Count |")
    W("|---|---|---|")
    for c, rows in bycat.items():
        W(f"| {c} | {SEVERITY[c]} | {len(rows)} |")
    W("")
    n = 0
    for c, rows in bycat.items():
        W(f"### {c} ({len(rows)} items, severity {SEVERITY[c]})")
        W("")
        for f in rows:
            n += 1
            ident = f"{prefix}-{n:03d}"
            W(f"#### {ident}. `{f['path']}`")
            W("")
            W(f"- **Kind:** {f['kind']}  |  **Patch source:** `patches/subsystem-*-{f['subsystem']}.json` ({f['mode']} mode)")
            W(f"- **Finding:** {esc(f['detail'])}")
            if f.get("upstreamSource"):
                W(f"- **Upstream today:** `{clip(f.get('upstreamSource'))}`")
            else:
                W("- **Upstream today:** no declaration at all.")
            W(f"- **We assert:** `{clip(f.get('overrideSource'))}`")
            if f["addedMembers"]:
                W(f"- **Members missing upstream:** {', '.join('`' + m + '`' for m in f['addedMembers'])}")
            if f["removedMembers"]:
                W(f"- **Members upstream has that we drop:** {', '.join('`' + m + '`' for m in f['removedMembers'])}")
            if f["changedMembers"]:
                W(f"- **Members with a different type:** {', '.join('`' + m + '`' for m in f['changedMembers'])}")
            if f["optionalityFlips"]:
                W(f"- **Optionality differences:** {', '.join('`' + m + '`' for m in f['optionalityFlips'])}")
            if f["overloadsBefore"] or f["overloadsAfter"]:
                W(f"- **Overload count:** upstream {f['overloadsBefore']}, ours {f['overloadsAfter']}")
            rev = f.get("_review") or {}
            if rev:
                W(f"- **Adversarial verdict:** CONFIRMED. {esc(rev.get('reason',''))}")
                if rev.get("evidence"):
                    W(f"- **Evidence:** {esc(rev['evidence'])}")
            key = (f["browser"], f["path"])
            if key in VERIFY_FIRST:
                W(f"- **VERIFY FIRST:** {VERIFY_FIRST[key]}")
            if c == "other-signature-diff":
                W("- **Triage needed:** the difference did not fall into a known category. Read")
                W("  both declarations and decide whether this is an upstream defect or a")
                W("  restructuring of ours before filing.")
            W(f"- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).")
            W("")

bug_section("CHR", chrome_bugs, "chrome", "Workstream B. Chrome bugs to file")
bug_section("FF", firefox_bugs, "firefox", "Workstream C. Firefox bugs to file")

# =====================================================================
W("---")
W("")
W("## Workstream D. WebKit IDL wiring")
W("")
W("**This is the highest-leverage workstream in the plan.**")
W("")
W("WebKit PR #71593 (merged 2026-08-15) declared the dictionary and enum types but")
W("did not wire them into the operation signatures. Measured at `WebKit/WebKit@main`:")
W("")
W("| Metric | Value |")
W("|---|---|")
W(f"| IDL files | {webkit['counts']['files']} |")
W(f"| dictionaries declared | {webkit['counts']['dicts']} |")
W(f"| enums declared | {webkit['counts']['enums']} |")
W(f"| operations | {webkit['counts']['ops']} |")
W(f"| operations taking an `any` parameter | {len(anyops)} |")
W(f"| dictionaries never referenced by any operation or attribute | {len(webkit['orphans'])} |")
W(f"| dictionaries referenced only from other dictionaries | {len(webkit['indirect'])} |")
W("| dictionaries actually wired into an operation signature | **0** |")
W("")
W("Example of the exact defect, from `WebExtensionAPICookies.idl`, where the")
W("dictionary is declared directly above the operation that should use it:")
W("")
W("```webidl")
W("dictionary WebExtensionCookieDetails {")
W("    DOMString name;")
W("    DOMString storeId;")
W("    DOMString url;")
W("};")
W("")
W("[RaisesException] void get([NSDictionary] any details, [Optional, CallbackHandler] function callback);")
W("```")
W("")
W("This is why `safari-webextension-types` emits 88 `Record<string, unknown>`. The")
W("generator is faithful to the IDL; the IDL is the gap.")
W("")
W("**Suggested PR granularity:** one PR per IDL file, which matches how WebKit")
W("reviewers are assigned and keeps each change reviewable. Below, items are grouped")
W("by file in that order. The candidate dictionary is the one declared in the same")
W("file whose name matches the operation and parameter; where more than one is")
W("plausible the alternatives are listed and a human decision is required.")
W("")
W("**Caveat for every item in this workstream:** changing an IDL parameter from")
W("`any` to a dictionary type changes the Cocoa binding layer's validation path, not")
W("just the declaration. Each PR needs the corresponding implementation checked and")
W("the existing WebKit API tests run. Do not treat these as declaration-only edits.")
W("")

wk_n = 0
for fn in sorted(ops_by_file):
    ops = ops_by_file[fn]
    W(f"### {fn} ({len(ops)} operations)")
    W("")
    declared = dicts_by_file.get(fn, [])
    if declared:
        W(f"Dictionaries declared in this file: {', '.join('`' + d + '`' for d in declared)}")
        W("")
    W("| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |")
    W("|---|---|---|---|---|")
    for o in ops:
        wk_n += 1
        pnames = param_names(o["params"]) or ["?"]
        cands, notes = [], []
        for p in pnames:
            c, n = candidate_dicts(fn, o["iface"], o["op"], p)
            cands += c
            if n:
                notes.append(n)
        seen = set()
        cands = [c for c in cands if not (c in seen or seen.add(c))]
        note = "; ".join(dict.fromkeys(notes))
        if fn == "WebExtensionAPITest.idl":
            note = (note + "; " if note else "") + "moot if SWT-002 drops the test namespace"
        W(f"| WK-{wk_n:03d} | `{o['iface']}.{o['op']}` | {', '.join('`' + p + '`' for p in pnames)} | "
          f"{', '.join('`' + c + '`' for c in cands) if cands else '(none)'} | {note} |")
    W("")

W(f"### WK-ORPHAN. Dictionaries currently unreferenced ({len(webkit['orphans'])})")
W("")
W("Every one of these should end up referenced by the operations above. If any")
W("cannot be, that dictionary is either misnamed or should not have landed, and")
W("that is worth raising on the original PR thread.")
W("")
for i in range(0, len(webkit["orphans"]), 3):
    W("- " + ", ".join("`" + d + "`" for d in webkit["orphans"][i:i + 3]))
W("")
W("Referenced only from other dictionaries, so reachable but not from any operation: "
  + ", ".join("`" + d + "`" for d in webkit["indirect"]) + ".")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream E. safari-webextension-types repository")
W("")

W("### SWT-001. Remove the dead PR-71593 fallback")
W("")
W("- **File:** `scripts/generate.py`, `fetch_from_pr()` around line 195.")
W("- **Problem:** a hardcoded fallback to")
W("  `patrickkettner/WebKit@webextension-idl-declarations` fires when the GitHub API")
W("  lookup fails for PR 71593 specifically. The PR is merged; if that head branch is")
W("  deleted the fallback will fail confusingly, and worse, it can silently produce")
W("  stale output that looks successful.")
W("- **Acceptance:** fallback removed, failure to resolve a PR raises.")
W("")

W("### SWT-002. Drop the `test` namespace from shipped output")
W("")
W("- **Files:** `scripts/generate.py` (`KNOWN_IDL_FILES`), `index.d.ts`.")
W("- **Problem:** `WebExtensionAPITest.idl` is a WebKit-internal test harness. It")
W("  produces a `test` namespace in a public type package, advertising an API that")
W("  extension authors must not use.")
W("- **Note:** BCD reports no Safari support for `test`, which corroborates this.")
W("- **Acceptance:** no `test` namespace in `index.d.ts`; the IDL is either excluded")
W("  or explicitly filtered.")
W("")

W("### SWT-003. Verify the six namespaces BCD disputes")
W("")
W("- **Problem:** the IDL produces `bookmarks`, `notifications`, `offscreen`,")
W("  `sidePanel`, `sidebarAction`, `test`, but BCD reports no Safari support for any")
W("  of them.")
W("- **Action:** check each in a real Safari build. Each resolves to one of: a BCD")
W("  bug to file at mdn/browser-compat-data, a WebKit IDL that describes an")
W("  unshipped API, or a genuine gap in BCD coverage.")
W("- **Acceptance:** each of the six classified, with evidence. See BCD-* items.")
W("")

W("### SWT-004. Explain the three namespaces BCD has that the IDL does not")
W("")
W("- **Problem:** BCD reports Safari support for `browserAction`, `pageAction` and")
W("  `extensionTypes`, none of which exist as WebKit interfaces.")
W("- **Partly explained:** `browserAction` and `pageAction` are aliased to `action`")
W("  in the generated `chrome` namespace, so they exist at runtime.")
W("- **Unexplained:** `extensionTypes`. Determine where Safari's `extensionTypes`")
W("  surface comes from, since it is not in the Interfaces directory.")
W("- **Acceptance:** written explanation for all three.")
W("")

W("### SWT-005. Add a regression test pinning generator output")
W("")
W("- **Problem:** CI runs `npm run build` but does not assert that the regenerated")
W("  `index.d.ts` matches the committed one, so drift between the committed file and")
W("  upstream WebKit can go unnoticed.")
W("- **Fix:** after `npm run build`, fail if `git diff --exit-code index.d.ts` is dirty.")
W("- **Acceptance:** CI fails when committed output is stale.")
W("- **Note:** verified today that committed output IS current (md5")
W("  `66cd9244686a64365214b8e0b817deb7`, identical from main and from `--pr 71593`).")
W("")

W("### SWT-006. Publish decision")
W("")
W("- **Problem:** `package.json` is at version `0.1.0` and the package is not on npm.")
W("  `webext-meta-types` will need to consume it somehow.")
W("- **Options:** publish to npm, consume as a git dependency, or vendor the")
W("  generated `index.d.ts` into `webext-meta-types`.")
W("- **Blocks:** INT-030.")
W("- **Acceptance:** decision made and dependency wired.")
W("")
W("### SWT-007. `cookies.remove()` result is typed as `Cookie`, upstream says otherwise")
W("")
W("- **Found:** 2026-09-02 by the CAN-002 derivation, which refused to merge the")
W("  result slot because Safari alone puts `Cookie` there.")
W("- **Evidence:** `safari-webextension-types` `index.d.ts:722-723` resolve `remove()`")
W("  to `browser.Cookie | null`. chrome-types `index.d.ts:4183` resolves it to")
W("  `{ url, name, storeId, partitionKey? }`; Firefox `index.d.ts:1997` to")
W("  `_RemoveReturnDetails` (`:1930`, the same record plus `firstPartyDomain`).")
W("  `WebExtensionAPICookies.idl:85` declares no result type at all, so the")
W("  `Cookie` is the generator's choice, not WebKit's.")
W("- **Fix:** find where the Safari generator assigns the result type for `remove`")
W("  and check WebKit's implementation for what it actually resolves with; the")
W("  IDL cannot settle it. Until then the meta package carries a curated")
W("  `distinct` verdict in `canonical-names-curated.json`.")
W("- **Acceptance:** the Safari package resolves `remove()` to what WebKit returns,")
W("  with the WebKit source cited, and the curated verdict is deleted.")
W("")
W("### SWT-008. Never claim Safari ships what only WebKit tip has")
W("")
W("- **Decided 2026-09-02.** The Safari types are generated from a WebKit commit")
W("  (today `0136fa2b`, 2026-08-15, in `provenance.json`). Safari ships from a")
W("  branch cut earlier, so every `@supported Safari` is a claim about tip until")
W("  proven otherwise. The bar Patrick set: a claim must hold in the current")
W("  Safari Technology Preview or an older shipping Safari. Nothing newer.")
W("- **Gate, layer 1 (necessary, not sufficient):** record the WebKit commit the")
W("  current Technology Preview was cut from as `stp_ref` in `provenance.json`,")
W("  with the release-notes URL that states it, and fail generation when the")
W("  generation ref is not an ancestor of it (`git merge-base --is-ancestor")
W("  <ref> <stp_ref>`). Bumping the ref means bumping `stp_ref` first. This")
W("  only proves the code was in the tree Safari was built from.")
W("- **Confirmed 2026-09-02:** the release notes state the range. Technology")
W("  Preview 250 (webkit.org/blog/18191, 2026-08-13) says \"This release includes")
W("  WebKit changes between: 317507@main…317934@main\". An identifier resolves")
W("  locally with `git log --grep 'Canonical link: https://commits.webkit.org/317934@main'`,")
W("  giving `41655c48` (2026-07-26), and commits.webkit.org redirects to the same")
W("  hash. The `WebKit-7624.*` tags and `safari-7624.*-branch` branches carry no")
W("  marketing version and are not needed.")
W("- **Finding:** `git merge-base --is-ancestor 0136fa2b 41655c48` exits 1. The")
W("  current generation ref is twenty days NEWER than Technology Preview 250's")
W("  upper bound, so today's Safari types claim WebKit tip, not any Safari.")
W("- **Regenerating at `41655c48` is not a knob.** `generate.py` pins")
W("  `KNOWN_IDL_FILES` (line 48) and re-verifies 485 `Cite(...)` quotes against")
W("  the exact source at the ref; at `41655c48` it refuses on")
W("  `WebExtensionAPIOffscreen.idl` (added `1d214176`, 2026-08-07), and with the")
W("  offscreen tables trimmed it fails on citations into files moved in the")
W("  window (55 files changed under `WebProcess/Extensions`). So the package's")
W("  ref must BE the Technology Preview commit, and each preview bump is an")
W("  editorial re-verification, not a flag. Confirmed over-claim today: the")
W("  whole `offscreen` namespace (`index.d.ts:147`, `:363`, `:811-818`, `:1105`),")
W("  which no Safari build has and only the meta package's exclusion hides.")
W("- **Gate, layer 2 (gating after the cut), enumerated 2026-09-02 at `41655c48`:**")
W("  a namespace in source is exposed only if `isPropertyAllowed`")
W("  (`WebExtensionAPINamespaceCocoa.mm:47-108`) and the build allow it.")
W("  Mechanically derivable: `sidebarAction`, `sidePanel`, `bookmarks` are")
W("  compiled out (`PlatformEnableCocoa.h:1085-1091` defines their macros as")
W("  `0 &&`, preferences default false); `notifications` and `test` exist only")
W("  in testing mode (`:78-84`, `:102-103`); `devtools` is Mac only")
W("  (`INSPECTOR_EXTENSIONS`, `PlatformEnableCocoa.h:439-441`); everything")
W("  else is a manifest permission check, which is not a support claim.")
W("  `offscreen` is absent from the tree entirely at that commit; it arrived")
W("  between 2026-07-26 and 2026-08-15, and only `excluded-namespaces.json`")
W("  keeps it out of the output today.")
W("- **What source cannot resolve:** an Apple-internal build setting behind an")
W("  `#if !defined` macro, testing mode in a shipped Safari, and the per-context")
W("  deny list `m_unsupportedAPIs` (`WebExtensionAPINamespaceCocoa.mm:50`),")
W("  filled from outside the tree. The first two can only make Safari expose")
W("  MORE than source says; the deny list is the one thing that can make it")
W("  expose less. So: source-off means excluded, which can only under-claim;")
W("  the runtime probe exists to bound the deny list, nothing else.")
W("- **Work:** `derive-excluded-namespaces.ts` reads `isPropertyAllowed`, the")
W("  macro definitions and the preference defaults at `stp_ref` and emits")
W("  `excluded-namespaces.json` in its existing cited style, replacing the")
W("  hand-curated file, with `--verify` like `derive-unsupported.ts`.")
W("- **Second opinion, cheap:** extend `audit:bcd` to compare BCD's per-member")
W("  `version_added` for `safari` and `safari_ios` against the emitted claims;")
W("  it already flags seven disagreements, six in `devtools.inspectedWindow`.")
W("- **Runtime probe, now a RELEASE GATE (Patrick, 2026-09-02 evening):** v1.1.2")
W("  does not ship until `@supported Safari` claims are checked against a")
W("  running Safari Technology Preview on the Mac mini (Safari 26.4, Xcode")
W("  26.6, the extension converter, safaridriver). A converted extension's")
W("  background script enumerates `browser.*` (namespaces, member types, events)")
W("  and writes JSON to an extension page safaridriver reads; the diff against")
W("  dist/index.d.ts is the audit. What it can observe: presence. What it")
W("  cannot: parameter shapes and optionality; those stay source claims and")
W("  the notes say so. Findings become cited `excluded-namespaces.json` entries.")
W("- **Acceptance:** generation refuses a ref newer than the recorded")
W("  Technology Preview commit; `excluded-namespaces.json` is derived, not")
W("  written, and `--verify` passes; the BCD audit reports version")
W("  disagreements; the probe's deny-list findings, if any, are cited entries.")
W("")
W("### SWT-009. Safari's package must not emit what WebKit hides under MV3")
W("")
W("- **Found 2026-09-02** by the runtime audit on the Mac mini (Safari 26.4 and")
W("  a Technology Preview build): 26 members the meta package tagged Safari")
W("  are unreachable from any Manifest V3 extension. WebKit gates them by")
W("  manifest version: `browserAction` and `pageAction` in")
W("  `WebExtensionAPINamespace.cpp:90-91` and `:109-110`")
W("  (`!supportsManifestVersion(3) && doesDictionaryExist(...)`), the")
W("  `removedInManifestVersion3` set of `tabs.executeScript`, `getSelected`,")
W("  `insertCSS`, `removeCSS` in `WebExtensionAPITabsCocoa.mm:577-579`, and")
W("  `extension.getURL` in `WebExtensionAPIExtensionCocoa.mm:91-92`, all at the")
W("  package's generation ref `0136fa2b`.")
W("- **How they reach dist:** 21 through `applyNamespaceAliases` copying `action`")
W("  onto `browserAction`/`pageAction` because the Safari package aliases them")
W("  (`index.d.ts:1104`, `:1109`); 5 as direct Safari declarations. The Safari")
W("  package carries no manifest-version signal anywhere.")
W("- **Ruled (Patrick, 2026-09-02):** the fix lives upstream in")
W("  `safari-webextension-types`, whose generator reads the same three gates")
W("  and stops emitting MV2-only names; this repo then repins it. A finished")
W("  derived-exclusion implementation in this repo was discarded unmerged: a")
W("  WebKit-versus-package delta belongs in the package, only cross-browser")
W("  reconciliation belongs here. `tabs.move` was already excluded here with a")
W("  citation; the audit's claim that it is new in the preview was wrong.")
W("- **Acceptance:** the repinned Safari package emits none of the 26; the meta")
W("  package's `dist/metadata.json` claims Safari for none of them; the union")
W("  ratchet drops by two (`browserAction.onClicked`, `pageAction.onClicked`).")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream F. Safari integration into webext-meta-types")
W("")
W("### What we are integrating")
W("")
W("| Metric | Value |")
W("|---|---|")
W(f"| total declarations | {safari['safari']['totalElements']} |")
W(f"| inside a namespace | {safari['safari']['namespacedElements']} |")
W(f"| at the top level of `browser` | {safari['safari']['topLevelElements']} |")
W(f"| namespaces | {safari['safari']['namespaceCount']} |")
W(f"| `any` occurrences | {safari['safari']['anyCount']} |")
W(f"| Promise signatures | {safari['safari']['promiseSignatures']} |")
W(f"| callback signatures | {safari['safari']['callbackSignatures']} |")
W("")
W(f"Namespaces shared with Chrome/Firefox: {len(safari['namespaceComparison']['sharedWithChromeFirefox'])}. ")
W(f"Safari-only: {', '.join(safari['namespaceComparison']['safariOnly']) or 'none'} ")
W("(and `test` should be dropped per SWT-002, leaving zero).")
W(f"Present in Chrome/Firefox but not Safari: {len(safari['namespaceComparison']['presentInChromeFirefoxButNotSafari'])}.")
W("")
W("So Safari adds almost no new API surface. It adds availability information and")
W("a third set of signatures to reconcile.")
W("")

W("### The pairwise-to-N-ary problem")
W("")
W("Every merge path in `src/generator.ts` assumes exactly two browsers:")
W("")
W("| Symbol | Occurrences in `src/generator.ts` |")
W("|---|---|")
W("| `chromeSource` | 32 |")
W("| `firefoxSource` | 27 |")
W("| `overrideChrome` / `overrideFirefox` | 16 / 16 |")
W("| `isChromeOnly` / `isFirefoxOnly` | 8 / 8 |")
W("| `chromeTypeParamsCount` / `firefoxTypeParamsCount` | 7 / 7 |")
W("| `\"chrome\"` / `\"firefox\"` string literals | 20 / 14 |")
W("| `Provenance` | 12 |")
W("")
W("45 lines directly touch `chromeSource`/`firefoxSource`. All five merge functions")
W("are written as `const c = ...; const f = ...;`.")
W("")

for item in [
    ("INT-001", "Change `Provenance` from a string union to a browser set",
     ["**File:** `src/generator.ts` line 415.",
      "**Today:** `export type Provenance = \"Chrome\" | \"Firefox\" | \"Chrome, Firefox\";`",
      "**Problem:** three browsers gives 7 non-empty combinations, four gives 15. A string union does not scale and every combination is a distinct literal.",
      "**Fix:** a `Set<BrowserId>` or a bitmask, plus a formatter that renders the display string.",
      "**Acceptance:** with only Chrome and Firefox loaded, `dist/index.d.ts` is byte-identical to today."]),
    ("INT-002", "Update `formatSupportComment()` for the new provenance type",
     ["**File:** `src/generator.ts` line 445.",
      "**Note:** the `@see <url>` path for real bug URLs must be preserved (HYG-003).",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-003", "Update `keptForTarget()` for N targets",
     ["**File:** `src/generator.ts` line 439.",
      "**Today:** hardcodes `target === \"chrome\" ? p === \"Chrome\" : p === \"Firefox\"`.",
      "**Fix:** membership test against the provenance set.",
      "**Acceptance:** `dist/chrome-only.d.ts` byte-identical."]),
    ("INT-004", "Update `MetaEntry` and `dist/metadata.json` shape",
     ["**File:** `src/generator.ts` lines 426 and the metadata block in `generate()`.",
      "**Today:** maps the three provenance literals to `[\"chrome\"]`, `[\"firefox\"]`, or both.",
      "**Fix:** emit the browser id list directly from the set.",
      "**Decision needed:** whether `metadata.json` gains a `safari_ios` qualifier here or in a separate field (see INT-034).",
      "**Acceptance:** byte-identical `metadata.json` with two browsers."]),
    ("INT-010", "Replace `IRElement`'s per-browser fields with a map",
     ["**File:** `src/generator.ts` line 18.",
      "**Today:** `chromeSource`, `firefoxSource`, `isChromeOnly`, `isFirefoxOnly`, `chromeTypeParamsCount`, `firefoxTypeParamsCount`.",
      "**Fix:** `sources: Map<BrowserId, string>` plus `typeParamsCount: Map<BrowserId, number>`; derive the `*Only` flags rather than storing them.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-011", "Convert `mergeInterface()` to an N-ary fold",
     ["**File:** `src/generator.ts` line 600.",
      "**Today:** `const c = parseInterface(el.chromeSource); const f = parseInterface(el.firefoxSource);`",
      "**Also affects:** `unionMember()`, `unionIndexSignature()`, `makeOptional()`, `stripOptionalMarker()`, all currently binary.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-012", "Convert `mergeTypeAlias()` to an N-ary fold",
     ["**File:** `src/generator.ts` line 735.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-013", "Convert `mergeVariable()` to an N-ary fold",
     ["**File:** `src/generator.ts` line 810.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-014", "Convert `mergeFunction()` to an N-ary fold",
     ["**File:** `src/generator.ts` line 858.",
      "**Risk:** highest of the five. Three-way overload sets with different async conventions (Safari ships both callback and Promise forms, Firefox is Promise-first) will multiply overload counts.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-015", "Convert `reconcileStructuralForms()` to N browsers",
     ["**File:** `src/generator.ts` line 924.",
      "**Note:** this is Decision 14's home and where INT-020 will land.",
      "**Acceptance:** byte-identical output with two browsers."]),
    ("INT-016", "Extend the patch schema with `overrideSafari`",
     ["**File:** `src/generator.ts` `validatePatch()` line 107 and `applyPatches()` line 325.",
      "**Note:** `overrideShared` already exists and fans out to both browsers; decide whether it should now fan out to all three, which silently changes the meaning of every existing patch that uses it. Audit those first.",
      "**Acceptance:** schema accepts `overrideSafari`; existing patches behave unchanged."]),
    ("INT-020", "Reconcile Safari's interface-plus-instance devtools shape",
     ["**Problem:** Safari emits `interface InspectedWindow { ... }` plus `const inspectedWindow: InspectedWindow`, in two merged `namespace devtools` blocks. Chrome and Firefox use real sub-namespaces (`devtools.inspectedWindow.eval()`).",
      "**Consumer impact:** call syntax is identical, declarations are not mergeable as written.",
      "**Affects:** `devtools.inspectedWindow`, `devtools.network`, `devtools.panels`.",
      "**Fix:** extend `reconcileStructuralForms()` to normalize the instance-of-interface form into a namespace form.",
      "**Acceptance:** the three devtools sub-APIs merge without a `MergeIssue`."]),
    ("INT-021", "Decide the canonical event wrapper type",
     ["**Problem:** Safari declares `Event<T extends (...args: never[]) => void>`. Our preamble uses `(...args: any[]) => any` for both `CustomChromeEvent` and `WebExtEvent`, with a TODO recording that TypeScript's contravariance rule (TS2344) forces `any[]`.",
      "**`never[]` and `any[]` are opposite ends of that variance**, so a naive union of three event wrappers will not typecheck.",
      "**File:** `src/preamble.ts`, plus `canonicalizeSignature()` which already rewrites `events.Event<` and `WebExtEvent<` to a common `Event<`.",
      "**Acceptance:** a documented decision and a type test proving all three forms assign."]),
    ("INT-022", "Add the widening guard for weakly typed Safari parameters",
     ["**Problem:** Safari contributes 88 `Record<string, unknown>` occurrences, covering the 104 operations in workstream D. Without a guard, merging can widen a precise Chrome or Firefox parameter to `Record<string, unknown>`.",
      "**Rule:** a Safari `Record<string, unknown>` or bare `unknown` parameter never widens a precise type from another browser. It contributes availability information only.",
      "**This rule is needed permanently**, not just until workstream D lands, because Safari will always have weakly typed corners.",
      "**Acceptance:** a unit test asserting that merging a precise Chrome parameter with a Safari `Record<string, unknown>` yields the precise type."]),
    ("INT-023", "Decide how Safari's own namespace aliases interact with Decision 20",
     ["**Problem:** Safari's package aliases `contextMenus` to `menus`, and both `browserAction` and `pageAction` to `action` (safari-webextension-types `index.d.ts:1090-1117`). Decision 20 emits one canonical set under `chrome` and aliases `browser` to it.",
      "**Facts (2026-09-02):** chrome-types declares only `contextMenus` (`index.d.ts:3356`); `chrome.menus` is undefined in Chrome. Firefox declares `menus` (`:7903`) and `contextMenus` (`:7624`) as identical 24-name namespaces, and its `chrome.*` is an alias of `browser.*`. BCD has one entry, `webextensions.api.menus`, with `contextMenus` as `alternative_name` for Chrome and Safari. dist emits five full namespaces; `contextMenus.create` already carries `CreateProperties` (Chrome) beside `menus.MenuItemProperties` (Firefox, Safari).",
      "**Ruled (Patrick, 2026-09-02):** a namespace is never aliased in the output unless every browser exposes both names at runtime. Aliasing `menus` to `contextMenus` would let `chrome.menus.create()` typecheck as supported everywhere and throw in Chrome, the one failure this package exists to prevent. `browser = chrome` is different: both objects exist in all three browsers. So `menus`, `browserAction` and `pageAction` stay separate namespaces with their own `@supported`.",
      "**Naming is a separate axis.** One name per concept is chosen ACROSS the alias group, Chrome public name first (CAN-001), so `menus` declares `CreateProperties` with its own Firefox, Safari tag. Alias groups are derived from Safari's `export import` lines, not curated: {`contextMenus`, `menus`}, {`action`, `browserAction`, `pageAction`}.",
      "**Work:** `derive-names.ts` gains alias-group scoping for name selection; the `menus` `defer` verdict is removed; Decision 20's comment in `src/generator.ts` gains the runtime-availability condition.",
      "**Acceptance:** `menus` and `contextMenus` share every concept's name; `@supported` on `menus` never names Chrome; `verify:names` passes."]),
    ("INT-030", "Ingest safari-webextension-types into the IR",
     ["**Depends on:** INT-016, INT-R-*, SWT-006.",
      "**File:** `src/generator.ts` `generate()` line 1126.",
      "**Note:** Safari's file declares `declare namespace browser` and a separate `declare namespace chrome` alias block. `parseSource()` already special-cases a `browser` module for Firefox; verify that path works for Safari's shape or add a third branch.",
      "**Acceptance:** Safari elements present in the IR with correct namespaces."]),
    ("INT-031", "Add `safari` to the coverage manifest",
     ["**Files:** `shared/coverage-types.ts` (`CoverageElement`, `CoverageNamespace` have literal `chrome: boolean; firefox: boolean`), `scripts/generate-coverage.ts`, and the regenerated 236KB `coverage.json`.",
      "**Acceptance:** coverage carries per-browser booleans for three browsers."]),
    ("INT-032", "Add `safari` and `safari_ios` to the BCD audit",
     ["**File:** `scripts/audit-bcd.ts`, which hardcodes `support.chrome` and `support.firefox` in four conflict checks.",
      "**Acceptance:** `BCD-DISCREPANCIES.md` reports Safari conflicts too."]),
    ("INT-033", "Add Safari build targets",
     ["**File:** `src/generator.ts` `generate()`; today it emits `dist/index.d.ts` and `dist/chrome-only.d.ts`.",
      "**Fix:** add `dist/safari-only.d.ts`, and consider `dist/firefox-only.d.ts` for symmetry since the target-pruning code already supports it.",
      "**Acceptance:** target-pruned builds exist and typecheck."]),
    ("INT-034", "Model Safari iOS as a modifier, not a browser column",
     ["**Evidence:** BCD shows Safari supports 22 namespaces and Safari iOS 20, differing only in `devtools` and `menus`. At member granularity: 228 versus 210, with just 18 members diverging.",
      "**The 18:** `devtools.inspectedWindow`, `devtools.network`, `devtools.panels`, `menus.ACTION_MENU_TOP_LEVEL_LIMIT`, `menus.ContextType`, `menus.ItemType`, `menus.OnClickData`, `menus.create`, `menus.onClicked`, `menus.remove`, `menus.removeAll`, `menus.update`, `tabs.MutedInfo`, `windows.WindowState`, `windows.create`, `windows.onRemoved`, `windows.remove`, `windows.update`. All are macOS-only.",
      "**Rationale:** 18 exceptions do not justify doubling the provenance space from 7 to 15, and the WebIDL carries no iOS information at all, so an iOS column would be sourced entirely from BCD anyway.",
      "**Fix:** an iOS exclusion list sourced from BCD, surfaced in `metadata.json` and as an `@supported` note.",
      "**Acceptance:** the 18 members carry an explicit macOS-only marker."]),
    ("INT-035", "Regenerate the type tests for three browsers",
     ["**Files:** `tests/index.test-d.ts` (3693 lines) and `type-tests/index.test-d.ts` (2265 lines), both generated one assertion pair per element.",
      "**Question:** does a third browser mean a third assertion per element, or does Decision 20's single canonical set keep it at two? Decision 20 says every element is reachable from both `chrome` and `browser`, which suggests two remains correct.",
      "**Acceptance:** `npm run test` (tsd) passes."]),
    ("INT-036", "Update the unit tests, including the Decision 16 convergence invariant",
     ["**File:** `test/generator.test.ts`, 346 lines, 39 tests.",
      "**Specific problem:** the 'Convergence CI Invariant (Decision 16)' suite asserts substantial `@supported Chrome, Firefox` convergence (more than 100). Adding Safari changes many of those annotations to three-browser strings, so the assertion will need to count differently.",
      "**Acceptance:** all tests pass and the convergence invariant still means something."]),
    ("INT-037", "Carry the release channel into the emitted support annotation",
     ["**Problem:** chrome-types marks six namespaces `@chrome-channel dev` on their own doc block (`dns`, `processes`, `sockets.tcp`, `sockets.tcpServer`, `sockets.udp`, `system.network`; BCD records `dns` as Chrome `preview`). The emitted output tags every member of them `@supported Chrome` with no qualifier, so a reader sees Chrome support asserted for an API Chrome does not ship to stable, next to CAN-001, which says exactly that Chrome does not ship it.",
      "**Fix:** read the tag where `derive-names.ts` already reads it and emit it on the `@note` line (`@note Chrome: dev channel only`), or decide that a dev-channel API is not support and exclude it like an unsupported member. Either way the output and the naming rule must agree.",
      "**Ruled (Patrick, 2026-09-02):** keep the tag and add the channel note, derived from the chrome-types tag, never listed by hand: `@note Chrome: dev channel only` on the namespace and every member, plus a channel field in `metadata.json`. Rule 9 does not decide it (a running Chrome Dev exposes these); CAN-001 uses stable as the bar for naming votes only. Marked as a WECG discussion item: whether a cross-browser type set should carry channel-gated APIs at all is a question for the group, not this package.",
      "**Acceptance:** no member of a dev-channel namespace claims Chrome support without saying which channel; a unit test pins it."]),
]:
    ident, title, bullets = item
    W(f"### {ident}. {title}")
    W("")
    for b in bullets:
        W(f"- {b}")
    W("")

W(f"### INT-R-*. Relocation map: {len(safari['topLevelRelocations'])} top-level Safari declarations")
W("")
W("WebKit's IDL declares dictionaries at file scope, so the generator emits them at")
W("the top level of `browser` (`browser.Cookie`, `browser.Tab`). Chrome and Firefox")
W("nest them (`cookies.Cookie`, `tabs.Tab`). Every one needs a target namespace.")
W("")
W("**The automatic column below is a draft, not an answer.** It is a name match")
W("against the Chrome and Firefox IR. At least one is known wrong: `MessageOptions`")
W("matches `systemLog` by name but comes from `WebExtensionAPIRuntime.idl` and")
W("belongs in `runtime`. Review every row against the source IDL file.")
W("")
W("| ID | Safari declaration | Kind | Suggested target | Verdict |")
W("|---|---|---|---|---|")
for i, r in enumerate(sorted(safari["topLevelRelocations"], key=lambda x: x["name"]), 1):
    tgt = ""
    m = re.search(r"relocate to `(\w+)`", r["verdict"])
    if m:
        tgt = "`" + m.group(1) + "`"
    elif r["verdict"].startswith("ambiguous"):
        tgt = "**decide**"
    else:
        tgt = "**manual**"
    W(f"| INT-R-{i:03d} | `{r['name']}` | {r['kind']} | {tgt} | {esc(r['verdict'])} |")
W("")
W("Breakdown: 21 relocate unambiguously, 3 are ambiguous and need a decision, 49 are")
W("Safari-only names that are prefixed flattenings of names the other browsers nest.")
W("")
W("The 49 follow a regular pattern that can seed the map but must not be trusted")
W("blindly:")
W("")
W("| Safari flat name | Almost certainly | ")
W("|---|---|")
for a, b in [("ActionSetIconDetails", "action.SetIconDetails"),
             ("ActionSetTitleDetails", "action.SetTitleDetails"),
             ("DNRMatchedRule", "declarativeNetRequest.MatchedRule"),
             ("DNRUpdateRuleOptions", "declarativeNetRequest.UpdateRuleOptions"),
             ("WebRequestFilter", "webRequest.RequestFilter"),
             ("TabCreateProperties", "tabs.CreateProperties"),
             ("WindowCreateData", "windows.CreateData"),
             ("MenuItemProperties", "menus.CreateProperties"),
             ("SendMessageOptions", "runtime.SendMessageOptions"),
             ("DevToolsEvalOptions", "devtools.inspectedWindow.EvalOptions"),
             ("SidebarActionSetIconDetails", "sidebarAction.SetIconDetails"),
             ("OffscreenCreateParameters", "offscreen.CreateParameters")]:
    W(f"| `{a}` | `{b}` |")
W("")
W("**The three ambiguous ones need your decision:**")
W("")
W("- `InjectionResult`: declared in `scripting` and `userScripts` elsewhere.")
W("- `RegisteredContentScript`: declared in `scripting` and `contentScripts` elsewhere.")
W("- `WindowType`: declared in `tabs` and `windows` elsewhere.")
W("")

# =====================================================================

# =====================================================================
W("---")
W("")
W("## Workstream I. Guardrails and project setup")
W("")
W("**This is the highest-priority workstream.** Three separate audits in this")
W("project produced confidently-presented wrong answers, and none of the existing")
W("checks could have caught any of them. The reason is structural:")
W("")
W("- `tests/index.test-d.ts` (3693 lines) and `type-tests/index.test-d.ts` (2265")
W("  lines) are GENERATED by `src/generator.ts` from the generator's own output,")
W("  and every assertion has the form `declare let x: chrome.ns.El;`. They assert")
W("  that a type exists and the file compiles. They are tautological and cannot")
W("  fail on a wrong type, a fabricated member, or a degraded signature.")
W("- `enforce-zero-any.ts` greps for `AnyKeyword`.")
W("- `test/generator.test.ts` covers generator mechanics, not type correctness.")
W("")
W("So the entire quality gate is \"does our output compile\", and everything else")
W("was left to human reading. Reading is exactly what failed. Every item below is")
W("designed to be capable of failing.")
W("")

W("### GRD-001. Require evidence on every patch")
W("")
W("- **Files:** `src/generator.ts` `validatePatch()` (line 107), all `patches/*.json`.")
W("- **Problem:** a patch can assert anything with no citation. Three members we")
W("  assert (`isInternal` on `documentScan.ScannerOption` and")
W("  `system.display.DisplayUnitInfo`, `activationmessage`/`keyboard` on")
W("  `chrome_url_overrides.UrlOverrideInfo`, `hasAccelerometerSupport` on")
W("  `system.display.DisplayUnitInfo`) appear in ZERO ground-truth sources:")
W("  not `chrome-types/index.d.ts`, not `_all.d.ts`, not the Firefox types, not")
W("  anywhere in BCD.")
W("- **Fix:** add required fields `reason` (`upstream-defect` | `convergence` |")
W("  `naming` | `enhancement`) and `evidence` (upstream `file:line`, a BCD path, or")
W("  a spec URL). `validatePatch` rejects a patch missing either.")
W("- **Also:** emit `@note Upstream type inaccuracy patched` ONLY for")
W("  `reason: upstream-defect`. Today all 200 patches emit it, including the 64")
W("  that change no type at all.")
W("- **Acceptance:** the build fails on a patch with no evidence; shipped output no")
W("  longer asserts upstream defects for convergence patches.")
W("")

W("### GRD-002. BCD attestation gate")
W("")
W("- **New script:** `scripts/verify-patch-attestation.ts`.")
W("- **Problem:** nothing checks that a member a patch ADDS actually exists.")
W("- **Fix:** for every member a patch introduces, assert BCD records it for that")
W("  browser. A member absent from BCD requires an explicit waiver carrying a")
W("  source URL.")
W("- **Catches:** the fabricated-member class in GRD-001 outright.")
W("- **Acceptance:** run over today's corpus, every unattested member is either")
W("  evidenced or removed.")
W("")

W("### GRD-003. Non-degradation gate")
W("")
W("- **New script:** `scripts/verify-no-degradation.ts`.")
W("- **Problem:** the highest-severity finding of the adversarial review is that")
W(f"  **{len(REGRESSIONS)} patches make the shipped types WORSE than upstream** by")
W("  deleting real members, flattening precise named types, or narrowing so that")
W("  legal calls are rejected. Nothing detects this.")
W("- **Fix:** a patch may not remove a member upstream declares, replace a named")
W("  type with a looser one, or narrow a parameter, without an explicit waiver")
W("  naming the evidence.")
W("- **Acceptance:** the gate flags all of workstream J and passes once each is")
W("  fixed or waived.")
W("")

W("### GRD-004. Patch necessity (DONE)")
W("")
W("- **Script:** `scripts/verify-patch-necessity.ts`, `npm run verify:patches`.")
W("- Removes each override, regenerates, compares. 9 seconds for all 298.")
W("- **Remaining:** HYG-008 wires it into `npm run check` once the 21 inert")
W("  overrides are approved for deletion.")
W("")

W("### GRD-005. Read the whole upstream surface")
W("")
W("- **File:** `src/generator.ts` `generate()` line ~1127.")
W("- **Problem:** we load only `node_modules/chrome-types/index.d.ts`. The package")
W("  also ships `_all.d.ts`, the MV2-inclusive bundle. `tabs.executeScript` is")
W("  declared there (18 occurrences) and absent from `index.d.ts`, which is the")
W("  MV3-only surface. Every `missing-from-upstream` verdict this project produced")
W("  was measured against a partial view of upstream.")
W("- **Fix:** either parse both and record which surface each declaration came")
W("  from, or make the MV3-only choice explicit, asserted in code with a comment,")
W("  rather than implicit in a path string.")
W("- **Acceptance:** a test asserts which upstream files are loaded and why.")
W("")

W("### GRD-006. Upstream freshness gate")
W("")
W("- **New script:** `scripts/verify-upstream-freshness.ts`.")
W("- **Problem:** `@types/firefox-webext-browser` is pinned at **143.0.0** while BCD")
W("  records members shipping through Firefox 153. About 20 of the confirmed")
W("  findings are that one staleness, not 20 defects. Conversely")
W("  `geckoProfiler.ProfilerFeature` shows the reverse error: our patch matched")
W("  Firefox tip while upstream correctly matched the pinned 143, so our patch")
W("  silently removed `cpu`, which is valid at 143.")
W("- **Fix:** compare the pinned version against BCD's newest recorded version and")
W("  fail beyond a threshold. Record the pinned baseline where patches can see it,")
W("  so a patch cannot silently encode a newer or older reality.")
W("- **Acceptance:** the gate fails today and passes after a version bump.")
W("")

W("### GRD-007. Break the type-test circularity")
W("")
W("- **Files:** `tests/index.test-d.ts`, `type-tests/index.test-d.ts`, plus a new")
W("  hand-authored corpus.")
W("- **Problem:** both test files are generated from the IR, so they can never")
W("  disagree with the generator. This is why every review round passed.")
W("- **Fix:** add a conformance corpus of real extension code, written by hand,")
W("  that must typecheck, plus `expectError` cases asserting that wrong usage is")
W("  REJECTED. An `expectError` test is the only kind that can catch a type that")
W("  is too wide.")
W("- **Seed it with the failures we already know:** `i18n.getMessage` must accept a")
W("  boolean substitution; `omnibox.SuggestResult` must expose `deletable`;")
W("  `devtools.inspectedWindow.eval` must reflect Firefox's tuple resolution;")
W("  `processes.Process.type` must stay a `ProcessType` union, not `string`.")
W("- **Acceptance:** each seeded case fails before the corresponding workstream J")
W("  fix and passes after.")
W("")

W("### GRD-008. Label confidence in every generated document")
W("")
W("- **Problem:** the original bug inventory presented heuristic output with")
W("  per-item detail tables and severity labels, which read as verified findings.")
W("  Presentation quality tracked effort spent, not evidence held.")
W("- **Fix:** every generated report states its basis per item")
W("  (`empirical` | `reviewer` | `adjudicated` | `heuristic`).")
W("  `build-workplan.py` now refuses to run without")
W("  `verify-patch-necessity-results.json` and `corrected-bug-inventory.json`, so")
W("  this document cannot be regenerated from heuristics alone.")
W("- **Acceptance:** no document asserts a finding without naming how it was")
W("  established.")
W("")

W("### GRD-009. The Gecko pin must match the Firefox package, and something must check it")
W("")
W("- **Problem:** `excluded-members.json` (46 members Gecko marks unsupported) and")
W("  the lag verdicts are derived at `FIREFOX_143_0_RELEASE`, a constant in")
W("  `scripts/derive-unsupported.ts:22` and `scripts/derive-lag.ts:42`. That is")
W("  right for the pinned `@types/firefox-webext-browser@^143.0.0`, and it stays")
W("  at 143 forever unless someone remembers it. `--verify` exists but only")
W("  `npm run verify:sources` calls it, and nothing runs that: not `npm run")
W("  check`, not CI, not cron. When Firefox ships `notifications.update`, the")
W("  meta package keeps dropping it, silently.")
W("- **Fix:** one pinned tag, in one place, read by both scripts. A gate in")
W("  `npm run check` fails when the tag's major differs from the installed")
W("  Firefox package's major. A written bump procedure: bump the package, bump")
W("  the tag, rerun `derive:unsupported` and `derive:lag`, commit all three")
W("  together.")
W("- **Acceptance:** bumping the package alone makes `npm run check` fail with a")
W("  message naming the tag to change.")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream J. Repo regressions: patches that make our types worse")
W("")
W(f"**{len(REGRESSIONS)} patches ship types LESS correct than the upstream")
W("declaration they replace.** These are defects in this repository and should be")
W("fixed before any upstream filing. Found by the adversarial review; see")
W("`corrected-bug-inventory.json`.")
W("")
W("| ID | API | Browser | What the patch does wrong |")
W("|---|---|---|---|")
for i, r in enumerate(sorted(REGRESSIONS, key=lambda x: (x["browser"], x["api"])), 1):
    W(f"| REG-{i:03d} | `{r['api']}` | {r['browser']} | {esc(r['reason'])} |")
W("")
W("Each needs one of: revert the patch, narrow it to the part that is genuinely")
W("correct, or keep it with a `reason: convergence` label and a waiver explaining")
W("why the loss is acceptable for the merged surface.")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream K. Retracted claims")
W("")
W(f"**{len(RETRACTED)} of the original 181 claimed upstream bugs did not survive")
W("review.** They are listed in full in `corrected-bug-inventory.json`. Summarized by why:")
W("")
_modes = collections.Counter(r["failure_mode"] for r in RETRACTED)
W("| Failure mode | Count |")
W("|---|---|")
for k, n in _modes.most_common():
    W(f"| {k} | {n} |")
W("")
W("The largest single mode is **convergence work labelled as an upstream defect**:")
W("the patch exists so Chrome's and Firefox's equivalent declarations collapse into")
W("one type, not because either browser's types are wrong. GRD-001 stops this at")
W("the schema level.")
W("")
W("No action is required on these beyond relabelling, which GRD-001 covers. They")
W("must NOT be filed upstream.")
W("")

W("---")
W("")
W("## Workstream G. Naming and normalization decisions")
W("")
W(f"{len(naming)} patch/browser pairs are not upstream defects but do encode a")
W("decision we have made implicitly. Each needs an explicit position, because they")
W("shape the public API surface and will be scrutinized in a standards context.")
W("")
bynam = collections.OrderedDict()
for f in naming:
    bynam.setdefault(f["primary"], []).append(f)
nam_n = 0
for c, rows in bynam.items():
    W(f"### {c} ({len(rows)})")
    W("")
    if c == "private-type-reference":
        W("Upstream routes an event payload through a generated `_`-prefixed type and our")
        W("override inlines the shape. Question: do we inline these, or re-export them")
        W("under public names? Inlining loses a nameable type for consumers.")
    elif c == "possible-rename":
        W("Upstream declares the same concept under a different name. Question: do we adopt")
        W("the upstream name, or keep ours and document the mapping? Verified example:")
        W("`notifications.CreateNotificationOptions` (ours) versus")
        W("`notifications.NotificationOptions` (chrome-types line 15212).")
    elif c == "synthetic-name":
        W("Names we invented with a leading underscore. Question: should the public package")
        W("expose underscore-prefixed types at all?")
        W("")
        W("Measured 2026-09-02 against dist at 6300174: 266 underscore-prefixed public")
        W("type names. 264 are Firefox's generated names for inline shapes where Firefox")
        W("is the only browser contributing a name, so CAN-002 has no candidate and no")
        W("row for them; 111 of those must be typed by a consumer to call an API")
        W("(`bookmarks.move` takes `_MoveDestination`). The other two are chrome-types's")
        W("own `_eval` re-export and stay. Rule test: keeping them is killed by CAN-001")
        W("(a `_` name is never public); de-prefixing by rule (drop the underscore when")
        W("no other browser names the concept, collision unresolved) and inlining both")
        W("survive. Ruled by Patrick the same day: DE-PREFIX. When no browser")
        W("contributes a public name to a concept, the Firefox name drops its leading")
        W("underscore; a collision with a name already declared in that namespace is")
        W("unresolved, never guessed. Implemented as a fourth CAN-001 tier.")
        W("")
        W("The tier found eleven collisions, all Firefox declaring both a `_X` helper")
        W("and a public `X` in one namespace. Ruled the same day, with the")
        W("declarations quoted: a public alias whose whole body is a `_` name declared")
        W("in the same namespace by the same browser is COLLAPSED, the helper's body")
        W("moving under the public name and the helper dropped (five cases:")
        W("`_manifest.CommonDataCollectionPermission`, `OptionalPermissionNoPrompt`,")
        W("`PermissionPrivileged`, `contextMenus.ContextType`, `menus.ContextType`).")
        W("Only a bare alias qualifies. An array (`dns.ResolveFlags = _ResolveFlags[]`,")
        W("`webRequest.HttpHeaders`), a union containing the helper")
        W("(`_manifest.OptionalPermission`, `PermissionNoPrompt`) and a name-only")
        W("collision of two shapes (`_manifest.ThemeType`) stay as Firefox wrote them,")
        W("recorded as curated `distinct` with both lines cited. The eleventh,")
        W("`declarativeNetRequest._RuleActionType` versus Chrome's `RuleActionType`,")
        W("is one concept the slot rules must see before the de-prefix scan runs.")
    elif c == "namespace-not-in-upstream":
        W("`_manifest` is a Firefox-types construct (chrome-types mentions it only in two doc")
        W("comments) and `mimeHandlerPrivate` is a Chromium private API deliberately excluded")
        W("from chrome-types. Question: does the meta package expose either?")
    W("")
    W("| ID | API | Browser | Detail |")
    W("|---|---|---|---|")
    for f in rows:
        nam_n += 1
        W(f"| NAM-{nam_n:03d} | `{f['path']}` | {f['browser']} | {esc(f['detail'])[:160]} |")
    W("")

# =====================================================================
W("---")
W("")
W("## Workstream L. Canonical type names")
W("")
W("Decided 2026-09-02. The counts below were measured against `dist/index.d.ts`")
W("at 43cbb73 with a structural scan of the emitted declarations. CAN-002 replaces")
W("them with derived, checked-in numbers; until then they are dated, not live.")
W("")
W("### The problem")
W("")
W("The merger unifies declarations by exact name inside a namespace, and nothing")
W("ever compares two names. Safari types are relocated with their WebKit names")
W("intact, and Firefox's generated `_` names never meet Chrome's, so one concept")
W("ships under two or three names with a browser tag on each:")
W("")
W("| Concept | Chrome | Firefox | Safari |")
W("|---|---|---|---|")
W("| `action.getTitle` details | `TabDetails` | `Details` | `ActionDetails` |")
W("| `windows.getAll` options | `QueryOptions` | `_GetAllGetInfo` | `WindowQueryOptions` |")
W("| `cookies.get` details | `CookieDetails` | `_GetDetails` | `CookieDetails` |")
W("| `runtime.sendMessage` options | `_SendMessageOptions` | `_SendMessageOptions` | `MessageOptions` |")
W("")
W("| Measure | Count |")
W("|---|---|")
W("| Safari-only type declarations | 48 |")
W("| of which name a concept Chrome or Firefox already names | 46 |")
W("| same-namespace interfaces, byte-identical bodies, different names | 53 groups |")
W("| same member names, types or optionality differ | 24 more |")
W("| functions whose overloads take a differently named type per browser | 116 |")
W("| names that lose under CAN-001 | 69, referenced 77 times |")
W("")
W("Calls work, because the overloads union. Naming the type does not:")
W("`browser.action.TabDetails` is tagged Chrome, `Details` Firefox, `ActionDetails`")
W("Safari, while the concept is supported everywhere. Every `@supported` tag on a")
W("losing name is wrong.")
W("")
W("A matched name already does the right thing. `scripting.InjectionTarget` is")
W("contributed by all three browsers and emits one interface with per-member tags")
W("(`documentIds` is Chrome and Safari only). This workstream adds the name map.")
W("It adds no merge machinery.")
W("")
W("### CAN-001. Decision: one name per concept, ranked among the contributors")
W("")
W("- One public name per concept per namespace.")
W("- The name is chosen among the browsers that contribute a name to the concept")
W("  AND ship its namespace to stable, in this order: the Chrome public name, then")
W("  the Firefox public name, then Safari's name with its namespace prefix removed.")
W("  A `_` name is never public.")
W("- A browser that does not contribute has no vote. `action.setTitle` is an inline")
W("  literal in Chrome, so the group is Firefox and Safari; Firefox has only")
W("  `_SetTitleDetails`, and the name is `SetTitleDetails`.")
W("- A browser votes only with what it ships to stable. chrome-types marks six")
W("  namespaces `@chrome-channel dev` on their own doc block (`dns`, `processes`,")
W("  `sockets.tcp`, `sockets.tcpServer`, `sockets.udp`, `system.network`), and")
W("  BCD records `dns` as Chrome `preview`, Firefox 60. Chrome's names there still")
W("  merge; they do not win. Derived from the input by `derive-names.ts`, not")
W("  listed by hand. One group affected today: `dns.resolve` takes Firefox's")
W("  `DNSRecord`, not Chrome's `ResolveCallbackResolveInfo`. Ruled 2026-09-02.")
W("- Chrome first, where Chrome ships the namespace, because chrome-types names")
W("  come from the Chromium schema and match developer.chrome.com. That reason")
W("  does not hold for a dev-channel API, which is why the stable condition")
W("  exists. MDN rarely names an options type at all, and Firefox's `_` names")
W("  and WebKit's prefixes are generator artifacts.")
W("- Losing names are dropped, not aliased. The package is a prerelease, not on")
W("  npm, and the repo has no stars. This ships as a patch bump. It is NOT 2.0.0.")
W("")
W("### CAN-002. `scripts/derive-names.ts`")
W("")
W("- Same shape as `derive-relocations.ts`: rules tried in order, each citing a")
W("  slot, anything unresolved exits non-zero.")
W("- Two names are one concept when they occupy the same slot across browsers:")
W("  the same parameter of the same function (PARAMETER), the same function's")
W("  return (RETURN), or the same member of an already-matched interface (MEMBER).")
W("  Body equality is a cross-check and never a basis. `downloads.StringDelta` and")
W("  `BooleanDelta` share member names and are two types.")
W("- Output `canonical-names-derived.json`, one row per")
W("  `{namespace, browser, name, canonical, basis, citation, curatedVerdict}`,")
W("  checked in like the relocation map.")
W("- A name used in two roles is an error the map resolves by hand. Safari's")
W("  `ActionDetails` is the `getTitle` details AND the `openPopup` options. The")
W("  rename follows the declaration: it becomes `TabDetails`, and Safari's")
W("  `openPopup` overload takes `TabDetails`, which is what Safari accepts.")
W("- `menus` is deferred (a curated `defer` verdict) until INT-023 decides how")
W("  Safari's `contextMenus = menus` alias (index.d.ts:1097) shapes the canonical")
W("  set. Per namespace, the rule gives `contextMenus.CreateProperties` and")
W("  `menus.ItemProperties` for one concept, and that is not shipped.")
W("- **Acceptance:** PARAMETER alone reaches 34 groups on today's output. The")
W("  script prints every group and every unresolved case, and that list is")
W("  reviewed before CAN-003 starts.")
W("- Once the map exists, `build-workplan.py` drops every workstream G row whose")
W("  path it has a verdict for. Five of the ten possible-rename rows name a")
W("  concept with a second name in today's output; the other five are names a")
W("  patch invented where upstream inlines the shape, and they stay in G.")
W("")
W("### CAN-003. Apply the map in the generator")
W("")
W("- `parseSource()` renames the declaration per browser and rewrites that")
W("  browser's references with the same map, the way relocation already rewrites")
W("  `browser.X`. The merger then sees one name.")
W("- Runs after `reconcileStructuralForms()` and before patches.")
W("- A same-browser many-to-one (Firefox sends `_AddUrlDetails`, `_DeleteUrlDetails`")
W("  and `_GetVisitsDetails` to `UrlDetails`) is never refused: that browser's")
W("  declaration becomes the member-wise union, a member optional if optional in")
W("  any source, `extends` resolved first. The same trade the merger makes")
W("  between browsers, made within one. Ruled 2026-09-02; the alternative was a")
W("  curated split for history alone.")
W("- One split, ruled the same day after measurement: `userScripts`. The union")
W("  made Firefox's `js` optional in `firefox-only.d.ts` where `register()`")
W("  requires it (index.d.ts:5433), and the pruned file cannot restore what the")
W("  union folded away. Firefox's `_UpdateRegisteredUserScript` becomes the")
W("  public `UpdateRegisteredUserScript` for `update()` only, via a curated")
W("  `rename` verdict.")
W("- **Acceptance:** no losing name appears anywhere under `dist/`.")
W("")
W("### CAN-004. Re-key the patches that name a loser")
W("")
W("- Three patch entries are keyed on a name that loses: `runtime._SendMessageOptions`,")
W("  `tabs._SendMessageOptions`, `scripting._UpdateContentScriptsScripts`. Several")
W("  override texts reference one (`runtime.sendMessage`,")
W("  `browserAction.setBadgeTextColor`). The derived map is the authority on the")
W("  full list.")
W("- The nine `webNavigation`/`webRequest` `_On*Details` entries in subsystem-10")
W("  are Firefox-internal duplicates and are outside this workstream.")
W("- **Acceptance:** `npm run verify:patches` still reports every re-keyed entry")
W("  LOAD-BEARING. One that goes inert is deleted under rule 1.")
W("")
W("### CAN-005. `verify:names` gate")
W("")
W("- New script in `npm run check`. Fails when a slot carries two names among")
W("  its contributors, or when a name from the map's losing column appears")
W("  anywhere under `dist/`.")
W("- Drafted 2026-09-02. On the real tree its slot check found 14 second-order")
W("  collisions that exist only after first-order renames converge two")
W("  interfaces (`RuleCondition.domainType`: Chrome `DomainType`, Firefox")
W("  `_RuleConditionDomainType`). Five are curated verdicts the gate must")
W("  honour exactly as `deriveCanonicalNames` does; the other nine are all")
W("  Chrome public versus a Firefox `_` name, decided by CAN-001 with no")
W("  ruling needed. So `derive-names.ts` iterates to a fixpoint: apply the")
W("  renames, re-collect slots, derive again, until no new group appears.")
W("- Also asserts, per CLAUDE.md rule 9, that every `export namespace X` and")
W("  every `export import` alias in `dist/` carries only browsers whose")
W("  upstream declares X.")
W("- Proven able to fail by one injected synthetic duplicate, like every gate in")
W("  workstream I.")
W("")
W("### CAN-006. The union ratchet will move")
W("")
W("- Ten Safari pairs differ only in member type or optionality; merging them adds")
W("  union notes. Rule 7 applies: each new union is diagnosed in the canonicalizer")
W("  first. `union-note-baseline.json` is re-pinned only for unions proven to be")
W("  upstream's, and the commit that re-pins it lists them.")
W("")
W("### CAN-007. Hand verdicts known before the script runs")
W("")
W("- `permissions.Permissions` and `AnyPermissions`: Firefox distinguishes them on")
W("  purpose (`AnyPermissions` admits any string). Distinct.")
W("- Same-upstream duplicates (`fileSystemProvider.CopyEntryRequestedOptions` and")
W("  `MoveEntryRequestedOptions`, Firefox's `_On*ChangeInfo` triples): upstream's")
W("  own declarations, untouched.")
W("- `declarativeNetRequest.DNRUpdateRuleOptions` and `DNRTabUpdateOptions`: no")
W("  Safari function references either (WK-ORPHAN). Untouched here.")
W("- `scripting.CSSOrigin`: the relocation row's curated verdict says")
W("  `extensionTypes`, the derived namespace says `scripting`, and it ships beside")
W("  `extensionTypes.CSSOrigin`. That is an INT-R defect, fixed there, not a rename.")
W("")
W("### CAN-008. Release")
W("")
W("- Regenerate the tsd tests, bump the patch version, and generate the list of")
W("  dropped names from the map into the release notes.")
W("- **Gate (Patrick, 2026-09-02): before the squash to `main`, an adversarial")
W("  anti-slop review of the whole `main..local-dev` diff, done by the main")
W("  session itself, on code structure and tone. Findings cite file:line and")
W("  the tell; subagents implement the fixes as their own commit on `local-dev`")
W("  first, and the main session then reads the fixed tree again with fresh")
W("  eyes. If that read finds anything actionable the cycle repeats. It ends")
W("  only when a fresh read finds nothing; only then does the squash proceed.")
W("")

# =====================================================================
W("---")
W("")
W("## Workstream H. BCD discrepancies")
W("")
W("Each needs a runtime check in a real Safari build before filing anywhere. Do not")
W("file these from static analysis alone.")
W("")
W("| ID | Item | Discrepancy | Resolves to |")
W("|---|---|---|---|")
for i, (item, disc) in enumerate([
    ("`bookmarks`", "in WebKit IDL, BCD reports no Safari support"),
    ("`notifications`", "in WebKit IDL, BCD reports no Safari support"),
    ("`offscreen`", "in WebKit IDL, BCD reports no Safari support"),
    ("`sidePanel`", "in WebKit IDL, BCD reports no Safari support"),
    ("`sidebarAction`", "in WebKit IDL, BCD reports no Safari support"),
    ("`test`", "in WebKit IDL, BCD reports no Safari support"),
    ("`browserAction`", "BCD reports Safari support, no WebKit interface"),
    ("`pageAction`", "BCD reports Safari support, no WebKit interface"),
    ("`extensionTypes`", "BCD reports Safari support, no WebKit interface"),
], 1):
    resolves = ("alias of `action`, likely fine" if "Action" in item or "action" in item
                else "BCD bug, unshipped API, or BCD coverage gap")
    W(f"| BCD-{i:03d} | {item} | {disc} | {resolves} |")
W("")
W("Note that the existing `scripts/audit-bcd.ts` already produces")
W("`BCD-DISCREPANCIES.md` for Chrome and Firefox. That report has not been reviewed")
W("as part of this pass and is likely to contain a further backlog. Reviewing it is")
W("itself an open item.")
W("")

# =====================================================================
W("---")
W("")
W("## Open decisions, consolidated")
W("")
for i, (q, rec) in enumerate([
    ("Integrate Safari now with the INT-022 widening guard, or wait for workstream D to land in WebKit?",
     "Integrate now. The guard is needed permanently, the integration is not blocked on Apple's review queue, and every landed WebKit PR then improves output with no further integration work."),
    ("Is Safari iOS a browser column or a modifier on Safari?",
     "A modifier. 18 diverging members do not justify going from 7 to 15 provenance combinations."),
    ("Where do `InjectionResult`, `RegisteredContentScript` and `WindowType` live?",
     "No recommendation; needs your call."),
    ("Do Safari's own aliases (`contextMenus` to `menus`, `browserAction`/`pageAction` to `action`) constrain Decision 20's canonical set?",
     "No recommendation; needs your call."),
    ("File the Chrome and Firefox bugs before or after the dead-patch cleanup?",
     "After. Filing first risks filing a bug for a patch we then delete."),
    ("Does `overrideShared` now fan out to three browsers?",
     "Audit existing uses first. Silently changing its meaning would alter every patch that uses it."),
    ("Does the zero-any policy extend to `Record<string, unknown>`?",
     "Needs a position before Safari lands, or the guarantee weakens quietly."),
], 1):
    W(f"{i}. **{q}**")
    W(f"   Recommendation: {rec}")
    W("")

W("---")
W("")
W("## Verification already completed")
W("")
W("Recorded so it is not redone:")
W("")
W("- WebKit PR #71593 is merged (`merged_at` 2026-08-15T20:54:10Z, merge commit")
W("  `c691177463029c907b78c21215a9ca3aab6ce499`, base `main`).")
W("- `safari-webextension-types` output is current: generating from `WebKit/WebKit@main`,")
W("  from `--pr 71593`, and the committed `index.d.ts` all yield md5")
W("  `66cd9244686a64365214b8e0b817deb7`, 1006 lines, 0 `any`. Nothing to regenerate.")
W("- `webext-meta-types` `npm run check` passes: typecheck, 39 unit tests, generation")
W("  (2890 metadata entries, 0 merge issues), zero-any enforcement, tsd.")
W("- `safari-webextension-types` `npm ci && npm test` passes.")
W("- Spot-verified against the pinned upstream packages: `alarms.Alarm.persistAcrossSessions`")
W("  (chrome-types:816), `cookies.Cookie.partitionKey` (chrome-types:3783),")
W("  `cookies.Cookie.firstPartyDomain` (firefox:1812),")
W("  `notifications.NotificationOptions` (chrome-types:15212),")
W("  `export {_debugger as debugger}` (chrome-types:4564),")
W("  `export {_eval as eval}` (chrome-types:6150), `mimeHandlerPrivate` absent (0 occurrences),")
W("  `_manifest` present only in two doc comments.")
W("")

open(OUT, "w").write("\n".join(lines) + "\n")
print(f"wrote {OUT}: {len(lines)} lines")
print(f"chrome bugs {len(chrome_bugs)}, firefox bugs {len(firefox_bugs)}, dead {len(dead)}, "
      f"naming {len(naming)}, webkit ops {len(anyops)}, relocations {len(safari['topLevelRelocations'])}")
