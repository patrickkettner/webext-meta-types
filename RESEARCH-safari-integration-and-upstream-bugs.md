# Research: upstream bug inventory and Safari as a first-class browser

Status: research only. No implementation has been done in either repository.
Date: 2026-08-15.

Repositories examined:

- `~/webext-meta-types` (existing clone, HEAD `e97e5d4` "v1 - maybe?")
- `~/safari-webextension-types` (freshly cloned, HEAD `80ed40f`, single commit)

Both build clean. `npm run check` in `webext-meta-types` passes end to end
(typecheck, 39 unit tests, generation, zero-any enforcement, tsd). `npm ci &&
npm test` in `safari-webextension-types` passes.

---

## Part 0. WebKit PR #71593 verification (the blocking question)

**Result: confirmed identical. No action needed, no notification sent.**

PR #71593 ("Declare WebExtension dictionary and enum types in WebIDL") is merged:

| Field | Value |
|---|---|
| state | closed, `merged: true` |
| merged_at | 2026-08-15T20:54:10Z |
| merge_commit_sha | `c691177463029c907b78c21215a9ca3aab6ce499` |
| base | `main` |

Three generator runs were compared:

```
python3 scripts/generate.py                -o from-main.d.ts   # WebKit/WebKit@main
python3 scripts/generate.py --pr 71593     -o from-pr.d.ts     # resolves to patrickkettner/WebKit@webextension-idl-declarations
```

All three of `index.d.ts` (checked in), `from-main.d.ts` and `from-pr.d.ts` are
byte-identical: md5 `66cd9244686a64365214b8e0b817deb7`, 1006 lines, 0 `any`.

So the checked-in `index.d.ts` is already up to date against merged WebKit main,
and building from main now produces exactly what building from the PR branch
produced. Nothing in `safari-webextension-types` needs regenerating.

Two notes on the generator worth recording:

1. `fetch_from_pr()` has a hardcoded fallback for PR 71593 to
   `patrickkettner/WebKit@webextension-idl-declarations`. Now that the PR is
   merged, that fallback is dead weight and will silently mask a deleted head
   branch. It should be removed.
2. The default path (`--repo WebKit/WebKit --ref main`) is now the correct
   production path. The `--pr` flag should be treated as a development-only
   escape hatch from here on.

---

## Part 1. Bugs to file, separated by browser

### Method

The `patches/` directory holds 200 patch entries, every one carrying
`bug_url: "TBD"`. Each patch is an assertion that an upstream type package is
wrong. Since 98 patches carry both a Chrome and a Firefox override, the 200
patches expand to **298 patch/browser pairs**, which is the unit of analysis.

To make each entry filable rather than merely "a patch exists", I rebuilt the IR
twice (once without patches, once with), then diffed upstream against each
patch body, and classified the difference. `merge`-mode patches carry only a
delta, so they are diffed as a delta; `replace`-mode patches are diffed whole.
Cosmetic differences are removed before classification: `export` keywords,
`,` versus `;` inside inline type literals, `WebExtEvent` versus `events.Event`,
and `| undefined` on optional members. None of those are defects.

Tooling: `analyze-bugs.ts` in the repo root (untracked, research only).
Full machine-readable output: `upstream-bug-findings.json` (298 records with the
verbatim upstream source and our override for each).

### Headline numbers

| | Chrome | Firefox | Total |
|---|---|---|---|
| patch/browser pairs | 119 | 179 | 298 |
| **filable as upstream type defects** | **60** | **121** | **181** |
| not filable (see below) | 59 | 58 | 117 |

The 117 non-filable pairs matter as much as the filable ones, because filing
them would be wrong. They break down as:

- **60 cosmetic-only** and **20 redundant-patch**: the patch text is canonically
  identical to upstream, or adds members upstream already declares identically.

  > **RETRACTED 2026-08-15.** This section originally concluded that these 80
  > overrides are no-op patches and should be deleted. That conclusion was
  > wrong. Empirical testing (remove each override, regenerate, diff) found
  > **60 of the 80 load-bearing**, a 75% false-positive rate, and separately
  > found one inert override this analysis missed. Only **21 of all 298
  > overrides** are actually inert.
  >
  > A patch also forces convergence between Chrome's `,`-separated and
  > Firefox's `;`-separated inline type literals, which the merger cannot
  > collapse on its own. Deleting the 80 would have degraded roughly 50 APIs
  > from one clean type to a two-arm union.
  >
  > Authoritative list: `npm run verify:patches`. Analysis:
  > `POSTMORTEM-dead-patch-audit.md`. The finding that these patches do not
  > correspond to filable *upstream bugs* still stands; what was wrong was
  > concluding they are therefore removable.
