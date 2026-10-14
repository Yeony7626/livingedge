// Detail 02 spec: lift-and-slide glazed wall to ground, flush accessible threshold, permeable pavers with a
// shrub, planting bed with a small tree, rain garden; low-carbon slab inside; green roof eave.
// Research: 11 (sliding wall), 12 (ground floor), 08 + 08b (landscape, threshold paving), 09 (assemblies),
// 10 (finish), 06 B (eave). Writes detail02.json for build.py / packet.py / metrics.mjs.
//
// Datums (research/11 §3.1): x = 0 at the sliding frame's exterior face, EXTERIOR NEGATIVE; y = 0 at the
// finished floor (FFL); w = along the wall, 0 at the back, L at the cut. Millimetres. `src` names research rows.
// The section runs 8 m out (to the far rim of the rain garden) and 2.5 m in.
import { writeFileSync } from "node:fs";

const L = 1800;
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const parts = [];
const add = (p) => parts.push(p);
const steps = (a, b, s) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);
const upTo = (runs, w1) => runs.filter(([a]) => a < w1).map(([a, b]) => [a, Math.min(b, w1)]);
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

// Joists / bays along the wall at 400 o.c.; the glazing runs the full slice.
const JOISTS = [[60, 98], [466, 504], [862, 900], [1258, 1296], [1654, 1692]];
const BAYS = [[0, 60], [98, 466], [504, 862], [900, 1258], [1296, 1654], [1692, 1800]];
const STRAPS = [[47, 111], [453, 517], [849, 913], [1245, 1309]];

// =================== Threshold, floor and foundation (11 §3, 12) ===================
const SLOT_BACK = 231;                         // slot = sill depth 180 + 51 (12, MAR-ULS)
const WEDGE_BACK = -66, WEDGE_FRONT = -81;     // pan bed falls 6 % outward (11 T4)
const CH_IN = -21.5, CH_OUT = -171.5;          // channel body, pan downturn sits between it and the block
add({ id: "beam", name: "Engineered reinforced grade beam + footing under the opening (Part 4)", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["12 foundation", "11 T1"],
  poly: [[-120, -470], [331, -470], [331, -320], [SLOT_BACK, -320], [SLOT_BACK, -181], [-20, -181], [-20, -320], [-120, -320]],
  note: "Grade beam and footing by a structural engineer; underside 450+ below exterior grade (frost); sill support level within 1 mm over the opening." });
add({ id: "dampproof", name: "Water-based damp-proofing on beam face (XPS-compatible)", role: "water", mat: "membrane-poly", junction: "T", src: ["07 E6", "ABC loop2 N10"],
  type: "sheet", t: 1, path: [[-20.5, -181], [-20.5, -320]] });
add({ id: "beam-xps", name: "XPS (HFO) 75 on beam face, footing to under the block course", role: "thermal", mat: "xps-hfo", junction: "T", src: ["11 T2", "07 D7"], poly: R(-96, -320, -21, -181) });
add({ id: "perinsul", name: "Load-bearing cellular-glass block course 100 (thermal break under the track)", role: "thermal", mat: "graphite-eps", junction: "T", src: ["12 PERINSUL HL", "11 T9 (PUR alternate)"],
  poly: R(-20, -181, SLOT_BACK, -81), note: "FOAMGLAS PERINSUL HL (λ 0.058, 2.75 MPa); Canadian supply unconfirmed — alternate: Purenit/Phonotherm PUR block 50 (research/11 T9)." });
add({ id: "wedge", name: "Mortar bed sloped 6 % outward (pan bed)", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["11 T4"],
  poly: [[-20, WEDGE_FRONT], [SLOT_BACK, WEDGE_FRONT], [SLOT_BACK, WEDGE_BACK]] });
// Interior floor (12 recommendation (c)).
add({ id: "stone", name: "Clear stone 100, gas-permeable layer and capillary break", role: "drainage", mat: "aggregate", junction: "F", src: ["12 build-up"],
  poly: [[SLOT_BACK, -320], [331, -320], [331, -300], [2500, -300], [2500, -200.25], [SLOT_BACK, -200.25]],
  note: "Radon rough-in per VBBL 9.13.4.3: inlet near slab centre, pipe sealed at the barrier (outside this slice)." });
