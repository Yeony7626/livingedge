# R5 review: exterior appearance and craft. Detail 02 (d2v3), lap 3

Reviewer: R5. I cover the finished look from outside and how it ages.

## Inputs

- **Spec and dispositions:**
  - `review/d2-lap3/detail02-v3.mjs`, read in full, normal mode and `APP` with the `MB` mirror;
  - `changes-v3.md`;
  - `render.py`, for PALETTE and the cameras.
- **Renders:**
  - v3: `exterior-eye.png`, `exterior-close.png`, `exterior-elevation.png`;
  - v2: `d2-lap2/exterior-eye.png`.
- **Section views:** `H-head-section-labels`, `H-head-axo`, `T-threshold-section-labels`, `T-threshold-axo`, `Z-jamb-base-section-labels`, `Z-jamb-base-axo`, `C-water-corner-axo`, `S-section-axo`.
- **Research:**
  - 13 §4.1–4.6, including FB24, FB25 and FB30;
  - 10 §3.1–3.8;
  - 14 §4–5 and §8;
  - 09 §9.1.
- **Six read-only Rhino captures of `d2v3-app`** (dx 102000):
  - The Perspective camera was moved for each capture and then restored. Nothing was hidden or edited.
  - Saved in the session scratchpad as `r5lap3/A…F.png`.
  - Rhino's "Rendered" mode currently shows **role** colours (downspout blue, door frame tan). Read these captures for geometry only.
  - | capture | view |
    |---|---|
    | A | water corner |
    | B | canopy end at jamb B |
    | C | head corner at jamb A |
    | D | axial view |
    | E | jamb base |
    | F | canopy end at jamb A |
- **Web this lap:** Renson Fixscreen 150 box size (REN-150B). Search snippets only, no PDF opened.

## Conventions

- **Datum:** x = 0 at the frame's exterior face, exterior negative. y = 0 at FFL. w runs along the wall. Millimetres.
- **Rhino mapping:** X = 102000 + x, Y = −w, Z = y.
- **Tags:**
  - **[S]** sourced; the research row or key is given.
  - **[S\*]** snippet only.
  - **[I]** inferred; the reason is stated.
- **Key constants from the spec:**
  - cedar face −94; parge face −75;
  - liner cheek x −150 → −94, w −56 → 0 and 4800 → 4856, y 5 → 2754;
  - cassette x −150 → −32, y 2608 → 2758;
  - head drip kick (−160, 2750);
  - head cant top `CTT(−150)` = 2781.6;
  - canopy soffit y 2800, x −750 → −94;
  - fascia x −757, y 2795 → 2945.0;
  - `CANOPY` w −150 → 4950;
  - glass y 101 → 2572; glass outer face x 168.6;
  - base-flashing drip x −107, from y 293 to 285;
  - cedar from +305;
  - `MOD` 156 from `CH_OUT` −171.5.

---

## Lap-2 findings status (and a challenge to `changes-v3.md`)

| lap-2 | v3 claims | R5 verdict | why (geometry or render evidence) |
|---|---|---|---|
| N1 gutter back to front | n/a | **n/a, but the problem moved** | The gutter is gone. The new canopy cap falls 2 % outward to a free drip at x −757 over the full 5.1 m. That puts a rain curtain across the landing in front of the door (N15). The cap's tip also turns **up** 4.6 mm rather than down (N26). |
| N2 water and planting in the opening | done | **fixed** | The water corner is at jamb A (basin w −750…−150). The shrub pocket is at w 4950…5950, and its proxy canopy (w 4900…6000) clears the cheek at 4856. The landing in front of the glass is clear stone. This is the biggest gain this lap. |
| N3 jamb base | done | **mostly fixed** | Base per 09 §9.1, charcoal parge 78,78,76, cedar at +305, paving past the jambs. Still open: <br>• the stainless drip at x −107 is 13 proud of the cedar, so it reads as a bright skirting line; <br>• there is a 96.5 mm sliver course at the plinth; <br>• there is no course grid (N20, N21). |
| N4 west shading | done | **mostly fixed** | A ZIP cassette in the head reveal, flush with the cheeks. But the named product class (Fixscreen 150) is about a 150-class box, the zone is 118 deep, and the spec says "160 × 118" but draws 150 × 118. The guides are not modelled (N19). |
| N5 liners, head flashing at the jambs | done | **partly fixed** | The liners and the 56 mm cheeks exist, and the drip runs `OPEN` only. But the **cheek tops stop at 2754, 46 below the soffit (2800)**, so the frame's top corners are open and show cedar and PT (captures C, D, F) (N16). |
| N6 PT sliver | n/a | **recurs** | The PT `canopy-ledger` face (176,150,112) shows in the 18 mm slot at x −150…−94, between the cant (2781.6) and the soffit, and above each cheek top. The raw canopy ends also show PT (N16). |
| N7 meshes grey | — | **open (small)** | `band-screen` and `jamb-screen` still use `mat: stainless` (renders 150 grey). Both are horizontal and hard to see from standing height. Add `mesh-black` anyway (§6). |
| N8 two greys, no module | done | **fixed in principle** | One reclaimed granite on the 156 module, granite curbs. Open items (N20): <br>• the basin is off-module (−500 / −1100 against joints at −483.5 / −1107.5); <br>• there is a 96.5 sliver course at the jamb; <br>• no joints are drawn in any render. |
| N9 eave end | n/a | **recurs as canopy ends** | FB25's charcoal end plates are in the research but **not in the spec**. The canopy is cut raw at w −150 and 4950 (captures B, F) (N16). |
| N10 soffit UV | — | **fixed by geometry** | The canopy soffit is horizontal, so direct sun never reaches it. Only light reflected off the paving does. The honey will hold. |
| N11 under-eave gradient | — | **changed** | The canopy creates two new weathering zones: a 94-wide sheltered cedar strip beside each cheek (w −150…−56) and a splash band just above the cap (N27). |
| N12 green roof | n/a | n/a | No roof in this detail. |
| N13 grate | n/a | **superseded, fine** | Granite slips in a 316 tray. The tray edges read as 1.5 mm hairlines at −171.5 and +84. Good, quieter than the grate. |
| N14 renders | done | **partly fixed** | Done: both jambs, the upper storey, and an elevation without proxies. Still wrong (N18): <br>• the eye camera sits at w 6300, and the close camera at w −1500 (`render.py` Y = 1500), both **beyond the run ends**, so they see cut faces (yellow WF at the w −1200 end in `exterior-close`); <br>• the **water corner is in no render**: the basin is about 23° below the close view's frame, and the spout points at nothing; <br>• the proxies still block the close view (the wheelchair cylinder sits centre-frame); <br>• no courses or joints are drawn, and there is no sun; <br>• the parallel elevation is not labelled as orthographic. |
| F15 bird markers | partial | partly fixed | A460 dots on #1 [S 14 §5]. Dot colour and size still not chosen (use 5 mm etched dots on a 50 grid [S\* 14 §5]). |
| F16 jambs and interlock | done | **fixed, one nuance** | 165 / 120 modelled. But 14 §4 gives the **fixed** jamb as 100, not 165, so jamb B is drawn too wide (N24). |
| D5 west shading | done | fixed | As N4. |
| P4 pre-greyed cedar | — | **open, more important now** | The palette's cedar (150,146,138) is already silver, so the renders assume P4 without stating it. |

