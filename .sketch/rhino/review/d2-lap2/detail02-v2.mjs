// Detail 02 spec, v2 (after lap 1): lift-and-slide glazed wall to ground, flush accessible threshold,
// permeable pavers with a shrub pocket, surface rill to a rain garden, planting bed with a small tree;
// low-carbon slab inside; thin cold overhang with a box gutter and a green roof behind it.
// Research: 11 (sliding wall), 12 (ground floor), 08 + 08b (landscape, threshold paving), 09 (assemblies),
// 10 (finish), 06 B (eave). Lap 1 reviews: review/d2-lap1/review-R1..R5 (cited as R1 F1, R2 3, R3 F8, R4, R5 D1 …).
//
// Datums: x = 0 at the sliding frame's exterior face, EXTERIOR NEGATIVE; y = 0 at the finished floor (FFL);
// w = along the wall. Normal mode: a 1.8 m slice of the opening, layers stepped back near the cut (w = L).
// `node detail02.mjs --appearance`: a 5.4 m run of the opening plus 0.9 m of jamb wall (massing only),
// no cut-away, for the exterior renders (R5 §4). Millimetres.
import { writeFileSync } from "node:fs";

const APP = process.argv.includes("--appearance");
const L = APP ? 5400 : 1800;
const SPAN = APP ? [-900, L] : [0, L];
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const parts = [];
const add = (p) => {
  if (!p.runs && !p.axis && (!p.type || p.type === "sheet")) p.runs = [SPAN];
  parts.push(p);
};
const cut = (k) => (APP ? L : L - k * 100);     // stepped cut-away end, k steps of 100 from the cut
const OPEN = [[0, L]];                          // the glazed opening (the jamb wall sits at w < 0 in appearance mode)
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

// =================== Threshold (11 §3, R1 revised geometry table, R2) ===================
const SLOT_BACK = 231, CH_IN = -21.5, CH_OUT = -171.5;
const W = (x) => -82.9 + (x + 20) * (15.1 / 251);      // top of the mortar bed under the pan (6 % fall outward)
add({ id: "beam", name: "Engineered reinforced grade beam + footing under the opening (Part 4)", role: "concrete", mat: "concrete-f2-40scm", junction: "T", src: ["12 foundation", "11 T1", "R1 table", "R2 VBBL 9.15.4.6 ruling"],
  poly: [[-120, -470], [331, -470], [331, -320], [SLOT_BACK, -320], [SLOT_BACK, -193], [-20, -193], [-20, -320], [-120, -320]],
  note: "Part 4 engineered foundation (VBBL 9.15.4.6 does not bind it; the engineer documents that nothing moisture-sensitive sits within 150 of grade — R2). Underside 450+ below exterior grade; sill support level within 1 mm." });
add({ id: "beam-rebar", name: "Beam reinforcement (4-15M + stirrups, about 8.3 kg/m)", role: "metal", mat: "rebar-eaf-pnw", junction: "T", src: ["R4"], type: "virtual", m3PerMetre: 8.3 / 7850 });
add({ id: "dampproof", name: "Water-based damp-proofing on beam face (EPS-compatible)", role: "water", mat: "membrane-poly", junction: "T", src: ["07 E6", "ABC loop2 N10"],
  type: "sheet", t: 1, path: [[-20.5, -195], [-20.5, -320]] });
add({ id: "beam-insul", name: "Graphite EPS Type 3 75 on beam face (drained by the perimeter drain)", role: "thermal", mat: "graphite-eps", junction: "T", src: ["11 T2", "R2 P4", "R4"], poly: R(-97, -320, -22, -193) });
add({ id: "course", name: "Structural PU thermal-break board 251 x 100 (Armatherm 500 class), drillable", role: "thermal", mat: "pu-structural", junction: "T", src: ["R1 F9 (b)", "12 R", "11 T9"],
  poly: R(-20, -193, SLOT_BACK, -93), note: "PERINSUL SIB (North America) is veneer-only, 92 wide, not drillable (OC data sheet Jan 2023) — rejected. Engineer to confirm the board's compressive grade." });
add({ id: "wedge", name: "Mortar bed 10 to 25, 6 % outward", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["R1 table", "R2 3"],
  poly: [[-20, -93], [SLOT_BACK, -93], [SLOT_BACK, W(SLOT_BACK)], [-20, W(-20)]] });
add({ id: "pan-skirt", name: "Self-adhered skirt under the pan, down the board face, lapped 100 over the damp-proofing", role: "water", mat: "membrane-poly", junction: "T", src: ["R1 F1", "R2 3"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[SLOT_BACK - 0.05, W(SLOT_BACK - 0.05) + 0.25], [-20.25, W(-20) + 0.25], [-20.25, -193.5], [-21.25, -194.5], [-21.25, -293]] });
const PAN = (x) => W(x) + 0.92;                        // pan centreline (0.8 stainless on the 0.5 skirt)
add({ id: "pan", name: "Welded stainless sill pan 0.8, floor 6 %, nose dropping into the channel", role: "water", mat: "stainless", junction: "T", src: ["R1 F1", "11 T6", "LOE-INST"],
  type: "sheet", t: 0.8, runs: OPEN, path: [[SLOT_BACK - 0.05, PAN(SLOT_BACK - 0.05)], [-20, PAN(-20)], [-38, PAN(-20) - 18 * 0.06], [-38, -103]],
  note: "End dams 150+ up the jambs, welded; jamb membranes lap over them. Replaces the liquid pan (R1 F3)." });
add({ id: "pan-back", name: "Pan back leg (welded), butyl-taped 100+ to the soil-gas poly", role: "water", mat: "stainless", junction: "T", src: ["R1 table", "R2 3"],
  type: "sheet", t: 0.8, runs: OPEN, path: [[SLOT_BACK + 0.4, -15], [SLOT_BACK + 0.4, -110]] });
// Interior floor (12 option (c)), slab-edge strip, poly up the slot face.
add({ id: "stone", name: "Clear stone 100, gas-permeable layer and capillary break", role: "drainage", mat: "aggregate", junction: "F", src: ["12 build-up"],
  poly: [[SLOT_BACK, -320], [331, -320], [331, -300], [2500, -300], [2500, -200.25], [SLOT_BACK, -200.25]],
  note: "Radon rough-in per VBBL 9.13.4.3: inlet near slab centre, pipe sealed at the barrier (outside this slice). Never linked to the perimeter drain." });
