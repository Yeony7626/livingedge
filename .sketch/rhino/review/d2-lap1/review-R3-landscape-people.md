# Detail 02, lap 1: review R3 (landscape, people and ecology)

Reviewer: R3. Model: `detail02.mjs` / `detail02.json` (d2v1), packet `review/d2-lap0/`. Rhino layer Detail02::d2v1 was not touched.

**Datums.** Model datums are used throughout: x = 0 at the sliding frame's exterior face, with the exterior negative; y = 0 at FFL; w runs along the wall, slice L = 1800. The research files measure d positive outward, so research +d = model −x.

**How levels were obtained.** They were recomputed from the model's own formulas:

- Pavers: PT(x) = −8 − 0.02·(−171.5 − x).
- Rim: RIM_Y = −458.1. Pond floor (mulch top): PONDB = −658.1. Overflow crest: −558.1.
- Bank: 388.5 mm drop over 1750 mm = **22.2 %**.

**Tags.** SOURCED = the number or rule comes from a research file or a fetched page, which is cited. INFERRED = my own reasoning.

---

## 1. Score: **5 / 10** for landscape, people and ecology

### What works
- **Threshold and landing follow 08b closely:**
  - near-flush threshold, with a 13 mm rise and a 1:2 bevelled nosing;
  - continuous channel with a heel-safe grate (slots ≤ 6.5 mm, parallel to the door);
  - lined and underdrained landing to −1850, with a 1700 mm level landing;
  - BPN ≥ 55 pavers with joints ≤ 6 mm on the landing;
  - unlined PICP terrace beyond.
- Root barriers and a curbed shrub pocket are present.
- The tree sits 4.4 m out, with headroom over the path of 2.29 m (≥ 2.1 m SOURCED, 08 H8).
- The rain garden is ≥ 5 m out, with the 08 J layer sequence (450 medium, choker, 300 rock, subdrain, riser).
- The roof is green, with a gravel edge strip. Insect screens are at the band cavity.
- People proxies are present inside and outside.

### What holds the score down
- **The rain garden is a hydraulic sketch, not yet a working or living system:**
  - ponding is 100 mm instead of 200 mm;
  - the subdrain sits at the bottom of the rock;
  - there is no emergency spill path;
  - the riser is an open pipe;
  - the inlet pipe cantilevers 560 mm into the air over the side slope;
  - there are no plants at all.
- **The planting bed has no understorey or tree pit.** The tree gets about 3.9 m³ of soil against the 10 m³ the City asks for.
- **The rainwater line runs 0.7 m from the tree trunk and penetrates the liner twice.**
- **A root path stays open** through the bedding over the liner cut-off into the underdrain.
- **The shrub pocket leaves a 50 mm paver sliver** against the edge restraint.
- **The 5.3 m glazed wall faces fruiting shrubs, a tree and water with no bird-collision treatment.**
- **The 22 % bank is acceptable but avoidable.** It is caused by routing the deep landing underdrain into the same pipe as the surface water.

**No blockers.** Every problem has a local fix.

---

## 2. Findings

Severity counts: **0 blocker · 11 major · 13 minor.**

### Major

**F1 (major) — Rain-garden ponding is 100 mm, not 200 mm.**
- Parts: `rg-mulch`, `rg-medium`, `rg-riser`, `rg-choker`, `rg-rock`, `rg-subdrain`, `subgrade`.
- **Problem:**
  - `PONDB = RIM_Y − 200` with the riser crest at `RIM_Y − 100` gives only 100 mm of ponding over the mulch, plus 100 mm of freeboard.
  - Ponded volume is ≈ 0.165 m³ per metre of garden. 08 J.1 assumes 200 mm in its storage table (2.0 m³ for 10 m²), so this holds about 40 % of the storage the source assumes.
- **Fix:**
  - `PONDB = RIM_Y − 300` (mulch top −758.1). The crest stays at `RIM_Y − 100` = −558.1, i.e. 200 mm above the mulch, with 100 mm freeboard.
  - `GSLOPE = 900`, keeping 1:3.
  - `GARDEN_FAR = RIM − 900 − 1350 − 900 = −8300`, keeping the 1350 floor.
  - `rg-mulch` runs from x = RIM−900 to GARDEN_FAR+900.
  - Layers below follow PONDB: medium −833.1 → −1283.1, choker → −1383.1, rock → −1683.1.
  - Extend `subgrade` and views J and S to x = −8600.
  - Result: ≈ 0.39 m³/m (×2.4).
- **Basis:** SOURCED. MV23 via 08 J8 gives 200 mm ponding to the crest (range 150–300) and ≈ 100 mm freeboard. 08 J.2 volume table.

**F2 (major) — No emergency spill path; the far rim does not sit lower than the house rim.**
- Parts: `rg-medium`, `subgrade`.
- **Problem:**
  - The far rim is at `RIM_Y`, and the ground beyond rises to `RIM_Y + 15` at x −8000.
  - If the riser blocks (mulch, leaves), water rises to the rim, about 50 mm above the pipe outlet (−509.7) and above the landing underdrain invert (−469.6).
  - Garden water then backs up the rainwater line into the underdrain trench, instead of overflowing away from the house.
