// Hero: a rendered section-box fragment of the real Detail 02 model (the part list Rhino builds), in the manner of
// the user's references: sunlit material surfaces, a planting bed cut through at the left edge, ink-hatched cut
// faces, the threshold marked in the signal colour. Scrolling explodes it into its construction layers with
// dashed leaders, then reassembles it.
// Line-weight hierarchy (px): cut outline 2.2 > silhouette 1.1 > joint inside the cut 0.9 > crease 0.5 > hatch
// (hairline in the shader); every seen line fades from ink toward grey with depth behind the cut plane.
// sectionShapes / sheetPoly / hatchOf / thinness come from geom.mjs, inlined above by build-landing.mjs.
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

const L = window.LANDING, S = 0.001;
const BOX = { x: [-4300, 1300], y: [-760, 3700], w: [2000, 3200] };   // mm; the cut face is w = WC
const [XL] = BOX.x, [YB, YT] = BOX.y, [W0, WC] = BOX.w;
const VIEW = { az: -36, el: 28, col: 300, margin: 0.05 };
const INK = new THREE.Color("#1B1B1A"), FADE = new THREE.Color("#A8A397"), SIGNAL = new THREE.Color("#E0482B");
const RAG = 0.2;   // soil ends in a ragged break within this band above the box bottom (m)
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FOCUS_IDS = new Set(["sill-block", "sill-bearer", "sill-nosing", "track", "track-rail", "sill-cover", "sill-foil", "pan", "pan-back", "dam-angle", "landing-tray", "tray-slips"]);

// ---------- construction layers for the explode, in build order (grouped by the spec's junction zones) ----------
// lift: multiples of GAP when fully exploded; at: the part whose cut carries the leader
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

// ---------- geometry ----------
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
const BOUNDS = { w: [[XL, 1e9], [YB, YT]], y: [[XL, 1e9], [W0, WC]], x: [[W0, WC], [YB, YT]] };
function clipRect(poly, [[u0, u1], [v0, v1]]) {
  const edge = (pts, inside, cut) => { const out = []; pts.forEach((a, i) => { const b = pts[(i + 1) % pts.length], ia = inside(a), ib = inside(b); if (ia) out.push(a); if (ia !== ib) out.push(cut(a, b)); }); return out; };
  const at = (i, val) => (a, b) => { const t = (val - a[i]) / (b[i] - a[i]); return i === 0 ? [val, a[1] + t * (b[1] - a[1])] : [a[0] + t * (b[0] - a[0]), val]; };
  let p = poly;
  for (const [inside, cut] of [[(q) => q[0] >= u0, at(0, u0)], [(q) => q[0] <= u1, at(0, u1)], [(q) => q[1] >= v0, at(1, v0)], [(q) => q[1] <= v1, at(1, v1)]]) { if (p.length < 3) return []; p = edge(p, inside, cut); }
  return p.length >= 3 ? p : [];
}
function crossings(poly, i, val) {
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
const toWorld = (plane, u, v) => plane === "w" ? [u * S, v * S, WC * S + E] : plane === "y" ? [u * S, YT * S + E, v * S] : [XL * S - E, v * S, u * S];
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

// ---------- line classification: silhouettes and creases, seen from the view direction ----------
const VIEWDIR = (() => { const az = (VIEW.az * Math.PI) / 180, el = (VIEW.el * Math.PI) / 180; return new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)); })();
function classify(g, out) {
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
    if (f1 !== f2) out.sil.push(e.a, e.b);
    else if (f1 && n2 && n1.dot(n2) < cos20) out.crease.push(e.a, e.b);
  }
}
// depth fade: ink at the cut plane, grey 1.6 m behind it
function lineObject(pairs, width, opacity, planes) {
  if (!pairs.length) return null;
  const pos = [], col = [];
  for (const p of pairs) {
    pos.push(...p);
    const c = INK.clone().lerp(FADE, Math.min(Math.max((WC * S - p[2]) / 1.6, 0), 1) * 0.85);
    col.push(c.r, c.g, c.b);
  }
  const g = new LineSegmentsGeometry().setPositions(pos).setColors(col);
  const m = new LineMaterial({ vertexColors: true, linewidth: width, transparent: opacity < 1, opacity, clippingPlanes: planes });
  return new LineSegments2(g, m);
}
function flatLines(segs, color, width, planes) {
  if (!segs.length) return null;
  return new LineSegments2(new LineSegmentsGeometry().setPositions(segs), new LineMaterial({ color, linewidth: width, clippingPlanes: planes }));
}

