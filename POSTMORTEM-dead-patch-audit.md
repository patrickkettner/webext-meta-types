# Postmortem: the dead-patch audit was 75% wrong

Date: 2026-08-15.
Severity: would have silently degraded the shipped types across ~50 APIs.
Caught by: Patrick requiring an adversarial read before approving any deletion.

## What was claimed

An audit of the 200-entry patch corpus classified **80 of 298 patch/browser
overrides as dead** and recommended deleting them, in two categories:

- **cosmetic-only (60)**: the patch body is canonically identical to upstream
  once `export`, comments, whitespace, `,` versus `;` inside inline type
  literals, `WebExtEvent` versus `events.Event`, and `| undefined` are removed.
- **redundant-patch (20)**: a `merge` patch whose members upstream already
  declares identically.

## What was true

Removing all 80 changed **380 lines of `dist/index.d.ts`** and 354 lines of
`dist/chrome-only.d.ts`.

Testing each override individually:

| Verdict | Count |
|---|---|
| LOAD-BEARING (audit wrong, must keep) | 60 |
| INERT (audit right, safe to delete) | 20 |

**False-positive rate: 60/80, or 75%.**

Broken down by the category the audit assigned:

| Claimed | Load-bearing | Inert |
|---|---|---|
| cosmetic-only | 50 | 10 |
| redundant-patch | 10 | 10 |

The `cosmetic-only` heuristic was the worse of the two, at 83% wrong.

A later full sweep of all 298 overrides (not just the 80 accused) found **21
inert**, so the audit also missed one genuinely dead override,
`scripting.InjectionTarget` on Firefox. The audit was wrong in both directions.

## Root cause

The audit answered a different question from the one it was asked.

- **Question asked:** does this patch do anything?
- **Question answered:** is this patch's text semantically equivalent to
  upstream's text?

Those come apart because a patch has two jobs, and only one of them is
"correct an upstream error". The other is **forcing convergence**.

`chrome-types` separates the members of an inline type literal with `,`.
`@types/firefox-webext-browser` uses `;`. To a TypeScript reader, and to the
audit's whitespace-insensitive comparison, those are the same type. To
`mergeVariable()` and `unionMember()`, which compare canonicalized text, they
are different strings, so the merger cannot collapse them and emits a two-arm
union instead of one type.

`bookmarks.onChanged`, with the patch:

```typescript
export const onChanged: events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;
```

The same declaration with the patch removed:

```typescript
/**
 * @note type differs between browsers; emitted as a union
 */
export const onChanged: events.Event<(
      id: string,
      changeInfo: {
        title: string,
        url?: string,
      },
    ) => void> | events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;
```

`menus.onClicked` degrades further, leaking the raw upstream wrapper name:
`events.Event<...> | WebExtEvent<...>`.

So a patch can be textually redundant and behaviourally essential at the same
time. Reading it cannot distinguish the two cases. The information simply is not
in the text; it is in how the merger treats the text.

## The methodological error, stated generally

**The audit validated a claim about a program's behaviour using a model of that
behaviour instead of by running the program.**

The claim "removing X changes nothing" is directly testable: remove X, run it,
compare. That test was available the whole time. This repository regenerates
deterministic artifacts in seconds, and a full per-override sweep turned out to
take **9 seconds**. The audit instead reimplemented a similarity notion
(`structurallyEqual`) that had to agree with `canonicalizeSignature`,
`mergeInterface`, `mergeVariable`, `mergeFunction` and `unionMember`
simultaneously, and it did not.

Two aggravating details:

1. `structurallyEqual` erased `| undefined`. For an optional property that is
   usually harmless; for a required property, `x: T | undefined` and `x: T` are
   genuinely different types. The heuristic was unsound on its own terms, not
   merely imprecise.
2. The audit reported the 80 with per-item detail and confident severity
   labels. Presentation quality tracked effort spent, not evidence held, which
   made a heuristic result read like a verified one.

## Contributing factor: an unsafe tool

The first version of the verification script rewrote `patches/` in place and
restored it in a `finally` block. It exceeded a 10-minute timeout, was killed
with SIGTERM, and `finally` never ran, leaving `patches/subsystem-2-runtime.json`
modified in the working tree.

A tool that mutates tracked files to answer a question will eventually be
interrupted while they are mutated. `applyPatches()` now takes an optional
`patchDir`, and the verification tool writes variants to a scratch directory
instead. It never touches `patches/`, and it asserts that fact on exit.

## Fixes landed

1. **`scripts/verify-patch-necessity.ts`**. For every override in `patches/`,
   removes just that key, regenerates, and compares the emitted output for the
   affected namespace. Reports INERT versus LOAD-BEARING and exits non-zero if
   any INERT override exists. Runs in about 9 seconds for all 298.
2. **`applyPatches(ir, patchDir = "patches")`** in `src/generator.ts`. Backward
   compatible, and it removes the whole class of "tool corrupted the working
   tree" failures.
3. **`npm run verify:patches`** wired into `package.json`.
4. **The working rules for this repository**, stating that any claim about a
   patch being unnecessary must be proven by removal, never by reading.

## The rule

> A patch is dead only if removing it changes nothing in the generated output.
> Prove that by removing it and regenerating. Never by reading it.

This generalizes past patches. Any claim of the form "this code is redundant",
"this branch is unreachable", "this config does nothing" in a repository that
produces deterministic output is cheaply testable, and the test beats the
argument every time.

## Status of the 21 inert overrides

They are verified inert by the tool, but **no deletion has been made**. Deletion
is gated on Patrick's approval, which is what caught this in the first place.
`npm run verify:patches` is deliberately not part of `npm run check` yet,
because it would fail on those 21 until they are removed.
