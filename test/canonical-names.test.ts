/**
 * The name derivation (CAN-002) on synthetic IRs.
 *
 * Each case is one rule from src/canonical-names.ts, and each is written so
 * that the rule's absence would fail it: a slot joins names, a literal does
 * not, an array does not, the winner is chosen among contributors only, one
 * browser with two shapes is unresolved, a curated verdict splits or ignores.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkElement, getSource, type IRNamespace, type BrowserId } from "../src/generator";
import { deriveCanonicalNames, safariPrefix } from "../src/canonical-names";
import { applyCanonicalNames, type CanonicalNameMap, type MergeIssue } from "../src/generator";

function ns(name: string, decls: Array<[BrowserId, string]>): Map<string, IRNamespace> {
  const n: IRNamespace = { name, elements: new Map() };
  for (const [b, src] of decls) {
    const m = /^export (?:interface|type|function|const) (\w+)/.exec(src);
    if (!m) throw new Error(`bad decl: ${src}`);
    const kind = src.startsWith("export function") ? "function"
      : src.startsWith("export interface") ? "interface"
      : src.startsWith("export const") ? "variable" : "type";
    const el = n.elements.get(m[1]) ?? mkElement(m[1], kind);
    el.sources.set(b, (el.sources.get(b) ? el.sources.get(b) + "\n" : "") + src);
    n.elements.set(m[1], el);
  }
  return new Map([[name, n]]);
}

describe("deriveCanonicalNames", () => {
  it("joins names that share a parameter slot and picks the Chrome public name", () => {
    const ir = ns("action", [
      ["chrome", "export interface TabDetails { tabId?: number; }"],
      ["chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["firefox", "export interface Details { tabId?: number; windowId?: number; }"],
      ["firefox", "export function getTitle(details: Details): Promise<string>;"],
      ["safari", "export interface ActionDetails { tabId?: number; windowId?: number; }"],
      ["safari", "export function getTitle(details: action.ActionDetails): Promise<string>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.unresolved, []);
    assert.equal(r.groups.length, 1);
    assert.equal(r.groups[0].canonical, "TabDetails");
    assert.equal(r.groups[0].rule, "chrome-public");
    const losers = r.rows.filter((x) => x.name !== x.canonical).map((x) => `${x.browser}:${x.name}`).sort();
    assert.deepEqual(losers, ["firefox:Details", "safari:ActionDetails"]);
  });

  it("ranks among contributors only: no Chrome name in the slot means Chrome has no vote", () => {
    const ir = ns("action", [
      ["chrome", "export function setTitle(details: { title: string; tabId?: number }): Promise<void>;"],
      ["firefox", "export interface _SetTitleDetails { title: string; tabId?: number; }"],
      ["firefox", "export function setTitle(details: _SetTitleDetails): Promise<void>;"],
      ["safari", "export interface ActionSetTitleDetails { title: string; tabId?: number; }"],
      ["safari", "export interface ActionSetPopupDetails { popup: string; }"],
      ["safari", "export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.unresolved, []);
    assert.equal(r.groups[0].rule, "safari-deprefixed");
    assert.equal(r.groups[0].canonical, "SetTitleDetails");
  });

  it("does not look inside an inline literal for the slot's name", () => {
    const ir = ns("tabs", [
      ["chrome", "export type TabStatus = 'loading' | 'complete';"],
      ["chrome", "export function query(queryInfo: { status?: TabStatus }): Promise<void>;"],
      ["firefox", "export interface _QueryQueryInfo { status?: string; }"],
      ["firefox", "export function query(queryInfo: _QueryQueryInfo): Promise<void>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.groups, []);
    assert.deepEqual(r.unresolved, []);
  });

  it("does not take T[] and T at one slot for one concept", () => {
    const ir = ns("dnr", [
      ["chrome", "export interface RulesMatchedDetails { rulesMatchedInfo: number[]; }"],
      ["chrome", "export function getMatchedRules(): Promise<RulesMatchedDetails>;"],
      ["safari", "export interface DNRMatchedRule { rule: number; }"],
      ["safari", "export function getMatchedRules(): Promise<dnr.DNRMatchedRule[]>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.groups, []);
  });

  it("refuses a group where one browser contributes two shapes", () => {
    const ir = ns("history", [
      ["chrome", "export interface UrlDetails { url: string; }"],
      ["chrome", "export function addUrl(details: UrlDetails): Promise<void>;"],
      ["chrome", "export function deleteUrl(details: UrlDetails): Promise<void>;"],
      ["firefox", "export interface _AddUrlDetails { url: string; title?: string; }"],
      ["firefox", "export interface _DeleteUrlDetails { url: string; }"],
      ["firefox", "export function addUrl(details: _AddUrlDetails): Promise<void>;"],
      ["firefox", "export function deleteUrl(details: _DeleteUrlDetails): Promise<void>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.groups, []);
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /firefox contributes _AddUrlDetails .* and _DeleteUrlDetails/);
  });

  it("a curated distinct pair does not join, and is reported as a verdict row", () => {
    const ir = ns("permissions", [
      ["chrome", "export interface Permissions { origins?: string[]; }"],
      ["chrome", "export function contains(p: Permissions): Promise<boolean>;"],
      ["firefox", "export interface Permissions { origins?: string[]; }"],
      ["firefox", "export interface AnyPermissions { origins?: string[]; }"],
      ["firefox", "export function contains(p: AnyPermissions): Promise<boolean>;"],
    ]);
    const r = deriveCanonicalNames(ir, {
      distinct: [{ namespace: "permissions", names: ["Permissions", "AnyPermissions"], reason: "AnyPermissions admits any string" }],
    });
    assert.deepEqual(r.groups, []);
    assert.deepEqual(r.unresolved, []);
    assert.ok(r.rows.some((x) => x.basis === "verdict" && x.name === "AnyPermissions" && x.curatedVerdict.includes("any string")));
  });

  it("a curated ignore drops one browser's contribution to one slot", () => {
    const ir = ns("action", [
      ["chrome", "export interface TabDetails { tabId?: number; }"],
      ["chrome", "export interface OpenPopupOptions { windowId?: number; }"],
      ["chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["chrome", "export function openPopup(options?: OpenPopupOptions): Promise<void>;"],
      ["safari", "export interface ActionDetails { tabId?: number; windowId?: number; }"],
      ["safari", "export function getTitle(details: action.ActionDetails): Promise<string>;"],
      ["safari", "export function openPopup(options?: action.ActionDetails): Promise<void>;"],
    ]);
    assert.equal(deriveCanonicalNames(ir).unresolved.length, 1);
    const r = deriveCanonicalNames(ir, {
      ignore: [{ namespace: "action", slot: "openPopup(options)", browser: "safari", reason: "the declaration is the details type" }],
    });
    assert.deepEqual(r.unresolved, []);
    assert.deepEqual(r.groups.map((g) => g.canonical), ["TabDetails"]);
    assert.ok(r.rows.find((x) => x.name === "ActionDetails")!.curatedVerdict.includes("ignored"));
  });
});

describe("a curated rename", () => {
  const ir = ns("userScripts", [
    ["chrome", "export interface RegisteredUserScript { id: string; js?: string[]; }"],
    ["firefox", "export interface RegisteredUserScript { id: string; js: string[]; }"],
    ["firefox", "export interface _UpdateRegisteredUserScript { id: string; js?: string[]; }"],
  ]);

  it("moves a browser's declaration onto a new public name, independent of slot-sharing", () => {
    const r = deriveCanonicalNames(ir, {
      rename: [{ namespace: "userScripts", browser: "firefox", name: "_UpdateRegisteredUserScript",
                 canonical: "UpdateRegisteredUserScript", reason: "Firefox's own update() type" }],
    });
    assert.deepEqual(r.unresolved, []);
    const row = r.rows.find((x) => x.namespace === "userScripts" && x.name === "_UpdateRegisteredUserScript" && x.browser === "firefox");
    assert.equal(row?.canonical, "UpdateRegisteredUserScript");
    assert.equal(row?.basis, "curated");
    assert.equal(row?.curatedVerdict, "Firefox's own update() type");
  });

  it("is unresolved when the named browser does not declare the source name", () => {
    const r = deriveCanonicalNames(ir, {
      rename: [{ namespace: "userScripts", browser: "safari", name: "_UpdateRegisteredUserScript",
                 canonical: "UpdateRegisteredUserScript", reason: "wrong browser" }],
    });
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /curated rename, but safari does not declare it/);
  });

  it("is unresolved when the browser already declares the target name", () => {
    const r = deriveCanonicalNames(ir, {
      rename: [{ namespace: "userScripts", browser: "firefox", name: "_UpdateRegisteredUserScript",
                 canonical: "RegisteredUserScript", reason: "target taken" }],
    });
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /curated rename target already declared by firefox/);
  });
});

describe("safariPrefix", () => {
  it("is the prefix most Safari-only names share, not the longest", () => {
    const ir = ns("action", [
      ["safari", "export interface ActionDetails { a?: number; }"],
      ["safari", "export interface ActionSetBadgeTextDetails { a?: number; }"],
      ["safari", "export interface ActionSetBadgeBackgroundColorDetails { a?: number; }"],
      ["safari", "export interface MessageSender { a?: number; }"],
      ["chrome", "export interface MessageSender { a?: number; }"],
    ]);
    assert.deepEqual(safariPrefix(ir.get("action")!), { prefix: "Action", sharedBy: 3 });
  });

  it("on a tie, the prefix that is a segment of the namespace name wins", () => {
    const ir = ns("devtools.inspectedWindow", [
      ["safari", "export interface DevToolsEvalOptions { a?: number; }"],
      ["safari", "export interface DevToolsReloadOptions { a?: number; }"],
    ]);
    assert.deepEqual(safariPrefix(ir.get("devtools.inspectedWindow")!), { prefix: "DevTools", sharedBy: 2 });
  });
});

describe("shape comparison follows inheritance", () => {
  it("treats `extends Base` with no new member as Base's shape", () => {
    const ir = ns("scripting", [
      ["chrome", "export interface RegisteredContentScript { id: string; js?: string[]; }"],
      ["chrome", "export function updateContentScripts(scripts: RegisteredContentScript[]): Promise<void>;"],
      ["firefox", "export interface RegisteredContentScript { id: string; js?: string[]; }"],
      ["firefox", "export interface _UpdateContentScriptsScripts extends RegisteredContentScript { js?: string[]; }"],
      ["firefox", "export function updateContentScripts(scripts: _UpdateContentScriptsScripts[]): Promise<void>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.unresolved, []);
    assert.deepEqual(r.groups.map((g) => g.canonical), ["RegisteredContentScript"]);
  });

  it("treats `extends Omit<Base, k> { k?: ... }` as Base's member set", () => {
    const ir = ns("userScripts", [
      ["chrome", "export interface RegisteredUserScript { id: string; js?: string[]; }"],
      ["chrome", "export function update(scripts: RegisteredUserScript[]): Promise<void>;"],
      ["firefox", "export interface RegisteredUserScript { id: string; js: string[]; }"],
      ["firefox", "export interface _UpdateRegisteredUserScript extends Omit<RegisteredUserScript, \"js\"> { js?: string[]; }"],
      ["firefox", "export function update(scripts: _UpdateRegisteredUserScript[]): Promise<void>;"],
    ]);
    const r = deriveCanonicalNames(ir);
    assert.deepEqual(r.unresolved, []);
    assert.deepEqual(r.groups.map((g) => g.canonical), ["RegisteredUserScript"]);
  });

  it("a curated accept waives one browser's two shapes and is recorded on the rows", () => {
    const ir = ns("webNavigation", [
      ["firefox", "export interface _GetFrameReturnDetails { url: string; frameId: number; }"],
      ["firefox", "export interface _GetAllFramesReturnDetails { url: string; frameId: number; processId?: number; }"],
      ["firefox", "export function getFrame(): Promise<_GetFrameReturnDetails>;"],
      ["firefox", "export function getAllFrames(): Promise<_GetAllFramesReturnDetails[]>;"],
      ["safari", "export interface FrameDetails { url: string; frameId?: number; }"],
      ["safari", "export interface WebNavigationGetFrameDetails { tabId: number; }"],
      ["safari", "export interface WebNavigationGetAllFramesDetails { tabId: number; }"],
      ["safari", "export function getFrame(): Promise<webNavigation.FrameDetails>;"],
      ["safari", "export function getAllFrames(): Promise<webNavigation.FrameDetails[]>;"],
    ]);
    assert.equal(deriveCanonicalNames(ir).unresolved.length, 1);
    const r = deriveCanonicalNames(ir, {
      accept: [{ namespace: "webNavigation", names: ["FrameDetails", "_GetAllFramesReturnDetails", "_GetFrameReturnDetails"], reason: "processId is optional width" }],
    });
    assert.deepEqual(r.unresolved, []);
    assert.deepEqual(r.groups.map((g) => `${g.canonical}:${g.rule}`), ["FrameDetails:safari-deprefixed"]);
    assert.ok(r.rows.every((x) => x.curatedVerdict.includes("optional width")));
  });
});

describe("a browser votes only with what it ships to stable", () => {
  it("a noVote browser's public name loses to the next contributor, and is still renamed", () => {
    const ir = ns("dns", [
      ["chrome", "export interface ResolveCallbackResolveInfo { address?: string; }"],
      ["chrome", "export function resolve(h: string): Promise<ResolveCallbackResolveInfo>;"],
      ["firefox", "export interface DNSRecord { addresses: string[]; }"],
      ["firefox", "export function resolve(h: string): Promise<DNSRecord>;"],
    ]);
    assert.equal(deriveCanonicalNames(ir).groups[0].canonical, "ResolveCallbackResolveInfo");
    const r = deriveCanonicalNames(ir, {}, { noVote: [{ browser: "chrome", namespace: "dns", citation: "@chrome-channel dev (x:1)" }] });
    assert.equal(r.groups[0].canonical, "DNSRecord");
    assert.equal(r.groups[0].rule, "firefox-public");
    assert.deepEqual(r.groups[0].noVote, ["chrome: @chrome-channel dev (x:1)"]);
    assert.ok(r.rows.some((x) => x.browser === "chrome" && x.name === "ResolveCallbackResolveInfo" && x.canonical === "DNSRecord"));
  });
});

describe("a curated defer", () => {
  it("keeps every slot of the namespace out of the map and reports it", () => {
    const ir = ns("menus", [
      ["firefox", "export interface _CreateCreateProperties { title?: string; }"],
      ["firefox", "export function create(p: _CreateCreateProperties): Promise<void>;"],
      ["safari", "export interface MenuItemProperties { title?: string; }"],
      ["safari", "export interface MenuItemType { a?: string; }"],
      ["safari", "export function create(p: menus.MenuItemProperties): Promise<void>;"],
    ]);
    assert.equal(deriveCanonicalNames(ir).groups.length, 1);
    const r = deriveCanonicalNames(ir, { defer: [{ namespace: "menus", reason: "INT-023" }] });
    assert.deepEqual(r.groups, []);
    assert.deepEqual(r.rows, []);
    assert.deepEqual(r.deferred, [{ namespace: "menus", reason: "INT-023" }]);
  });
});

describe("an alias group (options.aliasGroups)", () => {
  // Safari's `export import contextMenus = browser.menus` ties these two
  // namespaces together. Neither namespace is aliased in the emitted
  // output (each keeps its own rows below), but the two namespaces'
  // `create(createProperties)` slots are the same concept, so a
  // Chrome public name Safari's alias exposes only under contextMenus must
  // still win menus's canonical choice.
  const aliased = new Map([
    ["contextMenus", "contextMenus+menus"],
    ["menus", "contextMenus+menus"],
  ]);

  function twoNamespaceIr(): Map<string, IRNamespace> {
    const contextMenus = ns("contextMenus", [
      ["chrome", "export interface CreateProperties { title?: string; }"],
      ["chrome", "export function create(createProperties: CreateProperties): number;"],
      ["firefox", "export interface _CreateCreateProperties { title?: string; }"],
      ["firefox", "export function create(createProperties: _CreateCreateProperties): number;"],
    ]).get("contextMenus")!;
    const menus = ns("menus", [
      ["firefox", "export interface _CreateCreateProperties { title?: string; }"],
      ["firefox", "export function create(createProperties: _CreateCreateProperties): number;"],
      ["safari", "export interface MenuItemProperties { title?: string; }"],
      ["safari", "export function create(createProperties: MenuItemProperties): number;"],
    ]).get("menus")!;
    return new Map([["contextMenus", contextMenus], ["menus", menus]]);
  }

  it("picks the sibling's Chrome public name for a namespace whose own slot has no Chrome vote", () => {
    const ir = twoNamespaceIr();

    // Without the alias grouping, menus resolves on its own: no Chrome vote
    // in its own slot, Firefox's own name is private, so Safari wins.
    const unlinked = deriveCanonicalNames(ir);
    const menusUnlinked = unlinked.groups.find((g) => g.namespace === "menus")!;
    assert.equal(menusUnlinked.rule, "safari-deprefixed");

    const linked = deriveCanonicalNames(ir, {}, { aliasGroups: aliased });
    const contextMenusGroup = linked.groups.find((g) => g.namespace === "contextMenus")!;
    const menusGroup = linked.groups.find((g) => g.namespace === "menus")!;
    assert.equal(contextMenusGroup.canonical, "CreateProperties");
    assert.equal(contextMenusGroup.rule, "chrome-public");
    // The sibling's Chrome name wins for menus too, even though menus never
    // declares a Chrome contribution of its own.
    assert.equal(menusGroup.canonical, "CreateProperties");
    assert.equal(menusGroup.rule, "chrome-public");
  });

  it("never gives the sibling browser a row in this namespace: availability is untouched", () => {
    const ir = twoNamespaceIr();
    const linked = deriveCanonicalNames(ir, {}, { aliasGroups: aliased });
    const menusRows = linked.rows.filter((r) => r.namespace === "menus");
    assert.deepEqual(new Set(menusRows.map((r) => r.browser)), new Set(["firefox", "safari"]));
    assert.ok(!menusRows.some((r) => r.browser === "chrome"));
    // menus's own names are exactly what menus itself declares.
    assert.deepEqual(menusRows.map((r) => r.name).sort(), ["MenuItemProperties", "_CreateCreateProperties"]);
    assert.ok(menusRows.every((r) => r.canonical === "CreateProperties"));
  });

  it("leaves a namespace outside any group unaffected", () => {
    const ir = twoNamespaceIr();
    (ir as Map<string, IRNamespace>).set("action", ns("action", [
      ["chrome", "export function setTitle(details: { title: string }): Promise<void>;"],
      ["firefox", "export interface _SetTitleDetails { title: string; }"],
      ["firefox", "export function setTitle(details: _SetTitleDetails): Promise<void>;"],
      ["safari", "export interface ActionSetTitleDetails { title: string; }"],
      ["safari", "export interface ActionSetPopupDetails { popup: string; }"],
      ["safari", "export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;"],
    ]).get("action")!);

    const unlinked = deriveCanonicalNames(ir).groups.find((g) => g.namespace === "action")!;
    const linked = deriveCanonicalNames(ir, {}, { aliasGroups: aliased }).groups.find((g) => g.namespace === "action")!;
    assert.deepEqual(linked, unlinked);
    assert.equal(linked.rule, "safari-deprefixed");
    assert.equal(linked.canonical, "SetTitleDetails");
  });
});

describe("single-voter adoption across the alias group (WORKPLAN CAN-002 extension)", () => {
  // browserAction is Firefox-only for these slots (Safari's package aliases
  // the whole namespace to action instead of declaring its own types), so
  // the slot never gains a second local name and never enters the union-find
  // that builds a Group on its own. Its sibling `action`, though, has a real
  // Chrome+Firefox group at the identical slot (same kind and label).
  const aliased = new Map([
    ["action", "action+browserAction"],
    ["browserAction", "action+browserAction"],
  ]);

  function ir(): Map<string, IRNamespace> {
    const action = ns("action", [
      ["chrome", "export interface TabDetails { tabId?: number; }"],
      ["chrome", "export function getTitle(details: TabDetails): Promise<string>;"],
      ["firefox", "export interface Details { tabId?: number; }"],
      ["firefox", "export function getTitle(details: Details): Promise<string>;"],
    ]).get("action")!;
    const browserAction = ns("browserAction", [
      ["firefox", "export interface Details { tabId?: number; }"],
      ["firefox", "export function getTitle(details: Details): Promise<string>;"],
    ]).get("browserAction")!;
    return new Map([["action", action], ["browserAction", browserAction]]);
  }

  it("adopts the sibling's canonical for a slot with only one voter, and availability does not change", () => {
    const withoutLinking = deriveCanonicalNames(ir());
    assert.deepEqual(withoutLinking.groups.map((g) => g.namespace), ["action"]);
    assert.ok(!withoutLinking.rows.some((r) => r.namespace === "browserAction"));

    const linked = deriveCanonicalNames(ir(), {}, { aliasGroups: aliased });
    const row = linked.rows.find((r) => r.namespace === "browserAction")!;
    assert.equal(row.browser, "firefox");
    assert.equal(row.name, "Details");
    assert.equal(row.canonical, "TabDetails");
    assert.equal(row.basis, "alias-group");
    assert.match(row.citation, /action/);
    // Still Firefox-only: adoption renames, it never adds a browser.
    assert.deepEqual(linked.rows.filter((r) => r.namespace === "browserAction").map((r) => r.browser), ["firefox"]);
  });

  it("is a leftover, not a silent no-op, when no sibling resolves the matching slot", () => {
    const withIsolated = ir();
    (withIsolated as Map<string, IRNamespace>).set("browserAction", ns("browserAction", [
      ["firefox", "export interface _IsShownDetails { tabId?: number; }"],
      ["firefox", "export function isShown(details: _IsShownDetails): Promise<boolean>;"],
    ]).get("browserAction")!);
    const linked = deriveCanonicalNames(withIsolated, {}, { aliasGroups: aliased });
    assert.ok(!linked.rows.some((r) => r.namespace === "browserAction" && r.name === "_IsShownDetails"));
    assert.ok(linked.aliasGroupLeftovers.some((l) => l.includes("browserAction._IsShownDetails")));
  });

  it("does not adopt when the browser already declares the canonical name for something else", () => {
    const withCollision = ir();
    const browserAction = withCollision.get("browserAction")!;
    browserAction.elements.set("TabDetails", mkElement("TabDetails", "interface"));
    browserAction.elements.get("TabDetails")!.sources.set("firefox", "export interface TabDetails { unrelated: true; }");
    const linked = deriveCanonicalNames(withCollision, {}, { aliasGroups: aliased });
    assert.ok(!linked.rows.some((r) => r.namespace === "browserAction" && r.name === "Details" && r.canonical === "TabDetails"));
    assert.ok(linked.aliasGroupLeftovers.some((l) => l.includes("browserAction.Details") && l.includes("already declared")));
  });
});

describe("fixpoint necessity: a member slot only visible after a first-order rename (WORKPLAN CAN-002/CAN-005)", () => {
  // Mirrors declarativeNetRequest's real RuleCondition.domainType: Chrome and
  // Firefox name the containing interface differently (RuleCondition vs
  // _RuleCondition), so collectSlots cannot look at its members yet --
  // `browsersOf(el).length > 1` fails for either single-browser copy. Only
  // after applyCanonicalNames unifies the two into one shared `RuleCondition`
  // does the `domainType` member become a member slot at all.
  function rawIr(): Map<string, IRNamespace> {
    return ns("dnr", [
      ["chrome", "export type DomainType = 'first' | 'third';"],
      ["chrome", "export interface RuleCondition { domainType?: DomainType; }"],
      ["chrome", "export function addRule(rule: RuleCondition): void;"],
      ["firefox", "export type _RuleConditionDomainType = 'first' | 'third';"],
      ["firefox", "export interface _RuleCondition { domainType?: _RuleConditionDomainType; }"],
      ["firefox", "export function addRule(rule: _RuleCondition): void;"],
    ]);
  }

  it("one pass finds the interface-level group but not the member slot inside it", () => {
    const first = deriveCanonicalNames(rawIr());
    assert.deepEqual(first.groups.map((g) => g.canonical), ["RuleCondition"]);
    assert.ok(!first.groups.some((g) => g.canonical === "DomainType"));
  });

  it("a second pass, on the ir the first pass's renames produced, finds the member slot", () => {
    const ir = rawIr();
    const first = deriveCanonicalNames(ir);
    const map: CanonicalNameMap = {
      renames: first.rows.filter((r) => r.name !== r.canonical),
      deferred: new Set(first.deferred.map((d) => d.namespace)),
    };
    applyCanonicalNames(ir, map, []);

    const second = deriveCanonicalNames(ir);
    const domainTypeGroup = second.groups.find((g) => g.canonical === "DomainType");
    assert.ok(domainTypeGroup, "second pass should find the domainType member group");
    assert.equal(domainTypeGroup!.namespace, "dnr");
    assert.deepEqual(domainTypeGroup!.slots, ["member RuleCondition.domainType"]);
    const row = second.rows.find((r) => r.namespace === "dnr" && r.name === "_RuleConditionDomainType");
    assert.equal(row?.canonical, "DomainType");
    assert.equal(row?.basis, "member");
  });
});

describe("ALIAS COLLAPSE (fourth CAN-001 primitive, finalPass)", () => {
  it("collapses a browser's own bare re-export of its generated helper", () => {
    const ir = ns("_manifest", [
      ["firefox", "export type _CommonDataCollectionPermission = 'a' | 'b';"],
      ["firefox", "export type CommonDataCollectionPermission = _CommonDataCollectionPermission;"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.deepEqual(r.unresolved, []);
    const row = r.rows.find((x) => x.name === "_CommonDataCollectionPermission");
    assert.equal(row?.canonical, "CommonDataCollectionPermission");
    assert.equal(row?.basis, "alias-collapse");
  });

  it("does not fire on an array or a union: only a bare TypeReference qualifies", () => {
    const ir = ns("dns", [
      ["firefox", "export type _ResolveFlags = 'bypass_cache' | 'canonical_name';"],
      ["firefox", "export type ResolveFlags = _ResolveFlags[];"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.ok(!r.rows.some((x) => x.basis === "alias-collapse"));
    // Uncovered by alias collapse, de-prefix then tries and finds `ResolveFlags`
    // already declared (the array alias): unresolved, never guessed.
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /_ResolveFlags/);
  });

  it("applyCanonicalNames moves the helper's body onto the public name and drops both", () => {
    const ir = ns("contextMenus", [
      ["firefox", "export type _ContextType = 'page' | 'link';"],
      ["firefox", "export type ContextType = _ContextType;"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    const map: CanonicalNameMap = { renames: r.rows.filter((x) => x.name !== x.canonical), deferred: new Set() };
    const issues: MergeIssue[] = [];
    applyCanonicalNames(ir, map, issues);
    assert.deepEqual(issues, []);
    const nsIr = ir.get("contextMenus")!;
    assert.ok(!nsIr.elements.has("_ContextType"), "the helper is dropped");
    const target = nsIr.elements.get("ContextType");
    assert.ok(target, "the public name still exists");
    assert.match(getSource(target!, "firefox")!, /'page' \| 'link'/, "its body is the helper's, not the circular self-reference");
  });
});

describe("DE-PREFIX (fifth CAN-001 primitive, finalPass)", () => {
  it("de-prefixes a single-voter underscore name, and does nothing without finalPass", () => {
    const ir = ns("bookmarks", [
      ["firefox", "export interface _MoveDestination { parentId?: string; }"],
      ["firefox", "export function move(id: string, destination: _MoveDestination): void;"],
    ]);
    assert.deepEqual(deriveCanonicalNames(ir).rows, [], "gated off by default: no finalPass, no tier");
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.deepEqual(r.unresolved, []);
    const row = r.rows.find((x) => x.name === "_MoveDestination");
    assert.equal(row?.canonical, "MoveDestination");
    assert.equal(row?.basis, "deprefix");
  });

  it("a collision with a name the namespace already declares is unresolved, never guessed", () => {
    const ir = ns("bookmarks", [
      ["firefox", "export interface _MoveDestination { parentId?: string; }"],
      ["chrome", "export interface MoveDestination { index?: number; }"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /de-prefixing _MoveDestination \(sole contributor firefox\) gives MoveDestination.*already declares/);
    assert.ok(!r.rows.some((x) => x.name === "_MoveDestination"));
  });

  it("gives a row to an underscore type no slot ever references", () => {
    const ir = ns("bookmarks", [
      ["firefox", "export interface _InternalHelper { x?: number; }"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    const row = r.rows.find((x) => x.name === "_InternalHelper");
    assert.equal(row?.canonical, "InternalHelper");
    assert.equal(row?.basis, "deprefix");
  });

  it("leaves an _eval-style function name untouched: scoped to interface and type only", () => {
    const ir = ns("inspectedWindow", [
      ["chrome", "export function _eval(expr: string): Promise<unknown>;"],
    ]);
    const r = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.deepEqual(r.rows, []);
    assert.deepEqual(r.unresolved, []);
  });
});

describe("ordering: de-prefix must run only after the slot fixpoint converges (declarativeNetRequest.RuleActionType)", () => {
  // A member slot inside an interface only becomes visible to collectSlots
  // once that interface itself has one name across browsers
  // (`browsersOf(el).length > 1`). Running de-prefix on an early pass, before
  // `_RuleAction`/`RuleAction` have converged, sees `_RuleActionType` as an
  // apparent single voter and reports a false collision with Chrome's
  // already-public `RuleActionType`: the exact bug scripts/derive-names.ts
  // fixes by running the slot-based fixpoint to convergence first and only
  // then making one call with finalPass:true.
  function rawIr(): Map<string, IRNamespace> {
    return ns("dnr", [
      ["chrome", "export type RuleActionType = 'block' | 'allow';"],
      ["chrome", "export interface RuleAction { type: RuleActionType; }"],
      ["chrome", "export function addRule(action: RuleAction): void;"],
      ["firefox", "export type _RuleActionType = 'block' | 'allow';"],
      ["firefox", "export interface _RuleAction { type: _RuleActionType; }"],
      ["firefox", "export function addRule(action: _RuleAction): void;"],
    ]);
  }

  it("running finalPass on the RAW ir reports a false collision (the bug)", () => {
    const r = deriveCanonicalNames(rawIr(), {}, { finalPass: true });
    assert.equal(r.unresolved.length, 1);
    assert.match(r.unresolved[0], /de-prefixing _RuleActionType.*already declares/);
  });

  it("running finalPass on the CONVERGED ir resolves it through the ordinary chrome-public member slot instead", () => {
    const ir = rawIr();
    const first = deriveCanonicalNames(ir);
    const map: CanonicalNameMap = {
      renames: first.rows.filter((r) => r.name !== r.canonical),
      deferred: new Set(first.deferred.map((d) => d.namespace)),
    };
    applyCanonicalNames(ir, map, []);

    const final = deriveCanonicalNames(ir, {}, { finalPass: true });
    assert.deepEqual(final.unresolved, []);
    const row = final.rows.find((r) => r.namespace === "dnr" && r.name === "_RuleActionType");
    assert.equal(row?.canonical, "RuleActionType");
    assert.equal(row?.basis, "member", "resolved by the normal group mechanism, not by deprefix");
  });
});