add({ id: "eps-1", name: "Graphite EPS Type 2, 50 (layer 1)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(232.05, -200.25, 2500, -150.25) });
add({ id: "eps-2", name: "Graphite EPS Type 2, 50 (layer 2, joints staggered)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(232.05, -150.25, 2500, -100.25) });
add({ id: "soilgas", name: "0.25 mm soil-gas / air barrier, up the slot face, butyl-taped 100+ to the pan back leg", role: "air", mat: "ldpe-film", junction: "F", src: ["12 sealing", "R1 table", "R2 3"],
  type: "sheet", t: 0.25, path: [[2500, -100.125], [231.925, -100.125], [231.925, -15]],
  note: "Sequence: pan set and welded, slab poured, poly up the slot face and butyl-taped to the back leg (R2 slab-first order)." });
add({ id: "slot-edge", name: "Expanded cork slab-edge strip 25 (VBBL 10.2.2.6 'around edge of slab')", role: "thermal", mat: "cork", junction: "F", src: ["R1 F4", "R2 P5"], poly: R(232.05, -100, 257.05, -15) });
add({ id: "edge-seal", name: "Flexible perimeter sealant over the slot edge", role: "air", mat: "butyl-sealant", junction: "F", src: ["R1 table", "VBBL 9.25.3.6(5)"], poly: R(SLOT_BACK + 0.8, -15, 257.05, 0) });
add({ id: "slab", name: "Low-carbon concrete slab 100, ground/polished finish (mineral floor at the sill)", role: "concrete", mat: "concrete-lowcarbon", junction: "F", src: ["12 build-up", "11 T20"],
  poly: R(257.3, -100, 2500, 0) });
// Track, sash and IGU.
add({ id: "track", name: "Lift-and-slide sill/track, fibreglass with stainless rails, top +5, level ±1 mm", role: "metal", mat: "fibreglass", fill: 0.3, junction: "T", src: ["11 T11", "R4 (no aluminium in the sill)"],
  poly: R(0, -42, 180, 5), runs: OPEN, note: "Shims 25 (back) to 40 (front); anchored through the drillable PU board per maker; two sealant beads under the track." });
add({ id: "track-rails", name: "Stainless running rails", role: "metal", mat: "stainless", junction: "T", src: ["R4"], poly: R(40, 5, 46, 10), runs: OPEN });
add({ id: "nosing", name: "Bevelled sill nosing 1:2, +5 to −6", role: "metal", mat: "fibreglass", fill: 0.5, junction: "T", src: ["11 §3.1", "R1 F13"], poly: [[0, 5], [-22, -6], [-26, -6], [-26, -20], [0, -20]], runs: OPEN });
const PT0 = PAN(0) + 0.4, PT231 = PAN(SLOT_BACK) + 0.4;
add({ id: "grout", name: "Chloride-free grout under and behind the track (behind: to −21 only)", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["11 T14", "R1 table"],
  poly: [[0, PT0], [SLOT_BACK, PT231], [SLOT_BACK, -45], [230, -45], [230, -21], [180, -21], [180, -42], [0, -42]], runs: OPEN });
add({ id: "sill-foil", name: "EPDM sill foil, track to back dam (air seal)", role: "air", mat: "epdm", junction: "T", src: ["R1 F2"], type: "sheet", t: 1, runs: OPEN,
  path: [[180.5, -2], [180.5, -20.5], [230.5, -20.5], [230.5, -45]] });
add({ id: "sill-apron", name: "Stone apron over the slot back", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["R1 table"], poly: R(181, -20, SLOT_BACK, 0), runs: OPEN });
add({ id: "track-weeps", name: "Track drain tubes falling 2 % into the channel", role: "water", mat: "pvc-pipe", junction: "T", src: ["11 T12", "R1 F12"],
  type: "rod", axis: "x", y: -56.6, dy: 1.6, w: [300, 900, 1500].filter((w) => w < L), d: 12, from: -40, to: 40, embeds: ["grout", "track", "channel"] });
add({ id: "sash", name: "Lift-and-slide sash, bottom rail (fibreglass)", role: "frame", mat: "fibreglass", fill: 0.3, junction: "T", src: ["11 R1"], poly: R(15, 10, 85, 120), runs: OPEN });
for (const [i, [x, t]] of [[28, 4], [49.35, 1.3], [68, 4]].entries())
  add({ id: `glass-${i + 1}`, name: i === 1 ? "IGU centre lite 1.3 mm (thin-glass triple)" : `IGU pane ${i + 1} 4 mm low-e, safety glass`, role: "cladding", mat: "igu-triple", junction: "T",
    src: ["11 R1", "V2 9.6.1.4", "R4 thin-glass"], poly: R(x, 60, x + t, 2630), runs: OPEN, embeds: ["sash", "sash-top"],
    note: i === 0 ? "Bird-safe: CSA A460 markers on the exterior surface (#1), 50 x 50 spacing (R3 F11)." : undefined });
add({ id: "sash-top", name: "Sash top rail", role: "frame", mat: "fibreglass", fill: 0.3, junction: "H", src: ["11 R1"], poly: R(15, 2600, 85, 2690), runs: OPEN });
add({ id: "head-track", name: "Head track / head jamb", role: "frame", mat: "fibreglass", fill: 0.3, junction: "H", src: ["11 H5"], poly: R(0, 2690, 180, 2730), runs: OPEN });
add({ id: "door-verticals", name: "Jambs, interlock and hardware per opening (fibreglass + stainless)", role: "frame", mat: "fibreglass", junction: "T", src: ["R4 blocker"],
  type: "virtual", m3PerMetre: (3 * 2.7 * 0.007 * 0.3) / 4.8 + (20 * 2.9 / 4.16 / 1900) / 4.8, note: "Counted per metre of a 4.8 m two-panel opening." });

// =================== Head (11 §4, R1 F5–F10, R5 D2) ===================
const LINT0 = 2770, LINT1 = 3022, JST1 = LINT1 + 235, DECK = JST1 + 16, AVB = DECK + 3;
add({ id: "head-tape", name: "Three-zone pre-compressed tape in the head gap", role: "air", mat: "membrane-poly", junction: "H", src: ["R1 F5"], poly: R(0, 2730, 170, 2742), runs: OPEN });
add({ id: "head-airseal", name: "Interior backer + sealant, frame to packer", role: "air", mat: "butyl-sealant", junction: "H", src: ["R1 F5", "11 H7"], poly: R(170, 2730, 180, 2742.5), runs: OPEN });
add({ id: "head-membrane", name: "Head air/water membrane (vapour-open), packer face into rough head", role: "air", mat: "membrane-poly", junction: "H", src: ["11 H4", "R1 F16"],
  type: "sheet", t: 0.5, path: [[24.75, LINT1], [24.75, 2742.25], [100, 2742.25]] });
add({ id: "packer", name: "PT packer bolted to the lintel flange", role: "frame", mat: "softwood-pt", junction: "H", src: ["11 H3"], poly: R(25, 2742.5, 155, LINT0) });
add({ id: "lintel", name: "Steel W250x39 lintel (engineer: ≤ 3 mm incl. creep)", role: "metal", mat: "steel-section", junction: "H", src: ["R1 F7", "R5 F3"],
  poly: [[26, LINT0], [154, LINT0], [154, LINT0 + 12.5], [93.2, LINT0 + 12.5], [93.2, LINT1 - 12.5], [154, LINT1 - 12.5], [154, LINT1], [26, LINT1], [26, LINT1 - 12.5],
    [86.8, LINT1 - 12.5], [86.8, LINT0 + 12.5], [26, LINT0 + 12.5]], note: "Keeps the glass height; a glulam 175x456 alternative adds 190 to the band (R1 F7)." });
add({ id: "lintel-infill", name: "Stone-wool infill between the lintel flanges", role: "thermal", mat: "comfortbatt", junction: "H", src: ["R1 F15"], poly: R(93.2, LINT0 + 12.5, 154, LINT1 - 12.5) });
add({ id: "lintel-infill-2", name: "Stone-wool infill between the lintel flanges", role: "thermal", mat: "comfortbatt", junction: "H", src: ["R1 F15"], poly: R(26, LINT0 + 12.5, 86.8, LINT1 - 12.5) });
add({ id: "lintel-gyp", name: "Gypsum board 12.7 on the lintel interior face", role: "frame", mat: "gypsum", junction: "H", src: ["R1 F15"], poly: R(155, 2742.5, 167.7, LINT1) });
const HF_X = 24.5 - 0.305;
const EI_IN = HF_X - 0.305 - 0.5, EI_OUT = EI_IN - 130, STRAP_OUT = EI_OUT - 19, CEDAR = STRAP_OUT - 19;
const SOFF0 = 2896;                                   // soffit underside at the wall: head trim 150 below (R5 D2)
add({ id: "head-flashing", name: "Head flashing 24 ga charcoal, 6 % fall, hemmed stiffener, drip 5 past cladding", role: "water", mat: "steel-prefinished", junction: "H", src: ["11 H10", "R1 F10"],
  type: "sheet", t: 0.61, path: [[HF_X, 2830], [HF_X, 2746], [CEDAR - 5, 2746 - 0.06 * (HF_X - CEDAR + 5)], [CEDAR - 10, 2746 - 0.06 * (HF_X - CEDAR + 5) - 5]],
  note: "Clips at 600 under the leg; end dams 25; fastened through the upstand above the water line." });
add({ id: "head-stripin", name: "Self-adhered strip-in lapping 70 over the flashing upstand", role: "water", mat: "membrane-poly", junction: "H", src: ["11 H4"], type: "sheet", t: 0.5, path: [[HF_X - 0.555, 2900], [HF_X - 0.555, 2760]] });
add({ id: "band-ei", name: "Stone-wool board 130 on lintel face, up to the joists", role: "thermal", mat: "comfortboard-80", junction: "H", src: ["R1 F6", "R1 F8"], poly: R(EI_OUT, 2748, EI_IN, LINT1), runs: [[SPAN[0], cut(3)]] });
add({ id: "band-strap", name: "PT strapping 19x64", role: "frame", mat: "softwood-pt", junction: "H", src: ["06 A13"], poly: R(STRAP_OUT, 2750, EI_OUT, SOFF0), runs: STRAPS.filter(([a]) => a < cut(4)) });
add({ id: "band-screen", name: "Black stainless insect screen ≤ 2 mm at the cavity base", role: "metal", mat: "stainless", junction: "H", src: ["08 L"], type: "sheet", t: 0.5, path: [[EI_OUT, 2749.75], [STRAP_OUT, 2749.75]], runs: [[SPAN[0], cut(4)]] });
add({ id: "band-cedar", name: "One course of WRC channel siding (one face, no ripped course)", role: "cladding", mat: "cedar-siding", junction: "H", src: ["09 W1", "R5 D2"], poly: R(CEDAR, 2752, STRAP_OUT, 2875), runs: [[SPAN[0], cut(5)]] });
add({ id: "band-vent", name: "21 mm black-mesh vent slot at the band top", role: "metal", mat: "stainless", junction: "H", src: ["R5 D2"],
  type: "sheet", t: 0.5, path: [[CEDAR - 0.25, 2875], [CEDAR - 0.25, SOFF0 - 0.25], [STRAP_OUT, SOFF0 - 0.25]], runs: [[SPAN[0], cut(4)]] });
add({ id: "band-closure", name: "PT cavity-top closure (cavity not open to the soffit space)", role: "frame", mat: "softwood-pt", junction: "H", src: ["06 B22"], poly: R(STRAP_OUT, SOFF0, EI_OUT, SOFF0 + 38), runs: [[SPAN[0], cut(4)]] });
add({ id: "band-windbarrier", name: "Vapour-open wind barrier on the stone wool above the closure", role: "air", mat: "membrane-poly", junction: "H", src: ["ABC 11"],
  type: "sheet", t: 0.5, path: [[EI_OUT - 0.25, SOFF0 + 38], [EI_OUT - 0.25, LINT1]], runs: [[SPAN[0], cut(3)]] });

// =================== Roof and thin cold overhang (06 B, 09 d, R5 D1) ===================
const RAKE = Math.tan((24 * Math.PI) / 180), SOFF_T = 19 / Math.cos((24 * Math.PI) / 180);
const TIP = -630, EDGE = -650;                       // joist tip, sub-fascia face
const SB = (x) => SOFF0 + RAKE * (CEDAR - x);         // soffit underside, raked 24° up to the tip
const ST = (x) => SB(x) + SOFF_T;                     // soffit top
const X_T = CEDAR - (LINT1 - ST(CEDAR)) / RAKE;       // where the soffit meets the full-depth joist underside
add({ id: "joists", name: "Roof joists 38x235, tapered over the overhang to about 125 at the tip", role: "frame", mat: "softwood-lumber", junction: "R", src: ["06 B3", "R5 D1"],
  poly: [[TIP, ST(TIP)], [X_T, LINT1], [2500, LINT1], [2500, JST1], [TIP, JST1]], runs: JOISTS, note: "Toe-nails and uplift ties per joist; green-roof load to be checked by the engineer (09)." });
add({ id: "soffit-furring", name: "Tapered PT furring under the joists (soffit drop at the wall)", role: "frame", mat: "softwood-pt", junction: "R", src: ["R5 D2"],
  poly: [[X_T, LINT1], [CEDAR, ST(CEDAR)], [CEDAR, LINT1]], runs: JOISTS });
add({ id: "soffit", name: "Honey cedar soffit 19, raked 24°, open joints with mesh", role: "cladding", mat: "cedar-soffit", junction: "R", src: ["06 B20", "10", "R5 D2"],
  poly: [[TIP, SB(TIP)], [CEDAR, SOFF0], [CEDAR, ST(CEDAR)], [TIP, ST(TIP)]], runs: [[SPAN[0], cut(2)]] });
add({ id: "blocking", name: "Full-depth blocking at the wall line, caulked 4 sides", role: "frame", mat: "softwood-lumber", junction: "R", src: ["06 B4"], poly: R(25, LINT1, 63, JST1), runs: BAYS });
add({ id: "bay-insul", name: "Stone-wool fill over the lintel (air tie by membranes, no spray foam)", role: "thermal", mat: "comfortbatt", junction: "R", src: ["R4 (spray foam out)"], poly: R(63, LINT1, 185, JST1), runs: BAYS });
add({ id: "membrane-top", name: "Air/water membrane on blocking face to the deck pre-strip (bays)", role: "air", mat: "membrane-poly", junction: "R", src: ["06 B21"], type: "sheet", t: 0.5, path: [[24.75, LINT1], [24.75, JST1]], runs: BAYS });
add({ id: "ei-top", name: "Stone-wool board between joists (wall-line thermal continuity)", role: "thermal", mat: "comfortboard-80", junction: "R", src: ["06 B6"], poly: R(EI_OUT, LINT1, EI_IN, JST1), runs: clip(BAYS, cut(3)) });
add({ id: "sub-fascia", name: "PT sub-fascia on the joist tips", role: "frame", mat: "softwood-pt", junction: "R", src: ["R5 D1"], poly: R(EDGE, 3086, TIP, DECK), runs: [[SPAN[0], cut(1)]] });
add({ id: "ceiling", name: "Gypsum ceiling 12.7 (no ceiling poly: exterior-insulated roof)", role: "frame", mat: "gypsum", junction: "R", src: ["ABC 16"], poly: R(167.7, LINT1 - 12.7, 2500, LINT1) });
add({ id: "deck", name: "Plywood roof deck 16", role: "frame", mat: "plywood", junction: "R", src: ["06 B7"], poly: R(TIP, JST1, 2500, DECK) });
add({ id: "avb", name: "Self-adhered air/vapour control layer on deck (pre-strip at wall line)", role: "air", mat: "sbs", junction: "R", src: ["06 B8", "06 B9"], type: "sheet", t: 3, path: [[TIP, DECK + 1.5], [2500, DECK + 1.5]] });
const INS0 = -100, TOP0 = AVB + 162;                  // insulation stops at the wall line (R5 D1)
const RT = (x) => TOP0 + 0.02 * Math.max(0, x - INS0);
add({ id: "edge-nailer", name: "PT nailer at the insulation edge", role: "frame", mat: "softwood-pt", junction: "R", src: ["06 B11"], poly: R(INS0 - 40, AVB, INS0, TOP0), runs: [[SPAN[0], cut(2)]] });
add({ id: "roofins-1", name: "Low-GWP polyiso 75", role: "thermal", mat: "polyiso-lowgwp", junction: "R", src: ["09 d"], poly: R(INS0, AVB, 2500, AVB + 75), runs: [[SPAN[0], cut(4)]] });
add({ id: "roofins-2", name: "Low-GWP polyiso tapered, 2 % to the edge", role: "thermal", mat: "polyiso-lowgwp", junction: "R", src: ["09 d"], poly: [[INS0, AVB + 75], [2500, AVB + 75], [2500, RT(2500) - 12], [INS0, TOP0 - 12]], runs: [[SPAN[0], cut(5)]] });
add({ id: "coverboard", name: "Cover board 12", role: "frame", mat: "gypsum", junction: "R", src: ["06 B12"], poly: [[INS0, TOP0 - 12], [2500, RT(2500) - 12], [2500, RT(2500)], [INS0, TOP0]], runs: [[SPAN[0], cut(6)]] });
const C = (x) => TOP0 - 0.26 * (INS0 - 40 - x);        // cold overhang falls 26 % (R5 D1)
add({ id: "cant", name: "Cold overhang: PT firring + 12 ply, falling 26 %", role: "frame", mat: "softwood-pt", fill: 0.3, junction: "R", src: ["R5 D1"],
  poly: [[EDGE, AVB], [INS0 - 40, AVB], [INS0 - 40, TOP0], [EDGE, C(EDGE)]], runs: [[SPAN[0], cut(2)]] });
const ROOF_BED = [[EDGE, 3200], [EDGE, C(EDGE)], [INS0 - 40, TOP0], [INS0, TOP0], [2500, RT(2500)]];
add({ id: "membrane-roof", name: "2-ply SBS, herbicide-free root-resistant cap", role: "water", mat: "sbs", junction: "R", src: ["09 d", "R4"], type: "sheet", t: 7, path: offsetPath(ROOF_BED, 3.5), runs: [[SPAN[0], cut(1)]] });
const edgeBed = [[EDGE + 90, C(EDGE + 90)], [EDGE, C(EDGE)], [EDGE, 3250]];
const edgeMetal = offsetPath(edgeBed, -7.305);
add({ id: "edge-metal", name: "Charcoal drip edge into the box gutter, strip-in over the flange", role: "water", mat: "steel-prefinished", junction: "R", src: ["06 B15", "R5 D1"],
  type: "sheet", t: 0.61, path: [...edgeMetal, [edgeMetal.at(-1)[0] - 6, edgeMetal.at(-1)[1] - 6]], runs: [[SPAN[0], cut(1)]] });
add({ id: "box-gutter", name: "Charcoal box gutter, front face 236 deep (edge band)", role: "water", mat: "steel-prefinished", junction: "R", src: ["R5 D1", "08 J"],
  type: "sheet", t: 0.6, path: [[EDGE - 7.3, 3240], [EDGE - 7.3, 3125], [-734.7, 3125], [-734.7, 3322], [-726, 3322]], runs: [SPAN],
  note: "Brackets at 600 to the sub-fascia; outlet at the opening end into the rill head (rain chain); overflow scupper away from the door (R3)." });
add({ id: "gutter-skirt", name: "Charcoal skirt below the gutter, closing to the sub-fascia", role: "water", mat: "steel-prefinished", junction: "R", src: ["R5 D1"],
  type: "sheet", t: 0.6, path: [[-734.7, 3124.7], [-734.7, 3086.3], [EDGE, 3086.3]], runs: [SPAN] });
// Green roof behind a gravel strip, on the insulated part only.
const MT = (x) => RT(x) + 7 / Math.cos(Math.atan(0.02));
const GR0 = INS0 + 500;
add({ id: "gravel-edge", name: "Washed gravel strip 500 x 60 at the roof edge (vegetation-free zone)", role: "drainage", mat: "aggregate", junction: "R", src: ["09 d"],
  poly: [[INS0 + 2, MT(INS0 + 2)], [GR0, MT(GR0)], [GR0, MT(GR0) + 60], [INS0 + 2, MT(INS0 + 2) + 60]], runs: [[SPAN[0], cut(1)]] });
add({ id: "gr-edge-profile", name: "Perforated green-roof edge profile", role: "metal", mat: "stainless", junction: "R", src: ["09 d"],
  type: "sheet", t: 1.5, path: [[GR0 + 0.75, MT(GR0) + 100], [GR0 + 0.75, MT(GR0) + 0.8], [GR0 + 60, MT(GR0 + 60) + 0.8]], runs: [[SPAN[0], cut(1)]] });
const G1 = GR0 + 1.5;
add({ id: "gr-drain", name: "Granular pumice drainage layer 30 (no plastic board)", role: "drainage", mat: "gr-media-pumice", junction: "R", src: ["R4"],
  poly: [[G1, MT(G1) + 1.6], [2500, MT(2500) + 1.6], [2500, MT(2500) + 31.6], [G1, MT(G1) + 31.6]], runs: [[SPAN[0], cut(2)]] });
add({ id: "growing-medium", name: "Pumice-based extensive substrate 80", role: "ground", mat: "gr-media-pumice", junction: "R", src: ["R4", "09 d"],
  poly: [[G1, MT(G1) + 31.6], [2500, MT(2500) + 31.6], [2500, MT(2500) + 111.6], [G1, MT(G1) + 111.6]], runs: [[SPAN[0], cut(3)]] });
add({ id: "sedum", name: "Biodiverse sedum and native forb mat", role: "planting", mat: "vegetation", junction: "R", src: ["09 d", "08 L"],
  poly: [[G1, MT(G1) + 111.6], [2500, MT(2500) + 111.6], [2500, MT(2500) + 150], [G1, MT(G1) + 150]], runs: [[SPAN[0], cut(4)]] });

// =================== Exterior ground (R1 table, R2 1–3, R3, 08b) ===================
const FALL = 1 / 60;                                   // landing 1:60 (R3: tolerance under the 2 % limit)
const PT = (x) => -6 - FALL * (CH_OUT - x);            // paving top: −6 at the channel (R1 F13)
const LINER_END = -1850, PATH_END = -3250, BED0 = -3400;
add({ id: "channel", name: "Polymer-concrete trench channel, house wall top −92 (pan nose drains in), grate rebate", role: "drainage", mat: "polymer-concrete", junction: "T", src: ["11 T16", "R1 F1", "R4"],
  poly: [[CH_OUT, -6], [CH_OUT, -130], [CH_IN, -130], [CH_IN, -92], [CH_IN - 10, -92], [CH_IN - 10, -120], [CH_OUT + 10, -120], [CH_OUT + 10, -26], [CH_OUT + 6, -26], [CH_OUT + 6, -6]], runs: OPEN,
  note: "Full opening width + 150 each side; outlet at the opening end through a silt box into the rill (never the foundation drain)." });
add({ id: "grate", name: "Stainless 316 heel-safe grate, slots ≤ 6.5 mm parallel to the door, top −6", role: "metal", mat: "stainless", fill: 0.35, junction: "T", src: ["08b M", "B651 4.3.4", "R1 table"],
  poly: R(CH_OUT + 6, -26, -31.5, -6), runs: OPEN });
add({ id: "grate-seat", name: "Stainless grate seat hung from the nosing", role: "metal", mat: "stainless", junction: "T", src: ["R1 F1", "R1 F13"], type: "sheet", t: 1.5, runs: OPEN, path: [[-26.75, -8], [-26.75, -26.75], [-40, -26.75]] });
add({ id: "grate-screen", name: "Dirt screen 1.0–1.2 mm under the grate", role: "metal", mat: "stainless", junction: "T", src: ["11 T16"], type: "sheet", t: 0.5, runs: OPEN, path: [[CH_OUT + 10, -26.25], [-40, -26.25]] });
add({ id: "haunch", name: "Concrete haunch under the channel, on the beam insulation and the drain stone", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["R1 table", "R2 9"], poly: R(CH_OUT, -193, -22, -130), runs: OPEN });
// Lined landing: 60 mm low-carbon pavers, No. 8 bedding 50, No. 57 base 150, geotextile/HDPE/geotextile.
const PBL = (x) => PT(x) - 260;
const B = [[LINER_END + 2, PT(LINER_END + 2) - 110], [LINER_END + 2, PBL(LINER_END + 2)], [CH_OUT - 2, PBL(CH_OUT - 2)], [CH_OUT - 2, PT(CH_OUT - 2) - 60]];
const LINER_OUT = offsetPath(B, -2);
const RILL_W = [1590, 1760];                          // the rill crosses the terrace at the opening end of the slice
const RILL_CUTS = ["rill-walls", "rill-floor", "rill-grate"];   // rill, runnel and shrub pocket occur once per opening (metrics: per "opening")
add({ id: "liner", name: "1.0 mm HDPE liner between 407 g/m² geotextiles, turned up at the channel, cut-off at 1.85 m", role: "water", mat: "hdpe", junction: "M", src: ["08b M", "R4"],
  type: "sheet", t: 2, path: offsetPath(B, -1), runs: OPEN, cuts: ["rill-walls", "rill-floor"],
  note: "Where the rill crosses the two upturns, prefabricated HDPE boots are extrusion-welded to the liner and clamped to the rill walls (liner continuous under the rill)." });
add({ id: "pavers-lined", name: "Low-carbon concrete plank pavers 60 (150x450, warm grey), joints ≤ 6 mm, BPN ≥ 55", role: "ground", mat: "concrete-paver", junction: "M", src: ["08b M", "R4", "R5"],
  poly: [[CH_OUT, PT(CH_OUT)], [LINER_END - 2, PT(LINER_END - 2)], [LINER_END - 2, PT(LINER_END - 2) - 60], [CH_OUT, PT(CH_OUT) - 60]], runs: OPEN, cuts: RILL_CUTS });
add({ id: "bedding-lined", name: "No. 8 open-graded bedding 50", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT - 2, PT(CH_OUT - 2) - 60], [LINER_END + 2, PT(LINER_END + 2) - 60], [LINER_END + 2, PT(LINER_END + 2) - 110], [CH_OUT - 2, PT(CH_OUT - 2) - 110]], runs: OPEN, cuts: RILL_CUTS });
add({ id: "base-lined", name: "No. 57 open-graded base 150 on the liner", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT - 2, PT(CH_OUT - 2) - 110], ...B.slice(0, 3)], runs: OPEN, cuts: ["underdrain", ...RILL_CUTS] });
add({ id: "underdrain", name: "Perforated HDPE underdrain 100 on the liner floor, own outlet with backwater flap", role: "drainage", mat: "hdpe", junction: "M", src: ["R2 3", "08b M"],
  type: "rod", axis: "w", x: -1785, y: PBL(-1785) + 57, d: 110, di: 102, from: 0, to: L, note: "Falls 1 % along the wall to its own outlet; cleanout at the high end." });
