/**
 * Coverage for the merge branches that the corpus never reaches.
 *
 * `dist/merge-issues.json` is empty: with the current Chrome and Firefox
 * packages, no element takes any of these paths. The byte-identity check that
 * guards the refactor sequence therefore proves nothing about them.
 *
 * Written before the N-ary merge conversion on purpose, since byte-identity
 * stops being available the moment a third browser's data flows.
 *
 * ASSERTION RULES:
 *
 *  - Anchor provenance regexes. `/@supported Chrome/` also matches
 *    "@supported Chrome, Firefox", so a test meant to catch a false support
 *    claim happily passed on one.
 *  - Assert what is EMITTED, not only that an issue fired. A branch that
 *    reports a problem while shipping the wrong declaration is the failure
 *    that costs something.
 *  - Assert the negative too: the other browser's text absent, and the
 *    declaration emitted exactly once. A duplicate declaration is invalid
 *    TypeScript, and asserting only presence does not catch one.
 *  - One branch per test, with an assertion unique to that branch. Two tests
 *    sharing a fixture and an either/or regex cover for each other, so
 *    deleting either branch passed the whole suite.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  emitDtsDetailed,
  mkElement,
  type IRElement,
  type IRNamespace,
} from "../src/generator";

function irOf(
  elements: Array<{
    ns: string;
    name: string;
    kind: IRElement["kind"];
    chrome?: string;
    firefox?: string;
    safari?: string;
  }>
): Map<string, IRNamespace> {
  const out = new Map<string, IRNamespace>();
  for (const el of elements) {
    if (!out.has(el.ns)) {
      out.set(el.ns, { name: el.ns, elements: new Map<string, IRElement>() });
    }
    out.get(el.ns)!.elements.set(
      el.name,
      mkElement(el.name, el.kind, {
        chrome: { source: el.chrome },
        firefox: { source: el.firefox },
        safari: { source: el.safari },
      })
    );
  }
  return out;
}

const reasons = (r: ReturnType<typeof emitDtsDetailed>) => r.issues.map((i) => i.reason).join(" | ");
const count = (hay: string, needle: RegExp) => hay.match(needle)?.length ?? 0;
/**
 * Provenance must be matched to the END of its tag, or "Chrome" matches
 * "Chrome, Firefox". Both emitted shapes have to be accepted: a member with a
 * note gets a multi-line comment, one without gets `/** @supported X *\/` on a
 * single line, and matching only the first silently passed a correct result as
 * a failure.
 */
const supported = (dts: string, exact: string) =>
  new RegExp(`@supported ${exact}\\s*(\\*/|\\n)`).test(dts);