- **Fix:**
  - Cut a cobble-lined spillway notch 1.0 m wide (in plan, at the end away from the opening) into the far rim, with its sill at **crest + 45 = −513.1**. That is below the pipe invert after F4 (−507.1).
  - Grade beyond it to fall ≥ 2 % away from the house: `subTop` ends `[GARDEN_FAR, −513.1], [−8600, −519]`.
  - The rest of the rim stays at `RIM_Y`.
- **Basis:** 08 J8 (INFERRED: the far rim must be lower so an emergency spill runs away). BCH-SFD (SOURCED): "engineered to overflow before backing up". VBBL Note A-9.14.5.3.(2) (SOURCED): "an overflow is required".

**F3 (major) — Subdrain sits at the bottom of the rock instead of near the top.**
- Part: `rg-subdrain`.
- **Problem:**
  - The centre is at PONDB − 840, in the bottom 85 mm of the 300 mm reservoir.
  - The rock drains straight to the riser, so it gives no infiltration storage. The tool would show the garden as a filter-and-pipe, not an infiltrating feature.
- **Fix:**
  - `rg-subdrain y = PONDB − 625 − 85`, i.e. −1468.1 after F1, with the crown just under the choker.
  - That leaves ≈ 135 mm of rock below the invert (≈ 54 mm of rain stored at 0.4 porosity) to infiltrate into the till.
  - Cleanouts at both ends.
- **Basis:** SOURCED. 08 J3 (MV23 items 19–20): subdrain "embedded near the **top** of the rock reservoir", with cleanouts.

**F4 (major) — Inlet pipe cantilevers 560 mm over the side slope; no rock apron; outlet only 48 mm above the crest; no rodent guard.**
- Parts: `rainwater-line`; new `rg-inlet-apron`, `rg-headwall`, `rg-outlet-flap`.
- **Problem:**
  - `LINE0 = RIM − 560`. The outlet hangs ≈ 130 mm above the slope at x −5710, which is clearly visible as a protruding pipe in `exterior-eye.png`.
  - The inner invert is −509.7, only 48 mm over the crest.
  - There is no erosion protection on a 1:3 slope.
  - The open pipe end is a rodent route to the channel and the threshold.
- **Fix:**
  - `LINE0 = RIM − 300` (−5450). The outlet invert becomes −507.1 (**51 mm** over the crest), and it discharges where the 1:3 slope reaches crest level.
  - Add `rg-headwall`: dry-laid stone or precast, 300 × 300, around the last 300 mm of pipe.
  - Add `rg-inlet-apron`: river cobble 75–150 mm, 150 thick, on 407 g/m² nonwoven geotextile. It runs from x −5450 down the slope to 300 mm onto the floor (x −6350), w 1300–1800 (≥ 600 wide), with its top at the slope surface (≥ 50 mm drop from the invert).
  - Add `rg-outlet-flap`: stainless hinged flap or 16-mesh screen on the pipe end. A flap is preferred because screens blind with leaves (INFERRED).
- **Basis:** SOURCED. 08 J11 (MV23 items 2–3): ≥ 50 mm drop, rock transition on slopes > 10 %, "protect concentrated flow paths … with rock". 08b M21 / M.4(d): outlet screened, 16-mesh per ICPI, or flap.

**F5 (major) — Overflow riser is an open 200 mm pipe stub.**
- Parts: `rg-riser`; new `rg-riser-grate`, `rg-stone-collar`, `rg-outlet-backflow`.
- **Problem:**
  - Wood mulch floats into an ungrated riser, leaves blind it, and a child's arm or a small animal can enter.
  - Rats use overflow pipes from the tank/storm system as runs.
- **Fix:**
  - `rg-riser-grate`: cast or stainless domed (beehive) grate, ⌀250, with slots ≈ 12 mm. The bottom slot row sits at the crest (−558.1) and the dome top at −458 (rim level, hidden by sedges).
  - `rg-stone-collar`: 25–50 mm river stone instead of wood mulch, within 600 mm radius of the riser.
  - `rg-outlet-backflow`: rodent/backwater flap on the riser outlet to the tank.
  - Clean the grate each fall.
- **Basis:** SOURCED. 08 J9 (MV23): "grated inlet … grate openings small enough to exclude mulch, large enough not to blind with leaves; cleaned each fall". 08 J6: "keep mulch off the overflow grate". 08 J.2(d): rodents use reservoirs and overflow pipes if the riser grate is missing (INFERRED in the source). BC-RAT via 08 L8: rats pass ≈ 13 mm.

**F6 (major) — The rain garden has no plants; the bed has a tree and nothing else.**
- Parts: new `rg-plants-wet`, `rg-plants-slope`, `rg-shrub-rim`, `bed-groundcover`, `bed-perennials`, `bed-bare-patch`.
- **Problem:**
  - The richest habitat strip in the section is drawn as bare mulch.
  - The bed has no layered pollinator planting, no bare-soil nesting patch and no bloom continuity.
- **Fix (proxies; height and spacing are the year-5 state):**
  - `rg-plants-wet`: clumps 600–900 h on the floor at x −6000 and −6800, w 300 and 1200, kept ≥ 450 from the riser. *Carex obnupta*, *Juncus effusus* var. *pacificus*, *Scirpus microcarpus*, ≤ 0.6 m centres.
  - `rg-plants-slope`: *Polystichum munitum* and *Blechnum spicant*, h 600, on the house-side slope in the tree's shade (x −5600) and on the far slope (x −7700).
  - `rg-shrub-rim`: *Ribes sanguineum* and *Rosa nutkana*, h 1500, on the far rim at x −8450.
  - `bed-groundcover`: *Arctostaphylos uva-ursi* (kinnikinnick), a 300 mm band along the path edge plus the lower bank.
  - `bed-perennials`: *Achillea millefolium* plus a late aster for August–October, ≤ 0.6 m centres.
  - `bed-bare-patch`: 0.5–1 m² of unmulched, untilled soil at the sunny upper bank, x −3500 to −4000.
  - Mulch in the garden: double-shredded wood (knits, floats less), 75 mm, including on the side slopes.
