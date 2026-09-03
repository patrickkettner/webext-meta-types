/**
 * scripts/verify-exclusions.ts's classifyExclusions on synthetic IRs: an
 * entry whose browser still declares the target comes back LOAD-BEARING, and
 * one whose target that browser never declared (already inert, no gate would
 * catch it) comes back INERT and would fail `npm run verify:exclusions`.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkElement, type IRNamespace, type BrowserId } from "../src/generator";
import {
  classifyExclusions,
  type MemberEntry,
  type NamespaceEntry,
} from "../scripts/verify-exclusions";

/** Same shape as test/verify-names.test.ts's irOf: one namespace, declarations by browser. */
function irOf(decls: Array<[ns: string, browser: BrowserId, src: string]>): Map<string, IRNamespace> {
  const ir = new Map<string, IRNamespace>();
  for (const [nsName, b, src] of decls) {
    const m = /^export (?:interface|type|function) (\w+)/.exec(src);
    if (!m) throw new Error(`bad decl: ${src}`);
    const kind = src.startsWith("export function") ? "function"
      : src.startsWith("export interface") ? "interface" : "type";
    const ns = ir.get(nsName) ?? { name: nsName, elements: new Map() };
    ir.set(nsName, ns);
    const el = ns.elements.get(m[1]) ?? mkElement(m[1], kind);
    const prior = el.sources.get(b);
    el.sources.set(b, prior ? `${prior}\n${src}` : src);
    ns.elements.set(m[1], el);
  }
  return ir;
}

describe("classifyExclusions", () => {
  it("reports LOAD-BEARING when the excluded browser actually declares the member", () => {
    const ir = irOf([
      ["test", "safari", "export function notifyPass(message?: string): void;"],
      ["test", "firefox", "export function notifyPass(message?: string): void;"],
    ]);
    const members: MemberEntry[] = [{ namespace: "test", member: "notifyPass", browser: "safari" }];
    const [result] = classifyExclusions(ir, members, []);
    assert.equal(result.verdict, "LOAD-BEARING");
  });

  it("reports INERT when the excluded browser never declared the target", () => {
    const ir = irOf([
      ["test", "firefox", "export function notifyPass(message?: string): void;"],
    ]);
    const members: MemberEntry[] = [{ namespace: "test", member: "notifyPass", browser: "safari" }];
    const [result] = classifyExclusions(ir, members, []);
    assert.equal(result.verdict, "INERT");
  });

  it("reports INERT for a namespace exclusion once the browser it names contributes nothing there", () => {
    const ir = irOf([
      ["sample", "chrome", "export function createDocument(): Promise<void>;"],
    ]);
    const namespaces: NamespaceEntry[] = [{ namespace: "sample", browser: "safari" }];
    const [result] = classifyExclusions(ir, [], namespaces);
    assert.equal(result.verdict, "INERT");
  });

  it("reports LOAD-BEARING for a namespace exclusion that empties the namespace of the excluded browser", () => {
    const ir = irOf([
      ["sample", "safari", "export function createDocument(): Promise<void>;"],
      ["sample", "chrome", "export function createDocument(): Promise<void>;"],
    ]);
    const namespaces: NamespaceEntry[] = [{ namespace: "sample", browser: "safari" }];
    const [result] = classifyExclusions(ir, [], namespaces);
    assert.equal(result.verdict, "LOAD-BEARING");
  });

  it("--filter narrows to entries whose namespace.member (or namespace) contains the substring", () => {
    const ir = irOf([
      ["test", "safari", "export function notifyPass(): void;"],
      ["sample", "safari", "export function createDocument(): Promise<void>;"],
      ["sample", "chrome", "export function createDocument(): Promise<void>;"],
    ]);
    const members: MemberEntry[] = [{ namespace: "test", member: "notifyPass", browser: "safari" }];
    const namespaces: NamespaceEntry[] = [{ namespace: "sample", browser: "safari" }];
    const results = classifyExclusions(ir, members, namespaces, "sample");
    assert.equal(results.length, 1);
    assert.equal(results[0].namespace, "sample");
  });
});