// Perimeter foundation drain (R2 blocker 2).
const PD_Y = -415, PD_X = -185, ROCK_OUT = -400;
add({ id: "perim-rock", name: "Clear crushed drain stone envelope (19 mm, ≤ 10 % passing 4 mm)", role: "drainage", mat: "aggregate", junction: "E", src: ["R2 2", "07 E9"],
  poly: [[-120, -470], [-120, -320], [-97, -320], [-97, -193], [LINER_OUT[3][0], -193], [LINER_OUT[3][0], LINER_OUT[2][1]], [ROCK_OUT, PBL(ROCK_OUT) - 2], [ROCK_OUT, -470]], runs: OPEN, cuts: ["perim-drain"] });
add({ id: "perim-geotextile", name: "Nonwoven geotextile wrapping the drain envelope", role: "drainage", mat: "geotextile-pp", junction: "E", src: ["07 E9"],
  type: "sheet", t: 0.5, runs: OPEN, path: [[ROCK_OUT - 0.25, PBL(ROCK_OUT) - 2.01], [ROCK_OUT - 0.25, -470.25], [-120, -470.25]] });
add({ id: "perim-drain", name: "Perforated drain 100, invert at the footing underside, own solid outlet to the storm sump", role: "drainage", mat: "pvc-pipe", junction: "E", src: ["R2 2", "VBBL 9.14.2.1", "07 E8"],
  type: "rod", axis: "w", x: PD_X, y: PD_Y, d: 110, di: 102, from: 0, to: L, note: "About 70 mm cover under the landing liner (the liner is the cap) — alternative-solution detail (R2 2). Never linked to the channel, underdrain or sub-slab stone." });
