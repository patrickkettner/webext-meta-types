export interface CoverageElement {
  chrome: boolean;
  firefox: boolean;
  kind?: string;
}

export interface CoverageNamespace {
  chrome: boolean;
  firefox: boolean;
  elements: Record<string, CoverageElement>;
}

export interface CoverageManifest {
  namespaces: Record<string, CoverageNamespace>;
}
