import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { checkConstraints, checkSupported, validate } from "../core/validator";
import type { DecadesRun, DetailModel, LayerState } from "../model/schema";
import type { Library } from "../model/types";

const fixture = (name: string): any =>
  JSON.parse(readFileSync(new URL(`../fixtures/models/${name}.json`, import.meta.url), "utf8"));

// Test library holding exactly the ids the fixtures use.
const libraryFor = (m: DetailModel): Library => ({
  assemblies: [],
  materials: [...new Set(m.assembly.layers.map((l) => l.library_id))].map((id) => ({ id })),
});

const q = <T>(value: T) => ({ value, confidence: "qualitative" as const, evidence_ref: "ev.test" });
const state: LayerState = {
  moisture_regime: q("intermittent"),
  growth_stage: q("biofilm"),
  wear: q("low"),
  condition: q("sound"),
};
const decades = (years: number[]): DecadesRun => ({
  id: "run-1",
  kind: "decades",
  drivers: { orientation_deg: 0, use_intensity: "daily", maintenance: "none" },
  model_version: 1,
  keyframes: years.map((year) => ({
    year: year as 0 | 5 | 15 | 30,
    layers: { "L-clad": state },
    ground: { drainage_silt: q("low"), root_reach: q("none"), soil_splash: q("moderate") },
  })),
  summary: "",
});

describe("phase 1: schema v2 and validator", () => {
  it("fixtures/models/pavilion-a.json validates ok (overhang 600, clearance 200, seat, receptive cladding, rainscreen cavity)", () => {
    const raw = fixture("pavilion-a");
    const r = validate(raw);
    expect(r.ok ? [] : r.errors).toEqual([]);
    const m = raw as DetailModel;
    expect(m.geometry.overhang_mm.value).toBe(600);
    expect(m.geometry.ground_clearance_mm.value).toBe(200);
    expect(m.assembly.layers.map((l) => l.role)).toEqual(expect.arrayContaining(["seat", "cladding", "cavity"]));
    const clad = m.assembly.layers.find((l) => l.role === "cladding")!;
    expect(m.materials.find((x) => x.used_in.includes(clad.id))!.properties.receptive_to_growth.value).toBe(true);
  });

  it("fixtures/models/pavilion-b.json (same as a, overhang 0) validates ok", () => {
    const raw = fixture("pavilion-b");
    expect(raw.geometry.overhang_mm.value).toBe(0);
    const r = validate(raw);
    expect(r.ok ? [] : r.errors).toEqual([]);
  });

  it('a model missing a confidence tag on geometry.overhang_mm fails with error path "geometry.overhang_mm.confidence"', () => {
    const raw = fixture("pavilion-a");
    delete raw.geometry.overhang_mm.confidence;
    const r = validate(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.map((e) => e.path)).toContain("geometry.overhang_mm.confidence");
  });

  it("a material property tagged qualitative with no evidence_ref fails validation", () => {
    const raw = fixture("pavilion-a");
    raw.materials[0].properties.absorption = { value: "high", confidence: "qualitative" };
    const r = validate(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.map((e) => e.path)).toContain("materials.0.properties.absorption.evidence_ref");
  });

  it("a DecadesRun containing any calculated tag fails validation", () => {
    const raw = fixture("pavilion-a");
    const run = decades([0, 5, 15, 30]);
    raw.runs = [run];
    expect(validate(raw).ok).toBe(true);
    run.keyframes[2]!.layers["L-clad"] = { ...state, growth_stage: { value: "moss", confidence: "calculated", evidence_ref: "ev.test" } };
    const r = validate(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.map((e) => e.path).join("\n")).toContain("runs.0.keyframes.2.layers.L-clad.growth_stage.confidence");
  });

  it("a DecadesRun without exactly the keyframes 0, 5, 15, 30 fails validation", () => {
    for (const years of [[0, 5, 15], [0, 5, 15, 30, 30], [0, 15, 5, 30]]) {
      const raw = fixture("pavilion-a");
      raw.runs = [decades(years)];
      expect(validate(raw).ok).toBe(false);
    }
  });

  it("a model whose layer references an unknown library_id fails checkSupported", () => {
    const m = fixture("pavilion-a") as DetailModel;
    const lib = libraryFor(m);
    expect(checkSupported(m, lib).ok).toBe(true);
    m.assembly.layers[2]!.library_id = "mat.does-not-exist";
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

  it('a model with ground_clearance_mm 150 and a library constraint "ground_clearance_mm >= 200" fails checkConstraints and the violated constraint carries its evidence_ref', () => {
    const m = fixture("pavilion-a") as DetailModel;
    const lib = m.constraints.find((c) => c.origin === "library" && c.expression === "geometry.ground_clearance_mm >= 200");
    expect(lib).toBeDefined();
    expect(checkConstraints(m).ok).toBe(true);
    m.geometry.ground_clearance_mm.value = 150;
    const r = checkConstraints(m);
    expect(r.ok).toBe(false);
    expect(r.violated).toHaveLength(1);
    expect(r.violated[0]!.evidence_ref).toBe(lib!.evidence_ref);
    expect(r.violated[0]!.evidence_ref).toMatch(/^req\./);
  });
});
