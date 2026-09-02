#!/usr/bin/env python3
"""
Backfill the `reason` field onto every patch entry.

Why: the schema records what a patch changes but never why. Every entry carries
`bug_url: "TBD"`, which the generator renders into shipped output as
`@note Upstream type inaccuracy patched`, asserting an upstream defect even for
the majority of entries where no defect was ever established. Adversarial review
refuted 121 of 181 such claims.

The label is derived from evidence already gathered, not guessed:
  upstream-defect  an adversarial reviewer CONFIRMED a real upstream defect
  convergence      removing it makes the merger emit a cross-browser union, or
                   it only changes the annotation
  naming           a rename, an inlined private type, or a synthetic name
  enhancement      our own generics/narrowing, or a refuted claim that still
                   changes type text

Run with --write to apply; default is a dry run.
"""
import collections
import glob
import json
import sys

ROOT = "/home/pdk/webext-meta-types"

effects = {
    (r["browser"], r["path"]): r["effect"]
    for r in json.load(open(f"{ROOT}/patch-effect-results.json"))
}
inventory = {
    (r["browser"], r["api"]): r
    for r in json.load(open(f"{ROOT}/corrected-bug-inventory.json"))
}

NAMING = {"rename", "possible-rename", "private-type-inlining", "synthetic-name",
          "naming", "inlined", "namespace-not-in-upstream"}
ENHANCEMENT = {"our-enhancement", "our-restructuring", "unproven-shape",
               "legitimate-any", "omission-not-evidence", "already-present",
               "by-design", "legitimate-looseness"}


def reason_for(entry):
    verdicts, effs, modes = [], [], []
    for browser in ("chrome", "firefox"):
        if f"override{browser.capitalize()}" not in entry:
            continue
        key = (browser, f"{entry['namespace']}.{entry['element']}")
        effs.append(effects.get(key))
        rec = inventory.get(key)
        if rec:
            verdicts.append(rec["final_verdict"])
            modes.append(rec["failure_mode"])
    # A confirmed defect on either browser makes the whole entry a defect fix.
    if "CONFIRMED" in verdicts:
        return "upstream-defect"
    # Measured behaviour beats any label: if removing it produces a union, its
    # job is convergence whatever the original author believed.
    if any(e in ("CONVERGENCE", "ANNOTATION") for e in effs):
        return "convergence"
    if any(m in NAMING for m in modes):
        return "naming"
    if any(m in ENHANCEMENT for m in modes):
        return "enhancement"
    return "convergence"


write = "--write" in sys.argv
dist = collections.Counter()
total = 0

for path in sorted(glob.glob(f"{ROOT}/patches/*.json")):
    entries = json.load(open(path))
    for e in entries:
        r = reason_for(e)
        dist[r] += 1
        total += 1
        if write:
            e["reason"] = r
            # A patch that is not fixing an upstream defect has no bug to cite.
            # Leaving `bug_url: "TBD"` there is what produced fabricated IDs.
            if r != "upstream-defect":
                e.pop("bug_url", None)
    if write:
        json.dump(entries, open(path, "w"), indent=2)
        open(path, "a").write("\n")

print(f"{total} patch entries{' labelled' if write else ' would be labelled'}:")
for k, v in dist.most_common():
    print(f"   {k:18s} {v}")
print()
print(f"{dist['upstream-defect']} keep an upstream-defect claim and its bug_url.")
print(f"{total - dist['upstream-defect']} stop asserting a defect that was never established.")
if not write:
    print("\nDry run. Re-run with --write to apply.")
