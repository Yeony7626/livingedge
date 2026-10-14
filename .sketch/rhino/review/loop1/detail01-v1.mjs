// Detail 01 spec: Vancouver base of wall, eave, grade and bench, built from research/06 (junctions A–C)
// and research/07 (D–G). Writes detail01.json for build.py / packet.py.
//
// Datums: x = 0 at the foundation's exterior face, exterior negative (06/07 measure outward positive);
// y = 0 at finished grade at the wall face (top of the gravel strip); w = along the wall, 0 at the back,
// L at the cut. Millimetres. `src` names the research row; rows tagged [I] there are judgement.
//
// Design defaults taken where the research left a choice open (see research/06 and 07 open questions):
// stucco (Part 9) instead of lime render on board (Part 5); 50 mm exterior mineral wool to meet RSI 3.85;
// interior polyethylene air barrier; exterior-insulated unvented roof; bench beyond the drain envelope.
import { writeFileSync } from "node:fs";

const L = 900;
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const parts = [];
const add = (p) => parts.push(p);
const upTo = (runs, w1) => runs.filter(([a]) => a < w1).map(([a, b]) => [a, Math.min(b, w1)]);
// Offset an open polyline by d to its left (up, for a path drawn left to right), mitred, so stacked
// sheets on slopes sit exactly on each other.
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

// ---- Heights (y)
const FND = 300;                              // foundation top above grade, 06 A.1 / 07 F.2
const EPDM = FND + 1, SILL0 = EPDM + 3, SILL1 = SILL0 + 38; // sill membrane, gasket (compressed), PT sill
const PLATE0 = 3024, PLATE1 = 3062, PLATE2 = 3100;          // studs, double top plate
const JST = PLATE2 + 235, DECK = JST + 16, AVB = DECK + 3;    // roof joists, 16 mm deck, pre-strip/AVB
// ---- Wall layers (x)
const SH = -12, WRB = 0.5, FT = 0.61;         // sheathing face, sheathing membrane, 24 ga flashing
const LAP = SH - FT - WRB;                    // membrane outer face where it laps the flashing upstand
const EI = LAP - 50;                          // 50 mm rigid mineral wool (07 G.2(d))
const STRAP = EI - 19;                        // 19 mm PT strapping cavity
const PAPER = STRAP - 0.5;                    // stucco backing paper
const FACE = PAPER - 22;                      // 22 mm three-coat stucco (CMHC ST-3)
// ---- Framing along the wall: in-line studs and joists at 400 o.c.
const STUDS = [[60, 98], [466, 504], [862, 900]];
const BAYS = [[0, 60], [98, 466], [504, 862]];
const STRAPS = [[47, 111], [453, 517]];       // 19 x 64 on stud lines

// =================== A + D: foundation top, sill, slab edge ===================
add({ id: "fwall", name: "Concrete foundation wall 200, keyed into footing", role: "concrete", junction: "E", src: ["07 E5", "06 A3"],
  poly: [[0, -199], [56.5, -199], [56.5, -237], [143.5, -237], [143.5, -199], [200, -199], [200, FND], [0, FND]] });
add({ id: "epdm", name: "EPDM sill membrane (capillary break)", role: "water", junction: "D", src: ["07 D12"], poly: R(0, FND, 140, EPDM) });
add({ id: "gasket", name: "Closed-cell sill gasket (air seal)", role: "air", junction: "D", src: ["07 D11", "06 A7"], poly: R(0, EPDM, 140, SILL0) });
add({ id: "sill", name: "PT sill plate 38x140, flush with foundation face", role: "frame", junction: "A", src: ["06 A8", "07 D13"], poly: R(0, SILL0, 140, SILL1) });
add({ id: "anchor", name: "Anchor bolt 12.7 HDG, embedded 100+", role: "metal", junction: "D", src: ["07 D2", "06 A8"],
  type: "rod", axis: "y", x: 70, w: [700], d: 12.7, from: 200, to: SILL1 + 20, embeds: ["fwall", "epdm", "gasket", "sill", "washer", "nut", "batts"] });
