/**
 * Derive one name per concept per namespace (WORKPLAN workstream L, CAN-002).
 *
 * The merger unifies declarations by exact name, so a concept that Chrome,
 * Firefox and Safari name differently ships three times with a browser tag on
 * each copy. This module finds those concepts and says which name survives.
 *
 * Two names are one concept when they occupy the same slot in two browsers:
 *
 *   parameter  the same parameter (by name) of the same function
 *   return     the same function's result, whether it comes back as
 *              `Promise<T>` or as the first argument of a trailing callback
 *   member     the same member of an interface the browsers already share
 *
 * Body equality is never a basis. `downloads.StringDelta` and `BooleanDelta`
 * have the same member names and are two types; nothing here would join them.
 *
 * The surviving name is chosen among the browsers that contribute a name to
 * the group, in order: a Chrome name, then a Firefox name, then Safari's name
 * with its namespace prefix removed. A name starting with `_` is never
 * public. A browser that passes an inline literal in that slot has no name
 * there and no vote. A browser votes only with what it ships to stable: a
 * namespace chrome-types marks `@chrome-channel dev` gives Chrome no vote
 * there, though its names still merge into whatever wins.
 *
 * A group where one browser contributes two names with different member sets
 * is not one concept. It is reported as unresolved and must be settled by a
 * curated verdict; the script never guesses.
 *
 * A fourth tier, alias collapse, folds a browser's own bare re-export
 * (`type X = _X;`) onto its generated helper `_X`, as one declaration under
 * two spellings rather than two names for one concept. Only a bare alias
 * (a single TypeReference, no union, no array, no generics) qualifies; see
 * the alias-collapse block below for the rest of the rule.
 *
 * A fifth tier, de-prefix (WORKPLAN Workstream G, synthetic-name), gives a
 * `_`-prefixed name with exactly one contributing browser (so it never
 * forms a Group) the same name with the underscore dropped. See the
 * de-prefix block below for what qualifies and what a collision does.
 *
 * Both tiers scan the element map directly and only run once the slot-based
 * fixpoint above (across every pass of scripts/derive-names.ts) has fully
 * converged (`DeriveOptions.finalPass`): a member slot can still be waiting
 * on its containing interface to gain one name across browsers, and either
 * tier reporting a collision before that happens would be wrong, and would
 * stick (an unresolved message is treated as real the moment any pass
 * reports it).
 *
 * Curated verdicts (CuratedVerdicts, canonical-names-curated.json) settle what
 * slot-sharing cannot: `distinct` and `ignore` correct a wrong join, `accept`
 * and `defer` excuse a real conflict, and `rename` forces a move slot-sharing
 * would never propose on its own, because the two names never occupy one slot.
 *
 * Namespaces are never merged in the emitted output: `chrome.menus` stays
 * undefined in Chrome, so `menus` and `contextMenus` ship as two namespaces.
 * But Safari's package aliases one to the other (`export import contextMenus
 * = browser.menus`), which means the two namespaces are the same API under
 * two names, and the concept inside them deserves one name too. `options.
 * aliasGroups` (namespace -> group id, derived from those Safari `export
 * import` statements) says which namespaces are such aliases of each other.
 *
 * When namespace N belongs to a group, choosing N's group's `canonical` looks
 * past N: for every slot the group already spans (matched to a sibling
 * namespace M by identical kind and label, e.g. both declare a `create`
 * function with a `createProperties` parameter), M's contribution at that
 * same slot joins the candidate pool, and CAN-001 order (a Chrome name, then
 * Firefox, then Safari de-prefixed) picks among the union. A browser that
 * declares nothing in N's own slot still gets counted this way, exactly as if
 * it had voted in N, provided it voted on the sibling's matching slot. This
 * is the only thing a sibling can change. `names` (what each browser
 * literally contributes to N) and every row stay built from N alone; a
 * sibling browser never gains a row in N, and de-prefixing a Safari name
 * still uses whichever namespace's own prefix that name was declared under.
 * The noVote (dev-channel) rule stays scoped to N exactly as before: it does
 * not follow the candidate to its home namespace.
 */
import { Node, Project, SyntaxKind, type SourceFile } from "ts-morph";
import {
  BROWSER_ORDER,
  browsersOf,
  getSource,
  hasSource,
  type BrowserId,
  type IRElement,
  type IRNamespace,
} from "./generator";

export type SlotKind = "parameter" | "return" | "member";

export interface Slot {
  namespace: string;
  kind: SlotKind;
  /** `getTitle(details)`, `getTitle()`, `Tab.mutedInfo`. */
  label: string;
  /** Names each browser puts in this slot. Usually one; a union gives more. */
  names: Map<BrowserId, Set<string>>;
}

/** A canonical-name candidate in the pool for one browser, tagged with the namespace it actually came from. */
interface PoolEntry {
  name: string;
  home: string;
  weight: number;
}

export interface CuratedVerdicts {
  /** Two names that share a slot and are still two concepts. */
  distinct?: Array<{ namespace: string; names: [string, string]; reason: string }>;
  /** A browser's contribution to a slot that is not evidence of identity. */
  ignore?: Array<{ namespace: string; slot: string; browser: BrowserId; reason: string }>;
  /**
   * A group one browser splits into two member sets that is nonetheless one
   * concept. The reason must say which member differs and why that is width,
   * not identity.
   */
  accept?: Array<{ namespace: string; names: string[]; reason: string }>;
  /** A namespace whose naming waits on another decision. No slot in it joins anything. */
  defer?: Array<{ namespace: string; reason: string }>;
  /**
   * Force one browser's declared name onto another name outright, independent
   * of slot-sharing. Emits one DerivedRow with basis "curated", so
   * applyCanonicalNames() applies it exactly like a slot-derived rename.
   * Unresolved if `browser` does not declare `name`, or already declares
   * `canonical`.
   */
  rename?: Array<{ namespace: string; browser: BrowserId; name: string; canonical: string; reason: string }>;
}

