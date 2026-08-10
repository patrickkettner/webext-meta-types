import { Project, SyntaxKind, InterfaceDeclaration, ModuleDeclaration } from "ts-morph";
import * as fs from "node:fs";

export interface DeclarationDiff {
  addedNamespaces: string[];
  removedNamespaces: string[];
  addedDeclarations: string[];
  removedDeclarations: string[];
  modifiedDeclarations: {
    path: string;
    addedMembers: string[];
    removedMembers: string[];
    modifiedMembers: string[];
  }[];
  lineDelta: {
    before: number;
    after: number;
    delta: number;
  };
  byteDelta: {
    before: number;
    after: number;
    delta: number;
  };
}

export function diffDtsArtifacts(beforePath: string, afterPath: string): DeclarationDiff {
  const beforeRaw = fs.readFileSync(beforePath, "utf8");
  const afterRaw = fs.readFileSync(afterPath, "utf8");

  const beforeLines = beforeRaw.split("\n").length;
  const afterLines = afterRaw.split("\n").length;

  const project = new Project();
  const beforeFile = project.addSourceFileAtPath(beforePath);
  const afterFile = project.addSourceFileAtPath(afterPath);

  const beforeNs = beforeFile.getModule("chrome");
  const afterNs = afterFile.getModule("chrome");

  const addedNamespaces: string[] = [];
  const removedNamespaces: string[] = [];
  const addedDeclarations: string[] = [];
  const removedDeclarations: string[] = [];
  const modifiedDeclarations: DeclarationDiff["modifiedDeclarations"] = [];

  if (!beforeNs && afterNs) {
    addedNamespaces.push("chrome");
  } else if (beforeNs && !afterNs) {
    removedNamespaces.push("chrome");
  } else if (beforeNs && afterNs) {
    const beforeMods = new Map(beforeNs.getModules().map(m => [m.getName(), m]));
    const afterMods = new Map(afterNs.getModules().map(m => [m.getName(), m]));

    for (const [name, mod] of afterMods) {
      if (!beforeMods.has(name)) {
        addedNamespaces.push(name);
      }
    }
    for (const [name] of beforeMods) {
      if (!afterMods.has(name)) {
        removedNamespaces.push(name);
      }
    }

    // Compare namespaces present in both
    for (const [nsName, afterMod] of afterMods) {
      const beforeMod = beforeMods.get(nsName);
      if (!beforeMod) continue;

      // Interfaces
      const beforeIfaces = new Map(beforeMod.getInterfaces().map(i => [i.getName(), i]));
      const afterIfaces = new Map(afterMod.getInterfaces().map(i => [i.getName(), i]));

      for (const [iName] of afterIfaces) {
        if (!beforeIfaces.has(iName)) {
          addedDeclarations.push(`${nsName}.${iName} (interface)`);
        }
      }
      for (const [iName] of beforeIfaces) {
        if (!afterIfaces.has(iName)) {
          removedDeclarations.push(`${nsName}.${iName} (interface)`);
        }
      }

      // Functions
      const beforeFuncs = new Set(beforeMod.getFunctions().map(f => f.getName()));
      const afterFuncs = new Set(afterMod.getFunctions().map(f => f.getName()));
      for (const fName of afterFuncs) {
        if (fName && !beforeFuncs.has(fName)) {
          addedDeclarations.push(`${nsName}.${fName}() (function)`);
        }
      }
      for (const fName of beforeFuncs) {
        if (fName && !afterFuncs.has(fName)) {
          removedDeclarations.push(`${nsName}.${fName}() (function)`);
        }
      }

      // Type aliases
      const beforeTypes = new Set(beforeMod.getTypeAliases().map(t => t.getName()));
      const afterTypes = new Set(afterMod.getTypeAliases().map(t => t.getName()));
      for (const tName of afterTypes) {
        if (!beforeTypes.has(tName)) {
          addedDeclarations.push(`${nsName}.${tName} (type)`);
        }
      }
      for (const tName of beforeTypes) {
        if (!afterTypes.has(tName)) {
          removedDeclarations.push(`${nsName}.${tName} (type)`);
        }
      }

      // Compare members of shared interfaces
      for (const [iName, afterIface] of afterIfaces) {
        const beforeIface = beforeIfaces.get(iName);
        if (!beforeIface) continue;

        const beforeMembers = new Map<string, string>();
        for (const m of beforeIface.getMembers()) {
          const mName = (m as unknown as { getName?: () => string }).getName?.();
          if (mName) {
            beforeMembers.set(mName, m.getText().replace(/\s+/g, " ").trim());
          }
        }

        const afterMembers = new Map<string, string>();
        for (const m of afterIface.getMembers()) {
          const mName = (m as unknown as { getName?: () => string }).getName?.();
          if (mName) {
            afterMembers.set(mName, m.getText().replace(/\s+/g, " ").trim());
          }
        }

        const addedM: string[] = [];
        const removedM: string[] = [];
        const modifiedM: string[] = [];

        for (const [mName, mText] of afterMembers) {
          if (!beforeMembers.has(mName)) {
            addedM.push(mName);
          } else if (beforeMembers.get(mName) !== mText) {
            modifiedM.push(mName);
          }
        }
        for (const [mName] of beforeMembers) {
          if (!afterMembers.has(mName)) {
            removedM.push(mName);
          }
        }

        if (addedM.length > 0 || removedM.length > 0 || modifiedM.length > 0) {
          modifiedDeclarations.push({
            path: `${nsName}.${iName}`,
            addedMembers: addedM,
            removedMembers: removedM,
            modifiedMembers: modifiedM
          });
        }
      }
    }
  }

  return {
    addedNamespaces,
    removedNamespaces,
    addedDeclarations,
    removedDeclarations,
    modifiedDeclarations,
    lineDelta: {
      before: beforeLines,
      after: afterLines,
      delta: afterLines - beforeLines
    },
    byteDelta: {
      before: Buffer.byteLength(beforeRaw, "utf8"),
      after: Buffer.byteLength(afterRaw, "utf8"),
      delta: Buffer.byteLength(afterRaw, "utf8") - Buffer.byteLength(beforeRaw, "utf8")
    }
  };
}

