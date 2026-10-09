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
