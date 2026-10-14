# Detail 02, lap 3: review R3 (landscape, people and ecology)

Reviewer: R3. Model: `detail02-v3.mjs` (d2v3 and d2v3-app), packet `review/d2-lap3/`. Read against my lap-2 review (`d2-lap2/review-R3-landscape-people.md`) and `changes-v3.md`. The Rhino layers were not touched.

**Datums.** Same as the spec: x = 0 at the frame's exterior face, exterior negative; y = 0 at FFL; w along the wall (jamb A w < 0, opening 0–4800, jamb B 4800–6000). Millimetres.

**How levels were obtained.** I re-ran the spec's own functions in a scratch script (not part of the project). Key values:

| item | value |
|---|---|
| Paving `PT(x)` | −7 at the channel → −35.6 at the liner end (−1887.5) → −59.0 at the path end (−3291.5), 1:60 |
| Basin | x −500 → −1100, w −750 → −150; shell 60, inner 480 × 480; sump floor −350; outlet Ø80 at centre −105 (invert −145); cobbles to PT − 40 |
| Rill `RF(x)` | −145 at the basin → −151.3 / −163.8 at the clapper ends (−1731.5 / −2979.5) → −168.4 at BED0 (−3441.5). Depth below paving 122.5 → 110 |
| Clapper | x −1731.5 → −2979.5 (1248), w −600 → −300 |
| Runnel `RNF(x)` | −168.4 at BED0 → −202.6 at RIM → lip −207.7 at x −5407.2 (2 %). Depth below the bed 59 → 81 |
| Bed `BT` | −109 at BED0 → −122 at RIM (−5150), 0.76 % |
| Rain garden | house rim −122; crest −275; pond floor −475 (x −6209 → −7009); far rim −175 (x −7909); spill notch −230 (note) |
| Forebay (`forebay-dip`, `rg-apron`) | a 100-deep slot following the 1:3 house slope: cobble top −307.7 at the lip → −507.7 at x −6007 (33 below the pond floor) |
| Pond at crest | x −5609 → −7609 (2.0 m) |
| Tree pit | 1 × 1 m (w 400–1400, x −3900 → −4900), floor −1100 → −1120; link to the rock (top −1100) |
| Soil for the tree | bed 0.77 m³/m + pit ≈ 0.47 m³ + RG medium 1.24 m³/m → ≈ 10.2 m³ per 4.8 m opening (lap 2: ≈ 14) |
| Canopy | tip x −757, soffit 2800; drip line along w −150 → 4950 |

**Tags.**
- SOURCED (S) = from a research file (cited by section) or a web page listed under Sources.
- INFERRED (I) = my reasoning or arithmetic.

---

## 0. Lap-2 findings status

Key: **fixed** · **partly** · **not fixed** · **made worse** · **n/a** (superseded by the v3 design).

| lap 2 | claim in changes-v3 | status in v3 | challenge / evidence |
|---|---|---|---|
| **N1** runnel dammed (blocker) | done | **fixed** | Runnel 2 % to a lip at −207.7: 67 above the crest, 22 above the spill notch. The rill and runnel drain. The "forebay" is a sloping slot, not a pool, and the lip has no drip (→ N18). |
| N2 threshold 16 mm | done | **fixed** (open point) | 12 mm from the tray (−7) to the rail (+5). But the walking line has two 5 mm vertical edges and a 17 mm local excursion (−12 → +5) (→ N17). |
| N3 no accessible operation | done | **partly** | Drive specified and sound (S, 14 §6). The exterior button has no location. The ZIP screen can lock a person out (→ N16). |
| N4 water hardware in the landing | done | **fixed** | Spout, basin and rill are at jamb A; the landing is clear. The rill's new home has its own hazards (→ N14). |
| N5 gutter overflows inward | n/a | **n/a** | No gutter. Roof outlet, leaf guard and catchment for the new downspout are unstated (→ N13). |
| N6 tree pit sump | done | **fixed** | Floor falls 2 %; the clear-stone link reaches the rock (top −1100) below the pit floor (−1120). The pit drains whenever the rock drains, which the subdrain (invert ≈ −1265) ensures (I). |
| N7 RG proxies vs hydrozones | done | **partly** | Rush 600 clear of the riser ✓. Ninebark at GS −245, above the crest ✓. **Slough sedge (700 tall) is still on the house slope at x −5800**, where the seated sight line is at −251. It hides the pond (§2.2). The riser grate is still not a part. |
| N8 rill grate apertures | moot | **fixed** | No grate; a flush clapper slab at the route. |
| N9 wet soles on polished slab | done | **fixed** | Slab "ground finish; mineral floor ≥ 610". A mat well is not drawn (optional). |
| N10 RG slopes, stone floor, throwable stones | — | **not fixed / worse** | No erosion blanket or wood mulch on the 1:3 slopes; the floor is still all stone. **Loose 100–150 cobbles now sit 0.5–1.1 m from the glass** in the basin (→ N13). |
| N11 runnel near the trunk | — | **fixed** | 1.2 m from the trunk, on a 300 crushed-rock strip. |
| N12 jamb zone undefined | done | **fixed** | Granite 80 on bedding and base, with a drain envelope. |
| F2 spill path | — | **partly** | Notch "outside this slice" in a note; `subgrade-far` still rises to −165 beyond the far rim. |
| F6 bed understorey, bee ground, late bloom | partial | **partly** | Two bed proxies (salal/sword fern, currant). No July–October bloom, no bee bank, no mud source (→ F6 carried). |
| F7 root enclosure | done | **fixed in section** | Barriers cast into the granite curbs at the liner edge and path edge, continuous under the rill (curb kept below the rill floor), pocket sides closed. Plan returns at the w-ends are not drawn (→ N19). |
| F11 bird markers | — | **partly** | `glass-1` note on both panels ✓. Dot size missing; no frit in the renders. |
| F12 terrace base outlet | — | **not fixed** | Conditional on the soil test; carried. |
| F15 granite spec | — | **partly** | Lined planks: joints 6, BPN ≥ 55 ✓, fixed edge at the curb ✓. Terrace and jamb pavers have no finish/BPN. "Moss patina" is specified on rill walls that are the walking edge. |
| F18 pocket pH | — | **fixed** (lime source) | Granite curbs, "no lime". Mix pH still unstated. |
| F19 suckers | — | **not fixed** | The tree is now an unnamed "small tree". |
| F20 green roof habitat | — | **n/a** | No green roof in v3. |
| F21 proxies | done | **partly** | Wheelchair proxy ✓ (as a Ø700 cylinder). No seated occupant, no turning circle. |
| F22 screen / silt box | — | **partly** (R2) | Full-length screen gone; a perforated slot screen and a silt-box weir (note) now exist. |
| F23 track weeps | — | **fixed** | Weeps deleted. |
| P1 water margin at the jamb | adopted | **adopted, half** | Hardware moved. The rill sits **in paving**, not in the 300 planted margin I proposed, so it is a hazard rather than a garden edge (→ N14). |
| P2 arrival at the rim | adopted | **partly** | Lip and cobbles exist; not a forebay (→ N18). |
| P3 path and perch | — | **not adopted** | The garden is still view-only from a wheelchair. |
| P4 picture planting | — | **not adopted** | Tall sedge still in front. |
| P5 bee bank and stems | — | **not adopted** | — |
| P6 shelf and lighting | — | **not adopted** | Jamb B became the shrub pocket. Still no lighting anywhere. |
| P7 motor + insect screen | — | **adopted** | Drive plus ZIP screen "doubles as the insect screen". |

