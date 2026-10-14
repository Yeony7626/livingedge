# Review loop 1: junctions A (base of wall), B (eave), C (bench)

Reviewer: detail researcher, author of research/06.

Model reviewed: detail01.mjs / detail01.json (generated), review/loop0/report.md, and the loop0 A/B/C captures. No Rhino objects or packet files were modified.

**Conventions.** All coordinates use the model datum:
- x = 0 at the foundation exterior face, exterior **negative**
- y = 0 at finished grade at the wall face
- w = along the wall

Derived constants used below:
- SH = −12, LAP = −13.11, EI = −63.11, STRAP = −82.11, PAPER = −82.61, FACE = −104.61
- FASCIA_OUT = −704.61, FASCIA_IN = −679.61, NAIL_IN = −539.61, FL_IN = −594.61
- PLATE2 = 3100, JST = 3335, DECK = 3351

Source tags:
- **SOURCED**: a published source; keys as in research/06 §0.2.
- **INFERRED**: reviewer judgement, with the reason given.

**Count: 0 blocker · 7 major · 22 minor** (16 minor errors + 6 minor design-decision disagreements).

---

## What the model gets right (checked against research/06)

**A: base of wall**
- Foundation top at +300.
- Sill flush with the foundation face; sheathing bottom at the sill underside (304).
- Base flashing:
  - 24 ga (0.61)
  - upstand to 360, with the membrane lapped over it from 361 to 240 (121 mm behind the membrane; ≥50 required)
  - fastened at 330 into the sill at 300 o.c.
  - vertical leg 75 mm below the top of the foundation (bend at 225), standing 4 mm clear of the parging
  - sloped leg 10 % (≥6 % required)
  - nose 12 mm past the stucco face; 45° drip ending at x −123.6, y 207.6
- Membrane stops 15 mm above the bend.
- Gaps above the flashing: stucco/casing bead 13.6 mm (≥10 required); strapping and EI bottom 7–14 mm.
- Perforated screen across the full cavity and EI base.
- Stucco bottom at 230 (≥200 required).
- Anchor 12.7 mm, embedded 100 mm.

**B: eave**
- Double top plate, full-depth blocking, closed-cell foam tie.
- **Thermal continuity: EI is continued between the joists to the deck (ei-top).** This is better than my B6.
- 16 mm deck, pre-strip plus AVB, nailer, 2 % fall to the eave.
- Base sheet 52 mm down the face (≥50.8 required).
- Edge metal: 24 ga, flange 113 (≥100), face 104 (≥100 CMHC), drip 12 mm off the face.
- Fasteners at 203 mm o.c. in two offset rows; strip-in 108 (≥101.6).
- Vented soffit with a 46 mm mesh strip.
- **Cavity top closed against the soffit (closure 3043–3081) and vented outward through a 20 mm screened slot under the frieze.** This meets VBBL 9.27.2.2(3) and gives top-vent drying.

**C: bench**
- Pier bottoms 451–464 below local grade (≥450 required).
- Pier tops 188–201 above local grade (≥152 required).
- Stainless anchor 20 mm proud (<25 required).
- ABU44Z envelope matches SST (90 × 76 × 140; 25 mm standoff).
- 90×90 oak posts; 2 × 12.7 bolts per base.
- Slat gaps 8 mm (≥6 required).
- Bench outside the drain-rock envelope.

---

## Control-layer pen test through the model as built

### A: base of wall

