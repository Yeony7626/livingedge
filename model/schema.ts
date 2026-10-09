// Detail Model schema (SPEC.md §3). Nodes may read any field; they write only their own.

export type ConfidenceTag = "calculated" | "qualitative" | "illustrative";
export type Source = "user" | "inferred" | "default";

export interface Tagged<T> {
  value: T;
  confidence: ConfidenceTag;
  evidence_ref?: string;          // key into library/evidence.json
}

export interface Assumption {
  field: string;                  // dot path into DetailModel
  value: unknown;
  source: Source;
  editable: boolean;
  note?: string;
}

export interface Constraint {
  rule: string;                   // human-readable, e.g. "overhang_mm >= 300"
  expression: string;             // machine-checkable, evaluated by core/validator.ts
  origin: "user" | "library" | "default";
  must_preserve: boolean;
}

export interface Layer {
  id: string;
  library_id: string;             // must exist in library/assemblies or library/materials
  role: "ground" | "drainage" | "separation" | "base" | "cladding" | "overhang" | "seat";
  thickness_mm: Tagged<number>;
  order: number;                  // outside = 0, increasing inward
  replaceable: boolean;
}

export interface Joint {
  id: string;
  between: [string, string];      // layer ids
  kind: "open" | "sealed" | "drip" | "overlap";
  water_path: "sheds" | "holds" | "admits";   // written by section-generator from library data
}

export interface MaterialRef {
  id: string;
  library_id: string;
  used_in: string[];              // layer ids
  properties: {
    absorption: Tagged<"low" | "moderate" | "high">;
    drying_rate: Tagged<"slow" | "moderate" | "fast">;
    surface_texture: Tagged<"smooth" | "textured" | "porous">;
    receptive_to_growth: Tagged<boolean>;
  };
}

export interface Geometry {
  ground_clearance_mm: Tagged<number>;
  overhang_mm: Tagged<number>;
  wall_height_mm: Tagged<number>;
  ledges: { id: string; depth_mm: number; height_mm: number; slope_deg: number }[];
  recesses: { id: string; depth_mm: number; height_mm: number }[];
  seat?: { height_mm: number; depth_mm: number; layer_id: string };
  // Section outline in mm, origin at exterior ground line. Written by section-generator, edited by canvas.
  section: { layer_id: string; polygon: [number, number][] }[];
}

export interface ScenarioInput {
  id: string;
  kind: "event" | "long_term";
  rain_intensity: "light" | "moderate" | "heavy";
  duration_h: number;
  drying_h: number;
  wind: "calm" | "moderate" | "strong";
}

export interface ScenarioRun {
  id: string;
  scenario: ScenarioInput;
  model_version: number;
  // Per-layer, per-timestep. Written only by core/scenario-engine.
  frames: {
    t_h: number;
    wetness: Record<string, Tagged<number>>;         // layer id -> 0..1
    water_paths: { from: string; to: string; kind: "sheds" | "holds" | "admits" }[];
  }[];
  growth_favourability: Record<string, Tagged<"low" | "moderate" | "high">>;  // layer id; written by core/scenario-engine
  summary: string;                                   // written by explainer
}

export interface DetailModel {
  id: string;
  version: number;
  parent_version?: number;
  created_at: string;

  // Written by intent-parser
  intention: {
    character: string;
    ecological_ambition: string;
    material_expression: string;
  };
  environment: {
    location?: string;
    orientation_deg?: Tagged<number>;
    rain_exposure: Tagged<"low" | "moderate" | "high">;
    humidity: Tagged<"low" | "moderate" | "high">;
  };
  human_use: {
    sitting: boolean;
    touching: boolean;
    maintenance_actions: ("clean" | "replace_component" | "redirect_water")[];
  };

  // Written by gap-check / assumption-filler
  assumptions: Assumption[];
  open_questions: string[];

  // Written by intent-parser (user) and library-lookup (library); never edited by section-generator
  constraints: Constraint[];

  // Written by section-generator; edited by edit workflow and canvas
  geometry: Geometry;
  assembly: { layers: Layer[]; joints: Joint[] };
  materials: MaterialRef[];

  // Written by explainer
  explanation: { strategy: string; why_elements: Record<string, string> };

  // Appended by scenario workflow
  scenario_runs: ScenarioRun[];
}

// Minimal library shape checkSupported needs. Written by core/library.ts (phase 2), which may extend entries.
export interface Library {
  assemblies: { id: string }[];
  materials: { id: string }[];
}

// Written by core/validator.ts. path is a dot path into the input, e.g. "geometry.overhang_mm.confidence".
export interface ValidationError {
  path: string;
  message: string;
}