**Tally of the 30 lap-2 items:**
- fixed 11 (N1, N2, N4, N6, N8, N9, N11, N12, F18, F23, and F7 in section);
- partly 11 (N3, N7, F2, F6, F11, F15, F21, F22, P1, P2, P7 counted as adopted);
- not fixed 7 (N10, F12, F19, P3, P4, P5, P6);
- n/a 2 (N5, F20).

`changes-v3.md` is accurate except in three places: N3 "done" (no control location), N7 "done" (the sedge still blocks the view), and F7 "done" (the plan closure is not drawn).

---

## 1. Score: **7 / 10** (lap 2: 6)

### What works
- **The blocker is gone.** Water now runs roof → downspout → basin → open rill (1 %) → runnel (2 %) → lip 67 above the crest → garden, and never backs up toward the house. In a blocked-riser storm the backwater reaches only the outer runnel (x ≈ −4870); it never reaches the rill (I).
- **The opening is clean.** Nothing hangs, splashes or grates in front of the glass. The liner is never pierced.
- **Roots are closed in section.** The cast-in-curb barrier detail is used everywhere, and the tree pit drains.
- **Accessibility moved a long way.** A 12 mm threshold and a motor drive with push buttons on both faces.
- **One ground.** Reclaimed granite throughout, coursed parallel to the glass.

### What holds it back
1. **The water corner is built as plumbing, not as a garden edge (N13, N14).**
   - The basin has an 80 mm outlet behind loose cobbles. It holds 47 L of permanent water. Its overflow soaks into a base that drains to the footing.
   - The rill is a 170 × 110–123 open slot in a paved field, beside the accessible landing.
2. **The canopy does not shelter (N15).** At 656 deep and 2800 high it keeps a standing head dry only in rain falling within 18° of vertical. Meanwhile the door takes about 22 s to open fully.
3. **The exterior control has no place, and the ZIP screen can lock people out (N16).**
4. **Ecology is still thin (F6).** Two proxies in a 7.2 m bed, no July–October bloom, no nesting ground. The rain-garden house slope still screens the water (N7).

Fixing N13–N16 lifts this to about 8; adding F6 and N7 brings it to about 8.5.

---

## 2. Walking the edge

### 2.1 A wheelchair user (eye 960–1250, chair ≤ 1250 × 700; S 08 K12)

1. **Inside → button.** The interior button is at 900–1100 (S, 14 §6 / B651 5.2.7.1). Drive cycle: lift ≈ 7 s, then about 2.18 m of slide at ≈ 150 mm/s ≈ 14.5 s, so **≈ 22 s to full opening** (S speeds, 14 §6; arithmetic I). That is fine from inside and long from outside in rain (§2.3).
2. **Over the threshold, going out.**
   - Floor 0 → plate 0 → rail +5 (vertical 5) → track 0 → nosing down 1:8.4 to −12 → 6 mm slot → **5 mm vertical up-edge** onto the slips at −7.
   - The last edge faces outbound feet and front castors after a down-slope. A shuffling gait (older users, walkers) meets an upward lip right where they look out at the garden (I).
   - ADA commentary says a threshold built of several vertical 1/4″ steps "would not typically meet the intent" (S, idighardware). Here there are two 5 mm vertical edges inside 130 mm. → N17.
3. **Coming in.** Slips −7 → drop 5 → climb 17 mm in about 120 mm (bevel plus rail). A manual chair loses its run-up in the dip (I). This is a real but small penalty.
   - **My reading of the B651 dip question (14 Q2):** the height above both floors is 12 mm, which passes. The dip itself is not a "change in level" that a wheel experiences as a step, because a ≥ 75 mm caster bridges the 7 mm gap with under 1 mm of sink (I).
   - **The defect is the vertical up-edge, not the dip.** A 5 × 10 chamfer on the slip arris removes it (N17).
4. **Landing.**
   - 1.72 m deep, 1:60, granite 60, BPN ≥ 55, joints 6 ✓.
   - A 1500 turning circle at x −1000 fits. But **the canopy drip line (x −757) runs through it** (N15).
5. **Turning toward jamb A.**
   - The open rill lies 315 from the reveal. Its near open segment (basin x −1100 → clapper −1731) is exactly where you would cut the corner.
   - A front caster (≈ 75–200 wide) drops into a 170 slot 120 deep (I). → N14.
   - The clapper route is 1.7–3.0 m out; nothing tells a user that this is the route.
6. **Terrace edge, bed, garden.**
   - Edge drop 50 to mulch ✓ (< 75; S, B651 8.2.5 via 08b M15).
   - The garden, runnel lip and falling sheet are still view-only from 2 m away (P3 not adopted).

**Verdict:** the threshold and door are now usable. The water corner and the absent perch are the barriers.

### 2.2 Seated occupant inside (eye +1200 at x +1500) and standing (+1600 at x +1100)

