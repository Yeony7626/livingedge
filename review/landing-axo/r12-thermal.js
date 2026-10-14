// =====================================================================================================================
// Thermal (screening, THERM-style results). Inlined after viewer.js in the same module, so it shares its helpers.
// 2D steady conduction on a square grid over a crop of the section at plane w. Crop edges adiabatic (as THERM cut
// lines); exterior / interior air through surface film resistances; enclosed air as equivalent cavities.
// Not a certified THERM run: the same geometry should be exported to THERM for the final check.
// =====================================================================================================================
const CASES = {
  threshold: { label: "Threshold (opening, w 900)", w: 900, x: [-1200, 1800], y: [-1300, 450] },
  head: { label: "Floor-band head (w 900)", w: 900, x: [-850, 1000], y: [2450, 3700] },
  jamb: { label: "Jamb wall base (w −700)", w: -700, x: [-1200, 1800], y: [-1300, 900] },
};
const BCS = {
  iso: { label: "ISO 13788 condensation, −7 / 20 °C, Rsi 0.25", Te: -7, Ti: 20, Rse: 0.04, Rsi: 0.25 },
  nfrc: { label: "NFRC 100 U-factor, −18 / 21 °C, hi 7.7", Te: -18, Ti: 21, Rse: 1 / 26, Rsi: 1 / 7.7 },
};
const th = { case: "threshold", bc: "iso", dx: 5, mode: "flood", res: null };

