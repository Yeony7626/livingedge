# R5 review: exterior appearance and craft. Detail 02 (d2v1), lap 1

Reviewer: R5, covering the finished look from outside and how it ages.
Inputs:
- `detail02.mjs` and `review/d2-lap0/` (exterior-eye, exterior-elevation, H/T/S/M section and axo PNGs, report.md).
- Research 10, 11, 09, 08b and 06 (B rows).
- One read-only Rhino perspective capture.

Conventions:
- **Datum:** x = 0 at the sliding frame's exterior face, exterior negative. y = 0 at FFL. Millimetres.
- **Tags:** **[S]** is sourced (key or research row given). **[I]** is inferred, with the reason stated.
- **Rhino mapping (from build.py):** Rhino X = 40000 + x, Rhino Y = −w, Rhino Z = y.

---

## 0. What the edge looks like now (worked out from the geometry, not the placeholder renders)

**Base, from the paving up**
1. Pavers at −8.
2. A 10 mm polymer-concrete channel lip.
3. A 130 mm stainless grate (x −161.5 to −31.5).
4. A 5.5 mm gap.
5. A 26 mm bevelled nosing (+5 to −8).
6. A 15 mm track lip.
7. The sash bottom rail, 110 mm face.
8. Glass from +120.

The frame base shows about 128 mm above the grate.

**Head, from the top of the glass up**
1. Glass top at 2600.
2. Sash top rail plus head track, 2600–2730 (130 mm). This balances the 128 mm base well.
3. The head flashing, 98 mm wide on its underside, with its nose at 2734–2746 (x −98.6).
4. A 12 mm gap where the insect screen shows.
5. A 206 mm cedar band, 2752–2958, face at x −89.6.
6. A 20 mm slot, with its mesh *in the face plane*.
7. A frieze 39 mm tall, 26 mm proud of the band (2978–3017).
8. The cedar soffit at 3017, 575 deep.

**Eave**
1. Cedar fascia showing below the gutter, 3006–3224 (218 mm).
2. Gutter face, 95 mm (3224–3319), sitting 143 mm off the fascia.
3. A 21 mm shadow.
4. Edge metal, 120 mm (3340–3460).

**Totals**
- Opaque horizontal bands above the glass run from 2600 to 3460. That is **860 mm of "lid" over 2480 mm of visible glass** (ratio 0.35), made of **8 distinct lines**.
- The eave edge alone is **454 mm**, which research 10 §0.2 already flags as heavy (≈15 % of wall height).

**Green roof**
- The sedum top is ≈ 3606 at x −98.5.
- A sightline at 1.6 m eye height over the edge-metal corner (−607, 3459) shows the sedum only to viewers more than **≈ 7.1 m** from the glass. Deeper into the roof it is hidden from anywhere inside the site.
- So the living roof is **invisible from the landing, the terrace and the planting bed** [I, geometry].

**What is already right (keep it)**
- The flush threshold, with the frame recessed ≈ 90 mm behind the cladding plane. This gives a deep shadow reveal at the head and jambs.
- Top and bottom frame lines are equal (≈ 130 / 128).
- The head-flashing drip at x −98.6 lands **on the grate**, not on the paving.
- Grate slots run parallel to the door, so they read as fine lines echoing the threshold.
- No zinc or copper anywhere. Metals are prefinished steel or stainless, as research 10 §3.8 asks [S UWML-MOSS, VMZ-COMP via 10].
- The cedar soffit is sheltered, so it will hold its colour.
- The landscape sequence is sound: landing, shrub, bed with tree, then rain garden.

---

## 1. Score: **5 / 10** for the finished look from outside, now and as it ages

**Why it is not lower**
- The base is well conceived: flush, drained, deep reveal, balanced frame lines, and a grate that takes the head drip.
- The metal palette carries no stain or moss-suppression risk.

**Why it is not higher**
1. **Heavy, fussy top.** The top is heavy (860 mm of bands over the glass, 454 mm of eave edge) and fussy (8 lines in three materials).
2. **Cedar fascia ages badly.** It is the most exposed timber on the edge. It sits half in the gutter's shadow and needs two boards (446 mm > the ≈ 286 mm widest stock board [I]). It will go two-tone, with a horizontal joint and stand-off streaks within 5 years.
3. **Head band is an accidental third tone.** The cedar band over the glass is a 1.6-course sliver of channel siding. It lies entirely in the sheltered U-zone, so it will not weather with the wall field [S 10 §2.1 NAK-LONG/ABODO-WEA; 09 §4.2 O/4 band].
4. **Head not tucked.** The head sits 271 mm below the soffit, against the ≤ 150 mm target (11 H12 [I]; O/4 rule [S 11 §3.4]).
5. **No colours specified.** Frame colour, gutter, downspout, grate finish and paver colour are all missing. Soffit, band, frieze and fascia share one `mat`.
6. **Shrub blocks the view.** It sits on the opening axis, 2 m in front of the glass.
7. **The renders cannot be judged** (B1).