| object | what they see (I, from spec levels) |
|---|---|
| Spout and basin at jamb A | Seen obliquely through the jamb-A end of the sliding panel. The spout throws at 600 high, so the "rain arriving" moment is a short stream at knee height, mostly hidden by the 165 jamb sightline and reveal from a seat at w 700–1300. |
| Open rill | Its floor (−145 to −168) is invisible from any interior position. Only the wet stone edge reads. |
| Pond at crest | Visible from x −5920 (seated) or −5705 (standing) out to −7609, i.e. 1.7–1.9 of its 2.0 m. |
| Slough sedge, x −5800, top +361 | Directly in that line (the line is at −251 there). Within 3–5 years the rhizomatous sedge forms a 1 m screen across the house slope (I). |
| Lip and forebay | Below the house rim, so hidden from inside: the sight line passes about 85 under the lip. |

**Verdict.** From the room you see wet stone and, briefly, a pond behind sedge. The lip, the "arrival", is a terrace experience only. → N7, P2'.

### 2.3 Someone in the rain, with bags

- **Shelter geometry (I).**
  - A standing head at x −400 stays dry only for rain within **18°** of vertical; a seated head, **13°**; knees and lap at 600, under **3°**.
  - A 1–2 mm drop falls at ≈ 4–6 m/s, so a 3 m/s breeze tilts rain about **34°**.
  - In Vancouver's usual wind-driven rain the canopy keeps the glass dry (its job, S 13 §4.6: catch ratio 0.23 → "medium") but **not the person**.
- **Waiting.** ≈ 22 s for full opening (§2.1) while standing in that rain, or ≈ 13 s if the drive is set to a 1 m "pedestrian" opening (I).
- **The drip curtain.** All canopy rain, plus the wash from the storey above, falls in one line at x −757 across the full 5.1 m. Everyone crosses it to enter, and the turning circle straddles it. Splash and, in a cold snap, an ice line (I).
- **Bags.** The motor solves the hands problem, but only if the exterior button is reachable from the landing (N16). No shelf to set bags on (lap-2 P6 not adopted).
- **Night.** Still no lighting. New dark hazards: the open rill, the basin rim, the spout at knee height (N20).
- **Inside.** Ground-finish slab ✓.

### 2.4 A child (3–8)

- **Basin.** A cobble pit with a pipe at 600 high. Children will hang on the spout, lift cobbles out and throw them. The glass is 0.5–1.1 m away (6 mm HS outer lite) (I). → N13.
- **Rill.** 120 deep × 170 wide. A toddler's foot goes in; an ankle-turn rather than a drowning risk (I).
  - Damming the rill is harmless now: the backwater overtops at the dam and the paving falls away from the house (I).
  - Every 2 m stretch of open water is a magnet; that is the point, so make it safe rather than remove it (N14).
- **Forebay and lip.** The 100 mm drop onto cobbles is a delightful splash point in rain. In dry weather the cobbles are loose throwing stones 5.4 m from the glass (N10).
- **Rain garden.** ≤ 200 deep, drains < 48 h (S 08 L11) ✓.
- **Fruit.** Huckleberry at jamb B and currant in the bed ✓. The tree's species is no longer named.

### 2.5 Native bees

- **Forage calendar** (S 08 L1, 08b M19, KPU):
  - currant Mar–May;
  - huckleberry Mar–May;
  - small tree (if *Amelanchier*) Apr;
  - ninebark May–Jun;
  - salal May–Jul;
  - sedges and rush are wind-pollinated.
  - **The ground has nothing in bloom from late July to October.** The roof sedum of v2 is gone.
