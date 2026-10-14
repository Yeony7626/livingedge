// Shared 3D engine for the landing page: one section-box fragment of the real Detail 02 model (the part list Rhino
// builds), drawn the way the user's references draw construction axos.
//   - Surfaces: sunlit materials with drawn texture (granite planks, cedar courses, concrete, soil, gravel).
//   - Cut faces: pale card with hairline hatch per material; the 12 mm threshold hatched in the signal colour.
//   - Line-weight hierarchy (px): cut outline 2.2 > silhouette 1.1 > joint inside the cut 0.9 > crease 0.5 >
//     hatch (hairline, in the shader). Seen lines fade from ink toward grey with depth behind the cut.
//   - Soil ends in a ragged break line, never a hard box bottom.
// buildModel() makes geometry once; createView() makes a scene of it for one canvas, with parts split into groups
// that can be lifted (explode) or shown stage by stage (build sequence).
// sectionShapes / sheetPoly / hatchOf / thinness come from geom.mjs, inlined above by build-landing.mjs.
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
RectAreaLightUniformsLib.init();

export const S = 0.001;
export const BOX = { x: [-4300, 1300], y: [-760, 3700], w: [800, 2000] };   // mm; the cut face w = WC lies in the sliding panel (rail runs 165-2340), between joists
const [XL] = BOX.x, [YB, YT] = BOX.y, [W0, WC] = BOX.w;
export const CUTW = WC;
const VIEW = { az: -36, el: 28 };
export const INK = new THREE.Color("#1B1B1A"), SIGNAL = new THREE.Color("#E0482B"), WATER = new THREE.Color("#2F6FB0");
const FADE = new THREE.Color("#A8A397");
const RAG = 0.2;   // the soil's ragged break sits within this band above the box bottom (m)
export const FOCUS_IDS = new Set(["sill-block", "sill-bearer", "sill-nosing", "track", "track-rail", "sill-cover", "sill-foil", "pan", "pan-back", "dam-angle", "landing-tray", "tray-slips"]);
export const VIEWDIR = (() => { const az = (VIEW.az * Math.PI) / 180, el = (VIEW.el * Math.PI) / 180; return new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)); })();
export const pxUniform = { value: 0.004 };   // world metres per screen pixel, set before each render
export const timeU = { value: 0 };

// ---------- solids ----------
const shapeOf = (pts) => new THREE.Shape(pts.map(([a, b]) => new THREE.Vector2(a * S, b * S)));
const RUNS = [[-1200, 6000]];
function solids(p) {
  const k = p.type ?? (p.axis === "x" ? "prism-x" : "prism"), out = [];
  if (k === "prism" || k === "sheet") {
    const pts = k === "sheet" ? sheetPoly(p) : p.poly;
    for (const [w0, w1] of p.runs ?? RUNS) {
      if (w1 < W0 || w0 > WC) continue;
      const g = new THREE.ExtrudeGeometry(shapeOf(pts), { depth: (w1 - w0) * S, bevelEnabled: false });
      g.translate(0, 0, w0 * S);
      out.push(g);
    }
  } else if (k === "prism-x") {
    const g = new THREE.ExtrudeGeometry(shapeOf(p.poly), { depth: (p.x[1] - p.x[0]) * S, bevelEnabled: false });
    g.rotateY(-Math.PI / 2);
    g.translate(p.x[1] * S, 0, 0);
    out.push(g);
  } else if (k === "rod") {
    const r = (p.d / 2) * S;
    if (p.axis === "w") { if (p.to >= W0 && p.from <= WC) for (const [x, y] of p.at ?? [[p.x, p.y]]) {
      const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 24);
      g.rotateX(Math.PI / 2);
      g.translate(x * S, (y + (p.dy ?? 0) / 2) * S, ((p.from + p.to) / 2) * S);
      out.push(g);
    } } else if (p.axis === "y") { for (const w of p.w) if (w + p.d >= W0 && w - p.d <= WC) {
      const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 24);
      g.translate(p.x * S, ((p.from + p.to) / 2) * S, w * S);
      out.push(g);
    } } else for (const w of p.w) if (w + p.d >= W0 && w - p.d <= WC) for (const y of p.ys ?? [p.y]) {
      const len = Math.hypot(p.to - p.from, p.dy ?? 0), g = new THREE.CylinderGeometry(r, r, len * S, 16);
      g.rotateZ(Math.atan2(p.dy ?? 0, p.to - p.from) - Math.PI / 2);
      g.translate(((p.from + p.to) / 2) * S, (y + (p.dy ?? 0) / 2) * S, w * S);
      out.push(g);
    }
  }
  return out;
}

// ---------- cut faces on the three box planes (plane coordinates u, v in mm) ----------
// plane "w": (x, y) at w = WC; plane "y": (x, w) at y = YT; plane "x": (w, y) at x = XL
const BOUNDS = { w: [[XL, 1e9], [YB, YT]], y: [[XL, 1e9], [W0, WC]], x: [[W0, WC], [YB, YT]] };
function clipRect(poly, [[u0, u1], [v0, v1]]) {
  const edge = (pts, inside, cut) => { const out = []; pts.forEach((a, i) => { const b = pts[(i + 1) % pts.length], ia = inside(a), ib = inside(b); if (ia) out.push(a); if (ia !== ib) out.push(cut(a, b)); }); return out; };
  const at = (i, val) => (a, b) => { const t = (val - a[i]) / (b[i] - a[i]); return i === 0 ? [val, a[1] + t * (b[1] - a[1])] : [a[0] + t * (b[0] - a[0]), val]; };
  let p = poly;
  for (const [inside, cut] of [[(q) => q[0] >= u0, at(0, u0)], [(q) => q[0] <= u1, at(0, u1)], [(q) => q[1] >= v0, at(1, v0)], [(q) => q[1] <= v1, at(1, v1)]]) { if (p.length < 3) return []; p = edge(p, inside, cut); }
  return p.length >= 3 ? p : [];
}
export function crossings(poly, i, val) {
  const out = [];
  poly.forEach((a, k) => { const b = poly[(k + 1) % poly.length]; if ((a[i] <= val) !== (b[i] <= val)) out.push(a[1 - i] + ((val - a[i]) / (b[i] - a[i])) * (b[1 - i] - a[1 - i])); });
  out.sort((m, n) => m - n);
  const pairs = [];
  for (let k = 0; k + 1 < out.length; k += 2) pairs.push([out[k], out[k + 1]]);
  return pairs;
}
const rect = (u0, u1, v0, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
const circle = (u, v, r, n = 28) => Array.from({ length: n }, (_, k) => [u + r * Math.cos((k / n) * 2 * Math.PI), v + r * Math.sin((k / n) * 2 * Math.PI)]);
function caps(p) {
  const out = [], add = (plane, poly) => { const c = clipRect(poly, BOUNDS[plane]); if (c.length) out.push({ plane, poly: c }); };
  for (const s of sectionShapes(p, WC)) add("w", s.circle ? circle(s.circle[0], s.circle[1], s.circle[2]) : s.poly);
  const k = p.type ?? (p.axis === "x" ? "prism-x" : "prism");
  if (k === "prism" || k === "sheet") {
    const poly = k === "sheet" ? sheetPoly(p) : p.poly;
    for (const [w0, w1] of p.runs ?? RUNS) {
      for (const [x0, x1] of crossings(poly, 1, YT)) add("y", rect(x0, x1, w0, w1));
      for (const [y0, y1] of crossings(poly, 0, XL)) add("x", rect(w0, w1, y0, y1));
    }
  } else if (k === "prism-x") {
    for (const [w0, w1] of crossings(p.poly, 1, YT)) add("y", rect(p.x[0], p.x[1], w0, w1));
    if (p.x[0] <= XL && XL <= p.x[1]) add("x", p.poly);
  } else if (k === "rod") {
    const r = p.d / 2, c = (d) => Math.sqrt(Math.max(r * r - d * d, 0));
    if (p.axis === "w") for (const [x, y] of p.at ?? [[p.x, p.y]]) {
      if (Math.abs(y - YT) < r) add("y", rect(x - c(y - YT), x + c(y - YT), p.from, p.to));
      if (Math.abs(x - XL) < r) add("x", rect(p.from, p.to, y - c(x - XL), y + c(x - XL)));
    } else if (p.axis === "y") for (const w of p.w) {
      if (p.from <= YT && YT <= p.to) add("y", circle(p.x, w, r));
      if (Math.abs(p.x - XL) < r) add("x", rect(w - c(p.x - XL), w + c(p.x - XL), p.from, p.to));
    } else for (const w of p.w) for (const y of p.ys ?? [p.y]) {
      if (Math.abs(y - YT) < r) add("y", rect(p.from, p.to, w - c(y - YT), w + c(y - YT)));
      if (p.from <= XL && XL <= p.to) add("x", circle(w, y, r));
    }
  }
  return out;
}
const E = 0.0004;
export const toWorld = (plane, u, v) => plane === "w" ? [u * S, v * S, WC * S + E] : plane === "y" ? [u * S, YT * S + E, v * S] : [XL * S - E, v * S, u * S];
function capGeometry(plane, poly) {
  const g = new THREE.ShapeGeometry(shapeOf(poly));
  if (plane === "w") g.translate(0, 0, WC * S + E);
  else if (plane === "y") { g.rotateX(Math.PI / 2); g.translate(0, YT * S + E, 0); }
  else { g.rotateY(-Math.PI / 2); g.translate(XL * S - E, 0, 0); }
  return g;
}
function inPoly(poly, u, v) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ui, vi] = poly[i], [uj, vj] = poly[j];
    if ((vi > v) !== (vj > v) && u < ((uj - ui) * (v - vi)) / (vj - vi) + ui) c = !c;
  }
  return c;
}
export function innerPoint(poly) {   // a point inside a cut polygon (plane coordinates)
  const ys = poly.map((q) => q[1]), y = (Math.min(...ys) + Math.max(...ys)) / 2, [x0, x1] = crossings(poly, 1, y)[0] ?? [poly[0][0], poly[0][0]];
  return [(x0 + x1) / 2, y];
}