// ---------- surface textures (greyscale detail, tinted by the finish colour) ----------
function canvasTex(size, tile, paint) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const c = cv.getContext("2d");
  paint(c, size);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / tile, 1 / tile);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
let seedN = 7;
const rnd = () => ((seedN = (seedN * 16807) % 2147483647) / 2147483647);
const dots = (c, n, size, r0, r1, shade) => { for (let i = 0; i < n; i++) { c.fillStyle = shade(); c.beginPath(); c.arc(rnd() * size, rnd() * size, r0 + rnd() * (r1 - r0), 0, 7); c.fill(); } };
const grey = (lo, hi, a = 1) => () => { const v = (lo + rnd() * (hi - lo)) | 0; return `rgba(${v},${v},${v},${a})`; };
const TEX = {
  stone: canvasTex(512, 0.45, (c, n) => { c.fillStyle = "#e4e4e4"; c.fillRect(0, 0, n, n); dots(c, 9000, n, 0.4, 1.6, grey(90, 170, 0.8)); dots(c, 2500, n, 0.4, 1.4, grey(245, 255, 0.9)); dots(c, 600, n, 1, 2.6, grey(60, 110, 0.6)); }),
  concrete: canvasTex(512, 0.9, (c, n) => { c.fillStyle = "#ececec"; c.fillRect(0, 0, n, n); dots(c, 60, n, 20, 70, grey(215, 250, 0.12)); dots(c, 1800, n, 0.3, 1.1, grey(150, 200, 0.6)); dots(c, 140, n, 0.8, 1.8, grey(110, 150, 0.5)); }),
  gravel: canvasTex(512, 0.25, (c, n) => { c.fillStyle = "#b9b9b9"; c.fillRect(0, 0, n, n); for (let i = 0; i < 520; i++) { const x = rnd() * n, y = rnd() * n, r = 5 + rnd() * 11, v = (170 + rnd() * 80) | 0; c.fillStyle = `rgb(${v},${v},${v})`; c.beginPath(); c.ellipse(x, y, r, r * (0.6 + rnd() * 0.3), rnd() * 3, 0, 7); c.fill(); c.strokeStyle = "rgba(70,70,70,.35)"; c.stroke(); } }),
  soil: canvasTex(512, 0.6, (c, n) => { c.fillStyle = "#cfcfcf"; c.fillRect(0, 0, n, n); dots(c, 300, n, 4, 16, grey(150, 230, 0.25)); dots(c, 5000, n, 0.4, 1.5, grey(90, 160, 0.6)); dots(c, 300, n, 1.5, 3.5, grey(200, 245, 0.7)); }),
  wood: canvasTex(512, 0.8, (c, n) => { c.fillStyle = "#e9e9e9"; c.fillRect(0, 0, n, n); for (let i = 0; i < 90; i++) { const y0 = rnd() * n, a = 1 + rnd() * 4, f = 0.004 + rnd() * 0.01, ph = rnd() * 6, v = (150 + rnd() * 80) | 0; c.strokeStyle = `rgba(${v},${v},${v},${0.25 + rnd() * 0.35})`; c.lineWidth = 0.6 + rnd() * 1.6; c.beginPath(); for (let x = 0; x <= n; x += 8) c.lineTo(x, y0 + a * Math.sin(x * f + ph)); c.stroke(); } }),
  fine: canvasTex(256, 0.3, (c, n) => { c.fillStyle = "#ececec"; c.fillRect(0, 0, n, n); dots(c, 2200, n, 0.3, 0.9, grey(185, 225, 0.6)); }),
};
const FAMILY = (m) => /reclaimed-stone|granite|paver/.test(m) ? "stone" : /concrete|parge/.test(m) ? "concrete" : /aggregate/.test(m) ? "gravel" : /^soil/.test(m) ? "soil"
  : /glulam|softwood|plywood|cedar/.test(m) ? "wood" : /igu|glass/.test(m) ? "glass" : /stainless|aluminium|steel/.test(m) ? "metal" : /hdpe|ldpe|epdm|butyl|sbs|membrane|geotextile/.test(m) ? "membrane" : "fine";
