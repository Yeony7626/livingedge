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

export const S = 0.001;
export const BOX = { x: [-4300, 1300], y: [-760, 3700], w: [2000, 3200] };   // mm; the cut face is w = WC
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
  const cos20 = Math.cos((20 * Math.PI) / 180);
  for (const e of edges.values()) {
    const [n1, n2] = e.ns, f1 = n1.dot(VIEWDIR) > 0, f2 = n2 ? n2.dot(VIEWDIR) > 0 : !f1;
    if (f1 !== f2) sil.push(e.a, e.b);
    else if (f1 && n2 && n1.dot(n2) < cos20) crease.push(e.a, e.b);
  }
}
function fadedLines(pts, width, opacity, planes) {
  if (!pts.length) return null;
  const pos = [], col = [];
  for (const p of pts) {
    pos.push(...p);
    const c = INK.clone().lerp(FADE, Math.min(Math.max((WC * S - p[2]) / 1.6, 0), 1) * 0.85);
    col.push(c.r, c.g, c.b);
  }
  return new LineSegments2(new LineSegmentsGeometry().setPositions(pos).setColors(col), new LineMaterial({ vertexColors: true, linewidth: width, transparent: opacity < 1, opacity, clippingPlanes: planes }));
}
const flatLines = (segs, color, width, planes) => segs.length ? new LineSegments2(new LineSegmentsGeometry().setPositions(segs), new LineMaterial({ color, linewidth: width, clippingPlanes: planes })) : null;

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
    dots(c, 9000, n, 0.4, 1.5, grey(110, 180, 0.7)); dots(c, 2500, n, 0.4, 1.3, grey(248, 255, 0.9)); dots(c, 500, n, 1, 2.4, grey(80, 120, 0.5));
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
export const TONE = { "cedar-siding": "#b98d63", "cedar-soffit": "#c49a6c", glulam: "#d8b98d", "softwood-lumber": "#dcc29a", "softwood-pt": "#bfa27c", plywood: "#d6bb92", "reclaimed-stone": "#bdbab3",
  "concrete-lowcarbon": "#cdc9c0", "concrete-f2-40scm": "#c3bfb6", "polymer-concrete": "#77797b", aggregate: "#b3aea4", soil: "#7a6450", "soil-imported": "#6a5442", "steel-prefinished": "#4a4b4d",
  aluminium: "#4a4b4d", stainless: "#b7b9ba", "graphite-eps": "#9a9aa0", gypsum: "#f3f1ec", "parge-charcoal": "#55524f", "woodfibre-board": "#a8875f", cork: "#a77b55",
  "pu-structural-160": "#d4cc8a", "pu-structural": "#d4cc8a", comfortbatt: "#d7c48e", "comfortboard-80": "#cdb780", "cellulose-dense": "#cdbb8c", "cellular-glass": "#4a4a4c" };

