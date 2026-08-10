import { Project, ModuleDeclaration, JSDoc, Node } from "ts-morph";
import * as fs from "node:fs";

interface Difference {
  kind: "OPTIONALITY_RESTORED_TO_REQUIRED" | "TYPE_DIFFERENCE" | "EXTRA_DECLARATION_IN_PRUNED" | "NOTE_IN_PRUNED" | "UNEXPECTED_DIFF";
  path: string;
  mergedText: string;
  prunedText: string;
  details?: string;
}

export function compareTargetArtifact(target: "chrome" | "firefox"): {
  target: string;
  totalPrunedNamespaces: number;
  totalPrunedInterfaces: number;
  totalPrunedMembers: number;
  widenedMembersRestoredToRequired: string[];
  nonTargetMembersPruned: string[];
  unexpectedDifferences: Difference[];
  notesInPruned: string[];
} {
  const filePath = `dist/${target}-only.d.ts`;
  const project = new Project();
  const indexFile = project.addSourceFileAtPath("dist/index.d.ts");
  const prunedFile = project.addSourceFileAtPath(filePath);

  const indexNs = indexFile.getModuleOrThrow("chrome");
  const prunedNs = prunedFile.getModuleOrThrow("chrome");

  const widenedMembersRestoredToRequired: string[] = [];
  const nonTargetMembersPruned: string[] = [];
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

  // 1. Read metadata.json to know the widened members
  const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { note?: string; supported?: string | string[] }>;
  const widenedInMerged: { path: string; note: string; isChrome: boolean; isFirefox: boolean }[] = [];
  for (const [k, entry] of Object.entries(meta)) {
    if (entry.note?.includes("optional in the merged set")) {
      const suppStr = Array.isArray(entry.supported) ? entry.supported.join(", ").toLowerCase() : String(entry.supported).toLowerCase();
      widenedInMerged.push({
        path: k,
        note: entry.note,
        isChrome: suppStr.includes("chrome"),
        isFirefox: suppStr.includes("firefox")
      });
    }
  }

  // 2. Walk all namespaces in pruned file
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

        const iText = iMembers[0].getText().trim();
        const fullPath = `${nsName}.${ifaceName}.${pName}`;

        // Check if this was a widened member in merged
        const metaEntry = widenedInMerged.find(w => w.path === fullPath);
        const isTarget = target === "chrome" ? metaEntry?.isChrome : metaEntry?.isFirefox;
        if (metaEntry && isTarget) {
          // Must be required in pruned target
          const isOptionalInPruned = /^\s*(?:[A-Za-z0-9_$]+|"[^"]+"|\'[^\']+\'|\[[^\]]+\])\?\s*[<(:]/.test(pText);
          const isOptionalInMerged = /^\s*(?:[A-Za-z0-9_$]+|"[^"]+"|\'[^\']+\'|\[[^\]]+\])\?\s*[<(:]/.test(iText);
          if (!isOptionalInPruned && isOptionalInMerged) {
            widenedMembersRestoredToRequired.push(fullPath);
          } else {
            unexpectedDifferences.push({
              kind: "UNEXPECTED_DIFF",
              path: fullPath,
              mergedText: iText,
              prunedText: pText,
              details: `Expected required in ${target}-only, got optional: ${isOptionalInPruned}`
            });
          }
        }
      }
    }
  }

  // 3. Verify that opposite-browser widened members are completely absent from pruned file
  for (const w of widenedInMerged) {
    const isOppositeOnly = target === "chrome" ? (w.isFirefox && !w.isChrome) : (w.isChrome && !w.isFirefox);
    if (isOppositeOnly) {
      const parts = w.path.split(".");
      const propName = parts.pop()!;
      const ifaceName = parts.pop()!;
      const nsName = parts.join(".");

      const pMod = prunedNs.getModule(nsName);
      const pIface = pMod?.getInterface(ifaceName);
      const pMember = pIface?.getMembers().find(m => (m as unknown as { getName?: () => string }).getName?.() === propName);
      if (!pMember) {
        nonTargetMembersPruned.push(w.path);
      } else {
        unexpectedDifferences.push({
          kind: "EXTRA_DECLARATION_IN_PRUNED",
          path: w.path,
          mergedText: `(${target === "chrome" ? "firefox" : "chrome"} only)`,
          prunedText: pMember.getText(),
          details: `Opposite-browser member present in ${target}-only.d.ts`
        });
      }
    }
  }

  return {
    target,
    totalPrunedNamespaces,
    totalPrunedInterfaces,
    totalPrunedMembers,
    widenedMembersRestoredToRequired,
    nonTargetMembersPruned,
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
    console.log(`\n${target === "chrome" ? "Chrome" : "Firefox"}-only members widened in merged set, confirmed REQUIRED in ${target}-only.d.ts (${res.widenedMembersRestoredToRequired.length}):`);
    res.widenedMembersRestoredToRequired.forEach(m => console.log(`  ✓ ${m}`));

    console.log(`\nOpposite-browser members widened in merged set, confirmed ABSENT in ${target}-only.d.ts (${res.nonTargetMembersPruned.length}):`);
    res.nonTargetMembersPruned.forEach(m => console.log(`  ✓ ${m}`));

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
