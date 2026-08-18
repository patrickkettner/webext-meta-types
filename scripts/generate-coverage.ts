/**
 * Report which browsers declare each namespace and element.
 *
 * Built from the same IR the generator uses, via the same parseSource, rather
 * than from a second parser of its own. One parse means the report cannot drift
 * from the output it describes, and a new browser needs no change here at all:
 * the columns come from BROWSER_ORDER.
 */
import fs from "fs";
import { buildIr, browsersOf, BROWSER_ORDER } from "../src/generator";
import type { CoverageManifest } from "../shared/coverage-types";

const ir = buildIr();

const manifest: CoverageManifest = { namespaces: Object.create(null) };

for (const [nsName, ns] of [...ir.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const entry = manifest.namespaces[nsName] = { elements: Object.create(null) } as
    CoverageManifest["namespaces"][string];
  for (const [elName, el] of [...ns.elements.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const declaring = browsersOf(el);
    if (declaring.length === 0) continue;
    const row: Record<string, unknown> = { kind: el.kind };
    for (const b of declaring) {
      row[b] = true;
      entry[b] = true;
    }
    entry.elements[elName] = row as CoverageManifest["namespaces"][string]["elements"][string];
  }
}

fs.writeFileSync("coverage.json", JSON.stringify(manifest, null, 2) + "\n");

const label = (b: string) => b[0].toUpperCase() + b.slice(1);
let md = `# API Coverage Status\n\nTotal Namespaces: ${Object.keys(manifest.namespaces).length}\n`;
for (const [nsName, ns] of Object.entries(manifest.namespaces)) {
  md += `\n## \`${nsName}\`\n\n`;
  md += `| Element | ${BROWSER_ORDER.map(label).join(" | ")} |\n`;
  md += `|---|${BROWSER_ORDER.map(() => "---").join("|")}|\n`;
  for (const [elName, el] of Object.entries(ns.elements)) {
    const cells = BROWSER_ORDER.map((b) => ((el as Record<string, unknown>)[b] ? "✅" : "❌"));
    md += `| \`${elName}\` | ${cells.join(" | ")} |\n`;
  }
}
fs.writeFileSync("COVERAGE.md", md);
console.log(`Generated coverage.json and COVERAGE.md`);