- **17 private-type-reference** (Firefox only): upstream routes an event payload
  through a generated `_`-prefixed type (`_OnInstalledDetails`,
  `_OnActivatedActiveInfo`, and so on) and our override inlines the shape. That
  is our normalization choice for cross-browser merging, not a Firefox defect.
- **10 possible-rename**: upstream declares the same concept under a different
  name, for example `notifications.CreateNotificationOptions` in our patch
  versus `notifications.NotificationOptions` upstream (verified, line 15212).
- **6 namespace-not-in-upstream**: `_manifest.*` is a Firefox-types construct
  (`chrome-types` mentions `_manifest` only inside two doc comments), and
  `mimeHandlerPrivate` is a Chromium private API deliberately excluded from
  `chrome-types` (0 occurrences).
- **3 synthetic-name**: `runtime._SendMessageOptions`, `runtime._OnInstalledDetails`,
  `pageAction._SetIconDetails`. Our own private naming; upstream would never
  declare these.

### Chrome / Chromium (60 filable)

Tracker: `chrome-types` is generated from Chromium's extension `.idl`/`.json`
schemas, so most real fixes land at crbug.com against the schema, not against
the `GoogleChrome/chrome-types` repo. File schema bugs at crbug.com and only
file at `chrome-types` when the generator itself is at fault.

| Category | Severity | Count |
|---|---|---|
| upstream-any | high | 26 |
| missing-from-upstream | high | 8 |
| missing-members | medium | 4 |
| wrong-member-types | medium | 4 |
| missing-overloads | medium | 2 |
| missing-generics | medium | 2 |
| other-signature-diff | triage | 15 |

The `upstream-any` group is the strongest set to file, because each one is
mechanically demonstrable and Chromium's own docs describe a concrete shape.
Representative entries, with the verbatim upstream declaration:

- `dom.openOrClosedShadowRoot` returns `{[name: string]: any}`; the real return
  is `ShadowRoot | null`.
- `platformKeys.subtleCrypto` returns `{[name: string]: any} | undefined`; the
  real return is `SubtleCrypto`.
- `platformKeys.getKeyPair` / `getKeyPairBySpki` take `parameters: {[name: string]: any}`.
- `processes.getProcessInfo` returns `Promise<{[name: string]: any}>`.
- `runtime.getManifest` returns `{[name: string]: any}`.
- `runtime.onMessage`, `runtime.onMessageExternal` use `any` payloads.
- `i18n.getMessage`, `notifications.getAll`, `devtools.network.getHAR`,
  `devtools.inspectedWindow.Resource`, `events.Rule`,
  `documentScan.OpenScannerResponse`.

**Verify before filing.** Three entries in the Chrome `missing-from-upstream`
list are almost certainly not Chrome bugs, and filing them would be an error:

- `tabs.executeScript` is absent from `chrome-types` because MV3 removed it.
  `chrome-types` is correct; our patch adds it for cross-browser reasons.
- `action.ColorArray`, `action.IconSizeMap`, `action.ImageDataSizeMap` are names
  we invented for shapes `chrome-types` inlines. That is a naming difference.
- `devtools.inspectedWindow.EvalOptions` / `EvaluationExceptionInfo` are likewise
  our names for inlined parameter shapes.

The 15 `other-signature-diff` entries need manual triage and are listed
individually in the generated report. They include real ones worth filing
(`windows.WindowState` missing `"locked-fullscreen"`, `windows.WindowType`
missing `"custom-tab"`, `runtime.getPackageDirectoryEntry` typed against a
nonexistent `DirectoryEntry` instead of `FileSystemDirectoryEntry`) alongside
restructurings that are ours, not theirs.

### Firefox / Gecko (121 filable)

Tracker: `@types/firefox-webext-browser` in DefinitelyTyped. Where the root
cause is the Gecko `schemas/*.json`, the fix belongs at bugzilla.mozilla.org.

