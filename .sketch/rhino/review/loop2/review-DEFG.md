# Review loop 2 — junctions D, E, F, G (detail01 v2)

Reviewer: author of `research/07-junction-details-ground-wall.md` (07).

Inputs read:
- `detail01.mjs` (v2)
- `review/loop2/packet-v2/report.md`, including its parts table and Drawing notes
- packet-v2 section and label captures for A, D, E, F and G

Rhino was not opened.

Conventions:
- **Datum:** your datum. x = 0 at the foundation's exterior face, exterior negative. y = 0 at finished grade at the wall face, with `X0 = −63` (the parging face). w runs along the wall. Millimetres.
- **Source tags:** SOURCED / INFERRED as in loop 1.

**Severity count for new findings: 0 blockers, 0 majors, 11 minors.** That is 6 detail findings (N1–N6) plus 5 flags where v3 forces a change in D–G (V1–V5). One open question (Q1) is not scored.

---

## 1. Status of loop-1 items

| item | v2 change | status | comment |
|---|---|---|---|
| E1 poly lap and seal | `vpoly` laps 104 onto `soilgas`; `seal-floor` and `seal-sill` added; `edge-cap` clamps the lap | **fixed** | Meets VBBL 9.25.3.3.(2): sealed **and** ≥ 100 lapped and clamped (SOURCED). |
| E2 floor-edge cap | `edge-cap` 12 fibre-cement, x 154–295, adhered | **fixed (follow-up N2)** | Adhesive will not hold reliably on polyethylene. |
| E3 backing between straps | `line-wire` Ø1.2 at 150; paper, lath and stucco moved out 1.2 | **fixed** | — |
| E4 strap screws | Every 300 from y 375 (+2950); `ei` ≥ 128 kg/m³; engineer note | **fixed** | Matches CMHC 300 (SOURCED) and the RDH13 rigidity threshold (SOURCED). |
| E5 slab perimeter sealant | 6 × 6 reglet + sealant | **fixed** | Now hidden under `edge-cap`. Renew it when flooring is replaced (INFERRED). |
| E6 anchor seal | `anchor-seal` collar | **fixed** | — |
| E7 rock sliver | Rock top −150 | **fixed (follow-up N6)** | The sliver has moved to the backfill (N6). |
| E8 trench undercut | −450 to x −300, then −505 | **fixed** | Pipe edge at −325.5 is outside the step ✓. |
| E9 drain fall / cleanouts | Note | **fixed** | — |
| E10 lath fasteners | `lath-screws` at 150 with washers + note | **partly** | They stop 1 mm short of passing through the strap (N4). |
| E11 control joints | Note on `stucco` | **fixed** | — |
| E12 radon note | Note on `granular` | **fixed** | — |
| E13 parging lap at grade | Superseded by D1 | **fixed (superseded)** | Parging on lath now runs 150 below grade, covering the damp-proofing top. |
| E14 poly sequence | Note on `soilgas` | **fixed** | — |
| E15 EPDM turn-down | EPDM turned 40 down at x −1..0, y 260–301 | **fixed (follow-up N1)** | The void behind the flashing leg is new (N1). |
| D1 exterior foundation insulation | `fnd-xps` 50 + `parging` 12 on lath + anchors; damp-proofing behind; clips removed | **fixed (accepted)** | Thermal line is now `ei` → flashing leg (≤ 13 mm gap) → `fnd-xps` → footing ✓. Follow-ups N1, N5, Q1. |
| D2 membrane under gravel | Declined | **declined — accepted** | The drain is sized for the water, and your stake/discharge objection is valid. The ageing model must treat the strip as admitting water to the rock envelope every storm (07 F.3). See N6 for the geometry that makes this explicit. |
| D3 stucco 25 | 25 overall, 18 over lath | **fixed** | ≥ 15 over lath (SOURCED, 9.28.6.2) with 3 mm tolerance. |
| D4 clearance note | Note on `stucco` | **fixed** | — |
| Answer 0: damp-proofing label | Relabelled "not code-required; best practice", runs behind the XPS | **fixed** | — |

