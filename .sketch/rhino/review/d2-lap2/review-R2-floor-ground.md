# Detail 02, lap 2: review R2 (floor, foundation and ground drainage)

**Reviewer:** R2. **Scope:**
- the grade beam and footing, the slab, insulation and soil-gas barrier, and the slab edge at the threshold;
- the frost and level chain;
- the perimeter drain, the landing liner and underdrain, and the terrace base;
- the rill, runnel and rain-garden levels and hydraulics, and the separation between drainage systems.

**Read:**
- `d2-lap1/review-R2-floor-ground.md` (my lap 1) and `d2-lap2/changes-v2.md`;
- `detail02-v2.mjs`, which is authoritative; `report.md` (parts table, contacts, notes); `metrics.md`;
- the T, F, M, I, J and S captures, the M and S axos, and the v1/v2 pairs in `d2-compare/`;
- research 07 (E2, E8–E10), 08 (J1–J16), 08b (M3–M21, failure table), 11 and 12 (R9–R12, §2, Table 10.2.2.6).

**Checked this session (web):**
- Armatherm 500 grade table, from the ARCAT specification and the BIMobject listing. These are third-party listings, not the maker's PDF, so S2.
- VBBL 9.14.3.3 sentences (1)–(4), from a search summary of the VBBL 2019 and 2014 text on bcpublications. The figures are unchanged across editions.
- Foamed-glass aggregate data, from search summaries only (S2):
  - Glavel: R-1.7 per compacted inch, 116 psi; its North American EPD was announced in February 2026, but the GWP value was not seen.
  - Hasopor EPD: 8 kgCO2e/m³ A1–A3 (fossil) at 180 kg/m³.

**Levels:** every level below was recomputed from the spec's own functions (PT, PBL, PBT, INV, BT, GS, W, PAN) with a scratch script. Nothing was read off the images.

**Datums:**
- x = 0 at the sliding frame's exterior face; **exterior is negative**.
- y = 0 at FFL. Millimetres throughout.

---

## Lap-1 findings status

Key: **fixed** · **partly** · **not fixed** · **worse**. "Residual → Nn" points to a new finding below.

| # | lap-1 finding (severity) | v2 claim | status | check against the spec |
|---|---|---|---|---|
| 1 | Rainwater line out of the bank (blocker) | done | **partly** | The pipe is gone, and so are the 22 % bank and the exposed crown. The bed falls 0.84 % (−107.3 → −122). Garden: crest −250, pond floor −450, house rim −122, far rim −150, spill −205. All of that is correct. **But the runnel's outfall is buried.** Its floor is −222 at x −5150, where the slope surface is −122, and it is only 28 mm above the crest (J11 needs 50). Residual → N1. |
| 2 | No perimeter drain (blocker) | done | **fixed** | `perim-drain` at (−185, −415): invert −466, crown −360. It sits in a geotextile-wrapped clear-stone envelope, x −120 → −400, y −470 → liner underside, with its own outlet. Cover under the liner is **92**, not 70 as the note says; 150 is required (9.14.3.3.(4)). It is noted as an alternative solution. Residual → N5 / P1. |
| 3 | Underdrain trench, tee, no fall (major) | done | **partly** | It now sits at the liner's low corner (x −1785, invert −286.9, crown −180.9) and the tee is gone ✓. But **the rod is level** (no `dy`), and the liner floor has no fall along w for it to sit on. Its outlet has no destination or invert. Residual → N4. |
| 4 | Rainwater line under the landing and through the liner (major) | done | **fixed / worse elsewhere** | The line is gone. **But the rill now passes through both liner upturns** (welded boots). The house-side boot sits directly over the foundation-drain envelope, which is the same bypass mode. Residual → N2. |
| 5 | Bare block face; pan drains onto the haunch joint (major) | done | **fixed** | The pan nose drops to −103 inside the channel. The skirt covers the board face down to −293 and laps **98** over the damp-proofing (−195 → −320). The block-face gap is gone. |
| 6 | Slab-edge strip and sealant missing (major) | done | **fixed** | Cork 25 (x 232.05–257.05, y −100 → −15) and sealant to FFL. The slab starts at x 257.3 and touches only the poly, the cork and the sealant ✓. Residual (compliance reading) → N7. |
| 7 | Soil-gas lap 51, unbonded, sequence (major) | done | **fixed, with residue** | The poly runs up the slot face (x 231.8–232.05) and is butyl-bonded to the stainless back leg. The bonded lap is **85**, not the "100+" claimed (−100.25 → −15). The sequence note lists the steps in an order that cannot be built. Residual → N6. |
| 8 | PERINSUL HL not North American stock (major) | done | **fixed** (other product) | Structural PU board 251 × 100. Armatherm 500 grades (S2): 500-150 is k ≈ 0.046 and 3.9 MPa; 500-200 is ≈ 0.056; 500-280 is ≈ 0.076 and 14.8 MPa. The model uses k 0.054 (≈ 500-200, RSI 1.85). If the engineer needs 500-280, RSI falls to **1.31**. Grade still to be fixed. |
| 9 | Channel and haunch on frost-susceptible soil (major) | done | **fixed** | The haunch (−193 → −130) bears on the EPS Type 3 top (x −97 → −22) and on a clear-stone column (x −171.5 → −97) that runs down to −470. The bearing is non-frost-susceptible and drained ✓. |
| 10 | 9.15.4.6 vs flush threshold (major) | note | **fixed** (note) | The `beam` is named Part 4 and its note adopts the ruling. The engineer's list of "non-moisture-sensitive within 150 of grade" must now name the **PU board and the cork** as well as the stainless, the fibreglass and the grout. |
| 11 | Footing margin, clay, jamb ends (minor) | partial | **partly** | The note says "450+". The footing underside −470 is 464 below the grate (−6): **14 mm of margin**, inside excavation tolerance. Jambs are massing only. Residual → N5. |
| 12 | Floor RSI basis, no door ψ (minor) | open | **not fixed** | Still 3.48 (manufacturer λ) only. No THERM. |
| 13 | Channel flat, outlet undefined (minor) | partial | **partly** | The outlet is now located (the rill takes off from the channel side at w 1590–1760). The channel is still flat at −120, and the rill invert equals the channel invert. **The "silt box" in the note has nowhere to go** (N2), and there is still only one outlet (N3). |
| 14 | Terrace base has no outlet (minor) | open | **not fixed** | The base is closed on all sides: liner cut-off (to −144), pocket curb plus root barrier (−301 → −921), restraint (−357) plus root barrier (−184 → −784). On till it is a tub. Carried. |
| 15 | Separators, subgrade prep (minor) | open | **partly** | The liner geotextiles are named in the `liner` name. There is no separator under the sub-slab stone, and no subgrade-prep note. Carried. |
| 16 | Soil-gas and slab notes (minor) | done | **partly** | Only the radon rough-in note was added. Still missing: poly laps ≥ 300, booted penetrations, finishing after the bleed water, w/cm ≤ 0.50, moist cure, the post-occupancy radon test. Carried. |
| 17 | Footing/stem one pour, keyway (minor) | open | **not fixed** | Solved outright by P1 (a single rectangular pour). Folded into N5. |
| 18 | Rain-garden subdrain at the rock bottom (minor) | done | **fixed** | Subdrain top −1080 against rock top −1075 ✓. |
| P1 | Surface rill | done | adopted | With defects N1 and N2. |
| P2 | Rectangular beam | partial | not adopted | Re-proposed as P1 below, now with three more reasons. |
| P4 | Graphite EPS on the beam face | done | adopted ✓ | — |
| P5 | Cork edge strip | done | adopted ✓ | Compliance reading in N7. |
| P6 | Thinner lined base | partial | not adopted | Correctly so: it would cut the drain cover further. Withdrawn. |

