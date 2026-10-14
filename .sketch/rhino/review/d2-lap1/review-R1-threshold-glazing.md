# Review R1: threshold and glazing envelope (Detail 02, lap 1)

**Reviewer:** R1. **Scope:** junction T (threshold), junction H (head) and the eave edge R where it meets the head.
**Inputs:** `detail02.mjs` and `detail02.json` (d2v1); `review/d2-lap0/report.md` and `metrics.md`; the lap-0 PNGs for T, H, F and S; `exterior-eye.png`.
**Research checked:** 11 (primary), 12 §1.4 / §3.4–3.5 / §6.1–6.5, 06 B, 01 (`req.flashing-*`, `req.cavity-*`), 03 (overhang, drips), 08b M.
**New source read this session:** Owens Corning *FOAMGLAS PERINSUL SIB Product Data Sheet*, Jan 2023 (owenscorning.com/dms/10025278), tagged **OC-SIB**. Armatherm 500 data comes from search summaries only (ARCAT/Barbour listings), tagged **(S\*)**.
**Datum:** used throughout. x = 0 at the frame's exterior face, **exterior negative**; y = 0 at FFL; mm.
**Note on 11:** research 11 uses outward-positive x. Its values are converted here.

---

## 1. Score: **5 / 10** for threshold + glazing performance and buildability

The concept is right and well sourced:
- The threshold is drained, with the water level held well below the walking surface.
- The rise is 13 mm with a 1:2 bevel; the grate sits at −8 with heel-safe slots parallel to the door.
- A thermal-break course sits on an engineered grade beam, with 81 mm overlap to the under-slab EPS.
- The landing is lined, and the channel discharges to the rain garden rather than the footing drain.
- The head has an 84 mm flashing upstand with a 70/70 strip-in, a drained and screened band cavity, a cavity top closed to the soffit, and a mandatory gutter.

What holds the score back is how the threshold is assembled:
- **The sill pan has no outlet.** Its open front faces the channel's solid house-side wall, 60 mm higher. The 50 mm downturn dumps any pan water into the backfill at the beam/XPS joint.
- **Two air-barrier breaks.**
  - At the sill there is only grout between the pan/poly and the track.
  - At the head nothing connects the frame to the lintel or the head membrane.
- **The thermal line is bypassed in two places.**
  - The slab is poured straight against the cold slot grout, with no slot-edge strip.
  - There is a 19 mm uninsulated void at soffit level between `band-ei` and `ei-top`.
- **The lintel is about 4× too flexible** for the 3 mm limit (12.6 mm under snow alone) and timber creep adds more. Its drawn 266 mm depth therefore understates the head band.
- **The specified thermal-break block is a UK product.** The North American PERINSUL SIB is only 92 mm wide and is listed only for masonry veneer.
- **Head-band RSI is short of target** (3.63 vs 3.85).

None of these is hard to fix, but the blocker and three of the majors would cause real leaks, drafts or cold floors. That is why the score is 5 and not 7.

---

## 2. Control-layer pen test, part by part, as modelled

### 2.1 Threshold (T)

| layer | path through the modelled parts | breaks (→ finding) |
|---|---|---|
| Water shedding | glass → `sash` (rail bottom +10) → `track` top +5 → `nosing` 1:2 bevel (+5 → −8, x 0 → −26) → 5.5 mm slot → `grate` (−8) → `grate-screen` → `channel` (invert −120) → outlet. `pavers-lined` fall 2 % away. | The 5.5 mm slot between the nosing (x −26) and the grate (x −31.5) lands on the channel wall top at −20: a 12 mm-deep blind trough at the walking edge (**F1**). |
| Drainage plane (secondary) | track chambers → `track-weeps` (y −61..−49) → channel. Leakage past the track → grout/pan interface → `pan` (5.98 %) → open slot front at x −20 → **channel inner wall, top −20** → pan downturn −81 → −131 → soil sliver over `beam-xps`. | **Pan outlet blocked; it discharges to the foundation backfill; no lap to `dampproof` (gap −131..−181)** (**F1**). Weep tubes are flat and not connected to the track's drain outlets (**F12**). |
| Air | room → `slab` → `soilgas` poly → upturn at x 231.1 to −15 → `pan` back dam (−66..−15) → **grout** → `track` → gaskets | Only 51 mm overlap, and a liquid membrane on PE (**F3**). **No seal from the pan/poly to the track: grout is the only link** (**F2**). |
| Soil gas | `stone` → beam/EPS joint → poly (sealed) → pan (end dams outside the slice) | Holds only if F3 is fixed (lap ≥ 100 mm, compatible bond). |
| Vapour | poly under the slab; the polished slab dries upward; the grout dries to the room | OK. |
| Thermal | `eps-1`/`eps-2` → `perinsul` (81 mm overlap ✓) → `beam-xps` (corner contact at (−20, −181) ✓) | **The slab edge (x 231.25, y −100..0) is cast against the wedge and grout, which reach the open, exterior-exposed slot face at x 0.** About 230 mm of concrete bypasses the course (**F4**). |
| Capillary | stone ✓, cellular glass ✓, pan ✓ | The wedge feathers to 0 mm at x −20 (**F3**). |
| Support | sash → track → grout/shims → wedge → pan → course → beam ✓ | The nosing bears 4.5 mm on the channel wall, which couples the track to the channel. The channel sits on a 35 mm haunch on 16 mm of native soil over XPS (**F13**). Course product and acceptance (**F9**). |

### 2.2 Head (H) and eave edge (R)

