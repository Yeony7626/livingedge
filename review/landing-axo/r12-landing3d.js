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
  age.fx.uAge.value = y;
  yrOut.textContent = y;
  const ys = DATA.ageing.years, idx = ys.length - 1 - [...ys].reverse().findIndex((v) => y >= v);
  ageNotes.innerHTML = DATA.ageing.notes[idx].map((t) => `<p>${t}</p>`).join("");
  document.querySelectorAll(".ticks button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.y === ys[idx]));
}
yr.addEventListener("input", () => setYear(+yr.value));
document.querySelectorAll(".ticks button").forEach((b) => (b.onclick = () => { yr.value = b.dataset.y; setYear(+b.dataset.y); }));
setYear(0);
watch(ageCv, { frame() { if (!age.resize()) return; age.fit(...age.size()); age.render(); } });

// ================= rain: a westerly storm on the edge =================
// Wind-driven drops travel on slanted tracks and stop at the first surface they meet (canopy, cedar above it, fascia,
// lower glass, landing, meadow); splash rings where they land. While it rains, light goes overcast, the faces the rain
// reaches darken and gloss (they dry slowly after), the lower glass runs with drops, and the routes run on the cut.
const rainCv = document.getElementById("rain-cv"), rainSec = document.getElementById("rain"), rainBtn = document.getElementById("rain-btn"), storm = document.querySelector(".rainframe .storm");
const rain = createView({ canvas: rainCv, model, meadowIn: 0 });
// tracks in model mm: x(y) = x0 + SLANT * (TOP - y)
const SLANT = 0.24, TOP = BOX.y[1] + 500, GLASS_X = 160, CAN = { x: [-757, -94], top: 2965, under: 2795 };
const SURF = (x) => (x < -3460 ? -105 : x < -171 ? -8 : -20);
function track(x0) {
  const at = (y) => x0 + SLANT * (TOP - y), yAt = (x) => TOP - (x - x0) / SLANT;
  if (x0 > -94) return null;                                                   // over the roof: not this drawing
  const yWall = yAt(-94);
  if (yWall > CAN.top && yWall < TOP) return { end: [-94, yWall], kind: "wall" };          // the cedar above the canopy
  const xc = at(CAN.top);
  if (xc >= CAN.x[0] && xc <= CAN.x[1]) return { end: [xc, CAN.top], kind: "canopy" };
  const yF = yAt(CAN.x[0]);
  if (yF <= CAN.top && yF >= CAN.under) return { end: [CAN.x[0], yF], kind: "fascia" };
  const yG = yAt(GLASS_X);
  if (yG > 30 && yG < CAN.under) return { end: [GLASS_X, yG], kind: "glass" };        // wind-driven onto the lower glass
  for (let y = Math.min(CAN.under, TOP); y > BOX.y[0]; y -= 5) { const x = at(y); if (y <= SURF(x)) return x < GLASS_X ? { end: [x, SURF(x)], kind: "ground" } : null; }
  return null;
}
const DROPS = [], SPL = [];
for (let tries = 0; DROPS.length < 2200 && tries < 20000; tries++) {
  const x0 = BOX.x[0] - SLANT * (TOP - BOX.y[0]) + rnd() * (-94 - BOX.x[0] + SLANT * (TOP - BOX.y[0])), w = BOX.w[0] + rnd() * (BOX.w[1] - BOX.w[0]);
  const t = track(x0);
  if (!t || t.end[0] < BOX.x[0] + 20) continue;
  const ph = rnd(), big = rnd() < 0.15;
  // start where the track enters the air above the block (left edge clipped so the field reads as a volume)
  const sx = Math.max(x0, BOX.x[0]), sy = sx === x0 ? TOP : TOP - (sx - x0) / SLANT;
  DROPS.push({ a: [sx * S, sy * S, w * S], b: [t.end[0] * S, t.end[1] * S, w * S], ph, len: big ? 0.2 : 0.1 + rnd() * 0.08, width: big ? 0.9 : 0.4, bright: 0.35 + rnd() * 0.55, kind: t.kind });
}
// drips off the canopy edge: heavier, slower beads straight down onto the landing
for (let i = 0; i < 70; i++) { const w = BOX.w[0] + rnd() * (BOX.w[1] - BOX.w[0]); DROPS.push({ a: [-0.766, 2.79, w * S], b: [-0.766 - 0.02, -0.008, w * S], ph: rnd(), len: 0.05, width: 2.2, bright: 1, kind: "drip" }); }
const quad = new THREE.InstancedBufferGeometry();
quad.setAttribute("position", new THREE.Float32BufferAttribute([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0], 3));
quad.setIndex([0, 1, 2, 2, 1, 3]);
const fa = (k, n) => new THREE.InstancedBufferAttribute(new Float32Array(DROPS.flatMap(k)), n);
quad.setAttribute("aA", fa((d) => d.a, 3));
quad.setAttribute("aB", fa((d) => d.b, 3));
quad.setAttribute("aP", fa((d) => [d.ph, d.len, d.width, d.bright], 4));
quad.setAttribute("aV", fa((d) => [d.kind === "drip" ? 4.5 : 8.5], 1));
quad.instanceCount = DROPS.length;
const rainU = { uTime: timeU, uAlpha: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } };
const DROP_VERT = `attribute vec3 aA; attribute vec3 aB; attribute vec4 aP; attribute float aV; uniform float uTime; uniform vec2 uRes; varying float vV; varying float vU; varying float vA;
float phase() { float d = length(aB - aA); return fract(uTime * aV / d + aP.x); }`;
const drops = new THREE.Mesh(quad, new THREE.ShaderMaterial({
  uniforms: rainU, transparent: true, depthWrite: false, side: THREE.DoubleSide,   // the screen-space quad winds either way
  vertexShader: DROP_VERT + `
  void main() {
    float d = length(aB - aA), t = phase();
    vec3 dir = (aB - aA) / d, head = aA + dir * d * t, tail = head - dir * min(aP.y, d * t);
    vec4 ch = projectionMatrix * viewMatrix * vec4(head, 1.0), ct = projectionMatrix * viewMatrix * vec4(tail, 1.0);
    vec2 sd = normalize((ch.xy - ct.xy) * uRes + vec2(0.0, 1e-4)), perp = vec2(-sd.y, sd.x);
    vec4 c = projectionMatrix * viewMatrix * vec4(mix(tail, head, position.y), 1.0);
    c.xy += perp * position.x * (aP.z + 0.6) / uRes * 2.0;
    gl_Position = c; vV = position.y; vU = position.x; vA = aP.w * smoothstep(0.0, 0.05, t);
  }`,
  fragmentShader: `uniform float uAlpha; varying float vV; varying float vU; varying float vA;
  void main() { float a = uAlpha * vA * pow(vV, 1.2) * (1.0 - smoothstep(0.35, 1.0, abs(vU))); gl_FragColor = vec4(0.94, 0.96, 0.99, a); }`,
}));
drops.frustumCulled = false;
drops.renderOrder = 30;
rain.scene.add(drops);
// splash rings where drops land, in step with each drop's arrival (an ellipse: rings lie on the ground)
const splashGeo = new THREE.BufferGeometry(), landed = DROPS.filter((d) => d.kind !== "glass");
splashGeo.setAttribute("position", new THREE.Float32BufferAttribute(landed.flatMap((d) => d.b), 3));
splashGeo.setAttribute("aA", new THREE.Float32BufferAttribute(landed.flatMap((d) => d.a), 3));
splashGeo.setAttribute("aB", new THREE.Float32BufferAttribute(landed.flatMap((d) => d.b), 3));
splashGeo.setAttribute("aP", new THREE.Float32BufferAttribute(landed.flatMap((d) => [d.ph, d.len, d.width, d.bright]), 4));
splashGeo.setAttribute("aV", new THREE.Float32BufferAttribute(landed.map((d) => (d.kind === "drip" ? 4.5 : 8.5)), 1));
const splashes = new THREE.Points(splashGeo, new THREE.ShaderMaterial({
  uniforms: { ...rainU, uDpr: { value: 1 } }, transparent: true, depthWrite: false,
  vertexShader: DROP_VERT + ` uniform float uDpr; varying float vAge;
  void main() { float t = phase(); vAge = t / 0.14; vA = aP.w * step(t, 0.14); gl_Position = projectionMatrix * viewMatrix * vec4(aB + vec3(0.0, 0.004, 0.0), 1.0); gl_PointSize = (4.0 + 18.0 * vAge) * aP.z * uDpr; }`,
  fragmentShader: `uniform float uAlpha; varying float vA; varying float vAge;
  void main() { vec2 p = (gl_PointCoord - 0.5) * 2.0; p.y *= 2.2; float d = length(p); float ring = smoothstep(0.7, 0.86, d) * (1.0 - smoothstep(0.9, 1.0, d));
    float crown = (1.0 - smoothstep(0.0, 0.3, d)) * (1.0 - vAge); float a = uAlpha * vA * (ring + crown * 0.6) * (1.0 - vAge);
    if (a < 0.01) discard; gl_FragColor = vec4(0.92, 0.95, 0.98, a * 0.8); }`,
}));
splashes.frustumCulled = false;
splashes.renderOrder = 31;
rain.scene.add(splashes);
// water on the lower glass: beads and running drops on the outer pane, densest at the foot where the wind drives it
const glassFilm = new THREE.Mesh(new THREE.PlaneGeometry((BOX.w[1] - BOX.w[0]) * S, 2.76).rotateY(-Math.PI / 2).translate(0.166, 1.41, ((BOX.w[0] + BOX.w[1]) / 2) * S),
  new THREE.ShaderMaterial({
    uniforms: { uTime: timeU, uWet: rain.fx.uWet }, transparent: true, depthWrite: false,
    vertexShader: `varying vec2 vP; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vP = vec2(w.z, w.y); gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform float uTime; uniform float uWet; varying vec2 vP;
    float h(float n) { return fract(sin(n * 127.1) * 43758.5); } float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }
    void main() {
      float col = floor(vP.x / 0.05), r = h(col), x = (col + 0.3 + 0.4 * h(col + 7.0)) * 0.05;
      float yd = mod(2.8 - uTime * (0.08 + 0.22 * r) - r * 9.0, 3.2) - 0.2;
      vec2 d = (vP - vec2(x, yd)) / vec2(0.006, 0.009);
      float drop = 1.0 - smoothstep(0.55, 1.0, length(d));
      float trail = step(yd, vP.y) * (1.0 - smoothstep(0.0, 0.5, vP.y - yd)) * (1.0 - smoothstep(0.0015, 0.003, abs(vP.x - x)));
      vec2 g = floor(vP / 0.022), o = (vec2(h2(g), h2(g + 1.3)) * 0.7 + 0.15) * 0.022;
      float bead = (1.0 - smoothstep(0.0025, 0.004, length(vP - g * 0.022 - o))) * step(h2(g + 9.1), 0.4);
      float cover = 1.0 - smoothstep(0.4, 2.2, vP.y);
      float a = (drop * 0.9 + trail * 0.35 + bead * 0.55) * cover * uWet;
      if (a < 0.01) discard; gl_FragColor = vec4(0.95, 0.97, 1.0, a * 0.75);
    }`,
  }));
