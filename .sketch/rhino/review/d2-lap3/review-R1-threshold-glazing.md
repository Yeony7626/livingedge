# Review R1: threshold, glazing and floor-band head (Detail 02, lap 3)

**Reviewer:** R1, building envelope. **Scope:**
- junction T, the threshold;
- the door unit and its glass;
- junction H, the floor-band head and canopy;
- the jamb-A wall base and reveal liners where they meet the door.

**Inputs:**
- `detail02-v3.mjs` (authoritative) and `detail02-v3.json`;
- `changes-v3.md`, `report.md`, `metrics.md`;
- lap-3 PNGs: T, H, F, S, Z axo, and the three exterior renders;
- `d2-compare/*-d2v3.png`;
- my lap-2 review.

**Research checked:**
- 14: §1–§10, read in full;
- 13: §1–§5.2, plus FB1–FB30;
- 11: G1–G13, T1–T20, H1–H10;
- 09 §9.1, through the v3 jamb parts.

**New web sources this session.** Each is tagged **(S\*)** because only a search-engine summary was read:
- **HS-SG:** Cardinal Glass and Guardian, summarised by search. Heat-strengthened glass is *not* safety glazing. BCBC/VBBL 9.6.1.4 accepts tempered or laminated glass to CAN/CGSB-12.1 for sliding doors.
- **A117-TH:** idighardware.com and WBDG, US A117.1 / ADA thresholds:
  - ≤ 6.4 mm may be vertical;
  - 6.4–13 mm must be bevelled at 1:2;
  - over 13 mm must be ramped.
  - This matches the B651-18 4.3.2 Table 1 reading already in 11 G13 (S).
- **ENS-NA:** a search for any ENERsign NAFS/AAMA listing or North American distributor found none. The Phius D-100181 sheet dated 23 Dec 2025 exists.

**Tags:**
- **SOURCED** = in a research file (cited by file and §) or a source above.
- **INFERRED** = my geometry, arithmetic or judgement.
- **2D-FD** = my own 2D thermal screening (§2.4). It is INFERRED and indicative only.

**Datums:** as the spec. x = 0 at the frame's exterior face, exterior negative; y = 0 at FFL; w along the wall; mm. Helper functions are quoted from the spec:
- `CT(x) = −82 + (x+20)·15.6/260.4` (course top);
- `PANTOP = CT + 1.32`;
- `CTT(x) = 2792 − 0.06·(24 − x)` (head cant top).

---

## Lap-2 findings status

| # | lap-2 severity | v3 claim (`changes-v3`) | re-score | evidence in v3 (coordinates) / challenge |
|---|---|---|---|---|
| N1 threshold 16 mm | major | done | **fixed** (residue m1) | Tray `tray-slips` top −7 → `track-rail` R(205, 0, 215, 5): **12 mm** ✓. Vertical edges: 5 at the lip (−7 → −12) and 5 at the rail ✓. The dip-then-17 mm-rise reading is still open (m1). |
| N2 grout/wedge/apron bypass | major | done | **fixed** (new residue M2) | No concrete between the beam and the frame. The `course` is PU λ 0.0375, `sill-bearer` is Purenit, the pan floor sits on PU. 2D-FD: replacing the course with concrete would drop the floor line from **0.645 to 0.535**, so the warm sill is worth about +0.11. **But** the new 4 mm 316 `sill-cover` now sets the coldest interior line (M2). |
| N3 blocked-channel overflow | major | "done (partly drawn)" | **not fixed** → M1 | No `channel-seal` part. The house-wall/skirt joint at (−21.5, −92) is still unsealed. Weir −95 and the 0.5 % fall are notes only. The stated order "−95 < −20 < −5" leaves out the house-wall crest −92, the bearer underside (−73.6 → −65.3) and the block underside −54.5. **I challenge the "done".** |
| N4 steel flashing on steel lintel | major | done | **fixed** (new residues M3, M4) | No steel touches the header; `head-drip` sits on the PT `head-cant`. The two-piece flashing is now reverse-lapped in the model (M3), and its outlet is buried under WF and the ledger (M4). |
| N5 lintel not real / no grounds | major | done | **fixed** | `glulam` R(25, 2780, 240, 3464) at 215 × 684. `head-ground` R(25, 2742, 200, 2780) is shimmed after dead load. The 30–40 mm stacked-stud rejection is sound (13 §3.2, S). Residue m6 (canopy screws in the tension zone). |
| N6 pan sequence | major | done | **partly fixed** → M6 | Two-stage pan ✓, and the pan-back butyl lap −60 → −25 sits on the angle's exterior face (shingled) ✓. **But** `dam-angle` (1.0 mm, x 240.4–241.4) stands behind 25 mm of cork (`slot-edge` 241.6–266.6). It is screwed only into PU at y −105, yet 14 §3.3 #12 makes it the frame's uplift/outward anchor. No structural path exists (M6). |
| N7 jamb–sill corner | major | partial | **not fixed, worse** → **B1** | The rough opening equals the frame: `door-jamb-a` w 0–165 butts `jamb-stem`/`jamb-posts` at w 0, with **no installation gap, no jamb tapes, and no membrane for the pan end dam to lap under**. `jamb-wrb` starts at y 310; the stem is bare concrete to +300. |
| N8 grate outer bearing | minor | — | **fixed** (superseded) | The tray fold at x −170.75 bears on the channel outer wall top −39 (x −171.5..−159.5), about 11 mm ✓. |
| N9 seat on fibreglass nosing | minor | — | **superseded, new problem** → M5 | `tray-stools` sit on the 0.8 pan over a **10 mm void** above the house wall. `tray-ledge` hangs from the 19 mm edge of the Purenit. |
| N10 pan nose leg 20 | minor | — | **accepted** | Leg x −38, −82.2 → −103; 11 below the house-wall top ✓; 6.5 clear of its inner face ✓. |
| N11 head reverse lap | minor | — | **recurs** → M3 | Now between `head-subflash` (x 23.5–24.0, outboard) and `wrb` (24.0–24.5, continuous behind it). |
| N12 ei-top wind-washing | minor | — | **closed** (n/a) | No vented soffit; WF is behind a 19 mm cavity. |
| N13 sill air-seal bonds | minor | done | **partly fixed** → m9 | `sill-foil` bonds 34 (block) ✓ and **22** (pan upturn), which is below the 30 asked. |
| F5 head air break | (min) | — | **fixed outside, new break inside** → M7 | The exterior `head-tape-ext` loop is fine. `head-tape-int` (259.25, 2700 → 2780.25 → 240.25) is bonded over the **`drive` housing** R(200, 2730, 259, 2780) and floats across x 240–259. |
| F8 metric caveat | minor | — | **closed** | No steel. Floor-band RSI 3.94 is honest for glulam + WF (parallel path is fine here). |
| F10 head flashing support | minor | — | **fixed** | Drip flange screwed into the PT cant. |
| F11 track anchorage | minor | done | **partly fixed** → M6 | No fastener through the pan ✓; no structural anchor either. |
| F12 track weeps | minor | — | **fixed** | Deleted; the maker's drained nosing discharges at the lip into the 6 mm slot. |
| F14 glazing / NAFS | major | partial | **partly fixed** → M8 | Make-up 6 / 14 Ar / 4 / 14 Ar / 8.76 lam (46.8 in a 48 rebate) ✓, 310 kg ≤ 400 kg drive ✓, A460 dots on #1 ✓. Still open: no NAFS/A440S1 for the flush sill; "6 HS/FT" (HS is not safety glass); PHI certificate expires **31 Dec 2026**. |
| F16 dog-ears / deck lap | minor | — | **closed** (n/a) | No roof deck; the exterior WRB is continuous. |
| F17 grate details | minor | — | **mostly fixed** | Lift-out ≤ 1 m ✓; granite BPN ≥ 55 ✓. Clip-lock not stated. |
| F20 operating force | minor | done | **fixed** | SIEGENIA DRIVE axxent HSA; buttons at 900–1100 both faces. |
| P1/P7 warm, integrated sill | proposal | — | **adopted** | Maker-backed (ENS-K08 80 mm insulating base, 14 §3.1). |
| P4/P9 concealed, over-insulated head | proposal | — | **adopted** | `head-block` stone wool 30. 13 §5.2 screens it at f_Rsi ≈ 0.92. |
| P5 west screen | proposal | — | **adopted** | `cassette` R(−150, 2608, −32, 2758). |
| P8 slot-and-tray | proposal | — | **adopted** | One ground; 6 mm slot at x 85–91. |
| P12 thermal screening in the loop | proposal | — | **partly** | Head screened (13 §5.2); threshold not. I ran it (§2.4). |
| P13 motorised lift-slide | proposal | — | **adopted** | — |
| P10, P11 | proposal | — | n/a / not adopted | Fine. |

