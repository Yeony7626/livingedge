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
// [level mm, label, x of the element it belongs to]
const DATUMS = [[0, "\u00b10.000 FFL \u00b7 \u22120.007 LANDING", 240], [2785, "+2.785 HEAD", 150], [-530, "\u22120.530 U/S BEAM", 110], [-105, "\u22120.105 FINISHED GRADE (BED)", -3500]];
function furniture(view, { datums = true, scale = true, compass = true, light = false } = {}) {
  const [W, H] = view.size(), ink = light ? "#d9dee4" : "#1E1E1E";
  let s = `<g class="furn" style="--ink:${ink}">`;
  if (datums) {
    const ds = DATUMS.map(([y, label, xe]) => ({ label, a: view.project(V3(BOX.x[0] - 700, y)), b: view.project(V3(xe, y)) })).sort((m, n) => n.a[1] - m.a[1]);
    ds.forEach((d, k) => { d.ly = k ? Math.min(d.a[1], ds[k - 1].ly - 16) : d.a[1]; d.lx = Math.max(d.a[0] - 14, 24 + d.label.length * 6.9); });
    for (const d of ds) {
      s += `<path d="M${d.a[0]} ${d.a[1]} L${d.b[0]} ${d.b[1]}" class="datum"/><path d="M${d.a[0]} ${d.a[1] - 1} l-4.5 -7 h9 z" class="tri"/>`
        + (Math.abs(d.ly - d.a[1]) > 1 || d.lx > d.a[0] - 14 ? `<path d="${leader(d.a[0] - 6, d.a[1], d.lx + 4, d.ly)}"/>` : "")
        + `<text x="${d.lx}" y="${d.ly + 4}" text-anchor="end">${d.label}</text>`;
    }
  }
  if (scale) {   // 1 m along the cut, drawn on the cut's own axis (the scale of an axo holds along its axes)
    const a = view.project(V3(BOX.x[1] - 1000, BOX.y[0] - 260)), b = view.project(V3(BOX.x[1], BOX.y[0] - 260)), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    s += `<path d="M${a[0]} ${a[1]} L${m[0]} ${m[1]}" class="sb fill"/><path d="M${m[0]} ${m[1]} L${b[0]} ${b[1]}" class="sb"/>`
      + `<text x="${a[0]}" y="${a[1] + 16}">0</text><text x="${m[0]}" y="${m[1] + 16}">0.5</text><text x="${b[0]}" y="${b[1] + 16}">1 M</text>`;
  }
  if (compass) {   // W <-> E along the cut axis, under the scale bar
    const a = view.project(V3(BOX.x[1] - 1000, BOX.y[0] - 560)), b = view.project(V3(BOX.x[1], BOX.y[0] - 560)), L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
    const head = (p, sg) => `M${p[0] - sg * (ux * 7 - uy * 4)} ${p[1] - sg * (uy * 7 + ux * 4)} L${p[0]} ${p[1]} L${p[0] - sg * (ux * 7 + uy * 4)} ${p[1] - sg * (uy * 7 - ux * 4)}`;
    s += `<g class="ori"><path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]} ${head(b, 1)} ${head(a, -1)}"/><text x="${a[0] - 8}" y="${a[1] + 4}" text-anchor="end">W</text><text x="${b[0] + 8}" y="${b[1] + 4}">E</text></g>`;
  }
  return s.replace('<g class="furn"', `<g class="furn${light ? " light" : ""}"`) + "</g>";
}
// leader from an anchor (ax, ay) to a label end (lx, ly): one 45 degree leg at the anchor end, the rest horizontal
function leader(ax, ay, lx, ly) {
  const dy = ly - ay, dir = Math.sign(lx - ax) || 1, kx = ax + dir * Math.abs(dy);
  return (lx - kx) * dir > 0 ? `M${ax} ${ay} L${kx} ${ly} H${lx}` : `M${ax} ${ay} L${lx} ${ly}`;
}
const setSvg = (svg, view, inner) => { const [W, H] = view.size(); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.innerHTML = inner; };