add({ id: "washer", name: "Plate washer", role: "metal", junction: "D", src: ["07 D13"], type: "rod", axis: "y", x: 70, w: [700], d: 50, from: SILL1, to: SILL1 + 5, embeds: ["batts"] });
add({ id: "nut", name: "Anchor nut", role: "metal", junction: "D", src: ["07 D2"], type: "rod", axis: "y", x: 70, w: [700], d: 22, from: SILL1 + 5, to: SILL1 + 16, embeds: ["batts"] });

// Interior slab build-up (07 D4–D10): slab top level with foundation top.
const SLAB0 = FND - 100, POLY0 = SLAB0 - 0.25, XPS1 = POLY0 - 38, XPS0 = XPS1 - 38, GB0 = XPS0 - 100;
add({ id: "fill", name: "Compacted subgrade, organics removed", role: "ground", junction: "D", src: ["07 D3"],
  poly: [[200, -200], [375, -200], [375, -450], [900, -450], [900, GB0], [200, GB0]] });
add({ id: "granular", name: "Gas-permeable clear crushed stone 100", role: "drainage", junction: "D", src: ["07 D4"], poly: R(200, GB0, 900, XPS0) });
add({ id: "xps-a", name: "Under-slab XPS 38 (layer 1 of 2, staggered)", role: "thermal", junction: "D", src: ["07 D6"], poly: R(200, XPS0, 900, XPS1) });
add({ id: "xps-b", name: "Under-slab XPS 38 (layer 2 of 2)", role: "thermal", junction: "D", src: ["07 D6"], poly: R(200, XPS1, 900, POLY0) });
add({ id: "edge-xps", name: "Slab-edge XPS 75 (thermal break, isolation joint)", role: "thermal", junction: "D", src: ["07 D7"], poly: R(200, POLY0, 275, FND) });
add({ id: "soilgas", name: "0.25 mm soil-gas / air barrier, lapped 300, up slab edge, sealed to ledge", role: "air", junction: "D", src: ["07 D8", "07 D10"],
  type: "sheet", t: 0.25, path: [[900, SLAB0 - 0.125], [275.125, SLAB0 - 0.125], [275.125, FND + 0.125], [141, FND + 0.125]] });
add({ id: "slab", name: "Concrete slab 100", role: "concrete", junction: "D", src: ["07 D9"], poly: R(275.25, SLAB0, 900, FND) });

// =================== A + G: wall field ===================
add({ id: "studs", name: "Studs 38x140 at 400", role: "frame", junction: "G", src: ["07 G1"], poly: R(0, SILL1, 140, PLATE0), runs: STUDS });
add({ id: "batts", name: "Batt insulation", role: "thermal", junction: "G", src: ["07 G1"], poly: R(0, SILL1, 140, PLATE0), runs: BAYS });
add({ id: "plate1", name: "Top plate (lower)", role: "frame", junction: "B", src: ["06 B1"], poly: R(0, PLATE0, 140, PLATE1) });
add({ id: "plate2", name: "Top plate (upper)", role: "frame", junction: "B", src: ["06 B1"], poly: R(0, PLATE1, 140, PLATE2) });
add({ id: "vpoly", name: "6 mil poly air/vapour barrier, sealed to sill and lapped onto slab barrier", role: "air", junction: "D", src: ["07 D14", "06 B2"],
  type: "sheet", t: 0.15, path: [[140.08, PLATE2], [140.08, FND + 0.325], [180, FND + 0.325]] });
add({ id: "gypsum", name: "Gypsum board 12.7", role: "frame", junction: "G", src: ["07 G (interior)"], poly: R(140.155, FND + 10, 152.855, PLATE2) });
add({ id: "sheath", name: "Sheathing 12, bottom flush with sill underside", role: "frame", junction: "A", src: ["06 A10", "07 G2"], poly: R(SH, SILL0, 0, PLATE2), runs: [[0, 840]] });

