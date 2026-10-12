// Zod mirror of model/schema.ts. Objects are strict: unknown keys are errors, never silently dropped.
import { z } from "zod";
import type { DetailModel } from "./schema";

const Confidence = z.enum(["calculated", "qualitative", "illustrative"]);
const Level = z.enum(["low", "moderate", "high"]);
const KEY_YEARS = [0, 5, 15, 30] as const;
const KeyYear = z.union([z.literal(0), z.literal(5), z.literal(15), z.literal(30)]);

const tagged = <T extends z.ZodTypeAny, C extends z.ZodTypeAny = typeof Confidence>(value: T, confidence?: C) =>
  z.strictObject({ value, confidence: (confidence ?? Confidence) as C, evidence_ref: z.string().min(1).optional() });

// Non-negotiable 2: a material property needs an evidence_ref unless tagged illustrative.
const evidenced = <T extends z.ZodTypeAny>(value: T) =>
  tagged(value).refine((p) => p.confidence === "illustrative" || p.evidence_ref !== undefined, {
    message: "material property needs evidence_ref or confidence 'illustrative'",
    path: ["evidence_ref"],
  });

// Non-negotiable 6: decades values are never calculated.
const NotCalculated = z.enum(["qualitative", "illustrative"], {
  errorMap: () => ({ message: "decades values are qualitative or illustrative, never calculated" }),
});
const decade = <T extends z.ZodTypeAny>(value: T) => tagged(value, NotCalculated);

// Assumption values are any JSON value but must be present.
const Json = z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.any()), z.record(z.any())]);
const Point = z.tuple([z.number(), z.number()]);
const WaterPath = z.enum(["sheds", "holds", "admits"]);
const UseIntensity = z.enum(["rare", "daily", "heavy"]);
const Maintenance = z.enum(["none", "occasional", "regular"]);

const StormRun = z.strictObject({
  id: z.string(),
  kind: z.literal("storm"),
  at_year: KeyYear,
  input: z.strictObject({
    rain_intensity: z.enum(["light", "moderate", "heavy"]),
    duration_h: z.number().nonnegative(),
    drying_h: z.number().nonnegative(),
    wind: z.enum(["calm", "moderate", "strong"]),
  }),
  model_version: z.number().int(),
  frames: z.array(
    z.strictObject({
      t_h: z.number(),
      wetness: z.record(tagged(z.number().min(0).max(1))),
      water_paths: z.array(z.strictObject({ from: z.string(), to: z.string(), kind: WaterPath })),
    }),
  ),
  summary: z.string(),
});

const LayerState = z.strictObject({
  moisture_regime: decade(z.enum(["dry", "intermittent", "persistent"])),
  growth_stage: decade(z.enum(["clean", "biofilm", "algae", "moss", "lichen", "plants"])),
  wear: decade(Level),
  condition: decade(z.enum(["sound", "weathered", "degraded", "replace"])),
});

const DecadesRun = z.strictObject({
  id: z.string(),
  kind: z.literal("decades"),
  drivers: z.strictObject({ orientation_deg: z.number(), use_intensity: UseIntensity, maintenance: Maintenance }),
  model_version: z.number().int(),
  keyframes: z
    .array(
      z.strictObject({
        year: KeyYear,
        layers: z.record(LayerState),
        ground: z.strictObject({
          drainage_silt: decade(Level),
          root_reach: decade(z.enum(["none", "approaching", "at_base"])),
          soil_splash: decade(Level),
        }),
      }),
    )
    .refine((k) => k.map((f) => f.year).join() === KEY_YEARS.join(), {
      message: "keyframes must be exactly the years 0, 5, 15, 30, in order",
    }),
  summary: z.string(),
});