describe("merge branches the corpus never reaches", () => {
  it("interface: unparseable source is emitted raw, not dropped", () => {
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "Weird", kind: "interface", chrome: "export type Weird = string;" }])
    );
    assert.match(reasons(r), /not parseable as an interface/);
    assert.match(r.dts, /export type Weird = string;/);
    assert.ok(supported(r.dts, "Chrome"), "must claim Chrome only");
    assert.ok(!supported(r.dts, "Chrome, Firefox"), "must not claim Firefox");
  });

  it("interface: both sides unparseable and identical emits once, claims both", () => {
    const src = "export type Both = number;";
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "Both", kind: "interface", chrome: src, firefox: src }])
    );
    assert.equal(count(r.dts, /export type Both/g), 1, "must emit exactly once");
    assert.ok(supported(r.dts, "Chrome, Firefox"));
  });

  it("interface: both sides unparseable and DIFFERENT keeps Chrome, claims Chrome only", () => {
    const r = emitDtsDetailed(
      irOf([{
        ns: "alpha", name: "Split", kind: "interface",
        chrome: "export type Split = 1;",
        firefox: "export type Split = 2;",
      }])
    );
    assert.match(reasons(r), /declarations differ/);
    assert.match(r.dts, /export type Split = 1;/);
    assert.doesNotMatch(r.dts, /Split = 2/, "must not emit the Firefox form");
    assert.ok(supported(r.dts, "Chrome"), "must claim Chrome only");
    assert.ok(!supported(r.dts, "Chrome, Firefox"), "must not falsely claim Firefox");
  });

  it("interface: differing type parameters report AND keep Chrome's parameters", () => {
    const r = emitDtsDetailed(
      irOf([{
        ns: "alpha", name: "Box", kind: "interface",
        chrome: "export interface Box<T> { v: T; }",
        firefox: "export interface Box<T, U> { v: T; }",
      }])
    );
    assert.match(reasons(r), /type parameters differ/);
    assert.match(r.dts, /interface Box<T>/, "must keep Chrome's parameter list");
    assert.doesNotMatch(r.dts, /interface Box<T, U>/, "must not keep Firefox's");
  });

  it("type alias: unmergeable divergent forms keep Chrome, claim Chrome only", () => {
    const r = emitDtsDetailed(
      irOf([{
        ns: "alpha", name: "Shape", kind: "type",
        chrome: "export class Shape { a = 1; }",
        firefox: "export class Shape { b = 2; }",
      }])
    );
    assert.match(reasons(r), /not parseable as a type alias in Chrome, Firefox/);
    assert.match(r.dts, /class Shape \{ a = 1; \}/);
    assert.doesNotMatch(r.dts, /b = 2/);
    assert.ok(supported(r.dts, "Chrome"));
    assert.ok(!supported(r.dts, "Chrome, Firefox"), "must not falsely claim Firefox");
  });

  it("type alias: identical unmergeable forms merge silently and claim both", () => {
    const src = "export class Same { a = 1; }";
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "Same", kind: "type", chrome: src, firefox: src }])
    );
    assert.equal(reasons(r), "");
    assert.equal(count(r.dts, /class Same/g), 1);
    assert.ok(supported(r.dts, "Chrome, Firefox"));
  });

  it("type alias: differing type parameters keep Chrome and emit exactly one alias", () => {
    const r = emitDtsDetailed(
      irOf([{
        ns: "alpha", name: "Pair", kind: "type",
        chrome: "export type Pair<T> = [T, T];",
        firefox: "export type Pair<T, U> = [T, U];",
      }])
    );
    assert.match(reasons(r), /type parameters differ/);
    assert.match(r.dts, /export type Pair<T> = \[T, T\];/);
    assert.doesNotMatch(r.dts, /Pair<T, U>/, "emitting both is a duplicate identifier");
    assert.equal(count(r.dts, /export type Pair/g), 1);
    assert.ok(supported(r.dts, "Chrome"));
  });

  it("emit: an element that produces no output raises the element-level issue", () => {
    // Empty source is the only shape that reaches these branches (verified by
    // probing every alternative). It is producible: a replace-mode patch with
    // `overrideChrome: ""` passes validatePatch's `!== undefined` check.
    // The two emit tests share this fixture deliberately but assert DIFFERENT
    // issue objects, so deleting either branch fails exactly one test. A
    // disjunction over both messages would let each branch cover for the other.
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "Ghost", kind: "function", chrome: "" }])
    );
    const elementIssue = r.issues.find((i) => i.element === "Ghost");
    assert.ok(elementIssue, "an element-level issue must name the element");
    assert.equal(elementIssue!.kind, "function", "element issue carries the element kind");
    assert.match(elementIssue!.reason, /produced no output/);
  });

  it("emit: a namespace with elements but no output raises the namespace-level issue", () => {
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "Ghost", kind: "function", chrome: "" }])
    );
    const nsIssue = r.issues.find((i) => i.element === "*");
    assert.ok(nsIssue, "a namespace-level issue must be raised separately");
    assert.equal(nsIssue!.kind, "namespace");
    assert.match(nsIssue!.reason, /emitted nothing/);
    assert.match(nsIssue!.reason, /1 IR element/, "must report how many elements were lost");
  });

  it("interface: a target build keeps the TARGET's unparseable form, not the first browser's", () => {
    // Keeping the first browser's text and claiming only that browser deleted
    // the element from every other target's build: a firefox-only build lost an
    // interface Firefox declares and reported it as "produced no output".
    const ir = () => ({
      ns: "alpha", name: "Split", kind: "interface" as const,
      chrome: "export type Split = 1;",
      firefox: "export type Split = 2;",
    });
    const ff = emitDtsDetailed(irOf([ir()]), "firefox");
    assert.match(ff.dts, /export type Split = 2;/, "must emit Firefox's own form");
    assert.doesNotMatch(ff.dts, /Split = 1/, "must not emit Chrome's form in a Firefox build");
    assert.ok(supported(ff.dts, "Firefox"), "must claim Firefox");
    assert.doesNotMatch(reasons(ff), /produced no output/, "must not report the element as lost");

    const chrome = emitDtsDetailed(irOf([ir()]), "chrome");
    assert.match(chrome.dts, /export type Split = 1;/, "a Chrome build still keeps Chrome's form");
  });

  it("emit: target pruning does not report a legitimately absent element", () => {
    const r = emitDtsDetailed(
      irOf([{ ns: "alpha", name: "FfOnly", kind: "type", firefox: "export type FfOnly = 1;" }]),
      "chrome"
    );
    assert.equal(reasons(r), "");
    assert.doesNotMatch(r.dts, /FfOnly/);
  });

  // ---- three browsers -------------------------------------------------------
  // BROWSER_ORDER carries a third id with no upstream feeding it, so these are
  // the only exercise the N-ary folds get. Every one of them was written after
  // the conversion, against code that had never run with more than two.

  it("interface property: three differing types union into three arms, claiming all three", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Trio", kind: "interface",
      chrome: "export interface Trio { v: string; }",
      firefox: "export interface Trio { v: number; }",
      safari: "export interface Trio { v: boolean; }",
    }]));
    assert.match(r.dts, /v: string \| number \| boolean;/);
    assert.ok(supported(r.dts, "Chrome, Firefox, Safari"));
  });

  it("interface property: two browsers agreeing must not produce a repeated arm", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Dup", kind: "interface",
      chrome: "export interface Dup { v: string; }",
      firefox: "export interface Dup { v: number; }",
      safari: "export interface Dup { v: string; }",
    }]));
    // Scoped to the member declaration: the emitted preamble legitimately
    // contains "string" many times, so counting it file-wide fails on a
    // correct result.
    const member = /v: ([^;]+);/.exec(r.dts)?.[1] ?? "";
    assert.equal(member, "string | number", "an agreeing browser must not add a repeated arm");
  });

  it("interface member declared by two of three claims exactly those two", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Partial", kind: "interface",
      chrome: "export interface Partial { both: string; }",
      firefox: "export interface Partial { }",
      safari: "export interface Partial { both: string; }",
    }]));
    // Scoped to the member: the INTERFACE is legitimately supported by all
    // three, so asserting the three-browser string absent from the whole file
    // fails on a correct result.
    assert.match(r.dts, /@supported Chrome, Safari \*\/\s*\n\s*both: string;/,
      "the member must claim exactly the two browsers that declare it");
  });

  it("type alias: two browsers agreeing collapse to one arm, the third adds one", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Three", kind: "type",
      chrome: "export type Three = 1;",
      firefox: "export type Three = 2;",
      safari: "export type Three = 1;",
    }]));
    assert.match(r.dts, /export type Three = 1 \| 2;/, "identical arms must not repeat");
    assert.ok(supported(r.dts, "Chrome, Firefox, Safari"));
  });

  it("variable: three types union in browser order", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "v", kind: "variable",
      chrome: "export const v: A;", firefox: "export const v: B;", safari: "export const v: C;",
    }]));
    assert.match(r.dts, /export const v: A \| B \| C;/);
  });

  it("function: an overload all three share is emitted once carrying all three", () => {
    const shared = "export function f(a: string): void;";
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "f", kind: "function",
      chrome: shared, firefox: shared, safari: shared + "\nexport function f(a: number): void;",
    }]));
    assert.equal(count(r.dts, /function f\(a: string\)/g), 1, "shared overload must not repeat");
    assert.ok(supported(r.dts, "Chrome, Firefox, Safari"));
    assert.match(r.dts, /function f\(a: number\)/, "the safari-only overload must survive");
    assert.ok(supported(r.dts, "Safari"), "and must claim Safari alone");
  });

  it("interface index signature: agreeing browsers do not repeat a value-type arm", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Bag", kind: "interface",
      chrome: "export interface Bag { [k: string]: string; }",
      firefox: "export interface Bag { [k: string]: number; }",
      safari: "export interface Bag { [k: string]: string; }",
    }]));
    const sig = /\[k: string\]: ([^;]+);/.exec(r.dts)?.[1] ?? "";
    assert.equal(sig, "string | number", "TS2374 forbids duplicate index signatures");
  });

  it("union arms are deduped the way every other fold compares types", () => {
    // Raw string equality is not the repo's notion of "same type". Sibling
    // folds compare canonicalized text, so an arm differing only in spacing,
    // or an events.Event/WebExtEvent pair the canonicalizer already unifies,
    // must not become a second arm.
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Same", kind: "interface",
      chrome: "export interface Same { v: {a: string}; }",
      firefox: "export interface Same { v: number; }",
      safari: "export interface Same { v: { a: string }; }",
    }]));
    assert.equal(/v: ([^;]+);/.exec(r.dts)?.[1], "{a: string} | number");

    const w = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Wrapped", kind: "interface",
      chrome: "export interface Wrapped { v: events.Event<() => void>; }",
      firefox: "export interface Wrapped { v: number; }",
      safari: "export interface Wrapped { v: WebExtEvent<() => void>; }",
    }]));
    assert.equal(/v: ([^;]+);/.exec(w.dts)?.[1], "events.Event<() => void> | number");
  });

  it("a function-typed arm is parenthesised, or the union binds inside its return", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Fn", kind: "interface",
      chrome: "export interface Fn { v: () => string; }",
      firefox: "export interface Fn { v: () => number; }",
      safari: "export interface Fn { v: () => boolean; }",
    }]));
    assert.equal(/v: ([^;]+);/.exec(r.dts)?.[1], "(() => string) | (() => number) | (() => boolean)");
  });

  it("a plain union arm is left unbracketed, since unions are associative", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Flat", kind: "interface",
      chrome: "export interface Flat { v: string; }",
      firefox: "export interface Flat { v: number | undefined; }",
      safari: "export interface Flat { v: boolean; }",
    }]));
    assert.equal(/v: ([^;]+);/.exec(r.dts)?.[1], "string | number | undefined | boolean");
  });

  it("a browser whose type parameters differ contributes no member forms", () => {
    // Emitting its members under the kept parameter list produced
    // `Cannot find name 'T'` in the shipped declarations: Safari declares
    // Event<T> where Chrome declares Event<H>, so Safari's
    // `addListener(callback: T)` named a parameter that no longer existed.
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Ev", kind: "interface",
      // Differing ARITY, so the positional rename cannot apply: with the same
      // arity these would now merge, which is the point of that rule.
      chrome: "export interface Ev<H> { addListener(cb: H): void; }",
      firefox: "export interface Ev<H> { addListener(cb: H): void; }",
      safari: "export interface Ev<T, U> { addListener(cb: T): void; onFired: U; }",
    }]));
    assert.match(r.dts, /interface Ev<H>/, "the first browser's parameter list is kept");
    assert.doesNotMatch(r.dts, /\bT\b/, "no member may name a discarded parameter");
    assert.doesNotMatch(r.dts, /onFired/, "nor may a member unique to the dropped form survive");
    assert.match(reasons(r), /member forms omitted/, "and the omission is reported");
    assert.ok(supported(r.dts, "Chrome, Firefox"), "support drops with the form");
  });

  it("the same generic under different letters is one type, not a dropped browser", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Res", kind: "interface",
      chrome: "export interface Res<R = unknown> { value: R; }",
      firefox: "export interface Res<R = unknown> { value: R; }",
      safari: "export interface Res<T = unknown> { value: T; }",
    }]));
    assert.equal(reasons(r), "", "renaming is not a merge failure");
    assert.match(r.dts, /interface Res<R = unknown>/);
    assert.equal(count(r.dts, /value\??:/g), 1, "one member, not one per spelling");
    assert.ok(supported(r.dts, "Chrome, Firefox, Safari"));
  });

  it("an ungeneric declaration equals the generic at its defaults", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Chg", kind: "interface",
      chrome: "export interface Chg<T = unknown> { oldValue?: T; }",
      firefox: "export interface Chg<T = unknown> { oldValue?: T; }",
      safari: "export interface Chg { oldValue?: unknown; }",
    }]));
    assert.equal(reasons(r), "");
    assert.match(r.dts, /interface Chg<T = unknown>/, "the parameterized form is kept");
    assert.match(r.dts, /oldValue\?: T;/, "and its members stay generic");
    assert.ok(supported(r.dts, "Chrome, Firefox, Safari"));
  });

  it("an ungeneric declaration whose members DIFFER is still a merge failure", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Nope", kind: "interface",
      chrome: "export interface Nope<T = unknown> { a?: T; }",
      firefox: "export interface Nope<T = unknown> { a?: T; }",
      safari: "export interface Nope { a?: string; }",
    }]));
    assert.match(reasons(r), /type parameters differ/, "substitution must not paper over a real difference");
    assert.ok(supported(r.dts, "Chrome, Firefox"));
  });

  it("differing arity is not renameable and stays a merge failure", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Ev2", kind: "interface",
      chrome: "export interface Ev2<H, C = void> { on(cb: H): void; }",
      firefox: "export interface Ev2<H, C = void> { on(cb: H): void; }",
      safari: "export interface Ev2<T> { on(cb: T): void; }",
    }]));
    assert.match(reasons(r), /type parameters differ/);
  });

  // ---- the rename rule must not rewrite things that are not type references --

  it("a property named like a type parameter is not renamed into a duplicate", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "P", kind: "interface",
      chrome: "export interface P<R = unknown> { R: string; value: R; }",
      firefox: "export interface P<R = unknown> { R: string; value: R; }",
      safari: "export interface P<T = unknown> { T: string; value: T; }",
    }]));
    assert.match(r.dts, /T: string;/, "Safari's property keeps its own name");
    assert.equal(count(r.dts, /^\s+R: string;$/gm), 1, "emitting R twice is invalid TypeScript");
  });

  it("a string literal type is not rewritten by the rename", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "S", kind: "interface",
      chrome: 'export interface S<R = unknown> { kind: "R"; v: R; }',
      firefox: 'export interface S<R = unknown> { kind: "R"; v: R; }',
      safari: 'export interface S<T = unknown> { kind: "T"; v: T; }',
    }]));
    // Rewriting "T" to "R" claimed a type no browser declares.
    assert.match(r.dts, /kind: "R" \| "T";/, "the literals differ and must be unioned, not rewritten");
  });

  it("a rename that would capture an existing member name is refused", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "C", kind: "interface",
      chrome: "export interface C<R = unknown> { a: R; }",
      firefox: "export interface C<R = unknown> { a: R; }",
      safari: "export interface C<T = unknown> { R: string; a: T; }",
    }]));
    assert.match(reasons(r), /type parameters differ/, "capture risk must refuse the merge");
  });

  it("substitution applies only to a top-type default", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "N", kind: "interface",
      chrome: "export interface N<T = string> { a?: T; }",
      firefox: "export interface N<T = string> { a?: T; }",
      safari: "export interface N { a?: string; }",
    }]));
    // Adopting the generic text here would claim Safari for every
    // instantiation, when it supports exactly the string one.
    assert.match(reasons(r), /type parameters differ/);
    assert.ok(supported(r.dts, "Chrome, Firefox"));
  });

  it("a closed set declared as a type in one browser and a value in another emits both", () => {
    // TypeScript keeps type and value declaration spaces separate, so one name
    // can carry both. Each claims exactly the browsers whose input declares it:
    // the const is NOT claimed for the browsers that only declare the type,
    // even where their implementations expose the value.
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "World", kind: "type",
      chrome: 'export type World = "ISOLATED" | "MAIN";',
      firefox: 'export type World = "ISOLATED" | "MAIN";',
      safari: 'export const World: { readonly ISOLATED: "ISOLATED"; readonly MAIN: "MAIN" };',
    }]));
    assert.equal(reasons(r), "", "a value mirror is not a merge failure");
    assert.match(r.dts, /export type World = "ISOLATED" \| "MAIN";/);
    assert.match(r.dts, /export const World: \{ readonly ISOLATED/);
    assert.ok(supported(r.dts, "Chrome, Firefox"), "the type claims the browsers declaring a type");
    assert.ok(supported(r.dts, "Safari"), "the const claims only the browser declaring a value");
  });

  it("a value whose members do NOT match the type is still a merge failure", () => {
    const r = emitDtsDetailed(irOf([{
      ns: "alpha", name: "Off", kind: "type",
      chrome: 'export type Off = "A" | "B";',
      firefox: 'export type Off = "A" | "B";',
      safari: 'export const Off: { readonly A: "A" };',
    }]));
    assert.match(reasons(r), /not parseable as a type alias in Safari/,
      "a near-miss set is a real difference, not a mirror");
  });
});
