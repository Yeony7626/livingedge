# Review R1: threshold and glazing envelope (Detail 02, lap 2)

**Reviewer:** R1. **Scope:** junction T (threshold), junction H (head), and the glazing unit and frame.
**Inputs:** `detail02-v2.mjs` / `.json`, `changes-v2.md`, `report.md`, `metrics.md`, the lap-2 PNGs (T, H, F, S), the v1/v2 compare PNGs, and both renders. Also my own lap-1 review (`d2-lap1/review-R1-threshold-glazing.md`).
**Research checked:** 11 (§1–§10), 12 (§3.4–3.5, §6.1–6.5), 06 B (B4–B9, B21, B22, B.3.1).

**New sources this session.** Each is tagged **(S\*)** because only a search-engine summary was read:
- **ARM-500:** Armatherm *500 Series Data Sheet V3*, GBA-hosted PDF. The text could not be extracted, so the values come from the search summary.
- **A460-S:** FLAP Canada (bird-safe product guidance citing CSA A460) and the UBC *Policy tiers* v1.1, Jul 2024 (CSA A460:19 applied from 0 to 16 m).
- **CISC-S:** beamdimensions.com CISC tables for W250×33 and W250×45.
- **LOE-TG:** Loewen *Technical Guide* (fibreglass threshold with integrated drainage).

**Tags:**
- **SOURCED** = in a research file (cited by file and section) or a source above.
- **INFERRED** = my geometry or calculation.
- **2D-FD** = my own 2D thermal screening, described in §2.3. It is INFERRED and indicative only.

**Datum:** x = 0 at the sliding frame's exterior face, exterior negative; y = 0 at FFL; mm.

---

## Lap-1 findings status

| # | lap-1 severity | v2 claim | re-score | evidence in v2 (coordinates) |
|---|---|---|---|---|
| F1 pan has no outlet | blocker | done | **fixed** | The pan nose runs (−20, −82.0) → (−38, −83.1) → (−38, −103), inside the channel, 8.5 clear over the house-wall top at −92 and 6.1 clear of its inner face. The skirt laps the damp-proofing by 98 (−195 → −293). **But see N3:** lowering the wall created an overflow route into the foundation joint. |
| F2 air break pan ↔ track | major | done | **fixed** (minor residue, N13) | `sill-foil` runs track web (180.5, −2 → −20.5) → grout top → back leg (230.5, −20.5 → −45). Bond widths are 18.5 and 24.5. The "two sealant beads under the track" note is still there and still has no substrate. |
| F3 back-dam order, lap, wedge | major | done | **partly fixed** → N6 | Rigid pan ✓; wedge 10.1 → 25.2 ✓; poly bonded 85 mm to the back leg (−100 → −15), not "100+". The sequence note contradicts the geometry: the pan must go in before the slab, but a welded pan must be measured after framing. |
| F4 slab-edge bypass | major | done | **partly fixed** → N2 | Cork 232–257 decouples the slab (f_Rsi 0.87 at the slab edge, 2D-FD). The bypass has moved into the grout and stone apron: the apron reads f_Rsi **0.65**. |
| F5 head air break | major | done | **partly fixed**, now minor | The exterior route holds: three-zone tape against the membrane leg at x 25–100. `head-airseal` R(170, 2730, 180, 2742.5) touches only the tape and the head track. It does not reach the packer (ends at x 155) or the gyp (x 167.7). No three-zone tape is made 170 deep. |
| F6 19 mm soffit void | major | done | **fixed** | `band-ei` runs 2748 → 3022 and `ei-top` 3022 → 3257 in the bays; no void. Small residue: wind-washing (N12). |
| F7 lintel too flexible | major | done | **partly fixed** → N5 | It is steel now, but the drawn section is 128 × 252. A W250×39 is about 147 × 262. There is no joist nailer and no fixing ground for the band. The 3 mm check leaves out the green roof's wet/dry swing. |
| F8 head RSI | major | done | **fixed** (metric caveat, minor) | 130 mm stone wool alone gives 4.03 ≥ 3.85 ✓. The 7.05 in `metrics.md` is a parallel-path figure. Steel flanges spread heat sideways, so the isothermal-planes bound (≈ 4.06) is the honest number. |
| F9 UK course product | major | done | **fixed** | PU 251 × 100 (Armatherm 500 class). ARM-500 grades: 500-150 is 560 psi = 3.9 MPa, k 0.32 Btu·in = λ 0.046. 500-200 is 1100 psi = 7.6 MPa, λ 0.056. The material is closed-cell and does not absorb water (S\*). |
| F10 head flashing | minor | done/note | **partly fixed** | Fall is 6.0 % ✓; drip 10 past the cedar ✓. "Clips at 600 under the leg" cannot be built, because nothing sits under the leg. `band-ei` was not cut to bear on the flashing. The steel upstand is now known to be the main head thermal bridge (N4). |
| F11 track anchorage | minor | note | **not fixed** (direction worse) | The note says "anchored through the drillable PU board per maker". That pierces the pan floor, skirt and wedge below the water line, which is exactly what F11 asked to avoid. |
| F12 track weeps | minor | done | **partly fixed** | The tubes fall 2 % ✓. Their inner end is still blind in the grout at x +40, y −49, 7 below the track bottom, with no riser to any track outlet. |
| F13 rise / haunch | minor | done | **fixed** | Nosing +5 → −6 at 1:2, grate −6; haunch R(−171.5, −193, −22, −130) on EPS and drain stone ✓. **But the new rails break the rise (N1).** |
| F14 glazing / rating spec | minor | partial | **not fixed, now major** | No NAFS or A440S1 rating and no USI is stated. The panes went **thinner** (4 / 1.3 / 4), which is likely undersized at about 2.4 × 2.6 m and DP 960. |
| F15 spray foam / lintel finish | minor | done | **fixed** | No foam. Gyp R(155, 2742.5, 167.7, 3022). |
| F16 membrane permeance, dog-ears | minor | partial | **partly fixed** | Vapour-open ✓. `membrane-top` is still in the bays only, with no joist dog-ears and no lap onto the deck (06 B8). |
| F17 grate | minor | done | **partly fixed** | Slots ≤ 6.5 ✓, seat ✓, screen ✓. Slip-resistant top, clip lock and lift-out lengths ≤ 1 m are not specified. Outer bearing is 4 mm (N8). |
| F18 metric labels | minor | done | **fixed** | — |
| F19 frieze fixing | minor | done | **fixed** (frieze removed) | — |
| F20 operating force | minor | open | **not fixed** | — |
| P1 integrated threshold | proposal | (not listed) | **partly adopted** | Stainless pan, seat, foil and slot-edge ✓. The interior profile became a concrete "stone apron", which is the cold strip in N2. A demountable track is not adopted. |
| P2 PU course | proposal | (not listed) | **adopted** | — |
| P3 steel lintel | proposal | (not listed) | **adopted** (geometry wrong, N5) | — |
| P4 concealed head, two-piece flashing | proposal | (not listed) | **no disposition** | 2D-FD now shows it is the head's biggest thermal gain (N4, P9). |
| P5 west shading / bird glass | proposal | open / note | **open / adopted** | CSA A460 markers on #1 at 50 × 50 matches A460-S. |
| P6 coldest line | proposal | open | **screened here** (§2.3) | Two lines fall below 0.70. |

