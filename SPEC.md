# The Living Edge — Build Specification

This file is the single source of truth for building the prototype. A fresh agent session with no prior context should be able to read this file and `BUILD_LOG.md`, find the next unfinished phase, and build it.

Read sections 1–5 once. Read section 6 for the current phase only.

---

## 1. Purpose

The Living Edge is an AI-assisted spatial design tool. A user describes a building edge in plain language, receives an editable conceptual architectural section, and explores how that section responds to rain, drying, and a human intervention.

Initial audience: architecture students, educators, designers.

First detail family: the ground–façade edge (soil, wall base, exterior surface, assembly layers, drainage, overhang, one seat or maintenance action).

**The demonstrable outcome this build targets:**
A user describes a pavilion edge with seating and a receptive outer surface. The tool generates an editable section with explicit assumptions. The user changes overhang or ground clearance, runs the same rain-and-drying scenario on both versions, and inspects the difference. A water-redirection intervention gives a third comparison.

When a contract below is silent, resolve ambiguity in favour of this outcome.

---

## 2. Non-negotiables

These apply to every phase. A phase that violates one does not pass, even if its tests are green.

1. Every value in the Detail Model that describes a physical or environmental quantity carries a `confidence` tag: `calculated`, `qualitative`, or `illustrative`.
2. Every material property carries an `evidence_ref` pointing at an entry in `library/evidence.json`, or is tagged `illustrative`.
3. LLM nodes interpret, compose, and explain. They never compute scenario results, moisture values, or ecological favourability.
4. Code nodes never invent materials or assemblies. Generation and edits may only use components present in `library/`.
5. A constraint the user stated (`constraints[].origin == "user"`) is never silently altered. An edit that would violate one is rejected with a reason.
6. Immediate weather events and long-term scenarios are distinct `ScenarioInput.kind` values and are rendered with different default confidence tags.
7. Animation frames are derived from scenario output, never generated independently.
8. All LLM calls use structured output against a schema from `model/`. Temperature 0.
9. Two runs of any code node on identical input produce byte-identical output.

---

## 3. Detail Model schema

`model/schema.ts`. Every field has a comment stating which node writes it. Nodes may read any field; they write only their own.

```ts
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
  expression: string;             // machine-checkable, evaluated by validator
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
  water_path: "sheds" | "holds" | "admits";   // written by generator from library data
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
  // Section outline in mm, origin at exterior ground line. Written by generator, edited by canvas.
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
  growth_favourability: Record<string, Tagged<"low" | "moderate" | "high">>;  // layer id
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

  // Written by intent-parser (user) and library-lookup (library); never edited by generator
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
```

---

## 4. Repository layout

Fixed. Do not add top-level directories.

```
model/            schema.ts, validate helpers (zod or equivalent)
core/             validator.ts, scenario-engine.ts, version-store.ts
library/          assemblies/*.json  materials/*.json  evidence.json
nodes/            one file per node: intent-parser.ts, gap-check.ts, ...
workflows/        generate.ts, edit.ts, scenario.ts, compare.ts
ui/               section-canvas/, explain-panel/, compare-view/
fixtures/         intents/, models/, expected/
tests/            one file per module, mirrors the tree above
BUILD_LOG.md      append-only
SPEC.md           this file
```

Language: TypeScript. Runtime: Node 20+. Tests: vitest. UI: a single web page with an SVG canvas; no framework decision until phase 4.

Node interface, shared by every file in `nodes/`:

```ts
export interface Node<I, O> {
  name: string;
  kind: "llm" | "code" | "human" | "render";
  run(input: I, ctx: RunContext): Promise<O>;
}
```

Every workflow is a plain ordered list of nodes with typed hand-offs. No workflow library.

---

## 5. How to run a phase

Run this procedure for each phase in section 6, in order. Do not start a phase whose `depends_on` phases are not marked `pass` in `BUILD_LOG.md`.