// Unlined terrace: reclaimed granite planks 80 (R4), with the shrub pocket opened to the bed (R3 F10, R5 F5).
const PBT = (x) => PT(x) - 280;
const POCKET = { x: [-2250, PATH_END], w: [0, 1000] };
const TER = [[1100, SPAN[1]]];                          // terrace beside the pocket over its x range
for (const [k, [x0, x1, runs]] of [[LINER_END - 2, POCKET.x[0], [SPAN]], [POCKET.x[0], PATH_END, TER]].entries()) {
  add({ id: `pavers-${k + 1}`, name: "Reclaimed granite planks 80 (sawn, warm grey)", role: "ground", mat: "reclaimed-stone", junction: "P", src: ["R4", "08 H7"],
    poly: [[x0, PT(x0)], [x1, PT(x1)], [x1, PT(x1) - 80], [x0, PT(x0) - 80]], runs, cuts: RILL_CUTS });
  add({ id: `bedding-${k + 1}`, name: "No. 8 bedding 50", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
    poly: [[x0, PT(x0) - 80], [x1, PT(x1) - 80], [x1, PT(x1) - 130], [x0, PT(x0) - 130]], runs, cuts: RILL_CUTS });
  add({ id: `base-${k + 1}`, name: "No. 57 base 150 on compacted subgrade (infiltrating)", role: "drainage", mat: "aggregate", junction: "P", src: ["08 H"],
    poly: [[x0, PT(x0) - 130], [x1, PT(x1) - 130], [x1, PBT(x1)], [x0, PBT(x0)]], runs, cuts: RILL_CUTS });
}
const curb = (x0, x1) => [[x0, PT(x0)], [x1, PT(x1)], [x1, PBT(x1)], [x0, PBT(x0)]];
add({ id: "pocket-curb", per: "opening", name: "Flush concrete curb, house side of the pocket", role: "concrete", mat: "concrete-exposed", junction: "M", src: ["08b M"], poly: curb(POCKET.x[0], POCKET.x[0] - 100), runs: [[0, 1100]] });
add({ id: "pocket-curb-w", per: "opening", name: "Flush concrete curb, terrace side of the pocket", role: "concrete", mat: "concrete-exposed", junction: "M", src: ["08b M"], poly: curb(POCKET.x[0] - 100, PATH_END), runs: [[1000, 1100]] });
add({ id: "pocket-soil", per: "opening", name: "Growing medium 600 in the pocket, open to the bed", role: "ground", mat: "soil-imported", junction: "M", src: ["08b M", "R3 F10"],
  poly: [[POCKET.x[0] - 100, PT(POCKET.x[0] - 100) - 50], [BED0, PT(PATH_END) - 50], [BED0, PT(PATH_END) - 650], [POCKET.x[0] - 100, PT(POCKET.x[0] - 100) - 650]], runs: [[0, 1000]] });
