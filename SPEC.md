# The Living Edge — Build Specification

This file is the single source of truth for building the prototype. A fresh agent session with no prior context should be able to read this file and `BUILD_LOG.md`, find the next unfinished phase, and build it.

Read sections 1–6 once. Read section 7 for the current phase only.

---

## 1. Purpose

The Living Edge is an AI-assisted spatial design tool for architecture students, educators and designers. It treats the ground–façade edge — soil, drainage, plinth, wall base, cladding, overhang, a seat — as a living interface where moisture, heat, wind, ground ecology and human occupation act on each other over time.

A user describes an edge in chat. The tool generates a construction-quality section, shows it in 2D and 3D, assembles it layer by layer in construction order, and lets the user watch it change from year 0 to year 30: growth on surfaces, wear where people sit, timber weathering, drainage silting, roots reaching the plinth. At any year the user can play a single storm. The user edits by chat or by handles in either view and sees the consequences. Every claim is labelled by confidence and traced to evidence.

First region: Vancouver, BC. The library is structured so other regions can be added later.

**The demonstrable outcome this build targets:**
A tester describes a pavilion edge with seating and a receptive outer surface. The tool asks what it must, generates a section that a designer finds credible, assembles it in 2D and 3D, and shows its 30-year life under chosen orientation, use and maintenance. The tester deepens the overhang or adds a drip, and the decades and the storm both respond. The tester rates the section's credibility; the session is logged.

When a contract below is silent, resolve ambiguity in favour of this outcome.

---

## 2. Non-negotiables

These apply to every phase. A phase that violates one does not pass, even if its tests are green.

1. Every value in the Detail Model that describes a physical or environmental quantity carries a `confidence` tag: `calculated`, `qualitative`, or `illustrative`.
2. Every material property carries an `evidence_ref` into `library/evidence.json`, or is tagged `illustrative`. An evidence entry whose `verification` is `snippet` never backs a `calculated` value.
3. LLM nodes interpret, compose and explain. They never compute engine results (wetness, growth, wear, condition, roots, silting).
4. Code nodes never invent materials or assemblies. Generation and edits use only components present in `library/`.
5. A constraint with `must_preserve: true` — every user constraint and every code requirement from `library/requirements.json` — is never silently altered. An edit that would violate one is rejected with a reason that names the constraint and, for a code requirement, its clause.
6. Storms (hours) and decades (years) are different run kinds. A decades run never carries a `calculated` tag.
7. Every animation — assembly sequence, storm frames, decades transitions — is derived from the model or from engine output, never generated independently.
8. All LLM calls go through `ctx.llm`, use structured output against a schema from `model/`, temperature 0. Tests replay recorded responses from `fixtures/llm/` and never call the network.
9. Two runs of any code node on identical input produce byte-identical output.
10. 2D and 3D are derived from the same geometry (`geometry.section` plus `geometry.extrusion_mm`). Neither view stores geometry of its own. Every edit, from chat, a 2D handle or a 3D handle, is a `CanvasEdit` applied through `core/patch.ts`.
11. Ecology is expressed as stages and levels. No species names, no calendar dates, no growth rates beyond the keyframe years.
12. Code reads evidence only from `library/`. Nothing in `research/` is read by code; an entry reaches `library/` only after a human approves it (section 6).

---

## 3. Detail Model schema

`model/schema.ts`. Every field has a comment stating which node writes it. Nodes may read any field; they write only their own. Types shared by more than one module but not part of the model live in `model/types.ts` (section 4).

```ts
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
```

---

## 4. Repository layout and stack

Fixed. Do not add top-level directories.

```
app/              Next.js App Router: page.tsx (the tool), dev/ (review pages), api/ (chat, log)
model/            schema.ts, types.ts, validate.ts
core/             validator.ts, library.ts, patch.ts, llm.ts, geometry.ts, sequence.ts,
                  decades-engine.ts, storm-engine.ts, version-store.ts, log-store.ts
library/          materials/*.json, assemblies/*.json, requirements.json, climates/*.json, evidence.json
nodes/            one file per node: intent-parser.ts, gap-check.ts, assumption-filler.ts,
                  library-lookup.ts, section-generator.ts, explainer.ts, patch-builder.ts
workflows/        generate.ts, edit.ts, decades.ts, storm.ts
ui/               visual-language.ts, section-2d/, view-3d/, sequence/, timeline/, storm/, chat/, panels/
fixtures/         intents/, models/, expected/, llm/
tests/            one file per module or phase
research/         evidence drafts and review.json; read by humans, never by code
BUILD_LOG.md      append-only
SPEC.md           this file
```

**Stack.** TypeScript, Node 20+, Next.js (App Router) deployed on Vercel, Postgres on Neon for logs, React for UI, three.js through @react-three/fiber for 3D, SVG for 2D, vitest for tests, zod for validation. LLM provider: Anthropic Claude; the model is chosen in phase 3 and recorded in that phase's assumptions.