---

## 2. Findings

Counts: **1 blocker, 5 major, 11 minor.**

### B1: blocker (for this review, not the building). The exterior renders cannot be used to judge appearance
- **Parts:** `render.py` PALETTE and cameras; all parts.
- **What is wrong:**
  - `PALETTE` has no entry for Detail 02's `mat` keys: `cedar-siding`, `fibreglass`, `concrete-exposed`, `aggregate`, `soil`, `sbs`, `membrane-poly`. They fall back to role colours:
    - cedar renders off-white (235,230,215);
    - the frame renders tan;
    - pavers render the same tan as soil;
    - gravel renders light blue.
  - The elevation camera looks along +X from X = 20000. It passes through the other detail versions at lower X offsets: the white geometry and bench in `exterior-elevation.png` belong to Detail 01. The tree and shrub also cover two thirds of the wall.
  - The eye camera sits at w ≈ +4830, beyond the cut (L = 1800). It therefore shows the **section face of the slice**, with coloured membranes and insulation, instead of a façade.
  - A 1.8 m slice with stepped-back layers cannot show proportion, repetition, the interlock, the jambs or the eave corner.
- **Fix:** see §4. [I, from render.py, build.py and the two PNGs]

### F1: major. The eave edge is 454 mm deep, in three materials, and the cedar fascia ages two-tone
- **Parts:** `fascia`, `edge-metal`, `gutter`, `gutter-spacers`, `nailer-1…5`, `roofins-1`, `roofins-2`, `coverboard`, `joists`, `soffit`.
- **What reads badly:**
  - From the ground the edge stacks three bands: 120 mm of edge metal, a 95 mm gutter face standing 143 mm proud, and 218 mm of cedar below the gutter. The gutter is a separate projecting object.
  - The cedar fascia needs a horizontal joint, because 446 mm is wider than standard stock.
  - The depth exists only because polyiso and four nailer plies (162 mm) continue out over the unheated overhang. The insulation outboard of the wall line (x < −52) does no thermal work [I; 10 §3.6].
- **How it ages:**
  - The fascia is fully exposed to rain and UV but half-shaded by the gutter. It greys blotchy in Vancouver [S RC-DECK via 10 §2.1].
  - Expect tannin and iron streaks under the stand-off fixings, and the board joint opening by about year 15.
- **Exact fix:** Proposal D1 (thin cold overhang plus fascia-gutter), which gives **one charcoal band of 236 mm (y 3100–3336)**.
- **Minimum fix if D1 is rejected:**
  - Delete the cedar `fascia`.
  - Wrap the nailer and joist ends with a 0.76 mm (22 ga) charcoal PVDF steel face from y 2998 (a 19 mm drip below the soffit, with a 12 mm hemmed kick) up under the edge-metal flange.
  - Make the `gutter` a square box, 125 × 100, in the same charcoal. Set its back top at 3334 and front lip at 3319 (keep the outward overflow), so no stand-offs show.
  - The edge reads as one dark band, but it stays 454 mm deep.
- **Basis:**
  - Edge-metal drop ≥ 50 mm and ≥ 100 mm below the fascia top, with a hemmed drip ≥ 12 mm [S 06 B15, CMHC-FL/RCABC].
  - One dark colour for edge, gutter and fascia [I 10 §3.6].
  - Gutter removable [S 06 B19].

### F2: major. The head band is fussy and sits 271 mm below the soffit
- **Parts:** `band-cedar`, `band-vent`, `frieze`, `band-closure`, `head-flashing`, `soffit`.
- **What reads badly:**
  - Between the flashing nose (2746) and the soffit (3017) there are five lines: flashing, a 12 mm gap, a 206 mm cedar band, a 20 mm mesh slot, and a frieze 26 mm proud.
  - The band equals 1.6 courses of channel siding (≈ 121–127 mm exposure [I, profile to confirm]), so one course will be ripped.
  - The trim sits 271 mm below the soffit, outside the sheltered O/4 band (150 mm) [S 11 §3.4], and outside the ≤ 150 mm look target [I 11 H12, §1].