**Process note:** `changes-v2.md` gives no disposition for P1–P4. Please add them.

---

## 1. Score: **6.5 / 10** for threshold + glazing performance and buildability (lap 1: 5)

v2 is a real step forward:
- The pan drains into the channel.
- The air and soil-gas line runs from poly to back leg to sill foil to track.
- The walking edge is held to the door by a seat on the nosing, not to the settling channel.
- The head has a stiff, creep-free lintel, 130 mm of continuous stone wool with no void, and a drained, screened, top-closed band cavity.
- The head drip lands in the channel: the flashing drip at x −154.6 falls on the grate (x −165.5..−31.5), which is good.

What holds it back:
1. **Two interior lines are below the hygiene limit.**
   - 2D-FD gives f_Rsi **0.65** on the 50 mm stone apron behind the track (N2). The grout, wedge and apron are one concrete block, open to the exterior at x 0 and to the room on top. The cork strip did not touch this path.
   - It gives f_Rsi **0.67** on the gyp at the lintel's bottom flange (N4). The steel head-flashing upstand touches the steel flange tip through a 0.5 mm membrane and carries heat out under the insulation.
2. **The new stainless rails make the threshold 16 mm high** above the grate (rail top +10). That fails CSA B651's 13 mm (N1).
3. **Blocked-channel water has an unsealed route into the foundation joint at −92** (N3). The pan back dam (−15) sits below the channel's flood level (−6).
4. **Buildability gaps:**
   - pan before the slab versus measuring it after framing (N6);
   - the lintel is not a real W250×39 and has no fixing grounds (N5);
   - the jamb–sill corner is unresolved (N7).
5. **The glazing spec is short:** no NAFS water rating for the installed flush sill, and 4 mm lites on about 6 m² panels (F14).

None of these needs a new concept. Most fall out of one move: put structural PU, not concrete, everywhere between the pan and the frame and floor finish, and drop the track 5 mm. That and the head flashing change are worth about two points.

---

## 2. Control-layer pen test (v2 as modelled)

### 2.1 Threshold (T)

| layer | path through the modelled parts | breaks (→ finding) |
|---|---|---|
| Water shedding | glass → `sash` (bottom +10) → **`track-rails` R(40, 5, 46, 10)** → `track` top +5 → `nosing` 1:2, (0, +5) → (−22, −6), flat to −26 → 4 mm slot (x −31.5..−27.5) → `grate` (−165.5..−31.5, top −6) → `grate-screen` (−26.25) → `channel` (invert −120) → silt box → rill. Paving −6 at the channel, falling 1:60 away ✓. Head drip falls at x −154.6, on the grate ✓. | The rail is the highest point at **+10**: 16 above the grate, 10 above the interior FFL, with two 5 mm vertical edges (**N1**). |
| Drainage plane | track leakage → grout/pan interface → `pan` 6 % from (231, −66.9) to (−20, −82.0) → nose → drip leg to −103 in the channel ✓. Secondary: `pan-skirt` under the pan, down the course face to −193.5, lapped 98 over `dampproof` ✓. | `track-weeps` are blind at x +40 (**F12**). The channel house-wall top (−92) meets the skirt at an **unsealed** 1 mm joint, with 28 mm of channel freeboard before overflow (**N3**). The flood level at the grate (−6) is above the `pan-back` top (−15), so the foil bond becomes the dam (**N3**). The anchor note pierces the pan floor (**F11**). |
| Air | room → `slab` → `soilgas` (−100.1) → up the back leg's interior face at x 231.9 (−100 → −15, 85 mm butyl) → `pan-back` (stainless, continuous) → `sill-foil` (bonded −45 → −20.5 on the leg's exterior face; across the grout top; up the track web −20.5 → −2) → `track` → rails/gaskets → `sash` | Continuous in 2D ✓. Bond widths 24.5 on steel and 18.5 on the track (**N13**). The jamb corners are not drawn (**N7**). |
| Soil gas | `stone` → beam/EPS joint → poly → back leg | ✓ (radon note on `stone`). |
| Vapour | poly below the slab; the slab dries up; the grout dries outward through the open slot face | ✓ |
| Thermal | EPS (x ≥ 232, y −200..−100) → corner → `slot-edge` cork (232–257, −100..−15) → `edge-seal` (−15..0). Separately: `course` PU (−20..231, −193..−93), 93 mm overlap with the EPS ✓; `beam-insul` meets the course's outer bottom corner ✓. | **The concrete wedge, grout and stone apron (x −20..231, y −93..0) form one mass.** It is exposed to the exterior at x 0 (y −80..−20, under the nosing) and to the room at the apron top (x 181–231) and the track's interior part. Apron f_Rsi 0.65; the frame sits on concrete (**N2**). |
| Capillary | PU closed-cell (ARM-500 S\*), skirt, pan, clear stone | ✓ |
| Support | sash → rails → track → shims/grout → pan → wedge → PU → beam ✓. Grate: house edge 8.5 mm on `grate-seat`, which hangs from the fibreglass `nosing` (fixing not stated); outer edge **4 mm** on a 6 mm polymer lip | **N8, N9** |

### 2.2 Head (H)

