// Thermal screening core (THERM-style), shared by the viewer (thermal.js, inlined) and the landing build (node).
// 2D steady conduction on a square grid over a crop of the section at plane c.w. Crop edges adiabatic (as THERM cut
// lines); exterior / interior air through surface film resistances; enclosed air as equivalent cavities.
// Not a certified THERM run: the same geometry should be exported to THERM for the final check.
//   order: parts in draw order; mats: material table (k); sectionShapes(p, w): the section of a part at w
//   c: { w, x: [x0, x1], y: [y0, y1] } in mm; bc: { Te, Ti, Rse, Rsi }; dx: cell size in mm
export function solveCase({ order, mats, sectionShapes, c, bc, dx }) {
  const kOf = (p) => {
    if (p.kEq) return p.kEq;
    const k = mats[p.mat]?.k;
    if (!(k > 0)) return NaN;
    return p.fill && p.fill < 1 ? k * p.fill + 0.03 * (1 - p.fill) : k;
  };
  const pip = (poly, x, y) => {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  const nx = Math.round((c.x[1] - c.x[0]) / dx), ny = Math.round((c.y[1] - c.y[0]) / dx), N = nx * ny;
  const K = new Float64Array(N).fill(NaN), owner = new Int32Array(N).fill(-1);
  const cx = (i) => c.x[0] + (i + 0.5) * dx, cy = (j) => c.y[0] + (j + 0.5) * dx;   // j = 0 at the bottom
  const idx = (i, j) => j * nx + i;
  const missing = new Set();
  order.forEach((p, pi) => {
    const air = p.void || p.role === "planting" || p.role === "furniture";
    const k = air ? NaN : kOf(p);
    if (!air && !(k > 0)) { if (p.type !== "virtual") missing.add(p.mat || p.id); return; }
    for (const s of sectionShapes(p, c.w)) {
      if (s.circle) {
        const [x0, y0, r, ri] = s.circle;
        for (let j = Math.max(0, Math.floor((y0 - r - c.y[0]) / dx)); j <= Math.min(ny - 1, Math.ceil((y0 + r - c.y[0]) / dx)); j++)
          for (let i = Math.max(0, Math.floor((x0 - r - c.x[0]) / dx)); i <= Math.min(nx - 1, Math.ceil((x0 + r - c.x[0]) / dx)); i++) {
            const d = Math.hypot(cx(i) - x0, cy(j) - y0);
            if (d <= r) { K[idx(i, j)] = d < ri ? NaN : k; owner[idx(i, j)] = d < ri ? -1 : pi; }
          }
        continue;
      }
      if (p.type === "sheet" && p.t < 1.5 * dx && !air) {
        // Thin sheet: keep its in-plane conductance (k·t) by blending it into the cells along its centreline.
        for (let s2 = 0; s2 < p.path.length - 1; s2++) {
          const a = p.path[s2], b = p.path[s2 + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(len / (dx / 3));
          for (let t = 0; t <= n; t++) {
            const x = a[0] + ((b[0] - a[0]) * t) / n, y = a[1] + ((b[1] - a[1]) * t) / n;
            const i = Math.floor((x - c.x[0]) / dx), j = Math.floor((y - c.y[0]) / dx);
            if (i < 0 || j < 0 || i >= nx || j >= ny) continue;
            const q = idx(i, j);
            if (owner[q] === pi) continue;
            const bg = Number.isNaN(K[q]) ? 0.026 : K[q];
            K[q] = (k * p.t + bg * (dx - p.t)) / dx;
            owner[q] = pi;
          }
        }
        continue;
      }
      const poly = s.poly, xs = poly.map((v) => v[0]), ys = poly.map((v) => v[1]);
      for (let j = Math.max(0, Math.floor((Math.min(...ys) - c.y[0]) / dx)); j <= Math.min(ny - 1, Math.ceil((Math.max(...ys) - c.y[0]) / dx)); j++)
        for (let i = Math.max(0, Math.floor((Math.min(...xs) - c.x[0]) / dx)); i <= Math.min(nx - 1, Math.ceil((Math.max(...xs) - c.x[0]) / dx)); i++)
          if (pip(poly, cx(i), cy(j))) { K[idx(i, j)] = k; owner[idx(i, j)] = air ? -1 : pi; }
    }
  });
  // Air regions: exterior (touches the left edge, or the top / bottom edge at x < 0), interior (right edge), else cavity.
  const region = new Int32Array(N);                   // 0 solid, 1 exterior air, 2 interior air, 3 cavity
  const comp = new Int32Array(N).fill(-1);
  const cavK = [];
  for (let s = 0, nComp = 0; s < N; s++) {
    if (!Number.isNaN(K[s]) || comp[s] >= 0) continue;
    const stack = [s], cells = [], edgeX = [];
    comp[s] = nComp;
    let left = false, right = false, minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity;
    while (stack.length) {
      const q = stack.pop(), i = q % nx, j = (q / nx) | 0;
      cells.push(q);
      if (i === 0) left = true;
      if (i === nx - 1) right = true;
      if (j === 0 || j === ny - 1) edgeX.push(cx(i));
      minY = Math.min(minY, cy(j)); maxY = Math.max(maxY, cy(j)); minX = Math.min(minX, cx(i)); maxX = Math.max(maxX, cx(i));
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const a = i + di, b = j + dj;
        if (a < 0 || b < 0 || a >= nx || b >= ny) continue;
        const r = idx(a, b);
        if (Number.isNaN(K[r]) && comp[r] < 0) { comp[r] = nComp; stack.push(r); }
      }
    }
    const mean = edgeX.length ? edgeX.reduce((u, v) => u + v, 0) / edgeX.length : 0;
    // narrow gaps cut by the crop (IGU cavities running off the top) stay cavities
    const kind = left ? 1 : right ? 2 : maxX - minX < 40 ? 3 : edgeX.length ? (mean < 0 ? 1 : 2) : 3;
    // Enclosed cavities: tall narrow gaps between lites = argon gap (Ug ≈ 0.55 → k_eq ≈ 0.017); others ≈ 0.04.
    const kc = maxX - minX < 40 && maxY - minY > 150 ? 0.0173 : 0.04;
    for (const q of cells) { region[q] = kind; if (kind === 3) K[q] = kc; }
    if (kind === 3) cavK.push(kc);
    nComp++;
  }
  // Unknowns: solid + cavity cells; conductances between neighbours, film conductances to the air.
  const id = new Int32Array(N).fill(-1);
  let M = 0;
  for (let q = 0; q < N; q++) if (region[q] === 0 || region[q] === 3) id[q] = M++;
  const diag = new Float64Array(M), b = new Float64Array(M), ptr = new Int32Array(M + 1);
  const nb = [], ng = [], faces = [];
  for (let q = 0, m = 0; q < N; q++) {
    if (id[q] < 0) continue;
    const i = q % nx, j = (q / nx) | 0, k = K[q];
    ptr[m] = nb.length;
    for (const [di, dj, side] of [[1, 0, "r"], [-1, 0, "l"], [0, 1, "t"], [0, -1, "b"]]) {
      const a = i + di, bj = j + dj;
      if (a < 0 || bj < 0 || a >= nx || bj >= ny) continue;          // adiabatic cut edge
      const r = idx(a, bj);
      if (id[r] >= 0) {
        const G = 1 / (1 / (2 * k) + 1 / (2 * K[r]));
        nb.push(id[r]); ng.push(G); diag[m] += G;
      } else {
        const ext = region[r] === 1, Rs = ext ? bc.Rse : bc.Rsi;
        const G = 1 / (1 / (2 * k) + Rs / (dx / 1000));
        diag[m] += G; b[m] += G * (ext ? bc.Te : bc.Ti);
        faces.push({ q, side, G, ext });
      }
    }
    m++;
    ptr[m] = nb.length;
  }
  // Jacobi-preconditioned conjugate gradient.
  const T = new Float64Array(M).fill((bc.Te + bc.Ti) / 2);
  const Ax = (x, out) => { for (let m = 0; m < M; m++) { let s = diag[m] * x[m]; for (let e = ptr[m]; e < ptr[m + 1]; e++) s -= ng[e] * x[nb[e]]; out[m] = s; } };
  const r = new Float64Array(M), z = new Float64Array(M), p = new Float64Array(M), Ap = new Float64Array(M);
  Ax(T, Ap);
  let rz = 0, bn = 0;
  for (let m = 0; m < M; m++) { r[m] = b[m] - Ap[m]; z[m] = r[m] / diag[m]; p[m] = z[m]; rz += r[m] * z[m]; bn += b[m] * b[m]; }
  bn = Math.sqrt(bn);
  let it = 0;
  for (; it < 20000; it++) {
    Ax(p, Ap);
    let pAp = 0;
    for (let m = 0; m < M; m++) pAp += p[m] * Ap[m];
    const alpha = rz / pAp;
    let rn = 0;
    for (let m = 0; m < M; m++) { T[m] += alpha * p[m]; r[m] -= alpha * Ap[m]; rn += r[m] * r[m]; }
    if (Math.sqrt(rn) / bn < 1e-9) break;
    let rz2 = 0;
    for (let m = 0; m < M; m++) { z[m] = r[m] / diag[m]; rz2 += r[m] * z[m]; }
    const beta = rz2 / rz;
    rz = rz2;
    for (let m = 0; m < M; m++) p[m] = z[m] + beta * p[m];
  }
  const Tc = new Float64Array(N).fill(NaN);
  for (let q = 0; q < N; q++) if (id[q] >= 0) Tc[q] = T[id[q]];
  // Surface results: heat flow, interior surface temperatures, U-factor tags.
  let Qi = 0, Qe = 0, tsMin = { T: Infinity };
  const groups = {};
  const TAG = { D: "Door frame + glass", F: "Floor / slab edge", H: "Head / floor band", Z: "Jamb wall", U: "Upper floor", T: "Threshold" };
  for (const f of faces) {
    const t = Tc[f.q], q = f.G * ((f.ext ? bc.Te : bc.Ti) - t);   // W/m into the cell
    if (f.ext) { Qe -= q; continue; }
    Qi += q;
    const ts = bc.Ti - q * (bc.Rsi / (dx / 1000));
    const i = f.q % nx, j = (f.q / nx) | 0;
    const horiz = f.side === "t" || f.side === "b";
    const fx = cx(i) + (f.side === "r" ? dx / 2 : f.side === "l" ? -dx / 2 : 0), fy = cy(j) + (f.side === "t" ? dx / 2 : f.side === "b" ? -dx / 2 : 0);
    const part = owner[f.q] >= 0 ? order[owner[f.q]] : null;
    if (ts < tsMin.T) tsMin = { T: ts, x: fx, y: fy, part: part?.id ?? "cavity" };
    const tag = part ? TAG[part.junction] ?? "Other" : "Cavity";
    const g = (groups[tag] ??= { Q: 0, xs: [], ys: [] });
    g.Q += q;
    (horiz ? g.xs : g.ys).push(horiz ? fx : fy);
  }
  let Tmin = Infinity, Tmax = -Infinity;
  for (const v of Tc) if (!Number.isNaN(v)) { Tmin = Math.min(Tmin, v); Tmax = Math.max(Tmax, v); }
  return { c, bc, dx, nx, ny, K, Tc, it, M, Qi, Qe, tsMin, groups, Tmin, Tmax, fRsi: (tsMin.T - bc.Te) / (bc.Ti - bc.Te), missing: [...missing], cavK };
}