- **Basis:** SOURCED. 08 J7 hydrozone list (CNV5, MV23 Table 10-1). 08 L1 (P2: something blooming at all times). 08 L2 (≈ 70 % of native bees nest in the ground; bare patches). 08 I6. STEP ≥ 80 % cover at inspection. 08 J6 (shredded wood).

**F7 (major) — A root path stays open over the liner cut-off and around the pocket barrier into the underdrain.**
- Parts: `liner`, `root-barrier-pocket`; new `root-barrier-liner`.
- **Problem:**
  - The liner's outer upturn at x −1848 stops at the bedding underside (−171.5). No. 8 bedding is continuous over it (`bedding-1` touches `bedding-lined`).
  - `root-barrier-pocket` runs only under the house-side curb (w 300–1500), from base bottom (−325.6) down.
  - Roots, from the shrub and later the tree, can pass under the w-side curbs (bottom −346) into the moist, aerated base, travel toward the house in the base and bedding, cross over the liner, and reach `base-lined` and the perforated underdrain.
  - Perforations are root entry points.
- **Fix:**
  - Raise the liner's outer upturn to **PT − 82** (−123.7 at x −1854): `B[0] = [LINER_END+2, PT(LINER_END+2) − 82]`.
  - Add `root-barrier-liner`: ribbed HDPE 2 mm at x = −1854, from y −123.7 (2 mm under the paver underside) to −723.7. Full width w 0–1800, lapped onto the liner turn-up.
  - Add w-side returns to `root-barrier-pocket` at w 350 and w 1450, x −2050 → −3200, PB → PB−600.
- **Basis:** 08b M16 (SOURCED): barrier "on the house side of the pocket **and** along the lined-zone edge (+1850), top 25 mm above the base top, 600 mm deep". GILMAN96/SMILEY09 via 08b: roots pass below and around barriers, resurfacing within 1.2 m. OMAFRA via 08 I.2: perforations are entry points. Raising the top into the bedding is INFERRED, because 25 mm above the base top still leaves 25 mm of bedding open.

**F8 (major) — The tree has about 3.9 m³ of soil; no tree pit; the trunk sits on a 22 % slope.**
- Parts: `bed-soil`, `tree`; new `tree-pit`, `tree-bench`.
- **Problem:**
  - The bed medium is 450 deep over 1.75 m. Across a 5 m opening that is ≈ 3.9 m³, against 10 m³ for a solitary small tree.
  - The trunk stands on the bank at BT(−4400) = −291.6, so the root flare is buried on one side and exposed on the other.
- **Fix:**
  - Add `tree-pit`: growing medium from BT(x) − 525 down to **BT(x) − 1075** (1000 mm of medium below the mulch), x −3420 → −5100, full opening width. Scarify 300 mm at the bottom. This gives 1.68 × 5 × 1.0 ≈ 8.4 m³, plus the shared garden medium ≈ 5.7 m³.
  - Add `tree-bench`: a level planting bench ⌀1200 at y −291.6 around the trunk (cut/fill ≈ ±130 on the slope), so the flare sits at grade.
- **Basis:** SOURCED. 08 I4: BCLS 1000 mm over ≥ 10 m²; CoV EDM 10 m³ for a solitary small tree; LB91 0.61 m³ per m² of crown.

**F9 (major) — The rainwater line runs 0.7 m from the tree trunk, crosses the lined landing (two liner penetrations) and passes 45 mm from the shrub-pocket curb.**
- Parts: `rainwater-line`, `liner`, `underdrain`, `tree`, `pocket-curb-w`.
- **Problem:**
  - The line is at w 1545–1655 and the trunk at w 900.
  - It runs through the bed soil and the future tree pit at −446.
  - Any repair cuts structural roots.
  - It also breaches the liner trench twice and sleeves through `root-barrier-path`.
- **Fix:**
  - Move `rainwater-line` to **w = 2950**. That is beyond the cut, drawn as a hidden line, along the end of the opening where the downspout and the channel outlet already are, ≥ 2.05 m from the trunk and outside the lined zone.
  - The landing underdrain runs along w to the same end and tees there with a cleanout.
  - Delete the liner and barrier penetrations.
  - If the line must stay in the slice, move the tree trunk to w ≤ −1150 instead.
- **Basis:** 08 I5 (SOURCED): ≥ 2.0 m City (EDM) clearance from sewer service connections. 08b failure table: liner "punctured by … pipe work" means bypass at the wall. Routing is INFERRED.

**F10 (major) — 50 mm paver sliver between the pocket's far curb and the edge restraint; pocket interior only 1.0 × 1.0 m.**
- Parts: `pavers-3`, `bedding-3`, `base-3`, `pocket-curb-2`, `pocket-soil`, `edge-restraint`.
- **Problem:**
  - `POCKET[0] = −3200` against `PATH_END = −3250` leaves a 50 mm cut-paver strip between two concrete curbs. It will rock and loosen, creating a trip edge, and it looks unresolved from outside.
  - The 100 mm curb ring leaves 1.0 × 1.0 × 0.6 = 0.6 m³ of soil, against 0.86 m³ in 08b M18.