// ---------- seen lines: silhouettes and creases for the fixed view direction ----------
function classify(g, sil, crease) {
  const pos = g.attributes.position, idx = g.index, n = idx ? idx.count : pos.count;
  const key = (i) => `${Math.round(pos.getX(i) * 1e5)},${Math.round(pos.getY(i) * 1e5)},${Math.round(pos.getZ(i) * 1e5)}`;
  const edges = new Map(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let t = 0; t < n; t += 3) {
    const ids = [0, 1, 2].map((k) => (idx ? idx.getX(t + k) : t + k));
    a.fromBufferAttribute(pos, ids[0]); b.fromBufferAttribute(pos, ids[1]); c.fromBufferAttribute(pos, ids[2]);
    const nn = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a));
    if (nn.lengthSq() < 1e-14) continue;
    nn.normalize();
    for (let k = 0; k < 3; k++) {
      const i0 = ids[k], i1 = ids[(k + 1) % 3], k0 = key(i0), k1 = key(i1), ek = k0 < k1 ? k0 + "|" + k1 : k1 + "|" + k0;
      if (!edges.has(ek)) edges.set(ek, { a: [pos.getX(i0), pos.getY(i0), pos.getZ(i0)], b: [pos.getX(i1), pos.getY(i1), pos.getZ(i1)], ns: [] });
      edges.get(ek).ns.push(nn);
    }
  }
  const cos20 = Math.cos((30 * Math.PI) / 180);   // crease threshold 30 deg (research 18 c5)
  for (const e of edges.values()) {
    const [n1, n2] = e.ns, f1 = n1.dot(VIEWDIR) > 0, f2 = n2 ? n2.dot(VIEWDIR) > 0 : !f1;
    if (f1 !== f2) sil.push(e.a, e.b);
    else if (f1 && n2 && n1.dot(n2) < cos20) crease.push(e.a, e.b);
  }
}
const LIFT = 0.001;
const toCam = (x, y, z) => [x + VIEWDIR.x * LIFT, y + VIEWDIR.y * LIFT, z + VIEWDIR.z * LIFT];
const LO = [XL * S, YB * S + RAG, W0 * S], HI = [1e9, YT * S, WC * S];
function clipSeg(a, b) {   // Liang-Barsky against the section box (lines stop above the ragged soil band)
  let t0 = 0, t1 = 1;
  for (let k = 0; k < 3; k++) for (const [bound, sg] of [[LO[k], 1], [HI[k], -1]]) {
    const p = sg * (b[k] - a[k]), q = sg * (a[k] - bound);
    if (Math.abs(p) < 1e-12) { if (q < 0) return null; continue; }
    const t = -q / p;
    if (p > 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t);
    if (t0 > t1) return null;
  }
  const at = (t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  return [at(t0), at(t1)];
}
function fadedLines(pts, width, opacity, planes) {
  if (!pts.length) return null;
  const pos = [], col = [], seen = new Set(), key = (p) => p.map((v) => Math.round(v * 2000)).join(",");
  for (let i = 0; i + 1 < pts.length; i += 2) {
    const s = clipSeg(pts[i], pts[i + 1]);
    if (!s) continue;
    const k1 = key(s[0]), k2 = key(s[1]), k = k1 < k2 ? k1 + "|" + k2 : k2 + "|" + k1;
    if (seen.has(k) || k1 === k2) continue;
    seen.add(k);
    for (const p of s) {
      pos.push(...toCam(...p));
      const c = INK.clone().lerp(FADE, Math.min(Math.max((WC * S - p[2]) / ((WC - W0) * S), 0), 1) * 0.35);
      col.push(c.r, c.g, c.b);
    }
  }
  if (!pos.length) return null;
  return new LineSegments2(new LineSegmentsGeometry().setPositions(pos).setColors(col), new LineMaterial({ vertexColors: true, linewidth: width, transparent: opacity < 1, opacity, clippingPlanes: planes }));
}
const lifted = (segs) => { const o = []; for (let i = 0; i < segs.length; i += 3) o.push(...toCam(segs[i], segs[i + 1], segs[i + 2])); return o; };
const flatLines = (segs, color, width, planes) => segs.length ? new LineSegments2(new LineSegmentsGeometry().setPositions(lifted(segs)), new LineMaterial({ color, linewidth: width, clippingPlanes: planes, depthTest: false })) : null;

// ---------- surface textures: greyscale detail, tinted by the finish colour; tile sizes in metres ----------
function canvasTex(size, tu, tv, paint) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  paint(cv.getContext("2d"), size);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / tu, 1 / tv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
let seedN = 11;
export const rnd = () => ((seedN = (seedN * 16807) % 2147483647) / 2147483647);
const dots = (c, n, size, r0, r1, shade) => { for (let i = 0; i < n; i++) { c.fillStyle = shade(); c.beginPath(); c.arc(rnd() * size, rnd() * size, r0 + rnd() * (r1 - r0), 0, 7); c.fill(); } };
const grey = (lo, hi, a = 1) => () => { const v = (lo + rnd() * (hi - lo)) | 0; return `rgba(${v},${v},${v},${a})`; };
const TEX = {
  // granite planks 150 wide across x, staggered end joints along the wall (top faces map u = x, v = w)
  stone: canvasTex(512, 0.6, 0.9, (c, n) => {
    c.fillStyle = "#e8e8e8"; c.fillRect(0, 0, n, n);
    for (let k = 0; k < 4; k++) { const v = (225 + rnd() * 25) | 0; c.fillStyle = `rgba(${v},${v},${v},.6)`; c.fillRect((k * n) / 4, 0, n / 4, n); }
    dots(c, 5200, n, 0.9, 1.8, grey(120, 170, 0.65)); dots(c, 2600, n, 0.8, 1.6, grey(245, 255, 0.85)); dots(c, 1600, n, 1.0, 1.7, grey(70, 105, 0.6)); dots(c, 6000, n, 0.3, 0.7, grey(150, 210, 0.5));
    c.strokeStyle = "rgba(70,68,64,.85)"; c.lineWidth = 2.2;
    for (let k = 0; k <= 4; k++) { c.beginPath(); c.moveTo((k * n) / 4, 0); c.lineTo((k * n) / 4, n); c.stroke(); }
    for (let k = 0; k < 4; k++) { const v = (0.15 + k * 0.23 + rnd() * 0.15) * n; c.beginPath(); c.moveTo((k * n) / 4, v); c.lineTo(((k + 1) * n) / 4, v); c.stroke(); }
  }),
  concrete: canvasTex(512, 0.9, 0.9, (c, n) => { c.fillStyle = "#ededed"; c.fillRect(0, 0, n, n); dots(c, 60, n, 20, 70, grey(215, 250, 0.12)); dots(c, 1800, n, 0.3, 1.1, grey(150, 200, 0.6)); dots(c, 140, n, 0.8, 1.8, grey(110, 150, 0.5)); }),
  gravel: canvasTex(512, 0.25, 0.25, (c, n) => { c.fillStyle = "#b9b9b9"; c.fillRect(0, 0, n, n); for (let i = 0; i < 520; i++) { const x = rnd() * n, y = rnd() * n, r = 5 + rnd() * 11, v = (170 + rnd() * 80) | 0; c.fillStyle = `rgb(${v},${v},${v})`; c.beginPath(); c.ellipse(x, y, r, r * (0.6 + rnd() * 0.3), rnd() * 3, 0, 7); c.fill(); c.strokeStyle = "rgba(70,70,70,.35)"; c.stroke(); } }),
  soil: canvasTex(512, 0.6, 0.6, (c, n) => { c.fillStyle = "#cfcfcf"; c.fillRect(0, 0, n, n); dots(c, 300, n, 4, 16, grey(150, 230, 0.25)); dots(c, 5000, n, 0.4, 1.5, grey(90, 160, 0.6)); dots(c, 300, n, 1.5, 3.5, grey(200, 245, 0.7)); }),
  wood: canvasTex(512, 0.8, 0.8, (c, n) => { c.fillStyle = "#e9e9e9"; c.fillRect(0, 0, n, n); for (let i = 0; i < 90; i++) { const y0 = rnd() * n, a = 1 + rnd() * 4, f = 0.004 + rnd() * 0.01, ph = rnd() * 6, v = (150 + rnd() * 80) | 0; c.strokeStyle = `rgba(${v},${v},${v},${0.25 + rnd() * 0.35})`; c.lineWidth = 0.6 + rnd() * 1.6; c.beginPath(); for (let x = 0; x <= n; x += 8) c.lineTo(x, y0 + a * Math.sin(x * f + ph)); c.stroke(); } }),
  // cedar channel siding: horizontal courses ~140 high (the wall face maps u = y, v = w), grain along each board
  cedar: canvasTex(512, 0.56, 1.2, (c, n) => {
    c.fillStyle = "#e6e6e6"; c.fillRect(0, 0, n, n);
    for (let k = 0; k < 4; k++) { const v = (205 + rnd() * 45) | 0; c.fillStyle = `rgb(${v},${v},${v})`; c.fillRect((k * n) / 4, 0, n / 4, n); }
    for (let i = 0; i < 120; i++) { const x0 = rnd() * n, ph = rnd() * 6, v = (140 + rnd() * 80) | 0; c.strokeStyle = `rgba(${v},${v},${v},${0.2 + rnd() * 0.3})`; c.lineWidth = 0.5 + rnd(); c.beginPath(); for (let y = 0; y <= n; y += 8) c.lineTo(x0 + 1.5 * Math.sin(y * 0.01 + ph), y); c.stroke(); }
    c.fillStyle = "rgba(40,36,30,.75)"; for (let k = 0; k < 4; k++) c.fillRect((k * n) / 4, 0, 3, n);
  }),
  fine: canvasTex(256, 0.3, 0.3, (c, n) => { c.fillStyle = "#ececec"; c.fillRect(0, 0, n, n); dots(c, 2200, n, 0.3, 0.9, grey(185, 225, 0.6)); }),
};
const FAMILY = (m) => /reclaimed-stone|granite|paver/.test(m) ? "stone" : /concrete|parge/.test(m) ? "concrete" : /aggregate/.test(m) ? "gravel" : /^soil/.test(m) ? "soil"
  : /cedar-siding/.test(m) ? "cedar" : /glulam|softwood|plywood|cedar/.test(m) ? "wood" : /igu|glass/.test(m) ? "glass" : /stainless|aluminium|steel/.test(m) ? "metal"
  : /hdpe|ldpe|epdm|butyl|sbs|membrane|geotextile/.test(m) ? "membrane" : "fine";
export const TONE = { "cedar-siding": "#a8906f", "cedar-soffit": "#b89a76", glulam: "#d8b98d", "softwood-lumber": "#dcc29a", "softwood-pt": "#bfa27c", plywood: "#d6bb92", "reclaimed-stone": "#bdbab3",
  "concrete-lowcarbon": "#bdb6aa", "concrete-f2-40scm": "#c3bfb6", "polymer-concrete": "#77797b", aggregate: "#b3aea4", soil: "#7a6450", "soil-imported": "#6a5442", "steel-prefinished": "#4a4b4d",
  aluminium: "#4a4b4d", stainless: "#b7b9ba", "graphite-eps": "#9a9aa0", gypsum: "#f3f1ec", "parge-charcoal": "#55524f", "woodfibre-board": "#a8875f", cork: "#a77b55",
  "pu-structural-160": "#d4cc8a", "pu-structural": "#d4cc8a", comfortbatt: "#d7c48e", "comfortboard-80": "#cdb780", "cellulose-dense": "#cdbb8c", "cellular-glass": "#4a4a4c" };

// ---------- materials ----------
// Weather hooks shared by every rendered material of a view (fx): uWet 0..1 darkens and glosses the faces rain can
// reach; uAge 0..30 years draws the weathering marks the reviewers predict (splash band over the cap, algae line).
const EXPOSURE = `
float exposure(vec3 p, vec3 n) {
  float up = smoothstep(0.55, 0.8, n.y), west = smoothstep(0.55, 0.8, -n.x);
  float open = step(p.x, -0.757);
  float canopy = step(2.9, p.y) * step(p.x, -0.094);
  float under = (1.0 - open) * step(p.x, 0.16) * step(p.y, 0.2) * clamp((0.16 - p.x) / 0.95, 0.0, 1.0) * 0.85;
  float wall = west * step(2.95, p.y) * step(p.x, -0.05);
  float fascia = west * step(-0.8, p.x) * step(p.x, -0.74);
  return clamp(max(up * max(max(open, canopy), under), max(wall * 0.9, fascia)), 0.0, 1.0);
}
float marks(vec3 p, vec3 n, float age) {   // splash band: darkening factor
  float k = smoothstep(0.0, 5.0, age), top = 2.95 + 0.3 * (0.8 + 0.2 * sin(p.z * 37.0) * sin(p.z * 11.0));
  return k * 0.22 * smoothstep(0.55, 0.8, -n.x) * step(p.x, -0.05) * step(2.95, p.y) * (1.0 - smoothstep(top - 0.04, top, p.y));
}
float algae(vec3 p, vec3 n, float age) {   // algae line under the drip: coverage of #3E4636
  return smoothstep(0.0, 5.0, age) * 0.45 * smoothstep(0.55, 0.8, n.y) * step(p.y, 0.1) * (1.0 - smoothstep(0.02, 0.03, abs(p.x + 0.757)));
}`;
// (open: beyond the canopy drip edge at x -0.757; canopy: its top and the wall above it; under: wind-driven rain
// reaching the landing under the canopy, fading toward the door; wall/fascia: west-facing faces on the weather side)
const RAGGED = (v) => `float tr = ${v}.x - ${v}.z; float yr = uYB + 0.1 + 0.045 * sin(tr * 6.3) + 0.025 * sin(tr * 17.1 + 1.3) + 0.014 * sin(tr * 43.7 + 0.4);`;
function rendered(mat, group, fx) {
  const fam = FAMILY(mat ?? ""), tone = TONE[mat] ?? "#cfcac0";
  const opts = { color: tone, roughness: 0.9, metalness: 0, side: THREE.DoubleSide, clippingPlanes: group.planes, clipShadows: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 };
  if (fam === "glass") Object.assign(opts, { color: "#d6e6e9", transparent: true, opacity: 0.15, roughness: 0.04, metalness: 0.1, depthWrite: false });
  else if (fam === "metal") Object.assign(opts, { roughness: 0.55, metalness: mat === "stainless" ? 0.55 : 0.2 });
  else if (fam === "membrane") Object.assign(opts, { color: "#4a4b4e", roughness: 0.7 });
  else if (TEX[fam]) opts.map = TEX[fam];
  opts.envMapIntensity = fam === "glass" ? 1.0 : 0.3;
  { const c = new THREE.Color(opts.color), l = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; if (l < 0.32 && fam !== "glass") opts.color = c.lerp(new THREE.Color("#b8b3ab"), 0.45 * (1 - l / 0.32) + 0.15); }
  const m = new THREE.MeshStandardMaterial(opts);
  m.userData.tone = opts.color;
  m.userData.glass = fam === "glass";
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { uYB: group.uYB, uPx: pxUniform, uWet: fx.uWet, uAge: fx.uAge, uFrost: fx.uFrost, uNightS: fx.uNight });
    sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP; varying vec3 vWorldN;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWorldN = normalize(mat3(modelMatrix) * objectNormal);");
    sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP; varying vec3 vWorldN; uniform float uYB; uniform float uPx; uniform float uWet; uniform float uAge; uniform float uFrost; uniform float uNightS;\n" + EXPOSURE)
      .replace("#include <map_fragment>", "#include <map_fragment>\nvec3 wn = normalize(vWorldN) * (gl_FrontFacing ? 1.0 : -1.0); float wet = uWet * exposure(vWorldP, wn); float mk = marks(vWorldP, wn, uAge);\ndiffuseColor.rgb = mix(diffuseColor.rgb * mix(1.0, 0.58, wet) * (1.0 - mk), vec3(0.0482, 0.0578, 0.0368), algae(vWorldP, wn, uAge));\nfloat fz = uFrost * smoothstep(0.55, 0.8, wn.y) * exposure(vWorldP, wn); diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.8, 0.85, 0.9), fz * 0.25);" + (fam === "glass" ? "" : "\ndiffuseColor.rgb = mix(diffuseColor.rgb, vec3(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114))), uNightS * 0.9);"))
      .replace("#include <roughnessmap_fragment>", "#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.12, wet); roughnessFactor = mix(roughnessFactor, 0.35, fz);")
      .replace("void main() {", `void main() {\n${RAGGED("vWorldP")}\nif (vWorldP.y < yr) discard;`)
      .replace("#include <dithering_fragment>", "#include <dithering_fragment>\nif (vWorldP.y - yr < uPx * 1.3) gl_FragColor.rgb = vec3(0.106, 0.106, 0.102);" + (fam === "glass" ? "\nfloat fr = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 3.0); gl_FragColor.a = mix(0.15, 0.6, fr);" : ""));
  };
  return m;
}
const CUT_VERT = `varying vec3 vW;
void main() { vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const CUT_FRAG = `
uniform float uYB; uniform vec3 uTint; uniform vec3 uInk; uniform int uPat; uniform int uAx; uniform float uPx; uniform float uDens; uniform float uHatchK; uniform float uCardK;
uniform float uTherm; uniform sampler2D uT0; uniform sampler2D uT1; uniform vec4 uB0; uniform vec4 uB1; uniform vec2 uTe; uniform vec2 uScale; uniform float uNight;
varying vec3 vW;
// perceptually uniform, greyscale-safe sequential map (inferno; polynomial fit), returned in display sRGB
vec3 inferno(float t) {
  const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
  const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
  const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
  const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
  const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
  const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
  const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);
  t = clamp(t, 0.0, 1.0);
  return clamp(c0 + t * (c1 + t * (c2 + t * (c3 + t * (c4 + t * (c5 + t * c6))))), 0.0, 1.0);
}
// computed temperature (degC) at a point of the cut, alpha 0 where there is no field (air, or outside the solved crops)
vec4 field(sampler2D t, vec4 b, vec2 p) {
  vec2 uv = (p - b.xy) / (b.zw - b.xy);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return vec4(0.0);
  float v = texture2D(t, uv).r;
  if (v > 0.998) return vec4(0.0);
  float u = v * 255.0 / 254.0, T = mix(uTe.x, uTe.y, u), fw = max(fwidth(T), 1e-4);
  // stepped 2 degC bands on the fixed span of the boundary conditions
  float Tq = floor(T / 2.0) * 2.0 + 1.0;
  vec3 c = inferno(0.1 + 0.9 * clamp((Tq - uScale.x) / (uScale.y - uScale.x), 0.0, 1.0));   // absolute scale (the design conditions); from 0.1 the cold end reads as a colour
  // isotherms: 0.5 px every 2 degC, 1 px every 10 degC; special isotherms (solid, light): 0 degC and the fRsi 0.70 temperature
  float d2 = min(fract(T / 2.0), 1.0 - fract(T / 2.0)) * 2.0 / fw, d10 = min(fract(T / 10.0), 1.0 - fract(T / 10.0)) * 10.0 / fw;
  // research 18 c9: 0.75 px every 2 degC, 1.25 px every 10 degC, dark on light bands and light on dark ones
  float l2 = 1.0 - smoothstep(0.375, 1.125, d2), l10 = 1.0 - smoothstep(0.625, 1.375, d10), ln = max(l2 * 0.7, l10);
  float lu = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(c, lu > 0.35 ? c * 0.45 : mix(c, vec3(0.96), 0.5), ln);
  float crit = uTe.x + 0.7 * (uTe.y - uTe.x);
  float sp = min(abs(T) / fw, abs(T - crit) / fw);
  c = mix(c, vec3(0.97, 0.97, 0.95), 1.0 - smoothstep(0.875, 1.625, sp));   // special isotherms 1.75 px
  return vec4(pow(c, vec3(2.2)), 1.0);
}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hair(float d, float w) { return 1.0 - smoothstep(w * 0.5, w * 0.5 + 0.75, abs(d)); }
float stripes(float t, float sp, float w) { float d = mod(t, sp); return hair(min(d, sp - d), w); }
float stipple(vec2 p, float cell, float dens, float r) { vec2 c = floor(p / cell); vec2 o = (vec2(hash(c), hash(c + 17.0)) * 0.8 + 0.1) * cell; return step(hash(c + 5.3), dens) * (1.0 - smoothstep(r, r + 0.8, length(p - c * cell - o))); }
void main() {
  ${RAGGED("vW")}
  float dr = (vW.y - yr) / uPx;
  if (dr < 0.0) discard;
  vec2 uv = uAx == 1 ? vW.xz : (uAx == 0 ? vW.zy : vW.xy);
  vec2 p = uv / uPx;
  float ink = 0.0;
  if (uPat == 2) ink = stipple(p, 3.0, uDens, 0.45) * 0.7;
  else if (uPat == 3) ink = stripes((p.x + p.y) * 0.7071, 5.0, 0.45) * 0.75;
  else if (uPat == 4) ink = max(stripes((p.x + p.y) * 0.7071, 6.0, 0.4), stripes((p.x - p.y) * 0.7071, 6.0, 0.4)) * 0.65;
  else if (uPat == 5) ink = stripes(p.y + 2.6 * sin(p.x * 0.42), 7.0, 0.45) * 0.7;
  else if (uPat == 6) { vec2 c = floor(p / 9.0); vec2 o = c * 9.0 + 4.5 + (vec2(hash(c), hash(c + 3.0)) - 0.5) * 2.0; float r = 2.2 + hash(c + 9.0) * 1.6; ink = hair(length(p - o) - r, 0.45) * 0.75; }
  else if (uPat == 7) ink = 1.0;
  else if (uPat == 8) ink = stripes((p.x + p.y) * 0.7071, 3.2, 0.4) * 0.65;
  else if (uPat == 9) { float t = (p.x + p.y) * 0.7071, s = (p.x - p.y) * 0.7071; float k = floor(t / 10.0); ink = max(stripes(t, 10.0, 0.45) * step(0.55, fract(s / 16.0 + hash(vec2(k, 1.0)))), stipple(p, 4.0, 0.22, 0.45)) * 0.7; }
  // concrete: aggregate stipple + small open triangles
  else if (uPat == 10) { vec2 c = floor(p / 7.0), q = p - c * 7.0 - vec2(hash(c), hash(c + 2.0)) * 3.0 - 2.0; float tri = max(abs(q.x) * 0.866 + q.y * 0.5, -q.y) - 1.4; ink = max(stipple(p, 3.0, 0.3, 0.4), hair(tri, 0.45) * step(0.55, hash(c + 7.0))) * 0.7; }
  // glulam: lamella joints at true lam depth (38 mm) with end-grain crosses
  else if (uPat == 11) { float lam = vW.y / 0.038; float dj = min(fract(lam), 1.0 - fract(lam)) * 0.038 / uPx; ink = max(1.0 - smoothstep(0.3, 1.1, dj), max(stripes((p.x + p.y) * 0.7071, 6.0, 0.35), stripes((p.x - p.y) * 0.7071, 6.0, 0.35)) * 0.45) * 0.75; }
  // granite: sparse short strokes
  else if (uPat == 12) { vec2 c = floor(p / 10.0), q = p - c * 10.0 - 5.0 - (vec2(hash(c), hash(c + 4.0)) - 0.5) * 4.0; float a = hash(c + 8.0) * 3.14; vec2 r = vec2(cos(a) * q.x + sin(a) * q.y, -sin(a) * q.x + cos(a) * q.y); ink = hair(r.y, 0.45) * step(abs(r.x), 2.2) * step(0.35, hash(c + 1.0)) * 0.7; }
  // rigid insulation: 45 degree lines with a dotted line between
  else if (uPat == 13) { float t = (p.x - p.y) * 0.7071; float m = mod(t + 3.0, 6.0); ink = max(stripes(t, 6.0, 0.45), hair(min(m, 6.0 - m), 0.45) * step(0.5, fract((p.x + p.y) * 0.7071 / 2.2))) * 0.65; }
  // metal 4 px or thicker: close 45 degree lines, opposite angle to concrete
  else if (uPat == 15) ink = stripes((p.x - p.y) * 0.7071, 3.0, 0.45) * 0.75;
  if (uPat == 9) ink *= 0.6;   // soil hatch quieter than built materials
  if (uPat != 7) ink *= uHatchK;   // hatch ink mass at most a quarter of the outer cut (research 18 R3)
  vec3 col = mix(uTint * uCardK, uInk, clamp(ink, 0.0, 1.0));   // lifted so the card reads pale after AgX and AO (designer, runs 2-3)   // lifted so the card stays pale after AgX and AO (designer, run 2)
  col = mix(col, vec3(0.022, 0.027, 0.039), uNight * 0.9);   // uncomputed cut faces turn to dark poche at night
  if (uAx == 2 && uTherm > 0.0) { vec4 f0 = field(uT0, uB0, vW.xy), f1 = field(uT1, uB1, vW.xy), f = f0.a > 0.0 ? f0 : f1; col = mix(col, f.rgb, f.a * uTherm * 0.85); }
  if (dr < 0.9) col = mix(col, vec3(0.106, 0.106, 0.102), 0.45);   // break line, light (research 18 review)
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;
// cut hatch per material (research 17 §2): [pattern, density, tint]. Patterns: 2 stipple, 4 crossed (end grain), 5 batt,
// 6 pebbles, 7 solid ink, 9 earth, 10 concrete, 11 glulam lamellae, 12 granite strokes, 13 rigid insulation, 15 metal
function cutSpec(p, h) {
  const m = p.mat ?? "";
  if (/glulam/.test(m)) return [11, 0, "#ecdcbf"];
  if (h === "timber") return [4, 0, "#eadcc4"];
  if (/concrete|parge|polymer/.test(m)) return [10, 0, "#e4e1da"];
  if (h === "rigid") return [13, 0, /graphite/.test(m) ? "#d9d9dd" : "#e6e1d4"];
  if (h === "batt") return [5, 0, "#efe6cc"];
  if (h === "gravel") return [6, 0, "#e3ded3"];
  if (h === "stone") return [12, 0, "#cfccc6"];
  if (/^soil-imported/.test(m)) return [9, 0, "#cdbca6"];
  if (h === "earth") return [9, 0, "#dccfbd"];
  if (h === "gyp") return [2, 0.35, "#f3f1ec"];
  if (h === "glass") return [0, 0, "#dde9ec"];
  if (h === "ink") return [/stainless|aluminium|steel/.test(m) ? 15 : 7, 0, "#d8d8d6"];
  if (h === "maker") return [3, 0, "#e8e4da"];
  return [0, 0, "#f2efe8"];
}
function cutMaterial(p, plane, group, thin, fx, sliver = false) {
  const h = hatchOf(p), focus = FOCUS_IDS.has(p.id), [pat, dens, tint] = cutSpec(p, h);
  return new THREE.ShaderMaterial({
    vertexShader: CUT_VERT, fragmentShader: CUT_FRAG, side: THREE.DoubleSide,
    uniforms: { uYB: group.uYB, uTint: { value: new THREE.Color(focus ? "#ffffff" : tint) }, uInk: { value: (focus ? SIGNAL : INK).clone() },
      uPat: { value: thin ? 7 : sliver && !focus ? 0 : focus && !pat ? 3 : pat }, uAx: { value: plane === "w" ? 2 : plane === "y" ? 1 : 0 }, uPx: pxUniform, uHatchK: hatchK, uCardK: cardK, uDens: { value: dens || 0.3 },
      uTherm: fx.uTherm, uT0: fx.uT0, uT1: fx.uT1, uB0: fx.uB0, uB1: fx.uB1, uTe: fx.uTe, uScale: fx.uScale, uNight: fx.uNight },
  });
}

// ---------- the model: geometry, cuts and seen lines, built once ----------
export function buildModel(parts) {
  const items = [];
  for (const p of parts) {
    if (p.type === "revolve") continue;
    const geoms = solids(p), sil = [], crease = [];
    if (p.mat === "igu-triple") for (const g of geoms) { const e = new THREE.EdgesGeometry(g, 20).attributes.position.array; for (let i = 0; i < e.length; i += 6) crease.push([e[i], e[i + 1], e[i + 2]], [e[i + 3], e[i + 4], e[i + 5]]); }
    else for (const g of geoms) classify(g, sil, crease);
    const cs = caps(p).map((c) => ({ ...c, thin: thinness(c.poly) < 3, geom: capGeometry(c.plane, c.poly) }));
    if (geoms.length || cs.length) items.push({ p, geoms, sil, crease, caps: cs });
  }
  return { items };
}

// ---------- a meadow on the planting bed (illustrative: grasses and flowering perennials, cut by the left plane) ----------
const blade = new THREE.PlaneGeometry(0.012, 1, 1, 5);
blade.translate(0, 0.5, 0);
{ const pa = blade.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i); pa.setX(i, pa.getX(i) * Math.pow(1 - y, 0.8)); pa.setZ(i, y * y * 0.18); } blade.computeVertexNormals(); }
function bladeMaterial(nightU) {
const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide });
bladeMat.onBeforeCompile = (sh) => {
  sh.uniforms.uTime = timeU; sh.uniforms.uNightM = nightU;
  sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uTime;")
    .replace("#include <begin_vertex>", "#include <begin_vertex>\nfloat ph = instanceMatrix[3].x * 7.0 + instanceMatrix[3].z * 5.0;\ntransformed.x += sin(uTime * 1.3 + ph) * 0.05 * position.y * position.y; vH = position.y;")
    .replace("void main() {", "varying float vH;\nvoid main() {");
  sh.fragmentShader = sh.fragmentShader.replace("void main() {", "varying float vH;\nvoid main() {")
    .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.rgb *= mix(0.45, 1.0, vH); diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.36, 0.42, 0.5), uNightM);")   // darker at the root; blue-grey at night
    .replace("void main() {", "uniform float uNightM;\nvoid main() {");
};
return bladeMat;
}
const BED = { x: [XL, -3460], y: -105, w: [W0 + 20, WC - 20] };
function meadow() {
  const N = 2600, M = 64, d = new THREE.Object3D(), gc = new THREE.Color(), group = new THREE.Group();
  const nightU = { value: 0 }, bladeMat = bladeMaterial(nightU);
  const grass = new THREE.InstancedMesh(blade, bladeMat, N), seeds = [];
  const greens = ["#5f7a3c", "#6e8a45", "#86a052", "#9db463", "#7c8f4a", "#a7a866"];
  for (let i = 0; i < N; i++) {
    seeds.push({ x: BED.x[0] - 60 + rnd() * (BED.x[1] - BED.x[0] + 60), w: BED.w[0] + rnd() * (BED.w[1] - BED.w[0]), rx: (rnd() - 0.5) * 0.5, ry: rnd() * Math.PI * 2, rz: (rnd() - 0.5) * 0.5, h: (0.22 + Math.pow(rnd(), 1.5) * 0.5) * (0.65 + rnd() * 0.7), s: i % 7 === 0 ? 3 : 1 + rnd() });   // every seventh a strap blade
    const straw = i % 7 === 3;   // seed heads and last year's straw
    grass.setColorAt(i, straw ? gc.set("#C9B98A").multiplyScalar(0.9 + rnd() * 0.2) : gc.set(greens[(rnd() * greens.length) | 0]).offsetHSL((rnd() - 0.5) * 0.03, (rnd() - 0.5) * 0.08, (rnd() - 0.5) * 0.08));
  }
  const flowerMat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const flowers = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.011, 1), flowerMat, M);
  const stalks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0015, 0.002, 1, 4).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ color: "#6b8442", roughness: 0.8 }), M);
  const petals = ["#ede6d2", "#ede6d2", "#e8dfc4", "#e4dccd"], fseeds = [];
  for (let i = 0; i < M; i++) { fseeds.push({ x: BED.x[0] + rnd() * (BED.x[1] - BED.x[0]), w: BED.w[0] + rnd() * (BED.w[1] - BED.w[0]), h: 0.35 + rnd() * 0.4, rx: (rnd() - 0.5) * 0.2, rz: (rnd() - 0.5) * 0.2 }); flowers.setColorAt(i, gc.set(petals[(rnd() * petals.length) | 0])); }
  // growth g scales height; below 0.6 the bed is young plugs and fewer stems flower
  function grow(g) {
    seeds.forEach((s, i) => { const fade = Math.min(1, (s.w - W0) / 150); d.position.set(s.x * S, BED.y * S, s.w * S); d.rotation.set(s.rx, s.ry, s.rz); d.scale.set(s.s * fade, s.h * g * fade, 1); d.updateMatrix(); grass.setMatrixAt(i, d.matrix); });
    fseeds.forEach((s, i) => {
      const on = i / M < Math.min(1, g * g), h = s.h * g;
      d.position.set(s.x * S, BED.y * S, s.w * S); d.rotation.set(s.rx, 0, s.rz); d.scale.set(1, on ? h : 0.0001, 1); d.updateMatrix(); stalks.setMatrixAt(i, d.matrix);
      d.position.set(s.x * S, BED.y * S + h, s.w * S); d.scale.setScalar(on ? 1 : 0.0001); d.updateMatrix(); flowers.setMatrixAt(i, d.matrix);
    });
    grass.instanceMatrix.needsUpdate = stalks.instanceMatrix.needsUpdate = flowers.instanceMatrix.needsUpdate = true;
  }
  grow(1);
  for (const m of [grass, flowers, stalks]) { m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; }
  group.add(grass, flowers, stalks);
  return { group, grow, night: (k) => { nightU.value = k; flowerMat.color.setScalar(1 - 0.75 * k); } };
}

