// Living Edge detail viewer (prototype). Reads the same part list Rhino builds from (window.DETAIL) and draws it in
// the browser: a 2D section at any position along the wall, control-layer toggles, part inspection, a 3D edge and
// live carbon. No Rhino at runtime. Boolean cuts are not computed here: cut targets are drawn first, then voids
// (in the background colour), then the cutting parts, which reads correctly in section.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const { spec, mats } = window.DETAIL;
const L = spec.L;
const parts = spec.parts;
const HASH0 = new URLSearchParams(location.hash.slice(1));   // the link that opened the tool, read before any view writes the hash
const byId = new Map(parts.map((p) => [p.id, p]));

// ---------- geometry helpers (same rules as detail02.mjs / build.py) ----------
function offsetPath(path, d) {
  const n = path.slice(1).map((p, i) => {
    const dx = p[0] - path[i][0], dy = p[1] - path[i][1], l = Math.hypot(dx, dy);
    return [-dy / l, dx / l];
  });
  return path.map((p, i) => {
    if (i === 0 || i === path.length - 1) {
      const m = n[Math.min(i, n.length - 1)];
      return [p[0] + m[0] * d, p[1] + m[1] * d];
    }
    const a = n[i - 1], b = n[i], ml = Math.hypot(a[0] + b[0], a[1] + b[1]);
    const mx = (a[0] + b[0]) / ml, my = (a[1] + b[1]) / ml, k = d / (mx * b[0] + my * b[1]);
    return [p[0] + mx * k, p[1] + my * k];
  });
}
const sheetPoly = (p) => [...offsetPath(p.path, p.t / 2), ...offsetPath(p.path, -p.t / 2).reverse()];
const kind = (p) => (p.void ? "void" : p.type ?? (p.axis === "x" ? "prism-x" : "prism"));
const inRuns = (runs, w) => (runs ?? [[-Infinity, Infinity]]).some(([a, b]) => w >= a && w <= b);
const chord = (r, dw) => (Math.abs(dw) < r ? Math.sqrt(r * r - dw * dw) : 0);

// Cross-section of one part at plane w: a list of polygons [[x, y], ...] (and circles for pipes along the wall).
function sectionShapes(p, w) {
  const k = kind(p);
  if (k === "virtual") return [];
  if (k === "prism" || k === "void") return inRuns(p.runs, w) ? [{ poly: p.poly }] : [];
  if (k === "sheet") return inRuns(p.runs, w) ? [{ poly: sheetPoly(p) }] : [];
  if (k === "prism-x") {
    const ys = [];
    p.poly.forEach(([w0, y0], i) => {
      const [w1, y1] = p.poly[(i + 1) % p.poly.length];
      if ((w >= Math.min(w0, w1)) && (w <= Math.max(w0, w1)) && w0 !== w1) ys.push(y0 + ((w - w0) / (w1 - w0)) * (y1 - y0));
    });
    if (ys.length < 2) return [];
    const [a, b] = p.x, y0 = Math.min(...ys), y1 = Math.max(...ys);
    return [{ poly: [[a, y0], [b, y0], [b, y1], [a, y1]] }];
  }
  if (k === "rod") {
    const r = p.d / 2, ri = (p.di ?? 0) / 2;
    if (p.axis === "w") {
      if (w < p.from || w > p.to) return [];
      const f = (w - p.from) / (p.to - p.from || 1);
      return (p.at ?? [[p.x, p.y]]).map(([x, y]) => ({ circle: [x, y + (p.dy ?? 0) * f, r, ri] }));
    }
    if (p.axis === "y") return p.w.map((wi) => chord(r, w - wi)).filter((c) => c > 0).map((c) => ({ poly: [[p.x - c, p.from], [p.x + c, p.from], [p.x + c, p.to], [p.x - c, p.to]] }));
    // axis x (screws, sloped drains)
    const out = [];
    for (const wi of p.w) {
      const c = chord(r, w - wi);
      if (!c) continue;
      for (const y of p.ys ?? [p.y]) out.push({ poly: [[p.from, y - c], [p.to, y - c + (p.dy ?? 0)], [p.to, y + c + (p.dy ?? 0)], [p.from, y + c]] });
    }
    return out;
  }
  if (k === "revolve") {
    const out = [];
    for (const wi of p.w) {
      const dw = w - wi;
      const pts = p.profile.map(([r, y]) => [chord(Math.max(r, 1e-6), dw), y]).filter(([c]) => c > 0);
      if (pts.length < 2) continue;
      out.push({ poly: [...pts.map(([c, y]) => [p.x + c, y]), ...pts.reverse().map(([c, y]) => [p.x - c, y])] });
    }
    return out;
  }
  return [];
}

