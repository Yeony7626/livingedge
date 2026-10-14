// Landing page views, all drawn by edge3d.js from the same model: hero (explodes on scroll, then a winter night),
// ageing (0 to 30 years), rain (a westerly storm), winter (the computed temperature field), build (stage by stage).
// Drawing conventions follow research/17-graphic-standard.md. aged() / growth() come from landing.js.
// landing.html?embed=hero shows the hero alone with its own controls (the tool's 3D tab).
import * as THREE from "three";

const DATA = window.LANDING, reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const embed = new URLSearchParams(location.search).get("embed");
if (embed) document.body.classList.add("embed");
const model = buildModel(DATA.parts);
const views = [];
function watch(el, v) { v.visible = false; new IntersectionObserver(([e]) => (v.visible = e.isIntersecting)).observe(el); views.push(v); }
const V3 = (x, y, w = CUTW) => new THREE.Vector3(x * S, y * S, w * S);   // model mm -> world

// ================= drawing furniture shared by every view: datums, scale bar, orientation (research 17 §1, §3) =================
const DATUMS = [[0, "±0.000 FFL"], [2785, "+2.785 HEAD"], [-530, "−0.530 U/S BEAM"]];
function furniture(view, { datums = true, scale = true, compass = true, light = false } = {}) {
  const [W, H] = view.size(), ink = light ? "#d9dee4" : "#1E1E1E";
  let s = `<g class="furn" style="--ink:${ink}">`;
  if (datums) for (const [y, label] of DATUMS) {
    const [x, py] = view.project(V3(BOX.x[0], y, BOX.w[0])), x0 = Math.max(12, x - 150);
    s += `<path d="M${x0} ${py} H${x - 10}" class="datum"/><path d="M${x0 + 10} ${py} l-4.5 -7 h9 z" class="tri"/><text x="${x0 + 20}" y="${py - 5}">${label}</text>`;
  }
  if (scale) {   // 1 m along the cut, drawn on the cut's own axis (the scale of an axo holds along its axes)
    const a = view.project(V3(BOX.x[1] - 1000, BOX.y[0] - 260)), b = view.project(V3(BOX.x[1], BOX.y[0] - 260)), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    s += `<path d="M${a[0]} ${a[1]} L${m[0]} ${m[1]}" class="sb fill"/><path d="M${m[0]} ${m[1]} L${b[0]} ${b[1]}" class="sb"/>`
      + `<text x="${a[0]}" y="${a[1] + 16}">0</text><text x="${m[0]}" y="${m[1] + 16}">0.5</text><text x="${b[0]}" y="${b[1] + 16}">1 M</text>`;
  }
  if (compass) {
    const w = view.project(V3(BOX.x[0], BOX.y[0] - 120)), e = view.project(V3(BOX.x[1], BOX.y[0] - 120));   // under the two ends of the cut
    s += `<g class="ori"><circle cx="${w[0]}" cy="${w[1]}" r="9"/><text x="${w[0]}" y="${w[1] + 4}" text-anchor="middle">W</text></g><g class="ori"><circle cx="${e[0]}" cy="${e[1]}" r="9"/><text x="${e[0]}" y="${e[1] + 4}" text-anchor="middle">E</text></g>`;
  }
  return s + "</g>";
}
const setSvg = (svg, view, inner) => { const [W, H] = view.size(); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.innerHTML = inner; };

// ================= hero: construction layers lifted apart by scroll, then a winter night =================
const GAP = 0.42;   // equal steps between layers (research 17 §5)
const LAYERS = [
  { name: "Subgrade and drains", lift: 0, at: "subgrade" },
  { name: "Grade beam, slab on graphite EPS", lift: 1, at: "slab" },
  { name: "Landing, liner, planting bed", lift: 1, at: "pavers-lined" },
  { name: "Warm sill, 12 mm threshold", lift: 2, at: "sill-block", focus: true },
  { name: "Lift-and-slide door", lift: 3, at: "glass-2" },
  { name: "Glulam head, canopy, cedar", lift: 4, at: "glulam" },
];
const layerOf = (p) => FOCUS_IDS.has(p.id) ? 3 : p.id === "subgrade-far" ? 2 : p.junction === "E" ? 0 : p.junction === "F" || p.junction === "T" ? 1
  : /^[MPIJ]$/.test(p.junction) ? 2 : p.junction === "D" ? 4 : 5;
