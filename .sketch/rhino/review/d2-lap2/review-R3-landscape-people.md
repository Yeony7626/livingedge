# Detail 02, lap 2: review R3 (landscape, people and ecology)

Reviewer: R3. Model: `detail02-v2.mjs` / `detail02-v2.json` (d2v2), packet `review/d2-lap2/`. Read against my lap-1 review (`d2-lap1/review-R3-landscape-people.md`) and `changes-v2.md`. The Rhino layers were not touched.

**Datums.** Same as the model: x = 0 at the sliding frame's exterior face, exterior negative; y = 0 at FFL; w along the wall (normal slice w 0–1800; appearance run w −900 → 5400). Millimetres.

**How levels were obtained.** I recomputed every level from the spec's own functions. Key values:

| item | value |
|---|---|
| Paving `PT(x)` | −6 at the channel → −33.9 at −1848 → −57.3 at −3250 (1:60) |
| Liner outer upturn top | −143.9 (at x −1848) |
| Granite underside / bedding-1 bottom | −114.0 / −164.0 (at x −1852) |
| Bed `BT` | −107.3 at −3400 → −122.0 at RIM −5150 (0.84 %) |
| Rill floor `INV` | −120 → −152.3 at −3400 |
| Runnel floor | −207.3 → −222.0 at RIM |
| Rain garden | house rim −122, crest −250, pond floor (mulch top) −450, far rim −150; floor x −6134 → −6934; far slope ends at −7834 |
| Tree pit floor | −1111.5 / −1119.9 (at x −3900 / −4900) |

The script is in my scratchpad (not part of the project).

**Tags.**
- SOURCED (S) = from a research file (cited by section) or a fetched/searched web page (listed under Sources).
- INFERRED (I) = my reasoning or arithmetic.

---

## 0. Lap-1 findings status

Key:
- **fixed**: the model does what the finding asked.
- **partly**: some of it is done.
- **not fixed**.
- **made worse**.

Where `changes-v2.md` claims more than the model does, the "challenge" column says so.

| lap 1 | claim in changes-v2 | status in v2 | challenge / evidence |
|---|---|---|---|
| F1 ponding 100 → 200 | done | **fixed** | Crest −250 over mulch −450 = 200. Freeboard is 128 on the house side and 100 on the far side (S 08 J8). Storage ≈ 0.28 m³/m (I). |
| F2 spill path | done (notch in note) | **partly** | The far rim (−150) is lower than the house rim (−122). But the notch exists only as a note on `rg-riser`, and the ground beyond rises to −140 at −8000 (`subTop` ends `[−8000, FAR_RIM + 10]`). The drawn section has no way out. → minor F2 below. |
| F3 subdrain near rock top | done | **fixed** | Crown −1080 sits 5 under the choker; 135 of rock below the invert. |
| F4 inlet pipe | done (runnel + apron) | **made worse** | The pipe is gone (good), but the new outfall is dammed. The runnel floor is −222 at RIM; the apron and bank start at −122 there, a 100 mm wall. → **N1 blocker**. |
| F5 riser grate | done | **partly** | "Beehive grate" and "stone collar" exist only in the name and note; no grate part. The rush proxy `rg-plant-2` stands 167 mm from the riser centre, i.e. on the grate. → N7. |
| F6 RG and bed planting | done | **partly** | Three RG proxies only. The bed between path and garden has the tree and nothing else: no groundcover, perennials, bare-soil patch or late bloom. → major F6 (carried). |
| F7 root path | partial | **not fixed** (new gaps added) | The −1850 path is still open (liner top −143.9, granite bedding from −114). Three more gaps: the pocket w-side, the runnel crossing, and the path-barrier top 77 mm below the mulch. → major F7 (carried). |
| F8 tree soil | done | **fixed (volume)**, new defect | 6.1 m³ of bed and pit per 4.8 m opening, plus ≈ 7.9 m³ of rain-garden medium next to it: shared volume ≥ 10 m³ (S 08 I4). But the 1 m pit is an undrained sump in till. → **N6**. |
| F9 rainwater line by trunk | done | **fixed** | Line removed. |
| F10 50 mm paver sliver | done | **fixed** | Pocket opened to the bed; no sliver. The pocket's jamb side (w 0) is undefined → N12. |
| F11 bird collisions | note | **partly** | A note on `glass-1` gives surface #1 and 50 × 50 spacing. Missing: marker size, both panels, and the frit in the renders. → minor F11. |
| F12 terrace base outlet | open | **not fixed** | Conditional on a soil test; carried. |
| F13 landing fall | done | **fixed** | 1:60. |
| F14 gutter overflow at door | note (scupper away from door) | **not fixed (problem moved)** | The box gutter's house-side leg tops out at 3240, 82 below its front face (3322) and 10 below the drip-edge hem (3250). Overflow now goes behind the gutter into the sub-fascia, not onto the landing. → **N5**. |
| F15 two paver specs at −1850 | partial | **partly** | Grate specified. The change is now bigger: concrete 60 vs reclaimed granite 80, on different bedding levels, with no restraint at the line. Granite joint width and slip finish are unspecified. |
| F16 mulch flush | done | **fixed** | Mulch 50 below the restraint and the pocket curbs. |
| F17 22 % bank | done | **fixed** | Bed at 0.84 %. |
| F18 shrub view / alkaline soil | partial | **partly** | Off-axis at w 500, 1.5 m. pH not addressed. |
| F19 Amelanchier suckers | open | **not fixed** | Exposure has grown: the pocket now opens to the bed, and the path barrier top is below grade. |
| F20 green-roof habitat | partial | **partly** | Name says "biodiverse … native forb". Substrate is a uniform 80 mm pumice; no depth variation, sand or deadwood. |
| F21 wheelchair / seated proxies | open | **not fixed** | — |
| F22 silt box, screen, flat channel | note | **not fixed** | `grate-screen` is still modelled full length. Silt box is a note only. Channel floor flat at −120. |
| F23 open 12 mm weeps | open | **not fixed** | Exposure has grown: the rill is now a sheltered dry tunnel from the bed to the channel. |
| F24 trench dams | n/a | **fixed** (line removed) | Still needed on the riser-to-tank and underdrain outlet trenches if they run toward the house (I). |
| P1 split underdrain / surface water | — | **adopted** | Underdrain has its own outlet; surface water goes by rill. |
| P2 surface rill | adopted | **adopted, with N1 error** | — |
| P3 terrace the bed | — | **superseded** | The bed is flat. |
| P4 tree off-axis | — | **partly** | Tree at w 900, near the jamb end. Sucker control open. |
| P5 seating perch | — | **not adopted** | — |
| P6 insect screen, wildlife lighting | — | **not adopted** | — |
| P7 legible biodiverse roof | — | **not adopted** | R5 F12 is also open. |
| P8 forebay | — | **not adopted** | Apron only; see the N1 fix. |

**Tally of lap-1 items:**
- **fixed:** 9 (F1, F3, F8 volume, F9, F10, F13, F16, F17, F24).
- **partly:** 7 (F2, F5, F6, F11, F15, F18, F20).
- **not fixed:** 7 (F7, F12, F14, F19, F21, F22, F23).
- **made worse:** 1 (F4 → N1).

---

## 1. Score: **6 / 10** for landscape, people and ecology (lap 1: 5)