function kOf(p) {
  if (p.kEq) return p.kEq;
  const k = mats[p.mat]?.k;
  if (!(k > 0)) return NaN;
  return p.fill && p.fill < 1 ? k * p.fill + 0.03 * (1 - p.fill) : k;
}
function pip(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function solveThermal() {
  const c = CASES[th.case], bc = BCS[th.bc], dx = th.dx;
  const nx = Math.round((c.x[1] - c.x[0]) / dx), ny = Math.round((c.y[1] - c.y[0]) / dx), N = nx * ny;
  const K = new Float64Array(N).fill(NaN), owner = new Int32Array(N).fill(-1);
  const cx = (i) => c.x[0] + (i + 0.5) * dx, cy = (j) => c.y[0] + (j + 0.5) * dx;   // j = 0 at the bottom
  const idx = (i, j) => j * nx + i;
  const missing = new Set();
  ORDER.forEach((p, pi) => {
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
    const part = owner[f.q] >= 0 ? ORDER[owner[f.q]] : null;
    if (ts < tsMin.T) tsMin = { T: ts, x: fx, y: fy, part: part?.id ?? "cavity" };
    const tag = part ? TAG[part.junction] ?? "Other" : "Cavity";
    const g = (groups[tag] ??= { Q: 0, xs: [], ys: [] });
    g.Q += q;
    (horiz ? g.xs : g.ys).push(horiz ? fx : fy);
  }
  let Tmin = Infinity, Tmax = -Infinity;
  for (const v of Tc) if (!Number.isNaN(v)) { Tmin = Math.min(Tmin, v); Tmax = Math.max(Tmax, v); }
  th.res = { c, bc, dx, nx, ny, K, Tc, it, M, Qi, Qe, tsMin, groups, Tmin, Tmax, fRsi: (tsMin.T - bc.Te) / (bc.Ti - bc.Te), missing: [...missing], cavK };
}

// Colour map (THERM-like rainbow) and drawing.
function rainbow(u) {
  u = Math.min(1, Math.max(0, u));
  const stops = [[0, [48, 18, 140]], [0.2, [30, 110, 230]], [0.4, [40, 200, 210]], [0.55, [80, 220, 80]], [0.7, [240, 230, 40]], [0.85, [250, 140, 30]], [1, [200, 30, 30]]];
  for (let s = 1; s < stops.length; s++) if (u <= stops[s][0]) {
    const [u0, a] = stops[s - 1], [u1, b] = stops[s], f = (u - u0) / (u1 - u0);
    return a.map((v, i) => Math.round(v + (b[i] - v) * f));
  }
  return stops.at(-1)[1];
}
function fluxAt(R, i, j) {
  const { nx, ny, Tc, K, dx } = R, T0 = Tc[j * nx + i];
  if (Number.isNaN(T0)) return null;
  const g = (a, b) => (a >= 0 && b >= 0 && a < nx && b < ny && !Number.isNaN(Tc[b * nx + a]) ? Tc[b * nx + a] : null);
  const tr = g(i + 1, j), tl = g(i - 1, j), tt = g(i, j + 1), tb = g(i, j - 1);
  const gx = tr != null && tl != null ? (tr - tl) / (2 * dx) : tr != null ? (tr - T0) / dx : tl != null ? (T0 - tl) / dx : 0;
  const gy = tt != null && tb != null ? (tt - tb) / (2 * dx) : tt != null ? (tt - T0) / dx : tb != null ? (T0 - tb) / dx : 0;
  return [-K[j * nx + i] * gx * 1000, -K[j * nx + i] * gy * 1000];   // W/m²
}
function svgPath(d, stroke, opacity, width = 0.8) {
  const el = document.createElementNS(NS, "path");
  el.setAttribute("d", d); el.setAttribute("fill", "none"); el.setAttribute("stroke", stroke);
  el.setAttribute("stroke-opacity", opacity); el.setAttribute("stroke-width", width); el.setAttribute("vector-effect", "non-scaling-stroke");
  svg.appendChild(el);
}
function drawThermal() {
  svg.replaceChildren();
  const R = th.res;
  thermalPanel();
  if (!R) return;
  const { c, nx, ny, Tc, bc } = R;
  const cv = document.createElement("canvas");
  cv.width = nx; cv.height = ny;
  const g = cv.getContext("2d"), img = g.createImageData(nx, ny);
  const fluxMode = th.mode === "fluxflood", plain = th.mode === "lines" || th.mode === "vectors";
  let fmax = 0;
  const flux = fluxMode ? new Float64Array(nx * ny) : null;
  if (flux) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const f = fluxAt(R, i, j), m = f ? Math.hypot(f[0], f[1]) : NaN;
    flux[j * nx + i] = m;
    if (m > fmax) fmax = m;
  }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const q = j * nx + i, o = ((ny - 1 - j) * nx + i) * 4, t = Tc[q];
    if (Number.isNaN(t)) continue;
    const u = fluxMode ? Math.log10(1 + flux[q]) / Math.log10(1 + fmax) : (t - bc.Te) / (bc.Ti - bc.Te);
    img.data.set([...(plain ? [236, 234, 228] : rainbow(u)), 255], o);
  }
  g.putImageData(img, 0, 0);
  const im = document.createElementNS(NS, "image");
  im.setAttribute("href", cv.toDataURL());
  im.setAttribute("x", c.x[0]); im.setAttribute("y", -c.y[1]); im.setAttribute("width", c.x[1] - c.x[0]); im.setAttribute("height", c.y[1] - c.y[0]);
  im.setAttribute("preserveAspectRatio", "none");
  im.style.imageRendering = "pixelated";
  svg.appendChild(im);
  // Part outlines (click to inspect).
  for (const p of ORDER) {
    if (p.void || p.role === "planting" || p.role === "furniture") continue;
    for (const s of sectionShapes(p, c.w)) {
      if (!s.poly) continue;
      const el = document.createElementNS(NS, "polygon");
      el.setAttribute("points", s.poly.map(([x, y]) => `${x},${-y}`).join(" "));
      el.setAttribute("fill", "transparent"); el.setAttribute("stroke", "#000"); el.setAttribute("stroke-opacity", 0.35);
      el.setAttribute("stroke-width", 0.6); el.setAttribute("vector-effect", "non-scaling-stroke");
      el.addEventListener("click", (e) => { e.stopPropagation(); select(p.id); });
      svg.appendChild(el);
    }
  }
  const X = (i) => c.x[0] + (i + 0.5) * R.dx, Y = (j) => -(c.y[0] + (j + 0.5) * R.dx);
  // Isotherms every 2 °C (marching squares on the cell centres).
  if (th.mode === "flood" || th.mode === "lines") {
    let d = "";
    const v = (i, j) => Tc[j * nx + i];
    for (let level = Math.ceil(bc.Te / 2) * 2; level <= bc.Ti; level += 2)
      for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
        const a = v(i, j), b2 = v(i + 1, j), cc = v(i + 1, j + 1), dd = v(i, j + 1);
        if (Number.isNaN(a) || Number.isNaN(b2) || Number.isNaN(cc) || Number.isNaN(dd)) continue;
        const pts = [];
        const edge = (t0, t1, x0, y0, x1, y1) => { if ((t0 - level) * (t1 - level) < 0) { const f = (level - t0) / (t1 - t0); pts.push([x0 + (x1 - x0) * f, y0 + (y1 - y0) * f]); } };
        edge(a, b2, X(i), Y(j), X(i + 1), Y(j));
        edge(b2, cc, X(i + 1), Y(j), X(i + 1), Y(j + 1));
        edge(cc, dd, X(i + 1), Y(j + 1), X(i), Y(j + 1));
        edge(dd, a, X(i), Y(j + 1), X(i), Y(j));
        if (pts.length >= 2) d += `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}L${pts[1][0].toFixed(1)} ${pts[1][1].toFixed(1)}`;
        if (pts.length === 4) d += `M${pts[2][0].toFixed(1)} ${pts[2][1].toFixed(1)}L${pts[3][0].toFixed(1)} ${pts[3][1].toFixed(1)}`;
      }
    svgPath(d, th.mode === "lines" ? "#c0392b" : "#111", th.mode === "lines" ? 0.9 : 0.45);
  }
  // Heat-flux vectors (length on a log scale).
  if (th.mode === "vectors") {
    const step = Math.max(2, Math.round(nx / 70)), vs = [];
    let maxm = 0, d = "";
    for (let j = 0; j < ny; j += step) for (let i = 0; i < nx; i += step) {
      const f = fluxAt(R, i, j);
      if (!f) continue;
      const m = Math.hypot(f[0], f[1]);
      if (m > 1e-6) { vs.push([i, j, f, m]); maxm = Math.max(maxm, m); }
    }
    const Lmax = step * R.dx * 0.9;
    for (const [i, j, [fx, fy], m] of vs) {
      const L = (Lmax * Math.log10(1 + m)) / Math.log10(1 + maxm), ux = fx / m, uy = fy / m;
      const x0 = X(i), y0 = -Y(j), x1 = x0 + ux * L, y1 = y0 + uy * L, h = L * 0.3;
      d += `M${x0} ${-y0}L${x1} ${-y1}M${x1} ${-y1}L${x1 - ux * h - uy * h * 0.6} ${-(y1 - uy * h + ux * h * 0.6)}M${x1} ${-y1}L${x1 - ux * h + uy * h * 0.6} ${-(y1 - uy * h - ux * h * 0.6)}`;
    }
    svgPath(d, "#1f4fbf", 0.9, 1);
  }
  // Coldest interior surface.
  const m = R.tsMin, rr = (c.x[1] - c.x[0]) / 110, mark = document.createElementNS(NS, "g");
  mark.innerHTML = `<circle cx="${m.x}" cy="${-m.y}" r="${rr}" fill="none" stroke="#fff" stroke-width="4" vector-effect="non-scaling-stroke"/>` +
    `<circle cx="${m.x}" cy="${-m.y}" r="${rr}" fill="none" stroke="#000" stroke-width="1.5" vector-effect="non-scaling-stroke"/>`;
  svg.appendChild(mark);
}
function thermalPanel() {
  const R = th.res, legend = document.getElementById("legend");
  if (!R || state.view !== "thermal") { legend.hidden = true; return; }
  const flux = th.mode === "fluxflood";
  const stops = Array.from({ length: 11 }, (_, i) => `rgb(${rainbow(i / 10).join(",")}) ${i * 10}%`).join(",");
  legend.hidden = th.mode === "lines" || th.mode === "vectors";
  legend.innerHTML = `<div class="lg" style="background:linear-gradient(to right,${stops})"></div>` +
    `<div class="lgl"><span>${flux ? "low" : R.bc.Te + " °C"}</span><span>${flux ? "heat flux |q| (log)" : "temperature"}</span><span>${flux ? "high" : R.bc.Ti + " °C"}</span></div>`;
  const dT = R.bc.Ti - R.bc.Te;
  const span = (a) => (a.length ? (Math.max(...a) - Math.min(...a) + R.dx) / 1000 : 0);
  const rows = Object.entries(R.groups).sort((a, b) => b[1].Q - a[1].Q).map(([tag, g]) => {
    const proj = Math.max(span(g.ys), span(g.xs));
    return `<tr><td>${tag}</td><td>${(proj * 1000).toFixed(0)}</td><td>${g.Q.toFixed(2)}</td><td>${proj ? (g.Q / dT / proj).toFixed(2) : "–"}</td></tr>`;
  }).join("");
  const ok = R.fRsi >= 0.7;
  document.getElementById("thermal-out").innerHTML = `
    <div class="big">${R.fRsi.toFixed(2)} <small>f<sub>Rsi</sub> at the coldest interior surface: ${R.tsMin.T.toFixed(1)} °C on <code>${R.tsMin.part}</code> (circled). ${ok ? "Meets" : "<b>Below</b>"} the PHI 0.70 limit.</small></div>
    <table class="t"><tr><th>Boundary conditions</th><td colspan="3">${R.bc.label}, Rse ${R.bc.Rse.toFixed(3)}</td></tr>
      <tr><th>Heat flow, interior</th><td colspan="3">${R.Qi.toFixed(2)} W/m, L<sub>2D</sub> ${(R.Qi / dT).toFixed(3)} W/(m·K)</td></tr>
      <tr><th>Heat flow, exterior</th><td colspan="3">${R.Qe.toFixed(2)} W/m (balance ${((Math.abs(R.Qi - R.Qe) / Math.max(R.Qi, 1e-9)) * 100).toFixed(2)} %)</td></tr>
      <tr><th>T min / max</th><td colspan="3">${R.Tmin.toFixed(1)} / ${R.Tmax.toFixed(1)} °C</td></tr></table>
    <table class="t"><tr><th>U-factor tag</th><th>proj. mm</th><th>Q W/m</th><th>U W/m²K</th></tr>${rows}</table>
    <p class="note">Grid ${R.dx} mm (${R.nx} × ${R.ny}, ${R.M} unknowns, ${R.it} CG iterations). Crop edges adiabatic. ${R.cavK.length} enclosed cavities
    (argon gaps 0.017, others 0.04 W/m·K). Maker parts use screening equivalents (kEq).${R.missing.length ? " No conductivity: " + R.missing.join(", ") + "." : ""}
    U-factor tags are interior heat flow ÷ ΔT ÷ projected length of that tag's interior surface (approximate). Screening only: export to THERM for the certified result.</p>`;
}
document.getElementById("th-run").onclick = () => {
  th.case = document.getElementById("th-case").value;
  th.bc = document.getElementById("th-bc").value;
  th.dx = +document.getElementById("th-dx").value;
  document.getElementById("thermal-out").innerHTML = '<p class="hint">Solving…</p>';
  setTimeout(() => { solveThermal(); fitView(CASES[th.case]); drawThermal(); setHud(th.res.fRsi, "lowest interior f_Rsi, limit 0.70", 2, th.res.fRsi < 0.7); }, 30);
};
for (const [k, v] of Object.entries(CASES)) document.getElementById("th-case").add(new Option(v.label, k));
for (const [k, v] of Object.entries(BCS)) document.getElementById("th-bc").add(new Option(v.label, k));
document.querySelectorAll("input[name=th-mode]").forEach((r) => (r.onchange = (e) => { th.mode = e.target.value; drawThermal(); }));
