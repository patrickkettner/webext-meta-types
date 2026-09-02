/**
 * The canonical-name pass (CAN-003) on synthetic IRs.
 *
 * Each case is one clause of the rule documented above applyCanonicalNames in
 * src/generator.ts, written so that dropping the clause fails it: a plain
 * rename moves text and type parameters, a merge shares an element another
 * browser already declares, a qualified reference is rewritten across
 * namespaces while literals and labels are not, a deferred namespace is left
 * alone, a same-browser many-to-one becomes the member-wise union (optional
 * wins, extends resolved first), and a type alias collision is reported.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyCanonicalNames,
  getSource,
  getTypeParams,
  hasSource,
  mkElement,
  setTypeParams,
  type BrowserId,
  type CanonicalNameMap,
  type IRNamespace,
  type MergeIssue,
} from "../src/generator";

type Decl = [ns: string, browser: BrowserId, src: string];

function irOf(decls: Decl[]): Map<string, IRNamespace> {
  const ir = new Map<string, IRNamespace>();
  for (const [nsName, b, src] of decls) {
    const m = /^(?:export )?(?:interface|type|function|const) (\w+)/.exec(src);
    if (!m) throw new Error(`bad decl: ${src}`);
    const kind = /^(?:export )?function/.test(src) ? "function"
      : /^(?:export )?interface/.test(src) ? "interface"
      : /^(?:export )?const/.test(src) ? "variable" : "type";
    const ns = ir.get(nsName) ?? { name: nsName, elements: new Map() };
    ir.set(nsName, ns);
    const el = ns.elements.get(m[1]) ?? mkElement(m[1], kind);
    const prior = el.sources.get(b);
    el.sources.set(b, prior ? `${prior}\n${src}` : src);
    ns.elements.set(m[1], el);
  }
  return ir;
}

function mapOf(rows: Array<[ns: string, browser: BrowserId, name: string, canonical: string]>, deferred: string[] = []): CanonicalNameMap {
  return {
    renames: rows.map(([namespace, browser, name, canonical]) => ({ namespace, browser, name, canonical })),
    deferred: new Set(deferred),
  };
}

describe("applyCanonicalNames", () => {
  it("renames a declaration and its references, moving the type-parameter count with it", () => {
    const ir = irOf([
      ["action", "firefox", "interface _OpenPopupOptions<T> { windowId?: T; }"],
      ["action", "firefox", "function openPopup(options?: _OpenPopupOptions<number>): Promise<boolean>;"],
    ]);
    setTypeParams(ir.get("action")!.elements.get("_OpenPopupOptions")!, "firefox", 1);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([["action", "firefox", "_OpenPopupOptions", "OpenPopupOptions"]]), issues);

    const ns = ir.get("action")!;
    assert.equal(ns.elements.has("_OpenPopupOptions"), false, "the losing element is deleted");
    const moved = ns.elements.get("OpenPopupOptions")!;
    assert.equal(getSource(moved, "firefox"), "interface OpenPopupOptions<T> { windowId?: T; }");
    assert.equal(getTypeParams(moved, "firefox"), 1);
    assert.equal(
      getSource(ns.elements.get("openPopup")!, "firefox"),
      "function openPopup(options?: OpenPopupOptions<number>): Promise<boolean>;"
    );
    assert.deepEqual(issues, []);
  });

  it("merges into a canonical element another browser already declares, leaving that browser's text alone", () => {
    const chrome = "export interface TabDetails { tabId?: number; }";
    const ir = irOf([
      ["action", "chrome", chrome],
      ["action", "chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["action", "firefox", "interface Details { tabId?: number; windowId?: number; }"],
      ["action", "firefox", "function getTitle(details: Details): Promise<string>;"],
    ]);
    applyCanonicalNames(ir, mapOf([["action", "firefox", "Details", "TabDetails"]]));

    const ns = ir.get("action")!;
    const target = ns.elements.get("TabDetails")!;
    assert.equal(getSource(target, "chrome"), chrome);
    assert.equal(getSource(target, "firefox"), "interface TabDetails { tabId?: number; windowId?: number; }");
    assert.equal(ns.elements.has("Details"), false);
    assert.equal(getSource(ns.elements.get("getTitle")!, "firefox"), "function getTitle(details: TabDetails): Promise<string>;");
    assert.equal(getSource(ns.elements.get("getTitle")!, "chrome"), "export function getTitle(details: TabDetails): Promise<string>;");
  });

  it("rewrites qualified references in other namespaces, and nothing that is not a reference", () => {
    const ir = irOf([
      ["action", "safari", "export interface ActionDetails { tabId?: number; }"],
      ["action", "safari", "export function getTitle(details?: action.ActionDetails): Promise<string>;"],
      // A string literal and a member label spelled like the type are not references.
      ["action", "safari", "export function probe(kind: \"ActionDetails\", shape: { ActionDetails: string }): void;"],
      ["browserAction", "safari", "export function getTitle(details?: action.ActionDetails): Promise<string>;"],
      ["browserAction", "firefox", "function getUserSettings(): Promise<browser.action.ActionDetails>;"],
      // A bare name in another namespace is that namespace's own type.
      ["pageAction", "safari", "export interface ActionDetails { tabId?: number; }"],
      ["pageAction", "safari", "export function getTitle(details?: ActionDetails): Promise<string>;"],
    ]);
    applyCanonicalNames(ir, mapOf([["action", "safari", "ActionDetails", "TabDetails"]]));

    const at = (ns: string, el: string, b: BrowserId) => getSource(ir.get(ns)!.elements.get(el)!, b);
    assert.equal(at("action", "getTitle", "safari"), "export function getTitle(details?: action.TabDetails): Promise<string>;");
    assert.equal(at("browserAction", "getTitle", "safari"), "export function getTitle(details?: action.TabDetails): Promise<string>;");
    assert.equal(at("action", "probe", "safari"), "export function probe(kind: \"ActionDetails\", shape: { ActionDetails: string }): void;");
    assert.equal(at("pageAction", "getTitle", "safari"), "export function getTitle(details?: ActionDetails): Promise<string>;");
    assert.ok(ir.get("pageAction")!.elements.has("ActionDetails"));
    // Only the browser named by the row is rewritten.
    assert.equal(at("browserAction", "getUserSettings", "firefox"), "function getUserSettings(): Promise<browser.action.ActionDetails>;");
  });

  it("rewrites the browser.ns.Name form Firefox uses across namespaces", () => {
    const ir = irOf([
      ["action", "firefox", "interface _GetUserSettingsReturnUserSettings { isOnToolbar: boolean; }"],
      ["browserAction", "firefox", "function getUserSettings(): Promise<browser.action._GetUserSettingsReturnUserSettings>;"],
    ]);
    applyCanonicalNames(ir, mapOf([["action", "firefox", "_GetUserSettingsReturnUserSettings", "UserSettings"]]));
    assert.equal(
      getSource(ir.get("browserAction")!.elements.get("getUserSettings")!, "firefox"),
      "function getUserSettings(): Promise<browser.action.UserSettings>;"
    );
  });

  it("leaves a deferred namespace untouched", () => {
    const decls: Decl[] = [
      ["menus", "firefox", "interface _CreateCreateProperties { title?: string; }"],
      ["menus", "firefox", "function create(createProperties: _CreateCreateProperties): number;"],
    ];
    const ir = irOf(decls);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([["menus", "firefox", "_CreateCreateProperties", "CreateProperties"]], ["menus"]), issues);
    const ns = ir.get("menus")!;
    assert.deepEqual([...ns.elements.keys()], ["_CreateCreateProperties", "create"]);
    assert.equal(getSource(ns.elements.get("create")!, "firefox"), decls[1][2]);
    assert.deepEqual(issues, []);
  });

  it("unions a same-browser many-to-one into every member of every source", () => {
    const ir = irOf([
      ["history", "chrome", "export interface UrlDetails { url: string; }"],
      ["history", "firefox", "interface _AddUrlDetails { url: string; title?: string; }"],
      ["history", "firefox", "interface _DeleteUrlDetails { url: string; }"],
      ["history", "firefox", "function addUrl(details: _AddUrlDetails): Promise<void>;"],
      ["history", "firefox", "function deleteUrl(details: _DeleteUrlDetails): Promise<void>;"],
    ]);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([
      ["history", "firefox", "_AddUrlDetails", "UrlDetails"],
      ["history", "firefox", "_DeleteUrlDetails", "UrlDetails"],
    ]), issues);

    const ns = ir.get("history")!;
    assert.deepEqual(issues, []);
    assert.equal(ns.elements.has("_AddUrlDetails"), false);
    assert.equal(ns.elements.has("_DeleteUrlDetails"), false);
    assert.equal(getSource(ns.elements.get("UrlDetails")!, "firefox"), "interface UrlDetails {\n    url: string;\n    title?: string;\n}");
    assert.equal(getSource(ns.elements.get("deleteUrl")!, "firefox"), "function deleteUrl(details: UrlDetails): Promise<void>;");
  });

  it("makes a member optional when any source has it optional, keeping the first source's text", () => {
    const ir = irOf([
      ["cookies", "firefox", "interface _GetDetails { url: string; name: string; }"],
      ["cookies", "firefox", "interface _RemoveDetails { name?: string; url: string; storeId?: string; }"],
    ]);
    applyCanonicalNames(ir, mapOf([
      ["cookies", "firefox", "_GetDetails", "CookieDetails"],
      ["cookies", "firefox", "_RemoveDetails", "CookieDetails"],
    ]));
    assert.equal(
      getSource(ir.get("cookies")!.elements.get("CookieDetails")!, "firefox"),
      "interface CookieDetails {\n    url: string;\n    name?: string;\n    storeId?: string;\n}"
    );
  });

  it("resolves `extends Base` into Base's members before the union", () => {
    const ir = irOf([
      ["scripting", "firefox", "interface RegisteredContentScript { id: string; js?: string[]; persistAcrossSessions?: boolean; }"],
      ["scripting", "firefox", "interface _UpdateContentScriptsScripts extends RegisteredContentScript { persistAcrossSessions?: boolean; }"],
      ["scripting", "firefox", "function updateContentScripts(scripts: _UpdateContentScriptsScripts[]): Promise<void>;"],
    ]);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([["scripting", "firefox", "_UpdateContentScriptsScripts", "RegisteredContentScript"]]), issues);
    const ns = ir.get("scripting")!;
    assert.deepEqual(issues, []);
    assert.equal(ns.elements.has("_UpdateContentScriptsScripts"), false);
    assert.equal(
      getSource(ns.elements.get("RegisteredContentScript")!, "firefox"),
      "interface RegisteredContentScript {\n    id: string;\n    js?: string[];\n    persistAcrossSessions?: boolean;\n}"
    );
    assert.equal(getSource(ns.elements.get("updateContentScripts")!, "firefox"), "function updateContentScripts(scripts: RegisteredContentScript[]): Promise<void>;");
  });

  it("resolves `extends Omit<Base, \"k\">` into Base's members minus k, plus the source's optional k", () => {
    const ir = irOf([
      ["userScripts", "firefox", "interface RegisteredUserScript { id: string; js: ScriptSource[]; matches?: string[]; }"],
      ["userScripts", "firefox", "interface _UpdateRegisteredUserScript extends Omit<RegisteredUserScript, \"js\"> { js?: ScriptSource[] | undefined; }"],
    ]);
    applyCanonicalNames(ir, mapOf([["userScripts", "firefox", "_UpdateRegisteredUserScript", "RegisteredUserScript"]]));
    assert.equal(
      getSource(ir.get("userScripts")!.elements.get("RegisteredUserScript")!, "firefox"),
      "interface RegisteredUserScript {\n    id: string;\n    js?: ScriptSource[];\n    matches?: string[];\n}"
    );
  });

  it("still reports a same-browser type alias whose text differs", () => {
    const ir = irOf([
      ["scripting", "firefox", "type _A = \"USER\";"],
      ["scripting", "firefox", "type _B = \"AUTHOR\";"],
    ]);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([["scripting", "firefox", "_A", "Origin"], ["scripting", "firefox", "_B", "Origin"]]), issues);
    const ns = ir.get("scripting")!;
    assert.equal(getSource(ns.elements.get("Origin")!, "firefox"), "type Origin = \"USER\";");
    assert.equal(getSource(ns.elements.get("_B")!, "firefox"), "type _B = \"AUTHOR\";");
    assert.equal(issues.length, 1);
    assert.match(issues[0].reason, /Origin is already declared by Firefox with a different type text/);
  });

  it("unions identical sources under a second name to themselves, without a report", () => {
    const ir = irOf([
      ["cookies", "chrome", "export interface CookieDetails { url: string; name: string; }"],
      ["cookies", "firefox", "interface _GetDetails {\n  /** The URL. */\n  url: string;\n  name: string;\n}"],
      ["cookies", "firefox", "interface _RemoveDetails {\n  name: string;\n  /** The URL to remove. */\n  url: string;\n}"],
      ["cookies", "firefox", "function get(details: _GetDetails): Promise<void>;"],
      ["cookies", "firefox", "function remove(details: _RemoveDetails): Promise<void>;"],
    ]);
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, mapOf([
      ["cookies", "firefox", "_GetDetails", "CookieDetails"],
      ["cookies", "firefox", "_RemoveDetails", "CookieDetails"],
    ]), issues);

    const ns = ir.get("cookies")!;
    assert.deepEqual(issues, []);
    assert.equal(ns.elements.has("_GetDetails"), false);
    assert.equal(ns.elements.has("_RemoveDetails"), false);
    assert.ok(hasSource(ns.elements.get("CookieDetails")!, "firefox"));
    assert.equal(getSource(ns.elements.get("CookieDetails")!, "firefox"), "interface CookieDetails {\n    url: string;\n    name: string;\n}");
    assert.equal(getSource(ns.elements.get("get")!, "firefox"), "function get(details: CookieDetails): Promise<void>;");
    assert.equal(getSource(ns.elements.get("remove")!, "firefox"), "function remove(details: CookieDetails): Promise<void>;");
  });
});
