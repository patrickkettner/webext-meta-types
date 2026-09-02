#!/usr/bin/env python3
"""
Mutation-test every branch the merge-issue suite claims to cover.

A passing test proves nothing about a branch it does not reach. The first
version of that suite had 9 green tests over 6 branches, and 2 of the 6 were
not pinned at all: deleting their code left the suite green. I had sampled 2
mutations and both happened to land on branches that were covered.

So: mutate every branch, and every claim about emitted output, not a sample.
A mutation that survives means the branch is untested in practice.

Runs on a scratch copy; the repo is never modified.
"""
import re
import shutil
import subprocess
import tempfile
import os

REPO = "/home/pdk/webext-meta-types"
GEN = f"{REPO}/src/generator.ts"

MUTATIONS = [
    ("M1 interface-unparseable: drop the issue",
     'issues.push({\n      namespace: ns, element: el.name, kind: "interface",\n      reason: agreeing.length',
     'if (false) issues.push({\n      namespace: ns, element: el.name, kind: "interface",\n      reason: agreeing.length'),

    ("M2 interface-unparseable: claim every browser that has a source, agreeing or not",
     "const prov = mkProv(...agreeing);",
     "const prov = mkProv(...present);"),

    ("M3 interface-tp: drop the issue",
     'if (new Set(typeParamForms).size > 1) {',
     'if (false && new Set(typeParamForms).size > 1) {'),

    ("M4 interface-tp: emit the last browser's parameter list instead of the first's",
     'const keptParams = typeParamForms.find((t) => t) ?? "";',
     'const keptParams = [...typeParamForms].reverse().find((t) => t) ?? "";'),

    ("M16 interface-tp: emit member forms that name discarded type parameters",
     '      if (incompatible.has(b)) continue;',
     '      if (false && incompatible.has(b)) continue;'),

    ("M5 alias-divergent: emit the other browser's text instead of the kept one",
     'meta.push({ path: `${ns}.${el.name}`, supported: mkProv(kept) });\n      return formatSupportComment(mkProv(kept), el.bugUrl, undefined, el.patchReason) + ensureExport(keptSrc) + "\\n";',
     'meta.push({ path: `${ns}.${el.name}`, supported: mkProv(kept) });\n      return formatSupportComment(mkProv(kept), el.bugUrl, undefined, el.patchReason) + ensureExport(getSource(el, present[present.length - 1])!) + "\\n";'),

    ("M6 alias-divergent: falsely claim every browser",
     'return formatSupportComment(mkProv(kept), el.bugUrl, undefined, el.patchReason) + ensureExport(keptSrc) + "\\n";',
     'return formatSupportComment(mkProv(...present), el.bugUrl, undefined, el.patchReason) + ensureExport(keptSrc) + "\\n";'),

    ("M7 alias-tp: disable the branch entirely",
     'if (new Set(typeParamForms).size > 1) {\n    const kept = browsers[0];',
     'if (false && new Set(typeParamForms).size > 1) {\n    const kept = browsers[0];'),

    ("M11 target build: draw declaration text from every browser, not just the target",
     'return target ? BROWSER_ORDER.filter((b) => b === target) : BROWSER_ORDER;',
     'return BROWSER_ORDER;'),

    ("M12 property union: keep every browser's arm, deduping nothing",
     '  const arms = distinctArms(parts.map((p) => p!.type));\n  return `${head}:',
     '  const arms = parts.map((p) => p!.type);\n  return `${head}:'),

    ("M13 index-signature union: keep every browser's arm, deduping nothing",
     '  const arms = distinctArms(parts.map((p) => p!.type));\n  return arms.length === 1 ? texts[0]',
     '  const arms = parts.map((p) => p!.type);\n  return arms.length === 1 ? texts[0]'),

    ("M14 union arms: dedupe by raw string instead of canonical form",
     'if (!out.some((u) => canonicalizeSignature(u) === canonicalizeSignature(t))) out.push(t);',
     'if (!out.includes(t)) out.push(t);'),

    ("M15 union arms: stop parenthesising function-typed arms",
     'const wrapArm = (t: string) => (endsInArrow(t) ? `(${t})` : t);',
     'const wrapArm = (t: string) => t;'),

    ("M17 type params: stop renaming parameters positionally",
     '    if (!map || normalizeParams(tp, map) !== normalizeParams(keptParams)) continue;',
     '    if (true) continue;'),

    ("M18 type params: stop treating an ungeneric form as the generic at its defaults",
     '      if (!equivalent) continue;',
     '      if (true) continue;'),

    ("M19 type params: substitute defaults without checking the members agree",
     '      if (!equivalent) continue;',
     '      if (false) continue;'),

    ("M20 rename: treat every identifier as a type reference",
     "      if (!isTypeRef) continue;",
     "      if (false) continue;"),

    ("M21 rename: rename the left side of a qualified name too",
     "      const isTypeRef = Node.isTypeReference(parent) ||",
     "      const isTypeRef = true ||"),

    ("M22 rename: drop the identifier-capture guard",
     "    if (capturesName(forms[i], map)) continue;",
     "    if (false && capturesName(forms[i], map)) continue;"),

    ("M23 substitution: accept any default, not just a top type",
     '    keptNames.every((n) => defaults.get(n) === "unknown" || defaults.get(n) === "any");',
     "    keptNames.every((n) => defaults.has(n));"),

    ("M24 enum mirror: accept a value whose members do not match the type",
     "      return values.length > 0 &&\n        values.sort().join(\"\\u0000\") === aliasLiterals.join(\"\\u0000\");",
     "      return values.length > 0;"),

    ("M25 enum mirror: claim the type's browsers for the const as well",
     "      const mirrorProv = mkProv(...mirrors);",
     "      const mirrorProv = mkProv(...present);"),

    ("M9 emit: drop the element-level no-output issue",
     '          issues.push({\n            namespace: nsName,\n            element: el.name,',
     '          if (false) issues.push({\n            namespace: nsName,\n            element: el.name,'),

    ("M10 emit: drop the namespace-level no-output issue",
     '      issues.push({\n        namespace: nsName, element: "*", kind: "namespace",',
     '      if (false) issues.push({\n        namespace: nsName, element: "*", kind: "namespace",'),
]