| Category | Severity | Count |
|---|---|---|
| upstream-any | high | 60 |
| missing-members | medium | 29 |
| wrong-member-types | medium | 4 |
| upstream-weak-type | medium | 3 |
| missing-generics | medium | 2 |
| missing-overloads | medium | 2 |
| return-type-mismatch | medium | 1 |
| spurious-members | low | 12 |
| other-signature-diff | triage | 4 |

Firefox's `any` problem is more than twice Chrome's in absolute terms (60 versus
26), and it is concentrated: `telemetry` (15 patches), `geckoProfiler` (12),
`webNavigation` (11), `webRequest` (10). Those four namespaces alone are roughly
40% of the Firefox work, which makes them a sensible first filing batch. The 12
`spurious-members` entries are the inverse case (upstream declares members that
do not exist at runtime) and should be filed separately, since they are a
different kind of claim and need runtime evidence.

The 3 `upstream-weak-type` entries are `sessions.getTabValue` and
`sessions.getWindowValue` returning `Promise<string | object | undefined>`,
where `object` should be a JSON value type.

### Safari / WebKit (the largest and most valuable set)

There is no Safari section in the patch corpus yet, because Safari is not
integrated. But analysing WebKit's IDL at merged main surfaces a bug class that
is bigger and cleaner than either of the above.

Analysis of all 37 IDL files at `WebKit/WebKit@main`:

| Metric | Value |
|---|---|
| dictionaries declared | 56 |
| enums declared | 11 |
| operations | 177 |
| **operations taking an `any` parameter** | **104 (59%)** |
| **dictionaries never referenced by any operation or attribute** | **53 of 56** |
| dictionaries referenced only from other dictionaries | 3 |
| dictionaries actually wired into an operation signature | **0** |

PR #71593 landed the type *declarations* but not the *wiring*. Every dictionary
it added is orphaned. `WebExtensionAPICookies.idl` is the clearest example: it
declares `WebExtensionCookieDetails`, `WebExtensionCookieGetAllDetails` and
`WebExtensionCookieSetDetails`, and then every operation still reads

```webidl
[RaisesException] void get([NSDictionary] any details, [Optional, CallbackHandler] function callback);
```

Same story in `WebExtensionAPIAlarms.idl`, which declares
`WebExtensionAlarmCreateInfo` and then takes `[JSONValue] any info`.

This is why `safari-webextension-types` emits 88 `Record<string, unknown>` and
179 `unknown` occurrences: the generator is being faithful to the IDL. It is not
a generator defect.

The follow-up WebKit work is therefore well scoped and mechanical: change 104
operation signatures from `any` to the dictionary type already declared beside
them. It divides naturally into per-file PRs (Action has 11, DNR has 7, Cookies
4, Bookmarks 5, and so on), which suits WebKit review. This is the single
highest-leverage item in this document, because it is the difference between
Safari contributing real types to the merged output and Safari contributing
`Record<string, unknown>` to 104 call signatures.

A second, smaller Safari item: `WebExtensionAPITest.idl` produces a `test`
namespace in the shipped `index.d.ts`. That is a WebKit-internal test harness
API and should not be in a public type package. This is a bug in
`safari-webextension-types`, not in WebKit.

### Cross-check against BCD

`@mdn/browser-compat-data` gives an independent read on Safari's surface and
disagrees with the IDL in both directions:

- In the WebKit IDL but BCD reports no Safari support: `bookmarks`,
  `notifications`, `offscreen`, `sidePanel`, `sidebarAction`, `test`.
- BCD reports Safari support but the IDL has no such interface: `browserAction`,
  `extensionTypes`, `pageAction`. (`browserAction` and `pageAction` are aliased
  to `action` in the generated `chrome` namespace, so those two are explained.
  `extensionTypes` is not.)

Each of those is either a BCD bug or a WebKit gap, and each needs a runtime
check in Safari before filing anywhere. Do not file these from static analysis
alone.

---

## Part 2. Bugs in our own code, found along the way

These are not upstream bugs and should be fixed here, not filed elsewhere.

1. **`chrome.debugger` ships as `chrome._debugger`.** `chrome-types` works around
   the reserved word with `export {_debugger as debugger};` (line 4564).
   `parseSource()` does not handle re-export aliases, so the alias is dropped and
   `dist/index.d.ts` line 3400 emits `export namespace _debugger`. The entire
   `debugger` namespace is unreachable under its real name for consumers.
