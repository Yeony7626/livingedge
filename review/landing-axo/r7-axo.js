// Hero: an isometric section-box drawing of the real Detail 02 model (the same part list Rhino builds).
// Drawing conventions follow the references the user supplied (ink detail axos): white model, hairline edges,
// heavier cut outlines, materials told by drawn texture (grain on timber, stipple on concrete and earth, standard
// hatches on the cut), one signal colour for the junction the page is about, leaders to a numbered column, datums.
// sectionShapes / sheetPoly / hatchOf / thinness come from geom.mjs, inlined above by build-landing.mjs.
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

const L = window.LANDING, S = 0.001;
// Section box in model mm: the cut face is the front plane w = WC (between joists, inside a glass panel);
// the top plane cuts the upper wall, the left plane cuts the landing and the bed.
const BOX = { x: [-1700, 1300], y: [-760, 3700], w: [2000, 3200] };   // a 3 x 4.5 x 1.2 m fragment around the opening
const [XL] = BOX.x, [YB, YT] = BOX.y, [W0, WC] = BOX.w;
const VIEW = { az: -38, el: 30, col: 290, margin: 0.06 };
const INK = new THREE.Color("#1B1B1A"), SIGNAL = new THREE.Color("#E0482B");
// The 12 mm threshold itself (sill, track, pan, tray): the only parts drawn in the signal colour.
const FOCUS_IDS = new Set(["sill-block", "sill-bearer", "sill-nosing", "track", "track-rail", "sill-cover", "sill-foil", "pan", "pan-back", "dam-angle", "landing-tray", "tray-slips", "course"]);
const FOCUS = (p) => FOCUS_IDS.has(p.id);
const RAG = 0.2;   // the soil ends in a ragged break line within this band above the box bottom (m)

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
// Grain runs along a member's longest dimension (0 x, 1 y, 2 w).
const argmax = (a) => a.reduce((b, v, i) => (v > a[b] ? i : b), 0);
function grainAxis(p) {
  const pts = p.type === "sheet" ? sheetPoly(p) : p.poly ?? [[0, 0]], xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
  const span = (v) => Math.max(...v) - Math.min(...v);
  if (p.axis === "x") return argmax([p.x[1] - p.x[0], span(ys), span(xs)]);
  return argmax([span(xs), span(ys), Math.max(...(p.runs ?? RUNS).map(([a, b]) => b - a))]);
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
const E = 0.0004;   // caps sit a hair outside their plane
const toWorld = (plane, u, v) => plane === "w" ? [u * S, v * S, WC * S + E] : plane === "y" ? [u * S, YT * S + E, v * S] : [XL * S - E, v * S, u * S];
function capGeometry(plane, poly) {
  const g = new THREE.ShapeGeometry(shapeOf(poly));
  if (plane === "w") g.translate(0, 0, WC * S + E);
  else if (plane === "y") { g.rotateX(Math.PI / 2); g.translate(0, YT * S + E, 0); }
  else { g.rotateY(-Math.PI / 2); g.translate(XL * S - E, 0, 0); }
  return g;
}

// ---------- drawn-texture material: every pattern is a hairline measured in screen pixels ----------
// pat: 0 plain, 1 grain, 2 stipple, 3 diagonal, 4 cross, 5 batt wave, 6 gravel, 7 solid, 8 tight diagonal, 9 earth
const VERT = `
#include <clipping_planes_pars_vertex>
varying vec3 vW; varying vec3 vN;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vW = (modelMatrix * vec4(position, 1.0)).xyz; vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * mvPosition;
  #include <clipping_planes_vertex>
}`;
const FRAG = `
#include <clipping_planes_pars_fragment>
uniform float uYB; uniform vec3 uTint; uniform vec3 uInk; uniform int uPat; uniform int uGrain; uniform float uPx; uniform float uDens; uniform float uOpacity; uniform bool uCap;
varying vec3 vW; varying vec3 vN;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hair(float d, float w) { return 1.0 - smoothstep(w * 0.5, w * 0.5 + 0.9, abs(d)); }
float stripes(float t, float sp, float w) { float d = mod(t, sp); return hair(min(d, sp - d), w); }
float stipple(vec2 p, float cell, float dens, float r) { vec2 c = floor(p / cell); vec2 o = (vec2(hash(c), hash(c + 17.0)) * 0.8 + 0.1) * cell; return step(hash(c + 5.3), dens) * (1.0 - smoothstep(r, r + 0.8, length(p - c * cell - o))); }
void main() {
  #include <clipping_planes_fragment>
  vec3 n = normalize(vN);
  int ax = abs(n.y) > 0.5 ? 1 : (abs(n.x) > 0.5 ? 0 : 2);
  vec2 uv = ax == 1 ? vW.xz : (ax == 0 ? vW.zy : vW.xy);
  vec2 p = uv / uPx;
  float tr = vW.x - vW.z, yr = uYB + 0.1 + 0.045 * sin(tr * 6.3) + 0.025 * sin(tr * 17.1 + 1.3) + 0.014 * sin(tr * 43.7 + 0.4);
  float dr = (vW.y - yr) / uPx;
  if (dr < 0.0) discard;
  float ink = 0.0;
  if (uPat == 1 && uGrain != ax) {
    bool alongU = (ax == 1 && uGrain == 0) || (ax == 0 && uGrain == 2) || (ax == 2 && uGrain == 0);
    float across = alongU ? p.y : p.x, along = alongU ? p.x : p.y;
    float k = floor(across / 4.5);
    float off = across - (k + 0.5) * 4.5 + 1.1 * sin(along * 0.02 + k * 1.9) + 0.6 * sin(along * 0.071 + k);
    ink = step(0.42, hash(vec2(k, 2.0))) * hair(off, 0.35) * 0.5;
  } else if (uPat == 2) ink = stipple(p, 4.0, uDens, 0.45) * 0.85;
  else if (uPat == 3) ink = stripes((p.x + p.y) * 0.7071, 5.0, 0.5) * 0.9;
  else if (uPat == 4) ink = max(stripes((p.x + p.y) * 0.7071, 6.0, 0.45), stripes((p.x - p.y) * 0.7071, 6.0, 0.45)) * 0.8;
  else if (uPat == 5) ink = stripes(p.y + 2.6 * sin(p.x * 0.42), 7.0, 0.5) * 0.85;
  else if (uPat == 6) { vec2 c = floor(p / 9.0); vec2 o = c * 9.0 + 4.5 + (vec2(hash(c), hash(c + 3.0)) - 0.5) * 2.0; float r = 2.2 + hash(c + 9.0) * 1.6; ink = hair(length(p - o) - r, 0.5) * 0.9; }
  else if (uPat == 7) ink = 1.0;
  else if (uPat == 8) ink = stripes((p.x + p.y) * 0.7071, 3.2, 0.45) * 0.8;
  else if (uPat == 9) { float t = (p.x + p.y) * 0.7071, s = (p.x - p.y) * 0.7071; float k = floor(t / 10.0); ink = max(stripes(t, 10.0, 0.5) * step(0.55, fract(s / 16.0 + hash(vec2(k, 1.0)))), stipple(p, 4.0, 0.22, 0.45)) * 0.8; }
  float tone = uCap ? 1.0 : (ax == 1 ? 1.0 : (ax == 2 ? 0.955 : 0.9));
  vec3 inkc = uInk;
  if (dr < 1.2) { ink = 1.0; inkc = vec3(0.106, 0.106, 0.102); }   // the break line itself
  gl_FragColor = vec4(mix(uTint * tone, inkc, clamp(ink, 0.0, 1.0)), uOpacity);
  #include <colorspace_fragment>
}`;
const clip = [
  new THREE.Plane(new THREE.Vector3(0, 0, -1), WC * S), new THREE.Plane(new THREE.Vector3(0, 0, 1), -W0 * S),
  new THREE.Plane(new THREE.Vector3(1, 0, 0), -XL * S), new THREE.Plane(new THREE.Vector3(0, -1, 0), YT * S), new THREE.Plane(new THREE.Vector3(0, 1, 0), -YB * S),
];
const pxUniform = { value: 0.005 }, matCache = new Map();
function drawn({ tint = "#ffffff", ink = INK, pat = 0, grain = 2, dens = 0.3, cap = false, opacity = 1 }) {
  const key = [tint, ink.getHex(), pat, grain, dens, cap, opacity].join();
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, clipping: !cap, clippingPlanes: cap ? null : clip, side: THREE.DoubleSide,
    transparent: opacity < 1, depthWrite: opacity === 1, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    uniforms: { uYB: { value: YB * S }, uTint: { value: new THREE.Color(tint) }, uInk: { value: ink.clone() }, uPat: { value: pat }, uGrain: { value: grain }, uPx: pxUniform, uDens: { value: dens }, uOpacity: { value: opacity }, uCap: { value: cap } },
  });
  matCache.set(key, m);
  return m;
}
// Material class -> surface texture (seen faces) and cut hatch (cut faces).
const SURF = { timber: [1], conc: [2, 0.16], earth: [2, 0.3], gravel: [2, 0.25], stone: [2, 0.12], gyp: [0], rigid: [0], batt: [0], maker: [0], glass: [0], ink: [0], plain: [0] };
const CUTP = { timber: [3], conc: [2, 0.55], earth: [9], gravel: [6], stone: [8], gyp: [2, 0.35], rigid: [4], batt: [5], maker: [3], glass: [0], ink: [7], plain: [0] };
const TINT = { ink: "#d9d8d3", maker: "#ebe9e3", glass: "#e3ecee" };

