// Detail 01 spec: Vancouver base of wall, eave, grade and bench, built from research/06 (junctions A–C)
// and research/07 (D–G). Writes detail01.json for build.py / packet.py.
//
// Datums: x = 0 at the foundation's exterior face, exterior negative (06/07 measure outward positive);
// y = 0 at finished grade at the wall face (top of the gravel strip); w = along the wall, 0 at the back,
// L at the cut. Millimetres. `src` names the research row or the review item; [I] = judgement.
//
// Design defaults where the research left a choice open: Part 9 stucco (lime render on board is Part 5);
// 50 mm exterior mineral wool to meet RSI 3.85; interior polyethylene air barrier; exterior-insulated
// unvented roof; bench beyond the drain envelope and the gutter lip.
//
// v2 (review loop 1, review/loop1/review-ABC.md and review-DEFG.md): stem wall insulated outside (DEFG D1),
// which also carries the flashing leg, so the clips are gone; line wire, 25 mm stucco, lath screws, strapping
// screws at 300; joist cantilever cut to 600; hemmed edge metal on a cleat; gutter stood off; nailer plies;
// two-board fascia; membrane lap at the eave; poly tail, beads and edge cap; slab reglet seal; trench stepped
// clear of the footing; bench moved past the gutter lip, lowered, tenoned rails, diagonal braces, post caps.
import { writeFileSync } from "node:fs";

const L = 900;
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const parts = [];
const add = (p) => parts.push(p);
const upTo = (runs, w1) => runs.filter(([a]) => a < w1).map(([a, b]) => [a, Math.min(b, w1)]);
const steps = (a, b, s) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);
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
const SILL0 = FND + 1 + 3, SILL1 = SILL0 + 38; // EPDM 1, gasket 3 (compressed), PT sill
const PLATE0 = 3024, PLATE1 = 3062, PLATE2 = 3100;
const JST = PLATE2 + 235, DECK = JST + 16, AVB = DECK + 3;
// ---- Wall layers (x)
const SH = -12, WRB = 0.5, FT = 0.61;         // sheathing face, sheathing membrane, 24 ga flashing
const LAP = SH - FT - WRB;                    // membrane outer face where it laps the flashing upstand
const EI = LAP - 50;                          // 50 mm rigid mineral wool (07 G.2(d))
const STRAP = EI - 19;                        // 19 mm PT strapping cavity
const WIRE = STRAP - 1.2;                     // line wire backing the paper (DEFG E3)
const PAPER = WIRE - 0.5;                     // outer face of the stucco backing paper
const FACE = PAPER - 25;                      // 25 mm three-coat stucco, 18 over the lath (DEFG D3)
const VP = 141.08;                            // interior poly, 1 mm off the framing so beads seal it
// ---- Framing along the wall: in-line studs and joists at 400 o.c.
const STUDS = [[60, 98], [466, 504], [862, 900]];
const BAYS = [[0, 60], [98, 466], [504, 862]];
const STRAPS = [[47, 111], [453, 517]];       // 19 x 64 on stud lines

// =================== A + D: foundation top, sill, slab edge ===================
add({ id: "fwall", name: "Concrete foundation wall 200, keyed into footing", role: "concrete", junction: "E", src: ["07 E5", "06 A3"],
  poly: [[0, -199], [56.5, -199], [56.5, -237], [143.5, -237], [143.5, -199], [200, -199], [200, FND], [0, FND]] });
add({ id: "epdm", name: "EPDM sill membrane, turned 40 down the foundation face", role: "water", junction: "D", src: ["07 D12", "DEFG E15"],
  type: "sheet", t: 1, path: [[140, FND + 0.5], [-0.5, FND + 0.5], [-0.5, 260]] });
add({ id: "gasket", name: "Closed-cell sill gasket (air seal)", role: "air", junction: "D", src: ["07 D11", "06 A7"], poly: R(0, FND + 1, 140, SILL0) });
add({ id: "sill", name: "PT sill plate 38x140, flush with foundation face", role: "frame", junction: "A", src: ["06 A8", "07 D13"], poly: R(0, SILL0, 140, SILL1) });
add({ id: "anchor", name: "Anchor bolt 12.7 HDG, embedded 100+", role: "metal", junction: "D", src: ["07 D2", "06 A8"],
  type: "rod", axis: "y", x: 70, w: [700], d: 12.7, from: 200, to: SILL1 + 20, embeds: ["fwall", "epdm", "gasket", "sill", "washer", "nut", "batts"] });
add({ id: "anchor-seal", name: "Sealant collar where the bolt passes EPDM and gasket", role: "air", junction: "D", src: ["DEFG E6", "ABC 17"],
  type: "rod", axis: "y", x: 70, w: [700], d: 16.7, di: 12.7, from: FND, to: SILL0, embeds: ["epdm", "gasket"] });
add({ id: "washer", name: "Plate washer", role: "metal", junction: "D", src: ["07 D13"], type: "rod", axis: "y", x: 70, w: [700], d: 50, from: SILL1, to: SILL1 + 5, embeds: ["batts"] });
add({ id: "nut", name: "Anchor nut", role: "metal", junction: "D", src: ["07 D2"], type: "rod", axis: "y", x: 70, w: [700], d: 22, from: SILL1 + 5, to: SILL1 + 16, embeds: ["batts"] });

// Interior slab build-up (07 D4–D10): slab top level with foundation top.
const SLAB0 = FND - 100, POLY0 = SLAB0 - 0.25, XPS1 = POLY0 - 38, XPS0 = XPS1 - 38, GB0 = XPS0 - 100;
add({ id: "fill", name: "Compacted subgrade, organics removed", role: "ground", junction: "D", src: ["07 D3"],
  poly: [[200, -200], [375, -200], [375, -450], [900, -450], [900, GB0], [200, GB0]] });
