# Review loop 2: junctions A (base of wall), B (eave), C (bench), model v2

Reviewer: detail researcher (research/06).

Read: detail01.mjs (v2), review/loop2/packet-v2/report.md and the A/B/C captures, and review/compare. Read-only; nothing in Rhino was changed.

**Conventions.** Coordinates use the model datum:
- x = 0 at the concrete face, exterior **negative**
- y = 0 at finished grade at the wall face (now x = −63, the parging face)
- w = along the wall

Derived v2 constants:
- Wall: FACE −108.81, NOSE −120.81, STRAP −82.11, EI −63.11
- Eave: FASCIA_OUT −625, FASCIA_IN −600, NAIL_IN −460
- Bench: posts at x −855 / −1115, slat underside 375
- Grade: G(x) = 0.05·(x + 63)

**Counts.**
- Loop-1 items (29): 23 fixed, 2 partly, 4 declined-accepted, 0 not fixed, 0 declined-disputed.
- New findings: **0 blocker · 1 major · 9 minor**.
- v3 flags: 6. These are not scored.

---

## 1. Status of loop-1 items

| # | Item | Status | Check in v2 |
|---|---|---|---|
| 1 | Joist cantilever > 600 | **fixed** | Joists −600 → bearing at 0: 600 ✓. Overhang 516 from the stucco face; code shelter band O/4 = 129, and the stucco top (3020) is 61 below the soffit ✓. |
| 2 | Edge metal hem and cleat | **fixed** | 24 ga cleat from (−625.3, 3460) into the drip. Screws at y 3440: 24 above the face bottom (≤75 ✓), into nailer-3 (3430–3468) ✓, at 300 o.c. ✓. 12 mm hem ✓. |
| 3 | Gutter tight to fascia | **fixed** | Back at −633.3 on 8 mm stainless spacers. Drip at −640.3 is 7 mm inside the back ✓. Lip −768. Screws into nailer-1 (3354–3392) ✓. |
| 4 | Lath fastening | **partly** | Screws into the strap, 18 mm embedment, at 150 ✓, with washers ✓. **Two gaps:** the note cites 9.27.5.7(3), but the stucco-lath rule I flagged is **9.28.3.2(3)** (VBBL19: lath nails 25 mm into framing); and the first row is at 375, leaving the bottom 144 mm of lath unfastened. See N9. |
| 5 | Strapping support | **fixed** | Rows at 375 + 300k + 2950 ✓. The lowest row clears the flashing top (360) ✓. Engineer note on `ei` ✓. |
| 6 | Rail and braces unfastened | **fixed** (method changed, accepted) | Tenon 25 × 30 × 60 at y 315–345, clear of the apron bolts at 305 / 355 ✓. Pins at y 330 ✓. A full-bay diagonal replaces the knee braces (accepted). Its end connections: see N7. |
| 7 | Post-top end grain | **fixed** | Posts to 373.5 plus 1.5 cap ✓ |
| 8 | Pre-strip 50 past interior face | **fixed** | x 205, which is 51 past the gypsum face 153.9 ✓ |
| 9 | Membrane lap at eave | **fixed** | `membrane-lap` (studs) + `membrane-top` (bays), both from 3000: 100 lap ✓. Collars carried as a note ✓. |
| 10 | Poly-to-foam tie | **fixed** | `vpoly-tail` 50 onto plate2; foam from 3100.15; `seal-plate` ✓ |
| 11 | Wind barrier on eave mineral wool | **fixed** | Laps the EI 19 mm (3081–3100) instead of 25. Acceptable because the soffit board caps it. |
| 12 | Toe-nails and uplift clips | **declined-accepted** (note) | Note on `joists` ✓ |
| 13 | Nailer plies | **fixed** | 4 × 38 + rip. 2 screws per joist, 50 into the joist ✓. Ply screws ✓. |
| 14 | Fascia board and second row | **partly** | Two boards ✓, second row at 3448 into nailer-3 ✓. **But the "rebated drip joint" is modelled as a plain butt at 3340.** See N6. |
| 15 | Closure screws | **fixed** (location issue) | Screws sit on the plate1/plate2 joint line at y 3062. See N8. |
| 16 | Ceiling | **fixed** | 12.7 mm, no poly ✓ |
| 17 | Air-seal beads | **fixed** | `seal-sill`, `seal-floor`, `anchor-seal` ✓ |
| 18 | Bolt at HB | **fixed** | 221.5 ✓ |
| 19 | Pier Ø and spacing | **fixed** (two sub-issues) | Ø200 ✓, 60 mm apart, 169 mm clear of the rock envelope ✓. Sub-issues: depth at pier 2 (N2) and the flat-top radius (N3). |
| 20 | Anchor nut and washer | **fixed** | Nut top 170.5 < seat 175.5 ✓. Anchor 20 proud (<25) ✓. |
| 21 | Slat screws | **fixed** (edge distance issue) | See N5 |
| 22 | Stainless post base | **fixed** | ✓ |
| 23 | Pier top fall | **fixed** | 1:10 plus chamfer ✓ (see N3) |
| D1 | Flashing clips | **declined-accepted** (resolved by DEFG D1) | The leg bears on foundation XPS (−12…−51) and parging (−51…−63), leaving a 58 mm free nose. This is better than clips. The interface needs a build sequence: see **N1**. |
| D2 | Zinc-alloy base bead | **fixed** | ✓ |
| D3 | Fascia off the roof edge | **declined-accepted** | Your objection stands for the geometry you modelled. Residual: `fascia-upper` (3340–3516) can only be renewed with the roof edge. Tie it to the roof / perimeter-flashing renewal at about 20 yr (CMHC-BPG Table 9.2, SOURCED) on the decades timeline. No geometry change needed. |
| D4 | Bench past the gutter lip | **fixed** | Seat inner edge −790, 22 beyond the lip (−768) ✓ |
| D5 | Seat height | **fixed** | Seat top 420 = 460 / 473 above local grade at the posts ✓ |
| D6 | Interior ledge thermal bridge | **fixed** (by DEFG D1) | The stem is now insulated outside from the footing to the flashing (50 XPS), so the ledge sits inside the insulation ✓ |