- **Exact fix with no structural change:**
  - Delete `frieze`. It is [I] in 06 B24, not required.
  - `band-cedar`: bottom at y 2748, which is 8 mm above the flashing at the cedar face (6–10 mm [S 09 §4.2 RC; 06]). Top at 2748 + 2 × exposure (≈ 2990 with a 121 mm exposure). That gives **exactly two full courses**.
  - The slot to the soffit stays **≥ 20 mm** [S LUNA-NA/THERM-IG via 10 §3.1]. If the profile's exposure leaves less than 20 mm, use one course of the next wider board.
  - Set the head-flashing level on a course line of the jamb walls, and count courses down to the base course (see F6).
- **Better fix:** Proposal D2 (raked soffit, head trim 150 mm below the soffit, one course plus a slot), or D3 (no lintel).

### F3: major. The lintel will probably have to change, and if it deepens downward the opening and head band get worse
- **Parts:** `lintel`, `packer`, `head-track`, `band-*`.
- **What happens:**
  - A glulam 130 × 266 over about 5 m at ≤ 3 mm superimposed deflection is unlikely. The spec's own note says so.
  - A rough check gives I ≈ 8 × 10⁸ mm⁴ needed for ≈ 3.8–5.9 kN/m snow on a 2.1–3.6 m tributary [I].
  - In glulam that means ≈ 130 × 425 or 175 × 385 [I]. Hung downward, that lowers the head by ≈ 120–160 mm or adds the same to the opaque band.
- **Exact fix (appearance requirement):**
  - **Hold the lintel underside at y ≥ 2770** whatever the engineer chooses.
  - Candidates of the same depth are a steel W250 class (W250×58, 252 deep, I ≈ 87 × 10⁶ mm⁴, gives ≈ 2–3 mm under those loads) or a glulam–steel flitch [I; structure reviewer to confirm].
  - The other route is D3, which removes the lintel.
  - Carbon: a 5.4 m W250×58 is ≈ 310 kg steel, so +0.3–0.5 t CO2e against glulam (1.71 kg/kg proxy [S 09 §3.1 E-HSS]) [I]. That cost belongs in the trade-off.

### F4: major. The palette is not specified in the spec, so the look cannot be built or rendered as designed
- **Parts:**
  - `sash`, `sash-top`, `head-track`, `track`, `nosing` (fibreglass, no colour);
  - `gutter`, `edge-metal`, `head-flashing` (no colour stated);
  - `grate` (no grade or finish);
  - `pavers-*`, `pocket-curb*`, `edge-restraint` (no colour or finish);
  - `band-cedar`, `frieze`, `soffit`, `fascia` (one `mat` for four exposures).
- **Exact fix:** give these parts the D4 palette, with new `mat` keys:
  - `cedar-siding` for wall-family boards;
  - `cedar-soffit`, honey, sheltered;
  - `metal-charcoal` for all prefinished steel and the frame exterior;
  - `stainless-316-bb`;
  - `paver-warmgrey`;
  - `mesh-black`.
- **Basis:** "one PVDF colour (charcoal) for flashings, edge metal, gutter and downspouts" [I 10 §3.8]; dark where water would stain, light only where sheltered [I 10 §2.3].

### F5: major. The shrub pocket sits on the opening axis, 2.0–3.2 m in front of the glass
- **Parts:** `shrub`, `pocket-soil`, `pocket-curb`, `pocket-curb-2`, `pocket-curb-w`, `root-barrier-pocket` (w 300–1500, the middle of the slice).
- **What reads badly:**
  - From outside, a 1.5 m evergreen mass plugs the opening and hides the threshold.
  - From inside, it blocks the seated (1.2 m) and standing view axis through the door. It also puts leaf litter on the line of approach.
- **Exact fix:**
  - Keep x −2043.5 to −3291.5 (see F9 set-out), but move the pocket in w so it sits **outside the opening width**. Its centre goes ≈ 600 mm beyond the jamb line on the downspout side.
  - There it frames the opening and screens the downspout boot and cleanout.
  - The landing in front of the door stays a clear ≥ 1700 × 1700 [S 08b].
  - The canopy edge stays ≥ 1.5 m from the door [I 11 §6.2].
  - In the 1.8 m section slice, draw the shrub beyond the cut, as an elevation element.