add({ id: "granular", name: "Gas-permeable clear crushed stone 100", role: "drainage", junction: "D", src: ["07 D4"], poly: R(200, GB0, 900, XPS0),
  note: "Radon rough-in per VBBL 9.13.4.3: vent-pipe inlet near slab centre, gas-permeable layer 100+ beyond the inlet, pipe sealed at the barrier, labelled every 1.8 m, terminates 1.8 m+ from the property line with a 10–12.5 mm screen (shown on plan, outside this slice)." });
add({ id: "xps-a", name: "Under-slab XPS 38 (layer 1 of 2, staggered)", role: "thermal", junction: "D", src: ["07 D6"], poly: R(200, XPS0, 900, XPS1) });
add({ id: "xps-b", name: "Under-slab XPS 38 (layer 2 of 2)", role: "thermal", junction: "D", src: ["07 D6"], poly: R(200, XPS1, 900, POLY0) });
add({ id: "edge-xps", name: "Slab-edge XPS 75 (thermal break, isolation joint)", role: "thermal", junction: "D", src: ["07 D7"], poly: R(200, POLY0, 275, FND) });
add({ id: "soilgas", name: "0.25 mm soil-gas / air barrier, lapped 300, up slab edge, taped to ledge", role: "air", junction: "D", src: ["07 D8", "07 D10"],
  type: "sheet", t: 0.25, path: [[900, SLAB0 - 0.125], [275.125, SLAB0 - 0.125], [275.125, FND + 0.125], [141, FND + 0.125]],
  note: "Sequence: leave the upstand loose ~150 mm during the pour; after cure fold it over the edge XPS and tape it to the ledge, then EPDM, gasket, sill, framing, then lap and seal the wall poly (DEFG E14)." });
add({ id: "slab", name: "Concrete slab 100, reglet at perimeter", role: "concrete", junction: "D", src: ["07 D9"],
  poly: [[275.25, SLAB0], [900, SLAB0], [900, FND], [281.25, FND], [281.25, FND - 6], [275.25, FND - 6]] });
add({ id: "slab-seal", name: "Flexible sealant at slab perimeter (VBBL 9.25.3.6(5))", role: "air", junction: "D", src: ["DEFG E5"], poly: R(275.25, FND - 6, 281.25, FND) });
add({ id: "seal-floor", name: "Acoustical sealant bead, wall poly to slab barrier", role: "air", junction: "D", src: ["DEFG E1"], poly: R(150, FND + 0.25, 156, FND + 1.25) });
add({ id: "vpoly", name: "6 mil poly air/vapour barrier, lapped 104 onto slab barrier", role: "air", junction: "D", src: ["07 D14", "06 B2", "DEFG E1"],
  type: "sheet", t: 0.15, path: [[VP, PLATE2], [VP, FND + 1.325], [245, FND + 1.325]] });
add({ id: "seal-sill", name: "Acoustical sealant bead, poly to sill plate", role: "air", junction: "D", src: ["DEFG E1", "ABC 17"], poly: R(140, 305, VP - 0.075, 311) });
add({ id: "edge-cap", name: "Fibre-cement floor-edge cap 12, adhered (no fasteners through barrier)", role: "frame", junction: "D", src: ["DEFG E2"], poly: R(154, FND + 1.4, 295, FND + 13.4) });

// =================== A + G: wall field ===================
add({ id: "studs", name: "Studs 38x140 at 400", role: "frame", junction: "G", src: ["07 G1"], poly: R(0, SILL1, 140, PLATE0), runs: STUDS });
add({ id: "batts", name: "Batt insulation", role: "thermal", junction: "G", src: ["07 G1"], poly: R(0, SILL1, 140, PLATE0), runs: BAYS });
add({ id: "plate1", name: "Top plate (lower)", role: "frame", junction: "B", src: ["06 B1"], poly: R(0, PLATE0, 140, PLATE1) });
add({ id: "plate2", name: "Top plate (upper)", role: "frame", junction: "B", src: ["06 B1"], poly: R(0, PLATE1, 140, PLATE2) });
add({ id: "seal-plate", name: "Acoustical sealant bead, poly to top plate", role: "air", junction: "B", src: ["ABC 10"], poly: R(140, 3077, VP - 0.075, 3083) });
add({ id: "gypsum", name: "Gypsum board 12.7", role: "frame", junction: "G", src: ["07 G (interior)"], poly: R(VP + 0.075, FND + 10, VP + 12.775, PLATE2) });
add({ id: "ceiling", name: "Gypsum ceiling 12.7 (no ceiling poly: roof is exterior-insulated)", role: "frame", junction: "B", src: ["ABC 16"], poly: R(VP + 12.775, 3087.3, 900, PLATE2) });
add({ id: "sheath", name: "Sheathing 12, bottom flush with sill underside", role: "frame", junction: "A", src: ["06 A10", "07 G2"], poly: R(SH, SILL0, 0, PLATE2), runs: [[0, 840]] });

// Base flashing (06 A11): upstand behind the membrane, lap 75 below foundation top, 10 % leg, 45 deg drip.
// The leg now bears on the foundation XPS and its parging out to x = -63 (DEFG D1, ABC D1).
const FLX = SH - FT / 2, FL_TOP = 360, BEND = FND - 75, SLOPE = 0.1, NOSE = FACE - 12;
const COS = Math.cos(Math.atan(SLOPE));
const flY = (x) => BEND - SLOPE * (FLX - x);
const under = (x) => flY(x) - FT / 2 / COS;   // underside of the sloped leg
add({ id: "flash", name: "Base flashing 24 ga prefinished steel, lap 75 over sill joint, 10% leg, 45 deg drip", role: "water", junction: "A", src: ["06 A11"],
  type: "sheet", t: FT, path: [[FLX, FL_TOP], [FLX, BEND], [NOSE, flY(NOSE)], [NOSE - 7, flY(NOSE) - 7]], runs: [[0, 790]] });
add({ id: "flash-nails", name: "Flashing fasteners at 300 o.c. into sill plate (under membrane lap)", role: "metal", junction: "A", src: ["06 A11"],
  type: "rod", axis: "x", y: 330, w: [75, 375, 675], d: 3.8, from: SH - FT, to: 45, embeds: ["flash", "sheath", "sill"] });
