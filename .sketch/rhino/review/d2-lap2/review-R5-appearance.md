# R5 review: exterior appearance and craft. Detail 02 (d2v2), lap 2

Reviewer: R5, covering the finished look from outside and how it ages.

Inputs:
- `review/d2-lap2/detail02-v2.mjs` (normal and `--appearance`), `changes-v2.md` and `report.md` (part bounding boxes).
- `render.py` (PALETTE, cameras) and `build.py` (`ROLE_COLOR`).
- Renders: `d2-lap2/exterior-eye.png` and `exterior-elevation.png`, plus the `d2-lap0` pair.
- Sections: `H-head-section-labels`, `H-head-axo`, `T-threshold-section-labels`, `T-threshold-axo`, `S-section-axo`.
- Research 10, 11 (§1, §3.4, §4 H9–H14, §5.7, §6, §7), 09 (W1, P1, §4.2) and 08b (M12, M14).
- Nine read-only Rhino captures of `d2v2-app` (camera moved, then restored; nothing hidden or edited). They are saved in the session scratchpad as `r5lap2/C1…C8.png`, and §6 uses the same cameras.
- Web, this lap: Phantom Executive motorised screen sheet (PH-EXEC, read with pdftotext); Lifetime Wood Treatment retail and user notes (LWT, snippets only); reclaimed granite plank suppliers (RG-SUP, snippets only).

Conventions:
- **Datum:** x = 0 at the sliding frame's exterior face, exterior negative. y = 0 at FFL. w runs along the wall. Millimetres.
- **Tags:** **[S]** is sourced (key or research row given). **[S\*]** is a search snippet only. **[I]** is inferred, with the reason stated.
- **Rhino mapping:** X = 70000 + x, Y = −w, Z = y (`d2v2-app`).
- **Key constants from the spec:**
  - cedar face `CEDAR` = −144.6, `STRAP_OUT` = −125.6, `EI_OUT` = −106.6;
  - soffit `SB(x)` = 2896 at the wall, 3112.1 at the tip (x −630);
  - `X_T` = −380.9;
  - roof edge `C(EDGE)` = 3305.4;
  - `TOP0` = 3438;
  - gutter face x = −734.7.

---

## Lap-1 findings status (and a challenge to `changes-v2.md`)

| lap-1 | v2 claims | R5 verdict | why (geometry or render evidence) |
|---|---|---|---|
| B1 renders unusable | done | **partly fixed** | Colours now read and the other versions are hidden. Still wrong: the eye camera sits at w ≈ 6090, beyond the 5400 run, so it shows the cut end (yellow insulation, ground section). The eave is cut raw at w −900 (C8). The parallel elevation shows the 26 % roof slope and the sedum, which nobody on the ground can see (§0.7). The tree covers two thirds of the elevation. The glass runs 5.4 m with no far jamb or interlock, although the opening is 4.8 m. The ground in front of the jamb is a pit, with the perimeter drain visible (C5). Person proxies render brown and read as timber posts. |
| F1 eave 454, three materials | done | **fixed in look, but with a new major defect** | The band is one charcoal face, 3086–3322 (236), the cedar fascia is gone, and the polyiso stops at −100. But the box gutter's **front lip (3322) is 82 mm above its back (3240)**, so overflow goes behind the gutter. This is the opposite of D1, which set the lip 20 below the back. See N1. |
| F2 head band fussy, 271 below soffit | done | **fixed** | Flashing at the wall 2746, soffit 2896: 150 [S 11 §3.4]. Frieze deleted. One 123 course, aligned with the top course of the jamb wall (both tops at 2875). |
| F3 lintel | done | **fixed** | W250×39 with its underside at 2770. The glass top stays at 2600. |
| F4 palette not in spec | partial | **partly fixed** | `cedar-soffit` exists. But one `stainless` key serves the grate, the "black" meshes and the rails, so the meshes render grey (150,152,154). The jamb plinth is named "dark parge" but uses `concrete-exposed`, which renders light (168,165,158). Frame and nosing share `fibreglass` with no colour stated in the spec. |
| F5 shrub on axis | done | **partly fixed** | Moved to w 500, but its canopy (w −50…1050) and the pocket (w 0…1000) are still **inside the opening width** (0…4800). A rain chain and a stainless rill now also sit in the opening (N2). |
| F6 cedar in three exposures | partial | **partly fixed** | The fascia is gone, the soffit is distinct, and the band course is the top course of the wall. Open items: no strategy for the under-eave colour gradient on the jamb walls (N11). Jamb cedar starts at +260, which is off the 123 course grid and 266 above the paving, under the 300 rule [S LUNA-NA via 10 §3.1] (N3). |
| F7 meshes show | done | **partly fixed** | Named black, but `band-vent` uses `mat: stainless` (renders 150 grey). Its vertical leg is still in the cedar face plane at x −144.86, not 12 mm back. `band-screen` (2749.75) shows through a 16 mm gap above the flashing (N7). |
| F8 flashing nose, end dams | done | **partly fixed** | The geometry is a plain 5 × 5 kick (`head-flashing` last segment); "hemmed" is in the name only. The end dams are in the note, but `head-flashing` has no `runs`, so it spans the whole SPAN and **crosses the jamb wall** as a dark line at 2731–2746 (C8). There are no jamb liners (N5). |
| F9 paving module | partial | **partly fixed** | Planks are named in the note. The geometry is still continuous slabs. There are now **two pavers** (concrete planks to −1850, reclaimed granite beyond), in almost the same grey, that will age apart (N8). No set-out. |
| F10 grate strip, channel ends | open | **partly fixed** | 316 is now named (R1 F17); the finish is not. The channel end is unresolved, and "+150 each side" would run under the jamb plinth face at x −110 (N3, N13). |
| F11 overflow on the landing | note | **made worse** | The front-lip overflow onto the landing is gone, but the first overflow is now **over the back** into the sub-fascia and the closed skirt tray (N1). |
| F12 green roof not legible | open | **not fixed** | The sedum front edge is visible only beyond x ≈ −7650 at a 1.6 m eye height, and beyond −9450 from the rain-garden floor. It is invisible from anywhere on the site (C7, N12). |
| F13 RG hardware | partial | partly fixed | Beehive grate, stone collar, runnel. Accepted. |
| F14 mulch flush | done | **fixed** | `BT0` = PT(PATH_END) − 50. |
| F15 clear glass | note | partly fixed | CSA A460 markers on surface 1 at 50 × 50. Exterior reflectance and the marker look (dot size, colour) are not chosen. |
| F16 jambs, plinth, interlock, eave corner | partial | **partly fixed** | Jamb massing only. No reveal liner, no jamb frame, no far jamb, no interlock, no eave end or corner, no ground at the jamb (N3, N5, N9). |
| D5 west shading | open | **not fixed** | It is now urgent. The raised eave (bottom at 3086) shades **no glass** below a 33.5° profile angle (N4, §4). |