// Base flashing (06 A11): upstand behind the membrane, lap 75 below foundation top, 10 % leg, 45 deg drip.
const FLX = SH - FT / 2, FL_TOP = 360, BEND = FND - 75, SLOPE = 0.1, NOSE = FACE - 12;
const flY = (x) => BEND - SLOPE * (FLX - x);
const COS = Math.cos(Math.atan(SLOPE));
add({ id: "flash", name: "Base flashing 24 ga prefinished steel, lap 75 over sill joint, 10% leg, 45 deg drip", role: "water", junction: "A", src: ["06 A11"],
  type: "sheet", t: FT, path: [[FLX, FL_TOP], [FLX, BEND], [NOSE, flY(NOSE)], [NOSE - 7, flY(NOSE) - 7]], runs: [[0, 790]] });
add({ id: "flash-nails", name: "Flashing fasteners at 300 o.c. into sill plate (under membrane lap)", role: "metal", junction: "A", src: ["06 A11"],
  type: "rod", axis: "x", y: 330, w: [75, 375, 675], d: 3.8, from: SH - FT, to: 45, embeds: ["flash", "sheath", "sill"] });
// Leg is ~104 mm, longer than the 75 mm a rigid leg may span unsupported (06 A11), so it bears on clips.
const clipY = (x) => flY(x) - FT / 2 / COS - 1.5 / COS;
add({ id: "flash-clip", name: "Flashing support clip, 3 mm galv. steel, 600 o.c. [I]", role: "metal", junction: "A", src: ["06 A11 (75 mm span)", "[I]"],
  type: "sheet", t: 3, path: [[-1.5, 160], [-1.5, clipY(-1.5)], [NOSE + 8, clipY(NOSE + 8)]], runs: [[125, 175], [575, 625]], embeds: ["parging"] });
add({ id: "clip-screws", name: "Concrete screws for clips", role: "metal", junction: "A", src: ["[I]"],
  type: "rod", axis: "x", y: 185, w: [150, 600], d: 6, from: -3, to: 45, embeds: ["fwall", "flash-clip", "parging"] });
add({ id: "membrane", name: "Sheathing membrane, shingled over flashing upstand", role: "water", junction: "A", src: ["06 A12", "07 G3"],
  type: "sheet", t: WRB, path: [[SH - WRB / 2, PLATE2], [SH - WRB / 2, FL_TOP + 2], [LAP + WRB / 2, FL_TOP + 1], [LAP + WRB / 2, 240]], runs: [[0, 740]] });
add({ id: "ei", name: "Exterior rigid mineral wool 50", role: "thermal", junction: "G", src: ["07 G.2(d)"], poly: R(EI, 232, LAP, PLATE2), runs: [[0, 680]] });
add({ id: "strap", name: "PT strapping 19x64 on stud lines", role: "frame", junction: "G", src: ["07 G4", "06 A13"], poly: R(STRAP, 232, EI, 3043), runs: STRAPS });
for (const y of [500, 1100, 1700, 2300, 2900])
  add({ id: `strap-screw-${y}`, name: "Strapping screw through insulation into stud", role: "metal", junction: "G", src: ["07 G4", "07 G.2(d)"],
    type: "rod", axis: "x", y, w: [79, 485], d: 6, from: STRAP, to: 75, embeds: ["strap", "ei", "membrane", "sheath", "studs"] });
add({ id: "screen-base", name: "Perforated insect screen across cavity and insulation base", role: "metal", junction: "A", src: ["06 A14", "07 G7"],
  type: "sheet", t: 0.5, path: [[LAP, 231.75], [STRAP, 231.75]], runs: [[0, 620]] });
add({ id: "paper", name: "Stucco backing paper", role: "water", junction: "G", src: ["07 G8b"], type: "sheet", t: 0.5, path: [[PAPER + 0.25, 230], [PAPER + 0.25, 3020]], runs: [[0, 570]] });
add({ id: "lath", name: "Self-furred galvanized lath, 6 mm off paper", role: "metal", junction: "G", src: ["07 G8b"],
  type: "sheet", t: 1, path: [[PAPER - 6.5, 230.6], [PAPER - 6.5, 3019.4]], runs: [[0, 540]], embeds: ["stucco"] });