**Checks re-run on v2:**

| check | v2 result | requirement / source |
|---|---|---|
| Slab assembly RSI | 2.86 (INFERRED) | ≥ 2.45 (SOURCED) |
| Wall RSI | ≈ 4.3 (INFERRED) | ≥ 3.85 (SOURCED) |
| Furring coverage | 16 % | ≤ 20 % (SOURCED) |
| Cavity / fire blocks | 19 mm, so 9.10.16.2.(2)(a) still exempts it | SOURCED |
| Stucco clearance | +230 | ≥ 200 (SOURCED) |
| Wood clearance | +304 | ≥ 150 (SOURCED) |
| Foundation above grade | 300 | ≥ 150 (SOURCED) |
| Insulation protection above grade | 12 mm cement parging on wire lath | 9.25.2.3.(6) (SOURCED) |
| Drain | Ø ≥ 100; rock cover 194 on top, 150 on sides; rock over the footing projection now 49 | SOURCED / INFERRED |
| Lath fastener spacing | 150 v at 400 h | 9.28.4.6.(2)(a) (SOURCED) |

**Control-layer pen test (v2):**
- **Water shedding, drainage and capillary breaks:** unchanged from loop 1 except at the new void (N1).
- **Air / soil-gas:** `soilgas` → `seal-floor` → `vpoly` (104 lap, clamped by `edge-cap`) → `seal-sill` → `vpoly` → `seal-plate` (B). Continuous ✓.
- **Thermal:** `batts` + `ei` → sloped flashing leg (the 7–13 mm gap holds `screen-base`) → `fnd-xps` → footing top. Inside: `edge-xps` + `xps-a/b`. The only uninsulated pocket left is the void in N1.

---

## 2. New findings (detail)

### N1 — minor — `flash`, `fnd-xps`, `epdm`, `dampproof`: the void behind the flashing's vertical leg is unfilled and has a flat floor
- **Where:** between the flashing leg (x ≈ −12.3) and the foundation face (x = −1 / 0), from the XPS top at y 224.7 up to the gasket line at 301. That is a 12 × 76 mm air pocket (see the A-base v2 capture).
- **Thermal:** the top 76 mm of the stem's outer face, including the concrete between the damp-proofing top (224.7) and the EPDM turn-down (260), faces only an air gap and 0.6 mm of steel. That is a residual thermal bridge at the plate line (INFERRED).
- **Water:** the pocket's floor is the flat XPS top, `[[−1, 224.7], [−12, 224.7]]`. Any water that gets behind the flashing (sill-joint leak, flashing-nail holes at y 330) ponds against bare concrete with no exit (INFERRED).
- **Fix (pick one; coordinate with the junction A reviewer):**
  - (a) Fill the pocket with closed-cell spray foam or an XPS strip: x −12 → −1, y 224.7 → 260, and x −12 → −1.5, y 260 → 300 against the EPDM. This removes both the void and the reservoir.
  - (b) Keep it drained: cut the `fnd-xps` top to fall 10 % outward under the leg, from (−1, 226.0) to (−12, 224.7), and run the EPDM turn-down to the XPS top, `[−0.5, 260] → [−0.5, 225.5]`, so water sheds onto the flashing's sloped leg.
- **Sources:** INFERRED. (a) is simpler and thermally better.

### N2 — minor — `edge-cap`: "adhered" does not hold on polyethylene
- **What's wrong:** from x 154 to 275 the cap sits on `vpoly` and `soilgas` (polyethylene). Construction adhesives bond poorly to PE (INFERRED). Only x 281–295 is on concrete.
- **Fix:** fix the outer edge mechanically into the slab with concrete screws at x = 288, 400 o.c. along w, embedded ≤ 40 mm. The slab is 100 mm with the barrier at its underside (y 199.875), so the screws stay ≥ 60 mm clear of it. Hold the inner edge (x 154–165) down with the baseboard, which is nailed into the sill/studs, not the floor. No fasteners between x 141 and 281.
- **Sources:** INFERRED; the keep-the-barrier-intact rule is SOURCED (CGSB 7.1.4.5.9).