// ---------- materials ----------
const RAGGED = (v) => `float tr = ${v}.x - ${v}.z; float yr = uYB + 0.1 + 0.045 * sin(tr * 6.3) + 0.025 * sin(tr * 17.1 + 1.3) + 0.014 * sin(tr * 43.7 + 0.4);`;
function rendered(mat, group) {
  const fam = FAMILY(mat ?? ""), tone = TONE[mat] ?? "#cfcac0";
  const opts = { color: tone, roughness: 0.9, metalness: 0, side: THREE.DoubleSide, clippingPlanes: group.planes, clipShadows: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 };
  if (fam === "glass") Object.assign(opts, { color: "#cfe2e6", transparent: true, opacity: 0.28, roughness: 0.05, depthWrite: false });
  else if (fam === "metal") Object.assign(opts, { roughness: 0.45, metalness: mat === "stainless" ? 0.55 : 0.25 });
  else if (fam === "membrane") Object.assign(opts, { color: "#2c2d2f", roughness: 0.7 });
  else if (TEX[fam]) opts.map = TEX[fam];
  const m = new THREE.MeshStandardMaterial(opts);
  m.userData.tone = opts.color;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uYB = group.uYB; sh.uniforms.uPx = pxUniform;
    sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP;").replace("#include <project_vertex>", "#include <project_vertex>\nvWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP; uniform float uYB; uniform float uPx;")
      .replace("void main() {", `void main() {\n${RAGGED("vWorldP")}\nif (vWorldP.y < yr) discard;`)
      .replace("#include <dithering_fragment>", "#include <dithering_fragment>\nif (vWorldP.y - yr < uPx * 1.3) gl_FragColor.rgb = vec3(0.106, 0.106, 0.102);");
  };
  return m;
}
const CUT_VERT = `varying vec3 vW;
void main() { vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const CUT_FRAG = `
uniform float uYB; uniform vec3 uTint; uniform vec3 uInk; uniform int uPat; uniform int uAx; uniform float uPx; uniform float uDens;
varying vec3 vW;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hair(float d, float w) { return 1.0 - smoothstep(w * 0.5, w * 0.5 + 0.9, abs(d)); }
float stripes(float t, float sp, float w) { float d = mod(t, sp); return hair(min(d, sp - d), w); }
float stipple(vec2 p, float cell, float dens, float r) { vec2 c = floor(p / cell); vec2 o = (vec2(hash(c), hash(c + 17.0)) * 0.8 + 0.1) * cell; return step(hash(c + 5.3), dens) * (1.0 - smoothstep(r, r + 0.8, length(p - c * cell - o))); }
void main() {
  ${RAGGED("vW")}
  float dr = (vW.y - yr) / uPx;
  if (dr < 0.0) discard;
  vec2 uv = uAx == 1 ? vW.xz : (uAx == 0 ? vW.zy : vW.xy);
  vec2 p = uv / uPx;
  float ink = 0.0;
  if (uPat == 2) ink = stipple(p, 4.0, uDens, 0.45) * 0.8;
  else if (uPat == 3) ink = stripes((p.x + p.y) * 0.7071, 5.0, 0.45) * 0.75;
  else if (uPat == 4) ink = max(stripes((p.x + p.y) * 0.7071, 6.0, 0.4), stripes((p.x - p.y) * 0.7071, 6.0, 0.4)) * 0.65;
  else if (uPat == 5) ink = stripes(p.y + 2.6 * sin(p.x * 0.42), 7.0, 0.45) * 0.7;
  else if (uPat == 6) { vec2 c = floor(p / 9.0); vec2 o = c * 9.0 + 4.5 + (vec2(hash(c), hash(c + 3.0)) - 0.5) * 2.0; float r = 2.2 + hash(c + 9.0) * 1.6; ink = hair(length(p - o) - r, 0.45) * 0.75; }
  else if (uPat == 7) ink = 1.0;
  else if (uPat == 8) ink = stripes((p.x + p.y) * 0.7071, 3.2, 0.4) * 0.65;
  else if (uPat == 9) { float t = (p.x + p.y) * 0.7071, s = (p.x - p.y) * 0.7071; float k = floor(t / 10.0); ink = max(stripes(t, 10.0, 0.45) * step(0.55, fract(s / 16.0 + hash(vec2(k, 1.0)))), stipple(p, 4.0, 0.22, 0.45)) * 0.7; }
  vec3 col = mix(uTint, uInk, clamp(ink, 0.0, 1.0));
  if (dr < 1.3) col = vec3(0.106, 0.106, 0.102);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;
const CUTP = { timber: [3], conc: [2, 0.55], earth: [9], gravel: [6], stone: [8], gyp: [2, 0.35], rigid: [4], batt: [5], maker: [3], glass: [0], ink: [7], plain: [0] };
function cutMaterial(p, plane, group, thin) {
  const h = hatchOf(p), focus = FOCUS_IDS.has(p.id), [pat, dens] = CUTP[h] ?? [0];
  return new THREE.ShaderMaterial({
    vertexShader: CUT_VERT, fragmentShader: CUT_FRAG, side: THREE.DoubleSide,
    uniforms: { uYB: group.uYB, uTint: { value: new THREE.Color(h === "glass" ? "#e6eef0" : "#f7f4ee") }, uInk: { value: (focus ? SIGNAL : INK).clone() },
      uPat: { value: thin ? 7 : focus && !pat ? 3 : pat }, uAx: { value: plane === "w" ? 2 : plane === "y" ? 1 : 0 }, uPx: pxUniform, uDens: { value: dens ?? 0.3 } },
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
const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide });
bladeMat.onBeforeCompile = (sh) => {
  sh.uniforms.uTime = timeU;
  sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uTime;")
    .replace("#include <begin_vertex>", "#include <begin_vertex>\nfloat ph = instanceMatrix[3].x * 7.0 + instanceMatrix[3].z * 5.0;\ntransformed.x += sin(uTime * 1.3 + ph) * 0.05 * position.y * position.y;");
};
const BED = { x: [XL, -3460], y: -105, w: [W0 + 20, WC - 20] };
function meadow() {
  const N = 2600, M = 160, d = new THREE.Object3D(), gc = new THREE.Color(), group = new THREE.Group();
  const grass = new THREE.InstancedMesh(blade, bladeMat, N), seeds = [];
  const greens = ["#5f7a3c", "#6e8a45", "#86a052", "#9db463", "#7c8f4a", "#a7a866"];
  for (let i = 0; i < N; i++) {
    seeds.push({ x: BED.x[0] - 60 + rnd() * (BED.x[1] - BED.x[0] + 60), w: BED.w[0] + rnd() * (BED.w[1] - BED.w[0]), rx: (rnd() - 0.5) * 0.5, ry: rnd() * Math.PI * 2, rz: (rnd() - 0.5) * 0.5, h: 0.22 + Math.pow(rnd(), 1.5) * 0.5, s: 1 + rnd() });
    grass.setColorAt(i, gc.set(greens[(rnd() * greens.length) | 0]).multiplyScalar(0.85 + rnd() * 0.3));
  }
  const flowers = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.014, 1), new THREE.MeshStandardMaterial({ roughness: 0.7 }), M);
  const stalks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0015, 0.002, 1, 4).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ color: "#6b8442", roughness: 0.8 }), M);
  const petals = ["#f4f0e4", "#efe7cf", "#e9d98f", "#d9c6e6", "#f2ece0"], fseeds = [];
  for (let i = 0; i < M; i++) { fseeds.push({ x: BED.x[0] + rnd() * (BED.x[1] - BED.x[0]), w: BED.w[0] + rnd() * (BED.w[1] - BED.w[0]), h: 0.35 + rnd() * 0.4, rx: (rnd() - 0.5) * 0.2, rz: (rnd() - 0.5) * 0.2 }); flowers.setColorAt(i, gc.set(petals[(rnd() * petals.length) | 0])); }
  // growth g scales height; below 0.6 the bed is young plugs and fewer stems flower
  function grow(g) {
    seeds.forEach((s, i) => { d.position.set(s.x * S, BED.y * S, s.w * S); d.rotation.set(s.rx, s.ry, s.rz); d.scale.set(s.s, s.h * g, 1); d.updateMatrix(); grass.setMatrixAt(i, d.matrix); });
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
  return { group, grow };
}

