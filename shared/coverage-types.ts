import type { BrowserId } from "../src/generator";

/**
 * Which browsers declare a thing.
 *
 * Keyed by browser rather than one boolean field per browser, so adding a
 * browser is a key rather than a schema change and a pass over every consumer.
 */
export type BrowserFlags = Partial<Record<BrowserId, boolean>>;

export interface CoverageElement extends BrowserFlags {
  kind?: string;
}

export interface CoverageNamespace extends BrowserFlags {
  elements: Record<string, CoverageElement>;
}

export interface CoverageManifest {
  namespaces: Record<string, CoverageNamespace>;
}
