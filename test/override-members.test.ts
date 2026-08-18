import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkOverrideMembers } from "../scripts/verify-override-members";

/**
 * The gate must fire on the finalUrl fabrication: a Firefox override that
 * asserts a member Firefox's downloads API does not have. It must stay silent on
 * a member Firefox does have, and on an element Firefox's upstream never
 * declares (nothing to check against).
 */
describe("override members gate", () => {
  function withPatch(entry: object): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "members-"));
    fs.writeFileSync(path.join(dir, "p.json"), JSON.stringify([entry]));
    return dir;
  }

  it("flags a Firefox override asserting finalUrl on downloads.onChanged", () => {
    const dir = withPatch({
      namespace: "downloads", element: "onChanged", mode: "replace", reason: "convergence",
      overrideFirefox: "export const onChanged: events.Event<(downloadDelta: { finalUrl?: StringDelta }) => void>;",
    });
    const leaks = checkOverrideMembers(dir);
    assert.equal(leaks.length, 1);
    assert.equal(leaks[0].member, "finalUrl");
    assert.equal(leaks[0].browser, "firefox");
  });

  it("does not flag a member the browser's namespace declares", () => {
    const dir = withPatch({
      namespace: "downloads", element: "onChanged", mode: "replace", reason: "convergence",
      overrideFirefox: "export const onChanged: events.Event<(downloadDelta: { id?: number }) => void>;",
    });
    assert.equal(checkOverrideMembers(dir).length, 0);
  });

  it("does not flag members of an element upstream never declares", () => {
    const dir = withPatch({
      namespace: "_manifest", element: "ImageData", mode: "replace", reason: "convergence",
      overrideChrome: "export interface ImageData {\n  madeUpMember?: string;\n}",
    });
    assert.equal(checkOverrideMembers(dir).length, 0);
  });
});