- **Fix: open the pocket to the bed as a notch.**
  - `POCKET = [−3250, −2000]`.
  - Delete `pocket-curb-2`, `pavers-3`, `bedding-3` and `base-3` in w 300–1500 (they stay only in `PW_OUT`).
  - `edge-restraint` runs only in `PW_OUT` (w 0–300, 1500–1800). `pocket-curb-w` extends to x −3250 and meets it.
  - `pocket-soil` runs x −2100 → −3400, continuous with `bed-soil`: ≈ 0.78 m³ plus the bed.
  - `root-barrier-path` gets returns along the pocket w-sides, tying into F7's pocket returns.
  - Alternative: make the pocket x −2000 → −3000, leaving one full 250 mm paver course.
- **Basis:** 08b M17/M18 (SOURCED for 600 mm depth and BCLS volume). B651 Table 1 via 08b: lips > 6 mm are trip hazards. The notch is INFERRED.

**F11 (major) — Bird collisions: no treatment on a 5.3 × 2.6 m clear glazed wall that faces fruiting shrubs (2 m), a fruiting tree (4.4 m) and a water feature (5–8 m).**
- Parts: `glass-1` (exterior pane).
- **Problem:**
  - The landscape is designed to attract birds: huckleberry and serviceberry fruit, rain-garden water and insects.
  - The lift-and-slide wall reflects the tree and the garden.
  - This is the textbook high-risk condition.
- **Fix:**
  - Specify surface-1 markers on `glass-1` over its full height: ceramic frit or acid-etched dots ⌀5 mm at ≤ 50 × 50 mm, or vertical lines ≤ 100 mm apart (the "2×4" rule).
  - Alternative: an exterior retractable screen (see P6) when the wall is closed in fruiting season.
  - Coordinate the look with R1. Dots at 50 mm read as a light veil from 3 m.
- **Basis:** SOURCED, web:
  - CSA A460:19 (via Construction Canada and search summaries): markers on the first surface, ≥ 4 mm dots or 2 × 8 mm lines, ≤ 50 mm apart, to 16 m or to the mature canopy height.
  - UBC policy built on A460: treat glazing 0–16 m that is 2–20 m from vegetation or water.
  - Vancouver Bird Friendly Design Guidelines (2015/2017) are voluntary (search summary; the PDF returned 403).
  - The application to this house is INFERRED.

### Minor

**F12 (minor) — Unlined terrace base has no outlet** (conditional on a soil test).
- Parts: `base-1..3`, `edge-restraint`, `root-barrier-path`.
- **Problem:** the base sits on compacted subgrade and is sealed at the outer edge by the curb (to −369.6) and the 600 barrier (to −746.6). On Vancouver till it becomes a tub in long winter rains.
- **Fix:**
  - Add `underdrain-terrace`: perforated ⌀100 along w at x −3175, centre y −273 (crown 20 mm under the bedding, invert 20 mm above the base bottom, i.e. a partial-infiltration level).
  - Solid pipe where it passes the pocket. Laid at 1 % to the opening end; tee into the rainwater line.
  - Omit if the subgrade tests ≥ 13–15 mm/h.
- **Basis:** SOURCED. 08 H3 / STEP-PP / IRMP16: underdrains below 15 mm/h; partial infiltration with the pipe near the top of the reservoir at 1–15 mm/h. "Vancouver tills usually below" is INFERRED in 08.

**F13 (minor) — Landing fall 2.0 % sits exactly on the B651 1:50 limit, with zero construction tolerance.**
- Parts: `pavers-*`, `bedding-*`, `base-*`, `liner` (all via `PT`).
- **Fix:** `PT = −8 − 0.017·(CH_OUT − x)` (1:60), built ±0.3 %. Then PT(−1850) = −36.5 and PT(−3250) = −60.3.
- **Basis:** SOURCED. GG47: 1:40–1:60, single direction. B651: ≤ 1:50. MV23: permeable surfaces ≥ 1 %. 08 H.4 conflict 2 (no tolerance at exactly 2 %).

**F14 (minor) — Gutter overflow lands in the doorway.**
- Part: `gutter`; new `gutter-overflow`.
- **Problem:** the front lip is 15 mm below the back. A blocked gutter sheets onto the landing at x −743 to −900, which is exactly where people step out.
- **Fix:**
  - Gutter front top at `TOP0 − 143` (lip 25 mm below the back).
  - Add `gutter-overflow`: a spout at the gutter end beyond the opening, discharging onto the cobble head of the rill or the planting there, never onto the landing.
- **Basis:** SOURCED. 08 J15 / FHB: lip ≈ 25 mm lower. 08 K10: designed overflow spout away from the user.

**F15 (minor) — Two paver specs meet at −1850, and the grate surface is unspecified.**
- Parts: `pavers-lined`, `pavers-1..3`, `grate`.
- **Problem:** the unlined pavers allow ≤ 10 mm joints and the landing ≤ 6 mm. The joint width visibly changes at the liner edge, and wide joints are unsuitable for routes used by disabled people. Stainless grates are slick when wet.
- **Fix:**
  - One paver and one joint (≤ 6 mm, BPN ≥ 55) across the whole terrace, continuous over the liner edge.
  - Grate with a slip-resistant (punched or serrated) top.