| layer | path | breaks |
|---|---|---|
| Water shedding | roof → `edge-metal` → `box-gutter` ✓ → wind-blown rain under the raked soffit → `band-cedar` (−144.6..−125.6, 2752–2875) → open cavity in the bays (−125.6..−106.6) → `band-screen` (2749.75) → `head-flashing` (24 ga, 6.0 % from (24.2, 2746) to (−149.6, 2735.6), kick to (−154.6, 2730.6)) | ✓ geometry. The 155 mm leg is unsupported, and the clips have nothing to fix to (**F10**). |
| Drainage plane | `head-membrane` (x 24.75, 3022 → 2742.25) → `head-stripin` (x 23.64, 2760–2900) over the upstand (2746–2830, 84 ✓) → flashing | The strip-in's top edge at 2900 is a reverse lap on the membrane, so it needs termination mastic. The membrane runs behind and below the upstand bend into the rough head, so water behind the upstand exits onto the tape top, not the flashing (**N11**). |
| Air | `avb` (3273–3276) → deck ply → `blocking` (caulked 4 sides) → `membrane-top` (x 24.75, 3022–3257, **bays only**) → `head-membrane` → under the packer to x 100 → `head-tape` (0–170, 2730–2742) → `head-track` → gaskets | No joist dog-ears and no lap onto the deck underside (**F16**). The interior seal `head-airseal` is not connected to the packer or the gyp. The tape size is not a real product (**F5**). |
| Vapour | deck AVB only; the head membrane and band wind barrier are vapour-open | ✓ |
| Thermal | polyiso (x ≥ −100) → deck → `ei-top` (bays) → `band-ei` 130 → flashing/tape → frame head | **The steel flashing upstand (x 23.9–24.5) lies against the steel bottom-flange tip (x 26)** through 0.5 mm of membrane and runs out under the insulation to the drip. Gyp f_Rsi 0.67 at y 2774 (**N4**). `ei-top` faces the vented soffit with no wind barrier above 3022 (**N12**). |
| Structure | joists → bare steel top flange → `lintel` (drawn 128 × 252) → `packer` → head track | Not a W250×39; no joist nailer; no exterior fixing ground. The 3 mm check leaves out the green-roof swing (**N5**). |
| Fire | no foam; gyp on the lintel | ✓ |

### 2.3 2D thermal screening (2D-FD, INFERRED, indicative)

**Method.** I wrote a short script that rasterises `detail02-v2.json` at 2.5 mm:
- **Slices:** w = 900 for T, and w = 700 (a bay with no strap) for H.
- **Conductivities:**
  - concrete 2.0–2.3, grout 1.6, wedge 1.4, PU 0.054, graphite EPS 0.032, cork 0.040, stone wool 0.034–0.036, PT 0.13, steel 50, stainless 16;
  - thin metal sheets keep their in-plane conductance λ·t;
  - the frame is an equivalent λ 0.12, with a sensitivity run at 0.08–0.20;
  - the IGU is an equivalent of Ug 0.7.
- **Surface resistances:** exterior 0.04; interior **0.25** (the ISO 13788 / PHI f_Rsi convention).
- **Solver:** PCG, residual 1e-9.
- **Ground:** a sensitivity run on a 5.0 × 1.95 m domain changed f_Rsi by ≤ 0.01.
- **Status:** a screening tool, not a THERM substitute (lap-1 P6). The numbers are relative.

| case | interior surface, minimum f_Rsi (location) | heat flow from the room, W/(m·K) |
|---|---|---|
| **T v2 as drawn** | apron **0.648** (x 194); edge-seal 0.698; slab edge 0.865; track interior 0.635 (frame-dependent) | 0.714 |
| T-A: grout + apron behind the track (x 180–231) → cork | apron 0.823 | 0.657 |
| T-B: A + grout under the track → PU bearer | apron 0.880; track interior 0.678 | 0.592 |
| **T-C: B + wedge → PU** (course machined to the fall) | apron **0.922**; edge-seal 0.920; track interior 0.690 (0.76 with frame λ 0.08) | **0.551** (Δ −0.16) |
| **H v2 as drawn** | gyp at the bottom flange **0.666** (167.5, 2774); gyp top 0.753 | 0.667 |
| H-C: 19 mm timber spacer between the flange and a steel flashing | 0.760 | 0.597 |
| H-A: two-piece flashing (membrane inboard, metal drip only outboard of the insulation) | 0.809 | 0.552 |
| **H-B: A + insulation brought down in front of the frame head** (P9) | **0.843** | **0.519** (Δ −0.15) |

**What the numbers mean (INFERRED):**
- At −7 / 20 °C, f_Rsi 0.65 gives a surface at **10.5 °C**. That condenses at about 54 % room RH and passes the 80 % surface-RH mould line at about 43 % RH.
- f_Rsi 0.67 at the head gives 11.0 °C.
- Both are below PHI's 0.70 and Marvin's frost warning applies (11 §5.4, SOURCED).
- The T-C plus H-B fixes together cut about 0.31 W/(m·K), roughly 1.5 W/K per 4.8 m opening. That adds about 14 % to the door's own U·A. The energy saved is small (about 100 kWh/yr); the reason to fix it is comfort and condensation.

---

## 3. Buildability, sequence, tolerances, accessibility, code

| check | v2 | verdict |
|---|---|---|
| Sequence: pan / poly / slab | The poly is taped to `pan-back` and the cork stands against it, so the pan must go in **before** the slab pour. A welded pan with 150 mm end dams must be **field-measured to the framed rough opening**. The note "pan set and welded, slab poured, poly … taped" cannot be done, because the poly is inaccessible after the pour. | ✗ **N6** |
| Sequence: track | Track on shims → foil → grout under a foil already spanning x 180–230 → apron on a 1 mm foil | Workable only if the foil's horizontal leg is folded down **after** grouting. The 20 mm stone strip on a 1 mm foil will rock. Replaced in N2. |
| Track level ±1 mm (MAR, 11 T10) | shim space 27.5 (back) / 38.4 (front) ✓ | ✓ |
| Grate edge tolerance | house edge fixed to the nosing ✓; outer edge 4 mm bearing | minor **N8** |
| Head gap | 12.5 ± lintel 3 mm, so the tape works over about 9–15 mm | tape size must suit (**F5**) |
| **CSA B651 5.2.6 / Table 1** (11 G13, SOURCED) | interior FFL 0 → track +5 → **rail +10**; grate −6 → rail +10 = **16 mm** | ✗ **N1** |
| B651 4.3.4 gratings (11 G13) | slots ≤ 6.5 parallel to the door; 4 mm nosing gap ✓ | ✓ |
| Landing slope | 1:60 ✓ (≤ 1:50) | ✓ |
| Operating force (B651 4.2; 11 Q9) | not stated | **F20** |
| VBBL 9.7.4.2.(1): NAFS + A440S1 (11 G1) | no rating stated. Lift-and-slide has no Limited Water route (11 G7, S\*), so it must carry a numeric water rating **for the installed flush sill** (11 §1) | ✗ **F14** |
| BCBC18 Table C-5 (via 11 G3) | DP 960 / PG20 / 180 Pa; 260 Pa east (11 §7) | not specified (F14) |
| Part 10 USI (11 G8) | ≤ 1.22 prescriptive / 1.44 performance; not stated | F14 note |
| Safety glass 9.6.1.4 (11 G10) | "safety glass" ✓ | ✓ |
| Forced entry 9.7.5.1 (11 G11) | pin lock ≥ 9 mm not stated | F14 note |
| Head flashing 9.27.3.8 (11 H10) | provided ✓. The eave edge is at 3086 against a head at 2730, so the head is outside the ¼-rule, and the flashing is required and present. | ✓ |
| CSA A460 (A460-S, S\*) | markers on #1 at ≤ 50 × 50 ✓; zone 0–16 m covers the whole door | ✓ |
| Product reality | A fibreglass lift-and-slide threshold exists (Loewen fibreglass threshold with integrated drainage, LOE-TG S\*; 1½ in flush track, 11 §2.2 S). Its flush-sill NAFS value is not published (11 Q3). | confirm with the maker |