// Draw order: cut targets before their cutters; voids drawn just before the cutters.
function drawOrder() {
  const after = new Map(parts.map((p) => [p.id, new Set()]));
  for (const p of parts) for (const c of p.cuts ?? []) if (typeof c === "string" && after.has(c)) after.get(c).add(p.id);
  const seen = new Set(), out = [];
  const visit = (id) => {
    if (seen.has(id)) return;
    seen.add(id);
    for (const t of after.get(id)) visit(t);   // targets of this cutter come first
    out.push(byId.get(id));
  };
  parts.forEach((p) => visit(p.id));
  return out;
}
const ORDER = drawOrder();

// ---------- look ----------
const ROLE = {
  concrete: "#a5a5a5", ground: "#b59b78", drainage: "#78aac8", water: "#3D6E8F", air: "#2E9E8F", vapour: "#7E5BC2", thermal: "#D9A400",   // control layers; red is kept for the signal colour
  frame: "#cdaa78", cladding: "#ebe6d7", furniture: "#96643c", metal: "#5a5a5f", planting: "#5f874b",
};
const FINISH = {
  "steel-prefinished": "#343638", aluminium: "#343638", stainless: "#96989a", "polymer-concrete": "#46484a", "igu-triple": "#96afb9",
  "cedar-siding": "#96928a", "cedar-soffit": "#b68860", glulam: "#c4a076", "softwood-lumber": "#c4a076", "softwood-pt": "#b09670", plywood: "#c8aa82",
  "concrete-lowcarbon": "#b0ada6", "concrete-f2-40scm": "#b0ada6", "reclaimed-stone": "#8c8a84", aggregate: "#9e998f", soil: "#564232", "soil-imported": "#5c4634",
  vegetation: "#627e4a", "parge-charcoal": "#4e4e4c", "woodfibre-board": "#967855", hdpe: "#1e1e20", "graphite-eps": "#78787d", gypsum: "#eceae4",
};
const CONTROL = ["water", "air", "thermal", "vapour"];
const state = { w: 900, layers: new Set(), finish: false, selected: null, view: "section" };
const colourOf = (p) => (state.finish ? FINISH[p.mat] ?? ROLE[p.role] ?? "#ccc" : ROLE[p.role] ?? "#ccc");

