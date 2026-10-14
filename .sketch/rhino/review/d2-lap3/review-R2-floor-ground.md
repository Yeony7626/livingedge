# Detail 02, lap 3: review R2 (floor, foundation and ground drainage)

**Reviewer:** R2. **Scope:**
- the beam and stem; the slab and slab edge, soil gas and radon; the frost and level chain;
- every drain, outlet, invert, fall, cover and overflow; the liner;
- the water corner, rill, runnel and rain garden;
- the jamb-wall foundation (stem to +300) and drainage separation.

**Read:**
- my lap-2 review; `changes-v3.md`; `detail02-v3.mjs`, which is authoritative; `report.md` (parts, contacts, notes); `metrics.md`;
- the T, F, M, C, Z, I, J and S captures and the d2-compare v1/v2/v3 sets;
- research 14 §3 (§3.3 table, §3.5 overflow table), 12 (V2 9.13.4, 9.25.3.6, 10.2.2.6 rows), 08, 08b, 07, 09 §9.1–9.2.

**Levels:** every level below was recomputed by running a copy of the spec and its own functions (PT, PBL, PBT, RF, RNF, BT, GS, X_LIP, UD_Y, CP_Y) in a scratch script. Nothing was read off the images.

**Datums:** x = 0 at the frame's exterior face, **exterior negative**. y = 0 at FFL. w runs along the wall, and w < 0 is jamb A. Millimetres.

**Checked this session (web):**
- VBBL/BCBC Table 9.4.4.1, maximum allowable bearing (bcpublications, VBBL 2007/2014/2019 and BCBC 2018; same figures in each): loose sand 50, soft clay 40, firm clay 75, dense silt 100, dense sand or gravel 150, stiff clay 150, till 200 kPa. The 2025 edition was not seen. **S2**.
- City of Vancouver council and Park Board reports (2003, 2005) and Saanich: catch basins are the main mosquito-larva habitat found in city surveillance. **S2**.

---

## Lap-2 findings status

Key: **fixed** · **partly** · **not fixed** · **worse**. "→ Nn" points to a new finding below.

| # | lap-2 finding (severity) | v3 claim | status | check against the v3 spec |
|---|---|---|---|---|
| N1 | Runnel outfall buried, settling (major) | done | **fixed** | The runnel floor continues the rill at 2 %: −168.4 at x −3441.5, −202.6 at the rim, and a **lip at (−5407.2, −207.7)**. That is 67.3 above the crest (−275) and 22.3 above the spill (−230), so J11 ✓. The runnel sits on a 300 crushed strip to −647, and the cascade is gone. **Residuals:** the lip's last 257 mm stands on bioretention medium, past the end of the strip; the runnel walls are level with the mulch. → N9 |
| N2 | Rill pierces the liner; silt box impossible (major) | done | **fixed** | No surface-water penetration of the liner: the basin is at jamb A, the rill starts outside the liner, and the channel has its own pipe. **But** the water corner now sits in the only unlined ground, which drains into the foundation envelope, and the basin is a wet, jointed sump. → N3 |
| N3 | Overflow hierarchy (major) | done (partly drawn) | **partly; functionally worse** | Barrier top −5 ✓. **The −95 weir referred to a route into the rill, and v3 deleted that route.** The noted invert −95 sits under a −92 house-wall top. The −20 notch exists only in the appearance model and has no outfall: it is a pocket under the −7 landing. A blocked outlet now wets the sill block (−54.5) and leaks into the foundation envelope (−92) long before any surface overflow. → N1 |
| N4 | Outlets undefined; underdrain level (major) | done | **partly** | Underdrain at 0.5 %, its own outlet and backwater valve ✓. Riser base −1305, outlet ≤ −1260 ✓. **But** the liner trench is still level along w (the fall exists only in the pipe), the storm sump is not located, and the outlet table is still a note. → N6, N7 |
| N5 | Footing margin, cover, cold joint (minor) | done | **fixed** | R(−20, −530, 240.4, −193), one pour. Drain crown −420; cover 151 top, 160 soil side. Frost margin **73** at the channel (grade −7) and 74.6 at the jamb (−5.4). **New load case:** v3 is multi-storey. → N4 |
| N6 | Sequence note, lap 85 (minor) | done | **fixed** | Two stages: the dam angle is set and screwed to the course at −105 before the pour; then poly, butyl 85 (−100 → −15), cork, pour; the pan is measured later. Buildable. |
| N7 | Edge RSI reading, Table 10.2.2.6 (minor) | — | **not fixed; worse** | Still cork 25 (RSI 0.63) against 2.45 "around edge". The slab now has **floor heating within 1 m**, and 12 (V1 10.2.2.6.(1)(d)–(g), S) applies the table to heated floors as well. Carried. |
| N8 | Anchors through the pan (minor) | done | **fixed** | Screws stop in the bearer; stools are bonded; the ledge clips fix to the bearer face. |
| N9 | Tree pit sump (minor) | done | **fixed** | Pit 1 × 1 m (w 400–1400). The floor falls −1100 → −1120 to a clear-stone link (−1140 → −1080) into the rock (top −1100). Normal rock level −1260 is 140 below. Residual reverse-flow case → N11. |
| N10 | Liner terminations and w-ends (minor) | note | **not fixed; now major** | The house upturn still stops at **−67**, unbarred and unbonded against the channel's outer face. It now governs where the overflow goes. The w-end upturns and the "wrap" of the channel end cap are not modelled. → N2 |
| N11 | Groundwater separation (minor) | — | **not fixed** | The rock base is now **−1400** (lowered 25), so seasonal high water must be below **−1900 / −2400** (J1). No test-pit note. Carried. |
| 12 | THERM ψ (minor) | — | **not fixed** | Still 3.48 only. Needed now for N7, the jamb stem (N5) and the heated slab edge. |
| 14 | Terrace base outlet (minor) | — | **not fixed** | The base is closed by curbs to −338 and −359 and by barriers to −700. Its note now says "infiltrating beyond 1.9 m", which is inside the 5 m setback. Carried. |
| 15 | Separator, subgrade prep (minor) | — | **not fixed** | No separator under the sub-slab stone; no subgrade note. |
| 16 | Slab and soil-gas notes (minor) | — | **partly** | Rough-in note ✓; bonded 85 ✓. Missing: poly laps ≥ 300 and perimeter sealant (9.25.3.6, S), finishing after the bleed water (A-9.25.3.6, S), w/cm ≤ 0.50, moist cure, post-occupancy radon test. |
| P1 | Rectangular beam | — | adopted ✓ | — |
| P2 | Basin and rill beyond the opening | — | adopted ✓ | Defects in N3 and N8. |
| P3 | Founded, sealed runnel | — | adopted ✓ | Residual at the lip (N9). |
| P4 | Foamed-glass-gravel base | — | not evaluated | Re-offered (P5 below). |
| P5 | Tree pit drained to the rock | — | adopted ✓ | As a stone link, not a pipe. |

