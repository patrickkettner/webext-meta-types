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

# Repinning safari-webextension-types

`package.json`'s `devDependencies` pins `safari-webextension-types` to a
GitHub archive tarball URL naming a commit SHA, not a semver range: the
package is not published to npm. There is no separate pin file to edit; the
commit SHA in the URL is the pin.

## Steps

1. Edit `package.json`: change the tarball URL's commit SHA to the new one,
   `https://github.com/patrickkettner/safari-webextension-types/archive/<sha>.tar.gz`.
2. `npm install`.
3. `npm run build`.
4. `npm run check`. `verify:exclusions` reports which entries in the two
   exclusion files the new pin made INERT; delete those and only those; an
   entry it still reports LOAD-BEARING stays.
5. `npm run ratchet:unions -- --update` if the union ratchet moved down.
6. Commit `package.json`, `package-lock.json`, and whatever `excluded-members.json`,
   `excluded-namespaces.json`, and `union-note-baseline.json` changes step 4 and 5 left.

The installed package's own `provenance.json` (`node_modules/safari-webextension-types/provenance.json`)
carries two different versions: `ref` (with `source`) names the WebKit
revision its `index.d.ts` declarations were shaped from, and `ship_ref` and
`ship_version` name the shipped Safari whose declarations the output is
limited to. A claim about what Safari ships rests on the second, not the
first.