// ---------- 2D section (SVG) ----------
const svg = document.getElementById("section");
const NS = "http://www.w3.org/2000/svg";
let vb = { x: -8100, y: -4600, w: 10700, h: 6400 };
const setVB = () => svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
function fitView(v) {
  const pad = 0.06, w = v.x[1] - v.x[0], h = v.y[1] - v.y[0];
  const box = svg.getBoundingClientRect(), ar = box.width / Math.max(box.height, 1) || 1.6;
  let W = w * (1 + pad * 2), H = h * (1 + pad * 2);
  if (W / H < ar) W = H * ar; else H = W / ar;
  vb = { x: (v.x[0] + v.x[1]) / 2 - W / 2, y: -(v.y[0] + v.y[1]) / 2 - H / 2, w: W, h: H };
  setVB();
}
function drawSection() {
  svg.replaceChildren();
  const bg = getComputedStyle(document.body).getPropertyValue("--canvas").trim();
  const dim = state.layers.size > 0;
  for (const p of ORDER) {
    for (const s of sectionShapes(p, state.w)) {
      let el;
      if (s.circle) {
        const [x, y, r, ri] = s.circle;
        el = document.createElementNS(NS, "path");
        const ring = (rr) => `M ${x - rr} ${-y} a ${rr} ${rr} 0 1 0 ${2 * rr} 0 a ${rr} ${rr} 0 1 0 ${-2 * rr} 0`;
        el.setAttribute("d", ring(r) + (ri ? " " + ring(ri) : ""));
        el.setAttribute("fill-rule", "evenodd");
      } else {
        el = document.createElementNS(NS, "polygon");
        el.setAttribute("points", s.poly.map(([x, y]) => `${x},${-y}`).join(" "));
      }
      if (p.void) {
        el.setAttribute("fill", bg);
        el.setAttribute("stroke", "none");
      } else {
        const on = !dim || state.layers.has(p.role);
        el.setAttribute("fill", colourOf(p));
        el.setAttribute("fill-opacity", on ? (p.role === "planting" || p.role === "furniture" ? 0.55 : 0.92) : 0.12);
        el.setAttribute("stroke", on && dim ? ROLE[p.role] : "var(--line)");
        el.setAttribute("stroke-width", on && dim ? 3 : 0.6);
        el.setAttribute("vector-effect", "non-scaling-stroke");
        if (state.selected === p.id) { el.setAttribute("stroke", "var(--accent)"); el.setAttribute("stroke-width", 3); }
        el.dataset.id = p.id;
        el.addEventListener("click", (e) => { e.stopPropagation(); select(p.id); });
        const t = document.createElementNS(NS, "title");
        t.textContent = p.name;
        el.appendChild(t);
      }
      svg.appendChild(el);
    }
  }
}
// pan / zoom
let drag = null;
svg.addEventListener("wheel", (e) => {
  e.preventDefault();
  const r = svg.getBoundingClientRect(), f = e.deltaY > 0 ? 1.15 : 1 / 1.15;
  const mx = vb.x + ((e.clientX - r.left) / r.width) * vb.w, my = vb.y + ((e.clientY - r.top) / r.height) * vb.h;
  vb = { x: mx - (mx - vb.x) * f, y: my - (my - vb.y) * f, w: vb.w * f, h: vb.h * f };
  setVB();
}, { passive: false });
svg.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, vb: { ...vb } }; });
window.addEventListener("pointerup", () => (drag = null));
window.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const r = svg.getBoundingClientRect();
  vb = { ...drag.vb, x: drag.vb.x - ((e.clientX - drag.x) / r.width) * vb.w, y: drag.vb.y - ((e.clientY - drag.y) / r.height) * vb.h };
  setVB();
});

// ---------- inspector ----------
const info = document.getElementById("info");
const NOTES = { "01": "codes", "02": "materials", "03": "assembly and climate", "04": "ecology", "06": "junction details", "07": "ground and wall junctions", "08": "landscape", "08b": "threshold paving", "09": "assembly options", "10": "exterior finish", "11": "sliding wall", "12": "ground floor", "13": "floor-band head", "14": "lift-and-slide", "15": "THERM export" };
const srcName = (s) => { const m = /^(\d\db?)\s+(.*)$/.exec(s); return m && NOTES[m[1]] ? `research ${m[1]} (${NOTES[m[1]]}) ${m[2]}` : s; };
function keySchedule() {
  state.selected = null;
  DRAFT.sel = null;
  highlight3D();
  const keys = DRAFT.keys ?? [];
  if (state.view === "3d") { info.innerHTML = '<p class="hint">Click a component in the model to inspect its material and sources. Selection follows you back to Draft and Layers.</p>'; return; }
  info.innerHTML = keys.length ? `<p class="hint" style="margin:0 0 8px">Parts tagged on this sheet. Choose one for what it is, why it is there and where it comes from.</p><ol class="keys">${keys.map((k) => `<li><button type="button" data-id="${k.id}"><b>${k.tag}</b><span>${k.name}</span></button></li>`).join("")}</ol>` : '<p class="hint">Click a part to see what it is, why it is there and where it comes from.</p>';
  info.querySelectorAll(".keys button").forEach((b) => (b.onclick = () => select(b.dataset.id)));
}
function select(id) {
  if (!byId.has(id)) return;
  state.selected = id; deepLink?.({ part: id });
  DRAFT.sel = id;
  const p = byId.get(id);
  const m = mats[p.mat];
  info.innerHTML = `<h3>${p.name}</h3>
    <dl><dt>id</dt><dd><code>${p.id}</code></dd><dt>role</dt><dd>${p.role}</dd><dt>junction</dt><dd>${p.junction} ${spec.zones?.[p.junction]?.label ?? ""}</dd>
    <dt>material</dt><dd>${p.mat || "none"}${m ? `, ${m.a1a3} kgCO₂e/kg` : ""}</dd></dl>
    ${p.note ? `<p>${p.note}</p>` : ""}
    <p class="src">Sources: ${(p.src ?? []).map(srcName).join("; ") || "none recorded"}</p><p><button type="button" class="back">All parts</button></p>`;
  info.querySelector(".back").onclick = () => keySchedule();
  if (state.view === "draft" || state.view === "section") drawDraft();
  highlight3D();
}