// ---------- one view of the model on one canvas ----------
// groups: [{ lift }...]; groupOf(p) -> group index (or -1 to leave the part out); meadowIn: group index for the planting
// frame colours in display sRGB (r, g, b 0..1), composited after tone mapping
const sRGBColor = (hex) => { const c = new THREE.Color(); c.setStyle(hex, THREE.LinearSRGBColorSpace); return c; };
// ---------- line weight (research 18 c3): CSS px per role, per zoom band; p = CSS px per model mm ----------
const LINE_BANDS = [
  { p: 0.06, ground: 2.5, outer: 1.25, inner: 0.6, joint: 0, sil: 0.75, crease: 0, beyond: 0.5, hatch: 0 },
  { p: 0.15, ground: 3.5, outer: 1.75, inner: 0.75, joint: 0.5, sil: 0.85, crease: 0.75, beyond: 0.5, hatch: 0.5 },
  { p: 0.45, ground: 4.0, outer: 2.0, inner: 0.9, joint: 0.6, sil: 1.1, crease: 0.75, beyond: 0.5, hatch: 0.55 },
];
const ALPHA = { inner: 0.75, joint: 0.7, sil: 0.85, crease: 0.45, beyond: 0.35 };
const OUTER_INK = new THREE.Color("#2A2620");   // warm ink for the rendered cut (reviewers, run 1)
export const hatchK = { value: 1 }, cardK = { value: 1.75 };
function lineBand(p) {
  const B = LINE_BANDS, lp = Math.log(Math.max(p, 1e-6));
  if (p <= B[0].p) return B[0];
  if (p >= B[B.length - 1].p) return B[B.length - 1];
  const i = p < B[1].p ? 0 : 1, t = (lp - Math.log(B[i].p)) / (Math.log(B[i + 1].p) - Math.log(B[i].p)), s = t * t * (3 - 2 * t), o = {};
  for (const k of Object.keys(B[i])) o[k] = B[i][k] + (B[i + 1][k] - B[i][k]) * s;
  return o;
}
// widths in CSS px; never below 1 device px: thinner reads as fainter, not narrower (Skia hairline rule)
function setWidth(m, css, alpha, dpr) {
  const dev = css * dpr;
  m.visible = css > 0.05 && m.userData.on !== false;
  m.linewidth = Math.max(dev, 1);
  m.opacity = alpha * Math.min(dev, 1);
  m.transparent = m.opacity < 1;
}
export const PAPER = sRGBColor("#F2F1EC"), STORM_PAPER = sRGBColor("#DCE0E1"), NIGHT_SKY = sRGBColor("#111923");
export function createView({ canvas, model, groups: defs = [{}], groupOf = () => 0, meadowIn = 0, col = 0, margin = 0.05, therm = null, bc = null, vignette = false }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
  renderer.setClearColor(0x000000, 0);   // transparent: the frame colour (paper, storm, night) is painted behind the canvas, untouched by tone mapping
  renderer.localClippingEnabled = true;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  // the frame colour (display sRGB): painted by the final pass, and behind the canvas for the moment before the first frame
  const backdrop = new THREE.Vector3(...PAPER.toArray()), bdColor = PAPER.clone();
  const paint = () => { backdrop.set(bdColor.r, bdColor.g, bdColor.b); canvas.style.background = `rgb(${bdColor.toArray().map((v) => Math.round(v * 255)).join(",")})`; };
  paint();
  // overcast sky for reflections and ambient (zenith, horizon, ground), instead of a studio room
  {
    const sky = new THREE.Scene(), g = new THREE.SphereGeometry(10, 32, 16);
    sky.add(new THREE.Mesh(g, new THREE.ShaderMaterial({ side: THREE.BackSide, uniforms: { z: { value: new THREE.Color("#F3F1EC") }, h: { value: new THREE.Color("#CFD2D0") }, gr: { value: new THREE.Color("#8A857C") } },
      vertexShader: "varying vec3 vP; void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "uniform vec3 z; uniform vec3 h; uniform vec3 gr; varying vec3 vP; void main() { float t = normalize(vP).y; gl_FragColor = vec4(t > 0.0 ? mix(h, z, pow(t, 0.6)) : mix(h, gr, pow(-t, 0.5)), 1.0); }" })));
    scene.environment = new THREE.PMREMGenerator(renderer).fromScene(sky, 0.02).texture;
  }
  const fx = { uWet: { value: 0 }, uAge: { value: 0 }, uFrost: { value: 0 }, uTherm: { value: 0 }, uNight: { value: 0 },
    uT0: { value: null }, uT1: { value: null }, uB0: { value: new THREE.Vector4() }, uB1: { value: new THREE.Vector4() }, uTe: { value: new THREE.Vector2(-7, 20) }, uScale: { value: new THREE.Vector2(-7, 20) } };
  // computed temperature fields (one byte per cell, 255 = air) as textures, in metres on the cut plane
  (therm ?? []).slice(0, 2).forEach((t, i) => {
    const raw = Uint8Array.from(atob(t.data), (ch) => ch.charCodeAt(0)), rgba = new Uint8Array(raw.length * 4);
    raw.forEach((v, q) => { rgba[q * 4] = v; rgba[q * 4 + 3] = 255; });
    const tex = new THREE.DataTexture(rgba, t.nx, t.ny, THREE.RGBAFormat);
    tex.needsUpdate = true;
    fx["uT" + i].value = tex;
    fx["uB" + i].value.set(t.box[0] * S, t.box[1] * S, t.box[2] * S, t.box[3] * S);
  });
  if (!fx.uT1.value) fx.uT1.value = fx.uT0.value;
  if (bc) { fx.uTe.value.set(bc.Te, bc.Ti); fx.uScale.value.set(bc.Te, bc.Ti); }
  const hemi = new THREE.HemisphereLight(0xfff6e6, 0xb3a891, 0.35);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 3.2);
  // sun from the west at 41 degrees (equinox noon, research 17 §4), well off the view so shadows read
  sun.target.position.set(-1.4, 0.8, 1.4);
  sun.position.copy(sun.target.position).add(new THREE.Vector3(-6, 3.7, 1.5));
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 9, bottom: -7, near: 0.5, far: 30 });
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.015;
  sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  const groups = defs.map((def) => {
    const planes = [
      new THREE.Plane(new THREE.Vector3(0, 0, -1), WC * S), new THREE.Plane(new THREE.Vector3(0, 0, 1), -W0 * S),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), -XL * S), new THREE.Plane(new THREE.Vector3(0, -1, 0), YT * S), new THREE.Plane(new THREE.Vector3(0, 1, 0), -YB * S),
    ];
    const g = { def, planes, linePlanes: [...planes.slice(0, 4), new THREE.Plane(new THREE.Vector3(0, 1, 0), -(YB * S + RAG))], node: new THREE.Group(), uYB: { value: YB * S }, mats: new Map(), lineMats: [], anchors: {}, dy: 0 };
    scene.add(g.node);
    return g;
  });
  const acc = groups.map(() => ({ sil: [], crease: [], cut: { w: [], y: [], x: [] } }));
  const noAO = [];   // line and particle meshes: hidden from the AO normal pass (they are not surfaces)
  for (const it of model.items) {
    const gi = groupOf(it.p);
    if (gi < 0 || !groups[gi]) continue;
    const g = groups[gi], a = acc[gi], key = it.p.mat ?? "";
    if (!g.mats.has(key)) g.mats.set(key, rendered(it.p.mat, g, fx));
    const mat = g.mats.get(key), glass = it.p.mat === "igu-triple";
    for (const geo of it.geoms) { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; m.userData.mat = mat; m.userData.soil = /^soil|aggregate/.test(it.p.mat ?? ""); g.node.add(m); }
    a.sil.push(...it.sil); a.crease.push(...it.crease);
    for (const c of it.caps) {
      const sliver = !c.thin && (() => { let A = 0, P = 0; c.poly.forEach(([x, y], i) => { const [x2, y2] = c.poly[(i + 1) % c.poly.length]; A += x * y2 - x2 * y; P += Math.hypot(x2 - x, y2 - y); }); return (Math.abs(A) / Math.max(P, 1e-9)) < 25; })();
      g.node.add(new THREE.Mesh(c.geom, cutMaterial(it.p, c.plane, g, c.thin, fx, sliver)));
      a.cut[c.plane].push({ poly: c.poly, focus: FOCUS_IDS.has(it.p.id), mat: it.p.mat ?? "", soil: /^soil/.test(it.p.mat ?? ""), thin: !!c.thin });
      if (c.plane === "w") {
        const area = Math.abs(c.poly.reduce((s, [x, y], k) => { const [x2, y2] = c.poly[(k + 1) % c.poly.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
        if (!g.anchors[it.p.id] || area > g.anchors[it.p.id].area) g.anchors[it.p.id] = { area, poly: c.poly };
      }
    }
  }
  // cut outlines: each group's boundary against air is the heaviest line, joints inside the cut lighter
  groups.forEach((g, gi) => {
    const a = acc[gi], outer = [], inner = [], joint = [], ground = [], beyond = [], focus = [];
    for (const plane of ["w", "y", "x"]) {
      const polys = a.cut[plane], at = (u, v) => polys.find((q) => inPoly(q.poly, u, v));
      for (const { poly, focus: f, mat, soil, thin } of polys) if (!thin) poly.forEach((p0, k) => {   // a membrane is its own ink fill: one line, no outline bundle
        const p1 = poly[(k + 1) % poly.length], du = p1[0] - p0[0], dv = p1[1] - p0[1], l = Math.hypot(du, dv);
        if (l < 0.01) return;
        const mu = (p0[0] + p1[0]) / 2, mv = (p0[1] + p1[1]) / 2, nu = (-dv / l) * 1.5, nv = (du / l) * 1.5, seg = [...toWorld(plane, ...p0), ...toWorld(plane, ...p1)];
        const qa = at(mu + nu, mv + nv), qb = at(mu - nu, mv - nv);
        const top = soil && plane === "w" && Math.abs(dv) < 0.35 * l && ((qa && qa.poly === poly ? mv - nv : mv + nv) > mv);   // this soil edge faces up
        if (top && qa && qb && !(qa.poly === poly ? qb : qa).soil) ground.push(...seg);
        else if (qa && qb) { const other = qa.poly === poly ? qb : qa; if (qa.mat !== qb.mat) inner.push(...seg); else if (other.poly !== poly && polys.indexOf(other) > polys.findIndex((q) => q.poly === poly)) joint.push(...seg); }
        else if (soil && plane === "w" && Math.abs(dv) < 0.35 * l && (qa ? mv - nv : mv + nv) > mv) ground.push(...seg);   // the grade line: soil with air above
        else if (soil) beyond.push(...seg);   // soil ends at the box: a light edge, not a cut
        else outer.push(...seg);
        if (f) focus.push(...seg);
      });
    }
    const cl = g.linePlanes.slice(4);
    [["crease", fadedLines(a.crease, 0.75, 0.45, g.linePlanes)], ["sil", fadedLines(a.sil, 1.25, 1, g.linePlanes)], ["beyond", flatLines(beyond, INK, 0.5, cl)], ["joint", flatLines(joint, INK, 0.5, cl)], ["inner", flatLines(inner, INK, 0.75, cl)], ["outer", flatLines(outer, OUTER_INK, 1.5, cl)], ["ground", flatLines(ground, INK, 3, cl)]]   // the threshold keeps its red hatch; its outline is ink like every cut
      .filter(([, o]) => o).forEach(([role, o], i) => { o.renderOrder = 2 + i; o.material.userData.role = role; g.node.add(o); g.lineMats.push(o.material); noAO.push(o); });
  });
  const plants = meadowIn >= 0 && groups[meadowIn] ? meadow() : null;
  if (plants) groups[meadowIn].node.add(plants.group);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  let size = [0, 0];
  // weather 0 (low sun) .. 1 (overcast storm): light, exposure and atmospheric depth
  const SUN = new THREE.Color(0xfff0d8), SKY = new THREE.Color(0xfff6e6), GRD = new THREE.Color(0xb3a891), STORM = new THREE.Color(0xc3cdd4), STORMG = new THREE.Color(0x6f716c);
  scene.fog = new THREE.Fog(0x9aa6ad, 1000, 2000);
  // winter night 0..1: moonlight outside, warm room inside, frost on open-sky faces, the cut card dims
  const MOON = new THREE.Color(0x9fb4d6), NSKY = new THREE.Color(0x2b3b55), NGRD = new THREE.Color(0x0e1116), WARM = new THREE.Color(0xffc98f);
  // 2700 K ceiling panel inside the room, facing down: the glow reaches the glass, not the landing
  const room = new THREE.RectAreaLight(0xffc58a, 0, 1.0, (WC - W0) * S);
  room.position.set(0.8, 2.72, ((W0 + WC) / 2) * S);
  room.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(room);
  // the warm glass at night: a panel at the glazing facing west, so light pools on the landing outside
  const spill = new THREE.RectAreaLight(0xffc58a, 0, (WC - W0) * S, 2.4);
  spill.position.set(0.11, 1.25, ((W0 + WC) / 2) * S);
  spill.rotation.set(0, -Math.PI / 2, 0);
  scene.add(spill);
  const NIGHT_LINE = new THREE.Color("#c3cbd4"), GLASS_NIGHT = new THREE.Color("#1A1D22");
  function night(k) {
    bdColor.copy(PAPER).lerp(NIGHT_SKY, k); paint(); finalPass.uniforms.uVig.value = vignette ? k : 0;
    fx.uNight.value = k;
    for (const g of groups) for (const m of g.lineMats) if ((m.userData.role === "sil" || m.userData.role === "crease") && !g.ghost) {
      const on = k > 0.5;
      if (m.vertexColors === on) { m.vertexColors = !on; m.needsUpdate = true; }
      m.color.set(on ? "#F4F2EC" : "#ffffff");
    }
    for (const g of groups) for (const m of g.lineMats) if (m.userData.role === "outer" || m.userData.role === "inner" || m.userData.role === "joint" || m.userData.role === "ground" || m.userData.role === "beyond") m.color.copy(m.userData.role === "outer" ? OUTER_INK : INK).lerp(NIGHT_LINE, k);
    sun.intensity = 3.2 * (1 - k) + 0.6 * k;
    spill.intensity = 3 * k;
    sun.color.copy(SUN).lerp(MOON, k);
    hemi.color.copy(SKY).lerp(NSKY, k); hemi.groundColor.copy(GRD).lerp(NGRD, k); hemi.intensity = 0.35 - 0.23 * k;
    room.intensity = 8 * k;
    renderer.toneMappingExposure = 0.95 - 0.3 * k; finalPass.uniforms.toneMappingExposure.value = renderer.toneMappingExposure;
    scene.environmentIntensity = 1 - k;
    fx.uFrost.value = k;
    for (const g of groups) for (const m of g.mats.values()) {
      m.envMapIntensity = m.userData.glass ? 1.0 - 0.9 * k : 0.3 * (1 - k);
      if (m.userData.glass) { m.color.set(m.userData.tone).lerp(GLASS_NIGHT, k); m.emissive.copy(WARM).multiplyScalar(0.12 * k); }
    }
    if (plants) plants.night(k);
  }
  function weather(k) {
    bdColor.copy(PAPER).lerp(STORM_PAPER, k); paint(); finalPass.uniforms.uVig.value = vignette ? k : 0;
    scene.fog.color.copy(STORM_PAPER);
    sun.intensity = 3.2 * (1 - k) + 0.25 * k;
    sun.color.copy(SUN).lerp(STORM, k);
    hemi.color.copy(SKY).lerp(STORM, k); hemi.groundColor.copy(GRD).lerp(STORMG, k); hemi.intensity = 0.6 + 0.7 * k;
    for (const g of groups) for (const m of g.mats.values()) if (!m.userData.glass) m.envMapIntensity = 0.3 + 0.6 * k * fx.uWet.value;
    renderer.toneMappingExposure = 0.95 - 0.15 * k; finalPass.uniforms.toneMappingExposure.value = renderer.toneMappingExposure;
    scene.fog.near = k > 0.01 ? 47.5 + 12 * (1 - k) : 1000; scene.fog.far = scene.fog.near + 9;
  }

  // lift a group (explode / fly-in): clip planes, ragged break and lines travel with it
  function lift(g, dy, dx = 0) {
    g.dy = dy; g.dx = dx; g.node.position.y = dy; g.node.position.x = dx;
    g.planes[2].constant = -(XL * S + dx); g.linePlanes[2].constant = -(XL * S + dx);
    g.planes[3].constant = YT * S + dy; g.planes[4].constant = -(YB * S + dy);
    g.linePlanes[3].constant = YT * S + dy; g.linePlanes[4].constant = -(YB * S + RAG + dy);
    g.uYB.value = YB * S + dy;
  }
  // parallel camera fitted to the block (plus `top` metres of headroom), leaving `colW` px on the right for labels
  function fit(W, H, top = 0, colW = col) {
    const c = new THREE.Vector3(((XL + BOX.x[1]) / 2) * S, ((YB + YT) / 2) * S, ((W0 + WC) / 2) * S);
    camera.position.copy(c).addScaledVector(VIEWDIR, 50);
    camera.lookAt(c);
    camera.updateMatrixWorld();
    const b = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
    for (const x of BOX.x) for (const y of [YB * S, YT * S + top]) for (const w of BOX.w) {
      const v = new THREE.Vector3(x * S, y, w * S).applyMatrix4(camera.matrixWorldInverse);
      b.x = [Math.min(b.x[0], v.x), Math.max(b.x[1], v.x)]; b.y = [Math.min(b.y[0], v.y), Math.max(b.y[1], v.y)];
    }
    const regionW = Math.max(W - colW, W * 0.55), A = regionW / H;
    let w = b.x[1] - b.x[0], h = b.y[1] - b.y[0];
    if (w / h > A) h = w / A; else w = h * A;
    w *= 1 + margin * 2; h *= 1 + margin * 2;
    const cx = (b.x[0] + b.x[1]) / 2, cy = (b.y[0] + b.y[1]) / 2;
    Object.assign(camera, { left: cx - w / 2, right: cx - w / 2 + (w * W) / regionW, top: cy + h / 2, bottom: cy - h / 2 });
    camera.updateProjectionMatrix();
  }
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(scene, camera));
  const gtao = new GTAOPass(scene, camera, 1, 1);
  gtao.blendIntensity = 1.0;
  gtao.updateGtaoMaterial({ radius: 0.15, distanceExponent: 1, thickness: 1, scale: 1.5, samples: 16 });
  gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
  gtao.normalMaterial.clippingPlanes = groups[0].planes;
  const override = gtao.renderOverride.bind(gtao);
  gtao.renderOverride = (r, mat, rt, cc, ca) => {
    for (const o of noAO) o.visible = false;
    if (groups.every((g) => !g.dy && !g.dx)) override(r, mat, rt, cc, ca);
    else {
      const auto = r.autoClear, oc = r.getClearColor(new THREE.Color()), oa = r.getClearAlpha(), vis = groups.map((g) => g.node.visible);
      r.setRenderTarget(rt); r.setClearColor(mat.clearColor ?? cc, mat.clearAlpha ?? ca); r.clear(); r.autoClear = false;
      groups.forEach((g, i) => {
        if (!vis[i]) return;
        groups.forEach((h, j) => (h.node.visible = j === i));
        mat.clippingPlanes = g.planes; scene.overrideMaterial = mat; r.render(scene, camera);
      });
      scene.overrideMaterial = null; mat.clippingPlanes = groups[0].planes;
      groups.forEach((g, i) => (g.node.visible = vis[i]));
      r.autoClear = auto; r.setClearColor(oc, oa); r.setRenderTarget(null);
    }
    for (const o of noAO) o.visible = true;
  };
  composer.addPass(gtao);
  const finalPass = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, toneMappingExposure: { value: 0.95 }, uBack: { value: backdrop }, uEdge: { value: PAPER.clone() }, uVig: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `uniform sampler2D tDiffuse; uniform vec3 uBack; uniform vec3 uEdge; uniform float uVig; varying vec2 vUv;
      #include <tonemapping_pars_fragment>
      float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      vec3 srgb(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
      void main() {
        vec4 c = texture2D(tDiffuse, vUv);
        vec3 rgb = srgb(clamp(AgXToneMapping(c.rgb / max(c.a, 1e-4)), 0.0, 1.0));
        float l = dot(rgb, vec3(0.299, 0.587, 0.114));
        rgb = mix(vec3(l), rgb, 0.88) + (h(gl_FragCoord.xy) - 0.5) * 0.02;
        // backdrop (display colour), optionally a vignette from the backdrop at the centre to the page paper at the rim
        vec2 d = (vUv - 0.5) * 2.0; float r = max(length(d) * 0.75, pow(max(abs(d.x), abs(d.y)), 6.0));
        vec3 back = mix(uBack, uEdge, uVig * smoothstep(0.5, 0.97, r));
        gl_FragColor = vec4(mix(back, rgb, clamp(c.a, 0.0, 1.0)), 1.0);
      }`,
  });
  finalPass.material.toneMapped = false;
  finalPass.uniforms.uBack.value = backdrop;   // ShaderPass clones its uniforms: re-link the live backdrop
  composer.addPass(finalPass);
  // line weights by zoom band (research 17 §1): fragment views ~0.15 px/mm, detail views 0.4 px/mm and closer
  function render(cam = camera, W = size[0], H = size[1], r = renderer) {
    const dpr = Math.min(devicePixelRatio, 2), band = lineBand(W / ((cam.right - cam.left) * 1000));
    pxUniform.value = (cam.right - cam.left) / W;
    hatchK.value = band.hatch / 0.7;   // the patterns were drawn at ~0.7 ink; the band sets the hatch's share
    for (const g of groups) for (const m of g.lineMats) {
      m.resolution.set(W * dpr, H * dpr);
      const role = m.userData.role;
      let w = band[role], a = ALPHA[role] ?? 1;
      if (w === undefined) continue;
      if (g.ghost) { w = role === "sil" ? 0.5 : 0; a = 0.25; }
      else if (fx.uNight.value > 0.5 && (role === "sil" || role === "crease")) a = role === "sil" ? 0.6 : 0.3;
      else if (fx.uTherm.value > 0.5) ({ w, a } = { outer: { w: 1.0, a: 0.45 }, inner: { w: 0.5, a: 0.3 }, joint: { w: 0, a: 0 }, ground: { w: 1.5, a: 0.5 }, beyond: { w: 0, a: 0 } }[role] ?? { w, a });
      setWidth(m, w, a, dpr);
    }
    if (r === renderer && cam === camera) composer.render();
    else r.render(scene, cam);
  }
  // returns false when the canvas has no size
  function resize() {
    const { width: W, height: H } = canvas.getBoundingClientRect();
    if (!W || !H) return false;
    if (W !== size[0] || H !== size[1]) { size = [W, H]; const dpr = Math.min(devicePixelRatio, 2); renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); composer.setPixelRatio(dpr); composer.setSize(W, H); }
    return true;
  }
  const project = (v) => { const q = v.clone().project(camera); return [((q.x + 1) / 2) * size[0], ((1 - q.y) / 2) * size[1]]; };
  // a leader anchor: a point inside the named part's cut, following its group
  function anchor(id) {
    for (const g of groups) if (g.anchors[id]) return project(new THREE.Vector3(...toWorld("w", ...innerPoint(g.anchors[id].poly))).add(new THREE.Vector3(g.dx ?? 0, g.dy, 0)));
    return null;
  }
  const GHOST = new THREE.Color("#8C8579");
  function ghost(g, on) {
    if (g.ghost === on) return;
    g.ghost = on;
    g.ghostMat ??= new THREE.MeshBasicMaterial({ color: GHOST, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, clippingPlanes: g.planes });
    for (const m of g.lineMats) {
      m.userData.base ??= { c: m.color.clone(), o: m.opacity, t: m.transparent, v: m.vertexColors };
      m.userData.on = !(on && (m.userData.role === "crease" || m.userData.role === "joint"));   // ghosts keep silhouettes only
      m.visible = m.userData.on;
      Object.assign(m, on ? { opacity: 0.25, transparent: true, vertexColors: false } : { opacity: m.userData.base.o, transparent: m.userData.base.t, vertexColors: m.userData.base.v });
      m.color.copy(on ? GHOST : m.userData.base.c);
      m.needsUpdate = true;
    }
    g.node.traverse((o) => {
      if (o === g.node || !o.material) return;
      if (o.isLineSegments2) return;
      if (o.material.isShaderMaterial || o.isInstancedMesh || (o.userData.soil ?? false)) { o.visible = !on; return; }
      if (o.material === g.ghostMat || o.userData.mat) { o.userData.mat ??= o.material; o.material = on ? g.ghostMat : o.userData.mat; o.castShadow = !on && !o.userData.mat.userData.glass; }
    });
  }
  return { scene, groups, camera, renderer, plants, fx, weather, night, noAO, gtao, ghost, lift, fit, render, resize, project, anchor, size: () => size };
}