| layer | path | breaks |
|---|---|---|
| Water shedding | roof → `edge-metal` → `gutter` ✓. Wind-blown rain under the soffit → `frieze` / `band-cedar` → `head-flashing` drip at (−98.6, 2734) | Flashing slope 5.94 % (< 6 %). No ≥ 10 mm lap over the element below. 118 mm leg unsupported (**F10**). |
| Drainage plane | band cavity (strap zone x −70.6..−51.6) → `band-screen` → flashing. `head-membrane` (x 24.75) → `head-stripin` (2760–2900, laps 70/70 ✓) over the upstand (2746–2830, 84 mm ✓) → flashing → out | `membrane-top` stops at each joist; it needs dog-ears (**F16**). |
| Air | deck `avb` → deck ply → `foam` (x 63–185) bonded to the lintel top ✓ → `lintel` → `packer` → **12 mm head gap of batt** → `head-track` | **No interior seal from frame to packer/lintel (11 H7). `head-membrane` ends at x 100 under the packer, unconnected to the frame. The gap face at x 0 is open** (**F5**). |
| Vapour | deck AVB only ✓ (no ceiling poly ✓) | The head membrane, if vapour-closed, sits on the cold face of the lintel (**F16**). |
| Thermal | polyiso / deck / `ei-top` (bays; joists bridge, accepted in 06 B.3.4) → **void y 3017–3036, x −51.6..23.4** → `band-ei` 75 → 2–7 mm air gap and a steel flashing leg crossing from behind the insulation to outside → batt → frame | **19 mm insulation void at soffit level** (**F6**). Band RSI 3.63 < 3.85 (**F8**). Flashing bridge (**F10**, **P4**). |
| Structure | joists → `lintel` 130×266 glulam | About 12.6 mm deflection under snow vs the 3 mm limit, plus creep (**F7**). |
| Fire | `foam` exposed on its underside at x 155–185 (the `ceiling` starts at x 185) | **F15**. |

---

## 3. Findings

Severity counts: **1 blocker, 8 major, 11 minor.** Fixes F1–F4, F9 and F13 interlock. The **revised threshold geometry** they add up to is tabulated after F4, so every coordinate there is consistent.

### F1 — BLOCKER — The sill pan has no outlet: it drains into the foundation backfill

**Parts:** `pan`, `channel`, `nosing`, `grate`, `grate-screen`, `haunch`, `beam-xps`, `dampproof`.

**What is wrong**
- The pan floor reaches the slot front at x −20, y −79.5 (pan top).
- There it meets the channel's house-side wall (x −31.5..−21.5), whose top is at **−20**, 60 mm higher.
- The 50 mm "downturn" (−81 → −131) is trapped in the 1.5 mm slot between `perinsul` and the channel wall. It ends on the 16 mm native-soil sliver over `beam-xps` (y −181..−165).
- So any water in the pan is fed to the beam/XPS joint and the footing, which 12 §6.4.4 forbids. The pan is also not lapped to `dampproof` (gap −131..−181; 12 R5 asks for a lap of ≥ 100 mm).
- 11 T4 requires an open-faced slot "so the pan drains out". 11 T6 requires the exterior leg (≥ 50 mm) to drop **into** the channel.
- Separately, the 5.5 mm nosing-to-grate slot sits on the wall top at −20 and forms a blind trough that collects grit and water.

**Exact fix** (see the revised geometry table)
- `channel`: lower the house-side wall top from −20 to **−92**. Poly: `[[-171.5,-8],[-171.5,-130],[-21.5,-130],[-21.5,-92],[-31.5,-92],[-31.5,-120],[-161.5,-120],[-161.5,-8]]`.
- `pan` (now rigid stainless, F3): continue the floor past the slot front at 6 % as an integral **pan nose**.
  - From (−20, −82.5) to (−38, −83.6), then a drip leg down to (−38, −103) inside the channel.
  - That is 8 mm clear over the lowered wall and 6.5 mm clear of its inner face.
- New part **`grate-seat`** (role metal, stainless, t 3).
  - Bent angle, path `[[-27.5,-10],[-27.5,-29.5],[-40,-29.5]]`.
  - Screwed through the nosing into the track's exterior web at 300 o.c., all screws above y −20.
  - The grate's house-side edge bears 8.5 mm on it. `grate-screen` is shortened to x −161.5 → −40.
  - The house-side edge of the drain is then carried by the track on the beam, not by the channel on its haunch. The rise at the nosing can no longer grow when the channel settles (see F13).
- New part **`pan-skirt`** (role water, self-adhered membrane, t 1).
  - Start it under the front 20 mm of the stainless pan at x 0 → −20, y −83.
  - Run it down the course face to y −193, jog out to x −21.5, and lap 100 mm over `dampproof` to y −293.
  - Move `beam-xps` inner face to x −22 (R(−97, −320, −22, −193)).
  - This is secondary protection of the course/beam joint (12 R5).

**Alternative.** A proprietary level-threshold channel whose house-side edge is slotted or open to receive the pan nose, for example ACO StepDrain (08b key ACO-SD). Confirm the product geometry.

**Source:** SOURCED for the requirement: 11 T4 and T6 (MAR-PS "open face slot"; LOE-INST 2 in exterior leg); 12 R5 and §6.4.4. INFERRED for the geometry.

### F2 — MAJOR — Air barrier broken between the pan/poly and the track (T)

**Parts:** `track`, `grout`, `pan`, `soilgas`, `slab`.

