// Detail 01: base of wall and eave, Vancouver rainscreen on a concrete foundation. Millimetres.
// x = section depth (exterior negative), y = up, w = along the wall (0 back, L at the cut).
export const L = 900;
// The plain middle of the wall (1100 to 2600 mm) is cut out with a break line.
export const T = (y) => (y <= 1100 ? y : y >= 2600 ? y - 1500 : 1100);
const R = (x0, y0, x1, y1) => [[x0, y1], [x1, y1], [x1, y0], [x0, y0]];

export const COMP = [
  { id: "footing", step: 1, name: "Concrete footing", short: "footing · 550 × 250", poly: R(-175, -1150, 375, -900), ex: [0, -700], hatch: "conc" },
  { id: "fwall", step: 2, name: "Concrete foundation wall", short: "foundation wall · 200", poly: R(0, -900, 200, 200), ex: [0, -600], hatch: "conc" },
  { id: "rock", step: 3, name: "Drain rock and perforated drain", short: "drain rock", poly: [[-520, -790], [-5, -790], [-5, -900], [-175, -900], [-175, -1150], [-520, -1150]], ex: [-500, -300], hatch: "rock" },
  { id: "backfill", step: 4, name: "Free-draining backfill", short: "free-draining backfill", poly: [[-1300, -200], [-300, -200], [-300, -150], [-5, -150], [-5, -790], [-520, -790], [-520, -1150], [-1300, -1150]], ex: [-700, -400], hatch: "earth" },
  { id: "base", step: 5, name: "Slab on grade", short: "granular base", poly: R(200, -150, 900, 50), ex: [600, -200], hatch: "gravel" },
  { id: "xps", step: 5, name: "Slab on grade", short: "rigid insulation · 50", poly: R(200, 50, 900, 100), ex: [600, -200], hatch: "xps" },
  { id: "slab", step: 5, name: "Slab on grade", short: "slab on grade · 100", poly: R(200, 100, 900, 200), ex: [600, -200], hatch: "conc" },
  { id: "sill", step: 6, name: "Sill gasket and sill plate", short: "sill plate · 38 × 140", poly: R(12, 206, 152, 244), ex: [0, 500], cross: true },
  { id: "frame", step: 7, name: "Studs with batt insulation", short: "studs and batts · 140", poly: R(12, 244, 152, 2962), ex: [0, 800], hatch: "batt" },
  { id: "plate", step: 7, name: "Studs with batt insulation", short: "top plate", poly: R(12, 2962, 152, 3000), ex: [0, 800], cross: true },
  { id: "roof", step: 8, name: "Roof sheathing and membrane", short: "roof sheathing and membrane", poly: R(-651, 3235, 900, 3257), ex: [0, 900] },
  { id: "joist", step: 8, name: "Roof joists", short: "roof joists · 38 × 235", poly: R(-632, 3000, 900, 3235), posts: [[60, 98], [466, 504], [862, 900]], ex: [0, 900], beyond: true },
  { id: "sheath", step: 9, name: "Sheathing", short: "sheathing · 12", poly: R(0, 244, 12, 3000), w1: L - 110, ex: [-450, 0] },
  { id: "flash", step: 10, name: "Base flashing with drip", short: "base flashing, drip", poly: [[-4, 345], [-2, 345], [-2, 234], [-58, 234], [-68, 216], [-70, 218], [-61, 232], [-4, 232]], w1: L - 180, ex: [-500, 0], thin: true },
  { id: "strap", step: 11, name: "Strapping, drained cavity", short: "strapping · 19 × 64", poly: R(-21, 252, -2, 3000), posts: [[90, 154], [496, 560]], ex: [-600, 0], beyond: true },
  { id: "boardc", step: 12, name: "Cement board carrier", short: "cement board · 12", poly: R(-33, 252, -21, 3000), w1: L - 290, ex: [-700, 0] },
  { id: "render", step: 13, name: "Lime render, 20 mm", short: "lime render · 20", poly: R(-53, 252, -33, 3000), w1: L - 390, ex: [-850, 0], hatch: "render" },
  { id: "soffit", step: 14, name: "Larch soffit and fascia", short: "larch soffit", poly: R(-632, 2981, -53, 3000), ex: [-300, 700] },
  { id: "fascia", step: 14, name: "Larch soffit and fascia", short: "larch fascia", poly: R(-651, 2972, -632, 3262), ex: [-300, 700] },
  { id: "gravel", step: 15, name: "Gravel strip", short: "gravel strip · 300", poly: [[-300, -6], [-5, 0], [-5, -150], [-300, -150]], ex: [-600, 300], hatch: "gravel" },
  { id: "topsoil", step: 16, name: "Topsoil, graded away", short: "topsoil, 2% fall", poly: [[-1300, -26], [-300, -6], [-300, -200], [-1300, -200]], ex: [-800, 300], hatch: "soil" },
  { id: "seat", step: 17, name: "Oak seat on posts", short: "oak seat · 45", poly: R(-470, 405, -85, 450), w0: 110, w1: L - 140, ex: [-700, 400] },
  { id: "leg", step: 17, name: "Oak seat on posts", short: "oak post", poly: R(-420, -120, -375, 405), posts: [[190, 235], [L - 260, L - 215]], ex: [-700, 400] },
];

// Membranes are drawn as lines in the specification and offset to bands by clipper2-ts.
export const MEMBRANES = [
  { id: "damp", name: "damp-proofing", path: [[-2.5, 0], [-2.5, -900]], width: 5 },
  { id: "membr", name: "sheathing membrane", path: [[-1, 232], [-1, 3000]], width: 2 },
  { id: "gasket", name: "sill gasket", path: [[0, 203], [152, 203]], width: 6 },
];

// Deterministic randomness: the same edge always grows the same way.
export function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
