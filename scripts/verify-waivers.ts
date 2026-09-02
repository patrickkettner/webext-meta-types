/**
 * Re-check every degradation waiver against the Gecko schema it cites.
 *
 * WHY
 * A waiver says "this patch deliberately drops an upstream member, and here is
 * why that is correct". Until now the "why" was a prose string that nobody
 * re-read: `"omnibox.json@FIREFOX_143_0_RELEASE type SuggestResult: both have
 * unsupported: true"`. That is an assertion, not a check. If Firefox ships the
 * member later, the waiver keeps silently excusing a real regression.
 *
 * This turns each waiver into a machine check: open the cited schema at the
 * cited tag, find the member, and confirm it really carries `"unsupported":
 * true`. A waiver whose justification no longer holds fails the build.
 *
 * Requires the local mozilla-central checkout, so it is not part of
 * `npm run check` (the enforcement environment has no browser sources). Run it
 * whenever waivers change or the pinned Firefox version moves.
 *
 * Usage: npx tsx scripts/verify-waivers.ts
 */
import { execFileSync } from "child_process";
import fs from "fs";

const FF = "/home/pdk/firefox";
const WAIVERS = "patch-waivers.json";

interface Waiver {
  namespace: string;
  element: string;
  browser: string;
  members: string[];
  reason: string;
  evidence: string;
}

/** Schema file for a namespace, both candidate roots. */
const SCHEMA_DIRS = [
  "toolkit/components/extensions/schemas",
  "browser/components/extensions/schemas",
];
const SCHEMA_FILE: Record<string, string> = {
  webNavigation: "web_navigation.json",
  webRequest: "web_request.json",
  notifications: "notifications.json",
  omnibox: "omnibox.json",
  "devtools.inspectedWindow": "devtools_inspected_window.json",
};

function show(ref: string, path: string): string | null {
  try {
    // stdio pipe on stderr: probing both schema roots means one `git show`
    // legitimately fails per lookup, and printing that noise trains readers to
    // ignore this tool's output.
    return execFileSync("git", ["show", `${ref}:${path}`], {
      cwd: FF, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function loadSchema(ref: string, namespace: string): unknown[] | null {
  const file = SCHEMA_FILE[namespace] ?? `${namespace}.json`;
  for (const dir of SCHEMA_DIRS) {
    const raw = show(ref, `${dir}/${file}`);
    if (raw === null) continue;
    const stripped = raw.split("\n").filter((l) => !l.trimStart().startsWith("//")).join("\n");
    try {
      return JSON.parse(stripped) as unknown[];
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Is `member` marked unsupported anywhere in this namespace's schema?
 *
 * Deliberately a whole-namespace search rather than a path lookup: the same
 * member appears on types, on event parameters and on function parameters, and
 * the waiver names the emitted element, not the schema path. A false negative
 * here fails the build, which is the safe direction.
 */
function unsupportedSomewhere(node: unknown, member: string): boolean {
  if (Array.isArray(node)) return node.some((n) => unsupportedSomewhere(n, member));
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const props = obj.properties as Record<string, unknown> | undefined;
    const hit = props?.[member] as Record<string, unknown> | undefined;
    if (hit && hit.unsupported === true) return true;
    return Object.values(obj).some((v) => unsupportedSomewhere(v, member));
  }
  return false;
}

const doc = JSON.parse(fs.readFileSync(WAIVERS, "utf8"));
const tag: string = doc.verified?.tag ?? "FIREFOX_143_0_RELEASE";
const waivers: Waiver[] = doc.waivers ?? [];

console.log(`Re-checking ${waivers.length} waiver(s) against ${tag}\n`);

let failures = 0;
let checked = 0;
for (const w of waivers) {
  if (w.browser !== "firefox") {
    console.log(`  SKIP    ${w.namespace}.${w.element} (${w.browser}: no source oracle wired)`);
    continue;
  }
  const schema = loadSchema(tag, w.namespace);
  if (!schema) {
    console.log(`  ERROR   ${w.namespace}.${w.element}: schema not found at ${tag}`);
    failures++;
    continue;
  }
  for (const member of w.members) {
    checked++;
    if (unsupportedSomewhere(schema, member)) {
      console.log(`  ok      ${w.namespace}.${w.element}.${member}`);
    } else {
      console.log(
        `  FAILED  ${w.namespace}.${w.element}.${member}\n` +
        `          the waiver claims this is unsupported in Firefox, but the schema at\n` +
        `          ${tag} does not mark it "unsupported": true. Either Firefox now\n` +
        `          implements it (drop the waiver and restore the member) or the waiver\n` +
        `          was wrong.`
      );
      failures++;
    }
  }
}

console.log(`\n${checked} member claim(s) checked, ${failures} failed.`);
if (failures) {
  console.error("Waiver justifications no longer hold. Do not ship on a stale waiver.");
  process.exit(1);
}
console.log("Every waiver's justification still holds at the pinned version.");