// ---------- floating result card: the mode's headline number, rolling to its new value ----------
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let hudVal = 0, hudRun = 0;
function setHud(value, label, digits = 0, fail = false) {
  const el = document.getElementById("hud-num"), from = hudVal, t0 = performance.now(), same = document.getElementById("hud-lab").dataset.q === label, dur = reduceMotion || !same ? 0 : 650;
  document.getElementById("hud-lab").dataset.q = label;
  hudVal = value; const run = ++hudRun;   // a newer call cancels this tween
  document.getElementById("hud-lab").innerHTML = label.replace("f_Rsi", "f<sub>Rsi</sub>");
  document.getElementById("hud").classList.toggle("fail", fail);
  setTimeout(() => { if (run === hudRun) el.textContent = value.toFixed(digits); }, dur + 100);   // lands even when frames are throttled
  const step = (t) => {
    if (run !== hudRun) return;
    const k = dur ? Math.min(1, (t - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
    el.textContent = (from + (value - from) * e).toFixed(digits);
    if (k < 1) requestAnimationFrame(step);
    else el.textContent = value.toFixed(digits);
  };
  requestAnimationFrame(step);
}

// ---------- carbon (same rules as metrics.mjs) ----------
function carbon() {
  const polyArea = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
  const pathLen = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  const runLen = (runs) => (runs ?? [[0, L]]).reduce((s, [a, b]) => s + b - a, 0);
  const share = (p) => { const r = p.runs ?? [[0, L]]; return r.length === 1 ? 1 : runLen(r) / (r[r.length - 1][1] - r[0][0]); };
  const slice = (p) => {
    if (p.type === "rod") {
      const n = p.axis === "w" ? (p.at ?? [0]).length : p.axis === "y" ? p.w.length : p.w.length * (p.ys ?? [0]).length;
      const len = p.axis === "x" ? Math.hypot(p.to - p.from, p.dy ?? 0) : p.to - p.from;
      return ((p.d ** 2 - (p.di ?? 0) ** 2) * Math.PI / 4) * len * n / 1e9;
    }
    if (p.axis === "x") return polyArea(p.poly) * (p.x[1] - p.x[0]) / 1e9;
    return (p.type === "sheet" ? pathLen(p.path) * p.t : polyArea(p.poly)) * runLen(p.runs) / 1e9;
  };
  const perM = (p) => {
    if (p.per === "opening") return slice(p) / ((spec.opening_mm ?? L) / 1000);
    if (p.type === "rod") {
      const n = p.axis === "w" ? (p.at ?? [0]).length : p.w.length * (p.ys ?? [0]).length, ring = (p.d ** 2 - (p.di ?? 0) ** 2) * Math.PI / 4;
      return p.axis === "w" ? ring * 1000 * n / 1e9 : ring * (p.to - p.from) * n * (1000 / L) / 1e9;
    }
    if (p.type === "revolve") return null;
    if (p.axis === "x") return polyArea(p.poly) * (p.x[1] - p.x[0]) * (1000 / L) / 1e9;
    return (p.type === "sheet" ? pathLen(p.path) * p.t : polyArea(p.poly)) * 1000 * share(p) / 1e9;
  };
  const byJ = {};
  let total = 0;
  for (const p of parts) {
    if (p.void || p.nocarbon) continue;
    const m = mats[p.mat], q = p.m3PerMetre ?? perM(p);
    if (!m || q == null) continue;
    const c = q * (p.fill ?? 1) * m.density * m.a1a3;
    byJ[p.junction] = (byJ[p.junction] ?? 0) + c;
    total += c;
  }
  const rows = Object.entries(byJ).sort((a, b) => b[1] - a[1]);
  const max = rows[0]?.[1] ?? 1;
  state.carbonTotal = total;
  document.getElementById("carbon").innerHTML = `<div class="big">${total.toFixed(0)} <small>kgCO₂e per m of opening (A1–A3)</small></div>` +
    rows.map(([j, v]) => `<div class="bar"><span>${j} ${spec.zones?.[j]?.label ?? ""}</span><i style="width:${(v / max) * 100}%"></i><b>${v.toFixed(0)}</b></div>`).join("");
}

// ---------- 3D edge ----------
let three = null;
function build3D() {
  const host = document.getElementById("three");
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(getComputedStyle(document.body).getPropertyValue("--canvas").trim());
  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 200);
  camera.position.set(-9.5, 4.2, 6.5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(-1.6, 0.9, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7d6b, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(-5, 8, 6);
  scene.add(sun);
  const S = 0.001, meshes = [];
  const mat = (p) => new THREE.MeshStandardMaterial({ color: colourOf(p), roughness: 0.85, transparent: p.mat === "igu-triple", opacity: p.mat === "igu-triple" ? 0.25 : 1, side: THREE.DoubleSide });
  const shapeOf = (pts) => new THREE.Shape(pts.map(([a, b]) => new THREE.Vector2(a * S, b * S)));
  for (const p of parts) {
    const k = kind(p);
    const geoms = [];
    if (k === "prism" || k === "sheet") {
      const pts = k === "sheet" ? sheetPoly(p) : p.poly;
      for (const [w0, w1] of p.runs ?? []) {
        const g = new THREE.ExtrudeGeometry(shapeOf(pts), { depth: (w1 - w0) * S, bevelEnabled: false });
        g.translate(0, 0, w0 * S);
        geoms.push(g);
      }
    } else if (k === "prism-x") {
      const g = new THREE.ExtrudeGeometry(shapeOf(p.poly), { depth: (p.x[1] - p.x[0]) * S, bevelEnabled: false });
      g.rotateY(-Math.PI / 2);
      g.translate(p.x[1] * S, 0, 0);
      geoms.push(g);
    } else if (k === "rod") {
      const r = (p.d / 2) * S;
      if (p.axis === "w") for (const [x, y] of p.at ?? [[p.x, p.y]]) {
        const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 16);
        g.rotateX(Math.PI / 2);
        g.translate(x * S, (y + (p.dy ?? 0) / 2) * S, ((p.from + p.to) / 2) * S);
        geoms.push(g);
      }
      else if (p.axis === "y") for (const w of p.w) {
        const g = new THREE.CylinderGeometry(r, r, (p.to - p.from) * S, 20);
        g.translate(p.x * S, ((p.from + p.to) / 2) * S, w * S);
        geoms.push(g);
      }
      else for (const w of p.w) for (const y of p.ys ?? [p.y]) {
        const len = Math.hypot(p.to - p.from, p.dy ?? 0);
        const g = new THREE.CylinderGeometry(r, r, len * S, 12);
        g.rotateZ(Math.atan2(p.dy ?? 0, p.to - p.from) - Math.PI / 2);
        g.translate(((p.from + p.to) / 2) * S, (y + (p.dy ?? 0) / 2) * S, w * S);
        geoms.push(g);
      }
    } else if (k === "revolve") {
      for (const w of p.w) {
        const g = new THREE.LatheGeometry(p.profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.01) * S, y * S)), 14);
        g.translate(p.x * S, 0, w * S);
        geoms.push(g);
      }
    }
    for (const g of geoms) {
      const m = new THREE.Mesh(g, mat(p));
      m.userData.id = p.id;
      scene.add(m);
      meshes.push(m);
    }
  }
  const ray = new THREE.Raycaster();
  renderer.domElement.addEventListener("click", (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
    const hit = ray.intersectObjects(meshes.filter((m) => m.visible))[0];
    if (hit) select(hit.object.userData.id);
  });
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    renderer.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();
  renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });
  three = { meshes };
}
function highlight3D() {
  document.getElementById("axo")?.contentWindow?.postMessage({ type: "livingedge:select", id: state.selected }, location.origin);
  if (!three) return;
  const dim = state.layers.size > 0;
  for (const m of three.meshes) {
    const p = byId.get(m.userData.id);
    const on = !dim || state.layers.has(p.role);
    m.visible = !p.void && (on || !dim || p.role === "ground" || p.role === "concrete");
    m.material.color.set(m.userData.id === state.selected ? "#ff7a00" : colourOf(p));
    if (p.mat !== "igu-triple") { m.material.transparent = dim && !on; m.material.opacity = dim && !on ? 0.12 : 1; }
  }
}