add({ id: "membrane", name: "Sheathing membrane, shingled over flashing upstand", role: "water", junction: "A", src: ["06 A12", "07 G3"],
  type: "sheet", t: WRB, path: [[SH - WRB / 2, PLATE2], [SH - WRB / 2, FL_TOP + 2], [LAP + WRB / 2, FL_TOP + 1], [LAP + WRB / 2, 240]], runs: [[0, 740]] });
add({ id: "ei", name: "Exterior rigid mineral wool 50, 128+ kg/m3", role: "thermal", junction: "G", src: ["07 G.2(d)", "DEFG E4"], poly: R(EI, 232, LAP, PLATE2), runs: [[0, 680]],
  note: "Stucco is hung on strapping screwed through 50 mm mineral wool: screw size and spacing to be confirmed by a structural engineer (RDH13 3-46)." });
add({ id: "strap", name: "PT strapping 19x64 on stud lines", role: "frame", junction: "G", src: ["07 G4", "06 A13"], poly: R(STRAP, 232, EI, 3043), runs: STRAPS });
add({ id: "strap-screws", name: "Strapping screws 6 mm through insulation into studs, 300 o.c. from y 375", role: "metal", junction: "G", src: ["DEFG E4", "ABC 5"],
  type: "rod", axis: "x", ys: [...steps(375, 2775, 300), 2950], w: [79, 485], d: 6, from: STRAP, to: 75, embeds: ["strap", "ei", "membrane", "sheath", "studs"] });
add({ id: "screen-base", name: "Perforated insect screen across cavity and insulation base", role: "metal", junction: "A", src: ["06 A14", "07 G7"],
  type: "sheet", t: 0.5, path: [[LAP, 231.75], [STRAP, 231.75]], runs: [[0, 620]] });
add({ id: "line-wire", name: "Galvanized line wire 1.2 at 150, backing the paper between straps", role: "metal", junction: "G", src: ["DEFG E3"],
  type: "rod", axis: "w", at: steps(300, 3000, 150).map((y) => [STRAP - 0.55, y]), d: 1.2, from: 0, to: 570, embeds: ["strap"] });
add({ id: "paper", name: "Stucco backing paper", role: "water", junction: "G", src: ["07 G8b"], type: "sheet", t: 0.5, path: [[PAPER + 0.25, 230], [PAPER + 0.25, 3020]], runs: [[0, 570]] });
add({ id: "lath", name: "Self-furred galvanized lath, 6 mm off paper", role: "metal", junction: "G", src: ["07 G8b"],
  type: "sheet", t: 1, path: [[PAPER - 6.5, 230.6], [PAPER - 6.5, 3019.4]], runs: [[0, 540]], embeds: ["stucco"] });
add({ id: "lath-screws", name: "Lath screws with 25 mm washers into strapping, 150 o.c.", role: "metal", junction: "G", src: ["ABC 4", "DEFG E10"],
  type: "rod", axis: "x", ys: steps(375, 2925, 150), w: [64, 470], d: 4, from: PAPER - 7.5, to: EI - 1, embeds: ["stucco", "lath", "paper", "strap"],
  note: "Lath fastened into 19 mm strapping, not 25 mm into framing: alternative solution under 9.27.5.7(3) / 9.28.4.6(2), needs engineer or manufacturer acceptance." });
add({ id: "stucco", name: "Three-coat cement stucco 25", role: "cladding", junction: "G", src: ["07 G9b", "06 A15a", "DEFG D3"], poly: R(FACE, 230, PAPER, 3020), runs: [[0, 500]],
  note: "Vertical control joints at 4.57 m max and at opening corners, through the lath; no T or L panels (CMHC 7-17). Stucco +230 is 30 above the 200 minimum: the decades view flags grade rise over 30 mm." });
add({ id: "bead-base", name: "Zinc-alloy casing bead, 10+ above flashing, left open", role: "metal", junction: "A", src: ["06 A15a", "ABC D2"],
  type: "sheet", t: 0.6, path: [[PAPER - 0.3, 270], [PAPER - 0.3, 229.7], [FACE + 0.3, 229.7], [FACE + 0.3, 236]], runs: [[0, 500]], embeds: ["stucco"] });

// Foundation face (DEFG D1): 50 XPS from the footing to under the flashing, 12 cement parging on lath.
add({ id: "dampproof", name: "Damp-proofing (not code-required here, 9.13.2.1(1); best practice)", role: "water", junction: "E", src: ["07 E6", "DEFG 0"],
  type: "sheet", t: 1, path: [[-0.5, under(-12)], [-0.5, -199]] });
add({ id: "fnd-xps", name: "Foundation XPS 50, footing to flashing", role: "thermal", junction: "D", src: ["DEFG D1", "IG4 p.10"],
  poly: [[-1, -199], [-1, under(-12)], [-12, under(-12)], [-51, under(-51)], [-51, -199]], runs: [[0, 790]] });
add({ id: "parging", name: "Cement parging 12 on lath, 150 below grade to flashing", role: "concrete", junction: "F", src: ["DEFG D1", "07 F5"],
  poly: [[-51, -149.5], [-51, under(-51)], [-63, under(-63)], [-63, -149.5]], runs: [[0, 740]] });
add({ id: "parging-lath", name: "Galvanized lath in parging", role: "metal", junction: "F", src: ["07 F5"], type: "sheet", t: 1, path: [[-57, -140], [-57, under(-57) - 6]], runs: [[0, 740]], embeds: ["parging"] });
add({ id: "parging-anchors", name: "Insulation anchors with 50 mm washers into concrete", role: "metal", junction: "F", src: ["[I]"],
  type: "rod", axis: "x", ys: [-60, 120], w: [150, 600], d: 6, from: -63, to: 40, embeds: ["parging", "parging-lath", "fnd-xps", "dampproof", "fwall"] });

