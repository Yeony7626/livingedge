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

// point in polygon (also used by draft.js)
function pip(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
// The solver itself lives in thermal-core.mjs (shared with the landing build).
function solveThermal() {
  th.res = solveCase({ order: ORDER, mats, sectionShapes, c: CASES[th.case], bc: BCS[th.bc], dx: th.dx });
}

// Colour map and drawing. A perceptually uniform, greyscale-safe sequential map (inferno, polynomial fit) on the fixed
// span of the boundary conditions, in 2 degC bands (research 17 §6: rainbow maps are not used).
function inferno(u) {
  const c = [[0.0002189, 0.001651, -0.01948], [0.1065134, 0.5639564, 3.9327124], [11.6024931, -3.972854, -15.9423941], [-41.7039961, 17.4363989, 44.3541452], [77.1629357, -33.4023589, -81.8073093], [-71.3194282, 32.6260643, 73.2095199], [25.1311262, -12.242669, -23.070325]];
  u = Math.min(1, Math.max(0, u));
  return [0, 1, 2].map((k) => Math.round(255 * Math.min(1, Math.max(0, c.reduceRight((acc, ci) => acc * u + ci[k], 0)))));
}
const band2 = (t, bc) => 0.1 + 0.9 * ((Math.floor(t / 2) * 2 + 1 - bc.Te) / (bc.Ti - bc.Te));
const critT = (bc) => bc.Te + 0.7 * (bc.Ti - bc.Te);   // inside surface temperature at the PHI hygiene line fRsi 0.70
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
    const u = fluxMode ? Math.log10(1 + flux[q]) / Math.log10(1 + fmax) : band2(t, bc);
    img.data.set([...(plain ? [236, 234, 228] : inferno(u)), 255], o);
  }
  g.putImageData(img, 0, 0);
  const im = document.createElementNS(NS, "image");
  im.setAttribute("href", cv.toDataURL());
  im.setAttribute("x", c.x[0]); im.setAttribute("y", -c.y[1]); im.setAttribute("width", c.x[1] - c.x[0]); im.setAttribute("height", c.y[1] - c.y[0]);
  im.setAttribute("preserveAspectRatio", "none");
  im.style.imageRendering = "pixelated";
  svg.appendChild(im);
  // Everything below is clipped to the solved area: its edges are adiabatic cut lines, framed in grey.
  const clipId = "thclip";
  const defs = document.createElementNS(NS, "defs");
  defs.innerHTML = `<clipPath id="${clipId}"><rect x="${c.x[0]}" y="${-c.y[1]}" width="${c.x[1] - c.x[0]}" height="${c.y[1] - c.y[0]}"/></clipPath>`;
  svg.appendChild(defs);
  const frame = document.createElementNS(NS, "rect");
  Object.entries({ x: c.x[0], y: -c.y[1], width: c.x[1] - c.x[0], height: c.y[1] - c.y[0], fill: "none", stroke: "#8b939c", "stroke-width": 1, "vector-effect": "non-scaling-stroke" }).forEach(([k, v]) => frame.setAttribute(k, v));
  svg.appendChild(frame);
  const clipped = document.createElementNS(NS, "g");
  clipped.setAttribute("clip-path", `url(#${clipId})`);
  svg.appendChild(clipped);
  const into = (el) => clipped.appendChild(el);
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
      into(el);
    }
  }
  const X = (i) => c.x[0] + (i + 0.5) * R.dx, Y = (j) => -(c.y[0] + (j + 0.5) * R.dx);
  // Isotherms (marching squares on the cell centres): 0.5 px every 2 °C, 1 px every 10 °C, and the special isotherms
  // 0 °C and the fRsi 0.70 temperature as solid light lines.
  if (th.mode === "flood" || th.mode === "lines") {
    const v = (i, j) => Tc[j * nx + i];
    const contour = (level) => {
      let d = "";
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
      return d;
    };
    let fine = "", major = "";
    for (let level = Math.ceil(bc.Te / 2) * 2; level <= bc.Ti; level += 2) { const d = contour(level); if (level % 10 === 0) major += d; else fine += d; }
    const ink = th.mode === "lines" ? "#1E1E1E" : "#111";
    svgPath(fine, ink, th.mode === "lines" ? 0.8 : 0.4, 0.5); into(svg.lastChild);
    svgPath(major, ink, th.mode === "lines" ? 0.95 : 0.6, 1); into(svg.lastChild);
    const special = th.mode === "lines" ? "#1E1E1E" : "#f6f5f0", c0 = contour(0), cc = contour(critT(bc));
    svgPath(c0, special, 1, 0.75); into(svg.lastChild);
    svgPath(cc, special, 1, 1.5); into(svg.lastChild);
    // labels at the first point of each special isotherm (model mm, y down in the svg)
    const lab = (d, text) => { const m = /M(-?[\d.]+) (-?[\d.]+)/.exec(d); if (!m) return; const el = document.createElementNS(NS, "text"); el.textContent = text;
      Object.entries({ x: +m[1] + 6, y: +m[2] - 6, "font-size": (c.x[1] - c.x[0]) / 95, fill: special, "font-family": "Geist Mono, monospace", "paint-order": "stroke", stroke: th.mode === "lines" ? "#F4F2EC" : "#111", "stroke-width": (c.x[1] - c.x[0]) / 600 }).forEach(([k, v]) => el.setAttribute(k, v)); into(el); };
    lab(cc, `${critT(bc).toFixed(1)} °C · fRsi 0.70`);
    lab(c0, "0 °C");
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
    into(svg.lastChild);
  }
  { const fs = (c.x[1] - c.x[0]) / 95, put = (text, x, y, anchor = "start") => { const el = document.createElementNS(NS, "text"); el.textContent = text;
      Object.entries({ x, y, "font-size": fs, fill: "#5b5a55", "font-family": "Geist Mono, monospace", "text-anchor": anchor }).forEach(([k, v]) => el.setAttribute(k, v)); svg.appendChild(el); };
    put("INTERIOR AIR · Rsi", c.x[1] - (c.x[1] - c.x[0]) * 0.02, -c.y[1] + (c.y[1] - c.y[0]) * 0.06, "end");
    put("W", c.x[0] + fs, -c.y[0] + fs * 1.6); put("E", c.x[1] - fs, -c.y[0] + fs * 1.6, "end");
    put("SOIL CROP ADIABATIC; GROUND TEMPERATURES INDICATIVE", c.x[0], -c.y[0] + fs * 3.2);
    const bar = Math.pow(10, Math.floor(Math.log10((c.x[1] - c.x[0]) / 4))), bx = c.x[1] - bar - fs, by = -c.y[0] + fs * 2.6;
    const r = document.createElementNS(NS, "path"); r.setAttribute("d", `M${bx} ${by} h${bar}`); r.setAttribute("stroke", "#1E1E1E"); r.setAttribute("stroke-width", 3); r.setAttribute("vector-effect", "non-scaling-stroke"); svg.appendChild(r);
    put(`${bar} MM`, bx + bar, by - fs * 0.5, "end"); }
  { const el = document.createElementNS(NS, "text"); el.textContent = "EXTERIOR AIR · Rse";
    Object.entries({ x: c.x[0] + (c.x[1] - c.x[0]) * 0.02, y: -c.y[1] + (c.y[1] - c.y[0]) * 0.06, "font-size": (c.x[1] - c.x[0]) / 95, fill: "#5b5a55", "font-family": "Geist Mono, monospace" }).forEach(([k, v]) => el.setAttribute(k, v)); into(el); }
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
  legend.hidden = th.mode === "lines" || th.mode === "vectors";
  if (flux) {
    const stops = Array.from({ length: 11 }, (_, i) => `rgb(${inferno(i / 10).join(",")}) ${i * 10}%`).join(",");
    legend.innerHTML = `<div class="lg" style="background:linear-gradient(to right,${stops})"></div><div class="lgl"><span>low</span><span>heat flux |q| (log)</span><span>high</span></div>`;
  } else {
    // vertical stepped legend: one swatch per 2 °C band, ticks every 5 °C, the special isotherms named
    const { Te, Ti } = R.bc, top = Math.floor(Ti / 2) * 2, rows = [], at = (T) => ((Ti - T) / (Ti - Te)) * 100;
    for (let T = top; T >= Te - 1; T -= 2) rows.push(`<i style="background:rgb(${inferno(band2(T, R.bc)).join(",")})"></i>`);
    legend.innerHTML = `<div class="vleg"><div class="steps">${rows.join("")}</div><div class="marks">`
      + [20, 15, 10, 5, 0, -5, -10, -15].filter((T) => T <= Ti && T >= Te).map((T) => `<span style="top:${at(T)}%">${T} °C</span>`).join("")
      + `<span class="sp" style="top:${at(critT(R.bc))}%">${critT(R.bc).toFixed(1)} °C · f<sub>Rsi</sub> 0.70</span><span class="sp" style="top:${at(0)}%">0 °C</span></div></div>`
      + `<p class="lcap">Computed (screening), 2 °C bands. ${Te} / ${Ti} °C. Lowest f<sub>Rsi</sub> ${R.fRsi.toFixed(2)}.</p>`;
  }
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
