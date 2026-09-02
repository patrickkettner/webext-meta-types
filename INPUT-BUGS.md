# Input bugs

Places where an input package and the browser it describes disagree.

This project's merger may only assert what its inputs declare, so it cannot fix
any of these. Recording them here is what stops the knowledge being lost, and is
the queue for upstream fixes and for cited patches.

Two directions, and they are not equally urgent.

- **Over-claim**: the package declares something the browser does not implement.
  What that costs depends on what was over-claimed, and the difference is worth
  keeping straight:
  - A **method** that does not exist is a `TypeError` at call time. The consumer
    wrote code the types said was fine and it throws.
  - An unknown **dictionary key** is silently ignored by Safari. Verified in
    `Shared/Extensions/WebExtensionUtilities.mm:277`, where `validateDictionary`
    returns early for any key that is in neither the required nor the optional
    set, recording no error. The option is dropped and the call proceeds, so the
    consumer gets behaviour they did not ask for and no signal. A type error on
    a KNOWN key does throw.
- **Under-claim**: the browser implements something the package does not
  declare. A consumer loses autocomplete and may write a cast. Annoying, not
  breaking.

An earlier draft of this file asserted that an unknown key is a hard error. That
came from a review and was repeated here without being checked; the source says
otherwise. Recorded rather than quietly edited, since this file exists precisely
because unchecked citations are how the patch corpus went wrong.

Each entry records what was checked and by whom, because a citation nobody
re-read is how the patch corpus went wrong.

---

## OVER-CLAIM: `safari-webextension-types` declares `Event.hasListeners`

**Verified here.** `WebExtensionAPIEvent` in
`webkit/Source/WebKit/WebProcess/Extensions/Interfaces/WebExtensionAPIEvent.idl`
declares exactly three operations:

```webidl
[NeedsFrameIdentifier] void addListener([CallbackHandler] function listener);
[NeedsFrameIdentifier] void removeListener([CallbackHandler] function listener);
boolean hasListener([CallbackHandler] function listener);
```

`safari-webextension-types/index.d.ts:11-16` declares a fourth, `hasListeners():
boolean`, which appears in no IDL file.

Not currently emitted with a Safari claim, and only by luck: `events.Event` is
an open merge failure, so Safari's member forms are omitted wholesale. **Fixing
that merge would give `hasListeners` a Safari claim it has not earned.** Fix or
suppress this before resolving `events.Event`.

This one is a method, so it is the throwing kind: a consumer calling
`event.hasListeners()` on Safari gets a `TypeError`, not a silently dropped
option.

Action: fix in `safari-webextension-types`, whose generator hardcodes it.

## RESOLVED: the `test` namespace is no longer shipped

Safari's package declares a `test` namespace, and 22 paths under it were being
emitted as public API. WebKit's own source calls it what it is:

    // Documentation: None (Testing Only)
    -- Source/WebKit/WebProcess/Extensions/API/WebExtensionAPINamespace.cpp:350

Its members are `notifyPass`, `notifyFail` and `sendMessage` to a test harness,
not surface an extension author writes against. It is excluded via
`excluded-namespaces.json`, and the citation above is re-read by
`npm run verify:evidence --resolve`.

This also removes several of the IDL-contradicting signatures listed below,
since they were all under `test.*`.

## RESOLVED: three namespaces WebKit does not expose to a normal extension

Declaring an API in the IDL is not the same as shipping it. `WebExtensionAPINamespace.cpp`
gates each namespace, and three of those gates mean a normal extension never
sees the API, all at revision 0136fa2b:

| namespace | gate | BCD |
|---|---|---|
| `notifications` | "Notifications are currently only available in test mode as an empty stub." | `version_added: false` |
| `bookmarks` | `webExtensionBookmarksEnabled()` behind `ENABLE(WK_WEB_EXTENSIONS_BOOKMARKS)` | `version_added: false` |
| `offscreen` | `webExtensionOffscreenEnabled()` behind `ENABLE(WK_WEB_EXTENSIONS_OFFSCREEN)` | no compat node |
| `sidebarAction` | `WebExtensionSidebarEnabled`, `status: testable`, default false everywhere | `version_added: false` |
| `sidePanel` | same setting | `version_added: false` |

We were claiming Safari for 37 elements across them, on the strength of the IDL
alone. Two independent sources agree for the first two, and the third is behind
a compile flag.

Excluded per browser in `excluded-namespaces.json`; Chrome and Firefox keep
their claims. Found by extending the BCD audit to Safari, which is what an
independent oracle is for.

## ACCEPTED AND IGNORED: `scripting.RegisteredContentScript.matchOriginAsFallback`

**Verified here.** Safari accepts the key: it is in the `validateDictionary`
table at `WebExtensionAPIScriptingCocoa.mm:545`. It then does nothing with it,
four lines from the top of the same file:

    // FIXME: <https://webkit.org/b/264829> Add support for matchOriginAsFallback.