export interface DerivedRow {
  namespace: string;
  browser: BrowserId;
  name: string;
  canonical: string;
  basis: SlotKind | "verdict" | "curated" | "alias-group" | "alias-collapse" | "deprefix";
  citation: string;
  curatedVerdict: string;
}

export interface Group {
  namespace: string;
  canonical: string;
  /** How the winner was chosen. */
  rule: "chrome-public" | "firefox-public" | "safari-deprefixed";
  names: Partial<Record<BrowserId, string[]>>;
  slots: string[];
  /** A contributor that could not vote, and the input that says so. */
  noVote?: string[];
}

export interface DeriveOptions {
  /** Browsers that do not ship a namespace to stable, with the input line saying so. */
  noVote?: Array<{ browser: BrowserId; namespace: string; citation: string }>;
  /**
   * Namespace -> group id, for namespaces Safari's package treats as aliases
   * of each other (`export import contextMenus = browser.menus`). Namespaces
   * sharing a group id pool their slot contributions when picking a
   * `canonical` name; see the module comment above.
   */
  aliasGroups?: Map<string, string>;
  /**
   * `${namespace} ${kind} ${label}` slot keys the single-voter alias-group
   * pass (below) has already decided, in an earlier fixpoint pass
   * (scripts/derive-names.ts): skip re-deciding them here. A slot this pass
   * resolved collapses back down to one name in the next pass's ir, which
   * looks identical to a slot that never had a second name to begin with --
   * re-running the same decision against that consolidated ir cannot tell
   * the two apart, and would both misreport an already-adopted slot as a
   * fresh leftover and waste a duplicate row. Passed in, never computed
   * here: this module has no memory of its own across calls.
   */
  aliasGroupSkipSlots?: ReadonlySet<string>;
  /**
   * Run alias collapse and de-prefix (the module comment's fourth and fifth
   * CAN-001 primitives) this call. False on every pass of the slot-based
   * fixpoint (scripts/derive-names.ts): a `_` name's containing interface can
   * still be mid-unification (`declarativeNetRequest.RuleActionType` only
   * meets Firefox's `_RuleActionType` at a member slot once RuleAction
   * itself has one name across browsers, which can take more than one pass),
   * and de-prefix reporting that pairing "unresolved" on an early pass,
   * before the slot rules get their turn, sticks forever: an unresolved
   * message is real the moment any pass reports it (see derive-names.ts's
   * isCurated comment). So the driver runs the slot-based passes to a
   * fixpoint first, with this unset, then makes one further call with it set
   * true, once every slot the fixpoint can ever join has already joined.
   */
  finalPass?: boolean;
}

export interface Derivation {
  rows: DerivedRow[];
  groups: Group[];
  unresolved: string[];
  /** Namespaces skipped by a curated defer, with the reason. */
  deferred: Array<{ namespace: string; reason: string }>;
  /** Slots that pair names across namespaces. Out of scope, listed so they are seen. */
  crossNamespace: string[];
  /**
   * A slot in an alias-group namespace with a single, ungrouped name whose
   * sibling namespace could not supply a canonical for the matching slot:
   * either no sibling declares that slot at all, or the sibling's own
   * declaration there is itself a single ungrouped name (not a real
   * concept-yet, since nothing forced it to converge). Nothing is renamed;
   * listed so the gap is seen rather than silently dropped.
   */
  aliasGroupLeftovers: string[];
  /**
   * `${namespace} ${kind} ${label}` for every slot the single-voter
   * alias-group pass decided this call (adopted a sibling's canonical,
   * found a conflict, or found nothing to adopt), not filtered by
   * `aliasGroupSkipSlots`, so a caller iterating to a fixpoint can fold
   * these into the next call's skip set and never re-decide a slot once
   * it has been decided once. Empty when `options.aliasGroups` is unset.
   */
  aliasGroupConsidered: string[];
}

const scratch = new Project({ useInMemoryFileSystem: true });
let seq = 0;
function parse(text: string): SourceFile {
  return scratch.createSourceFile(`__names${seq++}.d.ts`, text, { overwrite: true });
}

/** Element names in a namespace that a declaration can refer to by name. */
function nameableTypes(ns: IRNamespace): Set<string> {
  const out = new Set<string>();
  for (const [name, el] of ns.elements) {
    if (el.kind === "interface" || el.kind === "type") out.add(name);
  }
  return out;
}

/**
 * The named type a slot holds, resolved against one namespace.
 *
 * Only the slot's own type counts. `Tab` in `Promise<Tab>`, `Tab[]`,
 * `Array<Tab>` or `Tab | undefined` is the slot's type; `TabStatus` inside an
 * inline literal `{ status?: TabStatus }` is not, it is a member of a type the
 * browser chose not to name. Descending into literals is what paired
 * `tabs.query`'s Chrome literal with Firefox's `_QueryQueryInfo` through the
 * literal's members.
 *
 * An array element is reported with a `[]` suffix so `T[]` and `T` at the
 * same slot are never taken for one concept. `action.ActionDetails` inside
 * `action` resolves to `ActionDetails`; a generic parameter of the enclosing
 * declaration is skipped; a reference into another namespace is reported to
 * `foreign` and otherwise ignored.
 */