// =================== B: eave ===================
const FASCIA_IN = -600, FASCIA_OUT = FASCIA_IN - 25, NAIL_IN = FASCIA_IN + 140, FL_IN = FASCIA_OUT + 110; // 600 cantilever (ABC 1)
const RT = (x) => 3516 + 0.02 * Math.max(0, x - NAIL_IN);
add({ id: "joists", name: "Roof joists 38x235, 600 cantilever", role: "frame", junction: "B", src: ["06 B3", "ABC 1"], poly: R(FASCIA_IN, PLATE2, 900, JST), runs: STUDS,
  note: "3 x 82 mm toe-nails per joist to the plate (Table 9.23.3.4) and a galvanized uplift clip on each joist, installed before the spray foam (ABC 12)." });
add({ id: "blocking", name: "Full-depth blocking, caulked 4 sides (air transfer + fire block)", role: "frame", junction: "B", src: ["06 B4"], poly: R(0, PLATE2, 38, JST), runs: BAYS });
add({ id: "vpoly-tail", name: "Wall poly turned 50 onto top plate", role: "air", junction: "B", src: ["ABC 10"],
  type: "sheet", t: 0.15, path: [[90, PLATE2 + 0.075], [VP + 0.075, PLATE2 + 0.075]], runs: BAYS });
add({ id: "foam", name: "Closed-cell spray foam, top-plate poly to deck", role: "air", junction: "B", src: ["06 B5"], poly: R(38, PLATE2 + 0.15, 160, JST), runs: BAYS });
add({ id: "sheath-top", name: "Sheathing between joists to deck", role: "frame", junction: "B", src: ["06 B21"], poly: R(SH, PLATE2, 0, JST), runs: upTo(BAYS, 840) });
add({ id: "membrane-lap", name: "Upper sheathing membrane, lapped 100 over wall membrane", role: "water", junction: "B", src: ["ABC 9"],
  type: "sheet", t: WRB, path: [[SH - 0.75, 3000], [SH - 0.75, PLATE2]], runs: upTo(STUDS, 740) });
add({ id: "membrane-top", name: "Upper sheathing membrane to deck underside", role: "water", junction: "B", src: ["06 B21", "ABC 9"],
  type: "sheet", t: WRB, path: [[SH - 0.75, 3000], [SH - 0.75, JST]], runs: upTo(BAYS, 740),
  note: "Self-adhered collar at each joist where it crosses the membrane: 3 sides, 50 mm onto the membrane (ABC 9)." });
add({ id: "ei-top", name: "Mineral wool infill between joists (wall-line thermal continuity)", role: "thermal", junction: "B", src: ["06 B6"], poly: R(EI, PLATE2, LAP, JST), runs: upTo(BAYS, 680) });
add({ id: "windbarrier", name: "Vapour-permeable wind barrier on eave mineral wool", role: "air", junction: "B", src: ["ABC 11"],
  type: "sheet", t: 0.5, path: [[EI - 0.25, 3081], [EI - 0.25, JST]], runs: upTo(BAYS, 680) });
add({ id: "closure", name: "PT cavity-top closure (cavity not open to soffit)", role: "frame", junction: "B", src: ["06 B22"], poly: R(STRAP, 3043, EI, 3081), runs: [[0, 620]] });
add({ id: "closure-screws", name: "Closure screws through insulation into top plates", role: "metal", junction: "B", src: ["ABC 15"],
  type: "rod", axis: "x", y: 3062, w: [79, 485], d: 6, from: STRAP, to: 75, embeds: ["closure", "ei", "membrane", "membrane-lap", "sheath", "plate1", "plate2"] });
add({ id: "bead-top", name: "Casing bead at stucco top", role: "metal", junction: "B", src: ["06 B23"],
  type: "sheet", t: 0.6, path: [[PAPER - 0.3, 2990], [PAPER - 0.3, 3020.3], [FACE + 0.3, 3020.3], [FACE + 0.3, 3014]], runs: [[0, 500]], embeds: ["stucco"] });
add({ id: "screen-top", name: "Insect screen across cavity-top vent slot", role: "metal", junction: "B", src: ["06 B22", "07 G7"],
  type: "sheet", t: 0.5, path: [[FACE - 0.25, 3020.6], [FACE - 0.25, 3080.75], [STRAP - 2, 3080.75]], runs: [[0, 620]] });
add({ id: "frieze", name: "Larch frieze trim fixed to soffit, 20 mm vent slot below", role: "cladding", junction: "B", src: ["06 B24"], poly: R(FACE - 26, 3040, FACE - 7, 3081), runs: [[0, 750]] });
add({ id: "soffit-out", name: "Larch soffit boards 19", role: "cladding", junction: "B", src: ["06 B20"], poly: R(FASCIA_IN, 3081, -323.4, PLATE2), runs: [[0, 750]] });
add({ id: "soffit-in", name: "Larch soffit boards 19", role: "cladding", junction: "B", src: ["06 B20"], poly: R(-277.4, 3081, EI - 0.5, PLATE2), runs: [[0, 750]] });
add({ id: "soffit-mesh", name: "Soffit vent insect mesh", role: "metal", junction: "B", src: ["06 B20"], type: "sheet", t: 0.5, path: [[-326.4, 3080.75], [-274.4, 3080.75]], runs: [[0, 750]] });
add({ id: "deck", name: "Plywood roof deck 16", role: "frame", junction: "B", src: ["06 B7"], poly: R(FASCIA_IN, JST, 900, DECK) });
add({ id: "prestrip", name: "Self-adhered pre-strip, 50 past interior wall face", role: "air", junction: "B", src: ["06 B8", "ABC 8"],
  type: "sheet", t: 1.5, path: [[FASCIA_IN, DECK + 0.75], [205, DECK + 0.75]], runs: [[0, 880]] });
add({ id: "avb", name: "Air/vapour control membrane on deck", role: "air", junction: "B", src: ["06 B9"],
  type: "sheet", t: 1.5, path: [[FASCIA_IN, DECK + 2.25], [206, DECK + 2.25], [209, DECK + 0.75], [900, DECK + 0.75]], runs: [[0, 860]] });