This is the mildest over-claim shape. Nothing throws and nothing fails to
compile, because `validateDictionary` skips keys it does not know. The cost is
that a developer reads `@supported ... Safari`, relies on it, and their content
script silently does not inject where they intended, with no signal anywhere.

**The member should stay; only the Safari claim should go.** Cross-browser code
has to pass this for Chrome and Firefox, and passing it where it is ignored is
harmless, so deleting the property would be the worse fix.

**Not done yet, because the machinery cannot reach it.** Exclusions operate on
namespace-level members, and this is a property INSIDE an interface, so
withdrawing it means editing one browser's declaration text rather than
dropping an element. That is an AST edit the exclusion pass does not do.

`scripting.ScriptInjection.injectImmediately` is in the same state under the
same FIXME block, and currently claims only Chrome and Firefox by accident,
because ScriptInjection is an open merge failure with Safari's forms omitted.

Two members is not a category worth building a detector for: the signal is a
FIXME comment beside a validation-table key, with no mechanical marker, and a
heuristic would fire on every other FIXME in WebKit. Revisit if a third
appears.

## OVER-CLAIM: four devtools members the Safari package invented

**Verified here.** `safari-webextension-types/scripts/generate.py:712-731` is a
hand-written "DevTools Sub-interfaces" block that reads no IDL and emits member
names as literals, for example line 727:

    lines.append('            sources: Record<string, unknown>;')

Four of them exist in no WebKit IDL file, and `git log -S` finds they never did:
`devtools.panels.sources`, `devtools.panels.elements`,
`devtools.network.getHAR`, `devtools.network.onRequestFinished`.
`WebExtensionAPIDevToolsPanels.idl` declares only `create`, `themeName` and
`onThemeChanged`. The same block also OMITS the real `onThemeChanged`.

All four Safari claims are withdrawn here. The fix belongs upstream: delete the
four, add `onThemeChanged`, and derive the devtools block from IDL like the
rest.

Worth separating from the Firefox case below, which looks similar and is not:
Gecko genuinely declares `sources` and flags its members unsupported, so
Firefox's package is faithfully reporting an inert API. Safari's is invention.

**A finding for BCD as well.** BCD records `safari: version_added 16` for
`devtools.panels.sources` and `elements`, which cannot be right if WebKit never
declared them. That looks like a blanket marking from Safari 16's devtools
launch and is worth reporting upstream.

## OVER-CLAIM: `devtools.network.getHAR` and `onRequestFinished` are fabricated

**Verified here.** `WebExtensionAPIDevToolsNetwork.idl` declares exactly one
member, `readonly attribute WebExtensionAPIEvent onNavigated`. The Safari
package declares `getHAR` and `onRequestFinished` as well; neither appears in
any IDL file. BCD agrees they are unsupported.

These are member-level, so the namespace exclusion mechanism does not reach
them: Safari genuinely implements `devtools.network.onNavigated`. They need
either an upstream fix in the package or member-level suppression here.

The same review also named `devtools.panels.elements`, `devtools.panels.sources`
and nine signatures contradicting the IDL, including `action.enable`/`disable`
taking `ActionDetails` where the IDL says `double tabId`. Those remain
unchecked; the `test.*` ones are moot now that the namespace is excluded.

## SOURCE DISAGREES WITH BCD: three members WebKit declares and BCD denies

`tabs.move`, `commands.onChanged` and
`declarativeNetRequest.onRuleMatchedDebug` are each declared in WebKit's IDL,
and BCD records `version_added: false` for Safari. One of the two is wrong and
I have not established which.

Claims left standing deliberately: the IDL is the input we derive from, and
withdrawing a claim on BCD alone would be substituting one oracle for another
rather than resolving the disagreement.

## UNDER-CLAIM: no package declares the `ExecutionWorld` value

Chrome and Firefox declare `scripting.ExecutionWorld` as a type only. Safari's
package declares it as a value as well, so our output carries both, with the
const claiming Safari alone.

**Verified here for Firefox:** `scripting.json:143` at `FIREFOX_143_0_RELEASE`
declares `"id": "ExecutionWorld"` as a string enum, and
`toolkit/components/extensions/Schemas.sys.mjs:898` is the `getDescriptor()`
that injects enum entries.

**Reported but not verified here:** that the value is therefore reachable at
runtime in Firefox, and the equivalent for Chromium via `api_binding.cc`
installing named schema enums.

The emitted note deliberately does NOT claim those runtimes expose the value,
because our inputs do not say so and the merger may not assert beyond them. If
that claim is wanted in the output it needs a cited patch, not a looser merger.

Action: both type packages could emit the value from schema data they already
have.