---

## 0. What the edge looks like now (from the geometry; checked against the C1–C8 captures)

### 0.1 Elevation stack, from the paving up (real heights)

| y (mm) | element | depth in plan (x) | colour now |
|---|---|---|---|
| −6 | paving at the channel (falls 1:60 outward) | — | warm grey 132,128,120 |
| −6 | channel outer lip, 6 wide | −171.5…−165.5 | dark polymer 70,72,74 |
| −6 | 316 grate, 134 wide, slots parallel to the door | −165.5…−31.5 | 150,152,154 |
| −8…−6 | 5.5 mm shadow gap (grate seat) | −31.5…−26 | dark |
| −6 → +5 | bevelled nosing 1:2 | −26…0 | charcoal |
| +5 → +120 | track lip, then the sash bottom rail face (110) | 0…15 | charcoal |
| 120 → 2600 | **glass, 2480 visible** | 28 | — |
| 2600 → 2730 | sash top rail + head track (130), recessed 145 behind the cedar | 0…85 | charcoal |
| 2730.6 → 2746 | head-flashing drip and sloped underside (159 deep in plan) | −154.6…+4 | charcoal |
| 2736 → 2752 | 16 mm gap (straps and insect screen behind) | — | dark, with a grey screen line |
| 2752 → 2875 | **one cedar course, 123** | −144.6 | silver 150,146,138 |
| 2875 → 2896 | 21 mm vent slot, mesh in the face plane | −144.9 | renders grey (should be black) |
| 2896 → 3112 | **honey soffit, raked 24°**: 216 seen in elevation, 531 along the slope | −144.6…−630 | 182,136,96 |
| 3086 → 3112 | raw PT sub-fascia sliver, inboard of the skirt | −630 | 176,150,112 (N6) |
| 3086 → 3322 | **charcoal gutter face and skirt, 236** | −734.7 | 52,54,56 |
| above 3322 | roof slope 26 %, gravel, edge profile, sedum: hidden from the ground (§0.7) | — | — |

**Proportions**
- **Lid:** glass top to gutter top is 2600 → 3322 = **722 mm over 2480 mm of glass (0.29)**. In v1 it was 860 (0.35).
- **Lines:** seven, down from eight, in three tones: charcoal (frame plus flashing 146, gutter 236), silver (one course), honey (one raked plane).
- **Base and head balance:** charcoal frame base ≈ 126 (nosing bevel plus rail) against a charcoal head of 146. The balance lap 1 praised still holds.
- **Gutter band:** 236 of 3322, about 7 % of the height to the eave. It is the strongest horizontal on the façade and reads as a deliberate lid, not a stack.
- **Depths:** the gutter face stands 590 in front of the cedar face and 735 in front of the glass. The head is tucked: the flashing sits 150 below the soffit at the wall.

**Lines and shadows**
- **High sun** (summer midday, profile angle ≥ 30°): the cedar course and the whole head band sit in shadow. They read as one dark zone under a lit honey soffit. The glass stays fully lit until the profile angle passes 33.5°. The soffit edge at 3086 lies 486 above the glass top, so the overhang throws no shadow on the glass below that angle [I, geometry].
- **Low west sun** (below about 20°, summer evenings and all winter afternoons): the light runs *under* the gutter. It lights the cedar course, the head and the inner 150–300 mm of the soffit (N10). The honey plane glows, which is attractive, but that soffit is not UV-sheltered.
- **Reveal:** the 145 mm reveal gives the glass a deep vertical shadow at the jambs. On the west it is the most valuable shadow on the façade. Keep it.

**Colour relationships**
- The ground and wall field are a family of mid greys within about ±20 RGB of each other: cedar 150, stainless 150, pavers 132, granite 120, plinth 168. The honey soffit is the only warm surface, and charcoal draws the lines.
- That restraint is right for Vancouver light. The risk is a monotone base: three greys meeting at the jamb (light plinth, silver cedar, warm-grey paver) with nothing marking the base. A **dark plinth** (78,78,76) would give the jamb walls a base line in the same family as the charcoal frame base (N3).

### 0.2 Eave corner and jamb returns (what exists)

**Eave corner:** none. The gutter, skirt, soffit, cant and roof are cut raw at w −900 (C8), and the overhang's wedge section is open to view. A rule is needed in both cases, whether the eave stops (gable or wall end) or wraps a corner (N9).

**Jamb return (C1, C3c):**
- The reveal face at w 0 is the end of the `jamb-wall` massing (softwood colour). There is no liner and no jamb frame; the glass dies straight into it.
- The head flashing and the band course carry on over the jamb wall. The flashing shows there as a stray line, because the spec gives it no `runs`.
- At the base, the plinth's end face (x −110…0, from −300 to 230) is the reveal floor, next to the raw end of the channel.

### 0.3 Threshold seen from outside

The sequence from the paving is dark lip 6 | light grate 134 | shadow 5.5 | charcoal bevel 26 | charcoal rail 110.
- It reads as a fine inlaid threshold, and the head drip at x −154.6 lands on the grate (keep this).
- The 6 mm polymer lip adds one line too many. A stainless edge rail would merge lip and grate into one 146 light strip (N13).
- The bright strip against the charcoal nosing also gives the low-vision contrast that marks the rise [I].
- **Channel ends** are not drawn: `channel` runs OPEN only, so in the appearance model it stops at w 0 beside a pit (C5). The note says "+150 each side", but past w 0 the channel (x −171.5…−21.5) would pass under the jamb plinth face at x −110, so it cannot run there. End it at the reveal planes (N3).

### 0.4 Paving

- **Landing (x −171.5 → −1850):** concrete planks 60, 132,128,120. **Terrace (→ −3250):** reclaimed granite 80, 120,118,112.
- The joint at −1850 is a straight line parallel to the glass, about 1.7 m out, between two greys only about 12 RGB apart. It will look like a supply mismatch, and the two will diverge with age: the concrete fades lighter and beige, the granite darkens with biofilm.
- Curbs and the edge restraint are lighter again (168,165,158), so the pocket reads as a frame.
- A 170 mm **stainless rill grate** crosses landing and terrace at w 1590–1760, about a third of the way into the opening. It is the brightest line on the ground (C1, C4) and has no relationship to the jamb or the interlock (N2).