---

## 4. Findings

Severity counts for open items:
- **New:** 0 blockers, **7 major** (N1–N7), **6 minor** (N8–N13).
- **Carried from lap 1:** **1 major** (F14) and **8 minor** (F5, F8 metric, F10, F11, F12, F16, F17, F20).
- **Total: 0 blockers, 8 major, 14 minor.**

N1, N2, N3 and N6 interlock. The **revised threshold geometry** they add up to is tabulated after N6. N4 and N5 are tabulated after N5.

### N1 — MAJOR — The stainless running rails raise the threshold to 16 mm (fails CSA B651)

**Parts:** `track-rails`, `track`, `sash`, `nosing`.

**What is wrong**
- `track-rails` R(40, 5, 46, 10) stand 5 mm **on top of** the track top (+5). The highest point is +10.
- From the grate (−6) that is a **16 mm** rise, over the 13 mm limit.
- On the interior there are two stacked 5 mm vertical edges. The second one (rail) is crossed whenever a panel is open.
- 11 §3.1 sets "top of track/sill +5" as the **exposed** height (MAR-ULS 5 mm). In a real flush sill, the +5 is the rail top.
- This was introduced in v2 (v1 had no rails).

**Exact fix**
- `track` → R(0, −42, 180, **0**): a 42 mm body with its top flush with FFL. The shim space stays 27.5 at the back and 38.4 at the front (MAR 25 ✓). Loewen's flush track is 38 mm (11 §2.2, S), so a 38–42 mm body is realistic.
- `track-rails` → R(40, **0**, 46, **5**).
- `sash` → R(15, **5**, 85, 115). Glass from y 55, or keep the head and add 5 mm of glass.
- `nosing` → `[[0,0],[-12,-6],[-26,-6],[-26,-20],[0,-20]]`: 1:2 from 0 to −6 (6 mm), then flat.
- **Result:**
  - grate −6 → track top 0 (bevelled) → rail +5 (5 mm vertical, ≤ 6 ✓): 11 mm in total ✓.
  - Interior: flush to FFL, with only the 5 mm rail.

**Source:** SOURCED: B651 5.2.6 and Table 1, VBBL 3.8.3.6.(5) (11 G12–G13); MAR-ULS 5 mm (11 §3.1); Loewen 1½ in track (11 §2.2). INFERRED: the geometry and the reading that 6 bevelled plus 5 vertical is acceptable. Confirm with the B651 figure for combined changes.

### N2 — MAJOR — The grout, wedge and stone apron bypass both the cork strip and the frame's thermal break

**Parts:** `grout`, `wedge`, `sill-apron`, `edge-seal`, `track`, `course`.

**What is wrong**
- Concrete fills x −20..231 from the course top (−93) up to the track (−42), and behind the track up to FFL (apron x 181–231).
- That block is open to the exterior on its front face: the slot under the nosing, x 0, y −80..−20.
- It is open to the room through the 50 mm apron and the track's interior part.
- The cork (x 232–257) only isolates the **slab**.
- 2D-FD: the apron has f_Rsi **0.65**, the edge-seal 0.70 and the track interior 0.64. All are below or at the 0.70 PHI line, robust across frame λ 0.08–0.20 (§2.3).
- The frame's certified threshold f_Rsi (0.74–0.76, 11 §2.3) cannot be reached while its underside sits on concrete that is open to the exterior.
- 11 T9 put the thermal block **directly under the track**, "top aligned with the slab-edge insulation line". 12 §6.2 put the course top at −67, which is the slot floor.
- My own lap-1 F3 fix lowered the course to −93 and added a 10–25 mm concrete wedge. That made this worse. I withdraw it in favour of the fix below.

**Exact fix: "warm sill", PU everywhere between the pan and the frame and finish (2D-FD case T-C)**
- `course` → machined structural PU with the 6 % fall on top, `[[-20,-193],[231,-193],[231,-67.8],[-20,-82.9]]`, top = W(x). **Delete `wedge`.** Armatherm boards are bonded and machined (ARM-500, S\*).
- `grout` → **`track-bearer`**: PU 500-200 class (7.6 MPa, λ ≈ 0.056, S\*), `[[0,-80.38],[180,-69.55],[180,-42],[0,-42]]`.
  - It is levelled on composite shim packs at the track bridges (300–600 o.c., 11 T10).
  - The gap under it, 3–5 mm, is injected with a non-shrink PU or epoxy bedding, so the track has continuous support.
- New **`back-fill`** behind the track: cork, or PU 500-150, `[[180.5,-69.55],[230.5,-66.5],[230.5,-21],[180.5,-21]]`.
- `sill-apron` → **`sill-cover`**: PU R(181, −20, 231, −4) plus a **4 mm 316 or bronze plate** R(181, −4, 231, 0), screwed to the PU. This is the "interior floor-connection profile" of lap-1 P1.
- `sill-foil` stays, but bonded on primed PU. Extend its back-leg bond to 40 mm: `[[180.5,-2],[180.5,-20.5],[230.5,-20.5],[230.5,-60]]`.

**Result:** apron f_Rsi 0.92, edge 0.92, track interior 0.69–0.76; heat flow −0.16 W/(m·K).

**Carbon (INFERRED):**
- It removes about 13,700 mm² of concrete (−1.5 kgCO₂e/m).
- It adds PU: +8 to +16 kgCO₂e/m at 4 kgCO₂e/kg and 160–320 kg/m³.
- Using cork for `back-fill` cuts about 3 of that.
- About +2 % of the 662 total, for comfort and condensation rather than energy.