**Challenges to `changes-v2.md`:**
- R2-1 is "done" only for the pipe. The runnel it introduced fails J11 and does not daylight.
- R2-3: "falls 1 %" is in a note; the geometry is level and cannot fall on a level liner floor.
- R2-13: "through a silt box into the rill" is not in the model and cannot be at the rill head (N2).
- R1-F3: "Slab-first sequence is noted". The spec note actually describes a pan-first order, which is the only order the drawn geometry allows (N6).
- R2-2: the cover is 92, not "about 70".

---

## 1. Score: **7 / 10** (lap 1: 5) for floor, foundation and ground-drainage performance and buildability

**What is now right:**
- **Control layers at the slab edge close.**
  - Poly → bonded lap → stainless back leg → EPDM sill foil → track.
  - EPS (100) meets the PU board with **93 mm** of vertical overlap (−193 → −100.25); the cork isolates the slab edge.
  - Skirt → damp-proofing (98 lap) → drained graphite EPS → perimeter drain.
- **The foundation is drained.** The haunch now stands on a drained stone column to footing level.
- **The rain garden is correctly proportioned:**
  - 200 ponding;
  - house freeboard 128, far freeboard 100;
  - far rim lower than the house rim; spill notch at −205;
  - bottom 800 wide; subdrain near the top of the rock.
- **No buried roof pipe, no 22 % bank.** The bed is near-level.

**What holds it back.** None of these is a blocker; each is a level or hydraulic defect that a section drawing exposes:
1. **The roof-water path ends in a buried outfall.**
   - At x −5150 the runnel floor (−222) is 100 mm below the slope surface and the apron, and only 28 mm above the crest.
   - It sits at 0.84 % (14.7 mm of fall in total) on 375–850 mm of planting medium that will settle more than that.
   - Result: a standing-water runnel, and overflow into the bed at 3.4 m from the house, which is inside the 5 m infiltration setback.
2. **The rill puts two boots in the landing liner.**
   - The house-side boot sits directly over the foundation-drain envelope.
   - The claimed silt box cannot exist where it is claimed.
3. **The channel's only overflow (the grate at −6) is 9 mm above the pan back-leg top (−15).** A blocked single outlet floods the slab edge.
4. **Three of the six drainage systems have no defined outlet level or destination:** the underdrain, the perimeter-drain sump and the terrace base. The underdrain's 1 % fall exists only in a note.

With N1–N4 applied, plus P1 (the deeper rectangular beam), I would expect a score of **8.5**.

---

## 2. Findings

**Severity counts (open now, new plus carried): 0 blocker · 4 major · 11 minor.**

### Majors

**N1. (major) The runnel outfall is buried and too low, and the runnel sits on settling planting soil.**
- **Parts:** `runnel-floor`, `runnel-walls`, `rg-apron`, `bed-soil`, `rg-medium`.

**Problem (all INFERRED from the spec functions):**

| x | element | level |
|---|---|---|
| −3400 | rill floor (end of the covered rill) | −152.3 |
| −3400 | runnel floor (BT − 100) | −207.3 (a 55 mm cascade) |
| −5150 | runnel floor | **−222.0** |
| −5150 | runnel wall top = bed = house rim = apron top | −122.0 |
| −5150 → −5750 | apron top on the 3:1 slope; apron bottom at the rim | −122 → −322; bottom −202 |
| — | crest (riser top) | −250 |
| — | spill notch | −205 |