for (const [i, [y0, y1]] of [[AVB, AVB + 38], [AVB + 38, AVB + 76], [AVB + 76, AVB + 114], [AVB + 114, AVB + 152]].entries())
  add({ id: `nailer-${i + 1}`, name: `PT nailer ply ${i + 1} of 4 (38)`, role: "frame", junction: "B", src: ["06 B11", "ABC 13"], poly: R(FASCIA_IN, y0, NAIL_IN, y1), runs: [[0, 860]] });
add({ id: "nailer-rip", name: "PT nailer rip 10, glued and nailed", role: "frame", junction: "B", src: ["ABC 13"], poly: R(FASCIA_IN, AVB + 152, NAIL_IN, 3516), runs: [[0, 860]] });
for (const x of [-580, -480])
  add({ id: `nailer-screws-${x}`, name: "Bottom nailer ply screws, 2 per joist, 50+ into joist", role: "metal", junction: "B", src: ["ABC 13"],
    type: "rod", axis: "y", x, w: [79, 485, 881], d: 6, from: 3285, to: AVB + 38, embeds: ["nailer-1", "avb", "prestrip", "deck", "joists"] });
add({ id: "nailer-ply-screws", name: "Ply-to-ply screws, staggered at 400", role: "metal", junction: "B", src: ["ABC 13"],
  type: "rod", axis: "y", x: -540, w: [200, 600], d: 5, from: AVB + 26, to: AVB + 152, embeds: ["nailer-1", "nailer-2", "nailer-3", "nailer-4"] });
add({ id: "roofins-1", name: "Polyiso 75 (layer 1)", role: "thermal", junction: "B", src: ["06 B10"], poly: R(NAIL_IN, AVB, 900, AVB + 75), runs: [[0, 820]] });
add({ id: "roofins-2", name: "Polyiso tapered (layer 2), 2 % to eave", role: "thermal", junction: "B", src: ["06 B10", "06 B3"],
  poly: [[NAIL_IN, AVB + 75], [900, AVB + 75], [900, RT(900) - 12], [NAIL_IN, 3504]], runs: [[0, 780]] });
add({ id: "coverboard", name: "Cover board 12", role: "frame", junction: "B", src: ["06 B12"], poly: [[NAIL_IN, 3504], [900, RT(900) - 12], [900, RT(900)], [NAIL_IN, 3516]], runs: [[0, 740]] });
add({ id: "fascia-lower", name: "Larch fascia board 25 (lower), back-primed, ends sealed", role: "cladding", junction: "B", src: ["06 B18", "ABC 14"], poly: R(FASCIA_OUT, 3070, FASCIA_IN, 3340), runs: [[0, 800]] });
add({ id: "fascia-upper", name: "Larch fascia board 25 (upper), rebated drip joint", role: "cladding", junction: "B", src: ["06 B18", "ABC 14"], poly: R(FASCIA_OUT, 3340, FASCIA_IN, 3516), runs: [[0, 800]],
  note: "Fascia stays under the roof edge (ABC D3 declined: the proposed outboard fascia puts the edge metal through it). Back-primed, end grain sealed; re-coating needs the gutter off, not the roof edge." });
add({ id: "fascia-screws-a", name: "Stainless fascia screws into joist ends", role: "metal", junction: "B", src: ["06 B18"],
  type: "rod", axis: "x", y: 3200, w: [79, 485, 881], d: 5, from: FASCIA_OUT, to: FASCIA_IN + 60, embeds: ["fascia-lower", "joists"] });
add({ id: "fascia-screws-b", name: "Stainless fascia screws into nailer", role: "metal", junction: "B", src: ["ABC 14"],
  type: "rod", axis: "x", y: 3448, w: [79, 485], d: 5, from: FASCIA_OUT, to: FASCIA_IN + 40, embeds: ["fascia-upper", "nailer-3"] });
const roofTop = [[FASCIA_OUT, 3464], [FASCIA_OUT, 3516], [NAIL_IN, 3516], [900, RT(900)]];
add({ id: "basesheet", name: "SBS base sheet, 52 down fascia face", role: "water", junction: "B", src: ["06 B13"], type: "sheet", t: 3, path: offsetPath(roofTop, 1.5), runs: [[0, 700]] });
add({ id: "mastic", name: "Mastic bed under metal flange", role: "water", junction: "B", src: ["06 B14"], type: "sheet", t: 1, path: [[FL_IN, 3519.5], [FASCIA_OUT - 3, 3519.5]], runs: [[0, 700]] });
// Edge metal face drops to 3416 with a 45 deg drip; a continuous cleat in the 3 mm space behind it is
// screwed through the fascia into the nailer, and the drip is hemmed around the cleat tip (ABC 2, RCABC P13).
const KA = [FASCIA_OUT - 3.305, 3416], KB = [FASCIA_OUT - 15.305, 3404], S = Math.SQRT1_2;
const kick = (t, off) => [KA[0] - t * S + off * S, KA[1] - t * S - off * S]; // along the drip from KA, offset toward the fascia
const cornerT = (KA[0] + FT * S - (FASCIA_OUT - 0.305)) / S;
add({ id: "edge-metal", name: "24 ga metal edge: 110 flange, face to 3416, 45 deg drip 12 off face", role: "water", junction: "B", src: ["06 B15"],
  type: "sheet", t: FT, path: [[FL_IN, 3520.305], [FASCIA_OUT - 3.305, 3520.305], KA, KB], runs: [[0, 700]] });
add({ id: "edge-cleat", name: "24 ga continuous cleat engaging the drip", role: "metal", junction: "B", src: ["ABC 2", "RCABC P13 3.3(5)"],
  type: "sheet", t: FT, path: [[FASCIA_OUT - 0.305, 3460], kick(cornerT, FT), kick(12 * Math.SQRT2 - 2, FT)], runs: [[0, 700]] });
add({ id: "edge-hem", name: "12 mm hem of the edge metal, folded round the cleat tip", role: "water", junction: "B", src: ["ABC 2", "RCABC P13 3.2(2)(a)"],
  type: "sheet", t: FT, path: [kick(12 * Math.SQRT2, 2 * FT), kick(12 * Math.SQRT2 - 12, 2 * FT)], runs: [[0, 700]] });
