import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkGeckoPin } from "../scripts/verify-gecko-pin";

/**
 * The gate must go red on a major mismatch and on an unresolvable tag, and
 * stay green when the pin matches and its tag actually resolves. A gate
 * never seen to fail is theatre; this proves it can, on both failure modes
 * GRD-009 names.
 */
describe("gecko pin gate", () => {
  function tmpDir(prefix: string): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  }

  function writePkg(dir: string, version: string): string {
    const pkgPath = path.join(dir, "package.json");
    fs.writeFileSync(pkgPath, JSON.stringify({ name: "@types/firefox-webext-browser", version }));
    return pkgPath;
  }

  function writePin(dir: string, pin: object): string {
    const pinPath = path.join(dir, "gecko-pin.json");
    fs.writeFileSync(pinPath, JSON.stringify(pin));
    return pinPath;
  }

  /** A one-commit repo, optionally tagged, standing in for a Gecko checkout. */
  function makeCheckout(tag?: string): string {
    const dir = tmpDir("gecko-checkout-");
    const git = (...args: string[]) => execFileSync("git", args, { cwd: dir, stdio: "pipe" });
    git("init", "-q");
    git("-c", "user.email=test@example.com", "-c", "user.name=test", "commit", "--allow-empty", "-q", "-m", "init");
    if (tag) git("tag", tag);
    return dir;
  }

  it("passes when the pin's major matches and its tag resolves", () => {
    const checkout = makeCheckout("FIREFOX_143_0_RELEASE");
    const dir = tmpDir("gecko-pin-match-");
    const pkgPath = writePkg(dir, "143.0.0");
    const pinPath = writePin(dir, { tag: "FIREFOX_143_0_RELEASE", checkout, firefoxTypesMajor: 143 });

    const result = checkGeckoPin(pinPath, pkgPath);
    assert.equal(result.ok, true);
    assert.match(result.message, /^OK:/);
  });

  it("fails when the pin's major differs from the installed package", () => {
    const dir = tmpDir("gecko-pin-mismatch-");
    const pkgPath = writePkg(dir, "143.0.0");
    const pinPath = writePin(dir, { tag: "FIREFOX_142_0_RELEASE", checkout: "/does/not/matter", firefoxTypesMajor: 142 });

    const result = checkGeckoPin(pinPath, pkgPath);
    assert.equal(result.ok, false);
    assert.match(result.message, /pins Firefox 142/);
    assert.match(result.message, /installed @types\/firefox-webext-browser is major 143/);
    assert.match(result.message, /npm run derive:unsupported/);
    assert.match(result.message, /npm run verify:lag/);
  });

  it("fails when the major matches but the tag does not resolve in the checkout", () => {
    const checkout = makeCheckout(); // no tag created
    const dir = tmpDir("gecko-pin-unresolvable-");
    const pkgPath = writePkg(dir, "143.0.0");
    const pinPath = writePin(dir, { tag: "FIREFOX_143_0_RELEASE", checkout, firefoxTypesMajor: 143 });

    const result = checkGeckoPin(pinPath, pkgPath);
    assert.equal(result.ok, false);
    assert.match(result.message, /does not resolve in/);
  });

  it("does not require the checkout to exist", () => {
    const dir = tmpDir("gecko-pin-no-checkout-");
    const pkgPath = writePkg(dir, "143.0.0");
    const pinPath = writePin(dir, { tag: "FIREFOX_143_0_RELEASE", checkout: "/no/such/checkout", firefoxTypesMajor: 143 });

    const result = checkGeckoPin(pinPath, pkgPath);
    assert.equal(result.ok, true);
  });
});
