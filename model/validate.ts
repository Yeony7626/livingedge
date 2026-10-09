// Zod mirror of model/schema.ts. Objects are strict: unknown keys are errors, never silently dropped.
import { z } from "zod";
import type { DetailModel } from "./schema";

const Confidence = z.enum(["calculated", "qualitative", "illustrative"]);
const Level = z.enum(["low", "moderate", "high"]);

const tagged = <T extends z.ZodTypeAny>(value: T) =>
  z.strictObject({ value, confidence: Confidence, evidence_ref: z.string().min(1).optional() });

// Non-negotiable 2: a material property needs an evidence_ref unless tagged illustrative.
const evidenced = <T extends z.ZodTypeAny>(value: T) =>
  tagged(value).refine((p) => p.confidence === "illustrative" || p.evidence_ref !== undefined, {
    message: "material property needs evidence_ref or confidence 'illustrative'",
    path: ["evidence_ref"],
  });

const Point = z.tuple([z.number(), z.number()]);
// Assumption values are any JSON value but must be present.
const Json = z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.any()), z.record(z.any())]);
const WaterPath = z.enum(["sheds", "holds", "admits"]);

const ScenarioInput = z.strictObject({
  id: z.string(),
  kind: z.enum(["event", "long_term"]),
  rain_intensity: z.enum(["light", "moderate", "heavy"]),
  duration_h: z.number().nonnegative(),
  drying_h: z.number().nonnegative(),
  wind: z.enum(["calm", "moderate", "strong"]),
});

const ScenarioRun = z.strictObject({
  id: z.string(),
  scenario: ScenarioInput,
  model_version: z.number().int(),
  frames: z.array(
    z.strictObject({
      t_h: z.number(),
      wetness: z.record(tagged(z.number().min(0).max(1))),
      water_paths: z.array(z.strictObject({ from: z.string(), to: z.string(), kind: WaterPath })),
    }),
  ),
  growth_favourability: z.record(tagged(Level)),
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
    orientation_deg: tagged(z.number()).optional(),
    rain_exposure: tagged(Level),
    humidity: tagged(Level),
  }),
  human_use: z.strictObject({
    sitting: z.boolean(),
    touching: z.boolean(),
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
    }),
  ),
  geometry: z.strictObject({
    ground_clearance_mm: tagged(z.number().nonnegative()),
    overhang_mm: tagged(z.number().nonnegative()),
    wall_height_mm: tagged(z.number().positive()),
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
        role: z.enum(["ground", "drainage", "separation", "base", "cladding", "overhang", "seat"]),
        thickness_mm: tagged(z.number().positive()),
        order: z.number().int().nonnegative(),
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
      }),
    }),
  ),
  explanation: z.strictObject({ strategy: z.string(), why_elements: z.record(z.string()) }),
  scenario_runs: z.array(ScenarioRun),
});