### 0.5 How the box gutter reads

- **From 3–8 m:** one flat charcoal plane, 236 high, about 3 m up, with no visible brackets. The skirt hides the soffit end. This is the right image, much calmer than v1.
- **Two craft risks:**
  - **Hydraulics:** the front lip sits above the back (N1).
  - **Oil-canning:** a 236 flat face in 0.6 mm steel will show waves in raking west light. Use 0.8 mm, low gloss (≤ 15 GU) and a hemmed lip. Keep the face level and let only the gutter bottom fall [I].

### 0.6 What reads well now (keep)

1. The lid: 236 charcoal band, honey raked soffit, one course, slot, tucked head. Glass-to-lid ratio is 0.29.
2. Balanced charcoal lines at base (126) and head (146), and the 145 mm reveal shadow.
3. A raked soffit that is visible from every point in the garden.
   - From 3 m, the sightline to the soffit's wall end passes 470 mm below the skirt.
   - From 8 m, it passes 290 mm below.
4. The head drip lands on the grate. The grate slots run parallel to the door.
5. One charcoal for all metal and frames. No zinc, copper or galvanized material anywhere.
6. The tree is deciduous and stands well out (x −4400).

### 0.7 Green roof legibility

**Heights:** sedum front edge at x +401.5, top 3605; edge profile top 3555; gutter lip (−734.7, 3322).

**Where the sedum first shows** (sightline over the gutter lip):

| eye height above FFL | sedum shows beyond | edge profile shows beyond |
|---|---|---|
| 1600 | x ≈ −7650 | x ≈ −9120 |
| 1450 (bed level) | x ≈ −8250 | — |
| 1150 (rain-garden floor) | x ≈ −9450 | — |

**Roof slope:** the dark 26 % slope above the gutter shows only beyond about 9.6 m.

**Result:** none of the green roof or the roof slope is visible from the landing, the terrace, the bed or the rain garden. C7, taken from the rain-garden rim, confirms it.

**The parallel `exterior-elevation.png`** shows a green line and a thick dark band above the gutter. That is a projection artefact, and it overstates the eave by about 120 mm of dark slope.

---

## 1. How it ages (Vancouver, west façade; east noted where it differs)

Cells are [I] unless tagged. RGB values are the proposed keyframes for the decades view.

| element | year 0 | year 5 | year 15 | year 30 |
|---|---|---|---|---|
| **Cedar channel siding**, factory bleaching oil, left to weather | Light warm grey-beige, even (≈170,160,145). | **Field** (below about 2.0 m on the jamb walls) silver, 158,153,144. **Under-eave zone** (top ≈ 0.6–1.0 m of the jamb walls and the band course): no rain wash, so brown-grey, ≈150,135,115 [S NAK-LONG, ABODO-WEA via 10 §2.1]. **Base course:** splash-darkened, green-grey on the east. Bleaching-oil recoat due [S RC-FIN: 5–6 yr textured]. | Field even mid-silver with fine checks, 152,147,138. The under-eave gradient is permanent unless recoated as a whole. Pollen and cobweb dust under the slot. Iron stain only if any fastener is not stainless. | Field 140,138,133. Erosion 1–3 mm [S 10 §2.1], channel arrises softened. The lowest one or two courses may need replacing, so make the base course replaceable (N3). |
| **Same siding with a one-time mineral pre-greying** (P4) | Grey within weeks, silver-grey in 3–12 months on red cedar, **including sheltered zones** [S\* LWT distributor chart]. | Even silver across field, under-eave zone and band course. Gradient ≤ 10 RGB. | 150,147,140, even. | As left, 140,138,133. Evidence for the product is weak (vendor and anecdote) [S\* LWT], so trial panels on site first. |
| **Honey soffit**, clear UV oil, raked 24° | 182,136,96. | **East and west:** low sun below about 20° reaches the inner 150–300 mm (N10), which goes amber-brown first. Cobwebs and dust at the slot [S EQ-CLEAN via 10]. Unmaintained, the inner strip greys to about 160,135,110 while the outer stays honey. | Pigmented oil recoated every 3–5 yr: about 165,124,88, even. If neglected: a two-tone stripe parallel to the wall. | Boards stay sound because they are never wetted. The colour depends entirely on the recoat record. |
| **Charcoal PVDF** (gutter, edge metal, flashing, skirt) | 52,54,56, low gloss. | Spring pollen dusting shows on the flashing top and the gutter lip. Leaf debris at the leaf screen (tree at 4.4 m). Water-mark line under the end-cap scupper. | Slight chalking, ≈60,62,63 [S 10 §2.1: PVDF holds colour; paint fading via 06]. Any oil-canning is permanent. | Renewed with the roof at about 20–25 yr [S 06 via 10 §2.1]. Specify the same colour code then. |
| **Fibreglass frame and nosing** (factory dark finish) | 52,54,56. | Nosing bevel scuffed silver-grey along the wheel and foot line. | West rails slightly faded. Gaskets due [S 11 §5.7]. | Refinishable in place [I]. IGUs replaced [S 11 §5.7], with the bird markers re-specified. |
| **316 grate** (sheltered, not rain-washed) | Bright, 176,178,178 if bead-blasted. | Grit in the slots, tannin and tea staining at the bar edges in the sheltered strip (unwashed chlorides) [I]. The traffic line is polished. About 150,150,146. | Patina mid-grey. Lift twice a year to clean the dirt screen [S 11 §5.7]. | Still sound. Bars may be replaced as a module. |
| **Concrete planks** (landing) | 132,128,120, crisp arrises. | Fines worn in the 1 m traffic strip, aggregate showing, pigment lighter. Moss in shaded joints. | ≈142,138,128 and variegated. Some units near the channel re-levelled [S 08b yr 5–15]. | Near the end of life in the traffic strip. Colour now far from the granite. |
| **Reclaimed granite** (terrace; proposed throughout) | Flamed grey, ≈140,138,132. | Little change. Lichen starts on edges outside the traffic line. | ≈126,126,120 with lichen dots. The traffic line slightly polished; re-flame locally if BPN drops [I]. | Unchanged in character; relaid, not replaced. |
| **Green roof** | Invisible from the site (§0.7). | Biodiverse sedum, stress-red in July–August. | Forbs self-sort. The 500 gravel strip must stay vegetation-free (twice-yearly check [S BCH-MM02 via 10]). | The membrane is under the medium. With D7 or P5, a grass fringe shows above the gutter from about 3 m out. |
| **Planting** | Amelanchier ≈ 2 m. Huckleberry 0.5 m. | Amelanchier ≈ 3.5 m. **Purple berry drop and bird droppings in June–July** on the terrace stone [I]. Leaf fall into the gutter. Huckleberry ≈ 1 m. | Amelanchier ≈ 5 m with a 4 m canopy. From the rain garden it hides the head (C7), so the edge is seen only from closer than about 4 m. Huckleberry kept at 1.5 m. | Mature tree. The view of the edge becomes a framed glimpse. Watch for suckers into the bed [R3 F19]. |