// ================= hero: construction layers lifted apart by scroll, then a winter night =================
const GAP = 0.5;   // equal steps between layers (research 17 §5)
// zone letters as in the tool (E subgrade, F floor, M landing, T threshold, D door, H head); lift in GAP steps, side in m
const LAYERS = [
  { name: "Subgrade and drains", tag: "E", lift: 0, at: "subgrade", tint: "#dccfbd", right: true },
  { name: "Slab on graphite EPS", tag: "F", lift: 1, at: "slab", tint: "#e4e1da" },
  { name: "Landing, liner, planting bed", tag: "M", lift: 1, side: -0.7, at: "pavers-lined", tint: "#cfccc6", right: true },
  { name: "Warm sill, grade beam, 12 mm", tag: "T", lift: 2, at: "sill-block", focus: true, tint: "#f3d2c9" },
  { name: "Lift-and-slide door", tag: "D", lift: 3, at: "glass-2", tint: "#dde9ec" },
  { name: "Glulam head, canopy, cedar", tag: "H", lift: 4, at: "glulam", tint: "#ecdcbf" },
];
const layerOf = (p) => FOCUS_IDS.has(p.id) || p.junction === "T" ? 3 : p.id === "subgrade-far" ? 2 : p.junction === "E" || /^soil/.test(p.mat ?? "") && p.junction === "F" ? 0 : p.junction === "F" ? 1
  : /^[MPIJ]$/.test(p.junction) ? 2 : p.junction === "D" ? 4 : 5;