**Boundaries.**
- `core/`, `model/`, `nodes/`, `workflows/` import nothing from `ui/` or `app/`, and nothing that needs a browser. `core/geometry.ts` produces plain arrays (positions, indices); `ui/view-3d` turns them into three.js objects.
- Shared types: any type used by more than one module (`Library`, `ParsedIntent`, `RunContext`, `Node`, `CanvasEdit`, `Diff`, result types, log events) lives in `model/types.ts`. Every phase may add new exports there; changing or removing an existing export requires `status: escalate`.
- Edits: every change to geometry, layers, joints or materials after generation goes through `core/patch.ts`.
- LLM: nodes call the model only through `ctx.llm` (`core/llm.ts`). Tests use the replay client, which serves `fixtures/llm/` keyed by a hash of the request and fails on a missing recording.

Node interface, shared by every file in `nodes/`, defined in `model/types.ts`:

```ts
export interface Node<I, O> {
  name: string;
  kind: "llm" | "code";
  run(input: I, ctx: RunContext): Promise<O>;
}
```

Every workflow is a plain async function that calls its nodes' `run` in order with typed hand-offs. No workflow library, no generic pipeline runner.

---

## 5. Visual language

The tool has one visual language across the 3D view, the assembly sequence, the timeline and the opening screen. It is inspired by isometric hairline drawing, built in our own code; no external drawing package. Tokens live in `ui/visual-language.ts`.

1. **Line, not fill.** Thin, even strokes. A part's silhouette is the strongest line; inner edges and creases are dimmer. No gradients, glows or drop shadows.
2. **Colour is information.** Neutral by default. Colour appears only for what the tool is telling you: wetness, growth stage, the selected element, a violated constraint. One highlight means one thing.
3. **Responds to the hand.** Continuous input (dragging the overhang, the sun, the year) moves on a spring. A discrete choice (which layer, which keyframe) eases over about 700 ms. Nothing moves on its own except a playing timeline, storm or sequence.
4. **Rest is designed.** With no interaction, every view is a composed picture, never an empty default.
5. **Rounded, built solids** in 3D: a silhouette and one crease, not a wireframe.
6. **Confidence is visible.** Line style shows confidence everywhere it applies: solid for calculated, dashed for qualitative, dotted for illustrative.

The 2D section additionally follows drafting conventions: material hatches from the library, heavier line weight for cut elements than for elements beyond, dimensions for clearance, overhang and thicknesses, and labels on leaders. Those conventions use the same line quality and colour rules. Quality is judged against reference details supplied by a human at phase 4.

---

## 6. How to run a phase

Run this procedure for each phase in section 7, in order. Do not start a phase whose `depends_on` phases are not marked `pass` or `review: approved` in `BUILD_LOG.md`.

1. **Read the contract.** Load sections 1–6 and the phase block only.
2. **Write the tests first.** One test per `acceptance` line, in the matching file under `tests/`. Use fixtures named in the contract.
3. **Stub the interface.** Create each file in `writes` with the exact signature from `interface`. Bodies throw `new Error("NotImplemented")`.
4. **Check red.** Run the phase's tests. Every test must fail with `NotImplemented`, not with a type error or missing import.
5. **Implement until green.** Run the phase's tests after each meaningful change.
6. **Run the full suite and the type check.** All tests from all completed phases must pass.
7. **Emit status.** Append the status block (section 9) to `BUILD_LOG.md` and commit with message `phase N: <name>`.

Loop rules:
- If step 6 fails, fix and retry. After 3 failed attempts, set `status: escalate` and stop.
- Never edit a file outside the current phase's `writes` list, except adding new exports to `model/types.ts`. If a change elsewhere is needed, record it under `open_questions` and stop with `status: escalate`. (A Claude Code mod enforces this for Edit and Write.)
- Phases marked `human_review: required` end with `status: review` even when tests pass. A phase that lists it in `depends_on` does not start until a human appends `review: approved` under its block. Phases that do not depend on it may proceed.
- UI phases also provide a page under `app/dev/` that shows the phase's work on the fixtures, for human review.
- Anything you chose that the contract did not specify goes in `assumptions` in the status block.

Evidence approval:
- Research drafts live in `research/*.md`. A human records decisions in `research/review.json`: `{ "<entry id>": { "decision": "approve" | "edit" | "reject", "note"?: string } }`.
- Only entries marked `approve` or `edit` (with the edit applied) may be written into `library/evidence.json`.

---

## 7. Phase contracts

### Phase 1 — schema v2 and validator

```yaml
phase: 1
name: schema-validator
human_review: required
depends_on: []
writes:  [model/schema.ts, model/types.ts, model/validate.ts, core/validator.ts, fixtures/models/*.json, tests/validator.test.ts]
interface:
  validate(model: unknown): { ok: true; model: DetailModel } | { ok: false; errors: ValidationError[] }
  checkConstraints(model: DetailModel): { ok: boolean; violated: Constraint[] }
  checkSupported(model: DetailModel, library: Library): { ok: boolean; unsupported: string[] }
acceptance:
  - fixtures/models/pavilion-a.json validates ok (overhang 600, clearance 200, seat, receptive cladding, rainscreen cavity)
  - fixtures/models/pavilion-b.json (same as a, overhang 0) validates ok
  - a model missing a confidence tag on geometry.overhang_mm fails with error path "geometry.overhang_mm.confidence"
  - a material property tagged qualitative with no evidence_ref fails validation
  - a DecadesRun containing any calculated tag fails validation
  - a DecadesRun without exactly the keyframes 0, 5, 15, 30 fails validation
  - a model whose layer references an unknown library_id fails checkSupported
  - a model with overhang_mm 200 and a user constraint "overhang_mm >= 300" fails checkConstraints and names the constraint
  - a model with ground_clearance_mm 150 and a library constraint "ground_clearance_mm >= 200" fails checkConstraints and the violated constraint carries its evidence_ref
forbidden: [any LLM call, any UI code]
notes:
  - Rework of the earlier rain-only phase 1. Keep its constraint grammar and fail-closed behaviour.
  - Library and ValidationError move to model/types.ts.
```

