// Builds a standalone comparison page: each junction as one capture per version, images embedded.
//   node make-compare.mjs        -> compare.html (Detail 01)
//   node make-compare.mjs d2     -> d2-compare.html (Detail 02, plus exterior renders per lap)
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const PRESETS = {
  d1: {
    dir: "./compare/", out: "./compare.html", title: "Detail 01 versions", h1: "Detail 01: v0 → v1 → v2",
    intro: "Same window per junction, cut face at the end of the 900 mm slice. Blue = water control, red = air barrier, yellow = insulation, tan = wood, grey = concrete/metal. v0's wall had a 1500 mm break, so its eave and wall windows sit lower.",
    versions: [["v0", "Original prototype copy (unsourced)"], ["v1", "First sourced model"], ["v2", "After review loop 1"]],
    rows: [
      ["A-base", "Base of wall: flashing, sill, cladding base"],
      ["B-eave", "Eave: cavity top, soffit, roof edge, gutter"],
      ["C-bench", "Bench to ground"],
      ["D-slab", "Slab edge, ledge and air-barrier tie"],
      ["E-footing", "Footing and perimeter drainage"],
      ["G-field", "Wall field: insulation, cavity, stucco"],
    ],
    renders: [],
  },
  d2: {
    dir: "./d2-compare/", out: "./d2-compare.html", title: "Detail 02 versions", h1: "Detail 02: sliding wall to ground, v1 → v2 → v3",
    intro: "Same window per junction, cut face at the end of the 1.8 m slice (layers step back near the cut). Blue = water control, red = air barrier, yellow = insulation, tan = wood, grey = concrete/metal, green = planting. Exterior renders use finish colours.",
    versions: [["d2v1", "First sourced model (lap 1 reviewed)"], ["d2v2", "After lap 1 reviews"], ["d2v3", "After lap 2 + floor above, PH wood-Al door, water corner"]],
    rows: [
      ["T-threshold", "Threshold: sill pan, thermal break, trench channel"],
      ["H-head", "Head: lintel, band, soffit, gutter, green-roof edge"],
      ["F-floor", "Floor: slab edge, soil-gas barrier, insulation"],
      ["M-landing", "Lined landing, perimeter drain"],
      ["C-water-corner", "Water corner at jamb A (v3)"],
      ["Z-jamb-base", "Jamb wall base (v3)"],
      ["I-bed-tree", "Planting bed and tree pit"],
      ["J-rain-garden", "Rain garden"],
      ["S-section", "Whole section, 6 m out to 2.5 m in"],
    ],
    renders: [["d2-lap0", "d2v1"], ["d2-lap2", "d2v2 (5.4 m run + jamb wall)"], ["d2-lap3", "d2v3 (both jambs, upper storey)"]],
  },
};
const P = PRESETS[process.argv[2] ?? "d1"];
const here = (f) => new URL(f, import.meta.url);
const img = (f) => (existsSync(here(f)) ? `data:image/png;base64,${readFileSync(here(f)).toString("base64")}` : "");
const fig = (src, alt, cap) => `<figure><img src="${img(src)}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`;
const sections = P.rows.map(([id, label]) => `<section><h2>${label}</h2><div class="row">${P.versions.map(([v, t]) =>
  fig(`${P.dir}${id}-${v}.png`, `${label}, ${v}`, `<b>${v}</b> ${t}`)).join("")}</div></section>`);
for (const shot of ["exterior-eye", "exterior-elevation", "exterior-close"])
  if (P.renders.length) sections.push(`<section><h2>Exterior, ${({ "exterior-eye": "eye level from the garden", "exterior-elevation": "straight elevation", "exterior-close": "close view: water corner, frame, threshold" })[shot]}</h2><div class="row">${P.renders.map(([d, t]) =>
    fig(`./${d}/${shot}.png`, `${shot}, ${t}`, `<b>${t}</b>`)).join("")}</div></section>`);
writeFileSync(here(P.out), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${P.title}</title>
<style>:root{--bg:#f6f6f4;--fg:#1c1c1e;--mute:#6b6b70}@media (prefers-color-scheme:dark){:root{--bg:#161617;--fg:#ececec;--mute:#9a9aa0}}
body{margin:0;padding:24px 16px;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,sans-serif}h1{font-size:20px;margin:0 0 4px}p{color:var(--mute);margin:0 0 20px}
h2{font-size:15px;margin:28px 0 8px}.row{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}figure{margin:0}img{width:100%;height:auto;display:block;border-radius:4px}
figcaption{font-size:13px;color:var(--mute);margin-top:4px}</style>
<h1>${P.h1}</h1><p>${P.intro}</p>
${sections.join("\n")}</html>`);
console.log(`${P.out} written`);