// ---------- one view of the model on one canvas ----------
// groups: [{ lift }...]; groupOf(p) -> group index (or -1 to leave the part out); meadowIn: group index for the planting
export function createView({ canvas, model, groups: defs = [{}], groupOf = () => 0, meadowIn = 0, col = 0, margin = 0.05 }) {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff6e6, 0xb3a891, 1.15));
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.7);
  sun.position.set(-5, 7, 7.5);
  sun.target.position.set(-1.4, 0.8, 2.6);
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 9, bottom: -7, near: 0.5, far: 30 });
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.015;
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
  for (const it of model.items) {
    const gi = groupOf(it.p);
    if (gi < 0 || !groups[gi]) continue;
    const g = groups[gi], a = acc[gi], key = it.p.mat ?? "";
    if (!g.mats.has(key)) g.mats.set(key, rendered(it.p.mat, g));
    const mat = g.mats.get(key), glass = it.p.mat === "igu-triple";
    for (const geo of it.geoms) { const m = new THREE.Mesh(geo, mat); m.castShadow = !glass; m.receiveShadow = true; g.node.add(m); }
    a.sil.push(...it.sil); a.crease.push(...it.crease);
    for (const c of it.caps) {
      g.node.add(new THREE.Mesh(c.geom, cutMaterial(it.p, c.plane, g, c.thin)));
      a.cut[c.plane].push({ poly: c.poly, focus: FOCUS_IDS.has(it.p.id) });
      if (c.plane === "w") {
        const area = Math.abs(c.poly.reduce((s, [x, y], k) => { const [x2, y2] = c.poly[(k + 1) % c.poly.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
        if (!g.anchors[it.p.id] || area > g.anchors[it.p.id].area) g.anchors[it.p.id] = { area, poly: c.poly };
      }
    }
  }
  // cut outlines: each group's boundary against air is the heaviest line, joints inside the cut lighter
  groups.forEach((g, gi) => {
    const a = acc[gi], outer = [], inner = [], focus = [];
    for (const plane of ["w", "y", "x"]) {
      const polys = a.cut[plane], inside = (u, v) => polys.some((q) => inPoly(q.poly, u, v));
      for (const { poly, focus: f } of polys) poly.forEach((p0, k) => {
        const p1 = poly[(k + 1) % poly.length], du = p1[0] - p0[0], dv = p1[1] - p0[1], l = Math.hypot(du, dv);
        if (l < 0.01) return;
        const mu = (p0[0] + p1[0]) / 2, mv = (p0[1] + p1[1]) / 2, nu = (-dv / l) * 1.5, nv = (du / l) * 1.5, seg = [...toWorld(plane, ...p0), ...toWorld(plane, ...p1)];
        (inside(mu + nu, mv + nv) && inside(mu - nu, mv - nv) ? inner : outer).push(...seg);
        if (f) focus.push(...seg);
      });
    }
    const cl = g.linePlanes.slice(4);
    [fadedLines(a.crease, 0.5, 0.75, g.linePlanes), fadedLines(a.sil, 1.1, 1, g.linePlanes), flatLines(inner, INK, 0.9, cl), flatLines(outer, INK, 2.2, cl), flatLines(focus, SIGNAL, 1.2, cl)]
      .filter(Boolean).forEach((o, i) => { o.renderOrder = 2 + i; g.node.add(o); g.lineMats.push(o.material); });
  });
  const plants = meadowIn >= 0 && groups[meadowIn] ? meadow() : null;
  if (plants) groups[meadowIn].node.add(plants.group);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  let size = [0, 0];

  // lift a group (explode / fly-in): clip planes, ragged break and lines travel with it
  function lift(g, dy) {
    g.dy = dy; g.node.position.y = dy;
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
  function render(cam = camera, W = size[0], H = size[1], r = renderer) {
    const dpr = Math.min(devicePixelRatio, 2);
    pxUniform.value = (cam.right - cam.left) / W;
    for (const g of groups) for (const m of g.lineMats) m.resolution.set(W * dpr, H * dpr);
    r.render(scene, cam);
  }
  // returns false when the canvas has no size
  function resize() {
    const { width: W, height: H } = canvas.getBoundingClientRect();
    if (!W || !H) return false;
    if (W !== size[0] || H !== size[1]) { size = [W, H]; renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(W, H, false); }
    return true;
  }
  const project = (v) => { const q = v.clone().project(camera); return [((q.x + 1) / 2) * size[0], ((1 - q.y) / 2) * size[1]]; };
  // a leader anchor: a point inside the named part's cut, following its group
  function anchor(id) {
    for (const g of groups) if (g.anchors[id]) return project(new THREE.Vector3(...toWorld("w", ...innerPoint(g.anchors[id].poly))).add(new THREE.Vector3(0, g.dy, 0)));
    return null;
  }
  return { scene, groups, camera, renderer, plants, lift, fit, render, resize, project, anchor, size: () => size };
}
