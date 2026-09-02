# WORKPLAN: every item that needs to be done

Single source of truth for the webext-meta-types cross-browser type effort,
covering upstream bug filing, repo cleanup, WebKit IDL follow-up, and Safari
integration.

Generated from the research pass on 2026-08-15 by `build-workplan.py`, which
reads `upstream-bug-findings.json`, `safari-surface-analysis.json` and
`webkit-idl-analysis.json`. Regenerate after any change to `patches/` so the
counts stay honest.

## Status, 2026-08-15

Computed at generation time from `patches/`, `verify-patch-necessity-results.json`,
`corrected-bug-inventory.json`, `patch-waivers.json` and `dist/`. Nothing in this
section is hand-maintained, because hand-maintained counts are what made two
earlier versions of this document wrong.

### Corpus

| Measure | Value |
|---|---|
| Patch entries | 178 (was 200) |
| Browser overrides | 263 (was 298) |
| Load-bearing | 263 |
| Inert | 0 |
| Degradation waivers | 12 |
| Cross-browser union fallbacks | 94 |
| False upstream-defect claims in shipped output | 0 (was 230) |

Patch reasons, now a required field:

| reason | entries |
|---|---|
| enhancement | 56 |
| convergence | 54 |
| upstream-defect | 32 |
| upstream-lag | 27 |
| naming | 9 |

### Done since the last revision

- **13 of 13 regressions fixed** (workstream J), each from primary source:
  `geckoProfiler.getSymbols` typed as the real `[Uint32Array, Uint32Array,
  Uint8Array]`, `ProfilerFeature` realigned to the pinned Firefox 143 enum,
  `runtime.Port.error` restored, `action.getBadgeTextColor`'s invented `| string`
  dropped, `processes.Process` named types restored, `_manifest.NativeManifest`
  union restored plus a fabricated Chrome override removed,
  `inspectedWindow.Resource` overload split restored, `inspectedWindow.eval`
  corrected to Firefox's tuple, `userScripts` `global`/`export` corrected,
  `ScriptSource`/`RegisteredUserScript` patches deleted.
- **32 overrides deleted** after individual approval: 21 verified inert, then 11
  more that became inert once the defect annotation was gated on `reason`.
- **`reason` is a required patch field**, and the shipped output no longer
  asserts an upstream defect unless one is actually claimed.
- **Placeholder `bug_url` is rejected** by `validatePatch`. The corpus previously
  carried a mock ID, then invented sequential IDs, then `TBD` on all 200.

### Guardrails now enforced by `npm run check`

| Gate | Catches | Proven to fail by |
|---|---|---|
| `verify:patches` inertness | a patch that changes nothing | synthetic inert entry |
| `verify:patches` overrideShared | the field that bypassed the harness | synthetic shared-only entry |
| `verify:patches` degradation | a patch deleting an upstream member | removing one waiver |
| `ratchet:unions` | convergence regressing | injecting a union note |
| `validatePatch` reason/bug_url | unlabelled or placeholder-evidenced patches | 4 unit tests |

Also live, outside this repo's build: a global `PreToolUse` hook that refuses
shell commands depending on the inherited working directory. It exists because
that hazard produced two silent wrong answers during this analysis.

### Corrections to earlier versions of this plan

Recorded so nobody re-derives them:

- **The Firefox `documentId`/`parentDocumentId` findings are not defects.** All
  are version lag: absent at `FIREFOX_143_0_RELEASE`, present at tip.
  `@types/firefox-webext-browser@143.0.0` correctly describes Firefox 143.
- **143.0.0 is the latest published version.** There is nothing to bump to, so
  "bump the package" is not an executable item. Current stable Firefox is 154.
- **`tabs.onUpdated.changeInfo.groupId` was already fixed upstream** by Mozilla
  bug 1984553, shipped in Firefox 144. An earlier revision recommended filing it,
  which would have duplicated a resolved bug.
- **CI is out of scope here.** Enforcement lives in the crx-audit repo; this repo
  exposes the gates for it to run.
- **WebKit's `validateDictionary` ignores unknown keys**, it does not reject them.
  Workstream D findings must say a key is silently ignored, never rejected.
- **No part of this project has ever been checked against a running browser.**
  The earlier audits were done against browser SOURCE, as were the Firefox and
  WebKit passes on 2026-08-15. Source is a far better oracle than a derived
  `.d.ts` and it is now cheap to consult locally, but it does not observe
  behaviour: where schema and implementation disagree, only a real browser
  settles it. An earlier revision of this plan recorded that gap as closed. It
  is open.
- **121 of the 181 reviewed bug claims were refuted.**
  Only the confirmed ones may be filed, and only after the pre-filing tip check.

---

## Item count

| Workstream | Prefix | Items |
|---|---|---|
| A. Repo hygiene, webext-meta-types | HYG | 8 |
| B. Chrome bugs to file (confirmed) | CHR | 14 |
| C. Firefox bugs to file (confirmed) | FF | 46 |
| D. WebKit IDL wiring | WK | 104 |
| E. safari-webextension-types repo | SWT | 9 |
| F. Safari integration | INT | 98 |
| G. Naming and normalization decisions | NAM | 31 |
| H. BCD discrepancies | BCD | 9 |
| **I. Guardrails and project setup** | **GRD** | **9** (5 landed) |
| J. Repo regressions (patches worse than upstream) | REG | 11 (all fixed) |
| K. Retracted claims (relabel only, do NOT file) | - | 121 |
| L. Canonical type names | CAN | 8 |

Workstream I is the priority: it is the reason the other numbers were wrong
twice. Workstream B and C counts are post-review (60 confirmed of 181 claimed).

Roughly **321 discrete items**. The large counts are
intentionally itemized rather than summarized, because each one is a separate
filing, deletion or edit.

## Execution order and dependencies

```
HYG-001..HYG-006  (parser + generator fixes)      ─┐
HYG-D-*           (delete dead patches)           ─┼─> measurement is trustworthy
                                                   │
CHR-*, FF-*       (file upstream bugs)  <──────────┘   needs dead patches gone first,
                                                       else we file bugs for patches we delete

WK-*              (WebKit IDL wiring PRs)  ── independent, start immediately, long lead time
SWT-*             (safari types repo)      ── independent, small

INT-001..INT-004  (Provenance refactor)    ── verifiable by byte-identical output
        ↓
INT-010..INT-016  (IR pairwise -> N-ary)   ── verifiable by byte-identical output
        ↓
INT-R-*           (73 relocation entries)  ── curated map, needs review
INT-020..INT-023  (structural reconcile, event type decision)
        ↓
INT-030..INT-036  (Safari ingestion, coverage, BCD, targets, tests)

CAN-001           (naming decision, taken 2026-09-02)
CAN-002           (derive-names.ts)            ── the group list is reviewed before anything moves
        ↓
CAN-003..CAN-005  (generator, patches, gate)   ── one change; the dist/ diff is the review
        ↓
CAN-006, CAN-008  (union ratchet, release)
```

Do not start INT-R-* before INT-016 is green. The two refactors are the only
steps with a free correctness check (output must not change while only two
browsers are loaded), and that check is worthless once Safari data is flowing.

---

## Workstream A. Repo hygiene, webext-meta-types

These come first. They are small, and until they are done the bug counts
overstate the real defect load.

### HYG-001. Handle `export { X as Y }` re-export aliases in `parseSource()`

- **File:** `src/generator.ts`, `parseSource()` around line 145.
- **Problem:** the statement loop handles function, interface, class, type alias,
  enum and variable declarations, but not `ExportDeclaration`. `chrome-types`
  uses that form twice to work around reserved words:
  - `export {_debugger as debugger};` at `node_modules/chrome-types/index.d.ts:4564`
  - `export {_eval as eval};` at `node_modules/chrome-types/index.d.ts:6150`
- **Impact today:** `dist/index.d.ts:3400` emits `export namespace _debugger`, so
  the entire `chrome.debugger` namespace is unreachable under its real name.
  `devtools.inspectedWindow` carries both a leaked `_eval` and a patched `eval`.
- **Fix:** in `parseSource()`, read `ExportDeclaration` named exports and record
  the alias so the element is registered under the exported name, not the local one.
- **Acceptance:** `dist/index.d.ts` contains `export namespace debugger` (quoted or
  escaped as TypeScript requires) and no `_debugger`; `devtools.inspectedWindow`
  exposes exactly one `eval` and no `_eval`.
- **Occurrences to cover:** 2 in `chrome-types`, 0 in `@types/firefox-webext-browser`.

### HYG-002. Remove the patch that masked the `eval` parser gap

- **Depends on:** HYG-001.
- **File:** `patches/subsystem-8-ui-devtools.json`, entry
  `devtools.inspectedWindow.eval`.
- **Problem:** the patch adds a correct `eval`, which hid HYG-001 rather than
  fixing it. Once the parser handles the alias, re-evaluate whether the patch is
  still needed or becomes a genuine upstream finding.
- **Acceptance:** patch deleted or re-justified with a real upstream diff.

### HYG-003. Wire real bug URLs through the patch schema

- **Files:** `patches/*.json` (all 200 entries), `src/generator.ts`
  `formatSupportComment()` around line 445.
- **Problem:** every patch carries `bug_url: "TBD"`, which the generator renders
  into shipped output as `@note Upstream type inaccuracy patched (Bug URL: TBD)`.
- **Note:** the real-URL path already exists and emits `@see <url>`. No generator
  change is needed beyond populating the data.
- **Acceptance:** after CHR-* and FF-* are filed, zero `TBD` values remain for
  surviving patches.

### HYG-004. Add a patch-justification test

- **File:** `test/generator.test.ts`.
- **Superseded by `scripts/verify-patch-necessity.ts`.** The originally proposed
  test compared canonicalized patch text against upstream text. That is exactly
  the reasoning that was 75% wrong, so it must not be built.
- **Remaining work:** HYG-008 wires the empirical tool into `npm run check`.

### HYG-005. Decide the policy on `Record<string, unknown>` versus the zero-any rule

- **File:** `scripts/enforce-zero-any.ts`.
- **Problem:** the zero-any policy greps for `any`. `Record<string, unknown>` passes,
  but Safari will contribute 88 of them (see workstream D). The policy needs an
  explicit position before Safari lands, or the guarantee quietly weakens.
- **Acceptance:** documented decision, and if the policy is extended, the script
  enforces it.

### HYG-006. Regenerate and commit `coverage.json` / `COVERAGE.md` policy

- **Problem:** `npm run check` regenerates `COVERAGE.md` as an untracked file.
  Decide whether it is a build product (gitignore it) or a committed artifact.
- **Acceptance:** either ignored or committed, consistently.

### HYG-D-*. Delete 0 inert patch overrides (VERIFIED)

**An earlier version of this plan listed 80 overrides here as dead. That claim
was wrong and has been retracted.** Removing all 80 changed 380 lines of
`dist/index.d.ts`; per-override testing found 60 of them load-bearing, a 75%
false-positive rate. See `POSTMORTEM-dead-patch-audit.md`.

The list below comes from `npm run verify:patches`, which removes each override,
regenerates, and compares emitted output. Of all 298 overrides in the corpus,
**263 are load-bearing and 0 are inert**.

A patch is not only an upstream correction. It also forces convergence between
Chrome's `,`-separated and Firefox's `;`-separated inline type literals, which
the merger cannot collapse on its own. A patch can be textually redundant and
behaviourally essential at the same time, so necessity is decided by removal,
never by reading.

**Deletion is gated on Patrick's approval.** Nothing has been deleted.

Removing a browser-specific override may leave an entry with no overrides at
all, in which case drop the whole entry: `validatePatch` rejects it otherwise.

| ID | Namespace.Element | Override to remove | Patch file |
|---|---|---|---|

The other 263 overrides are proven load-bearing and must stay.
Many carry `bug_url: "TBD"` while doing convergence work rather than fixing an
upstream defect, so they need reclassifying rather than filing. See HYG-007.

### HYG-007. Separate convergence patches from upstream-defect patches

- **Problem:** the patch schema has one `bug_url` field and no way to record why
  a patch exists. A patch that only normalizes `,` versus `;` so the merger can
  converge has no upstream bug to file, but it still emits
  `@note Upstream type inaccuracy patched (Bug URL: TBD)` into shipped output,
  asserting an upstream defect that may not exist.
- **Fix:** add a `reason` field (`upstream-defect` | `convergence` | `naming`) and
  emit the `@note` only for `upstream-defect`.
- **Acceptance:** every patch carries a reason; convergence patches stop claiming
  an upstream inaccuracy.

### HYG-008. Wire `verify:patches` into `npm run check`

- **Depends on:** HYG-D-*, since the check fails while inert overrides exist.
- **Acceptance:** `npm run check` fails if any override becomes inert.

---

## Workstream B. Chrome bugs to file

**File against:** crbug.com (Chromium extension schema) primarily; GoogleChrome/chrome-types only when the generator itself is at fault

**14 items, all adversarially confirmed.** An earlier version of this
plan listed every classifier hit here. That inventory was reduced from 181 to
60 by empirical testing plus seven independent reviewers instructed to refute;
121 of those claims were retracted on review; `corrected-bug-inventory.json`
carries the per-claim verdicts.

Each item carries the verbatim upstream declaration, the shape our patch
asserts, and the reviewer's evidence, so a report can be written without
re-deriving anything.

**Do not file these as individual issues without first reading the root-cause
section below.** Most collapse into a handful of upstream causes, and
maintainers should receive the cause rather than dozens of symptoms.

| Category | Severity | Count |
|---|---|---|
| upstream-any | high | 9 |
| missing-overloads | medium | 1 |
| other-signature-diff | triage | 4 |

### upstream-any (9 items, severity high)