**Process note.** `changes-v3` lists R1 N3 as "done". By its own wording only the dam-angle top was drawn, so it should read "partly done". R1 N7 should read "open". Please disposition my P12 next lap.

---

## 1. Score: **7.0 / 10** for threshold + glazing + head performance and buildability (lap 2: 6.5)

**What v3 gets right.** v3 is the first version whose **concept** I would build:
- **A certified door.** A PHI/Phius-certified wood-aluminium lift-and-slide, with a maker-published warm sill and drained nosing. The ENERsign K08 detail is the R1 P7 principle in the maker's own drawing.
- **A compliant threshold.** 12 mm on a granite tray, so the landing reads as one ground.
- **A stiff, low-carbon header.**
  - glulam, with no steel anywhere in the head;
  - a fixing ground set after dead load;
  - a 12 mm head gap with taped loops;
  - a head block in front of the frame.
- **Shelter and operation.** A canopy that halves the threshold's wetting, and a drive that solves operating force.

**What holds it back.** It is mostly **junction completeness and water exits**, plus one avoidable cold line:
1. **The jamb side of the opening does not exist as a joint** (B1). The jamb is where heavy sliders leak first.
2. **The overflow order is mis-stated** (M1). The first crest a rising channel meets is still the unsealed house-wall/skirt joint at −92, into the foundation zone. The sill block is wetted (at −54.5) before the notch (−20) can act.
3. **The head's drainage plane is reverse-lapped, and its outlet is blocked** (M3, M4). Wood fibre and a PT ledger sit directly on the sub-flash, with no drainage space and no capillary break. The jamb base got a cellular-glass strip for exactly this reason; the head did not.
4. **The 316 floor plate** conducts the track's cold into the room. 2D-FD gives f_Rsi **0.645** (0.59–0.68 over the frame-equivalent range), now the coldest interior surface (M2). A non-metal strip gives **0.80–0.83**.
5. **Load paths:**
   - the tray stools load a 0.8 mm pan over a void (M5);
   - the frame sill has no structural anchor (M6);
   - the interior air seal is bonded over the motor (M7).
6. **No NAFS rating** for an imported flush sill. Hydrostatic head only gives 12–17 mm against the 18–27 mm that 180–260 Pa needs (M8).

None of these needs a new concept. B1 + M6 is one jamb-and-anchor drawing. M1 + M3 + M4 are three water-exit corrections. M2 is a material swap. Together they are worth about 1.5 points.

---

## 2. Control-layer pen test (v3 as modelled)

### 2.1 Threshold (T), slice w = 900 (sliding panel)

| layer | path through the modelled parts | breaks (→ finding) |
|---|---|---|
| Water shedding | glass → `sash` (bottom +1) → `track-rail` +5 → `track` 0 → maker `sill-nosing` (−1 at x 183, 1:8.4 down to the lip (91, −12)) → 6 mm slot x 85–91 → `slot-screen` (−46) → pan. Landing side: `tray-slips` −7 over the perforated `landing-tray` → `channel` (x −171.5..−21.5). Head drip kick (−160, 2750) lands on the tray over the channel ✓. Canopy drip (−757) lands on paving that falls away ✓ | Lip −12 sits 5 below the tray: a dip, then a 17 mm local rise (m1) |
| Drainage plane | maker nosing chambers → lip → slot → `pan` (0.8 mm 316, 6 %, top `PANTOP`) under the Purenit bearer (on 2–3 mm pads with grooves: pressure-equalised and drained ✓) → over the house wall at y ≈ −81.6 (10 clear of −92) → nose leg x −38 to −103 → channel → `channel-drop` → own solid HDPE 63 ✓. Secondary: `pan-skirt` down the course face to −194.5, lapped 98 over `dampproof` ✓ | Joint (−21.5, −92) between the channel house wall and the skirt is **unsealed**. Weir −95 sits 3 mm below the house wall, and only as a note (M1) |
| Air | room → `slab` → `soilgas` (−100.1) → `soilgas-up` on the angle's interior face (241.5, −100 → −15) → `dam-angle` (1.0) → butyl lap → `pan-back` (239.6–240.4, −65.9 → −25) → `sill-foil` (bonded −58 → −36 on the upturn = **22**; −36 → −2 on the block face = 34) → maker block → track → gaskets → sash | Continuous in 2D ✓. Bond 22 < 30 (m9). The jamb turn-up is not drawn (B1) |
| Soil gas | `stone` → poly → angle → pan-back → foil | ✓ in 2D |
| Vapour | poly below the slab; the pan cavity is ventilated to the exterior through the slot | ✓ |
| Thermal | `course` PU (x −20..240.4, −193 → `CT`) → pan → `sill-bearer` Purenit → maker block (λ ≈ 0.11) → track. Cork `slot-edge` 241.6–266.6 isolates the slab ✓ | `sill-cover` 316 R(235, −4, 262, 0) touches the block/foil at x 234–235 and is the coldest interior surface, **0.645** (M2) |
| Capillary | PU closed-cell, skirt, pan, Purenit, granite on stainless | ✓ |
| Support (walking) | tray outer fold → channel outer wall ✓. House-side: `tray-stools` (−31.5..−26.5) → **0.8 pan → 10 mm air → house wall**. Slot side: `tray-ledge` clips → screws in the **19 mm edge** of the bearer | **M5** |
| Support (frame) | sash rollers → track → block → screws into the bearer only → bearer on adhesive pads on a loose pan → skirt → course. Lateral/uplift: "clips to the dam angle above −30" → 1 mm sheet → screws into PU at y −105 | **No positive anchor to the structure (M6)** |