**Fallback (minimum).** Case T-A, cork behind the track only, gives apron 0.82. But the track interior gets **colder** (0.61), so B or C is needed for the frame itself.

**Source:** SOURCED: 11 T9, §5.1 thermal row, §5.4; 12 §6.2; ARM-500 (S\*). INFERRED: 2D-FD and the geometry. Confirm in THERM (11 Q4, 12 Q4).

### N3 — MAJOR — Blocked-channel water: the overflow goes into the foundation joint, and the flood level is above the back dam

**Parts:** `channel`, `pan-skirt`, `haunch`, `pan-back`, `sill-foil`, silt box (note).

**What is wrong**
- With the house wall at −92 and the channel floor at −120, the channel has **28 mm** of freeboard.
- Above that, water spills into the slot zone, where the 1 mm channel-to-skirt joint is **unsealed**. It runs down the skirt face to the beam insulation and drain stone at −193..−320.
- That is the foundation drainage zone that 12 §6.4.4 keeps clear.
- If the silt box blinds, the slot floods up to the grate (**−6**), which is above the `pan-back` top (**−15**). Only the foil bond (to −2 on the track web) then keeps water out of the slab edge.
- 11 §5.3: this drain is "clogging-limited, not capacity-limited". The shrub and grit make blinding the expected failure.
- My lap-1 F1 fix created the low wall without closing this route.

**Exact fix**
- New **`channel-seal`**: compatible liquid flashing with fleece (PMMA if the skirt is not bituminous), or a butyl-backed EPDM strip with a 6 mm movement loop. t 2, path `[[-21.5,-85],[-21.5,-91],[-32.5,-91],[-32.5,-112]]`.
  - It runs from the skirt face, across the house-wall top and 20 mm down its inner face.
  - The pan nose clearance becomes 6.5 mm.
- **Silt box with a bypass weir:** crest **−95** (3 mm below the house wall), straight to the rill. A blinded basket can then no longer raise the channel above −95. The rill falls to a rim at −122, well above the garden's maximum ponding of −250, so it cannot back up.
- Add a rodding eye or second outlet at the far end of the channel (11 T17, GG47).
- Note on `channel`: *"Design flood level in the slot ≤ −95. Clean the screen and basket twice a year."*

**Source:** SOURCED: 11 §5.3, §5.6; 12 §6.4.4; DDH19 back-flow (11 §5.5). INFERRED: the levels and the weir.

### N4 — MAJOR — The steel head-flashing upstand touches the steel lintel, the dominant head thermal bridge

**Parts:** `head-flashing`, `lintel`, `band-ei`, `head-stripin`.

**What is wrong**
- The 24 ga upstand (x 23.9–24.5, y 2746–2830) is separated from the bottom-flange tip (x 26, y 2770–2782.5) only by the 0.5 mm `head-membrane`.
- The flashing then runs 155 mm out under the insulation to the drip, with its underside in exterior air from x ≈ 0.
- The steel section carries interior heat to it. 2D-FD gives the gyp f_Rsi **0.67** at the flange height and 0.75 at the top flange.
- This is lap-1 P4's "minor bridge". It is not minor.

**Exact fix: two-piece flashing (case H-A, v2 coordinates; shift by −19 if N5 is adopted)**
- New **`head-cant`**: tapered PT plywood 12, path `[[23.4,2752],[-106.6,2744.2]]` (6 %), screwed to the packer face through the membrane. Its underside is 2.6 mm above the head-gap tape at x 0.
- New **`head-subflash`**: self-adhered membrane t 1, `[[23.89,2830],[23.89,2758.5],[-107.0,2750.6],[-107.7,2745]]`.
  - It replaces the steel upstand.
  - It runs under `head-stripin`, which laps 70 onto `head-membrane` as now, then over the cant and down over the drip's upstand.
- `head-flashing` → a short **metal drip only**, 24 ga charcoal, hemmed: `[[-107.2,2751],[-107.2,2744.6],[-149.6,2742.1],[-154.6,2737.1]]`.
  - The upstand is screwed to the cant's outer edge (timber, not steel), and the sub-flash laps over it.
  - The drip is still 10 past the cedar.
- `band-ei` bottom follows the sub-flash: `[[-106.6,2751.1],[23.4,2758.9],[23.4,3022],[-106.6,3022]]`. The band now bears on the cant, which also fixes F10's unsupported leg.
- **Result:** gyp 0.81, −0.115 W/(m·K). With P9 (insulation down over the frame head): 0.84, −0.15.
- **Cheaper partial:** keep the steel flashing but add a 19 mm timber face between the flange tips and the upstand (needed anyway, N5). That gives 0.76 and −0.07.

**Source:** SOURCED: 11 H9–H10 (align the insulation; flashing geometry); 01 `req.flashing-geometry` via 11. INFERRED: 2D-FD and the geometry.

### N5 — MAJOR — The lintel is not a W250×39 as drawn; there are no fixing grounds; the 3 mm check is incomplete

**Parts:** `lintel`, `lintel-infill-2`, `packer`, `joists`, `blocking`, `band-strap`.

**What is wrong**
- **Section.** The drawn section is 128 wide × 252 deep with 12.5 flanges. A W250×39 is about **147 × 262**, tf 11.2, tw 6.6, Ix 60.1 × 10⁶.
  - Neighbouring CISC sections confirm the flange width: W250×33 is 146 × 258 and W250×45 is 148 × 266 (CISC-S, S\*).
  - My own lap-1 text gave d 252, which was wrong. The x 8..155 span I gave was right.
  - The real flange does not fit the 130 mm zone between the membrane (x 25) and the gyp (x 155).
- **Joist bearing.** The joists bear on bare steel, so they cannot be toe-nailed and the note's uplift ties have nothing to fix to.
- **Band fixing.** The exterior face of the lintel is two 11 mm flange edges with stone wool between them. There is nothing to screw the strapping or the band through 130 mm of insulation into.
- **Deflection.** W250×39 under snow alone gives Δ ≈ 2.65 mm (lap-1 F7 basis, INFERRED). The extensive roof's wet/dry swing (about 0.65 kPa × 2.65 m trib, INFERRED) adds about 1.2 mm, giving about **3.8 mm > 3 mm** (11 H1).

