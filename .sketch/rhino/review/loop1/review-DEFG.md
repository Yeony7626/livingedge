# Review loop 1 — junctions D, E, F, G (detail01)

Reviewer: author of `research/07-junction-details-ground-wall.md` (07).
Inputs read: `detail01.mjs`, `review/loop0/report.md`, `D-slab`, `E-footing`, `F-grade`, `G-field` section, label and axo captures. Rhino was not opened; every check below is from the spec coordinates.

**Datum and sign convention used in every fix:** your datum. x = 0 at the foundation's exterior face, **exterior negative**. y = 0 at finished grade at the wall face. w = along the wall. Millimetres.

**Source tags:** SOURCED = stated in a document (clause or page given). INFERRED = my judgement or calculation. Sources marked "07 Dx" etc. point to the row in 07 that carries the citation.

**Severity count: 0 blockers, 5 majors, 14 minors** (errors: 4 major, 11 minor; design-decision disagreements: 1 major, 3 minor).

---

## 0. Answers to your two questions

**Damp-proofing with interior ground above outside grade: keep it, but change its label.**
- VBBL 2025 9.13.2.1.(1) requires exterior damp-proofing only "where the exterior finished ground level is at a higher elevation than the ground level inside the foundation walls" (SOURCED, V2 pdf p.85).
- Your inside ground is above outside grade: compacted fill tops out at y = 23.75 and the granular at 123.75, against grade at 0. So the code does not require damp-proofing.
- Keep it anyway (INFERRED):
  - The stem wall still sits in wet backfill from 0 to −200.
  - Damp-proofing cuts the moisture the concrete carries up to the EPDM and sill, and into the sub-slab fill under the soil-gas barrier.
  - It is cheap and impossible to add later.
- Change its `src` and label to "not code-required (9.13.2.1.(1)); best practice", so the tool's explanation layer doesn't claim a code requirement.

**Radon rough-in outside the 900 mm slice: it must appear on the drawing set, but not as slice geometry.**
- Add a leader note on `granular`: "Radon rough-in per VBBL 9.13.4.3: vent-pipe inlet near slab centre, gas-permeable layer ≥100 mm beyond the inlet, pipe sealed at the barrier, labelled every 1.8 m, terminates ≥1.8 m from the property line with a 10–12.5 mm screen" (SOURCED, V2 pdf p.89).
- Show the pipe on the plan or the 3D model, not in this section. See item E12.

---

## 1. Control-layer pen test through the model as built

| layer | path through parts | where it breaks |
|---|---|---|
| **Water shedding** | `stucco` → `bead-base` (+230) → `flash` sloped leg and drip (A) → `gravel` → grade at 5 % | Nothing breaks in D–G. A owns the flashing. |
| **Drainage plane / water-resistive barrier** | Wall: `membrane` lapped over `flash` upstand. Cavity: back of `paper`/`stucco` → 19 mm cavity → `screen-base` → `flash`. Below grade: `gravel` → `geo-gravel` → `backfill` → `geotextile` → `rock` → `drainpipe`. Wall face: `dampproof` (0 → −199) joined to `capbreak` (footing top and keyway). | (a) `paper` spans the 400 mm cavity between straps with no backing, so the scratch coat can push paper and lath into the cavity and bridge it (E3). (b) The `gravel` bed sits on free-draining backfill, so splash water goes straight down the wall face (D2). |
| **Capillary breaks** | 19 mm cavity (G) ✓. `epdm` under `gasket` and `sill` (D) ✓. `capbreak` on footing top (E) ✓. `granular` under slab (D) ✓. | Complete. Better than 07's base case. |
| **Air / soil-gas** | `soilgas` under slab → up the slab edge → over the `edge-xps` top → onto the 60 mm ledge to x = 141 → `vpoly` lapped 40 mm (140 → 180) → `vpoly` up the stud face → `foam` at the top (B). Secondary seal: `gasket`. | (a) 40 mm unsealed, unclamped lap between `vpoly` and `soilgas` does not meet VBBL 9.25.3.3.(2) (E1). (b) No flexible sealant at the slab perimeter (E5). (c) Anchor-bolt holes through `epdm` and `gasket` are not sealed (E6). |
| **Vapour** | Wall: `vpoly` on the warm side; `membrane` and `ei` permeable outboard, so the wall dries outward through the vented cavity ✓ (SOURCED, 07 G.2(a); V2 9.25.5.2.(1)(c)). Floor: `soilgas` (0.25 mm) directly under the slab ✓ (BSD-103, CGSB 7.1.4.5.10). | The slab can dry upward only; test it before floor finishes go down (INFERRED). |
| **Thermal** | Wall: `batts` + `ei` 50 mm down to y = 232. Floor: `xps-a` + `xps-b` (76 mm) + `edge-xps` 75 mm. | **The concrete stem is the only uninsulated path.** The exterior face from y = 232 down to the footing and the 60 mm ledge (x 140–200) at floor level link room air to the 300 mm above-grade concrete band. `ei` overlaps the `edge-xps` plane vertically by only 68 mm (y 232–300). The planes are 200 mm apart, so the BCBC 9.36.2.5.(5) principle would ask for 800 mm (SOURCED rule, BCBC 2024; not in force in Vancouver, so applying it here is INFERRED). See D1. |