### Phase 2 — library

```yaml
phase: 2
name: library
human_review: required
depends_on: [1]
writes:  [library/materials/*.json, library/assemblies/*.json, library/requirements.json, library/climates/*.json, library/evidence.json, core/library.ts, model/types.ts, tests/library.test.ts]
interface:
  loadLibrary(): Library
  lookupAssemblies(intent: ParsedIntent, lib: Library): RankedMatch[]
  lookupMaterials(role: LayerRole, receptive: boolean, lib: Library): MaterialRef[]
  requirementsFor(climate_id: string, lib: Library): Constraint[]
acceptance:
  - library contains at least 10 materials and 6 assemblies; every assembly lists its layers with build_step
  - every evidence entry has id, claim, source, url, source_type, region, applicable_limits, confidence, verification
  - every evidence id in library/ is marked approve or edit in research/review.json
  - every material property has an evidence_ref or is tagged illustrative; no entry with verification "snippet" backs a calculated value
  - requirementsFor("vancouver") includes "ground_clearance_mm >= 200" for moisture-sensitive cladding with must_preserve true and an evidence_ref naming the clause
  - lookupAssemblies(fixtures/intents/pavilion.json) ranks an assembly with role "seat" and a receptive cladding in the top 2
  - lookupMaterials("cladding", true) returns only materials with receptive_to_growth true
  - every library_id and evidence_ref used in fixtures/models/*.json resolves in the loaded library
forbidden: [any LLM call, reading research/*.md from code, inventing values without an evidence entry]
notes:
  - Content comes from research/ entries a human approved. Gaps are filled with illustrative tags, never invented sources.
  - library/climates/vancouver.json holds qualitative climate descriptors (rain, wind-driven rain, humidity, freeze-thaw) with evidence refs.
```

### Phase 3 — generate

```yaml
phase: 3
name: generate
human_review: optional
depends_on: [1, 2]
writes:  [nodes/intent-parser.ts, nodes/gap-check.ts, nodes/assumption-filler.ts, nodes/library-lookup.ts, nodes/section-generator.ts, nodes/explainer.ts, workflows/generate.ts, core/llm.ts, model/types.ts, fixtures/intents/*.json, fixtures/llm/*.json, tests/generate.test.ts]
interface:
  generate(input: { text: string; location?: string; constraints?: string[] }, ctx: RunContext): Promise<GenerateResult>
  GenerateResult = { kind: "clarify"; question: string } | { kind: "model"; model: DetailModel }
acceptance:
  - generate(fixtures/intents/pavilion.json) returns kind "model" that passes validate, checkConstraints and checkSupported
  - the model has a seat, a cladding layer with receptive_to_growth true, a cavity layer, and at least one replaceable layer
  - every layer and material in the model exists in the library, and every layer's build_step comes from its library assembly
  - the model's constraints include every requirementsFor(environment.climate_id) entry
  - generate(fixtures/intents/vague.json) returns kind "clarify" with a question about a field listed as critical in nodes/gap-check.ts
  - a user constraint passed in input appears in model.constraints with origin "user" and must_preserve true
  - running generate twice on the same input yields models that differ only in id and created_at
  - the test suite passes with networking disabled
forbidden: [computing engine results, writing to runs]
notes:
  - Critical fields for gap-check: rain exposure, whether sitting is wanted, ecological ambition, orientation. Everything else gets an editable assumption.
  - The section-generator prompt lists only the library components returned by library-lookup.
  - Recordings are made by running the real client once with recording enabled; the API key comes from the developer's local .env.local and is never committed.
```

### Phase 4 — drawings (2D and 3D)

```yaml
phase: 4
name: drawings
human_review: required
depends_on: [1, 2]
writes:  [core/geometry.ts, ui/visual-language.ts, ui/section-2d/*, ui/view-3d/*, ui/panels/*, app/layout.tsx, app/dev/drawings/page.tsx, package.json, next.config.ts, tests/drawings.test.ts]
interface:
  renderSection(model: DetailModel, lib: Library, opts: RenderOptions): string          // SVG
  buildMesh(model: DetailModel): { layers: { layer_id: string; positions: number[]; indices: number[] }[] }
  sectionAt(mesh, z_mm: number): { layer_id: string; polygon: [number, number][] }[]
acceptance:
  - renderSection(pavilion-a) twice produces identical SVG strings
  - every layer appears in the SVG as an element with data-layer-id, hatched with its material's hatch from the library
  - the SVG has dimensions for ground_clearance_mm and overhang_mm and a leader label for every layer
  - cut elements use a heavier stroke than elements beyond; line style follows each value's confidence (section 5, rule 6)
  - buildMesh(pavilion-a) has one mesh per layer, and sectionAt(mesh, extrusion_mm / 2) equals geometry.section within 0.5 mm
  - buildMesh(model) is deterministic
  - no file under ui/ stores or computes geometry other than through core/geometry.ts
  - the explanation panel renders explanation.strategy, every assumption with its source, every open question, and each value's evidence on demand
forbidden: [any LLM call, engine logic]
notes:
  - Section drawn exterior on the left, ground line at y = 0, default scale 1:20.
  - Next.js is set up in this phase. Existing tests keep running under vitest.
  - Human review compares the dev page against 2–3 reference construction details supplied by the human.
```