add({ id: "eps-1", name: "Graphite EPS Type 2, 50 (layer 1)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(SLOT_BACK + 0.25, -200.25, 2500, -150.25) });
add({ id: "eps-2", name: "Graphite EPS Type 2, 50 (layer 2, joints staggered)", role: "thermal", mat: "graphite-eps", junction: "F", src: ["12 build-up"], poly: R(SLOT_BACK + 0.25, -150.25, 2500, -100.25) });
add({ id: "soilgas", name: "0.25 mm soil-gas / air barrier, up the slab edge to the pan back dam", role: "air", mat: "membrane-poly", junction: "F", src: ["12 sealing", "11 T7"],
  type: "sheet", t: 0.25, path: [[2500, -100.125], [SLOT_BACK + 0.125, -100.125], [SLOT_BACK + 0.125, -15]] });
add({ id: "slab", name: "Low-carbon concrete slab 100, ground/polished finish (mineral apron at the sill)", role: "concrete", mat: "concrete-lowcarbon", junction: "F", src: ["12 build-up", "11 T20"],
  poly: R(SLOT_BACK + 0.25, -100, 2500, 0) });
const PAN_BED = [[SLOT_BACK, -15], [SLOT_BACK, WEDGE_BACK], [-20, WEDGE_FRONT], [-20, -131]];
add({ id: "pan", name: "Liquid-applied sill pan: back dam to −15, 6 % floor, 50 downturn by the channel", role: "water", mat: "membrane-poly", junction: "T", src: ["11 T6", "LOE-INST", "NRC-WWI"],
  type: "sheet", t: 1.5, path: offsetPath(PAN_BED, -0.75), note: "End dams 150+ up the jambs (outside this slice); jamb membranes lap over the end dams." });
// Track, panel and drainage of the track.
const panTop = (x) => WEDGE_FRONT + (WEDGE_BACK - WEDGE_FRONT) * (x + 20) / (SLOT_BACK + 20) + 1.5 / Math.cos(Math.atan(15 / 251));
add({ id: "track", name: "Lift-and-slide sill/track (fibreglass, 2 tracks), top +5, level ±1 mm", role: "metal", mat: "aluminium", junction: "T", src: ["11 T11", "MAR-ULS"],
  poly: [[0, -42], [180, -42], [180, 5], [0, 5]], note: "Two sealant beads under the track (A440.4); screw holes sealed; drains fixed before grouting." });
add({ id: "nosing", name: "Bevelled sill nosing 1:2, +5 to −8", role: "metal", mat: "aluminium", junction: "T", src: ["11 §3.1", "B651 5.2.6"], poly: [[0, 5], [-26, -8], [-26, -20], [0, -20]] });
add({ id: "grout", name: "Chloride-free self-levelling grout around the track", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["11 T14"],
  poly: [[SLOT_BACK - 1.5, panTop(SLOT_BACK - 1.5)], [SLOT_BACK - 1.5, 0], [180, 0], [180, -42], [0, -42], [0, panTop(0)]] });
add({ id: "track-weeps", name: "Track drain tubes through the open slot face into the channel", role: "water", mat: "membrane-poly", junction: "T", src: ["11 T12"],
  type: "rod", axis: "x", y: -55, w: [300, 900, 1500], d: 12, from: -40, to: 40, embeds: ["grout", "channel", "track"] });
add({ id: "sash", name: "Lift-and-slide sash, bottom rail (fibreglass)", role: "frame", mat: "aluminium", junction: "T", src: ["11 R1"], poly: R(15, 10, 85, 120) });
for (const [i, x] of [28, 48, 68].entries())
  add({ id: `glass-${i + 1}`, name: `Triple IGU pane ${i + 1} (4 mm, low-e, argon, warm edge), safety glass`, role: "cladding", mat: "glass", junction: "T", src: ["11 R1", "V2 9.6.1.4"],
    poly: R(x, 60, x + 4, 2630) });
add({ id: "sash-top", name: "Sash top rail", role: "frame", mat: "aluminium", junction: "H", src: ["11 R1"], poly: R(15, 2600, 85, 2690) });
add({ id: "head-track", name: "Head track / head jamb", role: "frame", mat: "aluminium", junction: "H", src: ["11 H5"], poly: R(0, 2690, 180, 2730) });

// =================== Head (11 §4) ===================
const LINT0 = 2770, LINT1 = 3036, JST1 = LINT1 + 235, DECK = JST1 + 16, AVB = DECK + 3;
add({ id: "head-gap", name: "Compressible insulation in head gap (no expanding foam)", role: "thermal", mat: "comfortbatt", junction: "H", src: ["11 H6"], poly: R(0, 2730, 180, 2742) });
add({ id: "head-membrane", name: "Head air/water membrane, lintel face into rough head", role: "air", mat: "membrane-poly", junction: "H", src: ["11 H4"],
  type: "sheet", t: 0.5, path: [[24.15, LINT1], [24.15, 2742.25], [100, 2742.25]] });
add({ id: "packer", name: "PT packer, continuous flat head surface", role: "frame", mat: "softwood-lumber", junction: "H", src: ["11 H3"], poly: R(25, 2742.5, 155, LINT0) });
add({ id: "lintel", name: "Glulam lintel 130x266 (engineer: deflection ≤ 3 mm)", role: "frame", mat: "softwood-lumber", junction: "H", src: ["11 H1"], poly: R(25, LINT0, 155, LINT1),
  note: "5 m span at L/1667 needs engineering; a steel or flitch beam may be required." });
const HF_X = 24.4 - 0.305;
add({ id: "head-flashing", name: "Head flashing 24 ga prefinished, 6 % fall, drip 5 past cladding, end dams", role: "water", mat: "steel-prefinished", junction: "H", src: ["11 H10", "01 req.flashing-geometry"],
  type: "sheet", t: 0.61, path: [[HF_X, 2830], [HF_X, 2746], [-93.6, 2739], [-98.6, 2734]], note: "Fastened through the upstand above the water line; head membrane laps over the upstand." });
const EI_IN = HF_X - 0.305, EI_OUT = EI_IN - 75, STRAP_OUT = EI_OUT - 19, CEDAR = STRAP_OUT - 19;
add({ id: "band-ei", name: "Stone-wool board 75 on lintel face (head band)", role: "thermal", mat: "comfortboard-80", junction: "H", src: ["11 H9", "09 alternate"], poly: R(EI_OUT, 2748, EI_IN, 3017), runs: [[0, 1500]] });
add({ id: "band-strap", name: "PT strapping 19x64", role: "frame", mat: "softwood-lumber", junction: "H", src: ["06 A13"], poly: R(STRAP_OUT, 2750, EI_OUT, 2978), runs: STRAPS });
add({ id: "band-screen", name: "Insect screen ≤ 2 mm at band cavity base", role: "metal", mat: "stainless", junction: "H", src: ["08 L", "06 A14"], type: "sheet", t: 0.5, path: [[EI_OUT, 2749.75], [STRAP_OUT, 2749.75]], runs: [[0, 1400]] });
add({ id: "band-cedar", name: "Western red cedar channel siding 19, bleaching oil", role: "cladding", mat: "cedar-siding", junction: "H", src: ["09 W1", "user decision"], poly: R(CEDAR, 2752, STRAP_OUT, 2958), runs: [[0, 1300]] });
add({ id: "band-closure", name: "PT cavity-top closure (cavity not open to soffit)", role: "frame", mat: "softwood-lumber", junction: "H", src: ["06 B22"], poly: R(STRAP_OUT, 2978, EI_OUT, 3017), runs: [[0, 1400]] });
add({ id: "band-vent", name: "Insect screen across cavity-top vent slot", role: "metal", mat: "stainless", junction: "H", src: ["06 B22"],
  type: "sheet", t: 0.5, path: [[CEDAR - 0.25, 2958], [CEDAR - 0.25, 3016.75], [STRAP_OUT - 2, 3016.75]], runs: [[0, 1400]] });
add({ id: "frieze", name: "Cedar frieze on soffit, vent slot below", role: "cladding", mat: "cedar-siding", junction: "H", src: ["06 B24"], poly: R(CEDAR - 26, 2978, CEDAR - 7, 3017), runs: [[0, 1500]] });
// Roof structure over the lintel (06 B, 09 d).
const FASCIA_OUT = -600, FASCIA_IN = -575, NAIL_IN = FASCIA_IN + 140, FL_IN = FASCIA_OUT + 110;
add({ id: "joists", name: "Roof joists 38x235 over lintel, 575 cantilever", role: "frame", mat: "softwood-lumber", junction: "R", src: ["06 B3"], poly: R(FASCIA_IN, LINT1, 2500, JST1), runs: JOISTS,
  note: "Toe-nails and uplift ties per joist; green-roof load to be checked by the engineer (09)." });
add({ id: "blocking", name: "Full-depth blocking, caulked 4 sides", role: "frame", mat: "softwood-lumber", junction: "R", src: ["06 B4"], poly: R(25, LINT1, 63, JST1), runs: BAYS });
add({ id: "foam", name: "Closed-cell spray foam air tie, lintel to deck", role: "air", mat: "graphite-eps", junction: "R", src: ["06 B5"], poly: R(63, LINT1, 185, JST1), runs: BAYS });
add({ id: "ei-top", name: "Stone-wool infill between joists (wall-line thermal continuity)", role: "thermal", mat: "comfortboard-80", junction: "R", src: ["06 B6"], poly: R(EI_OUT, LINT1, 24.4, JST1), runs: BAYS });
add({ id: "soffit", name: "Cedar soffit 19, open-joint vent with screen", role: "cladding", mat: "cedar-siding", junction: "R", src: ["06 B20", "10"], poly: R(FASCIA_IN, 3017, EI_OUT - 0.5, LINT1), runs: [[0, 1500]] });
add({ id: "ceiling", name: "Gypsum ceiling 12.7 (no ceiling poly: exterior-insulated roof)", role: "frame", mat: "gypsum", junction: "R", src: ["ABC 16"], poly: R(185, LINT1 - 12.7, 2500, LINT1) });
add({ id: "deck", name: "Plywood roof deck 16", role: "frame", mat: "plywood", junction: "R", src: ["06 B7"], poly: R(FASCIA_IN, JST1, 2500, DECK) });
add({ id: "avb", name: "Self-adhered air/vapour control layer on deck (pre-strip at wall line)", role: "air", mat: "sbs", junction: "R", src: ["06 B8", "06 B9"], type: "sheet", t: 3, path: [[FASCIA_IN, DECK + 1.5], [2500, DECK + 1.5]] });
for (const [i, [y0, y1]] of [[AVB, AVB + 38], [AVB + 38, AVB + 76], [AVB + 76, AVB + 114], [AVB + 114, AVB + 152], [AVB + 152, AVB + 162]].entries())
  add({ id: `nailer-${i + 1}`, name: i < 4 ? `PT nailer ply ${i + 1} of 4` : "PT nailer rip 10", role: "frame", mat: "softwood-lumber", junction: "R", src: ["06 B11", "ABC 13"], poly: R(FASCIA_IN, y0, NAIL_IN, y1), runs: [[0, 1700]] });
const TOP0 = AVB + 162;                           // top of nailer / cover board at the edge
const RT = (x) => TOP0 + 0.02 * Math.max(0, x - NAIL_IN);
add({ id: "roofins-1", name: "Low-GWP polyiso 75", role: "thermal", mat: "polyiso-lowgwp", junction: "R", src: ["09 d"], poly: R(NAIL_IN, AVB, 2500, AVB + 75), runs: [[0, 1650]] });
add({ id: "roofins-2", name: "Low-GWP polyiso tapered, 2 % to eave", role: "thermal", mat: "polyiso-lowgwp", junction: "R", src: ["09 d"], poly: [[NAIL_IN, AVB + 75], [2500, AVB + 75], [2500, RT(2500) - 12], [NAIL_IN, TOP0 - 12]], runs: [[0, 1600]] });
add({ id: "coverboard", name: "Cover board 12", role: "frame", mat: "gypsum", junction: "R", src: ["06 B12"], poly: [[NAIL_IN, TOP0 - 12], [2500, RT(2500) - 12], [2500, RT(2500)], [NAIL_IN, TOP0]], runs: [[0, 1550]] });
add({ id: "fascia", name: "Cedar fascia 25 on joist ends and nailer", role: "cladding", mat: "cedar-siding", junction: "R", src: ["06 B18"], poly: R(FASCIA_OUT, 3006, FASCIA_IN, TOP0), runs: [[0, 1650]] });
const roofTop = [[FASCIA_OUT, TOP0 - 52], [FASCIA_OUT, TOP0], [NAIL_IN, TOP0], [2500, RT(2500)]];
add({ id: "membrane-roof", name: "2-ply SBS, root-resistant cap (green roof)", role: "water", mat: "sbs", junction: "R", src: ["09 d", "RCABC"], type: "sheet", t: 7, path: offsetPath(roofTop, 3.5), runs: [[0, 1500]] });
const MT = (x) => (x <= NAIL_IN ? TOP0 + 7 : RT(x) + 7 / Math.cos(Math.atan(0.02)));
add({ id: "edge-metal", name: "24 ga metal edge over membrane, drip 12 off face", role: "water", mat: "steel-prefinished", junction: "R", src: ["06 B15"],
  type: "sheet", t: 0.61, path: [[FL_IN, TOP0 + 7.305], [FASCIA_OUT - 7.305, TOP0 + 7.305], [FASCIA_OUT - 7.305, TOP0 - 100], [FASCIA_OUT - 19.305, TOP0 - 112]], runs: [[0, 1500]],
  note: "Continuous cleat and hemmed drip as Detail 01 v2 (ABC 2); strip-in over the flange." });
const GRAVEL_END = -100;
add({ id: "gravel-edge", name: "Washed gravel edge strip 60 (green-roof fire/vegetation-free zone)", role: "drainage", mat: "aggregate", junction: "R", src: ["09 d"],
  poly: [[FL_IN + 2, MT(FL_IN)], [GRAVEL_END, MT(GRAVEL_END)], [GRAVEL_END, MT(GRAVEL_END) + 60], [FL_IN + 2, MT(FL_IN) + 60]], runs: [[0, 1500]] });
add({ id: "gr-edge-profile", name: "Perforated green-roof edge profile", role: "metal", mat: "stainless", junction: "R", src: ["09 d"],
  type: "sheet", t: 1.5, path: [[GRAVEL_END + 0.75, MT(GRAVEL_END) + 100], [GRAVEL_END + 0.75, MT(GRAVEL_END) + 0.75], [GRAVEL_END + 60, MT(GRAVEL_END + 60) + 0.75]], runs: [[0, 1500]] });
const GR0 = GRAVEL_END + 1.5;
add({ id: "drain-mat", name: "Drainage/retention board 20", role: "drainage", mat: "membrane-poly", junction: "R", src: ["09 d"],
  poly: [[GR0, MT(GR0) + 1.5], [2500, MT(2500) + 1.5], [2500, MT(2500) + 21.5], [GR0, MT(GR0) + 21.5]], runs: [[0, 1450]] });
add({ id: "growing-medium", name: "Extensive growing medium 80", role: "ground", mat: "aggregate", junction: "R", src: ["09 d"],
  poly: [[GR0, MT(GR0) + 21.5], [2500, MT(2500) + 21.5], [2500, MT(2500) + 101.5], [GR0, MT(GR0) + 101.5]], runs: [[0, 1400]] });
add({ id: "sedum", name: "Biodiverse sedum and native forb mat", role: "ground", mat: "soil", junction: "R", src: ["09 d", "08 L"],
  poly: [[GR0, MT(GR0) + 101.5], [2500, MT(2500) + 101.5], [2500, MT(2500) + 140], [GR0, MT(GR0) + 140]], runs: [[0, 1350]] });
add({ id: "gutter", name: "Prefinished gutter on 8 mm stand-offs, leaf screen", role: "water", mat: "steel-prefinished", junction: "R", src: ["06 B19", "08 J", "11 H13"],
  type: "sheet", t: 0.6, path: [[FASCIA_OUT - 8.3, TOP0 - 118], [FASCIA_OUT - 8.3, TOP0 - 228], [FASCIA_OUT - 133, TOP0 - 228], [FASCIA_OUT - 143, TOP0 - 133]], runs: [[0, 1700]],
  note: "Downspout at the end of the opening with a boot + cleanout; leader piped (solid PVC, 1 %) to the rain garden, never onto the landing." });
add({ id: "gutter-spacers", name: "Stainless stand-offs 8", role: "metal", mat: "stainless", junction: "R", src: ["ABC 3"], poly: R(FASCIA_OUT - 8, TOP0 - 150, FASCIA_OUT, TOP0 - 130), runs: [[290, 310], [890, 910], [1490, 1510]] });

// =================== Exterior ground (11 T16–T19, 08b M, 08 H/I/J) ===================
const PT = (x) => -8 - 0.02 * (CH_OUT - x);     // paver top: −8 at the channel, 2 % fall away
const LINER_END = -1850, PATH_END = -3250, POCKET = [-3200, -2000];
add({ id: "channel", name: "Polymer-concrete trench channel, inner 130, invert −120, side inlets for track weeps", role: "drainage", mat: "concrete-exposed", junction: "T", src: ["11 T16", "08b M"],
  poly: [[CH_OUT, -8], [CH_OUT, -130], [CH_IN, -130], [CH_IN, -20], [CH_IN - 10, -20], [CH_IN - 10, -120], [CH_OUT + 10, -120], [CH_OUT + 10, -8]],
  note: "Full opening width + 150 each side; outlet at the channel end through a silt box and cleanout into the solid rainwater line (never the foundation drain)." });
add({ id: "grate", name: "Stainless heel-safe grate, slots ≤ 6.5 mm parallel to the door, top −8", role: "metal", mat: "stainless", junction: "T", src: ["08b M", "B651 4.3.4"], poly: R(CH_OUT + 10, -28, CH_IN - 10, -8) });
add({ id: "grate-screen", name: "Dirt screen 1.0–1.2 mm under grate", role: "metal", mat: "stainless", junction: "T", src: ["11 T16"], type: "sheet", t: 0.5, path: [[CH_OUT + 10, -28.25], [CH_IN - 10, -28.25]] });
add({ id: "haunch", name: "Concrete haunch under channel", role: "concrete", mat: "concrete-lowcarbon", junction: "T", src: ["11 T16"], poly: R(CH_OUT, -165, CH_IN, -130) });
// Lined landing (08b): pavers 80, No. 8 bedding 50, No. 57 base 150, geotextile + 1 mm HDPE + geotextile.
const PB = (x) => PT(x) - 280;                  // base bottom
const UD = -1750, UD_W = 50;                     // underdrain trench centre and half width
const linerBed = [[CH_OUT - 0.5, -40], [CH_OUT - 0.5, PB(CH_OUT)], [UD + UD_W, PB(UD + UD_W)], [UD + UD_W, PB(UD) - 160], [UD - UD_W, PB(UD) - 160], [UD - UD_W, PB(UD - UD_W)],
  [LINER_END, PB(LINER_END)], [LINER_END, PT(LINER_END) - 130]];
add({ id: "liner", name: "1.0 mm HDPE liner between geotextiles, turned up at the channel and as a cut-off at 1.85 m", role: "water", mat: "membrane-poly", junction: "M", src: ["08b M"],
  type: "sheet", t: 2, path: offsetPath(linerBed, 1) });
const lined = (x0, x1) => [[x0, PT(x0) - 80], [x1, PT(x1) - 80]];
add({ id: "pavers-lined", name: "Concrete pavers 80, joints ≤ 6 mm, BPN ≥ 55 (lined landing)", role: "ground", mat: "concrete-exposed", junction: "M", src: ["08b M", "08 H7"],
  poly: [[CH_OUT, PT(CH_OUT)], [LINER_END - 2, PT(LINER_END - 2)], [LINER_END - 2, PT(LINER_END - 2) - 80], [CH_OUT, PT(CH_OUT) - 80]] });
add({ id: "bedding-lined", name: "No. 8 open-graded bedding 50", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT, PT(CH_OUT) - 80], [LINER_END + 2, PT(LINER_END + 2) - 80], [LINER_END + 2, PT(LINER_END + 2) - 130], [CH_OUT, PT(CH_OUT) - 130]] });
add({ id: "base-lined", name: "No. 57 open-graded base 150, filling the underdrain trench", role: "drainage", mat: "aggregate", junction: "M", src: ["08 H"],
  poly: [[CH_OUT, PT(CH_OUT) - 130], [LINER_END + 2, PT(LINER_END + 2) - 130], [LINER_END + 2, PB(LINER_END + 2)], [UD - UD_W + 2, PB(UD - UD_W + 2)],
    [UD - UD_W + 2, PB(UD) - 158], [UD + UD_W - 2, PB(UD) - 158], [UD + UD_W - 2, PB(UD + UD_W - 2)], [CH_OUT, PB(CH_OUT)]] });
