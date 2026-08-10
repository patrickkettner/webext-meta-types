import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  normalizeSource,
  canonicalizeSignature,
  splitFunctionOverloads,
  ensureExport,
  validatePatch,
  applyPatches,
  reconcileStructuralForms,
  emitDts,
  annotateUpstreamAny,
  generate,
  isOptionalMember,
  stripOptionalMarker,
  makeOptional,
  setMethodOptional,
  wrapUnion,
  unionMember,
  type IRNamespace,
  type IRElement,
  type MergeIssue
} from "../src/generator";
import { checkArtifactInIsolation, parseTscDiagnostics } from "../scripts/check-artifacts";
import { checkPatchOverrides, checkSourceFiles } from "../scripts/enforce-zero-any";

// ─── normalizeSource ───────────────────────────────────────────────────

describe("normalizeSource", () => {
  it("collapses whitespace", () => {
    assert.equal(normalizeSource("foo  bar\n  baz"), "foo bar baz");
  });

  it("strips JSDoc comments", () => {
    assert.equal(normalizeSource("/** comment */\nfunction foo() {}"), "function foo(){}");
  });

  it("strips block comments", () => {
    assert.equal(normalizeSource("/* block */\nconst x = 1;"), "const x = 1;");
  });

  it("strips line comments", () => {
    assert.equal(normalizeSource("const x = 1; // inline\nconst y = 2;"), "const x = 1;const y = 2;");
  });

  it("returns empty string for whitespace-only input", () => {
    assert.equal(normalizeSource("   \n\n  "), "");
  });

  it("treats sources differing only by whitespace as equal", () => {
    const a = "export function query(\n  options: QueryInfo\n): void;";
    const b = "export function query(options: QueryInfo): void;";
    assert.equal(normalizeSource(a), normalizeSource(b));
  });

  it("treats sources differing only by JSDoc as equal", () => {
    const a = "/** Chrome docs */\nexport interface Tab { id: number; }";
    const b = "/** Firefox docs */\nexport interface Tab { id: number; }";
    assert.equal(normalizeSource(a), normalizeSource(b));
  });
});

// ─── canonicalizeSignature ─────────────────────────────────────────────

describe("canonicalizeSignature", () => {
  it("strips export keyword", () => {
    assert.equal(
      canonicalizeSignature("export function get(name?: string): Promise<Alarm>;"),
      canonicalizeSignature("function get(name?: string): Promise<Alarm>;")
    );
  });

  it("normalizes optional field syntax with undefined", () => {
    assert.equal(
      canonicalizeSignature("tab?: tabs.Tab | undefined;"),
      canonicalizeSignature("tab?: tabs.Tab;")
    );
  });

  it("normalizes union leading bar", () => {
    assert.equal(
      canonicalizeSignature('type PlatformOs = | "mac" | "win";'),
      canonicalizeSignature('export type PlatformOs = "mac" | "win";')
    );
  });

  it("aligns Chrome and Firefox event wrappers", () => {
    assert.equal(
      canonicalizeSignature("export const onAlarm: events.Event<(alarm: Alarm) => void>;"),
      canonicalizeSignature("const onAlarm: WebExtEvent<(name: Alarm) => void>;")
    );
  });
});

// ─── splitFunctionOverloads ────────────────────────────────────────────

describe("splitFunctionOverloads", () => {
  it("splits multi-overload functions into individual signatures", () => {
    const src = "export function get(name?: string): Promise<Alarm>; export function get(name?: string, cb?: () => void): void;";
    const overloads = splitFunctionOverloads(src);
    assert.equal(overloads.length, 2);
    assert.ok(overloads[0].includes("Promise<Alarm>"));
    assert.ok(overloads[1].includes("cb?: () => void"));
  });

  it("returns single signature for non-overloaded function", () => {
    const src = "function getAll(): Promise<Alarm[]>;";
    const overloads = splitFunctionOverloads(src);
    assert.equal(overloads.length, 1);
  });

  it("does not split on semicolons inside block comments (C4)", () => {
    const src = "/** Sets the value; see docs. */\nexport function set(a: string): void;";
    const overloads = splitFunctionOverloads(src);
    assert.equal(overloads.length, 1);
    assert.equal(overloads[0], src);
  });

  it("does not split on semicolons inside single-line comments (C4)", () => {
    const src = "// Semicolon; in comment\nexport function set(a: string): void;";
    const overloads = splitFunctionOverloads(src);
    assert.equal(overloads.length, 1);
    assert.equal(overloads[0], src);
  });

  it("does not split on semicolons inside string literals (C4)", () => {
    const src = 'export type X = "a;b";';
    const overloads = splitFunctionOverloads(src);
    assert.equal(overloads.length, 1);
    assert.equal(overloads[0], src);
  });
});

