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
// FFL and the landing are 7 mm apart: one level line, one label
const DATUMS = [[0, "\u00b10.000 FFL\n\u22120.007 LANDING", 240], [2785, "+2.785 HEAD", 150], [-530, "\u22120.530 U/S BEAM", 110], [-105, "\u22120.105 GRADE", -3500]];
function furniture(view, { datums = true, scale = true, compass = true, light = false } = {}) {
  const [W, H] = view.size(), ink = light ? "#d9dee4" : "#1E1E1E";
  let s = `<g class="furn" style="--ink:${ink}">`;
  if (datums) {
    const wA = BOX.w.map((w) => [w, view.project(V3(BOX.x[0], 0, w))[0]]).sort((p, q) => p[1] - q[1])[0][0];   // the block's west face nearest the viewer's left
    let west = Infinity;
    for (const x of BOX.x) for (const y of BOX.y) for (const w of BOX.w) west = Math.min(west, view.project(V3(x, y, w))[0]);
    // one extension for every level: the line ends stand on one vertical staff, 18 px clear of the block, longest label on screen
    const longest = Math.max(...DATUMS.flatMap((d) => d[1].split("\n").map((l) => l.length))) * 7.4 + 8;   // a label may break onto two lines
    const ds = DATUMS.map(([y, label, xe]) => {
      const a = view.project(V3(BOX.x[0], y, wA)), b = view.project(V3(xe, y, wA)), L = Math.hypot(a[0] - b[0], a[1] - b[1]), u = [(a[0] - b[0]) / L, (a[1] - b[1]) / L];
      const ext = Math.min(Math.max(24, (a[0] - (west - 18)) / -u[0]), Math.max(12, (a[0] - 24 - 8 - longest) / -u[0]));
      const e = [a[0] + u[0] * ext, a[1] + u[1] * ext];
      return { label, a, b, e, u };
    }).sort((m, n) => m.e[1] - n.e[1]);
    // Keep a shared text column; displaced labels retain an explicit connection to their true level.
    const labelX = Math.min(...ds.map((d) => d.e[0])) - 16;
    ds.forEach((d, k) => { d.ty = k ? Math.max(d.e[1], ds[k - 1].ty + 15 * ds[k - 1].label.split("\n").length + 9) : d.e[1]; });
    const overflow = Math.max(0, ds.at(-1).ty + 15 * ds.at(-1).label.split("\n").length - (H - 76));
    ds.forEach((d) => { d.ty -= overflow; });
    for (const d of ds) {
      if (d.label.includes("HEAD")) {
        const p = view.project(V3(150, 2785));
        s += `<path d="M${p[0] - 44} ${p[1]} H${p[0] - 4}" class="datum"/><path d="M${p[0] - 44} ${p[1]} l-3.5 -6 h7 z" class="tri"/><text x="${p[0] - 54}" y="${p[1] + 4}" text-anchor="end">${d.label}</text>`;
        continue;
      }
      s += `<path d="M${d.e[0]} ${d.e[1]} L${d.b[0]} ${d.b[1]}" class="datum"/><path d="M${d.e[0]} ${d.e[1] - 1} l-3.5 -6 h7 z" class="tri"/>`
        + `<path d="M${labelX + 6} ${d.ty} H${labelX + 12} L${d.e[0]} ${d.e[1]}" class="level-leader"/>`
        + d.label.split("\n").map((l, i) => `<text x="${labelX}" y="${d.ty + 4 + i * 15}" text-anchor="end">${l}</text>`).join("");
    }
  }
  // under the east end of the block's bottom front edge, parallel to it and 28 px below: never on the cut, never off the frame
  const wf = BOX.w.map((w) => [w, view.project(V3(BOX.x[1], BOX.y[0], w))[1]]).sort((p, q) => q[1] - p[1])[0][0];
  const c0 = view.project(V3(BOX.x[1] - 1000, BOX.y[0], wf));
  const ax0 = view.project(V3(0, 0)), ax1 = view.project(V3(1000, 0)), axL = Math.hypot(ax1[0] - ax0[0], ax1[1] - ax0[1]), ux = (ax1[0] - ax0[0]) / axL, uy = (ax1[1] - ax0[1]) / axL;
  const at = (x0, y0, mm) => [x0 + ux * axL * (mm / 1000), y0 + uy * axL * (mm / 1000)];
  const sx0 = c0[0], sy0 = c0[1] + 28;
  if (scale) {   // 1 m along the cut axis (the scale of an axo holds along its axes)
    const a = [sx0, sy0], b = at(sx0, sy0, 1000), m = at(sx0, sy0, 500);
    s += `<path d="M${a[0]} ${a[1]} L${m[0]} ${m[1]}" class="sb fill"/><path d="M${m[0]} ${m[1]} L${b[0]} ${b[1]}" class="sb"/>`
      + `<text x="${a[0]}" y="${a[1] + 16}">0</text><text x="${m[0]}" y="${m[1] + 16}">0.5</text><text x="${b[0]}" y="${b[1] + 16}">1 M</text>`;
  }
  if (compass) {   // W <-> E along the cut axis, under the scale bar
    const a = [sx0, sy0 + 30], b = at(sx0, sy0 + 30, 1000);
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
function wrapNote(text, limit) {
  const lines = [""];
  for (const word of text.replace(/(\d+) MM/g, "$1\u00a0MM").split(" ")) {
    const i = lines.length - 1;
    if (lines[i] && lines[i].length + word.length + 1 > limit) lines.push(word);
    else lines[i] += (lines[i] ? " " : "") + word;
  }
  return lines;
}

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
const hero = createView({ canvas: heroCv, model, groups: LAYERS, groupOf: layerOf, meadowIn: 2, col: 300, therm: DATA.therm, bc: DATA.bc });
const heroEl = document.querySelector(".hero"), heroCold = document.getElementById("hero-cold"), rail = [...document.querySelectorAll("#rail li")];
let railK = 0;
// the bar turns to night over a night band (the winter band, or the hero at night)
const navEl = document.querySelector("nav"), winterSec = document.getElementById("winter");
const navLinks = [...document.querySelectorAll("nav .links a")];
function navTone(wnNow) {
  const y = 80, hr = heroEl.getBoundingClientRect(), wr = winterSec.getBoundingClientRect();
  navLinks.forEach((a) => {
    const r = (a.getAttribute("href") === "#top" ? heroEl : document.querySelector(a.getAttribute("href"))).getBoundingClientRect(), cur = r.top <= y && r.bottom > y;
    if (cur && a.getAttribute("aria-current") !== "true" && a.parentElement.scrollWidth > a.parentElement.clientWidth) a.parentElement.scrollTo({ left: a.offsetLeft - a.parentElement.clientWidth / 2 + a.offsetWidth / 2 });
    a.setAttribute("aria-current", cur);
  });
  const wn = wnNow ?? (+getComputedStyle(document.documentElement).getPropertyValue("--wn") || 0);
  navEl.classList.toggle("dark", (wr.top <= y && wr.bottom > y) || (hr.top <= y && hr.bottom > y && wn > 0.5));
}
addEventListener("scroll", () => requestAnimationFrame(() => navTone()), { passive: true });
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
const unpinned = () => embed || reduceMotion || matchMedia("(max-width: 900px)").matches, colW = () => (matchMedia("(max-width: 600px)").matches ? 0 : 280);
let pick = 0, hp = [0, 0];
// the rail: on a pinned hero it scrolls to that state; unpinned (phones, reduced motion) it switches the state in place
rail.forEach((li, k) => li.querySelector("button").addEventListener("click", () => {
  if (unpinned()) { pick = k; return; }
  scrollTo({ top: heroEl.offsetTop + (heroEl.offsetHeight - innerHeight) * [0, 0.33, 0.85][k], behavior: reduceMotion ? "auto" : "smooth" });
}));
let lean = 0, leanTo = 0;
heroEl.querySelector(".stage").addEventListener("pointermove", (e) => { const r = e.currentTarget.getBoundingClientRect(); leanTo = ((e.clientX - r.left) / r.width - 0.5) * 0.052; });
heroEl.querySelector(".stage").addEventListener("pointerleave", () => (leanTo = 0));
heroEl.querySelector(".stage").addEventListener("click", () => { if (!unpinned() || embed) return; pick = (pick + 1) % 3; });
function heroProgress() {
  if (unpinned()) { const t = [pick === 1 ? 1 : 0, pick === 2 ? 1 : 0]; hp = reduceMotion ? t : hp.map((v, i) => (Math.abs(t[i] - v) < 0.002 ? t[i] : v + (t[i] - v) * 0.2)); return hp; }
  const r = heroEl.getBoundingClientRect(), p = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
  const ease = (t) => t * t * (3 - 2 * t), span = (a, b) => ease(Math.min(Math.max((p - a) / (b - a), 0), 1));
  return [span(0.04, 0.17) - span(0.38, 0.48), span(0.55, 0.64) - span(0.93, 1)];
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
    const colX = W - 234, ys = pts.map((n) => Math.min(H - 86, n.a[1]));
    for (let k = 1; k < ys.length; k++) ys[k] = Math.min(ys[k], ys[k - 1] - 52);   // bottom-up: each tag at least 52 px above the last
    const shift = Math.max(0, 30 - ys.at(-1));
    for (let k = 0; k < ys.length; k++) ys[k] += shift;
    const o = Math.min(1, (f - 0.02) * 2.5);
    pts.forEach((n, k) => {
      if (n.dy > 0.001) s += `<path d="M${n.home[0]} ${n.home[1]} L${n.a[0]} ${n.a[1]}" class="conn" style="opacity:${o}"/>`;
      s += `<g class="xnote${n.l.focus ? " focus" : ""}" style="opacity:${o}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="3"/><path d="${leader(n.a[0], n.a[1], colX - 34, ys[k])}"/>`
        + `<circle cx="${colX - 25}" cy="${ys[k]}" r="9" class="tag"/><text class="k" x="${colX - 25}" y="${ys[k] + 3.5}" text-anchor="middle">${n.l.tag}</text><text class="assembly-note" x="${colX}" y="${ys[k] + 4}">${wrapNote(n.l.name.toUpperCase(), 27).map((line, i) => `<tspan x="${colX}" dy="${i ? 15 : 0}">${line}</tspan>`).join("")}</text></g>`;
    });
  }
  const lb = lensCv.getBoundingClientRect(), hb = notes.getBoundingClientRect(), lo = Math.max(0, 1 - f * 1.6 - wn * 2);
  if (lb.width && lo > 0.01) {
    const lc = [lb.left - hb.left + lb.width / 2, lb.top - hb.top + lb.height / 2], r = lb.width / 2, t = hero.project(LENS.at.clone().add(new THREE.Vector3(0, hero.groups[3].dy, 0)));
    const sx = Math.sign(lc[0] - t[0]) || -1, sy = Math.sign(lc[1] - t[1]) || -1, k = LENS.ring * Math.SQRT1_2;
    const lensLeader = leader(t[0] + sx * k, t[1] + sy * k, lc[0] - sx * r, lc[1]);   // 45 degrees off the ring, then level into the lens
    s += `<g class="lensnote" style="opacity:${lo}"><circle cx="${t[0]}" cy="${t[1]}" r="${LENS.ring}" class="ring"/><path d="${lensLeader}" class="halo"/><path d="${lensLeader}"/><text x="${lc[0] - r}" y="${lc[1] + r + 20}">A &#183; THRESHOLD AT THE SLIDING PANEL</text>${lensMarks(lb, hb)}</g>`;
  }
  if (f < 0.02) s += furniture(hero, { light: wn > 0.5, scale: wn < 0.3, compass: wn < 0.3 });
  setSvg(notes, hero, s);
}
watch(heroCv, {
  frame() {
    if (!hero.resize()) return;
    const [f, wn] = heroProgress();
    document.documentElement.style.setProperty("--xp", f.toFixed(3));
    document.documentElement.style.setProperty("--wn", wn.toFixed(3));
    railK = wn > 0.5 ? 2 : f > 0.5 ? 1 : 0; navTone(wn);
    rail.forEach((li, i) => { li.classList.toggle("on", i === railK); li.firstElementChild.setAttribute("aria-pressed", i === railK); });
    hero.night(wn);
    hero.fx.uTherm.value = wn;
    if (embed && hero.aim(orbit.az, orbit.el)) stack = null;   // a new angle re-solves the exploded gaps
    if (!stack) stack = stackLifts();
    hero.groups.forEach((g, i) => hero.lift(g, stack.lift[i] * f, (g.def.side ?? 0) * f));
    homeGhosts(0);
    hero.fit(...hero.size(), stack.top * f, colW() * f);
    if (embed) zoomPan();
    if (!reduceMotion && !unpinned()) {
      lean += (leanTo - lean) * 0.06;
      if (Math.abs(lean) > 1e-4) { const c = new THREE.Vector3(((BOX.x[0] + BOX.x[1]) / 2) * S, ((BOX.y[0] + BOX.y[1]) / 2) * S, ((BOX.w[0] + BOX.w[1]) / 2) * S); hero.camera.position.sub(c).applyAxisAngle(new THREE.Vector3(0, 1, 0), lean).add(c); hero.camera.lookAt(c); hero.camera.updateMatrixWorld(); }
    }
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
  const cosEl = Math.max(0.3, Math.cos((hero.view.el * Math.PI) / 180)), order = [0, 1, 3, 4, 5];
  let res = null, gapM = 0;
  for (let pass = 0; pass < 3; pass++) {   // the exploded framing zooms out, so solve the gap at that framing
    hero.fit(...hero.size(), res ? res.top : 0, res ? colW() : 0);
    gapM = (hero.size()[0] < 600 ? 22 : 64) * (hero.camera.right - hero.camera.left) / hero.size()[0];
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
    const m = new LineMaterial({ color: "#8C8579", linewidth: 0.75, transparent: true, opacity: 0.35, clippingPlanes: hero.groups[0].linePlanes.map((p) => p.clone()) });
    m.userData.role = "ghost";
    hero.groups[0].lineMats.push(m);   // so the renderer keeps its resolution in step
    hero.groups.forEach((g) => { if (!g.def.lift && !g.def.side) return; g.node.traverse((o) => { if (o.isLineSegments2 && o.material.userData.role !== "inner") ghostNode.add(new LineSegments2(o.geometry, m)); }); });
    hero.scene.add(ghostNode);
    hero.noAO.push(ghostNode);
  }
  ghostNode.visible = f > 0.02;
}

// ================= ageing: finishes weather, the bed grows in; changed elements tagged with the year =================
// pinned bands: progress 0-1 through a sticky band, and the scroll position for a given progress
const pinOK = () => !reduceMotion && !embed && matchMedia("(min-width: 901px)").matches;
const pinP = (sec) => { const r = sec.getBoundingClientRect(); return (64 - r.top) / (r.height - (innerHeight - 64)); };
const pinAt = (sec, p) => sec.offsetTop - 64 + p * (sec.offsetHeight - (innerHeight - 64));
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
    m.color.copy(a ? mix(m.userData.tone, a, Math.min(1, y / 5)) : new THREE.Color(m.userData.tone));   // most of the change happens in the first five years
  }
  age.plants?.grow(growth("bed-plant", y));
  age.fx.uAge.value = y;
  yrOut.textContent = y;
  window.trySweep?.();
  const ys = DATA.ageing.years, idx = ys.length - 1 - [...ys].reverse().findIndex((v) => y >= v);
  ageNotes.innerHTML = DATA.ageing.notes[idx].map(noteText).filter(Boolean).map((t) => `<p>${t}</p>`).join("") + `<p class="aside">The tree and the rain garden lie outside this fragment.</p>`;
  document.querySelectorAll(".ticks button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.y === ys[idx]));
}
// ageing: on desktop the band pins and scrolling ages the fragment (0-30 over the first 85 %); the slider and ticks scroll to their year
const ageSec = document.getElementById("age"), yearAt = (y) => pinAt(ageSec, (y / 30) * 0.85);
let ageHeld = false;   // set by a slider, tick or wipe touch; released when the band leaves the screen
const toYear = (y) => { yr.value = y; setYear(y); ageHeld = true; };
yr.addEventListener("input", () => toYear(+yr.value));
document.querySelectorAll(".ticks button").forEach((b) => { b.style.left = `${(+b.dataset.y / 30) * 100}%`; b.onclick = () => toYear(+b.dataset.y); });
addEventListener("scroll", () => {
  if (!pinOK()) return;
  const p = pinP(ageSec);
  if (p < 0 || p > 1) { ageHeld = false; return; }
  if (ageHeld) return;
  const y = Math.round(Math.min(1, p / 0.85) * 30);
  if (y !== ageYear) { yr.value = y; setYear(y); }
}, { passive: true });
setYear(0);
const wipeCv = document.getElementById("age-y0"), wipe = document.getElementById("age-wipe");
let wipeAt = 0.5, y0Key = "", wipeSet = false, wipeSwept = false;
function placeWipe() { wipe.style.left = `${wipeAt * 100}%`; wipeCv.style.clipPath = `inset(0 ${(1 - wipeAt) * 100}% 0 0)`; wipe.setAttribute("aria-valuenow", Math.round(wipeAt * 100)); }
{
  const drag = (e) => { const r = ageCv.getBoundingClientRect(); wipeAt = Math.min(0.97, Math.max(0.03, (e.clientX - r.left) / r.width)); placeWipe(); };
  wipe.addEventListener("pointerdown", (e) => { wipe.setPointerCapture(e.pointerId); ageHeld = true; drag(e); wipe.onpointermove = drag; });
  wipe.addEventListener("pointerup", () => (wipe.onpointermove = null));
  wipe.addEventListener("keydown", (e) => { const d = { ArrowLeft: -0.05, ArrowRight: 0.05 }[e.key]; if (d) { wipeAt = Math.min(0.97, Math.max(0.03, wipeAt + d)); placeWipe(); e.preventDefault(); } });
  placeWipe();
  // once, as the band opens: the handle sweeps across the cedar so the eye sees it is live
  if (!reduceMotion && "IntersectionObserver" in window) {
    let seen = false;
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; trySweep(); }, { threshold: 0.4 });
    io.observe(ageCv);
    window.trySweep = () => {
      if (wipeSwept || !seen || ageYear < 20 || !wipeSet) return;
      wipeSwept = true; io.disconnect();
      const end = wipeAt, t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1100), s = 1 - Math.pow(1 - k, 3); wipeAt = 0.9 + (end - 0.9) * s; placeWipe(); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
  }
}
watch(ageCv, {
  frame() {
    if (!age.resize()) return;
    age.fit(...age.size());
    const key = age.size().join("x");
    if (key !== y0Key) {   // year 0 drawn once into the wipe's left canvas, then the chosen year into the main one
      y0Key = key; applyYear(0); age.plants?.grow(growth("bed-plant", 0)); age.render();
      wipeCv.width = ageCv.width; wipeCv.height = ageCv.height; wipeCv.getContext("2d").drawImage(ageCv, 0, 0);
      applyYear(ageYear); age.plants?.grow(growth("bed-plant", ageYear));
    }
    if (!wipeSet) {   // rest the wipe on the cedar head, where the change is largest
      const W = age.size()[0], xs = BOX.w.map((w) => age.project(V3(AGE_POINTS[0][0], AGE_POINTS[0][1], w))[0]);
      wipeAt = Math.min(0.9, Math.max(0.1, (xs[0] + xs[1]) / 2 / W)); wipeSet = true; placeWipe();   // mid-cedar: half the cedar shows each year
    }
    age.render();
    let s = furniture(age);
    if (false) {   // the tags moved under the bubbles: one leader per spot
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
      const rx = cx + Math.sign(x - cx) * (b.width / 2);
      s += `<path d="${leader(x, y, rx, cy)}" class="bl"/><circle cx="${x}" cy="${y}" r="2" class="bdot"/>`;
    });
    setSvg(ageOvl, age, s);
    ageBubbles();
  },
});
// split bubbles: the same spot at year 0 (left half) and at the chosen year (right half), so the change is visible
const ageB = [0, 1, 2].map((i) => { const cv = document.getElementById("age-b" + i); const r = new THREE.WebGLRenderer({ antialias: true, canvas: cv }); Object.assign(r, { localClippingEnabled: true, toneMapping: THREE.AgXToneMapping, toneMappingExposure: 0.95, autoClear: false }); return { cv, r }; });
function applyYear(y) {
  for (const [mat, m] of age.groups[0].mats) { const a = aged(mat, y); m.color.copy(a ? mix(m.userData.tone, a, Math.min(1, y / 5)) : new THREE.Color(m.userData.tone)); }
  age.fx.uAge.value = y;
}
function ageBubbles() {
  document.querySelectorAll(".agebub .yr-r").forEach((el) => (el.textContent = "YR " + ageYear));
  document.getElementById("wipe-yr").textContent = "YR " + ageYear;
  document.querySelectorAll(".agebub figcaption").forEach((el, i) => (el.textContent = `${i + 1} \u00b7 ${AGE_TAGS[i][1]}`));
  ageB.forEach((b, i) => {
    const size = b.cv.getBoundingClientRect().width;
    if (!size) return;
    b.r.setPixelRatio(Math.min(devicePixelRatio, 2)); b.r.setSize(size, size, false);
    const cam = age.camera.clone(), v = V3(...AGE_POINTS[i], 1400).applyMatrix4(age.camera.matrixWorldInverse), h = i === 2 ? 0.09 : 0.16;
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
const rain = createView({ canvas: rainCv, model, meadowIn: 0, margin: 0.03 });
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
    let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const k = Math.min(1, Math.max(0, routeFill * 1.6 - ROUTES.indexOf(r) * 0.45));   // the second route starts after the first
    s += `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" class="route" style="stroke-width:${r.wt};opacity:${alpha};stroke-dasharray:${len};stroke-dashoffset:${len * (1 - k)}"/>`;
    if (k > 0.98) { const e = pts[pts.length - 1], name = r.label.split("\u2192").pop().trim().toUpperCase(); s += `<g class="xnote" style="opacity:${alpha}"><circle cx="${e[0]}" cy="${e[1]}" r="3"/><text x="${e[0] + 8}" y="${e[1] + 16}">${name}</text></g>`; }
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
  const wa = view.project(V3(BOX.x[0] + 150, 4300)), wb = view.project(V3(BOX.x[0] + 950, 4300)), wl = Math.hypot(wb[0] - wa[0], wb[1] - wa[1]), wx = (wb[0] - wa[0]) / wl, wy = (wb[1] - wa[1]) / wl;   // along the model's W-E axis
  s += `<g class="wind" style="opacity:${0.35 + 0.65 * alpha}"><path d="M${wa[0]} ${wa[1]} L${wb[0]} ${wb[1]}"/><path d="M${wb[0] - wx * 7 + wy * 4} ${wb[1] - wy * 7 - wx * 4} L${wb[0]} ${wb[1]} L${wb[0] - wx * 7 - wy * 4} ${wb[1] - wy * 7 + wx * 4}"/><text x="${wa[0] - 10}" y="${wa[1] + 4}" text-anchor="end">WIND FROM THE WEST</text></g>`;
  return s;
}
document.getElementById("routes").innerHTML =
  `<li><svg width="34" height="10" aria-hidden="true"><path d="M2 9 L8 1 M14 9 L20 1 M26 9 L32 1" stroke="#7d8a94" stroke-width=".75"/></svg><span>Rain, wind-driven from the west, about 75&#176;</span></li>`
  + ROUTES.map((f) => `<li><svg width="34" height="10" aria-hidden="true"><path d="M2 5 H32" stroke="#3D6E8F" stroke-width="${f.wt}"/><path d="M22 1 L28 5 L22 9" stroke="#3D6E8F" fill="none" stroke-width="1"/></svg><span>${f.label}</span></li>`).join("")
  + `<li><svg width="34" height="10" aria-hidden="true"><circle cx="17" cy="5" r="4" stroke="#3D6E8F" fill="none"/></svg><span>Drip edge at the canopy tip</span></li>`
  + DATA.flows.filter((f) => f.beyond).map((f) => `<li class="beyond"><svg width="34" height="10" aria-hidden="true"></svg><span>${f.label} (beyond this cut, at the water corner)</span></li>`).join("");
let routeFill = 0;
let raining = false, storminess = 0, routePhase = 0, holding = false, scrolled = false;
const applyRain = () => { raining = holding || scrolled; rainSec.classList.toggle("raining", raining); rainBtn.setAttribute("aria-pressed", String(holding)); };
const on = () => { holding = true; applyRain(); }, off = () => { holding = false; applyRain(); };
addEventListener("scroll", () => {
  if (!pinOK()) return;
  const p = pinP(rainSec), s = p > 0.18 && p < 0.92;
  if (s !== scrolled) { scrolled = s; applyRain(); }
}, { passive: true });
rainBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); on(); });
["pointerup", "pointerleave", "pointercancel"].forEach((t) => rainBtn.addEventListener(t, off));
rainBtn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); on(); } });
rainBtn.addEventListener("keyup", off);
watch(rainCv, {
  frame(dt) {
    if (!rain.resize()) return;
    const ease = (v, to, rate) => v + (to - v) * Math.min(1, dt * rate);
    storminess = ease(storminess, raining ? 1 : 0, raining ? 2.5 : 0.9);
    rainU.uAlpha.value = ease(rainU.uAlpha.value, raining ? 1 : 0, raining ? 5 : 1.2);   // the storm eases off over ~2 s
    rain.fx.uWet.value = raining ? Math.min(1, rain.fx.uWet.value + dt * 0.6) : Math.max(0, rain.fx.uWet.value - dt * 0.07);   // wetting is quick, drying is slow
    rain.weather(storminess);
    rainSec.style.setProperty("--sk", storminess.toFixed(3));   // the whole band greys with the storm
    if (raining && !reduceMotion) routePhase += dt * 0.6;
    routeFill = reduceMotion ? (storminess > 0.05 ? 1 : 0) : raining ? Math.min(1, routeFill + dt * 0.45) : Math.max(0, routeFill - dt * 0.25);
    rain.fit(...rain.size());
    rainU.uRes.value.set(...rain.size());
    rain.render();
    setSvg(rainOvl, rain, furniture(rain) + routeSvg(rain, routePhase, 0.4 + 0.6 * storminess));
  },
});