const heroCv = document.getElementById("hero-ink"), notes = document.getElementById("hero-notes"), lensCv = document.getElementById("hero-lens");
const hero = createView({ canvas: heroCv, model, groups: LAYERS, groupOf: layerOf, meadowIn: 2, col: 300, therm: DATA.therm, bc: DATA.bc, vignette: true });
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
  const s0 = P(-150, -110), s1 = P(-150, -85), s2 = P(-150, -60);   // 0-25-50 mm on the model's vertical axis
  return `<g class="dim"><path d="M${t[0]} ${t[1]} L${a[0] - 4} ${a[1]} M${r[0]} ${r[1]} L${b[0] - 4} ${b[1]}" class="ext"/><path d="M${a[0]} ${a[1] + 8} L${b[0]} ${b[1] - 8}"/>`
    + `<path d="M${a[0] - 3} ${a[1] + 3} l6 -6 M${b[0] - 3} ${b[1] + 3} l6 -6"/><text x="${b[0] - 6}" y="${b[1] - 12}" text-anchor="end">12</text></g>`
    + `<g class="lsb"><path d="M${s0[0]} ${s0[1]} L${s1[0]} ${s1[1]}" class="fill"/><path d="M${s1[0]} ${s1[1]} L${s2[0]} ${s2[1]}"/><text x="${s2[0] + 6}" y="${s2[1] + 3}">50 MM</text><text x="${s0[0] + 6}" y="${s0[1] + 3}">0</text></g>`;
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
      const ip = innerPoint(a.poly), xs = crossings(a.poly, 1, ip[1]), home = V3(...(l.right && xs.length ? [xs[xs.length - 1][1] - 150, ip[1]] : ip)), top = hero.project(home.clone().add(new THREE.Vector3(g.dx ?? 0, g.dy, 0)));
      return { l, a: top, home: hero.project(home), dy: g.dy + Math.abs(g.dx ?? 0) };
    }).filter(Boolean).sort((m, n) => n.a[1] - m.a[1]);
    const colX = W - 250, ys = pts.map((n) => n.a[1]);
    for (let k = 1; k < ys.length; k++) ys[k] = Math.min(ys[k], ys[k - 1] - 40);   // bottom-up: each tag at least 40 px above the last
    const o = Math.min(1, (f - 0.02) * 2.5);
    pts.forEach((n, k) => {
      if (n.dy > 0.001) s += `<path d="M${n.home[0]} ${n.home[1]} L${n.a[0]} ${n.a[1]}" class="conn" style="opacity:${o}"/>`;
      s += `<g class="xnote${n.l.focus ? " focus" : ""}" style="opacity:${o}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="3"/><path d="${leader(n.a[0], n.a[1], colX - 34, ys[k])}"/>`
        + `<circle cx="${colX - 25}" cy="${ys[k]}" r="9" class="tag"/><text class="k" x="${colX - 25}" y="${ys[k] + 3.5}" text-anchor="middle">${n.l.tag}</text><rect x="${colX - 2}" y="${ys[k] - 6}" width="12" height="12" fill="${n.l.tint}" stroke="#1E1E1E" stroke-width=".75"/><text x="${colX + 16}" y="${ys[k] + 3.5}">${n.l.name.toUpperCase()}</text></g>`;
    });
  }
  const lb = lensCv.getBoundingClientRect(), hb = notes.getBoundingClientRect(), lo = Math.max(0, 1 - f * 1.6 - wn * 2);
  if (lb.width && lo > 0.01) {
    const lc = [lb.left - hb.left + lb.width / 2, lb.top - hb.top + lb.height / 2], r = lb.width / 2, t = hero.project(LENS.at.clone().add(new THREE.Vector3(0, hero.groups[3].dy, 0)));
    const d = Math.hypot(t[0] - lc[0], t[1] - lc[1]), e = [lc[0] + ((t[0] - lc[0]) / d) * r, lc[1] + ((t[1] - lc[1]) / d) * r], de = Math.hypot(t[0] - e[0], t[1] - e[1]), q = [t[0] - ((t[0] - e[0]) / de) * LENS.ring, t[1] - ((t[1] - e[1]) / de) * LENS.ring];
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
    if (!stack) stack = stackLifts();
    hero.groups.forEach((g, i) => hero.lift(g, stack.lift[i] * f, (g.def.side ?? 0) * f));
    homeGhosts(f);
    hero.fit(...hero.size(), stack.top * f, 300 * f);
    if (!lensDone && f === 0 && !embed) drawLens();
    hero.render();
    heroNotes(f, wn);
    if (wn > 0.01) coldMarks(hero, heroCold, wn); else if (heroCold.innerHTML) heroCold.innerHTML = "";
  },
});
addEventListener("resize", () => { lensDone = false; stack = null; });
// equal visible gaps: stack the layers bottom-up by their height within the box (E, F, T, D, H; M steps out beside F)
let stack = null;
function stackLifts() {
  // each group's box (clipped to the section box) in view space; a world lift dy moves it up the screen by dy * cos(el)
  const boxes = hero.groups.map((g) => {
    const b = new THREE.Box3();
    g.node.traverse((o) => { if (!o.isMesh || !o.userData.mat || o.userData.mat.userData.glass) return; o.geometry.computeBoundingBox(); const bb = o.geometry.boundingBox; if (bb.max.z < BOX.w[0] * S || bb.min.z > BOX.w[1] * S || bb.max.x < BOX.x[0] * S) return; b.union(bb); });
    b.min.max(new THREE.Vector3(BOX.x[0] * S, BOX.y[0] * S, BOX.w[0] * S)); b.max.min(new THREE.Vector3(BOX.x[1] * S, BOX.y[1] * S, BOX.w[1] * S));
    return b;
  });
  const vy = (b) => { let lo = Infinity, hi = -Infinity; for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) { const v = new THREE.Vector3(x, y, z).applyMatrix4(hero.camera.matrixWorldInverse); lo = Math.min(lo, v.y); hi = Math.max(hi, v.y); } return [lo, hi]; };
  const cosEl = Math.cos((28 * Math.PI) / 180), order = [0, 1, 3, 4, 5];
  let res = null, gapM = 0;
  for (let pass = 0; pass < 3; pass++) {   // the exploded framing zooms out, so solve the gap at that framing
    hero.fit(...hero.size(), res ? res.top : 0, res ? 300 : 0);
    gapM = 64 * (hero.camera.right - hero.camera.left) / hero.size()[0];
    hero.fit(...hero.size(), 0, 0);
    const ext = boxes.map(vy), lift = hero.groups.map(() => 0);
    let top = ext[0][1];
    for (const i of order.slice(1)) { lift[i] = Math.max(0, (top + gapM - ext[i][0]) / cosEl); top = ext[i][1] + lift[i] * cosEl; }
    lift[2] = lift[1];   // the landing rises with the slab and steps out sideways
    res = { lift, top: Math.max(...lift) };
  }
  return res;
}
// home positions ghosted at 20 % while the layers are apart (research 17 §5): shared geometry, flat grey, no shadow
let ghostNode = null;
function homeGhosts(f) {
  if (!ghostNode) {
    ghostNode = new THREE.Group();
    const m = new LineMaterial({ color: "#8C8579", linewidth: 0.75, transparent: true, opacity: 0.35, clippingPlanes: hero.groups[0].planes.map((p) => p.clone()) });
    m.userData.role = "ghost";
    hero.groups[0].lineMats.push(m);   // so the renderer keeps its resolution in step
    hero.groups.forEach((g) => { if (!g.def.lift && !g.def.side) return; g.node.traverse((o) => { if (o.isLineSegments2 && o.material.userData.role !== "inner") ghostNode.add(new LineSegments2(o.geometry, m)); }); });
    hero.scene.add(ghostNode);
    hero.noAO.push(ghostNode);
  }
  ghostNode.visible = f > 0.02;
}

