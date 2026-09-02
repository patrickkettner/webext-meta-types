/**
 * Classify WHAT each override actually does, empirically.
 *
 * The bug inventory claims 181 overrides correspond to filable upstream
 * defects. That claim came from the same text-comparison classifier that was
 * 75% wrong about patch necessity, so it needs an independent check.
 *
 * This one removes each override, regenerates the affected namespace, and looks
 * at the SHAPE of the resulting diff:
 *
 *   CONVERGENCE  removing it makes the merger emit a cross-browser union
 *                ("@note type differs between browsers; emitted as a union"),
 *                or only reshuffles formatting. There is no upstream defect
 *                here; the patch exists so two equivalent declarations collapse.
 *
 *   ANNOTATION   the only change is the "@note Upstream type inaccuracy patched"
 *                line disappearing. The patch changes no type at all.
 *
 *   SUBSTANTIVE  removing it changes actual type text beyond a union wrapper:
 *                a member appears/disappears, a type name changes, an `any`
 *                comes back. These are the credible upstream-defect candidates.
 *
 * Only SUBSTANTIVE overrides can possibly be upstream bugs worth filing.
 * CONVERGENCE and ANNOTATION ones are mislabelled by `bug_url: "TBD"`.
 */
import fs from "fs";
import os from "os";
import path from "path";
import { Project } from "ts-morph";
import {
  parseSource,
  applyPatches,
  reconcileStructuralForms,
  emitDtsDetailed,
  type IRNamespace,
} from "./src/generator";

type Browser = "chrome" | "firefox";
const OVERRIDE_KEY: Record<Browser, "overrideChrome" | "overrideFirefox"> = {
  chrome: "overrideChrome",
  firefox: "overrideFirefox",
};

interface PatchEntry {
  namespace: string;
  element: string;
  overrideChrome?: string;
  overrideFirefox?: string;
  overrideShared?: string;
  [k: string]: unknown;
}

const PATCH_DIR = "patches";
const patchFileNames = fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort();
const ORIGINAL = new Map<string, string>();
for (const f of patchFileNames) ORIGINAL.set(f, fs.readFileSync(path.join(PATCH_DIR, f), "utf8"));

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "patch-effect-"));
const variantDir = path.join(scratch, "patches");
fs.mkdirSync(variantDir);

function writeVariant(omit?: { namespace: string; element: string; browser: Browser }): boolean {
  let found = false;
  for (const f of patchFileNames) {
    const entries = JSON.parse(ORIGINAL.get(f)!) as PatchEntry[];
    const kept: PatchEntry[] = [];
    for (const e of entries) {
      if (omit && e.namespace === omit.namespace && e.element === omit.element &&
          OVERRIDE_KEY[omit.browser] in e) {
        delete e[OVERRIDE_KEY[omit.browser]];
        found = true;
        if (!("overrideChrome" in e) && !("overrideFirefox" in e) && !("overrideShared" in e)) continue;
      }
      kept.push(e);
    }
    fs.writeFileSync(path.join(variantDir, f), JSON.stringify(kept, null, 2) + "\n");
  }
  return omit ? found : true;
}

const project = new Project();
project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
const chromeNs = project.getSourceFileOrThrow("index.d.ts").getModuleOrThrow("chrome");
project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
const firefoxFile = project.getSourceFiles()
  .filter((f) => f.getFilePath().includes("firefox-webext-browser"))[0];

const baseIr = new Map<string, IRNamespace>();
parseSource(chromeNs, "chrome", baseIr);
parseSource(firefoxFile, "firefox", baseIr);
reconcileStructuralForms(baseIr, []);

function cloneIr(src: Map<string, IRNamespace>): Map<string, IRNamespace> {
  const out = new Map<string, IRNamespace>();
  for (const [nsName, ns] of src) {
    out.set(nsName, { name: ns.name, elements: new Map([...ns.elements].map(([k, v]) => [k, {
      ...v,
      sources: new Map(v.sources),
      typeParams: new Map(v.typeParams),
    }])) });
  }
  return out;
}

function emitNamespace(patchDir: string, nsName: string): string {
  const ir = cloneIr(baseIr);
  applyPatches(ir, patchDir);
  const one = new Map<string, IRNamespace>();
  const ns = ir.get(nsName);
  if (ns) one.set(nsName, ns);
  return emitDtsDetailed(one).dts;
}

/** Extract only the declaration block for one element, so the diff is scoped. */
function blockFor(dts: string, element: string): string {
  const lines = dts.split("\n");
  const out: string[] = [];
  const re = new RegExp(`\\b(interface|type|function|const|let|var|namespace|enum|class)\\s+${element}\\b`);
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      let start = i;
      while (start > 0 && (lines[start - 1].trim().startsWith("*") ||
             lines[start - 1].trim().startsWith("/**") || lines[start - 1].trim() === "*/")) start--;
      let depth = 0, j = i, seen = false;
      for (; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === "{") { depth++; seen = true; }
          else if (ch === "}") depth--;
        }
        if ((seen && depth <= 0) || (!seen && lines[j].includes(";"))) break;
      }
      out.push(lines.slice(start, j + 1).join("\n"));
    }
  }
  return out.join("\n");
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

