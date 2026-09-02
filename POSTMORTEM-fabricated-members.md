# Post-mortem: an override fabricated a member on a browser that lacks it

Date: 2026-08-18. Repo: webext-meta-types.

## What shipped wrong

`patches/subsystem-10-platform-system.json`, `downloads.onChanged`, had:

    "overrideFirefox": "export const onChanged: events.Event<(downloadDelta: DownloadDelta) => void>;"

`DownloadDelta` is **Chrome's** interface. Chrome's `DownloadDelta` carries
`finalUrl?: StringDelta` (added Chrome 54). Firefox's real download-change type
is `_OnChangedDownloadDelta`, which has **no** `finalUrl`. Because the meta build
has Chrome's `DownloadDelta` in scope, the override compiled, and the
Firefox-facing output attributed Chrome's `finalUrl` to Firefox: a field Firefox
never sends. The `reason` was `convergence`.

Present since the **first commit** (`e97e5d4 "v1 - maybe?"`). Never a regression;
never caught, because no check ever looked at a per-browser override's shape.

## Root cause, as a class

An override is free-text TypeScript whose only validation was compiling in the
**meta** scope, where all three browsers' vocabularies coexist. In that scope
"type-checks" means "true of at least one browser". But the claim an
`overrideFirefox` ships is "true of **Firefox**". Per-browser assertions were
validated against the union of browsers, so anything true of any browser passed
as true of every browser.

Two aggravators:
- `verify:derivation` enforces "assert only what inputs declare" for the merger
  but deliberately exempts the patch layer, making overrides the one unchecked
  channel for asserting browser facts.
- `reason` codes (`convergence`/`enhancement`/`upstream-defect`/...) are
  self-declared labels with no mechanical consequence. "convergence" could not
  be falsified.

## Why the existing gates missed it

- `tsc --lib dom` on the meta build cannot see per-browser truth.
- `verify-override-vocabulary` (the new NAME gate) now catches THIS instance:
  Firefox does not declare `DownloadDelta`; Chrome does, so it is a name leak.
- But the class is broader than names. An override can fabricate a member using
  only legal names, inline:
  `overrideFirefox: "...(d: { finalUrl?: StringDelta }) => void..."`.
  `StringDelta` is a legal Firefox name; `finalUrl` is not a real Firefox field.
  Nothing checked the asserted **members**.

## The fix: verify:override-members (SHAPE gate)

Layer on top of the vocab gate. Together they are the two halves of one
invariant: every identifier an override introduces into browser B is either a
**reference** (must resolve in B's vocabulary — the vocab gate) or an **asserted
member** (must be a member B's real API has — this gate).

Ground truth: B's own upstream `.d.ts` (the same three node_modules packages),
scoped to the API namespace/element. For each override on B, collect the
property/method NAMES it asserts (interface bodies + inline type literals,
including nested in callbacks/generics; parameter names are not claims). Require
each to be a name B declares in that namespace, UNLESS:

- **Open hole**: B's upstream at that element is `any`/`object`/`any`-index/
  `any`-alias. Everything under a hole is refinement (this admits
  `notifications.getAll`, whose Chrome upstream is `{[name:string]: any}`).
- **Evidenced**: per Fable's guidance below.

`reason` finally becomes mechanical:
- `convergence` / `naming`: zero unmatched members, NO evidence escape.
  Convergence re-expresses what upstream already declares. The bad
  `downloads.onChanged` was labelled `convergence`; under this rule it fails even
  with evidence, forcing the label to be corrected. Correct outcome.
- `enhancement` / `upstream-defect`: per-member evidence required. Extend
  `EvidenceItem` (verify-evidence.ts: browser/repo/ref/path/quote) with a
  `member` field; the quote must contain the member name and re-resolve at the
  pinned ref. One entry-level citation must NOT cover all members.
- `upstream-lag`: `derive-lag`'s LAG verdict is the per-member evidence.

Result: every fact the artifacts attribute to browser B traces to exactly one of
three sources — B's own upstream package, a cited-and-resolvable browser source
quote, or a derived lag verdict. Fabrication has no remaining channel.

## Scope of the class (measured)

186 override-bearing entries (164 overrideFirefox, 97 overrideChrome; 0 safari,
0 shared). By reason: enhancement 56, convergence 62, naming 9, upstream-defect
32, upstream-lag 27. None were shape-verified before this gate.

## Prevention status

- Vocab NAME gate: built, green, catches the name form.
- Member SHAPE gate: `scripts/verify-override-members.ts` v1 written. Extraction
  bug + calibration open — see `NOTES-override-members-gate.md`.