add({ id: "underdrain", name: "Perforated PVC underdrain 100 at the liner low point, 1 % to the channel outlet", role: "drainage", mat: "membrane-poly", junction: "M", src: ["08b M"],
  type: "rod", axis: "w", x: UD, y: PB(UD) - 100, d: 110, di: 102, from: 0, to: L, embeds: ["base-lined"] });
// Unlined permeable terrace beyond the liner, with the shrub pocket.
for (const [k, [x0, x1]] of [[LINER_END - 2, POCKET[1]], [POCKET[0], PATH_END]].entries()) {
  add({ id: `pavers-${k + 1}`, name: "Concrete permeable pavers 80 (unlined)", role: "ground", mat: "concrete-exposed", junction: "H", src: ["08 H7"],
    poly: [[x0, PT(x0)], [x1, PT(x1)], [x1, PT(x1) - 80], [x0, PT(x0) - 80]] });
  add({ id: `bedding-${k + 1}`, name: "No. 8 bedding 50", role: "drainage", mat: "aggregate", junction: "H", src: ["08 H"],
    poly: [[x0, PT(x0) - 80], [x1, PT(x1) - 80], [x1, PT(x1) - 130], [x0, PT(x0) - 130]] });
  add({ id: `base-${k + 1}`, name: "No. 57 base 150 on compacted subgrade (infiltrating)", role: "drainage", mat: "aggregate", junction: "H", src: ["08 H"],
    poly: [[x0, PT(x0) - 130], [x1, PT(x1) - 130], [x1, PB(x1)], [x0, PB(x0)]] });
}
add({ id: "pocket-curb", name: "Flush concrete curb ring around the shrub pocket", role: "concrete", mat: "concrete-exposed", junction: "M", src: ["08b M"],
  poly: [[POCKET[1], PT(POCKET[1])], [POCKET[1] - 100, PT(POCKET[1] - 100)], [POCKET[1] - 100, PB(POCKET[1] - 100)], [POCKET[1], PB(POCKET[1])]] });
