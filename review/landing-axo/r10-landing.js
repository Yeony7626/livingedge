// Landing page runtime. Everything drawn here is the real Detail 02 section at w 900 (baked by build-landing.mjs):
// a painted render (finish colours, aged by the reviewers' keyframes) and the hairline drafting render.
const D = window.LANDING, NS = "http://www.w3.org/2000/svg";
const { WIN } = D, VB = `${WIN.x[0]} ${-WIN.y[1]} ${WIN.x[1] - WIN.x[0]} ${WIN.y[1] - WIN.y[0]}`;
const INK = "#1B1B1A", PAPER = "#F2F1EC", SIGNAL = "#E0482B", WATER = "#2F6FB0";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- painted render ----------
const FINISH = {
  "steel-prefinished": "#343638", aluminium: "#343638", stainless: "#96989a", "polymer-concrete": "#5c5e60", "igu-triple": "#b7cbd2",
  "cedar-siding": "#aaa091", "cedar-soffit": "#b68860", glulam: "#c9a77c", "softwood-lumber": "#c9a77c", "softwood-pt": "#b49a74", plywood: "#cdb08a",
  "concrete-lowcarbon": "#b9b5ad", "concrete-f2-40scm": "#b2aea6", "reclaimed-stone": "#8c8a84", aggregate: "#a39d92", soil: "#6d5a47", "soil-imported": "#5f4c3a",
  "parge-charcoal": "#4e4e4c", "woodfibre-board": "#a8875f", hdpe: "#2a2a2c", "graphite-eps": "#8d8d92", "pu-structural-160": "#c9c27a", "pu-structural": "#c9c27a",
  gypsum: "#eceae4", "cellulose-dense": "#cdbb8c", comfortbatt: "#d7c48e", "comfortboard-80": "#cdb780", cork: "#a77b55", "cellular-glass": "#3c3c3e",
};
const ROLE = { concrete: "#b2aea6", ground: "#7a6551", drainage: "#a39d92", water: "#2c2f33", air: "#3b3b3d", thermal: "#d7c48e", frame: "#c9a77c", cladding: "#aaa091", metal: "#5a5a5f", planting: "#647f4b" };
const lerp = (a, b, t) => a + (b - a) * t;
function aged(mat, year) {
  const keys = D.ageing.rgb[mat];
  if (!keys) return null;
  const ys = D.ageing.years;
  let i = ys.findIndex((y, k) => year <= ys[k + 1] || k === ys.length - 2);
  const t = Math.min(1, Math.max(0, (year - ys[i]) / (ys[i + 1] - ys[i])));
  const c = keys[i].map((v, k) => Math.round(lerp(v, keys[i + 1][k], t)));
  return `rgb(${c.join(",")})`;
}
function growth(kind, year) {
  const g = D.ageing.grow[kind];
  if (!g) return 1;
  const ys = D.ageing.years;
  let i = ys.findIndex((y, k) => year <= ys[k + 1] || k === ys.length - 2);
  return lerp(g[i], g[i + 1], Math.min(1, Math.max(0, (year - ys[i]) / (ys[i + 1] - ys[i]))));
}
const plantPath = (p, year, close = true) => {
  const s = growth(p.kind, year), base = p.profile[0][1];
  const pts = p.profile.map(([r, y]) => [r * s, base + (y - base) * s]);
  const right = pts.map(([r, y]) => `${(p.x + r).toFixed(0)},${(-y).toFixed(0)}`), left = pts.slice().reverse().map(([r, y]) => `${(p.x - r).toFixed(0)},${(-y).toFixed(0)}`);
  return `M${right.join(" L")} L${left.join(" L")}${close ? "Z" : ""}`;
};
function paintedSVG(year) {
  const sky = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfdade"/><stop offset=".72" stop-color="#e9ece4"/><stop offset="1" stop-color="#eef0e8"/></linearGradient>`;
  const rough = `<filter id="rough" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".004" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="14"/></filter>`;
  const [x0, x1] = WIN.x, top = -WIN.y[1];
  let s = `<defs>${sky}${rough}</defs><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${WIN.y[1] - WIN.y[0]}" fill="url(#sky)"/>`;
  // distant ridge and garden trees behind the cut (soft, out of plane)
  s += `<path d="M${x0} ${-400} C ${x0 + 1800} -1250 ${x0 + 3400} -900 ${x0 + 5200} -1500 S ${x1 - 1200} -1100 ${x1} -1450 L ${x1} 0 L ${x0} 0 Z" fill="#b9c6b3" opacity=".55"/>`;
  s += `<rect x="260" y="-3149" width="${x1 - 260}" height="3149" fill="#efe4cf"/>`;   // warm room behind the glass
  s += `<g filter="url(#rough)">`;
  for (const p of D.plants) if (p.kind === "rg-plant" || p.kind === "bed-plant") s += plantPaint(p, year);
  for (const sh of D.shapes) {
    if (sh.c) { s += `<circle cx="${sh.c[0]}" cy="${sh.c[1]}" r="${sh.c[2]}" fill="#3a3a3c"/>`; continue; }
    const fill = sh.v ? "#dfe6e2" : aged(sh.mat, year) ?? FINISH[sh.mat] ?? ROLE[sh.role] ?? "#bbb";
    s += `<polygon points="${sh.d}" fill="${fill}" ${sh.mat === "igu-triple" ? 'fill-opacity=".55"' : ""}/>`;
  }
  for (const p of D.plants) if (p.kind === "tree" || p.kind === "shrub") s += plantPaint(p, year);
  return s + `</g>`;
}
// Entourage sized from the model's plant proxies (height and spread scale with the ageing growth factor):
// trees and shrubs as layered canopies of overlapping discs, sedges and rushes as tufts of blades.
function seeded(n) { let t = Math.abs(n) % 233280; return () => ((t = (t * 9301 + 49297) % 233280) / 233280); }
function plantPaint(p, year) {
  const s = growth(p.kind, year), base = p.profile[0][1];
  const H = (Math.max(...p.profile.map((v) => v[1])) - base) * s, Rm = Math.max(...p.profile.map((v) => v[0])) * s;
  const rnd = seeded(p.x | 0), x = p.x, y0 = -base;
  if (p.kind === "rg-plant" && /sedge|rush/i.test(p.id + (p.name ?? "")) || (p.kind === "rg-plant" && p.x > -7000)) {
    let g = "";
    for (let i = 0; i < 16; i++) {
      const a = (i / 15 - 0.5) * 1.3, h = H * (0.7 + rnd() * 0.35);
      g += `<path d="M${x} ${y0} Q ${x + Math.sin(a) * h * 0.35} ${y0 - h * 0.6} ${x + Math.sin(a) * h * 0.8} ${y0 - h}" stroke="${i % 3 ? "#6e8b4e" : "#8aa56a"}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
    }
    return g;
  }
  let g = "";
  if (p.kind === "tree") g += `<path d="M${x - 45} ${y0} L${x - 28} ${y0 - H * 0.55} L${x + 28} ${y0 - H * 0.55} L${x + 45} ${y0} Z" fill="#5b4a3a"/>`;
  const cy = p.kind === "tree" ? y0 - H * 0.72 : y0 - H * 0.45, ry = p.kind === "tree" ? H * 0.3 : H * 0.5, n = p.kind === "tree" ? 14 : 8;
  const greens = ["#5f7d48", "#6f8c55", "#7f9b62", "#89a46b"];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * 0.75;
    const r = (p.kind === "tree" ? Rm * 0.42 : Rm * 0.55) * (0.6 + rnd() * 0.5);
    g += `<circle cx="${(x + Math.cos(a) * Rm * rr * 0.8).toFixed(0)}" cy="${(cy + Math.sin(a) * ry * rr).toFixed(0)}" r="${r.toFixed(0)}" fill="${greens[i % 4]}" opacity=".92"/>`;
  }
  return g;
}

// ---------- hairline drafting render ----------
const HATCH = `<defs>
<pattern id="h-timber" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="40" stroke="${INK}" stroke-width="2.4"/></pattern>
<pattern id="h-rigid" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="26" stroke="${INK}" stroke-width="1.6"/><line x1="0" y1="13" x2="26" y2="13" stroke="${INK}" stroke-width="1.6"/></pattern>
<pattern id="h-batt" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M0 30 Q15 0 30 30 T60 30" fill="none" stroke="${INK}" stroke-width="2"/></pattern>
<pattern id="h-conc" width="70" height="70" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="3.5" fill="${INK}"/><path d="M40 35 l10 -15 l10 15z" fill="none" stroke="${INK}" stroke-width="1.8"/><circle cx="55" cy="55" r="2.5" fill="${INK}"/></pattern>
<pattern id="h-gravel" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="10" fill="none" stroke="${INK}" stroke-width="1.8"/><circle cx="45" cy="40" r="7" fill="none" stroke="${INK}" stroke-width="1.8"/></pattern>
<pattern id="h-stone" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="20" stroke="${INK}" stroke-width="1.6"/></pattern>
<pattern id="h-earth" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="30" y2="0" stroke="${INK}" stroke-width="2.4"/><line x1="40" y1="40" x2="60" y2="40" stroke="${INK}" stroke-width="2.4"/></pattern>
<pattern id="h-gyp" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="${INK}"/></pattern>
<pattern id="h-maker" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="30" height="30" fill="#E6E2D8"/><line x1="0" y1="0" x2="0" y2="30" stroke="#B9B4A8" stroke-width="1.6"/></pattern>
</defs>`;
const inkFill = (sh) => (sh.v ? PAPER : sh.thin || sh.h === "ink" ? INK : sh.h === "glass" || sh.h === "plain" ? PAPER : `url(#h-${sh.h})`);
function inkSVG({ grouped = false } = {}) {
  let s = HATCH + `<rect x="${WIN.x[0]}" y="${-WIN.y[1]}" width="${WIN.x[1] - WIN.x[0]}" height="${WIN.y[1] - WIN.y[0]}" fill="${PAPER}"/>`;
  const byStep = new Map();
  for (const sh of D.shapes) {
    const el = sh.c
      ? `<circle cx="${sh.c[0]}" cy="${sh.c[1]}" r="${sh.c[2]}" fill="${PAPER}" stroke="${INK}" stroke-width="1.1" vector-effect="non-scaling-stroke"/>`
      : `<polygon points="${sh.d}" fill="${inkFill(sh)}" stroke="${sh.v ? "none" : INK}" stroke-width="${sh.h === "glass" ? 0.5 : 0.9}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;
    if (!grouped) s += el; else { if (!byStep.has(sh.step)) byStep.set(sh.step, []); byStep.get(sh.step).push(el); }
  }
  if (grouped) for (const k of [...byStep.keys()].sort((a, b) => a - b)) s += `<g class="stage" data-step="${k}">${byStep.get(k).join("")}</g>`;
  // planting and people are illustrative: dotted outlines (confidence rule)
  const dots = D.plants.map((p) => `<path d="${plantPath(p, 15)}" fill="none" stroke="${INK}" stroke-width=".8" stroke-dasharray="1 4" vector-effect="non-scaling-stroke"/>`).join("");
  s += grouped ? `<g class="stage" data-step="14">${dots}</g>` : dots;
  return s;
}
const mount = (el, inner, fit = "xMidYMid meet", vb = VB) => { el.setAttribute("viewBox", vb); el.setAttribute("preserveAspectRatio", fit); el.innerHTML = inner; };

// ---------- hero: drawn by axo.js (three.js, parallel projection of the cut model) ----------

// ---------- time scrub ----------
const ageSvg = document.getElementById("age-svg"), yr = document.getElementById("year"), yrOut = document.getElementById("year-out"), notes = document.getElementById("age-notes");
let pending = false;
function renderAge() {
  pending = false;
  const y = +yr.value;
  mount(ageSvg, paintedSVG(y));
  yrOut.textContent = y;
  const k = [...D.ageing.years].reverse().findIndex((v) => y >= v), idx = D.ageing.years.length - 1 - k;
  notes.innerHTML = D.ageing.notes[idx].map((t) => `<p>${t}</p>`).join("");
  document.querySelectorAll(".ticks button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.y === D.ageing.years[idx]));
}
yr.addEventListener("input", () => { if (!pending) { pending = true; requestAnimationFrame(renderAge); } });
document.querySelectorAll(".ticks button").forEach((b) => (b.onclick = () => { yr.value = b.dataset.y; renderAge(); }));
renderAge();

// ---------- rain ----------
const rainSvg = document.getElementById("rain-svg");
const flowPaths = D.flows.map((f, i) => `<polyline class="flow${f.beyond ? " beyond" : ""}" style="--i:${i}" points="${f.path.map(([x, y]) => `${x},${-y}`).join(" ")}" fill="none" stroke="${WATER}" stroke-width="${f.beyond ? 2 : 3}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`).join("");
const streaks = Array.from({ length: 70 }, (_, i) => { const x = WIN.x[0] + ((i * 977) % (WIN.x[1] - WIN.x[0])), y = -WIN.y[1] + ((i * 613) % 1800); return `<line class="drop" style="--d:${(i % 9) * 0.11}s" x1="${x}" y1="${y}" x2="${x - 60}" y2="${y + 260}" stroke="${WATER}" stroke-width="1" vector-effect="non-scaling-stroke"/>`; }).join("");
mount(rainSvg, inkSVG() + `<g class="streaks">${streaks}</g>` + flowPaths);
document.getElementById("routes").innerHTML = D.flows.map((f) => `<li><svg width="34" height="8" aria-hidden="true"><line x1="0" y1="4" x2="34" y2="4" stroke="${WATER}" stroke-width="${f.beyond ? 2 : 3}" ${f.beyond ? 'stroke-dasharray="4 4"' : ""}/></svg><span>${f.label}${f.beyond ? " (beyond the cut, at the water corner)" : ""}</span></li>`).join("");
const rainSec = document.getElementById("rain"), rainBtn = document.getElementById("rain-btn");
const on = () => rainSec.classList.add("raining"), off = () => rainSec.classList.remove("raining");
rainBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); on(); });
["pointerup", "pointerleave", "pointercancel"].forEach((t) => rainBtn.addEventListener(t, off));
rainBtn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); on(); } });
rainBtn.addEventListener("keyup", off);

// ---------- build ----------
const buildSvg = document.getElementById("build-svg"), stageNum = document.getElementById("stage-num"), stageName = document.getElementById("stage-name");
mount(buildSvg, inkSVG({ grouped: true }));
const groups = [...buildSvg.querySelectorAll(".stage")];
let timer = null;
function showStage(k) {
  groups.forEach((g) => g.classList.toggle("in", +g.dataset.step <= k));
  stageNum.textContent = String(k + 1).padStart(2, "0");
  stageName.textContent = D.stages[k];
}
document.getElementById("build-btn").onclick = (e) => {
  clearInterval(timer);
  let k = 0;
  showStage(0);
  e.currentTarget.textContent = "Build again";
  if (reduce) { showStage(D.stages.length - 1); return; }
  timer = setInterval(() => { k++; if (k >= D.stages.length) return clearInterval(timer); showStage(k); }, 900);
};
showStage(D.stages.length - 1);
