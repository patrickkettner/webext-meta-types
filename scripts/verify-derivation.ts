/**
 * Every string literal this project emits must come from an input.
 *
 * WHY THIS EXISTS
 * The merger emitted `kind: "R"` for a browser whose source declares
 * `kind: "T"`, and claimed all three browsers for it. That is not a wrong
 * merge, it is a fabricated type: a declaration no browser makes, asserted as
 * fact, with a support claim attached.
 *
 * The cause was a text REWRITE. Every merge operation before it selected
 * between browsers' declarations or wrapped them in a union, so the emitted
 * text was always some input's text. The type-parameter rename was the first
 * operation to edit a browser's declaration and then treat the edited text as
 * that browser's evidence, and a blunt identifier replace rewrote a string
 * literal along with the parameter references.
 *
 * Nothing could have caught it. The removal harness checks patches, the
 * artifact gate checks syntax, the waiver and lag gates check claims about
 * browsers. None of them asks the question this asks: did the generator invent
 * this? Byte-identical output used to answer it implicitly, because any
 * generator change that altered a byte failed, and that check ended the day
 * Safari landed. The rename shipped in the first commit after it was gone.
 *
 * THE INVARIANT
 * A string literal in a declaration is a fact about a browser: an enum value,
 * a permission name, an event key. The generator is not entitled to invent one.
 * So every literal in every emitted artifact must appear in at least one input:
 * an upstream package, a patch override, or the preamble.
 *
 * This is deliberately a whole-artifact check rather than a per-element one. It
 * cannot tell you the literal was attributed to the RIGHT browser, which the
 * generator's own per-transformation invariant does. It tells you nothing was
 * conjured, which is the property that failed.
 */
import fs from "fs";
import path from "path";

const DIST = "dist";
const INPUTS = [
  "node_modules/chrome-types/index.d.ts",
  "node_modules/@types/firefox-webext-browser/index.d.ts",
  "node_modules/safari-webextension-types/index.d.ts",
  "src/preamble.ts",
];
const PATCH_DIR = "patches";

/** Everything the generator is allowed to draw text from. */
function inputCorpus(): string {
  let corpus = "";
  for (const f of INPUTS) {
    if (!fs.existsSync(f)) {
      console.error(`missing input ${f}. Did you run npm install?`);
      process.exit(2);
    }
    corpus += fs.readFileSync(f, "utf8");
  }
  // Patch overrides are JSON-escaped on disk, so the raw file text does not
  // contain `"custom-tab"` as it appears in the output. Parse, then take the
  // override bodies as the source text they are.
  for (const file of fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json"))) {
    const entries = JSON.parse(fs.readFileSync(path.join(PATCH_DIR, file), "utf8")) as
      Array<Record<string, unknown>>;
    for (const e of entries) {
      for (const [k, v] of Object.entries(e)) {
        if (k.startsWith("override") && typeof v === "string") corpus += v + "\n";
      }
    }
  }
  return corpus;
}

const corpus = inputCorpus();
const artifacts = fs.readdirSync(DIST).filter((f) => f.endsWith(".d.ts")).sort();
let failed = 0;

for (const file of artifacts) {
  const text = fs.readFileSync(path.join(DIST, file), "utf8");
  const literals = new Set(
    [...text.matchAll(/"([^"\n]{1,120})"/g)].map((m) => m[1])
  );
  const invented = [...literals].filter((l) => !corpus.includes(`"${l}"`)).sort();
  if (invented.length === 0) {
    console.log(`  ok     ${DIST}/${file}: ${literals.size} literal(s), all traced to an input`);
    continue;
  }
  console.log(`  FAILED ${DIST}/${file}: ${invented.length} literal(s) appear in no input`);
  for (const l of invented.slice(0, 15)) console.log(`           "${l}"`);
  if (invented.length > 15) console.log(`           ... and ${invented.length - 15} more`);
  failed++;
}

if (failed) {
  console.error(
    `\nThe generator emitted a string literal that exists in no input. A literal is a\n` +
    `fact about a browser, so this is a fabricated declaration rather than a merge\n` +
    `mistake. Find the transformation that rewrote it; do not add the literal to an\n` +
    `input to make this pass.`
  );
  process.exit(1);
}
console.log(`\nNo fabricated literals in ${artifacts.length} artifact(s).`);
