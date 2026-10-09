import type { Constraint, DetailModel, Library, ValidationError } from "../model/schema";
import { DetailModelSchema } from "../model/validate";

export function validate(model: unknown): { ok: true; model: DetailModel } | { ok: false; errors: ValidationError[] } {
  const parsed = DetailModelSchema.safeParse(model);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) };
  }
  const errors = referenceErrors(parsed.data);
  return errors.length ? { ok: false, errors } : { ok: true, model: parsed.data };
}

// Every layer id a model mentions must name a layer; every constraint expression must parse.
function referenceErrors(m: DetailModel): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<string>();
  m.assembly.layers.forEach((l, i) => {
    if (ids.has(l.id)) errors.push({ path: `assembly.layers.${i}.id`, message: `duplicate layer id '${l.id}'` });
    ids.add(l.id);
  });
  const ref = (path: string, id: string) => {
    if (!ids.has(id)) errors.push({ path, message: `unknown layer id '${id}'` });
  };
  m.assembly.joints.forEach((j, i) => j.between.forEach((id, k) => ref(`assembly.joints.${i}.between.${k}`, id)));
  m.materials.forEach((mat, i) => mat.used_in.forEach((id, k) => ref(`materials.${i}.used_in.${k}`, id)));
  m.geometry.section.forEach((s, i) => ref(`geometry.section.${i}.layer_id`, s.layer_id));
  if (m.geometry.seat) ref("geometry.seat.layer_id", m.geometry.seat.layer_id);
  m.constraints.forEach((c, i) => {
    if (!parseExpression(c.expression)) {
      errors.push({ path: `constraints.${i}.expression`, message: `unparseable expression '${c.expression}'` });
    }
  });
  return errors;
}

// Grammar: <path> <op> <number>. Path resolves against the model, then against model.geometry
// (so "overhang_mm" means geometry.overhang_mm). Tagged values are unwrapped to .value.
const OPS = {
  ">=": (a: number, b: number) => a >= b,
  "<=": (a: number, b: number) => a <= b,
  ">": (a: number, b: number) => a > b,
  "<": (a: number, b: number) => a < b,
  "==": (a: number, b: number) => a === b,
  "!=": (a: number, b: number) => a !== b,
};
type Op = keyof typeof OPS;

function parseExpression(expr: string): { path: string; op: Op; rhs: number } | undefined {
  const m = /^\s*([A-Za-z_][\w.]*)\s*(>=|<=|==|!=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/.exec(expr);
  return m ? { path: m[1], op: m[2] as Op, rhs: Number(m[3]) } : undefined;
}

function resolve(root: unknown, path: string): unknown {
  let v: any = root;
  for (const key of path.split(".")) v = v?.[key];
  return v !== null && typeof v === "object" && "value" in v ? v.value : v;
}

// Fails closed: an unparseable expression or an unresolvable / non-numeric path counts as violated.
function holds(model: DetailModel, expr: string): boolean {
  const p = parseExpression(expr);
  if (!p) return false;
  const lhs = resolve(model, p.path) ?? resolve(model.geometry, p.path);
  return typeof lhs === "number" && OPS[p.op](lhs, p.rhs);
}

export function checkConstraints(model: DetailModel): { ok: boolean; violated: Constraint[] } {
  const violated = model.constraints.filter((c) => !holds(model, c.expression));
  return { ok: violated.length === 0, violated };
}

export function checkSupported(model: DetailModel, library: Library): { ok: boolean; unsupported: string[] } {
  const known = new Set([...library.assemblies, ...library.materials].map((e) => e.id));
  const unsupported = [
    ...model.assembly.layers.map((l, i) => [`assembly.layers.${i}.library_id`, l.library_id]),
    ...model.materials.map((m, i) => [`materials.${i}.library_id`, m.library_id]),
  ]
    .filter(([, id]) => !known.has(id))
    .map(([path, id]) => `${path}: '${id}' not in library`);
  return { ok: unsupported.length === 0, unsupported };
}
