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
export namespace accessibilityFeatures {
/**
 * @supported Chrome
 */
export const spokenFeedback: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const largeCursor: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const stickyKeys: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const highContrast: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const screenMagnifier: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const autoclick: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const virtualKeyboard: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const caretHighlight: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const cursorHighlight: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const cursorColor: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const dockedMagnifier: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const focusHighlight: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const selectToSpeak: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const switchAccess: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const animationPolicy: types.ChromeSetting<"allowed" | "once" | "none">;
/**
 * @supported Chrome
 */
export const dictation: types.ChromeSetting<boolean>;

}

export namespace action {
/**
 * @supported Chrome
 */
export interface TabDetails {
    /**
     * The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.
     *
     * @supported Chrome
     */
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface UserSettings {
    /**
     * Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user).
     *
     * @supported Chrome
     */
    isOnToolbar: boolean;
}
/**
 * @supported Chrome
 */
export interface UserSettingsChange {
    /**
     * Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user).
     *
     * @supported Chrome
     */
    isOnToolbar?: boolean;
}
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
export const onClicked: events.Event<(tab: tabs.Tab) => void>;
/**
 * @supported Chrome
 */
export const onUserSettingsChanged: events.Event<(
      change: UserSettingsChange,
    ) => void>;
/**
 * @supported Chrome
 */
export function setTitle(

      details: {

        /**
         * The string the action should display when moused over.
         */
        title: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setTitle(

      details: {

        /**
         * The string the action should display when moused over.
         */
        title: string,

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
export function getTitle(

      details: TabDetails,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function getTitle(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;
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
export function setPopup(

      details: {

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,

        /**
         * The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
         */
        popup: string,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setPopup(

      details: {

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,

        /**
         * The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
         */
        popup: string,
      },

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPopup(

      details: TabDetails,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function getPopup(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setBadgeText(

      details: {

        /**
         * Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text.
         */
        text?: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setBadgeText(

      details: {

        /**
         * Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text.
         */
        text?: string,

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
export function getBadgeText(

      details: TabDetails,
    ): Promise<string>;
/**
 * @supported Chrome
 */
export function getBadgeText(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setBadgeBackgroundColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color: string | extensionTypes.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setBadgeBackgroundColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color: string | extensionTypes.ColorArray,

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
export function getBadgeBackgroundColor(

      details: TabDetails,
    ): Promise<extensionTypes.ColorArray>;
/**
 * @supported Chrome
 */
export function getBadgeBackgroundColor(

      details: TabDetails,

      callback?: (
        result: extensionTypes.ColorArray,
      ) => void,
    ): void;
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
 * @supported Chrome
 */
export function enable(

      tabId?: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome, Firefox
 */
export function disable(

      tabId?: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function disable(

      tabId?: number,

      callback?: () => void,
    ): void;
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
 * @supported Chrome, Firefox
 */
export type ColorArray = [number, number, number, number];
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
    periodInMinutes?: number;
    /** @supported Chrome */
    persistAcrossSessions: boolean;
}
/**
 * @supported Chrome
 */
export interface AlarmCreateInfo {
    /**
     * Name of this alarm.
     *
     * @since Pending
     *
     * @supported Chrome
     */
    name?: string;
    /**
     * Time at which the alarm should fire, in milliseconds past the epoch (e.g. `Date.now() + n`).
     *
     * @supported Chrome
     */
    when?: number;
    /**
     * Length of time in minutes after which the `onAlarm` event should fire.
     *
     * @supported Chrome
     */
    delayInMinutes?: number;
    /**
     * If set, the onAlarm event should fire every `periodInMinutes` minutes after the initial event specified by `when` or `delayInMinutes`. If not set, the alarm will only fire once.
     *
     * @supported Chrome
     */
    periodInMinutes?: number;
    /**
     * Whether the alarm should persist across sessions (browser restarts). In Chrome, this defaults to true to match historical behavior, but you should set this explicitly to maximize compatibility across browsers.
     *
     * @since Chrome 150
     *
     * @supported Chrome
     */
    persistAcrossSessions?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const onAlarm: events.Event<(
      alarm: Alarm,
    ) => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function clearAll(): Promise<boolean>;
/**
 * @supported Chrome
 */
export function clearAll(

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

}

export namespace audio {
/**
 * @supported Chrome
 */
export type StreamType = "INPUT" | "OUTPUT";
/**
 * @supported Chrome
 */
export type DeviceType = "HEADPHONE" | "MIC" | "USB" | "BLUETOOTH" | "HDMI" | "INTERNAL_SPEAKER" | "INTERNAL_MIC" | "FRONT_MIC" | "REAR_MIC" | "KEYBOARD_MIC" | "HOTWORD" | "LINEOUT" | "POST_MIX_LOOPBACK" | "POST_DSP_LOOPBACK" | "ALSA_LOOPBACK" | "OTHER";
/**
 * @supported Chrome
 */
export interface AudioDeviceInfo {
    /**
     * The unique identifier of the audio device.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * Stream type associated with this device.
     *
     * @supported Chrome
     */
    streamType: StreamType;
    /**
     * Type of the device.
     *
     * @supported Chrome
     */
    deviceType: DeviceType;
    /**
     * The user-friendly name (e.g. "USB Microphone").
     *
     * @supported Chrome
     */
    displayName: string;
    /**
     * Device name.
     *
     * @supported Chrome
     */
    deviceName: string;
    /**
     * True if this is the current active device.
     *
     * @supported Chrome
     */
    isActive: boolean;
    /**
     * The sound level of the device, volume for output, gain for input.
     *
     * @supported Chrome
     */
    level: number;
    /**
     * The stable/persisted device id string when available.
     *
     * @supported Chrome
     */
    stableDeviceId?: string;
}
/**
 * @supported Chrome
 */
export interface DeviceFilter {
    /**
     * If set, only audio devices whose stream type is included in this list will satisfy the filter.
     *
     * @supported Chrome
     */
    streamTypes?: StreamType[];
    /**
     * If set, only audio devices whose active state matches this value will satisfy the filter.
     *
     * @supported Chrome
     */
    isActive?: boolean;
}
/**
 * @supported Chrome
 */
export interface DeviceProperties {
    /**
     * The audio device's desired sound level. Defaults to the device's current sound level.
     *
     * If used with audio input device, represents audio device gain.
     *
     * If used with audio output device, represents audio device volume.
     *
     * @supported Chrome
     */
    level?: number;
}
/**
 * @supported Chrome
 */
export interface DeviceIdLists {
    /**
     * List of input devices specified by their ID.
     *
     * To indicate input devices should be unaffected, leave this property unset.
     *
     * @supported Chrome
     */
    input?: string[];
    /**
     * List of output devices specified by their ID.
     *
     * To indicate output devices should be unaffected, leave this property unset.
     *
     * @supported Chrome
     */
    output?: string[];
}
/**
 * @supported Chrome
 */
export interface MuteChangedEvent {
    /**
     * The type of the stream for which the mute value changed. The updated mute value applies to all devices with this stream type.
     *
     * @supported Chrome
     */
    streamType: StreamType;
    /**
     * Whether or not the stream is now muted.
     *
     * @supported Chrome
     */
    isMuted: boolean;
}
/**
 * @supported Chrome
 */
export interface LevelChangedEvent {
    /**
     * ID of device whose sound level has changed.
     *
     * @supported Chrome
     */
    deviceId: string;
    /**
     * The device's new sound level.
     *
     * @supported Chrome
     */
    level: number;
}
/**
 * @supported Chrome
 */
export const onLevelChanged: events.Event<(
      event: LevelChangedEvent,
    ) => void>;
/**
 * @supported Chrome
 */
export const onMuteChanged: events.Event<(
      event: MuteChangedEvent,
    ) => void>;
/**
 * @supported Chrome
 */
export const onDeviceListChanged: events.Event<(
      devices: AudioDeviceInfo[],
    ) => void>;
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
export type FolderType = "bookmarks-bar" | "other" | "mobile" | "managed";
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
    parentId?: string;
    /**
     * The 0-based position of this node within its parent folder.
     *
     * @supported Chrome, Firefox
     */
    index?: number;
    /**
     * The URL navigated to when a user clicks the bookmark. Omitted for folders.
     *
     * @supported Chrome, Firefox
     */
    url?: string;
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
    dateAdded?: number;
    /**
     * When this node was last opened, in milliseconds since the epoch. Not set for folders.
     *
     * @since Chrome 114
     *
     * @supported Chrome
     */
    dateLastUsed?: number;
    /**
     * When the contents of this folder last changed, in milliseconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    dateGroupModified?: number;
    /**
     * If present, this is a folder that is added by the browser and that cannot be modified by the user or the extension. Child nodes may be modified, if this node does not have the `unmodifiable` property set. Omitted if the node can be modified by the user and the extension (default).
     *
     * There may be zero, one or multiple nodes of each folder type. A folder may be added or removed by the browser, but not via the extensions API.
     *
     * @since Chrome 134
     *
     * @supported Chrome
     */
    folderType?: FolderType;
    /**
     * Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
     *
     * @supported Chrome, Firefox
     */
    unmodifiable?: BookmarkTreeNodeUnmodifiable;
    /** @supported Chrome */
    syncing: boolean;
    /**
     * An ordered list of children of this node.
     *
     * @supported Chrome, Firefox
     */
    children?: BookmarkTreeNode[];
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
    parentId?: string;
    /** @supported Chrome, Firefox */
    index?: number;
    /** @supported Chrome, Firefox */
    title?: string;
    /** @supported Chrome, Firefox */
    url?: string;
}
/**
 * @supported Chrome
 */
export const MAX_WRITE_OPERATIONS_PER_HOUR: 1000000;
/**
 * @supported Chrome
 */
export const MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000;
/**
 * @supported Chrome
 */
export const ROOT_NODE_ID: "0";
/**
 * @supported Chrome, Firefox
 */
export const onCreated: events.Event<(
      id: string,
      bookmark: BookmarkTreeNode,
    ) => void>;
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
 * @supported Chrome
 */
export const onImportBegan: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onImportEnded: events.Event<() => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
    since?: number;
    /**
     * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'.
     *
     * @supported Chrome, Firefox
     */
    originTypes?: {

        /**
         * Normal websites.
         */
        unprotectedWeb?: boolean,

        /**
         * Websites that have been installed as hosted applications (be careful!).
         */
        protectedWeb?: boolean,

        /**
         * Extensions and packaged applications a user has installed (be \_really\_ careful!).
         */
        extension?: boolean,
      };
    /**
     * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
     *
     * @since Chrome 74
     *
     * @supported Chrome
     */
    origins?: [string, ...string[]];
    /**
     * When present, data for origins in this list is excluded from deletion. Can't be used together with `origins`. Only supported for cookies, storage and cache. Cookies are excluded for the whole registrable domain.
     *
     * @since Chrome 74
     *
     * @supported Chrome
     */
    excludeOrigins?: string[];
}
/**
 * @supported Chrome, Firefox
 */
export interface DataTypeSet {
    /**
     * Websites' appcaches.
     *
     * @deprecated Support for appcache has been removed. This data type will be ignored.
     *
     * @supported Chrome
     */
    appcache?: boolean;
    /**
     * The browser's cache.
     *
     * @supported Chrome, Firefox
     */
    cache?: boolean;
    /**
     * Cache storage
     *
     * @since Chrome 72
     *
     * @supported Chrome
     */
    cacheStorage?: boolean;
    /**
     * The browser's cookies.
     *
     * @supported Chrome, Firefox
     */
    cookies?: boolean;
    /**
     * The browser's download list.
     *
     * @supported Chrome, Firefox
     */
    downloads?: boolean;
    /**
     * Websites' file systems.
     *
     * @supported Chrome
     */
    fileSystems?: boolean;
    /**
     * The browser's stored form data.
     *
     * @supported Chrome, Firefox
     */
    formData?: boolean;
    /**
     * The browser's history.
     *
     * @supported Chrome, Firefox
     */
    history?: boolean;
    /**
     * Websites' IndexedDB data.
     *
     * @supported Chrome, Firefox
     */
    indexedDB?: boolean;
    /**
     * Websites' local storage data.
     *
     * @supported Chrome, Firefox
     */
    localStorage?: boolean;
    /**
     * Server-bound certificates.
     *
     * @deprecated Support for server-bound certificates has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 76
     *
     * @supported Chrome, Firefox
     */
    serverBoundCertificates?: boolean;
    /**
     * Stored passwords.
     *
     * @deprecated Support for password deletion through extensions has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 144
     *
     * @supported Chrome, Firefox
     */
    passwords?: boolean;
    /**
     * Plugins' data.
     *
     * @deprecated Support for Flash has been removed. This data type will be ignored.
     * @chrome-deprecated-since Chrome 88
     *
     * @supported Chrome, Firefox
     */
    pluginData?: boolean;
    /**
     * Service Workers.
     *
     * @supported Chrome, Firefox
     */
    serviceWorkers?: boolean;
    /**
     * Websites' WebSQL data.
     *
     * @deprecated Support for WebSQL has been removed. This data type will be ignored.
     *
     * @supported Chrome
     */
    webSQL?: boolean;
}
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
export type Algorithm = "RSASSA_PKCS1_v1_5_MD5_SHA1" | "RSASSA_PKCS1_v1_5_SHA1" | "RSASSA_PKCS1_v1_5_SHA256" | "RSASSA_PKCS1_v1_5_SHA384" | "RSASSA_PKCS1_v1_5_SHA512" | "RSASSA_PSS_SHA256" | "RSASSA_PSS_SHA384" | "RSASSA_PSS_SHA512";
/**
 * @supported Chrome
 */
export type Error = "GENERAL_ERROR";
/**
 * @supported Chrome
 */
export interface ClientCertificateInfo {
    /**
     * The array must contain the DER encoding of the X.509 client certificate as its first element.
     *
     * This must include exactly one certificate.
     *
     * @supported Chrome
     */
    certificateChain: ArrayBuffer[];
    /**
     * All algorithms supported for this certificate. The extension will only be asked for signatures using one of these algorithms.
     *
     * @supported Chrome
     */
    supportedAlgorithms: Algorithm[];
}
/**
 * @supported Chrome
 */
export interface SetCertificatesDetails {
    /**
     * When called in response to {@link onCertificatesUpdateRequested}, should contain the received `certificatesRequestId` value. Otherwise, should be unset.
     *
     * @supported Chrome
     */
    certificatesRequestId?: number;
    /**
     * Error that occurred while extracting the certificates, if any. This error will be surfaced to the user when appropriate.
     *
     * @supported Chrome
     */
    error?: Error;
    /**
     * List of currently available client certificates.
     *
     * @supported Chrome
     */
    clientCertificates: ClientCertificateInfo[];
}
/**
 * @supported Chrome
 */
export interface CertificatesUpdateRequest {
    /**
     * Request identifier to be passed to {@link setCertificates}.
     *
     * @supported Chrome
     */
    certificatesRequestId: number;
}
/**
 * @supported Chrome
 */
export interface SignatureRequest {
    /**
     * Request identifier to be passed to {@link reportSignature}.
     *
     * @supported Chrome
     */
    signRequestId: number;
    /**
     * Data to be signed. Note that the data is not hashed.
     *
     * @supported Chrome
     */
    input: ArrayBuffer;
    /**
     * Signature algorithm to be used.
     *
     * @supported Chrome
     */
    algorithm: Algorithm;
    /**
     * The DER encoding of a X.509 certificate. The extension must sign `input` using the associated private key.
     *
     * @supported Chrome
     */
    certificate: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface ReportSignatureDetails {
    /**
     * Request identifier that was received via the {@link onSignatureRequested} event.
     *
     * @supported Chrome
     */
    signRequestId: number;
    /**
     * Error that occurred while generating the signature, if any.
     *
     * @supported Chrome
     */
    error?: Error;
    /**
     * The signature, if successfully generated.
     *
     * @supported Chrome
     */
    signature?: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export type Hash = "MD5_SHA1" | "SHA1" | "SHA256" | "SHA384" | "SHA512";
/**
 * @supported Chrome
 */
export type PinRequestType = "PIN" | "PUK";
/**
 * @supported Chrome
 */
export type PinRequestErrorType = "INVALID_PIN" | "INVALID_PUK" | "MAX_ATTEMPTS_EXCEEDED" | "UNKNOWN_ERROR";
/**
 * @supported Chrome
 */
export interface CertificateInfo {
    /**
     * Must be the DER encoding of a X.509 certificate. Currently, only certificates of RSA keys are supported.
     *
     * @supported Chrome
     */
    certificate: ArrayBuffer;
    /**
     * Must be set to all hashes supported for this certificate. This extension will only be asked for signatures of digests calculated with one of these hash algorithms. This should be in order of decreasing hash preference.
     *
     * @supported Chrome
     */
    supportedHashes: Hash[];
}
/**
 * @supported Chrome
 */
export interface SignRequest {
    /**
     * The unique ID to be used by the extension should it need to call a method that requires it, e.g. requestPin.
     *
     * @since Chrome 57
     *
     * @supported Chrome
     */
    signRequestId: number;
    /**
     * The digest that must be signed.
     *
     * @supported Chrome
     */
    digest: ArrayBuffer;
    /**
     * Refers to the hash algorithm that was used to create `digest`.
     *
     * @supported Chrome
     */
    hash: Hash;
    /**
     * The DER encoding of a X.509 certificate. The extension must sign `digest` using the associated private key.
     *
     * @supported Chrome
     */
    certificate: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface RequestPinDetails {
    /**
     * The ID given by Chrome in SignRequest.
     *
     * @supported Chrome
     */
    signRequestId: number;
    /**
     * The type of code requested. Default is PIN.
     *
     * @supported Chrome
     */
    requestType?: PinRequestType;
    /**
     * The error template displayed to the user. This should be set if the previous request failed, to notify the user of the failure reason.
     *
     * @supported Chrome
     */
    errorType?: PinRequestErrorType;
    /**
     * The number of attempts left. This is provided so that any UI can present this information to the user. Chrome is not expected to enforce this, instead stopPinRequest should be called by the extension with errorType = MAX\_ATTEMPTS\_EXCEEDED when the number of pin requests is exceeded.
     *
     * @supported Chrome
     */
    attemptsLeft?: number;
}
/**
 * @supported Chrome
 */
export interface StopPinRequestDetails {
    /**
     * The ID given by Chrome in SignRequest.
     *
     * @supported Chrome
     */
    signRequestId: number;
    /**
     * The error template. If present it is displayed to user. Intended to contain the reason for stopping the flow if it was caused by an error, e.g. MAX\_ATTEMPTS\_EXCEEDED.
     *
     * @supported Chrome
     */
    errorType?: PinRequestErrorType;
}
/**
 * @supported Chrome
 */
export interface PinResponseDetails {
    /**
     * The code provided by the user. Empty if user closed the dialog or some other error occurred.
     *
     * @supported Chrome
     */
    userInput?: string;
}
/**
 * @supported Chrome
 */
export const onCertificatesUpdateRequested: events.Event<(
      request: CertificatesUpdateRequest,
    ) => void>;
/**
 * @supported Chrome
 */
export const onSignatureRequested: events.Event<(
      request: SignatureRequest,
    ) => void>;
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
    /**
     * Override for the chrome://newtab page.
     *
     * @supported Chrome
     */
    newtab?: string;
    /**
     * Override for the chrome://bookmarks page.
     *
     * @supported Chrome
     */
    bookmarks?: string;
    /**
     * Override for the chrome://history page.
     *
     * @supported Chrome
     */
    history?: string;
    /** @supported Chrome */
    activationmessage?: string;
    /** @supported Chrome */
    keyboard?: string;
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
    name?: string;
    /**
     * The Extension Command description
     *
     * @supported Chrome, Firefox
     */
    description?: string;
    /**
     * The shortcut active for this command, or blank if not active.
     *
     * @supported Chrome, Firefox
     */
    shortcut?: string;
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
 * @supported Chrome
 */
export function getAll(

      callback?: (
        commands: Command[],
      ) => void,
    ): void;

}

export namespace contentScripts {
/**
 * @supported Chrome
 */
export interface ContentScript {
    /**
     * Specifies which pages this content script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome
     */
    matches: string[];
    /**
     * Excludes pages that this content script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome
     */
    exclude_matches?: string[];
    /**
     * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
     *
     * @supported Chrome
     */
    css?: string[];
    /**
     * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
     *
     * @supported Chrome
     */
    js?: string[];
    /**
     * If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
     *
     * @supported Chrome
     */
    all_frames?: boolean;
    /**
     * Whether the script should inject into any frames where the URL belongs to a scheme that would never match a specified Match Pattern, including about:, data:, blob:, and filesystem: schemes. In these cases, in order to determine if the script should inject, the origin of the URL is checked. If the origin is `null` (as is the case for data: URLs), then the "initiator" or "creator" origin is used (i.e., the origin of the frame that created or navigated this frame). Note that this may not be the parent frame, if the frame was navigated by another frame in the document hierarchy.
     *
     * @since Chrome 99
     *
     * @supported Chrome
     */
    match_origin_as_fallback?: boolean;
    /**
     * Whether the script should inject into an about:blank frame where the parent or opener frame matches one of the patterns declared in matches. Defaults to false.
     *
     * @supported Chrome
     */
    match_about_blank?: boolean;
    /**
     * Applied after matches to include only those URLs that also match this glob. Intended to emulate the [@include](https://wiki.greasespot.net/Metadata_Block#.40include) Greasemonkey keyword.
     *
     * @supported Chrome
     */
    include_globs?: string[];
    /**
     * Applied after matches to exclude URLs that match this glob. Intended to emulate the [@exclude](https://wiki.greasespot.net/Metadata_Block#.40exclude) Greasemonkey keyword.
     *
     * @supported Chrome
     */
    exclude_globs?: string[];
    /**
     * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
     *
     * @supported Chrome
     */
    run_at?: extensionTypes.RunAt;
    /**
     * The JavaScript "world" to run the script in. Defaults to `ISOLATED`. Only available in Manifest V3 extensions.
     *
     * @since Chrome 111
     *
     * @supported Chrome
     */
    world?: extensionTypes.ExecutionWorld;
}

}

export namespace contentSettings {
/**
 * @supported Chrome
 */
export interface ResourceIdentifier {
    /**
     * The resource identifier for the given content type.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * A human readable description of the resource.
     *
     * @supported Chrome
     */
    description?: string;
}
/**
 * @supported Chrome
 */
export type Scope = "regular" | "incognito_session_only";
/**
 * @supported Chrome
 */
export interface ContentSetting<T> {
    /**
     * Clear all content setting rules set by this extension.
     *
     * @chrome-returns-extra since Chrome 96
     *
     * @supported Chrome
     */
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },
      ): Promise<void>;
    /**
     * Clear all content setting rules set by this extension.
     *
     * @supported Chrome
     */
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },

        callback?: () => void,
      ): void;
    /**
     * Gets the current content setting for a given pair of URLs.
     *
     * @chrome-returns-extra since Chrome 96
     *
     * @supported Chrome
     */
    get(

        details: {

          /**
           * The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type.
           */
          primaryUrl: string,

          /**
           * The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.
           */
          secondaryUrl?: string,

          /**
           * A more specific identifier of the type of content for which the settings should be retrieved.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * Whether to check the content settings for an incognito session. (default false)
           */
          incognito?: boolean,
        },
      ): Promise<{

        /**
         * The content setting. See the description of the individual ContentSetting objects for the possible values.
         */
        setting: T,
      }>;
    /**
     * Gets the current content setting for a given pair of URLs.
     *
     * @supported Chrome
     */
    get(

        details: {

          /**
           * The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type.
           */
          primaryUrl: string,

          /**
           * The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.
           */
          secondaryUrl?: string,

          /**
           * A more specific identifier of the type of content for which the settings should be retrieved.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * Whether to check the content settings for an incognito session. (default false)
           */
          incognito?: boolean,
        },

        callback?: (
          details: {

            /**
             * The content setting. See the description of the individual ContentSetting objects for the possible values.
             */
            setting: T,
          },
        ) => void,
      ): void;
    /**
     * Applies a new content setting rule.
     *
     * @chrome-returns-extra since Chrome 96
     *
     * @supported Chrome
     */
    set(

        details: {

          /**
           * The pattern for the primary URL. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          secondaryPattern?: string,

          /**
           * The resource identifier for the content type.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values.
           */
          setting: /* TODO: Upstream type uses any */ any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: Scope,
        },
      ): Promise<void>;
    /**
     * Applies a new content setting rule.
     *
     * @supported Chrome
     */
    set(

        details: {

          /**
           * The pattern for the primary URL. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          secondaryPattern?: string,

          /**
           * The resource identifier for the content type.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values.
           */
          setting: /* TODO: Upstream type uses any */ any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: Scope,
        },

        callback?: () => void,
      ): void;
    /**
     * @chrome-returns-extra since Chrome 96
     *
     * @supported Chrome
     */
    getResourceIdentifiers(): Promise<ResourceIdentifier[] | undefined>;
    /** @supported Chrome */
    getResourceIdentifiers(

        /**
         * @param resourceIdentifiers A list of resource identifiers for this content type, or `undefined` if this content type does not use resource identifiers.
         */
        callback?: (
          resourceIdentifiers?: ResourceIdentifier[],
        ) => void,
      ): void;
}
/**
 * @supported Chrome
 */
export type AutoVerifyContentSetting = "allow" | "block";
/**
 * @supported Chrome
 */
export type ClipboardContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type CookiesContentSetting = "allow" | "block" | "session_only";
/**
 * @supported Chrome
 */
export type ImagesContentSetting = "allow" | "block";
/**
 * @supported Chrome
 */
export type JavascriptContentSetting = "allow" | "block";
/**
 * @supported Chrome
 */
export type LocationContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type PluginsContentSetting = "block";
/**
 * @supported Chrome
 */
export type PopupsContentSetting = "allow" | "block";
/**
 * @supported Chrome
 */
export type NotificationsContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type FullscreenContentSetting = "allow";
/**
 * @supported Chrome
 */
export type MouselockContentSetting = "allow";
/**
 * @supported Chrome
 */
export type MicrophoneContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type CameraContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type PpapiBrokerContentSetting = "block";
/**
 * @supported Chrome
 */
export type MultipleAutomaticDownloadsContentSetting = "allow" | "block" | "ask";
/**
 * @supported Chrome
 */
export type SoundContentSetting = "allow" | "block";
/**
 * @supported Chrome
 */
export const autoVerify: ContentSetting<AutoVerifyContentSetting>;
/**
 * @supported Chrome
 */
export const cookies: ContentSetting<CookiesContentSetting>;
/**
 * @supported Chrome
 */
export const images: ContentSetting<ImagesContentSetting>;
/**
 * @supported Chrome
 */
export const javascript: ContentSetting<JavascriptContentSetting>;
/**
 * @supported Chrome
 */
export const location: ContentSetting<LocationContentSetting>;
/**
 * @supported Chrome
 */
export const plugins: ContentSetting<PluginsContentSetting>;
/**
 * @supported Chrome
 */
export const popups: ContentSetting<PopupsContentSetting>;
/**
 * @supported Chrome
 */
export const notifications: ContentSetting<NotificationsContentSetting>;
/**
 * @supported Chrome
 */
export const fullscreen: ContentSetting<FullscreenContentSetting>;
/**
 * @supported Chrome
 */
export const mouselock: ContentSetting<MouselockContentSetting>;
/**
 * @supported Chrome
 */
export const microphone: ContentSetting<MicrophoneContentSetting>;
/**
 * @supported Chrome
 */
export const clipboard: ContentSetting<ClipboardContentSetting>;
/**
 * @supported Chrome
 */
export const camera: ContentSetting<CameraContentSetting>;
/**
 * @supported Chrome
 */
export const unsandboxedPlugins: ContentSetting<PpapiBrokerContentSetting>;
/**
 * @supported Chrome
 */
export const automaticDownloads: ContentSetting<MultipleAutomaticDownloadsContentSetting>;

}

export namespace contextMenus {
/**
 * @supported Chrome, Firefox
 */
export type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action" | "action" | "tab";
/**
 * @supported Chrome, Firefox
 */
export type ItemType = "normal" | "checkbox" | "radio" | "separator";
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
    parentMenuItemId?: number | string;
    /**
     * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
     *
     * @supported Chrome, Firefox
     */
    mediaType?: string;
    /**
     * If the element is a link, the URL it points to.
     *
     * @supported Chrome, Firefox
     */
    linkUrl?: string;
    /**
     * Will be present for elements with a 'src' URL.
     *
     * @supported Chrome, Firefox
     */
    srcUrl?: string;
    /**
     * The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
     *
     * @supported Chrome, Firefox
     */
    pageUrl?: string;
    /**
     * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
     *
     * @supported Chrome, Firefox
     */
    frameUrl?: string;
    /**
     * The [ID of the frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) of the element where the context menu was clicked, if it was in a frame.
     *
     * @since Chrome 51
     *
     * @supported Chrome, Firefox
     */
    frameId?: number;
    /**
     * The text for the context selection, if any.
     *
     * @supported Chrome, Firefox
     */
    selectionText?: string;
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
    wasChecked?: boolean;
    /**
     * A flag indicating the state of a checkbox or radio item after it is clicked.
     *
     * @supported Chrome, Firefox
     */
    checked?: boolean;
}
/**
 * @supported Chrome
 */
export interface CreateProperties {
    /**
     * The type of menu item. Defaults to `normal`.
     *
     * @supported Chrome
     */
    type?: ItemType;
    /**
     * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
     *
     * @supported Chrome
     */
    id?: string;
    /**
     * The text to display in the item; this is _required_ unless `type` is `separator`. When the context is `selection`, use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
     *
     * @supported Chrome
     */
    title?: string;
    /**
     * The initial state of a checkbox or radio button: `true` for selected, `false` for unselected. Only one radio button can be selected at a time in a given group.
     *
     * @supported Chrome
     */
    checked?: boolean;
    /**
     * List of contexts this menu item will appear in. Defaults to `['page']`.
     *
     * @supported Chrome
     */
    contexts?: [ContextType, ...ContextType[]];
    /**
     * Whether the item is visible in the menu.
     *
     * @supported Chrome
     */
    visible?: boolean;
    /**
     * A function that is called back when the menu item is clicked. This is not available inside of a service worker; instead, you should register a listener for {@link contextMenus.onClicked}.
     *
     * @param info Information about the item clicked and the context where the click happened.
     * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
     *
     * @supported Chrome
     */
    onclick?(info: OnClickData, tab: tabs.Tab): void;
    /**
     * The ID of a parent menu item; this makes the item a child of a previously added item.
     *
     * @supported Chrome
     */
    parentId?: number | string;
    /**
     * Restricts the item to apply only to documents or frames whose URL matches one of the given patterns. For details on pattern formats, see [Match Patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns).
     *
     * @supported Chrome
     */
    documentUrlPatterns?: string[];
    /**
     * Similar to `documentUrlPatterns`, filters based on the `src` attribute of `img`, `audio`, and `video` tags and the `href` attribute of `a` tags.
     *
     * @supported Chrome
     */
    targetUrlPatterns?: string[];
    /**
     * Whether this context menu item is enabled or disabled. Defaults to `true`.
     *
     * @supported Chrome
     */
    enabled?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: 6;
/**
 * @supported Chrome, Firefox
 */
export const onClicked: events.Event<(
      info: OnClickData,
      tab?: tabs.Tab,
    ) => void>;
/**
 * @supported Chrome
 */
export function create(

      createProperties: CreateProperties,

      callback?: () => void,
    ): number | string;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export type SameSiteStatus = "no_restriction" | "lax" | "strict" | "unspecified";
/**
 * @supported Chrome
 */
export interface CookiePartitionKey {
    /**
     * The top-level site the partitioned cookie is available in.
     *
     * @supported Chrome
     */
    topLevelSite?: string;
    /**
     * Indicates if the cookie was set in a cross-cross site context. This prevents a top-level site embedded in a cross-site context from accessing cookies set by the top-level site in a same-site context.
     *
     * @since Chrome 130
     *
     * @supported Chrome
     */
    hasCrossSiteAncestor?: boolean;
}
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
    expirationDate?: number;
    /**
     * The ID of the cookie store containing this cookie, as provided in getAllCookieStores().
     *
     * @supported Chrome, Firefox
     */
    storeId: string;
    /** @supported Chrome, Firefox */
    partitionKey?: CookiePartitionKey;
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
}
/**
 * @supported Chrome, Firefox
 */
export type OnChangedCause = "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite";
/**
 * @supported Chrome
 */
export interface CookieDetails {
    /**
     * The URL with which the cookie to access is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The name of the cookie to access.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.
     *
     * @supported Chrome
     */
    storeId?: string;
    /**
     * The partition key for reading or modifying cookies with the Partitioned attribute.
     *
     * @since Chrome 119
     *
     * @supported Chrome
     */
    partitionKey?: CookiePartitionKey;
}
/**
 * @supported Chrome
 */
export interface FrameDetails {
    /**
     * The unique identifier for the tab containing the frame.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The unique identifier for the frame within the tab.
     *
     * @supported Chrome
     */
    frameId?: number;
    /**
     * The unique identifier for the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
     *
     * @supported Chrome
     */
    documentId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<(changeInfo: { removed: boolean; cookie: Cookie; cause: OnChangedCause }) => void>;
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
 * @supported Chrome, Firefox
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

}

export namespace crossOriginIsolation {
/**
 * @supported Chrome
 */
export interface ResponseHeader {
    /** @supported Chrome */
    value?: string;
}

}

export namespace _debugger {
/**
 * @supported Chrome
 */
export interface Debuggee {
    /**
     * The id of the tab which you intend to debug.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.
     *
     * @supported Chrome
     */
    extensionId?: string;
    /**
     * The opaque id of the debug target.
     *
     * @supported Chrome
     */
    targetId?: string;
}
/**
 * @supported Chrome
 */
export interface DebuggerSession {
    /**
     * The id of the tab which you intend to debug.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.
     *
     * @supported Chrome
     */
    extensionId?: string;
    /**
     * The opaque id of the debug target.
     *
     * @supported Chrome
     */
    targetId?: string;
    /**
     * The opaque id of the Chrome DevTools Protocol session. Identifies a child session within the root session identified by tabId, extensionId or targetId.
     *
     * @supported Chrome
     */
    sessionId?: string;
}
/**
 * @supported Chrome
 */
export type TargetInfoType = "page" | "background_page" | "worker" | "other";
/**
 * @supported Chrome
 */
export type DetachReason = "target_closed" | "canceled_by_user";
/**
 * @supported Chrome
 */
export interface TargetInfo {
    /**
     * Target type.
     *
     * @supported Chrome
     */
    type: TargetInfoType;
    /**
     * Target id.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The tab id, defined if type == 'page'.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The extension id, defined if type = 'background\_page'.
     *
     * @supported Chrome
     */
    extensionId?: string;
    /**
     * True if debugger is already attached.
     *
     * @supported Chrome
     */
    attached: boolean;
    /**
     * Target page title.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Target URL.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * Target favicon URL.
     *
     * @supported Chrome
     */
    faviconUrl?: string;
}
/**
 * @supported Chrome
 */
export const onEvent: events.Event<(
      source: DebuggerSession,
      method: string,
      params?: {[name: string]: /* TODO: Upstream type uses any */ any},
    ) => void>;
/**
 * @supported Chrome
 */
export const onDetach: events.Event<(
      source: Debuggee,
      reason: DetachReason,
    ) => void>;
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

export namespace declarativeContent {
/**
 * @supported Chrome
 */
export type ImageDataType = ImageData;
/**
 * @supported Chrome
 */
export class PageStateMatcher {
      constructor(arg: PageStateMatcher);

      /**
       * Matches if the conditions of the `UrlFilter` are fulfilled for the top-level URL of the page.
       */
      pageUrl?: events.UrlFilter;

      /**
       * Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be [compound selectors](https://www.w3.org/TR/selectors4/#compound) to speed up matching. Note: Listing hundreds of CSS selectors or listing CSS selectors that match hundreds of times per page can slow down web sites.
       */
      css?: string[];

      /**
       * Matches if the bookmarked state of the page is equal to the specified value. Requres the [bookmarks permission](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).
       *
       * @since Chrome 45
       */
      isBookmarked?: boolean;
    }
/**
 * @supported Chrome
 */
export class ShowPageAction {
      constructor(arg: ShowPageAction);
    }
/**
 * @supported Chrome
 */
export class ShowAction {
      constructor(arg: ShowAction);
    }
/**
 * @supported Chrome
 */
export class SetIcon {
      constructor(arg: SetIcon);

      /**
       * Either an `ImageData` object or a dictionary {size -> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale * n` is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that `details.imageData = foo` is equivalent to `details.imageData = {'16': foo}`.
       */
      imageData?: ImageDataType | {[name: string]: /* TODO: Upstream type uses any */ any};
    }
/**
 * @supported Chrome
 */
export class RequestContentScript {
      constructor(arg: RequestContentScript);

      /**
       * Names of CSS files to be injected as a part of the content script.
       */
      css?: string[];

      /**
       * Names of JavaScript files to be injected as a part of the content script.
       */
      js?: string[];

      /**
       * Whether the content script runs in all frames of the matching page, or in only the top frame. Default is `false`.
       */
      allFrames?: boolean;

      /**
       * Whether to insert the content script on `about:blank` and `about:srcdoc`. Default is `false`.
       */
      matchAboutBlank?: boolean;
    }
/**
 * @supported Chrome
 */
export const onPageChanged: events.Event<never, PageStateMatcher, RequestContentScript | SetIcon | ShowPageAction | ShowAction>;

}

export namespace declarativeNetRequest {
/**
 * @supported Chrome, Firefox
 */
export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webtransport" | "webbundle" | "other";
/**
 * @supported Chrome
 */
export type RequestMethod = "connect" | "delete" | "get" | "head" | "options" | "patch" | "post" | "put" | "other";
/**
 * @supported Chrome
 */
export type DomainType = "firstParty" | "thirdParty";
/**
 * @supported Chrome
 */
export type HeaderOperation = "append" | "set" | "remove";
/**
 * @supported Chrome
 */
export type RuleActionType = "block" | "redirect" | "allow" | "upgradeScheme" | "modifyHeaders" | "allowAllRequests";
/**
 * @supported Chrome, Firefox
 */
export type UnsupportedRegexReason = "syntaxError" | "memoryLimitExceeded";
/**
 * @supported Chrome
 */
export type RuleConditionKeys = "urlFilter" | "regexFilter" | "isUrlFilterCaseSensitive" | "initiatorDomains" | "excludedInitiatorDomains" | "requestDomains" | "excludedRequestDomains" | "topDomains" | "excludedTopDomains" | "domains" | "excludedDomains" | "resourceTypes" | "excludedResourceTypes" | "requestMethods" | "excludedRequestMethods" | "domainType" | "tabIds" | "excludedTabIds" | "responseHeaders" | "excludedResponseHeaders";
/**
 * @supported Chrome
 */
export interface Ruleset {
    /**
     * A non-empty string uniquely identifying the ruleset. IDs beginning with '\_' are reserved for internal use.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The path of the JSON ruleset relative to the extension directory.
     *
     * @supported Chrome
     */
    path: string;
    /**
     * Whether the ruleset is enabled by default.
     *
     * @supported Chrome
     */
    enabled: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryKeyValue {
    /** @supported Chrome */
    key: string;
    /** @supported Chrome */
    value: string;
    /**
     * If true, the query key is replaced only if it's already present. Otherwise, the key is also added if it's missing. Defaults to false.
     *
     * @since Chrome 94
     *
     * @supported Chrome
     */
    replaceOnly?: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryTransform {
    /**
     * The list of query keys to be removed.
     *
     * @supported Chrome
     */
    removeParams?: string[];
    /**
     * The list of query key-value pairs to be added or replaced.
     *
     * @supported Chrome
     */
    addOrReplaceParams?: QueryKeyValue[];
}
/**
 * @supported Chrome, Firefox
 */
export interface URLTransform {
    /**
     * The new scheme for the request. Allowed values are "http", "https", "ftp" and "chrome-extension".
     *
     * @supported Chrome, Firefox
     */
    scheme?: string;
    /**
     * The new host for the request.
     *
     * @supported Chrome, Firefox
     */
    host?: string;
    /**
     * The new port for the request. If empty, the existing port is cleared.
     *
     * @supported Chrome, Firefox
     */
    port?: string;
    /**
     * The new path for the request. If empty, the existing path is cleared.
     *
     * @supported Chrome, Firefox
     */
    path?: string;
    /**
     * The new query for the request. Should be either empty, in which case the existing query is cleared; or should begin with '?'.
     *
     * @supported Chrome, Firefox
     */
    query?: string;
    /**
     * Add, remove or replace query key-value pairs.
     *
     * @supported Chrome, Firefox
     */
    queryTransform?: QueryTransform;
    /**
     * The new fragment for the request. Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
     *
     * @supported Chrome, Firefox
     */
    fragment?: string;
    /**
     * The new username for the request.
     *
     * @supported Chrome, Firefox
     */
    username?: string;
    /**
     * The new password for the request.
     *
     * @supported Chrome, Firefox
     */
    password?: string;
}
/**
 * @supported Chrome
 */
export interface Redirect {
    /**
     * Path relative to the extension directory. Should start with '/'.
     *
     * @supported Chrome
     */
    extensionPath?: string;
    /**
     * Url transformations to perform.
     *
     * @supported Chrome
     */
    transform?: URLTransform;
    /**
     * The redirect url. Redirects to JavaScript urls are not allowed.
     *
     * @supported Chrome
     */
    url?: string;
    /**
     * Substitution pattern for rules which specify a `regexFilter`. The first match of `regexFilter` within the url will be replaced with this pattern. Within `regexSubstitution`, backslash-escaped digits (\\1 to \\9) can be used to insert the corresponding capture groups. \\0 refers to the entire matching text.
     *
     * @supported Chrome
     */
    regexSubstitution?: string;
}
/**
 * @supported Chrome
 */
export interface HeaderInfo {
    /**
     * The name of the header. This condition matches on the name only if both `values` and `excludedValues` are not specified.
     *
     * @supported Chrome
     */
    header: string;
    /**
     * If specified, this condition matches if the header's value matches at least one pattern in this list. This supports case-insensitive header value matching plus the following constructs:
     *
     * **'\*'** : Matches any number of characters.
     *
     * **'?'** : Matches zero or one character(s).
     *
     * '\*' and '?' can be escaped with a backslash, e.g. '\\\*' and '\\?'
     *
     * @supported Chrome
     */
    values?: string[];
    /**
     * If specified, this condition is not matched if the header exists but its value contains at least one element in this list. This uses the same match pattern syntax as `values`.
     *
     * @supported Chrome
     */
    excludedValues?: string[];
}
/**
 * @supported Chrome
 */
export interface RuleCondition {
    /**
     * The pattern which is matched against the network request url. Supported constructs:
     *
     * **'\*'** : Wildcard: Matches any number of characters.
     *
     * **'|'** : Left/right anchor: If used at either end of the pattern, specifies the beginning/end of the url respectively.
     *
     * **'||'** : Domain name anchor: If used at the beginning of the pattern, specifies the start of a (sub-)domain of the URL.
     *
     * **'^'** : Separator character: This matches anything except a letter, a digit, or one of the following: `_`, `-`, `.`, or `%`. This also match the end of the URL.
     *
     * Therefore `urlFilter` is composed of the following parts: (optional Left/Domain name anchor) + pattern + (optional Right anchor).
     *
     * If omitted, all urls are matched. An empty string is not allowed.
     *
     * A pattern beginning with `||*` is not allowed. Use `*` instead.
     *
     * Note: Only one of `urlFilter` or `regexFilter` can be specified.
     *
     * Note: The `urlFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8. For example, when the request url is http://abc.рф?q=ф, the `urlFilter` will be matched against the url http://abc.xn--p1ai/?q=%D1%84.
     *
     * @supported Chrome
     */
    urlFilter?: string;
    /**
     * Regular expression to match against the network request url. This follows the [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
     *
     * Note: Only one of `urlFilter` or `regexFilter` can be specified.
     *
     * Note: The `regexFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
     *
     * @supported Chrome
     */
    regexFilter?: string;
    /**
     * Whether the `urlFilter` or `regexFilter` (whichever is specified) is case sensitive. Default is false.
     *
     * @supported Chrome
     */
    isUrlFilterCaseSensitive?: boolean;
    /**
     * The rule will only match network requests originating from the list of `initiatorDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   This matches against the request initiator and not the request url.
     * *   Sub-domains of the listed domains are also matched.
     *
     * @since Chrome 101
     *
     * @supported Chrome
     */
    initiatorDomains?: string[];
    /**
     * The rule will not match network requests originating from the list of `excludedInitiatorDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `initiatorDomains`.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   This matches against the request initiator and not the request url.
     * *   Sub-domains of the listed domains are also excluded.
     *
     * @since Chrome 101
     *
     * @supported Chrome
     */
    excludedInitiatorDomains?: string[];
    /**
     * The rule will only match network requests when the domain matches one from the list of `requestDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   Sub-domains of the listed domains are also matched.
     *
     * @since Chrome 101
     *
     * @supported Chrome
     */
    requestDomains?: string[];
    /**
     * The rule will not match network requests when the domains matches one from the list of `excludedRequestDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `requestDomains`.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   Sub-domains of the listed domains are also excluded.
     *
     * @since Chrome 101
     *
     * @supported Chrome
     */
    excludedRequestDomains?: string[];
    /**
     * The rule will only match network requests when the associated top-level frame's domain matches one from the list of `topDomains`. If the list is omitted, the rule is applied to requests associated with all top-level frame domains. An empty list is not allowed.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   Sub-domains of the listed domains are also matched.
     * *   For requests with no associated top-level frame (e.g. ServiceWorker initiated requests, the request initiator's domain is considered instead.
     *
     * @since Chrome 145
     *
     * @supported Chrome
     */
    topDomains?: string[];
    /**
     * The rule will not match network requests when the associated top-level frame's domain matches one from the list of `excludedTopDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `topDomains`.
     *
     * Notes:
     *
     * *   Sub-domains like "a.example.com" are also allowed.
     * *   The entries must consist of only ascii characters.
     * *   Use punycode encoding for internationalized domains.
     * *   Sub-domains of the listed domains are also excluded.
     * *   For requests with no associated top-level frame (e.g. ServiceWorker initiated requests, the request initiator's domain is considered instead.
     *
     * @since Chrome 145
     *
     * @supported Chrome
     */
    excludedTopDomains?: string[];
    /**
     * The rule will only match network requests originating from the list of `domains`.
     *
     * @deprecated Use {@link initiatorDomains} instead
     * @chrome-deprecated-since Chrome 101
     *
     * @supported Chrome
     */
    domains?: string[];
    /**
     * The rule will not match network requests originating from the list of `excludedDomains`.
     *
     * @deprecated Use {@link excludedInitiatorDomains} instead
     * @chrome-deprecated-since Chrome 101
     *
     * @supported Chrome
     */
    excludedDomains?: string[];
    /**
     * List of resource types which the rule can match. An empty list is not allowed.
     *
     * Note: this must be specified for `allowAllRequests` rules and may only include the `sub_frame` and `main_frame` resource types.
     *
     * @supported Chrome
     */
    resourceTypes?: ResourceType[];
    /**
     * List of resource types which the rule won't match. Only one of `resourceTypes` and `excludedResourceTypes` should be specified. If neither of them is specified, all resource types except "main\_frame" are blocked.
     *
     * @supported Chrome
     */
    excludedResourceTypes?: ResourceType[];
    /**
     * List of HTTP request methods which the rule can match. An empty list is not allowed.
     *
     * Note: Specifying a `requestMethods` rule condition will also exclude non-HTTP(s) requests, whereas specifying `excludedRequestMethods` will not.
     *
     * @since Chrome 91
     *
     * @supported Chrome
     */
    requestMethods?: RequestMethod[];
    /**
     * List of request methods which the rule won't match. Only one of `requestMethods` and `excludedRequestMethods` should be specified. If neither of them is specified, all request methods are matched.
     *
     * @since Chrome 91
     *
     * @supported Chrome
     */
    excludedRequestMethods?: RequestMethod[];
    /**
     * Specifies whether the network request is first-party or third-party to the domain from which it originated. If omitted, all requests are accepted.
     *
     * @supported Chrome
     */
    domainType?: DomainType;
    /**
     * List of {@link tabs.Tab.id} which the rule should match. An ID of {@link tabs.TAB_ID_NONE} matches requests which don't originate from a tab. An empty list is not allowed. Only supported for session-scoped rules.
     *
     * @since Chrome 92
     *
     * @supported Chrome
     */
    tabIds?: number[];
    /**
     * List of {@link tabs.Tab.id} which the rule should not match. An ID of {@link tabs.TAB_ID_NONE} excludes requests which don't originate from a tab. Only supported for session-scoped rules.
     *
     * @since Chrome 92
     *
     * @supported Chrome
     */
    excludedTabIds?: number[];
    /**
     * Rule matches if the request matches any response header condition in this list (if specified).
     *
     * @since Chrome 128
     *
     * @supported Chrome
     */
    responseHeaders?: HeaderInfo[];
    /**
     * Rule does not match if the request matches any response header condition in this list (if specified). If both `excludedResponseHeaders` and `responseHeaders` are specified, then the `excludedResponseHeaders` property takes precedence.
     *
     * @since Chrome 128
     *
     * @supported Chrome
     */
    excludedResponseHeaders?: HeaderInfo[];
}
/**
 * @supported Chrome
 */
export interface ModifyHeaderInfo {
    /**
     * The name of the header to be modified.
     *
     * @supported Chrome
     */
    header: string;
    /**
     * The operation to be performed on a header.
     *
     * @supported Chrome
     */
    operation: HeaderOperation;
    /**
     * The new value for the header. Must be specified for `append` and `set` operations.
     *
     * @supported Chrome
     */
    value?: string;
}
/**
 * @supported Chrome
 */
export interface RuleAction {
    /**
     * The type of action to perform.
     *
     * @supported Chrome
     */
    type: RuleActionType;
    /**
     * Describes how the redirect should be performed. Only valid for redirect rules.
     *
     * @supported Chrome
     */
    redirect?: Redirect;
    /**
     * The request headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
     *
     * @since Chrome 86
     *
     * @supported Chrome
     */
    requestHeaders?: ModifyHeaderInfo[];
    /**
     * The response headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
     *
     * @since Chrome 86
     *
     * @supported Chrome
     */
    responseHeaders?: ModifyHeaderInfo[];
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
    priority?: number;
    /**
     * The condition under which this rule is triggered.
     *
     * @supported Chrome, Firefox
     */
    condition: RuleCondition;
    /**
     * The action to take if this rule is matched.
     *
     * @supported Chrome, Firefox
     */
    action: RuleAction;
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
    ruleIds?: number[];
}
/**
 * @supported Chrome
 */
export interface MatchedRuleInfo {
    /** @supported Chrome */
    rule: MatchedRule;
    /**
     * The time the rule was matched. Timestamps will correspond to the Javascript convention for times, i.e. number of milliseconds since the epoch.
     *
     * @supported Chrome
     */
    timeStamp: number;
    /**
     * The tabId of the tab from which the request originated if the tab is still active. Else -1.
     *
     * @supported Chrome
     */
    tabId: number;
}
/**
 * @supported Chrome
 */
export interface MatchedRulesFilter {
    /**
     * If specified, only matches rules for the given tab. Matches rules not associated with any active tab if set to -1.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * If specified, only matches rules after the given timestamp.
     *
     * @supported Chrome
     */
    minTimeStamp?: number;
}
/**
 * @supported Chrome
 */
export interface RulesMatchedDetails {
    /**
     * Rules matching the given filter.
     *
     * @supported Chrome
     */
    rulesMatchedInfo: MatchedRuleInfo[];
}
/**
 * @supported Chrome
 */
export interface RequestDetails {
    /**
     * The ID of the request. Request IDs are unique within a browser session.
     *
     * @supported Chrome
     */
    requestId: string;
    /**
     * The URL of the request.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
     *
     * @supported Chrome
     */
    initiator?: string;
    /**
     * Standard HTTP method.
     *
     * @supported Chrome
     */
    method: string;
    /**
     * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
     *
     * @supported Chrome
     */
    frameId: number;
    /**
     * The unique identifier for the frame's document, if this request is for a frame.
     *
     * @since Chrome 106
     *
     * @supported Chrome
     */
    documentId?: string;
    /**
     * The type of the frame, if this request is for a frame.
     *
     * @since Chrome 106
     *
     * @supported Chrome
     */
    frameType?: extensionTypes.FrameType;
    /**
     * The lifecycle of the frame's document, if this request is for a frame.
     *
     * @since Chrome 106
     *
     * @supported Chrome
     */
    documentLifecycle?: extensionTypes.DocumentLifecycle;
    /**
     * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
     *
     * @supported Chrome
     */
    parentFrameId: number;
    /**
     * The unique identifier for the frame's parent document, if this request is for a frame and has a parent.
     *
     * @since Chrome 106
     *
     * @supported Chrome
     */
    parentDocumentId?: string;
    /**
     * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
     *
     * @supported Chrome
     */
    tabId: number;
    /**
     * The resource type of the request.
     *
     * @supported Chrome
     */
    type: ResourceType;
}
/**
 * @supported Chrome
 */
export interface TestMatchRequestDetails {
    /**
     * The URL of the hypothetical request.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The initiator URL (if any) for the hypothetical request.
     *
     * @supported Chrome
     */
    initiator?: string;
    /**
     * Standard HTTP method of the hypothetical request. Defaults to "get" for HTTP requests and is ignored for non-HTTP requests.
     *
     * @supported Chrome
     */
    method?: RequestMethod;
    /**
     * The resource type of the hypothetical request.
     *
     * @supported Chrome
     */
    type: ResourceType;
    /**
     * The ID of the tab in which the hypothetical request takes place. Does not need to correspond to a real tab ID. Default is -1, meaning that the request isn't related to a tab.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The associated top-level frame URL (if any) for the request.
     *
     * @since Chrome 145
     *
     * @supported Chrome
     */
    topUrl?: string;
    /**
     * The headers provided by a hypothetical response if the request does not get blocked or redirected before it is sent. Represented as an object which maps a header name to a list of string values. If not specified, the hypothetical response would return empty response headers, which can match rules which match on the non-existence of headers. E.g. `{"content-type": ["text/html; charset=utf-8", "multipart/form-data"]}`
     *
     * @since Chrome 129
     *
     * @supported Chrome
     */
    responseHeaders?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface MatchedRuleInfoDebug {
    /** @supported Chrome */
    rule: MatchedRule;
    /**
     * Details about the request for which the rule was matched.
     *
     * @supported Chrome
     */
    request: RequestDetails;
}
/**
 * @supported Chrome
 */
export interface RegexOptions {
    /**
     * The regular expresson to check.
     *
     * @supported Chrome
     */
    regex: string;
    /**
     * Whether the `regex` specified is case sensitive. Default is true.
     *
     * @supported Chrome
     */
    isCaseSensitive?: boolean;
    /**
     * Whether the `regex` specified requires capturing. Capturing is only required for redirect rules which specify a `regexSubstition` action. The default is false.
     *
     * @supported Chrome
     */
    requireCapturing?: boolean;
}
/**
 * @supported Chrome
 */
export interface IsRegexSupportedResult {
    /** @supported Chrome */
    isSupported: boolean;
    /**
     * Specifies the reason why the regular expression is not supported. Only provided if `isSupported` is false.
     *
     * @supported Chrome
     */
    reason?: UnsupportedRegexReason;
}
/**
 * @supported Chrome
 */
export interface TestMatchOutcomeResult {
    /**
     * The rules (if any) that match the hypothetical request.
     *
     * @supported Chrome
     */
    matchedRules: MatchedRule[];
}
/**
 * @supported Chrome
 */
export interface UpdateRuleOptions {
    /**
     * IDs of the rules to remove. Any invalid IDs will be ignored.
     *
     * @supported Chrome
     */
    removeRuleIds?: number[];
    /**
     * Rules to add.
     *
     * @supported Chrome
     */
    addRules?: Rule[];
}
/**
 * @supported Chrome
 */
export interface UpdateRulesetOptions {
    /**
     * The set of ids corresponding to a static {@link Ruleset} that should be disabled.
     *
     * @supported Chrome
     */
    disableRulesetIds?: string[];
    /**
     * The set of ids corresponding to a static {@link Ruleset} that should be enabled.
     *
     * @supported Chrome
     */
    enableRulesetIds?: string[];
}
/**
 * @supported Chrome
 */
export interface UpdateStaticRulesOptions {
    /**
     * The id corresponding to a static {@link Ruleset}.
     *
     * @supported Chrome
     */
    rulesetId: string;
    /**
     * Set of ids corresponding to rules in the {@link Ruleset} to disable.
     *
     * @supported Chrome
     */
    disableRuleIds?: number[];
    /**
     * Set of ids corresponding to rules in the {@link Ruleset} to enable.
     *
     * @supported Chrome
     */
    enableRuleIds?: number[];
}
/**
 * @supported Chrome
 */
export interface GetDisabledRuleIdsOptions {
    /**
     * The id corresponding to a static {@link Ruleset}.
     *
     * @supported Chrome
     */
    rulesetId: string;
}
/**
 * @supported Chrome
 */
export interface TabActionCountUpdate {
    /**
     * The tab for which to update the action count.
     *
     * @supported Chrome
     */
    tabId: number;
    /**
     * The amount to increment the tab's action count by. Negative values will decrement the count.
     *
     * @supported Chrome
     */
    increment: number;
}
/**
 * @supported Chrome
 */
export interface ExtensionActionOptions {
    /**
     * Whether to automatically display the action count for a page as the extension's badge text. This preference is persisted across sessions.
     *
     * @supported Chrome
     */
    displayActionCountAsBadgeText?: boolean;
    /**
     * Details of how the tab's action count should be adjusted.
     *
     * @since Chrome 89
     *
     * @supported Chrome
     */
    tabUpdate?: TabActionCountUpdate;
}
/**
 * @supported Chrome, Firefox
 */
export const GUARANTEED_MINIMUM_STATIC_RULES: 30000;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_DYNAMIC_RULES: 30000;
/**
 * @supported Chrome
 */
export const MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES: 5000;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_SESSION_RULES: 5000;
/**
 * @supported Chrome
 */
export const MAX_NUMBER_OF_UNSAFE_SESSION_RULES: 5000;
/**
 * @supported Chrome
 */
export const GETMATCHEDRULES_QUOTA_INTERVAL: 10;
/**
 * @supported Chrome
 */
export const MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL: 20;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_REGEX_RULES: 1000;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_STATIC_RULESETS: 100;
/**
 * @supported Chrome, Firefox
 */
export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 50;
/**
 * @supported Chrome, Firefox
 */
export const DYNAMIC_RULESET_ID: "_dynamic";
/**
 * @supported Chrome, Firefox
 */
export const SESSION_RULESET_ID: "_session";
/**
 * @supported Chrome
 */
export const onRuleMatchedDebug: events.Event<(
      /**
       * @since Chrome 85
       */
      info: MatchedRuleInfoDebug,
    ) => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
export type DesktopCaptureSourceType = "screen" | "window" | "tab" | "audio";
/**
 * @supported Chrome
 */
export type SystemAudioPreferenceEnum = "include" | "exclude";
/**
 * @supported Chrome
 */
export type WindowAudioPreferenceEnum = "system" | "window" | "exclude";
/**
 * @supported Chrome
 */
export type SelfCapturePreferenceEnum = "include" | "exclude";
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
export function cancelChooseDesktopMedia(

      desktopMediaRequestId: number,
    ): void;
/**
 * @supported Chrome
 */
export interface ChooseDesktopMediaOptions {
    /** @supported Chrome */
    systemAudio?: SystemAudioPreferenceEnum;
    /** @supported Chrome */
    windowAudio?: WindowAudioPreferenceEnum;
    /** @supported Chrome */
    selfBrowserSurface?: SelfCapturePreferenceEnum;
    /** @supported Chrome */
    suppressLocalAudioPlaybackIntended?: boolean;
}

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
    /** @supported Chrome */
    getContent(callback?: (content: string, encoding: string) => void): Promise<{ content: string; encoding: string }>;
    /** @supported Chrome */
    setContent(content: string, commit: boolean, callback?: (result?: { [name: string]: unknown }) => void): Promise<{ [name: string]: unknown } | undefined>;
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
export function reload(

      reloadOptions?: {

        /**
         * When true, the loader will bypass the cache for all inspected page resources loaded before the `load` event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window.
         */
        ignoreCache?: boolean,

        /**
         * If specified, the string will override the value of the `User-Agent` HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the `navigator.userAgent` property that's returned to any scripts that are running within the inspected page.
         */
        userAgent?: string,

        /**
         * If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads—for example, if the user presses Ctrl+R.
         */
        injectedScript?: string,
      },
    ): void;
/**
 * @supported Chrome, Firefox
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
    getContent(): Promise<{

        /**
         * Content of the response body (potentially encoded).
         */
        content: string,

        /**
         * Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
         */
        encoding: string,
      }>;
    getContent(

        /**
         * @param response An object containing the response body and its encoding.
         */
        callback?: (
          /**
           * @since Chrome 151
           */
          response: {

            /**
             * Content of the response body (potentially encoded).
             */
            content: string,

            /**
             * Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
             */
            encoding: string,
          },
        ) => void,
      ): void;
}
/**
 * @supported Chrome, Firefox
 */
export const onRequestFinished: events.Event<(
      request: Request,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onNavigated: events.Event<(
      url: string,
    ) => void>;
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
    onSelectionChanged: events.Event<() => void>;
    /**
     * Creates a pane within panel's sidebar.
     *
     * @chrome-returns-extra since Pending
     * @param title Text that is displayed in sidebar caption.
     * @returns A callback invoked when the sidebar is created.
     *
     * @supported Chrome, Firefox
     */
    createSidebarPane(

        title: string,
      ): Promise<ExtensionSidebarPane>;
    createSidebarPane(

        title: string,

        /**
         * @param result An ExtensionSidebarPane object for created sidebar pane.
         */
        callback?: (
          result: ExtensionSidebarPane,
        ) => void,
      ): void;
}
/**
 * @supported Chrome, Firefox
 */
export interface SourcesPanel {
    /** @supported Chrome */
    createSidebarPane(title: string, callback?: (result: ExtensionSidebarPane) => void): Promise<ExtensionSidebarPane>;
    /** @supported Chrome */
    onSelectionChanged: events.Event<() => void>;
}
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionPanel {
    /** @supported Chrome, Firefox */
    onShown: events.Event<(window: Window) => void>;
    /** @supported Chrome, Firefox */
    onHidden: events.Event<() => void>;
    /** @supported Chrome */
    onSearch: events.Event<(action: string, queryString?: string) => void>;
    /** @supported Chrome */
    createStatusBarButton(iconPath: string, tooltipText: string, disabled: boolean): Button;
    /** @supported Chrome */
    show(): void;
}
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionSidebarPane {
    /** @supported Chrome, Firefox */
    onShown: events.Event<(window: Window) => void>;
    /** @supported Chrome, Firefox */
    onHidden: events.Event<() => void>;
    /** @supported Chrome */
    setHeight(height: string): void;
    /** @supported Chrome, Firefox */
    setExpression(expression: string, rootTitle?: string): Promise<void>;
    setExpression(expression: string, rootTitle?: string, callback?: () => void): void;
    /** @supported Chrome, Firefox */
    setObject(jsonObject: _WebExtJsonObject | string, rootTitle?: string): Promise<void>;
    setObject(jsonObject: string, rootTitle?: string, callback?: () => void): void;
    /** @supported Chrome, Firefox */
    setPage(path: string): Promise<void>;
    setPage(path: string, callback?: () => void): void;
}
/**
 * @supported Chrome, Firefox
 */
export interface Button {
    /** @supported Chrome */
    onClicked: events.Event<() => void>;
    /** @supported Chrome */
    update(iconPath?: string, tooltipText?: string, disabled?: boolean): void;
}
/**
 * @supported Chrome
 */
export type Theme = "default" | "dark";
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
 * @supported Chrome, Firefox
 */
export function setOpenResourceHandler(callback?: ((resource: devtools.inspectedWindow.Resource) => void) | null): void;
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

}

/**
 * These APIs are available only in a devtools_page context.
 */
export namespace devtools.performance {
/**
 * @supported Chrome
 */
export const onProfilingStarted: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onProfilingStopped: events.Event<() => void>;

}

/**
 * These APIs are available only in a devtools_page context.
 */
export namespace devtools.recorder {
/**
 * @supported Chrome
 */
export interface RecorderExtensionPlugin {
    /**
     * Converts a recording from the Recorder panel format into a string.
     *
     * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
     *
     * @supported Chrome
     */
    stringify(

        recording: {},
      ): void;
    /**
     * Converts a step of the recording from the Recorder panel format into a string.
     *
     * @param step A step of the recording of a user interaction with the page. This should match [Puppeteer's step schema](https://github.com/puppeteer/replay/blob/main/docs/api/modules/Schema.md#step).
     *
     * @supported Chrome
     */
    stringifyStep(

        step: {},
      ): void;
    /**
     * Allows the extension to implement custom replay functionality.
     *
     * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
     * @since Chrome 112
     *
     * @supported Chrome
     */
    replay(

        recording: {},
      ): void;
}
/**
 * @supported Chrome
 */
export interface RecorderView {
    /**
     * Fired when the view is shown.
     *
     * @supported Chrome
     */
    onShown: events.Event<() => void>;
    /**
     * Fired when the view is hidden.
     *
     * @supported Chrome
     */
    onHidden: events.Event<() => void>;
    /**
     * Indicates that the extension wants to show this view in the Recorder panel.
     *
     * @supported Chrome
     */
    show(): void;
}
/**
 * @supported Chrome
 */
export function registerRecorderExtensionPlugin(

      plugin: RecorderExtensionPlugin,

      name: string,

      mediaType: string,
    ): void;
/**
 * @supported Chrome
 */
export function createView(

      title: string,

      pagePath: string,
    ): RecorderView;

}

export namespace dns {
/**
 * @supported Chrome
 */
export interface ResolveCallbackResolveInfo {
    /**
     * The result code. Zero indicates success.
     *
     * @supported Chrome
     */
    resultCode: number;
    /**
     * A string representing the IP address literal. Supplied only if resultCode indicates success.
     *
     * @supported Chrome
     */
    address?: string;
}
/**
 * @supported Chrome
 */
export function resolve(

      hostname: string,
    ): Promise<ResolveCallbackResolveInfo>;
/**
 * @supported Chrome
 */
export function resolve(

      hostname: string,

      callback?: (
        resolveInfo: ResolveCallbackResolveInfo,
      ) => void,
    ): void;

}

export namespace documentScan {
/**
 * @supported Chrome
 */
export interface ScanOptions {
    /**
     * The MIME types that are accepted by the caller.
     *
     * @supported Chrome
     */
    mimeTypes?: string[];
    /**
     * The number of scanned images allowed. The default is 1.
     *
     * @supported Chrome
     */
    maxImages?: number;
}
/**
 * @supported Chrome
 */
export interface ScanResults {
    /**
     * An array of data image URLs in a form that can be passed as the "src" value to an image tag.
     *
     * @supported Chrome
     */
    dataUrls: string[];
    /**
     * The MIME type of the `dataUrls`.
     *
     * @supported Chrome
     */
    mimeType: string;
}
/**
 * @supported Chrome
 */
export type OperationResult = "UNKNOWN" | "SUCCESS" | "UNSUPPORTED" | "CANCELLED" | "DEVICE_BUSY" | "INVALID" | "WRONG_TYPE" | "EOF" | "ADF_JAMMED" | "ADF_EMPTY" | "COVER_OPEN" | "IO_ERROR" | "ACCESS_DENIED" | "NO_MEMORY" | "UNREACHABLE" | "MISSING" | "INTERNAL_ERROR";
/**
 * @supported Chrome
 */
export type ConnectionType = "UNSPECIFIED" | "USB" | "NETWORK";
/**
 * @supported Chrome
 */
export interface ScannerInfo {
    /**
     * The ID of a specific scanner.
     *
     * @supported Chrome
     */
    scannerId: string;
    /**
     * A human-readable name for the scanner to display in the UI.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The scanner manufacturer.
     *
     * @supported Chrome
     */
    manufacturer: string;
    /**
     * The scanner model if it is available, or a generic description.
     *
     * @supported Chrome
     */
    model: string;
    /**
     * For matching against other `ScannerInfo` entries that point to the same physical device.
     *
     * @supported Chrome
     */
    deviceUuid: string;
    /**
     * Indicates how the scanner is connected to the computer.
     *
     * @supported Chrome
     */
    connectionType: ConnectionType;
    /**
     * If true, the scanner connection's transport cannot be intercepted by a passive listener, such as TLS or USB.
     *
     * @supported Chrome
     */
    secure: boolean;
    /**
     * An array of MIME types that can be requested for returned scans.
     *
     * @supported Chrome
     */
    imageFormats: string[];
    /**
     * A human-readable description of the protocol or driver used to access the scanner, such as Mopria, WSD, or epsonds. This is primarily useful for allowing a user to choose between protocols if a device supports multiple protocols.
     *
     * @supported Chrome
     */
    protocolType: string;
}
/**
 * @supported Chrome
 */
export type OptionType = "UNKNOWN" | "BOOL" | "INT" | "FIXED" | "STRING" | "BUTTON" | "GROUP";
/**
 * @supported Chrome
 */
export type OptionUnit = "UNITLESS" | "PIXEL" | "BIT" | "MM" | "DPI" | "PERCENT" | "MICROSECOND";
/**
 * @supported Chrome
 */
export type ConstraintType = "INT_RANGE" | "FIXED_RANGE" | "INT_LIST" | "FIXED_LIST" | "STRING_LIST";
/**
 * @supported Chrome
 */
export interface OptionConstraint {
    /** @supported Chrome */
    type: ConstraintType;
    /** @supported Chrome */
    min?: number | number;
    /** @supported Chrome */
    max?: number | number;
    /** @supported Chrome */
    quant?: number | number;
    /** @supported Chrome */
    list?: number[] | number[] | string[];
}
/**
 * @supported Chrome
 */
export type Configurability = "NOT_CONFIGURABLE" | "SOFTWARE_CONFIGURABLE" | "HARDWARE_CONFIGURABLE";
/**
 * @supported Chrome
 */
export interface ScannerOption {
    /**
     * The option name using lowercase ASCII letters, numbers, and dashes. Diacritics are not allowed.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * A printable one-line title.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * A longer description of the option.
     *
     * @supported Chrome
     */
    description: string;
    /**
     * The data type contained in the `value` property, which is needed for setting this option.
     *
     * @supported Chrome
     */
    type: OptionType;
    /**
     * The unit of measurement for this option.
     *
     * @supported Chrome
     */
    unit: OptionUnit;
    /**
     * The current value of the option, if relevant. Note that the data type of this property must match the data type specified in `type`.
     *
     * @supported Chrome
     */
    value?: boolean | number | number[] | number | number[] | string;
    /**
     * Defines {@link OptionConstraint} on the current scanner option.
     *
     * @supported Chrome
     */
    constraint?: OptionConstraint;
    /**
     * Indicates that this option can be detected from software.
     *
     * @supported Chrome
     */
    isDetectable: boolean;
    /**
     * Indicates whether and how the option can be changed.
     *
     * @supported Chrome
     */
    configurability: Configurability;
    /**
     * Can be automatically set by the scanner driver.
     *
     * @supported Chrome
     */
    isAutoSettable: boolean;
    /**
     * Emulated by the scanner driver if true.
     *
     * @supported Chrome
     */
    isEmulated: boolean;
    /**
     * Indicates the option is active and can be set or retrieved. If false, the `value` property will not be set.
     *
     * @supported Chrome
     */
    isActive: boolean;
    /**
     * Indicates that the UI should not display this option by default.
     *
     * @supported Chrome
     */
    isAdvanced: boolean;
    /** @supported Chrome */
    isInternal: boolean;
}
/**
 * @supported Chrome
 */
export interface DeviceFilter {
    /**
     * Only return scanners that are directly attached to the computer.
     *
     * @supported Chrome
     */
    local?: boolean;
    /**
     * Only return scanners that use a secure transport, such as USB or TLS.
     *
     * @supported Chrome
     */
    secure?: boolean;
}
/**
 * @supported Chrome
 */
export interface OptionGroup {
    /**
     * Provides a printable title, for example "Geometry options".
     *
     * @supported Chrome
     */
    title: string;
    /**
     * An array of option names in driver-provided order.
     *
     * @supported Chrome
     */
    members: string[];
}
/**
 * @supported Chrome
 */
export interface GetScannerListResponse {
    /**
     * The enumeration result. Note that partial results could be returned even if this indicates an error.
     *
     * @supported Chrome
     */
    result: OperationResult;
    /**
     * A possibly-empty list of scanners that match the provided {@link DeviceFilter}.
     *
     * @supported Chrome
     */
    scanners: ScannerInfo[];
}
/**
 * @supported Chrome
 */
export interface OpenScannerResponse {
    /**
     * The scanner ID passed to `openScanner()`.
     *
     * @supported Chrome
     */
    scannerId: string;
    /** @supported Chrome */
    result: OperationResult;
    /** @supported Chrome */
    scannerHandle?: string;
    /**
     * If `result` is `SUCCESS`, provides a key-value mapping where the key is a device-specific option and the value is an instance of {@link ScannerOption}.
     *
     * @supported Chrome
     */
    options?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface GetOptionGroupsResponse {
    /**
     * The same scanner handle as was passed to {@link getOptionGroups}.
     *
     * @supported Chrome
     */
    scannerHandle: string;
    /**
     * The result of getting the option groups. If the value of this is `SUCCESS`, the `groups` property will be populated.
     *
     * @supported Chrome
     */
    result: OperationResult;
    /**
     * If `result` is `SUCCESS`, provides a list of option groups in the order supplied by the scanner driver.
     *
     * @supported Chrome
     */
    groups?: OptionGroup[];
}
/**
 * @supported Chrome
 */
export interface CloseScannerResponse {
    /**
     * The same scanner handle as was passed to {@link closeScanner}.
     *
     * @supported Chrome
     */
    scannerHandle: string;
    /**
     * The result of closing the scanner. Even if this value is not `SUCCESS`, the handle will be invalid and should not be used for any further operations.
     *
     * @supported Chrome
     */
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface OptionSetting {
    /**
     * Indicates the name of the option to set.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * Indicates the data type of the option. The requested data type must match the real data type of the underlying option.
     *
     * @supported Chrome
     */
    type: OptionType;
    /**
     * Indicates the value to set. Leave unset to request automatic setting for options that have `autoSettable` enabled. The data type supplied for `value` must match `type`.
     *
     * @supported Chrome
     */
    value?: boolean | number | number[] | number | number[] | string;
}
/**
 * @supported Chrome
 */
export interface SetOptionResult {
    /**
     * Indicates the name of the option that was set.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * Indicates the result of setting the option.
     *
     * @supported Chrome
     */
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface SetOptionsResponse {
    /**
     * Provides the scanner handle passed to `setOptions()`.
     *
     * @supported Chrome
     */
    scannerHandle: string;
    /**
     * An array of results, one each for every passed-in `OptionSetting`.
     *
     * @supported Chrome
     */
    results: SetOptionResult[];
    /**
     * An updated key-value mapping from option names to {@link ScannerOption} values containing the new configuration after attempting to set all supplied options. This has the same structure as the `options` property in {@link OpenScannerResponse}.
     *
     * This property will be set even if some options were not set successfully, but will be unset if retrieving the updated configuration fails (for example, if the scanner is disconnected in the middle of scanning).
     *
     * @supported Chrome
     */
    options?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface StartScanOptions {
    /**
     * Specifies the MIME type to return scanned data in.
     *
     * @supported Chrome
     */
    format: string;
    /**
     * If a non-zero value is specified, limits the maximum scanned bytes returned in a single {@link readScanData} response to that value. The smallest allowed value is 32768 (32 KB). If this property is not specified, the size of a returned chunk may be as large as the entire scanned image.
     *
     * @supported Chrome
     */
    maxReadSize?: number;
}
/**
 * @supported Chrome
 */
export interface StartScanResponse {
    /**
     * Provides the same scanner handle that was passed to `startScan()`.
     *
     * @supported Chrome
     */
    scannerHandle: string;
    /**
     * The result of starting a scan. If the value of this is `SUCCESS`, the `job` property will be populated.
     *
     * @supported Chrome
     */
    result: OperationResult;
    /**
     * If `result` is `SUCCESS`, provides a handle that can be used to read scan data or cancel the job.
     *
     * @supported Chrome
     */
    job?: string;
}
/**
 * @supported Chrome
 */
export interface CancelScanResponse {
    /**
     * Provides the same job handle that was passed to `cancelScan()`.
     *
     * @supported Chrome
     */
    job: string;
    /**
     * The backend's cancel scan result. If the result is `OperationResult.SUCCESS` or `OperationResult.CANCELLED`, the scan has been cancelled and the scanner is ready to start a new scan. If the result is `OperationResult.DEVICE_BUSY` , the scanner is still processing the requested cancellation; the caller should wait a short time and try the request again. Other result values indicate a permanent error that should not be retried.
     *
     * @supported Chrome
     */
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface ReadScanDataResponse {
    /**
     * Provides the job handle passed to `readScanData()`.
     *
     * @supported Chrome
     */
    job: string;
    /**
     * The result of reading data. If its value is `SUCCESS`, then `data` contains the _next_ (possibly zero-length) chunk of image data that is ready for reading. If its value is `EOF`, the `data` contains the _last_ chunk of image data.
     *
     * @supported Chrome
     */
    result: OperationResult;
    /**
     * If `result` is `SUCCESS`, contains the _next_ chunk of scanned image data. If `result` is `EOF`, contains the _last_ chunk of scanned image data.
     *
     * @supported Chrome
     */
    data?: ArrayBuffer;
    /**
     * If `result` is `SUCCESS`, an estimate of how much of the total scan data has been delivered so far, in the range 0 to 100.
     *
     * @supported Chrome
     */
    estimatedCompletion?: number;
}
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
export interface HeaderNameValuePair {
    /**
     * Name of the HTTP header.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * Value of the HTTP header.
     *
     * @supported Chrome
     */
    value: string;
}
/**
 * @supported Chrome, Firefox
 */
export type FilenameConflictAction = "uniquify" | "overwrite" | "prompt";
/**
 * @supported Chrome
 */
export interface FilenameSuggestion {
    /**
     * The {@link DownloadItem}'s new target {@link DownloadItem.filename}, as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. `filename` is ignored if there are any {@link onDeterminingFilename} listeners registered by any extensions.
     *
     * @supported Chrome
     */
    filename: string;
    /**
     * The action to take if `filename` already exists.
     *
     * @supported Chrome
     */
    conflictAction?: FilenameConflictAction;
}
/**
 * @supported Chrome
 */
export type HttpMethod = "GET" | "POST";
/**
 * @supported Chrome, Firefox
 */
export type InterruptReason = "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH";
/**
 * @supported Chrome
 */
export interface DownloadOptions {
    /**
     * The URL to download.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. {@link onDeterminingFilename} allows suggesting a filename after the file's MIME type and a tentative filename have been determined.
     *
     * @supported Chrome
     */
    filename?: string;
    /**
     * The action to take if `filename` already exists.
     *
     * @supported Chrome
     */
    conflictAction?: FilenameConflictAction;
    /**
     * Use a file-chooser to allow the user to select a filename regardless of whether `filename` is set or already exists.
     *
     * @supported Chrome
     */
    saveAs?: boolean;
    /**
     * The HTTP method to use if the URL uses the HTTP\[S\] protocol.
     *
     * @supported Chrome
     */
    method?: HttpMethod;
    /**
     * Extra HTTP headers to send with the request if the URL uses the HTTP\[s\] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest.
     *
     * @supported Chrome
     */
    headers?: HeaderNameValuePair[];
    /**
     * Post body.
     *
     * @supported Chrome
     */
    body?: string;
}
/**
 * @supported Chrome, Firefox
 */
export type DangerType = "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted" | "allowlistedByPolicy" | "asyncScanning" | "asyncLocalPasswordScanning" | "passwordProtected" | "blockedTooLarge" | "sensitiveContentWarning" | "sensitiveContentBlock" | "deepScannedFailed" | "deepScannedSafe" | "deepScannedOpenedDangerous" | "promptForScanning" | "promptForLocalPasswordScanning" | "accountCompromise" | "blockedScanFailed" | "forceSaveToGdrive" | "forceSaveToOnedrive";
/**
 * @supported Chrome, Firefox
 */
export type State = "in_progress" | "interrupted" | "complete";
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
    /** @supported Chrome */
    finalUrl: string;
    /** @supported Chrome, Firefox */
    referrer: string;
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
    mime: string;
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
    endTime?: string;
    /**
     * Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})`
     *
     * @supported Chrome, Firefox
     */
    estimatedEndTime?: string;
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
    error?: InterruptReason;
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
    byExtensionId?: string;
    /**
     * The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.
     *
     * @supported Chrome, Firefox
     */
    byExtensionName?: string;
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
    query?: string[];
    /**
     * Limits results to {@link DownloadItem} that started before the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startedBefore?: string;
    /**
     * Limits results to {@link DownloadItem} that started after the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startedAfter?: string;
    /**
     * Limits results to {@link DownloadItem} that ended before the given ms in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    endedBefore?: string;
    /**
     * Limits results to {@link DownloadItem} that ended after the given ms in ISO 8601 format
     *
     * @supported Chrome, Firefox
     */
    endedAfter?: string;
    /**
     * Limits results to {@link DownloadItem} whose `totalBytes` is greater than the given integer.
     *
     * @supported Chrome, Firefox
     */
    totalBytesGreater?: number;
    /**
     * Limits results to {@link DownloadItem} whose `totalBytes` is less than the given integer.
     *
     * @supported Chrome, Firefox
     */
    totalBytesLess?: number;
    /**
     * Limits results to {@link DownloadItem} whose `filename` matches the given regular expression.
     *
     * @supported Chrome, Firefox
     */
    filenameRegex?: string;
    /**
     * Limits results to {@link DownloadItem} whose `url` matches the given regular expression.
     *
     * @supported Chrome, Firefox
     */
    urlRegex?: string;
    /**
     * Limits results to {@link DownloadItem} whose `finalUrl` matches the given regular expression.
     *
     * @since Chrome 54
     *
     * @supported Chrome
     */
    finalUrlRegex?: string;
    /**
     * The maximum number of matching {@link DownloadItem} returned. Defaults to 1000. Set to 0 in order to return all matching {@link DownloadItem}. See {@link search} for how to page through results.
     *
     * @supported Chrome, Firefox
     */
    limit?: number;
    /**
     * Set elements of this array to {@link DownloadItem} properties in order to sort search results. For example, setting `orderBy=['startTime']` sorts the {@link DownloadItem} by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.
     *
     * @supported Chrome, Firefox
     */
    orderBy?: string[];
    /**
     * The `id` of the {@link DownloadItem} to query.
     *
     * @supported Chrome, Firefox
     */
    id?: number;
    /**
     * The absolute URL that this download initiated from, before any redirects.
     *
     * @supported Chrome, Firefox
     */
    url?: string;
    /**
     * The absolute URL that this download is being made from, after all redirects.
     *
     * @since Chrome 54
     *
     * @supported Chrome
     */
    finalUrl?: string;
    /**
     * Absolute local path.
     *
     * @supported Chrome, Firefox
     */
    filename?: string;
    /**
     * Indication of whether this download is thought to be safe or known to be suspicious.
     *
     * @supported Chrome, Firefox
     */
    danger?: DangerType;
    /**
     * The file's MIME type.
     *
     * @supported Chrome, Firefox
     */
    mime?: string;
    /**
     * The time when the download began in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    startTime?: string;
    /**
     * The time when the download ended in ISO 8601 format.
     *
     * @supported Chrome, Firefox
     */
    endTime?: string;
    /**
     * Indicates whether the download is progressing, interrupted, or complete.
     *
     * @supported Chrome, Firefox
     */
    state?: State;
    /**
     * True if the download has stopped reading data from the host, but kept the connection open.
     *
     * @supported Chrome, Firefox
     */
    paused?: boolean;
    /**
     * Why a download was interrupted.
     *
     * @supported Chrome, Firefox
     */
    error?: InterruptReason;
    /**
     * Number of bytes received so far from the host, without considering file compression.
     *
     * @supported Chrome, Firefox
     */
    bytesReceived?: number;
    /**
     * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    totalBytes?: number;
    /**
     * Number of bytes in the whole file post-decompression, or -1 if unknown.
     *
     * @supported Chrome, Firefox
     */
    fileSize?: number;
    /**
     * Whether the downloaded file exists;
     *
     * @supported Chrome, Firefox
     */
    exists?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface StringDelta {
    /** @supported Chrome, Firefox */
    previous?: string;
    /** @supported Chrome, Firefox */
    current?: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface DoubleDelta {
    /** @supported Chrome, Firefox */
    previous?: number;
    /** @supported Chrome, Firefox */
    current?: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface BooleanDelta {
    /** @supported Chrome, Firefox */
    previous?: boolean;
    /** @supported Chrome, Firefox */
    current?: boolean;
}
/**
 * @supported Chrome
 */
export interface DownloadDelta {
    /**
     * The `id` of the {@link DownloadItem} that changed.
     *
     * @supported Chrome
     */
    id: number;
    /**
     * The change in `url`, if any.
     *
     * @supported Chrome
     */
    url?: StringDelta;
    /**
     * The change in `finalUrl`, if any.
     *
     * @since Chrome 54
     *
     * @supported Chrome
     */
    finalUrl?: StringDelta;
    /**
     * The change in `filename`, if any.
     *
     * @supported Chrome
     */
    filename?: StringDelta;
    /**
     * The change in `danger`, if any.
     *
     * @supported Chrome
     */
    danger?: StringDelta;
    /**
     * The change in `mime`, if any.
     *
     * @supported Chrome
     */
    mime?: StringDelta;
    /**
     * The change in `startTime`, if any.
     *
     * @supported Chrome
     */
    startTime?: StringDelta;
    /**
     * The change in `endTime`, if any.
     *
     * @supported Chrome
     */
    endTime?: StringDelta;
    /**
     * The change in `state`, if any.
     *
     * @supported Chrome
     */
    state?: StringDelta;
    /**
     * The change in `canResume`, if any.
     *
     * @supported Chrome
     */
    canResume?: BooleanDelta;
    /**
     * The change in `paused`, if any.
     *
     * @supported Chrome
     */
    paused?: BooleanDelta;
    /**
     * The change in `error`, if any.
     *
     * @supported Chrome
     */
    error?: StringDelta;
    /**
     * The change in `totalBytes`, if any.
     *
     * @supported Chrome
     */
    totalBytes?: DoubleDelta;
    /**
     * The change in `fileSize`, if any.
     *
     * @supported Chrome
     */
    fileSize?: DoubleDelta;
    /**
     * The change in `exists`, if any.
     *
     * @supported Chrome
     */
    exists?: BooleanDelta;
}
/**
 * @supported Chrome
 */
export interface GetFileIconOptions {
    /**
     * The size of the returned icon. The icon will be square with dimensions size \* size pixels. The default and largest size for the icon is 32x32 pixels. The only supported sizes are 16 and 32. It is an error to specify any other size.
     *
     * @supported Chrome
     */
    size?: number;
}
/**
 * @supported Chrome
 */
export interface UiOptions {
    /**
     * Enable or disable the download UI.
     *
     * @supported Chrome
     */
    enabled: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const onCreated: events.Event<(
      downloadItem: DownloadItem,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onErased: events.Event<(
      downloadId: number,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<(downloadDelta: DownloadDelta) => void>;
/**
 * @supported Chrome
 */
export const onDeterminingFilename: events.Event<(
      downloadItem: DownloadItem,
      suggest: (
        suggestion?: FilenameSuggestion,
      ) => void,
    ) => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
export function show(downloadId: number): void;
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
 * @supported Chrome
 */
export function erase(

      query: DownloadQuery,

      callback?: (
        erasedIds: number[],
      ) => void,
    ): void;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function setShelfEnabled(

      enabled: boolean,
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
export interface HardwarePlatformInfo {
    /** @supported Chrome */
    model: string;
    /** @supported Chrome */
    manufacturer: string;
}
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

export namespace enterprise.kioskInput {
/**
 * @supported Chrome
 */
export interface SetCurrentInputMethodOptions {
    /**
     * The input method ID to set as current input method. This input method has to be enabled by enterprise policies. Supported IDs are located in https://crsrc.org/c/chrome/browser/resources/chromeos/input\_method.
     *
     * @supported Chrome
     */
    inputMethodId: string;
}
/**
 * @supported Chrome
 */
export function setCurrentInputMethod(

      options: SetCurrentInputMethodOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setCurrentInputMethod(

      options: SetCurrentInputMethodOptions,

      callback?: () => void,
    ): void;

}

export namespace enterprise.login {
/**
 * @supported Chrome
 */
export function exitCurrentManagedGuestSession(): Promise<void>;
/**
 * @supported Chrome
 */
export function exitCurrentManagedGuestSession(

      callback?: () => void,
    ): void;

}

export namespace enterprise.networkingAttributes {
/**
 * @supported Chrome
 */
export interface NetworkDetails {
    /**
     * The device's MAC address.
     *
     * @supported Chrome
     */
    macAddress: string;
    /**
     * The device's local IPv4 address (undefined if not configured).
     *
     * @supported Chrome
     */
    ipv4?: string;
    /**
     * The device's local IPv6 address (undefined if not configured).
     *
     * @supported Chrome
     */
    ipv6?: string;
}
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
export interface Token {
    /**
     * Uniquely identifies this `Token`.
     *
     * Static IDs are `"user"` and `"system"`, referring to the platform's user-specific and the system-wide hardware token, respectively. Any other tokens (with other identifiers) might be returned by {@link enterprise.platformKeys.getTokens}.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * Implements the WebCrypto's [SubtleCrypto](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface) interface. The cryptographic operations, including key generation, are hardware-backed.
     *
     * Only non-extractable keys can be generated. The supported key types are RSASSA-PKCS1-V1\_5 with `modulusLength` up to 2048 and ECDSA with `namedCurve` P-256. Each key can be used for signing data at most once, unless the extension is allowlisted by the [KeyPermissions policy](https://chromeenterprise.google/policies/#KeyPermissions), in which case the key can be used indefinitely.
     *
     * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
     *
     * @supported Chrome
     */
    subtleCrypto: SubtleCrypto;
    /**
     * Implements the WebCrypto's [SubtleCrypto](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface) interface. The cryptographic operations, including key generation, are software-backed. Protection of the keys, and thus implementation of the non-extractable property, is done in software, so the keys are less protected than hardware-backed keys.
     *
     * Only non-extractable keys can be generated. The only supported key type is RSASSA-PKCS1-V1\_5 with `modulusLength` up to 2048. Each key can be used for signing data at most once, unless the extension is allowlisted through the [KeyPermissions policy](https://chromeenterprise.google/policies/#KeyPermissions), in which case the key can be used indefinitely.
     *
     * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
     *
     * @since Chrome 97
     *
     * @supported Chrome
     */
    softwareBackedSubtleCrypto: SubtleCrypto;
}
/**
 * @supported Chrome
 */
export type Scope = "USER" | "MACHINE";
/**
 * @supported Chrome
 */
export type Algorithm = "RSA" | "ECDSA";
/**
 * @supported Chrome
 */
export interface RegisterKeyOptions {
    /**
     * Which algorithm the registered key should use.
     *
     * @supported Chrome
     */
    algorithm: Algorithm;
}
/**
 * @supported Chrome
 */
export interface ChallengeKeyOptions {
    /**
     * A challenge as emitted by the Verified Access Web API.
     *
     * @supported Chrome
     */
    challenge: ArrayBuffer;
    /**
     * If present, registers the challenged key with the specified `scope`'s token. The key can then be associated with a certificate and used like any other signing key. Subsequent calls to this function will then generate a new Enterprise Key in the specified `scope`.
     *
     * @supported Chrome
     */
    registerKey?: RegisterKeyOptions;
    /**
     * Which Enterprise Key to challenge.
     *
     * @supported Chrome
     */
    scope: Scope;
}
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
    /** @supported Chrome */
    addRules(rules: Rule<C, A>[], callback?: (rules: Rule<C, A>[]) => void): void;
    /** @supported Chrome */
    getRules(ruleIdentifiers: string[], callback: (rules: Rule<C, A>[]) => void): void;
    getRules(callback: (rules: Rule<C, A>[]) => void): void;
    /** @supported Chrome */
    removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
    removeRules(callback?: () => void): void;
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
    hostContains?: string;
    /**
     * Matches if the host name of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostEquals?: string;
    /**
     * Matches if the host name of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostPrefix?: string;
    /**
     * Matches if the host name of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    hostSuffix?: string;
    /**
     * Matches if the path segment of the URL contains a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathContains?: string;
    /**
     * Matches if the path segment of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathEquals?: string;
    /**
     * Matches if the path segment of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathPrefix?: string;
    /**
     * Matches if the path segment of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    pathSuffix?: string;
    /**
     * Matches if the query segment of the URL contains a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryContains?: string;
    /**
     * Matches if the query segment of the URL is equal to a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryEquals?: string;
    /**
     * Matches if the query segment of the URL starts with a specified string.
     *
     * @supported Chrome, Firefox
     */
    queryPrefix?: string;
    /**
     * Matches if the query segment of the URL ends with a specified string.
     *
     * @supported Chrome, Firefox
     */
    querySuffix?: string;
    /**
     * Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlContains?: string;
    /**
     * Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlEquals?: string;
    /**
     * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
     *
     * @supported Chrome, Firefox
     */
    urlMatches?: string;
    /**
     * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
     *
     * @supported Chrome, Firefox
     */
    originAndPathMatches?: string;
    /**
     * Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlPrefix?: string;
    /**
     * Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.
     *
     * @supported Chrome, Firefox
     */
    urlSuffix?: string;
    /**
     * Matches if the scheme of the URL is equal to any of the schemes specified in the array.
     *
     * @supported Chrome, Firefox
     */
    schemes?: string[];
    /**
     * Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200.
     *
     * @supported Chrome, Firefox
     */
    ports?: (number | number[])[];
    /**
     * Matches if the host part of the URL is an IP address and is contained in any of the CIDR blocks specified in the array.
     *
     * @since Chrome 123
     *
     * @supported Chrome
     */
    cidrBlocks?: string[];
}

}

export namespace extension {
/**
 * @supported Chrome, Firefox
 */
export type ViewType = "tab" | "popup";
/**
 * @supported Chrome, Firefox
 */
export const inIncognitoContext: boolean;
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
export function getBackgroundPage(): Window | undefined;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
/**
 * @supported Chrome, Firefox
 */
export function setUpdateUrlData(

      data: string,
    ): void;

}

export namespace extensionsManifestTypes {
/**
 * @supported Chrome
 */
export type automation = boolean | {

      /**
       * Whether to request permission to the whole ChromeOS desktop. If granted, this gives the extension access to every aspect of the desktop, and every site and app. If this permission is requested, all other permissions are implicitly included and do not need to be requested separately.
       */
      desktop?: boolean,
    };
/**
 * @supported Chrome
 */
export interface ContentCapabilities {
    /**
     * The set of URL patterns to match against. If any of the given patterns match a URL, its contents will be granted the specified capabilities.
     *
     * @supported Chrome
     */
    matches: string[];
    /**
     * The set of capabilities to grant matched contents. This is currently limited to `clipboardRead`, `clipboardWrite`, and `unlimitedStorage`.
     *
     * @supported Chrome
     */
    permissions: string[];
}
/**
 * @supported Chrome
 */
export interface ExternallyConnectable {
    /**
     * The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no extensions or apps can connect.
     *
     * The wildcard `"*"` will allow all extensions and apps to connect.
     *
     * @supported Chrome
     */
    ids?: string[];
    /**
     * The URL patterns for _web pages_ that are allowed to connect. _This does not affect content scripts._ If left empty or unspecified, no web pages can connect.
     *
     * Patterns cannot include wildcard domains nor subdomains of [(effective) top level domains](https://publicsuffix.org/list/); `*://google.com/*` and `http://*.chromium.org/*` are valid, while `<all_urls>`, `http://*\/*`, `*://*.com/*`, and even `http://*.appspot.com/*` are not.
     *
     * @supported Chrome
     */
    matches?: string[];
    /**
     * If `true`, messages sent via {@link runtime.connect} or {@link runtime.sendMessage} will set {@link runtime.MessageSender.tlsChannelId} if those methods request it to be. If `false`, {@link runtime.MessageSender.tlsChannelId} will never be set under any circumstance.
     *
     * @supported Chrome
     */
    accepts_tls_channel_id?: boolean;
}
/**
 * @supported Chrome
 */
export interface OptionsUI {
    /**
     * The path to your options page, relative to your extension's root.
     *
     * @supported Chrome
     */
    page: string;
    /**
     * If `true`, a Chrome user agent stylesheet will be applied to your options page. The default value is `false`. We do not recommend you enable it as it no longer results in a consistent UI with Chrome. This option will be removed in Manifest V3.
     *
     * @supported Chrome
     */
    chrome_style?: boolean;
    /**
     * If `true`, your extension's options page will be opened in a new tab rather than embedded in _chrome://extensions_. The default is `false`, and we recommend that you don't change it.
     *
     * **This is only useful to delay the inevitable deprecation of the old options UI!** It will be removed soon, so try not to use it. It will break.
     *
     * @supported Chrome
     */
    open_in_tab?: boolean;
}
/**
 * @supported Chrome
 */
export type SocketHostPatterns = string | string[];
/**
 * @supported Chrome
 */
export interface sockets {
    /**
     * The `udp` manifest property declares which sockets.udp operations an app can issue.
     *
     * @supported Chrome
     */
    udp?: {

        /**
         * The host:port pattern for `bind` operations.
         */
        bind?: SocketHostPatterns,

        /**
         * The host:port pattern for `send` operations.
         */
        send?: SocketHostPatterns,

        /**
         * The host:port pattern for `joinGroup` operations.
         */
        multicastMembership?: SocketHostPatterns,
      };
    /**
     * The `tcp` manifest property declares which sockets.tcp operations an app can issue.
     *
     * @supported Chrome
     */
    tcp?: {

        /**
         * The host:port pattern for `connect` operations.
         */
        connect?: SocketHostPatterns,
      };
    /**
     * The `tcpServer` manifest property declares which sockets.tcpServer operations an app can issue.
     *
     * @supported Chrome
     */
    tcpServer?: {

        /**
         * The host:port pattern for `listen` operations.
         */
        listen?: SocketHostPatterns,
      };
}
/**
 * @supported Chrome
 */
export interface bluetooth {
    /**
     * The `uuids` manifest property declares the list of protocols, profiles and services that an app can communicate using.
     *
     * @supported Chrome
     */
    uuids?: string[];
    /**
     * If `true`, gives permission to an app to use the {@link bluetoothSocket} API
     *
     * @supported Chrome
     */
    socket?: boolean;
    /**
     * If `true`, gives permission to an app to use the {@link bluetoothLowEnergy} API
     *
     * @supported Chrome
     */
    low_energy?: boolean;
    /**
     * If `true`, gives permission to an app to use the advertisement functions in the {@link bluetoothLowEnergy} API
     *
     * @since Chrome 44
     *
     * @supported Chrome
     */
    peripheral?: boolean;
}
/**
 * @supported Chrome
 */
export interface UsbPrinters {
    /**
     * A list of {@link usb.DeviceFilter USB device filters} matching supported devices. A device only needs to match one of the provided filters. A `vendorId` is required and only one of `productId` or `interfaceClass` may be provided.
     *
     * @supported Chrome
     */
    filters: {

        /**
         * USB vendor ID of matching devices
         */
        vendorId: number,

        /**
         * USB product ID of matching devices
         */
        productId?: number,

        /**
         * USB interface class implemented by any interface of a matching device.
         */
        interfaceClass?: number,

        /**
         * USB interface sub-class implemented by the interface matching {@link interfaceClass}.
         */
        interfaceSubclass?: number,

        /**
         * USB interface protocol implemented by the interface matching {@link interfaceClass} and {@link interfaceSubclass}.
         */
        interfaceProtocol?: number,
      }[];
}
/**
 * @supported Chrome
 */
export type KioskSecondaryApps = {

      /**
       * ID of secondary kiosk app
       */
      id: string,

      /**
       * Whether the secondary app should be enabled when kiosk app is launched. If true, the app will be enabled before the kiosk app launch; if false the app will be disabled before the kiosk app launch; if not set, the app's enabled state will not be changed during the kiosk app launch. The ${ref:management} API can be used to later change the secondary app state.
       *
       * @since Chrome 66
       */
      enabled_on_launch?: boolean,
    }[];

}

export namespace extensionTypes {
/**
 * @supported Chrome
 */
export type ColorArray = [number, number, number, number];
/**
 * @supported Chrome, Firefox
 */
export type ImageDataType = ImageData;
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
    format?: ImageFormat;
    /**
     * When format is `"jpeg"`, controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
     *
     * @supported Chrome, Firefox
     */
    quality?: number;
}
/**
 * @supported Chrome, Firefox
 */
export type RunAt = "document_start" | "document_end" | "document_idle";
/**
 * @supported Chrome, Firefox
 */
export type CSSOrigin = "author" | "user";
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
    code?: string;
    /**
     * JavaScript or CSS file to inject.
     *
     * @supported Chrome, Firefox
     */
    file?: string;
    /**
     * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame. If `true` and `frameId` is set, then the code is inserted in the selected frame and all of its child frames.
     *
     * @supported Chrome, Firefox
     */
    allFrames?: boolean;
    /**
     * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) where the script or CSS should be injected. Defaults to 0 (the top-level frame).
     *
     * @since Chrome 50
     *
     * @supported Chrome, Firefox
     */
    frameId?: number;
    /**
     * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
     *
     * @supported Chrome, Firefox
     */
    matchAboutBlank?: boolean;
    /**
     * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document\_idle".
     *
     * @supported Chrome, Firefox
     */
    runAt?: RunAt;
    /**
     * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to `"author"`.
     *
     * @since Chrome 66
     *
     * @supported Chrome, Firefox
     */
    cssOrigin?: CSSOrigin;
}
/**
 * @supported Chrome
 */
export interface DeleteInjectionDetails {
    /**
     * CSS code to remove.
     *
     * @supported Chrome
     */
    code?: string;
    /**
     * CSS file to remove.
     *
     * @supported Chrome
     */
    file?: string;
    /**
     * If allFrames is `true`, implies that the CSS should be removed from all frames of current page. By default, it's `false` and is only removed from the top frame. If `true` and `frameId` is set, then the code is removed from the selected frame and all of its child frames.
     *
     * @supported Chrome
     */
    allFrames?: boolean;
    /**
     * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) from where the CSS should be removed. Defaults to 0 (the top-level frame).
     *
     * @supported Chrome
     */
    frameId?: number;
    /**
     * If matchAboutBlank is true, then the code is also removed from about:blank and about:srcdoc frames if your extension has access to its parent document. By default it is `false`.
     *
     * @supported Chrome
     */
    matchAboutBlank?: boolean;
    /**
     * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of the CSS to remove. Defaults to `"author"`.
     *
     * @supported Chrome
     */
    cssOrigin?: CSSOrigin;
}
/**
 * @supported Chrome
 */
export type FrameType = "outermost_frame" | "fenced_frame" | "sub_frame";
/**
 * @supported Chrome
 */
export type DocumentLifecycle = "prerender" | "active" | "cached" | "pending_deletion";
/**
 * @supported Chrome, Firefox
 */
export type ExecutionWorld = "ISOLATED" | "MAIN" | "USER_SCRIPT";

}

export namespace fileBrowserHandler {
/**
 * @supported Chrome
 */
export interface FileHandlerExecuteEventDetails {
    /**
     * Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser).
     *
     * @supported Chrome
     */
    entries: /* TODO: Upstream type uses any */ any[];
    /**
     * The ID of the tab that raised this event. Tab IDs are unique within a browser session.
     *
     * @supported Chrome
     */
    tab_id?: number;
}
/**
 * @supported Chrome
 */
export const onExecute: events.Event<(
      id: string,
      details: FileHandlerExecuteEventDetails,
    ) => void>;

}

export namespace fileHandlers {
/**
 * @supported Chrome
 */
export interface Icon {
    /**
     * URL from which a user agent can fetch image data.
     *
     * @supported Chrome
     */
    src: string;
    /**
     * Multiple space-separated size values to also accommodate image formats that can act as containers for multiple images of varying dimensions: e.g. "16x16", "16x16 32x32".
     *
     * @supported Chrome
     */
    sizes?: string;
    /**
     * MIME type is purely advisory with no default value.
     *
     * @supported Chrome
     */
    type?: string;
}
/**
 * @supported Chrome
 */
export interface FileHandler {
    /**
     * A mapping of one or more MIME types to one or more file extensions. e.g. "accept": {"text/csv": ".csv"} or {"text/csv": \[".csv", ".txt"\]}.
     *
     * @since Chrome 110
     *
     * @supported Chrome
     */
    accept: {[name: string]: /* TODO: Upstream type uses any */ any};
    /**
     * Specifies the url after the origin that is the navigation destination for file handling launches.
     *
     * @supported Chrome
     */
    action: string;
    /**
     * Description of the file type.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * Array of ImageResources. Only icons declared at the manifest level are currently supported. The icon for the extension will appear in the "Open" menu.
     *
     * @supported Chrome
     */
    icons?: Icon[];
    /**
     * Whether multiple files should be opened in a single client or multiple. Defaults to \`single-client\`, which makes all files available in only one tab. \`multiple-client\` opens a new tab for each file.
     *
     * @supported Chrome
     */
    launch_type?: string;
}

}

export namespace fileSystemProvider {
/**
 * @supported Chrome
 */
export type ProviderError = "OK" | "FAILED" | "IN_USE" | "EXISTS" | "NOT_FOUND" | "ACCESS_DENIED" | "TOO_MANY_OPENED" | "NO_MEMORY" | "NO_SPACE" | "NOT_A_DIRECTORY" | "INVALID_OPERATION" | "SECURITY" | "ABORT" | "NOT_A_FILE" | "NOT_EMPTY" | "INVALID_URL" | "IO";
/**
 * @supported Chrome
 */
export type OpenFileMode = "READ" | "WRITE";
/**
 * @supported Chrome
 */
export type ChangeType = "CHANGED" | "DELETED";
/**
 * @supported Chrome
 */
export type CommonActionId = "SAVE_FOR_OFFLINE" | "OFFLINE_NOT_NECESSARY" | "SHARE";
/**
 * @supported Chrome
 */
export interface CloudIdentifier {
    /**
     * Identifier for the cloud storage provider (e.g. 'drive.google.com').
     *
     * @supported Chrome
     */
    providerName: string;
    /**
     * The provider's identifier for the given file/directory.
     *
     * @supported Chrome
     */
    id: string;
}
/**
 * @supported Chrome
 */
export interface CloudFileInfo {
    /**
     * A tag that represents the version of the file.
     *
     * @supported Chrome
     */
    versionTag?: string;
}
/**
 * @supported Chrome
 */
export interface EntryMetadata {
    /**
     * True if it is a directory. Must be provided if requested in `options`.
     *
     * @supported Chrome
     */
    isDirectory?: boolean;
    /**
     * Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`.
     *
     * @supported Chrome
     */
    name?: string;
    /**
     * File size in bytes. Must be provided if requested in `options`.
     *
     * @supported Chrome
     */
    size?: number;
    /**
     * The last modified time of this entry. Must be provided if requested in `options`.
     *
     * @supported Chrome
     */
    modificationTime?: Date;
    /**
     * Mime type for the entry. Always optional, but should be provided if requested in `options`.
     *
     * @supported Chrome
     */
    mimeType?: string;
    /**
     * Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the {@link onGetMetadataRequested} event.
     *
     * @supported Chrome
     */
    thumbnail?: string;
    /**
     * Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested.
     *
     * @since Chrome 117
     *
     * @supported Chrome
     */
    cloudIdentifier?: CloudIdentifier;
    /**
     * Information that identifies a specific file in the underlying cloud file system. Must be provided if requested in `options` and the file is backed by cloud storage.
     *
     * @since Chrome 125
     *
     * @supported Chrome
     */
    cloudFileInfo?: CloudFileInfo;
}
/**
 * @supported Chrome
 */
export interface Watcher {
    /**
     * The path of the entry being observed.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * Whether watching should include all child entries recursively. It can be true for directories only.
     *
     * @supported Chrome
     */
    recursive: boolean;
    /**
     * Tag used by the last notification for the watcher.
     *
     * @supported Chrome
     */
    lastTag?: string;
}
/**
 * @supported Chrome
 */
export interface OpenedFile {
    /**
     * A request ID to be be used by consecutive read/write and close requests.
     *
     * @supported Chrome
     */
    openRequestId: number;
    /**
     * The path of the opened file.
     *
     * @supported Chrome
     */
    filePath: string;
    /**
     * Whether the file was opened for reading or writing.
     *
     * @supported Chrome
     */
    mode: OpenFileMode;
}
/**
 * @supported Chrome
 */
export interface FileSystemInfo {
    /**
     * The identifier of the file system.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * A human-readable name for the file system.
     *
     * @supported Chrome
     */
    displayName: string;
    /**
     * Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).
     *
     * @supported Chrome
     */
    writable: boolean;
    /**
     * The maximum number of files that can be opened at once. If 0, then not limited.
     *
     * @supported Chrome
     */
    openedFilesLimit: number;
    /**
     * List of currently opened files.
     *
     * @supported Chrome
     */
    openedFiles: OpenedFile[];
    /**
     * Whether the file system supports the `tag` field for observing directories.
     *
     * @since Chrome 45
     *
     * @supported Chrome
     */
    supportsNotifyTag?: boolean;
    /**
     * List of watchers.
     *
     * @since Chrome 45
     *
     * @supported Chrome
     */
    watchers: Watcher[];
}
/**
 * @supported Chrome
 */
export interface MountOptions {
    /**
     * The string indentifier of the file system. Must be unique per each extension.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * A human-readable name for the file system.
     *
     * @supported Chrome
     */
    displayName: string;
    /**
     * Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).
     *
     * @supported Chrome
     */
    writable?: boolean;
    /**
     * The maximum number of files that can be opened at once. If not specified, or 0, then not limited.
     *
     * @supported Chrome
     */
    openedFilesLimit?: number;
    /**
     * Whether the file system supports the `tag` field for observed directories.
     *
     * @since Chrome 45
     *
     * @supported Chrome
     */
    supportsNotifyTag?: boolean;
    /**
     * Whether the framework should resume the file system at the next sign-in session. True by default.
     *
     * @since Chrome 64
     *
     * @supported Chrome
     */
    persistent?: boolean;
}
/**
 * @supported Chrome
 */
export interface UnmountOptions {
    /**
     * The identifier of the file system to be unmounted.
     *
     * @supported Chrome
     */
    fileSystemId: string;
}
/**
 * @supported Chrome
 */
export interface UnmountRequestedOptions {
    /**
     * The identifier of the file system to be unmounted.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
}
/**
 * @supported Chrome
 */
export interface GetMetadataRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the entry to fetch metadata about.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * Set to `true` if `is_directory` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    isDirectory: boolean;
    /**
     * Set to `true` if `name` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    name: boolean;
    /**
     * Set to `true` if `size` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    size: boolean;
    /**
     * Set to `true` if `modificationTime` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    modificationTime: boolean;
    /**
     * Set to `true` if `mimeType` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    mimeType: boolean;
    /**
     * Set to `true` if `thumbnail` value is requested.
     *
     * @supported Chrome
     */
    thumbnail: boolean;
    /**
     * Set to `true` if `cloudIdentifier` value is requested.
     *
     * @since Chrome 117
     *
     * @supported Chrome
     */
    cloudIdentifier: boolean;
    /**
     * Set to `true` if `cloudFileInfo` value is requested.
     *
     * @since Chrome 125
     *
     * @supported Chrome
     */
    cloudFileInfo: boolean;
}
/**
 * @supported Chrome
 */
export interface GetActionsRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * List of paths of entries for the list of actions.
     *
     * @since Chrome 47
     *
     * @supported Chrome
     */
    entryPaths: string[];
}
/**
 * @supported Chrome
 */
export interface ReadDirectoryRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the directory which contents are requested.
     *
     * @supported Chrome
     */
    directoryPath: string;
    /**
     * Set to `true` if `is_directory` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    isDirectory: boolean;
    /**
     * Set to `true` if `name` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    name: boolean;
    /**
     * Set to `true` if `size` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    size: boolean;
    /**
     * Set to `true` if `modificationTime` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    modificationTime: boolean;
    /**
     * Set to `true` if `mimeType` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    mimeType: boolean;
    /**
     * Set to `true` if `thumbnail` value is requested.
     *
     * @since Chrome 49
     *
     * @supported Chrome
     */
    thumbnail: boolean;
}
/**
 * @supported Chrome
 */
export interface OpenFileRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * A request ID which will be used by consecutive read/write and close requests.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the file to be opened.
     *
     * @supported Chrome
     */
    filePath: string;
    /**
     * Whether the file will be used for reading or writing.
     *
     * @supported Chrome
     */
    mode: OpenFileMode;
}
/**
 * @supported Chrome
 */
export interface CloseFileRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * A request ID used to open the file.
     *
     * @supported Chrome
     */
    openRequestId: number;
}
/**
 * @supported Chrome
 */
export interface ReadFileRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * A request ID used to open the file.
     *
     * @supported Chrome
     */
    openRequestId: number;
    /**
     * Position in the file (in bytes) to start reading from.
     *
     * @supported Chrome
     */
    offset: number;
    /**
     * Number of bytes to be returned.
     *
     * @supported Chrome
     */
    length: number;
}
/**
 * @supported Chrome
 */
export interface CreateDirectoryRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the directory to be created.
     *
     * @supported Chrome
     */
    directoryPath: string;
    /**
     * Whether the operation is recursive (for directories only).
     *
     * @supported Chrome
     */
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface DeleteEntryRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the entry to be deleted.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * Whether the operation is recursive (for directories only).
     *
     * @supported Chrome
     */
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface CreateFileRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the file to be created.
     *
     * @supported Chrome
     */
    filePath: string;
}
/**
 * @supported Chrome
 */
export interface CopyEntryRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The source path of the entry to be copied.
     *
     * @supported Chrome
     */
    sourcePath: string;
    /**
     * The destination path for the copy operation.
     *
     * @supported Chrome
     */
    targetPath: string;
}
/**
 * @supported Chrome
 */
export interface MoveEntryRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The source path of the entry to be moved into a new place.
     *
     * @supported Chrome
     */
    sourcePath: string;
    /**
     * The destination path for the copy operation.
     *
     * @supported Chrome
     */
    targetPath: string;
}
/**
 * @supported Chrome
 */
export interface TruncateRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the file to be truncated.
     *
     * @supported Chrome
     */
    filePath: string;
    /**
     * Number of bytes to be retained after the operation completes.
     *
     * @supported Chrome
     */
    length: number;
}
/**
 * @supported Chrome
 */
export interface WriteFileRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * A request ID used to open the file.
     *
     * @supported Chrome
     */
    openRequestId: number;
    /**
     * Position in the file (in bytes) to start writing the bytes from.
     *
     * @supported Chrome
     */
    offset: number;
    /**
     * Buffer of bytes to be written to the file.
     *
     * @supported Chrome
     */
    data: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface AbortRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * An ID of the request to be aborted.
     *
     * @supported Chrome
     */
    operationRequestId: number;
}
/**
 * @supported Chrome
 */
export interface AddWatcherRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the entry to be observed.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * Whether observing should include all child entries recursively. It can be true for directories only.
     *
     * @supported Chrome
     */
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface RemoveWatcherRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The path of the watched entry.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * Mode of the watcher.
     *
     * @supported Chrome
     */
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface Action {
    /**
     * The identifier of the action. Any string or {@link CommonActionId} for common actions.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The title of the action. It may be ignored for common actions.
     *
     * @supported Chrome
     */
    title?: string;
}
/**
 * @supported Chrome
 */
export interface ExecuteActionRequestedOptions {
    /**
     * The identifier of the file system related to this operation.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The set of paths of the entries to be used for the action.
     *
     * @since Chrome 47
     *
     * @supported Chrome
     */
    entryPaths: string[];
    /**
     * The identifier of the action to be executed.
     *
     * @supported Chrome
     */
    actionId: string;
}
/**
 * @supported Chrome
 */
export interface Change {
    /**
     * The path of the changed entry.
     *
     * @supported Chrome
     */
    entryPath: string;
    /**
     * The type of the change which happened to the entry.
     *
     * @supported Chrome
     */
    changeType: ChangeType;
    /**
     * Information relating to the file if backed by a cloud file system.
     *
     * @since Chrome 125
     *
     * @supported Chrome
     */
    cloudFileInfo?: CloudFileInfo;
}
/**
 * @supported Chrome
 */
export interface NotifyOptions {
    /**
     * The identifier of the file system related to this change.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The path of the observed entry.
     *
     * @supported Chrome
     */
    observedPath: string;
    /**
     * Mode of the observed entry.
     *
     * @supported Chrome
     */
    recursive: boolean;
    /**
     * The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries.
     *
     * @supported Chrome
     */
    changeType: ChangeType;
    /**
     * List of changes to entries within the observed directory (including the entry itself)
     *
     * @supported Chrome
     */
    changes?: Change[];
    /**
     * Tag for the notification. Required if the file system was mounted with the `supportsNotifyTag` option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown.
     *
     * @supported Chrome
     */
    tag?: string;
}
/**
 * @supported Chrome
 */
export interface ConfigureRequestedOptions {
    /**
     * The identifier of the file system to be configured.
     *
     * @supported Chrome
     */
    fileSystemId: string;
    /**
     * The unique identifier of this request.
     *
     * @supported Chrome
     */
    requestId: number;
}
/**
 * @supported Chrome
 */
export const onUnmountRequested: events.Event<(
      options: UnmountRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onGetMetadataRequested: events.Event<(
      options: GetMetadataRequestedOptions,
      successCallback: (
        metadata: EntryMetadata,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onGetActionsRequested: events.Event<(
      options: GetActionsRequestedOptions,
      successCallback: (
        actions: Action[],
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onReadDirectoryRequested: events.Event<(
      options: ReadDirectoryRequestedOptions,
      successCallback: (
        entries: EntryMetadata[],
        hasMore: boolean,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onOpenFileRequested: events.Event<(
      options: OpenFileRequestedOptions,
      successCallback: (
        /**
         * @since Chrome 125
         */
        metadata?: EntryMetadata,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onCloseFileRequested: events.Event<(
      options: CloseFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onReadFileRequested: events.Event<(
      options: ReadFileRequestedOptions,
      successCallback: (
        data: ArrayBuffer,
        hasMore: boolean,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onCreateDirectoryRequested: events.Event<(
      options: CreateDirectoryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onDeleteEntryRequested: events.Event<(
      options: DeleteEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onCreateFileRequested: events.Event<(
      options: CreateFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onCopyEntryRequested: events.Event<(
      options: CopyEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onMoveEntryRequested: events.Event<(
      options: MoveEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onTruncateRequested: events.Event<(
      options: TruncateRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onWriteFileRequested: events.Event<(
      options: WriteFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onAbortRequested: events.Event<(
      options: AbortRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onConfigureRequested: events.Event<(
      options: ConfigureRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onMountRequested: events.Event<(
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onAddWatcherRequested: events.Event<(
      options: AddWatcherRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onRemoveWatcherRequested: events.Event<(
      options: RemoveWatcherRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onExecuteActionRequested: events.Event<(
      options: ExecuteActionRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;
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
export interface FontName {
    /**
     * The font ID.
     *
     * @supported Chrome
     */
    fontId: string;
    /**
     * The display name of the font.
     *
     * @supported Chrome
     */
    displayName: string;
}
/**
 * @supported Chrome
 */
export type ScriptCode = "Afak" | "Arab" | "Armi" | "Armn" | "Avst" | "Bali" | "Bamu" | "Bass" | "Batk" | "Beng" | "Blis" | "Bopo" | "Brah" | "Brai" | "Bugi" | "Buhd" | "Cakm" | "Cans" | "Cari" | "Cham" | "Cher" | "Cirt" | "Copt" | "Cprt" | "Cyrl" | "Cyrs" | "Deva" | "Dsrt" | "Dupl" | "Egyd" | "Egyh" | "Egyp" | "Elba" | "Ethi" | "Geor" | "Geok" | "Glag" | "Goth" | "Gran" | "Grek" | "Gujr" | "Guru" | "Hang" | "Hani" | "Hano" | "Hans" | "Hant" | "Hebr" | "Hluw" | "Hmng" | "Hung" | "Inds" | "Ital" | "Java" | "Jpan" | "Jurc" | "Kali" | "Khar" | "Khmr" | "Khoj" | "Knda" | "Kpel" | "Kthi" | "Lana" | "Laoo" | "Latf" | "Latg" | "Latn" | "Lepc" | "Limb" | "Lina" | "Linb" | "Lisu" | "Loma" | "Lyci" | "Lydi" | "Mand" | "Mani" | "Maya" | "Mend" | "Merc" | "Mero" | "Mlym" | "Moon" | "Mong" | "Mroo" | "Mtei" | "Mymr" | "Narb" | "Nbat" | "Nkgb" | "Nkoo" | "Nshu" | "Ogam" | "Olck" | "Orkh" | "Orya" | "Osma" | "Palm" | "Perm" | "Phag" | "Phli" | "Phlp" | "Phlv" | "Phnx" | "Plrd" | "Prti" | "Rjng" | "Roro" | "Runr" | "Samr" | "Sara" | "Sarb" | "Saur" | "Sgnw" | "Shaw" | "Shrd" | "Sind" | "Sinh" | "Sora" | "Sund" | "Sylo" | "Syrc" | "Syre" | "Syrj" | "Syrn" | "Tagb" | "Takr" | "Tale" | "Talu" | "Taml" | "Tang" | "Tavt" | "Telu" | "Teng" | "Tfng" | "Tglg" | "Thaa" | "Thai" | "Tibt" | "Tirh" | "Ugar" | "Vaii" | "Visp" | "Wara" | "Wole" | "Xpeo" | "Xsux" | "Yiii" | "Zmth" | "Zsym" | "Zyyy";
/**
 * @supported Chrome
 */
export type GenericFamily = "standard" | "sansserif" | "serif" | "fixed" | "cursive" | "fantasy" | "math";
/**
 * @supported Chrome
 */
export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";
/**
 * @supported Chrome
 */
export const onFontChanged: events.Event<(
      details: {

        /**
         * The font ID. See the description in `getFont`.
         */
        fontId: string,

        /**
         * The script code for which the font setting has changed.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font setting has changed.
         */
        genericFamily: GenericFamily,

        /**
         * The level of control this extension has over the setting.
         */
        levelOfControl: LevelOfControl,
      },
    ) => void>;
/**
 * @supported Chrome
 */
export const onDefaultFontSizeChanged: events.Event<(
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
    ) => void>;
/**
 * @supported Chrome
 */
export const onDefaultFixedFontSizeChanged: events.Event<(
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
    ) => void>;
/**
 * @supported Chrome
 */
export const onMinimumFontSizeChanged: events.Event<(
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
    ) => void>;
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
export const MAX_MESSAGE_SIZE: 4096;
/**
 * @supported Chrome
 */
export const onMessage: events.Event<(
      message: {

        /**
         * The message data.
         */
        data: {[name: string]: string},

        /**
         * The sender who issued the message.
         */
        from?: string,

        /**
         * The collapse key of a message. See the [Non-collapsible and collapsible messages](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages) for details.
         */
        collapseKey?: string,
      },
    ) => void>;
/**
 * @supported Chrome
 */
export const onMessagesDeleted: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onSendError: events.Event<(
      error: {

        /**
         * The error message describing the problem.
         */
        errorMessage: string,

        /**
         * The ID of the message with this error, if error is related to a specific message.
         */
        messageId?: string,

        /**
         * Additional details related to the error, when available.
         */
        details: {[name: string]: string},
      },
    ) => void>;
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
 * @supported Chrome, Firefox
 */
export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";
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
    url?: string;
    /**
     * The title of the page when it was last loaded.
     *
     * @supported Chrome, Firefox
     */
    title?: string;
    /**
     * When this page was last loaded, represented in milliseconds since the epoch.
     *
     * @supported Chrome, Firefox
     */
    lastVisitTime?: number;
    /**
     * The number of times the user has navigated to this page.
     *
     * @supported Chrome, Firefox
     */
    visitCount?: number;
    /**
     * The number of times the user has navigated to this page by typing in the address.
     *
     * @supported Chrome, Firefox
     */
    typedCount?: number;
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
    visitTime?: number;
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
    /** @supported Chrome */
    isLocal: boolean;
}
/**
 * @supported Chrome
 */
export interface UrlDetails {
    /**
     * The URL for the operation. It must be in the format as returned from a call to `history.search()`.
     *
     * @supported Chrome
     */
    url: string;
}
/**
 * @supported Chrome, Firefox
 */
export const onVisited: events.Event<(
      result: HistoryItem,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onVisitRemoved: events.Event<(removed: { allHistory: boolean; urls?: string[] }) => void>;
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
 * @supported Chrome, Firefox
 */
export function deleteAll(): Promise<void>;
/**
 * @supported Chrome
 */
export function deleteAll(

      callback?: () => void,
    ): void;

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
 * @supported Chrome, Firefox
 */
export function getMessage(messageName: string, substitutions?: string | number | (string | number)[]): string;
/**
 * @supported Chrome, Firefox
 */
export function getUILanguage(): string;
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
 * @supported Chrome
 */
export type AccountStatus = "SYNC" | "ANY";
/**
 * @supported Chrome
 */
export interface ProfileDetails {
    /**
     * A status of the primary account signed into a profile whose `ProfileUserInfo` should be returned. Defaults to `SYNC` account status.
     *
     * @supported Chrome
     */
    accountStatus?: AccountStatus;
}
/**
 * @supported Chrome
 */
export interface ProfileUserInfo {
    /**
     * An email address for the user account signed into the current profile. Empty if the user is not signed in or the `identity.email` manifest permission is not specified.
     *
     * @supported Chrome
     */
    email: string;
    /**
     * A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the `identity.email` manifest permission is not specified.
     *
     * @supported Chrome
     */
    id: string;
}
/**
 * @supported Chrome
 */
export interface TokenDetails {
    /**
     * Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is `true`, `getAuthToken` will prompt the user as necessary. When the flag is `false` or omitted, `getAuthToken` will return failure any time a prompt would be required.
     *
     * @supported Chrome
     */
    interactive?: boolean;
    /**
     * The account ID whose token should be returned. If not specified, the function will use an account from the Chrome profile: the Sync account if there is one, or otherwise the first Google web account.
     *
     * @supported Chrome
     */
    account?: AccountInfo;
    /**
     * A list of OAuth2 scopes to request.
     *
     * When the `scopes` field is present, it overrides the list of scopes specified in manifest.json.
     *
     * @supported Chrome
     */
    scopes?: string[];
    /**
     * The `enableGranularPermissions` flag allows extensions to opt-in early to the granular permissions consent screen, in which requested permissions are granted or denied individually.
     *
     * @since Chrome 87
     *
     * @supported Chrome
     */
    enableGranularPermissions?: boolean;
}
/**
 * @supported Chrome
 */
export interface InvalidTokenDetails {
    /**
     * The specific token that should be removed from the cache.
     *
     * @supported Chrome
     */
    token: string;
}
/**
 * @supported Chrome
 */
export interface WebAuthFlowDetails {
    /**
     * The URL that initiates the auth flow.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * Whether to launch auth flow in interactive mode.
     *
     * Since some auth flows may immediately redirect to a result URL, `launchWebAuthFlow` hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.
     *
     * If the `interactive` flag is `true`, the window will be displayed when a page load completes. If the flag is `false` or omitted, `launchWebAuthFlow` will return with an error if the initial navigation does not complete the flow.
     *
     * For flows that use JavaScript for redirection, `abortOnLoadForNonInteractive` can be set to `false` in combination with setting `timeoutMsForNonInteractive` to give the page a chance to perform any redirects.
     *
     * @supported Chrome
     */
    interactive?: boolean;
    /**
     * Whether to terminate `launchWebAuthFlow` for non-interactive requests after the page loads. This parameter does not affect interactive flows.
     *
     * When set to `true` (default) the flow will terminate immediately after the page loads. When set to `false`, the flow will only terminate after the `timeoutMsForNonInteractive` passes. This is useful for identity providers that use JavaScript to perform redirections after the page loads.
     *
     * @since Chrome 113
     *
     * @supported Chrome
     */
    abortOnLoadForNonInteractive?: boolean;
    /**
     * The maximum amount of time, in miliseconds, `launchWebAuthFlow` is allowed to run in non-interactive mode in total. Only has an effect if `interactive` is `false`.
     *
     * @since Chrome 113
     *
     * @supported Chrome
     */
    timeoutMsForNonInteractive?: number;
}
/**
 * @supported Chrome
 */
export interface GetAuthTokenResult {
    /**
     * The specific token associated with the request.
     *
     * @supported Chrome
     */
    token?: string;
    /**
     * A list of OAuth2 scopes granted to the extension.
     *
     * @supported Chrome
     */
    grantedScopes?: string[];
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
 * @supported Chrome
 */
export function getAccounts(

      callback?: (
        accounts: AccountInfo[],
      ) => void,
    ): void;
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
 * @supported Chrome, Firefox
 */
export function getRedirectURL(

      path?: string,
    ): string;

}

export namespace idle {
/**
 * @supported Chrome, Firefox
 */
export type IdleState = "active" | "idle" | "locked";
/**
 * @supported Chrome, Firefox
 */
export const onStateChanged: events.Event<(
      newState: IdleState,
    ) => void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export function setDetectionInterval(

      intervalInSeconds: number,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function getAutoLockDelay(): Promise<number>;
/**
 * @supported Chrome
 * @platform chromeos
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

export namespace incognito {
/**
 * @supported Chrome
 */
export type IncognitoMode = "split" | "spanning" | "not_allowed";

}

export namespace input.ime {
/**
 * @supported Chrome
 * @platform chromeos
 */
export type KeyboardEventType = "keyup" | "keydown";
/**
 * @supported Chrome
 * @platform chromeos
 */
export interface KeyboardEvent {
    /**
     * One of keyup or keydown.
     *
     * @supported Chrome
     * @platform chromeos
     */
    type: KeyboardEventType;
    /**
     * (Deprecated) The ID of the request. Use the `requestId` param from the `onKeyEvent` event instead.
     *
     * @supported Chrome
     * @platform chromeos
     */
    requestId?: string;
    /**
     * The extension ID of the sender of this keyevent.
     *
     * @supported Chrome
     * @platform chromeos
     */
    extensionId?: string;
    /**
     * Value of the key being pressed
     *
     * @supported Chrome
     * @platform chromeos
     */
    key: string;
    /**
     * Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
     *
     * @supported Chrome
     * @platform chromeos
     */
    code: string;
    /**
     * The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
     *
     * @supported Chrome
     * @platform chromeos
     */
    keyCode?: number;
    /**
     * Whether or not the ALT key is pressed.
     *
     * @supported Chrome
     * @platform chromeos
     */
    altKey?: boolean;
    /**
     * Whether or not the ALTGR key is pressed.
     *
     * @since Chrome 79
     *
     * @supported Chrome
     * @platform chromeos
     */
    altgrKey?: boolean;
    /**
     * Whether or not the CTRL key is pressed.
     *
     * @supported Chrome
     * @platform chromeos
     */
    ctrlKey?: boolean;
    /**
     * Whether or not the SHIFT key is pressed.
     *
     * @supported Chrome
     * @platform chromeos
     */
    shiftKey?: boolean;
    /**
     * Whether or not the CAPS\_LOCK is enabled.
     *
     * @supported Chrome
     * @platform chromeos
     */
    capsLock?: boolean;
}
/**
 * @supported Chrome
 * @platform chromeos
 */
export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password" | "null";
/**
 * @supported Chrome
 * @platform chromeos
 */
export type AutoCapitalizeType = "characters" | "words" | "sentences";
/**
 * @supported Chrome
 * @platform chromeos
 */
export interface InputContext {
    /**
     * This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called.
     *
     * @supported Chrome
     * @platform chromeos
     */
    contextID: number;
    /**
     * Type of value this text field edits, (Text, Number, URL, etc)
     *
     * @supported Chrome
     * @platform chromeos
     */
    type: InputContextType;
    /**
     * Whether the text field wants auto-correct.
     *
     * @supported Chrome
     * @platform chromeos
     */
    autoCorrect: boolean;
    /**
     * Whether the text field wants auto-complete.
     *
     * @supported Chrome
     * @platform chromeos
     */
    autoComplete: boolean;
    /**
     * The auto-capitalize type of the text field.
     *
     * @since Chrome 69
     *
     * @supported Chrome
     * @platform chromeos
     */
    autoCapitalize: AutoCapitalizeType;
    /**
     * Whether the text field wants spell-check.
     *
     * @supported Chrome
     * @platform chromeos
     */
    spellCheck: boolean;
    /**
     * Whether text entered into the text field should be used to improve typing suggestions for the user.
     *
     * @since Chrome 68
     *
     * @supported Chrome
     * @platform chromeos
     */
    shouldDoLearning: boolean;
}
/**
 * @supported Chrome
 * @platform chromeos
 */
export type MenuItemStyle = "check" | "radio" | "separator";
/**
 * @supported Chrome
 * @platform chromeos
 */
export interface MenuItem {
    /**
     * String that will be passed to callbacks referencing this MenuItem.
     *
     * @supported Chrome
     * @platform chromeos
     */
    id: string;
    /**
     * Text displayed in the menu for this item.
     *
     * @supported Chrome
     * @platform chromeos
     */
    label?: string;
    /**
     * The type of menu item.
     *
     * @supported Chrome
     * @platform chromeos
     */
    style?: MenuItemStyle;
    /**
     * Indicates this item is visible.
     *
     * @supported Chrome
     * @platform chromeos
     */
    visible?: boolean;
    /**
     * Indicates this item should be drawn with a check.
     *
     * @supported Chrome
     * @platform chromeos
     */
    checked?: boolean;
    /**
     * Indicates this item is enabled.
     *
     * @supported Chrome
     * @platform chromeos
     */
    enabled?: boolean;
}
/**
 * @supported Chrome
 * @platform chromeos
 */
export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";
/**
 * @supported Chrome
 * @platform chromeos
 */
export type WindowPosition = "cursor" | "composition";
/**
 * @supported Chrome
 * @platform chromeos
 */
export type ScreenType = "normal" | "login" | "lock" | "secondary-login";
/**
 * @supported Chrome
 * @platform chromeos
 */
export type MouseButton = "left" | "middle" | "right";
/**
 * @supported Chrome
 * @platform chromeos
 */
export type AssistiveWindowType = "undo";
/**
 * @supported Chrome
 * @platform chromeos
 */
export interface AssistiveWindowProperties {
    /**
     * @supported Chrome
     * @platform chromeos
     */
    type: AssistiveWindowType;
    /**
     * Sets true to show AssistiveWindow, sets false to hide.
     *
     * @supported Chrome
     * @platform chromeos
     */
    visible: boolean;
    /**
     * Strings for ChromeVox to announce.
     *
     * @supported Chrome
     * @platform chromeos
     */
    announceString?: string;
}
/**
 * @supported Chrome
 * @platform chromeos
 */
export type AssistiveWindowButton = "undo" | "addToDictionary";
/**
 * @supported Chrome
 * @platform chromeos
 */
export interface MenuParameters {
    /**
     * ID of the engine to use.
     *
     * @supported Chrome
     * @platform chromeos
     */
    engineID: string;
    /**
     * MenuItems to add or update. They will be added in the order they exist in the array.
     *
     * @supported Chrome
     * @platform chromeos
     */
    items: MenuItem[];
}
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onActivate: events.Event<(
      engineID: string,
      screen: ScreenType,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onDeactivated: events.Event<(
      engineID: string,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onFocus: events.Event<(
      context: InputContext,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onBlur: events.Event<(
      contextID: number,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onInputContextUpdate: events.Event<(
      context: InputContext,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onKeyEvent: events.Event<(
      /**
       * @since Chrome 70
       */
      engineID: string,
      /**
       * @since Chrome 70
       */
      keyData: KeyboardEvent,
      /**
       * @since Chrome 79
       */
      requestId: string,
    ) => boolean | undefined>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onCandidateClicked: events.Event<(
      engineID: string,
      candidateID: number,
      button: MouseButton,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onMenuItemActivated: events.Event<(
      engineID: string,
      name: string,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onSurroundingTextChanged: events.Event<(
      engineID: string,
      surroundingInfo: {

        /**
         * The text around the cursor. This is only a subset of all text in the input field.
         */
        text: string,

        /**
         * The ending position of the selection. This value indicates caret position if there is no selection.
         */
        focus: number,

        /**
         * The beginning position of the selection. This value indicates caret position if there is no selection.
         */
        anchor: number,

        /**
         * The offset position of `text`. Since `text` only includes a subset of text around the cursor, offset indicates the absolute position of the first character of `text`.
         *
         * @since Chrome 46
         */
        offset: number,
      },
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onReset: events.Event<(
      engineID: string,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export const onAssistiveWindowButtonClicked: events.Event<(
      details: {

        /**
         * The ID of the button clicked.
         */
        buttonID: AssistiveWindowButton,

        /**
         * The type of the assistive window.
         */
        windowType: AssistiveWindowType,
      },
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
 */
export function hideInputView(): void;
/**
 * @supported Chrome
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
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
 * @platform chromeos
 */
export function setMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function setMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function updateMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function updateMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos
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
 * @platform chromeos
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
/**
 * @supported Chrome
 * @platform chromeos
 */
export function keyEventHandled(

      requestId: string,

      response: boolean,
    ): void;

}

export namespace instanceID {
/**
 * @supported Chrome
 */
export const onTokenRefresh: events.Event<() => void>;
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
export type ProfileType = "SIGNIN_PROFILE" | "USER_PROFILE" | "LOCK_PROFILE";
/**
 * @supported Chrome
 */
export type SessionState = "UNKNOWN" | "IN_OOBE_SCREEN" | "IN_LOGIN_SCREEN" | "IN_SESSION" | "IN_LOCK_SCREEN" | "IN_RMA_SCREEN";
/**
 * @supported Chrome
 */
export const onSessionStateChanged: events.Event<(
      sessionState: SessionState,
    ) => void>;
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
 * @supported Chrome
 */
export type LaunchType = "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN";
/**
 * @supported Chrome, Firefox
 */
export type ExtensionDisabledReason = "unknown" | "permissions_increase";
/**
 * @supported Chrome, Firefox
 */
export type ExtensionType = "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme" | "login_screen_extension";
/**
 * @supported Chrome, Firefox
 */
export type ExtensionInstallType = "admin" | "development" | "normal" | "sideload" | "other";
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
    shortName: string;
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
    versionName?: string;
    /**
     * Whether this extension can be disabled or uninstalled by the user.
     *
     * @supported Chrome, Firefox
     */
    mayDisable: boolean;
    /**
     * Whether this extension can be enabled by the user. This is only returned for extensions which are not enabled.
     *
     * @since Chrome 62
     *
     * @supported Chrome
     */
    mayEnable?: boolean;
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
    disabledReason?: ExtensionDisabledReason;
    /** @supported Chrome */
    isApp: boolean;
    /**
     * The type of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    type: ExtensionType;
    /**
     * The launch url (only present for apps).
     *
     * @supported Chrome
     */
    appLaunchUrl?: string;
    /**
     * The URL of the homepage of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    homepageUrl?: string;
    /**
     * The update URL of this extension, app, or theme.
     *
     * @supported Chrome, Firefox
     */
    updateUrl?: string;
    /** @supported Chrome */
    offlineEnabled: boolean;
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
    icons?: IconInfo[];
    /** @supported Chrome, Firefox */
    permissions: string[];
    /** @supported Chrome, Firefox */
    hostPermissions: string[];
    /**
     * How the extension was installed.
     *
     * @supported Chrome, Firefox
     */
    installType: ExtensionInstallType;
    /**
     * The app launch type (only present for apps).
     *
     * @supported Chrome
     */
    launchType?: LaunchType;
    /**
     * The currently available launch types (only present for apps).
     *
     * @supported Chrome
     */
    availableLaunchTypes?: LaunchType[];
}
/**
 * @supported Chrome
 */
export interface UninstallOptions {
    /**
     * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
     *
     * @supported Chrome
     */
    showConfirmDialog?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const onInstalled: events.Event<(
      info: ExtensionInfo,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUninstalled: events.Event<(id: string) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onEnabled: events.Event<(
      info: ExtensionInfo,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onDisabled: events.Event<(
      info: ExtensionInfo,
    ) => void>;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @platform chromeos, linux, mac, win
 */
export function installReplacementWebApp(): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function installReplacementWebApp(

      callback?: () => void,
    ): void;

}

export namespace manifestTypes {
/**
 * @supported Chrome
 */
export interface ChromeSettingsOverrides {
    /**
     * New value for the homepage.
     *
     * @supported Chrome
     */
    homepage?: string;
    /**
     * A search engine
     *
     * @supported Chrome
     */
    search_provider?: {

        /**
         * Name of the search engine displayed to user. This may only be omitted if _prepopulated\_id_ is set.
         */
        name?: string,

        /**
         * Omnibox keyword for the search engine. This may only be omitted if _prepopulated\_id_ is set.
         */
        keyword?: string,

        /**
         * An icon URL for the search engine. This may only be omitted if _prepopulated\_id_ is set.
         */
        favicon_url?: string,

        /**
         * An search URL used by the search engine.
         */
        search_url: string,

        /**
         * Encoding of the search term. This may only be omitted if _prepopulated\_id_ is set.
         */
        encoding?: string,

        /**
         * If omitted, this engine does not support suggestions.
         */
        suggest_url?: string,

        /**
         * If omitted, this engine does not support image search.
         */
        image_url?: string,

        /**
         * The string of post parameters to search\_url
         */
        search_url_post_params?: string,

        /**
         * The string of post parameters to suggest\_url
         */
        suggest_url_post_params?: string,

        /**
         * The string of post parameters to image\_url
         */
        image_url_post_params?: string,

        /**
         * A list of URL patterns that can be used, in addition to `search_url`.
         */
        alternate_urls?: string[],

        /**
         * An ID of the built-in search engine in Chrome.
         */
        prepopulated_id?: number,

        /**
         * Specifies if the search provider should be default.
         */
        is_default: boolean,
      };
    /**
     * An array of length one containing a URL to be used as the startup page.
     *
     * @supported Chrome
     */
    startup_pages?: string[];
}
/**
 * @supported Chrome
 */
export type FileSystemProviderSource = "file" | "device" | "network";
/**
 * @supported Chrome
 */
export interface FileSystemProviderCapabilities {
    /**
     * Whether configuring via `onConfigureRequested` is supported. By default: `false`.
     *
     * @supported Chrome
     */
    configurable?: boolean;
    /**
     * Whether multiple (more than one) mounted file systems are supported. By default: `false`.
     *
     * @supported Chrome
     */
    multiple_mounts?: boolean;
    /**
     * Whether setting watchers and notifying about changes is supported. By default: `false`.
     *
     * @since Chrome 45
     *
     * @supported Chrome
     */
    watchable?: boolean;
    /**
     * Source of data for mounted file systems.
     *
     * @supported Chrome
     */
    source: FileSystemProviderSource;
}

}

export namespace mimeHandler {
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface StreamInfo {
    /**
     * The MIME type of the intercepted content.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    mimeType: string;
    /**
     * The original URL the user navigated to.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    originalUrl: string;
    /**
     * The URL to fetch the stream data from.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    streamUrl: string;
    /**
     * The tab ID containing the document.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    tabId: number;
    /**
     * HTTP response headers as key-value pairs.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    responseHeaders: {[name: string]: /* TODO: Upstream type uses any */ any};
    /**
     * True if loaded in an embedded context (iframe/embed/object).
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    embedded: boolean;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface MimeHandlerOptions {
    /**
     * Whether this handler is active for the given MIME type.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    enabled: boolean;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getStreamInfo(): Promise<StreamInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getStreamInfo(

      callback?: (
        info: StreamInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function abortAndFallbackToNativeHandler(): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function abortAndFallbackToNativeHandler(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setMimeHandlerOptions(

      mimeType: string,

      options: MimeHandlerOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setMimeHandlerOptions(

      mimeType: string,

      options: MimeHandlerOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getMimeHandlerOptions(

      mimeType: string,
    ): Promise<MimeHandlerOptions>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getMimeHandlerOptions(

      mimeType: string,

      callback?: (
        options: MimeHandlerOptions,
      ) => void,
    ): void;

}

export namespace notifications {
/**
 * @supported Chrome, Firefox
 */
export type TemplateType = "basic" | "image" | "list" | "progress";
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
 * @supported Chrome
 */
export interface NotificationBitmap {}
/**
 * @supported Chrome
 */
export interface NotificationButton {
    /** @supported Chrome */
    title: string;
    /**
     * @deprecated Button icons not visible for Mac OS X users.
     * @chrome-deprecated-since Chrome 59
     *
     * @supported Chrome
     */
    iconUrl?: string;
}
/**
 * @supported Chrome
 */
export interface NotificationOptions {
    /**
     * Which type of notification to display. _Required for {@link notifications.create}_ method.
     *
     * @supported Chrome
     */
    type?: TemplateType;
    /**
     * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
     *
     * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file
     *
     * **Note:**This value is required for the {@link notifications.create}`()` method.
     *
     * @supported Chrome
     */
    iconUrl?: string;
    /**
     * A URL to the app icon mask. URLs have the same restrictions as {@link notifications.NotificationOptions.iconUrl iconUrl}.
     *
     * The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
     *
     * @deprecated The app icon mask is not visible for Mac OS X users.
     * @chrome-deprecated-since Chrome 59
     *
     * @supported Chrome
     */
    appIconMaskUrl?: string;
    /**
     * Title of the notification (e.g. sender name for email).
     *
     * **Note:**This value is required for the {@link notifications.create}`()` method.
     *
     * @supported Chrome
     */
    title?: string;
    /**
     * Main notification content.
     *
     * **Note:**This value is required for the {@link notifications.create}`()` method.
     *
     * @supported Chrome
     */
    message?: string;
    /**
     * Alternate notification content with a lower-weight font.
     *
     * @supported Chrome
     */
    contextMessage?: string;
    /**
     * Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. On platforms that don't support a notification center (Windows, Linux & Mac), -2 and -1 result in an error as notifications with those priorities will not be shown at all.
     *
     * @supported Chrome
     */
    priority?: number;
    /**
     * A timestamp associated with the notification, in milliseconds past the epoch (e.g. `Date.now() + n`).
     *
     * @supported Chrome
     */
    eventTime?: number;
    /**
     * Text and icons for up to two notification action buttons.
     *
     * @supported Chrome
     */
    buttons?: NotificationButton[];
    /**
     * A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as {@link notifications.NotificationOptions.iconUrl iconUrl}.
     *
     * @deprecated The image is not visible for Mac OS X users.
     * @chrome-deprecated-since Chrome 59
     *
     * @supported Chrome
     */
    imageUrl?: string;
    /**
     * Items for multi-item notifications. Users on Mac OS X only see the first item.
     *
     * @supported Chrome
     */
    items?: NotificationItem[];
    /**
     * Current progress ranges from 0 to 100.
     *
     * @supported Chrome
     */
    progress?: number;
    /**
     * @deprecated This UI hint is ignored as of Chrome 67
     * @chrome-deprecated-since Chrome 67
     *
     * @supported Chrome
     */
    isClickable?: boolean;
    /**
     * Indicates that the notification should remain visible on screen until the user activates or dismisses the notification. This defaults to false.
     *
     * @since Chrome 50
     *
     * @supported Chrome
     */
    requireInteraction?: boolean;
    /**
     * Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
     *
     * @since Chrome 70
     *
     * @supported Chrome
     */
    silent?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const onClosed: events.Event<(
      notificationId: string,
      byUser: boolean,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onClicked: events.Event<(
      notificationId: string,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onButtonClicked: events.Event<(
      notificationId: string,
      buttonIndex: number,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onPermissionLevelChanged: events.Event<(level: PermissionLevel) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onShowSettings: events.Event<() => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome
 */
export function getPermissionLevel(

      callback?: (
        level: PermissionLevel,
      ) => void,
    ): void;
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
    /** @supported Chrome */
    buttons?: NotificationButton[];
    /** @supported Chrome */
    requireInteraction?: boolean;
    /** @supported Chrome */
    silent?: boolean;
}

}

export namespace oauth2 {
/**
 * @supported Chrome
 */
export interface OAuth2Info {
    /**
     * Client ID of the corresponding extension/app.
     *
     * @supported Chrome
     */
    client_id?: string;
    /**
     * Scopes the extension/app needs access to.
     *
     * @supported Chrome
     */
    scopes: string[];
}

}

export namespace offscreen {
/**
 * @supported Chrome
 */
export type Reason = "TESTING" | "AUDIO_PLAYBACK" | "IFRAME_SCRIPTING" | "DOM_SCRAPING" | "BLOBS" | "DOM_PARSER" | "USER_MEDIA" | "DISPLAY_MEDIA" | "WEB_RTC" | "CLIPBOARD" | "LOCAL_STORAGE" | "WORKERS" | "BATTERY_STATUS" | "MATCH_MEDIA" | "GEOLOCATION";
/**
 * @supported Chrome
 */
export interface CreateParameters {
    /**
     * The reason(s) the extension is creating the offscreen document.
     *
     * @supported Chrome
     */
    reasons: Reason[];
    /**
     * The (relative) URL to load in the document.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * A developer-provided string that explains, in more detail, the need for the background context. The user agent \_may\_ use this in display to the user.
     *
     * @supported Chrome
     */
    justification: string;
}
/**
 * @supported Chrome
 */
export function createDocument(

      parameters: CreateParameters,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function createDocument(

      parameters: CreateParameters,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function closeDocument(): Promise<void>;
/**
 * @supported Chrome
 */
export function closeDocument(

      callback?: () => void,
    ): void;
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
 * @supported Chrome, Firefox
 */
export type DescriptionStyleType = "url" | "match" | "dim";
/**
 * @supported Chrome, Firefox
 */
export type OnInputEnteredDisposition = "currentTab" | "newForegroundTab" | "newBackgroundTab";
/**
 * @supported Chrome, Firefox
 */
export interface SuggestResult {
    /** @supported Chrome, Firefox */
    description: string;
    /** @supported Chrome, Firefox */
    content: string;
    /** @supported Chrome */
    deletable?: boolean;
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
export const onInputStarted: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputChanged: events.Event<(
      text: string,
      /**
       * @param suggestResults Array of suggest results
       */
      suggest: (
        suggestResults: SuggestResult[],
      ) => void,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputEntered: events.Event<(
      text: string,
      disposition: OnInputEnteredDisposition,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInputCancelled: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onDeleteSuggestion: events.Event<(
      text: string,
    ) => void>;
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
 * @supported Chrome, Firefox
 */
export interface Permissions {
    /**
     * List of named permissions (does not include hosts or origins).
     *
     * @supported Chrome, Firefox
     */
    permissions?: string[];
    /**
     * The list of host permissions, including those specified in the `optional_permissions` or `permissions` keys in the manifest, and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
     *
     * @supported Chrome, Firefox
     */
    origins?: string[];
}
/**
 * @supported Chrome, Firefox
 */
export const onAdded: events.Event<(
      permissions: Permissions,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: events.Event<(
      permissions: Permissions,
    ) => void>;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
export interface Match {
    /** @supported Chrome */
    certificate: ArrayBuffer;
    /** @supported Chrome */
    keyAlgorithm: KeyAlgorithm;
}
/**
 * @supported Chrome
 */
export type ClientCertificateType = "rsaSign" | "ecdsaSign";
/**
 * @supported Chrome
 */
export interface ClientCertificateRequest {
    /**
     * This field is a list of the types of certificates requested, sorted in order of the server's preference. Only certificates of a type contained in this list will be retrieved. If `certificateTypes` is the empty list, however, certificates of any type will be returned.
     *
     * @supported Chrome
     */
    certificateTypes: ClientCertificateType[];
    /**
     * List of distinguished names of certificate authorities allowed by the server. Each entry must be a DER-encoded X.509 DistinguishedName.
     *
     * @supported Chrome
     */
    certificateAuthorities: ArrayBuffer[];
}
/**
 * @supported Chrome
 */
export interface SelectDetails {
    /**
     * Only certificates that match this request will be returned.
     *
     * @supported Chrome
     */
    request: ClientCertificateRequest;
    /**
     * If given, the `selectClientCertificates` operates on this list. Otherwise, obtains the list of all certificates from the platform's certificate stores that are available to this extensions. Entries that the extension doesn't have permission for or which doesn't match the request, are removed.
     *
     * @supported Chrome
     */
    clientCerts?: ArrayBuffer[];
    /**
     * If true, the filtered list is presented to the user to manually select a certificate and thereby granting the extension access to the certificate(s) and key(s). Only the selected certificate(s) will be returned. If is false, the list is reduced to all certificates that the extension has been granted access to (automatically or manually).
     *
     * @supported Chrome
     */
    interactive: boolean;
}
/**
 * @supported Chrome
 */
export interface VerificationDetails {
    /**
     * Each chain entry must be the DER encoding of a X.509 certificate, the first entry must be the server certificate and each entry must certify the entry preceding it.
     *
     * @supported Chrome
     */
    serverCertificateChain: ArrayBuffer[];
    /**
     * The hostname of the server to verify the certificate for, e.g. the server that presented the `serverCertificateChain`.
     *
     * @supported Chrome
     */
    hostname: string;
}
/**
 * @supported Chrome
 */
export interface VerificationResult {
    /**
     * The result of the trust verification: true if trust for the given verification details could be established and false if trust is rejected for any reason.
     *
     * @supported Chrome
     */
    trusted: boolean;
    /**
     * If the trust verification failed, this array contains the errors reported by the underlying network layer. Otherwise, this array is empty.
     *
     * **Note:** This list is meant for debugging only and may not contain all relevant errors. The errors returned may change in future revisions of this API, and are not guaranteed to be forwards or backwards compatible.
     *
     * @supported Chrome
     */
    debug_errors: string[];
}
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
export function getKeyPair(certificate: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void): void;
/**
 * @supported Chrome
 */
export function getKeyPairBySpki(publicKeySpkiDer: ArrayBuffer, parameters: Record<string, unknown>, callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void): void;
/**
 * @supported Chrome
 */
export function subtleCrypto(): SubtleCrypto;
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

}

export namespace power {
/**
 * @supported Chrome
 */
export type Level = "system" | "display";
/**
 * @supported Chrome
 */
export function requestKeepAwake(

      level: Level,
    ): void;
/**
 * @supported Chrome
 */
export function releaseKeepAwake(): void;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function reportActivity(): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos
 */
export function reportActivity(

      callback?: () => void,
    ): void;

}

export namespace printerProvider {
/**
 * @supported Chrome
 */
export type PrintError = "OK" | "FAILED" | "INVALID_TICKET" | "INVALID_DATA";
/**
 * @supported Chrome
 */
export interface PrinterInfo {
    /**
     * Unique printer ID.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * Printer's human readable name.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * Printer's human readable description.
     *
     * @supported Chrome
     */
    description?: string;
}
/**
 * @supported Chrome
 */
export interface PrintJob {
    /**
     * ID of the printer which should handle the job.
     *
     * @supported Chrome
     */
    printerId: string;
    /**
     * The print job title.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Print ticket in [CJT format](https://developers.google.com/cloud-print/docs/cdd#cjt).
     *
     * The CJT reference is marked as deprecated. It is deprecated for Google Cloud Print only. is not deprecated for ChromeOS printing.
     *
     * @supported Chrome
     */
    ticket: {[name: string]: /* TODO: Upstream type uses any */ any};
    /**
     * The document content type. Supported formats are `"application/pdf"` and `"image/pwg-raster"`.
     *
     * @supported Chrome
     */
    contentType: string;
    /**
     * Blob containing the document data to print. Format must match `contentType`.
     *
     * @supported Chrome
     */
    document: Blob;
}
/**
 * @supported Chrome
 */
export const onGetPrintersRequested: events.Event<(
      resultCallback: (
        printerInfo: PrinterInfo[],
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onGetUsbPrinterInfoRequested: events.Event<(
      device: usb.Device,
      resultCallback: (
        printerInfo?: PrinterInfo,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onGetCapabilityRequested: events.Event<(
      printerId: string,
      /**
       * @param capabilities Device capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd).
       */
      resultCallback: (
        capabilities: {[name: string]: /* TODO: Upstream type uses any */ any},
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onPrintRequested: events.Event<(
      printJob: PrintJob,
      resultCallback: (
        result: PrintError,
      ) => void,
    ) => void>;

}

export namespace printing {
/**
 * @supported Chrome
 */
export interface SubmitJobRequest {
    /**
     * The print job to be submitted. Supported content types are "application/pdf" and "image/png". The [Cloud Job Ticket](https://developers.google.com/cloud-print/docs/cdd#cjt) shouldn't include `FitToPageTicketItem`, `PageRangeTicketItem` and `ReverseOrderTicketItem` fields since they are irrelevant for native printing. `VendorTicketItem` is optional. All other fields must be present.
     *
     * @supported Chrome
     */
    job: printerProvider.PrintJob;
}
/**
 * @supported Chrome
 */
export type SubmitJobStatus = "OK" | "USER_REJECTED";
/**
 * @supported Chrome
 */
export interface SubmitJobResponse {
    /**
     * The status of the request.
     *
     * @supported Chrome
     */
    status: SubmitJobStatus;
    /**
     * The id of created print job. This is a unique identifier among all print jobs on the device. If status is not OK, jobId will be null.
     *
     * @supported Chrome
     */
    jobId?: string;
}
/**
 * @supported Chrome
 */
export type PrinterSource = "USER" | "POLICY";
/**
 * @supported Chrome
 */
export interface Printer {
    /**
     * The printer's identifier; guaranteed to be unique among printers on the device.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The name of the printer.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The human-readable description of the printer.
     *
     * @supported Chrome
     */
    description: string;
    /**
     * The printer URI. This can be used by extensions to choose the printer for the user.
     *
     * @supported Chrome
     */
    uri: string;
    /**
     * The source of the printer (user or policy configured).
     *
     * @supported Chrome
     */
    source: PrinterSource;
    /**
     * The flag which shows whether the printer fits [DefaultPrinterSelection](https://chromium.org/administrators/policy-list-3#DefaultPrinterSelection) rules. Note that several printers could be flagged.
     *
     * @supported Chrome
     */
    isDefault: boolean;
    /**
     * The value showing how recent the printer was used for printing from Chrome. The lower the value is the more recent the printer was used. The minimum value is 0. Missing value indicates that the printer wasn't used recently. This value is guaranteed to be unique amongst printers.
     *
     * @supported Chrome
     */
    recentlyUsedRank?: number;
}
/**
 * @supported Chrome
 */
export type PrinterStatus = "DOOR_OPEN" | "TRAY_MISSING" | "OUT_OF_INK" | "OUT_OF_PAPER" | "OUTPUT_FULL" | "PAPER_JAM" | "GENERIC_ISSUE" | "STOPPED" | "UNREACHABLE" | "EXPIRED_CERTIFICATE" | "AVAILABLE";
/**
 * @supported Chrome
 */
export interface GetPrinterInfoResponse {
    /**
     * Printer capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd). The property may be missing.
     *
     * @supported Chrome
     */
    capabilities?: {[name: string]: /* TODO: Upstream type uses any */ any};
    /**
     * The status of the printer.
     *
     * @supported Chrome
     */
    status: PrinterStatus;
}
/**
 * @supported Chrome
 */
export type JobStatus = "PENDING" | "IN_PROGRESS" | "FAILED" | "CANCELED" | "PRINTED";
/**
 * @supported Chrome
 */
export const MAX_SUBMIT_JOB_CALLS_PER_MINUTE: 40;
/**
 * @supported Chrome
 */
export const MAX_GET_PRINTER_INFO_CALLS_PER_MINUTE: 20;
/**
 * @supported Chrome
 */
export const onJobStatusChanged: events.Event<(
      jobId: string,
      status: JobStatus,
    ) => void>;
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
export type PrintJobSource = "PRINT_PREVIEW" | "ANDROID_APP" | "EXTENSION" | "ISOLATED_WEB_APP";
/**
 * @supported Chrome
 */
export type PrintJobStatus = "FAILED" | "CANCELED" | "PRINTED";
/**
 * @supported Chrome
 */
export type PrinterSource = "USER" | "POLICY";
/**
 * @supported Chrome
 */
export type ColorMode = "BLACK_AND_WHITE" | "COLOR";
/**
 * @supported Chrome
 */
export type DuplexMode = "ONE_SIDED" | "TWO_SIDED_LONG_EDGE" | "TWO_SIDED_SHORT_EDGE";
/**
 * @supported Chrome
 */
export interface MediaSize {
    /**
     * Width (in micrometers) of the media used for printing.
     *
     * @supported Chrome
     */
    width: number;
    /**
     * Height (in micrometers) of the media used for printing.
     *
     * @supported Chrome
     */
    height: number;
    /**
     * Vendor-provided ID, e.g. "iso\_a3\_297x420mm" or "na\_index-3x5\_3x5in". Possible values are values of "media" IPP attribute and can be found on [IANA page](https://www.iana.org/assignments/ipp-registrations/ipp-registrations.xhtml) .
     *
     * @supported Chrome
     */
    vendorId: string;
}
/**
 * @supported Chrome
 */
export interface PrintSettings {
    /**
     * The requested color mode.
     *
     * @supported Chrome
     */
    color: ColorMode;
    /**
     * The requested duplex mode.
     *
     * @supported Chrome
     */
    duplex: DuplexMode;
    /**
     * The requested media size.
     *
     * @supported Chrome
     */
    mediaSize: MediaSize;
    /**
     * The requested number of copies.
     *
     * @supported Chrome
     */
    copies: number;
}
/**
 * @supported Chrome
 */
export interface Printer {
    /**
     * Displayed name of the printer.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The full path for the printer. Contains protocol, hostname, port, and queue.
     *
     * @supported Chrome
     */
    uri: string;
    /**
     * The source of the printer.
     *
     * @supported Chrome
     */
    source: PrinterSource;
}
/**
 * @supported Chrome
 */
export interface PrintJobInfo {
    /**
     * The ID of the job.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The title of the document which was printed.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Source showing who initiated the print job.
     *
     * @supported Chrome
     */
    source: PrintJobSource;
    /**
     * ID of source. Null if source is PRINT\_PREVIEW or ANDROID\_APP.
     *
     * @supported Chrome
     */
    sourceId?: string;
    /**
     * The final status of the job.
     *
     * @supported Chrome
     */
    status: PrintJobStatus;
    /**
     * The job creation time (in milliseconds past the Unix epoch).
     *
     * @supported Chrome
     */
    creationTime: number;
    /**
     * The job completion time (in milliseconds past the Unix epoch).
     *
     * @supported Chrome
     */
    completionTime: number;
    /**
     * The info about the printer which printed the document.
     *
     * @supported Chrome
     */
    printer: Printer;
    /**
     * The settings of the print job.
     *
     * @supported Chrome
     */
    settings: PrintSettings;
    /**
     * The number of pages in the document.
     *
     * @supported Chrome
     */
    numberOfPages: number;
    /**
     * The status of the printer.
     *
     * @since Chrome 85
     *
     * @supported Chrome
     */
    printer_status: printing.PrinterStatus;
}
/**
 * @supported Chrome
 */
export const onPrintJobFinished: events.Event<(
      jobInfo: PrintJobInfo,
    ) => void>;
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

export namespace privacy {
/**
 * @supported Chrome
 */
export type IPHandlingPolicy = "default" | "default_public_and_private_interfaces" | "default_public_interface_only" | "disable_non_proxied_udp";
/**
 * @supported Chrome
 */
export type AutofillBlockedType = "contact_info" | "payments" | "identity_docs" | "travel" | "all";

}

export namespace processes {
/**
 * @supported Chrome
 */
export type ProcessType = "browser" | "renderer" | "extension" | "notification" | "plugin" | "worker" | "nacl" | "service_worker" | "utility" | "gpu" | "other";
/**
 * @supported Chrome
 */
export interface TaskInfo {
    /**
     * The title of the task.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Optional tab ID, if this task represents a tab running on a renderer process.
     *
     * @supported Chrome
     */
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface Cache {
    /**
     * The size of the cache, in bytes.
     *
     * @supported Chrome
     */
    size: number;
    /**
     * The part of the cache that is utilized, in bytes.
     *
     * @supported Chrome
     */
    liveSize: number;
}
/**
 * @supported Chrome
 */
export interface Process {
    /** @supported Chrome */
    id: number;
    /** @supported Chrome */
    osProcessId: number;
    /** @supported Chrome */
    type: string;
    /** @supported Chrome */
    profile: string;
    /** @supported Chrome */
    naclDebugPort: number;
    /** @supported Chrome */
    tasks: { title: string }[];
    /** @supported Chrome */
    cpu?: number;
    /** @supported Chrome */
    network?: number;
    /** @supported Chrome */
    privateMemory?: number;
    /** @supported Chrome */
    jsMemoryAllocated?: number;
    /** @supported Chrome */
    jsMemoryUsed?: number;
    /** @supported Chrome */
    sqliteMemory?: number;
    /** @supported Chrome */
    cssCache?: { liveSize: number; size: number };
    /** @supported Chrome */
    imageCache?: { liveSize: number; size: number };
    /** @supported Chrome */
    scriptCache?: { liveSize: number; size: number };
}
/**
 * @supported Chrome
 */
export const onUpdated: events.Event<(
      processes: {[name: string]: /* TODO: Upstream type uses any */ any},
    ) => void>;
/**
 * @supported Chrome
 */
export const onUpdatedWithMemory: events.Event<(
      processes: {[name: string]: /* TODO: Upstream type uses any */ any},
    ) => void>;
/**
 * @supported Chrome
 */
export const onCreated: events.Event<(
      process: Process,
    ) => void>;
/**
 * @supported Chrome
 */
export const onUnresponsive: events.Event<(
      process: Process,
    ) => void>;
/**
 * @supported Chrome
 */
export const onExited: events.Event<(
      processId: number,
      exitType: number,
      exitCode: number,
    ) => void>;
/**
 * @supported Chrome
 */
export function getProcessIdForTab(

      tabId: number,
    ): Promise<number>;
/**
 * @supported Chrome
 */
export function getProcessIdForTab(

      tabId: number,

      /**
       * @param processId Process ID of the tab's renderer process.
       */
      callback?: (
        processId: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function terminate(

      processId: number,
    ): Promise<boolean>;
/**
 * @supported Chrome
 */
export function terminate(

      processId: number,

      /**
       * @param didTerminate True if terminating the process was successful, and false otherwise.
       */
      callback?: (
        didTerminate: boolean,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function getProcessInfo(processIds?: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>;
/**
 * @supported Chrome
 */
export function getProcessInfo(includeMemory: boolean): Promise<Record<number, Process>>;
/**
 * @supported Chrome
 */
export function getProcessInfo(processIds: number | number[], callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 */
export function getProcessInfo(processIds: number | number[], includeMemory: boolean, callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 */
export function getProcessInfo(includeMemory: boolean, callback: (processes: Record<number, Process>) => void): void;
/**
 * @supported Chrome
 */
export function getProcessInfo(callback: (processes: Record<number, Process>) => void): void;

}

export namespace protocolHandlers {
/**
 * @supported Chrome
 */
export interface ProtocolHandler {
    /**
     * A string definition of the protocol to handle.
     *
     * @supported Chrome
     */
    protocol: string;
    /**
     * A string representation of the protocol handlers, displayed to the user when prompting for permissions.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * A string representing the URL of the protocol handler (must be a localizable property).
     *
     * @supported Chrome
     */
    uriTemplate: string;
}

}

export namespace proxy {
/**
 * @supported Chrome
 */
export type Scheme = "http" | "https" | "quic" | "socks4" | "socks5";
/**
 * @supported Chrome
 */
export type Mode = "direct" | "auto_detect" | "pac_script" | "fixed_servers" | "system";
/**
 * @supported Chrome
 */
export interface ProxyServer {
    /**
     * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
     *
     * @supported Chrome
     */
    scheme?: Scheme;
    /**
     * The hostname or IP address of the proxy server. Hostnames must be in ASCII (in Punycode format). IDNA is not supported, yet.
     *
     * @supported Chrome
     */
    host: string;
    /**
     * The port of the proxy server. Defaults to a port that depends on the scheme.
     *
     * @supported Chrome
     */
    port?: number;
}
/**
 * @supported Chrome
 */
export interface ProxyRules {
    /**
     * The proxy server to be used for all per-URL requests (that is http, https, and ftp).
     *
     * @supported Chrome
     */
    singleProxy?: ProxyServer;
    /**
     * The proxy server to be used for HTTP requests.
     *
     * @supported Chrome
     */
    proxyForHttp?: ProxyServer;
    /**
     * The proxy server to be used for HTTPS requests.
     *
     * @supported Chrome
     */
    proxyForHttps?: ProxyServer;
    /**
     * The proxy server to be used for FTP requests.
     *
     * @supported Chrome
     */
    proxyForFtp?: ProxyServer;
    /**
     * The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified.
     *
     * @supported Chrome
     */
    fallbackProxy?: ProxyServer;
    /**
     * List of servers to connect to without a proxy server.
     *
     * @supported Chrome
     */
    bypassList?: string[];
}
/**
 * @supported Chrome
 */
export interface PacScript {
    /**
     * URL of the PAC file to be used.
     *
     * @supported Chrome
     */
    url?: string;
    /**
     * A PAC script.
     *
     * @supported Chrome
     */
    data?: string;
    /**
     * If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false.
     *
     * @supported Chrome
     */
    mandatory?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface ProxyConfig {
    /**
     * The proxy rules describing this configuration. Use this for 'fixed\_servers' mode.
     *
     * @supported Chrome
     */
    rules?: ProxyRules;
    /**
     * The proxy auto-config (PAC) script for this configuration. Use this for 'pac\_script' mode.
     *
     * @supported Chrome
     */
    pacScript?: PacScript;
    /** @supported Chrome */
    mode: Mode;
}
/**
 * @supported Chrome, Firefox
 */
export const settings: types.ChromeSetting<ProxyConfig>;
/**
 * @supported Chrome
 */
export const onProxyError: events.Event<(
      details: {

        /**
         * If true, the error was fatal and the network transaction was aborted. Otherwise, a direct connection is used instead.
         */
        fatal: boolean,

        /**
         * The error description.
         */
        error: string,

        /**
         * Additional details about the error such as a JavaScript runtime error.
         */
        details: string,
      },
    ) => void>;

}

export namespace readingList {
/**
 * @supported Chrome
 */
export interface ReadingListEntry {
    /**
     * The url of the entry.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The title of the entry.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Will be `true` if the entry has been read.
     *
     * @supported Chrome
     */
    hasBeenRead: boolean;
    /**
     * The last time the entry was updated. This value is in milliseconds since Jan 1, 1970.
     *
     * @supported Chrome
     */
    lastUpdateTime: number;
    /**
     * The time the entry was created. Recorded in milliseconds since Jan 1, 1970.
     *
     * @supported Chrome
     */
    creationTime: number;
}
/**
 * @supported Chrome
 */
export interface AddEntryOptions {
    /**
     * The url of the entry.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The title of the entry.
     *
     * @supported Chrome
     */
    title: string;
    /**
     * Will be `true` if the entry has been read.
     *
     * @supported Chrome
     */
    hasBeenRead: boolean;
}
/**
 * @supported Chrome
 */
export interface RemoveOptions {
    /**
     * The url to remove.
     *
     * @supported Chrome
     */
    url: string;
}
/**
 * @supported Chrome
 */
export interface UpdateEntryOptions {
    /**
     * The url that will be updated.
     *
     * @supported Chrome
     */
    url: string;
    /**
     * The new title. The existing tile remains if a value isn't provided.
     *
     * @supported Chrome
     */
    title?: string;
    /**
     * The updated read status. The existing status remains if a value isn't provided.
     *
     * @supported Chrome
     */
    hasBeenRead?: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryInfo {
    /**
     * A url to search for.
     *
     * @supported Chrome
     */
    url?: string;
    /**
     * A title to search for.
     *
     * @supported Chrome
     */
    title?: string;
    /**
     * Indicates whether to search for read (`true`) or unread (`false`) items.
     *
     * @supported Chrome
     */
    hasBeenRead?: boolean;
}
/**
 * @supported Chrome
 */
export const onEntryAdded: events.Event<(
      entry: ReadingListEntry,
    ) => void>;
/**
 * @supported Chrome
 */
export const onEntryRemoved: events.Event<(
      entry: ReadingListEntry,
    ) => void>;
/**
 * @supported Chrome
 */
export const onEntryUpdated: events.Event<(
      entry: ReadingListEntry,
    ) => void>;
/**
 * @supported Chrome
 */
export function addEntry(

      entry: AddEntryOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function addEntry(

      entry: AddEntryOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function removeEntry(

      info: RemoveOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function removeEntry(

      info: RemoveOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function updateEntry(

      info: UpdateEntryOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function updateEntry(

      info: UpdateEntryOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function query(

      info: QueryInfo,
    ): Promise<ReadingListEntry[]>;
/**
 * @supported Chrome
 */
export function query(

      info: QueryInfo,

      callback?: (
        entries: ReadingListEntry[],
      ) => void,
    ): void;

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
    /** @supported Chrome */
    documentLifecycle?: string;
    /** @supported Chrome, Firefox */
    frameId?: number;
    /** @supported Chrome, Firefox */
    id?: string;
    /** @supported Chrome */
    nativeApplication?: string;
    /** @supported Chrome */
    origin?: string;
    /** @supported Chrome, Firefox */
    tab?: tabs.Tab;
    /** @supported Chrome */
    tlsChannelId?: string;
    /** @supported Chrome, Firefox */
    url?: string;
}
/**
 * @supported Chrome, Firefox
 */
export type PlatformOs = "mac" | "win" | "android" | "cros" | "linux" | "openbsd";
/**
 * @supported Chrome, Firefox
 */
export type PlatformArch = "arm" | "arm64" | "x86-32" | "x86-64" | "mips" | "mips64" | "riscv64";
/**
 * @supported Chrome, Firefox
 */
export type PlatformNaclArch = "arm" | "x86-32" | "x86-64" | "mips" | "mips64";
/**
 * @supported Chrome, Firefox
 */
export interface PlatformInfo {
    /** @supported Chrome, Firefox */
    arch: PlatformArch;
    /** @supported Chrome */
    nacl_arch?: PlatformNaclArch;
    /** @supported Chrome, Firefox */
    os: PlatformOs;
}
/**
 * @supported Chrome, Firefox
 */
export type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";
/**
 * @supported Chrome, Firefox
 */
export type OnInstalledReason = "install" | "update" | "chrome_update" | "shared_module_update";
/**
 * @supported Chrome, Firefox
 */
export type OnRestartRequiredReason = "app_update" | "os_update" | "periodic";
/**
 * @supported Chrome, Firefox
 */
export type ContextType = "TAB" | "POPUP" | "BACKGROUND" | "OFFSCREEN_DOCUMENT" | "SIDE_PANEL" | "DEVELOPER_TOOLS";
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
    documentId?: string;
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
    documentUrl?: string;
    /**
     * The origin of the document associated with this context, or undefined if the context is not hosted in a document.
     *
     * @supported Chrome, Firefox
     */
    documentOrigin?: string;
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
    contextTypes?: ContextType[];
    /** @supported Chrome, Firefox */
    contextIds?: string[];
    /** @supported Chrome, Firefox */
    tabIds?: number[];
    /** @supported Chrome, Firefox */
    windowIds?: number[];
    /** @supported Chrome, Firefox */
    documentIds?: string[];
    /** @supported Chrome, Firefox */
    frameIds?: number[];
    /** @supported Chrome, Firefox */
    documentUrls?: string[];
    /** @supported Chrome, Firefox */
    documentOrigins?: string[];
    /** @supported Chrome, Firefox */
    incognito?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const id: string;
/**
 * @supported Chrome, Firefox
 */
export const onStartup: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onInstalled: events.Event<(details: { reason: OnInstalledReason; previousVersion?: string; id?: string }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onSuspend: events.Event<() => void>;
/**
 * @supported Chrome, Firefox
 */
export const onSuspendCanceled: events.Event<() => void>;
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
export const onConnect: events.Event<(
      port: Port,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onConnectExternal: events.Event<(
      port: Port,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUserScriptConnect: events.Event<(
      port: Port,
    ) => void>;
/**
 * @supported Chrome
 */
export const onConnectNative: events.Event<(
      port: Port,
    ) => void>;
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
 * @supported Chrome, Firefox
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Chrome
 */
export function openOptionsPage(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome, Firefox
 */
export function getManifest(): _manifest.WebExtensionManifest;
/**
 * @supported Chrome
 */
export function getVersion(): string;
/**
 * @supported Chrome, Firefox
 */
export function getURL(

      path: string,
    ): string;
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
 * @supported Chrome, Firefox
 */
export function reload(): void;
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
 * @supported Chrome, Firefox
 */
export function restart(): void;
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
export function connect(

      extensionId?: string,

      connectInfo?: {

        /**
         * Will be passed into onConnect for processes that are listening for the connection event.
         */
        name?: string,

        /**
         * Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
    ): Port;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
 */
export interface _SendMessageOptions {
    /** @supported Chrome */
    includeTlsChannelId?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface _OnInstalledDetails {
    /** @supported Chrome, Firefox */
    reason: OnInstalledReason;
    /** @supported Chrome, Firefox */
    previousVersion?: string;
    /** @supported Chrome */
    id?: string;
}
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
 * @supported Chrome
 */
export type StyleOrigin = "AUTHOR" | "USER";
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
    /** @supported Chrome */
    documentIds?: string[];
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
    css?: string;
    /**
     * The path of the CSS files to inject, relative to the extension's root directory. Exactly one of `files` and `css` must be specified.
     *
     * @supported Chrome, Firefox
     */
    files?: string[];
    /**
     * The style origin for the injection. Defaults to `'AUTHOR'`.
     *
     * @supported Chrome, Firefox
     */
    origin?: StyleOrigin;
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
    matches?: string[];
    /**
     * Excludes pages that this content script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome, Firefox
     */
    excludeMatches?: string[];
    /**
     * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
     *
     * @supported Chrome, Firefox
     */
    css?: string[];
    /**
     * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
     *
     * @supported Chrome, Firefox
     */
    js?: string[];
    /**
     * If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
     *
     * @supported Chrome, Firefox
     */
    allFrames?: boolean;
    /**
     * Indicates whether the script can be injected into frames where the URL contains an unsupported scheme; specifically: about:, data:, blob:, or filesystem:. In these cases, the URL's origin is checked to determine if the script should be injected. If the origin is `null` (as is the case for data: URLs) then the used origin is either the frame that created the current frame or the frame that initiated the navigation to this frame. Note that this may not be the parent frame.
     *
     * @since Chrome 119
     *
     * @supported Chrome, Firefox
     */
    matchOriginAsFallback?: boolean;
    /**
     * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
     *
     * @supported Chrome, Firefox
     */
    runAt?: extensionTypes.RunAt;
    /**
     * Specifies if this content script will persist into future sessions. The default is true.
     *
     * @supported Chrome, Firefox
     */
    persistAcrossSessions?: boolean;
    /**
     * The JavaScript "world" to run the script in. Defaults to `ISOLATED`.
     *
     * @since Chrome 102
     *
     * @supported Chrome, Firefox
     */
    world?: ExecutionWorld;
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
    ids?: string[];
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
 * @supported Chrome
 */
export function insertCSS(

      injection: CSSInjection,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
    maxResults?: number;
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
    tab?: tabs.Tab;
    /**
     * The {@link windows.Window}, if this entry describes a window. Either this or {@link sessions.Session.tab} will be set.
     *
     * @supported Chrome, Firefox
     */
    window?: windows.Window;
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
export const MAX_SESSION_RESULTS: 25;
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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

}

export namespace sharedModule {
/**
 * @supported Chrome
 */
export interface Import {
    /**
     * Extension ID of the shared module this extension or app depends on.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * Minimum supported version of the shared module.
     *
     * @supported Chrome
     */
    minimum_version?: string;
}
/**
 * @supported Chrome
 */
export interface Export {
    /**
     * Optional list of extension IDs explicitly allowed to import this Shared Module's resources. If no allowlist is given, all extensions are allowed to import it.
     *
     * @supported Chrome
     */
    allowlist?: string[];
}

}

export namespace sidePanel {
/**
 * @supported Chrome
 */
export interface SidePanel {
    /**
     * Developer specified path for side panel display.
     *
     * @supported Chrome
     */
    default_path: string;
}
/**
 * @supported Chrome
 */
export type Side = "left" | "right";
/**
 * @supported Chrome
 */
export interface PanelLayout {
    /** @supported Chrome */
    side: Side;
}
/**
 * @supported Chrome
 */
export interface PanelOptions {
    /**
     * If specified, the side panel options will only apply to the tab with this id. If omitted, these options set the default behavior (used for any tab that doesn't have specific settings). Note: if the same path is set for this tabId and the default tabId, then the panel for this tabId will be a different instance than the panel for the default tabId.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The path to the side panel HTML file to use. This must be a local resource within the extension package.
     *
     * @supported Chrome
     */
    path?: string;
    /**
     * Whether the side panel should be enabled. This is optional. The default value is true.
     *
     * @supported Chrome
     */
    enabled?: boolean;
}
/**
 * @supported Chrome
 */
export interface PanelBehavior {
    /**
     * Whether clicking the extension's icon will toggle showing the extension's entry in the side panel. Defaults to false.
     *
     * @supported Chrome
     */
    openPanelOnActionClick?: boolean;
}
/**
 * @supported Chrome
 */
export interface GetPanelOptions {
    /**
     * If specified, the side panel options for the given tab will be returned. Otherwise, returns the default side panel options (used for any tab that doesn't have specific settings).
     *
     * @supported Chrome
     */
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface OpenOptions {
    /**
     * The window in which to open the side panel. This is only applicable if the extension has a global (non-tab-specific) side panel or `tabId` is also specified. This will override any currently-active global side panel the user has open in the given window. At least one of this or `tabId` must be provided.
     *
     * @supported Chrome
     */
    windowId?: number;
    /**
     * The tab in which to open the side panel. If the corresponding tab has a tab-specific side panel, the panel will only be open for that tab. If there is not a tab-specific panel, the global panel will be open in the specified tab and any other tabs without a currently-open tab- specific panel. This will override any currently-active side panel (global or tab-specific) in the corresponding tab. At least one of this or `windowId` must be provided.
     *
     * @supported Chrome
     */
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface CloseOptions {
    /**
     * The window in which to close the side panel. If a global side panel is open in the specified window, it will be closed for all tabs in that window where no tab-specific panel is active. At least one of this or `tabId` must be provided.
     *
     * @supported Chrome
     */
    windowId?: number;
    /**
     * The tab in which to close the side panel. If a tab-specific side panel is open in the specified tab, it will be closed for that tab. If only the global side panel is open, the promise returned by the call to `close()` will reject with an error. This behavior was changed in Chrome 145, with prior versions falling back to closing the global panel. At least one of this or `windowId` must be provided.
     *
     * @supported Chrome
     */
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface PanelOpenedInfo {
    /**
     * The ID of the window where the side panel is opened. This is available for both global and tab-specific panels.
     *
     * @supported Chrome
     */
    windowId: number;
    /**
     * The optional ID of the tab where the side panel is opened. This is provided only when the panel is tab-specific.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The path of the local resource within the extension package whose content is displayed in the panel.
     *
     * @supported Chrome
     */
    path: string;
}
/**
 * @supported Chrome
 */
export interface PanelClosedInfo {
    /**
     * The ID of the window where the side panel was closed. This is available for both global and tab-specific panels.
     *
     * @supported Chrome
     */
    windowId: number;
    /**
     * The optional ID of the tab where the side panel was closed. This is provided only when the panel is tab-specific.
     *
     * @supported Chrome
     */
    tabId?: number;
    /**
     * The path of the local resource within the extension package whose content is displayed in the panel.
     *
     * @supported Chrome
     */
    path: string;
}
/**
 * @supported Chrome
 */
export const onOpened: events.Event<(
      info: PanelOpenedInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export const onClosed: events.Event<(
      info: PanelClosedInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export function setOptions(

      options: PanelOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setOptions(

      options: PanelOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getOptions(

      options: GetPanelOptions,
    ): Promise<PanelOptions>;
/**
 * @supported Chrome
 */
export function getOptions(

      options: GetPanelOptions,

      callback?: (
        options: PanelOptions,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function setPanelBehavior(

      behavior: PanelBehavior,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setPanelBehavior(

      behavior: PanelBehavior,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getPanelBehavior(): Promise<PanelBehavior>;
/**
 * @supported Chrome
 */
export function getPanelBehavior(

      callback?: (
        behavior: PanelBehavior,
      ) => void,
    ): void;
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

export namespace sockets.tcp {
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketProperties {
    /**
     * Flag indicating if the socket is left open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent?: boolean;
    /**
     * An application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. The default value is 4096.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bufferSize?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface CreateInfo {
    /**
     * The ID of the newly created socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export type DnsQueryType = "any" | "ipv4" | "ipv6";
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SendInfo {
    /**
     * The result code returned from the underlying network call. A negative value indicates an error.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    resultCode: number;
    /**
     * The number of bytes sent (if result == 0)
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bytesSent?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface TLSVersionConstraints {
    /**
     * The minimum and maximum acceptable versions of TLS. Supported values are `tls1.2` or `tls1.3`.
     *
     * The values `tls1` and `tls1.1` are no longer supported. If `min` is set to one of these values, it will be silently clamped to `tls1.2`. If `max` is set to one of those values, or any other unrecognized value, it will be silently ignored.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    min?: string;
    /**
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    max?: string;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SecureOptions {
    /**
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    tlsVersion?: TLSVersionConstraints;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketInfo {
    /**
     * The socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * Flag indicating whether the socket is left open when the application is suspended (see `SocketProperties.persistent`).
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent: boolean;
    /**
     * Application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. If no buffer size has been specified explictly, the value is not provided.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bufferSize?: number;
    /**
     * Flag indicating whether a connected socket blocks its peer from sending more data (see `setPaused`).
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    paused: boolean;
    /**
     * Flag indicating whether the socket is connected to a remote peer.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    connected: boolean;
    /**
     * If the underlying socket is connected, contains its local IPv4/6 address.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localAddress?: string;
    /**
     * If the underlying socket is connected, contains its local port.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localPort?: number;
    /**
     * If the underlying socket is connected, contains the peer/ IPv4/6 address.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    peerAddress?: string;
    /**
     * If the underlying socket is connected, contains the peer port.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    peerPort?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface ReceiveInfo {
    /**
     * The socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The data received, with a maxium size of `bufferSize`.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    data: ArrayBuffer;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface ReceiveErrorInfo {
    /**
     * The socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The result code returned from the underlying network call.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    resultCode: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setKeepAlive(

      socketId: number,

      enable: boolean,

      delay: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setKeepAlive(

      socketId: number,

      enable: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setNoDelay(

      socketId: number,

      noDelay: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function connect(

      socketId: number,

      peerAddress: string,

      peerPort: number,

      dnsQueryType: DnsQueryType,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function connect(

      socketId: number,

      peerAddress: string,

      peerPort: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function disconnect(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function secure(

      socketId: number,

      options: SecureOptions,

      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function secure(

      socketId: number,

      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function send(

      socketId: number,

      data: ArrayBuffer,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

}

export namespace sockets.tcpServer {
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketProperties {
    /**
     * Flag indicating if the socket remains open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent?: boolean;
    /**
     * An application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface CreateInfo {
    /**
     * The ID of the newly created server socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketInfo {
    /**
     * The socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * Flag indicating if the socket remains open when the event page of the application is unloaded (see `SocketProperties.persistent`). The default value is "false".
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent: boolean;
    /**
     * Application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
    /**
     * Flag indicating whether connection requests on a listening socket are dispatched through the `onAccept` event or queued up in the listen queue backlog. See `setPaused`. The default value is "false".
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    paused: boolean;
    /**
     * If the socket is listening, contains its local IPv4/6 address.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localAddress?: string;
    /**
     * If the socket is listening, contains its local port.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localPort?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface AcceptInfo {
    /**
     * The server socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The client socket identifier, i.e. the socket identifier of the newly established connection. This socket identifier should be used only with functions from the `chrome.sockets.tcp` namespace. Note the client socket is initially paused and must be explictly un-paused by the application to start receiving data.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    clientSocketId: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface AcceptErrorInfo {
    /**
     * The server socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The result code returned from the underlying network call.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    resultCode: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onAccept: events.Event<(
      info: AcceptInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onAcceptError: events.Event<(
      info: AcceptErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function listen(

      socketId: number,

      address: string,

      port: number,

      backlog: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function listen(

      socketId: number,

      address: string,

      port: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function disconnect(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

}

export namespace sockets.udp {
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketProperties {
    /**
     * Flag indicating if the socket is left open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent?: boolean;
    /**
     * An application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. If the buffer is too small to receive the UDP packet, data is lost. The default value is 4096.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bufferSize?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface CreateInfo {
    /**
     * The ID of the newly created socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export type DnsQueryType = "any" | "ipv4" | "ipv6";
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SendInfo {
    /**
     * The result code returned from the underlying network call. A negative value indicates an error.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    resultCode: number;
    /**
     * The number of bytes sent (if result == 0)
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bytesSent?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface SocketInfo {
    /**
     * The socket identifier.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * Flag indicating whether the socket is left open when the application is suspended (see `SocketProperties.persistent`).
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    persistent: boolean;
    /**
     * Application-defined string associated with the socket.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. If no buffer size has been specified explictly, the value is not provided.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    bufferSize?: number;
    /**
     * Flag indicating whether the socket is blocked from firing onReceive events.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    paused: boolean;
    /**
     * If the underlying socket is bound, contains its local IPv4/6 address.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localAddress?: string;
    /**
     * If the underlying socket is bound, contains its local port.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    localPort?: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface ReceiveInfo {
    /**
     * The socket ID.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The UDP packet content (truncated to the current buffer size).
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    data: ArrayBuffer;
    /**
     * The address of the host the packet comes from.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    remoteAddress: string;
    /**
     * The port of the host the packet comes from.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    remotePort: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface ReceiveErrorInfo {
    /**
     * The socket ID.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    socketId: number;
    /**
     * The result code returned from the underlying recvfrom() call.
     *
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    resultCode: number;
}
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function bind(

      socketId: number,

      address: string,

      port: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function send(

      socketId: number,

      data: ArrayBuffer,

      address: string,

      port: number,

      dnsQueryType: DnsQueryType,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function send(

      socketId: number,

      data: ArrayBuffer,

      address: string,

      port: number,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function joinGroup(

      socketId: number,

      address: string,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function leaveGroup(

      socketId: number,

      address: string,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setMulticastTimeToLive(

      socketId: number,

      ttl: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setMulticastLoopbackMode(

      socketId: number,

      enabled: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getJoinedGroups(

      socketId: number,
    ): Promise<string[]>;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function getJoinedGroups(

      socketId: number,

      /**
       * @param groups Array of groups the socket joined.
       */
      callback?: (
        groups: string[],
      ) => void,
    ): void;
/**
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export function setBroadcast(

      socketId: number,

      enabled: boolean,

      /**
       * @param result The result code returned from the underlying network call.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

}

export namespace storage {
/**
 * @supported Chrome
 */
export type AccessLevel = "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS";
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
    /** @supported Chrome */
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }, callback?: () => void): Promise<void>;
    /** @supported Chrome, Firefox */
    onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;
}
/**
 * @supported Chrome, Firefox
 */
export const sync: StorageArea & {

      /**
       * The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES: 102400,

      /**
       * The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES_PER_ITEM: 8192,

      /**
       * The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_ITEMS: 512,

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_WRITE_OPERATIONS_PER_HOUR: 1800,

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_WRITE_OPERATIONS_PER_MINUTE: 120,

      /**
       * @deprecated The storage.sync API no longer has a sustained write operation quota.
       */
      MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000,
    };
/**
 * @supported Chrome, Firefox
 */
export const local: StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or a rejected Promise if using async/await.
       */
      QUOTA_BYTES: 10485760,
    };
/**
 * @supported Chrome, Firefox
 */
export const managed: StorageArea;
/**
 * @supported Chrome, Firefox
 */
export const session: StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES: 10485760,
    };
/**
 * @supported Chrome, Firefox
 */
export const onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void>;

}

export namespace system.cpu {
/**
 * @supported Chrome
 */
export interface CpuTime {
    /**
     * The cumulative time used by userspace programs on this processor.
     *
     * @supported Chrome
     */
    user: number;
    /**
     * The cumulative time used by kernel programs on this processor.
     *
     * @supported Chrome
     */
    kernel: number;
    /**
     * The cumulative time spent idle by this processor.
     *
     * @supported Chrome
     */
    idle: number;
    /**
     * The total cumulative time for this processor. This value is equal to user + kernel + idle.
     *
     * @supported Chrome
     */
    total: number;
}
/**
 * @supported Chrome
 */
export interface ProcessorInfo {
    /**
     * Cumulative usage info for this logical processor.
     *
     * @supported Chrome
     */
    usage: CpuTime;
}
/**
 * @supported Chrome
 */
export interface CpuInfo {
    /**
     * The number of logical processors.
     *
     * @supported Chrome
     */
    numOfProcessors: number;
    /**
     * The architecture name of the processors.
     *
     * @supported Chrome
     */
    archName: string;
    /**
     * The model name of the processors.
     *
     * @supported Chrome
     */
    modelName: string;
    /**
     * A set of feature codes indicating some of the processor's capabilities. The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4\_1", "sse4\_2", and "avx".
     *
     * @supported Chrome
     */
    features: string[];
    /**
     * Information about each logical processor.
     *
     * @supported Chrome
     */
    processors: ProcessorInfo[];
    /**
     * List of CPU temperature readings from each thermal zone of the CPU. Temperatures are in degrees Celsius.
     *
     * **Currently supported on Chrome OS only.**
     *
     * @since Chrome 60
     *
     * @supported Chrome
     */
    temperatures: number[];
}
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
export interface Bounds {
    /**
     * The x-coordinate of the upper-left corner.
     *
     * @supported Chrome
     */
    left: number;
    /**
     * The y-coordinate of the upper-left corner.
     *
     * @supported Chrome
     */
    top: number;
    /**
     * The width of the display in pixels.
     *
     * @supported Chrome
     */
    width: number;
    /**
     * The height of the display in pixels.
     *
     * @supported Chrome
     */
    height: number;
}
/**
 * @supported Chrome
 */
export interface Insets {
    /**
     * The x-axis distance from the left bound.
     *
     * @supported Chrome
     */
    left: number;
    /**
     * The y-axis distance from the top bound.
     *
     * @supported Chrome
     */
    top: number;
    /**
     * The x-axis distance from the right bound.
     *
     * @supported Chrome
     */
    right: number;
    /**
     * The y-axis distance from the bottom bound.
     *
     * @supported Chrome
     */
    bottom: number;
}
/**
 * @supported Chrome
 */
export interface Point {
    /**
     * The x-coordinate of the point.
     *
     * @supported Chrome
     */
    x: number;
    /**
     * The y-coordinate of the point.
     *
     * @supported Chrome
     */
    y: number;
}
/**
 * @supported Chrome
 */
export interface TouchCalibrationPair {
    /**
     * The coordinates of the display point.
     *
     * @supported Chrome
     */
    displayPoint: Point;
    /**
     * The coordinates of the touch point corresponding to the display point.
     *
     * @supported Chrome
     */
    touchPoint: Point;
}
/**
 * @supported Chrome
 */
export interface TouchCalibrationPairQuad {
    /**
     * First pair of touch and display point required for touch calibration.
     *
     * @supported Chrome
     */
    pair1: TouchCalibrationPair;
    /**
     * Second pair of touch and display point required for touch calibration.
     *
     * @supported Chrome
     */
    pair2: TouchCalibrationPair;
    /**
     * Third pair of touch and display point required for touch calibration.
     *
     * @supported Chrome
     */
    pair3: TouchCalibrationPair;
    /**
     * Fourth pair of touch and display point required for touch calibration.
     *
     * @supported Chrome
     */
    pair4: TouchCalibrationPair;
}
/**
 * @supported Chrome
 */
export interface DisplayMode {
    /**
     * The display mode width in device independent (user visible) pixels.
     *
     * @supported Chrome
     */
    width: number;
    /**
     * The display mode height in device independent (user visible) pixels.
     *
     * @supported Chrome
     */
    height: number;
    /**
     * The display mode width in native pixels.
     *
     * @supported Chrome
     */
    widthInNativePixels: number;
    /**
     * The display mode height in native pixels.
     *
     * @supported Chrome
     */
    heightInNativePixels: number;
    /**
     * The display mode UI scale factor.
     *
     * @deprecated Use {@link displayZoomFactor}
     * @chrome-deprecated-since Chrome 70
     *
     * @supported Chrome
     */
    uiScale?: number;
    /**
     * The display mode device scale factor.
     *
     * @supported Chrome
     */
    deviceScaleFactor: number;
    /**
     * The display mode refresh rate in hertz.
     *
     * @since Chrome 67
     *
     * @supported Chrome
     */
    refreshRate: number;
    /**
     * True if the mode is the display's native mode.
     *
     * @supported Chrome
     */
    isNative: boolean;
    /**
     * True if the display mode is currently selected.
     *
     * @supported Chrome
     */
    isSelected: boolean;
    /**
     * True if this mode is interlaced, false if not provided.
     *
     * @since Chrome 74
     *
     * @supported Chrome
     */
    isInterlaced?: boolean;
}
/**
 * @supported Chrome
 */
export type LayoutPosition = "top" | "right" | "bottom" | "left";
/**
 * @supported Chrome
 */
export interface DisplayLayout {
    /**
     * The unique identifier of the display.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The unique identifier of the parent display. Empty if this is the root.
     *
     * @supported Chrome
     */
    parentId: string;
    /**
     * The layout position of this display relative to the parent. This will be ignored for the root.
     *
     * @supported Chrome
     */
    position: LayoutPosition;
    /**
     * The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned.
     *
     * @supported Chrome
     */
    offset: number;
}
/**
 * @supported Chrome
 */
export interface Edid {
    /**
     * 3 character manufacturer code. See Sec. 3.4.1 page 21. Required in v1.4.
     *
     * @supported Chrome
     */
    manufacturerId: string;
    /**
     * 2 byte manufacturer-assigned code, Sec. 3.4.2 page 21. Required in v1.4.
     *
     * @supported Chrome
     */
    productId: string;
    /**
     * Year of manufacturer, Sec. 3.4.4 page 22. Required in v1.4.
     *
     * @supported Chrome
     */
    yearOfManufacture: number;
}
/**
 * @supported Chrome
 */
export type ActiveState = "active" | "inactive";
/**
 * @supported Chrome
 */
export interface DisplayUnitInfo {
    /**
     * The unique identifier of the display.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The user-friendly name (e.g. "HP LCD monitor").
     *
     * @supported Chrome
     */
    name: string;
    /**
     * NOTE: This is only available to ChromeOS Kiosk apps and Web UI.
     *
     * @since Chrome 67
     *
     * @supported Chrome
     */
    edid?: Edid;
    /**
     * ChromeOS only. Identifier of the display that is being mirrored if mirroring is enabled, otherwise empty. This will be set for all displays (including the display being mirrored).
     *
     * @supported Chrome
     */
    mirroringSourceId: string;
    /**
     * ChromeOS only. Identifiers of the displays to which the source display is being mirrored. Empty if no displays are being mirrored. This will be set to the same value for all displays. This must not include `mirroringSourceId`.
     *
     * @since Chrome 64
     *
     * @supported Chrome
     */
    mirroringDestinationIds: string[];
    /**
     * True if this is the primary display.
     *
     * @supported Chrome
     */
    isPrimary: boolean;
    /**
     * True if this display is enabled.
     *
     * @supported Chrome
     */
    isEnabled: boolean;
    /**
     * Active if the display is detected and used by the system.
     *
     * @since Chrome 117
     *
     * @supported Chrome
     */
    activeState: ActiveState;
    /**
     * True for all displays when in unified desktop mode. See documentation for {@link enableUnifiedDesktop}.
     *
     * @since Chrome 59
     *
     * @supported Chrome
     */
    isUnified: boolean;
    /**
     * The number of pixels per inch along the x-axis.
     *
     * @supported Chrome
     */
    dpiX: number;
    /**
     * The number of pixels per inch along the y-axis.
     *
     * @supported Chrome
     */
    dpiY: number;
    /**
     * The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. A value of -1 will be interpreted as auto-rotate when the device is in a physical tablet state.
     *
     * @supported Chrome
     */
    rotation: number;
    /**
     * The display's logical bounds.
     *
     * @supported Chrome
     */
    bounds: Bounds;
    /**
     * The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms.
     *
     * @supported Chrome
     */
    overscan: Insets;
    /**
     * The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher.
     *
     * @supported Chrome
     */
    workArea: Bounds;
    /**
     * The list of available display modes. The current mode will have isSelected=true. Only available on ChromeOS. Will be set to an empty array on other platforms.
     *
     * @since Chrome 52
     *
     * @supported Chrome
     */
    modes: DisplayMode[];
    /**
     * True if this display has a touch input device associated with it.
     *
     * @since Chrome 57
     *
     * @supported Chrome
     */
    hasTouchSupport: boolean;
    /**
     * A list of zoom factor values that can be set for the display.
     *
     * @since Chrome 67
     *
     * @supported Chrome
     */
    availableDisplayZoomFactors: number[];
    /**
     * The ratio between the display's current and default zoom. For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
     *
     * @since Chrome 65
     *
     * @supported Chrome
     */
    displayZoomFactor: number;
    /** @supported Chrome */
    isInternal: boolean;
}
/**
 * @supported Chrome
 */
export interface DisplayProperties {
    /**
     * ChromeOS only. If set to true, changes the display mode to unified desktop (see {@link enableUnifiedDesktop} for details). If set to false, unified desktop mode will be disabled. This is only valid for the primary display. If provided, mirroringSourceId must not be provided and other properties will be ignored. This is has no effect if not provided.
     *
     * @since Chrome 59
     *
     * @supported Chrome
     */
    isUnified?: boolean;
    /**
     * ChromeOS only. If set and not empty, enables mirroring for this display only. Otherwise disables mirroring for all displays. This value should indicate the id of the source display to mirror, which must not be the same as the id passed to setDisplayProperties. If set, no other property may be set.
     *
     * @deprecated Use {@link setMirrorMode}.
     * @chrome-deprecated-since Chrome 68
     *
     * @supported Chrome
     */
    mirroringSourceId?: string;
    /**
     * If set to true, makes the display primary. No-op if set to false. Note: If set, the display is considered primary for all other properties (i.e. {@link isUnified} may be set and bounds origin may not).
     *
     * @supported Chrome
     */
    isPrimary?: boolean;
    /**
     * If set, sets the display's overscan insets to the provided values. Note that overscan values may not be negative or larger than a half of the screen's size. Overscan cannot be changed on the internal monitor.
     *
     * @supported Chrome
     */
    overscan?: Insets;
    /**
     * If set, updates the display's rotation. Legal values are \[0, 90, 180, 270\]. The rotation is set clockwise, relative to the display's vertical position.
     *
     * @supported Chrome
     */
    rotation?: number;
    /**
     * If set, updates the display's logical bounds origin along the x-axis. Applied together with {@link boundsOriginY}. Defaults to the current value if not set and {@link boundsOriginY} is set. Note that when updating the display origin, some constraints will be applied, so the final bounds origin may be different than the one set. The final bounds can be retrieved using {@link getInfo}. The bounds origin cannot be changed on the primary display.
     *
     * @supported Chrome
     */
    boundsOriginX?: number;
    /**
     * If set, updates the display's logical bounds origin along the y-axis. See documentation for {@link boundsOriginX} parameter.
     *
     * @supported Chrome
     */
    boundsOriginY?: number;
    /**
     * If set, updates the display mode to the mode matching this value. If other parameters are invalid, this will not be applied. If the display mode is invalid, it will not be applied and an error will be set, but other properties will still be applied.
     *
     * @since Chrome 52
     *
     * @supported Chrome
     */
    displayMode?: DisplayMode;
    /**
     * If set, updates the zoom associated with the display. This zoom performs re-layout and repaint thus resulting in a better quality zoom than just performing a pixel by pixel stretch enlargement.
     *
     * @since Chrome 65
     *
     * @supported Chrome
     */
    displayZoomFactor?: number;
}
/**
 * @supported Chrome
 */
export interface GetInfoFlags {
    /**
     * If set to true, only a single {@link DisplayUnitInfo} will be returned by {@link getInfo} when in unified desktop mode (see {@link enableUnifiedDesktop}). Defaults to false.
     *
     * @supported Chrome
     */
    singleUnified?: boolean;
}
/**
 * @supported Chrome
 */
export type MirrorMode = "off" | "normal" | "mixed";
/**
 * @supported Chrome
 */
export interface MirrorModeInfo {
    /**
     * The mirror mode that should be set.
     *
     * @supported Chrome
     */
    mode: MirrorMode;
    /**
     * The id of the mirroring source display. This is only valid for 'mixed'.
     *
     * @supported Chrome
     */
    mirroringSourceId?: string;
    /**
     * The ids of the mirroring destination displays. This is only valid for 'mixed'.
     *
     * @supported Chrome
     */
    mirroringDestinationIds?: string[];
}
/**
 * @supported Chrome
 */
export const onDisplayChanged: events.Event<() => void>;
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

}

export namespace system.memory {
/**
 * @supported Chrome
 */
export interface MemoryInfo {
    /**
     * The total amount of physical memory capacity, in bytes.
     *
     * @supported Chrome
     */
    capacity: number;
    /**
     * The amount of available capacity, in bytes.
     *
     * @supported Chrome
     */
    availableCapacity: number;
}
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

export namespace system.network {
/**
 * @supported Chrome
 */
export interface NetworkInterface {
    /**
     * The underlying name of the adapter. On \*nix, this will typically be "eth0", "wlan0", etc.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The available IPv4/6 address.
     *
     * @supported Chrome
     */
    address: string;
    /**
     * The prefix length
     *
     * @supported Chrome
     */
    prefixLength: number;
}
/**
 * @supported Chrome
 */
export function getNetworkInterfaces(): Promise<NetworkInterface[]>;
/**
 * @supported Chrome
 */
export function getNetworkInterfaces(

      /**
       * @param networkInterfaces Array of object containing network interfaces information.
       */
      callback?: (
        networkInterfaces: NetworkInterface[],
      ) => void,
    ): void;

}

export namespace system.storage {
/**
 * @supported Chrome
 */
export type StorageUnitType = "fixed" | "removable" | "unknown";
/**
 * @supported Chrome
 */
export interface StorageUnitInfo {
    /**
     * The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The name of the storage unit.
     *
     * @supported Chrome
     */
    name: string;
    /**
     * The media type of the storage unit.
     *
     * @supported Chrome
     */
    type: StorageUnitType;
    /**
     * The total amount of the storage space, in bytes.
     *
     * @supported Chrome
     */
    capacity: number;
}
/**
 * @supported Chrome
 */
export interface StorageAvailableCapacityInfo {
    /**
     * A copied `id` of getAvailableCapacity function parameter `id`.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * The available capacity of the storage device, in bytes.
     *
     * @supported Chrome
     */
    availableCapacity: number;
}
/**
 * @supported Chrome
 */
export type EjectDeviceResultCode = "success" | "in_use" | "no_such_device" | "failure";
/**
 * @supported Chrome
 */
export const onAttached: events.Event<(
      info: StorageUnitInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export const onDetached: events.Event<(
      id: string,
    ) => void>;
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
/**
 * @supported Chrome
 */
export function getAvailableCapacity(

      id: string,
    ): Promise<StorageAvailableCapacityInfo>;
/**
 * @supported Chrome
 */
export function getAvailableCapacity(

      id: string,

      callback?: (
        info: StorageAvailableCapacityInfo,
      ) => void,
    ): void;

}

export namespace systemLog {
/**
 * @supported Chrome
 */
export interface MessageOptions {
    /** @supported Chrome */
    message: string;
}
/**
 * @supported Chrome
 */
export function add(

      options: MessageOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function add(

      options: MessageOptions,

      callback?: () => void,
    ): void;

}

export namespace tabCapture {
/**
 * @supported Chrome
 */
export type TabCaptureState = "pending" | "active" | "stopped" | "error";
/**
 * @supported Chrome
 */
export interface CaptureInfo {
    /**
     * The id of the tab whose status changed.
     *
     * @supported Chrome
     */
    tabId: number;
    /**
     * The new capture status of the tab.
     *
     * @supported Chrome
     */
    status: TabCaptureState;
    /**
     * Whether an element in the tab being captured is in fullscreen mode.
     *
     * @supported Chrome
     */
    fullscreen: boolean;
}
/**
 * @supported Chrome
 */
export interface MediaStreamConstraint {
    /** @supported Chrome */
    mandatory: {[name: string]: /* TODO: Upstream type uses any */ any};
    /** @supported Chrome */
    optional?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface CaptureOptions {
    /** @supported Chrome */
    audio?: boolean;
    /** @supported Chrome */
    video?: boolean;
    /** @supported Chrome */
    audioConstraints?: MediaStreamConstraint;
    /** @supported Chrome */
    videoConstraints?: MediaStreamConstraint;
}
/**
 * @supported Chrome
 */
export interface GetMediaStreamOptions {
    /**
     * Optional tab id of the tab which will later invoke `getUserMedia()` to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS.
     *
     * @supported Chrome
     */
    consumerTabId?: number;
    /**
     * Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the `activeTab` permission can be used as the target tab.
     *
     * @supported Chrome
     */
    targetTabId?: number;
}
/**
 * @supported Chrome
 */
export const onStatusChanged: events.Event<(
      info: CaptureInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export function capture(

      options: CaptureOptions,

      callback: (
        stream: LocalMediaStream,
      ) => void,
    ): void;
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
 * @supported Chrome, Firefox
 */
export type Color = "grey" | "blue" | "red" | "yellow" | "green" | "pink" | "purple" | "cyan" | "orange";
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
    title?: string;
    /**
     * The ID of the window that contains the group.
     *
     * @supported Chrome, Firefox
     */
    windowId: number;
    /** @supported Chrome */
    shared: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export const TAB_GROUP_ID_NONE: -1;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: events.Event<(
      group: TabGroup,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUpdated: events.Event<(
      group: TabGroup,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onMoved: events.Event<(
      group: TabGroup,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: events.Event<(group: TabGroup) => void>;
/**
 * @supported Chrome, Firefox
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

}

export namespace tabs {
/**
 * @supported Chrome, Firefox
 */
export type TabStatus = "unloaded" | "loading" | "complete";
/**
 * @supported Chrome, Firefox
 */
export type MutedInfoReason = "user" | "capture" | "extension";
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
    reason?: MutedInfoReason;
    /**
     * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
     *
     * @supported Chrome, Firefox
     */
    extensionId?: string;
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
    id?: number;
    /**
     * The zero-based index of the tab within its window.
     *
     * @supported Chrome, Firefox
     */
    index: number;
    /** @supported Chrome, Firefox */
    groupId: number;
    /**
     * The ID of the Split View that the tab belongs to.
     *
     * @since Chrome 140
     *
     * @supported Chrome
     */
    splitViewId?: number;
    /** @supported Chrome, Firefox */
    windowId: number;
    /**
     * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
     *
     * @supported Chrome, Firefox
     */
    openerTabId?: number;
    /** @supported Chrome */
    selected: boolean;
    /** @supported Chrome, Firefox */
    lastAccessed: number;
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
    audible?: boolean;
    /** @supported Chrome */
    frozen: boolean;
    /** @supported Chrome, Firefox */
    discarded: boolean;
    /** @supported Chrome, Firefox */
    autoDiscardable: boolean;
    /**
     * The tab's muted state and the reason for the last state change.
     *
     * @since Chrome 46
     *
     * @supported Chrome, Firefox
     */
    mutedInfo?: MutedInfo;
    /**
     * The last committed URL of the main frame of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. May be an empty string if the tab has not yet committed. See also {@link Tab.pendingUrl}.
     *
     * @supported Chrome, Firefox
     */
    url?: string;
    /**
     * The URL the tab is navigating to, before it has committed. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page and there is a pending navigation.
     *
     * @since Chrome 79
     *
     * @supported Chrome
     */
    pendingUrl?: string;
    /**
     * The title of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page.
     *
     * @supported Chrome, Firefox
     */
    title?: string;
    /**
     * The URL of the tab's favicon. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. It may also be an empty string if the tab is loading.
     *
     * @supported Chrome, Firefox
     */
    favIconUrl?: string;
    /**
     * The tab's loading status.
     *
     * @supported Chrome, Firefox
     */
    status?: TabStatus;
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
    width?: number;
    /**
     * The height of the tab in pixels.
     *
     * @supported Chrome, Firefox
     */
    height?: number;
    /**
     * The session ID used to uniquely identify a tab obtained from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    sessionId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export type ZoomSettingsMode = "automatic" | "manual" | "disabled";
/**
 * @supported Chrome, Firefox
 */
export type ZoomSettingsScope = "per-origin" | "per-tab";
/**
 * @supported Chrome, Firefox
 */
export interface ZoomSettings {
    /**
     * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
     *
     * @supported Chrome, Firefox
     */
    mode?: ZoomSettingsMode;
    /**
     * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.
     *
     * @supported Chrome, Firefox
     */
    scope?: ZoomSettingsScope;
    /**
     * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
     *
     * @since Chrome 43
     *
     * @supported Chrome, Firefox
     */
    defaultZoomFactor?: number;
}
/**
 * @supported Chrome, Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab";
/**
 * @supported Chrome
 */
export const MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND: 2;
/**
 * @supported Chrome
 */
export const SPLIT_VIEW_ID_NONE: -1;
/**
 * @supported Chrome, Firefox
 */
export const TAB_ID_NONE: -1;
/**
 * @supported Chrome
 */
export const TAB_INDEX_NONE: -1;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: events.Event<(
      tab: Tab,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onUpdated: events.Event<(
      tabId: number,
      changeInfo: {

        /**
         * The tab's loading status.
         */
        status?: TabStatus,

        /**
         * The tab's URL if it has changed.
         */
        url?: string,

        /**
         * The tab's new group.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The tab's new Split View.
         *
         * @since Chrome 140
         */
        splitViewId?: number,

        /**
         * The tab's new pinned state.
         */
        pinned?: boolean,

        /**
         * The tab's new audible state.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * The tab's new frozen state.
         *
         * @since Chrome 132
         */
        frozen?: boolean,

        /**
         * The tab's new discarded state.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * The tab's new auto-discardable state.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * The tab's new muted state and the reason for the change.
         *
         * @since Chrome 46
         */
        mutedInfo?: MutedInfo,

        /**
         * The tab's new favicon URL.
         */
        favIconUrl?: string,

        /**
         * The tab's new title.
         *
         * @since Chrome 48
         */
        title?: string,
      },
      tab: Tab,
    ) => void>;
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
export const onReplaced: events.Event<(
      addedTabId: number,
      removedTabId: number,
    ) => void>;
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
 * @supported Chrome
 */
export function get(

      tabId: number,

      callback?: (
        tab: Tab,
      ) => void,
    ): void;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
    title: string;
}
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
export type EventType = "start" | "end" | "word" | "sentence" | "marker" | "interrupted" | "cancelled" | "error" | "pause" | "resume";
/**
 * @supported Chrome
 */
export type VoiceGender = "male" | "female";
/**
 * @supported Chrome
 */
export interface TtsOptions {
    /**
     * If true, enqueues this utterance if TTS is already in progress. If false (the default), interrupts any current speech and flushes the speech queue before speaking this new utterance.
     *
     * @supported Chrome
     */
    enqueue?: boolean;
    /**
     * The name of the voice to use for synthesis. If empty, uses any available voice.
     *
     * @supported Chrome
     */
    voiceName?: string;
    /**
     * The extension ID of the speech engine to use, if known.
     *
     * @supported Chrome
     */
    extensionId?: string;
    /**
     * The language to be used for synthesis, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
     *
     * @supported Chrome
     */
    lang?: string;
    /**
     * Gender of voice for synthesized speech.
     *
     * @deprecated Gender is deprecated and will be ignored.
     * @chrome-deprecated-since Chrome 77
     *
     * @supported Chrome
     */
    gender?: VoiceGender;
    /**
     * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed, but many voices will constrain the minimum and maximum rates further—for example a particular voice may not actually speak faster than 3 times normal even if you specify a value larger than 3.0.
     *
     * @supported Chrome
     */
    rate?: number;
    /**
     * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to a voice's default pitch.
     *
     * @supported Chrome
     */
    pitch?: number;
    /**
     * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0.
     *
     * @supported Chrome
     */
    volume?: number;
    /**
     * The TTS event types the voice must support.
     *
     * @supported Chrome
     */
    requiredEventTypes?: string[];
    /**
     * The TTS event types that you are interested in listening to. If missing, all event types may be sent.
     *
     * @supported Chrome
     */
    desiredEventTypes?: string[];
    /**
     * This function is called with events that occur in the process of speaking the utterance.
     *
     * @param event The update event from the text-to-speech engine indicating the status of this utterance.
     *
     * @supported Chrome
     */
    onEvent?(event: TtsEvent): void;
}
/**
 * @supported Chrome
 */
export interface TtsEvent {
    /**
     * The type can be `start` as soon as speech has started, `word` when a word boundary is reached, `sentence` when a sentence boundary is reached, `marker` when an SSML mark element is reached, `end` when the end of the utterance is reached, `interrupted` when the utterance is stopped or interrupted before reaching the end, `cancelled` when it's removed from the queue before ever being synthesized, or `error` when any other error occurs. When pausing speech, a `pause` event is fired if a particular utterance is paused in the middle, and `resume` if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances.
     *
     * @supported Chrome
     */
    type: EventType;
    /**
     * The index of the current character in the utterance. For word events, the event fires at the end of one word and before the beginning of the next. The `charIndex` represents a point in the text at the beginning of the next word to be spoken.
     *
     * @supported Chrome
     */
    charIndex?: number;
    /**
     * The error description, if the event type is `error`.
     *
     * @supported Chrome
     */
    errorMessage?: string;
    /**
     * The length of the next part of the utterance. For example, in a `word` event, this is the length of the word which will be spoken next. It will be set to -1 if not set by the speech engine.
     *
     * @since Chrome 74
     *
     * @supported Chrome
     */
    length?: number;
}
/**
 * @supported Chrome
 */
export interface TtsVoice {
    /**
     * The name of the voice.
     *
     * @supported Chrome
     */
    voiceName?: string;
    /**
     * The language that this voice supports, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
     *
     * @supported Chrome
     */
    lang?: string;
    /**
     * This voice's gender.
     *
     * @deprecated Gender is deprecated and will be ignored.
     * @chrome-deprecated-since Chrome 70
     *
     * @supported Chrome
     */
    gender?: VoiceGender;
    /**
     * If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs.
     *
     * @supported Chrome
     */
    remote?: boolean;
    /**
     * The ID of the extension providing this voice.
     *
     * @supported Chrome
     */
    extensionId?: string;
    /**
     * All of the callback event types that this voice is capable of sending.
     *
     * @supported Chrome
     */
    eventTypes?: EventType[];
}
/**
 * @supported Chrome
 */
export const onVoicesChanged: events.Event<() => void>;
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
export function stop(): void;
/**
 * @supported Chrome
 */
export function pause(): void;
/**
 * @supported Chrome
 */
export function resume(): void;
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
export type TtsClientSource = "chromefeature" | "extension";
/**
 * @supported Chrome
 */
export interface TtsClient {
    /**
     * Client making a language management request. For an extension, this is the unique extension ID. For Chrome features, this is the human-readable name of the feature.
     *
     * @supported Chrome
     */
    id: string;
    /**
     * Type of requestor.
     *
     * @supported Chrome
     */
    source: TtsClientSource;
}
/**
 * @supported Chrome
 */
export type VoiceGender = "male" | "female";
/**
 * @supported Chrome
 */
export interface LanguageUninstallOptions {
    /**
     * True if the TTS client wants the language to be immediately uninstalled. The engine may choose whether or when to uninstall the language, based on this parameter and the requestor information. If false, it may use other criteria, such as recent usage, to determine when to uninstall.
     *
     * @supported Chrome
     */
    uninstallImmediately: boolean;
}
/**
 * @supported Chrome
 */
export type LanguageInstallStatus = "notInstalled" | "installing" | "installed" | "failed";
/**
 * @supported Chrome
 */
export interface LanguageStatus {
    /**
     * Language string in the form of language code-region code, where the region may be omitted. Examples are en, en-AU, zh-CH.
     *
     * @supported Chrome
     */
    lang: string;
    /**
     * Installation status.
     *
     * @supported Chrome
     */
    installStatus: LanguageInstallStatus;
    /**
     * Detail about installation failures. Optionally populated if the language failed to install.
     *
     * @supported Chrome
     */
    error?: string;
}
/**
 * @supported Chrome
 */
export interface SpeakOptions {
    /**
     * The name of the voice to use for synthesis.
     *
     * @supported Chrome
     */
    voiceName?: string;
    /**
     * The language to be used for synthesis, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
     *
     * @supported Chrome
     */
    lang?: string;
    /**
     * Gender of voice for synthesized speech.
     *
     * @deprecated Gender is deprecated and will be ignored.
     * @chrome-deprecated-since Chrome 92
     *
     * @supported Chrome
     */
    gender?: VoiceGender;
    /**
     * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports.
     *
     * @supported Chrome
     */
    rate?: number;
    /**
     * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch.
     *
     * @supported Chrome
     */
    pitch?: number;
    /**
     * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0.
     *
     * @supported Chrome
     */
    volume?: number;
}
/**
 * @supported Chrome
 */
export interface AudioStreamOptions {
    /**
     * The sample rate expected in an audio buffer.
     *
     * @supported Chrome
     */
    sampleRate: number;
    /**
     * The number of samples within an audio buffer.
     *
     * @supported Chrome
     */
    bufferSize: number;
}
/**
 * @supported Chrome
 */
export interface AudioBuffer {
    /**
     * The audio buffer from the text-to-speech engine. It should have length exactly audioStreamOptions.bufferSize and encoded as mono, at audioStreamOptions.sampleRate, and as linear pcm, 32-bit signed float i.e. the Float32Array type in javascript.
     *
     * @supported Chrome
     */
    audioBuffer: ArrayBuffer;
    /**
     * The character index associated with this audio buffer.
     *
     * @supported Chrome
     */
    charIndex?: number;
    /**
     * True if this audio buffer is the last for the text being spoken.
     *
     * @supported Chrome
     */
    isLastBuffer?: boolean;
}
/**
 * @supported Chrome
 */
export const onSpeak: events.Event<(
      utterance: string,
      options: SpeakOptions,
      /**
       * @param event The event from the text-to-speech engine indicating the status of this utterance.
       */
      sendTtsEvent: (
        event: tts.TtsEvent,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onSpeakWithAudioStream: events.Event<(
      utterance: string,
      options: SpeakOptions,
      audioStreamOptions: AudioStreamOptions,
      /**
       * @param audioBufferParams Parameters containing an audio buffer and associated data.
       */
      sendTtsAudio: (
        audioBufferParams: AudioBuffer,
      ) => void,
      /**
       * @param errorMessage A string describing the error.
       * @since Chrome 94
       */
      sendError: (
        errorMessage?: string,
      ) => void,
    ) => void>;
/**
 * @supported Chrome
 */
export const onStop: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onPause: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onResume: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onInstallLanguageRequest: events.Event<(
      requestor: TtsClient,
      lang: string,
    ) => void>;
/**
 * @supported Chrome
 */
export const onUninstallLanguageRequest: events.Event<(
      requestor: TtsClient,
      lang: string,
      uninstallOptions: LanguageUninstallOptions,
    ) => void>;
/**
 * @supported Chrome
 */
export const onLanguageStatusRequest: events.Event<(
      requestor: TtsClient,
      lang: string,
    ) => void>;
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

export namespace types {
/**
 * @supported Chrome
 */
export type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";
/**
 * @supported Chrome, Firefox
 */
export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";
/**
 * @supported Chrome
 */
export interface ChromeSetting<T> {
    /**
     * Fired after the setting changes.
     *
     * @supported Chrome
     */
    onChange: events.Event<(
        details: {

          /**
           * The value of the setting after the change.
           */
          value: T,

          /**
           * The level of control of the setting.
           */
          levelOfControl: LevelOfControl,

          /**
           * Whether the value that has changed is specific to the incognito session.
           * This property will _only_ be present if the user has enabled the extension in incognito mode.
           */
          incognitoSpecific?: boolean,
        },
      ) => void>;
    /**
     * Gets the value of a setting.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details Which setting to consider.
     *
     * @supported Chrome
     */
    get(

        details: {

          /**
           * Whether to return the value that applies to the incognito session (default false).
           */
          incognito?: boolean,
        },
      ): Promise<{

        /**
         * The value of the setting.
         */
        value: T,

        /**
         * The level of control of the setting.
         */
        levelOfControl: LevelOfControl,

        /**
         * Whether the effective value is specific to the incognito session.
         * This property will _only_ be present if the `incognito` property in the `details` parameter of `get()` was true.
         */
        incognitoSpecific?: boolean,
      }>;
    /**
     * Gets the value of a setting.
     *
     * @param details Which setting to consider.
     *
     * @supported Chrome
     */
    get(

        details: {

          /**
           * Whether to return the value that applies to the incognito session (default false).
           */
          incognito?: boolean,
        },

        /**
         * @param details Details of the currently effective value.
         */
        callback?: (
          details: {

            /**
             * The value of the setting.
             */
            value: T,

            /**
             * The level of control of the setting.
             */
            levelOfControl: LevelOfControl,

            /**
             * Whether the effective value is specific to the incognito session.
             * This property will _only_ be present if the `incognito` property in the `details` parameter of `get()` was true.
             */
            incognitoSpecific?: boolean,
          },
        ) => void,
      ): void;
    /**
     * Sets the value of a setting.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details Which setting to change.
     * @returns Called at the completion of the set operation.
     *
     * @supported Chrome
     */
    set(

        details: {

          /**
           * The value of the setting.
           * Note that every setting has a specific value type, which is described together with the setting. An extension should _not_ set a value of a different type.
           */
          value: T,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
      ): Promise<void>;
    /**
     * Sets the value of a setting.
     *
     * @param details Which setting to change.
     *
     * @supported Chrome
     */
    set(

        details: {

          /**
           * The value of the setting.
           * Note that every setting has a specific value type, which is described together with the setting. An extension should _not_ set a value of a different type.
           */
          value: T,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },

        callback?: () => void,
      ): void;
    /**
     * Clears the setting, restoring any default value.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details Which setting to clear.
     * @returns Called at the completion of the clear operation.
     *
     * @supported Chrome
     */
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
      ): Promise<void>;
    /**
     * Clears the setting, restoring any default value.
     *
     * @param details Which setting to clear.
     *
     * @supported Chrome
     */
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },

        callback?: () => void,
      ): void;
}

}

export namespace userScripts {
/**
 * @supported Chrome, Firefox
 */
export type ExecutionWorld = "MAIN" | "USER_SCRIPT";
/**
 * @supported Chrome, Firefox
 */
export interface ScriptSource {
    /** @supported Chrome, Firefox */
    code?: string;
    /** @supported Chrome, Firefox */
    file?: string;
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
    allFrames?: boolean;
    /**
     * Excludes pages that this user script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
     *
     * @supported Chrome, Firefox
     */
    excludeMatches?: string[];
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
    includeGlobs?: string[];
    /**
     * Specifies wildcard patterns for pages this user script will NOT be injected into.
     *
     * @supported Chrome, Firefox
     */
    excludeGlobs?: string[];
    /** @supported Chrome, Firefox */
    js?: ScriptSource[];
    /**
     * Specifies which pages this user script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings. This property must be specified for ${ref:register}.
     *
     * @supported Chrome, Firefox
     */
    matches?: string[];
    /**
     * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
     *
     * @supported Chrome, Firefox
     */
    runAt?: extensionTypes.RunAt;
    /**
     * The JavaScript execution environment to run the script in. The default is `` `USER_SCRIPT` ``.
     *
     * @supported Chrome, Firefox
     */
    world?: ExecutionWorld;
    /**
     * Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved.
     *
     * @since Chrome 133
     *
     * @supported Chrome, Firefox
     */
    worldId?: string;
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
    ids?: string[];
}
/**
 * @supported Chrome
 */
export interface InjectionTarget {
    /**
     * Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` is specified.
     *
     * @supported Chrome
     */
    allFrames?: boolean;
    /**
     * The IDs of specific documentIds to inject into. This must not be set if `frameIds` is set.
     *
     * @supported Chrome
     */
    documentIds?: string[];
    /**
     * The IDs of specific frames to inject into.
     *
     * @supported Chrome
     */
    frameIds?: number[];
    /**
     * The ID of the tab into which to inject.
     *
     * @supported Chrome
     */
    tabId: number;
}
/**
 * @supported Chrome
 */
export interface InjectionResult {
    /**
     * The document associated with the injection.
     *
     * @supported Chrome
     */
    documentId: string;
    /**
     * The frame associated with the injection.
     *
     * @supported Chrome
     */
    frameId: number;
    /**
     * The result of the script execution.
     *
     * @supported Chrome
     */
    result?: /* TODO: Upstream type uses any */ any;
    /**
     * The error, if any. `error` and `result` are mutually exclusive.
     *
     * @supported Chrome
     */
    error?: string;
}
/**
 * @supported Chrome
 */
export interface UserScriptInjection {
    /**
     * Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target.
     *
     * @supported Chrome
     */
    injectImmediately?: boolean;
    /**
     * The list of ScriptSource objects defining sources of scripts to be injected into the target.
     *
     * @supported Chrome
     */
    js: ScriptSource[];
    /**
     * Details specifying the target into which to inject the script.
     *
     * @supported Chrome
     */
    target: InjectionTarget;
    /**
     * The JavaScript "world" to run the script in. The default is `USER_SCRIPT`.
     *
     * @supported Chrome
     */
    world?: ExecutionWorld;
    /**
     * Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved.
     *
     * @supported Chrome
     */
    worldId?: string;
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
    worldId?: string;
    /**
     * Specifies the world csp. The default is the `` `ISOLATED` `` world csp.
     *
     * @supported Chrome, Firefox
     */
    csp?: string;
    /**
     * Specifies whether messaging APIs are exposed. The default is `false`.
     *
     * @supported Chrome, Firefox
     */
    messaging?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export function register(

      scripts: RegisteredUserScript[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function register(

      scripts: RegisteredUserScript[],

      callback?: () => void,
    ): void;
/**
 * @supported Chrome, Firefox
 */
export function getScripts(

      filter?: UserScriptFilter,
    ): Promise<RegisteredUserScript[]>;
/**
 * @supported Chrome
 */
export function getScripts(

      filter?: UserScriptFilter,

      callback?: (
        scripts: RegisteredUserScript[],
      ) => void,
    ): void;
/**
 * @supported Chrome, Firefox
 */
export function unregister(

      filter?: UserScriptFilter,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function unregister(

      filter?: UserScriptFilter,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function update(

      scripts: RegisteredUserScript[],
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function update(

      scripts: RegisteredUserScript[],

      callback?: () => void,
    ): void;
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
 * @supported Chrome, Firefox
 */
export function configureWorld(

      properties: WorldProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function configureWorld(

      properties: WorldProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome, Firefox
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
 * @supported Chrome, Firefox
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
export interface Parameters {
    /**
     * IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode.
     *
     * @supported Chrome
     */
    address: string;
    /**
     * Broadcast address for the VPN interface. (default: deduced from IP address and mask)
     *
     * @supported Chrome
     */
    broadcastAddress?: string;
    /**
     * MTU setting for the VPN interface. (default: 1500 bytes)
     *
     * @supported Chrome
     */
    mtu?: string;
    /**
     * Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
     *
     * @supported Chrome
     */
    exclusionList: string[];
    /**
     * Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
     *
     * @supported Chrome
     */
    inclusionList: string[];
    /**
     * A list of search domains. (default: no search domain)
     *
     * @supported Chrome
     */
    domainSearch?: string[];
    /**
     * A list of IPs for the DNS servers.
     *
     * @supported Chrome
     */
    dnsServers: string[];
    /**
     * Whether or not the VPN extension implements auto-reconnection.
     *
     * If true, the `linkDown`, `linkUp`, `linkChanged`, `suspend`, and `resume` platform messages will be used to signal the respective events. If false, the system will forcibly disconnect the VPN if the network topology changes, and the user will need to reconnect manually. (default: false)
     *
     * This property is new in Chrome 51; it will generate an exception in earlier versions. try/catch can be used to conditionally enable the feature based on browser support.
     *
     * @since Chrome 51
     *
     * @supported Chrome
     */
    reconnect?: string;
}
/**
 * @supported Chrome
 */
export type PlatformMessage = "connected" | "disconnected" | "error" | "linkDown" | "linkUp" | "linkChanged" | "suspend" | "resume";
/**
 * @supported Chrome
 */
export type VpnConnectionState = "connected" | "failure";
/**
 * @supported Chrome
 */
export type UIEvent = "showAddDialog" | "showConfigureDialog";
/**
 * @supported Chrome
 */
export const onPlatformMessage: events.Event<(
      id: string,
      message: PlatformMessage,
      error: string,
    ) => void>;
/**
 * @supported Chrome
 */
export const onPacketReceived: events.Event<(
      data: ArrayBuffer,
    ) => void>;
/**
 * @supported Chrome
 */
export const onConfigRemoved: events.Event<(
      id: string,
    ) => void>;
/**
 * @supported Chrome
 */
export const onConfigCreated: events.Event<(
      id: string,
      name: string,
      data: {[name: string]: /* TODO: Upstream type uses any */ any},
    ) => void>;
/**
 * @supported Chrome
 */
export const onUIEvent: events.Event<(
      event: UIEvent,
      id?: string,
    ) => void>;
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
export type WallpaperLayout = "STRETCH" | "CENTER" | "CENTER_CROPPED";
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

export namespace webAccessibleResources {
/**
 * @supported Chrome
 */
export interface WebAccessibleResource {
    /**
     * Relative paths within the extension package representing web accessible resources.
     *
     * @supported Chrome
     */
    resources: string[];
    /**
     * List of [match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) to which "resources" are accessible. These patterns should have an effective path of "\*". Each match will be checked against the initiating origin.
     *
     * @supported Chrome
     */
    matches?: string[];
    /**
     * List of extension IDs the "resources" are accessible to. A wildcard can be used, denoted by "\*".
     *
     * @supported Chrome
     */
    extension_ids?: string[];
    /**
     * If true, the web accessible resources will only be accessible through a dynamic ID. This is an identifier that uniquely identifies the extension and is generated each session. The corresponding dynamic extension URL is available through {@link runtime.getURL}. Dynamic resources can be loaded regardless of the value. However, if true, resources can only be loaded using the dynamic URL.
     *
     * @supported Chrome
     */
    use_dynamic_url?: boolean;
}

}

export namespace webAuthenticationProxy {
/**
 * @supported Chrome
 */
export interface IsUvpaaRequest {
    /**
     * An opaque identifier for the request.
     *
     * @supported Chrome
     */
    requestId: number;
}
/**
 * @supported Chrome
 */
export interface CreateRequest {
    /**
     * An opaque identifier for the request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The `PublicKeyCredentialCreationOptions` passed to `navigator.credentials.create()`, serialized as a JSON string. The serialization format is compatible with [`PublicKeyCredential.parseCreationOptionsFromJSON()`](https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON).
     *
     * @supported Chrome
     */
    requestDetailsJson: string;
}
/**
 * @supported Chrome
 */
export interface GetRequest {
    /**
     * An opaque identifier for the request.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The `PublicKeyCredentialRequestOptions` passed to `navigator.credentials.get()`, serialized as a JSON string. The serialization format is compatible with [`PublicKeyCredential.parseRequestOptionsFromJSON()`](https://w3c.github.io/webauthn/#sctn-parseRequestOptionsFromJSON).
     *
     * @supported Chrome
     */
    requestDetailsJson: string;
}
/**
 * @supported Chrome
 */
export interface DOMExceptionDetails {
    /** @supported Chrome */
    name: string;
    /** @supported Chrome */
    message: string;
}
/**
 * @supported Chrome
 */
export interface CreateResponseDetails {
    /**
     * The `requestId` of the `CreateRequest`.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The `DOMException` yielded by the remote request, if any.
     *
     * @supported Chrome
     */
    error?: DOMExceptionDetails;
    /**
     * The `PublicKeyCredential`, yielded by the remote request, if any, serialized as a JSON string by calling href="https://w3c.github.io/webauthn/#dom-publickeycredential-tojson"> `PublicKeyCredential.toJSON()`.
     *
     * @supported Chrome
     */
    responseJson?: string;
}
/**
 * @supported Chrome
 */
export interface GetResponseDetails {
    /**
     * The `requestId` of the `CreateRequest`.
     *
     * @supported Chrome
     */
    requestId: number;
    /**
     * The `DOMException` yielded by the remote request, if any.
     *
     * @supported Chrome
     */
    error?: DOMExceptionDetails;
    /**
     * The `PublicKeyCredential`, yielded by the remote request, if any, serialized as a JSON string by calling href="https://w3c.github.io/webauthn/#dom-publickeycredential-tojson"> `PublicKeyCredential.toJSON()`.
     *
     * @supported Chrome
     */
    responseJson?: string;
}
/**
 * @supported Chrome
 */
export interface IsUvpaaResponseDetails {
    /** @supported Chrome */
    requestId: number;
    /** @supported Chrome */
    isUvpaa: boolean;
}
/**
 * @supported Chrome
 */
export const onRemoteSessionStateChange: events.Event<() => void>;
/**
 * @supported Chrome
 */
export const onCreateRequest: events.Event<(
      requestInfo: CreateRequest,
    ) => void>;
/**
 * @supported Chrome
 */
export const onGetRequest: events.Event<(
      requestInfo: GetRequest,
    ) => void>;
/**
 * @supported Chrome
 */
export const onIsUvpaaRequest: events.Event<(
      requestInfo: IsUvpaaRequest,
    ) => void>;
/**
 * @supported Chrome
 */
export const onRequestCanceled: events.Event<(
      requestId: number,
    ) => void>;
/**
 * @supported Chrome
 */
export function completeCreateRequest(

      details: CreateResponseDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function completeCreateRequest(

      details: CreateResponseDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function completeGetRequest(

      details: GetResponseDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function completeGetRequest(

      details: GetResponseDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function completeIsUvpaaRequest(

      details: IsUvpaaResponseDetails,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function completeIsUvpaaRequest(

      details: IsUvpaaResponseDetails,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function attach(): Promise<string | undefined>;
/**
 * @supported Chrome
 */
export function attach(

      callback?: (
        error?: string,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function detach(): Promise<string | undefined>;
/**
 * @supported Chrome
 */
export function detach(

      callback?: (
        error?: string,
      ) => void,
    ): void;

}

export namespace webNavigation {
/**
 * @supported Chrome, Firefox
 */
export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated";
/**
 * @supported Chrome, Firefox
 */
export type TransitionQualifier = "client_redirect" | "server_redirect" | "forward_back" | "from_address_bar";
/**
 * @supported Chrome, Firefox
 */
export const onBeforeNavigate: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation is about to occur.
           */
          tabId: number,

          url: string,

          /**
           * The value of -1.
           *
           * @deprecated The processId is no longer set for this event, since the process which will render the resulting document is not known until onCommit.
           * @chrome-deprecated-since Chrome 50
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique for a given tab and process.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The time when the browser was about to start the navigation, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onCommitted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onDOMContentLoaded: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The time when the page's DOM was fully constructed, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onCompleted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The time when the document finished loading, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onErrorOccurred: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The value of -1.
           *
           * @deprecated The processId is no longer set for this event.
           * @chrome-deprecated-since Chrome 50
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The error description.
           */
          error: string,

          /**
           * The time when the error occurred, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onCreatedNavigationTarget: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation is triggered.
           */
          sourceTabId: number,

          /**
           * The ID of the process that runs the renderer for the source frame.
           */
          sourceProcessId: number,

          /**
           * The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame.
           */
          sourceFrameId: number,

          /**
           * The URL to be opened in the new window.
           */
          url: string,

          /**
           * The ID of the tab in which the url is opened
           */
          tabId: number,

          /**
           * The time when the browser was about to create a new view, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onReferenceFragmentUpdated: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onTabReplaced: events.Event<(details: { replacedTabId: number; tabId: number; timeStamp: number }) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onHistoryStateUpdated: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

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
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;
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

}

export namespace webRequest {
/**
 * @supported Chrome, Firefox
 */
export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webbundle" | "other";
/**
 * @supported Chrome, Firefox
 */
export type OnBeforeRequestOptions = "blocking" | "requestBody" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnSendHeadersOptions = "requestHeaders" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnHeadersReceivedOptions = "blocking" | "responseHeaders" | "extraHeaders" | "securityInfo" | "securityInfoRawDer";
/**
 * @supported Chrome, Firefox
 */
export type OnAuthRequiredOptions = "responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnResponseStartedOptions = "responseHeaders" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnBeforeRedirectOptions = "responseHeaders" | "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export type OnCompletedOptions = "responseHeaders" | "extraHeaders";
/**
 * @supported Chrome
 */
export type OnErrorOccurredOptions = "extraHeaders";
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
    types?: ResourceType[];
    /** @supported Chrome, Firefox */
    tabId?: number;
    /** @supported Chrome, Firefox */
    windowId?: number;
}
/**
 * @supported Chrome, Firefox
 */
export type HttpHeaders = {

      /**
       * Name of the HTTP header.
       */
      name: string,

      /**
       * Value of the HTTP header if it can be represented by UTF-8.
       */
      value?: string,

      /**
       * Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255).
       */
      binaryValue?: number[],
    }[];
/**
 * @supported Chrome, Firefox
 */
export interface BlockingResponse {
    /**
     * If true, the request is cancelled. This prevents the request from being sent. This can be used as a response to the onBeforeRequest, onBeforeSendHeaders, onHeadersReceived and onAuthRequired events.
     *
     * @supported Chrome, Firefox
     */
    cancel?: boolean;
    /**
     * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as `data:` are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. Redirects from URLs with `ws://` and `wss://` schemes are **ignored**.
     *
     * @supported Chrome, Firefox
     */
    redirectUrl?: string;
    /**
     * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
     *
     * @supported Chrome, Firefox
     */
    requestHeaders?: HttpHeaders;
    /**
     * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return `responseHeaders` if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify `responseHeaders` for each request).
     *
     * @supported Chrome, Firefox
     */
    responseHeaders?: HttpHeaders;
    /**
     * Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.
     *
     * @supported Chrome, Firefox
     */
    authCredentials?: {

        username: string,

        password: string,
      };
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
    certificates: {

        /**
         * Raw bytes of DER encoded server certificate
         */
        rawDER?: ArrayBuffer,

        /**
         * Fingerprints of the certificate.
         */
        fingerprint: {

          /**
           * sha256 fingerprint of the certificate.
           */
          sha256: string,
        },
      }[];
    /**
     * State of the connection. One of secure, insecure, broken.
     *
     * @supported Chrome, Firefox
     */
    state: string;
}
/**
 * @supported Chrome
 */
export type FormDataItem = ArrayBuffer | string;
/**
 * @supported Chrome
 */
export type IgnoredActionType = "redirect" | "request_headers" | "response_headers" | "auth_credentials";
/**
 * @supported Chrome, Firefox
 */
export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeRequest: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle?: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType?: extensionTypes.FrameType,

          /**
           * Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.
           */
          requestBody?: {

            /**
             * Errors when obtaining request body data.
             */
            error?: string,

            /**
             * If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': \['value1', 'value2'\]}.
             */
            formData?: {[name: string]: FormDataItem[]},

            /**
             * If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array.
             */
            raw?: UploadData[],
          },

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeRequestOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeSendHeaders: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that are going to be sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeSendHeadersOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onSendHeaders: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that have been sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnSendHeadersOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onHeadersReceived: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line).
           */
          statusLine: string,

          /**
           * The HTTP response headers that have been received with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * Standard HTTP status code returned by the server.
           *
           * @since Chrome 43
           */
          statusCode: number,

          /**
           * Information about the TLS/QUIC connection used for the underlying connection. Only provided if `securityInfo` is specified in the `extraInfoSpec` parameter.
           *
           * @since Chrome 144
           */
          securityInfo?: SecurityInfo,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnHeadersReceivedOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onAuthRequired: CustomChromeEvent<(
      /**
       * @param asyncCallback Only valid if `'asyncBlocking'` is specified as one of the `OnAuthRequiredOptions`.
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The authentication scheme, e.g. Basic or Digest.
           */
          scheme: string,

          /**
           * The authentication realm provided by the server, if there is one.
           */
          realm?: string,

          /**
           * The server requesting authentication.
           */
          challenger: {

            host: string,

            port: number,
          },

          /**
           * True for Proxy-Authenticate, false for WWW-Authenticate.
           */
          isProxy: boolean,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,

          /**
           * Standard HTTP status code returned by the server.
           *
           * @since Chrome 43
           */
          statusCode: number,
        },
        /**
         * @since Chrome 58
         */
        asyncCallback?: (
          response: BlockingResponse,
        ) => void,
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnAuthRequiredOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onResponseStarted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnResponseStartedOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onBeforeRedirect: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The new URL.
           */
          redirectUrl: string,

          /**
           * The HTTP response headers that were received along with this redirect.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeRedirectOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onCompleted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnCompletedOptions[],
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onErrorOccurred: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request. This value is not present if the request is a navigation of a frame.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
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
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * The error description. This string is _not_ guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content.
           */
          error: string,
        },
      ) => void,
      filter: RequestFilter,
      /**
       * @since Chrome 79
       */
      extraInfoSpec?: OnErrorOccurredOptions[],
    ) => void>;
/**
 * @supported Chrome
 */
export const onActionIgnored: events.Event<(
      details: {

        /**
         * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
         */
        requestId: string,

        /**
         * The proposed action which was ignored.
         */
        action: IgnoredActionType,
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export function handlerBehaviorChanged(): Promise<void>;
/**
 * @supported Chrome
 */
export function handlerBehaviorChanged(

      callback?: () => void,
    ): void;

}

export namespace windows {
/**
 * @supported Chrome, Firefox
 */
export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab";
/**
 * @supported Chrome, Firefox
 */
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "locked-fullscreen";
/**
 * @supported Chrome, Firefox
 */
export interface Window {
    /**
     * The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an `ID` property; for example, when querying windows using the {@link sessions} API, in which case a session ID may be present.
     *
     * @supported Chrome, Firefox
     */
    id?: number;
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
    top?: number;
    /**
     * The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a `left` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    left?: number;
    /**
     * The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `width` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    width?: number;
    /**
     * The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `height` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @supported Chrome, Firefox
     */
    height?: number;
    /**
     * Array of {@link tabs.Tab} objects representing the current tabs in the window.
     *
     * @supported Chrome, Firefox
     */
    tabs?: tabs.Tab[];
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
    type?: WindowType;
    /**
     * The state of this browser window.
     *
     * @supported Chrome, Firefox
     */
    state?: WindowState;
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
    sessionId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export type CreateType = "normal" | "popup" | "panel";
/**
 * @supported Chrome
 */
export interface QueryOptions {
    /**
     * If true, the {@link windows.Window} object has a `tabs` property that contains a list of the {@link tabs.Tab} objects. The `Tab` objects only contain the `url`, `pendingUrl`, `title`, and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission.
     *
     * @supported Chrome
     */
    populate?: boolean;
    /**
     * If set, the {@link windows.Window} returned is filtered based on its type. If unset, the default filter is set to `['normal', 'popup']`.
     *
     * @supported Chrome
     */
    windowTypes?: WindowType[];
}
/**
 * @supported Chrome, Firefox
 */
export const WINDOW_ID_NONE: -1;
/**
 * @supported Chrome, Firefox
 */
export const WINDOW_ID_CURRENT: -2;
/**
 * @supported Chrome, Firefox
 */
export const onCreated: CustomChromeEvent<(
      /**
       * @param window Details of the created window.
       * @since Chrome 46
       */
      callback: (
        window: Window,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being created must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onRemoved: CustomChromeEvent<(
      /**
       * @param windowId ID of the removed window.
       * @since Chrome 46
       */
      callback: (
        windowId: number,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being removed must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export const onFocusChanged: CustomChromeEvent<(
      /**
       * @param windowId ID of the newly-focused window.
       * @since Chrome 46
       */
      callback: (
        windowId: number,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being removed must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;
/**
 * @supported Chrome
 */
export const onBoundsChanged: events.Event<(
      window: Window,
    ) => void>;
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
 * @supported Chrome, Firefox
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

}

export namespace _manifest {
/**
 * @supported Chrome, Firefox
 */
export interface WebExtensionManifest {
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
    host_permissions?: string[];
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
    action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    browser_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    page_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    sidebar_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    web_accessible_resources?: Array<{
    resources: string[];
    matches: string[];
  }>;
}
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

}

export namespace browserAction {
/**
 * @supported Chrome, Firefox
 */
export type ColorArray = [number, number, number, number];

}

export namespace pageAction {
/**
 * @supported Chrome, Firefox
 */
export interface _SetIconDetails {
    /** @supported Chrome, Firefox */
    tabId?: number;
    /** @supported Chrome */
    iconIndex?: number;
}

}

export namespace privacy.network {
/**
 * @supported Chrome, Firefox
 */
export const networkPredictionEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome, Firefox
 */
export const webRTCIPHandlingPolicy: types.ChromeSetting<IPHandlingPolicy>;

}

export namespace privacy.services {
/**
 * @supported Chrome, Firefox
 */
export const passwordSavingEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const alternateErrorPagesEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const autofillEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const autofillAddressEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const autofillCreditCardEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const safeBrowsingEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const safeBrowsingExtendedReportingEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const searchSuggestEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const spellingServiceEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const translationServiceEnabled: types.ChromeSetting<boolean>;

}

export namespace privacy.websites {
/**
 * @supported Chrome, Firefox
 */
export const thirdPartyCookiesAllowed: types.ChromeSetting<boolean>;
/**
 * @supported Chrome, Firefox
 */
export const hyperlinkAuditingEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome, Firefox
 */
export const referrersEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome, Firefox
 */
export const protectedContentEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const topicsEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const fledgeEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const adMeasurementEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const doNotTrackEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const relatedWebsiteSetsEnabled: types.ChromeSetting<boolean>;

}

export namespace mimeHandlerPrivate {
/**
 * @privileged Allowlisted component extension API (manifest:mime_types_handler)
 * @supported Chrome
 * @platform chromeos, linux, mac, win
 */
export interface StreamInfo {
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    mimeType: string;
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    originalUrl: string;
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    responseHeaders: Record<string, string>;
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    streamUrl: string;
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    tabId: number;
    /**
     * @privileged Allowlisted component extension API (manifest:mime_types_handler)
     * @supported Chrome
     * @platform chromeos, linux, mac, win
     */
    embedded: boolean;
}

}
}

declare namespace browser {
  export import _debugger = chrome._debugger;
  export import _manifest = chrome._manifest;
  export import accessibilityFeatures = chrome.accessibilityFeatures;
  export import action = chrome.action;
  export import alarms = chrome.alarms;
  export import audio = chrome.audio;
  export import bookmarks = chrome.bookmarks;
  export import browserAction = chrome.browserAction;
  export import browsingData = chrome.browsingData;
  export import certificateProvider = chrome.certificateProvider;
  export import chrome_url_overrides = chrome.chrome_url_overrides;
  export import commands = chrome.commands;
  export import contentScripts = chrome.contentScripts;
  export import contentSettings = chrome.contentSettings;
  export import contextMenus = chrome.contextMenus;
  export import cookies = chrome.cookies;
  export import crossOriginIsolation = chrome.crossOriginIsolation;
  export import declarativeContent = chrome.declarativeContent;
  export import declarativeNetRequest = chrome.declarativeNetRequest;
  export import desktopCapture = chrome.desktopCapture;
  export import devtools = chrome.devtools;
  export import dns = chrome.dns;
  export import documentScan = chrome.documentScan;
  export import dom = chrome.dom;
  export import downloads = chrome.downloads;
  export import enterprise = chrome.enterprise;
  export import events = chrome.events;
  export import extension = chrome.extension;
  export import extensionTypes = chrome.extensionTypes;
  export import extensionsManifestTypes = chrome.extensionsManifestTypes;
  export import fileBrowserHandler = chrome.fileBrowserHandler;
  export import fileHandlers = chrome.fileHandlers;
  export import fileSystemProvider = chrome.fileSystemProvider;
  export import fontSettings = chrome.fontSettings;
  export import gcm = chrome.gcm;
  export import history = chrome.history;
  export import i18n = chrome.i18n;
  export import identity = chrome.identity;
  export import idle = chrome.idle;
  export import incognito = chrome.incognito;
  export import input = chrome.input;
  export import instanceID = chrome.instanceID;
  export import loginState = chrome.loginState;
  export import management = chrome.management;
  export import manifestTypes = chrome.manifestTypes;
  export import mimeHandler = chrome.mimeHandler;
  export import mimeHandlerPrivate = chrome.mimeHandlerPrivate;
  export import notifications = chrome.notifications;
  export import oauth2 = chrome.oauth2;
  export import offscreen = chrome.offscreen;
  export import omnibox = chrome.omnibox;
  export import pageAction = chrome.pageAction;
  export import pageCapture = chrome.pageCapture;
  export import permissions = chrome.permissions;
  export import platformKeys = chrome.platformKeys;
  export import power = chrome.power;
  export import printerProvider = chrome.printerProvider;
  export import printing = chrome.printing;
  export import printingMetrics = chrome.printingMetrics;
  export import privacy = chrome.privacy;
  export import processes = chrome.processes;
  export import protocolHandlers = chrome.protocolHandlers;
  export import proxy = chrome.proxy;
  export import readingList = chrome.readingList;
  export import runtime = chrome.runtime;
  export import scripting = chrome.scripting;
  export import search = chrome.search;
  export import sessions = chrome.sessions;
  export import sharedModule = chrome.sharedModule;
  export import sidePanel = chrome.sidePanel;
  export import sockets = chrome.sockets;
  export import storage = chrome.storage;
  export import system = chrome.system;
  export import systemLog = chrome.systemLog;
  export import tabCapture = chrome.tabCapture;
  export import tabGroups = chrome.tabGroups;
  export import tabs = chrome.tabs;
  export import topSites = chrome.topSites;
  export import tts = chrome.tts;
  export import ttsEngine = chrome.ttsEngine;
  export import types = chrome.types;
  export import userScripts = chrome.userScripts;
  export import vpnProvider = chrome.vpnProvider;
  export import wallpaper = chrome.wallpaper;
  export import webAccessibleResources = chrome.webAccessibleResources;
  export import webAuthenticationProxy = chrome.webAuthenticationProxy;
  export import webNavigation = chrome.webNavigation;
  export import webRequest = chrome.webRequest;
  export import windows = chrome.windows;
}
