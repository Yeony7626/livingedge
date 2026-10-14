// =====================================================================================================================
// Draft view (prototype of the visual direction, section 2): the real section drawn as a detail sheet.
// - Framed drawing at true scale (scale bar = real mm); schedule column outside the frame; leaders horizontal from the
//   part, kinked only at the frame edge, ordered top to bottom so they never cross; text at a fixed screen size.
// - Hatches by material class; solid ink only for parts thinner than 3 mm (membranes, flashings, pans, tapes);
//   maker profiles (door parts) as outline + light tint; glass as hairlines; cut lines heavy, hatch lines light.
// Shares helpers with viewer.js (inlined in the same module).
// =====================================================================================================================
const DRAFT = { win: { x: [-200, 290], y: [-215, 115] }, sel: null, w: 900 };
const draftHost = document.getElementById("draft");
const PAPER = "#F4F2EC", INK = "#1B1B1A", SIGNAL = "#E0482B", MUTE = "#5b5a55", RULE = "#D9D5CB";
const hatchOf = (p) => {
  const m = p.mat ?? "";
  if (p.nocarbon || p.kEq) return "maker";
  return /concrete|parge|polymer/.test(m) ? "conc" : /eps|pu-struct|cork|comfortboard|cellular|woodfibre/.test(m) ? "rigid" : /comfortbatt|cellulose/.test(m) ? "batt"
    : /glulam|softwood|plywood|cedar/.test(m) ? "timber" : /aggregate/.test(m) ? "gravel" : /reclaimed-stone|paver/.test(m) ? "stone" : /^soil/.test(m) ? "earth"
    : /igu|glass/.test(m) ? "glass" : /gypsum/.test(m) ? "gyp" : /stainless|aluminium|steel|membrane|epdm|ldpe|hdpe|butyl|geotextile/.test(m) ? "ink" : "plain";
};
const thinness = (poly) => {
  // ≈ thickness of a thin strip: 2 · area / perimeter
  let a = 0, per = 0;
  poly.forEach(([x, y], i) => { const [x2, y2] = poly[(i + 1) % poly.length]; a += x * y2 - x2 * y; per += Math.hypot(x2 - x, y2 - y); });
  return (2 * Math.abs(a / 2)) / Math.max(per, 1e-9);
};
const shortName = (p) => p.name.replace(/\s*\(.*?\)\s*/g, " ").split(/[,;:]/)[0].replace(/\s+/g, " ").trim().toUpperCase().replace(/^(ENGINEERED|SELF-ADHERED|PERFORATED|EXPANDED|MACHINED|THERMALLY BROKEN|DRAINED) /, "").slice(0, Math.floor((DRAFT.colChars ?? 30)));
const DEFS = `<defs>
<pattern id="d-timber" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width=".4"/><line x1="0" y1="0" x2="8" y2="0" stroke="${INK}" stroke-width=".4"/></pattern>
<pattern id="d-rigid" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#E4E4E7"/><line x1="0" y1="0" x2="0" y2="6" stroke="${INK}" stroke-width=".35"/><line x1="3" y1="0" x2="3" y2="6" stroke="${INK}" stroke-width=".35" stroke-dasharray=".6 1.2"/></pattern>
<pattern id="d-batt" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 6 Q3 0 6 6 T12 6" fill="none" stroke="${INK}" stroke-width=".4"/></pattern>
<pattern id="d-conc" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="${INK}"/><path d="M8 7 l2 -3 l2 3z" fill="none" stroke="${INK}" stroke-width=".35"/><circle cx="11" cy="11" r=".5" fill="${INK}"/></pattern>
<pattern id="d-gravel" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="none" stroke="${INK}" stroke-width=".35"/><circle cx="9" cy="8" r="1.5" fill="none" stroke="${INK}" stroke-width=".35"/></pattern>
<pattern id="d-stone" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#C9C7C2"/><path d="M2 3 l3 1 M9 2 l2 3 M5 9 l3 -1 M11 10 l1 3 M1 12 l3 1" stroke="${INK}" stroke-width=".35"/></pattern>
<pattern id="d-earth" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="6" y2="0" stroke="${INK}" stroke-width=".5"/><line x1="8" y1="8" x2="12" y2="8" stroke="${INK}" stroke-width=".5"/></pattern>
<pattern id="d-gyp" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".4" fill="${INK}"/></pattern>
<pattern id="d-maker" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="6" height="6" fill="#E6E2D8"/><line x1="0" y1="0" x2="0" y2="6" stroke="#B9B4A8" stroke-width=".35"/></pattern>
</defs>`;
const fillOf = (h, thin) => (thin || h === "ink" ? INK : h === "glass" || h === "plain" ? PAPER : `url(#d-${h})`);