### What works (better than v1)
- **The water chain is now the right idea.** Roof → box gutter → (rain chain) → covered rill → open stone runnel → rain garden. Water can be seen arriving, there is no buried pipe near the footing, and there are no pipe penetrations of the liner. The bed is nearly flat (0.84 %), so the tree stands level and the 22 % bank is gone.
- **The rain garden is hydraulically sound in itself:**
  - 200 mm ponding, freeboard 128 / 100;
  - far rim lower than the house rim;
  - 1:3 slopes, floor 800 wide (≥ 600, S 08 J1);
  - 450 medium, 100 choker, 300 rock;
  - subdrain near the rock top;
  - stone mulch so nothing floats into the riser.
- **The tree has a 1 m pit** and continuous soil into the rain-garden medium. Combined volume meets the City's shared-soil figure (S 08 I4).
- **The shrub pocket opens to the bed** (no sliver). The shrub is off the opening axis, and the pocket barrier is cast into the curb (a good detail that should be repeated everywhere).
- **The landing is 1:60** with a tolerance margin. The landing underdrain is separate.

### What holds the score down
- **N1 (blocker):** the runnel ends in a 100 mm dam at the rain-garden rim. The rill and runnel never drain. In design storms the backwater reaches the sill-pan nose.
- **The root enclosure around the lined landing is still open.** There are now four leak points (F7).
- **People:**
  - the threshold is now 16 mm high because of the new stainless rails (N2);
  - the door has no accessible operation (N3);
  - the rain chain and rill sit in the wheelchair landing (N4);
  - the garden itself is view-only from a wheelchair.
- **Ecology is thin.** The bed has no understorey, no bare-soil nesting ground and no July–October bloom (F6). The tree pit is an undrained sump (N6). Bird markers exist only as a note (F11).
- **Roof water:** the box gutter overflows to the house side (N5).

All of these have local fixes. Fixing N1 alone lifts the score to about 6.5. Fixing N1, F7, N2–N6 and F6 lifts it to about 8.

---

## 2. Walking the edge

### 2.1 A wheelchair user (manual chair, eye 960–1250, chair ≤ 1250 long × 700 wide; S 08 K12)

1. **Inside.** Polished concrete slab, level. The user reaches the lift-and-slide handle.
   - The handle must be lifted through a turn, then the panel pushed about 2.4 m.
   - Heavy lift-and-slide sashes (300 kg+ is common) are hard to operate by hand; the maker sells a lift assist and a motor drive for this reason (S, G-U).
   - The research already flagged it: "check B651 4.2 operating force … or specify a motorised lift-slide" (S 11 §3.3).
   - v2 does neither (R1 F20 open). **N3.**