// ─── ensureExport ──────────────────────────────────────────────────────

describe("ensureExport", () => {
  it("adds export to non-exported functions", () => {
    assert.equal(ensureExport("function foo(): void;"), "export function foo(): void;");
  });

  it("preserves existing export", () => {
    assert.equal(ensureExport("export function foo(): void;"), "export function foo(): void;");
  });

  it("inserts export after leading JSDoc comments", () => {
    const src = "/** Some doc */\nfunction foo(): void;";
    const expected = "/** Some doc */\nexport function foo(): void;";
    assert.equal(ensureExport(src), expected);
  });
});

// ─── validatePatch & applyPatches ──────────────────────────────────────

describe("validatePatch & applyPatches", () => {
  it("accepts a valid patch with defaults", () => {
    const patch = validatePatch({
      namespace: "storage",
      element: "StorageArea",
      overrideFirefox: "interface StorageArea {}"
    }, "test.json");
    assert.equal(patch.namespace, "storage");
    assert.equal(patch.element, "StorageArea");
    assert.equal(patch.mode, "merge"); // default
  });

  it("accepts explicit replace mode", () => {
    const patch = validatePatch({
      namespace: "storage", element: "StorageArea",
      mode: "replace", overrideChrome: "interface StorageArea {}"
    }, "test.json");
    assert.equal(patch.mode, "replace");
  });

  it("preserves bug_url", () => {
    const patch = validatePatch({
      namespace: "ns", element: "el",
      bug_url: "https://bugs.example.com/123",
      overrideChrome: "type X = string;"
    }, "test.json");
    assert.equal(patch.bug_url, "https://bugs.example.com/123");
  });

  it("rejects non-object input", () => {
    assert.throws(() => validatePatch(null, "test.json"), /must be a JSON object/);
    assert.throws(() => validatePatch("string", "test.json"), /must be a JSON object/);
    assert.throws(() => validatePatch(42, "test.json"), /must be a JSON object/);
  });

  it("rejects missing namespace", () => {
    assert.throws(() => validatePatch({ element: "foo", overrideChrome: "x" }, "test.json"), /missing or non-string "namespace"/);
  });

  it("rejects empty namespace", () => {
    assert.throws(() => validatePatch({ namespace: "", element: "foo", overrideChrome: "x" }, "test.json"), /missing or non-string "namespace"/);
  });

  it("rejects missing element", () => {
    assert.throws(() => validatePatch({ namespace: "foo", overrideChrome: "x" }, "test.json"), /missing or non-string "element"/);
  });

  it("rejects invalid mode", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", mode: "invalid", overrideChrome: "x"
    }, "test.json"), /"mode" must be "replace" or "merge"/);
  });

  it("rejects missing overrides", () => {
    assert.throws(() => validatePatch({ namespace: "foo", element: "bar" }, "test.json"), /must have at least one/);
  });

  it("rejects non-string overrideChrome", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", overrideChrome: 123
    }, "test.json"), /"overrideChrome" must be a string/);
  });
});

function makeIR(elements: Array<{
  ns: string;
  name: string;
  kind: "function" | "interface" | "type" | "variable" | "namespace";
  chrome?: string;
  firefox?: string;
  chromeTypeParamsCount?: number;
  firefoxTypeParamsCount?: number;
}>) {
  const ir = new Map<string, IRNamespace>();
  for (const el of elements) {
    if (!ir.has(el.ns)) {
      ir.set(el.ns, { name: el.ns, elements: new Map<string, IRElement>() });
    }
    ir.get(el.ns)!.elements.set(el.name, {
      name: el.name,
      kind: el.kind,
      chromeSource: el.chrome,
      firefoxSource: el.firefox,
      isChromeOnly: !!el.chrome && !el.firefox,
      isFirefoxOnly: !el.chrome && !!el.firefox,
      chromeTypeParamsCount: el.chromeTypeParamsCount ?? 0,
      firefoxTypeParamsCount: el.firefoxTypeParamsCount ?? 0,
    });
  }
  return ir;
}

// ─── emitDts ───────────────────────────────────────────────────────────