What these levels mean:
- **The runnel discharges into a 100 mm face:** 80 mm of cobble apron over 20 mm of medium. The floor would have to rise to −122 to spill freely.
  - Between storms, water drains only by seepage through the cobbles and medium. Water stands along the runnel's last metre.
  - In storms, the runnel brims to its head wall (−107.3) and **overflows into the bed mulch at x −3400**, 3.4 m from the house.
- **J11 is failed.** The outlet must be ≥ 50 mm above the crest (08 J11, S); here it is 28. At spill level (−205) the pond backs up the **entire** runnel length (its floor is below −205 from x −3400 outward).
- **The fall is 0.84 %, or 14.7 mm over 1750.** The runnel floor bottom (BT − 150) sits on 375 mm of bed medium, and on 850 mm across the tree-pit zone, which in the 2-D extrusion runs the full width of the slice. Imported organic medium settles a few percent of its depth (INFERRED). That is 15–40 mm, more than the whole fall, so reverse grades are certain.
- **It is not "sealed within 5 m".** The VBBL ≥ 5 m rule for any infiltration system (07 E10, S) and 08 J16 (I) both say it must be. Mortared stone cracks with frost and settlement, and the runnel lies at 3.4–5.15 m.

**Exact fix:**
- **Runnel floor:** continuous with the rill floor, `RF(x) = −152.3 − 0.02·(−3400 − x)`: −152.3 at x −3400 → **−187.3 at x −5150**, a 2 % fall.
  - Inner depth 45 → 65 under the mulch line.
  - Capacity ≈ 6.9 L/s at 45 deep, n 0.015, against ≈ 1.5 L/s for the 08 J15 design storm (106 m² × 13 mm per 15 min). INFERRED.
- **Extend the runnel 209 mm into the house-side slope** as a stone chute whose walls follow GS(x).
  - It ends in a **stone lip at x −5359, y −191.5**, flush with the slope. That is **58.5 above the crest** (J11 ✓) and 13.5 above the spill level, so it is never backwatered.
- **`rg-apron`:** starts at the lip, R-poly from (−5359, −191.5) down the slope to (−5959, −391.7), 80 thick.
- **Construction:**
  - A stone-faced precast concrete U-trough: walls 50, floor 60, reinforced, in 1.2–1.8 m units with gasketed joints. "Sealed" this way is real.
  - It bears on a **300-wide compacted 19 mm crushed-rock strip** from the trough underside down to the bed subgrade (BT − 525, ≈ −632 → −647).
  - Make the tree pit a pit in plan, **w 400–1400**, not a full-width trench, so the runnel never crosses it.
  - Add a ribbed HDPE root barrier at w 1500, from −200 to −650, between the pit and the strip (R3 to confirm).
- **Delete** the 55 mm cascade; one continuous invert is easier to keep clean.
- **Basis:**
  - SOURCED: 08 J11 (≥ 50 above the crest), J8 (200 ponding, ≈ 100 freeboard), J16 (sealed inside 5 m, I); 07 E10 (infiltration ≥ 5 m, S).
  - INFERRED: levels, capacity, settlement.

**N2. (major) The rill pierces the landing liner twice, and the claimed silt box cannot sit at the rill head.**
- **Parts:** `liner`, `rill-walls`, `rill-floor`, `channel`, `perim-rock`, `perim-drain`; note on `channel`.

**Problem:**
- **House side.** The rill leaves the channel's outer wall at x −171.5 with its floor at −120/−140, and passes through the liner upturn (x −173.5 → −171.5, rising to −66).
  - The boot, an extrusion weld clamped to polymer concrete, is the only seal between the roof-plus-channel flow and the house side of the upturn.
  - **The house side of that upturn is the perimeter-drain envelope**: rock from −268 down to −470, beside the footing.
  - This is the bypass that 08b's failure table names ("channel or underdrain connected to the foundation drain", S), now built in as a field weld.
- **Cut-off side.** At x −1850 the rill floor bottom (−156.8) is **12.9 mm below** the upturn top (−143.9), so a second boot is needed for a 13 mm notch.
- **Silt box.** A silt box needs a sump below the outlet, typically 300–500 deep. At the rill head that sump would go through the liner floor (−266) and into the drain rock, beside the perimeter drain (crown −360) and over the footing toe.
  - 08b M9 (S, GG47) puts the silt box "beside the opening, not in the wheelchair landing".
  - The rain chain also lands on the rill grate at x ≈ −696, inside the landing. Splash on the walking surface and the glass is cross-scope for R3 (08 J16, B651 8.2.4, S).

**Exact fix: preferred (B) — move the rill and rain chain beyond the end of the opening.**
- **Channel:** end outlet at the channel's end (opening end + 150), invert −120. The liner's w-end upturn wraps the channel end, so **the liner is never pierced**.
- **Pipe:** solid ⌀100 PVC, solvent-welded, **no joints from x −120 to −700** (08 J12, S), 2 % fall, with a trench dam at x −450 just outside the drain envelope.
- **Rain-chain basin and silt sump** under the gutter outlet at **x −550 → −850**, beside the opening, in the jamb zone:
  - a stone bowl with a removable bucket;
  - sump bottom −350, inlet −130, **outlet −145**;
  - overflow rim −40, spilling onto ground that falls away from the wall (08 J13, S).
- **Covered rill** at 1 % across the terrace: −145 at x −845 → **−170.6 at x −3400**.
- **Runnel** at 2 % → −205.6 at the rim, lip at **x −5417, y −210.9**.
- To keep J11 with this extra 25 mm of loss, **lower the garden by 25**:
  - crest −275; pond floor −475; far rim −175; spill −230;
  - IN0 −6209; the far toe moves to x −7909.
  - Check: lip −210.9 is 64 above the crest ✓ and 19 above the spill ✓; house freeboard 153 ✓; far rim below house rim ✓.

