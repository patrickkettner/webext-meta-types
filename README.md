# webext-meta-types

[![CI](https://github.com/patrickkettner/webext-meta-types/actions/workflows/ci.yml/badge.svg)](https://github.com/patrickkettner/webext-meta-types/actions/workflows/ci.yml)

Cross-browser TypeScript types for WebExtension APIs that actually tell you what runs where.

Chrome, Firefox, and Safari don't have identical extension APIs. Instead of hiding vendor divergence behind lowest-common-denominator types or pretending every browser supports every property, `webext-meta-types` merges their declarations into a single type system with explicit availability tags, platform constraints, and privilege requirements in your editor tooltips.

The long-term goal is adoption by the W3C WebExtensions Community Group (WECG). Every type in this repo is generated, reproducible, and auditable against upstream source packages.

---

## Core Principles

- **Published types are the source of truth.** We consume the upstream packages (`chrome-types`, `@types/firefox-webext-browser`) rather than raw vendor schemas. The teams that own those packages own their types.
- **Full `chrome.*` and `browser.*` parity.** The unified API surface is declared once on `chrome` and mirrored to `browser` (`export import X = chrome.X`), giving you identical type and value resolution in either namespace (Decision 20).
- **Explicit availability tags in tooltips.**
  - `@supported Chrome, Firefox` / `@supported Chrome` / `@supported Firefox`
  - `@platform chromeos` (inherited by child members from namespace rules)
  - `@privileged` (for restricted contexts like `devtools_page` or privileged permissions)
  - `@note` (explaining why a type is a union, why shapes differ, or why a property is optional)
  - `@since` and `@deprecated` (passed through directly from upstream)
- **Single-browser properties are widened.** If a property only exists in Chrome (like `tab.selected`), the unified type marks it optional (`boolean | undefined`). Under `"strict": true`, TypeScript forces you to check before accessing it, preventing cross-browser runtime crashes.
- **Zero `any` policy.** No hand-written `any` in generator code or generated output. Upstream `any` types are preserved but explicitly flagged with `/* TODO: Upstream type uses any */`.

---

## What's in the Package

Everything lives in `dist/`:

1. **`dist/index.d.ts`** — The unified cross-browser declaration file. Gives you ambient `chrome.*` and `browser.*` globals with full JSDoc availability tags.
2. **`dist/chrome-only.d.ts`** — Pruned declaration set for Chrome-only extensions. Restores single-browser widened properties back to required and drops non-Chromium namespaces.
3. **`dist/firefox-only.d.ts`** — Pruned declaration set for Firefox-only extensions. Restores single-browser widened properties back to required and drops non-Gecko namespaces.
4. **`dist/metadata.json`** — Machine-readable availability database mapping every symbol path to supported browsers, platforms, channels, privilege requirements, and patch provenance.

---

## Quickstart

### Installation

```bash
npm install --save-dev webext-meta-types
```

### TypeScript Setup

Add `webext-meta-types` to `compilerOptions.types` in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["webext-meta-types"]
  },
  "include": ["src/**/*"]
}
```

That's it. `chrome.*` and `browser.*` resolve ambiently across your project with hover tooltips, signatures, and availability tags. (For target-pruned single-browser development, point directly to `webext-meta-types/dist/chrome-only.d.ts` or `webext-meta-types/dist/firefox-only.d.ts`).

---

## Development & Verification

To generate types and run the full verification suite:

```bash
npm run build
npm run check
```

`npm run check` runs 7 automated quality gates:
1. `typecheck` — Repository type check (`tsc --noEmit`).
2. `test:unit` — Generator unit tests via Node's native test runner (`tsx --test test/generator.test.ts`).
3. `build` — Generates output declarations (`tsx src/generator.ts`).
4. `check:artifacts` — Compiles `index.d.ts`, `chrome-only.d.ts`, and `firefox-only.d.ts` in isolated temporary environments without ambient types or `--skipLibCheck`.
5. `check:pruned` — Proves `chrome-only.d.ts` and `firefox-only.d.ts` are strict subsets of `index.d.ts` and that widened properties are properly restored to required.
6. `enforce:zero-any` — Enforces zero un-annotated `any` across our codebase and patch files.
7. `test` — Declaration-existence assertions (`tsd`).

> [!IMPORTANT]
> **CI Scope & Limitation**: Continuous Integration verifies that the emitted types compile cleanly in isolation, are internally consistent across target subsets, satisfy our zero-`any` invariants, and are consumable as an npm package. CI does **not** verify accuracy against Chromium and Gecko C++ source schemas — that requires both browser source trees and runs separately via the schema audit harness. A green CI badge indicates build, packaging, and type consistency, not an upstream engine audit.

---

## Licensing

- **License**: [Apache License 2.0](./LICENSE) (`Apache-2.0`).
- **Attributions**: See [`NOTICE`](./NOTICE) for upstream copyright attributions for `chrome-types` (Google LLC, Apache-2.0) and `@types/firefox-webext-browser` (Microsoft Corporation and DefinitelyTyped contributors, MIT).