**Challenges to `changes-v3.md`:**
- **R1 N3 / R2 N3, "done (partly drawn)".** Three problems:
  - The "silt-box weir −95" is inherited from lap 2, when the weir spilled into the rill (14 §3.5, "weir to the rill"). In v3 the channel has only a bottom outlet, so that route no longer exists. 14 §3.5's claim that "the pan front stays dry in a blinded-basket event" is no longer true.
  - 14 §3.5 lists the sill-block underside (−54.5) as "wetted only above the notch level". −54.5 is **below** −20, so the block is wetted **before** the notch flows.
  - The notch is in the appearance model only, and it has no outfall.
- **R2 N2, "the liner is never pierced".** True. But the water hardware moved into unlined ground that drains into the foundation envelope (N3).
- **R2 N4, "done".** The trench is level along w, so the 0.5 % exists only in the pipe. The sump is unlocated. "Outlet table still a note."
- **R2 N5, "done".** The beam was sized in lap 2 for a one-storey sill (I estimated ≈ 13 kPa). User decision 2 put a floor, a wall and a roof share on the jamb walls and the glulam ends (N4). Neither the changes log nor the beam note mentions bearing.
- **`soilgas` name: "turned up the stem (jamb)".** The geometry ends 1 mm short of the stem at x 241.4, with no turn-up and no seal (N5).

---

## 1. Score: **7.5 / 10** (lap 2: 7; lap 1: 5)

**What is now right:**
- **The foundation is right.** One-pour rectangular beam to −530, drain at (−185, −475) with acceptable-solution cover, 73–75 frost margin, haunch on drained stone.
- **The roof-water path daylights, by geometry.** Basin at −145 → rill 1 % → runnel 2 % → lip −207.7, 67 above the crest → forebay → garden. The lowered garden keeps every J8, J9 and J11 rule. Riser base −1305 under the subdrain invert −1260.
- **No surface water pierces the liner.** The tree pit drains to the ≥ 5 m reservoir. The underdrain has its own valved outlet.
- **Two-stage dam angle and pan.** The soil-gas line is buildable and closed across the opening (pen test).

**What holds it back (five majors, no blocker):**
1. **The door-side overflow hierarchy was broken by the v3 outlet change (N1).** The real order on a blocked outlet is:
   - −92 house wall, into the hairline down the beam face to the foundation drain;
   - −82 pan;
   - −54.5 sill block wet;
   - −39 outer wall, onto an unsealed −67 liner top (N2);
   - only then the surface, at −7 plus head, because the −20 notch has no outfall.
2. **The water corner is a permanently wet, jointed, cobble-filled sump in unlined ground** 100 mm from the foundation-drain envelope (N3).
3. **The multi-storey load was never taken to the ground (N4).** Bearing on the 260-wide beam is 75–170 kPa (I), against 75 kPa for firm clay or 50 kPa for loose sand.
4. **Soil gas is open at the jamb stem and the jamb corner (N5).**

With N1–N5 fixed, I would expect **8.5–9**.

---

## 2. Findings

**Severity counts (open now, new plus carried): 0 blocker · 5 major · 13 minor** (7 new minors N6–N12, 6 carried).

### Majors

**N1. (major) Door-side overflow hierarchy: the −95 weir route is gone, the −92 house wall leaks to the foundation drain, the notch has no outfall, and the sill block wets first.**
- **Parts:** `channel` (+ note), `channel-drop`, `pan`, `pan-skirt`, `tray-slips-notch`, `pavers-lined`, `dam-angle`, `sill-block`; research 14 §3.5.

**Problem (INFERRED from the spec geometry):**

