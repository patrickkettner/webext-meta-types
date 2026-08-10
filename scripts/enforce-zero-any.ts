import { Project, SyntaxKind } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

export interface AnyViolation {
  file: string;
  line: number;
  field?: string;
  context: string;
}

export function checkSourceFiles(
  filePatterns = ["src/**/*.ts", "scripts/**/*.ts", "tests/**/*.ts", "test/**/*.ts", "!**/node_modules/**"]
): AnyViolation[] {
  const project = new Project();
  project.addSourceFilesAtPaths(filePatterns);
  const violations: AnyViolation[] = [];

  for (const sourceFile of project.getSourceFiles()) {
    sourceFile.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.AnyKeyword) {
        violations.push({
          file: sourceFile.getFilePath(),
          line: node.getStartLineNumber(),
          context: node.getParent()?.getText().slice(0, 100) ?? ""
        });
      }
    });
  }
  return violations;
}

export function checkPatchOverrides(patchesDir = "patches"): AnyViolation[] {
  const violations: AnyViolation[] = [];
  const patchProject = new Project({ useInMemoryFileSystem: true });
  const overrideFields = ["overrideChrome", "overrideFirefox", "overrideShared"];

  if (fs.existsSync(patchesDir)) {
    const files = fs.readdirSync(patchesDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const patchPath = path.join(patchesDir, file);
        const raw = JSON.parse(fs.readFileSync(patchPath, "utf-8"));
        const items = Array.isArray(raw) ? raw : [raw];
        for (const parsed of items) {
          for (const field of overrideFields) {
            const value = parsed[field];
            if (typeof value === "string") {
              const tempFile = patchProject.createSourceFile(`_patch_check_${Math.random()}.ts`, value);
              const lines = value.split("\n");
              tempFile.forEachDescendant((n) => {
                if (n.getKind() === SyntaxKind.AnyKeyword) {
                  const lineIdx = n.getStartLineNumber() - 1;
                  let allowed = false;
                  if (lineIdx >= 0 && lines[lineIdx].includes("TODO:")) allowed = true;
                  if (lineIdx - 1 >= 0 && lines[lineIdx - 1].includes("TODO:")) allowed = true;
                  if (lineIdx - 2 >= 0 && lines[lineIdx - 2].includes("TODO:")) allowed = true;

                  if (!allowed) {
                    violations.push({
                      file: patchPath,
                      line: n.getStartLineNumber(),
                      field,
                      context: n.getParent()?.getText().slice(0, 100) ?? ""
                    });
                  }
                }
              });
              tempFile.delete();
            }
          }
        }
      }
    }
  }
  return violations;
}

export function checkDistArtifacts(distDir = "dist"): AnyViolation[] {
  const violations: AnyViolation[] = [];
  if (!fs.existsSync(distDir)) return violations;

  const project = new Project();
  project.addSourceFilesAtPaths([path.join(distDir, "**/*.d.ts")]);

  for (const sourceFile of project.getSourceFiles()) {
    const lines = sourceFile.getFullText().split("\n");
    sourceFile.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.AnyKeyword) {
        const lineIdx = node.getStartLineNumber() - 1;
        let allowed = false;
        if (lineIdx >= 0 && lines[lineIdx].includes("TODO:")) allowed = true;
        if (lineIdx - 1 >= 0 && lines[lineIdx - 1].includes("TODO:")) allowed = true;
        if (lineIdx - 2 >= 0 && lines[lineIdx - 2].includes("TODO:")) allowed = true;

        if (!allowed) {
          violations.push({
            file: sourceFile.getFilePath(),
            line: node.getStartLineNumber(),
            context: node.getParent()?.getText().slice(0, 100) ?? ""
          });
        }
      }
    });
  }
  return violations;
}

export function enforceZeroAny(): void {
  const sourceViolations = checkSourceFiles();
  const patchViolations = checkPatchOverrides();
  const distViolations = checkDistArtifacts();

  const total = [...sourceViolations, ...patchViolations, ...distViolations];

  for (const v of sourceViolations) {
    console.error(`Found forbidden 'any' in source code: ${v.file}:${v.line}`);
    console.error(`Context: ${v.context}`);
  }
  for (const v of patchViolations) {
    console.error(`Found un-annotated 'any' in patch ${v.file} field '${v.field}' at line ${v.line}`);
    console.error(`Context: ${v.context}`);
  }
  for (const v of distViolations) {
    console.error(`Found un-annotated 'any' in dist artifact ${v.file} at line ${v.line}`);
    console.error(`Context: ${v.context}`);
  }

  if (total.length > 0) {
    console.error(`\nFAILED: Found ${total.length} forbidden/un-annotated 'any' instances.`);
    process.exit(1);
  }

  console.log(`\nSUCCESS: Zero-any policy enforced on our own source code and patches.`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("enforce-zero-any.ts")) {
  enforceZeroAny();
}