add({ id: "pocket-curb-2", name: "Flush concrete curb ring (far side)", role: "concrete", mat: "concrete-exposed", junction: "M", src: ["08b M"],
  poly: [[POCKET[0] + 100, PT(POCKET[0] + 100)], [POCKET[0], PT(POCKET[0])], [POCKET[0], PB(POCKET[0])], [POCKET[0] + 100, PB(POCKET[0] + 100)]] });
add({ id: "pocket-soil", name: "Growing medium 600 in the shrub pocket, mulch 40 below curb", role: "ground", mat: "soil", junction: "M", src: ["08b M"],
  poly: [[POCKET[1] - 100, PT(POCKET[1] - 100) - 40], [POCKET[0] + 100, PT(POCKET[0] + 100) - 40], [POCKET[0] + 100, PT(POCKET[0] + 100) - 640], [POCKET[1] - 100, PT(POCKET[1] - 100) - 640]] });
add({ id: "root-barrier-pocket", name: "Ribbed HDPE root barrier 600 deep, house side of the pocket", role: "planting", mat: "membrane-poly", junction: "M", src: ["08b M"],
  type: "sheet", t: 2, path: [[POCKET[1] + 1, PT(POCKET[1]) - 2], [POCKET[1] + 1, PT(POCKET[1]) - 700]], embeds: ["subgrade"] });