### 2.2 Head (H), slice w = 900 (bay between brackets)

| layer | path | breaks |
|---|---|---|
| Water shedding | upper cedar → `band-screen` (2985) → `canopy-cap` (2 % out, drip at −757) ✓. Under the canopy: `liner-frame-a` cheeks → `head-drip` (−150.45 face, kick (−160, 2750)) → tray ✓ | The cap's FB23 through-insulation sub-flash ("≈ 2976") would exit **behind** the cap upstand, which runs up to 3080 (m7). Liner cheek tops at 2754 leave an open notch below the soffit (2800) at the jamb (m4) |
| Drainage plane | `wrb` (24.0–24.5, 2742.5 → TOPY) → … → `head-subflash` (23.5–24.0, 2860 → cant top `CTT` → x −124.5) → `head-drip` | **Reverse lap:** the sub-flash upstand lies *outboard* of a continuous WRB. Water running down the WRB face enters at the sub-flash's top edge (24.0, 2860), runs behind it, passes behind the cant, and leaves on the tape/frame top at 2730 (M3). The sub-flash is also **cut by `canopy-pad`** at the three brackets (M3). Outlet blocked: `wf-band` (bottom `CTT`+0.5) and `canopy-ledger` (bottom `CTT`+0.5) bear directly on the sub-flash (M4) |
| Air (primary, exterior) | upper-wall `wrb` → floor-line gap (3464–3467) → glulam face → ground face → `head-tape-ext` (bonded to the frame face −0.25, 2705 → 2730; over the frame top to x 24.75; up to 2800) → frame | WRB lap over the tape is **57.5** (2742.5 → 2800); 13 FB11 asked ≥ 75 (m2). The floor-line gap is drawn as a flat bond, though the note says "loop" (m11) |
| Air / vapour (interior) | frame interior face (259.25) → over `drive` → (240.25, 2780.25) | Bonded to a serviceable motor housing; unsupported across x 240–259 (**M7**) |
| Thermal | WF 80 continuous → cant (PT) → `head-block` 30 → frame head; no steel except 3 knife plates on pads | ✓. 13 §5.2 gives f_Rsi ≈ 0.92 at the ground (INFERRED there; consistent with the geometry here) |
| Structure | upper wall → subfloor → glulam → 3 jacks + 2 kings → `sill-plate` (PT 38 × 140) → stem | The PT plate is not the LSL that 13 FB1 asked for (m8). Canopy screws sit 20 mm above the glulam soffit, at mid-span (m6) |
| Fire | no foam; glulam exposed; single 19 mm cavity, so no fire blocks needed (13 §2.2, S) | ✓ |

### 2.3 Jamb A (Z) and the corner at w = 0

| layer | path | breaks |
|---|---|---|
| Water | cedar (−94..−75) → cavity → WF → `jamb-wrb` (23.65, y ≥ 310) → **edge at w −1, no return into the RO**. Reveal: `liner-jamb-a` (w −1..0, x −94..0, y 5–2754) → tray. Base: `base-flashing-r` end dam inside the liner (y ≈ 294–360) ✓ | Nothing seals the frame jamb (w 0) to the WRB or the stem. The pan's end dam (to about +84, per the note) has no membrane to lap under, because the RO face is bare concrete/EPS from −193 to +300 (**B1**). The liner foot at +5 is 12 above the tray, leaving the plinth EPS end face (x −63..0) exposed at y −7..+5 (m4) |
| Air | stem concrete (to +300) → `sill-transition` → `jamb-wrb`; sill foil → angle → poly | No link between the frame jamb and either system. Foil "turned 100 up the jamb post" in 14 §3.3 #15 lands on concrete, not a post, and no jamb seal takes it over (**B1**) |
| Thermal | frame x 0–259: x 0–36.5 against `plinth-insul` (good, frame in the insulation plane); x 37–240 against the warm `jamb-stem` | Acceptable once there is a gap filled with stone wool; today it is concrete-to-frame contact with zero tolerance |
| Tolerance | RO = 4800 = frame width | Unbuildable; needs 2 × 10–15 (11 H6 / 14 §4: PHI models a 10 mm gap, S) |

### 2.4 2D thermal screening, threshold (2D-FD, INFERRED, indicative)

**Method.** The lap-2 rasteriser (`therm_t3.py`, scratchpad), applied to `detail02-v3.json`:
- **Slice and grid:** w = 900, h = 2 mm, domain x −700..900, y −800..200.
- **Surface resistances:** R_si 0.25, R_se 0.04. The channel void is treated as exterior air.
- **Conductivities:**
  - PU course 0.0375 (metrics S2); Purenit 0.096 (14, S); maker block 0.11 (PHI model "spruce", 14 S);
  - cork 0.04; stainless 16; the pan and dam angle as λ·t sheets;
  - granite 2.3; polymer concrete 1.2;
  - IGU lites set to give Ug ≈ 0.55;
  - sash 0.13.
- **Frame equivalents (unknown):** track/rail equivalent λ **0.5**, sensitivity 0.25–1.0; nosing 0.5, sensitivity 2.0 (Δ ≤ 0.013).
- **Joints:** 1-cell joints are filled at ≤ 0.3 W/(m·K). This is the conservative choice: lap 2 averaged them, which artificially welded the plate to the sash.
- **Status:** a screening tool, not THERM. Relative values matter.

| case | floor plate x 235–262 | sash/floor corner (260, 1) | edge seal / slab x 262–400 | glass bottom edge | heat flow, W/(m·K) |
|---|---|---|---|---|---|
| **v3 as drawn** (track λ 0.5) | **0.645** | 0.671 | 0.688 | 0.79 | 0.382 |
| v3, track 0.25 / 1.0 | 0.684 / 0.593 | 0.707 / 0.624 | 0.721 / 0.644 | 0.79 | 0.367 / 0.401 |
| **CON**: course replaced with concrete (what the warm sill avoids) | 0.535 | 0.571 | 0.590 | 0.78 | 0.459 |
| PLATEGAP: 316 plate kept, 6 mm cork break at the frame (x 235–241) | 0.690 | 0.711 | 0.726 | 0.79 | 0.371 |
| **PLATE-N**: non-metal strip, λ 0.30 (compact laminate / GFRP) | **0.797** | **0.751** (sash at y 9) | 0.821 | 0.79 | 0.360 |
| PLATE-W: timber strip, λ 0.13 (oak / thermally modified ash) | **0.825** | 0.750 | 0.845 | 0.79 | 0.356 |
| Reference: maker's certified threshold f_Rsi (PHI-ENS) | — | 0.62 (installed in EIFS 0.615) | — | — | — |