add({ id: "stucco", name: "Three-coat cement stucco 22", role: "cladding", junction: "G", src: ["07 G9b", "06 A15a"], poly: R(FACE, 230, PAPER, 3020), runs: [[0, 500]] });
add({ id: "bead-base", name: "Galvanized casing bead, 10+ above flashing, left open", role: "metal", junction: "A", src: ["06 A15a"],
  type: "sheet", t: 0.6, path: [[PAPER - 0.3, 270], [PAPER - 0.3, 229.7], [FACE + 0.3, 229.7], [FACE + 0.3, 236]], runs: [[0, 500]], embeds: ["stucco"] });
add({ id: "parging", name: "Parging on exposed foundation", role: "concrete", junction: "F", src: ["06 A16", "07 F5"], poly: R(-8, 0, 0, FND) });

// =================== B: eave ===================
const FASCIA_OUT = FACE - 600, FASCIA_IN = FASCIA_OUT + 25, NAIL_IN = FASCIA_IN + 140, FL_IN = FASCIA_OUT + 110;
const RT = (x) => 3516 + 0.02 * Math.max(0, x - NAIL_IN); // top of cover board / nailer
add({ id: "joists", name: "Roof joists 38x235, 600 cantilever", role: "frame", junction: "B", src: ["06 B3"], poly: R(FASCIA_IN, PLATE2, 900, JST), runs: STUDS });
add({ id: "blocking", name: "Full-depth blocking, caulked 4 sides (air transfer + fire block)", role: "frame", junction: "B", src: ["06 B4"], poly: R(0, PLATE2, 38, JST), runs: BAYS });
add({ id: "foam", name: "Closed-cell spray foam, top-plate poly to deck", role: "air", junction: "B", src: ["06 B5"], poly: R(38, PLATE2, 160, JST), runs: BAYS });
add({ id: "sheath-top", name: "Sheathing between joists to deck", role: "frame", junction: "B", src: ["06 B21"], poly: R(SH, PLATE2, 0, JST), runs: upTo(BAYS, 840) });
add({ id: "membrane-top", name: "Sheathing membrane to deck underside", role: "water", junction: "B", src: ["06 B21"],
  type: "sheet", t: WRB, path: [[SH - WRB / 2, PLATE2], [SH - WRB / 2, JST]], runs: upTo(BAYS, 740) });
add({ id: "ei-top", name: "Mineral wool infill between joists (wall-line thermal continuity)", role: "thermal", junction: "B", src: ["06 B6"], poly: R(EI, PLATE2, LAP, JST), runs: upTo(BAYS, 680) });
add({ id: "closure", name: "PT cavity-top closure (cavity not open to soffit)", role: "frame", junction: "B", src: ["06 B22"], poly: R(STRAP, 3043, EI, 3081), runs: [[0, 620]] });
add({ id: "bead-top", name: "Casing bead at stucco top", role: "metal", junction: "B", src: ["06 B23"],
  type: "sheet", t: 0.6, path: [[PAPER - 0.3, 2990], [PAPER - 0.3, 3020.3], [FACE + 0.3, 3020.3], [FACE + 0.3, 3014]], runs: [[0, 500]], embeds: ["stucco"] });
add({ id: "screen-top", name: "Insect screen across cavity-top vent slot", role: "metal", junction: "B", src: ["06 B22", "07 G7"],
  type: "sheet", t: 0.5, path: [[FACE - 0.25, 3020.6], [FACE - 0.25, 3080.75], [STRAP - 2, 3080.75]], runs: [[0, 620]] });