export const DetailModelSchema: z.ZodType<DetailModel> = z.strictObject({
  id: z.string().min(1),
  version: z.number().int().positive(),
  parent_version: z.number().int().positive().optional(),
  created_at: z.string(),
  intention: z.strictObject({
    character: z.string(),
    ecological_ambition: z.string(),
    material_expression: z.string(),
  }),
  environment: z.strictObject({
    location: z.string().optional(),
    climate_id: z.string().min(1),
    orientation_deg: tagged(z.number().min(0).lt(360)),
    rain_exposure: tagged(Level),
    wind_exposure: tagged(Level),
    humidity: tagged(Level),
  }),
  ground: z.strictObject({
    soil_library_id: z.string().min(1),
    soil_type: tagged(z.enum(["clay", "silt", "sand", "gravel", "unknown"])),
    planting: z.strictObject({
      kind: z.enum(["none", "groundcover", "shrub", "tree"]),
      distance_mm: z.number().nonnegative(),
    }),
  }),
  human_use: z.strictObject({
    sitting: z.boolean(),
    touching: z.boolean(),
    use_intensity: UseIntensity,
    maintenance: Maintenance,
    maintenance_actions: z.array(z.enum(["clean", "replace_component", "redirect_water"])),
  }),
  assumptions: z.array(
    z.strictObject({
      field: z.string(),
      value: Json,
      source: z.enum(["user", "inferred", "default"]),
      editable: z.boolean(),
      note: z.string().optional(),
    }),
  ),
  open_questions: z.array(z.string()),
  constraints: z.array(
    z.strictObject({
      rule: z.string(),
      expression: z.string(),
      origin: z.enum(["user", "library", "default"]),
      must_preserve: z.boolean(),
      evidence_ref: z.string().min(1).optional(),
    }),
  ),
  geometry: z.strictObject({
    ground_clearance_mm: tagged(z.number().nonnegative()),
    overhang_mm: tagged(z.number().nonnegative()),
    wall_height_mm: tagged(z.number().positive()),
    extrusion_mm: z.number().positive(),
    ledges: z.array(z.strictObject({ id: z.string(), depth_mm: z.number(), height_mm: z.number(), slope_deg: z.number() })),
    recesses: z.array(z.strictObject({ id: z.string(), depth_mm: z.number(), height_mm: z.number() })),
    seat: z.strictObject({ height_mm: z.number(), depth_mm: z.number(), layer_id: z.string() }).optional(),
    section: z.array(z.strictObject({ layer_id: z.string(), polygon: z.array(Point).min(3) })),
  }),
  assembly: z.strictObject({
    layers: z.array(
      z.strictObject({
        id: z.string().min(1),
        library_id: z.string().min(1),
        role: z.enum(["ground", "drainage", "footing", "base", "separation", "wall", "cavity", "cladding", "drip", "overhang", "seat"]),
        thickness_mm: tagged(z.number().positive()),
        order: z.number().int().nonnegative(),
        build_step: z.number().int().positive(),
        replaceable: z.boolean(),
      }),
    ),
    joints: z.array(
      z.strictObject({
        id: z.string(),
        between: z.tuple([z.string(), z.string()]),
        kind: z.enum(["open", "sealed", "drip", "overlap"]),
        water_path: WaterPath,
      }),
    ),
  }),
  materials: z.array(
    z.strictObject({
      id: z.string(),
      library_id: z.string().min(1),
      used_in: z.array(z.string()),
      properties: z.strictObject({
        absorption: evidenced(Level),
        drying_rate: evidenced(z.enum(["slow", "moderate", "fast"])),
        surface_texture: evidenced(z.enum(["smooth", "textured", "porous"])),
        receptive_to_growth: evidenced(z.boolean()),
        freeze_thaw_susceptibility: evidenced(Level),
        uv_weathering: evidenced(Level),
        decay_risk: evidenced(Level),
        thermal_mass: evidenced(Level),
        service_life_yr: evidenced(z.number().positive()),
      }),
    }),
  ),
  explanation: z.strictObject({ strategy: z.string(), why_elements: z.record(z.string()) }),
  runs: z.array(z.discriminatedUnion("kind", [DecadesRun, StormRun])),
});
