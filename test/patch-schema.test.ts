/**
 * The patch schema, once it is keyed by browser rather than named.
 *
 * `overrideShared` is the interesting one. It used to fan out to both browsers
 * unconditionally, which was harmless while both were the only browsers. With a
 * third id in BROWSER_ORDER and no upstream feeding it, fanning out would stamp
 * a Safari support claim onto an element no Safari data has ever touched, which
 * is precisely the unevidenced assertion the patch rules exist to prevent. So a
 * shared override corrects declarations that already exist and never invents
 * one, and an element that exists in no upstream has to name its browsers.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import {
  applyPatches,
  mkElement,
  getSource,
  browsersOf,
  type IRElement,
  type IRNamespace,
} from "../src/generator";

/** Write one patch entry to a scratch dir and apply it. Never touches patches/. */
function apply(entry: Record<string, unknown>, ir: Map<string, IRNamespace>): void {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-schema-"));
  try {
    fs.writeFileSync(path.join(dir, "t.json"), JSON.stringify([entry], null, 2));
    applyPatches(ir, dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const irWith = (el?: IRElement): Map<string, IRNamespace> => {
  const elements = new Map<string, IRElement>();
  if (el) elements.set(el.name, el);
  return new Map([["alpha", { name: "alpha", elements }]]);
};

describe("patch schema keyed by browser", () => {
  it("accepts an override for a browser that has no ingestion yet", () => {
    const ir = irWith();
    apply({
      namespace: "alpha", element: "S", mode: "replace", reason: "enhancement",
      overrideSafari: "export interface S { a: string; }",
    }, ir);
    const el = ir.get("alpha")!.elements.get("S")!;
    assert.deepEqual(browsersOf(el), ["safari"]);
    assert.match(getSource(el, "safari")!, /a: string/);
  });

  it("overrideShared reaches only the browsers that already declare the element", () => {
    const el = mkElement("Existing", "interface", {
      chrome: { source: "export interface Existing { a: string; }" },
    });
    const ir = irWith(el);
    apply({
      namespace: "alpha", element: "Existing", mode: "replace", reason: "convergence",
      overrideShared: "export interface Existing { a: number; }",
    }, ir);
    const after = ir.get("alpha")!.elements.get("Existing")!;
    assert.deepEqual(browsersOf(after), ["chrome"], "must not invent a source for a browser");
    assert.match(getSource(after, "chrome")!, /a: number/, "and must correct the one that exists");
  });

  it("overrideShared applies to every declaring browser, not just the first", () => {
    const el = mkElement("Both", "interface", {
      chrome: { source: "export interface Both { a: string; }" },
      safari: { source: "export interface Both { a: string; }" },
    });
    const ir = irWith(el);
    apply({
      namespace: "alpha", element: "Both", mode: "replace", reason: "convergence",
      overrideShared: "export interface Both { a: number; }",
    }, ir);
    const after = ir.get("alpha")!.elements.get("Both")!;
    assert.deepEqual(browsersOf(after), ["chrome", "safari"]);
    for (const b of ["chrome", "safari"] as const) {
      assert.match(getSource(after, b)!, /a: number/);
    }
  });

  it("a shared-only override on an element no upstream declares is an error, not a silent drop", () => {
    const ir = irWith();
    assert.throws(
      () => apply({
        namespace: "alpha", element: "Ghost", mode: "replace", reason: "enhancement",
        overrideShared: "export interface Ghost { a: string; }",
      }, ir),
      /applies to no browser/
    );
    assert.equal(ir.get("alpha")!.elements.size, 0, "and nothing is created");
  });

  it("an entry with no override at all is rejected, listing every accepted key", () => {
    assert.throws(
      () => apply({ namespace: "alpha", element: "Empty", reason: "enhancement" }, irWith()),
      /overrideChrome, overrideFirefox, overrideSafari, or "overrideShared"/
    );
  });

  it("merge mode appends the shared text to every declaring browser", () => {
    const el = mkElement("M", "interface", {
      chrome: { source: "export interface M { a: string; }" },
      safari: { source: "export interface M { a: string; }" },
    });
    const ir = irWith(el);
    apply({
      namespace: "alpha", element: "M", mode: "merge", reason: "enhancement",
      overrideShared: "export interface M { b: number; }",
    }, ir);
    const after = ir.get("alpha")!.elements.get("M")!;
    assert.deepEqual(browsersOf(after), ["chrome", "safari"]);
    for (const b of ["chrome", "safari"] as const) {
      const src = getSource(after, b)!;
      assert.match(src, /a: string/, "the upstream declaration survives a merge");
      assert.match(src, /b: number/, "and the patch is appended to it");
    }
    assert.equal(getSource(after, "firefox"), undefined, "no source is invented");
  });

  it("a misspelled override key is rejected, not silently ignored", () => {
    // The removal harness derives its work list from the same key names, so an
    // unknown key applied nothing and was tested as nothing while still reading
    // as a patch on the page.
    assert.throws(
      () => apply({
        namespace: "alpha", element: "Typo", mode: "replace", reason: "enhancement",
        overrideSafai: "export interface Typo { a: string; }",
      }, irWith()),
      /unknown field "overrideSafai"/
    );
  });
});