describe("emitDts", () => {

  it("does not include SupportedBrowser type", () => {
    const ir = makeIR([]);
    const output = emitDts(ir);
    assert.ok(!output.includes("SupportedBrowser"));
  });

  it("includes required preamble stubs", () => {
    const ir = makeIR([]);
    const output = emitDts(ir);
    assert.ok(output.includes("type WebExtEvent"));
    assert.ok(output.includes("type _WebExtDirectoryEntry"));
    assert.ok(output.includes("type CustomChromeEvent"));
    assert.ok(output.includes("namespace usb"));
    assert.ok(output.includes("type LocalMediaStream"));
    assert.ok(output.includes("type _WebExtJsonObject"));
    assert.ok(output.includes("type _WebExtJsonValue"));
  });

  it("marks identical sources as shared", () => {
    const ir = makeIR([{
      ns: "tabs", name: "query", kind: "function",
      chrome: "export function query(): void;",
      firefox: "export function query(): void;",
    }]);
    const output = emitDts(ir);
    assert.ok(output.includes("@supported Chrome, Firefox"));
  });

  it("marks sources differing only in whitespace and export modifier as shared", () => {
    const ir = makeIR([{
      ns: "tabs", name: "query", kind: "function",
      chrome: "export function query(\n  opts: QueryInfo\n): void;",
      firefox: "function query(opts: QueryInfo): void;",
    }]);
    const output = emitDts(ir);
    assert.ok(output.includes("@supported Chrome, Firefox"));
  });

  it("matches Promise function overloads between Chrome and Firefox", () => {
    const ir = makeIR([{
      ns: "alarms", name: "get", kind: "function",
      chrome: "export function get(name?: string): Promise<Alarm | undefined>; export function get(name?: string, cb?: (a?: Alarm) => void): void;",
      firefox: "function get(name?: string): Promise<Alarm | undefined>;",
    }]);
    const output = emitDts(ir);
    assert.ok(output.includes("@supported Chrome, Firefox"));
    assert.ok(output.includes("@supported Chrome")); // for callback overload
  });

  it("marks chrome-only elements", () => {
    const ir = makeIR([
      { ns: "tabs", name: "chromeOnly", kind: "function", chrome: "export function chromeOnly(): void;" },
    ]);
    const output = emitDts(ir);
    assert.ok(output.includes("@supported Chrome"));
    assert.ok(output.includes("declare namespace chrome"));
    assert.ok(!output.includes("@supported Firefox"));
  });

  it("marks firefox-only elements", () => {
    const ir = makeIR([
      { ns: "tabs", name: "firefoxOnly", kind: "function", firefox: "export function firefoxOnly(): void;" },
    ]);
    const output = emitDts(ir);
    assert.ok(output.includes("@supported Firefox"));
    assert.ok(output.includes("declare namespace browser"));
  });

  it("respects target filter for chrome-only output", () => {
    const ir = makeIR([
      { ns: "tabs", name: "chromeOnly", kind: "function", chrome: "export function chromeOnly(): void;" },
      { ns: "tabs", name: "firefoxOnly", kind: "function", firefox: "export function firefoxOnly(): void;" }
    ]);
    const output = emitDts(ir, "chrome");
    assert.ok(output.includes("chromeOnly"));
    assert.ok(!output.includes("firefoxOnly"));
  });

  it("respects target filter for firefox-only output", () => {
    const ir = makeIR([
      { ns: "tabs", name: "chromeOnly", kind: "function", chrome: "export function chromeOnly(): void;" },
      { ns: "tabs", name: "firefoxOnly", kind: "function", firefox: "export function firefoxOnly(): void;" }
    ]);
    const output = emitDts(ir, "firefox");
    assert.ok(output.includes("firefoxOnly"));
    assert.ok(!output.includes("chromeOnly"));
  });

  it("does not alias un-emitted namespaces in target-pruned browser namespace (A1)", () => {
    const ir = makeIR([
      { ns: "tabs", name: "query", kind: "function", chrome: "export function query(): void;", firefox: "export function query(): void;" },
      { ns: "contextualIdentities", name: "get", kind: "function", firefox: "export function get(): void;" }
    ]);
    const output = emitDts(ir, "chrome");
    assert.ok(output.includes("export namespace tabs"));
    assert.ok(!output.includes("export namespace contextualIdentities"));
    assert.ok(output.includes("export import tabs = chrome.tabs;"));
    assert.ok(!output.includes("export import contextualIdentities = chrome.contextualIdentities;"));
  });

  it("does not leak out-of-target types into surviving declarations (A2)", () => {
    const ir = makeIR([
      {
        ns: "storage", name: "_SyncStorageAreaWithUsage", kind: "interface",
        firefox: "export interface _SyncStorageAreaWithUsage { quota: number; }"
      },
      {
        ns: "storage", name: "sync", kind: "variable",
        chrome: "export const sync: { quotaBytes: number };",
        firefox: "export const sync: _SyncStorageAreaWithUsage;"
      },
      {
        ns: "webRequest", name: "_HttpHeaders", kind: "interface",
        firefox: "export interface _HttpHeaders { name: string; }"
      },
      {
        ns: "webRequest", name: "HttpHeaders", kind: "type",
        chrome: "export type HttpHeaders = { name: string }[];",
        firefox: "export type HttpHeaders = _HttpHeaders[];"
      }
    ]);
    const chromeOutput = emitDts(ir, "chrome");
    assert.ok(!chromeOutput.includes("_SyncStorageAreaWithUsage"));
    assert.ok(!chromeOutput.includes("_HttpHeaders"));
    assert.ok(chromeOutput.includes("export const sync: { quotaBytes: number };"));
    assert.ok(chromeOutput.includes("export type HttpHeaders = { name: string }[];"));

    const fullOutput = emitDts(ir);
    assert.ok(fullOutput.includes("_SyncStorageAreaWithUsage"));
    assert.ok(fullOutput.includes("_HttpHeaders"));
    assert.ok(fullOutput.includes("export const sync: { quotaBytes: number } | _SyncStorageAreaWithUsage;"));
  });

  it("omits empty namespaces", () => {
    const ir = makeIR([]);
    const output = emitDts(ir);
    assert.ok(output.includes("declare namespace chrome"));
    assert.ok(!output.includes("export namespace"));
  });
});