| water level in a channel with a blocked outlet | what happens (v3 as drawn) |
|---|---|
| −120 | Invert (drawn flat). The note says −95 → −120 with a −95 weir, but at the high end that leaves only **3 mm** under the −92 house wall. |
| **−92** | Water tops the house wall (x −31.5 → −21.5) into the ≈1 mm gap between the channel and haunch (to x −22) and the skirt (x −21.5 → −21). That hairline runs down the exterior face of the skirt and damp-proofing to the footing base (−530), then into the perimeter-drain envelope. **Channel water then reaches the foundation drain:** the 08b failure-table mode (S). |
| −82 | Pan nose floor (−82.2) backflooded. |
| −73.6 / **−54.5** | Bearer underside, then **sill-block underside (timber composite) wet**. |
| −39 | Over the outer wall top, between the tray fold and the paver, onto the liner top (−67), and partly **behind** the liner (N2). |
| −20 | "Notch" slips (w 4200–4800, appearance model only). It is bounded by landing pavers at −7 (PT(−171.5)), so it is a pocket with no outfall. |
| **−7 + ≈3 head ≈ −4** | The real surface crest: the whole tray and landing edge. That leaves only ≈1 mm under the −5 barrier, and it sits above the −2 top of the foil bond. |

- The single outlet is a 57 mm ID bottom drop with a 90° bend at −330, buried in the drain envelope with no cleanout. Leaves, grit or ice can block it.

**Exact fix (INFERRED geometry; SOURCED rules 08b M9 and §M.4 "the channel must never back up", the failure table; R2 lap-2 N3):**
1. **Delete the "−95 weir" and the "−95 → −120" note.** Keep the channel flat at invert −120 (as drawn), with a removable 316 leaf basket in the bottom outlet at w 75, reached by lifting the ≤ 1 m tray length.
   - A flat 4.8 m channel to an end outlet is ordinary practice for this tiny catchment (strip of slips plus glass wash).
   - Put the silt trap in the storm sump (N7), not in the channel.
2. **Second, independent bottom outlet at jamb B:** `channel-drop-b` at x −134.25, w 4725, y −330 → −120, with its own butt-fused HDPE 63 at 1 % to a separate sump inlet (N7).
3. **Cap the house wall.** Extend `pan-skirt` from the course face (x −20.25, y −92) across the house-wall top to x −31.5, then down the wall's inner face to −110, butyl-bonded throughout: new path `[[-20.25,-92.25],[-31.75,-92.25],[-31.75,-110]]`. The hairline at x −22 → −21.5 is then closed at its top, so nothing enters it below the pan.
4. **Make the notch real.** Dish the landing pavers at **w 4200–4800, x −171.5 → −639.5** (three modules):
   - top −20 at the channel, rising to PT(−639.5) = −14.8 (a 1.1 % back-fall pocket);
   - joints 6 open, so the pocket soaks into the lined base, then the underdrain;
   - draw it in the section set too, as a w-section.
5. **Rewrite 14 §3.5 as:**
   - −120 invert → two outlets;
   - −92 capped;
   - −82 pan (water barrier);
   - −54.5 block (double-failure event only, so state it as such);
   - −39 outer wall → outboard of the liner (N2);
   - −20 notch pocket;
   - −12 lip;
   - −5 / −2 barrier.

**N2. (major) The liner's house-side termination (top −67) is unsealed against the channel's outer face; the first joint and the −39 overflow go behind the liner to the foundation envelope. (Lap-2 N10, raised.)**
- **Parts:** `liner`, `landing-tray`, `pavers-lined`, `channel`, `perim-rock`.
- **Problem:**
  - The liner upturn (x −173.5 → −171.5) ends at −67 = the paver underside, with its house face on the channel face.
  - Water running down the paver-to-channel joint (x −171.5) arrives on the **house side** of the liner. It runs down the channel and haunch face to −193, then into `perim-rock`, then the foundation drain. This happens in every rain on the first joint, and in every channel overflow above −39.
  - The w-end upturns ("wrap the channel end caps") and the underdrain boot at w 0 are notes only.
- **Exact fix:**
  - Raise the upturn top to **−42**: `B[5] = [CH_OUT − 2, −42]`.
  - **Butyl/MS-bond it 80 to the channel's outer face (−45 → −125).** The polymer-concrete wall is only 12 thick, so do not anchor through it.
  - Add a 316 Z counterflashing 0.8 clipped under the tray's outer fold, `path [[-171.9,-39],[-177.5,-39],[-177.5,-58]]`. It laps 16 over the liner top on its outboard face.
  - Start the first paver course at x −178.5.
  - Then joint water and the −39 overflow land **outboard** of the liner, so they go to the bedding, the underdrain and the storm.
  - Model one w-end corner (w = 0) before lap 4.
- **Basis:** SOURCED: 08b failure table (channel or underdrain connected to the foundation drain). INFERRED: geometry.

**N3. (major) The water corner is a wet, jointed sump in the only unlined ground, which leaks toward the foundation envelope; the "removable bucket" cannot exist under the cobbles.**
- **Parts:** `basin-shell`, `basin-ends`, `basin-cobbles`, `basin-void`, `jz-base`, `subgrade-jz`, `perim-rock-jz`, `rill-floor`.

**Problem:**
- **Standing water.** Outlet invert −145, sump floor −350: **205 mm of permanent water.** It is held by a five-piece granite assembly (U-shell plus two end walls, 60 thick) with vertical joints.
- **Leak path.** The basin bottom (−410) sits on compacted till 100 mm outside the drain envelope (x −400), whose rock reaches −530. Constant-head seepage perches on the till, flows into the envelope and so into the foundation drain. The rest flows outward on the subgrade and soaks in at the −1887.5 curb, 1.9 m from the house.
- **Mosquitoes.** Water lies 80–90 mm below the cobble top, dark and sheltered. Vancouver surveillance found catch basins to be the main larval habitat (S2, CoV 2003/2005).
- **Freeze.** The water surface is 125–130 below grade, inside the 450 frost zone, in a vertical-sided box: ice pushes the joints apart.
- **Maintenance.** The cobbles fill the sump to −350, so the "removable bucket" has no place. Silt lodges between about 150 kg of cobbles.
- **Look.** No loss: the water is invisible under the cobbles either way.

