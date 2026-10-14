// Per-metre-of-wall quantities, embodied carbon (A1–A3) and effective RSI for a detail spec.
//   node metrics.mjs detail03.json materials.json > review/lapN/metrics.md
// Quantities come straight from the spec geometry: prisms and sheets as cross-section area × 1 m of wall,
// round parts as volume × count per metre. Materials are looked up by `mat` (parts without one are listed).
import { readFileSync } from "node:fs";

const [specPath, matPath] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const mats = JSON.parse(readFileSync(matPath, "utf8"));
const L = spec.L;

const polyArea = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
const pathLen = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
const runLen = (runs) => (runs ?? [[0, L]]).reduce((s, [a, b]) => s + b - a, 0);
// Share of the wall length a part occupies, ignoring the stepped cut-away at the end of the slice:
// a continuous layer counts as 1, discrete runs (studs, straps) as their summed width over the full span.
const share = (p) => {
  const runs = p.runs ?? [[0, L]];
  return runs.length === 1 ? 1 : runLen(runs) / (runs[runs.length - 1][1] - runs[0][0]);
};

// Volume actually present in the slice (no per-metre scaling), for items that occur once per opening.
function sliceM3(p) {
  if (p.type === "rod") {
    const n = p.axis === "w" ? (p.at ?? [0]).length : (p.axis === "y" ? p.w.length : p.w.length * (p.ys ?? [0]).length);
    const ring = (p.d ** 2 - (p.di ?? 0) ** 2) * Math.PI / 4;
    const len = p.axis === "x" ? Math.hypot(p.to - p.from, p.dy ?? 0) : p.to - p.from;
    return ring * len * n / 1e9;
  }
  if (p.axis === "x") return polyArea(p.poly) * (p.x[1] - p.x[0]) / 1e9;
  const area = p.type === "sheet" ? pathLen(p.path) * p.t : polyArea(p.poly);
  return area * runLen(p.runs) / 1e9;
}

function m3PerMetre(p) {
  if (p.per === "opening") return sliceM3(p) / ((spec.opening_mm ?? L) / 1000);
  if (p.type === "rod") {
    const n = p.axis === "w" ? (p.at ?? [0]).length : p.w.length * (p.ys ?? [0]).length;
    const len = p.to - p.from, ring = (p.d ** 2 - (p.di ?? 0) ** 2) * Math.PI / 4;
    return p.axis === "w" ? ring * 1000 * n / 1e9 : ring * len * n * (1000 / L) / 1e9;
  }
  if (p.type === "revolve") return null; // piers: listed with rods below via mat volume override
  if (p.axis === "x") return polyArea(p.poly) * (p.x[1] - p.x[0]) * (1000 / L) / 1e9;
  const area = p.type === "sheet" ? pathLen(p.path) * p.t : polyArea(p.poly);
  return area * 1000 * share(p) / 1e9;
}

const rows = [], missing = [];
for (const p of spec.parts) {
  if (p.void || p.nocarbon) continue;   // nocarbon: drawn maker parts whose carbon is carried by a virtual door-unit part
  const m = mats[p.mat];
  const q = p.m3PerMetre ?? m3PerMetre(p), v = q == null ? null : q * (p.fill ?? 1); // fill: solid share of hollow profiles and dimpled mats
  if (!m || v == null) { missing.push(p.id); continue; }
  const kg = v * m.density;
  rows.push({ id: p.id, junction: p.junction, mat: p.mat, m3: v, kg, co2: kg * m.a1a3, bio: kg * (m.biogenic ?? 0) });
}
const sum = (k, f = () => true) => rows.filter(f).reduce((s, r) => s + r[k], 0);
const byMat = {};
for (const r of rows) byMat[r.mat] = (byMat[r.mat] ?? 0) + r.co2;

const zones = spec.zones ?? {};
const out = ["# Metrics", "", `Spec: ${specPath}`, "", "## Embodied carbon per metre of opening (A1–A3, kgCO2e)", "",
  "The slice is taken as representative of the opening; items flagged per: \"opening\" are counted once per " + ((spec.opening_mm ?? L) / 1000) + " m opening.", "",
  `Total ${sum("co2").toFixed(0)} kgCO2e/m · biogenic carbon stored ${(-sum("bio")).toFixed(0)} kgCO2e/m (reported separately, not netted).`, "",
  // Intensity only where it means something (R4 lap 2 N5): ground zones per m² of plan (depth_m), the door per m² of
  // elevation (elev_m); junctions such as the threshold and head stay per metre of opening.
  "| junction | kgCO2e per m of opening | basis | intensity (kgCO2e/m²) |", "|---|---|---|---|",
  ...[...new Set(rows.map((r) => r.junction))].sort().map((j) => {
    const v = sum("co2", (r) => r.junction === j), z = zones[j];
    const [basis, d] = z?.elev_m ? [`${z.elev_m} m of elevation`, z.elev_m] : z?.depth_m ? [`${z.depth_m} m of plan`, z.depth_m] : ["per m only", 0];
    return `| ${j}${z ? " " + z.label : ""} | ${v.toFixed(1)} | ${basis} | ${d ? (v / d).toFixed(1) : "–"} |`;
  }), "",
  "A1–A3 only. Replacement over a 60-year study period (B4) is not included yet; R4 estimates it at about +214 kgCO2e/m for v2.", "",
  "| material | kgCO2e/m | factor (kgCO2e/kg) | source |", "|---|---|---|---|",
  ...Object.entries(byMat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v.toFixed(1)} | ${mats[k].a1a3} | ${mats[k].src} |`), ""];

// Effective RSI, parallel path: each assembly lists layers {mat, t} and optional framing {mat, frac}.
out.push("## Effective thermal resistance (parallel path)", "", "| assembly | RSI eff. | target | pass |", "|---|---|---|---|");
for (const a of spec.assemblies ?? []) {
  const r = (layer, mat) => layer.t / 1000 / mats[mat].k;
  const film = (a.films ?? [0.12, 0.03]).reduce((s, x) => s + x, 0);
  let cav = film, frm = film;
  for (const l of a.layers) {
    cav += r(l, l.mat);
    frm += l.framing ? r(l, l.framing.mat) : r(l, l.mat);
  }
  const f = a.layers.find((l) => l.framing)?.framing.frac ?? 0;
  const rsi = 1 / (f / frm + (1 - f) / cav) * (a.derate ?? 1);
  out.push(`| ${a.name} | ${rsi.toFixed(2)} | ${a.target ?? "–"} | ${a.target ? (rsi >= a.target ? "yes" : "**no**") : "–"} |`);
}
out.push("", `Parts without a material or quantity (not counted): ${missing.join(", ") || "none"}`);
console.log(out.join("\n"));