add({ id: "edge-restraint", name: "Cast-in-place concrete edge restraint", role: "concrete", mat: "concrete-exposed", junction: "H", src: ["08 H"],
  poly: [[PATH_END, PT(PATH_END)], [PATH_END - 150, PT(PATH_END)], [PATH_END - 150, PB(PATH_END) - 20], [PATH_END, PB(PATH_END) - 20]] });
// Planting bed with a small tree, then the rain garden at 5 m+ (08 I, J).
const BED0 = PATH_END - 150, RIM = -5150, RIM_Y = -321, GARDEN_FAR = -7700, PONDB = RIM_Y - 200;
const BT = (x) => (x >= RIM ? PT(PATH_END) + (RIM_Y - PT(PATH_END)) * (BED0 - x) / (BED0 - RIM) : RIM_Y);
add({ id: "bed-mulch", name: "Wood-chip mulch 75, leaf litter left", role: "ground", mat: "soil", junction: "I", src: ["08 I"],
  poly: [[BED0, BT(BED0)], [RIM, BT(RIM)], [RIM, BT(RIM) - 75], [BED0, BT(BED0) - 75]] });
add({ id: "bed-soil", name: "Planting bed growing medium 450, 15 % organic, ≤ 80 % compaction", role: "ground", mat: "soil", junction: "I", src: ["08 I"],
  poly: [[BED0, BT(BED0) - 75], [RIM, BT(RIM) - 75], [RIM, BT(RIM) - 525], [BED0, BT(BED0) - 525]] });