**East differences:**
- Morning shade means slower drying.
- More algae on the base course and on the paving joints beyond the eave.
- The honey soffit fades less, because the low morning sun is weaker in UV.

---

## 2. Score: **6.5 / 10** (lap 1: 5)

**Why it rose**
- The lid is resolved in principle: one charcoal band, tucked head, honey raked soffit, one course aligned with the wall.
- The palette exists.
- The renders can now judge colour and proportion.

**Why it is not higher**
1. **The gutter is built back to front.** Its overflow runs into PT and stains the soffit tip (N1).
2. **Water and planting are in the opening.** The rain chain, a stainless rill strip and the shrub pocket all sit inside the 4.8 m opening (N2, F5).
3. **The edges are unresolved.** The jamb base and ground, the reveal returns and the eave end are not detailed (N3, N5, N9). These junctions decide the elevation.
4. **West shading is still undecided.** Added later, it would be the familiar box screwed to the cedar (N4).
5. **The ground is mismatched.** Two near-equal greys meet at −1850, with light curbs and no module (N8).
6. **The green roof is invisible** from the whole site (N12).

---

## 3. Findings

Counts: **0 blockers, 4 major, 10 minor.** Lap-1 items still open are in the status table and are folded into the findings below where the fix is new.

### N1: major. The box gutter's front lip is 82 mm above its back, so overflow goes behind, onto PT, into a closed tray
- **Parts:** `box-gutter`, `gutter-skirt`, `membrane-roof`, `sub-fascia`, `edge-metal`.
- **What is wrong:**
  - `box-gutter` path: back leg x −657.3 from 3240 to 3125, front x −734.7 up to **3322**. Water rises to 3240 and then spills over the back.
  - `membrane-roof` starts at `[EDGE, 3200]`, so below 3200 the overflow runs on bare PT `sub-fascia` down to the skirt.
  - `gutter-skirt` is a closed horizontal tray at 3086.3 with no weeps.
  - In Vancouver leaf fall a blocked outlet is a yearly event [S 06 B19 via 10 §3.6].
- **How it ages:** rot in the sub-fascia, tannin and dirt streaks down the honey soffit's outer edge, ice in the tray in cold snaps, all within about 5 years [I]. This reverses lap-1 D1, where the front lip sat 20 below the back.
- **Exact fix** (keeps a single charcoal band, now in two planes):
  - `box-gutter` path → `[[-657.3, 3240], [-657.3, 3125], [-734.7, 3125], [-734.7, 3218], [-722.7, 3218]]`.
    - The front lip sits 22 below the back, with a 12 mm hemmed return inward.
    - Face 0.8 mm PVDF, ≤ 15 GU gloss. Brackets at ≤ 600. The face stays level; only the bottom falls 1:200.
  - **Seen from the ground:** gutter face 3086–3218 (132), then a **32 mm recessed shadow**, then the `edge-metal` face at x −657.3 from 3250 to ≈ 3320 (70, set 77 back).
    - The band is 3086–3320 = 234, one charcoal colour.
    - The set-back line makes it read lighter than a solid 236.
  - `membrane-roof`: change `ROOF_BED[0]` to `[EDGE, 3095]`, so the membrane covers the sub-fascia face down to the skirt.
  - `gutter-skirt` path → `[[-734.7, 3124.7], [-734.7, 3086.3], [-629.7, 3086.3], [-629.7, 3108]]`.
    - It returns up the sub-fascia's inboard face to 4 mm under the soffit (this also fixes N6).
    - 6 × 40 weep slots at 600 in the horizontal leg.
  - **End-cap scupper:** 75 × 25, invert **3205** (13 below the lip), at the jamb-A end only, discharging over the basin of N2. The order of overflow is then outlet, scupper, front lip; never the back.
- **Alternative** if a single flush 236 face is wanted:
  - Keep `box-gutter` as the hemmed box above (lip 3218).
  - Add a separate 0.8 mm charcoal **fascia cover** at x −740, 3086–3322, on stand-off clips, with a 15 mm open slot to the gutter lip and an open bottom.
  - Overflow over the lip then falls inside the cover and drips at its open bottom, 5.5 mm proud of the skirt.
  - Costs about 2.5 kg/m of extra steel [I].
- **Basis:** front lip below the back [I, standard gutter practice; R5 lap-1 D1]; removable and inspectable [S 06 B19]; membrane continuous to the termination [S 06 B21, B15].

### N2: major. The rain chain, the stainless rill and the shrub pocket all sit inside the 4.8 m opening
- **Parts:** `rill-walls`, `rill-floor`, `rill-grate` (`RILL_W` [1590, 1760]), `box-gutter` note ("outlet … into the rill head (rain chain)"), `shrub`, `pocket-*` (w 0…1000), `channel` note (outlet "at the opening end").
- **What reads badly:**
  - A chain hanging at about (x −696, w 1675), 0.55 m in front of the cedar plane, inside the door's width and in the path of anyone stepping out.
  - A 170 mm stainless strip across landing and terrace at an arbitrary third of the opening.
  - A pocket and evergreen in the front 1 m of the view.
  - From inside, all three sit in the left half of the view. From outside they clutter the one surface that should be calm, the landing in front of the glass.
- **Exact fix (P2, "water corner"):** opening w 0…4800, jamb A w −1200…0, jamb B w 4800…6000.
  - **Jamb A:**
    - **Rain chain** at (x −696, w −600), from a gutter outlet in the jamb-A bay.
    - **Basin:** reclaimed granite, 624 × 600 × 120 deep, at x −483.5…−1107.5 (4 paving courses, §N8) and w −900…−300, filled with 100–150 cobbles.
    - The chain lands 551 off the cedar face. That is slightly under the 600 rule of thumb for basins [I 10 §3.6]; accept it with a cobble fill.
    - The channel outlet and silt box go under a removable granite lid in the basin floor.
    - The scupper of N1 discharges here.
    - The **rill** runs from the basin's outer edge at **`RILL_W` = [−690, −520]**, x −1107.5 → BED0, then continues as the runnel.
  - **Jamb B:**
    - **Pocket and shrub** at w 4950…5950, x −2199.5…−3291.5 (module, N8), shrub centred at (x −2750, w 5450).
    - The huckleberry then frames the opening's far edge and screens the jamb-B downspout side, if there is one.
  - The landing in front of the glass becomes uninterrupted stone, ≥ 1700 × 1700 clear [S 08b].