- **Nesting.** About 70 % of native bees nest in the ground (S 08 L2). Yet every soil surface is wood chips or stone, and the new water corner is paving. **Zero nesting ground.**
- **Mud.** Mason bees (*Osmia lignaria*), the commonest spring bee in Vancouver gardens, need moist clay mud to wall their cells, and will not nest without it (S, OSU EM 9130; WSU). The water corner could supply it at no cost (P4').

### 2.6 Birds

- **Glass.** Dots on #1 of both panels ✓; dot size unstated (F11).
- **The ZIP screen is the best bird device on the façade.**
  - ABC lists exterior screens and motorised solar shades set several inches in front of glass as effective, because they remove reflection and cushion impact (S, ABC).
  - The cassette sits 200–300 in front of the glass (I).
  - Schedule it down when the room is empty during migration (P7').
- **Water.** Bathing at the forebay and pond edge; drinking at the rill. The basin water is buried under cobbles, so it is no use to birds, only to mosquitoes (N13).
- **Cover.** Sedge, rush and ninebark in the garden; currant and salal in the bed. Keep the forebay edge low and open so bathing birds can see cats (lap-2 advice; carried in P2').

### 2.7 Soil life

- **Good.**
  - 450 bed medium, a drained 1 m pit, arborist chips with leaves left;
  - granite curbs (no lime);
  - continuous soil into the rain garden.
- **Bad.**
  - The rain-garden floor is all stone mulch (no organic input).
  - The slopes are bare medium at year 0 (N10).
  - The jamb-A water margin is sealed paving over open-graded base, so there is no soil biology where the water actually is (N14 fixes this).
  - The pit is now a 1 × 1 cube instead of a trench: shared soil fell from ≈ 14 to ≈ 10 m³ per opening, which is at the City's shared minimum (S 08 I4) (N21).

### 2.8 Roots (tree, year 5–30)

- **In section, the enclosure is closed.** Liner-edge barrier at x −1965.5, the path-edge barrier at −3366.5 and the pocket barriers all have tops cast into granite and bottoms at −700. The curb remains under the rill floor (curb −204 → −337; barrier top −317) ✓.
- **In plan, two open ends (I).**
  1. At w −1200 (jamb A) and w 6000 (jamb B) the barriers simply stop. Roots that run along them (they resurface within 1.2 m; S, GILMAN96) can turn the end and reach the jamb ground, the **permanently wet basin sump**, the open-graded `jz-base` and the perforated perimeter drain in `perim-rock-jz` at −475.
  2. The pit link deliberately leads roots into `rg-rock`, where the perforated `rg-subdrain` is 1.5 m away. Root intrusion into subdrains is the normal year-15–30 failure (S 08 I.2(b), OMAFRA). → N19 and the timeline.

### 2.9 Water: roof to garden

| step | v3 geometry | check |
|---|---|---|
| Roof above (2–3 storeys; S 13 B1) | Catchment, gutter, outlet and leaf guard unstated | **Undefined** (N13). |
| Downspout | Ø100 charcoal on the jamb-A cedar at w −450 | Capacity ample: a 3 in leader carries 5000 L per 15 min (S 08 J14). |
| Spout | Horizontal Ø100 at y ≈ 600, x −144 → −760 | Lands mid-basin; a 600 fall onto cobbles gives little splash ✓. At knee height it is a projecting object across the 425 strip between the wall and the basin (N14). |
| Basin | Inner 480 × 480, sump −350, cobbles to PT − 40, outlet Ø80 at invert −145 | **47 L of permanent water** below the outlet (N13). An orifice gives ≈ 3.8 L/s at full head, enough for ≈ 260 m² of roof at 52 mm/h (I), **but 100–150 cobbles rest against an 80 hole** (N13). |
| Basin overflow | "Over the rim onto paving that falls away from the wall" | Onto open-jointed jamb paving whose base "drains into the envelope". That sends roof water to the footing drain in every blockage, against 9.26.18.2's intent (S via 08 J.0) (N13). |
| Rill | 170 × 110–123 open, 1 %, sealed U-trough, clapper at x −1731 → −2979 | Falls correctly ✓. A flat 170 floor spreads drizzle into a film and lets ±2 mm laying tolerance pond (P5'). |
| Runnel | 2 %, 59–81 deep, on a 300 crushed-rock strip | ✓ |
| Lip | Floor end at −207.7, flush with the slope | No cantilever and no drip groove. Low flows cling to the 50 face and wet the medium under the slab end (N18). |
| "Forebay" | Cobble band 100 below the 1:3 slope surface, x −5407 → −6007 | **Not a pool.** It is a sloping slot that traps about 7 L at its lower end, 33 below the pond floor (N18). |
| Ponding | Crest −275, floor −475, 200 deep ✓; riser takes ≈ 10 L/s at 44 mm head (I) | ✓ |
| Emergency | Notch −230 (note); house rim −122 | House-side margin 108 ✓. The notch path is still not drawn (F2). |
| Canopy | 2 % out to a drip at x −757 | A line source on the landing, not routed to the water corner (N15). |

---

## 3. Findings

Severity counts: **0 blockers · 5 major · 13 minor.**
- Majors: N13, N14, N15, N16, and F6 carried.
- Minors: N17–N21, plus carried N7, N10, F2, F11, F12, F15, F19, F21.

### Major

**N13 (major): The basin is a sump, a blockage point and a stone pile beside the glass.**
- Parts: `basin-shell`, `basin-ends`, `basin-cobbles`, `basin-void`, `downspout`, `spout`, `jz-base`; new `basin-screen`, `basin-weir`, `roof-outlet` (note).
- **Problem:**
  1. **Permanent water.** The sump (−350) is 205 below the outlet (−145): ≈ 47 L of shaded, leaf-fed water, the classic catch-basin breeding site. Wisconsin and Indiana studies found larvae in 37–66 % of catch basins, almost all *Culex*, the West Nile vector (S, catch-basin studies). Larvae need 3–7 days (S 08 L11). It also freezes in the closed granite box (I).
  2. **Blockage.** 100–150 cobbles bear directly on an Ø80 outlet. One cobble or one leaf mat closes it (I).
  3. **Overflow to the footing.** The overflow path is over the rim onto open-jointed `jz-pavers` → `jz-base` ("drains into the envelope") → `perim-rock-jz` → perimeter drain. That is roof water into the foundation drainage, which v3's "separation by geometry" otherwise prevents. VBBL wants downspout water carried away without accumulating at the building (S, 9.26.18.2 / 9.14.6.1 via 08 J.0).
  4. **Throwable stones.** Loose cobbles 0.5–1.1 m from a 2.6 m glass wall (I).
  5. **Unknown source.** Roof catchment, gutter and leaf guard are undefined, so nothing can be checked (I).
- **Fix:**
  1. **Drain the sump.**
     - Raise the basin floor to −175, falling 2 % to the outlet, so at most ≈ 30 mm of water stands. It evaporates or soaks into a 20 mm weep.
     - Better: make the bowl one carved or lined piece with a Ø20 weep at −170 through the outer wall into the rill head.
     - Silt goes in a lift-out 316 perforated basket 400 × 400 × 100 under the spout (x −560 → −960), not in a sump.
  2. **Screen the outlet.**
     - Change the outlet to a 170 × 60 slot (invert −145, the rill's full width).
     - Behind it fit `basin-screen`: a 316 bar screen, 10 mm bars at 25 o.c., 100 high, set 80 inside the wall.
     - Keep a 100-wide cobble-free zone between screen and wall.
  3. **Overflow into the rill, never onto the paving.** Add `basin-weir`: a 170-wide notch in the basin's outer wall above the rill, crest −60, i.e. 37 below the rim at PT(−1100) = −22.5. Overflow then always enters the open rill. Raise the other three rims 10 above the paving.
  4. **Stones that stay.** Top layer 200–300 granite cobbles (≥ 15 kg each, too heavy to throw), lower layer 100–150 on the basket. Or bed the top layer on a 316 grid.
  5. **Define the roof outlet in a note:** catchment area, 5 in gutter at ≥ 1:100, front lip 25 below the back, leaf screen at the outlet (S 08 J15). Even a 200 m² roof is inside the slot capacity (I).
- **Basis:** S 08 L11; catch-basin *Culex* studies; S 08 J.0 (9.26.18.2), J14–J15. Levels I.

**N14 (major): The rill is an open slot in a paved field next to the accessible landing; make the jamb ground a planted water margin.**
- Parts: `jz-pavers`, `jz-bedding`, `jz-base`, `rill-walls`, `clapper`, `spout`; new `jz-margin-soil`, `jz-margin-edge`, `root-barrier-jz`, `jz-strip`.
- **Problem:**
  - The rill (170 × 110–123) is open for 631 mm between the basin and the clapper (x −1100 → −1731) and for 462 mm beyond it.
  - It runs 315 from the reveal, in the same granite as the landing, with nothing to tell feet, castors or canes where the edge is (I).
  - The clapper route (1.7–3.0 m out) is undeclared; the natural line from the door to jamb A cuts across the open segment (§2.1).
  - The spout is a 666 mm projection at 550–710 high across a 425 strip of paving between the wall and the basin. Below 680 it is cane-detectable, but it is a shin bar and a climbing bar (I).
  - The spec asks for a "moss patina" on rill walls that are also the walking edge (F15).
  - P1 asked for a 300 **planted** margin. In v3 the rill is a channel cut into a terrace.
- **Fix: the water margin.**
  1. **Planting.** Replace `jz-pavers` / `jz-bedding` / `jz-base` at w −1200 → −100, x −500 → −1700, except the basin and rill, with `jz-margin-soil`: 300 loam over 150 of the existing base, mulched with leaf litter.
  2. **Plants (low, shallow-rooted, shade and wet tolerant):**
     - *Blechnum spicant* (deer fern);
     - *Tiarella trifoliata*;
     - *Oxalis oregana*;
     - *Carex* sp. at the rill lip;
     - moss on the rill walls only where nobody walks.
     - Height ≤ 400, so the jamb reads as a green base to the charcoal frame.
  3. **Edge.** `jz-margin-edge`: a granite curbstone 100 wide on edge at w −200 → −100 from x −500 to −1700, top flush with the landing. Cast in `root-barrier-jz` to −700 (the F7 detail).
     - The step from granite to planting is a cane-detectable change at the landing edge (I).
     - The barrier keeps margin roots out of the lined landing's w = 0 upturn.
  4. **Wall strip.** Keep x −75 → −500 as `jz-strip`: a 425 gravel splash and maintenance strip, not a route. The spout then projects over gravel, not a walkway.
  5. **Clapper.** Keep it as the declared route. Make the paving along it a contrasting flamed finish 1248 wide so the route reads. Use a darker split face on the rill arrises.
  6. If the margin is rejected, the minimum is a second clapper from the basin outlet to x −1731, i.e. the rill covered for the whole landing depth, plus a contrasting 50 arris.
- **Gains:** a cane-detectable edge; no castor trap at the landing; a riparian strip with soil life where the water is; a mud source for mason bees at the basin weep (P4'); a green base under the downspout (R5's picture frame).
- **Basis:** S 08 J16 / B651 8.2.4 (downspout water not across a route); S 08b M17 (planted pocket edges); S 08 I2 (barrier tops cast or above grade). Dimensions I.

**N15 (major): The canopy keeps the glass dry but not the person, and its drip line crosses the doorway.**
- Parts: `canopy-cap`, `canopy-deck`, `canopy-fascia`, `canopy-frame`, `drive` (note); new `canopy-gutter`, `canopy-scupper`.
- **Problem:**
  - A 656 projection at 2800 keeps a standing head at x −400 dry only to 18° (a seated head 13°). A 3 m/s breeze tilts rain to ≈ 34° (I).
  - The full opening cycle is ≈ 22 s (S speeds, 14 §6).
  - Canopy and upper-wall water falls as a 5.1 m drip curtain at x −757, through the turning circle and across every entry path. It is the rain you meet even in still air (I).
  - Research 13 §4.6 sized the canopy for the glass (ratio 0.23, S), not for the person.
- **Fix (coordinate R1/R5):**
  1. **Gutter the canopy.**
     - Re-fall the cap at 1 % toward jamb A into a 40 × 40 internal `canopy-gutter` behind the fascia.
     - `canopy-scupper` at w −150: a 60 × 40 open lip throwing into the basin corner (x ≈ −700, w ≈ −250), into the cobbles.
     - The doorway loses its drip curtain. The water corner gains a second, visible stream from the canopy end.
     - Catchment about 3.4 m² plus wall wash: trivial flow (I).
  2. **Deepen the sheltered zone at the operable half.** Extend the canopy to 1200 over w −150 → 2550: ratio 0.43, standing head dry to 36°, seated 27° (I). Or put a 1200 canopy over the whole opening if R5 accepts the look; three knife plates already exist.
  3. **Drive setting.** Specify a "pedestrian" partial opening of ≈ 1000 clear for daily use: ≈ 7 + 6.5 ≈ 13.5 s (I from 14 §6 speeds). Full opening on a long press or by app.
- **Basis:** S 13 §4.6, S 11 §3.4 (CMHC overhang ratio), S 14 §6. Rain angle and shelter geometry I.

**N16 (major): The exterior control has no location, and the ZIP screen can lock a user out.**
- Parts: `drive` (note), `cassette`, `liner-jamb-a`; new `ext-control` (virtual or proxy).
- **Problem:**
  - "Push buttons 900–1100 on both faces" has no position. The obvious place, the jamb-A wall face, is now occupied by the downspout, spout and basin. A wheelchair user's clear space there would be on the basin (I).
  - The ZIP screen's guides run inside the reveal liners, and its bottom bar lands on the tray. When it is down, a person outside cannot reach or pass the door, and nothing interlocks the screen with the drive (I).
- **Fix:**
  1. `ext-control` on the **reveal liner face at jamb A**, x −110 → −130 (outside the ZIP guide), centre y 1000. Keep a 900 × 1500 clear space parallel to the glass on the landing, w 0 → 1500 (I; B651 5.2.7.1 reach, S via 14 §6).
  2. **Interlock:** the exterior button first raises the screen, then opens the door. Screen-down plus door-open must not leave a closed screen in the opening without an interior override (I).
  3. **Keyless:** a proximity fob or phone release on the same controller, so bags and wet gloves do not matter. The drive's "smart" control supports app operation (S, 14 §6).
  4. Show the button and the clear-space rectangle in the appearance model.
- **Basis:** S 14 §6 (drive, controls, cable via the jamb), S B651 5.2.7.1 via 14. Placement I.

**F6 (major, carried): The bed and garden have no late bloom, no nesting ground and no mud.**
- Parts: `bed-plant-1..2`, `rg-plant-1..3`; new `bed-plant-3..5`, `bed-bare-patch`, `rg-plant-4..5`, `mud-patch`.
- **Problem:**
  - Bloom stops in July (§2.5).
  - There is no unmulched sunny soil for ground nesters (≈ 70 %; S 08 L2) and no clay mud for mason bees (S, OSU/WSU).
  - The appearance model shows 5 plants for 7.2 m × 4.5 m of planting. That reads as bare and understates the finished look (I).
- **Fix (proxies at year-5 size, spacing ≤ 0.6 m; S 08 I6):**

  | part | species / content | position |
  |---|---|---|
  | `bed-plant-3` | *Symphyotrichum subspicatum*, Douglas aster, Jul–Sep (S, KPU) | x −3700, w 1600 and 3300; h 600 |
  | `bed-plant-4` | *Anaphalis margaritacea*, pearly everlasting, Jul–Sep (I) | x −4700, w 2600 and 4100 (sun, outside the crown) |
  | `bed-plant-5` | *Achillea millefolium*, Apr–Oct (S 08 L1) | x −3600, w 2300 and 4600 |
  | `bed-bare-patch` | 1.0 m² unmulched, compacted sandy loam, never dug | x −3500 → −4000, w 2000 → 2500 (sunny, clear of salal) |
  | `mud-patch` | 0.2 m² clay loam kept moist by the basin weep (N13) | at the rill head in the N14 margin, x −1100 → −1300, w −750 → −600 |
  | `rg-plant-4` | *Symphyotrichum subspicatum* (moist meadows; S, Phoenix) | far slope x −7500, w 300 and 2000 |
  | `rg-plant-5` | *Iris tenax* / *Achillea*, ≤ 400 (S 08 J7 rim list) | house slope x −5300 → −5500, w 0 → 1800 |

  - Keep salal on the shaded side only (w ≤ 600): it suckers into joints and will smother the bare patch (I).
  - Leave stems standing until May. No pesticides (S 08 L.2).
- **Basis:** S 08 L1–L3, I6, J7; KPU; OSU EM 9130 / WSU (mud). Positions I.

### Minor

**N17 (minor): The threshold has two vertical edges; chamfer the outbound one.**
- Parts: `tray-slips`, `landing-tray`.
- **Problem:** going out, the slip arris at x 83.5 is a 5 mm vertical up-edge after a 1:8.4 descent. Together with the 5 mm rail, that makes two vertical edges within 130 mm. ADA commentary: multiple vertical steps "would not typically meet the intent" (S, idighardware).
- **Fix:**
  - Arris the slips' house edge at 1:2, from −7 at x 73.5 to −12 at x 83.5. Fold the tray upturn to −13.
  - The walking line becomes −7 → bevel → −12 → slot → −12 → 1:8.4 → 0 → rail +5: one vertical edge.
  - Ask ENERsign whether the rail can be +3.
  - Record the access consultant's reading of 14 Q2: 12 mm above both floors; the dip is not a vertical change (I).

**N18 (minor): The "forebay" is a sloping slot, and the lip has no drip.**
- Parts: `runnel-floor`, `forebay-dip`, `rg-apron`, `rg-medium`; new `rg-lip`, `rg-check`.
- **Problem:**
  - The cobble band follows the 1:3 slope, 100 down. It does not slow water, so sediment travels on to the pond floor. Its lower end sits 33 below the pond floor (I).
  - The runnel floor ends square at the slope. Low flows wrap under the 50 face and erode the medium beneath (I).
- **Fix:**
  1. `rg-lip`: a granite slab 60 thick, cantilevered 120 past x −5407, top −207.7, with a 10 × 10 drip groove 25 back. Runnel walls run on to its back.
  2. **Level forebay.** Cobble floor at −360 from x −5407 → −5850, w −660 → −240 (≈ 2:1; S 08 J11), on 407 g/m² geotextile.
  3. `rg-check`: a row of half-buried 200 boulders at x −5850, top −310, which gives a 50 deep pool (S 08 J11 ≥ 50).
  4. Below the check, a rock-protected chute down the slope to the floor (S 08 J11, "protect concentrated flow paths with rock").
  5. The free fall from the lip becomes ≈ 150 onto cobbles.

**N19 (minor): The root barriers stop at the model's w-ends, and the pit link feeds roots to the subdrain.**
- Parts: `root-barrier-liner`, `root-barrier-edge`, `rg-subdrain`, `pit-link`.
- **Fix:**
  - Return both barriers to the foundation at the ends of the paved ground: a note plus `root-barrier-return-a/b` at w −1200 and w 6000, x −1965 → −400, top cast into an end curb, to −700.
  - Specify the rg-subdrain with narrow slots (≤ 1.5 mm) and a cleanout at each end. Add "camera at 15 and 30 years" to the timeline (S 08 I.2(b), OMAFRA).

**N20 (minor, was lap-1 P6): No lighting, now with open water at the door.**
- **Fix:** two shielded, downward 2700 K step lights in the jamb-A plinth (y 200) washing the basin rim and clapper, plus one in the jamb-B pocket curb.
  - Motion-sensed, ≤ 3 lux at grade.
  - Nothing aimed at the garden or the sky (S 08 L.2(c): protect moths and bats). Levels I.

**N21 (minor): Tree soil dropped to the shared minimum.**
- Part: `tree-pit`.
- **Problem:** ≈ 10.2 m³ per opening, including rain-garden medium that is often saturated (lap 2: ≈ 14). The guide is ≥ 10 m³ shared (S 08 I4).
- **Fix:** run the pit as a 1 m-deep trench under the bed (w −100 → 3300) instead of a 1 × 1 cube, keeping its 2 % floor and the link at w 400–1400. That is about +1.6 m³ per opening (I). It stays 0.9 m from the runnel strip.

**N7 (minor, carried): The tall sedge is still in the view.**
- **Fix:**
  - Move `rg-plant-1` (*Carex obnupta*) to the far slope, x −7350.
  - Put `rg-plant-5` (≤ 400) on the house slope.
  - Add `rg-riser-grate`: a domed grate Ø250, −275 → −175 (S 08 J9).

**N10 (minor, carried): Rain-garden surfaces and loose stones.**
- **Fix:**
  - Coir blanket plus 75 shredded wood on the 1:3 slopes (S 08 J6).
  - Stone mulch only within 600 of the riser and in the forebay.
  - Forebay cobbles half-bedded, with ≥ 200 boulders at the edges.
  - The basin is covered by N13.4.

**F2 (minor, carried): Draw the spill path.** `rg-spillway`: 1 m notch, sill −230, cobble on geotextile, swale ≥ 2 % away from the house (S 08 J.0). Lower `subgrade-far`'s tail to `FAR_RIM − 4`.

**F11 (minor, carried): Bird markers.** State dots ≥ 6 mm at ≤ 50 × 50 on #1, both panels (S, FLAP reading of A460). Render the frit as a veil. Confirm A460 availability for the EU IGU line (14 Q1).

**F12 (minor, carried): Terrace base outlet,** only if the till infiltrates < 13–15 mm/h (S 08 H3).

**F15 (minor, carried): Granite finish everywhere.**
- `pavers-t`, `jz-pavers`, `clapper`, rill arrises: flamed or bush-hammered, BPN ≥ 55, sawn beds calibrated ±2 mm. Reclaimed stone varies in thickness, and lips over 6 mm fail B651 (S Table 1 via 08b).
- Drop "moss patina" from walking edges.

**F19 (minor, carried): Name the tree.** If *Amelanchier*: single-stem stock and annual sucker removal (S, GOERT; 08b M19).

**F21 (minor, carried): Proxies.**
- Wheelchair as a 700 × 1250 box (not a Ø700 cylinder).
- Add `person-seated-inside` (x +1500, w 1300, eye 1200).
- Add a 1500 turning-circle disc at x −1000, w 750.

---

## 4. Proposals

### P1' — The water margin (N14 + N13 + the mud patch)
- **The corner.** A green, wet corner at the jamb: a fern and sedge margin around a granite basin, the rill running out through it, and a clay-mud patch fed by the basin weep.
- **The doorway.** The landing and the clapper are the only stone where people walk.
- **From the room.** A green base to the charcoal frame, with the downspout landing in planting rather than in paving.

### P2' — Two streams into one basin (N15.1)
- The canopy scupper at w −150 drops a second thin stream into the basin corner.
- From inside through the jamb-A glass, rain is seen arriving twice: from the roof at 600, and from the canopy at 2800, a 2.8 m thread.
- The doorway itself becomes dry underfoot.

### P3' — A perch at the lip (re-offered; P3 adapted to the water corner)
- **Path.** A 1200 path of granite on a screw-pile frame at w −1800 → −600 (beside the runnel, outside the 1.2 m tree zone), level at −60 from the terrace edge.
- **Perch.** 1500 × 1500 at x −4900 → −6400. It cantilevers 600 over the house slope beside the lip, with a ≥ 100 kerb (S, B651 8.2.5 via 08b M15).
- **Seat.** A backed bench 450 high with one armrest and an 850 × 1350 transfer space (S 08 K1–K8).
- **Why.** The falling sheet becomes something you sit beside, in the tree's afternoon shade.

### P4' — A bee and bird ground layer (F6)
- Bare patch, mud patch, late asters and pearly everlasting, stems left standing.
- No bee hotel: hotels favour wasps and introduced bees (S 08 L4).

### P5' — A low-flow cunette in the rill and runnel
- Form a 40 × 15 V-groove on the centreline of the 170 floor.
- Drizzle then runs as a bright thread instead of a film. The floor dries between showers (less algae, ice and larvae). Low flows reach the lip as a stream that throws clear (I).

### P6' — The shelf at jamb B, combined with the pocket
- Make the house-side pocket curb (x −2200 → −2350, w 4950 → 5950) a 450-high granite seat-shelf, 400 deep.
- A place to put bags down and sit to change shoes, facing the huckleberry.
- It is 2.2 m out, so it needs the N15 canopy extension or it stays a dry-weather seat (I).

### P7' — Use the ZIP screen for birds and bats
- Schedule the screen down when the room is empty in the migration months (Apr–May, Sep–Oct). It sits 200–300 in front of the glass, which is the configuration ABC recommends (S, ABC).
- Keep it up at dusk in summer if the wall is open, so moths drawn by room light stay outside (S 08 L.2(c); I).

---

## 5. Decades timeline: what the tool should show

Assumes the fixes above.
- **SOURCED rates:** sediment ≈ 3 mm/yr; root resurfacing ≤ 1.2 m; drain-down ≤ 48 h; larvae 3–7 days; ZIP fabric 10–15 yr; membrane and IGU at 25–30 yr. All from 08, 08b, 13, 14.
- **Sizes and states:** INFERRED unless marked.

| element | 0 | 5 | 15 | 30 |
|---|---|---|---|---|
| **Threshold, tray, slot, drive** | 12 mm, one vertical edge (N17). Slips flush −7. Drive commissioned with pedestrian mode. | Grit in the 6 mm slot; lift-out tray cleaned spring and fall. Slip arrises dulled by castors. | Rollers and drive serviced; drive controller replaced (I). Check lip ≤ 6 between slips (B651). | Track renewal via the 316 floor plate; door replaced without cutting the pan (S 14). Same 12 mm. |
| **Canopy and drip** | Gutter to the jamb-A scupper; dry doorway. Honey soffit. | Grey streaks on the fascia; scupper and leaf screen cleaned yearly. | Cap reseamed; soffit re-oiled. | Cap and membrane renewed with the upper wall (S 13). |
| **ZIP screen** | Down on hot west afternoons and during migration; insect screen on summer evenings. | Fabric dulls; guide brushes replaced. | Fabric and motor replaced (S 13 §4.4, 10–15 yr). | Second replacement; cassette kept. |
| **Spout and basin** | Granite bowl, ≤ 30 mm standing water, 316 basket, heavy top cobbles. **Storm view:** roof water thunders at knee height, weir dry. | Moss on the shaded rim; basket emptied twice a year; raccoons rearrange cobbles. | Weep re-cleared; spout re-hung. Weir overflow seen in leaf-blocked storms, into the rill only. | Bowl reused; downspout replaced with the roof. |
| **Water margin (P1')** | Fern and sedge plugs, mud patch wet. | Full cover. Mason bees mud-collecting in April–May; a frog possible at the basin. | Self-sustaining; ferns divided. | Unchanged in character; the planting renews itself; the edge curb is relaid with the landing. |
| **Rill and clapper** | Clean granite; cunette carries drizzle. **Storm view:** full-width sheet at 1 %. | Algae film on the floor in shade; scrub yearly. Leaves at the clapper inlet. | Trough joints regasketed; clapper rebedded. | Trough relaid on the same levels; granite reused. |
| **Runnel, lip, forebay** | Lip throws clear; level forebay; check stones. **Storm view:** a 150 fall, pool churning. | Forebay sediment ≈ 15 mm, shovelled out yearly. Birds bathe in the pool. | Runnel joints repointed; lip unchanged. | Runnel relaid; forebay has kept most fines out of the medium. |
| **Lined landing** | Granite planks, BPN ≥ 55. | Joint aggregate topped up near the door; grime band under the drip line (gone if N15.1 is built). | Infiltration falls toward ≈ 28 mm/h (S 08b); camera on the underdrain. | Lifted and relaid; liner, curb and barrier kept. |
| **Bed** (understorey, asters, bee patch) | Plugs, chips, bare patch open. | Full cover; bloom Mar–Oct; ground nesters in the patch (S 08 L2). | Organic layer built; salal confined to the shade side; asters divided. | Layered and self-mulching; shade species under the crown dominate. |
| **Tree and pit** | ≈ 2 m single stem; pit drained by the link. | ≈ 3 m; suckers removed (F19); spring bloom = window-strike season. | ≈ 5 m; crown lifted 2.1 m over the terrace; shades the west glass in late afternoon. | ≈ 6 m mature. Roots in the RG rock; subdrain cameraed (N19). |
| **Root barriers** | Cast in; invisible. | No change. | Roots under −700 resurface ≤ 1.2 m beyond (S GILMAN96), outside the liner and away from the jamb returns. | HDPE intact; root-prune at the terrace relay. |
| **Rain garden** | Plugs < 30 % cover, coir slopes. Low house slope; tall far slope. **Storm view:** pond 200, lip 67 clear. | ≥ 80 % cover; asters on the far slope in August; riser grate cleaned each fall (S 08 J9). | Sediment ≈ 45 mm; drain-down 12–24 h; sedges thinned. | Sediment ≈ 90 mm; drain-down toward 48 h; strip the top 50–100 and replant. Overflows more often in the 2050s climate. |
| **Shrub pocket (jamb B)** | Huckleberry 0.5 m, acid mix, hand-watered 2 yr (S 08b M20). | ≈ 1.2 m; flowers Mar–May; berries Aug–Oct for birds. | Held at 1.5 m; acid top-dress. | Renewal-pruned or replaced. |
| **Glass (birds)** | #1 dots ≥ 6 mm on both panels; ZIP schedule. | June fruit and migration checks under the glass. | Frit unchanged. | IGU replaced (S 14); markers re-specified. |
| **People** | 12 mm sill, motor, fob, pedestrian mode, lit basin rim, dry doorway. | Perch (P3') is the summer place; children dam the rill harmlessly. | Lips re-levelled; drive replaced. | Ageing occupants rely on the drive, flush sill, lighting and armrest. |
| **Animals** | Insect screens at cavity bases; no standing water anywhere > 3 days. | Bees, hummingbirds (currant), birds at the forebay; slugs under curbs. | Check rodent runs along the trough backs. | **If unmaintained:** a blocked basin overflowing to the rill, a silted forebay, sedge choking the view, salal in every joint, a sucker thicket. The tool should show this alternative. |

---

## 6. Verdict

**Score: 7 / 10** (lap 1: 5; lap 2: 6).

**What holds it back:**
- **The water corner (N13, N14).** It is detailed as a catch basin in a paved field rather than a living margin. It has a mosquito sump, a cobble-blocked Ø80 outlet whose overflow reaches the footing drain, throwing stones by the glass, and an unguarded open rill beside the accessible landing.
- **The person at the door (N15, N16).** A canopy that does not shelter, a drip curtain across the entry, a 22 s opening, and an exterior button with no place and no interlock with the ZIP screen.
- **The living layer (F6, N7).** Still too thin to deliver the "living edge": no late bloom, no nesting ground, sedge in front of the pond.

**Top 3 changes:**
1. **Rebuild the water corner as a planted margin.** Basin floor to −175 with a weep and basket; a screened 170 slot outlet; an overflow weir into the rill; heavy top cobbles. Replace the jamb paving around it with a fern and sedge margin behind a cast-in-barrier granite edge, with a mud patch (N13, N14, P1').
2. **Make the door work in the rain.** Gutter the canopy into the basin (a second visible stream; no drip curtain), extend it to 1200 over the operable half, set a pedestrian opening mode, and put the exterior button on the jamb-A liner with a fob and a ZIP interlock (N15, N16, P2').
3. **Plant for July–October and for ground nesters.** Asters, pearly everlasting and yarrow; a 1 m² bare patch; the sedge to the far slope and low iris in front; a level forebay with a check pool under a dripped lip (F6, N7, N18, P4').

With these, the section reaches about 8.5.

---

## Sources

**Research files:**
- 08-landscape-occupation.md: H3; I1, I2, I4, I6, I.2(b)–(c); J.0 (VBBL 9.26.18.2, 9.14.6.1), J6–J9, J11, J14–J16; K1–K12; L1–L4, L11, L.2–L.3.
- 08b-threshold-paving.md: M8, M12, M15–M20, Table 1 (B651 via).
- 11-sliding-wall.md §3.4 (CMHC overhang ratio).
- 13-floor-band-head.md: §0.4 B1, §4.4 (ZIP), §4.6 (canopy), §5.1.
- 14-ph-lift-slide.md: §3.2, §3.4, §3.5, §6, §10 Q1–Q2.
- Lap-2 sources carried: GILMAN96, SMILEY09, OMAFRA, GOERT, KPU / Phoenix (*Symphyotrichum subspicatum*), FLAP (A460 dots), Klem 2004.

**Web (this session):**
- Catch-basin mosquito breeding (*Culex*; 37–66 % of basins; Wisconsin study):
  - Minnesota Stormwater Manual, "Mosquito control and stormwater management": https://stormwater.pca.state.mn.us/Mosquito_control_and_stormwater_management
  - Indiana Academy of Science paper: https://journals.indianapolis.iu.edu/index.php/ias/article/download/8376/8474/14646
  - PMC article: https://pmc.ncbi.nlm.nih.gov/articles/PMC1142101
- idighardware, "Decoded: Thresholds" (multiple 1/4″ vertical steps not within intent): https://idighardware.com/2024/08/decoded-thresholds/
- Oregon State University Extension EM 9130, "Nurturing Mason Bees in Your Backyard in Western Oregon" (clay mud required): https://extension.oregonstate.edu/catalog/pub/em-9130-nurturing-mason-bees-your-backyard-western-oregon
- WSU Extension, Orchard Mason Bee: https://wpcdn.web.wsu.edu/extension/uploads/sites/68/2022/08/Orchard-Mason-Bee-pdf.pdf
- American Bird Conservancy:
  - "Insect Screen, external": https://abcbirds.org/products/any-insect-screen
  - "Save Birds" sheet (motorised solar shades several inches in front of glass): https://abcbirds.org/wp-content/uploads/2023/10/Save-birds-11-2023.pdf
