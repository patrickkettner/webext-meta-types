/**
 * Prove, per override, whether a patch actually changes the emitted types.
 *
 * WHY THIS EXISTS
 * ---------------
 * A patch looks removable when its body reads the same as the upstream
 * declaration. That reasoning is wrong. It produced a 75% false-positive rate
 * in a 2026-08-15 audit that proposed deleting 80 overrides: 60 of the 80 were
 * load-bearing.
 *
 * A patch does not only correct upstream errors. It also forces CONVERGENCE.
 * Chrome separates members of an inline type literal with `,` and Firefox with
 * `;`. That is invisible to a TypeScript reader and invisible to a
 * whitespace-insensitive string compare, but it is NOT equal to
 * `mergeVariable`/`unionMember`, which compare canonicalized text. Without the
 * patch the merger cannot collapse the two declarations, so it emits a two-arm
 * union instead of one clean type:
 *
 *   with patch:     events.Event<(id: string, changeInfo: {...}) => void>
 *   without patch:  events.Event<(...chrome form...)> | events.Event<(...firefox form...)>
 *                   plus "@note type differs between browsers; emitted as a union"
 *
 * A patch can be textually redundant and behaviourally essential at the same
 * time. Reading cannot tell the two apart. Only removal can.
 *
 * WHAT THIS DOES
 * --------------
 * For every override in patches/, removes just that one key, regenerates, and
 * compares the emitted declarations for the affected namespace.
 *
 *   output identical  -> INERT, contributes nothing, safe to delete
 *   output changed    -> LOAD-BEARING, keep it
 *
 * Exits non-zero when any INERT override exists, so dead patches cannot
 * accumulate unnoticed.
 *
 * It never writes to `patches/`. Variants go to a scratch directory, because a
 * tool that mutates tracked files will eventually be interrupted mid-run and
 * leave them mutated. That happened while building this script.
 *
 * Usage:
 *   npx tsx scripts/verify-patch-necessity.ts [--json out.json] [--filter <substring>]
 */
import fs from "fs";
import os from "os";
import path from "path";
import { Project, Node, type SourceFile } from "ts-morph";
import {
  buildIr,
  applyPatches,
  emitDtsDetailed,
  type IRNamespace,
  overrideKey,
  BROWSER_ORDER,
  type BrowserId,
} from "../src/generator";

// Targets are DERIVED from BROWSER_ORDER, never listed by hand. An earlier
// version enumerated two keys literally, so an entry carrying only
// `overrideShared` was applied by the generator, never removal-tested, and this
// tool still reported INERT: 0. Adding a browser must not be able to reopen
// that hole, so the key list comes from the same place the generator's does.
type Target = BrowserId | "shared";
const TARGETS: Target[] = [...BROWSER_ORDER, "shared"];
const OVERRIDE_KEY = (t: Target): string =>
  t === "shared" ? "overrideShared" : overrideKey(t);
const ALL_OVERRIDE_KEYS = TARGETS.map(OVERRIDE_KEY);

interface PatchEntry {
  namespace: string;
  element: string;
  mode?: string;
  [k: string]: unknown;
}

const PATCH_DIR = "patches";
const patchFileNames = fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort();
const ORIGINAL = new Map<string, string>();
for (const f of patchFileNames) {
  ORIGINAL.set(f, fs.readFileSync(path.join(PATCH_DIR, f), "utf8"));
}

const memberProject = new Project({ useInMemoryFileSystem: true });
let memberSeq = 0;

/**
 * Waivers for overrides that intentionally drop an upstream member.
 * A waiver must name the exact members and cite evidence; see patch-waivers.json.
 * Anything dropped WITHOUT a waiver is treated as a defect.
 */
interface Waiver {
  namespace: string;
  element: string;
  browser: string;
  members: string[];
  reason: string;
  evidence: string;
}
const WAIVERS: Waiver[] = (() => {
  try {
    return JSON.parse(fs.readFileSync("patch-waivers.json", "utf8")).waivers ?? [];
  } catch {
    return [];
  }
})();

function waivedMembers(namespace: string, element: string, browser: string): Set<string> {
  const w = WAIVERS.find(
    (x) => x.namespace === namespace && x.element === element && x.browser === browser
  );
  return new Set(w ? w.members : []);
}

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "patch-necessity-"));
const variantDir = path.join(scratch, "patches");
fs.mkdirSync(variantDir);