interface Row {
  browser: Browser;
  namespace: string;
  element: string;
  path: string;
  effect: "CONVERGENCE" | "ANNOTATION" | "SUBSTANTIVE" | "INERT" | "ERROR";
  emitsUnionWithout: boolean;
  evidence: string;
  withPatch: string;
  withoutPatch: string;
}

const rows: Row[] = [];

try {
  writeVariant();
  const baselineByNs = new Map<string, string>();

  const work: Array<{ e: PatchEntry; browser: Browser }> = [];
  for (const f of patchFileNames) {
    for (const e of JSON.parse(ORIGINAL.get(f)!) as PatchEntry[]) {
      if (e.overrideChrome !== undefined) work.push({ e, browser: "chrome" });
      if (e.overrideFirefox !== undefined) work.push({ e, browser: "firefox" });
    }
  }
  for (const { e } of work) {
    if (!baselineByNs.has(e.namespace)) baselineByNs.set(e.namespace, emitNamespace(variantDir, e.namespace));
  }

  let i = 0;
  for (const { e, browser } of work) {
    i++;
    try {
      writeVariant({ namespace: e.namespace, element: e.element, browser });
      const after = emitNamespace(variantDir, e.namespace);
      const before = baselineByNs.get(e.namespace)!;

      const bBlock = blockFor(before, e.element);
      const aBlock = blockFor(after, e.element);

      let effect: Row["effect"];
      let evidence = "";
      const emitsUnion = /emitted as a union/.test(aBlock) && !/emitted as a union/.test(bBlock);

      if (after === before) {
        effect = "INERT";
        evidence = "removing the override changes nothing";
      } else if (emitsUnion) {
        effect = "CONVERGENCE";
        evidence = "without the patch the merger emits a cross-browser union instead of one type";
      } else {
        // Strip the patch-provenance annotation and compare the remaining type text.
        const strip = (s: string) =>
          norm(s.replace(/\*\s*@note Upstream type inaccuracy patched \(Bug URL: TBD\)/g, "")
                .replace(/\/\*\*|\*\/|^\s*\*/gm, ""));
        if (strip(bBlock) === strip(aBlock)) {
          effect = "ANNOTATION";
          evidence = "only the '@note Upstream type inaccuracy patched' line differs";
        } else {
          effect = "SUBSTANTIVE";
          evidence = "declaration text changes beyond annotation or union wrapping";
        }
      }

      rows.push({
        browser, namespace: e.namespace, element: e.element,
        path: `${e.namespace}.${e.element}`, effect,
        emitsUnionWithout: emitsUnion, evidence,
        withPatch: norm(bBlock).slice(0, 600),
        withoutPatch: norm(aBlock).slice(0, 600),
      });
    } catch (err) {
      rows.push({
        browser, namespace: e.namespace, element: e.element, path: `${e.namespace}.${e.element}`,
        effect: "ERROR", emitsUnionWithout: false,
        evidence: err instanceof Error ? err.message.split("\n")[0] : String(err),
        withPatch: "", withoutPatch: "",
      });
    }
    if (i % 75 === 0) console.log(`  ... ${i}/${work.length}`);
  }
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
  for (const f of patchFileNames) {
    if (fs.readFileSync(path.join(PATCH_DIR, f), "utf8") !== ORIGINAL.get(f)) {
      console.error(`FATAL: ${f} changed. Run: git checkout -- patches/`);
      process.exit(2);
    }
  }
}

fs.writeFileSync("patch-effect-results.json", JSON.stringify(rows, null, 2));

const counts = new Map<string, number>();
for (const r of rows) counts.set(r.effect, (counts.get(r.effect) ?? 0) + 1);
console.log("\n=== EFFECT OF EACH OVERRIDE (all 298) ===");
for (const [k, v] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);

// Cross-reference against the bug inventory's "filable" claim.
const findings = JSON.parse(fs.readFileSync("upstream-bug-findings.json", "utf8")) as Array<{
  browser: Browser; path: string; filable: boolean; primary: string;
}>;
const effectByKey = new Map(rows.map((r) => [`${r.browser}|${r.path}`, r]));
const filable = findings.filter((f) => f.filable);
const mismatch = filable.filter((f) => {
  const e = effectByKey.get(`${f.browser}|${f.path}`);
  return e && e.effect !== "SUBSTANTIVE";
});

console.log(`\n=== CROSS-CHECK: inventory claims ${filable.length} filable upstream bugs ===`);
const byEffect = new Map<string, number>();
for (const f of filable) {
  const e = effectByKey.get(`${f.browser}|${f.path}`);
  const k = e ? e.effect : "NOT-TESTED";
  byEffect.set(k, (byEffect.get(k) ?? 0) + 1);
}
for (const [k, v] of [...byEffect].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log(`\n${mismatch.length} claimed-filable overrides do NOT change any type text.`);
fs.writeFileSync("filable-cross-check.json", JSON.stringify(mismatch, null, 2));
console.log("wrote patch-effect-results.json and filable-cross-check.json");