add({ id: "root-barrier-path", name: "Ribbed HDPE root barrier 600 at the path edge", role: "planting", mat: "membrane-poly", junction: "I", src: ["08 I"],
  type: "sheet", t: 2, path: [[BED0 - 1, BT(BED0) - 2], [BED0 - 1, BT(BED0) - 602]], embeds: ["bed-soil", "subgrade"] });
const GSLOPE = 600;                                // 1:3 sides, 200 deep
add({ id: "rg-mulch", name: "Rain garden mulch 75", role: "ground", mat: "soil", junction: "J", src: ["08 J"],
  poly: [[RIM - GSLOPE, PONDB], [GARDEN_FAR + GSLOPE, PONDB], [GARDEN_FAR + GSLOPE, PONDB - 75], [RIM - GSLOPE, PONDB - 75]] });
add({ id: "rg-medium", name: "Bioretention medium 450 (≥ 70 mm/h)", role: "ground", mat: "soil", junction: "J", src: ["08 J"],
  poly: [[RIM, RIM_Y], [RIM - GSLOPE, PONDB], [RIM - GSLOPE, PONDB - 75], [GARDEN_FAR + GSLOPE, PONDB - 75], [GARDEN_FAR + GSLOPE, PONDB], [GARDEN_FAR, RIM_Y],
    [GARDEN_FAR, PONDB - 525], [RIM, PONDB - 525]] });