1. **Read the contract.** Load this section and the phase block only. Do not read other phase blocks.
2. **Write the tests first.** One test per `acceptance` line, in the matching file under `tests/`. Use fixtures named in the contract.
3. **Stub the interface.** Create each file in `writes` with the exact signature from `interface`. Bodies throw `new Error("NotImplemented")`.
4. **Check red.** Run the phase's tests. Every test must fail with `NotImplemented`, not with a type error or missing import. Fix the stub until this is true.
5. **Implement until green.** Run the phase's tests after each meaningful change.
6. **Run the full suite.** All tests from all completed phases must pass.
7. **Emit status.** Append the status block (section 8) to `BUILD_LOG.md` and commit with message `phase N: <name>`.

Loop rules:
- If step 6 fails, fix and retry. After 3 failed attempts, set `status: escalate` and stop.
- Never edit a file outside the current phase's `writes` list. If a change elsewhere is needed, record it under `open_questions` in the status block and stop with `status: escalate`.
- Phases marked `human_review: required` end with `status: review` even when tests pass. Do not start the next phase until a human appends `review: approved` to the log.
- Anything you chose that the contract did not specify goes in `assumptions` in the status block.

---

## 6. Phase contracts

### Phase 1 — schema and validator

```yaml
phase: 1
name: schema-validator
human_review: required
depends_on: []
reads:   [SPEC.md §3]
writes:  [model/schema.ts, model/validate.ts, core/validator.ts, fixtures/models/*.json, tests/validator.test.ts]
interface:
  validate(model: unknown): { ok: true; model: DetailModel } | { ok: false; errors: ValidationError[] }
  checkConstraints(model: DetailModel): { ok: boolean; violated: Constraint[] }
  checkSupported(model: DetailModel, library: Library): { ok: boolean; unsupported: string[] }
acceptance:
  - fixtures/models/pavilion-a.json validates ok
  - fixtures/models/pavilion-b.json (overhang 0) validates ok
  - a model missing a confidence tag on geometry.overhang_mm fails with a path-specific error
  - a model whose layer references an unknown library_id fails checkSupported
  - a model with overhang_mm 200 and a user constraint "overhang_mm >= 300" fails checkConstraints and names the constraint
forbidden: [any LLM call, any UI code]
```

### Phase 2 — library

```yaml
phase: 2
name: library
human_review: required
depends_on: [1]
reads:   [model/schema.ts]
writes:  [library/assemblies/*.json, library/materials/*.json, library/evidence.json, core/library.ts, tests/library.test.ts]
interface:
  loadLibrary(): Library
  lookupAssemblies(intent: ParsedIntent, lib: Library): RankedMatch[]
  lookupMaterials(role: Layer["role"], receptive: boolean, lib: Library): MaterialRef[]
acceptance:
  - library contains at least 6 assemblies and 10 materials; every material property has an evidence_ref or is tagged illustrative
  - every evidence_ref resolves to an entry in evidence.json with source, applicable_limits, and confidence fields
  - lookupAssemblies for fixtures/intents/pavilion.json ranks an assembly with role "seat" and a receptive cladding in the top 2
  - lookupMaterials(role "cladding", receptive true) returns only materials with receptive_to_growth true
forbidden: [any LLM call, inventing numeric properties without an evidence entry]
notes:
  - Evidence entries may cite general construction references; the applicable_limits field must state what the value does not cover.
  - Content choices (which assemblies, which materials) are reviewed by a human before phase 3.
```

### Phase 3 — generate workflow