glassFilm.renderOrder = 25;
rain.scene.add(glassFilm);
// the routes, traced on the cut face (the corner route runs beyond this cut, at the water corner, and is listed only)
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
let raining = false, storminess = 0;
const on = () => { raining = true; rainSec.classList.add("raining"); }, off = () => { raining = false; rainSec.classList.remove("raining"); };
rainBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); on(); });
["pointerup", "pointerleave", "pointercancel"].forEach((t) => rainBtn.addEventListener(t, off));
rainBtn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); on(); } });
rainBtn.addEventListener("keyup", off);
watch(rainCv, {
  frame(dt) {
    if (!rain.resize()) return;
    const ease = (v, to, rate) => v + (to - v) * Math.min(1, dt * rate);
    storminess = ease(storminess, raining ? 1 : 0, 2.5);
    rainU.uAlpha.value = ease(rainU.uAlpha.value, raining ? 1 : 0, 5);
    // wetting is quick, drying is slow
    rain.fx.uWet.value = raining ? Math.min(1, rain.fx.uWet.value + dt * 0.6) : Math.max(0, rain.fx.uWet.value - dt * 0.07);
    rain.weather(storminess);
    storm.style.opacity = storminess.toFixed(3);
    for (const m of flowMats) { m.opacity = 0.35 + 0.65 * storminess; if (raining && !reduceMotion) m.dashOffset -= dt * 0.35; }
    rain.fit(...rain.size());
    const dpr = Math.min(devicePixelRatio, 2), [W, H] = rain.size();
    rainU.uRes.value.set(W, H);
    splashes.material.uniforms.uDpr.value = dpr;
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