/** Write the full patch set into the scratch dir, optionally minus one override. */
function writeVariant(omit?: { namespace: string; element: string; browser: Target }): boolean {
  let found = false;
  for (const f of patchFileNames) {
    const entries = JSON.parse(ORIGINAL.get(f)!) as PatchEntry[];
    const kept: PatchEntry[] = [];
    for (const e of entries) {
      if (
        omit &&
        e.namespace === omit.namespace &&
        e.element === omit.element &&
        OVERRIDE_KEY(omit.browser) in e
      ) {
        delete e[OVERRIDE_KEY(omit.browser)];
        found = true;
        // validatePatch rejects an entry carrying no override at all.
        if (!ALL_OVERRIDE_KEYS.some((k) => k in e)) {
          continue;
        }
      }
      kept.push(e);
    }
    fs.writeFileSync(path.join(variantDir, f), JSON.stringify(kept, null, 2) + "\n");
  }
  return omit ? found : true;
}

// One IR builder, shared with the generator and the reports: a harness that
// assembles its own sees a different set of APIs than the one that ships, and
// then measures the wrong thing.
const baseIr = buildIr();

function cloneIr(src: Map<string, IRNamespace>): Map<string, IRNamespace> {
  const out = new Map<string, IRNamespace>();
  for (const [nsName, ns] of src) {
    const elements = new Map(
      [...ns.elements].map(([k, v]) => [k, {
        ...v,
        // The per-browser stores are Maps now, so a shallow spread would share
        // them between the baseline and every variant, making every override
        // look inert. Copy them.
        sources: new Map(v.sources),
        typeParams: new Map(v.typeParams),
      }] as const)
    );
    out.set(nsName, { name: ns.name, elements });
  }
  return out;
}

/**
 * Emit just one namespace. A patch entry targets a single (namespace, element),
 * and applyPatches only touches that element, so any difference it makes is
 * confined to that namespace. Emitting the whole set per iteration is what made
 * regenerating the whole set per override is too slow to finish.
 */
function emitNamespace(patchDir: string, nsName: string): string {
  const ir = cloneIr(baseIr);
  applyPatches(ir, patchDir);
  const one = new Map<string, IRNamespace>();
  const ns = ir.get(nsName);
  if (ns) one.set(nsName, ns);
  return emitDtsDetailed(one).dts;
}

/**
 * Members declared by an emitted namespace, as `Element.member` keys.
 *
 * The removal harness already computes the emitted namespace with and without
 * each override and then throws that pair away for a single bit. Diffing the
 * member sets instead answers a question the INERT/LOAD-BEARING verdict cannot:
 * does this patch DELETE something upstream declares? 87% of the claims later
 * refuted were LOAD-BEARING, and every one of the deletion-class regressions
 * (omnibox.SuggestResult dropping `deletable`, SourcesPanel emptied) is
 * load-bearing by definition, because making types worse changes the output.
 */
/**
 * Member path -> the browsers its `@supported` tag claims.
 *
 * A `replace` override that omits a member the OTHER browser still declares
 * does not delete it from the output, so the removal check cannot see it. The
 * member simply loses a browser: `runtime.MessageSender.tlsChannelId` went from
 * "Chrome, Firefox" to "Chrome" with nothing recording that second claim.
 */
function memberProvenance(dts: string): Map<string, string> {
  const out = new Map<string, string>();
  let file;
  try {
    file = memberProject.createSourceFile(`__p${memberSeq++}.d.ts`, dts, { overwrite: true });
  } catch {
    return out;
  }
  const visit = (statements: ReturnType<SourceFile["getStatements"]>) => {
    for (const st of statements) {
      if (Node.isInterfaceDeclaration(st)) {
        for (const m of st.getMembers()) {
          const g = (m as unknown as { getName?: () => string }).getName;
          if (typeof g !== "function") continue;
          const n = g.call(m);
          if (!n) continue;
          const docs = (m as unknown as { getJsDocs?: () => Array<{ getInnerText(): string }> }).getJsDocs;
          const text = typeof docs === "function" ? docs.call(m).map((d) => d.getInnerText()).join(" ") : "";
          const tag = /@supported ([^\n]+)/.exec(text);
          if (tag) out.set(`${st.getName()}.${n}`, tag[1].trim());
        }
      } else if (Node.isModuleDeclaration(st)) {
        const body = st.getBody();
        if (body && Node.isModuleBlock(body)) visit(body.getStatements());
      }
    }
  };
  visit(file.getStatements());
  return out;
}

