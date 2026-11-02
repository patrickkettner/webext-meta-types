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
 * @supported Chrome
 */
export function setIcon(

      details: {

        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: extensionTypes.ImageDataType | {[name: string]: /* TODO: Upstream type uses any */ any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
         */
        path?: string | {[name: string]: /* TODO: Upstream type uses any */ any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setIcon(

      details: {

        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: extensionTypes.ImageDataType | {[name: string]: /* TODO: Upstream type uses any */ any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
         */
        path?: string | {[name: string]: /* TODO: Upstream type uses any */ any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }): Promise<void>;
/**
 * @supported Chrome
 */
export function setBadgeTextColor(details: { color: string | ColorArray | null; tabId?: number }, callback: () => void): void;
/**
 * @supported Chrome
 */
export function getBadgeTextColor(details: { tabId?: number }): Promise<ColorArray>;
/**
 * @supported Chrome
 */
export function getBadgeTextColor(details: { tabId?: number }, callback: (color: ColorArray) => void): void;
/**
 * @supported Chrome
 */
export function isEnabled(

      tabId?: number,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function isEnabled(

      tabId?: number,

      /**
       * @param isEnabled True if the extension action is enabled.
       */
      callback?: (
        isEnabled: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getUserSettings(): Promise<UserSettings>;
/**
 * @supported Chrome
 */
export function getUserSettings(

      callback?: (
        userSettings: UserSettings,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function openPopup(options?: OpenPopupOptions): Promise<void>;
/**
 * @supported Chrome
 */
export function openPopup(options: OpenPopupOptions | undefined, callback: () => void): void;
/**
 * @supported Chrome
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Chrome
 */
export type ColorArray = [number, number, number, number];
/**
 * @supported Chrome
 */
export const onClicked: events.Event<(tab: tabs.Tab) => void>;
/**
 * @supported Chrome
 */
export interface SetIconDetails {
    tabId?: number;
    imageData?: globalThis.ImageData | extensionTypes.ImageDataType | ImageDataSizeMap;
    path?: string | IconSizeMap;
}
/**
 * @supported Chrome
 */
export type IconSizeMap = Record<number | string, string>;
/**
 * @supported Chrome
 */
export type ImageDataSizeMap = Record<number | string, globalThis.ImageData | extensionTypes.ImageDataType>;

}

export namespace alarms {
/**
 * @supported Chrome
 */
export function create(

      name: string,

      alarmInfo: AlarmCreateInfo,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function create(

      alarmInfo: AlarmCreateInfo,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function create(

      name: string,

      alarmInfo: AlarmCreateInfo,

      /**
       * @since Chrome 111
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function create(

      alarmInfo: AlarmCreateInfo,

      /**
       * @since Chrome 111
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function get(

      name?: string,
    ): Promise<Alarm | undefined>;
/**
 * @supported Chrome
 */
export function get(

      name?: string,

      callback?: (
        alarm?: Alarm,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAll(): Promise<Alarm[]>;
/**
 * @supported Chrome
 */
export function getAll(

      callback?: (
        alarms: Alarm[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function clear(

      name?: string,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function clear(

      name?: string,

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearAll(): Promise<boolean | undefined>;
/**
 * @supported Chrome
 */
export function clearAll(

      callback?: (
        wasCleared?: boolean,
      ) => void,
    ): void;

}

export namespace audio {
/**
 * @supported Chrome
 */
export function getDevices(

      filter?: DeviceFilter,
    ): Promise<AudioDeviceInfo[]>;
/**
 * @supported Chrome
 */
export function getDevices(

      filter?: DeviceFilter,

      callback?: (
        devices: AudioDeviceInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setActiveDevices(

      ids: DeviceIdLists,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setActiveDevices(

      ids: DeviceIdLists,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setProperties(

      id: string,

      properties: DeviceProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setProperties(

      id: string,

      properties: DeviceProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMute(

      streamType: StreamType,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function getMute(

      streamType: StreamType,

      callback?: (
        value: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setMute(

      streamType: StreamType,

      isMuted: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setMute(

      streamType: StreamType,

      isMuted: boolean,

      callback?: () => void,
    ): void;

}

export namespace bookmarks {
/**
 * @supported Chrome
 */
export function get(

      idOrIdList: string | [string, ...string[]],
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function get(

      idOrIdList: string | [string, ...string[]],

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getChildren(

      id: string,
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function getChildren(

      id: string,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getRecent(

      numberOfItems: number,
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function getRecent(

      numberOfItems: number,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getTree(): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function getTree(

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getSubTree(

      id: string,
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function getSubTree(

      id: string,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function search(

      query: string | {

        /**
         * A string of words and quoted phrases that are matched against bookmark URLs and titles.
         */
        query?: string,

        /**
         * The URL of the bookmark; matches verbatim. Note that folders have no URL.
         */
        url?: string,

        /**
         * The title of the bookmark; matches verbatim.
         */
        title?: string,
      },
    ): Promise<BookmarkTreeNode[]>;
/**
 * @supported Chrome
 */
export function search(

      query: string | {

        /**
         * A string of words and quoted phrases that are matched against bookmark URLs and titles.
         */
        query?: string,

        /**
         * The URL of the bookmark; matches verbatim. Note that folders have no URL.
         */
        url?: string,

        /**
         * The title of the bookmark; matches verbatim.
         */
        title?: string,
      },

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function create(

      bookmark: CreateDetails,
    ): Promise<BookmarkTreeNode>;
/**
 * @supported Chrome
 */
export function create(

      bookmark: CreateDetails,

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function move(

      id: string,

      destination: {

        parentId?: string,

        index?: number,
      },
    ): Promise<BookmarkTreeNode>;
/**
 * @supported Chrome
 */
export function move(

      id: string,

      destination: {

        parentId?: string,

        index?: number,
      },

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      id: string,

      changes: {

        title?: string,

        url?: string,
      },
    ): Promise<BookmarkTreeNode>;
/**
 * @supported Chrome
 */
export function update(

      id: string,

      changes: {

        title?: string,

        url?: string,
      },

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function remove(

      id: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeTree(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeTree(

      id: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export const onRemoved: events.Event<(id: string, removeInfo: { parentId: string; index: number; node?: BookmarkTreeNode }) => void>;
/**
 * @supported Chrome
 */
export const onChanged: events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;
/**
 * @supported Chrome
 */
export const onMoved: events.Event<(id: string, moveInfo: { parentId: string; index: number; oldParentId: string; oldIndex: number }) => void>;
/**
 * @supported Chrome
 */
export const onChildrenReordered: events.Event<(id: string, reorderInfo: { childIds: string[] }) => void>;

}

export namespace browsingData {
/**
 * @supported Chrome
 */
export function settings(): Promise<{

      options: RemovalOptions,

      /**
       * All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`.
       */
      dataToRemove: DataTypeSet,

      /**
       * All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not.
       */
      dataRemovalPermitted: DataTypeSet,
    }>;
/**
 * @supported Chrome
 */
export function settings(

      callback?: (
        result: {

          options: RemovalOptions,

          /**
           * All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`.
           */
          dataToRemove: DataTypeSet,

          /**
           * All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not.
           */
          dataRemovalPermitted: DataTypeSet,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      options: RemovalOptions,

      dataToRemove: DataTypeSet,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function remove(

      options: RemovalOptions,

      dataToRemove: DataTypeSet,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeAppcache(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeAppcache(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCache(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCache(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCacheStorage(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCacheStorage(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCookies(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCookies(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeDownloads(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeDownloads(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeFileSystems(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeFileSystems(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeFormData(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeFormData(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeHistory(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeHistory(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeIndexedDB(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeIndexedDB(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeLocalStorage(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeLocalStorage(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removePluginData(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removePluginData(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removePasswords(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removePasswords(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeServiceWorkers(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeServiceWorkers(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeWebSQL(

      options: RemovalOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeWebSQL(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

}

export namespace certificateProvider {
/**
 * @supported Chrome
 */
export function requestPin(

      details: RequestPinDetails,
    ): Promise<PinResponseDetails | undefined>;
/**
 * @supported Chrome
 */
export function requestPin(

      details: RequestPinDetails,

      callback?: (
        details?: PinResponseDetails,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function stopPinRequest(

      details: StopPinRequestDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function stopPinRequest(

      details: StopPinRequestDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setCertificates(

      details: SetCertificatesDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setCertificates(

      details: SetCertificatesDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function reportSignature(

      details: ReportSignatureDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function reportSignature(

      details: ReportSignatureDetails,

      callback?: () => void,
    ): void;

}

export namespace chrome_url_overrides {
/**
 * @supported Chrome
 */
export interface UrlOverrideInfo {
    activationmessage?: string;
    keyboard?: string;
}

}

export namespace commands {
/**
 * @supported Chrome
 */
export function getAll(): Promise<Command[]>;
/**
 * @supported Chrome
 */
export function getAll(

      callback?: (
        commands: Command[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onCommand: events.Event<(command: string, tab?: tabs.Tab) => void>;

}

export namespace contextMenus {
/**
 * @supported Chrome
 */
export function update(

      id: number | string,

      updateProperties: {

        type?: ItemType,

        title?: string,

        checked?: boolean,

        contexts?: [ContextType, ...ContextType[]],

        /**
         * Whether the item is visible in the menu.
         *
         * @since Chrome 62
         */
        visible?: boolean,

        /**
         * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
         */
        onclick?: (
          /**
           * @since Chrome 44
           */
          info: OnClickData,
          /**
           * @since Chrome 44
           */
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of the item to be made this item's parent. Note: You cannot set an item to become a child of its own descendant.
         */
        parentId?: number | string,

        documentUrlPatterns?: string[],

        targetUrlPatterns?: string[],

        enabled?: boolean,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function update(

      id: number | string,

      updateProperties: {

        type?: ItemType,

        title?: string,

        checked?: boolean,

        contexts?: [ContextType, ...ContextType[]],

        /**
         * Whether the item is visible in the menu.
         *
         * @since Chrome 62
         */
        visible?: boolean,

        /**
         * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
         */
        onclick?: (
          /**
           * @since Chrome 44
           */
          info: OnClickData,
          /**
           * @since Chrome 44
           */
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of the item to be made this item's parent. Note: You cannot set an item to become a child of its own descendant.
         */
        parentId?: number | string,

        documentUrlPatterns?: string[],

        targetUrlPatterns?: string[],

        enabled?: boolean,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      menuItemId: number | string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function remove(

      menuItemId: number | string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeAll(): Promise<void>;
/**
 * @supported Chrome
 */
export function removeAll(

      callback?: () => void,
    ): void;

}

export namespace cookies {
/**
 * @supported Chrome
 */
export function get(

      details: CookieDetails,
    ): Promise<Cookie | undefined>;
/**
 * @supported Chrome
 */
export function get(

      details: CookieDetails,

      /**
       * @param cookie Contains details about the cookie. This parameter is null if no such cookie was found.
       */
      callback?: (
        cookie?: Cookie,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAll(

      details: {

        /**
         * Restricts the retrieved cookies to those that would match the given URL.
         */
        url?: string,

        /**
         * Filters the cookies by name.
         */
        name?: string,

        /**
         * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
         */
        domain?: string,

        /**
         * Restricts the retrieved cookies to those whose path exactly matches this string.
         */
        path?: string,

        /**
         * Filters the cookies by their Secure property.
         */
        secure?: boolean,

        /**
         * Filters out session vs. persistent cookies.
         */
        session?: boolean,

        /**
         * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },
    ): Promise<Cookie[]>;
/**
 * @supported Chrome
 */
export function getAll(

      details: {

        /**
         * Restricts the retrieved cookies to those that would match the given URL.
         */
        url?: string,

        /**
         * Filters the cookies by name.
         */
        name?: string,

        /**
         * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
         */
        domain?: string,

        /**
         * Restricts the retrieved cookies to those whose path exactly matches this string.
         */
        path?: string,

        /**
         * Filters the cookies by their Secure property.
         */
        secure?: boolean,

        /**
         * Filters out session vs. persistent cookies.
         */
        session?: boolean,

        /**
         * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },

      /**
       * @param cookies All the existing, unexpired cookies that match the given cookie info.
       */
      callback?: (
        cookies: Cookie[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function set(

      details: {

        /**
         * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie. Empty by default if omitted.
         */
        name?: string,

        /**
         * The value of the cookie. Empty by default if omitted.
         */
        value?: string,

        /**
         * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
         */
        domain?: string,

        /**
         * The path of the cookie. Defaults to the path portion of the url parameter.
         */
        path?: string,

        /**
         * Whether the cookie should be marked as Secure. Defaults to false.
         */
        secure?: boolean,

        /**
         * Whether the cookie should be marked as HttpOnly. Defaults to false.
         */
        httpOnly?: boolean,

        /**
         * The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
         *
         * @since Chrome 51
         */
        sameSite?: SameSiteStatus,

        /**
         * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
         */
        expirationDate?: number,

        /**
         * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },
    ): Promise<Cookie | undefined>;
/**
 * @supported Chrome
 */
export function set(

      details: {

        /**
         * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie. Empty by default if omitted.
         */
        name?: string,

        /**
         * The value of the cookie. Empty by default if omitted.
         */
        value?: string,

        /**
         * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
         */
        domain?: string,

        /**
         * The path of the cookie. Defaults to the path portion of the url parameter.
         */
        path?: string,

        /**
         * Whether the cookie should be marked as Secure. Defaults to false.
         */
        secure?: boolean,

        /**
         * Whether the cookie should be marked as HttpOnly. Defaults to false.
         */
        httpOnly?: boolean,

        /**
         * The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
         *
         * @since Chrome 51
         */
        sameSite?: SameSiteStatus,

        /**
         * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
         */
        expirationDate?: number,

        /**
         * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },

      /**
       * @param cookie Contains details about the cookie that's been set. If setting failed for any reason, the promise will be rejected.
       */
      callback?: (
        cookie?: Cookie,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      details: CookieDetails,
    ): Promise<{

      /**
       * The URL associated with the cookie that's been removed.
       */
      url: string,

      /**
       * The name of the cookie that's been removed.
       */
      name: string,

      /**
       * The ID of the cookie store from which the cookie was removed.
       */
      storeId: string,

      /**
       * The partition key for reading or modifying cookies with the Partitioned attribute.
       *
       * @since Chrome 119
       */
      partitionKey?: CookiePartitionKey,
    } | undefined>;
/**
 * @supported Chrome
 */
export function remove(

      details: CookieDetails,

      /**
       * @param details Contains details about the cookie that's been removed. If removal failed for any reason, the promise will be rejected.
       */
      callback?: (
        details?: {

          /**
           * The URL associated with the cookie that's been removed.
           */
          url: string,

          /**
           * The name of the cookie that's been removed.
           */
          name: string,

          /**
           * The ID of the cookie store from which the cookie was removed.
           */
          storeId: string,

          /**
           * The partition key for reading or modifying cookies with the Partitioned attribute.
           *
           * @since Chrome 119
           */
          partitionKey?: CookiePartitionKey,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAllCookieStores(): Promise<CookieStore[]>;
/**
 * @supported Chrome
 */
export function getAllCookieStores(

      /**
       * @param cookieStores All the existing cookie stores.
       */
      callback?: (
        cookieStores: CookieStore[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPartitionKey(

      details: FrameDetails,
    ): Promise<{

      /**
       * The partition key for reading or modifying cookies with the Partitioned attribute.
       */
      partitionKey: CookiePartitionKey,
    }>;
/**
 * @supported Chrome
 */
export function getPartitionKey(

      details: FrameDetails,

      /**
       * @param details Contains details about the partition key that's been retrieved.
       */
      callback?: (
        details: {

          /**
           * The partition key for reading or modifying cookies with the Partitioned attribute.
           */
          partitionKey: CookiePartitionKey,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onChanged: events.Event<(changeInfo: { removed: boolean; cookie: Cookie; cause: OnChangedCause }) => void>;

}

export namespace _debugger {
/**
 * @supported Chrome
 */
export function attach(

      target: Debuggee,

      requiredVersion: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function attach(

      target: Debuggee,

      requiredVersion: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function detach(

      target: Debuggee,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function detach(

      target: Debuggee,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function sendCommand(

      target: DebuggerSession,

      method: string,

      commandParams?: {[name: string]: /* TODO: Upstream type uses any */ any},
    ): Promise<{[name: string]: /* TODO: Upstream type uses any */ any} | undefined>;
/**
 * @supported Chrome
 */
export function sendCommand(

      target: DebuggerSession,

      method: string,

      commandParams?: {[name: string]: /* TODO: Upstream type uses any */ any},

      /**
       * @param result JSON object with the response. Structure of the response varies depending on the method name and is defined by the 'returns' attribute of the command description in the remote debugging protocol.
       */
      callback?: (
        result?: {[name: string]: /* TODO: Upstream type uses any */ any},
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getTargets(): Promise<TargetInfo[]>;
/**
 * @supported Chrome
 */
export function getTargets(

      /**
       * @param result Array of TargetInfo objects corresponding to the available debug targets.
       */
      callback?: (
        result: TargetInfo[],
      ) => void,
    ): void;

}

export namespace declarativeNetRequest {
/**
 * @supported Chrome
 */
export function updateDynamicRules(

      /**
       * @since Chrome 87
       */
      options: UpdateRuleOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateDynamicRules(

      /**
       * @since Chrome 87
       */
      options: UpdateRuleOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDynamicRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;
/**
 * @supported Chrome
 */
export function getDynamicRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,

      callback?: (
        rules: Rule[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateSessionRules(

      options: UpdateRuleOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateSessionRules(

      options: UpdateRuleOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getSessionRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;
/**
 * @supported Chrome
 */
export function getSessionRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,

      callback?: (
        rules: Rule[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateEnabledRulesets(

      /**
       * @since Chrome 87
       */
      options: UpdateRulesetOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateEnabledRulesets(

      /**
       * @since Chrome 87
       */
      options: UpdateRulesetOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getEnabledRulesets(): Promise<string[]>;
/**
 * @supported Chrome
 */
export function getEnabledRulesets(

      callback?: (
        rulesetIds: string[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateStaticRules(

      options: UpdateStaticRulesOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateStaticRules(

      options: UpdateStaticRulesOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDisabledRuleIds(

      options: GetDisabledRuleIdsOptions,
    ): Promise<number[]>;
/**
 * @supported Chrome
 */
export function getDisabledRuleIds(

      options: GetDisabledRuleIdsOptions,

      callback?: (
        disabledRuleIds: number[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMatchedRules(

      filter?: MatchedRulesFilter,
    ): Promise<RulesMatchedDetails>;
/**
 * @supported Chrome
 */
export function getMatchedRules(

      filter?: MatchedRulesFilter,

      callback?: (
        details: RulesMatchedDetails,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setExtensionActionOptions(

      options: ExtensionActionOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setExtensionActionOptions(

      options: ExtensionActionOptions,

      /**
       * @since Chrome 89
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function isRegexSupported(

      regexOptions: RegexOptions,
    ): Promise<IsRegexSupportedResult>;
/**
 * @supported Chrome
 */
export function isRegexSupported(

      regexOptions: RegexOptions,

      callback?: (
        result: IsRegexSupportedResult,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAvailableStaticRuleCount(): Promise<number>;
/**
 * @supported Chrome
 */
export function getAvailableStaticRuleCount(

      callback?: (
        count: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function testMatchOutcome(

      request: TestMatchRequestDetails,
    ): Promise<TestMatchOutcomeResult>;
/**
 * @supported Chrome
 */
export function testMatchOutcome(

      request: TestMatchRequestDetails,

      callback?: (
        result: TestMatchOutcomeResult,
      ) => void,
    ): void;

}

export namespace desktopCapture {
/**
 * @supported Chrome
 */
export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], targetTab: tabs.Tab, options: ChooseDesktopMediaOptions, callback: (streamId: string, options: { canRequestAudioTrack: boolean }) => void): number;
/**
 * @supported Chrome
 */
export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], targetTab: tabs.Tab, callback: (streamId: string, options: { canRequestAudioTrack: boolean }) => void): number;
/**
 * @supported Chrome
 */
export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], options: ChooseDesktopMediaOptions, callback: (streamId: string, options: { canRequestAudioTrack: boolean }) => void): number;
/**
 * @supported Chrome
 */
export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], callback: (streamId: string, options: { canRequestAudioTrack: boolean }) => void): number;
/**
 * @supported Chrome
 */
export interface ChooseDesktopMediaOptions {
    systemAudio?: SystemAudioPreferenceEnum;
    windowAudio?: WindowAudioPreferenceEnum;
    selfBrowserSurface?: SelfCapturePreferenceEnum;
    suppressLocalAudioPlaybackIntended?: boolean;
}

}

export namespace devtools.inspectedWindow {
/**
 * @supported Chrome
 */
export function _eval(

      expression: string,

      options?: {

        /**
         * If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page.
         */
        frameURL?: string,

        /**
         * Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the `isError` field set to true and the `code` field set to `E_NOTFOUND`.
         */
        useContentScriptContext?: boolean,

        /**
         * Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, scriptExecutionContext overrides the 'true' setting on useContentScriptContext.
         *
         * @since Chrome 107
         */
        scriptExecutionContext?: string,
      },
    ): Promise<{

      /**
       * The result of evaluation.
       */
      result: {[name: string]: /* TODO: Upstream type uses any */ any},

      /**
       * An object providing details if an exception occurred while evaluating the expression.
       */
      exceptionInfo: {

        /**
         * Set if the error occurred on the DevTools side before the expression is evaluated.
         */
        isError: boolean,

        /**
         * Set if the error occurred on the DevTools side before the expression is evaluated.
         */
        code: string,

        /**
         * Set if the error occurred on the DevTools side before the expression is evaluated.
         */
        description: string,

        /**
         * Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error.
         */
        details: /* TODO: Upstream type uses any */ any[],

        /**
         * Set if the evaluated code produces an unhandled exception.
         */
        isException: boolean,

        /**
         * Set if the evaluated code produces an unhandled exception.
         */
        value: string,
      },
    }>;
/**
 * @supported Chrome
 */
export function _eval(

      expression: string,

      options?: {

        /**
         * If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page.
         */
        frameURL?: string,

        /**
         * Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the `isError` field set to true and the `code` field set to `E_NOTFOUND`.
         */
        useContentScriptContext?: boolean,

        /**
         * Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, scriptExecutionContext overrides the 'true' setting on useContentScriptContext.
         *
         * @since Chrome 107
         */
        scriptExecutionContext?: string,
      },

      /**
       * @param response The result of evaluation and exception information.
       */
      callback?: (
        /**
         * @since Chrome 151
         */
        response: {

          /**
           * The result of evaluation.
           */
          result: {[name: string]: /* TODO: Upstream type uses any */ any},

          /**
           * An object providing details if an exception occurred while evaluating the expression.
           */
          exceptionInfo: {

            /**
             * Set if the error occurred on the DevTools side before the expression is evaluated.
             */
            isError: boolean,

            /**
             * Set if the error occurred on the DevTools side before the expression is evaluated.
             */
            code: string,

            /**
             * Set if the error occurred on the DevTools side before the expression is evaluated.
             */
            description: string,

            /**
             * Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error.
             */
            details: /* TODO: Upstream type uses any */ any[],

            /**
             * Set if the evaluated code produces an unhandled exception.
             */
            isException: boolean,

            /**
             * Set if the evaluated code produces an unhandled exception.
             */
            value: string,
          },
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getResources(): Promise<Resource[]>;
/**
 * @supported Chrome
 */
export function getResources(

      /**
       * @param resources The resources within the page.
       */
      callback?: (
        resources: Resource[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export interface Resource {
    url: string;
    getContent(): Promise<{ content: string; encoding: string }>;
    getContent(callback: (content: string, encoding: string) => void): void;
    setContent(content: string, commit: boolean): Promise<{ [name: string]: unknown } | undefined>;
    setContent(content: string, commit: boolean, callback: (result?: { [name: string]: unknown }) => void): void;
}
/**
 * @supported Chrome
 */
export function eval<T = unknown>(expression: string, options?: EvalOptions): Promise<T>;
/**
 * @supported Chrome
 */
export function eval<T = unknown>(expression: string, callback: (result: T | undefined, exceptionInfo: EvaluationExceptionInfo) => void): void;
/**
 * @supported Chrome
 */
export function eval<T = unknown>(expression: string, options: EvalOptions | undefined, callback: (result: T | undefined, exceptionInfo: EvaluationExceptionInfo) => void): void;
/**
 * @supported Chrome
 */
export interface EvalOptions {
    frameURL?: string;
    useContentScriptContext?: boolean;
    scriptExecutionContext?: string;
}
/**
 * @supported Chrome
 */
export interface EvaluationExceptionInfo {
    isError: boolean;
    isException: boolean;
    value?: unknown;
    description?: string;
    details?: unknown[];
}
/**
 * @supported Chrome
 */
export const onResourceAdded: events.Event<(resource: Resource) => void>;
/**
 * @supported Chrome
 */
export const onResourceContentCommitted: events.Event<(resource: Resource, content: string) => void>;

}

export namespace devtools.network {
/**
 * @supported Chrome
 */
export function getHAR(): Promise<Record<string, unknown>>;

}

export namespace devtools.panels {
/**
 * @supported Chrome
 */
export function create(

      title: string,

      iconPath: string,

      pagePath: string,
    ): Promise<ExtensionPanel>;
/**
 * @supported Chrome
 */
export function create(

      title: string,

      iconPath: string,

      pagePath: string,

      /**
       * @param panel An ExtensionPanel object representing the created panel.
       */
      callback?: (
        panel: ExtensionPanel,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function openResource(

      url: string,

      lineNumber: number,

      /**
       * @since Chrome 114
       */
      columnNumber?: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function openResource(

      url: string,

      lineNumber: number,

      /**
       * @since Chrome 114
       */
      columnNumber?: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setThemeChangeHandler(

      /**
       * @param theme Current theme in DevTools.
       */
      callback?: (
        theme: Theme,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export interface SourcesPanel {
    createSidebarPane(title: string, callback?: (result: ExtensionSidebarPane) => void): Promise<ExtensionSidebarPane>;
    onSelectionChanged: events.Event<() => void>;
}
/**
 * @supported Chrome
 */
export interface ExtensionPanel {
    onShown: events.Event<(window: Window) => void>;
    onHidden: events.Event<() => void>;
    onSearch: events.Event<(action: string, queryString?: string) => void>;
    createStatusBarButton(iconPath: string, tooltipText: string, disabled: boolean): Button;
    show(): void;
}
/**
 * @supported Chrome
 */
export interface ExtensionSidebarPane {
    onShown: events.Event<(window: Window) => void>;
    onHidden: events.Event<() => void>;
    setHeight(height: string): void;
    setExpression(expression: string, rootTitle?: string): Promise<void>;
    setExpression(expression: string, rootTitle?: string, callback?: () => void): void;
    setObject(jsonObject: _WebExtJsonObject | string, rootTitle?: string): Promise<void>;
    setObject(jsonObject: string, rootTitle?: string, callback?: () => void): void;
    setPage(path: string): Promise<void>;
    setPage(path: string, callback?: () => void): void;
}
/**
 * @supported Chrome
 */
export interface Button {
    onClicked: events.Event<() => void>;
    update(iconPath?: string, tooltipText?: string, disabled?: boolean): void;
}
/**
 * @supported Chrome
 */
export function setOpenResourceHandler(callback?: ((resource: devtools.inspectedWindow.Resource) => void) | null): void;

}

export namespace devtools.recorder {
/**
 * @supported Chrome
 */
export function createView(

      title: string,

      pagePath: string,
    ): RecorderView;

}

export namespace documentScan {
/**
 * @supported Chrome
 */
export function scan(

      options: ScanOptions,
    ): Promise<ScanResults>;
/**
 * @supported Chrome
 */
export function scan(

      options: ScanOptions,

      callback?: (
        result: ScanResults,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getScannerList(

      filter: DeviceFilter,
    ): Promise<GetScannerListResponse>;
/**
 * @supported Chrome
 */
export function getScannerList(

      filter: DeviceFilter,

      callback?: (
        response: GetScannerListResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function openScanner(

      scannerId: string,
    ): Promise<OpenScannerResponse>;
/**
 * @supported Chrome
 */
export function openScanner(

      scannerId: string,

      callback?: (
        response: OpenScannerResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getOptionGroups(

      scannerHandle: string,
    ): Promise<GetOptionGroupsResponse>;
/**
 * @supported Chrome
 */
export function getOptionGroups(

      scannerHandle: string,

      callback?: (
        response: GetOptionGroupsResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function closeScanner(

      scannerHandle: string,
    ): Promise<CloseScannerResponse>;
/**
 * @supported Chrome
 */
export function closeScanner(

      scannerHandle: string,

      callback?: (
        response: CloseScannerResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setOptions(

      scannerHandle: string,

      options: OptionSetting[],
    ): Promise<SetOptionsResponse>;
/**
 * @supported Chrome
 */
export function setOptions(

      scannerHandle: string,

      options: OptionSetting[],

      callback?: (
        response: SetOptionsResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function startScan(

      scannerHandle: string,

      options: StartScanOptions,
    ): Promise<StartScanResponse>;
/**
 * @supported Chrome
 */
export function startScan(

      scannerHandle: string,

      options: StartScanOptions,

      callback?: (
        response: StartScanResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function cancelScan(

      job: string,
    ): Promise<CancelScanResponse>;
/**
 * @supported Chrome
 */
export function cancelScan(

      job: string,

      callback?: (
        response: CancelScanResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function readScanData(

      job: string,
    ): Promise<ReadScanDataResponse>;
/**
 * @supported Chrome
 */
export function readScanData(

      job: string,

      callback?: (
        response: ReadScanDataResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export interface ScannerOption {
    isInternal: boolean;
}

}

export namespace dom {
/**
 * @supported Chrome
 */
export function openOrClosedShadowRoot(element: Element | HTMLElement): ShadowRoot | null;

}

export namespace downloads {
/**
 * @supported Chrome
 */
export function download(

      options: DownloadOptions,
    ): Promise<number>;
/**
 * @supported Chrome
 */
export function download(

      options: DownloadOptions,

      callback?: (
        downloadId: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function search(

      query: DownloadQuery,
    ): Promise<DownloadItem[]>;
/**
 * @supported Chrome
 */
export function search(

      query: DownloadQuery,

      callback?: (
        results: DownloadItem[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function pause(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function pause(

      downloadId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function resume(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function resume(

      downloadId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function cancel(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function cancel(

      downloadId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getFileIcon(

      downloadId: number,

      options?: GetFileIconOptions,
    ): Promise<string | undefined>;
/**
 * @supported Chrome
 */
export function getFileIcon(

      downloadId: number,

      options?: GetFileIconOptions,

      callback?: (
        iconURL?: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function open(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function open(

      downloadId: number,

      /**
       * @since Chrome 123
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function erase(

      query: DownloadQuery,
    ): Promise<number[]>;
/**
 * @supported Chrome
 */
export function erase(

      query: DownloadQuery,

      callback?: (
        erasedIds: number[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeFile(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeFile(

      downloadId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function acceptDanger(

      downloadId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function acceptDanger(

      downloadId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setUiOptions(

      options: UiOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setUiOptions(

      options: UiOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function show(downloadId: number): void;
/**
 * @supported Chrome
 */
export const onChanged: events.Event<(downloadDelta: DownloadDelta) => void>;

}

export namespace enterprise.deviceAttributes {
/**
 * @supported Chrome
 */
export function getDirectoryDeviceId(): Promise<string>;
/**
 * @supported Chrome
 */
export function getDirectoryDeviceId(

      callback?: (
        deviceId: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDeviceSerialNumber(): Promise<string>;
/**
 * @supported Chrome
 */
export function getDeviceSerialNumber(

      callback?: (
        serialNumber: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDeviceAssetId(): Promise<string>;
/**
 * @supported Chrome
 */
export function getDeviceAssetId(

      callback?: (
        assetId: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDeviceAnnotatedLocation(): Promise<string>;
/**
 * @supported Chrome
 */
export function getDeviceAnnotatedLocation(

      callback?: (
        annotatedLocation: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDeviceHostname(): Promise<string>;
/**
 * @supported Chrome
 */
export function getDeviceHostname(

      callback?: (
        hostname: string,
      ) => void,
    ): void;

}

export namespace enterprise.hardwarePlatform {
/**
 * @supported Chrome
 */
export function getHardwarePlatformInfo(): Promise<HardwarePlatformInfo>;
/**
 * @supported Chrome
 */
export function getHardwarePlatformInfo(

      callback?: (
        info: HardwarePlatformInfo,
      ) => void,
    ): void;

}

export namespace enterprise.networkingAttributes {
/**
 * @supported Chrome
 */
export function getNetworkDetails(): Promise<NetworkDetails>;
/**
 * @supported Chrome
 */
export function getNetworkDetails(

      callback?: (
        networkAddresses: NetworkDetails,
      ) => void,
    ): void;

}

export namespace enterprise.platformKeys {
/**
 * @supported Chrome
 */
export function getTokens(): Promise<Token[]>;
/**
 * @supported Chrome
 */
export function getTokens(

      /**
       * @param tokens The list of available tokens.
       */
      callback?: (
        tokens: Token[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getCertificates(

      tokenId: string,
    ): Promise<ArrayBuffer[]>;
/**
 * @supported Chrome
 */
export function getCertificates(

      tokenId: string,

      /**
       * @param certificates The list of certificates, each in DER encoding of a X.509 certificate.
       */
      callback?: (
        certificates: ArrayBuffer[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function importCertificate(

      tokenId: string,

      certificate: ArrayBuffer,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function importCertificate(

      tokenId: string,

      certificate: ArrayBuffer,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCertificate(

      tokenId: string,

      certificate: ArrayBuffer,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCertificate(

      tokenId: string,

      certificate: ArrayBuffer,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function challengeKey(

      options: ChallengeKeyOptions,
    ): Promise<ArrayBuffer>;
/**
 * @supported Chrome
 */
export function challengeKey(

      options: ChallengeKeyOptions,

      /**
       * @param response The challenge response.
       */
      callback?: (
        response: ArrayBuffer,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function challengeMachineKey(

      challenge: ArrayBuffer,

      /**
       * @since Chrome 59
       */
      registerKey?: boolean,
    ): Promise<ArrayBuffer>;
/**
 * @supported Chrome
 */
export function challengeMachineKey(

      challenge: ArrayBuffer,

      /**
       * @since Chrome 59
       */
      registerKey?: boolean,

      /**
       * @param response The challenge response.
       */
      callback?: (
        response: ArrayBuffer,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function challengeUserKey(

      challenge: ArrayBuffer,

      registerKey: boolean,
    ): Promise<ArrayBuffer>;
/**
 * @supported Chrome
 */
export function challengeUserKey(

      challenge: ArrayBuffer,

      registerKey: boolean,

      /**
       * @param response The challenge response.
       */
      callback?: (
        response: ArrayBuffer,
      ) => void,
    ): void;

}

export namespace events {
/**
 * @supported Chrome
 */
export interface Rule<C = unknown, A = unknown> {
    id?: string;
    tags?: string[];
    conditions: C[];
    actions: A[];
    priority?: number;
}
/**
 * @supported Chrome
 */
export interface Event<H extends (...args: /* TODO: Upstream type uses any */ any[]) => /* TODO: Upstream type uses any */ any, C = void, A = void> {
    addListener(callback: H): void;
    removeListener(callback: H): void;
    hasListener(callback: H): boolean;
    hasListeners(): boolean;
    addRules(rules: Rule<C, A>[], callback?: (rules: Rule<C, A>[]) => void): void;
    getRules(ruleIdentifiers: string[], callback: (rules: Rule<C, A>[]) => void): void;
    getRules(callback: (rules: Rule<C, A>[]) => void): void;
    removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
    removeRules(callback?: () => void): void;
}

}

export namespace extension {
/**
 * @supported Chrome
 */
export function getViews(

      fetchProperties?: {

        /**
         * The type of view to get. If omitted, returns all views (including background pages and tabs).
         */
        type?: ViewType,

        /**
         * The window to restrict the search to. If omitted, returns all views.
         */
        windowId?: number,

        /**
         * Find a view according to a tab id. If this field is omitted, returns all views.
         *
         * @since Chrome 54
         */
        tabId?: number,
      },
    ): Window[];
/**
 * @supported Chrome
 */
export function isAllowedIncognitoAccess(): Promise<boolean>;
/**
 * @supported Chrome
 */
export function isAllowedIncognitoAccess(

      /**
       * @param isAllowedAccess True if the extension has access to Incognito mode, false otherwise.
       */
      callback?: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function isAllowedFileSchemeAccess(): Promise<boolean>;
/**
 * @supported Chrome
 */
export function isAllowedFileSchemeAccess(

      /**
       * @param isAllowedAccess True if the extension can access the 'file://' scheme, false otherwise.
       */
      callback?: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;

}

export namespace fileSystemProvider {
/**
 * @supported Chrome
 */
export function mount(

      options: MountOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function mount(

      options: MountOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function unmount(

      options: UnmountOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function unmount(

      options: UnmountOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAll(): Promise<FileSystemInfo[]>;
/**
 * @supported Chrome
 */
export function getAll(

      callback?: (
        fileSystems: FileSystemInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function get(

      fileSystemId: string,
    ): Promise<FileSystemInfo>;
/**
 * @supported Chrome
 */
export function get(

      fileSystemId: string,

      callback?: (
        fileSystem: FileSystemInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function notify(

      options: NotifyOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function notify(

      options: NotifyOptions,

      callback?: () => void,
    ): void;

}

export namespace fontSettings {
/**
 * @supported Chrome
 */
export function clearFont(

      details: {

        /**
         * The script for which the font should be cleared. If omitted, the global script font setting is cleared.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be cleared.
         */
        genericFamily: GenericFamily,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function clearFont(

      details: {

        /**
         * The script for which the font should be cleared. If omitted, the global script font setting is cleared.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be cleared.
         */
        genericFamily: GenericFamily,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getFont(

      details: {

        /**
         * The script for which the font should be retrieved. If omitted, the font setting for the global script (script code "Zyyy") is retrieved.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be retrieved.
         */
        genericFamily: GenericFamily,
      },
    ): Promise<{

      /**
       * The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, `fontId` can differ from the font passed to `setFont`, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting.
       */
      fontId: string,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;
/**
 * @supported Chrome
 */
export function getFont(

      details: {

        /**
         * The script for which the font should be retrieved. If omitted, the font setting for the global script (script code "Zyyy") is retrieved.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be retrieved.
         */
        genericFamily: GenericFamily,
      },

      callback?: (
        details: {

          /**
           * The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, `fontId` can differ from the font passed to `setFont`, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting.
           */
          fontId: string,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setFont(

      details: {

        /**
         * The script code which the font should be set. If omitted, the font setting for the global script (script code "Zyyy") is set.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be set.
         */
        genericFamily: GenericFamily,

        /**
         * The font ID. The empty string means to fallback to the global script font setting.
         */
        fontId: string,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setFont(

      details: {

        /**
         * The script code which the font should be set. If omitted, the font setting for the global script (script code "Zyyy") is set.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be set.
         */
        genericFamily: GenericFamily,

        /**
         * The font ID. The empty string means to fallback to the global script font setting.
         */
        fontId: string,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getFontList(): Promise<FontName[]>;
/**
 * @supported Chrome
 */
export function getFontList(

      callback?: (
        results: FontName[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearDefaultFontSize(

      details?: {},
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function clearDefaultFontSize(

      details?: {},

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDefaultFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;
/**
 * @supported Chrome
 */
export function getDefaultFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setDefaultFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setDefaultFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearDefaultFixedFontSize(

      details?: {},
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function clearDefaultFixedFontSize(

      details?: {},

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDefaultFixedFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;
/**
 * @supported Chrome
 */
export function getDefaultFixedFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setDefaultFixedFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setDefaultFixedFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearMinimumFontSize(

      details?: {},
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function clearMinimumFontSize(

      details?: {},

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMinimumFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;
/**
 * @supported Chrome
 */
export function getMinimumFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setMinimumFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setMinimumFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;

}

export namespace gcm {
/**
 * @supported Chrome
 */
export function register(

      senderIds: string[],
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function register(

      senderIds: string[],

      /**
       * @param registrationId A registration ID assigned to the application by the FCM.
       */
      callback?: (
        registrationId: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function unregister(): Promise<void>;
/**
 * @supported Chrome
 */
export function unregister(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function send(

      message: {

        /**
         * The ID of the server to send the message to as assigned by [Google API Console](https://console.cloud.google.com/apis/dashboard).
         */
        destinationId: string,

        /**
         * The ID of the message. It must be unique for each message in scope of the applications. See the [Cloud Messaging documentation](https://firebase.google.com/docs/cloud-messaging/js/client) for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days).
         */
        timeToLive?: number,

        /**
         * Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed {@link gcm.MAX_MESSAGE_SIZE}.
         */
        data: {[name: string]: string},
      },
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function send(

      message: {

        /**
         * The ID of the server to send the message to as assigned by [Google API Console](https://console.cloud.google.com/apis/dashboard).
         */
        destinationId: string,

        /**
         * The ID of the message. It must be unique for each message in scope of the applications. See the [Cloud Messaging documentation](https://firebase.google.com/docs/cloud-messaging/js/client) for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days).
         */
        timeToLive?: number,

        /**
         * Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed {@link gcm.MAX_MESSAGE_SIZE}.
         */
        data: {[name: string]: string},
      },

      /**
       * @param messageId The ID of the message that the callback was issued for.
       */
      callback?: (
        messageId: string,
      ) => void,
    ): void;

}

export namespace history {
/**
 * @supported Chrome
 */
export function search(

      query: {

        /**
         * A free-text query to the history service. Leave this empty to retrieve all pages.
         */
        text: string,

        /**
         * Limit results to those visited after this date, represented in milliseconds since the epoch. If property is not specified, it will default to 24 hours.
         */
        startTime?: number,

        /**
         * Limit results to those visited before this date, represented in milliseconds since the epoch.
         */
        endTime?: number,

        /**
         * The maximum number of results to retrieve. Defaults to 100.
         */
        maxResults?: number,
      },
    ): Promise<HistoryItem[]>;
/**
 * @supported Chrome
 */
export function search(

      query: {

        /**
         * A free-text query to the history service. Leave this empty to retrieve all pages.
         */
        text: string,

        /**
         * Limit results to those visited after this date, represented in milliseconds since the epoch. If property is not specified, it will default to 24 hours.
         */
        startTime?: number,

        /**
         * Limit results to those visited before this date, represented in milliseconds since the epoch.
         */
        endTime?: number,

        /**
         * The maximum number of results to retrieve. Defaults to 100.
         */
        maxResults?: number,
      },

      callback?: (
        results: HistoryItem[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getVisits(

      details: UrlDetails,
    ): Promise<VisitItem[]>;
/**
 * @supported Chrome
 */
export function getVisits(

      details: UrlDetails,

      callback?: (
        results: VisitItem[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function addUrl(

      details: UrlDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function addUrl(

      details: UrlDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteUrl(

      details: UrlDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteUrl(

      details: UrlDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteRange(

      range: {

        /**
         * Items added to history after this date, represented in milliseconds since the epoch.
         */
        startTime: number,

        /**
         * Items added to history before this date, represented in milliseconds since the epoch.
         */
        endTime: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteRange(

      range: {

        /**
         * Items added to history after this date, represented in milliseconds since the epoch.
         */
        startTime: number,

        /**
         * Items added to history before this date, represented in milliseconds since the epoch.
         */
        endTime: number,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteAll(): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteAll(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export const onVisitRemoved: events.Event<(removed: { allHistory: boolean; urls?: string[] }) => void>;

}

export namespace i18n {
/**
 * @supported Chrome
 */
export function getAcceptLanguages(): Promise<LanguageCode[]>;
/**
 * @supported Chrome
 */
export function getAcceptLanguages(

      /**
       * @param languages Array of LanguageCode
       */
      callback?: (
        languages: LanguageCode[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMessage(messageName: string, substitutions?: string | number | (string | number)[]): string;
/**
 * @supported Chrome
 */
export function detectLanguage(

      text: string,
    ): Promise<{

      /**
       * CLD detected language reliability
       */
      isReliable: boolean,

      /**
       * array of detectedLanguage
       */
      languages: {

        language: LanguageCode,

        /**
         * The percentage of the detected language
         */
        percentage: number,
      }[],
    }>;
/**
 * @supported Chrome
 */
export function detectLanguage(

      text: string,

      /**
       * @param result LanguageDetectionResult object that holds detected langugae reliability and array of DetectedLanguage
       */
      callback?: (
        result: {

          /**
           * CLD detected language reliability
           */
          isReliable: boolean,

          /**
           * array of detectedLanguage
           */
          languages: {

            language: LanguageCode,

            /**
             * The percentage of the detected language
             */
            percentage: number,
          }[],
        },
      ) => void,
    ): void;

}

export namespace identity {
/**
 * @supported Chrome
 */
export function getAuthToken(

      details?: TokenDetails,
    ): Promise<GetAuthTokenResult>;
/**
 * @supported Chrome
 */
export function getAuthToken(

      details?: TokenDetails,

      callback?: (
        /**
         * @since Chrome 105
         */
        result: GetAuthTokenResult,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getProfileUserInfo(

      /**
       * @since Chrome 84
       */
      details?: ProfileDetails,
    ): Promise<ProfileUserInfo>;
/**
 * @supported Chrome
 */
export function getProfileUserInfo(

      /**
       * @since Chrome 84
       */
      details?: ProfileDetails,

      callback?: (
        userInfo: ProfileUserInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCachedAuthToken(

      details: InvalidTokenDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCachedAuthToken(

      details: InvalidTokenDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearAllCachedAuthTokens(): Promise<void>;
/**
 * @supported Chrome
 */
export function clearAllCachedAuthTokens(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function launchWebAuthFlow(

      details: WebAuthFlowDetails,
    ): Promise<string | undefined>;
/**
 * @supported Chrome
 */
export function launchWebAuthFlow(

      details: WebAuthFlowDetails,

      callback?: (
        responseUrl?: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onSignInChanged: events.Event<(account: AccountInfo, signedIn: boolean) => void>;

}

export namespace idle {
/**
 * @supported Chrome
 */
export function queryState(

      detectionIntervalInSeconds: number,
    ): Promise<IdleState>;
/**
 * @supported Chrome
 */
export function queryState(

      detectionIntervalInSeconds: number,

      callback?: (
        newState: IdleState,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAutoLockDelay(): Promise<number>;
/**
 * @supported Chrome
 */
export function getAutoLockDelay(

      /**
       * @param delay Time, in seconds, until the screen is locked automatically while idle. This is zero if the screen never locks automatically.
       */
      callback?: (
        delay: number,
      ) => void,
    ): void;

}

export namespace input.ime {
/**
 * @supported Chrome
 */
export function setComposition(

      parameters: {

        /**
         * ID of the context where the composition text will be set
         */
        contextID: number,

        /**
         * Text to set
         */
        text: string,

        /**
         * Position in the text that the selection starts at.
         */
        selectionStart?: number,

        /**
         * Position in the text that the selection ends at.
         */
        selectionEnd?: number,

        /**
         * Position in the text of the cursor.
         */
        cursor: number,

        /**
         * List of segments and their associated types.
         */
        segments?: {

          /**
           * Index of the character to start this segment at
           */
          start: number,

          /**
           * Index of the character to end this segment after.
           */
          end: number,

          /**
           * The type of the underline to modify this segment.
           */
          style: UnderlineStyle,
        }[],
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function setComposition(

      parameters: {

        /**
         * ID of the context where the composition text will be set
         */
        contextID: number,

        /**
         * Text to set
         */
        text: string,

        /**
         * Position in the text that the selection starts at.
         */
        selectionStart?: number,

        /**
         * Position in the text that the selection ends at.
         */
        selectionEnd?: number,

        /**
         * Position in the text of the cursor.
         */
        cursor: number,

        /**
         * List of segments and their associated types.
         */
        segments?: {

          /**
           * Index of the character to start this segment at
           */
          start: number,

          /**
           * Index of the character to end this segment after.
           */
          end: number,

          /**
           * The type of the underline to modify this segment.
           */
          style: UnderlineStyle,
        }[],
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function clearComposition(

      parameters: {

        /**
         * ID of the context where the composition will be cleared
         */
        contextID: number,
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function clearComposition(

      parameters: {

        /**
         * ID of the context where the composition will be cleared
         */
        contextID: number,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function commitText(

      parameters: {

        /**
         * ID of the context where the text will be committed
         */
        contextID: number,

        /**
         * The text to commit
         */
        text: string,
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function commitText(

      parameters: {

        /**
         * ID of the context where the text will be committed
         */
        contextID: number,

        /**
         * The text to commit
         */
        text: string,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function sendKeyEvents(

      parameters: {

        /**
         * ID of the context where the key events will be sent, or zero to send key events to non-input field.
         */
        contextID: number,

        /**
         * Data on the key event.
         */
        keyData: KeyboardEvent[],
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function sendKeyEvents(

      parameters: {

        /**
         * ID of the context where the key events will be sent, or zero to send key events to non-input field.
         */
        contextID: number,

        /**
         * Data on the key event.
         */
        keyData: KeyboardEvent[],
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setCandidateWindowProperties(

      parameters: {

        /**
         * ID of the engine to set properties on.
         */
        engineID: string,

        properties: {

          /**
           * True to show the Candidate window, false to hide it.
           */
          visible?: boolean,

          /**
           * True to show the cursor, false to hide it.
           */
          cursorVisible?: boolean,

          /**
           * True if the candidate window should be rendered vertical, false to make it horizontal.
           */
          vertical?: boolean,

          /**
           * The number of candidates to display per page.
           */
          pageSize?: number,

          /**
           * Text that is shown at the bottom of the candidate window.
           */
          auxiliaryText?: string,

          /**
           * True to display the auxiliary text, false to hide it.
           */
          auxiliaryTextVisible?: boolean,

          /**
           * The total number of candidates for the candidate window.
           *
           * @since Chrome 84
           */
          totalCandidates?: number,

          /**
           * The index of the current chosen candidate out of total candidates.
           *
           * @since Chrome 84
           */
          currentCandidateIndex?: number,

          /**
           * Where to display the candidate window.
           */
          windowPosition?: WindowPosition,
        },
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function setCandidateWindowProperties(

      parameters: {

        /**
         * ID of the engine to set properties on.
         */
        engineID: string,

        properties: {

          /**
           * True to show the Candidate window, false to hide it.
           */
          visible?: boolean,

          /**
           * True to show the cursor, false to hide it.
           */
          cursorVisible?: boolean,

          /**
           * True if the candidate window should be rendered vertical, false to make it horizontal.
           */
          vertical?: boolean,

          /**
           * The number of candidates to display per page.
           */
          pageSize?: number,

          /**
           * Text that is shown at the bottom of the candidate window.
           */
          auxiliaryText?: string,

          /**
           * True to display the auxiliary text, false to hide it.
           */
          auxiliaryTextVisible?: boolean,

          /**
           * The total number of candidates for the candidate window.
           *
           * @since Chrome 84
           */
          totalCandidates?: number,

          /**
           * The index of the current chosen candidate out of total candidates.
           *
           * @since Chrome 84
           */
          currentCandidateIndex?: number,

          /**
           * Where to display the candidate window.
           */
          windowPosition?: WindowPosition,
        },
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setCandidates(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * List of candidates to show in the candidate window
         */
        candidates: {

          /**
           * The candidate
           */
          candidate: string,

          /**
           * The candidate's id
           */
          id: number,

          /**
           * The id to add these candidates under
           */
          parentId?: number,

          /**
           * Short string displayed to next to the candidate, often the shortcut key or index
           */
          label?: string,

          /**
           * Additional text describing the candidate
           */
          annotation?: string,

          /**
           * The usage or detail description of word.
           */
          usage?: {

            /**
             * The title string of details description.
             */
            title: string,

            /**
             * The body string of detail description.
             */
            body: string,
          },
        }[],
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function setCandidates(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * List of candidates to show in the candidate window
         */
        candidates: {

          /**
           * The candidate
           */
          candidate: string,

          /**
           * The candidate's id
           */
          id: number,

          /**
           * The id to add these candidates under
           */
          parentId?: number,

          /**
           * Short string displayed to next to the candidate, often the shortcut key or index
           */
          label?: string,

          /**
           * Additional text describing the candidate
           */
          annotation?: string,

          /**
           * The usage or detail description of word.
           */
          usage?: {

            /**
             * The title string of details description.
             */
            title: string,

            /**
             * The body string of detail description.
             */
            body: string,
          },
        }[],
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setCursorPosition(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * ID of the candidate to select.
         */
        candidateID: number,
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function setCursorPosition(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * ID of the candidate to select.
         */
        candidateID: number,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setAssistiveWindowProperties(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * Properties of the assistive window.
         */
        properties: AssistiveWindowProperties,
      },
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function setAssistiveWindowProperties(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * Properties of the assistive window.
         */
        properties: AssistiveWindowProperties,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setAssistiveWindowButtonHighlighted(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * The ID of the button
         */
        buttonID: AssistiveWindowButton,

        /**
         * The window type the button belongs to.
         */
        windowType: AssistiveWindowType,

        /**
         * The text for the screenreader to announce.
         */
        announceString?: string,

        /**
         * Whether the button should be highlighted.
         */
        highlighted: boolean,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setAssistiveWindowButtonHighlighted(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * The ID of the button
         */
        buttonID: AssistiveWindowButton,

        /**
         * The window type the button belongs to.
         */
        windowType: AssistiveWindowType,

        /**
         * The text for the screenreader to announce.
         */
        announceString?: string,

        /**
         * Whether the button should be highlighted.
         */
        highlighted: boolean,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteSurroundingText(

      parameters: {

        /**
         * ID of the engine receiving the event.
         */
        engineID: string,

        /**
         * ID of the context where the surrounding text will be deleted.
         */
        contextID: number,

        /**
         * The offset from the caret position where deletion will start. This value can be negative.
         */
        offset: number,

        /**
         * The number of characters to be deleted
         */
        length: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteSurroundingText(

      parameters: {

        /**
         * ID of the engine receiving the event.
         */
        engineID: string,

        /**
         * ID of the context where the surrounding text will be deleted.
         */
        contextID: number,

        /**
         * The offset from the caret position where deletion will start. This value can be negative.
         */
        offset: number,

        /**
         * The number of characters to be deleted
         */
        length: number,
      },

      callback?: () => void,
    ): void;

}

export namespace instanceID {
/**
 * @supported Chrome
 */
export function getID(): Promise<string>;
/**
 * @supported Chrome
 */
export function getID(

      /**
       * @param instanceID An Instance ID assigned to the app instance.
       */
      callback?: (
        instanceID: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getCreationTime(): Promise<number>;
/**
 * @supported Chrome
 */
export function getCreationTime(

      /**
       * @param creationTime The time when the Instance ID has been generated, represented in milliseconds since the epoch.
       */
      callback?: (
        creationTime: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getToken(

      getTokenParams: {

        /**
         * Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
         *
         * @since Chrome 46
         */
        scope: string,

        /**
         * Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
         *
         * @deprecated options are deprecated and will be ignored.
         * @since Chrome 46
         * @chrome-deprecated-since Chrome 89
         */
        options?: {[name: string]: string},
      },
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function getToken(

      getTokenParams: {

        /**
         * Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
         *
         * @since Chrome 46
         */
        scope: string,

        /**
         * Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
         *
         * @deprecated options are deprecated and will be ignored.
         * @since Chrome 46
         * @chrome-deprecated-since Chrome 89
         */
        options?: {[name: string]: string},
      },

      /**
       * @param token A token assigned by the requested service.
       */
      callback?: (
        token: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteToken(

      deleteTokenParams: {

        /**
         * The authorized entity that is used to obtain the token.
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * The scope that is used to obtain the token.
         *
         * @since Chrome 46
         */
        scope: string,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteToken(

      deleteTokenParams: {

        /**
         * The authorized entity that is used to obtain the token.
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * The scope that is used to obtain the token.
         *
         * @since Chrome 46
         */
        scope: string,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function deleteID(): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteID(

      callback?: () => void,
    ): void;

}

export namespace loginState {
/**
 * @supported Chrome
 */
export function getProfileType(): Promise<ProfileType>;
/**
 * @supported Chrome
 */
export function getProfileType(

      callback?: (
        result: ProfileType,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getSessionState(): Promise<SessionState>;
/**
 * @supported Chrome
 */
export function getSessionState(

      callback?: (
        result: SessionState,
      ) => void,
    ): void;

}

export namespace management {
/**
 * @supported Chrome
 */
export function getAll(): Promise<ExtensionInfo[]>;
/**
 * @supported Chrome
 */
export function getAll(

      callback?: (
        result: ExtensionInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function get(

      id: string,
    ): Promise<ExtensionInfo>;
/**
 * @supported Chrome
 */
export function get(

      id: string,

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getSelf(): Promise<ExtensionInfo>;
/**
 * @supported Chrome
 */
export function getSelf(

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPermissionWarningsById(

      id: string,
    ): Promise<string[]>;
/**
 * @supported Chrome
 */
export function getPermissionWarningsById(

      id: string,

      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPermissionWarningsByManifest(

      manifestStr: string,
    ): Promise<string[]>;
/**
 * @supported Chrome
 */
export function getPermissionWarningsByManifest(

      manifestStr: string,

      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setEnabled(

      id: string,

      enabled: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setEnabled(

      id: string,

      enabled: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function uninstall(

      id: string,

      options?: UninstallOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function uninstall(

      id: string,

      options?: UninstallOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function uninstallSelf(

      options?: UninstallOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function uninstallSelf(

      options?: UninstallOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function launchApp(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function launchApp(

      id: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function createAppShortcut(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function createAppShortcut(

      id: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setLaunchType(

      id: string,

      launchType: LaunchType,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setLaunchType(

      id: string,

      launchType: LaunchType,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function generateAppForLink(

      url: string,

      title: string,
    ): Promise<ExtensionInfo>;
/**
 * @supported Chrome
 */
export function generateAppForLink(

      url: string,

      title: string,

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function installReplacementWebApp(): Promise<void>;
/**
 * @supported Chrome
 */
export function installReplacementWebApp(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export const onUninstalled: events.Event<(id: string) => void>;

}

export namespace notifications {
/**
 * @supported Chrome
 */
export function create(

      notificationId: string,

      options: NotificationOptions,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function create(

      options: NotificationOptions,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function create(

      notificationId: string,

      options: NotificationOptions,

      callback?: (
        notificationId: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function create(

      options: NotificationOptions,

      callback?: (
        notificationId: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      notificationId: string,

      options: NotificationOptions,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function update(

      notificationId: string,

      options: NotificationOptions,

      callback?: (
        wasUpdated: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function clear(

      notificationId: string,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function clear(

      notificationId: string,

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAll(): Promise<Record<string, boolean | NotificationOptions>>;
/**
 * @supported Chrome
 */
export function getAll(callback: (notifications: Record<string, boolean | NotificationOptions>) => void): void;
/**
 * @supported Chrome
 */
export function getPermissionLevel(): Promise<PermissionLevel>;
/**
 * @supported Chrome
 */
export function getPermissionLevel(

      callback?: (
        level: PermissionLevel,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onPermissionLevelChanged: events.Event<(level: PermissionLevel) => void>;

}

export namespace offscreen {
/**
 * @supported Chrome
 */
export function hasDocument(): Promise<boolean>;
/**
 * @supported Chrome
 */
export function hasDocument(

      callback?: (
        result: boolean,
      ) => void,
    ): void;

}

export namespace omnibox {
/**
 * @supported Chrome
 */
export function setDefaultSuggestion(

      suggestion: DefaultSuggestResult,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setDefaultSuggestion(

      suggestion: DefaultSuggestResult,

      /**
       * @since Chrome 100
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export interface SuggestResult {
    description: string;
    content: string;
    deletable?: boolean;
}

}

export namespace pageCapture {
/**
 * @supported Chrome
 */
export function saveAsMHTML(

      details: {

        /**
         * The id of the tab to save as MHTML.
         */
        tabId: number,
      },
    ): Promise<Blob | undefined>;
/**
 * @supported Chrome
 */
export function saveAsMHTML(

      details: {

        /**
         * The id of the tab to save as MHTML.
         */
        tabId: number,
      },

      /**
       * @param mhtmlData The MHTML data as a Blob.
       */
      callback?: (
        mhtmlData?: Blob,
      ) => void,
    ): void;

}

export namespace permissions {
/**
 * @supported Chrome
 */
export function getAll(): Promise<Permissions>;
/**
 * @supported Chrome
 */
export function getAll(

      /**
       * @param permissions The extension's active permissions. Note that the `origins` property will contain granted origins from those specified in the `permissions` and `optional_permissions` keys in the manifest and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
       */
      callback?: (
        permissions: Permissions,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function contains(

      permissions: Permissions,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function contains(

      permissions: Permissions,

      /**
       * @param result True if the extension has the specified permissions. If an origin is specified as both an optional permission and a content script match pattern, this will return `false` unless both permissions are granted.
       */
      callback?: (
        result: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function request(

      permissions: Permissions,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function request(

      permissions: Permissions,

      /**
       * @param granted True if the user granted the specified permissions.
       */
      callback?: (
        granted: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      permissions: Permissions,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function remove(

      permissions: Permissions,

      /**
       * @param removed True if the permissions were removed.
       */
      callback?: (
        removed: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function addHostAccessRequest(

      request: {

        /**
         * The id of a document where host access requests can be shown. Must be the top-level document within a tab. If provided, the request is shown on the tab of the specified document and is removed when the document navigates to a new origin. Adding a new request will override any existent request for `tabId`. This or `tabId` must be specified.
         */
        documentId?: string,

        /**
         * The id of the tab where host access requests can be shown. If provided, the request is shown on the specified tab and is removed when the tab navigates to a new origin. Adding a new request will override an existent request for `documentId`. This or `documentId` must be specified.
         */
        tabId?: number,

        /**
         * The URL pattern where host access requests can be shown. If provided, host access requests will only be shown on URLs that match this pattern.
         */
        pattern?: string,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function addHostAccessRequest(

      request: {

        /**
         * The id of a document where host access requests can be shown. Must be the top-level document within a tab. If provided, the request is shown on the tab of the specified document and is removed when the document navigates to a new origin. Adding a new request will override any existent request for `tabId`. This or `tabId` must be specified.
         */
        documentId?: string,

        /**
         * The id of the tab where host access requests can be shown. If provided, the request is shown on the specified tab and is removed when the tab navigates to a new origin. Adding a new request will override an existent request for `documentId`. This or `documentId` must be specified.
         */
        tabId?: number,

        /**
         * The URL pattern where host access requests can be shown. If provided, host access requests will only be shown on URLs that match this pattern.
         */
        pattern?: string,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeHostAccessRequest(

      request: {

        /**
         * The id of a document where host access request will be removed. Must be the top-level document within a tab. This or `tabId` must be specified.
         */
        documentId?: string,

        /**
         * The id of the tab where host access request will be removed. This or `documentId` must be specified.
         */
        tabId?: number,

        /**
         * The URL pattern where host access request will be removed. If provided, this must exactly match the pattern of an existing host access request.
         */
        pattern?: string,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeHostAccessRequest(

      request: {

        /**
         * The id of a document where host access request will be removed. Must be the top-level document within a tab. This or `tabId` must be specified.
         */
        documentId?: string,

        /**
         * The id of the tab where host access request will be removed. This or `documentId` must be specified.
         */
        tabId?: number,

        /**
         * The URL pattern where host access request will be removed. If provided, this must exactly match the pattern of an existing host access request.
         */
        pattern?: string,
      },

      callback?: () => void,
    ): void;

}

export namespace platformKeys {
/**
 * @supported Chrome
 */
export function selectClientCertificates(

      details: SelectDetails,
    ): Promise<Match[]>;
/**
 * @supported Chrome
 */
export function selectClientCertificates(

      details: SelectDetails,

      /**
       * @param matches The list of certificates that match the request, that the extension has permission for and, if `interactive` is true, that were selected by the user.
       */
      callback?: (
        matches: Match[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getKeyPairBySpki(publicKeySpkiDer: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void): void;
/**
 * @supported Chrome
 */
export function verifyTLSServerCertificate(

      details: VerificationDetails,
    ): Promise<VerificationResult>;
/**
 * @supported Chrome
 */
export function verifyTLSServerCertificate(

      details: VerificationDetails,

      callback?: (
        result: VerificationResult,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function subtleCrypto(): SubtleCrypto;
/**
 * @supported Chrome
 */
export interface Match {
    certificate: ArrayBuffer;
    keyAlgorithm: KeyAlgorithm;
}
/**
 * @supported Chrome
 */
export function getKeyPair(certificate: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void): void;

}

export namespace power {
/**
 * @supported Chrome
 */
export function reportActivity(): Promise<void>;
/**
 * @supported Chrome
 */
export function reportActivity(

      callback?: () => void,
    ): void;

}

export namespace printing {
/**
 * @supported Chrome
 */
export function submitJob(

      request: SubmitJobRequest,
    ): Promise<SubmitJobResponse>;
/**
 * @supported Chrome
 */
export function submitJob(

      request: SubmitJobRequest,

      callback?: (
        response: SubmitJobResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function cancelJob(

      jobId: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function cancelJob(

      jobId: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPrinters(): Promise<Printer[]>;
/**
 * @supported Chrome
 */
export function getPrinters(

      callback?: (
        printers: Printer[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPrinterInfo(

      printerId: string,
    ): Promise<GetPrinterInfoResponse>;
/**
 * @supported Chrome
 */
export function getPrinterInfo(

      printerId: string,

      callback?: (
        response: GetPrinterInfoResponse,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getJobStatus(

      jobId: string,
    ): Promise<JobStatus>;
/**
 * @supported Chrome
 */
export function getJobStatus(

      jobId: string,

      callback?: (
        status: JobStatus,
      ) => void,
    ): void;

}

export namespace printingMetrics {
/**
 * @supported Chrome
 */
export function getPrintJobs(): Promise<PrintJobInfo[]>;
/**
 * @supported Chrome
 */
export function getPrintJobs(

      callback?: (
        jobs: PrintJobInfo[],
      ) => void,
    ): void;

}

/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export namespace processes {
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export interface Process {
    id: number;
    osProcessId: number;
    type: ProcessType;
    profile: string;
    naclDebugPort: number;
    tasks: TaskInfo[];
    cpu?: number;
    network?: number;
    privateMemory?: number;
    jsMemoryAllocated?: number;
    jsMemoryUsed?: number;
    sqliteMemory?: number;
    cssCache?: Cache;
    imageCache?: Cache;
    scriptCache?: Cache;
}
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(processIds?: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>;
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(includeMemory: boolean): Promise<Record<number, Process>>;
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(processIds: number | number[], callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(processIds: number | number[], includeMemory: boolean, callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(includeMemory: boolean, callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 * @note Chrome: dev channel only
 */
export function getProcessInfo(callback: (processes: Record<number, Process>) => void): void;

}

export namespace runtime {
/**
 * @supported Chrome
 */
export function getBackgroundPage(): Promise<Window | undefined>;
/**
 * @supported Chrome
 */
export function getBackgroundPage(

      /**
       * @param backgroundPage The JavaScript 'window' object for the background page.
       */
      callback?: (
        backgroundPage?: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Chrome
 */
export function openOptionsPage(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getVersion(): string;
/**
 * @supported Chrome
 */
export function setUninstallURL(

      url: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setUninstallURL(

      url: string,

      /**
       * @since Chrome 45
       */
      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function requestUpdateCheck(): Promise<{

      /**
       * Result of the update check.
       */
      status: RequestUpdateCheckStatus,

      /**
       * If an update is available, this contains the version of the available update.
       */
      version?: string,
    }>;
/**
 * @supported Chrome
 */
export function requestUpdateCheck(

      /**
       * @param result RequestUpdateCheckResult object that holds the status of the update check and any details of the result if there is an update available
       */
      callback?: (
        /**
         * @since Chrome 109
         */
        result: {

          /**
           * Result of the update check.
           */
          status: RequestUpdateCheckStatus,

          /**
           * If an update is available, this contains the version of the available update.
           */
          version?: string,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function restartAfterDelay(

      seconds: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function restartAfterDelay(

      seconds: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options: MessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options: MessageOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(message: M, options?: MessageOptions): Promise<R>;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(extensionId: string, message: M, options?: MessageOptions): Promise<R>;
/**
 * @supported Chrome
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M): Promise<R>;
/**
 * @supported Chrome
 */
export function getPlatformInfo(): Promise<PlatformInfo>;
/**
 * @supported Chrome
 */
export function getPlatformInfo(

      callback?: (
        platformInfo: PlatformInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPackageDirectoryEntry(): Promise<FileSystemDirectoryEntry>;
/**
 * @supported Chrome
 */
export function getPackageDirectoryEntry(callback: (directoryEntry: FileSystemDirectoryEntry) => void): void;
/**
 * @supported Chrome
 */
export function getContexts(

      filter: ContextFilter,
    ): Promise<ExtensionContext[]>;
/**
 * @supported Chrome
 */
export function getContexts(

      filter: ContextFilter,

      /**
       * @param contexts The matching contexts, if any.
       */
      callback?: (
        contexts: ExtensionContext[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export interface Port {
    name: string;
    disconnect(): void;
    postMessage(message: unknown): void;
    sender?: MessageSender;
    onDisconnect: events.Event<(port: Port) => void>;
    onMessage: events.Event<(message: unknown, port: Port) => void>;
}
/**
 * @supported Chrome
 */
export interface MessageSender {
    documentId?: string;
    documentLifecycle?: string;
    frameId?: number;
    id?: string;
    nativeApplication?: string;
    origin?: string;
    tab?: tabs.Tab;
    tlsChannelId?: string;
    url?: string;
}
/**
 * @supported Chrome
 */
export interface PlatformInfo {
    arch: PlatformArch;
    nacl_arch?: PlatformNaclArch;
    os: PlatformOs;
}
/**
 * @supported Chrome
 */
export const onInstalled: events.Event<(details: { reason: OnInstalledReason; previousVersion?: string; id?: string }) => void>;
/**
 * @supported Chrome
 */
export const onUpdateAvailable: events.Event<(details: UpdateAvailableDetails) => void>;
/**
 * @supported Chrome
 */
export const onMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome
 */
export const onMessageExternal: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome
 */
export const onUserScriptMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome
 */
export interface MessageOptions {
    includeTlsChannelId?: boolean;
}
/**
 * @supported Chrome
 */
export interface OnInstalledDetails {
    reason: OnInstalledReason;
    previousVersion?: string;
    id?: string;
}
/**
 * @supported Chrome
 */
export interface UpdateAvailableDetails {
    version: string;
}
/**
 * @supported Chrome
 */
export const onRestartRequired: events.Event<(reason: OnRestartRequiredReason) => void>;

}

export namespace scripting {
/**
 * @supported Chrome
 */
export function executeScript<R = unknown, Args extends unknown[] = unknown[]>(injection: ScriptInjection<Args, R>, callback?: (results: InjectionResult<Awaited<R>>[]) => void): Promise<InjectionResult<Awaited<R>>[]>;
/**
 * @supported Chrome
 */
export function insertCSS(

      injection: CSSInjection,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function insertCSS(

      injection: CSSInjection,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeCSS(

      injection: CSSInjection,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeCSS(

      injection: CSSInjection,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function registerContentScripts(

      scripts: RegisteredContentScript[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function registerContentScripts(

      scripts: RegisteredContentScript[],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getRegisteredContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<RegisteredContentScript[]>;
/**
 * @supported Chrome
 */
export function getRegisteredContentScripts(

      filter?: ContentScriptFilter,

      callback?: (
        scripts: RegisteredContentScript[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function unregisterContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function unregisterContentScripts(

      filter?: ContentScriptFilter,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateContentScripts(

      scripts: RegisteredContentScript[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateContentScripts(

      scripts: RegisteredContentScript[],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
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
 * @supported Chrome
 */
export interface InjectionResult<R = unknown> {
    documentId: string;
    frameId: number;
    result?: R;
}
/**
 * @supported Chrome
 */
export interface InjectionTarget {
    allFrames?: boolean;
    documentIds?: string[];
    frameIds?: number[];
    tabId: number;
}

}

export namespace search {
/**
 * @supported Chrome
 */
export function query(queryInfo: QueryInfo): Promise<void>;
/**
 * @supported Chrome
 */
export function query(queryInfo: QueryInfo, callback: () => void): void;

}

export namespace sessions {
/**
 * @supported Chrome
 */
export function getRecentlyClosed(

      filter?: Filter,
    ): Promise<Session[]>;
/**
 * @supported Chrome
 */
export function getRecentlyClosed(

      filter?: Filter,

      /**
       * @param sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index `0`). The entries may contain either tabs or windows.
       */
      callback?: (
        sessions: Session[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDevices(

      filter?: Filter,
    ): Promise<Device[]>;
/**
 * @supported Chrome
 */
export function getDevices(

      filter?: Filter,

      /**
       * @param devices The list of {@link sessions.Device} objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. {@link tabs.Tab} objects are sorted by recency in the {@link windows.Window} of the {@link sessions.Session} objects.
       */
      callback?: (
        devices: Device[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function restore(

      sessionId?: string,
    ): Promise<Session>;
/**
 * @supported Chrome
 */
export function restore(

      sessionId?: string,

      /**
       * @param restoredSession A {@link sessions.Session} containing the restored {@link windows.Window} or {@link tabs.Tab} object.
       */
      callback?: (
        restoredSession: Session,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export interface Device {
    info: string;
}

}

export namespace sidePanel {
/**
 * @supported Chrome
 */
export function open(

      options: OpenOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function open(

      options: OpenOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getLayout(): Promise<PanelLayout>;
/**
 * @supported Chrome
 */
export function getLayout(

      callback?: (
        layout: PanelLayout,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function close(

      options: CloseOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function close(

      options: CloseOptions,

      callback?: () => void,
    ): void;

}

export namespace storage {
/**
 * @supported Chrome
 */
export interface StorageChange<T = unknown> {
    oldValue?: T;
    newValue?: T;
}
/**
 * @supported Chrome
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
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }, callback?: () => void): Promise<void>;
    onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
}
/**
 * @supported Chrome
 */
export const onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;

}

export namespace system.cpu {
/**
 * @supported Chrome
 */
export function getInfo(): Promise<CpuInfo>;
/**
 * @supported Chrome
 */
export function getInfo(

      callback?: (
        info: CpuInfo,
      ) => void,
    ): void;

}

export namespace system.display {
/**
 * @supported Chrome
 */
export function getInfo(

      /**
       * @since Chrome 59
       */
      flags?: GetInfoFlags,
    ): Promise<DisplayUnitInfo[]>;
/**
 * @supported Chrome
 */
export function getInfo(

      /**
       * @since Chrome 59
       */
      flags?: GetInfoFlags,

      callback?: (
        displayInfo: DisplayUnitInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getDisplayLayout(): Promise<DisplayLayout[]>;
/**
 * @supported Chrome
 */
export function getDisplayLayout(

      callback?: (
        layouts: DisplayLayout[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setDisplayProperties(

      id: string,

      info: DisplayProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setDisplayProperties(

      id: string,

      info: DisplayProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setDisplayLayout(

      layouts: DisplayLayout[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setDisplayLayout(

      layouts: DisplayLayout[],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function enableUnifiedDesktop(

      enabled: boolean,
    ): void;
/**
 * @supported Chrome
 */
export function overscanCalibrationStart(

      id: string,
    ): void;
/**
 * @supported Chrome
 */
export function overscanCalibrationAdjust(

      id: string,

      delta: Insets,
    ): void;
/**
 * @supported Chrome
 */
export function overscanCalibrationReset(

      id: string,
    ): void;
/**
 * @supported Chrome
 */
export function overscanCalibrationComplete(

      id: string,
    ): void;
/**
 * @supported Chrome
 */
export function showNativeTouchCalibration(

      id: string,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function showNativeTouchCalibration(

      id: string,

      callback?: (
        success: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function startCustomTouchCalibration(

      id: string,
    ): void;
/**
 * @supported Chrome
 */
export function completeCustomTouchCalibration(

      pairs: TouchCalibrationPairQuad,

      bounds: Bounds,
    ): void;
/**
 * @supported Chrome
 */
export function clearTouchCalibration(

      id: string,
    ): void;
/**
 * @supported Chrome
 */
export function setMirrorMode(

      info: MirrorModeInfo,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setMirrorMode(

      info: MirrorModeInfo,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export interface DisplayUnitInfo {
    isInternal: boolean;
}

}

export namespace system.memory {
/**
 * @supported Chrome
 */
export function getInfo(): Promise<MemoryInfo>;
/**
 * @supported Chrome
 */
export function getInfo(

      callback?: (
        info: MemoryInfo,
      ) => void,
    ): void;

}

export namespace system.storage {
/**
 * @supported Chrome
 */
export function getInfo(): Promise<StorageUnitInfo[]>;
/**
 * @supported Chrome
 */
export function getInfo(

      callback?: (
        info: StorageUnitInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function ejectDevice(

      id: string,
    ): Promise<EjectDeviceResultCode>;
/**
 * @supported Chrome
 */
export function ejectDevice(

      id: string,

      callback?: (
        result: EjectDeviceResultCode,
      ) => void,
    ): void;

}

export namespace tabCapture {
/**
 * @supported Chrome
 */
export function getCapturedTabs(): Promise<CaptureInfo[]>;
/**
 * @supported Chrome
 */
export function getCapturedTabs(

      callback?: (
        result: CaptureInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMediaStreamId(

      options?: GetMediaStreamOptions,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function getMediaStreamId(

      options?: GetMediaStreamOptions,

      callback?: (
        streamId: string,
      ) => void,
    ): void;

}

export namespace tabGroups {
/**
 * @supported Chrome
 */
export function get(

      groupId: number,
    ): Promise<TabGroup>;
/**
 * @supported Chrome
 */
export function get(

      groupId: number,

      callback?: (
        group: TabGroup,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function query(

      queryInfo: {

        /**
         * Whether the groups are collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the groups.
         */
        color?: Color,

        /**
         * Match group titles against a pattern.
         */
        title?: string,

        /**
         * Whether the group is shared.
         *
         * @since Chrome 137
         */
        shared?: boolean,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,
      },
    ): Promise<TabGroup[]>;
/**
 * @supported Chrome
 */
export function query(

      queryInfo: {

        /**
         * Whether the groups are collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the groups.
         */
        color?: Color,

        /**
         * Match group titles against a pattern.
         */
        title?: string,

        /**
         * Whether the group is shared.
         *
         * @since Chrome 137
         */
        shared?: boolean,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,
      },

      callback?: (
        result: TabGroup[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      groupId: number,

      updateProperties: {

        /**
         * Whether the group should be collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the group.
         */
        color?: Color,

        /**
         * The title of the group.
         */
        title?: string,
      },
    ): Promise<TabGroup | undefined>;
/**
 * @supported Chrome
 */
export function update(

      groupId: number,

      updateProperties: {

        /**
         * Whether the group should be collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the group.
         */
        color?: Color,

        /**
         * The title of the group.
         */
        title?: string,
      },

      /**
       * @param group Details about the updated group.
       */
      callback?: (
        group?: TabGroup,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function move(

      groupId: number,

      moveProperties: {

        /**
         * The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with {@link windows.WindowType} type `"normal"`.
         */
        windowId?: number,

        /**
         * The position to move the group to. Use `-1` to place the group at the end of the window.
         */
        index: number,
      },
    ): Promise<TabGroup | undefined>;
/**
 * @supported Chrome
 */
export function move(

      groupId: number,

      moveProperties: {

        /**
         * The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with {@link windows.WindowType} type `"normal"`.
         */
        windowId?: number,

        /**
         * The position to move the group to. Use `-1` to place the group at the end of the window.
         */
        index: number,
      },

      /**
       * @param group Details about the moved group.
       */
      callback?: (
        group?: TabGroup,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onRemoved: events.Event<(group: TabGroup) => void>;

}

export namespace tabs {
/**
 * @supported Chrome
 */
export function get(

      tabId: number,
    ): Promise<Tab>;
/**
 * @supported Chrome
 */
export function get(

      tabId: number,

      callback?: (
        tab: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getCurrent(): Promise<Tab | undefined>;
/**
 * @supported Chrome
 */
export function getCurrent(

      callback?: (
        tab?: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function connect(

      tabId: number,

      connectInfo?: {

        /**
         * Is passed into onConnect for content scripts that are listening for the connection event.
         */
        name?: string,

        /**
         * Open a port to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
         */
        frameId?: number,

        /**
         * Open a port to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },
    ): runtime.Port;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, options: MessageSendOptions, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome
 */
export function sendMessage<R = unknown, M = unknown>(tabId: number, message: M, options?: MessageSendOptions): Promise<R>;
/**
 * @supported Chrome
 */
export function create(

      createProperties: {

        /**
         * The window in which to create the new tab. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string,

        /**
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see {@link windows.update}). Defaults to `true`.
         */
        active?: boolean,

        /**
         * Whether the tab should become the selected tab in the window. Defaults to `true`
         *
         * @deprecated Please use _active_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned. Defaults to `false`
         */
        pinned?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         */
        openerTabId?: number,

        /**
         * The ID of an existing tab to create a split view with. If specified, the split-with tab must meet the following conditions:
         *
         * *   It must not be an already split tab.
         * *   It must be in the same window as the newly created tab.
         * *   If `windowId` is specified, it must be the same as the split-with tab's window ID.
         * *   If `index` is specified, it must be an index adjacent to the split-with tab and will affect the relative positioning of the newly created tab.
         *
         * @since Chrome 155
         */
        splitWithTabId?: number,
      },
    ): Promise<Tab>;
/**
 * @supported Chrome
 */
export function create(

      createProperties: {

        /**
         * The window in which to create the new tab. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string,

        /**
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see {@link windows.update}). Defaults to `true`.
         */
        active?: boolean,

        /**
         * Whether the tab should become the selected tab in the window. Defaults to `true`
         *
         * @deprecated Please use _active_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned. Defaults to `false`
         */
        pinned?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         */
        openerTabId?: number,

        /**
         * The ID of an existing tab to create a split view with. If specified, the split-with tab must meet the following conditions:
         *
         * *   It must not be an already split tab.
         * *   It must be in the same window as the newly created tab.
         * *   If `windowId` is specified, it must be the same as the split-with tab's window ID.
         * *   If `index` is specified, it must be an index adjacent to the split-with tab and will affect the relative positioning of the newly created tab.
         *
         * @since Chrome 155
         */
        splitWithTabId?: number,
      },

      /**
       * @param tab The created tab.
       */
      callback?: (
        tab: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function createSplit(

      tabIds: [number, number],
    ): Promise<number>;
/**
 * @supported Chrome
 */
export function createSplit(

      tabIds: [number, number],

      /**
       * @param splitViewId The ID of the newly created Split View containing the tabs specified.
       */
      callback?: (
        splitViewId: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function duplicate(

      tabId: number,
    ): Promise<Tab | undefined>;
/**
 * @supported Chrome
 */
export function duplicate(

      tabId: number,

      /**
       * @param tab Details about the duplicated tab. The `url`, `pendingUrl`, `title` and `favIconUrl` properties are only included on the {@link tabs.Tab} object if the extension has the `"tabs"` permission or has host permissions for the page.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function query(

      queryInfo: {

        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean,

        /**
         * Whether the tabs are pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tabs are audible.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * Whether the tabs are muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
         *
         * @since Chrome 132
         */
        frozen?: boolean,

        /**
         * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * Whether the tabs can be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * Whether the tabs are in the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        currentWindow?: boolean,

        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean,

        /**
         * The tab loading status.
         */
        status?: TabStatus,

        /**
         * Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
         */
        title?: string,

        /**
         * Match tabs against one or more [URL patterns](https://developer.chrome.com/docs/extensions/match_patterns). Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
         */
        url?: string | string[],

        /**
         * The ID of the group that the tabs are in, or {@link tabGroups.TAB_GROUP_ID_NONE} for ungrouped tabs.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The ID of the Split View that the tabs are in, or {@link tabs.SPLIT_VIEW_ID_NONE} for tabs that aren't in a Split View.
         *
         * @since Chrome 140
         */
        splitViewId?: number,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType,

        /**
         * The position of the tabs within their windows.
         */
        index?: number,
      },
    ): Promise<Tab[]>;
/**
 * @supported Chrome
 */
export function query(

      queryInfo: {

        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean,

        /**
         * Whether the tabs are pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tabs are audible.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * Whether the tabs are muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
         *
         * @since Chrome 132
         */
        frozen?: boolean,

        /**
         * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * Whether the tabs can be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * Whether the tabs are in the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        currentWindow?: boolean,

        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean,

        /**
         * The tab loading status.
         */
        status?: TabStatus,

        /**
         * Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
         */
        title?: string,

        /**
         * Match tabs against one or more [URL patterns](https://developer.chrome.com/docs/extensions/match_patterns). Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
         */
        url?: string | string[],

        /**
         * The ID of the group that the tabs are in, or {@link tabGroups.TAB_GROUP_ID_NONE} for ungrouped tabs.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The ID of the Split View that the tabs are in, or {@link tabs.SPLIT_VIEW_ID_NONE} for tabs that aren't in a Split View.
         *
         * @since Chrome 140
         */
        splitViewId?: number,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType,

        /**
         * The position of the tabs within their windows.
         */
        index?: number,
      },

      callback?: (
        result: Tab[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function highlight(

      highlightInfo: {

        /**
         * The window that contains the tabs.
         */
        windowId?: number,

        /**
         * One or more tab indices to highlight.
         */
        tabs: number[] | number,
      },
    ): Promise<windows.Window>;
/**
 * @supported Chrome
 */
export function highlight(

      highlightInfo: {

        /**
         * The window that contains the tabs.
         */
        windowId?: number,

        /**
         * One or more tab indices to highlight.
         */
        tabs: number[] | number,
      },

      /**
       * @param window Contains details about the window whose tabs were highlighted.
       */
      callback?: (
        window: windows.Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      tabId: number,

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },
    ): Promise<Tab | undefined>;
/**
 * @supported Chrome
 */
export function update(

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },
    ): Promise<Tab | undefined>;
/**
 * @supported Chrome
 */
export function update(

      tabId: number,

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },

      /**
       * @param tab Details about the updated tab. The `url`, `pendingUrl`, `title` and `favIconUrl` properties are only included on the {@link tabs.Tab} object if the extension has the `"tabs"` permission or has host permissions for the page.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },

      /**
       * @param tab Details about the updated tab. The `url`, `pendingUrl`, `title` and `favIconUrl` properties are only included on the {@link tabs.Tab} object if the extension has the `"tabs"` permission or has host permissions for the page.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function move(

      tabIds: number | number[],

      moveProperties: {

        /**
         * Defaults to the window the tab is currently in.
         */
        windowId?: number,

        /**
         * The position to move the window to. Use `-1` to place the tab at the end of the window.
         */
        index: number,
      },
    ): Promise<Tab | Tab[]>;
/**
 * @supported Chrome
 */
export function move(

      tabIds: number | number[],

      moveProperties: {

        /**
         * Defaults to the window the tab is currently in.
         */
        windowId?: number,

        /**
         * The position to move the window to. Use `-1` to place the tab at the end of the window.
         */
        index: number,
      },

      /**
       * @param tabs Details about the moved tabs.
       */
      callback?: (
        tabs: Tab | Tab[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function reload(

      tabId?: number,

      reloadProperties?: {

        /**
         * Whether to bypass local caching. Defaults to `false`.
         */
        bypassCache?: boolean,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function reload(

      tabId?: number,

      reloadProperties?: {

        /**
         * Whether to bypass local caching. Defaults to `false`.
         */
        bypassCache?: boolean,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      tabIds: number | number[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function remove(

      tabIds: number | number[],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function group(

      options: {

        /**
         * The tab ID or list of tab IDs to add to the specified group.
         */
        tabIds: number | [number, ...number[]],

        /**
         * The ID of the group to add the tabs to. If not specified, a new group will be created.
         */
        groupId?: number,

        /**
         * Configurations for creating a group. Cannot be used if groupId is already specified.
         */
        createProperties?: {

          /**
           * The window of the new group. Defaults to the current window.
           */
          windowId?: number,
        },
      },
    ): Promise<number>;
/**
 * @supported Chrome
 */
export function group(

      options: {

        /**
         * The tab ID or list of tab IDs to add to the specified group.
         */
        tabIds: number | [number, ...number[]],

        /**
         * The ID of the group to add the tabs to. If not specified, a new group will be created.
         */
        groupId?: number,

        /**
         * Configurations for creating a group. Cannot be used if groupId is already specified.
         */
        createProperties?: {

          /**
           * The window of the new group. Defaults to the current window.
           */
          windowId?: number,
        },
      },

      /**
       * @param groupId The ID of the group that the tabs were added to.
       */
      callback?: (
        groupId: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function ungroup(

      tabIds: number | [number, ...number[]],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function ungroup(

      tabIds: number | [number, ...number[]],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function unsplit(

      splitViewId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function unsplit(

      splitViewId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function detectLanguage(

      tabId?: number,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function detectLanguage(

      tabId?: number,

      /**
       * @param language An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see [kLanguageInfoTable](https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc). The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which `zh-CN` is returned. For an unknown/undefined language, `und` is returned.
       */
      callback?: (
        language: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function captureVisibleTab(

      windowId?: number,

      options?: extensionTypes.ImageDetails,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function captureVisibleTab(

      windowId?: number,

      options?: extensionTypes.ImageDetails,

      /**
       * @param dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML `img` element for display.
       */
      callback?: (
        dataUrl: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setZoom(

      tabId: number,

      zoomFactor: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setZoom(

      zoomFactor: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setZoom(

      tabId: number,

      zoomFactor: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setZoom(

      zoomFactor: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getZoom(

      tabId?: number,
    ): Promise<number>;
/**
 * @supported Chrome
 */
export function getZoom(

      tabId?: number,

      /**
       * @param zoomFactor The tab's current zoom factor.
       */
      callback?: (
        zoomFactor: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setZoomSettings(

      tabId: number,

      zoomSettings: ZoomSettings,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setZoomSettings(

      zoomSettings: ZoomSettings,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setZoomSettings(

      tabId: number,

      zoomSettings: ZoomSettings,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setZoomSettings(

      zoomSettings: ZoomSettings,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getZoomSettings(

      tabId?: number,
    ): Promise<ZoomSettings>;
/**
 * @supported Chrome
 */
export function getZoomSettings(

      tabId?: number,

      /**
       * @param zoomSettings The tab's current zoom settings.
       */
      callback?: (
        zoomSettings: ZoomSettings,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function discard(

      tabId?: number,
    ): Promise<Tab | undefined>;
/**
 * @supported Chrome
 */
export function discard(

      tabId?: number,

      /**
       * @param tab The discarded tab, if it was successfully discarded; undefined otherwise.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function goForward(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function goForward(

      tabId?: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function goBack(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function goBack(

      tabId?: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab";
/**
 * @supported Chrome
 */
/** @deprecated Manifest V2 only in Chrome & Firefox. In MV3, use browser.scripting.executeScript. */
export function executeScript<T = unknown>(details: extensionTypes.InjectDetails, callback?: (result: (T | undefined)[]) => void): Promise<(T | undefined)[]>;
/**
 * @supported Chrome
 */
/** @deprecated Manifest V2 only in Chrome & Firefox. In MV3, use browser.scripting.executeScript. */
export function executeScript<T = unknown>(tabId: number, details: extensionTypes.InjectDetails, callback?: (result: (T | undefined)[]) => void): Promise<(T | undefined)[]>;
/**
 * @supported Chrome
 */
export const onMoved: events.Event<(tabId: number, moveInfo: { windowId: number; fromIndex: number; toIndex: number }) => void>;
/**
 * @supported Chrome
 */
export const onActivated: events.Event<(activeInfo: { tabId: number; windowId: number }) => void>;
/**
 * @supported Chrome
 */
export const onHighlighted: events.Event<(highlightInfo: { windowId: number; tabIds: number[] }) => void>;
/**
 * @supported Chrome
 */
export const onDetached: events.Event<(tabId: number, detachInfo: { oldWindowId: number; oldPosition: number }) => void>;
/**
 * @supported Chrome
 */
export const onAttached: events.Event<(tabId: number, attachInfo: { newWindowId: number; newPosition: number }) => void>;
/**
 * @supported Chrome
 */
export const onRemoved: events.Event<(tabId: number, removeInfo: { windowId: number; isWindowClosing: boolean }) => void>;
/**
 * @supported Chrome
 */
export const onZoomChange: events.Event<(ZoomChangeInfo: { tabId: number; oldZoomFactor: number; newZoomFactor: number; zoomSettings: ZoomSettings }) => void>;
/**
 * @supported Chrome
 */
export interface MessageSendOptions {
    frameId?: number;
    documentId?: string;
}

}

export namespace topSites {
/**
 * @supported Chrome
 */
export function get(): Promise<MostVisitedURL[]>;
/**
 * @supported Chrome
 */
export function get(

      callback?: (
        data: MostVisitedURL[],
      ) => void,
    ): void;

}

export namespace tts {
/**
 * @supported Chrome
 */
export function speak(

      utterance: string,

      options?: TtsOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function speak(

      utterance: string,

      options?: TtsOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function isSpeaking(): Promise<boolean>;
/**
 * @supported Chrome
 */
export function isSpeaking(

      /**
       * @param speaking True if speaking, false otherwise.
       */
      callback?: (
        speaking: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getVoices(): Promise<TtsVoice[]>;
/**
 * @supported Chrome
 */
export function getVoices(

      /**
       * @param voices Array of {@link tts.TtsVoice} objects representing the available voices for speech synthesis.
       */
      callback?: (
        voices: TtsVoice[],
      ) => void,
    ): void;

}

export namespace ttsEngine {
/**
 * @supported Chrome
 */
export function updateVoices(

      voices: tts.TtsVoice[],
    ): void;
/**
 * @supported Chrome
 */
export function updateLanguage(

      status: LanguageStatus,
    ): void;

}

export namespace userScripts {
/**
 * @supported Chrome
 */
export function execute(

      injection: UserScriptInjection,
    ): Promise<InjectionResult[]>;
/**
 * @supported Chrome
 */
export function execute(

      injection: UserScriptInjection,

      callback?: (
        result: InjectionResult[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getWorldConfigurations(): Promise<WorldProperties[]>;
/**
 * @supported Chrome
 */
export function getWorldConfigurations(

      callback?: (
        worlds: WorldProperties[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function resetWorldConfiguration(

      worldId?: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function resetWorldConfiguration(

      worldId?: string,

      callback?: () => void,
    ): void;

}

export namespace vpnProvider {
/**
 * @supported Chrome
 */
export function createConfig(

      name: string,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function createConfig(

      name: string,

      /**
       * @param id A unique ID for the created configuration, or `undefined` on failure.
       */
      callback?: (
        id: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function destroyConfig(

      id: string,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function destroyConfig(

      id: string,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setParameters(

      parameters: Parameters,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setParameters(

      parameters: Parameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function sendPacket(

      data: ArrayBuffer,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function sendPacket(

      data: ArrayBuffer,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function notifyConnectionStateChanged(

      state: VpnConnectionState,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function notifyConnectionStateChanged(

      state: VpnConnectionState,

      callback?: () => void,
    ): void;

}

export namespace wallpaper {
/**
 * @supported Chrome
 */
export function setWallpaper(

      details: {

        /**
         * The jpeg or png encoded wallpaper image as an ArrayBuffer.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set (can be relative).
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: WallpaperLayout,

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet.
         */
        thumbnail?: boolean,
      },
    ): Promise<ArrayBuffer | undefined>;
/**
 * @supported Chrome
 */
export function setWallpaper(

      details: {

        /**
         * The jpeg or png encoded wallpaper image as an ArrayBuffer.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set (can be relative).
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: WallpaperLayout,

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet.
         */
        thumbnail?: boolean,
      },

      /**
       * @param thumbnail The jpeg encoded wallpaper thumbnail. It is generated by resizing the wallpaper to 128x60.
       */
      callback?: (
        thumbnail?: ArrayBuffer,
      ) => void,
    ): void;

}

export namespace webNavigation {
/**
 * @supported Chrome
 */
export function getFrame(

      details: {

        /**
         * The ID of the tab in which the frame is.
         */
        tabId?: number,

        /**
         * The ID of the process that runs the renderer for this tab.
         *
         * @deprecated Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
         * @chrome-deprecated-since Chrome 49
         */
        processId?: number,

        /**
         * The ID of the frame in the given tab.
         */
        frameId?: number,

        /**
         * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },
    ): Promise<{

      /**
       * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
       */
      errorOccurred: boolean,

      /**
       * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
       */
      url: string,

      /**
       * The ID of the parent frame, or `-1` if this is the main frame.
       */
      parentFrameId: number,

      /**
       * A UUID of the document loaded.
       *
       * @since Chrome 106
       */
      documentId: string,

      /**
       * A UUID of the parent document owning this frame. This is not set if there is no parent.
       *
       * @since Chrome 106
       */
      parentDocumentId?: string,

      /**
       * The lifecycle the document is in.
       *
       * @since Chrome 106
       */
      documentLifecycle: extensionTypes.DocumentLifecycle,

      /**
       * The type of frame the navigation occurred in.
       *
       * @since Chrome 106
       */
      frameType: extensionTypes.FrameType,
    } | undefined>;
/**
 * @supported Chrome
 */
export function getFrame(

      details: {

        /**
         * The ID of the tab in which the frame is.
         */
        tabId?: number,

        /**
         * The ID of the process that runs the renderer for this tab.
         *
         * @deprecated Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
         * @chrome-deprecated-since Chrome 49
         */
        processId?: number,

        /**
         * The ID of the frame in the given tab.
         */
        frameId?: number,

        /**
         * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },

      /**
       * @param details Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.
       */
      callback?: (
        details?: {

          /**
           * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
           */
          url: string,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAllFrames(

      details: {

        /**
         * The ID of the tab.
         */
        tabId: number,
      },
    ): Promise<{

      /**
       * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
       */
      errorOccurred: boolean,

      /**
       * The ID of the process that runs the renderer for this frame.
       */
      processId: number,

      /**
       * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
       */
      frameId: number,

      /**
       * The ID of the parent frame, or `-1` if this is the main frame.
       */
      parentFrameId: number,

      /**
       * The URL currently associated with this frame.
       */
      url: string,

      /**
       * A UUID of the document loaded.
       *
       * @since Chrome 106
       */
      documentId: string,

      /**
       * A UUID of the parent document owning this frame. This is not set if there is no parent.
       *
       * @since Chrome 106
       */
      parentDocumentId?: string,

      /**
       * The lifecycle the document is in.
       *
       * @since Chrome 106
       */
      documentLifecycle: extensionTypes.DocumentLifecycle,

      /**
       * The type of frame the navigation occurred in.
       *
       * @since Chrome 106
       */
      frameType: extensionTypes.FrameType,
    }[] | undefined>;
/**
 * @supported Chrome
 */
export function getAllFrames(

      details: {

        /**
         * The ID of the tab.
         */
        tabId: number,
      },

      /**
       * @param details A list of frames in the given tab, null if the specified tab ID is invalid.
       */
      callback?: (
        details?: {

          /**
           * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The URL currently associated with this frame.
           */
          url: string,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        }[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export const onTabReplaced: events.Event<(details: { replacedTabId: number; tabId: number; timeStamp: number }) => void>;

}

export namespace webRequest {
/**
 * @supported Chrome
 */
export function handlerBehaviorChanged(): Promise<void>;
/**
 * @supported Chrome
 */
export function handlerBehaviorChanged(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export interface UploadData {
    bytes?: ArrayBuffer;
    file?: string;
}

}

export namespace windows {
/**
 * @supported Chrome
 */
export function get(

      windowId: number,

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;
/**
 * @supported Chrome
 */
export function get(

      windowId: number,

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getCurrent(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;
/**
 * @supported Chrome
 */
export function getCurrent(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getLastFocused(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;
/**
 * @supported Chrome
 */
export function getLastFocused(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getAll(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window[]>;
/**
 * @supported Chrome
 */
export function getAll(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        windows: Window[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function create(

      createData?: {

        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The ID of the tab to add to the new window.
         */
        tabId?: number,

        /**
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number,

        /**
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width in pixels of the new window, including the frame. If not specified, defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not specified, defaults to a natural height.
         */
        height?: number,

        /**
         * If `true`, opens an active window. If `false`, opens an inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create.
         */
        type?: CreateType,

        /**
         * The initial state of the window. The `minimized`, `maximized`, and `fullscreen` states cannot be combined with `left`, `top`, `width`, or `height`.
         *
         * @since Chrome 44
         */
        state?: WindowState,

        /**
         * If `true`, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
         *
         * @since Chrome 64
         */
        setSelfAsOpener?: boolean,
      },
    ): Promise<Window | undefined>;
/**
 * @supported Chrome
 */
export function create(

      createData?: {

        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The ID of the tab to add to the new window.
         */
        tabId?: number,

        /**
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number,

        /**
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width in pixels of the new window, including the frame. If not specified, defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not specified, defaults to a natural height.
         */
        height?: number,

        /**
         * If `true`, opens an active window. If `false`, opens an inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create.
         */
        type?: CreateType,

        /**
         * The initial state of the window. The `minimized`, `maximized`, and `fullscreen` states cannot be combined with `left`, `top`, `width`, or `height`.
         *
         * @since Chrome 44
         */
        state?: WindowState,

        /**
         * If `true`, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
         *
         * @since Chrome 64
         */
        setSelfAsOpener?: boolean,
      },

      /**
       * @param window Contains details about the created window.
       */
      callback?: (
        window?: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      windowId: number,

      updateInfo: {

        /**
         * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        left?: number,

        /**
         * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width to resize the window to in pixels. This value is ignored for panels.
         */
        width?: number,

        /**
         * The height to resize the window to in pixels. This value is ignored for panels.
         */
        height?: number,

        /**
         * If `true`, brings the window to the front; cannot be combined with the state 'minimized'. If `false`, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'.
         */
        focused?: boolean,

        /**
         * If `true`, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to `false` to cancel a previous `drawAttention` request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'.
         */
        state?: WindowState,
      },
    ): Promise<Window>;
/**
 * @supported Chrome
 */
export function update(

      windowId: number,

      updateInfo: {

        /**
         * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        left?: number,

        /**
         * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width to resize the window to in pixels. This value is ignored for panels.
         */
        width?: number,

        /**
         * The height to resize the window to in pixels. This value is ignored for panels.
         */
        height?: number,

        /**
         * If `true`, brings the window to the front; cannot be combined with the state 'minimized'. If `false`, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'.
         */
        focused?: boolean,

        /**
         * If `true`, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to `false` to cancel a previous `drawAttention` request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'.
         */
        state?: WindowState,
      },

      callback?: (
        window: Window,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function remove(

      windowId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function remove(

      windowId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab";
/**
 * @supported Chrome
 */
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "locked-fullscreen";

}
}

declare namespace browser {
  export import _debugger = chrome._debugger;
  export import action = chrome.action;
  export import alarms = chrome.alarms;
  export import audio = chrome.audio;
  export import bookmarks = chrome.bookmarks;
  export import browsingData = chrome.browsingData;
  export import certificateProvider = chrome.certificateProvider;
  export import chrome_url_overrides = chrome.chrome_url_overrides;
  export import commands = chrome.commands;
  export import contextMenus = chrome.contextMenus;
  export import cookies = chrome.cookies;
  export import declarativeNetRequest = chrome.declarativeNetRequest;
  export import desktopCapture = chrome.desktopCapture;
  export import devtools = chrome.devtools;
  export import documentScan = chrome.documentScan;
  export import dom = chrome.dom;
  export import downloads = chrome.downloads;
  export import enterprise = chrome.enterprise;
  export import events = chrome.events;
  export import extension = chrome.extension;
  export import fileSystemProvider = chrome.fileSystemProvider;
  export import fontSettings = chrome.fontSettings;
  export import gcm = chrome.gcm;
  export import history = chrome.history;
  export import i18n = chrome.i18n;
  export import identity = chrome.identity;
  export import idle = chrome.idle;
  export import input = chrome.input;
  export import instanceID = chrome.instanceID;
  export import loginState = chrome.loginState;
  export import management = chrome.management;
  export import notifications = chrome.notifications;
  export import offscreen = chrome.offscreen;
  export import omnibox = chrome.omnibox;
  export import pageCapture = chrome.pageCapture;
  export import permissions = chrome.permissions;
  export import platformKeys = chrome.platformKeys;
  export import power = chrome.power;
  export import printing = chrome.printing;
  export import printingMetrics = chrome.printingMetrics;
  export import processes = chrome.processes;
  export import runtime = chrome.runtime;
  export import scripting = chrome.scripting;
  export import search = chrome.search;
  export import sessions = chrome.sessions;
  export import sidePanel = chrome.sidePanel;
  export import storage = chrome.storage;
  export import system = chrome.system;
  export import tabCapture = chrome.tabCapture;
  export import tabGroups = chrome.tabGroups;
  export import tabs = chrome.tabs;
  export import topSites = chrome.topSites;
  export import tts = chrome.tts;
  export import ttsEngine = chrome.ttsEngine;
  export import userScripts = chrome.userScripts;
  export import vpnProvider = chrome.vpnProvider;
  export import wallpaper = chrome.wallpaper;
  export import webNavigation = chrome.webNavigation;
  export import webRequest = chrome.webRequest;
  export import windows = chrome.windows;
}
