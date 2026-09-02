#!/usr/bin/env python3
"""
Resolve the Firefox claims the adversarial review could not settle, using the
local mozilla-central checkout instead of derived type packages.

METHODOLOGY NOTES (both learned the hard way during this analysis)

1. `"async": true` in a Gecko schema does NOT mean the promise resolves with
   nothing. It means the function returns a promise and the schema is SILENT
   about the resolution. The first version of this script inferred
   `async: true -> Promise<void>` and was wrong: `geckoProfiler.getSymbols` is
   `async: true` and resolves to `[Uint32Array, Uint32Array, Uint8Array]`.
   The schema tells you what the DT generator saw. Only the implementation
   tells you what the function actually returns.

2. Namespace-wide grep counts are too coarse to answer "does this type have
   this member". The first version counted `documentId` across all of
   runtime.json, found one at the 143 baseline, and concluded MessageSender had
   it. That occurrence was on `ExtensionContext`. Check the specific type.

Run:  python3 analyze-firefox-schemas.py
"""
import json
import os
import re
import subprocess

FF = "/home/pdk/firefox"
BASELINE_TAG = "FIREFOX_143_0_RELEASE"   # matches @types/firefox-webext-browser@143.0.0

SCHEMA_DIRS = [
    "toolkit/components/extensions/schemas",
    "browser/components/extensions/schemas",
]
IMPL_DIRS = [
    "toolkit/components/extensions/parent",
    "browser/components/extensions/parent",
    "toolkit/components/extensions/child",
    "browser/components/extensions/child",
]