function declaredMembers(dts: string): Set<string> {
  // Parsed with the compiler, not a regex: a textual scan reports parameter
  // names inside wrapped multi-line signatures as interface members.
  const out = new Set<string>();
  let file;
  try {
    file = memberProject.createSourceFile(`__m${memberSeq++}.d.ts`, dts, { overwrite: true });
  } catch {
    return out;
  }
  const visit = (statements: ReturnType<SourceFile["getStatements"]>) => {
    for (const st of statements) {
      if (Node.isInterfaceDeclaration(st)) {
        for (const m of st.getMembers()) {
          const g = (m as unknown as { getName?: () => string }).getName;
          if (typeof g === "function") {
            const n = g.call(m);
            if (n) out.add(`${st.getName()}.${n}`);
          }
        }
      } else if (Node.isFunctionDeclaration(st) || Node.isVariableStatement(st)) {
        if (Node.isVariableStatement(st)) {
          for (const d of st.getDeclarations()) out.add(d.getName());
        } else {
          const n = st.getName();
          if (n) out.add(n);
        }
      } else if (Node.isModuleDeclaration(st)) {
        visit(st.getStatements());
      }
    }
  };
  visit(file.getStatements());
  return out;
}

interface Result {
  file: string;
  namespace: string;
  element: string;
  browser: Target;
  verdict: "INERT" | "LOAD-BEARING" | "ERROR";
  note?: string;
  /** Members upstream declares that this override removes from the output. */
  removesUpstreamMembers?: string[];
}

const filterIdx = process.argv.indexOf("--filter");
const filter = filterIdx !== -1 ? process.argv[filterIdx + 1] : undefined;

const work: Array<{ file: string; e: PatchEntry; browser: Target }> = [];
for (const f of patchFileNames) {
  for (const e of JSON.parse(ORIGINAL.get(f)!) as PatchEntry[]) {
    if (filter && !`${e.namespace}.${e.element}`.includes(filter)) continue;
    for (const t of TARGETS) {
      if (e[OVERRIDE_KEY(t)] !== undefined) work.push({ file: f, e, browser: t });
    }
  }
}

console.log(`Testing ${work.length} overrides across ${patchFileNames.length} patch files.`);
console.log(`Scratch dir: ${scratch}\n`);

const results: Result[] = [];
const demotions: string[] = [];
const baselineByNs = new Map<string, string>();
try {
  writeVariant();
  for (const { e } of work) {
    if (!baselineByNs.has(e.namespace)) {
      baselineByNs.set(e.namespace, emitNamespace(variantDir, e.namespace));
    }
  }

  let i = 0;
  for (const { file, e, browser } of work) {
    i++;
    let verdict: Result["verdict"];
    let note: string | undefined;
    let removesUpstream: string[] | undefined;
    try {
      const found = writeVariant({ namespace: e.namespace, element: e.element, browser });
      if (!found) {
        verdict = "ERROR";
        note = "override not found";
      } else {
        const got = emitNamespace(variantDir, e.namespace);
        const base = baselineByNs.get(e.namespace)!;
        verdict = got === base ? "INERT" : "LOAD-BEARING";
        if (verdict === "LOAD-BEARING") {
          // `base` is WITH the patch, `got` is WITHOUT it. A member present
          // without the patch and absent with it is one the patch deletes.
          const withPatch = declaredMembers(base);
          const withoutPatch = declaredMembers(got);
          const removed = [...withoutPatch].filter((m) => !withPatch.has(m)).sort();
          // Strip members covered by an evidenced waiver. `Element.member` and
          // bare `member` are both accepted so the waiver file stays readable.
          const waived = waivedMembers(e.namespace, e.element, browser);
          const unwaived = removed.filter(
            (m) => !waived.has(m) && !waived.has(m.split(".").pop() as string)
          );
          if (unwaived.length) removesUpstream = unwaived;

          // Same comparison, one level finer: a member that survives but loses
          // a browser. Invisible to the removal check by construction.
          const provWith = memberProvenance(base);
          const provWithout = memberProvenance(got);
          for (const [member, without] of provWithout) {
            const withP = provWith.get(member);
            if (withP && withP !== without && without.split(", ").length > withP.split(", ").length) {
              demotions.push(`${e.namespace}.${member}: ${without} -> ${withP} (${browser} override)`);
            }
          }
        }
      }
    } catch (err) {
      verdict = "ERROR";
      note = err instanceof Error ? err.message.split("\n")[0] : String(err);
    }
    results.push({ file, namespace: e.namespace, element: e.element, browser, verdict, note,
                   ...(removesUpstream ? { removesUpstreamMembers: removesUpstream } : {}) });
    if (verdict !== "LOAD-BEARING") {
      console.log(
        `  ${verdict.padEnd(12)} ${browser.padEnd(7)} ${e.namespace}.${e.element}` +
          (note ? `  (${note})` : "")
      );
    } else if (removesUpstream) {
      console.log(
        `  ${"REMOVES-MEMBER".padEnd(12)} ${browser.padEnd(7)} ${e.namespace}.${e.element}` +
          `  drops: ${removesUpstream.slice(0, 6).join(", ")}` +
          (removesUpstream.length > 6 ? ` (+${removesUpstream.length - 6} more)` : "")
      );
    }
    if (i % 50 === 0) console.log(`  ... ${i}/${work.length}`);
  }
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
  // patches/ is never written by this script, but assert it anyway: the whole
  // point of this tool is that claims get verified rather than assumed.
  for (const f of patchFileNames) {
    if (fs.readFileSync(path.join(PATCH_DIR, f), "utf8") !== ORIGINAL.get(f)) {
      console.error(`FATAL: ${f} changed. Run: git checkout -- patches/`);
      process.exit(2);
    }
  }
}