add({ id: "root-barrier-pocket", per: "opening", name: "Ribbed HDPE root barrier 600 under the house-side curb", role: "planting", mat: "hdpe", junction: "M", src: ["08b M"],
  type: "sheet", t: 2, path: [[POCKET.x[0] - 50, PBT(POCKET.x[0] - 50) + 20], [POCKET.x[0] - 50, PBT(POCKET.x[0] - 50) - 600]], runs: [[0, 1100]], embeds: ["subgrade", "pocket-curb"],
  note: "Top edge cast 20 into the curb underside, so roots cannot pass between curb and barrier." });
add({ id: "edge-restraint", name: "Cast-in-place concrete edge restraint (open at the pocket)", role: "concrete", mat: "concrete-exposed", junction: "P", src: ["08 H"],
  poly: [[PATH_END, PT(PATH_END)], [BED0, PT(PATH_END)], [BED0, PBT(PATH_END) - 20], [PATH_END, PBT(PATH_END) - 20]], runs: TER, cuts: RILL_CUTS });
// Surface rill (R2 P1, R3 P2): covered trench across the terrace, open stone runnel down the bed.
const INV = (x) => -120 - 0.01 * (CH_OUT - x);
add({ id: "rill-walls", per: "opening", name: "Rill trench walls (polymer concrete), 1 % fall", role: "drainage", mat: "polymer-concrete", junction: "J", src: ["R2 P1", "R3 P2"],
  poly: [[CH_OUT, PT(CH_OUT)], [BED0, PT(PATH_END)], [BED0, INV(BED0) - 20], [CH_OUT, INV(CH_OUT) - 20]], runs: [[RILL_W[0] - 10, RILL_W[0]], [RILL_W[1], RILL_W[1] + 10]] });
