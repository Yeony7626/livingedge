// Landing page views, all drawn by edge3d.js from the same model: hero (explodes on scroll), ageing (0 to 30 years),
// rain (drops fall only where the sky reaches; the drainage routes run on the cut), build (stage by stage).
// aged() / growth() and the ageing notes come from landing.js (window.LANDING).
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

const DATA = window.LANDING, reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const model = buildModel(DATA.parts);
const views = [];
function watch(el, v) { v.visible = false; new IntersectionObserver(([e]) => (v.visible = e.isIntersecting)).observe(el); views.push(v); }

// ================= hero: construction layers in build order, lifted apart by scroll =================
const GAP = 0.5;
const LAYERS = [
  { name: "Subgrade and drains", lift: 0, at: "subgrade" },
  { name: "Grade beam, slab on graphite EPS", lift: 1, at: "slab" },
  { name: "Landing, liner, planting bed", lift: 1, at: "pavers-lined" },
  { name: "Warm sill, 12 mm threshold", lift: 2.2, at: "sill-block", focus: true },
  { name: "Lift-and-slide door", lift: 3.2, at: "glass-2" },
  { name: "Glulam head, canopy, cedar", lift: 4.4, at: "glulam" },
];
const layerOf = (p) => FOCUS_IDS.has(p.id) ? 3 : p.junction === "E" ? 0 : p.junction === "F" || p.junction === "T" ? 1
  : /^[MPIJ]$/.test(p.junction) ? 2 : p.junction === "D" ? 4 : 5;
const heroCv = document.getElementById("hero-ink"), notes = document.getElementById("hero-notes"), lensCv = document.getElementById("hero-lens");
const hero = createView({ canvas: heroCv, model, groups: LAYERS, groupOf: layerOf, meadowIn: 2, col: 300 });
const heroEl = document.querySelector(".hero");
// detail lens: the hero scene through a tighter camera, centred on the step from landing tray to sill
const LENS = { at: new THREE.Vector3(30 * S, -40 * S, CUTW * S), span: 0.42, ring: 14, mag: 0 };
const lensRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: lensCv });
Object.assign(lensRenderer, { localClippingEnabled: true, toneMapping: THREE.ACESFilmicToneMapping });
lensRenderer.setClearColor(0xffffff, 1);
lensRenderer.shadowMap.enabled = true;
let lensDone = false;
function drawLens() {
  const size = lensCv.getBoundingClientRect().width;
  if (!size) return;
  lensRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  lensRenderer.setSize(size, size, false);
  const cam = hero.camera.clone(), v = LENS.at.clone().applyMatrix4(hero.camera.matrixWorldInverse), h = LENS.span / 2;
  Object.assign(cam, { left: v.x - h, right: v.x + h, top: v.y + h, bottom: v.y - h });
  cam.updateProjectionMatrix();
  LENS.mag = Math.round((hero.camera.right - hero.camera.left) / hero.size()[0] / (LENS.span / size));
  hero.render(cam, size, size, lensRenderer);
  lensDone = true;
}
function heroProgress() {
  if (reduceMotion || matchMedia("(max-width: 900px)").matches) return 0;
  const r = heroEl.getBoundingClientRect(), p = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
  const ease = (t) => t * t * (3 - 2 * t), up = ease(Math.min(Math.max((p - 0.08) / 0.37, 0), 1)), down = ease(Math.min(Math.max((p - 0.72) / 0.24, 0), 1));
  return up - down;
}
function heroNotes(f) {
  const [W, H] = hero.size();
  let s = "";
  if (f > 0.02) {
    const pts = LAYERS.map((l, i) => ({ l, i, a: hero.anchor(l.at) })).filter((n) => n.a).sort((m, n) => m.a[1] - n.a[1]);
    const colX = W - 300 + 40, ys = pts.map((n) => n.a[1]);
    for (let k = 1; k < ys.length; k++) ys[k] = Math.max(ys[k], ys[k - 1] + 26);
    pts.forEach((n, k) => {
      s += `<g class="xnote${n.l.focus ? " focus" : ""}" style="opacity:${Math.min(1, (f - 0.02) * 2.5)}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="2"/><path d="M${n.a[0]} ${n.a[1]} L${colX - 60} ${ys[k]} H${colX - 10}" stroke-dasharray="3 3"/><text class="k" x="${colX}" y="${ys[k] + 3.5}">${String(n.i + 1).padStart(2, "0")}</text><text x="${colX + 24}" y="${ys[k] + 3.5}">${n.l.name.toUpperCase()}</text></g>`;
    });
  }
  const lb = lensCv.getBoundingClientRect(), hb = notes.getBoundingClientRect();
  if (lb.width && f < 0.98) {
    const lc = [lb.left - hb.left + lb.width / 2, lb.top - hb.top + lb.height / 2], r = lb.width / 2, t = hero.project(LENS.at.clone().add(new THREE.Vector3(0, hero.groups[3].dy, 0)));
    const d = Math.hypot(t[0] - lc[0], t[1] - lc[1]), e = [lc[0] + ((t[0] - lc[0]) / d) * r, lc[1] + ((t[1] - lc[1]) / d) * r], q = [t[0] - ((t[0] - e[0]) / d) * LENS.ring, t[1] - ((t[1] - e[1]) / d) * LENS.ring];
    s += `<g class="lensnote" style="opacity:${1 - f}"><circle cx="${t[0]}" cy="${t[1]}" r="${LENS.ring}" class="ring"/><path d="M${e[0]} ${e[1]} L${q[0]} ${q[1]}" stroke-dasharray="2 3"/><text x="${lc[0] - r}" y="${lc[1] + r + 20}">DETAIL A &#183; 12 MM THRESHOLD, ${LENS.mag}X</text></g>`;
  }
  notes.setAttribute("viewBox", `0 0 ${W} ${H}`);
  notes.innerHTML = s;
}
let lastHero = -1;
watch(heroCv, {
  frame() {
    if (!hero.resize()) return;
    const f = heroProgress();
    document.documentElement.style.setProperty("--xp", f.toFixed(3));
    hero.groups.forEach((g) => hero.lift(g, g.def.lift * GAP * f));
    hero.fit(...hero.size(), Math.max(...LAYERS.map((l) => l.lift)) * GAP * f, 300 * f);
    if (!lensDone && f === 0) drawLens();
    hero.render();
    if (f !== lastHero || !lastHero) heroNotes(f);
    lastHero = f;
  },
});
addEventListener("resize", () => { lensDone = false; lastHero = -1; });