**Minimum fix (A) — if the rill stays at w 1590–1760:**
- At the cut-off, lower the upturn top locally (w 1540–1810) to **−170**, so the rill passes over it with 13 mm of clearance and no boot.
- At the house side, use a **factory channel side-outlet unit with an integral membrane flange**. Weld or clamp the liner upturn to it, so there is no field boot on the bare wall.
- Make the rill **one jointless unit from x −171.5 to −871** (no joints over the drain envelope, x −120 → −400).
- Put the silt trap at the rill's downstream end: a 150 deep sump with a basket at **x −3250 → −3400** in the restraint zone, outside every lined and drained zone. Rill floor −150.8 → sump bottom −300.
- **Basis:** SOURCED: 08b M9 and the failure table; 08 J12 and J13. INFERRED: levels and routing.

**N3. (major) Overflow hierarchy at the door: the channel's only overflow (−6) is above the interior water-barrier top (−15), and there is one outlet.**
- **Parts:** `channel`, `grate`, `pan`, `pan-back`, `grout`, `edge-seal`, `slot-edge`, `track-weeps` (shared with R1).

**Problem:**
- The landing falls away from the channel (PT = −6 at the lip), so a blocked channel brims at the grate top: **≈ −6 + 3 mm** of weir head.
- Before that, at −82 (pan top at x −20), water floods the open space between the pan nose and the track (x −38 → 0, below the nosing) and enters the **pan–grout interface**. Grout does not bond to stainless.
- The pan floor rises at 6 % to −66.9 at the back leg. The **back leg ends at −15**.
- Above that, the only barriers are the stone sill apron, the EDPM foil lap and the sealant over the cork and the slab edge.
- So a channel surcharge between −15 and −3 puts **up to 12 mm of head over the back leg** onto the cork and the slab edge.
- The track chamber also back-floods through the weeps once the water passes −51.
- Single points of blockage: the channel's one outlet, the covered rill, and (as built) the backwatered runnel (N1). Ice can block any of them in a cold snap.
- 08b §M.4 already states that "the channel must never back up" (I); the design has to make that true by geometry, not by maintenance.

**Exact fix:**
1. **Overflow notch.** At the channel's outlet end, beyond the door leaf and outside the clear opening, lower the channel's outer lip and the adjacent pavers to **−20** over 600 mm along w, dished at ≤ 2.5 %.
   - The crest is now below the back leg, and the overflow lands on the lined landing → liner → underdrain.
2. **Built-in fall** (lap-1 finding 13): invert −95 at the far end → −120 at the outlet (0.5 % over 5.1 m). Shallow end depth 69.
3. **Second outlet (optional, best).** A neutral channel falling both ways from mid-length, with the second end on its own solid pipe to the storm sump (never to the perimeter drain).
4. **R1:** raise the back leg's top to **−5** under a 5 mm sealant joint, giving 15 mm of margin over the notch crest.

- **Basis:** SOURCED: 08b M7, M9 and §M.4; 9.14.6.1 (water must not accumulate at the building, via 08b). INFERRED: levels and the interface path.

**N4. (major) The drainage systems are separated in intent, but three outlets have no level or destination; the underdrain's fall is not built.**
- **Parts:** `underdrain`, `liner`, `perim-drain`, `rg-riser`, `rg-subdrain`; base parts (lap-1 finding 14).

**Problem (outlet schedule as v2 stands):**

| system | inlet / invert at this section | fall | outlet destination | backflow guard | status |
|---|---|---|---|---|---|
| Roof + channel → rill → runnel → rain garden | −120 → −152.3 → −222 | 1 % / 0.84 % | Garden (surface) | Freeboard | N1 |
| Landing underdrain | −286.9 (level rod) | **0** (note says 1 %) | "own outlet" (undefined) | "flap" (undefined) | ✗ |
| Perimeter drain | −466 (level rod) | 0 | "storm sump" (not located) | — | ✗ |
| Rain-garden subdrain → riser → storm | subdrain invert −1235; **riser bottom −1160** | — | "tank and storm" | Flap at the tank | Riser base is 75 above the subdrain invert ✗ |
| Terrace base | −314 → −337 | 1:60 | Infiltration only | — | Open (lap-1 14) |
| Sub-slab stone | −300 → −200 | — | Radon only, never drained ✓ | — | ✓ |

- The underdrain lies 2 mm above a liner floor that is **level along w**. A 1 % fall over the 5.1 m run needs 51 mm of fall. If the pipe alone took it, its upstream crown would reach −130, inside the bedding.

**Exact fix:**
- **Liner swale.**
  - Between x −1550 and −1850, the liner floor (and subgrade) gains an extra 0 → **51 mm** of depth along w, falling 1 % toward the outlet end. The rest of the tray is unchanged, so the drain cover near the house is unaffected.
  - Underdrain invert **−286.9 → −337.9**; in the slice, `dy: −18`.
  - Upstream cleanout riser capped flush ✓.
- **Underdrain outlet:**
  - one welded HDPE boot through the liner's w-end upturn at invert −338;
  - then solid ⌀100 PVC at ≥ 1 % to the **storm sump** on its **own inlet with a backwater valve** (Book II 2.4.5.3 via 08b, S).
  - **Never** into the rill, the runnel or below the pond level. Below the pond it would back-flood the lined base: pond at −205 against a liner floor of −266/−294.