// ---------- scene ----------
const scene = new THREE.Scene();
const lineClip = [...clip.slice(0, 4), new THREE.Plane(new THREE.Vector3(0, 1, 0), -(YB * S + RAG))];
const edgeMat = new LineMaterial({ color: INK, linewidth: 0.75, transparent: true, opacity: 0.85, clippingPlanes: lineClip });
const cutMat = new LineMaterial({ color: INK, linewidth: 1.5, clippingPlanes: lineClip.slice(4) });
const anchors = {};
const edgeSegs = [], cutSegs = [];
for (const p of L.parts) {
  if (p.type === "revolve") continue;
  const h = hatchOf(p), focus = FOCUS(p), glass = p.mat === "igu-triple";
  const ink = focus ? SIGNAL : INK, tint = focus ? "#f7d9d0" : TINT[h] ?? "#ffffff";
  const [sp, sd] = SURF[h] ?? [0], [cp, cd] = CUTP[h] ?? [0];
  const face = drawn({ tint, ink, pat: sp, dens: sd, grain: sp === 1 ? grainAxis(p) : 2, opacity: glass ? 0.3 : 1 });
  for (const g of solids(p)) {
    scene.add(new THREE.Mesh(g, face));
    const e = new THREE.EdgesGeometry(g, 20).attributes.position.array;
    for (let i = 0; i < e.length; i++) edgeSegs.push(e[i]);
  }
  for (const c of caps(p)) {
    const thin = thinness(c.poly) < 3;
    const m = drawn({ tint, ink, pat: thin ? 7 : cp, dens: cd, cap: true, opacity: glass ? 0.45 : 1 });
    scene.add(new THREE.Mesh(capGeometry(c.plane, c.poly), m));
    c.poly.forEach((a, k) => { const b = c.poly[(k + 1) % c.poly.length]; cutSegs.push(...toWorld(c.plane, ...a), ...toWorld(c.plane, ...b)); });
    if (c.plane === "w") {
      const area = Math.abs(c.poly.reduce((s, [x, y], k) => { const [x2, y2] = c.poly[(k + 1) % c.poly.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
      if (!anchors[p.id] || area > anchors[p.id].area) anchors[p.id] = { area, poly: c.poly };
    }
  }
}
const edges = new LineSegments2(new LineSegmentsGeometry().setPositions(edgeSegs), edgeMat);
const cuts = new LineSegments2(new LineSegmentsGeometry().setPositions(cutSegs), cutMat);
cuts.renderOrder = 2;
scene.add(edges, cuts);

// ---------- camera: isometric-style parallel view, block fitted left of the label column ----------
function camera(W, H) {
  const az = (VIEW.az * Math.PI) / 180, el = (VIEW.el * Math.PI) / 180;
  const c = new THREE.Vector3(((XL + BOX.x[1]) / 2) * S, ((YB + YT) / 2) * S, ((W0 + WC) / 2) * S);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  cam.position.copy(c).add(new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(50));
  cam.lookAt(c);
  cam.updateMatrixWorld();
  const b = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
  for (const x of BOX.x) for (const y of BOX.y) for (const w of BOX.w) {
    const v = new THREE.Vector3(x * S, y * S, w * S).applyMatrix4(cam.matrixWorldInverse);
    b.x = [Math.min(b.x[0], v.x), Math.max(b.x[1], v.x)]; b.y = [Math.min(b.y[0], v.y), Math.max(b.y[1], v.y)];
  }
  const regionW = Math.max(W - VIEW.col, W * 0.55), A = regionW / H;
  let w = b.x[1] - b.x[0], h = b.y[1] - b.y[0];
  if (w / h > A) h = w / A; else w = h * A;
  w *= 1 + VIEW.margin * 2; h *= 1 + VIEW.margin * 2;
  const cx = (b.x[0] + b.x[1]) / 2, cy = (b.y[0] + b.y[1]) / 2;
  Object.assign(cam, { left: cx - w / 2, right: cx - w / 2 + (w * W) / regionW, top: cy + h / 2, bottom: cy - h / 2 });
  cam.updateProjectionMatrix();
  return cam;
}

// ---------- annotation: leaders to a numbered column, datums on the left ----------
const NOTES = [
  ["cedar-band", "Cedar siding on strapping"],
  ["glulam", "Glulam header 215 x 684"],
  ["canopy-deck", "Canopy, cedar soffit"],
  ["glass-2", "Triple-glazed lift-and-slide"],
  ["sill-block", "Warm sill, 12 mm threshold"],
  ["channel", "Trench channel"],
  ["slab", "Slab on graphite EPS"],
  ["beam", "Grade beam"],
  ["pavers-lined", "Reclaimed granite, lined base"],
  ["underdrain", "Liner and underdrain"],
].filter(([id]) => anchors[id]);
function inner(poly) {   // a point inside the cut polygon
  const ys = poly.map((q) => q[1]), y = (Math.min(...ys) + Math.max(...ys)) / 2, [x0, x1] = crossings(poly, 1, y)[0] ?? [poly[0][0], poly[0][0]];
  return [(x0 + x1) / 2, y];
}
function annotate(cam, W, H) {
  const svg = document.getElementById("hero-notes"), px = (v) => { const q = new THREE.Vector3(...v).project(cam); return [((q.x + 1) / 2) * W, ((1 - q.y) / 2) * H]; };
  const pts = NOTES.map(([id, t]) => ({ t, a: px(toWorld("w", ...inner(anchors[id].poly))) })).sort((m, n) => m.a[1] - n.a[1]);
  const top = 40, bot = H - 70, colX = W - VIEW.col + 46;
  // each label sits at its anchor's height, pushed apart to a minimum pitch, so leaders run near-horizontal
  const ys = pts.map((n) => Math.min(Math.max(n.a[1], top), bot)), PITCH = 24;
  for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + PITCH);
  for (let i = ys.length - 1; i >= 0; i--) ys[i] = Math.min(ys[i], i === ys.length - 1 ? bot : ys[i + 1] - PITCH);
  let s = "";
  pts.forEach((n, i) => {
    const y = ys[i], k = String(i + 1).padStart(2, "0");
    s += `<g class="note" style="--i:${i}"><circle cx="${n.a[0]}" cy="${n.a[1]}" r="1.8"/><path d="M${n.a[0]} ${n.a[1]} L${colX - 70} ${y} H${colX - 12}"/><text class="k" x="${colX}" y="${y + 3.5}">${k}</text><text x="${colX + 22}" y="${y + 3.5}">${n.t.toUpperCase()}</text></g>`;
  });
  for (const [lv, label] of [[0, "+0.000 FLOOR"], [2785, "+2.785 HEAD"]]) {
    const [x, y] = px([XL * S, lv * S, W0 * S]);   // back-left edge: the leftmost point at that level
    const x0 = Math.max(x - 150, 6);
    s += `<g class="datum"><path d="M${x0} ${y} H${x - 8}" stroke-dasharray="2 3"/><path d="M${x0 + 6} ${y} l5 -8 h-10 z" class="tri"/><text x="${x0 + 16}" y="${y - 4}">${label}</text></g>`;
  }
  // detail lens: a leader from the lens rim to the threshold it magnifies
  const lens = document.getElementById("hero-lens").getBoundingClientRect(), host = svg.getBoundingClientRect();
  const lc = [lens.left - host.left + lens.width / 2, lens.top - host.top + lens.height / 2], r = lens.width / 2, t = px(LENS.at);
  const d = Math.hypot(t[0] - lc[0], t[1] - lc[1]), e = [lc[0] + ((t[0] - lc[0]) / d) * r, lc[1] + ((t[1] - lc[1]) / d) * r];
  s += `<g class="lensnote"><circle cx="${t[0]}" cy="${t[1]}" r="${LENS.ring}" class="ring"/><path d="M${e[0]} ${e[1]} L${t[0] - ((t[0] - e[0]) / Math.hypot(t[0] - e[0], t[1] - e[1])) * LENS.ring} ${t[1] - ((t[1] - e[1]) / Math.hypot(t[0] - e[0], t[1] - e[1])) * LENS.ring}" stroke-dasharray="2 3"/><text x="${lc[0] - r}" y="${lc[1] + r + 20}">DETAIL A &#183; THRESHOLD, ${LENS.mag}X</text></g>`;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = s;
}

// ---------- detail lens: the same scene through a tighter parallel camera around the threshold ----------
const LENS = { at: [90 * S, -60 * S, WC * S], span: 0.34, ring: 13, mag: 0 };
const lensRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.getElementById("hero-lens") });
lensRenderer.localClippingEnabled = true;
lensRenderer.setClearColor(0xffffff, 1);
function drawLens(base, mainPx, dpr) {
  const cv = lensRenderer.domElement, size = cv.getBoundingClientRect().width;
  if (!size) return;
  lensRenderer.setPixelRatio(dpr);
  lensRenderer.setSize(size, size, false);
  const cam = base.clone(), v = new THREE.Vector3(...LENS.at).applyMatrix4(base.matrixWorldInverse), h = LENS.span / 2;
  Object.assign(cam, { left: v.x - h, right: v.x + h, top: v.y + h, bottom: v.y - h });
  cam.updateProjectionMatrix();
  LENS.mag = Math.round(mainPx / (LENS.span / size));
  pxUniform.value = LENS.span / size;
  for (const m of [edgeMat, cutMat]) m.resolution.set(size * dpr, size * dpr);
  lensRenderer.render(scene, cam);
}

// ---------- render ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.getElementById("hero-ink") });
renderer.localClippingEnabled = true;
renderer.setClearColor(0x000000, 0);
function draw() {
  const host = renderer.domElement.parentElement, { width: W, height: H } = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
  if (!W || !H) return;
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H, false);
  const cam = camera(W, H);
  pxUniform.value = (cam.right - cam.left) / W;
  for (const m of [edgeMat, cutMat]) m.resolution.set(W * dpr, H * dpr);
  renderer.render(scene, cam);
  const mainPx = pxUniform.value;
  drawLens(cam, mainPx, dpr);
  pxUniform.value = mainPx;
  annotate(cam, W, H);
}
new ResizeObserver(draw).observe(renderer.domElement.parentElement);