### N3 — minor — `edging`: anchorage regressed in v2
- **What's wrong:** the edging bottom is at −145, only 5 mm below the gravel bed at the edging (SB(−363) = −140). In v1 it was embedded 45 mm. The topsoil side gives little restraint, and frost and foot traffic will push it out over the decades (INFERRED).
- **Fix:** set the `edging` bottom at y = −200, i.e. `R(ED_OUT, −200, GR_OUT − 0.5, G(−366))`, and note "staked at ≤ 900 o.c." (or add `edging-stakes`: rods Ø10, axis y, x −366, w [150, 750], y −300 → −20).
- **Sources:** INFERRED.

### N4 — minor — `lath-screws`: stop 1 mm short of passing through the strap
- **What's wrong:** the screws run from x −91.3 to −64.1. The strap is −82.1 to −63.1, so 18 of 19 mm is engaged. Your drawing note invokes 9.27.5.7.(3), which accepts fasteners that "penetrate through the nail-holding base" (SOURCED).
- **Fix:** `to: EI + 0.5` (= −62.6), so the screw tip just passes the strap into the mineral wool. Keep the 150 spacing and washers.
- **Sources:** SOURCED clause; dimension INFERRED.

### N5 — minor — `parging-anchors`, `parging-lath` below grade
- **What's wrong:**
  - The lower anchor row at y −60 punctures the damp-proofing in the permanently wet backfill zone.
  - Galvanized lath buried to −150 against drain rock and backfill will corrode first at its lowest edge (INFERRED).
  - VBBL only requires protection where insulation is "exposed to the weather and subject to mechanical damage" (SOURCED, 9.25.2.3.(6)).
- **Fix:**
  - Move the lower anchor row to y = +40 (above grade), giving rows at +40 and +160.
  - Make the below-grade part of the lath stainless or alkali-resistant glass mesh.
  - Alternatively stop the parging and lath at y = −50 instead of −149.5, with backfill protecting the XPS below.
  - If an anchor must go below grade, seal it through the damp-proofing (SOURCED 9.13.2.4.(3): joints and penetrations sealed).
- **Sources:** mixed, as marked.

### N6 — minor — `backfill`: unbuildable sliver between the gravel bed and the rock
- **What's wrong:** under the strip, `backfill` is 25 mm thick at X0 (bed −125 over rock top −150) and 10 mm at the edging (−140 over −150). A 10–25 mm layer of backfill can't be placed or compacted (INFERRED). It is the same issue as the old rock sliver.
- **Fix (either):**
  - (a) Raise `rock` top to −140 for x −51 → −363, so `geo-gravel` lies directly on the rock `geotextile`. This makes explicit that strip water goes to the drain (D2 accepted).
  - (b) Lower `ROCK_TOP` to −200 and keep ≥ 60 mm of backfill. Cover over the pipe becomes 144, under 150 (SOURCED minimum), so the pipe would need lowering. Not recommended.
- **Sources:** INFERRED.

### Q1 — open question (not scored) — stem-wall RSI
- If the City applies the VBBL "Foundation walls RSI 3.85" row (SOURCED, V1 Table 10.2.2.6) to the 300 mm above-grade stem bounding the slab edge, `fnd-xps` would need about 111 mm of XPS (INFERRED: (3.85 − 0.08 concrete − 0.03 air film) / 0.0336 per mm, values SOURCED BCBC A-9.36.2.4.(1)-D), not 50.
- This is still 07 open question 1. Ask City of Vancouver energy staff before v3 freezes the stem thickness.

---

## 3. v3 interface flags: what in D–G must change for the 6 m / 2.5 m section