add({ id: "rg-choker", name: "Choker layer 100", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(GARDEN_FAR, PONDB - 625, RIM, PONDB - 525) });
add({ id: "rg-rock", name: "Clear rock reservoir 300 with subdrain", role: "drainage", mat: "aggregate", junction: "J", src: ["08 J"], poly: R(GARDEN_FAR, PONDB - 925, RIM, PONDB - 625) });
add({ id: "rg-subdrain", name: "Perforated subdrain 150 to the overflow riser", role: "drainage", mat: "membrane-poly", junction: "J", src: ["08 J"],
  type: "rod", axis: "w", x: -6400, y: PONDB - 840, d: 160, di: 150, from: 0, to: L, embeds: ["rg-rock"] });
add({ id: "rg-riser", name: "Overflow riser 200 (top 100 below rim) to detention tank and storm", role: "drainage", mat: "membrane-poly", junction: "J", src: ["08 J", "VBBL Book II 2.4.2.5"],
  type: "rod", axis: "y", x: -6400, w: [900], d: 210, di: 200, from: PONDB - 760, to: RIM_Y - 100, embeds: ["rg-medium", "rg-choker", "rg-rock", "rg-mulch"] });
add({ id: "rainwater-line", name: "Solid PVC rainwater line 100 at 1 %, downspout + channel to rain garden", role: "drainage", mat: "membrane-poly", junction: "J", src: ["08 J", "11 T17"],
  type: "rod", axis: "x", y: -371 - 0, dy: 51, w: [1550], d: 110, di: 102, from: RIM - GSLOPE + 40, to: -200,
  embeds: ["subgrade", "rg-medium"], note: "Enters the garden above the overflow; no fittings within 700 mm of the foundation; trench dams." });
