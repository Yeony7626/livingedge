// Detail 02 spec, v3 (after lap 2 + user decisions): part of a multi-storey building — a floor and wall sit above the opening.
// Passive-house wood-aluminium lift-and-slide (ENERsign primus), motorised, 12 mm accessible threshold on a warm sill;
// flush glulam header in a wood-fibre floor band with a canopy and an integrated screen cassette; jamb A wall (W1) with the
// water corner (spout, basin, granite rill, runnel) beside it; one reclaimed-granite ground; low-carbon slab inside.
// Research: 14 (lift-slide, threshold), 13 (floor-band head, canopy), 09 §9.1 (base of wall W1), 12 (floor), 08/08b (landscape),
// 11 (sliding wall). Lap-2 reviews: review/d2-lap2/review-R1..R5 (cited R1 N2, R2 N3, R3 P1, R4 P3, R5 N8 …).
//
// Datums: x = 0 at the frame's exterior face, EXTERIOR NEGATIVE; y = 0 at the finished floor (FFL); w along the wall:
// w < 0 jamb A (the water corner), 0–4800 the opening (sliding panel 0–2400, fixed 2400–4800), 4800–6000 jamb B.
// Normal mode: w −1200 → 1800 (jamb A + the sliding half), layers stepped back near the cut (w = L).
// `node detail02.mjs --appearance`: w −1200 → 6000, no cut-away, upper storey drawn to 6.2 m, for the renders. Millimetres.
import { writeFileSync } from "node:fs";

const APP = process.argv.includes("--appearance");
const OPEN_W = 4800;                             // clear opening, two panels
const L = APP ? 6000 : 1800;                     // appearance: jamb A (w < 0), the 4.8 m opening, jamb B (4800–6000)
const SPAN = [-1200, L];
const MB = (runs) => (APP ? runs.concat(runs.map(([a, b]) => [OPEN_W - b, OPEN_W - a])) : runs);   // appearance: mirror jamb A to jamb B
const JZ = MB([[SPAN[0], 0]]);                   // ground and wall in front of / at the jambs (water corner at jamb A only)
const JPF = -75;                                 // jamb plinth (parge) face: 09 §9.1 mapped to these datums
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const parts = [];
const add = (p) => {
  if (!p.runs && !p.axis && (!p.type || p.type === "sheet")) p.runs = [SPAN];
  parts.push(p);
};
const cut = (k) => (APP ? L : L - k * 100);     // stepped cut-away end, k steps of 100 from the cut
const OPEN = [[0, Math.min(L, OPEN_W)]];        // the glazed opening
const steps = (a, b, s) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);
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
// Joists at 400 o.c. over the whole span, bays between them, strapping on joist lines.
const JOISTS = steps(SPAN[0] + 60, SPAN[1] - 40, 400).map((w) => [w, w + 38]);
const BAYS = [[SPAN[0], JOISTS[0][0]], ...JOISTS.slice(0, -1).map((j, i) => [j[1], JOISTS[i + 1][0]]), [JOISTS.at(-1)[1], SPAN[1]]];
const STRAPS = JOISTS.map(([a, b]) => [(a + b) / 2 - 32, (a + b) / 2 + 32]).filter(([a, b]) => a >= SPAN[0] && b <= SPAN[1]);
const clip = (runs, w1) => runs.filter(([a]) => a < w1).map(([a, b]) => [a, Math.min(b, w1)]);

// =================== Threshold v3: ENERsign primus lift & slide, warm sill (research 14 §3; R1 N1–N3, N6; R2 N3, N6, N8) ===================
// Operable (sliding) panel on the jamb-A half (w 0–2400), so the section slice cuts the accessible path; fixed panel w 2400–4800.
// Threshold 12 mm: tray −7 → 6 mm slot → nosing lip −12 → track 0 → rail +5 (14 §3.2, B651 5.2.6). Overflow order −95 < −20 < −5 (14 §3.5).
const SLOT_BACK = 240.4, CH_IN = -21.5, CH_OUT = -171.5;
const CT = (x) => -82.0 + (x + 20) * (15.6 / (SLOT_BACK + 20));   // top of the machined PU course, 6 % outward
const PANC = (x) => CT(x) + 0.92, PANTOP = (x) => CT(x) + 1.32;   // pan centreline / top face (0.8 stainless on the 0.5 skirt)
const SLIDE = [[0, Math.min(L, 2400)]], FIXED = L > 2400 ? [[2400, Math.min(L, OPEN_W)]] : [];
add({ id: "beam", name: "Engineered reinforced grade beam, rectangular, one pour (Part 4)", role: "concrete", mat: "concrete-f2-40scm", junction: "T", src: ["R2 N5", "12 foundation", "14 §3.3 #1"],
  poly: R(-20, -530, SLOT_BACK, -193),
  note: "Part 4 engineered foundation (R2 ruling on VBBL 9.15.4.6). Underside −530: frost margin 74, drain cover 152 (R2 N5). Sill support level ±1 mm over 4.8 m." });
add({ id: "beam-rebar", name: "Beam reinforcement (about 9 kg/m)", role: "metal", mat: "rebar-eaf-pnw", junction: "T", src: ["R4"], type: "virtual", m3PerMetre: 9 / 7850 });
add({ id: "dampproof", name: "Water-based damp-proofing on the beam face (EPS-compatible)", role: "water", mat: "membrane-poly", junction: "T", src: ["07 E6"],
  type: "sheet", t: 1, path: [[-20.5, -195], [-20.5, -530]] });
add({ id: "beam-insul", name: "Graphite EPS Type 3 75 on the beam face, full depth", role: "thermal", mat: "graphite-eps", junction: "T", src: ["11 T2", "R2 P4", "R2 N5"], poly: R(-97, -530, -22, -193) });
add({ id: "course", name: "Machined structural PU course (Armatherm 500-080 class), top cut to the 6 % fall — no mortar, no wedge", role: "thermal", mat: "pu-structural-160", junction: "T", src: ["14 §3.3 #3", "R1 N2", "R4 N6"],
  poly: [[-20, -193], [SLOT_BACK, -193], [SLOT_BACK, CT(SLOT_BACK)], [-20, CT(-20)]], runs: OPEN,
  note: "Bedded on PU adhesive; drillable only below the pan line. Engineer to confirm long-term stress under the track (1.45 MPa grade)." });
add({ id: "pan-skirt", name: "Self-adhered skirt under the pan, down the course face, lapped 100 over the damp-proofing", role: "water", mat: "membrane-poly", junction: "T", src: ["R1 F1", "R2 3"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[SLOT_BACK - 0.85, CT(SLOT_BACK - 0.85) + 0.25], [-20.25, CT(-20) + 0.25], [-20.25, -193.5], [-21.25, -194.5], [-21.25, -293]] });
add({ id: "dam-angle", name: "316 stainless dam angle, cast in before the pour (stage 1), top −5", role: "water", mat: "stainless", junction: "T", src: ["14 §3.3 #4", "R1 N6", "R2 N3"],
  type: "sheet", t: 1, runs: OPEN, path: [[SLOT_BACK + 0.5, -5], [SLOT_BACK + 0.5, -110]],
  note: "Interior water-barrier top −5 (5 mm sealant over): every exterior overflow crest is lower (notch −20, weir −95)." });
add({ id: "pan", name: "316 welded sill pan 0.8, measured to the framed opening (stage 2), floor 6 %, nose into the channel", role: "water", mat: "stainless", junction: "T", src: ["14 §3.3 #9", "R1 N6", "11 T6"],
  type: "sheet", t: 0.8, runs: OPEN, path: [[SLOT_BACK - 0.85, PANC(SLOT_BACK - 0.85)], [-20, PANC(-20)], [-38, PANC(-20) - 18 * 0.06], [-38, -103]], embeds: ["pan-back"],
  note: "End dams 150 up the jambs, welded; jamb membranes lap ≥ 100 over them. Back upturn butyl-lapped to the dam angle (−60 → −25). No fastener through the pan floor (R2 N8)." });
add({ id: "pan-back", name: "Pan back upturn (welded), butyl-lapped to the dam angle −60 → −25", role: "water", mat: "stainless", junction: "T", src: ["14 §3.3 #9"],
  type: "sheet", t: 0.8, runs: OPEN, path: [[SLOT_BACK - 0.4, -25], [SLOT_BACK - 0.4, PANC(SLOT_BACK - 0.4) - 0.4]] });
// Interior floor and slab edge.
add({ id: "stone", name: "Clear stone 100, gas-permeable layer and capillary break", role: "drainage", mat: "aggregate", junction: "F", src: ["12 build-up"],
  poly: R(SLOT_BACK, -300, 2500, -200.25), note: "Radon rough-in per VBBL 9.13.4.3 (outside the slice). Never linked to the perimeter drain." });
