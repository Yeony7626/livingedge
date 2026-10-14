// Builds landing.html: the real Detail 02 section, pre-cut at w 900, baked into a self-contained page.
//   node build-landing.mjs   (reads ../rhino/detail02.json, landing-shell.html, landing.js)
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { sectionShapes, drawOrder, hatchOf, thinness } from "./geom.mjs";
import { solveCase } from "./thermal-core.mjs";

const here = (f) => new URL(f, import.meta.url);
const spec = JSON.parse(readFileSync(here("../rhino/detail02-app.json"), "utf8"));
const W = 900, WIN = { x: [-7700, 2500], y: [-1450, 5400] };   // appearance model: upper storey to 6.2 m
const inWin = (pts) => {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return !(Math.max(...xs) < WIN.x[0] || Math.min(...xs) > WIN.x[1] || Math.max(...ys) < WIN.y[0] || Math.min(...ys) > WIN.y[1]);
};
const r1 = (v) => Math.round(v * 10) / 10;
const shapes = [];
for (const p of drawOrder(spec.parts)) {
  if (p.type === "virtual" || p.type === "revolve" || p.role === "furniture") continue;
  for (const s of sectionShapes(p, W)) {
    if (s.circle) {
      const [x, y, r, ri] = s.circle;
      if (inWin([[x - r, y - r], [x + r, y + r]])) shapes.push({ id: p.id, mat: p.mat, step: p.step, c: [r1(x), r1(-y), r1(r), r1(ri)] });
      continue;
    }
    if (!inWin(s.poly)) continue;
    shapes.push({ id: p.id, mat: p.mat, role: p.role, step: p.step, v: p.void ? 1 : 0, h: hatchOf(p), thin: thinness(s.poly) < 3 ? 1 : 0,
      d: s.poly.map(([x, y]) => `${r1(x)},${r1(-y)}`).join(" ") });
  }
}
const plants = spec.parts.filter((p) => p.type === "revolve").map((p) => ({ id: p.id, x: p.x, w: p.w[0], profile: p.profile,
  kind: p.id === "tree" ? "tree" : p.id.startsWith("shrub") ? "shrub" : p.id.startsWith("bed-plant") ? "bed-plant" : "rg-plant" }));
