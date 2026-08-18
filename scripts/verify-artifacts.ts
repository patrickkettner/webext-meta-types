/**
 * Typecheck every declaration file this project ships.
 *
 * WHY
 * `dist/chrome-only.d.ts` had never once been typechecked. It carried 77 errors
 * before Safari arrived and 108 after, and nothing noticed: the tsd suite only
 * reaches `dist/index.d.ts`, and the repository typecheck covers `src/` and
 * `test/`, not generated output. A shipped artifact that no gate reads is an
 * artifact nobody can trust.
 *
 * Do NOT add `--skipLibCheck`. It skips declaration files wholesale, which is
 * exactly what this checks, and it made a broken artifact look clean during the
 * investigation that led here.
 *
 * Each file is checked ALONE, not as part of a program: that is how a consumer
 * receives it, and it is what catches a declaration referring to something the
 * file does not contain.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const DIST = "dist";
const files = fs.readdirSync(DIST).filter((f) => f.endsWith(".d.ts")).sort();

if (files.length === 0) {
  console.error(`No .d.ts files in ${DIST}/. Run: npm run build`);
  process.exit(2);
}

let failed = 0;
for (const file of files) {
  const target = path.join(DIST, file);
  try {
    execFileSync("npx", ["tsc", "--noEmit", "--ignoreConfig", target], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    console.log(`  ok     ${target}`);
  } catch (err) {
    const out = (err as { stdout?: string; stderr?: string });
    const text = `${out.stdout ?? ""}${out.stderr ?? ""}`.trim();
    const lines = text.split("\n").filter((l) => l.includes("error TS"));
    console.log(`  FAILED ${target}: ${lines.length} error(s)`);
    for (const l of lines.slice(0, 10)) console.log(`           ${l}`);
    if (lines.length > 10) console.log(`           ... and ${lines.length - 10} more`);
    failed++;
  }
}

if (failed) {
  console.error(
    `\n${failed} shipped artifact(s) do not typecheck. A consumer receives these files ` +
    `exactly as they are, so an unresolved reference here is a break for them, not a warning.`
  );
  process.exit(1);
}
console.log(`\nAll ${files.length} shipped declaration file(s) typecheck.`);