const heroCv = document.getElementById("hero-ink"), notes = document.getElementById("hero-notes"), lensCv = document.getElementById("hero-lens");
const hero = createView({ canvas: heroCv, model, groups: LAYERS, groupOf: layerOf, meadowIn: 2, col: 300, therm: DATA.therm, bc: DATA.bc });
const heroEl = document.querySelector(".hero"), heroCold = document.getElementById("hero-cold");
// detail lens: the hero scene through a tighter camera, centred on the step from the landing tray to the running rail
const LENS = { at: V3(70, -30), span: 0.36, ring: 14, cam: null };
const lensRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: lensCv });
Object.assign(lensRenderer, { localClippingEnabled: true, toneMapping: THREE.AgXToneMapping, toneMappingExposure: 0.95 });
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
  LENS.cam = cam;
  hero.render(cam, size, size, lensRenderer);
  lensDone = true;
}
// the 12 mm, measured: tray slips top -7 to running rail top +5 (sliding panel, research 14)
function lensMarks(lb, hb) {
  if (!LENS.cam) return "";
  const size = lb.width, ox = lb.left - hb.left, oy = lb.top - hb.top;
  const P = (x, y) => { const q = V3(x, y).project(LENS.cam); return [ox + ((q.x + 1) / 2) * size, oy + ((1 - q.y) / 2) * size]; };
  const t = P(83.5, -7), r = P(205, 5), dx = 150, a = P(dx, -7), b = P(dx, 5);
  const mm = size / (LENS.span * 1000), sb0 = [ox + size * 0.3, oy + size * 0.86];
  return `<g class="dim"><path d="M${t[0]} ${t[1]} L${a[0] - 4} ${a[1]} M${r[0]} ${r[1]} L${b[0] - 4} ${b[1]}" class="ext"/><path d="M${a[0]} ${a[1] + 8} L${b[0]} ${b[1] - 8}"/>`
    + `<path d="M${a[0] - 3} ${a[1] + 3} l6 -6 M${b[0] - 3} ${b[1] + 3} l6 -6"/><text x="${a[0] + 8}" y="${(a[1] + b[1]) / 2 + 4}">12</text></g>`
    + `<g class="lsb"><path d="M${sb0[0]} ${sb0[1]} h${25 * mm}" class="fill"/><path d="M${sb0[0] + 25 * mm} ${sb0[1]} h${25 * mm}"/><text x="${sb0[0]}" y="${sb0[1] - 6}">0</text><text x="${sb0[0] + 50 * mm}" y="${sb0[1] - 6}" text-anchor="end">50 MM</text></g>`;
}
// scroll phases through the pinned hero: explode (0.06-0.30), reassemble (0.46-0.62), winter night (0.70-0.86)
const embedX = document.getElementById("embed-x"), embedN = document.getElementById("embed-n");
function heroProgress() {
  if (embed) return [+(embedX?.value ?? 0), embedN?.getAttribute("aria-pressed") === "true" ? 1 : 0];
  if (reduceMotion || matchMedia("(max-width: 900px)").matches) return [0, 0];
  const r = heroEl.getBoundingClientRect(), p = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
  const ease = (t) => t * t * (3 - 2 * t), span = (a, b) => ease(Math.min(Math.max((p - a) / (b - a), 0), 1));
  return [span(0.06, 0.3) - span(0.46, 0.62), span(0.7, 0.86)];
}
function heroNotes(f, wn) {
  const [W, H] = hero.size();
  let s = "";
  if (f > 0.02) {
    // tags numbered bottom-up by where the layers sit; solid leaders (dashes are reserved for confidence)
    const pts = LAYERS.map((l, i) => {
      const g = hero.groups[i], a = g.anchors[l.at];
      if (!a) return null;
      const home = V3(...innerPoint(a.poly)), top = hero.project(home.clone().add(new THREE.Vector3(0, g.dy, 0)));
      return { l, a: top, home: hero.project(home), dy: g.dy };
    }).filter(Boolean).sort((m, n) => n.a[1] - m.a[1]);
    const colX = W - 300 + 40, ys = pts.map((n) => n.a[1]);
    for (let k = 1; k < ys.length; k++) ys[k] = Math.min(ys[k], ys[k - 1] - 26);   // bottom-up: each tag at least 26 px above the last
    const o = Math.min(1, (f - 0.02) * 2.5);
    pts.forEach((n, k) => {
      if (n.dy > 0.001) s += `<path d="M${n.home[0]} ${n.home[1]} L${n.a[0]} ${n.a[1]}" class="conn" style="opacity:${o}"/>`;
      s += `<g class="xnote${n.l.focus ? " focus" : ""}" style="opacity:${o}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="3"/><path d="M${n.a[0]} ${n.a[1]} L${colX - 40} ${ys[k]} H${colX - 34}"/>`
        + `<circle cx="${colX - 25}" cy="${ys[k]}" r="9" class="tag"/><text class="k" x="${colX - 25}" y="${ys[k] + 3.5}" text-anchor="middle">${String(k + 1).padStart(2, "0")}</text><text x="${colX - 8}" y="${ys[k] + 3.5}">${n.l.name.toUpperCase()}</text></g>`;
    });
  }
  const lb = lensCv.getBoundingClientRect(), hb = notes.getBoundingClientRect(), lo = Math.max(0, 1 - f * 1.6 - wn * 2);
  if (lb.width && lo > 0.01) {
    const lc = [lb.left - hb.left + lb.width / 2, lb.top - hb.top + lb.height / 2], r = lb.width / 2, t = hero.project(LENS.at.clone().add(new THREE.Vector3(0, hero.groups[3].dy, 0)));
    const d = Math.hypot(t[0] - lc[0], t[1] - lc[1]), e = [lc[0] + ((t[0] - lc[0]) / d) * r, lc[1] + ((t[1] - lc[1]) / d) * r], q = [t[0] - ((t[0] - e[0]) / d) * LENS.ring, t[1] - ((t[1] - e[1]) / d) * LENS.ring];
    s += `<g class="lensnote" style="opacity:${lo}"><circle cx="${t[0]}" cy="${t[1]}" r="${LENS.ring}" class="ring"/><path d="M${e[0]} ${e[1]} L${q[0]} ${q[1]}"/><text x="${lc[0] - r}" y="${lc[1] + r + 20}">A &#183; THRESHOLD AT THE SLIDING PANEL</text>${lensMarks(lb, hb)}</g>`;
  }
  if (f < 0.02) s += furniture(hero, { light: wn > 0.5 });
  setSvg(notes, hero, s);
}
watch(heroCv, {
  frame() {
    if (!hero.resize()) return;
    const [f, wn] = heroProgress();
    document.documentElement.style.setProperty("--xp", f.toFixed(3));
    document.documentElement.style.setProperty("--wn", wn.toFixed(3));
    hero.night(wn);
    hero.fx.uTherm.value = wn;
    hero.groups.forEach((g) => hero.lift(g, g.def.lift * GAP * f));
    hero.fit(...hero.size(), Math.max(...LAYERS.map((l) => l.lift)) * GAP * f, embed ? 300 * f : 300 * f);
    if (!lensDone && f === 0 && !embed) drawLens();
    hero.render();
    heroNotes(f, wn);
    if (wn > 0.01) coldMarks(hero, heroCold, wn); else if (heroCold.innerHTML) heroCold.innerHTML = "";
  },
});
addEventListener("resize", () => { lensDone = false; });

