/**
 * CAN-005's slot-convergence check (checkSlotCollisions in verify-names.ts) on
 * synthetic IRs: a slot two browsers still name differently fails, a slot
 * they agree on passes, and a deferred namespace is skipped even when its
 * slot still disagrees: deferred means nothing there has been renamed yet,
 * so a live disagreement is expected, not a regression.
 *
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkElement, type IRNamespace, type BrowserId } from "../src/generator";
import { checkSlotCollisions } from "../scripts/verify-names";

/** Same shape as test/canonical-rename.test.ts's irOf: one namespace, declarations by browser. */
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

describe("checkSlotCollisions", () => {
  it("fails when two browsers still name the same parameter slot differently", () => {
    const ir = irOf([
      ["action", "chrome", "export interface TabDetails { tabId?: number; }"],
      ["action", "chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["action", "firefox", "export interface Details { tabId?: number; }"],
      ["action", "firefox", "export function getTitle(details: Details): Promise<string>;"],
    ]);
    const { collisions, checked } = checkSlotCollisions(ir, new Set());
    assert.equal(checked, 2); // parameter + return slot for getTitle
    assert.equal(collisions.length, 1);
    assert.equal(collisions[0].namespace, "action");
    assert.equal(collisions[0].kind, "parameter");
    assert.equal(collisions[0].label, "getTitle(details)");
    assert.deepEqual(collisions[0].names.get("chrome"), ["TabDetails"]);
    assert.deepEqual(collisions[0].names.get("firefox"), ["Details"]);
  });

  it("passes when both browsers already agree on the slot's name", () => {
    const ir = irOf([
      ["action", "chrome", "export interface TabDetails { tabId?: number; }"],
      ["action", "chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["action", "firefox", "export interface TabDetails { tabId?: number; }"],
      ["action", "firefox", "export function getTitle(details: TabDetails): Promise<string>;"],
    ]);
    const { collisions } = checkSlotCollisions(ir, new Set());
    assert.deepEqual(collisions, []);
  });

  it("skips a deferred namespace even though its slot still disagrees", () => {
    const ir = irOf([
      ["action", "chrome", "export interface TabDetails { tabId?: number; }"],
      ["action", "chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["action", "firefox", "export interface Details { tabId?: number; }"],
      ["action", "firefox", "export function getTitle(details: Details): Promise<string>;"],
    ]);
    const { collisions, checked } = checkSlotCollisions(ir, new Set(["action"]));
    assert.equal(checked, 0, "a deferred namespace's slots are not even counted as checked");
    assert.deepEqual(collisions, []);
  });
});