const people = spec.parts.filter((p) => p.role === "furniture" && p.type === "rod").map((p) => ({ id: p.id, x: p.x, r: p.d / 2, y0: p.from, y1: p.to }));
// Real headline numbers: carbon from metrics.mjs on this spec; f_Rsi from the 2.5 mm thermal screening of the threshold.
const metricsOut = execFileSync(process.execPath, [fileURLToPath(here("../rhino/metrics.mjs")), fileURLToPath(here("../rhino/detail02.json")), fileURLToPath(here("../rhino/materials.json"))], { encoding: "utf8" });
const carbon = +metricsOut.match(/Total (\d+)/)[1];
const axoParts = spec.parts.filter((p) => p.type !== "virtual" && p.role !== "furniture" && !p.void);
// Winter: the thermal screening solved at the landing's cut (w 2000), ISO 13788 conditions, 5 mm mesh. Each field is
// packed one byte per cell (0..254 = Te..Ti, 255 = air) for the cut-face colour flood; only computed values are drawn.
const mats = JSON.parse(readFileSync(here("../rhino/materials.json"), "utf8"));
const BC = { Te: -7, Ti: 20, Rse: 0.04, Rsi: 0.25 };
const therm = [["Threshold", { w: 2000, x: [-1500, 1300], y: [-760, 700] }], ["Head", { w: 2000, x: [-900, 1000], y: [2450, 3700] }]].map(([name, c]) => {
  const r = solveCase({ order: drawOrder(spec.parts), mats, sectionShapes, c, bc: BC, dx: 5 });
  const bytes = Buffer.alloc(r.nx * r.ny);
  r.Tc.forEach((t, q) => (bytes[q] = Number.isNaN(t) ? 255 : Math.round(Math.min(Math.max((t - BC.Te) / (BC.Ti - BC.Te), 0), 1) * 254)));
  return { name, box: [c.x[0], c.y[0], c.x[1], c.y[1]], nx: r.nx, ny: r.ny, data: bytes.toString("base64"), fRsi: +r.fRsi.toFixed(3),
    coldest: { x: r.tsMin.x, y: r.tsMin.y, T: +r.tsMin.T.toFixed(1), part: r.tsMin.part }, Qi: +r.Qi.toFixed(1) };
});
spec.stages = spec.stages.map((s) => (s === "Planting and people" ? "Planting" : s));   // no people are modelled in the build
const data = { WIN, W, shapes, parts: axoParts, therm, bc: BC, plants, people, flows: spec.flows, stages: spec.stages, ageing: spec.ageing, numbers: { carbon, threshold: 12, fRsi: Math.min(...therm.map((t) => t.fRsi)) } };
// The 3D views are one module: the import lines of edge3d.js and landing3d.js (deduplicated), then geom.mjs,
// edge3d.js and landing3d.js with imports dropped and "export" stripped (one scope).
// (axo.js, the ink-only drawing, and hero.js, the first rendered hero, are kept for reference.)
function axoModule() {
  const files = ["./geom.mjs", "./edge3d.js", "./landing3d.js"].map((f) => readFileSync(here(f), "utf8"));
  const imports = [...new Set(files.flatMap((s) => s.match(/^import .*$/gm) ?? []))];
  return [...imports, ...files.map((s) => s.replace(/^import .*$/gm, "").replace(/^export /gm, ""))].join("\n");
}
// sources: the reviewed research entries, grouped by area, as static HTML (checkable without the tool)
const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const entries = JSON.parse(readFileSync(here("../../research/entries.json"), "utf8"));
const AREAS = [["codes", "Codes and standards"], ["materials", "Material properties"], ["assembly", "Assemblies"], ["climate", "Climate"], ["ecology", "Ecology and planting"]];
const CONF = { calculated: "Used in calculation", qualitative: "Guidance", illustrative: "Illustrative" };
const TYPES = { code: "Code", standard: "Standard", guide: "Guide", paper: "Paper", manufacturer: "Manufacturer", dataset: "Dataset", secondary: "Secondary", textbook: "Textbook" };
const typeOf = (e) => TYPES[String(e.source_type ?? "").split(/[\s(/]/)[0]] ?? "Unclassified";
const sourcesHtml = AREAS.map(([k, name]) => {
  const rows = entries.filter((e) => e.area === k);
  return `<details class="src"${k === "codes" ? " open" : ""}><summary><span>${name}</span><b>${rows.length}</b></summary><ol>` + rows.map((e) => {
    const urls = String(e.url ?? "").split(/\s*;\s*/).filter((u) => /^https?:\/\//.test(u));
    const src = urls.length ? `<a href="${esc(urls[0])}" rel="noopener" target="_blank">${esc(e.source)}</a>` : esc(e.source);
    return `<li id="src-${esc(e.id)}" data-type="${typeOf(e)}"><p class="s">${esc(e.subject)}</p><p class="c">${esc(e.claim)}</p><p class="r">${src}<span>${typeOf(e)} &#183; ${esc(CONF[e.suggested_confidence] ?? e.suggested_confidence ?? "")}</span></p></li>`;
  }).join("") + `</ol>${rows.length > 8 ? `<button type="button" class="more">Show all ${rows.length}</button>` : ""}</details>`;
}).join("");
const html = readFileSync(here("./landing-shell.html"), "utf8")
  .replace("__SOURCES__", () => sourcesHtml)
  .replaceAll("__NSOURCES__", String(entries.length))
  .replace("__DATA__", () => JSON.stringify(data).replace(/</g, "\\u003c"))
  .replace("__JS__", () => readFileSync(here("./landing.js"), "utf8"))
  .replace("__AXO__", () => axoModule())
  .replaceAll("__CARBON__", String(carbon))
  .replaceAll("__FRSI__", Math.min(...therm.map((t) => t.fRsi)).toFixed(2));
writeFileSync(here("./landing.html"), html);
console.log(`landing.html written: ${shapes.length} shapes, ${plants.length} plants, carbon ${carbon}`);