// ================= ageing: finishes weather, the bed grows in; changed elements tagged with the year =================
const ageCv = document.getElementById("age-cv"), ageOvl = document.getElementById("age-ovl"), yr = document.getElementById("year"), yrOut = document.getElementById("year-out"), ageNotes = document.getElementById("age-notes");
const age = createView({ canvas: ageCv, model, meadowIn: 0, col: 150 });
const mix = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
// the reviewers' notes, minus raw RGB values and what this fragment does not show (the tree and rain garden lie outside it)
const noteText = (t) => t.split(/(?<=\.)\s+/).filter((x) => !/tree|sediment|rain-garden|forebay|bloom/i.test(x)).join(" ").replace(/\s*\d{2,3},\d{2,3},\d{2,3}\s*/g, " ").trim();
const AGE_POINTS = [[-94, 3500], [-94, 3120], [-757, 0]];
const AGE_TAGS = [[V3(-94, 3500, 1400), "CEDAR SILVERED"], [V3(-94, 3120, 1400), "SPLASH BAND OVER THE CAP"], [V3(-757, 0, 1400), "ALGAE LINE UNDER THE DRIP"]];   // top to bottom
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
    let s = furniture(age);
    if (ageYear >= 1) {
      const pts = AGE_TAGS.map(([p, label], i) => ({ i, label, a: age.project(p) })), ys = [];
      pts.forEach((n, k) => (ys[k] = k ? Math.max(n.a[1], ys[k - 1] + 22) : n.a[1]));
      pts.forEach((n, k) => {
        const lx = 16;
        s += `<g class="ytag"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="3"/><path d="${leader(n.a[0], n.a[1], lx + 262, ys[k])}"/><text x="${lx}" y="${ys[k] + 4}">${n.i + 1} &#183; YR ${ageYear} &#183; ${n.label}</text></g>`;
      });
    }
    // bubble leaders: rim to the spot each bubble shows
    const host = ageOvl.getBoundingClientRect();
    AGE_POINTS.forEach((p, i) => {
      const b = document.getElementById("age-b" + i)?.getBoundingClientRect();
      if (!b?.width) return;
      const [x, y] = age.project(V3(...p, 1400)), cx = b.left - host.left + b.width / 2, cy = b.top - host.top + b.height / 2, d = Math.hypot(x - cx, y - cy);
      s += `<path d="M${cx + ((x - cx) / d) * (b.width / 2)} ${cy + ((y - cy) / d) * (b.width / 2)} L${x} ${y}" class="bl"/>`;
    });
    setSvg(ageOvl, age, s);
    ageBubbles();
  },
});
// split bubbles: the same spot at year 0 (left half) and at the chosen year (right half), so the change is visible
const ageB = [0, 1, 2].map((i) => { const cv = document.getElementById("age-b" + i); const r = new THREE.WebGLRenderer({ antialias: true, canvas: cv }); Object.assign(r, { localClippingEnabled: true, toneMapping: THREE.AgXToneMapping, toneMappingExposure: 0.95, autoClear: false }); return { cv, r }; });
function applyYear(y) {
  for (const [mat, m] of age.groups[0].mats) { const a = aged(mat, y); m.color.copy(a ? mix(m.userData.tone, a, Math.min(1, y / 5) * 0.85) : new THREE.Color(m.userData.tone)); }
  age.fx.uAge.value = y;
}
function ageBubbles() {
  document.querySelectorAll(".agebub .yr-r").forEach((el) => (el.textContent = "YR " + ageYear));
  ageB.forEach((b, i) => {
    const size = b.cv.getBoundingClientRect().width;
    if (!size) return;
    b.r.setPixelRatio(Math.min(devicePixelRatio, 2)); b.r.setSize(size, size, false);
    const cam = age.camera.clone(), v = V3(...AGE_POINTS[i], 1400).applyMatrix4(age.camera.matrixWorldInverse), h = 0.16;
    Object.assign(cam, { left: v.x - h, right: v.x + h, top: v.y + h, bottom: v.y - h });
    cam.updateProjectionMatrix();
    b.r.setClearColor(0xf2f1ec, 1); b.r.clear();
    b.r.setScissorTest(true);
    applyYear(0); b.r.setScissor(0, 0, size / 2, size); age.render(cam, size, size, b.r);
    applyYear(ageYear); b.r.setScissor(size / 2, 0, size / 2, size); age.render(cam, size, size, b.r);
    b.r.setScissorTest(false);
  });
}

