# Build log

Append-only. One status block per phase (SPEC.md §8).

```yaml
phase: 1
name: schema-validator
status: review
attempts: 1
tests: 5/5
files_written: [model/schema.ts, model/validate.ts, core/validator.ts, fixtures/models/pavilion-a.json, fixtures/models/pavilion-b.json, tests/validator.test.ts]
assumptions:
  - repo scaffolding (package.json, tsconfig.json, .gitignore, .gitattributes, BUILD_LOG.md) committed before phase 1; deps zod 3, vitest, typescript
  - Library type defined in model/schema.ts as { assemblies: {id}[]; materials: {id}[] } since checkSupported needs it before phase 2; core/library.ts may extend entries
  - ValidationError = { path: dot path, message }
  - constraint expression grammar is "<path> <op> <number>", ops >= <= > < == !=; path resolves against the model, then against model.geometry; Tagged values unwrap to .value
  - checkConstraints fails closed: unparseable expression or non-numeric path counts as violated; validate also rejects unparseable expressions
  - validate enforces non-negotiable 2 structurally: a material property without evidence_ref must be tagged illustrative
  - validate rejects unknown keys (strict objects), duplicate layer ids, and references to missing layer ids (joints, used_in, section, seat)
  - checkSupported checks both assembly.layers[].library_id and materials[].library_id
  - section coordinates: x increases inward, exterior face of cladding at x = -25, wall-base face at x = 0
  - Assumption.value restricted to JSON values
open_questions:
  - phase 2 must provide library ids used by fixtures: mat.larch-board, mat.oak-seat, mat.lime-render, mat.bitumen-dpc, mat.concrete-plinth, mat.gravel-drainage, mat.topsoil
  - phase 2 must provide evidence keys used by fixtures: ev.larch-board, ev.oak-seat, ev.lime-render, ev.bitumen-dpc, ev.concrete-plinth, ev.gravel-drainage, ev.topsoil
  - layer order for non-wall layers (overhang, seat, ground) is not defined by "outside = 0, increasing inward"; fixtures use overhang 0, seat 1, cladding 2 ... ground 6
```

Note: SPEC.md was rewritten (spec v2, commit 10c2f2c). The phase 1 block above was built against the old rain-only schema and is superseded by the block below; do not approve it.

```yaml
phase: 1
name: schema-validator
status: review
attempts: 1
tests: 9/9
files_written: [model/schema.ts, model/types.ts, model/validate.ts, core/validator.ts, fixtures/models/pavilion-a.json, fixtures/models/pavilion-b.json, tests/validator.test.ts]
assumptions:
  - rework of an implemented phase, so step 3 (stubs) was skipped; red was checked by running the new tests against the old fixtures (4 failed), then green after the v2 fixtures
  - model/schema.ts is copied verbatim from SPEC.md §3; Library and ValidationError moved to model/types.ts
  - DecadesRun keyframes must be exactly [0, 5, 15, 30] in that order; StormRun.at_year is one of those years
  - validate also checks that run keyframe and storm wetness keys name existing layers
  - fixtures model a Vancouver rainscreen edge: plinth, DPC, timber frame, 19 mm drained cavity, base flashing, lime render, larch overhang, oak seat, gravel strip, topsoil; facing north; clearance 200
  - fixture build order: plinth 1, gravel strip 2, DPC 3, frame 4, base flashing 5, cavity 6, render 7, overhang 8, seat 9, topsoil 10 (to be checked against research/03 construction sequence in phase 2)
  - fixture material properties without a matching research entry are tagged illustrative
open_questions:
  - phase 2 must provide library ids used by fixtures, including mat.rainscreen-cavity-19, mat.metal-base-flashing and mat.douglas-fir-frame
  - fixture evidence refs point at research entries (ev.lime-render.*, ev.concrete.*, ev.gravel.*, ev.topsoil.*, ev.larch.*, ev.oak.*, ev.douglas-fir.*, ev.dpc*, req.cladding-clearance-to-grade); any the reviewer rejects must be swapped for illustrative tags before phase 2 can pass
  - research/01 notes lime render is not a listed cladding under Part 9, so a real lime-render rainscreen goes to Part 5 (professional design); keep it as the receptive example or switch to a listed cladding?
```