### F6: minor. Cedar sits in three exposures under one finish, so the head band and fascia become accidental third tones
- **Parts:** `band-cedar`, `frieze`, `soffit`, `fascia`.
- **How it ages:**
  - The band (within 265 mm of the soffit) and the soffit stay brown or pigment-tone.
  - The jamb-wall field silvers, and the fascia goes blotchy grey [S 10 §2.1 NAK-LONG/ABODO-WEA; 09 §4.2 "top 150 mm under the eave browner"].
- **Fix:** each element joins one family:
  - The **soffit** is honey cedar, clear UV oil (RGB 182,136,96). Wash it at the twice-yearly roof check [S 10 §3.6, BCH-MM02].
  - The **head band** is either wall siding (factory bleaching oil with grey pigment, courses aligned with the jambs, accepting a slightly warmer tone) or, on the west, the charcoal blind-box face (D5).
  - The **fascia** becomes charcoal metal (F1/D1).
  - On the jamb walls, set the base course at y ≈ +335. That is 19 courses at 127 below 2748, and ≈ 343 above the −8 paving, which also meets the 300 mm high-rainfall clearance over hard paving [S LUNA-NA via 10 §3.1]. Adjust to the real exposure.

### F7: minor. Vent and insect meshes show
- **Parts:** `band-vent`, `band-screen`, soffit open joints.
- **What reads badly:** the `band-vent` vertical leg sits at x −89.85, which is the cedar face plane. It reads as a grey mesh strip.
- **Fix:**
  - Move the vertical leg to x = CEDAR + 12 ≈ −77.6, from the cedar top to the soffit.
  - Make all mesh black (RGB 24,24,24).
  - `band-screen` stays at 2749.75 but black.
  - Soffit: boards parallel to the wall, with 6–8 mm open joints over black mesh.
- **Basis:** [I 10 §3.6]; the cavity must not open to the soffit [S 06 B22].

### F8: minor. The head-flashing nose has an unhemmed 5 mm kick, and its end dams will show as lumps at the reveal corners
- **Parts:** `head-flashing`; jambs (not modelled).
- **Fix:**
  - Fold a 6 mm hem on the drip, (−93.6, 2739) → (−98.6, 2734) plus the hem. It gives a crisper line and no white-rust cut edge [I 10 §2.1 prefinished steel row].
  - Line the jamb reveals (0 to −89.6) with 0.76 mm charcoal folded liners.
  - Fold the head-flashing end dams up *inside* those liners, so the glass gets one dark picture-frame: head flashing underside, jamb liners and nosing.
  - Cladding returns stop 6–10 mm off the liner [S 11 §6.5].

### F9: minor. Paving is drawn as continuous slabs with no module, joints, colour or set-out
- **Parts:** `pavers-lined`, `pavers-1…3`, `pocket-curb*`, `edge-restraint`.
- **Fix:**
  - **Units:** 150 × 450 × 80 permeable concrete planks laid in running bond (⅓ offset), with the **long axis parallel to the glazing**. The joint lines then echo the threshold, grate slots and siding courses [I].
  - **Joints:** 6 mm in the lined landing, 8 mm in the terrace (≤ 6 / ≤ 10 [S 08b M12, M14]).
  - **Set-out:** start from the channel's outer edge at x −171.5 with a **full course, no cuts**, on a 156 mm module.
  - Joints then fall at −171.5 − 156n. For example:
    - the pocket's house-side curb face at **−2043.5** (n = 12, was −2000);
    - `PATH_END` at **−3291.5** (n = 20, was −3250).
  - **Finish:** shot-blast or exposed fine aggregate (basalt), BPN ≥ 55 [S 08b], warm mid-grey (RGB 132,128,120).
  - Cast the curbs and edge restraint in the **same pigment**, so the pocket reads as a cut in the paving, not a frame.
  - No weathering steel edging, because it rust-stains the pavers [I].

### F10: minor. The grate will show as a bright, tea-stained strip; the channel ends and edge rail need detailing
- **Parts:** `grate`, `channel`.
- **Fix:**
  - Grade **316** stainless, bead-blasted matte (RGB 176,178,178). This extends the 316-at-seacoast rule [S RC-PRE via 10 §3.1] [I].
  - Any channel edge rail in stainless or ductile iron, never galvanized [S UWML-MOSS/VMZ-COMP via 10].
  - The channel runs "+150 each side" of the opening [I 11 T16]. End it exactly at the jamb-liner face, or carry it the full length of the glazed bay. Do not let a 150 mm stub poke under the plinth step (11 C1). Model this end condition next lap.