**Reading (INFERRED):**
- **What the warm sill buys.** It is worth about +0.11 on the floor line and −0.08 W/(m·K) against concrete. v3's sill does **not** worsen the certified frame: 0.67 vs 0.62. That is the point of the warm sill, and it works.
- **The plate is the problem.**
  - At −7 / 20 °C, f 0.645 gives a surface at **10.4 °C**. Condensation starts at about 54 % room RH, and the 80 % surface-RH mould line is passed at about 43 % RH.
  - That surface is a **walking surface where water pools**, and with stainless it is the first thing a bare foot touches.
- **The fix.** A non-metal strip raises it to 0.80–0.83 (14.6–15.3 °C: dry to about 71–74 % RH) and lifts the sash corner to 0.75.
- **Floor heating** within 1 m (14 §8, 11 §6.1, S) remains the backstop for the frame's own 0.62.

---

## 3. Buildability, sequence, tolerances, accessibility, code

| check | v3 | verdict |
|---|---|---|
| Sequence: course → angle → poly → pour → framing → pan | 14 §3.3 order ✓. **But** the stems (`jamb-stem`, concrete to +300) are poured before the slab, so the sill RO is fixed to ±3 *before* the pour. A one-stage factory pan is now possible (P15) | ✓ / improvement |
| Pan end dams vs jamb | End dams "150 up the jambs" against bare concrete; the jamb WRB starts at 310 | ✗ **B1** |
| Installation gaps | Head 12 ✓ (2730 → 2742). Jambs **0** | ✗ **B1** |
| Head-gap budget | Δ(L+S) + creep ≤ 2.3 (13 §3.2, I) + PT sill-plate shrink about 1.1 (38 × 15 % × 0.002, PT delivered at about 25 % MC, I) + KD 0.7 vs gap 12 and 16 mm guide clearance | ✓ (m8: use LSL/KDAT) |
| Track level ±1 mm over 4.8 m (11 T10, S) | Bearer top machined ±1 on discrete pads ✓ | ✓ |
| Frame anchorage | Screws stop in a 9–19 mm bearer; uplift and outward wind go to a 1 mm angle screwed into PU | ✗ **M6** |
| **CSA B651** threshold ≤ 13, bevel 1:2 for 7–13, vertical ≤ 6 (11 G13, S) | Tray −7 → rail +5 = 12 ✓. Lip −12 → rail +5 = 17 at 1:8.4, steeper than the 1:12 that Table 1 asks for any change > 13 (S; A117-TH S\* agrees) **if** read as one change | open, **m1** |
| B651 4.3.4 openings ≤ 13 | 6 mm slot; tray perforations | ✓ |
| Landing slope | 1:60 ✓ | ✓ |
| Operating force / controls | SIEGENIA drive, jam protection, buttons at 900–1100 ✓ (14 §6, S) | ✓ |
| **VBBL 9.7.4.2(1): NAFS + A440S1** (11 G1, S) | None found (14 §2.4; ENS-NA S\*) | ✗ **M8** |
| Water resistance by hydrostatic head (11 §1, S: 180 Pa = 18 mm, 260 Pa = 27 mm) | Exterior drain level (lip −12 to −21) → interior seal (track 0 / rail +5): **12–17 mm** | relies on pressure-equalisation, not head (**M8**) |
| Safety glass 9.6.1.4 (11 G10, S; HS-SG S\*) | "6 mm HS/FT" | HS is not safety glass → specify **FT** (M8) |
| Bird-safe CSA A460 | Dots ≤ 50 × 50 on #1 ✓ (needs FT for frit) | ✓ |
| Head flashing 9.27.3.8 | Canopy soffit 2800 within ¼ × 656 of the trim, so not strictly required (13 §4.6, S); fitted anyway | ✓ |
| USI ≤ 1.22 | Uw ≈ 0.6–0.7 (PHI-ENS, S) | ✓ |
| PHI certificate validity | 1831sl03 valid to **31 Dec 2026** (14, S): 79 days from today | **M8** note |

---

## 4. Findings

**Counts (open items):**
- **1 blocker** (B1);
- **8 major** (M1–M8);
- **10 minor** (m1–m4, m6–m11).

B1 and M6 are one drawing (the jamb and anchor). M1, M3 and M4 are the three water exits.

### B1 — BLOCKER — The jamb side of the opening is not a joint: no gap, no seals, nothing for the pan end dam to lap under

**Parts:** `door-jamb-a`, `jamb-stem`, `plinth-insul`, `jamb-posts`, `jamb-ply-p`, `jamb-gyp-p`, `sill-plate`, `jamb-wrb`, `sill-transition`, `pan` (end dam note), `sill-foil`, `liner-jamb-a`, `channel` and `landing-tray` ends.

**What is wrong**
- RO = frame = 4800. `door-jamb-a` (w 0–165) butts the stem (x 37–240, y −193..300) and the posts (x 37.5–177.5) at w 0.
- There is no stone wool, exterior tape, interior tape or RO membrane at the jamb.
- **The pan note cannot be built.** "End dams 150 up the jambs; jamb membranes lap ≥ 100 over them":
  - the end-dam top (about +84) is 226 mm below the first jamb membrane (`sill-transition` 225, `jamb-wrb` 310);
  - between them the RO return is bare concrete and graphite EPS.
- 14 §3.3 #15 turns the sill foil "100 up each jamb post", but there is no post below 341.
- **Why it is a blocker.** Sliders leak first at the sill–jamb corner (SINTEF via 11 §5.5, S). This was a major at lap 2, marked "partial", and the 3D corner is still not drawn. This lap the zero-gap RO also makes the frame impossible to install.

**Exact fix (spec coordinates; jamb A, mirror at jamb B: w 4800 → 4812)**
1. **RO faces to w −12.** Move `jamb-stem`, `plinth-insul`, `jamb-parge`, `sill-plate`, `jamb-posts`, `jamb-ply-p` and `jamb-gyp-p` from their `0` / `-1` ends to **w −12**. That gives a 12 mm installation joint, as at the head (11 H6; PHI model 10, S).
2. New **`jamb-ro-membrane`**: liquid-applied PMMA or silyl-terminated membrane with fleece, t 1.5.
   - Location: the RO return plane w −12, x −63 → 240, y **−110 → +380**.
   - Laps: 75 onto `sill-transition` and under the returned `jamb-wrb`. Fleece-reinforced over the stem/EPS change at x 37.
3. **`pan` end dam** in the plane w −11, from `PANTOP` to **+84**, welded. `jamb-ro-membrane` laps **over** it from +84 down to −16 (≥ 100, shingled).
4. **`jamb-wrb`** returned into the RO: path (in plan) x 23.65 → 37.5 along w −12, lapped onto the posts' face and over the membrane top.
5. New **`jamb-gap-fill`**: stone-wool strip, w −12..0, x 25 → 190, y 0 → 2730. Below +300 use a compressible stone-wool or EPDM backer against the concrete.
6. New **`jamb-tape-ext`**: vapour-open window tape with a 10 mm loop.
   - Route: bonded 25 to the frame's exterior face (x −0.25, w 0 → 25), across the gap, 50 onto `jamb-wrb` / `jamb-ro-membrane` on the RO face.
   - Height: y −2 → 2730. Its foot laps **over** the pan end dam.
   - At 2730 it laps under `head-tape-ext`.
