// Procedural trees in two drawing styles: "line" (architect's outline tree) and "leaf" (rendered foliage).
// Deterministic: the same seed and age always give the same tree. Units: tree height = 1000.
import { createNoise2D } from "simplex-noise";
import { unionD, FillRule } from "clipper2-ts";
import { mulberry32 } from "./detail.js";

export const SPECIES = {
  broadleaf: { label: "Broad, round crown", crownBase: 0.3, lateral: 0.85, leader: 0.82, depth: 6, cluster: 0.55, width: 0.9, holes: 10 },
  layered: { label: "Layered, irregular", crownBase: 0.26, lateral: 1.05, leader: 0.8, depth: 6, cluster: 0.5, width: 1.0, holes: 16 },
  spreading: { label: "Open, spreading", crownBase: 0.34, lateral: 1.2, leader: 0.7, depth: 5, cluster: 0.45, width: 1.15, holes: 18 },
  columnar: { label: "Tall, narrow", crownBase: 0.3, lateral: 0.45, leader: 0.86, depth: 7, cluster: 0.5, width: 0.5, holes: 6 },
};

const circle = (cx, cy, r, n = 20) => Array.from({ length: n }, (_, i) => ({ x: cx + Math.cos((i / n) * Math.PI * 2) * r, y: cy + Math.sin((i / n) * Math.PI * 2) * r }));
const ringArea = (r) => { let a = 0; for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p.x * q.y - q.x * p.y; } return a / 2; };
const clean = (rings, min) => rings.filter((r) => Math.abs(ringArea(r)) > min);