- **Perimeter drain:**
  - level is acceptable (07 E8 sets no fall), or 0.5 % toward the sump;
  - cleanouts at the corners;
  - **storm sump** ≥ 750 deep and ≥ 0.25 m², with a secured airtight cover (9.14.5, via 07 E10, S);
  - separate inlets for the perimeter drain and the underdrain (BBY two-pipe practice, 07 E10); outlet to the storm lateral with a backwater valve (INFERRED: clause not read).
- **Rain-garden riser:**
  - extend it to **−1300** with a sealed base;
  - subdrain enters at −1235;
  - outlet to the tank/storm at invert **≤ −1260**;
  - solid riser wall below the medium, so it does not drain the rock storage below the subdrain.
- **Show the outlet schedule as a table on the drawing.**
- **Basis:** SOURCED: 08b M6, M21 and line 81 (Book II 2.4.2.4, 2.4.5.3); 07 E8 and E10; 08 J3 and J9. INFERRED: levels.

### Minors (new)

**N5. Footing depth margin (14 mm), drain cover (92) and the cold joint: solved together by a deeper rectangular beam.**
- **Parts:** `beam`, `perim-drain`, `perim-rock`, `perim-geotextile`.
- **Problem:**
  - −470 is 464 below the grate, so frost margin is 14 mm (07 E2: 450 minimum, S).
  - Because the beam is insulated, 9.12.2.2.(2) puts it in the "no heated space" column: silt → frost depth; clay → **1.2 m** (07 E2, S).
  - Drain cover is 92 against 150.
  - The footing and stem are two pours (lap-1 finding 17).
- **Fix: P1.** Beam R(−20, −530, 231, −193), rectangular, with no toes.
  - Drain at (−185, −475): invert −526, crown −420, cover **152** (acceptable solution, so the alternative solution is gone).
  - Frost margin **74**; one pour, so there is no keyway.
  - Rock and geotextile down to −530.
  - Compact over the pipe with a light plate or hand tamping within 300 mm of the crown; SDR 35 perforated PVC (INFERRED).
  - Geotechnical report before the frost decision. On clay, the engineer uses 4.2.4.4 or P4's skirt rather than a 1.2 m stem.

**N6. The sequence note cannot be followed as written, and the lap is 85, not 100+.**
- **Parts:** notes on `soilgas` and `pan-back`.
- The drawn back leg runs down to −110, i.e. **17 mm into a 0.8 mm space** between the board's back face (x 231) and the poly (x 231.8). It can only be placed **before** the poly, cork and slab.
- The note says "pan set, slab poured, poly … taped". The poly must be taped **before** the pour, because it sits between the cork and the back leg.
- **Replacement note:**
  1. board, then wedge, then skirt;
  2. welded pan with back leg (−110 → −15), braced;
  3. poly flap (left 200 long when the sub-slab poly is laid) lifted and bonded to the back leg's interior face with butyl tape over the full **85 mm** (−100 → −15);
  4. cork strip;
  5. slab pour;
  6. grout and track; anchors per N8.
- Change "100+" to "85, fully bonded". This is a reversal of my lap-1 slab-first order: the welded stainless leg makes pan-first both possible and necessary. R1 and research 12 §6.3 should follow.

**N7. Edge RSI reading of VBBL Table 10.2.2.6.**
- **Parts:** `slot-edge`, `metrics.md`.
- The table gives one value, **2.45**, for "insulation under all slab area and around edge of slab" (12 §2, S). Cork 25 gives 0.63; the slot fixes the thickness at 25.
- **Fix:** take the performance path (THERM ψ, lap-1 finding 12) and ask the City for its reading.
  - If 2.45 is required at the edge, no 25 mm bio-based product reaches it.
  - A 2 × 10 mm aerogel blanket (λ ≈ 0.015, RSI ≈ 1.3; INFERRED) is the strongest buildable option and is small in mass.
  - Keep cork if the City accepts the ψ route.

**N8. (cross-scope R1) Track anchors puncture the welded pan.**
- **Parts:** `track` note, `pan`.
- "Anchored through the drillable PU board" means through the grout, **the pan floor**, the skirt and the wedge, with no seal stated.
- **Fix:** bonded EPDM sealing washers plus sealant at each anchor, or studs welded to the pan floor. State this in the `pan` note.

**N9. The 1 m tree pit is an undrained sump in till, inside 5 m.**
- **Parts:** `bed-soil`.
- The pit bottom is −1112 to −1120, 3.9–4.9 m from the house. Its only water exit is the native till, and the bed takes runnel overflow while N1 is open.
- **Fix:**
  - make it a pit in plan (w 400–1400);
  - lay a ⌀100 perforated lateral in clear stone at invert −1120, falling 1 % to the rain-garden rock (enters at −1122.5, between rock top −1075 and bottom −1375);
  - the rock's normal water level is capped by the subdrain invert (−1235), 113 below, so the pit drains toward the ≥ 5 m zone.
- Or reduce the pit to 750 deep (R3).

**N10. Liner terminations and w-ends are not detailed.**
- **Parts:** `liner`, `channel`.
- The house-side upturn ends at −66 against polymer concrete with no termination stated. The liner, channel, haunch and beam ends at the jambs (the 3-D tray corners and the channel end) are not modelled.
- **Fix:** a stainless termination bar plus sealant at −70, or a channel with an integral membrane flange (ties into N2-A). Add one w-end detail before lap 3.

**N11. Rain-garden groundwater separation is unverified.**
- **Parts:** `rg-rock`, notes.
- The rock base is at −1375. J1 needs 0.5 m (S, BCGB02) to 1 m (S, STEP) above the seasonal high water, so the water must be below −1875 to −2375.
- Vancouver tills perch water in winter (07, I).
- **Fix:** note "February test pit; if perched water is above −1875, raise the garden or convert it to a lined flow-through planter (08 J1a)".