// ─── annotateUpstreamAny ───────────────────────────────────────────────

describe("annotateUpstreamAny", () => {
  it("does not replace the word any inside JSDoc comments or string literals", () => {
    const input = `/**\n * Error that occurred, if any.\n */\nexport const x = "any value";\nexport type Test = any;\n`;
    const result = annotateUpstreamAny(input);
    assert.ok(result.includes("* Error that occurred, if any."));
    assert.ok(result.includes('const x = "any value";'));
    assert.ok(result.includes("export type Test = /* TODO: Upstream type uses any */ any;"));
  });

  it("does not re-annotate any if a TODO already exists on the line or preceding lines", () => {
    const input = `// TODO: Upstream type uses any\nexport type Test = any;\n`;
    const result = annotateUpstreamAny(input);
    assert.equal(result, input);
  });
});

// ─── Mandatory Convergence Invariant ───────────────────────────────────

describe("Convergence CI Invariant (Decision 16)", () => {
  it("ensures generated dist/index.d.ts has substantial @supported Chrome, Firefox convergence (> 100)", () => {
    if (!fs.existsSync("dist/index.d.ts")) {
      generate();
    }
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");
    const sharedMatches = dts.match(/@supported Chrome, Firefox/g);
    const count = sharedMatches ? sharedMatches.length : 0;
    assert.ok(
      count >= 100,
      `Expected at least 100 shared convergence tags (@supported Chrome, Firefox), but found ${count}. Regression in AST canonicalization!`
    );
  });
});

// ─── Optionality Helpers (Round B) ──────────────────────────────────────

describe("Optionality Helpers (Round B)", () => {
  it("anchors stripOptionalMarker to member identifier (B1)", () => {
    // Parameter optionality must NOT be stripped
    assert.equal(stripOptionalMarker("foo(a: string): void"), "foo(a: string): void");
    assert.equal(stripOptionalMarker("foo(a?: string): void"), "foo(a?: string): void");

    // Member optionality must be stripped for comparison
    assert.equal(
      stripOptionalMarker("createStatusBarButton(iconPath?: string): void"),
      "createStatusBarButton(iconPath?: string): void"
    );
    assert.equal(
      stripOptionalMarker("createStatusBarButton?(iconPath?: string): void"),
      "createStatusBarButton(iconPath?: string): void"
    );
    assert.equal(stripOptionalMarker("bar?: string"), "bar: string");
    assert.equal(stripOptionalMarker("bar: string"), "bar: string");
    assert.equal(stripOptionalMarker('"quoted-member"?: string'), '"quoted-member": string');
  });

  it("distinguishes member optionality from parameter optionality with isOptionalMember (B2)", () => {
    assert.equal(isOptionalMember("foo(a?: string): void"), false);
    assert.equal(isOptionalMember("foo?(a?: string): void"), true);
    assert.equal(isOptionalMember("bar: string"), false);
    assert.equal(isOptionalMember("bar?: string"), true);
    assert.equal(isOptionalMember('"baz"?: number'), true);
  });

  it("converts properties to optional with makeOptional (B3)", () => {
    assert.equal(makeOptional("selected: boolean"), "selected?: boolean");
    assert.equal(makeOptional("selected?: boolean"), "selected?: boolean");
    assert.equal(makeOptional("  count: number"), "  count?: number");
    assert.equal(makeOptional("url: string"), "url?: string");
  });

  it("converts methods to optional with setMethodOptional", () => {
    assert.equal(
      setMethodOptional("createStatusBarButton(icon: string): Button", true),
      "createStatusBarButton?(icon: string): Button"
    );
    assert.equal(
      setMethodOptional("createStatusBarButton?(icon: string): Button", false),
      "createStatusBarButton(icon: string): Button"
    );
  });
});