// Skeleton: a leader that keeps climbing with lateral branches off it; laterals fork. Tapered tubes merged by clipper2-ts.
function skeleton(sp, rnd, age) {
  const segs = [], nodes = [], H = 1000 * (0.4 + 0.6 * age);
  const seg = (x, y, a, len, w0, w1) => {
    const bend = (rnd() - 0.5) * 0.3, mx = x + Math.cos(a + bend) * len * 0.5, my = y + Math.sin(a + bend) * len * 0.5;
    const ex = mx + Math.cos(a - bend * 0.4) * len * 0.5, ey = my + Math.sin(a - bend * 0.4) * len * 0.5;
    segs.push({ pts: [[x, y], [mx, my], [ex, ey]], w0, w1 }); return [ex, ey];
  };
  const fork = (x, y, a, len, w, d) => {
    const [ex, ey] = seg(x, y, a, len, w, w * 0.7);
    nodes.push({ x: ex, y: ey, len, d });
    if (d <= 0 || len < H * 0.03) return;
    const n = rnd() < 0.35 ? 3 : 2;
    for (let k = 0; k < n; k++) { const sd = n === 2 ? (k ? 1 : -1) : k - 1; fork(ex, ey, a + sd * (0.35 + rnd() * 0.3) + (Math.PI / 2 - a) * 0.15, len * (0.68 + rnd() * 0.12), w * 0.66, d - 1); }
  };
  const trunkTop = H * sp.crownBase, lean = (rnd() - 0.5) * 0.08;
  let [x, y] = seg(0, 0, Math.PI / 2 + lean, trunkTop, H * 0.05, H * 0.04);
  let w = H * 0.04, a = Math.PI / 2 + lean, step = (H - trunkTop) * 0.2, d = Math.max(3, Math.round(sp.depth * (0.6 + 0.4 * age)));
  for (let i = 0; i < 6 && y < H * 0.9; i++) {
    // laterals off the leader, alternating sides, longer low in the crown
    for (const side of [-1, 1]) {
      if (rnd() < 0.15) continue;
      const la = Math.PI / 2 + side * (0.5 + sp.lateral * (0.55 - i * 0.06) + rnd() * 0.2);
      fork(x, y, la, step * sp.width * (1.35 - i * 0.12) * (0.8 + rnd() * 0.4), w * 0.62, d - 1 - Math.floor(i / 3));
    }
    a += (rnd() - 0.5) * 0.18; [x, y] = seg(x, y, a, step * sp.leader, w, w * 0.8); w *= 0.8; step *= 0.92;
    if (i >= 2) nodes.push({ x, y, len: step * 0.9, d: 1 });
  }
  nodes.push({ x, y, len: step, d: 0 });
  const polys = [];
  for (const s of segs) {
    if (s.w1 < H * 0.0075) continue;
    const [p0, p1, p2] = s.pts, dx = p2[0] - p0[0], dy = p2[1] - p0[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, ux = dx / l, uy = dy / l;
    const off = (p, ww, sg, ext = 0) => ({ x: p[0] + nx * ww * sg / 2 + ux * ext, y: p[1] + ny * ww * sg / 2 + uy * ext });
    polys.push([off(p0, s.w0, 1, -s.w0 * 0.3), off(p1, (s.w0 + s.w1) / 2, 1), off(p2, s.w1, 1, s.w1 * 0.3), off(p2, s.w1, -1, s.w1 * 0.3), off(p1, (s.w0 + s.w1) / 2, -1), off(p0, s.w0, -1, -s.w0 * 0.3)]);
    polys.push(circle(p2[0], p2[1], s.w1 * 0.55, 10));
  }
  return { segs, nodes, H, outline: clean(unionD(polys, FillRule.NonZero), (H * 0.004) ** 2) };
}

// Leaf clusters along the outer branches, larger where the branch is longer.
function clusters(sp, rnd, sk) {
  const out = [];
  for (const n of sk.nodes) {
    if (n.y < sk.H * sp.crownBase * 1.05) continue;
    if (n.d > 2 && rnd() < 0.55) continue;
    out.push({ x: n.x, y: n.y, r: Math.max(sk.H * 0.04, n.len * sp.cluster * (0.8 + rnd() * 0.5)) });
  }
  return out;
}

// A cluster drawn the way architects draw foliage: a core and a ring of small lobes, merged into one scalloped edge.
function lobes(c, rnd, noise, k = 1) {
  const parts = [circle(c.x, c.y, c.r * 0.72 * k, 22)];
  const m = Math.max(7, Math.round(16 * k + c.r / 30));
  for (let i = 0; i < m; i++) {
    const t = (i + rnd() * 0.6) / m * Math.PI * 2, lr = c.r * k * (0.16 + 0.16 * Math.abs(noise(c.x * 0.01 + i, c.y * 0.01)) + rnd() * 0.06);
    const dist = c.r * k * (0.74 + rnd() * 0.12);
    const cx = c.x + Math.cos(t) * dist, cy = c.y + Math.sin(t) * dist * 0.92;
    parts.push(Array.from({ length: 11 }, (_, v) => { const q = (v / 11) * Math.PI * 2, jag = 1 + 0.38 * noise(cx * 0.05 + v * 1.7, cy * 0.05) + (v % 2 ? -0.12 : 0.1); return { x: cx + Math.cos(q) * lr * jag, y: cy + Math.sin(q) * lr * jag }; }));
  }
  return parts;
}
const pathOf = (pts, close = true) => "M" + pts.map((p) => `${p.x.toFixed(1)} ${(-p.y).toFixed(1)}`).join(" L") + (close ? "Z" : "");

// The longest run of a ring that lies below a line: one continuous lower edge.
function lowerRun(ring, yCut) {
  const n = ring.length, below = ring.map((p) => p.y < yCut);
  let best = [], cur = [];
  for (let i = 0; i < n * 2; i++) { const j = i % n; if (below[j]) { cur.push(ring[j]); if (cur.length > best.length) best = cur.slice(); if (cur.length >= n) break; } else cur = []; }
  return best;
}

export function lineTree({ species = "broadleaf", seed = 1, age = 1, color = "#1f5c47" } = {}) {
  const sp = SPECIES[species], rnd = mulberry32(seed * 7919), noise = createNoise2D(mulberry32(seed * 31));
  const sk = skeleton(sp, rnd, age), cl = clusters(sp, rnd, sk), H = sk.H;
  const crown = clean(unionD(cl.flatMap((c) => lobes(c, rnd, noise)), FillRule.NonZero), (H * 0.01) ** 2);
  // clusters in front of the branches: filled, with only their lower edge drawn
  const front = cl.filter((c) => rnd() < (c.y > H * 0.62 ? 0.75 : 0.4) && c.r > H * 0.045).map((c) => {
    const ring = clean(unionD(lobes(c, rnd, noise, 0.9), FillRule.NonZero), 1).sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)))[0] ?? [];
    return { fill: pathOf(ring), edge: pathOf(lowerRun(ring, c.y + c.r * 0.1), false) };
  });
  const holes = [];
  for (let i = 0; i < sp.holes * age && cl.length; i++) {
    const c = cl[Math.floor(rnd() * cl.length)], hr = c.r * (0.1 + rnd() * 0.12);
    const ring = clean(unionD([circle(c.x + (rnd() - 0.5) * c.r * 0.8, c.y + (rnd() - 0.3) * c.r * 0.7, hr, 12), circle(c.x + (rnd() - 0.5) * c.r * 0.8 + hr * 0.6, c.y + hr * 0.3, hr * 0.7, 10)], FillRule.NonZero), 1)[0];
    if (ring) holes.push(pathOf(ring));
  }
  const skel = sk.outline.map((r) => pathOf(r)).join(" ");
  const t = sk.segs[0], bark = [-0.18, 0.05, 0.22].map((f) => `M${(t.pts[0][0] + f * t.w0).toFixed(1)} ${(-t.pts[0][1] - H * 0.04).toFixed(1)} q ${(rnd() * 6 - 3).toFixed(1)} ${(-H * 0.06).toFixed(1)} ${(rnd() * 4 - 2).toFixed(1)} ${(-H * (0.1 + rnd() * 0.1)).toFixed(1)}`).join(" ");
  const xs = crown.flat().map((p) => p.x).concat([0]), ys = crown.flat().map((p) => p.y).concat([H]);
  const minx = Math.min(...xs) - 10, maxx = Math.max(...xs) + 10, top = Math.max(...ys) + 10;
  const sw = (f) => (H * f).toFixed(2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minx.toFixed(0)} ${(-top).toFixed(0)} ${(maxx - minx).toFixed(0)} ${(top + 6).toFixed(0)}" fill="none" stroke="${color}" stroke-linejoin="round" stroke-linecap="round">
    <path d="${crown.map((r) => pathOf(r)).join(" ")}" fill="#fff" stroke-width="${sw(0.0062)}"/>
    ${holes.map((d) => `<path d="${d}" stroke-width="${sw(0.0024)}"/>`).join("")}
    <path d="${skel}" fill="#fff" stroke-width="${sw(0.0046)}"/>
    <path d="${bark}" stroke-width="${sw(0.0024)}"/>
    ${front.map((f) => `<path d="${f.fill}" fill="#fff" stroke="none"/><path d="${f.edge}" stroke-width="${sw(0.0042)}"/>`).join("")}
  </svg>`;
  return { svg, aspect: (maxx - minx) / (top + 6), H };
}

// Rendered foliage on a canvas: pale branches, small leaves in three greens, darker beneath, gaps where branches show.
export function leafTree(canvas, { species = "broadleaf", seed = 1, age = 1, greens = ["#55704a", "#7a9566", "#a5ba8d"], bark = "#e9e5dc" } = {}) {
  const sp = SPECIES[species], rnd = mulberry32(seed * 7919), noise = createNoise2D(mulberry32(seed * 31));
  const sk = skeleton(sp, rnd, age), cl = clusters(sp, rnd, sk);
  const xs = cl.map((c) => Math.abs(c.x) + c.r), top = Math.max(sk.H, ...cl.map((c) => c.y + c.r)) * 1.03, wid = Math.max(...xs, 1) * 1.04;
  const W = canvas.width, Hc = canvas.height, k = Math.min(W / (wid * 2), Hc / top);
  const g = canvas.getContext("2d"); g.clearRect(0, 0, W, Hc);
  const X = (x) => W / 2 + x * k, Y = (y) => Hc - y * k;
  g.lineCap = "round";
  for (const s of sk.segs) { g.strokeStyle = bark; g.lineWidth = Math.max(0.7, s.w0 * k); g.beginPath(); g.moveTo(X(s.pts[0][0]), Y(s.pts[0][1])); g.quadraticCurveTo(X(s.pts[1][0]), Y(s.pts[1][1]), X(s.pts[2][0]), Y(s.pts[2][1])); g.stroke(); }
  g.strokeStyle = "rgba(110,104,92,.35)"; g.lineWidth = 1; const t = sk.segs[0];
  for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(X(t.pts[0][0] + (i - 1) * t.w0 * 0.22), Y(t.pts[0][1] + 10)); g.lineTo(X(t.pts[2][0] + (i - 1) * t.w0 * 0.18), Y(t.pts[2][1] * 0.8)); g.stroke(); }
  const leaf = Math.max(1.6, sk.H * 0.008 * k);
  for (const c of cl.sort((a, b) => a.y - b.y)) {
    const n = Math.round((c.r * c.r) / 28);
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2, rr = c.r * Math.sqrt(rnd()) * (0.85 + 0.25 * Math.abs(noise(Math.cos(a) * 2, Math.sin(a) * 2))), x = c.x + Math.cos(a) * rr, y = c.y + Math.sin(a) * rr * 0.9;
      if (noise(x * 0.01, y * 0.01) > 0.55) continue; // gaps where the branches show through
      const under = (c.y - y) / c.r, tone = under > 0.3 ? 0 : under > -0.35 ? 1 : 2;
      g.fillStyle = greens[Math.max(0, Math.min(2, tone + (rnd() < 0.18 ? 1 : 0) - (rnd() < 0.1 ? 1 : 0)))];
      g.save(); g.translate(X(x), Y(y)); g.rotate(rnd() * Math.PI); g.beginPath(); g.ellipse(0, 0, leaf, leaf * 0.55, 0, 0, Math.PI * 2); g.fill(); g.restore();
    }
  }
  return { aspect: (wid * 2) / top };
}