function referencedNames(
  node: Node | undefined,
  nsName: string,
  nameable: Set<string>,
  typeParams: Set<string>,
  foreign: (qualified: string) => void,
  array = false
): Set<string> {
  const out = new Set<string>();
  if (!node) return out;
  const recur = (n: Node | undefined, arr: boolean) =>
    referencedNames(n, nsName, nameable, typeParams, foreign, arr);
  switch (node.getKind()) {
    case SyntaxKind.ParenthesizedType:
      return recur(node.asKindOrThrow(SyntaxKind.ParenthesizedType).getTypeNode(), array);
    case SyntaxKind.ArrayType:
      return recur(node.asKindOrThrow(SyntaxKind.ArrayType).getElementTypeNode(), true);
    case SyntaxKind.UnionType:
      for (const t of node.asKindOrThrow(SyntaxKind.UnionType).getTypeNodes()) {
        for (const n of recur(t, array)) out.add(n);
      }
      return out;
    case SyntaxKind.TypeReference: {
      const ref = node.asKindOrThrow(SyntaxKind.TypeReference);
      const text = ref.getTypeName().getText();
      if (text === "Promise") return recur(ref.getTypeArguments()[0], array);
      if (text === "Array" || text === "ReadonlyArray") return recur(ref.getTypeArguments()[0], true);
      const stripped = text.replace(/^(chrome|browser)\./, "");
      if (typeParams.has(stripped)) return out;
      const suffix = array ? "[]" : "";
      if (stripped.startsWith(`${nsName}.`)) {
        const local = stripped.slice(nsName.length + 1);
        if (nameable.has(local)) out.add(local + suffix);
        return out;
      }
      if (stripped.includes(".")) {
        foreign(stripped);
        return out;
      }
      if (nameable.has(stripped)) out.add(stripped + suffix);
      return out;
    }
    default:
      return out; // a literal, a function type, a keyword: no name in this slot
  }
}

/** The result type a function reports: `Promise<T>` or the callback's first argument. */
function resultNode(fn: import("ts-morph").FunctionDeclaration): Node | undefined {
  const ret = fn.getReturnTypeNode();
  if (ret && ret.getKind() === SyntaxKind.TypeReference) {
    const r = ret.asKindOrThrow(SyntaxKind.TypeReference);
    if (r.getTypeName().getText() === "Promise") return r.getTypeArguments()[0];
  }
  const last = fn.getParameters().at(-1);
  const t = last?.getTypeNode();
  if (t && t.getKind() === SyntaxKind.FunctionType) {
    return t.asKindOrThrow(SyntaxKind.FunctionType).getParameters()[0]?.getTypeNode();
  }
  return undefined;
}

/** Every slot in the IR, keyed by namespace, kind and label. */
export function collectSlots(ir: Map<string, IRNamespace>): { slots: Slot[]; crossNamespace: string[] } {
  const slots = new Map<string, Slot>();
  const cross = new Set<string>();
  const slotFor = (namespace: string, kind: SlotKind, label: string): Slot => {
    const key = `${namespace} ${kind} ${label}`;
    let s = slots.get(key);
    if (!s) {
      s = { namespace, kind, label, names: new Map() };
      slots.set(key, s);
    }
    return s;
  };
  const put = (slot: Slot, b: BrowserId, names: Set<string>) => {
    if (names.size === 0) return;
    if (!slot.names.has(b)) slot.names.set(b, new Set());
    for (const n of names) slot.names.get(b)!.add(n);
  };

  for (const [nsName, ns] of ir) {
    const nameable = nameableTypes(ns);
    for (const [elName, el] of ns.elements) {
      for (const b of browsersOf(el)) {
        const src = getSource(el, b);
        if (!src) continue;
        const foreign = (q: string) => cross.add(`${nsName}.${elName} [${b}] refers to ${q}`);
        const file = parse(src);

        if (el.kind === "function") {
          for (const fn of file.getFunctions()) {
            const tps = new Set(fn.getTypeParameters().map((t) => t.getName()));
            for (const p of fn.getParameters()) {
              const t = p.getTypeNode();
              if (t && t.getKind() === SyntaxKind.FunctionType) continue; // the callback is the return slot
              put(slotFor(nsName, "parameter", `${elName}(${p.getName()})`), b,
                  referencedNames(t, nsName, nameable, tps, foreign));
            }
            put(slotFor(nsName, "return", `${elName}()`), b,
                referencedNames(resultNode(fn), nsName, nameable, tps, foreign));
          }
        } else if (el.kind === "interface" && browsersOf(el).length > 1) {
          // Only an interface the browsers already share can anchor a member
          // slot: the member has to be the same member.
          for (const iface of file.getInterfaces()) {
            const tps = new Set(iface.getTypeParameters().map((t) => t.getName()));
            for (const m of iface.getMembers()) {
              if (!Node.isPropertySignature(m)) continue;
              put(slotFor(nsName, "member", `${elName}.${m.getName()}`), b,
                  referencedNames(m.getTypeNode(), nsName, nameable, tps, foreign));
            }
          }
        }
      }
    }
  }
  return { slots: [...slots.values()], crossNamespace: [...cross].sort() };
}