### Phase 5 — assembly sequence

```yaml
phase: 5
name: assembly-sequence
human_review: optional
depends_on: [4]
writes:  [core/sequence.ts, ui/sequence/*, app/dev/sequence/page.tsx, tests/sequence.test.ts]
interface:
  sequence(model: DetailModel): SequenceStep[]          // { step, layer_ids, caption_ref }
  changedSteps(before: DetailModel, after: DetailModel): SequenceStep[]
acceptance:
  - sequence(pavilion-a) orders layers by build_step, includes every layer exactly once, and is deterministic
  - changedSteps(a, a with a drip added) contains only the drip layer's step
  - the 2D and 3D views consume the same SequenceStep list and show the same layers at every step
  - the player can play, pause, step back, step forward and show all
forbidden: [any LLM call, animation data not derived from sequence()]
notes:
  - Captions come from explanation.why_elements; how each layer is built comes from the library assembly.
  - Plays automatically after the first generation, about 1–1.5 s per step. After an edit only changedSteps animate.
```

### Phase 6 — edit

```yaml
phase: 6
name: edit
human_review: optional
depends_on: [3, 4]
writes:  [core/patch.ts, nodes/patch-builder.ts, workflows/edit.ts, core/version-store.ts, ui/section-2d/handles.tsx, ui/view-3d/handles.tsx, model/types.ts, fixtures/llm/*.json, tests/edit.test.ts]
interface:
  applyCanvasEdit(model: DetailModel, edit: CanvasEdit): DetailModel     // pure; does not validate
  edit(model: DetailModel, request: { text: string } | { canvas: CanvasEdit }, ctx: RunContext): Promise<EditResult>
  EditResult = { kind: "ok"; model: DetailModel; diff: Diff } | { kind: "rejected"; reason: string; violated: Constraint[] }
  CanvasEdit = { kind: "set_overhang" | "set_clearance" | "move_vertex" | "set_thickness" | "redirect_water" | "select_layer"; ... }
acceptance:
  - edit(pavilion-a, text "make the overhang 600mm") returns ok with geometry.overhang_mm.value 600 and the overhang polygons changed
  - edit(pavilion-a with user constraint "overhang_mm >= 300", text "remove the overhang") returns rejected naming that constraint
  - edit(pavilion-a, canvas set_clearance 150) returns rejected naming the Vancouver clearance requirement and its clause
  - a canvas set_clearance edit produces the same model as the equivalent text edit
  - a 3D handle drag and the equivalent 2D handle drag produce the same CanvasEdit
  - redirect_water adds a drip layer from the library and a joint with kind "drip" and water_path "sheds", and records "redirect_water" in human_use.maintenance_actions
  - applyCanvasEdit never changes model.constraints
  - every ok edit saves a new version with parent_version set; version-store returns the chain and supports undo
forbidden: [altering must_preserve constraints, running engines inside edit]
notes:
  - patch-builder (llm) turns text into one or more CanvasEdit values; edit applies them through core/patch.ts, then validates and checks constraints. Text and handle edits share one code path.
```

### Phase 7 — decades engine and timeline

```yaml
phase: 7
name: decades
human_review: required
depends_on: [2, 4]
writes:  [core/decades-engine.ts, workflows/decades.ts, ui/timeline/*, app/dev/timeline/page.tsx, fixtures/expected/decades-*.json, tests/decades.test.ts]
interface:
  runDecades(model: DetailModel, drivers: DecadesRun["drivers"], lib: Library): DecadesRun
  blend(run: DecadesRun, year: number): { state: Keyframe; interpolated: boolean }
acceptance:
  - runDecades is deterministic and returns exactly the keyframes 0, 5, 15, 30
  - every value is tagged qualitative or illustrative and carries an evidence_ref unless illustrative
  - a north-facing receptive cladding reaches a growth stage at least as advanced as the same cladding facing south, at every keyframe
  - maintenance "regular" gives a less advanced growth stage at year 30 than maintenance "none"; growth never regresses between keyframes without maintenance
  - use_intensity "heavy" gives seat wear "high" and seat growth no further than "biofilm" at year 30
  - a timber layer with persistent moisture and ground clearance under 200 mm reaches condition "degraded" or "replace" by year 30
  - planting "tree" within 3000 mm on clay soil gives root_reach "at_base" by year 30; planting "groundcover" gives "none"
  - drainage_silt never decreases between keyframes unless maintenance is "regular"
  - pavilion-b (overhang 0) gives a cladding moisture regime at least as wet as pavilion-a at every keyframe
  - blend(run, 9) returns interpolated true; blend(run, 15) returns the keyframe with interpolated false
forbidden: [any LLM call, species names, calendar dates, growth rates]
notes:
  - Rules, not physics. Each rule is a named function with a one-line comment stating its evidence_ref or that it is illustrative.
  - Wetness duration is the master driver of growth; material receptivity sets the potential; maintenance resets temporarily.
  - The timeline snaps to keyframes within 1 year and labels blended years as interpolated. Drivers: orientation, use, maintenance.
```