---

## 2. Pen test, v2 (only what changed since loop 1)

**A: base of wall**
- **Water-shedding and drainage:** unchanged and continuous.
  - Stucco → zinc bead (229.7) → 14 mm open gap → flashing at 10 % → drip at (−127.8, 207.2).
  - The drip is 65 mm beyond the new parging face (≥5 ✓) and lands on the gravel strip.
- **New water interface:** the joint between the flashing underside and the parging top (x −51…−63). It is sheltered by the 58 mm nose, but it is a bonded metal-to-cement joint (N1).
- **Thermal, now continuous:**
  - Foundation XPS (−1…−51, footing → 224.7) → flashing → wall EI (−13…−63, 232 up).
  - The two insulation layers overlap 38 mm in x and are separated only by the 0.61 mm steel leg plus a 7 mm drainage gap. That is a small inherent linear bridge, acceptable.
  - The 11 mm air pocket behind the flashing's vertical leg (x −1…−12, y 224.7–304) is closed and lies inside the insulation ✓.
- **Air and vapour:** unchanged ✓.

**B: eave**
- No pen-test changes. Every loop-1 break (pre-strip, poly tie, membrane lap, wind washing) is now closed ✓.

**C: bench**
- **Shedding:** the post-top caps work ✓.
- **Two remaining traps:**
  - The aprons project past the seat edges (N4).
  - The diagonal's upper edge drains into the brace/post joints (N7).

---

## 3. New findings

**N1. major · `fnd-xps`, `parging`, `parging-lath`, `flash`: the interface cannot be built in this order, and it bonds the flashing.**

The problem:
- As drawn, the XPS (−199 → flashing underside) and the parging-on-lath (−149.5 → flashing underside) are each one piece. Both must go on **before backfill**, but the flashing is installed at the framing stage, after the sheathing (03 §3 order: backfill step 5 → flashing step 9).
- So the tops of the XPS and parging would have to be pre-formed to a 10 % line under a flashing that doesn't exist yet.
- The parging would then cure **bonded to the flashing underside** (x −51…−63). This blocks flashing movement and replacement (the base flashing is renewed with the cladding at 15–30 yr, 06 A.3.5) and makes a rigid crack line.

Fix (in this datum):
- (a) Split `fnd-xps` at **y = −20**. The lower board (−199 → −20) goes in before backfill.
- (b) The upper board (−20 → `under(x)`) goes in **after** the flashing:
  - cut to the 10 % slope;
  - top set 2 mm low;
  - flashing bedded on a continuous bead of foam-compatible sealant at x −20…−40.