add({ id: "cleat-screws", name: "Cleat screws at 300 through fascia into nailer", role: "metal", junction: "B", src: ["ABC 2"],
  type: "rod", axis: "x", y: 3440, w: [50, 350, 650], d: 4.5, from: FASCIA_OUT - FT, to: FASCIA_IN + 30, embeds: ["edge-cleat", "fascia-upper", "nailer-3"] });
add({ id: "edge-fasteners-a", name: "Edge-metal fasteners, row 1 (203 o.c., staggered)", role: "metal", junction: "B", src: ["06 B15"],
  type: "rod", axis: "y", x: -580, w: [50, 253, 456, 659], d: 4.5, from: 3480, to: 3520.61, embeds: ["edge-metal", "mastic", "basesheet", "nailer-4", "nailer-rip"] });
add({ id: "edge-fasteners-b", name: "Edge-metal fasteners, row 2", role: "metal", junction: "B", src: ["06 B15"],
  type: "rod", axis: "y", x: -540, w: [151, 354, 557], d: 4.5, from: 3480, to: 3520.61, embeds: ["edge-metal", "mastic", "basesheet", "nailer-4", "nailer-rip"] });
const COS2 = Math.cos(Math.atan(0.02));
const BT = (x) => (x <= NAIL_IN ? 3519 : RT(x) + 3 / COS2); // top of base sheet
const CAP_END = FL_IN + 108;                                 // strip-in runs 101.6+ past the flange
const stripBed = [[FASCIA_OUT - 1.4, 3520.61], [FL_IN + 1, 3520.61], [FL_IN + 7, 3519], [NAIL_IN - 0.03, 3519], [CAP_END, BT(CAP_END)]];
add({ id: "stripin", name: "SBS strip-in over flange, 101.6 onto field", role: "water", junction: "B", src: ["06 B16"], type: "sheet", t: 2, path: offsetPath(stripBed, 1), runs: [[0, 680]] });
const stripTop = offsetPath(stripBed, 2), last = stripTop[stripTop.length - 1];
const capBed = [...stripTop, [CAP_END + 2, last[1]], [CAP_END + 10, BT(CAP_END + 10)], [900, BT(900)]];
add({ id: "capsheet", name: "SBS cap sheet", role: "water", junction: "B", src: ["06 B17"], type: "sheet", t: 4, path: offsetPath(capBed, 2), runs: [[0, 640]] });
add({ id: "gutter", name: "Prefinished gutter on 8 mm stand-offs", role: "water", junction: "B", src: ["06 B19", "ABC 3"],
  type: "sheet", t: 0.6, path: [[FASCIA_OUT - 8.3, 3398], [FASCIA_OUT - 8.3, 3290], [FASCIA_OUT - 133, 3290], [FASCIA_OUT - 143, 3383]], runs: [[0, 760]],
  note: "Hangers at 600 max; gutter removable for re-coating the fascia (CMHC-FL 2.25); downspout piped separately to the storm sump." });
add({ id: "gutter-spacers", name: "Stainless stand-offs 8 at each hanger", role: "metal", junction: "B", src: ["ABC 3"], poly: R(FASCIA_OUT - 8, 3370, FASCIA_OUT, 3390), runs: [[140, 160], [640, 660]] });
add({ id: "gutter-screws", name: "Gutter screws through stand-offs into nailer", role: "metal", junction: "B", src: ["ABC 3"],
  type: "rod", axis: "x", y: 3380, w: [150, 650], d: 5, from: FASCIA_OUT - 8.6, to: FASCIA_IN + 20, embeds: ["gutter", "gutter-spacers", "fascia-upper", "nailer-1"] });

// =================== E: footing and drainage ===================
const X0 = -63;                               // wall face at grade (parging face)
const G = (x) => 0.05 * (x - X0);             // finished grade, 5 % away from the wall (07 F6)
const SB = (x) => G(x) - 125;                 // gravel bed
const TS = (x) => G(x) - 100;                 // topsoil bottom
const C5 = Math.cos(Math.atan(0.05));
const ROCK_IN = -175.5, ROCK_OUT = -585.5, ROCK_TOP = -150, STEP = -300, PIPE_X = -380.5, PIPE_Y = -399;
const GR_OUT = -363, ED_OUT = -368.5;         // gravel strip 300 wide, steel edging 5
add({ id: "native", name: "Undisturbed native soil", role: "ground", junction: "E", src: ["07 E1"],
  poly: [[-1300, -700], [900, -700], [900, -450], [-175, -450], [-175, -450.5], [STEP + 0.5, -450.5], [STEP + 0.5, -505.5],
    [ROCK_OUT - 0.5, -505.5], [ROCK_OUT - 0.5, -450], [-1300, -450]], cuts: ["pier-1", "pier-2", ...[-855, -1115].map((x) => ({ type: "rod", axis: "y", x, w: [150, 750], d: 250, from: -600, to: -499 }))] });
add({ id: "footing", name: "Strip footing 550x250, underside at frost depth 450", role: "concrete", junction: "E", src: ["07 E2", "07 E3"],
  poly: [[-175, -450], [375, -450], [375, -200], [144.5, -200], [144.5, -238], [55.5, -238], [55.5, -200], [-175, -200]] });
add({ id: "capbreak", name: "Capillary break coating on footing top, into keyway", role: "water", junction: "E", src: ["07 E4"],
  type: "sheet", t: 1, path: [[-175, -199.5], [56, -199.5], [56, -237.5], [144, -237.5], [144, -199.5], [200, -199.5]] });
add({ id: "rock", name: "Clear crushed drain rock, 150+ cover, stepped clear of the footing", role: "drainage", junction: "E", src: ["07 E9", "DEFG E7", "DEFG E8"],
  poly: [[ROCK_OUT, -505], [STEP, -505], [STEP, -450], [ROCK_IN, -450], [ROCK_IN, -199], [-51, -199], [-51, ROCK_TOP], [ROCK_OUT, ROCK_TOP]] });
