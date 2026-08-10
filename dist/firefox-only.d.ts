// Auto-generated meta-types

type _WebExtJsonPrimitive = string | number | boolean | null;
type _WebExtJsonValue = _WebExtJsonPrimitive | _WebExtJsonValue[] | { [key: string]: _WebExtJsonValue };
type _WebExtJsonObject = { [key: string]: _WebExtJsonValue };

// TODO: @types/chrome uses (...args: any[]) => void for Event. TypeScript contravariant constraint requirement (TS2344) requires any[].
type CustomChromeEvent<H extends (...args: any[]) => any> = chrome.events.Event<H>;

// TODO: @types/firefox-webext-browser uses any[] in its WebExtEvent signature. TypeScript contravariance requires any[] here to avoid TS2344.
type WebExtEvent<TCallback extends (...args: any[]) => any = (...args: any[]) => any> = {
    addListener(cb: TCallback): void;
    removeListener(cb: TCallback): void;
    hasListener(cb: TCallback): boolean;
    hasListeners(): boolean;
};

// Standard Web API DirectoryEntry stub
interface DirectoryEntry {
    isFile: boolean;
    isDirectory: boolean;
    name: string;
    fullPath: string;
    filesystem: { name: string; root: DirectoryEntry };
}
type _WebExtDirectoryEntry = DirectoryEntry;

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
 * @supported Chrome, Firefox
 */
export interface OpenPopupOptions {
    /** @supported Chrome, Firefox */
    windowId?: number;
}
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }, callback: () => void): void;
/**
 * @supported Chrome, Firefox
 */
export function getBadgeTextColor(details: { tabId?: number }): Promise<ColorArray | string>;
/**
 * @supported Chrome, Firefox
 */
