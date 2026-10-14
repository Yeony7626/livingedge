// Section geometry shared by the build scripts (same rules as viewer.js / build.py): the cross-section of every part
// at plane w, as polygons [[x, y], ...] in model mm (x exterior negative, y up) or circles for pipes along the wall.
export function offsetPath(path, d) {
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
const inRuns = (runs, w) => (runs ?? [[-Infinity, Infinity]]).some(([a, b]) => w >= a && w <= b);
const chord = (r, dw) => (Math.abs(dw) < r ? Math.sqrt(r * r - dw * dw) : 0);

export function sectionShapes(p, w) {
  const k = p.void ? "void" : p.type ?? (p.axis === "x" ? "prism-x" : "prism");
  if (k === "virtual") return [];
  if (k === "prism" || k === "void") return inRuns(p.runs, w) ? [{ poly: p.poly }] : [];
  if (k === "sheet") return inRuns(p.runs, w) ? [{ poly: sheetPoly(p) }] : [];
  if (k === "prism-x") {
    const ys = [];
    p.poly.forEach(([w0, y0], i) => {
      const [w1, y1] = p.poly[(i + 1) % p.poly.length];
      if (w >= Math.min(w0, w1) && w <= Math.max(w0, w1) && w0 !== w1) ys.push(y0 + ((w - w0) / (w1 - w0)) * (y1 - y0));
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
    const out = [];
    for (const wi of p.w) {
      const c = chord(r, w - wi);
      if (!c) continue;
      for (const y of p.ys ?? [p.y]) out.push({ poly: [[p.from, y - c], [p.to, y - c + (p.dy ?? 0)], [p.to, y + c + (p.dy ?? 0)], [p.from, y + c]] });
    }
    return out;
  }
  return [];   // revolves (plants, people) are drawn as silhouettes by the page, not as cuts
}

// Draw order: cut targets before the parts that cut them.
export function drawOrder(parts) {
  const by = new Map(parts.map((p) => [p.id, p])), after = new Map(parts.map((p) => [p.id, []]));
  for (const p of parts) for (const c of p.cuts ?? []) if (typeof c === "string" && after.has(c)) after.get(c).push(p.id);
  const seen = new Set(), out = [];
  const visit = (id) => { if (seen.has(id)) return; seen.add(id); after.get(id).forEach(visit); out.push(by.get(id)); };
  parts.forEach((p) => visit(p.id));
  return out;
}

export const hatchOf = (p) => {
  const m = p.mat ?? "";
  if (p.nocarbon || p.kEq) return "maker";
  return /concrete|parge|polymer/.test(m) ? "conc" : /eps|pu-struct|cork|comfortboard|cellular|woodfibre/.test(m) ? "rigid" : /comfortbatt|cellulose/.test(m) ? "batt"
    : /glulam|softwood|plywood|cedar/.test(m) ? "timber" : /aggregate/.test(m) ? "gravel" : /reclaimed-stone|paver/.test(m) ? "stone" : /^soil/.test(m) ? "earth"
    : /igu|glass/.test(m) ? "glass" : /gypsum/.test(m) ? "gyp" : /stainless|aluminium|steel|membrane|epdm|ldpe|hdpe|butyl|geotextile/.test(m) ? "ink" : "plain";
};
export const thinness = (poly) => {
  let a = 0, per = 0;
  poly.forEach(([x, y], i) => { const [x2, y2] = poly[(i + 1) % poly.length]; a += x * y2 - x2 * y; per += Math.hypot(x2 - x, y2 - y); });
  return (2 * Math.abs(a / 2)) / Math.max(per, 1e-9);
};
