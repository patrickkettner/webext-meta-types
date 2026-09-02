/**
 * Research-only analysis: reconstruct, for every patch in patches/, what the
 * upstream type package actually declares and how our override differs.
 * Emits a per-browser, per-namespace bug inventory.
 *
 * Run from the repo root:  npx tsx analyze-bugs.ts
 */
import fs from "fs";
import { Project, Node, SyntaxKind } from "ts-morph";
import {
  parseSource,
  applyPatches,
  reconcileStructuralForms,
  getSource,
  canonicalizeSignature,
  splitFunctionOverloads,
  type IRNamespace,
} from "./src/generator";

type Browser = "chrome" | "firefox";

interface Member {
  name: string;
  text: string;
  optional: boolean;
}

const scratch = new Project({ useInMemoryFileSystem: true });
let seq = 0;

function sf(src: string) {
  return scratch.createSourceFile(`__s${seq++}.d.ts`, src, { overwrite: true });
}

/**
 * Collect interface members across ALL declarations in the fragment.
 * `merge`-mode patches are stored by appending a second `interface X { ... }`
 * block, so a single-declaration read would miss the whole point of the patch.
 */
function members(src: string | undefined): Member[] | undefined {
  if (!src) return undefined;
  let file;
  try {
    file = sf(src);
  } catch {
    return undefined;
  }
  const ifaces = file.getStatements().filter(Node.isInterfaceDeclaration);
  if (!ifaces.length) return undefined;
  const out: Member[] = [];
  for (const iface of ifaces) {
    for (const m of iface.getMembers()) {
      const g = (m as unknown as { getName?: () => string }).getName;
      const name = typeof g === "function" ? g.call(m) : m.getText().split(/[(:?]/)[0].trim();
      const text = m.getText();
      out.push({
        name,
        text: canonicalizeSignature(text),
        optional: /^[^:(]*\?\s*[:(]/.test(text.replace(/\/\*[\s\S]*?\*\//g, "")),
      });
    }
  }
  return out;
}

/** Members contributed by the patch fragment itself (the delta, for merge mode). */
function fragmentMembers(src: string | undefined): Member[] {
  return members(src) ?? [];
}

function hasAny(src: string | undefined): boolean {
  if (!src) return false;
  try {
    return sf(src).getDescendantsOfKind(SyntaxKind.AnyKeyword).length > 0;
  } catch {
    return /\bany\b/.test(src);
  }
}

/** Loose upstream types that are not `any` but still carry no information. */
function weakTypes(src: string | undefined): string[] {
  if (!src) return [];
  const found = new Set<string>();
  let file;
  try {
    file = sf(src);
  } catch {
    return [];
  }
  for (const n of file.getDescendants()) {
    const k = n.getKind();
    if (k === SyntaxKind.ObjectKeyword) found.add("object");
    if (k === SyntaxKind.TypeReference) {
      const t = n.getText();
      if (t === "Object" || t === "Function") found.add(t);
    }
    if (k === SyntaxKind.TypeLiteral && n.getText().replace(/\s/g, "") === "{}") found.add("{}");
  }
  return [...found];
}

/**
 * Aggressive equality check used only to separate real defects from formatting.
 * Upstream chrome-types separates inline type-literal members with `,` while our
 * overrides use `;`, and the two event wrappers differ in name only. Neither is
 * a bug, so both are erased before comparing.
 */
function structurallyEqual(a: string | undefined, b: string | undefined): boolean {
  const strip = (s: string | undefined) =>
    (s ?? "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*/g, "")
      .replace(/\bexport\b/g, "")
      .replace(/\bWebExtEvent\b/g, "Event")
      .replace(/\bevents\.Event\b/g, "Event")
      .replace(/\|\s*undefined\b/g, "")
      .replace(/[,;\s]/g, "");
  return strip(a) === strip(b);
}

/** Underscore-prefixed generated type names in @types/firefox-webext-browser. */
function privateTypeRefs(src: string | undefined): string[] {
  return [...new Set((src ?? "").match(/\b_[A-Z]\w+/g) ?? [])];
}

function declKind(src: string | undefined): string {
  if (!src) return "absent";
  if (/\binterface\b/.test(src)) return "interface";
  if (/\btype\s+\w+\s*[<=]/.test(src)) return "type alias";
  if (/\bfunction\b/.test(src)) return "function";
  if (/\b(const|let|var)\b/.test(src)) return "variable";
  if (/\benum\b/.test(src)) return "enum";
  if (/\bclass\b/.test(src)) return "class";
  return "other";
}

function overloadSet(src: string | undefined): string[] {
  if (!src) return [];
  return splitFunctionOverloads(src)
    .map((s) => canonicalizeSignature(s, true))
    .filter(Boolean);
}

function returnType(sig: string): string {
  // last top-level `):` ... to end
  const m = sig.match(/\)\s*:\s*([^;]+);?\s*$/);
  return m ? m[1].trim() : "";
}

function hasPromise(src: string | undefined): boolean {
  return !!src && /\bPromise\s*</.test(src);
}

function buildIr(): Map<string, IRNamespace> {
  const project = new Project();
  project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
  const chromeFile = project.getSourceFileOrThrow("index.d.ts");
  const chromeNs = chromeFile.getModuleOrThrow("chrome");
  project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
  const firefoxFile = project
    .getSourceFiles()
    .filter((f) => f.getFilePath().includes("firefox-webext-browser"))[0];

  const ir = new Map<string, IRNamespace>();
  parseSource(chromeNs, "chrome", ir);
  parseSource(firefoxFile, "firefox", ir);
  reconcileStructuralForms(ir, []);
  return ir;
}

function snapshot(ir: Map<string, IRNamespace>) {
  const m = new Map<string, { chrome?: string; firefox?: string; kind: string }>();
  for (const [nsName, ns] of ir) {
    for (const [elName, el] of ns.elements) {
      m.set(`${nsName}.${elName}`, {
        chrome: getSource(el, "chrome"),
        firefox: getSource(el, "firefox"),
        kind: el.kind,
      });
    }
  }
  return m;
}

const before = snapshot(buildIr());
const irAfter = buildIr();
applyPatches(irAfter);
const after = snapshot(irAfter);

interface Finding {
  browser: Browser;
  subsystem: string;
  namespace: string;
  element: string;
  path: string;
  mode: string;
  kind: string;
  primary: string;
  categories: string[];
  filable: boolean;
  detail: string;
  upstreamWeakTypes: string[];
  addedMembers: string[];
  removedMembers: string[];
  changedMembers: string[];
  optionalityFlips: string[];
  overloadsBefore: number;
  overloadsAfter: number;
  upstreamSource?: string;
  overrideSource?: string;
}

const findings: Finding[] = [];

for (const file of fs.readdirSync("patches").sort()) {
  if (!file.endsWith(".json")) continue;
  const subsystem = file.replace(/^subsystem-\d+-/, "").replace(/\.json$/, "");
  const entries = JSON.parse(fs.readFileSync(`patches/${file}`, "utf8")) as Array<{
    namespace: string;
    element: string;
    mode: string;
    overrideChrome?: string;
    overrideFirefox?: string;
  }>;

  for (const e of entries) {
    const path = `${e.namespace}.${e.element}`;
    const targets: Array<[Browser, string | undefined]> = [
      ["chrome", e.overrideChrome],
      ["firefox", e.overrideFirefox],
    ];

    for (const [browser, override] of targets) {
      if (override === undefined) continue;
      const pre = before.get(path)?.[browser];
      const post = after.get(path)?.[browser] ?? override;

      const categories: string[] = [];
      const detailParts: string[] = [];

      const kind = declKind(pre) === "absent" ? declKind(override) : declKind(pre);
      const isFn = kind === "function";

      const canonPre = canonicalizeSignature(pre, isFn);
      const canonPost = canonicalizeSignature(post, isFn);

      const upstreamAbsent = pre === undefined;
      const upstreamAny = hasAny(pre);
      const overrideAny = hasAny(override);
      const upWeak = weakTypes(pre);
      const ovWeak = weakTypes(override);

      // Compare upstream against the patch's own body. For `merge` the body is a
      // delta (only the members being added), so diffing against the appended
      // post-state would report every upstream member as unchanged noise.
      const preM = members(pre);
      const patchM = e.mode === "merge" ? fragmentMembers(override) : members(override);
      let addedMembers: string[] = [];
      let removedMembers: string[] = [];
      const changedMembers: string[] = [];
      const optionalityFlips: string[] = [];
      let redundantMembers = 0;

      if (preM && patchM) {
        const preByName = new Map(preM.map((m) => [m.name, m]));
        const patchByName = new Map(patchM.map((m) => [m.name, m]));
        addedMembers = patchM.filter((m) => !preByName.has(m.name)).map((m) => m.name);
        // Only `replace` can drop an upstream member; `merge` never removes.
        if (e.mode === "replace") {
          removedMembers = preM.filter((m) => !patchByName.has(m.name)).map((m) => m.name);
        }
        for (const m of patchM) {
          const p = preByName.get(m.name);
          if (!p) continue;
          if (p.text !== m.text) changedMembers.push(m.name);
          else redundantMembers++;
          if (p.optional !== m.optional) {
            optionalityFlips.push(`${m.name}:${p.optional ? "opt->req" : "req->opt"}`);
          }
        }
      }

      // A merge patch that adds nothing new and changes nothing is dead weight.
      const redundantMerge =
        e.mode === "merge" &&
        !!patchM &&
        patchM.length > 0 &&
        addedMembers.length === 0 &&
        changedMembers.length === 0 &&
        redundantMembers === patchM.length;

      const olBefore = isFn ? overloadSet(pre) : [];
      const olAfter = isFn ? overloadSet(post) : [];

      const preHead = (pre ?? "").split("{")[0] ?? "";
      const ovHead = (override ?? "").split("{")[0] ?? "";
      const preGenerics = /<[^>]*>/.test(preHead.replace(/\/\*[\s\S]*?\*\//g, ""));
      const ovGenerics = /<[^>]*>/.test(ovHead.replace(/\/\*[\s\S]*?\*\//g, ""));

      // ---- classification ----
      if (upstreamAbsent) {
        // "Absent upstream" is only a defect if the name is one upstream would
        // ever have used. Synthetic private names, Firefox-only meta namespaces,
        // Chromium *Private APIs and near-miss renames are all expected misses.
        const nsElements = [...(before.keys() as Iterable<string>)]
          .filter((k) => k.startsWith(`${e.namespace}.`))
          .map((k) => k.slice(e.namespace.length + 1));
        const upstreamHasNamespace = nsElements.some(
          (n) => before.get(`${e.namespace}.${n}`)?.[browser] !== undefined
        );
        const lower = e.element.toLowerCase();
        const rename = nsElements.find((n) => {
          if (before.get(`${e.namespace}.${n}`)?.[browser] === undefined) return false;
          const nl = n.toLowerCase();
          return nl !== lower && (nl.includes(lower) || lower.includes(nl));
        });

        if (e.element.startsWith("_")) {
          categories.push("synthetic-name");
          detailParts.push("our own private/synthetic type name; upstream would never declare it");
        } else if (e.namespace === "_manifest" || /Private$/.test(e.namespace)) {
          categories.push("namespace-not-in-upstream");
          detailParts.push(`\`${e.namespace}\` is not part of the ${browser} type surface`);
        } else if (!upstreamHasNamespace) {
          categories.push("namespace-not-in-upstream");
          detailParts.push(`upstream ${browser} types declare no \`${e.namespace}\` namespace at all`);
        } else if (rename) {
          categories.push("possible-rename");
          detailParts.push(`upstream declares \`${e.namespace}.${rename}\`; likely a naming difference, not a gap`);
        } else {
          categories.push("missing-from-upstream");
          detailParts.push(`upstream declares nothing for ${path}`);
        }
      }
      if (upstreamAny && !overrideAny) {
        categories.push("upstream-any");
        detailParts.push("upstream uses `any`");
      }
      const weakRemoved = upWeak.filter((w) => !ovWeak.includes(w));
      if (weakRemoved.length) {
        categories.push("upstream-weak-type");
        detailParts.push(`upstream uses ${weakRemoved.map((w) => "`" + w + "`").join(", ")}`);
      }
      if (addedMembers.length) {
        categories.push("missing-members");
        detailParts.push(`missing member(s): ${addedMembers.join(", ")}`);
      }
      if (removedMembers.length) {
        categories.push("spurious-members");
        detailParts.push(`upstream declares member(s) we drop: ${removedMembers.join(", ")}`);
      }
      if (changedMembers.length) {
        categories.push("wrong-member-types");
        detailParts.push(`member type(s) differ: ${changedMembers.slice(0, 8).join(", ")}`);
      }
      if (optionalityFlips.length) {
        categories.push("wrong-optionality");
        detailParts.push(`optionality: ${optionalityFlips.join(", ")}`);
      }
      if (!preGenerics && ovGenerics) {
        categories.push("missing-generics");
        detailParts.push("upstream is not generic; result type is unparameterized");
      }
      if (isFn && olAfter.length > olBefore.length && olBefore.length > 0) {
        categories.push("missing-overloads");
        detailParts.push(`overloads ${olBefore.length} -> ${olAfter.length}`);
      }
      if (isFn && !hasPromise(pre) && hasPromise(override) && !upstreamAbsent) {
        categories.push("missing-promise-form");
        detailParts.push("upstream has no Promise-returning form");
      }
      if (isFn && olBefore.length === 1 && olAfter.length === 1) {
        const rb = returnType(olBefore[0]);
        const ra = returnType(olAfter[0]);
        if (rb && ra && rb !== ra) {
          categories.push("return-type-mismatch");
          detailParts.push(`return type \`${rb}\` -> \`${ra}\``);
        }
      }

      if (!categories.length) {
        if (redundantMerge) {
          categories.push("redundant-patch");
          detailParts.push(
            `merge adds ${patchM!.length} member(s) upstream already declares identically: ${patchM!
              .map((m) => m.name)
              .join(", ")}`
          );
        } else if (canonPre === canonPost || structurallyEqual(pre, override)) {
          categories.push("cosmetic-only");
          detailParts.push("structurally identical to upstream (patch is a no-op)");
        } else if (
          privateTypeRefs(pre).length > 0 &&
          privateTypeRefs(override).length === 0
        ) {
          categories.push("private-type-reference");
          detailParts.push(
            `upstream routes the payload through generated private type(s) ${privateTypeRefs(pre)
              .map((t) => "`" + t + "`")
              .join(", ")}; our override inlines the shape`
          );
        } else {
          categories.push("other-signature-diff");
          detailParts.push("signature differs after canonicalization");
        }
      }

      // Not filable as a type defect: no-op patches, patches upstream already
      // satisfies, and pure naming/shape normalization we do for cross-browser
      // merging. These are tracked separately as repo hygiene / interop notes.
      const nonFilable = [
        "cosmetic-only",
        "redundant-patch",
        "private-type-reference",
        "synthetic-name",
        "namespace-not-in-upstream",
        "possible-rename",
      ];
      const filable = !categories.some((c) => nonFilable.includes(c));

      const rank = [
        "missing-from-upstream",
        "upstream-any",
        "upstream-weak-type",
        "missing-members",
        "wrong-member-types",
        "missing-generics",
        "missing-overloads",
        "missing-promise-form",
        "return-type-mismatch",
        "wrong-optionality",
        "spurious-members",
        "other-signature-diff",
        "private-type-reference",
        "synthetic-name",
        "namespace-not-in-upstream",
        "possible-rename",
        "redundant-patch",
        "cosmetic-only",
      ];
      const primary = rank.find((r) => categories.includes(r)) ?? categories[0];

      findings.push({
        browser,
        subsystem,
        namespace: e.namespace,
        element: e.element,
        path,
        mode: e.mode,
        kind,
        primary,
        categories,
        filable,
        detail: detailParts.join("; "),
        upstreamWeakTypes: weakRemoved,
        addedMembers,
        removedMembers,
        changedMembers,
        optionalityFlips,
        overloadsBefore: olBefore.length,
        overloadsAfter: olAfter.length,
        upstreamSource: pre,
        overrideSource: override,
      });
    }
  }
}

const outDir = process.env.OUT_DIR || ".";
fs.writeFileSync(`${outDir}/upstream-bug-findings.json`, JSON.stringify(findings, null, 2));

// ---- grouped markdown inventory ----
const CATEGORY_BLURB: Record<string, string> = {
  "missing-from-upstream": "API is absent from the upstream type package entirely.",
  "upstream-any": "Upstream declares `any`, erasing all type information.",
  "upstream-weak-type": "Upstream uses `object`/`Object`/`Function`/`{}` where a precise shape is known.",
  "missing-members": "Upstream interface is missing member(s) the API actually has.",
  "wrong-member-types": "Member exists upstream but with the wrong type.",
  "missing-generics": "Upstream declaration is not generic, so results come back unparameterized.",
  "missing-overloads": "Upstream is missing one or more call signatures.",
  "missing-promise-form": "Upstream has no Promise-returning form of an async API.",
  "return-type-mismatch": "Upstream return type disagrees with observed runtime behaviour.",
  "wrong-optionality": "Member optionality disagrees with the runtime contract.",
  "spurious-members": "Upstream declares member(s) that do not exist at runtime.",
  "other-signature-diff": "Signature differs from upstream in a way needing manual triage.",
};

const SEVERITY: Record<string, string> = {
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
};

let md = "# Upstream type bugs, by browser\n\n";
md += `Generated by \`analyze-bugs.ts\` against \`chrome-types\` and \`@types/firefox-webext-browser\` as pinned in package.json.\n\n`;
md += `Total patch/browser pairs analysed: **${findings.length}**. Filable as upstream type defects: **${findings.filter((f) => f.filable).length}**.\n\n`;

const TRACKER: Record<Browser, string> = {
  chrome: "chrome-types (GoogleChrome/chrome-types). Root cause is usually the Chromium `.idl`/`.json` extension schema, so most fixes land at crbug.com",
  firefox: "@types/firefox-webext-browser (DefinitelyTyped). Root cause is usually the Gecko `schemas/*.json`, so some fixes land at bugzilla.mozilla.org",
};

for (const b of ["chrome", "firefox"] as Browser[]) {
  const list = findings.filter((f) => f.browser === b && f.filable);
  md += `\n## ${b === "chrome" ? "Chrome / Chromium" : "Firefox / Gecko"}\n\n`;
  md += `Tracker: ${TRACKER[b]}\n\n`;
  md += `Filable findings: **${list.length}**\n\n`;

  const byCat = new Map<string, Finding[]>();
  for (const f of list) {
    if (!byCat.has(f.primary)) byCat.set(f.primary, []);
    byCat.get(f.primary)!.push(f);
  }
  const order = Object.keys(SEVERITY).filter((c) => byCat.has(c));
  md += `| Category | Severity | Count |\n|---|---|---|\n`;
  for (const c of order) md += `| ${c} | ${SEVERITY[c]} | ${byCat.get(c)!.length} |\n`;
  md += "\n";

  for (const c of order) {
    md += `### ${c} (${byCat.get(c)!.length}), severity ${SEVERITY[c]}\n\n`;
    md += `${CATEGORY_BLURB[c]}\n\n`;
    const rows = byCat.get(c)!.sort((x, y) => x.path.localeCompare(y.path));
    md += `| API | Kind | Detail |\n|---|---|---|\n`;
    for (const f of rows) {
      md += `| \`${f.path}\` | ${f.kind} | ${f.detail.replace(/\|/g, "\\|")} |\n`;
    }
    md += "\n";
  }
}

md += `\n## Not filable as upstream defects\n\n`;
for (const c of [
  "cosmetic-only",
  "redundant-patch",
  "private-type-reference",
  "synthetic-name",
  "namespace-not-in-upstream",
  "possible-rename",
]) {
  const rows = findings.filter((f) => f.primary === c);
  md += `### ${c} (${rows.length})\n\n`;
  md += `| API | Browser |\n|---|---|\n`;
  for (const f of rows.sort((x, y) => x.path.localeCompare(y.path))) {
    md += `| \`${f.path}\` | ${f.browser} |\n`;
  }
  md += "\n";
}

fs.writeFileSync(`${outDir}/UPSTREAM-BUGS-BY-BROWSER.md`, md);

console.log(`Total findings: ${findings.length}  filable: ${findings.filter((f) => f.filable).length}`);
for (const b of ["chrome", "firefox"] as Browser[]) {
  const fs_ = findings.filter((f) => f.browser === b);
  console.log(`\n=== ${b.toUpperCase()} (${fs_.length}, filable ${fs_.filter((f) => f.filable).length}) ===`);
  const cats = new Map<string, number>();
  for (const f of fs_) cats.set(f.primary, (cats.get(f.primary) ?? 0) + 1);
  for (const [c, n] of [...cats].sort((a, b2) => b2[1] - a[1])) console.log(`  ${c}: ${n}`);
  const ns = new Map<string, number>();
  for (const f of fs_.filter((x) => x.filable)) ns.set(f.namespace, (ns.get(f.namespace) ?? 0) + 1);
  console.log(`  namespaces (filable): ${ns.size}`);
}