**Numeric checks that pass:**

| check | model value | requirement / source |
|---|---|---|
| Slab assembly RSI | 2 × 38 XPS = 2.66 + slab 0.04 + air film 0.16 = 2.86 (INFERRED) | ≥ 2.45 (SOURCED, V1 Table 10.2.2.6) |
| Wall RSI | ≈ 2.36 + 0.52 + 50 × 0.0298 ≈ 4.37, about 4.3 after the ≈5 % screw penalty (INFERRED, using SOURCED inputs IG4 p.9, BCBC A-9.36.2.4.(1)-D, RDH13 3-46) | ≥ 3.85 (SOURCED) |
| Furring coverage | 64/400 = 16 % | ≤ 20 % (SOURCED, 9.27.2.2.(2)(c)) |
| Fire blocks in cavity | 19 mm cavity is the only concealed air space | Not required when the only air space is ≤ 25 mm (SOURCED, V2 9.10.16.2.(2)(a)). Keep the cavity ≤ 25 mm. |
| Clearances | Sill underside +304 ≥ 150 ✓; sheathing bottom +304 ✓; stucco bottom +230 ≥ 200 ✓ | SOURCED, 9.3.2.9, 9.23.2.3, 9.28.1.4 |
| Foundation above grade | 300 | ≥ 150 (SOURCED, 9.15.4.6) |
| Footing | 550 × 250, projection 175, underside −450 | Thickness ≥ projection; frost depth 450 (SOURCED, 9.15.3.8; V1 1.1.3.2) |
| Anchor bolt | 12.7 mm, embedded exactly 100, at x = 70, mid-bay at w = 700 | 12.7 mm and ≥ 100 embedment (SOURCED, 9.23.6.1) |
| Drain pipe | Ø ≥ 100; cover 154 on top, 150 on sides; invert −450 | ≥ 100 mm diameter, ≥ 150 cover (SOURCED, 9.14.3) |
| Granular under slab | 100 | ≥ 100 (SOURCED) |
| Soil-gas barrier | 0.25 mm | CGSB 7.1.4.5.1 (SOURCED) |
| Gravel strip | 125 deep, 5 % fall, geotextile, steel edging | 07 F2–F4 (INFERRED) |
| Topsoil fall | 5 % | 07 F6 (INFERRED, from SOURCED US values) |

---

## 2. Errors

### E1 — major — `vpoly`, `soilgas`: the floor-to-wall air-barrier lap does not comply

**What's wrong.**
- `vpoly` laps onto `soilgas` over only 40 mm (x 140 → 180, y 300.325), with no sealant and no clamp.
- VBBL 9.25.3.3.(2) requires flexible-sheet air-barrier joints to be sealed, or lapped ≥ 100 mm and clamped (SOURCED, V2 pdf p.180).
- `vpoly`'s name says "sealed to sill", but no bead is modelled.