add({ id: "frieze", name: "Larch frieze trim fixed to soffit, 20 mm vent slot below", role: "cladding", junction: "B", src: ["06 B24"], poly: R(FACE - 26, 3040, FACE - 7, 3081), runs: [[0, 750]] });
add({ id: "soffit-out", name: "Larch soffit boards 19", role: "cladding", junction: "B", src: ["06 B20"], poly: R(FASCIA_IN, 3081, -400, PLATE2), runs: [[0, 750]] });
add({ id: "soffit-in", name: "Larch soffit boards 19", role: "cladding", junction: "B", src: ["06 B20"], poly: R(-360, 3081, EI, PLATE2), runs: [[0, 750]] });
add({ id: "soffit-mesh", name: "Soffit vent insect mesh", role: "metal", junction: "B", src: ["06 B20"], type: "sheet", t: 0.5, path: [[-403, 3080.75], [-357, 3080.75]], runs: [[0, 750]] });
add({ id: "deck", name: "Plywood roof deck 16", role: "frame", junction: "B", src: ["06 B7"], poly: R(FASCIA_IN, JST, 900, DECK) });
add({ id: "prestrip", name: "Self-adhered pre-strip, 50 past interior wall face", role: "air", junction: "B", src: ["06 B8"],
  type: "sheet", t: 1.5, path: [[FASCIA_IN, DECK + 0.75], [200, DECK + 0.75]], runs: [[0, 880]] });
add({ id: "avb", name: "Air/vapour control membrane on deck", role: "air", junction: "B", src: ["06 B9"],
  type: "sheet", t: 1.5, path: [[FASCIA_IN, DECK + 2.25], [201, DECK + 2.25], [204, DECK + 0.75], [900, DECK + 0.75]], runs: [[0, 860]] });
add({ id: "nailer", name: "PT perimeter nailer built up to insulation height", role: "frame", junction: "B", src: ["06 B11"], poly: R(FASCIA_IN, AVB, NAIL_IN, 3516), runs: [[0, 860]] });
add({ id: "nailer-screws", name: "Nailer screws into joists", role: "metal", junction: "B", src: ["06 B11"],
  type: "rod", axis: "y", x: -570, w: [79, 485], d: 6, from: 3300, to: 3516, embeds: ["nailer", "avb", "prestrip", "deck", "joists"] });
add({ id: "roofins-1", name: "Polyiso 75 (layer 1)", role: "thermal", junction: "B", src: ["06 B10"], poly: R(NAIL_IN, AVB, 900, AVB + 75), runs: [[0, 820]] });
add({ id: "roofins-2", name: "Polyiso tapered (layer 2), 2 % to eave", role: "thermal", junction: "B", src: ["06 B10", "06 B3"],
  poly: [[NAIL_IN, AVB + 75], [900, AVB + 75], [900, RT(900) - 12], [NAIL_IN, 3504]], runs: [[0, 780]] });
add({ id: "coverboard", name: "Cover board 12", role: "frame", junction: "B", src: ["06 B12"], poly: [[NAIL_IN, 3504], [900, RT(900) - 12], [900, RT(900)], [NAIL_IN, 3516]], runs: [[0, 740]] });
add({ id: "fascia", name: "Larch fascia 25, back-primed", role: "cladding", junction: "B", src: ["06 B18"], poly: R(FASCIA_OUT, 3070, FASCIA_IN, 3516), runs: [[0, 800]] });
add({ id: "fascia-screws", name: "Stainless fascia screws into joist ends", role: "metal", junction: "B", src: ["06 B18"],
  type: "rod", axis: "x", y: 3200, w: [79, 485], d: 5, from: FASCIA_OUT, to: FASCIA_IN + 60, embeds: ["fascia", "joists"] });
const roofTop = [[FASCIA_OUT, 3464], [FASCIA_OUT, 3516], [NAIL_IN, 3516], [900, RT(900)]];
add({ id: "basesheet", name: "SBS base sheet, 52 down fascia face", role: "water", junction: "B", src: ["06 B13"],
  type: "sheet", t: 3, path: offsetPath(roofTop, 1.5), runs: [[0, 700]] });
add({ id: "mastic", name: "Mastic bed under metal flange", role: "water", junction: "B", src: ["06 B14"], type: "sheet", t: 1, path: [[FL_IN, 3519.5], [FASCIA_OUT - 3, 3519.5]], runs: [[0, 700]] });
add({ id: "edge-metal", name: "24 ga metal edge: 110 flange, 100 below fascia top, drip 12 off face", role: "water", junction: "B", src: ["06 B15"],
  type: "sheet", t: FT, path: [[FL_IN, 3520.305], [FASCIA_OUT - 3.305, 3520.305], [FASCIA_OUT - 3.305, 3416], [FASCIA_OUT - 15.305, 3404]], runs: [[0, 700]] });