add({ id: "geotextile", name: "Non-woven geotextile wrapping the rock envelope", role: "drainage", junction: "E", src: ["07 E9"],
  type: "sheet", t: 0.5, path: [[-51, ROCK_TOP + 0.25], [ROCK_OUT - 0.25, ROCK_TOP + 0.25], [ROCK_OUT - 0.25, -505.25], [STEP + 0.25, -505.25],
    [STEP + 0.25, -450.25], [ROCK_IN + 0.25, -450.25], [ROCK_IN + 0.25, -199]] });
add({ id: "drainpipe", name: "Perforated PVC drain 100, invert at footing underside", role: "drainage", junction: "E", src: ["07 E8"],
  type: "rod", axis: "w", x: PIPE_X, y: PIPE_Y, d: 110, di: 102, from: 0, to: L, embeds: ["rock"],
  note: "Falls 0.5–1 % to the storm sump (two-pipe system, roof water piped separately); cleanout at each high point (DEFG E9)." });
add({ id: "backfill", name: "Free-draining backfill", role: "ground", junction: "E", src: ["07 E11"],
  poly: [[-1300, -450], [ROCK_OUT - 0.5, -450], [ROCK_OUT - 0.5, ROCK_TOP + 0.5], [X0, ROCK_TOP + 0.5], [X0, SB(X0) - 0.5 / C5],
    [GR_OUT - 0.5, SB(GR_OUT - 0.5) - 0.5 / C5], [ED_OUT, TS(ED_OUT)], [-1300, TS(-1300)]], cuts: ["pier-1", "pier-2", "edging"] });

// =================== F: grade ===================
add({ id: "gravel", name: "Gravel strip 300, washed stone, 5 % fall", role: "drainage", junction: "F", src: ["07 F4"],
  poly: [[X0, G(X0)], [GR_OUT, G(GR_OUT)], [GR_OUT, SB(GR_OUT)], [X0, SB(X0)]] });
add({ id: "geo-gravel", name: "Geotextile under gravel strip", role: "drainage", junction: "F", src: ["07 F2"],
  type: "sheet", t: 0.5, path: [[X0 - 0.02, SB(X0 - 0.02) - 0.25 / C5], [GR_OUT - 0.25, SB(GR_OUT - 0.25) - 0.25 / C5], [GR_OUT - 0.25, G(GR_OUT)]] });
add({ id: "edging", name: "Steel edging, top flush with grade", role: "metal", junction: "F", src: ["07 F3"], poly: R(ED_OUT, -145, GR_OUT - 0.5, G(-366)) });
add({ id: "topsoil", name: "Topsoil 100, 5 % fall for 3 m", role: "ground", junction: "F", src: ["07 F6"],
  poly: [[ED_OUT, G(ED_OUT)], [-1300, G(-1300)], [-1300, TS(-1300)], [ED_OUT, TS(ED_OUT)]], cuts: ["pier-1", "pier-2"] });

