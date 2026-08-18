/**
 * A patch that claims a browser its own input does not declare must cite the
 * browser's source, and the citation must still say what it claims.
 *
 * The merger may only assert what its inputs declare, which verify:derivation
 * enforces. The patch layer is the one place allowed past that, so the
 * exemption carries a cost: name the browser source, at a revision, with the
 * text.
 *
 * TWO PARTS, deliberately split by what the environment can do.
 *
 *   presence  Runs everywhere, needs only node_modules. Any override claiming a
 *             browser whose package does not declare the element must carry an
 *             evidence item for that browser, or be in the baseline below. New
 *             claims fail immediately; the baseline may only shrink.
 *
 *   resolve   `--resolve`, runs only where the browser checkouts exist. Re-reads
 *             every citation at its pinned revision and fails if the quoted text
 *             is no longer there.
 *
 * The baseline holds the claims that predate this rule. They are recorded
 * rather than accepted, and the count may only decrease.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import {
  buildIr,
  hasSource,
  overrideKey,
  BROWSER_ORDER,
  type BrowserId,
} from "../src/generator";

const BASELINE = "evidence-baseline.json";
const PATCH_DIR = "patches";

/** Where a cited repo lives, when it is on disk at all. */
const REPOS: Record<string, string> = {
  chromium: "/home/pdk/chromium/src",
  gecko: "/home/pdk/firefox",
  webkit: "/home/pdk/webkit",
};

interface EvidenceItem {
  browser: string;
  repo: string;
  ref: string;
  path: string;
  quote: string;
}

interface PatchEntry {
  namespace: string;
  element: string;
  evidence?: EvidenceItem[];
  [k: string]: unknown;
}

const ir = buildIr();

// ---- collect claims and citations -------------------------------------------
const entries: Array<{ file: string; e: PatchEntry }> = [];
for (const file of fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort()) {
  for (const e of JSON.parse(fs.readFileSync(`${PATCH_DIR}/${file}`, "utf8")) as PatchEntry[]) {
    entries.push({ file, e });
  }
}

const beyondInput: Array<{ key: string; browser: BrowserId; e: PatchEntry }> = [];
for (const { e } of entries) {
  for (const b of BROWSER_ORDER) {
    if (e[overrideKey(b)] === undefined) continue;
    const el = ir.get(e.namespace)?.elements.get(e.element);
    if (el && hasSource(el, b)) continue;
    beyondInput.push({ key: `${b}|${e.namespace}.${e.element}`, browser: b, e });
  }
}

const baseline: string[] = fs.existsSync(BASELINE)
  ? JSON.parse(fs.readFileSync(BASELINE, "utf8")).unevidenced ?? []
  : [];
const known = new Set(baseline);

const cited = (e: PatchEntry, b: BrowserId) =>
  (e.evidence ?? []).some((ev) => ev.browser === b);

const unevidenced = beyondInput.filter(({ e, browser }) => !cited(e, browser));
const fresh = unevidenced.filter(({ key }) => !known.has(key));
const stale = [...known].filter((k) => !unevidenced.some((u) => u.key === k));

if (process.argv.includes("--record")) {
  fs.writeFileSync(BASELINE, JSON.stringify({
    why: "Overrides claiming a browser whose own package does not declare the element, " +
         "with no citation. Inherited from the corpus and recorded, not blessed. " +
         "The list may only shrink; a new claim must cite the browser's source.",
    unevidenced: unevidenced.map((u) => u.key).sort(),
  }, null, 2) + "\n");
  console.log(`recorded ${unevidenced.length} unevidenced claim(s)`);
  process.exit(0);
}

console.log(`claims beyond their input : ${beyondInput.length}`);
console.log(`  cited                   : ${beyondInput.length - unevidenced.length}`);
console.log(`  unevidenced, in baseline: ${unevidenced.length - fresh.length}`);
console.log(`  unevidenced, NEW        : ${fresh.length}`);
if (stale.length) console.log(`  baseline entries now gone: ${stale.length} (run --record to shrink)`);

let failed = fresh.length > 0;
for (const f of fresh) {
  console.error(`  NEW UNCITED CLAIM  ${f.key}`);
}

// ---- resolve citations against the checkouts --------------------------------
/** Citations that are not attached to a patch entry. */
function standaloneCitations(): Array<{ label: string; ev: EvidenceItem }> {
  const out: Array<{ label: string; ev: EvidenceItem }> = [];
  const file = "excluded-namespaces.json";
  if (!fs.existsSync(file)) return out;
  const doc = JSON.parse(fs.readFileSync(file, "utf8")) as {
    excluded: Array<EvidenceItem & { namespace: string }>;
  };
  for (const e of doc.excluded) {
    out.push({ label: `excluded namespace ${e.namespace}`, ev: e });
  }
  return out;
}

if (process.argv.includes("--resolve")) {
  let checked = 0;
  const all: Array<{ file: string; label: string; ev: EvidenceItem }> = [
    ...entries.flatMap(({ file, e }) =>
      (e.evidence ?? []).map((ev) => ({ file, label: `${e.namespace}.${e.element}`, ev }))),
    ...standaloneCitations().map((c) => ({ file: "excluded-namespaces.json", ...c })),
  ];
  {
    for (const { file, label: lbl, ev } of all) {
      const root = REPOS[ev.repo];
      if (!root || !fs.existsSync(root)) {
        console.log(`  SKIP    ${lbl}: no checkout for ${ev.repo}`);
        continue;
      }
      checked++;
      let text: string;
      try {
        text = execFileSync("git", ["show", `${ev.ref}:${ev.path}`], {
          cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
          stdio: ["ignore", "pipe", "ignore"],
        });
      } catch {
        console.error(`  FAILED  ${lbl} (${file}): ${ev.path} not found at ${ev.ref}`);
        failed = true;
        continue;
      }
      const norm = (s: string) => s.replace(/\s+/g, " ").trim();
      if (!norm(text).includes(norm(ev.quote))) {
        console.error(
          `  FAILED  ${lbl} (${file}): quoted text is not in ${ev.path} at ${ev.ref}\n` +
          `            quote: ${ev.quote.slice(0, 90)}`
        );
        failed = true;
        continue;
      }
      console.log(`  ok      ${lbl} <- ${ev.repo}:${ev.path}`);
    }
  }
  console.log(`\n${checked} citation(s) resolved against a checkout.`);
}

if (failed) {
  console.error(
    `\nA patch may claim a browser its input does not declare, but only with a\n` +
    `citation that still resolves. Add an evidence item naming the repo, revision,\n` +
    `path and quoted text, or drop the claim.`
  );
  process.exit(1);
}