add({ id: "rill-floor", per: "opening", name: "Rill trench floor", role: "drainage", mat: "polymer-concrete", junction: "J", src: ["R2 P1"],
  poly: [[CH_OUT, INV(CH_OUT)], [BED0, INV(BED0)], [BED0, INV(BED0) - 20], [CH_OUT, INV(CH_OUT) - 20]], runs: [RILL_W] });
add({ id: "rill-grate", per: "opening", name: "Rill cover grate, heel-safe (B651 4.3.4, 8.2.4)", role: "metal", mat: "stainless", fill: 0.35, junction: "J", src: ["R2 P1"],
  poly: [[CH_OUT, PT(CH_OUT)], [BED0, PT(PATH_END)], [BED0, PT(PATH_END) - 20], [CH_OUT, PT(CH_OUT) - 20]], runs: [RILL_W],
  note: "The box gutter's downspout discharges into the rill head (rain chain); channel and rill form one sealed system to the garden." });
// Planting bed (gentle 3.7 % fall, tree pit) and rain garden (R2 1, R3 F1–F6).
const RIM = -5150, RIM_Y = -122, CREST = -250, PONDB = CREST - 200;
const BT0 = PT(PATH_END) - 50;                         // mulch 50 below the edge restraint, so it stays in the bed (R3 F16, R5 F14)
const BT = (x) => BT0 + (RIM_Y - BT0) * (BED0 - x) / (BED0 - RIM);
const PIT = [-3900, -4900];
const RUNNEL_CUTS = ["runnel-walls", "runnel-floor"];
add({ id: "bed-mulch", name: "Wood-chip mulch 75, leaf litter left", role: "ground", mat: "soil", junction: "I", src: ["08 I"],
  poly: [[BED0, BT(BED0)], [RIM, BT(RIM)], [RIM, BT(RIM) - 75], [BED0, BT(BED0) - 75]], cuts: RUNNEL_CUTS });
