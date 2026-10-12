// Detail Model schema v2 (SPEC.md §3). Nodes may read any field; they write only their own.
// Types shared across modules but not part of the model live in model/types.ts.

export type ConfidenceTag = "calculated" | "qualitative" | "illustrative";
export type Source = "user" | "inferred" | "default";
export type Level = "low" | "moderate" | "high";
export type KeyYear = 0 | 5 | 15 | 30;
export type GrowthStage = "clean" | "biofilm" | "algae" | "moss" | "lichen" | "plants";

export interface Tagged<T> {
  value: T;
  confidence: ConfidenceTag;
  evidence_ref?: string;          // key into library/evidence.json
}

export interface Assumption {
  field: string;                  // dot path into DetailModel
  value: unknown;                 // any JSON value
  source: Source;
  editable: boolean;
  note?: string;
}

export interface Constraint {
  rule: string;                   // human-readable, e.g. "cladding at least 200 mm above finished ground"
  expression: string;             // "<path> <op> <number>", evaluated by core/validator.ts
  origin: "user" | "library" | "default";
  must_preserve: boolean;
  evidence_ref?: string;          // for origin "library": the requirement's entry, which names the clause
}

export type LayerRole =
  | "ground" | "drainage" | "footing" | "base" | "separation" | "wall"
  | "cavity" | "cladding" | "drip" | "overhang" | "seat";

export interface Layer {
  id: string;
  library_id: string;             // must exist in library/assemblies or library/materials
  role: LayerRole;
  thickness_mm: Tagged<number>;
  order: number;                  // outside = 0, increasing inward
  build_step: number;             // construction order, from the library assembly; 1 = built first
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
    absorption: Tagged<Level>;
    drying_rate: Tagged<"slow" | "moderate" | "fast">;
    surface_texture: Tagged<"smooth" | "textured" | "porous">;
    receptive_to_growth: Tagged<boolean>;
    freeze_thaw_susceptibility: Tagged<Level>;
    uv_weathering: Tagged<Level>;
    decay_risk: Tagged<Level>;    // "low" for mineral materials
    thermal_mass: Tagged<Level>;
    service_life_yr: Tagged<number>;
  };
}

export interface Geometry {
  ground_clearance_mm: Tagged<number>;   // finished ground to underside of cladding
  overhang_mm: Tagged<number>;
  wall_height_mm: Tagged<number>;
  extrusion_mm: number;                  // length of wall shown in 3D; default 1500
  ledges: { id: string; depth_mm: number; height_mm: number; slope_deg: number }[];
  recesses: { id: string; depth_mm: number; height_mm: number }[];
  seat?: { height_mm: number; depth_mm: number; layer_id: string };
  // Section outline in mm, origin at exterior ground line, x increasing inward, y up.
  // Written by section-generator; changed only through core/patch.ts. The 3D view extrudes it.
  section: { layer_id: string; polygon: [number, number][] }[];
}

export interface StormInput {
  rain_intensity: "light" | "moderate" | "heavy";
  duration_h: number;
  drying_h: number;
  wind: "calm" | "moderate" | "strong";
}

export interface StormRun {
  id: string;
  kind: "storm";
  at_year: KeyYear;               // the edge's state from the decades run at that year
  input: StormInput;
  model_version: number;
  // Per-layer, per-timestep. Written only by core/storm-engine.ts.
  frames: {
    t_h: number;
    wetness: Record<string, Tagged<number>>;         // layer id -> 0..1
    water_paths: { from: string; to: string; kind: "sheds" | "holds" | "admits" }[];
  }[];
  summary: string;                                   // written by explainer
}

export interface LayerState {
  moisture_regime: Tagged<"dry" | "intermittent" | "persistent">;
  growth_stage: Tagged<GrowthStage>;
  wear: Tagged<Level>;
  condition: Tagged<"sound" | "weathered" | "degraded" | "replace">;
}

export interface GroundState {
  drainage_silt: Tagged<Level>;
  root_reach: Tagged<"none" | "approaching" | "at_base">;
  soil_splash: Tagged<Level>;
}

export interface DecadesRun {
  id: string;
  kind: "decades";
  drivers: {                      // snapshot of the inputs, for reproducibility
    orientation_deg: number;
    use_intensity: "rare" | "daily" | "heavy";
    maintenance: "none" | "occasional" | "regular";
  };
  model_version: number;
  // Exactly four keyframes, years 0, 5, 15, 30. Written only by core/decades-engine.ts.
  keyframes: { year: KeyYear; layers: Record<string, LayerState>; ground: GroundState }[];
  summary: string;                                   // written by explainer
}

export type Keyframe = DecadesRun["keyframes"][number];

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
    climate_id: string;                      // key into library/climates
    orientation_deg: Tagged<number>;         // direction the façade faces; 0 = north
    rain_exposure: Tagged<Level>;
    wind_exposure: Tagged<Level>;
    humidity: Tagged<Level>;
  };
  ground: {
    soil_library_id: string;
    soil_type: Tagged<"clay" | "silt" | "sand" | "gravel" | "unknown">;
    planting: { kind: "none" | "groundcover" | "shrub" | "tree"; distance_mm: number };
  };
  human_use: {
    sitting: boolean;
    touching: boolean;
    use_intensity: "rare" | "daily" | "heavy";
    maintenance: "none" | "occasional" | "regular";
    maintenance_actions: ("clean" | "replace_component" | "redirect_water")[];
  };

  // Written by gap-check / assumption-filler
  assumptions: Assumption[];
  open_questions: string[];

  // Written by intent-parser (user) and library-lookup (library); never edited by section-generator
  constraints: Constraint[];

  // Written by section-generator; changed only through core/patch.ts
  geometry: Geometry;
  assembly: { layers: Layer[]; joints: Joint[] };
  materials: MaterialRef[];

  // Written by explainer
  explanation: { strategy: string; why_elements: Record<string, string> };

  // Appended by the decades and storm workflows
  runs: (DecadesRun | StormRun)[];
}
