/**
 * Ratchet: the number of cross-browser union fallbacks must never increase.
 *
 * When the merger cannot collapse Chrome's and Firefox's declarations of the
 * same API, it gives up and emits a two-arm union plus:
 *
 *   @note type differs between browsers; emitted as a union
 *
 * That note is the single best health signal this project has. Every one is an
 * API where a consumer sees `A | B` instead of one clean type, and the whole
 * point of the patch layer is to drive the count down.
 *
 * This would have caught the 2026-08-15 near-miss instantly: the proposed
 * deletion of 80 "dead" patches raised the count sharply, because 60 of them
 * existed precisely to force convergence. A single integer compared against a
 * committed baseline beats any amount of reading.
 *
 * Usage:
 *   npx tsx scripts/ratchet-union-notes.ts            # check against baseline
 *   npx tsx scripts/ratchet-union-notes.ts --update   # lower the baseline after a real improvement
 */
import fs from "fs";

const DIST = "dist/index.d.ts";
const BASELINE_FILE = "union-note-baseline.json";
// The merger emits TWO wordings for the same failure. Counting only one of
// them missed 51 of 103 occurrences on the first attempt, so match the shared
// suffix and report the breakdown.
const NOTES = [
  "@note type differs between browsers; emitted as a union",
  "@note definitions differ between browsers; emitted as a union",
] as const;
const SUFFIX = "emitted as a union";

if (!fs.existsSync(DIST)) {
  console.error(`${DIST} not found. Run: npm run build`);
  process.exit(2);
}

const content = fs.readFileSync(DIST, "utf8");
const count = content.split(SUFFIX).length - 1;
const breakdown = NOTES.map((n) => `${n.replace("@note ", "")}: ${content.split(n).length - 1}`);

/**
 * Union fallbacks grouped by the browsers they span.
 *
 * A single total cannot distinguish the two things that move it. When Safari
 * arrived, 31 declarations that were already Chrome/Firefox unions simply
 * gained a third arm: the total rose by 19 while the Chrome/Firefox count FELL
 * from 103 to 72, and nothing had stopped converging. Bumping one number to
 * make that green would have hidden the next real regression underneath the
 * same movement, so each browser set carries its own baseline and each may only
 * decrease.
 */
function bySupportSet(text: string): Record<string, number> {
  const out: Record<string, number> = {};
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes(SUFFIX)) continue;
    for (let j = i - 1; j >= 0 && j > i - 4; j--) {
      const m = /@supported ([^*\n]+)/.exec(lines[j]);
      if (m) {
        const key = m[1].trim();
        out[key] = (out[key] ?? 0) + 1;
        break;
      }
    }
  }
  return out;
}

const groups = bySupportSet(content);
const update = process.argv.includes("--update");

if (!fs.existsSync(BASELINE_FILE) || update) {
  fs.writeFileSync(BASELINE_FILE, JSON.stringify({ unionNotes: count, bySupport: groups }, null, 2) + "\n");
  console.log(`baseline ${update ? "updated" : "created"}: ${count} union fallbacks`);
  for (const [k, v] of Object.entries(groups).sort()) console.log(`  ${k}: ${v}`);
  process.exit(0);
}

const doc = JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8")) as {
  unionNotes: number;
  bySupport?: Record<string, number>;
};
const baseline = doc.unionNotes;
const baseGroups = doc.bySupport ?? {};

console.log(`union fallbacks: ${count} (baseline ${baseline})`);
for (const b of breakdown) console.log(`  ${b}`);
console.log("  by the browsers each spans:");
for (const k of [...new Set([...Object.keys(baseGroups), ...Object.keys(groups)])].sort()) {
  const was = baseGroups[k] ?? 0;
  const now = groups[k] ?? 0;
  console.log(`    ${k.padEnd(26)} ${String(now).padStart(4)} (baseline ${was})`);
}

// Every set present in EITHER record, not just the baseline's. Iterating only
// the baseline's keys let a union under a brand new support set through: a
// Safari-only union took the total past the baseline and still exited 0,
// because the per-set loop never looked at a key it had not seen before.
const worsened = [...new Set([...Object.keys(baseGroups), ...Object.keys(groups)])]
  .filter((k) => (groups[k] ?? 0) > (baseGroups[k] ?? 0));
if (worsened.length) {
  console.error(`\nFAILED: a browser set stopped converging:`);
  for (const k of worsened) console.error(`  ${k}: ${baseGroups[k] ?? 0} -> ${groups[k] ?? 0}`);
  console.error("Regenerate and inspect dist/index.d.ts before considering a patch.");
  process.exit(1);
}

if (count > baseline && Object.keys(baseGroups).length === 0) {
  console.error(
    `\nFAILED: ${count - baseline} more cross-browser union fallback(s) than the baseline.\n` +
      `Something stopped converging. Regenerate and inspect:\n` +
      `  grep -n "${SUFFIX}" ${DIST}\n` +
      `If the increase is genuinely correct, raise the baseline deliberately with --update ` +
      `and say why in the commit message.`
  );
  process.exit(1);
}

if (count < baseline) {
  console.log(
    `\nImproved by ${baseline - count}. Lock it in:\n` +
      `  npx tsx scripts/ratchet-union-notes.ts --update`
  );
}