add({ id: "edge-fasteners-a", name: "Edge-metal fasteners, row 1 (203 o.c., staggered)", role: "metal", junction: "B", src: ["06 B15"],
  type: "rod", axis: "y", x: -660, w: [50, 253, 456, 659], d: 4.5, from: 3480, to: 3520.61, embeds: ["edge-metal", "mastic", "basesheet", "nailer"] });
add({ id: "edge-fasteners-b", name: "Edge-metal fasteners, row 2", role: "metal", junction: "B", src: ["06 B15"],
  type: "rod", axis: "y", x: -620, w: [151, 354, 557], d: 4.5, from: 3480, to: 3520.61, embeds: ["edge-metal", "mastic", "basesheet", "nailer"] });
const COS2 = Math.cos(Math.atan(0.02));
const BT = (x) => (x <= NAIL_IN ? 3519 : RT(x) + 3 / COS2); // top of base sheet
const CAP_END = FL_IN + 108;                                 // strip-in runs 101.6+ past the flange
const stripBed = [[FASCIA_OUT - 1.4, 3520.61], [FL_IN + 1, 3520.61], [FL_IN + 7, 3519], [NAIL_IN - 0.03, 3519], [CAP_END, BT(CAP_END)]];
add({ id: "stripin", name: "SBS strip-in over flange, 101.6 onto field", role: "water", junction: "B", src: ["06 B16"],
  type: "sheet", t: 2, path: offsetPath(stripBed, 1), runs: [[0, 680]] });
const stripTop = offsetPath(stripBed, 2), last = stripTop[stripTop.length - 1];
const capBed = [...stripTop, [CAP_END + 2, last[1]], [CAP_END + 10, BT(CAP_END + 10)], [900, BT(900)]];
add({ id: "capsheet", name: "SBS cap sheet", role: "water", junction: "B", src: ["06 B17"], type: "sheet", t: 4, path: offsetPath(capBed, 2), runs: [[0, 640]] });
add({ id: "gutter", name: "Prefinished gutter hung on fascia", role: "water", junction: "B", src: ["06 B19"],
  type: "sheet", t: 0.6, path: [[FASCIA_OUT - 0.3, 3400], [FASCIA_OUT - 0.3, 3290], [FASCIA_OUT - 125, 3290], [FASCIA_OUT - 135, 3385]], runs: [[0, 760]] });
add({ id: "gutter-screws", name: "Gutter screws into fascia", role: "metal", junction: "B", src: ["06 B19"],
  type: "rod", axis: "x", y: 3380, w: [150, 650], d: 5, from: FASCIA_OUT - 0.6, to: FASCIA_OUT + 15, embeds: ["gutter", "fascia"] });

// =================== E: footing and drainage ===================
const G = (x) => 0.05 * (x + 1);              // finished grade, 5 % away from the wall (07 F6)
const SB = (x) => G(x) - 125;                 // subgrade under gravel and topsoil
const C5 = Math.cos(Math.atan(0.05));
const ROCK_IN = -175.5, ROCK_OUT = -585.5, PIPE_X = -380.5, PIPE_Y = -399;
add({ id: "native", name: "Undisturbed native soil", role: "ground", junction: "E", src: ["07 E1"],
  poly: [[-1300, -700], [900, -700], [900, -450], [-175, -450], [-175, -505.5], [ROCK_OUT - 0.5, -505.5], [ROCK_OUT - 0.5, -450], [-1300, -450]], cuts: ["pier-1", "pier-2", "pier-base-1", "pier-base-2"] });
add({ id: "footing", name: "Strip footing 550x250, underside at frost depth 450", role: "concrete", junction: "E", src: ["07 E2", "07 E3"],
  poly: [[-175, -450], [375, -450], [375, -200], [144.5, -200], [144.5, -238], [55.5, -238], [55.5, -200], [-175, -200]] });
add({ id: "capbreak", name: "Capillary break coating on footing top, into keyway", role: "water", junction: "E", src: ["07 E4"],
  type: "sheet", t: 1, path: [[-175, -199.5], [56, -199.5], [56, -237.5], [144, -237.5], [144, -199.5], [200, -199.5]] });