7. New **`jamb-tape-int`**: airtight, vapour-retarding tape with a 10 mm loop.
   - Route: frame interior face (x 259) → across the gap → the 6 mil poly at the post/gyp line (x 177.5), y 0 → 2730.
   - **Its foot laps over the turned-up `sill-foil`.** `sill-foil` gets a 100 turn-up on the stem's RO face, x 234.5–241, y −2 → +100.
8. **`liner-jamb-a`** → w −13..−12, with a 12 mm return fold at x −1..0 that closes the joint over `jamb-tape-ext`, plus a 3 mm sealant joint to the frame face.
9. **`channel`** and **`landing-tray`** end caps → w −12, with the liner's w-end upturn wrapping them as now.
10. Draw a **Z-corner view** at w = 0 (x −200..300, y −120..400) in the 3D slice.

**Source:** SOURCED: 11 H6 (10–15 gap, no foam), 11 T6–T8 (end dams 150, membranes lap over), 11 §5.5 (corner leaks), 14 §4 (PHI 10 mm gap), 09 §9.1 (`sill-transition`). INFERRED: the coordinates and the corner sequence.

### M1 — MAJOR — The overflow hierarchy is mis-ordered: the foundation joint (−92) is the first crest, and the sill block wets before the notch acts

**Parts:** `channel`, `pan-skirt`, `pan`, `sill-bearer`, `sill-block`, `tray-slips-notch`, `dam-angle`, silt box / weir (note), `channel-drop`.

**The true order as drawn (INFERRED from coordinates)**

| level | y | element |
|---|---|---|
| Channel invert, high end | −95 | — |
| **House-wall top** (unsealed joint to the skirt, then the drain stone) | **−92** | first spill |
| Pan nose | −81.6 | — |
| Bearer underside | −73.6 → −65.3 | — |
| **Sill-block underside** (maker timber composite) | **−54.5** | — |
| Notch | −20 | — |
| Barrier | −5 | — |

**What is wrong**
- 14 §3.5 reads "−95 < −20 < −5" and says the block wets "only above the notch". It actually wets 34 mm **below** it.
- **Weir arithmetic:**
  - The channel catchment under the canopy is small: glass wash ≈ 0.005 L/(s·m) × 4.8 m ≈ 0.024 L/s (INFERRED).
  - Over a 100 mm silt-box weir that is h ≈ (Q / (1.7·L))^(2/3) ≈ **3 mm** (broad-crested weir).
  - So a crest at −95 floods to about −92, the house-wall top, with **zero freeboard**.
  - Wind-blown splash and the drawn 0.5 % fall make it worse.
- **Drawing gaps:** the weir and the fall are notes; there is no `channel-seal`.

**Exact fix**
1. **`channel-seal`** (as lap 2): PMMA with fleece, t 2, path `[[-21.5,-85],[-21.5,-91],[-32.5,-91],[-32.5,-112]]`, from the skirt face across the house-wall top and 20 down its inner face. The pan nose clearance becomes 6.5.
2. **Silt-box standpipe** inside the basket, crest **−105**, discharging to `channel-pipe` downstream of the basket. A blinded basket then floods only to about −102.
3. **Tell-tale overflow, crest −60** (P14).
   - **Part:** new `channel-overflow`, solid HDPE 50.
   - **Route:** out of the channel's w = 0 end cap at y −60, x −100, which is **above the liner upturn (≈ −67)**, so the liner is not pierced (R2 rule kept). It falls 1 % to the jamb-A basin (`basin-shell`) and enters at about −66, above the basin outlet slot (−145).
   - **Result:** a blocked channel pipe now shows as water in the basin, and the bearer underside is the highest wetted part. The block stays dry.
4. **Corrected order** (state it on `channel`):

   | level | y | element |
   |---|---|---|
   | Standpipe | −105 | normal |
   | House-wall top | −92 | sealed |
   | Tell-tale | −60 | first emergency |
   | Block underside | −54.5 | — |
   | Notch | −20 | second emergency |
   | Barrier | −5 | — |

5. Draw the invert fall (−95 → −120 toward w 0) and the silt box in the appearance model.

**Source:** SOURCED: 11 §5.3 (clogging-limited, not capacity-limited), 14 §3.5 (levels), R2 N2 (liner rule, via changes-v3). INFERRED: the flows, the weir head and the levels.

### M2 — MAJOR — The 316 floor plate is now the coldest interior surface (f_Rsi 0.645), and it rocks on 3.6 mm of cork

**Parts:** `sill-cover`, `back-fill`, `slot-edge`, `edge-seal`.

**What is wrong**
- **Thermal.** 2D-FD (§2.4):
  - 0.645 (0.59–0.68 over the frame range), below the frame's own corner (0.67) and well below PHI 0.70.
  - Stainless (λ 16) collects the track's temperature through the 1 mm EPDM and spreads it over the 27 mm walking strip.
- **Support.** The plate (x 235–262, −4..0) bears only on `back-fill` cork (x 235–238.6). Over x 241.6–262 it spans a 4 mm void above `slot-edge` (top −8), so wheel loads rock it.

**Exact fix**
- `sill-cover` → **compact-laminate or pultruded-GFRP strip 4 mm** (λ ≈ 0.3, abrasion class for floors), R(235, −4, 262, 0).
  - Colour-matched to the frame inside; removable (countersunk 316 screws into the M6 clips).
  - Alternative: **thermally modified ash or oak**. That needs 8–10 mm; keep the barrier top at −5 by notching the strip over the angle.
- `slot-edge` top −8 → **−4**. Add a cork bed under the whole strip so the strip is fully bedded.
- **Result:** f_Rsi 0.80 (laminate) / 0.83 (timber); sash corner 0.75; −0.022 W/(m·K).
- **Carbon:** about −4 kgCO₂e/m (0.86 kg/m of 316 at 5.0), INFERRED.
- **If metal is insisted on:** start the plate at x 241 with a 6 mm cork/EPDM break (PLATEGAP). That gives only **0.69**, so it is not recommended.

**Source:** INFERRED: 2D-FD. SOURCED: 14 §2.2 (PHI threshold 0.62/0.615), 11 §5.4 (Marvin frost warning).

### M3 — MAJOR — Head sub-flash reverse-lapped behind a continuous WRB, and cut at the canopy brackets

**Parts:** `wrb`, `head-subflash`, `head-tape-ext`, `canopy-pad`, `wf-band`.

**What is wrong**
- `wrb` path (24.25, 2742.5 → TOPY) is one sheet at x 24.0–24.5. `head-subflash` lies **outboard** of it (x 23.5–24.0) from 2860 down.
- The spec note says "WRB lapped over it ≥ 75", but the geometry is the opposite:
  1. Water running down the WRB face meets the sub-flash's top edge.
  2. It runs behind the sub-flash, down the WRB behind the cant, to the tape.
  3. It reaches the frame top (2730) and the head block.
- `canopy-pad` R(9, 2800, 24, 3100) has `cuts: ["canopy-pad"]` on the sub-flash, so there are **three 160 mm holes** from 2800 to 2860.