// ---------- controls ----------
const wInput = document.getElementById("w"), wOut = document.getElementById("wout");
wInput.min = Math.min(...parts.flatMap((p) => (p.runs ?? []).map((r) => r[0])).filter(Number.isFinite), 0);
wInput.max = L;
wInput.value = state.w;
const setW = (w) => { if (+w !== state.w && state.selected != null) { state.selected = null; DRAFT.sel = null; const h = new URLSearchParams(location.hash.slice(1)); h.delete("part"); history.replaceState(null, "", "#" + h.toString()); } state.w = +w; wInput.value = w; wOut.textContent = `w = ${(+w).toFixed(0)} mm`; wInput.setAttribute("aria-valuetext", `${(+w).toFixed(0)} mm${{ 900: ", at the opening", "-450": ", at the water corner", "-700": ", at the jamb wall" }[+w] ?? ""}`);
  document.querySelectorAll("#cuts button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.w === +w));
  if (state.view === "draft" || state.view === "section") setTimeout(keySchedule0, 0); deepLink?.({ w: +w }); if (state.view === "draft") { DRAFT.w = state.w; drawDraft(); } else drawSection(); };
wInput.addEventListener("input", (e) => setW(e.target.value));
for (const [label, w] of [["Opening", 900], ["Water corner", -450], ["Jamb wall", -700]]) {
  const b = document.createElement("button");
  b.textContent = label; b.dataset.w = w; b.setAttribute("aria-pressed", "false");
  b.style.left = `${((w - wInput.min) / (wInput.max - wInput.min)) * 100}%`;
  if (w === -700) b.className = "l"; else if (w === -450) b.className = "r";   // the two close cuts label away from each other
  b.onclick = () => setW(w);
  document.getElementById("cuts").appendChild(b);
}
for (const v of spec.views ?? []) {
  const b = document.createElement("button");
  const t = v.id.replace(/^[A-Z]-/, "").replace(/-/g, " "); b.textContent = t[0].toUpperCase() + t.slice(1);
  b.setAttribute("aria-pressed", v.id === "S-section" ? "true" : "false");
  b.onclick = () => { document.querySelectorAll("#views button").forEach((o) => o.setAttribute("aria-pressed", o === b)); if (state.view === "draft") { DRAFT.win = { x: v.x, y: v.y }; drawDraft(); keySchedule0(); } else { showView("section"); fitView(v); } };
  document.getElementById("views").appendChild(b);
}
for (const role of CONTROL) {
  const l = document.createElement("label");
  const declared = parts.some((p) => p.role === role);
  if (declared) state.layers.add(role); else l.className = "off";
  l.innerHTML = `<input type="checkbox" checked><span class="sw" style="background:${ROLE[role]}"></span><span>${role[0].toUpperCase() + role.slice(1)}</span><small>${{ water: "Sheds and drains rain", air: "Stops air leaking through", thermal: "Insulation, continuous round the edge", vapour: "Slows vapour diffusion from inside" }[role]}</small>`;
  l.querySelector("input").onchange = (e) => { e.target.checked ? state.layers.add(role) : state.layers.delete(role); if (state.view === "section" || state.view === "draft") drawDraft(); else drawSection(); highlight3D(); };
  if (!declared) { const i = l.querySelector("input"); i.checked = false; i.disabled = true; l.querySelector("small").textContent = "No part in the model is declared as the vapour control yet (open item)"; }
  document.getElementById("layers").appendChild(l);
}
document.getElementById("finish").onchange = (e) => { state.finish = e.target.checked; drawSection(); highlight3D(); };
function showView(v) {
  state.view = v;
  document.querySelectorAll("[data-tab]").forEach((b) => { b.setAttribute("aria-selected", b.dataset.tab === v); b.tabIndex = b.dataset.tab === v ? 0 : -1; });
  svg.hidden = v === "3d" || v === "draft" || v === "section";
  document.getElementById("draft").hidden = v !== "draft" && v !== "section";
  DRAFT.mode = v;
  document.getElementById("three").hidden = v !== "3d";
  document.querySelectorAll(".for-section").forEach((el) => (el.hidden = v === "thermal" || v === "3d"));
  document.getElementById("three-ui").hidden = v !== "3d";
  for (const id of ["print", "svgout"]) document.getElementById(id).hidden = v === "3d";
  document.getElementById("thermal-ui").hidden = v !== "thermal";
  // 3D: the landing's rendered section-box axo (same engine, same drawing standard), embedded with its own controls
  if (v === "3d" && !document.getElementById("axo")) document.getElementById("three").innerHTML = '<iframe id="axo" src="landing.html?embed=hero" title="Rendered section-box axo of the threshold to garden" style="border:0;width:100%;height:100%;display:block"></iframe>';
  document.querySelector(".stage").classList.toggle("draft-on", v === "draft" || v === "section");
  document.querySelector(".stage").classList.toggle("thermal-on", v === "thermal");
  document.querySelector(".stage").classList.toggle("three-on", v === "3d");
  document.querySelectorAll(".for-layers").forEach((el) => (el.hidden = v !== "section"));
  deepLink?.({ tab: v });
  if (v === "thermal" && th.res) setHud(th.res.fRsi, th.res.fRsi < 0.7 ? "lowest interior f_Rsi \u00b7 below 0.70" : "lowest interior f_Rsi \u00b7 meets 0.70", 2, th.res.fRsi < 0.7);
  else if (v !== "thermal") setHud(state.carbonTotal ?? 0, "kgCO₂e per m of opening, A1 to A3");
  if (v === "draft" || v === "section") { DRAFT.w = state.w; drawDraft(); }
  keySchedule0();
  if (v === "thermal") drawThermal(); else document.getElementById("legend").hidden = true;
  highlight3D();
}
document.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => showView(b.dataset.tab)));
addEventListener("message", (e) => {
  const frame = document.getElementById("axo");
  if (e.origin !== location.origin || e.source !== frame?.contentWindow) return;
  if (e.data?.type === "livingedge:ready") highlight3D();
  if (e.data?.type === "livingedge:picked" && byId.has(e.data.id)) select(e.data.id);
});
function keySchedule0() { if (state.selected == null) keySchedule(); }
document.querySelector(".tabs").addEventListener("keydown", (e) => {
  const tabs = [...document.querySelectorAll("[data-tab]")], i = tabs.indexOf(document.activeElement);
  if (i < 0 || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
  const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
  n.focus(); showView(n.dataset.tab); e.preventDefault();
});
document.getElementById("share").onclick = (e) => { navigator.clipboard?.writeText(location.href); e.currentTarget.textContent = "Copied"; setTimeout(() => (document.getElementById("share").textContent = "Link"), 1400); };
document.getElementById("print").onclick = () => { if (state.view !== "draft" && state.view !== "section") showView("draft"); setTimeout(() => print(), 50); };
document.getElementById("svgout").onclick = () => {
  if (state.view !== "draft" && state.view !== "section") showView("draft");
  const el = document.querySelector("#draft svg"); if (!el) return;
  const blob = new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(el)], { type: "image/svg+xml" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `living-edge-detail02-${state.view === "section" ? "layers" : "section"}-w${state.w}.svg` });
  a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};