**What is wrong**
- The interior air and soil-gas plane runs poly → back dam (top −15) and then only through self-levelling grout to the track (x 180–229.5).
- Grout shrinks away from the track and is not an air barrier. 12 §6.5(a) names "grout-filled slot with no bead" as the weak point.
- Exterior air in the open slot front therefore reaches the room along the grout/track interface over the whole opening.
- The note's "two sealant beads under the track" have no substrate: they would sit on grout.
- 11 T13 requires two beads **plus** a continuous membrane or tape from the frame's interior flange to the back-dam side. NRC-WWI asks for the airtight plane on the interior.

**Exact fix**
- `grout`: behind the track (x 180–230.5), stop the top at **y −20**.
- New part **`sill-foil`** (role air, EPDM 1.0 mm, butyl-bonded).
  - Path `[[180.5,-2],[180.5,-20.5],[230.5,-20.5],[230.5,-45]]`.
  - Bonded 18 mm up the track's interior web, across the grout top, and 25 mm down the grout-side face of the stainless back leg.
  - Install it before grouting under the track.
- New part **`sill-apron`**.
  - Epoxy mortar on a bond breaker, or the door maker's interior floor-connection profile.
  - R(181, −20, 231, 0), top flush with FFL.
- Keep the A440.4 two beads between the track bridges and the pan-nose flange if the maker requires them. They are no longer the only seal.

**Source:** SOURCED: 11 T13 (A440.4-98 6.7.2.4 via RDH-WPR; NRC-WWI); 12 §6.5(a) and R13. INFERRED for the geometry.

### F3 — MAJOR — Pan back dam and poly lap: unbuildable order, incompatible bond, 51 mm lap, feathered wedge

**Parts:** `pan`, `soilgas`, `wedge`, `slab`, `perinsul`, `beam`.

**What is wrong**
- **The order cannot be built.** The liquid-applied back dam (x 229.5–231, y −66..−15) has nothing to be applied on until the slab exists. After the pour it can only go over the poly upturn, and PMMA or silicone liquid flashings do not bond to polyethylene.
- **The lap is short.** Overlap is 51 mm (−66..−15) against ≥ 100 mm with butyl tape (11 T7; 12 R9).
- **The wedge is a triangle feathered to 0 mm at x −20.** It cannot be placed, and it crumbles under the pan turn.
- **Two minor shortfalls.** The slope is 5.98 % (< 6 %), and the shim space at the back is 22.5 mm (< 25 mm, MAR).

**Exact fix**
- **`pan` → rigid welded 0.8 mm type 316 stainless pan.** 11 T6 and MAR-BF allow rigid pans. Welded end dams rise 150 mm up the jambs.
- **Back leg on the back face of the course:** x 231.0–231.8, y **−110 → −15**.
- **Floor** from (231, −67.4) to (−20, −82.5), then the nose (F1).
- **Lower the course and wedge 12 mm so the wedge has a real front edge:**
  - `perinsul` → R(−20, −193, 231, −93).
  - `beam` stem top −181 → **−193** (footing unchanged).
  - `dampproof` y −193..−320.
  - `wedge` → `[[-20,-93],[231,-93],[231,-67.8],[-20,-82.9]]`: 6.02 %, 10 mm at the front, 25 mm at the back.
  - Pan top at the back becomes −67, which gives the MAR 25 mm shim space under the track bottom (−42).
- **`soilgas`:** turn the poly up the interior face of the stainless back leg, path `[[2500,-100.125],[231.925,-100.125],[231.925,-15]]`.
  - Bond it with two rows of butyl tape from −100 to −15: 85 mm on steel plus the tape onto the poly below the leg, at least 100 mm in total.
  - Shift `eps-1`/`eps-2` to start at x 232.05.
- **Sequence:**
  1. beam, dampproof, `beam-xps`;
  2. course in a mortar bed;
  3. wedge;
  4. stainless pan set in sealant, then `pan-skirt`;
  5. stone, EPS, poly taped to the back leg;
  6. slot-edge strip (F4);
  7. slab pour;
  8. haunch and channel;
  9. track on shims, weeps, `sill-foil`;
  10. grout;
  11. `sill-apron`, `grate-seat`, grate, pavers.