2. **Over the sill.**
   - Apron 0 → track +5: a 5 mm vertical step (≤ 6, fine; S 11 G13).
   - Stainless rail +5 → +10: 6 mm wide.
   - Bevel +5 → −6 at 1:2.
   - Grate −6, slots ≤ 6.5 parallel to the door.
   - **The total from the landing (−6) to the rail head (+10) is 16 mm**, over the 13 mm threshold limit (S, B651 5.2.6 via 11 G13). v1 was 13 mm; the rails were added in v2 (R4's no-aluminium sill). **N2.**
3. **Landing.** 1:60 concrete planks with joints ≤ 6 and BPN ≥ 55 (S 08b M12). It is 1.68 m deep to the liner edge and continues level at 1:60 to −3250. Turning is fine. A 170 mm rill grate crosses it perpendicular to the door (appearance run w 1590–1760); its aperture pattern is unspecified (N8).
4. **At −1852.**
   - Concrete planks 60 meet reclaimed granite 80 on different bedding levels, with no restraint at the line.
   - Over 5–15 years this is where a lip > 6 mm will appear (S B651 Table 1 via 08b; mechanism I). → F15.
5. **Terrace edge at −3250 / −3400.**
   - A 150 concrete restraint, then a 50 mm drop into wood chips. That is under the 75 mm edge-protection threshold (S, B651 8.2.5 via 08b M15).
   - The user can go no further. The tree, runnel and water, which are the point of the living edge, are view-only from 3.4 m away. → P3.
6. **Shade and heat (I).**
   - On a west face the terrace takes full afternoon sun and its only shade is the tree at the jamb end.
   - On an east face it is a cool afternoon terrace.
   - Either way, the useful summer sitting place is near the tree.

**Verdict:**
- The ground plane is good, once N2 and F15 are fixed.
- The two real barriers are the door operation (N3) and the dead end at the bed (P3).

### 2.2 A seated occupant inside (eye +1200 at x +1500)

Sight lines (I, from the spec levels):

| object | what the seated occupant sees |
|---|---|
| Sash bottom rail +120 | No obstruction. |
| Shrub (w 500, top +1410) | A side mass at the jamb end, ≈ 24° off the centre of a 4.8 m opening. Acceptable (F18 partly). |
| Tree crown | Underside ≈ +1785, above eye level. The canopy frames the top of the view; it does not block it. |
| Rain-garden floor | The house rim (−122) hides it as far as x −6800. Only the last 130 mm of the 800 mm floor and the far slope are visible. |
| Ponded water at the crest (−250) | Visible from x −5794 out to −7534, i.e. 1.74 of its 2.0 m width, when full. |
| Slough-sedge proxy (x −5600, top +428) | Sits in exactly that line. In a few years the house slope's sedges will hide the water. |
| Runnel (53–100 mm deep, 170 wide, 5–7 m away) | Invisible from a seat. |
| Outfall at the rim (and the proposed N1 lip at −200) | Hidden below the bed surface: the sight line passes ≈ 47 mm under it seated and ≈ 36 mm standing (eye +1600 at x +1100). |

**Verdict.** From inside, the only water "made visible" is the rain chain and, briefly, the pond. Fix by:
- keeping the house-side slope low (≤ 400) and putting tall emergents on the far slope (N7, P4);
- making the rain arrive somewhere visible from the room (P1, P2).

### 2.3 A child (3–8)

- **Threshold.** The stainless rail head (+10) is a toe-stubber in socks and slippery when wet (I).
- **Grates.** Slots ≤ 6.5 mm take no fingers; good.
- **Pocket and tree.** The pocket huckleberry and the saskatoon both carry edible fruit, which is a good thing at child height (I).
- **The runnel is the most attractive play object in the section:**
  - children will dam it with stones and mulch (I);
  - in v2 it already holds standing water up to 100 mm deep after every rain (N1), which brings algae, mosquitoes (larvae need 3–7 days; S 08 L11) and ice in a cold snap;
  - with the N1 fix it drains in minutes, and a child's dam only backs water up the runnel, never toward the house.
- **Loose stones (I).** The forebay/apron cobbles (75–150) and the 75 mm stone floor mulch can be thrown at a 5 m glass wall 5–7 m away. → N10.
- **Rain garden.** At most 200 mm deep, for < 48 h (S 08 L11), with 1:3 slopes a child can climb out of. The beehive grate stops arms going into the riser. Supervision of toddlers as with any water (I).

### 2.4 Someone carrying things in the rain

- **Shelter.** The overhang (gutter face at x −735, soffit tip ≈ 3112) gives an overhang ratio ≈ 0.24. That is "medium, close to high" exposure (S, CMHC via 11 §3.4). In any wind the person is wet while opening the door (I).
- **Nowhere to put things down.** The lift-and-slide needs a hand on the handle and a push. With bags in both hands it cannot be opened (N3).
- **At the jamb end they meet:**
  - the rain chain hanging at x ≈ −690 over the rill head;
  - splash and, in a frost, ice on the walking surface;
  - the gutter scupper.
- **Rain-chain capacity.** Vendor maximums are 730–1700 L/h, i.e. 0.2–0.47 L/s (S, Seo). The 1-in-10, 15-minute peak from 40–106 m² of roof is 0.45–1.5 L/s (S intensity 08 J14/J15; arithmetic I). The chain will overspill in design storms (N4).
- **Inside.** Wet soles go straight onto a polished slab. 11 T20 asks for a ≥ 610 mm mineral strip at the sill (S) but no slip-resistant zone or mat (N9).
- **At night.** No lighting is specified (P6 not adopted). The 50 mm edge drops, the grates and the rill are unlit.

### 2.5 Native bees

- **Forage.** Strong April–June: saskatoon (Apr–Jul; S 08 I5), huckleberry (Apr–Aug; S 08b M19), ninebark, then roof sedum (Jun–Aug). Weak July–October at ground level: nothing in the bed blooms late (F6).
- **Nesting.** About 70 % of native bees nest in the ground (S 08 L2), but:
  - every bed surface is 75 mm wood chips;
  - the rain-garden floor is stone over medium;
  - there is no unmulched sunny patch and no standing hollow stems.
  - Nesting habitat is effectively zero (F6, P5).
- **Pesticides.** None specified; keep it that way (S 08 L.2(b)).

### 2.6 Birds

- **Food.** Saskatoon fruit in June–July and huckleberries in late summer and autumn (I).
- **Cover.** Ninebark and huckleberry.
- **Water.** The runnel, forebay and pond edge are shallow bathing water.
- **Collision risk is high:**
  - the fruiting tree is 4.4 m from 2.6 m of reflective low-e glass;
  - in the only controlled distance study, the share of window strikes that were fatal rose from 0 % at 1 m to 59 % at 5 m and 69 % at 10 m (S, Klem et al. 2004);
  - the markers are a note only (F11);
  - an east façade reflects the lit garden in the morning, the peak activity period (I).
- **Predators (I).** Cats ambush from dense sedge at water edges. Keep the forebay/lip edge open and low (N7) so bathing birds can see.
- **Gutter (S 08 L.3).** An open-topped box gutter invites nesting; a leaf guard also keeps birds out (N5).

### 2.7 Soil life

**Good:**
- 450 mm bed medium plus a 1 m pit;
- arborist chips with leaf litter left in place (S 08 I7);
- no tillage; continuous soil into the rain garden.

**Bad:**
- the pit bottom becomes anoxic in winter (N6);
- the rain-garden floor has stone mulch only, so there is no organic input (N10);
- the pocket is bounded by two concrete curb faces that leach lime into an acid-soil pocket (F18; I);
- the bed is narrow (1.75 m) and will be compacted during construction unless it is fenced from day one (S 08 I1: target bulk density < 1.40 g/cm³).

### 2.8 Roots (the tree, year 5–30)

- **Where they go.** Roots fill the pit and the rain-garden medium first; they are drawn to the wettest, best-aerated soil (S 08 I.2(b)).
- **Then the bases.** They reach the unlined terrace base through any of four gaps:
  1. under `pocket-curb-w` (curb bottom −322/−337; pocket soil down to −707, no barrier);
  2. under the runnel walls (150 deep) at w 1540–1800, where the 600 barrier stops;
  3. over the top of `root-barrier-path` (top −184.3, i.e. 77 below the mulch), down the 3 mm gap and under the restraint (−357);
  4. across the open bedding above the liner at −1850: the liner top is −143.9, and the granite bedding runs from −114 to −164, giving 30 mm of continuous No. 8.
- **The end point.** From gap 4 they cross into `base-lined` and enter the perforated underdrain; perforations are entry points (S, OMAFRA via 08 I.2(b)).
- **Timing.** Roots that meet a barrier go under it and resurface within 1.2 m (S, GILMAN96). This is year-15 to year-30 damage (S 08 I.2(b)). → F7.
- **The runnel.** Its mortared walls are 640 mm from the trunk on a 150 mm "foundation" and will be lifted by root flare and buttress roots by year 15 (I) (N11).

### 2.9 Water: roof to rain garden and overflow

| step | v2 geometry | check |
|---|---|---|
| Green roof | Pumice 80 on pumice drainage 30; drains through the perforated edge profile across the 500 gravel strip to the 26 % cant | OK. Roof water passing through pumice carries little sediment (I). |
| Box gutter | 77 wide × 115 deep at the back; back leg top 3240, front face 3322; outlet and scupper by note | **Overflow spills behind the gutter (N5).** 77 mm is too narrow to clean by hand (I). |
| Rain chain | Lands at x ≈ −690 on the rill head | **0.2–0.47 L/s capacity vs 0.45–1.5 L/s peak; in the landing (N4).** |
| Threshold channel | Floor flat −120; full-length 1.0–1.2 mm screen; silt box by note | Standing water and a blinding screen (F22). |
| Rill (covered) | −120 → −152.3 at 1 %, 170 wide, grated | Falls correctly. Crosses the liner upturns with boots (R2). |
| Rill → runnel | Rill mouth −152.3 → runnel floor −207.3 | A 55 mm step, a nice small cascade. |
| Runnel (open) | −207.3 → −222.0 at RIM (0.84 %) | **Ends against the apron/bank top at −122: a 100 mm dam (N1).** |
| Inlet to garden | Apron top −122 → −322 (1:3) | Should sit ≥ 50 below the inflow (S 08 J11). Here it is 100 *above*. |
| Ponding | Crest −250, floor −450 | 200 mm ✓ (S 08 J8); 0.28 m³/m (I). |
| Filtration | Medium 450, choker 100, rock 300, subdrain crown −1080 | ✓ (S 08 J2–J5). |
| Overflow | Riser 200 at −250, "beehive grate", to tank and storm | Grate not drawn; rush on top (N7). The tank and storm route ✓ (S 08 J.0). |
| Emergency | Notch at −205 (note); ground beyond rises to −140 | No drawn exit (F2). The house side is safe: the emergency level ≈ −180 vs the house rim −122 (I). |

**Hydraulic consequence of N1 (I):**
- Water leaves the runnel only by spilling over its own end at −122 (weir 170 wide).
- Head over that weir: 14 mm at 0.5 L/s, 23 mm at 1 L/s, 36 mm at 2 L/s. That puts the water level at −108 / −99 / −86, nearly level back along the rill.
- The sill-pan nose is at −103 and the channel's house-wall top at −92:
  - any catchment above ≈ 52–68 m² drained to this outlet submerges the pan outlet in the 1-in-10, 15-minute storm (40–52 mm/h; S 08 J15);
  - from ≈ 2 L/s, water reaches the channel's house wall.
- Between storms, the rill (from x −372 outward) and the whole runnel hold standing water.

---

## 3. Findings

Severity counts: **1 blocker · 7 major · 16 minor.**
- Majors: N2–N6 plus carried F6 and F7.
- Minors: N7–N12 plus carried F2, F11, F12, F15, F18–F23.

### Blocker

**N1 (blocker) — The runnel outfall is dammed 100 mm by the rain-garden rim.**
- Parts: `runnel-floor`, `runnel-walls`, `rg-apron`, `rg-medium`, `rill-floor`, `channel`, `pan`.
- **Problem:**
  - The runnel floor reaches the rim at −222.0. At x = RIM the apron top and bank are at −122 (`rg-apron` starts at `[RIM, RIM_Y]`). Water has to rise 100 mm to leave.
  - The runnel and the outer rill hold stagnant water after every rain: mosquitoes (3–7 days; S 08 L11), algae, leaf rot, ice.
  - In design storms the hydraulic grade sits at −108 to −86 back to the threshold channel, at or above the pan nose (−103) (§2.9).
  - The inflow is also only 28 mm above the crest. 08 J11 asks ≥ 50 mm drop to the garden surface (S) and ≥ 50 mm above the crest (I).
- **Fix: a lip, a forebay and a steeper runnel (levels in spec coordinates).**
  1. `runnel-floor`: top from `[BED0, −160]` to `[−4950, −195]` (2.3 %), where it stops on the lip. Floor 50 thick; walls' bottoms 10 below. The runnel is 53 deep at the path edge and ≈ 75 near the rim. It starts 7.7 below the rill mouth (−152.3).
  2. New `rg-lip` (per opening, `reclaimed-stone`):
     - poly `R(RIM − 150, −260, RIM + 200, −200)` (x −5300 → −4950), runs `[[RILL_W[0] − 50, RILL_W[1] + 40]]`;
     - top −200: a 5 mm step down from the runnel floor end, and 50 above the crest;
     - cantilevers 150 past the rim, with a 10 × 10 drip groove 20 back from the nose;
     - the runnel walls run on over its back 200.
  3. New `rg-forebay` (per opening):
     - river cobble 75–150, half-bedded, on 407 g/m² geotextile;
     - poly `R(RIM − 700, −380, RIM − 100, −300)` (x −5850 → −5250), w 1525 → 1825 (L:W 2:1; ≪ 10 % of the garden; S 08 J11);
     - top −300: a 100 mm free fall from the lip (≥ 50; S);
     - it is P8's sediment trap.
  4. Cut a notch for it in `rg-medium` (x −5150 → −5850, w 1525 → 1825, down to −380). Retain the sides with `rg-cheeks`: dry-laid reclaimed stone 150 wide on each side (w 1375–1525 and 1825–1975), tops on the 1:3 bank line, bottoms at −400.
  5. `rg-apron` moves to the forebay's far edge: poly `[[−5850, −300], [−6300, −450], [−6300, −530], [−5850, −380]]`, w 1525 → 1825.
- **Result (I):**
  - The rill and runnel drain dry within minutes.
  - At design ponding (−250) the lip is 50 mm clear.
  - In an emergency (notch −205 + head ≈ −180), backwater reaches only the outer half of the runnel (its floor = −180 at mid-length). It never reaches the rill (−152) or the threshold.
  - If P1 moves the runnel to the jamb, apply the same levels at the new w.
- **Basis:** 08 J11 (S: ≥ 50 mm drop; rock where flow concentrates; forebay ≥ 50 deep, L:W 2:1, ≤ 10 % of area). BCH-SFD via 08 J8 (S: overflow before backing up). 08 L11 (S: larvae need 3–7 days). Weir arithmetic and levels I.

### Major

**F7 (major, carried) — The root enclosure around the lined landing is still open in four places.**
- Parts: `liner`, `pavers-1`, `bedding-1`, `base-1`, `pocket-curb-w`, `edge-restraint`, `root-barrier-path`, `runnel-walls`; new `liner-edge-curb`, `root-barrier-liner`, `root-barrier-pocket-w`, `root-barrier-edge`.
- **Problem:** see §2.8, gaps 1–4. `changes-v2.md` admits gap 4 only. The path barrier is also not "butt-sealed" in any useful sense: the runnel walls are 150 deep, the barrier 600.
- **Fix: one sealed enclosure, using v2's own good detail (barrier top cast 20 into concrete) everywhere.**
  1. `liner-edge-curb` (new):
     - 150 × ≈ 300 reclaimed-granite soldier course or cast-in-place concrete at x −1852 → −2002;
     - top at PT, bottom PBT − 20 (−334.0 → −336.5), runs SPAN, cuts the rill (if the rill stays);
     - `pavers-1`, `bedding-1` and `base-1` start at −2002;
     - this also gives the concrete/granite change a fixed edge (F15).
  2. `root-barrier-liner` (new): HDPE 2 mm, path `[[−1927, −315.3], [−1927, −700]]` (top cast 20 into the curb underside), runs SPAN, boot-welded where the rill crosses.
     - Minimum alternative: raise the liner's outer upturn to `PT − 62` (−95.9, 2 under the plank underside) and add an HDPE skin at x −1851 from −95.9 to −700.
  3. `root-barrier-pocket-w` (new):
     - HDPE under `pocket-curb-w` at w 1049–1051, x −2300 → −3325;
     - top cast 20 into the curb and restraint undersides (y = PBT(x) + 20 = −302 → −317; −337 under the restraint), bottom −700.
  4. `root-barrier-edge` replaces `root-barrier-path`:
     - x −3325 (restraint centre line), top cast 20 into the restraint underside (−337.3), bottom −700;
     - runs w 1050 → L, continuous under the rill (rill bottom −171.5 here);
     - no runnel gap and no top below grade.
  5. Jamb side of the pocket (w 0): until the jamb zone is designed (N12), return a barrier at w 0 from x −2300 to −3400, top 25 above the pocket mulch (S 08 I2).
- **Basis:** 08b M16 (S: barrier on the house side of the pocket **and** at the lined-zone edge, ≥ 600 below finished surface, below the underdrain invert). GILMAN96 / SMILEY09 (S: under and resurfacing within 1.2 m). OMAFRA (S: perforations). 08 I2 (S: top above grade so roots cannot cross over). Casting into the concrete is I, after the v2 `root-barrier-pocket` note.

**F6 (major, carried) — The bed has no understorey, no nesting ground and no late bloom; the rain-garden planting is a placeholder.**
- Parts: new `bed-groundcover`, `bed-perennials`, `bed-shrub`, `bed-bare-patch`; `rg-plant-1..3`.
- **Problem:**
  - The 1.75 m bed is mulch plus a trunk.
  - Bloom runs April–June plus roof sedum; nothing from July to October at ground level.
  - No bare soil for the ≈ 70 % of native bees that nest in the ground.
  - No standing stems.
- **Fix (proxies at year-5 size; spacing ≤ 0.6 m; S 08 I6):**

  | part | species | position (spec coordinates) |
  |---|---|---|
  | `bed-groundcover` | *Arctostaphylos uva-ursi*, h 150 | 300 band x −3400 → −3700, full width except the runnel. Holds the bed head; gives a cane-detectable edge. |
  | `bed-perennials` | *Achillea millefolium* (Apr–Oct; S 08 L1) and *Symphyotrichum subspicatum*, Douglas aster (Jul–Sep, moist meadows; S KPU / Phoenix) | h 500–700 at x −3800, −4700; w 300, 1300 |
  | `bed-shrub` | *Ribes sanguineum*, Mar–Jun, hummingbirds (S 08 L1) | x −4900, w 1400, h 1500, outside the tree's 1.3 m crown proxy |
  | `bed-bare-patch` | — | 1.0 m², unmulched, untilled sandy loam, x −3500 → −4000, w 1200 → 1500 (sunny, outside the crown) |

  Plus: leave hollow stems standing over winter; leaves 50 deep (S 08 L3); no pesticides.
- **Basis:** 08 L1–L3 (S), 08 I6 (S), 08 J7 hydrozone list (S). Positions I.

**N2 (major) — The threshold is now 16 mm: the new stainless rails stand 5 mm proud of the track.**
- Parts: `track`, `track-rails`, `nosing`.
- **Problem:**
  - `track-rails` is `R(40, 5, 46, 10)` on a track whose top is +5. The landing and grate are at −6.
  - The rise from the walking surface to the highest point is 16 mm. The limit is 13 mm (S, B651 5.2.6; VBBL 3.8.3.6.(5) via 11 G12–G13).
  - v1 had 13 mm and no proud rails.
  - Wet stainless rail heads are also a slip and toe-stub edge (I).
- **Fix (coordinate with R1):** recess the rails so their heads are flush with the track top, i.e. `track-rails` `R(40, 0, 46, 5)` in a 6 × 5 groove in `track`. Total: −6 → +5 = 11 mm ✓.
  - Barrier-free lift-and-slide sills with the running rail fully recessed exist (S, SIEGENIA ECO PASS, maker claim).
  - Alternative: drop the whole track by 5 (`track` `R(0, −47, 180, 0)`, rails +5, nosing 0 → −6); this moves the weeps (R1).

**N3 (major) — The "accessible" wall cannot be operated by the people it is for.**
- Parts: `door-verticals` (spec note); new `door-drive` (virtual, per opening).
- **Problem:**
  - A manual lift-and-slide needs a lifting turn of the handle, then a push on a 300 kg-class sash (S, G-U: 300 kg+ "not unusual"; lift assist reduces handle force by up to 50 %).
  - A wheelchair user, an older occupant or someone carrying a tray cannot do this reliably.
  - The ADA benchmark for sliding-door opening force is 5 lbf (≈ 22 N), with hardware usable from both sides when open (S, idighardware summary of ADA 404).
  - 11 §3.3 already asks for a force check or a motor (S). R1 F20 is open.
- **Fix:**
  - Specify a motor-driven lift-and-slide drive (e.g. the G-U HS ePOWER class, whose maker says it is barrier-free to DIN 18040; S) on the operable panel.
  - Controls 900–1100 above floor on both faces (S, V1 3.8.3.6.(4) / B651 5.2.7.1 via 11 §3.3).
  - Obstacle sensing; manual release.
  - Minimum: a lift assist, with the maker's handle force stated ≤ 22 N.
  - Add as a virtual part with the drive's mass for R4.

**N4 (major) — The rain chain, rill head and (undefined) silt box sit in or beside the wheelchair landing.**
- Parts: `box-gutter` (note), `rill-grate` (note), `channel` (note), `RILL_W`.
- **Problem:**
  - The notes put the rain chain at the "rill head", which is at x −171.5. The gutter is at x −650 → −735, so the chain lands on the landing at x ≈ −690.
  - In the appearance run the rill is at w 1590–1760, mid-opening: a hanging chain, splash and winter ice on the route out of the door.
  - The silt box's location is not drawn. 08b M9 puts it "beside the opening, not in the wheelchair landing" (S, GG47).
  - B651 8.2.4: downspout water must not cross a pedestrian route (S via 08 J16).
  - Rain-chain capacity (0.2–0.47 L/s; S Seo) is below the design peak (0.45–1.5 L/s; I from 08 J14–J15), so it will overspill.
- **Fix (a, recommended; also P1): move the whole water chain in front of the solid jamb wall.**
  1. `RILL_W = [−585, −415]`.
  2. Normal-mode `SPAN = [−900, 1800]`, so the chain is in the drawn slice.
  3. `gutter-spout` (new, per opening): 100 × 75 charcoal or stainless open spout off the gutter end at w −500, invert 3297 (25 below the gutter front), projecting to x −950.
  4. `rill-head-basin` (new, per opening):
     - reclaimed granite, inner 500 × 500 × 200 deep, x −700 → −1200, w −750 → −250, rim flush with the paving;
     - cobble-filled to kill splash, weep to the rill so it drains dry.
  5. `silt-box` (new): x −40 → −340, w −450 → −150, flush solid lid, removable perforated basket that drains dry. Solid ⌀100 at 1 % to the basin.
  6. The rill runs from the basin (x −1200) to BED0 at w −585 → −415, then the runnel to the N1 lip at the same w.
  7. The rill is open except where a route crosses it: a flush 1200-wide granite slab "clapper" crossing.
  8. The landing becomes uninterrupted; the liner loses both rill boots.
- **Fix (b, minimum):**
  - Keep the rill but move the spout, basin and silt box beyond the jamb (w ≤ −300).
  - Replace the rain chain with the spout, or with a cup chain inside a basin sized for the peak.

**N5 (major) — The box gutter's house-side leg is 82 mm lower than its front face, so overflow goes behind the gutter.**
- Parts: `box-gutter`, `edge-metal`, `sub-fascia`, `soffit`; new `gutter-scupper`.
- **Problem:**
  - Back-leg top 3240; front-face top 3322; drip-edge hem 3250.
  - When the outlet blinds with leaves (the tree is 3.7 m away), or the flow exceeds the outlet, water rises past 3240 and spills between the gutter and the sub-fascia, onto `gutter-skirt`, the sub-fascia and the soffit tip.
  - This is the failure 08 lists: front lip higher than the back wets the fascia, soffit and cavity top (S, 08 J failure table, FHB).
  - The "scupper away from the door" has no level, so it cannot be checked.
- **Fix:**
  1. Back leg up to **3347** (25 above the front face; S, 08 J15 "front lip ≈ 25 lower"), inboard of the drip edge. `edge-metal` hem down to 3290, lapping ≥ 50 inside the gutter.
  2. `gutter-scupper` at the jamb end: 100 wide, invert 3297 (25 below the front), discharging through N4's spout into the basin.
  3. Leaf guard over the gutter. This also keeps birds from nesting in it (S 08 L.3).
  4. Consider ≥ 100 internal width for hand cleaning (I; R5 owns the face).

**N6 (major) — The 1 m tree pit is an undrained sump in till.**
- Parts: `bed-soil` (pit), `subgrade`; new `pit-link`.
- **Problem:**
  - The pit floor (−1111.5 → −1119.9) sits 470 mm below the bed soil (−632 / −647) and 250 mm of compacted till away from the rain-garden rock (x ≤ −5150, top −1075).
  - On Vancouver till (S, 08 J1 "dense tills perch water") the lower ≈ 0.5 m of the pit will hold perched water through winter and spring.
  - That is the classic planting-pit "bathtub" (S, Purdue extension: amended pits in compacted soil hold water; lateral drainage out of the pit is the remedy).
  - *Amelanchier* will suffer root decline in its main volume (I).
- **Fix:**
  - Pit floor falls 2 % toward the garden: `[PIT[0], −1100]` → `[PIT[1], −1120]`; scarify 300 at the bottom (S 08 I1).
  - Add `pit-link`: 19 mm clear stone in nonwoven geotextile, poly `R(−5160, −1140, −4890, −1080)`, runs SPAN.
  - It joins the pit floor to `rg-rock`. Water leaves whenever the rock is below −1080, which the subdrain (crown −1080, invert −1240) ensures between storms (I).
  - No plastic pipe, no new outlet.

### Minor

**N7 (minor) — Rain-garden proxies are placed against the hydrozones and the riser.**
- Parts: `rg-plant-1..3`, `rg-riser`; new `rg-riser-grate`.
- **Problem:**
  - `rg-plant-2` (rush) is 167 mm from the riser centre. It will grow over the grate and root into its slots.
  - `rg-plant-3` (ninebark, "upper far slope") stands at GS −328, 78 below the crest: in the ponding zone, not the upper slope.
  - `rg-plant-1` (tall sedge, 700) on the house slope blocks the seated view of the water (§2.2).
  - The grate is not a part.
- **Fix:**
  - `rg-plant-2` → x −6250, w 300 (≥ 450 from the riser; S 08 J6 keep mulch and plants off the grate; distance I).
  - `rg-plant-3` → x −7600 (GS −228, above the crest).
  - Tall sedge (*Carex obnupta*) → far slope x −7350.
  - House slope: low *Iris tenax* and *Achillea* (≤ 400) at x −5300 (S 08 J7 rim list).
  - Add `rg-riser-grate`: cast domed grate ⌀250, −250 → −150, slots ≈ 12 (S 08 J9; size I).

**N8 (minor) — Rill grate apertures are unspecified, and people both cross and follow the rill.**
- Part: `rill-grate`.
- **Fix:** 316 perforated or square-mesh plate with openings ≤ 6.5 mm in both directions (no 13 mm sphere passes, whatever the direction of travel), slip-resistant top, removable for cleaning. Moot under N4 (a), except at the clapper crossing.
- **Basis:** 08 J16 / 08b M8 (S: ≤ 13 mm sphere, slots perpendicular to travel; 6.5 heel-safe).

**N9 (minor) — Wet soles meet a polished slab.**
- Part: `slab` (finish note).
- **Fix:** honed, not polished, finish from x 257 to 1457 (≥ the 610 strip of 11 T20, S), or a 20 mm recessed coir/rubber mat well 1200 × operable-panel width.
- **Basis:** B651 4.3.1 firm, stable, slip-resistant (S via 08b M12). Mat is I.

**N10 (minor) — Rain-garden slopes are unprotected; floor mulch is all stone; loose stones face the glass.**
- Parts: `rg-medium`, `rg-mulch`, `rg-apron`.
- **Problem:**
  - The 1:3 slopes are bare medium at year 0 (erosion, S 08 J year 0–1).
  - Stone on the whole floor removes the organic surface that feeds soil fauna (I).
  - Cobbles and stone mulch are throwable at the glass (I).
- **Fix:**
  - Coir erosion blanket plus 75 double-shredded wood on the slopes (S 08 J6, STEP).
  - Stone only within 600 of the riser and in the forebay.
  - Forebay cobbles half-bedded; ≥ 150 boulders at the edges.

**N11 (minor) — The mortared runnel is 640 mm from the trunk.**
- Parts: `runnel-walls`, `tree`.
- **Fix:** N4 (a) moves the runnel 1.4 m from the trunk. Otherwise move `tree` to w 300, or found the runnel walls on a 300-deep concrete strip.
- **Basis:** I (root flare and buttress growth).

**N12 (minor) — The jamb zone (w < 0) has no ground.**
- Parts: `subgrade`, `pocket-*`.
- **Problem:** in appearance mode the liner, landing and pocket run only w ≥ 0. In front of the jamb wall, `subgrade` lies at the bottom of the landing and terrace bases. That leaves a 0.9 m-wide, ≈ 300 mm-deep void beside the landing and the pocket's open w = 0 side.
- **Fix:** define it, as P1's water margin or as paving with a curb at w 0 carrying the F7.5 barrier.

**F2 (minor, carried) — The emergency spill path is a note.**
- **Fix:**
  - Draw `rg-spillway`: 1.0 m notch in the far rim at the end away from the opening, sill −205, 150 cobble on geotextile, swale falling ≥ 2 % to a lawn/infiltration area or the lot's storm inlet, never onto a neighbour (S, VBBL 2.4.2.4 via 08 J.0).
  - In the slice, change `subTop` tail `[−8000, FAR_RIM + 10]` → `[−8000, FAR_RIM − 4]`.
  - Extend the J and S views to −8600.

**F11 (minor, carried) — Bird markers.**
- **Fix:**
  - On `glass-1` of **both** panels, 60 → 2630: dots ≥ 6 mm at ≤ 50 × 50 on surface #1 (S, FLAP Canada's reading of A460). Secondary sources disagree on dot size (3–6 mm), so confirm in A460:19.
  - Render the frit as a light veil in `render.py`. It is part of the finished look and should be decided now with R5.
- **Basis:** Klem 2004 (S): 59 % of strikes are fatal at 5 m.

**F12 (minor, carried) — Terrace base outlet (if the till tests < 13–15 mm/h; S 08 H3).**
- **Fix:** perforated ⌀100 in `base-2` at x −3175, invert −330. Solid beyond, under the bed at 1 %, into `rg-rock` with a flap. Omit if the test passes.

**F15 (minor, carried) — Granite terrace spec.**
- **Fix:** on `pavers-1/2`: joints ≤ 6, wet BPN ≥ 55 like the landing (S 08b M12), flamed or bush-hammered top. Flamed granite gave the best slip result in an EN 1341 finish study (S, Materiales de Construcción). The F7 `liner-edge-curb` fixes the change line.

**F18 (minor, carried) — Pocket pH.**
- **Fix:** HDPE or bitumen skin on the inner faces of `pocket-curb` and `pocket-curb-w`. `pocket-soil` mix pH 5.0–5.5 (S 08b M18: 4.5–6.5), top-dressed with conifer-bark fines every 2–3 years.

**F19 (minor, carried) — Saskatoon suckers.**
- **Fix:** single-stem stock; sealed barrier tops (F7.4); annual sucker removal in the pocket and bed (timeline).
- **Basis:** GOERT (S, lap 1); 08b M19 (S: avoid suckering natives beside the route).

**F20 (minor, carried) — Green-roof habitat.**
- **Fix:**
  - `growing-medium` 100 average, mounded to 150 at x ≥ +600. Part 4 check: 0.93–1.08 kPa saturated at 90–100 mm (S 09 R1).
  - `gr-habitat` per 10 m²: a 0.5 m² sand patch 50 deep and a deadwood log ⌀100 × 600 (S 09 §7: varied depths, deadwood and sand; pure sedum "not suited to biodiversity", ZinCo).

**F21 (minor, carried) — Proxies.**
- **Fix:**
  - `person-wheelchair`: x −250 → −1500, w 100 → 800, y PT → PT + 1300.
  - `person-seated-inside`: x +1500, w 1300, y 0 → 1300.
  - Optional 1500 turning circle at x −1000.
- **Basis:** S 08 K12.

**F22 (minor, carried) — Channel screen and silt box.**
- **Fix:** delete `grate-screen`; put the basket in N4's `silt-box`; channel units with built-in fall ≥ 0.5 % (R2 13).
- **Basis:** S 08b M9; mechanism I.

**F23 (minor, carried) — Track weeps.**
- **Fix:** stainless inserts ≤ 2 mm at the channel ends. More urgent now that the rill is a sheltered run from the bed.
- **Basis:** S 08 L7–L8.

---

## 4. Design proposals (bolder where it is better)

### P1 — The water margin at the jamb (recommended; delivers N4 (a), N11 and part of N12)

**What changes:**
- All the water hardware leaves the opening and lines up in front of the solid jamb wall: spout, stone basin, silt box, open rill, runnel and lip.
- The 4.8 m opening and its landing are clear stone. Nothing hangs, splashes or grates in front of the glass.

**Seen from the room:**
- The spout and basin are seen at an angle through the end panel. In rain they are a 3.3 m column of falling water: the "rain arriving" moment that is invisible in v2 (§2.2).
- The open rill, reclaimed granite with a moss patina, runs along the wall's foot in a 300 planted margin to the garden.
- Only a 1.2 m flush granite clapper slab covers it where a route crosses (B651 8.2.4, S via 08 J16).

**Side effects:**
- The liner loses both boots.
- The tree is 1.4 m from the runnel.
- The jamb-wall base (R5's unresolved plinth) becomes a planted water edge instead of a raw plinth.

### P2 — The arrival at the rim (part of N1)

- The reclaimed-granite lip throws a 170 mm sheet 100 mm down onto a cobble forebay. It is visible from the terrace and the garden, and audible from the open wall.
- The forebay is also the maintenance point: sediment collects there, not across the medium. That delays the year-30 medium strip (S 08 J11; I).

### P3 — A level path and a perch at the water (for the wheelchair user and the 30-year occupant)

- **Path.** A 1200-wide boardwalk or reclaimed-granite path on screw piles (no excavation, so the tree's soil is untouched). It runs at the far end of the opening (w 3300 → 4500), level at −57 from the terrace edge (x −3400) to a 1500 × 1500 perch at x −4150 → −5650.
- **Over the bank.** The perch cantilevers 500 over the upper bank. The drop at its edge is ≈ 232, so it needs a ≥ 100 kerb (S, B651 8.2.5 via 08b M15).
- **Seat.** A backed bench 450 high with one armrest on the house side and an 850 × 1350 transfer space (S 08 K1–K8). It faces the water, in the tree's afternoon shade.
- **Why.** The garden stops being view-only (§2.1).

### P4 — Plant the rain garden as a picture from the room

- **Low front.** The house slope and rim stay ≤ 400: *Iris tenax*, *Achillea*, kinnikinnick at the rim (S 08 J7).
- **Tall back.** The far slope carries the height: *Carex obnupta*, *Physocarpus*, and *Symphyotrichum subspicatum* for August–October bloom. Douglas aster grows in moist meadows (S, Phoenix / KPU).
- **Result.** From the seat the pond reads as an open mirror with a green back wall, instead of a sedge screen.

### P5 — A bee bank and winter stems

- **Bee bank.** 1 m² of compacted, unmulched sandy loam at the bed's sunniest point (`bed-bare-patch`), lightly sloped, never dug.
- **Stems.** Perennial stems left standing until May.
- **Not a bee hotel.** This replaces any bee hotel: hotels favour wasps and introduced bees (S 08 L4, MP15).

### P6 — The other jamb: a shelf and perch under the eave (people in the rain)

- **What.** At the far jamb (w 4800 → 5700), a 450-high, 400-deep reclaimed-stone shelf/bench under the 735 overhang.
- **Uses.**
  - Put the shopping down, then open the door.
  - Sit to take boots off.
  - Gives the plinth junction a purpose (I).
- **Lighting.** Pair it with shielded, downward, ≤ 2700 K motion-sensed threshold lighting (lap-1 P6). This protects the moths and the bats over the garden (S 08 L.2(c); I).

### P7 — Motorised wall with a retractable insect screen (N3 plus lap-1 P6)

- **Drive.** The motor drive (N3) makes the wall usable by everyone.
- **Screen.** A pleated screen in the jamb pocket keeps garden insects and moths out on summer evenings when the wall stands open.

### P8 — Let the green roof be seen

- **Sight line.** From the rain garden (eye 1600 at x −8000), the line over the gutter top (3322 at x −735) passes x +400 at 3591. The roof plants top out at ≈ 3605, so today the roof is invisible (I).
- **Fringe.** A 300-tall fringe of *Allium cernuum* and *Eriophyllum lanatum* at x +400 → +1000, behind the gravel strip, shows ≈ 300 mm of seasonal green-brown above the charcoal edge (lap-1 P7; R5 F12).
- **Combine with F20.**

---

## 5. Top 3 changes that would raise this score most

1. **Make the water chain drain and show itself (N1, N4, N5 → P1, P2).**
   - Runnel floor −160 → −200 at 2.3 % onto a granite lip over a cobble forebay at −300.
   - Move the spout, basin, silt box, rill and runnel in front of the jamb wall.
   - Gutter back leg 25 above the front, with a scupper into the basin.
2. **Close the root enclosure and drain the tree pit (F7, N6).**
   - `liner-edge-curb` plus barrier at −1852 → −2002.
   - Barriers cast into `pocket-curb-w` and the edge restraint, full width, bottoms at −700.
   - `pit-link` from the pit floor into `rg-rock`.
3. **Make the edge usable and living for people and pollinators (N2, N3, F6 → P3–P5).**
   - Recessed rails (11 mm threshold) and a motorised drive.
   - Bed understorey with late bloom and a bare-soil bee bank.
   - A level path to a perch at the water.

---

## 6. Decades timeline: what the tool should show for each outdoor element

All years are after construction, assuming the fixes above.
- **SOURCED rates:** sediment ≈ 3 mm/yr; PICP > 280 → ≥ 28 mm/h; root resurfacing ≤ 1.2 m; membrane life 15–25 yr; tree 1–6 (10) m; drain-down ≤ 48 h; larvae 3–7 days. All from 08, 08b and 09.
- **Sizes and states:** INFERRED unless marked.

| element | 0 | 5 | 15 | 30 |
|---|---|---|---|---|
| **Threshold, rails, channel, grate** | Rails recessed, 11 mm total, grate −6. Basket in the silt box, no full-length screen. Motor drive. | Grit in slots; basket emptied spring and fall. Stainless rail heads polished by wheels. Splash streaks on the bottom 300 of glass (08b). | Rollers/rails per maker; lip check ≤ 6 mm (B651). Drive serviced or replaced (I). **Storm view:** channel empties within minutes. | Door replaced without cutting the pan or liner turn-up (GG47). Channel body kept. |
| **Lined landing (concrete planks)** | Joints ≤ 6, BPN ≥ 55, 1:60. | Joint aggregate lost in the first metre from the door; top up. Grey grime band. | Infiltration toward 28 mm/h; vacuuming restores it only in part (STEP-PP). Camera check of the underdrain. | Lift and relay; liner and edge curb kept. |
| **Granite terrace** | Flamed reclaimed granite, joints ≤ 6, edge curb at −1852. | Moss in joints in the tree's shade (w 0–2000); saskatoon fruit stains in June; sweep. | Infiltration falling as above. Roots under the −700 barriers resurface ≤ 1.2 m beyond, under the unlined base only (GILMAN96). | Relay the outer metre after root pruning. The granite is reusable a third time. |
| **Shrub pocket (huckleberry)** | 0.5 m plant, pH 5–5.5 mix, hand-watered 2 years (08b M20). | ≈ 1.0–1.2 m. Bees Apr–Aug, berries for birds (08b M19). First prune. | Held at ≈ 1.5 × 1.2 m. Roots fill the pocket and stop at the sealed barriers. Acid top-dress. | Renewal-pruned or replaced. Saskatoon suckers removed every year. |
| **Spout, basin, rill (P1)** | Water falls 3.3 m into a cobble basin; the rill drains dry between storms. | Moss and leaf mats in the rill; clean spring and fall. Spout and leaf guard checked. | Rill joint seals renewed. Clapper slab re-bedded. | Stone reused; spout replaced with the gutter. |
| **Runnel, lip, forebay (N1)** | Clean stone. Visible only in rain; dry within the hour. **Storm view:** a sheet off the lip, forebay full. | Moss patina on the shaded runnel. Forebay sediment shovelled out each year. | Mortar repointed. Lip unchanged. | Runnel relaid. The forebay has kept most sediment out of the medium. |
| **Bed (groundcover, perennials, bee bank)** | Plugs at 0.6 m, 75 arborist chips, bare patch open, leaves kept. | Full cover; bloom March–October. Ground-nesting bees in the patch (08 L2). Earthworm casts. | Organic matter above installation level. Soil-life stage one step up per 5 untilled years (08 I.2(c)). Perennials divided. | Layered, self-mulching. Shade species under the tree take over. |
| **Tree (Amelanchier) and pit** | ≈ 2 m single stem at grade; pit drained by the stone link. | ≈ 3 m, crown r ≈ 1 m. April bloom; June fruit = peak window-strike season. Suckers removed. | ≈ 5–6 m (08 I5). Crown lifted to 2.1 m over the terrace and kept 1.83 m from the roof edge (08 I5). Shades the glass at sun altitudes ≈ 6–33° (I). | Mature ≈ 6 m. "Roots at drain: possible" for any tree within 6 m (08 I.2(b)). Camera check of the underdrain and subdrain. |
| **Root barriers and edges** | All barrier tops cast into concrete; none visible. | No change. | Roots pass under at −700 and resurface ≤ 1.2 m beyond (S), outside the liner. | HDPE intact. Root-prune at the terrace relay. |
| **Rain garden** | Plugs < 30 % cover, coir on the slopes. Drain-down < 6 h. **Storm view:** 200 mm pond, lip 50 clear. | ≥ 80 % cover (STEP). Sediment ≈ 15 mm, mostly in the forebay. Riser grate cleaned each fall (08 J9). Birds bathe at the forebay. | Sediment ≈ 45 mm; drain-down 12–24 h. Sedges spread. Subdrain rodded. Tree roots keep the medium open. Bats at dusk (08 L). | Sediment ≈ 90 mm; drain-down 24–48 h (≤ 48 preferred, MV23). Strip the top 50–100 and replant. Overflow more often in the 2050s climate. |
| **Box gutter and scupper** | Back leg 25 above the front; scupper at the jamb; leaf guard. | Tree litter from year 5–10; clean yearly. | Joints resealed; re-hung if needed. | Replaced with the re-roof. |
| **Green roof** | Plugs and native mat, sand patch and log, varied depth. RCABC maintenance contract (09). | Mixed sedum and forb cover; bees Jun–Aug. The forb fringe shows above the gutter from the garden (P8). | Substrate settled; moss. Membrane window opens (15–25 yr). | Lifted and relaid at the re-roof; logs replaced. |
| **Glass (bird safety)** | Surface-1 markers on both panels, full height. | Check under the glass in June (fruit) and in migration. | Fired frit unchanged; a film would be renewed (I). | IGU replaced; markers specified again. |
| **People** | 11 mm threshold, motor drive, level path to the perch, sill mat zone. | Wear; slip only on mossy shaded granite. Afternoon shade by the tree. | Lips re-levelled; the perch becomes the summer place. | Ageing occupants depend on the drive, flush sill, lighting and perch armrest. Relaid without a step. |
| **Animals and insects** | Weep inserts ≤ 2 mm, screens, leaf guard. | Pollinators in the bed, pocket and roof. Birds on fruit and at water. Slugs under curbs; ants in joints (harmless). | Ground nesters established. Check the rill mouth and silt box for rodent runs. | Mature layered habitat **if maintained**. If not: a blocked riser, sludge in the silt box, a suckering thicket at the edge, and rats along the rill. |

---

## 7. Verdict

**Score: 6 / 10** (lap 1: 5).

**What holds it back:**
- A water chain that cannot drain (N1). Its backwater reaches the sill pan.
- An unclosed root enclosure (F7) and an undrained tree pit (N6).
- A threshold and door that a wheelchair user cannot use unaided (N2, N3), and water hardware in the landing (N4).
- A box gutter that overflows toward the house (N5).
- A bed with no understorey or nesting ground (F6).

**Top 3:**
1. Make the water chain drain and show itself: lip and forebay, the water margin at the jamb, a gutter that sheds outward.
2. Close the root enclosure and drain the tree pit.
3. Recessed rails, a motorised wall, bed planting with a bee bank, and a level path to a perch at the water.

With these, the section reaches about 8.

---

## Sources used

**Research files:**
- 08-landscape-occupation.md:
  - H3; I.0–I.4 (I1, I2, I4, I5, I6, I7, I.2(b)–(c));
  - J.0, J1–J16, J failure table and ageing;
  - K1–K12; L1–L11, L.2–L.3.
- 08b-threshold-paving.md: M6–M21, M15–M19.
- 09-assembly-options.md: §0 table (d), §7 R1, ZINCO and RCABC notes.
- 11-sliding-wall.md: G12–G13, §3.1 levels table, §3.3 accessibility check, §3.4 overhang ratio.
- Lap-1 sources: GOERT, CSA A460 (Construction Canada), UBC policy.

**Web (search or fetch, this session):**
- Construction Canada, bird-safe glass codes and standards (CSA A460:19): https://www.constructioncanada.net/bird-safe-glass-codes-and-standards-to-know/4/
- FLAP Canada, bird-safe windows (marker ≥ 6 mm, ≤ 5 × 5 cm): https://flap.org/cost-of-bird-friendly/ and https://www.flap.org/bird-safe-windows-2
- Klem et al. 2004, Wilson Bulletin 116(1): 69–73 (feeder distance vs fatal strikes): https://www.bioone.org/journals/the-wilson-bulletin/volume-116/issue-1/0043-5643(2004)116[0069:EOWAFP]2.0.CO;2/EFFECTS-OF-WINDOW-ANGLING-FEEDER-PLACEMENT-AND-SCAVENGERS-ON-AVIAN/10.1676/0043-5643(2004)116[0069:EOWAFP]2.0.CO;2.full ; summary: https://www.conservationevidence.com/individual-study/1657
- Gretsch-Unitas, HS LiftUnit (lift assist; 300 kg sashes) and HS ePOWER (motor drive): https://www.g-u.com/Medien/Dokumente%20werblich/Englisch/Flyer_7_HS_LiftUnit_11-25_ENG.pdf ; https://www.g-u.com/en/AT/products/window-technology/sliding-door-hardware/liftslide-hardware/motor-driven.html
- SIEGENIA ECO PASS 0-mm threshold (recessed running rail): https://www.siegenia.com/en/company/news-archiv/339156
- idighardware (ADA 5 lbf sliding-door force; hardware usable from both sides): https://idighardware.com/2020/09/decoded-opening-force-vs-operable-force-november-december-2020 ; https://idighardware.com/2023/07/accessibility-requirements/
- Seo Rain Chain, drainage capacities (730 / 1700 L/h): https://seorainchain.com/pages/drainage-capacities
- Purdue Extension, planting-pit "bathtub effect" in compacted clay: https://www.purdue.edu/fnr/extension/question_clay_content/
- KPU Plant Database, *Symphyotrichum subspicatum* (flowering Jul–Sep): https://plantdatabase.kpu.ca/PlantPrint/sysu ; Phoenix Perennials (moist meadows, coastal BC): https://www.phoenixperennials.com/?p=17698
- Materiales de Construcción (2008), effect of surface finishes on granite and limestone pavers (flamed granite best slip result): https://materconstrucc.revistas.csic.es/index.php/materconstrucc/article/view/69