const inert = results.filter((r) => r.verdict === "INERT");
const degrading = results.filter((r) => r.removesUpstreamMembers?.length);
const errors = results.filter((r) => r.verdict === "ERROR");
const load = results.filter((r) => r.verdict === "LOAD-BEARING");

console.log("\n=== SUMMARY ===");
console.log(`  LOAD-BEARING: ${load.length}`);
console.log(`  INERT:        ${inert.length}`);
console.log(`  ERROR:        ${errors.length}`);
console.log(`  REMOVES-MEMBER: ${degrading.length} unwaived (${WAIVERS.length} waiver(s) applied)`);

// Provenance demotions: the member is still emitted, so REMOVES-MEMBER cannot
// see it, but a browser silently dropped off its @supported line. The existing
// ones are recorded rather than justified: each is a second, unevidenced claim
// riding inside an entry whose reason describes something else. The count may
// only go down.
const DEMOTION_BASELINE = "demotion-baseline.json";
const sortedDemotions = [...new Set(demotions)].sort();
const baseline: string[] = fs.existsSync(DEMOTION_BASELINE)
  ? JSON.parse(fs.readFileSync(DEMOTION_BASELINE, "utf8")).demotions ?? []
  : [];
const known = new Set(baseline);
const fresh = sortedDemotions.filter((d) => !known.has(d));
console.log(`  DEMOTES-MEMBER: ${sortedDemotions.length} total, ${fresh.length} not in the baseline`);
if (process.argv.includes("--record-demotions")) {
  fs.writeFileSync(DEMOTION_BASELINE, JSON.stringify({
    why: "A member still emitted but with a browser dropped from its @supported line. " +
         "Each is an unevidenced second claim inside an entry whose reason describes something else. " +
         "Recorded, not justified: the count may only decrease.",
    demotions: sortedDemotions,
  }, null, 2) + "\n");
  console.log(`  wrote ${DEMOTION_BASELINE}`);
} else if (fresh.length) {
  for (const d of fresh) console.error(`    NEW DEMOTION  ${d}`);
  console.error(
    "\nAn override dropped a browser from a member that is still emitted. Either the\n" +
    "member really is unsupported there, in which case say so in the entry, or the\n" +
    "override is wrong."
  );
  process.exit(1);
}

const jsonFlag = process.argv.indexOf("--json");
if (jsonFlag !== -1 && process.argv[jsonFlag + 1]) {
  fs.writeFileSync(process.argv[jsonFlag + 1], JSON.stringify(results, null, 2));
  console.log(`\nwrote ${process.argv[jsonFlag + 1]}`);
}

if (degrading.length) {
  process.exitCode = 1;
  console.error(
    `\n${degrading.length} override(s) remove a member that upstream declares. Each is either a\n` +
      `defect in our patch or needs an explicit waiver recording why the loss is correct.\n` +
      `Deleting a real member is how omnibox.SuggestResult lost \`deletable\` (Firefox 109).`
  );
}
if (inert.length) {
  console.error(
    `\n${inert.length} override(s) change nothing in the emitted output and should be deleted.`
  );
  process.exit(1);
}
if (errors.length) {
  console.error(`\n${errors.length} override(s) could not be tested.`);
  process.exit(1);
}
console.log("\nEvery override changes the emitted output.");
