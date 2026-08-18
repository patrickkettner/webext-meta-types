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
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface UserSettings {
    isOnToolbar: boolean;
}
/**
 * @supported Chrome
 */
export interface UserSettingsChange {
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
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onClicked: events.Event<(tab: tabs.Tab) => void> | events.Event<(tab: tabs.Tab, info?: OnClickData) => void>;
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
 * @supported Firefox
 */
export function setTitle(details: _SetTitleDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
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
 * @supported Firefox
 */
export function getTitle(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
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
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
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
 * @supported Firefox
 */
export function getPopup(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function setBadgeText(details: _SetBadgeTextDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails): Promise<void>;
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
 * @supported Firefox
 */
export function getBadgeText(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function setBadgeBackgroundColor(details: _SetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails): Promise<void>;
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
 * @supported Firefox
 */
export function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
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
export function getBadgeTextColor(details: { tabId?: number }): Promise<ColorArray>;
/**
 * @supported Chrome, Firefox
 */
export function getBadgeTextColor(details: { tabId?: number }, callback: (color: ColorArray) => void): void;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function enable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(callback: () => void): void;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function disable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(callback: () => void): void;
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
 * @supported Firefox
 */
export function isEnabled(details: Details): Promise</* TODO: Upstream type uses any */ any>;
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
 * @supported Chrome, Firefox, Safari
 */
export function openPopup(callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(options: action.ActionDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function openPopup(options?: action.ActionDetails): Promise<void>;
/**
 * @supported Firefox
 */
export interface Details {
    tabId?: number | undefined;
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
 * @supported Chrome, Firefox, Safari
 */
export interface Alarm {
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    name?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    scheduledTime?: number;
    /** @supported Chrome, Firefox, Safari */
    periodInMinutes?: number;
    /** @supported Chrome */
    persistAcrossSessions: boolean;
}
/**
 * @supported Chrome, Safari
 */
export interface AlarmCreateInfo {
    /** @supported Chrome, Safari */
    name?: string;
    /** @supported Chrome, Safari */
    when?: number;
    /** @supported Chrome, Safari */
    delayInMinutes?: number;
    /** @supported Chrome, Safari */
    periodInMinutes?: number;
    /** @supported Chrome */
    persistAcrossSessions?: boolean;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onAlarm: events.Event<(
      alarm: Alarm,
    ) => void> | events.Event<(alarm: alarms.Alarm) => void>;
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
 * @supported Firefox
 */
export function create(alarmInfo: _CreateAlarmInfo): Promise<void>;
/**
 * @supported Firefox
 */
export function create(name: string, alarmInfo: _CreateAlarmInfo): Promise<void>;
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
 * @supported Firefox
 */
export function get(name?: string): Promise<Alarm | undefined>;
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
 * @supported Safari
 */
export function getAll(callback: (result: alarms.Alarm[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<alarms.Alarm[]>;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function clear(name: string, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function clear(callback: (result: boolean) => void): void;
/**
 * @supported Chrome, Firefox, Safari
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
/**
 * @supported Safari
 */
export function clearAll(callback: (result: boolean) => void): void;
/**
 * @supported Firefox
 */
export interface _CreateAlarmInfo {
    when?: number | undefined;
    delayInMinutes?: number | undefined;
    periodInMinutes?: number | undefined;
}

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
    id: string;
    streamType: StreamType;
    deviceType: DeviceType;
    displayName: string;
    deviceName: string;
    isActive: boolean;
    level: number;
    stableDeviceId?: string;
}
/**
 * @supported Chrome
 */
export interface DeviceFilter {
    streamTypes?: StreamType[];
    isActive?: boolean;
}
/**
 * @supported Chrome
 */
export interface DeviceProperties {
    level?: number;
}
/**
 * @supported Chrome
 */
export interface DeviceIdLists {
    input?: string[];
    output?: string[];
}
/**
 * @supported Chrome
 */
export interface MuteChangedEvent {
    streamType: StreamType;
    isMuted: boolean;
}
/**
 * @supported Chrome
 */
export interface LevelChangedEvent {
    deviceId: string;
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
    /** @supported Chrome, Firefox */
    id: string;
    /** @supported Chrome, Firefox */
    parentId?: string;
    /** @supported Chrome, Firefox */
    index?: number;
    /** @supported Chrome, Firefox */
    url?: string;
    /** @supported Chrome, Firefox */
    title: string;
    /** @supported Chrome, Firefox */
    dateAdded?: number;
    /** @supported Chrome */
    dateLastUsed?: number;
    /** @supported Chrome, Firefox */
    dateGroupModified?: number;
    /** @supported Chrome */
    folderType?: FolderType;
    /** @supported Chrome, Firefox */
    unmodifiable?: BookmarkTreeNodeUnmodifiable;
    /** @supported Chrome */
    syncing: boolean;
    /** @supported Chrome, Firefox */
    children?: BookmarkTreeNode[];
    /** @supported Firefox */
    type?: BookmarkTreeNodeType | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface CreateDetails {
    /** @supported Chrome, Firefox */
    parentId?: string;
    /** @supported Chrome, Firefox */
    index?: number;
    /** @supported Chrome, Firefox */
    title?: string;
    /** @supported Chrome, Firefox */
    url?: string;
    /** @supported Firefox */
    type?: BookmarkTreeNodeType | undefined;
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
 * @supported Chrome
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
 * @supported Firefox
 */
export function move(id: string, destination: _MoveDestination): Promise<BookmarkTreeNode>;
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
 * @supported Chrome, Firefox
 */
export interface RemovalOptions {
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    since?: number | extensionTypes.Date | undefined;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
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
      } | _RemovalOptionsOriginTypes | undefined;
    /** @supported Chrome */
    origins?: [string, ...string[]];
    /** @supported Chrome */
    excludeOrigins?: string[];
    /** @supported Firefox */
    hostnames?: string[] | undefined;
    /** @supported Firefox */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface DataTypeSet {
    /** @supported Chrome */
    appcache?: boolean;
    /** @supported Chrome, Firefox */
    cache?: boolean;
    /** @supported Chrome */
    cacheStorage?: boolean;
    /** @supported Chrome, Firefox */
    cookies?: boolean;
    /** @supported Chrome, Firefox */
    downloads?: boolean;
    /** @supported Chrome */
    fileSystems?: boolean;
    /** @supported Chrome, Firefox */
    formData?: boolean;
    /** @supported Chrome, Firefox */
    history?: boolean;
    /** @supported Chrome, Firefox */
    indexedDB?: boolean;
    /** @supported Chrome, Firefox */
    localStorage?: boolean;
    /** @supported Chrome, Firefox */
    serverBoundCertificates?: boolean;
    /** @supported Chrome, Firefox */
    passwords?: boolean;
    /** @supported Chrome, Firefox */
    pluginData?: boolean;
    /** @supported Chrome, Firefox */
    serviceWorkers?: boolean;
    /** @supported Chrome */
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
    certificateChain: ArrayBuffer[];
    supportedAlgorithms: Algorithm[];
}
/**
 * @supported Chrome
 */
export interface SetCertificatesDetails {
    certificatesRequestId?: number;
    error?: Error;
    clientCertificates: ClientCertificateInfo[];
}
/**
 * @supported Chrome
 */
export interface CertificatesUpdateRequest {
    certificatesRequestId: number;
}
/**
 * @supported Chrome
 */
export interface SignatureRequest {
    signRequestId: number;
    input: ArrayBuffer;
    algorithm: Algorithm;
    certificate: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface ReportSignatureDetails {
    signRequestId: number;
    error?: Error;
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
    certificate: ArrayBuffer;
    supportedHashes: Hash[];
}
/**
 * @supported Chrome
 */
export interface SignRequest {
    signRequestId: number;
    digest: ArrayBuffer;
    hash: Hash;
    certificate: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface RequestPinDetails {
    signRequestId: number;
    requestType?: PinRequestType;
    errorType?: PinRequestErrorType;
    attemptsLeft?: number;
}
/**
 * @supported Chrome
 */
export interface StopPinRequestDetails {
    signRequestId: number;
    errorType?: PinRequestErrorType;
}
/**
 * @supported Chrome
 */
export interface PinResponseDetails {
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
    newtab?: string;
    bookmarks?: string;
    history?: string;
    activationmessage?: string;
    keyboard?: string;
}

}

export namespace commands {
/**
 * @supported Chrome, Firefox, Safari
 */
export interface Command {
    /** @supported Chrome, Firefox, Safari */
    name?: string;
    /** @supported Chrome, Firefox, Safari */
    description?: string;
    /** @supported Chrome, Firefox, Safari */
    shortcut?: string;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onCommand: events.Event<(command: string, tab?: tabs.Tab) => void> | events.Event<(command: string) => void>;
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
/**
 * @supported Safari
 */
export function getAll(callback: (result: commands.Command[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<commands.Command[]>;
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
 * @supported Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onChanged: WebExtEvent<(changeInfo: _OnChangedChangeInfo) => void> | events.Event<(changeInfo: { name: string; oldShortcut: string; newShortcut: string }) => void>;

}

export namespace contentScripts {
/**
 * @supported Chrome
 */
export interface ContentScript {
    matches: string[];
    exclude_matches?: string[];
    css?: string[];
    js?: string[];
    all_frames?: boolean;
    match_origin_as_fallback?: boolean;
    match_about_blank?: boolean;
    include_globs?: string[];
    exclude_globs?: string[];
    run_at?: extensionTypes.RunAt;
    world?: extensionTypes.ExecutionWorld;
}
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

export namespace contentSettings {
/**
 * @supported Chrome
 */
export interface ResourceIdentifier {
    id: string;
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
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },
      ): Promise<void>;
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },

        callback?: () => void,
      ): void;
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
    getResourceIdentifiers(): Promise<ResourceIdentifier[] | undefined>;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type ContextType = ("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action" | "action" | "tab") | _ContextType;
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ItemType = ("normal" | "checkbox" | "radio" | "separator") | (| "normal"
        | "checkbox"
        | "radio"
        | "separator");
/**
 * @supported Chrome, Firefox
 */
export interface OnClickData {
    /** @supported Chrome, Firefox */
    menuItemId: number | string;
    /** @supported Chrome, Firefox */
    parentMenuItemId?: number | string;
    /** @supported Chrome, Firefox */
    mediaType?: string;
    /** @supported Chrome, Firefox */
    linkUrl?: string;
    /** @supported Chrome, Firefox */
    srcUrl?: string;
    /** @supported Chrome, Firefox */
    pageUrl?: string;
    /** @supported Chrome, Firefox */
    frameUrl?: string;
    /** @supported Chrome, Firefox */
    frameId?: number;
    /** @supported Chrome, Firefox */
    selectionText?: string;
    /** @supported Chrome, Firefox */
    editable: boolean;
    /** @supported Chrome, Firefox */
    wasChecked?: boolean;
    /** @supported Chrome, Firefox */
    checked?: boolean;
    /** @supported Firefox */
    viewType?: extension.ViewType | undefined;
    /** @supported Firefox */
    linkText?: string | undefined;
    /** @supported Firefox */
    bookmarkId?: string | undefined;
    /** @supported Firefox */
    modifiers: _OnClickDataModifiers[];
    /** @supported Firefox */
    button?: number | undefined;
    /** @supported Firefox */
    targetElementId?: number | undefined;
}
/**
 * @supported Chrome
 */
export interface CreateProperties {
    type?: ItemType;
    id?: string;
    title?: string;
    checked?: boolean;
    contexts?: [ContextType, ...ContextType[]];
    visible?: boolean;
    onclick?: (
        info: OnClickData,
        tab: tabs.Tab,
      ) => void;
    parentId?: number | string;
    documentUrlPatterns?: string[];
    targetUrlPatterns?: string[];
    enabled?: boolean;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: 6 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onClicked: events.Event<(
      info: OnClickData,
      tab?: tabs.Tab,
    ) => void> | (events.Event<(info: { menuItemId: number | string; parentMenuItemId?: number | string; checked?: boolean; wasChecked?: boolean; selectionText?: string; srcUrl?: string; mediaType?: "audio" | "image" | "video"; linkUrl?: string; linkText?: string; editable?: boolean; frameId?: number; pageUrl?: string; frameUrl?: string }, tab?: tabs.Tab) => void>);
/**
 * @supported Chrome
 */
export function create(

      createProperties: CreateProperties,

      callback?: () => void,
    ): number | string;
/**
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties, callback?: () => void): number | string;
/**
 * @supported Safari
 */
export function create(createProperties: menus.MenuItemProperties, callback?: () => void): number | string;
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
 * @supported Firefox
 */
export function update(id: number | string, updateProperties: _UpdateUpdateProperties): Promise<void>;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties, callback: () => void): void;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties): Promise<void>;
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
 * @supported Safari
 */
export function remove(identifier: number | string, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(identifier: number | string): Promise<void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export function removeAll(): Promise<void>;
/**
 * @supported Chrome
 */
export function removeAll(

      callback?: () => void,
    ): void;
/**
 * @supported Safari
 */
export function removeAll(callback: () => void): void;
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
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type SameSiteStatus = ("no_restriction" | "lax" | "strict" | "unspecified") | (| "unspecified"
        | "no_restriction"
        | "lax"
        | "strict");
/**
 * @supported Chrome
 */
export interface CookiePartitionKey {
    topLevelSite?: string;
    hasCrossSiteAncestor?: boolean;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface Cookie {
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    name?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    value?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    domain?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    hostOnly?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    path?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    secure?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    httpOnly?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    sameSite?: SameSiteStatus | cookies.CookieSameSiteStatus;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    session?: boolean;
    /** @supported Chrome, Firefox, Safari */
    expirationDate?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    storeId?: string;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    partitionKey?: CookiePartitionKey | PartitionKey;
    /** @supported Firefox */
    firstPartyDomain: string;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface CookieStore {
    /** @supported Chrome, Firefox, Safari */
    id: string;
    /** @supported Chrome, Firefox, Safari */
    tabIds: number[];
    /** @supported Firefox, Safari */
    incognito: boolean;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnChangedCause = ("evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite") | (| "evicted"
        | "expired"
        | "explicit"
        | "expired_overwrite"
        | "overwrite");
/**
 * @supported Chrome, Safari
 */
export interface CookieDetails {
    /**
     * @supported Chrome, Safari
     * @note optional in Safari, required in Chrome
     */
    url?: string;
    /**
     * @supported Chrome, Safari
     * @note optional in Safari, required in Chrome
     */
    name?: string;
    /** @supported Chrome, Safari */
    storeId?: string;
    /** @supported Chrome */
    partitionKey?: CookiePartitionKey;
}
/**
 * @supported Chrome
 */
export interface FrameDetails {
    tabId?: number;
    frameId?: number;
    documentId?: string;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onChanged: events.Event<(changeInfo: { removed: boolean; cookie: Cookie; cause: OnChangedCause }) => void> | events.Event<(...args: unknown[]) => void>;
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
 * @supported Firefox
 */
export function get(details: _GetDetails): Promise<Cookie | null>;
/**
 * @supported Safari
 */
export function get(details: { name: string; url: string; storeId?: string }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function get(details: { name: string; url: string; storeId?: string }): Promise<cookies.Cookie | null>;
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
 * @supported Firefox
 */
export function getAll(details: _GetAllDetails): Promise<Cookie[]>;
/**
 * @supported Safari
 */
export function getAll(details: { name?: string; url?: string; storeId?: string; domain?: string; path?: string; secure?: boolean; session?: boolean }, callback: (result: cookies.Cookie[]) => void): void;
/**
 * @supported Safari
 */
export function getAll(details: { name?: string; url?: string; storeId?: string; domain?: string; path?: string; secure?: boolean; session?: boolean }): Promise<cookies.Cookie[]>;
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
 * @supported Firefox
 */
export function set(details: _SetDetails): Promise<Cookie>;
/**
 * @supported Safari
 */
export function set(details: { url: string; name?: string; storeId?: string; domain?: string; path?: string; value?: string; expirationDate?: number; httpOnly?: boolean; secure?: boolean; sameSite?: cookies.CookieSameSiteStatus }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function set(details: { url: string; name?: string; storeId?: string; domain?: string; path?: string; value?: string; expirationDate?: number; httpOnly?: boolean; secure?: boolean; sameSite?: cookies.CookieSameSiteStatus }): Promise<cookies.Cookie | null>;
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
 * @supported Firefox
 */
export function remove(details: _RemoveDetails): Promise<_RemoveReturnDetails | null>;
/**
 * @supported Safari
 */
export function remove(details: { name: string; url: string; storeId?: string }, callback: (result: cookies.Cookie | null) => void): void;
/**
 * @supported Safari
 */
export function remove(details: { name: string; url: string; storeId?: string }): Promise<cookies.Cookie | null>;
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
 * @supported Safari
 */
export function getAllCookieStores(callback: (result: cookies.CookieStore[]) => void): void;
/**
 * @supported Safari
 */
export function getAllCookieStores(): Promise<cookies.CookieStore[]>;
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

export namespace crossOriginIsolation {
/**
 * @supported Chrome
 */
export interface ResponseHeader {
    value?: string;
}

}

export namespace _debugger {
/**
 * @supported Chrome
 */
export interface Debuggee {
    tabId?: number;
    extensionId?: string;
    targetId?: string;
}
/**
 * @supported Chrome
 */
export interface DebuggerSession {
    tabId?: number;
    extensionId?: string;
    targetId?: string;
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
    type: TargetInfoType;
    id: string;
    tabId?: number;
    extensionId?: string;
    attached: boolean;
    title: string;
    url: string;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type ResourceType = ("main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webtransport" | "webbundle" | "other") | (| "main_frame"
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
        | "other");
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
    id: string;
    path: string;
    enabled: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryKeyValue {
    key: string;
    value: string;
    replaceOnly?: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryTransform {
    removeParams?: string[];
    addOrReplaceParams?: QueryKeyValue[];
}
/**
 * @supported Chrome, Firefox
 */
export interface URLTransform {
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    scheme?: string | _URLTransformScheme | undefined;
    /** @supported Chrome, Firefox */
    host?: string;
    /** @supported Chrome, Firefox */
    port?: string;
    /** @supported Chrome, Firefox */
    path?: string;
    /** @supported Chrome, Firefox */
    query?: string;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    queryTransform?: QueryTransform | _URLTransformQueryTransform | undefined;
    /** @supported Chrome, Firefox */
    fragment?: string;
    /** @supported Chrome, Firefox */
    username?: string;
    /** @supported Chrome, Firefox */
    password?: string;
}
/**
 * @supported Chrome
 */
export interface Redirect {
    extensionPath?: string;
    transform?: URLTransform;
    url?: string;
    regexSubstitution?: string;
}
/**
 * @supported Chrome
 */
export interface HeaderInfo {
    header: string;
    values?: string[];
    excludedValues?: string[];
}
/**
 * @supported Chrome
 */
export interface RuleCondition {
    urlFilter?: string;
    regexFilter?: string;
    isUrlFilterCaseSensitive?: boolean;
    initiatorDomains?: string[];
    excludedInitiatorDomains?: string[];
    requestDomains?: string[];
    excludedRequestDomains?: string[];
    topDomains?: string[];
    excludedTopDomains?: string[];
    domains?: string[];
    excludedDomains?: string[];
    resourceTypes?: ResourceType[];
    excludedResourceTypes?: ResourceType[];
    requestMethods?: RequestMethod[];
    excludedRequestMethods?: RequestMethod[];
    domainType?: DomainType;
    tabIds?: number[];
    excludedTabIds?: number[];
    responseHeaders?: HeaderInfo[];
    excludedResponseHeaders?: HeaderInfo[];
}
/**
 * @supported Chrome
 */
export interface ModifyHeaderInfo {
    header: string;
    operation: HeaderOperation;
    value?: string;
}
/**
 * @supported Chrome
 */
export interface RuleAction {
    type: RuleActionType;
    redirect?: Redirect;
    requestHeaders?: ModifyHeaderInfo[];
    responseHeaders?: ModifyHeaderInfo[];
}
/**
 * @supported Chrome, Firefox
 */
export interface Rule {
    /** @supported Chrome, Firefox */
    id: number;
    /** @supported Chrome, Firefox */
    priority?: number;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    condition: RuleCondition | _RuleCondition;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    action: RuleAction | _RuleAction;
}
/**
 * @supported Chrome, Firefox
 */
export interface MatchedRule {
    /** @supported Chrome, Firefox */
    ruleId: number;
    /** @supported Chrome, Firefox */
    rulesetId: string;
    /** @supported Firefox */
    extensionId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface GetRulesFilter {
    /** @supported Chrome, Firefox */
    ruleIds?: number[];
}
/**
 * @supported Chrome
 */
export interface MatchedRuleInfo {
    rule: MatchedRule;
    timeStamp: number;
    tabId: number;
}
/**
 * @supported Chrome
 */
export interface MatchedRulesFilter {
    tabId?: number;
    minTimeStamp?: number;
}
/**
 * @supported Chrome
 */
export interface RulesMatchedDetails {
    rulesMatchedInfo: MatchedRuleInfo[];
}
/**
 * @supported Chrome
 */
export interface RequestDetails {
    requestId: string;
    url: string;
    initiator?: string;
    method: string;
    frameId: number;
    documentId?: string;
    frameType?: extensionTypes.FrameType;
    documentLifecycle?: extensionTypes.DocumentLifecycle;
    parentFrameId: number;
    parentDocumentId?: string;
    tabId: number;
    type: ResourceType;
}
/**
 * @supported Chrome
 */
export interface TestMatchRequestDetails {
    url: string;
    initiator?: string;
    method?: RequestMethod;
    type: ResourceType;
    tabId?: number;
    topUrl?: string;
    responseHeaders?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface MatchedRuleInfoDebug {
    rule: MatchedRule;
    request: RequestDetails;
}
/**
 * @supported Chrome
 */
export interface RegexOptions {
    regex: string;
    isCaseSensitive?: boolean;
    requireCapturing?: boolean;
}
/**
 * @supported Chrome
 */
export interface IsRegexSupportedResult {
    isSupported: boolean;
    reason?: UnsupportedRegexReason;
}
/**
 * @supported Chrome
 */
export interface TestMatchOutcomeResult {
    matchedRules: MatchedRule[];
}
/**
 * @supported Chrome
 */
export interface UpdateRuleOptions {
    removeRuleIds?: number[];
    addRules?: Rule[];
}
/**
 * @supported Chrome
 */
export interface UpdateRulesetOptions {
    disableRulesetIds?: string[];
    enableRulesetIds?: string[];
}
/**
 * @supported Chrome
 */
export interface UpdateStaticRulesOptions {
    rulesetId: string;
    disableRuleIds?: number[];
    enableRuleIds?: number[];
}
/**
 * @supported Chrome
 */
export interface GetDisabledRuleIdsOptions {
    rulesetId: string;
}
/**
 * @supported Chrome
 */
export interface TabActionCountUpdate {
    tabId: number;
    increment: number;
}
/**
 * @supported Chrome
 */
export interface ExtensionActionOptions {
    displayActionCountAsBadgeText?: boolean;
    tabUpdate?: TabActionCountUpdate;
}
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const GUARANTEED_MINIMUM_STATIC_RULES: 30000 | number;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const MAX_NUMBER_OF_DYNAMIC_RULES: 30000 | number;
/**
 * @supported Chrome
 */
export const MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES: 5000;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const MAX_NUMBER_OF_SESSION_RULES: 5000 | number;
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
 * @note type differs between browsers; emitted as a union
 */
export const MAX_NUMBER_OF_REGEX_RULES: 1000 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const MAX_NUMBER_OF_STATIC_RULESETS: 100 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 50 | number;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const DYNAMIC_RULESET_ID: "_dynamic" | string;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const SESSION_RULESET_ID: "_session" | string;
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
 * @supported Firefox
 */
export function updateDynamicRules(options: _UpdateDynamicRulesOptions): Promise<void>;
/**
 * @supported Safari
 */
export function updateDynamicRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateDynamicRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }): Promise<void>;
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
 * @supported Firefox
 */
export function updateSessionRules(options: _UpdateSessionRulesOptions): Promise<void>;
/**
 * @supported Safari
 */
export function updateSessionRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateSessionRules(options: { addRules?: Record<string, unknown>[]; removeRuleIds?: number[] }): Promise<void>;
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
 * @supported Firefox
 */
export function updateEnabledRulesets(updateRulesetOptions: _UpdateEnabledRulesetsUpdateRulesetOptions): Promise<void>;
/**
 * @supported Safari
 */
export function updateEnabledRulesets(options: { enableRulesetIds?: string[]; disableRulesetIds?: string[] }, callback: () => void): void;
/**
 * @supported Safari
 */
export function updateEnabledRulesets(options: { enableRulesetIds?: string[]; disableRulesetIds?: string[] }): Promise<void>;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function getEnabledRulesets(callback: (result: string[]) => void): void;
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
 * @supported Firefox
 */
export function updateStaticRules(options: _UpdateStaticRulesOptions): Promise<void>;
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
 * @supported Firefox
 */
export function getDisabledRuleIds(options?: _GetDisabledRuleIdsOptions): Promise<number[]>;
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
 * @supported Safari
 */
export function setExtensionActionOptions(options: { displayActionCountAsBadgeText?: boolean; tabUpdate?: { tabId: number; increment: number } }, callback: () => void): void;
/**
 * @supported Safari
 */
export function setExtensionActionOptions(options: { displayActionCountAsBadgeText?: boolean; tabUpdate?: { tabId: number; increment: number } }): Promise<void>;
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
 * @supported Firefox
 */
export function isRegexSupported(regexOptions: _IsRegexSupportedRegexOptions): Promise<_IsRegexSupportedReturnResult>;
/**
 * @supported Safari
 */
export function isRegexSupported(regexOptions: { regex: string; isCaseSensitive?: boolean; requireCapturing?: boolean }, callback: (result: { isSupported: boolean; reason?: string }) => void): void;
/**
 * @supported Safari
 */
export function isRegexSupported(regexOptions: { regex: string; isCaseSensitive?: boolean; requireCapturing?: boolean }): Promise<{ isSupported: boolean; reason?: string }>;
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
 * @supported Firefox, Safari
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
    systemAudio?: SystemAudioPreferenceEnum;
    windowAudio?: WindowAudioPreferenceEnum;
    selfBrowserSurface?: SelfCapturePreferenceEnum;
    suppressLocalAudioPlaybackIntended?: boolean;
}

}

export namespace devtools.inspectedWindow {
/**
 * @supported Chrome, Firefox
 */
export interface Resource {
    /** @supported Chrome, Firefox */
    url: string;
    /** @supported Chrome */
    getContent(): Promise<{ content: string; encoding: string }>;
    getContent(callback: (content: string, encoding: string) => void): void;
    /** @supported Chrome */
    setContent(content: string, commit: boolean): Promise<{ [name: string]: unknown } | undefined>;
    setContent(content: string, commit: boolean, callback: (result?: { [name: string]: unknown }) => void): void;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export const tabId: number;
/**
 * @supported Chrome
 */
export const onResourceAdded: events.Event<(resource: Resource) => void>;
/**
 * @supported Chrome
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
 * @supported Firefox
 */
export function reload(reloadOptions?: _ReloadReloadOptions): void;
/**
 * @supported Safari
 */
export function reload(reloadOptions?: devtools.inspectedWindow.DevToolsReloadOptions): void;
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
 * @supported Firefox
 */
export function eval<T = unknown>(expression: string, options?: EvalOptions): Promise<[T | undefined, EvaluationExceptionInfo | undefined]>;
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

export namespace devtools.network {
/**
 * @supported Chrome, Firefox
 */
export interface Request {
    /**
     * @supported Chrome, Firefox
     * @note signature differs between browsers; both forms emitted
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
    getContent(): Promise<object>;
}
/**
 * @supported Chrome, Firefox
 */
export const onRequestFinished: events.Event<(
      request: Request,
    ) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onNavigated: events.Event<(
      url: string,
    ) => void>;
/**
 * @supported Chrome, Firefox
 */
export function getHAR(): Promise<Record<string, unknown>>;

}

export namespace devtools.panels {
/**
 * @supported Chrome, Firefox
 */
export interface ElementsPanel {
    /** @supported Chrome, Firefox */
    onSelectionChanged: events.Event<() => void>;
    /**
     * @supported Chrome, Firefox
     * @note signature differs between browsers; both forms emitted
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
    /**
     * @supported Chrome, Firefox
     * @note signature differs between browsers; both forms emitted
     */
    setExpression(expression: string, rootTitle?: string): Promise<void>;
    setExpression(expression: string, rootTitle?: string, callback?: () => void): void;
    /**
     * @supported Chrome, Firefox
     * @note signature differs between browsers; both forms emitted
     */
    setObject(jsonObject: _WebExtJsonObject | string, rootTitle?: string): Promise<void>;
    setObject(jsonObject: string, rootTitle?: string, callback?: () => void): void;
    setObject(jsonObject: _WebExtJsonObject, rootTitle?: string): Promise<void>;
    /**
     * @supported Chrome, Firefox
     * @note signature differs between browsers; both forms emitted
     */
    setPage(path: string): Promise<void>;
    setPage(path: string, callback?: () => void): void;
    setPage(path: string | _manifest.ExtensionURL): Promise<void>;
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
 * @supported Chrome
 */
export const sources: SourcesPanel;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Firefox
 */
export function create(
        title: string,
        iconPath: _manifest.ExtensionURL | "",
        pagePath: _manifest.ExtensionURL,
    ): Promise<ExtensionPanel>;
/**
 * @supported Safari
 */
export function create(title: string, iconPath: string, pagePath: string, callback?: (panel: Record<string, unknown>) => void): void;
/**
 * @supported Chrome
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
/**
 * @supported Firefox, Safari
 */
export const onThemeChanged: WebExtEvent<(themeName: string) => void>;

}

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

export namespace devtools.recorder {
/**
 * @supported Chrome
 */
export interface RecorderExtensionPlugin {
    stringify(

        recording: {},
      ): void;
    stringifyStep(

        step: {},
      ): void;
    replay(

        recording: {},
      ): void;
}
/**
 * @supported Chrome
 */
export interface RecorderView {
    onShown: events.Event<() => void>;
    onHidden: events.Event<() => void>;
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
    resultCode: number;
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

export namespace documentScan {
/**
 * @supported Chrome
 */
export interface ScanOptions {
    mimeTypes?: string[];
    maxImages?: number;
}
/**
 * @supported Chrome
 */
export interface ScanResults {
    dataUrls: string[];
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
    scannerId: string;
    name: string;
    manufacturer: string;
    model: string;
    deviceUuid: string;
    connectionType: ConnectionType;
    secure: boolean;
    imageFormats: string[];
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
    type: ConstraintType;
    min?: number | number;
    max?: number | number;
    quant?: number | number;
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
    name: string;
    title: string;
    description: string;
    type: OptionType;
    unit: OptionUnit;
    value?: boolean | number | number[] | number | number[] | string;
    constraint?: OptionConstraint;
    isDetectable: boolean;
    configurability: Configurability;
    isAutoSettable: boolean;
    isEmulated: boolean;
    isActive: boolean;
    isAdvanced: boolean;
    isInternal: boolean;
}
/**
 * @supported Chrome
 */
export interface DeviceFilter {
    local?: boolean;
    secure?: boolean;
}
/**
 * @supported Chrome
 */
export interface OptionGroup {
    title: string;
    members: string[];
}
/**
 * @supported Chrome
 */
export interface GetScannerListResponse {
    result: OperationResult;
    scanners: ScannerInfo[];
}
/**
 * @supported Chrome
 */
export interface OpenScannerResponse {
    scannerId: string;
    result: OperationResult;
    scannerHandle?: string;
    options?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface GetOptionGroupsResponse {
    scannerHandle: string;
    result: OperationResult;
    groups?: OptionGroup[];
}
/**
 * @supported Chrome
 */
export interface CloseScannerResponse {
    scannerHandle: string;
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface OptionSetting {
    name: string;
    type: OptionType;
    value?: boolean | number | number[] | number | number[] | string;
}
/**
 * @supported Chrome
 */
export interface SetOptionResult {
    name: string;
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface SetOptionsResponse {
    scannerHandle: string;
    results: SetOptionResult[];
    options?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface StartScanOptions {
    format: string;
    maxReadSize?: number;
}
/**
 * @supported Chrome
 */
export interface StartScanResponse {
    scannerHandle: string;
    result: OperationResult;
    job?: string;
}
/**
 * @supported Chrome
 */
export interface CancelScanResponse {
    job: string;
    result: OperationResult;
}
/**
 * @supported Chrome
 */
export interface ReadScanDataResponse {
    job: string;
    result: OperationResult;
    data?: ArrayBuffer;
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
/**
 * @supported Safari
 */
export function openOrClosedShadowRoot(element: unknown): unknown;

}

export namespace downloads {
/**
 * @supported Chrome
 */
export interface HeaderNameValuePair {
    name: string;
    value: string;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type FilenameConflictAction = ("uniquify" | "overwrite" | "prompt") | (| "uniquify"
        | "overwrite"
        | "prompt");
/**
 * @supported Chrome
 */
export interface FilenameSuggestion {
    filename: string;
    conflictAction?: FilenameConflictAction;
}
/**
 * @supported Chrome
 */
export type HttpMethod = "GET" | "POST";
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type InterruptReason = ("FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH") | (| "FILE_FAILED"
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
        | "CRASH");
/**
 * @supported Chrome
 */
export interface DownloadOptions {
    url: string;
    filename?: string;
    conflictAction?: FilenameConflictAction;
    saveAs?: boolean;
    method?: HttpMethod;
    headers?: HeaderNameValuePair[];
    body?: string;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type DangerType = ("file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted" | "allowlistedByPolicy" | "asyncScanning" | "asyncLocalPasswordScanning" | "passwordProtected" | "blockedTooLarge" | "sensitiveContentWarning" | "sensitiveContentBlock" | "deepScannedFailed" | "deepScannedSafe" | "deepScannedOpenedDangerous" | "promptForScanning" | "promptForLocalPasswordScanning" | "accountCompromise" | "blockedScanFailed" | "forceSaveToGdrive" | "forceSaveToOnedrive") | (| "file"
        | "url"
        | "content"
        | "uncommon"
        | "host"
        | "unwanted"
        | "safe"
        | "accepted");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type State = ("in_progress" | "interrupted" | "complete") | (| "in_progress"
        | "interrupted"
        | "complete");
/**
 * @supported Chrome, Firefox
 */
export interface DownloadItem {
    /** @supported Chrome, Firefox */
    id: number;
    /** @supported Chrome, Firefox */
    url: string;
    /** @supported Chrome */
    finalUrl: string;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    referrer?: string;
    /** @supported Chrome, Firefox */
    filename: string;
    /** @supported Chrome, Firefox */
    incognito: boolean;
    /** @supported Chrome, Firefox */
    danger: DangerType;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    mime?: string;
    /** @supported Chrome, Firefox */
    startTime: string;
    /** @supported Chrome, Firefox */
    endTime?: string;
    /** @supported Chrome, Firefox */
    estimatedEndTime?: string;
    /** @supported Chrome, Firefox */
    state: State;
    /** @supported Chrome, Firefox */
    paused: boolean;
    /** @supported Chrome, Firefox */
    canResume: boolean;
    /** @supported Chrome, Firefox */
    error?: InterruptReason;
    /** @supported Chrome, Firefox */
    bytesReceived: number;
    /** @supported Chrome, Firefox */
    totalBytes: number;
    /** @supported Chrome, Firefox */
    fileSize: number;
    /** @supported Chrome, Firefox */
    exists: boolean;
    /** @supported Chrome, Firefox */
    byExtensionId?: string;
    /** @supported Chrome, Firefox */
    byExtensionName?: string;
    /** @supported Firefox */
    cookieStoreId?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 */
export interface DownloadQuery {
    /** @supported Chrome, Firefox */
    query?: string[];
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    startedBefore?: string | DownloadTime | undefined;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    startedAfter?: string | DownloadTime | undefined;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    endedBefore?: string | DownloadTime | undefined;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    endedAfter?: string | DownloadTime | undefined;
    /** @supported Chrome, Firefox */
    totalBytesGreater?: number;
    /** @supported Chrome, Firefox */
    totalBytesLess?: number;
    /** @supported Chrome, Firefox */
    filenameRegex?: string;
    /** @supported Chrome, Firefox */
    urlRegex?: string;
    /** @supported Chrome */
    finalUrlRegex?: string;
    /** @supported Chrome, Firefox */
    limit?: number;
    /** @supported Chrome, Firefox */
    orderBy?: string[];
    /** @supported Chrome, Firefox */
    id?: number;
    /** @supported Chrome, Firefox */
    url?: string;
    /** @supported Chrome */
    finalUrl?: string;
    /** @supported Chrome, Firefox */
    filename?: string;
    /** @supported Chrome, Firefox */
    danger?: DangerType;
    /** @supported Chrome, Firefox */
    mime?: string;
    /** @supported Chrome, Firefox */
    startTime?: string;
    /** @supported Chrome, Firefox */
    endTime?: string;
    /** @supported Chrome, Firefox */
    state?: State;
    /** @supported Chrome, Firefox */
    paused?: boolean;
    /** @supported Chrome, Firefox */
    error?: InterruptReason;
    /** @supported Chrome, Firefox */
    bytesReceived?: number;
    /** @supported Chrome, Firefox */
    totalBytes?: number;
    /** @supported Chrome, Firefox */
    fileSize?: number;
    /** @supported Chrome, Firefox */
    exists?: boolean;
    /** @supported Firefox */
    cookieStoreId?: string | undefined;
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
    id: number;
    url?: StringDelta;
    finalUrl?: StringDelta;
    filename?: StringDelta;
    danger?: StringDelta;
    mime?: StringDelta;
    startTime?: StringDelta;
    endTime?: StringDelta;
    state?: StringDelta;
    canResume?: BooleanDelta;
    paused?: BooleanDelta;
    error?: StringDelta;
    totalBytes?: DoubleDelta;
    fileSize?: DoubleDelta;
    exists?: BooleanDelta;
}
/**
 * @supported Chrome
 */
export interface GetFileIconOptions {
    size?: number;
}
/**
 * @supported Chrome
 */
export interface UiOptions {
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
 * @note type differs between browsers; emitted as a union
 */
export const onChanged: events.Event<(downloadDelta: DownloadDelta) => void> | events.Event<(downloadDelta: _OnChangedDownloadDelta) => void>;
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
    model: string;
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
    macAddress: string;
    ipv4?: string;
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
    id: string;
    subtleCrypto: SubtleCrypto;
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
    algorithm: Algorithm;
}
/**
 * @supported Chrome
 */
export interface ChallengeKeyOptions {
    challenge: ArrayBuffer;
    registerKey?: RegisterKeyOptions;
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
    /** @supported Chrome, Firefox */
    hostContains?: string;
    /** @supported Chrome, Firefox */
    hostEquals?: string;
    /** @supported Chrome, Firefox */
    hostPrefix?: string;
    /** @supported Chrome, Firefox */
    hostSuffix?: string;
    /** @supported Chrome, Firefox */
    pathContains?: string;
    /** @supported Chrome, Firefox */
    pathEquals?: string;
    /** @supported Chrome, Firefox */
    pathPrefix?: string;
    /** @supported Chrome, Firefox */
    pathSuffix?: string;
    /** @supported Chrome, Firefox */
    queryContains?: string;
    /** @supported Chrome, Firefox */
    queryEquals?: string;
    /** @supported Chrome, Firefox */
    queryPrefix?: string;
    /** @supported Chrome, Firefox */
    querySuffix?: string;
    /** @supported Chrome, Firefox */
    urlContains?: string;
    /** @supported Chrome, Firefox */
    urlEquals?: string;
    /** @supported Chrome, Firefox */
    urlMatches?: string;
    /** @supported Chrome, Firefox */
    originAndPathMatches?: string;
    /** @supported Chrome, Firefox */
    urlPrefix?: string;
    /** @supported Chrome, Firefox */
    urlSuffix?: string;
    /** @supported Chrome, Firefox */
    schemes?: string[];
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    ports?: (number | number[])[] | Array<number | [number, number]> | undefined;
    /** @supported Chrome */
    cidrBlocks?: string[];
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
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ViewType = ("tab" | "popup") | (| "tab"
        | "popup"
        | "sidebar");
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const inIncognitoContext: boolean | (boolean | undefined);
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
 * @supported Firefox
 */
export function getViews(fetchProperties?: _GetViewsFetchProperties): Window[];
/**
 * @supported Safari
 */
export function getViews(fetchProperties?: extension.ViewFilter): globalThis.Window[];
/**
 * @supported Chrome
 */
export function getBackgroundPage(): Window | undefined;
/**
 * @supported Firefox
 */
export function getBackgroundPage(): Window | void;
/**
 * @supported Safari
 */
export function getBackgroundPage(): globalThis.Window | null;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function isAllowedIncognitoAccess(callback: (result: boolean) => void): void;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Safari
 */
export function isAllowedFileSchemeAccess(callback: (result: boolean) => void): void;
/**
 * @supported Chrome
 */
export function setUpdateUrlData(

      data: string,
    ): void;
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
    matches: string[];
    permissions: string[];
}
/**
 * @supported Chrome
 */
export interface ExternallyConnectable {
    ids?: string[];
    matches?: string[];
    accepts_tls_channel_id?: boolean;
}
/**
 * @supported Chrome
 */
export interface OptionsUI {
    page: string;
    chrome_style?: boolean;
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
    tcp?: {

        /**
         * The host:port pattern for `connect` operations.
         */
        connect?: SocketHostPatterns,
      };
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
    uuids?: string[];
    socket?: boolean;
    low_energy?: boolean;
    peripheral?: boolean;
}
/**
 * @supported Chrome
 */
export interface UsbPrinters {
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
 * @note definitions differ between browsers; emitted as a union
 */
export type ImageDataType = ImageData | (globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray });
/**
 * @supported Chrome, Firefox
 */
export type ImageFormat = "jpeg" | "png";
/**
 * @supported Chrome, Firefox
 */
export interface ImageDetails {
    /** @supported Chrome, Firefox */
    format?: ImageFormat;
    /** @supported Chrome, Firefox */
    quality?: number;
    /** @supported Firefox */
    rect?: _ImageDetailsRect | undefined;
    /** @supported Firefox */
    scale?: number | undefined;
    /** @supported Firefox */
    resetScrollPosition?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type RunAt = ("document_start" | "document_end" | "document_idle") | (| "document_start"
        | "document_end"
        | "document_idle");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type CSSOrigin = ("author" | "user") | ("user" | "author");
/**
 * @supported Chrome, Firefox
 */
export interface InjectDetails {
    /** @supported Chrome, Firefox */
    code?: string;
    /** @supported Chrome, Firefox */
    file?: string;
    /** @supported Chrome, Firefox */
    allFrames?: boolean;
    /** @supported Chrome, Firefox */
    frameId?: number;
    /** @supported Chrome, Firefox */
    matchAboutBlank?: boolean;
    /** @supported Chrome, Firefox */
    runAt?: RunAt;
    /** @supported Chrome, Firefox */
    cssOrigin?: CSSOrigin;
}
/**
 * @supported Chrome
 */
export interface DeleteInjectionDetails {
    code?: string;
    file?: string;
    allFrames?: boolean;
    frameId?: number;
    matchAboutBlank?: boolean;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type ExecutionWorld = ("ISOLATED" | "MAIN" | "USER_SCRIPT") | (| "ISOLATED"
        | "MAIN");
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

export namespace fileBrowserHandler {
/**
 * @supported Chrome
 */
export interface FileHandlerExecuteEventDetails {
    entries: /* TODO: Upstream type uses any */ any[];
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
    src: string;
    sizes?: string;
    type?: string;
}
/**
 * @supported Chrome
 */
export interface FileHandler {
    accept: {[name: string]: /* TODO: Upstream type uses any */ any};
    action: string;
    name: string;
    icons?: Icon[];
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
    providerName: string;
    id: string;
}
/**
 * @supported Chrome
 */
export interface CloudFileInfo {
    versionTag?: string;
}
/**
 * @supported Chrome
 */
export interface EntryMetadata {
    isDirectory?: boolean;
    name?: string;
    size?: number;
    modificationTime?: Date;
    mimeType?: string;
    thumbnail?: string;
    cloudIdentifier?: CloudIdentifier;
    cloudFileInfo?: CloudFileInfo;
}
/**
 * @supported Chrome
 */
export interface Watcher {
    entryPath: string;
    recursive: boolean;
    lastTag?: string;
}
/**
 * @supported Chrome
 */
export interface OpenedFile {
    openRequestId: number;
    filePath: string;
    mode: OpenFileMode;
}
/**
 * @supported Chrome
 */
export interface FileSystemInfo {
    fileSystemId: string;
    displayName: string;
    writable: boolean;
    openedFilesLimit: number;
    openedFiles: OpenedFile[];
    supportsNotifyTag?: boolean;
    watchers: Watcher[];
}
/**
 * @supported Chrome
 */
export interface MountOptions {
    fileSystemId: string;
    displayName: string;
    writable?: boolean;
    openedFilesLimit?: number;
    supportsNotifyTag?: boolean;
    persistent?: boolean;
}
/**
 * @supported Chrome
 */
export interface UnmountOptions {
    fileSystemId: string;
}
/**
 * @supported Chrome
 */
export interface UnmountRequestedOptions {
    fileSystemId: string;
    requestId: number;
}
/**
 * @supported Chrome
 */
export interface GetMetadataRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPath: string;
    isDirectory: boolean;
    name: boolean;
    size: boolean;
    modificationTime: boolean;
    mimeType: boolean;
    thumbnail: boolean;
    cloudIdentifier: boolean;
    cloudFileInfo: boolean;
}
/**
 * @supported Chrome
 */
export interface GetActionsRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPaths: string[];
}
/**
 * @supported Chrome
 */
export interface ReadDirectoryRequestedOptions {
    fileSystemId: string;
    requestId: number;
    directoryPath: string;
    isDirectory: boolean;
    name: boolean;
    size: boolean;
    modificationTime: boolean;
    mimeType: boolean;
    thumbnail: boolean;
}
/**
 * @supported Chrome
 */
export interface OpenFileRequestedOptions {
    fileSystemId: string;
    requestId: number;
    filePath: string;
    mode: OpenFileMode;
}
/**
 * @supported Chrome
 */
export interface CloseFileRequestedOptions {
    fileSystemId: string;
    requestId: number;
    openRequestId: number;
}
/**
 * @supported Chrome
 */
export interface ReadFileRequestedOptions {
    fileSystemId: string;
    requestId: number;
    openRequestId: number;
    offset: number;
    length: number;
}
/**
 * @supported Chrome
 */
export interface CreateDirectoryRequestedOptions {
    fileSystemId: string;
    requestId: number;
    directoryPath: string;
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface DeleteEntryRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPath: string;
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface CreateFileRequestedOptions {
    fileSystemId: string;
    requestId: number;
    filePath: string;
}
/**
 * @supported Chrome
 */
export interface CopyEntryRequestedOptions {
    fileSystemId: string;
    requestId: number;
    sourcePath: string;
    targetPath: string;
}
/**
 * @supported Chrome
 */
export interface MoveEntryRequestedOptions {
    fileSystemId: string;
    requestId: number;
    sourcePath: string;
    targetPath: string;
}
/**
 * @supported Chrome
 */
export interface TruncateRequestedOptions {
    fileSystemId: string;
    requestId: number;
    filePath: string;
    length: number;
}
/**
 * @supported Chrome
 */
export interface WriteFileRequestedOptions {
    fileSystemId: string;
    requestId: number;
    openRequestId: number;
    offset: number;
    data: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface AbortRequestedOptions {
    fileSystemId: string;
    requestId: number;
    operationRequestId: number;
}
/**
 * @supported Chrome
 */
export interface AddWatcherRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPath: string;
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface RemoveWatcherRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPath: string;
    recursive: boolean;
}
/**
 * @supported Chrome
 */
export interface Action {
    id: string;
    title?: string;
}
/**
 * @supported Chrome
 */
export interface ExecuteActionRequestedOptions {
    fileSystemId: string;
    requestId: number;
    entryPaths: string[];
    actionId: string;
}
/**
 * @supported Chrome
 */
export interface Change {
    entryPath: string;
    changeType: ChangeType;
    cloudFileInfo?: CloudFileInfo;
}
/**
 * @supported Chrome
 */
export interface NotifyOptions {
    fileSystemId: string;
    observedPath: string;
    recursive: boolean;
    changeType: ChangeType;
    changes?: Change[];
    tag?: string;
}
/**
 * @supported Chrome
 */
export interface ConfigureRequestedOptions {
    fileSystemId: string;
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
    fontId: string;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type TransitionType = ("link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated") | (| "link"
        | "typed"
        | "auto_bookmark"
        | "auto_subframe"
        | "manual_subframe"
        | "generated"
        | "auto_toplevel"
        | "form_submit"
        | "reload"
        | "keyword"
        | "keyword_generated");
/**
 * @supported Chrome, Firefox
 */
export interface HistoryItem {
    /** @supported Chrome, Firefox */
    id: string;
    /** @supported Chrome, Firefox */
    url?: string;
    /** @supported Chrome, Firefox */
    title?: string;
    /** @supported Chrome, Firefox */
    lastVisitTime?: number;
    /** @supported Chrome, Firefox */
    visitCount?: number;
    /** @supported Chrome, Firefox */
    typedCount?: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface VisitItem {
    /** @supported Chrome, Firefox */
    id: string;
    /** @supported Chrome, Firefox */
    visitId: string;
    /** @supported Chrome, Firefox */
    visitTime?: number;
    /** @supported Chrome, Firefox */
    referringVisitId: string;
    /** @supported Chrome, Firefox */
    transition: TransitionType;
    /** @supported Chrome */
    isLocal: boolean;
}
/**
 * @supported Chrome
 */
export interface UrlDetails {
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
 * @supported Firefox
 */
export function search(query: _SearchQuery): Promise<HistoryItem[]>;
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
 * @supported Firefox
 */
export function getVisits(details: _GetVisitsDetails): Promise<VisitItem[]>;
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
 * @supported Firefox
 */
export function addUrl(details: _AddUrlDetails): Promise<void>;
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
 * @supported Firefox
 */
export function deleteUrl(details: _DeleteUrlDetails): Promise<void>;
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
 * @supported Firefox
 */
export function deleteRange(range: _DeleteRangeRange): Promise<void>;
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
 * @supported Safari
 */
export function getAcceptLanguages(callback: (result: string[]) => void): void;
/**
 * @supported Safari
 */
export function getAcceptLanguages(): Promise<string[]>;
/**
 * @supported Chrome, Firefox
 */
export function getMessage(messageName: string, substitutions?: string | number | (string | number)[]): string;
/**
 * @supported Safari
 */
export function getMessage(name: string, substitutions?: string | string[]): string;
/**
 * @supported Chrome, Firefox, Safari
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

export namespace identity {
/**
 * @supported Chrome, Firefox
 */
export interface AccountInfo {
    /** @supported Chrome, Firefox */
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
    accountStatus?: AccountStatus;
}
/**
 * @supported Chrome
 */
export interface ProfileUserInfo {
    email: string;
    id: string;
}
/**
 * @supported Chrome
 */
export interface TokenDetails {
    interactive?: boolean;
    account?: AccountInfo;
    scopes?: string[];
    enableGranularPermissions?: boolean;
}
/**
 * @supported Chrome
 */
export interface InvalidTokenDetails {
    token: string;
}
/**
 * @supported Chrome
 */
export interface WebAuthFlowDetails {
    url: string;
    interactive?: boolean;
    abortOnLoadForNonInteractive?: boolean;
    timeoutMsForNonInteractive?: number;
}
/**
 * @supported Chrome
 */
export interface GetAuthTokenResult {
    token?: string;
    grantedScopes?: string[];
}
/**
 * @supported Chrome
 */
export const onSignInChanged: events.Event<(account: AccountInfo, signedIn: boolean) => void>;
/**
 * @supported Chrome
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
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type IdleState = ("active" | "idle" | "locked") | ("active" | "idle");
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

export namespace incognito {
/**
 * @supported Chrome
 */
export type IncognitoMode = "split" | "spanning" | "not_allowed";

}

export namespace input.ime {
/**
 * @supported Chrome
 */
export type KeyboardEventType = "keyup" | "keydown";
/**
 * @supported Chrome
 */
export interface KeyboardEvent {
    type: KeyboardEventType;
    requestId?: string;
    extensionId?: string;
    key: string;
    code: string;
    keyCode?: number;
    altKey?: boolean;
    altgrKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    capsLock?: boolean;
}
/**
 * @supported Chrome
 */
export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password" | "null";
/**
 * @supported Chrome
 */
export type AutoCapitalizeType = "characters" | "words" | "sentences";
/**
 * @supported Chrome
 */
export interface InputContext {
    contextID: number;
    type: InputContextType;
    autoCorrect: boolean;
    autoComplete: boolean;
    autoCapitalize: AutoCapitalizeType;
    spellCheck: boolean;
    shouldDoLearning: boolean;
}
/**
 * @supported Chrome
 */
export type MenuItemStyle = "check" | "radio" | "separator";
/**
 * @supported Chrome
 */
export interface MenuItem {
    id: string;
    label?: string;
    style?: MenuItemStyle;
    visible?: boolean;
    checked?: boolean;
    enabled?: boolean;
}
/**
 * @supported Chrome
 */
export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";
/**
 * @supported Chrome
 */
export type WindowPosition = "cursor" | "composition";
/**
 * @supported Chrome
 */
export type ScreenType = "normal" | "login" | "lock" | "secondary-login";
/**
 * @supported Chrome
 */
export type MouseButton = "left" | "middle" | "right";
/**
 * @supported Chrome
 */
export type AssistiveWindowType = "undo";
/**
 * @supported Chrome
 */
export interface AssistiveWindowProperties {
    type: AssistiveWindowType;
    visible: boolean;
    announceString?: string;
}
/**
 * @supported Chrome
 */
export type AssistiveWindowButton = "undo" | "addToDictionary";
/**
 * @supported Chrome
 */
export interface MenuParameters {
    engineID: string;
    items: MenuItem[];
}
/**
 * @supported Chrome
 */
export const onActivate: events.Event<(
      engineID: string,
      screen: ScreenType,
    ) => void>;
/**
 * @supported Chrome
 */
export const onDeactivated: events.Event<(
      engineID: string,
    ) => void>;
/**
 * @supported Chrome
 */
export const onFocus: events.Event<(
      context: InputContext,
    ) => void>;
/**
 * @supported Chrome
 */
export const onBlur: events.Event<(
      contextID: number,
    ) => void>;
/**
 * @supported Chrome
 */
export const onInputContextUpdate: events.Event<(
      context: InputContext,
    ) => void>;
/**
 * @supported Chrome
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
 */
export const onCandidateClicked: events.Event<(
      engineID: string,
      candidateID: number,
      button: MouseButton,
    ) => void>;
/**
 * @supported Chrome
 */
export const onMenuItemActivated: events.Event<(
      engineID: string,
      name: string,
    ) => void>;
/**
 * @supported Chrome
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
 */
export const onReset: events.Event<(
      engineID: string,
    ) => void>;
/**
 * @supported Chrome
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
export function hideInputView(): void;
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
/**
 * @supported Chrome
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
    /** @supported Chrome, Firefox */
    size: number;
    /** @supported Chrome, Firefox */
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
 * @note definitions differ between browsers; emitted as a union
 */
export type ExtensionType = ("extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme" | "login_screen_extension") | ("extension" | "theme");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ExtensionInstallType = ("admin" | "development" | "normal" | "sideload" | "other") | (| "development"
        | "normal"
        | "sideload"
        | "admin"
        | "other");
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionInfo {
    /** @supported Chrome, Firefox */
    id: string;
    /** @supported Chrome, Firefox */
    name: string;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    shortName?: string;
    /** @supported Chrome, Firefox */
    description: string;
    /** @supported Chrome, Firefox */
    version: string;
    /** @supported Chrome, Firefox */
    versionName?: string;
    /** @supported Chrome, Firefox */
    mayDisable: boolean;
    /** @supported Chrome */
    mayEnable?: boolean;
    /** @supported Chrome, Firefox */
    enabled: boolean;
    /** @supported Chrome, Firefox */
    disabledReason?: ExtensionDisabledReason;
    /** @supported Chrome */
    isApp: boolean;
    /** @supported Chrome, Firefox */
    type: ExtensionType;
    /** @supported Chrome */
    appLaunchUrl?: string;
    /** @supported Chrome, Firefox */
    homepageUrl?: string;
    /** @supported Chrome, Firefox */
    updateUrl?: string;
    /** @supported Chrome */
    offlineEnabled: boolean;
    /** @supported Chrome, Firefox */
    optionsUrl: string;
    /** @supported Chrome, Firefox */
    icons?: IconInfo[];
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    permissions?: string[];
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    hostPermissions?: string[];
    /** @supported Chrome, Firefox */
    installType: ExtensionInstallType;
    /** @supported Chrome */
    launchType?: LaunchType;
    /** @supported Chrome */
    availableLaunchTypes?: LaunchType[];
}
/**
 * @supported Chrome
 */
export interface UninstallOptions {
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
 * @note type differs between browsers; emitted as a union
 */
export const onUninstalled: events.Event<(id: string) => void> | events.Event<(info: ExtensionInfo) => void>;
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
 * @supported Firefox
 */
export function get(id: _manifest.ExtensionID): Promise<ExtensionInfo>;
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
 * @supported Firefox
 */
export function uninstallSelf(options?: _UninstallSelfOptions): Promise<void>;
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

export namespace manifestTypes {
/**
 * @supported Chrome
 */
export interface ChromeSettingsOverrides {
    homepage?: string;
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
    configurable?: boolean;
    multiple_mounts?: boolean;
    watchable?: boolean;
    source: FileSystemProviderSource;
}

}

export namespace mimeHandler {
/**
 * @supported Chrome
 */
export interface StreamInfo {
    mimeType: string;
    originalUrl: string;
    streamUrl: string;
    tabId: number;
    responseHeaders: {[name: string]: /* TODO: Upstream type uses any */ any};
    embedded: boolean;
}
/**
 * @supported Chrome
 */
export interface MimeHandlerOptions {
    enabled: boolean;
}
/**
 * @supported Chrome
 */
export function getStreamInfo(): Promise<StreamInfo>;
/**
 * @supported Chrome
 */
export function getStreamInfo(

      callback?: (
        info: StreamInfo,
      ) => void,
    ): void;
/**
 * @supported Chrome
 */
export function abortAndFallbackToNativeHandler(): Promise<void>;
/**
 * @supported Chrome
 */
export function abortAndFallbackToNativeHandler(

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setMimeHandlerOptions(

      mimeType: string,

      options: MimeHandlerOptions,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setMimeHandlerOptions(

      mimeType: string,

      options: MimeHandlerOptions,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getMimeHandlerOptions(

      mimeType: string,
    ): Promise<MimeHandlerOptions>;
/**
 * @supported Chrome
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
 * @note definitions differ between browsers; emitted as a union
 */
export type TemplateType = ("basic" | "image" | "list" | "progress") | (| "basic"
        | "image"
        | "list"
        | "progress");
/**
 * @supported Chrome, Firefox
 */
export type PermissionLevel = "granted" | "denied";
/**
 * @supported Chrome, Firefox
 */
export interface NotificationItem {
    /** @supported Chrome, Firefox */
    title: string;
    /** @supported Chrome, Firefox */
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
    title: string;
    iconUrl?: string;
}
/**
 * @supported Chrome
 */
export interface NotificationOptions {
    type?: TemplateType;
    iconUrl?: string;
    appIconMaskUrl?: string;
    title?: string;
    message?: string;
    contextMessage?: string;
    priority?: number;
    eventTime?: number;
    buttons?: NotificationButton[];
    imageUrl?: string;
    items?: NotificationItem[];
    progress?: number;
    isClickable?: boolean;
    requireInteraction?: boolean;
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
 * @supported Chrome
 */
export const onButtonClicked: events.Event<(
      notificationId: string,
      buttonIndex: number,
    ) => void>;
/**
 * @supported Chrome
 */
export const onPermissionLevelChanged: events.Event<(level: PermissionLevel) => void>;
/**
 * @supported Chrome
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
 * @supported Firefox
 */
export function create(options: CreateNotificationOptions): Promise<string>;
/**
 * @supported Firefox
 */
export function create(notificationId: string, options: CreateNotificationOptions): Promise<string>;
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
 * @supported Chrome
 */
export function getAll(): Promise<Record<string, boolean | NotificationOptions>>;
/**
 * @supported Chrome
 */
export function getAll(callback: (notifications: Record<string, boolean | NotificationOptions>) => void): void;
/**
 * @supported Firefox
 */
export function getAll(): Promise<{ [key: string]: CreateNotificationOptions }>;
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

export namespace oauth2 {
/**
 * @supported Chrome
 */
export interface OAuth2Info {
    client_id?: string;
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
    reasons: Reason[];
    url: string;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type DescriptionStyleType = ("url" | "match" | "dim") | (| "url"
        | "match"
        | "dim");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnInputEnteredDisposition = ("currentTab" | "newForegroundTab" | "newBackgroundTab") | (| "currentTab"
        | "newForegroundTab"
        | "newBackgroundTab");
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
 * @supported Chrome, Firefox, Safari
 */
export interface Permissions {
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    permissions?: string[] | _manifest.OptionalPermission[] | _manifest.OptionalOnlyPermission[] | undefined;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    origins?: string[] | _manifest.MatchPattern[] | undefined;
    /** @supported Firefox */
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onAdded: events.Event<(
      permissions: Permissions,
    ) => void> | events.Event<(permissions: permissions.Permissions) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onRemoved: events.Event<(
      permissions: Permissions,
    ) => void> | events.Event<(permissions: permissions.Permissions) => void>;
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
 * @supported Firefox
 */
export function getAll(): Promise<AnyPermissions>;
/**
 * @supported Safari
 */
export function getAll(callback: (result: permissions.Permissions) => void): void;
/**
 * @supported Safari
 */
export function getAll(): Promise<permissions.Permissions>;
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
 * @supported Firefox
 */
export function contains(permissions: AnyPermissions): Promise<boolean>;
/**
 * @supported Safari
 */
export function contains(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function contains(permissions: permissions.Permissions): Promise<boolean>;
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
 * @supported Safari
 */
export function request(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function request(permissions: permissions.Permissions): Promise<boolean>;
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
 * @supported Safari
 */
export function remove(permissions: permissions.Permissions, callback: (result: boolean) => void): void;
/**
 * @supported Safari
 */
export function remove(permissions: permissions.Permissions): Promise<boolean>;
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
/**
 * @supported Firefox
 */
export interface AnyPermissions {
    permissions?: _manifest.Permission[] | _manifest.OptionalOnlyPermission[] | undefined;
    origins?: _manifest.MatchPattern[] | undefined;
    data_collection?: _manifest.OptionalDataCollectionPermission[] | undefined;
}

}

export namespace platformKeys {
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
export type ClientCertificateType = "rsaSign" | "ecdsaSign";
/**
 * @supported Chrome
 */
export interface ClientCertificateRequest {
    certificateTypes: ClientCertificateType[];
    certificateAuthorities: ArrayBuffer[];
}
/**
 * @supported Chrome
 */
export interface SelectDetails {
    request: ClientCertificateRequest;
    clientCerts?: ArrayBuffer[];
    interactive: boolean;
}
/**
 * @supported Chrome
 */
export interface VerificationDetails {
    serverCertificateChain: ArrayBuffer[];
    hostname: string;
}
/**
 * @supported Chrome
 */
export interface VerificationResult {
    trusted: boolean;
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
 */
export function reportActivity(): Promise<void>;
/**
 * @supported Chrome
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
    id: string;
    name: string;
    description?: string;
}
/**
 * @supported Chrome
 */
export interface PrintJob {
    printerId: string;
    title: string;
    ticket: {[name: string]: /* TODO: Upstream type uses any */ any};
    contentType: string;
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
    status: SubmitJobStatus;
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
    id: string;
    name: string;
    description: string;
    uri: string;
    source: PrinterSource;
    isDefault: boolean;
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
    capabilities?: {[name: string]: /* TODO: Upstream type uses any */ any};
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
    width: number;
    height: number;
    vendorId: string;
}
/**
 * @supported Chrome
 */
export interface PrintSettings {
    color: ColorMode;
    duplex: DuplexMode;
    mediaSize: MediaSize;
    copies: number;
}
/**
 * @supported Chrome
 */
export interface Printer {
    name: string;
    uri: string;
    source: PrinterSource;
}
/**
 * @supported Chrome
 */
export interface PrintJobInfo {
    id: string;
    title: string;
    source: PrintJobSource;
    sourceId?: string;
    status: PrintJobStatus;
    creationTime: number;
    completionTime: number;
    printer: Printer;
    settings: PrintSettings;
    numberOfPages: number;
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
    title: string;
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface Cache {
    size: number;
    liveSize: number;
}
/**
 * @supported Chrome
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
    protocol: string;
    name: string;
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
    scheme?: Scheme;
    host: string;
    port?: number;
}
/**
 * @supported Chrome
 */
export interface ProxyRules {
    singleProxy?: ProxyServer;
    proxyForHttp?: ProxyServer;
    proxyForHttps?: ProxyServer;
    proxyForFtp?: ProxyServer;
    fallbackProxy?: ProxyServer;
    bypassList?: string[];
}
/**
 * @supported Chrome
 */
export interface PacScript {
    url?: string;
    data?: string;
    mandatory?: boolean;
}
/**
 * @supported Chrome, Firefox
 */
export interface ProxyConfig {
    /** @supported Chrome */
    rules?: ProxyRules;
    /** @supported Chrome */
    pacScript?: PacScript;
    /** @supported Chrome */
    mode: Mode;
    /** @supported Firefox */
    proxyType?: _ProxyConfigProxyType | undefined;
    /** @supported Firefox */
    http?: string | undefined;
    /** @supported Firefox */
    httpProxyAll?: boolean | undefined;
    /** @supported Firefox */
    ftp?: string | undefined;
    /** @supported Firefox */
    ssl?: string | undefined;
    /** @supported Firefox */
    socks?: string | undefined;
    /** @supported Firefox */
    socksVersion?: number | undefined;
    /** @supported Firefox */
    passthrough?: string | undefined;
    /** @supported Firefox */
    autoConfigUrl?: string | undefined;
    /** @supported Firefox */
    autoLogin?: boolean | undefined;
    /** @supported Firefox */
    proxyDNS?: boolean | undefined;
    /** @supported Firefox */
    respectBeConservative?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const settings: types.ChromeSetting<ProxyConfig> | types.Setting;
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

export namespace readingList {
/**
 * @supported Chrome
 */
export interface ReadingListEntry {
    url: string;
    title: string;
    hasBeenRead: boolean;
    lastUpdateTime: number;
    creationTime: number;
}
/**
 * @supported Chrome
 */
export interface AddEntryOptions {
    url: string;
    title: string;
    hasBeenRead: boolean;
}
/**
 * @supported Chrome
 */
export interface RemoveOptions {
    url: string;
}
/**
 * @supported Chrome
 */
export interface UpdateEntryOptions {
    url: string;
    title?: string;
    hasBeenRead?: boolean;
}
/**
 * @supported Chrome
 */
export interface QueryInfo {
    url?: string;
    title?: string;
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
 * @supported Chrome, Firefox, Safari
 */
export interface Port {
    /** @supported Chrome, Firefox, Safari */
    name: string;
    /** @supported Chrome, Firefox, Safari */
    disconnect(): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    postMessage(message: unknown): void;
    postMessage<T = unknown>(message: T): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    sender?: MessageSender | runtime.MessageSender;
    /** @supported Chrome, Firefox, Safari */
    onDisconnect: events.Event<(port: Port) => void>;
    /** @supported Chrome, Firefox, Safari */
    onMessage: events.Event<(message: unknown, port: Port) => void>;
    /** @supported Firefox, Safari */
    error?: Error;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface MessageSender {
    /** @supported Chrome, Firefox */
    documentId?: string;
    /** @supported Chrome */
    documentLifecycle?: string;
    /** @supported Chrome, Firefox, Safari */
    frameId?: number;
    /** @supported Chrome, Firefox, Safari */
    id?: string;
    /** @supported Chrome */
    nativeApplication?: string;
    /** @supported Chrome */
    origin?: string;
    /** @supported Chrome, Firefox, Safari */
    tab?: tabs.Tab;
    /** @supported Chrome, Safari */
    tlsChannelId?: string;
    /** @supported Chrome, Firefox, Safari */
    url?: string;
    /** @supported Firefox */
    userScriptWorldId?: string;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type PlatformOs = ("mac" | "win" | "android" | "cros" | "linux" | "openbsd") | (| "mac"
        | "win"
        | "android"
        | "cros"
        | "linux"
        | "openbsd");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type PlatformArch = ("arm" | "arm64" | "x86-32" | "x86-64" | "mips" | "mips64" | "riscv64") | (| "aarch64"
        | "arm"
        | "ppc64"
        | "s390x"
        | "sparc64"
        | "x86-32"
        | "x86-64"
        | "noarch");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type PlatformNaclArch = ("arm" | "x86-32" | "x86-64" | "mips" | "mips64") | (| "arm"
        | "x86-32"
        | "x86-64");
/**
 * @supported Chrome, Firefox, Safari
 */
export interface PlatformInfo {
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    arch: PlatformArch | "arm" | "x86-64" | "unknown";
    /** @supported Chrome */
    nacl_arch?: PlatformNaclArch;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    os: PlatformOs | "mac" | "ios" | "unknown";
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type RequestUpdateCheckStatus = ("throttled" | "no_update" | "update_available") | (| "throttled"
        | "no_update"
        | "update_available");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnInstalledReason = ("install" | "update" | "chrome_update" | "shared_module_update") | (| "install"
        | "update"
        | "browser_update");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnRestartRequiredReason = ("app_update" | "os_update" | "periodic") | (| "app_update"
        | "os_update"
        | "periodic");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ContextType = ("TAB" | "POPUP" | "BACKGROUND" | "OFFSCREEN_DOCUMENT" | "SIDE_PANEL" | "DEVELOPER_TOOLS") | (| "BACKGROUND"
        | "POPUP"
        | "SIDE_PANEL"
        | "TAB");
/**
 * @supported Chrome, Firefox
 */
export interface ExtensionContext {
    /** @supported Chrome, Firefox */
    contextType: ContextType;
    /** @supported Chrome, Firefox */
    contextId: string;
    /** @supported Chrome, Firefox */
    tabId: number;
    /** @supported Chrome, Firefox */
    windowId: number;
    /** @supported Chrome, Firefox */
    documentId?: string;
    /** @supported Chrome, Firefox */
    frameId: number;
    /** @supported Chrome, Firefox */
    documentUrl?: string;
    /** @supported Chrome, Firefox */
    documentOrigin?: string;
    /** @supported Chrome, Firefox */
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
 * @supported Chrome, Firefox, Safari
 */
export const id: string;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onStartup: events.Event<() => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onInstalled: events.Event<(details: { reason: OnInstalledReason; previousVersion?: string; id?: string }) => void> | (events.Event<(details: { reason: "install" | "update" | "browser_update"; previousVersion?: string }) => void>);
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
 * @supported Chrome
 */
export const onBrowserUpdateAvailable: events.Event<() => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onConnect: events.Event<(
      port: Port,
    ) => void> | events.Event<(port: runtime.Port) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onConnectExternal: events.Event<(
      port: Port,
    ) => void> | events.Event<(port: runtime.Port) => void>;
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
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onMessage: (events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>) | (events.Event<(message: unknown, sender: runtime.MessageSender, sendResponse: (response?: unknown) => void) => boolean | void | Promise<unknown>>);
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onMessageExternal: (events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>) | (events.Event<(message: unknown, sender: runtime.MessageSender, sendResponse: (response?: unknown) => void) => boolean | void | Promise<unknown>>);
/**
 * @supported Chrome, Firefox
 */
export const onUserScriptMessage: events.Event<(message: unknown, sender: MessageSender, sendResponse: (response?: unknown) => void) => boolean | Promise<unknown> | void>;
/**
 * @supported Chrome
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
 * @supported Firefox
 */
export function getBackgroundPage(): Promise<Window>;
/**
 * @supported Safari
 */
export function getBackgroundPage(callback: (result: globalThis.Window | null) => void): void;
/**
 * @supported Safari
 */
export function getBackgroundPage(): Promise<globalThis.Window | null>;
/**
 * @supported Chrome, Firefox, Safari
 */
export function openOptionsPage(): Promise<void>;
/**
 * @supported Chrome
 */
export function openOptionsPage(

      callback?: () => void,
    ): void;
/**
 * @supported Safari
 */
export function openOptionsPage(callback: () => void): void;
/**
 * @supported Chrome, Firefox
 */
export function getManifest(): _manifest.WebExtensionManifest;
/**
 * @supported Safari
 */
export function getManifest(): Record<string, unknown>;
/**
 * @supported Chrome, Safari
 */
export function getVersion(): string;
/**
 * @supported Chrome, Firefox
 */
export function getURL(

      path: string,
    ): string;
/**
 * @supported Safari
 */
export function getURL(resourcePath: string): string;
/**
 * @supported Chrome, Safari
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
 * @supported Firefox
 */
export function setUninstallURL(url?: string): Promise<void>;
/**
 * @supported Safari
 */
export function setUninstallURL(url: string, callback: () => void): void;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Chrome
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
 * @supported Safari
 */
export function connect(connectInfo?: runtime.ConnectOptions): runtime.Port;
/**
 * @supported Safari
 */
export function connect(extensionId: string, connectInfo?: runtime.ConnectOptions): runtime.Port;
/**
 * @supported Chrome, Firefox
 */
export function connectNative(

      application: string,
    ): Port;
/**
 * @supported Safari
 */
export function connectNative(applicationID?: string): runtime.Port;
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
 * @supported Chrome, Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M, responseCallback: (response: R | undefined) => void): void;
/**
 * @supported Chrome, Firefox
 */
export function sendNativeMessage<R = unknown, M = unknown>(application: string, message: M): Promise<R>;
/**
 * @supported Safari
 */
export function sendNativeMessage<T = unknown, R = unknown>(applicationID: string, message: T, callback: (result: R) => void): void;
/**
 * @supported Safari
 */
export function sendNativeMessage<T = unknown, R = unknown>(applicationID: string, message: T): Promise<R>;
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
 * @supported Safari
 */
export function getPlatformInfo(callback: (result: runtime.PlatformInfo) => void): void;
/**
 * @supported Safari
 */
export function getPlatformInfo(): Promise<runtime.PlatformInfo>;
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
 * @supported Chrome, Firefox
 */
export interface _SendMessageOptions {
    /** @supported Chrome */
    includeTlsChannelId?: boolean;
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
    /** @supported Chrome */
    id?: string;
    /** @supported Firefox */
    temporary: boolean;
}
/**
 * @supported Firefox
 */
export interface _OnUpdateAvailableDetails {
    version: string;
}
/**
 * @supported Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const lastError: (_LastError | undefined) | (Error | undefined);
/**
 * @supported Firefox
 */
export function getFrameId(target: WindowProxy | HTMLIFrameElement | HTMLFrameElement | HTMLEmbedElement | HTMLObjectElement): number;
/**
 * @supported Safari
 */
export function getFrameId(target: globalThis.Window | globalThis.HTMLIFrameElement | globalThis.HTMLFrameElement): number;
/**
 * @supported Firefox
 */
export function getBrowserInfo(): Promise<BrowserInfo>;
/**
 * @supported Firefox
 */
export const onPerformanceWarning: WebExtEvent<(details: _OnPerformanceWarningDetails) => void>;
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
 * @note Safari declares this as a value; the const below carries it
 */
export type ExecutionWorld = "ISOLATED" | "MAIN";
/**
 * @supported Safari
 * @note Chrome, Firefox declare this name as a type only, and no value for it. Whether those runtimes expose the value is a question their type packages do not answer
 */
export const ExecutionWorld: { readonly ISOLATED: "ISOLATED"; readonly MAIN: "MAIN" };
/**
 * @supported Chrome, Firefox, Safari
 */
export interface InjectionTarget {
    /** @supported Chrome, Firefox, Safari */
    allFrames?: boolean;
    /** @supported Chrome, Safari */
    documentIds?: string[];
    /** @supported Chrome, Firefox, Safari */
    frameIds?: number[];
    /** @supported Chrome, Firefox, Safari */
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
    func?: (...args: Args) => R;
    /** @supported Chrome, Firefox */
    injectImmediately?: boolean;
    /** @supported Chrome, Firefox */
    target: InjectionTarget;
    /** @supported Chrome, Firefox */
    world?: ExecutionWorld;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface CSSInjection {
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    target: InjectionTarget | scripting.ScriptInjectionTarget;
    /** @supported Chrome, Firefox, Safari */
    css?: string;
    /** @supported Chrome, Firefox, Safari */
    files?: string[];
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    origin?: StyleOrigin | _CSSInjectionOrigin | undefined | string;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface InjectionResult<R = unknown> {
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    documentId?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    frameId?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Chrome, Firefox, required in Safari
     */
    result?: R | R | null;
    /**
     * @supported Firefox, Safari
     * @note shape differs between browsers
     */
    error?: unknown | string;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface RegisteredContentScript {
    /** @supported Chrome, Firefox, Safari */
    id: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Chrome, Firefox, required in Safari
     */
    matches?: string[];
    /** @supported Chrome, Firefox, Safari */
    excludeMatches?: string[];
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    css?: string[] | _manifest.ExtensionURL[] | undefined;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    js?: string[] | _manifest.ExtensionURL[] | undefined;
    /** @supported Chrome, Firefox, Safari */
    allFrames?: boolean;
    /** @supported Chrome, Firefox, Safari */
    matchOriginAsFallback?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    runAt?: extensionTypes.RunAt | extensionTypes.RunAt | undefined | "document_start" | "document_end" | "document_idle";
    /** @supported Chrome, Firefox, Safari */
    persistAcrossSessions?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    world?: ExecutionWorld | extensionTypes.ExecutionWorld | undefined | "main" | "isolated" | "MAIN" | "ISOLATED";
    /**
     * @supported Firefox, Safari
     * @note shape differs between browsers
     */
    cssOrigin?: extensionTypes.CSSOrigin | "author" | "user";
}
/**
 * @supported Chrome, Firefox
 */
export interface ContentScriptFilter {
    /** @supported Chrome, Firefox */
    ids?: string[];
}
/**
 * @supported Chrome, Firefox
 */
export function executeScript<R = unknown, Args extends unknown[] = unknown[]>(injection: ScriptInjection<Args, R>, callback?: (results: InjectionResult<Awaited<R>>[]) => void): Promise<InjectionResult<Awaited<R>>[]>;
/**
 * @supported Safari
 */
export function executeScript(details: scripting.ScriptInjection, callback: (result: scripting.InjectionResult[]) => void): void;
/**
 * @supported Safari
 */
export function executeScript(details: scripting.ScriptInjection): Promise<scripting.InjectionResult[]>;
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
 * @supported Safari
 */
export function insertCSS(details: scripting.CSSInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function insertCSS(details: scripting.CSSInjection): Promise<void>;
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
 * @supported Safari
 */
export function removeCSS(details: scripting.CSSInjection, callback: () => void): void;
/**
 * @supported Safari
 */
export function removeCSS(details: scripting.CSSInjection): Promise<void>;
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
 * @supported Safari
 */
export function registerContentScripts(scripts: scripting.RegisteredContentScript[], callback: () => void): void;
/**
 * @supported Safari
 */
export function registerContentScripts(scripts: scripting.RegisteredContentScript[]): Promise<void>;
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
 * @supported Firefox
 */
export function updateContentScripts(scripts: _UpdateContentScriptsScripts[]): Promise<void>;
/**
 * @supported Safari
 */
export function updateContentScripts(scripts: scripting.RegisteredContentScript[], callback: () => void): void;
/**
 * @supported Safari
 */
export function updateContentScripts(scripts: scripting.RegisteredContentScript[]): Promise<void>;
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
 * @supported Chrome, Firefox
 */
export interface Filter {
    /** @supported Chrome, Firefox */
    maxResults?: number;
}
/**
 * @supported Chrome, Firefox
 */
export interface Session {
    /** @supported Chrome, Firefox */
    lastModified: number;
    /** @supported Chrome, Firefox */
    tab?: tabs.Tab;
    /** @supported Chrome, Firefox */
    window?: windows.Window;
}
/**
 * @supported Chrome, Firefox
 */
export interface Device {
    /** @supported Chrome, Firefox */
    deviceName: string;
    /** @supported Chrome, Firefox */
    sessions: Session[];
    /** @supported Chrome, Firefox */
    info: string;
}
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const MAX_SESSION_RESULTS: 25 | number;
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

export namespace sharedModule {
/**
 * @supported Chrome
 */
export interface Import {
    id: string;
    minimum_version?: string;
}
/**
 * @supported Chrome
 */
export interface Export {
    allowlist?: string[];
}

}

export namespace sidePanel {
/**
 * @supported Chrome
 */
export interface SidePanel {
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
    side: Side;
}
/**
 * @supported Chrome
 */
export interface PanelOptions {
    tabId?: number;
    path?: string;
    enabled?: boolean;
}
/**
 * @supported Chrome
 */
export interface PanelBehavior {
    openPanelOnActionClick?: boolean;
}
/**
 * @supported Chrome
 */
export interface GetPanelOptions {
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface OpenOptions {
    windowId?: number;
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface CloseOptions {
    windowId?: number;
    tabId?: number;
}
/**
 * @supported Chrome
 */
export interface PanelOpenedInfo {
    windowId: number;
    tabId?: number;
    path: string;
}
/**
 * @supported Chrome
 */
export interface PanelClosedInfo {
    windowId: number;
    tabId?: number;
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
 */
export interface SocketProperties {
    persistent?: boolean;
    name?: string;
    bufferSize?: number;
}
/**
 * @supported Chrome
 */
export interface CreateInfo {
    socketId: number;
}
/**
 * @supported Chrome
 */
export type DnsQueryType = "any" | "ipv4" | "ipv6";
/**
 * @supported Chrome
 */
export interface SendInfo {
    resultCode: number;
    bytesSent?: number;
}
/**
 * @supported Chrome
 */
export interface TLSVersionConstraints {
    min?: string;
    max?: string;
}
/**
 * @supported Chrome
 */
export interface SecureOptions {
    tlsVersion?: TLSVersionConstraints;
}
/**
 * @supported Chrome
 */
export interface SocketInfo {
    socketId: number;
    persistent: boolean;
    name?: string;
    bufferSize?: number;
    paused: boolean;
    connected: boolean;
    localAddress?: string;
    localPort?: number;
    peerAddress?: string;
    peerPort?: number;
}
/**
 * @supported Chrome
 */
export interface ReceiveInfo {
    socketId: number;
    data: ArrayBuffer;
}
/**
 * @supported Chrome
 */
export interface ReceiveErrorInfo {
    socketId: number;
    resultCode: number;
}
/**
 * @supported Chrome
 */
export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
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
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
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
 */
export function disconnect(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
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
 */
export function secure(

      socketId: number,

      callback: (
        result: number,
      ) => void,
    ): void;
/**
 * @supported Chrome
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
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
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
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
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
 */
export interface SocketProperties {
    persistent?: boolean;
    name?: string;
}
/**
 * @supported Chrome
 */
export interface CreateInfo {
    socketId: number;
}
/**
 * @supported Chrome
 */
export interface SocketInfo {
    socketId: number;
    persistent: boolean;
    name?: string;
    paused: boolean;
    localAddress?: string;
    localPort?: number;
}
/**
 * @supported Chrome
 */
export interface AcceptInfo {
    socketId: number;
    clientSocketId: number;
}
/**
 * @supported Chrome
 */
export interface AcceptErrorInfo {
    socketId: number;
    resultCode: number;
}
/**
 * @supported Chrome
 */
export const onAccept: events.Event<(
      info: AcceptInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export const onAcceptError: events.Event<(
      info: AcceptErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
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
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
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
 */
export function disconnect(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
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
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
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
 */
export interface SocketProperties {
    persistent?: boolean;
    name?: string;
    bufferSize?: number;
}
/**
 * @supported Chrome
 */
export interface CreateInfo {
    socketId: number;
}
/**
 * @supported Chrome
 */
export type DnsQueryType = "any" | "ipv4" | "ipv6";
/**
 * @supported Chrome
 */
export interface SendInfo {
    resultCode: number;
    bytesSent?: number;
}
/**
 * @supported Chrome
 */
export interface SocketInfo {
    socketId: number;
    persistent: boolean;
    name?: string;
    bufferSize?: number;
    paused: boolean;
    localAddress?: string;
    localPort?: number;
}
/**
 * @supported Chrome
 */
export interface ReceiveInfo {
    socketId: number;
    data: ArrayBuffer;
    remoteAddress: string;
    remotePort: number;
}
/**
 * @supported Chrome
 */
export interface ReceiveErrorInfo {
    socketId: number;
    resultCode: number;
}
/**
 * @supported Chrome
 */
export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;
/**
 * @supported Chrome
 */
export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;
/**
 * @supported Chrome
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
 */
export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
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
 */
export function close(

      socketId: number,
    ): Promise<void>;
/**
 * @supported Chrome
 */
export function close(

      socketId: number,

      callback?: () => void,
    ): void;
/**
 * @supported Chrome
 */
export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;
/**
 * @supported Chrome
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
 */
export function getSockets(): Promise<SocketInfo[]>;
/**
 * @supported Chrome
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
 */
export function getJoinedGroups(

      socketId: number,
    ): Promise<string[]>;
/**
 * @supported Chrome
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
 * @supported Chrome, Firefox, Safari
 */
export interface StorageChange<T = unknown> {
    /** @supported Chrome, Firefox, Safari */
    oldValue?: T;
    /** @supported Chrome, Firefox, Safari */
    newValue?: T;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface StorageArea {
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    get<K extends string>(key: K, callback: (items: Record<K, unknown>) => void): void;
    get<K extends string>(keys: K[], callback: (items: Record<K, unknown>) => void): void;
    get<T extends object>(keys: T, callback: (items: T) => void): void;
    get(keys: string | string[] | Record<string, unknown> | null | undefined, callback: (items: Record<string, unknown>) => void): void;
    get(callback: (items: Record<string, unknown>) => void): void;
    get<K extends string>(key: K): Promise<Record<K, unknown>>;
    get<K extends string>(keys: K[]): Promise<Record<K, unknown>>;
    get<T extends object>(keys: T): Promise<T>;
    get<T extends object = Record<string, unknown>>(keys?: string | string[] | null): Promise<T>;
    get<T = Record<string, unknown>>(callback: (items: T) => void): void;
    get<T = Record<string, unknown>>(keys?: string | string[] | Record<string, unknown> | null): Promise<T>;
    get<T = Record<string, unknown>>(keys: string | string[] | Record<string, unknown> | null, callback: (items: T) => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    getBytesInUse(keys?: string | string[] | null): Promise<number>;
    getBytesInUse(keys: string | string[] | null | undefined, callback: (bytesInUse: number) => void): void;
    getBytesInUse(callback: (bytesInUse: number) => void): void;
    getBytesInUse(keys: string | string[] | null, callback: (bytesInUse: number) => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    getKeys(): Promise<string[]>;
    getKeys(callback: (keys: string[]) => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    set<T extends Record<string, unknown>>(items: T): Promise<void>;
    set<T extends Record<string, unknown>>(items: T, callback: () => void): void;
    set(items: Record<string, unknown>): Promise<void>;
    set(items: Record<string, unknown>, callback?: () => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    remove(keys: string | string[]): Promise<void>;
    remove(keys: string | string[], callback?: () => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note signature differs between browsers; both forms emitted
     */
    clear(): Promise<void>;
    clear(callback?: () => void): void;
    /**
     * @supported Chrome, Safari
     * @note signature differs between browsers; both forms emitted
     */
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }, callback?: () => void): Promise<void>;
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }): Promise<void>;
    setAccessLevel(accessOptions: { accessLevel: "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS" }, callback: () => void): void;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void> | events.Event<(changes: Record<string, storage.StorageChange>, areaName: string) => void>;
    /** @supported Safari */
    QUOTA_BYTES: number;
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const sync: (StorageArea & {

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
    }) | _SyncStorageAreaWithUsage | storage.SyncStorageArea;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const local: (StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or a rejected Promise if using async/await.
       */
      QUOTA_BYTES: 10485760,
    }) | _LocalStorageArea | storage.StorageArea;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const managed: StorageArea | _ManagedStorageArea;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const session: (StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES: 10485760,
    }) | _SessionStorageAreaWithUsage | storage.StorageArea;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onChanged: events.Event<(changes: Record<string, StorageChange>, areaName: string) => void> | events.Event<(changes: Record<string, storage.StorageChange>, areaName: string) => void>;
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

export namespace system.cpu {
/**
 * @supported Chrome
 */
export interface CpuTime {
    user: number;
    kernel: number;
    idle: number;
    total: number;
}
/**
 * @supported Chrome
 */
export interface ProcessorInfo {
    usage: CpuTime;
}
/**
 * @supported Chrome
 */
export interface CpuInfo {
    numOfProcessors: number;
    archName: string;
    modelName: string;
    features: string[];
    processors: ProcessorInfo[];
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
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * @supported Chrome
 */
export interface Insets {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
/**
 * @supported Chrome
 */
export interface Point {
    x: number;
    y: number;
}
/**
 * @supported Chrome
 */
export interface TouchCalibrationPair {
    displayPoint: Point;
    touchPoint: Point;
}
/**
 * @supported Chrome
 */
export interface TouchCalibrationPairQuad {
    pair1: TouchCalibrationPair;
    pair2: TouchCalibrationPair;
    pair3: TouchCalibrationPair;
    pair4: TouchCalibrationPair;
}
/**
 * @supported Chrome
 */
export interface DisplayMode {
    width: number;
    height: number;
    widthInNativePixels: number;
    heightInNativePixels: number;
    uiScale?: number;
    deviceScaleFactor: number;
    refreshRate: number;
    isNative: boolean;
    isSelected: boolean;
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
    id: string;
    parentId: string;
    position: LayoutPosition;
    offset: number;
}
/**
 * @supported Chrome
 */
export interface Edid {
    manufacturerId: string;
    productId: string;
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
    id: string;
    name: string;
    edid?: Edid;
    mirroringSourceId: string;
    mirroringDestinationIds: string[];
    isPrimary: boolean;
    isEnabled: boolean;
    activeState: ActiveState;
    isUnified: boolean;
    dpiX: number;
    dpiY: number;
    rotation: number;
    bounds: Bounds;
    overscan: Insets;
    workArea: Bounds;
    modes: DisplayMode[];
    hasTouchSupport: boolean;
    availableDisplayZoomFactors: number[];
    displayZoomFactor: number;
    isInternal: boolean;
}
/**
 * @supported Chrome
 */
export interface DisplayProperties {
    isUnified?: boolean;
    mirroringSourceId?: string;
    isPrimary?: boolean;
    overscan?: Insets;
    rotation?: number;
    boundsOriginX?: number;
    boundsOriginY?: number;
    displayMode?: DisplayMode;
    displayZoomFactor?: number;
}
/**
 * @supported Chrome
 */
export interface GetInfoFlags {
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
    mode: MirrorMode;
    mirroringSourceId?: string;
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
    capacity: number;
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
    name: string;
    address: string;
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
    id: string;
    name: string;
    type: StorageUnitType;
    capacity: number;
}
/**
 * @supported Chrome
 */
export interface StorageAvailableCapacityInfo {
    id: string;
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
    tabId: number;
    status: TabCaptureState;
    fullscreen: boolean;
}
/**
 * @supported Chrome
 */
export interface MediaStreamConstraint {
    mandatory: {[name: string]: /* TODO: Upstream type uses any */ any};
    optional?: {[name: string]: /* TODO: Upstream type uses any */ any};
}
/**
 * @supported Chrome
 */
export interface CaptureOptions {
    audio?: boolean;
    video?: boolean;
    audioConstraints?: MediaStreamConstraint;
    videoConstraints?: MediaStreamConstraint;
}
/**
 * @supported Chrome
 */
export interface GetMediaStreamOptions {
    consumerTabId?: number;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type Color = ("grey" | "blue" | "red" | "yellow" | "green" | "pink" | "purple" | "cyan" | "orange") | (| "blue"
        | "cyan"
        | "grey"
        | "green"
        | "orange"
        | "pink"
        | "purple"
        | "red"
        | "yellow");
/**
 * @supported Chrome, Firefox
 */
export interface TabGroup {
    /** @supported Chrome, Firefox */
    id: number;
    /** @supported Chrome, Firefox */
    collapsed: boolean;
    /** @supported Chrome, Firefox */
    color: Color;
    /** @supported Chrome, Firefox */
    title?: string;
    /** @supported Chrome, Firefox */
    windowId: number;
    /** @supported Chrome */
    shared: boolean;
}
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const TAB_GROUP_ID_NONE: -1 | number;
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
 * @note type differs between browsers; emitted as a union
 */
export const onRemoved: events.Event<(group: TabGroup) => void> | events.Event<(group: TabGroup, removeInfo: _RemoveInfo) => void>;
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
 * @supported Firefox
 */
export function query(queryInfo: _QueryInfo): Promise<TabGroup[]>;
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
 * @supported Firefox
 */
export function update(groupId: number, updateProperties: _UpdateProperties): Promise<TabGroup>;
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
 * @supported Chrome, Firefox, Safari
 * @note definitions differ between browsers; emitted as a union
 */
export type TabStatus = ("unloaded" | "loading" | "complete") | ("loading" | "complete");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type MutedInfoReason = ("user" | "capture" | "extension") | (| "user"
        /** Tab capture started, forcing a muted state change. */
        | "capture"
        /** An extension, identified by the extensionId field, set the muted state. */
        | "extension");
/**
 * @supported Chrome, Firefox
 */
export interface MutedInfo {
    /** @supported Chrome, Firefox */
    muted: boolean;
    /** @supported Chrome, Firefox */
    reason?: MutedInfoReason;
    /** @supported Chrome, Firefox */
    extensionId?: string;
}
/**
 * @supported Chrome, Firefox, Safari
 */
export interface Tab {
    /** @supported Chrome, Firefox, Safari */
    id?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    index?: number;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    groupId?: number;
    /** @supported Chrome */
    splitViewId?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Firefox, Safari, required in Chrome
     */
    windowId?: number;
    /** @supported Chrome, Firefox, Safari */
    openerTabId?: number;
    /**
     * @supported Chrome, Safari
     * @note optional in Safari, required in Chrome
     */
    selected?: boolean;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    lastAccessed?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    highlighted?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    active?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    pinned?: boolean;
    /** @supported Chrome, Firefox, Safari */
    audible?: boolean;
    /** @supported Chrome */
    frozen: boolean;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    discarded?: boolean;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    autoDiscardable?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    mutedInfo?: MutedInfo | MutedInfo | undefined | tabs.TabMutedInfo;
    /** @supported Chrome, Firefox, Safari */
    url?: string;
    /** @supported Chrome */
    pendingUrl?: string;
    /** @supported Chrome, Firefox, Safari */
    title?: string;
    /** @supported Chrome, Firefox */
    favIconUrl?: string;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    status?: TabStatus | string | undefined | tabs.TabStatus;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    incognito?: boolean;
    /** @supported Chrome, Firefox, Safari */
    width?: number;
    /** @supported Chrome, Firefox, Safari */
    height?: number;
    /** @supported Chrome, Firefox */
    sessionId?: string;
    /** @supported Firefox */
    hidden?: boolean | undefined;
    /** @supported Firefox */
    cookieStoreId?: string | undefined;
    /** @supported Firefox, Safari */
    isArticle?: boolean | undefined;
    /** @supported Firefox, Safari */
    isInReaderMode?: boolean | undefined;
    /** @supported Firefox */
    sharingState?: SharingState | undefined;
    /** @supported Firefox */
    attention?: boolean | undefined;
    /** @supported Firefox */
    successorTabId?: number | undefined;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ZoomSettingsMode = ("automatic" | "manual" | "disabled") | (| "automatic"
        /**
         * Overrides the automatic handling of zoom changes. The `onZoomChange` event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support `per-origin` zooming, and will thus ignore the `scope` zoom setting and assume `per-tab`.
         */
        | "manual"
        /**
         * Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
         */
        | "disabled");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ZoomSettingsScope = ("per-origin" | "per-tab") | (| "per-origin"
        /**
         * Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, `per-tab` zoom changes are reset on navigation; navigating a tab will always load pages with their `per-origin` zoom factors.
         */
        | "per-tab");
/**
 * @supported Chrome, Firefox
 */
export interface ZoomSettings {
    /** @supported Chrome, Firefox */
    mode?: ZoomSettingsMode;
    /** @supported Chrome, Firefox */
    scope?: ZoomSettingsScope;
    /** @supported Chrome, Firefox */
    defaultZoomFactor?: number;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type WindowType = ("normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab") | ("normal" | "popup" | "panel" | "app" | "devtools");
/**
 * @supported Chrome
 */
export const MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND: 2;
/**
 * @supported Chrome
 */
export const SPLIT_VIEW_ID_NONE: -1;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const TAB_ID_NONE: -1 | number;
/**
 * @supported Chrome
 */
export const TAB_INDEX_NONE: -1;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onCreated: events.Event<(
      tab: Tab,
    ) => void> | events.Event<(tab: tabs.Tab) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _TabsOnUpdatedEvent | events.Event<(tabId: number, changeInfo: tabs.Tab, tab: tabs.Tab) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onMoved: events.Event<(tabId: number, moveInfo: { windowId: number; fromIndex: number; toIndex: number }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onActivated: events.Event<(activeInfo: { tabId: number; windowId: number }) => void> | events.Event<(activeInfo: { previousTabId: number; tabId: number; windowId: number }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onHighlighted: events.Event<(highlightInfo: { windowId: number; tabIds: number[] }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onDetached: events.Event<(tabId: number, detachInfo: { oldWindowId: number; oldPosition: number }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onAttached: events.Event<(tabId: number, attachInfo: { newWindowId: number; newPosition: number }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 */
export const onRemoved: events.Event<(tabId: number, removeInfo: { windowId: number; isWindowClosing: boolean }) => void>;
/**
 * @supported Chrome, Safari
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
 * @supported Safari
 */
export function get(tabID: number, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function get(tabID: number): Promise<tabs.Tab>;
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
 * @supported Safari
 */
export function getCurrent(callback: (result: tabs.Tab | undefined) => void): void;
/**
 * @supported Safari
 */
export function getCurrent(): Promise<tabs.Tab | undefined>;
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
 * @supported Firefox
 */
export function connect(tabId: number, connectInfo?: _ConnectConnectInfo): runtime.Port;
/**
 * @supported Safari
 */
export function connect(tabID: number, options?: { frameId?: number; documentId?: string; name?: string }): runtime.Port;
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
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties): Promise<Tab>;
/**
 * @supported Safari
 */
export function create(properties: tabs.TabUpdateOptions & { index?: number; openInReaderMode?: boolean; title?: string; windowId?: number }, callback: (result: tabs.Tab) => void): void;
/**
 * @supported Safari
 */
export function create(properties: tabs.TabUpdateOptions & { index?: number; openInReaderMode?: boolean; title?: string; windowId?: number }): Promise<tabs.Tab>;
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
 * @supported Firefox
 */
export function duplicate(tabId: number, duplicateProperties?: _DuplicateDuplicateProperties): Promise<Tab>;
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
 * @supported Firefox
 */
export function query(queryInfo: _QueryQueryInfo): Promise<Tab[]>;
/**
 * @supported Safari
 */
export function query(info: tabs.TabQueryOptions, callback: (result: tabs.Tab[]) => void): void;
/**
 * @supported Safari
 */
export function query(info: tabs.TabQueryOptions): Promise<tabs.Tab[]>;
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
 * @supported Firefox
 */
export function highlight(highlightInfo: _HighlightHighlightInfo): Promise<windows.Window>;
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
 * @supported Firefox
 */
export function update(updateProperties: _UpdateUpdateProperties): Promise<Tab>;
/**
 * @supported Firefox
 */
export function update(tabId: number, updateProperties: _UpdateUpdateProperties): Promise<Tab>;
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
 * @supported Firefox
 */
export function move(tabIds: number | number[], moveProperties: _MoveMoveProperties): Promise<Tab | Tab[]>;
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
 * @supported Safari
 */
export function remove(tabIDs: number | number[], callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(tabIDs: number | number[]): Promise<void>;
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
 * @supported Firefox
 */
export function group(options: _GroupOptions): Promise<number>;
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
 * @supported Chrome, Firefox
 */
export function setZoom(

      tabId: number,

      zoomFactor: number,
    ): Promise<void>;
/**
 * @supported Chrome, Firefox, Safari
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
 * @supported Chrome
 */
export function goForward(

      tabId?: number,

      callback?: () => void,
    ): void;
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
 * @supported Firefox
 */
export function insertCSS(details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function insertCSS(tabId: number, details: extensionTypes.InjectDetails): Promise<void>;
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
 * @supported Firefox
 */
export function removeCSS(details: extensionTypes.InjectDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function removeCSS(tabId: number, details: extensionTypes.InjectDetails): Promise<void>;
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
    /** @supported Chrome, Firefox */
    url: string;
    /**
     * @supported Chrome, Firefox
     * @note optional in Firefox, required in Chrome
     */
    title?: string;
    /** @supported Firefox */
    favicon?: string | undefined;
    /** @supported Firefox */
    type?: _MostVisitedURLType | undefined;
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
    enqueue?: boolean;
    voiceName?: string;
    extensionId?: string;
    lang?: string;
    gender?: VoiceGender;
    rate?: number;
    pitch?: number;
    volume?: number;
    requiredEventTypes?: string[];
    desiredEventTypes?: string[];
    onEvent?: (
        event: TtsEvent,
      ) => void;
}
/**
 * @supported Chrome
 */
export interface TtsEvent {
    type: EventType;
    charIndex?: number;
    errorMessage?: string;
    length?: number;
}
/**
 * @supported Chrome
 */
export interface TtsVoice {
    voiceName?: string;
    lang?: string;
    gender?: VoiceGender;
    remote?: boolean;
    extensionId?: string;
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
    id: string;
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
    lang: string;
    installStatus: LanguageInstallStatus;
    error?: string;
}
/**
 * @supported Chrome
 */
export interface SpeakOptions {
    voiceName?: string;
    lang?: string;
    gender?: VoiceGender;
    rate?: number;
    pitch?: number;
    volume?: number;
}
/**
 * @supported Chrome
 */
export interface AudioStreamOptions {
    sampleRate: number;
    bufferSize: number;
}
/**
 * @supported Chrome
 */
export interface AudioBuffer {
    audioBuffer: ArrayBuffer;
    charIndex?: number;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type LevelOfControl = ("not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension") | (| "not_controllable"
        | "controlled_by_other_extensions"
        | "controllable_by_this_extension"
        | "controlled_by_this_extension");
/**
 * @supported Chrome
 */
export interface ChromeSetting<T> {
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
    clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
      ): Promise<void>;
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
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ExecutionWorld = ("MAIN" | "USER_SCRIPT") | (| "MAIN"
        | "USER_SCRIPT");
/**
 * @supported Chrome
 */
export interface ScriptSource {
    code?: string;
    file?: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface RegisteredUserScript {
    /** @supported Chrome, Firefox */
    allFrames?: boolean;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    excludeMatches?: string[] | _manifest.MatchPattern[] | undefined;
    /** @supported Chrome, Firefox */
    id: string;
    /** @supported Chrome, Firefox */
    includeGlobs?: string[];
    /** @supported Chrome, Firefox */
    excludeGlobs?: string[];
    /**
     * @supported Chrome, Firefox
     * @note optional in Chrome, required in Firefox
     */
    js?: ScriptSource[];
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    matches?: string[] | _manifest.MatchPattern[] | undefined;
    /** @supported Chrome, Firefox */
    runAt?: extensionTypes.RunAt;
    /** @supported Chrome, Firefox */
    world?: ExecutionWorld;
    /** @supported Chrome, Firefox */
    worldId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface UserScriptFilter {
    /** @supported Chrome, Firefox */
    ids?: string[];
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
/**
 * @supported Chrome
 */
export interface InjectionResult {
    documentId: string;
    frameId: number;
    result?: /* TODO: Upstream type uses any */ any;
    error?: string;
}
/**
 * @supported Chrome
 */
export interface UserScriptInjection {
    injectImmediately?: boolean;
    js: ScriptSource[];
    target: InjectionTarget;
    world?: ExecutionWorld;
    worldId?: string;
}
/**
 * @supported Chrome, Firefox
 */
export interface WorldProperties {
    /** @supported Chrome, Firefox */
    worldId?: string;
    /** @supported Chrome, Firefox */
    csp?: string;
    /** @supported Chrome, Firefox */
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
 * @supported Firefox
 */
export function update(scripts: _UpdateRegisteredUserScript[]): Promise<void>;
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

export namespace vpnProvider {
/**
 * @supported Chrome
 */
export interface Parameters {
    address: string;
    broadcastAddress?: string;
    mtu?: string;
    exclusionList: string[];
    inclusionList: string[];
    domainSearch?: string[];
    dnsServers: string[];
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
    resources: string[];
    matches?: string[];
    extension_ids?: string[];
    use_dynamic_url?: boolean;
}

}

export namespace webAuthenticationProxy {
/**
 * @supported Chrome
 */
export interface IsUvpaaRequest {
    requestId: number;
}
/**
 * @supported Chrome
 */
export interface CreateRequest {
    requestId: number;
    requestDetailsJson: string;
}
/**
 * @supported Chrome
 */
export interface GetRequest {
    requestId: number;
    requestDetailsJson: string;
}
/**
 * @supported Chrome
 */
export interface DOMExceptionDetails {
    name: string;
    message: string;
}
/**
 * @supported Chrome
 */
export interface CreateResponseDetails {
    requestId: number;
    error?: DOMExceptionDetails;
    responseJson?: string;
}
/**
 * @supported Chrome
 */
export interface GetResponseDetails {
    requestId: number;
    error?: DOMExceptionDetails;
    responseJson?: string;
}
/**
 * @supported Chrome
 */
export interface IsUvpaaResponseDetails {
    requestId: number;
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
 * @note definitions differ between browsers; emitted as a union
 */
export type TransitionType = ("link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated") | (| "link"
        | "typed"
        | "auto_bookmark"
        | "auto_subframe"
        | "manual_subframe"
        | "generated"
        | "start_page"
        | "form_submit"
        | "reload"
        | "keyword"
        | "keyword_generated");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type TransitionQualifier = ("client_redirect" | "server_redirect" | "forward_back" | "from_address_bar") | (| "client_redirect"
        | "server_redirect"
        | "forward_back"
        | "from_address_bar");
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnBeforeNavigateEvent | events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnCommittedEvent | events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnDOMContentLoadedEvent | events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnCompletedEvent | events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnErrorOccurredEvent | events.Event<(details: { url: string; tabId: number; frameId: number; parentFrameId: number; timeStamp: number; documentId?: string }) => void>;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnCreatedNavigationTargetEvent;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnReferenceFragmentUpdatedEvent;
/**
 * @supported Chrome
 */
export const onTabReplaced: events.Event<(details: { replacedTabId: number; tabId: number; timeStamp: number }) => void>;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebNavigationOnHistoryStateUpdatedEvent;
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
 * @supported Firefox
 */
export function getFrame(details: _GetFrameDetails): Promise<_GetFrameReturnDetails>;
/**
 * @supported Safari
 */
export function getFrame(details: { tabId: number; frameId: number }, callback: (result: webNavigation.FrameDetails | null) => void): void;
/**
 * @supported Safari
 */
export function getFrame(details: { tabId: number; frameId: number }): Promise<webNavigation.FrameDetails | null>;
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
 * @supported Firefox
 */
export function getAllFrames(details: _GetAllFramesDetails): Promise<_GetAllFramesReturnDetails[]>;
/**
 * @supported Safari
 */
export function getAllFrames(details: { tabId: number }, callback: (result: webNavigation.FrameDetails[]) => void): void;
/**
 * @supported Safari
 */
export function getAllFrames(details: { tabId: number }): Promise<webNavigation.FrameDetails[]>;
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
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type ResourceType = ("main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webbundle" | "other") | (| "main_frame"
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
        | "other");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnBeforeRequestOptions = ("blocking" | "requestBody" | "extraHeaders") | ("blocking" | "requestBody");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnBeforeSendHeadersOptions = ("requestHeaders" | "blocking" | "extraHeaders") | ("requestHeaders" | "blocking");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnSendHeadersOptions = ("requestHeaders" | "extraHeaders") | "requestHeaders";
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnHeadersReceivedOptions = ("blocking" | "responseHeaders" | "extraHeaders" | "securityInfo" | "securityInfoRawDer") | ("blocking" | "responseHeaders");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnAuthRequiredOptions = ("responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders") | (| "responseHeaders"
        | "blocking"
        | "asyncBlocking");
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnResponseStartedOptions = ("responseHeaders" | "extraHeaders") | "responseHeaders";
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnBeforeRedirectOptions = ("responseHeaders" | "extraHeaders") | "responseHeaders";
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type OnCompletedOptions = ("responseHeaders" | "extraHeaders") | "responseHeaders";
/**
 * @supported Chrome
 */
export type OnErrorOccurredOptions = "extraHeaders";
/**
 * @supported Chrome, Firefox
 */
export interface RequestFilter {
    /** @supported Chrome, Firefox */
    urls: string[];
    /** @supported Chrome, Firefox */
    types?: ResourceType[];
    /** @supported Chrome, Firefox */
    tabId?: number;
    /** @supported Chrome, Firefox */
    windowId?: number;
    /** @supported Firefox */
    incognito?: boolean | undefined;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
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
    }[] | _HttpHeaders[];
/**
 * @supported Chrome, Firefox
 */
export interface BlockingResponse {
    /** @supported Chrome, Firefox */
    cancel?: boolean;
    /** @supported Chrome, Firefox */
    redirectUrl?: string;
    /** @supported Chrome, Firefox */
    requestHeaders?: HttpHeaders;
    /** @supported Chrome, Firefox */
    responseHeaders?: HttpHeaders;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    authCredentials?: {

        username: string,

        password: string,
      } | _BlockingResponseAuthCredentials | undefined;
    /** @supported Firefox */
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
     * @supported Chrome, Firefox
     * @note shape differs between browsers
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
      }[] | CertificateInfo[];
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    state: string | _SecurityInfoState;
    /** @supported Firefox */
    errorMessage?: string | undefined;
    /** @supported Firefox */
    protocolVersion?: _SecurityInfoProtocolVersion | undefined;
    /** @supported Firefox */
    cipherSuite?: string | undefined;
    /** @supported Firefox */
    keaGroupName?: string | undefined;
    /** @supported Firefox */
    secretKeyLength?: number | undefined;
    /** @supported Firefox */
    signatureSchemeName?: string | undefined;
    /** @supported Firefox */
    overridableErrorCategory?: _SecurityInfoOverridableErrorCategory | undefined;
    /** @supported Firefox */
    isDomainMismatch?: boolean | undefined;
    /** @supported Firefox */
    isNotValidAtThisTime?: boolean | undefined;
    /** @supported Firefox */
    isUntrusted?: boolean | undefined;
    /** @supported Firefox */
    isExtendedValidation?: boolean | undefined;
    /** @supported Firefox */
    certificateTransparencyStatus?: CertificateTransparencyStatus | undefined;
    /** @supported Firefox */
    hsts?: boolean | undefined;
    /** @supported Firefox */
    hpkp?: string | undefined;
    /** @supported Firefox */
    weaknessReasons?: TransportWeaknessReasons[] | undefined;
    /** @supported Firefox */
    usedEch?: boolean | undefined;
    /** @supported Firefox */
    usedDelegatedCredentials?: boolean | undefined;
    /** @supported Firefox */
    usedOcsp?: boolean | undefined;
    /** @supported Firefox */
    usedPrivateDns?: boolean | undefined;
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
 * @note type differs between browsers; emitted as a union
 */
export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onBeforeRequest: (CustomChromeEvent<(
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
    ) => void>) | _WebRequestOnBeforeRequestEvent | (events.WebRequestEvent<(details: webRequest.WebRequestDetails & { requestBody?: { formData?: Record<string, unknown[]>; raw?: { bytes?: unknown }[]; error?: string } }) => void>);
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onBeforeSendHeaders: (CustomChromeEvent<(
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
    ) => void>) | _WebRequestOnBeforeSendHeadersEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebRequestOnSendHeadersEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onHeadersReceived: (CustomChromeEvent<(
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
    ) => void>) | _WebRequestOnHeadersReceivedEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onAuthRequired: (CustomChromeEvent<(
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
    ) => void>) | _WebRequestOnAuthRequiredEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebRequestOnResponseStartedEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebRequestOnBeforeRedirectEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebRequestOnCompletedEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | _WebRequestOnErrorOccurredEvent | events.WebRequestEvent<(details: webRequest.WebRequestDetails) => void>;
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
 * @supported Chrome, Firefox, Safari
 * @note definitions differ between browsers; emitted as a union
 */
export type WindowType = ("normal" | "popup" | "panel" | "app" | "devtools" | "custom-tab") | ("normal" | "popup" | "panel" | "app" | "devtools") | ("normal" | "popup");
/**
 * @supported Chrome, Firefox, Safari
 * @note definitions differ between browsers; emitted as a union
 */
export type WindowState = ("normal" | "minimized" | "maximized" | "fullscreen" | "locked-fullscreen") | ("normal" | "minimized" | "maximized" | "fullscreen" | "docked") | ("normal" | "minimized" | "maximized" | "fullscreen");
/**
 * @supported Chrome, Firefox, Safari
 */
export interface Window {
    /** @supported Chrome, Firefox, Safari */
    id?: number;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    focused?: boolean;
    /** @supported Chrome, Firefox, Safari */
    top?: number;
    /** @supported Chrome, Firefox, Safari */
    left?: number;
    /** @supported Chrome, Firefox, Safari */
    width?: number;
    /** @supported Chrome, Firefox, Safari */
    height?: number;
    /** @supported Chrome, Firefox, Safari */
    tabs?: tabs.Tab[];
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    incognito?: boolean;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    type?: WindowType | WindowType | undefined | windows.WindowType;
    /**
     * @supported Chrome, Firefox, Safari
     * @note shape differs between browsers
     */
    state?: WindowState | WindowState | undefined | windows.WindowState;
    /**
     * @supported Chrome, Firefox, Safari
     * @note optional in Safari, required in Chrome, Firefox
     */
    alwaysOnTop?: boolean;
    /** @supported Chrome, Firefox */
    sessionId?: string;
    /** @supported Firefox */
    title?: string | undefined;
}
/**
 * @supported Chrome, Firefox
 * @note definitions differ between browsers; emitted as a union
 */
export type CreateType = ("normal" | "popup" | "panel") | (| "normal"
        | "popup"
        | "panel"
        | "detached_panel");
/**
 * @supported Chrome
 */
export interface QueryOptions {
    populate?: boolean;
    windowTypes?: WindowType[];
}
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const WINDOW_ID_NONE: -1 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const WINDOW_ID_CURRENT: -2 | number;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | WebExtEvent<(window: Window) => void> | events.Event<(window: windows.Window) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | WebExtEvent<(windowId: number) => void>;
/**
 * @supported Chrome, Firefox, Safari
 * @note type differs between browsers; emitted as a union
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
    ) => void> | WebExtEvent<(windowId: number) => void>;
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
 * @supported Firefox
 */
export function get(windowId: number, getInfo?: GetInfo): Promise<Window>;
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
 * @supported Firefox
 */
export function getCurrent(getInfo?: GetInfo): Promise<Window>;
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
 * @supported Firefox
 */
export function getLastFocused(getInfo?: GetInfo): Promise<Window>;
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
 * @supported Firefox
 */
export function getAll(getInfo?: _GetAllGetInfo): Promise<Window[]>;
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
 * @supported Firefox
 */
export function create(createData?: _CreateCreateData): Promise<Window>;
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
 * @supported Firefox
 */
export function update(windowId: number, updateInfo: _UpdateUpdateInfo): Promise<Window>;
/**
 * @supported Safari
 */
export function update(windowID: number, properties: windows.WindowUpdateOptions, callback: (result: windows.Window) => void): void;
/**
 * @supported Safari
 */
export function update(windowID: number, properties: windows.WindowUpdateOptions): Promise<windows.Window>;
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
/**
 * @supported Safari
 */
export function remove(windowID: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(windowID: number): Promise<void>;
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
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    host_permissions?: string[] | MatchPattern[] | undefined;
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
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    action?: Record<string, unknown> | ActionManifest | undefined;
    /** @supported Chrome, Firefox */
    browser_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    page_action?: Record<string, unknown>;
    /** @supported Chrome, Firefox */
    sidebar_action?: Record<string, unknown>;
    /**
     * @supported Chrome, Firefox
     * @note shape differs between browsers
     */
    web_accessible_resources?: Array<{
    resources: string[];
    matches: string[];
  }> | string[]
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
    /** @supported Firefox */
    protocol_handlers?: ProtocolHandler[] | undefined;
    /** @supported Firefox */
    default_locale?: string | undefined;
    /** @supported Firefox */
    l10n_resources?: string[] | undefined;
    /** @supported Firefox */
    minimum_chrome_version?: string | undefined;
    /** @supported Firefox */
    minimum_opera_version?: string | undefined;
    /** @supported Firefox */
    incognito?: _WebExtensionManifestIncognito | undefined;
    /** @supported Firefox */
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
    /** @supported Firefox */
    optional_host_permissions?: MatchPattern[] | undefined;
    /** @supported Firefox */
    hidden?: boolean | undefined;
    /** @supported Firefox */
    theme_experiment?: ThemeExperiment | undefined;
    /** @supported Firefox */
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
 * @supported Chrome, Firefox
 */
export type ImageData = globalThis.ImageData | { width: number; height: number; data: Uint8ClampedArray };
/**
 * @supported Chrome, Firefox
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
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getTitle(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function getUserSettings(): Promise<browser.action._GetUserSettingsReturnUserSettings>;
/**
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getPopup(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function setBadgeText(details: _SetBadgeTextDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeText(details: action.ActionSetBadgeTextDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeText(details: Details): Promise<string>;
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
 * @supported Firefox
 */
export function setBadgeBackgroundColor(details: _SetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setBadgeBackgroundColor(details: action.ActionSetBadgeBackgroundColorDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
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
 * @supported Firefox, Safari
 */
export function enable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function enable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function enable(callback: () => void): void;
/**
 * @supported Firefox, Safari
 */
export function disable(tabId?: number): Promise<void>;
/**
 * @supported Safari
 */
export function disable(tabId: number, callback: () => void): void;
/**
 * @supported Safari
 */
export function disable(callback: () => void): void;
/**
 * @supported Firefox
 */
export function isEnabled(details: Details): Promise</* TODO: Upstream type uses any */ any>;
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
 * @supported Firefox
 */
export function openPopup(options?: _OpenPopupOptions): Promise<boolean>;
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
 * @supported Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onClicked: WebExtEvent<(tab: tabs.Tab, info?: OnClickData) => void> | events.Event<(tab: tabs.Tab) => void>;
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
 * @supported Chrome, Firefox
 */
export interface _SetIconDetails {
    /**
     * @supported Chrome, Firefox
     * @note optional in Chrome, required in Firefox
     */
    tabId?: number;
    /** @supported Chrome */
    iconIndex?: number;
    /** @supported Firefox */
    imageData?: ImageDataType | {
            [key: number]: ImageDataType;
        } | undefined;
    /** @supported Firefox */
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
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setTitle(details: action.ActionSetTitleDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getTitle(details: _GetTitleDetails): Promise<string>;
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
 * @supported Firefox
 */
export function setIcon(details: _SetIconDetails): Promise<void>;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setIcon(details: action.ActionSetIconDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function setPopup(details: _SetPopupDetails): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails, callback: () => void): void;
/**
 * @supported Safari
 */
export function setPopup(details: action.ActionSetPopupDetails): Promise<void>;
/**
 * @supported Firefox
 */
export function getPopup(details: _GetPopupDetails): Promise<string>;
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
 * @supported Firefox
 */
export function openPopup(): Promise<void>;
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
 * @supported Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onClicked: WebExtEvent<(tab: tabs.Tab, info?: OnClickData) => void> | events.Event<(tab: tabs.Tab) => void>;

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
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const networkPredictionEnabled: types.ChromeSetting<boolean> | types.Setting;
/**
 * @supported Firefox
 */
export const peerConnectionEnabled: types.Setting;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const webRTCIPHandlingPolicy: types.ChromeSetting<IPHandlingPolicy> | types.Setting;
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
 * @note type differs between browsers; emitted as a union
 */
export const passwordSavingEnabled: types.ChromeSetting<boolean> | types.Setting;
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
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const hyperlinkAuditingEnabled: types.ChromeSetting<boolean> | types.Setting;
/**
 * @supported Chrome, Firefox
 * @note type differs between browsers; emitted as a union
 */
export const referrersEnabled: types.ChromeSetting<boolean> | types.Setting;
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
/**
 * @supported Chrome
 */
export const thirdPartyCookiesAllowed: types.ChromeSetting<boolean>;
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
export const protectedContentEnabled: types.ChromeSetting<boolean>;
/**
 * @supported Chrome
 */
export const relatedWebsiteSetsEnabled: types.ChromeSetting<boolean>;

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
 * @supported Firefox, Safari
 */
export const ACTION_MENU_TOP_LEVEL_LIMIT: number;
/**
 * @supported Firefox
 */
export function create(createProperties: _CreateCreateProperties, callback?: () => void): number | string;
/**
 * @supported Safari
 */
export function create(createProperties: menus.MenuItemProperties, callback?: () => void): number | string;
/**
 * @supported Firefox
 */
export function update(id: number | string, updateProperties: _UpdateUpdateProperties): Promise<void>;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties, callback: () => void): void;
/**
 * @supported Safari
 */
export function update(identifier: number | string, properties: menus.MenuItemUpdateProperties): Promise<void>;
/**
 * @supported Firefox
 */
export function remove(menuItemId: number | string): Promise<void>;
/**
 * @supported Safari
 */
export function remove(identifier: number | string, callback: () => void): void;
/**
 * @supported Safari
 */
export function remove(identifier: number | string): Promise<void>;
/**
 * @supported Firefox, Safari
 */
export function removeAll(): Promise<void>;
/**
 * @supported Safari
 */
export function removeAll(callback: () => void): void;
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
 * @supported Firefox, Safari
 * @note type differs between browsers; emitted as a union
 */
export const onClicked: WebExtEvent<(info: OnClickData, tab?: tabs.Tab) => void> | (events.Event<(info: { menuItemId: number | string; parentMenuItemId?: number | string; checked?: boolean; wasChecked?: boolean; selectionText?: string; srcUrl?: string; mediaType?: "audio" | "image" | "video"; linkUrl?: string; linkText?: string; editable?: boolean; frameId?: number; pageUrl?: string; frameUrl?: string }, tab?: tabs.Tab) => void>);
/**
 * @supported Firefox
 */
export const onShown: WebExtEvent<(info: _OnShownInfo, tab: tabs.Tab) => void>;
/**
 * @supported Firefox
 */
export const onHidden: WebExtEvent<() => void>;
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

export namespace mimeHandlerPrivate {
/**
 * @supported Chrome
 */
export interface StreamInfo {
    mimeType: string;
    originalUrl: string;
    responseHeaders: Record<string, string>;
    streamUrl: string;
    tabId: number;
    embedded: boolean;
}

}
}

declare namespace browser {
  export import _debugger = chrome._debugger;
  export import _manifest = chrome._manifest;
  export import accessibilityFeatures = chrome.accessibilityFeatures;
  export import action = chrome.action;
  export import activityLog = chrome.activityLog;
  export import alarms = chrome.alarms;
  export import audio = chrome.audio;
  export import bookmarks = chrome.bookmarks;
  export import browserAction = chrome.browserAction;
  export import browserSettings = chrome.browserSettings;
  export import browsingData = chrome.browsingData;
  export import captivePortal = chrome.captivePortal;
  export import certificateProvider = chrome.certificateProvider;
  export import chrome_url_overrides = chrome.chrome_url_overrides;
  export import clipboard = chrome.clipboard;
  export import commands = chrome.commands;
  export import contentScripts = chrome.contentScripts;
  export import contentSettings = chrome.contentSettings;
  export import contextMenus = chrome.contextMenus;
  export import contextualIdentities = chrome.contextualIdentities;
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
  export import experiments = chrome.experiments;
  export import extension = chrome.extension;
  export import extensionTypes = chrome.extensionTypes;
  export import extensionsManifestTypes = chrome.extensionsManifestTypes;
  export import fileBrowserHandler = chrome.fileBrowserHandler;
  export import fileHandlers = chrome.fileHandlers;
  export import fileSystemProvider = chrome.fileSystemProvider;
  export import find = chrome.find;
  export import fontSettings = chrome.fontSettings;
  export import gcm = chrome.gcm;
  export import geckoProfiler = chrome.geckoProfiler;
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
  export import menus = chrome.menus;
  export import mimeHandler = chrome.mimeHandler;
  export import mimeHandlerPrivate = chrome.mimeHandlerPrivate;
  export import networkStatus = chrome.networkStatus;
  export import normandyAddonStudy = chrome.normandyAddonStudy;
  export import notifications = chrome.notifications;
  export import oauth2 = chrome.oauth2;
  export import offscreen = chrome.offscreen;
  export import omnibox = chrome.omnibox;
  export import pageAction = chrome.pageAction;
  export import pageCapture = chrome.pageCapture;
  export import permissions = chrome.permissions;
  export import pkcs11 = chrome.pkcs11;
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
  export import sidebarAction = chrome.sidebarAction;
  export import sockets = chrome.sockets;
  export import storage = chrome.storage;
  export import system = chrome.system;
  export import systemLog = chrome.systemLog;
  export import tabCapture = chrome.tabCapture;
  export import tabGroups = chrome.tabGroups;
  export import tabs = chrome.tabs;
  export import telemetry = chrome.telemetry;
  export import theme = chrome.theme;
  export import topSites = chrome.topSites;
  export import tts = chrome.tts;
  export import ttsEngine = chrome.ttsEngine;
  export import types = chrome.types;
  export import urlbar = chrome.urlbar;
  export import userScripts = chrome.userScripts;
  export import vpnProvider = chrome.vpnProvider;
  export import wallpaper = chrome.wallpaper;
  export import webAccessibleResources = chrome.webAccessibleResources;
  export import webAuthenticationProxy = chrome.webAuthenticationProxy;
  export import webNavigation = chrome.webNavigation;
  export import webRequest = chrome.webRequest;
  export import windows = chrome.windows;
}