export type ChangeClassification = "additive" | "breaking" | "failing";

export function classifyChange(diff: DeclarationDiff, checkPassed: boolean): ChangeClassification {
  if (!checkPassed) {
    return "failing";
  }

  // If any namespace was removed
  if (diff.removedNamespaces.length > 0) {
    return "breaking";
  }

  // If any declaration was removed
  if (diff.removedDeclarations.length > 0) {
    return "breaking";
  }

  // If any existing interface had members removed or modified
  for (const m of diff.modifiedDeclarations) {
    if (m.removedMembers.length > 0 || m.modifiedMembers.length > 0) {
      return "breaking";
    }
  }

  // Declarations added or doc/comment updates only
  return "additive";
}

export function formatDiffMarkdown(
  pkgName: string,
  fromVersion: string,
  toVersion: string,
  diff: DeclarationDiff,
  checkPassed: boolean,
  checkOutput?: string
): string {
  const classification = classifyChange(diff, checkPassed);
  const sign = diff.lineDelta.delta >= 0 ? `+${diff.lineDelta.delta}` : `${diff.lineDelta.delta}`;
  const byteSign = diff.byteDelta.delta >= 0 ? `+${(diff.byteDelta.delta / 1024).toFixed(1)} KB` : `${(diff.byteDelta.delta / 1024).toFixed(1)} KB`;

  let md = `## Upstream Bump: \`${pkgName}\` \`${fromVersion}\` → \`${toVersion}\`\n\n`;

  if (classification === "additive") {
    md += `> [!NOTE]\n> **Classification: 🟢 Additive (Auto-Merge Enabled)**\n> All changes are non-breaking additions or metadata updates. Full verification suite passed. This PR is eligible for automated merge and a minor release bump.\n\n`;
  } else if (classification === "breaking") {
    md += `> [!WARNING]\n> **Classification: 🔴 Breaking (Human Review Required)**\n> Upstream changes include removed declarations or modified signatures that may affect consumers. Auto-merge is disabled. Human review is required before merging and tagging a major release.\n\n`;
  } else {
    md += `> [!CAUTION]\n> **Classification: ⚠️ Failing (Verification Failed)**\n> \`npm run check\` failed after upgrading \`${pkgName}\`. This PR is marked as **Draft** for debugging.\n\n`;
  }

  md += `| Metric | Before | After | Delta |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  md += `| **Classification** | — | — | **\`${classification.toUpperCase()}\`** |\n`;
  md += `| **Verification (\`npm run check\`)** | — | — | **${checkPassed ? "✅ PASS" : "❌ FAIL (Draft)"}** |\n`;
  md += `| **\`dist/index.d.ts\` Lines** | ${diff.lineDelta.before.toLocaleString()} | ${diff.lineDelta.after.toLocaleString()} | \`${sign}\` |\n`;
  md += `| **\`dist/index.d.ts\` Size** | ${(diff.byteDelta.before / 1024).toFixed(1)} KB | ${(diff.byteDelta.after / 1024).toFixed(1)} KB | \`${byteSign}\` |\n\n`;

  if (!checkPassed && checkOutput) {
    md += `### ⚠️ Verification Failure Diagnostic\n\n`;
    md += `\`npm run check\` failed after upgrading \`${pkgName}\`. Review the diagnostic output below to determine whether generator logic or patch files need updating:\n\n`;
    md += `<details open>\n<summary><strong><code>npm run check</code> Output</strong></summary>\n\n\`\`\`text\n${checkOutput.trim()}\n\`\`\`\n\n</details>\n\n`;
  }

  md += `### Structural Changes in Emitted Declarations\n\n`;

  if (diff.removedNamespaces.length > 0) {
    md += `#### 🚨 Removed Namespaces (${diff.removedNamespaces.length})\n`;
    diff.removedNamespaces.forEach(n => { md += `- \`${n}\`\n`; });
    md += `\n`;
  }

  if (diff.removedDeclarations.length > 0) {
    md += `#### 🚨 Removed Declarations (${diff.removedDeclarations.length})\n`;
    diff.removedDeclarations.forEach(d => { md += `- \`${d}\`\n`; });
    md += `\n`;
  }

  if (diff.addedNamespaces.length > 0) {
    md += `#### Added Namespaces (${diff.addedNamespaces.length})\n`;
    diff.addedNamespaces.forEach(n => { md += `- \`${n}\`\n`; });
    md += `\n`;
  }

  if (diff.addedDeclarations.length > 0) {
    md += `#### Added Declarations (${diff.addedDeclarations.length})\n`;
    diff.addedDeclarations.forEach(d => { md += `- \`${d}\`\n`; });
    md += `\n`;
  }

  if (diff.modifiedDeclarations.length > 0) {
    md += `#### Modified Declarations (${diff.modifiedDeclarations.length})\n\n`;
    for (const m of diff.modifiedDeclarations) {
      const isBreaking = m.removedMembers.length > 0 || m.modifiedMembers.length > 0;
      const icon = isBreaking ? "⚠️ " : "";
      md += `<details>\n<summary>${icon}<code>${m.path}</code></summary>\n\n`;
      if (m.removedMembers.length > 0) {
        md += `- **🚨 Removed members**: ${m.removedMembers.map(x => `\`${x}\``).join(", ")}\n`;
      }
      if (m.modifiedMembers.length > 0) {
        md += `- **⚠️ Modified members**: ${m.modifiedMembers.map(x => `\`${x}\``).join(", ")}\n`;
      }
      if (m.addedMembers.length > 0) {
        md += `- **Added members**: ${m.addedMembers.map(x => `\`${x}\``).join(", ")}\n`;
      }
      md += `\n</details>\n`;
    }
    md += `\n`;
  }

  if (
    diff.addedNamespaces.length === 0 &&
    diff.removedNamespaces.length === 0 &&
    diff.addedDeclarations.length === 0 &&
    diff.removedDeclarations.length === 0 &&
    diff.modifiedDeclarations.length === 0
  ) {
    md += `*No structural declaration additions, removals, or member modifications detected (changes may be documentation or comment updates).*\n\n`;
  }

  md += `---\n*Generated automatically by \`.github/workflows/upstream.yml\`.*`;
  return md;
}

// CLI runner
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("summarize-upstream-diff.ts")) {
  const args = process.argv.slice(2);
  if (args.length < 5) {
    console.error("Usage: tsx scripts/summarize-upstream-diff.ts <beforeDts> <afterDts> <pkgName> <fromVer> <toVer> [checkPassed] [checkOutputFile] [--meta-out <metaJsonFile>]");
    process.exit(1);
  }
  const [beforePath, afterPath, pkgName, fromVer, toVer, checkPassedArg, checkOutputFile, ...rest] = args;
  const checkPassed = checkPassedArg !== "false";
  let checkOutput = "";
  if (checkOutputFile && fs.existsSync(checkOutputFile)) {
    checkOutput = fs.readFileSync(checkOutputFile, "utf8");
  }

  const metaOutIdx = rest.indexOf("--meta-out");
  const metaOutFile = metaOutIdx !== -1 ? rest[metaOutIdx + 1] : undefined;

  const diff = diffDtsArtifacts(beforePath, afterPath);
  const classification = classifyChange(diff, checkPassed);
  const markdown = formatDiffMarkdown(pkgName, fromVer, toVer, diff, checkPassed, checkOutput);

  if (metaOutFile) {
    fs.writeFileSync(metaOutFile, JSON.stringify({
      pkgName,
      fromVersion: fromVer,
      toVersion: toVer,
      classification,
      checkPassed,
      addedNamespacesCount: diff.addedNamespaces.length,
      removedNamespacesCount: diff.removedNamespaces.length,
      addedDeclarationsCount: diff.addedDeclarations.length,
      removedDeclarationsCount: diff.removedDeclarations.length,
      modifiedDeclarationsCount: diff.modifiedDeclarations.length,
      lineDelta: diff.lineDelta.delta,
      byteDelta: diff.byteDelta.delta
    }, null, 2));
  }

  console.log(markdown);
}
