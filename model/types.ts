// Types shared by more than one module (SPEC.md §4). Phases may add exports; changing one needs escalation.

// Minimal library shape checkSupported needs; core/library.ts (phase 2) may extend entries.
export interface Library {
  assemblies: { id: string }[];
  materials: { id: string }[];
}

// Written by core/validator.ts. path is a dot path into the input, e.g. "geometry.overhang_mm.confidence".
export interface ValidationError {
  path: string;
  message: string;
}