- **Basis:** SOURCED. IRMP16 via 08b: "pavers with wide joints should not be used for … pedestrian ramps" for disabled users. 08b M14: "pavers run continuously over it (no visible joint)". B651 4.3.1 (firm, slip-resistant).

**F16 (minor) — Bed mulch is flush with the paving at BED0.**
- Parts: `bed-mulch`; new `bed-groundcover` (F6).
- **Problem:** wind and birds scatter chips and fines into the PICP joints, which clog. As the mulch decays and the bank erodes, a vertical drop forms at the curb face (300 deep).
- **Fix:**
  - `bed-mulch` top at BED0 = BT(BED0) − 40.
  - A 300 mm kinnikinnick band holds the bank head and gives a cane-detectable texture change.
  - Keep the drop < 75 mm by topping up.
- **Basis:** 08b M17 (SOURCED pattern: mulch 25–50 mm below the curb). B651 8.2.5 (SOURCED): drops of 75–600 mm need edge protection. STEP-PP (SOURCED): joint clogging from organic fines.

**F17 (minor) — The 22.2 % bank is acceptable but avoidable.**
- Parts: `bed-soil`, `bed-mulch`, `BT`.
- **Problem:** 1:4.5 is flatter than the 4:1 (25 %) preferred maximum for planted rain-garden side slopes, so it is buildable. But it puts the tree on a slope, sends chips downhill into the garden and makes the garden a pit 0.6–0.7 m below the terrace.
- **Fix:**
  - Arborist chips (not bark nuggets) over a jute or coir blanket at year 0.
  - The tree bench (F8).
  - Better: P1 or P2 (rim +170 to +260 mm, bank 12 % or 7 %).
- **Basis:** SOURCED: MV23 via 08 J8, side slopes ≤ 2:1 max and 4:1 preferred. The 08b M.5 interface already flags the bank. Remedies are INFERRED.

**F18 (minor) — The shrub blocks the seated view and its soil will turn alkaline.**
- Parts: `shrub`, `pocket-curb*`, `pocket-soil`.
- **Problem:**
  - The proxy top is +1403 above FFL, on the opening's centre line, 2.0–3.2 m from the glass. A seated occupant (eye ≈ 1150–1250) loses the central view of the garden.
  - The concrete curb ring and pavers leach lime into a 1 m pocket of acid-loving *Vaccinium*.
- **Fix:**
  - Prune target **1.0 m**: scale the shrub profile so its top is PT+1000 = +955 above FFL.
  - Line the inner curb faces with the 2 mm HDPE (which also stops roots).
  - Specify pocket mix at pH 5.0–5.5 with conifer-bark fines, and top-dress every 2–3 years.
  - In 3D, place the pocket off-axis (08b M.4(c) already suggests one side of the opening).
- **Basis:** SOURCED: 08b M18 (pH 4.5–6.5 medium); IM via 08 K12 (seated or wheelchair eye 960–1250). The lime effect and the pruning target are INFERRED.

**F19 (minor) — *Amelanchier alnifolia* suckers.**
- Parts: `tree`, `root-barrier-path`.
- **Problem:** the species "often spread[s] by rhizomes or rooting branch ends to form dense colonies" (GOERT, citing Klinka / E-Flora data). That contradicts 08b M19's "avoid suckering natives beside the route", and suckers will come up in the pocket and the terrace edge joints.
- **Fix:**
  - Single-stem nursery form; annual sucker removal (timeline).
  - `root-barrier-path` top at **PT(PATH_END) + 25 = −44.6**, on the bed side of the curb, hidden in the groundcover. It is currently 77 mm below grade.
- **Basis:** SOURCED, web: goert.ca species page. 08 I2 (SOURCED pattern): barrier top 25 mm above finished grade so roots cannot cross over.

**F20 (minor) — The green roof is a weak habitat.**
- Parts: `growing-medium`, `sedum`; new `gr-habitat`.
- **Problem:** the substrate is a uniform 80 mm under a sedum-led mat, with no structural habitat. 09 R1 recommends ≈ 100 mm with varied depths, a native coastal palette and deadwood or sand patches.
- **Fix:**
  - `growing-medium` 100 average, mounded to 150 over the interior (x ≥ +600, near the bearing line; Part 4 check at 0.93–1.08 kPa saturated, and more at 150).
  - Add `gr-habitat` per 10 m²: one sand patch 0.5 m² × 50 deep and one deadwood log ⌀100 × 600, at x ≥ +1000.
  - Palette: native sedums (*S. spathulifolium*, *S. divergens*, *S. oreganum*), *Allium cernuum*, *Achillea millefolium*, *Eriophyllum lanatum*, *Fragaria chiloensis*, *Festuca rubra*.
  - Keep the 388 mm gravel strip.
- **Basis:** SOURCED: 09 §7.1/§7.4 (ZINCO: pure sedum on shallow substrate "is not suited to biodiversity"). The species beyond *Achillea* are INFERRED.

