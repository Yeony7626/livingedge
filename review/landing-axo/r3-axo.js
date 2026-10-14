// Hero axo: the real Detail 02 model (the same part list Rhino builds), cut at w CUT and drawn in parallel
// projection twice: painted (finish colours) and white model with hatched poché. Both are rendered once per
// resize into 2D canvases so the CSS scroll wipe can reveal one over the other.
// sectionShapes / drawOrder / hatchOf come from geom.mjs, inlined above by build-landing.mjs.
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

// Elevation oblique (research 16 §1): the cut face is drawn frontal and true to scale, depth recedes up and to the
// right at 30 degrees, shortened by half. The block is the slice of wall between W0 and the cut at CUT, seen from +w so
// the garden sits on the left as in every other section on the page. CUT falls between joists and inside a glass panel.
const L = window.LANDING, S = 0.001, CUT = 3200, W0 = 900;
// The hero crops to the edge (view metres on the cut plane): the far garden runs off the left and fades, the soil fades at the bottom.
const AXO = { angle: 30, k: 0.5, margin: 0.02, frame: { x: [-5.0, 3.0], y: [-1.75, 5.2] }, ...(L.axo ?? {}) };
const BOX = { x: [-8000, 2500], y: [-1700, 6200], w: [W0, CUT] };
const INK = "#1B1B1A", PAPER = "#F2F1EC", MODEL = "#F7F6F2";

// ---------- geometry (three.js units are metres: x, y, z = w) ----------
const shapeOf = (pts) => new THREE.Shape(pts.map(([a, b]) => new THREE.Vector2(a * S, b * S)));
function solids(p) {
  const k = p.type ?? (p.axis === "x" ? "prism-x" : "prism"), out = [];
  if (k === "prism" || k === "sheet") {
    const pts = k === "sheet" ? [...offsetPath(p.path, p.t / 2), ...offsetPath(p.path, -p.t / 2).reverse()] : p.poly;
    for (const [w0, w1] of p.runs ?? [[-1200, 6000]]) {
      if (w1 < W0 || w0 > CUT) continue;
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
    if (p.axis === "w") for (const [x, y] of p.at ?? [[p.x, p.y]]) {
      if (p.to < W0 || p.from > CUT) continue;
      const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 20);
      g.rotateX(Math.PI / 2);
      g.translate(x * S, (y + (p.dy ?? 0) / 2) * S, ((p.from + p.to) / 2) * S);
      out.push(g);
    } else if (p.axis === "y") for (const w of p.w) {
      if (w + p.d < W0 || w - p.d > CUT) continue;
      const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 20);
      g.translate(p.x * S, ((p.from + p.to) / 2) * S, w * S);
      out.push(g);
    } else for (const w of p.w) for (const y of p.ys ?? [p.y]) {
      if (w + p.d < W0 || w - p.d > CUT) continue;
      const len = Math.hypot(p.to - p.from, p.dy ?? 0), g = new THREE.CylinderGeometry(r, r, len * S, 12);
      g.rotateZ(Math.atan2(p.dy ?? 0, p.to - p.from) - Math.PI / 2);
      g.translate(((p.from + p.to) / 2) * S, (y + (p.dy ?? 0) / 2) * S, w * S);
      out.push(g);
    }
  }
  return out;
}
// Planting is illustrative (no cut): canopies of overlapping spheres sized from the model's plant proxies.
function plantMeshes(p, mats) {
  const rnd = seeded((p.x | 0) + p.w * 7), base = p.profile[0][1] * S, H = (Math.max(...p.profile.map((v) => v[1])) - p.profile[0][1]) * S;
  const R = Math.max(...p.profile.map((v) => v[0])) * S, x = p.x * S, z = p.w * S, out = [];
  if (p.kind === "tree") {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.075, H * 0.62, 10), mats.trunk);
    t.position.set(x, base + H * 0.31, z);
    out.push(t);
  }
  const n = p.kind === "tree" ? 6 : p.kind === "shrub" ? 4 : 3, cy = p.kind === "tree" ? base + H * 0.7 : base + H * 0.42;
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * R * 0.75, r = R * (p.kind === "tree" ? 0.42 : 0.55) * (0.75 + rnd() * 0.4);
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mats.leaf[i % mats.leaf.length]);
    m.position.set(x + Math.cos(a) * rr, cy + (rnd() - 0.5) * H * (p.kind === "tree" ? 0.45 : 0.5), z + Math.sin(a) * rr);
    out.push(m);
  }
  return out;
}

