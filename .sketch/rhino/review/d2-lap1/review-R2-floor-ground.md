# Detail 02, lap 1: review R2 (floor, foundation and ground drainage)

**Reviewer:** R2. **Scope:**
- junction F: slab, EPS, soil-gas poly, stone, radon, interior subgrade;
- the foundation: grade beam and footing, damp-proofing, beam XPS, and the block course's thermal continuity with the slab insulation;
- ground drainage M and E: channel outlet, lined landing (liner, bedding, base, underdrain), unlined paver base, subgrade, the rainwater line and its levels to the rain garden, and frost depth.

**Read:**
- `detail02.mjs` and `detail02.json`;
- `review/d2-lap0/report.md` and `metrics.md`;
- the F, T, M, J and S captures, and `exterior-eye.png`;
- research 12, 07 (D and E), 08b, 08 (§0.3, I and J), 11 (§3 and §5), 01 and 09 (cellular-glass carbon).

**Checked this session:**
- BC Building Code Appeal Board decision #1114, "Finished Ground Level" (gov.bc.ca).
- The Owens Corning **FOAMGLAS PERINSUL SIB** product data sheet, Pub. 10025278-F, January 2023 (the PDF was read).
- Two search summaries: PERINSUL in North America, and Marmox Thermoblock.

**Levels:** every level below was recomputed from the generator's formulas with a scratch script.

**Overlap with R3:** I agree with R3 F1 (ponding), F2 (far rim), F3 (subdrain) and F9 (route the line outside the lined zone). Finding 1 adds the level check that R3's P1 misses: with a 1 % pipe, the pipe still comes out of a 12 % bank.