2. **`devtools.inspectedWindow` emits both `_eval` and `eval`.** Same root cause
   (`export {_eval as eval};`, line 6150). Upstream's `_eval` leaks into the
   output, and a patch separately adds a correct `eval`, so the namespace carries
   both. The patch masked the parser gap instead of fixing it.
   There are exactly two such aliases in `chrome-types` and zero in the Firefox
   types, so the fix is small and bounded.
3. **21 inert patch overrides**, verified by removal rather than by reading (the
   original claim of 80 was 75% wrong; see `POSTMORTEM-dead-patch-audit.md`).
   The other 277 are load-bearing. Separately, many load-bearing patches do
   convergence work rather than fixing an upstream defect, yet still emit
   `@note Upstream type inaccuracy patched` into shipped output, asserting a
   defect that may not exist. The patch schema needs a `reason` field.
4. **`bug_url` is `"TBD"` on all 200 patches**, which the generator renders into
   shipped output as `@note Upstream type inaccuracy patched (Bug URL: TBD)`.
   Once filed, these should carry real URLs; the emission path for a real URL
   (`@see <url>`) already exists in `formatSupportComment()`.

---

## Part 3. Safari as a first-class browser: integration research

### What the Safari package actually provides

| Metric | Value |
|---|---|
| total declarations | 464 |
| inside a namespace | 391 |
| **at the top level of `browser`** | **73** |
| namespaces | 25 |
| `any` occurrences | 0 |
| `Record<string, unknown>` occurrences | 88 |
| Promise-returning signatures | 136 |
| callback signatures | 170 |

Namespaces: `action, alarms, bookmarks, commands, cookies,
declarativeNetRequest, devtools, dom, events, extension, i18n, menus,
notifications, offscreen, permissions, runtime, scripting, sidePanel,
sidebarAction, storage, tabs, test, webNavigation, webRequest, windows`.

24 of those 25 already exist in the Chrome/Firefox IR. Only `test` is new, and
`test` should be dropped anyway. There are **98 namespaces in the Chrome/Firefox
IR with no Safari counterpart**, which is the expected shape of the problem:
Safari's surface is a subset, so adding it mostly adds availability information
rather than new API surface.

### The four structural mismatches

These are the real work. None of them is a matter of adding a third field.

**1. Flat versus namespaced dictionaries (73 declarations).**

WebKit's IDL declares dictionaries at file scope, so the generator emits them at
the top level of `browser`: `browser.Cookie`, `browser.Tab`, `browser.Alarm`.
Chrome and Firefox nest them: `cookies.Cookie`, `tabs.Tab`, `alarms.Alarm`.
Merging requires a relocation map. Of the 73:

- **21 relocate unambiguously** by name match against both other browsers
  (`CookieStore` to `cookies`, `PlatformInfo` to `runtime`, `Tab` to `tabs`,
  `Window` to `windows`, `MessageSender` to `runtime`, and so on).
- **3 are ambiguous** and need a decision: `InjectionResult` (declared in both
  `scripting` and `userScripts` elsewhere), `RegisteredContentScript`
  (`scripting` and `contentScripts`), `WindowType` (`tabs` and `windows`).
- **49 are Safari-only names** that are really prefixed flattenings of names the
  other browsers nest. `ActionSetIconDetails` is `action.SetIconDetails`;
  `DNRMatchedRule` is `declarativeNetRequest.MatchedRule`; `WebRequestFilter` is
  `webRequest.RequestFilter`; `TabCreateProperties` is `tabs.CreateProperties`;
  `DevToolsEvalOptions` is `devtools.inspectedWindow.EvalOptions`. The prefix
  stripping is regular enough to automate but wrong often enough that the map
  must be curated and reviewed, not generated and trusted.

  One caveat: one auto-relocation is a false positive. `MessageOptions` maps to
  `systemLog` by name match, which is certainly wrong; it belongs to `runtime`.
  Treat the automatic map as a starting draft.

**2. Interface-plus-instance versus sub-namespace (devtools).**

Safari emits:

```typescript
export namespace devtools {
    export interface InspectedWindow { eval<T>(...): Promise<T>; tabId: number; }
}
export namespace devtools {
    export const inspectedWindow: browser.devtools.InspectedWindow;
}
```