// ================= ageing: finishes weather, the bed grows in; changed elements tagged with the year =================
const ageCv = document.getElementById("age-cv"), ageOvl = document.getElementById("age-ovl"), yr = document.getElementById("year"), yrOut = document.getElementById("year-out"), ageNotes = document.getElementById("age-notes");
const age = createView({ canvas: ageCv, model, meadowIn: 0 });
const mix = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
// the reviewers' notes, minus raw RGB values and what this fragment does not show (the tree and rain garden lie outside it)
const noteText = (t) => t.split(/(?<=\.)\s+/).filter((x) => !/tree|sediment|rain-garden|forebay|bloom/i.test(x)).join(" ").replace(/\s*\d{2,3},\d{2,3},\d{2,3}\s*/g, " ").trim();
const AGE_TAGS = [[V3(-94, 3120, 1400), "SPLASH BAND OVER THE CAP"], [V3(-94, 3500, 1400), "CEDAR SILVERED"], [V3(-757, 0, 1400), "ALGAE LINE UNDER THE DRIP"]];
let ageYear = 0;
function setYear(y) {
  ageYear = y;
  for (const [mat, m] of age.groups[0].mats) {
    const a = aged(mat, y);
    m.color.copy(a ? mix(m.userData.tone, a, Math.min(1, y / 5) * 0.85) : new THREE.Color(m.userData.tone));   // most of the change happens in the first five years
  }
  age.plants?.grow(growth("bed-plant", y));
  age.fx.uAge.value = y;
  yrOut.textContent = y;
  const ys = DATA.ageing.years, idx = ys.length - 1 - [...ys].reverse().findIndex((v) => y >= v);
  ageNotes.innerHTML = DATA.ageing.notes[idx].map(noteText).filter(Boolean).map((t) => `<p>${t}</p>`).join("") + `<p class="aside">The tree and the rain garden lie outside this fragment.</p>`;
  document.querySelectorAll(".ticks button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.y === ys[idx]));
}
yr.addEventListener("input", () => setYear(+yr.value));
document.querySelectorAll(".ticks button").forEach((b) => { b.style.left = `${(+b.dataset.y / 30) * 100}%`; b.onclick = () => { yr.value = b.dataset.y; setYear(+b.dataset.y); }; });
setYear(0);
watch(ageCv, {
  frame() {
    if (!age.resize()) return;
    age.fit(...age.size());
    age.render();
    let s = furniture(age, { datums: false });
    if (ageYear >= 1) {
      const [W] = age.size();
      AGE_TAGS.forEach(([p, label], i) => {
        const [x, y] = age.project(p), lx = W - 230, ly = 70 + i * 26;
        s += `<g class="ytag"><circle cx="${x}" cy="${y}" r="3"/><path d="M${x} ${y} L${lx - 12} ${ly} H${lx - 4}"/><text x="${lx}" y="${ly + 4}">YR ${ageYear} &#183; ${label}</text></g>`;
      });
    }
    setSvg(ageOvl, age, s);
  },
});

// ================= rain: a westerly storm on the edge =================
// Wind-driven drops travel on slanted tracks and stop at the first surface they meet (canopy, cedar above it, fascia,
// lower glass, landing, meadow). While it rains, light goes overcast, the faces the rain reaches darken and gloss (they
// dry slowly after), the lower glass runs with drops, and the routes run on the cut with arrows in the flow direction.
const rainCv = document.getElementById("rain-cv"), rainOvl = document.getElementById("rain-ovl"), rainSec = document.getElementById("rain"), rainBtn = document.getElementById("rain-btn");
const rain = createView({ canvas: rainCv, model, meadowIn: 0, margin: 0.08 });
const SLANT = 0.27, TOP = BOX.y[1] + 500, GLASS_X = 160, CAN = { x: [-757, -94], top: 2965, under: 2795 };   // about 75 degrees
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
const DROPS = [];
for (let tries = 0; DROPS.length < 650 && tries < 20000; tries++) {
  const x0 = BOX.x[0] - SLANT * (TOP - BOX.y[0]) + rnd() * (-94 - BOX.x[0] + SLANT * (TOP - BOX.y[0])), w = BOX.w[0] + rnd() * (BOX.w[1] - BOX.w[0]);
  const t = track(x0);
  if (!t || t.end[0] < BOX.x[0] + 20) continue;
  const sx = Math.max(x0, BOX.x[0]), sy = sx === x0 ? TOP : TOP - (sx - x0) / SLANT;
  DROPS.push({ a: [sx * S, sy * S, w * S], b: [t.end[0] * S, t.end[1] * S, w * S], ph: rnd(), len: 0.12 + rnd() * 0.1, width: 0.3 + rnd() * 0.12, bright: 0.18 + rnd() * 0.1, kind: t.kind });
}
for (let i = 0; i < 40; i++) { const w = BOX.w[0] + rnd() * (BOX.w[1] - BOX.w[0]); DROPS.push({ a: [-0.766, 2.79, w * S], b: [-0.786, -0.008, w * S], ph: rnd(), len: 0.05, width: 0.6, bright: 0.45, kind: "drip" }); }
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
const drops = new THREE.Mesh(quad, new THREE.ShaderMaterial({
  uniforms: rainU, transparent: true, depthWrite: false, side: THREE.DoubleSide,   // the screen-space quad winds either way
  vertexShader: `attribute vec3 aA; attribute vec3 aB; attribute vec4 aP; attribute float aV; uniform float uTime; uniform vec2 uRes; varying float vV; varying float vU; varying float vA;
  void main() {
    float d = length(aB - aA), t = fract(uTime * aV / d + aP.x);
    vec3 dir = (aB - aA) / d, head = aA + dir * d * t, tail = head - dir * min(aP.y, d * t);
    vec4 ch = projectionMatrix * viewMatrix * vec4(head, 1.0), ct = projectionMatrix * viewMatrix * vec4(tail, 1.0);
    vec2 sd = normalize((ch.xy - ct.xy) * uRes + vec2(0.0, 1e-4)), perp = vec2(-sd.y, sd.x);
    vec4 c = projectionMatrix * viewMatrix * vec4(mix(tail, head, position.y), 1.0);
    c.xy += perp * position.x * aP.z / uRes * 2.0;
    gl_Position = c; vV = position.y; vU = position.x; vA = aP.w * smoothstep(0.0, 0.05, t);
  }`,
  fragmentShader: `uniform float uAlpha; varying float vV; varying float vU; varying float vA;
  void main() { float a = uAlpha * vA * pow(vV, 1.2) * (1.0 - smoothstep(0.5, 1.0, abs(vU))); gl_FragColor = vec4(0.97, 0.98, 1.0, a); }`,
}));
drops.frustumCulled = false;
drops.renderOrder = 30;
rain.scene.add(drops);
rain.noAO.push(drops);
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
      if (a < 0.01) discard; gl_FragColor = vec4(0.95, 0.97, 1.0, a * 0.7);
    }`,
  }));
glassFilm.renderOrder = 25;
rain.scene.add(glassFilm);
rain.noAO.push(glassFilm);
// routes on the cut face, drawn as polylines with arrowheads every 80 px in the flow direction (research 17 §6);
// weight by share of flow. The glass route is drawn 12 mm outboard of the pane so it reads as outside.
const ROUTES = DATA.flows.filter((f) => !f.beyond).map((f, i) => ({ ...f, wt: i === 0 ? 1.5 : 2.5, path: f.path.map(([x, y]) => [x >= 150 && x <= 175 ? x - 12 : x, y]) }));
function routeSvg(view, phase, alpha) {
  let s = "";
  for (const r of ROUTES) {
    const pts = r.path.map(([x, y]) => view.project(V3(x, y)));
    s += `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" class="route" style="stroke-width:${r.wt};opacity:${alpha}"/>`;
    let acc = -((phase * 80) % 80);
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / (L || 1), uy = (y1 - y0) / (L || 1);
      for (let d = 80 - (acc % 80 + 80) % 80; d < L; d += 80) {
        const x = x0 + ux * d, y = y0 + uy * d;
        s += `<path d="M${x - ux * 6 - uy * 3.5} ${y - uy * 6 + ux * 3.5} L${x} ${y} L${x - ux * 6 + uy * 3.5} ${y - uy * 6 - ux * 3.5}" class="arrow" style="opacity:${alpha}"/>`;
      }
      acc += L;
    }
  }
  const drip = view.project(V3(-757, 2795));
  s += `<circle cx="${drip[0]}" cy="${drip[1]}" r="4" class="drip" style="opacity:${alpha}"/>`;
  const wa = view.project(V3(BOX.x[0] + 200, 3300)), wb = view.project(V3(BOX.x[0] + 200 + 0.27 * 700, 2600));
  s += `<g class="wind" style="opacity:${0.35 + 0.65 * alpha}"><path d="M${wa[0]} ${wa[1]} L${wb[0]} ${wb[1]}"/><path d="M${wb[0] - 7} ${wb[1] - 5} L${wb[0]} ${wb[1]} L${wb[0] - 1} ${wb[1] - 9}"/><text x="${wa[0] - 4}" y="${wa[1] - 10}">W &#183; WESTERLY</text></g>`;
  return s;
}
document.getElementById("routes").innerHTML =
  `<li><svg width="34" height="10" aria-hidden="true"><path d="M2 9 L8 1 M14 9 L20 1 M26 9 L32 1" stroke="#7d8a94" stroke-width=".75"/></svg><span>Rain, wind-driven from the west, about 75&#176;</span></li>`
  + ROUTES.map((f) => `<li><svg width="34" height="10" aria-hidden="true"><path d="M2 5 H32" stroke="#3D6E8F" stroke-width="${f.wt}"/><path d="M22 1 L28 5 L22 9" stroke="#3D6E8F" fill="none" stroke-width="1"/></svg><span>${f.label}</span></li>`).join("")
  + `<li><svg width="34" height="10" aria-hidden="true"><circle cx="17" cy="5" r="4" stroke="#3D6E8F" fill="none"/></svg><span>Drip edge at the canopy tip</span></li>`
  + DATA.flows.filter((f) => f.beyond).map((f) => `<li class="beyond"><svg width="34" height="10" aria-hidden="true"></svg><span>${f.label} (beyond this cut, at the water corner)</span></li>`).join("");
