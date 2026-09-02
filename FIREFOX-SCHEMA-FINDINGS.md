# Firefox analysis against local mozilla-central

Resolves the Firefox claims the adversarial review could not settle, using the
full-history checkout at `~/firefox` (`mozilla-firefox/firefox`, 989,422
commits) instead of derived type packages.

Baseline tag: **`FIREFOX_143_0_RELEASE`**, matching the pinned
`@types/firefox-webext-browser@143.0.0`.

Reproduce: `python3 analyze-firefox-schemas.py` (writes
`firefox-schema-analysis.json`).

---

## Headline

| Question | Claims | Answer |
|---|---|---|
| Are the `documentId`/`parentDocumentId` findings real defects? | 17 | **No.** All are version lag. One bump, not 17 bugs. |
| What do the 14 unresolved promises resolve to? | 14 | **13 are `Promise<void>`**, proven from the implementation. **1 was wrong in our patch.** |
| Is `tabs.onUpdated.changeInfo.groupId` a real gap? | 1 | **Yes, and it is a Mozilla schema bug**, not a DefinitelyTyped one. |

---

## Two methodology corrections

Both were errors in my first pass, caught before they reached any conclusion.

**1. `"async": true` does not mean "resolves with nothing."** It means the
function returns a promise and the schema is silent about the resolution. My
first script inferred `async: true -> Promise<void>` and produced a confidently
wrong answer for `geckoProfiler.getSymbols`, which is `async: true` and resolves
to a tuple of typed arrays. The schema tells you what the DefinitelyTyped
generator saw. Only the implementation tells you what the function returns.

**2. Namespace-wide grep counts cannot answer "does this type have this
member."** My first script counted `documentId` across all of `runtime.json`,
found one occurrence at the 143 baseline, and concluded `MessageSender` had it.
That occurrence was on `ExtensionContext`. Checked per type, `MessageSender` at
143 is `frameId, id, tab, tlsChannelId, url, userScriptWorldId`, with
`documentId` appearing only at tip.

Same failure shape as the original audit both times: a cheap proxy standing in
for the real question.

---

## Part A. The version-skew class is entirely version lag

Checked per type and per event, at the tag rather than by counting strings:

| Type or event | Added since 143 | Verdict |
|---|---|---|
| `runtime.MessageSender` | `documentId` | version lag |
| `webRequest.onBeforeRequest` | `documentId`, `parentDocumentId` | version lag |
| `webRequest.onCompleted` | `documentId`, `parentDocumentId` | version lag |
| `webNavigation.onCommitted` | `documentId`, `parentDocumentId` | version lag |
| `webNavigation.onCompleted` | `documentId`, `parentDocumentId` | version lag |
| `proxy.onRequest` | `documentId`, `parentDocumentId` | version lag |
| `tabs.Tab` | `splitViewId` | version lag (not a documentId case) |

**`@types/firefox-webext-browser@143.0.0` correctly describes Firefox 143.**
It is not defective; it is pinned. Filing 17 "missing member" bugs against
DefinitelyTyped would have been wrong on the facts and would have cost
credibility with a maintainer we depend on.

Action: **one** request to regenerate the package against current schemas, then
re-run this analysis. Do not file the 17.

---

## Part B. Promise resolution, proven from the implementation

13 of 14 resolve with no value, so upstream's generated `Promise<any>` is
imprecise and our `Promise<void>` is correct:

| API | Implementation evidence |
|---|---|
| `geckoProfiler.start` | `ext-geckoProfiler.js:74`, no value-returning return |
| `geckoProfiler.stop` | `ext-geckoProfiler.js:100` |
| `geckoProfiler.pause` | `ext-geckoProfiler.js:108` |
| `geckoProfiler.resume` | `ext-geckoProfiler.js:112` |
| `telemetry.scalarAdd` | `ext-telemetry.js:51`, body is a no-op since Fx134 (bug 1930196) |
| `telemetry.scalarSetMaximum` | `ext-telemetry.js:59`, no-op since Fx134 |
| `telemetry.keyedScalarAdd` | `ext-telemetry.js:63`, no-op since Fx134 |
| `telemetry.keyedScalarSetMaximum` | `ext-telemetry.js:71`, no-op since Fx134 |
| `telemetry.recordEvent` | `ext-telemetry.js:75`, no-op since Fx132 (bug 1894533) |
| `telemetry.registerScalars` | `ext-telemetry.js:79`, no-op since Fx134 |
| `telemetry.registerEvents` | `ext-telemetry.js:87`, no-op since Fx132 |
| `telemetry.setEventRecordingEnabled` | `ext-telemetry.js:83`, no-op since Fx133 (bug 1920562) |
| `normandyAddonStudy.endStudy` | `ext-normandyAddonStudy.js:39` |

These share **one** root cause: the DefinitelyTyped generator falls back to
`Promise<any>` whenever a Gecko schema entry is `"async": true` with no callback
parameter describing the resolution. That is a single generator issue, not 13
bugs. Note also that 8 of the 13 are documented no-ops, so the practical value
of fixing them is low even though the type is wrong.

### The exception: our patch is wrong

**`geckoProfiler.getSymbols`** returns a value:

```js
// toolkit/components/extensions/parent/ext-geckoProfiler.js:173
async getSymbols(debugName, breakpadId) {
  return symbolicationService.getSymbolTable(debugName, breakpadId);
}
```

and Firefox's own type definition gives the shape exactly:

```typescript
// devtools/client/performance-new/@types/perf.d.ts:139
export type SymbolTableAsTuple = [Uint32Array, Uint32Array, Uint8Array];
```

