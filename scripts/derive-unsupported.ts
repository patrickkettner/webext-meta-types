/**
 * Derive the members a browser's own schema marks unsupported.
 *
 * `@types/firefox-webext-browser` declares APIs that Gecko's schemas flag
 * `"unsupported": true`, so the emitted types claim Firefox for functions
 * Firefox does not implement. The flag is a fact in the browser's source, not a
 * judgement, so the list is derived rather than curated.
 *
 * The result is committed as `excluded-members.json` because the build runs
 * where no browser checkout exists. Running this again is how the committed
 * file is checked: `--verify` fails when the derivation and the file disagree,
 * which is what stops it going stale after an upstream change.
 *
 * Usage:
 *   npx tsx scripts/derive-unsupported.ts            # rewrite the file
 *   npx tsx scripts/derive-unsupported.ts --verify   # fail if it has drifted
 */
import { execFileSync } from "child_process";
import fs from "fs";
import { loadPin } from "./verify-gecko-pin";

const PIN = loadPin("gecko-pin.json");
const FF = PIN.checkout;
const TAG = PIN.tag;
const OUT = "excluded-members.json";
const SCHEMA_DIRS = [
  "toolkit/components/extensions/schemas",
  "browser/components/extensions/schemas",
];

interface Node {
  namespace?: string;
  name?: string;
  id?: string;
  unsupported?: boolean;
  deprecated?: boolean | string;
  [k: string]: unknown;
}

function show(path: string): string | null {
  try {
    return execFileSync("git", ["show", `${TAG}:${path}`], {
      cwd: FF, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

/** Every namespace object in the schemas at the pinned tag, with its file. */
function namespaceObjects(): Array<{ file: string; ns: Node }> {
  const out: Array<{ file: string; ns: Node }> = [];
  for (const dir of SCHEMA_DIRS) {
    let listing: string;
    try {
      listing = execFileSync("git", ["ls-tree", "--name-only", `${TAG}:${dir}`], {
        cwd: FF, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {
      continue;
    }
    for (const file of listing.split("\n").filter((f) => f.endsWith(".json"))) {
      const raw = show(`${dir}/${file}`);
      if (raw === null) continue;
      const stripped = raw.split("\n").filter((l) => !l.trimStart().startsWith("//")).join("\n");
      let doc: Node[];
      try {
        doc = JSON.parse(stripped) as Node[];
      } catch {
        continue;
      }
      for (const ns of doc) if (ns?.namespace) out.push({ file: `${dir}/${file}`, ns });
    }
  }
  return out;
}

/**
 * Members flagged unsupported, at the top level of a namespace only.
 *
 * Deliberately not a recursive walk: `unsupported` also appears on individual
 * properties of parameter objects, where it means that field is ignored rather
 * than that the whole API is missing. Withdrawing a function's support claim
 * because one of its options is unsupported would be wrong.
 */
function unsupportedMembers(ns: Node): Array<{ member: string; deprecated: boolean }> {
  const out: Array<{ member: string; deprecated: boolean }> = [];
  for (const group of ["functions", "events"]) {
    for (const item of (ns[group] as Node[] | undefined) ?? []) {
      if (item?.unsupported === true && item.name) {
        out.push({ member: item.name, deprecated: Boolean(item.deprecated) });
      }
    }
  }
  // Namespace-level properties carry the flag too, and reading only functions
  // and events missed privacy.websites.protectedContentEnabled and
  // thirdPartyCookiesAllowed, both flagged in the schema.
  const props = ns.properties as Record<string, Node> | undefined;
  for (const [name, item] of Object.entries(props ?? {})) {
    if (item?.unsupported === true) {
      out.push({ member: name, deprecated: Boolean(item.deprecated) });
    }
  }
  return out;
}

/**
 * Events bound through Gecko's `ignoreEvent`, which its own comment describes
 * as "Simple API for event listeners where events never fire".
 *
 * A second, greppable way the implementation denies support that the schema
 * does not express: the entry carries no `unsupported` flag, so a schema-only
 * reader sees a working event. Named helper, so this enumerates rather than
 * pattern-matching a stub body.
 */
function ignoredEvents(): Array<Record<string, unknown>> {
  const out: Array<Record<string, unknown>> = [];
  let hits: string;
  try {
    hits = execFileSync("git", [
      "grep", "-n", 'ignoreEvent(context, "', TAG, "--",
      "toolkit/components/extensions/parent", "browser/components/extensions/parent",
    ], { cwd: FF, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return out;
  }
  for (const line of hits.split("\n")) {
    const m = /^[^:]+:([^:]+):\d+:.*ignoreEvent\(context, "([\w.]+)\.(\w+)"/.exec(line);
    if (!m) continue;
    out.push({
      namespace: m[2], member: m[3], browser: "firefox", repo: "gecko", ref: TAG,
      path: m[1], flag: "ignoreEvent: never fires", source: "schema-ignoreEvent",
    });
  }
  return out;
}

const derived: Array<Record<string, unknown>> = [...ignoredEvents()];
for (const { file, ns } of namespaceObjects()) {
  for (const { member, deprecated } of unsupportedMembers(ns)) {
    derived.push({
      namespace: ns.namespace,
      member,
      browser: "firefox",
      repo: "gecko",
      ref: TAG,
      path: file,
      flag: deprecated ? "unsupported, deprecated" : "unsupported",
      source: "schema-unsupported",
    });
  }
}
derived.sort((a, b) =>
  `${a.namespace}.${a.member}`.localeCompare(`${b.namespace}.${b.member}`));

const doc = {
  why: "Members a browser's own schema marks \"unsupported\": true, which its type " +
       "package declares anyway. Derived by scripts/derive-unsupported.ts, not curated; " +
       "re-derive with --verify to check the file against the schemas.",
  excluded: derived,
};

if (process.argv.includes("--verify")) {
  if (!fs.existsSync(OUT)) {
    console.error(`${OUT} is missing. Run: npx tsx scripts/derive-unsupported.ts`);
    process.exit(1);
  }
  // Only the schema-derived rows are this script's to own. Rows marked
  // `implementation` record a no-op stub the schema does not express, which no
  // schema-only derivation can see, so they are verified by citation instead.
  const committed = JSON.stringify(
    (JSON.parse(fs.readFileSync(OUT, "utf8")).excluded as Array<{ source?: string }>)
      .filter((e) => e.source !== "implementation")
  );
  if (committed !== JSON.stringify(derived)) {
    console.error(
      `${OUT} does not match what the schemas at ${TAG} say.\n` +
      `  committed: ${JSON.parse(committed).length} member(s)\n` +
      `  derived:   ${derived.length} member(s)\n` +
      `Re-derive it rather than editing by hand.`
    );
    process.exit(1);
  }
  console.log(`${OUT} matches the schemas at ${TAG}: ${derived.length} unsupported member(s).`);
} else {
  fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + "\n");
  console.log(`wrote ${OUT}: ${derived.length} member(s) flagged unsupported at ${TAG}`);
}