def git(args):
    r = subprocess.run(["git"] + args, cwd=FF, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def strip_jsonc(text):
    return "\n".join(l for l in text.splitlines() if not l.lstrip().startswith("//"))


def load_schema(path, ref=None):
    raw = git(["show", f"{ref}:{path}"]) if ref else None
    if ref and raw is None:
        return None
    if not ref:
        try:
            raw = open(os.path.join(FF, path)).read()
        except FileNotFoundError:
            return None
    try:
        return json.loads(strip_jsonc(raw))
    except Exception:
        return None


SCHEMA_FILE = {
    "webRequest": "web_request.json", "webNavigation": "web_navigation.json",
    "contentScripts": "content_scripts.json", "userScripts": "user_scripts.json",
    "normandyAddonStudy": "normandyAddonStudy.json", "geckoProfiler": "geckoProfiler.json",
    "telemetry": "telemetry.json", "proxy": "proxy.json", "runtime": "runtime.json",
    "tabs": "tabs.json", "scripting": "scripting.json", "sessions": "sessions.json",
    "menus": "menus.json", "action": "browser_action.json",
    "browserAction": "browser_action.json", "omnibox": "omnibox.json",
    "notifications": "notifications.json",
}


def schema_path(ns, ref=None):
    fname = SCHEMA_FILE.get(ns, ns + ".json")
    for d in SCHEMA_DIRS:
        p = f"{d}/{fname}"
        if ref:
            if git(["show", f"{ref}:{p}"]) is not None:
                return p
        elif os.path.exists(os.path.join(FF, p)):
            return p
    return None


def ns_entry(schema, ns):
    for e in schema or []:
        if e.get("namespace") == ns:
            return e
    return None


def type_properties(ns, type_id, ref=None):
    """Members declared on one named type, or None if the type is absent."""
    p = schema_path(ns, ref)
    if not p:
        return None
    sc = load_schema(p, ref)
    e = ns_entry(sc, ns)
    if not e:
        return None
    for ty in e.get("types", []) or []:
        if ty.get("id") == type_id:
            return sorted((ty.get("properties") or {}).keys())
    return None


def event_detail_properties(ns, event_name, ref=None):
    """Members of an event's details parameter."""
    p = schema_path(ns, ref)
    if not p:
        return None
    sc = load_schema(p, ref)
    e = ns_entry(sc, ns)
    if not e:
        return None
    for ev in e.get("events", []) or []:
        if ev.get("name") != event_name:
            continue
        for param in ev.get("parameters", []) or []:
            props = param.get("properties")
            if props:
                return sorted(props.keys())
    return None


def find_impl(ns):
    """Locate the implementing JS for a namespace."""
    for d in IMPL_DIRS:
        for cand in (f"ext-{ns}.js", f"ext-{ns.lower()}.js"):
            p = os.path.join(FF, d, cand)
            if os.path.exists(p):
                return os.path.relpath(p, FF)
    return None


def impl_returns(ns, fn):
    """
    Does the implementation of ns.fn return a value?
    Returns (verdict, evidence_line).
    """
    rel = find_impl(ns)
    if not rel:
        return ("impl-not-found", "")
    src = open(os.path.join(FF, rel)).read()
    lines = src.splitlines()
    # find the method definition
    pat = re.compile(rf"^\s*(?:async\s+)?{re.escape(fn)}\s*\(")
    start = None
    for i, l in enumerate(lines):
        if pat.match(l):
            start = i
            break
    if start is None:
        return ("fn-not-found", rel)
    # walk to the end of the method by brace depth
    depth = 0
    body = []
    for i in range(start, min(start + 200, len(lines))):
        body.append(lines[i])
        depth += lines[i].count("{") - lines[i].count("}")
        if depth <= 0 and i > start:
            break
    text = "\n".join(body[1:])  # skip signature line
    has_return = re.search(r"^\s*return\s+\S", text, re.M)
    if has_return:
        return ("returns-value", f"{rel}:{start+1} -> {has_return.group(0).strip()[:70]}")
    return ("returns-nothing", f"{rel}:{start+1} (no value-returning return statement)")


results = {"baseline_tag": BASELINE_TAG, "version_skew": [], "promise_returns": []}

print("=" * 76)
print(f"PART A. Version skew, checked per TYPE at {BASELINE_TAG} vs tip")
print("=" * 76)
print()

# (namespace, kind, name) where kind is 'type' or 'event'
SKEW_TARGETS = [
    ("runtime", "type", "MessageSender"),
    ("webRequest", "event", "onBeforeRequest"),
    ("webRequest", "event", "onCompleted"),
    ("webNavigation", "event", "onCommitted"),
    ("webNavigation", "event", "onCompleted"),
    ("proxy", "event", "onRequest"),
    ("tabs", "type", "Tab"),
]

for ns, kind, name in SKEW_TARGETS:
    get = type_properties if kind == "type" else event_detail_properties
    base = get(ns, name, BASELINE_TAG)
    tip = get(ns, name)
    if base is None and tip is None:
        print(f"  {ns}.{name}: not resolvable")
        continue
    base, tip = base or [], tip or []
    added = [m for m in tip if m not in base]
    interesting = [m for m in added if "ocumentId" in m]
    verdict = ("version-lag" if interesting else
               "no documentId change")
    print(f"  {ns}.{name}")
    print(f"    @143 : {', '.join(base) or '(none)'}")
    print(f"    tip  : {', '.join(tip) or '(none)'}")
    print(f"    added since 143: {', '.join(added) or '(none)'}  -> {verdict}")
    results["version_skew"].append({
        "namespace": ns, "kind": kind, "name": name,
        "at_143": base, "at_tip": tip, "added_since_143": added, "verdict": verdict,
    })

print()
print("=" * 76)
print("PART B. Promise resolution, from the IMPLEMENTATION not the schema")
print("=" * 76)

rows = json.load(open("corrected-bug-inventory.json"))
need = [r["api"] for r in rows
        if r["browser"] == "firefox" and r["suggested_action"] == "needs-runtime-check"]

for api in need:
    ns, fn = api.rsplit(".", 1)
    p = schema_path(ns)
    sc = load_schema(p) if p else None
    e = ns_entry(sc, ns) if sc else None
    func = next((f for f in (e.get("functions", []) or []) if f.get("name") == fn), None) if e else None
    is_async = func.get("async") if func else None
    deprecated = func.get("deprecated") if func else None

    verdict, evidence = impl_returns(ns, fn)
    if verdict == "returns-nothing":
        actual = "Promise<void>"
    elif verdict == "returns-value":
        actual = "NON-VOID: see evidence, must be typed from the returned expression"
    else:
        actual = f"undetermined ({verdict})"

    print(f"\n  {api}")
    print(f"    schema async : {is_async!r}")
    print(f"    implementation: {evidence}")
    print(f"    resolves to  : {actual}")
    if deprecated:
        print(f"    deprecated   : {str(deprecated)[:90]}")
    results["promise_returns"].append({
        "api": api, "schema_async": is_async, "impl_verdict": verdict,
        "impl_evidence": evidence, "resolves_to": actual,
        "deprecated": str(deprecated) if deprecated else None,
    })

json.dump(results, open("firefox-schema-analysis.json", "w"), indent=2)
print("\n\nwrote firefox-schema-analysis.json")