// ================= rain: a westerly storm on the edge =================
// Wind-driven drops travel on slanted tracks and stop at the first surface they meet (canopy, cedar above it, fascia,
// lower glass, landing, meadow). While it rains, light goes overcast, the faces the rain reaches darken and gloss (they
// dry slowly after), the lower glass runs with drops, and the routes run on the cut with arrows in the flow direction.
const rainCv = document.getElementById("rain-cv"), rainOvl = document.getElementById("rain-ovl"), rainSec = document.getElementById("rain"), rainBtn = document.getElementById("rain-btn");
const rain = createView({ canvas: rainCv, model, meadowIn: 0, margin: 0.08, vignette: true });
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
  DROPS.push({ a: [sx * S, sy * S, w * S], b: [t.end[0] * S, t.end[1] * S, w * S], ph: rnd(), len: 0.3 + rnd() * 0.15, width: 0.75, bright: (0.2 + rnd() * 0.12) * (0.4 + 0.6 * (w - BOX.w[0]) / (BOX.w[1] - BOX.w[0])), kind: t.kind });
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
  void main() { float a = uAlpha * vA * pow(vV, 2.0) * (1.0 - smoothstep(0.3, 1.0, abs(vU))); gl_FragColor = vec4(0.239, 0.431, 0.561, min(1.0, a * 3.0)); }`,
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
  const wa = view.project(V3(BOX.x[0] + 150, 3600)), wb = view.project(V3(BOX.x[0] + 950, 3600)), wl = Math.hypot(wb[0] - wa[0], wb[1] - wa[1]), wx = (wb[0] - wa[0]) / wl, wy = (wb[1] - wa[1]) / wl;   // along the model's W-E axis
  s += `<g class="wind" style="opacity:${0.35 + 0.65 * alpha}"><path d="M${wa[0]} ${wa[1]} L${wb[0]} ${wb[1]}"/><path d="M${wb[0] - wx * 7 + wy * 4} ${wb[1] - wy * 7 - wx * 4} L${wb[0]} ${wb[1]} L${wb[0] - wx * 7 - wy * 4} ${wb[1] - wy * 7 + wx * 4}"/><text x="${wa[0]}" y="${wa[1] - 9}">WIND FROM THE WEST</text></g>`;
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
    setSvg(rainOvl, rain, furniture(rain) + routeSvg(rain, routePhase, 0.4 + 0.6 * storminess));
  },
});

// ================= winter: a still -7 degC night against a 20 degC room, the computed field on the cut =================
// Only computed values are coloured: the fields are the thermal screening solved at this cut (build-landing.mjs).
const winterCv = document.getElementById("winter-cv"), winterNotes = document.getElementById("winter-notes"), fieldBtn = document.getElementById("field-btn");
const winter = createView({ canvas: winterCv, model, meadowIn: 0, therm: DATA.therm, bc: DATA.bc, vignette: true });
const HYGIENE = 0.7, CRIT = DATA.bc.Te + HYGIENE * (DATA.bc.Ti - DATA.bc.Te);   // PHI hygiene criterion (research 14): 11.9 degC at -7/20
let fieldOn = true, nightK = 0, fieldK = 0;
fieldBtn.addEventListener("click", () => { fieldOn = !fieldOn; fieldBtn.setAttribute("aria-pressed", fieldOn); fieldBtn.textContent = fieldOn ? "Hide the field" : "Show the field"; });
function coldMarks(view, svg, alpha) {
  let s = "";
  for (const t of DATA.therm) {
    // the solved crop: its edges are adiabatic cut lines, framed so the field's hard edge reads as the model boundary
    const c = [[t.box[0], t.box[1]], [t.box[2], t.box[1]], [t.box[2], t.box[3]], [t.box[0], t.box[3]]].map(([x, y]) => view.project(V3(x, y)));

    const [x, y] = view.project(V3(t.coldest.x, t.coldest.y)), bad = t.fRsi < HYGIENE;
    const [W] = view.size(), lx = W - 24, ly = y + (t.name === "Head" ? -60 : 78);   // a right-hand label column, clear of the block
    s += `<g class="cold${bad ? " bad" : ""}" style="opacity:${alpha}"><circle cx="${x}" cy="${y}" r="7"/><circle cx="${x}" cy="${y}" r="1.8" class="dot"/>`
      + `<path d="${leader(x + 6, y, lx - 200, ly)}"/><text x="${lx}" y="${ly + 4}" text-anchor="end">${t.name.toUpperCase()} ${t.coldest.T.toFixed(1)} &#176;C &#183; f<tspan dy="3" font-size="8">Rsi</tspan><tspan dy="-3"> ${t.fRsi.toFixed(2)}</tspan></text></g>`;
  }
  if (view === winter) {   // bubble leaders: rim to ring
    const host = svg.getBoundingClientRect();
    DATA.therm.forEach((t, i) => {
      const b = document.getElementById("winter-b" + i)?.getBoundingClientRect();
      if (!b?.width) return;
      const [x, y] = view.project(V3(t.coldest.x, t.coldest.y)), cx = b.left - host.left + b.width / 2, cy = b.top - host.top + b.height / 2, d = Math.hypot(x - cx, y - cy);
      s += `<path d="M${cx + ((x - cx) / d) * (b.width / 2)} ${cy + ((y - cy) / d) * (b.width / 2)} L${x - ((x - cx) / d) * 8} ${y - ((y - cy) / d) * 8}" class="bleader" style="opacity:${alpha}"/>`;
    });
  }
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
  for (let T = Math.floor(Ti / 2) * 2; T >= Te - 1; T -= 2) band.push(`<i style="background:rgb(${inferno(0.1 + 0.9 * (T + 1 - Te) / (Ti - Te)).join(",")})"></i>`);
  const hl = document.getElementById("hero-legend");
  if (hl) hl.innerHTML = `<div class="steps">${band.join("")}</div><div class="marks"><span style="top:0">${Ti} &#176;C</span><span style="top:${(Ti / (Ti - Te)) * 100}%">0 &#176;C</span><span style="top:100%">${Te} &#176;C</span></div>`;
  const pos = (T) => `${((Ti - T) / (Ti - Te)) * 100}%`;
  document.getElementById("tlegend").innerHTML = `<div class="steps">${band.join("")}</div><div class="marks">`
    + [20, 15, 10, 5, 0, -5].map((T) => `<span style="top:${pos(T)}">${T} &#176;C</span>`).join("")
    + `<span class="special" style="top:${pos(CRIT)}">${CRIT.toFixed(1)} &#176;C &#183; f<sub>Rsi</sub> 0.70</span><span class="special" style="top:${pos(0)}">0 &#176;C</span></div>`
    + `<p class="lcap">Computed, 2 &#176;C bands. Outside ${Te} &#176;C, inside ${Ti} &#176;C (ISO 13788). Lowest f<sub>Rsi</sub> ${Math.min(...DATA.therm.map((t) => t.fRsi)).toFixed(2)}.</p>`;
}
document.getElementById("winter-stats").innerHTML = DATA.therm.map((t) => `<div class="${t.fRsi < HYGIENE ? "bad" : ""}"><b>${t.fRsi.toFixed(2)}</b><small>${t.name.toLowerCase()} f<sub>Rsi</sub>, coldest ${t.coldest.T.toFixed(1)} &#176;C${t.fRsi < HYGIENE ? ", under 0.70" : ""}</small></div>`).join("");
// field bubbles: the solved field magnified at each junction's coldest point (it is a sliver at block scale)
const bubbles = DATA.therm.map((t, i) => {
  const cv = document.getElementById("winter-b" + i);
  const r = new THREE.WebGLRenderer({ antialias: true, canvas: cv });
  Object.assign(r, { localClippingEnabled: true, toneMapping: THREE.AgXToneMapping });
  return { t, cv, r };
});
function drawBubbles(alpha) {
  for (const b of bubbles) {
    const size = b.cv.getBoundingClientRect().width;
    if (!size) continue;
    b.r.setPixelRatio(Math.min(devicePixelRatio, 2)); b.r.setSize(size, size, false);
    b.r.toneMappingExposure = winter.renderer.toneMappingExposure;
    const cam = winter.camera.clone(), v = V3(b.t.coldest.x, b.t.coldest.y).applyMatrix4(winter.camera.matrixWorldInverse), h = 0.21;
    Object.assign(cam, { left: v.x - h, right: v.x + h, top: v.y + h, bottom: v.y - h });
    cam.updateProjectionMatrix();
    winter.render(cam, size, size, b.r);
    b.cv.style.opacity = alpha;
    b.cv.nextElementSibling.style.opacity = alpha;
  }
}
watch(winterCv, {
  frame(dt) {
    if (!winter.resize()) return;
    nightK = Math.min(1, nightK + dt * 2);   // night falls in half a second
    fieldK += ((fieldOn ? 1 : 0) - fieldK) * Math.min(1, dt * 4);
    winter.night(nightK);
    winter.fx.uTherm.value = fieldK * nightK;
    winter.fit(...winter.size());
    winter.render();
    drawBubbles(fieldK * nightK);
    winter.fit(...winter.size());
    coldMarks(winter, winterNotes, fieldK * nightK);
  },
});