const TONE = { "cedar-siding": "#b98d63", "cedar-soffit": "#c49a6c", glulam: "#d8b98d", "softwood-lumber": "#dcc29a", "softwood-pt": "#bfa27c", plywood: "#d6bb92", "reclaimed-stone": "#b4b1aa",
  "concrete-lowcarbon": "#c9c5bc", "concrete-f2-40scm": "#c3bfb6", "polymer-concrete": "#77797b", aggregate: "#b3aea4", soil: "#7a6450", "soil-imported": "#6a5442", "steel-prefinished": "#4a4b4d",
  aluminium: "#4a4b4d", stainless: "#b7b9ba", "graphite-eps": "#9a9aa0", gypsum: "#f3f1ec", "parge-charcoal": "#55524f" };

// ---------- materials ----------
const pxUniform = { value: 0.004 };
const RAGGED = `float tr = vWorldP.x - vWorldP.z; float yr = uYB + 0.1 + 0.045 * sin(tr * 6.3) + 0.025 * sin(tr * 17.1 + 1.3) + 0.014 * sin(tr * 43.7 + 0.4);`;
function rendered(p, layer) {
  const fam = FAMILY(p.mat ?? ""), tone = TONE[p.mat] ?? (typeof FINISH !== "undefined" && FINISH[p.mat]) ?? "#cfcac0";
  const opts = { color: tone, roughness: 0.9, metalness: 0, side: THREE.DoubleSide, clippingPlanes: layer.planes, clipShadows: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 };
  if (fam === "glass") Object.assign(opts, { color: "#cfe2e6", transparent: true, opacity: 0.28, roughness: 0.05, depthWrite: false });
  else if (fam === "metal") Object.assign(opts, { roughness: 0.45, metalness: p.mat === "stainless" ? 0.55 : 0.25 });
  else if (fam === "membrane") Object.assign(opts, { color: "#2c2d2f", roughness: 0.7 });
  else if (TEX[fam]) opts.map = TEX[fam];
  const m = new THREE.MeshStandardMaterial(opts);
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uYB = layer.uYB; sh.uniforms.uPx = pxUniform;
    sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP;").replace("#include <project_vertex>", "#include <project_vertex>\nvWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vWorldP; uniform float uYB; uniform float uPx;")
      .replace("void main() {", `void main() {\n${RAGGED}\nif (vWorldP.y < yr) discard;`)
      .replace("#include <dithering_fragment>", "#include <dithering_fragment>\nif (vWorldP.y - yr < uPx * 1.3) gl_FragColor.rgb = vec3(0.106, 0.106, 0.102);");
  };
  return m;
}
// cut faces: pale card with hairline hatch in screen pixels (pat: 0 plain, 2 stipple, 3 diagonal, 4 cross, 5 batt, 6 gravel, 7 solid, 8 tight diagonal, 9 earth)
const CUT_VERT = `
varying vec3 vW;
void main() { vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const CUT_FRAG = `
uniform float uYB; uniform vec3 uTint; uniform vec3 uInk; uniform int uPat; uniform int uAx; uniform float uPx; uniform float uDens;
varying vec3 vW;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hair(float d, float w) { return 1.0 - smoothstep(w * 0.5, w * 0.5 + 0.9, abs(d)); }
float stripes(float t, float sp, float w) { float d = mod(t, sp); return hair(min(d, sp - d), w); }
float stipple(vec2 p, float cell, float dens, float r) { vec2 c = floor(p / cell); vec2 o = (vec2(hash(c), hash(c + 17.0)) * 0.8 + 0.1) * cell; return step(hash(c + 5.3), dens) * (1.0 - smoothstep(r, r + 0.8, length(p - c * cell - o))); }
void main() {
  ${RAGGED.replace(/vWorldP/g, "vW")}
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
function cutMaterial(p, plane, layer, thin) {
  const h = hatchOf(p), focus = FOCUS_IDS.has(p.id), [pat, dens] = CUTP[h] ?? [0];
  return new THREE.ShaderMaterial({
    vertexShader: CUT_VERT, fragmentShader: CUT_FRAG, side: THREE.DoubleSide,
    uniforms: { uYB: layer.uYB, uTint: { value: new THREE.Color(h === "glass" ? "#e6eef0" : "#f7f4ee") }, uInk: { value: (focus ? SIGNAL : INK).clone() },
      uPat: { value: thin ? 7 : focus && !pat ? 3 : pat }, uAx: { value: plane === "w" ? 2 : plane === "y" ? 1 : 0 }, uPx: pxUniform, uDens: { value: dens ?? 0.3 } },
  });
}

// ---------- scene ----------
const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xfff6e6, 0xb3a891, 1.15));
const sun = new THREE.DirectionalLight(0xfff0d8, 2.7);
sun.position.set(-5, 7, 7.5);
sun.target.position.set(-1.4, 0.8, 2.6);
sun.castShadow = true;
Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 30 });
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.bias = -0.0002;
sun.shadow.normalBias = 0.015;
sun.shadow.radius = 4;
scene.add(sun, sun.target);

