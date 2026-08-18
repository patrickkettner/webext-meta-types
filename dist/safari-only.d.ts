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
 * @supported Safari
 */
export const onClicked: events.Event<(tab: tabs.Tab) => void>;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getTitle(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getPopup(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getBadgeText(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getBadgeText(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getBadgeText(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(details: action.ActionDetails, callback: (result: number[]) => void): void;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(callback: (result: number[]) => void): void;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(details?: action.ActionDetails): Promise<number[]>;
/**
 * @supported Safari
 */
export function enable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function disable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function isEnabled(details: action.ActionDetails, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isEnabled(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isEnabled(details?: action.ActionDetails): Promise<boolean>;
/**
 * @supported Safari
 */
export function openPopup(options: action.ActionDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(options?: action.ActionDetails): Promise<void>;
/**
 * @supported Safari
 */
export interface ActionDetails {
    tabId?: number;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionOpenPopupOptions {
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionSetBadgeBackgroundColorDetails {
    color?: unknown;
    tabId?: number;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionSetBadgeTextDetails {
    tabId?: number;
    text?: string;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionSetIconDetails {
    imageData?: unknown;
    path?: unknown;
    tabId?: number;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionSetPopupDetails {
    popup?: string;
    tabId?: number;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface ActionSetTitleDetails {
    tabId?: number;
    title?: string;
    windowId?: number;
}

}

export namespace alarms {
/**
 * @supported Safari
 */
export interface Alarm {
    name?: string;
    periodInMinutes?: number;
    scheduledTime?: number;
}
/**
 * @supported Safari
 */
export interface AlarmCreateInfo {
    delayInMinutes?: number;
    name?: string;
    periodInMinutes?: number;
    when?: number;
}
/**
 * @supported Safari
 */
export const onAlarm: events.Event<(alarm: alarms.Alarm) => void>;
/**
 * @supported Safari
 */
export function create(name: string, info: { name?: string; when?: number; delayInMinutes?: number; periodInMinutes?: number }, callback: () => void): void;
/**
 * @supported Safari
 */
export function create(name: string, info: { name?: string; when?: number; delayInMinutes?: number; periodInMinutes?: number }): Promise<void>;
/**
 * @supported Safari
 */
export function create(info: { name?: string; when?: number; delayInMinutes?: number; periodInMinutes?: number }, callback: () => void): void;
/**
 * @supported Safari
 */
export function create(info: { name?: string; when?: number; delayInMinutes?: number; periodInMinutes?: number }): Promise<void>;
/**
 * @supported Safari
 */
export function get(name: string, callback: (result: alarms.Alarm | undefined) => void): void;
/**
 * @supported Safari
 */
export function get(callback: (result: alarms.Alarm | undefined) => void): void;
/**
 * @supported Safari
 */
export function get(name?: string): Promise<alarms.Alarm | undefined>;
/**
 * @supported Safari
 */
export function getAll(callback: (result: alarms.Alarm[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<alarms.Alarm[]>;
/**
 * @supported Safari
 */
export function clear(name: string, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function clear(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function clear(name?: string): Promise<boolean>;
/**
 * @supported Safari
 */
export function clearAll(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function clearAll(): Promise<boolean>;

}

export namespace commands {
/**
 * @supported Safari
 */
export interface Command {
    description?: string;
    name?: string;
    shortcut?: string;
}
/**
 * @supported Safari
 */
export const onCommand: events.Event<(command: string) => void>;
/**
 * @supported Safari
 */
export function getAll(callback: (result: commands.Command[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<commands.Command[]>;
/**
 * @supported Safari
 */
export const onChanged: events.Event<(changeInfo: { name: string; oldShortcut: string; newShortcut: string }) => void>;

}

export namespace contextMenus {
/**
 * @supported Safari
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Safari
 */
export const onClicked: events.Event<(info: { menuItemId: number | string; parentMenuItemId?: number | string; checked?: boolean; wasChecked?: boolean; selectionText?: string; srcUrl?: string; mediaType?: "audio" | "image" | "video"; linkUrl?: string; linkText?: string; editable?: boolean; frameId?: number; pageUrl?: string; frameUrl?: string }, tab?: tabs.Tab) => void>;
/**
 * @supported Safari
 */
export function create(createProperties: menus.MenuItemProperties, callback?: () => void): number | string;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties, callback: () => void): void;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties): Promise<void>;
/**
 * @supported Safari
 */
export function remove(identifier: number | string, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(identifier: number | string): Promise<void>;
/**
 * @supported Safari
 */
export function removeAll(callback: () => void): void;
/**
 * @supported Safari
 */
export function removeAll(): Promise<void>;

}

export namespace cookies {
/**
 * @supported Safari
 */
export interface Cookie {
    domain?: string;
    expirationDate?: number;
    hostOnly?: boolean;
    httpOnly?: boolean;
    name?: string;
    path?: string;
    sameSite?: cookies.CookieSameSiteStatus;
    secure?: boolean;
    session?: boolean;
    storeId?: string;
    value?: string;
}
/**
 * @supported Safari
 */
export interface CookieStore {
    id: string;
    tabIds: number[];
    incognito: boolean;
}
/**
 * @supported Safari
 */
export interface CookieDetails {
    name?: string;
    storeId?: string;
    url?: string;
}
/**
 * @supported Safari
 */
export const onChanged: events.Event<(...args: unknown[]) => void>;
/**
 * @supported Safari
 */
export function get(details: { name: string; url: string; storeId?: string }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function get(details: { name: string; url: string; storeId?: string }): Promise<cookies.Cookie | null>;
/**
 * @supported Safari
 */
export function getAll(details: { name?: string; url?: string; storeId?: string; domain?: string; path?: string; secure?: boolean; session?: boolean }, callback: (result: cookies.Cookie[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(details: { name?: string; url?: string; storeId?: string; domain?: string; path?: string; secure?: boolean; session?: boolean }): Promise<cookies.Cookie[]>;
/**
 * @supported Safari
 */
export function set(details: { url: string; name?: string; storeId?: string; domain?: string; path?: string; value?: string; expirationDate?: number; httpOnly?: boolean; secure?: boolean; sameSite?: cookies.CookieSameSiteStatus }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function set(details: { url: string; name?: string; storeId?: string; domain?: string; path?: string; value?: string; expirationDate?: number; httpOnly?: boolean; secure?: boolean; sameSite?: cookies.CookieSameSiteStatus }): Promise<cookies.Cookie | null>;
/**
 * @supported Safari
 */
export function remove(details: { name: string; url: string; storeId?: string }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function remove(details: { name: string; url: string; storeId?: string }): Promise<cookies.Cookie | null>;
/**
 * @supported Safari
 */
export function getAllCookieStores(callback: (result: cookies.CookieStore[]) => void): void;
/**
 * @supported Safari
 */
export function getAllCookieStores(): Promise<cookies.CookieStore[]>;
/**
 * @supported Safari
 */
export type CookieSameSiteStatus = "no_restriction" | "lax" | "strict";
/**
 * @supported Safari
 */
export interface CookieGetAllDetails {
    domain?: string;
    name?: string;
    path?: string;
    secure?: boolean;
    session?: boolean;
    storeId?: string;
    url?: string;
}
/**
 * @supported Safari
 */
export interface CookieSetDetails {
    domain?: string;
    expirationDate?: number;
    httpOnly?: boolean;
    name?: string;
    path?: string;
    sameSite?: string;
    secure?: boolean;
    storeId?: string;
    url?: string;
    value?: string;
}

}

export namespace declarativeNetRequest {
/**
 * @supported Safari
 */
export const MAX_NUMBER_OF_STATIC_RULESETS: number;
/**
 * @supported Safari
 */
export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: number;
/**
 * @supported Safari
 */
export function updateDynamicRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateDynamicRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }): Promise<void>;
/**
 * @supported Safari
 */
export function getDynamicRules(filter: unknown, callback: (result: Record<string, unknown>[]) => void): void;
/**
 * @supported Safari
 */
export function getDynamicRules(callback: (result: Record<string, unknown>[]) => void): void;
/**
 * @supported Safari
 */
export function getDynamicRules(filter?: unknown): Promise<Record<string, unknown>[]>;
/**
 * @supported Safari
 */
export function updateSessionRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateSessionRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }): Promise<void>;
/**
 * @supported Safari
 */
export function getSessionRules(filter: unknown, callback: (result: Record<string, unknown>[]) => void): void;
/**
 * @supported Safari
 */
export function getSessionRules(callback: (result: Record<string, unknown>[]) => void): void;
/**
 * @supported Safari
 */
export function getSessionRules(filter?: unknown): Promise<Record<string, unknown>[]>;
/**
 * @supported Safari
 */
export function updateEnabledRulesets(options: { enableRulesetIds?: string[]; disableRulesetIds?: string[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateEnabledRulesets(options: { enableRulesetIds?: string[]; disableRulesetIds?: string[] }): Promise<void>;
/**
 * @supported Safari
 */
export function getEnabledRulesets(callback: (result: string[]) => void): void;
/**
 * @supported Safari
 */
export function getEnabledRulesets(): Promise<string[]>;
/**
 * @supported Safari
 */
export function getMatchedRules(filter: declarativeNetRequest.DNRMatchedRulesFilter, callback: (result: { rulesMatchedInfo: declarativeNetRequest.DNRMatchedRule[] }) => void): void;
/**
 * @supported Safari
 */
export function getMatchedRules(callback: (result: { rulesMatchedInfo: declarativeNetRequest.DNRMatchedRule[] }) => void): void;
/**
 * @supported Safari
 */
export function getMatchedRules(filter?: declarativeNetRequest.DNRMatchedRulesFilter): Promise<{ rulesMatchedInfo: declarativeNetRequest.DNRMatchedRule[] }>;
/**
 * @supported Safari
 */
export function setExtensionActionOptions(options: { displayActionCountAsBadgeText?: boolean; tabUpdate?: { tabId: number; increment: number } }, callback: () => void): void;
/**
 * @supported Safari
 */
export function setExtensionActionOptions(options: { displayActionCountAsBadgeText?: boolean; tabUpdate?: { tabId: number; increment: number } }): Promise<void>;
/**
 * @supported Safari
 */
export function isRegexSupported(regexOptions: { regex: string; isCaseSensitive?: boolean; requireCapturing?: boolean }, callback: (result: { isSupported: boolean; reason?: string }) => void): void;
/**
 * @supported Safari
 */
export function isRegexSupported(regexOptions: { regex: string; isCaseSensitive?: boolean; requireCapturing?: boolean }): Promise<{ isSupported: boolean; reason?: string }>;
/**
 * @supported Safari
 */
export const MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: number;
/**
 * @supported Safari
 */
export interface DNRMatchedRule {
    ruleId?: number;
    rulesetId?: string;
}
/**
 * @supported Safari
 */
export interface DNRMatchedRulesFilter {
    minTimeStamp?: number;
    tabId?: number;
}
/**
 * @supported Safari
 */
export interface DNRTabUpdateOptions {
    count?: number;
    tabId?: number;
}
/**
 * @supported Safari
 */
export interface DNRUpdateRuleOptions {
    disableRulesetIds?: string[];
    enableRulesetIds?: string[];
}

}

export namespace devtools.inspectedWindow {
/**
 * @supported Safari
 */
export const tabId: number;
/**
 * @supported Safari
 */
export function reload(reloadOptions?: devtools.inspectedWindow.DevToolsReloadOptions): void;
/**
 * @supported Safari
 */
export function eval<T = unknown>(expression: string, options?: devtools.inspectedWindow.DevToolsEvalOptions, callback?: (...args: unknown[]) => void): Promise<T>;
/**
 * @supported Safari
 */
export interface DevToolsEvalOptions {
    frameURL?: string;
}
/**
 * @supported Safari
 */
export interface DevToolsReloadOptions {
    ignoreCache?: boolean;
}

}

export namespace devtools.network {
/**
 * @supported Safari
 */
export const onNavigated: events.Event<(url: string) => void>;

}

export namespace devtools.panels {
/**
 * @supported Safari
 */
export const themeName: string;
/**
 * @supported Safari
 */
export function create(title: string, iconPath: string, pagePath: string, callback?: (panel: Record<string, unknown>) => void): void;
/**
 * @supported Safari
 */
export const onThemeChanged: events.Event<(themeName: string) => void>;

}

export namespace dom {
/**
 * @supported Safari
 */
export function openOrClosedShadowRoot(element: unknown): unknown;

}

export namespace events {
/**
 * @supported Safari
 */
export interface Event<T extends (...args: never[]) => void> {
    addListener(callback: T): void;
    removeListener(callback: T): void;
    hasListener(callback: T): boolean;
}
/**
 * @supported Safari
 */
export interface WebRequestEvent<T extends (...args: never[]) => void> extends Event<T> {
    addListener(callback: T, filter?: webRequest.WebRequestFilter, extraInfoSpec?: string[]): void;
}

}

export namespace extension {
/**
 * @supported Safari
 */
export const inIncognitoContext: boolean;
/**
 * @supported Safari
 */
export function getViews(fetchProperties?: extension.ViewFilter): globalThis.Window[];
/**
 * @supported Safari
 */
export function getBackgroundPage(): globalThis.Window | null;
/**
 * @supported Safari
 */
export function isAllowedIncognitoAccess(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isAllowedIncognitoAccess(): Promise<boolean>;
/**
 * @supported Safari
 */
export function isAllowedFileSchemeAccess(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isAllowedFileSchemeAccess(): Promise<boolean>;
/**
 * @supported Safari
 */
export function getURL(resourcePath: string): string;
/**
 * @supported Safari
 */
export interface ViewFilter {
    tabId?: number;
    type?: string;
    windowId?: number;
}

}

export namespace i18n {
/**
 * @supported Safari
 */
export function getAcceptLanguages(callback: (result: string[]) => void): void;
/**
 * @supported Safari
 */
export function getAcceptLanguages(): Promise<string[]>;
/**
 * @supported Safari
 */
export function getMessage(name: string, substitutions?: string | string[]): string;
/**
 * @supported Safari
 */
export function getUILanguage(): string;
/**
 * @supported Safari
 */
export function getPreferredSystemLanguages(callback: (result: string[]) => void): void;
/**
 * @supported Safari
 */
export function getPreferredSystemLanguages(): Promise<string[]>;
/**
 * @supported Safari
 */
export function getSystemUILanguage(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getSystemUILanguage(): Promise<string>;
/**
 * @supported Safari
 */
export interface LanguageDetectionResult {
    isReliable?: boolean;
    languages?: unknown[];
}

}

export namespace permissions {
/**
 * @supported Safari
 */
export interface Permissions {
    origins?: string[];
    permissions?: string[];
}
/**
 * @supported Safari
 */
export const onAdded: events.Event<(permissions: permissions.Permissions) => void>;
/**
 * @supported Safari
 */
export const onRemoved: events.Event<(permissions: permissions.Permissions) => void>;
/**
 * @supported Safari
 */
export function getAll(callback: (result: permissions.Permissions) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<permissions.Permissions>;
/**
 * @supported Safari
 */
export function contains(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function contains(permissions: permissions.Permissions): Promise<boolean>;
/**
 * @supported Safari
 */
export function request(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function request(permissions: permissions.Permissions): Promise<boolean>;
/**
 * @supported Safari
 */
export function remove(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function remove(permissions: permissions.Permissions): Promise<boolean>;

}

export namespace runtime {
/**
 * @supported Safari
 */
export interface Port {
    name: string;
    sender?: runtime.MessageSender;
    error?: Error;
    onDisconnect: events.Event<(port: Port) => void>;
    onMessage: events.Event<(message: unknown, port: Port) => void>;
    postMessage<T = unknown>(message: T): void;
    disconnect(): void;
}
/**
 * @supported Safari
 */
export interface MessageSender {
    frameId?: number;
    id?: string;
    tab?: tabs.Tab;
    tlsChannelId?: string;
    url?: string;
}
/**
 * @supported Safari
 */
export interface PlatformInfo {
    os: "mac" | "ios" | "unknown";
    arch: "arm" | "x86-64" | "unknown";
}
/**
 * @supported Safari
 */
export const id: string;
/**
 * @supported Safari
 */
export const onStartup: events.Event<() => void>;
/**
 * @supported Safari
 */
export const onInstalled: events.Event<(details: { reason: "install" | "update" | "browser_update"; previousVersion?: string }) => void>;
/**
 * @supported Safari
 */
export const onConnect: events.Event<(port: runtime.Port) => void>;
/**
 * @supported Safari
 */
export const onConnectExternal: events.Event<(port: runtime.Port) => void>;
/**
 * @supported Safari
 */
export const onMessage: events.Event<(message: unknown, sender: runtime.MessageSender, sendResponse: (response?: unknown) => void) => boolean | void | Promise<unknown>>;
/**
 * @supported Safari
 */
export const onMessageExternal: events.Event<(message: unknown, sender: runtime.MessageSender, sendResponse: (response?: unknown) => void) => boolean | void | Promise<unknown>>;
/**
 * @supported Safari
 */
export function getBackgroundPage(callback: (result: globalThis.Window | null) => void): void;
/**
 * @supported Safari
 */
export function getBackgroundPage(): Promise<globalThis.Window | null>;
/**
 * @supported Safari
 */
export function openOptionsPage(callback: () => void): void;
/**
 * @supported Safari
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Safari
 */
export function getManifest(): Record<string, unknown>;
/**
 * @supported Safari
 */
export function getVersion(): string;
/**
 * @supported Safari
 */
export function getURL(resourcePath: string): string;
/**
 * @supported Safari
 */
export function setUninstallURL(url: string, callback: () => void): void;
/**
 * @supported Safari
 */
export function setUninstallURL(url: string): Promise<void>;
/**
 * @supported Safari
 */
export function reload(): void;
/**
 * @supported Safari
 */
export function connect(connectInfo?: runtime.ConnectOptions): runtime.Port;
/**
 * @supported Safari
 */
export function connect(extensionId: string, connectInfo?: runtime.ConnectOptions): runtime.Port;
/**
 * @supported Safari
 */
export function connectNative(applicationID?: string): runtime.Port;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(extensionID: string, message: T, options: runtime.MessageOptions, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(extensionID: string, message: T, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(extensionID: string, message: T, options?: runtime.MessageOptions): Promise<R>;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(message: T, options: runtime.MessageOptions, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(message: T, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(message: T, options?: runtime.MessageOptions): Promise<R>;
/**
 * @supported Safari
 */
export function sendNativeMessage<T = unknown, R = unknown>(applicationID: string, message: T, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendNativeMessage<T = unknown, R = unknown>(applicationID: string, message: T): Promise<R>;
/**
 * @supported Safari
 */
export function getPlatformInfo(callback: (result: runtime.PlatformInfo) => void): void;
/**
 * @supported Safari
 */
export function getPlatformInfo(): Promise<runtime.PlatformInfo>;
/**
 * @supported Safari
 */
export const lastError: Error | undefined;
/**
 * @supported Safari
 */
export function getFrameId(target: globalThis.Window | globalThis.HTMLIFrameElement | globalThis.HTMLFrameElement): number;
/**
 * @supported Safari
 */
export function getDocumentId(target: globalThis.Window | globalThis.HTMLIFrameElement | globalThis.HTMLFrameElement): string;
/**
 * @supported Safari
 */
export type PortDisconnectReason = "disconnect" | "connection_error";
/**
 * @supported Safari
 */
export interface ConnectOptions {
    name?: string;
}
/**
 * @supported Safari
 */
export interface MessageOptions {
    includeTlsChannelId?: boolean;
}
/**
 * @supported Safari
 */
export interface SendMessageOptions {
    includeTlsChannelId?: boolean;
}

}

export namespace scripting {
/**
 * @supported Safari
 */
export const ExecutionWorld: { readonly ISOLATED: "ISOLATED"; readonly MAIN: "MAIN" };
/**
 * @supported Safari
 */
export interface InjectionTarget {
    tabId: number;
    allFrames?: boolean;
    documentIds?: string[];
    frameIds?: number[];
}
/**
 * @supported Safari
 */
export interface ScriptInjection {
    args?: unknown[];
    files?: string[];
    func?: unknown;
    target: scripting.ScriptInjectionTarget;
    world?: string;
}
/**
 * @supported Safari
 */
export interface CSSInjection {
    target: scripting.ScriptInjectionTarget;
    css?: string;
    files?: string[];
    origin?: string;
}
/**
 * @supported Safari
 */
export interface InjectionResult<T = unknown> {
    documentId?: string;
    frameId?: number;
    result: T | null;
    error?: string;
}
/**
 * @supported Safari
 */
export interface RegisteredContentScript {
    id: string;
    matches: string[];
    persistAcrossSessions?: boolean;
    css?: string[];
    js?: string[];
    excludeMatches?: string[];
    allFrames?: boolean;
    matchOriginAsFallback?: boolean;
    runAt?: "document_start" | "document_end" | "document_idle";
    cssOrigin?: "author" | "user";
    world?: "main" | "isolated" | "MAIN" | "ISOLATED";
}
/**
 * @supported Safari
 */
export function executeScript(details: scripting.ScriptInjection, callback: (result: scripting.InjectionResult[]) => void): void;
/**
 * @supported Safari
 */
export function executeScript(details: scripting.ScriptInjection): Promise<scripting.InjectionResult[]>;
/**
 * @supported Safari
 */
export function insertCSS(details: scripting.CSSInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function insertCSS(details: scripting.CSSInjection): Promise<void>;
/**
 * @supported Safari
 */
export function removeCSS(details: scripting.CSSInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function removeCSS(details: scripting.CSSInjection): Promise<void>;
/**
 * @supported Safari
 */
export function registerContentScripts(scripts: scripting.RegisteredContentScript[], callback: () => void): void;
/**
 * @supported Safari
 */
export function registerContentScripts(scripts: scripting.RegisteredContentScript[]): Promise<void>;
/**
 * @supported Safari
 */
export function getRegisteredContentScripts(filter: unknown, callback: (result: scripting.RegisteredContentScript[]) => void): void;
/**
 * @supported Safari
 */
export function getRegisteredContentScripts(callback: (result: scripting.RegisteredContentScript[]) => void): void;
/**
 * @supported Safari
 */
export function getRegisteredContentScripts(filter?: unknown): Promise<scripting.RegisteredContentScript[]>;
/**
 * @supported Safari
 */
export function unregisterContentScripts(filter: unknown, callback: () => void): void;
/**
 * @supported Safari
 */
export function unregisterContentScripts(callback: () => void): void;
/**
 * @supported Safari
 */
export function unregisterContentScripts(filter?: unknown): Promise<void>;
/**
 * @supported Safari
 */
export function updateContentScripts(scripts: scripting.RegisteredContentScript[], callback: () => void): void;
/**
 * @supported Safari
 */
export function updateContentScripts(scripts: scripting.RegisteredContentScript[]): Promise<void>;
/**
 * @supported Safari
 */
export type CSSOrigin = "USER" | "AUTHOR";
/**
 * @supported Safari
 */
export type ScriptInjectionExecutionWorld = "ISOLATED" | "MAIN";
/**
 * @supported Safari
 */
export interface ScriptInjectionTarget {
    allFrames?: boolean;
    documentIds?: string[];
    frameIds?: number[];
    tabId: number;
}

}

export namespace storage {
/**
 * @supported Safari
 */
export interface StorageChange {
    newValue?: unknown;
    oldValue?: unknown;
}
/**
 * @supported Safari
 */
export interface StorageArea {
    onChanged: events.Event<(changes: Record<string, storage.StorageChange>, areaName: string) => void>;
    QUOTA_BYTES: number;
    get<T = Record<string, unknown>>(callback: (items: T) => void): void;
    get<T = Record<string, unknown>>(keys?: string | string[] | Record<string, unknown> | null): Promise<T>;
    get<T = Record<string, unknown>>(keys: string | string[] | Record<string, unknown> | null, callback: (items: T) => void): void;
    getKeys(callback: (keys: string[]) => void): void;
    getKeys(): Promise<string[]>;
    getBytesInUse(callback: (bytesInUse: number) => void): void;
    getBytesInUse(keys?: string | string[] | null): Promise<number>;
    getBytesInUse(keys: string | string[] | null, callback: (bytesInUse: number) => void): void;
    set(items: Record<string, unknown>): Promise<void>;
    set(items: Record<string, unknown>, callback: () => void): void;
    remove(keys: string | string[]): Promise<void>;
    remove(keys: string | string[], callback: () => void): void;
    clear(): Promise<void>;
    clear(callback: () => void): void;
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }): Promise<void>;
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }, callback: () => void): void;
}
/**
 * @supported Safari
 */
export const sync: storage.SyncStorageArea;
/**
 * @supported Safari
 */
export const local: storage.StorageArea;
/**
 * @supported Safari
 */
export const session: storage.StorageArea;
/**
 * @supported Safari
 */
export const onChanged: events.Event<(changes: Record<string, storage.StorageChange>, areaName: string) => void>;
/**
 * @supported Safari
 */
export interface SyncStorageArea extends StorageArea {
    QUOTA_BYTES_PER_ITEM: number;
    MAX_ITEMS: number;
    MAX_WRITE_OPERATIONS_PER_HOUR: number;
    MAX_WRITE_OPERATIONS_PER_MINUTE: number;
}
/**
 * @supported Safari
 */
export interface StorageAccessOptions {
    accessLevel?: string;
}

}

export namespace tabs {
/**
 * @supported Safari
 */
export type TabStatus = "loading" | "complete";
/**
 * @supported Safari
 */
export interface Tab {
    active?: boolean;
    audible?: boolean;
    height?: number;
    highlighted?: boolean;
    id?: number;
    incognito?: boolean;
    index?: number;
    isArticle?: boolean;
    isInReaderMode?: boolean;
    mutedInfo?: tabs.TabMutedInfo;
    openerTabId?: number;
    pinned?: boolean;
    selected?: boolean;
    status?: tabs.TabStatus;
    title?: string;
    url?: string;
    width?: number;
    windowId?: number;
}
/**
 * @supported Safari
 */
export const TAB_ID_NONE: number;
/**
 * @supported Safari
 */
export const onCreated: events.Event<(tab: tabs.Tab) => void>;
/**
 * @supported Safari
 */
export const onUpdated: events.Event<(tabId: number, changeInfo: tabs.Tab, tab: tabs.Tab) => void>;
/**
 * @supported Safari
 */
export const onMoved: events.Event<(tabId: number, moveInfo: { windowId: number; fromIndex: number; toIndex: number }) => void>;
/**
 * @supported Safari
 */
export const onActivated: events.Event<(activeInfo: { previousTabId: number; tabId: number; windowId: number }) => void>;
/**
 * @supported Safari
 */
export const onHighlighted: events.Event<(highlightInfo: { windowId: number; tabIds: number[] }) => void>;
/**
 * @supported Safari
 */
export const onDetached: events.Event<(tabId: number, detachInfo: { oldWindowId: number; oldPosition: number }) => void>;
/**
 * @supported Safari
 */
export const onAttached: events.Event<(tabId: number, attachInfo: { newWindowId: number; newPosition: number }) => void>;
/**
 * @supported Safari
 */
export const onRemoved: events.Event<(tabId: number, removeInfo: { windowId: number; isWindowClosing: boolean }) => void>;
/**
 * @supported Safari
 */
export const onReplaced: events.Event<(addedTabId: number, removedTabId: number) => void>;
/**
 * @supported Safari
 */
export function get(tabID: number, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function get(tabID: number): Promise<tabs.Tab>;
/**
 * @supported Safari
 */
export function getCurrent(callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function getCurrent(): Promise<tabs.Tab | undefined>;
/**
 * @supported Safari
 */
export function connect(tabID: number, options?: { frameId?: number; documentId?: string; name?: string }): runtime.Port;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(tabID: number, message: T, options: runtime.MessageOptions, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(tabID: number, message: T, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendMessage<T = unknown, R = unknown>(tabID: number, message: T, options?: runtime.MessageOptions): Promise<R>;
/**
 * @supported Safari
 */
export function create(properties: tabs.TabUpdateOptions & { index?: number; openInReaderMode?: boolean; title?: string; windowId?: number }, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function create(properties: tabs.TabUpdateOptions & { index?: number; openInReaderMode?: boolean; title?: string; windowId?: number }): Promise<tabs.Tab>;
/**
 * @supported Safari
 */
export function duplicate(tabID: number, properties: { active?: boolean; index?: number }, callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function duplicate(tabID: number, callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function duplicate(tabID: number, properties?: { active?: boolean; index?: number }): Promise<tabs.Tab | undefined>;
/**
 * @supported Safari
 */
export function query(info: tabs.TabQueryOptions, callback: (result: tabs.Tab[]) => void): void;
/**
 * @supported Safari
 */
export function query(info: tabs.TabQueryOptions): Promise<tabs.Tab[]>;
/**
 * @supported Safari
 */
export function update(tabID: number, properties: tabs.TabUpdateOptions, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function update(tabID: number, properties: tabs.TabUpdateOptions): Promise<tabs.Tab>;
/**
 * @supported Safari
 */
export function update(properties: tabs.TabUpdateOptions, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function update(properties: tabs.TabUpdateOptions): Promise<tabs.Tab>;
/**
 * @supported Safari
 */
export function reload(tabID: number, properties: { bypassCache?: boolean }, callback: () => void): void;
/**
 * @supported Safari
 */
export function reload(tabID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function reload(tabID: number, properties?: { bypassCache?: boolean }): Promise<void>;
/**
 * @supported Safari
 */
export function reload(properties: { bypassCache?: boolean }, callback: () => void): void;
/**
 * @supported Safari
 */
export function reload(callback: () => void): void;
/**
 * @supported Safari
 */
export function reload(properties?: { bypassCache?: boolean }): Promise<void>;
/**
 * @supported Safari
 */
export function remove(tabIDs: number | number[], callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(tabIDs: number | number[]): Promise<void>;
/**
 * @supported Safari
 */
export function detectLanguage(tabID: number, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function detectLanguage(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function detectLanguage(tabID?: number): Promise<string>;
/**
 * @supported Safari
 */
export function captureVisibleTab(windowID: number, options: { format?: string; quality?: number }, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function captureVisibleTab(windowID: number, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function captureVisibleTab(windowID: number, options?: { format?: string; quality?: number }): Promise<string>;
/**
 * @supported Safari
 */
export function captureVisibleTab(options: { format?: string; quality?: number }, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function captureVisibleTab(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function captureVisibleTab(options?: { format?: string; quality?: number }): Promise<string>;
/**
 * @supported Safari
 */
export function setZoom(tabID: number, zoomFactor: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function setZoom(tabID: number, zoomFactor: number): Promise<void>;
/**
 * @supported Safari
 */
export function setZoom(zoomFactor: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function setZoom(zoomFactor: number): Promise<void>;
/**
 * @supported Safari
 */
export function getZoom(tabID: number, callback: (result: number) => void): void;
/**
 * @supported Safari
 */
export function getZoom(callback: (result: number) => void): void;
/**
 * @supported Safari
 */
export function getZoom(tabID?: number): Promise<number>;
/**
 * @supported Safari
 */
export function goForward(tabID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function goForward(callback: () => void): void;
/**
 * @supported Safari
 */
export function goForward(tabID?: number): Promise<void>;
/**
 * @supported Safari
 */
export function goBack(tabID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function goBack(callback: () => void): void;
/**
 * @supported Safari
 */
export function goBack(tabID?: number): Promise<void>;
/**
 * @supported Safari
 */
export function toggleReaderMode(tabID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function toggleReaderMode(callback: () => void): void;
/**
 * @supported Safari
 */
export function toggleReaderMode(tabID?: number): Promise<void>;
/**
 * @supported Safari
 */
export function executeScript(tabID: number, details: tabs.TabScriptInjection, callback: (result: unknown[]) => void): void;
/**
 * @supported Safari
 */
export function executeScript(tabID: number, details: tabs.TabScriptInjection): Promise<unknown[]>;
/**
 * @supported Safari
 */
export function executeScript(details: tabs.TabScriptInjection, callback: (result: unknown[]) => void): void;
/**
 * @supported Safari
 */
export function executeScript(details: tabs.TabScriptInjection): Promise<unknown[]>;
/**
 * @supported Safari
 */
export function insertCSS(tabID: number, details: tabs.TabScriptInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function insertCSS(tabID: number, details: tabs.TabScriptInjection): Promise<void>;
/**
 * @supported Safari
 */
export function insertCSS(details: tabs.TabScriptInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function insertCSS(details: tabs.TabScriptInjection): Promise<void>;
/**
 * @supported Safari
 */
export function removeCSS(tabID: number, details: tabs.TabScriptInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function removeCSS(tabID: number, details: tabs.TabScriptInjection): Promise<void>;
/**
 * @supported Safari
 */
export function removeCSS(details: tabs.TabScriptInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function removeCSS(details: tabs.TabScriptInjection): Promise<void>;
/**
 * @supported Safari
 */
export function getSelected(windowID: number, callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function getSelected(callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function getSelected(windowID?: number): Promise<tabs.Tab | undefined>;
/**
 * @supported Safari
 */
export interface TabUpdateOptions {
    active?: boolean;
    highlighted?: boolean;
    muted?: boolean;
    openerTabId?: number;
    pinned?: boolean;
    selected?: boolean;
    url?: string;
}
/**
 * @supported Safari
 */
export interface TabQueryOptions {
    active?: boolean;
    audible?: boolean;
    currentWindow?: boolean;
    hidden?: boolean;
    highlighted?: boolean;
    index?: number;
    lastFocusedWindow?: boolean;
    muted?: boolean;
    pinned?: boolean;
    selected?: boolean;
    status?: tabs.TabStatus;
    title?: string;
    url?: string | string[];
    windowId?: number;
    windowType?: windows.WindowType;
}
/**
 * @supported Safari
 */
export interface TabScriptInjection {
    allFrames?: boolean;
    code?: string;
    documentId?: string;
    file?: string;
    frameId?: number;
    tabId?: number;
}
/**
 * @supported Safari
 */
export interface TabCreateProperties {
    active?: boolean;
    highlighted?: boolean;
    index?: number;
    muted?: boolean;
    openInReaderMode?: boolean;
    openerTabId?: number;
    pinned?: boolean;
    selected?: boolean;
    title?: string;
    url?: string;
    windowId?: number;
}
/**
 * @supported Safari
 */
export interface TabMutedInfo {
    muted?: boolean;
}

}

export namespace webNavigation {
/**
 * @supported Safari
 */
export const onBeforeNavigate: events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Safari
 */
export const onCommitted: events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Safari
 */
export const onDOMContentLoaded: events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Safari
 */
export const onCompleted: events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Safari
 */
export const onErrorOccurred: events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Safari
 */
export function getFrame(details: { tabId: number; frameId: number }, callback: (result: webNavigation.FrameDetails | null) => void): void;
/**
 * @supported Safari
 */
export function getFrame(details: { tabId: number; frameId: number }): Promise<webNavigation.FrameDetails | null>;
/**
 * @supported Safari
 */
export function getAllFrames(details: { tabId: number }, callback: (result: webNavigation.FrameDetails[]) => void): void;
/**
 * @supported Safari
 */
export function getAllFrames(details: { tabId: number }): Promise<webNavigation.FrameDetails[]>;
/**
 * @supported Safari
 */
export interface FrameDetails {
    errorOccurred: boolean;
    parentFrameId: number;
    url: string;
    frameId?: number;
    documentId?: string;
}
/**
 * @supported Safari
 */
export interface WebNavigationGetAllFramesDetails {
    tabId?: number;
}
/**
 * @supported Safari
 */
export interface WebNavigationGetFrameDetails {
    frameId?: number;
    processId?: string;
    tabId?: number;
}

}

export namespace webRequest {
/**
 * @supported Safari
 */
export const onBeforeRequest: events.WebRequestEvent<(details: webRequest.WebRequestDetails & { requestBody?: { formData?: Record<string, unknown[]>; raw?: { bytes?: unknown }[]; error?: string } }) => void>;
/**
 * @supported Safari
 */
export const onBeforeSendHeaders: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onSendHeaders: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onHeadersReceived: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onAuthRequired: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onResponseStarted: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onBeforeRedirect: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onCompleted: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export const onErrorOccurred: events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Safari
 */
export type WebRequestResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "other";
/**
 * @supported Safari
 */
export interface WebRequestDetails {
    documentId?: string;
    error?: string;
    frameId?: number;
    frameType?: string;
    initiator?: string;
    method?: string;
    parentFrameId?: number;
    proxyInfo?: string;
    redirectUrl?: string;
    requestHeaders?: unknown[];
    requestId?: string;
    responseHeaders?: unknown[];
    statusCode?: number;
    statusLine?: string;
    tabId?: number;
    timeStamp?: number;
    type?: string;
    url?: string;
}
/**
 * @supported Safari
 */
export interface WebRequestFilter {
    tabId?: number;
    types?: string[];
    urls?: string[];
    windowId?: number;
}

}

export namespace windows {
/**
 * @supported Safari
 */
export type WindowType = "normal" | "popup";
/**
 * @supported Safari
 */
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen";
/**
 * @supported Safari
 */
export interface Window {
    alwaysOnTop?: boolean;
    focused?: boolean;
    height?: number;
    id?: number;
    incognito?: boolean;
    left?: number;
    state?: windows.WindowState;
    tabs?: tabs.Tab[];
    top?: number;
    type?: windows.WindowType;
    width?: number;
}
/**
 * @supported Safari
 */
export const WINDOW_ID_NONE: number;
/**
 * @supported Safari
 */
export const WINDOW_ID_CURRENT: number;
/**
 * @supported Safari
 */
export const onCreated: events.Event<(window: windows.Window) => void>;
/**
 * @supported Safari
 */
export const onRemoved: events.Event<(windowId: number) => void>;
/**
 * @supported Safari
 */
export const onFocusChanged: events.Event<(windowId: number) => void>;
/**
 * @supported Safari
 */
export function get(windowID: number, properties: windows.WindowQueryOptions, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function get(windowID: number, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function get(windowID: number, properties?: windows.WindowQueryOptions): Promise<windows.Window>;
/**
 * @supported Safari
 */
export function getCurrent(info: windows.WindowQueryOptions, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function getCurrent(callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function getCurrent(info?: windows.WindowQueryOptions): Promise<windows.Window>;
/**
 * @supported Safari
 */
export function getLastFocused(info: windows.WindowQueryOptions, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function getLastFocused(callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function getLastFocused(info?: windows.WindowQueryOptions): Promise<windows.Window>;
/**
 * @supported Safari
 */
export function getAll(info: windows.WindowQueryOptions, callback: (result: windows.Window[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(callback: (result: windows.Window[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(info?: windows.WindowQueryOptions): Promise<windows.Window[]>;
/**
 * @supported Safari
 */
export function create(info: windows.WindowUpdateOptions & { type?: windows.WindowType; incognito?: boolean; url?: string | string[]; tabId?: number }, callback: (result: windows.Window | undefined) => void): void;
/**
 * @supported Safari
 */
export function create(callback: (result: windows.Window | undefined) => void): void;
/**
 * @supported Safari
 */
export function create(info?: windows.WindowUpdateOptions & { type?: windows.WindowType; incognito?: boolean; url?: string | string[]; tabId?: number }): Promise<windows.Window | undefined>;
/**
 * @supported Safari
 */
export function update(windowID: number, properties: windows.WindowUpdateOptions, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function update(windowID: number, properties: windows.WindowUpdateOptions): Promise<windows.Window>;
/**
 * @supported Safari
 */
export function remove(windowID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(windowID: number): Promise<void>;
/**
 * @supported Safari
 */
export interface WindowQueryOptions {
    populate?: boolean;
    windowTypes?: windows.WindowType[];
}
/**
 * @supported Safari
 */
export interface WindowUpdateOptions {
    state?: windows.WindowState;
    focused?: boolean;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}
/**
 * @supported Safari
 */
export interface WindowCreateData {
    focused?: boolean;
    height?: number;
    incognito?: boolean;
    left?: number;
    state?: string;
    tabId?: number;
    top?: number;
    type?: string;
    url?: unknown;
    width?: number;
}
/**
 * @supported Safari
 */
export interface WindowGetInfo {
    populate?: boolean;
    windowTypes?: string[];
}
/**
 * @supported Safari
 */
export interface WindowUpdateInfo {
    focused?: boolean;
    height?: number;
    left?: number;
    state?: string;
    top?: number;
    width?: number;
}

}

export namespace browserAction {
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getTitle(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getPopup(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getBadgeText(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getBadgeText(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getBadgeText(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(details: action.ActionDetails, callback: (result: number[]) => void): void;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(callback: (result: number[]) => void): void;
/**
 * @supported Safari
 */
export function getBadgeBackgroundColor(details?: action.ActionDetails): Promise<number[]>;
/**
 * @supported Safari
 */
export function enable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function disable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function isEnabled(details: action.ActionDetails, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isEnabled(callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function isEnabled(details?: action.ActionDetails): Promise<boolean>;
/**
 * @supported Safari
 */
export function openPopup(options: action.ActionDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(options?: action.ActionDetails): Promise<void>;
/**
 * @supported Safari
 */
export const onClicked: events.Event<(tab: tabs.Tab) => void>;

}

export namespace pageAction {
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getTitle(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getTitle(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
/**
 * @supported Safari
 */
export function getPopup(details: action.ActionDetails, callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(callback: (result: string) => void): void;
/**
 * @supported Safari
 */
export function getPopup(details?: action.ActionDetails): Promise<string>;
/**
 * @supported Safari
 */
export function openPopup(options: action.ActionDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(options?: action.ActionDetails): Promise<void>;
/**
 * @supported Safari
 */
export const onClicked: events.Event<(tab: tabs.Tab) => void>;

}

export namespace menus {
/**
 * @supported Safari
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Safari
 */
export function create(createProperties: menus.MenuItemProperties, callback?: () => void): number | string;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties, callback: () => void): void;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties): Promise<void>;
/**
 * @supported Safari
 */
export function remove(identifier: number | string, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(identifier: number | string): Promise<void>;
/**
 * @supported Safari
 */
export function removeAll(callback: () => void): void;
/**
 * @supported Safari
 */
export function removeAll(): Promise<void>;
/**
 * @supported Safari
 */
export const onClicked: events.Event<(info: { menuItemId: number | string; parentMenuItemId?: number | string; checked?: boolean; wasChecked?: boolean; selectionText?: string; srcUrl?: string; mediaType?: "audio" | "image" | "video"; linkUrl?: string; linkText?: string; editable?: boolean; frameId?: number; pageUrl?: string; frameUrl?: string }, tab?: tabs.Tab) => void>;
/**
 * @supported Safari
 */
export interface MenuItemUpdateProperties {
    checked?: boolean;
    command?: string;
    contexts?: string[];
    documentUrlPatterns?: string[];
    enabled?: boolean;
    icons?: string | Record<string, unknown> | null;
    iconVariants?: Record<string, unknown>[] | null;
    id?: string | number;
    onclick?: (...args: never[]) => void;
    parentId?: string | number;
    targetUrlPatterns?: string[];
    title?: string;
    type?: string;
    visible?: boolean;
}
/**
 * @supported Safari
 */
export type MenuItemContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "action" | "browser_action" | "page_action" | "tab";
/**
 * @supported Safari
 */
export type MenuItemType = "normal" | "checkbox" | "radio" | "separator";
/**
 * @supported Safari
 */
export interface MenuItemProperties {
    checked?: boolean;
    command?: string;
    contexts?: string[];
    documentUrlPatterns?: string[];
    enabled?: boolean;
    icons?: unknown;
    id?: unknown;
    onclick?: unknown;
    parentId?: unknown;
    targetUrlPatterns?: string[];
    title?: string;
    type?: menus.MenuItemType;
    visible?: boolean;
}

}
}

declare namespace browser {
  export import action = chrome.action;
  export import alarms = chrome.alarms;
  export import browserAction = chrome.browserAction;
  export import commands = chrome.commands;
  export import contextMenus = chrome.contextMenus;
  export import cookies = chrome.cookies;
  export import declarativeNetRequest = chrome.declarativeNetRequest;
  export import devtools = chrome.devtools;
  export import dom = chrome.dom;
  export import events = chrome.events;
  export import extension = chrome.extension;
  export import i18n = chrome.i18n;
  export import menus = chrome.menus;
  export import pageAction = chrome.pageAction;
  export import permissions = chrome.permissions;
  export import runtime = chrome.runtime;
  export import scripting = chrome.scripting;
  export import storage = chrome.storage;
  export import tabs = chrome.tabs;
  export import webNavigation = chrome.webNavigation;
  export import webRequest = chrome.webRequest;
  export import windows = chrome.windows;
}
