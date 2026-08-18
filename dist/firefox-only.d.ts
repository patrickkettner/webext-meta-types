// Auto-generated meta-types

type _WebExtJsonPrimitive = string | number | boolean | null;
type _WebExtJsonValue = _WebExtJsonPrimitive | _WebExtJsonValue[] | { [key: string]: _WebExtJsonValue };
type _WebExtJsonObject = { [key: string]: _WebExtJsonValue };

// TODO: @types/chrome uses (...args: any[]) => void for Event. TypeScript contravariant constraint requirement (TS2344) requires any[].
type CustomChromeEvent<H extends (...args: any[]) => any> = chrome.events.Event<H>;

// TODO: @types/firefox-webext-browser uses any[] in its WebExtEvent signature. TypeScript contravariance requires any[] here to avoid TS2344.
type WebExtEvent<TCallback extends (...args: any[]) => any = (...args: any[]) => any> = {
    addListener(cb: TCallback, ...args: unknown[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
    hasListeners(): boolean;
};

// Standard Web API FileSystemDirectoryEntry stub
type _WebExtDirectoryEntry = {
    isFile: false;
    isDirectory: true;
    name: string;
    fullPath: string;
    filesystem: { name: string; root: _WebExtDirectoryEntry };
};

// WebUSB specification minimum stub for Chrome extension usb API
declare namespace usb {
    export interface Device {
        vendorId: number;
        productId: number;
        deviceClass: number;
        deviceSubclass: number;
        deviceProtocol: number;
        manufacturerName?: string;
        productName?: string;
        serialNumber?: string;
    }
}
type LocalMediaStream = MediaStream;

declare namespace chrome {
export namespace action {
/**
 * @supported Firefox
 */
export interface OpenPopupOptions {
    windowId?: number;
}
/**
 * @supported Firefox
 */
export const onClicked: events.Event<(tab: tabs.Tab, info?: OnClickData) => void>;
/**
 * @supported Firefox
 */
export function setTitle(details: _SetTitleDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getTitle(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getPopup(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function setBadgeText(details: _SetBadgeTextDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeText(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function setBadgeBackgroundColor(details: _SetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
/**
 * @supported Firefox
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }): Promise<void>;
/**
 * @supported Firefox
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }, callback: () => void): void;
/**
 * @supported Firefox
 */
export function getBadgeTextColor(details: { tabId?: number }): Promise<ColorArray>;
/**
 * @supported Firefox
 */
export function getBadgeTextColor(details: { tabId?: number }, callback: (color: ColorArray) => void): void;
/**
 * @supported Firefox
 */
export function enable(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function disable(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function isEnabled(details: Details): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export function getUserSettings(): Promise<_GetUserSettingsReturnUserSettings>;
/**
 * @supported Firefox
 */
export function openPopup(options?: OpenPopupOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function openPopup(options: OpenPopupOptions | undefined, callback: () => void): void;
/**
 * @supported Firefox
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Firefox
 */
export interface Details {
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export type ColorArray = [number, number, number, number];
/**
 * @supported Firefox
 */
export type ImageDataType = ImageData;
/**
 * @supported Firefox
 */
export type ColorValue = string | ColorArray | null;
/**
 * @supported Firefox
 */
export interface OnClickData {
    modifiers: _OnClickDataModifiers[];
    button?: number | undefined;
}
/**
 * @supported Firefox
 */
export type _OnClickDataModifiers =
        | "Shift"
        | "Alt"
        | "Command"
        | "Ctrl"
        | "MacCtrl";
/**
 * @supported Firefox
 */
export interface _SetTitleDetails {
    title: string | null;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetUserSettingsReturnUserSettings {
    isOnToolbar?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails {
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    path?: string | {
            [key: number]: string;
        } | undefined;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails {
    popup: string | null;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextDetails {
    text: string | null;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeBackgroundColorDetails {
    color: ColorValue;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextColorDetails {
    color: ColorValue;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OpenPopupOptions {
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export type IconSizeMap = Record<number | string, string>;
/**
 * @supported Firefox
 */
export type ImageDataSizeMap = Record<number | string, globalThis.ImageData | extensionTypes.ImageDataType>;
/**
 * @supported Firefox
 */
export interface SetIconDetails {
    tabId?: number;
    imageData?: globalThis.ImageData | extensionTypes.ImageDataType | ImageDataSizeMap;
    path?: string | IconSizeMap;
}

}

export namespace alarms {
/**
 * @supported Firefox
 */
export interface Alarm {
    name: string;
    scheduledTime: number;
    periodInMinutes?: number | undefined;
}
/**
 * @supported Firefox
 */
export const onAlarm: WebExtEvent<(name: Alarm) => void>;
/**
 * @supported Firefox
 */
export function create(alarmInfo: _CreateAlarmInfo): Promise<void>;
/**
 * @supported Firefox
 */
export function create(name: string, alarmInfo: _CreateAlarmInfo): Promise<void>;
/**
 * @supported Firefox
 */
export function get(name?: string): Promise<Alarm | undefined>;
/**
 * @supported Firefox
 */
export function getAll(): Promise<Alarm[]>;
/**
 * @supported Firefox
 */
export function clear(name?: string): Promise<boolean>;
/**
 * @supported Firefox
 */
export function clearAll(): Promise<boolean>;
/**
 * @supported Firefox
 */
export interface _CreateAlarmInfo {
    when?: number | undefined;
    delayInMinutes?: number | undefined;
    periodInMinutes?: number | undefined;
}

}

export namespace bookmarks {
/**
 * @supported Firefox
 */
export type BookmarkTreeNodeUnmodifiable = "managed";
/**
 * @supported Firefox
 */
export interface BookmarkTreeNode {
    id: string;
    parentId?: string | undefined;
    index?: number | undefined;
    url?: string | undefined;
    title: string;
    dateAdded?: number | undefined;
    dateGroupModified?: number | undefined;
    unmodifiable?: BookmarkTreeNodeUnmodifiable | undefined;
    type?: BookmarkTreeNodeType | undefined;
    children?: BookmarkTreeNode[] | undefined;
}
/**
 * @supported Firefox
 */
export interface CreateDetails {
    parentId?: string | undefined;
    index?: number | undefined;
    title?: string | undefined;
    url?: string | undefined;
    type?: BookmarkTreeNodeType | undefined;
}
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(id: string, bookmark: BookmarkTreeNode) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: events.Event<(id: string, removeInfo: { parentId: string; index: number; node?: BookmarkTreeNode }) => void>;
/**
 * @supported Firefox
 */
export const onChanged: events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;
/**
 * @supported Firefox
 */
export const onMoved: events.Event<(id: string, moveInfo: { parentId: string; index: number; oldParentId: string; oldIndex: number }) => void>;
/**
 * @supported Firefox
 */
export function get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function getChildren(id: string): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function getTree(): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function getSubTree(id: string): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function search(
        query: string | {
            /** A string of words that are matched against bookmark URLs and titles. */
            query?: string | undefined;
            /** The URL of the bookmark; matches verbatim. Note that folders have no URL. */
            url?: string | undefined;
            /** The title of the bookmark; matches verbatim. */
            title?: string | undefined;
        },
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Firefox
 */
export function create(bookmark: CreateDetails): Promise<BookmarkTreeNode>;
/**
 * @supported Firefox
 */
export function move(id: string, destination: _MoveDestination): Promise<BookmarkTreeNode>;
/**
 * @supported Firefox
 */
export function update(id: string, changes: _UpdateChanges): Promise<BookmarkTreeNode>;
/**
 * @supported Firefox
 */
export function remove(id: string): Promise<void>;
/**
 * @supported Firefox
 */
export function removeTree(id: string): Promise<void>;
/**
 * @supported Firefox
 */
export type BookmarkTreeNodeType =
        | "bookmark"
        | "folder"
        | "separator";
/**
 * @supported Firefox
 */
export interface _MoveDestination {
    parentId?: string | undefined;
    index?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateChanges {
    title?: string | undefined;
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedRemoveInfo {
    parentId: string;
    index: number;
    node: BookmarkTreeNode;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    title: string;
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnMovedMoveInfo {
    parentId: string;
    index: number;
    oldParentId: string;
    oldIndex: number;
}
/**
 * @supported Firefox
 */
export interface _OnChildrenReorderedReorderInfo {
    childIds: string[];
}

}

export namespace browsingData {
/**
 * @supported Firefox
 */
export interface RemovalOptions {
    since?: extensionTypes.Date | undefined;
    hostnames?: string[] | undefined;
    cookieStoreId?: string | undefined;
    originTypes?: _RemovalOptionsOriginTypes | undefined;
}
/**
 * @supported Firefox
 */
export interface DataTypeSet {
    cache?: boolean | undefined;
    cookies?: boolean | undefined;
    downloads?: boolean | undefined;
    formData?: boolean | undefined;
    history?: boolean | undefined;
    indexedDB?: boolean | undefined;
    localStorage?: boolean | undefined;
    serverBoundCertificates?: boolean | undefined;
    passwords?: boolean | undefined;
    pluginData?: boolean | undefined;
    serviceWorkers?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export function settings(): Promise<_SettingsReturnResult>;
/**
 * @supported Firefox
 */
export function remove(options: RemovalOptions, dataToRemove: DataTypeSet): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCache(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCookies(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removeDownloads(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removeFormData(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removeHistory(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removeLocalStorage(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removePluginData(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function removePasswords(options: RemovalOptions): Promise<void>;
/**
 * @supported Firefox
 */
export interface _RemovalOptionsOriginTypes {
    unprotectedWeb?: boolean | undefined;
    protectedWeb?: boolean | undefined;
    extension?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SettingsReturnResult {
    options: RemovalOptions;
    dataToRemove: DataTypeSet;
    dataRemovalPermitted: DataTypeSet;
}

}

export namespace commands {
/**
 * @supported Firefox
 */
export interface Command {
    name?: string | undefined;
    description?: string | undefined;
    shortcut?: string | undefined;
}
/**
 * @supported Firefox
 */
export const onCommand: events.Event<(command: string, tab?: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export function getAll(): Promise<Command[]>;
/**
 * @supported Firefox
 */
export interface _UpdateDetail {
    name: string;
    description?: string | undefined;
    shortcut?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    name: string;
    newShortcut: string;
    oldShortcut: string;
}
/**
 * @supported Firefox
 */
export function update(detail: _UpdateDetail): Promise<void>;
/**
 * @supported Firefox
 */
export function reset(name: string): Promise<void>;
/**
 * @supported Firefox
 */
export function openShortcutSettings(): Promise<void>;
/**
 * @supported Firefox
 */
export const onChanged: WebExtEvent<(changeInfo: _OnChangedChangeInfo) => void>;

}

export namespace contentScripts {
/**
 * @supported Firefox
 */
export interface RegisteredContentScriptOptions {
    matches: _manifest.MatchPattern[];
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    includeGlobs?: string[] | undefined;
    excludeGlobs?: string[] | undefined;
    css?: extensionTypes.ExtensionFileOrCode[] | undefined;
    js?: extensionTypes.ExtensionFileOrCode[] | undefined;
    allFrames?: boolean | undefined;
    matchAboutBlank?: boolean | undefined;
    matchOriginAsFallback?: boolean | undefined;
    runAt?: extensionTypes.RunAt | undefined;
    world?: extensionTypes.ExecutionWorld | undefined;
    cookieStoreId?: string[] | string | undefined;
    cssOrigin?: extensionTypes.CSSOrigin;
}
/**
 * @supported Firefox
 */
export interface RegisteredContentScript {
    unregister(): Promise</* TODO: Upstream type uses any */ any>;
    unregister(): Promise<void>;
}
/**
 * @supported Firefox
 */
export function register(contentScriptOptions: RegisteredContentScriptOptions): Promise<RegisteredContentScript>;

}

export namespace contextMenus {
/**
 * @supported Firefox
 */
export type ContextType = _ContextType;
/**
 * @supported Firefox
 */
export type ItemType =
        | "normal"
        | "checkbox"
        | "radio"
        | "separator";
/**
 * @supported Firefox
 */
export interface OnClickData {
    menuItemId: number | string;
    parentMenuItemId?: number | string | undefined;
    viewType?: extension.ViewType | undefined;
    mediaType?: string | undefined;
    linkText?: string | undefined;
    linkUrl?: string | undefined;
    srcUrl?: string | undefined;
    pageUrl?: string | undefined;
    frameId?: number | undefined;
    frameUrl?: string | undefined;
    selectionText?: string | undefined;
    editable: boolean;
    wasChecked?: boolean | undefined;
    checked?: boolean | undefined;
    bookmarkId?: string | undefined;
    modifiers: _OnClickDataModifiers[];
    button?: number | undefined;
    targetElementId?: number | undefined;
}
/**
 * @supported Firefox
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Firefox
 */
export const onClicked: WebExtEvent<(info: OnClickData, tab?: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties, callback?: () => void): number | string;
/**
 * @supported Firefox
 */
export function update(id: number | string, updateProperties: _UpdateUpdateProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function remove(menuItemId: number | string): Promise<void>;
/**
 * @supported Firefox
 */
export function removeAll(): Promise<void>;
/**
 * @supported Firefox
 */
export type _ContextType =
        | "all"
        | "page"
        | "frame"
        | "selection"
        | "link"
        | "editable"
        | "password"
        | "image"
        | "video"
        | "audio"
        | "launcher"
        | "bookmark"
        | "tab"
        | "tools_menu"
        | "browser_action"
        | "page_action"
        | "action";
/**
 * @supported Firefox
 */
export type _OnClickDataModifiers =
        | "Shift"
        | "Alt"
        | "Command"
        | "Ctrl"
        | "MacCtrl";
/**
 * @supported Firefox
 */
export interface _CreateCreatePropertiesIcons {
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export type _CreateCreatePropertiesCommand =
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action"
        | "_execute_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";
/**
 * @supported Firefox
 */
export interface _CreateCreateProperties {
    type?: ItemType | undefined;
    id?: string | undefined;
    icons?: _CreateCreatePropertiesIcons | undefined;
    title?: string | undefined;
    checked?: boolean | undefined;
    contexts?: ContextType[] | undefined;
    viewTypes?: extension.ViewType[] | undefined;
    visible?: boolean | undefined;
    onclick?: (info: OnClickData, tab: tabs.Tab) => void | undefined;
    parentId?: number | string | undefined;
    documentUrlPatterns?: string[] | undefined;
    targetUrlPatterns?: string[] | undefined;
    enabled?: boolean | undefined;
    command?: string | _CreateCreatePropertiesCommand | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdatePropertiesIcons {
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    type?: ItemType | undefined;
    icons?: _UpdateUpdatePropertiesIcons | undefined;
    title?: string | undefined;
    checked?: boolean | undefined;
    contexts?: ContextType[] | undefined;
    viewTypes?: extension.ViewType[] | undefined;
    visible?: boolean | undefined;
    onclick?: (info: OnClickData, tab: tabs.Tab) => void | undefined;
    parentId?: number | string | undefined;
    documentUrlPatterns?: string[] | undefined;
    targetUrlPatterns?: string[] | undefined;
    enabled?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type _OverrideContextContextOptionsContext = "bookmark" | "tab";
/**
 * @supported Firefox
 */
export interface _OverrideContextContextOptions {
    showDefaults?: boolean | undefined;
    context?: _OverrideContextContextOptionsContext | undefined;
    bookmarkId?: string | undefined;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnShownInfo {
    menuIds: Array<number | string>;
    contexts: ContextType[];
    viewType?: extension.ViewType | undefined;
    editable: boolean;
    mediaType?: string | undefined;
    linkUrl?: string | undefined;
    linkText?: string | undefined;
    srcUrl?: string | undefined;
    pageUrl?: string | undefined;
    frameUrl?: string | undefined;
    selectionText?: string | undefined;
    targetElementId?: number | undefined;
}
/**
 * @supported Firefox
 */
export function overrideContext(contextOptions: _OverrideContextContextOptions): void;
/**
 * @supported Firefox
 */
export function refresh(): Promise<void>;
/**
 * @supported Firefox
 */
export function getTargetElement(targetElementId: number): Element | void;
/**
 * @supported Firefox
 */
export const onShown: WebExtEvent<(info: _OnShownInfo, tab: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export const onHidden: WebExtEvent<() => void>;

}

export namespace cookies {
/**
 * @supported Firefox
 */
export type SameSiteStatus =
        | "unspecified"
        | "no_restriction"
        | "lax"
        | "strict";
/**
 * @supported Firefox
 */
export interface Cookie {
    name: string;
    value: string;
    domain: string;
    hostOnly: boolean;
    path: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: SameSiteStatus;
    session: boolean;
    expirationDate?: number | undefined;
    storeId: string;
    firstPartyDomain: string;
    partitionKey?: PartitionKey;
}
/**
 * @supported Firefox
 */
export interface CookieStore {
    id: string;
    tabIds: number[];
    incognito: boolean;
}
/**
 * @supported Firefox
 */
export type OnChangedCause =
        | "evicted"
        | "expired"
        | "explicit"
        | "expired_overwrite"
        | "overwrite";
/**
 * @supported Firefox
 */
export const onChanged: events.Event<(changeInfo: { removed: boolean; cookie: Cookie; cause: OnChangedCause }) => void>;
/**
 * @supported Firefox
 */
export function get(details: _GetDetails): Promise<Cookie | null>;
/**
 * @supported Firefox
 */
export function getAll(details: _GetAllDetails): Promise<Cookie[]>;
/**
 * @supported Firefox
 */
export function set(details: _SetDetails): Promise<Cookie>;
/**
 * @supported Firefox
 */
export function remove(details: _RemoveDetails): Promise<_RemoveReturnDetails | null>;
/**
 * @supported Firefox
 */
export function getAllCookieStores(): Promise<CookieStore[]>;
/**
 * @supported Firefox
 */
export interface PartitionKey {
    topLevelSite?: string | undefined;
    hasCrossSiteAncestor?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDetails {
    url: string;
    name: string;
    storeId?: string | undefined;
    firstPartyDomain?: string | undefined;
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetAllDetails {
    url?: string | undefined;
    name?: string | undefined;
    domain?: string | undefined;
    path?: string | undefined;
    secure?: boolean | undefined;
    session?: boolean | undefined;
    storeId?: string | undefined;
    firstPartyDomain?: string | undefined;
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetDetails {
    url: string;
    name?: string | undefined;
    value?: string | undefined;
    domain?: string | undefined;
    path?: string | undefined;
    secure?: boolean | undefined;
    httpOnly?: boolean | undefined;
    sameSite?: SameSiteStatus | undefined;
    expirationDate?: number | undefined;
    storeId?: string | undefined;
    firstPartyDomain?: string | undefined;
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveReturnDetails {
    url: string;
    name: string;
    storeId: string;
    firstPartyDomain: string;
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveDetails {
    url: string;
    name: string;
    storeId?: string | undefined;
    firstPartyDomain?: string | undefined;
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    removed: boolean;
    cookie: Cookie;
    cause: OnChangedCause;
}

}

export namespace declarativeNetRequest {
/**
 * @supported Firefox
 */
export type ResourceType =
        | "main_frame"
        | "sub_frame"
        | "stylesheet"
        | "script"
        | "image"
        | "object"
        | "object_subrequest"
        | "xmlhttprequest"
        | "xslt"
        | "ping"
        | "beacon"
        | "xml_dtd"
        | "font"
        | "media"
        | "websocket"
        | "csp_report"
        | "imageset"
        | "web_manifest"
        | "speculative"
        | "json"
        | "other";
/**
 * @supported Firefox
 */
export type UnsupportedRegexReason = "syntaxError" | "memoryLimitExceeded";
/**
 * @supported Firefox
 */
export interface URLTransform {
    scheme?: _URLTransformScheme | undefined;
    username?: string | undefined;
    password?: string | undefined;
    host?: string | undefined;
    port?: string | undefined;
    path?: string | undefined;
    query?: string | undefined;
    queryTransform?: _URLTransformQueryTransform | undefined;
    fragment?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface Rule {
    id: number;
    priority?: number | undefined;
    condition: _RuleCondition;
    action: _RuleAction;
}
/**
 * @supported Firefox
 */
export interface MatchedRule {
    ruleId: number;
    rulesetId: string;
    extensionId?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface GetRulesFilter {
    ruleIds?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export const GUARANTEED_MINIMUM_STATIC_RULES: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_DYNAMIC_RULES: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_SESSION_RULES: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_REGEX_RULES: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_STATIC_RULESETS: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: number;
/**
 * @supported Firefox
 */
export const DYNAMIC_RULESET_ID: string;
/**
 * @supported Firefox
 */
export const SESSION_RULESET_ID: string;
/**
 * @supported Firefox
 */
export function updateDynamicRules(options: _UpdateDynamicRulesOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function getDynamicRules(filter?: GetRulesFilter): Promise<Rule[]>;
/**
 * @supported Firefox
 */
export function updateSessionRules(options: _UpdateSessionRulesOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function getSessionRules(filter?: GetRulesFilter): Promise<Rule[]>;
/**
 * @supported Firefox
 */
export function updateEnabledRulesets(updateRulesetOptions: _UpdateEnabledRulesetsUpdateRulesetOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function getEnabledRulesets(): Promise<string[]>;
/**
 * @supported Firefox
 */
export function updateStaticRules(options: _UpdateStaticRulesOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function getDisabledRuleIds(options?: _GetDisabledRuleIdsOptions): Promise<number[]>;
/**
 * @supported Firefox
 */
export function isRegexSupported(regexOptions: _IsRegexSupportedRegexOptions): Promise<_IsRegexSupportedReturnResult>;
/**
 * @supported Firefox
 */
export function getAvailableStaticRuleCount(): Promise<number>;
/**
 * @supported Firefox
 */
export function testMatchOutcome(
        request: _TestMatchOutcomeRequest,
        options?: _TestMatchOutcomeOptions,
    ): Promise<_TestMatchOutcomeReturnResult>;
/**
 * @supported Firefox
 */
export type _URLTransformScheme =
        | "http"
        | "https"
        | "moz-extension";
/**
 * @supported Firefox
 */
export interface _URLTransformQueryTransformAddOrReplaceParams {
    key: string;
    value: string;
    replaceOnly?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _URLTransformQueryTransform {
    removeParams?: string[] | undefined;
    addOrReplaceParams?: _URLTransformQueryTransformAddOrReplaceParams[] | undefined;
}
/**
 * @supported Firefox
 */
export type _RuleConditionDomainType = "firstParty" | "thirdParty";
/**
 * @supported Firefox
 */
export interface _RuleCondition {
    urlFilter?: string | undefined;
    regexFilter?: string | undefined;
    isUrlFilterCaseSensitive?: boolean | undefined;
    initiatorDomains?: string[] | undefined;
    excludedInitiatorDomains?: string[] | undefined;
    requestDomains?: string[] | undefined;
    excludedRequestDomains?: string[] | undefined;
    resourceTypes?: ResourceType[] | undefined;
    excludedResourceTypes?: ResourceType[] | undefined;
    requestMethods?: string[] | undefined;
    excludedRequestMethods?: string[] | undefined;
    domainType?: _RuleConditionDomainType | undefined;
    tabIds?: number[] | undefined;
    excludedTabIds?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export type _RuleActionType =
        | "block"
        | "redirect"
        | "allow"
        | "upgradeScheme"
        | "modifyHeaders"
        | "allowAllRequests";
/**
 * @supported Firefox
 */
export interface _RuleActionRedirect {
    extensionPath?: string | undefined;
    transform?: URLTransform | undefined;
    url?: string | undefined;
    regexSubstitution?: string | undefined;
}
/**
 * @supported Firefox
 */
export type _RuleActionRequestHeadersOperation =
        | "append"
        | "set"
        | "remove";
/**
 * @supported Firefox
 */
export interface _RuleActionRequestHeaders {
    header: string;
    operation: _RuleActionRequestHeadersOperation;
    value?: string | undefined;
}
/**
 * @supported Firefox
 */
export type _RuleActionResponseHeadersOperation =
        | "append"
        | "set"
        | "remove";
/**
 * @supported Firefox
 */
export interface _RuleActionResponseHeaders {
    header: string;
    operation: _RuleActionResponseHeadersOperation;
    value?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RuleAction {
    type: _RuleActionType;
    redirect?: _RuleActionRedirect | undefined;
    requestHeaders?: _RuleActionRequestHeaders[] | undefined;
    responseHeaders?: _RuleActionResponseHeaders[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateDynamicRulesOptions {
    removeRuleIds?: number[] | undefined;
    addRules?: Rule[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateSessionRulesOptions {
    removeRuleIds?: number[] | undefined;
    addRules?: Rule[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateEnabledRulesetsUpdateRulesetOptions {
    disableRulesetIds?: string[] | undefined;
    enableRulesetIds?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateStaticRulesOptions {
    rulesetId: string;
    disableRuleIds?: number[] | undefined;
    enableRuleIds?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDisabledRuleIdsOptions {
    rulesetId: string;
}
/**
 * @supported Firefox
 */
export interface _IsRegexSupportedReturnResult {
    isSupported: boolean;
    reason?: UnsupportedRegexReason | undefined;
}
/**
 * @supported Firefox
 */
export interface _IsRegexSupportedRegexOptions {
    regex: string;
    isCaseSensitive?: boolean | undefined;
    requireCapturing?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeReturnResult {
    matchedRules: MatchedRule[];
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeRequest {
    url: string;
    initiator?: string | undefined;
    method?: string | undefined;
    type: ResourceType;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeOptions {
    includeOtherExtensions?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_DISABLED_STATIC_RULES: number;
/**
 * @supported Firefox
 */
export const MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: number;

}

export namespace devtools.inspectedWindow {
/**
 * @supported Firefox
 */
export interface Resource {
    url: string;
}
/**
 * @supported Firefox
 */
export const tabId: number;
/**
 * @supported Firefox
 */
export function reload(reloadOptions?: _ReloadReloadOptions): void;
/**
 * @supported Firefox
 */
export interface _EvalReturnExceptionInfo {
    isError: boolean;
    code: string;
    description: string;
    details: /* TODO: Upstream type uses any */ any[];
    isException: boolean;
    value: string;
}
/**
 * @supported Firefox
 */
export interface _EvalOptions {}
/**
 * @supported Firefox
 */
export interface _ReloadReloadOptions {
    ignoreCache?: boolean;
    userAgent?: string;
    injectedScript?: string;
}
/**
 * @supported Firefox
 */
export function eval<T = unknown>(expression: string, options?: EvalOptions): Promise<[T | undefined, EvaluationExceptionInfo | undefined]>;
/**
 * @supported Firefox
 */
export interface EvaluationExceptionInfo {
    isError: boolean;
    isException: boolean;
    value?: unknown;
    description?: string;
    details?: unknown[];
}
/**
 * @supported Firefox
 */
export interface EvalOptions {
    frameURL?: string;
    useContentScriptContext?: boolean;
    scriptExecutionContext?: string;
}

}

export namespace devtools.network {
/**
 * @supported Firefox
 */
export interface Request {
    getContent(): Promise<object>;
}
/**
 * @supported Firefox
 */
export const onRequestFinished: WebExtEvent<(request: Request) => void>;
/**
 * @supported Firefox
 */
export const onNavigated: WebExtEvent<(url: string) => void>;
/**
 * @supported Firefox
 */
export function getHAR(): Promise<Record<string, unknown>>;

}

export namespace devtools.panels {
/**
 * @supported Firefox
 */
export interface ElementsPanel {
    createSidebarPane(title: string): Promise<ExtensionSidebarPane>;
    onSelectionChanged: WebExtEvent<() => void>;
}
/**
 * @supported Firefox
 */
export interface SourcesPanel {}
/**
 * @supported Firefox
 */
export interface ExtensionPanel {
    onShown: events.Event<(window: Window) => void>;
    onHidden: events.Event<() => void>;
}
/**
 * @supported Firefox
 */
export interface ExtensionSidebarPane {
    onShown: events.Event<(window: Window) => void>;
    onHidden: events.Event<() => void>;
    setExpression(expression: string, rootTitle?: string): Promise<void>;
    setObject(jsonObject: _WebExtJsonObject, rootTitle?: string): Promise<void>;
    setPage(path: string | _manifest.ExtensionURL): Promise<void>;
}
/**
 * @supported Firefox
 */
export interface Button {}
/**
 * @supported Firefox
 */
export const elements: ElementsPanel;
/**
 * @supported Firefox
 */
export const themeName: string;
/**
 * @supported Firefox
 */
export function create(
        title: string,
        iconPath: _manifest.ExtensionURL | "",
        pagePath: _manifest.ExtensionURL,
    ): Promise<ExtensionPanel>;
/**
 * @supported Firefox
 */
export const onThemeChanged: WebExtEvent<(themeName: string) => void>;

}

export namespace dns {
/**
 * @supported Firefox
 */
export function resolve(hostname: string, flags?: ResolveFlags): Promise<DNSRecord>;
/**
 * @supported Firefox
 */
export interface DNSRecord {
    canonicalName?: string | undefined;
    isTRR: string;
    addresses: string[];
}
/**
 * @supported Firefox
 */
export type ResolveFlags = _ResolveFlags[];
/**
 * @supported Firefox
 */
export type _ResolveFlags =
        | "allow_name_collisions"
        | "bypass_cache"
        | "canonical_name"
        | "disable_ipv4"
        | "disable_ipv6"
        | "disable_trr"
        | "offline"
        | "priority_low"
        | "priority_medium"
        | "speculate";

}

export namespace downloads {
/**
 * @supported Firefox
 */
export type FilenameConflictAction =
        | "uniquify"
        | "overwrite"
        | "prompt";
/**
 * @supported Firefox
 */
export type InterruptReason =
        | "FILE_FAILED"
        | "FILE_ACCESS_DENIED"
        | "FILE_NO_SPACE"
        | "FILE_NAME_TOO_LONG"
        | "FILE_TOO_LARGE"
        | "FILE_VIRUS_INFECTED"
        | "FILE_TRANSIENT_ERROR"
        | "FILE_BLOCKED"
        | "FILE_SECURITY_CHECK_FAILED"
        | "FILE_TOO_SHORT"
        | "NETWORK_FAILED"
        | "NETWORK_TIMEOUT"
        | "NETWORK_DISCONNECTED"
        | "NETWORK_SERVER_DOWN"
        | "NETWORK_INVALID_REQUEST"
        | "SERVER_FAILED"
        | "SERVER_NO_RANGE"
        | "SERVER_BAD_CONTENT"
        | "SERVER_UNAUTHORIZED"
        | "SERVER_CERT_PROBLEM"
        | "SERVER_FORBIDDEN"
        | "USER_CANCELED"
        | "USER_SHUTDOWN"
        | "CRASH";
/**
 * @supported Firefox
 */
export type DangerType =
        | "file"
        | "url"
        | "content"
        | "uncommon"
        | "host"
        | "unwanted"
        | "safe"
        | "accepted";
/**
 * @supported Firefox
 */
export type State =
        | "in_progress"
        | "interrupted"
        | "complete";
/**
 * @supported Firefox
 */
export interface DownloadItem {
    id: number;
    url: string;
    referrer?: string;
    filename: string;
    incognito: boolean;
    cookieStoreId?: string | undefined;
    danger: DangerType;
    mime?: string;
    startTime: string;
    endTime?: string | undefined;
    estimatedEndTime?: string | undefined;
    state: State;
    paused: boolean;
    canResume: boolean;
    error?: InterruptReason | undefined;
    bytesReceived: number;
    totalBytes: number;
    fileSize: number;
    exists: boolean;
    byExtensionId?: string | undefined;
    byExtensionName?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface DownloadQuery {
    query?: string[] | undefined;
    startedBefore?: DownloadTime | undefined;
    startedAfter?: DownloadTime | undefined;
    endedBefore?: DownloadTime | undefined;
    endedAfter?: DownloadTime | undefined;
    totalBytesGreater?: number | undefined;
    totalBytesLess?: number | undefined;
    filenameRegex?: string | undefined;
    urlRegex?: string | undefined;
    limit?: number | undefined;
    orderBy?: string[] | undefined;
    id?: number | undefined;
    url?: string | undefined;
    filename?: string | undefined;
    cookieStoreId?: string | undefined;
    danger?: DangerType | undefined;
    mime?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    state?: State | undefined;
    paused?: boolean | undefined;
    error?: InterruptReason | undefined;
    bytesReceived?: number | undefined;
    totalBytes?: number | undefined;
    fileSize?: number | undefined;
    exists?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface StringDelta {
    current?: string | undefined;
    previous?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface DoubleDelta {
    current?: number | undefined;
    previous?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface BooleanDelta {
    current?: boolean | undefined;
    previous?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(downloadItem: DownloadItem) => void>;
/**
 * @supported Firefox
 */
export const onErased: WebExtEvent<(downloadId: number) => void>;
/**
 * @supported Firefox
 */
export const onChanged: events.Event<(downloadDelta: _OnChangedDownloadDelta) => void>;
/**
 * @supported Firefox
 */
export function download(options: _DownloadOptions): Promise<number>;
/**
 * @supported Firefox
 */
export function search(query: DownloadQuery): Promise<DownloadItem[]>;
/**
 * @supported Firefox
 */
export function pause(downloadId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function resume(downloadId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function cancel(downloadId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function getFileIcon(downloadId: number, options?: _GetFileIconOptions): Promise<string>;
/**
 * @supported Firefox
 */
export function open(downloadId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function show(downloadId: number): Promise<boolean>;
/**
 * @supported Firefox
 */
export function showDefaultFolder(): void;
/**
 * @supported Firefox
 */
export function erase(query: DownloadQuery): Promise<number[]>;
/**
 * @supported Firefox
 */
export function removeFile(downloadId: number): Promise<void>;
/**
 * @supported Firefox
 */
export type DownloadTime = string | extensionTypes.Date;
/**
 * @supported Firefox
 */
export type _DownloadOptionsMethod = "GET" | "POST";
/**
 * @supported Firefox
 */
export interface _DownloadOptionsHeaders {
    name: string;
    value: string;
}
/**
 * @supported Firefox
 */
export interface _DownloadOptions {
    url: string;
    filename?: string | undefined;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    conflictAction?: FilenameConflictAction | undefined;
    saveAs?: boolean | undefined;
    method?: _DownloadOptionsMethod | undefined;
    headers?: _DownloadOptionsHeaders[] | undefined;
    body?: string | undefined;
    allowHttpErrors?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetFileIconOptions {
    size?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedDownloadDelta {
    id: number;
    url?: StringDelta | undefined;
    filename?: StringDelta | undefined;
    danger?: StringDelta | undefined;
    mime?: StringDelta | undefined;
    startTime?: StringDelta | undefined;
    endTime?: StringDelta | undefined;
    state?: StringDelta | undefined;
    canResume?: BooleanDelta | undefined;
    paused?: BooleanDelta | undefined;
    error?: StringDelta | undefined;
    totalBytes?: DoubleDelta | undefined;
    fileSize?: DoubleDelta | undefined;
    exists?: BooleanDelta | undefined;
}

}

export namespace events {
/**
 * @supported Firefox
 */
export interface Rule<C = unknown, A = unknown> {
    id?: string;
    tags?: string[];
    conditions: C[];
    actions: A[];
    priority?: number;
}
/**
 * @supported Firefox
 */
export interface Event<H extends (...args: /* TODO: Upstream type uses any */ any[]) => /* TODO: Upstream type uses any */ any, C = void, A = void> {
    addListener(callback: H): void;
    removeListener(callback: H): void;
    hasListener(callback: H): boolean;
    hasListeners(): boolean;
}
/**
 * @supported Firefox
 */
export interface UrlFilter {
    hostContains?: string | undefined;
    hostEquals?: string | undefined;
    hostPrefix?: string | undefined;
    hostSuffix?: string | undefined;
    pathContains?: string | undefined;
    pathEquals?: string | undefined;
    pathPrefix?: string | undefined;
    pathSuffix?: string | undefined;
    queryContains?: string | undefined;
    queryEquals?: string | undefined;
    queryPrefix?: string | undefined;
    querySuffix?: string | undefined;
    urlContains?: string | undefined;
    urlEquals?: string | undefined;
    urlMatches?: string | undefined;
    originAndPathMatches?: string | undefined;
    urlPrefix?: string | undefined;
    urlSuffix?: string | undefined;
    schemes?: string[] | undefined;
    ports?: Array<number | [number, number]> | undefined;
}

}

export namespace extension {
/**
 * @supported Firefox
 */
export type ViewType =
        | "tab"
        | "popup"
        | "sidebar";
/**
 * @supported Firefox
 */
export const inIncognitoContext: boolean | undefined;
/**
 * @supported Firefox
 */
export function getViews(fetchProperties?: _GetViewsFetchProperties): Window[];
/**
 * @supported Firefox
 */
export function getBackgroundPage(): Window | void;
/**
 * @supported Firefox
 */
export function isAllowedIncognitoAccess(): Promise<boolean>;
/**
 * @supported Firefox
 */
export function isAllowedFileSchemeAccess(): Promise<boolean>;
/**
 * @supported Firefox
 */
export interface _LastError {
    message: string;
}
/**
 * @supported Firefox
 */
export interface _GetViewsFetchProperties {
    type?: ViewType | undefined;
    windowId?: number | undefined;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export const lastError: _LastError | undefined;
/**
 * @supported Firefox
 */
export function getURL(path: string): string;

}

export namespace extensionTypes {
/**
 * @supported Firefox
 */
export type ImageDataType = globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray };
/**
 * @supported Firefox
 */
export type ImageFormat = "jpeg" | "png";
/**
 * @supported Firefox
 */
export interface ImageDetails {
    format?: ImageFormat | undefined;
    quality?: number | undefined;
    rect?: _ImageDetailsRect | undefined;
    scale?: number | undefined;
    resetScrollPosition?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type RunAt =
        | "document_start"
        | "document_end"
        | "document_idle";
/**
 * @supported Firefox
 */
export type CSSOrigin = "user" | "author";
/**
 * @supported Firefox
 */
export interface InjectDetails {
    code?: string | undefined;
    file?: string | undefined;
    allFrames?: boolean | undefined;
    matchAboutBlank?: boolean | undefined;
    frameId?: number | undefined;
    runAt?: RunAt | undefined;
    cssOrigin?: CSSOrigin | undefined;
}
/**
 * @supported Firefox
 */
export type ExecutionWorld =
        | "ISOLATED"
        | "MAIN";
/**
 * @supported Firefox
 */
export type Date = string | number | globalThis.Date;
/**
 * @supported Firefox
 */
export type ExtensionFileOrCode = {
        file: _manifest.ExtensionURL;
    } | {
        code: string;
    };
/**
 * @supported Firefox
 */
export type PlainJSONValue = null | string | number | boolean | _PlainJSONArray | _PlainJSONObject;
/**
 * @supported Firefox
 */
export interface _ImageDetailsRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * @supported Firefox
 */
export interface _PlainJSONArray extends Array<PlainJSONValue> {}
/**
 * @supported Firefox
 */
export interface _PlainJSONObject {
    [key: string]: PlainJSONValue;
}

}

export namespace history {
/**
 * @supported Firefox
 */
export type TransitionType =
        | "link"
        | "typed"
        | "auto_bookmark"
        | "auto_subframe"
        | "manual_subframe"
        | "generated"
        | "auto_toplevel"
        | "form_submit"
        | "reload"
        | "keyword"
        | "keyword_generated";
/**
 * @supported Firefox
 */
export interface HistoryItem {
    id: string;
    url?: string | undefined;
    title?: string | undefined;
    lastVisitTime?: number | undefined;
    visitCount?: number | undefined;
    typedCount?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface VisitItem {
    id: string;
    visitId: string;
    visitTime?: number | undefined;
    referringVisitId: string;
    transition: TransitionType;
}
/**
 * @supported Firefox
 */
export const onVisited: WebExtEvent<(result: HistoryItem) => void>;
/**
 * @supported Firefox
 */
export const onVisitRemoved: events.Event<(removed: { allHistory: boolean; urls?: string[] }) => void>;
/**
 * @supported Firefox
 */
export function search(query: _SearchQuery): Promise<HistoryItem[]>;
/**
 * @supported Firefox
 */
export function getVisits(details: _GetVisitsDetails): Promise<VisitItem[]>;
/**
 * @supported Firefox
 */
export function addUrl(details: _AddUrlDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function deleteUrl(details: _DeleteUrlDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function deleteRange(range: _DeleteRangeRange): Promise<void>;
/**
 * @supported Firefox
 */
export function deleteAll(): Promise<void>;
/**
 * @supported Firefox
 */
export interface _SearchQuery {
    text: string;
    startTime?: extensionTypes.Date | undefined;
    endTime?: extensionTypes.Date | undefined;
    maxResults?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetVisitsDetails {
    url: string;
}
/**
 * @supported Firefox
 */
export interface _AddUrlDetails {
    url: string;
    title?: string | undefined;
    transition?: TransitionType | undefined;
    visitTime?: extensionTypes.Date | undefined;
}
/**
 * @supported Firefox
 */
export interface _DeleteUrlDetails {
    url: string;
}
/**
 * @supported Firefox
 */
export interface _DeleteRangeRange {
    startTime: extensionTypes.Date;
    endTime: extensionTypes.Date;
}
/**
 * @supported Firefox
 */
export interface _OnVisitRemovedRemoved {
    allHistory: boolean;
    urls: string[];
}
/**
 * @supported Firefox
 */
export interface _OnTitleChangedChanged {
    url: string;
    title: string;
}
/**
 * @supported Firefox
 */
export const onTitleChanged: WebExtEvent<(changed: _OnTitleChangedChanged) => void>;

}

export namespace i18n {
/**
 * @supported Firefox
 */
export type LanguageCode = string;
/**
 * @supported Firefox
 */
export function getAcceptLanguages(): Promise<LanguageCode[]>;
/**
 * @supported Firefox
 */
export function getMessage(messageName: string, substitutions?: string | number | (string | number)[]): string;
/**
 * @supported Firefox
 */
export function getUILanguage(): string;
/**
 * @supported Firefox
 */
export function detectLanguage(text: string): Promise<_DetectLanguageReturnResult>;
/**
 * @supported Firefox
 */
export interface _DetectLanguageReturnResultLanguages {
    language: LanguageCode;
    percentage: number;
}
/**
 * @supported Firefox
 */
export interface _DetectLanguageReturnResult {
    isReliable: boolean;
    languages: _DetectLanguageReturnResultLanguages[];
}
/**
 * @supported Firefox
 */
export function getPreferredSystemLanguages(): Promise<LanguageCode[]>;

}

export namespace identity {
/**
 * @supported Firefox
 */
export interface AccountInfo {
    id: string;
}
/**
 * @supported Firefox
 */
export function launchWebAuthFlow(details: _LaunchWebAuthFlowDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function getRedirectURL(path?: string): string;
/**
 * @supported Firefox
 */
export interface _GetAuthTokenDetails {
    interactive?: boolean | undefined;
    account?: AccountInfo | undefined;
    scopes?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetProfileUserInfoReturnUserinfo {
    email: string;
    id: string;
}
/**
 * @supported Firefox
 */
export interface _RemoveCachedAuthTokenReturnUserinfo {
    email: string;
    id: string;
}
/**
 * @supported Firefox
 */
export interface _RemoveCachedAuthTokenDetails {
    token: string;
}
/**
 * @supported Firefox
 */
export interface _LaunchWebAuthFlowDetails {
    url: _manifest.HttpURL;
    interactive?: boolean | undefined;
}

}

export namespace idle {
/**
 * @supported Firefox
 */
export type IdleState = "active" | "idle";
/**
 * @supported Firefox
 */
export const onStateChanged: WebExtEvent<(newState: IdleState) => void>;
/**
 * @supported Firefox
 */
export function queryState(detectionIntervalInSeconds: number): Promise<IdleState>;
/**
 * @supported Firefox
 */
export function setDetectionInterval(intervalInSeconds: number): void;

}

export namespace management {
/**
 * @supported Firefox
 */
export interface IconInfo {
    size: number;
    url: string;
}
/**
 * @supported Firefox
 */
export type ExtensionDisabledReason = "unknown" | "permissions_increase";
/**
 * @supported Firefox
 */
export type ExtensionType = "extension" | "theme";
/**
 * @supported Firefox
 */
export type ExtensionInstallType =
        | "development"
        | "normal"
        | "sideload"
        | "admin"
        | "other";
/**
 * @supported Firefox
 */
export interface ExtensionInfo {
    id: string;
    name: string;
    shortName?: string;
    description: string;
    version: string;
    versionName?: string | undefined;
    mayDisable: boolean;
    enabled: boolean;
    disabledReason?: ExtensionDisabledReason | undefined;
    type: ExtensionType;
    homepageUrl?: string | undefined;
    updateUrl?: string | undefined;
    optionsUrl: string;
    icons?: IconInfo[] | undefined;
    permissions?: string[];
    hostPermissions?: string[];
    installType: ExtensionInstallType;
}
/**
 * @supported Firefox
 */
export const onInstalled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Firefox
 */
export const onUninstalled: events.Event<(info: ExtensionInfo) => void>;
/**
 * @supported Firefox
 */
export const onEnabled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Firefox
 */
export const onDisabled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Firefox
 */
export function getAll(): Promise<ExtensionInfo[]>;
/**
 * @supported Firefox
 */
export function get(id: _manifest.ExtensionID): Promise<ExtensionInfo>;
/**
 * @supported Firefox
 */
export function getSelf(): Promise<ExtensionInfo>;
/**
 * @supported Firefox
 */
export function setEnabled(id: string, enabled: boolean): Promise<void>;
/**
 * @supported Firefox
 */
export function uninstallSelf(options?: _UninstallSelfOptions): Promise<void>;
/**
 * @supported Firefox
 */
export interface _InstallReturnResult {
    id: _manifest.ExtensionID;
}
/**
 * @supported Firefox
 */
export interface _InstallOptions {
    url: _manifest.HttpURL;
    hash?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UninstallSelfOptions {
    showConfirmDialog?: boolean | undefined;
    dialogMessage?: string | undefined;
}
/**
 * @supported Firefox
 */
export function install(options: _InstallOptions): Promise<_InstallReturnResult>;

}

export namespace notifications {
/**
 * @supported Firefox
 */
export type TemplateType =
        | "basic"
        | "image"
        | "list"
        | "progress";
/**
 * @supported Firefox
 */
export type PermissionLevel = "granted" | "denied";
/**
 * @supported Firefox
 */
export interface NotificationItem {
    title: string;
    message: string;
}
/**
 * @supported Firefox
 */
export const onClosed: WebExtEvent<(notificationId: string, byUser: boolean) => void>;
/**
 * @supported Firefox
 */
export const onClicked: WebExtEvent<(notificationId: string) => void>;
/**
 * @supported Firefox
 */
export function create(options: CreateNotificationOptions): Promise<string>;
/**
 * @supported Firefox
 */
export function create(notificationId: string, options: CreateNotificationOptions): Promise<string>;
/**
 * @supported Firefox
 */
export function clear(notificationId: string): Promise<boolean>;
/**
 * @supported Firefox
 */
export function getAll(): Promise<{ [key: string]: CreateNotificationOptions }>;
/**
 * @supported Firefox
 */
export interface CreateNotificationOptions {
    type: TemplateType;
    title: string;
    message: string;
    iconUrl?: string;
    appIconMaskUrl?: string;
    contextMessage?: string;
    priority?: number;
    eventTime?: number;
    isClickable?: boolean;
    items?: NotificationItem[];
    progress?: number;
    imageUrl?: string;
}
/**
 * @supported Firefox
 */
export interface UpdateNotificationOptions {
    type?: TemplateType;
    title?: string;
    message?: string;
    iconUrl?: string;
    appIconMaskUrl?: string;
    contextMessage?: string;
    priority?: number;
    eventTime?: number;
    isClickable?: boolean;
    items?: NotificationItem[];
    progress?: number;
    imageUrl?: string;
}
/**
 * @supported Firefox
 */
export interface _CreateNotificationOptionsButtons {
    title: string;
    iconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateNotificationOptionsButtons {
    title: string;
    iconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export const onShown: WebExtEvent<(notificationId: string) => void>;

}

export namespace omnibox {
/**
 * @supported Firefox
 */
export type DescriptionStyleType =
        | "url"
        | "match"
        | "dim";
/**
 * @supported Firefox
 */
export type OnInputEnteredDisposition =
        | "currentTab"
        | "newForegroundTab"
        | "newBackgroundTab";
/**
 * @supported Firefox
 */
export interface SuggestResult {
    description: string;
    content: string;
}
/**
 * @supported Firefox
 */
export interface DefaultSuggestResult {
    description: string;
}
/**
 * @supported Firefox
 */
export const onInputStarted: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export const onInputChanged: WebExtEvent<(text: string, suggest: (suggestResults: SuggestResult[]) => void) => void>;
/**
 * @supported Firefox
 */
export const onInputEntered: WebExtEvent<(text: string, disposition: OnInputEnteredDisposition) => void>;
/**
 * @supported Firefox
 */
export const onInputCancelled: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export const onDeleteSuggestion: WebExtEvent<(text: string) => void>;
/**
 * @supported Firefox
 */
export function setDefaultSuggestion(suggestion: DefaultSuggestResult): void;
/**
 * @supported Firefox
 */
export interface _SuggestResultDescriptionStyles {
    offset: number;
    type: DescriptionStyleType;
    length?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SuggestResultDescriptionStylesRaw {
    offset: number;
    type: number;
}
/**
 * @supported Firefox
 */
export interface _DefaultSuggestResultDescriptionStyles {
    offset: number;
    type: DescriptionStyleType;
    length?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _DefaultSuggestResultDescriptionStylesRaw {
    offset: number;
    type: number;
}

}

export namespace permissions {
/**
 * @supported Firefox
 */
export interface Permissions {
    permissions?: _manifest.OptionalPermission[] | _manifest.OptionalOnlyPermission[] | undefined;
    origins?: _manifest.MatchPattern[] | undefined;
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}
/**
 * @supported Firefox
 */
export const onAdded: WebExtEvent<(permissions: Permissions) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: WebExtEvent<(permissions: Permissions) => void>;
/**
 * @supported Firefox
 */
export function getAll(): Promise<AnyPermissions>;
/**
 * @supported Firefox
 */
export function contains(permissions: AnyPermissions): Promise<boolean>;
/**
 * @supported Firefox
 */
export function request(permissions: Permissions): Promise<boolean>;
/**
 * @supported Firefox
 */
export function remove(permissions: Permissions): Promise<boolean>;
/**
 * @supported Firefox
 */
export interface AnyPermissions {
    permissions?: _manifest.Permission[] | _manifest.OptionalOnlyPermission[] | undefined;
    origins?: _manifest.MatchPattern[] | undefined;
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}

}

export namespace proxy {
/**
 * @supported Firefox
 */
export interface ProxyConfig {
    proxyType?: _ProxyConfigProxyType | undefined;
    http?: string | undefined;
    httpProxyAll?: boolean | undefined;
    ftp?: string | undefined;
    ssl?: string | undefined;
    socks?: string | undefined;
    socksVersion?: number | undefined;
    passthrough?: string | undefined;
    autoConfigUrl?: string | undefined;
    autoLogin?: boolean | undefined;
    proxyDNS?: boolean | undefined;
    respectBeConservative?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export const settings: types.Setting;
/**
 * @supported Firefox
 */
export type _ProxyConfigProxyType =
        | "none"
        | "autoDetect"
        | "system"
        | "manual"
        | "autoConfig";
/**
 * @supported Firefox
 */
export interface _OnRequestDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: webRequest.ResourceType;
    timeStamp: number;
    fromCache: boolean;
    requestHeaders?: webRequest.HttpHeaders | undefined;
    urlClassification: webRequest.UrlClassification;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _ProxyOnRequestEvent<TCallback = (details: _OnRequestDetails) => void> {
    addListener(cb: TCallback, filter: webRequest.RequestFilter, extraInfoSpec?: Array<"requestHeaders">): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export const onRequest: _ProxyOnRequestEvent;
/**
 * @supported Firefox
 */
export const onError: WebExtEvent<(error: Error) => void>;

}

export namespace runtime {
/**
 * @supported Firefox
 */
export interface Port {
    name: string;
    disconnect(): void;
    postMessage(message: unknown): void;
    sender?: MessageSender;
    error?: Error;
    onDisconnect: events.Event<(port: Port) => void>;
    onMessage: events.Event<(message: unknown, port: Port) => void>;
}
/**
 * @supported Firefox
 */
export interface MessageSender {
    documentId?: string;
    frameId?: number;
    id?: string;
    tab?: tabs.Tab;
    url?: string;
    userScriptWorldId?: string;
}
/**
 * @supported Firefox
 */
export type PlatformOs =
        | "mac"
        | "win"
        | "android"
        | "cros"
        | "linux"
        | "openbsd";
/**
 * @supported Firefox
 */
export type PlatformArch =
        | "aarch64"
        | "arm"
        | "ppc64"
        | "s390x"
        | "sparc64"
        | "x86-32"
        | "x86-64"
        | "noarch";
/**
 * @supported Firefox
 */
export type PlatformNaclArch =
        | "arm"
        | "x86-32"
        | "x86-64";
/**
 * @supported Firefox
 */
export interface PlatformInfo {
    arch: PlatformArch;
    os: PlatformOs;
}
/**
 * @supported Firefox
 */
export type RequestUpdateCheckStatus =
        | "throttled"
        | "no_update"
        | "update_available";
/**
 * @supported Firefox
 */
export type OnInstalledReason =
        | "install"
        | "update"
        | "browser_update";
/**
 * @supported Firefox
 */
export type OnRestartRequiredReason =
        | "app_update"
        | "os_update"
        | "periodic";
/**
 * @supported Firefox
 */
export type ContextType =
        | "BACKGROUND"
        | "POPUP"
        | "SIDE_PANEL"
        | "TAB";
/**
 * @supported Firefox
 */
export interface ExtensionContext {
    contextId: string;
    contextType: ContextType;
    documentId?: string | undefined;
    documentOrigin?: string | undefined;
    documentUrl?: string | undefined;
    incognito: boolean;
    frameId: number;
    tabId: number;
    windowId: number;
}
/**
 * @supported Firefox
 */
export interface ContextFilter {
    contextIds?: string[] | undefined;
    contextTypes?: ContextType[] | undefined;
    documentIds?: string[] | undefined;
    documentOrigins?: string[] | undefined;
    documentUrls?: string[] | undefined;
    frameIds?: number[] | undefined;
    tabIds?: number[] | undefined;
    windowIds?: number[] | undefined;
    incognito?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export const id: string;
/**
 * @supported Firefox
 */
export const onStartup: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export const onInstalled: events.Event<(details: { reason: OnInstalledReason; previousVersion?: string; id?: string }) => void>;
/**
 * @supported Firefox
 */
export const onSuspend: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export const onSuspendCanceled: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export const onUpdateAvailable: events.Event<(details: UpdateAvailableDetails) => void>;
/**
 * @supported Firefox
 */
export const onConnect: WebExtEvent<(port: Port) => void>;
/**
 * @supported Firefox
 */
export const onConnectExternal: WebExtEvent<(port: Port) => void>;
/**
 * @supported Firefox
 */
export const onUserScriptConnect: WebExtEvent<(port: Port) => void>;
/**
 * @supported Firefox
 */
export const onMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Firefox
 */
export const onMessageExternal: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Firefox
 */
export const onUserScriptMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Firefox
 */
export function getBackgroundPage(): Promise<Window>;
/**
 * @supported Firefox
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Firefox
 */
export function getManifest(): _manifest.WebExtensionManifest;
/**
 * @supported Firefox
 */
export function getURL(path: string): string;
/**
 * @supported Firefox
 */
export function setUninstallURL(url?: string): Promise<void>;
/**
 * @supported Firefox
 */
export function reload(): void;
/**
 * @supported Firefox
 */
export function connect(): Port;
/**
 * @supported Firefox
 */
export function connect(extensionId: string, connectInfo?: _ConnectConnectInfo): Port;
/**
 * @supported Firefox
 */
export function connect(connectInfo: _ConnectConnectInfo): Port;
/**
 * @supported Firefox
 */
export function connectNative(application: string): Port;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options: _SendMessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options: _SendMessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options?: _SendMessageOptions): Promise<R>;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options?: _SendMessageOptions): Promise<R>;
/**
 * @supported Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M): Promise<R>;
/**
 * @supported Firefox
 */
export function getPlatformInfo(): Promise<PlatformInfo>;
/**
 * @supported Firefox
 */
export function getContexts(filter: ContextFilter): Promise<ExtensionContext[]>;
/**
 * @supported Firefox
 */
export interface BrowserInfo {
    name: string;
    vendor: string;
    version: string;
    buildID: string;
}
/**
 * @supported Firefox
 */
export type OnPerformanceWarningCategory = "content_script";
/**
 * @supported Firefox
 */
export type OnPerformanceWarningSeverity =
        | "low"
        | "medium"
        | "high";
/**
 * @supported Firefox
 */
export interface _OnPerformanceWarningDetails {
    category: OnPerformanceWarningCategory;
    severity: OnPerformanceWarningSeverity;
    tabId?: number | undefined;
    description: string;
}
/**
 * @supported Firefox
 */
export interface _LastError {
    message?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RequestUpdateCheckReturnDetails {
    version: string;
}
/**
 * @supported Firefox
 */
export interface _ConnectConnectInfo {
    name?: string | undefined;
    includeTlsChannelId?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SendMessageOptions {}
/**
 * @supported Firefox
 */
export type DirectoryEntry = /* TODO: Upstream type uses any */ any;
/**
 * @supported Firefox
 */
export interface _OnInstalledDetails {
    reason: OnInstalledReason;
    previousVersion?: string;
    temporary: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnUpdateAvailableDetails {
    version: string;
}
/**
 * @supported Firefox
 */
export const lastError: _LastError | undefined;
/**
 * @supported Firefox
 */
export function getFrameId(target: WindowProxy | HTMLIFrameElement | HTMLFrameElement | HTMLEmbedElement | HTMLObjectElement): number;
/**
 * @supported Firefox
 */
export function getBrowserInfo(): Promise<BrowserInfo>;
/**
 * @supported Firefox
 */
export const onPerformanceWarning: WebExtEvent<(details: _OnPerformanceWarningDetails) => void>;
/**
 * @supported Firefox
 */
export interface UpdateAvailableDetails {
    version: string;
}

}

export namespace scripting {
/**
 * @supported Firefox
 */
export type ExecutionWorld =
        | "ISOLATED"
        | "MAIN";
/**
 * @supported Firefox
 */
export interface InjectionTarget {
    frameIds?: number[] | undefined;
    allFrames?: boolean | undefined;
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface ScriptInjection<Args extends unknown[] = unknown[], R = unknown> {
    args?: Args;
    files?: string[];
    func?: (...args: Args) => R;
    injectImmediately?: boolean;
    target: InjectionTarget;
    world?: ExecutionWorld;
}
/**
 * @supported Firefox
 */
export interface CSSInjection {
    css?: string | undefined;
    files?: string[] | undefined;
    origin?: _CSSInjectionOrigin | undefined;
    target: InjectionTarget;
}
/**
 * @supported Firefox
 */
export interface InjectionResult<R = unknown> {
    documentId: string;
    frameId: number;
    result?: R;
    error?: unknown;
}
/**
 * @supported Firefox
 */
export interface RegisteredContentScript {
    allFrames?: boolean | undefined;
    excludeMatches?: string[] | undefined;
    id: string;
    js?: _manifest.ExtensionURL[] | undefined;
    matches?: string[] | undefined;
    matchOriginAsFallback?: boolean | undefined;
    runAt?: extensionTypes.RunAt | undefined;
    world?: extensionTypes.ExecutionWorld | undefined;
    persistAcrossSessions?: boolean | undefined;
    css?: _manifest.ExtensionURL[] | undefined;
    cssOrigin?: extensionTypes.CSSOrigin;
}
/**
 * @supported Firefox
 */
export interface ContentScriptFilter {
    ids?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export function executeScript<R = unknown, Args extends unknown[] = unknown[]>(injection: ScriptInjection<Args, R>, callback?: (results: InjectionResult<Awaited<R>>[]) => void): Promise<InjectionResult<Awaited<R>>[]>;
/**
 * @supported Firefox
 */
export function insertCSS(injection: CSSInjection): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCSS(injection: CSSInjection): Promise<void>;
/**
 * @supported Firefox
 */
export function registerContentScripts(scripts: RegisteredContentScript[]): Promise<void>;
/**
 * @supported Firefox
 */
export function getRegisteredContentScripts(filter?: ContentScriptFilter): Promise<RegisteredContentScript[]>;
/**
 * @supported Firefox
 */
export function unregisterContentScripts(filter?: ContentScriptFilter): Promise<void>;
/**
 * @supported Firefox
 */
export function updateContentScripts(scripts: _UpdateContentScriptsScripts[]): Promise<void>;
/**
 * @supported Firefox
 */
export type _CSSInjectionOrigin = "USER" | "AUTHOR";
/**
 * @supported Firefox
 */
export interface _UpdateContentScriptsScripts {
    id: string;
    allFrames?: boolean;
    css?: string[] | _manifest.ExtensionURL[];
    cssOrigin?: extensionTypes.CSSOrigin;
    excludeMatches?: string[];
    js?: string[] | _manifest.ExtensionURL[];
    matchOriginAsFallback?: boolean;
    matches?: string[];
    persistAcrossSessions?: boolean;
    runAt?: extensionTypes.RunAt;
    world?: ExecutionWorld;
}

}

export namespace search {
/**
 * @supported Firefox
 */
export type Disposition = "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";
/**
 * @supported Firefox
 */
export interface QueryInfo {
    text: string;
    disposition?: Disposition;
    tabId?: number;
}
/**
 * @supported Firefox
 */
export function query(queryInfo: QueryInfo): Promise<void>;
/**
 * @supported Firefox
 */
export function query(queryInfo: QueryInfo, callback: () => void): void;
/**
 * @supported Firefox
 */
export interface SearchEngine {
    name: string;
    isDefault: boolean;
    alias?: string | undefined;
    favIconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _SearchSearchProperties {
    query: string;
    engine?: string | undefined;
    disposition?: Disposition | undefined;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _QueryQueryInfo {
    text: string;
    disposition?: Disposition | undefined;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export function get(): Promise<SearchEngine[]>;
/**
 * @supported Firefox
 */
export function search(searchProperties: _SearchSearchProperties): Promise</* TODO: Upstream type uses any */ any>;

}

export namespace sessions {
/**
 * @supported Firefox
 */
export interface Filter {
    maxResults?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface Session {
    lastModified: number;
    tab?: tabs.Tab | undefined;
    window?: windows.Window | undefined;
}
/**
 * @supported Firefox
 */
export interface Device {
    info: string;
    deviceName: string;
    sessions: Session[];
}
/**
 * @supported Firefox
 */
export const MAX_SESSION_RESULTS: number;
/**
 * @supported Firefox
 */
export const onChanged: WebExtEvent<() => void>;
/**
 * @supported Firefox
 */
export function getRecentlyClosed(filter?: Filter): Promise<Session[]>;
/**
 * @supported Firefox
 */
export function restore(sessionId?: string): Promise<Session>;
/**
 * @supported Firefox
 */
export function forgetClosedTab(windowId: number, sessionId: string): Promise<void>;
/**
 * @supported Firefox
 */
export function forgetClosedWindow(sessionId: string): Promise<void>;
/**
 * @supported Firefox
 */
export function setTabValue(tabId: number, key: string, value: _WebExtJsonValue): Promise<void>;
/**
 * @supported Firefox
 */
export function getTabValue(tabId: number, key: string): Promise<_WebExtJsonValue | undefined>;
/**
 * @supported Firefox
 */
export function removeTabValue(tabId: number, key: string): Promise<void>;
/**
 * @supported Firefox
 */
export function setWindowValue(windowId: number, key: string, value: _WebExtJsonValue): Promise<void>;
/**
 * @supported Firefox
 */
export function getWindowValue(windowId: number, key: string): Promise<_WebExtJsonValue | undefined>;
/**
 * @supported Firefox
 */
export function removeWindowValue(windowId: number, key: string): Promise<void>;

}

export namespace storage {
/**
 * @supported Firefox
 */
export interface StorageChange<T = unknown> {
    oldValue?: T;
    newValue?: T;
}
/**
 * @supported Firefox
 */
export interface StorageArea {
    get<K extends string>(key: K, callback: (items: Record<K, unknown>) => void): void;
    get<K extends string>(keys: K[], callback: (items: Record<K, unknown>) => void): void;
    get<T extends object>(keys: T, callback: (items: T) => void): void;
    get(keys: string | string[] | Record<string, unknown> | null | undefined, callback: (items: Record<string, unknown>) => void): void;
    get(callback: (items: Record<string, unknown>) => void): void;
    get<K extends string>(key: K): Promise<Record<K, unknown>>;
    get<K extends string>(keys: K[]): Promise<Record<K, unknown>>;
    get<T extends object>(keys: T): Promise<T>;
    get<T extends object = Record<string, unknown>>(keys?: string | string[] | null): Promise<T>;
    getBytesInUse(keys?: string | string[] | null): Promise<number>;
    getBytesInUse(keys: string | string[] | null | undefined, callback: (bytesInUse: number) => void): void;
    getBytesInUse(callback: (bytesInUse: number) => void): void;
    getKeys(): Promise<string[]>;
    getKeys(callback: (keys: string[]) => void): void;
    set<T extends Record<string, unknown>>(items: T): Promise<void>;
    set<T extends Record<string, unknown>>(items: T, callback: () => void): void;
    set(items: Record<string, unknown>): Promise<void>;
    set(items: Record<string, unknown>, callback?: () => void): void;
    remove(keys: string | string[]): Promise<void>;
    remove(keys: string | string[], callback?: () => void): void;
    clear(): Promise<void>;
    clear(callback?: () => void): void;
    onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
}
/**
 * @supported Firefox
 */
export const sync: _SyncStorageAreaWithUsage;
/**
 * @supported Firefox
 */
export const local: _LocalStorageArea;
/**
 * @supported Firefox
 */
export const managed: _ManagedStorageArea;
/**
 * @supported Firefox
 */
export const session: _SessionStorageAreaWithUsage;
/**
 * @supported Firefox
 */
export const onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
/**
 * @supported Firefox
 */
export interface StorageAreaWithUsage {
    get(keys?: null | string | string[] | { [key: string]: /* TODO: Upstream type uses any */ any }): Promise<{ [key: string]: /* TODO: Upstream type uses any */ any }>;
    getBytesInUse(keys?: null | string | string[]): Promise<number>;
    getKeys(): Promise<string[]>;
    set(items: { [key: string]: /* TODO: Upstream type uses any */ any }): Promise<void>;
    remove(keys: string | string[]): Promise<void>;
    clear(): Promise<void>;
    onChanged: WebExtEvent<(changes: { [key: string]: StorageChange }) => void>;
}
/**
 * @supported Firefox
 */
export interface _SyncStorageAreaWithUsage extends StorageAreaWithUsage {
    QUOTA_BYTES: number;
    QUOTA_BYTES_PER_ITEM: number;
    MAX_ITEMS: number;
    MAX_WRITE_OPERATIONS_PER_HOUR: number;
    MAX_WRITE_OPERATIONS_PER_MINUTE: number;
    MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
}
/**
 * @supported Firefox
 */
export interface _LocalStorageArea extends StorageArea {
    QUOTA_BYTES: number;
}
/**
 * @supported Firefox
 */
export interface _ManagedStorageArea extends StorageArea {
    QUOTA_BYTES: number;
}
/**
 * @supported Firefox
 */
export interface _SessionStorageAreaWithUsage extends StorageAreaWithUsage {
    QUOTA_BYTES: number;
}

}

export namespace tabGroups {
/**
 * @supported Firefox
 */
export type Color =
        | "blue"
        | "cyan"
        | "grey"
        | "green"
        | "orange"
        | "pink"
        | "purple"
        | "red"
        | "yellow";
/**
 * @supported Firefox
 */
export interface TabGroup {
    collapsed: boolean;
    color: Color;
    id: number;
    title?: string | undefined;
    windowId: number;
}
/**
 * @supported Firefox
 */
export const TAB_GROUP_ID_NONE: number;
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Firefox
 */
export const onUpdated: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Firefox
 */
export const onMoved: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: events.Event<(group: TabGroup, removeInfo: _RemoveInfo) => void>;
/**
 * @supported Firefox
 */
export function get(groupId: number): Promise<TabGroup>;
/**
 * @supported Firefox
 */
export function query(queryInfo: _QueryInfo): Promise<TabGroup[]>;
/**
 * @supported Firefox
 */
export function update(groupId: number, updateProperties: _UpdateProperties): Promise<TabGroup>;
/**
 * @supported Firefox
 */
export function move(groupId: number, moveProperties: _MoveProperties): Promise<TabGroup>;
/**
 * @supported Firefox
 */
export interface _MoveProperties {
    index: number;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _QueryInfo {
    collapsed?: boolean | undefined;
    color?: Color | undefined;
    title?: string | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateProperties {
    collapsed?: boolean | undefined;
    color?: Color | undefined;
    title?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveInfo {
    isWindowClosing: boolean;
}

}

export namespace tabs {
/**
 * @supported Firefox
 */
export type TabStatus = "loading" | "complete";
/**
 * @supported Firefox
 */
export type MutedInfoReason =
        /** A user input action has set/overridden the muted state. */
        | "user"
        /** Tab capture started, forcing a muted state change. */
        | "capture"
        /** An extension, identified by the extensionId field, set the muted state. */
        | "extension";
/**
 * @supported Firefox
 */
export interface MutedInfo {
    muted: boolean;
    reason?: MutedInfoReason | undefined;
    extensionId?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface Tab {
    id?: number | undefined;
    index: number;
    windowId?: number;
    openerTabId?: number | undefined;
    highlighted: boolean;
    active: boolean;
    pinned: boolean;
    lastAccessed?: number;
    audible?: boolean | undefined;
    autoDiscardable?: boolean;
    mutedInfo?: MutedInfo | undefined;
    url?: string | undefined;
    title?: string | undefined;
    favIconUrl?: string | undefined;
    status?: string | undefined;
    discarded?: boolean;
    incognito: boolean;
    width?: number | undefined;
    height?: number | undefined;
    hidden?: boolean | undefined;
    sessionId?: string | undefined;
    cookieStoreId?: string | undefined;
    isArticle?: boolean | undefined;
    isInReaderMode?: boolean | undefined;
    sharingState?: SharingState | undefined;
    attention?: boolean | undefined;
    successorTabId?: number | undefined;
    groupId?: number;
}
/**
 * @supported Firefox
 */
export type ZoomSettingsMode =
        /** Zoom changes are handled automatically by the browser. */
        | "automatic"
        /**
         * Overrides the automatic handling of zoom changes. The `onZoomChange` event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support `per-origin` zooming, and will thus ignore the `scope` zoom setting and assume `per-tab`.
         */
        | "manual"
        /**
         * Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
         */
        | "disabled";
/**
 * @supported Firefox
 */
export type ZoomSettingsScope =
        /**
         * Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, `per-origin` zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The `per-origin` scope is only available in the `automatic` mode.
         */
        | "per-origin"
        /**
         * Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, `per-tab` zoom changes are reset on navigation; navigating a tab will always load pages with their `per-origin` zoom factors.
         */
        | "per-tab";
/**
 * @supported Firefox
 */
export interface ZoomSettings {
    mode?: ZoomSettingsMode | undefined;
    scope?: ZoomSettingsScope | undefined;
    defaultZoomFactor?: number | undefined;
}
/**
 * @supported Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";
/**
 * @supported Firefox
 */
export const TAB_ID_NONE: number;
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(tab: Tab) => void>;
/**
 * @supported Firefox
 */
export const onUpdated: _TabsOnUpdatedEvent;
/**
 * @supported Firefox
 */
export const onMoved: events.Event<(tabId: number, moveInfo: { windowId: number; fromIndex: number; toIndex: number }) => void>;
/**
 * @supported Firefox
 */
export const onActivated: events.Event<(activeInfo: { tabId: number; windowId: number }) => void>;
/**
 * @supported Firefox
 */
export const onHighlighted: events.Event<(highlightInfo: { windowId: number; tabIds: number[] }) => void>;
/**
 * @supported Firefox
 */
export const onDetached: events.Event<(tabId: number, detachInfo: { oldWindowId: number; oldPosition: number }) => void>;
/**
 * @supported Firefox
 */
export const onAttached: events.Event<(tabId: number, attachInfo: { newWindowId: number; newPosition: number }) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: events.Event<(tabId: number, removeInfo: { windowId: number; isWindowClosing: boolean }) => void>;
/**
 * @supported Firefox
 */
export const onZoomChange: events.Event<(ZoomChangeInfo: { tabId: number; oldZoomFactor: number; newZoomFactor: number; zoomSettings: ZoomSettings }) => void>;
/**
 * @supported Firefox
 */
export function get(tabId: number): Promise<Tab>;
/**
 * @supported Firefox
 */
export function getCurrent(): Promise<Tab | undefined>;
/**
 * @supported Firefox
 */
export function connect(tabId: number, connectInfo?: _ConnectConnectInfo): runtime.Port;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, options: MessageSendOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Firefox
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, options?: MessageSendOptions): Promise<R>;
/**
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties): Promise<Tab>;
/**
 * @supported Firefox
 */
export function duplicate(tabId: number, duplicateProperties?: _DuplicateDuplicateProperties): Promise<Tab>;
/**
 * @supported Firefox
 */
export function query(queryInfo: _QueryQueryInfo): Promise<Tab[]>;
/**
 * @supported Firefox
 */
export function highlight(highlightInfo: _HighlightHighlightInfo): Promise<windows.Window>;
/**
 * @supported Firefox
 */
export function update(updateProperties: _UpdateUpdateProperties): Promise<Tab>;
/**
 * @supported Firefox
 */
export function update(tabId: number, updateProperties: _UpdateUpdateProperties): Promise<Tab>;
/**
 * @supported Firefox
 */
export function move(tabIds: number | number[], moveProperties: _MoveMoveProperties): Promise<Tab | Tab[]>;
/**
 * @supported Firefox
 */
export function reload(): Promise<void>;
/**
 * @supported Firefox
 */
export function reload(tabId: number, reloadProperties?: _ReloadReloadProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function reload(reloadProperties: _ReloadReloadProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function remove(tabIds: number | number[]): Promise<void>;
/**
 * @supported Firefox
 */
export function group(options: _GroupOptions): Promise<number>;
/**
 * @supported Firefox
 */
export function ungroup(tabIds: number | number[]): Promise<void>;
/**
 * @supported Firefox
 */
export function detectLanguage(tabId?: number): Promise<string>;
/**
 * @supported Firefox
 */
export function captureVisibleTab(): Promise<string>;
/**
 * @supported Firefox
 */
export function captureVisibleTab(windowId: number, options?: extensionTypes.ImageDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function captureVisibleTab(options: extensionTypes.ImageDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function setZoom(zoomFactor: number): Promise<void>;
/**
 * @supported Firefox
 */
export function setZoom(tabId: number, zoomFactor: number): Promise<void>;
/**
 * @supported Firefox
 */
export function getZoom(tabId?: number): Promise<number>;
/**
 * @supported Firefox
 */
export function getZoomSettings(tabId?: number): Promise<ZoomSettings>;
/**
 * @supported Firefox
 */
export function discard(tabIds: number | number[]): Promise<void>;
/**
 * @supported Firefox
 */
export function goForward(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function goBack(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export interface SharingState {
    screen?: string | undefined;
    camera: boolean;
    microphone: boolean;
}
/**
 * @supported Firefox
 */
export interface PageSettings {
    toFileName?: string | undefined;
    paperSizeUnit?: number | undefined;
    paperWidth?: number | undefined;
    paperHeight?: number | undefined;
    orientation?: number | undefined;
    scaling?: number | undefined;
    shrinkToFit?: boolean | undefined;
    showBackgroundColors?: boolean | undefined;
    showBackgroundImages?: boolean | undefined;
    edgeLeft?: number | undefined;
    edgeRight?: number | undefined;
    edgeTop?: number | undefined;
    edgeBottom?: number | undefined;
    marginLeft?: number | undefined;
    marginRight?: number | undefined;
    marginTop?: number | undefined;
    marginBottom?: number | undefined;
    headerLeft?: string | undefined;
    headerCenter?: string | undefined;
    headerRight?: string | undefined;
    footerLeft?: string | undefined;
    footerCenter?: string | undefined;
    footerRight?: string | undefined;
}
/**
 * @supported Firefox
 */
export type UpdatePropertyName =
        | "attention"
        | "audible"
        | "autoDiscardable"
        | "discarded"
        | "favIconUrl"
        | "groupId"
        | "hidden"
        | "isArticle"
        | "mutedInfo"
        | "pinned"
        | "sharingState"
        | "status"
        | "title"
        | "url";
/**
 * @supported Firefox
 */
export interface UpdateFilter {
    urls?: string[] | undefined;
    properties?: UpdatePropertyName[] | undefined;
    tabId?: number | undefined;
    windowId?: number | undefined;
    cookieStoreId?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _ConnectConnectInfo {
    name?: string | undefined;
    frameId?: number | undefined;
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _SendMessageOptions {
    frameId?: number | undefined;
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _CreateCreateProperties {
    windowId?: number | undefined;
    index?: number | undefined;
    url?: string | undefined;
    active?: boolean | undefined;
    pinned?: boolean | undefined;
    openerTabId?: number | undefined;
    cookieStoreId?: string | undefined;
    openInReaderMode?: boolean | undefined;
    discarded?: boolean | undefined;
    title?: string | undefined;
    muted?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _DuplicateDuplicateProperties {
    index?: number | undefined;
    active?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type _QueryQueryInfoScreen =
        | "Screen"
        | "Window"
        | "Application";
/**
 * @supported Firefox
 */
export interface _QueryQueryInfo {
    active?: boolean | undefined;
    attention?: boolean | undefined;
    pinned?: boolean | undefined;
    audible?: boolean | undefined;
    autoDiscardable?: boolean | undefined;
    muted?: boolean | undefined;
    highlighted?: boolean | undefined;
    currentWindow?: boolean | undefined;
    lastFocusedWindow?: boolean | undefined;
    status?: TabStatus | undefined;
    discarded?: boolean | undefined;
    hidden?: boolean | undefined;
    title?: string | undefined;
    url?: string | string[] | undefined;
    windowId?: number | undefined;
    windowType?: WindowType | undefined;
    index?: number | undefined;
    cookieStoreId?: string[] | string | undefined;
    openerTabId?: number | undefined;
    groupId?: number | undefined;
    screen?: boolean | _QueryQueryInfoScreen | undefined;
    camera?: boolean | undefined;
    microphone?: boolean | undefined;
    splitViewId?: number;
}
/**
 * @supported Firefox
 */
export interface _HighlightHighlightInfo {
    windowId?: number | undefined;
    populate?: boolean | undefined;
    tabs: number[] | number;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    url?: string | undefined;
    active?: boolean | undefined;
    autoDiscardable?: boolean | undefined;
    highlighted?: boolean | undefined;
    pinned?: boolean | undefined;
    muted?: boolean | undefined;
    openerTabId?: number | undefined;
    loadReplace?: boolean | undefined;
    successorTabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _MoveMoveProperties {
    windowId?: number | undefined;
    index: number;
}
/**
 * @supported Firefox
 */
export interface _ReloadReloadProperties {
    bypassCache?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GroupOptionsCreateProperties {
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GroupOptions {
    tabIds: number | number[];
    groupId?: number | undefined;
    createProperties?: _GroupOptionsCreateProperties | undefined;
}
/**
 * @supported Firefox
 */
export interface _MoveInSuccessionOptions {
    append?: boolean;
    insert?: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnUpdatedChangeInfo {
    attention?: boolean | undefined;
    audible?: boolean | undefined;
    autoDiscardable?: boolean | undefined;
    discarded?: boolean | undefined;
    favIconUrl?: string | undefined;
    hidden?: boolean | undefined;
    isArticle?: boolean | undefined;
    mutedInfo?: MutedInfo | undefined;
    pinned?: boolean | undefined;
    sharingState?: SharingState | undefined;
    status?: string | undefined;
    title?: string | undefined;
    url?: string | undefined;
    groupId?: number;
    splitViewId?: number;
}
/**
 * @supported Firefox
 */
export interface _TabsOnUpdatedEvent<TCallback = (tabId: number, changeInfo: _OnUpdatedChangeInfo, tab: Tab) => void> {
    addListener(cb: TCallback, filter?: UpdateFilter): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnMovedMoveInfo {
    windowId: number;
    fromIndex: number;
    toIndex: number;
}
/**
 * @supported Firefox
 */
export interface _OnActivatedActiveInfo {
    tabId: number;
    previousTabId?: number | undefined;
    windowId: number;
}
/**
 * @supported Firefox
 */
export interface _OnHighlightedHighlightInfo {
    windowId: number;
    tabIds: number[];
}
/**
 * @supported Firefox
 */
export interface _OnDetachedDetachInfo {
    oldWindowId: number;
    oldPosition: number;
}
/**
 * @supported Firefox
 */
export interface _OnAttachedAttachInfo {
    newWindowId: number;
    newPosition: number;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedRemoveInfo {
    windowId: number;
    isWindowClosing: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnZoomChangeZoomChangeInfo {
    tabId: number;
    oldZoomFactor: number;
    newZoomFactor: number;
    zoomSettings: ZoomSettings;
}
/**
 * @supported Firefox
 */
export function warmup(tabId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function toggleReaderMode(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function captureTab(): Promise<string>;
/**
 * @supported Firefox
 */
export function captureTab(tabId: number, options?: extensionTypes.ImageDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function captureTab(options: extensionTypes.ImageDetails): Promise<string>;
/**
 * @supported Firefox
 */
/** @deprecated Manifest V2 only in Chrome & Firefox. In MV3, use browser.scripting.executeScript. */
export function executeScript<T = unknown>(details: extensionTypes.InjectDetails, callback?: (result: (T | undefined)[]) => void): Promise<(T | undefined)[]>;
/**
 * @supported Firefox
 */
/** @deprecated Manifest V2 only in Chrome & Firefox. In MV3, use browser.scripting.executeScript. */
export function executeScript<T = unknown>(tabId: number, details: extensionTypes.InjectDetails, callback?: (result: (T | undefined)[]) => void): Promise<(T | undefined)[]>;
/**
 * @supported Firefox
 */
export function insertCSS(details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function insertCSS(tabId: number, details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCSS(details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCSS(tabId: number, details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function print(): void;
/**
 * @supported Firefox
 */
export function printPreview(): Promise<void>;
/**
 * @supported Firefox
 */
export function saveAsPDF(pageSettings: PageSettings): Promise<string>;
/**
 * @supported Firefox
 */
export function show(tabIds: number | number[]): Promise<void>;
/**
 * @supported Firefox
 */
export function hide(tabIds: number | number[]): Promise<number[]>;
/**
 * @supported Firefox
 */
export function moveInSuccession(tabIds: number[], tabId?: number, options?: _MoveInSuccessionOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function moveInSuccession(tabIds: number[], options?: _MoveInSuccessionOptions): Promise<void>;
/**
 * @supported Firefox
 */
export interface MessageSendOptions {
    frameId?: number;
    documentId?: string;
}

}

export namespace topSites {
/**
 * @supported Firefox
 */
export interface MostVisitedURL {
    url: string;
    title?: string;
    favicon?: string | undefined;
    type?: _MostVisitedURLType | undefined;
}
/**
 * @supported Firefox
 */
export function get(options?: _GetOptions): Promise<MostVisitedURL[]>;
/**
 * @supported Firefox
 */
export type _MostVisitedURLType = "url" | "search";
/**
 * @supported Firefox
 */
export interface _GetOptions {
    providers?: string[] | undefined;
    limit?: number | undefined;
    onePerDomain?: boolean | undefined;
    includeBlocked?: boolean | undefined;
    includeFavicon?: boolean | undefined;
    includePinned?: boolean | undefined;
    includeSearchShortcuts?: boolean | undefined;
    newtab?: boolean | undefined;
}

}

export namespace types {
/**
 * @supported Firefox
 */
export type LevelOfControl =
        | "not_controllable"
        | "controlled_by_other_extensions"
        | "controllable_by_this_extension"
        | "controlled_by_this_extension";
/**
 * @supported Firefox
 */
export type SettingScope =
        | "regular"
        | "regular_only"
        | "incognito_persistent"
        | "incognito_session_only";
/**
 * @supported Firefox
 */
export interface Setting {
    get(details: _GetDetails): Promise<_GetReturnDetails>;
    set(details: _SetDetails): Promise<void>;
    clear(details: _ClearDetails): Promise<void>;
    onChange: WebExtEvent<(details: _OnChangeDetails) => void>;
}
/**
 * @supported Firefox
 */
export interface _GetReturnDetails {
    value: /* TODO: Upstream type uses any */ any;
    levelOfControl: LevelOfControl;
    incognitoSpecific?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDetails {
    incognito?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetDetails {
    value: /* TODO: Upstream type uses any */ any;
    scope?: SettingScope | undefined;
}
/**
 * @supported Firefox
 */
export interface _ClearDetails {
    scope?: SettingScope | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangeDetails {
    value: /* TODO: Upstream type uses any */ any;
    levelOfControl: LevelOfControl;
    incognitoSpecific?: boolean | undefined;
}

}

export namespace userScripts {
/**
 * @supported Firefox
 */
export type ExecutionWorld =
        | "MAIN"
        | "USER_SCRIPT";
/**
 * @supported Firefox
 */
export type ScriptSource = {
        /** The path of the JavaScript file to inject relative to the extension's root directory. */
        file: string;
    } | {
        code: string;
    };
/**
 * @supported Firefox
 */
export interface RegisteredUserScript {
    id: string;
    allFrames?: boolean | undefined;
    js: ScriptSource[];
    matches?: _manifest.MatchPattern[] | undefined;
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    includeGlobs?: string[] | undefined;
    excludeGlobs?: string[] | undefined;
    runAt?: extensionTypes.RunAt | undefined;
    world?: ExecutionWorld | undefined;
    worldId?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface UserScriptFilter {
    ids?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export interface WorldProperties {
    worldId?: string | undefined;
    csp?: string | undefined;
    messaging?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export function register(userScriptOptions: UserScriptOptions): Promise<_LegacyRegisteredUserScript>;
/**
 * @supported Firefox
 */
export function register(scripts: RegisteredUserScript[]): Promise<void>;
/**
 * @supported Firefox
 */
export function getScripts(filter?: UserScriptFilter): Promise<RegisteredUserScript[]>;
/**
 * @supported Firefox
 */
export function unregister(filter?: UserScriptFilter): Promise<void>;
/**
 * @supported Firefox
 */
export function update(scripts: _UpdateRegisteredUserScript[]): Promise<void>;
/**
 * @supported Firefox
 */
export function configureWorld(properties: WorldProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function getWorldConfigurations(): Promise<WorldProperties[]>;
/**
 * @supported Firefox
 */
export function resetWorldConfiguration(worldId?: string): Promise<void>;
/**
 * @supported Firefox
 */
export interface UserScriptOptions {
    js: extensionTypes.ExtensionFileOrCode[];
    scriptMetadata?: extensionTypes.PlainJSONValue | undefined;
    matches: _manifest.MatchPattern[];
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    includeGlobs?: string[] | undefined;
    excludeGlobs?: string[] | undefined;
    allFrames?: boolean | undefined;
    matchAboutBlank?: boolean | undefined;
    runAt?: extensionTypes.RunAt | undefined;
    cookieStoreId?: string[] | string | undefined;
}
/**
 * @supported Firefox
 */
export interface _LegacyRegisteredUserScript {
    unregister(): Promise<void>;
}
/**
 * @supported Firefox
 */
export interface _UpdateRegisteredUserScript extends Omit<RegisteredUserScript, "js"> {
    js?: ScriptSource[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeScriptUserScript {
    metadata: unknown;
    global: Record<string, unknown>;
    defineGlobals(sourceObject: Record<string, unknown>): void;
    export: (value: unknown) => unknown;
}
/**
 * @supported Firefox
 */
export const onBeforeScript: WebExtEvent<(userScript: _OnBeforeScriptUserScript) => void>;

}

export namespace webNavigation {
/**
 * @supported Firefox
 */
export type TransitionType =
        | "link"
        | "typed"
        | "auto_bookmark"
        | "auto_subframe"
        | "manual_subframe"
        | "generated"
        | "start_page"
        | "form_submit"
        | "reload"
        | "keyword"
        | "keyword_generated";
/**
 * @supported Firefox
 */
export type TransitionQualifier =
        | "client_redirect"
        | "server_redirect"
        | "forward_back"
        | "from_address_bar";
/**
 * @supported Firefox
 */
export const onBeforeNavigate: _WebNavigationOnBeforeNavigateEvent;
/**
 * @supported Firefox
 */
export const onCommitted: _WebNavigationOnCommittedEvent;
/**
 * @supported Firefox
 */
export const onDOMContentLoaded: _WebNavigationOnDOMContentLoadedEvent;
/**
 * @supported Firefox
 */
export const onCompleted: _WebNavigationOnCompletedEvent;
/**
 * @supported Firefox
 */
export const onErrorOccurred: _WebNavigationOnErrorOccurredEvent;
/**
 * @supported Firefox
 */
export const onCreatedNavigationTarget: _WebNavigationOnCreatedNavigationTargetEvent;
/**
 * @supported Firefox
 */
export const onReferenceFragmentUpdated: _WebNavigationOnReferenceFragmentUpdatedEvent;
/**
 * @supported Firefox
 */
export const onHistoryStateUpdated: _WebNavigationOnHistoryStateUpdatedEvent;
/**
 * @supported Firefox
 */
export function getFrame(details: _GetFrameDetails): Promise<_GetFrameReturnDetails>;
/**
 * @supported Firefox
 */
export function getAllFrames(details: _GetAllFramesDetails): Promise<_GetAllFramesReturnDetails[]>;
/**
 * @supported Firefox
 */
export interface EventUrlFilters {
    url: events.UrlFilter[];
}
/**
 * @supported Firefox
 */
export interface _GetFrameReturnDetails {
    errorOccurred?: boolean | undefined;
    url: string;
    tabId: number;
    frameId: number;
    parentFrameId: number;
    documentId: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _GetFrameDetails {
    tabId?: number;
    processId?: number | undefined;
    frameId?: number;
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _GetAllFramesReturnDetails {
    documentId: string;
    parentDocumentId?: string;
    url: string;
    tabId: number;
    frameId: number;
    parentFrameId: number;
    errorOccurred?: boolean;
}
/**
 * @supported Firefox
 */
export interface _GetAllFramesDetails {
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeNavigateDetails {
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    parentFrameId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnBeforeNavigateEvent<TCallback = (details: _OnBeforeNavigateDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCommittedDetails {
    documentId: string;
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    transitionType: TransitionType;
    transitionQualifiers: TransitionQualifier[];
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCommittedEvent<TCallback = (details: _OnCommittedDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnDOMContentLoadedDetails {
    documentId: string;
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnDOMContentLoadedEvent<TCallback = (details: _OnDOMContentLoadedDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCompletedDetails {
    documentId: string;
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCompletedEvent<TCallback = (details: _OnCompletedDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnErrorOccurredDetails {
    documentId: string;
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnErrorOccurredEvent<TCallback = (details: _OnErrorOccurredDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCreatedNavigationTargetDetails {
    sourceTabId: number;
    sourceProcessId: number;
    sourceFrameId: number;
    url: string;
    tabId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCreatedNavigationTargetEvent<TCallback = (details: _OnCreatedNavigationTargetDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnReferenceFragmentUpdatedDetails {
    tabId: number;
    url: string;
    processId?: number | undefined;
    frameId: number;
    transitionType: TransitionType;
    transitionQualifiers: TransitionQualifier[];
    timeStamp: number;
    documentId: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnReferenceFragmentUpdatedEvent<TCallback = (details: _OnReferenceFragmentUpdatedDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnTabReplacedDetails {
    replacedTabId: number;
    tabId: number;
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _OnHistoryStateUpdatedDetails {
    documentId: string;
    parentDocumentId?: string;
    tabId: number;
    url: string;
    frameId: number;
    transitionType: TransitionType;
    transitionQualifiers: TransitionQualifier[];
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnHistoryStateUpdatedEvent<TCallback = (details: _OnHistoryStateUpdatedDetails) => void> {
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}

}

export namespace webRequest {
/**
 * @supported Firefox
 */
export type ResourceType =
        | "main_frame"
        | "sub_frame"
        | "stylesheet"
        | "script"
        | "image"
        | "object"
        | "xmlhttprequest"
        | "xslt"
        | "ping"
        | "beacon"
        | "xml_dtd"
        | "font"
        | "media"
        | "websocket"
        | "csp_report"
        | "imageset"
        | "web_manifest"
        | "speculative"
        | "json"
        | "other";
/**
 * @supported Firefox
 */
export type OnBeforeRequestOptions = "blocking" | "requestBody";
/**
 * @supported Firefox
 */
export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking";
/**
 * @supported Firefox
 */
export type OnSendHeadersOptions = "requestHeaders";
/**
 * @supported Firefox
 */
export type OnHeadersReceivedOptions = "blocking" | "responseHeaders";
/**
 * @supported Firefox
 */
export type OnAuthRequiredOptions =
        | "responseHeaders"
        | "blocking"
        | "asyncBlocking";
/**
 * @supported Firefox
 */
export type OnResponseStartedOptions = "responseHeaders";
/**
 * @supported Firefox
 */
export type OnBeforeRedirectOptions = "responseHeaders";
/**
 * @supported Firefox
 */
export type OnCompletedOptions = "responseHeaders";
/**
 * @supported Firefox
 */
export interface RequestFilter {
    urls: string[];
    types?: ResourceType[] | undefined;
    tabId?: number | undefined;
    windowId?: number | undefined;
    incognito?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type HttpHeaders = _HttpHeaders[];
/**
 * @supported Firefox
 */
export interface BlockingResponse {
    cancel?: boolean | undefined;
    redirectUrl?: string | undefined;
    upgradeToSecure?: boolean | undefined;
    requestHeaders?: HttpHeaders | undefined;
    responseHeaders?: HttpHeaders | undefined;
    authCredentials?: _BlockingResponseAuthCredentials | undefined;
}
/**
 * @supported Firefox
 */
export interface UploadData {
    bytes?: ArrayBuffer;
    file?: string;
}
/**
 * @supported Firefox
 */
export interface SecurityInfo {
    state: _SecurityInfoState;
    errorMessage?: string | undefined;
    protocolVersion?: _SecurityInfoProtocolVersion | undefined;
    cipherSuite?: string | undefined;
    keaGroupName?: string | undefined;
    secretKeyLength?: number | undefined;
    signatureSchemeName?: string | undefined;
    certificates: CertificateInfo[];
    overridableErrorCategory?: _SecurityInfoOverridableErrorCategory | undefined;
    isDomainMismatch?: boolean | undefined;
    isNotValidAtThisTime?: boolean | undefined;
    isUntrusted?: boolean | undefined;
    isExtendedValidation?: boolean | undefined;
    certificateTransparencyStatus?: CertificateTransparencyStatus | undefined;
    hsts?: boolean | undefined;
    hpkp?: string | undefined;
    weaknessReasons?: TransportWeaknessReasons[] | undefined;
    usedEch?: boolean | undefined;
    usedDelegatedCredentials?: boolean | undefined;
    usedOcsp?: boolean | undefined;
    usedPrivateDns?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number;
/**
 * @supported Firefox
 */
export const onBeforeRequest: _WebRequestOnBeforeRequestEvent;
/**
 * @supported Firefox
 */
export const onBeforeSendHeaders: _WebRequestOnBeforeSendHeadersEvent;
/**
 * @supported Firefox
 */
export const onSendHeaders: _WebRequestOnSendHeadersEvent;
/**
 * @supported Firefox
 */
export const onHeadersReceived: _WebRequestOnHeadersReceivedEvent;
/**
 * @supported Firefox
 */
export const onAuthRequired: _WebRequestOnAuthRequiredEvent;
/**
 * @supported Firefox
 */
export const onResponseStarted: _WebRequestOnResponseStartedEvent;
/**
 * @supported Firefox
 */
export const onBeforeRedirect: _WebRequestOnBeforeRedirectEvent;
/**
 * @supported Firefox
 */
export const onCompleted: _WebRequestOnCompletedEvent;
/**
 * @supported Firefox
 */
export const onErrorOccurred: _WebRequestOnErrorOccurredEvent;
/**
 * @supported Firefox
 */
export function handlerBehaviorChanged(): Promise<void>;
/**
 * @supported Firefox
 */
export interface CertificateInfo {
    subject: string;
    issuer: string;
    validity: _CertificateInfoValidity;
    fingerprint: _CertificateInfoFingerprint;
    serialNumber: string;
    isBuiltInRoot: boolean;
    subjectPublicKeyInfoDigest: _CertificateInfoSubjectPublicKeyInfoDigest;
    rawDER?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export type CertificateTransparencyStatus =
        | "not_applicable"
        | "policy_compliant"
        | "policy_not_enough_scts"
        | "policy_not_diverse_scts";
/**
 * @supported Firefox
 */
export type TransportWeaknessReasons = "cipher";
/**
 * @supported Firefox
 */
export type UrlClassificationFlags =
        | "fingerprinting"
        | "fingerprinting_content"
        | "cryptomining"
        | "cryptomining_content"
        | "emailtracking"
        | "emailtracking_content"
        | "tracking"
        | "tracking_ad"
        | "tracking_analytics"
        | "tracking_social"
        | "tracking_content"
        | "any_basic_tracking"
        | "any_strict_tracking"
        | "any_social_tracking"
        | "consentmanager"
        | "antifraud";
/**
 * @supported Firefox
 */
export type UrlClassificationParty = UrlClassificationFlags[];
/**
 * @supported Firefox
 */
export interface UrlClassification {
    firstParty: UrlClassificationParty;
    thirdParty: UrlClassificationParty;
}
/**
 * @supported Firefox
 */
export interface StreamFilter {
    status: _StreamFilterStatus;
    error: string;
    onerror: ((event: Event) => void) | null;
    onstop: ((event: Event) => void) | null;
    onstart: ((event: Event) => void) | null;
    ondata: ((event: _StreamFilterOndataEvent) => void) | null;
    close(): void;
    disconnect(): void;
    suspend(): void;
    resume(): void;
    write(data: Uint8Array | ArrayBuffer): void;
}
/**
 * @supported Firefox
 */
export interface _HttpHeaders {
    name: string;
    value?: string | undefined;
    binaryValue?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _BlockingResponseAuthCredentials {
    username: string;
    password: string;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoValidity {
    start: number;
    end: number;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoFingerprint {
    sha1: string;
    sha256: string;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoSubjectPublicKeyInfoDigest {
    sha256: string;
}
/**
 * @supported Firefox
 */
export type _SecurityInfoState =
        | "insecure"
        | "weak"
        | "broken"
        | "secure";
/**
 * @supported Firefox
 */
export type _SecurityInfoProtocolVersion =
        | "TLSv1"
        | "TLSv1.1"
        | "TLSv1.2"
        | "TLSv1.3"
        | "unknown";
/**
 * @supported Firefox
 */
export type _SecurityInfoOverridableErrorCategory =
        | "trust_error"
        | "domain_mismatch"
        | "expired_or_not_yet_valid";
/**
 * @supported Firefox
 */
export type _StreamFilterStatus =
        | "uninitialized"
        | "transferringdata"
        | "finishedtransferringdata"
        | "suspended"
        | "closed"
        | "disconnected"
        | "failed";
/**
 * @supported Firefox
 */
export interface _StreamFilterOndataEvent extends Event {
    data: ArrayBuffer;
}
/**
 * @supported Firefox
 */
export interface _GetSecurityInfoOptions {
    certificateChain?: boolean | undefined;
    rawDER?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRequestDetailsRequestBody {
    error?: string | undefined;
    formData?: object | undefined;
    raw?: UploadData[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRequestDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    requestBody?: _OnBeforeRequestDetailsRequestBody | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeRequestEvent<TCallback = (details: _OnBeforeRequestDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeRequestOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeSendHeadersDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    requestHeaders?: HttpHeaders | undefined;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeSendHeadersEvent<TCallback = (details: _OnBeforeSendHeadersDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeSendHeadersOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnSendHeadersDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    requestHeaders?: HttpHeaders | undefined;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnSendHeadersEvent<TCallback = (details: _OnSendHeadersDetails) => void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnSendHeadersOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnHeadersReceivedDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    statusLine: string;
    responseHeaders?: HttpHeaders | undefined;
    statusCode: number;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnHeadersReceivedEvent<TCallback = (details: _OnHeadersReceivedDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnHeadersReceivedOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnAuthRequiredDetailsChallenger {
    host: string;
    port: number;
}
/**
 * @supported Firefox
 */
export interface _OnAuthRequiredDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    scheme: string;
    realm?: string | undefined;
    challenger: _OnAuthRequiredDetailsChallenger;
    isProxy: boolean;
    responseHeaders?: HttpHeaders | undefined;
    statusLine: string;
    statusCode: number;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnAuthRequiredEvent<TCallback = (
            details: _OnAuthRequiredDetails,
            asyncCallback?: (response: BlockingResponse) => void,
            // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        ) => BlockingResponse | Promise<BlockingResponse> | void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnAuthRequiredOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnResponseStartedDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    ip?: string | undefined;
    fromCache: boolean;
    statusCode: number;
    responseHeaders?: HttpHeaders | undefined;
    statusLine: string;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnResponseStartedEvent<TCallback = (details: _OnResponseStartedDetails) => void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnResponseStartedOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRedirectDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    ip?: string | undefined;
    fromCache: boolean;
    statusCode: number;
    redirectUrl: string;
    responseHeaders?: HttpHeaders | undefined;
    statusLine: string;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeRedirectEvent<TCallback = (details: _OnBeforeRedirectDetails) => void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeRedirectOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCompletedDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    ip?: string | undefined;
    fromCache: boolean;
    statusCode: number;
    responseHeaders?: HttpHeaders | undefined;
    statusLine: string;
    urlClassification: UrlClassification;
    thirdParty: boolean;
    requestSize: number;
    responseSize: number;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnCompletedEvent<TCallback = (details: _OnCompletedDetails) => void> {
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnCompletedOptions[]): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnErrorOccurredDetails {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    incognito?: boolean | undefined;
    cookieStoreId?: string | undefined;
    originUrl?: string | undefined;
    documentUrl?: string | undefined;
    tabId: number;
    type: ResourceType;
    timeStamp: number;
    ip?: string | undefined;
    fromCache: boolean;
    error: string;
    urlClassification?: UrlClassification | undefined;
    thirdParty: boolean;
    documentId?: string;
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnErrorOccurredEvent<TCallback = (details: _OnErrorOccurredDetails) => void> {
    addListener(cb: TCallback, filter: RequestFilter): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export function filterResponseData(requestId: string): StreamFilter;
/**
 * @supported Firefox
 */
export function getSecurityInfo(requestId: string, options?: _GetSecurityInfoOptions): Promise<SecurityInfo>;

}

export namespace windows {
/**
 * @supported Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";
/**
 * @supported Firefox
 */
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "docked";
/**
 * @supported Firefox
 */
export interface Window {
    id?: number | undefined;
    focused: boolean;
    top?: number | undefined;
    left?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    tabs?: tabs.Tab[] | undefined;
    incognito: boolean;
    type?: WindowType | undefined;
    state?: WindowState | undefined;
    alwaysOnTop: boolean;
    sessionId?: string | undefined;
    title?: string | undefined;
}
/**
 * @supported Firefox
 */
export type CreateType =
        | "normal"
        | "popup"
        | "panel"
        | "detached_panel";
/**
 * @supported Firefox
 */
export const WINDOW_ID_NONE: number;
/**
 * @supported Firefox
 */
export const WINDOW_ID_CURRENT: number;
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(window: Window) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: WebExtEvent<(windowId: number) => void>;
/**
 * @supported Firefox
 */
export const onFocusChanged: WebExtEvent<(windowId: number) => void>;
/**
 * @supported Firefox
 */
export function get(windowId: number, getInfo?: GetInfo): Promise<Window>;
/**
 * @supported Firefox
 */
export function getCurrent(getInfo?: GetInfo): Promise<Window>;
/**
 * @supported Firefox
 */
export function getLastFocused(getInfo?: GetInfo): Promise<Window>;
/**
 * @supported Firefox
 */
export function getAll(getInfo?: _GetAllGetInfo): Promise<Window[]>;
/**
 * @supported Firefox
 */
export function create(createData?: _CreateCreateData): Promise<Window>;
/**
 * @supported Firefox
 */
export function update(windowId: number, updateInfo: _UpdateUpdateInfo): Promise<Window>;
/**
 * @supported Firefox
 */
export function remove(windowId: number): Promise<void>;
/**
 * @supported Firefox
 */
export interface GetInfo {
    populate?: boolean | undefined;
    windowTypes?: WindowType[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetAllGetInfo {
    windowTypes?: WindowType[] | undefined;
    populate?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _CreateCreateData {
    url?: string | string[] | undefined;
    tabId?: number | undefined;
    left?: number | undefined;
    top?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    focused?: boolean | undefined;
    incognito?: boolean | undefined;
    type?: CreateType | undefined;
    state?: WindowState | undefined;
    allowScriptsToClose?: boolean | undefined;
    cookieStoreId?: string | undefined;
    titlePreface?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateInfo {
    left?: number | undefined;
    top?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    focused?: boolean | undefined;
    drawAttention?: boolean | undefined;
    state?: WindowState | undefined;
    titlePreface?: string | undefined;
}

}

export namespace _manifest {
/**
 * @supported Firefox
 */
export type PermissionPrivileged = _PermissionPrivileged;
/**
 * @supported Firefox
 */
export interface ActionManifest {
    default_title?: string | undefined;
    default_icon?: IconPath | undefined;
    theme_icons?: ThemeIcons[] | undefined;
    default_popup?: string | undefined;
    browser_style?: boolean | undefined;
    default_area?: _ActionManifestDefaultArea | undefined;
}
/**
 * @supported Firefox
 */
export interface WebExtensionManifest extends ManifestBase {
    action?: ActionManifest | undefined;
    browser_action?: Record<string, unknown>;
    declarative_net_request?: _WebExtensionManifestDeclarativeNetRequest | undefined;
    experiment_apis?: { [key: string]: experiments.ExperimentAPI } | undefined;
    protocol_handlers?: ProtocolHandler[] | undefined;
    default_locale?: string | undefined;
    l10n_resources?: string[] | undefined;
    minimum_chrome_version?: string | undefined;
    minimum_opera_version?: string | undefined;
    icons?: Record<string, string>;
    incognito?: _WebExtensionManifestIncognito | undefined;
    background?: {
    service_worker?: string;
    scripts?: string[];
    page?: string;
    type?: "module";
    persistent?: boolean;
  };
    options_page?: ExtensionURL | undefined;
    options_ui?: _WebExtensionManifestOptionsUi | undefined;
    content_scripts?: Array<{
    matches: string[];
    js?: string[];
    css?: string[];
    run_at?: string;
    all_frames?: boolean;
  }>;
    content_security_policy?: string | {
            /** The Content Security Policy used for extension pages. */
            extension_pages?: string | undefined;
        } | undefined;
    permissions?: string[];
    granted_host_permissions?: boolean | undefined;
    host_permissions?: MatchPattern[] | undefined;
    optional_host_permissions?: MatchPattern[] | undefined;
    optional_permissions?: string[];
    web_accessible_resources?:
            | string[]
            | Array<{
                resources: string[];
                matches?: MatchPattern[] | undefined;
                extension_ids?: Array<ExtensionID | "*"> | undefined;
            }>
            | undefined;
    hidden?: boolean | undefined;
    page_action?: Record<string, unknown>;
    theme_experiment?: ThemeExperiment | undefined;
    user_scripts?: _WebExtensionManifestUserScripts | undefined;
    chrome_settings_overrides?: _WebExtensionManifestChromeSettingsOverrides | undefined;
    commands?: { [key: string]: _WebExtensionManifestCommands } | undefined;
    devtools_page?: ExtensionURL | undefined;
    omnibox?: _WebExtensionManifestOmnibox | undefined;
    sidebar_action?: Record<string, unknown>;
    chrome_url_overrides?: _WebExtensionManifestChromeUrlOverrides | undefined;
    manifest_version: number;
    name: string;
    version: string;
    description?: string;
    author?: string;
    browser_specific_settings?: {
    gecko?: {
      id?: string;
      strict_min_version?: string;
      strict_max_version?: string;
      update_url?: string;
      admin_install_only?: boolean;
    };
    gecko_android?: {
      strict_min_version?: string;
      strict_max_version?: string;
    };
  };
}
/**
 * @supported Firefox
 */
export type OptionalPermission = OptionalPermissionNoPrompt | _OptionalPermission;
/**
 * @supported Firefox
 */
export type PermissionNoPrompt = OptionalPermissionNoPrompt | PermissionPrivileged | _PermissionNoPrompt;
/**
 * @supported Firefox
 */
export type OptionalPermissionNoPrompt = _OptionalPermissionNoPrompt;
/**
 * @supported Firefox
 */
export type Permission = string | PermissionNoPrompt | OptionalPermission | "declarativeNetRequest";
/**
 * @supported Firefox
 */
export type OptionalOnlyPermission = "userScripts";
/**
 * @supported Firefox
 */
export type CommonDataCollectionPermission = _CommonDataCollectionPermission;
/**
 * @supported Firefox
 */
export type DataCollectionPermission = CommonDataCollectionPermission | "none";
/**
 * @supported Firefox
 */
export type OptionalDataCollectionPermission = CommonDataCollectionPermission | "technicalAndInteraction";
/**
 * @supported Firefox
 */
export interface ProtocolHandler {
    name: string;
    protocol: string | _ProtocolHandlerProtocol;
    uriTemplate: ExtensionURL | HttpURL;
}
/**
 * @supported Firefox
 */
export interface ManifestBase {
    manifest_version: number;
    applications?: DeprecatedApplications | undefined;
    browser_specific_settings?: BrowserSpecificSettings | undefined;
    name: string;
    short_name?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    version: string;
    homepage_url?: string | undefined;
    install_origins?: string[] | undefined;
    developer?: _ManifestBaseDeveloper | undefined;
}
/**
 * @supported Firefox
 */
export interface WebExtensionLangpackManifest extends ManifestBase {
    langpack_id: string;
    languages: _WebExtensionLangpackManifestLanguages;
    sources?: _WebExtensionLangpackManifestSources | undefined;
}
/**
 * @supported Firefox
 */
export interface WebExtensionDictionaryManifest extends ManifestBase {
    dictionaries: _WebExtensionDictionaryManifestDictionaries;
}
/**
 * @supported Firefox
 */
export interface ThemeIcons {
    light: ExtensionURL;
    dark: ExtensionURL;
    size: number;
}
/**
 * @supported Firefox
 */
export type OptionalPermissionOrOrigin = OptionalPermission | OptionalOnlyPermission | MatchPattern;
/**
 * @supported Firefox
 */
export type PermissionOrOrigin = Permission | MatchPattern;
/**
 * @supported Firefox
 */
export type HttpURL = string;
/**
 * @supported Firefox
 */
export type ExtensionURL = string;
/**
 * @supported Firefox
 */
export type ExtensionFileUrl = string;
/**
 * @supported Firefox
 */
export type ImageDataOrExtensionURL = string;
/**
 * @supported Firefox
 */
export type ExtensionID = string;
/**
 * @supported Firefox
 */
export interface FirefoxSpecificProperties {
    id?: ExtensionID | undefined;
    update_url?: string | undefined;
    strict_min_version?: string | undefined;
    strict_max_version?: string | undefined;
    admin_install_only?: boolean | undefined;
    data_collection_permissions?: {
            required?: DataCollectionPermission[] | undefined;
            optional?: OptionalDataCollectionPermission[] | undefined;
            has_previous_consent?: boolean | undefined;
        } | undefined;
}
/**
 * @supported Firefox
 */
export interface GeckoAndroidSpecificProperties {
    strict_min_version?: string | undefined;
    strict_max_version?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface DeprecatedApplications {
    gecko?: FirefoxSpecificProperties | undefined;
    gecko_android?: GeckoAndroidSpecificProperties | undefined;
}
/**
 * @supported Firefox
 */
export interface BrowserSpecificSettings {
    gecko?: FirefoxSpecificProperties | undefined;
    gecko_android?: GeckoAndroidSpecificProperties | undefined;
}
/**
 * @supported Firefox
 */
export type MatchPattern = MatchPatternRestricted | MatchPatternUnestricted | "<all_urls>";
/**
 * @supported Firefox
 */
export type MatchPatternRestricted = string;
/**
 * @supported Firefox
 */
export type MatchPatternUnestricted = string;
/**
 * @supported Firefox
 */
export interface ContentScript {
    matches: MatchPattern[];
    exclude_matches?: MatchPattern[] | undefined;
    include_globs?: string[] | undefined;
    exclude_globs?: string[] | undefined;
    css?: ExtensionURL[] | undefined;
    js?: ExtensionURL[] | undefined;
    all_frames?: boolean | undefined;
    match_about_blank?: boolean | undefined;
    match_origin_as_fallback?: boolean | undefined;
    run_at?: extensionTypes.RunAt | undefined;
    world?: extensionTypes.ExecutionWorld | undefined;
}
/**
 * @supported Firefox
 */
export type IconPath = {
        [key: number]: ExtensionFileUrl;
    } | ExtensionFileUrl;
/**
 * @supported Firefox
 */
export type IconImageData = {
        [key: number]: ImageData;
    } | ImageData;
/**
 * @supported Firefox
 */
export type ImageData = globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray };
/**
 * @supported Firefox
 */
export type UnrecognizedProperty = _WebExtJsonValue;
/**
 * @supported Firefox
 */
export type NativeManifest = {
  name: string;
  description: string;
  path: string;
  type: "pkcs11" | "stdio";
  allowed_extensions: string[];
} | {
  name: string;
  description: string;
  data: _WebExtJsonObject;
  type: "storage";
};
/**
 * @supported Firefox
 */
export type ThemeColor = string | [number, number, number] | [number, number, number, number];
/**
 * @supported Firefox
 */
export interface ThemeExperiment {
    stylesheet?: ExtensionURL | undefined;
    images?: { [key: string]: string } | undefined;
    colors?: { [key: string]: string } | undefined;
    properties?: { [key: string]: string } | undefined;
}
/**
 * @supported Firefox
 */
export interface ThemeType {
    images?: _ThemeTypeImages | undefined;
    colors?: _ThemeTypeColors | undefined;
    properties?: _ThemeType | undefined;
}
/**
 * @supported Firefox
 */
export interface ThemeManifest extends ManifestBase {
    theme: ThemeType;
    dark_theme?: ThemeType | undefined;
    default_locale?: string | undefined;
    theme_experiment?: ThemeExperiment | undefined;
    icons?: _ThemeManifestIcons | undefined;
}
/**
 * @supported Firefox
 */
export type KeyName = string;
/**
 * @supported Firefox
 */
export type _PermissionPrivileged =
        | "activityLog"
        | "mozillaAddons"
        | "networkStatus"
        | "telemetry"
        | "normandyAddonStudy"
        | "urlbar";
/**
 * @supported Firefox
 */
export type _ActionManifestDefaultArea =
        | "navbar"
        | "menupanel"
        | "tabstrip"
        | "personaltoolbar";
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestDeclarativeNetRequestRuleResources {
    id: string;
    enabled: boolean;
    path: ExtensionURL;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestDeclarativeNetRequest {
    rule_resources: _WebExtensionManifestDeclarativeNetRequestRuleResources[];
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestIcons {
    [key: number]: ExtensionFileUrl;
}
/**
 * @supported Firefox
 */
export type _WebExtensionManifestIncognito = "not_allowed" | "spanning" | "split";
/**
 * @supported Firefox
 */
export type _UndefinedType = "module" | "classic";
/**
 * @supported Firefox
 */
export type _PreferredEnvironment = "service_worker" | "document";
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestOptionsUi {
    page: ExtensionURL;
    browser_style?: boolean | undefined;
    chrome_style?: boolean | undefined;
    open_in_tab?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestPageAction {
    default_title?: string | undefined;
    default_icon?: IconPath | undefined;
    default_popup?: string | undefined;
    browser_style?: boolean | undefined;
    show_matches?: MatchPattern[] | undefined;
    hide_matches?: MatchPatternRestricted[] | undefined;
    pinned?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestTelemetryPublicKeyKey {
    crv?: string | undefined;
    kty?: string | undefined;
    x?: string | undefined;
    y?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestTelemetryPublicKey {
    id: string;
    key: _WebExtensionManifestTelemetryPublicKeyKey;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestUserScripts {
    api_script?: ExtensionURL | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeSettingsOverridesSearchProvider {
    name: string;
    keyword?: string | string[] | undefined;
    search_url: string;
    favicon_url?: string | undefined;
    suggest_url?: string | undefined;
    instant_url?: string | undefined;
    image_url?: string | undefined;
    search_url_get_params?: string | undefined;
    search_url_post_params?: string | undefined;
    suggest_url_get_params?: string | undefined;
    suggest_url_post_params?: string | undefined;
    instant_url_post_params?: string | undefined;
    image_url_post_params?: string | undefined;
    search_form?: string | undefined;
    alternate_urls?: string[] | undefined;
    prepopulated_id?: number | undefined;
    encoding?: string | undefined;
    is_default?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeSettingsOverrides {
    homepage?: string | undefined;
    search_provider?: _WebExtensionManifestChromeSettingsOverridesSearchProvider | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestCommandsSuggestedKey {
    default?: KeyName | undefined;
    mac?: KeyName | undefined;
    linux?: KeyName | undefined;
    windows?: KeyName | undefined;
    chromeos?: string | undefined;
    android?: string | undefined;
    ios?: string | undefined;
    additionalProperties?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestCommands {
    suggested_key?: _WebExtensionManifestCommandsSuggestedKey | undefined;
    description?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestOmnibox {
    keyword: string;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestSidebarAction {
    default_title?: string | undefined;
    default_icon?: IconPath | undefined;
    browser_style?: boolean | undefined;
    default_panel: string;
    open_at_install?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeUrlOverrides {
    newtab?: ExtensionURL | undefined;
    bookmarks?: ExtensionURL | undefined;
    history?: ExtensionURL | undefined;
}
/**
 * @supported Firefox
 */
export type _OptionalPermission =
        | "browserSettings"
        | "browsingData"
        | "declarativeNetRequestFeedback"
        | "downloads"
        | "downloads.open"
        | "management"
        | "clipboardRead"
        | "clipboardWrite"
        | "geolocation"
        | "notifications"
        | "privacy"
        | "proxy"
        | "nativeMessaging"
        | "webNavigation"
        | "bookmarks"
        | "devtools"
        | "find"
        | "history"
        | "pkcs11"
        | "sessions"
        | "tabs"
        | "tabHide"
        | "topSites";
/**
 * @supported Firefox
 */
export type _PermissionNoPrompt =
        | "captivePortal"
        | "contextualIdentities"
        | "declarativeNetRequestWithHostAccess"
        | "dns"
        | "geckoProfiler"
        | "identity"
        | "alarms"
        | "storage"
        | "unlimitedStorage"
        | "theme"
        | "menus"
        | "contextMenus";
/**
 * @supported Firefox
 */
export type _OptionalPermissionNoPrompt =
        | "cookies"
        | "idle"
        | "scripting"
        | "webRequest"
        | "webRequestAuthProvider"
        | "webRequestBlocking"
        | "webRequestFilterResponse"
        | "webRequestFilterResponse.serviceWorkerScript"
        | "menus.overrideContext"
        | "search"
        | "tabGroups"
        | "activeTab";
/**
 * @supported Firefox
 */
export type _CommonDataCollectionPermission =
        | "authenticationInfo"
        | "bookmarksInfo"
        | "browsingActivity"
        | "financialAndPaymentInfo"
        | "healthInfo"
        | "locationInfo"
        | "personalCommunications"
        | "personallyIdentifyingInfo"
        | "searchTerms"
        | "websiteActivity"
        | "websiteContent";
/**
 * @supported Firefox
 */
export type _ProtocolHandlerProtocol =
        | "bitcoin"
        | "dat"
        | "dweb"
        | "ftp"
        | "geo"
        | "gopher"
        | "im"
        | "ipfs"
        | "ipns"
        | "irc"
        | "ircs"
        | "magnet"
        | "mailto"
        | "matrix"
        | "mms"
        | "news"
        | "nntp"
        | "sip"
        | "sms"
        | "smsto"
        | "ssb"
        | "ssh"
        | "tel"
        | "urn"
        | "webcal"
        | "wtai"
        | "xmpp";
/**
 * @supported Firefox
 */
export interface _ManifestBaseDeveloper {
    name?: string | undefined;
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UndefinedChromeResources {
    [key: string]: ExtensionURL | {
            [key: string]: ExtensionURL;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionLangpackManifestLanguages {
    [key: string]: {
            chrome_resources: _UndefinedChromeResources;
            version: string;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionLangpackManifestSources {
    [key: string]: {
            base_path: ExtensionURL;
            paths?: string[] | undefined;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionDictionaryManifestDictionaries {
    [key: string]: string;
}
/**
 * @supported Firefox
 */
export interface _ThemeTypeImages {
    additional_backgrounds?: ImageDataOrExtensionURL[] | undefined;
    headerURL?: ImageDataOrExtensionURL | undefined;
    theme_frame?: ImageDataOrExtensionURL | undefined;
}
/**
 * @supported Firefox
 */
export interface _ThemeTypeColors {
    tab_selected?: ThemeColor | undefined;
    accentcolor?: ThemeColor | undefined;
    frame?: ThemeColor | undefined;
    frame_inactive?: ThemeColor | undefined;
    textcolor?: ThemeColor | undefined;
    tab_background_text?: ThemeColor | undefined;
    tab_background_separator?: ThemeColor | undefined;
    tab_loading?: ThemeColor | undefined;
    tab_text?: ThemeColor | undefined;
    tab_line?: ThemeColor | undefined;
    toolbar?: ThemeColor | undefined;
    toolbar_text?: ThemeColor | undefined;
    bookmark_text?: ThemeColor | undefined;
    toolbar_field?: ThemeColor | undefined;
    toolbar_field_text?: ThemeColor | undefined;
    toolbar_field_border?: ThemeColor | undefined;
    toolbar_field_separator?: ThemeColor | undefined;
    toolbar_top_separator?: ThemeColor | undefined;
    toolbar_bottom_separator?: ThemeColor | undefined;
    toolbar_vertical_separator?: ThemeColor | undefined;
    icons?: ThemeColor | undefined;
    icons_attention?: ThemeColor | undefined;
    button_background_hover?: ThemeColor | undefined;
    button_background_active?: ThemeColor | undefined;
    popup?: ThemeColor | undefined;
    popup_text?: ThemeColor | undefined;
    popup_border?: ThemeColor | undefined;
    toolbar_field_focus?: ThemeColor | undefined;
    toolbar_field_text_focus?: ThemeColor | undefined;
    toolbar_field_border_focus?: ThemeColor | undefined;
    popup_highlight?: ThemeColor | undefined;
    popup_highlight_text?: ThemeColor | undefined;
    ntp_background?: ThemeColor | undefined;
    ntp_card_background?: ThemeColor | undefined;
    ntp_text?: ThemeColor | undefined;
    sidebar?: ThemeColor | undefined;
    sidebar_border?: ThemeColor | undefined;
    sidebar_text?: ThemeColor | undefined;
    sidebar_highlight?: ThemeColor | undefined;
    sidebar_highlight_text?: ThemeColor | undefined;
    toolbar_field_highlight?: ThemeColor | undefined;
    toolbar_field_highlight_text?: ThemeColor | undefined;
}
/**
 * @supported Firefox
 */
export type _ThemeTypeAdditionalBackgroundsAlignment =
        | "bottom"
        | "center"
        | "left"
        | "right"
        | "top"
        | "center bottom"
        | "center center"
        | "center top"
        | "left bottom"
        | "left center"
        | "left top"
        | "right bottom"
        | "right center"
        | "right top";
/**
 * @supported Firefox
 */
export type _ThemeTypeAdditionalBackgroundsTiling =
        | "no-repeat"
        | "repeat"
        | "repeat-x"
        | "repeat-y";
/**
 * @supported Firefox
 */
export type _ThemeTypeColorScheme =
        | "auto"
        | "light"
        | "dark"
        | "system";
/**
 * @supported Firefox
 */
export type _ThemeTypeContentColorScheme =
        | "auto"
        | "light"
        | "dark"
        | "system";
/**
 * @supported Firefox
 */
export interface _ThemeType {
    additional_backgrounds_alignment?: _ThemeTypeAdditionalBackgroundsAlignment[] | undefined;
    additional_backgrounds_tiling?: _ThemeTypeAdditionalBackgroundsTiling[] | undefined;
    color_scheme?: _ThemeTypeColorScheme | undefined;
    content_color_scheme?: _ThemeTypeContentColorScheme | undefined;
}
/**
 * @supported Firefox
 */
export interface _ThemeManifestIcons {
    [key: number]: string;
}

}

export namespace activityLog {
/**
 * @supported Firefox
 */
export type _OnExtensionActivityDetailsType =
        | "api_call"
        | "api_event"
        | "content_script"
        | "user_script";
/**
 * @supported Firefox
 */
export type _OnExtensionActivityDetailsViewType =
        | "background"
        | "popup"
        | "sidebar"
        | "tab"
        | "devtools_page"
        | "devtools_panel";
/**
 * @supported Firefox
 */
export interface _OnExtensionActivityDetailsData {
    args?: /* TODO: Upstream type uses any */ any[] | undefined;
    result?: object | undefined;
    tabId?: number | undefined;
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnExtensionActivityDetails {
    timeStamp: extensionTypes.Date;
    type: _OnExtensionActivityDetailsType;
    viewType?: _OnExtensionActivityDetailsViewType | undefined;
    name: string;
    data: _OnExtensionActivityDetailsData;
}
/**
 * @supported Firefox
 */
export interface _ActivityLogOnExtensionActivityEvent<TCallback = (details: _OnExtensionActivityDetails) => void> {
    addListener(cb: TCallback, id: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export const onExtensionActivity: _ActivityLogOnExtensionActivityEvent;

}

export namespace browserAction {
/**
 * @supported Firefox
 */
export interface Details {
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export type ColorArray = [number, number, number, number];
/**
 * @supported Firefox
 */
export type ImageDataType = ImageData;
/**
 * @supported Firefox
 */
export type ColorValue = string | ColorArray | null;
/**
 * @supported Firefox
 */
export interface OnClickData {
    modifiers: _OnClickDataModifiers[];
    button?: number | undefined;
}
/**
 * @supported Firefox
 */
export type _OnClickDataModifiers =
        | "Shift"
        | "Alt"
        | "Command"
        | "Ctrl"
        | "MacCtrl";
/**
 * @supported Firefox
 */
export interface _SetTitleDetails extends Details {
    title: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails extends Details {
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    path?: string | {
            [key: number]: string;
        } | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails extends Details {
    popup: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextDetails extends Details {
    text: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeBackgroundColorDetails extends Details {
    color: ColorValue;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextColorDetails extends Details {
    color: ColorValue;
}
/**
 * @supported Firefox
 */
export interface _OpenPopupOptions {
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export function setTitle(details: _SetTitleDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getTitle(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function getUserSettings(): Promise<browser.action._GetUserSettingsReturnUserSettings>;
/**
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getPopup(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function setBadgeText(details: _SetBadgeTextDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeText(details: Details): Promise<string>;
/**
 * @supported Firefox
 */
export function setBadgeBackgroundColor(details: _SetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
/**
 * @supported Firefox
 */
export function setBadgeTextColor(details: _SetBadgeTextColorDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setBadgeTextColor(details: _SetBadgeTextColorDetails, callback: () => void): void;
/**
 * @supported Firefox
 */
export function getBadgeTextColor(details: Details): Promise<ColorArray>;
/**
 * @supported Firefox
 */
export function getBadgeTextColor(details: Details, callback: (color: ColorArray) => void): void;
/**
 * @supported Firefox
 */
export function enable(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function disable(tabId?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function isEnabled(details: Details): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export function openPopup(options?: _OpenPopupOptions): Promise<boolean>;
/**
 * @supported Firefox
 */
export const onClicked: WebExtEvent<(tab: tabs.Tab, info?: OnClickData) => void>;
/**
 * @supported Firefox
 */
export const onUserSettingsChanged: WebExtEvent<(change: browser.action._GetUserSettingsReturnUserSettings) => void>;

}

export namespace browserSettings {
/**
 * @supported Firefox
 */
export type ImageAnimationBehavior =
        | "normal"
        | "none"
        | "once";
/**
 * @supported Firefox
 */
export type ContextMenuMouseEvent = "mouseup" | "mousedown";
/**
 * @supported Firefox
 */
export type ColorManagementMode =
        | "off"
        | "full"
        | "tagged_only";
/**
 * @supported Firefox
 */
export const allowPopupsForUserEvents: types.Setting;
/**
 * @supported Firefox
 */
export const cacheEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const closeTabsByDoubleClick: types.Setting;
/**
 * @supported Firefox
 */
export const contextMenuShowEvent: types.Setting;
/**
 * @supported Firefox
 */
export const ftpProtocolEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const homepageOverride: types.Setting;
/**
 * @supported Firefox
 */
export const imageAnimationBehavior: types.Setting;
/**
 * @supported Firefox
 */
export const newTabPageOverride: types.Setting;
/**
 * @supported Firefox
 */
export const newTabPosition: types.Setting;
/**
 * @supported Firefox
 */
export const openBookmarksInNewTabs: types.Setting;
/**
 * @supported Firefox
 */
export const openSearchResultsInNewTabs: types.Setting;
/**
 * @supported Firefox
 */
export const openUrlbarResultsInNewTabs: types.Setting;
/**
 * @supported Firefox
 */
export const webNotificationsDisabled: types.Setting;
/**
 * @supported Firefox
 */
export const overrideDocumentColors: types.Setting;
/**
 * @supported Firefox
 */
export const overrideContentColorScheme: types.Setting;
/**
 * @supported Firefox
 */
export const useDocumentFonts: types.Setting;
/**
 * @supported Firefox
 */
export const zoomFullPage: types.Setting;
/**
 * @supported Firefox
 */
export const zoomSiteSpecific: types.Setting;
/**
 * @supported Firefox
 */
export const verticalTabs: types.Setting;

}

export namespace browserSettings.colorManagement {
/**
 * @supported Firefox
 */
export const mode: types.Setting;
/**
 * @supported Firefox
 */
export const useNativeSRGB: types.Setting;
/**
 * @supported Firefox
 */
export const useWebRenderCompositor: types.Setting;

}

export namespace captivePortal {
/**
 * @supported Firefox
 */
export type _OnStateChangedDetailsState =
        | "unknown"
        | "not_captive"
        | "unlocked_portal"
        | "locked_portal";
/**
 * @supported Firefox
 */
export interface _OnStateChangedDetails {
    state: _OnStateChangedDetailsState;
}
/**
 * @supported Firefox
 */
export type _OnConnectivityAvailableStatus = "captive" | "clear";
/**
 * @supported Firefox
 */
export const canonicalURL: types.Setting;
/**
 * @supported Firefox
 */
export function getState(): Promise<_OnStateChangedDetailsState>;
/**
 * @supported Firefox
 */
export function getLastChecked(): Promise<number>;
/**
 * @supported Firefox
 */
export const onStateChanged: WebExtEvent<(details: _OnStateChangedDetails) => void>;
/**
 * @supported Firefox
 */
export const onConnectivityAvailable: WebExtEvent<(status: _OnConnectivityAvailableStatus) => void>;

}

export namespace clipboard {
/**
 * @supported Firefox
 */
export type _SetImageDataImageType = "jpeg" | "png";
/**
 * @supported Firefox
 */
export function setImageData(imageData: ArrayBuffer, imageType: _SetImageDataImageType): Promise<void>;

}

export namespace contextualIdentities {
/**
 * @supported Firefox
 */
export interface ContextualIdentity {
    name: string;
    icon: string;
    iconUrl: string;
    color: string;
    colorCode: string;
    cookieStoreId: string;
}
/**
 * @supported Firefox
 */
export interface _QueryDetails {
    name?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _CreateDetails {
    name: string;
    color: string;
    icon: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateDetails {
    name?: string | undefined;
    color?: string | undefined;
    icon?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnUpdatedChangeInfo {
    contextualIdentity: ContextualIdentity;
}
/**
 * @supported Firefox
 */
export interface _OnCreatedChangeInfo {
    contextualIdentity: ContextualIdentity;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedChangeInfo {
    contextualIdentity: ContextualIdentity;
}
/**
 * @supported Firefox
 */
export function get(cookieStoreId: string): Promise<ContextualIdentity>;
/**
 * @supported Firefox
 */
export function query(details: _QueryDetails): Promise<ContextualIdentity[]>;
/**
 * @supported Firefox
 */
export function create(details: _CreateDetails): Promise<ContextualIdentity>;
/**
 * @supported Firefox
 */
export function update(cookieStoreId: string, details: _UpdateDetails): Promise<ContextualIdentity>;
/**
 * @supported Firefox
 */
export function move(cookieStoreId: string | string[], position: number): Promise<void>;
/**
 * @supported Firefox
 */
export function remove(cookieStoreId: string): Promise<ContextualIdentity>;
/**
 * @supported Firefox
 */
export const onUpdated: WebExtEvent<(changeInfo: _OnUpdatedChangeInfo) => void>;
/**
 * @supported Firefox
 */
export const onCreated: WebExtEvent<(changeInfo: _OnCreatedChangeInfo) => void>;
/**
 * @supported Firefox
 */
export const onRemoved: WebExtEvent<(changeInfo: _OnRemovedChangeInfo) => void>;

}

export namespace experiments {
/**
 * @supported Firefox
 */
export interface ExperimentAPI {
    schema: ExperimentURL;
    parent?: _ExperimentAPIParent | undefined;
    child?: _ExperimentAPIChild | undefined;
}
/**
 * @supported Firefox
 */
export type ExperimentURL = string;
/**
 * @supported Firefox
 */
export type APIPaths = APIPath[];
/**
 * @supported Firefox
 */
export type APIPath = string[];
/**
 * @supported Firefox
 */
export type APIEvents = APIEvent[];
/**
 * @supported Firefox
 */
export type APIEvent = "startup";
/**
 * @supported Firefox
 */
export type APIParentScope =
        | "addon_parent"
        | "content_parent"
        | "devtools_parent";
/**
 * @supported Firefox
 */
export type APIChildScope =
        | "addon_child"
        | "content_child"
        | "devtools_child";
/**
 * @supported Firefox
 */
export interface _ExperimentAPIParent {
    events?: APIEvents | undefined;
    paths?: APIPaths | undefined;
    script: ExperimentURL;
    scopes?: APIParentScope[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _ExperimentAPIChild {
    paths: APIPaths;
    script: ExperimentURL;
    scopes: APIChildScope[];
}

}

export namespace geckoProfiler {
/**
 * @supported Firefox
 */
export type ProfilerFeature = "java" | "js" | "mainthreadio" | "fileio" | "fileioall" | "nomarkerstacks" | "screenshots" | "seqstyle" | "stackwalk" | "jsallocations" | "nostacksampling" | "nativeallocations" | "ipcmessages" | "audiocallbacktracing" | "cpu" | "notimerresolutionchange" | "cpuallthreads" | "samplingallthreads" | "markersallthreads" | "unregisteredthreads" | "processcpu" | "power" | "responsiveness" | "cpufreq" | "bandwidth" | "memory" | "tracing" | "sandbox" | "flows";
/**
 * @supported Firefox
 */
export type Supports = "windowLength";
/**
 * @supported Firefox
 */
export interface _StartSettings {
    bufferSize: number;
    windowLength?: number | undefined;
    interval: number;
    features: ProfilerFeature[];
    threads?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export function start(settings: StartSettings): Promise<void>;
/**
 * @supported Firefox
 */
export function stop(): Promise<void>;
/**
 * @supported Firefox
 */
export function pause(): Promise<void>;
/**
 * @supported Firefox
 */
export function resume(): Promise<void>;
/**
 * @supported Firefox
 */
export function dumpProfileToFile(fileName: string): Promise<string>;
/**
 * @supported Firefox
 */
export function getProfile(): Promise<Record<string, unknown>>;
/**
 * @supported Firefox
 */
export function getProfileAsArrayBuffer(): Promise<ArrayBuffer>;
/**
 * @supported Firefox
 */
export function getProfileAsGzippedArrayBuffer(): Promise<ArrayBuffer>;
/**
 * @supported Firefox
 */
export function getSymbols(debugName: string, breakpadId: string): Promise<[Uint32Array, Uint32Array, Uint8Array]>;
/**
 * @supported Firefox
 */
export const onRunning: events.Event<(isRunning: boolean) => void>;
/**
 * @supported Firefox
 */
export interface StartSettings {
    bufferSize: number;
    features: ProfilerFeature[];
    interval: number;
    windowLength?: number;
    threads?: string[];
}

}

export namespace networkStatus {
/**
 * @supported Firefox
 */
export interface NetworkLinkInfo {
    status: _NetworkLinkInfoStatus;
    type: _NetworkLinkInfoType;
    id?: string | undefined;
}
/**
 * @supported Firefox
 */
export type _NetworkLinkInfoStatus =
        | "unknown"
        | "up"
        | "down";
/**
 * @supported Firefox
 */
export type _NetworkLinkInfoType =
        | "unknown"
        | "ethernet"
        | "usb"
        | "wifi"
        | "wimax"
        | "mobile";
/**
 * @supported Firefox
 */
export function getLinkInfo(): Promise<NetworkLinkInfo>;
/**
 * @supported Firefox
 */
export const onConnectionChanged: WebExtEvent<(details: NetworkLinkInfo) => void>;

}

export namespace pageAction {
/**
 * @supported Firefox
 */
export type ImageDataType = ImageData;
/**
 * @supported Firefox
 */
export interface OnClickData {
    modifiers: _OnClickDataModifiers[];
    button?: number | undefined;
}
/**
 * @supported Firefox
 */
export type _OnClickDataModifiers =
        | "Shift"
        | "Alt"
        | "Command"
        | "Ctrl"
        | "MacCtrl";
/**
 * @supported Firefox
 */
export interface _IsShownDetails {
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface _SetTitleDetails {
    tabId: number;
    title: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetTitleDetails {
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails {
    tabId: number;
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    path?: string | {
            [key: number]: string;
        } | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails {
    tabId: number;
    popup: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetPopupDetails {
    tabId: number;
}
/**
 * @supported Firefox
 */
export function show(tabId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function hide(tabId: number): Promise<void>;
/**
 * @supported Firefox
 */
export function isShown(details: _IsShownDetails): Promise<boolean>;
/**
 * @supported Firefox
 */
export function setTitle(details: _SetTitleDetails): void;
/**
 * @supported Firefox
 */
export function getTitle(details: _GetTitleDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): void;
/**
 * @supported Firefox
 */
export function getPopup(details: _GetPopupDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function openPopup(): Promise<void>;
/**
 * @supported Firefox
 */
export const onClicked: WebExtEvent<(tab: tabs.Tab, info?: OnClickData) => void>;

}

export namespace privacy.network {
/**
 * @supported Firefox
 */
export type IPHandlingPolicy =
        | "default"
        | "default_public_and_private_interfaces"
        | "default_public_interface_only"
        | "disable_non_proxied_udp"
        | "proxy_only";
/**
 * @supported Firefox
 */
export interface tlsVersionRestrictionConfig {
    minimum?: _TlsVersionRestrictionConfigMinimum | undefined;
    maximum?: _TlsVersionRestrictionConfigMaximum | undefined;
}
/**
 * @supported Firefox
 */
export type HTTPSOnlyModeOption =
        | "always"
        | "private_browsing"
        | "never";
/**
 * @supported Firefox
 */
export type _TlsVersionRestrictionConfigMinimum =
        | "TLSv1"
        | "TLSv1.1"
        | "TLSv1.2"
        | "TLSv1.3"
        | "unknown";
/**
 * @supported Firefox
 */
export type _TlsVersionRestrictionConfigMaximum =
        | "TLSv1"
        | "TLSv1.1"
        | "TLSv1.2"
        | "TLSv1.3"
        | "unknown";
/**
 * @supported Firefox
 */
export const networkPredictionEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const peerConnectionEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const webRTCIPHandlingPolicy: types.Setting;
/**
 * @supported Firefox
 */
export const tlsVersionRestriction: types.Setting;
/**
 * @supported Firefox
 */
export const httpsOnlyMode: types.Setting;
/**
 * @supported Firefox
 */
export const globalPrivacyControl: types.Setting;

}

export namespace privacy.services {
/**
 * @supported Firefox
 */
export const passwordSavingEnabled: types.Setting;

}

export namespace privacy.websites {
/**
 * @supported Firefox
 */
export type TrackingProtectionModeOption =
        | "always"
        | "never"
        | "private_browsing";
/**
 * @supported Firefox
 */
export interface CookieConfig {
    behavior?: _CookieConfigBehavior | undefined;
    nonPersistentCookies?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type _CookieConfigBehavior =
        | "allow_all"
        | "reject_all"
        | "reject_third_party"
        | "allow_visited"
        | "reject_trackers"
        | "reject_trackers_and_partition_foreign";
/**
 * @supported Firefox
 */
export const hyperlinkAuditingEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const referrersEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const resistFingerprinting: types.Setting;
/**
 * @supported Firefox
 */
export const firstPartyIsolate: types.Setting;
/**
 * @supported Firefox
 */
export const trackingProtectionMode: types.Setting;
/**
 * @supported Firefox
 */
export const cookieConfig: types.Setting;

}

export namespace telemetry {
/**
 * @supported Firefox
 */
export type ScalarType =
        | "count"
        | "string"
        | "boolean";
/**
 * @supported Firefox
 */
export interface ScalarData {
    kind: ScalarType;
    keyed?: boolean;
    record_on_release?: boolean;
    expired?: boolean;
}
/**
 * @supported Firefox
 */
export interface EventData {
    methods: string[];
    objects: string[];
    extra_keys: string[];
    record_on_release?: boolean;
    expired?: boolean;
}
/**
 * @supported Firefox
 */
export interface _SubmitPingOptions {
    addClientId?: boolean;
    addEnvironment?: boolean;
    overrideEnvironment?: Record<string, unknown>;
    usePingSender?: boolean;
}
/**
 * @supported Firefox
 */
export interface _SubmitEncryptedPingOptions {
    schemaName: string;
    schemaVersion: number;
}
/**
 * @supported Firefox
 */
export function submitPing(type: string, message: Record<string, unknown>, options?: _SubmitPingOptions): Promise<void>;
/**
 * @supported Firefox
 */
export function canUpload(): Promise<boolean>;
/**
 * @supported Firefox
 */
export function scalarAdd(name: string, value: number): Promise<void>;
/**
 * @supported Firefox
 */
export function scalarSet(name: string, value: string | boolean | number | Record<string, unknown>): Promise<void>;
/**
 * @supported Firefox
 */
export function scalarSetMaximum(name: string, value: number): Promise<void>;
/**
 * @supported Firefox
 */
export function keyedScalarAdd(name: string, key: string, value: number): Promise<void>;
/**
 * @supported Firefox
 */
export function keyedScalarSet(name: string, key: string, value: string | boolean | number | Record<string, unknown>): Promise<void>;
/**
 * @supported Firefox
 */
export function keyedScalarSetMaximum(name: string, key: string, value: number): Promise<void>;
/**
 * @supported Firefox
 */
export function recordEvent(category: string, method: string, object: string, value?: string, extra?: Record<string, string>): Promise<void>;
/**
 * @supported Firefox
 */
export function registerScalars(category: string, data: Record<string, ScalarData>): Promise<void>;
/**
 * @supported Firefox
 */
export function registerEvents(category: string, data: Record<string, EventData>): Promise<void>;
/**
 * @supported Firefox
 */
export function setEventRecordingEnabled(category: string, enabled: boolean): Promise<void>;

}

export namespace theme {
/**
 * @supported Firefox
 */
export interface ThemeUpdateInfo {
    theme: object;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export function getCurrent(windowId?: number): Promise<_manifest.ThemeType>;
/**
 * @supported Firefox
 */
export function update(details: _manifest.ThemeType): void;
/**
 * @supported Firefox
 */
export function update(windowId: number, details: _manifest.ThemeType): void;
/**
 * @supported Firefox
 */
export function reset(windowId?: number): void;
/**
 * @supported Firefox
 */
export const onUpdated: WebExtEvent<(updateInfo: ThemeUpdateInfo) => void>;

}

export namespace find {
/**
 * @supported Firefox
 */
export interface _FindParams {
    tabId?: number | undefined;
    caseSensitive?: boolean | undefined;
    matchDiacritics?: boolean | undefined;
    entireWord?: boolean | undefined;
    includeRectData?: boolean | undefined;
    includeRangeData?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _HighlightResultsParams {
    rangeIndex?: number | undefined;
    tabId?: number | undefined;
    noScroll?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export function find(queryphrase: string, params?: _FindParams): Promise<{
        count: number;
        rangeData?: Array<{
            framePos: number;
            startTextNodePos: number;
            endTextNodePos: number;
            startOffset: number;
            endOffset: number;
        }>;
        rectData?: Array<{
            rectsAndTexts: {
                rectList: Array<{
                    top: number;
                    left: number;
                    bottom: number;
                    right: number;
                }>;
                textList: string[];
            };
            textList: string;
        }>;
    }>;
/**
 * @supported Firefox
 */
export function highlightResults(params?: _HighlightResultsParams): void;
/**
 * @supported Firefox
 */
export function removeHighlighting(tabId?: number): void;

}

export namespace menus {
/**
 * @supported Firefox
 */
export type ContextType = _ContextType;
/**
 * @supported Firefox
 */
export type ItemType =
        | "normal"
        | "checkbox"
        | "radio"
        | "separator";
/**
 * @supported Firefox
 */
export interface OnClickData {
    menuItemId: number | string;
    parentMenuItemId?: number | string | undefined;
    viewType?: extension.ViewType | undefined;
    mediaType?: string | undefined;
    linkText?: string | undefined;
    linkUrl?: string | undefined;
    srcUrl?: string | undefined;
    pageUrl?: string | undefined;
    frameId?: number | undefined;
    frameUrl?: string | undefined;
    selectionText?: string | undefined;
    editable: boolean;
    wasChecked?: boolean | undefined;
    checked?: boolean | undefined;
    bookmarkId?: string | undefined;
    modifiers: _OnClickDataModifiers[];
    button?: number | undefined;
    targetElementId?: number | undefined;
}
/**
 * @supported Firefox
 */
export type _ContextType =
        | "all"
        | "page"
        | "frame"
        | "selection"
        | "link"
        | "editable"
        | "password"
        | "image"
        | "video"
        | "audio"
        | "launcher"
        | "bookmark"
        | "page_action"
        | "tab"
        | "tools_menu"
        /** Not supported on manifest versions above 2. */
        | "browser_action"
        /** Needs at least manifest version 3. */
        | "action";
/**
 * @supported Firefox
 */
export type _OnClickDataModifiers =
        | "Shift"
        | "Alt"
        | "Command"
        | "Ctrl"
        | "MacCtrl";
/**
 * @supported Firefox
 */
export interface _CreateCreatePropertiesIcons {
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export type _CreateCreatePropertiesCommand =
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action"
        | "_execute_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";
/**
 * @supported Firefox
 */
export interface _CreateCreateProperties {
    type?: ItemType | undefined;
    id?: string | undefined;
    icons?: _CreateCreatePropertiesIcons | undefined;
    title?: string | undefined;
    checked?: boolean | undefined;
    contexts?: ContextType[] | undefined;
    viewTypes?: extension.ViewType[] | undefined;
    visible?: boolean | undefined;
    onclick?: (info: OnClickData, tab: tabs.Tab) => void | undefined;
    parentId?: number | string | undefined;
    documentUrlPatterns?: string[] | undefined;
    targetUrlPatterns?: string[] | undefined;
    enabled?: boolean | undefined;
    command?: string | _CreateCreatePropertiesCommand | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdatePropertiesIcons {
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    type?: ItemType | undefined;
    icons?: _UpdateUpdatePropertiesIcons | undefined;
    title?: string | undefined;
    checked?: boolean | undefined;
    contexts?: ContextType[] | undefined;
    viewTypes?: extension.ViewType[] | undefined;
    visible?: boolean | undefined;
    onclick?: (info: OnClickData, tab: tabs.Tab) => void | undefined;
    parentId?: number | string | undefined;
    documentUrlPatterns?: string[] | undefined;
    targetUrlPatterns?: string[] | undefined;
    enabled?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type _OverrideContextContextOptionsContext = "bookmark" | "tab";
/**
 * @supported Firefox
 */
export interface _OverrideContextContextOptions {
    showDefaults?: boolean | undefined;
    context?: _OverrideContextContextOptionsContext | undefined;
    bookmarkId?: string | undefined;
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnShownInfo {
    menuIds: Array<number | string>;
    contexts: ContextType[];
    viewType?: extension.ViewType | undefined;
    editable: boolean;
    mediaType?: string | undefined;
    linkUrl?: string | undefined;
    linkText?: string | undefined;
    srcUrl?: string | undefined;
    pageUrl?: string | undefined;
    frameUrl?: string | undefined;
    selectionText?: string | undefined;
    targetElementId?: number | undefined;
}
/**
 * @supported Firefox
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties, callback?: () => void): number | string;
/**
 * @supported Firefox
 */
export function update(id: number | string, updateProperties: _UpdateUpdateProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function remove(menuItemId: number | string): Promise<void>;
/**
 * @supported Firefox
 */
export function removeAll(): Promise<void>;
/**
 * @supported Firefox
 */
export function overrideContext(contextOptions: _OverrideContextContextOptions): void;
/**
 * @supported Firefox
 */
export function refresh(): Promise<void>;
/**
 * @supported Firefox
 */
export function getTargetElement(targetElementId: number): Element | void;
/**
 * @supported Firefox
 */
export const onClicked: WebExtEvent<(info: OnClickData, tab?: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export const onShown: WebExtEvent<(info: _OnShownInfo, tab: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export const onHidden: WebExtEvent<() => void>;

}

export namespace normandyAddonStudy {
/**
 * @supported Firefox
 */
export interface Study {
    recipeId: number;
    slug: string;
    userFacingName: string;
    userFacingDescription: string;
    branch: string;
    active: boolean;
    addonId: string;
    addonUrl: string;
    addonVersion: string;
    studyStartDate: string;
    studyEndDate: string;
    extensionApiId: number;
    extensionHash: string;
    extensionHashAlgorithm: string;
}
/**
 * @supported Firefox
 */
export function getStudy(): Promise<Study | null>;
/**
 * @supported Firefox
 */
export function endStudy(reason: string): Promise<void>;
/**
 * @supported Firefox
 */
export function getClientMetadata(): Promise<Record<string, unknown>>;
/**
 * @supported Firefox
 */
export const onUnenroll: events.Event<(reason: string) => void>;

}

export namespace pkcs11 {
/**
 * @supported Firefox
 */
export function isModuleInstalled(name: string): Promise<boolean>;
/**
 * @supported Firefox
 */
export function installModule(name: string, flags?: number): Promise<void>;
/**
 * @supported Firefox
 */
export function uninstallModule(name: string): Promise<void>;
/**
 * @supported Firefox
 */
export function getModuleSlots(name: string): Promise<{
        name: string;
        token?: {
            name: string;
            manufacturer: string;
            HWVersion: string;
            FWVersion: string;
            serial: string;
            isLoggedIn: string;
        };
    }>;

}

export namespace sidebarAction {
/**
 * @supported Firefox
 */
export type ImageDataType = ImageData;
/**
 * @supported Firefox
 */
export interface _SetTitleDetails {
    title: string | null;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetTitleDetails {
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails {
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    path?: string | { [key: string]: string } | undefined;
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPanelDetails {
    tabId?: number | undefined;
    windowId?: number | undefined;
    panel: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetPanelDetails {
    tabId?: number | undefined;
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _IsOpenDetails {
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export function setTitle(details: _SetTitleDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getTitle(details: _GetTitleDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPanel(details: _SetPanelDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getPanel(details: _GetPanelDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function open(): Promise<void>;
/**
 * @supported Firefox
 */
export function close(): Promise<void>;
/**
 * @supported Firefox
 */
export function toggle(): Promise<void>;
/**
 * @supported Firefox
 */
export function isOpen(details: _IsOpenDetails): Promise<boolean>;

}

export namespace urlbar {
/**
 * @supported Firefox
 */
export type EngagementState =
        | "start"
        | "engagement"
        | "abandonment"
        | "discard";
/**
 * @supported Firefox
 */
export interface Query {
    isPrivate: boolean;
    maxResults: number;
    searchString: string;
    sources: SourceType[];
}
/**
 * @supported Firefox
 */
export interface Result {
    payload: object;
    source: SourceType;
    type: ResultType;
    suggestedIndex?: number | undefined;
}
/**
 * @supported Firefox
 */
export type ResultType =
        | "dynamic"
        | "remote_tab"
        | "search"
        | "tab"
        | "tip"
        | "url";
/**
 * @supported Firefox
 */
export interface SearchOptions {
    focus?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export type SourceType =
        | "bookmarks"
        | "history"
        | "local"
        | "network"
        | "search"
        | "tabs";
/**
 * @supported Firefox
 */
export interface _UrlbarOnBehaviorRequestedEvent<TCallback = (query: Query) => "active" | "inactive" | "restricting"> {
    addListener(cb: TCallback, providerName: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnEngagementEvent<TCallback = (state: EngagementState) => void> {
    addListener(cb: TCallback, providerName: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnQueryCanceledEvent<TCallback = (query: Query) => void> {
    addListener(cb: TCallback, providerName: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnResultsRequestedEvent<TCallback = (query: Query) => Result[]> {
    addListener(cb: TCallback, providerName: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnResultPickedEvent<TCallback = (payload: object, elementName: string) => void> {
    addListener(cb: TCallback, providerName: string): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export const engagementTelemetry: types.Setting;
/**
 * @supported Firefox
 */
export function closeView(): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export function focus(select?: boolean): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export function search(searchString: string, options?: SearchOptions): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export const onBehaviorRequested: _UrlbarOnBehaviorRequestedEvent;
/**
 * @supported Firefox
 */
export const onEngagement: _UrlbarOnEngagementEvent;
/**
 * @supported Firefox
 */
export const onQueryCanceled: _UrlbarOnQueryCanceledEvent;
/**
 * @supported Firefox
 */
export const onResultsRequested: _UrlbarOnResultsRequestedEvent;
/**
 * @supported Firefox
 */
export const onResultPicked: _UrlbarOnResultPickedEvent;

}
}

declare namespace browser {
  export import _manifest = chrome._manifest;
  export import action = chrome.action;
  export import activityLog = chrome.activityLog;
  export import alarms = chrome.alarms;
  export import bookmarks = chrome.bookmarks;
  export import browserAction = chrome.browserAction;
  export import browserSettings = chrome.browserSettings;
  export import browsingData = chrome.browsingData;
  export import captivePortal = chrome.captivePortal;
  export import clipboard = chrome.clipboard;
  export import commands = chrome.commands;
  export import contentScripts = chrome.contentScripts;
  export import contextMenus = chrome.contextMenus;
  export import contextualIdentities = chrome.contextualIdentities;
  export import cookies = chrome.cookies;
  export import declarativeNetRequest = chrome.declarativeNetRequest;
  export import devtools = chrome.devtools;
  export import dns = chrome.dns;
  export import downloads = chrome.downloads;
  export import events = chrome.events;
  export import experiments = chrome.experiments;
  export import extension = chrome.extension;
  export import extensionTypes = chrome.extensionTypes;
  export import find = chrome.find;
  export import geckoProfiler = chrome.geckoProfiler;
  export import history = chrome.history;
  export import i18n = chrome.i18n;
  export import identity = chrome.identity;
  export import idle = chrome.idle;
  export import management = chrome.management;
  export import menus = chrome.menus;
  export import networkStatus = chrome.networkStatus;
  export import normandyAddonStudy = chrome.normandyAddonStudy;
  export import notifications = chrome.notifications;
  export import omnibox = chrome.omnibox;
  export import pageAction = chrome.pageAction;
  export import permissions = chrome.permissions;
  export import pkcs11 = chrome.pkcs11;
  export import privacy = chrome.privacy;
  export import proxy = chrome.proxy;
  export import runtime = chrome.runtime;
  export import scripting = chrome.scripting;
  export import search = chrome.search;
  export import sessions = chrome.sessions;
  export import sidebarAction = chrome.sidebarAction;
  export import storage = chrome.storage;
  export import tabGroups = chrome.tabGroups;
  export import tabs = chrome.tabs;
  export import telemetry = chrome.telemetry;
  export import theme = chrome.theme;
  export import topSites = chrome.topSites;
  export import types = chrome.types;
  export import urlbar = chrome.urlbar;
  export import userScripts = chrome.userScripts;
  export import webNavigation = chrome.webNavigation;
  export import webRequest = chrome.webRequest;
  export import windows = chrome.windows;
}