**Fix.**
- Extend `vpoly` path to `[[140.08, 3100], [140.08, 300.325], [245, 300.325]]`. That gives a 104 mm lap over `soilgas` (x 141 → 245).
- Add `seal-floor`: acoustical sealant bead, 6 × 6 mm, at x 150–156, y 300.2–300.3, between `soilgas` and `vpoly`.
- Add `seal-sill`: acoustical sealant bead between `vpoly` and `sill` inner face, at x 140.0–140.08, y 305–311.
- Clamp the lap with the cap in E2.
- Sources: SOURCED, 9.25.3.3.(2); bead positions INFERRED.

### E2 — major — `edge-xps`, `soilgas`, ledge: bare foam and a 0.25 mm sheet are left as the finished floor edge

**What's wrong.**
- At y = 300 the floor surface from x 141 to 275 is a 0.25 mm poly over the 60 mm concrete ledge and the 75 mm XPS top.
- Nothing is designed to carry a floor finish, baseboard loads or traffic there.
- Tile or hardwood over 75 mm of foam cracks or dents. Flooring trades will puncture the soil-gas and air barrier at its most critical joint.
- Gypsum stops at +310. Between x = 153 and the slab nothing covers the barrier.

**Fix.**
- Add `edge-cap`: 12 mm fibre-cement (or PT plywood) strip at x 153 → 295, y 300.6 → 312.6, adhered with compatible adhesive. Use no mechanical fasteners within x < 275, so `soilgas` is not punctured.
- The floor finish butts or overlaps it at x = 295; the baseboard covers x 140–165.
- This also clamps the E1 lap.
- Sources: INFERRED. The requirement to keep the barrier continuous and sealed is SOURCED (9.25.3.6, CGSB 7.1.4.5.9).

### E3 — major — `paper`, `lath`, `stucco`: no backing between straps

**What's wrong.**
- Backing paper and self-furred lath span the 400 mm strap spacing over an open 19 mm cavity with nothing behind them.
- CMHC: "stucco applied over strapping strips does not have continuous support from the sheathing. An appropriate lath or other backing must be used to span between the strapping strips" (SOURCED, CMHC 2001 p.7-17).
- Unsupported paper bellies into the cavity under the scratch coat. That bridges or closes the capillary break (which needs ≥ 9.5 mm, SOURCED 9.27.2.2.(1)(a)) and thickens the stucco unevenly.

**Fix.**
- Add `line-wire`: galvanized line wire, Ø1.2 mm, axis w, stapled across the strap faces at x = −82.1 → −83.3. Rows at y = 300, then every 150, up to 3000. Runs w 0 → 570.
- Move `paper`, `lath`, `stucco`, `bead-base` and `bead-top` outward by 1.2 mm. Equivalently, set `PAPER = STRAP − 1.2 − 0.5`.
- Alternative: specify paper-backed welded-wire lath rated for a 400 mm support spacing, and keep the geometry.
- Sources: wire Ø1.19 mm at ≤ 150 mm is the VBBL figure for stucco without sheathing, 9.28.4.2 (SOURCED, V2 p.206); using it here as backing is INFERRED.

### E4 — major — `strap-screw-*`: 600 mm vertical spacing is too sparse for 22 mm stucco through 50 mm mineral wool

**What's wrong.**
- Stucco plus lath on 19×64 straps is a heavy cladding hung through 50 mm of compressible insulation.
- CMHC's value for stucco on 19 mm strapping at 400 mm, with no insulation, is 64 mm nails at 300 mm on stud lines (SOURCED, CMHC p.5-7).
- RDH's through-insulation method uses screws "often every 12 to 24 inches". It also notes that heavier claddings such as stucco need structural consideration (shear blocking or design), and that the insulation must be rigid (> 8 pcf) (SOURCED, RDH13 pp.3-46–3-47).
- 600 mm is the lightweight-cladding end of that range. The mineral wool density isn't specified.

**Fix.**
- Screw rows every 300 mm: y = 400, 700, …, 2800, plus 250 and 2950 near the strap ends.
- Keep Ø6 mm, embedment 75 mm into the stud as modelled; stainless or coated, compatible with the PT straps (SOURCED, City Bulletin 2009-009).
- Rename `ei` to "rigid mineral wool ≥ 128 kg/m³ (8 pcf)" (SOURCED threshold, RDH13).
- Flag for structural confirmation of the stucco load. Optionally, use the existing `closure` (B) as a top shear block screwed to the studs (RDH13 describes the method).
- Sources: SOURCED 300 mm (CMHC) and the RDH method; the ≤ 300 spacing for this assembly is INFERRED.