### Phase 8 — storm

```yaml
phase: 8
name: storm
human_review: optional
depends_on: [7]
writes:  [core/storm-engine.ts, workflows/storm.ts, ui/storm/*, app/dev/storm/page.tsx, fixtures/expected/storm-*.json, tests/storm.test.ts]
interface:
  runStorm(model: DetailModel, input: StormInput, at: Keyframe, lib: Library): StormRun
acceptance:
  - runStorm is deterministic; every wetness value carries a confidence tag
  - for fixtures/expected/storm-moderate.json, pavilion-b has higher final-frame cladding wetness than pavilion-a
  - a joint with water_path "sheds" never increases wetness of the layer it sheds to; "admits" does
  - the same storm at year 30 with drainage_silt "high" gives higher base and drainage wetness than at year 0
  - a preset fills the sliders with its StormInput; moving a slider marks the preset "custom"
forbidden: [any LLM call]
notes:
  - Per timestep: wetness rises with rain scaled by exposure (overhang, clearance, wind), falls with drying_rate scaled by wind and orientation.
  - Opened from any keyframe of the timeline ("zoom into a year").
```

### Phase 9 — app and deploy

```yaml
phase: 9
name: app
human_review: required
depends_on: [3, 5, 6, 7, 8]
writes:  [app/page.tsx, app/api/*, ui/chat/*, ui/panels/*, core/log-store.ts, model/types.ts, tests/app.test.ts]
interface:
  POST /api/chat   { session_id, message } -> streamed GenerateResult | EditResult | explanation
  POST /api/log    { session_id, event } -> { ok }
acceptance:
  - before the first section the chat fills the screen; after it, drawings take the centre and the chat docks right (layout B)
  - the first generation plays the assembly sequence, then shows the timeline at year 0
  - every generated version, edit and rating is written to the log store with session_id and model version
  - a session exceeding the rate limit receives 429 with a readable message
  - the rating control records 1–5 and an optional comment
  - the chat API is tested against fixtures/llm replays with networking disabled
  - npm run build passes
forbidden: [secrets in the repository, logging anything beyond the session's own prompts, models, edits and ratings]
notes:
  - Deployed on Vercel with Neon Postgres. Keys live only in Vercel environment variables and the developer's .env.local.
```

---

## 8. Fixtures

Written in the phase that first needs them; referenced by name afterwards. Do not rename.

| File | Contents |
|---|---|
| `fixtures/intents/pavilion.json` | Vancouver, rainy climate, somewhere to sit, growth on selected outer surfaces, individually replaceable components |
| `fixtures/intents/vague.json` | "A nice wall base." Must trigger clarification |
| `fixtures/intents/constrained.json` | Pavilion intent plus user constraint `overhang_mm >= 300` |
| `fixtures/models/pavilion-a.json` | Valid v2 model: overhang 600, clearance 200, rainscreen cavity, seat, receptive cladding, facing north |
| `fixtures/models/pavilion-b.json` | Same as a, overhang 0 |
| `fixtures/expected/storm-moderate.json` | `StormInput`: moderate rain, 6 h rain, 24 h drying, calm wind |
| `fixtures/expected/decades-*.json` | Driver sets used by phase 7 tests |
| `fixtures/llm/*.json` | Recorded LLM responses, keyed by request hash |

---

## 9. Status format and build log

Each phase appends exactly one block to `BUILD_LOG.md`:

```yaml
phase: 7
name: decades
status: pass            # pass | fail | escalate | review
attempts: 1
tests: 10/10
files_written: [core/decades-engine.ts, ...]
assumptions:
  - drainage silting rate is illustrative; no field data found
open_questions:
  - should a cleaned surface restart one stage lower or at "clean"?
```

A human appends `review: approved` or `review: changes_requested` with notes under the phase's block.

Resume rule for a new session: read `BUILD_LOG.md`, find the lowest-numbered phase not marked `pass` or `review: approved`, check its `depends_on`, and run section 6 for it.

---

## 10. Library strategy and runtime composition

```yaml
status: proposed            # a build agent must not act on this section until a human changes this to approved
amends: [section 2, section 3, phase 2, phase 3, phase 4, out of scope]   # see 10.10 for the exact contract changes
```

### 10.1 Principle

Research happens offline, once, and is reviewed. At runtime the tool only composes from approved library content. A user request never triggers web research.

Why: one researched and reviewed junction took hours of agent time and millions of tokens, and its sources needed human approval. Doing that per request would be slow and costly, give different results run to run, and show the user unreviewed claims. That defeats the credibility test the tool exists for.

### 10.2 Library layers

Each layer references only the layers above it. Code reads them only from `library/` (non-negotiable 12).