**Datums:**
- x = 0 at the sliding frame's exterior face; **exterior is negative**.
- y = 0 at the finished floor (FFL). Millimetres throughout.
- PT(x) = paver top; PB(x) = PT(x) − 280, the base bottom (the generator's functions).

---

## 1. Score: **5 / 10** for floor, foundation and ground-drainage performance and buildability

**What is right:**
- The interior floor is research 12's option (c), drawn faithfully:
  - 100 mm low-carbon slab on a 0.25 mm poly;
  - 2 × 50 mm graphite EPS with staggered joints;
  - 100 mm clear stone, with the radon rough-in noted.
  - It reaches RSI 3.00 (VBBL table λ) to 3.48 (metrics λ) against 2.45 required.
- The door load is carried on a separate grade beam, so the slab stays a Part 9 floor-on-ground.
- Accessibility levels work: rise 13 mm at 1:2; flush grate at −8; 2 % falls.
- The landing is lined and turned up at the channel.
- The channel never goes to the foundation drain.

**What holds the score down.** Each item is a control-layer or level-chain failure, not a matter of taste:
1. **The rainwater line comes out of the bank.**
   - Its crown breaks the surface at x ≈ −4870.
   - It runs exposed for about 840 mm, sitting 60 mm proud at the rim. This is visible in `exterior-eye.png`.
   - It has only 99 mm of cover at the tree.
   - Cause: the line is set by the deep underdrain trench, and it runs under the lined landing.
2. **No perimeter foundation drain.**
   - It is required by VBBL 9.14.2.1, and the damp-proofing (9.13.2) presumes it.
   - Research 12 R3 and 08b M1 both assume it exists.
3. **Gaps around the block course:**
   - its exterior face is bare from −131 to −181;
   - the pan drains onto the haunch joint;
   - there is no slab-edge insulation strip, so the slab touches the wedge and grout;
   - the poly-to-pan lap is 51 mm and not bonded;
   - the 0–15 mm feather-edge wedge cannot be built.
4. **The specified block (PERINSUL HL, 100 mm) is a UK/EU product.** The North American product (SIB) has different dimensions and limits.
5. **The channel and haunch sit on frost-susceptible soil** above the frost line, against a sill that tolerates about 2 mm of movement.

The fixes are local and numeric. With findings 1–9 applied, I would expect a score of 8.

---

## 2. Findings

**Severity counts: 2 blocker · 8 major · 8 minor.**

### Blockers

**1. (blocker) The drainage level chain puts the rainwater line out of the ground. The bank and rain-garden levels follow from the wrong driver.**
- **Parts:** `rainwater-line`, `underdrain`, `base-lined`, `liner`, `bed-soil`, `bed-mulch`, `rg-medium`, `rg-mulch`, `rg-riser`, `subgrade`.

**Problem.** Levels as built:

| x | element | level / note |
|---|---|---|
| −1700 | underdrain invert | −469.6, in a 158 mm trench below the base |
| −200 → −5710 | rainwater line | starts at the underdrain level (tee) and falls 1 %; centre −403.6 at −200, −458.7 at −5710 |
| −5150 | rim | −458.1 |
| — | crest | −558.1 |
| — | mulch | −658.1 |
| −3400 → −5150 | bed | falls from −69.6 to −458.1, i.e. **22.2 %** |

Pipe crown against the bed surface:

| x | cover over the crown |
|---|---|
| −3400 | 311 |
| −4000 | 184 |
| −4400 (the tree) | **99** |
| −4800 | 14 |
| −4870 | **0 (daylights)** |
| −5150 (rim) | **−60** (crown above the rim) |
| −5710 (outlet) | 131 mm above the slope surface (R3 F4) |

- The outlet invert is −509.7, only **48 mm** above the crest; 50 mm is required (08 J11, MV23 inlet drop, SOURCED).
- The root cause is structural:
  - The pipe has to stay under the terrace bedding, so its crown must be below −199.6 at x −3250.
  - It must fall ≥ 1 %.
  - Its outlet must sit 50 above the crest, while the rim sits only 100 above the crest.
  - So at the rim the crown is necessarily about 60 mm above the rim.
  - Any bank steeper than about 1 % uncovers the pipe before the garden.
- R3's P1 (rim −288.5, bank 12.5 %) has the same defect: the crown is exposed from x ≈ −4200 (checked).

**Ruling.** The drop between the terrace and the pond floor (≥ 480 mm) must sit **inside the rain garden's house-side slope, not in the planted bed**. Research 08 J8 already requires the far rim to be lower than the house-side rim, so the house rim does not have to sit at crest + 100.

**Exact fix (with findings 3 and 4):**

| element | new value |
|---|---|
| Roof + channel line | Solid PVC ⌀100, solvent-welded, outside the lined zone (finding 4). Invert −290 at the silt-box outlet (x ≈ −200, end of the opening) → **−320 at x −3250** (crown −214, 14 mm under the bedding bottom −199.6) → −339 at x −5150. Fall 1 %; it may be steeper upstream of −3250 but not shallower. |
| Bed | Falls **3 %**: −69.6 at x −3400 → **−122 at x −5150**. Pipe cover is 146 at −3400, 126 at −4400 and 111 at −5150. Lay a 50 mm precast cover strip and marker tape over the pipe, use SDR 28 PVC, and keep the pipe ≥ 2.0 m from the trunk in plan (R3 F9; 08 I5). |
| Rain garden, house side | Rim −122 at x −5150. 3:1 inner slope down to the floor. |
| Crest (`rg-riser` top) | **−400** |
| Mulch top (PONDB) | **−550**: ponding 150 mm, the bottom of the 150–300 (S) range. Use 200 (mulch −600) if the garden can extend to x −8100. |
| Floor | From x −6434 to x −7034 (600 mm minimum bottom width, 08 J1 S). |
| Far rim | **−300** (= crest + 100, i.e. lower than the house rim, 08 J8) at x −7784, rising to −285 at −8000. |
| Outlet | The pipe daylights on the house-side slope at **x ≈ −5494, invert −342.4**: 57.6 mm above the crest ✓. Set `LINE0 = −5494`, with R3's headwall, cobble apron and flap at the outlet. |

- **Effects:**
  - No exposed pipe.
  - The bed is gentle, so the tree stands on near-level ground.
  - The "22 % bank" is replaced by a standard 3:1 planted rain-garden slope.
  - The garden floor is 108 mm higher than now, so there is less excavation.
- **Basis:**
  - SOURCED: 08 J8 and J11 (200 mm typical ponding, 150–300 range; freeboard 100; outlet ≥ 50 above the crest); 08 J1 (bottom ≥ 600); NPC 1:100 for > 75 mm pipes (08 J12).
  - INFERRED: all levels (scripted check).

**2. (blocker) No perimeter foundation drain at the grade beam.**
- **Parts:** `beam`, `dampproof`, `beam-xps`, `subgrade`; new `perim-drain`, `perim-rock`, `perim-geotextile`.

**Problem.**
- The beam retains about 290 mm of grade difference: grate −8 outside against interior ground (stone underside) at −300.
- Its exterior face is damp-proofed only, and the backfill is native soil.
- VBBL 9.14.2.1 requires the bottom of every exterior foundation wall to be drained "unless shown unnecessary".
- Damp-proofing rather than waterproofing is only acceptable where 9.14 drainage is provided; hydrostatic conditions need 9.13.3 waterproofing.
- Vancouver tills perch water around footings from October to March (07 E.2(c)).
- Without a drain, water stands against the beam and the cold joint, and can enter the sub-slab stone. That would wet the EPS underside and block future radon depressurisation.

**Answer to the open question.** Yes, a perimeter drain is needed. It can only be omitted if a geotechnical report shows free-draining soils with the seasonal high water table well below the footing. Along the opening it is the continuation of the house's perimeter drain.

**Exact fix:**
- `perim-drain`:
  - perforated PVC ⌀100 (d 110, di 102), rod along w;
  - **x −185, centre y −415** (invert ≈ −466, at the footing underside −470 per 07 E8);
  - falls ≥ 0.5 % along w to its own solid outlet, then to the storm sump (two-pipe practice, 07 E10);
  - cleanouts at both ends;
  - **never** connected to the channel, underdrain or rainwater line (already correct in the notes).
- `perim-rock`:
  - 19 mm clear crush, ≤ 10 % passing 4 mm;
  - polygon x −120 → −400 from y −470 up to the liner underside (PB(x) − 2, ≈ −290);
  - plus the zone x −175.5 → −96.5 from y −320 up to the haunch underside (−230, see finding 9);
  - this replaces the subgrade there and the 16 mm soil sliver over the XPS.
- `perim-geotextile`: nonwoven, wrapping the whole rock envelope (07 E9).
- **Cover over the pipe is only ≈ 70 mm** (crown −360 against the liner underside −290), against the ≥ 150 mm of 9.14.3.3.(4). Either:
  - accept the landing liner as the cap of the envelope (it keeps the drain free of surface water, which is the intent) and record this as an alternative-solution detail; **or**
  - deepen the footing at the opening by 85 mm (underside −555), at about +0.04 m³/m of concrete. I recommend the first.
- **Do not** link the sub-slab stone to this drain (12 §6.4.3: it would short-circuit depressurisation). The beam already separates them.
- **Basis:**
  - SOURCED: 01 req.foundation-drainage (VBBL 9.14.2.1, 9.14.3.2–3); 01 req.dampproofing-foundation (9.13.2.1, "applies only where 9.14 drainage provided"); 07 E8–E10; 12 R3; 08b M1 ("perimeter drain and drain rock complete" as a precondition).
  - INFERRED: geometry.

### Majors

**3. (major) Landing underdrain: a deep trench, teed into the roof line, with no fall and no cleanout.**
- **Parts:** `underdrain`, `liner`, `base-lined`, `rainwater-line`.

**Problem:**
- The 158 mm trench drops the underdrain to invert −469.6. Through the tee, that sets the whole rainwater line about 160 mm lower than it needs to be.
- The tee lets a blocked or surcharged roof line, or the rain garden, back up into the lined base and against the channel and haunch. The garden surcharge level (−458) is above the underdrain invert today.
- The rod is level along w, but research needs ≥ 1 % (08b M6 S, NPC).
- There is no upstream observation or cleanout riser (08b M6, ICPI S).
- Between the trench and the cut-off the liner floor falls about 1 mm *away* from the trench (PB(−1798) −320.5 → PB(−1850) −321.6), leaving a small dead pocket.

**Exact fix:**
- Delete the trench: B path points 3–6 become a straight floor at PB(x).
- Move the underdrain to the liner's low corner at the cut-off: **UD = −1785, centre y = PB(−1785) + 65 = −255.3** (invert −306.3).
  - It sits on 10 mm of No. 57 on the protection geotextile.
  - Its crown (−200.3) is 30 mm under the base top (−170.3).
- Give the rod a fall of **1 % along w** (dy = −18 across the slice) towards the opening end.
- Riser ⌀100–150 at the upstream end, capped flush.
- **Own solid outlet.** One welded and leak-tested boot through the liner's end upturn, then a solid PVC line to the storm sump, or into the rain-garden riser **below the crest**, with a flap or backwater valve. It must **not** be teed into the roof/channel line.
- Note a conflict between sources: 08b M21 says "not … the perimeter drain or its sump"; 07 E10 (Burnaby) puts both in one storm sump through separate pipes. Either outlet is acceptable as long as it is a separate inlet with a backwater flap.
- **Basis:**
  - SOURCED: 08b M.1 (V1 Book II 2.4.5.3: subsoil drainage pipe to a sump connected to storm); 08b M6 (≥ 1 %, riser); 07 E10.
  - INFERRED: levels and the backflow mechanism.

**4. (major) The rainwater line runs under the lined landing and beside the footing.**
- **Parts:** `rainwater-line`, `liner`, `base-lined`, `subgrade`.

**Problem:**
- From x −200 to −1850 the pipe runs in subgrade under the liner, 80 mm outside the footing toe at mid-footing depth. That is exactly where `perim-drain` must go (finding 2).
- It passes through the liner trench walls twice, which 08b's failure table names as the worst-case bypass.
- In plan the downspout and channel outlet are both at the end of the opening (gutter and channel notes), so the line has no reason to cross the landing.

**Exact fix:**
- Route it in plan from the boot and silt box at the opening end, straight out beside the landing (outside the liner's end upturn).
- In the model, delete it for x > −1900. Draw it from x −1900 outward at the finding-1 levels (invert −306.5 at −1900, crown −200.5, inside `base-1`).
- Or move it to w = 2950 as a hidden line (R3 F9). In either case delete the liner and trench penetrations.
- **Basis:** 08b M.4(e) failure table ("liner … punctured by … pipe work: bypass at the wall", S principle); 08 J12 ("no fittings within 700 of the foundation"). Routing INFERRED.

**5. (major) The block course's exterior face and the pan termination leave a water-barrier gap, and the pan drains onto the haunch joint.**
- **Parts:** `pan`, `dampproof`, `perinsul`, `beam-xps`, `haunch`, `channel`, `track-weeps`.

**Problem.** As drawn:
- The pan's exterior leg ends at −131.
- The damp-proofing starts at −181.
- The block's exterior face is **bare from −131 to −181**, with a 16 mm soil sliver and the haunch against it.
- Everything that reaches the pan floor collects at the front corner (pan top ≈ −79.5 at x −20), against the channel's inner wall.
  - The track weeps are at y −55 (bottom −61), about 18 mm too high to drain it.
  - The only other way out is the 1.5 mm slit between the channel wall and the pan, which discharges onto the haunch–block joint at −130/−131. From there water reaches the bare cellular-glass face, the mortar bed on the beam top (−181) and the beam.

**Requirements this misses:**
- 11 T6: the exterior downturn should go ≥ 50 mm **into the channel** (S, LOE-INST).
- 12 R5: the pan should lap ≥ 100 over the beam damp-proofing.
- The SIB data sheet: "should be protected from freeze/thaw exposure by adequate water protection on exposed edges".

**Exact fix (foundation side).**
- **New pan geometry:** `PAN_BED = [[231, −10], [231, −64], [−20, −79], [−20, −320]]`, offset −0.75.
  - The pan's exterior leg continues as one liquid membrane down the block **and the beam face to the footing top**, and replaces `dampproof`. A PMMA-class membrane exceeds the 9.13.2 damp-proofing permeance; that equivalence is INFERRED.
  - If a separate damp-proofing is kept below −181, the pan must lap 100 over it (to −281) and be listed by its maker as compatible with that damp-proofing. Asphalt emulsion under PMMA or silicone is not compatible without a primer or barrier.
- **`beam-xps`:** R(−96.5, −320, −21.5, −165). It covers the pan's lower leg and rises 16 mm onto the block. Install it after the pan.
- **Interface for R1 (threshold):**
  - Slot the channel's inner wall at the pan floor: sub-surface inlets with y −82 to −62 at ≤ 300 mm centres, and turn the pan front 20 mm into them; or lower the track weeps to y −72.
  - Seal the top of the channel–pan slit with sealant.
- **Basis:** SOURCED: 11 T6; 12 R5; SIB data sheet (Pub. 10025278-F); 01 req.dampproofing-foundation. INFERRED: geometry and the compatibility note.

**6. (major) The code-required slab-edge insulation and the perimeter sealant are missing at the door.**
- **Parts:** `slab`, `soilgas`, `grout`, `wedge`, `eps-1`, `eps-2`; new `slab-edge-strip`, `edge-sealant`.

**Problem:**
- The slab edge (x 231.25) touches the wedge (−81 → −66) and the grout (−66 → 0) through only 1.75 mm of membranes.
- The wedge and grout are a continuous mineral path, 251 mm long, out to the open slot face (x 0 → −20). This is the main thermal bridge at the door, on the coldest line in the room.
- VBBL Table 10.2.2.6 requires insulation "under all slab area **and around edge of slab**".
- Research 12 R10 places a 25 mm XPS strip there. 11 T5 places 75 mm of XPS at the same face; 12's thinner strip is chosen because the slot is fixed by MAR.
- There is no perimeter sealant (9.25.3.6.(5) asks for a flexible sealant at the slab perimeter), and a 1.75 mm open slit runs from −15 to 0.

**Exact fix** (block course per finding 8, top −89):
- `slab-edge-strip`: XPS-HFO 25, **R(231.25, −88.75, 256.25, −10)**, sitting on the block's back row over the poly. Expanded cork 25 is an option (P5).
- `edge-sealant`: flexible sealant on a backer rod, R(231.25, −10, 256.25, 0).
- `slab`: R(256.25, −100, 2500, 0).
- `eps-1` and `eps-2`: start at x 256.25.
- The slab is now isolated from the slot on its underside (EPS) and on its edge (strip).
- **Basis:** SOURCED: V1 Table 10.2.2.6 (via 12 §2); 12 R10 and R12; V2 9.25.3.6.(5). INFERRED: dimensions.

**7. (major) The soil-gas barrier to pan lap is 51 mm, not bonded, and its build order contradicts research.**
- **Parts:** `soilgas`, `pan`; new `pan-transition`.

**Problem:**
- The poly upturn and the pan back dam overlap only from −66 to −15, 51 mm against ≥ 100 (12 R9 and 11 T7, I).
- Nothing bonds them. Liquid PMMA or silicone does not adhere to polyethylene without a compatible transition.
- The pen test shows soil gas can travel from the EPS corner up between the poly and the block, wedge and pan faces to −15, then out at floor level. This is the only air path into the room at this edge.
- Research 12 §6.3 sequences the pan *before* the slab. But the back dam needs a substrate, which only exists once the slab edge (or strip) is cast. The model's layering (pan on the slot side, poly on the slab side) is in fact a slab-first sequence.

**Exact fix:**
- `soilgas` path: **[[2500, −100.125], [256.125, −100.125], [256.125, −88.875], [231.125, −88.875], [231.125, −10]]**.
  - The poly runs up the block's back face, over the block's back row under the strip (bedded in a bitumen-compatible mastic bead on the SIB facer), and up the strip's slot face.
  - Laps ≥ 300 sealed (9.25.3.6).
- `pan-transition`: PE-compatible butyl tape, 0.5 mm, path [[230.75, −10], [230.75, −63.8], [155, −68.3]]. It covers the poly upturn's slot face, then follows the wedge top 75 mm out (+0.25 mm offset), under the pan. Shift the pan back dam inward 0.5 mm, to a face at x 229.0–230.5.
  - Lap from the pan to the poly ≈ 54 vertical + 75 horizontal ≈ 129 mm ✓.
- **Sequence:**
  1. Footing, then stem (keyway).
  2. Membrane leg on the stem.
  3. `perim-drain`, rock and geotextile up to the footing top.
  4. SIB course in mortar.
  5. Interior stone, EPS and poly; place and brace the strip, and fold the poly up its face (taped to the top).
  6. Slab pour, finished after the bleed water clears (A-9.25.3.6).
  7. Wedge, 10–25 mm.
  8. Transition tape.
  9. Liquid pan: back dam, floor, then the exterior leg down to −320.
  10. `beam-xps` and the rest of the rock.
  11. Haunch and channel, with a bond-breaker sheet against the pan (see §2 ageing).
  12. Track on shims and beads; weeps; grout.
  13. Sealant.
- **Basis:** SOURCED: V2 9.25.3.6.(1)–(5), Note A-9.25.3.6 (via 12). INFERRED: the transition product and the reversed sequence. This should be fed back to research 12 §6.3.

**8. (major) The block-course product: PERINSUL HL is not North American stock, and the drawn bed cannot be built.**
- **Parts:** `perinsul`, `wedge`, `beam`, `eps-1`, `eps-2`; `materials.json`.

**Problem:**
- HL (λ 0.058, 2.75 MPa, 100 mm, widths 90–365) comes from the UK/EU data sheet (12 PER). The search found no Canadian distributor.
- The North American product is **FOAMGLAS PERINSUL SIB**, Owens Corning, Pub. 10025278-F, January 2023 (read this session):
  - ASTM C1902 Type V;
  - compressive strength ≥ **304 psi (2100 kPa)**;
  - **R-2.4/in (λ ≈ 0.060)**;
  - water absorption 0.09 % by volume;
  - units **2.25, 2.75 or 3.63 in thick × 3.63 in wide × 17.72 in long (57, 70 or 92 × 92 × 450 mm)**.
- Its limits:
  - "Not for use in load-bearing masonry walls";
  - "**Do not drill** or otherwise attempt to puncture";
  - horizontal only, even bearing, no point loads;
  - protect the exposed edges from freeze-thaw;
  - use beyond masonry veneer is "as determined by a licensed engineer or architect of record".
- The drawn wedge feathers from **0 mm** at the front edge to 15 mm. Mortar cannot be laid or held at 0 mm; the front edge will spall under the pan.
- `perinsul` is mapped to `graphite-eps`, so the metrics count 1.2 kgCO2e/m instead of about 9.5. The NA FOAMGLAS EPD gives 22.7 kg/m²·RSI (09 E-FG); 0.0254 m³/m at λ 0.0605 gives ≈ 375 kg/m³ (I).

**Exact fix:**
- `perinsul`: SIB "Economy" 92 thick, **3 rows × 92 = 276 wide**, **R(−20, −181, 256, −89)**, laid end to end in a full mortar bed. The name should state: "no fixings into the block; track anchors in the grout only".
  - If the door maker needs screw fixings, add a 20 mm Purenit fixing strip (11 T9) on top under the pan.
- `beam` stem widened to x −20 → 256. Footing toes per the engineer, or delete them (P2).
- `wedge`: **[[−20, −89], [231, −89], [231, −64], [−20, −79]]**, i.e. 10 mm at the front and 25 mm at the back, keeping 6 % (11 T4).
  - The pan top rises about 2 mm; the track zone is otherwise unchanged: shim and grout space 34 mm at x 0 and 23.5 mm at x 180, against the 25 mm of MAR.
- New material `cellular-glass`: density 170, k 0.0605, a1a3 ≈ 2.2 kg/kg (from 22.7/RSI, I), src "09 E-FG; SIB PDS 10025278-F".
- **Thermal effect:** vertical RSI under the slot is 1.52 (SIB 92) instead of 1.72 (HL 100). Confirm with THERM (finding 12).
- If HL can be special-ordered, it is equal.
- **Basis:** SOURCED: the SIB data sheet; 12 PER; 09 E-FG. INFERRED: geometry and the conversion.

**9. (major) Channel and haunch rest on frost-susceptible soil above the frost line; the haunch is 35 mm.**
- **Parts:** `haunch`, `channel`, `subgrade`, `beam-xps`, `liner`.

**Problem:**
- The haunch (−165 → −130) bears on a 16 mm soil sliver over the XPS top (−181) and on native subgrade.
- Frost penetrates 450 mm (V1 1.1.3.2), so the soil under the channel can heave, and it can settle, relative to the beam, which sits on its footing at −470.
- The threshold tolerates about **2 mm** of channel-edge movement before the 13 mm rule breaks (11 §3.3, I; B651 Table 1, S).
- 08b M7 asks for the channel to be "haunched ≈ 100 mm all round … cast against the foundation/slab-edge protection so it cannot settle relative to the door sill".
- Research 12 §6.2 flagged the XPS–channel clash.

**Exact fix:**
- `haunch` becomes an L in section: **[[−171.5, −130], [−21.5, −130], [−21.5, −165], [−96.5, −165], [−96.5, −230], [−171.5, −230]]**.
  - It is 100 thick outside the XPS and 35 thick over the XPS top.
  - It bears on the compacted `perim-rock` bench (finding 2), which is clean and drained, so not frost-susceptible (I), and on the XPS top at −165 (finding 5).
- Use a bond-breaker sheet between the haunch and the pan leg.
- The liner's house-side upturn stays on the channel and haunch outer face. Terminate it with a bar at −88, as now.
- **Basis:** SOURCED: 08b M7 and M.4(e); 11 §3.3; V1 1.1.3.2. INFERRED: the L section.

**10. (major, compliance ruling) VBBL 9.15.4.6, foundation ≥ 150 mm above finished ground, against a flush threshold.**
- **Parts:** `beam`, `perinsul`; drawing notes.

**Ruling:**
1. **Do not rely on the "constructed surface, not finished ground" reading** (08b M.7.3). BCAB decision #1114 (read this session; 1989, under the predecessor clause) states that "the top of the concrete is the top of the finished ground level". Paving counts as finished ground.
2. **Primary path: the foundation at the opening is a Part 4 engineered grade beam.** That is already required for the door line load (12 R2; 9.16.1.2). Research 01 records that 9.15.4.6.(1) binds Part 9 foundations within 9.15.1.1 and that "Engineered (Part 4) foundations are not bound by this sentence".
   - Put "Part 4, P.Eng. sealed" in the `beam` name.
   - Add a drawing note that the engineer adopts the intent: the supported elements within 150 mm of grade are non-moisture-sensitive.
     - SIB: 0.09 % water absorption; hydrostatic resistance 10.5 m.
     - The liquid-applied pan, the fibreglass track and the mineral grout.
     - No wood within 150 mm of grade (9.3.2.9).
   - The drained, lined landing, the channel, the pan and the perimeter drain carry the water.
3. **Fallback:** an alternative solution (Div. A 1.2.1.1.(1)(b)) using the same evidence plus B651 7.4.7 ("level threshold through patio doors").
4. **Jambs:** where the walls continue past the opening, 9.15.4.6 and 9.27.2.4 (cladding ≥ 200) still apply, so the grade must fall to ≤ FFL − 200 within the jamb returns (12 §6.4.5). See finding 11 for the footing consequence.

- **Basis:** SOURCED: BCAB #1114; 01 req.foundation-above-grade (VBBL 9.15.4.6.(1) and its scope note); 08b M.1; SIB data sheet. INFERRED: the acceptance path, which needs City confirmation.

### Minors

**11. (minor) Footing depth margin, clay soils, and the jamb ends.**
- **Part:** `beam`.
- **Problem:**
  - The underside at −470 is 462 below the grate (−8): only 12 mm of margin over 450 (V1 1.1.3.2).
  - On clay, 1.2 m applies unless engineered (07 E2, S). With a fully insulated slab the frost depth applies (A-4.2.4.4.(1), S).
  - Where grade drops to −200 at the jamb returns, −470 is only 270 below grade.
- **Fix:**
  - Footing underside −490 (a 40 mm margin).
  - Geotechnical report before the frost decision.
  - Step the beam ends down to **≤ −650** wherever the adjacent grade is −200.
  - On clay, use P3 (FPSF wings) rather than a 1.2 m stem.
- **Basis:** SOURCED rules; INFERRED values.

**12. (minor) Floor RSI basis, and no door-edge ψ.**
- **Parts:** `assemblies` in `detail02.mjs`; `metrics.md`.
- **Problem:**
  - 3.48 uses graphite λ 0.0307. The code table gives 3.00 (12 §1.2, conflict 12). Both pass.
  - The 251 mm slot band (RSI ≈ 1.5 + grout) and the edge ψ are not counted.
  - MAR warns of frost on the interior side of cold sills (S).
- **Fix:**
  - Report "3.00 (code λ) / 3.48 (manufacturer)".
  - Run THERM on the corrected edge (findings 5–8) at −7 °C (12 §8.4).
  - Count the grout as a cement-rich material, not 56-day low-carbon concrete.
- **Basis:** SOURCED: 12; INFERRED.

**13. (minor) Channel has no fall, and the outlet invert is undefined.**
- **Part:** `channel`.
- **Problem:**
  - The invert is −120 along all of w.
  - A flat 5.3 m channel holds silt and water against the door line: freeze in the grate, mosquitoes after 3–7 days (08b M.4(d), S\*).
- **Fix:**
  - Built-in-fall sections at 0.5 % (11 T16, I) to the outlet end, or a neutral channel with outlets at both ends.
  - Silt box with a removable bucket; outlet **invert −290** to suit finding 1.
- **Basis:** 11 T16 and T17; 08b M9 (S/I).

**14. (minor) The unlined terrace base has no outlet at the edge restraint.**
- **Parts:** `base-1`–`base-3`, `edge-restraint`.
- **Problem:**
  - The base falls 2 % outward onto a restraint that reaches 20 mm below it.
  - On tight till (< 13–15 mm/h) the base becomes a tub against the restraint, with frost lift at the path edge.
- **Fix:** follow 08b M14 and R3: an edge underdrain at x −3175, centre about −273, to the garden's riser, or 50 mm weep gaps through the restraint at 1.2 m centres into the bed. The choice depends on the infiltration test.
- **Basis:** SOURCED: 08b M14 (S thresholds); INFERRED.

**15. (minor) Separator geotextiles and subgrade preparation are not drawn.**
- **Parts:** `stone`, `interior-subgrade`, `liner`, `subgrade`.
- **Fix:**
  - Nonwoven separator on silt or clay under the stone (12 R1, I), so the radon and capillary layer stays clean.
  - Protection geotextiles above and below the HDPE are named but not modelled (08b M3 and M5, 407 g/m², S). Add them as 1 mm sheets, or state them in the liner name.
  - Subgrade under the liner: remove stones over 25 mm, compact to 95 %, fall 2 %.
- **Basis:** SOURCED: 08b; 12 R1 (I).

**16. (minor) Soil-gas and slab notes.**
- **Parts:** `soilgas`, `slab`, `stone`.
- **Fix:** add to the notes:
  - "0.25 mm poly, laps ≥ 300 sealed; all penetrations booted (radon riser boot); protect the upturn during the pour";
  - "finish the slab only after the bleed water has evaporated; moist cure; w/cm ≤ 0.50; saw-cut joints";
  - "radon test after occupancy, activate the fan > 200 Bq/m³".
- **Basis:** SOURCED: V2 9.25.3.6, 9.13.4.3, A-9.25.3.6 (via 12).

**17. (minor) The footing and stem are modelled as one pour, with no keyway or capillary-break note.**
- **Part:** `beam`.
- **Fix:**
  - Note "footing, then stem: keyway; water-stop or crystalline treatment at the cold joint".
  - No footing-top capillary break is needed: the SIB's bitumen facer is the capillary break above the beam (water absorption 0.09 %), and the slab never touches the beam.
- **Basis:** 07 E4 (S principle); SIB data sheet; INFERRED.

**18. (minor, cross-scope) The rain-garden subdrain is at the bottom of the rock.**
- **Part:** `rg-subdrain`.
- Agree with R3 F3: move it near the top of the reservoir with cleanouts. Relative to finding 1's levels: rock top = PONDB − 625 = −1175, so the subdrain centre ≈ −1260.
- **Basis:** SOURCED: 08 J3.

---

## Control-layer pen test (Lstiburek): as built, then after the fixes

| layer | path as built | break | path after the fixes |
|---|---|---|---|
| **Bulk water (surface)** | Landing at 2 % away; glass to the grate; channel to the outlet; the RWL tee | Channel is flat (13). The RWL tee is a backflow path into the landing (3). | Same, plus a channel fall and a separate underdrain outlet |
| **Bulk water (below grade)** | Liner to the trench underdrain. Beside the beam: soil, damp-proofing, no drain. | **No perimeter drain (2).** Bare block face −131 → −181. The pan drains onto the haunch joint (5). | Liner to the corner underdrain. Pan leg to the footing. Rock and `perim-drain` to the storm sump. |
| **Air / soil gas** | Poly under the slab, upturn to −15, touching the pan back dam over 51 mm | **No bond; 51 mm lap; open slit −15 → 0 (7, 6)** | Poly, then over the block under the strip, up the strip face, then butyl transition (129 mm lap), pan, sill beads, then sealant at FFL |
| **Vapour** | Poly under the slab; slab dries upward | — | Unchanged ✓ |
| **Capillary** | Stone; SIB/HL bitumen facers; poly | Feather-edge wedge (8) | Unchanged, with the wedge at 10 mm minimum |
| **Thermal** | EPS, then block (81 mm overlap), then beam XPS | **Slab touches the wedge and grout, a 251 mm mineral path out (6)** | EPS, block (81 overlap), slab-edge strip, sealant; XPS rises to −165 |
| **Structural / frost** | Track, grout, block, beam, footing −470. The channel is on soil. | Channel heave or settlement (9); jamb ends (11) | Channel on the haunch, rock bench and XPS; jamb steps |

## Moisture paths, quantified where possible

- **Groundwater and perched water** (October–March, tills): currently it stands against the beam and the cold joint, with nowhere to go. After fix 2 it is drawn down to −466. The sub-slab stone (−300 → −200) stays at least 166 mm above it.
- **Storm water from the glass** (≈ 22 L/h per metre in a storm, 08b M.4(a)) runs to the grate, the channel and the outlet. Sill water goes to the pan, which needs an outlet into the channel (5, R1).
- **Storm water on the landing** (≈ 74 L/h per metre) passes through the joints to the liner and then the underdrain. After fix 3 it goes to its own outlet; a garden backflow cannot reach it.
- **Freeze-thaw risks:**
  - standing water at the pan's front corner (5);
  - water in a flat channel (13);
  - exposed cellular-glass edges (SIB caution);
  - the soil under the haunch (9);
  - the shallow RWL in the bank (1).
  - Each is closed by the fix noted.

## Ageing (with the fixes)

| horizon | expected state | action |
|---|---|---|
| **5 yr** | Slab dry; sealant at the strip due (5-year proxy, 12/07); the channel silt box and grate clogged by grit; underdrain riser silting; ≈ 15 mm of sediment in the garden | Renew the sealant; clean the channel spring and fall; flush the underdrain and perim-drain from the cleanouts; radon re-test if the fan is off |
| **15 yr** | Perimeter-drain geotextile partly blinded (Lower Mainland fines, 07 E9); tree roots reach the garden. The RWL is safe at ≥ 2 m from the trunk and glued. The landing has settled 2–5 mm (pavers only; the channel edge is fixed by its rock bench and footing). | Camera both drains; re-level the first paver rows; regrout the grate fixings flush |
| **30 yr** | Door replacement. The block course, wedge and pan floor stay. The pan's exterior leg is behind the haunch; the bond-breaker (7, 9) lets the channel be lifted without tearing it. EPS and poly need no action (12). Garden medium skimmed (sediment ≈ 90 mm, at the freeboard). | Inspect the pan when the door is out; renew the back dam and transition tape; relay the landing |

---

## 3. Design proposals (separate from the findings)

**P1. Surface rill instead of the buried roof line.** This combines with fix 3 and matches R3 P2.
- **Route:**
  - At the opening end the channel turns 90° into a covered, flush, heel-safe trench across the terrace (invert −120 → −151 at x −3250, 1 %).
  - It then becomes an open, mortared stone runnel, 150 × 100, sealed within 5 m (08 J16), down a 3–5 % bed.
  - The downspout discharges into the rill head (a rain chain is possible).
- **Levels:** garden crest ≈ −250, mulch ≈ −400, house rim ≈ −150. The pipe-cover problem disappears.
- **Effects:**
  - **Look:** strong. Rainwater is seen arriving; the garden is a shallow hollow, not a pit.
  - **Moisture:** neutral, because it is sealed within 5 m.
  - **Carbon:** slightly lower (about 6 m of PVC and its trench replaced by stone; less garden excavation).
  - **Maintenance:** leaves and moss, cleaned twice a year (08 J16).
  - **Access:** the grate crossing must meet B651 4.3.4 and 8.2.4.

**P2. Less concrete: a rectangular grade beam.**
- The beam carries only the sill and the panels (jamb reactions go to jamb pads). A 276 × 309 beam (−181 → −490) without footing toes is 0.085 m³/m, against 0.102 now (−17 %, about −2 kgCO2e/m at 111 kg/m³). Removing the inner toe also simplifies the stone.
- Use a 56-day SCM mix for the beam; the slab follows its polishing schedule (12 §7.14).
- **Effects:** carbon −; thermal, moisture and look unchanged. Needs Part 4 sign-off (bearing ≈ 20 kPa, I).

**P3. Frost-protected shallow foundation, only if the geotechnical report finds clay.**
- XPS (or cellular-glass) wings, 50 × 600, under the landing's liner at ≈ −300, sloped 2 %, instead of a 1.2 m footing (12 e1; 09 P5: Part 4 plus geotechnical, S).
- **Effects:** saves ≈ 0.2 m³/m of concrete (≈ 22–40 kgCO2e/m) against the 1.2 m case, minus ≈ 7 kgCO2e/m for the XPS. Thermal +; look unchanged. Not worth it on non-clay soils.

**P4. Beam-face insulation: graphite EPS Type 3 instead of HFO XPS.**
- Possible once `perim-drain` exists, because the EPS is then drained, not submerged.
- 1.47 against 6.58 kgCO2e/m²·RSI (09) cuts that layer from 2.4 to ≈ 0.6 kgCO2e/m.
- Keep XPS only for the top strip from −230 to −165 that carries the haunch (finding 9).
- **Effects:** carbon −; thermal unchanged; moisture acceptable when drained (9.25.2.2.(3), I).

**P5. Expanded cork for the slab-edge strip.**
- Bio-based, rot-resistant, and a good sealant substrate. Cork's k is ≈ 0.040 (I), giving RSI 0.63 for 25 mm, against 0.88 for XPS.
- **Effects:** carbon −; thermal slightly lower (check in THERM); the look of the joint is unchanged.

**P6. A thinner lined landing.**
- The lined zone is drained, not storage, so the base could be 100 mm of No. 57 instead of 150.
- The liner and underdrain rise 50 mm; the drain cover in finding 2 rises to ≈ 120 mm; there is less aggregate and excavation by the beam.
- **Needs an ICPI check:** 08b M10 cites 150 (S) for pedestrian work with no subbase. INFERRED.

---

## 4. Top 3 changes that would raise this score most

1. **Re-derive the drainage level chain** (findings 1, 3, 4):
   - underdrain on the liner floor at x −1785 (invert −306), 1 % along w, on its own outlet;
   - roof and channel line outside the lined zone, invert −320 at x −3250, 1 %;
   - bed at 3 % to a house rim of −122;
   - garden crest −400, mulch −550, far rim −300;
   - the outlet daylights on the 3:1 inner slope at x −5494 (invert −342).
   - Alternatively, the P1 rill.
2. **Add the perimeter drain and rock bench** (findings 2, 9):
   - `perim-drain` ⌀100 at x −185, invert −466, in a geotextile-wrapped clear-stone envelope;
   - the channel on an L-shaped haunch over the rock bench and the XPS top at −165.
3. **Close the block-course control layers** (findings 5–8):
   - SIB 92 × 276 course on a 276 stem;
   - wedge 10 → 25 mm;
   - the pan's exterior leg continuous to the footing top (replacing `dampproof`);
   - a 25 mm slab-edge strip with the poly running under it and up its slot face;
   - butyl transition (≈ 129 mm lap) to the pan;
   - perimeter sealant;
   - and the reversed (slab-first) sequence.
