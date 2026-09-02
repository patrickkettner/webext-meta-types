import { Project, JSDoc, Node } from "ts-morph";
import * as fs from "node:fs";

interface Difference {
  kind: "TYPE_DIFFERENCE" | "EXTRA_DECLARATION_IN_PRUNED" | "NOTE_IN_PRUNED" | "UNEXPECTED_DIFF";
  path: string;
  mergedText: string;
  prunedText: string;
  details?: string;
}

/**
 * Whether pruned-target artifacts (chrome-only.d.ts, firefox-only.d.ts,
 * safari-only.d.ts) stay structurally consistent with dist/index.d.ts: every
 * declaration in a pruned file has a same-named, same-kind counterpart in the
 * merged file, and no `@note optional in...` annotation (a merged-set-only
 * concept) leaks into a pruned build.
 *
 * Does not check that a widened member is required in its own browser's
 * pruned file, or absent from another browser's: that has to compare
 * against the real upstream package, not the generator's own metadata about
 * itself. `scripts/verify-widening.ts` is that check.
 */
export function compareTargetArtifact(target: "chrome" | "firefox"): {
  target: string;
  totalPrunedNamespaces: number;
  totalPrunedInterfaces: number;
  totalPrunedMembers: number;
  unexpectedDifferences: Difference[];
  notesInPruned: string[];
} {
  const filePath = `dist/${target}-only.d.ts`;
  const project = new Project();
  const indexFile = project.addSourceFileAtPath("dist/index.d.ts");
  const prunedFile = project.addSourceFileAtPath(filePath);

  const indexNs = indexFile.getModuleOrThrow("chrome");
  const prunedNs = prunedFile.getModuleOrThrow("chrome");

  const unexpectedDifferences: Difference[] = [];
  const notesInPruned: string[] = [];

  // Check preamble / raw text for any @note in pruned file
  const prunedRaw = fs.readFileSync(filePath, "utf8");
  const rawNoteMatches = prunedRaw.match(/@note optional in[^\r\n]+/g) || [];
  for (const n of rawNoteMatches) {
    notesInPruned.push(n);
  }

  let totalPrunedNamespaces = 0;
  let totalPrunedInterfaces = 0;
  let totalPrunedMembers = 0;

  // Walk all namespaces in pruned file
  for (const pMod of prunedNs.getModules()) {
    totalPrunedNamespaces++;
    const nsName = pMod.getName();
    const iMod = indexNs.getModule(nsName);
    if (!iMod) {
      unexpectedDifferences.push({
        kind: "EXTRA_DECLARATION_IN_PRUNED",
        path: `chrome.${nsName}`,
        mergedText: "(missing)",
        prunedText: `namespace ${nsName}`
      });
      continue;
    }

    // Compare interfaces
    for (const pIface of pMod.getInterfaces()) {
      totalPrunedInterfaces++;
      const ifaceName = pIface.getName();
      const iIface = iMod.getInterface(ifaceName);

      if (!iIface) {
        unexpectedDifferences.push({
          kind: "EXTRA_DECLARATION_IN_PRUNED",
          path: `chrome.${nsName}.${ifaceName}`,
          mergedText: "(missing)",
          prunedText: `interface ${ifaceName}`
        });
        continue;
      }

      // Compare members
      for (const pMember of pIface.getMembers()) {
        totalPrunedMembers++;
        const pName = (pMember as unknown as { getName?: () => string }).getName?.() || "";
        const pText = pMember.getText().trim();
        const pKind = pMember.getKind();

        // Check for JSDoc @note in pruned
        const jsDocNodes = Node.isJSDocable(pMember) ? pMember.getJsDocs() : [];
        const pDocs = jsDocNodes.map((d: JSDoc) => d.getText()).join("\n");
        if (pDocs.includes("@note optional in")) {
          unexpectedDifferences.push({
            kind: "NOTE_IN_PRUNED",
            path: `chrome.${nsName}.${ifaceName}.${pName}`,
            mergedText: "",
            prunedText: pDocs,
            details: `@note optional in should not exist in ${target}-only.d.ts`
          });
        }

        const iMembers = iIface.getMembers().filter(m => {
          const mName = (m as unknown as { getName?: () => string }).getName?.() || "";
          return mName === pName && m.getKind() === pKind;
        });

        if (iMembers.length === 0) {
          unexpectedDifferences.push({
            kind: "EXTRA_DECLARATION_IN_PRUNED",
            path: `chrome.${nsName}.${ifaceName}.${pName}`,
            mergedText: "(missing)",
            prunedText: pText
          });
          continue;
        }
      }
    }
  }

  return {
    target,
    totalPrunedNamespaces,
    totalPrunedInterfaces,
    totalPrunedMembers,
    unexpectedDifferences,
    notesInPruned
  };
}

export function runAllArtifactComparisons(): void {
  let hasFailure = false;
  for (const target of ["chrome", "firefox"] as const) {
    const res = compareTargetArtifact(target);
    console.log(`\n=== COMPARING dist/${target}-only.d.ts vs dist/index.d.ts ===`);
    console.log(`Pruned namespaces checked: ${res.totalPrunedNamespaces}`);
    console.log(`Pruned interfaces checked: ${res.totalPrunedInterfaces}`);
    console.log(`Pruned members checked: ${res.totalPrunedMembers}`);

    console.log(`\n@note optional in... annotations in ${target}-only.d.ts: ${res.notesInPruned.length} (expected 0)`);
    if (res.notesInPruned.length > 0) {
      res.notesInPruned.forEach(n => console.log(`  ✗ ${n}`));
    }

    console.log(`\nUnexpected differences beyond intentional pruning: ${res.unexpectedDifferences.length}`);
    if (res.unexpectedDifferences.length > 0) {
      res.unexpectedDifferences.forEach(d => console.log(`  ✗ [${d.kind}] ${d.path}: ${d.details || ""}`));
    }

    if (res.notesInPruned.length > 0 || res.unexpectedDifferences.length > 0) {
      console.error(`\nFAIL: ${target}-only.d.ts has unexpected divergence from index.d.ts`);
      hasFailure = true;
    }
  }

  if (hasFailure) {
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("compare-artifacts.ts")) {
  runAllArtifactComparisons();
}