describe("emitDts Optionality Handling (Round B)", () => {
  it("widens methods optional in one browser and emits note without inverting (B2)", () => {
    const ir = makeIR([
      {
        ns: "panels",
        name: "ExtensionPanel",
        kind: "interface",
        chrome: "export interface ExtensionPanel { createStatusBarButton(iconPath: string): Button; }",
        firefox: "export interface ExtensionPanel { createStatusBarButton?(iconPath: string): Button; }"
      }
    ]);
    const output = emitDts(ir);
    assert.ok(output.includes("createStatusBarButton?(iconPath: string): Button;"));
    assert.ok(output.includes("@note optional in Firefox, required in Chrome"));
  });

  it("preserves separate overloads when parameter optionality differs (B1)", () => {
    const ir = makeIR([
      {
        ns: "test",
        name: "Foo",
        kind: "interface",
        chrome: "export interface Foo { bar(a: string): void; }",
        firefox: "export interface Foo { bar(a?: string): void; }"
      }
    ]);
    const output = emitDts(ir);
    // Both forms must be emitted as an overload set
    assert.ok(output.includes("bar(a: string): void;"));
    assert.ok(output.includes("bar(a?: string): void;"));
  });

  it("emits single-browser members in shared interfaces as optional in unified build (B3)", () => {
    const ir = makeIR([
      {
        ns: "tabs",
        name: "Tab",
        kind: "interface",
        chrome: "export interface Tab { id: number; selected: boolean; active: boolean; }",
        firefox: "export interface Tab { id: number; active: boolean; cookieStoreId: string; }"
      }
    ]);
    const unifiedOutput = emitDts(ir);
    assert.ok(unifiedOutput.includes("id: number;"));
    assert.ok(unifiedOutput.includes("active: boolean;"));
    assert.ok(unifiedOutput.includes("selected?: boolean;"));
    assert.ok(unifiedOutput.includes("cookieStoreId?: string;"));
    assert.ok(unifiedOutput.includes("@note optional in the merged set, required in Chrome"));
    assert.ok(unifiedOutput.includes("@note optional in the merged set, required in Firefox"));

    // In Chrome-only build, Chrome's selected must remain required
    const chromeOutput = emitDts(ir, "chrome");
    assert.ok(chromeOutput.includes("selected: boolean;"));
    assert.ok(!chromeOutput.includes("cookieStoreId"));
  });
});

// ─── Artifact Isolation Harness (A3) ───────────────────────────────────