add({ id: "dampproof", name: "Damp-proofing, grade to footing", role: "water", junction: "E", src: ["07 E6"], type: "sheet", t: 1, path: [[-0.5, 0], [-0.5, -199]] });
add({ id: "rock", name: "Clear crushed drain rock, 150 cover top and sides", role: "drainage", junction: "E", src: ["07 E9"],
  poly: [[ROCK_OUT, -505], [ROCK_IN, -505], [ROCK_IN, -199], [-1, -199], [-1, -190], [ROCK_OUT, -190]] });
add({ id: "geotextile", name: "Non-woven geotextile wrapping the rock envelope", role: "drainage", junction: "E", src: ["07 E9"],
  type: "sheet", t: 0.5, path: [[-1, -189.75], [ROCK_OUT - 0.25, -189.75], [ROCK_OUT - 0.25, -505.25], [ROCK_IN + 0.25, -505.25], [ROCK_IN + 0.25, -199]] });
add({ id: "drainpipe", name: "Perforated PVC drain 100, invert at footing underside", role: "drainage", junction: "E", src: ["07 E8"],
  type: "rod", axis: "w", x: PIPE_X, y: PIPE_Y, d: 110, di: 102, from: 0, to: L, embeds: ["rock"] });
add({ id: "backfill", name: "Free-draining backfill", role: "ground", junction: "E", src: ["07 E11"],
  poly: [[-1300, -450], [ROCK_OUT - 0.5, -450], [ROCK_OUT - 0.5, -189.5], [-1, -189.5], [-1, SB(-1) - 0.5 / C5], [-300.5, SB(-300.5) - 0.5 / C5],
    [-305.5, SB(-305.5)], [-1300, SB(-1300)]], cuts: ["pier-1", "pier-2", "edging"] });

// =================== F: grade ===================
add({ id: "gravel", name: "Gravel strip 300, washed stone", role: "drainage", junction: "F", src: ["07 F4"],
  poly: [[-1, 0], [-300, G(-300)], [-300, SB(-300)], [-1, SB(-1)]] });
add({ id: "geo-gravel", name: "Geotextile under gravel strip", role: "drainage", junction: "F", src: ["07 F2"],
  type: "sheet", t: 0.5, path: [[-1.02, SB(-1.02) - 0.25 / C5], [-300.25, SB(-300.25) - 0.25 / C5], [-300.25, G(-300)]] });
add({ id: "edging", name: "Steel edging, top flush with grade", role: "metal", junction: "F", src: ["07 F3"], poly: R(-305.5, -185, -300.5, G(-303)) });
add({ id: "topsoil", name: "Topsoil, 5 % fall for 3 m", role: "ground", junction: "F", src: ["07 F6"],
  poly: [[-305.5, G(-305.5)], [-1300, G(-1300)], [-1300, SB(-1300)], [-305.5, SB(-305.5)]], cuts: ["pier-1", "pier-2"] });