let raining = false, storminess = 0, routePhase = 0;
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
    rain.fx.uWet.value = raining ? Math.min(1, rain.fx.uWet.value + dt * 0.6) : Math.max(0, rain.fx.uWet.value - dt * 0.07);   // wetting is quick, drying is slow
    rain.weather(storminess);
    if (raining && !reduceMotion) routePhase += dt * 0.6;
    rain.fit(...rain.size());
    rainU.uRes.value.set(...rain.size());
    rain.render();
    setSvg(rainOvl, rain, furniture(rain, { datums: false }) + routeSvg(rain, routePhase, 0.4 + 0.6 * storminess));
  },
});

// ================= winter: a still -7 degC night against a 20 degC room, the computed field on the cut =================
// Only computed values are coloured: the fields are the thermal screening solved at this cut (build-landing.mjs).
const winterCv = document.getElementById("winter-cv"), winterNotes = document.getElementById("winter-notes"), fieldBtn = document.getElementById("field-btn");
const winter = createView({ canvas: winterCv, model, meadowIn: 0, therm: DATA.therm, bc: DATA.bc });
const HYGIENE = 0.7, CRIT = DATA.bc.Te + HYGIENE * (DATA.bc.Ti - DATA.bc.Te);   // PHI hygiene criterion (research 14): 11.9 degC at -7/20
let fieldOn = true, nightK = 0, fieldK = 0;
fieldBtn.addEventListener("click", () => { fieldOn = !fieldOn; fieldBtn.setAttribute("aria-pressed", fieldOn); fieldBtn.textContent = fieldOn ? "Hide the field" : "Show the field"; });
function coldMarks(view, svg, alpha) {
  let s = "";
  for (const t of DATA.therm) {
    // the solved crop: its edges are adiabatic cut lines, framed so the field's hard edge reads as the model boundary
    const c = [[t.box[0], t.box[1]], [t.box[2], t.box[1]], [t.box[2], t.box[3]], [t.box[0], t.box[3]]].map(([x, y]) => view.project(V3(x, y)));
    s += `<polygon points="${c.map((p) => p.join(",")).join(" ")}" class="crop" style="opacity:${alpha}"/>`;
    const [x, y] = view.project(V3(t.coldest.x, t.coldest.y)), bad = t.fRsi < HYGIENE;
    const dx = x > view.size()[0] * 0.55 ? -1 : 1, lx = x + dx * 70, ly = y - 34;
    s += `<g class="cold${bad ? " bad" : ""}" style="opacity:${alpha}"><circle cx="${x}" cy="${y}" r="7"/><circle cx="${x}" cy="${y}" r="1.8" class="dot"/>`
      + `<path d="M${x + dx * 6} ${y - 4} L${lx} ${ly} H${lx + dx * 8}"/><text x="${lx + dx * 12}" y="${ly + 4}" text-anchor="${dx > 0 ? "start" : "end"}">${t.name.toUpperCase()} ${t.coldest.T.toFixed(1)} &#176;C &#183; f<tspan dy="3" font-size="8">Rsi</tspan><tspan dy="-3"> ${t.fRsi.toFixed(2)}</tspan></text></g>`;
  }
  const a = view.project(V3(DATA.therm[0].box[0], DATA.therm[0].box[1]));
  s += `<text x="${a[0] + 4}" y="${a[1] + 14}" class="croplabel" style="opacity:${alpha}">ADIABATIC CROP (SOLVED AREA)</text>`;
  s += furniture(view, { light: true, scale: false });
  setSvg(svg, view, s);
}
// vertical stepped legend: 2 degC bands of the same inferno map, ticks every 5 degC, special isotherms marked
{
  const inferno = (t) => {
    const c = [[0.0002189, 0.001651, -0.01948], [0.1065134, 0.5639564, 3.9327124], [11.6024931, -3.9728540, -15.9423941], [-41.7039961, 17.4363989, 44.3541452], [77.1629357, -33.4023589, -81.8073093], [-71.3194282, 32.6260643, 73.2095199], [25.1311262, -12.2426690, -23.0703250]];
    return [0, 1, 2].map((k) => Math.round(255 * Math.min(1, Math.max(0, c.reduceRight((acc, ci) => acc * t + ci[k], 0)))));
  };
  const { Te, Ti } = DATA.bc, band = [];
  for (let T = Math.floor(Ti / 2) * 2; T >= Te - 1; T -= 2) band.push(`<i style="background:rgb(${inferno((T + 1 - Te) / (Ti - Te)).join(",")})"></i>`);
  const pos = (T) => `${((Ti - T) / (Ti - Te)) * 100}%`;
  document.getElementById("tlegend").innerHTML = `<div class="steps">${band.join("")}</div><div class="marks">`
    + [20, 15, 10, 5, 0, -5].map((T) => `<span style="top:${pos(T)}">${T} &#176;C</span>`).join("")
    + `<span class="special" style="top:${pos(CRIT)}">${CRIT.toFixed(1)} &#176;C &#183; f<sub>Rsi</sub> 0.70</span><span class="special" style="top:${pos(0)}">0 &#176;C</span></div>`
    + `<p class="lcap">Computed, 2 &#176;C bands. Outside ${Te} &#176;C, inside ${Ti} &#176;C (ISO 13788). Lowest f<sub>Rsi</sub> ${Math.min(...DATA.therm.map((t) => t.fRsi)).toFixed(2)}.</p>`;
}
document.getElementById("winter-stats").innerHTML = DATA.therm.map((t) => `<div class="${t.fRsi < HYGIENE ? "bad" : ""}"><b>${t.fRsi.toFixed(2)}</b><small>${t.name.toLowerCase()} f<sub>Rsi</sub>, coldest ${t.coldest.T.toFixed(1)} &#176;C${t.fRsi < HYGIENE ? ", under 0.70" : ""}</small></div>`).join("");
watch(winterCv, {
  frame(dt) {
    if (!winter.resize()) return;
    nightK = Math.min(1, nightK + dt * 0.8);
    fieldK += ((fieldOn ? 1 : 0) - fieldK) * Math.min(1, dt * 4);
    winter.night(nightK);
    winter.fx.uTherm.value = fieldK * nightK;
    winter.fit(...winter.size());
    winter.render();
    coldMarks(winter, winterNotes, fieldK * nightK);
  },
});