**Exact fix: a dry, monolithic splash bowl (INFERRED; SOURCED 08b M9 for silt management and J11 for the forebay doing the settling):**
- `basin-shell`: **one** carved or precast stone-faced vessel.
  - Outer box x −500 → −1100, w −750 → −150, outer bottom **−205**.
  - Inner floor **−133 at x −560 → −145 at x −1040 (2 % to the outlet)**: no standing water.
  - Delete `basin-ends` as separate parts.
- **Outlet:** slot 80 wide × 60 high at invert −145 (replacing the 80 round hole), with a 316 bar screen.
- **Cobbles:** a loose 100–150 cobble splash bed on the floor, top ≈ −60, hand-removable.
- **Bedding:** 150 of compacted 19 mm clear crushed rock on nonwoven geotextile, y −205 → −355, x −450 → −1150. This gives non-frost-susceptible bearing.
- **Silt:** let the silt travel to the forebay (`rg-apron`), which is designed to collect it, ≥ 5 m away.
- **Rill:** the first `rill-floor` unit, from x −1100 to −2300, is one gasket-free precast piece cast integral with the basin outlet, so there is no joint within 1.2 m of the house.

**N4. (major) The multi-storey load is not taken to the ground: the 260-wide beam and the 153–203 stem were sized for a one-storey sill.**
- **Parts:** `beam`, `jamb-stem`, `jamb-posts`, `glulam`; note on `beam`.

**Problem (loads INFERRED; allowable values S2):**
- **Header reaction.** Glulam span ≈ 5.0 m. Loads:
  - floor: DL 1.2 + LL 1.9 kPa over ≈ 2.4 m tributary;
  - wall above ≈ 1.9 kN/m;
  - roof share: DL 1.0 + snow ≈ 1.6 kPa over 2.4 m.
  - This gives ≈ 15.5 kN/m, so **≈ 39 kN at each jamb post group**.
- **Jamb wall.** It bears the I-joists (`joists-jz`), so it carries ≈ 15.5 kN/m too.
- **Bearing pressure.**
  - Line load plus self-weight ≈ 19 kN/m on 0.26 m: **≈ 75 kPa**.
  - Under the post group, a beam-on-elastic-foundation spread (characteristic length ≈ 1.6 m on till) adds ≈ 45–90 kPa, giving **≈ 120–170 kPa** near the jamb.
- **Against Table 9.4.4.1 (S2):**
  - fails on firm clay (75), soft clay (40) and loose sand (50);
  - marginal on stiff clay or dense sand (150);
  - passes on till (200).
- **Not addressed:** hold-down anchors for the jamb walls, which bracing will need beside a 4.8 m opening in a multi-storey wall.

**Exact fix:**
- **Inward toe** under both jamb zones, extending 600 under the opening for the post spread: `beam-toe` R(240.4, **−530**, 640.4, **−380**), runs `MB([[SPAN[0], 600]])`.
  - This doubles the bearing width to 660, so pressure is ≈ 60–85 kPa.
  - It needs no change to the exterior face, so the drain at (−185, −475), the envelope and the frost margin are untouched. The interior stone stays at −300 above it.
- **Geotechnical letter:** classify the soil per Table 9.4.4.1 and confirm the frost reading (450 vs 1.2 m on clay, 07 E2).
- **Hold-downs:** the engineer locates cast-in hold-down anchors in the stem and beam at each jamb, with edge distance against the 153 stem. This is R1 for the wall side.
- **Note on `beam`:** "Part 4: carries jamb walls and glulam reactions (≈ 39 kN per jamb, I); bearing per geotechnical report."

**N5. (major) Soil-gas barrier and slab-edge break are not continuous at the jamb stem and the jamb corner.**
- **Parts:** `soilgas`, `soilgas-up`, `jamb-stem`, `slab-jz`, `dam-angle`, `edge-seal`.
- **Problem:**
  - At w < 0, `soilgas` ends at x 241.4, 1 mm short of the stem face (240.4), with no turn-up and no bond.
  - `slab-jz` is cast straight onto the stem step (x 190.2–240.4 at −100) and against its face (x 190.2) with **no sealant**.
  - Soil-gas path: sub-slab stone → EPS joints → the 1 mm gap → the step's cold joint → the room at (190.2, 0).
  - That fails V2 9.25.3.6 (perimeter sealed to walls with flexible sealant; S, 12) and 9.13.4.2 (air-barrier system; S).
  - At w = 0 the dam angle simply stops: the corner between the opening line (x 241.4) and the jamb line has no detail.
  - Thermally, the jamb slab has no edge strip, unlike 09 §9.2 (25 mm strip at the stem, S).
- **Exact fix (INFERRED geometry; SOURCED rules):**
  - `jamb-stem` → R(37, −193, **190.2**, 300): a plain 153 stem with no step.
  - New `eps-jz` R(190.45, −193, 241.4, −100.25), runs JZ (93 graphite EPS on the beam top).
  - `soilgas` at JZ: path `[[2500,-100.125],[190.575,-100.125],[190.575,-12]]`, **butyl-bonded to the stem face −100 → −12**.
  - New `slot-edge-jz`: cork R(190.7, −100, 215.7, −8). `slab-jz` → R(215.7, −100, 267, 0). `edge-seal-jz`: flexible sealant R(190.45, −8, 215.7, 0) (9.25.3.6.(5), S).
  - **Dam-angle return at w = 0:** a 316 plate welded to the dam angle in the plane w = 0, x 190.45 → 241.4, y −110 → −5, butyl-bonded to the course end. The jamb poly laps 100 onto it.
