import { Project, ModuleDeclaration, Node } from "ts-morph";
import * as fs from "fs";
import type { CoverageManifest } from "../shared/coverage-types";

const manifest: CoverageManifest = {
  namespaces: Object.create(null)
};

interface ElementInfo {
  name: string;
  kind: string;
}

function processNamespace(nsName: string, elements: ElementInfo[], browser: "chrome" | "firefox") {
  if (!manifest.namespaces[nsName]) {
    manifest.namespaces[nsName] = {
      chrome: false,
      firefox: false,
      elements: Object.create(null)
    };
  }

  const ns = manifest.namespaces[nsName];

  for (const el of elements) {
    if (!el.name) continue;
    if (!ns.elements[el.name]) {
      ns.elements[el.name] = {
        chrome: false,
        firefox: false,
        kind: el.kind
      };
    }
    ns.elements[el.name][browser] = true;
    if (!ns.elements[el.name].kind) ns.elements[el.name].kind = el.kind;
  }
  ns[browser] = true;
}

function getElementsFromModule(module: ModuleDeclaration): ElementInfo[] {
  const elements = new Map<string, string>();
  for (const statement of module.getStatements()) {
    let kind = "type";
    let name = "";
    if (Node.isFunctionDeclaration(statement)) {
      kind = "function";
      name = statement.getName() || "";
    } else if (Node.isInterfaceDeclaration(statement)) {
      kind = "interface";
      name = statement.getName() || "";
    } else if (Node.isClassDeclaration(statement)) {
      kind = "class";
      name = statement.getName() || "";
    } else if (Node.isTypeAliasDeclaration(statement)) {
      kind = "type";
      name = statement.getName() || "";
    } else if (Node.isEnumDeclaration(statement)) {
      kind = "enum";
      name = statement.getName() || "";
    } else if (Node.isVariableStatement(statement)) {
      kind = "variable";
      for (const decl of statement.getDeclarations()) {
        const dName = decl.getName();
        if (dName) elements.set(dName, kind);
      }
      continue;
    } else if (Node.isModuleDeclaration(statement)) {
      kind = "namespace";
      name = statement.getName() || "";
    }
    if (name) elements.set(name, kind);
  }
  return Array.from(elements.entries()).map(([name, kind]) => ({ name, kind }));
}

function traverseModules(
  container: { getModules(): ModuleDeclaration[]; getStatements(): Node[] },
  browser: "chrome" | "firefox",
  prefix = ""
) {
  for (const mod of container.getModules()) {
    const rawName = mod.getName().replace(/['"]/g, '');
    let cleanName = rawName;
    if (browser === "firefox") {
      if (cleanName.startsWith("browser.")) {
        cleanName = cleanName.substring("browser.".length);
      } else if (cleanName === "browser") {
        traverseModules(mod, browser, "");
        continue;
      }
    }
    const currentFullName = prefix ? `${prefix}.${cleanName}` : cleanName;
    const elements = getElementsFromModule(mod);
    if (elements.length > 0) {
      processNamespace(currentFullName, elements, browser);
    }
    traverseModules(mod, browser, currentFullName);
  }
}

const project = new Project();
project.addSourceFilesAtPaths("node_modules/chrome-types/index.d.ts");
const chromeFile = project.getSourceFileOrThrow("index.d.ts");
const chromeNs = chromeFile.getModuleOrThrow("chrome");
traverseModules(chromeNs, "chrome");

project.addSourceFilesAtPaths("node_modules/@types/firefox-webext-browser/index.d.ts");
const firefoxFiles = project.getSourceFiles().filter(f => f.getFilePath().includes("firefox-webext-browser"));
if (firefoxFiles.length > 0) {
  const firefoxFile = firefoxFiles[0];
  traverseModules(firefoxFile, "firefox");
} else {
  throw new Error("Firefox types not found. Cannot generate valid coverage data.");
}

let md = "# API Coverage Status\n\n";
md += `Total Namespaces: ${Object.keys(manifest.namespaces).length}\n\n`;

const sortedNamespaces = Object.entries(manifest.namespaces).sort(([a], [b]) => a.localeCompare(b));
for (const [nsName, ns] of sortedNamespaces) {
  md += `## \`${nsName}\`\n\n`;
  md += `| Element | Chrome | Firefox |\n`;
  md += `|---|---|---|\n`;
  const sortedElements = Object.entries(ns.elements).sort(([a], [b]) => a.localeCompare(b));
  for (const [elName, el] of sortedElements) {
    md += `| \`${elName}\` | ${el.chrome ? "✅" : "❌"} | ${el.firefox ? "✅" : "❌"} |\n`;
  }
  md += `\n`;
}

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/COVERAGE.md", md);
console.log("Generated docs/COVERAGE.md");