### V1 — minor — tree and shrub roots vs `drainpipe`, `rock`
- **What's wrong:** roots enter drains mainly at existing joints and cracks, and the risk grows with drain age and vigorous woody planting nearby (SOURCED, 04 ev.eco.25). A perforated drain in clean stone is a wet, aerated root target.
- **D–G changes:**
  - Specify rigid PVC with solvent-welded joints (no butt joints) for the perimeter drain, and solid (non-perforated) pipe from the building corner to the sump (INFERRED).
  - Keep woody planting out of the drain envelope (x > −600, i.e. the rock out to −585.5 plus margin) (INFERRED).
  - On clay soils, keep trees about their mature height from the foundation (SOURCED principle, 04 ev.eco.26/.27). No setback number was found for Vancouver's non-clay soils, so the planting researcher should carry it as INFERRED.
  - Add a cleanout at each end so roots can be cut (INFERRED).

### V2 — minor — rain garden / infiltration vs foundation drainage
- **What's wrong:** VBBL Note A-9.14.5.3.(2) sets infiltration systems (rain gardens, soak-aways, swales) ≥ 5 m from buildings, with an overflow (SOURCED, V2 pdf pp.620–621). This takes precedence over the 3 m CNV value in 04 ev.eco.28.
- **D–G changes:**
  - Any rain garden must start at x ≤ −5000. That measures from the foundation face; −5063 if measured from the parging face, which is the conservative choice.
  - Its overflow must not discharge onto the gravel strip or into the perimeter-drain envelope.
  - Downspouts stay on the separate solid storm pipe (two-pipe, `gutter` note) or run solid to the rain garden beyond 5 m.
  - The perimeter drain must not outlet into the rain garden (INFERRED).

### V3 — minor — path vs gravel strip
- **What's wrong:** a hard path changes the clearance datum and increases splash (illustrative, 03).
- **D–G changes:**
  - Keep the path's inner edge outside the edging (x ≤ −368.5).
  - Path surface no higher than the grade line at the edging (≤ −15).
  - Path slopes ≥ 2 % away (SOURCED: IRC R401.3 impervious value, US; INFERRED for Vancouver).
  - Use a permeable or outward-sloped path sub-base so it doesn't dam the strip's drainage.
  - If the path is ever laid against the wall instead of the strip, its top becomes "finished ground", and stucco +230 must stay ≥ 200 above it (SOURCED 9.28.1.4). So the path top at the wall must be ≤ +30.

### V4 — minor — interior floor finish over the slab
- **What's wrong:** the finish meets the 12 mm `edge-cap` (top 313.4).
- **D–G changes:**
  - Make the finish thickness 12 mm, matching the cap top, or recess the cap.
  - No floor fastener deeper than 40 mm into the 100 mm slab, to keep clear of `soilgas` at its underside (INFERRED).
  - Moisture-test the slab before installing wood or resilient floors, because it can only dry upward on poly (SOURCED, VBBL Note A-9.25.3.6.(2)(3) on bleed water; 07 D.2(a)).
  - Baseboard fixed to the wall, not the floor (ties to N2).

### V5 — minor — insects and animals at the foam insulation (`fnd-xps`, `edge-xps`)
- **What's wrong:** carpenter ants can nest in foam insulation, and BC guidance flags wood and vegetation contact at the base as entry routes (SOURCED, 04 ev.eco.22/.23, PNW handbook).
- **D–G changes:**
  - Keep `fnd-xps` fully covered: parging on lath above grade ✓; below grade its face is open to the drain rock.
  - Note "no wood, mulch or bark in the gravel strip; planting not touching the parging" (SOURCED, BC carpenter-ant guidance).
  - Consider borate-treated EPS or rigid mineral wool below grade. RDH13 4.8 recommends this in termite zones (SOURCED). Vancouver is not designated a termite locality (01 U5), so it is optional here.
  - Keep insect screens at both cavity vents ✓.

---

## 4. Nothing else changed in D–G that I'd dispute

The v2 changes outside the items above are consistent with 07: the X0 = −63 grade datum, the 300-wide strip starting at the parging face, topsoil 100, and damp-proofing behind the XPS.