```yaml
phase: 3
name: generate
human_review: optional
depends_on: [1, 2]
reads:   [model/, core/validator.ts, core/library.ts, fixtures/intents/*.json]
writes:  [nodes/intent-parser.ts, nodes/gap-check.ts, nodes/assumption-filler.ts, nodes/library-lookup.ts, nodes/section-generator.ts, nodes/explainer.ts, workflows/generate.ts, tests/generate.test.ts]
interface:
  generate(input: { text: string; location?: string; constraints?: string[] }, ctx: RunContext): Promise<GenerateResult>
  GenerateResult = { kind: "clarify"; question: string } | { kind: "model"; model: DetailModel }
acceptance:
  - generate(fixtures/intents/pavilion.json) returns kind "model" and the model passes validate, checkConstraints, checkSupported
  - the returned model has a seat, a cladding layer with receptive_to_growth true, and at least one replaceable layer
  - every layer and material in the returned model exists in the library
  - generate(fixtures/intents/vague.json) returns kind "clarify" with a question about a field listed as critical in nodes/gap-check.ts
  - a user constraint passed in input appears in model.constraints with origin "user" and must_preserve true
  - running generate twice on the same input yields models that differ only in id and created_at
forbidden: [computing wetness or growth values, writing to scenario_runs]
notes:
  - LLM nodes use structured output with JSON schemas derived from model/schema.ts.
  - Critical fields for gap-check: rain_exposure, whether sitting is wanted, ecological ambition. Everything else gets an editable assumption.
  - The section-generator prompt lists only the library components returned by library-lookup. It may not reference anything else.
```

### Phase 4 — section canvas

```yaml
phase: 4
name: section-canvas
human_review: required
depends_on: [1]
reads:   [model/schema.ts, fixtures/models/*.json]
writes:  [ui/section-canvas/*, ui/explain-panel/*, tests/canvas.test.ts]
interface:
  renderSection(model: DetailModel, opts: RenderOptions): SVGElement | string
  applyCanvasEdit(model: DetailModel, edit: CanvasEdit): DetailModel   // pure; returns new model, does not validate
  CanvasEdit = { kind: "move_vertex" | "set_overhang" | "set_clearance" | "select_layer"; ... }
acceptance:
  - renderSection(pavilion-a) twice produces identical SVG strings
  - every layer in the model appears as an element with data-layer-id in the output
  - applyCanvasEdit set_overhang 600 on pavilion-b returns a model whose geometry.overhang_mm.value is 600 and whose section polygons for the overhang layer changed
  - applyCanvasEdit never changes model.constraints
  - the explain panel renders explanation.strategy, every assumption with its source, and every open question
forbidden: [any LLM call, scenario logic]
notes:
  - Section is drawn in mm with a 1:20 default scale, exterior on the left, ground line at y = 0.
  - Layers are coloured by role; confidence is shown by line style (solid calculated, dashed qualitative, dotted illustrative). Reviewed by a human.
```

### Phase 5 — scenario engine

```yaml
phase: 5
name: scenario-engine
human_review: optional
depends_on: [1, 4]
reads:   [model/schema.ts, core/library.ts, fixtures/models/*.json, fixtures/expected/*.json]
writes:  [core/scenario-engine.ts, nodes/scenario-select.ts, nodes/frame-builder.ts, workflows/scenario.ts, tests/scenario.test.ts]
interface:
  runScenario(model: DetailModel, scenario: ScenarioInput): ScenarioRun
acceptance:
  - runScenario is deterministic: two calls with the same input are deep-equal
  - every wetness value and every growth_favourability value carries a confidence tag
  - for scenario fixtures/expected/rain-moderate.json, pavilion-b (overhang 0) has higher final-frame wetness on the cladding layer than pavilion-a (overhang 600)
  - a joint with water_path "sheds" never increases wetness of the layer it sheds to; "admits" does
  - growth_favourability is "high" only where wetness stays above 0.6 for more than half the frames and the material is receptive
  - scenario kind "long_term" produces frames tagged qualitative; kind "event" may produce calculated tags for wetness
forbidden: [any LLM call, species names, dates, growth rates]
notes:
  - Rules, not physics. Per-timestep: wetness rises with rain intensity scaled by exposure (overhang, clearance), falls with drying_rate scaled by wind.
  - Each rule is a named function with a one-line comment stating the evidence_ref or that it is illustrative.
```

