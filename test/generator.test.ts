import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  annotateUpstreamAny,
  applyPatches,
  canonicalizeSignature,
  emitDts,
  ensureExport,
  generate,
  mkElement,
  normalizeSource,
  reconcileStructuralForms,
  splitFunctionOverloads,
  validatePatch,
  type IRElement,
  type IRNamespace,
  type MergeIssue
} from "../src/generator";
import { checkArtifactInIsolation, parseTscDiagnostics } from "../scripts/check-artifacts";
import { checkPatchOverrides, checkSourceFiles } from "../scripts/enforce-zero-any";

// ─── normalizeSource ───────────────────────────────────────────────────

// ---- Tests inherited from the released line (webext-meta-types@1.1.0) ----

// Not carried over from the released line: the blocks below built IR elements
// with chromeSource/firefoxSource fields through a makeIR helper. This
// generator keys sources by browser in a set and merges N browsers, so those
// tests describe a contract that was replaced, not behaviour that regressed.
// Dropped: validatePatch & applyPatches, emitDts, emitDts Optionality Handling (Round B), Patch-Target Guard (C2), reconcileStructuralForms Guard (C3), Upstream JSDoc Preservation (D2), Function-Typed Member Unions (TS1385 Prevention)

// Also not carried over: "Decision 24 Availability & Prose Annotations" and
// "Patch Metadata & Clean Consumer JSDoc". The released line emitted
// @privileged, @platform, @channel and devtools-context prose from a
// hand-written path table in getAvailability, with no citation, disagreeing
// with the @chrome-platform/@chrome-channel tags chrome-types actually carries
// on 25 namespaces (the table covered 9) and with Firefox's _PermissionPrivileged
// on 5 of 8 names. This generator declines to ship claims it did not derive.
// The honest version reads those upstream JSDoc tags into the per-browser IR;
// see WORKPLAN.md. Its patch-status test required every patch to carry a
// bug_url, which the released corpus satisfied with 557 copies of "TBD"; that
// invariant is what CLAUDE.md rule 6 forbids.

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
      element: "StorageArea", reason: "convergence",
      overrideFirefox: "interface StorageArea {}"
    }, "test.json");
    assert.equal(patch.namespace, "storage");
    assert.equal(patch.element, "StorageArea");
    assert.equal(patch.mode, "merge"); // default
  });

  it("accepts explicit replace mode", () => {
    const patch = validatePatch({
      namespace: "storage", element: "StorageArea", reason: "convergence",
      mode: "replace", overrideChrome: "interface StorageArea {}"
    }, "test.json");
    assert.equal(patch.mode, "replace");
  });

  it("preserves bug_url", () => {
    const patch = validatePatch({
      namespace: "ns", element: "el", reason: "upstream-defect",
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
    assert.throws(() => validatePatch({ namespace: "", element: "foo", reason: "convergence", overrideChrome: "x" }, "test.json"), /missing or non-string "namespace"/);
  });

  it("rejects missing element", () => {
    assert.throws(() => validatePatch({ namespace: "foo", overrideChrome: "x" }, "test.json"), /missing or non-string "element"/);
  });

  it("rejects invalid mode", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", reason: "convergence", mode: "invalid", overrideChrome: "x"
    }, "test.json"), /"mode" must be "replace" or "merge"/);
  });

  it("rejects missing overrides", () => {
    assert.throws(() => validatePatch({ namespace: "foo", element: "bar", reason: "convergence" }, "test.json"), /must have at least one/);
  });

  it("rejects a patch with no reason", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", overrideChrome: "type X = string;"
    }, "test.json"), /must declare "reason"/);
  });

  it("rejects an unknown reason", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", reason: "because", overrideChrome: "type X = string;"
    }, "test.json"), /must declare "reason"/);
  });

  it("rejects a placeholder bug_url", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", reason: "upstream-defect",
      bug_url: "TBD", overrideChrome: "type X = string;"
    }, "test.json"), /placeholder bug_url/);
  });

  it("rejects a bug_url on a non-defect patch", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", reason: "convergence",
      bug_url: "https://bugs.example.com/1", overrideChrome: "type X = string;"
    }, "test.json"), /Only upstream-defect patches cite a bug/);
  });

  it("rejects non-string overrideChrome", () => {
    assert.throws(() => validatePatch({
      namespace: "foo", element: "bar", reason: "convergence", overrideChrome: 123
    }, "test.json"), /"overrideChrome" must be a string/);
  });
});

// ─── emitDts ───────────────────────────────────────────────────────────

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