**Exact fix**
- `lintel` → W250×39: flanges x **7.0–154.0**, y 2770–**3032**, web x 77.2–83.8.
- New **`lintel-face`**: PT 70 × 239, x 7.2–77.2, y 2781.2–3020.8, bolted through the web at 600, face flush with the flange tips. This is the screw ground for the cant, the band-ei screws and the strapping. It also gives the 19+ mm timber spacer from N4.
- New **`lintel-nailer`**: PT 38 × 140, R(10.5, 3032, 150.5, 3070), bolted to the top flange at 600; joists clipped to it. LINT1 = 3070, so JST1 +48. The soffit at 2896 does not move, so the visible band is unchanged.
- `packer` → R(7, 2742.5, 155, 2770).
- Everything at x ≤ 25 shifts **−18**: membrane x 6.75, EI_IN ≈ 5.4, EI_OUT ≈ −124.6, STRAP_OUT −143.6, CEDAR −162.6.
- **Engineer: check Δ ≤ 3 mm with snow plus the saturated − dry green-roof swing.** If W250×39 fails, a **W360×33** (about d 349, bf 127, Ix 82.7 × 10⁶, 33 kg/m, INFERRED, verify CISC) gives about 2.8 mm. It is narrower (fits 130), lighter (−6 kg/m) and 87 mm deeper, all hidden above the soffit.

**Source:** SOURCED: 11 H1, H3 (3 mm; flat screw surface); CISC-S (S\*). INFERRED: the dimensions of W250×39 and W360×33 (from memory, verify in the CISC Handbook), the loads and the deflections.

#### Revised head geometry (N4, N5, F5, F16 combined; mm; after the −18 shift where noted)

| part | new geometry |
|---|---|
| `lintel` | W250×39, x 7.0–154.0, y 2770–3032 (or W360×33 per engineer) |
| `lintel-face` | PT 70 × 239, x 7.2–77.2, y 2781.2–3020.8, bolted through the web |
| `lintel-nailer` | PT R(10.5, 3032, 150.5, 3070); joists bear here (JST1 = 3305) |
| `packer` | R(7, 2742.5, 155, 2770) |
| `head-membrane` | `[[6.75,3070],[6.75,2742.25],[155.25,2742.25],[155.25,2767]]` (now carried under the packer to the interior face) |
| `head-tape` | three-zone tape R(0, 2730, 60, 2742); the size must cover 9–15 mm |
| `head-gapfill` | stone wool R(60, 2730, 150, 2742) |
| `head-airseal` | interior airtight tape with a 10 mm loop, `[[180.25,2712],[180.25,2730.5],[160,2742],[155.75,2745],[155.75,2765]]`, lapping the membrane leg on the packer face |
| `lintel-gyp` | R(156.25, 2745, 169, 3032), over the tape |
| `head-trim` | U-cap R(165, 2733.5, 181, 2745): 3.5 clear of the head track (11 H8) |
| `head-cant`, `head-subflash`, `head-drip`, `band-ei` | per N4, x −18 |
| `membrane-top` | dog-eared 50 onto both joist faces in every bay, and lapped 50 onto the deck underside before decking (06 B8) |
| `band-windbarrier` | extend up to the deck (3305) in the bays over `ei-top`, dog-eared to the joists (N12) |

### N6 — MAJOR — Pan sequence: the geometry forces pan-before-slab, but a welded pan must be measured after framing

**Parts:** `pan`, `pan-back`, `soilgas`, `slot-edge`, `slab`.

**What is wrong**
- The poly is taped to the back leg's interior face and the cork stands against it, so both must be in place before the pour.
- The welded pan with 150 mm end dams then sits through framing as a walking surface, built before the jamb rough openings that set its length.
- The `soilgas` note ("pan set and welded, slab poured, poly up the slot face and butyl-taped") is impossible: after the pour the poly is buried behind the cork.
- `changes-v2` calls it "slab-first", which contradicts the note.

**Exact fix: a two-stage pan**
- **Stage 1, before the pour.** New **`dam-angle`**: 316 stainless 1.0, path `[[231.5,-15],[231.5,-110]]`, screwed to the PU course's interior face at y −105 (below the pan, inside the building, not through it). The poly is butyl-taped to it (85 mm), then the cork, then the pour.
- **Stage 2, after framing.** `pan`: welded to the measured rough opening, with a back upturn `[[230.4,-25],[230.4,-66.9]]` set **against the exterior face** of `dam-angle`. The lap from −60 to −25 is sealed with butyl tape. Water in the pan meets the upturn first, so the lap is shingled for water.
- `sill-foil` then covers the top of the lap: it is bonded to the upturn's exterior face from −60 to −25 and stepped onto the angle from −25 to −20.5. Air path: poly → angle → foil. The combined table gives the coordinates.
- Delete `pan-back`.
- **Sequence:**
  1. beam, damp-proofing, `beam-insul`;
  2. PU course in a mortar bed;
  3. skirt;
  4. `dam-angle`;
  5. stone, EPS, poly taped to the angle, cork;
  6. slab pour;
  7. framing, jamb membranes;
  8. measure, weld and set the pan (end dams under the jamb membranes);
  9. haunch, channel, `channel-seal`;
  10. track bearer, shims, track, foil, back-fill;
  11. sill cover, nosing and seat, grate;
  12. pavers.

**Source:** SOURCED: 11 T6–T8 (end dams 150, jamb membranes lap over); 12 §6.3 (sequence logic). INFERRED: the two-stage pan.

#### Revised threshold geometry (N1, N2, N3, N6, F11, F12 combined; mm)