// Subgrade: compacted native under everything outside the beam.
const subTop = [[-120, -320], [-96, -320], [-96, -181], [CH_IN, -181], [CH_IN, -165], [CH_OUT, -165], [CH_OUT, PB(CH_OUT) - 2],
  [UD + UD_W, PB(UD + UD_W) - 2], [UD + UD_W, PB(UD) - 162], [UD - UD_W, PB(UD) - 162], [UD - UD_W, PB(UD - UD_W) - 2], [LINER_END - 2, PB(LINER_END) - 2],
  [POCKET[1], PB(POCKET[1])], [POCKET[1], PT(POCKET[1] - 100) - 640], [POCKET[0], PT(POCKET[0] + 100) - 640], [POCKET[0], PB(POCKET[0])],
  [PATH_END, PB(PATH_END)], [PATH_END, PB(PATH_END) - 20], [BED0, PB(PATH_END) - 20], [BED0, BT(BED0) - 525], [RIM, BT(RIM) - 525], [RIM, PONDB - 925],
  [GARDEN_FAR, PONDB - 925], [GARDEN_FAR, RIM_Y], [-8000, RIM_Y + 15]];
add({ id: "subgrade", name: "Compacted subgrade / native soil", role: "ground", mat: "soil", junction: "E", src: ["07 E1", "08 H"],
  poly: [...subTop, [-8000, -1700], [331, -1700], [331, -470], [-120, -470]], cuts: ["rainwater-line", "root-barrier-pocket", "root-barrier-path"] });
add({ id: "interior-subgrade", name: "Compacted subgrade under the slab", role: "ground", mat: "soil", junction: "F", src: ["12"],
  poly: [[331, -470], [331, -1700], [2500, -1700], [2500, -300], [331, -300]] });

// =================== People and planting (entourage proxies, 08 K/I, 08b M) ===================
add({ id: "person-inside", name: "Occupant standing inside (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: 1100, w: [700], d: 360, from: 0, to: 1700 });
add({ id: "person-terrace", name: "Person on the terrace (proxy)", role: "furniture", mat: "", junction: "K", src: ["08 K"], type: "rod", axis: "y", x: -1300, w: [1100], d: 360, from: PT(-1300 - 180), to: PT(-1300 - 180) + 1700, embeds: ["pavers-lined"] });
add({ id: "shrub", name: "Evergreen huckleberry (Vaccinium ovatum), pruned 1.5 m (proxy)", role: "planting", mat: "", junction: "M", src: ["08b M"],
  type: "revolve", x: -2600, w: [900], profile: [[0, PT(-2600) - 40], [450, PT(-2600) + 200], [600, PT(-2600) + 800], [400, PT(-2600) + 1350], [0, PT(-2600) + 1460]], embeds: ["pocket-soil"] });
add({ id: "tree", name: "Small tree (Amelanchier alnifolia) trunk + canopy (proxy)", role: "planting", mat: "", junction: "I", src: ["08 I"],
  type: "revolve", x: -4400, w: [900], profile: [[0, BT(-4400) - 75], [75, BT(-4400) - 75], [75, BT(-4400) + 1900], [1300, BT(-4400) + 2600], [1200, BT(-4400) + 3600], [0, BT(-4400) + 4300]],
  embeds: ["bed-mulch"] });

const views = [
  { id: "T-threshold", x: [-260, 300], y: [-220, 160] },
  { id: "H-head", x: [-700, 260], y: [2650, 3500] },
  { id: "F-floor", x: [-200, 700], y: [-520, 120] },
  { id: "M-landing", x: [-2200, 100], y: [-600, 200] },
  { id: "I-bed-tree", x: [-5400, -3000], y: [-900, 4400] },
  { id: "J-rain-garden", x: [-8000, -4800], y: [-1500, 300] },
  { id: "S-section", x: [-8000, 2500], y: [-1700, 4600] },
];

// Assemblies for the effective-RSI check (metrics.mjs).
const assemblies = [
  { name: "Floor (slab on 100 graphite EPS)", target: 2.45, films: [0.16], layers: [{ mat: "concrete-lowcarbon", t: 100 }, { mat: "graphite-eps", t: 100 }] },
  { name: "Head band (lintel + 75 stone wool)", target: 3.85, layers: [{ mat: "softwood-lumber", t: 130 }, { mat: "comfortboard-80", t: 75 }, { mat: "cedar-siding", t: 19 }] },
  { name: "Roof (polyiso avg 190 + deck)", target: 4.3, films: [0.1, 0.03], layers: [{ mat: "plywood", t: 16 }, { mat: "polyiso-lowgwp", t: 190 }, { mat: "gypsum", t: 12 }] },
];

writeFileSync(new URL("./detail02.json", import.meta.url), JSON.stringify({ L, root: "Detail02", parts, views, assemblies }, null, 1));
console.log(`${parts.length} parts`);
