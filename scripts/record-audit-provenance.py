#!/usr/bin/env python3
"""
Record which browser source refs an audit was performed against, and verify
those refs still resolve.

Why this exists
---------------
Browser-source audits were performed for this project before 2026-08-15 and left
no artifact: no ref, no file list, no date. The conclusions could not be cited,
could not be repeated, and every reviewer re-raised the same gap. One review even
recorded the gap as closed on the strength of remembered work, which converted a
true finding into a dismissed one.

Source-based auditing is reproducible by nature: a tag or sha plus a file path is
a permanent address. The only thing missing was writing the address down.

  record   capture the current refs of the local checkouts, with what was audited
  verify   confirm every recorded ref still resolves, and report drift

Usage:
  python3 scripts/record-audit-provenance.py record
  python3 scripts/record-audit-provenance.py verify
"""
import json
import os
import subprocess
import sys

ROOT = "/home/pdk/webext-meta-types"
OUT = f"{ROOT}/audit-provenance.json"

CHECKOUTS = {
    "firefox": "/home/pdk/firefox",
    "webkit": "/home/pdk/webkit",
    "chromium": "/home/pdk/chromium/src",
}


def git(repo, *args):
    r = subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else None


def record():
    audits = [
        {
            "audit": "firefox-schema-analysis",
            "date": "2026-08-15",
            "repo": "firefox",
            "baseline_ref": "FIREFOX_143_0_RELEASE",
            "why_this_ref": "matches the pinned @types/firefox-webext-browser@143.0.0",
            "paths": [
                "toolkit/components/extensions/schemas/",
                "browser/components/extensions/schemas/",
                "toolkit/components/extensions/parent/",
                "browser/components/extensions/parent/",
                "devtools/client/performance-new/@types/perf.d.ts",
            ],
            "method": "schema JSON read per type and per event at the tag; promise "
                      "resolution read from the implementing JS, not inferred from "
                      "the schema's async flag",
            "conclusions": [
                "all documentId/parentDocumentId findings are version lag, not defects",
                "13 of 14 unresolved promises resolve void, proven from implementation",
                "geckoProfiler.getSymbols resolves to [Uint32Array, Uint32Array, Uint8Array]",
                "tabs.onUpdated.changeInfo.groupId: runtime emits it, schema omits it at 143; "
                "fixed upstream by bug 1984553 in Firefox 144",
            ],
            "artifacts": ["FIREFOX-SCHEMA-FINDINGS.md", "firefox-schema-analysis.json"],
        },
        {
            "audit": "webkit-impl-analysis",
            "date": "2026-08-15",
            "repo": "webkit",
            "baseline_ref": None,  # filled from HEAD below: trunk, not a release
            "why_this_ref": "trunk at audit time; NOT a shipped Safari. Re-run against a "
                            "safari-* branch before making any versioned claim.",
            "paths": [
                "Source/WebKit/WebProcess/Extensions/Interfaces/",
                "Source/WebKit/WebProcess/Extensions/API/Cocoa/",
                "Source/WebKit/Shared/Extensions/WebExtensionUtilities.mm",
            ],
            "method": "validateDictionary key/type tables extracted from the Cocoa "
                      "implementation and compared against the declared IDL dictionaries",
            "conclusions": [
                "53 of 56 dictionaries declared by PR 71593 are unreferenced by any operation",
                "104 of 177 operations still take [NSDictionary] any",
                "14 validated parameter shapes exactly match an IDL dictionary",
                "WebExtensionScriptInjection omits the arguments/function aliases the "
                "implementation accepts",
                "validateDictionary IGNORES unknown keys rather than rejecting them",
            ],
            "artifacts": ["WEBKIT-IMPL-FINDINGS.md", "webkit-impl-analysis.json"],
        },
        {
            "audit": "chromium-schema-spotcheck",
            "date": "2026-08-15",
            "repo": "chromium",
            "baseline_ref": None,
            "why_this_ref": "existing local checkout at audit time",
            "paths": ["chrome/common/extensions/api/action.json"],
            "method": "schema JSON read directly for the disputed return type",
            "conclusions": [
                "action.getBadgeTextColor returns extensionTypes.ColorArray only; "
                "our `| string` arm was unfounded",
            ],
            "artifacts": ["ADVERSARIAL-REVIEW.md"],
        },
    ]

    for a in audits:
        repo = CHECKOUTS[a["repo"]]
        if a["baseline_ref"] is None:
            a["baseline_ref"] = git(repo, "rev-parse", "HEAD")
        a["resolved_sha"] = git(repo, "rev-parse", a["baseline_ref"])
        a["repo_path"] = repo
        a["head_at_record_time"] = git(repo, "rev-parse", "HEAD")

    doc = {
        "_readme": [
            "Which browser source refs each audit was performed against.",
            "",
            "A source audit is reproducible: ref plus path is a permanent address.",
            "Recording it is what makes a conclusion citable instead of remembered.",
            "",
            "NOTE: none of these are runtime observations. Source shows what the code",
            "says, not what a running browser does. Where schema and implementation",
            "disagree, only a real browser settles it, and no such check exists yet.",
        ],
        "audits": audits,
    }
    json.dump(doc, open(OUT, "w"), indent=2)
    print(f"recorded {len(audits)} audits to audit-provenance.json")
    for a in audits:
        print(f"  {a['audit']:28s} {a['repo']:9s} {a['baseline_ref'][:40]}")


def verify():
    if not os.path.exists(OUT):
        sys.exit("audit-provenance.json missing. Run: record")
    doc = json.load(open(OUT))
    bad = 0
    for a in doc["audits"]:
        repo = CHECKOUTS.get(a["repo"])
        sha = git(repo, "rev-parse", a["baseline_ref"]) if repo else None
        if sha is None:
            print(f"  UNRESOLVABLE  {a['audit']}: ref {a['baseline_ref']} not found in {repo}")
            bad += 1
            continue
        drifted = sha != a.get("resolved_sha")
        head = git(repo, "rev-parse", "HEAD")
        moved = head != a.get("head_at_record_time")
        status = "REF CHANGED" if drifted else ("ok, repo advanced" if moved else "ok")
        print(f"  {status:18s} {a['audit']:28s} {a['baseline_ref'][:32]}")
        if drifted:
            bad += 1
    if bad:
        sys.exit(f"\n{bad} audit ref(s) no longer resolve to what was audited.")
    print("\nEvery recorded audit ref still resolves. Conclusions remain citable.")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "verify"
    (record if cmd == "record" else verify)()