// ---------- hatch textures for the cut face (tile sizes in metres) ----------
const HATCH = {
  earth: [0.26, (c, n) => { c.lineWidth = 2; c.beginPath(); c.moveTo(n * .1, n * .3); c.lineTo(n * .45, n * .08); c.moveTo(n * .55, n * .85); c.lineTo(n * .8, n * .68); c.stroke(); }],
  conc: [0.2, (c, n) => { c.lineWidth = 1.6; c.beginPath(); c.arc(n * .2, n * .2, 2.4, 0, 7); c.fill(); c.moveTo(n * .55, n * .6); c.lineTo(n * .7, n * .38); c.lineTo(n * .85, n * .6); c.closePath(); c.stroke(); c.beginPath(); c.arc(n * .8, n * .85, 1.6, 0, 7); c.fill(); }],
  timber: [0.07, (c, n) => diag(c, n, 1.6)],
  rigid: [0.07, (c, n) => { diag(c, n, 1.2); c.beginPath(); c.moveTo(0, n / 2); c.lineTo(n, n / 2); c.stroke(); }],
  batt: [0.12, (c, n) => { c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, n / 2); c.quadraticCurveTo(n / 4, 0, n / 2, n / 2); c.quadraticCurveTo(n * .75, n, n, n / 2); c.stroke(); }],
  gravel: [0.14, (c, n) => { c.lineWidth = 1.5; c.beginPath(); c.arc(n * .28, n * .28, n * .16, 0, 7); c.moveTo(n * .86, n * .7); c.arc(n * .72, n * .7, n * .12, 0, 7); c.stroke(); }],
  stone: [0.05, (c, n) => diag(c, n, 1.2)],
  gyp: [0.05, (c, n) => { c.beginPath(); c.arc(n / 2, n / 2, 1.6, 0, 7); c.fill(); }],
  maker: [0.06, (c, n) => { c.fillStyle = "#E3DFD4"; c.fillRect(0, 0, n, n); c.strokeStyle = "#B4AFA3"; diag(c, n, 1.4); }],
};
function diag(c, n, w) { c.lineWidth = w; c.beginPath(); c.moveTo(0, n); c.lineTo(n, 0); c.moveTo(-n / 2, n / 2); c.lineTo(n / 2, -n / 2); c.moveTo(n / 2, n * 1.5); c.lineTo(n * 1.5, n / 2); c.stroke(); }
const texCache = {};
function hatchTex(h, stroke = INK) {
  const key = h + stroke;
  if (texCache[key]) return texCache[key];
  const n = 64, cv = document.createElement("canvas");
  cv.width = cv.height = n;
  const c = cv.getContext("2d");
  c.fillStyle = "#fff"; c.fillRect(0, 0, n, n); c.strokeStyle = c.fillStyle = stroke;
  HATCH[h][1](c, n);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / HATCH[h][0], 1 / HATCH[h][0]);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return (texCache[key] = t);
}

// Painted finishes are pulled a fifth of the way toward the paper so the block reads as one family of tones.
// (blend in sRGB, as a painter would mix; a linear-light blend washes the earth tones out to grey)
const mute = (c, t = 0.15) => {
  const a = new THREE.Color(c).getRGB({}, THREE.SRGBColorSpace), b = new THREE.Color(PAPER).getRGB({}, THREE.SRGBColorSpace);
  return new THREE.Color().setRGB(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, THREE.SRGBColorSpace);
};