### F11: minor. Gutter overflow lands on the accessible landing
- **Parts:** `gutter`.
- **Problem:** the front-lip overflow at x −743 falls onto the lined landing, 0.74 m from the glass. In winter that can freeze.
- **Fix:** add a 50 × 25 overflow slot in the gutter end cap at the downspout end, beyond the opening, over a 400 × 400 cobble basin set ≥ 600 mm off the cladding [I 10 §3.6 rain-chain row]. Keep the front lip below the back (already 15 mm).

### F12: minor. The green roof is not legible from the garden
- **Parts:** `gr-edge-profile`, `gravel-edge`, `sedum`.
- **Problem:** see §0. It is visible only beyond ≈ 7.1 m.
- **Fix:** optional proposal D7 (planted fringe). Otherwise accept the roof as a "fifth elevation", and do not show it in exterior renders as if it were seen.

### F13: minor. Rain-garden hardware will read as plumbing
- **Parts:** `rg-riser`, `rainwater-line` outlet.
- **Fix:**
  - Fit a charcoal domed grate (RGB 52,54,56) on the riser, 100 below the rim, ringed with 100–150 grey cobbles.
  - Bring the inlet out behind a flat 600 × 400 × 150 basalt splash stone at the rim (the spec's own "splash rock"; model it), so the water is seen arriving [I 10 P11 *amaochi* idea].

### F14: minor. Bed mulch is flush with the path edge and will scatter onto the pavers
- **Parts:** `bed-mulch`.
- **Problem:** `BT(BED0) = PT(PATH_END)`.
- **Fix:** set the mulch top 40 below the `edge-restraint` top at x = BED0, so the bed's first 300 mm runs at −40 relative to the paving [I].

### F15: minor. Large clear glass faces a shrub and a tree
- **Parts:** `glass-1…3`.
- **Problem:** this is a reflection and bird-strike setting. Research 11 Q10 left it open. The pattern choice changes the exterior look.
- **Fix:**
  - Specify a neutral low-e with ≤ 15 % exterior visible reflectance [I].
  - Decide now on a surface-1 dot or line pattern (acid-etch or ceramic frit) at ≤ 50 × 100 mm spacing [I; not sourced this lap].
  - Or rely on the D5 screen when it is lowered.
  - On the west, any lower-SHGC coat keeps SHGC ≥ 0.28 [S* 11 §7].

### F16: minor. The jambs, plinth step-down, interlock and eave corner are unmodelled, though they decide the elevation
- **Parts:** all (slice only).
- **Fix:** model a dressing for the next lap (§4):
  - 4.8 m opening, 2 panels, interlock 200 mm at the centre [S 11 §2.3, Cascadia 202];
  - jamb reveals with liners;
  - 1.2 m cedar walls each side on the +300 plinth, stepping down at the jambs (11 C1);
  - downspout at one end;
  - eave carried 600 mm past the corners.

---

## 3. Design proposals (bigger moves)

### D1: Thin cold overhang with a fascia-gutter. One charcoal band, 236 mm (recommended)

**Roof build-up over the overhang**
- `roofins-1`, `roofins-2` and `coverboard` start at **x −100** (was −435). That is 48 mm outboard of the wall insulation face at −51.6 [I 10 §3.6].
- Delete `nailer-1…5`.
- New single PT nailer, 38 high at the face, x −575 to −535, on the AVB.
- Tapered PT sleepers at 400 centres carry 12.5 plywood. Its top runs from (−575, 3328) to (−100, 3452), **≈ 26 % fall**.
- `membrane-roof` follows this chamfer. SBS on this slope will need back-nailing per roofing practice [I; roofing to confirm].

**Green-roof edge**
- `gravel-edge` moves inboard to x −100 … +290, on the insulated roof.
- `gr-edge-profile` goes to x +290.
- `drain-mat`, `growing-medium` and `sedum` start at +291.5.

**Joists and soffit**
- Taper the `joists` bottom from y 3036 at x −150 to **y 3131 at x −575** (tip depth 140) [I; cantilever moment is zero at the tip; engineer to confirm with the gutter and snow at the tip].
- The `soffit` underside follows: 3017 at x ≥ −150, rising to 3112 at x −575.

**Fascia, edge metal and gutter**
- `fascia` (cedar) is deleted. Replace it with a 19 mm PT plywood backer, x −594 … −575, y 3100 … 3328.
- `edge-metal` is 0.76 mm charcoal PVDF:
  - top flange over the nailer;
  - face at x −595 from 3336 down to **3236** (100 mm drop, ≥ 100 below the top [S 06 B15]);
  - hemmed drip kicked 12 mm to x −607 at 3230.
- `gutter` becomes a **fascia-gutter** in 0.76 mm charcoal PVDF:
  - back leg at x −603 on stainless brackets, top 3225 (below the drip);
  - bottom at 3120, 130 wide;
  - **front face plane x −735**, running from y 3100 up to a lip at **3205** (20 below the back, so overflow goes outward);
  - a 20 mm skirt below the box bottom with a 12 mm drip return hides the brackets;
  - leaf screen;
  - fall 1:200 to an outlet at the end of the opening.
- **Seen from the ground:** a 105 mm face, a 31 mm shadow, then 100 mm of edge metal, all charcoal. **The band is 236 mm (3100–3336), against 454 mm now.**
- The edge plane moves out to −735, which adds shelter and summer shade.
- If the soffit taper is rejected, keep the soffit at 3017 and the band is 330 mm.

**Concealed or built-in gutter:** not recommended. It is the cleanest line, but leaks are unseen and it is hard to clean under Vancouver leaf fall [S/I 10 §3.6 table, C1]. The fascia-gutter above gives almost the same line while staying hung, removable and visible to inspection [S 06 B19].

**Effects**
- **Thermal:** none. The polyiso removed is outboard of the wall line.
- **Moisture:** faster run-off at the edge. One fewer membrane step. Cedar is no longer exposed at the fascia.
- **Carbon**, per metre of eave [I, 09 §3.1 factors]:
  - polyiso −3.4 kg;
  - cedar fascia −1.2 kg fossil;
  - three PT nailer plies ≈ −1.3 kg;
  - extra steel in the fascia-gutter +2.3 kg;
  - sleepers +0.7 kg;
  - **net ≈ −3 kg CO2e/m, ≈ −0.15 t over a 55 m edge.**
- **Maintenance:** no fascia recoat. The gutter and edge are renewed with the roof at ≈ 20 years [S 06 via 10 §4.1].

### D2: Tuck the head under a raked soffit (recommended for both façades; combine with D1)
- The `soffit` underside sits at **y 2896 at x −90** and rises in a straight line to **3112 at x −575**, which is ≈ 24°.
  - The soffit hangs on tapered furring below the joists. The furring is deepest at the wall (≈ 121 below the joist bottom at x −90) and runs out to zero at the joist tips.
  - The joist tips are tapered as in D1, to a bottom of 3131 at x −575.
- Head band: flashing nose at 2746, then **one course** of channel siding (2748 → 2875), then a 21 mm black-mesh slot (2875 → 2896, mesh set 12 behind the face), then the soffit.
  - `band-closure` at 2855–2875 behind the cedar.
  - `band-ei` and `band-strap` continue up behind the soffit to 3036, inside the vented overhang void.
  - `frieze` is deleted.
- **Head trim to soffit = 150 mm.** The head is then in the code's sheltered O/4 band [S 11 §3.4 via 01/03] and meets the look target [I 11 H12].
- **Requires F3:** lintel underside held at ≥ 2770.
- **Effects:**
  - The glazing reads as running up to the roof plane.
  - The raked soffit opens the sky view and daylight from inside [I].
  - Overhang shading is unchanged at the edge. The edge bottom rises 94 mm, so ≈ 94 mm less glass is shaded at a 30° profile [I].
  - Carbon: furring only, unless the lintel changes (F3).

### D3: No lintel. A two-way CLT "plate lintel" (alternative to D2, best look, structure-led)
- A 5- to 7-ply CLT panel (≈ 245 mm [I, rough EI check for ≤ 3 mm over 5 m]) spans between the jamb walls parallel to the glazing. It is ≈ 1.8 m wide and cantilevers 600 mm out (CLT's minor direction).
- The joists inboard bear on its inner edge.
- The `head-track` fixes under the panel via a 25 mm packer. The soffit is the panel underside, cedar-lined or exposed, continuous from inside to outside.
- The head trim sits within ≈ 20 mm of the soffit.
- **Effects:**
  - **Air barrier:** the AVB runs over the panel top, which replaces the joist-bay blocking at the head. That blocking is the highest-risk air path [S 06 B4 via 11 §5.2].
  - **Thermal:** a minor timber bridge through the wall line [I].
  - **Carbon:** ≈ +20–30 kg CO2e/m² fossil over the panel area (0.26 kg/kg [S RAS21 via 09]), with ≈ 150–185 kg CO2/m² stored [I].
  - **Structure:** creep under green-roof dead load must stay inside the 3 mm head clearance [S MAR-ULS via 11].
- Structure reviewer to decide between D2+F3 and D3.

### D4: Palette (RGB for the model and renders)

| key | use | RGB | basis |
|---|---|---|---|
| `metal-charcoal` | frame exterior (fibreglass), nosing, head flashing, jamb liners, edge metal, fascia-gutter, downspout, riser dome | **52,54,56** | one charcoal [I 10 §3.8] |
| alt. dark bronze | only if the architect prefers warm metal with cedar | 74,64,54 | [I 10 §4.2] |
| `cedar-siding` yr 0 / 5 / 15 / 30 (bleaching oil, then left) | wall courses, head band | 170,160,145 / 158,153,144 / 152,147,138 / 140,138,133 | [I from 10 §2.1; 09 §4.2] |
| `cedar-soffit` | soffit, clear UV oil, sheltered | 182,136,96 (yr 30 ≈ 170,135,105) | [I 10 §3.6, §4.1] |
| `stainless-316-bb` | grate, screens under grate, brackets | 176,178,178 | [I] |
| `mesh-black` | all insect and vent mesh | 24,24,24 | [I 10 §3.3, §3.6] |
| `paver-warmgrey` | pavers, curbs, edge restraint | 132,128,120 | [I] |
| gravel / mulch / sedum / glass | as `render.py` | 158,153,143 / 70,52,38 / 120,140,80 / 150,175,185 | existing |

**Frame colour**
- Charcoal makes the frame part of the reveal shadow, so the glass reads larger [I].
- Fibreglass expands at a rate close to glass, so a dark frame on the west is acceptable [I].
- If the PVC Westeck unit is chosen, avoid dark exterior colours on the west, because of heat in PVC [I 11 §7 "dark frames expand more"].
- Carbon: neutral.

### D5: West exterior shading, integrated rather than added (west only)
- **Why:** research 11 §7 calls for exterior vertical shading or blinds on the west [S BC-B24-08]. The 600 mm overhang shades only ≈ 0.35 m of glass at a 30° profile [I 11].
- **Option a (fits D2):** a ZIP-type fabric screen.
  - Box ≈ 110 × 110, recessed into the raked soffit at x −110 … −220, behind a 20 mm charcoal slot.
  - Charcoal fabric at 5 % openness, so the view stays readable.
  - 30 × 30 charcoal guides on the jamb cladding faces at x ≈ −120.
- **Option b (keeps a flat soffit):** an exterior venetian blind.
  - The head box (≈ 220 high) replaces the cedar band.
  - Box face in 0.76 mm charcoal at x −172 from 2748 to 2997, reading as a deliberate "lintel band".
  - Guides in the 90 mm reveals.
- **Effects:**
  - Exterior shading stops solar gain before the glass, and also mitigates bird strike and glare [I].
  - Aluminium box and guides ≈ 25–35 kg per opening, ≈ +0.1–0.15 t CO2e [I, 09 §3.1 Al 4.2–5.0 kg/kg].
  - Motor and fabric service ≈ 10–15 years [I].
- **Keep the deciduous Amelanchier** about 4.4 m out. Its canopy (1.9–4.0 m above grade) blocks sun at ≈ 20–40° altitude, which is exactly the low west summer sun, and it lets winter sun through [I, geometry].

### D6: Paving as a coursed, quiet ground
- Use F9's planks, set-out, colour and finish. Run one paver throughout, continuous over the liner cut-off with no visible joint [S 08b M14].
- Move the shrub off-axis (F5).
- Effects: the same pavers, so no carbon change. Full courses at the channel and curbs mean less cutting waste [I].

### D7: Optional "living lip" so the green roof is seen from the garden
- On the insulated roof just inboard of the D1 gravel strip, x +290 … +900:
  - growing medium 150 (was 80);
  - drought-tolerant native forbs and grasses, 300–450 tall (e.g., Festuca roemeri, Allium cernuum, Eriophyllum lanatum [I, species to confirm against 08 L]).
- The fringe tips (≈ 4.0 m) show above the 3336 edge from ≈ 2.9 m out [I, sightline].
- **Costs:** about +0.9–1.0 kPa saturated load in the band, which the engineer must confirm. More summer-dry biomass near the edge, so keep the full gravel strip between the fringe and the edge; the fire-zone rule was not read [10 §6].

---

## 4. What the renders need next lap

1. **Isolate the model.** Before every exterior shot, hide all layers except `Detail02::<version>`, or add a clipping plane at Rhino X = 40000 − 8100 facing +X. The elevation currently looks through Detail 01.
2. **Map the palette.** Add D4's keys to `render.py` `PALETTE`, and change the `mat` of the soffit, head band, fascia and frame parts in `detail02.mjs`. Print any `mat` that falls back to a role colour, so the gap is visible.
3. **Build a dressing model** (render only, not the detail):
   - the opening from w 0 to 4800, as two panels with a 200 mm interlock at w 2400;
   - jamb reveals with charcoal liners;
   - 1.2 m cedar walls each side on the +300 plinth, with the step-down at the jambs;
   - the eave carried to w −1800 … 6600;
   - the downspout at w −300;
   - the shrub moved per F5.
   No stepped-back layers should be visible.
4. **Model the surface articulation.** Without it, nothing reads at 1:1. As geometry or bump texture:
   - siding courses: 10 mm channel reveals at the real exposure;
   - paver joints: 6/8 mm at the 156 mm module;
   - grate slots;
   - soffit board joints at 6 mm.
5. **Set up the scene.**
   - Rendered mode, sun shadows on, ground plane at y −8.
   - Glass reflectivity 0.2 with a light-grey environment, so reflections of the tree read.
   - People as neutral grey 1.7 m scale figures.
6. **Cameras** (Rhino X = 40000 + x, Y = −w, Z = y; 1600 × 1000).

| id | purpose | camera → target | lens |
|---|---|---|---|
| C1 | axial eye level from the terrace (with and without the tree) | (40000−6000, −2400, 1600) → (40000, −2400, 1450) | 35 |
| C2 | oblique 30–35° from the garden, showing jamb, corner and eave return | (40000−5500, +900, 1600) → (40000−300, −2400, 1500) | 35 |
| C3 | look-up under the eave: head band, slot, soffit, gutter underside | (40000−1300, −900, 1650) → (40000−350, −2400, 2950) | 24 |
| C4 | threshold close-up, low: paver, grate, nosing, frame base | (40000−1500, −1400, 800) → (40000−90, −2600, 0) | 50 |
| C5 | true elevation, parallel, framed Y −6600…+1800, Z −300…3800 (with and without entourage) | from (40000−20000, −2400, 1700) along +X | parallel |
| C6 | inside out, seated 1200 and standing 1600: shrub and tree placement, frame sightlines | (40000+2500, −2400, 1200/1600) → (40000−6000, −2400, 1300) | 28 |
| C7 | far garden at the rain-garden rim: eave band and green-roof legibility | (40000−7600, +600, 1600) → (40000−300, −2400, 3000) | 35 |
| C8 | sun studies, west façade, Vancouver 49.25 N: 21 Jun 18:00 PDT, 21 Sep 16:30 PDT, 21 Dec 14:30 PST (overhang and tree shadow on the glass); repeat the morning times for east | C1 + C5 | — |

7. **Ageing set.** C1 and C3 at years 0 / 5 / 15 / 30, swapping D4's cedar keyframes. Add:
   - grate grit in year 5;
   - joint moss beyond the eave line from year 5 [S 08b M f];
   - cedar soffit dusting;
   - shrub at 1.0 m (year 5) and 1.5 m pruned (year 15+);
   - Amelanchier ≈ 3.5 m (year 5) and ≈ 5 m (year 15) [I].
   Also produce the current-versus-proposed pair (D1 + D2) from C1 and C5.

---

## 5. Top 3 changes that would raise the score most

1. **D1, the thin cold overhang with a fascia-gutter.** The polyiso stops at x −100, the overhang falls ≈ 26 % on a single nailer, and the joists taper to 140 at the tip. The result is one charcoal band of **236 mm** instead of a 454 mm cedar/gutter/metal stack, and the cedar fascia that ages worst is gone. About −3 kg CO2e per metre of eave.
2. **D2 with F3: tuck the head.** Hold the lintel underside at ≥ 2770 (steel W250 class or flitch), drop the soffit to 2896 at the wall and rake it to 3112. That gives one course plus a black 21 mm slot, no frieze, and the head trim 150 mm below the soffit. The 8-line "lid" becomes glass, frame, one course, shadow, soffit. (Or D3, if the structure reviewer accepts a CLT plate lintel.)
3. **Specify and render the palette and ground.**
   - Charcoal frame and all metal (52,54,56).
   - 316 bead-blasted grate.
   - Warm-grey plank pavers (132,128,120), coursed from the channel at a 156 mm module.
   - Honey soffit kept distinct from the silvering siding.
   - Shrub moved off the opening axis.
   - Renders rebuilt per §4 (B1), so the next lap is judged on a façade, not on a section slice in placeholder colours.