- **In the 1.8 m section slice:** draw the rill and pocket beyond the cut as elevation elements, as lap 1 asked for the shrub.

### N3: major. The jamb base and the ground beside it are unresolved, and visibly wrong in the appearance model
- **Parts:** `jamb-plinth`, `jamb-cedar`, `jamb-wall`, `pavers-lined`, `bedding-lined`, `base-lined`, `liner`, `channel`, `grate` (all `runs: OPEN`).
- **What reads badly (C2, C5):**
  - With no paving at w < 0 there is a pit in front of the jamb, and the perimeter drain shows.
  - `jamb-plinth` (x −110, y −300…230) renders light in `concrete-exposed`, although it is named "dark parge".
  - The cedar bottom is at +260:
    - 266 above the paving, under the ≥ 300 over hard paving that the high-rainfall guidance asks for [S LUNA-NA via 10 §3.1];
    - and off the 123 course grid: (2875 − 260) / 123 = 21.3, so the base course would be ripped.
  - A 30 mm softwood sliver shows between the plinth and the cedar (massing).
  - The channel "+150 each side" conflicts with the plinth.
- **Exact fix:**
  - **Cedar base:** `jamb-cedar` → `R(CEDAR, 292, -126, 2875)`, that is 21 courses of 123, with the base course bottom 298 above the channel lip (≈ 300 [S]). Bevel the bottom 15°, seal the end grain [S ABODO-DET, RC-PRE via 10 §3.1], and fix the base course with screws so it is replaceable.
  - **Base flashing:** 24 ga charcoal, nose at x −124.6 (10 past the plinth face), hidden behind the cedar drip edge [10 §3.2a].
  - **Plinth:** `jamb-plinth` → `R(-114.6, -300, 200, 262)`.
    - Face 30 behind the cedar face, top 30 below the cedar.
    - New `mat` `parge-charcoal`, RGB **78,78,76** (dark mineral silicate finish [S 09 P1]).
    - 10 mm chamfered arris [I 10 §3.5].
  - **Ground (appearance mode):** in APP mode, give `pavers-lined`, `bedding-lined`, `base-lined` and `liner` `runs: [SPAN]`, so the stone runs past the jamb with no seam.
  - **Channel and grate:** keep `runs: OPEN`, ending at w 0 and w 4800 with 316 end caps flush with the reveal-liner planes. **No stub under the plinth.** The outlet leaves the end cap under the stone to the silt box in the N2 basin.
  - **Base datum:** the charcoal plinth (to +262) and the charcoal frame base (to +120) step down together at the reveal and read as one dark base line.

### N4: major. West shading is not reserved; it must be integrated now or it will be bolted on later
- **Parts:** head reveal (empty air at x −144.6…0, y 2600…2730), jamb reveals, `head-flashing`, `grate`.
- **Why it is major:**
  - With the eave edge at 3086, the overhang shades **no glass below a 33.5° profile angle** [I, geometry].
  - On 21 June at 17:00 PDT the sun is ≈ 39° high at ≈ 261°, so about 120 mm of glass is shaded. At 18:00 PDT it is ≈ 30° almost due west, and no glass is shaded [I, solar geometry for 49.25 N].
  - The hottest hours are unshaded. Research 11 §7 calls for exterior blinds or vertical shading on the west [S BC-B24-08 via 11].
  - Every later retrofit means a surface-mounted box on the cedar course and guides screwed through the siding: the most common way a good West Coast façade is spoiled [I].
- **Fix:** §4 (P3), a cassette in the head reveal space that already exists. No change to insulation, lintel or soffit.

### N5: minor. The head flashing crosses the jamb walls; there are no reveal liners
- **Parts:** `head-flashing` (no `runs`, so SPAN), jamb reveals (not modelled), `band-cedar`.
- **Fix:**
  - `head-flashing` `runs: OPEN` (w 0…4800), with 25 mm end dams [S 11 H10] folded up *inside* the jamb liners.
  - **New `jamb-liner`** (APP and slice): 0.76 mm charcoal PVDF.
    - In plan from the cedar face plane (x −144.6) to the frame jamb (x 0), from y +5 to 2730.
    - Hemmed at the cedar plane. Set the cedar course ends 8 mm back, end grain sealed [S 11 §6.5: 6–10 mm].
    - The liner also carries the screen guides (§4).
  - **Result:** one dark picture frame of liners, head flashing, cassette and nosing around the glass.
  - **Renders:** model the lift-and-slide jambs (≈ 90 sightline) and the **interlock** (200 at the centre [S 11 §2.3]).

### N6: minor. A raw PT sliver shows between the gutter skirt and the soffit tip
- **Parts:** `sub-fascia` R(−650, 3086, −630, 3273); `soffit` tip at 3112.
- **Evidence:** a 20 × 26 PT face (176,150,112) is visible as a tan line in the look-up (C3b, C3c).
- **Fix:** the skirt return in N1 (to x −629.7, y 3108). Or raise the `sub-fascia` bottom to 3112, flush with the soffit tip.

### N7: minor. The vent and insect meshes still read as grey strips in the face plane
- **Parts:** `band-vent`, `band-screen`, `band-cedar`.
- **Fix:**
  - New `mat` `mesh-black`, RGB **24,24,24**, for `band-vent` and `band-screen`.
  - `band-vent` vertical leg → x **−132.6** (12 behind the cedar face), path `[[-132.6, 2875], [-132.6, 2895.75], [STRAP_OUT, 2895.75]]`, with the cedar course's top edge cut back 12 at 45° so the slot reads as a true 21 mm shadow [I 10 §3.6].
  - The cedar bottom (2752) is 16 above the flashing at the cedar face (2735.6), against the 6–10 mm guidance [S via 09 §4.2 / 06]. The insect screen shows through that gap. Keep the course at 2752–2875, because it sets the jamb-wall course grid in N3. Close the gap from below instead:
    - **Preferred:** raise `head-flashing` by 8. The upstand goes from 2746 to **2754** and the flashing meets the cedar face at 2743.6, leaving an 8.4 gap. Trim-to-soffit becomes 142, still ≤ 150 [S 11 §3.4]. `head-tape` grows from 12 to 20 high. R1 to confirm.
    - **Fallback:** keep the 16 gap, but make `band-screen` `mesh-black` so the gap reads as shadow.