- **Basis:** SOURCED: V2 9.13.4.2, 9.25.3.6.(2)(5), A-9.25.3.6 (via 12); 09 §9.2. INFERRED: geometry.

### Minors (new)

**N6. Underdrain: the liner trench is level along w, and the outlet crosses 12 mm under the rill trough.**
- **Parts:** `liner`, `underdrain`, `underdrain-out`, `rill-floor`.
- **Problem:**
  - The trench floor is −323.9 at x −1785 (the trench runs −322.5 → −325.6 along x) and constant in w. The pipe invert runs −317.9 at w 0 → −293.9 at w 4800.
  - So **6–30 mm of water stands permanently** under the pipe in the trench; at w 4800 the trench serves no purpose.
  - `underdrain-out` crown −214.1 at w −450 lies **12 mm** below the rill trough's underside (−201.9).
- **Fix:**
  - Grade the trench floor (liner and subgrade) along w with the pipe: trench depth **6 at w 4800 → 30 at w 0**, i.e. liner floor = pipe outer bottom − 2 everywhere.
  - Run `underdrain-out` at **2 %** beyond the boot (dy 24 over 1200). That gives a 19 mm crossing, so sleeve the pipe in a 150 HDPE sleeve under the trough.
  - 0.5 % accepted (common minimum for perforated subdrains, INFERRED).

**N7. Storm sump unlocated; one backwater valve missing; channel pipe has no cleanout and no fusion spec.**
- **Parts:** `perim-drain`, `channel-pipe`, `channel-drop`, `underdrain-out`, `rg-riser`.
- **Problem:**
  - Three pipes head for an undrawn sump: perimeter drain invert **−526**, channel pipe **−371.6** at w −1200, underdrain **−322.9** at w −1200.
  - Only the underdrain has a backwater valve. If the storm lateral surcharges, the sump backs up the perimeter drain (lowest inlet) to the footing. If the sump outlet blinds, channel water rises into the perimeter drain at the sump.
  - The 63 channel pipe runs ≥ 1.3 m inside the drain envelope (crown −298, 292 cover, inside the 450 frost zone; it is dry between storms, so the risk is low). It has a 90° bend at −330 that can only be rodded from the sump.
- **Fix (INFERRED levels; SOURCED rules 9.14.5 via 07 E10: sump ≥ 750 deep, ≥ 0.25 m², secured cover; Book II 2.4.5.3: subsoil drains to a sump on storm):**
  - Draw a **600 Ø storm sump at x −1000, w −1500**: rim at PT (≈ −24), outlet invert **−620**, silt depth 300 (bottom −920, depth ≈ 900 ✓), granite-clad bolted lid.
  - Separate inlets: perimeter −545 (1 % from the corner), channel A ≈ −385, channel B (N1), underdrain ≈ −345. All sit ≥ 75 above the outlet.
  - **One backwater valve on the sump outlet to the storm lateral**, in a valve box, protecting every inlet.
  - Channel pipes **butt- or electro-fused** and pressure-tested.
  - A 45° wye at the drop bend with a cleanout riser to a flush 316 cap in the jamb paving at (x −134, w −100).
  - Show the outlet schedule (§ Level chain) on the drawing.