const layers = LAYERS.map((l) => {
  const planes = [
    new THREE.Plane(new THREE.Vector3(0, 0, -1), WC * S), new THREE.Plane(new THREE.Vector3(0, 0, 1), -W0 * S),
    new THREE.Plane(new THREE.Vector3(1, 0, 0), -XL * S), new THREE.Plane(new THREE.Vector3(0, -1, 0), YT * S), new THREE.Plane(new THREE.Vector3(0, 1, 0), -YB * S),
  ];
  const linePlanes = [...planes.slice(0, 4), new THREE.Plane(new THREE.Vector3(0, 1, 0), -(YB * S + RAG))];
  const group = new THREE.Group();
  scene.add(group);
  return { ...l, planes, linePlanes, group, uYB: { value: YB * S }, sil: [], crease: [], capPolys: { w: [], y: [], x: [] }, anchor: null, area: 0, lines: [] };
});
const matCache = new Map();
for (const p of L.parts) {
  if (p.type === "revolve") continue;
  const layer = layers[layerOf(p)], key = layerOf(p) + "|" + p.mat;
  if (!matCache.has(key)) matCache.set(key, rendered(p, layer));
  const mat = matCache.get(key), glass = p.mat === "igu-triple";
  for (const g of solids(p)) {
    const m = new THREE.Mesh(g, mat);
    m.castShadow = !glass; m.receiveShadow = true;
    layer.group.add(m);
    if (!glass) classify(g, layer); else { const e = new THREE.EdgesGeometry(g, 20).attributes.position.array; for (let i = 0; i < e.length; i += 6) layer.crease.push([e[i], e[i + 1], e[i + 2]], [e[i + 3], e[i + 4], e[i + 5]]); }
  }
  for (const c of caps(p)) {
    const thin = thinness(c.poly) < 3;
    const m = new THREE.Mesh(capGeometry(c.plane, c.poly), cutMaterial(p, c.plane, layer, thin));
    m.receiveShadow = false;
    layer.group.add(m);
    layer.capPolys[c.plane].push({ poly: c.poly, focus: FOCUS_IDS.has(p.id) });
    if (c.plane === "w" && p.id === layer.at) {
      const area = Math.abs(c.poly.reduce((s, [x, y], k) => { const [x2, y2] = c.poly[(k + 1) % c.poly.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
      if (area > layer.area) { layer.area = area; layer.anchor = c.poly; }
    }
  }
}
// cut outlines: the boundary of each layer's cut (against air) is the heaviest line; joints inside the cut are lighter
for (const layer of layers) {
  const outer = [], inner = [], focusSegs = [];
  for (const plane of ["w", "y", "x"]) {
    const polys = layer.capPolys[plane];
    for (const { poly, focus } of polys) poly.forEach((a, k) => {
      const b = poly[(k + 1) % poly.length], du = b[0] - a[0], dv = b[1] - a[1], l = Math.hypot(du, dv);
      if (l < 0.01) return;
      const mu = (a[0] + b[0]) / 2, mv = (a[1] + b[1]) / 2, nu = (-dv / l) * 1.5, nv = (du / l) * 1.5;
      const inside = (u, v) => polys.some((q) => inPoly(q.poly, u, v));
      const seg = [...toWorld(plane, ...a), ...toWorld(plane, ...b)];
      (inside(mu + nu, mv + nv) && inside(mu - nu, mv - nv) ? inner : outer).push(...seg);
      if (focus) focusSegs.push(...seg);
    });
  }
  const objs = [
    lineObject(layer.crease, 0.5, 0.75, layer.linePlanes), lineObject(layer.sil, 1.1, 1, layer.linePlanes),
    flatLines(inner, INK, 0.9, layer.linePlanes.slice(4)), flatLines(outer, INK, 2.2, layer.linePlanes.slice(4)), flatLines(focusSegs, SIGNAL, 1.2, layer.linePlanes.slice(4)),
  ].filter(Boolean);
  objs.forEach((o, i) => { o.renderOrder = 2 + i; layer.group.add(o); layer.lines.push(o.material); });
}

// ---------- planting: a meadow on the bed, cut through by the left plane (illustrative, not modelled) ----------
const bedLayer = layers[2];
const blade = new THREE.PlaneGeometry(0.012, 1, 1, 5);
blade.translate(0, 0.5, 0);
{ const pa = blade.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i); pa.setX(i, pa.getX(i) * Math.pow(1 - y, 0.8)); pa.setZ(i, y * y * 0.18); } blade.computeVertexNormals(); }
const timeU = { value: 0 };
const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide });
bladeMat.onBeforeCompile = (sh) => {
  sh.uniforms.uTime = timeU;
  sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uTime;")
    .replace("#include <begin_vertex>", "#include <begin_vertex>\nfloat ph = instanceMatrix[3].x * 7.0 + instanceMatrix[3].z * 5.0;\ntransformed.x += sin(uTime * 1.3 + ph) * 0.05 * position.y * position.y;");
};
const BED = { x: [XL, -3460], y: -105, w: [W0 + 20, WC - 20] };
const N = 2600, grass = new THREE.InstancedMesh(blade, bladeMat, N), dummy = new THREE.Object3D(), gc = new THREE.Color();
const greens = ["#5f7a3c", "#6e8a45", "#86a052", "#9db463", "#7c8f4a", "#a7a866"];
for (let i = 0; i < N; i++) {
  const x = BED.x[0] - 60 + rnd() * (BED.x[1] - BED.x[0] + 60), w = BED.w[0] + rnd() * (BED.w[1] - BED.w[0]);
  dummy.position.set(x * S, BED.y * S, w * S);
  dummy.rotation.set((rnd() - 0.5) * 0.5, rnd() * Math.PI * 2, (rnd() - 0.5) * 0.5);
  const h = 0.22 + Math.pow(rnd(), 1.5) * 0.5;
  dummy.scale.set(1 + rnd(), h, 1);
  dummy.updateMatrix();
  grass.setMatrixAt(i, dummy.matrix);
  grass.setColorAt(i, gc.set(greens[(rnd() * greens.length) | 0]).multiplyScalar(0.85 + rnd() * 0.3));
}
grass.castShadow = true; grass.receiveShadow = true;
bedLayer.group.add(grass);
const flowerMat = new THREE.MeshStandardMaterial({ roughness: 0.7 }), stalkMat = new THREE.MeshStandardMaterial({ color: "#6b8442", roughness: 0.8 });
const flowers = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.014, 1), flowerMat, 160), stalks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0015, 0.002, 1, 4).translate(0, 0.5, 0), stalkMat, 160);
const petals = ["#f4f0e4", "#efe7cf", "#e9d98f", "#d9c6e6", "#f2ece0"];
for (let i = 0; i < 160; i++) {
  const x = BED.x[0] + rnd() * (BED.x[1] - BED.x[0]), w = BED.w[0] + rnd() * (BED.w[1] - BED.w[0]), h = 0.35 + rnd() * 0.4;
  dummy.position.set(x * S, BED.y * S, w * S); dummy.rotation.set((rnd() - 0.5) * 0.2, 0, (rnd() - 0.5) * 0.2); dummy.scale.set(1, h, 1); dummy.updateMatrix(); stalks.setMatrixAt(i, dummy.matrix);
  dummy.position.set(x * S, BED.y * S + h, w * S); dummy.scale.set(1, 0.7, 1); dummy.updateMatrix(); flowers.setMatrixAt(i, dummy.matrix);
  flowers.setColorAt(i, gc.set(petals[(rnd() * petals.length) | 0]));
}
flowers.castShadow = stalks.castShadow = true;
bedLayer.group.add(flowers, stalks);