// ================= build: the stages arrive in the order they are built; later stages ghosted =================
const buildCv = document.getElementById("build-cv"), buildOvl = document.getElementById("build-ovl"), stageNum = document.getElementById("stage-num"), stageName = document.getElementById("stage-name");
const stageDefs = DATA.stages.map(() => ({}));
const build = createView({ canvas: buildCv, model, groups: stageDefs, groupOf: (p) => Math.min(Math.max(p.step ?? 0, 0), stageDefs.length - 1), meadowIn: stageDefs.length - 1 });
// ghost: 15 % unlit-looking context, no cut caps or ink, so nothing floats unsupported (research 17 §5)
function ghost(g, on) {
  if (g.ghost === on) return;
  g.ghost = on;
  g.node.traverse((o) => {
    if (o === g.node || !o.material) return;
    if (o.material.isShaderMaterial || o.isLineSegments2 || o.isInstancedMesh) { o.visible = !on; return; }
    const m = o.material;
    m.userData.base ??= { t: m.transparent, o: m.opacity, d: m.depthWrite };
    Object.assign(m, on ? { transparent: true, opacity: 0.15, depthWrite: false } : { transparent: m.userData.base.t, opacity: m.userData.base.o, depthWrite: m.userData.base.d });
    o.castShadow = !on && !m.userData.glass;
    m.needsUpdate = true;
  });
}
let shown = stageDefs.length - 1, arrive = 1;
function showStage(k) {
  shown = k; arrive = reduceMotion ? 1 : 0;
  stageNum.innerHTML = `${String(k + 1).padStart(2, "0")}<small> / ${stageDefs.length}</small>`;
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
    build.groups.forEach((g, i) => { ghost(g, i > shown); build.lift(g, i === shown ? (1 - e) * 0.6 : 0); });
    build.fit(...build.size(), 0.6);
    build.render();
    setSvg(buildOvl, build, furniture(build, { datums: false }));
  },
});

// ================= embed (the tool's 3D tab): the hero alone, explode and winter on controls =================
if (embed) {
  embedX?.addEventListener("input", () => {});
  embedN?.addEventListener("click", () => embedN.setAttribute("aria-pressed", embedN.getAttribute("aria-pressed") !== "true"));
}

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

// ================= review capture states: landing.html?shot=<state> puts the page in a fixed state =================
const shot = new URLSearchParams(location.search).get("shot");
if (shot) {
  const heroAt = (p) => scrollTo(0, heroEl.offsetTop + (heroEl.offsetHeight - innerHeight) * p);
  const go = (id) => document.getElementById(id).scrollIntoView({ block: "center" });
  const states = {
    hero: () => heroAt(0), explode: () => heroAt(0.38), "hero-winter": () => heroAt(0.95),
    age0: () => { go("age"); yr.value = 0; setYear(0); }, age30: () => { go("age"); yr.value = 30; setYear(30); },
    rain: () => { go("rain"); on(); }, winter: () => go("winter"), build: () => { go("build"); showStage(6); arrive = 1; },
  };
  addEventListener("load", () => setTimeout(() => states[shot]?.(), 300));
}