- (c) `parging-lath` top at `under(x) − 10`. `parging` applied last; its top finishes **6 mm below the flashing underside**, as an open shadow gap that is not caulked. The parging polygon top becomes `under(x) − 6` for x −51…−63.
- The flashing then bears on the XPS (−12…−51) and cantilevers 70 mm to the nose. That is fine for 24 ga with a drip.

Source: INFERRED (sequence from 03 §3; replaceability from CMHC-FL 2.23/2.24 principle, SOURCED).

**N2. minor · `pier-2` (and `pier-base-2`, `native` cuts): pier 2 is shallower than the frost depth the model claims.**
- The pier bottom is at y −500. Local grade at x −1115 is G = −52.6, so the pier is only **447** below grade. At its outer edge (x −1215, G = −57.6) it is 442.
- Frost depth is ≥450 (VBBL19 1.1.3.2(1)).
- Fix: both pier bottoms at **−510**, granular bases −610…−510, `native` cuts from −610. That gives ≥452 at the lowest adjacent grade.
- Source: SOURCED.

**N3. minor · `pier-*` revolve profile: the base-plate corners overhang the flat top.**
- The flat top has radius 50. The base-plate half-diagonal is √(38² + 47.66²) = 61, so the plate corners sit ~1 mm off the concrete.
- Fix: profile `[[0,152],[65,152],[90,149.5],[100,139.5],[100,-510],[0,-510]]`. This keeps the 1:10 fall and the chamfer, and includes N2.
- Source: INFERRED.

**N4. minor · `apron-1`, `apron-2`, `slat-*`: the aprons stick out past the seat and form a moisture trap.**
- `apron-1` (−810…−765) projects 25 beyond the seat's inner edge (−790). `apron-2` (−1205…−1160) projects 9 beyond its outer edge (−1196).
- The exposed side-grain apron top meets the slat edge in a re-entrant corner that holds water and organic debris. This is the trap BCH-DECKS describes (SOURCED: "trapped between … trim").
- The frame is 440 wide outside the aprons; the seat is 406.
- Fix: narrow the frame so the aprons lie under the seat. Post c/c 226: **PX = [−880, −1106]**.
  - apron-1 → −835…−790, apron-2 → −1196…−1151, both flush with the seat edges.
  - rail −1061…−925 (136 long), tenons and pins shifted with the posts, piers at the new x (still 26 mm apart). Use one shared granular base under each pair.
  - SLATS unchanged, so the seat inner edge stays at −790 and still clears the gutter lip.
- Source: INFERRED geometry.

**N5. minor · `slat-screws-1`, `slat-screws-3`: screws too close to the slat edges.**
- At x −800 the screws are 10 mm from slat 1's edge (−790); at −1180 they are 16 mm from slat 3's edge (−1196). That risks splitting.
- With N4 applied, place them at **x −812 and −1173** (22 / 23 mm from the edges, inside the new aprons).
- Without N4, use pre-drilled screws angled 15°.
- Source: INFERRED.

**N6. minor · `fascia-lower`, `fascia-upper`: the drip joint is not modelled.**
- The butt joint at y 3340 lets water running down the exposed upper board (3340–3416) wick into the joint behind the gutter.
- Fix (shiplap):
  - `fascia-lower` top at 3340 with a rebate on its outer half: x −625…−612.5, y 3330–3340 removed.
  - `fascia-upper` bottom with a 10 mm lip on its outer half down to 3330 (x −625…−612.5).
  - A 3 × 3 drip kerf on the lip underside at x −621.
- Source: INFERRED.

**N7. minor · `brace`, `brace-screws-1/-2`: brace ends weak and wet; both braces lean the same way.**
- Each brace end is one 8 mm screw driven along the brace into its plumb-cut **end grain**, which is weak in withdrawal when the brace is in tension.
- The brace's upper sloped edge drains to the brace/post joints at (−900, 241) and (−1070, 285).
- Both frames (w 150 and w 750) brace in the same direction, so one racking direction puts both braces in tension.
- Fix:
  - House each brace end 10 mm into the post.
  - Use 2 × 8 mm stainless screws per end, driven **perpendicular to the brace** through its side into the post.
  - Seal the end grain and chamfer the top arris.
  - **Mirror the brace in frame w = 750**, from post-2 low (x −1070, y 195–241) to post-1 high (x −900, y 239–285). One brace is then always in compression. These are v2 coordinates; with N4 the inner faces become −925 / −1061.