| Layer | Holds | File |
|---|---|---|
| Evidence | Sourced claims with verification level | `library/evidence.json` (exists) |
| Requirements | Code rules as `<path> <op> <value>` expressions | `library/requirements.json` (exists) |
| Materials | Properties, hatch, ageing behaviour, and optional carbon factor | `library/materials/*.json` |
| Assemblies | Layer stacks (wall, floor, roof, ground), each declaring the control layers it carries | `library/assemblies/*.json` |
| **Junction templates** | Fully resolved parametric details joining assemblies, plus site elements (bench, shrub pocket, rain garden) | `library/junctions/*.json` + generators in `core/junctions/*.ts` |

### 10.3 Junction template

A template is the unit the agent composes. It owns its geometry. The LLM never writes coordinates.

```ts
export type ControlLayer = "water_shedding" | "drainage_plane" | "air" | "vapour" | "thermal" | "capillary_break" | "soil_gas";

export interface Port {                 // where a template meets a neighbour (assembly or template)
  id: string;                           // e.g. "wall_above", "floor_inside", "ground_outside"
  accepts: string[];                    // assembly ids or tags allowed on the other side
  datum: { x_mm: number; y_mm: number };
  carries: Partial<Record<ControlLayer, { plane_x_mm?: number; plane_y_mm?: number; transfer: "lap" | "seal" | "tape" | "bond" | "abut" }>>;
}

export interface Param {
  name: string;                         // e.g. "paver_drop_mm", "overhang_mm"
  unit: "mm" | "deg" | "pct";
  default: number;
  min: number; max: number;             // bounds already include every requirement that applies
  free: boolean;                        // false = derived by the generator, never set by the LLM
  requirement_refs: string[];           // requirements that set min/max
}

export interface PartSpec {             // one physical part, as in the authoring spec (.sketch/rhino/detail01.mjs)
  id: string;
  material_id: string;
  role: ControlLayer | "structure" | "finish" | "ground" | "fastener" | "furniture" | "planting";
  build_step: number;
  replaceable: boolean;
  embeds?: string[];                    // parts it may legitimately overlap (bolt in concrete)
}

export interface JunctionTemplate {
  id: string;                           // "threshold.sliding.flush-pavers"
  version: string;                      // semver; a model pins id@version
  status: "draft" | "reviewed" | "approved";
  applies: { wall?: string[]; ground?: string[]; floor?: string[]; roof?: string[]; orientation_deg?: [number, number] };
  ports: Port[];
  params: Param[];
  parts: PartSpec[];
  generator: string;                    // core/junctions/<file>.ts, a pure function (params) -> part polygons and runs
  trace: Record<ControlLayer, string[]>;// the control-layer pen test as data: ordered part ids, continuous
  rationale: { part_id: string; why: string; evidence_refs: string[] }[];   // feeds the explainer and the sequence captions
  ageing: { part_id: string; mechanism: string; evidence_ref?: string; maintenance?: string }[];
  review: { laps: number; reviewers: string[]; approved_by?: string; approved_at?: string; files: string[] };
}
```

Rules:
- `trace` is checked by code. Every control layer must run continuously part to part, using `PartSpec` contacts and port transfers. The pen test becomes a test, not prose.
- Params with `free: false` are computed by the generator, e.g. drip nose = cladding face − 12. The LLM sees only free params, with their bounds.
- A template is used at runtime only when `status: approved`. Drafts are allowed only in draft mode (10.6).

### 10.4 Runtime workflow (agent logic)

Each step is one small typed decision. Code narrows the choices before the LLM sees them, and code checks every LLM output before the next step.

| # | Node | Kind | Input → output | Why this shape works for an agent |
|---|---|---|---|---|
| 1 | intent-parser | llm | text → `Slots` (closed vocabularies: wall, ground, floor, roof, orientation, uses, ambitions, user constraints) | Enums come from the library; the model can't invent a category |
| 2 | gap-check | code | `Slots` → clarify question or continue | Asks only for critical slots (section 7 phase 3 notes); everything else gets an editable default |
| 3 | candidates | code | `Slots` + library → ≤ 5 compositions per edge, filtered by `applies`, port compatibility and hard requirements | Removes impossible options before the LLM ranks |
| 4 | composer | llm | candidates → `CompositionPlan` (picks one composition, sets free params inside bounds, gives reason codes) | The output schema is generated per request with the candidate ids and param bounds as enums and ranges |
| 5 | instantiate | code | plan → parts with geometry, from each template's generator | Deterministic; same plan, same bytes (non-negotiable 9) |
| 6 | validate | code | geometry → `ValidationReport`: schema, requirements, clash / floating / contact, trace continuity, port matching | Every error is typed with a path and the allowed fixes |
| 7 | repair | llm | report → revised plan (≤ 2 rounds); after that, clarify or return a gap | Bounded loop, structured errors; no free-form retries |
| 8 | explainer | llm | model + used templates' `rationale` and evidence → `{ text, evidence_refs[] }[]` | A code check rejects any `evidence_ref` that isn't attached to a used template or material |

```ts
export interface CompositionPlan {
  edge: { template: string; version: string; params: Record<string, number>; reasons: string[] }[];   // ordered along the section
  site: { template: string; version: string; params: Record<string, number>; reasons: string[] }[];   // bench, shrub pocket, rain garden
  assumptions: Assumption[];
}

export interface ValidationIssue {
  code: "PORT_MISMATCH" | "TRACE_BREAK" | "CLASH" | "FLOATING" | "REQUIREMENT" | "PARAM_BOUNDS" | "SCHEMA";
  path: string;                         // e.g. "edge[1].ports.ground_outside.drainage_plane"
  detail: string;
  fixes: { action: "set_param" | "swap_template" | "ask_user"; target: string; value?: number | string }[];
}
```