### E5 — minor — slab perimeter: no flexible sealant

**What's wrong.** VBBL 9.25.3.6.(5) requires the floor-on-ground to be "sealed around its perimeter to the inner surfaces of adjacent walls using flexible sealant" (SOURCED). The poly upstand gives continuity, but the code-literal joint and a debris seal are missing.

**Fix.** Add `slab-seal`: flexible sealant 6 × 6 at x 275.25–281.25, y 294–300, in a 6 mm reglet tooled into the slab's top edge against the `soilgas` upstand. Cut the reglet from `slab`. Sources: SOURCED rule; geometry INFERRED.

### E6 — minor — `anchor` through `epdm` and `gasket`: penetration not sealed

**What's wrong.** The bolt pierces the capillary break and the secondary air seal.

**Fix.** Add a note, or a 2 mm sealant collar at x 63.7–76.3, y 300–304, w 694–706. Sources: INFERRED; the requirement to seal penetrations is SOURCED (9.25.3.3.(6)).

### E7 — minor — `rock`: 9 mm sliver over the footing projection

**What's wrong.**
- `rock` runs over the footing projection (x −175.5 → −1) from y −199 to −190. A 9 mm layer can't be built with 19 mm clear stone.
- The rock top at −190 sits only 10 mm above the footing top.

**Fix.**
- Raise the rock top to y = −150 across x −585.5 → −1. Then `geotextile` top = −149.75 and `backfill` bottom = −149.5.
- Cover over the pipe becomes 194 mm (≥ 150 SOURCED).
- Sources: INFERRED.

### E8 — minor — `rock`, `native`: trench undercuts the footing edge

**What's wrong.**
- The rock bottom is at −505 right against the footing edge (x = −175.5). That is 55 mm below the footing underside, inside the footing's bearing-influence zone.
- VBBL wants the pipe "laid on undisturbed or well-compacted soil" (SOURCED, 9.14.3.3.(1)). Gravel bedding is accepted locally (SOURCED, Burnaby guide p.1).

**Fix.**
- Keep the rock bottom at −450 from x −175.5 to −300.
- Step down to −505 only from x −300 to −585.5. At x = −300 a 45° line from the footing edge is already at −575, so the step is outside the influence zone.
- Adjust `native` and `geotextile` to match.
- Sources: INFERRED.

### E9 — minor — `drainpipe`: modelled level; outlet and cleanout not referenced

**What's wrong.** The pipe is level along w. It must fall to the outlet, and cleanouts at the high points are an inspection item (SOURCED, North Vancouver checklist; Burnaby guide shows cleanouts).

**Fix.** Add a note: "falls ≥ 0.5–1 % to the storm sump (two-pipe system, roof water piped separately); cleanout at each high point". Optionally slope the rod by 0.005 × 900 = 4.5 mm over the slice. Sources: SOURCED for cleanouts and grading; the percentage is INFERRED.

### E10 — minor — lath fasteners missing; code grey area

**What's wrong.**
- No lath fasteners are modelled.
- VBBL needs lath fasteners at ≤ 150 mm vertical × 400 mm horizontal, Ø ≥ 3.2 mm nails with 11.1 mm heads or ≥ 1.98 mm staples, penetrating "25 mm into framing members or to the full depth of the sheathing" (SOURCED, 9.28.3.2, 9.28.4.6.(2)).
- On 19 mm strapping, 25 mm into framing isn't possible without passing through 50 mm of mineral wool.
- 9.27.5.7.(3) (through the nail-holding base) is the clause that makes fastening to the strap acceptable (SOURCED).

**Fix.**
- Add `lath-staples`: stainless staples ≥ 1.98 mm, rod axis x, from x = −90 to −64, which passes fully through the 19 mm strap. On each strap line (w = 79, 485), at y every 150 from 300 to 3000.
- Note the 9.27.5.7.(3) basis.
- Sources: SOURCED clauses; the interpretation is INFERRED.