**N8. The rill under the clapper is a 30–38 mm culvert, 1.25 m long.**
- **Parts:** `clapper`, `rill-walls`.
- **Problem:**
  - Clapper soffit −113.0 → −133.8 over rill floor −151.3 → −163.8: **38 → 30 mm clear**.
  - Full-flow capacity is ≈ 2.7 L/s (I) against ≈ 1.5–1.7 L/s design. Leaves or ice block it.
  - The rill then overtops at x −1731.5 across the walking route (B651 8.2.4 is R3's concern; ice is a slip hazard).
- **Fix:** clapper 50 thick in three lift-out pieces of 416; rill walls under it lowered to PT − 50. Clear height becomes **60–68**, capacity ≈ 6 L/s (I), and it can be rodded.

**N9. The runnel lip rests on bioretention medium; mulch sits level with the runnel walls.**
- **Parts:** `runnel-floor`, `runnel-walls`, `runnel-strip`, `bed-mulch`.
- **Problem:**
  - `runnel-strip` stops at x −5150. The last 257 mm, including the lip at −5407.2, rests on `rg-medium`, which is saturated whenever the pond passes −257 and scoured by the drop.
  - The wall tops equal BT, the mulch top, so chips wash in.
- **Fix:**
  - Make the last runnel unit one precast piece from x −4250 to −5407.2. That puts 900 on the strip and lets the 257 lip **cantilever** with no footing in the medium.
  - Raise the wall tops to BT + 25 (−84 → −97), or edge the runnel with a 150 gravel-mulch strip.

**N10. Garden size against an unknown multi-storey roof; the far spill has no downhill route.**
- **Parts:** `rg-*`, `subgrade-far`; notes.
- **Problem:**
  - Storage ≈ 0.80 m³ per m of garden (ponding 0.28 + rock voids 0.33 + medium 0.19, I). The Rain City 48 mm capture (08, S) therefore serves ≈ **17 m² of roof per metre**, about 120 m² over the 7.2 m appearance length. The roof draining to this downspout is not stated.
  - The ground beyond the far toe **rises** from −175 to −165 at x −8000, so the −230 spill notch cannot drain away from the garden.
- **Fix:**
  - Note the roof area and set garden length ≥ A_roof × 0.048 / 0.80.
  - Show the spillway route: a 1 m wide swale from the notch falling ≥ 1 % to the property drainage or street, never toward a neighbour or the house.

**N11. Tree-pit reverse flow.**
- **Parts:** `pit-link`.
- If the subdrain or outlet surcharges, rock water above −1120 flows **back** up the link into the pit at 3.9–4.9 m.
- **Fix:** note it as an accepted surcharge-only event. Or set the link floor at −1110 with a 150 HDPE root barrier collar where it enters the rock, which also keeps the tree's roots away from the subdrain 1.5 m away.

**N12. Jamb stem: cold joint at −193 under the plinth EPS, no waterstop, no damp-proofing above the beam.**
- **Parts:** `jamb-stem`, `beam`, `dampproof`, `plinth-insul`.
- Water in `jz-base` reaches the beam-top ledge (x −20 → 37) under the EPS and the stem/beam cold joint, 188 below grade.
- **Fix:**
  - Carry `dampproof` up the stem face, path `[[36.75,-193],[36.75,+100]]`.
  - Swelling waterstop strip in the cold joint at x 110.
- Not a code requirement here (9.13.2.1 applies only where exterior grade is above the interior floor; S via 07). It is good practice at a water corner.

### Minors (carried)
- **Lap-2 N7 + heated slab.** Edge RSI 0.63 against 2.45 (Table 10.2.2.6 applies to heated floors, S via 12). Take the THERM ψ route or a 2 × 10 aerogel edge (I). Keep the floor-heating pipes ≥ 150 back from the cork.
- **Lap-2 N11.** February test pit; seasonal high water must be below −1900 / −2400 (J1), or else a lined flow-through planter.
- **12.** THERM ψ: threshold, jamb stem, slab edge.
- **14.** Terrace base: infiltration test (08b M14). If below 13–15 mm/h, add an edge subdrain at x −3200, invert −335, to the sump (N7).
- **15.** Nonwoven separator under the sub-slab stone. Subgrade: remove stones over 25, compact to 95 %.
- **16.** Slab notes: laps ≥ 300; perimeter flexible sealant; booted rough-in; finish after the bleed water; w/cm ≤ 0.50; moist cure; post-occupancy radon test.

---

## 3. Level and drainage chain (real numbers, v3 → fixed)

| element | x / w | v3 level | fixed | rule / check |
|---|---|---|---|---|
| Rail / FFL / track | 205–233 | +5 / 0 | = | B651 12 mm (R1/R3) |
| Foil top bond / dam-angle top | 234.5 / 240.9 | −2 / −5 | = | above every crest |
| Tray slips / landing at channel | −171.5 → 83.5 | −7 | = | — |
| Nosing lip | 91 | −12 | = | — |
| Notch | w 4200–4800 | −20 slips, **no outfall** | −20 → −14.8 pocket over 3 modules | N1 |
| Channel outer wall top | −171.5 → −159.5 | −39 | = | overflow outboard of liner (N2) |
| Sill-block underside | 100 → 234 | −54.5 | = | wetted only on a double failure (N1) |
| Liner house upturn top | −173.5 | **−67**, unsealed | **−42**, bonded −45 → −125, Z cap | N2 |
| Pan floor at nose / at bearer | −20 / 98 | −80.7 / −73.6 | = | — |
| Channel house wall top | −31.5 → −21.5 | −92, open behind | −92, **capped by skirt to −110** | N1 |
| Channel invert | w 0 → 4800 | −120 drawn; note −95 → −120 + weir −95 | −120 flat, **two bottom outlets** (w 75, w 4725) | N1 |
| Channel drop / pipe | x −134.25 | −120 → −330; invert −358.5 (w 106.5) → −371.6 (w −1200), 1 % | fused, cleanout wye | N7 |
| Beam top / course base | −20 → 240.4 | −193 | = | — |
| Perimeter-drain crown / invert | (−185, −475) | −420 / −526 | = | cover 151 top, 160 soil side ✓ (9.14.3.3.(4)) |
| Footing underside | — | −530 | = + inward toe R(240.4, −530, 640.4, −380) | frost 73–75 ✓; bearing N4 |
| Landing paving | −171.5 → −1887.5 | −7 → −35.6 (1:60) | = | — |
| Liner floor / trench | −1670 / −1700 → −1885.5 | −293.4 / −322.5 → −325.6, level in w | trench graded in w: depth 6 (w 4800) → 30 (w 0) | N6 |
| Underdrain invert | −1785 | −317.9 (w 0) → −293.9 (w 4800), 0.5 % | = | — |
| Underdrain outlet invert | −1785, w −1200 | −322.9 (0.5 %) | −341.9 (2 %), sleeved under the rill | N6 |
| Liner cut-off top | −1885.5 | −145.6 | = | 78.6 below the house top (121.6 after N2) ✓ |
| Basin rim / cobble top | −500 → −1100 | −12.5 → −22.5 / ≈ −55 | = / ≈ −60 | — |
| Basin outlet / sump floor / shell bottom | −1100 | −145 / **−350** / −410 (205 standing) | −145 / floor −133 → −145 / −205 on stone to −355 | N3 |
| Rill floor | −1100 → −3441.5 | −145 → −168.4 (1 %) | = | J16 ≥ 1 % ✓ |
| Clapper soffit / clear height | −1731.5 → −2979.5 | −113.0 → −133.8 / **38 → 30** | PT − 50 / 60–68 | N8 |
| Runnel floor | −3441.5 → −5150 | −168.4 → −202.6 (2 %); depth 59 → 81 | = ; walls BT + 25 | N9 |
| Runnel lip | −5407.2 | −207.7, on medium | = , cantilevered | J11: +67.3 over crest ✓; +22.3 over spill ✓ |
| Forebay cobble top | −5407 → −6007 | −307.7 → −507.7 | = | — |
| House rim / crest / spill / far rim | −5150 / — / — / −7909 | −122 / −275 / −230 / −175 | = | freeboard 153 ✓; far rim below house rim ✓ |
| Pond floor | −6209 → −7009 | −475 | = | J8 200 ponding ✓ |
| Medium / choker / rock | — | −1000 / −1100 / −1400 | = | J1 needs groundwater below −1900 (carried) |
| Subdrain invert / riser base / outlet | −6609 | −1260 / −1305 / ≤ −1260 | = | ✓ (lap-2 N4) |
| Tree-pit floor / link / rock normal level | −3900 → −5150 | −1100 → −1120 / −1140 → −1080 / −1260 | = | ✓ (N11 surcharge only) |
| Ground beyond far toe | −7909 → −8000 | −175 → −165 (**rising**) | spill swale ≥ 1 % away | N10 |
| Storm sump | — | not drawn | (−1000, w −1500): outlet −620, bottom −920 | N7 |

**Outlet schedule (v3, to go on the drawing):**

| system | path and inverts | fall | destination | backflow guard | status |
|---|---|---|---|---|---|
| Roof | spout → basin (−145) → rill → runnel → lip −207.7 → forebay → garden → riser (crest −275) → ≤ −1260 | 1 % / 2 % | tank → storm | flap; freeboard | ✓ (N3, N8, N9) |
| Channel | drop −120 → HDPE 63, −358.5 → −371.6 | 1 % | sump (undrawn) | none | N1, N7 |
| Landing underdrain | −317.9 → boot w 0 → −322.9 | 0.5 % pipe, 0 % trench | sump, own inlet | backwater valve ✓ | N6, N7 |
| Perimeter drain | −526 level | 0 (07 E8 ✓) | sump, own inlet | none | N7 |
| Jamb ground (`jz-base`) | x −97 → −400 into the envelope; beyond that, outward on the subgrade to the −1887.5 curb | 1:60 | foundation drain / infiltration at 1.9 m | — | N3 (basin seepage) |
| Terrace base | closed tub | — | infiltration at 2.0–3.3 m | — | carried 14 |
| Bed and tree pit | link → rock | 2 % | garden | — | ✓ |
| Sub-slab stone | radon only, never drained | — | — | — | ✓ |

**Capacities (all INFERRED, Manning n 0.010–0.015):**
- Basin outlet (80 Ø at 80 head): ≈ 3.8 L/s.
- Rill (100 deep, 1 %): ≈ 14.5 L/s. Under the clapper as drawn: ≈ 2.7 L/s.
- Runnel (50 deep, 2 %): ≈ 8 L/s.
- Riser weir (Ø 200, 45 head): ≈ 9.6 L/s.
- Channel pipe (57 ID, 1 %): ≈ 1.5 L/s full, against a channel catchment of ≈ 0.07 L/s.
- Roof design flow: ≈ 1.5–1.7 L/s for 100 m² (08 J15 basis). It must be re-derived for the actual roof (N10).

---

## 4. Control-layer pen test (slab → threshold → landing → water corner)

| layer | v3 as built | break | after N1–N12 |
|---|---|---|---|
| **Bulk water, surface (door)** | Glass and slips → tray perforations → channel −120 → one bottom outlet → 63 pipe in the envelope → sump. | Single outlet; no cleanout (N1, N7). | Two outlets, baskets, fused pipes, cleanout. |
| **Overflow** | −92 house wall → hairline behind the skirt → foundation drain. −54.5 block. −39 → liner top −67. Notch −20 undrained. Surface −7 + head ≈ −4 against the −5 barrier. | **Yes (N1, N2).** | House wall capped; liner −42 bonded and counterflashed; pocket −20 into the lined base; −5 barrier keeps 15 mm. |
| **Bulk water, below grade** | Skirt → damp-proofing (98 lap) → EPS → envelope → drain −526. Liner → level trench → underdrain → valved outlet. Jamb ground → envelope. | Basin seepage into the envelope (N3). Trench level (N6). Liner top (N2). | Dry monolithic basin; graded trench; bonded liner. |
| **Roof water** | Spout → wet basin → rill → clapper culvert → runnel → lip → forebay → garden. | Standing water, freeze, mosquito (N3); culvert (N8); lip on medium (N9). | Dry bowl; 60–68 culvert; cantilevered lip. |
| **Air / soil gas (opening)** | Poly → butyl 85 → dam angle → butyl −60 → −25 → pan upturn → foil (22) → block. | Closed ✓ | = |
| **Air / soil gas (jamb, corner)** | Poly ends 1 mm short of the stem; slab on the stem step; no sealant; no corner piece. | **Yes (N5).** | Poly up the stem face, butyl; cork; sealant; welded dam-angle return at w = 0. |
| **Vapour** | Poly under the slab; slab dries upward; stem dries outward through the parge. | — | ✓ |
| **Capillary** | Clear stone; PU course; cork on the dry side of the poly; skirt. Jamb: slab directly on concrete. | Jamb slab-on-stem (N5). | EPS and cork at the jamb. |
| **Thermal** | EPS 100 meets the course (93 overlap); course 500-080 class; cork 0.63; graphite EPS 75 on the beam; plinth EPS 100. | Edge RSI with a heated slab (carried); jamb slab on the stem (N5); no ψ. | THERM; edge per the City reading; jamb edge strip. |
| **Structural / frost** | Beam to −530 (73–75 margin); haunch on EPS plus a stone column; runnel on the strip; basin on till at −410. | **Multi-storey bearing (N4)**; basin heave (N3); lip on medium (N9). | Inward toe; geotechnical letter; basin on stone; cantilevered lip. |

## 5. Moisture paths and ageing (with the fixes)

- **Glass and slip water:** channel → two outlets → sump → storm. On a double blockage: pan → pocket → lined base → underdrain. Nothing reaches the envelope.
- **Roof water:** from the dry bowl it reaches the garden within minutes. Nothing stands at the house; silt settles in the forebay at 5.4–6.0 m.
- **Perched winter water** is drawn down to −526 at the beam. The sub-slab stone (−300 → −200) stays 226 above it.

| horizon | expected state | action |
|---|---|---|
| **5 yr** | Baskets and the forebay collect grit; moss in the rill; cork sealant due. | Spring and fall: lift the tray lengths, empty the baskets, rake the bowl cobbles, skim the forebay. Flush the drains from the cleanouts. |
| **15 yr** | Envelope geotextile partly blinded; landing pavers settled 2–5 mm while the channel and tray stay put; rill gaskets aged. | Camera all pipes. Re-level the first paver rows. Re-gasket the rill units. |
| **30 yr** | Door renewal: the dam angle, pan, poly bond and corner return can be inspected. Garden sediment ≈ 90 mm, inside the 153 freeboard. | Renew the butyl and sealants. Skim the medium. Relay the landing. |

---

## 6. Proposals

**P1. A dry water corner (N3). Adopt.**
- It looks the same: a stone bowl of cobbles under the spout, with water seen only when it rains.
- Gains:
  - no standing water, so no mosquitoes, no ice jacking and no constant leak head beside the foundation;
  - one monolithic vessel;
  - silt handled where the design already expects it (the forebay).

**P2. Two-ended neutral channel (N1). Adopt.**
- Flat at −120, a basket outlet at each end, each on its own fused pipe and sump inlet.
- A single blockage then never reaches the pan, and the visible notch pocket becomes a true third line.

**P3. Inward toe at the jambs (N4). Adopt.**
- R(240.4, −530, 640.4, −380) under w ≤ 600 and w ≥ 4200: ≈ +0.06 m³ per jamb zone metre.
- The exterior face is untouched, so the drain, cover and frost margin stay as drawn, and the bearing pressure halves.

**P4. One drawn storm sump with an outlet schedule (N7). Adopt.**
- One valved outlet protects every system.
- The drawing then shows where each of the eight water systems ends, which is the completeness the Detail Library benchmark expects.

**P5. Bold, re-offered from lap 2: foamed-glass-gravel (FGG) under the slab** in place of 100 stone plus 100 graphite EPS.
- 250 compacted FGG: RSI ≈ 2.5–2.9; capillary break, radon layer and insulation in one; ≈ −8 kgCO2e/m on the floor zone (S2 proxy).
- At the jamb (N5) it removes the EPS-on-beam-top piece: the FGG runs to the stem face.
- It still needs the CGSB-51.34 poly above it (12, S) and an alternative solution for the insulation.
- Not evaluated in v3. Worth one decision before the floor is frozen.

---

## 7. Top 3 changes that would raise this score most

1. **Rebuild the door-side overflow hierarchy (N1 + N2).**
   - Delete the −95 weir; channel flat −120 with **two bottom outlets** (w 75 and w 4725), each on its own fused HDPE pipe.
   - Cap the −92 house wall with the skirt down to −110.
   - Liner upturn to **−42**, bonded −45 → −125, with a 316 Z counterflashing.
   - Notch pocket −20 → −14.8 at w 4200–4800, x −171.5 → −639.5.
   - Restate 14 §3.5 with the true order.
2. **Make the water corner dry and watertight (N3, N8, N7).**
   - Monolithic bowl: floor −133 → −145, bottom −205 on 150 crushed stone; first rill unit integral to x −2300.
   - Clapper 50 in lift-out pieces (60–68 clear).
   - Draw the storm sump at (x −1000, w −1500): outlet −620, one backwater valve, separate inlets.
3. **Take the multi-storey to the ground and close soil gas at the jamb (N4 + N5).**
   - Inward toe R(240.4, −530, 640.4, −380) plus a geotechnical letter and hold-downs.
   - Stem R(37, −193, 190.2, 300); EPS on the beam top; poly bonded up the stem to −12; cork 25 and flexible sealant; welded dam-angle return at w = 0.

---

**Sources (web, this session):**
- [VBBL 2019 Part 9 Section 9.4, Table 9.4.4.1 (bcpublications)](https://free.bcpublications.ca/civix/document/id/public/vbbl2019/657827795); [BCBC 2018 9.4](https://free.bcpublications.ca/civix/document/id/public/bcbc2018/bcbc_2018dbp9s94) (search summaries)
- [City of Vancouver council report 2005 (West Nile: catch basins)](https://council.vancouver.ca/20050412/a4.htm); [Park Board West Nile report 2003](https://parkboardmeetings.vancouver.ca/2003/030526/west_nile_Council.pdf); [Saanich: mosquitos and West Nile virus](https://saanich.ca/EN/main/community/natural-environment/invasive-species-noxious-weeds-wildlife/living-with-wildlife/mosquitos-west-nile-virus.html) (search summaries)