**F21 (minor) — No wheelchair user or seated occupant proxy.**
- Parts: new `person-wheelchair`, `person-seated-inside`.
- **Problem:** the brief asks to show threshold use including a wheelchair. The 1700 landing and the view line over the shrub are not demonstrated.
- **Fix:**
  - `person-wheelchair`: box x −250 → −1500 (1250 long), w 100–800 (700 wide), y PT → PT+1300, eye at +1200.
  - `person-seated-inside`: rod at x +1500, w 1300, y 0 → 1300, eye 1200.
  - Optional: a flat 1500 turning-circle marker on the landing, centred at x −1000, w 900.
- **Basis:** SOURCED: IM via 08 K12 (wheelchair ≤ 1250 long, ≈ 700 wide, eye 960–1250); B651 via 08b (1700 × 1700 landing).

**F22 (minor) — Channel and silt box: standing water and screen blinding.**
- Parts: `channel`, `grate-screen`; silt box (note).
- **Problem:**
  - The channel invert is flat at −120, so puddles stand in joints and low spots.
  - The full-length 1.0–1.2 mm dirt screen blinds with spring pollen and maple samaras, and the channel then backs up at a sill that cannot hold 160 Pa.
  - A silt bucket holding water for more than a week breeds mosquitoes.
- **Fix:**
  - Channel units with built-in fall ≥ 0.5 % to the outlet.
  - Replace the full-length screen with a removable perforated sediment basket in the silt box (drains dry), with a tight lid.
  - Clean in spring and fall (timeline).
- **Basis:** SOURCED: 08b M9 (silt box with removable bucket, ACO-SD); 08b M.4(d) (larvae need 3–7 days, MOSQ search summary); 08b M.4(a)9 (sill vs 160 Pa). The mechanism is INFERRED.

**F23 (minor) — Track weeps are open 12 mm tubes into the channel.**
- Part: `track-weeps`.
- **Problem:** ants and earwigs use the tubes into the sill cavity, and mice (which pass > 6 mm) can enter.
- **Fix:** stainless insect-proof weep inserts, ≤ 2 mm aperture, at the channel ends of the tubes.
- **Basis:** 08 L7 (≤ 2 mm adopted, INFERRED within a SOURCED 2–6.4 mm range). 08b M.4(d): "ants use sill cavities"; mice pass > 6 mm (SOURCED, BC-RAT/UCIPM).

**F24 (minor) — No trench dams on the rainwater line.**
- Part: `rainwater-line`; new `trench-dam-1/2`.
- **Problem:** the pipe bedding can carry garden water back toward the house.
- **Fix:** compacted clay or bentonite plugs, 300 long × trench width, from the trench bottom to 150 above the crown:
  - `trench-dam-1` just outside the foundation zone (x ≈ −700);
  - `trench-dam-2` at the garden rim (x ≈ RIM + 300).
- **Basis:** SOURCED: 08 J10 (MV23 "TRENCH DAMS AT ALL UTILITY CROSSINGS"); 08b M21.

---

## 3. Design proposals

### P1 — Split the deep landing underdrain from the surface-water line (recommended, fixes the bank)

**What changes:**
- The 22 % bank exists because the surface line starts at the underdrain's depth (invert −469.6, which is sourced: the underdrain crown sits below the base) and then falls 1 % to the garden.
- Give the underdrain its own solid ⌀100 line. Run it along w to the opening end, drop it under the bed with 45° bends, pass beneath the garden medium, and tee it into the overflow riser below the choker (direct to tank and storm), with a flap valve.
- Run the surface line (downspout boot + channel silt box) **outside the lined zone** at the opening end (also F9), with its crown under the terrace bedding.

**Levels:**

| point | invert (mm) |
|---|---|
| silt-box outlet, x −200 | −285 |
| x −3250 (crown −205.5, under bedding −199.6) | −315.5 |
| outlet at x −5450 | −337.5 |

That gives crest −388.5, rim **−288.5**, floor −588.5.

**Effects:**
- The garden and bank rise ≈ 170 mm. The bank becomes (288.5 − 69.6)/1750 = **12.5 %**, close to 08's 11.5 %.
- About 170 mm less excavation over the whole garden.
- The tree stands on a gentle slope.
- No liner penetrations.
- The landing's underdrain can never be backed up by the garden.
- Losing infiltration of the ≈ 9 m² landing is negligible (08b M.5: ≈ 1.85 m² per metre of door). Its water still reaches the tank as B2 2.4.2.4 allows.

### P2 — Surface rill: water made visible (the strongest living-edge move; can combine with P1's underdrain split)

**Route:**
- At the opening end, the downspout (optionally a rain chain, 10 §3.6) and the threshold channel's outlet feed a sealed rill.
- Across the terrace the rill is a covered slot channel, flush, with a heel-safe grate whose openings are ≤ 6.5 mm in both directions (people both walk along it and cross it).
- From the path edge it becomes an open granite or precast runnel, 150 wide × 100 deep, down the bed to the garden inlet apron.

**Levels:** invert −120 at x −200; 1 % to −151 at x −3250; the runnel follows the bank to a rim at ≈ **−200**. The bank becomes ≈ **7.5 %** and the garden floor ≈ −500.

**Effects:**
- Rain is seen arriving at the garden from inside the room.
- No silt box is under the landing; a cobble sump at the rill head catches sediment.
- The garden reads as a gentle hollow rather than a pit.

**Constraints:**
- Sealed for its whole length within 5 m (VBBL intent).
- B651 8.2.4 (SOURCED): downspout water must not cross a route, hence the covered section.
- Leaf and moss cleaning twice a year.
- Source: 08 J16. Levels INFERRED.

