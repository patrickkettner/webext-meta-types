#!/usr/bin/env python3
"""
Recover the REAL parameter shapes for WebKit's `any` extension-API parameters
from the Cocoa implementation, instead of guessing from dictionary names.

Why this exists
---------------
WORKPLAN workstream D lists 104 operations declared as `[NSDictionary] any` in
WebKit's WebIDL, and pairs each with a "candidate dictionary" chosen by NAME
MATCHING. That is the same heuristic that produced a 75% false-positive rate
earlier in this project, and review found four rows already wrong
(for example `i18n.getMessage(substitutions)` mapped to
`WebExtensionLanguageDetectionResult`).

The Cocoa layer validates every one of these dictionaries against an explicit
table:

    static NSDictionary<NSString *, id> *types = @{
        @"name": NSString.class,
        storeIdKey: NSString.class,
        urlKey:     NSString.class,
    };
    validateDictionary(details, @"details", requiredKeys, types, outExceptionString);

That table IS the parameter schema. It names every accepted key, its type, and
(via requiredKeys) whether it is required. This script extracts it.

Run:  python3 analyze-webkit-impl.py
"""
import json
import os
import re
import glob
import subprocess

WK = "/home/pdk/webkit"
COCOA = "Source/WebKit/WebProcess/Extensions/API/Cocoa"
IDL = "Source/WebKit/WebProcess/Extensions/Interfaces"

# ---------------------------------------------------------------- key constants
# Keys appear either as literals (@"name") or as constants (storeIdKey).
# Constant definitions live across Source/WebKit, so collect them broadly.
KEY_DEF = re.compile(r'(?:static\s+)?NSString\s*\*\s*const\s+(\w+)\s*=\s*@"([^"]*)"')


def collect_key_constants():
    keys = {}
    out = subprocess.run(
        ["grep", "-rhoE", r'NSString \*ic?onst \w+ = @"[^"]*"', "Source/WebKit"],
        cwd=WK, capture_output=True, text=True).stdout
    for line in out.splitlines():
        m = re.search(r'NSString \*\s*const\s+(\w+)\s*=\s*@"([^"]*)"', line)
        if m:
            keys[m.group(1)] = m.group(2)
    # second pass with the stricter regex over the same tree
    out2 = subprocess.run(
        ["grep", "-rhE", r'NSString \* ?const \w+ = @"', "Source/WebKit"],
        cwd=WK, capture_output=True, text=True).stdout
    for line in out2.splitlines():
        m = KEY_DEF.search(line)
        if m:
            keys.setdefault(m.group(1), m.group(2))
    return keys


KEYS = collect_key_constants()

OBJC_TO_TS = {
    "NSString": "string",
    "NSNumber": "number",
    "NSArray": "unknown[]",
    "NSDictionary": "object",
    "NSNull": "null",
    "NSObject": "unknown",
    "NSData": "ArrayBuffer",
    "NSDate": "number",
}


def objc_type_to_ts(expr):
    """Map a validation-table value to a TypeScript-ish type."""
    e = expr.strip().rstrip(",")
    # @[ NSString.class, NSNumber.class ] means a union of allowed classes
    if e.startswith("@[") or "orderedSetWithObjects" in e or e.startswith("["):
        inner = re.findall(r"(\w+)\.class", e)
        ts = sorted({OBJC_TO_TS.get(i, i) for i in inner})
        return " | ".join(ts) if ts else "unknown"
    m = re.match(r"(\w+)\.class", e)
    if m:
        return OBJC_TO_TS.get(m.group(1), m.group(1))
    if "NSNumber" in e and "BOOL" in e:
        return "boolean"
    return e


def resolve_key(tok):
    tok = tok.strip()
    m = re.match(r'@"([^"]*)"', tok)
    if m:
        return m.group(1)
    return KEYS.get(tok, tok)


BLOCK = re.compile(r"NSDictionary<NSString \*, id> \*(\w+)\s*=\s*@\{")
VALIDATE = re.compile(
    r"validateDictionary\(\s*(\w+)\s*,\s*@\"([^\"]*)\"\s*,\s*([^,]+),\s*(\w+)\s*,", re.S)
REQUIRED = re.compile(r"NSArray\s*\*\s*(\w+)\s*=\s*@\[(.*?)\];", re.S)
FUNC = re.compile(r"^(?:\w[\w:<>,\s\*&]*?)\b(\w+)::(\w+)\s*\(", re.M)


def brace_slice(src, start, open_ch="{", close_ch="}"):
    """Return the text between the delimiters starting at src[start] == open_ch."""
    depth = 0
    for i in range(start, len(src)):
        if src[i] == open_ch:
            depth += 1
        elif src[i] == close_ch:
            depth -= 1
            if depth == 0:
                return src[start + 1:i]
    return ""


def split_top_level(text, sep=","):
    """Split on `sep` at nesting depth zero, respecting [] {} () and strings."""
    parts, buf, depth, instr = [], [], 0, False
    i = 0
    while i < len(text):
        c = text[i]
        if instr:
            buf.append(c)
            if c == '"' and text[i - 1] != "\\":
                instr = False
        elif c == '"':
            instr = True
            buf.append(c)
        elif c in "[{(":
            depth += 1
            buf.append(c)
        elif c in "]})":
            depth -= 1
            buf.append(c)
        elif c == sep and depth == 0:
            parts.append("".join(buf))
            buf = []
        else:
            buf.append(c)
        i += 1
    if buf:
        parts.append("".join(buf))
    return [p.strip() for p in parts if p.strip()]