| part | new geometry |
|---|---|
| `beam`, `dampproof`, `beam-insul`, `haunch`, `pan-skirt` | unchanged |
| `course` | machined PU `[[-20,-193],[231,-193],[231,-67.8],[-20,-82.9]]`; **`wedge` deleted** |
| `dam-angle` | 316, 1.0, `[[231.5,-15],[231.5,-110]]`, set before the pour (N6) |
| `pan` | 316, 0.8, welded after framing: `[[230.4,-25],[230.4,-66.9],[-20,-81.98],[-38,-83.06],[-38,-103]]`, back lap −60..−25 butyl-sealed to the angle |
| `soilgas`, `slot-edge`, `edge-seal`, `slab` | as v2, with x +0.2 for the 1.0 angle |
| `track` | R(0, −42, 180, 0) (N1) |
| `track-rails` | R(40, 0, 46, 5) |
| `sash` | R(15, 5, 85, 115) |
| `nosing` + `grate-seat` | one **316 bent profile, 2 mm** (P1/P8): bevel `[[0,0],[-12,-6],[-26,-6]]`, leg down to −27.5, ledge to x −40, through-bolted to the track's exterior web at 300 o.c., all fixings above y −20; ledge perforated ⌀6 at 50 |
| `track-bearer` | PU `[[0,-80.38],[180,-69.55],[180,-42],[0,-42]]` on shim packs + injected bedding (N2) |
| `back-fill` | cork/PU `[[180.5,-69.55],[229,-66.6],[229,-21],[180.5,-21]]` (stops in front of the pan upturn) |
| `sill-foil` | `[[180.5,-2],[180.5,-20.5],[229.5,-20.5],[229.5,-60]]`: bonded to the pan upturn's exterior face from −60 to −25, then stepped over the upturn's top edge onto `dam-angle` from −25 to −20.5, so it covers the lap |
| `sill-cover` | PU R(181, −20, 231, −4) + 4 mm 316/bronze plate R(181, −4, 231, 0) |
| `track-weeps` | **delete the tubes.** Baffled weep slots 8 × 30 in the track's exterior web at y −35..−27 (below the nosing), 300 o.c., discharge onto the pan nose → channel (F12) |
| track anchorage | no fasteners through the pan floor. If the maker requires them: stainless clips screwed to the track's interior web and bonded/riveted to `dam-angle` above y −30 (F11) |
| `channel-seal` | `[[-21.5,-85],[-21.5,-91],[-32.5,-91],[-32.5,-112]]`, t 2 (N3) |
| silt box | bypass weir crest −95 to the rill; rodding eye at the far end (N3) |
| `channel` | specify a product with a 316 edge rail, so the grate bears ≥ 10 mm on the outer side (N8) |

### N7 — MAJOR — The jamb–sill corner is not resolved

**Parts:** `pan` end dams, `sill-foil`, `slot-edge`, `track` ends, `channel` ends, `nosing` ends, jamb massing.

**What is wrong**
- Heavy sliders leak most often at the frame corners (SINTEF, 11 §5.5, S\*).
- The 3D corner is where the pan end dam, jamb membrane, foil, cork, track end cap, channel end and the jamb plinth meet.
- v2 shows the jamb as massing only ("base junction not yet resolved").

**Exact fix:** add a corner view at w = 0. Note in the spec:
- pan end dams 150 high, welded;
- jamb WRB laps ≥ 100 over the end dams (shingle);
- `sill-foil` turned 100 up the jamb post and lapped under the jamb interior air seal;
- cork and back-fill returned 25 around the post;
- track end caps set in sealant on the end dams;
- channel 150 past each jamb with welded end caps;
- nosing and seat ends closed;
- head-flashing end dams 25 (as v2).

**Source:** SOURCED: 11 T6, T8, §6.5; NRC-WWI lesson (11 §5.5). INFERRED: the corner set.

### F14 (carried) — MAJOR — Glazing and NAFS specification

**What is wrong**
- A lift-and-slide **must** carry a numeric water rating for the installed flush sill (11 G7, C6). None is stated.
- Flush sills often rate only 150–180 Pa, or LW (11 §2.4, S\*).
- The lites went from "6 tempered / 8.76 laminated" (lap 1) to **4 / 1.3 / 4**. For about 2.4 × 2.6 m panels at DP 960 Pa, 4 mm outer lites will very likely exceed IGU centre deflection limits under ASTM E1300 / CAN/CGSB-12.20 even where tempered strength suffices (INFERRED; the maker must calculate).

**Fix (notes)**

On `track`:
- *NAFS-17 / A440S1 label for the recessed flush sill as installed: LC-PG20 (DP ≥ 960 Pa) minimum, water ≥ 180 Pa (code), 260 Pa east, air A3.*
- *USI ≤ 1.22 (VBBL 10.2.2.7 prescriptive) to CSA A440.2.*
- *Sliding-door forced-entry per 9.7.5.1.*
- *Assisted or motorised lift where accessibility applies (F20).*

On `glass-*`:
- *Lites sized by the maker to DP 960 Pa (E1300 / CGSB 12.20); thin centre lite retained; laminated inner lite recommended; west SHGC lower but ≥ 0.28.*

If the product's flush sill rates below 180 Pa, the fallback is a field-tested installed assembly under Part 5 / an alternative solution. Do not use a higher sill.

**Source:** SOURCED: 11 G1–G4, G7–G11, §2.4, §7. INFERRED: the pane assessment.

### Minor findings

- **N8 Grate outer bearing.** The grate bears **4 mm** on a 6 mm polymer-concrete lip (`channel` x −165.5..−161.5). Specify a channel with a 316 edge rail and ≥ 10 bearing, and lift-out lengths ≤ 1 m with a clip lock (F17; GG47 grub screws, 11 §5.5). INFERRED.
- **N9 Seat on a fibreglass nosing.** The walking-edge load path (grate → `grate-seat` → fibreglass `nosing` → track) has no stated fixing. The seat ledge (x −40..−26.75) is a dirt shelf under the 4 mm slot. Fix: one 316 profile through-bolted, with a perforated ledge (table above). INFERRED.
- **N10 Pan nose leg.** The leg is 20 mm (−83 → −103) against LOE-INST's "2 in exterior leg" (11 T6). It does lap 11 below the wall top, which meets 01's lap ≥ 10. Accept it and record the deviation.
- **N11 Head reverse lap.** The strip-in's top edge at y 2900 is a reverse lap on the head membrane: specify termination mastic or a sealed edge. Water behind the upstand currently exits onto the tape top; N4's sub-flash removes the upstand. INFERRED from manufacturer practice.
- **N12 ei-top wind-washing.** `ei-top` (x −106.6, 3022–3257) faces the vented soffit with no wind barrier. Extend `band-windbarrier` up to the deck in the bays. INFERRED.
- **N13 Sill air seal details.** The "two sealant beads under the track" note has no substrate: delete it, or move the beads to the bearer/shim interface. The foil bonds (18.5 and 24.5) are short: widen to ≥ 30–40, and check the foil maker's minimum. INFERRED.
- **F5 (carried)** — fixed by the head table above.
- **F8 metric (carried).** In `assemblies`, model the steel flanges with isothermal planes, or report a range of 4.1–7.1. INFERRED.
- **F10 (carried)** — fixed by N4.
- **F11 (carried)** — see the threshold table.
- **F12 (carried)** — see the threshold table.
- **F16 (carried)** — see the head table.
- **F17 (carried)** — see N8.
- **F20 (carried)** — see the F14 note.

---

## 5. Design proposals

### P7 — "Warm sill" as the standard threshold build-up (system version of N2)