### Minors (carried from lap 1)

- **12.** RSI basis "3.00 (code λ) / 3.48 (maker)" plus a THERM ψ at −7 °C. Needed now for N7 as well.
- **14.** Terrace base outlet: an infiltration test (08b M14: < 13–15 mm/h means underdrain).
  - If it is needed: an edge subdrain at x −3200, invert −335, to the **storm sump** (same class as the underdrain, own inlet).
  - Not to the garden below the pond level, and not through the root barrier.
- **15.** Nonwoven separator under the sub-slab stone. Subgrade note: remove stones over 25, compact to 95 %, fall 2 %.
- **16.** Slab and soil-gas notes, as listed in lap 1.

---

## Control-layer pen test (slab → threshold → landing)

| layer | v2 as built | break | after N1–N8 |
|---|---|---|---|
| **Bulk water, surface** | Glass → sash → track weeps (2 %) → channel −120 (flat) → side outlet → rill 1 % → 55 cascade → runnel 0.84 % → **buried outfall** → garden −250 crest → riser → storm. Landing at 1:60 away; joints → liner. | Runnel outfall (N1). Flat channel. One outlet (N3). | Channel 0.5 % → end outlet → solid pipe → silt basin → rill → runnel 2 % → lip −210.9 (−191.5 in A) → garden. Notch overflow to the landing. |
| **Overflow / backwater** | Channel brims at −6; back leg top −15; the pan–grout interface is open at x −38 → 0. | **12 mm head over the back leg** (N3). Pond spill (−205) backwaters the whole runnel. | Notch crest −20 < back leg −5. Lip 13–19 above spill. |
| **Bulk water, below grade** | Skirt over the board, 98 lap → water-based damp-proofing on the stem → graphite EPS → rock → perimeter drain −466 (level). Liner tray → underdrain −287 (level). | Rill boot over the drain envelope (N2). Underdrain fall and outlet (N4). Drain cover 92 (N5). | No liner penetrations (B). Swale 1 % to −338 → own inlet at the sump. Drain at −526, cover 152. |
| **Air / soil gas** | Poly under slab and cork → up the slot face → butyl 85 → stainless back leg → welded pan → EPDM foil 24.5 lap → track. Sealant over the cork. | Bond line can only be made pan-first (N6). Anchors through the pan (N8; water rather than air). | Unchanged geometry; note corrected; anchors sealed. ✓ |
| **Vapour** | Poly under slab; slab dries upward. Mortar wedge sealed between the skirt and the board. | The wedge's construction water is trapped in a cold zone (I). | Use a polymer-modified, low-w/c bed mortar (R1). ✓ |
| **Capillary** | Clear stone; PU board (closed-cell); cork on the dry side of the poly; skirt. | — | ✓ |
| **Thermal** | Slab EPS 100 meets the board (93 overlap); board RSI 1.85 (k 0.054); cork 0.63 at the edge; graphite EPS 75 on the stem. | Board grade open (RSI 1.31–2.17). Edge RSI reading (N7). No ψ (12). | Grade fixed by the engineer; ψ from THERM; edge product per the City reading. |
| **Structural / frost** | Footing −470 (14 margin). Haunch on EPS Type 3 plus a stone column to −470. Runnel on medium. | Frost margin (N5). Runnel settlement (N1). | Beam to −530 (74 margin). Runnel on a crushed strip. |

## Level and drainage chain (real numbers, v2 → fixed)

| element | x | v2 level | fixed level | rule |
|---|---|---|---|---|
| FFL / track top | 0 → 180 | 0 / +5 | = | — |
| Back-leg top | 231 | −15 | **−5** (R1) | above the notch |
| Grate top / paving at the channel | −171.5 | −6 | = | B651 rise ✓ |
| Channel invert | along w | −120 flat | −95 → −120 (0.5 %) | 11 T16 (I) |
| Channel overflow crest | outlet end | −6 (grate) | **−20 notch** | N3 |
| Liner floor (house side) | −173.5 | −266.0 | = | — |
| Perimeter-drain crown / invert | −185 | −360 / −466 | **−420 / −526** | cover 152 (9.14.3.3.(4)) |
| Footing underside | — | −470 | **−530** | 450 + 74 (07 E2) |
| Underdrain invert | −1785 | −286.9 level | **−286.9 → −337.9** | 1 % (08b M6) |
| Liner cut-off top | −1850 | −143.9 | −143.9 (−170 at the rill, option A) | — |
| Paving at the cut-off / path end | −1850 / −3250 | −34.0 / −57.3 | = | 1:60 |
| Rill floor | −171.5 → −3400 | −120 → −152.3 | (B) −145 → −170.6 | ≥ 1 % (J16) |
| Runnel floor | −3400 → −5150 | −207.3 → **−222.0** | (A) −152.3 → −187.3 · (B) −170.6 → −205.6 | 2 % |
| Runnel lip | — | buried (slope −122 at −5150) | (A) **−191.5 at −5359** · (B) −210.9 at −5417 | J11 ≥ crest + 50 |
| House rim / bed end | −5150 | −122 | = | J8 |
| Spill notch / crest / pond floor | — | −205 / −250 / −450 | (A) = · (B) −230 / −275 / −475 | J8, J9 |
| Far rim | −7784 → | −150 | (A) = · (B) −175 | lower than the house rim ✓ |
| Medium / choker / rock | — | −525 → −975 / −1075 / −1375 | (B) −25 | J4, J5 |
| Subdrain invert / riser base / outlet | −6534 | −1235 / −1160 / ? | −1235 / **−1300** / **≤ −1260** | J3, J9 |
| Tree-pit bottom / lateral | −3900 → −4900 | −1112 → −1120, no outlet | lateral −1120 → −1122.5 into the rock | N9 |