### N8: minor. Two paving stones of nearly the same grey; no module; light curbs
- **Parts:** `pavers-lined` (concrete 60), `pavers-1`, `pavers-2` (granite 80), `pocket-curb*`, `edge-restraint` (`concrete-exposed`).
- **Fix (P1, "one ground"):**
  - **Material:**
    - **Reclaimed grey granite throughout**: 60 on the lined landing, 80 on the terrace, same face and finish.
    - Planks 150 wide in random lengths 300–900, laid in courses **parallel to the glass**.
    - Flamed or sawn-textured to BPN ≥ 55 [S 08b M12]. Joints 6 mm everywhere [S 08b M12; ≤ 10 permitted on the terrace, M14].
    - Sawn plank pavers from reclaimed granite curbstone exist [S\* RG-SUP: Stone Curators, Experienced Brick and Stone]. A Lower Mainland source is not confirmed, and freight carbon belongs to R4.
  - **Set-out:** a 156 module from the channel lip at x −171.5, joints at −171.5 − 156n.
    - `LINER_END` → **−1887.5** (n = 11); invisible once the stone is continuous.
    - `POCKET.x[0]` → **−2199.5** (n = 13).
    - `PATH_END` → **−3291.5** (n = 20).
    - `BED0` → **−3441.5**.
  - **Curbs:** `edge-restraint` and `pocket-curb*` become **reclaimed granite curbstone on edge, 150 wide**, in the same stone, so each edge reads as the last course and not as a frame.
  - **Palette:** `reclaimed-stone` → **140,138,132** (flamed, year 0).
  - **Effects:** one material, so no line at the liner and no divergent ageing. Granite hides berry and leaf stains better than light concrete [I]. Concrete paver cement is removed; R4 to weigh the freight.

### N9: minor. The eave end and corner are undefined
- **Parts:** all roof and eave parts at the run ends.
- **Fix:** pick one rule per end.
  - **(a) Eave wraps a building corner:**
    - The gutter turns on a factory-welded mitre, with the face continuous.
    - The two raked soffits meet on a rising diagonal from the wall corner (2896) to the gutter corner (3112).
    - Boards run parallel to their own wall and are mitred on the diagonal over a 7 mm open joint with black mesh.
    - Edge metal is folded around in one piece [S 10 §3.5].
  - **(b) Eave stops:**
    - A 0.8 mm charcoal **end plate** following the overhang wedge.
    - Bottom edge 6 below the soffit line, from (−734.7, 3086) to (−144.6, 2890). Front edge flush with the gutter face. Top edge 25 above the finished roof.
    - It stands 10 proud of the jamb wall's end face, with the gutter end cap and the N1 scupper in the same plate.
  - In the APP model, extend the jamb wall to 1200 and draw the end you choose, so no section shows in exterior renders.

### N10: minor. The raked soffit is not UV-sheltered on east and west
- **Parts:** `soffit`.
- **Geometry:**
  - The soffit underside faces out and down at 24°, so sun below 24° can strike it.
  - The gutter skirt shades the outer part. At 15° altitude the lit zone runs from x −324 to the wall; at 10° from x −465 [I, ray geometry].
- **Fix:**
  - Use a **pigmented** (transparent iron-oxide) UV oil, not a clear one. Recoat every 3–5 years at the twice-yearly roof check [S BCH-MM02 via 10].
  - Set the board module so the 531 mm slope takes whole boards: **4 × 125 face + 3 × 7 open joints + 2 × 5 end gaps = 531**. Boards run parallel to the wall over black mesh [I 10 §3.6].
  - Palette keyframes: 182,136,96 / 172,128,90 / 165,124,88 / 158,120,86 (maintained).

### N11: minor. Under-eave colour gradient on the jamb walls
- **Parts:** `jamb-cedar`, `band-cedar`.
- **Problem:** with a 590 overhang above a 2.9 m wall, the top ≈ 0.6–1.0 m (5–8 courses) stays brown while the field silvers [S 10 §2.1 zone U, NAK-LONG/ABODO-WEA]. The band course is in that zone.
- **Fix:** P4, a one-time mineral pre-greying of all siding, sheltered courses included. If the trial fails, accept the gradient and draw it in the 5/15/30 keyframes.

### N12: minor. The green roof is invisible from the site
- **Parts:** `gravel-edge`, `gr-edge-profile`, `growing-medium`, `sedum`.
- **Fix:** P5 (living lip). Otherwise drop the green line from any exterior image taken at eye level, and render the roof only from above.

### N13: minor. Grate finish and channel lip
- **Parts:** `grate`, `channel`, `rill-grate`.
- **Fix:**
  - 316 **bead-blasted and passivated** (or electropolished), new `mat` `stainless-bb`, RGB **176,178,178**. The grate is sheltered and not rain-washed, so tea-staining is likely without a smooth, passivated finish [I].
  - A 316 edge rail over the channel's 6 mm outer lip, so lip and grate read as one 146 light strip.
  - The rill grate is removed from the landing by N2.

### N14: minor. The renders still mislead in four ways
- **Parts:** `render.py`.
- **Problems:**
  1. The eye camera sits beyond the run end and sees section cuts.
  2. The parallel elevation shows the roof slope and sedum, which are invisible from the ground.
  3. The entourage hides the edge.
  4. The proxies are brown, the glass has no jamb or interlock, and the run is 5.4 m against a 4.8 m opening.
- **Fix:** §6.

---

## 4. West sun shading (D5): integrate it now, inside the reveal (P3)

**Answer:** yes, integrate it now, at least as a reserved zone with fixings and power. Fitting the screen itself can wait for budget.

**Where it goes:** the head reveal is already empty. Under the flashing, in front of the recessed frame head, x −144.6…0 by y 2600…2730 is open air. A 140/180-class motorised screen housing fits there with no change to insulation, lintel or soffit.

**Geometry**
- **Housing** (new part `screen-cassette`): ≈ 140 × 102 [S\* Phantom housing sizes, snippet].
  - Laid 140 deep (x −144.6 → −4.6) by 102 high (y 2622 → 2724).
  - Face flush with the cedar plane, charcoal 52,54,56.
  - The head flashing caps it, with 12 clear above (flashing at 2736–2744).
  - Bottom access panel for service.