#### CHR-001. `dom.openOrClosedShadowRoot`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; return type '{[name:string]:any}' -> 'ShadowRoot\|null'
- **Upstream today:** `export function openOrClosedShadowRoot( element: HTMLElement, ): {[name: string]: any};`
- **We assert:** `export function openOrClosedShadowRoot(element: Element \| HTMLElement): ShadowRoot \| null;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream emits '{[name: string]: any}' while its own adjacent doc comment says the return is a ShadowRoot (links to MDN ShadowRoot) and returns null when none is attached. The true type is knowable and specific from upstream's own documentation.
- **Evidence:** node_modules/chrome-types/index.d.ts:7790-7799
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-002. `events.Rule`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-events.json` (replace mode)
- **Finding:** upstream uses 'any'; member type(s) differ: conditions, actions
- **Upstream today:** `export interface Rule<C = any, A = any> { id?: string; tags?: string[]; conditions: any[]; actions: any[]; priority?: number; }`
- **We assert:** `export interface Rule<C = unknown, A = unknown> { id?: string; tags?: string[]; conditions: C[]; actions: A[]; priority?: number; }`
- **Members with a different type:** `conditions`, `actions`
- **Adversarial verdict:** CONFIRMED. Upstream declares 'Rule<C = any, A = any>' but never references C or A, typing the members 'conditions: any[]; actions: any[]'; the type parameters are inert, so 'Rule<MyCondition, MyAction>' silently gives no checking. Unused declared type parameters are an objective generator bug, not a matter of taste.
- **Evidence:** node_modules/chrome-types/index.d.ts:9213-9238
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-003. `notifications.getAll`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; upstream is not generic; result type is unparameterized
- **Upstream today:** `export function getAll(): Promise<{[name: string]: any}>; export function getAll( callback?: ( notifications: {[name: string]: any}, ) => void, ): void;`
- **We assert:** `export function getAll(): Promise<Record<string, boolean \| NotificationOptions>>; export function getAll(callback: (notifications: Record<string, boolean \| NotificationOptions>) => void): void;`
- **Overload count:** upstream 2, ours 2
- **Adversarial verdict:** CONFIRMED. Upstream doc says the promise resolves with "the set of notification_ids currently in the system" and Chrome's implementation returns id->true, so '{[name: string]: any}' is under-specified where 'Record<string, true>' is knowable. Our override's 'NotificationOptions' arm is Firefox's shape (fx types return '{[key: string]: CreateNotificationOptions}'), so the patch is wrong even though the upstream defect is real.
- **Evidence:** node_modules/chrome-types/index.d.ts:15473-15489; node_modules/@types/firefox-webext-browser/index.d.ts:3775
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-004. `platformKeys.Match`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; member type(s) differ: keyAlgorithm
- **Upstream today:** `export interface Match { certificate: ArrayBuffer; keyAlgorithm: {[name: string]: any}; }`
- **We assert:** `export interface Match { certificate: ArrayBuffer; keyAlgorithm: KeyAlgorithm; }`
- **Members with a different type:** `keyAlgorithm`
- **Adversarial verdict:** CONFIRMED. Upstream doc for 'keyAlgorithm' links the W3C KeyAlgorithm dictionary but the member is typed '{[name: string]: any}'; 'KeyAlgorithm' is a real lib.dom type, so the correct type is knowable.
- **Evidence:** node_modules/chrome-types/index.d.ts:16053-16070
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-005. `platformKeys.getKeyPair`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; upstream is not generic; result type is unparameterized
- **Upstream today:** `export function getKeyPair( certificate: ArrayBuffer, parameters: {[name: string]: any}, callback: ( publicKey: {[name: string]: any}, privateKey?: {[name: string]: any}, ) => void, ): void;`
- **We assert:** `export function getKeyPair(certificate: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey \| null) => void): void;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream's own '@param callback' text says "The public and private CryptoKey of a certificate" while both params are '{[name: string]: any}'. The 'parameters' arg staying open is fine; only publicKey/privateKey are the filable part.
- **Evidence:** node_modules/chrome-types/index.d.ts:16155-16180
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-006. `platformKeys.getKeyPairBySpki`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; upstream is not generic; result type is unparameterized
- **Upstream today:** `export function getKeyPairBySpki( publicKeySpkiDer: ArrayBuffer, parameters: {[name: string]: any}, callback: ( publicKey: {[name: string]: any}, privateKey?: {[name: string]: any}, ) => void, ): void;`
- **We assert:** `export function getKeyPairBySpki(publicKeySpkiDer: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey \| null) => void): void;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Identical to getKeyPair: the doc comment names CryptoKey explicitly while the callback params are typed '{[name: string]: any}'. Our override's 'parameters: Record<string, unknown>' adds nothing and is not part of the defect.
- **Evidence:** node_modules/chrome-types/index.d.ts:16186-16203
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-007. `platformKeys.subtleCrypto`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; return type '{[name:string]:any}\|undefined' -> 'SubtleCrypto'
- **Upstream today:** `export function subtleCrypto(): {[name: string]: any} \| undefined;`
- **We assert:** `export function subtleCrypto(): SubtleCrypto;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream doc says verbatim "An implementation of WebCrypto's SubtleCrypto" yet emits '{[name: string]: any} \| undefined'. Note our override also drops the '\| undefined' arm, which upstream declares deliberately, so the patch overshoots the defect.
- **Evidence:** node_modules/chrome-types/index.d.ts:16200-16204
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-008. `processes.getProcessInfo`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; upstream is not generic; result type is unparameterized; overloads 2 -> 6
- **Upstream today:** `export function getProcessInfo( processIds: number \| number[], includeMemory: boolean, ): Promise<{[name: string]: any}>; export function getProcessInfo( processIds: number \| number[], includeMemory: boolean, callback...`
- **We assert:** `export function getProcessInfo(processIds?: number \| number[], includeMemory?: boolean): Promise<Record<number, Process>>; export function getProcessInfo(includeMemory: boolean): Promise<Record<number, Process>>; expor...`
- **Overload count:** upstream 2, ours 6
- **Adversarial verdict:** CONFIRMED. Upstream declares 'interface Process' in the same namespace and documents the callback param as "A dictionary of Process objects ... indexed by process ID", yet types it '{[name: string]: any}'; the fix is '{[id: number]: Process}'. Only that is filable, not our six-overload expansion, and the namespace is '@alpha'/'@chrome-channel dev' so priority is low.
- **Evidence:** node_modules/chrome-types/index.d.ts:17006-17011 (channel), :17049 (Process), :17227,:17240
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-009. `webRequest.UploadData`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; member type(s) differ: bytes
- **Upstream today:** `export interface UploadData { bytes?: any; file?: string; }`
- **We assert:** `export interface UploadData { bytes?: ArrayBuffer; file?: string; }`
- **Members with a different type:** `bytes`
- **Adversarial verdict:** CONFIRMED. Upstream's doc comment on the member literally reads "An ArrayBuffer with a copy of the data" while the member is typed 'bytes?: any'; a declaration contradicting its own adjacent doc is a clean filable defect.
- **Evidence:** node_modules/chrome-types/index.d.ts:27345-27356
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

### missing-overloads (1 items, severity medium)

#### CHR-010. `desktopCapture.chooseDesktopMedia`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** overloads 2 -> 4
- **Upstream today:** `export function chooseDesktopMedia( sources: DesktopCaptureSourceType[], targetTab: tabs.Tab, callback: ( streamId: string, options: { canRequestAudioTrack: boolean, }, ) => void, ): number; export function chooseDeskto...`
- **We assert:** `export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], targetTab: tabs.Tab, options: ChooseDesktopMediaOptions, callback: (streamId: string, options: { canRequestAudioTrack: boolean }) => void): number;...`
- **Overload count:** upstream 2, ours 4
- **Adversarial verdict:** CONFIRMED. chrome-types declares SystemAudioPreferenceEnum, WindowAudioPreferenceEnum and SelfCapturePreferenceEnum but references them from nothing in either index.d.ts or _all.d.ts, proving the ChooseDesktopMediaOptions dictionary and the options parameter were dropped by the generator. The two emitted overloads have no options arg at all.
- **Evidence:** node_modules/chrome-types/index.d.ts:5943,5950,5957 (orphan enums), :5966 and :5997 (both overloads lack options); _all.d.ts:9677 same orphan
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

### other-signature-diff (4 items, severity triage)

#### CHR-011. `runtime.getPackageDirectoryEntry`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-runtime.json` (replace mode)
- **Finding:** signature differs after canonicalization
- **Upstream today:** `export function getPackageDirectoryEntry(): Promise<DirectoryEntry>; export function getPackageDirectoryEntry( callback?: ( directoryEntry: DirectoryEntry, ) => void, ): void;`
- **We assert:** `export function getPackageDirectoryEntry(): Promise<FileSystemDirectoryEntry>; export function getPackageDirectoryEntry(callback: (directoryEntry: FileSystemDirectoryEntry) => void): void;`
- **Overload count:** upstream 2, ours 2
- **Adversarial verdict:** CONFIRMED. chrome-types declares a global stub 'interface DirectoryEntry extends Entry {}' (empty, so the returned object appears to have no members) on the stated grounds that it is a "DOM API not necessarily available in TS' defaults", but lib.dom.d.ts does ship FileSystemDirectoryEntry, which is the name Blink actually exposes. Chromium's own runtime.json carries the stale '"isInstanceOf": "DirectoryEntry"', so the defect is fileable at either layer.
- **Evidence:** node_modules/chrome-types/index.d.ts:80-83 and :18491-18501; node_modules/@typescript/typescript-linux-x64/lib/lib.dom.d.ts:14594
- **Triage needed:** the difference did not fall into a known category. Read
  both declarations and decide whether this is an upstream defect or a
  restructuring of ours before filing.
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-012. `tabs.WindowType`

- **Kind:** type alias  |  **Patch source:** `patches/subsystem-*-tabs.json` (replace mode)
- **Finding:** signature differs after canonicalization
- **Upstream today:** `export type WindowType = "normal" \| "popup" \| "panel" \| "app" \| "devtools";`
- **We assert:** `export type WindowType = "normal" \| "popup" \| "panel" \| "app" \| "devtools" \| "custom-tab";`
- **Adversarial verdict:** CONFIRMED. Chromium's chrome/common/extensions/api/tabs.json WindowType enum includes "custom-tab" (nodoc) alongside the five documented values, and chrome-types emits only five; tabs.query({windowType}) and Tab results can therefore carry a value the type rejects.
- **Evidence:** node_modules/chrome-types/index.d.ts:22881 vs chromium chrome/common/extensions/api/tabs.json WindowType enum
- **Triage needed:** the difference did not fall into a known category. Read
  both declarations and decide whether this is an upstream defect or a
  restructuring of ours before filing.
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-013. `windows.WindowState`

- **Kind:** type alias  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** signature differs after canonicalization
- **Upstream today:** `export type WindowState = "normal" \| "minimized" \| "maximized" \| "fullscreen";`
- **We assert:** `export type WindowState = "normal" \| "minimized" \| "maximized" \| "fullscreen" \| "locked-fullscreen";`
- **Adversarial verdict:** CONFIRMED. Chromium's chrome/common/extensions/api/windows.json really does define "locked-fullscreen" in WindowState (marked "nodoc": true, available only to allowlisted extensions on ChromeOS), and chrome-types omits it, so a value the browser can return is untypeable. The nodoc flag explains the omission but the state is still observable via windows.get/getAll.
- **Evidence:** node_modules/chrome-types/index.d.ts:28440 (4 members) vs chromium windows.json WindowType/WindowState enums fetched from chromium.googlesource.com ("locked-fullscreen", nodoc:true)
- **Triage needed:** the difference did not fall into a known category. Read
  both declarations and decide whether this is an upstream defect or a
  restructuring of ours before filing.
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### CHR-014. `windows.WindowType`

- **Kind:** type alias  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** signature differs after canonicalization
- **Upstream today:** `export type WindowType = "normal" \| "popup" \| "panel" \| "app" \| "devtools";`
- **We assert:** `export type WindowType = "normal" \| "popup" \| "panel" \| "app" \| "devtools" \| "custom-tab";`
- **Adversarial verdict:** CONFIRMED. Chromium's windows.json defines "custom-tab" ("nodoc": true, described as an Android custom tab browser window) in WindowType; chrome-types emits only the five documented members. The added value is genuine, not invented by us.
- **Evidence:** node_modules/chrome-types/index.d.ts:28429 vs chromium chrome/common/extensions/api/windows.json WindowType enum
- **Triage needed:** the difference did not fall into a known category. Read
  both declarations and decide whether this is an upstream defect or a
  restructuring of ours before filing.
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

---

## Workstream C. Firefox bugs to file

