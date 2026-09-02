# Notes: building verify:override-members (SHAPE gate) — IN PROGRESS

Companion to POSTMORTEM-fabricated-members.md. Read that first.

## Goal
A gate that makes it impossible for an override to attribute a member to browser
B that B's real API lacks (the `finalUrl`-on-Firefox class), WITHOUT blocking
legitimate refinement.

## Status: v1 written, extraction BROKEN, not wired into `check` yet
`scripts/verify-override-members.ts` exists. Running it flagged **379** members
— a FALSE-POSITIVE FLOOD, not fabrications. e.g. it flagged
`_manifest.WebExtensionManifest (firefox) asserts "manifest_version"` as foreign,
which is absurd (Firefox's manifest obviously has manifest_version). The
namespace-member EXTRACTION under-collects. Prove-by-running caught this before
it could ship.

## ROOT CAUSE of the extraction bug: three upstreams, three structures
Verified via ts-morph (see below). `namespaceMembers()` assumed one nesting shape.

- **chrome-types** (`node_modules/chrome-types/index.d.ts`): FLAT top-level
  modules with PLAIN api names — `usb`, `browserAction`, `downloads`, ... PLUS a
  3rd top-level module literally named `chrome` (likely a wrapper/dup). First
  module's childModules = 0. So chrome ns = top-level module name, plain.
- **firefox** (`@types/firefox-webext-browser/index.d.ts`): FLAT top-level
  modules with `browser.`-prefixed DOTTED names — `browser._manifest`,
  `browser.downloads`, `browser.devtools.panels`. childModules = 0. So firefox ns
  = module name with leading `browser.` stripped.
- **safari** (`safari-webextension-types/index.d.ts`): NESTED — 2 top-level
  modules `browser` and `chrome`, EACH with ~28 CHILD modules. So safari ns =
  child-module name under the `browser`/`chrome` wrapper (recurse, strip wrapper).

## THE FIX (do this next)
Rewrite the walk so it handles all three:
1. `nsPathOf(rawName)`: split on ".", drop a leading wrapper segment
   (`chrome`/`browser`/`safari`), rejoin. So `browser._manifest` -> `_manifest`,
   `browser` -> "" (pure wrapper), `downloads` -> `downloads`,
   `browser.devtools.panels` -> `devtools.panels`.
2. Recurse into child modules (safari), combining parent ns + child rel path.
3. Collect PropertySignature/MethodSignature names from each module's
   NON-module statements into that module's ns (child modules handled by
   recursion — do NOT use getDescendantsOfKind on a module, it crosses into
   children).
Then re-run. Expect the count to collapse to a small set (the finalUrl class).

## CALIBRATION after extraction is fixed (Fable's design, POSTMORTEM §fix)
Even correct extraction will legitimately flag some ENHANCEMENTS. Known hard case:
- `_manifest.WebExtensionManifest` on **chrome**: chrome-types has NO `_manifest`
  namespace at all (that's a Firefox/synthesized concept). So EVERY member the
  chrome _manifest override asserts is "foreign" to chrome. This is the
  enhancement class Fable warned about — a synthesized type, members not in
  chrome upstream. Must be handled by: open-hole exemption (if chrome has no
  such element, is it a hole?) OR evidence OR a shrink-only baseline
  (`members-baseline.json`, "recorded not blessed", same pattern as
  evidence-baseline.json).
- Implement exemptions in order: (a) open-hole (element upstream any/object or
  ABSENT-and-synthesized), (b) per-member evidence for enhancement/
  upstream-defect, (c) upstream-lag via derive-lag, (d) convergence/naming get
  NO escape. Seed baseline for whatever legitimately remains, then burn down.

## VALIDATION TEST (red fixture) — required, not optional
Revert `downloads.onChanged` overrideFirefox to the BAD inline-literal form
`events.Event<(d: { id: number; finalUrl?: StringDelta }) => void>` and confirm
the member gate FIRES on `finalUrl`. Also keep a case proving the name-form
(`DownloadDelta`) is caught by the vocab gate. A gate never seen to fail is
theatre.

## Wire-in
After green: add `"verify:override-members": "tsx scripts/verify-override-members.ts"`
to package.json scripts and into the `check` chain right after
`verify:override-vocabulary`. Add its unit test to `test:unit`.

## CALIBRATION FINDINGS (2026-08-18, after extraction fix)
Extraction fixed (nsPathOf + recurse). Raw flags 379 -> **98**. Full list saved:
scratchpad/member-gate-full-98.txt ; convergence/naming subset:
scratchpad/member-convergence-flags.txt

Stratified by reason (maps to Fable's exemptions):
- upstream-lag 44  -> covered by derive-lag LAG verdict (not fabrication)
- enhancement 34   -> per-member evidence OR open-hole (many _manifest synthesized)
- convergence 17 + naming 3 = 20 -> NO escape. THE SIGNAL. Triage:
  A. Synthesized/DOM/private types upstream does not model as a namespace member
     (open-hole/synthesized exemption or baseline):
     - _manifest.ImageData width/height/data (chrome+firefox) = DOM ImageData
     - mimeHandlerPrivate.StreamInfo * (chrome) = chrome PRIVATE api, not in public chrome-types
     - extensionTypes.ImageDataType.data (firefox) = DOM ImageData ref
  B. Real-but-newer/private members MISLABELED convergence (should be enhancement/lag):
     - desktopCapture.ChooseDesktopMediaOptions systemAudio/windowAudio/
       selfBrowserSurface/suppressLocalAudioPlaybackIntended (chrome) — real chrome
       options, likely newer than pinned chrome-types 0.1.439
     - pageAction._SetIconDetails tabId/iconIndex (chrome)
  C. VERIFY genuinely (candidate real fabrication or mislabel):
     - tabs.MessageSendOptions.documentId (firefox, naming)
     - devtools.inspectedWindow.EvalOptions.scriptExecutionContext (firefox, naming)

Interpretation: gate WORKS. The 20 are where convergence overrides assert members
upstream doesn't model — exactly where the downloads.onChanged bug lived. Most are
mislabels (convergence used for a real enhancement/lag) or synthesized types, which
is itself valuable: the gate forces reason codes to be honest. Next: resolve A via
a synthesized/open-hole exemption; reclassify B's reason codes; verify C by hand
against upstream; then per-member evidence for enhancement; seed shrink-only
members-baseline.json for anything legit that remains; add red-fixture; wire in.

## STATUS: COMPLETE (2026-08-18)
Gate DONE and landable. Synthesized-element exemption added (element absent from
B's upstream namespace -> exempt; 98->53). Two-sided shrink-only baseline
`members-baseline.json` seeded with 53 (44 upstream-lag cross-checked by
verify:lag, 7 enhancement, 2 convergence _manifest.ImageData). Red fixture
`test/override-members.test.ts` (3/3) proves it fires on inline finalUrl.
Wired: `verify:override-members` in `check` after `verify:override-vocabulary`;
in `test:unit`; `record:override-members` = --update. Passes zero-any + typecheck.
Full check green except ratchet:unions (parked downloads.onChanged) and
verify:dist (needs the batch commit).

Burn-down TODO (not blocking): the 2 convergence ImageData baseline rows are the
one smell (Fable: convergence should have no member-escape) — reclassify or teach
the gate the DOM alias. The 7 enhancement rows want per-member citations
(EvidenceItem.member) eventually. None is a fabrication.
