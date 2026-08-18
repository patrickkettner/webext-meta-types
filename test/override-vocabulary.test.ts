import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkOverrideVocabulary } from "../scripts/verify-override-vocabulary";

/**
 * The gate must go red on a Firefox override that names a Chrome-only type,
 * and stay green on one that names an ES intrinsic. A gate never seen to fail
 * is theatre; this proves it can.
 */
describe("override vocabulary gate", () => {
  function withPatch(entry: object): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vocab-"));
    fs.writeFileSync(path.join(dir, "p.json"), JSON.stringify([entry]));
    return dir;
  }

  it("flags a Firefox override naming a Chrome-only dictionary", () => {
    const dir = withPatch({
      namespace: "cookies", element: "Cookie", mode: "replace", reason: "convergence",
      overrideFirefox: "export interface Cookie {\n  partitionKey?: CookiePartitionKey;\n}",
    });
    const leaks = checkOverrideVocabulary(dir);
    assert.equal(leaks.length, 1);
    assert.equal(leaks[0].name, "CookiePartitionKey");
    assert.deepEqual(leaks[0].alsoDeclaredBy, ["chrome"]);
  });

  it("does not flag an ES intrinsic like Error", () => {
    const dir = withPatch({
      namespace: "runtime", element: "Port", mode: "replace", reason: "convergence",
      overrideFirefox: "export interface Port {\n  error?: Error;\n}",
    });
    assert.equal(checkOverrideVocabulary(dir).length, 0);
  });

  it("does not flag a name the same browser declares", () => {
    const dir = withPatch({
      namespace: "cookies", element: "Cookie", mode: "replace", reason: "convergence",
      overrideFirefox: "export interface Cookie {\n  partitionKey?: PartitionKey;\n}",
    });
    assert.equal(checkOverrideVocabulary(dir).length, 0);
  });
});