describe("Standalone Artifact Isolation Check Harness (A3)", () => {
  it("reliably detects dangling references and defeats ambient @types inclusion", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fixture-test-"));
    const brokenFixture = path.join(tmpDir, "broken.d.ts");
    // References _SyncStorageAreaWithUsage which is declared in @types/firefox-webext-browser
    fs.writeFileSync(
      brokenFixture,
      'declare namespace chrome.storage { export const sync: _SyncStorageAreaWithUsage; }\n'
    );

    try {
      const result = checkArtifactInIsolation(brokenFixture);
      assert.ok(result.errorCount > 0, "Expected broken fixture with dangling type reference to fail tsc check");
      assert.ok(result.output.includes("Cannot find name '_SyncStorageAreaWithUsage'"));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("correctly parses compiler diagnostics containing ANSI escapes and pretty formatting without throwing", () => {
    // Exact ANSI escape sequence emitted by tsc when --pretty is active
    const rawAnsiOutput = "\u001b[96mtest.ts\u001b[0m:\u001b[93m1\u001b[0m:\u001b[93m55\u001b[0m - \u001b[91merror\u001b[0m\u001b[90m TS2304: \u001b[0mCannot find name '_SyncStorageAreaWithUsage'.\n";
    const diagnostics = parseTscDiagnostics(rawAnsiOutput);
    assert.equal(diagnostics.length, 1);
    assert.ok(diagnostics[0].includes("error TS2304"));
  });
});

// ─── Guard Tests (Round C) ─────────────────────────────────────────────

describe("Zero-Any Gate (C1)", () => {
  it("detects un-annotated any in overrideShared patches", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-test-"));
    const patchFile = path.join(tmpDir, "patch.json");
    fs.writeFileSync(
      patchFile,
      JSON.stringify([{
        namespace: "tabs",
        element: "test",
        overrideShared: "export const test: any;"
      }])
    );

    try {
      const violations = checkPatchOverrides(tmpDir);
      assert.equal(violations.length, 1);
      assert.equal(violations[0].field, "overrideShared");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe("Patch-Target Guard (C2)", () => {
  it("rejects non-existent namespace without create: true", () => {
    const ir = makeIR([]);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-guard-test-"));
    const patchFile = path.join(tmpDir, "test.json");
    fs.writeFileSync(
      patchFile,
      JSON.stringify([{
        namespace: "tabss",
        element: "query",
        overrideChrome: "export function query(): void;"
      }])
    );

    try {
      assert.throws(
        () => applyPatches(ir, tmpDir),
        /references unknown namespace "tabss"/
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("rejects non-existent element in existing namespace without create: true", () => {
    const ir = makeIR([
      { ns: "tabs", name: "query", kind: "function", chrome: "export function query(): void;" }
    ]);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-guard-test-"));
    const patchFile = path.join(tmpDir, "test.json");
    fs.writeFileSync(
      patchFile,
      JSON.stringify([{
        namespace: "tabs",
        element: "nonExistent",
        overrideChrome: "export function nonExistent(): void;"
      }])
    );

    try {
      assert.throws(
        () => applyPatches(ir, tmpDir),
        /references unknown element "nonExistent" in namespace "tabs"/
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("allows creating new elements and namespaces when create: true is explicit", () => {
    const ir = makeIR([]);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-guard-test-"));
    const patchFile = path.join(tmpDir, "test.json");
    fs.writeFileSync(
      patchFile,
      JSON.stringify([{
        namespace: "newApi",
        element: "foo",
        create: true,
        overrideShared: "export function foo(): void;"
      }])
    );

    try {
      applyPatches(ir, tmpDir);
      assert.ok(ir.has("newApi"));
      assert.ok(ir.get("newApi")!.elements.has("foo"));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe("reconcileStructuralForms Guard (C3)", () => {
  it("records a MergeIssue when a non-literal variable collides with a namespace", () => {
    const ir = makeIR([
      {
        ns: "privacy",
        name: "network",
        kind: "variable",
        chrome: "export const network: SomeNonLiteralType;"
      },
      {
        ns: "privacy.network",
        name: "networkPredictionEnabled",
        kind: "variable",
        firefox: "export const networkPredictionEnabled: types.Setting;"
      }
    ]);
    const issues: MergeIssue[] = [];
    reconcileStructuralForms(ir, issues);
    assert.equal(issues.length, 1);
    assert.equal(issues[0].namespace, "privacy");
    assert.equal(issues[0].element, "network");
    assert.ok(issues[0].reason.includes("non-literal type"));
  });
});

// ─── Published-Output Hygiene Tests (Round D) ──────────────────────────

describe("Preamble Unqualified Globals Isolation (D1)", () => {
  it("compiles cleanly against consumer project declaring its own global JsonObject and JsonValue", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "consumer-d1-test-"));
    const distIndexPath = path.resolve("dist/index.d.ts");
    const testFile = path.join(tmpDir, "consumer.ts");
    fs.writeFileSync(
      testFile,
      `/// <reference path="${distIndexPath}" />\n\ntype JsonPrimitive = string | number | boolean | null;\ntype JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };\ntype JsonObject = { [key: string]: JsonValue };\n\nconst testObj: JsonObject = { key: "value" };\nconst tabId: number | undefined = 1;\n`
    );

    try {
      const result = checkArtifactInIsolation(testFile);
      assert.equal(result.errorCount, 0, `Expected 0 errors in consumer project, got:\n${result.output}`);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe("Upstream JSDoc Preservation (D2)", () => {
  it("preserves upstream member documentation and merges @supported in single comment block", () => {
    const ir = makeIR([
      {
        ns: "tabs",
        name: "Tab",
        kind: "interface",
        chrome: "export interface Tab {\n  /** The ID of the tab. */\n  id?: number;\n}",
        firefox: "export interface Tab {\n  /** The ID of the tab. */\n  id?: number;\n}"
      }
    ]);
    const output = emitDts(ir);
    assert.ok(output.includes("The ID of the tab."));
    assert.ok(output.includes("@supported Chrome, Firefox"));
    // Ensure only one comment block is produced (no adjacent /** ... */ /** ... */)
    const idBlock = output.slice(output.indexOf("The ID of the tab.") - 20, output.indexOf("id?: number;"));
    assert.equal((idBlock.match(/\/\*\*/g) || []).length, 1);
  });

  it("ensures dist/index.d.ts Tab interface carries upstream prose documentation", () => {
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");
    assert.ok(dts.includes("The ID of the tab. Tab IDs are unique within a browser session."));
    assert.ok(dts.includes("The zero-based index of the tab within its window."));
  });
});

describe("Event Listener Arity & Type Safety (D3)", () => {
  it("rejects invalid extra arguments passed to addListener on standard events", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "event-d3-test-"));
    const distIndexPath = path.resolve("dist/index.d.ts");
    const testFile = path.join(tmpDir, "event-test.ts");
    fs.writeFileSync(
      testFile,
      `/// <reference path="${distIndexPath}" />\n\nchrome.runtime.onInstalled.addListener(() => {}, 42 as any, "nope" as any);\n`
    );

    try {
      const result = checkArtifactInIsolation(testFile);
      assert.ok(result.errorCount > 0, "Expected compilation error for extra arguments to addListener");
      assert.ok(result.output.includes("Expected 1 arguments, but got 3") || result.output.includes("Expected 0-1 arguments, but got 3"));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("accepts valid single callback to addListener", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "event-d3-test-"));
    const distIndexPath = path.resolve("dist/index.d.ts");
    const testFile = path.join(tmpDir, "event-valid.ts");
    fs.writeFileSync(
      testFile,
      `/// <reference path="${distIndexPath}" />\n\nchrome.runtime.onInstalled.addListener((details) => {\n  console.log(details.reason);\n});\n`
    );

    try {
      const result = checkArtifactInIsolation(testFile);
      assert.equal(result.errorCount, 0, `Expected 0 errors for valid event listener, got:\n${result.output}`);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe("Decision 24 Availability & Prose Annotations", () => {
  it("annotates input.ime members with inherited chromeos platform and metadata", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { platforms?: string[] }>;
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");

    const imeKeys = Object.keys(meta).filter(k => k.startsWith("input.ime."));
    assert.ok(imeKeys.length >= 40, `Expected at least 40 input.ime entries, got ${imeKeys.length}`);
    for (const k of imeKeys) {
      assert.deepEqual(meta[k].platforms, ["chromeos"], `Expected ${k} to have platforms: ['chromeos']`);
    }

    assert.ok(
      dts.includes("@platform chromeos"),
      "Expected dist/index.d.ts to include @platform chromeos"
    );
  });

  it("annotates idle.getAutoLockDelay with member-level platform constraint", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { platforms?: string[] }>;
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");

    assert.deepEqual(meta["idle.getAutoLockDelay.overload[0]"]?.platforms, ["chromeos"]);
    assert.ok(
      dts.includes("function getAutoLockDelay(): Promise<number>;"),
      "Expected getAutoLockDelay signature in dist/index.d.ts"
    );
  });

  it("annotates privileged namespaces with @privileged prose", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { privileged?: string }>;
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");

    assert.ok(meta["telemetry.submitPing.overload[0]"]?.privileged?.includes("Requires privileged permission: telemetry"));
    assert.ok(
      dts.includes("@privileged Requires privileged permission: telemetry"),
      "Expected dist/index.d.ts to include @privileged for telemetry"
    );
  });

  it("annotates devtools namespaces with context restriction prose", () => {
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");
    assert.ok(
      dts.includes("These APIs are available only in a devtools_page context."),
      "Expected devtools context restriction prose in dist/index.d.ts"
    );
  });

  it("ensures zero Gecko-only members carry a platform annotation", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { supported?: string[]; platforms?: string[] }>;
    let count = 0;
    for (const [k, v] of Object.entries(meta)) {
      if (v.supported?.length === 1 && v.supported[0] === "firefox" && v.platforms) {
        count++;
      }
    }
    assert.equal(count, 0, `Expected 0 Gecko members with platform annotation, found ${count}`);
  });

  it("emits pre-release channel metadata for Chromium dev channel APIs", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { channel?: string }>;
    assert.equal(meta["identity.getAccounts.overload[0]"]?.channel, "dev");
    assert.equal(meta["system.storage.getAvailableCapacity.overload[0]"]?.channel, "dev");
    assert.equal(meta["mimeHandler.StreamInfo"]?.channel, "dev");
    assert.equal(meta["browserAction.openPopup.overload[0]"]?.channel, "dev");
  });
});

describe("Patch Metadata & Clean Consumer JSDoc", () => {
  it("excludes project-bookkeeping patch notes from emitted .d.ts", () => {
    const dts = fs.readFileSync("dist/index.d.ts", "utf8");
    assert.ok(
      !dts.includes("Upstream type inaccuracy patched"),
      "dist/index.d.ts should not contain 'Upstream type inaccuracy patched'"
    );
    assert.ok(
      !dts.includes("Bug URL:"),
      "dist/index.d.ts should not contain 'Bug URL:'"
    );
  });

  it("records patch status and bug_url in dist/metadata.json for auditable patch tracking", () => {
    const meta = JSON.parse(fs.readFileSync("dist/metadata.json", "utf8")) as Record<string, { patched?: boolean; bug_url?: string }>;
    const patchedEntries = Object.entries(meta).filter(([, v]) => v.patched);
    assert.ok(patchedEntries.length > 0, "Expected patched entries in dist/metadata.json");
    for (const [key, v] of patchedEntries) {
      assert.equal(v.patched, true);
      assert.ok(v.bug_url, `Expected bug_url on patched entry ${key}`);
    }
  });
});

describe("Function-Typed Member Unions (TS1385 Prevention)", () => {
  it("parenthesizes bare arrow function types in wrapUnion", () => {
    assert.equal(wrapUnion("() => void"), "(() => void)");
    assert.equal(wrapUnion("(...args: any[]) => void"), "((...args: any[]) => void)");
    assert.equal(wrapUnion("(a: number) => string"), "((a: number) => string)");
    assert.equal(wrapUnion("(() => void)"), "(() => void)");
    assert.equal(wrapUnion("string | number"), "(string | number)");
    assert.equal(wrapUnion("string"), "string");
  });

  it("unions differing function-typed members with parentheses preventing TS1385", () => {
    const ir = makeIR([
      {
        ns: "events",
        name: "Event",
        kind: "interface",
        chrome: "export interface Event<H extends (...args: any[]) => void> {\n  addListener(callback: H): void;\n}",
        firefox: "export interface Event {\n  addListener(callback: Function): void;\n}"
      },
      {
        ns: "scripting",
        name: "ScriptInjection",
        kind: "interface",
        chrome: "export interface ScriptInjection<Args extends any[] = any[]> {\n  func?: ((...args: Args) => void) | undefined;\n}",
        firefox: "export interface ScriptInjection {\n  func?: (() => void) | undefined;\n}"
      }
    ]);
    const output = emitDts(ir);
    assert.ok(
      output.includes("((...args: Args) => void)") || output.includes("(() => void)"),
      `Expected parenthesized function types in emitted output, got:\n${output}`
    );

    // Verify it compiles cleanly with isolated tsc
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "func-union-test-"));
    const testFile = path.join(tmpDir, "test.d.ts");
    fs.writeFileSync(testFile, output);
    try {
      const result = checkArtifactInIsolation(testFile);
      assert.equal(result.errorCount, 0, `Expected 0 errors for function union interface, got:\n${result.output}`);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("correctly unions two differing function signatures in unionMember", () => {
    const united = unionMember(
      "func?: (a: string) => void;",
      "func?: (b: number) => boolean;"
    );
    assert.equal(united, "func?: ((a: string) => void) | ((b: number) => boolean);");
  });

  it("reconciles method signatures and function-typed property signatures without duplicate identifiers", () => {
    const ir = makeIR([
      {
        ns: "events",
        name: "Event",
        kind: "interface",
        chrome: "export interface Event<H extends (...args: any[]) => void> {\n  addListener(callback: H): void;\n}",
        firefox: "export interface Event {\n  addListener(callback: Function): void;\n}"
      },
      {
        ns: "runtime",
        name: "Port",
        kind: "interface",
        chrome: "export interface Port {\n  name: string;\n  disconnect(): void;\n  postMessage(message: any): void;\n}",
        firefox: "export interface Port {\n  name: string;\n  disconnect: () => void;\n  postMessage: (message: any) => void;\n}"
      }
    ]);
    const output = emitDts(ir);
    assert.ok(output.includes("disconnect(): void;"));
    assert.ok(output.includes("postMessage(message: /* TODO: Upstream type uses any */ any): void;"));
    // Ensure no duplicate 'disconnect' or 'postMessage' definitions exist
    const disconnectCount = (output.match(/disconnect/g) || []).length;
    assert.equal(disconnectCount, 1, `Expected 1 disconnect member in output, got ${disconnectCount}`);

    // Verify it compiles cleanly with isolated tsc
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "port-method-test-"));
    const testFile = path.join(tmpDir, "test.d.ts");
    fs.writeFileSync(testFile, output);
    try {
      const result = checkArtifactInIsolation(testFile);
      assert.equal(result.errorCount, 0, `Expected 0 errors for normalized Port interface, got:\n${result.output}`);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});