## Moisture paths (quantified where possible)

- **Roof water** (≈ 1.5 L/s design, 08 J15 basis; applicability INFERRED):
  - v2 runnel capacity ≈ 13 L/s, but it is backwatered.
  - Fixed runnel ≈ 6.9 L/s at 45 deep, free outfall.
  - Rill ≈ 13 L/s at 75 deep and 1 %. Ample.
- **Glass and sill water** go to the channel. With N3's notch, a blocked channel overflows at −20 onto the lined landing, never over the back leg.
- **Landing infiltration** (≈ 74 L/h per metre in a storm, 08b) goes to the liner, the swale and the underdrain, which has its own sump inlet. The pond can no longer reach it.
- **Perched groundwater** (October–March) is drawn down to −526 at the beam. The sub-slab stone (−300 → −200) stays 226 above it, and the FGG of P4 would stay dry above it.
- **Freeze–thaw:**
  - standing water in the runnel (N1, fixed by the 2 % fall and free lip);
  - the trapped damp wedge (polymer mortar);
  - the channel floor (0.5 % fall);
  - the stone column under the haunch is clean and drained ✓.

## Code, bearing, buildability and sequence check

| item | requirement | v2 | action |
|---|---|---|---|
| 9.12.2.2 / 4.2.4.4 frost | 450 (Vancouver); insulated foundation → "no heated space" column; clay 1.2 m (07 E2, S) | 464 below grade, 14 margin | N5 / P1: −530; geotechnical report |
| 9.13.2 damp-proofing | Only where 9.14 drainage is provided | Water-based on the stem, with drain ✓ | — |
| 9.13.4.2–.3 soil gas and rough-in | Sealed barrier; ≥ 100 granular; capped pipe | Poly bonded 85 ✓; stone 100 ✓; rough-in note ✓ | Lap and penetration notes (16) |
| 9.14.2.1 foundation drainage | Required | ✓ | — |
| 9.14.3.3.(1) / (4) | Pipe top below the slab ✓ / 150 over top and sides | −360 ✓ / **92** | P1 gives 152 |
| 9.14.5 disposal and sump | To sewer, ditch or dry well; sump ≥ 750 deep, 0.25 m², secured cover (07 E10, S) | Not located | N4 |
| 9.14.6.1–.2 surface | No accumulation at the building; downspout water away | Channel relies on a single outlet | N3 |
| 9.15.4.6 → Part 4 | Engineer's ruling | Note ✓ | Name the PU and cork in the letter |
| 9.25.3.6.(5) | Perimeter sealant | ✓ | — |
| Table 10.2.2.6 | RSI 2.45 under the slab and around its edge | Under: 3.00 / 3.48 ✓; edge 0.63 | N7 |
| Book II 2.4.2.4 / 2.4.5.3 | Site drainage to storm with overflow; subsoil drains to a sump on storm, never sanitary | Garden riser ✓; underdrain and perimeter-drain destinations undefined | N4 |
| 07 E10 / 08 J1 | Infiltration ≥ 5 m; groundwater separation 0.5–1 m | Garden ✓ at 5.15 m. Runnel overflow and tree pit at 3.4–4.9 m ✗. Groundwater unverified. | N1, N9, N11 |
| 08 J11 | Inlet ≥ crest + 50 | +28, and buried | N1 |
| 08b M6 / M9 | Underdrain ≥ 1 %; silt box beside the opening | Level; no silt box | N4, N2 |

**Bearing:**
- Beam line load (sill plus panels plus self-weight) ≈ 3 kN/m on 251 gives ≈ 13 kPa even without toes (INFERRED; the engineer confirms).
- The haunch puts ≈ 10–35 kPa on EPS Type 3 and compacted stone, within the long-term creep range of Type 3 (INFERRED).

**Buildable sequence (fixed scheme):**
1. Footing-and-stem beam (one pour, P1).
2. Damp-proofing.
3. Perimeter drain, rock and geotextile up to −320.
4. Graphite EPS on the stem.
5. Rock in lifts to −193.
6. Interior subgrade, separator, stone and EPS; poly with its flap left long.
7. PU board and wedge, then the skirt down to −293.
8. Welded pan.
9. Poly bonded to the back leg.
10. Cork, then the slab pour.
11. Haunch, then the channel (with the end outlet and notch). Liner tray, swale and underdrain, with the boot at the w-end.
12. Base, bedding, pavers.
13. Grout, track (anchors sealed), sealant.
14. Silt basin, rill, runnel strip and trough.
15. Garden excavation; rock, choker, medium; riser.

## Ageing (with the fixes)

| horizon | expected state | action |
|---|---|---|
| **5 yr** | Silt basin and channel grate collect grit and leaves; the runnel holds moss but drains. The cork's sealant is due. Garden sediment ≈ 15 mm. | Empty the basin and clear the grate in spring and fall (08b). Renew the sealant. Flush the underdrain and perimeter drain from the cleanouts. |
| **15 yr** | Drain-envelope geotextile partly blinded. Tree roots meet the runnel strip's barrier. Landing pavers settled 2–5 mm, while the channel is fixed on its stone column. | Camera both drains. Re-level the first paver rows. Check that the runnel trough joints are still tight. |
| **30 yr** | Door replacement: the pan, back leg and bonded poly can be inspected from above once the track is out. Garden sediment ≈ 90 mm, still inside the 128/153 freeboard. EPS and FGG need no action. | Renew the back-leg tape and sealant. Skim the garden medium. Relay the landing. |