**File against:** DefinitelyTyped (@types/firefox-webext-browser); bugzilla.mozilla.org when the Gecko schemas/*.json is the root cause

**46 items, all adversarially confirmed.** An earlier version of this
plan listed every classifier hit here. That inventory was reduced from 181 to
60 by empirical testing plus seven independent reviewers instructed to refute;
121 of those claims were retracted on review; `corrected-bug-inventory.json`
carries the per-claim verdicts.

Each item carries the verbatim upstream declaration, the shape our patch
asserts, and the reviewer's evidence, so a report can be written without
re-deriving anything.

**Do not file these as individual issues without first reading the root-cause
section below.** Most collapse into a handful of upstream causes, and
maintainers should receive the cause rather than dozens of symptoms.

| Category | Severity | Count |
|---|---|---|
| upstream-any | high | 16 |
| missing-members | medium | 27 |
| upstream-weak-type | medium | 2 |
| missing-overloads | medium | 1 |

### upstream-any (16 items, severity high)

#### FF-001. `action.getBadgeTextColor`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; overloads 1 -> 2
- **Upstream today:** `function getBadgeTextColor(details: Details): Promise<any>;`
- **We assert:** `export function getBadgeTextColor(details: { tabId?: number }): Promise<ColorArray \| string>; export function getBadgeTextColor(details: { tabId?: number }, callback: (color: ColorArray \| string) => void): void;`
- **Overload count:** upstream 1, ours 2
- **Adversarial verdict:** CONFIRMED. chrome-types declares the identical API as 'Promise<extensionTypes.ColorArray>' and MDN documents the fulfilment value as a ColorArray, while Firefox's types say 'Promise<any>'; the sibling getBadgeBackgroundColor is already 'Promise<ColorArray>' in the same namespace. Caveat: our '\| string' return arm is unproven, getters return an array.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:1039 vs :1031; node_modules/chrome-types/index.d.ts:651-658
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-002. `action.setBadgeTextColor`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; overloads 1 -> 2
- **Upstream today:** `function setBadgeTextColor(details: _SetBadgeTextColorDetails): Promise<any>;`
- **We assert:** `export function setBadgeTextColor(details: { color: string \| ColorArray \| null; tabId?: number }): Promise<void>; export function setBadgeTextColor(details: { color: string \| ColorArray \| null; tabId?: number }, cal...`
- **Overload count:** upstream 1, ours 2
- **Adversarial verdict:** CONFIRMED. A setter that resolves with nothing is typed 'Promise<any>' while the adjacent setBadgeBackgroundColor in the same namespace is 'Promise<void>' and chrome-types declares 'Promise<void>' for the identical function. The correct type is knowable and the asymmetry is proof of an emission bug.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:1036 vs :1032; node_modules/chrome-types/index.d.ts:607-622
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-003. `browserAction.getBadgeTextColor`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; overloads 1 -> 2
- **Upstream today:** `function getBadgeTextColor(details: Details): Promise<any>;`
- **We assert:** `export function getBadgeTextColor(details: Details): Promise<ColorArray>; export function getBadgeTextColor(details: Details, callback: (color: ColorArray) => void): void;`
- **Overload count:** upstream 1, ours 2
- **Adversarial verdict:** CONFIRMED. MDN states it returns "A Promise that will be fulfilled with the retrieved color as a browserAction.ColorArray", and upstream already types getBadgeBackgroundColor as 'Promise<ColorArray>' five lines away. Our override matches MDN exactly.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:1234 vs :1226; MDN browserAction/getBadgeTextColor Return value
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-004. `browserAction.setBadgeTextColor`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; overloads 1 -> 2
- **Upstream today:** `function setBadgeTextColor(details: _SetBadgeTextColorDetails): Promise<any>;`
- **We assert:** `export function setBadgeTextColor(details: _SetBadgeTextColorDetails): Promise<void>; export function setBadgeTextColor(details: _SetBadgeTextColorDetails, callback: () => void): void;`
- **Overload count:** upstream 1, ours 2
- **Adversarial verdict:** CONFIRMED. Same emission bug as the action namespace: 'Promise<any>' for a setter that resolves with no value, while the neighbouring setBadgeBackgroundColor is 'Promise<void>'. Correct type is knowable and matched by chrome-types.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:1231 vs :1222; node_modules/chrome-types/index.d.ts:607-622
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-005. `contentScripts.RegisteredContentScript`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (merge mode)
- **Finding:** upstream uses 'any'; member type(s) differ: unregister
- **Upstream today:** `interface RegisteredContentScript { unregister(): Promise<any>; }`
- **We assert:** `export interface RegisteredContentScript { unregister(): Promise<void>; }`
- **Members with a different type:** `unregister`
- **Adversarial verdict:** CONFIRMED. The Gecko schema declares unregister as '"async": true' with '"parameters": []', and MDN's unregister page lists "Return value: None", so the resolution value is void and 'Promise<any>' is the generator's fallback. Our 'Promise<void>' is the documented type.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:1627-1630; mozilla-central toolkit/components/extensions/schemas/content_scripts.json unregister; MDN contentScripts/RegisteredContentScript/unregister
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-006. `contextMenus.refresh`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<void>'
- **Upstream today:** `function refresh(): Promise<any>;`
- **We assert:** `export function refresh(): Promise<void>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. The Gecko schema entry is '"async": true, "parameters": []' and MDN says the promise "is fulfilled with no arguments", so 'Promise<void>' is the knowable correct type. Same single upstream root cause as menus.refresh, tabs.warmup and the badge-text-color setters: the DT generator falls back to 'Promise<any>' for async functions with no callback params.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:7870; mozilla-central browser/components/extensions/schemas/menus.json refresh; MDN menus/refresh
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-007. `geckoProfiler.dumpProfileToFile`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-gecko-specialized.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<string>'
- **Upstream today:** `function dumpProfileToFile(fileName: string): Promise<any>;`
- **We assert:** `export function dumpProfileToFile(fileName: string): Promise<string>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream declares 'Promise<any>' while the doc comment on the very same declaration states "The returned promise resolves to a path that locates the created file", so the correct type is 'Promise<string>' and it is stated in upstream's own text. The mismatch between the description and the emitted type is a real, citable generation defect.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:3254-3258
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-008. `geckoProfiler.getProfileAsArrayBuffer`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-gecko-specialized.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<ArrayBuffer>'
- **Upstream today:** `function getProfileAsArrayBuffer(): Promise<any>;`
- **We assert:** `export function getProfileAsArrayBuffer(): Promise<ArrayBuffer>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream emits 'Promise<any>' while its own doc comment says "The returned promise resolves to an array buffer that contains a JSON string", so 'Promise<ArrayBuffer>' is knowable and documented in the same file. The schema description carries the type the generated signature drops.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:3263-3266
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-009. `geckoProfiler.getProfileAsGzippedArrayBuffer`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-gecko-specialized.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<ArrayBuffer>'
- **Upstream today:** `function getProfileAsGzippedArrayBuffer(): Promise<any>;`
- **We assert:** `export function getProfileAsGzippedArrayBuffer(): Promise<ArrayBuffer>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Same as getProfileAsArrayBuffer: the doc comment states the promise resolves to an array buffer containing a gzipped JSON string, yet the signature is 'Promise<any>'. 'Promise<ArrayBuffer>' is supported by upstream's own text.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:3268-3271
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-010. `menus.refresh`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<void>'
- **Upstream today:** `function refresh(): Promise<any>;`
- **We assert:** `export function refresh(): Promise<void>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Identical declaration from the same schema entry ('"async": true, "parameters": []'); MDN documents fulfilment with no arguments. Should be 'Promise<void>'.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:8154; MDN menus/refresh Return value
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-011. `normandyAddonStudy.getStudy`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-gecko-specialized.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<Study\|null>'
- **Upstream today:** `function getStudy(): Promise<any>;`
- **We assert:** `export function getStudy(): Promise<Study \| null>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream declares 'interface Study' at 8189 and never references it anywhere in the 9000-line file, while the function documented as "Returns a study object for the current study" is typed 'Promise<any>': an orphaned type is objective proof the generated return type is wrong. The '\| null' arm of our override is unverified, so the bug should be filed as 'Promise<Study>'.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:8189 (declared) vs :8222 (Promise<any>); grep for 'Study' yields only the declaration
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-012. `runtime.getFrameId`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-runtime.json` (replace mode)
- **Finding:** upstream uses 'any'
- **Upstream today:** `function getFrameId(target: any): number;`
- **We assert:** `export function getFrameId(target: WindowProxy \| HTMLIFrameElement \| HTMLFrameElement \| HTMLEmbedElement \| HTMLObjectElement): number;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. The Gecko schema parameter is '"type": "any"' yet its own description enumerates exactly "A WindowProxy or a browsing context container Element (iframe, frame, embed, or object)", which is what our override declares. The correct type is knowable and documented in the source of truth, so DT (or the schema) should carry an override.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:4540-4544; mozilla-central toolkit/components/extensions/schemas/runtime.json getFrameId
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-013. `tabs.moveInSuccession`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-tabs.json` (replace mode)
- **Finding:** upstream uses 'any'; overloads 1 -> 2
- **Upstream today:** `function moveInSuccession(tabIds: number[], tabId?: number, options?: _MoveInSuccessionOptions): Promise<any>;`
- **We assert:** `export function moveInSuccession(tabIds: number[], tabId?: number, options?: _MoveInSuccessionOptions): Promise<void>; export function moveInSuccession(tabIds: number[], options?: _MoveInSuccessionOptions): Promise<void...`
- **Overload count:** upstream 1, ours 2
- **Adversarial verdict:** CONFIRMED. The Gecko schema declares '"async": true' with no callback parameters, so the promise resolves with no value and 'Promise<any>' should be 'Promise<void>'; sibling functions with declared results (hide -> Promise<number[]>, show/reload -> Promise<void>) prove the generator can emit the precise type. Caveat: our extra '(tabIds, options)' overload is a separate, unproven addition not covered by this claim.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:9511 vs :9503,:9509; mozilla-central browser/components/extensions/schemas/tabs.json moveInSuccession
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-014. `tabs.warmup`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-tabs.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<void>'
- **Upstream today:** `function warmup(tabId: number): Promise<any>;`
- **We assert:** `export function warmup(tabId: number): Promise<void>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. MDN states warmup returns "A Promise that will be fulfilled with no arguments", and the schema entry is '"async": true' with no callback parameters, so 'Promise<void>' is the knowable correct type. The neighbouring reload() overloads in the same file are already 'Promise<void>', which shows this is an upstream emission bug, not an intentional openness.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:9354 vs :9341-9349; MDN tabs/warmup Return value
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-015. `telemetry.canUpload`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-gecko-specialized.json` (replace mode)
- **Finding:** upstream uses 'any'; return type 'Promise<any>' -> 'Promise<boolean>'
- **Upstream today:** `function canUpload(): Promise<any>;`
- **We assert:** `export function canUpload(): Promise<boolean>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Upstream declares 'Promise<any>' for a nullary predicate documented as "Checks if Telemetry upload is enabled", where boolean is the only coherent resolution, and the same file proves the generator can express such types when the schema supplies a callback (1029). Genuinely underspecified upstream with a knowable correct type.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:5119-5120
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-016. `webRequest.UploadData`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'any'; member type(s) differ: bytes
- **Upstream today:** `interface UploadData { bytes?: any; file?: string \| undefined; }`
- **We assert:** `export interface UploadData { bytes?: ArrayBuffer; file?: string; }`
- **Members with a different type:** `bytes`
- **Adversarial verdict:** CONFIRMED. Upstream's own JSDoc on the member says "An ArrayBuffer with a copy of the data" while the type is 'any'; the true type is knowable and specific. chrome-types carries the identical defect with the identical doc comment, so this is filable against both DefinitelyTyped and chrome-types/Chromium.
- **Evidence:** node_modules/@types/firefox-webext-browser/index.d.ts:6128-6133; node_modules/chrome-types/index.d.ts:27345-27356
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

### missing-members (27 items, severity medium)

#### FF-017. `contentScripts.RegisteredContentScriptOptions`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (merge mode)
- **Finding:** missing member(s): cssOrigin
- **Upstream today:** `interface RegisteredContentScriptOptions { matches: _manifest.MatchPattern[]; excludeMatches?: _manifest.MatchPattern[] \| undefined; includeGlobs?: string[] \| undefined; excludeGlobs?: string[] \| undefined; css?: ext...`
- **We assert:** `export interface RegisteredContentScriptOptions { cssOrigin?: extensionTypes.CSSOrigin; }`
- **Members missing upstream:** `cssOrigin`
- **Adversarial verdict:** CONFIRMED. cssOrigin on contentScripts.register shipped in Firefox 144, past the package's 143 baseline, and is not declared on RegisteredContentScriptOptions.
- **Evidence:** BCD webextensions.api.contentScripts.register.cssOrigin firefox 144; index.d.ts:3149 is the only cssOrigin declaration
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-018. `proxy._OnRequestDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnRequestDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| undefine...`
- **We assert:** `export interface _OnRequestDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 ships documentId and parentDocumentId on proxy.onRequest details; neither is declared upstream. Same 143-vs-153 package staleness as the webRequest set.
- **Evidence:** BCD webextensions.api.proxy.onRequest.documentId / .parentDocumentId firefox 153; @types package.json version 143.0.0
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-019. `runtime.MessageSender`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-runtime.json` (replace mode)
- **Finding:** missing member(s): documentId; upstream declares member(s) we drop: tlsChannelId
- **Upstream today:** `interface MessageSender { tab?: tabs.Tab \| undefined; frameId?: number \| undefined; id?: string \| undefined; url?: string \| undefined; tlsChannelId?: string \| undefined; userScriptWorldId?: string \| undefined; }`
- **We assert:** `export interface MessageSender { documentId?: string; frameId?: number; id?: string; tab?: tabs.Tab; url?: string; userScriptWorldId?: string; }`
- **Members missing upstream:** `documentId`
- **Members upstream has that we drop:** `tlsChannelId`
- **Adversarial verdict:** CONFIRMED. documentId ships in Firefox 153 and is not declared on MessageSender upstream. Note two sub-claims are wrong: userScriptWorldId is already declared upstream, and dropping tlsChannelId is correct rather than a defect (BCD firefox version_added false, upstream marks it @deprecated Unsupported).
- **Evidence:** BCD runtime.MessageSender.documentId firefox 153, .tlsChannelId firefox false; index.d.ts:4347 tlsChannelId, :4352 userScriptWorldId
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-020. `scripting.RegisteredContentScript`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-scripting.json` (merge mode)
- **Finding:** missing member(s): cssOrigin
- **Upstream today:** `interface RegisteredContentScript { allFrames?: boolean \| undefined; excludeMatches?: string[] \| undefined; id: string; js?: _manifest.ExtensionURL[] \| undefined; matches?: string[] \| undefined; matchOriginAsFallbac...`
- **We assert:** `export interface RegisteredContentScript { cssOrigin?: extensionTypes.CSSOrigin; }`
- **Members missing upstream:** `cssOrigin`
- **Adversarial verdict:** CONFIRMED. cssOrigin on scripting.RegisteredContentScript shipped in Firefox 144, one release past the package's 143 baseline; the only cssOrigin declaration in the file is on extensionTypes.InjectDetails.
- **Evidence:** BCD webextensions.api.scripting.RegisteredContentScript.cssOrigin firefox 144; index.d.ts:3149 is the sole cssOrigin occurrence (extensionTypes.InjectDetails)
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-021. `tabs._ConnectConnectInfo`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-tabs.json` (merge mode)
- **Finding:** missing member(s): documentId
- **Upstream today:** `interface _ConnectConnectInfo { name?: string \| undefined; frameId?: number \| undefined; }`
- **We assert:** `export interface _ConnectConnectInfo { documentId?: string; }`
- **Members missing upstream:** `documentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 accepts documentId in tabs.connect connectInfo; upstream declares only name and frameId.
- **Evidence:** BCD webextensions.api.tabs.connect.connectInfo.documentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-022. `tabs._OnUpdatedChangeInfo`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-tabs.json` (merge mode)
- **Finding:** missing member(s): groupId, splitViewId
- **Upstream today:** `interface _OnUpdatedChangeInfo { attention?: boolean \| undefined; audible?: boolean \| undefined; autoDiscardable?: boolean \| undefined; discarded?: boolean \| undefined; favIconUrl?: string \| undefined; hidden?: boo...`
- **We assert:** `export interface _OnUpdatedChangeInfo { groupId?: number; splitViewId?: number; }`
- **Members missing upstream:** `groupId`, `splitViewId`
- **Adversarial verdict:** CONFIRMED. Strongest item in the batch: groupId shipped in Firefox 138, well before the 143 baseline this package is generated from, yet _OnUpdatedChangeInfo omits it while _QueryQueryInfo and Tab both declare groupId. That is a real schema/generator gap, not version lag. splitViewId (Firefox 149) is ordinary lag.
- **Evidence:** BCD tabs.onUpdated.changeInfo.groupId firefox 138, .splitViewId firefox 149; index.d.ts:8874 (Tab.groupId), :9115 (_QueryQueryInfo.groupId), _OnUpdatedChangeInfo has neither
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-023. `tabs._QueryQueryInfo`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-tabs.json` (merge mode)
- **Finding:** missing member(s): splitViewId
- **Upstream today:** `interface _QueryQueryInfo { active?: boolean \| undefined; attention?: boolean \| undefined; pinned?: boolean \| undefined; audible?: boolean \| undefined; autoDiscardable?: boolean \| undefined; muted?: boolean \| unde...`
- **We assert:** `export interface _QueryQueryInfo { splitViewId?: number; }`
- **Members missing upstream:** `splitViewId`
- **Adversarial verdict:** CONFIRMED. splitViewId is queryable since Firefox 149 and is absent from _QueryQueryInfo upstream (the package targets 143).
- **Evidence:** BCD webextensions.api.tabs.query.queryInfo.splitViewId firefox 149
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-024. `tabs._SendMessageOptions`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-tabs.json` (merge mode)
- **Finding:** missing member(s): documentId
- **Upstream today:** `interface _SendMessageOptions { frameId?: number \| undefined; }`
- **We assert:** `export interface _SendMessageOptions { documentId?: string; }`
- **Members missing upstream:** `documentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 accepts documentId in tabs.sendMessage options; upstream declares only frameId.
- **Evidence:** BCD webextensions.api.tabs.sendMessage.options.documentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-025. `webNavigation._GetAllFramesReturnDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _GetAllFramesReturnDetails { errorOccurred?: boolean \| undefined; processId?: number \| undefined; tabId: number; frameId: number; parentFrameId: number; url: string; }`
- **We assert:** `export interface _GetAllFramesReturnDetails { documentId: string; parentDocumentId?: string; url: string; tabId: number; frameId: number; parentFrameId: number; errorOccurred?: boolean; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. documentId and parentDocumentId ship in Firefox 153 and are absent upstream. The processId we drop is our own choice, not an upstream defect: upstream already marks it @deprecated Unsupported on Firefox.
- **Evidence:** BCD webextensions.api.webNavigation.getAllFrames.documentId / .parentDocumentId firefox 153; upstream_declaration marks processId deprecated
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-026. `webNavigation._GetFrameDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId; member type(s) differ: frameId, tabId; optionality: frameId:req->opt, tabId:req->opt
- **Upstream today:** `interface _GetFrameDetails { tabId: number; processId?: number \| undefined; frameId: number; }`
- **We assert:** `export interface _GetFrameDetails { documentId?: string; frameId?: number; tabId?: number; }`
- **Members missing upstream:** `documentId`
- **Members with a different type:** `frameId`, `tabId`
- **Optionality differences:** `frameId:req->opt`, `tabId:req->opt`
- **Adversarial verdict:** CONFIRMED. Firefox 153 accepts documentId in getFrame details (which is what makes tabId/frameId optional), and no documentId is declared anywhere in webNavigation upstream. The package is generated from Firefox 143 schemas, so it predates the feature.
- **Evidence:** BCD webextensions.api.webNavigation.getFrame.documentId firefox 153; index.d.ts documentId occurs only at :4275 and :4300 (both runtime)
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-027. `webNavigation._GetFrameReturnDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _GetFrameReturnDetails { errorOccurred?: boolean \| undefined; url: string; tabId: number; frameId: number; parentFrameId: number; }`
- **We assert:** `export interface _GetFrameReturnDetails { documentId: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 returns documentId and parentDocumentId from getFrame; upstream declares neither. parentDocumentId does not appear anywhere in the 10012-line file.
- **Evidence:** BCD webextensions.api.webNavigation.getFrame.documentId / .parentDocumentId firefox 153; grep parentDocumentId index.d.ts -> 0 hits
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-028. `webNavigation._OnBeforeNavigateDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _OnBeforeNavigateDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; parentFrameId: number; timeStamp: number; }`
- **We assert:** `export interface _OnBeforeNavigateDetails { parentDocumentId?: string; tabId: number; url: string; frameId: number; parentFrameId: number; timeStamp: number; }`
- **Members missing upstream:** `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. BCD lists parentDocumentId (and only parentDocumentId, no documentId) for onBeforeNavigate at Firefox 153, exactly matching the override, which shows the patch was derived from real schema data rather than pattern-copied. Upstream declares it nowhere.
- **Evidence:** BCD webextensions.api.webNavigation.onBeforeNavigate.parentDocumentId firefox 153 (no .documentId entry)
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-029. `webNavigation._OnCommittedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _OnCommittedDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; transitionType: TransitionType; transitionQualifiers: TransitionQualifier[]; timeStamp: number; }`
- **We assert:** `export interface _OnCommittedDetails { documentId: string; parentDocumentId?: string; tabId: number; url: string; frameId: number; transitionType: TransitionType; transitionQualifiers: TransitionQualifier[]; timeStamp: ...`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. Both members ship in Firefox 153 and are absent upstream; the dropped processId is upstream-marked unsupported and is our choice.
- **Evidence:** BCD webextensions.api.webNavigation.onCommitted.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-030. `webNavigation._OnCompletedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _OnCompletedDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; timeStamp: number; }`
- **We assert:** `export interface _OnCompletedDetails { documentId: string; parentDocumentId?: string; tabId: number; url: string; frameId: number; timeStamp: number; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. Both members ship in Firefox 153 and are absent upstream.
- **Evidence:** BCD webextensions.api.webNavigation.onCompleted.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-031. `webNavigation._OnDOMContentLoadedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _OnDOMContentLoadedDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; timeStamp: number; }`
- **We assert:** `export interface _OnDOMContentLoadedDetails { documentId: string; parentDocumentId?: string; tabId: number; url: string; frameId: number; timeStamp: number; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. Both members ship in Firefox 153 and are absent upstream.
- **Evidence:** BCD webextensions.api.webNavigation.onDOMContentLoaded.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-032. `webNavigation._OnErrorOccurredDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId, error
- **Upstream today:** `interface _OnErrorOccurredDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; error?: string \| undefined; timeStamp: number; }`
- **We assert:** `export interface _OnErrorOccurredDetails { documentId: string; parentDocumentId?: string; tabId: number; url: string; frameId: number; timeStamp: number; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`, `error`
- **Adversarial verdict:** CONFIRMED. Both members ship in Firefox 153 and are absent upstream. Dropping processId and error is our choice; upstream marks both @deprecated Unsupported on Firefox, so removing them is defensible but is not the upstream defect.
- **Evidence:** BCD webextensions.api.webNavigation.onErrorOccurred.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-033. `webNavigation._OnHistoryStateUpdatedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** missing member(s): documentId, parentDocumentId; upstream declares member(s) we drop: processId
- **Upstream today:** `interface _OnHistoryStateUpdatedDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; transitionType: TransitionType; transitionQualifiers: TransitionQualifier[]; timeStamp: number; }`
- **We assert:** `export interface _OnHistoryStateUpdatedDetails { documentId: string; parentDocumentId?: string; tabId: number; url: string; frameId: number; transitionType: TransitionType; transitionQualifiers: TransitionQualifier[]; t...`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Members upstream has that we drop:** `processId`
- **Adversarial verdict:** CONFIRMED. Both members ship in Firefox 153 and are absent upstream.
- **Evidence:** BCD webextensions.api.webNavigation.onHistoryStateUpdated.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-034. `webNavigation._OnReferenceFragmentUpdatedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnReferenceFragmentUpdatedDetails { tabId: number; url: string; processId?: number \| undefined; frameId: number; transitionType: TransitionType; transitionQualifiers: TransitionQualifier[]; timeStamp: number...`
- **We assert:** `export interface _OnReferenceFragmentUpdatedDetails { documentId: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. BCD records both members as shipped in Firefox 153 for this event; upstream declares neither.
- **Evidence:** BCD webextensions.api.webNavigation.onReferenceFragmentUpdated.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-035. `webRequest._OnAuthRequiredDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnAuthRequiredDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| und...`
- **We assert:** `export interface _OnAuthRequiredDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onAuthRequired details; upstream (Firefox 143 schemas) declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onAuthRequired.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-036. `webRequest._OnBeforeRedirectDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnBeforeRedirectDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| u...`
- **We assert:** `export interface _OnBeforeRedirectDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onBeforeRedirect details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onBeforeRedirect.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-037. `webRequest._OnBeforeRequestDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnBeforeRequestDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| un...`
- **We assert:** `export interface _OnBeforeRequestDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onBeforeRequest details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onBeforeRequest.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-038. `webRequest._OnBeforeSendHeadersDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnBeforeSendHeadersDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \...`
- **We assert:** `export interface _OnBeforeSendHeadersDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onBeforeSendHeaders details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onBeforeSendHeaders.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-039. `webRequest._OnCompletedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnCompletedDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| undefi...`
- **We assert:** `export interface _OnCompletedDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onCompleted details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onCompleted.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-040. `webRequest._OnErrorOccurredDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnErrorOccurredDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| un...`
- **We assert:** `export interface _OnErrorOccurredDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onErrorOccurred details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onErrorOccurred.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-041. `webRequest._OnHeadersReceivedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnHeadersReceivedDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| ...`
- **We assert:** `export interface _OnHeadersReceivedDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onHeadersReceived details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onHeadersReceived.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-042. `webRequest._OnResponseStartedDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnResponseStartedDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| ...`
- **We assert:** `export interface _OnResponseStartedDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onResponseStarted details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onResponseStarted.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-043. `webRequest._OnSendHeadersDetails`

- **Kind:** interface  |  **Patch source:** `patches/subsystem-*-platform-system.json` (merge mode)
- **Finding:** missing member(s): documentId, parentDocumentId
- **Upstream today:** `interface _OnSendHeadersDetails { requestId: string; url: string; method: string; frameId: number; parentFrameId: number; incognito?: boolean \| undefined; cookieStoreId?: string \| undefined; originUrl?: string \| unde...`
- **We assert:** `export interface _OnSendHeadersDetails { documentId?: string; parentDocumentId?: string; }`
- **Members missing upstream:** `documentId`, `parentDocumentId`
- **Adversarial verdict:** CONFIRMED. Firefox 153 adds documentId and parentDocumentId to onSendHeaders details; upstream declares neither.
- **Evidence:** BCD webextensions.api.webRequest.onSendHeaders.details.documentId / .parentDocumentId firefox 153
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

### upstream-weak-type (2 items, severity medium)

#### FF-044. `sessions.getTabValue`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'object'; return type 'Promise<string\|object\|undefined>' -> 'Promise<JsonValue\|undefined>'
- **Upstream today:** `function getTabValue(tabId: number, key: string): Promise<string \| object \| undefined>;`
- **We assert:** `export function getTabValue(tabId: number, key: string): Promise<JsonValue \| undefined>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Firefox stores the value as 'JSON.stringify(value)' and returns 'JSON.parse(...)', so a stored number, boolean or null comes back as a number, boolean or null, none of which are assignable to 'string \| object'; the schema declares no return type at all, so upstream's narrow union is invented and factually wrong (this is a wrong union, not honest looseness).
- **Evidence:** browser/components/extensions/parent/ext-sessions.js:238-257 (tip); schemas/sessions.json:206-223 has no returns; @types/firefox-webext-browser/index.d.ts:8532
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

#### FF-045. `sessions.getWindowValue`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-platform-system.json` (replace mode)
- **Finding:** upstream uses 'object'; return type 'Promise<string\|object\|undefined>' -> 'Promise<JsonValue\|undefined>'
- **Upstream today:** `function getWindowValue(windowId: number, key: string): Promise<string \| object \| undefined>;`
- **We assert:** `export function getWindowValue(windowId: number, key: string): Promise<JsonValue \| undefined>;`
- **Overload count:** upstream 1, ours 1
- **Adversarial verdict:** CONFIRMED. Same JSON round-trip as getTabValue: 'JSON.parse(JSON.stringify(value))' can yield number/boolean/null, which 'string \| object \| undefined' excludes, and Firefox's schema declares no return type.
- **Evidence:** browser/components/extensions/parent/ext-sessions.js:265-284 (tip); @types/firefox-webext-browser/index.d.ts:8554
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

### missing-overloads (1 items, severity medium)

#### FF-046. `action.openPopup`

- **Kind:** function  |  **Patch source:** `patches/subsystem-*-ui-devtools.json` (replace mode)
- **Finding:** overloads 1 -> 3
- **Upstream today:** `function openPopup(options?: _OpenPopupOptions): Promise<boolean>;`
- **We assert:** `export function openPopup(options?: OpenPopupOptions): Promise<void>; export function openPopup(options: OpenPopupOptions \| undefined, callback: () => void): void; export function openPopup(callback: () => void): void;`
- **Overload count:** upstream 1, ours 3
- **Adversarial verdict:** CONFIRMED. The overload part of the claim is Chrome convergence and is refuted, but the same declaration carries a real defect: Firefox's schema declares openPopup '"async": true' with no return value and MDN states the promise resolves with no arguments, yet upstream types it 'Promise<boolean>' (in both action and browserAction).
- **Evidence:** toolkit/components/extensions/schemas/browser_action.json:483-503 @FIREFOX_143_0_RELEASE and tip:491-511; MDN action/openPopup Return value; @types/firefox-webext-browser/index.d.ts:1060 and 1255
- **Acceptance:** bug filed, URL written into the patch `bug_url` field (HYG-003).

---

## Workstream D. WebKit IDL wiring

**This is the highest-leverage workstream in the plan.**

WebKit PR #71593 (merged 2026-08-15) declared the dictionary and enum types but
did not wire them into the operation signatures. Measured at `WebKit/WebKit@main`:

| Metric | Value |
|---|---|
| IDL files | 37 |
| dictionaries declared | 56 |
| enums declared | 11 |
| operations | 177 |
| operations taking an `any` parameter | 104 |
| dictionaries never referenced by any operation or attribute | 53 |
| dictionaries referenced only from other dictionaries | 3 |
| dictionaries actually wired into an operation signature | **0** |

Example of the exact defect, from `WebExtensionAPICookies.idl`, where the
dictionary is declared directly above the operation that should use it:

```webidl
dictionary WebExtensionCookieDetails {
    DOMString name;
    DOMString storeId;
    DOMString url;
};

[RaisesException] void get([NSDictionary] any details, [Optional, CallbackHandler] function callback);
```

This is why `safari-webextension-types` emits 88 `Record<string, unknown>`. The
generator is faithful to the IDL; the IDL is the gap.

**Suggested PR granularity:** one PR per IDL file, which matches how WebKit
reviewers are assigned and keeps each change reviewable. Below, items are grouped
by file in that order. The candidate dictionary is the one declared in the same
file whose name matches the operation and parameter; where more than one is
plausible the alternatives are listed and a human decision is required.

**Caveat for every item in this workstream:** changing an IDL parameter from
`any` to a dictionary type changes the Cocoa binding layer's validation path, not
just the declaration. Each PR needs the corresponding implementation checked and
the existing WebKit API tests run. Do not treat these as declaration-only edits.

### WebExtensionAPIAction.idl (11 operations)

Dictionaries declared in this file: `WebExtensionActionDetails`, `WebExtensionActionOpenPopupOptions`, `WebExtensionActionSetBadgeBackgroundColorDetails`, `WebExtensionActionSetBadgeTextDetails`, `WebExtensionActionSetIconDetails`, `WebExtensionActionSetPopupDetails`, `WebExtensionActionSetTitleDetails`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-001 | `WebExtensionAPIAction.getTitle` | `details` | `WebExtensionActionDetails` |  |
| WK-002 | `WebExtensionAPIAction.setTitle` | `details` | `WebExtensionActionSetTitleDetails` |  |
| WK-003 | `WebExtensionAPIAction.getBadgeText` | `details` | `WebExtensionActionDetails` |  |
| WK-004 | `WebExtensionAPIAction.setBadgeText` | `details` | `WebExtensionActionSetBadgeTextDetails` |  |
| WK-005 | `WebExtensionAPIAction.getBadgeBackgroundColor` | `details` | `WebExtensionActionDetails` |  |
| WK-006 | `WebExtensionAPIAction.setBadgeBackgroundColor` | `details` | `WebExtensionActionSetBadgeBackgroundColorDetails` |  |
| WK-007 | `WebExtensionAPIAction.isEnabled` | `details` | `WebExtensionActionDetails` |  |
| WK-008 | `WebExtensionAPIAction.setIcon` | `details` | `WebExtensionActionSetIconDetails` |  |
| WK-009 | `WebExtensionAPIAction.setPopup` | `details` | `WebExtensionActionSetPopupDetails` |  |
| WK-010 | `WebExtensionAPIAction.getPopup` | `details` | `WebExtensionActionDetails` |  |
| WK-011 | `WebExtensionAPIAction.openPopup` | `options` | `WebExtensionActionOpenPopupOptions` |  |

### WebExtensionAPIAlarms.idl (1 operations)

Dictionaries declared in this file: `WebExtensionAlarm`, `WebExtensionAlarmCreateInfo`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-012 | `WebExtensionAPIAlarms.create` | `info` | `WebExtensionAlarmCreateInfo` |  |

### WebExtensionAPIBookmarks.idl (5 operations)

Dictionaries declared in this file: `WebExtensionBookmarkChanges`, `WebExtensionBookmarkCreateDetails`, `WebExtensionBookmarkDestination`, `WebExtensionBookmarkSearchQuery`, `WebExtensionBookmarkTreeNode`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-013 | `WebExtensionAPIBookmarks.create` | `bookmark` | `WebExtensionBookmarkChanges`, `WebExtensionBookmarkCreateDetails`, `WebExtensionBookmarkDestination`, `WebExtensionBookmarkSearchQuery`, `WebExtensionBookmarkTreeNode` | no name match; pick one or add a dictionary |
| WK-014 | `WebExtensionAPIBookmarks.get` | `idOrIdList` | `WebExtensionBookmarkChanges`, `WebExtensionBookmarkCreateDetails`, `WebExtensionBookmarkDestination`, `WebExtensionBookmarkSearchQuery`, `WebExtensionBookmarkTreeNode` | no name match; pick one or add a dictionary |
| WK-015 | `WebExtensionAPIBookmarks.search` | `query` | `WebExtensionBookmarkSearchQuery` |  |
| WK-016 | `WebExtensionAPIBookmarks.update` | `changes` | `WebExtensionBookmarkChanges` |  |
| WK-017 | `WebExtensionAPIBookmarks.move` | `destination` | `WebExtensionBookmarkDestination` |  |

### WebExtensionAPICookies.idl (4 operations)

Dictionaries declared in this file: `WebExtensionCookie`, `WebExtensionCookieDetails`, `WebExtensionCookieGetAllDetails`, `WebExtensionCookieSetDetails`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-018 | `WebExtensionAPICookies.get` | `details` | `WebExtensionCookieDetails` |  |
| WK-019 | `WebExtensionAPICookies.getAll` | `details` | `WebExtensionCookieGetAllDetails` |  |
| WK-020 | `WebExtensionAPICookies.set` | `details` | `WebExtensionCookieSetDetails` |  |
| WK-021 | `WebExtensionAPICookies.remove` | `details` | `WebExtensionCookieDetails` |  |

### WebExtensionAPIDOM.idl (1 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-022 | `WebExtensionAPIDOM.openOrClosedShadowRoot` | `element` | (none) | no dictionary declared in this file; one must be added |

### WebExtensionAPIDeclarativeNetRequest.idl (8 operations)

Dictionaries declared in this file: `WebExtensionDNRMatchedRule`, `WebExtensionDNRMatchedRulesFilter`, `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-023 | `WebExtensionAPIDeclarativeNetRequest.updateEnabledRulesets` | `options` | `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions` | ambiguous, pick one |
| WK-024 | `WebExtensionAPIDeclarativeNetRequest.updateDynamicRules` | `options` | `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions` | ambiguous, pick one |
| WK-025 | `WebExtensionAPIDeclarativeNetRequest.getDynamicRules` | `filter` | `WebExtensionDNRMatchedRulesFilter` |  |
| WK-026 | `WebExtensionAPIDeclarativeNetRequest.updateSessionRules` | `options` | `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions` | ambiguous, pick one |
| WK-027 | `WebExtensionAPIDeclarativeNetRequest.getSessionRules` | `filter` | `WebExtensionDNRMatchedRulesFilter` |  |
| WK-028 | `WebExtensionAPIDeclarativeNetRequest.getMatchedRules` | `filter` | `WebExtensionDNRMatchedRulesFilter` |  |
| WK-029 | `WebExtensionAPIDeclarativeNetRequest.isRegexSupported` | `regexOptions` | `WebExtensionDNRMatchedRule`, `WebExtensionDNRMatchedRulesFilter`, `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions` | no name match; pick one or add a dictionary |
| WK-030 | `WebExtensionAPIDeclarativeNetRequest.setExtensionActionOptions` | `options` | `WebExtensionDNRTabUpdateOptions`, `WebExtensionDNRUpdateRuleOptions` | ambiguous, pick one |

### WebExtensionAPIDevToolsInspectedWindow.idl (2 operations)

Dictionaries declared in this file: `WebExtensionDevToolsEvalOptions`, `WebExtensionDevToolsReloadOptions`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-031 | `WebExtensionAPIDevToolsInspectedWindow.eval` | `options` | `WebExtensionDevToolsEvalOptions`, `WebExtensionDevToolsReloadOptions` | ambiguous, pick one |
| WK-032 | `WebExtensionAPIDevToolsInspectedWindow.reload` | `options` | `WebExtensionDevToolsEvalOptions`, `WebExtensionDevToolsReloadOptions` | ambiguous, pick one |

### WebExtensionAPIExtension.idl (1 operations)

Dictionaries declared in this file: `WebExtensionViewFilter`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-033 | `WebExtensionAPIExtension.getViews` | `filter` | `WebExtensionViewFilter` |  |

### WebExtensionAPILocalization.idl (1 operations)

Dictionaries declared in this file: `WebExtensionLanguageDetectionResult`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-034 | `WebExtensionAPILocalization.getMessage` | `substitutions` | `WebExtensionLanguageDetectionResult` |  |

### WebExtensionAPIMenus.idl (3 operations)

Dictionaries declared in this file: `WebExtensionMenuItemProperties`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-035 | `WebExtensionAPIMenus.create` | `properties` | `WebExtensionMenuItemProperties` |  |
| WK-036 | `WebExtensionAPIMenus.update` | `identifier`, `properties` | `WebExtensionMenuItemProperties` |  |
| WK-037 | `WebExtensionAPIMenus.remove` | `identifier` | `WebExtensionMenuItemProperties` |  |

### WebExtensionAPIOffscreen.idl (1 operations)

Dictionaries declared in this file: `WebExtensionOffscreenCreateParameters`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-038 | `WebExtensionAPIOffscreen.createDocument` | `options` | `WebExtensionOffscreenCreateParameters` |  |

### WebExtensionAPIPermissions.idl (3 operations)

Dictionaries declared in this file: `WebExtensionPermissions`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-039 | `WebExtensionAPIPermissions.contains` | `permissions` | `WebExtensionPermissions` |  |
| WK-040 | `WebExtensionAPIPermissions.request` | `permissions` | `WebExtensionPermissions` |  |
| WK-041 | `WebExtensionAPIPermissions.remove` | `permissions` | `WebExtensionPermissions` |  |

### WebExtensionAPIPort.idl (1 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-042 | `WebExtensionAPIPort.postMessage` | `message` | (none) | no dictionary declared in this file; one must be added |

### WebExtensionAPIRuntime.idl (5 operations)

Dictionaries declared in this file: `WebExtensionConnectOptions`, `WebExtensionMessageOptions`, `WebExtensionMessageSender`, `WebExtensionSendMessageOptions`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-043 | `WebExtensionAPIRuntime.getFrameId` | `target` | `WebExtensionConnectOptions`, `WebExtensionMessageOptions`, `WebExtensionMessageSender`, `WebExtensionSendMessageOptions` | no name match; pick one or add a dictionary |
| WK-044 | `WebExtensionAPIRuntime.getDocumentId` | `target` | `WebExtensionConnectOptions`, `WebExtensionMessageOptions`, `WebExtensionMessageSender`, `WebExtensionSendMessageOptions` | no name match; pick one or add a dictionary |
| WK-045 | `WebExtensionAPIRuntime.sendMessage` | `message` | `WebExtensionConnectOptions`, `WebExtensionMessageOptions`, `WebExtensionMessageSender`, `WebExtensionSendMessageOptions` | no name match; pick one or add a dictionary |
| WK-046 | `WebExtensionAPIRuntime.connect` | `options` | `WebExtensionConnectOptions` |  |
| WK-047 | `WebExtensionAPIRuntime.sendNativeMessage` | `message` | `WebExtensionConnectOptions`, `WebExtensionMessageOptions`, `WebExtensionMessageSender`, `WebExtensionSendMessageOptions` | no name match; pick one or add a dictionary |

### WebExtensionAPIScripting.idl (5 operations)

Dictionaries declared in this file: `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-048 | `WebExtensionAPIScripting.executeScript` | `details` | `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget` | no name match; pick one or add a dictionary |
| WK-049 | `WebExtensionAPIScripting.insertCSS` | `details` | `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget` | no name match; pick one or add a dictionary |
| WK-050 | `WebExtensionAPIScripting.removeCSS` | `details` | `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget` | no name match; pick one or add a dictionary |
| WK-051 | `WebExtensionAPIScripting.getRegisteredContentScripts` | `filter` | `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget` | no name match; pick one or add a dictionary |
| WK-052 | `WebExtensionAPIScripting.unregisterContentScripts` | `filter` | `WebExtensionCSSInjection`, `WebExtensionScriptInjection`, `WebExtensionScriptInjectionTarget` | no name match; pick one or add a dictionary |

### WebExtensionAPISidePanel.idl (4 operations)

Dictionaries declared in this file: `WebExtensionSidePanelBehavior`, `WebExtensionSidePanelOptions`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-053 | `WebExtensionAPISidePanel.getOptions` | `options` | `WebExtensionSidePanelOptions` |  |
| WK-054 | `WebExtensionAPISidePanel.setOptions` | `options` | `WebExtensionSidePanelOptions` |  |
| WK-055 | `WebExtensionAPISidePanel.setPanelBehavior` | `behavior` | `WebExtensionSidePanelBehavior` |  |
| WK-056 | `WebExtensionAPISidePanel.open` | `options` | `WebExtensionSidePanelOptions` |  |

### WebExtensionAPISidebarAction.idl (6 operations)

Dictionaries declared in this file: `WebExtensionSidebarActionDetails`, `WebExtensionSidebarActionSetIconDetails`, `WebExtensionSidebarActionSetPanelDetails`, `WebExtensionSidebarActionSetTitleDetails`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-057 | `WebExtensionAPISidebarAction.isOpen` | `details` | `WebExtensionSidebarActionDetails` |  |
| WK-058 | `WebExtensionAPISidebarAction.getPanel` | `details` | `WebExtensionSidebarActionDetails` |  |
| WK-059 | `WebExtensionAPISidebarAction.setPanel` | `details` | `WebExtensionSidebarActionSetPanelDetails` |  |
| WK-060 | `WebExtensionAPISidebarAction.getTitle` | `details` | `WebExtensionSidebarActionDetails` |  |
| WK-061 | `WebExtensionAPISidebarAction.setTitle` | `details` | `WebExtensionSidebarActionSetTitleDetails` |  |
| WK-062 | `WebExtensionAPISidebarAction.setIcon` | `details` | `WebExtensionSidebarActionSetIconDetails` |  |

### WebExtensionAPIStorageArea.idl (5 operations)

Dictionaries declared in this file: `WebExtensionStorageAccessOptions`, `WebExtensionStorageChange`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-063 | `WebExtensionAPIStorageArea.get` | `items` | `WebExtensionStorageAccessOptions`, `WebExtensionStorageChange` | no name match; pick one or add a dictionary |
| WK-064 | `WebExtensionAPIStorageArea.getBytesInUse` | `keys` | `WebExtensionStorageAccessOptions`, `WebExtensionStorageChange` | no name match; pick one or add a dictionary |
| WK-065 | `WebExtensionAPIStorageArea.set` | `items` | `WebExtensionStorageAccessOptions`, `WebExtensionStorageChange` | no name match; pick one or add a dictionary |
| WK-066 | `WebExtensionAPIStorageArea.remove` | `keys` | `WebExtensionStorageAccessOptions`, `WebExtensionStorageChange` | no name match; pick one or add a dictionary |
| WK-067 | `WebExtensionAPIStorageArea.setAccessLevel` | `accessOptions` | `WebExtensionStorageAccessOptions` |  |

### WebExtensionAPITabs.idl (13 operations)

Dictionaries declared in this file: `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-068 | `WebExtensionAPITabs.create` | `properties` | `WebExtensionTabCreateProperties` |  |
| WK-069 | `WebExtensionAPITabs.query` | `info` | `WebExtensionTabMutedInfo` |  |
| WK-070 | `WebExtensionAPITabs.duplicate` | `properties` | `WebExtensionTabCreateProperties` |  |
| WK-071 | `WebExtensionAPITabs.update` | `properties` | `WebExtensionTabCreateProperties` |  |
| WK-072 | `WebExtensionAPITabs.move` | `tabIDs`, `properties` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-073 | `WebExtensionAPITabs.remove` | `tabIDs` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-074 | `WebExtensionAPITabs.reload` | `properties` | `WebExtensionTabCreateProperties` |  |
| WK-075 | `WebExtensionAPITabs.captureVisibleTab` | `options` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-076 | `WebExtensionAPITabs.executeScript` | `details` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-077 | `WebExtensionAPITabs.insertCSS` | `details` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-078 | `WebExtensionAPITabs.removeCSS` | `details` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-079 | `WebExtensionAPITabs.sendMessage` | `message` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |
| WK-080 | `WebExtensionAPITabs.connect` | `options` | `WebExtensionTab`, `WebExtensionTabCreateProperties`, `WebExtensionTabMutedInfo` | no name match; pick one or add a dictionary |

### WebExtensionAPITest.idl (11 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-081 | `WebExtensionAPITest.sendMessage` | `argument` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-082 | `WebExtensionAPITest.runWithUserGesture` | `function` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-083 | `WebExtensionAPITest.log` | `message` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-084 | `WebExtensionAPITest.assertDeepEq` | `actualValue`, `expectedValue` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-085 | `WebExtensionAPITest.assertEq` | `actualValue`, `expectedValue` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-086 | `WebExtensionAPITest.assertRejects` | `promise` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-087 | `WebExtensionAPITest.assertResolves` | `promise` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-088 | `WebExtensionAPITest.assertThrows` | `function` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-089 | `WebExtensionAPITest.assertSafe` | `function` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-090 | `WebExtensionAPITest.assertSafeResolve` | `function` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |
| WK-091 | `WebExtensionAPITest.addTest` | `function` | (none) | no dictionary declared in this file; one must be added; moot if SWT-002 drops the test namespace |

### WebExtensionAPIWebNavigation.idl (2 operations)

Dictionaries declared in this file: `WebExtensionWebNavigationGetAllFramesDetails`, `WebExtensionWebNavigationGetFrameDetails`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-092 | `WebExtensionAPIWebNavigation.getFrame` | `details` | `WebExtensionWebNavigationGetFrameDetails` |  |
| WK-093 | `WebExtensionAPIWebNavigation.getAllFrames` | `details` | `WebExtensionWebNavigationGetAllFramesDetails` |  |

### WebExtensionAPIWebNavigationEvent.idl (1 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-094 | `WebExtensionAPIWebNavigationEvent.addListener` | `filter` | (none) | no dictionary declared in this file; one must be added |

### WebExtensionAPIWebPageRuntime.idl (2 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-095 | `WebExtensionAPIWebPageRuntime.sendMessage` | `message` | (none) | no dictionary declared in this file; one must be added |
| WK-096 | `WebExtensionAPIWebPageRuntime.connect` | `options` | (none) | no dictionary declared in this file; one must be added |

### WebExtensionAPIWebRequestEvent.idl (1 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-097 | `WebExtensionAPIWebRequestEvent.addListener` | `filter` | (none) | no dictionary declared in this file; one must be added |

### WebExtensionAPIWindows.idl (6 operations)

Dictionaries declared in this file: `WebExtensionWindow`, `WebExtensionWindowCreateData`, `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo`

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-098 | `WebExtensionAPIWindows.create` | `info` | `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | ambiguous, pick one |
| WK-099 | `WebExtensionAPIWindows.get` | `properties` | `WebExtensionWindow`, `WebExtensionWindowCreateData`, `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | no name match; pick one or add a dictionary |
| WK-100 | `WebExtensionAPIWindows.getCurrent` | `info` | `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | ambiguous, pick one |
| WK-101 | `WebExtensionAPIWindows.getLastFocused` | `info` | `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | ambiguous, pick one |
| WK-102 | `WebExtensionAPIWindows.getAll` | `info` | `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | ambiguous, pick one |
| WK-103 | `WebExtensionAPIWindows.update` | `properties` | `WebExtensionWindow`, `WebExtensionWindowCreateData`, `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo` | no name match; pick one or add a dictionary |

### WebExtensionAPIWindowsEvent.idl (1 operations)

| ID | Operation | `any` parameter(s) | Candidate dictionary | Note |
|---|---|---|---|---|
| WK-104 | `WebExtensionAPIWindowsEvent.addListener` | `filter` | (none) | no dictionary declared in this file; one must be added |

### WK-ORPHAN. Dictionaries currently unreferenced (53)

Every one of these should end up referenced by the operations above. If any
cannot be, that dictionary is either misnamed or should not have landed, and
that is worth raising on the original PR thread.

- `WebExtensionActionDetails`, `WebExtensionActionOpenPopupOptions`, `WebExtensionActionSetBadgeBackgroundColorDetails`
- `WebExtensionActionSetBadgeTextDetails`, `WebExtensionActionSetIconDetails`, `WebExtensionActionSetPopupDetails`
- `WebExtensionActionSetTitleDetails`, `WebExtensionAlarm`, `WebExtensionAlarmCreateInfo`
- `WebExtensionBookmarkChanges`, `WebExtensionBookmarkCreateDetails`, `WebExtensionBookmarkDestination`
- `WebExtensionBookmarkSearchQuery`, `WebExtensionBookmarkTreeNode`, `WebExtensionCSSInjection`
- `WebExtensionCommand`, `WebExtensionConnectOptions`, `WebExtensionCookie`
- `WebExtensionCookieDetails`, `WebExtensionCookieGetAllDetails`, `WebExtensionCookieSetDetails`
- `WebExtensionDNRMatchedRule`, `WebExtensionDNRMatchedRulesFilter`, `WebExtensionDNRTabUpdateOptions`
- `WebExtensionDNRUpdateRuleOptions`, `WebExtensionDevToolsEvalOptions`, `WebExtensionDevToolsReloadOptions`
- `WebExtensionLanguageDetectionResult`, `WebExtensionMenuItemProperties`, `WebExtensionMessageOptions`
- `WebExtensionMessageSender`, `WebExtensionOffscreenCreateParameters`, `WebExtensionPermissions`
- `WebExtensionScriptInjection`, `WebExtensionSendMessageOptions`, `WebExtensionSidePanelBehavior`
- `WebExtensionSidePanelOptions`, `WebExtensionSidebarActionDetails`, `WebExtensionSidebarActionSetIconDetails`
- `WebExtensionSidebarActionSetPanelDetails`, `WebExtensionSidebarActionSetTitleDetails`, `WebExtensionStorageAccessOptions`
- `WebExtensionStorageChange`, `WebExtensionTabCreateProperties`, `WebExtensionViewFilter`
- `WebExtensionWebNavigationGetAllFramesDetails`, `WebExtensionWebNavigationGetFrameDetails`, `WebExtensionWebRequestDetails`
- `WebExtensionWebRequestFilter`, `WebExtensionWindow`, `WebExtensionWindowCreateData`
- `WebExtensionWindowGetInfo`, `WebExtensionWindowUpdateInfo`

Referenced only from other dictionaries, so reachable but not from any operation: `WebExtensionScriptInjectionTarget`, `WebExtensionTab`, `WebExtensionTabMutedInfo`.

---

## Workstream E. safari-webextension-types repository

### SWT-001. Remove the dead PR-71593 fallback

- **File:** `scripts/generate.py`, `fetch_from_pr()` around line 195.
- **Problem:** a hardcoded fallback to
  `patrickkettner/WebKit@webextension-idl-declarations` fires when the GitHub API
  lookup fails for PR 71593 specifically. The PR is merged; if that head branch is
  deleted the fallback will fail confusingly, and worse, it can silently produce
  stale output that looks successful.
- **Acceptance:** fallback removed, failure to resolve a PR raises.

### SWT-002. Drop the `test` namespace from shipped output

- **Files:** `scripts/generate.py` (`KNOWN_IDL_FILES`), `index.d.ts`.
- **Problem:** `WebExtensionAPITest.idl` is a WebKit-internal test harness. It
  produces a `test` namespace in a public type package, advertising an API that
  extension authors must not use.
- **Note:** BCD reports no Safari support for `test`, which corroborates this.
- **Acceptance:** no `test` namespace in `index.d.ts`; the IDL is either excluded
  or explicitly filtered.

### SWT-003. Verify the six namespaces BCD disputes

- **Problem:** the IDL produces `bookmarks`, `notifications`, `offscreen`,
  `sidePanel`, `sidebarAction`, `test`, but BCD reports no Safari support for any
  of them.
- **Action:** check each in a real Safari build. Each resolves to one of: a BCD
  bug to file at mdn/browser-compat-data, a WebKit IDL that describes an
  unshipped API, or a genuine gap in BCD coverage.
- **Acceptance:** each of the six classified, with evidence. See BCD-* items.

### SWT-004. Explain the three namespaces BCD has that the IDL does not

- **Problem:** BCD reports Safari support for `browserAction`, `pageAction` and
  `extensionTypes`, none of which exist as WebKit interfaces.
- **Partly explained:** `browserAction` and `pageAction` are aliased to `action`
  in the generated `chrome` namespace, so they exist at runtime.
- **Unexplained:** `extensionTypes`. Determine where Safari's `extensionTypes`
  surface comes from, since it is not in the Interfaces directory.
- **Acceptance:** written explanation for all three.

### SWT-005. Add a regression test pinning generator output

- **Problem:** CI runs `npm run build` but does not assert that the regenerated
  `index.d.ts` matches the committed one, so drift between the committed file and
  upstream WebKit can go unnoticed.
- **Fix:** after `npm run build`, fail if `git diff --exit-code index.d.ts` is dirty.
- **Acceptance:** CI fails when committed output is stale.
- **Note:** verified today that committed output IS current (md5
  `66cd9244686a64365214b8e0b817deb7`, identical from main and from `--pr 71593`).

### SWT-006. Publish decision

- **Problem:** `package.json` is at version `0.1.0` and the package is not on npm.
  `webext-meta-types` will need to consume it somehow.
- **Options:** publish to npm, consume as a git dependency, or vendor the
  generated `index.d.ts` into `webext-meta-types`.
- **Blocks:** INT-030.
- **Acceptance:** decision made and dependency wired.

### SWT-007. `cookies.remove()` result is typed as `Cookie`, upstream says otherwise

- **Found:** 2026-09-02 by the CAN-002 derivation, which refused to merge the
  result slot because Safari alone puts `Cookie` there.
- **Evidence:** `safari-webextension-types` `index.d.ts:722-723` resolve `remove()`
  to `browser.Cookie | null`. chrome-types `index.d.ts:4183` resolves it to
  `{ url, name, storeId, partitionKey? }`; Firefox `index.d.ts:1997` to
  `_RemoveReturnDetails` (`:1930`, the same record plus `firstPartyDomain`).
  `WebExtensionAPICookies.idl:85` declares no result type at all, so the
  `Cookie` is the generator's choice, not WebKit's.
- **Fix:** find where the Safari generator assigns the result type for `remove`
  and check WebKit's implementation for what it actually resolves with; the
  IDL cannot settle it. Until then the meta package carries a curated
  `distinct` verdict in `canonical-names-curated.json`.
- **Acceptance:** the Safari package resolves `remove()` to what WebKit returns,
  with the WebKit source cited, and the curated verdict is deleted.

### SWT-008. Never claim Safari ships what only WebKit tip has

- **Decided 2026-09-02.** The Safari types are generated from a WebKit commit
  (today `0136fa2b`, 2026-08-15, in `provenance.json`). Safari ships from a
  branch cut earlier, so every `@supported Safari` is a claim about tip until
  proven otherwise. The bar Patrick set: a claim must hold in the current
  Safari Technology Preview or an older shipping Safari. Nothing newer.
- **Gate, layer 1 (necessary, not sufficient):** record the WebKit commit the
  current Technology Preview was cut from as `stp_ref` in `provenance.json`,
  with the release-notes URL that states it, and fail generation when the
  generation ref is not an ancestor of it (`git merge-base --is-ancestor
  <ref> <stp_ref>`). Bumping the ref means bumping `stp_ref` first. This
  only proves the code was in the tree Safari was built from.
- **Confirmed 2026-09-02:** the release notes state the range. Technology
  Preview 250 (webkit.org/blog/18191, 2026-08-13) says "This release includes
  WebKit changes between: 317507@main…317934@main". An identifier resolves
  locally with `git log --grep 'Canonical link: https://commits.webkit.org/317934@main'`,
  giving `41655c48` (2026-07-26), and commits.webkit.org redirects to the same
  hash. The `WebKit-7624.*` tags and `safari-7624.*-branch` branches carry no
  marketing version and are not needed.
- **Finding:** `git merge-base --is-ancestor 0136fa2b 41655c48` exits 1. The
  current generation ref is twenty days NEWER than Technology Preview 250's
  upper bound, so today's Safari types claim WebKit tip, not any Safari.
- **Regenerating at `41655c48` is not a knob.** `generate.py` pins
  `KNOWN_IDL_FILES` (line 48) and re-verifies 485 `Cite(...)` quotes against
  the exact source at the ref; at `41655c48` it refuses on
  `WebExtensionAPIOffscreen.idl` (added `1d214176`, 2026-08-07), and with the
  offscreen tables trimmed it fails on citations into files moved in the
  window (55 files changed under `WebProcess/Extensions`). So the package's
  ref must BE the Technology Preview commit, and each preview bump is an
  editorial re-verification, not a flag. Confirmed over-claim today: the
  whole `offscreen` namespace (`index.d.ts:147`, `:363`, `:811-818`, `:1105`),
  which no Safari build has and only the meta package's exclusion hides.
- **Gate, layer 2 (gating after the cut), enumerated 2026-09-02 at `41655c48`:**
  a namespace in source is exposed only if `isPropertyAllowed`
  (`WebExtensionAPINamespaceCocoa.mm:47-108`) and the build allow it.
  Mechanically derivable: `sidebarAction`, `sidePanel`, `bookmarks` are
  compiled out (`PlatformEnableCocoa.h:1085-1091` defines their macros as
  `0 &&`, preferences default false); `notifications` and `test` exist only
  in testing mode (`:78-84`, `:102-103`); `devtools` is Mac only
  (`INSPECTOR_EXTENSIONS`, `PlatformEnableCocoa.h:439-441`); everything
  else is a manifest permission check, which is not a support claim.
  `offscreen` is absent from the tree entirely at that commit; it arrived
  between 2026-07-26 and 2026-08-15, and only `excluded-namespaces.json`
  keeps it out of the output today.
- **What source cannot resolve:** an Apple-internal build setting behind an
  `#if !defined` macro, testing mode in a shipped Safari, and the per-context
  deny list `m_unsupportedAPIs` (`WebExtensionAPINamespaceCocoa.mm:50`),
  filled from outside the tree. The first two can only make Safari expose
  MORE than source says; the deny list is the one thing that can make it
  expose less. So: source-off means excluded, which can only under-claim;
  the runtime probe exists to bound the deny list, nothing else.
- **Work:** `derive-excluded-namespaces.ts` reads `isPropertyAllowed`, the
  macro definitions and the preference defaults at `stp_ref` and emits
  `excluded-namespaces.json` in its existing cited style, replacing the
  hand-curated file, with `--verify` like `derive-unsupported.ts`.
- **Second opinion, cheap:** extend `audit:bcd` to compare BCD's per-member
  `version_added` for `safari` and `safari_ios` against the emitted claims;
  it already flags seven disagreements, six in `devtools.inspectedWindow`.
- **Runtime probe, now a RELEASE GATE (Patrick, 2026-09-02 evening):** v1.1.2
  does not ship until `@supported Safari` claims are checked against a
  running Safari Technology Preview on the Mac mini (Safari 26.4, Xcode
  26.6, the extension converter, safaridriver). A converted extension's
  background script enumerates `browser.*` (namespaces, member types, events)
  and writes JSON to an extension page safaridriver reads; the diff against
  dist/index.d.ts is the audit. What it can observe: presence. What it
  cannot: parameter shapes and optionality; those stay source claims and
  the notes say so. Findings become cited `excluded-namespaces.json` entries.
- **Acceptance:** generation refuses a ref newer than the recorded
  Technology Preview commit; `excluded-namespaces.json` is derived, not
  written, and `--verify` passes; the BCD audit reports version
  disagreements; the probe's deny-list findings, if any, are cited entries.

### SWT-009. Safari's package must not emit what WebKit hides under MV3

- **Found 2026-09-02** by the runtime audit on the Mac mini (Safari 26.4 and
  a Technology Preview build): 26 members the meta package tagged Safari
  are unreachable from any Manifest V3 extension. WebKit gates them by
  manifest version: `browserAction` and `pageAction` in
  `WebExtensionAPINamespace.cpp:90-91` and `:109-110`
  (`!supportsManifestVersion(3) && doesDictionaryExist(...)`), the
  `removedInManifestVersion3` set of `tabs.executeScript`, `getSelected`,
  `insertCSS`, `removeCSS` in `WebExtensionAPITabsCocoa.mm:577-579`, and
  `extension.getURL` in `WebExtensionAPIExtensionCocoa.mm:91-92`, all at the
  package's generation ref `0136fa2b`.
- **How they reach dist:** 21 through `applyNamespaceAliases` copying `action`
  onto `browserAction`/`pageAction` because the Safari package aliases them
  (`index.d.ts:1104`, `:1109`); 5 as direct Safari declarations. The Safari
  package carries no manifest-version signal anywhere.
- **Ruled (Patrick, 2026-09-02):** the fix lives upstream in
  `safari-webextension-types`, whose generator reads the same three gates
  and stops emitting MV2-only names; this repo then repins it. A finished
  derived-exclusion implementation in this repo was discarded unmerged: a
  WebKit-versus-package delta belongs in the package, only cross-browser
  reconciliation belongs here. `tabs.move` was already excluded here with a
  citation; the audit's claim that it is new in the preview was wrong.
- **Acceptance:** the repinned Safari package emits none of the 26; the meta
  package's `dist/metadata.json` claims Safari for none of them; the union
  ratchet drops by two (`browserAction.onClicked`, `pageAction.onClicked`).

---

## Workstream F. Safari integration into webext-meta-types

### What we are integrating

| Metric | Value |
|---|---|
| total declarations | 464 |
| inside a namespace | 391 |
| at the top level of `browser` | 73 |
| namespaces | 25 |
| `any` occurrences | 0 |
| Promise signatures | 136 |
| callback signatures | 170 |

Namespaces shared with Chrome/Firefox: 24. 
Safari-only: test 
(and `test` should be dropped per SWT-002, leaving zero).
Present in Chrome/Firefox but not Safari: 98.

So Safari adds almost no new API surface. It adds availability information and
a third set of signatures to reconcile.

### The pairwise-to-N-ary problem

Every merge path in `src/generator.ts` assumes exactly two browsers:

| Symbol | Occurrences in `src/generator.ts` |
|---|---|
| `chromeSource` | 32 |
| `firefoxSource` | 27 |
| `overrideChrome` / `overrideFirefox` | 16 / 16 |
| `isChromeOnly` / `isFirefoxOnly` | 8 / 8 |
| `chromeTypeParamsCount` / `firefoxTypeParamsCount` | 7 / 7 |
| `"chrome"` / `"firefox"` string literals | 20 / 14 |
| `Provenance` | 12 |

45 lines directly touch `chromeSource`/`firefoxSource`. All five merge functions
are written as `const c = ...; const f = ...;`.

### INT-001. Change `Provenance` from a string union to a browser set

- **File:** `src/generator.ts` line 415.
- **Today:** `export type Provenance = "Chrome" | "Firefox" | "Chrome, Firefox";`
- **Problem:** three browsers gives 7 non-empty combinations, four gives 15. A string union does not scale and every combination is a distinct literal.
- **Fix:** a `Set<BrowserId>` or a bitmask, plus a formatter that renders the display string.
- **Acceptance:** with only Chrome and Firefox loaded, `dist/index.d.ts` is byte-identical to today.

### INT-002. Update `formatSupportComment()` for the new provenance type

- **File:** `src/generator.ts` line 445.
- **Note:** the `@see <url>` path for real bug URLs must be preserved (HYG-003).
- **Acceptance:** byte-identical output with two browsers.

### INT-003. Update `keptForTarget()` for N targets

- **File:** `src/generator.ts` line 439.
- **Today:** hardcodes `target === "chrome" ? p === "Chrome" : p === "Firefox"`.
- **Fix:** membership test against the provenance set.
- **Acceptance:** `dist/chrome-only.d.ts` byte-identical.

### INT-004. Update `MetaEntry` and `dist/metadata.json` shape

- **File:** `src/generator.ts` lines 426 and the metadata block in `generate()`.
- **Today:** maps the three provenance literals to `["chrome"]`, `["firefox"]`, or both.
- **Fix:** emit the browser id list directly from the set.
- **Decision needed:** whether `metadata.json` gains a `safari_ios` qualifier here or in a separate field (see INT-034).
- **Acceptance:** byte-identical `metadata.json` with two browsers.

### INT-010. Replace `IRElement`'s per-browser fields with a map

- **File:** `src/generator.ts` line 18.
- **Today:** `chromeSource`, `firefoxSource`, `isChromeOnly`, `isFirefoxOnly`, `chromeTypeParamsCount`, `firefoxTypeParamsCount`.
- **Fix:** `sources: Map<BrowserId, string>` plus `typeParamsCount: Map<BrowserId, number>`; derive the `*Only` flags rather than storing them.
- **Acceptance:** byte-identical output with two browsers.

### INT-011. Convert `mergeInterface()` to an N-ary fold

- **File:** `src/generator.ts` line 600.
- **Today:** `const c = parseInterface(el.chromeSource); const f = parseInterface(el.firefoxSource);`
- **Also affects:** `unionMember()`, `unionIndexSignature()`, `makeOptional()`, `stripOptionalMarker()`, all currently binary.
- **Acceptance:** byte-identical output with two browsers.

### INT-012. Convert `mergeTypeAlias()` to an N-ary fold

- **File:** `src/generator.ts` line 735.
- **Acceptance:** byte-identical output with two browsers.

### INT-013. Convert `mergeVariable()` to an N-ary fold

- **File:** `src/generator.ts` line 810.
- **Acceptance:** byte-identical output with two browsers.

### INT-014. Convert `mergeFunction()` to an N-ary fold

- **File:** `src/generator.ts` line 858.
- **Risk:** highest of the five. Three-way overload sets with different async conventions (Safari ships both callback and Promise forms, Firefox is Promise-first) will multiply overload counts.
- **Acceptance:** byte-identical output with two browsers.

### INT-015. Convert `reconcileStructuralForms()` to N browsers

- **File:** `src/generator.ts` line 924.
- **Note:** this is Decision 14's home and where INT-020 will land.
- **Acceptance:** byte-identical output with two browsers.

### INT-016. Extend the patch schema with `overrideSafari`

- **File:** `src/generator.ts` `validatePatch()` line 107 and `applyPatches()` line 325.
- **Note:** `overrideShared` already exists and fans out to both browsers; decide whether it should now fan out to all three, which silently changes the meaning of every existing patch that uses it. Audit those first.
- **Acceptance:** schema accepts `overrideSafari`; existing patches behave unchanged.

### INT-020. Reconcile Safari's interface-plus-instance devtools shape

- **Problem:** Safari emits `interface InspectedWindow { ... }` plus `const inspectedWindow: InspectedWindow`, in two merged `namespace devtools` blocks. Chrome and Firefox use real sub-namespaces (`devtools.inspectedWindow.eval()`).
- **Consumer impact:** call syntax is identical, declarations are not mergeable as written.
- **Affects:** `devtools.inspectedWindow`, `devtools.network`, `devtools.panels`.
- **Fix:** extend `reconcileStructuralForms()` to normalize the instance-of-interface form into a namespace form.
- **Acceptance:** the three devtools sub-APIs merge without a `MergeIssue`.

### INT-021. Decide the canonical event wrapper type

- **Problem:** Safari declares `Event<T extends (...args: never[]) => void>`. Our preamble uses `(...args: any[]) => any` for both `CustomChromeEvent` and `WebExtEvent`, with a TODO recording that TypeScript's contravariance rule (TS2344) forces `any[]`.
- **`never[]` and `any[]` are opposite ends of that variance**, so a naive union of three event wrappers will not typecheck.
- **File:** `src/preamble.ts`, plus `canonicalizeSignature()` which already rewrites `events.Event<` and `WebExtEvent<` to a common `Event<`.
- **Acceptance:** a documented decision and a type test proving all three forms assign.

### INT-022. Add the widening guard for weakly typed Safari parameters

- **Problem:** Safari contributes 88 `Record<string, unknown>` occurrences, covering the 104 operations in workstream D. Without a guard, merging can widen a precise Chrome or Firefox parameter to `Record<string, unknown>`.
- **Rule:** a Safari `Record<string, unknown>` or bare `unknown` parameter never widens a precise type from another browser. It contributes availability information only.
- **This rule is needed permanently**, not just until workstream D lands, because Safari will always have weakly typed corners.
- **Acceptance:** a unit test asserting that merging a precise Chrome parameter with a Safari `Record<string, unknown>` yields the precise type.

### INT-023. Decide how Safari's own namespace aliases interact with Decision 20

- **Problem:** Safari's package aliases `contextMenus` to `menus`, and both `browserAction` and `pageAction` to `action` (safari-webextension-types `index.d.ts:1090-1117`). Decision 20 emits one canonical set under `chrome` and aliases `browser` to it.
- **Facts (2026-09-02):** chrome-types declares only `contextMenus` (`index.d.ts:3356`); `chrome.menus` is undefined in Chrome. Firefox declares `menus` (`:7903`) and `contextMenus` (`:7624`) as identical 24-name namespaces, and its `chrome.*` is an alias of `browser.*`. BCD has one entry, `webextensions.api.menus`, with `contextMenus` as `alternative_name` for Chrome and Safari. dist emits five full namespaces; `contextMenus.create` already carries `CreateProperties` (Chrome) beside `menus.MenuItemProperties` (Firefox, Safari).
- **Ruled (Patrick, 2026-09-02):** a namespace is never aliased in the output unless every browser exposes both names at runtime. Aliasing `menus` to `contextMenus` would let `chrome.menus.create()` typecheck as supported everywhere and throw in Chrome, the one failure this package exists to prevent. `browser = chrome` is different: both objects exist in all three browsers. So `menus`, `browserAction` and `pageAction` stay separate namespaces with their own `@supported`.
- **Naming is a separate axis.** One name per concept is chosen ACROSS the alias group, Chrome public name first (CAN-001), so `menus` declares `CreateProperties` with its own Firefox, Safari tag. Alias groups are derived from Safari's `export import` lines, not curated: {`contextMenus`, `menus`}, {`action`, `browserAction`, `pageAction`}.
- **Work:** `derive-names.ts` gains alias-group scoping for name selection; the `menus` `defer` verdict is removed; Decision 20's comment in `src/generator.ts` gains the runtime-availability condition.
- **Acceptance:** `menus` and `contextMenus` share every concept's name; `@supported` on `menus` never names Chrome; `verify:names` passes.

### INT-030. Ingest safari-webextension-types into the IR

- **Depends on:** INT-016, INT-R-*, SWT-006.
- **File:** `src/generator.ts` `generate()` line 1126.
- **Note:** Safari's file declares `declare namespace browser` and a separate `declare namespace chrome` alias block. `parseSource()` already special-cases a `browser` module for Firefox; verify that path works for Safari's shape or add a third branch.
- **Acceptance:** Safari elements present in the IR with correct namespaces.

### INT-031. Add `safari` to the coverage manifest

- **Files:** `shared/coverage-types.ts` (`CoverageElement`, `CoverageNamespace` have literal `chrome: boolean; firefox: boolean`), `scripts/generate-coverage.ts`, and the regenerated 236KB `coverage.json`.
- **Acceptance:** coverage carries per-browser booleans for three browsers.

### INT-032. Add `safari` and `safari_ios` to the BCD audit

- **File:** `scripts/audit-bcd.ts`, which hardcodes `support.chrome` and `support.firefox` in four conflict checks.
- **Acceptance:** `BCD-DISCREPANCIES.md` reports Safari conflicts too.

### INT-033. Add Safari build targets

- **File:** `src/generator.ts` `generate()`; today it emits `dist/index.d.ts` and `dist/chrome-only.d.ts`.
- **Fix:** add `dist/safari-only.d.ts`, and consider `dist/firefox-only.d.ts` for symmetry since the target-pruning code already supports it.
- **Acceptance:** target-pruned builds exist and typecheck.

### INT-034. Model Safari iOS as a modifier, not a browser column

- **Evidence:** BCD shows Safari supports 22 namespaces and Safari iOS 20, differing only in `devtools` and `menus`. At member granularity: 228 versus 210, with just 18 members diverging.
- **The 18:** `devtools.inspectedWindow`, `devtools.network`, `devtools.panels`, `menus.ACTION_MENU_TOP_LEVEL_LIMIT`, `menus.ContextType`, `menus.ItemType`, `menus.OnClickData`, `menus.create`, `menus.onClicked`, `menus.remove`, `menus.removeAll`, `menus.update`, `tabs.MutedInfo`, `windows.WindowState`, `windows.create`, `windows.onRemoved`, `windows.remove`, `windows.update`. All are macOS-only.
- **Rationale:** 18 exceptions do not justify doubling the provenance space from 7 to 15, and the WebIDL carries no iOS information at all, so an iOS column would be sourced entirely from BCD anyway.
- **Fix:** an iOS exclusion list sourced from BCD, surfaced in `metadata.json` and as an `@supported` note.
- **Acceptance:** the 18 members carry an explicit macOS-only marker.

### INT-035. Regenerate the type tests for three browsers

- **Files:** `tests/index.test-d.ts` (3693 lines) and `type-tests/index.test-d.ts` (2265 lines), both generated one assertion pair per element.
- **Question:** does a third browser mean a third assertion per element, or does Decision 20's single canonical set keep it at two? Decision 20 says every element is reachable from both `chrome` and `browser`, which suggests two remains correct.
- **Acceptance:** `npm run test` (tsd) passes.

### INT-036. Update the unit tests, including the Decision 16 convergence invariant

- **File:** `test/generator.test.ts`, 346 lines, 39 tests.
- **Specific problem:** the 'Convergence CI Invariant (Decision 16)' suite asserts substantial `@supported Chrome, Firefox` convergence (more than 100). Adding Safari changes many of those annotations to three-browser strings, so the assertion will need to count differently.
- **Acceptance:** all tests pass and the convergence invariant still means something.

### INT-037. Carry the release channel into the emitted support annotation

- **Problem:** chrome-types marks six namespaces `@chrome-channel dev` on their own doc block (`dns`, `processes`, `sockets.tcp`, `sockets.tcpServer`, `sockets.udp`, `system.network`; BCD records `dns` as Chrome `preview`). The emitted output tags every member of them `@supported Chrome` with no qualifier, so a reader sees Chrome support asserted for an API Chrome does not ship to stable, next to CAN-001, which says exactly that Chrome does not ship it.
- **Fix:** read the tag where `derive-names.ts` already reads it and emit it on the `@note` line (`@note Chrome: dev channel only`), or decide that a dev-channel API is not support and exclude it like an unsupported member. Either way the output and the naming rule must agree.
- **Ruled (Patrick, 2026-09-02):** keep the tag and add the channel note, derived from the chrome-types tag, never listed by hand: `@note Chrome: dev channel only` on the namespace and every member, plus a channel field in `metadata.json`. Rule 9 does not decide it (a running Chrome Dev exposes these); CAN-001 uses stable as the bar for naming votes only. Marked as a WECG discussion item: whether a cross-browser type set should carry channel-gated APIs at all is a question for the group, not this package.
- **Acceptance:** no member of a dev-channel namespace claims Chrome support without saying which channel; a unit test pins it.

### INT-R-*. Relocation map: 73 top-level Safari declarations

WebKit's IDL declares dictionaries at file scope, so the generator emits them at
the top level of `browser` (`browser.Cookie`, `browser.Tab`). Chrome and Firefox
nest them (`cookies.Cookie`, `tabs.Tab`). Every one needs a target namespace.

**The automatic column below is a draft, not an answer.** It is a name match
against the Chrome and Firefox IR. At least one is known wrong: `MessageOptions`
matches `systemLog` by name but comes from `WebExtensionAPIRuntime.idl` and
belongs in `runtime`. Review every row against the source IDL file.

| ID | Safari declaration | Kind | Suggested target | Verdict |
|---|---|---|---|---|
| INT-R-001 | `ActionDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-002 | `ActionOpenPopupOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-003 | `ActionSetBadgeBackgroundColorDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-004 | `ActionSetBadgeTextDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-005 | `ActionSetIconDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-006 | `ActionSetPopupDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-007 | `ActionSetTitleDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-008 | `Alarm` | interface | `alarms` | relocate to 'alarms' |
| INT-R-009 | `AlarmCreateInfo` | interface | `alarms` | relocate to 'alarms' (chrome-only name) |
| INT-R-010 | `BookmarkChanges` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-011 | `BookmarkCreateDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-012 | `BookmarkDestination` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-013 | `BookmarkSearchQuery` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-014 | `BookmarkTreeNode` | interface | `bookmarks` | relocate to 'bookmarks' |
| INT-R-015 | `CSSInjection` | interface | `scripting` | relocate to 'scripting' |
| INT-R-016 | `CSSOrigin` | type | `extensionTypes` | relocate to 'extensionTypes' |
| INT-R-017 | `Command` | interface | `commands` | relocate to 'commands' |
| INT-R-018 | `ConnectOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-019 | `Cookie` | interface | `cookies` | relocate to 'cookies' |
| INT-R-020 | `CookieDetails` | interface | `cookies` | relocate to 'cookies' (chrome-only name) |
| INT-R-021 | `CookieGetAllDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-022 | `CookieSameSiteStatus` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-023 | `CookieSetDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-024 | `CookieStore` | interface | `cookies` | relocate to 'cookies' |
| INT-R-025 | `DNRMatchedRule` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-026 | `DNRMatchedRulesFilter` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-027 | `DNRTabUpdateOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-028 | `DNRUpdateRuleOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-029 | `DevToolsEvalOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-030 | `DevToolsReloadOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-031 | `InjectionResult` | interface | **decide** | ambiguous: declared in scripting, userScripts |
| INT-R-032 | `LanguageDetectionResult` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-033 | `MenuItemContextType` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-034 | `MenuItemProperties` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-035 | `MenuItemType` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-036 | `MessageOptions` | interface | `systemLog` | relocate to 'systemLog' (chrome-only name) |
| INT-R-037 | `MessageSender` | interface | `runtime` | relocate to 'runtime' |
| INT-R-038 | `OffscreenCreateParameters` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-039 | `OffscreenReason` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-040 | `Permissions` | interface | `permissions` | relocate to 'permissions' |
| INT-R-041 | `PlatformInfo` | interface | `runtime` | relocate to 'runtime' |
| INT-R-042 | `Port` | type | `runtime` | relocate to 'runtime' |
| INT-R-043 | `PortDisconnectReason` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-044 | `RegisteredContentScript` | interface | **decide** | ambiguous: declared in scripting, contentScripts |
| INT-R-045 | `ScriptInjection` | interface | `scripting` | relocate to 'scripting' |
| INT-R-046 | `ScriptInjectionExecutionWorld` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-047 | `ScriptInjectionTarget` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-048 | `SendMessageOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-049 | `SidePanelBehavior` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-050 | `SidePanelOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-051 | `SidebarActionDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-052 | `SidebarActionSetIconDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-053 | `SidebarActionSetPanelDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-054 | `SidebarActionSetTitleDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-055 | `StorageAccessOptions` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-056 | `StorageArea` | type | `storage` | relocate to 'storage' |
| INT-R-057 | `StorageChange` | interface | `storage` | relocate to 'storage' |
| INT-R-058 | `Tab` | interface | `tabs` | relocate to 'tabs' |
| INT-R-059 | `TabCreateProperties` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-060 | `TabMutedInfo` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-061 | `TabStatus` | type | `tabs` | relocate to 'tabs' |
| INT-R-062 | `ViewFilter` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-063 | `WebNavigationGetAllFramesDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-064 | `WebNavigationGetFrameDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-065 | `WebRequestDetails` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-066 | `WebRequestFilter` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-067 | `WebRequestResourceType` | type | **manual** | safari-only name: needs a namespace decision |
| INT-R-068 | `Window` | interface | `windows` | relocate to 'windows' |
| INT-R-069 | `WindowCreateData` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-070 | `WindowGetInfo` | interface | **manual** | safari-only name: needs a namespace decision |
| INT-R-071 | `WindowState` | type | `windows` | relocate to 'windows' |
| INT-R-072 | `WindowType` | type | **decide** | ambiguous: declared in tabs, windows |
| INT-R-073 | `WindowUpdateInfo` | interface | **manual** | safari-only name: needs a namespace decision |

Breakdown: 21 relocate unambiguously, 3 are ambiguous and need a decision, 49 are
Safari-only names that are prefixed flattenings of names the other browsers nest.

The 49 follow a regular pattern that can seed the map but must not be trusted
blindly:

| Safari flat name | Almost certainly | 
|---|---|
| `ActionSetIconDetails` | `action.SetIconDetails` |
| `ActionSetTitleDetails` | `action.SetTitleDetails` |
| `DNRMatchedRule` | `declarativeNetRequest.MatchedRule` |
| `DNRUpdateRuleOptions` | `declarativeNetRequest.UpdateRuleOptions` |
| `WebRequestFilter` | `webRequest.RequestFilter` |
| `TabCreateProperties` | `tabs.CreateProperties` |
| `WindowCreateData` | `windows.CreateData` |
| `MenuItemProperties` | `menus.CreateProperties` |
| `SendMessageOptions` | `runtime.SendMessageOptions` |
| `DevToolsEvalOptions` | `devtools.inspectedWindow.EvalOptions` |
| `SidebarActionSetIconDetails` | `sidebarAction.SetIconDetails` |
| `OffscreenCreateParameters` | `offscreen.CreateParameters` |

**The three ambiguous ones need your decision:**

- `InjectionResult`: declared in `scripting` and `userScripts` elsewhere.
- `RegisteredContentScript`: declared in `scripting` and `contentScripts` elsewhere.
- `WindowType`: declared in `tabs` and `windows` elsewhere.

---

## Workstream I. Guardrails and project setup

**This is the highest-priority workstream.** Three separate audits in this
project produced confidently-presented wrong answers, and none of the existing
checks could have caught any of them. The reason is structural:

- `tests/index.test-d.ts` (3693 lines) and `type-tests/index.test-d.ts` (2265
  lines) are GENERATED by `src/generator.ts` from the generator's own output,
  and every assertion has the form `declare let x: chrome.ns.El;`. They assert
  that a type exists and the file compiles. They are tautological and cannot
  fail on a wrong type, a fabricated member, or a degraded signature.
- `enforce-zero-any.ts` greps for `AnyKeyword`.
- `test/generator.test.ts` covers generator mechanics, not type correctness.

So the entire quality gate is "does our output compile", and everything else
was left to human reading. Reading is exactly what failed. Every item below is
designed to be capable of failing.

### GRD-001. Require evidence on every patch

- **Files:** `src/generator.ts` `validatePatch()` (line 107), all `patches/*.json`.
- **Problem:** a patch can assert anything with no citation. Three members we
  assert (`isInternal` on `documentScan.ScannerOption` and
  `system.display.DisplayUnitInfo`, `activationmessage`/`keyboard` on
  `chrome_url_overrides.UrlOverrideInfo`, `hasAccelerometerSupport` on
  `system.display.DisplayUnitInfo`) appear in ZERO ground-truth sources:
  not `chrome-types/index.d.ts`, not `_all.d.ts`, not the Firefox types, not
  anywhere in BCD.
- **Fix:** add required fields `reason` (`upstream-defect` | `convergence` |
  `naming` | `enhancement`) and `evidence` (upstream `file:line`, a BCD path, or
  a spec URL). `validatePatch` rejects a patch missing either.
- **Also:** emit `@note Upstream type inaccuracy patched` ONLY for
  `reason: upstream-defect`. Today all 200 patches emit it, including the 64
  that change no type at all.
- **Acceptance:** the build fails on a patch with no evidence; shipped output no
  longer asserts upstream defects for convergence patches.

### GRD-002. BCD attestation gate

- **New script:** `scripts/verify-patch-attestation.ts`.
- **Problem:** nothing checks that a member a patch ADDS actually exists.
- **Fix:** for every member a patch introduces, assert BCD records it for that
  browser. A member absent from BCD requires an explicit waiver carrying a
  source URL.
- **Catches:** the fabricated-member class in GRD-001 outright.
- **Acceptance:** run over today's corpus, every unattested member is either
  evidenced or removed.

### GRD-003. Non-degradation gate

- **New script:** `scripts/verify-no-degradation.ts`.
- **Problem:** the highest-severity finding of the adversarial review is that
  **11 patches make the shipped types WORSE than upstream** by
  deleting real members, flattening precise named types, or narrowing so that
  legal calls are rejected. Nothing detects this.
- **Fix:** a patch may not remove a member upstream declares, replace a named
  type with a looser one, or narrow a parameter, without an explicit waiver
  naming the evidence.
- **Acceptance:** the gate flags all of workstream J and passes once each is
  fixed or waived.

### GRD-004. Patch necessity (DONE)

- **Script:** `scripts/verify-patch-necessity.ts`, `npm run verify:patches`.
- Removes each override, regenerates, compares. 9 seconds for all 298.
- **Remaining:** HYG-008 wires it into `npm run check` once the 21 inert
  overrides are approved for deletion.

### GRD-005. Read the whole upstream surface

- **File:** `src/generator.ts` `generate()` line ~1127.
- **Problem:** we load only `node_modules/chrome-types/index.d.ts`. The package
  also ships `_all.d.ts`, the MV2-inclusive bundle. `tabs.executeScript` is
  declared there (18 occurrences) and absent from `index.d.ts`, which is the
  MV3-only surface. Every `missing-from-upstream` verdict this project produced
  was measured against a partial view of upstream.
- **Fix:** either parse both and record which surface each declaration came
  from, or make the MV3-only choice explicit, asserted in code with a comment,
  rather than implicit in a path string.
- **Acceptance:** a test asserts which upstream files are loaded and why.

### GRD-006. Upstream freshness gate

- **New script:** `scripts/verify-upstream-freshness.ts`.
- **Problem:** `@types/firefox-webext-browser` is pinned at **143.0.0** while BCD
  records members shipping through Firefox 153. About 20 of the confirmed
  findings are that one staleness, not 20 defects. Conversely
  `geckoProfiler.ProfilerFeature` shows the reverse error: our patch matched
  Firefox tip while upstream correctly matched the pinned 143, so our patch
  silently removed `cpu`, which is valid at 143.
- **Fix:** compare the pinned version against BCD's newest recorded version and
  fail beyond a threshold. Record the pinned baseline where patches can see it,
  so a patch cannot silently encode a newer or older reality.
- **Acceptance:** the gate fails today and passes after a version bump.

### GRD-007. Break the type-test circularity

- **Files:** `tests/index.test-d.ts`, `type-tests/index.test-d.ts`, plus a new
  hand-authored corpus.
- **Problem:** both test files are generated from the IR, so they can never
  disagree with the generator. This is why every review round passed.
- **Fix:** add a conformance corpus of real extension code, written by hand,
  that must typecheck, plus `expectError` cases asserting that wrong usage is
  REJECTED. An `expectError` test is the only kind that can catch a type that
  is too wide.
- **Seed it with the failures we already know:** `i18n.getMessage` must accept a
  boolean substitution; `omnibox.SuggestResult` must expose `deletable`;
  `devtools.inspectedWindow.eval` must reflect Firefox's tuple resolution;
  `processes.Process.type` must stay a `ProcessType` union, not `string`.
- **Acceptance:** each seeded case fails before the corresponding workstream J
  fix and passes after.

### GRD-008. Label confidence in every generated document

- **Problem:** the original bug inventory presented heuristic output with
  per-item detail tables and severity labels, which read as verified findings.
  Presentation quality tracked effort spent, not evidence held.
- **Fix:** every generated report states its basis per item
  (`empirical` | `reviewer` | `adjudicated` | `heuristic`).
  `build-workplan.py` now refuses to run without
  `verify-patch-necessity-results.json` and `corrected-bug-inventory.json`, so
  this document cannot be regenerated from heuristics alone.
- **Acceptance:** no document asserts a finding without naming how it was
  established.

### GRD-009. The Gecko pin must match the Firefox package, and something must check it

- **Problem:** `excluded-members.json` (46 members Gecko marks unsupported) and
  the lag verdicts are derived at `FIREFOX_143_0_RELEASE`, a constant in
  `scripts/derive-unsupported.ts:22` and `scripts/derive-lag.ts:42`. That is
  right for the pinned `@types/firefox-webext-browser@^143.0.0`, and it stays
  at 143 forever unless someone remembers it. `--verify` exists but only
  `npm run verify:sources` calls it, and nothing runs that: not `npm run
  check`, not CI, not cron. When Firefox ships `notifications.update`, the
  meta package keeps dropping it, silently.
- **Fix:** one pinned tag, in one place, read by both scripts. A gate in
  `npm run check` fails when the tag's major differs from the installed
  Firefox package's major. A written bump procedure: bump the package, bump
  the tag, rerun `derive:unsupported` and `derive:lag`, commit all three
  together.
- **Acceptance:** bumping the package alone makes `npm run check` fail with a
  message naming the tag to change.

---

## Workstream J. Repo regressions: patches that make our types worse

**11 patches ship types LESS correct than the upstream
declaration they replace.** These are defects in this repository and should be
fixed before any upstream filing. Found by the adversarial review; see
`corrected-bug-inventory.json`.

| ID | API | Browser | What the patch does wrong |
|---|---|---|---|
| REG-001 | `action.getBadgeTextColor` | chrome | Chromium's action.json declares the getBadgeTextColor result as '$ref: extensionTypes.ColorArray' only, so our 'ColorArray \| string' return is an unfounded widening; the rest is inlining TabDetails, which upstream defines as exactly '{ tabId?: number }'. Upstream is correct here and we are not. |
| REG-002 | `devtools.inspectedWindow.Resource` | chrome | Upstream already types 'getContent' precisely as '{content: string, encoding: string}'; the only 'any' is 'setContent''s error callback param, documented as "describes error otherwise", which is genuinely open-ended and which our override merely restates as 'unknown'. The override also flattens the callback and Promise overloads into single signatures that claim a Promise is returned even when a callback is passed, which is a regression rather than a fix. |
| REG-003 | `processes.Process` | chrome | Upstream is strictly more precise: it uses the named ProcessType union, TaskInfo and Cache, while our override degrades them to 'string', '{title: string}[]' and anonymous '{liveSize; size}'. The patch is Chrome-only with no Firefox counterpart, so it is a structural flattening of correct upstream types, not an upstream defect. |
| REG-004 | `scripting.executeScript` | chrome | We added our own '<R, Args>' generics threaded through ScriptInjection/InjectionResult and collapsed the two overloads into one; chrome-types' non-generic InjectionResult[] is not a false statement about Chrome, just less precise. The Chrome and Firefox overrides are byte-identical, confirming this is a shared shape we invented. |
| REG-005 | `_manifest.NativeManifest` | firefox | Upstream is a precise discriminated union (pkcs11/stdio vs storage); the only 'any' is 'data: { [key: string]: any }', which is arbitrary managed-storage JSON. Our override is strictly less precise than upstream (drops the union, weakens 'type' to 'string', makes required members optional), so it is a normalization, not a fix. |
| REG-006 | `devtools.inspectedWindow.eval` | firefox | Firefox resolves eval with a two-element array '[result, errorInfo]', which is an object, so upstream's 'Promise<object>' is loose but not false; our 'Promise<T = unknown>' plus callback overloads is Chrome's shape and is in fact wrong for Firefox, since awaiting it yields the tuple, not the result. |
| REG-007 | `geckoProfiler.ProfilerFeature` | firefox | Upstream's enum is exactly Firefox 143's schema, the version this package pins: 'cpu' was present and 'jssources' absent at FIREFOX_143_0_RELEASE, and our list matches current tip instead. This is version skew in our favour, not an upstream defect, and the patch silently removes 'cpu', which is valid for the pinned version. |
| REG-008 | `geckoProfiler.getSymbols` | firefox | Nothing upstream describes the resolution, and profiler symbol tables are conventionally returned as an addresses/index/buffer typed-array triple, so 'Record<string, unknown>' may be flatly wrong rather than merely narrower. No source in the repo, upstream doc, or BCD backs the object shape. |
| REG-009 | `omnibox.SuggestResult` | firefox | The two descriptionStyles members are schema-flagged unsupported and already '@deprecated' upstream, and 'deletable' is a genuine Firefox member (schema-supported, shipped in Firefox 109) that our override deletes, so the patch is a regression rather than a fix. |
| REG-010 | `runtime.Port` | firefox | 'postMessage(message: any)' is documented by MDN as "a serializable value", i.e. genuinely open-ended, and our change to 'unknown' is stylistic. Our override also deletes upstream's real Firefox-only 'error' member and adds a second 'port' argument to onMessage, so it loses information rather than fixing an 'any'. |
| REG-011 | `userScripts.RegisteredUserScript` | firefox | Upstream's ScriptSource is a deliberate variant, not an error: its own doc says "Equivalent to the ExtensionFileOrCode, except the file remains a relative URL". Replacing it with extensionTypes.ExtensionFileOrCode is a merge convenience and is strictly less precise than upstream. |

Each needs one of: revert the patch, narrow it to the part that is genuinely
correct, or keep it with a `reason: convergence` label and a waiver explaining
why the loss is acceptable for the merged surface.

---

## Workstream K. Retracted claims

**121 of the original 181 claimed upstream bugs did not survive
review.** They are listed in full in `corrected-bug-inventory.json`. Summarized by why:

| Failure mode | Count |
|---|---|
| convergence | 37 |
| our-enhancement | 22 |
| unproven-shape | 15 |
| omission-not-evidence | 12 |
| legitimate-any | 10 |
| inlined | 7 |
| by-design | 5 |
| private-type-inlining | 4 |
| already-present | 2 |
| contested | 2 |
| annotation | 1 |
| inert | 1 |
| our-restructuring | 1 |
| rename | 1 |
| none | 1 |

The largest single mode is **convergence work labelled as an upstream defect**:
the patch exists so Chrome's and Firefox's equivalent declarations collapse into
one type, not because either browser's types are wrong. GRD-001 stops this at
the schema level.

No action is required on these beyond relabelling, which GRD-001 covers. They
must NOT be filed upstream.

---

## Workstream G. Naming and normalization decisions

31 patch/browser pairs are not upstream defects but do encode a
decision we have made implicitly. Each needs an explicit position, because they
shape the public API surface and will be scrutinized in a standards context.

### missing-generics (1)


| ID | API | Browser | Detail |
|---|---|---|---|
| NAM-001 | `devtools.inspectedWindow.eval` | chrome | upstream declares 'devtools.inspectedWindow._eval'; likely a naming difference, not a gap; upstream is not generic; result type is unparameterized |

### namespace-not-in-upstream (6)

`_manifest` is a Firefox-types construct (chrome-types mentions it only in two doc
comments) and `mimeHandlerPrivate` is a Chromium private API deliberately excluded
from chrome-types. Question: does the meta package expose either?

| ID | API | Browser | Detail |
|---|---|---|---|
| NAM-002 | `_manifest.ImageData` | chrome | '_manifest' is not part of the chrome type surface |
| NAM-003 | `_manifest.NativeManifest` | chrome | '_manifest' is not part of the chrome type surface |
| NAM-004 | `_manifest.UnrecognizedProperty` | chrome | '_manifest' is not part of the chrome type surface |
| NAM-005 | `_manifest.WebExtensionManifest` | chrome | '_manifest' is not part of the chrome type surface |
| NAM-006 | `browserAction.ColorArray` | chrome | upstream chrome types declare no 'browserAction' namespace at all |
| NAM-007 | `mimeHandlerPrivate.StreamInfo` | chrome | 'mimeHandlerPrivate' is not part of the chrome type surface |

### possible-rename (7)

Upstream declares the same concept under a different name. Question: do we adopt
the upstream name, or keep ours and document the mapping? Verified example:
`notifications.CreateNotificationOptions` (ours) versus
`notifications.NotificationOptions` (chrome-types line 15212).

| ID | API | Browser | Detail |
|---|---|---|---|
| NAM-008 | `action.SetIconDetails` | chrome | upstream declares 'action.setIcon'; likely a naming difference, not a gap |
| NAM-009 | `action.SetIconDetails` | firefox | upstream declares 'action.setIcon'; likely a naming difference, not a gap |
| NAM-010 | `desktopCapture.ChooseDesktopMediaOptions` | chrome | upstream declares 'desktopCapture.chooseDesktopMedia'; likely a naming difference, not a gap |
| NAM-011 | `devtools.inspectedWindow.EvalOptions` | firefox | upstream declares 'devtools.inspectedWindow._EvalOptions'; likely a naming difference, not a gap |
| NAM-012 | `devtools.inspectedWindow.EvaluationExceptionInfo` | firefox | upstream declares 'devtools.inspectedWindow.eval'; likely a naming difference, not a gap |
| NAM-013 | `geckoProfiler.StartSettings` | firefox | upstream declares 'geckoProfiler._StartSettings'; likely a naming difference, not a gap |
| NAM-014 | `runtime.UpdateAvailableDetails` | firefox | upstream declares 'runtime._OnUpdateAvailableDetails'; likely a naming difference, not a gap |

### private-type-reference (17)

Upstream routes an event payload through a generated `_`-prefixed type and our
override inlines the shape. Question: do we inline these, or re-export them
under public names? Inlining loses a nameable type for consumers.

| ID | API | Browser | Detail |
|---|---|---|---|
| NAM-015 | `bookmarks.onChanged` | firefox | upstream routes the payload through generated private type(s) '_OnChangedChangeInfo'; our override inlines the shape |
| NAM-016 | `bookmarks.onChildrenReordered` | firefox | upstream routes the payload through generated private type(s) '_OnChildrenReorderedReorderInfo'; our override inlines the shape |
| NAM-017 | `bookmarks.onMoved` | firefox | upstream routes the payload through generated private type(s) '_OnMovedMoveInfo'; our override inlines the shape |
| NAM-018 | `bookmarks.onRemoved` | firefox | upstream routes the payload through generated private type(s) '_OnRemovedRemoveInfo'; our override inlines the shape |
| NAM-019 | `cookies.onChanged` | firefox | upstream routes the payload through generated private type(s) '_OnChangedChangeInfo'; our override inlines the shape |
| NAM-020 | `downloads.onChanged` | firefox | upstream routes the payload through generated private type(s) '_OnChangedDownloadDelta'; our override inlines the shape |
| NAM-021 | `history.onVisitRemoved` | firefox | upstream routes the payload through generated private type(s) '_OnVisitRemovedRemoved'; our override inlines the shape |
| NAM-022 | `runtime.onInstalled` | firefox | upstream routes the payload through generated private type(s) '_OnInstalledDetails'; our override inlines the shape |
| NAM-023 | `runtime.onUpdateAvailable` | firefox | upstream routes the payload through generated private type(s) '_OnUpdateAvailableDetails'; our override inlines the shape |
| NAM-024 | `tabs.onActivated` | firefox | upstream routes the payload through generated private type(s) '_OnActivatedActiveInfo'; our override inlines the shape |
| NAM-025 | `tabs.onAttached` | firefox | upstream routes the payload through generated private type(s) '_OnAttachedAttachInfo'; our override inlines the shape |
| NAM-026 | `tabs.onDetached` | firefox | upstream routes the payload through generated private type(s) '_OnDetachedDetachInfo'; our override inlines the shape |
| NAM-027 | `tabs.onHighlighted` | firefox | upstream routes the payload through generated private type(s) '_OnHighlightedHighlightInfo'; our override inlines the shape |
| NAM-028 | `tabs.onMoved` | firefox | upstream routes the payload through generated private type(s) '_OnMovedMoveInfo'; our override inlines the shape |
| NAM-029 | `tabs.onRemoved` | firefox | upstream routes the payload through generated private type(s) '_OnRemovedRemoveInfo'; our override inlines the shape |
| NAM-030 | `tabs.onZoomChange` | firefox | upstream routes the payload through generated private type(s) '_OnZoomChangeZoomChangeInfo'; our override inlines the shape |
| NAM-031 | `webNavigation.onTabReplaced` | firefox | upstream routes the payload through generated private type(s) '_OnTabReplacedDetails'; our override inlines the shape |

---

## Workstream L. Canonical type names

Decided 2026-09-02. The counts below were measured against `dist/index.d.ts`
at 43cbb73 with a structural scan of the emitted declarations. CAN-002 replaces
them with derived, checked-in numbers; until then they are dated, not live.

### The problem

The merger unifies declarations by exact name inside a namespace, and nothing
ever compares two names. Safari types are relocated with their WebKit names
intact, and Firefox's generated `_` names never meet Chrome's, so one concept
ships under two or three names with a browser tag on each:

| Concept | Chrome | Firefox | Safari |
|---|---|---|---|
| `action.getTitle` details | `TabDetails` | `Details` | `ActionDetails` |
| `windows.getAll` options | `QueryOptions` | `_GetAllGetInfo` | `WindowQueryOptions` |
| `cookies.get` details | `CookieDetails` | `_GetDetails` | `CookieDetails` |
| `runtime.sendMessage` options | `_SendMessageOptions` | `_SendMessageOptions` | `MessageOptions` |

| Measure | Count |
|---|---|
| Safari-only type declarations | 48 |
| of which name a concept Chrome or Firefox already names | 46 |
| same-namespace interfaces, byte-identical bodies, different names | 53 groups |
| same member names, types or optionality differ | 24 more |
| functions whose overloads take a differently named type per browser | 116 |
| names that lose under CAN-001 | 69, referenced 77 times |

Calls work, because the overloads union. Naming the type does not:
`browser.action.TabDetails` is tagged Chrome, `Details` Firefox, `ActionDetails`
Safari, while the concept is supported everywhere. Every `@supported` tag on a
losing name is wrong.

A matched name already does the right thing. `scripting.InjectionTarget` is
contributed by all three browsers and emits one interface with per-member tags
(`documentIds` is Chrome and Safari only). This workstream adds the name map.
It adds no merge machinery.

### CAN-001. Decision: one name per concept, ranked among the contributors

- One public name per concept per namespace.
- The name is chosen among the browsers that contribute a name to the concept
  AND ship its namespace to stable, in this order: the Chrome public name, then
  the Firefox public name, then Safari's name with its namespace prefix removed.
  A `_` name is never public.
- A browser that does not contribute has no vote. `action.setTitle` is an inline
  literal in Chrome, so the group is Firefox and Safari; Firefox has only
  `_SetTitleDetails`, and the name is `SetTitleDetails`.
- A browser votes only with what it ships to stable. chrome-types marks six
  namespaces `@chrome-channel dev` on their own doc block (`dns`, `processes`,
  `sockets.tcp`, `sockets.tcpServer`, `sockets.udp`, `system.network`), and
  BCD records `dns` as Chrome `preview`, Firefox 60. Chrome's names there still
  merge; they do not win. Derived from the input by `derive-names.ts`, not
  listed by hand. One group affected today: `dns.resolve` takes Firefox's
  `DNSRecord`, not Chrome's `ResolveCallbackResolveInfo`. Ruled 2026-09-02.
- Chrome first, where Chrome ships the namespace, because chrome-types names
  come from the Chromium schema and match developer.chrome.com. That reason
  does not hold for a dev-channel API, which is why the stable condition
  exists. MDN rarely names an options type at all, and Firefox's `_` names
  and WebKit's prefixes are generator artifacts.
- Losing names are dropped, not aliased. The package is a prerelease, not on
  npm, and the repo has no stars. This ships as a patch bump. It is NOT 2.0.0.

### CAN-002. `scripts/derive-names.ts`

- Same shape as `derive-relocations.ts`: rules tried in order, each citing a
  slot, anything unresolved exits non-zero.
- Two names are one concept when they occupy the same slot across browsers:
  the same parameter of the same function (PARAMETER), the same function's
  return (RETURN), or the same member of an already-matched interface (MEMBER).
  Body equality is a cross-check and never a basis. `downloads.StringDelta` and
  `BooleanDelta` share member names and are two types.
- Output `canonical-names-derived.json`, one row per
  `{namespace, browser, name, canonical, basis, citation, curatedVerdict}`,
  checked in like the relocation map.
- A name used in two roles is an error the map resolves by hand. Safari's
  `ActionDetails` is the `getTitle` details AND the `openPopup` options. The
  rename follows the declaration: it becomes `TabDetails`, and Safari's
  `openPopup` overload takes `TabDetails`, which is what Safari accepts.
- `menus` is deferred (a curated `defer` verdict) until INT-023 decides how
  Safari's `contextMenus = menus` alias (index.d.ts:1097) shapes the canonical
  set. Per namespace, the rule gives `contextMenus.CreateProperties` and
  `menus.ItemProperties` for one concept, and that is not shipped.
- **Acceptance:** PARAMETER alone reaches 34 groups on today's output. The
  script prints every group and every unresolved case, and that list is
  reviewed before CAN-003 starts.
- Once the map exists, `build-workplan.py` drops every workstream G row whose
  path it has a verdict for. Five of the ten possible-rename rows name a
  concept with a second name in today's output; the other five are names a
  patch invented where upstream inlines the shape, and they stay in G.

### CAN-003. Apply the map in the generator

- `parseSource()` renames the declaration per browser and rewrites that
  browser's references with the same map, the way relocation already rewrites
  `browser.X`. The merger then sees one name.
- Runs after `reconcileStructuralForms()` and before patches.
- A same-browser many-to-one (Firefox sends `_AddUrlDetails`, `_DeleteUrlDetails`
  and `_GetVisitsDetails` to `UrlDetails`) is never refused: that browser's
  declaration becomes the member-wise union, a member optional if optional in
  any source, `extends` resolved first. The same trade the merger makes
  between browsers, made within one. Ruled 2026-09-02; the alternative was a
  curated split for history alone.
- One split, ruled the same day after measurement: `userScripts`. The union
  made Firefox's `js` optional in `firefox-only.d.ts` where `register()`
  requires it (index.d.ts:5433), and the pruned file cannot restore what the
  union folded away. Firefox's `_UpdateRegisteredUserScript` becomes the
  public `UpdateRegisteredUserScript` for `update()` only, via a curated
  `rename` verdict.
- **Acceptance:** no losing name appears anywhere under `dist/`.

### CAN-004. Re-key the patches that name a loser

- Three patch entries are keyed on a name that loses: `runtime._SendMessageOptions`,
  `tabs._SendMessageOptions`, `scripting._UpdateContentScriptsScripts`. Several
  override texts reference one (`runtime.sendMessage`,
  `browserAction.setBadgeTextColor`). The derived map is the authority on the
  full list.
- The nine `webNavigation`/`webRequest` `_On*Details` entries in subsystem-10
  are Firefox-internal duplicates and are outside this workstream.
- **Acceptance:** `npm run verify:patches` still reports every re-keyed entry
  LOAD-BEARING. One that goes inert is deleted under rule 1.

### CAN-005. `verify:names` gate

- New script in `npm run check`. Fails when a slot carries two names among
  its contributors, or when a name from the map's losing column appears
  anywhere under `dist/`.
- Drafted 2026-09-02. On the real tree its slot check found 14 second-order
  collisions that exist only after first-order renames converge two
  interfaces (`RuleCondition.domainType`: Chrome `DomainType`, Firefox
  `_RuleConditionDomainType`). Five are curated verdicts the gate must
  honour exactly as `deriveCanonicalNames` does; the other nine are all
  Chrome public versus a Firefox `_` name, decided by CAN-001 with no
  ruling needed. So `derive-names.ts` iterates to a fixpoint: apply the
  renames, re-collect slots, derive again, until no new group appears.
- Also asserts, per CLAUDE.md rule 9, that every `export namespace X` and
  every `export import` alias in `dist/` carries only browsers whose
  upstream declares X.
- Proven able to fail by one injected synthetic duplicate, like every gate in
  workstream I.

### CAN-006. The union ratchet will move

- Ten Safari pairs differ only in member type or optionality; merging them adds
  union notes. Rule 7 applies: each new union is diagnosed in the canonicalizer
  first. `union-note-baseline.json` is re-pinned only for unions proven to be
  upstream's, and the commit that re-pins it lists them.

### CAN-007. Hand verdicts known before the script runs

- `permissions.Permissions` and `AnyPermissions`: Firefox distinguishes them on
  purpose (`AnyPermissions` admits any string). Distinct.
- Same-upstream duplicates (`fileSystemProvider.CopyEntryRequestedOptions` and
  `MoveEntryRequestedOptions`, Firefox's `_On*ChangeInfo` triples): upstream's
  own declarations, untouched.
- `declarativeNetRequest.DNRUpdateRuleOptions` and `DNRTabUpdateOptions`: no
  Safari function references either (WK-ORPHAN). Untouched here.
- `scripting.CSSOrigin`: the relocation row's curated verdict says
  `extensionTypes`, the derived namespace says `scripting`, and it ships beside
  `extensionTypes.CSSOrigin`. That is an INT-R defect, fixed there, not a rename.

### CAN-008. Release

- Regenerate the tsd tests, bump the patch version, and generate the list of
  dropped names from the map into the release notes.
- **Gate (Patrick, 2026-09-02): before the squash to `main`, an adversarial
  anti-slop review of the whole `main..local-dev` diff, done by the main
  session itself, on code structure and tone. Findings cite file:line and
  the tell; subagents implement the fixes as their own commit on `local-dev`
  first, and the main session then reads the fixed tree again with fresh
  eyes. If that read finds anything actionable the cycle repeats. It ends
  only when a fresh read finds nothing; only then does the squash proceed.

---

## Workstream H. BCD discrepancies

Each needs a runtime check in a real Safari build before filing anywhere. Do not
file these from static analysis alone.

| ID | Item | Discrepancy | Resolves to |
|---|---|---|---|
| BCD-001 | `bookmarks` | in WebKit IDL, BCD reports no Safari support | BCD bug, unshipped API, or BCD coverage gap |
| BCD-002 | `notifications` | in WebKit IDL, BCD reports no Safari support | BCD bug, unshipped API, or BCD coverage gap |
| BCD-003 | `offscreen` | in WebKit IDL, BCD reports no Safari support | BCD bug, unshipped API, or BCD coverage gap |
| BCD-004 | `sidePanel` | in WebKit IDL, BCD reports no Safari support | BCD bug, unshipped API, or BCD coverage gap |
| BCD-005 | `sidebarAction` | in WebKit IDL, BCD reports no Safari support | alias of `action`, likely fine |
| BCD-006 | `test` | in WebKit IDL, BCD reports no Safari support | BCD bug, unshipped API, or BCD coverage gap |
| BCD-007 | `browserAction` | BCD reports Safari support, no WebKit interface | alias of `action`, likely fine |
| BCD-008 | `pageAction` | BCD reports Safari support, no WebKit interface | alias of `action`, likely fine |
| BCD-009 | `extensionTypes` | BCD reports Safari support, no WebKit interface | BCD bug, unshipped API, or BCD coverage gap |

Note that the existing `scripts/audit-bcd.ts` already produces
`BCD-DISCREPANCIES.md` for Chrome and Firefox. That report has not been reviewed
as part of this pass and is likely to contain a further backlog. Reviewing it is
itself an open item.

---

## Open decisions, consolidated

1. **Integrate Safari now with the INT-022 widening guard, or wait for workstream D to land in WebKit?**
   Recommendation: Integrate now. The guard is needed permanently, the integration is not blocked on Apple's review queue, and every landed WebKit PR then improves output with no further integration work.

2. **Is Safari iOS a browser column or a modifier on Safari?**
   Recommendation: A modifier. 18 diverging members do not justify going from 7 to 15 provenance combinations.

3. **Where do `InjectionResult`, `RegisteredContentScript` and `WindowType` live?**
   Recommendation: No recommendation; needs your call.

4. **Do Safari's own aliases (`contextMenus` to `menus`, `browserAction`/`pageAction` to `action`) constrain Decision 20's canonical set?**
   Recommendation: No recommendation; needs your call.

5. **File the Chrome and Firefox bugs before or after the dead-patch cleanup?**
   Recommendation: After. Filing first risks filing a bug for a patch we then delete.

6. **Does `overrideShared` now fan out to three browsers?**
   Recommendation: Audit existing uses first. Silently changing its meaning would alter every patch that uses it.

7. **Does the zero-any policy extend to `Record<string, unknown>`?**
   Recommendation: Needs a position before Safari lands, or the guarantee weakens quietly.

---

## Verification already completed

Recorded so it is not redone:

- WebKit PR #71593 is merged (`merged_at` 2026-08-15T20:54:10Z, merge commit
  `c691177463029c907b78c21215a9ca3aab6ce499`, base `main`).
- `safari-webextension-types` output is current: generating from `WebKit/WebKit@main`,
  from `--pr 71593`, and the committed `index.d.ts` all yield md5
  `66cd9244686a64365214b8e0b817deb7`, 1006 lines, 0 `any`. Nothing to regenerate.
- `webext-meta-types` `npm run check` passes: typecheck, 39 unit tests, generation
  (2890 metadata entries, 0 merge issues), zero-any enforcement, tsd.
- `safari-webextension-types` `npm ci && npm test` passes.
- Spot-verified against the pinned upstream packages: `alarms.Alarm.persistAcrossSessions`
  (chrome-types:816), `cookies.Cookie.partitionKey` (chrome-types:3783),
  `cookies.Cookie.firstPartyDomain` (firefox:1812),
  `notifications.NotificationOptions` (chrome-types:15212),
  `export {_debugger as debugger}` (chrome-types:4564),
  `export {_eval as eval}` (chrome-types:6150), `mimeHandlerPrivate` absent (0 occurrences),
  `_manifest` present only in two doc comments.