Concrete appears only in the beam and the slab. Between the pan and the frame and finish, everything is machined structural PU (or cork where it carries no load):
- one machined course to the fall;
- a track bearer;
- back-fill;
- a 4 mm bronze or 316 floor plate that matches the nosing.

The track can then be cut free and lifted at the 30-year renewal without breaking the floor, pan or landing (GG47 principle, 11 §5.7).

**Effects**
- **Look:** one deliberate 50 mm metal line inside, the same metal as the nosing outside.
- **Thermal:** f_Rsi 0.65 → 0.92; −0.16 W/(m·K).
- **Moisture:** no grout to crack or shrink at the water plane.
- **Carbon:** +6 to +16 kgCO₂e/m (INFERRED).
- **Maintenance:** the door becomes replaceable.

### P8 — Slot-and-tray channel cover instead of the 134 mm stainless grate (bold, beats the current look and carbon)

Replace `grate` with a **316 tray 1.5 mm, filled with 30 mm slips of the landing paver**, lift-out ≤ 1 m, bearing on the channel edge rail and the seat. It leaves **one 6 mm heel-safe slot** along the nosing (x −32..−26), with the dirt screen below.

- **Look:** the paving runs to the door; the threshold reads as one 6 mm shadow line plus the metal nosing. This also clears R5 F10's "bright grate strip".
- **Intake:** run-off here is ≤ 0.02 L/(s·m) (11 §5.3); a 6 mm slot takes orders of magnitude more. DDH19's 150 mm grate rule applies only where rain exposure is not reduced by a roof (11 §1, S). Here there is a 590 mm overhang and a gutter.
- **Clogging:** leaves bridge the slot rather than entering it.
- **Accessibility:** B651 4.3.4 ✓.
- **Carbon:** the grate is about 7.5 kg/m of stainless (21.8 kgCO₂e/m). The tray is about 2.4 kg/m (7.0). Net **≈ −15 kgCO₂e/m** (INFERRED).

### P9 — Concealed, over-insulated head (lap-1 P4, now quantified)

Use the N4 two-piece flashing, then:
- drop the band and its insulation in front of the frame head to y ≈ 2690;
- set the cedar course bottom about 2690;
- put the metal drip at the cedar line.

The glass appears to run up into the band, and the 130 mm (head track 40 + sash top 90) dark stack disappears from the street.

- **Thermal:** 2D-FD gyp f_Rsi 0.84, −0.15 W/(m·K) (case H-B).
- **Check:** panels lift out from inside; the maker confirms the head-track removal clearance.
- **Carbon:** neutral.

### P10 — Narrow, deep, light lintel

If the swing check fails, use W360×33 instead of a heavier W250 (N5): −6 kg/m of steel (about −7 kgCO₂e/m of lintel), 127 wide so it fits the 130 zone, and its extra 87 mm is hidden above the soffit.

### P11 — Bold alternative to the channel: pedestal landing (R2/R3 scope; offered for the record)

Use an open-jointed paver landing on adjustable pedestals over the lined, falling base (DL489B benchmark, 12 §3.4, S). The void becomes the drain and the pan nose drips into it.

- **Gains:**
  - there is no channel or grate at all;
  - the 13 mm rule can be re-levelled for decades;
  - pavers lift out for cleaning.
- **Costs:**
  - leaf and grit collect in the void;
  - harder edges at the shrub pocket;
  - it is a different landing system.
- I rank P8 above it for this site, because of the shrub and the leaf load.

### P12 — Thermal screening in the loop (updates lap-1 P6)

Until THERM is available, run the §2.3 rasteriser on every T and H version and report f_Rsi (Rsi 0.25) at the apron, the track interior, the slab edge and the head gyp. If the sill is still below 0.70 after P7, add the low-temperature hydronic loop within 600 mm (11 §6.1 (S), 12 §6.5(b)).

### P5 and P13 (re-offered)

- **P5:** west ZIP-screen cassette in the soffit (11 H14).
- **P13:** assisted or motorised lift-slide (F20; B651 4.2).

---

## 6. Score and what would raise it

**Score: 6.5 / 10** (lap 1: 5).

**What holds it back:**
- two interior lines below f_Rsi 0.70 (apron 0.65, head gyp 0.67);
- a 16 mm threshold caused by the new rails;
- blocked-channel water routed into the foundation joint;
- a pan sequence that cannot be built as noted;
- a lintel drawn at the wrong size with no fixing grounds;
- an unresolved jamb corner;
- no NAFS rating for the flush sill, and probably undersized 4 mm lites.

**Top 3 changes:**
1. **Warm, flush sill (N1 + N2, P7).**
   - Drop the track so the rail top is +5. The rise is then 11 mm, grate to rail.
   - Replace the grout, wedge and stone apron with machined structural PU and a 4 mm metal floor plate.
   - Apron f_Rsi 0.65 → 0.92, −0.16 W/(m·K).
2. **Close the threshold's failure and sequence gaps (N3 + N6 + N7).**
   - `channel-seal` over the house-wall/skirt joint, and a silt-box bypass weir at −95.
   - Two-stage pan: a cast-in back-dam angle before the pour, and a welded pan after framing lapped inside it.
   - Draw and specify the jamb–sill corner.
3. **Head as one thermal and structural unit (N4 + N5, P9).**
   - Two-piece flashing: a membrane sub-flash on a PT cant, with a metal drip only outboard of the insulation.
   - Real W250×39 geometry with `lintel-face` and `lintel-nailer`, and a 3 mm check that includes the green-roof swing.
   - Reconnect the interior head air seal.
   - Gyp f_Rsi 0.67 → 0.84, −0.15 W/(m·K).

**Sources consulted on the web this session (S\*):**
- Armatherm 500 Series Data Sheet V3 (GBA-hosted): https://images.greenbuildingadvisor.com/app/uploads/2025/11/18152051/32402_1763497251_Armatherm_500Series_Data_Sheet_V3.pdf
- FLAP Canada, bird-safe windows: https://www.flap.org/bird-safe-windows-2
- UBC Policy tiers v1.1 (CSA A460, 0–16 m): https://planning.ubc.ca/sites/default/files/2024-07/policy%20tiers%20v1.1%20July%202024r.pdf
- CISC W250×33: https://beamdimensions.com/database/Canadian/CISC/W_Wide_Flange/W250x33/
- CISC W250×45: https://beamdimensions.com/database/Canadian/CISC/W-_Wide_Flange/W250x45
- Loewen Technical Guide: https://www.loewen.com/wp-content/uploads/2018/06/Loewen.Technical.Guide-L.print_.pdf
