# Anti-slop review, main..local-dev, 2026-09-02

Reviewer: the orchestrating session, reading the diff directly (release gate,
CAN-008). Scope: every line added since v1.1.1 under `src/`, `scripts/`,
`test/`, `docs/`, `README.md`, `build-workplan.py`: 32 files, 8135 insertions.
Mechanical pass first (grep for buzzwords, em dashes, TODOs, banners, debug
prints, empty catches, generic names, glyphs), then a read of every comment
in the new modules.

## What is fine

The code. The new modules do one thing each, the helpers have callers, there
is no defensive noise and no over-abstraction; the tests assert behaviour that
would fail without the rule under test. Five check-mark glyphs in gate output
are the existing scripts' idiom. One `const result = {` is a return object.
No TODOs in source (the one hit is plan text). No em dashes anywhere.

## What is not fine

One tell, repeated in every new file: **the comments are a session
transcript, not documentation.** A comment should say what the code does and
why the rule is what it is. These say who decided it, when, what the
alternative was, what number was measured on the day, and how the author
felt about it. That is the git log and WORKPLAN, pasted into source.

### 1. Rulings, dates and names in source comments

`grep -rn '2026-\|Patrick' src scripts test` gives 8 hits; every one goes.
The rule stays, the provenance goes to `git log` and WORKPLAN, which already
hold it.

- `src/canonical-names.ts:846` "ruled by Patrick 2026-09-02, from the eleven
  DE-PREFIX collisions this same ruling produced"
- `src/canonical-names.ts:894` "ruled by Patrick 2026-09-02"
- `src/generator.ts` (applyCanonicalNames doc) "ruled by Patrick 2026-09-02"
- `scripts/derive-names.ts:84` "(Patrick, 2026-09-02)"
- `scripts/derive-names.ts:245` "Ruled by Patrick 2026-09-02, from
  declarativeNetRequest.RuleActionType."
- `scripts/verify-widening.ts:6` "Ruled by Patrick 2026-09-02"
- `test/canonical-names.test.ts:283`, `:563`

### 2. Measured-on-the-day numbers in comments

They are true today and wrong after the next upstream bump, and nothing
updates them. Replace with the rule, or delete.

- `src/canonical-names.ts:906` "the 38 underscore names no slot ever
  references and the 117 referenced only from inside"
- `scripts/verify-widening.ts:8` "21 members escaped this"
- `scripts/derive-names.ts:165` "menus/contextMenus's own
  `CreateProperties.icons`/`.command` are exactly this"

### 3. Emphasis by capitals and double-dash asides

`\b[A-Z]{3,}\b` inside comments: `NEXT TO`, `ANY`, `IS`, `OWN`, `THIS`,
`CURRENT`, `REAL`, `RAW`, `PLUS`, `THREE`, `MEMBER`, `ARTIFACT LEAK`,
`UNCONVERGED SLOT`, `SELF-CONSISTENCY`, `UPSTREAM CROSS-CHECK`. Counts:
canonical-names.ts 13, derive-names.ts 23, verify-names.ts 15,
verify-widening.ts 10, verify-gecko-pin.ts 7. Use plain words; where the
capitals mark a section, use a sentence.

` -- ` asides: derive-names.ts 6, verify-names.ts 8, canonical-names.ts 2.
Each is a sentence trying to be two; split it.

### 4. Comments narrating the reasoning process

- `scripts/derive-names.ts:155-173`: 19 lines on why pass 1 and pass 2
  cannot tell an already-resolved slot from a never-contested one, ending in
  "so the leftover list can simply be the union of every pass's leftovers
  with no staleness risk." The rule is three lines: a slot is decided at
  most once, in the first pass where it is visible and undecided; crossNamespace
  is read from pass 1; leftovers are the union across passes.
- `scripts/derive-names.ts:180-188` and `:198-203`: same shape.
- `src/canonical-names.ts:846-872` (alias collapse, 27 lines) and
  `:894-919` (de-prefix, 26 lines): each should be under eight, stating the
  rule, what qualifies, what does not, and what a collision does.
- `src/canonical-names.ts:697-716`: "would otherwise keep whatever name its
  lone contributor gave it, even when a sibling namespace ... already
  resolved the identical slot" is the reasoning; the rule is one sentence.
- `scripts/verify-names.ts:1-60`: the header walks through hypotheticals
  ("If the upstream packages move ... faster than derive-names.ts is re-run
  ... nothing else notices: the merger still emits *something*"). State the
  three checks and what each fails on.
- `scripts/verify-widening.ts:1-30`: same, including "(this is what makes
  check:pruned's '@note optional in' scan meaningful, and what CLAUDE.md
  rule 7 means by ...)".

### 5. Banner separators

`scripts/verify-names.ts:82`, `:164`, `:248`: `// ─── Check 1: ... ───`
box-drawing lines. Nothing else in the repo uses them. Plain `// Check 1.`

### 6. Comments restating the next line

`src/canonical-names.ts:566` "Assemble groups.", `:593` "Who contributes
what.", `:619` "Choose the name among contributors that ship the namespace
to stable." Delete; the code says it.

## Standard for the fix

Each file should read as one competent person's code, written for themselves,
in the idiom of the file it sits next to (`src/generator.ts` before today).
A comment earns its place by stating a rule or a non-obvious constraint. No
dates, no names, no numbers measured on a given day, no capitals for
emphasis, no asides, no section banners. Module headers: what the module
does, the rules it applies, the inputs and outputs. Everything else this
review lists is already in WORKPLAN.md and the commit messages.

Behaviour must not change: `npm run check` green before and after, and
`git diff --stat dist/` empty after the fix, since comments do not reach the
output.