- **Fabric:** drops at x ≈ −70. Guides 35 (w) × 45 (x), at x −92.5…−47.5, fixed through the new `jamb-liner` (N5) at w 0…35 and 4765…4800.
- **Bottom bar:** lands at y −6 **on the grate** (x −92.5…−47.5 lies inside −165.5…−31.5). Water off the lowered screen drips into the drain. Guide feet stand on the channel's 316 end caps.
- **Size:** one screen 4.8 m wide × 2.6 m drop. Solar mesh in 140/180 systems runs "to 8 m wide x 5 m drop"; solar mesh is 6 % or 10 % open [S PH-EXEC]. Phantom is a BC maker [I]. Its wind rating is not confirmed: if a side-retention (ZIP) screen is required for exposure, choose a ZIP-type cassette of the same class and keep the same zone.
- **Fabric colour:** charcoal or black on the outside face. It gives the best view out from inside and reads from the garden as a dark veil set 70 back in the reveal, with the cedar frame unbroken [I].

**How the head reads**
- Retracted: glass, then 22 mm of recessed frame rail, then the 102 charcoal housing face (flush), then the flashing drip, then the course or slot, then the soffit.
- The dark head zone stays 146 high, so nothing new appears on the elevation.

**Effects**
- Solar gain is stopped outside the glass, and glare is cut.
- Lowered, the screen also marks the glass for birds.
- With an E-screen or insect mesh, it doubles as the fly screen for the open door.
- Carbon: ≈ 25–30 kg of aluminium (housing, guides, bottom bar) ≈ 0.10–0.15 t CO2e (4.2–5.0 kg/kg [S 09 §3.1 via lap 1]). That is ≈ +25 kg CO2e per m of opening (+4 %). Specify recycled-content aluminium.
- Service: motor and fabric at ≈ 10–15 yr [S 11 §5.7: "exterior blind (west) first service" at yr 5; I].

**Keep with it**
- The Amelanchier at x −4400. Its canopy (1.9–4.2 m above the bed) shades much of the glass for sun altitudes of about 15–37° on its bearing [I, geometry], and it lets winter sun through.
- On the **east**, reserve the same cassette zone so both façades match, even if no screen is fitted.

---

## 5. Design proposals

### P1: "One ground": reclaimed granite throughout, coursed parallel to the glass (recommended)
See N8.
- **Result:** the landing, terrace, curbs and edge restraint are one stone. The channel (one 146 stainless strip) and the frame base are the only lines between the floor and the garden.
- **Ageing:** granite converges with the silver cedar rather than diverging from it.

### P2: "Water corner" at jamb A; shrub at jamb B (recommended)
See N2.
- **Result:** water is made visible where it belongs: the chain, a granite basin of cobbles and the rill head beside the opaque wall. The landing in front of the glass is clear.
- **Basis:** the *amaochi* stone band [S JAANUS-AMA via 10]; "rain chains … into cobble basins" [I 10 §3.6].

### P3: The dark picture frame, with the west screen inside it (recommended)
N5 plus §4.
- The jamb liners, head flashing, screen cassette and nosing form one charcoal frame around the glass, 145 deep, recessed behind the cedar.
- The screen is invisible when retracted and recessed when lowered.

### P4: Pre-greyed cedar for even ageing (recommended; site trial first)
- Factory or site one-time mineral greying of all channel siding, including the band course and the sheltered top courses, over the bleaching-oil plan. Red cedar goes silver-grey in about 3–12 months, chemically, without needing UV or rain [S\* LWT].
- **Result:** the whole wall is silver within the first year, so the under-eave gradient and the "third tone" never appear.
- **The honey soffit then stays the single warm surface**, by design.
- **Caveats:** the evidence is vendor and anecdote only. Trial 1 m² panels on the west, sheltered and exposed, for one winter. Stainless fasteners only [S RC-PRE].

### P5: "Living lip", so the green roof is seen from the garden (optional; engineer to confirm load)
- In the first 600 mm of the green roof, x +401.5 … +1000:
  - growing medium 150 (from 80);
  - plant the taller natives 300–450 (Festuca roemeri, Allium cernuum, Eriophyllum lanatum [I, species per 08 L to confirm]).
- The 500 gravel strip stays, vegetation-free.
- **Visibility:** a 400 tall fringe at x +400 shows above the gutter from x ≈ −3770 (1.6 m eye), so from the far half of the terrace, the bed and the rain garden [I, sightline].
- **Costs:** ≈ +0.9–1.0 kPa saturated in the band. Fire rules for vegetated roofs were not read [10 §6]. Summer browning is visible.

### P6: Bold option, "soffit to head" (West Coast modern: glass runs up to a warm soffit)
- **Geometry:**
  - Delete `band-cedar` over the opening.
  - Set `SOFF0` = **2780** and rake the soffit to the unchanged tip (−630, 3112): **34.4°**. The furring is 223 deep at the wall, tapering to zero at x ≈ −505. Re-taper the joist tips from −505 to −630 to keep the 126 tip depth.
  - **Over the opening:** the flashing is capped by a 0.8 charcoal strip, 2736–2760, flush with the cedar plane. The 20 mm black slot (2760–2780, mesh 12 back) runs continuously along the whole façade.
  - **Jamb walls:** cedar from **300 to 2760, exactly 20 courses × 123**, with the base course 306 above the paving [S LUNA-NA ≥ 300]. The slot vents their cavity top [S 06 B22].
  - Head trim to soffit: 20–50 mm, fully sheltered [S 11 §3.4].
- **Elevation:** glass 2480 | charcoal head 160 (frame, flashing, cassette, strip) | black slot 20 | **honey plane 332 seen in elevation (589 along the slope)** | charcoal band 234.
  - Four elements in three tones.
  - One fewer line and one fewer material over the opening.
  - The glazed bay reads as a full-height void between two cedar piers under a floating, warm lid. That is the regional West Coast modern image (e.g., B.C. Binning House, West Vancouver, 1941) [I, precedent from general knowledge, not fetched this lap].
- **Costs and risks:**
  - The soffit is sunlit below 34°, so N10 applies more strongly: recoat every 3–4 years.
  - The stone wool over the opening faces the vented soffit void from 2760. Extend `band-windbarrier` down to 2760 (R1 to confirm).
  - Carbon roughly neutral: one course less, deeper furring.
  - Also yields an exact course count for the jamb walls.
- **Verdict:** better than v2 if the architect accepts the stronger honey plane and the recoat cycle. v2's single course is an acceptable fallback.