### E11 — minor — stucco control joints: not shown or noted

**What's wrong.** None fall inside the 900 mm slice, but the drawing needs the rule.

**Fix.** Add a note: "vertical control joints ≤ 4.57 m and at opening corners, carried through the lath; avoid T- and L-shaped panels" (SOURCED, CMHC p.7-17).

### E12 — minor — radon rough-in: not referenced

**What's wrong.** The rough-in is required (SOURCED, 9.13.4.2–9.13.4.3) but isn't mentioned anywhere on the drawing.

**Fix.** Add the leader note from section 0. No geometry is needed in this slice.

### E13 — minor — `parging`, `dampproof`: both end exactly at grade

**What's wrong.**
- The parging runs 0 → 300 and the damp-proofing 0 → −199, butting at y = 0, which is where the gravel top meets the wall.
- Gravel settlement or raking exposes the asphalt damp-proofing top and the raw parging bottom edge. That is a water-entry point, and parging delaminates under freeze–thaw (≈ 37 air cycles per year, SOURCED in 03).

**Fix.**
- Lap the parging 100 mm below grade, over the damp-proofing: `parging` poly `[[−8, 300], [0, 300], [0, 0], [−1, 0], [−1, −100], [−9, −100], [−9, 0], [−8, 0]]`.
- Move the inner faces of `gravel` and `geo-gravel` from x = −1 to x = −9 for y −100 → 0, so they don't clash with the parging lap.
- Specify a cementitious or elastomeric damp-proofing (≤ 43 ng/(Pa·s·m²), SOURCED 9.13.2.2.(2)(b)) that parging can bond to.
- Sources: INFERRED.

### E14 — minor — `soilgas` on the ledge: construction sequence

**What's wrong.** As drawn, the poly is folded onto the ledge before the pour. Screed rails and finishing tools run on the stem-wall top and will tear it.

**Fix.** Add a note to the assembly animation's sequence:
1. Leave the upstand loose, about 150 mm long, during the pour.
2. After the slab cures, fold it over `edge-xps` and tape it to the ledge at x 141–200.
3. Then lay `epdm` and `gasket`, set the sill, frame, and lap and seal `vpoly` (E1).

The CGSB order is "sealed and clamped to the foundation wall prior to the concrete slab pour" (SOURCED, 7.1.4.5.5). Folding it after the pour is INFERRED and needs a tape-to-concrete seal.

### E15 — minor (coordinate with A) — `epdm` stops flush at x = 0

**What's wrong.** The EPDM ends flush with the foundation face, so water that reaches the sill joint behind the flashing has no pan.

**Fix.** Extend `epdm` 40 mm down over the parging face: x −8 → −9, y 260 → 301, behind the flashing's vertical leg. The leg sits at x ≈ −12.3, so a 3.3 mm gap remains. `parging` occupies x −8..0 to y = 300, so the turn-down must go outside it. Sources: INFERRED; A's reviewer decides.

---

## 3. Design-decision disagreements

### D1 — major — stem wall and ledge thermal bridge: add exterior foundation insulation