### 10.5 Edits

A text or handle edit becomes a plan change: a param change or a template swap, applied through `core/patch.ts` and re-run from step 5. Handles are bound to free params, so dragging the overhang changes `overhang_mm` inside its bounds. A requirement can never be dragged past, because the bounds already contain it (non-negotiable 5).

### 10.6 Gaps: what the tool does when the library can't answer

- **Covered:** the plan uses only approved templates. Normal output.
- **Near miss:** a covered composition differs from the request on one slot (e.g. "brick" asked, "timber rainscreen" covered). The tool says so and offers the nearest covered option.
- **Gap:** nothing compatible. Return `{ kind: "gap", missing: string[], nearest: CompositionPlan | null }` and write a backlog entry (`library/backlog.json`: request text, missing slots, count).
- **Draft mode.** Defined below.

**Draft mode.** An opt-in way to answer a request the approved library can't cover, using templates that are researched and modelled but not human-approved. It never invents geometry or materials.
- **Entry.** Offered only after a `gap` or `near_miss` result, as a choice the tester must make ("show an unreviewed draft"). It is never the default and is never entered automatically. It lasts for that request and its edits only.
- **Content.** Templates with `status: draft` or `reviewed` may be used. Steps 3–7 of 10.4 run unchanged: same validators, same bounded repair. A draft that fails validation is not shown.
- **Tags.** Every value is tagged `illustrative`, whatever its source, and engines (decades, storm) tag all output `illustrative`. Embodied carbon is shown as a range, not a figure.
- **Visible.** Every 2D, 3D, sequence and timeline view carries an "Unreviewed draft" watermark. The explainer cites research drafts by file and section, labelled as not approved.
- **Logged.** Draft sessions and their ratings are logged with `draft: true`, so credibility ratings of drafts and approved output can be compared. That comparison is one of the user test's questions.
- **Availability.** On in the user test, offered only after a gap. Off in any public deployment until a human decides otherwise.

### 10.7 Offline authoring pipeline (how the library grows)

This is the process run for Details 01 and 02, made repeatable:

1. **Brief.** A backlog item or a scope-matrix cell becomes a research brief: the junction, its neighbours, the targets (look from outside, thermal, moisture, sustainability, people, ecology) and the region.
2. **Research.** Agents write `research/NN-*.md` with layer tables in construction order, control-layer pen tests, failure modes, 0/5/15/30 ageing, and every number tagged SOURCED or INFERRED.
3. **Author.** Write the template data and its generator. Build it in Rhino through the authoring pipeline (`.sketch/rhino`: spec → build → packet) for 3D QA, Make2D drawings and exterior renders.
4. **Automated checks:** clash, floating, contact, trace continuity, effective RSI per assembly, and embodied carbon per metre (shown to users at runtime, see 10.9).
5. **Review laps.** A panel of reviewer agents with fixed roles reviews each lap: above-grade envelope, ground and foundation, landscape and people, sustainability, exterior appearance. Each lap's version is kept side by side, and findings come back as typed items with fixes. Default 3 laps; 5 for high-stakes templates.
6. **Approve.** A human approves; the template gets `status: approved` and a `review` record, and its evidence entries go through `research/review.json` as today.
7. **Regress.** Run the eval set (10.8) for every prompt that touches the template.

### 10.8 Evals

`fixtures/evals/*.json`: one prompt per scope-matrix cell, plus near misses, gaps and vague prompts, each with the expected template ids and param ranges. Run with replayed LLM recordings and networking disabled. Tracked per library version:
- selection accuracy
- validator pass rate on the first try
- mean repair rounds
- gap and near-miss correctness
- explainer citation validity

### 10.9 Embodied carbon (runtime)

Decided by the human: v1 shows embodied carbon.
- **Computed by code** (`core/carbon.ts`), never by an LLM (non-negotiable 3). It runs after `instantiate` and after every edit.
- **Quantities** come from the instantiated parts: cross-section area × run length, or count × volume for discrete parts. **Factors** come from each part's material, A1–A3 fossil kgCO2e per kg, with stored biogenic carbon reported separately and never netted.
- **Output:** a total per metre of edge, a breakdown by element (wall, floor, ground, roof edge, site) and by material, and the change after each edit.
- **Confidence:**
  - `calculated` only when the material's factor carries an `evidence_ref` to a product or industry EPD read in full (`verification: full`);
  - `qualitative` when the factor comes from a database or guide (CLF, ICE);
  - `illustrative` in draft mode, shown as a range.
- **Scope:** A1–A3 only in v1. Maintenance (B2) and end of life (C, D) come later, through the decades engine.

### 10.10 Contract changes (applied when this section is approved)