add({ id: "bed-soil", name: "Planting bed medium 450, tree pit 1000 deep (R3 F8)", role: "ground", mat: "soil-imported", junction: "I", src: ["08 I", "R3 F8"],
  poly: [[BED0, BT(BED0) - 75], [RIM, BT(RIM) - 75], [RIM, BT(RIM) - 525], [PIT[1], BT(PIT[1]) - 525], [PIT[1], BT(PIT[1]) - 1000], [PIT[0], BT(PIT[0]) - 1000], [PIT[0], BT(PIT[0]) - 525], [BED0, BT(BED0) - 525]],
  cuts: RUNNEL_CUTS });
add({ id: "root-barrier-path", name: "Ribbed HDPE root barrier 600 at the path edge", role: "planting", mat: "hdpe", junction: "I", src: ["08 I"],
  type: "sheet", t: 2, path: [[BED0 - 3, BT(BED0) - 77], [BED0 - 3, BT(BED0) - 677]], embeds: ["bed-soil", "subgrade"],
  runs: [[1100, RILL_W[0] - 50], [Math.min(RILL_W[1] + 40, SPAN[1]), SPAN[1]]].filter(([a, b]) => b > a), note: "Butt-sealed to the runnel walls where the runnel crosses." });
add({ id: "runnel-walls", per: "opening", name: "Open mortared stone runnel walls, 150 x 100", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 P1", "R3 P2", "08 J16"],
  poly: [[BED0, BT(BED0)], [RIM, BT(RIM)], [RIM, BT(RIM) - 150], [BED0, BT(BED0) - 150]], runs: [[RILL_W[0] - 50, RILL_W[0]], [RILL_W[1], Math.min(RILL_W[1] + 40, SPAN[1])]] });
add({ id: "runnel-floor", per: "opening", name: "Stone runnel floor (sealed within 5 m)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R2 P1"],
  poly: [[BED0, BT(BED0) - 100], [RIM, BT(RIM) - 100], [RIM, BT(RIM) - 150], [BED0, BT(BED0) - 150]], runs: [RILL_W] });
const IN0 = RIM - 3 * (RIM_Y - PONDB), FLOOR1 = IN0 - 800, FAR_RIM = CREST + 100, FAR = FLOOR1 - 3 * (FAR_RIM - PONDB);
const GS = (x) => (x >= IN0 ? RIM_Y - (RIM - x) / 3 : x >= FLOOR1 ? PONDB : PONDB + (FLOOR1 - x) / 3);
add({ id: "rg-apron", per: "opening", name: "Cobble apron at the runnel outfall (inner slope)", role: "drainage", mat: "reclaimed-stone", junction: "J", src: ["R3 F4"],
  poly: [[RIM, RIM_Y], [RIM - 600, RIM_Y - 200], [RIM - 600, RIM_Y - 280], [RIM, RIM_Y - 80]], runs: [[RILL_W[0] - 150, Math.min(RILL_W[1] + 150, SPAN[1])]] });
add({ id: "rg-mulch", name: "Stone mulch 75 on the garden floor (wood mulch floats)", role: "ground", mat: "aggregate", junction: "J", src: ["08 J", "R3 F5"],
  poly: [[IN0, PONDB], [FLOOR1, PONDB], [FLOOR1, PONDB - 75], [IN0, PONDB - 75]] });
add({ id: "rg-medium", name: "Bioretention medium 450 (≥ 70 mm/h), planted 3:1 slopes", role: "ground", mat: "soil-imported", junction: "J", src: ["08 J"],
  poly: [[RIM, RIM_Y], [IN0, PONDB], [IN0, PONDB - 75], [FLOOR1, PONDB - 75], [FLOOR1, PONDB], [FAR, FAR_RIM], [FAR, PONDB - 525], [RIM, PONDB - 525]], cuts: ["rg-apron"] });
add({ id: "rg-choker", name: "Choker layer 100", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(FAR, PONDB - 625, RIM, PONDB - 525) });
add({ id: "rg-rock", name: "Clear rock reservoir 300", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(FAR, PONDB - 925, RIM, PONDB - 625), cuts: ["rg-subdrain"] });
add({ id: "rg-subdrain", name: "Perforated subdrain 150 near the TOP of the rock (infiltration below)", role: "drainage", mat: "hdpe", junction: "J", src: ["R3 F3"],
  type: "rod", axis: "w", x: (IN0 + FLOOR1) / 2, y: PONDB - 710, d: 160, di: 150, from: 0, to: L });
add({ id: "rg-riser", per: "opening", name: "Overflow riser 200 with beehive grate at the crest, to tank and storm", role: "drainage", mat: "pvc-pipe", junction: "J", src: ["08 J", "R3 F5", "VBBL Book II 2.4.2.5"],
  type: "rod", axis: "y", x: (IN0 + FLOOR1) / 2, w: [900], d: 210, di: 200, from: PONDB - 710, to: CREST, embeds: ["rg-medium", "rg-choker", "rg-rock", "rg-mulch", "rg-subdrain"],
  note: "Stone collar around the riser; backflow flap at the tank connection; 1 m spillway notch in the far rim at crest + 45 (R3 F2, outside this slice)." });