def run_suite(root):
    r = subprocess.run(
        ["npx", "tsx", "--test", "test/merge-issues.test.ts"],
        cwd=root, capture_output=True, text=True,
    )
    m = re.search(r"^# fail (\d+)$", r.stdout, re.M)
    return int(m.group(1)) if m else -1


def main():
    work = tempfile.mkdtemp(prefix="mutation-")
    root = os.path.join(work, "repo")
    # Copy only what the suite needs; node_modules is symlinked to stay fast.
    os.makedirs(root)
    for item in ("src", "test", "shared", "package.json", "tsconfig.json"):
        src = os.path.join(REPO, item)
        dst = os.path.join(root, item)
        shutil.copytree(src, dst) if os.path.isdir(src) else shutil.copy2(src, dst)
    os.symlink(os.path.join(REPO, "node_modules"), os.path.join(root, "node_modules"))

    baseline_src = open(os.path.join(root, "src/generator.ts")).read()
    base_fail = run_suite(root)
    print(f"unmutated suite: {base_fail} failures (expect 0)\n")

    caught = survived = skipped = 0
    for label, old, new in MUTATIONS:
        if old not in baseline_src:
            print(f"  SKIP      {label}  (pattern not found)")
            skipped += 1
            continue
        open(os.path.join(root, "src/generator.ts"), "w").write(baseline_src.replace(old, new, 1))
        fails = run_suite(root)
        if fails > 0:
            print(f"  caught    {label}  ({fails} failing)")
            caught += 1
        else:
            print(f"  SURVIVED  {label}  <-- branch not pinned")
            survived += 1
        open(os.path.join(root, "src/generator.ts"), "w").write(baseline_src)

    print(f"\ncaught {caught}, survived {survived}, skipped {skipped}")
    shutil.rmtree(work, ignore_errors=True)
    return 1 if survived or skipped else 0


if __name__ == "__main__":
    raise SystemExit(main())