// ================= ageing: finishes weather, the bed grows in =================
const ageCv = document.getElementById("age-cv"), yr = document.getElementById("year"), yrOut = document.getElementById("year-out"), ageNotes = document.getElementById("age-notes");
const age = createView({ canvas: ageCv, model, meadowIn: 0 });
const mix = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
function setYear(y) {
  for (const [mat, m] of age.groups[0].mats) {
    const a = aged(mat, y);
    m.color.copy(a ? mix(m.userData.tone, a, Math.min(1, y / 5) * 0.85) : new THREE.Color(m.userData.tone));   // most of the change happens in the first five years
  }
  age.plants?.grow(growth("bed-plant", y));
  yrOut.textContent = y;
  const ys = DATA.ageing.years, idx = ys.length - 1 - [...ys].reverse().findIndex((v) => y >= v);
  ageNotes.innerHTML = DATA.ageing.notes[idx].map((t) => `<p>${t}</p>`).join("");
  document.querySelectorAll(".ticks button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.y === ys[idx]));
}
yr.addEventListener("input", () => setYear(+yr.value));
document.querySelectorAll(".ticks button").forEach((b) => (b.onclick = () => { yr.value = b.dataset.y; setYear(+b.dataset.y); }));
setYear(0);
watch(ageCv, { frame() { if (!age.resize()) return; age.fit(...age.size()); age.render(); } });

// ================= rain: drops only where the sky reaches; routes traced on the cut =================
const rainCv = document.getElementById("rain-cv"), rainSec = document.getElementById("rain"), rainBtn = document.getElementById("rain-btn");
const rain = createView({ canvas: rainCv, model, meadowIn: 0 });
// drop columns (mm): open landing and bed fall to the ground; the canopy catches what falls over it and sheds it at
// its drip edge (x -757); nothing falls under the canopy or inside the glass line
const SURF = (x) => (x < -3460 ? -105 : -10), TOP = BOX.y[1] + 400;
const columns = [];
for (let i = 0; i < 900; i++) {
  const r = rnd(), w = BOX.w[0] + rnd() * (BOX.w[1] - BOX.w[0]);
  if (r < 0.72) { const x = BOX.x[0] + 30 + rnd() * (-790 - BOX.x[0] - 30); columns.push([x, TOP, SURF(x), w]); }
  else if (r < 0.9) { const x = -750 + rnd() * (-110 + 750); columns.push([x, TOP, 2965, w]); }
  else columns.push([-768 + rnd() * 10, 2790, -10, w]);   // drips off the canopy edge onto the landing
}
const dropGeo = new THREE.BufferGeometry(), A = { aCol: [], aEnd: [], aPh: [] };
columns.forEach(([x, top, bot, w]) => { const ph = rnd(); for (const e of [0, 1]) { A.aCol.push(x * S, top * S, bot * S, w * S); A.aEnd.push(e); A.aPh.push(ph); } });
dropGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Array(columns.length * 6).fill(0), 3));
dropGeo.setAttribute("aCol", new THREE.Float32BufferAttribute(A.aCol, 4));
dropGeo.setAttribute("aEnd", new THREE.Float32BufferAttribute(A.aEnd, 1));
dropGeo.setAttribute("aPh", new THREE.Float32BufferAttribute(A.aPh, 1));
const rainU = { uTime: timeU, uAlpha: { value: 0 } };
const drops = new THREE.LineSegments(dropGeo, new THREE.ShaderMaterial({
  uniforms: rainU, transparent: true, depthWrite: false,
  vertexShader: `attribute vec4 aCol; attribute float aEnd; attribute float aPh; uniform float uTime; varying float vA;
    void main() { float len = aCol.y - aCol.z; float y = aCol.y - mod(uTime * 7.0 + aPh * len, len); float yy = min(y + aEnd * 0.11, aCol.y);
      vA = smoothstep(0.0, 0.25, y - aCol.z) * smoothstep(0.0, 0.8, aCol.y - y); gl_Position = projectionMatrix * viewMatrix * vec4(aCol.x, yy, aCol.w, 1.0); }`,
  fragmentShader: `uniform float uAlpha; varying float vA; void main() { gl_FragColor = vec4(0.184, 0.435, 0.69, uAlpha * vA * 0.75); }`,
}));
drops.frustumCulled = false;
rain.scene.add(drops);
// routes on the cut face (the corner route runs beyond the cut, at the water corner, and is listed only)
const flowMats = [];
for (const f of DATA.flows.filter((f) => !f.beyond)) {
  const pos = [];
  f.path.forEach((p, i) => { if (i) pos.push(f.path[i - 1][0] * S, f.path[i - 1][1] * S, CUTW * S + 0.004, p[0] * S, p[1] * S, CUTW * S + 0.004); });
  const m = new LineMaterial({ color: WATER, linewidth: 3, dashed: true, dashSize: 0.07, gapSize: 0.05, transparent: true, opacity: 0.35 });
  const l = new LineSegments2(new LineSegmentsGeometry().setPositions(pos), m);
  l.computeLineDistances();
  l.renderOrder = 20;
  rain.scene.add(l);
  flowMats.push(m);
}
document.getElementById("routes").innerHTML = DATA.flows.map((f) => `<li><svg width="34" height="8" aria-hidden="true"><line x1="0" y1="4" x2="34" y2="4" stroke="#2F6FB0" stroke-width="${f.beyond ? 2 : 3}" ${f.beyond ? "" : 'stroke-dasharray="6 4"'}/></svg><span>${f.label}${f.beyond ? " (beyond this cut, at the water corner)" : ""}</span></li>`).join("");
let raining = false;
const on = () => { raining = true; rainSec.classList.add("raining"); }, off = () => { raining = false; rainSec.classList.remove("raining"); };
rainBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); on(); });
["pointerup", "pointerleave", "pointercancel"].forEach((t) => rainBtn.addEventListener(t, off));
rainBtn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); on(); } });
rainBtn.addEventListener("keyup", off);
watch(rainCv, {
  frame(dt) {
    if (!rain.resize()) return;
    rainU.uAlpha.value += ((raining ? 1 : 0) - rainU.uAlpha.value) * Math.min(1, dt * 6);
    for (const m of flowMats) { m.opacity = 0.35 + 0.65 * rainU.uAlpha.value; if (raining && !reduceMotion) m.dashOffset -= dt * 0.35; }
    rain.fit(...rain.size());
    const dpr = Math.min(devicePixelRatio, 2), [W, H] = rain.size();
    for (const m of flowMats) m.resolution.set(W * dpr, H * dpr);
    rain.render();
  },
});