// ================= build: the stages arrive in the order they are built; later stages ghosted =================
const buildCv = document.getElementById("build-cv"), buildOvl = document.getElementById("build-ovl"), stageNum = document.getElementById("stage-num"), stageName = document.getElementById("stage-name");
const stageDefs = DATA.stages.map(() => ({}));
const build = createView({ canvas: buildCv, model, groups: stageDefs, groupOf: (p) => (p.id === "subgrade-far" ? -1 : Math.min(Math.max(p.step ?? 0, 0), stageDefs.length - 1)), meadowIn: stageDefs.length - 1, col: 220 });
// ghost: 15 % unlit-looking context, no cut caps or ink, so nothing floats unsupported (research 17 §5)
const ghost = (g, on) => build.ghost(g, on);
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
    let tag = "";
    const g = build.groups[shown], id = Object.keys(g.anchors)[0], a = id && build.anchor(id);
    if (a) { const [W] = build.size(), t = ("NOW \u00b7 " + DATA.stages[shown]).toUpperCase(), cut = t.lastIndexOf(" ", 28), lines = t.length > 28 ? [t.slice(0, cut), t.slice(cut + 1)] : [t], lx = W - 206;
      tag = `<g class="xnote"><circle cx="${a[0]}" cy="${a[1]}" r="3"/><path d="${leader(a[0], a[1], lx - 6, a[1])}"/>${lines.map((l, k) => `<text x="${lx}" y="${a[1] + 4 + k * 14}">${l}</text>`).join("")}</g>`; }
    setSvg(buildOvl, build, furniture(build) + tag);
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