**Challenge to `changes-v3.md`:**
- "R5 N5 / P3 … canopy fascia caps the frame": **not as drawn.**
  - The fascia sits 607 in front of the cheek face.
  - The cheeks stop 46 short of the soffit.
  - The canopy overhangs the cheeks by 94 at each end.
  - From the garden these read as two separate charcoal objects with an open corner between them, not as a frame and its cap (captures C, D).
- "R5 §6 renders: done": **partly done.** The new close view was meant to show the water corner, and it does not (N18).

---

## 0. What the edge looks like now (from the garden)

### 0.1 Elevation stack, frontal (real heights)

| y (mm) | element | depth in plan (x) | colour |
|---|---|---|---|
| −7 → −12 | granite tray slips (one course, 255 wide, −171.5 → +84), 6 mm slot, aluminium nosing lip −12 | −171.5 → +183 | 140,138,132 · dark · charcoal |
| 1 → 101 | sash bottom rail (100) | +147 → +259 | charcoal 52,54,56 |
| 101 → 2572 | **glass, 2471 visible**, two panes of 2175 (w 165–2340, 2460–4635) | outer face +168.6 | — |
| 2572 → 2608 | sash top rail visible below the cassette (36 frontal; about 100 from a 5 m eye, under the cassette's bottom edge) | +147 | charcoal |
| 2608 → 2758 | **ZIP cassette face, 150**, flush with the cheek faces | −150 | charcoal |
| 2750 → 2782 | head-drip leg and kick (−160, 2750), then an 18 mm open slot to the soffit with the PT ledger behind it | −160 → −94 | charcoal · shadow · PT |
| 2800 | **honey soffit**, 656 deep, horizontal | −94 → −750 | 182,136,96 |
| 2795 → 2945 | **charcoal fascia, 150**, plus the cap | −757 | charcoal |
| 2975 → 6200 | cedar, continuous across the floor line (2nd FFL ≈ 3496) | −94 | 150,146,138 |

**Jambs (frontal):**
- Cheek face 56 plus frame 165 gives **221 of charcoal** at each jamb.
- The interlock is 120.
- The glass sits **263 behind the cedar face and 319 behind the cheek face.** That deep reveal is the façade's best shadow, as in v2.

**Jamb walls (frontal), w < −56 and > 4856:**
- Charcoal parge from the paving to about 295. This is the dark base I asked for.
- A stainless drip line at 285–293, sitting 13 proud of the cedar.
- An 11 mm shadow.
- Cedar from 305.
- The downspout: Ø100 at w −450, from 640 up to the wall top, then a 45° elbow into a 616 mm round spout at y ≈ 600, ending over the basin.

**Proportions:**
- **Frame:** 221 at the jambs, 228 at the head (2572–2800 dark), about 105 at the base, 120 at the interlock. The jamb and head are almost equal. That is a well-balanced frame, and the deep reveal makes it read as a frame rather than a door set in a hole.
- **Lid (orthographic):** head 228, a hairline, then fascia 150. That makes **≈ 383 of near-continuous charcoal over 2471 of glass (0.15)**. In `exterior-elevation.png` it reads as one heavy black lintel, slightly wider than the frame. In perspective the honey soffit separates the two bands:

  | eye at 1600, distance | soffit seen | fascia seen |
  |---|---|---|
  | 5 m | ≈ 180 | ≈ 170 |
  | 10 m | ≈ 80 | ≈ 160 |

  [I, sightline projection to the wall plane]. So up close the head reads as charcoal, honey, charcoal; from the rain garden it becomes a heavy dark band.
- **Two storeys:**
  - The modelled wall is 7.2 m (w −1200 → 6000) by 6.2 m.
  - The opening frame is 4.91 m wide (cheek to cheek), and its canopy top is at 2.95 m, **0.48 of the modelled height**.
  - Above it, 3.2 m of cedar with **no openings modelled**. The elevation reads as a large door in a blank wall (N25).
  - The canopy is the only horizontal datum between storeys. Research 13 intends exactly that, and it is the right idea, but it only becomes legible when something above relates to it.

### 0.2 The picture frame

| element | where | status |
|---|---|---|
| Cheeks | 56 wide, 56 proud of the cedar, y 5 → 2754 | built |
| Head | the cassette face, flush with the cheek face at x −150 | built; this is the right move, and the frame reads as one plane |
| Frame corners | the cheek tops stop at 2754 while the soffit is at 2800 | open: you see a 46 mm notch of cedar (to 2780) and PT ledger (2785 → 2800) above each cheek (captures C, D, F) |
| Canopy ends | stop 94 beyond the cheeks | the canopy reads as a separate shelf laid over the frame, not as its cap |
| Base | cheeks float 12 above the stone | a crisp shadow, keep it |

### 0.3 Canopy line

- **Depth:** 656 from the cedar, giving shelter ratio 0.23 [S 13 §4.6].
- **Length:** 5100.
- **Soffit:** horizontal, honey. Seen through the glass it is almost level with the interior exposed glulam soffit (2780). The warm plane appears to pass through the wall; that is a real strength, so render it from inside (§6).
- **Fascia:** 150 high. It reads heavy against the 56 cheeks.
- **Ends:** raw: PT outriggers, ply and soffit ends visible (captures B, F).
- **Seams:** the cedar beside the reveal is split at w −150 and stops at 2780. That leaves vertical seams in the renders (F) that would be real board ends on site.

### 0.4 The water corner

- **Plan reading:**
  - A flush 600 × 600 cobble square at x −500…−1100, w −750…−150, 406 mm off the cedar.
  - A 170-wide open slot (the rill), 140–160 deep, running out to the bed.
  - A 1248 mm clapper slab covers the middle of the rill, so it shows only for 631 mm (basin to clapper) and 462 mm (clapper to bed).
  - Capture A shows the composition is right: the basin sits beside the jamb, not in the opening.
- **Vertical reading: weak.**
  - A stock round downspout touches the cedar, with no stand-off.
  - A 45° elbow throws a round pipe 666 out from the wall at knee to thigh height (y ≈ 550–710), pointing at a flat cobble square.
  - From inside the room it is the first object beside the left jamb (captures A, E).
- **Colour:** the cobbles use `aggregate` (158,153,143), which is lighter than the granite. The basin will read as a **pale patch**, not as water.

### 0.5 Colour relationships

- **Values:**
  - charcoal 52 (frame, cassette, cheeks, fascia, cap, downspout);
  - parge 78 (base);
  - granite 140 and silvered cedar 150: **10 RGB apart**, so ground and wall read as one grey body;
  - honey 182,136,96, the single warm surface outside;
  - glulam 196,160,118 inside, seen through the glass.
- **Charcoal as drawing:** the charcoal draws three things: the frame, the lid and the base. That is a disciplined palette.
- **Risks:**
  - three "charcoals" from three suppliers that age apart (N23);
  - the bright stainless drip line is the only metal glint at the base (N21);
  - the pale cobbles (N22).

---

## 1. How it ages (Vancouver, west façade; east noted where it differs)

Cells are [I] unless tagged. RGB values are keyframes for the decades view.

| element | year 0 | year 5 | year 15 | year 30 |
|---|---|---|---|---|
| **Cedar field** (jamb walls and upper storey), bleaching oil, or pre-greyed (P13) | Warm 170,160,145. Pre-greyed: 168,164,156. | Exposed field silver 156,152,144 [S 10 §2.1]. Without P13, the strips beside the cheeks under the canopy (w −150…−56, about 1.5 m up) stay brown 150,135,115, a **ghost stripe** each side of the frame (N27). | Even mid-silver 150,147,140 with checks. Recoat the bleaching oil at about 5–6 yr [S RC-FIN via lap 2]. | 140,138,133, 1–3 mm erosion [S 10 §2.1]. The upper storey is untouched by splash. |
| **Cedar band above the canopy** (first 2–3 courses over the cap, 2975 → ≈ 3350) | As field. | **Splash band**: rain on the 2 % cap splashes 150–300 up the boards. Darker, mildewed 128,124,116, green on the east. Leaves on the cap feed it [I]. | Same, plus dirt at the cavity vent (FB27). Clean twice a year [S 13 §5.4]. | The lowest course over the cap is the first to replace (make it screwed) [I]. |
| **Honey soffit** (horizontal) | 182,136,96. | No direct sun. Dust and cobwebs at the wall angle [S EQ-CLEAN via 10]. ≈ 176,132,94. | Recoat every 5–7 yr (reflected UV only) [I] → 172,128,90. | Boards sound; colour as maintained 168,126,90. |
| **Charcoal metals** (cassette Al, liner and cheek PVDF steel, fascia and cap steel, door Al shell) | 52,54,56 at ≤ 20 GU. | Pollen on the cap and cheek tops; dust lines in the cassette's bottom slot. | **Divergence:** <br>• powder-coated Al (door, cassette) chalks to ≈ 60,62,64 on the west; <br>• PVDF steel holds ≈ 56,58,60. <br>The cheek reads lighter or darker than the frame beside it (N23). <br>West dark Al shell: thermal bow and gasket wear [S 14 §8]. | Door shell refinished or accepted. Liners, cassette and cap renewed with the cedar [S 13 §5.4]. Specify the same colour code. |
| **ZIP screen** (charcoal 6 % mesh) | Retracted it is invisible; lowered it reads as a dark veil 90 behind the cheek face. | First service [S 11 §5.7]. Bottom bar scuffs on the tray slips. | Fabric and motor replaced (10–15 yr) [S 13 §5.4]. | Second replacement; guides kept. |
| **Stainless base drip** (as drawn, 13 proud) | Bright line 150,152,154 against charcoal parge. | Rain-washed, stays bright. The line is the only glint at the base. | Unchanged. | Unchanged; outlives the cedar. |
| **Charcoal parge plinth** (paving abutting) | 78,78,76, crisp. | Splash grit on the bottom 150 and algae tint 74,76,72 (east greener). Hairlines at the control joints [S 09 §10]. | Recoat (mineral silicate) [I]. | Re-parge once. |
| **Granite landing** (60) and terrace (80) | 140,138,132. | Traffic line polished. Lichen at the edges outside it. **If the canopy keeps a free drip:** a 100–150 wide darker, algae-green line at x ≈ −757 across the whole landing, 118,120,112 (N15). | 126,126,120 with lichen dots. | Relaid, not replaced. |
| **Tray slips and slot** | Crisp threshold course. | Grit in the 6 mm slot. The notch (w 4200–4800, −20) holds a puddle and leaves (N20). | Tray lift-out cleaning routine [S 14 §8]. | Track renewal lifts the slips; relay them. |
| **Basin, rill, cobbles** | Pale cobbles (as specified). | Silt in the sump. Moss on the rill walls (intended). **Tannin and iron streak** under the downspout spout tip if it drips onto the rim [I]. | Cobbles washed or replaced. Rill joints repointed? No: gasketed trough [S spec]. | Unchanged in character. |
| **Planting** | Huckleberry 0.5 m at jamb B. Tree about 2 m. | Huckleberry about 1 m, framing jamb B. Tree about 3.5 m. | Huckleberry kept at 1.5 m. Tree canopy 4 m: from the rain garden it hides the canopy line. | The view of the edge becomes framed. |

**East differences:**
- Slower drying, more algae on the plinth base and the splash band over the cap.
- The canopy matters more on the east, the wind-driven-rain side [S 13 §4.6].

---

## 2. Score: **7.5 / 10** (lap 2: 6.5)

**Why it rose**
- The opening is clear: the water corner is at A and the shrub at B.
- One stone, coursed.
- A real jamb base (charcoal parge, cedar at +305).
- A deep, balanced charcoal picture frame (221 / 228 / 120) with the screen flush inside it.
- A honey soffit that can never sunburn.
- A credible PH door.

**What holds it back**
1. **The canopy is a shelf, not a cap.** The ends are raw, the corners are open above the cheeks, the overhang is neither flush nor clearly wider, and the fascia is heavy (N16).
2. **The canopy rains on the threshold.** A free drip falls across the doorway, and the tip turns up rather than down (N15, N26).
3. **The water corner's vertical half looks like plumbing,** and its horizontal half reads as a pale patch (N17, N22).
4. **The renders still cannot show the edge's best part.** There is no water corner view, the cameras sit past the run ends, there are no joints or courses, and there is no sun (N18).

---

## 3. Findings

Counts: **0 blockers, 4 major, 9 minor.** Numbering continues from lap 2.

### N15: major. The canopy sheds a 5.1 m rain curtain onto the landing in front of the door
- **Parts:** `canopy-cap`, `canopy-fascia`, `canopy-deck`, `pavers-lined`.
- **Evidence:**
  - The cap falls 2 % outward to x −757.3 over w −150…4950 [spec; S 13 §5.1 "tip drip at −757 → lined landing"].
  - It collects the canopy (0.66 m) plus the cavity and WF-face water from 3.2 m of cedar above (FB23). In Vancouver's winter that is a continuous drip line 757 out from the frame and 600 inside the landing's 1.72 m depth. Everyone stepping out or wheeling in crosses it.
- **How it ages:** a dark, algae-green stripe on the granite at x ≈ −757 within 5 years. Splash darkens the lower sash rail and the tray slips [I].
- **Exact fix (preferred): a tip gutter that feeds the water corner.**
  1. **`canopy-cap` path** → `[[-56.3, 3080], [-56.3, LT+0.3], [-94, LT+0.3], [-705, FT(-705)+12.8], [-705, 2900]]`. The cap turns down into the gutter back.
  2. **New `canopy-gutter`** (0.8 charcoal, `steel-prefinished`, `runs: CANOPY`):
     - path `[[-705, 2900], [-750, 2900], [-750, 2936], [-762, 2936]]`;
     - the back is the cap edge at ≈ 2946.5;
     - the **front lip is at 2936, 10 below the back**, so it overflows outward and never inward;
     - the bottom falls 0.5 %, from 2900 at the jamb-B end to 2876 at the jamb-A end (drawn as a note, or as a sloped bottom in APP).
  3. **`canopy-fascia`** → `R(-762, 2795, -750, 2936)` (141). With P9 it drops to about 100.
  4. **New `canopy-spout`:** an open charcoal U, 45 wide × 40 deep, 3 mm, through the jamb-A end plate:
     - from w −56 to w −306, axis w, invert 2876 falling 2 %;
     - it discharges at (x −727, w −300). That is inside the basin (x −500…−1100, w −750…−150) and clear of the downspout (w ≤ −400).
  5. **Optional `rain-chain`:** charcoal or stainless link chain from the spout tip to a cobble keystone, (x −727, w −300, 2870 → PT−40). It controls wind scatter over a 2.9 m drop [S 10 §3.6: "rain chains … into cobble basins"].
- **Fallback (research 13's default, free drip):** keep the drip but set a 150-wide dark cobble drip strip in the landing at x −680…−836. I do not recommend it: it puts loose material in the accessible landing.

### N16: major. The canopy ends and the picture-frame corners are unresolved; the frame and its "cap" do not meet
- **Parts:** `canopy-*` (`runs: CANOPY` = [−150, 4950]), `liner-frame-a/b` (top 2754), `head-drip`, `cassette` (top 2758), `canopy-ledger`, `jamb-cedar-r/-u`.
- **Evidence:**
  - Raw end faces at w −150 and 4950 show PT outriggers, ply and soffit end grain (captures B, F). FB25's end plates are in research 13 but not in the spec.
  - The cheeks stop 46 under the soffit, so the cedar and PT ledger show above each cheek top (C, D, F).
  - An 18 mm slot runs over the whole opening at x −150…−94, between the cant edge (2781.6) and the soffit, with the PT ledger at its back.
  - The 94 overhang beyond the cheeks is too small to read as intended and too large to read as flush.
- **Exact fix ("portal", P8):**
  1. `CANOPY` → **`[[-56, 4856]]`**, so the canopy ends are flush with the cheek outer faces.
  2. **New `canopy-end-a` / `canopy-end-b`:** 0.76 charcoal PVDF, axis w at w −56 and 4856 (2 mm thick inward).
     - poly `[[-94, 2795], [-762, 2795], [-762, 2950], [-94, 2983]]`;
     - the bottom is level with the fascia bottom (5 below the soffit, a drip);
     - the top is 25 above the cap, as an end dam [S 13 FB25; V2 9.27.3.8(4)(c)];
     - the jamb-A plate carries the N15 spout.
  3. `liner-frame-a/b` poly top **2754 → 2795**, so the cheeks rise to the end-plate bottom line. The cheek side face (w −56) and the canopy end plate are then **one continuous plane**.
  4. **New `head-closure`:** 0.76 charcoal, path `[[-151, 2795], [-151, 2762], [-141, 2762]]` (hemmed return), `runs: OPEN`.
     - It is flush with the cassette and cheek faces and closes the slot and the ledger.
     - Keep 4 mm of air behind it to the drip leg (x −150.45) so the drip still discharges at 2750 below the hem.
     - **Frontal head:** cassette 2608–2758, a hairline at the drip, closure 2762–2795. That reads as one 187 charcoal plane.
  5. **Cedar:** with the canopy ending at −56, no cedar sits under the canopy.
     - Merge `jamb-cedar-r` and `jamb-cedar-u` into `jamb-cedar`, running `MB([[SPAN[0], -56]])` full height, ends 8 back from the cheek side.
     - This deletes the w −150 seams and the sheltered strip (N27).
- **Result:** jambs 221 and head 225 frontal, under a honey soffit, inside one charcoal Π whose top bar is the canopy. Then "the fascia caps the frame" becomes true.

### N17: major. The downspout and spout read as stock plumbing, not as the water corner's crafted vertical
- **Parts:** `downspout` (rod Ø100, centre x −144, which touches the cedar face −94, w −450, y 640 → TOPY); `spout` (rod Ø100, x −760 → −144, y ≈ 600, dy 60).
- **Evidence:** captures A and E, and `exterior-close.png`:
  - a round pipe hard on the cedar, with no stand-off;
  - a 45° elbow;
  - a 666 mm round tube projecting at knee to thigh height;
  - water invisible until it leaves the tube.
  - Round profiles appear nowhere else on this rectilinear façade.
- **Exact fix:**
  - **`downspout`** → rectangular 100 (w) × 75 (x) charcoal, **20 stand-off** on concealed brackets at ≤ 1.5 m, x −114 → −189, w −500 → −400, from y 760 to TOPY.
    - The shadow line behind it keeps it off the cedar, and the cedar can be oiled behind it.
    - Brackets land on the 127 course lines (N21).
  - **`spout`** → an open folded trough of 3 mm charcoal steel, 120 wide × 60 deep, w −510 → −390:
    - from the downspout face x −189 to **x −800** (the basin centre line at the module, N20), **level top at y 686** (= 305 + 3 × 127, a course line), floor falling 2 %;
    - a V-notch drip at the tip; a closed welded boot where it leaves the downspout.
    - Water shows as a sheet in the trough and falls 730 to the cobbles. The spout is above knee height and reads as an object, the equal of the cheek.
  - Use one charcoal (52,54,56) and the same finish class as the cheeks (N23).

### N18: major. The renders still cannot judge the edge, and the water corner appears in none of them
- **Parts:** `render.py`; APP ends.
- **Evidence:**
  - Eye camera Y = −L·0.35 − 4200 → w = 6300, beyond the 6000 end.
  - Close camera Y = 1500 → w = −1500, beyond the −1200 end. It sees the cut WF (yellow edge in `exterior-close`).
  - The close view's centre is 3.9° below horizontal with a 41° vertical FOV, so the basin (about 27° down) falls outside the frame.
  - The proxies are brown and centre-frame.
  - No courses, joints or sun.
  - The elevation is orthographic, so the soffit is invisible and the head reads as one 383 band.
- **Exact fix:** §6.

### N19: minor. Cassette: the product, the zone and the drawn size disagree; guides are not drawn; the bottom bar lands on the notch
- **Parts:** `cassette` (drawn R(−150, 2608, −32, 2758) = 118 × 150; `changes-v3` says 160 × 118; the note names "Renson Fixscreen 150 evo class").
- **Evidence:**
  - Research 13 §4.4 already warns that "a square 140–150 housing does not fit" 118 deep [S 13].
  - The Fixscreen 150 installation drawing shows 150/155/160 box dimensions [S\* REN-150B, labels not extracted].
  - 13 §4.4 lists MHZ Zip 6 as a **110** cassette to 6 × 3.5 m, 20 m² [S\* 13]; our screen is 4.8 × 2.6 = 12.5 m².
- **Fix:**
  - Name a ≤ 118-deep cassette proven at 4.8 × 2.6 (MHZ Zip 6 class, 110) and confirm its wind class for the west. Otherwise accept a 150 box and deepen the cheeks to x −182 (88 proud), as 13 §4.4 says. I prefer the former: 56 proud is the right projection.
  - Separate the **look** from the product: the visible head is the face plate x −150, 2608 → 2758 (150) plus `head-closure` (N16), whatever box sits behind. It needs a hinged or clip-off bottom access panel 118 deep.
  - **Draw the guides:** new `zip-guide-a/b`, charcoal, 35 (w) × 45 (x), x −112.5 → −67.5, w 0 → 35 and 4765 → 4800, y −7 → 2608. They sit behind the cheek in elevation, so the 221 jamb is unchanged.
  - **Bottom bar:** lands at −7 on the slips, but at −20 over the notch (w 4200–4800). Either stop the notch at w 4765, or give the bar a 13 mm flexible skirt there.

### N20: minor. Paving module: the basin is off-module, the jamb strip is a sliver, the threshold course is unnamed, the notch reads as a hole
- **Parts:** `BASIN.x` [−500, −1100]; `jz-pavers` (from `JPF` −75); `tray-slips`; `tray-slips-notch`.
- **Problems:**
  - **Basin:** module joints are at −483.5 and −1107.5, so the basin leaves 16.5 and 7.5 mm slivers in two courses.
  - **Jamb strip:** courses run from the channel lip −171.5. In front of the jamb walls the strip −75 → −171.5 is a **96.5 sliver course** along the whole plinth (capture E shows the joint line).
  - **Threshold course:** the tray slips run −171.5 → +84 (255).
  - **Notch:** a 600 × 255 panel at −20 in the threshold course in front of the fixed leaf (capture D, the dark patch at bottom right).
- **Fix:**
  - `BASIN.x` → **[−483.5, −1107.5]** (624, 4 modules), with `BOWL`, `basin-void` and `basin-cobbles` following.
  - Replace the jamb sliver with **`jz-pebble`**: an *amaochi* strip of dark 20–40 cobbles (`cobble-dark` 96,96,94), x −75 → −171.5, top at PT − 10, `runs: JZ`, over the drain envelope [S 10 §3.7, JAANUS-AMA; LUNA-NA splash]. It continues the channel line along the whole base and runs into the basin (P10).
  - **Name the threshold course:** slips laid as one 249-wide "sill stone" course, lengths 600–900, cross joints offset from the landing's. It reads as a threshold stone, which it is.
  - **Notch:** make it read as a drain, not a sunken slab. Use a granite slotted panel (12 mm slots along w) at −20, or dark cobble 96,96,94. Edge it with the tray's 1.5 mm stainless hairline on all four sides.
  - **Curbstone tops** (`liner-edge-curb`, `edge-restraint`, `pocket-curb-*`): flamed to the plank finish, so the reclaimed curb's weathered top does not read as a lighter band.

### N21: minor. Jamb base: the bright drip skirting, and no cedar course grid
- **Parts:** `base-flashing` (drip x −107, y 293 → 285); `jamb-cedar` (from 305); `cedar-band` (from 2975).
- **Problems:**
  - **Drip:** at x −107 the stainless kick is 13 proud of the cedar. It reads as a light skirting line, the only glint at the base (capture E, `exterior-close`).
  - **Course grid:** 09 §9.1 accepted a "matte stainless drip line" [S 09 §10]. But 10 §3.2(a) recommends the hidden drip, 10 past the **plinth** face, in the cedar's shadow [S 10 §3.2a, code ≥ 5 from the face below via 01]. No exposure is stated. With lap 2's 123, (2975 − 305)/123 = 21.7, so the band courses above the canopy and the field courses beside the canopy end do not line up.
- **Fix:**
  - **`base-flashing` path** → `[[24.2, 360], [24.2, PLT(24.2)], [-85, PLT(-85)], [-91, PLT(-85) - 6]]`:
    - the drip is 10 past the parge face, 3 behind the cedar face, with a 6 mm 45° kick;
    - the finish is 316, dark matte (bead-blasted plus a dark coating) or charcoal-coated;
    - cedar end water falls past it onto the pebble strip (N20).
    - This departure from 09 needs R1's sign-off on water. As R5 I sign off the look.
  - **Exposure:** 1×6 channel siding at **E = 127.14**, which gives exactly 21 courses from 305 to 2975.
    - Course lines: 432, 559, 686 (spout top), 813 … 2848, 2975.
    - The canopy end plate (2795–2983) then sits between the lines at 2721/2848 and 2975, and the first band course over the cap continues the field course.
  - With N16 there are no ripped boards beside the reveal.

### N22: minor. The basin and rill read as a pale patch and an intermittent slot
- **Parts:** `basin-cobbles` and `rg-apron` (`aggregate` 158,153,143); `rill-floor` (`reclaimed-stone`); `clapper` (x −1731.5 → −2979.5).
- **Fix:**
  - **New `mat` `cobble-dark`, RGB 96,96,94** (basalt or greywacke river cobble) for `basin-cobbles`, `rg-apron` and `jz-pebble`. Wet, they go near-black, so the corner reads as water even when dry [I].
  - **`rill-floor`** → new `mat` `stone-dark` 88,90,90 (basalt-faced trough), so the slot reads as a continuous dark line in the grey ground.
  - **`clapper`:** replace the 1248 solid slab with **slotted granite covers**, 80 thick, each 312 long (2 modules) over the walked reach, each with three 12 mm sawn slots running **along the rill** (x). That is perpendicular to the cross-rill direction of travel, ≤ 13 mm [S B651 8.2.4 via R3]. Water stays visible and audible, and the rill reads end to end.
  - **Basin rim:** chamfer the 60 granite rim 5 mm, so the square reads as a cut stone vessel and not as a missing paver.

### N23: minor. Three "charcoals", and a dark aluminium shell on the west
- **Parts:**
  - `aluminium` (door shell, cassette; usually powder-coated);
  - `steel-prefinished` (cheeks, liners, fascia, cap, drip, downspout; coil PVDF);
  - stainless.
- **Problem:** matched on day 0, they drift apart in gloss and hue by year 10–15 on the west (§1). 14 §8 also flags "west sun on dark Al shell: thermal bow, gasket wear" and suggests mid colours [S 14 §8].
- **Fix:**
  - One finish standard for every visible metal: charcoal ≈ 52,54,56, **matte 15–25 GU, ΔE ≤ 1 between suppliers**, fluoropolymer-class durability (AAMA 2605 or Qualicoat class 3 equivalent) where the makers offer it.
  - **Cool (IR-reflective) charcoal pigments, TSR ≥ 0.25,** for the door shell and the cheeks. The same colour carries less heat, which addresses 14 §8 without lightening the frame [I].
  - Record the colour code for the year-15 and year-30 renewals.

### N24: minor. The jamb-B (fixed) sightline is 100, not 165
- **Parts:** `door-jamb-b` R(4635, 0, 4800, …); `GLASS_RUNS`.
- **Evidence:** 14 §4: "Jamb, fixed **100**" [S ENS-K03 / PHI-ENS].
- **Fix:**
  - If confirmed, model 4700–4800 and add a 65 charcoal liner return on the fixed frame face (w 4735 → 4800, x −2 → 0) so both jambs read 221.
  - Alternatively, accept 221 / 156 asymmetry, which is honest because the fixed side differs.
  - Keep equal glass panes (2175) either way.

### N25: minor. Two-storey proportion: the upper storey is blank, and the model ends are cut raw
- **Parts:** APP upper wall (`cedar-band`, `jamb-cedar` to TOPY 6200); the w −1200 and 6000 ends.
- **Problem:**
  - The canopy is meant to be "a single horizontal datum between the storeys" [S 13 §4.6]. With nothing above it, the elevation reads as a large door in a blank wall.
  - The model ends show cut insulation in every camera.
- **Fix:**
  - Add at least a placeholder upper opening that shares a frame line with the ground floor:
    - **preferred:** one 2.4 m window whose jambs sit on w 0 and 2400 (the cheek and interlock lines);
    - **or:** a full-width ribbon on the cheek lines −56 and 4856, head at 2nd FFL + 2400.
    - The same 56 mm cheeks and a cassette zone, with no canopy (the upper eave shelters it).
  - Close the run ends with a corner return (cedar butt-lap per 10 §3.5), or crop every camera inside the run.

### N26: minor. The canopy cap's tip turns up 4.6 mm, not down
- **Part:** `canopy-cap` path end: `[-757.3, FT(-757.3)+12.8]` = (−757.3, 2945.4) → `[-757.3, 2950]`.
- **Problem:** a 4.6 mm upstand at the drip edge of a 2 % cap. It ponds a strip of water and grit, then spills unevenly. The fascia face will show vertical streaks at the low points within 2–3 years [I].
- **Fix:** with N15, the cap ends in the gutter. Without N15, end the path `[-757.3, 2945.4] → [-769, 2945.1] → [-769, 2928] → [-774, 2923]`: a 12 mm hemmed drip off the fascia [S 10 §3.1 "hemmed drip ≥ 12 mm off the fascia", RCABC via 06].

### N27: minor. The canopy creates two new weathering zones on the cedar
- **Parts:** `jamb-cedar-r` (w −150…−1, under the canopy); `cedar-band` (above the cap).
- **Problem:**
  - 94-wide sheltered strips beside each cheek stay brown while the field silvers, a ghost stripe that frames the frame.
  - The first 2–3 courses above the cap get splash and leaves.
- **Fix:**
  - N16 removes the sheltered strips.
  - Above the cap:
    - raise the first course to **2975** as drawn (≈ 17 above the cap at the wall);
    - fix the lowest band course with screws so it can be replaced;
    - keep the cap free of leaves at the twice-yearly check [S 13 §5.4];
    - P13 pre-greying makes the splash band read as weathering, not as a stain.

---

## 4. Specific questions asked

1. **Canopy and frame:** N16 and P8. Cheeks to 2795, canopy flush at w −56 / 4856, end plates continuous with the cheek sides, head closure 2762–2795. One Π.
2. **Canopy ends:** N16 (FB25 end plates drawn; spout through the A plate).
3. **Cassette visibility:**
   - Retracted, it is **fine and well judged**: flush with the cheeks, it *is* the frame head.
   - Fix the product and zone fit, draw the guides, add the closure (N19).
   - From 5 m the sash top rail shows about 100 under it. Accept that: it is recessed 297 and reads as shadow.
4. **Downspout and spout:** N17 (rectangular, stand-off, open trough at y 686 to x −800) plus N15 (canopy water joins it at the basin).
5. **Basin and rill:** N20, N22. Basin on the module, dark cobbles, dark rill floor, slotted covers instead of the 1248 slab.
6. **Jamb base and plinth:** N21 (hidden drip at −85, E = 127.14) and N20 (pebble strip instead of the 96.5 sliver).
7. **Paving module:** N20.
8. **Cameras and renders:** §6.

---

## 5. Proposals

### P8: "The portal" (recommended)
N16 made into a principle: the cheeks, the cassette head, the head closure and the canopy end plates form one folded charcoal Π.
- The canopy is its lintel. The honey soffit is the only thing between the Π's head and its top bar.
- At jamb A the end plate also carries the spout (N15), so the frame, the canopy and the water corner are one object.

### P9: Slimmer canopy edge (recommended; engineer to confirm)
- **Geometry:**
  - Rake the soffit up from 2800 at the cedar to **2850 at the tip** (4.4°), following the knife-plate taper (120 → 90 [S 13 FB19]) and the outriggers (140 → 89).
  - The fascia becomes about 2845 → 2945 = **≈ 100** (from 150), with the N15 gutter still 36–60 deep inside it.
- **Effects:**
  - Frontal lid: head 225 + about 50 of honey + fascia 100. Even orthographically it reads as charcoal, honey, charcoal, not as one block.
  - The raked soffit shows more honey from the garden and bounces more paving light into the room [I].
  - Still effectively UV-sheltered: a soffit raked up 4.4° toward the tip can take direct sun only at profile angles below 4.4°, which means a few minutes of weak sun at sunrise or sunset [I, geometry].

### P10: "The rain path made visible" (recommended)
Roof water and canopy water both end in one basin, and the base of the wall carries the same dark water line from the threshold to the garden.
- **Sources:**
  - roof → rectangular downspout → open trough spout at 686 (N17);
  - canopy → tip gutter → end spout → chain (N15).
- **Basin:** both land in the granite basin of dark cobbles (N22).
- **Rill:** leaves through a dark-floored rill under slotted covers to the runnel.
- **Base line:**
  - In the opening the channel (granite slips) is the line.
  - Beside the jambs the dark *amaochi* pebble strip (N20) continues it and runs into the basin.
  - So one dark water line runs along the whole base of the elevation, from threshold to basin [S 10 §3.7 JAANUS-AMA].

### P11: Timber canopy outriggers (bold, sustainability; engineer)
- **Change:** glulam arms screwed into the glulam header in place of the three HDG knife plates.
- **Carbon:** ≈ 95 against ≈ 180 kgCO2e [S 13 §4.6].
- **Look:** none; the change is hidden by the soffit and the end plates.
- **Thermal:** removes three steel plates from the thermal plane.
- **Combined with P9:** the arms taper with the raked soffit.

### P12: "Warm lid through the glass" (cheap, high value)
- The exterior soffit (2800) and the interior exposed DF glulam soffit (2780) are 20 apart and both warm.
- **Match their tone:**
  - DF glulam clear oil, ≈ 196,160,118;
  - cedar soffit with a pigmented oil to ≈ 186,142,100.
- **Interior trim:** finish the head trim cap at 2730–2742 [S 13] in DF, not white.
- **Result:** from inside and outside the head reads as one warm plane passing through the glass. Prove it with the C9 inside camera.

### P13: Pre-greyed cedar (carried from lap-2 P4; recommended, trial first)
- The renders already assume silver (150,146,138), so make it the specification.
- One-time mineral pre-greying of all siding, including the band above the cap.
- **Result:** the splash band and any residual shelter read as weathering of a grey wall, not as stains on a brown one.
- Site trial over one winter, as before [S\* LWT via lap 2].

### P14: Bolder: one cedar "frame bay" on two storeys
- Extend the cheek lines (w −56 / 4856) up both storeys as two 56-proud charcoal pilasters to the roof eave.
- The upper opening (N25) sits between them. The canopy becomes the floor-line rail of a two-storey charcoal frame, and the cedar inside the bay can change direction (vertical boards on counter-battens with fire blocks at the floor line [S 09 §0, 9.10.16.2]).
- **Benefits:**
  - It makes the two-storey proportion legible.
  - It explains the canopy as a datum.
- **Costs:**
  - fire blocks;
  - two more long flashings (pilaster tops);
  - about +40 kgCO2e of steel [I].
- **Status:** an architectural choice for the user. Not needed to reach 9.

---

## 6. Renders: what to change in `render.py` and the APP model

1. **Cameras:** replace the two hard-coded shots with a table. All positions must lie inside w −1200…6000, unless the run ends are closed (N25). Spec coordinates are (x, w, y); Rhino = (102000 + x, −w, y).

```python
CAMS = {  # name: ((x, w, y) camera, (x, w, y) target, lens, entourage)
    "C1-axial":        ((-6500, 2400, 1600), (0, 2400, 1900), 30, False),  # whole Π, canopy, both jambs, base line
    "C1b-axial-life":  ((-6500, 2400, 1600), (0, 2400, 1900), 30, True),   # same with tree, shrub, people (grey)
    "C2-water-corner": ((-2600, 1300, 1500), (-800, -450, 0), 30, False),  # basin, spout, rill, cheek A (R5 capture A)
    "C3-head-corner":  ((-1800, 900, 1550), (-250, -60, 2750), 30, False), # cheek top, closure, end plate, soffit (capture C)
    "C4-threshold":    ((-1500, 3600, 750), (-90, 2400, 0), 50, False),    # slips, slot, nosing, rail, notch
    "C5-jamb-base":    ((-1500, -800, 800), (-100, 0, 250), 35, False),    # parge, drip, pebble strip, cheek foot (capture E)
    "C7-far":          ((-7600, 600, 1150), (-300, 2400, 2600), 35, True), # rain-garden floor: tree vs canopy line
    "C9-inside":       ((2200, 2400, 1200), (-6000, 2400, 1500), 28, True),# seated view out: glulam/soffit continuity (P12), chain
}
```

2. **Elevation:**
   - Keep the parallel elevation for proportion, but label it "orthographic: soffit not visible".
   - Add C1 (perspective, eye level) as the judging view.
3. **Proxies:**
   - `person-*` → new palette key `person` 150,150,150.
   - Hide `furniture` and `planting` in every camera whose 4th value is `False`.
4. **Palette additions:**

   | key | RGB | used for |
   |---|---|---|
   | `mesh-black` | 24,24,24 | `band-screen`, `jamb-screen` |
   | `cobble-dark` | 96,96,94 | `basin-cobbles`, `rg-apron`, `jz-pebble` |
   | `stone-dark` | 88,90,90 | `rill-floor` |
   | `person` | 150,150,150 | `person-*` |

   - Print every visible part that falls back to a role colour, and every visible `softwood-pt` face (the ledger and outrigger ends must never show).
   - Re-run the material assignment before capture: the document currently shows role colours in "Rendered" mode.
5. **Articulation:**
   - cedar shadow lines every 127.14 from 305 (3 mm reveals);
   - 6 mm stone joints on the 156 module with random cross joints;
   - slotted covers;
   - cheek hems;
   - ZIP guides;
   - the 4 mm hairline at the drip.
6. **Light:**
   - Turn the sun on: `doc.Lights.Sun.Enabled = True`, `SetPosition(datetime, 49.25, -123.1)`, with shadows.
   - Render C1 and C3 at 21 Jun 18:00 PDT (west, low sun under the canopy into the reveal) and 21 Dec 14:00 (winter).
7. **Ageing set:** C1 and C2 at years 0, 5, 15 and 30, using the §1 keyframes.

---

## 7. Top 3 changes that would raise the score most

1. **Make the frame a portal (N16, P8, N26, N27).**
   - `CANOPY` → [−56, 4856], with charcoal end plates continuous with the cheek sides.
   - Cheeks to 2795. `head-closure` 2762–2795 flush with the cassette.
   - Cedar runs full height to the cheeks. The cap ends in a drip, not an upstand.
   - Optionally the P9 raked soffit, for a fascia of about 100.
2. **Turn the canopy and roof water into the water corner (N15, N17, N20, N22, P10).**
   - Tip gutter, lip 2936 below its 2946 back, falling to an end spout at w −56 → −306 into the basin.
   - Rectangular stand-off downspout, open trough spout at y 686 to x −800.
   - Basin on the module, x −483.5…−1107.5.
   - Dark cobbles 96,96,94, a dark rill floor, slotted covers, and an *amaochi* pebble strip replacing the 96.5 sliver.
3. **Render what matters (N18, §6).**
   - Cameras inside the run.
   - A dedicated water-corner view (C2) and a head-corner view (C3).
   - Courses at 127.14, stone joints, sun, grey proxies hidden in judging views.

These three take the edge to about **8.5**. Then N21 (hidden drip), N23 (one charcoal standard, cool pigments), N25 (an upper opening on the frame lines) and P13 are the moves toward 9.

---

Sources this lap (web):
- REN-150B: [Renson Fixscreen 150 installation manual (MHL_Fixscreen-150_de_en)](https://dam.renson.net/m/4eb7a7e72d9d7c9f/original/MHL_Fixscreen-150_de_en.pdf) and [Renson Fixscreen 150 product page](https://www.renson.eu/en-gb/producten-zoeken/zonwering/screens/fixscreen/fixscreen-150/fixscreen-150-m1-f), search snippets only [S\*]. Box dimensions 150/155/160 appear in the drawing text without labels.
- [Renson Fixscreen Go / Minimal sheet](https://dam.renson.net/m/25aa06f63650ba6f/original/LL_FixscreenGo_de.pdf): 85/90/110 square cassettes, snippet [S\*].