// ---------- camera: parallel view fitted to the block, growing to fit the exploded stack ----------
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
function fit(W, H, f) {
  const c = new THREE.Vector3(((XL + BOX.x[1]) / 2) * S, ((YB + YT) / 2) * S, ((W0 + WC) / 2) * S);
  camera.position.copy(c).addScaledVector(VIEWDIR, 50);
  camera.lookAt(c);
  camera.updateMatrixWorld();
  const top = Math.max(...LAYERS.map((l) => l.lift)) * GAP * f, b = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
  for (const x of BOX.x) for (const y of [YB * S, YT * S + top]) for (const w of BOX.w) {
    const v = new THREE.Vector3(x * S, y, w * S).applyMatrix4(camera.matrixWorldInverse);
    b.x = [Math.min(b.x[0], v.x), Math.max(b.x[1], v.x)]; b.y = [Math.min(b.y[0], v.y), Math.max(b.y[1], v.y)];
  }
  const col = VIEW.col * f, regionW = Math.max(W - col, W * 0.55), A = regionW / H;
  let w = b.x[1] - b.x[0], h = b.y[1] - b.y[0];
  if (w / h > A) h = w / A; else w = h * A;
  w *= 1 + VIEW.margin * 2; h *= 1 + VIEW.margin * 2;
  const cx = (b.x[0] + b.x[1]) / 2, cy = (b.y[0] + b.y[1]) / 2;
  Object.assign(camera, { left: cx - w / 2, right: cx - w / 2 + (w * W) / regionW, top: cy + h / 2, bottom: cy - h / 2 });
  camera.updateProjectionMatrix();
}