| Layer | Path part by part | Break? |
|---|---|---|
| Water-shedding | `stucco` face → `bead-base` (229.7, open) → 13.6 mm gap → `flash` sloped leg → drip at x −123.6 → `gravel` | None |
| Drainage plane | `membrane` (x −12.25) → steps over `flash` upstand at 361 → ends 240 → `flash` face → bend 225 → out under `screen-base`. Second plane: `paper` bottom at 230 drips onto `flash`. | None. The only penetrations are `flash-nails` at 330, behind the lap (OK). New strap screws must stay above 360 (see #5). |
| Air | `vpoly` (x 140.08) → down to 300.3 → lapped 39 mm onto `soilgas` on the foundation ledge → up the slab edge → under the slab. `gasket` is a secondary seal. | Laps and beads are not modelled (#17). OK in principle. |
| Vapour | `vpoly` → `soilgas` under the slab. Mineral wool, membrane and `paper` are vapour-open to the cavity. | None. Sheathing dries outward into the 19 mm vented cavity. |
| Thermal | `batts` (from 342) + `ei` (from 232, covering sill and joint, 68 mm below foundation top) → **concrete wall exposed 0–232** → `edge-xps` / `xps-a/b` inside | Linear bridge at the interior concrete ledge (x 140–200, y 300) and the exposed stem (#D6) |

### B: eave

| Layer | Path | Break? |
|---|---|---|
| Water-shedding (roof) | `capsheet` → `stripin` (108) → `edge-metal` → drip (−719.9, 3404) → `gutter` | Drip not hemmed and face not cleated (#2). Gutter tight to the larch fascia (#3). |
| Drainage plane (wall) | `membrane` to 3100 → `membrane-top` (bays) to the deck underside | **Butt joint at 3100; joist penetrations unsealed** (#9). Sheltered, so minor. |
| Air | `vpoly` (to 3100) → `foam` (x 38–160, bays) → `deck` → `prestrip` (to x 200) → `avb` | Poly-to-foam is edge contact only (#10). Pre-strip is 47 mm past the gypsum face, not 50 (#8). |
| Vapour | `vpoly` (wall) → `avb` on the deck. No ceiling poly. | OK; avoids a double vapour barrier (BCH-BI21) |
| Thermal | `batts` + `ei` → `ei-top` (bays, to deck underside) → [16 mm `deck` + `avb`] → `roofins-1/-2` | Small inherent bridge: the deck plywood and each joist run continuously from warm bays to the cold overhang. `ei-top` faces a ventilated soffit bay with no wind barrier (#11). |
| Fire / concealed space | Cavity closed by `closure` (38 mm tall PT); soffit bays bounded at the wall by `ei-top` (mineral wool) | OK. The vent zone between `closure` and `screen-top` is outside air. |

### C: bench

| "Layer" | Path | Break? |
|---|---|---|
| Water-shedding | `slat-*` (8 mm gaps) → `rail` / `apron-*` → `post-*` → standoff → `pier-*` top → topsoil | **Post tops (y 405) are covered by slats 1 and 3: end grain trapped** (#7). Pier tops flat (#23). |
| Capillary breaks | 25 mm standoff; pier 188+ above grade | OK |
| Structure | Base straps → posts; `apron` bolts (along x) | **`rail` and `xbrace-*` are not connected to anything** (#6) |

---

## Errors

1. **major · `joists` (also `fascia`, `nailer`, `soffit-*`, `gutter`, edge parts).**
   - **Problem:** the joist cantilever beyond its bearing is **679.6 mm** (x 0 → −679.6). The limit used in 06 B3 is ≤600 mm for 38×235 (VBBL19 9.23.9.9(1), by analogy). Adding 50 mm EI moved the stucco face out by 80 mm, while the overhang stayed 600 from the stucco face.
   - **Fix (a), preferred:** set FASCIA_IN = −600, FASCIA_OUT = −625. The overhang from the stucco face becomes 520 (still in the CMHC-BPG Fig. 3.1 301–600 band; code shelter band O/4 = 130). Shift every eave part +79.61 in x:
     - NAIL_IN = −460, FL_IN = −515
     - edge fasteners x = −580 / −540
     - nailer screws x = −490
     - soffit mesh x −323.4…−277.4
     - gutter lip −760
   - **Fix (b):** keep 600 and treat the cantilever as Part 4 engineered (or deepen the joists, and check the back-span).
   - Source: SOURCED (VBBL19 9.23.9.9(1), analogy); geometry INFERRED.

2. **major · `edge-metal`.**
   - **Problem:** the drip is an unhemmed 45° kick, and the 104 mm face has no cleat. Only the flange is fastened, so the face can flutter or peel in wind.
   - RCABC requires a hemmed drip on metal edge flashing (RCABC-MET item 5; P13 3.2(2)(a) "all flashings must be hemmed"). Hidden clips must be ≥24 ga, fastened ≤75 mm from the bottom edge, and engage the drip ≥12 mm (P13 3.3(5)). Continuous-clip fasteners ≤300 o.c. (P13 3.3(6)).
   - **Fix:**
     - Add part `edge-cleat`: 24 ga (0.61) continuous, in the 3 mm space between the fascia face and the metal face. Path: (−705.2, 3460) → (−705.2, 3416) → (−714.0, 3407.2).
     - Fasten the cleat with stainless screws at y = 3440 (24 mm above the face bottom), x −705.5 → −640 into the `nailer`, at ≤300 o.c.
     - Change the `edge-metal` end to a 12 mm hem folded under the 45° kick so that it wraps the cleat tip. Keep the outer drip point at (−719.9, 3404).
   - Source: SOURCED.

3. **major · `gutter`, `gutter-screws`, `fascia`.**
   - **Problem:** the gutter back is screwed flat to the larch fascia (x −704.9, y 3290–3400). This traps water against untreated larch, which is not on BC Housing's durable list (BCH-DECKS p. 27). Water "trapped between … trim" is a listed failure (BCH-DECKS p. 6). CMHC-FL 2.25 requires the eavestrough on a wood fascia to be removable for repainting.
   - **Fix:** stand the gutter off on 8 mm stainless or PVC spacers at each hanger (hangers ≤600 o.c.). The gutter path becomes (−712.9, 3398) → (−712.9, 3290) → (−837.6, 3290) → (−847.6, 3383). The drip at −719.9 still lands 7 mm inside the gutter back. Gutter screws run x −713 → −690, through the spacers into the `fascia` and joist ends (y 3300) or the `nailer` (y 3380). Fascia back-primed and fully coated behind the gutter.
   - Source: SOURCED principle; 8 mm INFERRED.

4. **major · `lath`, `stucco` (crosses into 07 G).**
   - **Problem:** the lath has no fasteners. It also cannot meet VBBL19 9.28.3.2(3) (nails ≥3.2 mm, heads ≥11.1, **penetrating 25 mm into framing**):
     - the strapping is only 19 mm deep;
     - the studs are now 69 mm behind the strapping (19 + 50 EI).
   - My 06 A15a assumption ("through the strapping into studs") is invalid once EI is added.
   - **Fix, choose one:**
     - **(a)** Corrosion-resistant #8 screws with ≥25 mm lath washers into the 19×64 strapping at ≤150 o.c. vertically (9.28.4.6(2)(a); straps at 400 o.c. satisfy the 400 horizontal limit). This is an alternative solution and needs engineer or manufacturer acceptance for the reduced embedment.
     - **(b)** 38 mm deep strapping, giving 25 mm penetration. **Note:** the cavity becomes 38 mm, which is >25 mm, so BCBC 2024 9.10.16.2(2)(a) no longer exempts it. Fire blocks would then be needed at ≤3 m vertical (BCAB-1985).
   - Model: add representative `lath-screws` at w = 79 / 485, y = 250 + 150k, x −89.6 → −63.5.
   - Source: SOURCED (VBBL19 9.28.3.2, 9.28.4.6; BCAB-1985).

5. **major · `strap`, `strap-screw-*` (crosses into 07 G).**
   - **Problem 1:** three-coat stucco (≈0.45 kPa dead load) hangs on 19×64 strapping. That strapping is held by 6 mm screws at 600 vertical × 400, cantilevering through 50 mm of mineral wool. None of my sources covers screw-only support of heavy stucco through EI; it needs an engineered spacing.
   - **Problem 2:** the bottom 268 mm of each strap (232 → 500) is unfastened and carries the stucco base.
   - **Fix:**
     - Add a screw row at **y = 375** (x −82.11 → 75, into the stud bottoms at w 79 / 485). This is above the flashing top at 360, so it does not pierce the flashing upstand. Do **not** use y ≈ 320: that would pierce `flash` behind the lap.
     - Have 07 / a structural engineer confirm the screw size and spacing for stucco on 50 mm EI.
   - Source: INFERRED.

6. **major · `rail`, `xbrace-1`, `xbrace-2`.**
   - **Problem:** the rail only butts the post inner faces. The apron bolts stop at x −765 / −935, and the knee braces have no fasteners at all. SST p. 76: post bases "do not provide adequate resistance to prevent members from rotating about the base". So racking across the bench (x) relies entirely on these joints, and as modelled they are held by nothing. The braces (63 × 75 mm legs) are also too short to brace.
   - **Fix:**
     - Tenon each rail end into the posts: tenon 25 thick in w (centred on w 150 / 750), 30 high (y 345–375), 60 long in x, so the rail spans x −995…−705. The tenon sits between the apron bolts at y 335 / 385, so it is not drilled along its length.
     - Drawbore-pin each tenon with 2 × 10 mm stainless or oak pins along w at y = 360: x −720 / −750 in post 1, −950 / −980 in post 2. They clear the apron bolts by 25 mm in y.
     - Enlarge the braces to ≥120 mm legs. For brace 1: (inner −765, 195) → (−765, 300) → (−780, 315) → (−885, 315). Mirror for brace 2.
     - Fix each brace end with one 8 mm stainless structural screw.
   - Source: SOURCED (SST warning); joinery INFERRED.

7. **major · `post-1`, `post-2`, `slat-1`, `slat-3`.**
   - **Problem:** the post tops (end grain, y 405) bear directly under slats 1 and 3. Water reaching the slat/post interface is held against the end grain. This is the "end grain maintained in a wet environment" condition BCH-DECKS says to avoid, and it moves the rejected buried-post failure to the top of the post.
   - **Fix:**
     - Cut the posts to **y = 403.5**.
     - End-seal, then apply a 1.5 mm self-adhered butyl/EPDM cap over the end grain, lapped ≥25 mm down all four faces. The cap top at 405 stays co-planar with the `rail` and `apron` bearing.
     - Alternative: stop the posts at 395, leaving a ventilated gap. If you do, add bearing for slat 3 (it overlaps the rail by only 4 mm).
   - Source: SOURCED principle (BCH-DECKS p. 26); fix INFERRED.

8. **minor · `prestrip`, `avb`.**
   - **Problem:** the pre-strip ends at x 200, which is 47.1 mm past the interior face of the wall (gypsum face 152.855). BCH-BI21 Fig. 10 item 1 asks for 50 mm "past interior of wall assembly".
   - **Fix:** pre-strip end x = 205. AVB path: (FASCIA_IN, DECK+2.25) → (206, DECK+2.25) → (209, DECK+0.75) → (900, DECK+0.75).
   - Source: SOURCED.

9. **minor · `membrane-top`, `membrane`.**
   - **Problem:** butt joint at y 3100. The sheathing membrane needs ≥100 mm shingle laps, upper over lower (VBBL25 9.27.3.2–.6 via 01). The joists also cross the WRB plane unsealed.
   - **Fix:** `membrane-top` path (−12.75, 3000) → (−12.75, 3335). This laps 100 mm over the wall membrane; outer face at −13.0 clears EI by 0.11. Add self-adhered collars at each joist: 3 sides, 50 mm onto the membrane.
   - Source: SOURCED lap; collars INFERRED.

10. **minor · `vpoly`, `foam`.**
    - **Problem:** the poly ends edge-on at (140.08, 3100) exactly where the foam starts. There is no lap or bead, but this is the main wall-to-roof air transfer. BCH-BI21 Fig. 10 items 2 and 5: leave poly for the tie-in and foam from the poly to the deck.
    - **Fix:**
      - Add `vpoly-tail` in BAYS: path (90, 3100.075) → (140.075, 3100.075). The poly turns 50 mm onto the top of `plate2`, cut around the joists.
      - Start `foam` at y = 3100.15.
      - Add a sealant bead on the plate2 interior face at y ≈ 3080.
    - Source: SOURCED principle; 50 mm INFERRED.

11. **minor · `ei-top` (Detail Library benchmark DL175 / PHT47).**
    - **Problem:** the outer face of the mineral-wool infill (x −63.11, y 3100–3335) faces the ventilated soffit bay with no wind barrier, so wind washes the insulation.
    - **Fix:** add a vapour-permeable wind barrier (or 12 mm fibreboard) at x −63.36 in BAYS, y 3081 → 3335. Seal it to the joist sides and the deck underside, and lap it 25 mm down over the top of `ei`.
    - Source: INFERRED (UK benchmark; the code is silent).

12. **minor · `joists` ↔ `plate2`.**
    - **Problem:** no fastening is modelled. VBBL19 Table 9.23.3.4 requires 3 × 82 mm toe-nails per joist.
    - **Fix:** add the toe-nails, plus a galvanized uplift clip at each joist on the interior face (x 100–140, y 3062–3200), installed before the foam. The 600+ mm cantilever takes wind uplift.
    - Source: SOURCED nails; uplift clip INFERRED.

13. **minor · `nailer`, `nailer-screws`.**
    - **Problem:** the nailer is a 162 mm built-up block held by single 6 mm screws at 400 o.c. with 35 mm into the joists. Its plies are not fastened to each other.
    - **Fix:**
      - Laminate from PT plies: 4 × 38 plus a 10 mm rip, or retune the roof-insulation thickness so the nailer is 4 × 38 = 152.
      - Screw each ply to the one below at ≤400 o.c., staggered.
      - Fix the bottom ply through the deck into each joist with 2 screws embedded ≥50 mm.
    - Source: INFERRED (RCABC-MET requires wood blocking; fastening was not read).

14. **minor · `fascia`, `fascia-screws`.**
    - **Problem:** the fascia is one 25 × 446 mm larch board (3070–3516) with a single screw row at y 3200. The upper 181 mm against the deck and nailer is unfixed, so it will cup, and boards that wide are not available.
    - **Fix:** two boards with a rebated drip joint at y ≈ 3340, plus a second stainless screw row at y 3440 into the nailer.
    - Source: INFERRED.

15. **minor · `closure`.**
    - **Problem:** the closure rests on the strap tops only; the EI behind it cannot hold screws.
    - **Fix:** screws at y 3062, x −82.11 → 75 through the EI and sheathing into `plate2`, at w 79 / 485.
    - Source: INFERRED.

16. **minor · missing interior ceiling.**
    - **Fix:** add a 12.7 mm gypsum ceiling, R(152.855, 3087.3, 900, 3100). It is a finish and fire membrane only. Do **not** add ceiling poly in this exterior-insulated roof: it would create a double vapour barrier (BCH-BI21).
    - Source: SOURCED (no ceiling poly); ceiling INFERRED.

17. **minor · A air-seal items not modelled.**
    - **Problem:** missing items: sealant bead poly → sill interior face; tape at the 39 mm poly/soil-gas lap on the ledge; gasket seal around the anchor bolt.
    - **Fix:** add a bead at (140.1, 305), a tape strip over the lap at x 141–180, and a sealant collar on the anchor at y 301–304.
    - Source: SOURCED (CMHC-BPG Detail 2; VBBL19 9.23.7.2(2) → 9.25.3).

18. **minor · `post-bolt-*-230`.**
    - **Problem:** the ABU44Z first bolt hole is at HB = 1-3/4" (44.5 mm) above the post bottom (SST p. 77, table and note 7). That puts it at y = 221.5, not 230.
    - **Fix:** move the first bolt to y = 221.5. Take the second hole from the product drawing; 270 stays INFERRED.
    - Source: SOURCED.

19. **minor · `pier-1`, `pier-2`.**
    - **Problem:** the two Ø250 piers in each pair are 10 mm apart (x −855 vs −845), which can't be formed separately. `pier-1` is 9.5 mm from the drain-rock geotextile (−585.75).
    - **Fix:** Ø200 piers. Edge cover to the anchor is 92 mm (≥51 SST), and the 76×95 base fits. Pier 1 spans x −820…−620 (34 mm clear of the rock); pier 2 spans −1080…−880. Or use one 250 (w) × 510 (x) pad per post line.
    - Source: SOURCED cover; geometry INFERRED.

20. **minor · `pier-anchor-*`.**
    - **Problem:** no nut or washer. SST: "place … washer(s) or load transfer plate(s) and nut(s) on the anchor bolt".
    - **Fix:** add a stainless washer (y 153.5–156.5) and a 5/8" nut (y 156.5–170.5) under the seat at 175.5.
    - Source: SOURCED.

21. **minor · `slat-*`.**
    - **Problem:** the slats rest unfixed on the rail, aprons and posts.
    - **Fix:** 2 stainless screws (5 × 70) per slat per bearing, driven from below through the `rail` / `apron`, kept ≥20 mm from the slat edges.
    - Source: INFERRED.

22. **minor · `abu-*` vs stainless bolts and anchor.**
    - **Problem:** a ZMAX (zinc) base with stainless anchor and bolts in tannic oak is a mixed-metal joint. The zinc corrodes preferentially around the holes.
    - **Fix:** specify the stainless-steel version of the base. SST lists ZMAX "and some in stainless steel".
    - Source: SOURCED availability; galvanic reasoning INFERRED.

23. **minor · `pier-*` tops.**
    - **Problem:** the pier tops are flat, so water ponds under the base plate.
    - **Fix:** float the top to fall 1:10 from the base-plate edge (y 152) to the perimeter (y ≈ 146), with a 10 mm chamfer.
    - Source: INFERRED (06 C3 [I]).

## Design-decision disagreements

D1. **minor · `flash-clip`, `clip-screws`.**
- **Correction:** the "75 mm" in 06 A11 is the **vertical lap below the sill joint**, not a span limit. No source sets a span limit for a rigid metal leg. CMHC-FL p. 1-12 requires continuous support only for *flexible* (membrane) flashings.
- Clips at 600 o.c. are acceptable [I], but as modelled the 3 mm galvanized clip leg is **cast into the 8 mm parging** (x −3…0, y 160–224) in the splash zone. That invites a rust stain and a crack line, and it bridges the 4 mm air gap behind the flashing.
- **Fix:** stainless clips, installed **over** the finished parging and screwed through it with a sealant-dipped screw. Or delete the clips and use 22 ga (0.76) flashing with a stiffening bead.
- Source: SOURCED (CMHC-FL) / INFERRED.

D2. **minor · `bead-base`.**
- **Problem:** a galvanized casing bead sits in the splash zone (y 229.7), embedded in wet stucco.
- **Fix:** zinc-alloy or PVC base bead. 06 A15a allowed galvanized or zinc; zinc or PVC is preferred here.
- Source: INFERRED.

D3. **minor · `basesheet`, `fascia`.**
- **Problem:** the fascia top (3516) is flush with the nailer, so the base sheet and edge metal wrap the finished larch. The fascia can't be repainted or replaced without opening the roof edge. CMHC-FL 2.23/2.24: design roof flashings for easy removal.
- **Fix:** bring the `nailer` outer face out to x −704.6, with a 25 mm PT packer on the joist ends under it. Drop the fascia top to y 3440 so the edge-metal face (bottom 3416) laps 24 mm over the fascia.
- Source: SOURCED principle; geometry INFERRED.

D4. **minor · bench position (`pier-*`, `post-*`, `slat-*`).**
- **Problem:** the seat spans x −655…−1061, so its inner 50 mm is inside the drip line (−704.6), and the gutter lip (−839.6) hangs over slats 1–2. A blocked gutter or a cloudburst (10 mm in 15 min, VBBL Appendix C via 01) overflows onto the seat. 06 C11 asked for a gutter **or** placement beyond the drip line; the current layout does half of each.
- **Fix:** put the seat's inner edge ≥20 mm beyond the gutter lip. The seat's inner edge sits 65 mm inboard of post 1's centre.
  - With the current overhang and the #3 stand-off (lip at −847.6): posts at x −935 / −1195.
  - With error #1 fix (a) plus the #3 stand-off (lip at −768): posts at −855 / −1115.
- Source: INFERRED (geometry).

D5. **minor · seat height.**
- Seat top y 450 is 486–499 mm above local grade (G(−720) = −36, G(−980) = −49). Typical benches are lower. Not researched (06 open question 15).
- **Suggestion:** seat top y ≈ 420. Lower the `post-*` / `rail` / `apron` tops by 30 mm.
- Source: INFERRED.

D6. **minor · interior foundation ledge (cross-ref D reviewer).**
- **Problem:** the 60 mm concrete ledge (x 140–200, y 300) between the sill and the slab-edge XPS is uninsulated and sits in the conditioned floor plane. It is connected to the exposed stem (y 0–232). This is a cold strip at the floor/wall junction. The exterior EI covers only 68 mm below the foundation top.
- **Fix options:** a 2D thermal check; either continue exterior insulation down the stem (would change flashing A11), or cap the ledge with 25 mm XPS under the finish floor.
- Source: INFERRED (no psi-value source in 06).

## Note on items the model invented ([I]) that I accept

- 10 % flashing slope.
- Mineral-wool `ei-top` at the wall line.
- Perforated screen across both the EI base and the cavity base.
- Vent slot formed by the frieze 7 mm off the stucco plane, with the slot 20 mm under it.
- Post-base straps facing along the wall, with braces on the free faces.
- Side-bolted aprons (but see #6 for the rail).