Our patch declares `Record<string, unknown>`. The real value is a **tuple of
three typed arrays**, so the patch is not merely imprecise, it is the wrong
kind. An `Array.isArray` check would pass where our type says it should not, and
destructuring `[addresses, index, buffer]` is rejected by our type.

This is **REG-012**, a twelfth entry for workstream J, and it was predicted by
the reviewer who flagged it as `unproven-shape` rather than accepting it.

---

## The strongest Firefox finding: a Mozilla schema bug

`tabs.onUpdated.changeInfo.groupId` was the one claim the reviewers called a
real gap at the pinned baseline, on the strength of BCD recording it in Firefox
138. The schema disagrees, so I checked the implementation. All three sources at
`FIREFOX_143_0_RELEASE`:

- **Runtime emits it.** `ext-tabs.js:164` includes `"groupId"` in
  `allProperties`, the set `tabs.onUpdated` can report, and the `TabGrouped` and
  `TabUngrouped` handlers push `"groupId"` into `needed`
  (`ext-tabs.js:489` and `:496`), which is what populates `changeInfo`.
- **Schema omits it.** `browser/components/extensions/schemas/tabs.json` at the
  same tag declares `changeInfo` as `attention, audible, autoDiscardable,
  discarded, favIconUrl, hidden, isArticle, mutedInfo, pinned, sharingState,
  status, title, url`. No `groupId`.
- **Generated types therefore omit it**, which is why
  `_OnUpdatedChangeInfo` lacks it while `Tab` and `_QueryQueryInfo` both have
  `groupId`.

So BCD's "138" reflects reality and the schema is incomplete relative to the
implementation. **The root cause is the Gecko schema, not DefinitelyTyped**, and
the fix belongs at bugzilla.mozilla.org. Regenerating the types package will not
fix it, because the schema it regenerates from is the thing that is wrong.

This is the best-evidenced Firefox finding we have: three primary sources at one
pinned version, all citable to a permalink.

---

## Effect on the inventory

| Before this analysis | After |
|---|---|
| 46 Firefox claims confirmed | 17 retracted as version lag (not defects) |
| 14 unresolved `needs-runtime-check` | 13 resolved as `Promise<void>`, 1 became a regression in our own patch |
| 1 "real generator gap" (`groupId`) | reclassified: real, but a **Mozilla schema** bug, filable with source evidence |
| 11 repo regressions | **12** (REG-012, `geckoProfiler.getSymbols`) |

Filing consequence: what looked like ~46 Firefox issues is closer to **three**:
one DefinitelyTyped generator issue (the `Promise<any>` fallback), one
regenerate-against-current-schemas request, and one Mozilla schema bug for
`groupId`. Plus whatever survives among the remaining confirmed items not
covered by this pass.

---

## Recheck of the 15 `unproven-shape` refutations

14 of the 15 were the same `geckoProfiler`, `telemetry` and
`normandyAddonStudy` items resolved in Part B above. Exactly one needed separate
work.

### `userScripts._OnBeforeScriptUserScript`

Verdict **REFUTED stands**, now on evidence rather than suspicion, and our patch
carries two unfounded assertions.

The object handed to `onBeforeScript` listeners is built in two places, which is
what makes this easy to get wrong. `UserScript.api()` returns only three
members:

```js
// toolkit/components/extensions/child/ext-userScripts-content.js:47
api() {
  return {
    metadata: this.metadata,
    defineGlobals: sourceObject => this.defineGlobals(sourceObject),
    export: value => this.export(value),
  };
}
```

and `global` is attached separately, 300 lines later:

```js
// toolkit/components/extensions/child/ext-userScripts-content.js:371
Object.defineProperty(apiObj, "global", {
  value: scriptSandbox, enumerable: true, configurable: true, writable: true,
});
```

Member by member, against the 143 schema (`user_scripts_content.json`, all four
declared) and the implementation:

| Member | Upstream | Ours | What it actually is |
|---|---|---|---|
| `metadata` | `any` | `unknown` | The opaque value passed to `userScripts.register`. Firefox's own JSDoc types it `PlainJSONValue`, so a JSON value type is justifiable, but our `unknown` is not that type either. |
| `global` | `any` | `WindowProxy \| Record<string, unknown>` | **`scriptSandbox`, a `Cu.Sandbox`.** Not a `WindowProxy`. Our union asserts a DOM type the implementation never provides. |
| `defineGlobals` | `(sourceObject: object) => void` | `(sourceObject: Record<string, unknown>) => void` | Takes a plain object. Either spelling is fine. |
| `export` | function | `<T>(value: T) => T` | **Not identity.** Returns the value unmodified only when the userScript principal can already access it; otherwise it returns a *wrapped function*, a *lazy-getter object*, or a *new array*, and it throws for anything else (`:108-141`). |

So there is no filable upstream bug here: `any` on `metadata` and `global` is
imprecise but not false. Our patch is the thing that overreaches, on two
members. Candidate additions to workstream J rather than to the bug list.

Low priority regardless: this is the MV2-only `userScripts` surface
(`user_scripts_content.json`), and `onBeforeScript` no longer exists in
`user_scripts.json` at tip.

### A third methodology note

`api()` reads like the complete definition of the object, and stopping there
would have produced a confident claim that `global` does not exist at all. It is
attached by `Object.defineProperty` well away from the constructor, and the
schema declares it. That is the third time in this analysis that a partial read
of a primary source nearly produced a wrong finding, after the `async: true`
inference and the namespace-wide grep. The pattern is consistent enough to name:
**confirm a member's absence against the schema AND the implementation, never
one alone, and never from the first definition site you find.**

---

## Still open

- WebKit has an equivalent pass available now that `~/webkit` exists, in
  particular whether the 53 orphaned dictionaries have implementations that
  reveal the intended parameter types.
