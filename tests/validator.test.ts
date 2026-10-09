import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { checkConstraints, checkSupported, validate } from "../core/validator";
import type { DetailModel, Library } from "../model/schema";

const fixture = (name: string): any =>
  JSON.parse(readFileSync(new URL(`../fixtures/models/${name}.json`, import.meta.url), "utf8"));

// Test library holding exactly the ids the fixtures use.
const libraryFor = (m: DetailModel): Library => ({
  assemblies: [],
  materials: [...new Set(m.assembly.layers.map((l) => l.library_id))].map((id) => ({ id })),
});

describe("phase 1: schema-validator", () => {
  it("fixtures/models/pavilion-a.json validates ok", () => {
    const r = validate(fixture("pavilion-a"));
    expect(r.ok ? [] : r.errors).toEqual([]);
  });

  it("fixtures/models/pavilion-b.json (overhang 0) validates ok", () => {
    const raw = fixture("pavilion-b");
    expect(raw.geometry.overhang_mm.value).toBe(0);
    const r = validate(raw);
    expect(r.ok ? [] : r.errors).toEqual([]);
  });

  it("a model missing a confidence tag on geometry.overhang_mm fails with a path-specific error", () => {
    const raw = fixture("pavilion-a");
    delete raw.geometry.overhang_mm.confidence;
    const r = validate(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.map((e) => e.path)).toContain("geometry.overhang_mm.confidence");
  });

  it("a model whose layer references an unknown library_id fails checkSupported", () => {
    const m = fixture("pavilion-a") as DetailModel;
    const lib = libraryFor(m);
    expect(checkSupported(m, lib).ok).toBe(true);
    m.assembly.layers[2].library_id = "mat.does-not-exist";
    const r = checkSupported(m, lib);
    expect(r.ok).toBe(false);
    expect(r.unsupported.join("\n")).toContain("mat.does-not-exist");
  });

  it('a model with overhang_mm 200 and a user constraint "overhang_mm >= 300" fails checkConstraints and names the constraint', () => {
    const m = fixture("pavilion-a") as DetailModel;
    const userRule = { rule: "overhang_mm >= 300", expression: "overhang_mm >= 300", origin: "user", must_preserve: true } as const;
    m.constraints.push(userRule);
    expect(checkConstraints(m).ok).toBe(true);
    m.geometry.overhang_mm.value = 200;
    const r = checkConstraints(m);
    expect(r.ok).toBe(false);
    expect(r.violated).toEqual([userRule]);
  });
});