export function getBadgeTextColor(details: { tabId?: number }, callback: (color: ColorArray | string) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function enable(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function disable(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function isEnabled(details: Details): Promise</* TODO: Upstream type uses any */ any>;
/**
 * @supported Firefox
 */
export function getUserSettings(): Promise<_GetUserSettingsReturnUserSettings>;
/**
 * @supported Chrome, Firefox
 */
export function openPopup(options?: OpenPopupOptions): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function openPopup(options: OpenPopupOptions | undefined, callback: () => void): void;
/**
 * @supported Chrome, Firefox
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Firefox
 */
export interface Details {
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
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
    /**
     * An array of keyboard modifiers that were held while the menu item was clicked.
     *
     * @supported Firefox
     */
    modifiers: _OnClickDataModifiers[];
    /**
     * An integer value of button by which menu item was clicked.
     *
     * @supported Firefox
     */
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
    /**
     * The string the browser action should display when moused over.
     *
     * @supported Firefox
     */
    title: string | null;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetUserSettingsReturnUserSettings {
    /**
     * Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user).
     *
     * @supported Firefox
     */
    isOnToolbar?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails {
    /**
     * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    /**
     * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    path?: string | {
            [key: number]: string;
        } | undefined;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails {
    /**
     * The html file to show in a popup. If set to the empty string (''), no popup is shown.
     *
     * @supported Firefox
     */
    popup: string | null;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextDetails {
    /**
     * Any number of characters can be passed, but only about four can fit in the space.
     *
     * @supported Firefox
     */
    text: string | null;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeBackgroundColorDetails {
    /** @supported Firefox */
    color: ColorValue;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextColorDetails {
    /** @supported Firefox */
    color: ColorValue;
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OpenPopupOptions {
    /**
     * Defaults to the current window.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export type IconSizeMap = Record<number | string, string>;
/**
 * @supported Chrome, Firefox
 */
export type ImageDataSizeMap = Record<number | string, globalThis.ImageData | extensionTypes.ImageDataType>;
/**
 * @supported Chrome, Firefox
 */
export interface SetIconDetails {
    /** @supported Chrome, Firefox */
    tabId?: number;
    /** @supported Chrome, Firefox */
    imageData?: globalThis.ImageData | extensionTypes.ImageDataType | ImageDataSizeMap;
    /** @supported Chrome, Firefox */
    path?: string | IconSizeMap;
}

}

export namespace alarms {
/**
 * @supported Chrome, Firefox
 */
export interface Alarm {
    /**
     * Name of this alarm.
     *
     * @supported Chrome, Firefox
     */
    name: string;
    /**
     * Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. `Date.now() + n`). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this.
     *
     * @supported Chrome, Firefox
     */
    scheduledTime: number;
    /**
     * If not null, the alarm is a repeating alarm and will fire again in `periodInMinutes` minutes.
     *
     * @supported Chrome, Firefox
     */
    periodInMinutes?: number | undefined;
}
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function getAll(): Promise<Alarm[]>;
/**
 * @supported Chrome, Firefox
 */
export function clear(

      name?: string,
    ): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function clearAll(): Promise<boolean>;
/**
 * @supported Firefox
 */
export interface _CreateAlarmInfo {
    /**
     * Time when the alarm is scheduled to first fire, in milliseconds past the epoch.
     *
     * @supported Firefox
     */
    when?: number | undefined;
    /**
     * Number of minutes from the current time after which the alarm should first fire.
     *
     * @supported Firefox
     */
    delayInMinutes?: number | undefined;
    /**
     * Number of minutes after which the alarm should recur repeatedly.
     *
     * @supported Firefox
     */
    periodInMinutes?: number | undefined;
}

}

export namespace bookmarks {
/**
 * @supported Chrome, Firefox
 */
export type BookmarkTreeNodeUnmodifiable = "managed";
/**
 * @supported Chrome, Firefox
 */
export interface BookmarkTreeNode {
    /**
     * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * The `id` of the parent folder. Omitted for the root node.
     *
     * @supported Chrome, Firefox
     */
    parentId?: string | undefined;
    /**
     * The 0-based position of this node within its parent folder.
     *
     * @supported Chrome, Firefox
     */
    index?: number | undefined;
    /**
     * The URL navigated to when a user clicks the bookmark. Omitted for folders.
     *
     * @supported Chrome, Firefox
     */
    url?: string | undefined;
    /**
     * The text displayed for the node.
     *
     * @supported Chrome, Firefox
     */
    title: string;
    /**
     * When this node was created, in milliseconds since the epoch (`new Date(dateAdded)`).
     *
     * @supported Chrome, Firefox
     */
    dateAdded?: number | undefined;
    /**
     * When the contents of this folder last changed, in milliseconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    dateGroupModified?: number | undefined;
    /**
     * Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
     *
     * @supported Chrome, Firefox
     */
    unmodifiable?: BookmarkTreeNodeUnmodifiable | undefined;
    /**
     * An ordered list of children of this node.
     *
     * @supported Chrome, Firefox
     */
    children?: BookmarkTreeNode[] | undefined;
    /**
     * Indicates the type of the BookmarkTreeNode, which can be one of bookmark, folder or separator.
     *
     * @supported Firefox
     */
    type?: BookmarkTreeNodeType | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface CreateDetails {
    /**
     * Defaults to the Other Bookmarks folder.
     *
     * @supported Chrome, Firefox
     */
    parentId?: string | undefined;
    /** @supported Chrome, Firefox */
    index?: number | undefined;
    /** @supported Chrome, Firefox */
    title?: string | undefined;
    /** @supported Chrome, Firefox */
    url?: string | undefined;
    /**
     * Indicates the type of BookmarkTreeNode to create, which can be one of bookmark, folder or separator.
     *
     * @supported Firefox
     */
    type?: BookmarkTreeNodeType | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const onCreated: WebExtEvent<(id: string, bookmark: BookmarkTreeNode) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: events.Event<(id: string, removeInfo: { parentId: string; index: number; node?: BookmarkTreeNode }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onMoved: events.Event<(id: string, moveInfo: { parentId: string; index: number; oldParentId: string; oldIndex: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onChildrenReordered: events.Event<(id: string, reorderInfo: { childIds: string[] }) => void>;
/**
 * @supported Firefox
 */
export function get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome, Firefox
 */
export function getChildren(

      id: string,
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome, Firefox
 */
export function getRecent(

      numberOfItems: number,
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome, Firefox
 */
export function getTree(): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome, Firefox
 */
export function getSubTree(

      id: string,
    ): Promise<BookmarkTreeNode[]>;
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
 * @supported Chrome, Firefox
 */
export function create(

      bookmark: CreateDetails,
    ): Promise<BookmarkTreeNode>;
/**
 * @supported Firefox
 */
export function move(id: string, destination: _MoveDestination): Promise<BookmarkTreeNode>;
/**
 * @supported Firefox
 */
export function update(id: string, changes: _UpdateChanges): Promise<BookmarkTreeNode>;
/**
 * @supported Chrome, Firefox
 */
export function remove(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeTree(

      id: string,
    ): Promise<void>;
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
    /** @supported Firefox */
    parentId?: string | undefined;
    /** @supported Firefox */
    index?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateChanges {
    /** @supported Firefox */
    title?: string | undefined;
    /** @supported Firefox */
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedRemoveInfo {
    /** @supported Firefox */
    parentId: string;
    /** @supported Firefox */
    index: number;
    /** @supported Firefox */
    node: BookmarkTreeNode;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    /** @supported Firefox */
    title: string;
    /** @supported Firefox */
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnMovedMoveInfo {
    /** @supported Firefox */
    parentId: string;
    /** @supported Firefox */
    index: number;
    /** @supported Firefox */
    oldParentId: string;
    /** @supported Firefox */
    oldIndex: number;
}
/**
 * @supported Firefox
 */
export interface _OnChildrenReorderedReorderInfo {
    /** @supported Firefox */
    childIds: string[];
}

}

export namespace browsingData {
/**
 * @supported Chrome, Firefox
 */
export interface RemovalOptions {
    /**
     * Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the `getTime` method of the JavaScript `Date` object). If absent, defaults to 0 (which would remove all browsing data).
     *
     * @supported Chrome, Firefox
     */
    since?: extensionTypes.Date | undefined;
    /**
     * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'.
     *
     * @supported Chrome, Firefox
     */
    originTypes?: _RemovalOptionsOriginTypes | undefined;
    /**
     * Only remove data associated with these hostnames (only applies to cookies and localStorage).
     *
     * @supported Firefox
     */
    hostnames?: string[] | undefined;
    /**
     * Only remove data associated with this specific cookieStoreId.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface DataTypeSet {
    /**
     * The browser's cache.
     *
     * @supported Chrome, Firefox
     */
    cache?: boolean | undefined;
    /**
     * The browser's cookies.
     *
     * @supported Chrome, Firefox
     */
    cookies?: boolean | undefined;
    /**
     * The browser's download list.
     *
     * @supported Chrome, Firefox
     */
    downloads?: boolean | undefined;
    /**
     * The browser's stored form data.
     *
     * @supported Chrome, Firefox
     */
    formData?: boolean | undefined;
    /**
     * The browser's history.
     *
     * @supported Chrome, Firefox
     */
    history?: boolean | undefined;
    /**
     * Websites' IndexedDB data.
     *
     * @supported Chrome, Firefox
     */
    indexedDB?: boolean | undefined;
    /**
     * Websites' local storage data.
     *
     * @supported Chrome, Firefox
     */
    localStorage?: boolean | undefined;
    /**
     * Server-bound certificates.
     *
     * @deprecated Support for server-bound certificates has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 76
     *
     * @supported Chrome, Firefox
     */
    serverBoundCertificates?: boolean | undefined;
    /**
     * Stored passwords.
     *
     * @deprecated Support for password deletion through extensions has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 144
     *
     * @supported Chrome, Firefox
     */
    passwords?: boolean | undefined;
    /**
     * Plugins' data.
     *
     * @deprecated Support for Flash has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 88
     *
     * @supported Chrome, Firefox
     */
    pluginData?: boolean | undefined;
    /**
     * Service Workers.
     *
     * @supported Chrome, Firefox
     */
    serviceWorkers?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export function settings(): Promise<_SettingsReturnResult>;
/**
 * @supported Chrome, Firefox
 */
export function remove(

      options: RemovalOptions,

      dataToRemove: DataTypeSet,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeAppcache(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeCache(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeCookies(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeDownloads(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeFileSystems(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeFormData(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeHistory(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeIndexedDB(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeLocalStorage(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removePluginData(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removePasswords(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeWebSQL(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export interface _RemovalOptionsOriginTypes {
    /**
     * Normal websites.
     *
     * @supported Firefox
     */
    unprotectedWeb?: boolean | undefined;
    /**
     * Websites that have been installed as hosted applications (be careful!).
     *
     * @supported Firefox
     */
    protectedWeb?: boolean | undefined;
    /**
     * Extensions and packaged applications a user has installed (be _really_ careful!).
     *
     * @supported Firefox
     */
    extension?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SettingsReturnResult {
    /** @supported Firefox */
    options: RemovalOptions;
    /**
     * All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`.
     *
     * @supported Firefox
     */
    dataToRemove: DataTypeSet;
    /**
     * All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not.
     *
     * @supported Firefox
     */
    dataRemovalPermitted: DataTypeSet;
}

}

export namespace commands {
/**
 * @supported Chrome, Firefox
 */
export interface Command {
    /**
     * The name of the Extension Command
     *
     * @supported Chrome, Firefox
     */
    name?: string | undefined;
    /**
     * The Extension Command description
     *
     * @supported Chrome, Firefox
     */
    description?: string | undefined;
    /**
     * The shortcut active for this command, or blank if not active.
     *
     * @supported Chrome, Firefox
     */
    shortcut?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const onCommand: events.Event<(command: string, tab?: tabs.Tab) => void>;
/**
 * @supported Chrome, Firefox
 */
export function getAll(): Promise<Command[]>;
/**
 * @supported Firefox
 */
export interface _UpdateDetail {
    /**
     * The name of the command.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The new description for the command.
     *
     * @supported Firefox
     */
    description?: string | undefined;
    /** @supported Firefox */
    shortcut?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    /**
     * The name of the shortcut.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The new shortcut active for this command, or blank if not active.
     *
     * @supported Firefox
     */
    newShortcut: string;
    /**
     * The old shortcut which is no longer active for this command, or blank if the shortcut was previously inactive.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    matches: _manifest.MatchPattern[];
    /** @supported Firefox */
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    /** @supported Firefox */
    includeGlobs?: string[] | undefined;
    /** @supported Firefox */
    excludeGlobs?: string[] | undefined;
    /**
     * The list of CSS files to inject
     *
     * @supported Firefox
     */
    css?: extensionTypes.ExtensionFileOrCode[] | undefined;
    /**
     * The list of JS files to inject
     *
     * @supported Firefox
     */
    js?: extensionTypes.ExtensionFileOrCode[] | undefined;
    /**
     * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
     *
     * @supported Firefox
     */
    allFrames?: boolean | undefined;
    /**
     * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Ignored if matchOriginAsFallback is specified. By default it is `false`.
     *
     * @supported Firefox
     */
    matchAboutBlank?: boolean | undefined;
    /**
     * If matchOriginAsFallback is true, then the code is also injected in about:, data:, blob: when their origin matches the pattern in 'matches', even if the actual document origin is opaque (due to the use of CSP sandbox or iframe sandbox). Match patterns in 'matches' must specify a wildcard path glob. By default it is `false`.
     *
     * @supported Firefox
     */
    matchOriginAsFallback?: boolean | undefined;
    /**
     * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
     *
     * @supported Firefox
     */
    runAt?: extensionTypes.RunAt | undefined;
    /**
     * The JavaScript world for a script to execute within. Defaults to "ISOLATED".
     *
     * @supported Firefox
     */
    world?: extensionTypes.ExecutionWorld | undefined;
    /**
     * limit the set of matched tabs to those that belong to the given cookie store id
     *
     * @supported Firefox
     */
    cookieStoreId?: string[] | string | undefined;
    /** @supported Firefox */
    cssOrigin?: extensionTypes.CSSOrigin;
}
/**
 * @supported Firefox
 */
export interface RegisteredContentScript {
    /**
     * Unregister a content script registered programmatically
     *
     * @supported Firefox
     */
    unregister(): Promise</* TODO: Upstream type uses any */ any>;
    /** @supported Firefox */
    unregister(): Promise<void>;
}
/**
 * @supported Firefox
 */
export function register(contentScriptOptions: RegisteredContentScriptOptions): Promise<RegisteredContentScript>;

}

export namespace contextMenus {
/**
 * @supported Chrome, Firefox
 */
export type ContextType = _ContextType;
/**
 * @supported Chrome, Firefox
 */
export type ItemType =
        | "normal"
        | "checkbox"
        | "radio"
        | "separator";
/**
 * @supported Chrome, Firefox
 */
export interface OnClickData {
    /**
     * The ID of the menu item that was clicked.
     *
     * @supported Chrome, Firefox
     */
    menuItemId: number | string;
    /**
     * The parent ID, if any, for the item clicked.
     *
     * @supported Chrome, Firefox
     */
    parentMenuItemId?: number | string | undefined;
    /**
     * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
     *
     * @supported Chrome, Firefox
     */
    mediaType?: string | undefined;
    /**
     * If the element is a link, the URL it points to.
     *
     * @supported Chrome, Firefox
     */
    linkUrl?: string | undefined;
    /**
     * Will be present for elements with a 'src' URL.
     *
     * @supported Chrome, Firefox
     */
    srcUrl?: string | undefined;
    /**
     * The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
     *
     * @supported Chrome, Firefox
     */
    pageUrl?: string | undefined;
    /**
     * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
     *
     * @supported Chrome, Firefox
     */
    frameUrl?: string | undefined;
    /**
     * The [ID of the frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) of the element where the context menu was clicked, if it was in a frame.
     *
     * @since Chrome 51
     *
     * @supported Chrome, Firefox
     */
    frameId?: number | undefined;
    /**
     * The text for the context selection, if any.
     *
     * @supported Chrome, Firefox
     */
    selectionText?: string | undefined;
    /**
     * A flag indicating whether the element is editable (text input, textarea, etc.).
     *
     * @supported Chrome, Firefox
     */
    editable: boolean;
    /**
     * A flag indicating the state of a checkbox or radio item before it was clicked.
     *
     * @supported Chrome, Firefox
     */
    wasChecked?: boolean | undefined;
    /**
     * A flag indicating the state of a checkbox or radio item after it is clicked.
     *
     * @supported Chrome, Firefox
     */
    checked?: boolean | undefined;
    /**
     * The type of view where the menu is clicked. May be unset if the menu is not associated with a view.
     *
     * @supported Firefox
     */
    viewType?: extension.ViewType | undefined;
    /**
     * If the element is a link, the text of that link.
     *
     * @supported Firefox
     */
    linkText?: string | undefined;
    /**
     * The id of the bookmark where the context menu was clicked, if it was on a bookmark.
     *
     * @supported Firefox
     */
    bookmarkId?: string | undefined;
    /**
     * An array of keyboard modifiers that were held while the menu item was clicked.
     *
     * @supported Firefox
     */
    modifiers: _OnClickDataModifiers[];
    /**
     * An integer value of button by which menu item was clicked.
     *
     * @supported Firefox
     */
    button?: number | undefined;
    /**
     * An identifier of the clicked element, if any. Use menus.getTargetElement in the page to find the corresponding element.
     *
     * @supported Firefox
     */
    targetElementId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function remove(

      menuItemId: number | string,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
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
    /**
     * The type of menu item. Defaults to 'normal' if not specified.
     *
     * @supported Firefox
     */
    type?: ItemType | undefined;
    /**
     * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
     *
     * @supported Firefox
     */
    id?: string | undefined;
    /** @supported Firefox */
    icons?: _CreateCreatePropertiesIcons | undefined;
    /**
     * The text to be displayed in the item; this is _required_ unless `type` is 'separator'. When the context is 'selection', you can use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.
     *
     * @supported Firefox
     */
    checked?: boolean | undefined;
    /**
     * List of contexts this menu item will appear in. Defaults to ['page'] if not specified.
     *
     * @supported Firefox
     */
    contexts?: ContextType[] | undefined;
    /**
     * List of view types where the menu item will be shown. Defaults to any view, including those without a viewType.
     *
     * @supported Firefox
     */
    viewTypes?: extension.ViewType[] | undefined;
    /**
     * Whether the item is visible in the menu.
     *
     * @supported Firefox
     */
    visible?: boolean | undefined;
    /**
     * A function that will be called back when the menu item is clicked. Event pages cannot use this; instead, they should register a listener for `contextMenus.onClicked`.
     * @param info Information about the item clicked and the context where the click happened.
     * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    onclick?(info: OnClickData, tab: tabs.Tab): void | undefined;
    /**
     * The ID of a parent menu item; this makes the item a child of a previously added item.
     *
     * @supported Firefox
     */
    parentId?: number | string | undefined;
    /**
     * Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see Match Patterns.
     *
     * @supported Firefox
     */
    documentUrlPatterns?: string[] | undefined;
    /**
     * Similar to documentUrlPatterns, but lets you filter based on the src attribute of img/audio/video tags and the href of anchor tags.
     *
     * @supported Firefox
     */
    targetUrlPatterns?: string[] | undefined;
    /**
     * Whether this context menu item is enabled or disabled. Defaults to true.
     *
     * @supported Firefox
     */
    enabled?: boolean | undefined;
    /**
     * Specifies a command to issue for the context click.
     *
     * @supported Firefox
     */
    command?: string | _CreateCreatePropertiesCommand | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdatePropertiesIcons {
    /** @supported Firefox */
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    /** @supported Firefox */
    type?: ItemType | undefined;
    /** @supported Firefox */
    icons?: _UpdateUpdatePropertiesIcons | undefined;
    /** @supported Firefox */
    title?: string | undefined;
    /** @supported Firefox */
    checked?: boolean | undefined;
    /** @supported Firefox */
    contexts?: ContextType[] | undefined;
    /** @supported Firefox */
    viewTypes?: extension.ViewType[] | undefined;
    /**
     * Whether the item is visible in the menu.
     *
     * @supported Firefox
     */
    visible?: boolean | undefined;
    /**
     * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    onclick?(info: OnClickData, tab: tabs.Tab): void | undefined;
    /**
     * Note: You cannot change an item to be a child of one of its own descendants.
     *
     * @supported Firefox
     */
    parentId?: number | string | undefined;
    /** @supported Firefox */
    documentUrlPatterns?: string[] | undefined;
    /** @supported Firefox */
    targetUrlPatterns?: string[] | undefined;
    /** @supported Firefox */
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
    /**
     * Whether to also include default menu items in the menu.
     *
     * @supported Firefox
     */
    showDefaults?: boolean | undefined;
    /**
     * ContextType to override, to allow menu items from other extensions in the menu. Currently only 'bookmark' and 'tab' are supported. showDefaults cannot be used with this option.
     *
     * @supported Firefox
     */
    context?: _OverrideContextContextOptionsContext | undefined;
    /**
     * Required when context is 'bookmark'. Requires 'bookmark' permission.
     *
     * @supported Firefox
     */
    bookmarkId?: string | undefined;
    /**
     * Required when context is 'tab'. Requires 'tabs' permission.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnShownInfo {
    /**
     * A list of IDs of the menu items that were shown.
     *
     * @supported Firefox
     */
    menuIds: Array<number | string>;
    /**
     * A list of all contexts that apply to the menu.
     *
     * @supported Firefox
     */
    contexts: ContextType[];
    /** @supported Firefox */
    viewType?: extension.ViewType | undefined;
    /** @supported Firefox */
    editable: boolean;
    /** @supported Firefox */
    mediaType?: string | undefined;
    /** @supported Firefox */
    linkUrl?: string | undefined;
    /** @supported Firefox */
    linkText?: string | undefined;
    /** @supported Firefox */
    srcUrl?: string | undefined;
    /** @supported Firefox */
    pageUrl?: string | undefined;
    /** @supported Firefox */
    frameUrl?: string | undefined;
    /** @supported Firefox */
    selectionText?: string | undefined;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
export type SameSiteStatus =
        | "unspecified"
        | "no_restriction"
        | "lax"
        | "strict";
/**
 * @supported Chrome, Firefox
 */
export interface Cookie {
    /**
     * The name of the cookie.
     *
     * @supported Chrome, Firefox
     */
    name: string;
    /**
     * The value of the cookie.
     *
     * @supported Chrome, Firefox
     */
    value: string;
    /**
     * The domain of the cookie (e.g. "www.google.com", "example.com").
     *
     * @supported Chrome, Firefox
     */
    domain: string;
    /**
     * True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie).
     *
     * @supported Chrome, Firefox
     */
    hostOnly: boolean;
    /**
     * The path of the cookie.
     *
     * @supported Chrome, Firefox
     */
    path: string;
    /**
     * True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS).
     *
     * @supported Chrome, Firefox
     */
    secure: boolean;
    /**
     * True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts).
     *
     * @supported Chrome, Firefox
     */
    httpOnly: boolean;
    /**
     * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
     *
     * @since Chrome 51
     *
     * @supported Chrome, Firefox
     */
    sameSite: SameSiteStatus;
    /**
     * True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date.
     *
     * @supported Chrome, Firefox
     */
    session: boolean;
    /**
     * The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
     *
     * @supported Chrome, Firefox
     */
    expirationDate?: number | undefined;
    /**
     * The ID of the cookie store containing this cookie, as provided in getAllCookieStores().
     *
     * @supported Chrome, Firefox
     */
    storeId: string;
    /** @supported Chrome, Firefox */
    partitionKey?: PartitionKey;
    /** @supported Firefox */
    firstPartyDomain: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface CookieStore {
    /**
     * The unique identifier for the cookie store.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * Identifiers of all the browser tabs that share this cookie store.
     *
     * @supported Chrome, Firefox
     */
    tabIds: number[];
    /** @supported Firefox */
    incognito: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export type OnChangedCause =
        | "evicted"
        | "expired"
        | "explicit"
        | "expired_overwrite"
        | "overwrite";
/**
 * @supported Chrome, Firefox
 */
export const onChanged: WebExtEvent<(changeInfo: { removed: boolean; cookie: Cookie; cause: OnChangedCause }) => void>;
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
 * @supported Chrome, Firefox
 */
export function getAllCookieStores(): Promise<CookieStore[]>;
/**
 * @supported Firefox
 */
export interface PartitionKey {
    /**
     * The first-party URL of the cookie, if the cookie is in storage partitioned by the top-level site.
     *
     * @supported Firefox
     */
    topLevelSite?: string | undefined;
    /**
     * Whether or not the cookie is in a third-party context, respecting ancestor chains.
     *
     * @supported Firefox
     */
    hasCrossSiteAncestor?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDetails {
    /**
     * The URL with which the cookie to retrieve is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The name of the cookie to retrieve.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.
     *
     * @supported Firefox
     */
    storeId?: string | undefined;
    /**
     * The first-party domain which the cookie to retrieve is associated. This attribute is required if First-Party Isolation is enabled.
     *
     * @supported Firefox
     */
    firstPartyDomain?: string | undefined;
    /**
     * The storage partition, if the cookie is part of partitioned storage. By default, only non-partitioned cookies are returned.
     *
     * @supported Firefox
     */
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetAllDetails {
    /**
     * Restricts the retrieved cookies to those that would match the given URL.
     *
     * @supported Firefox
     */
    url?: string | undefined;
    /**
     * Filters the cookies by name.
     *
     * @supported Firefox
     */
    name?: string | undefined;
    /**
     * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
     *
     * @supported Firefox
     */
    domain?: string | undefined;
    /**
     * Restricts the retrieved cookies to those whose path exactly matches this string.
     *
     * @supported Firefox
     */
    path?: string | undefined;
    /**
     * Filters the cookies by their Secure property.
     *
     * @supported Firefox
     */
    secure?: boolean | undefined;
    /**
     * Filters out session vs. persistent cookies.
     *
     * @supported Firefox
     */
    session?: boolean | undefined;
    /**
     * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
     *
     * @supported Firefox
     */
    storeId?: string | undefined;
    /**
     * Restricts the retrieved cookies to those whose first-party domains match this one. This attribute is required if First-Party Isolation is enabled. To not filter by a specific first-party domain, use `null` or `undefined`.
     *
     * @supported Firefox
     */
    firstPartyDomain?: string | undefined;
    /**
     * Selects a specific storage partition to look up cookies. Defaults to null, in which case only non-partitioned cookies are retrieved. If an object iis passed, partitioned cookies are also included, and filtered based on the keys present in the given PartitionKey description. An empty object ({}) returns all cookies (partitioned + unpartitioned), a non-empty object (e.g. {topLevelSite: '...'}) only returns cookies whose partition match all given attributes.
     *
     * @supported Firefox
     */
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetDetails {
    /**
     * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The name of the cookie. Empty by default if omitted.
     *
     * @supported Firefox
     */
    name?: string | undefined;
    /**
     * The value of the cookie. Empty by default if omitted.
     *
     * @supported Firefox
     */
    value?: string | undefined;
    /**
     * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
     *
     * @supported Firefox
     */
    domain?: string | undefined;
    /**
     * The path of the cookie. Defaults to the path portion of the url parameter.
     *
     * @supported Firefox
     */
    path?: string | undefined;
    /**
     * Whether the cookie should be marked as Secure. Defaults to false.
     *
     * @supported Firefox
     */
    secure?: boolean | undefined;
    /**
     * Whether the cookie should be marked as HttpOnly. Defaults to false.
     *
     * @supported Firefox
     */
    httpOnly?: boolean | undefined;
    /**
     * The cookie's same-site status.
     *
     * @supported Firefox
     */
    sameSite?: SameSiteStatus | undefined;
    /**
     * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
     *
     * @supported Firefox
     */
    expirationDate?: number | undefined;
    /**
     * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
     *
     * @supported Firefox
     */
    storeId?: string | undefined;
    /**
     * The first-party domain of the cookie. This attribute is required if First-Party Isolation is enabled.
     *
     * @supported Firefox
     */
    firstPartyDomain?: string | undefined;
    /**
     * The storage partition, if the cookie is part of partitioned storage. By default, non-partitioned storage is used.
     *
     * @supported Firefox
     */
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveReturnDetails {
    /**
     * The URL associated with the cookie that's been removed.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The name of the cookie that's been removed.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The ID of the cookie store from which the cookie was removed.
     *
     * @supported Firefox
     */
    storeId: string;
    /**
     * The first-party domain associated with the cookie that's been removed.
     *
     * @supported Firefox
     */
    firstPartyDomain: string;
    /**
     * The storage partition, if the cookie is part of partitioned storage. null if not partitioned.
     *
     * @supported Firefox
     */
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveDetails {
    /**
     * The URL associated with the cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The name of the cookie to remove.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The ID of the cookie store to look in for the cookie. If unspecified, the cookie is looked for by default in the current execution context's cookie store.
     *
     * @supported Firefox
     */
    storeId?: string | undefined;
    /**
     * The first-party domain associated with the cookie. This attribute is required if First-Party Isolation is enabled.
     *
     * @supported Firefox
     */
    firstPartyDomain?: string | undefined;
    /**
     * The storage partition, if the cookie is part of partitioned storage. By default, non-partitioned storage is used.
     *
     * @supported Firefox
     */
    partitionKey?: PartitionKey | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedChangeInfo {
    /**
     * True if a cookie was removed.
     *
     * @supported Firefox
     */
    removed: boolean;
    /**
     * Information about the cookie that was set or removed.
     *
     * @supported Firefox
     */
    cookie: Cookie;
    /**
     * The underlying reason behind the cookie's change.
     *
     * @supported Firefox
     */
    cause: OnChangedCause;
}

}

export namespace declarativeNetRequest {
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type UnsupportedRegexReason = "syntaxError" | "memoryLimitExceeded";
/**
 * @supported Chrome, Firefox
 */
export interface URLTransform {
    /**
     * The new scheme for the request. Allowed values are "http", "https", "ftp" and "chrome-extension".
     *
     * @supported Chrome, Firefox
     */
    scheme?: _URLTransformScheme | undefined;
    /**
     * The new host for the request.
     *
     * @supported Chrome, Firefox
     */
    host?: string | undefined;
    /**
     * The new port for the request. If empty, the existing port is cleared.
     *
     * @supported Chrome, Firefox
     */
    port?: string | undefined;
    /**
     * The new path for the request. If empty, the existing path is cleared.
     *
     * @supported Chrome, Firefox
     */
    path?: string | undefined;
    /**
     * The new query for the request. Should be either empty, in which case the existing query is cleared; or should begin with '?'.
     *
     * @supported Chrome, Firefox
     */
    query?: string | undefined;
    /**
     * Add, remove or replace query key-value pairs.
     *
     * @supported Chrome, Firefox
     */
    queryTransform?: _URLTransformQueryTransform | undefined;
    /**
     * The new fragment for the request. Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
     *
     * @supported Chrome, Firefox
     */
    fragment?: string | undefined;
    /**
     * The new username for the request.
     *
     * @supported Chrome, Firefox
     */
    username?: string | undefined;
    /**
     * The new password for the request.
     *
     * @supported Chrome, Firefox
     */
    password?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface Rule {
    /**
     * An id which uniquely identifies a rule. Mandatory and should be >= 1.
     *
     * @supported Chrome, Firefox
     */
    id: number;
    /**
     * Rule priority. Defaults to 1. When specified, should be >= 1.
     *
     * @supported Chrome, Firefox
     */
    priority?: number | undefined;
    /**
     * The condition under which this rule is triggered.
     *
     * @supported Chrome, Firefox
     */
    condition: _RuleCondition;
    /**
     * The action to take if this rule is matched.
     *
     * @supported Chrome, Firefox
     */
    action: _RuleAction;
}
/**
 * @supported Chrome, Firefox
 */
export interface MatchedRule {
    /**
     * A matching rule's ID.
     *
     * @supported Chrome, Firefox
     */
    ruleId: number;
    /**
     * ID of the {@link Ruleset} this rule belongs to. For a rule originating from the set of dynamic rules, this will be equal to {@link DYNAMIC_RULESET_ID}.
     *
     * @supported Chrome, Firefox
     */
    rulesetId: string;
    /**
     * ID of the extension, if this rule belongs to a different extension.
     *
     * @supported Firefox
     */
    extensionId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface GetRulesFilter {
    /**
     * If specified, only rules with matching IDs are included.
     *
     * @supported Chrome, Firefox
     */
    ruleIds?: number[] | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const GUARANTEED_MINIMUM_STATIC_RULES: number;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_DYNAMIC_RULES: number;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_SESSION_RULES: number;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_REGEX_RULES: number;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_STATIC_RULESETS: number;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: number;
/**
 * @supported Chrome, Firefox
 */
export const DYNAMIC_RULESET_ID: string;
/**
 * @supported Chrome, Firefox
 */
export const SESSION_RULESET_ID: string;
/**
 * @supported Firefox
 */
export function updateDynamicRules(options: _UpdateDynamicRulesOptions): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getDynamicRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;
/**
 * @supported Firefox
 */
export function updateSessionRules(options: _UpdateSessionRulesOptions): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getSessionRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;
/**
 * @supported Firefox
 */
export function updateEnabledRulesets(updateRulesetOptions: _UpdateEnabledRulesetsUpdateRulesetOptions): Promise<void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
    key: string;
    /** @supported Firefox */
    value: string;
    /**
     * If true, the query key is replaced only if it's already present. Otherwise, the key is also added if it's missing.
     *
     * @supported Firefox
     */
    replaceOnly?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _URLTransformQueryTransform {
    /**
     * The list of query keys to be removed.
     *
     * @supported Firefox
     */
    removeParams?: string[] | undefined;
    /**
     * The list of query key-value pairs to be added or replaced.
     *
     * @supported Firefox
     */
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
    /**
     * TODO: link to doc explaining supported pattern. The pattern which is matched against the network request url. Only one of 'urlFilter' or 'regexFilter' can be specified.
     *
     * @supported Firefox
     */
    urlFilter?: string | undefined;
    /**
     * Regular expression to match against the network request url. Only one of 'urlFilter' or 'regexFilter' can be specified.
     *
     * @supported Firefox
     */
    regexFilter?: string | undefined;
    /**
     * Whether 'urlFilter' or 'regexFilter' is case-sensitive.
     *
     * @supported Firefox
     */
    isUrlFilterCaseSensitive?: boolean | undefined;
    /**
     * The rule will only match network requests originating from the list of 'initiatorDomains'. If the list is omitted, the rule is applied to requests from all domains.
     *
     * @supported Firefox
     */
    initiatorDomains?: string[] | undefined;
    /**
     * The rule will not match network requests originating from the list of 'initiatorDomains'. If the list is empty or omitted, no domains are excluded. This takes precedence over 'initiatorDomains'.
     *
     * @supported Firefox
     */
    excludedInitiatorDomains?: string[] | undefined;
    /**
     * The rule will only match network requests when the domain matches one from the list of 'requestDomains'. If the list is omitted, the rule is applied to requests from all domains.
     *
     * @supported Firefox
     */
    requestDomains?: string[] | undefined;
    /**
     * The rule will not match network requests when the domains matches one from the list of 'excludedRequestDomains'. If the list is empty or omitted, no domains are excluded. This takes precedence over 'requestDomains'.
     *
     * @supported Firefox
     */
    excludedRequestDomains?: string[] | undefined;
    /**
     * List of resource types which the rule can match. When the rule action is 'allowAllRequests', this must be specified and may only contain 'main_frame' or 'sub_frame'. Cannot be specified if 'excludedResourceTypes' is specified. If neither of them is specified, all resource types except 'main_frame' are matched.
     *
     * @supported Firefox
     */
    resourceTypes?: ResourceType[] | undefined;
    /**
     * List of resource types which the rule won't match. Cannot be specified if 'resourceTypes' is specified. If neither of them is specified, all resource types except 'main_frame' are matched.
     *
     * @supported Firefox
     */
    excludedResourceTypes?: ResourceType[] | undefined;
    /**
     * List of HTTP request methods which the rule can match. Should be a lower-case method such as 'connect', 'delete', 'get', 'head', 'options', 'patch', 'post', 'put'.'
     *
     * @supported Firefox
     */
    requestMethods?: string[] | undefined;
    /**
     * List of request methods which the rule won't match. Cannot be specified if 'requestMethods' is specified. If neither of them is specified, all request methods are matched.
     *
     * @supported Firefox
     */
    excludedRequestMethods?: string[] | undefined;
    /**
     * Specifies whether the network request is first-party or third-party to the domain from which it originated. If omitted, all requests are matched.
     *
     * @supported Firefox
     */
    domainType?: _RuleConditionDomainType | undefined;
    /**
     * List of tabIds which the rule should match. An ID of -1 matches requests which don't originate from a tab. Only supported for session-scoped rules.
     *
     * @supported Firefox
     */
    tabIds?: number[] | undefined;
    /**
     * List of tabIds which the rule should not match. An ID of -1 excludes requests which don't originate from a tab. Only supported for session-scoped rules.
     *
     * @supported Firefox
     */
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
    /**
     * Path relative to the extension directory. Should start with '/'.
     *
     * @supported Firefox
     */
    extensionPath?: string | undefined;
    /**
     * Url transformations to perform.
     *
     * @supported Firefox
     */
    transform?: URLTransform | undefined;
    /**
     * The redirect url. Redirects to JavaScript urls are not allowed.
     *
     * @supported Firefox
     */
    url?: string | undefined;
    /**
     * Substitution pattern for rules which specify a 'regexFilter'. The first match of regexFilter within the url will be replaced with this pattern. Within regexSubstitution, backslash-escaped digits (\1 to \9) can be used to insert the corresponding capture groups. \0 refers to the entire matching text.
     *
     * @supported Firefox
     */
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
    /**
     * The name of the request header to be modified.
     *
     * @supported Firefox
     */
    header: string;
    /**
     * The operation to be performed on a header.
     *
     * @supported Firefox
     */
    operation: _RuleActionRequestHeadersOperation;
    /**
     * The new value for the header. Must be specified for the 'append' and 'set' operations.
     *
     * @supported Firefox
     */
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
    /**
     * The name of the response header to be modified.
     *
     * @supported Firefox
     */
    header: string;
    /**
     * The operation to be performed on a header.
     *
     * @supported Firefox
     */
    operation: _RuleActionResponseHeadersOperation;
    /**
     * The new value for the header. Must be specified for the 'append' and 'set' operations.
     *
     * @supported Firefox
     */
    value?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RuleAction {
    /** @supported Firefox */
    type: _RuleActionType;
    /**
     * Describes how the redirect should be performed. Only valid when type is 'redirect'.
     *
     * @supported Firefox
     */
    redirect?: _RuleActionRedirect | undefined;
    /**
     * The request headers to modify for the request. Only valid when type is 'modifyHeaders'.
     *
     * @supported Firefox
     */
    requestHeaders?: _RuleActionRequestHeaders[] | undefined;
    /**
     * The response headers to modify for the request. Only valid when type is 'modifyHeaders'.
     *
     * @supported Firefox
     */
    responseHeaders?: _RuleActionResponseHeaders[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateDynamicRulesOptions {
    /**
     * IDs of the rules to remove. Any invalid IDs will be ignored.
     *
     * @supported Firefox
     */
    removeRuleIds?: number[] | undefined;
    /**
     * Rules to add.
     *
     * @supported Firefox
     */
    addRules?: Rule[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateSessionRulesOptions {
    /**
     * IDs of the rules to remove. Any invalid IDs will be ignored.
     *
     * @supported Firefox
     */
    removeRuleIds?: number[] | undefined;
    /**
     * Rules to add.
     *
     * @supported Firefox
     */
    addRules?: Rule[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateEnabledRulesetsUpdateRulesetOptions {
    /** @supported Firefox */
    disableRulesetIds?: string[] | undefined;
    /** @supported Firefox */
    enableRulesetIds?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateStaticRulesOptions {
    /** @supported Firefox */
    rulesetId: string;
    /** @supported Firefox */
    disableRuleIds?: number[] | undefined;
    /** @supported Firefox */
    enableRuleIds?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDisabledRuleIdsOptions {
    /** @supported Firefox */
    rulesetId: string;
}
/**
 * @supported Firefox
 */
export interface _IsRegexSupportedReturnResult {
    /**
     * Whether the given regex is supported
     *
     * @supported Firefox
     */
    isSupported: boolean;
    /**
     * Specifies the reason why the regular expression is not supported. Only provided if 'isSupported' is false.
     *
     * @supported Firefox
     */
    reason?: UnsupportedRegexReason | undefined;
}
/**
 * @supported Firefox
 */
export interface _IsRegexSupportedRegexOptions {
    /**
     * The regular expresson to check.
     *
     * @supported Firefox
     */
    regex: string;
    /**
     * Whether the 'regex' specified is case sensitive.
     *
     * @supported Firefox
     */
    isCaseSensitive?: boolean | undefined;
    /**
     * Whether the 'regex' specified requires capturing. Capturing is only required for redirect rules which specify a 'regexSubstition' action.
     *
     * @supported Firefox
     */
    requireCapturing?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeReturnResult {
    /**
     * The rules (if any) that match the hypothetical request.
     *
     * @supported Firefox
     */
    matchedRules: MatchedRule[];
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeRequest {
    /**
     * The URL of the hypothetical request.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The initiator URL (if any) for the hypothetical request.
     *
     * @supported Firefox
     */
    initiator?: string | undefined;
    /**
     * Standard HTTP method of the hypothetical request.
     *
     * @supported Firefox
     */
    method?: string | undefined;
    /**
     * The resource type of the hypothetical request.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The ID of the tab in which the hypothetical request takes place. Does not need to correspond to a real tab ID. Default is -1, meaning that the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _TestMatchOutcomeOptions {
    /**
     * Whether to account for rules from other installed extensions during rule evaluation.
     *
     * @supported Firefox
     */
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

/**
 * These APIs are available only in a devtools_page context.
 */
export namespace devtools.inspectedWindow {
/**
 * @supported Chrome, Firefox
 */
export interface Resource {
    /** @supported Chrome, Firefox */
    url: string;
}
/**
 * @supported Chrome, Firefox
 */
export const tabId: number;
/**
 * @supported Chrome, Firefox
 */
export const onResourceAdded: events.Event<(resource: Resource) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onResourceContentCommitted: events.Event<(resource: Resource, content: string) => void>;
/**
 * @supported Firefox
 */
export function reload(reloadOptions?: _ReloadReloadOptions): void;
/**
 * @supported Chrome, Firefox
 */
export function getResources(): Promise<Resource[]>;
/**
 * @supported Firefox
 */
export interface _EvalReturnExceptionInfo {
    /**
     * Set if the error occurred on the DevTools side before the expression is evaluated.
     *
     * @supported Firefox
     */
    isError: boolean;
    /**
     * Set if the error occurred on the DevTools side before the expression is evaluated.
     *
     * @supported Firefox
     */
    code: string;
    /**
     * Set if the error occurred on the DevTools side before the expression is evaluated.
     *
     * @supported Firefox
     */
    description: string;
    /**
     * Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error.
     *
     * @supported Firefox
     */
    details: /* TODO: Upstream type uses any */ any[];
    /**
     * Set if the evaluated code produces an unhandled exception.
     *
     * @supported Firefox
     */
    isException: boolean;
    /**
     * Set if the evaluated code produces an unhandled exception.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    ignoreCache?: boolean;
    /** @supported Firefox */
    userAgent?: string;
    /** @supported Firefox */
    injectedScript?: string;
}
/**
 * @supported Chrome, Firefox
 */
export function eval<T = unknown>(expression: string, options?: EvalOptions): Promise<T>;
/**
 * @supported Chrome, Firefox
 */
export function eval<T = unknown>(expression: string, callback: (result: T | undefined, exceptionInfo: EvaluationExceptionInfo) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function eval<T = unknown>(expression: string, options: EvalOptions | undefined, callback: (result: T | undefined, exceptionInfo: EvaluationExceptionInfo) => void): void;
/**
 * @supported Chrome, Firefox
 */
export interface EvaluationExceptionInfo {
    /** @supported Chrome, Firefox */
    isError: boolean;
    /** @supported Chrome, Firefox */
    isException: boolean;
    /** @supported Chrome, Firefox */
    value?: unknown;
    /** @supported Chrome, Firefox */
    description?: string;
    /** @supported Chrome, Firefox */
    details?: unknown[];
}
/**
 * @supported Chrome, Firefox
 */
export interface EvalOptions {
    /** @supported Chrome, Firefox */
    frameURL?: string;
    /** @supported Chrome, Firefox */
    useContentScriptContext?: boolean;
    /** @supported Chrome, Firefox */
    scriptExecutionContext?: string;
}

}

/**
 * These APIs are available only in a devtools_page context.
 */
export namespace devtools.network {
/**
 * @supported Chrome, Firefox
 */
export interface Request {
    /**
     * Returns content of the response body.
     *
     * @chrome-returns-extra since Chrome 151
     * @returns A function that receives the response body when the request completes.
     *
     * @supported Chrome, Firefox
     */
    getContent(): Promise<object>;
}
/**
 * @supported Chrome, Firefox
 */
export const onRequestFinished: WebExtEvent<(request: Request) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onNavigated: WebExtEvent<(url: string) => void>;
/**
 * @supported Chrome, Firefox
 */
export function getHAR(): Promise<Record<string, unknown>>;

}

/**
 * These APIs are available only in a devtools_page context.
 */
export namespace devtools.panels {
/**
 * @supported Chrome, Firefox
 */
export interface ElementsPanel {
    /**
     * Fired when an object is selected in the panel.
     *
     * @supported Chrome, Firefox
     */
    onSelectionChanged: WebExtEvent<() => void>;
    /**
     * Creates a pane within panel's sidebar.
     *
     * @chrome-returns-extra since Pending
     * @param title Text that is displayed in sidebar caption.
     * @returns A callback invoked when the sidebar is created.
     *
     * @supported Chrome, Firefox
     */
    createSidebarPane(title: string): Promise<ExtensionSidebarPane>;
}
/**
 * @supported Chrome, Firefox
 */
export interface SourcesPanel {

}
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionPanel {
    /** @supported Chrome, Firefox */
    onShown: events.Event<(window: Window) => void>;
    /** @supported Chrome, Firefox */
    onHidden: events.Event<() => void>;
}
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionSidebarPane {
    /** @supported Chrome, Firefox */
    onShown: events.Event<(window: Window) => void>;
    /** @supported Chrome, Firefox */
    onHidden: events.Event<() => void>;
    /** @supported Chrome, Firefox */
    setExpression(expression: string, rootTitle?: string): Promise<void>;
    /** @supported Chrome, Firefox */
    setObject(jsonObject: _WebExtJsonObject, rootTitle?: string): Promise<void>;
    /** @supported Chrome, Firefox */
    setPage(path: string | _manifest.ExtensionURL): Promise<void>;
}
/**
 * @supported Chrome, Firefox
 */
export interface Button {

}
/**
 * @supported Chrome, Firefox
 */
export const elements: ElementsPanel;
/**
 * @supported Chrome, Firefox
 */
export const sources: SourcesPanel;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function setOpenResourceHandler(callback?: ((resource: devtools.inspectedWindow.Resource) => void) | null): void;
/**
 * @supported Firefox
 */
export function openResource(url: string, lineNumber: number): Promise<void>;
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
    /**
     * The canonical hostname for this record. this value is empty if the record was not fetched with the 'canonical_name' flag.
     *
     * @supported Firefox
     */
    canonicalName?: string | undefined;
    /**
     * Record retreived with TRR.
     *
     * @supported Firefox
     */
    isTRR: string;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
export type FilenameConflictAction =
        | "uniquify"
        | "overwrite"
        | "prompt";
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type State =
        | "in_progress"
        | "interrupted"
        | "complete";
/**
 * @supported Chrome, Firefox
 */
export interface DownloadItem {
    /**
     * An identifier that is persistent across browser sessions.
     *
     * @supported Chrome, Firefox
     */
    id: number;
    /**
     * The absolute URL that this download initiated from, before any redirects.
     *
     * @supported Chrome, Firefox
     */
    url: string;
    /** @supported Chrome, Firefox */
    referrer?: string;
    /**
     * Absolute local path.
     *
     * @supported Chrome, Firefox
     */
    filename: string;
    /**
     * False if this download is recorded in the history, true if it is not recorded.
     *
     * @supported Chrome, Firefox
     */
    incognito: boolean;
    /**
     * Indication of whether this download is thought to be safe or known to be suspicious.
     *
     * @supported Chrome, Firefox
     */
    danger: DangerType;
    /** @supported Chrome, Firefox */
    mime?: string;
    /**
     * The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})})`
     *
     * @supported Chrome, Firefox
     */
    startTime: string;
    /**
     * The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})`
     *
     * @supported Chrome, Firefox
     */
    endTime?: string | undefined;
    /**
     * Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})`
     *
     * @supported Chrome, Firefox
     */
    estimatedEndTime?: string | undefined;
    /**
     * Indicates whether the download is progressing, interrupted, or complete.
     *
     * @supported Chrome, Firefox
     */
    state: State;
    /**
     * True if the download has stopped reading data from the host, but kept the connection open.
     *
     * @supported Chrome, Firefox
     */
    paused: boolean;
    /**
     * True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted.
     *
     * @supported Chrome, Firefox
     */
    canResume: boolean;
    /**
     * Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with `SERVER_`. Errors relating to the network begin with `NETWORK_`, errors relating to the process of writing the file to the file system begin with `FILE_`, and interruptions initiated by the user begin with `USER_`.
     *
     * @supported Chrome, Firefox
     */
    error?: InterruptReason | undefined;
    /**
     * Number of bytes received so far from the host, without considering file compression.
     *
     * @supported Chrome, Firefox
     */
    bytesReceived: number;
    /**
     * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    totalBytes: number;
    /**
     * Number of bytes in the whole file post-decompression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    fileSize: number;
    /**
     * Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call {@link search}() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an {@link onChanged} event will fire. Note that {@link search}() does not wait for the existence check to finish before returning, so results from {@link search}() may not accurately reflect the file system. Also, {@link search}() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds.
     *
     * @supported Chrome, Firefox
     */
    exists: boolean;
    /**
     * The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set.
     *
     * @supported Chrome, Firefox
     */
    byExtensionId?: string | undefined;
    /**
     * The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.
     *
     * @supported Chrome, Firefox
     */
    byExtensionName?: string | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface DownloadQuery {
    /**
     * This array of search terms limits results to {@link DownloadItem} whose `filename` or `url` or `finalUrl` contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.
     *
     * @supported Chrome, Firefox
     */
    query?: string[] | undefined;
    /**
     * Limits results to {@link DownloadItem} that started before the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startedBefore?: DownloadTime | undefined;
    /**
     * Limits results to {@link DownloadItem} that started after the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startedAfter?: DownloadTime | undefined;
    /**
     * Limits results to {@link DownloadItem} that ended before the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    endedBefore?: DownloadTime | undefined;
    /**
     * Limits results to {@link DownloadItem} that ended after the given ms in ISO 8601 format
     *
     * @supported Chrome, Firefox
     */
    endedAfter?: DownloadTime | undefined;
    /**
     * Limits results to {@link DownloadItem} whose `totalBytes` is greater than the given integer.
     *
     * @supported Chrome, Firefox
     */
    totalBytesGreater?: number | undefined;
    /**
     * Limits results to {@link DownloadItem} whose `totalBytes` is less than the given integer.
     *
     * @supported Chrome, Firefox
     */
    totalBytesLess?: number | undefined;
    /**
     * Limits results to {@link DownloadItem} whose `filename` matches the given regular expression.
     *
     * @supported Chrome, Firefox
     */
    filenameRegex?: string | undefined;
    /**
     * Limits results to {@link DownloadItem} whose `url` matches the given regular expression.
     *
     * @supported Chrome, Firefox
     */
    urlRegex?: string | undefined;
    /**
     * The maximum number of matching {@link DownloadItem} returned. Defaults to 1000. Set to 0 in order to return all matching {@link DownloadItem}. See {@link search} for how to page through results.
     *
     * @supported Chrome, Firefox
     */
    limit?: number | undefined;
    /**
     * Set elements of this array to {@link DownloadItem} properties in order to sort search results. For example, setting `orderBy=['startTime']` sorts the {@link DownloadItem} by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.
     *
     * @supported Chrome, Firefox
     */
    orderBy?: string[] | undefined;
    /**
     * The `id` of the {@link DownloadItem} to query.
     *
     * @supported Chrome, Firefox
     */
    id?: number | undefined;
    /**
     * The absolute URL that this download initiated from, before any redirects.
     *
     * @supported Chrome, Firefox
     */
    url?: string | undefined;
    /**
     * Absolute local path.
     *
     * @supported Chrome, Firefox
     */
    filename?: string | undefined;
    /**
     * Indication of whether this download is thought to be safe or known to be suspicious.
     *
     * @supported Chrome, Firefox
     */
    danger?: DangerType | undefined;
    /**
     * The file's MIME type.
     *
     * @supported Chrome, Firefox
     */
    mime?: string | undefined;
    /**
     * The time when the download began in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startTime?: string | undefined;
    /**
     * The time when the download ended in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    endTime?: string | undefined;
    /**
     * Indicates whether the download is progressing, interrupted, or complete.
     *
     * @supported Chrome, Firefox
     */
    state?: State | undefined;
    /**
     * True if the download has stopped reading data from the host, but kept the connection open.
     *
     * @supported Chrome, Firefox
     */
    paused?: boolean | undefined;
    /**
     * Why a download was interrupted.
     *
     * @supported Chrome, Firefox
     */
    error?: InterruptReason | undefined;
    /**
     * Number of bytes received so far from the host, without considering file compression.
     *
     * @supported Chrome, Firefox
     */
    bytesReceived?: number | undefined;
    /**
     * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    totalBytes?: number | undefined;
    /**
     * Number of bytes in the whole file post-decompression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    fileSize?: number | undefined;
    /**
     * Whether the downloaded file exists;
     *
     * @supported Chrome, Firefox
     */
    exists?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface StringDelta {
    /** @supported Chrome, Firefox */
    previous?: string | undefined;
    /** @supported Chrome, Firefox */
    current?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface DoubleDelta {
    /** @supported Chrome, Firefox */
    previous?: number | undefined;
    /** @supported Chrome, Firefox */
    current?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface BooleanDelta {
    /** @supported Chrome, Firefox */
    previous?: boolean | undefined;
    /** @supported Chrome, Firefox */
    current?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const onCreated: WebExtEvent<(downloadItem: DownloadItem) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onErased: WebExtEvent<(downloadId: number) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onChanged: WebExtEvent<(downloadDelta: _OnChangedDownloadDelta) => void>;
/**
 * @supported Firefox
 */
export function download(options: _DownloadOptions): Promise<number>;
/**
 * @supported Chrome, Firefox
 */
export function search(

      query: DownloadQuery,
    ): Promise<DownloadItem[]>;
/**
 * @supported Chrome, Firefox
 */
export function pause(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function resume(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function cancel(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function getFileIcon(downloadId: number, options?: _GetFileIconOptions): Promise<string>;
/**
 * @supported Chrome, Firefox
 */
export function open(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function show(downloadId: number): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function showDefaultFolder(): void;
/**
 * @supported Chrome, Firefox
 */
export function erase(

      query: DownloadQuery,
    ): Promise<number[]>;
/**
 * @supported Chrome, Firefox
 */
export function removeFile(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function acceptDanger(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function setShelfEnabled(

      enabled: boolean,
    ): void;
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
    /**
     * Name of the HTTP header.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * Value of the HTTP header.
     *
     * @supported Firefox
     */
    value: string;
}
/**
 * @supported Firefox
 */
export interface _DownloadOptions {
    /**
     * The URL to download.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * A file path relative to the Downloads directory to contain the downloaded file.
     *
     * @supported Firefox
     */
    filename?: string | undefined;
    /**
     * Whether to associate the download with a private browsing session.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity; requires "cookies" permission.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /** @supported Firefox */
    conflictAction?: FilenameConflictAction | undefined;
    /**
     * Use a file-chooser to allow the user to select a filename. If the option is not specified, the file chooser will be shown only if the Firefox "Always ask you where to save files" option is enabled (i.e. the pref `browser.download.useDownloadDir` is set to `false`).
     *
     * @supported Firefox
     */
    saveAs?: boolean | undefined;
    /**
     * The HTTP method to use if the URL uses the HTTP[S] protocol.
     *
     * @supported Firefox
     */
    method?: _DownloadOptionsMethod | undefined;
    /**
     * Extra HTTP headers to send with the request if the URL uses the HTTP[s] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest.
     *
     * @supported Firefox
     */
    headers?: _DownloadOptionsHeaders[] | undefined;
    /**
     * Post body.
     *
     * @supported Firefox
     */
    body?: string | undefined;
    /**
     * When this flag is set to `true`, then the browser will allow downloads to proceed after encountering HTTP errors such as `404 Not Found`.
     *
     * @supported Firefox
     */
    allowHttpErrors?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetFileIconOptions {
    /**
     * The size of the icon. The returned icon will be square with dimensions size * size pixels. The default size for the icon is 32x32 pixels.
     *
     * @supported Firefox
     */
    size?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangedDownloadDelta {
    /**
     * The `id` of the DownloadItem that changed.
     *
     * @supported Firefox
     */
    id: number;
    /**
     * Describes a change in a DownloadItem's `url`.
     *
     * @supported Firefox
     */
    url?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `filename`.
     *
     * @supported Firefox
     */
    filename?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `danger`.
     *
     * @supported Firefox
     */
    danger?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `mime`.
     *
     * @supported Firefox
     */
    mime?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `startTime`.
     *
     * @supported Firefox
     */
    startTime?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `endTime`.
     *
     * @supported Firefox
     */
    endTime?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `state`.
     *
     * @supported Firefox
     */
    state?: StringDelta | undefined;
    /** @supported Firefox */
    canResume?: BooleanDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `paused`.
     *
     * @supported Firefox
     */
    paused?: BooleanDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `error`.
     *
     * @supported Firefox
     */
    error?: StringDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `totalBytes`.
     *
     * @supported Firefox
     */
    totalBytes?: DoubleDelta | undefined;
    /**
     * Describes a change in a DownloadItem's `fileSize`.
     *
     * @supported Firefox
     */
    fileSize?: DoubleDelta | undefined;
    /** @supported Firefox */
    exists?: BooleanDelta | undefined;
}
/**
 * @supported Firefox
 */
export function drag(downloadId: number): void;

}

export namespace events {
/**
 * @supported Chrome, Firefox
 */
export interface Rule<C = unknown, A = unknown> {
    /** @supported Chrome, Firefox */
    id?: string;
    /** @supported Chrome, Firefox */
    tags?: string[];
    /** @supported Chrome, Firefox */
    conditions: C[];
    /** @supported Chrome, Firefox */
    actions: A[];
    /** @supported Chrome, Firefox */
    priority?: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface Event<H extends (...args: /* TODO: Upstream type uses any */ any[]) => /* TODO: Upstream type uses any */ any, C = void, A = void> {
    /** @supported Chrome, Firefox */
    addListener(callback: H): void;
    /** @supported Chrome, Firefox */
    removeListener(callback: H): void;
    /** @supported Chrome, Firefox */
    hasListener(callback: H): boolean;
    /** @supported Chrome, Firefox */
    hasListeners(): boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface UrlFilter {
    /**
     * Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.
     *
     * @supported Chrome, Firefox
     */
    hostContains?: string | undefined;
    /**
     * Matches if the host name of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostEquals?: string | undefined;
    /**
     * Matches if the host name of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostPrefix?: string | undefined;
    /**
     * Matches if the host name of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostSuffix?: string | undefined;
    /**
     * Matches if the path segment of the URL contains a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathContains?: string | undefined;
    /**
     * Matches if the path segment of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathEquals?: string | undefined;
    /**
     * Matches if the path segment of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathPrefix?: string | undefined;
    /**
     * Matches if the path segment of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathSuffix?: string | undefined;
    /**
     * Matches if the query segment of the URL contains a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryContains?: string | undefined;
    /**
     * Matches if the query segment of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryEquals?: string | undefined;
    /**
     * Matches if the query segment of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryPrefix?: string | undefined;
    /**
     * Matches if the query segment of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    querySuffix?: string | undefined;
    /**
     * Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlContains?: string | undefined;
    /**
     * Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlEquals?: string | undefined;
    /**
     * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
     *
     * @supported Chrome, Firefox
     */
    urlMatches?: string | undefined;
    /**
     * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
     *
     * @supported Chrome, Firefox
     */
    originAndPathMatches?: string | undefined;
    /**
     * Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlPrefix?: string | undefined;
    /**
     * Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlSuffix?: string | undefined;
    /**
     * Matches if the scheme of the URL is equal to any of the schemes specified in the array.
     *
     * @supported Chrome, Firefox
     */
    schemes?: string[] | undefined;
    /**
     * Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200.
     *
     * @supported Chrome, Firefox
     */
    ports?: Array<number | [number, number]> | undefined;
}

}

export namespace extension {
/**
 * @supported Chrome, Firefox
 */
export type ViewType =
        | "tab"
        | "popup"
        | "sidebar";
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function isAllowedIncognitoAccess(): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function isAllowedFileSchemeAccess(): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function setUpdateUrlData(

      data: string,
    ): void;
/**
 * @supported Firefox
 */
export interface _LastError {
    /**
     * Description of the error that has taken place.
     *
     * @supported Firefox
     */
    message: string;
}
/**
 * @supported Firefox
 */
export interface _GetViewsFetchProperties {
    /**
     * The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'popup', 'sidebar'.
     *
     * @supported Firefox
     */
    type?: ViewType | undefined;
    /**
     * The window to restrict the search to. If omitted, returns all views.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * Find a view according to a tab id. If this field is omitted, returns all views.
     *
     * @supported Firefox
     */
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
/**
 * @supported Firefox
 */
export const onRequest: | WebExtEvent<(request: /* TODO: Upstream type uses any */ any, sender: runtime.MessageSender, sendResponse: (response?: /* TODO: Upstream type uses any */ any) => void) => void>
        | undefined;
/**
 * @supported Firefox
 */
export const onRequestExternal: | WebExtEvent<(request: /* TODO: Upstream type uses any */ any, sender: runtime.MessageSender, sendResponse: (response?: /* TODO: Upstream type uses any */ any) => void) => void>
        | undefined;

}

export namespace extensionTypes {
/**
 * @supported Chrome, Firefox
 */
export type ImageDataType = globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray };
/**
 * @supported Chrome, Firefox
 */
export type ImageFormat = "jpeg" | "png";
/**
 * @supported Chrome, Firefox
 */
export interface ImageDetails {
    /**
     * The format of the resulting image. Default is `"jpeg"`.
     *
     * @supported Chrome, Firefox
     */
    format?: ImageFormat | undefined;
    /**
     * When format is `"jpeg"`, controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
     *
     * @supported Chrome, Firefox
     */
    quality?: number | undefined;
    /**
     * The area of the document to capture, in CSS pixels, relative to the page. If omitted, capture the visible viewport.
     *
     * @supported Firefox
     */
    rect?: _ImageDetailsRect | undefined;
    /**
     * The scale of the resulting image. Defaults to `devicePixelRatio`.
     *
     * @supported Firefox
     */
    scale?: number | undefined;
    /**
     * If true, temporarily resets the scroll position of the document to 0. Only takes effect if rect is also specified.
     *
     * @supported Firefox
     */
    resetScrollPosition?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export type RunAt =
        | "document_start"
        | "document_end"
        | "document_idle";
/**
 * @supported Chrome, Firefox
 */
export type CSSOrigin = "user" | "author";
/**
 * @supported Chrome, Firefox
 */
export interface InjectDetails {
    /**
     * JavaScript or CSS code to inject.
     *
     *
     * **Warning:** Be careful using the `code` parameter. Incorrect use of it may open your extension to [cross site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks
     *
     * @supported Chrome, Firefox
     */
    code?: string | undefined;
    /**
     * JavaScript or CSS file to inject.
     *
     * @supported Chrome, Firefox
     */
    file?: string | undefined;
    /**
     * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame. If `true` and `frameId` is set, then the code is inserted in the selected frame and all of its child frames.
     *
     * @supported Chrome, Firefox
     */
    allFrames?: boolean | undefined;
    /**
     * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) where the script or CSS should be injected. Defaults to 0 (the top-level frame).
     *
     * @since Chrome 50
     *
     * @supported Chrome, Firefox
     */
    frameId?: number | undefined;
    /**
     * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
     *
     * @supported Chrome, Firefox
     */
    matchAboutBlank?: boolean | undefined;
    /**
     * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document\_idle".
     *
     * @supported Chrome, Firefox
     */
    runAt?: RunAt | undefined;
    /**
     * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to `"author"`.
     *
     * @since Chrome 66
     *
     * @supported Chrome, Firefox
     */
    cssOrigin?: CSSOrigin | undefined;
}
/**
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
    x: number;
    /** @supported Firefox */
    y: number;
    /** @supported Firefox */
    width: number;
    /** @supported Firefox */
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
    /** @supported Firefox */
    [key: string]: PlainJSONValue;
}

}

export namespace history {
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export interface HistoryItem {
    /**
     * The unique identifier for the item.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * The URL navigated to by a user.
     *
     * @supported Chrome, Firefox
     */
    url?: string | undefined;
    /**
     * The title of the page when it was last loaded.
     *
     * @supported Chrome, Firefox
     */
    title?: string | undefined;
    /**
     * When this page was last loaded, represented in milliseconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    lastVisitTime?: number | undefined;
    /**
     * The number of times the user has navigated to this page.
     *
     * @supported Chrome, Firefox
     */
    visitCount?: number | undefined;
    /**
     * The number of times the user has navigated to this page by typing in the address.
     *
     * @supported Chrome, Firefox
     */
    typedCount?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface VisitItem {
    /**
     * The unique identifier for the corresponding {@link history.HistoryItem}.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * The unique identifier for this visit.
     *
     * @supported Chrome, Firefox
     */
    visitId: string;
    /**
     * When this visit occurred, represented in milliseconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    visitTime?: number | undefined;
    /**
     * The visit ID of the referrer.
     *
     * @supported Chrome, Firefox
     */
    referringVisitId: string;
    /**
     * The [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) for this visit from its referrer.
     *
     * @supported Chrome, Firefox
     */
    transition: TransitionType;
}
/**
 * @supported Chrome, Firefox
 */
export const onVisited: WebExtEvent<(result: HistoryItem) => void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function deleteAll(): Promise<void>;
/**
 * @supported Firefox
 */
export interface _SearchQuery {
    /**
     * A free-text query to the history service. Leave empty to retrieve all pages.
     *
     * @supported Firefox
     */
    text: string;
    /**
     * Limit results to those visited after this date. If not specified, this defaults to 24 hours in the past.
     *
     * @supported Firefox
     */
    startTime?: extensionTypes.Date | undefined;
    /**
     * Limit results to those visited before this date.
     *
     * @supported Firefox
     */
    endTime?: extensionTypes.Date | undefined;
    /**
     * The maximum number of results to retrieve. Defaults to 100.
     *
     * @supported Firefox
     */
    maxResults?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetVisitsDetails {
    /**
     * The URL for which to retrieve visit information. It must be in the format as returned from a call to history.search.
     *
     * @supported Firefox
     */
    url: string;
}
/**
 * @supported Firefox
 */
export interface _AddUrlDetails {
    /**
     * The URL to add. Must be a valid URL that can be added to history.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The title of the page.
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * The transition type for this visit from its referrer.
     *
     * @supported Firefox
     */
    transition?: TransitionType | undefined;
    /**
     * The date when this visit occurred.
     *
     * @supported Firefox
     */
    visitTime?: extensionTypes.Date | undefined;
}
/**
 * @supported Firefox
 */
export interface _DeleteUrlDetails {
    /**
     * The URL to remove.
     *
     * @supported Firefox
     */
    url: string;
}
/**
 * @supported Firefox
 */
export interface _DeleteRangeRange {
    /**
     * Items added to history after this date.
     *
     * @supported Firefox
     */
    startTime: extensionTypes.Date;
    /**
     * Items added to history before this date.
     *
     * @supported Firefox
     */
    endTime: extensionTypes.Date;
}
/**
 * @supported Firefox
 */
export interface _OnVisitRemovedRemoved {
    /**
     * True if all history was removed. If true, then urls will be empty.
     *
     * @supported Firefox
     */
    allHistory: boolean;
    /** @supported Firefox */
    urls: string[];
}
/**
 * @supported Firefox
 */
export interface _OnTitleChangedChanged {
    /**
     * The URL for which the title has changed
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The new title for the URL.
     *
     * @supported Firefox
     */
    title: string;
}
/**
 * @supported Firefox
 */
export const onTitleChanged: WebExtEvent<(changed: _OnTitleChangedChanged) => void>;

}

export namespace i18n {
/**
 * @supported Chrome, Firefox
 */
export type LanguageCode = string;
/**
 * @supported Chrome, Firefox
 */
export function getAcceptLanguages(): Promise<LanguageCode[]>;
/**
 * @supported Chrome, Firefox
 */
export function getMessage(messageName: string, substitutions?: string | number | (string | number)[]): string;
/**
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
    language: LanguageCode;
    /**
     * The percentage of the detected language
     *
     * @supported Firefox
     */
    percentage: number;
}
/**
 * @supported Firefox
 */
export interface _DetectLanguageReturnResult {
    /**
     * CLD detected language reliability
     *
     * @supported Firefox
     */
    isReliable: boolean;
    /**
     * array of detectedLanguage
     *
     * @supported Firefox
     */
    languages: _DetectLanguageReturnResultLanguages[];
}
/**
 * @supported Firefox
 */
export function getPreferredSystemLanguages(): Promise<LanguageCode[]>;

}

export namespace identity {
/**
 * @supported Chrome, Firefox
 */
export interface AccountInfo {
    /**
     * A unique identifier for the account. This ID will not change for the lifetime of the account.
     *
     * @supported Chrome, Firefox
     */
    id: string;
}
/**
 * @supported Chrome, Firefox
 */
export const onSignInChanged: events.Event<(account: AccountInfo, signedIn: boolean) => void>;
/**
 * @supported Chrome, Firefox
 */
export function getAccounts(): Promise<AccountInfo[]>;
/**
 * @supported Firefox
 */
export function getAuthToken(details?: _GetAuthTokenDetails): Promise<string>;
/**
 * @supported Firefox
 */
export function getProfileUserInfo(): Promise<_GetProfileUserInfoReturnUserinfo>;
/**
 * @supported Firefox
 */
export function removeCachedAuthToken(
        details: _RemoveCachedAuthTokenDetails,
    ): Promise<_RemoveCachedAuthTokenReturnUserinfo>;
/**
 * @supported Firefox
 */
export function launchWebAuthFlow(details: _LaunchWebAuthFlowDetails): Promise<string>;
/**
 * @supported Chrome, Firefox
 */
export function getRedirectURL(

      path?: string,
    ): string;
/**
 * @supported Firefox
 */
export interface _GetAuthTokenDetails {
    /** @supported Firefox */
    interactive?: boolean | undefined;
    /** @supported Firefox */
    account?: AccountInfo | undefined;
    /** @supported Firefox */
    scopes?: string[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetProfileUserInfoReturnUserinfo {
    /** @supported Firefox */
    email: string;
    /** @supported Firefox */
    id: string;
}
/**
 * @supported Firefox
 */
export interface _RemoveCachedAuthTokenReturnUserinfo {
    /** @supported Firefox */
    email: string;
    /** @supported Firefox */
    id: string;
}
/**
 * @supported Firefox
 */
export interface _RemoveCachedAuthTokenDetails {
    /** @supported Firefox */
    token: string;
}
/**
 * @supported Firefox
 */
export interface _LaunchWebAuthFlowDetails {
    /** @supported Firefox */
    url: _manifest.HttpURL;
    /** @supported Firefox */
    interactive?: boolean | undefined;
}

}

export namespace idle {
/**
 * @supported Chrome, Firefox
 */
export type IdleState = "active" | "idle";
/**
 * @supported Chrome, Firefox
 */
export const onStateChanged: WebExtEvent<(newState: IdleState) => void>;
/**
 * @supported Chrome, Firefox
 */
export function queryState(

      detectionIntervalInSeconds: number,
    ): Promise<IdleState>;
/**
 * @supported Chrome, Firefox
 */
export function setDetectionInterval(

      intervalInSeconds: number,
    ): void;

}

export namespace management {
/**
 * @supported Chrome, Firefox
 */
export interface IconInfo {
    /**
     * A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16.
     *
     * @supported Chrome, Firefox
     */
    size: number;
    /**
     * The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append `?grayscale=true` to the URL.
     *
     * @supported Chrome, Firefox
     */
    url: string;
}
/**
 * @supported Chrome, Firefox
 */
export type ExtensionDisabledReason = "unknown" | "permissions_increase";
/**
 * @supported Chrome, Firefox
 */
export type ExtensionType = "extension" | "theme";
/**
 * @supported Chrome, Firefox
 */
export type ExtensionInstallType =
        | "development"
        | "normal"
        | "sideload"
        | "admin"
        | "other";
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionInfo {
    /**
     * The extension's unique identifier.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * The name of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    name: string;
    /** @supported Chrome, Firefox */
    shortName?: string;
    /**
     * The description of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    description: string;
    /**
     * The [version](https://developer.chrome.com/docs/extensions/reference/manifest/version) of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    version: string;
    /**
     * The [version name](https://developer.chrome.com/docs/extensions/reference/manifest/version#version_name) of this extension, app, or theme if the manifest specified one.
     *
     * @since Chrome 50
     *
     * @supported Chrome, Firefox
     */
    versionName?: string | undefined;
    /**
     * Whether this extension can be disabled or uninstalled by the user.
     *
     * @supported Chrome, Firefox
     */
    mayDisable: boolean;
    /**
     * Whether it is currently enabled or disabled.
     *
     * @supported Chrome, Firefox
     */
    enabled: boolean;
    /**
     * A reason the item is disabled.
     *
     * @supported Chrome, Firefox
     */
    disabledReason?: ExtensionDisabledReason | undefined;
    /**
     * The type of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    type: ExtensionType;
    /**
     * The URL of the homepage of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    homepageUrl?: string | undefined;
    /**
     * The update URL of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    updateUrl?: string | undefined;
    /**
     * The url for the item's options page, if it has one.
     *
     * @supported Chrome, Firefox
     */
    optionsUrl: string;
    /**
     * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the [manifest documentation on icons](https://developer.chrome.com/docs/extensions/reference/manifest/icons) for more details.
     *
     * @supported Chrome, Firefox
     */
    icons?: IconInfo[] | undefined;
    /** @supported Chrome, Firefox */
    permissions?: string[];
    /** @supported Chrome, Firefox */
    hostPermissions?: string[];
    /**
     * How the extension was installed.
     *
     * @supported Chrome, Firefox
     */
    installType: ExtensionInstallType;
}
/**
 * @supported Chrome, Firefox
 */
export const onInstalled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUninstalled: events.Event<(info: ExtensionInfo) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onEnabled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onDisabled: WebExtEvent<(info: ExtensionInfo) => void>;
/**
 * @supported Chrome, Firefox
 */
export function getAll(): Promise<ExtensionInfo[]>;
/**
 * @supported Firefox
 */
export function get(id: _manifest.ExtensionID): Promise<ExtensionInfo>;
/**
 * @supported Chrome, Firefox
 */
export function getSelf(): Promise<ExtensionInfo>;
/**
 * @supported Chrome, Firefox
 */
export function setEnabled(

      id: string,

      enabled: boolean,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function uninstallSelf(options?: _UninstallSelfOptions): Promise<void>;
/**
 * @supported Firefox
 */
export interface _InstallReturnResult {
    /** @supported Firefox */
    id: _manifest.ExtensionID;
}
/**
 * @supported Firefox
 */
export interface _InstallOptions {
    /**
     * URL pointing to the XPI file on addons.mozilla.org or similar.
     *
     * @supported Firefox
     */
    url: _manifest.HttpURL;
    /**
     * A hash of the XPI file, using sha256 or stronger.
     *
     * @supported Firefox
     */
    hash?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UninstallSelfOptions {
    /**
     * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false.
     *
     * @supported Firefox
     */
    showConfirmDialog?: boolean | undefined;
    /**
     * The message to display to a user when being asked to confirm removal of the extension.
     *
     * @supported Firefox
     */
    dialogMessage?: string | undefined;
}
/**
 * @supported Firefox
 */
export function install(options: _InstallOptions): Promise<_InstallReturnResult>;

}

export namespace notifications {
/**
 * @supported Chrome, Firefox
 */
export type TemplateType =
        | "basic"
        | "image"
        | "list"
        | "progress";
/**
 * @supported Chrome, Firefox
 */
export type PermissionLevel = "granted" | "denied";
/**
 * @supported Chrome, Firefox
 */
export interface NotificationItem {
    /**
     * Title of one item of a list notification.
     *
     * @supported Chrome, Firefox
     */
    title: string;
    /**
     * Additional details about this item.
     *
     * @supported Chrome, Firefox
     */
    message: string;
}
/**
 * @supported Chrome, Firefox
 */
export const onClosed: WebExtEvent<(notificationId: string, byUser: boolean) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onClicked: WebExtEvent<(notificationId: string) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onButtonClicked: WebExtEvent<(notificationId: string, buttonIndex: number) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onPermissionLevelChanged: events.Event<(level: PermissionLevel) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onShowSettings: events.Event<() => void>;
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
export function update(notificationId: string, options: UpdateNotificationOptions): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function clear(

      notificationId: string,
    ): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function getAll(): Promise<Record<string, boolean | NotificationOptions>>;
/**
 * @supported Chrome, Firefox
 */
export function getAll(callback: (notifications: Record<string, boolean | NotificationOptions>) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function getPermissionLevel(): Promise<PermissionLevel>;
/**
 * @supported Chrome, Firefox
 */
export interface CreateNotificationOptions {
    /** @supported Chrome, Firefox */
    type: TemplateType;
    /** @supported Chrome, Firefox */
    title: string;
    /** @supported Chrome, Firefox */
    message: string;
    /** @supported Chrome, Firefox */
    iconUrl?: string;
    /** @supported Chrome, Firefox */
    appIconMaskUrl?: string;
    /** @supported Chrome, Firefox */
    contextMessage?: string;
    /** @supported Chrome, Firefox */
    priority?: number;
    /** @supported Chrome, Firefox */
    eventTime?: number;
    /** @supported Chrome, Firefox */
    isClickable?: boolean;
    /** @supported Chrome, Firefox */
    items?: NotificationItem[];
    /** @supported Chrome, Firefox */
    progress?: number;
    /** @supported Chrome, Firefox */
    imageUrl?: string;
}
/**
 * @supported Firefox
 */
export interface UpdateNotificationOptions {
    /** @supported Firefox */
    type?: TemplateType;
    /** @supported Firefox */
    title?: string;
    /** @supported Firefox */
    message?: string;
    /** @supported Firefox */
    iconUrl?: string;
    /** @supported Firefox */
    appIconMaskUrl?: string;
    /** @supported Firefox */
    contextMessage?: string;
    /** @supported Firefox */
    priority?: number;
    /** @supported Firefox */
    eventTime?: number;
    /** @supported Firefox */
    isClickable?: boolean;
    /** @supported Firefox */
    items?: NotificationItem[];
    /** @supported Firefox */
    progress?: number;
    /** @supported Firefox */
    imageUrl?: string;
}
/**
 * @supported Firefox
 */
export interface _CreateNotificationOptionsButtons {
    /** @supported Firefox */
    title: string;
    /** @supported Firefox */
    iconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateNotificationOptionsButtons {
    /** @supported Firefox */
    title: string;
    /** @supported Firefox */
    iconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export const onShown: WebExtEvent<(notificationId: string) => void>;

}

export namespace omnibox {
/**
 * @supported Chrome, Firefox
 */
export type DescriptionStyleType =
        | "url"
        | "match"
        | "dim";
/**
 * @supported Chrome, Firefox
 */
export type OnInputEnteredDisposition =
        | "currentTab"
        | "newForegroundTab"
        | "newBackgroundTab";
/**
 * @supported Chrome, Firefox
 */
export interface SuggestResult {
    /** @supported Chrome, Firefox */
    description: string;
    /** @supported Chrome, Firefox */
    content: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface DefaultSuggestResult {
    /** @supported Chrome, Firefox */
    description: string;
}
/**
 * @supported Chrome, Firefox
 */
export const onInputStarted: WebExtEvent<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputChanged: WebExtEvent<(text: string, suggest: (suggestResults: SuggestResult[]) => void) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputEntered: WebExtEvent<(text: string, disposition: OnInputEnteredDisposition) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputCancelled: WebExtEvent<() => void>;
/**
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
    offset: number;
    /**
     * The style type
     *
     * @supported Firefox
     */
    type: DescriptionStyleType;
    /** @supported Firefox */
    length?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SuggestResultDescriptionStylesRaw {
    /** @supported Firefox */
    offset: number;
    /** @supported Firefox */
    type: number;
}
/**
 * @supported Firefox
 */
export interface _DefaultSuggestResultDescriptionStyles {
    /** @supported Firefox */
    offset: number;
    /**
     * The style type
     *
     * @supported Firefox
     */
    type: DescriptionStyleType;
    /** @supported Firefox */
    length?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _DefaultSuggestResultDescriptionStylesRaw {
    /** @supported Firefox */
    offset: number;
    /** @supported Firefox */
    type: number;
}

}

export namespace permissions {
/**
 * @supported Chrome, Firefox
 */
export interface Permissions {
    /**
     * List of named permissions (does not include hosts or origins).
     *
     * @supported Chrome, Firefox
     */
    permissions?: _manifest.OptionalPermission[] | _manifest.OptionalOnlyPermission[] | undefined;
    /**
     * The list of host permissions, including those specified in the `optional_permissions` or `permissions` keys in the manifest, and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
     *
     * @supported Chrome, Firefox
     */
    origins?: _manifest.MatchPattern[] | undefined;
    /** @supported Firefox */
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const onAdded: WebExtEvent<(permissions: Permissions) => void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function request(

      permissions: Permissions,
    ): Promise<boolean>;
/**
 * @supported Chrome, Firefox
 */
export function remove(

      permissions: Permissions,
    ): Promise<boolean>;
/**
 * @supported Firefox
 */
export interface AnyPermissions {
    /** @supported Firefox */
    permissions?: _manifest.Permission[] | _manifest.OptionalOnlyPermission[] | undefined;
    /** @supported Firefox */
    origins?: _manifest.MatchPattern[] | undefined;
    /** @supported Firefox */
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}

}

export namespace proxy {
/**
 * @supported Chrome, Firefox
 */
export interface ProxyConfig {
    /**
     * The type of proxy to use.
     *
     * @supported Firefox
     */
    proxyType?: _ProxyConfigProxyType | undefined;
    /**
     * The address of the http proxy, can include a port.
     *
     * @supported Firefox
     */
    http?: string | undefined;
    /**
     * Use the http proxy server for all protocols.
     *
     * @supported Firefox
     */
    httpProxyAll?: boolean | undefined;
    /**
     * The address of the ftp proxy, can include a port. Deprecated since Firefox 88.
     * @deprecated The address of the ftp proxy, can include a port. Deprecated since Firefox 88.
     *
     * @supported Firefox
     */
    ftp?: string | undefined;
    /**
     * The address of the ssl proxy, can include a port.
     *
     * @supported Firefox
     */
    ssl?: string | undefined;
    /**
     * The address of the socks proxy, can include a port.
     *
     * @supported Firefox
     */
    socks?: string | undefined;
    /**
     * The version of the socks proxy.
     *
     * @supported Firefox
     */
    socksVersion?: number | undefined;
    /**
     * A list of hosts which should not be proxied.
     *
     * @supported Firefox
     */
    passthrough?: string | undefined;
    /**
     * A URL to use to configure the proxy.
     *
     * @supported Firefox
     */
    autoConfigUrl?: string | undefined;
    /**
     * Do not prompt for authentication if password is saved.
     *
     * @supported Firefox
     */
    autoLogin?: boolean | undefined;
    /**
     * Proxy DNS when using SOCKS. DNS queries get leaked to the network when set to false. True by default for SOCKS v5. False by default for SOCKS v4.
     *
     * @supported Firefox
     */
    proxyDNS?: boolean | undefined;
    /**
     * If true (the default value), do not use newer TLS protocol features that might have interoperability problems on the Internet. This is intended only for use with critical infrastructure like the updates, and is only available to privileged addons.
     *
     * @supported Firefox
     */
    respectBeConservative?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
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
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: webRequest.ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * Indicates if this response was fetched from disk cache.
     *
     * @supported Firefox
     */
    fromCache: boolean;
    /**
     * The HTTP request headers that are going to be sent out with this request.
     *
     * @supported Firefox
     */
    requestHeaders?: webRequest.HttpHeaders | undefined;
    /**
     * Url classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification: webRequest.UrlClassification;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _ProxyOnRequestEvent<TCallback = (details: _OnRequestDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: webRequest.RequestFilter, extraInfoSpec?: Array<"requestHeaders">): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
export interface Port {
    /** @supported Chrome, Firefox */
    name: string;
    /** @supported Chrome, Firefox */
    disconnect(): void;
    /** @supported Chrome, Firefox */
    postMessage(message: unknown): void;
    /** @supported Chrome, Firefox */
    sender?: MessageSender;
    /** @supported Chrome, Firefox */
    onDisconnect: events.Event<(port: Port) => void>;
    /** @supported Chrome, Firefox */
    onMessage: events.Event<(message: unknown, port: Port) => void>;
}
/**
 * @supported Chrome, Firefox
 */
export interface MessageSender {
    /** @supported Chrome, Firefox */
    documentId?: string;
    /** @supported Chrome, Firefox */
    frameId?: number;
    /** @supported Chrome, Firefox */
    id?: string;
    /** @supported Chrome, Firefox */
    tab?: tabs.Tab;
    /** @supported Chrome, Firefox */
    url?: string;
    /** @supported Firefox */
    userScriptWorldId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export type PlatformOs =
        | "mac"
        | "win"
        | "android"
        | "cros"
        | "linux"
        | "openbsd";
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type PlatformNaclArch =
        | "arm"
        | "x86-32"
        | "x86-64";
/**
 * @supported Chrome, Firefox
 */
export interface PlatformInfo {
    /** @supported Chrome, Firefox */
    arch: PlatformArch;
    /** @supported Chrome, Firefox */
    os: PlatformOs;
}
/**
 * @supported Chrome, Firefox
 */
export type RequestUpdateCheckStatus =
        | "throttled"
        | "no_update"
        | "update_available";
/**
 * @supported Chrome, Firefox
 */
export type OnInstalledReason =
        | "install"
        | "update"
        | "browser_update";
/**
 * @supported Chrome, Firefox
 */
export type OnRestartRequiredReason =
        | "app_update"
        | "os_update"
        | "periodic";
/**
 * @supported Chrome, Firefox
 */
export type ContextType =
        | "BACKGROUND"
        | "POPUP"
        | "SIDE_PANEL"
        | "TAB";
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionContext {
    /**
     * The type of context this corresponds to.
     *
     * @supported Chrome, Firefox
     */
    contextType: ContextType;
    /**
     * A unique identifier for this context
     *
     * @supported Chrome, Firefox
     */
    contextId: string;
    /**
     * The ID of the tab for this context, or -1 if this context is not hosted in a tab.
     *
     * @supported Chrome, Firefox
     */
    tabId: number;
    /**
     * The ID of the window for this context, or -1 if this context is not hosted in a window.
     *
     * @supported Chrome, Firefox
     */
    windowId: number;
    /**
     * A UUID for the document associated with this context, or undefined if this context is hosted not in a document.
     *
     * @supported Chrome, Firefox
     */
    documentId?: string | undefined;
    /**
     * The ID of the frame for this context, or -1 if this context is not hosted in a frame.
     *
     * @supported Chrome, Firefox
     */
    frameId: number;
    /**
     * The URL of the document associated with this context, or undefined if the context is not hosted in a document.
     *
     * @supported Chrome, Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The origin of the document associated with this context, or undefined if the context is not hosted in a document.
     *
     * @supported Chrome, Firefox
     */
    documentOrigin?: string | undefined;
    /**
     * Whether the context is associated with an incognito profile.
     *
     * @supported Chrome, Firefox
     */
    incognito: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface ContextFilter {
    /** @supported Chrome, Firefox */
    contextTypes?: ContextType[] | undefined;
    /** @supported Chrome, Firefox */
    contextIds?: string[] | undefined;
    /** @supported Chrome, Firefox */
    tabIds?: number[] | undefined;
    /** @supported Chrome, Firefox */
    windowIds?: number[] | undefined;
    /** @supported Chrome, Firefox */
    documentIds?: string[] | undefined;
    /** @supported Chrome, Firefox */
    frameIds?: number[] | undefined;
    /** @supported Chrome, Firefox */
    documentUrls?: string[] | undefined;
    /** @supported Chrome, Firefox */
    documentOrigins?: string[] | undefined;
    /** @supported Chrome, Firefox */
    incognito?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const id: string;
/**
 * @supported Chrome, Firefox
 */
export const onStartup: WebExtEvent<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInstalled: events.Event<(details: { reason: OnInstalledReason; previousVersion?: string; id?: string }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onSuspend: WebExtEvent<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onSuspendCanceled: WebExtEvent<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUpdateAvailable: events.Event<(details: UpdateAvailableDetails) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onBrowserUpdateAvailable: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onConnect: WebExtEvent<(port: Port) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onConnectExternal: WebExtEvent<(port: Port) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUserScriptConnect: WebExtEvent<(port: Port) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome, Firefox
 */
export const onMessageExternal: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome, Firefox
 */
export const onUserScriptMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome, Firefox
 */
export const onRestartRequired: events.Event<(reason: OnRestartRequiredReason) => void>;
/**
 * @supported Firefox
 */
export function getBackgroundPage(): Promise<Window>;
/**
 * @supported Chrome, Firefox
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getManifest(): _manifest.WebExtensionManifest;
/**
 * @supported Chrome, Firefox
 */
export function getURL(

      path: string,
    ): string;
/**
 * @supported Firefox
 */
export function setUninstallURL(url?: string): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function reload(): void;
/**
 * @supported Firefox
 */
export function requestUpdateCheck(): Promise<object>;
/**
 * @supported Chrome, Firefox
 */
export function restart(): void;
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
 * @supported Chrome, Firefox
 */
export function connectNative(

      application: string,
    ): Port;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options: _SendMessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options: _SendMessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options?: _SendMessageOptions): Promise<R>;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options?: _SendMessageOptions): Promise<R>;
/**
 * @supported Chrome, Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M): Promise<R>;
/**
 * @supported Chrome, Firefox
 */
export function getPlatformInfo(): Promise<PlatformInfo>;
/**
 * @supported Firefox
 */
export function getPackageDirectoryEntry(): Promise<DirectoryEntry>;
/**
 * @supported Chrome, Firefox
 */
export function getContexts(

      filter: ContextFilter,
    ): Promise<ExtensionContext[]>;
/**
 * @supported Firefox
 */
export interface BrowserInfo {
    /**
     * The name of the browser, for example 'Firefox'.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The name of the browser vendor, for example 'Mozilla'.
     *
     * @supported Firefox
     */
    vendor: string;
    /**
     * The browser's version, for example '42.0.0' or '0.8.1pre'.
     *
     * @supported Firefox
     */
    version: string;
    /**
     * The browser's build ID/date, for example '20160101'.
     *
     * @supported Firefox
     */
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
    /**
     * The performance warning event category, e.g. 'content_script'.
     *
     * @supported Firefox
     */
    category: OnPerformanceWarningCategory;
    /**
     * The performance warning event severity, e.g. 'high'.
     *
     * @supported Firefox
     */
    severity: OnPerformanceWarningSeverity;
    /**
     * The `tabs.Tab` that the performance warning relates to, if any.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * An explanation of what the warning means, and hopefully how to address it.
     *
     * @supported Firefox
     */
    description: string;
}
/**
 * @supported Firefox
 */
export interface _LastError {
    /**
     * Details about the error which occurred.
     *
     * @supported Firefox
     */
    message?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RequestUpdateCheckReturnDetails {
    /**
     * The version of the available update.
     *
     * @supported Firefox
     */
    version: string;
}
/**
 * @supported Firefox
 */
export interface _ConnectConnectInfo {
    /**
     * Will be passed into onConnect for processes that are listening for the connection event.
     *
     * @supported Firefox
     */
    name?: string | undefined;
    /**
     * Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event.
     *
     * @supported Firefox
     */
    includeTlsChannelId?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface _SendMessageOptions {

}
/**
 * @supported Firefox
 */
export type DirectoryEntry = /* TODO: Upstream type uses any */ any;
/**
 * @supported Chrome, Firefox
 */
export interface _OnInstalledDetails {
    /** @supported Chrome, Firefox */
    reason: OnInstalledReason;
    /** @supported Chrome, Firefox */
    previousVersion?: string;
    /** @supported Firefox */
    temporary: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnUpdateAvailableDetails {
    /**
     * The version number of the available update.
     *
     * @supported Firefox
     */
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
 * @supported Chrome, Firefox
 */
export interface UpdateAvailableDetails {
    /** @supported Chrome, Firefox */
    version: string;
}

}

export namespace scripting {
/**
 * @supported Chrome, Firefox
 */
export type ExecutionWorld = "ISOLATED" | "MAIN";
/**
 * @supported Chrome, Firefox
 */
export interface InjectionTarget {
    /** @supported Chrome, Firefox */
    allFrames?: boolean;
    /** @supported Chrome, Firefox */
    frameIds?: number[];
    /** @supported Chrome, Firefox */
    tabId: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface ScriptInjection<Args extends unknown[] = unknown[], R = unknown> {
    /** @supported Chrome, Firefox */
    args?: Args;
    /** @supported Chrome, Firefox */
    files?: string[];
    /** @supported Chrome, Firefox */
    func?(...args: Args): R;
    /** @supported Chrome, Firefox */
    injectImmediately?: boolean;
    /** @supported Chrome, Firefox */
    target: InjectionTarget;
    /** @supported Chrome, Firefox */
    world?: ExecutionWorld;
}
/**
 * @supported Chrome, Firefox
 */
export interface CSSInjection {
    /**
     * Details specifying the target into which to insert the CSS.
     *
     * @supported Chrome, Firefox
     */
    target: InjectionTarget;
    /**
     * A string containing the CSS to inject. Exactly one of `files` and `css` must be specified.
     *
     * @supported Chrome, Firefox
     */
    css?: string | undefined;
    /**
     * The path of the CSS files to inject, relative to the extension's root directory. Exactly one of `files` and `css` must be specified.
     *
     * @supported Chrome, Firefox
     */
    files?: string[] | undefined;
    /**
     * The style origin for the injection. Defaults to `'AUTHOR'`.
     *
     * @supported Chrome, Firefox
     */
    origin?: _CSSInjectionOrigin | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface InjectionResult<R = unknown> {
    /** @supported Chrome, Firefox */
    documentId: string;
    /** @supported Chrome, Firefox */
    frameId: number;
    /** @supported Chrome, Firefox */
    result?: R;
    /** @supported Firefox */
    error?: unknown;
}
/**
 * @supported Chrome, Firefox
 */
export interface RegisteredContentScript {
    /**
     * The id of the content script, specified in the API call. Must not start with a '\_' as it's reserved as a prefix for generated script IDs.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * Specifies which pages this content script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings. Must be specified for {@link registerContentScripts}.
     *
     * @supported Chrome, Firefox
     */
    matches?: string[] | undefined;
    /**
     * Excludes pages that this content script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome, Firefox
     */
    excludeMatches?: string[] | undefined;
    /**
     * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
     *
     * @supported Chrome, Firefox
     */
    css?: _manifest.ExtensionURL[] | undefined;
    /**
     * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
     *
     * @supported Chrome, Firefox
     */
    js?: _manifest.ExtensionURL[] | undefined;
    /**
     * If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
     *
     * @supported Chrome, Firefox
     */
    allFrames?: boolean | undefined;
    /**
     * Indicates whether the script can be injected into frames where the URL contains an unsupported scheme; specifically: about:, data:, blob:, or filesystem:. In these cases, the URL's origin is checked to determine if the script should be injected. If the origin is `null` (as is the case for data: URLs) then the used origin is either the frame that created the current frame or the frame that initiated the navigation to this frame. Note that this may not be the parent frame.
     *
     * @since Chrome 119
     *
     * @supported Chrome, Firefox
     */
    matchOriginAsFallback?: boolean | undefined;
    /**
     * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
     *
     * @supported Chrome, Firefox
     */
    runAt?: extensionTypes.RunAt | undefined;
    /**
     * Specifies if this content script will persist into future sessions. The default is true.
     *
     * @supported Chrome, Firefox
     */
    persistAcrossSessions?: boolean | undefined;
    /**
     * The JavaScript "world" to run the script in. Defaults to `ISOLATED`.
     *
     * @since Chrome 102
     *
     * @supported Chrome, Firefox
     */
    world?: extensionTypes.ExecutionWorld | undefined;
    /** @supported Firefox */
    cssOrigin?: extensionTypes.CSSOrigin;
}
/**
 * @supported Chrome, Firefox
 */
export interface ContentScriptFilter {
    /**
     * If specified, {@link getRegisteredContentScripts} will only return scripts with an id specified in this list.
     *
     * @supported Chrome, Firefox
     */
    ids?: string[] | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export function executeScript<R = unknown, Args extends unknown[] = unknown[]>(injection: ScriptInjection<Args, R>, callback?: (results: InjectionResult<Awaited<R>>[]) => void): Promise<InjectionResult<Awaited<R>>[]>;
/**
 * @supported Chrome, Firefox
 */
export function insertCSS(

      injection: CSSInjection,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function removeCSS(

      injection: CSSInjection,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function registerContentScripts(

      scripts: RegisteredContentScript[],
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getRegisteredContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<RegisteredContentScript[]>;
/**
 * @supported Chrome, Firefox
 */
export function unregisterContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<void>;
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
    /** @supported Firefox */
    id: string;
    /** @supported Firefox */
    allFrames?: boolean;
    /** @supported Firefox */
    css?: string[] | _manifest.ExtensionURL[];
    /** @supported Firefox */
    cssOrigin?: extensionTypes.CSSOrigin;
    /** @supported Firefox */
    excludeMatches?: string[];
    /** @supported Firefox */
    js?: string[] | _manifest.ExtensionURL[];
    /** @supported Firefox */
    matchOriginAsFallback?: boolean;
    /** @supported Firefox */
    matches?: string[];
    /** @supported Firefox */
    persistAcrossSessions?: boolean;
    /** @supported Firefox */
    runAt?: extensionTypes.RunAt;
    /** @supported Firefox */
    world?: ExecutionWorld;
}

}

export namespace search {
/**
 * @supported Chrome, Firefox
 */
export type Disposition = "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";
/**
 * @supported Chrome, Firefox
 */
export interface QueryInfo {
    /** @supported Chrome, Firefox */
    text: string;
    /** @supported Chrome, Firefox */
    disposition?: Disposition;
    /** @supported Chrome, Firefox */
    tabId?: number;
}
/**
 * @supported Chrome, Firefox
 */
export function query(queryInfo: QueryInfo): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function query(queryInfo: QueryInfo, callback: () => void): void;
/**
 * @supported Firefox
 */
export interface SearchEngine {
    /** @supported Firefox */
    name: string;
    /** @supported Firefox */
    isDefault: boolean;
    /** @supported Firefox */
    alias?: string | undefined;
    /** @supported Firefox */
    favIconUrl?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _SearchSearchProperties {
    /**
     * Terms to search for.
     *
     * @supported Firefox
     */
    query: string;
    /**
     * Search engine to use. Uses the default if not specified.
     *
     * @supported Firefox
     */
    engine?: string | undefined;
    /**
     * Location where search results should be displayed. NEW_TAB is the default.
     *
     * @supported Firefox
     */
    disposition?: Disposition | undefined;
    /**
     * The ID of the tab for the search results. If not specified, a new tab is created, unless disposition is set. tabId cannot be used with disposition.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _QueryQueryInfo {
    /**
     * String to query with the default search provider.
     *
     * @supported Firefox
     */
    text: string;
    /**
     * Location where search results should be displayed. CURRENT_TAB is the default.
     *
     * @supported Firefox
     */
    disposition?: Disposition | undefined;
    /**
     * Location where search results should be displayed. tabId cannot be used with disposition.
     *
     * @supported Firefox
     */
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
 * @supported Chrome, Firefox
 */
export interface Filter {
    /**
     * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ({@link sessions.MAX_SESSION_RESULTS}).
     *
     * @supported Chrome, Firefox
     */
    maxResults?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface Session {
    /**
     * The time when the window or tab was closed or modified, represented in seconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    lastModified: number;
    /**
     * The {@link tabs.Tab}, if this entry describes a tab. Either this or {@link sessions.Session.window} will be set.
     *
     * @supported Chrome, Firefox
     */
    tab?: tabs.Tab | undefined;
    /**
     * The {@link windows.Window}, if this entry describes a window. Either this or {@link sessions.Session.tab} will be set.
     *
     * @supported Chrome, Firefox
     */
    window?: windows.Window | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface Device {
    /**
     * The name of the foreign device.
     *
     * @supported Chrome, Firefox
     */
    deviceName: string;
    /**
     * A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.
     *
     * @supported Chrome, Firefox
     */
    sessions: Session[];
    /** @supported Chrome, Firefox */
    info: string;
}
/**
 * @supported Chrome, Firefox
 */
export const MAX_SESSION_RESULTS: number;
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export function getRecentlyClosed(

      filter?: Filter,
    ): Promise<Session[]>;
/**
 * @supported Chrome, Firefox
 */
export function getDevices(

      filter?: Filter,
    ): Promise<Device[]>;
/**
 * @supported Chrome, Firefox
 */
export function restore(

      sessionId?: string,
    ): Promise<Session>;
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
 * @supported Chrome, Firefox
 */
export interface StorageChange<T = unknown> {
    /** @supported Chrome, Firefox */
    oldValue?: T;
    /** @supported Chrome, Firefox */
    newValue?: T;
}
/**
 * @supported Chrome, Firefox
 */
export interface StorageArea {
    /** @supported Chrome, Firefox */
    get<K extends string>(key: K, callback: (items: Record<K, unknown>) => void): void;
    get<K extends string>(keys: K[], callback: (items: Record<K, unknown>) => void): void;
    get<T extends object>(keys: T, callback: (items: T) => void): void;
    get(keys: string | string[] | Record<string, unknown> | null | undefined, callback: (items: Record<string, unknown>) => void): void;
    get(callback: (items: Record<string, unknown>) => void): void;
    get<K extends string>(key: K): Promise<Record<K, unknown>>;
    get<K extends string>(keys: K[]): Promise<Record<K, unknown>>;
    get<T extends object>(keys: T): Promise<T>;
    get<T extends object = Record<string, unknown>>(keys?: string | string[] | null): Promise<T>;
    /** @supported Chrome, Firefox */
    getBytesInUse(keys?: string | string[] | null): Promise<number>;
    getBytesInUse(keys: string | string[] | null | undefined, callback: (bytesInUse: number) => void): void;
    getBytesInUse(callback: (bytesInUse: number) => void): void;
    /** @supported Chrome, Firefox */
    getKeys(): Promise<string[]>;
    getKeys(callback: (keys: string[]) => void): void;
    /** @supported Chrome, Firefox */
    set<T extends Record<string, unknown>>(items: T): Promise<void>;
    set<T extends Record<string, unknown>>(items: T, callback: () => void): void;
    set(items: Record<string, unknown>): Promise<void>;
    set(items: Record<string, unknown>, callback?: () => void): void;
    /** @supported Chrome, Firefox */
    remove(keys: string | string[]): Promise<void>;
    remove(keys: string | string[], callback?: () => void): void;
    /** @supported Chrome, Firefox */
    clear(): Promise<void>;
    clear(callback?: () => void): void;
    /** @supported Chrome, Firefox */
    onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
}
/**
 * @supported Chrome, Firefox
 */
export const sync: _SyncStorageAreaWithUsage;
/**
 * @supported Chrome, Firefox
 */
export const local: _LocalStorageArea;
/**
 * @supported Chrome, Firefox
 */
export const managed: _ManagedStorageArea;
/**
 * @supported Chrome, Firefox
 */
export const session: _SessionStorageAreaWithUsage;
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
/**
 * @supported Firefox
 */
export interface StorageAreaWithUsage {
    /**
     * Gets one or more items from storage.
     * @param [keys] A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
     *
     * @supported Firefox
     */
    get(keys?: null | string | string[] | { [key: string]: /* TODO: Upstream type uses any */ any }): Promise<{ [key: string]: /* TODO: Upstream type uses any */ any }>;
    /**
     * Gets the amount of space (in bytes) being used by one or more items.
     * @param [keys] A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
     *
     * @supported Firefox
     */
    getBytesInUse(keys?: null | string | string[]): Promise<number>;
    /**
     * Gets the keys of all items in storage.
     *
     * @supported Firefox
     */
    getKeys(): Promise<string[]>;
    /**
     * Sets multiple items.
     * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
     *
     * Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
     *
     * @supported Firefox
     */
    set(items: { [key: string]: /* TODO: Upstream type uses any */ any }): Promise<void>;
    /**
     * Removes one or more items from storage.
     * @param keys A single key or a list of keys for items to remove.
     *
     * @supported Firefox
     */
    remove(keys: string | string[]): Promise<void>;
    /**
     * Removes all items from storage.
     *
     * @supported Firefox
     */
    clear(): Promise<void>;
    /**
     * Fired when one or more items change.
     * @param changes Object mapping each key that changed to its corresponding `storage.StorageChange` for that item.
     *
     * @supported Firefox
     */
    onChanged: WebExtEvent<(changes: { [key: string]: StorageChange }) => void>;
}
/**
 * @supported Firefox
 */
export interface _SyncStorageAreaWithUsage extends StorageAreaWithUsage {
    /**
     * The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    QUOTA_BYTES: number;
    /**
     * The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    QUOTA_BYTES_PER_ITEM: number;
    /**
     * The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    MAX_ITEMS: number;
    /**
     * The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
     *
     * Updates that would cause this limit to be exceeded fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    MAX_WRITE_OPERATIONS_PER_HOUR: number;
    /**
     * The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
     *
     * Updates that would cause this limit to be exceeded fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    MAX_WRITE_OPERATIONS_PER_MINUTE: number;
    /**
     * @deprecated The storage.sync API no longer has a sustained write operation quota.
     *
     * @supported Firefox
     */
    MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
}
/**
 * @supported Firefox
 */
export interface _LocalStorageArea extends StorageArea {
    /**
     * The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set `runtime.lastError`.
     *
     * @supported Firefox
     */
    QUOTA_BYTES: number;
}
/**
 * @supported Firefox
 */
export interface _ManagedStorageArea extends StorageArea {
    /**
     * The maximum size (in bytes) of the managed storage JSON manifest file. Files larger than this limit will fail to load.
     *
     * @supported Firefox
     */
    QUOTA_BYTES: number;
}
/**
 * @supported Firefox
 */
export interface _SessionStorageAreaWithUsage extends StorageAreaWithUsage {
    /**
     * The maximum amount of data (in bytes, currently at 10MB) that can be stored in session storage, as measured by the StructuredCloneHolder of every value plus every key's length.
     *
     * @supported Firefox
     */
    QUOTA_BYTES: number;
}

}

export namespace tabGroups {
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export interface TabGroup {
    /**
     * The ID of the group. Group IDs are unique within a browser session.
     *
     * @supported Chrome, Firefox
     */
    id: number;
    /**
     * Whether the group is collapsed. A collapsed group is one whose tabs are hidden.
     *
     * @supported Chrome, Firefox
     */
    collapsed: boolean;
    /**
     * The group's color.
     *
     * @supported Chrome, Firefox
     */
    color: Color;
    /**
     * The title of the group.
     *
     * @supported Chrome, Firefox
     */
    title?: string | undefined;
    /**
     * The ID of the window that contains the group.
     *
     * @supported Chrome, Firefox
     */
    windowId: number;
}
/**
 * @supported Chrome, Firefox
 */
export const TAB_GROUP_ID_NONE: number;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUpdated: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onMoved: WebExtEvent<(group: TabGroup) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: events.Event<(group: TabGroup, removeInfo: _RemoveInfo) => void>;
/**
 * @supported Chrome, Firefox
 */
export function get(

      groupId: number,
    ): Promise<TabGroup>;
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
    /** @supported Firefox */
    index: number;
    /** @supported Firefox */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _QueryInfo {
    /** @supported Firefox */
    collapsed?: boolean | undefined;
    /** @supported Firefox */
    color?: Color | undefined;
    /** @supported Firefox */
    title?: string | undefined;
    /** @supported Firefox */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateProperties {
    /** @supported Firefox */
    collapsed?: boolean | undefined;
    /** @supported Firefox */
    color?: Color | undefined;
    /** @supported Firefox */
    title?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _RemoveInfo {
    /**
     * True when the tab group is being closed because its window is being closed.
     *
     * @supported Firefox
     */
    isWindowClosing: boolean;
}

}

export namespace tabs {
/**
 * @supported Chrome, Firefox
 */
export type TabStatus = "loading" | "complete";
/**
 * @supported Chrome, Firefox
 */
export type MutedInfoReason =
        /** A user input action has set/overridden the muted state. */
        | "user"
        /** Tab capture started, forcing a muted state change. */
        | "capture"
        /** An extension, identified by the extensionId field, set the muted state. */
        | "extension";
/**
 * @supported Chrome, Firefox
 */
export interface MutedInfo {
    /**
     * Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing.
     *
     * @supported Chrome, Firefox
     */
    muted: boolean;
    /**
     * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
     *
     * @supported Chrome, Firefox
     */
    reason?: MutedInfoReason | undefined;
    /**
     * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
     *
     * @supported Chrome, Firefox
     */
    extensionId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface Tab {
    /**
     * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the {@link sessions} API, in which case a session ID may be present. Tab ID can also be set to `chrome.tabs.TAB_ID_NONE` for apps and devtools windows.
     *
     * @supported Chrome, Firefox
     */
    id?: number | undefined;
    /**
     * The zero-based index of the tab within its window.
     *
     * @supported Chrome, Firefox
     */
    index: number;
    /** @supported Chrome, Firefox */
    groupId?: number;
    /** @supported Chrome, Firefox */
    windowId?: number;
    /**
     * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
     *
     * @supported Chrome, Firefox
     */
    openerTabId?: number | undefined;
    /** @supported Chrome, Firefox */
    lastAccessed?: number;
    /**
     * Whether the tab is highlighted.
     *
     * @supported Chrome, Firefox
     */
    highlighted: boolean;
    /**
     * Whether the tab is active in its window. Does not necessarily mean the window is focused.
     *
     * @supported Chrome, Firefox
     */
    active: boolean;
    /**
     * Whether the tab is pinned.
     *
     * @supported Chrome, Firefox
     */
    pinned: boolean;
    /**
     * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
     *
     * @since Chrome 45
     *
     * @supported Chrome, Firefox
     */
    audible?: boolean | undefined;
    /** @supported Chrome, Firefox */
    discarded?: boolean;
    /** @supported Chrome, Firefox */
    autoDiscardable?: boolean;
    /**
     * The tab's muted state and the reason for the last state change.
     *
     * @since Chrome 46
     *
     * @supported Chrome, Firefox
     */
    mutedInfo?: MutedInfo | undefined;
    /**
     * The last committed URL of the main frame of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. May be an empty string if the tab has not yet committed. See also {@link Tab.pendingUrl}.
     *
     * @supported Chrome, Firefox
     */
    url?: string | undefined;
    /**
     * The title of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page.
     *
     * @supported Chrome, Firefox
     */
    title?: string | undefined;
    /**
     * The URL of the tab's favicon. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. It may also be an empty string if the tab is loading.
     *
     * @supported Chrome, Firefox
     */
    favIconUrl?: string | undefined;
    /**
     * The tab's loading status.
     *
     * @supported Chrome, Firefox
     */
    status?: string | undefined;
    /**
     * Whether the tab is in an incognito window.
     *
     * @supported Chrome, Firefox
     */
    incognito: boolean;
    /**
     * The width of the tab in pixels.
     *
     * @supported Chrome, Firefox
     */
    width?: number | undefined;
    /**
     * The height of the tab in pixels.
     *
     * @supported Chrome, Firefox
     */
    height?: number | undefined;
    /**
     * The session ID used to uniquely identify a tab obtained from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    sessionId?: string | undefined;
    /**
     * True if the tab is hidden.
     *
     * @supported Firefox
     */
    hidden?: boolean | undefined;
    /**
     * The CookieStoreId used for the tab.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * Whether the document in the tab can be rendered in reader mode.
     *
     * @supported Firefox
     */
    isArticle?: boolean | undefined;
    /**
     * Whether the document in the tab is being rendered in reader mode.
     *
     * @supported Firefox
     */
    isInReaderMode?: boolean | undefined;
    /**
     * Current tab sharing state for screen, microphone and camera.
     *
     * @supported Firefox
     */
    sharingState?: SharingState | undefined;
    /**
     * Whether the tab is drawing attention.
     *
     * @supported Firefox
     */
    attention?: boolean | undefined;
    /**
     * The ID of this tab's successor, if any; `tabs.TAB_ID_NONE` otherwise.
     *
     * @supported Firefox
     */
    successorTabId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export interface ZoomSettings {
    /**
     * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
     *
     * @supported Chrome, Firefox
     */
    mode?: ZoomSettingsMode | undefined;
    /**
     * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.
     *
     * @supported Chrome, Firefox
     */
    scope?: ZoomSettingsScope | undefined;
    /**
     * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
     *
     * @since Chrome 43
     *
     * @supported Chrome, Firefox
     */
    defaultZoomFactor?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";
/**
 * @supported Chrome, Firefox
 */
export const TAB_ID_NONE: number;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: WebExtEvent<(tab: Tab) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUpdated: _TabsOnUpdatedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onMoved: events.Event<(tabId: number, moveInfo: { windowId: number; fromIndex: number; toIndex: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onActivated: events.Event<(activeInfo: { tabId: number; windowId: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onHighlighted: events.Event<(highlightInfo: { windowId: number; tabIds: number[] }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onDetached: events.Event<(tabId: number, detachInfo: { oldWindowId: number; oldPosition: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onAttached: events.Event<(tabId: number, attachInfo: { newWindowId: number; newPosition: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: events.Event<(tabId: number, removeInfo: { windowId: number; isWindowClosing: boolean }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onReplaced: WebExtEvent<(addedTabId: number, removedTabId: number) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onZoomChange: events.Event<(ZoomChangeInfo: { tabId: number; oldZoomFactor: number; newZoomFactor: number; zoomSettings: ZoomSettings }) => void>;
/**
 * @supported Chrome, Firefox
 */
export function get(

      tabId: number,
    ): Promise<Tab>;
/**
 * @supported Chrome, Firefox
 */
export function getCurrent(): Promise<Tab | undefined>;
/**
 * @supported Firefox
 */
export function connect(tabId: number, connectInfo?: _ConnectConnectInfo): runtime.Port;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, options: MessageSendOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function remove(

      tabIds: number | number[],
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function group(options: _GroupOptions): Promise<number>;
/**
 * @supported Firefox
 */
export function ungroup(tabIds: number | number[]): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function detectLanguage(

      tabId?: number,
    ): Promise<string>;
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
 * @supported Chrome, Firefox
 */
export function setZoom(

      tabId: number,

      zoomFactor: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function setZoom(

      zoomFactor: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getZoom(

      tabId?: number,
    ): Promise<number>;
/**
 * @supported Chrome, Firefox
 */
export function setZoomSettings(

      tabId: number,

      zoomSettings: ZoomSettings,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function setZoomSettings(

      zoomSettings: ZoomSettings,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getZoomSettings(

      tabId?: number,
    ): Promise<ZoomSettings>;
/**
 * @supported Firefox
 */
export function discard(tabIds: number | number[]): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function goForward(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function goBack(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export interface SharingState {
    /**
     * If the tab is sharing the screen the value will be one of "Screen", "Window", or "Application", or undefined if not screen sharing.
     *
     * @supported Firefox
     */
    screen?: string | undefined;
    /**
     * True if the tab is using the camera.
     *
     * @supported Firefox
     */
    camera: boolean;
    /**
     * True if the tab is using the microphone.
     *
     * @supported Firefox
     */
    microphone: boolean;
}
/**
 * @supported Firefox
 */
export interface PageSettings {
    /**
     * The name of the file. May include optional .pdf extension.
     *
     * @supported Firefox
     */
    toFileName?: string | undefined;
    /**
     * The page size unit: 0 = inches, 1 = millimeters. Default: 0.
     *
     * @supported Firefox
     */
    paperSizeUnit?: number | undefined;
    /**
     * The paper width in paper size units. Default: 8.5.
     *
     * @supported Firefox
     */
    paperWidth?: number | undefined;
    /**
     * The paper height in paper size units. Default: 11.0.
     *
     * @supported Firefox
     */
    paperHeight?: number | undefined;
    /**
     * The page content orientation: 0 = portrait, 1 = landscape. Default: 0.
     *
     * @supported Firefox
     */
    orientation?: number | undefined;
    /**
     * The page content scaling factor: 1.0 = 100% = normal size. Default: 1.0.
     *
     * @supported Firefox
     */
    scaling?: number | undefined;
    /**
     * Whether the page content should shrink to fit the page width (overrides scaling). Default: true.
     *
     * @supported Firefox
     */
    shrinkToFit?: boolean | undefined;
    /**
     * Whether the page background colors should be shown. Default: false.
     *
     * @supported Firefox
     */
    showBackgroundColors?: boolean | undefined;
    /**
     * Whether the page background images should be shown. Default: false.
     *
     * @supported Firefox
     */
    showBackgroundImages?: boolean | undefined;
    /**
     * The spacing between the left header/footer and the left edge of the paper (inches). Default: 0.
     *
     * @supported Firefox
     */
    edgeLeft?: number | undefined;
    /**
     * The spacing between the right header/footer and the right edge of the paper (inches). Default: 0.
     *
     * @supported Firefox
     */
    edgeRight?: number | undefined;
    /**
     * The spacing between the top of the headers and the top edge of the paper (inches). Default: 0
     *
     * @supported Firefox
     */
    edgeTop?: number | undefined;
    /**
     * The spacing between the bottom of the footers and the bottom edge of the paper (inches). Default: 0.
     *
     * @supported Firefox
     */
    edgeBottom?: number | undefined;
    /**
     * The margin between the page content and the left edge of the paper (inches). Default: 0.5.
     *
     * @supported Firefox
     */
    marginLeft?: number | undefined;
    /**
     * The margin between the page content and the right edge of the paper (inches). Default: 0.5.
     *
     * @supported Firefox
     */
    marginRight?: number | undefined;
    /**
     * The margin between the page content and the top edge of the paper (inches). Default: 0.5.
     *
     * @supported Firefox
     */
    marginTop?: number | undefined;
    /**
     * The margin between the page content and the bottom edge of the paper (inches). Default: 0.5.
     *
     * @supported Firefox
     */
    marginBottom?: number | undefined;
    /**
     * The text for the page's left header. Default: '&T'.
     *
     * @supported Firefox
     */
    headerLeft?: string | undefined;
    /**
     * The text for the page's center header. Default: ''.
     *
     * @supported Firefox
     */
    headerCenter?: string | undefined;
    /**
     * The text for the page's right header. Default: '&U'.
     *
     * @supported Firefox
     */
    headerRight?: string | undefined;
    /**
     * The text for the page's left footer. Default: '&PT'.
     *
     * @supported Firefox
     */
    footerLeft?: string | undefined;
    /**
     * The text for the page's center footer. Default: ''.
     *
     * @supported Firefox
     */
    footerCenter?: string | undefined;
    /**
     * The text for the page's right footer. Default: '&D'.
     *
     * @supported Firefox
     */
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
    /**
     * A list of URLs or URL patterns. Events that cannot match any of the URLs will be filtered out. Filtering with urls requires the `"tabs"` or `"activeTab"` permission.
     *
     * @supported Firefox
     */
    urls?: string[] | undefined;
    /**
     * A list of property names. Events that do not match any of the names will be filtered out.
     *
     * @supported Firefox
     */
    properties?: UpdatePropertyName[] | undefined;
    /** @supported Firefox */
    tabId?: number | undefined;
    /** @supported Firefox */
    windowId?: number | undefined;
    /** @supported Firefox */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _ConnectConnectInfo {
    /**
     * Will be passed into onConnect for content scripts that are listening for the connection event.
     *
     * @supported Firefox
     */
    name?: string | undefined;
    /**
     * Open a port to a specific frame identified by `frameId` instead of all frames in the tab.
     *
     * @supported Firefox
     */
    frameId?: number | undefined;
    /** @supported Firefox */
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _SendMessageOptions {
    /**
     * Send a message to a specific frame identified by `frameId` instead of all frames in the tab.
     *
     * @supported Firefox
     */
    frameId?: number | undefined;
    /** @supported Firefox */
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _CreateCreateProperties {
    /**
     * The window to create the new tab in. Defaults to the current window.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window.
     *
     * @supported Firefox
     */
    index?: number | undefined;
    /**
     * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
     *
     * @supported Firefox
     */
    url?: string | undefined;
    /**
     * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see `windows.update`). Defaults to `true`.
     *
     * @supported Firefox
     */
    active?: boolean | undefined;
    /**
     * Whether the tab should be pinned. Defaults to `false`
     *
     * @supported Firefox
     */
    pinned?: boolean | undefined;
    /**
     * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
     *
     * @supported Firefox
     */
    openerTabId?: number | undefined;
    /**
     * The CookieStoreId for the tab that opened this tab.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * Whether the document in the tab should be opened in reader mode.
     *
     * @supported Firefox
     */
    openInReaderMode?: boolean | undefined;
    /**
     * Whether the tab is marked as 'discarded' when created.
     *
     * @supported Firefox
     */
    discarded?: boolean | undefined;
    /**
     * The title used for display if the tab is created in discarded mode.
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * Whether the tab should be muted when created.
     *
     * @supported Firefox
     */
    muted?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _DuplicateDuplicateProperties {
    /**
     * The position the new tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window.
     *
     * @supported Firefox
     */
    index?: number | undefined;
    /**
     * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see `windows.update`). Defaults to `true`.
     *
     * @supported Firefox
     */
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
    /**
     * Whether the tabs are active in their windows.
     *
     * @supported Firefox
     */
    active?: boolean | undefined;
    /**
     * Whether the tabs are drawing attention.
     *
     * @supported Firefox
     */
    attention?: boolean | undefined;
    /**
     * Whether the tabs are pinned.
     *
     * @supported Firefox
     */
    pinned?: boolean | undefined;
    /**
     * Whether the tabs are audible.
     *
     * @supported Firefox
     */
    audible?: boolean | undefined;
    /**
     * Whether the tab can be discarded automatically by the browser when resources are low.
     *
     * @supported Firefox
     */
    autoDiscardable?: boolean | undefined;
    /**
     * Whether the tabs are muted.
     *
     * @supported Firefox
     */
    muted?: boolean | undefined;
    /**
     * Whether the tabs are highlighted. Works as an alias of active.
     *
     * @supported Firefox
     */
    highlighted?: boolean | undefined;
    /**
     * Whether the tabs are in the current window.
     *
     * @supported Firefox
     */
    currentWindow?: boolean | undefined;
    /**
     * Whether the tabs are in the last focused window.
     *
     * @supported Firefox
     */
    lastFocusedWindow?: boolean | undefined;
    /**
     * Whether the tabs have completed loading.
     *
     * @supported Firefox
     */
    status?: TabStatus | undefined;
    /**
     * True while the tabs are not loaded with content.
     *
     * @supported Firefox
     */
    discarded?: boolean | undefined;
    /**
     * True while the tabs are hidden.
     *
     * @supported Firefox
     */
    hidden?: boolean | undefined;
    /**
     * Match page titles against a pattern.
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * Match tabs against one or more URL patterns. Note that fragment identifiers are not matched.
     *
     * @supported Firefox
     */
    url?: string | string[] | undefined;
    /**
     * The ID of the parent window, or `windows.WINDOW_ID_CURRENT` for the current window.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * The type of window the tabs are in.
     *
     * @supported Firefox
     */
    windowType?: WindowType | undefined;
    /**
     * The position of the tabs within their windows.
     *
     * @supported Firefox
     */
    index?: number | undefined;
    /**
     * The CookieStoreId used for the tab.
     *
     * @supported Firefox
     */
    cookieStoreId?: string[] | string | undefined;
    /**
     * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
     *
     * @supported Firefox
     */
    openerTabId?: number | undefined;
    /**
     * The ID of the group that the tabs are in, or `tabGroups.TAB_GROUP_ID_NONE` (-1) for ungrouped tabs.
     *
     * @supported Firefox
     */
    groupId?: number | undefined;
    /**
     * True for any screen sharing, or a string to specify type of screen sharing.
     *
     * @supported Firefox
     */
    screen?: boolean | _QueryQueryInfoScreen | undefined;
    /**
     * True if the tab is using the camera.
     *
     * @supported Firefox
     */
    camera?: boolean | undefined;
    /**
     * True if the tab is using the microphone.
     *
     * @supported Firefox
     */
    microphone?: boolean | undefined;
    /** @supported Firefox */
    splitViewId?: number;
}
/**
 * @supported Firefox
 */
export interface _HighlightHighlightInfo {
    /**
     * The window that contains the tabs.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * If true, the `windows.Window` returned will have a `tabs` property that contains a list of the `tabs.Tab` objects. The `Tab` objects only contain the `url`, `title` and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission. If false, the `windows.Window` won't have the `tabs` property.
     *
     * @supported Firefox
     */
    populate?: boolean | undefined;
    /**
     * One or more tab indices to highlight.
     *
     * @supported Firefox
     */
    tabs: number[] | number;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    /**
     * A URL to navigate the tab to.
     *
     * @supported Firefox
     */
    url?: string | undefined;
    /**
     * Whether the tab should be active. Does not affect whether the window is focused (see `windows.update`).
     *
     * @supported Firefox
     */
    active?: boolean | undefined;
    /**
     * Whether the tab can be discarded automatically by the browser when resources are low.
     *
     * @supported Firefox
     */
    autoDiscardable?: boolean | undefined;
    /**
     * Adds or removes the tab from the current selection.
     *
     * @supported Firefox
     */
    highlighted?: boolean | undefined;
    /**
     * Whether the tab should be pinned.
     *
     * @supported Firefox
     */
    pinned?: boolean | undefined;
    /**
     * Whether the tab should be muted.
     *
     * @supported Firefox
     */
    muted?: boolean | undefined;
    /**
     * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
     *
     * @supported Firefox
     */
    openerTabId?: number | undefined;
    /**
     * Whether the load should replace the current history entry for the tab.
     *
     * @supported Firefox
     */
    loadReplace?: boolean | undefined;
    /**
     * The ID of this tab's successor. If specified, the successor tab must be in the same window as this tab.
     *
     * @supported Firefox
     */
    successorTabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _MoveMoveProperties {
    /**
     * Defaults to the window the tab is currently in.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * The position to move the window to. -1 will place the tab at the end of the window.
     *
     * @supported Firefox
     */
    index: number;
}
/**
 * @supported Firefox
 */
export interface _ReloadReloadProperties {
    /**
     * Whether using any local cache. Default is false.
     *
     * @supported Firefox
     */
    bypassCache?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GroupOptionsCreateProperties {
    /**
     * The window of the new group. Defaults to the current window.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GroupOptions {
    /**
     * The tab ID or list of tab IDs to add to the specified group.
     *
     * @supported Firefox
     */
    tabIds: number | number[];
    /**
     * The ID of the group to add the tabs to. If not specified, a new group will be created.
     *
     * @supported Firefox
     */
    groupId?: number | undefined;
    /**
     * Configurations for creating a group. Cannot be used if groupId is already specified.
     *
     * @supported Firefox
     */
    createProperties?: _GroupOptionsCreateProperties | undefined;
}
/**
 * @supported Firefox
 */
export interface _MoveInSuccessionOptions {
    /** @supported Firefox */
    append?: boolean;
    /** @supported Firefox */
    insert?: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnUpdatedChangeInfo {
    /**
     * The tab's new attention state.
     *
     * @supported Firefox
     */
    attention?: boolean | undefined;
    /**
     * The tab's new audible state.
     *
     * @supported Firefox
     */
    audible?: boolean | undefined;
    /**
     * The tab's new autoDiscardable state.
     *
     * @supported Firefox
     */
    autoDiscardable?: boolean | undefined;
    /**
     * True while the tab is not loaded with content.
     *
     * @supported Firefox
     */
    discarded?: boolean | undefined;
    /**
     * The tab's new favicon URL. This property is only present if the extension's manifest includes the `"tabs"` permission.
     *
     * @supported Firefox
     */
    favIconUrl?: string | undefined;
    /**
     * The tab's new hidden state.
     *
     * @supported Firefox
     */
    hidden?: boolean | undefined;
    /**
     * Whether the document in the tab can be rendered in reader mode.
     *
     * @supported Firefox
     */
    isArticle?: boolean | undefined;
    /**
     * The tab's new muted state and the reason for the change.
     *
     * @supported Firefox
     */
    mutedInfo?: MutedInfo | undefined;
    /**
     * The tab's new pinned state.
     *
     * @supported Firefox
     */
    pinned?: boolean | undefined;
    /**
     * The tab's new sharing state for screen, microphone and camera.
     *
     * @supported Firefox
     */
    sharingState?: SharingState | undefined;
    /**
     * The status of the tab. Can be either _loading_ or _complete_.
     *
     * @supported Firefox
     */
    status?: string | undefined;
    /**
     * The title of the tab if it has changed. This property is only present if the extension's manifest includes the `"tabs"` permission.
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * The tab's URL if it has changed. This property is only present if the extension's manifest includes the `"tabs"` permission.
     *
     * @supported Firefox
     */
    url?: string | undefined;
    /** @supported Firefox */
    groupId?: number;
    /** @supported Firefox */
    splitViewId?: number;
}
/**
 * @supported Firefox
 */
export interface _TabsOnUpdatedEvent<TCallback = (tabId: number, changeInfo: _OnUpdatedChangeInfo, tab: Tab) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter?: UpdateFilter): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnMovedMoveInfo {
    /** @supported Firefox */
    windowId: number;
    /** @supported Firefox */
    fromIndex: number;
    /** @supported Firefox */
    toIndex: number;
}
/**
 * @supported Firefox
 */
export interface _OnActivatedActiveInfo {
    /**
     * The ID of the tab that has become active.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The ID of the tab that was previously active, if that tab is still open.
     *
     * @supported Firefox
     */
    previousTabId?: number | undefined;
    /**
     * The ID of the window the active tab changed inside of.
     *
     * @supported Firefox
     */
    windowId: number;
}
/**
 * @supported Firefox
 */
export interface _OnHighlightedHighlightInfo {
    /**
     * The window whose tabs changed.
     *
     * @supported Firefox
     */
    windowId: number;
    /**
     * All highlighted tabs in the window.
     *
     * @supported Firefox
     */
    tabIds: number[];
}
/**
 * @supported Firefox
 */
export interface _OnDetachedDetachInfo {
    /** @supported Firefox */
    oldWindowId: number;
    /** @supported Firefox */
    oldPosition: number;
}
/**
 * @supported Firefox
 */
export interface _OnAttachedAttachInfo {
    /** @supported Firefox */
    newWindowId: number;
    /** @supported Firefox */
    newPosition: number;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedRemoveInfo {
    /**
     * The window whose tab is closed.
     *
     * @supported Firefox
     */
    windowId: number;
    /**
     * True when the tab is being closed because its window is being closed.
     *
     * @supported Firefox
     */
    isWindowClosing: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnZoomChangeZoomChangeInfo {
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    oldZoomFactor: number;
    /** @supported Firefox */
    newZoomFactor: number;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
/** @deprecated Manifest V2 only in Chrome & Firefox. In MV3, use browser.scripting.executeScript. */
export function executeScript<T = unknown>(details: extensionTypes.InjectDetails, callback?: (result: (T | undefined)[]) => void): Promise<(T | undefined)[]>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export interface MessageSendOptions {
    /** @supported Chrome, Firefox */
    frameId?: number;
    /** @supported Chrome, Firefox */
    documentId?: string;
}

}

export namespace topSites {
/**
 * @supported Chrome, Firefox
 */
export interface MostVisitedURL {
    /**
     * The most visited URL.
     *
     * @supported Chrome, Firefox
     */
    url: string;
    /** @supported Chrome, Firefox */
    title?: string;
    /**
     * Data URL for the favicon, if available.
     *
     * @supported Firefox
     */
    favicon?: string | undefined;
    /**
     * The entry type, either `url` for a normal page link, or `search` for a search shortcut.
     *
     * @supported Firefox
     */
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
    /**
     * @deprecated Please use the other options to tune the results received from topSites.
     *
     * @supported Firefox
     */
    providers?: string[] | undefined;
    /**
     * The number of top sites to return, defaults to the value used by Firefox
     *
     * @supported Firefox
     */
    limit?: number | undefined;
    /**
     * Limit the result to a single top site link per domain
     *
     * @supported Firefox
     */
    onePerDomain?: boolean | undefined;
    /**
     * Include sites that the user has blocked from appearing on the Firefox new tab.
     *
     * @supported Firefox
     */
    includeBlocked?: boolean | undefined;
    /**
     * Include sites favicon if available.
     *
     * @supported Firefox
     */
    includeFavicon?: boolean | undefined;
    /**
     * Include sites that the user has pinned on the Firefox new tab.
     *
     * @supported Firefox
     */
    includePinned?: boolean | undefined;
    /**
     * Include search shortcuts appearing on the Firefox new tab.
     *
     * @supported Firefox
     */
    includeSearchShortcuts?: boolean | undefined;
    /**
     * Return the sites that exactly appear on the user's new-tab page. When true, all other options are ignored except limit and includeFavicon. If the user disabled newtab Top Sites, the newtab parameter will be ignored.
     *
     * @supported Firefox
     */
    newtab?: boolean | undefined;
}

}

export namespace types {
/**
 * @supported Chrome, Firefox
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
    /**
     * Gets the value of a setting.
     * @param details Which setting to consider.
     *
     * @supported Firefox
     */
    get(details: _GetDetails): Promise<_GetReturnDetails>;
    /**
     * Sets the value of a setting.
     * @param details Which setting to change.
     *
     * @supported Firefox
     */
    set(details: _SetDetails): Promise<void>;
    /**
     * Clears the setting, restoring any default value.
     * @param details Which setting to clear.
     *
     * @supported Firefox
     */
    clear(details: _ClearDetails): Promise<void>;
    /**
     * Fired after the setting changes.
     *
     * @supported Firefox
     */
    onChange: WebExtEvent<(details: _OnChangeDetails) => void>;
}
/**
 * @supported Firefox
 */
export interface _GetReturnDetails {
    /**
     * The value of the setting.
     *
     * @supported Firefox
     */
    value: /* TODO: Upstream type uses any */ any;
    /**
     * The level of control of the setting.
     *
     * @supported Firefox
     */
    levelOfControl: LevelOfControl;
    /**
     * Whether the effective value is specific to the incognito session.
     * This property will _only_ be present if the `incognito` property in the `details` parameter of `get()` was true.
     *
     * @supported Firefox
     */
    incognitoSpecific?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetDetails {
    /**
     * Whether to return the value that applies to the incognito session (default false).
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetDetails {
    /**
     * The value of the setting.
     * Note that every setting has a specific value type, which is described together with the setting. An extension should _not_ set a value of a different type.
     *
     * @supported Firefox
     */
    value: /* TODO: Upstream type uses any */ any;
    /**
     * Where to set the setting (default: regular).
     *
     * @supported Firefox
     */
    scope?: SettingScope | undefined;
}
/**
 * @supported Firefox
 */
export interface _ClearDetails {
    /**
     * Where to clear the setting (default: regular).
     *
     * @supported Firefox
     */
    scope?: SettingScope | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnChangeDetails {
    /**
     * The value of the setting after the change.
     *
     * @supported Firefox
     */
    value: /* TODO: Upstream type uses any */ any;
    /**
     * The level of control of the setting.
     *
     * @supported Firefox
     */
    levelOfControl: LevelOfControl;
    /**
     * Whether the value that has changed is specific to the incognito session.
     * This property will _only_ be present if the user has enabled the extension in incognito mode.
     *
     * @supported Firefox
     */
    incognitoSpecific?: boolean | undefined;
}

}

export namespace userScripts {
/**
 * @supported Chrome, Firefox
 */
export type ExecutionWorld =
        | "MAIN"
        | "USER_SCRIPT";
/**
 * @supported Chrome, Firefox
 */
export interface ScriptSource {
    /** @supported Chrome, Firefox */
    code: string;
    /** @supported Chrome, Firefox */
    file: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface RegisteredUserScript {
    /**
     * If true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
     *
     * @supported Chrome, Firefox
     */
    allFrames?: boolean | undefined;
    /**
     * Excludes pages that this user script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome, Firefox
     */
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    /**
     * The ID of the user script specified in the API call. This property must not start with a '\_' as it's reserved as a prefix for generated script IDs.
     *
     * @supported Chrome, Firefox
     */
    id: string;
    /**
     * Specifies wildcard patterns for pages this user script will be injected into.
     *
     * @supported Chrome, Firefox
     */
    includeGlobs?: string[] | undefined;
    /**
     * Specifies wildcard patterns for pages this user script will NOT be injected into.
     *
     * @supported Chrome, Firefox
     */
    excludeGlobs?: string[] | undefined;
    /** @supported Chrome, Firefox */
    js: extensionTypes.ExtensionFileOrCode[];
    /**
     * Specifies which pages this user script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings. This property must be specified for ${ref:register}.
     *
     * @supported Chrome, Firefox
     */
    matches?: _manifest.MatchPattern[] | undefined;
    /**
     * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
     *
     * @supported Chrome, Firefox
     */
    runAt?: extensionTypes.RunAt | undefined;
    /**
     * The JavaScript execution environment to run the script in. The default is `` `USER_SCRIPT` ``.
     *
     * @supported Chrome, Firefox
     */
    world?: ExecutionWorld | undefined;
    /**
     * Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved.
     *
     * @since Chrome 133
     *
     * @supported Chrome, Firefox
     */
    worldId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface UserScriptFilter {
    /**
     * {@link getScripts} only returns scripts with the IDs specified in this list.
     *
     * @supported Chrome, Firefox
     */
    ids?: string[] | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface WorldProperties {
    /**
     * Specifies the ID of the specific user script world to update. If not provided, updates the properties of the default user script world. Values with leading underscores (`_`) are reserved.
     *
     * @since Chrome 133
     *
     * @supported Chrome, Firefox
     */
    worldId?: string | undefined;
    /**
     * Specifies the world csp. The default is the `` `ISOLATED` `` world csp.
     *
     * @supported Chrome, Firefox
     */
    csp?: string | undefined;
    /**
     * Specifies whether messaging APIs are exposed. The default is `false`.
     *
     * @supported Chrome, Firefox
     */
    messaging?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export function register(

      scripts: RegisteredUserScript[],
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function register(userScriptOptions: UserScriptOptions): Promise<_LegacyRegisteredUserScript>;
/**
 * @supported Chrome, Firefox
 */
export function getScripts(

      filter?: UserScriptFilter,
    ): Promise<RegisteredUserScript[]>;
/**
 * @supported Chrome, Firefox
 */
export function unregister(

      filter?: UserScriptFilter,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export function update(scripts: _UpdateRegisteredUserScript[]): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function configureWorld(

      properties: WorldProperties,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox
 */
export function getWorldConfigurations(): Promise<WorldProperties[]>;
/**
 * @supported Chrome, Firefox
 */
export function resetWorldConfiguration(

      worldId?: string,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export interface UserScriptOptions {
    /**
     * The list of JS files to inject
     *
     * @supported Firefox
     */
    js: extensionTypes.ExtensionFileOrCode[];
    /**
     * An opaque user script metadata value
     *
     * @supported Firefox
     */
    scriptMetadata?: extensionTypes.PlainJSONValue | undefined;
    /** @supported Firefox */
    matches: _manifest.MatchPattern[];
    /** @supported Firefox */
    excludeMatches?: _manifest.MatchPattern[] | undefined;
    /** @supported Firefox */
    includeGlobs?: string[] | undefined;
    /** @supported Firefox */
    excludeGlobs?: string[] | undefined;
    /**
     * If allFrames is `true`, implies that the JavaScript should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
     *
     * @supported Firefox
     */
    allFrames?: boolean | undefined;
    /**
     * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
     *
     * @supported Firefox
     */
    matchAboutBlank?: boolean | undefined;
    /**
     * The soonest that the JavaScript will be injected into the tab. Defaults to "document_idle".
     *
     * @supported Firefox
     */
    runAt?: extensionTypes.RunAt | undefined;
    /**
     * limit the set of matched tabs to those that belong to the given cookie store id
     *
     * @supported Firefox
     */
    cookieStoreId?: string[] | string | undefined;
}
/**
 * @supported Firefox
 */
export interface _LegacyRegisteredUserScript {
    /**
     * Unregister a user script registered programmatically.
     *
     * @supported Firefox
     */
    unregister(): Promise<void>;
}
/**
 * @supported Firefox
 */
export interface _UpdateRegisteredUserScript extends Omit<RegisteredUserScript, "js"> {
    /** @supported Firefox */
    js?: ScriptSource[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeScriptUserScript {
    /** @supported Firefox */
    metadata: unknown;
    /** @supported Firefox */
    global: WindowProxy | Record<string, unknown>;
    /** @supported Firefox */
    defineGlobals(sourceObject: Record<string, unknown>): void;
    /** @supported Firefox */
    export<T>(value: T): T;
}
/**
 * @supported Firefox
 */
export const onBeforeScript: WebExtEvent<(userScript: _OnBeforeScriptUserScript) => void>;

}

export namespace webNavigation {
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type TransitionQualifier =
        | "client_redirect"
        | "server_redirect"
        | "forward_back"
        | "from_address_bar";
/**
 * @supported Chrome, Firefox
 */
export const onBeforeNavigate: _WebNavigationOnBeforeNavigateEvent;
/**
 * @supported Chrome, Firefox
 */
export const onCommitted: _WebNavigationOnCommittedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onDOMContentLoaded: _WebNavigationOnDOMContentLoadedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onCompleted: _WebNavigationOnCompletedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onErrorOccurred: _WebNavigationOnErrorOccurredEvent;
/**
 * @supported Chrome, Firefox
 */
export const onCreatedNavigationTarget: _WebNavigationOnCreatedNavigationTargetEvent;
/**
 * @supported Chrome, Firefox
 */
export const onReferenceFragmentUpdated: _WebNavigationOnReferenceFragmentUpdatedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onTabReplaced: events.Event<(details: { replacedTabId: number; tabId: number; timeStamp: number }) => void>;
/**
 * @supported Chrome, Firefox
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
    /** @supported Firefox */
    url: events.UrlFilter[];
}
/**
 * @supported Firefox
 */
export interface _GetFrameReturnDetails {
    /**
     * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
     *
     * @supported Firefox
     */
    errorOccurred?: boolean | undefined;
    /**
     * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The ID of the tab in which the frame is.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _GetFrameDetails {
    /** @supported Firefox */
    tabId?: number;
    /**
     * The ID of the process runs the renderer for this tab.
     *
     * @supported Firefox
     */
    processId?: number | undefined;
    /** @supported Firefox */
    frameId?: number;
    /** @supported Firefox */
    documentId?: string;
}
/**
 * @supported Firefox
 */
export interface _GetAllFramesReturnDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    parentFrameId: number;
    /** @supported Firefox */
    errorOccurred?: boolean;
}
/**
 * @supported Firefox
 */
export interface _GetAllFramesDetails {
    /**
     * The ID of the tab.
     *
     * @supported Firefox
     */
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeNavigateDetails {
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    parentFrameId: number;
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnBeforeNavigateEvent<TCallback = (details: _OnBeforeNavigateDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCommittedDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    transitionType: TransitionType;
    /** @supported Firefox */
    transitionQualifiers: TransitionQualifier[];
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCommittedEvent<TCallback = (details: _OnCommittedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnDOMContentLoadedDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnDOMContentLoadedEvent<TCallback = (details: _OnDOMContentLoadedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCompletedDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCompletedEvent<TCallback = (details: _OnCompletedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnErrorOccurredDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnErrorOccurredEvent<TCallback = (details: _OnErrorOccurredDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCreatedNavigationTargetDetails {
    /**
     * The ID of the tab in which the navigation is triggered.
     *
     * @supported Firefox
     */
    sourceTabId: number;
    /**
     * The ID of the process runs the renderer for the source tab.
     *
     * @supported Firefox
     */
    sourceProcessId: number;
    /**
     * The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame.
     *
     * @supported Firefox
     */
    sourceFrameId: number;
    /**
     * The URL to be opened in the new window.
     *
     * @supported Firefox
     */
    url: string;
    /**
     * The ID of the tab in which the url is opened
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The time when the browser was about to create a new view, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnCreatedNavigationTargetEvent<TCallback = (details: _OnCreatedNavigationTargetDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnReferenceFragmentUpdatedDetails {
    /**
     * The ID of the tab in which the navigation occurs.
     *
     * @supported Firefox
     */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /**
     * The ID of the process runs the renderer for this tab.
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    processId?: number | undefined;
    /**
     * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * Cause of the navigation.
     *
     * @supported Firefox
     */
    transitionType: TransitionType;
    /**
     * A list of transition qualifiers.
     *
     * @supported Firefox
     */
    transitionQualifiers: TransitionQualifier[];
    /**
     * The time when the navigation was committed, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnReferenceFragmentUpdatedEvent<TCallback = (details: _OnReferenceFragmentUpdatedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnTabReplacedDetails {
    /**
     * The ID of the tab that was replaced.
     *
     * @supported Firefox
     */
    replacedTabId: number;
    /**
     * The ID of the tab that replaced the old tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The time when the replacement happened, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _OnHistoryStateUpdatedDetails {
    /** @supported Firefox */
    documentId: string;
    /** @supported Firefox */
    parentDocumentId?: string;
    /** @supported Firefox */
    tabId: number;
    /** @supported Firefox */
    url: string;
    /** @supported Firefox */
    frameId: number;
    /** @supported Firefox */
    transitionType: TransitionType;
    /** @supported Firefox */
    transitionQualifiers: TransitionQualifier[];
    /** @supported Firefox */
    timeStamp: number;
}
/**
 * @supported Firefox
 */
export interface _WebNavigationOnHistoryStateUpdatedEvent<TCallback = (details: _OnHistoryStateUpdatedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filters?: EventUrlFilters): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}

}

export namespace webRequest {
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type OnBeforeRequestOptions = "blocking" | "requestBody";
/**
 * @supported Chrome, Firefox
 */
export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking";
/**
 * @supported Chrome, Firefox
 */
export type OnSendHeadersOptions = "requestHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnHeadersReceivedOptions = "blocking" | "responseHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnAuthRequiredOptions =
        | "responseHeaders"
        | "blocking"
        | "asyncBlocking";
/**
 * @supported Chrome, Firefox
 */
export type OnResponseStartedOptions = "responseHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnBeforeRedirectOptions = "responseHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnCompletedOptions = "responseHeaders";
/**
 * @supported Chrome, Firefox
 */
export interface RequestFilter {
    /**
     * A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.
     *
     * @supported Chrome, Firefox
     */
    urls: string[];
    /**
     * A list of request types. Requests that cannot match any of the types will be filtered out.
     *
     * @supported Chrome, Firefox
     */
    types?: ResourceType[] | undefined;
    /** @supported Chrome, Firefox */
    tabId?: number | undefined;
    /** @supported Chrome, Firefox */
    windowId?: number | undefined;
    /**
     * If provided, requests that do not match the incognito state will be filtered out.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export type HttpHeaders = _HttpHeaders[];
/**
 * @supported Chrome, Firefox
 */
export interface BlockingResponse {
    /**
     * If true, the request is cancelled. This prevents the request from being sent. This can be used as a response to the onBeforeRequest, onBeforeSendHeaders, onHeadersReceived and onAuthRequired events.
     *
     * @supported Chrome, Firefox
     */
    cancel?: boolean | undefined;
    /**
     * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as `data:` are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. Redirects from URLs with `ws://` and `wss://` schemes are **ignored**.
     *
     * @supported Chrome, Firefox
     */
    redirectUrl?: string | undefined;
    /**
     * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
     *
     * @supported Chrome, Firefox
     */
    requestHeaders?: HttpHeaders | undefined;
    /**
     * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return `responseHeaders` if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify `responseHeaders` for each request).
     *
     * @supported Chrome, Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.
     *
     * @supported Chrome, Firefox
     */
    authCredentials?: _BlockingResponseAuthCredentials | undefined;
    /**
     * Only used as a response to the onBeforeRequest event. If set, the original request is prevented from being sent/completed and is instead upgraded to a secure request. If any extension returns `redirectUrl` during onBeforeRequest, `upgradeToSecure` will have no affect.
     *
     * @supported Firefox
     */
    upgradeToSecure?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface UploadData {
    /** @supported Chrome, Firefox */
    bytes?: ArrayBuffer;
    /** @supported Chrome, Firefox */
    file?: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface SecurityInfo {
    /**
     * A list of certificates
     *
     * @supported Chrome, Firefox
     */
    certificates: CertificateInfo[];
    /**
     * State of the connection. One of secure, insecure, broken.
     *
     * @supported Chrome, Firefox
     */
    state: _SecurityInfoState;
    /**
     * Error message if state is "broken"
     *
     * @supported Firefox
     */
    errorMessage?: string | undefined;
    /**
     * Protocol version if state is "secure"
     *
     * @supported Firefox
     */
    protocolVersion?: _SecurityInfoProtocolVersion | undefined;
    /**
     * The cipher suite used in this request if state is "secure".
     *
     * @supported Firefox
     */
    cipherSuite?: string | undefined;
    /**
     * The key exchange algorithm used in this request if state is "secure".
     *
     * @supported Firefox
     */
    keaGroupName?: string | undefined;
    /**
     * The length (in bits) of the secret key.
     *
     * @supported Firefox
     */
    secretKeyLength?: number | undefined;
    /**
     * The signature scheme used in this request if state is "secure".
     *
     * @supported Firefox
     */
    signatureSchemeName?: string | undefined;
    /**
     * The type of certificate error that was overridden for this connection, if any.
     *
     * @supported Firefox
     */
    overridableErrorCategory?: _SecurityInfoOverridableErrorCategory | undefined;
    /**
     * The domain name does not match the certificate domain.
     * @deprecated Please use `SecurityInfo.overridableErrorCategory`.
     *
     * @supported Firefox
     */
    isDomainMismatch?: boolean | undefined;
    /**
     * The certificate is either expired or is not yet valid. See `CertificateInfo.validity` for start and end dates.
     * @deprecated Please use `SecurityInfo.overridableErrorCategory`.
     *
     * @supported Firefox
     */
    isNotValidAtThisTime?: boolean | undefined;
    /**
     * @deprecated Please use `SecurityInfo.overridableErrorCategory`.
     *
     * @supported Firefox
     */
    isUntrusted?: boolean | undefined;
    /** @supported Firefox */
    isExtendedValidation?: boolean | undefined;
    /**
     * Certificate transparency compliance per RFC 6962. See `https://www.certificate-transparency.org/what-is-ct` for more information.
     *
     * @supported Firefox
     */
    certificateTransparencyStatus?: CertificateTransparencyStatus | undefined;
    /**
     * True if host uses Strict Transport Security and state is "secure".
     *
     * @supported Firefox
     */
    hsts?: boolean | undefined;
    /**
     * True if host uses Public Key Pinning and state is "secure".
     *
     * @supported Firefox
     */
    hpkp?: string | undefined;
    /**
     * list of reasons that cause the request to be considered weak, if state is "weak"
     *
     * @supported Firefox
     */
    weaknessReasons?: TransportWeaknessReasons[] | undefined;
    /**
     * True if the TLS connection used Encrypted Client Hello.
     *
     * @supported Firefox
     */
    usedEch?: boolean | undefined;
    /**
     * True if the TLS connection used Delegated Credentials.
     *
     * @supported Firefox
     */
    usedDelegatedCredentials?: boolean | undefined;
    /**
     * True if the TLS connection made OCSP requests.
     *
     * @supported Firefox
     */
    usedOcsp?: boolean | undefined;
    /**
     * True if the TLS connection used a privacy-preserving DNS transport like DNS-over-HTTPS.
     *
     * @supported Firefox
     */
    usedPrivateDns?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeRequest: _WebRequestOnBeforeRequestEvent;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeSendHeaders: _WebRequestOnBeforeSendHeadersEvent;
/**
 * @supported Chrome, Firefox
 */
export const onSendHeaders: _WebRequestOnSendHeadersEvent;
/**
 * @supported Chrome, Firefox
 */
export const onHeadersReceived: _WebRequestOnHeadersReceivedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onAuthRequired: _WebRequestOnAuthRequiredEvent;
/**
 * @supported Chrome, Firefox
 */
export const onResponseStarted: _WebRequestOnResponseStartedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeRedirect: _WebRequestOnBeforeRedirectEvent;
/**
 * @supported Chrome, Firefox
 */
export const onCompleted: _WebRequestOnCompletedEvent;
/**
 * @supported Chrome, Firefox
 */
export const onErrorOccurred: _WebRequestOnErrorOccurredEvent;
/**
 * @supported Chrome, Firefox
 */
export function handlerBehaviorChanged(): Promise<void>;
/**
 * @supported Firefox
 */
export interface CertificateInfo {
    /** @supported Firefox */
    subject: string;
    /** @supported Firefox */
    issuer: string;
    /**
     * Contains start and end timestamps.
     *
     * @supported Firefox
     */
    validity: _CertificateInfoValidity;
    /** @supported Firefox */
    fingerprint: _CertificateInfoFingerprint;
    /** @supported Firefox */
    serialNumber: string;
    /** @supported Firefox */
    isBuiltInRoot: boolean;
    /** @supported Firefox */
    subjectPublicKeyInfoDigest: _CertificateInfoSubjectPublicKeyInfoDigest;
    /** @supported Firefox */
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
    /**
     * Classification flags if the request has been classified and it is first party.
     *
     * @supported Firefox
     */
    firstParty: UrlClassificationParty;
    /**
     * Classification flags if the request has been classified and it or its window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: UrlClassificationParty;
}
/**
 * @supported Firefox
 */
export interface StreamFilter {
    /**
     * Describes the current status of the stream.
     *
     * @supported Firefox
     */
    status: _StreamFilterStatus;
    /**
     * A string that will contain an error message after the onerror event has fired.
     *
     * @supported Firefox
     */
    error: string;
    /**
     * Event handler which is called when an error has occurred.
     *
     * @supported Firefox
     */
    onerror: ((event: Event) => void) | null;
    /**
     * Event handler which is called when the stream has no more data to deliver and has closed.
     *
     * @supported Firefox
     */
    onstop: ((event: Event) => void) | null;
    /**
     * Event handler which is called when the stream is about to start receiving data.
     *
     * @supported Firefox
     */
    onstart: ((event: Event) => void) | null;
    /**
     * Event handler which is called when incoming data is available.
     *
     * @supported Firefox
     */
    ondata: ((event: _StreamFilterOndataEvent) => void) | null;
    /**
     * Closes the request.
     *
     * @supported Firefox
     */
    close(): void;
    /**
     * Disconnects the filter from the request.
     *
     * @supported Firefox
     */
    disconnect(): void;
    /**
     * Suspends processing of the request.
     *
     * @supported Firefox
     */
    suspend(): void;
    /**
     * Resumes processing of the request.
     *
     * @supported Firefox
     */
    resume(): void;
    /**
     * Writes some data to the output stream.
     *
     * @supported Firefox
     */
    write(data: Uint8Array | ArrayBuffer): void;
}
/**
 * @supported Firefox
 */
export interface _HttpHeaders {
    /**
     * Name of the HTTP header.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * Value of the HTTP header if it can be represented by UTF-8.
     *
     * @supported Firefox
     */
    value?: string | undefined;
    /**
     * Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255).
     *
     * @supported Firefox
     */
    binaryValue?: number[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _BlockingResponseAuthCredentials {
    /** @supported Firefox */
    username: string;
    /** @supported Firefox */
    password: string;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoValidity {
    /** @supported Firefox */
    start: number;
    /** @supported Firefox */
    end: number;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoFingerprint {
    /** @supported Firefox */
    sha1: string;
    /** @supported Firefox */
    sha256: string;
}
/**
 * @supported Firefox
 */
export interface _CertificateInfoSubjectPublicKeyInfoDigest {
    /** @supported Firefox */
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
    /** @supported Firefox */
    data: ArrayBuffer;
}
/**
 * @supported Firefox
 */
export interface _GetSecurityInfoOptions {
    /**
     * Include the entire certificate chain.
     *
     * @supported Firefox
     */
    certificateChain?: boolean | undefined;
    /**
     * Include raw certificate data for processing by the extension.
     *
     * @supported Firefox
     */
    rawDER?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRequestDetailsRequestBody {
    /**
     * Errors when obtaining request body data.
     *
     * @supported Firefox
     */
    error?: string | undefined;
    /**
     * If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': ['value1', 'value2']}.
     *
     * @supported Firefox
     */
    formData?: object | undefined;
    /**
     * If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array.
     *
     * @supported Firefox
     */
    raw?: UploadData[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRequestDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.
     *
     * @supported Firefox
     */
    requestBody?: _OnBeforeRequestDetailsRequestBody | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeRequestEvent<TCallback = (details: _OnBeforeRequestDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeRequestOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeSendHeadersDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The HTTP request headers that are going to be sent out with this request.
     *
     * @supported Firefox
     */
    requestHeaders?: HttpHeaders | undefined;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeSendHeadersEvent<TCallback = (details: _OnBeforeSendHeadersDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeSendHeadersOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnSendHeadersDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The HTTP request headers that have been sent out with this request.
     *
     * @supported Firefox
     */
    requestHeaders?: HttpHeaders | undefined;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnSendHeadersEvent<TCallback = (details: _OnSendHeadersDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnSendHeadersOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnHeadersReceivedDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line).
     *
     * @supported Firefox
     */
    statusLine: string;
    /**
     * The HTTP response headers that have been received with this response.
     *
     * @supported Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * Standard HTTP status code returned by the server.
     *
     * @supported Firefox
     */
    statusCode: number;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnHeadersReceivedEvent<TCallback = (details: _OnHeadersReceivedDetails) => BlockingResponse | Promise<BlockingResponse> | void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnHeadersReceivedOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnAuthRequiredDetailsChallenger {
    /** @supported Firefox */
    host: string;
    /** @supported Firefox */
    port: number;
}
/**
 * @supported Firefox
 */
export interface _OnAuthRequiredDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The authentication scheme, e.g. Basic or Digest.
     *
     * @supported Firefox
     */
    scheme: string;
    /**
     * The authentication realm provided by the server, if there is one.
     *
     * @supported Firefox
     */
    realm?: string | undefined;
    /**
     * The server requesting authentication.
     *
     * @supported Firefox
     */
    challenger: _OnAuthRequiredDetailsChallenger;
    /**
     * True for Proxy-Authenticate, false for WWW-Authenticate.
     *
     * @supported Firefox
     */
    isProxy: boolean;
    /**
     * The HTTP response headers that were received along with this response.
     *
     * @supported Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
     *
     * @supported Firefox
     */
    statusLine: string;
    /**
     * Standard HTTP status code returned by the server.
     *
     * @supported Firefox
     */
    statusCode: number;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
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
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnAuthRequiredOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnResponseStartedDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
     *
     * @supported Firefox
     */
    ip?: string | undefined;
    /**
     * Indicates if this response was fetched from disk cache.
     *
     * @supported Firefox
     */
    fromCache: boolean;
    /**
     * Standard HTTP status code returned by the server.
     *
     * @supported Firefox
     */
    statusCode: number;
    /**
     * The HTTP response headers that were received along with this response.
     *
     * @supported Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
     *
     * @supported Firefox
     */
    statusLine: string;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnResponseStartedEvent<TCallback = (details: _OnResponseStartedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnResponseStartedOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnBeforeRedirectDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
     *
     * @supported Firefox
     */
    ip?: string | undefined;
    /**
     * Indicates if this response was fetched from disk cache.
     *
     * @supported Firefox
     */
    fromCache: boolean;
    /**
     * Standard HTTP status code returned by the server.
     *
     * @supported Firefox
     */
    statusCode: number;
    /**
     * The new URL.
     *
     * @supported Firefox
     */
    redirectUrl: string;
    /**
     * The HTTP response headers that were received along with this redirect.
     *
     * @supported Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
     *
     * @supported Firefox
     */
    statusLine: string;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnBeforeRedirectEvent<TCallback = (details: _OnBeforeRedirectDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnBeforeRedirectOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnCompletedDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
     *
     * @supported Firefox
     */
    ip?: string | undefined;
    /**
     * Indicates if this response was fetched from disk cache.
     *
     * @supported Firefox
     */
    fromCache: boolean;
    /**
     * Standard HTTP status code returned by the server.
     *
     * @supported Firefox
     */
    statusCode: number;
    /**
     * The HTTP response headers that were received along with this response.
     *
     * @supported Firefox
     */
    responseHeaders?: HttpHeaders | undefined;
    /**
     * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
     *
     * @supported Firefox
     */
    statusLine: string;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification: UrlClassification;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /**
     * For http requests, the bytes transferred in the request. Only available in onCompleted.
     *
     * @supported Firefox
     */
    requestSize: number;
    /**
     * For http requests, the bytes received in the request. Only available in onCompleted.
     *
     * @supported Firefox
     */
    responseSize: number;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnCompletedEvent<TCallback = (details: _OnCompletedDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter, extraInfoSpec?: OnCompletedOptions[]): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _OnErrorOccurredDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
     *
     * @supported Firefox
     */
    requestId: string;
    /** @supported Firefox */
    url: string;
    /**
     * Standard HTTP method.
     *
     * @supported Firefox
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Firefox
     */
    frameId: number;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Firefox
     */
    parentFrameId: number;
    /**
     * True for private browsing requests.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * URL of the resource that triggered this request.
     *
     * @supported Firefox
     */
    originUrl?: string | undefined;
    /**
     * URL of the page into which the requested resource will be loaded.
     *
     * @supported Firefox
     */
    documentUrl?: string | undefined;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * How the requested resource will be used.
     *
     * @supported Firefox
     */
    type: ResourceType;
    /**
     * The time when this signal is triggered, in milliseconds since the epoch.
     *
     * @supported Firefox
     */
    timeStamp: number;
    /**
     * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
     *
     * @supported Firefox
     */
    ip?: string | undefined;
    /**
     * Indicates if this response was fetched from disk cache.
     *
     * @supported Firefox
     */
    fromCache: boolean;
    /**
     * The error description. This string is _not_ guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content.
     *
     * @supported Firefox
     */
    error: string;
    /**
     * Tracking classification if the request has been classified.
     *
     * @supported Firefox
     */
    urlClassification?: UrlClassification | undefined;
    /**
     * Indicates if this request and its content window hierarchy is third party.
     *
     * @supported Firefox
     */
    thirdParty: boolean;
    /** @supported Firefox */
    documentId?: string;
    /** @supported Firefox */
    parentDocumentId?: string;
}
/**
 * @supported Firefox
 */
export interface _WebRequestOnErrorOccurredEvent<TCallback = (details: _OnErrorOccurredDetails) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, filter: RequestFilter): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";
/**
 * @supported Chrome, Firefox
 */
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "docked";
/**
 * @supported Chrome, Firefox
 */
export interface Window {
    /**
     * The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an `ID` property; for example, when querying windows using the {@link sessions} API, in which case a session ID may be present.
     *
     * @supported Chrome, Firefox
     */
    id?: number | undefined;
    /**
     * Whether the window is currently the focused window.
     *
     * @supported Chrome, Firefox
     */
    focused: boolean;
    /**
     * The offset of the window from the top edge of the screen in pixels. In some circumstances a window may not be assigned a `top` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    top?: number | undefined;
    /**
     * The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a `left` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    left?: number | undefined;
    /**
     * The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `width` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    width?: number | undefined;
    /**
     * The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `height` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    height?: number | undefined;
    /**
     * Array of {@link tabs.Tab} objects representing the current tabs in the window.
     *
     * @supported Chrome, Firefox
     */
    tabs?: tabs.Tab[] | undefined;
    /**
     * Whether the window is incognito.
     *
     * @supported Chrome, Firefox
     */
    incognito: boolean;
    /**
     * The type of browser window this is.
     *
     * @supported Chrome, Firefox
     */
    type?: WindowType | undefined;
    /**
     * The state of this browser window.
     *
     * @supported Chrome, Firefox
     */
    state?: WindowState | undefined;
    /**
     * Whether the window is set to be always on top.
     *
     * @supported Chrome, Firefox
     */
    alwaysOnTop: boolean;
    /**
     * The session ID used to uniquely identify a window, obtained from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    sessionId?: string | undefined;
    /**
     * The title of the window. Read-only.
     *
     * @supported Firefox
     */
    title?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export type CreateType =
        | "normal"
        | "popup"
        | "panel"
        | "detached_panel";
/**
 * @supported Chrome, Firefox
 */
export const WINDOW_ID_NONE: number;
/**
 * @supported Chrome, Firefox
 */
export const WINDOW_ID_CURRENT: number;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: WebExtEvent<(window: Window) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: WebExtEvent<(windowId: number) => void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function remove(

      windowId: number,
    ): Promise<void>;
/**
 * @supported Firefox
 */
export interface GetInfo {
    /**
     * If true, the `windows.Window` returned will have a `tabs` property that contains a list of the `tabs.Tab` objects. The `Tab` objects only contain the `url`, `title` and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission.
     *
     * @supported Firefox
     */
    populate?: boolean | undefined;
    /**
     * `windowTypes` is deprecated and ignored on Firefox.
     * @deprecated `windowTypes` is deprecated and ignored on Firefox.
     *
     * @supported Firefox
     */
    windowTypes?: WindowType[] | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetAllGetInfo {
    /**
     * If set, the `windows.Window` returned will be filtered based on its type. If unset the default filter is set to `['app', 'normal', 'panel', 'popup']`, with `'app'` and `'panel'` window types limited to the extension's own windows.
     *
     * @supported Firefox
     */
    windowTypes?: WindowType[] | undefined;
    /**
     * If true, the `windows.Window` returned will have a `tabs` property that contains a list of the `tabs.Tab` objects. The `Tab` objects only contain the `url`, `title` and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission.
     *
     * @supported Firefox
     */
    populate?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _CreateCreateData {
    /**
     * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
     *
     * @supported Firefox
     */
    url?: string | string[] | undefined;
    /**
     * The id of the tab for which you want to adopt to the new window.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
     *
     * @supported Firefox
     */
    left?: number | undefined;
    /**
     * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
     *
     * @supported Firefox
     */
    top?: number | undefined;
    /**
     * The width in pixels of the new window, including the frame. If not specified defaults to a natural width.
     *
     * @supported Firefox
     */
    width?: number | undefined;
    /**
     * The height in pixels of the new window, including the frame. If not specified defaults to a natural height.
     *
     * @supported Firefox
     */
    height?: number | undefined;
    /**
     * If true, opens an active window. If false, opens an inactive window.
     *
     * @supported Firefox
     */
    focused?: boolean | undefined;
    /**
     * Whether the new window should be an incognito window.
     *
     * @supported Firefox
     */
    incognito?: boolean | undefined;
    /**
     * Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.
     *
     * @supported Firefox
     */
    type?: CreateType | undefined;
    /**
     * The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
     *
     * @supported Firefox
     */
    state?: WindowState | undefined;
    /**
     * Allow scripts to close the window.
     *
     * @supported Firefox
     */
    allowScriptsToClose?: boolean | undefined;
    /**
     * The CookieStoreId to use for all tabs that were created when the window is opened.
     *
     * @supported Firefox
     */
    cookieStoreId?: string | undefined;
    /**
     * A string to add to the beginning of the window title.
     *
     * @supported Firefox
     */
    titlePreface?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateInfo {
    /**
     * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
     *
     * @supported Firefox
     */
    left?: number | undefined;
    /**
     * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
     *
     * @supported Firefox
     */
    top?: number | undefined;
    /**
     * The width to resize the window to in pixels. This value is ignored for panels.
     *
     * @supported Firefox
     */
    width?: number | undefined;
    /**
     * The height to resize the window to in pixels. This value is ignored for panels.
     *
     * @supported Firefox
     */
    height?: number | undefined;
    /**
     * If true, brings the window to the front. If false, brings the next window in the z-order to the front.
     *
     * @supported Firefox
     */
    focused?: boolean | undefined;
    /**
     * If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request.
     *
     * @supported Firefox
     */
    drawAttention?: boolean | undefined;
    /**
     * The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
     *
     * @supported Firefox
     */
    state?: WindowState | undefined;
    /**
     * A string to add to the beginning of the window title.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    default_title?: string | undefined;
    /** @supported Firefox */
    default_icon?: IconPath | undefined;
    /**
     * Specifies icons to use for dark and light themes
     *
     * @supported Firefox
     */
    theme_icons?: ThemeIcons[] | undefined;
    /** @supported Firefox */
    default_popup?: string | undefined;
    /**
     * Deprecated in Manifest V3.
     *
     * @supported Firefox
     */
    browser_style?: boolean | undefined;
    /**
     * Defines the location the browserAction will appear by default. The default location is navbar.
     *
     * @supported Firefox
     */
    default_area?: _ActionManifestDefaultArea | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface WebExtensionManifest extends ManifestBase {
    /** @supported Chrome, Firefox */
    manifest_version: number;
    /** @supported Chrome, Firefox */
    name: string;
    /** @supported Chrome, Firefox */
    version: string;
    /** @supported Chrome, Firefox */
    description?: string;
    /** @supported Chrome, Firefox */
    author?: string;
    /** @supported Chrome, Firefox */
    icons?: Record<string, string>;
    /** @supported Chrome, Firefox */
    permissions?: string[];
    /**
     * Needs at least manifest version 3.
     *
     * @supported Chrome, Firefox
     */
    host_permissions?: MatchPattern[] | undefined;
    /** @supported Chrome, Firefox */
    optional_permissions?: string[];
    /** @supported Chrome, Firefox */
    content_scripts?: Array<{
    matches: string[];
    js?: string[];
    css?: string[];
    run_at?: string;
    all_frames?: boolean;
  }>;
    /** @supported Chrome, Firefox */
    background?: {
    service_worker?: string;
    scripts?: string[];
    page?: string;
    type?: "module";
    persistent?: boolean;
  };
    /**
     * Needs at least manifest version 3.
     *
     * @supported Chrome, Firefox
     */
    action?: ActionManifest | undefined;
    /** @supported Chrome, Firefox */
    browser_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    page_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    sidebar_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    web_accessible_resources?:
            | string[]
            | Array<{
                resources: string[];
                matches?: MatchPattern[] | undefined;
                extension_ids?: Array<ExtensionID | "*"> | undefined;
            }>
            | undefined;
    /** @supported Firefox */
    declarative_net_request?: _WebExtensionManifestDeclarativeNetRequest | undefined;
    /** @supported Firefox */
    experiment_apis?: { [key: string]: experiments.ExperimentAPI } | undefined;
    /**
     * A list of protocol handler definitions.
     *
     * @supported Firefox
     */
    protocol_handlers?: ProtocolHandler[] | undefined;
    /** @supported Firefox */
    default_locale?: string | undefined;
    /** @supported Firefox */
    l10n_resources?: string[] | undefined;
    /** @supported Firefox */
    minimum_chrome_version?: string | undefined;
    /** @supported Firefox */
    minimum_opera_version?: string | undefined;
    /**
     * The 'split' value is not supported.
     *
     * @supported Firefox
     */
    incognito?: _WebExtensionManifestIncognito | undefined;
    /**
     * Alias property for options_ui.page, ignored when options_ui.page is set. When using this property the options page is always opened in a new tab.
     *
     * @supported Firefox
     */
    options_page?: ExtensionURL | undefined;
    /** @supported Firefox */
    options_ui?: _WebExtensionManifestOptionsUi | undefined;
    /** @supported Firefox */
    content_security_policy?: string | {
            /** The Content Security Policy used for extension pages. */
            extension_pages?: string | undefined;
        } | undefined;
    /** @supported Firefox */
    granted_host_permissions?: boolean | undefined;
    /**
     * Needs at least manifest version 3.
     *
     * @supported Firefox
     */
    optional_host_permissions?: MatchPattern[] | undefined;
    /** @supported Firefox */
    hidden?: boolean | undefined;
    /** @supported Firefox */
    theme_experiment?: ThemeExperiment | undefined;
    /**
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    user_scripts?: _WebExtensionManifestUserScripts | undefined;
    /** @supported Firefox */
    chrome_settings_overrides?: _WebExtensionManifestChromeSettingsOverrides | undefined;
    /** @supported Firefox */
    commands?: { [key: string]: _WebExtensionManifestCommands } | undefined;
    /** @supported Firefox */
    devtools_page?: ExtensionURL | undefined;
    /** @supported Firefox */
    omnibox?: _WebExtensionManifestOmnibox | undefined;
    /** @supported Firefox */
    chrome_url_overrides?: _WebExtensionManifestChromeUrlOverrides | undefined;
    /** @supported Firefox */
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
    /**
     * A user-readable title string for the protocol handler. This will be displayed to the user in interface objects as needed.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The protocol the site wishes to handle, specified as a string. For example, you can register to handle SMS text message links by registering to handle the "sms" scheme.
     *
     * @supported Firefox
     */
    protocol: string | _ProtocolHandlerProtocol;
    /**
     * The URL of the handler, as a string. This string should include "%s" as a placeholder which will be replaced with the escaped URL of the document to be handled. This URL might be a true URL, or it could be a phone number, email address, or so forth.
     *
     * @supported Firefox
     */
    uriTemplate: ExtensionURL | HttpURL;
}
/**
 * @supported Firefox
 */
export interface ManifestBase {
    /** @supported Firefox */
    manifest_version: number;
    /**
     * The applications property is deprecated, please use 'browser_specific_settings'
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    applications?: DeprecatedApplications | undefined;
    /** @supported Firefox */
    browser_specific_settings?: BrowserSpecificSettings | undefined;
    /**
     * Name must be at least 2, and should be at most 75 characters.
     *
     * @supported Firefox
     */
    name: string;
    /** @supported Firefox */
    short_name?: string | undefined;
    /** @supported Firefox */
    description?: string | undefined;
    /** @supported Firefox */
    author?: string | undefined;
    /** @supported Firefox */
    version: string;
    /** @supported Firefox */
    homepage_url?: string | undefined;
    /** @supported Firefox */
    install_origins?: string[] | undefined;
    /** @supported Firefox */
    developer?: _ManifestBaseDeveloper | undefined;
}
/**
 * @supported Firefox
 */
export interface WebExtensionLangpackManifest extends ManifestBase {
    /** @supported Firefox */
    langpack_id: string;
    /** @supported Firefox */
    languages: _WebExtensionLangpackManifestLanguages;
    /** @supported Firefox */
    sources?: _WebExtensionLangpackManifestSources | undefined;
}
/**
 * @supported Firefox
 */
export interface WebExtensionDictionaryManifest extends ManifestBase {
    /** @supported Firefox */
    dictionaries: _WebExtensionDictionaryManifestDictionaries;
}
/**
 * @supported Firefox
 */
export interface ThemeIcons {
    /**
     * A light icon to use for dark themes
     *
     * @supported Firefox
     */
    light: ExtensionURL;
    /**
     * The dark icon to use for light themes
     *
     * @supported Firefox
     */
    dark: ExtensionURL;
    /**
     * The size of the icons
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    id?: ExtensionID | undefined;
    /** @supported Firefox */
    update_url?: string | undefined;
    /** @supported Firefox */
    strict_min_version?: string | undefined;
    /** @supported Firefox */
    strict_max_version?: string | undefined;
    /** @supported Firefox */
    admin_install_only?: boolean | undefined;
    /** @supported Firefox */
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
    /** @supported Firefox */
    strict_min_version?: string | undefined;
    /** @supported Firefox */
    strict_max_version?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface DeprecatedApplications {
    /** @supported Firefox */
    gecko?: FirefoxSpecificProperties | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    gecko_android?: GeckoAndroidSpecificProperties | undefined;
}
/**
 * @supported Firefox
 */
export interface BrowserSpecificSettings {
    /** @supported Firefox */
    gecko?: FirefoxSpecificProperties | undefined;
    /** @supported Firefox */
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
    /** @supported Firefox */
    matches: MatchPattern[];
    /** @supported Firefox */
    exclude_matches?: MatchPattern[] | undefined;
    /** @supported Firefox */
    include_globs?: string[] | undefined;
    /** @supported Firefox */
    exclude_globs?: string[] | undefined;
    /**
     * The list of CSS files to inject
     *
     * @supported Firefox
     */
    css?: ExtensionURL[] | undefined;
    /**
     * The list of JS files to inject
     *
     * @supported Firefox
     */
    js?: ExtensionURL[] | undefined;
    /**
     * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
     *
     * @supported Firefox
     */
    all_frames?: boolean | undefined;
    /**
     * If match_about_blank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Ignored if match_origin_as_fallback is specified. By default it is `false`.
     *
     * @supported Firefox
     */
    match_about_blank?: boolean | undefined;
    /**
     * If match_origin_as_fallback is true, then the code is also injected in about:, data:, blob: when their origin matches the pattern in 'matches', even if the actual document origin is opaque (due to the use of CSP sandbox or iframe sandbox). Match patterns in 'matches' must specify a wildcard path glob. By default it is `false`.
     *
     * @supported Firefox
     */
    match_origin_as_fallback?: boolean | undefined;
    /**
     * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
     *
     * @supported Firefox
     */
    run_at?: extensionTypes.RunAt | undefined;
    /**
     * The JavaScript world for a script to execute within. Defaults to "ISOLATED".
     *
     * @supported Firefox
     */
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
 * @supported Chrome, Firefox
 */
export type ImageData = globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray };
/**
 * @supported Chrome, Firefox
 */
export type UnrecognizedProperty = _WebExtJsonValue;
/**
 * @supported Chrome, Firefox
 */
export interface NativeManifest {
  name: string;
  description: string;
  path?: string;
  type: string;
  allowed_extensions?: string[];
  data?: _WebExtJsonObject;
}
/**
 * @supported Firefox
 */
export type ThemeColor = string | [number, number, number] | [number, number, number, number];
/**
 * @supported Firefox
 */
export interface ThemeExperiment {
    /** @supported Firefox */
    stylesheet?: ExtensionURL | undefined;
    /** @supported Firefox */
    images?: { [key: string]: string } | undefined;
    /** @supported Firefox */
    colors?: { [key: string]: string } | undefined;
    /** @supported Firefox */
    properties?: { [key: string]: string } | undefined;
}
/**
 * @supported Firefox
 */
export interface ThemeType {
    /** @supported Firefox */
    images?: _ThemeTypeImages | undefined;
    /** @supported Firefox */
    colors?: _ThemeTypeColors | undefined;
    /** @supported Firefox */
    properties?: _ThemeType | undefined;
}
/**
 * @supported Firefox
 */
export interface ThemeManifest extends ManifestBase {
    /** @supported Firefox */
    theme: ThemeType;
    /** @supported Firefox */
    dark_theme?: ThemeType | undefined;
    /** @supported Firefox */
    default_locale?: string | undefined;
    /** @supported Firefox */
    theme_experiment?: ThemeExperiment | undefined;
    /** @supported Firefox */
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
    /**
     * A non-empty string uniquely identifying the ruleset. IDs beginning with '_' are reserved for internal use.
     *
     * @supported Firefox
     */
    id: string;
    /**
     * Whether the ruleset is enabled by default.
     *
     * @supported Firefox
     */
    enabled: boolean;
    /**
     * The path of the JSON ruleset relative to the extension directory.
     *
     * @supported Firefox
     */
    path: ExtensionURL;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestDeclarativeNetRequest {
    /** @supported Firefox */
    rule_resources: _WebExtensionManifestDeclarativeNetRequestRuleResources[];
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestIcons {
    /** @supported Firefox */
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
    /** @supported Firefox */
    page: ExtensionURL;
    /**
     * Defaults to true in Manifest V2; Deprecated in Manifest V3.
     *
     * @supported Firefox
     */
    browser_style?: boolean | undefined;
    /**
     * chrome_style is ignored in Firefox. Its replacement (browser_style) has been deprecated.
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    chrome_style?: boolean | undefined;
    /** @supported Firefox */
    open_in_tab?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestPageAction {
    /** @supported Firefox */
    default_title?: string | undefined;
    /** @supported Firefox */
    default_icon?: IconPath | undefined;
    /** @supported Firefox */
    default_popup?: string | undefined;
    /**
     * Deprecated in Manifest V3.
     *
     * @supported Firefox
     */
    browser_style?: boolean | undefined;
    /** @supported Firefox */
    show_matches?: MatchPattern[] | undefined;
    /** @supported Firefox */
    hide_matches?: MatchPatternRestricted[] | undefined;
    /** @supported Firefox */
    pinned?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestTelemetryPublicKeyKey {
    /** @supported Firefox */
    crv?: string | undefined;
    /** @supported Firefox */
    kty?: string | undefined;
    /** @supported Firefox */
    x?: string | undefined;
    /** @supported Firefox */
    y?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestTelemetryPublicKey {
    /** @supported Firefox */
    id: string;
    /** @supported Firefox */
    key: _WebExtensionManifestTelemetryPublicKeyKey;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestUserScripts {
    /** @supported Firefox */
    api_script?: ExtensionURL | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeSettingsOverridesSearchProvider {
    /** @supported Firefox */
    name: string;
    /** @supported Firefox */
    keyword?: string | string[] | undefined;
    /** @supported Firefox */
    search_url: string;
    /** @supported Firefox */
    favicon_url?: string | undefined;
    /** @supported Firefox */
    suggest_url?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    instant_url?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    image_url?: string | undefined;
    /**
     * GET parameters to the search_url as a query string.
     *
     * @supported Firefox
     */
    search_url_get_params?: string | undefined;
    /**
     * POST parameters to the search_url as a query string.
     *
     * @supported Firefox
     */
    search_url_post_params?: string | undefined;
    /**
     * GET parameters to the suggest_url as a query string.
     *
     * @supported Firefox
     */
    suggest_url_get_params?: string | undefined;
    /**
     * POST parameters to the suggest_url as a query string.
     *
     * @supported Firefox
     */
    suggest_url_post_params?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    instant_url_post_params?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    image_url_post_params?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    search_form?: string | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    alternate_urls?: string[] | undefined;
    /**
     * @deprecated Unsupported on Firefox.
     *
     * @supported Firefox
     */
    prepopulated_id?: number | undefined;
    /**
     * Encoding of the search term.
     *
     * @supported Firefox
     */
    encoding?: string | undefined;
    /**
     * Sets the default engine to a built-in engine only.
     *
     * @supported Firefox
     */
    is_default?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeSettingsOverrides {
    /** @supported Firefox */
    homepage?: string | undefined;
    /** @supported Firefox */
    search_provider?: _WebExtensionManifestChromeSettingsOverridesSearchProvider | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestCommandsSuggestedKey {
    /** @supported Firefox */
    default?: KeyName | undefined;
    /** @supported Firefox */
    mac?: KeyName | undefined;
    /** @supported Firefox */
    linux?: KeyName | undefined;
    /** @supported Firefox */
    windows?: KeyName | undefined;
    /** @supported Firefox */
    chromeos?: string | undefined;
    /** @supported Firefox */
    android?: string | undefined;
    /** @supported Firefox */
    ios?: string | undefined;
    /**
     * @deprecated Unknown platform name
     *
     * @supported Firefox
     */
    additionalProperties?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestCommands {
    /** @supported Firefox */
    suggested_key?: _WebExtensionManifestCommandsSuggestedKey | undefined;
    /** @supported Firefox */
    description?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestOmnibox {
    /** @supported Firefox */
    keyword: string;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestSidebarAction {
    /** @supported Firefox */
    default_title?: string | undefined;
    /** @supported Firefox */
    default_icon?: IconPath | undefined;
    /**
     * Defaults to true in Manifest V2; Deprecated in Manifest V3.
     *
     * @supported Firefox
     */
    browser_style?: boolean | undefined;
    /** @supported Firefox */
    default_panel: string;
    /**
     * Whether or not the sidebar is opened at install. Default is `true`.
     *
     * @supported Firefox
     */
    open_at_install?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _WebExtensionManifestChromeUrlOverrides {
    /** @supported Firefox */
    newtab?: ExtensionURL | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
    bookmarks?: ExtensionURL | undefined;
    /**
     * @deprecated Unsupported on Firefox at this time.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    name?: string | undefined;
    /** @supported Firefox */
    url?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _UndefinedChromeResources {
    /** @supported Firefox */
    [key: string]: ExtensionURL | {
            [key: string]: ExtensionURL;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionLangpackManifestLanguages {
    /** @supported Firefox */
    [key: string]: {
            chrome_resources: _UndefinedChromeResources;
            version: string;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionLangpackManifestSources {
    /** @supported Firefox */
    [key: string]: {
            base_path: ExtensionURL;
            paths?: string[] | undefined;
        };
}
/**
 * @supported Firefox
 */
export interface _WebExtensionDictionaryManifestDictionaries {
    /** @supported Firefox */
    [key: string]: string;
}
/**
 * @supported Firefox
 */
export interface _ThemeTypeImages {
    /** @supported Firefox */
    additional_backgrounds?: ImageDataOrExtensionURL[] | undefined;
    /**
     * @deprecated Unsupported images property, use 'theme.images.theme_frame', this alias is ignored in Firefox >= 70.
     *
     * @supported Firefox
     */
    headerURL?: ImageDataOrExtensionURL | undefined;
    /** @supported Firefox */
    theme_frame?: ImageDataOrExtensionURL | undefined;
}
/**
 * @supported Firefox
 */
export interface _ThemeTypeColors {
    /** @supported Firefox */
    tab_selected?: ThemeColor | undefined;
    /**
     * @deprecated Unsupported colors property, use 'theme.colors.frame', this alias is ignored in Firefox >= 70.
     *
     * @supported Firefox
     */
    accentcolor?: ThemeColor | undefined;
    /** @supported Firefox */
    frame?: ThemeColor | undefined;
    /** @supported Firefox */
    frame_inactive?: ThemeColor | undefined;
    /**
     * @deprecated Unsupported color property, use 'theme.colors.tab_background_text', this alias is ignored in Firefox >= 70.
     *
     * @supported Firefox
     */
    textcolor?: ThemeColor | undefined;
    /** @supported Firefox */
    tab_background_text?: ThemeColor | undefined;
    /** @supported Firefox */
    tab_background_separator?: ThemeColor | undefined;
    /** @supported Firefox */
    tab_loading?: ThemeColor | undefined;
    /** @supported Firefox */
    tab_text?: ThemeColor | undefined;
    /** @supported Firefox */
    tab_line?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar?: ThemeColor | undefined;
    /**
     * This color property is an alias of 'bookmark_text'.
     *
     * @supported Firefox
     */
    toolbar_text?: ThemeColor | undefined;
    /** @supported Firefox */
    bookmark_text?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_text?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_border?: ThemeColor | undefined;
    /**
     * @deprecated This color property is ignored in Firefox >= 89.
     *
     * @supported Firefox
     */
    toolbar_field_separator?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_top_separator?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_bottom_separator?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_vertical_separator?: ThemeColor | undefined;
    /** @supported Firefox */
    icons?: ThemeColor | undefined;
    /** @supported Firefox */
    icons_attention?: ThemeColor | undefined;
    /** @supported Firefox */
    button_background_hover?: ThemeColor | undefined;
    /** @supported Firefox */
    button_background_active?: ThemeColor | undefined;
    /** @supported Firefox */
    popup?: ThemeColor | undefined;
    /** @supported Firefox */
    popup_text?: ThemeColor | undefined;
    /** @supported Firefox */
    popup_border?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_focus?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_text_focus?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_border_focus?: ThemeColor | undefined;
    /** @supported Firefox */
    popup_highlight?: ThemeColor | undefined;
    /** @supported Firefox */
    popup_highlight_text?: ThemeColor | undefined;
    /** @supported Firefox */
    ntp_background?: ThemeColor | undefined;
    /** @supported Firefox */
    ntp_card_background?: ThemeColor | undefined;
    /** @supported Firefox */
    ntp_text?: ThemeColor | undefined;
    /** @supported Firefox */
    sidebar?: ThemeColor | undefined;
    /** @supported Firefox */
    sidebar_border?: ThemeColor | undefined;
    /** @supported Firefox */
    sidebar_text?: ThemeColor | undefined;
    /** @supported Firefox */
    sidebar_highlight?: ThemeColor | undefined;
    /** @supported Firefox */
    sidebar_highlight_text?: ThemeColor | undefined;
    /** @supported Firefox */
    toolbar_field_highlight?: ThemeColor | undefined;
    /** @supported Firefox */
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
    /** @supported Firefox */
    additional_backgrounds_alignment?: _ThemeTypeAdditionalBackgroundsAlignment[] | undefined;
    /** @supported Firefox */
    additional_backgrounds_tiling?: _ThemeTypeAdditionalBackgroundsTiling[] | undefined;
    /** @supported Firefox */
    color_scheme?: _ThemeTypeColorScheme | undefined;
    /** @supported Firefox */
    content_color_scheme?: _ThemeTypeContentColorScheme | undefined;
}
/**
 * @supported Firefox
 */
export interface _ThemeManifestIcons {
    /** @supported Firefox */
    [key: number]: string;
}

}

export namespace activityLog {
/**
 * @privileged Requires privileged permission: activityLog
 * @supported Firefox
 */
export type _OnExtensionActivityDetailsType =
        | "api_call"
        | "api_event"
        | "content_script"
        | "user_script";
/**
 * @privileged Requires privileged permission: activityLog
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
 * @privileged Requires privileged permission: activityLog
 * @supported Firefox
 */
export interface _OnExtensionActivityDetailsData {
    /**
     * A list of arguments passed to the call.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    args?: /* TODO: Upstream type uses any */ any[] | undefined;
    /**
     * The result of the call.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    result?: object | undefined;
    /**
     * The tab associated with this event if it is a tab or content script.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * If the type is content_script, this is the url of the script that was injected.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    url?: string | undefined;
}
/**
 * @privileged Requires privileged permission: activityLog
 * @supported Firefox
 */
export interface _OnExtensionActivityDetails {
    /**
     * The date string when this call is triggered.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    timeStamp: extensionTypes.Date;
    /**
     * The type of log entry. api_call is a function call made by the extension and api_event is an event callback to the extension. content_script is logged when a content script is injected.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    type: _OnExtensionActivityDetailsType;
    /**
     * The type of view where the activity occurred. Content scripts will not have a viewType.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    viewType?: _OnExtensionActivityDetailsViewType | undefined;
    /**
     * The name of the api call or event, or the script url if this is a content or user script event.
     *
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    name: string;
    /**
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    data: _OnExtensionActivityDetailsData;
}
/**
 * @privileged Requires privileged permission: activityLog
 * @supported Firefox
 */
export interface _ActivityLogOnExtensionActivityEvent<TCallback = (details: _OnExtensionActivityDetails) => void> {
    /**
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    addListener(cb: TCallback, id: string): void;
    /**
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    removeListener(cb: TCallback): void;
    /**
     * @privileged Requires privileged permission: activityLog
     * @supported Firefox
     */
    hasListener(cb: TCallback): boolean;
}
/**
 * @privileged Requires privileged permission: activityLog
 * @supported Firefox
 */
export const onExtensionActivity: _ActivityLogOnExtensionActivityEvent;

}

export namespace browserAction {
/**
 * @supported Firefox
 */
export interface Details {
    /**
     * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
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
    /**
     * An array of keyboard modifiers that were held while the menu item was clicked.
     *
     * @supported Firefox
     */
    modifiers: _OnClickDataModifiers[];
    /**
     * An integer value of button by which menu item was clicked.
     *
     * @supported Firefox
     */
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
    /**
     * The string the browser action should display when moused over.
     *
     * @supported Firefox
     */
    title: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails extends Details {
    /**
     * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    /**
     * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    path?: string | {
            [key: number]: string;
        } | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails extends Details {
    /**
     * The html file to show in a popup. If set to the empty string (''), no popup is shown.
     *
     * @supported Firefox
     */
    popup: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextDetails extends Details {
    /**
     * Any number of characters can be passed, but only about four can fit in the space.
     *
     * @supported Firefox
     */
    text: string | null;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeBackgroundColorDetails extends Details {
    /** @supported Firefox */
    color: ColorValue;
}
/**
 * @supported Firefox
 */
export interface _SetBadgeTextColorDetails extends Details {
    /** @supported Firefox */
    color: ColorValue;
}
/**
 * @supported Firefox
 */
export interface _OpenPopupOptions {
    /**
     * Defaults to the current window.
     *
     * @supported Firefox
     */
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
 * @privileged Allowlist-gated on stable channel; open on dev channel
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
    /**
     * The current captive portal state.
     *
     * @supported Firefox
     */
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
    /**
     * The name of the contextual identity.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The icon name of the contextual identity.
     *
     * @supported Firefox
     */
    icon: string;
    /**
     * The icon url of the contextual identity.
     *
     * @supported Firefox
     */
    iconUrl: string;
    /**
     * The color name of the contextual identity.
     *
     * @supported Firefox
     */
    color: string;
    /**
     * The color hash of the contextual identity.
     *
     * @supported Firefox
     */
    colorCode: string;
    /**
     * The cookie store ID of the contextual identity.
     *
     * @supported Firefox
     */
    cookieStoreId: string;
}
/**
 * @supported Firefox
 */
export interface _QueryDetails {
    /**
     * Filters the contextual identity by name.
     *
     * @supported Firefox
     */
    name?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _CreateDetails {
    /**
     * The name of the contextual identity.
     *
     * @supported Firefox
     */
    name: string;
    /**
     * The color of the contextual identity.
     *
     * @supported Firefox
     */
    color: string;
    /**
     * The icon of the contextual identity.
     *
     * @supported Firefox
     */
    icon: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateDetails {
    /**
     * The name of the contextual identity.
     *
     * @supported Firefox
     */
    name?: string | undefined;
    /**
     * The color of the contextual identity.
     *
     * @supported Firefox
     */
    color?: string | undefined;
    /**
     * The icon of the contextual identity.
     *
     * @supported Firefox
     */
    icon?: string | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnUpdatedChangeInfo {
    /**
     * Contextual identity that has been updated
     *
     * @supported Firefox
     */
    contextualIdentity: ContextualIdentity;
}
/**
 * @supported Firefox
 */
export interface _OnCreatedChangeInfo {
    /**
     * Contextual identity that has been created
     *
     * @supported Firefox
     */
    contextualIdentity: ContextualIdentity;
}
/**
 * @supported Firefox
 */
export interface _OnRemovedChangeInfo {
    /**
     * Contextual identity that has been removed
     *
     * @supported Firefox
     */
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
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export interface ExperimentAPI {
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    schema: ExperimentURL;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    parent?: _ExperimentAPIParent | undefined;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    child?: _ExperimentAPIChild | undefined;
}
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type ExperimentURL = string;
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIPaths = APIPath[];
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIPath = string[];
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIEvents = APIEvent[];
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIEvent = "startup";
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIParentScope =
        | "addon_parent"
        | "content_parent"
        | "devtools_parent";
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export type APIChildScope =
        | "addon_child"
        | "content_child"
        | "devtools_child";
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export interface _ExperimentAPIParent {
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    events?: APIEvents | undefined;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    paths?: APIPaths | undefined;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    script: ExperimentURL;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    scopes?: APIParentScope[] | undefined;
}
/**
 * @privileged Requires privileged permission: experiments
 * @supported Firefox
 */
export interface _ExperimentAPIChild {
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    paths: APIPaths;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    script: ExperimentURL;
    /**
     * @privileged Requires privileged permission: experiments
     * @supported Firefox
     */
    scopes: APIChildScope[];
}

}

export namespace geckoProfiler {
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export type ProfilerFeature = "java" | "js" | "mainthreadio" | "fileio" | "fileioall" | "nomarkerstacks" | "screenshots" | "seqstyle" | "stackwalk" | "jsallocations" | "nostacksampling" | "nativeallocations" | "ipcmessages" | "audiocallbacktracing" | "notimerresolutionchange" | "cpuallthreads" | "samplingallthreads" | "markersallthreads" | "unregisteredthreads" | "processcpu" | "power" | "responsiveness" | "cpufreq" | "bandwidth" | "memory" | "tracing" | "sandbox" | "flows" | "jssources";
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export type Supports = "windowLength";
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export interface _StartSettings {
    /**
     * The maximum size in bytes of the buffer used to store profiling data. A larger value allows capturing a profile that covers a greater amount of time.
     *
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    bufferSize: number;
    /**
     * The length of the window of time that's kept in the buffer. Any collected samples are discarded as soon as they are older than the number of seconds specified in this setting. Zero means no duration restriction.
     *
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    windowLength?: number | undefined;
    /**
     * Interval in milliseconds between samples of profiling data. A smaller value will increase the detail of the profiles captured.
     *
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    interval: number;
    /**
     * A list of active features for the profiler.
     *
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    features: ProfilerFeature[];
    /**
     * A list of thread names for which to capture profiles.
     *
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    threads?: string[] | undefined;
}
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function start(settings: StartSettings): Promise<void>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function stop(): Promise<void>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function pause(): Promise<void>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function resume(): Promise<void>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function dumpProfileToFile(fileName: string): Promise<string>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function getProfile(): Promise<Record<string, unknown>>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function getProfileAsArrayBuffer(): Promise<ArrayBuffer>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function getProfileAsGzippedArrayBuffer(): Promise<ArrayBuffer>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export function getSymbols(debugName: string, breakpadId: string): Promise<Record<string, unknown>>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export const onRunning: events.Event<(isRunning: boolean) => void>;
/**
 * @privileged Requires privileged permission: geckoProfiler
 * @supported Firefox
 */
export interface StartSettings {
    /**
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    bufferSize: number;
    /**
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    features: ProfilerFeature[];
    /**
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    interval: number;
    /**
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    windowLength?: number;
    /**
     * @privileged Requires privileged permission: geckoProfiler
     * @supported Firefox
     */
    threads?: string[];
}

}

export namespace networkStatus {
/**
 * @privileged Requires privileged permission: networkStatus
 * @supported Firefox
 */
export interface NetworkLinkInfo {
    /**
     * Status of the network link, if "unknown" then link is usually assumed to be "up"
     *
     * @privileged Requires privileged permission: networkStatus
     * @supported Firefox
     */
    status: _NetworkLinkInfoStatus;
    /**
     * If known, the type of network connection that is avialable.
     *
     * @privileged Requires privileged permission: networkStatus
     * @supported Firefox
     */
    type: _NetworkLinkInfoType;
    /**
     * If known, the network id or name.
     *
     * @privileged Requires privileged permission: networkStatus
     * @supported Firefox
     */
    id?: string | undefined;
}
/**
 * @privileged Requires privileged permission: networkStatus
 * @supported Firefox
 */
export type _NetworkLinkInfoStatus =
        | "unknown"
        | "up"
        | "down";
/**
 * @privileged Requires privileged permission: networkStatus
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
 * @privileged Requires privileged permission: networkStatus
 * @supported Firefox
 */
export function getLinkInfo(): Promise<NetworkLinkInfo>;
/**
 * @privileged Requires privileged permission: networkStatus
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
    /**
     * An array of keyboard modifiers that were held while the menu item was clicked.
     *
     * @supported Firefox
     */
    modifiers: _OnClickDataModifiers[];
    /**
     * An integer value of button by which menu item was clicked.
     *
     * @supported Firefox
     */
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
    /**
     * Specify the tab to get the shownness from.
     *
     * @supported Firefox
     */
    tabId: number;
}
/**
 * @supported Firefox
 */
export interface _SetTitleDetails {
    /**
     * The id of the tab for which you want to modify the page action.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The tooltip string.
     *
     * @supported Firefox
     */
    title: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetTitleDetails {
    /**
     * Specify the tab to get the title from.
     *
     * @supported Firefox
     */
    tabId: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface _SetIconDetails {
    /** @supported Chrome, Firefox */
    tabId: number;
    /**
     * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    /**
     * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    path?: string | {
            [key: number]: string;
        } | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPopupDetails {
    /**
     * The id of the tab for which you want to modify the page action.
     *
     * @supported Firefox
     */
    tabId: number;
    /**
     * The html file to show in a popup. If set to the empty string (''), no popup is shown.
     *
     * @supported Firefox
     */
    popup: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetPopupDetails {
    /**
     * Specify the tab to get the popup from.
     *
     * @supported Firefox
     */
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
    /**
     * The minimum TLS version supported.
     *
     * @supported Firefox
     */
    minimum?: _TlsVersionRestrictionConfigMinimum | undefined;
    /**
     * The maximum TLS version supported.
     *
     * @supported Firefox
     */
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
 * @supported Chrome, Firefox
 */
export const networkPredictionEnabled: types.Setting;
/**
 * @supported Firefox
 */
export const peerConnectionEnabled: types.Setting;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
    /**
     * The type of cookies to allow.
     *
     * @supported Firefox
     */
    behavior?: _CookieConfigBehavior | undefined;
    /**
     * Whether to create all cookies as nonPersistent (i.e., session) cookies.
     * @deprecated This property has no effect anymore and its value is always `false`.``
     *
     * @supported Firefox
     */
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
 * @supported Chrome, Firefox
 */
export const thirdPartyCookiesAllowed: types.Setting | undefined;
/**
 * @supported Chrome, Firefox
 */
export const hyperlinkAuditingEnabled: types.Setting;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export const protectedContentEnabled: types.Setting | undefined;
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
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export type ScalarType =
        | "count"
        | "string"
        | "boolean";
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export interface ScalarData {
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    kind: ScalarType;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    keyed?: boolean;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    record_on_release?: boolean;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    expired?: boolean;
}
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export interface EventData {
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    methods: string[];
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    objects: string[];
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    extra_keys: string[];
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    record_on_release?: boolean;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    expired?: boolean;
}
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export interface _SubmitPingOptions {
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    addClientId?: boolean;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    addEnvironment?: boolean;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    overrideEnvironment?: Record<string, unknown>;
    /**
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    usePingSender?: boolean;
}
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export interface _SubmitEncryptedPingOptions {
    /**
     * Schema name used for payload.
     *
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    schemaName: string;
    /**
     * Schema version used for payload.
     *
     * @privileged Requires privileged permission: telemetry
     * @supported Firefox
     */
    schemaVersion: number;
}
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function submitPing(type: string, message: Record<string, unknown>, options?: _SubmitPingOptions): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function canUpload(): Promise<boolean>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function scalarAdd(name: string, value: number): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function scalarSet(name: string, value: string | boolean | number | Record<string, unknown>): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function scalarSetMaximum(name: string, value: number): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function keyedScalarAdd(name: string, key: string, value: number): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function keyedScalarSet(name: string, key: string, value: string | boolean | number | Record<string, unknown>): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function keyedScalarSetMaximum(name: string, key: string, value: number): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function recordEvent(category: string, method: string, object: string, value?: string, extra?: Record<string, string>): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function registerScalars(category: string, data: Record<string, ScalarData>): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function registerEvents(category: string, data: Record<string, EventData>): Promise<void>;
/**
 * @privileged Requires privileged permission: telemetry
 * @supported Firefox
 */
export function setEventRecordingEnabled(category: string, enabled: boolean): Promise<void>;

}

export namespace theme {
/**
 * @supported Firefox
 */
export interface ThemeUpdateInfo {
    /**
     * The new theme after update
     *
     * @supported Firefox
     */
    theme: object;
    /**
     * The id of the window the theme has been applied to
     *
     * @supported Firefox
     */
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
    /**
     * Tab to query. Defaults to the active tab.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Find only ranges with case sensitive match.
     *
     * @supported Firefox
     */
    caseSensitive?: boolean | undefined;
    /**
     * Find only ranges with diacritic sensitive match.
     *
     * @supported Firefox
     */
    matchDiacritics?: boolean | undefined;
    /**
     * Find only ranges that match entire word.
     *
     * @supported Firefox
     */
    entireWord?: boolean | undefined;
    /**
     * Return rectangle data which describes visual position of search results.
     *
     * @supported Firefox
     */
    includeRectData?: boolean | undefined;
    /**
     * Return range data which provides range data in a serializable form.
     *
     * @supported Firefox
     */
    includeRangeData?: boolean | undefined;
}
/**
 * @supported Firefox
 */
export interface _HighlightResultsParams {
    /**
     * Found range to be highlighted. Default highlights all ranges.
     *
     * @supported Firefox
     */
    rangeIndex?: number | undefined;
    /**
     * Tab to highlight. Defaults to the active tab.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Don't scroll to highlighted item.
     *
     * @supported Firefox
     */
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
    /**
     * The ID of the menu item that was clicked.
     *
     * @supported Firefox
     */
    menuItemId: number | string;
    /**
     * The parent ID, if any, for the item clicked.
     *
     * @supported Firefox
     */
    parentMenuItemId?: number | string | undefined;
    /**
     * The type of view where the menu is clicked. May be unset if the menu is not associated with a view.
     *
     * @supported Firefox
     */
    viewType?: extension.ViewType | undefined;
    /**
     * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
     *
     * @supported Firefox
     */
    mediaType?: string | undefined;
    /**
     * If the element is a link, the text of that link.
     *
     * @supported Firefox
     */
    linkText?: string | undefined;
    /**
     * If the element is a link, the URL it points to.
     *
     * @supported Firefox
     */
    linkUrl?: string | undefined;
    /**
     * Will be present for elements with a 'src' URL.
     *
     * @supported Firefox
     */
    srcUrl?: string | undefined;
    /**
     * The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
     *
     * @supported Firefox
     */
    pageUrl?: string | undefined;
    /**
     * The id of the frame of the element where the context menu was clicked.
     *
     * @supported Firefox
     */
    frameId?: number | undefined;
    /**
     * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
     *
     * @supported Firefox
     */
    frameUrl?: string | undefined;
    /**
     * The text for the context selection, if any.
     *
     * @supported Firefox
     */
    selectionText?: string | undefined;
    /**
     * A flag indicating whether the element is editable (text input, textarea, etc.).
     *
     * @supported Firefox
     */
    editable: boolean;
    /**
     * A flag indicating the state of a checkbox or radio item before it was clicked.
     *
     * @supported Firefox
     */
    wasChecked?: boolean | undefined;
    /**
     * A flag indicating the state of a checkbox or radio item after it is clicked.
     *
     * @supported Firefox
     */
    checked?: boolean | undefined;
    /**
     * The id of the bookmark where the context menu was clicked, if it was on a bookmark.
     *
     * @supported Firefox
     */
    bookmarkId?: string | undefined;
    /**
     * An array of keyboard modifiers that were held while the menu item was clicked.
     *
     * @supported Firefox
     */
    modifiers: _OnClickDataModifiers[];
    /**
     * An integer value of button by which menu item was clicked.
     *
     * @supported Firefox
     */
    button?: number | undefined;
    /**
     * An identifier of the clicked element, if any. Use menus.getTargetElement in the page to find the corresponding element.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
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
    /**
     * The type of menu item. Defaults to 'normal' if not specified.
     *
     * @supported Firefox
     */
    type?: ItemType | undefined;
    /**
     * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
     *
     * @supported Firefox
     */
    id?: string | undefined;
    /** @supported Firefox */
    icons?: _CreateCreatePropertiesIcons | undefined;
    /**
     * The text to be displayed in the item; this is _required_ unless `type` is 'separator'. When the context is 'selection', you can use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
     *
     * @supported Firefox
     */
    title?: string | undefined;
    /**
     * The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.
     *
     * @supported Firefox
     */
    checked?: boolean | undefined;
    /**
     * List of contexts this menu item will appear in. Defaults to ['page'] if not specified.
     *
     * @supported Firefox
     */
    contexts?: ContextType[] | undefined;
    /**
     * List of view types where the menu item will be shown. Defaults to any view, including those without a viewType.
     *
     * @supported Firefox
     */
    viewTypes?: extension.ViewType[] | undefined;
    /**
     * Whether the item is visible in the menu.
     *
     * @supported Firefox
     */
    visible?: boolean | undefined;
    /**
     * A function that will be called back when the menu item is clicked. Event pages cannot use this; instead, they should register a listener for `contextMenus.onClicked`.
     * @param info Information about the item clicked and the context where the click happened.
     * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    onclick?(info: OnClickData, tab: tabs.Tab): void | undefined;
    /**
     * The ID of a parent menu item; this makes the item a child of a previously added item.
     *
     * @supported Firefox
     */
    parentId?: number | string | undefined;
    /**
     * Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see Match Patterns.
     *
     * @supported Firefox
     */
    documentUrlPatterns?: string[] | undefined;
    /**
     * Similar to documentUrlPatterns, but lets you filter based on the src attribute of img/audio/video tags and the href of anchor tags.
     *
     * @supported Firefox
     */
    targetUrlPatterns?: string[] | undefined;
    /**
     * Whether this context menu item is enabled or disabled. Defaults to true.
     *
     * @supported Firefox
     */
    enabled?: boolean | undefined;
    /**
     * Specifies a command to issue for the context click.
     *
     * @supported Firefox
     */
    command?: string | _CreateCreatePropertiesCommand | undefined;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdatePropertiesIcons {
    /** @supported Firefox */
    [key: number]: string;
}
/**
 * @supported Firefox
 */
export interface _UpdateUpdateProperties {
    /** @supported Firefox */
    type?: ItemType | undefined;
    /** @supported Firefox */
    icons?: _UpdateUpdatePropertiesIcons | undefined;
    /** @supported Firefox */
    title?: string | undefined;
    /** @supported Firefox */
    checked?: boolean | undefined;
    /** @supported Firefox */
    contexts?: ContextType[] | undefined;
    /** @supported Firefox */
    viewTypes?: extension.ViewType[] | undefined;
    /**
     * Whether the item is visible in the menu.
     *
     * @supported Firefox
     */
    visible?: boolean | undefined;
    /**
     * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
     * Not supported on manifest versions above 2.
     *
     * @supported Firefox
     */
    onclick?(info: OnClickData, tab: tabs.Tab): void | undefined;
    /**
     * Note: You cannot change an item to be a child of one of its own descendants.
     *
     * @supported Firefox
     */
    parentId?: number | string | undefined;
    /** @supported Firefox */
    documentUrlPatterns?: string[] | undefined;
    /** @supported Firefox */
    targetUrlPatterns?: string[] | undefined;
    /** @supported Firefox */
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
    /**
     * Whether to also include default menu items in the menu.
     *
     * @supported Firefox
     */
    showDefaults?: boolean | undefined;
    /**
     * ContextType to override, to allow menu items from other extensions in the menu. Currently only 'bookmark' and 'tab' are supported. showDefaults cannot be used with this option.
     *
     * @supported Firefox
     */
    context?: _OverrideContextContextOptionsContext | undefined;
    /**
     * Required when context is 'bookmark'. Requires 'bookmark' permission.
     *
     * @supported Firefox
     */
    bookmarkId?: string | undefined;
    /**
     * Required when context is 'tab'. Requires 'tabs' permission.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _OnShownInfo {
    /**
     * A list of IDs of the menu items that were shown.
     *
     * @supported Firefox
     */
    menuIds: Array<number | string>;
    /**
     * A list of all contexts that apply to the menu.
     *
     * @supported Firefox
     */
    contexts: ContextType[];
    /** @supported Firefox */
    viewType?: extension.ViewType | undefined;
    /** @supported Firefox */
    editable: boolean;
    /** @supported Firefox */
    mediaType?: string | undefined;
    /** @supported Firefox */
    linkUrl?: string | undefined;
    /** @supported Firefox */
    linkText?: string | undefined;
    /** @supported Firefox */
    srcUrl?: string | undefined;
    /** @supported Firefox */
    pageUrl?: string | undefined;
    /** @supported Firefox */
    frameUrl?: string | undefined;
    /** @supported Firefox */
    selectionText?: string | undefined;
    /** @supported Firefox */
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
 * @privileged Requires privileged permission: normandyAddonStudy
 * @supported Firefox
 */
export interface Study {
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    recipeId: number;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    slug: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    userFacingName: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    userFacingDescription: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    branch: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    active: boolean;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    addonId: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    addonUrl: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    addonVersion: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    studyStartDate: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    studyEndDate: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    extensionApiId: number;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    extensionHash: string;
    /**
     * @privileged Requires privileged permission: normandyAddonStudy
     * @supported Firefox
     */
    extensionHashAlgorithm: string;
}
/**
 * @privileged Requires privileged permission: normandyAddonStudy
 * @supported Firefox
 */
export function getStudy(): Promise<Study | null>;
/**
 * @privileged Requires privileged permission: normandyAddonStudy
 * @supported Firefox
 */
export function endStudy(reason: string): Promise<void>;
/**
 * @privileged Requires privileged permission: normandyAddonStudy
 * @supported Firefox
 */
export function getClientMetadata(): Promise<Record<string, unknown>>;
/**
 * @privileged Requires privileged permission: normandyAddonStudy
 * @supported Firefox
 */
export const onUnenroll: events.Event<(reason: string) => void>;

}

export namespace pkcs11 {
/**
 * @privileged Requires privileged permission: pkcs11
 * @supported Firefox
 */
export function isModuleInstalled(name: string): Promise<boolean>;
/**
 * @privileged Requires privileged permission: pkcs11
 * @supported Firefox
 */
export function installModule(name: string, flags?: number): Promise<void>;
/**
 * @privileged Requires privileged permission: pkcs11
 * @supported Firefox
 */
export function uninstallModule(name: string): Promise<void>;
/**
 * @privileged Requires privileged permission: pkcs11
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
    /**
     * The string the sidebar action should display when moused over.
     *
     * @supported Firefox
     */
    title: string | null;
    /**
     * Sets the sidebar title for the tab specified by tabId. Automatically resets when the tab is closed.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Sets the sidebar title for the window specified by windowId.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _GetTitleDetails {
    /**
     * Specify the tab to get the title from. If no tab nor window is specified, the global title is returned.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Specify the window to get the title from. If no tab nor window is specified, the global title is returned.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetIconDetails {
    /**
     * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    /**
     * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
     *
     * @supported Firefox
     */
    path?: string | { [key: string]: string } | undefined;
    /**
     * Sets the sidebar icon for the tab specified by tabId. Automatically resets when the tab is closed.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Sets the sidebar icon for the window specified by windowId.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _SetPanelDetails {
    /**
     * Sets the sidebar url for the tab specified by tabId. Automatically resets when the tab is closed.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Sets the sidebar url for the window specified by windowId.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
    /**
     * The url to the html file to show in a sidebar. If set to the empty string (''), no sidebar is shown.
     *
     * @supported Firefox
     */
    panel: string | null;
}
/**
 * @supported Firefox
 */
export interface _GetPanelDetails {
    /**
     * Specify the tab to get the panel from. If no tab nor window is specified, the global panel is returned.
     *
     * @supported Firefox
     */
    tabId?: number | undefined;
    /**
     * Specify the window to get the panel from. If no tab nor window is specified, the global panel is returned.
     *
     * @supported Firefox
     */
    windowId?: number | undefined;
}
/**
 * @supported Firefox
 */
export interface _IsOpenDetails {
    /**
     * Specify the window to get the openness from.
     *
     * @supported Firefox
     */
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
    /**
     * Whether the query's browser context is private.
     *
     * @supported Firefox
     */
    isPrivate: boolean;
    /**
     * The maximum number of results shown to the user.
     *
     * @supported Firefox
     */
    maxResults: number;
    /**
     * The query's search string.
     *
     * @supported Firefox
     */
    searchString: string;
    /**
     * List of acceptable source types to return.
     *
     * @supported Firefox
     */
    sources: SourceType[];
}
/**
 * @supported Firefox
 */
export interface Result {
    /**
     * An object with arbitrary properties depending on the result's type.
     *
     * @supported Firefox
     */
    payload: object;
    /**
     * The result's source.
     *
     * @supported Firefox
     */
    source: SourceType;
    /**
     * The result's type.
     *
     * @supported Firefox
     */
    type: ResultType;
    /**
     * Suggest a preferred position for this result within the result set.
     *
     * @supported Firefox
     */
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
    /**
     * Whether to focus the input field and select its contents.
     *
     * @supported Firefox
     */
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
    /** @supported Firefox */
    addListener(cb: TCallback, providerName: string): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnEngagementEvent<TCallback = (state: EngagementState) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, providerName: string): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnQueryCanceledEvent<TCallback = (query: Query) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, providerName: string): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnResultsRequestedEvent<TCallback = (query: Query) => Result[]> {
    /** @supported Firefox */
    addListener(cb: TCallback, providerName: string): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
    hasListener(cb: TCallback): boolean;
}
/**
 * @supported Firefox
 */
export interface _UrlbarOnResultPickedEvent<TCallback = (payload: object, elementName: string) => void> {
    /** @supported Firefox */
    addListener(cb: TCallback, providerName: string): void;
    /** @supported Firefox */
    removeListener(cb: TCallback): void;
    /** @supported Firefox */
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