// ---------- explode ----------
function explode(f) {
  for (const l of layers) {
    const dy = l.lift * GAP * f;
    l.group.position.y = dy;
    l.planes[3].constant = YT * S + dy; l.planes[4].constant = -(YB * S + dy);
    l.linePlanes[3].constant = YT * S + dy; l.linePlanes[4].constant = -(YB * S + RAG + dy);
    l.uYB.value = YB * S + dy;
  }
}

// ---------- labels: dashed leaders from each layer's cut to a column (exploded), lens callout (at rest) ----------
const notes = document.getElementById("hero-notes"), lensCv = document.getElementById("hero-lens");
const proj = (v, W, H) => { const q = v.clone().project(camera); return [((q.x + 1) / 2) * W, ((1 - q.y) / 2) * H]; };
function inner(poly) { const ys = poly.map((q) => q[1]), y = (Math.min(...ys) + Math.max(...ys)) / 2, [x0, x1] = crossings(poly, 1, y)[0] ?? [poly[0][0], poly[0][0]]; return [(x0 + x1) / 2, y]; }
function annotate(W, H, f) {
  let s = "";
  if (f > 0.02) {
    const pts = layers.map((l, i) => ({ l, i, a: l.anchor && proj(new THREE.Vector3(...toWorld("w", ...inner(l.anchor))).add(new THREE.Vector3(0, l.group.position.y, 0)), W, H) })).filter((n) => n.a).sort((m, n) => m.a[1] - n.a[1]);
    const colX = W - VIEW.col + 40, ys = pts.map((n) => n.a[1]);
    for (let k = 1; k < ys.length; k++) ys[k] = Math.max(ys[k], ys[k - 1] + 26);
    pts.forEach((n, k) => {
      const y = ys[k];
      s += `<g class="xnote${n.l.focus ? " focus" : ""}" style="opacity:${Math.min(1, (f - 0.02) * 2.5)}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="2"/><path d="M${n.a[0]} ${n.a[1]} L${colX - 60} ${y} H${colX - 10}" stroke-dasharray="3 3"/><text class="k" x="${colX}" y="${y + 3.5}">${String(n.i + 1).padStart(2, "0")}</text><text x="${colX + 24}" y="${y + 3.5}">${n.l.name.toUpperCase()}</text></g>`;
    });
  }
  const lb = lensCv.getBoundingClientRect(), hb = notes.getBoundingClientRect();
  if (lb.width && f < 0.98) {
    const lc = [lb.left - hb.left + lb.width / 2, lb.top - hb.top + lb.height / 2], r = lb.width / 2, t = proj(new THREE.Vector3(...LENS.at).add(new THREE.Vector3(0, layers[3].group.position.y, 0)), W, H);
    const d = Math.hypot(t[0] - lc[0], t[1] - lc[1]), e = [lc[0] + ((t[0] - lc[0]) / d) * r, lc[1] + ((t[1] - lc[1]) / d) * r], q = [t[0] - ((t[0] - e[0]) / d) * LENS.ring, t[1] - ((t[1] - e[1]) / d) * LENS.ring];
    s += `<g class="lensnote" style="opacity:${1 - f}"><circle cx="${t[0]}" cy="${t[1]}" r="${LENS.ring}" class="ring"/><path d="M${e[0]} ${e[1]} L${q[0]} ${q[1]}" stroke-dasharray="2 3"/><text x="${lc[0] - r}" y="${lc[1] + r + 20}">DETAIL A &#183; 12 MM THRESHOLD, ${LENS.mag}X</text></g>`;
  }
  notes.setAttribute("viewBox", `0 0 ${W} ${H}`);
  notes.innerHTML = s;
}