- **Section 3:** `DetailModel` gains `composition: CompositionPlan`. `geometry.section` becomes the output of `instantiate`, keyed by part id. `assembly.layers` is derived from template parts. Phase 1 has passed, so this needs a schema v3 phase.
- **Phase 2:** adds `library/junctions/*.json`, `core/junctions/*.ts` and `library/backlog.json`. Acceptance adds: every approved template's trace is continuous, and its ports match its `applies` assemblies.
- **Phase 3:** `section-generator` (llm) is replaced by `candidates` (code), `composer` (llm), `instantiate` (code) and `repair` (llm, bounded). Acceptance adds the eval set and the gap result.
- **Phase 4:** `core/geometry.ts` consumes instantiated parts, and hatches come from each part's material.
- **New phase (after 4):** `core/carbon.ts` and its panel (10.9). Materials gain `carbon: { a1a3_per_kg, biogenic_per_kg, density, evidence_ref }`.
- **Section 2:** non-negotiable 3 adds embodied carbon to the list of code-only results.
- **Out of scope:** "embodied carbon" is removed.

### 10.11 Release scope matrix (draft — edit the "v1?" column)

Vancouver only. Edge = wall above × ground outside × floor inside × roof edge. Site elements attach to the ground.

**Assemblies**

| Id | Assembly | Source | v1? |
|---|---|---|---|
| W1 | Timber rainscreen: 2×6 + dense-pack cellulose, wood-fibre or stone-wool EI, 19 mm cavity, cedar channel siding | 09, user decision | yes |
| W2 | Stucco rainscreen (Part 9), 50 mm stone wool, 19 mm cavity | 06, 07, Detail 01 | later |
| W3 | Large sliding / folding glazed wall | 11 (in progress), Detail 02 | yes |
| W4 | Fixed glazed window wall | 11 (shares the sliding-threshold research) | yes |
| G1 | Gravel strip + planted soil, 5 % fall | 07 F, 08 I | yes |
| G2 | Permeable pavers, near-flush accessible at a threshold, lined near the building | 08, 08b (in progress) | yes |
| G3 | Permeable pavers stepped down from a solid wall (plinth ≥ 200 mm clear) | 08 H | yes |
| F1 | Low-carbon slab on insulation, stem wall | 07 D, 09 | yes |
| F2 | Best alternative floor (hemp / lime / FGA, or as research decides) | 12 (in progress) | yes |
| F3 | Raised timber floor on screw piles | 09, 12 | later |
| R1 | Exterior-insulated low-slope roof, 500–600 mm eave | 06 B, 09 | yes |
| R2 | Same with extensive biodiverse green roof | 09 | yes |

**Junction and site templates**

| Template | Joins | Research | Modelled | Review laps | v1? |
|---|---|---|---|---|---|
| base.rainscreen-timber.gravel | W1 × G1 × F1/F2 | 06 A, 07, 09, 10 | — | — | yes |
| base.rainscreen-stucco.gravel | W2 × G1 × F1 | 06 A, 07 | Detail 01 v2 | 2 | later |
| base.rainscreen-timber.pavers-step | W1 × G3 × F1/F2 | 08 H | — | — | yes |
| threshold.sliding.flush-pavers | W3 × G2 × F1/F2 | 11, 12, 08b | — | — | yes |
| sill.fixed-glazing.pavers-step | W4 × G3 × F1/F2 | 11 | — | — | yes |
| slab-edge.stem-exterior-insulated | F1 × foundation | 07 D, E | Detail 01 v2 | 2 | yes |
| slab-edge.alt-floor | F2 × foundation | 12 | — | — | yes |
| footing.drain | foundation × drain envelope | 07 E | Detail 01 v2 | 2 | yes |
| eave.exterior-insulated | W1/W2/W3 × R1 | 06 B | Detail 01 v2 | 2 | yes |
| eave.green-roof | W1/W3 × R2 | 09 | — | — | yes |
| head.sliding-wall | W3 × R1/R2 | 11 | — | — | yes |
| site.bench-piers | G1/G3 | 06 C, 08 K | Detail 01 v2 | 2 | yes |
| site.shrub-pocket-pavers | G2/G3 | 08b | — | — | yes |
| site.planting-bed-tree | G1 | 08 I | — | — | yes |
| site.rain-garden-5m | any (downspout conveyance + garden ≥ 5 m) | 08 J | — | — | yes |

**Compatibility rules** (coded as `applies` and requirements, listed here for review):
- A moisture-sensitive cladding (W1, W2) never meets G2 directly. Paving at the wall needs a plinth with at least 200 mm clear to the cladding, which is G3.
- G2 is allowed only at a threshold of W3 (or W4) with a channel drain and a lined zone.
- Infiltration (rain garden, unlined pavers) starts ≥ 5 m from the building.
- Woody planting stays outside the drain-rock envelope.

**Decisions:**
- Embodied carbon is shown in v1: yes (human, 2026-10-13), see 10.9.
- W4 and `sill.fixed-glazing.pavers-step` ship in v1; W2 and `base.rainscreen-stucco.gravel` come later (human, 2026-10-13).
- Draft mode (10.6) is on in the user test, offered only after a gap (human, 2026-10-13).

---

## Out of scope for this build

Hygrothermal simulation (WUFI-style physics), embodied carbon (pending: section 10.9 brings it in scope once section 10 is approved), construction scheduling beyond build order, species-level ecology, detail families other than the ground–façade edge, regions other than Vancouver (the library structure supports adding them), user accounts, multi-user editing. Do not add scaffolding for these.
