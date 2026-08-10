/**
 * Preamble stubs for generated .d.ts output.
 *
 * These type stubs resolve references that upstream type packages rely on
 * but don't ship themselves. They are injected at the top of every generated
 * output file.
 *
 * Maintain this file when upstream packages change their assumptions.
 */

// TODO: @types/chrome uses (...args: any[]) => void for Event. TypeScript contravariant constraint requirement (TS2344) requires any[].
export const PREAMBLE = `// Auto-generated meta-types

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
`;