// ================= winter: a still -7 degC night against a 20 degC room, the computed field on the cut =================
// Only computed values are coloured: the fields are the thermal screening solved at this cut (build-landing.mjs).
const winterCv = document.getElementById("winter-cv"), winterNotes = document.getElementById("winter-notes"), fieldBtn = document.getElementById("field-btn");
const winter = createView({ canvas: winterCv, model, meadowIn: 0, therm: DATA.therm, bc: DATA.bc });
const HYGIENE = 0.7, DEW = 9.3;   // dew point of room air at 20 degC and an assumed 50 % RH (Magnus formula)   // PHI hygiene criterion (research 14): f_Rsi 0.70, i.e. 11.9 degC at -7/20
let TeNow = DATA.bc.Te;   // the visitor can scrub the outside temperature; the field is linear in the boundary temperatures
const Tsurf = (t) => TeNow + ((t.coldest.T - DATA.bc.Te) / (DATA.bc.Ti - DATA.bc.Te)) * (DATA.bc.Ti - TeNow), critNow = () => TeNow + HYGIENE * (DATA.bc.Ti - TeNow);
let fieldOn = true, nightK = 1, fieldK = 0;   // the winter band is always night
fieldBtn.addEventListener("click", () => { fieldOn = !fieldOn; fieldBtn.setAttribute("aria-pressed", fieldOn); fieldBtn.textContent = fieldOn ? "Hide the field" : "Show the field"; });
function coldMarks(view, svg, alpha) {
  let s = "";
  for (const t of DATA.therm) {
    // the solved crop: its edges are adiabatic cut lines, framed so the field's hard edge reads as the model boundary
    const c = [[t.box[0], t.box[1]], [t.box[2], t.box[1]], [t.box[2], t.box[3]], [t.box[0], t.box[3]]].map(([x, y]) => view.project(V3(x, y)));

    const [x, y] = view.project(V3(t.coldest.x, t.coldest.y)), bad = t.fRsi < HYGIENE;
    const [W] = view.size(), lx = W - 24, ly = y + (t.name === "Head" ? -60 : 78);   // a right-hand label column, clear of the block
    s += `<g class="cold${bad ? " bad" : ""}" style="opacity:${alpha}"><circle cx="${x}" cy="${y}" r="7"/><circle cx="${x}" cy="${y}" r="1.8" class="dot"/>`
      + `<path d="${leader(x + 6, y, lx - 236, ly)}"/>${Tsurf(t) < DEW ? `<circle cx="${x}" cy="${y}" r="12" class="dewring"/>` : ""}<text x="${lx}" y="${ly + 4}" text-anchor="end">${t.name.toUpperCase()} ${Tsurf(t).toFixed(1)}&#160;&#176;C &#183; f<tspan dy="3" font-size="8">Rsi</tspan><tspan dy="-3"> ${t.fRsi.toFixed(2)}</tspan></text></g>`;
  }
  if (view === winter) {   // bubble leaders: rim to ring
    const host = svg.getBoundingClientRect();
    DATA.therm.forEach((t, i) => {
      const b = document.getElementById("winter-b" + i)?.getBoundingClientRect();
      if (!b?.width) return;
      const [x, y] = view.project(V3(t.coldest.x, t.coldest.y)), cx = b.left - host.left + b.width / 2, cy = b.top - host.top + b.height / 2, d = Math.hypot(x - cx, y - cy);
      const sx = Math.sign(cx - x) || -1, rx = cx - sx * (b.width / 2), ay = y + Math.sign(cy - y) * 5.7, ax = x + sx * 5.7;   // from the ring's rim, 45 degrees, then level into the bubble
      s += `<path d="${leader(ax, ay, rx, cy)}" class="bleader" style="opacity:${alpha}"/>`;
    });
  }
  s += furniture(view, { light: true, scale: false, datums: false, compass: false });   // the cut reads W to E as everywhere else; the THRESHOLD label owns this corner
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
  if (hl) hl.innerHTML = `<div class="steps">${band.join("")}</div><div class="marks"><span style="top:0">${Ti}&#160;&#176;C</span><span style="top:${(Ti / (Ti - Te)) * 100}%">0&#160;&#176;C</span><span style="top:100%">${Te}&#160;&#176;C</span></div>`;
  const pos = (T) => `${Math.min(100, Math.max(0, ((Ti - T) / (Ti - Te)) * 100))}%`;
  window.renderWinterText = () => {
    const CRIT = critNow();
    document.getElementById("tlegend").innerHTML = `<div class="steps">${band.join("")}</div><div class="marks">`
      + [20, 15, 10, 5, 0, -5].map((T) => `<span style="top:${pos(T)}">${T}&#160;&#176;C</span>`).join("")
      + `<span class="special" style="top:${pos(DEW)}">${DEW.toFixed(1)}&#160;&#176;C &#183; dew point</span><span class="special" style="top:${pos(CRIT)}">${CRIT.toFixed(1)}&#160;&#176;C &#183; f<sub>Rsi</sub> 0.70</span><span class="special" style="top:${pos(0)}">0&#160;&#176;C</span></div>`
      + `<p class="lcap">Computed, 2&#160;&#176;C bands, fixed scale ${Te} to ${Ti}&#160;&#176;C. Now outside ${TeNow}&#160;&#176;C, inside ${Ti}&#160;&#176;C (ISO 13788). Lowest f<sub>Rsi</sub> ${Math.min(...DATA.therm.map((t) => t.fRsi)).toFixed(2)}, at any outside temperature.</p>`;
    document.getElementById("winter-stats").innerHTML = DATA.therm.map((t) => `<div class="${t.fRsi < HYGIENE ? "bad" : ""}"><b>${t.fRsi.toFixed(2)}</b><small>${t.name.toLowerCase()} f<sub>Rsi</sub>, coldest ${Tsurf(t).toFixed(1)}&#160;&#176;C${t.fRsi < HYGIENE ? ", under 0.70" : ""}${Tsurf(t) < DEW ? `<br><span class="dew">below the ${DEW.toFixed(1)}&#160;&#176;C dew point: condensation</span>` : ""}</small></div>`).join("");
    document.querySelectorAll("[data-dew]").forEach((el) => (el.hidden = !DATA.therm.some((t) => Tsurf(t) < DEW)));
  };
  renderWinterText();
}
// the scrub: drag the number sideways, or arrow keys; -25 to +10 degC
{
  const els = [...document.querySelectorAll("[data-te]")], fmt = (v) => `${v < 0 ? "\u2212" : ""}${Math.abs(v)}`;
  const setTe = (v) => {
    TeNow = Math.max(-25, Math.min(10, Math.round(v)));
    winter.fx.uTe.value.x = TeNow;
    for (const el of els) { el.textContent = `${fmt(TeNow)} \u00b0C`; el.setAttribute("aria-valuenow", TeNow); el.setAttribute("aria-valuetext", `${TeNow} degrees outside`); }
    document.querySelectorAll("[data-te-out]").forEach((el) => (el.textContent = fmt(TeNow)));
    document.querySelectorAll("[data-t-head]").forEach((el) => (el.textContent = Tsurf(DATA.therm.find((t) => t.name === "Head")).toFixed(1)));
    renderWinterText();
  };
  for (const el of els) {
    let x0 = 0, t0 = 0;
    el.addEventListener("pointerdown", (e) => { el.setPointerCapture(e.pointerId); x0 = e.clientX; t0 = TeNow; el.classList.add("on"); el.onpointermove = (m) => setTe(t0 + (m.clientX - x0) / 6); });
    el.addEventListener("pointerup", () => { el.onpointermove = null; el.classList.remove("on"); });
    el.addEventListener("keydown", (e) => { const d = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[e.key]; if (d) { setTe(TeNow + d); e.preventDefault(); } if (e.key === "Home") setTe(-25); if (e.key === "End") setTe(10); });
  }
}
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
{
  const q = document.getElementById("src-q"), count = document.getElementById("src-count"), groups = [...document.querySelectorAll("details.src")], types = [...document.querySelectorAll(".srcfind button")];
  let type = "";
  groups.forEach((g) => g.querySelector(".more")?.addEventListener("click", () => g.classList.add("all")));
  const run = () => {
    const t = q.value.trim().toLowerCase(), on = !!(t || type);
    let n = 0;
    groups.forEach((g) => {
      let k = 0;
      g.classList.toggle("filtering", on);
      g.querySelectorAll("li").forEach((li) => { const hit = on && (!type || (type === "Other" ? !["Code", "Standard", "Paper", "Guide", "Manufacturer"].includes(li.dataset.type) : li.dataset.type === type)) && (!t || li.textContent.toLowerCase().includes(t)); li.classList.toggle("hit", hit); k += hit; });
      if (on) g.open = k > 0;
      n += k;
    });
    count.textContent = on ? `${n} of ${DATA_NSRC} entries` : "";
  };
  const DATA_NSRC = groups.reduce((a, g) => a + g.querySelectorAll("li").length, 0);
  q.addEventListener("input", run);
  types.forEach((b) => b.addEventListener("click", () => { type = b.dataset.t; types.forEach((o) => o.setAttribute("aria-pressed", o === b)); run(); }));
}
const bStep = document.getElementById("b-step"), stageList = document.getElementById("stage-list");
stageList.innerHTML = DATA.stages.map((n, i) => `<li><button type="button" data-k="${i}"><span>${String(i + 1).padStart(2, "0")}</span><span>${n}</span></button></li>`).join("");
function showStage(k) {
  shown = k; arrive = reduceMotion ? 1 : 0;
  stageList.querySelectorAll("button").forEach((b) => (+b.dataset.k === k ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
  bStep.value = k + 1; bStep.setAttribute("aria-valuetext", `Stage ${k + 1} of ${DATA.stages.length}: ${DATA.stages[k]}`);
  stageNum.innerHTML = `${String(k + 1).padStart(2, "0")}<small> / ${stageDefs.length}</small>`;
  stageName.textContent = DATA.stages[k];
  const cap = document.querySelector("#build .axo-cap"); if (cap) cap.innerHTML = `<b>AXO 05</b> &#183; Build &#183; ${String(k + 1).padStart(2, "0")} / ${DATA.stages.length} &#183; ${DATA.stages[k]}`;
}
let timer = null;
// desktop: the build band is pinned and scrolling through it builds the fragment stage by stage
const buildSec = document.getElementById("build"), nStages = stageDefs.length;
const pinnedBuild = () => !reduceMotion && matchMedia("(min-width: 901px)").matches;
const stageAt = (k) => buildSec.offsetTop - 64 + ((k + 0.5) / nStages) * (buildSec.offsetHeight - (innerHeight - 64));
const goStage = (k) => showStage(k);   // a picked stage shows at once; scrolling resumes the sequence after the band
let buildHeld = false;
addEventListener("scroll", () => {
  if (!pinnedBuild()) return;
  const r = buildSec.getBoundingClientRect(), p = (64 - r.top) / (r.height - (innerHeight - 64));
  if (p < 0 || p > 1) { buildHeld = false; return; }
  if (buildHeld) return;
  const k = Math.min(nStages - 1, Math.floor(p * nStages));
  if (k !== shown) showStage(k);
}, { passive: true });
let playing = false;
document.getElementById("build-btn").onclick = (e) => {
  const btn = e.currentTarget;
  if (playing) { clearInterval(timer); playing = false; btn.textContent = "Resume"; return; }   // pause where it is
  if (reduceMotion) { showStage(stageDefs.length - 1); return; }
  let k = shown >= stageDefs.length - 1 ? 0 : shown;
  buildHeld = true; goStage(k); playing = true; btn.textContent = "Pause";
  timer = setInterval(() => { k++; if (k >= stageDefs.length) { clearInterval(timer); playing = false; btn.textContent = "Play again"; return; } goStage(k); }, 1100);
};
showStage(stageDefs.length - 1);
arrive = 1;
const stepTo = (k) => { clearInterval(timer); if (playing) { playing = false; document.getElementById("build-btn").textContent = "Resume"; } buildHeld = true; goStage(Math.min(Math.max(k, 0), stageDefs.length - 1)); };
bStep.max = stageDefs.length;
bStep.addEventListener("input", () => stepTo(bStep.value - 1));
document.getElementById("b-prev").onclick = () => stepTo(shown - 1);
stageList.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) stepTo(+b.dataset.k); });
document.getElementById("b-next").onclick = () => stepTo(shown + 1);
watch(buildCv, {
  frame(dt) {
    if (!build.resize()) return;
    arrive = Math.min(1, arrive + dt / 0.7);
    const e = 1 - Math.pow(1 - arrive, 3);
    build.groups.forEach((g, i) => { ghost(g, i > shown); g.node.visible = !(i > shown && i >= 11); build.lift(g, i === shown ? (1 - e) * 0.6 : 0); });
    build.fit(...build.size(), 0.6);
    build.render();
    let tag = "";
    const g = build.groups[shown], id = Object.keys(g.anchors)[0], a = id && build.anchor(id);
    if (a) { const [W] = build.size(), t = ("NOW \u00b7 " + DATA.stages[shown]).toUpperCase(), cut = t.lastIndexOf(" ", 28), lines = t.length > 28 ? [t.slice(0, cut), t.slice(cut + 1)] : [t], lx = W - 206;
      tag = `<g class="xnote now"><circle cx="${a[0]}" cy="${a[1]}" r="3"/><path d="${leader(a[0], a[1], lx - 6, a[1])}"/>${lines.map((l, k) => `<text x="${lx}" y="${a[1] + 4 + k * 14}">${l}</text>`).join("")}</g>`; }
    setSvg(buildOvl, build, furniture(build, { datums: false }) + tag);   // build reads as sequence; levels live in the other views
  },
});