Chrome and Firefox use real sub-namespaces (`devtools.inspectedWindow.eval()`).
The call syntax is identical for consumers, but the declarations are not
mergeable as written. `reconcileStructuralForms()` (Decision 14) already exists
for exactly this class of problem and is the right place to handle it, but it
currently normalizes between two known shapes, not three.

**3. Event constraint variance.**

Safari declares `Event<T extends (...args: never[]) => void>`. Our preamble uses
`(...args: any[]) => any` for `CustomChromeEvent` and `WebExtEvent`, with a TODO
explaining that TypeScript's contravariance rule (TS2344) forces `any[]`.
`never[]` and `any[]` are opposite ends of that variance, so a naive union of
the three event wrappers will not typecheck. This needs a deliberate decision
about the canonical event type before any merging is attempted.

**4. Callback-and-Promise dual overloads.**

Safari ships both forms for essentially every async operation (136 Promise
signatures, 170 callback signatures). Chrome ships both. Firefox is
Promise-first. The existing `splitFunctionOverloads()` and `mergeFunction()`
handle two-way overload sets; three-way sets with different conventions will
produce substantially more overloads per function, and the overload
decomposition already noted in the git history ("complete ast canonicalization,
overload decomposition") will need revisiting.

### The pairwise-to-N-ary refactor

Everything in `src/generator.ts` assumes exactly two browsers. Concretely:

| Symbol | Occurrences |
|---|---|
| `chromeSource` | 32 |
| `firefoxSource` | 27 |
| `overrideChrome` / `overrideFirefox` | 16 / 16 |
| `isChromeOnly` / `isFirefoxOnly` | 8 / 8 |
| `chromeTypeParamsCount` / `firefoxTypeParamsCount` | 7 / 7 |
| `"chrome"` / `"firefox"` string literals | 20 / 14 |
| `Provenance` | 12 |

45 lines directly touch `chromeSource`/`firefoxSource`. All five merge
functions (`mergeInterface`, `mergeTypeAlias`, `mergeVariable`, `mergeFunction`,
plus the `unionMember`/`mergeInterface` helpers) are written as `const c = ...;
const f = ...;` and every one needs to become a fold over a collection.

`Provenance` is the sharpest edge:

```typescript
export type Provenance = "Chrome" | "Firefox" | "Chrome, Firefox";
```

Three browsers gives 7 non-empty combinations. Treating Safari iOS as its own
column gives 15. A string union does not survive this; it needs to become a set
or a bitmask with a formatter, and `formatSupportComment()`, `keptForTarget()`,
`MetaEntry`, and `dist/metadata.json` all consume it.

Files needing changes beyond `src/generator.ts`:

- `shared/coverage-types.ts`: `CoverageElement`/`CoverageNamespace` have literal
  `chrome: boolean; firefox: boolean` fields.
- `scripts/generate-coverage.ts` and the 236KB `coverage.json` it produces.
- `scripts/audit-bcd.ts`: hardcodes `support.chrome` and `support.firefox`, and
  would need `support.safari` and `support.safari_ios`.
- `test/generator.test.ts` (346 lines, 39 tests), including a "Convergence CI
  Invariant (Decision 16)" test that asserts on Chrome/Firefox convergence
  counts specifically.
- `tests/index.test-d.ts` (3693 lines) and `type-tests/index.test-d.ts` (2265
  lines), both generated, both emitting one assertion pair per element.
- `dist/chrome-only.d.ts` implies a target-pruned build per browser; Safari and
  Safari iOS targets would be added.

### macOS versus iOS

BCD makes this tractable. At namespace granularity, Safari supports 22 and
Safari iOS supports 20, and the only two that differ are `devtools` and `menus`.
At member granularity, 228 versus 210, with just **18 members** diverging:

```
devtools.inspectedWindow, devtools.network, devtools.panels      [mac only]
menus.* (8 members)                                              [mac only]
tabs.MutedInfo                                                   [mac only]
windows.WindowState, windows.create, windows.onRemoved,
windows.remove, windows.update                                   [mac only]
```

Recommendation: **do not model Safari iOS as a separate browser column.** Model
it as a modifier on Safari, sourced from BCD, expressed in the metadata export
and in an `@supported` note. 18 exceptions do not justify doubling the
provenance space from 7 to 15 combinations, and the WebIDL carries no iOS
information at all, so a separate column would be sourced entirely from BCD
regardless.

### The sequencing problem

Integrating Safari today injects `Record<string, unknown>` into 104 operation
parameters. The zero-any policy would pass (it greps for `any`, and
`Record<string, unknown>` is not `any`), but the merged types would be worse for
users in those 104 places than the Chrome or Firefox types they already have,
and the merge logic would have to decide whether Safari's
`Record<string, unknown>` widens a precise Chrome type. Almost always it should
not.

Two viable orders:

**Option A: fix WebKit first.** Land the dictionary-wiring PRs (104 operations,
roughly 20 per-file PRs), regenerate `safari-webextension-types`, then integrate.
Highest quality result. Gated on WebKit review latency, which is not under our
control.

**Option B: integrate now with a widening guard.** Build the integration against
today's output, and add an explicit merge rule that a Safari
`Record<string, unknown>` parameter never widens a precise type from another
browser; it contributes availability information only. Then the WebKit fixes
land incrementally and the types sharpen without further integration work.

Recommendation: **Option B, with the WebKit PRs running in parallel.** The
merge-rule work is needed regardless (Safari will always have some weakly typed
corners), the integration is not blocked on Apple's review queue, and every
landed WebKit PR improves the output with no additional integration effort.

### Suggested phasing

1. **Repo hygiene first** (small, unblocks measurement): delete the 80 dead
   patches, fix the two re-export alias bugs, remove the dead PR-71593 fallback,
   drop the `test` namespace from `safari-webextension-types`.
2. **Provenance refactor**: `Provenance` string union to a set/bitmask, with
   `formatSupportComment`, `keptForTarget`, `MetaEntry` and `metadata.json`
   updated. No Safari data yet; the Chrome/Firefox output should be byte-identical
   afterwards, which is a strong regression test.
3. **IR refactor**: `chromeSource`/`firefoxSource` to a per-browser map; all five
   merge functions from pairwise to N-ary fold. Again, output should be
   byte-identical with only two browsers loaded.
4. **Safari relocation map**: the curated 73-entry table, reviewed by hand, plus
   `reconcileStructuralForms` extended for the devtools interface-plus-instance
   shape.
5. **Event type decision**: settle `never[]` versus `any[]` versus a third
   canonical form.
6. **Safari ingestion**: load `safari-webextension-types`, apply the relocation
   map, merge with the widening guard.
7. **Coverage, BCD audit, targets, tests**: `safari` and `safari_ios` in
   coverage and BCD audit, `dist/safari-only.d.ts`, regenerate type tests.

Steps 2 and 3 are the bulk of the risk and are both verifiable by
byte-identical output, which is the cheapest possible safety net. I would not
start step 4 before 2 and 3 are green.

### Open questions needing your decision

1. ~~Option A or Option B above~~ **DECIDED 2026-08-15: Option B.** Integrate now
   with the INT-022 widening guard, WebKit PRs in parallel.
2. ~~Safari iOS as a modifier rather than a browser column~~ **DECIDED
   2026-08-15: modifier**, sourced from BCD.
3. The three ambiguous relocations: `InjectionResult`, `RegisteredContentScript`,
   `WindowType`.
4. Whether `browser.*` and `chrome.*` stay aliased under Decision 20 once Safari
   is in. Safari's own package aliases `contextMenus` to `menus` and both
   `browserAction` and `pageAction` to `action`, which Decision 20's single
   canonical set will have to absorb.
5. Whether to file the Chrome and Firefox bugs before or after the dead-patch
   cleanup. Filing first risks filing a bug for a patch we then delete.

---

## Artifacts

In `~/webext-meta-types` (untracked):

- `RESEARCH-safari-integration-and-upstream-bugs.md` (this file)
- `UPSTREAM-BUGS-BY-BROWSER.md` (generated, 492 lines: every filable finding
  with API path, kind and detail, grouped by browser then category)
- `upstream-bug-findings.json` (298 records, includes verbatim upstream source
  and our override for each)
- `safari-surface-analysis.json` (Safari namespaces, the 73 relocations with
  verdicts, per-namespace element comparison)
- `webkit-idl-analysis.txt` / `.json` (orphaned dictionaries, the 104 `any`
  operations grouped by IDL file)
- `analyze-bugs.ts`, `analyze-safari.ts` (the analysis scripts; run from the repo
  root with `npx tsx`)