### Phase 6 — edit and compare

```yaml
phase: 6
name: edit-compare
human_review: optional
depends_on: [3, 5]
reads:   [workflows/, core/, ui/section-canvas/]
writes:  [nodes/patch-builder.ts, workflows/edit.ts, workflows/compare.ts, core/version-store.ts, ui/compare-view/*, tests/edit.test.ts, tests/compare.test.ts]
interface:
  edit(model: DetailModel, request: { text: string } | { canvas: CanvasEdit }, ctx): Promise<EditResult>
  EditResult = { kind: "ok"; model: DetailModel; diff: Diff } | { kind: "rejected"; reason: string; violated: Constraint[] }
  compare(a: DetailModel, b: DetailModel, scenario: ScenarioInput): CompareResult
acceptance:
  - edit(pavilion-a, text "make the overhang 600mm") returns ok with geometry.overhang_mm.value 600
  - edit(pavilion-a with user constraint "overhang_mm >= 300", text "remove the overhang") returns rejected naming that constraint
  - edit with a canvas set_clearance edit produces the same model as the equivalent text edit
  - every ok edit saves a new version with parent_version set; version-store can return the chain
  - compare(a, b, scenario) runs the identical scenario on both and the diff lists per-layer wetness deltas
forbidden: [altering constraints with origin "user", running scenarios inside edit]
```

### Phase 7 — intervention

```yaml
phase: 7
name: intervention
human_review: optional
depends_on: [6]
reads:   [workflows/, core/scenario-engine.ts]
writes:  [nodes/intervention.ts, workflows/intervene.ts, tests/intervene.test.ts]
interface:
  intervene(model: DetailModel, action: { kind: "redirect_water"; from_layer: string; to: "ground" | "drain" }): DetailModel
acceptance:
  - intervene adds a joint with kind "drip" and water_path "sheds" from from_layer
  - the returned model validates and preserves all user constraints
  - compare(before, after, rain-moderate) shows lower final wetness on from_layer and on layers it previously admitted water to
  - the intervention is recorded in human_use.maintenance_actions
forbidden: [any LLM call]
```

---

## 7. Fixtures

Written in phases 1–2; referenced by name afterwards. Do not rename.

| File | Contents |
|---|---|
| `fixtures/intents/pavilion.json` | The brief's example: rainy climate, somewhere to sit, growth on selected outer surfaces, individually replaceable components |
| `fixtures/intents/vague.json` | "A nice wall base." Must trigger clarification |
| `fixtures/intents/constrained.json` | Pavilion intent plus user constraint `overhang_mm >= 300` |
| `fixtures/models/pavilion-a.json` | Valid model, overhang 600, clearance 150, seat, receptive cladding |
| `fixtures/models/pavilion-b.json` | Same as a, overhang 0 |
| `fixtures/expected/rain-moderate.json` | `ScenarioInput` kind event, moderate, 6 h rain, 24 h drying, calm wind |

---

## 8. Status format and build log

Each phase appends exactly one block to `BUILD_LOG.md`:

```yaml
phase: 5
name: scenario-engine
status: pass            # pass | fail | escalate | review
attempts: 1
tests: 6/6
files_written: [core/scenario-engine.ts, ...]
assumptions:
  - drying is linear per layer per hour; no evidence_ref, tagged illustrative
open_questions:
  - should strong wind reduce wetting of sheltered layers as well as speed drying?
```

A human appends `review: approved` or `review: changes_requested` with notes under a `review` phase block.

Resume rule for a new session: read `BUILD_LOG.md` from the end, find the last block with `status: pass` (or `review: approved`), and run section 5 for the next phase number.

---

## Out of scope for this build

Thermal analysis, embodied carbon, construction sequencing, other detail families, species-level ecology, multi-user editing. Do not add scaffolding for these.