// ================= embed (the tool's 3D tab): the hero alone, explode and winter on controls =================
// orbit stays in the section box's open quadrant (az -90..0, el 0..85), so every cut face keeps facing the camera
const ORBIT0 = { az: -36, el: 28 }, orbit = { ...ORBIT0, zoom: 1, pan: [0, 0] };   // pan: view-space metres
function zoomPan() {
  const c = hero.camera, hw = (c.right - c.left) / 2 / orbit.zoom, hh = (c.top - c.bottom) / 2 / orbit.zoom;
  const x = (c.left + c.right) / 2 + orbit.pan[0], y = (c.top + c.bottom) / 2 + orbit.pan[1];
  Object.assign(c, { left: x - hw, right: x + hw, top: y + hh, bottom: y - hh });
  c.updateProjectionMatrix();
}
if (embed) {   // the same three states as the landing's rail
  const turn = (daz, del) => { orbit.az = Math.min(0, Math.max(-90, orbit.az + daz)); orbit.el = Math.min(85, Math.max(0, orbit.el + del)); };
  const panBy = (dx, dy) => { const m = (hero.camera.right - hero.camera.left) / hero.size()[0]; orbit.pan[0] -= dx * m; orbit.pan[1] += dy * m; };
  function zoomAt(cx, cy, k) {   // keeps the point under the cursor still
    const z = Math.min(Math.max(orbit.zoom * k, 0.6), 12), r = heroCv.getBoundingClientRect(), c = hero.camera;
    k = z / orbit.zoom; orbit.zoom = z;
    orbit.pan[0] += ((cx - r.left) / r.width - 0.5) * (c.right - c.left) * (1 - 1 / k);
    orbit.pan[1] += (0.5 - (cy - r.top) / r.height) * (c.top - c.bottom) * (1 - 1 / k);
  }
  const reset = () => Object.assign(orbit, { ...ORBIT0, zoom: 1, pan: [0, 0] });
  // one pointer: drag orbits, shift- or right-drag pans; two pointers: pan and pinch
  const ptrs = new Map();
  let moved = 0;
  heroCv.addEventListener("pointerdown", (e) => { heroCv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (ptrs.size === 1) moved = 0; });
  heroCv.addEventListener("pointermove", (e) => {
    const p = ptrs.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    moved += Math.abs(dx) + Math.abs(dy);
    if (ptrs.size === 1) { if (e.shiftKey || e.buttons & 6) panBy(dx, dy); else turn(-dx * 0.3, dy * 0.3); }
    else {
      const [a, b] = [...ptrs.values()], d0 = Math.hypot(a.x - b.x, a.y - b.y);
      Object.assign(p, { x: e.clientX, y: e.clientY });
      panBy(dx / 2, dy / 2);
      zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, Math.hypot(a.x - b.x, a.y - b.y) / Math.max(d0, 1));
    }
    Object.assign(p, { x: e.clientX, y: e.clientY });
  });
  for (const t of ["pointerup", "pointercancel"]) heroCv.addEventListener(t, (e) => ptrs.delete(e.pointerId));
  heroCv.addEventListener("wheel", (e) => { e.preventDefault(); zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0015)); }, { passive: false });
  heroCv.addEventListener("contextmenu", (e) => e.preventDefault());
  heroCv.addEventListener("dblclick", reset);
  document.getElementById("view-reset").addEventListener("click", reset);
  heroEl.querySelector(".stage").removeAttribute("role");   // interactive here, not a picture
  Object.assign(heroCv, { tabIndex: 0 });
  heroCv.setAttribute("aria-label", "3D section-box axo. Arrow keys orbit, shift and arrows pan, plus and minus zoom, 0 resets the view.");
  heroCv.addEventListener("keydown", (e) => {
    const r = heroCv.getBoundingClientRect(), mid = [r.left + r.width / 2, r.top + r.height / 2];
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }, a = arrows[e.key];
    if (a) e.shiftKey ? panBy(a[0] * 30, a[1] * 30) : turn(-a[0] * 5, a[1] * 5);
    else if (e.key === "+" || e.key === "=") zoomAt(...mid, 1.25);
    else if (e.key === "-") zoomAt(...mid, 0.8);
    else if (e.key === "0" || e.key === "Home") reset();
    else return;
    e.preventDefault();
  });
  const bs = [...document.querySelectorAll(".embedctl button")];
  bs.forEach((b) => b.addEventListener("click", () => { pick = +b.dataset.k; bs.forEach((o) => o.setAttribute("aria-pressed", o === b)); }));
  const selectedMeshes = [];
  function markPart(id) {
    for (const mesh of selectedMeshes) { mesh.removeFromParent(); mesh.material.dispose(); }
    selectedMeshes.length = 0;
    let found = false;
    for (const g of hero.groups) {
      for (const mesh of [...g.node.children]) if (id && mesh.userData.partId === id) {
        const mat = new THREE.MeshBasicMaterial({ color: "#E0482B", transparent: true, opacity: 0.55, depthTest: false, depthWrite: false, side: THREE.DoubleSide, clippingPlanes: g.planes });
        const mark = new THREE.Mesh(mesh.geometry, mat);
        mark.renderOrder = 20;
        g.node.add(mark); selectedMeshes.push(mark); found = true;
      }
    }
    document.body.dataset.selectedPart = id ?? "";
    let status = document.getElementById("selection-status");
    if (!status) { status = document.createElement("p"); status.id = "selection-status"; status.setAttribute("role", "status"); heroEl.querySelector(".stage").appendChild(status); }
    const part = DATA.parts.find((p) => p.id === id);
    status.textContent = id ? (found ? `Selected: ${part?.name ?? id}` : "Selected part is outside this fixed 3D fragment. Inspect it in Draft.") : "";
    status.hidden = !id;
  }
  addEventListener("message", (e) => {
    if (e.source !== parent || e.origin !== location.origin || e.data?.type !== "livingedge:select") return;
    markPart(typeof e.data.id === "string" ? e.data.id : null);
  });
  const ray = new THREE.Raycaster();
  heroCv.addEventListener("click", (e) => {
    if (moved > 4) return;   // the end of a drag, not a pick
    const r = heroCv.getBoundingClientRect();
    ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, 1 - (e.clientY - r.top) / r.height * 2), hero.camera);
    const candidates = hero.groups.flatMap((g) => g.node.children.filter((m) => m.userData.partId));
    const hit = ray.intersectObjects(candidates, false).find((h) => (h.object.material.clippingPlanes ?? []).every((p) => p.distanceToPoint(h.point) >= -0.001));
    if (hit) { markPart(hit.object.userData.partId); parent.postMessage({ type: "livingedge:picked", id: hit.object.userData.partId }, location.origin); }
  });
  parent.postMessage({ type: "livingedge:ready" }, location.origin);
}
// entry: band figures rise into place once
if (!reduceMotion && "IntersectionObserver" in window) {
  const figs = (sec) => sec.querySelectorAll(":scope > .wrap > figure, :scope > .wrap > .frame");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { figs(e.target).forEach((f) => f.classList.add("in")); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("section.band").forEach((sec) => { figs(sec).forEach((f) => f.classList.add("reveal")); io.observe(sec); });
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
  document.documentElement.style.scrollBehavior = "auto";   // capture states jump, never glide
  const heroAt = (p) => scrollTo(0, heroEl.offsetTop + (heroEl.offsetHeight - innerHeight) * p);
  const go = (id) => document.getElementById(id).scrollIntoView({ block: "center" });
  const states = {
    hero: () => heroAt(0), explode: () => heroAt(0.27), "hero-winter": () => heroAt(0.8),
    age0: () => { go("age"); yr.value = 0; setYear(0); }, age30: () => { const f = () => (pinOK() ? scrollTo({ top: pinAt(ageSec, 0.9), behavior: "instant" }) : go("age")); f(); setTimeout(f, 600); yr.value = 30; setYear(30); },
    rain: () => { const f = () => (pinOK() ? scrollTo({ top: pinAt(rainSec, 0.5), behavior: "instant" }) : go("rain")); f(); setTimeout(f, 600); on(); }, winter: () => { go("winter"); setTimeout(() => go("winter"), 600); }, build: () => { const f = () => (pinnedBuild() ? scrollTo({ top: stageAt(6), behavior: "instant" }) : go("build")); f(); setTimeout(f, 600); showStage(6); arrive = 1; },
  };
  addEventListener("load", () => setTimeout(() => states[shot]?.(), 300));
}