// ================= build: the stages arrive in the order they are built =================
const buildCv = document.getElementById("build-cv"), stageNum = document.getElementById("stage-num"), stageName = document.getElementById("stage-name");
const stageDefs = DATA.stages.map(() => ({}));
const build = createView({ canvas: buildCv, model, groups: stageDefs, groupOf: (p) => Math.min(Math.max(p.step ?? 0, 0), stageDefs.length - 1), meadowIn: stageDefs.length - 1 });
let shown = stageDefs.length - 1, arrive = 1;
function showStage(k) {
  shown = k; arrive = reduceMotion ? 1 : 0;
  stageNum.textContent = String(k + 1).padStart(2, "0");
  stageName.textContent = DATA.stages[k];
}
let timer = null;
document.getElementById("build-btn").onclick = (e) => {
  clearInterval(timer);
  let k = 0;
  showStage(0);
  e.currentTarget.textContent = "Build again";
  if (reduceMotion) { showStage(stageDefs.length - 1); return; }
  timer = setInterval(() => { k++; if (k >= stageDefs.length) return clearInterval(timer); showStage(k); }, 1100);
};
showStage(stageDefs.length - 1);
arrive = 1;
watch(buildCv, {
  frame(dt) {
    if (!build.resize()) return;
    arrive = Math.min(1, arrive + dt / 0.7);
    const e = 1 - Math.pow(1 - arrive, 3);
    build.groups.forEach((g, i) => { g.node.visible = i <= shown; build.lift(g, i === shown ? (1 - e) * 0.9 : 0); });
    build.fit(...build.size(), 0.9);
    build.render();
  },
});

// ================= one loop for every view on screen =================
let last = performance.now();
function loop(t) {
  requestAnimationFrame(loop);
  const dt = Math.min((t - last) / 1000, 0.1);
  last = t;
  timeU.value = reduceMotion ? 0 : t / 1000;
  for (const v of views) if (v.visible) v.frame(dt);
}
requestAnimationFrame(loop);