**What's wrong.**
- With the foundation top at +300 (A's change), the above-grade uninsulated concrete band is now 300 mm tall, not 200.
- `ei` stops at +232, so the wall's exterior insulation plane and the interior `edge-xps` plane overlap by only 68 mm across a 200 mm concrete wall.
- 07 D.2(d) identified this as the main remaining bridge. Whether the City treats the above-grade stem as a "foundation wall" needing RSI 3.85 (SOURCED value, V1 Table 10.2.2.6) is an open question. If it does, this becomes a blocker.

**Fix (IG4 option 1, "exterior insulation to the footing", SOURCED, HPO/BC Housing Illustrated Guide CZ4 p.10).**
- Add `fnd-xps`: 50 mm XPS (or EPS Type 2 / rigid mineral wool rated below grade) at x −1 → −51, y 225 → −199, on the damp-proofing.
- Protect it from y = 0 to 225 with 12 mm cement parging on wire lath: x −51 → −63, which aligns with the `ei` face at −63.1 (SOURCED, 9.25.2.3.(6)). Below grade the free-draining backfill sits against the XPS.
- The lath-backed parging **replaces** the current `parging` (x −8..0). A's `flash-clip` and `clip-screws`, which run through the parging into `fwall`, must be re-seated on the insulation/parging face or replaced by a continuous cleat.
- Shift `gravel`, `geo-gravel`, `backfill`, the top of `rock` and the inner edge of `geotextile` outward by 51–63 mm.
- `dampproof` and `capbreak` stay on the concrete.
- The base flashing (A) then laps over the top of `fnd-xps`. Coordinate with the junction A reviewer.
- This also confirms the frost-depth footing (an insulated foundation takes the "no heated space" column, SOURCED 9.12.2.2.(2)). The footing is already at −450.
- If rejected, keep the current design but run a 2-D THERM model of the ledge and plate at −7 °C (SOURCED design temperature, V1 Table C-2) before releasing.

### D2 — minor — `gravel` bed on free-draining backfill

**What's wrong.** The 5 % subgrade slope under the strip does nothing, because the layer under it is free-draining. Splash and rain on the strip go straight down the wall face to the footing drain on every storm (07 F.3(a), INFERRED).

**Fix.**
- Add `gravel-membrane`: 1 mm EPDM or HDPE under `geo-gravel`. Turn it up the wall 50 mm at x −1 → −2 (shift `gravel` out 1 mm), from y −125.5 to −75, under the parging lap of E13. Run it out at 5 % to (−900, −170.5) beneath the topsoil.
- Alternatively use a 100 mm silty-clay cap under the gravel and topsoil (SOURCED, DOE: "cap the top layer of the grade with 2 to 4 inches of silty clay").
- Sources: INFERRED.

### D3 — minor — `stucco`: zero tolerance over the lath

**What's wrong.** The lath face is at −89.6 and the stucco face at −104.6, giving exactly 15.0 mm over the lath, which is the VBBL minimum measured from the face of the lath (SOURCED, 9.28.6.2). Any trowel or lath tolerance falls below code.

**Fix.** `FACE = PAPER − 25`. The stucco becomes 25 mm overall and 18 mm over the lath. Adjust the beads to match. Sources: SOURCED minimum; the 25 mm is INFERRED.

### D4 — minor — stucco bottom +230: only 30 mm above the 200 minimum

**What's wrong.**
- +230 is compliant on day 0 (SOURCED, 9.28.1.4).
- But 07 F.2 found that added mulch, soil or gravel top-ups of 25–75 mm over the decades are likely (INFERRED, illustrative).
- The render also sits inside the 0–300 German splash zone (SOURCED via 03).

**Fix.**
- Keep the geometry, since A owns it.
- Dimension "maximum finished grade at the wall = 0; stucco ≥ +200" on the section.
- Have the decades timeline flag the clearance when grade rises more than 30 mm.

---

## 4. Completeness against a fully resolved detail (Detail Library benchmark)

- **Present and matching the UK benchmarks** (DL371, DL174, DL207, MG1, TW3):
  - slab-edge insulation upstand;
  - continuous soil-gas/radon membrane;
  - capillary break under the plate;
  - insect mesh at the cavity base;
  - casing bead;
  - drain with filter wrap;
  - lath + paper + 3-coat render on battens (the TW3 equivalent);
  - foundation with a dimensioned ground clearance.
- **Missing, all listed above:** sealant beads (E1, E5, E6), the floor-edge cap (E2), line wire or backing (E3), lath fasteners (E10), the parging lap (E13), and the notes on the radon rough-in, drain fall and outlet, and control joints (E9, E11, E12).
- **Cavity barriers** (the DL371 October 2025 update) **do not apply** to this wall: VBBL 9.10.16.2.(2)(a) exempts a single air space ≤ 25 mm (SOURCED). Keep the cavity at 19 mm.

## 5. Things invented in the model that I'd change (summary)

- Line 188: `rock` 9 mm sliver (E7).
- Line 181: trench step under the footing edge (E8).
- `paper` directly on the straps with no backing (E3).
- Screw spacing of 600 (E4).
- `vpoly` 40 mm lap (E1).
- Everything else in D–G matches 07 or is a defensible reading of it.
