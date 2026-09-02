# WebKit analysis against the local checkout

Recovers the real parameter shapes for WebKit's `any` extension-API parameters
from the Cocoa implementation at `~/webkit` (`WebKit/WebKit`, 319,244 commits),
instead of guessing them from dictionary names.

Reproduce: `python3 analyze-webkit-impl.py` (writes `webkit-impl-analysis.json`).

---

## Why this was needed

WORKPLAN workstream D lists 104 operations declared `[NSDictionary] any` in
WebKit's WebIDL and pairs each with a "candidate dictionary" chosen by **name
matching**. That is the same technique that produced a 75% false-positive rate
earlier in this project, and review already found four rows wrong,
including `i18n.getMessage(substitutions)` mapped to
`WebExtensionLanguageDetectionResult`.

The Cocoa layer does not guess. It validates each dictionary against an explicit
table:

```objc
static NSDictionary<NSString *, id> *types = @{
    @"name":    NSString.class,
    storeIdKey: NSString.class,
    urlKey:     NSString.class,
};
validateDictionary(details, @"details", requiredKeys, types, outExceptionString);
```

That table is the parameter schema: every accepted key, its type, and via
`requiredKeys` whether it is required.

---

## What was recovered

| Metric | Value |
|---|---|
| Key-name constants resolved (`WebExtensionAPIKeys.h` and friends) | 495 |
| Validation tables extracted | 30 |
| Tables whose key set exactly matches an IDL dictionary | **14** |
| `any`-param operations in a namespace with an extracted table | 54 of 104 |

The 14 exact matches are now **source-verified** mappings rather than
name-matched guesses. `cookies.get` is the clean example: the implementation
accepts exactly `name`, `storeId`, `url`, all `NSString`, which is precisely
`WebExtensionCookieDetails`. That row of workstream D can be executed with
confidence.

---

## Finding: the orphaned dictionaries are not always complete

This changes how workstream D should be done.

`WebExtensionScriptInjection` declares `args`, `files`, `func`, `target`,
`world`. The implementation accepts **two more keys**:

```objc
// WebExtensionAPIScriptingCocoa.mm:405,408
argumentsKey: NSArray.class,
functionKey : JSValue.class,
// :419  error if both `function` and `func` are supplied
// :424  error if both `arguments` and `args` are supplied
// :429  usedFunctionKey = script[funcKey] ? funcKey : functionKey
// :441  usedArgumentKey  = script[argsKey] ? argsKey : argumentsKey
```

with `argumentsKey = @"arguments"` and `functionKey = @"function"` defined in
`Source/WebKit/WebProcess/Extensions/API/WebExtensionAPIKeys.h:49,110`.

So Safari accepts both the Chrome-style `args`/`func` and legacy
`arguments`/`function` aliases, rejecting the combination of both. The declared
IDL dictionary omits the aliases entirely.

**Consequence for workstream D:** "wire the declared dictionary into the
operation" is not automatically correct. Doing that for
`scripting.executeScript` would produce a type that rejects `arguments` and
`function`, which the implementation accepts today. Each of the 104 rows must be
checked against the validation table, and where the two disagree the IDL
dictionary needs extending, not just referencing.

Other tables where the implementation accepts keys the paired dictionary omits:
`bookmarks.createBookmark` (`type`), `menus.parseCreateAndUpdateProperties`
(`iconVariants`, `icon_variants`), `tabs.move` (`index`). Each still needs the
per-row check below before being treated as a finding.

---

## A false positive in my own tool, and what it means

My pairing logic reported `webNavigation.getFrame` as accepting an undeclared
`frameId`. That is wrong. `WebExtensionWebNavigationGetFrameDetails` declares
`frameId`, `processId`, `tabId`. What happened is that the tool matched the
`{tabId, frameId}` table against `WebExtensionWebNavigationGetAllFramesDetails`
(the `{tabId}` dictionary) because it was *a* superset match, and then reported
the difference.

That is the name-matching trap again, this time in the tool built to escape it.
So the honest position on this pass:

- **The extracted validation tables are reliable.** They come from the source and
  the extraction is mechanical.
- **The IDL pairing is not.** It is a heuristic, and it produces false positives.
  Every pairing needs a human to confirm which dictionary the operation is
  actually about.

Two extraction bugs were also caught and fixed along the way: multiple functions
declare a local table named `types`, so a name-keyed lookup silently attributed
one function's table to every call in the file (visible as every `action.*`
function appearing to accept only `popup`); and preprocessor directives inside
the table body were being parsed as dictionary entries.

---

## Coverage limits, stated plainly

Only **54 of the 104** `any`-param operations live in a namespace where a
validation table was extracted, and 30 tables do not cover 54 operations
one-to-one. Namespaces with `any` parameters but **no** extracted table:

`Alarms, DOM, Extension, Localization, Permissions, Port, Runtime, SidePanel,
SidebarAction, StorageArea, Test, WebNavigationEvent, WebPageRuntime,
WebRequestEvent, Windows, WindowsEvent`

Those either validate through a shared `parse*` helper the extractor does not
follow, or do not use `validateDictionary` at all. **Absence of a table is not
evidence that a parameter is unconstrained**, and it must not be reported as
such. Extending the extractor to follow the `parse*` helpers is the obvious next
step if this workstream proceeds.

---

## Effect on the plan

1. Workstream D's candidate-dictionary column should be **replaced** by the
   validated key tables for the 14 confirmed rows, and marked unverified for the
   rest, rather than shipped as if all 104 were known.
2. Add a prerequisite item: for each PR in workstream D, diff the IDL dictionary
   against the Cocoa validation table first, and extend the dictionary where the
   implementation accepts more. `scripting` is the known case.
3. The suggested pilot files (Cookies, Alarms) should become
   **Cookies and Bookmarks**: Cookies is a verified exact match, Bookmarks has a
   real, small discrepancy (`type`) that exercises the extend-the-dictionary
   path. Alarms has no extracted table, so it is a poor pilot.