/**
 * Member names of an interface, inheritance resolved, or the normalized text
 * of a type alias.
 *
 * `extends` is followed within the namespace, and `Omit<Base, "k">` is
 * followed minus the named keys, because Firefox's generated types express
 * "same shape, one member re-documented" as `_UpdateContentScriptsScripts
 * extends RegisteredContentScript` and "same shape, one member made optional"
 * as `extends Omit<RegisteredUserScript, "js"> { js?: ... }`. Own members
 * alone made both look like one-member types and refused two real groups.
 */
function shapeOf(el: IRElement, b: BrowserId, ns: IRNamespace, seen = new Set<string>()): string {
  const src = getSource(el, b) ?? "";
  const file = parse(src);
  const iface = file.getInterfaces()[0];
  if (!iface) return src.replace(/\s+/g, " ").trim();
  const members = new Set(
    iface.getMembers().map((m) => (Node.isPropertySignature(m) || Node.isMethodSignature(m) ? m.getName() : m.getText()))
  );
  seen.add(el.name);
  for (const h of iface.getExtends()) {
    let baseName = h.getExpression().getText().replace(/^(chrome|browser)\./, "").replace(new RegExp(`^${ns.name}\\.`), "");
    let omit = new Set<string>();
    if (baseName === "Omit" || baseName === "Pick") {
      const [target, keys] = h.getTypeArguments();
      const wanted = new Set((keys?.getText() ?? "").match(/"([^"]+)"/g)?.map((k) => k.slice(1, -1)) ?? []);
      baseName = target?.getText().replace(/^(chrome|browser)\./, "") ?? "";
      if (h.getExpression().getText() === "Omit") omit = wanted;
      else {
        // Pick keeps only the listed keys.
        const base = ns.elements.get(baseName);
        const baseMembers = base && !seen.has(baseName) ? shapeOf(base, b, ns, seen).split(",") : [];
        for (const m of baseMembers) if (wanted.has(m)) members.add(m);
        continue;
      }
    }
    const base = ns.elements.get(baseName);
    if (!base || seen.has(baseName) || !getSource(base, b)) continue;
    for (const m of shapeOf(base, b, ns, seen).split(",")) if (m && !omit.has(m)) members.add(m);
  }
  return [...members].sort().join(",");
}

/**
 * The prefix Safari puts on its names in a namespace, derived from the names
 * themselves: the leading run of capitalized words that the most Safari-only
 * types in the namespace share, at least two of them. `ActionDetails` and
 * `ActionSetTitleDetails` share `Action`; `WindowQueryOptions` and
 * `WindowCreateData` share `Window`. Only names no other browser declares
 * count: a shared name is by definition not prefixed, and counting
 * `MessageSender` once made `Message` a prefix and `MessageOptions` into
 * `Options`. The most-shared prefix, not the longest, so `ActionSetBadge`
 * (two names) loses to `Action` (seven). A namespace with one Safari-only
 * type, or with no shared prefix, has none.
 */
export function safariPrefix(ns: IRNamespace): { prefix: string; sharedBy: number } | undefined {
  const names = [...ns.elements.values()]
    .filter((el) => (el.kind === "interface" || el.kind === "type")
      && browsersOf(el).length === 1 && getSource(el, "safari"))
    .map((el) => el.name);
  const counts = new Map<string, number>();
  for (const n of names) {
    for (const m of n.matchAll(/[A-Z][a-z0-9]*|[A-Z]+(?![a-z])/g)) {
      const end = (m.index ?? 0) + m[0].length;
      if (end >= n.length) continue; // the whole name is not a prefix of itself
      const p = n.slice(0, end);
      counts.set(p, (counts.get(p) ?? 0) + 1);
    }
  }
  // On a tie, the prefix that is a segment of the namespace name wins: that
  // is what the prefix is. Splitting on capitals cannot tell that `DevTools`
  // is one word, so `Dev` and `DevTools` tie on every devtools name, and
  // `Action` and `ActionSet` tie when only the setters are Safari-only.
  // Without the namespace, the shorter wins, since the longer is a word of
  // the type's own name.
  const segments = new Set(ns.name.split(".").map((seg) => seg.toLowerCase()));
  const rank = (p: string, c: number) => [c, segments.has(p.toLowerCase()) ? 1 : 0, -p.length];
  let best: { prefix: string; sharedBy: number } | undefined;
  for (const [p, c] of counts) {
    if (c < 2) continue;
    if (!best) { best = { prefix: p, sharedBy: c }; continue; }
    const a = rank(p, c), b = rank(best.prefix, best.sharedBy);
    if (a[0] > b[0] || (a[0] === b[0] && (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2])))) best = { prefix: p, sharedBy: c };
  }
  return best;
}

/**
 * The name a type alias's entire body refers to, when that body is nothing
 * but one TypeReference: no union, no array, no generics, no literal.
 * `type ContextType = _ContextType;` returns `_ContextType`;
 * `type ResolveFlags = _ResolveFlags[];` (array) and
 * `type OptionalPermission = OptionalPermissionNoPrompt | _OptionalPermission`
 * (union) both return undefined, because their body is not one reference.
 * Used by alias collapse below to find a browser's own re-export of its own
 * generated helper.
 */
function bareAliasTarget(src: string, nsName: string): string | undefined {
  const file = parse(src);
  const alias = file.getTypeAliases()[0];
  const node = alias?.getTypeNode();
  if (!node || node.getKind() !== SyntaxKind.TypeReference) return undefined;
  const ref = node.asKindOrThrow(SyntaxKind.TypeReference);
  if (ref.getTypeArguments().length > 0) return undefined;
  return ref.getTypeName().getText().replace(/^(chrome|browser)\./, "").replace(new RegExp(`^${nsName}\\.`), "");
}