// ---------- scenes ----------
const clip = [new THREE.Plane(new THREE.Vector3(0, 0, -1), CUT * S), new THREE.Plane(new THREE.Vector3(0, 0, 1), -W0 * S)];
function makeScene(mode) {
  const scene = new THREE.Scene(), ink = mode === "ink";
  scene.add(new THREE.HemisphereLight(0xfbf8f0, ink ? 0xb9b4a8 : 0x8a7d6b, ink ? 1.9 : 1.5));
  const sun = new THREE.DirectionalLight(0xfff6e8, ink ? 1.4 : 2.1);
  sun.position.set(-7, 7, CUT * S + 5);
  sun.target.position.set(0, 0, CUT * S - 1);
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 40 });
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.01;
  scene.add(sun, sun.target);
  const edgeMat = new LineMaterial({ color: INK, linewidth: 1, transparent: true, opacity: ink ? 0.7 : 0.28, clippingPlanes: clip });
  const capLine = new LineMaterial({ color: INK, linewidth: 2, transparent: true, opacity: ink ? 1 : 0.8 });
  const order = drawOrder(L.parts);
  const capSegs = [];
  order.forEach((p, i) => {
    if (p.void || p.type === "virtual" || p.type === "revolve" || p.role === "furniture") return;
    const glass = p.mat === "igu-triple";
    const colour = ink ? MODEL : mute(aged(p.mat, 0) ?? FINISH[p.mat] ?? ROLE[p.role] ?? "#bbbbbb");
    const mat = new THREE.MeshLambertMaterial({ color: glass ? (ink ? "#dfe6e6" : "#b7cbd2") : colour, side: THREE.DoubleSide, clippingPlanes: clip, clipShadows: true,
      transparent: glass, opacity: glass ? (ink ? 0.35 : 0.4) : 1, depthWrite: !glass });
    for (const g of solids(p)) {
      const m = new THREE.Mesh(g, mat);
      m.castShadow = !glass; m.receiveShadow = true;
      scene.add(m);
      if (!glass) scene.add(new LineSegments2(new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(g, 24)), edgeMat));
    }
    // cut face (poché): exactly the 2D section at w CUT, drawn in the section's draw order
    const h = hatchOf(p);
    for (const s of sectionShapes(p, CUT)) {
      let g;
      if (s.circle) { const [x, y, r, ri] = s.circle; const sh = new THREE.Shape().absarc(x * S, y * S, r * S, 0, Math.PI * 2); if (ri) sh.holes.push(new THREE.Path().absarc(x * S, y * S, ri * S, 0, Math.PI * 2, true)); g = new THREE.ShapeGeometry(sh, 24); }
      else g = new THREE.ShapeGeometry(shapeOf(s.poly));
      const thin = s.poly && thinness(s.poly) < 3;
      const tint = ink ? (h === "glass" ? "#dfe6e6" : MODEL) : glass ? "#b7cbd2" : colour;
      const capMat = (ink && (thin || h === "ink")) ? new THREE.MeshBasicMaterial({ color: INK })
        : new THREE.MeshBasicMaterial({ color: tint, map: HATCH[h] && !thin ? hatchTex(h, ink ? INK : "#6f6a62") : null });
      capMat.depthFunc = THREE.LessEqualDepth;
      capMat.side = THREE.DoubleSide;
      const cap = new THREE.Mesh(g, capMat);
      cap.position.z = CUT * S + 0.0002;
      cap.renderOrder = 10 + i;
      scene.add(cap);
      const pts = s.circle ? Array.from({ length: 25 }, (_, k) => [s.circle[0] + s.circle[2] * Math.cos(k / 24 * 2 * Math.PI), s.circle[1] + s.circle[2] * Math.sin(k / 24 * 2 * Math.PI)]) : s.poly;
      pts.forEach((a, k) => { const b = pts[(k + 1) % pts.length]; capSegs.push(a[0] * S, a[1] * S, CUT * S + 0.0006, b[0] * S, b[1] * S, CUT * S + 0.0006); });
    }
  });
  const lg = new LineSegmentsGeometry().setPositions(capSegs);
  const cutLines = new LineSegments2(lg, capLine);
  cutLines.renderOrder = 999;
  scene.add(cutLines);
  const leaf = (ink ? ["#f4f3ee", "#ecebe5"] : ["#93a57c", "#a2b28b"]).map((c) => new THREE.MeshLambertMaterial({ color: c, flatShading: true, transparent: true, opacity: ink ? 0.85 : 0.78, depthWrite: false }));
  const mats = { leaf, trunk: new THREE.MeshLambertMaterial({ color: ink ? MODEL : "#5b4a3a" }) };
  for (const p of L.plants) if (p.w >= W0 - 400 && p.w <= CUT) for (const m of plantMeshes(p, mats)) { m.castShadow = true; m.receiveShadow = !ink; scene.add(m); }
  return { scene, lines: [capLine, edgeMat] };
}