**Exact fix**
- Split the WRB:
  - **`wrb-low`** `[[24.25,2742.5],[24.25,2796]]`: behind the cant, over the tape. This is the secondary plane.
  - **`wrb`** (upper) `[[23.25,2800],[23.25,2885],[24.25,2890],[24.25,TOPY]]`: laps **over** the sub-flash upstand by 80 (≥ 50 required by VBBL 9.27.3.8(4)(a); 13 FB15 asks 75).
- `head-subflash` top → **2880**, continuous. Delete its `cuts`.
- `canopy-pad` → R(**8.5**, 2800, **23.0**, 3100): it sits on the upper WRB, with its 4 × Ø10 screws set in sealant through the WRB, sub-flash and tape.
- `wf-band` inner face → x 23.0 between 2800 and 2890.

**Source:** SOURCED: VBBL 9.27.3.8(4)(a) via 13 FB15; 13 FB9/FB15 intent. INFERRED: the coordinates.

### M4 — MAJOR — The head drainage outlet is buried: wood fibre and the PT ledger sit directly on the sub-flash

**Parts:** `wf-band`, `canopy-ledger`, `head-subflash`, `head-cant`.

**What is wrong**
- `wf-band` bottom = `CTT(x) + 0.5` and `canopy-ledger` bottom = `CTT(x) + 0.5`. Both bear on the sub-flash's top face over x −94 → 23.5.
- Every litre the WRB plane delivers must pass under 80 mm of **hygroscopic wood fibre** and a 38 mm PT ledger with no drainage space:
  - the WF wicks it (capillary);
  - the PT ledger stays wet on its underside;
  - the sub-flash ponds.
- **Inconsistency.** The jamb base got a `jamb-cg-strip` (cellular glass 50) to keep WF out of splash (09 §9.1, S). The head, which receives the whole storey's drainage-plane water, got nothing.

**Exact fix**
- New **`head-drain-mat`**: 10 mm entangled-mesh drainage mat with a filter fleece, on the sub-flash over x −94 → 23.0, plus a black stainless insect screen folded over its outlet at x −94.
- `wf-band` and `canopy-ledger` bottoms → **`CTT(x) + 10.5`**.
- Under the WF use a **cellular-glass base course 50** (`band-cg-strip`, `[[-56,CTT(-56)+10.5],[23,CTT(23)+10.5],[23,CTT(23)+60.5],[-56,CTT(-56)+60.5]]`), matching the jamb. The ledger bears on 10 mm composite shims at 400 o.c., and its inclined screws into the glulam carry the load (13 FB20).
- Leave 5 mm clear between `cassette` top (2758) and `head-cant` underside. The cassette must not carry the cant (m3).

**Source:** SOURCED: 09 §9.1 (cellular-glass strip logic); 06 / 13 FB27 (screened outlet). INFERRED: the mat and the levels.

### M5 — MAJOR — The tray's house-side support loads a 0.8 mm pan over a 10 mm void; the slot-side clips hang from a 19 mm board edge

**Parts:** `tray-stools`, `tray-ledge`, `pan`, `sill-bearer`, `slot-screen`.

**What is wrong**
- **House side.** `tray-stools` (x −31.5..−26.5, 50 long at 300 o.c.) are "bonded on the pan floor over the channel house wall".
  - At that x the pan sits at about −81.6 with **air below it down to −92**. The skirt and course stop at x −20.
  - Wheelchair and foot loads go into an unsupported 0.8 mm sheet. It will crease onto the polymer-concrete wall, the bond will fail, and the tray edge will drop, which eats the 1 mm B651 reserve.
- **Slot side.** `tray-ledge` clips (vertical leg x 96.5, −40.5..−70) are screwed into the **front edge** of the Purenit bearer.
  - That edge is 19.1 mm high at x 98 (−54.5..−73.6); the clip overlaps it by 15.5 mm.
  - The bearer itself rests on adhesive pads on a pan that is not fixed down.

**Exact fix**
- `tray-stools` → move onto the **course-supported pan**: `[[-15,PANTOP(-15)],[-5,PANTOP(-5)],[-5,-39],[-15,-39]]`, base 50 × 40 (bonded, 2000 mm² ≈ 1 kN at 0.5 MPa long-term on the PU, INFERRED).
  - The tray then spans 155 mm to the channel's outer edge rail.
  - The stools stay discrete (50 at 300 o.c.), so the pan still drains.
- `tray-ledge` → **footed stools** on the pan: `[[76,PANTOP(76)],[84,PANTOP(84)],[84,-39],[76,-39]]`, bonded on the pan over the PU course. Nothing is fixed to the bearer edge.
- `slot-screen` → clipped between the footed stools at −46 (unchanged level).

**Source:** INFERRED (geometry and loads). SOURCED: 14 §3.3 #18–19 (intent: "nothing through the pan").

### M6 — MAJOR — The frame sill has no structural anchorage; the "cast-in" dam angle is a 1 mm sheet behind cork

**Parts:** `dam-angle`, `sill-block`, `sill-bearer`, `soilgas-up`, `slot-edge`, `back-fill`, `sill-foil`.

**What is wrong**
- 14 §3.3 #12 anchors the sill with "screws into the bearer only, plus 316 clips to the dam-angle above −30". But:
  - the bearer is held only by adhesive pads to a loose pan;
  - `dam-angle` (1.0, x 240.4–241.4) is screwed into **PU** at y −105, and 25 mm of `slot-edge` cork separates it from the slab, so it is not cast in at all.
- **Load.** Outward wind (DP 960 Pa on about 1.39 m tributary ≈ 1.3 kN/m at the sill, INFERRED), operating loads of a 310 kg sash, and the maker's install all need a positive tie to the slab or beam.

**Exact fix: make the angle the anchor**
- **`dam-angle`** → 316, **t 3**:
  - upstand `[[241.9,-5],[241.9,-110]]`, screwed to the course at −105 as now;
  - **slab leg** `[[241.9,-22],[300,-22]]`, with Ø10 × 50 headed studs at 300 o.c. cast into the slab (engineer: edge distance from the slab edge at 267).
- `soilgas-up` → stops at −23.5, butyl-taped to the underside of the leg.
- `slot-edge` cork split: R(243.65, −100, 266.65, −23.5) + R(243.65, −20.5, 266.65, −4).
- New **`sill-anchor`**: 316 Z-clips 2 × 40 at 600 o.c.
  - One leg is screwed into the block's interior face at y −6..−20, *through* `sill-foil` with screws set in butyl. The foil keeps its 34 bond.
  - The web runs at y −6..−4 over `back-fill`.
  - The other leg is bolted to the angle upstand's exterior face at y −6..−20, which is **above the pan-back top (−25)**, so nothing enters the pan.
- **Thermal.** The angle and clips are wholly warm-side (inside the PU and foil), so no f_Rsi penalty (INFERRED).
- **Ask ENERsign** for its anchorage spacing and loads (14 §10 Q3: not obtained).

**Source:** SOURCED: 14 §3.3 #4, #12 (the intent); 14 §0.3 "installation instructions … not obtained"; 11 G3 (DP 960). INFERRED: the loads and geometry.