svg.addEventListener("click", () => { keySchedule(); if (state.view === "section") drawSection(); });

var deepLink = (kv) => { const h = new URLSearchParams(location.hash.slice(1)); for (const [k, v] of Object.entries(kv)) h.set(k, v); history.replaceState(null, "", "#" + h.toString()); };
setW(state.w);
fitView(spec.views?.find((v) => v.id === "S-section") ?? { x: [-8000, 2500], y: [-1700, 3800] });
carbon();
document.getElementById("partcount").textContent = `${parts.length} parts`;
setHud(state.carbonTotal, "kgCO₂e per m of opening, A1 to A3");
setTimeout(() => {   // after every module part has run (the thermal case list is filled later in the bundle)
  const h = HASH0;
  if (h.get("w") && Number.isFinite(+h.get("w"))) setW(+h.get("w"));
  const tab = h.get("tab");
  if (["draft", "section", "3d", "thermal"].includes(tab)) showView(tab);
  if (h.get("bc")) { const b = document.getElementById("th-bc"); if ([...b.options].some((o) => o.value === h.get("bc"))) b.value = h.get("bc"); }
  if (h.get("part") && byId.has(h.get("part"))) setTimeout(() => select(h.get("part")), 50);
  if (tab === "thermal" && h.get("case")) { const sel = document.getElementById("th-case"); if ([...sel.options].some((o) => o.value === h.get("case"))) { sel.value = h.get("case"); sel.dispatchEvent(new Event("change")); } document.getElementById("th-run").click(); }
  if (tab !== "section") document.querySelectorAll(".for-layers").forEach((el) => (el.hidden = true));
}, 0);
document.getElementById("theme").onclick = (e) => {
  const root = document.documentElement;
  const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "light" : "dark";
  e.currentTarget.textContent = dark ? "Dark" : "Light";
  if (state.view === "section") drawSection();
};