// =================== C: bench ===================
// Posts sit beyond the drain-rock envelope and the eave drip line (06 C11). The post-base straps take the
// faces across the wall, so the knee braces use the free inner faces and side-bolted aprons hold the
// long direction (post bases resist no rotation, 06 C8).
const PX = [-720, -980], PW = [150, 750];
const rails = PW.map((w) => [w - 22.5, w + 22.5]);
for (const [i, x] of PX.entries()) {
  const n = i + 1, s = i === 0 ? -1 : 1, inner = x + s * 45; // s points toward the other post
  add({ id: `pier-base-${n}`, name: "Compacted granular base under pier", role: "drainage", junction: "C", src: ["06 C2"], type: "rod", axis: "y", x, w: PW, d: 250, from: -600, to: -500 });
  add({ id: `pier-${n}`, name: "Concrete pier 250, 450+ below grade, top 152+ above", role: "concrete", junction: "C", src: ["06 C1", "06 C3"],
    type: "rod", axis: "y", x, w: PW, d: 250, from: -500, to: 152 });
  add({ id: `pier-anchor-${n}`, name: "Cast-in stainless anchor 16", role: "metal", junction: "C", src: ["06 C4"], type: "rod", axis: "y", x, w: PW, d: 16, from: -400, to: 172, embeds: [`pier-${n}`, `abu-base-${n}`] });
  add({ id: `abu-base-${n}`, name: "Standoff post base: base plate", role: "metal", junction: "C", src: ["06 C5"],
    poly: R(x - 38, 152, x + 38, 153.5), runs: PW.map((w) => [w - 47.66, w + 47.66]) });
  add({ id: `abu-straps-${n}`, name: "Standoff post base: side straps (12 ga)", role: "metal", junction: "C", src: ["06 C5"],
    poly: R(x - 38, 153.5, x + 38, 292), runs: PW.flatMap((w) => [[w - 47.66, w - 45], [w + 45, w + 47.66]]) });
  add({ id: `abu-seat-${n}`, name: "Standoff seat, 25 mm above concrete", role: "metal", junction: "C", src: ["06 C5"],
    poly: R(x - 45, 175.5, x + 45, 177), runs: PW.map((w) => [w - 45, w + 45]) });
  add({ id: `post-${n}`, name: "White oak post 90x90, end grain 25 above concrete", role: "furniture", junction: "C", src: ["06 C6"],
    poly: R(x - 45, 177, x + 45, 405), runs: PW.map((w) => [w - 45, w + 45]) });
  for (const w of PW)
    for (const y of [230, 270])
      add({ id: `post-bolt-${n}-${w}-${y}`, name: "Stainless through-bolt 12.7, post base", role: "metal", junction: "C", src: ["06 C5", "06 C7"],
        type: "rod", axis: "w", x, y, d: 12.7, from: w - 48, to: w + 48, embeds: [`post-${n}`, `abu-straps-${n}`] });
  const apron = i === 0 ? R(x + 45, 315, x + 90, 405) : R(x - 90, 315, x - 45, 405);
  add({ id: `apron-${n}`, name: "Oak apron 45x90, side-bolted to posts", role: "furniture", junction: "C", src: ["06 C8"], poly: apron, runs: [[90, 810]] });
  for (const y of [335, 385])
    add({ id: `apron-bolt-${n}-${y}`, name: "Stainless through-bolts, 2 per joint (moment connection)", role: "metal", junction: "C", src: ["06 C7", "06 C8"],
      type: "rod", axis: "x", y, w: PW, d: 12.7, from: i === 0 ? inner : x - 90, to: i === 0 ? x + 90 : inner, embeds: [`apron-${n}`, `post-${n}`] });
  add({ id: `xbrace-${n}`, name: "Oak knee brace across the bench, 45x45", role: "furniture", junction: "C", src: ["06 C8"],
    poly: [[inner, 240], [inner, 303.6], [inner + s * 11.4, 315], [inner + s * 75, 315]], runs: rails });
}
add({ id: "rail", name: "Oak cross rail 45x90", role: "furniture", junction: "C", src: ["06 C8"], poly: R(PX[1] + 45, 315, PX[0] - 45, 405), runs: rails });
for (const [i, x0] of [-655, -793, -931].entries())
  add({ id: `slat-${i + 1}`, name: "Oak seat slat 45x130, 8 mm gaps", role: "furniture", junction: "C", src: ["06 C9"], poly: R(x0 - 130, 405, x0, 450), runs: [[90, 810]] });

const views = [
  { id: "A-base", x: [-170, 200], y: [150, 420] },
  { id: "B-eave", x: [-860, 250], y: [2950, 3600] },
  { id: "C-bench", x: [-1100, -600], y: [-650, 500] },
  { id: "D-slab", x: [-60, 420], y: [-60, 420] },
  { id: "E-footing", x: [-700, 420], y: [-720, 20] },
  { id: "F-grade", x: [-480, 60], y: [-230, 330] },
  { id: "G-field", x: [-130, 180], y: [1400, 1650] },
];

writeFileSync(new URL("./detail01.json", import.meta.url), JSON.stringify({ L, parts, views }, null, 1));
console.log(`${parts.length} parts`);