- Source: SOURCED (post bases resist no rotation, SST); joinery INFERRED.

**N8. minor · `closure-screws`: screws on a plate joint.**
- At y 3062 the screws run exactly along the plate1/plate2 joint, which splits both plates and gives poor withdrawal.
- Fix: y **3072** (into plate2; still inside the closure, which spans 3043–3081).
- Source: INFERRED.

**N9. minor · `lath-screws` (and its note): bottom lath edge unfastened; wrong clause cited.**
- Add a row at **y 245**, x −91.3 → −64.1, w 64 / 470. These screws go into the strapping only, never through the flashing at x −12.
- Change the note to cite **VBBL 9.28.3.2(3)** (stucco lath fasteners 25 mm into framing) together with 9.28.4.6(2). I read these in VBBL 2019; 2025 numbering is not re-verified. 9.27.5.7 concerns cladding fasteners generally.
- Source: SOURCED (VBBL19 9.28.3.2, 9.28.4.6).

**N10. minor · `dampproof` / `fnd-xps` compatibility.**
- The damp-proofing (now carried up to 224.7) sits directly under XPS. Solvent-cutback bituminous damp-proofing dissolves polystyrene.
- Fix: add to the note: water-based (emulsion) damp-proofing, or a sheet membrane, listed as compatible with XPS.
- Source: INFERRED (manufacturer compatibility; not in my sources). Cross-ref DEFG.

---

## 4. Flags for v3 (path, planting/tree, rain garden, people, habitat)

These are not scored. A–C will have to change, or be constrained, as follows.

**F1. Roof water path.**
- The `gutter` note says "downspout piped separately to the storm sump", and the `drainpipe` note says two-pipe.
- If v3 sends roof water to a rain garden:
  - the downspout must cross the gravel strip and backfill zone (x −63 … −585.5) in a **closed pipe**, not discharge at the wall (VBBL 9.26.18.2 via 01: extension away from the building);
  - the rain garden must sit outside the foundation drain envelope. Setback still to be sourced by the v3 researcher.
- Place downspouts at bench ends (w < 90 or w > 810), never over the seat.

**F2. Path beside the bench.**
- Pier 2's outer edge (x −1215) projects 19 mm past the seat's outer edge (−1196), and the pier tops are about 190 above grade. That is a toe-catch next to a path. N4 (PX −880 / −1106, pier edge −1206) almost removes it.
- Keep a path edge ≥300 mm clear of the piers, or bring the pier tops inside the seat footprint.
- Leg zone in front of the seat: v3 to source.

**F3. Planting and roots.**
- No planting or mulch in the gravel strip (−63…−363).
- Keep tree and shrub roots off the perforated drain (centre −380.5, −399) with a setback or root barrier.
- Raised planting soil must not increase grade at the wall: the `stucco` note shows only 30 mm margin over the 200 minimum. It must also not raise grade at the piers (152 clearance).

**F4. Animals and insects.**
- **New exposure:** the foundation XPS is foam in the ground and at grade, and carpenter ants and rodents tunnel in foam in coastal BC (INFERRED; v3 to source).
  - The top of the foam is closed by the flashing (N1). The below-grade face sits in drain rock.
  - Consider insect-resistant (borate-treated) EPS or mineral-wool board below grade, and a stainless mesh return at the parging bottom (−149.5).
- The insect screens at the cavity base and top and the soffit are already in place ✓.
- Habitat boxes must not be fixed through the stucco/WRB without flashed blocking.

**F5. People.**
- The base-flashing drip is at 207 mm height and 65 mm proud of the parging, an unhemmed 45° edge at ankle height (06 A.6 chose no hem).
- If a path runs along the wall: keep it beyond the 300 gravel strip, or use a hemmed drip there.
- Bench seat 420 (≈460 above grade); seat edges as in N4.

**F6. Grade change over decades.**
- Path build-ups, mulch and soil creep at the wall eat into the 30 mm stucco margin and the 300 → 152 clearances.
- v3 surfaces adjoining the gravel strip should be set **at or below** y = G(x).