---

## 3. Design proposals

**P1. Deeper rectangular grade beam, R(−20, −530, 231, −193), no toes. Adopt.**
- Concrete 0.0846 against 0.0995 m³/m (**−15 %, −2.7 kgCO2e/m** at 178.6 kg/m³).
- Drain cover 152 (acceptable solution, so the alternative solution is dropped).
- Frost margin 74; one pour, so no keyway or cold joint (lap-1 findings 11 and 17).
- Bearing ≈ 13 kPa (I). Part 4 sign-off.
- The interior stone then rests on compacted subgrade at −300 beside the stem.

**P2. Rain-chain basin and rill beyond the opening end. Adopt; this is N2 option B.**
- **Look:** a stone bowl under the rain chain, with water seen arriving beside the doors, not splashing in them.
- **Function:**
  - a real silt sump;
  - zero liner penetrations;
  - the grate and splash are out of the walking zone (08b M9, B651 8.2.4).
- **Cost:** a 500 mm solid pipe through the drain envelope (J12 rules) and 25 mm more garden depth.

**P3. A founded, sealed stone runnel at 2 % that daylights on a lip (N1).**
- A precast stone-faced trough on a crushed strip, rather than mortared stone on topsoil.
- A shallower runnel (45–65 deep) reads as a crisp stone groove in the mulch. It is self-cleansing and does not settle.

**P4. Bold, to evaluate in lap 3: a foamed-glass-gravel (FGG) insulated base in place of 100 stone plus 100 graphite EPS.**
- **What:** 250 mm of compacted FGG (recycled glass), wrapped in nonwoven geotextile.
- **Thermal:**
  - Glavel R-1.7 per compacted inch (S2) gives λ ≈ 0.085 and RSI 2.9.
  - At a wet-allowance λ of 0.10 (I) it is still **2.5 ≥ 2.45**.
- **Function:** one layer acts as capillary break, radon gas-permeable layer and insulation.
- **Frost skirt:** a 150 × 600 FGG strip under the landing liner at ≈ −300 would give frost protection (FPSF logic, 09 P5; Part 4 plus geotechnical).
- **Carbon:** 4.5 kgCO2e/m with the Hasopor EPD proxy (8 kgCO2e/m³, S2), against 12.5 for EPS plus stone. That is **≈ −8 kgCO2e/m on the floor zone (−65 %)**, and no petrochemical foam under the slab.
- **Risks:**
  - Not a VBBL-listed insulation (9.25.2.2), so it needs an alternative solution, as hempcrete did in 12.
  - It is buoyant if submerged. It must stay above the perimeter drain (FGG base ≈ −350, drain invert −526 ✓).
  - The compaction ratio must be controlled on site.
  - Glavel's own GWP is not yet read (EPD of February 2026).
- **Verdict:** this beats the current method on carbon and simplicity if the City accepts the insulation. It does not change the threshold geometry, since the board still sits on the beam.

**P5. Tree pit drained to the rain-garden reservoir (N9).**
- The pit and the garden share one water body.
- The tree gets the reservoir's slow release, and nothing perches at 3.9 m from the house.

---

## 4. Top 3 changes that would raise this score most

1. **Make the roof-water path daylight (N1, P3).**
   - Runnel floor continuous at 2 %: −152.3 at x −3400 → −187.3 at x −5150.
   - Extended to a **stone lip at x −5359, y −191.5** (58.5 above the crest, 13.5 above the spill).
   - A founded, gasketed stone trough on a crushed strip; the tree pit made a pit (w 400–1400) and drained into the rock.
2. **Separate the systems by geometry, not boots (N2, N4).**
   - Move the rill and rain chain beyond the opening end: channel end outlet → solid pipe → silt basin at x −550 → −850 → rill → runnel. Garden lowered 25 (crest −275), so the lip at −210.9 still clears the crest by 64.
   - Liner swale with the underdrain at **−286.9 → −337.9** to its own backwater-valved inlet at a located storm sump.
   - Riser base −1300, outlet ≤ −1260.
3. **Fix the overflow hierarchy at the door (N3), and take P1 with it.**
   - Channel overflow notch at **−20** beyond the leaf, built-in fall −95 → −120, back leg raised to −5 (R1).
   - Beam R(−20, −530, 231, −193): drain cover 152, frost margin 74, one pour, −15 % concrete.

---

**Sources (web, this session):**
- [ARCAT: Armatherm structural thermal breaks specification (500-150 basis of design)](https://www.arcat.com/specification/armatherm-51487/07_21_00ara)
- [BIMobject: Armatherm 500 Series foundation wall (grade table)](https://www.bimobject.com/sq/armatherm/product/armatherm-500-foundation-wall-thermal-bridging-us)
- [VBBL 2019 Part 9 (bcpublications), 9.14.3.3](https://free.bcpublications.ca/civix/document/id/public/vbbl2019/889104345) (search summary)
- [Hasopor foam-glass aggregate EPD (EPD Hub)](https://manage.epdhub.com/declarations/file/download/epdSigned/lang/6823/en) (search summary)
- [Glavel EPD announcement](https://www.accessnewswire.com/newsroom/en/industrial-and-manufacturing/glavel-achieves-industry-first-environmental-certifications-for-foamed-1136009) and [Passive House Accelerator: foam glass and the Glavel factory](https://passivehouseaccelerator.com/articles/foam-glass-solutions-for-passive-house-and-glavel-factory-tour) (search summaries)