// ---------- camera: orthographic along -w, sheared into an elevation oblique, fitted to the block ----------
function fitCamera(aspect) {
  const a = (AXO.angle * Math.PI) / 180, sx = -AXO.k * Math.cos(a), sy = -AXO.k * Math.sin(a);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  cam.position.set(0, 0, CUT * S + 20);
  cam.lookAt(0, 0, CUT * S);
  cam.updateMatrixWorld();
  const zc = -20;   // view-space depth of the cut plane: it stays frontal and true to scale
  const shear = new THREE.Matrix4().set(1, 0, sx, -sx * zc, 0, 1, sy, -sy * zc, 0, 0, 1, 0, 0, 0, 0, 1);
  const inv = cam.matrixWorldInverse, b = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
  for (const x of BOX.x) for (const y of BOX.y) for (const w of BOX.w) {
    const v = new THREE.Vector3(x * S, y * S, w * S).applyMatrix4(inv).applyMatrix4(shear);
    b.x = [Math.min(b.x[0], v.x), Math.max(b.x[1], v.x)]; b.y = [Math.min(b.y[0], v.y), Math.max(b.y[1], v.y)];
  }
  const f = AXO.frame ?? b;   // optional crop in view units (metres on the cut plane)
  let w = f.x[1] - f.x[0], h = f.y[1] - f.y[0];
  const cx = (f.x[0] + f.x[1]) / 2, cy = (f.y[0] + f.y[1]) / 2;
  if (w / h > aspect) h = w / aspect; else w = h * aspect;
  const m = 1 + AXO.margin * 2;
  Object.assign(cam, { left: cx - (w * m) / 2, right: cx + (w * m) / 2, top: cy + (h * m) / 2, bottom: cy - (h * m) / 2 });
  cam.updateProjectionMatrix();
  cam.projectionMatrix.multiply(shear);
  cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
  return cam;
}

// ---------- render both into the hero canvases ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);
const views = { paint: makeScene("paint"), ink: makeScene("ink") };
const targets = { paint: document.getElementById("hero-paint"), ink: document.getElementById("hero-ink") };
function draw() {
  const box = targets.ink.parentElement.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
  if (!box.width || !box.height) return;
  renderer.setPixelRatio(dpr);
  renderer.setSize(box.width, box.height, false);
  const cam = fitCamera(box.width / box.height);
  for (const k of ["paint", "ink"]) {
    for (const lm of views[k].lines) lm.resolution.set(box.width * dpr, box.height * dpr);
    renderer.render(views[k].scene, cam);
    const cv = targets[k];
    cv.width = box.width * dpr; cv.height = box.height * dpr;
    cv.getContext("2d").drawImage(renderer.domElement, 0, 0);
  }
}
new ResizeObserver(draw).observe(targets.ink.parentElement);
