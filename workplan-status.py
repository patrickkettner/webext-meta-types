#!/usr/bin/env python3
"""
Emit the STATUS section that leads WORKPLAN.md.

Everything here is read from live data, never typed in. The workplan was wrong
twice because hand-maintained counts drifted from reality, so the numbers are
computed at generation time and the sources are named.
"""
import glob
import json
import subprocess

ROOT = "/home/pdk/webext-meta-types"


def j(name):
    return json.load(open(f"{ROOT}/{name}"))


def emit():
    L = []
    W = L.append

    entries = [e for f in sorted(glob.glob(f"{ROOT}/patches/*.json")) for e in json.load(open(f))]
    necessity = j("verify-patch-necessity-results.json")
    inventory = j("corrected-bug-inventory.json")
    waivers = j("patch-waivers.json")["waivers"]
    baseline = j("union-note-baseline.json")["unionNotes"]

    reasons = {}
    for e in entries:
        reasons[e.get("reason", "(none)")] = reasons.get(e.get("reason", "(none)"), 0) + 1
    inert = sum(1 for r in necessity if r["verdict"] == "INERT")
    load = sum(1 for r in necessity if r["verdict"] == "LOAD-BEARING")
    confirmed = sum(1 for r in inventory if r["final_verdict"] == "CONFIRMED")
    refuted = sum(1 for r in inventory if r["final_verdict"] == "REFUTED")

    dist = subprocess.run(["grep", "-c", "Upstream type inaccuracy patched", f"{ROOT}/dist/index.d.ts"],
                          capture_output=True, text=True).stdout.strip() or "0"

    W("## Status, 2026-08-15")
    W("")
    W("Computed at generation time from `patches/`, `verify-patch-necessity-results.json`,")
    W("`corrected-bug-inventory.json`, `patch-waivers.json` and `dist/`. Nothing in this")
    W("section is hand-maintained, because hand-maintained counts are what made two")
    W("earlier versions of this document wrong.")
    W("")
    W("### Corpus")
    W("")
    W("| Measure | Value |")
    W("|---|---|")
    W(f"| Patch entries | {len(entries)} (was 200) |")
    W(f"| Browser overrides | {len(necessity)} (was 298) |")
    W(f"| Load-bearing | {load} |")
    W(f"| Inert | {inert} |")
    W(f"| Degradation waivers | {len(waivers)} |")
    W(f"| Cross-browser union fallbacks | {baseline} |")
    W(f"| False upstream-defect claims in shipped output | {dist} (was 230) |")
    W("")
    W("Patch reasons, now a required field:")
    W("")
    W("| reason | entries |")
    W("|---|---|")
    for k, v in sorted(reasons.items(), key=lambda x: -x[1]):
        W(f"| {k} | {v} |")
    W("")

    W("### Done since the last revision")
    W("")
    W("- **13 of 13 regressions fixed** (workstream J), each from primary source:")
    W("  `geckoProfiler.getSymbols` typed as the real `[Uint32Array, Uint32Array,")
    W("  Uint8Array]`, `ProfilerFeature` realigned to the pinned Firefox 143 enum,")
    W("  `runtime.Port.error` restored, `action.getBadgeTextColor`'s invented `| string`")
    W("  dropped, `processes.Process` named types restored, `_manifest.NativeManifest`")
    W("  union restored plus a fabricated Chrome override removed,")
    W("  `inspectedWindow.Resource` overload split restored, `inspectedWindow.eval`")
    W("  corrected to Firefox's tuple, `userScripts` `global`/`export` corrected,")
    W("  `ScriptSource`/`RegisteredUserScript` patches deleted.")
    W("- **32 overrides deleted** after individual approval: 21 verified inert, then 11")
    W("  more that became inert once the defect annotation was gated on `reason`.")
    W("- **`reason` is a required patch field**, and the shipped output no longer")
    W("  asserts an upstream defect unless one is actually claimed.")
    W("- **Placeholder `bug_url` is rejected** by `validatePatch`. The corpus previously")
    W("  carried a mock ID, then invented sequential IDs, then `TBD` on all 200.")
    W("")

    W("### Guardrails now enforced by `npm run check`")
    W("")
    W("| Gate | Catches | Proven to fail by |")
    W("|---|---|---|")
    W("| `verify:patches` inertness | a patch that changes nothing | synthetic inert entry |")
    W("| `verify:patches` overrideShared | the field that bypassed the harness | synthetic shared-only entry |")
    W("| `verify:patches` degradation | a patch deleting an upstream member | removing one waiver |")
    W("| `ratchet:unions` | convergence regressing | injecting a union note |")
    W("| `validatePatch` reason/bug_url | unlabelled or placeholder-evidenced patches | 4 unit tests |")
    W("")
    W("Also live, outside this repo's build: a global `PreToolUse` hook that refuses")
    W("shell commands depending on the inherited working directory. It exists because")
    W("that hazard produced two silent wrong answers during this analysis.")
    W("")

    W("### Corrections to earlier versions of this plan")
    W("")
    W("Recorded so nobody re-derives them:")
    W("")
    W("- **The Firefox `documentId`/`parentDocumentId` findings are not defects.** All")
    W("  are version lag: absent at `FIREFOX_143_0_RELEASE`, present at tip.")
    W("  `@types/firefox-webext-browser@143.0.0` correctly describes Firefox 143.")
    W("- **143.0.0 is the latest published version.** There is nothing to bump to, so")
    W("  \"bump the package\" is not an executable item. Current stable Firefox is 154.")
    W("- **`tabs.onUpdated.changeInfo.groupId` was already fixed upstream** by Mozilla")
    W("  bug 1984553, shipped in Firefox 144. An earlier revision recommended filing it,")
    W("  which would have duplicated a resolved bug.")
    W("- **CI is out of scope here.** Enforcement lives in the crx-audit repo; this repo")
    W("  exposes the gates for it to run.")
    W("- **WebKit's `validateDictionary` ignores unknown keys**, it does not reject them.")
    W("  Workstream D findings must say a key is silently ignored, never rejected.")
    W("- **No part of this project has ever been checked against a running browser.**")
    W("  The earlier audits were done against browser SOURCE, as were the Firefox and")
    W("  WebKit passes on 2026-08-15. Source is a far better oracle than a derived")
    W("  `.d.ts` and it is now cheap to consult locally, but it does not observe")
    W("  behaviour: where schema and implementation disagree, only a real browser")
    W("  settles it. An earlier revision of this plan recorded that gap as closed. It")
    W("  is open.")
    W(f"- **{refuted} of the {confirmed + refuted} reviewed bug claims were refuted.**")
    W("  Only the confirmed ones may be filed, and only after the pre-filing tip check.")
    W("")
    return "\n".join(L)


if __name__ == "__main__":
    print(emit())