// ---------- detail lens: the same scene, tighter camera, rendered at rest ----------
const LENS = { at: [60 * S, -20 * S, WC * S], span: 0.3, ring: 12, mag: 0 };
const lensRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: lensCv });
lensRenderer.localClippingEnabled = true;
lensRenderer.setClearColor(0xffffff, 1);
lensRenderer.toneMapping = THREE.ACESFilmicToneMapping;
lensRenderer.shadowMap.enabled = true;
function drawLens(dpr, mainPx) {
  const size = lensCv.getBoundingClientRect().width;
  if (!size) return;
  lensRenderer.setPixelRatio(dpr);
  lensRenderer.setSize(size, size, false);
  const cam = camera.clone(), v = new THREE.Vector3(...LENS.at).applyMatrix4(camera.matrixWorldInverse), h = LENS.span / 2;
  Object.assign(cam, { left: v.x - h, right: v.x + h, top: v.y + h, bottom: v.y - h });
  cam.updateProjectionMatrix();
  LENS.mag = Math.round(mainPx / (LENS.span / size));
  pxUniform.value = LENS.span / size;
  for (const l of layers) for (const m of l.lines) m.resolution.set(size * dpr, size * dpr);
  lensRenderer.render(scene, cam);
}

// ---------- render loop: scroll drives the explode; grass sways while the hero is on screen ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.getElementById("hero-ink") });
renderer.localClippingEnabled = true;
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const hero = document.querySelector(".hero"), host = renderer.domElement.parentElement;
let size = [0, 0], lensDirty = true, visible = true;
function progress() {
  if (reduce || matchMedia("(max-width: 900px)").matches) return 0;
  const r = hero.getBoundingClientRect(), p = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
  const ease = (t) => t * t * (3 - 2 * t), up = ease(Math.min(Math.max((p - 0.08) / 0.37, 0), 1)), down = ease(Math.min(Math.max((p - 0.72) / 0.24, 0), 1));
  document.documentElement.style.setProperty("--xp", (up - down).toFixed(3));
  return up - down;
}
function frame(t) {
  requestAnimationFrame(frame);
  if (!visible) return;
  const { width: W, height: H } = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
  if (!W || !H) return;
  if (W !== size[0] || H !== size[1]) { size = [W, H]; renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); lensDirty = true; }
  const f = progress();
  timeU.value = reduce ? 0 : t / 1000;
  explode(f);
  fit(W, H, f);
  const mainPx = (camera.right - camera.left) / W;
  if (lensDirty && f === 0) { explode(0); drawLens(dpr, mainPx); lensDirty = false; }
  pxUniform.value = mainPx;
  for (const l of layers) for (const m of l.lines) m.resolution.set(W * dpr, H * dpr);
  renderer.render(scene, camera);
  annotate(W, H, f);
}
new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(host);
requestAnimationFrame(frame);
