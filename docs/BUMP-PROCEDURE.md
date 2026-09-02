# Bumping the Gecko Pin

`gecko-pin.json` names the Gecko tag `derive-unsupported.ts` and `derive-lag.ts`
read. It must always match the major version of the installed
`@types/firefox-webext-browser` package. `verify:gecko-pin` checks that on
every `npm run check`; a mismatch fails and names the tag to change.

## Steps

1. Bump the package: `npm install @types/firefox-webext-browser@<new major>`.
2. Edit `gecko-pin.json`: set `tag` to the matching `FIREFOX_<major>_0_RELEASE`
   tag and `firefoxTypesMajor` to that major.
3. Re-derive against the new tag:
   - `npm run derive:unsupported`
   - `npm run verify:lag`
4. Run `npm run check`. `verify:gecko-pin` goes green once the pin and the
   package agree; the rest of check catches anything the re-derive changed.
5. Commit `package.json`, `package-lock.json`, `gecko-pin.json`, and
   `excluded-members.json` together. Splitting them leaves a commit where the
   pin and the derived file disagree, the exact drift GRD-009 exists to catch.

`verify:gecko-pin` only checks the tag resolves when a Gecko checkout is
present at `checkout`. With none, fetch one before step 3; `npm run check`
alone will not tell you the tag is real.