add({ id: "eps-1", name: "Graphite EPS Type 2, 50 (layer 1)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(SLOT_BACK + 1, -200.25, 2500, -150.25) });
add({ id: "eps-2", name: "Graphite EPS Type 2, 50 (layer 2, joints staggered)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(SLOT_BACK + 1, -150.25, 2500, -100.25) });
add({ id: "soilgas", name: "0.25 mm soil-gas / air barrier under the slab, turned up the stem (jamb) or the dam angle (opening)", role: "air", mat: "ldpe-film", junction: "F", src: ["14 §3.3 #5", "12 sealing"],
  type: "sheet", t: 0.25, path: [[2500, -100.125], [SLOT_BACK + 1, -100.125]] });
add({ id: "soilgas-up", name: "Soil-gas poly up the dam angle's interior face, butyl 85", role: "air", mat: "ldpe-film", junction: "F", src: ["14 §3.3 #5"],
  type: "sheet", t: 0.25, runs: OPEN, path: [[SLOT_BACK + 1.125, -100], [SLOT_BACK + 1.125, -15]] });
add({ id: "slot-edge", name: "Expanded cork slab-edge strip 25", role: "thermal", mat: "cork", junction: "F", src: ["14 §3.3 #6", "R1 F4"], poly: R(SLOT_BACK + 1.25, -100, SLOT_BACK + 26.25, -8), runs: OPEN });
add({ id: "slab", name: "Low-carbon concrete slab 100, ground finish; mineral floor ≥ 610 from the sill; floor heating within 1 m", role: "concrete", mat: "concrete-lowcarbon", junction: "F", src: ["12 build-up", "11 T20", "14 §8"],
  poly: R(SLOT_BACK + 26.6, -100, 2500, 0) });
// Warm sill: Purenit bearer on the pan, ENERsign block, nosing, track, foil, backer, floor plate.
add({ id: "sill-bearer", name: "Purenit bearer 9–18 (550 kg/m³, λ 0.096), screw ground, drainage grooves underneath", role: "thermal", mat: "pu-structural", junction: "D", src: ["14 §3.3 #11", "R1 N2"],
  poly: [[98, -54.5], [236, -54.5], [236, PANTOP(236)], [98, PANTOP(98)]], runs: OPEN,
  note: "On discrete 2–3 mm PU/epoxy pads at the fixing points; 5 x 3 grooves at 150 o.c. drain outward. Frame screws stop in the bearer (screw ≤ block + bearer − 3)." });
add({ id: "sill-block", name: "ENERsign primus sill block (timber / insulation composite), set dry", role: "frame", mat: "softwood-lumber", nocarbon: true, junction: "D", src: ["14 §3.1", "ENS-K03"],
  poly: [[100, -54.5], [234, -54.5], [234, -1], [183, -1], [183, -19], [100, -19]], runs: OPEN, cuts: ["track"] });
add({ id: "sill-nosing", kEq: 0.3, name: "Drained aluminium sill nosing with PVC break, lip −12, 1:8.4 to the track", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §3.1"],
  poly: [[91, -12], [183, -1], [183, -19], [100, -19], [100, -21], [91, -21]], runs: OPEN });
add({ id: "track", kEq: 0.3, name: "Thermally broken running track, top at FFL", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §3.1"], poly: R(183, -15, 233, 0), runs: OPEN });
add({ id: "track-rail", kEq: 0.3, name: "Running rail, top +5", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §3.1"], poly: R(205, 0, 215, 5), runs: clip([[165, 2340]], L) });
add({ id: "sill-foil", name: "EPDM air-seal foil 1.0: block face to pan upturn (bonds 34 / 22)", role: "air", mat: "epdm", junction: "D", src: ["14 §3.3 #15", "R1 N2", "R1 N13"],
  type: "sheet", t: 1, runs: OPEN, path: [[234.5, -2], [234.5, -36], [239.1, -36], [239.1, -58]] });
add({ id: "back-fill", name: "Cork backer, loose-fit, removable", role: "thermal", mat: "cork", junction: "D", src: ["14 §3.3 #16"], poly: R(235, -35.5, 238.6, -4), runs: OPEN });
add({ id: "sill-cover", name: "4 mm 316 floor plate over the slot, removable for the 30-year track renewal", role: "metal", mat: "stainless", junction: "D", src: ["14 §3.3 #17", "R1 P7"], poly: R(235, -4, 262, 0), runs: OPEN });
add({ id: "edge-seal", name: "Tin-free MS sealant joint 5, plate to slab", role: "air", mat: "butyl-sealant", junction: "F", src: ["14 §3.3 #17", "R4 4.8"], poly: R(262, -8, SLOT_BACK + 26.6, 0), runs: OPEN });
// Landing tray, slot and channel (14 §3.3 #10, #18–20): carried by the channel and the bearer, so settlement cannot raise the threshold.
const LEDGE_RUNS = steps(150, Math.min(L, OPEN_W) - 100, 300).map((w) => [w, w + 50]);
add({ id: "tray-ledge", name: "316 angle clips 40x40x3, 50 long at 300 o.c., screwed to the bearer face", role: "metal", mat: "stainless", junction: "D", src: ["14 §3.3 #18"],
  type: "sheet", t: 3, runs: LEDGE_RUNS, path: [[83.5, -40.5], [96.5, -40.5], [96.5, -70]] });
add({ id: "slot-screen", name: "Perforated 316 dirt screen under the 6 mm slot", role: "metal", mat: "stainless", junction: "D", src: ["14 §3.3 #20", "11 T16"], poly: R(85, -46, 95, -45), runs: OPEN });
const TRAY_RUNS = L > 4200 ? [[0, 4200]] : OPEN;      // overflow notch beyond the fixed leaf, w 4200–4800 (R2 N3)
add({ id: "landing-tray", name: "316 tray 1.5, folded edges, perforated over the channel, lift-out lengths ≤ 1 m", role: "metal", mat: "stainless", junction: "T", src: ["14 §3.3 #19", "R1 P8"],
  type: "sheet", t: 1.5, runs: OPEN, path: [[CH_OUT + 0.75, -8], [CH_OUT + 0.75, -38.25], [84.25, -38.25], [84.25, -8]] });
add({ id: "tray-slips", name: "Granite paver slips 30 in the tray, top −7 (one ground with the landing)", role: "ground", mat: "reclaimed-stone", junction: "T", src: ["14 §3.3 #19", "R5 P1"],
  poly: R(CH_OUT + 1.5, -37.5, 83.5, -7), runs: TRAY_RUNS });
if (L > 4200) add({ id: "tray-slips-notch", per: "opening", name: "Slips 17 in the overflow notch, top −20 (crest below the −5 barrier)", role: "ground", mat: "reclaimed-stone", junction: "T", src: ["R2 N3", "14 §3.5"],
  poly: R(CH_OUT + 1.5, -37.5, 83.5, -20), runs: [[4200, Math.min(L, OPEN_W)]] });
add({ id: "channel", name: "Polymer-concrete trench channel, 316 edge rail, house wall top −92 (pan nose drains in)", role: "drainage", mat: "polymer-concrete", junction: "T", src: ["11 T16", "R1 N3", "R2 N3", "14 §3.3 #10"],
  poly: [[CH_OUT, -39], [CH_OUT, -130], [CH_IN, -130], [CH_IN, -92], [CH_IN - 10, -92], [CH_IN - 10, -120], [CH_OUT + 12, -120], [CH_OUT + 12, -39]], runs: OPEN, cuts: ["channel-drop"],
  note: "Opening width, 316 end caps flush with the reveal liners (R5 N3). Invert −95 → −120 toward the jamb-A outlet (0.5 %, not drawn); silt-box weir −95; bottom outlet to its own solid pipe (R2 N2, N3)." });
add({ id: "tray-stools", name: "316 stools on the pan over the channel house wall, carrying the tray", role: "metal", mat: "stainless", junction: "T", src: ["14 §3.3 #19"], poly: [[CH_IN - 10, PANTOP(CH_IN - 10)], [CH_IN - 5, PANTOP(CH_IN - 5)], [CH_IN - 5, -39], [CH_IN - 10, -39]], runs: LEDGE_RUNS,
  note: "Bonded on the pan floor over the channel house wall; nothing fixed through the pan." });
add({ id: "haunch", name: "Concrete haunch under the channel, on the beam insulation and the drain stone", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["R1 table", "R2 9"], poly: R(CH_OUT, -193, -22, -130), runs: OPEN, cuts: ["channel-drop"] });

// =================== Door unit: ENERsign primus lift & slide, motorised (research 14 §3–7) ===================
// kEq: thermal-only equivalent conductivity of a drawn maker part (screening solver; R1 lap 2 used λ 0.12 for the frame,
// research 14 §3.1 spruce block λ 0.11; thermally broken Al nosing / track ≈ 0.3 INFERRED). Replace with the maker's THERM file.
const GLASS_RUNS = clip([[165, 2340], [2460, 4635]], Math.min(L, OPEN_W));     // sightlines: jamb 165, interlock 120 (14 §4)
const FRAME_TOP = 2730, SASH_TOP = 2672, GLASS_TOP = SASH_TOP - 100;
add({ id: "sash", kEq: 0.12, name: "Sliding sash bottom rail (aluminium-clad spruce), grooved over the running rail", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §3.1", "ENS-K03"],
  poly: [[147, 1], [205, 1], [205, 5], [215, 5], [215, 1], [259, 1], [259, 101], [147, 101]], runs: GLASS_RUNS });
for (const [i, [x, t]] of [[168.6, 6], [188.6, 4], [206.6, 8.76]].entries())
  add({ id: `glass-${i + 1}`, name: ["Outer lite 6 mm HS/FT, CSA A460 dot markers on #1 (≤ 50 x 50), low-e #2", "Centre lite 4 mm", "Inner lite 8.76 laminated, low-e #5"][i],
    role: "cladding", mat: "igu-triple", junction: "D", src: ["14 §5", "R4 N2", "R3 F11"], poly: R(x, 101, x + t, GLASS_TOP), runs: GLASS_RUNS,
    note: i === 0 ? "6/14 Ar/4/14 Ar/8.76 = 46.8 in the 48 rebate; Ug ≈ 0.55–0.6; ≈ 47 kg/m², sash ≈ 310 kg (≤ 400 kg drive). Dry-glazed for the year-30 IGU change." : undefined });
add({ id: "sash-top", kEq: 0.12, name: "Sash top rail + bead (77 + 23)", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4"], poly: R(147, GLASS_TOP, 259, SASH_TOP), runs: GLASS_RUNS });
add({ id: "head-frame", kEq: 0.12, name: "Head frame member 42; 16 lift / guide clearance to the sash below", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4"], poly: R(0, SASH_TOP + 16, 259, FRAME_TOP), runs: OPEN });
add({ id: "head-frame-leg", kEq: 0.12, name: "Head frame exterior guide leg + gasket to the sash face (closes the 16 mm lift clearance)", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4", "ENS-K03"],
  poly: R(120, SASH_TOP - 72, 147, SASH_TOP + 16), runs: GLASS_RUNS });
add({ id: "door-jamb-a", kEq: 0.12, name: "Jamb frame + sash stile, sightline 165 (U_f 0.86, f_Rsi 0.71)", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4"],
  axis: "x", x: [0, 259], poly: R(0, 0, 165, SASH_TOP + 16) });
if (L > 2340) add({ id: "door-interlock", kEq: 0.12, name: "Interlock 120 (U_f 1.19, f_Rsi 0.70)", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4"], axis: "x", x: [0, 259], poly: R(2340, 0, 2460, SASH_TOP + 16) });
if (L > 4635) add({ id: "door-jamb-b", kEq: 0.12, name: "Jamb frame, fixed side", role: "frame", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §4"], axis: "x", x: [0, 259], poly: R(4635, 0, OPEN_W, SASH_TOP + 16) });
add({ id: "door-unit", name: "Door unit A1–A3 excluding glass: wood-Al frame, lift-slide hardware, SIEGENIA drive (carrier)", role: "frame", mat: "door-unit-woodalu", junction: "D", src: ["14 §7"],
  type: "virtual", m3PerMetre: 75 / 1000, note: "≈ 27 kgCO2e/m² of opening × 2.785 m (frame 15 + hardware 5 + drive 7, mid values, INFERRED); no product EPD — require EN 15804+A2 in the tender." });
add({ id: "drive", kEq: 0.5, name: "SIEGENIA DRIVE axxent HSA slide drive, room side on the frame head (≈ 45), jam protection by current limit, manual key", role: "metal", mat: "aluminium", nocarbon: true, junction: "D", src: ["14 §6", "R3 N3"],
  poly: R(200, FRAME_TOP, 259, FRAME_TOP + 50), runs: OPEN, note: "Dedicated 120 V circuit to the fixed-panel jamb; push buttons 900–1100 on both faces (B651 5.2.7.1); exterior button cable in a sealed grommet above the pan end dam." });

// =================== Floor-band head (research 13 §4: FB1–FB30) ===================
const TOPY = APP ? 6200 : 3700;                        // top of the drawn upper wall
const G0 = 2780, G1 = 3464;                            // glulam underside / top (175 → 215 wide to meet the 259 frame: 13 §3.3 "215 x 684 if the roof share > 3 m")
const CTT = (x) => 2792 - 0.06 * (24 - x);           // head cant top, 6 % out (13 FB14)
const CANOPY = [[-150, Math.min(L, OPEN_W + 150)]];
const FT = (x) => 2960 - 14.1 - 0.02 * (-94 - x);       // canopy framing top (deck + cap above), 2 % out
const LT = FT(-94) + 12.5;                             // ledger top = deck top at the wall
add({ id: "head-gap-fill", name: "Stone-wool strip in the 12 head gap (no foam)", role: "thermal", mat: "comfortbatt", junction: "H", src: ["13 FB10", "11 H6"], poly: R(25, FRAME_TOP, 200, FRAME_TOP + 12), runs: OPEN });
add({ id: "head-ground", name: "D.Fir fixing ground 38, shimmed level ±1 mm, screwed to the glulam soffit after dead load", role: "frame", mat: "softwood-lumber", junction: "H", src: ["13 FB4", "R1 N5"], poly: R(25, FRAME_TOP + 12, 200, G0), runs: OPEN });
add({ id: "glulam", name: "Glulam header DF-L 24f-E 215 x 684, flush, joists hung (≤ 3 mm incl. creep: engineer)", role: "frame", mat: "glulam", junction: "H", src: ["13 §3", "11 H1"],
  poly: R(25, G0, 240, G1), runs: [[-145, Math.min(L, OPEN_W + 145)]],
  note: "Stacked-stud / built-up header rejected: 30–40 mm deflection at this span (13 §3.2). Bears 114 on 3 jacks + 2 kings per side." });
add({ id: "head-tape-ext", name: "Vapour-open window tape: frame face, loop over the gap, up the ground and glulam face (WRB laps over)", role: "air", mat: "membrane-poly", junction: "H", src: ["13 FB11", "R1 F5"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[-0.25, 2705], [-0.25, FRAME_TOP + 0.25], [24.75, FRAME_TOP + 0.25], [24.75, 2800]] });
add({ id: "head-tape-int", name: "Interior airtight tape (vapour-retarding), frame to glulam, 10 mm loop", role: "air", mat: "membrane-poly", junction: "H", src: ["13 FB12", "11 H7"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[259.25, 2700], [259.25, G0 + 0.25], [240.25, G0 + 0.25]] });
add({ id: "head-block", name: "Stone-wool board 30 in front of the frame head (P9: interior head f_Rsi 0.67 → ≈ 0.91)", role: "thermal", mat: "comfortboard-80", junction: "H", src: ["13 FB13", "R1 P9"],
  poly: [[-30, 2690], [-0.5, 2690], [-0.5, FRAME_TOP + 0.5], [24, FRAME_TOP + 0.5], [24, 2758], [-30, 2758]], runs: OPEN });
add({ id: "head-cant", name: "PT head cant, 6 % outward", role: "frame", mat: "softwood-pt", junction: "H", src: ["13 FB14", "VBBL 9.27.3.8(4)"], poly: [[-150, 2758], [24, 2758], [24, CTT(24)], [-150, CTT(-150)]], runs: OPEN });
add({ id: "head-subflash", name: "Self-adhered head sub-flash, WRB lapped over it ≥ 75 (inboard piece)", role: "water", mat: "membrane-poly", junction: "H", src: ["13 FB15", "R1 N4"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[23.75, 2860], [23.75, CTT(23.75) + 0.25], [-124.5, CTT(-124.5) + 0.25]], cuts: ["canopy-pad"] });
add({ id: "head-drip", name: "Charcoal 24 ga drip (outboard piece only: no steel touches the header), kick 10 past the liner", role: "water", mat: "steel-prefinished", junction: "H", src: ["13 FB16", "R1 N4", "R5 N5"],
  type: "sheet", t: 0.61, runs: OPEN, path: [[-125, CTT(-125) + 0.305], [-150.45, CTT(-150.45) + 0.305], [-150.45, 2754], [-160, 2750]] });
add({ id: "cassette", kEq: 1, name: "ZIP screen cassette 160 x 118 in the head reveal, charcoal, 6 % solar mesh (west; zone reserved east)", role: "metal", mat: "aluminium", fill: 0.25, junction: "H", src: ["13 FB30", "13 §4.4", "R5 N4"],
  poly: R(-150, 2608, -32, 2758), runs: OPEN, note: "4.8 m needs a 140/180-class system (Renson Fixscreen 150 evo class, WK3). Guides inside the liners; bottom bar to the tray. Doubles as the insect screen when the wall is open." });
add({ id: "wrb", name: "Vapour-permeable self-adhered WRB / primary air barrier, folded loop over the floor-line gap", role: "air", mat: "membrane-poly", junction: "H", src: ["13 FB9"],
  type: "sheet", t: 0.5, runs: [[0, L]], path: [[24.25, 2742.5], [24.25, TOPY]] });
add({ id: "wf-band", name: "Wood-fibre board 80 over the glulam and upper wall (joints offset from the sheathing gap)", role: "thermal", mat: "woodfibre-board", junction: "H", src: ["13 FB17", "09 W1"],
  poly: [[-56, CTT(-56) + 0.5], [23.5, CTT(23.5) + 0.5], [23.5, TOPY], [-56, TOPY]], runs: [[0, cut(3)]], cuts: ["canopy-pad", "canopy-plate"] });
// Canopy: 656 from the cedar, soffit 2800, 2 % out, three knife-plate brackets on thermal-break pads (13 §4.6, FB18–FB25).
add({ id: "canopy-pad", per: "opening", name: "Structural thermal-break pad 15 (Armatherm FRR class) under each bracket", role: "thermal", mat: "pu-structural", junction: "H", src: ["13 FB18"],
  poly: R(9, 2800, 24, 3100), runs: [[220, 380]] });
add({ id: "canopy-plate", per: "opening", name: "HDG back plate 10, 4 x Ø10 screws into the glulam (Part 4)", role: "metal", mat: "steel-section", junction: "H", src: ["13 FB18"], poly: R(-1, 2800, 9, 3100), runs: [[220, 380]] });
add({ id: "canopy-knife", per: "opening", name: "HDG knife plate 10, 120 → 90 deep", role: "metal", mat: "steel-section", junction: "H", src: ["13 FB19"],
  poly: [[-1, 2819], [-740, 2819], [-740, 2909], [-1, 2939]], runs: [[295, 305]], embeds: ["canopy-frame", "canopy-ledger", "wf-band"] });
add({ id: "canopy-ledger", name: "PT ledger 38 x 184 on the head cant, slotted at the knife plates", role: "frame", mat: "softwood-pt", junction: "H", src: ["13 FB20"],
  poly: [[-94, CTT(-94) + 0.5], [-56, CTT(-56) + 0.5], [-56, LT], [-94, LT]], runs: CANOPY });
add({ id: "canopy-frame", name: "PT outriggers either side of each knife plate + purlins at 400", role: "frame", mat: "softwood-pt", fill: 0.25, junction: "H", src: ["13 FB21"],
  poly: [[-94, 2819], [-750, 2819], [-750, FT(-750)], [-94, FT(-94)]], runs: CANOPY });
add({ id: "canopy-deck", name: "Plywood deck 12.5 + self-adhered membrane", role: "frame", mat: "plywood", junction: "H", src: ["13 FB22"],
  poly: [[-94, FT(-94)], [-750, FT(-750)], [-750, FT(-750) + 12.5], [-94, FT(-94) + 12.5]], runs: CANOPY });
add({ id: "canopy-cap", name: "Charcoal 24 ga flat-lock cap, upstand 100+ behind the strapping, hemmed drip at the tip", role: "water", mat: "steel-prefinished", junction: "H", src: ["13 FB22", "13 FB23", "06 B15"],
  type: "sheet", t: 0.6, runs: CANOPY, path: [[-56.3, 3080], [-56.3, LT + 0.3], [-94, LT + 0.3], [-757.3, FT(-757.3) + 12.8], [-757.3, 2950]],
  note: "Through-insulation sub-flash on a 6 % bevel in a horizontal WF joint at ≈ 2976, lapped under the WRB (FB23, not drawn)." });
add({ id: "canopy-soffit", name: "Honey cedar soffit 19 (sheltered)", role: "cladding", mat: "cedar-soffit", junction: "H", src: ["13 FB24", "R5 palette"], poly: R(-750, 2800, -94, 2819), runs: CANOPY });
add({ id: "canopy-fascia", name: "Charcoal fascia (caps the picture frame)", role: "metal", mat: "steel-prefinished", junction: "H", src: ["13 FB24"], poly: R(-757, 2795, -750, FT(-757.6) + 12.4), runs: CANOPY });
// Above the canopy: strapping, screened vent, cedar continuous across the floor line (FB26–FB28).
const STRAP_B = STRAPS.filter(([a]) => a >= 0 && a < cut(4));
add({ id: "strap-band", name: "PT strapping 19 x 64 (cavity), from above the cap upstand", role: "frame", mat: "softwood-pt", junction: "H", src: ["13 FB26", "09 W1"], poly: R(-75, 3080, -56, TOPY), runs: STRAP_B });
add({ id: "band-screen", name: "Black stainless insect screen ≤ 2 mm across the cavity bottom over the canopy", role: "metal", mat: "stainless", junction: "H", src: ["13 FB27", "08 L"],
  type: "sheet", t: 0.5, runs: [[0, cut(4)]], path: [[-56.6, 2985.25], [-74.75, 2985.25]] });
add({ id: "cedar-band", name: "WRC channel siding 19, first course 2975 (≈ 15 above the cap)", role: "cladding", mat: "cedar-siding", junction: "H", src: ["13 FB28", "09 W1"], poly: R(-94, 2975, -75, TOPY), runs: [[0, cut(5)]] });

// =================== Upper floor and wall (13 FB5–FB8; 09 W1) ===================
const JST_B = JOISTS.filter(([a]) => a >= -145), JST_J = JOISTS.filter(([, b]) => b <= -145);
add({ id: "joists", name: "302 I-joists at 400 on face-mount hangers to the glulam", role: "frame", mat: "softwood-lumber", fill: 0.35, junction: "U", src: ["13 FB5"], poly: R(240, 3162, 2500, G1), runs: JST_B });
add({ id: "joists-jz", per: "opening", name: "I-joists over the jamb wall (bearing on the top plates)", role: "frame", mat: "softwood-lumber", fill: 0.35, junction: "U", src: ["13 FB5"], poly: R(177.5, 3162, 2500, G1), runs: JST_J });
add({ id: "ceiling", name: "Gypsum ceiling 12.7 on the joists (glulam face exposed)", role: "frame", mat: "gypsum", junction: "U", src: ["13 4.1"], poly: R(240, 3149.3, 2500, 3162), runs: [[-145, Math.min(L, OPEN_W + 145)]] });
add({ id: "ceiling-jz", per: "opening", name: "Gypsum ceiling (jamb zone)", role: "frame", mat: "gypsum", junction: "U", src: ["13 4.1"], poly: R(190.2, 3149.3, 2500, 3162), runs: MB([[SPAN[0], -145]]) });
add({ id: "subfloor", name: "Subfloor 19 T&G, glued and screwed over joists and glulam", role: "frame", mat: "plywood", junction: "U", src: ["13 FB6"], poly: R(37.5, G1, 2500, G1 + 19) });
add({ id: "upper-plate", name: "LSL bottom plate 38 x 140", role: "frame", mat: "softwood-lumber", junction: "U", src: ["13 FB7"], poly: R(37.5, G1 + 19, 177.5, G1 + 57) });
add({ id: "upper-core", name: "Upper wall 2x6 at 400 + dense-pack cellulose (6 mil poly inside)", role: "thermal", mat: "cellulose-dense", junction: "U", src: ["09 W1", "13 FB7"], poly: R(37.5, G1 + 57, 177.5, TOPY), runs: [[SPAN[0], cut(2)]] });
add({ id: "upper-gyp", name: "Gypsum 12.7 (upper wall)", role: "frame", mat: "gypsum", junction: "U", src: ["09 W1"], poly: R(177.5, G1 + 19, 190.2, TOPY), runs: [[SPAN[0], cut(1)]] });
add({ id: "upper-ply", name: "Plywood sheathing 12.5, 3 mm gap above the glulam (shrinkage)", role: "frame", mat: "plywood", junction: "U", src: ["13 FB8"], poly: R(24.9, G1 + 3, 37.5, TOPY), runs: [[0, cut(2)]] });

// =================== Jamb A wall (09 §9.1 base of wall with W1, mapped to these datums; R5 N3, R1 N7, R3 N12) ===================
// Concrete stem to +300 (≥ 300 above the paving), plinth EPS 100 + parge 12, stainless base flashing dripping at −107,
// cellular-glass strip, then WF 80, strapping, cedar from +305. Wall layers stop 1 mm short of the reveal liner (w −1).
const JW = MB([[SPAN[0], -1]]);
const PLT = (x) => 301 - 0.06 * (25 - x);              // plinth top / flashing bed, 6 % out
add({ id: "jamb-stem", per: "opening", name: "Concrete stem on the beam to +300, interior face at the gypsum line", role: "concrete", mat: "concrete-f2-40scm", junction: "Z", src: ["09 §9.1", "06 A.1"],
  poly: [[37, -193], [SLOT_BACK, -193], [SLOT_BACK, -100], [190.2, -100], [190.2, 300], [37, 300]], runs: JZ });
add({ id: "slab-jz", per: "opening", name: "Slab inside the jamb wall", role: "concrete", mat: "concrete-lowcarbon", junction: "F", src: ["12 build-up"], poly: R(190.2, -100, SLOT_BACK + 26.6, 0), runs: JZ });
add({ id: "plinth-insul", per: "opening", name: "Plinth graphite EPS 100 on the stem, top cut to 6 %", role: "thermal", mat: "graphite-eps", junction: "Z", src: ["09 §9.1"],
  poly: [[-63, -193], [36.5, -193], [36.5, 299.9], [23.9, 299.9], [23.9, PLT(23.9) - 0.3], [-63, PLT(-63) - 0.3]], runs: JW });
add({ id: "jamb-parge", per: "opening", name: "Charcoal mineral parge 12 (RGB 78,78,76), to 186 below grade", role: "concrete", mat: "parge-charcoal", junction: "Z", src: ["09 §9.1", "R5 N3"],
  poly: [[-75, -193], [-63, -193], [-63, PLT(-63) - 0.3], [-75, PLT(-75) - 0.3]], runs: JW });
add({ id: "sill-transition", per: "opening", name: "Self-adhered transition membrane: sheathing face over the sill joint, 75 onto the stem", role: "water", mat: "membrane-poly", junction: "Z", src: ["09 §9.1"],
  type: "sheet", t: 0.5, runs: JW, path: [[24.75, 380], [24.75, 300.25], [36.75, 300.25], [36.75, 225]] });
add({ id: "base-flashing", per: "opening", name: "Stainless base flashing: upstand to +360, 6 % over the plinth, drip at −107 (13 past the cedar)", role: "water", mat: "stainless", junction: "Z", src: ["09 §9.1", "06 A11"],
  type: "sheet", t: 0.6, runs: MB([[SPAN[0], -56]]), path: [[24.2, 360], [24.2, PLT(24.2)], [-107, PLT(-107)], [-107, PLT(-107) - 8]] });
add({ id: "base-flashing-r", per: "opening", name: "Base flashing behind the liner cheek, end dam turned up inside the liner", role: "water", mat: "stainless", junction: "Z", src: ["09 §9.1", "R5 N5"],
  type: "sheet", t: 0.6, runs: MB([[-56, -1]]), path: [[24.2, 360], [24.2, PLT(24.2)], [-93.9, PLT(-93.9)]] });
add({ id: "sill-plate", per: "opening", name: "PT sill 38 x 140 on gasket + EPDM sill membrane", role: "frame", mat: "softwood-pt", junction: "Z", src: ["09 §9.1"], poly: R(37.5, 300, 177.5, 341), runs: JZ });
add({ id: "jamb-posts", per: "opening", name: "3 jacks + 2 kings carrying the glulam", role: "frame", mat: "softwood-lumber", fill: 0.9, junction: "Z", src: ["13 FB1"], poly: R(37.5, 341, 177.5, G0), runs: MB([[-145, 0]]) });
add({ id: "jamb-core", per: "opening", name: "Jamb wall 2x6 at 400 + dense-pack cellulose, plates and rim to the floor", role: "thermal", mat: "cellulose-dense", junction: "Z", src: ["09 W1"], poly: R(37.5, 341, 177.5, G1), runs: MB([[SPAN[0], -145]]) });
add({ id: "jamb-ply", per: "opening", name: "Plywood sheathing 12.5 (bottom at the sill underside, never on concrete)", role: "frame", mat: "plywood", junction: "Z", src: ["09 §9.1", "06 A10"], poly: R(25, 300.5, 37.5, G1), runs: MB([[SPAN[0], -145]]) });
add({ id: "jamb-ply-p", per: "opening", name: "Plywood sheathing on the posts", role: "frame", mat: "plywood", junction: "Z", src: ["09 §9.1"], poly: R(25, 300.5, 37.5, G0), runs: MB([[-145, -1]]) });
add({ id: "jamb-gyp", per: "opening", name: "Gypsum 12.7 on the jamb wall (poly behind), above the 300 concrete curb", role: "frame", mat: "gypsum", junction: "Z", src: ["09 W1"], poly: R(177.5, 300, 190.2, 3149), runs: MB([[SPAN[0], -145]]) });
add({ id: "jamb-gyp-p", per: "opening", name: "Gypsum 12.7 on the posts, to the exposed glulam", role: "frame", mat: "gypsum", junction: "Z", src: ["09 W1"], poly: R(177.5, 300, 190.2, G0), runs: MB([[-145, 0]]) });
add({ id: "jamb-wrb", per: "opening", name: "Breather membrane, shingle-lapped over the flashing upstand ≥ 50", role: "air", mat: "membrane-poly", junction: "Z", src: ["09 §9.1", "VBBL 9.27.3.8"],
  type: "sheet", t: 0.5, runs: JW, path: [[23.65, 310], [23.65, TOPY]] });
add({ id: "jamb-cg-strip", per: "opening", name: "Cellular-glass strip 80 x 50 on the flashing (keeps the wood fibre out of splash)", role: "thermal", mat: "cellular-glass", junction: "Z", src: ["09 §9.1"],
  poly: [[-56, PLT(-56) + 0.3], [23.4, PLT(23.4) + 0.3], [23.4, 355], [-56, 355]], runs: JW });
add({ id: "jamb-wf", per: "opening", name: "Wood-fibre board 80 (jamb wall)", role: "thermal", mat: "woodfibre-board", junction: "Z", src: ["09 W1"], poly: R(-56, 355, 23.4, TOPY), runs: JW });
// Cladding on the jamb wall; beside the reveal (w −150…−1) it stops under the canopy ledger.
const FULL = MB([[SPAN[0], -150]]), REV = MB([[-150, -1]]);
const STRAP_FULL = MB(STRAPS.filter(([, b]) => b <= -150)), STRAP_REV = MB([[-130, -66]]);
for (const [id, x0, x1, y0, name, role, mat, runsF, runsR] of [
  ["strap", -75, -56, 312, "PT strapping 19 x 64, bottom 10 above the flashing", "frame", "softwood-pt", STRAP_FULL, STRAP_REV],
  ["cedar", -94, -75, 305, "WRC channel siding 19, bottom +305, end grain sealed 8 back from the liner", "cladding", "cedar-siding", FULL, REV]]) {
  add({ id: `jamb-${id}`, per: "opening", name, role, mat, junction: "Z", src: ["09 §9.1", "R5 N5"], poly: R(x0, y0, x1, TOPY), runs: runsF });
  add({ id: `jamb-${id}-r`, per: "opening", name: `${name} (beside the reveal, below the canopy)`, role, mat, junction: "Z", src: ["09 §9.1"], poly: R(x0, y0, x1, 2780), runs: runsR });
  add({ id: `jamb-${id}-u`, per: "opening", name: `${name} (beside the reveal, above the canopy)`, role, mat, junction: "Z", src: ["09 §9.1"], poly: R(x0, id === "strap" ? 3080 : 2975, x1, TOPY), runs: runsR });
}
add({ id: "jamb-screen", per: "opening", name: "Black stainless insect screen at the cavity base", role: "metal", mat: "stainless", junction: "Z", src: ["06 A13"], type: "sheet", t: 0.5, runs: JW, path: [[-56, 311.75], [-75, 311.75]] });
// Picture frame: charcoal reveal liners 150 deep, 56 proud of the cedar (13 §4.5, R5 P3).
add({ id: "liner-jamb-a", name: "Charcoal PVDF reveal liner, jamb A, x 0 → −150", role: "metal", mat: "steel-prefinished", junction: "Z", src: ["13 FB29", "R5 P3"], axis: "x", x: [-94, 0], poly: R(-1, 5, 0, 2754) });
add({ id: "liner-frame-a", name: "Liner outer cheek, 56 proud of the cedar (hollow)", role: "metal", mat: "steel-prefinished", fill: 0.05, junction: "Z", src: ["13 FB29"], axis: "x", x: [-150, -94], poly: R(-56, 5, 0, 2754) });
if (APP) {
  add({ id: "liner-jamb-b", name: "Charcoal PVDF reveal liner, jamb B", role: "metal", mat: "steel-prefinished", junction: "Z", src: ["13 FB29"], axis: "x", x: [-94, 0], poly: R(OPEN_W, 5, OPEN_W + 1, 2754) });
  add({ id: "liner-frame-b", name: "Liner outer cheek, jamb B", role: "metal", mat: "steel-prefinished", fill: 0.05, junction: "Z", src: ["13 FB29"], axis: "x", x: [-150, -94], poly: R(OPEN_W, 5, OPEN_W + 56, 2754) });
}
// Downspout from the roof above into the water-corner basin (R3 P1, R5 P2).
add({ id: "downspout", per: "opening", name: "Charcoal downspout from the roof above, on the jamb-A cedar", role: "water", mat: "steel-prefinished", junction: "J", src: ["R5 P2", "R3 P1"],
  type: "rod", axis: "y", x: -144, w: [-450], d: 100, di: 96, from: 640, to: TOPY, embeds: ["spout"] });
add({ id: "spout", per: "opening", name: "Spout throwing roof water into the basin (≈ 600 off the wall)", role: "water", mat: "steel-prefinished", junction: "J", src: ["10 §3.6", "R5 P2"],
  type: "rod", axis: "x", w: [-450], y: 600, dy: 60, d: 100, di: 96, from: -760, to: -144 });

// =================== Exterior ground v3: one granite ground, water corner at jamb A ===================
// Lap-2 sources: R2 N1–N5, N9; R3 N1, N6, F7, P1, P2; R5 N2, N3, N8, P1, P2; R4 P1, P3, N12. User: "water corner — make the change".
// Separation by geometry (R2 N2): the trench channel drains by its own solid pipe inside the drain envelope; the landing
// liner is never pierced; the downspout feeds a stone basin at jamb A, then an open granite rill and a runnel to the rain garden.
const FALL = 1 / 60;                                   // landing 1:60 (R3: tolerance under the 2 % limit)
const PT = (x) => -7 - FALL * (CH_OUT - x);            // paving top: −7 at the channel = landing tray top (14 §3.2)
const MOD = 156;                                       // paving module from the channel lip (R5 N8: 150 planks + 6 joints)
const LINER_END = CH_OUT - 11 * MOD, CURB1 = LINER_END - MOD, PATH_END = CH_OUT - 20 * MOD, BED0 = PATH_END - 150;
const LIN_W = [[0, Math.min(L, OPEN_W)]];              // lined landing in front of the opening; its w-end upturns wrap the channel end caps
const PBL = (x) => PT(x) - 260, PBT = (x) => PT(x) - 280;
const FOOT = -530, ROCK_OUT = -400, PD_X = -185, PD_Y = -475;   // R2 N5: rectangular beam to −530, drain cover 152
const UD_X = [-1700, -1870];                           // 30 deep trench in the liner floor for the underdrain (R2 N4)
const B = [[LINER_END + 2, PT(LINER_END + 2) - 110], [LINER_END + 2, PBL(LINER_END + 2) - 30], [UD_X[0], PBL(UD_X[0]) - 30],
  [UD_X[0] + 30, PBL(UD_X[0] + 30)], [CH_OUT - 2, PBL(CH_OUT - 2)], [CH_OUT - 2, PT(CH_OUT - 2) - 60]];
const LINER_OUT = offsetPath(B, -2);
// Water corner (jamb A, w < 0): basin, rill, clapper slab, runnel (R5 P2, R3 P1, R2 N1/N2 option B).
const BASIN = { x: [-500, -1100], w: [-750, -150] };
const RILL_W = [-535, -365], RILL_WALLS = [[-585, -535], [-365, -315]], RILL_ALL = [[-585, -315]];
const RF = (x) => -145 - 0.01 * (BASIN.x[1] - x);      // rill floor top: −145 at the basin outlet, 1 % (R2 N2)
const CLAP = [CH_OUT - 10 * MOD, CH_OUT - 18 * MOD];   // 1248 granite clapper slab where the route along the wall crosses (R3 P1)
const RILL_CUTS = ["rill-walls", "rill-floor", "rill-void", "clapper"];
const BASIN_CUTS = ["basin-void"];                   // one void = the basin's outer box (coincident faces defeat sequential cuts)

add({ id: "liner", name: "1.0 mm HDPE liner between 407 g/m² geotextiles; underdrain trench; cut-off at 1.89 m", role: "water", mat: "hdpe", junction: "M", src: ["08b M", "R2 N2", "R2 N4", "R4"],
  type: "sheet", t: 2, path: offsetPath(B, -1), runs: LIN_W,
  note: "Never pierced by surface water: the channel drains by its own solid pipe and the rill starts at jamb A outside the liner. w-end upturns wrap the channel end caps; the underdrain leaves through one welded boot in the w = 0 upturn (R2 N2, N4, N10)." });
add({ id: "pavers-lined", name: "Reclaimed granite planks 60 (150 wide, random 300–900, coursed parallel to the glass), joints 6, BPN ≥ 55", role: "ground", mat: "reclaimed-stone", junction: "M", src: ["08b M12", "R5 P1", "R4 P3"],
  poly: [[CH_OUT, PT(CH_OUT)], [LINER_END, PT(LINER_END)], [LINER_END, PT(LINER_END) - 60], [CH_OUT, PT(CH_OUT) - 60]], runs: LIN_W });
add({ id: "bedding-lined", name: "No. 8 open-graded bedding 50", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT - 2, PT(CH_OUT - 2) - 60], [LINER_END + 2, PT(LINER_END + 2) - 60], [LINER_END + 2, PT(LINER_END + 2) - 110], [CH_OUT - 2, PT(CH_OUT - 2) - 110]], runs: LIN_W });
add({ id: "base-lined", name: "No. 57 open-graded base 150 on the liner", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT - 2, PT(CH_OUT - 2) - 110], ...B.slice(0, 5)], runs: LIN_W, cuts: ["underdrain"] });
const UD_Y = PBL(-1785) - 30 + 2 + 55, UD_FALL = 0.005;
add({ id: "underdrain", name: "Perforated HDPE underdrain 100 in the liner trench, 0.5 % to jamb A, cleanout at the high end", role: "drainage", mat: "hdpe", junction: "M", src: ["R2 N4", "08b M"],
  type: "rod", axis: "w", x: -1785, y: UD_Y, dy: UD_FALL * (LIN_W[0][1] - 0), d: 110, di: 102, from: 0, to: LIN_W[0][1], embeds: ["jz-base", "underdrain-out"],
  note: "R2 asked 1 %; 0.5 % fits the 30 mm trench over a 4.9 m run (INFERRED minimum for a perforated subdrain)." });
add({ id: "underdrain-out", per: "opening", name: "Solid HDPE outlet from the underdrain to its own storm-sump inlet with a backwater valve", role: "drainage", mat: "hdpe", junction: "M", src: ["R2 N4", "Book II 2.4.5.3 via 08b"],
  type: "rod", axis: "w", x: -1785, y: UD_Y - UD_FALL * (0 - SPAN[0]), dy: UD_FALL * (0 - SPAN[0]), d: 110, di: 100, from: SPAN[0], to: 0, embeds: ["base-lined"] });

// Foundation edge and drainage envelope (R2 N5).
add({ id: "perim-rock", name: "Clear crushed drain stone envelope (19 mm, ≤ 10 % passing 4 mm)", role: "drainage", mat: "aggregate", junction: "E", src: ["R2 2", "R2 N5", "07 E9"],
  poly: [[-97, FOOT], [-97, -193], [LINER_OUT[5][0], -193], [LINER_OUT[5][0], LINER_OUT[4][1]], [ROCK_OUT, PBL(ROCK_OUT) - 2], [ROCK_OUT, FOOT]], runs: LIN_W,
  cuts: ["perim-drain", "channel-drop", "channel-pipe"] });
add({ id: "perim-rock-jz", per: "opening", name: "Drain stone envelope in front of the jamb wall", role: "drainage", mat: "aggregate", junction: "E", src: ["R2 N5", "07 E9"],
  poly: [[-97, FOOT], [-97, PBT(-97)], [ROCK_OUT, PBT(ROCK_OUT)], [ROCK_OUT, FOOT]], runs: JZ, cuts: ["perim-drain", "channel-pipe"] });
add({ id: "perim-geotextile", name: "Nonwoven geotextile wrapping the drain envelope", role: "drainage", mat: "geotextile-pp", junction: "E", src: ["07 E9"],
  type: "sheet", t: 0.5, runs: LIN_W, path: [[ROCK_OUT - 0.25, PBL(ROCK_OUT) - 2.01], [ROCK_OUT - 0.25, FOOT - 0.25], [-97, FOOT - 0.25]] });
add({ id: "perim-geotextile-jz", per: "opening", name: "Nonwoven geotextile wrapping the drain envelope (jamb)", role: "drainage", mat: "geotextile-pp", junction: "E", src: ["07 E9"],
  type: "sheet", t: 0.5, runs: JZ, path: [[ROCK_OUT - 0.25, PBT(ROCK_OUT - 0.5)], [ROCK_OUT - 0.25, FOOT - 0.25], [-97, FOOT - 0.25]] });
add({ id: "perim-drain", name: "Perforated HDPE drain 100 at the footing base (invert −526, cover 152), own solid outlet to the storm sump", role: "drainage", mat: "hdpe", junction: "E", src: ["R2 2", "R2 N5", "VBBL 9.14.2.1", "07 E8"],
  type: "rod", axis: "w", x: PD_X, y: PD_Y, d: 110, di: 102, from: SPAN[0], to: L,
  note: "Cleanouts at the corners; storm sump ≥ 750 deep with separate inlets for this drain and the underdrain (9.14.5 via 07 E10). Never linked to the channel, underdrain or sub-slab stone." });
const CP_X = -134.25, CP_Y = -330;                    // 63 mm fits between the liner upturn (−171.5) and the beam EPS (−97)
// Trench channel outlet: bottom outlet near the jamb-A end, solid pipe down into the envelope and along the wall to the storm sump.
add({ id: "channel-drop", per: "opening", name: "Channel bottom outlet, solid HDPE 63 (jointless through the envelope)", role: "drainage", mat: "hdpe", junction: "T", src: ["R2 N2", "R2 N3"],
  type: "rod", axis: "y", x: CP_X, w: [75], d: 63, di: 57, from: CP_Y, to: -120, embeds: ["channel-pipe"] });
const CP_FALL = 0.01;
add({ id: "channel-pipe", per: "opening", name: "Solid HDPE 63 from the channel to its own storm-sump inlet, 1 % (R2 N3 second outlet)", role: "drainage", mat: "hdpe", junction: "T", src: ["R2 N2", "R2 N3", "08 J12"],
  type: "rod", axis: "w", x: CP_X, y: CP_Y - CP_FALL * (106.5 - SPAN[0]), dy: CP_FALL * (106.5 - SPAN[0]), d: 63, di: 57, from: SPAN[0], to: 106.5,
  note: "Channel catchment is the landing strip and glass wash only (roof water goes to the basin); 63 mm is INFERRED adequate — confirm with the channel maker." });

// Jamb-zone ground (w < 0): granite 80 on bedding and base over the drain envelope, cut by the basin and rill.
const JZ_X0 = JPF;                                     // paving abuts the jamb plinth face
add({ id: "jz-pavers", per: "opening", name: "Reclaimed granite planks 80 in front of jamb A", role: "ground", mat: "reclaimed-stone", junction: "P", src: ["R5 P1"],
  poly: [[JZ_X0, PT(JZ_X0)], [LINER_END, PT(LINER_END)], [LINER_END, PT(LINER_END) - 80], [JZ_X0, PT(JZ_X0) - 80]], runs: JZ, cuts: [...BASIN_CUTS, ...RILL_CUTS] });
add({ id: "jz-bedding", per: "opening", name: "No. 8 bedding 50 (jamb)", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
  poly: [[JZ_X0, PT(JZ_X0) - 80], [LINER_END, PT(LINER_END) - 80], [LINER_END, PT(LINER_END) - 130], [JZ_X0, PT(JZ_X0) - 130]], runs: JZ, cuts: [...BASIN_CUTS, ...RILL_CUTS] });
add({ id: "jz-base", per: "opening", name: "No. 57 base 150 (jamb), drains into the envelope", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
  poly: [[JZ_X0, PT(JZ_X0) - 130], [LINER_END, PT(LINER_END) - 130], [LINER_END, PBT(LINER_END)], [-97, PBT(-97)], [-97, -193], [JZ_X0, -193]], runs: JZ,
  cuts: [...BASIN_CUTS, ...RILL_CUTS, "channel-pipe", "underdrain-out"] });

// Liner edge: granite curbstone with the root barrier cast into its underside (R3 F7 gaps 1–2).
const curbPoly = (x0, x1) => [[x0, PT(x0)], [x1, PT(x1)], [x1, PBT(x1) - 20], [x0, PBT(x0) - 20]];
add({ id: "liner-edge-curb", name: "Reclaimed granite curbstone on edge 150, at the liner cut-off", role: "ground", mat: "reclaimed-stone", junction: "M", src: ["R3 F7", "R5 N8"],
  poly: curbPoly(LINER_END, CURB1), cuts: RILL_CUTS });
const RBL_X = LINER_END - MOD / 2;
add({ id: "root-barrier-liner", name: "Ribbed HDPE root barrier, top cast 20 into the curb, to −700", role: "planting", mat: "hdpe", junction: "M", src: ["08b M16", "R3 F7"],
  type: "sheet", t: 2, path: [[RBL_X, PBT(RBL_X)], [RBL_X, -700]], embeds: ["liner-edge-curb"] });
// Terrace: granite 80 (one ground), shrub pocket at jamb B in appearance mode.
const POCK = { x: [CH_OUT - 13 * MOD, BED0], w: [4950, 5950], wIn: [5100, 5800] };
const POCK_CUTS = APP ? ["pocket-curb-h", "pocket-curb-s", "pocket-soil"] : [];
add({ id: "pavers-t", name: "Reclaimed granite planks 80, coursed parallel to the glass", role: "ground", mat: "reclaimed-stone", junction: "P", src: ["R4 P3", "R5 P1", "08 H7"],
  poly: [[CURB1, PT(CURB1)], [PATH_END, PT(PATH_END)], [PATH_END, PT(PATH_END) - 80], [CURB1, PT(CURB1) - 80]], cuts: [...RILL_CUTS, ...POCK_CUTS] });
add({ id: "bedding-t", name: "No. 8 bedding 50", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
  poly: [[CURB1, PT(CURB1) - 80], [PATH_END, PT(PATH_END) - 80], [PATH_END, PT(PATH_END) - 130], [CURB1, PT(CURB1) - 130]], cuts: [...RILL_CUTS, ...POCK_CUTS] });
add({ id: "base-t", name: "No. 57 base 150 on compacted subgrade (infiltrating beyond 1.9 m)", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
  poly: [[CURB1, PT(CURB1) - 130], [PATH_END, PT(PATH_END) - 130], [PATH_END, PBT(PATH_END)], [CURB1, PBT(CURB1)]], cuts: [...RILL_CUTS, ...POCK_CUTS] });
const EDGE_RUNS = APP ? [[SPAN[0], POCK.w[0]], [POCK.w[1], SPAN[1]]] : [SPAN];
const RBE_RUNS = APP ? [[SPAN[0], POCK.w[0] + 74], [POCK.wIn[1] + 76, SPAN[1]]] : [SPAN];   // meets the pocket side barriers
add({ id: "edge-restraint", name: "Reclaimed granite curbstone on edge 150 (path edge)", role: "ground", mat: "reclaimed-stone", junction: "P", src: ["R5 N8", "08 H"],
  poly: [[PATH_END, PT(PATH_END)], [BED0, PT(PATH_END)], [BED0, PBT(PATH_END) - 20], [PATH_END, PBT(PATH_END) - 20]], runs: EDGE_RUNS, cuts: RILL_CUTS });
const RBE_X = (PATH_END + BED0) / 2;
add({ id: "root-barrier-edge", name: "Ribbed HDPE root barrier under the path edge, top cast 20 into the curbstone, to −700", role: "planting", mat: "hdpe", junction: "P", src: ["R3 F7", "08 I2"],
  type: "sheet", t: 2, path: [[RBE_X, PBT(PATH_END)], [RBE_X, -700]], runs: RBE_RUNS, embeds: ["edge-restraint", ...(APP ? ["pocket-curb-s"] : [])] });
if (APP) {
  add({ id: "pocket-curb-h", per: "opening", name: "Granite curbstone, house side of the shrub pocket (jamb B)", role: "ground", mat: "reclaimed-stone", junction: "M", src: ["R5 P2", "08b M"],
    poly: curbPoly(POCK.x[0], POCK.x[0] - 150), runs: [POCK.w] });
  add({ id: "pocket-curb-s", per: "opening", name: "Granite curbstone, sides of the shrub pocket", role: "ground", mat: "reclaimed-stone", junction: "M", src: ["R5 P2"],
    poly: [[POCK.x[0] - 150, PT(POCK.x[0] - 150)], [BED0, PT(PATH_END)], [BED0, PBT(PATH_END) - 20], [POCK.x[0] - 150, PBT(POCK.x[0] - 150) - 20]],
    runs: [[POCK.w[0], POCK.wIn[0]], [POCK.wIn[1], POCK.w[1]]] });
  add({ id: "pocket-soil", per: "opening", name: "Growing medium 600 in the pocket, open to the bed (granite curbs: no lime)", role: "ground", mat: "soil-imported", junction: "M", src: ["08b M", "R3 F10", "R3 F18"],
    poly: [[POCK.x[0] - 150, PT(POCK.x[0] - 150) - 50], [BED0, PT(PATH_END) - 50], [BED0, PT(PATH_END) - 650], [POCK.x[0] - 150, PT(POCK.x[0] - 150) - 650]], runs: [POCK.wIn] });
  add({ id: "root-barrier-pocket", per: "opening", name: "Root barrier under the pocket curbs (house side), cast 20 into the curb", role: "planting", mat: "hdpe", junction: "M", src: ["08b M16", "R3 F7"],
    type: "sheet", t: 2, path: [[POCK.x[0] - 75, PBT(POCK.x[0] - 75)], [POCK.x[0] - 75, -700]], runs: [POCK.w], embeds: ["pocket-curb-h"] });
  for (const [k, w] of [POCK.w[0] + 75, POCK.wIn[1] + 75].entries())
    add({ id: `root-barrier-pocket-s${k + 1}`, per: "opening", name: "Root barrier under a pocket side curb, cast 20+ into the curb", role: "planting", mat: "hdpe", junction: "M", src: ["R3 F7"],
      axis: "x", x: [BED0, POCK.x[0] - 150], poly: R(w - 1, -700, w + 1, PBT(POCK.x[0] - 150)), embeds: ["pocket-curb-s"] });
}

// Basin at jamb A: reclaimed granite bowl 600 x 600, silt sump to −350, cobble fill, outlet slot at −145 into the rill.
const BOWL = [[BASIN.x[0], PT(BASIN.x[0])], [BASIN.x[0], -410], [BASIN.x[1], -410], [BASIN.x[1], PT(BASIN.x[1])], [BASIN.x[1] + 60, PT(BASIN.x[1] + 60)],
  [BASIN.x[1] + 60, -350], [BASIN.x[0] - 60, -350], [BASIN.x[0] - 60, PT(BASIN.x[0] - 60)]];
add({ id: "basin-shell", per: "opening", name: "Reclaimed granite basin under the spout, sump floor −350 (silt settles here; removable bucket)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 N2", "R5 P2", "R3 P1", "08b M9"],
  poly: BOWL, runs: [[BASIN.w[0] + 60, BASIN.w[1] - 60]],
  cuts: [{ type: "rod", axis: "x", w: [-450], ys: [-105], d: 80, from: BASIN.x[1] - 10, to: BASIN.x[1] + 70 }],
  note: "Inlet: the downspout from the roof above, spouting from the jamb-A wall. Overflow over the rim onto paving that falls away from the wall." });
add({ id: "basin-ends", per: "opening", name: "Basin end walls", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R5 P2"],
  poly: [[BASIN.x[0], PT(BASIN.x[0])], [BASIN.x[1], PT(BASIN.x[1])], [BASIN.x[1], -410], [BASIN.x[0], -410]], runs: [[BASIN.w[0], BASIN.w[0] + 60], [BASIN.w[1] - 60, BASIN.w[1]]] });
add({ id: "basin-void", void: true, poly: R(BASIN.x[1], -410, BASIN.x[0], 5), runs: [BASIN.w] });
add({ id: "basin-cobbles", per: "opening", name: "Cobbles 100–150 filling the basin (splash and silt trap)", role: "drainage", mat: "aggregate", junction: "J", src: ["10 §3.6", "R5 P2"],
  poly: [[BASIN.x[0] - 60, PT(BASIN.x[0] - 60) - 40], [BASIN.x[1] + 60, PT(BASIN.x[1] + 60) - 40], [BASIN.x[1] + 60, -350], [BASIN.x[0] - 60, -350]], runs: [[BASIN.w[0] + 60, BASIN.w[1] - 60]] });
// Open granite rill across the terrace (1 %), clapper slab where the route crosses.
add({ id: "rill-floor", per: "opening", name: "Rill floor, stone-faced precast U-trough 50 (sealed, gasketed joints)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 N1", "R2 N2", "R3 P1"],
  poly: [[BASIN.x[1], RF(BASIN.x[1])], [BED0, RF(BED0)], [BED0, RF(BED0) - 50], [BASIN.x[1], RF(BASIN.x[1]) - 50]], runs: RILL_ALL });
add({ id: "rill-walls", per: "opening", name: "Rill walls, flush with the paving (open water, moss patina)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R3 P1", "R5 P2"],
  poly: [[BASIN.x[1], PT(BASIN.x[1])], [CLAP[0], PT(CLAP[0])], [CLAP[0], PT(CLAP[0]) - 80], [CLAP[1], PT(CLAP[1]) - 80], [CLAP[1], PT(CLAP[1])],
    [PATH_END, PT(PATH_END)], [BED0, PT(PATH_END)], [BED0, RF(BED0)], [BASIN.x[1], RF(BASIN.x[1])]], runs: RILL_WALLS });
add({ id: "rill-void", void: true, poly: [[BASIN.x[1], PT(BASIN.x[1]) + 5], [PATH_END, PT(PATH_END) + 5], [BED0, PT(PATH_END) + 5], [BED0, RF(BED0)], [BASIN.x[1], RF(BASIN.x[1])]], runs: [RILL_W] });
add({ id: "clapper", per: "opening", name: "Granite clapper slab 80 over the rill, flush (B651 8.2.4)", role: "ground", mat: "reclaimed-stone", junction: "J", src: ["R3 P1", "08 J16"],
  poly: [[CLAP[0], PT(CLAP[0])], [CLAP[1], PT(CLAP[1])], [CLAP[1], PT(CLAP[1]) - 80], [CLAP[0], PT(CLAP[0]) - 80]], runs: [[-600, -300]] });

// Planting bed (tree pit in plan, drained to the garden rock) and rain garden lowered 25 (R2 N1 option B, R3 N1, N6).
const RIM = -5150, RIM_Y = -122, CREST = -275, PONDB = CREST - 200;
const BT0 = PT(PATH_END) - 50;                         // mulch 50 below the path edge (R3 F16)
const BT = (x) => BT0 + (RIM_Y - BT0) * (BED0 - x) / (BED0 - RIM);
const PIT = [-3900, -4900], PIT_W = [[400, 1400]];
const IN0 = RIM - 3 * (RIM_Y - PONDB), FLOOR1 = IN0 - 800, FAR_RIM = CREST + 100, FAR = FLOOR1 - 3 * (FAR_RIM - PONDB);
const GS = (x) => (x >= IN0 ? RIM_Y - (RIM - x) / 3 : x >= FLOOR1 ? PONDB : PONDB + (FLOOR1 - x) / 3);
// Runnel continues the rill floor at 2 % and ends in a lip where it meets the house-side slope (≥ 50 above the crest: 08 J11).
const RNF = (x) => RF(BED0) - 0.02 * (BED0 - x);
const X_LIP = (RIM_Y - RIM / 3 - RF(BED0) + 0.02 * BED0) / (0.02 - 1 / 3);
const RUNNEL_CUTS = ["runnel-walls", "runnel-floor", "runnel-strip", "runnel-void"];
add({ id: "runnel-void", void: true, poly: [[BED0, BT(BED0) + 5], [RIM, RIM_Y + 5], [X_LIP, GS(X_LIP) + 5], [X_LIP, RNF(X_LIP)], [BED0, RNF(BED0)]], runs: [RILL_W] });
add({ id: "runnel-floor", per: "opening", name: "Runnel floor 50, 2 %, granite lip at the garden (67 above the crest)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 N1", "R3 N1", "08 J11"],
  poly: [[BED0, RNF(BED0)], [X_LIP, RNF(X_LIP)], [X_LIP, RNF(X_LIP) - 50], [BED0, RNF(BED0) - 50]], runs: RILL_ALL });
add({ id: "runnel-walls", per: "opening", name: "Runnel walls, top at the bed and slope surface", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 N1"],
  poly: [[BED0, BT(BED0)], [RIM, RIM_Y], [X_LIP, RNF(X_LIP)], [BED0, RNF(BED0)]], runs: RILL_WALLS });
add({ id: "runnel-strip", per: "opening", name: "Compacted 19 mm crushed-rock strip 300 under the runnel, to the bed subgrade (no settlement)", role: "drainage", mat: "aggregate", junction: "J", src: ["R2 N1"],
  poly: [[BED0, RNF(BED0) - 50], [RIM, RNF(RIM) - 50], [RIM, BT(RIM) - 525], [BED0, BT(BED0) - 525]], runs: [[-600, -300]] });
add({ id: "bed-mulch", name: "Wood-chip mulch 75, leaf litter left", role: "ground", mat: "soil", junction: "I", src: ["08 I"],
  poly: [[BED0, BT(BED0)], [RIM, BT(RIM)], [RIM, BT(RIM) - 75], [BED0, BT(BED0) - 75]], cuts: RUNNEL_CUTS });
add({ id: "bed-soil", name: "Planting bed medium 450", role: "ground", mat: "soil-imported", junction: "I", src: ["08 I"],
  poly: [[BED0, BT(BED0) - 75], [RIM, BT(RIM) - 75], [RIM, BT(RIM) - 525], [BED0, BT(BED0) - 525]], cuts: RUNNEL_CUTS });
add({ id: "tree-pit", per: "opening", name: "Tree pit 1.0 x 1.0 m in plan, 1 m deep, floor falling 2 % to the garden, base scarified 300", role: "ground", mat: "soil-imported", junction: "I", src: ["R3 F8", "R3 N6", "R2 N9", "08 I1"],
  poly: [[PIT[0], BT(PIT[0]) - 525], [PIT[1], BT(PIT[1]) - 525], [PIT[1], -1120], [PIT[0], -1100]], runs: PIT_W });
add({ id: "pit-link", per: "opening", name: "Clear-stone link in geotextile from the pit floor to the garden rock (no pipe)", role: "drainage", mat: "aggregate", junction: "I", src: ["R3 N6"],
  poly: R(RIM, -1140, PIT[1], -1080), runs: PIT_W });
// Rain garden: crest −275, pond floor −475, far rim −175 (spill −230), forebay under the lip.
const DIP = [[X_LIP, GS(X_LIP)], [X_LIP - 600, GS(X_LIP - 600)], [X_LIP - 600, GS(X_LIP - 600) - 100], [X_LIP, GS(X_LIP) - 100]];
add({ id: "forebay-dip", void: true, poly: DIP, runs: [[-700, -200]] });
add({ id: "rg-apron", per: "opening", name: "Cobble forebay 100 below the lip (the lip drops a sheet onto it; sediment collects here)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R3 P2", "08 J11"],
  poly: [[X_LIP, GS(X_LIP) - 100], [X_LIP - 600, GS(X_LIP - 600) - 100], [X_LIP - 600, GS(X_LIP - 600) - 200], [X_LIP, GS(X_LIP) - 200]], runs: [[-700, -200]] });
add({ id: "rg-mulch", name: "Stone mulch 75 on the garden floor", role: "ground", mat: "aggregate", junction: "J", src: ["08 J", "R3 F5"],
  poly: [[IN0, PONDB], [FLOOR1, PONDB], [FLOOR1, PONDB - 75], [IN0, PONDB - 75]] });
add({ id: "rg-medium", name: "Bioretention medium 450 (≥ 70 mm/h), planted 3:1 slopes", role: "ground", mat: "soil-imported", junction: "J", src: ["08 J"],
  poly: [[RIM, RIM_Y], [IN0, PONDB], [IN0, PONDB - 75], [FLOOR1, PONDB - 75], [FLOOR1, PONDB], [FAR, FAR_RIM], [FAR, PONDB - 525], [RIM, PONDB - 525]],
  cuts: ["forebay-dip", "rg-apron", "runnel-walls", "runnel-floor", "runnel-void"] });
add({ id: "rg-choker", name: "Choker layer 100", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(FAR, PONDB - 625, RIM, PONDB - 525) });
add({ id: "rg-rock", name: "Clear rock reservoir 300", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(FAR, PONDB - 925, RIM, PONDB - 625), cuts: ["rg-subdrain"] });
add({ id: "rg-subdrain", name: "Perforated HDPE subdrain 150 near the top of the rock", role: "drainage", mat: "hdpe", junction: "J", src: ["R3 F3", "R2 N4"],
  type: "rod", axis: "w", x: (IN0 + FLOOR1) / 2, y: PONDB - 710, d: 160, di: 150, from: SPAN[0], to: L });
add({ id: "rg-riser", per: "opening", name: "HDPE overflow riser 200, beehive grate at the crest, sealed base below the subdrain", role: "drainage", mat: "hdpe", junction: "J", src: ["08 J", "R3 F5", "R2 N4", "VBBL Book II 2.4.2.5"],
  type: "rod", axis: "y", x: (IN0 + FLOOR1) / 2, w: [900], d: 210, di: 200, from: PONDB - 830, to: CREST, embeds: ["rg-medium", "rg-choker", "rg-rock", "rg-mulch", "rg-subdrain"],
  note: "Outlet to the tank / storm at invert ≤ PONDB − 785 with a backflow flap; 1 m spillway notch in the far rim at crest + 45 (outside this slice)." });
// Subgrade in three parts: under the lined landing, under the jamb ground, and beyond the cut-off.
const nearTop = [[SLOT_BACK, FOOT], [-97, FOOT], [-97, FOOT - 0.5], [ROCK_OUT - 0.5, FOOT - 0.5]];
add({ id: "subgrade", name: "Compacted subgrade / native soil (landing)", role: "ground", mat: "soil", junction: "E", src: ["07 E1", "08 H"],
  poly: [...nearTop, [ROCK_OUT - 0.5, PBL(ROCK_OUT) - 2.01], LINER_OUT[3], LINER_OUT[2], LINER_OUT[1], [LINER_OUT[1][0], -1700], [SLOT_BACK, -1700]], runs: LIN_W });
add({ id: "subgrade-jz", per: "opening", name: "Compacted subgrade (jamb ground)", role: "ground", mat: "soil", junction: "E", src: ["07 E1"],
  poly: [...nearTop, [ROCK_OUT - 0.5, PBT(ROCK_OUT - 0.5)], [LINER_END, PBT(LINER_END)], [LINER_END, -1700], [SLOT_BACK, -1700]], runs: JZ,
  cuts: [...BASIN_CUTS, "underdrain-out"] });
add({ id: "subgrade-far", name: "Native soil beyond the cut-off", role: "ground", mat: "soil", junction: "E", src: ["07 E1", "08 H"],
  poly: [[LINER_END, PBT(LINER_END) - 20], [CURB1, PBT(CURB1) - 20], [CURB1, PBT(CURB1)], [PATH_END, PBT(PATH_END)], [PATH_END, PBT(PATH_END) - 20], [BED0, PBT(PATH_END) - 20],
    [BED0, BT(BED0) - 525], [RIM, BT(RIM) - 525], [RIM, PONDB - 925], [FAR, PONDB - 925], [FAR, FAR_RIM], [-8000, FAR_RIM + 10], [-8000, -1700], [LINER_END, -1700]],
  cuts: ["tree-pit", "pit-link", "root-barrier-liner", "root-barrier-edge", ...(APP ? ["pocket-soil", "root-barrier-pocket", "root-barrier-pocket-s1", "root-barrier-pocket-s2"] : [])] });
add({ id: "interior-subgrade", name: "Compacted subgrade under the slab", role: "ground", mat: "soil", junction: "F", src: ["12"], poly: [[SLOT_BACK, FOOT], [SLOT_BACK, -1700], [2500, -1700], [2500, -300], [SLOT_BACK, -300]] });

// =================== People and planting (entourage proxies) ===================
add({ id: "person-inside", name: "Occupant standing inside (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: 1100, w: [700], d: 360, from: 0, to: 1700 });
add({ id: "person-wheelchair", name: "Wheelchair user on the landing, eye 1250 (proxy, R3 F21)", role: "furniture", mat: "", junction: "K", src: ["08 K12", "R3 F21"],
  type: "rod", axis: "y", x: -1000, w: [1000], d: 700, from: PT(-1000) - 2, to: PT(-1000) + 1250, embeds: ["pavers-lined"] });
add({ id: "person-terrace", name: "Person on the terrace (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: -2650, w: [1300], d: 360, from: PT(-2650) - 2, to: PT(-2650) + 1700, embeds: ["pavers-t"] });
if (APP) add({ id: "shrub", name: "Evergreen huckleberry at jamb B, pruned 1.5 m (proxy)", role: "planting", mat: "vegetation", junction: "M", src: ["08b M", "R5 P2"],
  type: "revolve", x: -2750, w: [5450], profile: [[0, PT(-2750) - 70], [400, PT(-2750) + 200], [550, PT(-2750) + 800], [380, PT(-2750) + 1350], [0, PT(-2750) + 1460]], embeds: ["pocket-soil"] });
add({ id: "tree", name: "Small tree in the 1 m tree pit, 1.3 m from the runnel (proxy)", role: "planting", mat: "vegetation", junction: "I", src: ["08 I", "R3 F8"],
  type: "revolve", x: -4400, w: [900], profile: [[0, BT(-4400) - 75], [75, BT(-4400) - 75], [75, BT(-4400) + 1900], [1300, BT(-4400) + 2600], [1200, BT(-4400) + 3600], [0, BT(-4400) + 4300]],
  embeds: ["bed-mulch", "bed-soil"] });
for (const [i, [x, w, name]] of [[-3800, 200, "Salal and sword fern understorey"], [-4950, 1550, "Red-flowering currant (early bloom)"]].entries())
  add({ id: `bed-plant-${i + 1}`, name: `${name} (proxy, R3 F6)`, role: "planting", mat: "vegetation", junction: "I", src: ["R3 F6", "08 L1"],
    type: "revolve", x, w: [w], profile: [[0, BT(x) - 20], [300, BT(x) + 150], [350, BT(x) + 600], [0, BT(x) + 800]], embeds: ["bed-mulch"] });
for (const [i, [x, w, name]] of [[-5800, 1200, "Slough sedge (wet slope)"], [-6600, 300, "Common rush (garden floor)"], [-7700, 1200, "Pacific ninebark (upper far slope)"]].entries())
  add({ id: `rg-plant-${i + 1}`, name: `${name} (proxy)`, role: "planting", mat: "vegetation", junction: "J", src: ["R3 F6", "R3 N7"],
    type: "revolve", x, w: [w], profile: [[0, GS(x) - 20], [250, GS(x) + 100], [300, GS(x) + 500], [0, GS(x) + 700]], embeds: ["rg-mulch", "rg-medium"] });


// =================== Presentation layers: construction stages, water routes, ageing (viewer / landing) ===================
// Stages follow research 14 §3.3 (threshold), 13 FB1–FB30 (head), 09 §9.1 (jamb base), 08/08b (landscape).
const STAGES = [
  ["Excavate, subgrade and drains", /^(subgrade|subgrade-jz|subgrade-far|interior-subgrade|perim-|channel-pipe|channel-drop)/],
  ["Grade beam, stem and foundation insulation", /^(beam|beam-rebar|dampproof|beam-insul|jamb-stem|plinth-insul|jamb-parge|sill-transition|course|pan-skirt|dam-angle)$/],
  ["Under-slab stone, insulation, soil-gas barrier", /^(stone|eps-|soilgas|slot-edge)/],
  ["Slab pour", /^(slab|slab-jz)$/],
  ["Framing: jamb wall, glulam header, floor and upper wall", /^(jamb-posts|jamb-core|sill-plate|jamb-ply|glulam|head-ground|joists|subfloor|upper-plate|upper-core|upper-ply)/],
  ["Air and water barriers", /^(jamb-wrb|wrb|base-flashing)/],
  ["Channel, welded pan and warm sill", /^(haunch|channel$|pan|pan-back|sill-bearer|tray-stools)/],
  ["Lift-and-slide door, glass and drive", /^(sill-block|sill-nosing|track|sash|glass-|head-frame|door-|drive|sill-foil|back-fill|sill-cover|edge-seal|head-gap-fill|head-tape|tray-ledge|slot-screen)/],
  ["Exterior insulation, head flashing, screen and canopy", /^(head-block|head-cant|head-subflash|head-drip|cassette|wf-band|jamb-cg-strip|jamb-wf|canopy-)/],
  ["Strapping, cedar and the charcoal frame", /^(strap-band|band-screen|cedar-band|jamb-strap|jamb-cedar|jamb-screen|liner-|downspout|spout)/],
  ["Interior finishes", /^(ceiling|jamb-gyp|upper-gyp)/],
  ["Landing: liner, underdrain, granite and tray", /^(liner|base-lined|bedding-lined|pavers-lined|underdrain|jz-|liner-edge-curb|root-barrier-liner|landing-tray|tray-slips)/],
  ["Terrace and water corner", /^(pavers-t|bedding-t|base-t|edge-restraint|root-barrier-edge|basin-|rill-|clapper|pocket-|root-barrier-pocket)/],
  ["Planting bed, runnel and rain garden", /^(bed-|tree-pit|pit-link|runnel-|rg-|forebay)/],
  ["Planting and people", /^(tree|shrub|bed-plant|rg-plant|person-)/],
];
for (const p of parts) {
  const k = STAGES.findIndex(([, re]) => re.test(p.id));
  p.step = k < 0 ? STAGES.length - 1 : k;
}
const stages = STAGES.map(([label]) => label);
// Water routes at the opening section (w 900) and, dashed as "beyond", the water corner (w −450). Levels are the model's.
const flows = [
  { id: "glass", label: "Rain on the glass → sill → trench channel → its own pipe", w: 900,
    path: [[168, 2500], [168, 101], [147, 101], [100, -12], [88, -12], [88, -45], [-38, PANC(-38)], [-38, -103], [-96, -118], [-134, -125], [-134, -330]] },
  { id: "canopy", label: "Upper wall and canopy → drip at the tip → granite landing → liner → underdrain", w: 900,
    path: [[-84, 3650], [-84, 2990], [-60, 2970], [-757, FT(-757) + 13], [-757, PT(-757)], [-1200, PT(-1200)], [-1300, PT(-1300) - 120], [-1600, PBL(-1600) + 20], [-1785, UD_Y]] },
  { id: "corner", label: "Roof above → downspout → spout → basin → rill → runnel → lip → rain garden", w: -450, beyond: true,
    path: [[-144, 3650], [-144, 650], [-760, 640], [-800, -145], [BASIN.x[1], RF(BASIN.x[1])], [BED0, RF(BED0)], [X_LIP, RNF(X_LIP)], [X_LIP - 300, GS(X_LIP - 300) - 100], [IN0 - 300, PONDB]] },
];
// Ageing keyframes (years 0 / 5 / 15 / 30): colours from R5 lap 3 §1 (RGB keyframes, west façade), growth and events
// from R3 lap 3 §5. Notes describe v3 as built (free canopy drip, no tip gutter).
const ageing = {
  years: [0, 5, 15, 30],
  rgb: {
    "cedar-siding": [[170, 160, 145], [156, 152, 144], [150, 147, 140], [140, 138, 133]],
    "cedar-soffit": [[182, 136, 96], [176, 132, 94], [172, 128, 90], [168, 126, 90]],
    "steel-prefinished": [[52, 54, 56], [54, 56, 58], [56, 58, 60], [56, 58, 60]],
    aluminium: [[52, 54, 56], [54, 56, 58], [60, 62, 64], [52, 54, 56]],
    "parge-charcoal": [[78, 78, 76], [74, 76, 72], [78, 78, 76], [76, 77, 74]],
    "reclaimed-stone": [[140, 138, 132], [132, 132, 126], [126, 126, 120], [126, 126, 120]],
    stainless: [[150, 152, 154], [150, 152, 154], [148, 150, 152], [148, 150, 152]],
  },
  grow: { tree: [0.47, 0.7, 1.16, 1.4], shrub: [0.34, 0.68, 1, 1], "bed-plant": [0.4, 1, 1, 1], "rg-plant": [0.35, 1, 1, 1] },
  notes: [
    ["Granite crisp, cedar warm, honey soffit. Tree ≈ 2 m, rain-garden plugs under 30 % cover.", "Threshold 12 mm, drive commissioned."],
    ["Cedar field silvered; a splash band darkens the courses over the canopy cap. Algae line under the canopy drip.", "Tree ≈ 3 m; bed in full cover, bloom March–October. Forebay sediment ≈ 15 mm."],
    ["Even mid-silver cedar; powder-coated door chalks lighter than the PVDF liners. ZIP fabric and motor replaced.", "Tree ≈ 5 m shades the west glass late afternoon. Rain-garden sediment ≈ 45 mm, drain-down 12–24 h."],
    ["Cedar 140,138,133 with 1–3 mm erosion; liners and cap renewed with the cladding. Track renewed via the 316 floor plate.", "Tree ≈ 6 m mature. Sediment ≈ 90 mm: strip the top 50–100 and replant. Granite relaid, not replaced."],
  ],
  src: ["R5 lap 3 §1", "R3 lap 3 §5", "10 §2.1", "13 §4.4", "14 §8"],
};

const views = [
  { id: "T-threshold", x: [-200, 300], y: [-210, 130] },
  { id: "H-head", x: [-800, 300], y: [2550, 3650] },
  { id: "F-floor", x: [-200, 700], y: [-560, 120] },
  { id: "M-landing", x: [-2200, 100], y: [-600, 200] },
  { id: "C-water-corner", x: [-3600, 0], y: [-700, 900] },
  { id: "Z-jamb-base", x: [-250, 300], y: [-260, 500] },
  { id: "I-bed-tree", x: [-5400, -3000], y: [-1200, 4400] },
  { id: "J-rain-garden", x: [-8000, -4800], y: [-1500, 300] },
  { id: "S-section", x: [-8000, 2500], y: [-1700, 3800] },
];
const assemblies = [
  { name: "Floor (slab on 100 graphite EPS)", target: 2.45, films: [0.16], layers: [{ mat: "concrete-lowcarbon", t: 100 }, { mat: "graphite-eps", t: 100 }] },
  { name: "Floor band (glulam 215 + WF 80; vented cladding excluded)", target: 3.85, films: [0.12, 0.12], layers: [{ mat: "glulam", t: 215 }, { mat: "woodfibre-board", t: 80 }] },
  { name: "Wall W1 (ply + 2x6 cellulose, 23 % framing + WF 80)", target: 3.85, films: [0.12, 0.12],
    layers: [{ mat: "gypsum", t: 12.7 }, { mat: "cellulose-dense", t: 140, framing: { mat: "softwood-lumber", frac: 0.23 } }, { mat: "plywood", t: 12.5 }, { mat: "woodfibre-board", t: 80 }] },
];
const zones = { D: { label: "door unit (frame, glass, drive)", elev_m: 2.785 }, T: { label: "threshold" }, H: { label: "floor-band head + canopy" }, F: { label: "floor", depth_m: 2.24 },
  M: { label: "lined landing", depth_m: 1.72 }, P: { label: "granite terrace + jamb ground", depth_m: 1.4 }, I: { label: "planting bed", depth_m: 1.75 }, J: { label: "water corner + rain garden" },
  E: { label: "subgrade / drains" }, Z: { label: "jamb A wall (W1) base" }, U: { label: "upper floor and wall" } };

const out = APP ? "./detail02-app.json" : "./detail02.json";
writeFileSync(new URL(out, import.meta.url), JSON.stringify({ L, root: "Detail02", opening_mm: 4800, parts, views, assemblies, zones, stages, flows, ageing }, null, 1));
console.log(`${parts.length} parts -> ${out}`);