### M7 — MAJOR — The interior head air/vapour seal is bonded over the motor housing

**Parts:** `head-tape-int`, `drive`, `head-gap-fill`, `head-ground`.

**What is wrong**
- `head-tape-int` runs up the frame's interior face (259.25) **over the `drive` face**, then across the drive top to the glulam corner (240.25, 2780.25), unsupported over x 240–259.
- The drive is a serviceable part: 25,000-cycle tested, with a 5–15-year service life (14 §6, §8, S). Every service cuts the air/vapour line.
- The motor also sits *outboard* of the seal, i.e. inside the installation joint, where condensation risk is highest.

**Exact fix**
- `head-gap-fill` and `head-ground` → end at **x 198**.
- `head-tape-int` → `[[215,2730.25],[200.25,2730.25],[200.25,2780.25],[238,2780.25]]`:
  - bonded 15 on the frame top;
  - a loop across the gap at x 200;
  - up the ground's interior face;
  - 38 onto the glulam soffit;
  - lapped to the jamb tapes (B1) at both ends.
- `drive` → R(**215**, 2730.5, 259, **2775**) on the frame top, room side of the seal, with a removable charcoal U-cover R(212, 2729, 262, 2779.5) clipped to the glulam soffit. Nothing is bonded to the motor.
- **Cables.** The 120 V supply enters through a sealed airtight grommet in the tape at the fixed-panel end (14 §6 routing).

**Source:** SOURCED: 13 FB12 (the intended path: frame interior → ground interior face); 14 §6 (≈ 45 mm room-side drive zone; service). INFERRED: the coordinates.

### M8 (F14 carried) — MAJOR — Door rating, safety glass and certificate status

**What is wrong**
- **No NAFS-17 / A440S1 rating** of the ENERsign flush sill was found (14 §2.4; ENS-NA S\*). VBBL 9.7.4.2(1) requires it (11 G1, S).
- **Hydrostatic head is short.** From the drained nosing (−12..−21) to the interior seal (track 0 / rail +5) there are only **12–17 mm**. 180 Pa needs 18 mm and 260 Pa needs 27 mm (11 §1, S). The rating therefore rests on the maker's pressure-equalised chambers, which are untested here (INFERRED).
- **Outer lite.** "6 mm HS/FT": **HS is not safety glass** (HS-SG S\*; 11 G10, S). Frit or acid-etched dots on #1 also need heat treatment.
- **Certificate.** PHI 1831sl03 expires **31 Dec 2026** (14, S).

**Fix (notes on `door-unit`, `glass-1..3`)**
- **Tender requires:**
  - (a) a NAFS-17/A440S1 test report for the **installed flush-sill configuration**, LC-PG20 minimum, water ≥ 180 Pa (west) / 260 Pa (east), air A3;
  - (b) as interim evidence, the EN 12208 class, which must be ≥ 7A (300 Pa);
  - (c) a renewed PHI certificate;
  - (d) CSA/cUL for the drive;
  - (e) an EN 15804+A2 EPD.
