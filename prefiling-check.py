#!/usr/bin/env python3
"""
Pre-filing gate (GRD-010): before anything is filed upstream, ask whether the
defect still exists at tip.

This exists because of a specific failure. `tabs.onUpdated.changeInfo.groupId`
was proven missing at FIREFOX_143_0_RELEASE and written up as the strongest
finding of the analysis, with a recommendation to file it at bugzilla. Mozilla
had already fixed it: bug 1984553, shipped in Firefox 144. One `git log` in a
checkout that was already on disk would have caught it. Filing it would have
duplicated an 11-month-old resolved bug with the exact upstreams this project
depends on.

Two passes:

  1. RECONCILE. The corrected inventory still marks the version-lag class as
     CONFIRMED, which the Firefox schema analysis retracted. Those are not
     defects: the pinned package correctly describes the pinned version.
  2. TIP CHECK. For each surviving candidate, search the local checkout for a
     commit touching that member after the pinned ref. A hit means the upstream
     situation changed and the claim must be re-verified before filing.

Output: final-filing-list.json, the only list anything may be filed from.
"""
import json
import re
import subprocess

ROOT = "/home/pdk/webext-meta-types"
FF = "/home/pdk/firefox"
FF_TAG = "FIREFOX_143_0_RELEASE"

inventory = json.load(open(f"{ROOT}/corrected-bug-inventory.json"))
confirmed = [r for r in inventory if r["final_verdict"] == "CONFIRMED"]

FINDINGS_EARLY = {
    (f["browser"], f["path"]): f
    for f in json.load(open(f"{ROOT}/upstream-bug-findings.json"))
}

def structured_members(rec):
    f = FINDINGS_EARLY.get((rec["browser"], rec["api"]))
    out = []
    if f:
        for key in ("addedMembers", "changedMembers", "removedMembers"):
            out += (f.get(key) or [])
    return set(out)

# The version-lag class is identified by the members it concerns, not by whether
# the reviewer happened to name them in prose. Matching prose left 7 of these
# in the candidate list, where pass 2 then flagged them as "moved".
LAG_MEMBERS = {"documentId", "parentDocumentId", "splitViewId", "cssOrigin"}

# ---- pass 1: reconcile against the Firefox schema analysis -------------------
LAG = re.compile(r"ocumentId|splitViewId|cssOrigin")
GROUPID = re.compile(r"groupId")

retracted, candidates = [], []
for r in confirmed:
    why = r["reason"] or ""
    mems = structured_members(r)
    if GROUPID.search(why) or "groupId" in mems:
        retracted.append((r, "already fixed upstream: Mozilla bug 1984553, shipped Firefox 144"))
    elif LAG.search(why) or (mems & LAG_MEMBERS):
        retracted.append((r, "version lag, not a defect: absent at the pinned version, present at tip"))
    else:
        candidates.append(r)

print("=" * 78)
print("PASS 1. Reconcile against the Firefox schema analysis")
print("=" * 78)
print(f"  confirmed by adversarial review : {len(confirmed)}")
print(f"  retracted here                  : {len(retracted)}")
print(f"  surviving candidates            : {len(candidates)}")

# ---- pass 2: has upstream moved since the pinned ref? ------------------------
FF_SCHEMAS = [
    "toolkit/components/extensions/schemas",
    "browser/components/extensions/schemas",
]


# Derive the search terms from STRUCTURED data, never from the reviewer's prose.
# Parsing prose produced `any` (matching every commit in the tree) and then
# `schema` and `member` (matching unrelated refactors). The findings file already
# records exactly which members a claim concerns.
FINDINGS = {
    (f["browser"], f["path"]): f
    for f in json.load(open(f"{ROOT}/upstream-bug-findings.json"))
}


def members_of(rec):
    """The identifiers this claim concerns, from recorded member lists."""
    f = FINDINGS.get((rec["browser"], rec["api"]))
    terms = []
    if f:
        for key in ("addedMembers", "changedMembers", "removedMembers"):
            terms += [m for m in (f.get(key) or []) if len(m) > 2]
    if not terms:
        leaf = rec["api"].split(".")[-1]
        if len(leaf) > 2:
            terms = [leaf]
    return sorted(set(terms))


def moved_since(member):
    """Commits touching `member` in the Firefox extension schemas after the tag."""
    out = subprocess.run(
        ["git", "log", "--oneline", f"{FF_TAG}..HEAD", "-S", member, "--"] + FF_SCHEMAS,
        cwd=FF, capture_output=True, text=True,
    )
    lines = [l for l in out.stdout.splitlines() if l.strip()]
    return lines


print()
print("=" * 78)
print("PASS 2. Tip check: did upstream change this since the pinned ref?")
print("=" * 78)

final, needs_recheck = [], []
for r in candidates:
    if r["browser"] != "firefox":
        final.append({**r, "tip_check": "not-applicable (chrome; check chrome-types release)"})
        continue
    terms = members_of(r)
    hits = []
    for t in terms:
        hits += [(t, h) for h in moved_since(t)]
    if hits:
        needs_recheck.append((r, terms, [h for _, h in hits[:2]]))
        print(f"\n  MOVED  {r['api']}  (terms: {', '.join(terms)})")
        for t, h in hits[:2]:
            print(f"           [{t}] {h[:88]}")
    else:
        final.append({**r, "tip_check": f"no commit touching {terms} since {FF_TAG}"})

print(f"\n  unchanged since {FF_TAG} : {sum(1 for f in final if f['browser']=='firefox')}")
print(f"  moved, must re-verify      : {len(needs_recheck)}")
print(f"  chrome, needs its own check: {sum(1 for f in final if f['browser']=='chrome')}")

json.dump(
    {
        "generated": "2026-08-15",
        "rule": "Nothing may be filed that is not on this list, and nothing on it "
                "may be filed before Patrick reads the literal text.",
        "retracted": [{"api": r["api"], "browser": r["browser"], "why": why}
                      for r, why in retracted],
        "needs_recheck": [{"api": r["api"], "browser": r["browser"], "members": m,
                           "commits": h} for r, m, h in needs_recheck],
        "filing_candidates": final,
    },
    open(f"{ROOT}/final-filing-list.json", "w"), indent=2,
)
print("\nwrote final-filing-list.json")