// =================== C: bench ===================
// Posts beyond the drain envelope, the drip line and the gutter lip (ABC D4). Post-base straps take the
// faces across the wall; one full diagonal brace per frame and tenoned rails rack the bench across; side-bolted
// aprons with 2 bolts per joint hold it lengthwise (post bases resist no rotation, 06 C8).
const PX = [-855, -1115], PW = [150, 750], RAIL = PW.map((w) => [w - 22.5, w + 22.5]);
const SEAT = 375;                              // underside of slats; seat top 420 (ABC D5)
for (const [i, x] of PX.entries()) {
  const n = i + 1;
  add({ id: `pier-base-${n}`, name: "Compacted granular base under pier, 250", role: "drainage", junction: "C", src: ["06 C2"], type: "rod", axis: "y", x, w: PW, d: 250, from: -600, to: -500 });
  add({ id: `pier-${n}`, name: "Concrete pier 200, 450+ below grade, top 152+ above, top falls 1:10, chamfered", role: "concrete", junction: "C", src: ["06 C1", "06 C3", "ABC 19", "ABC 23"],
    type: "revolve", x, w: PW, profile: [[0, 152], [50, 152], [90, 148], [100, 138], [100, -500], [0, -500]] });
  add({ id: `pier-anchor-${n}`, name: "Cast-in stainless anchor 16", role: "metal", junction: "C", src: ["06 C4"],
    type: "rod", axis: "y", x, w: PW, d: 16, from: -400, to: 172, embeds: [`pier-${n}`, `abu-base-${n}`, `anchor-washer-${n}`, `anchor-nut-${n}`] });
  add({ id: `anchor-washer-${n}`, name: "Stainless washer on anchor", role: "metal", junction: "C", src: ["ABC 20"], type: "rod", axis: "y", x, w: PW, d: 44, from: 153.5, to: 156.5 });
  add({ id: `anchor-nut-${n}`, name: "Stainless 5/8 nut on anchor", role: "metal", junction: "C", src: ["ABC 20"], type: "rod", axis: "y", x, w: PW, d: 27, from: 156.5, to: 170.5 });
  add({ id: `abu-base-${n}`, name: "Stainless standoff post base: base plate", role: "metal", junction: "C", src: ["06 C5", "ABC 22"],
    poly: R(x - 38, 152, x + 38, 153.5), runs: PW.map((w) => [w - 47.66, w + 47.66]) });
  add({ id: `abu-straps-${n}`, name: "Standoff post base: side straps (12 ga)", role: "metal", junction: "C", src: ["06 C5"],
    poly: R(x - 38, 153.5, x + 38, 292), runs: PW.flatMap((w) => [[w - 47.66, w - 45], [w + 45, w + 47.66]]) });
  add({ id: `abu-seat-${n}`, name: "Standoff seat, 25 mm above concrete", role: "metal", junction: "C", src: ["06 C5"],
    poly: R(x - 45, 175.5, x + 45, 177), runs: PW.map((w) => [w - 45, w + 45]) });
  add({ id: `post-${n}`, name: "White oak post 90x90, end grain 25 above concrete", role: "furniture", junction: "C", src: ["06 C6", "ABC 7"],
    poly: R(x - 45, 177, x + 45, SEAT - 1.5), runs: PW.map((w) => [w - 45, w + 45]) });
  add({ id: `post-cap-${n}`, name: "Butyl/EPDM cap 1.5 on sealed post end grain, lapped 25 down free faces", role: "water", junction: "C", src: ["ABC 7"],
    poly: R(x - 45, SEAT - 1.5, x + 45, SEAT), runs: PW.map((w) => [w - 45, w + 45]) });
  for (const w of PW)
    add({ id: `post-bolts-${n}-${w}`, name: "Stainless through-bolts 12.7 at catalogue holes", role: "metal", junction: "C", src: ["06 C5", "ABC 18"],
      type: "rod", axis: "w", at: [[x, 221.5], [x, 270]], d: 12.7, from: w - 48, to: w + 48, embeds: [`post-${n}`, `abu-straps-${n}`] });
  add({ id: `apron-${n}`, name: "Oak apron 45x90, side-bolted to posts", role: "furniture", junction: "C", src: ["06 C8"],
    poly: i === 0 ? R(x + 45, SEAT - 90, x + 90, SEAT) : R(x - 90, SEAT - 90, x - 45, SEAT), runs: [[90, 810]] });
  add({ id: `apron-bolts-${n}`, name: "Stainless through-bolts, 2 per joint (moment connection)", role: "metal", junction: "C", src: ["06 C7", "06 C8"],
    type: "rod", axis: "x", ys: [SEAT - 70, SEAT - 20], w: PW, d: 12.7, from: i === 0 ? x - 45 : x - 90, to: i === 0 ? x + 90 : x + 45, embeds: [`apron-${n}`, `post-${n}`] });
  add({ id: `rail-tenon-${n}`, name: "Rail tenon 25x30, 60 into post", role: "furniture", junction: "C", src: ["ABC 6"],
    poly: i === 0 ? R(x - 45, SEAT - 60, x + 15, SEAT - 30) : R(x - 15, SEAT - 60, x + 45, SEAT - 30), runs: PW.map((w) => [w - 12.5, w + 12.5]), embeds: [`post-${n}`] });
  for (const w of PW)
    add({ id: `tenon-pins-${n}-${w}`, name: "Stainless drawbore pins 10", role: "metal", junction: "C", src: ["ABC 6"],
      type: "rod", axis: "w", at: (i === 0 ? [x - 25, x - 5] : [x + 5, x + 25]).map((px) => [px, SEAT - 45]), d: 10, from: w - 45, to: w + 45,
      embeds: [`post-${n}`, `rail-tenon-${n}`] });
}
add({ id: "rail", name: "Oak cross rail 45x90, tenoned into posts", role: "furniture", junction: "C", src: ["06 C8", "ABC 6"], poly: R(PX[1] + 45, SEAT - 90, PX[0] - 45, SEAT), runs: RAIL });
add({ id: "brace", name: "Oak diagonal brace 45, post base to opposite rail end", role: "furniture", junction: "C", src: ["06 C8", "ABC 6"],
  poly: [[PX[0] - 45, 195], [PX[0] - 45, 241], [PX[1] + 45, SEAT - 90], [PX[1] + 45, SEAT - 136]], runs: RAIL });
add({ id: "brace-screws-1", name: "Stainless structural screw 8, post into brace", role: "metal", junction: "C", src: ["ABC 6"],
  type: "rod", axis: "x", y: 235, w: PW, d: 8, from: PX[0] - 80, to: PX[0] + 25, embeds: ["post-1", "brace"] });
add({ id: "brace-screws-2", name: "Stainless structural screw 8, post into brace", role: "metal", junction: "C", src: ["ABC 6"],
  type: "rod", axis: "x", y: 250, w: PW, d: 8, from: PX[1] - 25, to: PX[1] + 80, embeds: ["post-2", "brace"] });
const SLATS = [-790, -928, -1066];             // inboard edges; 130 slats, 8 gaps
for (const [i, x0] of SLATS.entries())
  add({ id: `slat-${i + 1}`, name: "Oak seat slat 45x130, 8 mm gaps", role: "furniture", junction: "C", src: ["06 C9"], poly: R(x0 - 130, SEAT, x0, SEAT + 45), runs: [[90, 810]] });
add({ id: "slat-screws-1", name: "Stainless screws from below through apron", role: "metal", junction: "C", src: ["ABC 21"],
  type: "rod", axis: "y", x: -800, w: [110, 300, 600, 790], d: 5, from: SEAT - 75, to: SEAT + 35, embeds: ["apron-1", "slat-1"] });
add({ id: "slat-screws-2", name: "Stainless screws from below through rail", role: "metal", junction: "C", src: ["ABC 21"],
  type: "rod", axis: "y", x: -990, w: [140, 160, 740, 760], d: 5, from: SEAT - 75, to: SEAT + 35, embeds: ["rail", "slat-2"] });
add({ id: "slat-screws-3", name: "Stainless screws from below through apron", role: "metal", junction: "C", src: ["ABC 21"],
  type: "rod", axis: "y", x: -1180, w: [110, 300, 600, 790], d: 5, from: SEAT - 75, to: SEAT + 35, embeds: ["apron-2", "slat-3"] });

const views = [
  { id: "A-base", x: [-180, 160], y: [140, 420] },
  { id: "B-eave", x: [-800, 250], y: [2950, 3600] },
  { id: "C-bench", x: [-1260, -700], y: [-650, 460] },
  { id: "D-slab", x: [-60, 420], y: [-60, 420] },
  { id: "E-footing", x: [-700, 420], y: [-720, 20] },
  { id: "F-grade", x: [-420, 40], y: [-230, 330] },
  { id: "G-field", x: [-130, 180], y: [1400, 1650] },
];

writeFileSync(new URL("./detail01.json", import.meta.url), JSON.stringify({ L, parts, views }, null, 1));
console.log(`${parts.length} parts`);