### P3 — If P1 and P2 are rejected: terrace the bed

- A dry-laid stone or charred-timber check 200 high at x −4250, with the tree on the upper level.
- Two 11 % slopes instead of one 22 % slope.
- Slows sheet flow and holds mulch.
- Less effective than P1 and adds a construction element.

### P4 — Tree position and species

- In 3D, set the trunk **off the opening's centre line**, toward the end opposite the rill or pipe (≥ 2 m from it).
- The canopy then frames the glazing in elevation instead of hiding the head (see `exterior-elevation.png`). It still shades the glass from low west sun at 15–45° altitude, which the 600 eave cannot.
- Keep *Amelanchier* for April–May bloom and bird fruit, with sucker control (F19).
- Alternative: *Acer circinatum*, 1–8 m (08 I5). Both have no root-intrusion data (08 open question 10).
- Avoid *Malus* (worst intruder in the Swedish data).

### P5 — Seating

- **Not required in this section.** The brief has no bench; 3.25 m of terrace takes movable chairs; 08b M.5 already put the bench elsewhere along the façade.
- **For the 30-year horizon** (ageing occupants, a garden to watch), recommend one fixed perch at the terrace's outer edge, at the opening end away from the rill:
  - seat 450 high, 400 deep, back to the house, facing the garden;
  - backrest, plus one armrest on the house side;
  - an 850 × 1350 level space beside it;
  - under the tree's afternoon shade.
- Benchmarks: 08 K1–K8 (SOURCED B651/ADA/CAN-ASC).
- It also gives the flush path edge a detectable end.

### P6 — Open-wall insects and night

- **Retractable pleated insect screen** in the lift-and-slide jamb pocket. When the wall stands open on summer evenings, mosquitoes from the garden and moths drawn to the room come in.
- **Wildlife-friendly threshold lighting:** shielded, downward, ≤ 2700 K amber, motion-sensed, ≥ 50 lx at the threshold only in use (B651 8.2.9 SOURCED).
- Reason: protects moths and the bats that 08 L expects over the garden (INFERRED).

### P7 — Biodiverse roof

- F20 plus a visible fringe: 300 mm-tall native forbs (*Allium cernuum*, *Eriophyllum*) behind the gravel strip, so a soft green-brown line shows above the edge from the garden.
- Mandatory RCABC vegetated-roof maintenance is part of the timeline (09 R1).

### P8 — Rain-garden forebay

- A cobble forebay at the inlet: ≥ 50 deep, L:W 2:1, ≤ 10 % of the garden area (08 J11 SOURCED).
- It concentrates the ≈ 3 mm/yr of sediment where it can be shovelled out, which delays the year-30 medium replacement.

---

## 4. Top 3 changes that would raise this score most

1. **Make the rain garden work and live (F1–F6, P8).**
   - 200 mm ponding with 1:3 slopes;
   - subdrain near the rock top;
   - far spillway at crest +45;
   - headwall, cobble apron and flap at the inlet (`LINE0 = RIM − 300`);
   - beehive grate with a stone collar on the riser;
   - hydrozone planting with a pollinator bed and a bare-soil patch.
2. **Re-route and split the conveyance (F9, F8, P1, or P2).**
   - The surface line runs outside the lined zone at the opening end, ≥ 2 m from the trunk, with no liner penetrations.
   - The underdrain gets its own line to the riser.
   - Rim rises to −288 and the bank to ≈ 12 % (≈ 7.5 % with the P2 rill).
   - Add a 1000 mm tree pit on a level bench.
3. **Close the root and animal paths at the house (F7, F10, F11).**
   - Liner cut-off and HDPE barrier up to the paver underside at −1854, full width.
   - Shrub pocket opened to the bed as a notch (no 50 mm sliver).
   - Surface-1 bird markers on the glazing.

---

## 5. Decades timeline: what the tool should show for each outdoor element

All years are after construction. The ageing rates (sediment, clogging, root distances) are SOURCED in 08/08b. Sizes are INFERRED unless marked.