class UnionFind {
  private parent = new Map<string, string>();
  find(x: string): string {
    if (!this.parent.has(x)) this.parent.set(x, x);
    let r = x;
    while (this.parent.get(r) !== r) r = this.parent.get(r)!;
    let c = x;
    while (this.parent.get(c) !== r) { const n = this.parent.get(c)!; this.parent.set(c, r); c = n; }
    return r;
  }
  union(a: string, b: string): void {
    const ra = this.find(a), rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

export function deriveCanonicalNames(
  ir: Map<string, IRNamespace>,
  curated: CuratedVerdicts = {},
  options: DeriveOptions = {}
): Derivation {
  const { slots, crossNamespace } = collectSlots(ir);
  const slotIndex = new Map<string, Slot>();
  for (const s of slots) slotIndex.set(`${s.namespace} ${s.kind} ${s.label}`, s);
  const distinct = new Set<string>();
  for (const d of curated.distinct ?? []) {
    distinct.add(`${d.namespace} ${d.names[0]} ${d.names[1]}`);
    distinct.add(`${d.namespace} ${d.names[1]} ${d.names[0]}`);
  }
  const ignored = new Map<string, string>();
  for (const i of curated.ignore ?? []) ignored.set(`${i.namespace} ${i.slot} ${i.browser}`, i.reason);

  const uf = new UnionFind();
  const joinedBy = new Map<string, Slot[]>(); // name key -> slots that involved it
  const key = (ns: string, name: string) => `${ns} ${name}`;
  const deferred = (curated.defer ?? []).map((d) => ({ namespace: d.namespace, reason: d.reason }));
  const deferredNs = new Set(deferred.map((d) => d.namespace));

  for (const slot of slots) {
    if (deferredNs.has(slot.namespace)) continue;
    const contributions: Array<[BrowserId, string]> = [];
    for (const [b, names] of slot.names) {
      if (ignored.has(`${slot.namespace} ${slot.label} ${b}`)) continue;
      for (const n of names) contributions.push([b, n]);
    }
    // `T[]` and `T` in one slot are two contributions that never meet.
    for (const arity of ["", "[]"]) {
      const distinctNames = new Set(
        contributions.map(([, n]) => n)
          .filter((n) => n.endsWith("[]") === (arity === "[]"))
          .map((n) => n.replace(/\[\]$/, ""))
      );
      if (distinctNames.size < 2) continue;
      for (const n of distinctNames) {
        const k = key(slot.namespace, n);
        if (!joinedBy.has(k)) joinedBy.set(k, []);
        if (!joinedBy.get(k)!.includes(slot)) joinedBy.get(k)!.push(slot);
      }
      for (const a of distinctNames) {
        for (const b of distinctNames) {
          if (a >= b) continue;
          if (distinct.has(`${slot.namespace} ${a} ${b}`)) continue;
          uf.union(key(slot.namespace, a), key(slot.namespace, b));
        }
      }
    }
  }

  const members = new Map<string, Set<string>>();
  for (const k of joinedBy.keys()) {
    const r = uf.find(k);
    if (!members.has(r)) members.set(r, new Set());
    members.get(r)!.add(k);
  }

  const rows: DerivedRow[] = [];
  const groups: Group[] = [];
  const unresolved: string[] = [];

  for (const keys of members.values()) {
    if (keys.size < 2) continue;
    const nsName = [...keys][0].split(" ")[0];
    const ns = ir.get(nsName)!;
    const names = [...keys].map((k) => k.split(" ")[1]).sort();
    const slotLabels = [...new Set(names.flatMap((n) => joinedBy.get(key(nsName, n))!.map((s) => `${s.kind} ${s.label}`)))].sort();

    // A curated pair that still ended up together (through a third name) is a
    // contradiction, not a group.
    const violated = names.flatMap((a) => names.filter((b) => a < b && distinct.has(`${nsName} ${a} ${b}`)).map((b) => `${a}/${b}`));
    if (violated.length) {
      unresolved.push(`${nsName}: {${names.join(", ")}} joins a pair curated distinct (${violated.join(", ")}) via ${slotLabels.join("; ")}`);
      continue;
    }

    const byBrowser: Partial<Record<BrowserId, string[]>> = {};
    for (const n of names) {
      const el = ns.elements.get(n)!;
      for (const b of browsersOf(el)) (byBrowser[b] ??= []).push(n);
    }

    // One browser, two shapes: not one concept, unless a curated verdict says
    // the difference is width and names the member.
    const accepted = (curated.accept ?? []).find((a) => a.namespace === nsName
      && a.names.length === names.length && a.names.every((n) => names.includes(n)));
    let conflict: string | undefined;
    for (const b of BROWSER_ORDER) {
      const mine = byBrowser[b] ?? [];
      const shapes = new Map(mine.map((n) => [n, shapeOf(ns.elements.get(n)!, b, ns)]));
      if (new Set(shapes.values()).size > 1) {
        conflict = `${b} contributes ${mine.map((n) => `${n} {${shapes.get(n)}}`).join(" and ")}`;
        break;
      }
    }
    if (conflict && accepted) conflict = undefined;
    if (conflict) {
      unresolved.push(`${nsName}: {${names.join(", ")}} is two concepts: ${conflict}; via ${slotLabels.join("; ")}`);
      continue;
    }

    const slotCount = (n: string) => joinedBy.get(key(nsName, n))!.length;
    const barred = (options.noVote ?? []).filter((v) => v.namespace === nsName && byBrowser[v.browser]?.length);
    const noVote = barred.map((v) => `${v.browser}: ${v.citation}`);

    // The candidate pool for this browser: nsName's own contributions, plus,
    // when nsName belongs to an alias group, whatever that browser
    // contributes at the same slot (same kind, same label) in a sibling
    // namespace of the group. A sibling that is itself deferred contributes
    // nothing: a deferred namespace makes no naming claim, including this
    // one. See the module comment for what this can and cannot change.
    const groupId = options.aliasGroups?.get(nsName);
    const poolFor = (b: BrowserId): PoolEntry[] => {
      const out: PoolEntry[] = (byBrowser[b] ?? []).map((n) => ({ name: n, home: nsName, weight: slotCount(n) }));
      if (!groupId) return out;
      for (const label of slotLabels) {
        const sep = label.indexOf(" ");
        const kind = label.slice(0, sep);
        const rest = label.slice(sep + 1);
        for (const [otherNs, otherGroupId] of options.aliasGroups!) {
          if (otherGroupId !== groupId || otherNs === nsName || deferredNs.has(otherNs)) continue;
          const sibling = slotIndex.get(`${otherNs} ${kind} ${rest}`);
          const siblingNames = sibling?.names.get(b);
          if (!siblingNames || ignored.has(`${otherNs} ${rest} ${b}`)) continue;
          for (const raw of siblingNames) out.push({ name: raw.replace(/\[\]$/, ""), home: otherNs, weight: 1 });
        }
      }
      return out;
    };
    const pickPublic = (b: BrowserId): PoolEntry | undefined =>
      barred.some((v) => v.browser === b) ? undefined
      : poolFor(b).filter((c) => !c.name.startsWith("_")).sort((x, y) => y.weight - x.weight || x.name.localeCompare(y.name))[0];

    let picked = pickPublic("chrome");
    let rule: Group["rule"] = "chrome-public";
    if (!picked) { picked = pickPublic("firefox"); rule = "firefox-public"; }
    let canonical = picked?.name;
    if (!canonical) {
      const safariNames = poolFor("safari").sort((x, y) => y.weight - x.weight || x.name.localeCompare(y.name));
      const pref = safariNames[0] ? safariPrefix(ir.get(safariNames[0].home)!) : undefined;
      const s = safariNames[0];
      if (!s) {
        unresolved.push(`${nsName}: {${names.join(", ")}} has no public name in any contributor; via ${slotLabels.join("; ")}`);
        continue;
      }
      canonical = pref && s.name.startsWith(pref.prefix) && s.name.length > pref.prefix.length ? s.name.slice(pref.prefix.length) : s.name;
      rule = "safari-deprefixed";
      picked = s;
      const taken = ns.elements.get(canonical);
      if (taken && !names.includes(canonical)) {
        unresolved.push(`${nsName}: de-prefixing ${s.name} gives ${canonical}, which ${nsName} already declares for something else; via ${slotLabels.join("; ")}`);
        continue;
      }
    } else if (picked!.home !== nsName) {
      const taken = ns.elements.get(canonical);
      if (taken && !names.includes(canonical)) {
        unresolved.push(`${nsName}: {${names.join(", ")}} adopts ${canonical} from ${picked!.home}'s matching slot in its alias group, which ${nsName} already declares for something else; via ${slotLabels.join("; ")}`);
        continue;
      }
    }

    groups.push({ namespace: nsName, canonical, rule, names: byBrowser, slots: slotLabels, ...(noVote.length ? { noVote } : {}) });
    for (const b of BROWSER_ORDER) {
      for (const n of byBrowser[b] ?? []) {
        const first = joinedBy.get(key(nsName, n))![0];
        const others = [...first.names.entries()]
          .filter(([ob]) => ob !== b)
          .map(([ob, ns2]) => `${ob} names it ${[...ns2].map((x) => x.replace(/\[\]$/, "")).join("|")}`)
          .join(", ");
        rows.push({
          namespace: nsName, browser: b, name: n, canonical, basis: first.kind,
          citation: `${first.kind} ${first.label} in ${b}; ${others}`,
          curatedVerdict: accepted ? `accepted as one concept: ${accepted.reason}` : "",
        });
      }
    }
  }

  // Single-voter adoption (WORKPLAN CAN-002 extension, INT-023): a slot with
  // only one contributing name never enters the union-find above and so
  // keeps that name, even when a sibling namespace in the same alias group
  // already resolved the identical slot to a real canonical; this adopts
  // the sibling's canonical instead. Renames a declaration N already has;
  // never adds a browser to N.
  const aliasGroupLeftovers: string[] = [];
  const aliasGroupConsidered: string[] = [];
  if (options.aliasGroups) {
    const canonicalAt = (nsName: string, kind: SlotKind, label: string): string | undefined =>
      groups.find((g) => g.namespace === nsName && g.slots.includes(`${kind} ${label}`))?.canonical;
    const skip = options.aliasGroupSkipSlots;

    // One declaration can occupy several slots (`action`'s `Details` is the
    // parameter of six different getters), and it is one adoption decision,
    // not one per slot: gather every un-grouped (namespace, browser, name)
    // and every slot it occupies first, then decide and emit once each.
    interface Candidate { slots: Array<{ kind: SlotKind; label: string }> }
    const candidates = new Map<string, Candidate>(); // `${ns} ${browser} ${name}` -> slots
    const candidateKey = (ns: string, b: BrowserId, n: string) => `${ns} ${b} ${n}`;

    for (const slot of slots) {
      const nsName = slot.namespace;
      const groupId = options.aliasGroups.get(nsName);
      if (!groupId || deferredNs.has(nsName)) continue;
      if (canonicalAt(nsName, slot.kind, slot.label) !== undefined) continue; // already a real group here
      const slotKey = `${nsName} ${slot.kind} ${slot.label}`;
      if (skip?.has(slotKey)) continue; // already decided in an earlier fixpoint pass

      const contributions: Array<[BrowserId, string]> = [];
      for (const [b, names] of slot.names) {
        if (ignored.has(`${nsName} ${slot.label} ${b}`)) continue;
        for (const n of names) contributions.push([b, n.replace(/\[\]$/, "")]);
      }
      const distinctHere = new Set(contributions.map(([, n]) => n));
      if (distinctHere.size !== 1) continue; // 0: nobody votes here; 2+: unions locally above already
      aliasGroupConsidered.push(slotKey);

      for (const [b, n] of contributions) {
        const k = candidateKey(nsName, b, n);
        if (!candidates.has(k)) candidates.set(k, { slots: [] });
        candidates.get(k)!.slots.push({ kind: slot.kind, label: slot.label });
      }
    }

    for (const [k, { slots: occupied }] of candidates) {
      const [nsName, browser, name] = k.split(" ") as [string, BrowserId, string];
      const groupId = options.aliasGroups.get(nsName)!;

      // Every slot this declaration occupies must agree on where it points;
      // a declaration used consistently across several call sites always
      // will, since they all share the same sibling group.
      let adopted: { canonical: string; from: string } | undefined;
      let conflict = false;
      for (const { kind, label } of occupied) {
        let hereAdopted: { canonical: string; from: string } | undefined;
        for (const [otherNs, otherGroupId] of [...options.aliasGroups].sort(([a], [b]) => a.localeCompare(b))) {
          if (otherGroupId !== groupId || otherNs === nsName || deferredNs.has(otherNs)) continue;
          const canonical = canonicalAt(otherNs, kind, label);
          if (canonical) { hereAdopted = { canonical, from: otherNs }; break; }
        }
        if (hereAdopted) {
          if (adopted && adopted.canonical !== hereAdopted.canonical) { conflict = true; break; }
          adopted = hereAdopted;
        }
      }
      const slotList = occupied.map((s) => `${s.kind} ${s.label}`).sort().join(", ");
      if (conflict) {
        aliasGroupLeftovers.push(
          `${nsName}.${name} (${browser}; ${slotList}): its alias-group siblings resolve different slots to different canonicals`
        );
        continue;
      }
      if (!adopted) {
        aliasGroupLeftovers.push(
          `${nsName}.${name} (${browser}; ${slotList}): no sibling in its alias group resolves any of these slots to a canonical`
        );
        continue;
      }
      if (adopted.canonical === name) continue; // already the same name; nothing to rename

      const nsIr = ir.get(nsName)!;
      const taken = nsIr.elements.get(adopted.canonical);
      if (taken && hasSource(taken, browser)) {
        aliasGroupLeftovers.push(
          `${nsName}.${name} (${browser}; ${slotList}): ${adopted.canonical} is already declared in ${nsName} by ${browser}`
        );
        continue;
      }
      rows.push({
        namespace: nsName, browser, name, canonical: adopted.canonical, basis: "alias-group",
        citation: `${slotList} resolves to ${adopted.canonical} in sibling ${adopted.from} (alias group)`,
        curatedVerdict: "",
      });
    }
  }

  // Curated verdicts are rows too, so the plan can see them as resolved.
  for (const d of curated.distinct ?? []) {
    for (const n of d.names) {
      const el = ir.get(d.namespace)?.elements.get(n);
      if (!el) { unresolved.push(`${d.namespace}.${n}: curated distinct, but no upstream declares it`); continue; }
      for (const b of browsersOf(el)) {
        rows.push({ namespace: d.namespace, browser: b, name: n, canonical: n, basis: "verdict",
                    citation: `distinct from ${d.names.find((o) => o !== n)}`, curatedVerdict: d.reason });
      }
    }
  }
  for (const a of curated.accept ?? []) {
    if (!groups.some((g) => g.namespace === a.namespace && a.names.every((n) => Object.values(g.names).flat().includes(n)))) {
      unresolved.push(`${a.namespace}: curated accept for {${a.names.join(", ")}} matches no derived group`);
    }
  }
  for (const i of curated.ignore ?? []) {
    const row = rows.find((r) => r.namespace === i.namespace && r.browser === i.browser
      && slots.some((s) => s.namespace === i.namespace && s.label === i.slot
        && [...(s.names.get(i.browser) ?? [])].some((x) => x.replace(/\[\]$/, "") === r.name)));
    if (row) row.curatedVerdict = `${i.slot} in ${i.browser} ignored: ${i.reason}`;
    else unresolved.push(`${i.namespace}: curated ignore for ${i.slot} in ${i.browser} matches no derived row`);
  }
  for (const r of curated.rename ?? []) {
    const rns = ir.get(r.namespace);
    const el = rns?.elements.get(r.name);
    if (!rns || !el || getSource(el, r.browser) === undefined) {
      unresolved.push(`${r.namespace}.${r.name}: curated rename, but ${r.browser} does not declare it`);
      continue;
    }
    const target = rns.elements.get(r.canonical);
    if (target && getSource(target, r.browser) !== undefined) {
      unresolved.push(`${r.namespace}.${r.canonical}: curated rename target already declared by ${r.browser}`);
      continue;
    }
    rows.push({
      namespace: r.namespace, browser: r.browser, name: r.name, canonical: r.canonical, basis: "curated",
      citation: `curated rename`, curatedVerdict: r.reason,
    });
  }

  // A fourth and fifth CAN-001 primitive, alias collapse and de-prefix, run
  // only when `options.finalPass` is set (see DeriveOptions.finalPass for
  // why the slot-based fixpoint has to finish first). Both scan the IR's
  // elements directly rather than a slot, and both run after every curated
  // verdict above has had its chance to add a row, so "not already covered
  // by a row" sees those too (`cookies._RemoveReturnDetails` stays distinct
  // from `Cookie` by curated verdict; neither primitive revisits it).
  if (options.finalPass) {
    // A browser sometimes ships a generated helper (`_X`) next to a public
    // type alias in the same namespace that only re-exports it (`type X =
    // _X;`). That is one declaration under two spellings, not a de-prefix
    // collision, so it runs first and gives de-prefix a row already
    // covered. Only a bare alias qualifies (bareAliasTarget: a single
    // TypeReference, no union, no array, no generics); a union or array is
    // real width and is left for a curated verdict instead.
    // applyCanonicalNames (src/generator.ts) then replaces the canonical
    // name's circular self-reference with the helper's real body.
    const covered = new Set(rows.map((r) => `${r.namespace} ${r.browser} ${r.name}`));
    for (const [nsName, ns] of ir) {
      if (deferredNs.has(nsName)) continue;
      for (const [elName, el] of ns.elements) {
        if (elName.startsWith("_") || el.kind !== "type") continue;
        for (const b of browsersOf(el)) {
          const refName = bareAliasTarget(getSource(el, b)!, nsName);
          if (!refName || !refName.startsWith("_")) continue;
          const helper = ns.elements.get(refName);
          if (!helper || !hasSource(helper, b)) continue;
          if (covered.has(`${nsName} ${b} ${refName}`)) continue;
          rows.push({
            namespace: nsName, browser: b, name: refName, canonical: elName, basis: "alias-collapse",
            citation: `${b}'s ${elName} is a bare alias to its own ${refName} in the same namespace`,
            curatedVerdict: "",
          });
          covered.add(`${nsName} ${b} ${refName}`);
        }
      }
    }

    // De-prefix (WORKPLAN Workstream G, synthetic-name): a slot with only
    // one contributing browser never reaches the union-find above, so its
    // `_` name would otherwise ship. Drop the leading underscore instead:
    // `_MoveDestination` -> `MoveDestination`. Scans elements, not slots
    // (browsersOf(el).length === 1), scoped to interfaces and types only;
    // chrome-types's `_eval` overloads are functions and keep their name.
    // A collision (the name already declared, or claimed this pass) is
    // unresolved, never guessed, as with a safari-deprefixed collision above.
    const rowCovered = new Set(rows.map((r) => `${r.namespace} ${r.browser} ${r.name}`));
    const deprefixTaken = new Map<string, Set<string>>(); // namespace -> canonical names already spoken for
    for (const r of rows) {
      if (!deprefixTaken.has(r.namespace)) deprefixTaken.set(r.namespace, new Set());
      deprefixTaken.get(r.namespace)!.add(r.canonical);
    }
    for (const [nsName, ns] of ir) {
      if (deferredNs.has(nsName)) continue;
      for (const [elName, el] of ns.elements) {
        if (!elName.startsWith("_")) continue;
        if (el.kind !== "interface" && el.kind !== "type") continue;
        const bs = browsersOf(el);
        if (bs.length !== 1) continue;
        const b = bs[0];
        if (rowCovered.has(`${nsName} ${b} ${elName}`)) continue;
        const canonical = elName.slice(1);
        const taken = ns.elements.has(canonical);
        const claimed = deprefixTaken.get(nsName)?.has(canonical);
        if (taken || claimed) {
          unresolved.push(
            `${nsName}: de-prefixing ${elName} (sole contributor ${b}) gives ${canonical}, which ${nsName} already declares`
          );
          continue;
        }
        if (!deprefixTaken.has(nsName)) deprefixTaken.set(nsName, new Set());
        deprefixTaken.get(nsName)!.add(canonical);
        rows.push({
          namespace: nsName, browser: b, name: elName, canonical, basis: "deprefix",
          citation: `sole contributor ${b} names it ${elName}; no other browser declares this concept`,
          curatedVerdict: "",
        });
      }
    }
  }

  groups.sort((a, b) => a.namespace.localeCompare(b.namespace) || a.canonical.localeCompare(b.canonical));
  rows.sort((a, b) => a.namespace.localeCompare(b.namespace) || a.canonical.localeCompare(b.canonical)
    || BROWSER_ORDER.indexOf(a.browser) - BROWSER_ORDER.indexOf(b.browser) || a.name.localeCompare(b.name));
  for (const d of deferred) {
    if (!ir.has(d.namespace)) unresolved.push(`${d.namespace}: curated defer names a namespace no upstream declares`);
  }
  return {
    rows, groups, unresolved: unresolved.sort(), deferred, crossNamespace,
    aliasGroupLeftovers: aliasGroupLeftovers.sort(),
    aliasGroupConsidered: aliasGroupConsidered.sort(),
  };
}