### P7: Palette keys to add to the spec (closes F4)
- Add a `finish` or `mat` key per visible part, so the colour travels with the spec:

| key | parts | RGB (year 0) | keyframes 5 / 15 / 30 |
|---|---|---|---|
| `metal-charcoal` (or keep `steel-prefinished`) | gutter, skirt, edge metal, flashing, liners, cassette, end plate | 52,54,56 | 54,56,58 / 60,62,63 / renewed |
| `frame-charcoal` | `sash`, `sash-top`, `head-track`, `track`, `nosing` | 52,54,56 | — / 58,60,61 / refinished |
| `mesh-black` | `band-vent`, `band-screen`, soffit joint mesh | 24,24,24 | — |
| `stainless-bb` | `grate`, channel edge rail, end caps | 176,178,178 | 150,150,146 / 146,146,142 / 146,146,142 |
| `parge-charcoal` | `jamb-plinth` | 78,78,76 | 74,76,72 (algae tint) / 72,74,70 / recoat |
| `reclaimed-stone` | all pavers, curbs, edge restraint, basin | 140,138,132 | 134,133,127 / 126,126,120 / 118,120,114 |
| `cedar-siding` (pre-greyed, P4) | wall courses, band course | 168,164,156 | 156,153,146 / 148,146,140 / 138,137,132 |
| `cedar-soffit` (pigmented oil) | soffit | 182,136,96 | 172,128,90 / 165,124,88 / 158,120,86 |
| `person` | proxies | 150,150,150 | — |

---

## 6. What the renders need next lap

1. **Model end conditions in APP mode:**
   - opening w 0…4800 with jambs and interlock;
   - jamb A w −1200…0 and jamb B w 4800…6000;
   - an eave end per N9;
   - ground SPAN per N3;
   - the water corner and shrub per N2.
   No section face should be visible from any exterior camera.
2. **Cameras** (spec coordinates; Rhino = (dx + x, −w, y)). Replace the two hard-coded shots with a table. Captures C1–C8 this lap used these cameras, with the run as it is now.

```python
CAMS = {  # name: ((x, w, y) camera, (x, w, y) target, lens, entourage)
    "C1-axial":     ((-6000, 2400, 1550), (0, 2400, 1450), 35, True),     # whole opening, eye level
    "C1b-axial-bare": ((-6000, 2400, 1550), (0, 2400, 1450), 35, False),  # same, no tree or shrub
    "C2-oblique":   ((-5000, -2600, 1550), (-300, 1600, 1700), 28, True), # jamb A, water corner, eave end
    "C3-eave-up":   ((-1400, 3600, 1600), (-300, 2200, 2950), 24, False), # gutter, soffit, slot, course, head
    "C4-threshold": ((-1500, 3600, 750), (-90, 2400, 0), 50, False),      # stone, grate, nosing, rail
    "C5-jamb-base": ((-1600, -1200, 900), (-100, 300, 150), 35, False),   # plinth, base course, liner, end cap
    "C7-far":       ((-7600, 600, 1150), (-300, 2400, 2900), 35, True),   # rain-garden floor: tree, eave, roof edge
    "C9-inside":    ((2200, 2400, 1200), (-6000, 2400, 1300), 28, True),  # seated view out: frame, shrub, tree
}
```
3. **Elevation:** perspective at eye level (C1b) replaces the parallel elevation for appearance judgements. If a parallel elevation is kept, label it "orthographic: roof slope and sedum not visible from the ground".
4. **Entourage:** hide `role` "planting" and "furniture" when the 4th tuple value is `False`.
5. **Palette (§P7):**
   - Add `mesh-black`, `stainless-bb`, `parge-charcoal`, `person`.
   - Change `reclaimed-stone` to 140,138,132.
   - Print every visible part whose `mat` falls back to a role colour, and every visible `softwood-pt` part (it should never show).
6. **Light:**
   - Turn the sun on: `doc.Lights.Sun.Enabled = True`, `SetPosition(datetime, 49.25, -123.1)`, with shadows.
   - Render C1 and C3 at 21 Jun 18:00 PDT (west) and 09:00 PDT (east), so the reveal, the tucked head and the lit soffit read.
7. **Articulation:**
   - 10 mm channel reveals at the 123 exposure;
   - 6 mm stone joints on the 156 module;
   - grate slots;
   - 7 mm soffit joints.
8. **Ageing set:** C1 and C3 at years 0, 5, 15 and 30, using the §1 and §P7 keyframes.

---

## 7. Top 3 changes that would raise the score most

1. **Clear the opening and unify the ground (N2, N8, N3).**
   - Rain chain, granite basin, scupper and rill at jamb A (`RILL_W` [−690, −520]).
   - Shrub pocket at jamb B.
   - Reclaimed granite throughout, 150-wide courses on a 156 module from x −171.5, with granite curbs.
   - Paving run past the jambs.
   - Charcoal parge plinth to +262 with the cedar base course at +292.
2. **Fix and finish the eave (N1, N6, N9).**
   - Gutter lip 3218, below the 3240 back, giving a two-plane charcoal band 3086–3320 with a 32 mm recessed line.
   - Membrane down to 3095. Skirt returned over the PT sliver, with weeps.
   - 0.8 mm low-gloss face. Scupper at 3205 over the basin.
   - An end plate or mitred corner.
3. **Build the dark picture frame with the west screen inside it now (N4, N5, §4).**
   - Charcoal jamb liners. Head flashing stopped at the jambs.
   - A 140 × 102 screen cassette in the existing head reveal (x −144.6…−4.6, y 2622–2724).
   - Guides in the reveals and the bottom bar landing on the grate.

These three would take the edge to about 8. P6 (soffit to head) and P4 (pre-greyed cedar) are the moves toward 9.

---

Sources this lap (web):
- PH-EXEC: Phantom Screens NZ, *Phantom Executive Motorised Screen* sheet, phantomscreens.co.nz/downloads/phantom-executive-motorised.pdf (read via pdftotext). Housing sizes 140 × 102 / 180 × 127 per search snippet: architectureanddesign.com.au and phantomscreens.co.nz search results [S\*].
- LWT: Lifetime Wood Treatment retail and user notes (canadianhomeworkshop.com, ardec.ca, colobar.ca, permies.com), search snippets [S\*].
- RG-SUP: stonecurators.com "Reclaimed Granite – Sawn Edge Plank Pavers"; experiencedbricks.com "Reclaimed Curbing"; vancouver.ca Homer Street heritage pavers (reuse practice), search snippets [S\*].
