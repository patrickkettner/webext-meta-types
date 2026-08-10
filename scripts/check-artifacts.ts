import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

export function resolveTscBin(): string {
  try {
    const req = createRequire(path.resolve("package.json"));
    const tsMain = req.resolve("typescript");
    const tscJs = path.resolve(path.dirname(tsMain), "tsc.js");
    if (fs.existsSync(tscJs)) return tscJs;
  } catch {}
  const fallback = path.resolve("node_modules/typescript/lib/tsc.js");
  if (fs.existsSync(fallback)) return fallback;
  throw new Error("Could not resolve TypeScript compiler binary (tsc.js) from node_modules");
}

export function parseTscDiagnostics(rawText: string): string[] {
  // Strip ANSI color / style escapes to handle both pretty and plain compiler output
  const clean = rawText.replace(/\u001b\[[0-9;]*m/g, "");
  return clean.split("\n").filter(l => /error TS\d+/.test(l));
}

export function checkArtifactInIsolation(
  filePath: string,
  tscPath = resolveTscBin()
): { errorCount: number; output: string } {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Target file does not exist: ${filePath}`);
  }
  if (!fs.existsSync(tscPath)) {
    throw new Error(`TypeScript compiler path does not exist: ${tscPath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath) || ".d.ts";
  const fileName = `test${ext}`;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "webext-artifact-check-"));
  const targetFile = path.join(tmpDir, fileName);
  fs.writeFileSync(targetFile, content);

  try {
    const stdout = execFileSync(
      process.execPath,
      [tscPath, "--noEmit", "--ignoreConfig", "--pretty", "false", "--lib", "es2020,dom", "--types", "", fileName],
      {
        cwd: tmpDir,
        encoding: "utf8",
        stdio: "pipe"
      }
    );
    const text = stdout ? String(stdout) : "";
    const diagnostics = parseTscDiagnostics(text);
    return { errorCount: diagnostics.length, output: text };
  } catch (err: unknown) {
    const execErr = err as {
      stdout?: unknown;
      stderr?: unknown;
      output?: unknown[];
      status?: number;
      code?: string;
      message?: string;
    };
    const stdout = execErr.stdout !== undefined ? String(execErr.stdout) : (execErr.output && execErr.output[1] ? String(execErr.output[1]) : "");
    const stderr = execErr.stderr !== undefined ? String(execErr.stderr) : (execErr.output && execErr.output[2] ? String(execErr.output[2]) : "");
    const combined = stdout + (stderr ? "\n" + stderr : "");
    const diagnostics = parseTscDiagnostics(combined);

    // Case 1: stdout/stderr contains one or more error TS#### lines -> tsc ran successfully and reported errors
    if (diagnostics.length > 0) {
      return { errorCount: diagnostics.length, output: combined };
    }

    // Case 2: non-zero exit with no parseable diagnostics, spawn error, or crash -> throw because compiler did not run
    throw new Error(
      `tsc execution failed without parseable diagnostics (status ${execErr.status}, code ${execErr.code}):\n${combined || execErr.message || String(err)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

export function checkAllDistArtifacts(): void {
  const distDir = path.resolve("dist");
  const files = fs.readdirSync(distDir).filter(f => f.endsWith(".d.ts"));

  if (files.length === 0) {
    console.error("No .d.ts artifacts found in dist/");
    process.exit(1);
  }

  let hasErrors = false;
  for (const file of files) {
    const fullPath = path.join(distDir, file);
    console.log(`Checking ${file} in OS tempdir without ambient @types or --skipLibCheck...`);
    const res = checkArtifactInIsolation(fullPath);
    if (res.errorCount === 0) {
      console.log(`  ✓ ${file}: 0 errors`);
    } else {
      hasErrors = true;
      console.error(`  ✗ ${file} failed with ${res.errorCount} error(s):`);
      console.error(res.output);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
  console.log("All emitted artifacts compiled cleanly in isolation.");
}

// Run directly when invoked as CLI script
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("check-artifacts.ts")) {
  checkAllDistArtifacts();
}