const subTop = [[331, -470], [-120, -470], [-120, -470.5], [ROCK_OUT - 0.5, -470.5], [ROCK_OUT - 0.5, PBL(ROCK_OUT) - 2.01], LINER_OUT[1], [LINER_END, PBT(LINER_END)],
  [LINER_END - 2, PBT(LINER_END - 2)], [PATH_END, PBT(PATH_END)], [PATH_END, PBT(PATH_END) - 20], [BED0, PBT(PATH_END) - 20], [BED0, BT(BED0) - 525],
  [PIT[0], BT(PIT[0]) - 525], [PIT[0], BT(PIT[0]) - 1000], [PIT[1], BT(PIT[1]) - 1000], [PIT[1], BT(PIT[1]) - 525], [RIM, BT(RIM) - 525],
  [RIM, PONDB - 925], [FAR, PONDB - 925], [FAR, FAR_RIM], [-8000, FAR_RIM + 10]];
add({ id: "subgrade", name: "Compacted subgrade / native soil", role: "ground", mat: "soil", junction: "E", src: ["07 E1", "08 H"],
  poly: [...subTop, [-8000, -1700], [331, -1700]], cuts: ["pocket-soil", "root-barrier-pocket", "root-barrier-path"] });
add({ id: "interior-subgrade", name: "Compacted subgrade under the slab", role: "ground", mat: "soil", junction: "F", src: ["12"], poly: [[331, -470], [331, -1700], [2500, -1700], [2500, -300], [331, -300]] });

// =================== People and planting (entourage proxies) ===================
add({ id: "person-inside", name: "Occupant standing inside (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: 1100, w: [700], d: 360, from: 0, to: 1700 });
add({ id: "person-terrace", name: "Person on the landing (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: -1300, w: [1100], d: 360, from: PT(-1120), to: PT(-1120) + 1700, embeds: ["pavers-lined"] });
add({ id: "shrub", name: "Evergreen huckleberry, pruned 1.5 m, off the opening axis (proxy)", role: "planting", mat: "vegetation", junction: "M", src: ["08b M", "R5 F5"],
  type: "revolve", x: -2800, w: [500], profile: [[0, PT(-2800) - 70], [400, PT(-2800) + 200], [550, PT(-2800) + 800], [380, PT(-2800) + 1350], [0, PT(-2800) + 1460]], embeds: ["pocket-soil"] });
add({ id: "tree", name: "Small tree (Amelanchier alnifolia) in a 1 m tree pit (proxy)", role: "planting", mat: "vegetation", junction: "I", src: ["08 I", "R3 F8"],
  type: "revolve", x: -4400, w: [900], profile: [[0, BT(-4400) - 75], [75, BT(-4400) - 75], [75, BT(-4400) + 1900], [1300, BT(-4400) + 2600], [1200, BT(-4400) + 3600], [0, BT(-4400) + 4300]],
  embeds: ["bed-mulch", "bed-soil"] });
for (const [i, x] of [-5600, -6400, -7300].entries())
  add({ id: `rg-plant-${i + 1}`, name: ["Slough sedge (wet slope)", "Common rush (garden floor)", "Pacific ninebark (upper far slope)"][i] + " (proxy)", role: "planting", mat: "vegetation", junction: "J", src: ["R3 F6"],
    type: "revolve", x, w: [[400, 200, 1000][i]], profile: [[0, GS(x) - 20], [250, GS(x) + 100], [300, GS(x) + 500], [0, GS(x) + 700]], embeds: ["rg-mulch", "rg-medium"] });

// =================== Appearance massing (appearance mode only) ===================
if (APP) {
  const JAMB = [[-900, 0]];
  add({ id: "jamb-plinth", name: "Jamb wall plinth, dark parge (massing — base junction not yet resolved)", role: "concrete", mat: "concrete-exposed", junction: "Z", src: ["massing"], poly: R(-110, -300, 200, 230), runs: JAMB });
  add({ id: "jamb-wall", name: "Jamb wall body (massing)", role: "frame", mat: "softwood-lumber", fill: 0.2, junction: "Z", src: ["massing"], poly: R(-126, 230, 200, LINT0), runs: JAMB });
  add({ id: "jamb-cedar", name: "Jamb wall WRC channel siding (massing)", role: "cladding", mat: "cedar-siding", junction: "Z", src: ["09 W1", "massing"], poly: R(CEDAR, 260, -126, 2875), runs: JAMB });
}

const views = [
  { id: "T-threshold", x: [-260, 300], y: [-220, 160] },
  { id: "H-head", x: [-800, 260], y: [2650, 3500] },
  { id: "F-floor", x: [-200, 700], y: [-520, 120] },
  { id: "M-landing", x: [-2200, 100], y: [-600, 200] },
  { id: "I-bed-tree", x: [-5400, -3000], y: [-1200, 4400] },
  { id: "J-rain-garden", x: [-8000, -4800], y: [-1500, 300] },
  { id: "S-section", x: [-8000, 2500], y: [-1700, 4600] },
];
const assemblies = [
  { name: "Floor (slab on 100 graphite EPS)", target: 2.45, films: [0.16], layers: [{ mat: "concrete-lowcarbon", t: 100 }, { mat: "graphite-eps", t: 100 }] },
  { name: "Head band (W250 lintel: flanges as a 10 % steel path, + 130 stone wool)", target: 3.85, layers: [{ mat: "comfortbatt", t: 128, framing: { mat: "steel-section", frac: 0.1 } }, { mat: "comfortboard-80", t: 130 }], films: [0.12, 0.12] },   // vented cladding excluded; still-air film outside (R1 F8)
  { name: "Roof (polyiso avg 190 + deck)", target: 4.3, films: [0.1, 0.03], layers: [{ mat: "plywood", t: 16 }, { mat: "polyiso-lowgwp", t: 190 }, { mat: "gypsum", t: 12 }] },
];
const zones = { F: { label: "floor", depth_m: 2.24 }, T: { label: "threshold", depth_m: 0.66 }, H: { label: "head band + lintel", depth_m: 0.33 }, P: { label: "granite terrace", depth_m: 1.4 }, R: { label: "roof + overhang", depth_m: 3.13 },
  M: { label: "lined landing", depth_m: 1.68 }, I: { label: "planting bed", depth_m: 1.75 }, J: { label: "rill + rain garden", depth_m: 2.85 }, E: { label: "subgrade / drain", depth_m: 0.4 } };

const out = APP ? "./detail02-app.json" : "./detail02.json";
writeFileSync(new URL(out, import.meta.url), JSON.stringify({ L, root: "Detail02", opening_mm: 4800, parts, views, assemblies, zones }, null, 1));
console.log(`${parts.length} parts -> ${out}`);