def enclosing_function(src, pos):
    best = None
    for m in FUNC.finditer(src):
        if m.start() < pos:
            best = m
        else:
            break
    return f"{best.group(1)}::{best.group(2)}" if best else "?"


results = []
for path in sorted(glob.glob(os.path.join(WK, COCOA, "*.mm"))):
    src = open(path, errors="replace").read()
    rel = os.path.relpath(path, WK)

    # Collect every table declaration WITH its position. Many functions declare a
    # local table also called `types`, so a name-keyed dict silently keeps only
    # the last one and mis-attributes every call. Resolve by nearest-preceding.
    tables = []
    for m in BLOCK.finditer(src):
        name = m.group(1)
        brace = src.index("{", m.end() - 1)
        body = brace_slice(src, brace)
        # Drop preprocessor directives; they are not dictionary entries.
        body = "\n".join(l for l in body.splitlines() if not l.lstrip().startswith("#"))
        entries = []
        for item in split_top_level(body):
            if item.startswith("//") or item.startswith("#") or ":" not in item:
                continue
            k, _, v = item.partition(":")
            key = resolve_key(k)
            if not key or key.startswith("@"):
                continue
            entries.append((key, objc_type_to_ts(v)))
        if entries:
            tables.append({"name": name, "entries": entries, "pos": m.start()})

    reqs = {}
    for m in REQUIRED.finditer(src):
        reqs[m.group(1)] = [resolve_key(t) for t in m.group(2).split(",") if t.strip()]

    for m in VALIDATE.finditer(src):
        _dictvar, paramname, reqexpr, typesvar = m.groups()
        # nearest declaration of that variable BEFORE this call
        cands = [t for t in tables if t["name"] == typesvar and t["pos"] < m.start()]
        if not cands:
            continue
        tbl = max(cands, key=lambda t: t["pos"])
        reqexpr = reqexpr.strip()
        required = []
        if reqexpr in reqs:
            required = reqs[reqexpr]
        elif reqexpr.startswith("@["):
            required = [resolve_key(t) for t in reqexpr[2:].rstrip("]").split(",") if t.strip()]
        fn = enclosing_function(src, m.start())
        results.append({
            "file": rel,
            "function": fn,
            "param": paramname,
            "keys": [{"name": k, "type": t, "required": k in required}
                     for k, t in tbl["entries"]],
            "required_keys": required,
        })

# ---------------------------------------------------------------- compare to IDL
def idl_dicts():
    out = {}
    for p in sorted(glob.glob(os.path.join(WK, IDL, "*.idl"))):
        src = re.sub(r"/\*[\s\S]*?\*/", "", open(p, errors="replace").read())
        for m in re.finditer(r"\bdictionary\s+(\w+)\s*\{([^}]*)\}", src, re.S):
            members = re.findall(r"(?:required\s+)?[\w<>\[\] ]+\s+(\w+)\s*;", m.group(2))
            out[m.group(1)] = {"file": os.path.basename(p), "members": sorted(set(members))}
    return out


DICTS = idl_dicts()

print(f"key constants resolved : {len(KEYS)}")
print(f"validation tables found: {len(results)}")
print(f"IDL dictionaries       : {len(DICTS)}")
print()
print("=" * 78)
print("VALIDATED PARAMETER SHAPES, from the Cocoa implementation")
print("=" * 78)

matched = 0
for r in sorted(results, key=lambda x: (x["file"], x["function"])):
    keys = [k["name"] for k in r["keys"]]
    # find the IDL dictionary whose members equal this key set
    exact = [d for d, v in DICTS.items() if set(v["members"]) == set(keys)]
    subset = [d for d, v in DICTS.items()
              if set(keys) and set(keys) < set(v["members"])]
    superset = [d for d, v in DICTS.items()
                if set(v["members"]) and set(v["members"]) < set(keys)]
    if exact:
        matched += 1
    r["idl_exact_match"] = exact
    r["idl_subset_of"] = subset
    r["idl_superset_of"] = superset

    print(f"\n{r['function']}  (param `{r['param']}`)")
    print(f"  {r['file']}")
    for k in r["keys"]:
        req = "required" if k["required"] else "optional"
        print(f"    {k['name']:28s} {k['type']:22s} {req}")
    if exact:
        print(f"  IDL dictionary with identical members: {', '.join(exact)}")
    elif subset:
        print(f"  validated keys are a SUBSET of: {', '.join(subset[:3])}")
    elif superset:
        print(f"  validated keys are a SUPERSET of: {', '.join(superset[:3])}")
    else:
        print("  no IDL dictionary matches this key set")

json.dump({"key_constants": len(KEYS), "tables": results,
           "idl_dictionaries": DICTS},
          open("webkit-impl-analysis.json", "w"), indent=2)
print(f"\n\n{matched} of {len(results)} validated shapes exactly match an IDL dictionary.")
print("wrote webkit-impl-analysis.json")