**Source:** SOURCED for the requirements: 11 T4, T6, T7, T10; 12 R9; MAR 25 mm shim and 67 mm recess (12 §3.5). INFERRED: the PE-adhesion statement (general product practice, check the chosen membrane's data sheet) and the geometry.

### F4 — MAJOR — Slab-edge thermal bypass around the course

**Parts:** `slab`, `grout`, `wedge`, `soilgas`, `perinsul`.

**What is wrong**
- `slab` (x ≥ 231.25, y −100..0) is cast directly against the wedge and grout, with only membranes between them.
- The grout fills x 0–229.5 up to FFL. Its front face at x 0 (y −78..−42) is exposed to exterior air in the open slot.
- So about 230 mm of concrete runs from the warm slab edge to the exterior, above the course. The course breaks only the downward path.
- 11 T5 asks for slab-edge XPS lining the slot's inner face. 12 R10 asks for a 25 mm XPS strip between the slab edge and the slot ("around edge of slab", V1 Table 10.2.2.6). The model has neither.
- Expect a cold strip on the interior floor at the sill. That is the Marvin frost and condensation warning (11 §5.4, S).

**Exact fix**
- New part **`slot-edge`**: XPS-HFO 25, R(**232.05, −100, 257.05, −15**), standing on the EPS.
- Plus a polyurethane traffic-sealant cap on backer rod, R(231, −15, 257.05, 0). A walkable dense PU strip (Armatherm/Purenit class) full height to 0 is an alternative.
- `slab` → R(**257.3**, −100, 2500, 0).
- **Request a THERM run of T with F1–F4 applied** (11 Q4; 12 Q4). If interior f_Rsi at the sill is below 0.70, add P6.

**Source:** SOURCED: 11 T5; 12 R10, §6.2; V1 Table 10.2.2.6 (via 12); MAR frost note. INFERRED: the bypass magnitude, pending THERM.

#### Revised threshold geometry (F1–F4, F9, F13 combined; mm)

| part | new geometry |
|---|---|
| `beam` | stem x −20..231, top **−193**; footing unchanged |
| `dampproof` | x −20.5, y −193 → −320 |
| `beam-xps` | R(−97, −320, −22, −193) |
| `perinsul` (course, product per F9) | R(−20, −193, 231, −93) |
| `wedge` | `[[-20,-93],[231,-93],[231,-67.8],[-20,-82.9]]` |
| `pan` | stainless 0.8, welded. Back leg x 231.4 (y −110 → −15). Floor (231, −67.4) → (−20, −82.5). Nose → (−38, −83.6) → (−38, −103) |
| `pan-skirt` | SA membrane under the pan front: (0, −83) → (−20, −83) → (−20.5, −193) → (−21.5, −194) → (−21.5, −293) |
| `soilgas` | `[[2500,-100.125],[231.925,-100.125],[231.925,-15]]`, butyl-taped to the back leg |
| `eps-1`, `eps-2` | start at x 232.05 |
| `slot-edge` + cap | R(232.05, −100, 257.05, −15) + sealant R(231, −15, 257.05, 0) |
| `slab` | R(257.3, −100, 2500, 0) |
| `track` | unchanged (0..180, −42..+5). Shims 25 mm (back) to 40 mm (front) |
| `grout` | under the track, pan → −42, front face x 0. Behind the track: pan → **−20** |
| `sill-foil` | `[[180.5,-2],[180.5,-20.5],[230.5,-20.5],[230.5,-45]]` |
| `sill-apron` | R(181, −20, 231, 0) |
| `channel` | house-side wall top −92 (F1); outer wall top −6 (F13) |
| `haunch` | R(−171.5, −193, −22, −130), on `beam-xps` (x ≥ −97) and compacted 19 mm clear crushed beyond; no native soil |
| `nosing` | `[[0,5],[-22,-6],[-26,-6],[-26,-20],[0,-20]]` (F13) |
| `grate-seat` | `[[-27.5,-10],[-27.5,-27.5],[-40,-27.5]]` (ledge raised 2 mm for the −6 grate) |
| `grate` | R(−161.5, −26, −31.5, −6) |
| `track-weeps` | from (40, −55) to (−40, −56.6) (2 % fall); risers to the track's drain outlets (F12) |

### F5 — MAJOR — Air barrier broken at the head: no frame-to-lintel seal, gap open at x 0

**Parts:** `head-gap`, `head-membrane`, `head-track`, `packer`, `lintel`.

**What is wrong**
- 11 H7 (interior air seal from frame to lintel) and H8 (interior cap) are not modelled.
- `head-membrane` turns under the packer only to x 100 and is not connected to the frame.
- The only element between the frame and the rough opening is 12 mm of compressible batt, which is air-permeable, along the full 5 m. Its exterior face at x 0 is open under the flashing (y 2730–2744.5) to wind-washing and insects.
- The air barrier at the head is therefore discontinuous on both the interior and exterior routes.

**Exact fix**
- **`head-gap` → split in two:**
  - **`head-gap-tape`:** pre-compressed multifunction (three-zone) window tape, R(0, 2730, 60, 2742). For example illbruck TP652 or an equivalent sold in Canada (INFERRED; check the working range for 12 mm ± 3 mm).
  - **`head-gap`:** comfortbatt R(60, 2730, 150, 2742).
- **`head-membrane`:** extend the underside leg to x 150, path `[[24.75,3036],[24.75,2742.25],[150,2742.25]]`.
- New part **`head-airseal`** (role air): vapour-retarding airtight tape, path `[[178,2730.25],[155.25,2730.25],[155.25,2810]]`.
  - It runs from the head-track top up the packer and lintel interior faces.
  - It covers the packer/lintel joint at 2770 and folds across the 12.5 mm gap.
- New part **`head-trim`:** U-cap fixed to the lintel interior face, x 155–175, y 2735–2800.
  - It stays 5 mm clear of the head track, with a soft joint so it can take 3 mm of deflection (LOE-INST, 11 H8).

**Source:** SOURCED: 11 H4, H6, H7, H8 (LOE-INST: no expanding foam; cap not touching the head track). INFERRED: the tape product and the geometry.

### F6 — MAJOR — 19 mm uninsulated void at soffit level

**Parts:** `band-ei`, `ei-top`, `soffit`.

**What is wrong**
- `band-ei` stops at y **3017** (the soffit underside).
- `ei-top` starts at **3036** (the lintel top).
- The soffit ends at x −52.1.
- That leaves a continuous void x −51.6..23.4, y 3017–3036 against the lintel's exterior top corner: a 19 mm gap across the whole insulation layer. It is visible in `H-head-section-labels.png` as a grey slot left of the lintel top.

**Exact fix:** `band-ei` → R(EI_OUT, 2748, EI_IN, **LINT1 = 3036**). It then meets `ei-top` and fills behind the soffit end. The soffit stays at x ≤ EI_OUT − 0.5.

**Source:** INFERRED (geometry). SOURCED principle: 11 H9 aligns the lintel insulation with the roof insulation line; 06 B6 and B.3.4 close the wall-line plane.

### F7 — MAJOR — Lintel 130×266 glulam is about 4× too flexible for ≤ 3 mm, and timber creep is not addressed

**Parts:** `lintel`, `packer`, `head-track`; band geometry H.

**What is wrong.** Check below (INFERRED; the engineer confirms).
- **Assumptions:**
  - Span 5.0 m.
  - Interior roof span 4.0 m (assumed) plus the 0.6 m cantilever, giving a tributary width of 2.65 m.
  - Vancouver snow Ss 1.8 / Sr 0.2 kPa (NBC Appendix C value from memory, not in research; verify). Serviceability S = 0.9 × (1.8 × 0.8 + 0.2) = 1.48 kPa.
  - Glulam E = 12,400 MPa.
- **Snow alone:** the line load is w = 3.9 N/mm, giving Δ = **12.6 mm**.
  - The limit is ≤ 3 mm under superimposed load (MAR, LOE-INST; 11 H1, S).
  - About 4.2× the stiffness is needed: EI ≥ 1.06 × 10¹³ N·mm².
- **Dead load:**
  - Saturated extensive green roof (about 1.3 kPa) plus roof (about 0.6 kPa): about 5.0 N/mm.
  - That is 16 mm elastic on the drawn beam.
  - Timber creep (about 50–100 % of dead deflection) continues after the panels are set and eats the panel-to-track clearance (11 §5.2: panels bind, gaskets crush).
- **Look:** the drawn depth also understates the head band. A glulam that meets the limit is about 430–460 mm deep, which adds about 190 mm to the 287 mm soffit-to-frame band, or takes it off the glass height.

**Exact fix.** Choose one; the spec carries the choice and the band follows (F8):
- **(a) Recommended: steel W250×39** (d 252, bf 147, I 60.1 × 10⁶ mm⁴).
  - Δ_snow ≈ **2.6 mm**, with no creep.
  - It fits the drawn depth:
    - `lintel` → steel R(8, 2761.5, 155, 3013.5);
    - `packer` → PT 19 R(8, 2742.5, 155, 2761.5), bolted to the bottom flange, giving the flat screw surface of 11 H3;
    - new `lintel-nailer` PT R(8, 3013.5, 155, 3036) for joist bearing and toe-nails.
  - `head-membrane`, `membrane-top` and `blocking` move to the new exterior face x 7.75. That moves `EI_IN` to about 6.4.
  - Band insulation 130 mm (F8). Cost: carbon (P3).
- **(b) Glulam 175×456** (24f-EX): Δ_snow ≈ 1.9 mm, dead-load elastic ≈ 2.4 mm before glazing.
  - Creep must stay ≤ 1 mm after install, or the head track must be field-adjustable.
  - `lintel` → R(−10, 2580, 165, 3036) (wider to the exterior). The frame head drops by 190 mm, or the roof rises 190 mm.
- Either way, keep the note: *Δ ≤ 3 mm under superimposed load after dead load and long-term creep (MAR)*. Add "check after the green roof is saturated".

**Source:** SOURCED: 3 mm limit (11 H1; MAR-ULS, LOE-INST). INFERRED: loads, sizes and the calculation.

### F8 — MAJOR — Head band RSI 3.63 < 3.85 target; the metric also counts the vented cladding

**Parts:** `band-ei`, `band-strap`, `band-cedar`, `band-closure`, `band-vent`, `frieze`, `head-flashing`; `assemblies` in the mjs.

**What is wrong**
- With 75 mm stone wool the band is 3.63, or **3.53** if the vented cedar is excluded and Rse = 0.12 is used. That is 3.35 with the 5 % strapping-screw penalty (07, RDH13 S).
- The target is 3.85, the VBBL walls value carried as the target in 09.

**Exact fix (glulam lintel)**
- `band-ei` thickness **100 mm** gives 4.26 vented, or **4.04 with the 0.95 derate** ✓.
- Set `EI_OUT = EI_IN − 100` (= −76.6), so `STRAP_OUT` = −95.6, `CEDAR` = −114.6 and `frieze` = x −140.6..−121.6.
- `soffit` and `ei-top` follow EI_OUT automatically.
- `head-flashing` per F10.

**Exact fix (steel lintel, F7a)**
- Steel gives no resistance, so 130 mm is needed: 4.03, or 3.83 derated, which is marginal. Use **130 mm**, with EI_IN ≈ 6.4, EI_OUT ≈ −123.6 and CEDAR ≈ −161.6.
- `head-flashing` outer point moves to x ≈ −165.6 at the same 6 % fall.

**Metric.** In `assemblies`, use films [0.12, 0.12], drop the cedar layer and add `derate: 0.95`.

**Source:** SOURCED: target 3.85 (09, V1 Table 10.2.2.6 via 07/09); 75 mm penalty logic (07, RDH13). INFERRED: the calculations (metrics.mjs method, k from materials.json).

### F9 — MAJOR — The thermal-break course is a UK product; the North American version does not fit as drawn

**Parts:** `perinsul`; `metrics`.

**What is wrong**
- The model specifies FOAMGLAS PERINSUL **HL**, 100 × 251 (UK data, 12 PER).
- The North American product is **PERINSUL SIB** (OC-SIB, S):
  - Blocks are only **92 mm (3.63 in) wide**, 57/70/92 mm thick and 450 mm long.
  - Minimum compressive strength 2100 kPa (capped); RSI 0.42 per 25.4 mm (λ ≈ 0.060); density 170 kg/m³.
  - The sheet lists it **only for masonry veneer** and **not for load-bearing masonry walls**.
  - It must be loaded evenly, with no cantilever or point loads, and must not be drilled.
  - Exposed edges need protection against freeze-thaw.
- A lift-and-slide sill is a line load with roller point loads. The SIB is therefore outside its listed use and needs engineered acceptance (12 Q6 confirmed open).
- The part is also labelled `mat: graphite-eps`. Metrics count it at about 1.2 kgCO₂e/m, against **≈ 9.8 kgCO₂e/m** as cellular glass (09 FOAMGLAS 22.7 kgCO₂e per m²·RSI × RSI 1.72 × 0.251 m², I).

**Exact fix.** Choose one:
- **(a)** Three rows of SIB "economy" 92 × 92, with the inner row saw-cut to 67, giving 251 × 92: R(−20, −185, 231, −93).
  - The beam stem top goes to −185 instead of −193.
  - Fully mortar-bedded, with the top capped by the wedge and stainless pan so roller loads spread.
  - Engineer's acceptance required, because the product is listed for veneer only.
- **(b) Preferred for buildability:** a one-piece high-density polyurethane structural thermal-break board (Armatherm 500 class, US-made, sold through Canadian distributors).
  - Machined to 251 × 100 and drillable, so anchors are possible.
  - Grades run from 2.0 to 18.5 MPa with λ 0.031–0.078 (S\*). The 500-150 grade is 3.9 MPa at R-3.3/in (S\*).
  - Use the 320 grade or stiffer (λ ≈ 0.054, comparable to PERINSUL). It sits under the stainless pan and behind the skirt, so it stays dry.
- **(c)** Compacfoam CF200 (11 TBS-CF; service stress 1.01 MPa, takes up water). Second choice.
- In metrics, add a `cellular-glass` or `pu-structural` material with a sourced factor.

**Source:** SOURCED: OC-SIB data sheet (Jan 2023, read this session); 12 §3.4, Q6; 09 FOAMGLAS factor. Armatherm values are search-summary only (S\*), so verify against the current BBA/ICC data sheet. INFERRED: the choice.

### F10 — MINOR — Head flashing geometry and support

**Parts:** `head-flashing`, `band-ei`.

**What is wrong**
- The slope is 7/117.8 = **5.94 %**, below the ≥ 6 % minimum.
- `req.flashing-geometry` also asks for a lap of ≥ 10 mm over the element below. The drip ends at 2734, 4 mm above the head-track top.
- The 118 mm leg is unsupported: `band-ei` is 2–7 mm above it.
- There is no hem, so a 24 ga leg will oil-can.
- The steel upstand sits behind the insulation and its leg crosses to the exterior, which makes a minor thermal bridge (see P4).

**Exact fix (with the 100 mm band)**
- Path `[[24.195,2830],[24.195,2746],[-118.6,2737.4],[-118.6,2718],[-124.6,2712]]`. That is a 6.0 % fall, a 19 mm face, a drip 6 mm out, and the drip bottom 12 mm below the head-track top (2730).
- Cut the `band-ei` bottom to the 6 % fall so it bears on the flashing: bottom edge from (23.4, 2747.3) to (−76.6, 2741.3).
- Add a 6 mm hem at the drip, or the 45° kick shown.
- End dams ≥ 25 mm, as already noted.

**Source:** SOURCED: 01 `req.flashing-geometry` (≥ 6 %, ≥ 50 upstand, lap ≥ 10, drip ≥ 5); 11 H10. INFERRED: the geometry.

### F11 — MINOR — Track anchorage is unresolved

**Parts:** `track`, `pan`, `perinsul`.

**What is wrong**
- 11 T11 says "screwed through bridges".
- In this build-up there is nothing to anchor into below the pan: a wedge 10–25 mm thick and a course that must not be drilled (OC-SIB). Any screw would also pierce the pan below the water line.

**Exact fix.** Note on `track`:
- Held by shims and grout.
- No fasteners through the pan floor.
- If the maker requires anchors, use stainless clips riveted to the back leg at y −30 (37 mm above the pan's high point) and screwed to the track's interior web at 600 o.c.

**Source:** SOURCED: 11 T10–T11; OC-SIB. INFERRED: the clip.

### F12 — MINOR — Track weep tubes

**Part:** `track-weeps`.

**What is wrong**
- The tubes are level (no fall).
- They start inside the grout at x +40, 7 mm below the track bottom, and are not connected to the track's drain outlets.

**Exact fix**
- Give a 2 % outward fall: rod from (40, −55) to (−40, −56.6), i.e. `dy` −1.6.
- Add 12 mm riser fittings from the track-bottom outlets at w 300/900/1500 to the tubes.
- Fix them before grouting (11 T12, S).
- With F1 the tubes discharge over the lowered channel wall, so no wall penetration is needed.

**Source:** SOURCED: 11 T12; LOE-INST. INFERRED: the fall.

### F13 — MINOR — The 13 mm rise has zero reserve, and the haunch sits on native soil

**Parts:** `grate`, `channel`, `nosing`, `haunch`, `subgrade`, `pavers-lined`.

**What is wrong**
- Track +5 to grate −8 is exactly the B651 5.2.6 limit of 13 mm.
- Track level (±1 mm) and grate-setting tolerance alone can exceed it.
- The channel sits on a 35 mm haunch over a 16 mm sliver of native soil on XPS, outside the frost-protected zone, so any settlement increases the step.

**Exact fix**
- Grate, pavers and the channel's outer wall top move to **−6**, giving an 11 mm rise.
  - `nosing` → `[[0,5],[-22,-6],[-26,-6],[-26,-20],[0,-20]]` (1:2 over 22 mm, then 4 mm flat).
  - `grate` → R(−161.5, −26, −31.5, −6).
  - `PT(x) = −6 − 0.02·(−171.5 − x)`.
- `haunch` → R(−171.5, −193, −22, −130), bearing on `beam-xps` and compacted 19 mm clear crushed stone. Remove the soil sliver from `subgrade`.
- F1's `grate-seat` then holds the house-side edge to the track.

**Source:** SOURCED: B651 5.2.6 and Table 1 (via 11 G13); 11 §3.3 settlement warning; 12 §6.2 (seat the channel on rigid insulation). INFERRED: the levels.

### F14 — MINOR — Glazing and rating specification

**Parts:** `glass-1/2/3`, `sash`, `track`.

**What is wrong**
- The 4/16/4/16/4 build-up is the PHI thermal reference (PHI-CAS, tested at 2.40 × 2.50 m), not a structural selection for about 2.4 × 2.6 m panes at DP 960 Pa.
- 11 G10 recommends a laminated inner pane for security.
- No NAFS rating is noted.

**Fix (notes only, no geometry change)**
- Panes per the maker's wind and deflection calculation; typically 6 mm heat-strengthened or tempered outer and 8.76 mm laminated inner. Panel weight then stays within the maker's 454 kg (LOE-BRO).
- Add a note on `track`: NAFS LC-PG20 (DP ≥ 960 Pa) minimum; water **260 Pa east** / ≥ 180 Pa west; air A3; rated for the **recessed flush-sill configuration as installed**.
- West panes: lower SHGC, but ≥ 0.28.

**Source:** SOURCED: 11 §2.1 G3, G10; §2.6; §7. INFERRED: the pane sizes.

### F15 — MINOR — Exposed spray foam and missing interior finish at the lintel

**Parts:** `foam`, `ceiling`, `lintel`.

**What is wrong**
- `foam` spans x 63–185 but `ceiling` starts at x 185.
- The foam underside is exposed along a 30 × 13 mm strip at x 155–185, y 3023–3036.
- Foamed plastic must be protected by a thermal barrier: VBBL 9.10.17.10 (clause cited from memory; verify).

**Fix:** `ceiling` → R(155, 3023.3, 2500, 3036).

**Source:** INFERRED.

### F16 — MINOR — Head membrane permeance and joist dog-ears

**Parts:** `head-membrane`, `membrane-top`, `joists`.

**What is wrong**
- If the self-adhered membrane on the lintel face is vapour-closed, it sits at about 10 °C at −7 °C design. That is on the cold side of 130 mm of glulam and stops the lintel drying outward.
- `membrane-top` stops at each joist, which 06 B.3.1 calls the highest-risk air path.

**Fix**
- Specify a vapour-permeable self-adhered WRB on the lintel face.
- Dog-ear `membrane-top` 50 mm onto both joist faces in every bay, and caulk the blocking on 4 sides as noted.

**Source:** SOURCED: 06 B4, B.3.1. INFERRED: the permeance.

### F17 — MINOR — Grate detailing

**Part:** `grate`.

**Fix**
- Specify a serrated or slip-resistant top. Wet stainless at the door line is the slip risk.
- Use a bayonet or clip lock, not grub screws, which work loose (GG47 via 11 §5.5, S).
- Lift-out sections ≤ 1 m for cleaning twice a year.
- Use the same finish as the nosing and frame (see P1).

**Source:** SOURCED: 11 §5.5, §5.7. INFERRED: the remaining points.

### F18 — MINOR — Metrics material labels

**Parts:** `perinsul` (F9), `foam`, `channel`, `glass-*`.

**What is wrong**
- `foam` (closed-cell SPF) is counted as graphite EPS.
- `channel` (polymer concrete) is counted with the cement-concrete factor.
- `glass` uses a generic ICE factor, not an IGU EPD.

**Fix:** add materials and factors. T carbon is understated by roughly 10–15 kgCO₂e/m (INFERRED).

### F19 — MINOR — Frieze fixing

**Part:** `frieze`.

**What is wrong:** it touches only the soffit and is 7 mm off the cedar plane.

**Fix:** screw it through the soffit into each joist (400 o.c.), or onto a continuous PT 19×38 backer under the soffit at x −121..−103 (100 mm band case). 06 B24 fixes the frieze to the soffit, not the cladding ✓.

### F20 — MINOR — Operating force for accessibility

**Parts:** `sash` (note).

**What is wrong:** a manual lift-and-slide handle needs a lifting turn. Its force against B651 4.2 is unverified (11 Q9).

**Fix:** note an assisted or motorised lift-slide, or a maker-certified low-force handle. Operating devices at 900–1100 mm (V1 3.8.3.6.(4); B651 5.2.7.1, S via 11 §3.3).

---

## 4. Design proposals (larger changes)

### P1 — Integrated drained, airtight and demountable threshold

F1–F4 and F13 resolve into one coordinated assembly:
- A welded stainless pan with an integral nose into the channel.
- A grate seat hung from the track nosing, so the walking-edge geometry is factory-fixed to the door.
- An EPDM sill foil and a 25 mm slot-edge strip.
- An interior floor-connection profile in the frame finish, about 50 mm, reading as a deliberate bronze or stainless line inside.
- Go one step further for the 30-year door replacement (11 §5.7: replace the track without breaking the floor or the landing, a GG47 principle):
  - Set the track on discrete PU bearing pads at the bridge positions.
  - Use the grout only as a non-bonded infill (bond breaker on the pan and the track).
  - The track can then be cut free and lifted while the pan, course and slab stay.

**Effects**
- **Look:** sharper and more constant edge lines. Grate, nosing and interior profile can share one finish, and the grate edge can no longer step relative to the door.
- **Thermal:** removes the slab-edge bypass (F4). THERM will tell how much.
- **Moisture:** the pan finally drains, and the course/beam joint is skirted.
- **Carbon:** stainless pan about 2.6 kg/m, ≈ +7.5 kgCO₂e/m, against about 1.5 for the liquid pan (I). Small against the 477 total.
- **Maintenance:** the door can be replaced.

### P2 — Thermal-break course that can be bought and approved in Canada

Replace PERINSUL HL with a one-piece machined high-density PU structural thermal break (Armatherm 500 class, 320 grade or stiffer, F9b). Keep PERINSUL SIB (three rows, engineered) as the cellular-glass alternate.

**Effects**
- Buildability goes up: one piece, drillable, any width, North American supply.
- Thermal is about equal (λ 0.054 vs 0.058).
- Moisture: slightly lower tolerance than cellular glass, but the course sits under the stainless pan and behind the skirt.
- Carbon: PU is higher per kg but the volume is tiny. Confirm with an EPD.

### P3 — Lintel and head band as one decision

| option | lintel | band insulation | head band, soffit underside to frame top | carbon (I, per m of wall) | thermal |
|---|---|---|---|---|---|
| Drawn (fails) | glulam 130×266 | 75 | 287 mm | ≈ 2 | 3.53, fails |
| **A: steel (recommended for look)** | W250×39 + PT packers | 130 mm stone wool | 287 mm (unchanged) | ≈ +45 kgCO₂e/m (39 kg/m × about 1.2, generic hot-rolled) | ≥ 3.85 with 130. Steel is inboard of continuous insulation, so the bridge is only at the bearings |
| B: deep glulam | 175×456, creep-checked | 100 | ≈ 477 mm, or 190 mm less glass | ≈ +10 (plus biogenic storage) | 4.04 |

**Effects**
- **Look:** A keeps the glass tall and the band proportion as drawn. B adds a heavy 0.48 m band.
- **Thermal:** both meet 3.85.
- **Carbon:** B is better.
- **Durability:** A has no creep, so the 3 mm clearance holds for decades, which matters most for a lift-and-slide.

Recommendation: **A** unless the architect values the timber lintel's carbon over glass height.

### P4 — Concealed, over-insulated frame head with a two-piece flashing

1. Drop `band-ei` and the cedar band in front of the frame so the cedar bottom is at about y 2660. It then hides the head track (2690–2730) and most of the sash top rail from eye level.
2. Bring the insulation down to overlap the frame head by about 40 mm.
3. Replace the steel flashing with two pieces:
   - a sloped self-adhered membrane sub-flashing on a 6 % PT cant, taped to the head track's exterior face and lapped under the WRB, which keeps the drainage plane continuous;
   - a separate prefinished metal drip fixed to the strapping outboard of the insulation, which removes the steel bridge through the insulation.
4. Fill the head gap with the F5 three-zone tape.
5. Panels lift out from inside, so check the maker's head clearance and removal path.

**Effects**
- **Look:** the glass appears to run straight up into the cedar band; the visible head stack drops from about 420 mm to the band alone.
- **Thermal:** head ψ approaches PHI's over-insulated value (Cascadia head ψinstall 0.005 W/(m·K), EIFS, S) instead of an exposed frame head.
- **Moisture:** the membrane-to-frame tape becomes critical, so inspect it before cladding.
- **Carbon:** neutral.

### P5 — Orientation package: west shading and bird-safe glass

- **West:** a fabric ZIP-screen cassette (about 150 × 150) recessed in the soffit just outboard of the band at x about −270..−120, y 2870–3017, hung from the joists outside the air barrier. Guide rails in the jamb returns (11 H14, BC-B24-08 S).
- **Both orientations:** a fritted or acid-etched marker pattern on surface 1, because the glass reflects the shrub and tree. 11 Q10 is open. The City of Vancouver bird-friendly guidance and a 50 × 100 mm spacing rule are INFERRED; verify.

**Effects**
- **Look:** the cassette is invisible when retracted; the frit is a fine visible texture.
- **Thermal:** large cut in west solar gain and overheating, with no change to the frame.
- **Ecology:** bird collisions drop.
- **Carbon:** small.

### P6 — Verify and protect the coldest line

- Run THERM or Flixo on T and H with the lap-1 fixes for ψ and interior f_Rsi at −7 °C (11 Q4; 12 Q4).
- If f_Rsi at the sill is below 0.70 (PHI hygiene), add a low-temperature hydronic loop within 600 mm of the sill in the slab, above the EPS, keeping RSI 2.45 below it (MAR "in-floor heating should be considered", S; 12 §6.5(b)).

**Effects:** comfort and condensation at the sill. Small carbon and an operational cost.

---

## 5. Top 3 changes that would raise this score most

1. **Make the sill pan drain into the channel (F1, with F13):**
   - integral stainless pan nose to (−38, −103);
   - channel house-side wall lowered to −92;
   - grate seat hung from the track nosing;
   - skirt lapped over the damp-proofing;
   - grate at −6.

   This turns the blocker into a working drained threshold and makes the 13 mm rule settlement-proof.
2. **Close the air, soil-gas and thermal line at both ends of the glass (F2, F3, F4, F5):**
   - rigid stainless pan with its back leg to −110 and the poly butyl-taped ≥ 100 mm;
   - EPDM `sill-foil` from the track to the back dam;
   - 25 mm `slot-edge` strip, with the slab moved to x 257.3;
   - at the head, a three-zone tape in the gap plus an interior `head-airseal` from the frame to the lintel.
3. **Fix the head as one structural and thermal decision (F6, F7, F8):**
   - run `band-ei` up to 3036;
   - size the lintel for ≤ 3 mm including creep (steel W250×39 recommended);
   - set the band insulation to match: 100 mm with glulam, 130 mm with steel.