| element | 0 | 5 | 15 | 30 |
|---|---|---|---|---|
| **Threshold channel, grate, nosing** | Grate flush at −8, 13 mm rise, clean stainless. | Grit in slots. Silt basket emptied spring and fall. Splash streaks on the bottom 300 mm of glass and on the track (08b). | Grate fixings worn and replaced flush (GG47). Lip check: re-level any lip > 6 mm (B651). **Storm view:** water must leave the channel within minutes; if the basket is skipped, show water standing at the sill. | Grate replaced. Door replacement must not cut the liner turn-up (GG47). |
| **Lined landing** (−171 → −1854) | Crisp joints ≤ 6 mm, BPN ≥ 55, 1:60 fall. | Joints within 1 m of the door lose aggregate first; top up. Fine grey grime band. | Infiltration well below new; vacuum. Camera check of the underdrain from its riser. Slight settlement at the channel edge. | Lift and relay pavers; buried liner kept. |
| **Unlined terrace** (−1854 → −3250) | > 280 mm/h infiltration (MV23). | Moss and algae in joints near the bed edge and under the tree on the shaded side; leaf and fruit litter at the outer 0.5 m. Sweep. | Toward 28 mm/h (design floor); vacuum restores only partly (STEP-PP). First root lifts near the outer curb (GILMAN96). | Relay the outer 0.5–1 m after root pruning; joint aggregate replaced. |
| **Shrub pocket and huckleberry** | 0.5 m plant in pH 5–5.5 mix, mulch 40 below curb, hand-watered for 2 years. | ≈ 1.0 m; bees April–August; berries for birds in late summer. First prune to 1.0 m. | Held at 1.0 m and ≈ 1.2 m wide; roots fill the pocket and probe the base, stopped at the barrier and liner cut-off. Top-dress acid mix. | Renewal-pruned or replaced. Curb sound. |
| **Edge restraint and root barriers** | Barrier tops visible only at the path edge (+25), hidden by kinnikinnick. | Kinnikinnick knits the bank head. | Roots under the 600 barrier resurface ≤ 1.2 m beyond it, under the outer terrace. | Barriers intact (HDPE). Root-prune when relaying. |
| **Planting bed and bank** | Mulch 75 (40 below the curb), erosion blanket, plugs at 0.6 m, bare-soil patch, 22 % (or 12 % with P1). | Full groundcover; bloom sequence Mar–Oct; ground-nesting bees in the bare patch; leaf litter kept; earthworm casts. | Soil organic matter above installation level; soil-life rating one step up per 5 untilled years (08 I.2(c)). | Layered, self-mulching bed; occasional thinning. |
| **Tree** (*Amelanchier*) | ≈ 2 m single stem on a level bench, staked if needed. | ≈ 3 m, crown radius ≈ 1 m. April bloom; June fruit (bird peak = highest window-strike risk). Roots in the tree pit and the garden medium. Suckers removed yearly. | ≈ 5–6 m, crown radius ≈ 2 m. Crown lifted to ≥ 2.1 m over the path, kept ≥ 1.83 m from the roof edge (crown edge ≥ x −2450). Shades the glass from low W/E sun in summer. Litter into the gutter screen. | Mature 6 m (to 10 m possible). "Roots at drain: possible" for any tree within 6 m (08 I.2(b)). Camera check of drains. |
| **Rainwater conveyance** | Gutter lip 25 below the back, overflow spout at the end, boot cleanout, solid line (or rill) to the garden. | Gutter and leaf screen cleaned yearly (tree litter begins). Rill (P2): moss in the runnel, cleaned spring and fall. | Gutter re-hung or replaced. Line rodded from the cleanout. | Gutter replaced with the re-roof. PVC sound if glued. |
| **Rain garden** | Plugs at 0.6 m spacing, < 30 % cover; bare medium on the slopes under the blanket; apron and forebay clean. **Storm view:** 1-in-10 15-min event held; drain-down < 6 h. | ≥ 80 % cover. Sediment ≈ 15 mm. Mulch top-up; leaves out each fall; riser grate cleaned. Dragonflies, amphibians, birds bathing; bats over it at dusk from about year 10–15. | Sediment ≈ 45 mm; drain-down ≈ 12–24 h. Wet-zone sedges creep up the slopes. Tree roots keep the medium open. Subdrain rodded. | Sediment ≈ 90 mm (inside freeboard); drain-down 24–48 h (MV23 limit 48 h preferred). Remove the top 50–100 mm and replant. More frequent overflow (2050s 1-day 1-in-50 = 127 mm). |
| **Green roof** | Mat plus plugs; gravel edge strip clean. | Mixed sedum and forb cover; bee forage June–August; weeding under the mandatory maintenance contract. | Substrate settled; moss patches; membrane replacement window opens (15–25 yr). | Layers lifted and relaid at the re-roof; habitat logs replaced. |
| **People** | Wheelchair crosses the 13 mm threshold; 1700 landing clear; seated view over a 0.5 m shrub. | Furniture wear on landing joints; slip risk only in mossy shade at the outer terrace. | Lips re-levelled. Afternoon shade from the tree makes the outer terrace the summer sitting place (P5 perch). | Ageing occupants: perch, lighting and a flush threshold matter most. Landing relaid without a step. |
| **Animals and insects** | Screens clear; glazing markers in place. | Pollinators in the bed, pocket and roof; birds on fruit (markers prevent strikes); slugs under the curbs; ants in joints (harmless). | Stem- and ground-nesting bees established; bats; possible rodent runs if the riser grate or flap fails, so check them. | Mature layered habitat if maintained. If neglected: blocked riser, mosquito-holding silt basket, rats via open pipes, suckering thicket at the path edge. |

---

## Sources used

**Research files:**
- 08-landscape-occupation.md §0.3, H, I, J, K, L, open questions.
- 08b-threshold-paving.md M.1–M.7.
- 04-ecology.md (ev.eco.24–.28 summary).
- 09-assembly-options.md §7 (green roof R1).
- 10-exterior-finish.md §3.6–3.8 (rain chains, palette, timeline style).

**Web:**
- GOERT, *Amelanchier alnifolia*: https://goert.ca/species/amelanchier-alnifolia/
- UW Native Plant Propagation, *Amelanchier*: https://depts.washington.edu/propplnt/Plants/amelanchier.htm
- Construction Canada, "Bird-safe glass: codes and standards to know" (CSA A460:19): https://www.constructioncanada.net/bird-safe-glass-codes-and-standards-to-know/4/
- Search summaries for CSA A460 marker spacing, the UBC policy tiers, and the Vancouver Bird Friendly Design Guidelines (voluntary). The guideline PDF returned 403: https://guidelines.vancouver.ca/guidelines-bird-friendly-design.pdf