- **Fallback:** a field-tested installed assembly (Part 5 / alternative solution). Do not raise the sill.
- **`glass-1`** → "6 mm **FT** to CAN/CGSB-12.1, A460 dots #1, low-e #2".
- **`glass-2`** → "4 mm **HS**". Heat-treat the centre lite: a triple with two low-e coatings, partly shaded by the canopy and cassette, carries thermal-stress risk (INFERRED; maker's thermal-stress check).
- **`glass-3`** 8.76 lam ✓.
- **Sizing:** the maker sizes all lites to DP 960 (E1300 / CGSB 12.20). With 6/4/8.76 the outer lite takes about ⅓ of the load by stiffness (INFERRED); the deflection check is outstanding.

**Source:** as cited above.

### Minor findings

- **m1 — B651 dip reading (open).**
  - Table 1 (11 G13, S): > 13 mm must be ≤ 1:12. The lip −12 → rail +5 is a 17 mm local rise at 1:8.4.
  - Read as one change, it fails. Read as three changes (5 vertical, 11 at 1:8.4 ≤ 1:2, 5 vertical) within a 12 mm threshold, it passes.
  - Get the access consultant's written ruling now (14 Q2). If it fails, the options are a zero-track product or a maker-approved 316 bridge over the nosing (INFERRED).
- **m2 — WRB lap over the head tape is 57.5** (2742.5 → 2800); 13 FB11 asks ≥ 75. Fix: `head-tape-ext` top → 2820, with `wrb-low` from 2742.5 (M3).
- **m3 — Head-block underside and cassette clearance.**
  - `head-block` bottom (2690) is visible from the landing through the 30 mm slot between the cassette back (−32) and the frame face (0). Add a charcoal soffit closer, R(−32, 2688, 0, 2690), clipped to the cassette.
  - Give the cassette 5 mm clear of the cant (M4).
- **m4 — Picture-frame corners.**
  - `liner-frame-a` / `liner-jamb-a` tops at 2754 leave a 46 mm open notch below the canopy soffit (2800) at w −56..0. Cedar ends and strapping show there.
  - The liner foot at +5 leaves the plinth EPS end exposed at y −7..+5.
  - Fix: run the liners **−7 → 2800**, die them into the soffit, and turn the drip end dams inside them (13 FB16).
- **m6 — Canopy screws in the glulam.**
  - `canopy-plate` y 2800 → the lowest Ø10 screws sit about 20–30 above the soffit (2780), in the outer tension lamination, with one bracket at mid-span.
  - Engineer to check:
    - (a) edge distance at ≥ 4d from the loaded edge (O86 not read, INFERRED);
    - (b) header torsion from a 656 mm cantilever. My estimate is about 1 mm lateral at the head ground under full snow (INFERRED).
  - Move the brackets toward the posts (w ≈ 150 and 4650) if the canopy edge beam allows it (P16).
- **m7 — Canopy FB23 sub-flash.** "6 % bevel in a WF joint at ≈ 2976" exits **below** the cap upstand top (3080), i.e. behind it. Either move the joint to y ≈ 3095 with a 5 mm drip over the upstand, or delete FB23 and let the WRB plane drain to the (fixed) head sub-flash (M3/M4).
- **m8 — PT sill plate under the posts.**
  - `sill-plate` (PT 38 × 140) under the jacks will shrink about 1 mm if delivered wet, against 13 FB1/§3.4 asking for LSL.
  - Specify LSL, or PT KDAT ≤ 19 % MC, under the jacks (w −145..−12).
- **m9 — Foil bond to the pan upturn is 22** (−58 → −36), below 30. Extend `sill-foil` to `[[234.5,-2],[234.5,-36],[239.1,-36],[239.1,-66]]` (bond 30, down to the pan floor) and check the EPDM maker's minimum.
- **m10 — Exterior button and cassette cable penetrations.** They are only notes. Draw both grommets at the jamb, ≥ 150 above the pan end dam, on `jamb-ro-membrane` (B1).
- **m11 — Floor-line gap.** The `wrb` note says "folded loop", but the model is bonded flat across 3464–3467. Specify a 50 mm bond-breaker strip under the WRB at the gap. Differential movement is only about 0.6 mm (13 §2.3, INFERRED), so a loop is unnecessary.

---

## 5. Design proposals

### P14 — Tell-tale overflow into the water corner (bold; ties the threshold to the user's water corner)

Make the emergency route visible and beautiful instead of hidden.
- A 50 mm solid pipe from the channel's w = 0 end cap at **−60** (over the liner upturn) runs to the jamb-A granite basin.
- It discharges through a small bronze or granite spout face in the basin wall, below the downspout spout.
- In normal use it is dry. If the channel pipe or basket ever blocks, water appears in the basin long before the sill block (−54.5) or the interior barrier (−5) is reached.

**Effects:**
- **Maintenance:** the threshold drain announces its own failure.
- **Water:** the order becomes −105 standpipe < −92 sealed wall < −60 tell-tale < −54.5 block < −20 notch < −5 barrier.
- **Look:** a second, quieter water event in the water corner.
- **Carbon:** about 2 m of HDPE, negligible.

### P15 — One-stage factory sill cassette (bold; removes a field lap and a sequence step)

The `jamb-stem` concrete curbs (to +300) are poured before the slab, so the **sill RO is fixed to ±3 before the pour**. That removes the lap-2 reason for a two-stage pan.

A shop-made cassette, delivered in one or two lengths, replaces the field assembly:
- machined PU course;
- skirt;
- welded 316 pan with end dams and a 3 mm back upturn that *is* the anchor-dam angle (M6);
- soil-gas flange.

It is set on the beam before the pour, under a sacrificial PU cover board through framing.

**Effects:**
- One fewer butyl lap (pan-back to angle).
- The pan welds are done in the shop and leak-tested.
- The jamb end dams are made to the stem faces.
- **Risk:** damage during framing, managed with the cover board and an inspection hold point before the frame is set.
- Status: INFERRED. Confirm with a fabricator and ENERsign (14 Q3).

### P16 — A canopy that does not twist the 3 mm header

- **Preferred:** carry the canopy on **two brackets over the jamb posts** (w ≈ 150 and 4650), with a 4.5 m glulam or steel-angle torsion edge beam at the tip line inside the canopy depth (I).
  - The header then sees only end reactions near its supports, with no mid-span torque.
  - It removes one bracket's thermal bridge and its WRB penetration.
- **Lower carbon:** use 13's timber-outrigger variant (≈ 95 vs 180 kgCO₂e per opening, 13 §4.6, I) with the same two-point support.

### P17 — "One dark line" head (exterior look)

Today, from the landing, the head reads as a stack of about 373 mm: glass top 2572 → sash top rail → cassette 2608–2758 → cant/drip → soffit 2800 → fascia to 2945.

The proposal:
- drop the canopy soffit to **2762** so it bears visually on the cassette;
- extend the cassette face up as the soffit's inner return;
- conceal the head drip behind it.
- The 16 mm drip kick stays, set back to x −145, as a hidden drainage outlet at the M4 mat.

**Effects:**
- The stack becomes cassette + fascia ≈ **290 mm** of one charcoal plane, with the honey soffit running unbroken from the fascia to the glass line.
- The liners die into it (m4).
- **Check:** 9.27.3.8 still exempt (soffit within ¼ of 656, 13 §4.6, S); cassette service from below.

### P18 — Non-metal threshold strip (system version of M2)

- **Outside:** the maker's aluminium nosing and the granite tray.
- **Inside:** a 4 mm compact-laminate strip (or 8–10 mm thermally modified ash) colour-matched to the frame's interior.
- **Effects:**
  - f_Rsi 0.645 → 0.80–0.83 (2D-FD);
  - −4 kgCO₂e/m;
  - quieter underfoot;
  - removable for the 30-year track renewal, as the plate was.

### P19 — Thermal check list for lap 4 (updates P12)

**Run THERM or Flixo on:**
- (a) T with M2 and M6;
- (b) H with the M3/M4 mat and base course;
- (c) a **horizontal jamb section** at y 150 (stem zone) and y 1200 (posts), with the B1 gap and tapes.

**Report:**
- f_Rsi at the floor strip, the sash corner and the jamb return;
- ψ_install for each.

**Accept** ≥ 0.70 everywhere except the frame's own certified threshold profile.

---

## 6. Score and what would raise it

**Score: 7.0 / 10** (lap 1: 5; lap 2: 6.5).

**What holds it back:**
- **B1:** the jamb is not a joint (zero gap, no tapes, no membrane for the end dam).
- **M1:** the overflow order is wrong; the foundation joint is still the first spill.
- **M3 / M4:** the head drainage plane is reverse-lapped and its outlet is buried under wood fibre.
- **M2:** the stainless floor plate is the coldest interior line (0.645).
- **M5, M6, M7:**
  - the tray is carried on an unsupported pan;
  - there is no frame anchorage;
  - the interior seal runs over the motor.
- **M8:** no NAFS rating for an imported flush sill; outer lite not specified as FT; PHI certificate expiring.

**Top 3 changes:**
1. **Close the jamb (B1 + M6).**
   - A 12 mm RO joint at w −12 with a liquid-applied RO membrane over the welded pan end dam (+84).
   - Exterior and interior tapes, with the sill foil turned up 100 under the interior tape.
   - A 3 mm 316 anchor-dam angle with a slab leg at −22 and Z-clips above the pan upturn.
   - Draw the w = 0 corner.
2. **Fix the three water exits (M1 + M3 + M4).**
   - `channel-seal` over the −92 joint, a standpipe at −105, and a tell-tale overflow at −60 to the jamb-A basin (P14).
   - Split the WRB so the upper sheet laps 80 over a continuous head sub-flash.
   - Lift the WF and ledger 10 mm onto a drainage mat and a cellular-glass base course.
3. **Warm, sound sill and serviceable head (M2 + M5 + M7).**
   - Non-metal floor strip (f_Rsi 0.645 → 0.80–0.83).
   - Tray stools on the course-supported pan at x −15..−5 and 76–84.
   - Interior head tape re-routed behind a room-side drive with a removable cover.

---

**Sources consulted on the web this session (S\*):**
- [Cardinal Glass, heat-strengthened glass](https://www.cardinalcorp.com/glossary/heat-strengthened-glass/)
- [BC Building Code Division B 9.6 (bcpublications)](https://free.bcpublications.ca/civix/document/id/public/bcbc2012/ep001029.6)
- [idighardware, "decoded: thresholds"](https://idighardware.com/2024/08/decoded-thresholds/)
- [WBDG / ABA 404.2.5 thresholds](https://dosobo-access.wbdg.org/aba-chapters/figure/404-2-5-thresholds/)
- [Phius D-100181 (23 Dec 2025)](https://www.phius.org/sites/default/files/certificates/door/D-100181_23-Dec-2025.pdf)
- [BIMobject, ENERsign primus 755 lift & slide](https://www.bimobject.com/en-au/enersign/product/enersign-primus-755-lift-slide-oxxo)

**Local script:** `therm_t3.py`, run on `detail02-v3.json` in the session scratchpad (2D-FD, §2.4).