function drawDraft() {
  const box = draftHost.getBoundingClientRect();
  const W = Math.max(box.width, 320), H = Math.max(box.height, 300);
  const COL = Math.min(250, Math.max(190, W * 0.34)), PAD = 28, FW = W - COL - PAD * 2 - 16, FH = H - PAD * 2 - 44;
  // keep the window's aspect equal to the frame's (no distortion), centred on the requested window
  const win = DRAFT.win, cxm = (win.x[0] + win.x[1]) / 2, cym = (win.y[0] + win.y[1]) / 2;
  let ww = win.x[1] - win.x[0], wh = win.y[1] - win.y[0];
  if (ww / wh > FW / FH) wh = (ww * FH) / FW; else ww = (wh * FW) / FH;
  const X0 = cxm - ww / 2, Y1 = cym + wh / 2, s = FW / ww;          // px per mm
  const px = (x, y) => [PAD + (x - X0) * s, PAD + (Y1 - y) * s];
  let geo = "", under = "";
  const labels = [];
  const layersMode = DRAFT.mode === "section", on = state.layers.size ? state.layers : new Set(CONTROL);
  for (const p of ORDER) {
    if (p.type === "virtual" || p.role === "planting" || p.role === "furniture") continue;
    for (const sh of sectionShapes(p, DRAFT.w)) {
      if (p.void) { if (sh.poly) geo += `<polygon points="${sh.poly.map(([x, y]) => `${x},${-y}`).join(" ")}" fill="${PAPER}"/>`; continue; }
      if (sh.circle) {
        const [x, y, r, ri] = sh.circle;
        geo += `<circle cx="${x}" cy="${-y}" r="${r}" fill="${PAPER}" stroke="${INK}" stroke-width="1" vector-effect="non-scaling-stroke"/>` + (ri ? `<circle cx="${x}" cy="${-y}" r="${ri}" fill="none" stroke="${INK}" stroke-width=".5" vector-effect="non-scaling-stroke"/>` : "");
        if (x > X0 + 10 / s && x < X0 + ww - 10 / s && y > Y1 - wh + 10 / s && y < Y1 - 10 / s) labels.push({ p, x, y, area: Math.PI * r * r });
        continue;
      }
      const h = hatchOf(p), thin = h !== "glass" && h !== "maker" && thinness(sh.poly) < 3;
      const sel = DRAFT.sel === p.id, pts = sh.poly.map(([x, y]) => `${x},${-y}`).join(" ");
      under += `<polygon points="${pts}" fill="none" stroke="${INK}" stroke-width="4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;
      // Layers mode: the control layers (water, air, thermal, vapour) as coloured bands on the cut; everything else ink
      const band = layersMode && on.has(p.role) ? ROLE[p.role] : null;
      geo += `<polygon data-id="${p.id}" points="${pts}" fill="${band && !thin ? band + "33" : fillOf(h, thin)}" stroke="${sel ? SIGNAL : band ?? INK}" stroke-width="${sel ? 2.2 : band ? 2 : h === "glass" ? 0.5 : 0.75}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;
      // label anchor: a point inside the polygon near its centroid
      const xs = sh.poly.map((v) => v[0]), ys = sh.poly.map((v) => v[1]);
      // anchor: a point of the part inside the visible frame (centre of the visible overlap, else a grid search in it)
      const m = 12 / s, ox0 = Math.max(Math.min(...xs), X0 + m), ox1 = Math.min(Math.max(...xs), X0 + ww - m);
      const oy0 = Math.max(Math.min(...ys), Y1 - wh + m), oy1 = Math.min(Math.max(...ys), Y1 - m);
      let ax = NaN, ay = NaN;
      if (ox0 < ox1 && oy0 < oy1) {
        const cands = [[(ox0 + ox1) / 2, (oy0 + oy1) / 2]];
        for (let i = 1; i < 6; i++) for (let j = 1; j < 6; j++) cands.push([ox0 + ((ox1 - ox0) * i) / 6, oy0 + ((oy1 - oy0) * j) / 6]);
        const hit = cands.find(([x, y]) => pip(sh.poly, x, y)) ?? (thinness(sh.poly) < 3 ? sh.poly.find(([x, y]) => x > ox0 && x < ox1 && y > oy0 && y < oy1) : null);
        if (hit) [ax, ay] = hit;
      }
      const vis = !Number.isNaN(ax);
      const per = sh.poly.reduce((a, [x, y], i) => { const [x2, y2] = sh.poly[(i + 1) % sh.poly.length]; return a + Math.hypot(x2 - x, y2 - y); }, 0);
      const area = Math.abs(xs.reduce((a, x, i) => a + x * ys[(i + 1) % ys.length] - xs[(i + 1) % xs.length] * ys[i], 0) / 2);
      if (vis) labels.push({ p, x: ax, y: ay, area: thin ? Math.max(area, (per / 2) * 6) : area });   // thin key parts count by length
    }
  }
  // Schedule, level of detail: rank parts by importance × on-screen size; minor parts (tapes, sealants, screens…)
  // only when zoomed in far (> 4 px/mm) or selected; fewer rows on the wide view, more when zoomed in.
  const MINOR = /tape|seal|foil|back-fill|screen|clip|stool|ledge|gasket|skirt|weep|transition|subflash|rebar|soilgas|geotextile|dampproof|airseal|gap-fill|tray-ledge|slot/;
  const ROLE_W = { frame: 1.3, water: 1.2, thermal: 1.1, cladding: 1.1, ground: 1.0, metal: 0.9, concrete: 0.8, drainage: 0.6, air: 0.5 };
  const importance = (p) => (MINOR.test(p.id) ? 0.12 : ROLE_W[p.role] ?? 0.6);
  const rowsFit = Math.max(4, Math.min(10, Math.min(Math.floor(FH / 30), 7 + Math.round(Math.log2(Math.max(s, 0.25)) * 2))));
  const byPart = new Map();
  for (const l of labels) if (!byPart.has(l.p.id) || byPart.get(l.p.id).area < l.area) byPart.set(l.p.id, l);
  let chosen = [...byPart.values()]
    .filter((l) => l.p.id === DRAFT.sel || (l.area * s * s > 300 && (!MINOR.test(l.p.id) || s > 4)))
    .map((l) => ({ ...l, score: l.p.id === DRAFT.sel ? 1e12 : importance(l.p) * Math.pow(l.area * s * s, 0.25) }))
    .sort((a, b) => b.score - a.score).slice(0, rowsFit);
  chosen = chosen.map((l) => ({ ...l, py: px(l.x, l.y)[1], pxx: px(l.x, l.y)[0] })).sort((a, b) => a.py - b.py);
  const GAP = 20;
  let prev = PAD - GAP;
  for (const l of chosen) { l.ly = Math.min(Math.max(l.py, prev + GAP), PAD + FH - 84); prev = l.ly; }   // rows stop above the title block
  for (let i = chosen.length - 2; i >= 0; i--) if (chosen[i].ly > chosen[i + 1].ly - GAP) chosen[i].ly = chosen[i + 1].ly - GAP;   // push up from the bottom
  const KX = PAD + FW, COLX = KX + 22;
  DRAFT.colChars = Math.floor((W - COLX - 30) / 7.4);
  const zoneN = {}, tagOf = (p) => { const z = p.junction ?? "X"; zoneN[z] = (zoneN[z] ?? 0) + 1; return z + zoneN[z]; };
  const M = `font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.04em;paint-order:stroke;stroke:${PAPER};stroke-width:3px;stroke-linejoin:round`;
  let ann = "";
  chosen.forEach((l, i) => {
    const on = DRAFT.sel === l.p.id, c = on ? SIGNAL : INK;
    ann += `<polyline points="${l.pxx.toFixed(1)},${l.py.toFixed(1)} ${KX - 8},${l.py.toFixed(1)} ${KX + 6},${l.ly.toFixed(1)} ${COLX - 4},${l.ly.toFixed(1)}" fill="none" stroke="${c}" stroke-width="${on ? 1 : 0.75}" stroke-opacity=".8"/>`;
    ann += `<circle cx="${l.pxx.toFixed(1)}" cy="${l.py.toFixed(1)}" r="2" fill="${c}"/>`;
    ann += `<circle cx="${COLX + 8}" cy="${l.ly.toFixed(1)}" r="10" fill="${PAPER}" stroke="${c}" stroke-width=".75"/><text x="${COLX + 8}" y="${(l.ly + 3.5).toFixed(1)}" text-anchor="middle" style="${M};font-size:9px" fill="${c}">${tagOf(l.p)}</text>`
      + `<text data-id="${l.p.id}" x="${COLX + 24}" y="${(l.ly + 4).toFixed(1)}" style="${M};cursor:pointer" fill="${c}">${shortName(l.p)}${l.p.nocarbon ? "  (MAKER)" : ""}</text>`;
  });
  // threshold dimension when the threshold is in view
  const [txL, ty0] = px(0, -7), [, ty1] = px(0, 5);
  if (ty0 > PAD && ty1 < PAD + FH && txL > PAD) {
    const [xr] = px(205, 5);
    const [xs] = px(83.5, -7), xd = Math.min(Math.max(px(150, 0)[0], PAD + 30), PAD + FW - 30);
    ann += `<g stroke="${INK}" stroke-width=".75" stroke-opacity=".85"><line x1="${xs + 3}" y1="${ty0}" x2="${xd + 6}" y2="${ty0}"/><line x1="${xr - 3}" y1="${ty1}" x2="${xd - 6}" y2="${ty1}"/>`
      + `<line x1="${xd}" y1="${ty1 - 10}" x2="${xd}" y2="${ty0 + 10}"/><line x1="${xd - 4}" y1="${ty1 + 4}" x2="${xd + 4}" y2="${ty1 - 4}"/><line x1="${xd - 4}" y1="${ty0 + 4}" x2="${xd + 4}" y2="${ty0 - 4}"/></g>`
      + `<text x="${xd + 7}" y="${ty1 - 12}" style="${M}" fill="${INK}">12</text>`;
  }
  // datums: long-dash-dot 0.75 px with filled triangles and three-decimal values, where they fall in the frame
  for (const [y, label] of [[0, "\u00b10.000 FFL"], [2785, "+2.785 HEAD"], [-530, "\u22120.530 U/S BEAM"]]) {
    const [, py] = px(0, y);
    if (py < PAD + 14 || py > PAD + FH - 4) continue;
    ann += `<line x1="${PAD}" y1="${py}" x2="${PAD + FW}" y2="${py}" stroke="${INK}" stroke-width=".75" stroke-opacity=".55" stroke-dasharray="16 3 2 3"/>`
      + `<path d="M${PAD + FW - 14} ${py} l-4.5 -7 h9 z" fill="${INK}"/><text x="${PAD + FW - 24}" y="${py - 5}" text-anchor="end" style="${M}" fill="${INK}">${label}</text>`;
  }
  // orientation: exterior (garden, west) left, interior (east) right
  ann += `<text x="${PAD + 6}" y="${PAD + FH - 8}" style="${M}" fill="${INK}">W</text><text x="${PAD + FW - 14}" y="${PAD + FH - 8}" style="${M}" fill="${INK}">E</text>`;
  // title block under the schedule column
  { const tx = KX + 22, ty = PAD + FH - 64;
    ann += `<rect x="${tx - 8}" y="${ty - 16}" width="${W - tx - 4}" height="70" fill="${PAPER}" stroke="${INK}" stroke-width=".75"/>`
      + `<text x="${tx}" y="${ty}" style="${M}" fill="${INK}">THE LIVING EDGE &#183; DETAIL 02</text><text x="${tx}" y="${ty + 16}" style="${M}" fill="${MUTE}">THRESHOLD TO GARDEN, VANCOUVER</text>`
      + `<text x="${tx}" y="${ty + 32}" style="${M}" fill="${MUTE}">${layersMode ? "CONTROL LAYERS" : "SECTION"} AT W ${DRAFT.w} &#183; v3</text><text x="${tx}" y="${ty + 48}" style="${M}" fill="${MUTE}">SCALE: SEE BAR</text>`; }
  // scale bar: a round length near 1/5 of the frame
  const target = ww / 5, nice = [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000].reduce((b, v) => (Math.abs(v - target) < Math.abs(b - target) ? v : b), 100);
  const sb = nice * s, by = PAD + FH + 20;
  ann += `<rect x="${PAD}" y="${by}" width="${sb / 2}" height="3" fill="${INK}"/><rect x="${PAD + sb / 2}" y="${by}" width="${sb / 2}" height="3" fill="none" stroke="${INK}" stroke-width=".6"/>`;
  ann += `<text x="${PAD}" y="${by + 16}" style="${M}" fill="${INK}">0</text><text x="${PAD + sb / 2}" y="${by + 16}" text-anchor="middle" style="${M}" fill="${INK}">${nice / 2}</text><text x="${PAD + sb}" y="${by + 16}" text-anchor="middle" style="${M}" fill="${INK}">${nice} mm</text>`;
  ann += `<text x="${PAD + Math.max(sb, 110) + 48}" y="${by + 16}" style="${M}" fill="${MUTE}">D02 SECTION AT W ${DRAFT.w}, ${chosen.length} OF ${byPart.size} PARTS LABELLED</text>`;
  draftHost.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block">
    <rect width="${W}" height="${H}" fill="${PAPER}"/>
    <svg x="${PAD}" y="${PAD}" width="${FW}" height="${FH}" viewBox="${X0} ${-Y1} ${ww} ${wh}">${DEFS}<rect x="${X0}" y="${-Y1}" width="${ww}" height="${wh}" fill="${PAPER}"/>${under}${geo}</svg>
    <rect x="${PAD}" y="${PAD}" width="${FW}" height="${FH}" fill="none" stroke="${INK}" stroke-width=".5"/>
    ${ann}</svg>`;
  draftHost.querySelectorAll("[data-id]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); DRAFT.sel = el.dataset.id; select(el.dataset.id); drawDraft(); }));
  DRAFT.view = { X0, Y1, ww, wh, s, PAD, FW, FH };
}
// pan / zoom inside the frame
let dDrag = null;
draftHost.addEventListener("wheel", (e) => {
  e.preventDefault();
  const v = DRAFT.view, r = draftHost.getBoundingClientRect(), f = e.deltaY > 0 ? 1.15 : 1 / 1.15;
  const mx = v.X0 + (e.clientX - r.left - v.PAD) / v.s, my = v.Y1 - (e.clientY - r.top - v.PAD) / v.s;
  const w = DRAFT.win;
  DRAFT.win = { x: [mx - (mx - w.x[0]) * f, mx + (w.x[1] - mx) * f], y: [my - (my - w.y[0]) * f, my + (w.y[1] - my) * f] };
  drawDraft();
}, { passive: false });
draftHost.addEventListener("pointerdown", (e) => { dDrag = { x: e.clientX, y: e.clientY, win: JSON.parse(JSON.stringify(DRAFT.win)) }; });
window.addEventListener("pointerup", () => (dDrag = null));
window.addEventListener("pointermove", (e) => {
  if (!dDrag || state.view !== "draft") return;
  const s = DRAFT.view.s, dx = (e.clientX - dDrag.x) / s, dy = (e.clientY - dDrag.y) / s;
  DRAFT.win = { x: [dDrag.win.x[0] - dx, dDrag.win.x[1] - dx], y: [dDrag.win.y[0] + dy, dDrag.win.y[1] + dy] };
  drawDraft();
});
new ResizeObserver(() => { if (state.view === "draft") drawDraft(); }).observe(draftHost);

// Open on the drafting view (direction s2): the hairline section is the default; colour is a mode.
showView("draft");
