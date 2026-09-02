/**
 * The Gecko tag `derive-unsupported.ts` and `derive-lag.ts` read from must
 * describe the same Firefox version as the installed
 * `@types/firefox-webext-browser` package, or `excluded-members.json` and the
 * lag verdicts are silently wrong for the version the package describes.
 *
 * `gecko-pin.json` is the one place both scripts read the tag from (GRD-009).
 * This checks that pin against reality:
 *
 *   1. `firefoxTypesMajor` must equal the major version of the installed
 *      `node_modules/@types/firefox-webext-browser` package. This needs no
 *      Gecko checkout, so it runs in `npm run check` unconditionally.
 *   2. If a Gecko checkout exists at `checkout`, its tag must actually
 *      resolve there (`git rev-parse`). A pin can have the right major and
 *      still name a tag nobody fetched, or a typo'd tag; this catches that
 *      whenever the checkout happens to be present, but does not require it,
 *      because `npm run check` runs in places with no Gecko checkout at all.
 *
 * A failure prints exactly which tag/major to change in gecko-pin.json and
 * the three commands the bump procedure needs run next (see
 * BUMP-PROCEDURE.md): derive:unsupported, verify:lag, then commit
 * gecko-pin.json and excluded-members.json together.
 *
 * Usage:
 *   npx tsx scripts/verify-gecko-pin.ts                 # normal
 *   npx tsx scripts/verify-gecko-pin.ts --pin <file>     # check a different pin file
 */
import { execFileSync } from "node:child_process";
import * as fs from "node:fs";

export interface GeckoPin {
  tag: string;
  checkout: string;
  firefoxTypesMajor: number;
}

export interface PinCheckResult {
  ok: boolean;
  message: string;
}

export function loadPin(pinPath: string): GeckoPin {
  return JSON.parse(fs.readFileSync(pinPath, "utf8")) as GeckoPin;
}

export function installedFirefoxTypesMajor(pkgPath: string): number {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as { version: string };
  const major = Number(pkg.version.split(".")[0]);
  if (!Number.isInteger(major)) {
    throw new Error(`cannot parse a major version out of "${pkg.version}" in ${pkgPath}`);
  }
  return major;
}

function tagResolves(checkout: string, tag: string): boolean {
  try {
    execFileSync("git", ["-C", checkout, "rev-parse", "--verify", `${tag}^{commit}`], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

/**
 * pinPath: path to a gecko-pin.json-shaped file.
 * pkgPath: path to the installed @types/firefox-webext-browser package.json.
 */
export function checkGeckoPin(pinPath: string, pkgPath: string): PinCheckResult {
  const pin = loadPin(pinPath);
  const installed = installedFirefoxTypesMajor(pkgPath);

  if (pin.firefoxTypesMajor !== installed) {
    return {
      ok: false,
      message:
        `FAIL: ${pinPath} pins Firefox ${pin.firefoxTypesMajor} (tag "${pin.tag}"), but the installed ` +
        `@types/firefox-webext-browser is major ${installed}.\n` +
        `Change "tag" and "firefoxTypesMajor" in ${pinPath} to the Firefox ${installed} release tag, then run:\n` +
        `  npm run derive:unsupported\n` +
        `  npm run verify:lag\n` +
        `  git add gecko-pin.json excluded-members.json && git commit`,
    };
  }

  if (fs.existsSync(pin.checkout)) {
    if (!tagResolves(pin.checkout, pin.tag)) {
      return {
        ok: false,
        message:
          `FAIL: gecko-pin.json's tag "${pin.tag}" does not resolve in ${pin.checkout}.\n` +
          `Fetch tags in the checkout, or fix "tag" in ${pinPath} to the tag that actually matches ` +
          `Firefox ${installed}.`,
      };
    }
  }

  return {
    ok: true,
    message: `OK: gecko-pin.json ("${pin.tag}") matches @types/firefox-webext-browser@${installed}.x.`,
  };
}

function parseArgs(): { pinPath: string; pkgPath: string } {
  const i = process.argv.indexOf("--pin");
  const pinPath = i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : "gecko-pin.json";
  const pkgPath = "node_modules/@types/firefox-webext-browser/package.json";
  return { pinPath, pkgPath };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { pinPath, pkgPath } = parseArgs();
  const result = checkGeckoPin(pinPath, pkgPath);
  console.log(result.message);
  process.exit(result.ok ? 0 : 1);
}
