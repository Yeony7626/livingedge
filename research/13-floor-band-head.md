# 13 — Floor-band head over the lift-and-slide wall (Detail 02, v3)

Researched: 2026-10-13. Scope: the **head** of Detail 02 (4.8 m wide × ≈ 2.7 m passive-house wood-aluminium lift-and-slide, motorised, near-flush accessible threshold, east or west) now that **a floor and another storey sit directly above the opening**. The v2 roof, eave, box gutter and green roof at the head are deleted. The head becomes a **floor-band junction**: header, floor, the wall above, the frame head, flashing, west shading and an optional canopy. The threshold (11 §3, R1/R2 lap-2 fixes) is unchanged and is not re-researched here.

User decisions taken as given: header = **glulam or built-up dimension lumber ("stacked studs")**, no steel; opaque walls = **WRC channel siding on a 19 mm vented cavity**; wall assembly = **09 §4.4 recommendation W1**.

## 0. How to read this file

### 0.1 Tags

Same convention as 11:
- **(S)** SOURCED: read this session in the cited document or web page, or in an approved project file (01–12) or a lap-2 review, cited in the row.
- **(S\*)** seen only in a search-engine summary. An indication; verify before it becomes a library value.
- **(I)** INFERRED: my calculation, a geometric consequence, or practice I could not tie to a document. The reason is given.
- Performance claims use **[S]**, **[S\*]**, **[I]**. Clause, table and page numbers are references and are not tagged.

### 0.2 Datums (as `.sketch/rhino/detail02.mjs`)

- **x = 0 at the exterior face of the sliding frame, EXTERIOR NEGATIVE**, interior positive. (Note: 11 used outward-positive. This file follows `detail02.mjs`.)
- **y = 0 at the ground-floor FFL**, up positive. Millimetres.
- **w** = along the wall; the opening runs w 0 → 4800.
- Frame geometry is kept from `detail02.mjs`: frame x 0 → 180; sash top rail y 2600 → 2690; head track y 2690 → 2730; visible glass top y 2600.

### 0.3 Source keys

| key | document | URL | how read |
|---|---|---|---|
| **V1** | City of Vancouver, *VBBL 2025* Book I Vol. 1 v4.01: Div. A 1.3.3.2–1.3.3.3; Div. B Table 4.1.3.2.-A, Table C-2, 10.2.1.1–10.2.1.4 | https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf | Local text copy (07/11 sessions), clauses re-read this session |
| **V2** | VBBL 2025 Vol. 2 (Part 9) v3.00: 9.10.6 (heavy timber 45 min), 9.10.8.1, Table 9.10.8.1, 9.10.8.3, "Application to Houses", 9.10.16.1–9.10.16.4, 9.23.4.1–9.23.4.2, 9.23.9.2, 9.23.10.6 (studs at openings), 9.23.11.4, 9.23.12.1–9.23.12.3, 9.27.3.8, Notes A-9.27.3.8.(1), (3), (4) incl. Table A-9.27.3.8.(4) and the shrinkage formula | https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf | Local text copy, read this session |
| **CWC-VM** | FPInnovations / Canadian Wood Council, *Vertical Movement in Wood Platform Frame Structures: Design and Detailing Solutions* (Doudak, Lepper, Ni, Wang) | https://cwc.ca/wp-content/uploads/publications-Design-and-Detailing-Solutions.pdf | Downloaded, text-extracted |
| **BCH-AT** | BC Housing / BC Hydro / City of Vancouver (RDH), *Illustrated Guide – Achieving Airtight Buildings*, Sept 2017 | https://www.zebx.org/wp-content/uploads/2018/07/Illustrated-Guide-Achieving-Airtightness.pdf | Text extracted in the 09 session (local copy); air-barrier-approach pages re-read this session |
| **CWC-GL** | Canadian Wood Council, *Glulam strength grades* (Table 2) | https://cwc.ca/wp-content/uploads/2019/03/Glulam-strength-grades.pdf | Downloaded, text-extracted |
| **EPD-GL** | Kalesnikoff glulam EPD 296 (ASTM; South Slocan BC; 16 Mar 2022–16 Mar 2027): A1–A3 fossil 124.50 kgCO2e/m³, 481.68 kg/m³, 817.67 kgCO2/m³ stored | via `.sketch/rhino/materials.json` (`glulam`) | Approved project factor (S) |
| **EPD-LVL** | AWC/CWC, *North American LVL* industry EPD transparency summary, UL 4788424634.105.1, 1 Jul 2020–30 Jun 2025 (**expired**): 361.45 kgCO2e/m³ (TRACI, cradle-to-gate) | https://old.cwc.ca/wp-content/uploads/2020/07/EPD-Industry-Average-LVL.pdf | Downloaded, text-extracted |
| **EPD-LUM** | CWC lumber EPD 845 (BC): 41.5 kgCO2e/m³; 785.4 kgCO2/m³ stored | via `materials.json` (`softwood-lumber`) | Approved project factor (S) |
| **CALCS** | Calcs.com, *Creep deflection in structural wood beam design* (NDS 2018 3.5.2: Kcr 1.5 dry sawn, 2.0 glulam) | https://calcs.com/blog/creep-deflection-in-structural-wood-beam-design | Read |
| **PH-EXEC** | Phantom Screens NZ, *Phantom Executive Motorised Screen* brochure (dated 21 Sep 2026) | https://phantomscreens.co.nz/downloads/phantom-executive-motorised.pdf | Downloaded, text-extracted |
| **REN-150** | Baukobox, *Renson Fixscreen 150 evo* product page | https://baukobox.de/en/products/2420-renson-renson-fixscreen-150-evo | Read |
| **REN-150F** | Renson, *Fixscreen 150 M1 F* product page | https://www.renson.eu/en-gb/producten-zoeken/zonwering/screens/fixscreen/fixscreen-150/fixscreen-150-m1-f | Read |
| **DL** | Detail Library: PHT39 *Passivhaus Twin Stud Timber Frame Door Head and Threshold*; *Passivhaus Twin Stud Timber Frame Detail Pack* | https://detail-library.co.uk/product/pht39-passivhaus-twin-stud-timber-frame-door-head-and-threshold/ ; https://detail-library.co.uk/product/passivhaus-twin-stud-timber-frame-detail-pack/ | Public pages read; no sign-up |
| **Reused** | 01, 06 (B, A.6), 09 (§0.3, §0.4, §2.1, §3.1, §4.4), 11 (§1, §2.1, §3.4, §4 H1–H14, §5, §7, C7), R1 lap 2 (§2.2, §2.3, N4, N5, P9), R4 lap 2 (P2), R5 lap 2 (N4, N5, N7, §4, P3, P6) | project files | Cited by key |

**Search-engine summaries only (S\*), not opened in full:**
- EN 1995-1-1 Table 3.2: kdef 0.6 / 0.8 / 2.0 for service classes 1 / 2 / 3 (solid timber; glulam and LVL the same).
- Spruce-pine 20f-E glulam E = 10,300 MPa (CSA O86 via beamdimensions.com; the DF-L value was not confirmed).
- MHZ Hachtel Zip 6: 110 mm cassette, up to 6 m wide, 3.5 m high, 20 m².
- Rollease Acmeda Zipscreen: 125 and 190 mm headboxes; 5.8 m × 4 m standard.
- Renson Fixscreen Minimal curtain wall 50: boxes 160 × 110 and 180 × 130 mm, maximum 3.6 m wide.
- Phantom 140 mm housing to ≈ 6.2 m wide (NZ summary).
- Boise Cascade Versa-Lam LVL EPD: 217.16 kgCO2e/m³.
- AWC LVL EPD 2025: 541 kg/m³.
- Armatherm FRR canopy/balcony thermal-break claims ("point transmittance reduced by as much as 70 %").
- Schöck: steel canopy penetrations cause heat loss and condensation risk.
- Wood-aluminium lift-and-slide product data:
  - ENERsign Primus 755: phB, ≤ 2800 mm high, ≤ 10 m wide, 0.60 W/(m²·K) at 4.5 × 2.8 m.
  - Internorm HS 330: up to 5.8 × 2.8 m, Uw 0.73.
  - Böhler VETRO XL-HS wood-alu: frame depth 177 mm.
  - Unilux HS: depth 213 or 330 mm.
- Structure magazine / IIBEC (Wetherholt & Hodgin 2021) on floor-line shrinkage:
  - through-wall flashing at each floor line;
  - sheathing gaps carried through the air/water barrier and the cladding;
  - end dams.
- DL167 (Passivhaus window head airtightness).

**Not accessible this session:**
- CSA O86 and O122 text: glulam E, fb and fcp values, creep clause 5.4.2, camber and MC at manufacture.
- VBBL Span Tables 9.23.12.3.-A to -D: the text layer lists them but the tables were not in the extract.
- BC Hydro *Building Envelope Thermal Bridging Guide*: canopy and bracket χ values; the PDF was not opened.
- RDH/BC Housing *Building Enclosure Design Guide*: wood-frame floor-line drawings.
- Renson Fixscreen 150 installation manual: box dimensions.
- Rollease and Phantom drawings: the PDFs had no usable text, or the dimensions were not paired.
- Westeck, Cascadia and ENERsign head-frame drawings.

### 0.4 Assumptions about the building (no fixed size given)

| id | assumption | why | tag |
|---|---|---|---|
| B1 | **Base case: 2 storeys**, wood platform frame. The opening is in the ground-floor exterior wall; the header carries the 2nd floor, the 2nd-storey wall and a share of the roof | Brief: "one floor plus a wall and roof share" | given / (I) |
| B2 | Floor joists **perpendicular** to the façade, bearing on the header, span 4.8 m → tributary **2.4 m**. Roof tributary on the wall line **3.0 m** (worst case checked: 4.8 m) | Worst common case; joists parallel to the façade cut the header load by ≈ 25 % (§3.2) | (I) |
| B3 | Variant: **3 storeys** (two floors + roof over the header) | Brief range 2–3 storeys | (I) |
| B4 | Building area ≤ 600 m² | Keeps Part 9 open for C, D, E (§2.1) | (I) |
| B5 | Loads: floor D 1.0 kPa incl. partitions, L 1.9 kPa (residential); roof D 1.0 kPa; wall 0.6 kPa × 2.7 m; snow S = 1.8 × 0.8 + 0.2 = **1.64 kPa** | Ss 1.8, Sr 0.2 for Vancouver City Hall (S, V1 Table C-2; the 2020s "General" row gives 1.9 / 0.3). Cb 0.8 and the factors are Part 4 defaults (I). L 1.9 kPa: the Table 4.1.5.3 text layer is garbled, so the value is (S\*) | (S)/(S\*)/(I) |
| B6 | Header clear span ≈ 4,860 (frame 4,800 + shims); bearing 114 each end → length ≈ 5,088; **design span L = 5.0–5.1 m** | Brief | (I) |

### 0.5 Consistency with approved research and reviews

| # | existing entry | this file | status |
|---|---|---|---|
| 1 | 11 H1 / C7: header Δ ≤ 3 mm under superimposed load after natural sag (MAR-ULS; Loewen 1/8 in) | Kept, and extended to include **creep and plate shrinkage** (§2.3, §3) | consistent; extended |
| 2 | 11 H2, H11–H13; 06 B: roof, eave, soffit, gutter at the head | **Deleted**: a floor band replaces the eave | superseded (brief change) |
| 3 | 11 §3.4: overhang ratio 0.22 → "medium" exposure at the threshold | Without an eave the threshold goes to "high"; the **canopy restores 0.23** (§4.6) | consistent intent |
| 4 | 09 §4.4 W1: 2×6 @ 400, dense-pack cellulose, 6 mil poly, 12 ply, breather membrane, **80 WF**, 19 PT strapping, 19 WRC | Used for the wall above and the band. One change: the sheathing membrane becomes a **vapour-permeable self-adhered air/water barrier**, the primary air barrier (C1) | consistent; one upgrade |
| 5 | R1 N4: two-piece head flashing (membrane inboard, metal drip only outboard of the insulation) | Adopted (FB13–FB15) | consistent |
| 6 | R1 N5: lintel needs fixing grounds; check ≤ 3 mm | Glulam takes screws directly on its face (exterior ground). A shimmed **38 mm interior fixing ground** sits under it for the frame (FB4) | resolved |
| 7 | R1 §2.3: head gyp f_Rsi 0.67; target ≥ 0.70, ideally ≥ 0.80 with P9 | 2-D screening of this design: **0.91–0.93** at the installation junction (§5.2) | resolved [I] |
| 8 | R4 P2: flush glulam 175 × 494 with hung joists (roof only) | Flush glulam kept; with a **floor + wall** above the size is **175 × 684** (§3) | consistent concept; larger section |
| 9 | R5 N4/P3: west screen cassette in the head reveal + dark metal reveal liners; R5 N5 end dams inside liners | Adopted; cassette zone 150 × 118 and liners 150 deep (§4.4–4.5) | consistent; dimensions revised |
| 10 | 11 §1 / §7: NAFS DP 960 / PG20 / 180 Pa; 260 Pa east | Unchanged. The canopy does not change the rating required (§4.6) | consistent |
| 11 | 06 A.6 / R1: hemmed drip at the head | Kept | consistent |

---

## 1. Summary of decisions

| topic | decision | basis |
|---|---|---|
| Code path | **Part 9** if Group C, D, E or F2/F3, ≤ 3 storeys and ≤ 600 m². **Part 3** for any Group A (library, pavilion, assembly) at any size. Part 4 structure applies anyway unless the building has ≤ 2 dwelling units. Either way the **header is an engineered (Part 4) member**: the 3 mm limit is far stricter than any span table | V1 1.3.3.3 (S); §2 |
| Header | **Flush glulam, D.Fir-L 24f-E, 175 × 684** (18 laminations × 38), length ≈ 5,090, top flush with the 302 I-joists, joists in face-mount hangers. Indicative Δ(L+S) 1.4 mm, **2.3–2.6 mm including creep** at L = 5.1 m (base case). Use **215 × 684** if the roof tributary reaches 4.8 m, and **215 × 760** for 3 storeys | §3 (I, from S loads) |
| Built-up "stacked studs" | **Cannot meet 3 mm at this span.** A 3-ply 2×12 deflects ≈ 40 mm and a 4-ply ≈ 30 mm under live + snow alone, 10–20 × the limit. Nailed stacks do not act compositely; glued stacking is glulam | §3.2 (I) |
| LVL | Works: 4-ply 1¾ in × 24 in (178 × 610, 2.0E) gives Δ ≈ 2.8 mm incl. creep. About **3 × the carbon** of glulam (361 vs 124.5 kgCO2e/m³) | EPD-LVL, EPD-GL (S); §3 |
| Posts and bearing | Each side: **3 jack studs (114 bearing) + 2 king studs**, or one 130 × 152 glulam/LSL post. Bottom plate and jacks in **LSL/LVL** at the opening, to keep the head shrinkage under 0.3 mm | V2 9.23.10.6 (S, ≥ 3 studs for lintels > 3 m); bearing (I) |
| Fixing grounds | Interior: a **D.Fir 38 × 175 fixing ground** under the glulam, shimmed level to ±1 mm after the dead load is on; the frame head screws go into it, not into the glulam tension lamination. Exterior: the glulam face is the screw ground for the cant, strapping and canopy | 11 H3 (S, flat solid surface); R1 N5 (S); (I) |
| Head gap | **12 mm**: stone-wool fill; exterior vapour-open window tape with a movement loop lapped under the WRB; interior airtight tape with a loop. **No foam** | 11 H6 (S, no expanding foam); R1 F5 (S); (I) |
| Head flashing | **Two-piece:** self-adhered membrane sub-flash on a 6 % PT cant (x −150 → +24); 24 ga charcoal **metal drip only at the liner face** (x −150), kick to −160, hemmed, end dams 25 | R1 N4 (S); V2 9.27.3.8.(4) (S) |
| Air barrier | **Exterior, vapour-permeable self-adhered membrane** on plywood, ground and glulam: continuous past the floor with no interior interruption. 6 mil poly stays as the interior vapour barrier (09 W1) | BCH-AT (S): exterior approaches "consistently perform better" |
| Insulation | 80 WF continuous over the glulam and the floor line. 30 mm stone-wool head block in front of the frame head (P9) | 09 W1 (S); R1 P9 (S) |
| Shading | **Reserved cassette zone 150 high × 118 deep** at x −150 → −32, y 2598 → 2748, in front of the frame head stack (no view loss). Fits 110–120-deep ZIP cassettes. A 4.8 m span needs a 140/180-class system; 100 mm housings stop at 3.0 m wide | PH-EXEC (S); REN-150 (S); MHZ (S\*) |
| Reveal liners | 0.76 mm charcoal PVDF steel "picture frame", **150 deep** (x 0 → −150), so it stands **56 mm proud of the cedar face** (cedar at −94 with W1). Carries the screen guides | R5 N5/P3 (S); (I) |
| Canopy | **Yes, recommended for both orientations.** 656 mm from the cedar face (tip x −750), soffit at y 2800, 160 thick at the wall falling 2 % outward. Three steel knife-plate brackets on 15 mm structural thermal-break pads, screwed into the glulam through the WF. It restores the v2 overhang ratio (0.23) at the flush threshold | §4.6 [S evidence / I geometry] |
| Floor-line shrinkage | Over the opening ≈ **0.7 mm** (upper KD bottom plate). Beside it ≈ 2.1 mm per floor (plates). No cladding joint needed for 2–3 storeys with engineered joists and rims. A joint and flashing are needed if sawn joists and rims are used (≈ 6 mm per floor) | V2 A-9.27.3.8.(4) formula (S); (I) |
| Carbon | Header package ≈ **110 kgCO2e per opening** (glulam 76, hangers 19, posts 7, screws 6, ground 1.5), ≈ 23 per m. About 650 kgCO2 stored, long-cycle. LVL route ≈ 235; the v2 steel route was ≈ 250+. Canopy ≈ 180 (≈ 95 with timber outriggers); cassette ≈ 160–200 aluminium | §3.5 (S factors, I quantities) |

---

## 2. Code path and what changes at the floor band

### 2.1 Part 9 or Part 3

| case | Div. B parts | energy (Part 10) | fire at the floor band | tag |
|---|---|---|---|---|
| Group C house or ≤ 2 dwelling units, ≤ 3 storeys, ≤ 600 m² | Part 9. **Part 4 does not apply** (≤ 2 principal dwelling units) | 10.2.1.4: performance path (10.2.2.4 + 10.2.2.6 + 10.2.2.7) or prescriptive (Table 10.2.2.6: walls, **box and rim joists 3.85**) | **No rating**: Table 9.10.8.1 does not apply to a dwelling unit with no other unit above or below, or to a single detached house | V1 1.3.3.3.(1)–(2); V2 "Application to Houses"; 09 §2.1 (S) |
| Group C multi-unit (stacked units), ≤ 3 storeys, ≤ 600 m² | Part 9 + **Part 4** (more than 2 units). **Part 5 applies** to Group C multi-family more than 2 storeys or more than 600 m² | 10.2.1.4 (Group C < 4 storeys) | Floors **45 min** (Table 9.10.8.1, 2–3 storeys). The header supporting that floor needs **≥ 45 min** (9.10.8.3.(1)). Heavy timber per 3.1.4.7 counts as 45 min (9.10.6) | V1 1.3.3.3.(2)–(3); V2 9.10.8.1, 9.10.8.3, 9.10.6 (S) |
| Group D / E, ≤ 3 storeys, ≤ 600 m² | Part 9 + Part 4 | 10.2.1.3: energy and emissions performance (10.2.2.5); no prescriptive RSI table | 45 min floors ("all other occupancies", Table 9.10.8.1) | V1 10.2.1.3 (S); V2 (S) |
| **Group A** (library, pavilion, café seating) — any size | **Parts 3, 4, 5, 6** (Part 3 building); envelope under Part 5 | 10.2.1.2: 10.2.2.2 (ASHRAE 90.1 / NECB) | Part 3 (3.2.2) rules; not researched | V1 1.3.3.3.(1)(b)(i) (S); 09 §0.4 |

**Reading [I].**
- For the tool, treat the floor band as **engineered in all cases**.
- Part 9 lintel tables (9.23.12.3) apply only to residential occupancy, studs larger than 38 × 64 and supported joist spans ≤ 4.9 m (S, V2). They size for strength and code deflection, not for a 3 mm door limit, so a 4.8 m lift-and-slide header is a Part 4 design even in a house.
- The "BC Energy Step Code" is a BCBC instrument. In Vancouver the VBBL Part 10 paths above govern (S for the paths; I for the Step Code remark).

### 2.2 What changes for the floor band

| item | change from the v2 eave head | tag |
|---|---|---|
| Fire separation | Stacked units or D/E/A: the header and posts need the floor's rating (45 min Part 9). A 175 × 684 glulam is very likely above the 3.1.4.7 heavy-timber minimums (table not re-read). Otherwise a char calculation (CSA O86 Annex B) or gypsum encapsulation applies. In a house: no rating | V2 9.10.8.3.(1), 9.10.6.1 (S); (I) |
| Fire blocks in the wall | Not needed at the floor line if the wall has **one concealed air space ≤ 25 mm**: the 19 mm cavity qualifies. Counter-battens over 25 mm would trigger blocks at each floor and every 3 m vertically | V2 9.10.16.3.(1)–(2)(a) (S); 09 §2.3 |
| Rim | Over the opening the **glulam is the rim**: no separate rim board. Beside the opening: an LSL/OSB rim board, so shrinkage matches (CWC-VM rule 2) | CWC-VM (S); (I) |
| Header design | Engineered. 9.23.12.2.(2) nailing applies only to built-up lintels; 9.23.10.6.(1) requires **tripled studs** (2 jacks + 1 king minimum) for lintels > 3 m | V2 (S) |
| Joists to header | Side-framed joists: hangers or ledger strips ≥ 38 × 64 (9.23.9.2.(2)). The ledger is for sawn joists only; **I-joists use their maker's hangers** | V2 9.23.9.2 (S); (I) |
| Top plates | A flush header cuts the double top plate of the ground-floor wall. Tie it across the header with steel straps (top-plate continuity per 9.23.11.4 and the engineer's chord design) | V2 9.23.11.4 (S); (I) |
| Part 10 thermal | Glulam band ≈ RSI **3.7–3.8** (glulam 175 at 0.0085 RSI/mm ≈ 1.46; 80 WF 1.90–2.00; films and cladding 0.33). That is just under 3.85 if the City reads the glulam as a "box/rim joist". Fix: 12.7 gypsum on the glulam interior (+0.08), or 100 WF in the band. In the W1 wall average it counts as framing | 09 §0.3 (S method); V1 Table 10.2.2.6 (S); (I) |
| Accessibility | Unchanged: 3.8 applies to all Part 9 buildings except houses (3.8.2.1); always in Part 3 | V1 1.3.3.3.(4) (S); 11 G12 |
| Spatial separation | A 13 m² glazed opening plus combustible WF and cedar. If this face is near a property line, 9.10.14/9.10.15 limiting-distance checks may cap the unprotected opening or require non-combustible cladding | V2 9.10.15.4.(7) context (S); not checked (I) |

### 2.3 Wood shrinkage at the floor band, and the head gap

**Method (S, V2 Note A-9.27.3.8.(4)):**
- Shrinkage = (total height of horizontal members) × (initial MC − equilibrium MC) × 0.002.
- Equilibrium MC in BC = **10 %** (Table A-9.27.3.8.(4)).
- "For three-storey constructions to which Part 9 applies, cumulative longitudinal shrinkage is negligible."
- KD / S-Dry lumber has MC ≤ 19 % (S, CWC-VM).

| location | horizontal wood | shrinkage (I, from the S formula) | effect |
|---|---|---|---|
| **Header bearing → slab** (moves the frame head relative to the sill) | KD bottom plate 38 (jacks are longitudinal) | 38 × 9 × 0.002 = **0.7 mm** (KD SPF); **≈ 0.1 mm** with an LSL/LVL plate at ≈ 10 % MC | Closes the head gap uniformly. It is not deflection, but it eats track clearance |
| Glulam depth (moves the upper floor over the opening) | 684 at 12 % MC at delivery (assumed) | 684 × 2 × 0.002 = **2.7 mm**; 6.8 mm if delivered at 15 % | Upper floor over the header drops relative to its neighbours. **Specify glulam MC ≤ 12 % and keep it dry on site** (I) |
| Floor line beside the opening | 2 top plates 76 + upper bottom plate 38 (I-joists and LSL rim ≈ 0) | 114 × 9 × 0.002 = **2.1 mm per floor** | Cedar, strapping and WRB absorb it (fastener bending through the 80 WF). No cladding joint needed |
| Same, sawn joists and rim (2×10 rim, KD) | 76 + 235 + 38 = 349 | **6.3 mm per floor** | Needs a horizontal cladding joint and flashing at each floor line (S\*, Structure/IIBEC) |

**Head-gap budget (I), base case at L = 5.1 m:**
- Δ(L+S) 1.44 + creep 0.8–1.1 = **≤ 2.6 mm < 3 mm** ✓.
- Plate shrinkage 0.7 (KD) or 0.1 (LSL).
- Total closure ≤ 3.3 mm against a **12 mm** gap ✓.
- The 3 mm criterion is the *differential* along the span (11 H1, S). Uniform plate shrinkage is a separate loss of panel-to-track engagement. That is why the opening plate and jacks are specified in LSL/LVL.
- The head anchors must allow vertical slip (slotted or sliding head fixings per the maker). The interior cap must not touch the head track (11 H8, S).

---

## 3. Header

### 3.1 Criterion and loads (I, from S loads)

- **Limit:** Δ ≤ 3 mm over the span under superimposed load (floor live + snow) after natural sag and permanent load (S, 11 H1). **Plus creep**, so the 3 mm still holds at year 5+ (user decision, R1 N5).
- **Creep conventions** (no CSA O86 text was read):
  - EC5 **kdef 0.6** (service class 1) on (D + 0.3 L) (S\*);
  - NDS **Kcr 2.0 for glulam**, i.e. +1.0 × Δ_D (S, CALCS).
  - Both are reported below. The section is chosen to pass the stricter one.
- **Line loads, base case** (B2, B5):
  - D = 7.5 kN/m;
  - L = 4.6 kN/m;
  - S = 4.9 kN/m.
- **Factored** (V1 Table 4.1.3.2.-A case 2/3, S): w_f = 21.3 kN/m, M_f ≈ 69 kN·m, V_f ≈ 54 kN at L = 5.1 m.
- **Stiffness governs.** Strength uses about 20–25 % of a 175 × 684 glulam's moment capacity (I, from typical 24f-E values, not O86 text).
- Calculation: `scratchpad/r13/hdr.mjs` (I).

### 3.2 Comparison (L = 5.1 m; Δ in mm; E: DF-L glulam 12,400 MPa (I, CSA value not confirmed), S-P glulam 10,300 (S\*), LVL 2.0E 13,790 (I, 2.0 × 10⁶ psi), SPF No.1/2 9,500 (I))

| option | section (b × d) | Δ L+S | Δ incl. creep (EC5 / NDS) | meets 3 mm? | depth below joist top (302 I-joist) | notes |
|---|---|---|---|---|---|---|
| **Glulam flush, DF-L 24f-E** | **175 × 684** | **1.44** | **2.25 / 2.55** | **✓ base case**; worst roof trib 2.87 / 3.29 (marginal) | 382 below the joist underside | **Recommended.** Fits the 2×6 wall: x +25 → +200, 10 mm proud of the interior plaster plane |
| Glulam flush, DF-L | 175 × 646 | 1.71 | 2.68 / 3.08 | marginal | 344 | Acceptable only if the engineer confirms roof trib ≤ 3 m and EC5-type creep |
| Glulam flush, DF-L | 215 × 684 | 1.17 (worst 1.54) | 1.84 / 2.06 (worst 2.33 / 2.74) | ✓ incl. worst roof trib | 382 | Use when the roof trib reaches 4.8 m. 215 is 75 wider than the studs: fur the interior |
| Glulam flush, DF-L, **3 storeys** | 215 × 760 | 1.27 | 2.04 / 2.27 | ✓ | 458 | 3-storey variant (B3) |
| Glulam flush, S-P 20f-E | 175 × 684 | 1.74 | 2.71 / 3.1 | marginal | 382 | If the BC supplier's species is spruce-pine |
| Glulam **dropped** (joists on top plates over it) | 175 × 684 | same | same | ✓ | adds 684 + 76 plates **below** the floor: band ≈ +380 vs flush | Simpler (no hangers, top plates continuous) but floor-to-floor ≈ 3.88 m instead of 3.50 m |
| **LVL** 2.0E, 4-ply 1¾ × 24 in | 178 × 610 | 1.80 | 2.81 / 2.5 (NDS Kcr 1.5 for SCL) | ✓ base case | 308 | ≈ 3 × glulam carbon per m³ (S). Ply-glued, no camber, MC ≈ 6–10 % (low shrinkage) (I) |
| LVL 3-ply | 133 × 610 | 2.40 | 3.75 | ✗ | — | — |
| **Built-up SPF ("stacked studs")**, 3-2×12 nailed | 114 × 286 | **39.6** | 62 | **✗ by 13–20 ×** | — | 9.23.12.2.(2) nailing (S) gives no composite action between plies |
| Built-up SPF, 4-2×12 | 152 × 286 | 29.7 | 46 | ✗ | — | Same |
| Built-up "stacked" vertically (plies on top of each other, nailed) | n × 286 | ≈ Δ(1 member)/n | — | ✗ | — | Without glue each member bends on its own axis: EI adds linearly, not as d³. Glued and pressed, it **is** glulam |
| Joists **parallel** to the façade (any header) | e.g. glulam 175 × 532 | 1.81 | 2.9 | ✓ | — | Floor trib ≈ 0.6 m. Cuts the header to ≈ 175 × 532–570. A planning decision (B2) |

**Plain answer:** built-up dimension-lumber headers **cannot meet ≤ 3 mm at a 5.0–5.1 m span** carrying a floor, a wall and a roof share. They miss by an order of magnitude [I, from S loads and standard E]. Built-up lumber would need intermediate posts, which a 4.8 m clear opening does not allow.

### 3.3 Recommendation and what the engineer must confirm

**Recommended:**
- **Flush glulam, D.Fir-L 24f-E, 175 × 684**, straight (**no camber**), MC ≤ 12 % at delivery.
- Appearance grade if exposed inside (CWC-GL: specify both stress and appearance grade, S).
- Joists: 302 I-joists at 400 o.c. in face-mount hangers on the glulam's interior face.
- Subfloor continuous over the glulam top.
- Ground-floor top plates strapped across the glulam ends.
- 2-storey base case.
- Upgrades: **215 × 684** if the roof tributary is over 3 m; **215 × 760** for 3 storeys.
- Alternate: LVL 178 × 610, if supply or schedule requires.

**The engineer confirms (Part 4):**
1. Tributary widths, joist direction, any point loads from the upper storey (posts, girder trusses), and the roof dead load.
2. Δ ≤ 3 mm under L + S **plus creep** under O86 5.4 (clause not read here), with E and strength from O86 / the supplier.
3. Snow including drift or sliding from the upper roof onto the canopy (§4.6), and wind uplift on the canopy.
4. Bearing (§3.4), hanger capacities, and the top-plate strap and chord force across the header.
5. Lateral: the 4.8 m opening removes a braced wall panel. Bracing is relocated or a portal frame is designed (9.23.13 / Part 4).
6. Fire rating where 9.10.8.3 applies (§2.2).
7. That frame-head screws into the 38 mm ground do not enter the glulam's outer tension lamination. If they must, the allowable notching and holes.

### 3.4 Posts, bearing and fixing grounds

| item | spec | tag |
|---|---|---|
| End reaction | ≈ 54 kN service + factored base case; 71 kN worst roof trib; 84 kN at 3 storeys (factored) | (I) |
| Jack studs | **3 × 38 × 140** each side (bearing 114 mm). Under SPF fcp ≈ 5.3 MPa, φ 0.8: needs ≈ 91 mm base case, 120 mm worst case → 4 jacks or a post | V2 9.23.10.6.(1) minimum (S); fcp (I, O86 value not read) |
| King studs | 2 each side, full height to the top plates; nailed to the jacks | (S) 9.23.10.6; (I) count |
| Alternative post | 130 × 152 glulam or 89 × 140 ×2 LSL post, bearing on an **LSL bottom plate** on the grade beam beside the threshold slot (11 §6.3: jambs bear on the foundation, S) | (I) |
| Opening plate and jacks | LSL/LVL (low MC) so plate shrinkage under the header is ≈ 0.1 mm (§2.3) | CWC-VM rule 2 (S); (I) |
| **Interior fixing ground** | D.Fir KD 38 × 184 ripped to 175, x +25 → +200, y 2742 → 2780. Screwed to the glulam soffit at 300. Shimmed so the head is **level to ±1 mm** and straight to the frame maker's tolerance, **after** the upper floor and roof dead loads are applied. Natural sag is excluded from the 3 mm (S) | 11 H3 (S, flat solid surface); MAR-ULS via 11; (I) |
| Exterior grounds | None needed: the glulam face takes the cant screws, the strapping screws (through 80 WF) and the canopy screws directly. That closes R1 N5's "no exterior fixing ground" | R1 N5 (S); (I) |
| Sequence | Frame installed after the upper floor and roof are on and the building is dried in; head level re-checked; head anchors slotted for ±3 mm | MAR-ULS / LOE-INST via 11 (S); (I) |

### 3.5 Carbon per opening (A1–A3 fossil; biogenic reported separately, long-cycle = 0 under the CoV Addendum, 09 §0.2)

| item | quantity (I) | factor | kgCO2e | stored kgCO2 |
|---|---|---|---|---|
| Glulam 175 × 684 × 5.10 m | 0.610 m³ | 124.50 /m³ (S, EPD-GL) | **76.0** | 499 |
| Hangers, 12 × ≈ 0.6 kg galvanized | 7.2 kg | 2.68 /kg (S2, `steel-prefinished` proxy) | 19.3 | — |
| Jacks + kings (or LSL posts), 2 × 5 × 38 × 140 × ≈ 3.1 m | 0.163 m³ | 41.5 /m³ (S, EPD-LUM) | 6.8 | 128 |
| Structural screws and straps | ≈ 2 kg | 2.9 /kg (S2, stainless proxy) | 5.8 | — |
| Fixing ground 38 × 184 × 5.1 m | 0.036 m³ | 41.5 | 1.5 | 28 |
| **Header package, glulam route** | | | **≈ 110 (≈ 23 /m)** | **≈ 655** |
| LVL 178 × 610 × 5.1 + same extras | 0.554 m³ | 361.45 (S, EPD-LVL, expired); 217 Boise (S\*) | ≈ 234 (≈ 150 with the Boise factor) | — (LVL storage not declared in that EPD) |
| v2 steel W250×39 × 5.3 m (reference) | 207 kg | 1.22 (S2, `steel-section`) | ≈ 252 + packers | — |
| Built-up 3-2×12 (fails) | 0.166 m³ | 41.5 | 6.9 | 130 |

The glulam route is ≈ −140 kgCO2e against v2 steel, i.e. ≈ −30 kg/m, close to R4 P2's −38.5 /m (S). The hangers are about a fifth of the package: top-flange I-joist hangers or a sawn-ledger bearing would cut them, but a sawn ledger shrinks against the glulam (§2.3).

---

## 4. Floor-band junction (construction order; coordinates in the 0.2 datums)

### 4.1 Key datums of the band

| point | x (mm) | y (mm) | tag |
|---|---|---|---|
| Visible glass top / sash top rail bottom | 15 → 85 | **2600** | (S, `detail02.mjs`) |
| Frame head (head track) top | 0 → 180 | **2730** | (S, `detail02.mjs`) |
| Head gap | 25 → 200 | 2730 → **2742** | (I); 10–15 (S, 11 H6) |
| Fixing ground | 25 → 200 | 2742 → **2780** | (I) |
| **Glulam header** 175 × 684 | **25 → 200** | **2780 → 3464** | (I, §3) |
| I-joists 302 (hung), tops flush | 200 → | 3162 → 3464 | (I) |
| Ground-floor ceiling (12.7 gypsum on joists) | 200 → | **3149** underside | (I) |
| Subfloor 19 | 25 → | 3464 → 3483 | (I) |
| Upper bottom plate (LSL) 38 × 140 | 37.5 → 177.5 | 3483 → 3521 | (I) |
| **2nd-floor FFL** (13 mm finish) | — | **≈ 3496** (floor-to-floor ≈ 3.50 m) | (I) |
| WRB / air-barrier plane (ply and glulam faces) | **+25 → +24** | continuous | (I) |
| WF face | **−56** | — | 09 W1 80 (S); (I) |
| Strapping / cavity | −56 → −75 | — | 09 (S) |
| **Cedar face** | **−94** | — | 09 (S); (I) |
| Reveal-liner face ("picture frame") | **−150** | +5 → 2754 | R5 (S, 145 deep); (I) |
| Screen cassette zone | −150 → −32 | **2598 → 2748** | (I) |
| Head drip kick | −160 | 2750 | (I) |
| **Canopy** soffit / tip | −94 → **−750** | soffit **2800**; top 2960 at the wall, 2947 at the tip | (I) |
| Cavity bottom (screened vent) over the canopy | −56 → −75 | ≈ 2975 | (I) |

### 4.2 Ordered layer table (FB1 → FB30, in construction order)

| # | component | material | dimensions / laps / slopes (drawable) | support and fixing | source |
|---|---|---|---|---|---|
| FB1 | Posts at the jambs | 3 jacks + 2 kings per side (or a 130 × 152 glulam/LSL post) on an **LSL bottom plate** | Jacks to y 2780; kings to the top plates | Nailed per 9.23.10.6; on the grade beam beside the slot | V2 (S); §3.4 |
| FB2 | **Glulam header** | DF-L 24f-E, 175 × 684, straight, MC ≤ 12 %, appearance grade inside | **x 25 → 200, y 2780 → 3464**, length ≈ 5090 (w −145 → 4945) | Bears 114 on the jacks; tied to the kings | §3 (I) |
| FB3 | Top-plate ties | Steel straps across the glulam ends | Per engineer | Nailed to the plates and screwed to the glulam | V2 9.23.11.4 (S); (I) |
| FB4 | **Interior fixing ground** | D.Fir KD 38 × 175 | **x 25 → 200, y 2742 → 2780**; shimmed level ±1 mm | Screws at 300 into the glulam soffit; installed after the dead load | §3.4 |
| FB5 | Floor joists | 302 I-joists at 400 | Tops flush at 3464; bottoms 3162; ends at x 200 | Face-mount hangers to the glulam interior face | V2 9.23.9.2 (S); (I) |
| FB6 | Subfloor | 19 T&G ply/OSB | y 3464 → 3483, from x 25 inward; glued and screwed | Over joists **and** glulam top | (I) |
| FB7 | Upper wall | 2×6 at 400 on an LSL bottom plate, dense-pack cellulose, 6 mil poly, 12.7 gypsum | Plate x 37.5 → 177.5, y 3483 → 3521; studs above; gypsum x 177.5 → 190.2 | Nailed to the subfloor and glulam | 09 W1 (S) |
| FB8 | Upper-wall sheathing | 12.5 plywood | x 25 → 37.5, from y 3467 up. **3 mm horizontal gap** at the glulam top (3464 → 3467) | Nailed to studs and plates | (I); S\* sheathing-gap practice |
| FB9 | **WRB / primary air barrier** | Vapour-permeable self-adhered membrane (≈ 1 mm), primed | **Plane x 25 → 24**, continuous from the jamb walls over the ground face and glulam (2742 → 3464), across the floor-line gap (folded 10 mm loop over the gap), up the upper wall; shingle laps ≥ 75 | Fully adhered (no fasteners through it) | BCH-AT (S); 06 75 mm lap (S); (I) |
| FB10 | **Head-gap fill** | Stone-wool strip, friction-fit | x 25 → 170, y 2730 → 2742 | — | 11 H6 (S, no foam); R1 (S) |
| FB11 | **Exterior window tape** (weather and wind seal) | Vapour-open window-connection tape with a movement loop | Adhered to the frame's exterior face from y 2705, over the frame top x 0 → 25 at 2730, **loop across the 12 mm gap**, up the ground and glulam face to y 2800, **under** the FB9 lap (WRB laps over it ≥ 75) | — | R1 F5 (S intent); (I) |
| FB12 | **Interior air/vapour seal** | Airtight tape (vapour-retarding) with a 10 mm loop | From the frame's interior face (x 180) across the gap to the ground's interior face (x 200), lapped onto the 6 mil poly of the jamb walls; continuous round the head and jambs | — | 11 H7 (S); R1 N5 `head-airseal` (S); (I) |
| FB13 | **Head insulation block** (P9) | 30 mm stone-wool board (Comfortboard 80 class: non-hygroscopic in a drained reveal) | **x −30 → 0, y 2690 → 2758** and **x 0 → 25, y 2730 → 2758** (outside the FB11 tape) | Friction-fit; held by the cant | R1 P9 (S); 09 (S) |
| FB14 | **Head cant** | PT D.Fir, tapered | **x −150 → +24; bottom y 2758; top y 2792 at x +24 falling 6 % to 2781.6 at x −150** | Back edge screwed through FB9/FB11 into the ground/glulam face; screws through the membrane sealed | R1 N4 (S); V2 9.27.3.8.(4)(b) 6 % (S) |
| FB15 | **Head sub-flash** (inboard piece) | Self-adhered membrane, compatible with FB9 | From y 2860 on the WRB face (**WRB above laps over it ≥ 75**), down to the cant at y 2792, over the cant to x −150, down over the drip flange. End dams turned up 25 at the jamb liners | Adhered | R1 N4 (S); V2 9.27.3.8.(4)(a) "≥ 50 upward inboard of the sheathing membrane" (S); end dams ≥ 25 (S) |
| FB16 | **Head drip** (outboard piece) | 24 ga prefinished steel, charcoal, hemmed | Flange on the cant x −125 → −150 (under FB15); face x −150.3 from 2781 → 2754; kick to **(−160, 2750)**: 10 past the liner face. End dams 25, folded **inside** the jamb liners | Screwed through the flange into the cant (timber, not steel) | R1 N4 (S); R5 N5 (S); 06 A.6 hem (S) |
| FB17 | **Exterior insulation**, band and wall | 80 wood-fibre board (S706.1 evidence or alternative solution, 09) | **x −56 → +24**; bottom on the cant (≈ 2787); continuous over the glulam, the floor line (joints offset ≥ 300 from the sheathing gap) and the upper wall | Held by strapping screws into the glulam and studs | 09 W1 (S); (I) |
| FB18 | Canopy bracket back plates (3 no.) | 10 mm HDG steel 300 (h) × 160 (w) on a **15 mm structural thermal-break pad** (Armatherm FRR class) | Pad x +24 → +9 on the WRB (boot-sealed); plate x +9 → −1; y 2800 → 3100; at w ≈ 300, 2400, 4500; WF cut locally to 55 | 4 × Ø10 fully threaded screws into the glulam (Part 4) | S\* (Armatherm, Schöck); (I) |
| FB19 | Canopy knife plates | 10 mm HDG steel | x −1 → −740; 150 deep at the root (y 2805 → 2955) tapering to 90 at the tip | Welded to FB18 | (I) |
| FB20 | **Canopy ledger** | PT 38 × 184 | **x −94 → −56, y 2792 → 2976**, slotted at the knife plates | Inclined structural screws through the WF into the glulam (vertical shear only) | (I) |
| FB21 | Canopy framing | PT 38 × 140 outriggers bolted each side of each knife plate (tapered 140 → 89); PT 38 × 89 purlins at 400 parallel to the wall | Top falls **2 % outward** (2960 at x −94 → 2947 at x −750) | Bolted | (I) |
| FB22 | Canopy deck and roofing | 12.5 ply, self-adhered membrane, 24 ga charcoal standing-seam or flat-lock cap; hemmed drip at the tip | Cap turned up the WF face behind the strapping to y ≈ 3080 (upstand ≥ 100) | Clips | 06 B15 practice (S); (I) |
| FB23 | **Canopy sub-flash** (through-insulation) | Self-adhered membrane on a 6 % bevel cut in a horizontal WF joint at y ≈ 2976 | From the WRB (lapped under it at y ≈ 3050) down the bevel to the WF face, over the cap upstand (shingle) | Adhered | V2 9.27.3.8.(1)(b), (4)(a) (S); R1 N4 logic (S); (I) |
| FB24 | Canopy soffit and fascia | WRC 19 soffit (honey, R5); charcoal fascia | Soffit y 2800 → 2819 from x −94 to −750; fascia x −750 → −757, y 2795 → 2955 | Screwed to the outriggers | R5 (S palette); (I) |
| FB25 | Canopy end terminations | Charcoal end plates + kick-out flashings | Canopy w −150 → 4950 (150 past each jamb); cap end dams 25 | — | V2 9.27.3.8.(4)(c) (S); (I) |
| FB26 | **Strapping** | PT 19 × 64 on stud and glulam lines | **x −56 → −75**, from y 2990 up, continuous across the floor line | Stainless or ≥ Z550 screws through the WF into studs and glulam (5 % penalty) | 09 W1 (S); V2 9.23.2.4 (S via 09) |
| FB27 | **Cavity bottom screen and vent** over the canopy | Black stainless insect screen ≤ 2 mm, folded across the cavity bottom | y ≈ 2985 at x −56 → −75; open vent slot between the cap upstand and the cedar bottom | Stapled to the strapping | 08 L / v2 `band-screen` (S); 06 B22 (S) |
| FB28 | **Cedar siding** | 19 WRC channel siding, horizontal, stainless ring-shank | **x −75 → −94**, first course bottom **y 2975** (≈ 13 above the cap); continuous across the floor line | Nailed to the strapping | 09 W1 (S); 06 6–10 mm gap (S) |
| FB29 | **Reveal liners** ("picture frame") | 0.76 mm charcoal PVDF steel | Jambs: x 0 → −150, y +5 → 2754; outer cheek x −150 returning 56 to the cedar plane (−94), hemmed; cedar ends 8 back, end grain sealed | Clipped to PT jamb grounds (38 × 89) screwed through the WF to the kings | R5 N5 (S); (I) |
| FB30 | **Screen cassette and guides** (west; zone reserved east) | 110–120-deep ZIP-type aluminium cassette, charcoal; guides ≈ 35 × 45 inside the liners | Cassette **x −150 → −32, y 2598 → 2748**; fabric drops at x ≈ −90; bottom bar lands on the grate (y −6) | End brackets to the jamb grounds; power cable through the WRB in a sealed grommet at a jamb | R5 §4 (S); §4.4 |
| — | Interior head finish | Glulam face exposed (x 200) or 12.7 gypsum; trim cap x 180 → 200 at y 2730–2742 **not touching the head track** | — | Fixed to the ground | 11 H8 (S) |

### 4.3 Exterior → interior stacks at four heights (drawable)

| cut | stack (x from exterior to interior) |
|---|---|
| **y 2700** (frame head) | cassette x −150 → −32 · air 2 · head block −30 → 0 · frame head 0 → 180 · room |
| **y 2880** (canopy) | canopy body −750 → −94 · ledger −94 → −56 · WF −56 → +24 (bracket plate x +9 → −1 locally, pad +24 → +9) · WRB +24 → +25 · glulam +25 → +200 · room (exposed glulam) |
| **y 3300** (band above the canopy) | cedar −94 → −75 · cavity/strapping −75 → −56 · WF −56 → +24 · WRB · glulam +25 → +200 · floor void (joists, hangers) |
| **y 3700** (upper wall) | cedar · cavity · WF · WRB +24 → +25 · ply +25 → +37.5 · studs/cellulose +37.5 → +177.5 · poly · gypsum +177.5 → +190.2 · room |

### 4.4 Shading cassette (west; zone reserved on the east)

| item | value | tag |
|---|---|---|
| Screen size | 4.8 m wide × ≈ 2.6 m drop ≈ 12.5 m² | (I) |
| Product classes that reach it | Phantom Executive (BC company): **100 mm housing only to 3.0 m wide × 2.45 m drop**; **140/180 mm systems to 8 m wide × 5 m drop**; solar mesh 6 % or 10 % open | (S, PH-EXEC) |
| | Renson Fixscreen 150 evo: up to **22 m²**, wind class **WK3**, wind guarantee **130 km/h**, sliding-window application | (S, REN-150) |
| | MHZ Zip 6: **110 mm** cassette, ≤ 6 m × 3.5 m, 20 m² | (S\*) |
| | Zipscreen (Rollease Acmeda): 125 / 190 mm headboxes | (S\*) |
| Reserved zone | **150 high × 118 deep** (x −150 → −32, y 2598 → 2748), clear of the 30 mm head block. Fits 110–120-deep ZIP cassettes. **A square 140–150 housing does not fit:** either deepen the liners to x −180 (86 proud of the cedar) or omit the head block, which costs about 0.01 of f_Rsi (§5.2) | (I) |
| Why ZIP | Side retention gives wind resistance for an exposed west façade, and it doubles as the insect screen when the door is open (R5) | REN-150 (S); R5 (S) |
| View | The cassette bottom (2598) sits in front of the opaque sash top rail (2600–2690), so no glass is lost | (I) |
| Service | Bottom access panel; motor and fabric at ≈ 10–15 yr | R5 §4 (S/I) |

### 4.5 Reveal liners (picture frame)

- **Depth:** 150 from the frame face. That is 5 more than R5's 145, to fit the cassette and the head block.
- **Projection:** with W1 (cedar at −94) the liners stand **56 mm proud** of the cedar. In v2 they were flush, because v2 had 130 mm of stone wool. The projection reads as a deliberate charcoal frame; its head member is the canopy fascia line [I].
- **Joints with the cladding:** hemmed at the outer edge; cedar held 8 mm back with end grain sealed (R5 N5, S; 11 §6.5 6–10 mm, S).
- **Head-drip end dams:** fold up **inside** the liners (R5 N5, S).
- **Fixing:** the liners clip to PT jamb grounds screwed through the WF to the king studs. No screw goes through the liner face into the frame (I).

### 4.6 Canopy: decision

| criterion | without canopy | with the 656 mm canopy | tag |
|---|---|---|---|
| Exposure at the flush threshold | Glass catch ratio ≈ 0.13 east (≈ 465 L/(m·yr)) → CMHC "high" | Ratio 0.656 / 2.80 = **0.23** ≈ the v2 eave (0.22) → "medium"; catch ≈ 0.03 (≈ 107 L/(m·yr)) | 11 §3.4, §5.3 (S/I) |
| Accessible sill guidance | CMHC: accessible sills "should only be used" with low exposure; residential doors historically relied on canopies | Closer to the CMHC/RDH "under a canopy, rarely wetted" case | 11 §2.4, §5.5 (S) |
| German flat-roof rule | Grate ≥ 150 wide "where rain exposure is not reduced by a roof"; ours is 134–150 | Roof-protected → the 134 mm grate is acceptable | 11 T16 (S) |
| NAFS rating | Unchanged: DP 960 / PG20 / water 180 Pa. Specify **260 Pa on both orientations** | 260 Pa east, ≥ 180 Pa west (as 11) | 11 §1, §7 (S); (I) |
| VBBL 9.27.3.8.(3) head flashing | Required | Not required (canopy soffit 2800 within ¼ × 656 = 164 of the trim at ≈ 2782), but fitted anyway | V2 (S); 11 H10 (S) |
| West sun | Screen needed | Screen still needed: at 30° profile it shades only ≈ 0.38 m of glass | 11 §7 (S); (I) |
| Screen and gaskets | Rain-wetted, UV on the head | Sheltered: less fouling, slower UV ageing of the head gaskets | (I) |
| Snow and structure | — | Possible sliding or drift snow from the upper roof (engineer); 3 brackets through the WF | (I) |
| Look | Two-storey cedar wall with a projecting 56 mm charcoal frame | A single horizontal datum between the storeys; the charcoal fascia caps the picture frame; honey soffit (R5 palette) | R5 (S palette); (I) |
| Carbon | 0 | ≈ 180 kgCO2e (steel brackets ≈ 86, steel cap ≈ 61, ply, membrane, PT and cedar ≈ 30). **≈ 95 with timber outriggers** (glulam arms screwed to the glulam, wood through the WF) | (I, S2 factors) |

**Decision: fit the canopy, on both orientations** [I, on S evidence].
- **East:** it carries the most weight, because east is the wind-driven-rain side (11 §7, S).
- **West:** it gives the same shelter, plus a sheltered housing for the screen.
- **Geometry:** 656 from the cedar face (tip x −750), soffit at **y 2800**, top at 2960 at the wall falling 2 % outward, 5.1 m wide.
- **Drainage:** a free hemmed drip at the tip lands on the lined granite landing (liner to x −1887, R5), which falls away. Optionally the cap falls 1 % to the jamb-A "water corner" scupper and rain chain (R5 P2).
- **Fixings:** three thermally broken knife-plate brackets. The timber-outrigger variant is the lower-carbon alternative, if the engineer can make the root moment work in screws.

**Fallback if the architect rejects the canopy:**
- Specify 260 Pa on both orientations.
- Cavity bottom vent at the head instead (strapping bottom ≈ 2800 on the cant, cedar bottom ≈ 2795).
- Clean the threshold drain more often (≥ 3× per year, I).
- Record the CMHC "high exposure" warning in the spec.

---

## 5. Performance

### 5.1 Control-layer pen test across the band

| layer | path (top → down, outside → inside) | transfer | break / risk |
|---|---|---|---|
| **Water shedding** | Cedar (upper storey) → cavity → screened vent → **canopy cap** (2 % out) → hemmed drip at x −757. Wind-driven rain under the canopy → liners → **head drip** (x −160) → grate | Cap upstand behind the strapping ≥ 100; FB23 sub-flash over it; end dams at the canopy ends | Blocked cavity-bottom screen (leaves) → water backs up behind the cedar onto the cap: clean it at the twice-yearly check [I] |
| **Drainage plane** | WRB (x 24–25) down the upper wall → floor-line gap (membrane loop, no lap reversal) → glulam face → **FB15 sub-flash** at 2792 → cant → drip at −150. Above the canopy, FB23 takes WF-face water out over the cap | WRB laps **over** both sub-flashes ≥ 75 (shingle) | Reverse lap if the canopy bracket boots are taped "upside down" [I]. Bracket boot = highest-risk detail [I] |
| **Air barrier** | Upper-wall WRB (exterior approach) → floor-line gap bridged by the membrane loop → glulam face → ground face → **FB11 exterior tape** → frame (gaskets). Interior: FB12 tape → poly (jambs) | All adhered; no interior floor interface (BCH-AT, S) | Bracket pads penetrate the plane in three places: each needs a membrane boot [I]. The I-joist hangers sit **inside** the barrier, so they do not matter for air [I] |
| **Vapour** | 6 mil poly on walls; glulam 175 (low perm) over the opening; FB12 vapour-retarding tape at the frame; everything outboard vapour-open (VP membrane, WF, vented cavity) | Drying outward through WF + cavity | Beside the opening, the rim zone with an interior batt needs a sealed poly or vapour-retarder piece; the 9.25.5.2 ratio (2.2 / 3.6 ≈ 0.6 ≥ 0.20) passes for the LSL rim [I, S rule via 09 §2.3] |
| **Thermal** | Upper-wall cellulose + WF → **WF continuous over the glulam** → cant (timber) → head block 30 → frame head (insulated profile) | No steel anywhere in the plane except 3 bracket plates (point bridges, on pads) and screws | Bracket χ not quantified (3-D needed) [I]. Floor-line gap: WF joints offset [I] |
| **Structure** | Roof + upper wall → LSL plate → subfloor → glulam → jacks/posts → LSL plate → grade beam | Δ ≤ 3 mm incl. creep (§3) | Glulam delivered wet → creep and shrinkage both up [I] |
| **Fire** | — | 19 mm single cavity: no fire blocks at the floor (S) | If the cavity is deepened (counter-battens) → fire blocks at the floor line (S) |

### 5.2 2-D thermal screening (INFERRED, indicative; same method and conventions as R1 §2.3)

**Method:**
- Script: `scratchpad/r13/head2d.py`, a rectangle raster at 2 mm, solved by PCG.
- Surface resistances: R_si 0.25 (ISO 13788 / PHI f_Rsi), R_se 0.04, still-air film 0.13 behind the vented cavity.
- Slice at mid-bay: no bracket, no joist.
- Conductivities:
  - glulam and timber 0.13; WF 0.042; stone wool 0.034–0.035; cellulose 0.039;
  - frame head equivalent λ 0.12, sensitivity run at 0.20;
  - IGU equivalent Ug 0.7.
- The cassette zone is treated as exterior air (conservative).

| case | min f_Rsi at the installation junction (location) | frame / glass-edge f_Rsi (product-dependent) | heat flow from the interior, W/(m·K) per K |
|---|---|---|---|
| R1 v2 as drawn (steel lintel) | **0.67** (gypsum at the bottom flange) | — | 0.667 (R1 domain, not comparable) |
| **H0**: glulam + ground + two-piece flashing, **no** head block | **0.91** (ground interior face, x 200, y 2780); gap trim 0.92 | 0.68 / 0.71 | 0.607 |
| **H1**: as H0 + 30 mm head block (P9), **as drawn** | **0.92** (ground); gap trim 0.93; glulam 0.92 | 0.69 / 0.72 | 0.588 (Δ −0.019) |
| H1, frame λ 0.20 | 0.92 | 0.62 / 0.68 | 0.638 |

**Reading [I]:**
- Taking the steel out is what lifts the head from 0.67 to ≈ 0.91. The head block adds ≈ 0.01 and −0.02 W/(m·K).
- So the cassette can take the full 150 depth if a square housing is chosen (§4.4).
- At −7 / 20 °C, f_Rsi 0.91 gives a surface at 17.6 °C. It is dry up to ≈ 85 % room RH.
- The residual low values (0.62–0.72) sit on the frame's own head profile near the glass edge. The product's PHI certificate governs them, not the installation.
- The 2-floor line (gypsum and subfloor 0.94–0.95) is not a risk.
- Confirm in THERM with the chosen product, and model the bracket χ in 3-D.

### 5.3 Moisture paths

- **Arrives:**
  - Wind-driven rain on two storeys of cedar. Run-off is shed at the canopy cap; below the canopy, on the liners and drip.
  - Rain blown under the canopy into the reveal.
  - Construction moisture in the glulam (MC ≤ 12 % specified) and the cellulose.
  - Interior vapour at the head gap (stopped by FB12).
  - Snowmelt on the canopy.
- **Drains:**
  - WRB plane → FB15 → drip at −150 → grate (x −31.5 → −165.5 catches it, S geometry from `detail02.mjs`).
  - Cavity → FB27 vent → canopy cap → tip drip at −757 → lined landing.
- **Dries:**
  - Glulam, ground and FB13 dry outward through the VP membrane, WF and cavity [I].
  - The glulam's exposed interior face also dries inward.
  - The cant and ledger are PT, in a drained and ventilated zone.
- **Capillary breaks:**
  - Hemmed drip 10 past the liner.
  - 13 mm cedar-to-cap vent gap.
  - Cedar ends 8 mm off the liners (S, R5/11 §6.5).

### 5.4 Ageing (timeline keyframes)

| year | band and header | head, screen, canopy | evidence |
|---|---|---|---|
| **0** | Glulam at ≤ 12 % MC; the frame installed after the dead load, ground shimmed level; Δ_D measured. Cedar warm red-brown (or pre-greyed, R5 P4) | Tapes new; screen new; canopy cap crisp charcoal | MAR-ULS via 11 (S); (I) |
| **5** | Plate shrinkage done (≈ 0.7 mm KD, 0.1 LSL); creep ≈ 60–80 % of final [I]. Head gap ≥ 8 mm left. Cedar silver on exposed faces; the **band under the canopy stays browner** (sheltered, R5 N11 effect) | Screen first service; clean the cavity-vent screen and canopy cap twice a year; sealants at the canopy ends checked | 11 §5.7 (S); R5 N11 (S); (I) |
| **15** | Creep near final (≤ 3 mm total by design); WRB and WF intact behind the cladding | Screen motor and fabric replaced (10–15 yr); canopy-end sealants and boots renewed (10–15 yr high-performance, S via 06); lift-slide gaskets replaced | 06 (S); R5 §4 (S/I) |
| **30** | Glulam, ground and posts permanent. Cedar re-clad partially (splash band is now under the canopy, so it is lighter than v2) | **Canopy cap and membrane renewal** with the cedar; head drip, sub-flash and tapes renewed only if the liners and cassette are removed. Design: liners, cassette and drip removable **without** touching the WRB laps [I] | 06 B.3.5 roof-membrane 15–25 yr (S); (I) |

### 5.5 What each component does, and what fails if it is missing

| component | function | failure if missing / reversed |
|---|---|---|
| Glulam ≥ 175 × 684 (straight, dry) | Holds the 3 mm head limit including creep | Panels bind, gaskets crush, the head gap closes [S, 11 §5.6] |
| LSL plate and jacks at the opening | Keeps uniform head settlement ≤ 0.3 mm | ≈ 0.7 mm extra closure; head anchors bind [I] |
| Interior fixing ground, shimmed after the dead load | Level, flat screw surface; keeps screws out of the tension lamination | Head out of level; track rack; glulam tension lamination damaged [S 11 H3 / I] |
| Exterior tape with loop + interior tape | Weather/wind seal and vapour/air seal with movement | Torn tape at the gap → air leak and wetting of the gap fill [I] |
| Two-piece flashing (membrane in, metal out) | Drains the WRB without a steel thermal bridge | R1 N4: f_Rsi 0.67 with steel-to-steel contact (S) |
| Canopy | Exposure "medium", shelter for the screen | Threshold at "high" exposure; more channel clogging and wetting [S 11 / I] |
| Canopy sub-flash (FB23) | Code flashing at a horizontal offset, inboard of the sheathing membrane | Cavity water runs behind the cap into the bracket boots [S rule / I] |
| Cavity bottom screen and vent | Drains and dries the cavity; keeps insects out | Trapped water on the cap; wasp nests [S 06 / I] |
| Liners + cassette zone | Hide the screen; a clean "picture frame" | A surface box on the cedar later (R5 N4, S) |

---

## 6. Benchmark: UK Detail Library (completeness, not numbers; public pages only)

Pages read:
- **PHT39** *Passivhaus Twin Stud Timber Frame Door Head and Threshold*: 300 mm cellulose twin stud; door centred between the studs; **airtightness by perimeter tapes with the door straps taped over**; accessible level threshold with a threshold drain; Compacfoam at the threshold.
- **Twin Stud Detail Pack**: lists "Wall to Door Head and Threshold" and "**Wall to Intermediate Floor**" as **separate sheets**; no lintel sheet named.

| UK provision | In our junction? | Applies in Vancouver? |
|---|---|---|
| Perimeter airtight tapes, fixing straps taped over (PHT39) | FB11 (exterior) + FB12 (interior), loops at the gap | Yes. Our head anchors and screw penetrations get the same treatment [I] |
| Door centred in the insulation zone (PHT39) | Frame x 0 → 180 against a stud/ply plane at +25 → +190; partly in the WF zone | Partly: W1 has 80 WF outside, so the frame sits mostly in the stud zone. The head block (FB13) does the over-insulation job |
| Intermediate-floor junction as its own sheet (pack) | The flush glulam **is** the floor junction over the opening; beside it, an LSL rim with the exterior AB | Yes. The tool should carry a separate "floor line beside the opening" sheet (rim + batt + VB piece), not drawn here |
| Airtightness carried round the intermediate floor (UK interior-membrane practice) | Avoided: exterior AB continuous past the floor (BCH-AT) | Yes; the exterior approach is preferred in BC (S) |
| Cavity barrier at the floor line behind cladding (06: DL464/PHT12, Oct 2025 update) | Not as a fire item | **No** while the cavity is a single ≤ 25 mm space (V2 9.10.16.3.(2)(a), S); **yes** if counter-battened |
| Level threshold with a drain (PHT39) | 11 §3 / R1 | Yes (already in Detail 02) |
| Lintel detail | FB2–FB4 | The UK pages show no timber-frame lintel sheet for this case. No benchmark |

---

## 7. Conflicts

| # | conflict | handling |
|---|---|---|
| C1 | 09 W1 item 4: a "breather sheathing membrane" (mechanically fastened, no air-barrier role stated) + interior poly | Make the sheathing membrane a **vapour-permeable self-adhered air/water barrier**: the exterior air-barrier approach (BCH-AT, S). Poly stays as the vapour barrier. 09 to record it |
| C2 | v2 `detail02.mjs`: band EI 130 stone wool, cedar at −144.6; R5 jamb and liner geometry at −144.6 | W1 puts the cedar at **−94**. The liners (−150) now stand 56 proud; the channel (to −171.5) runs 77 past the cedar face. Update the APP-mode jamb massing to W1 |
| C3 | R4 P2: flush glulam **175 × 494** "fits the existing zone" (roof only) | With a floor + wall above: **175 × 684** (§3). The zone grows by 190, inside the floor depth |
| C4 | R1 N5 / P10: W250×39 or W360×33 steel | Superseded (user: no steel) |
| C5 | R5 §4: cassette 140 × 102 at y 2622–2724, liners 145 | **150 × 118** zone at 2598–2748, liners 150 (§4.4) |
| C6 | 11 H14: shading box "hidden in the soffit" | No soffit now. The cassette sits in the reveal under the canopy |
| C7 | 11 §1/§6.2/H13: "gutter mandatory" | The canopy (3.4 m²) has no gutter; it drips onto the lined landing. An optional side fall to the R5 water corner |
| C8 | V2 9.27.3.8.(4)(a): upstand ≥ 50 inboard of the sheathing membrane vs 80 mm exterior insulation | Membrane sub-flashes through WF joints (FB15, FB23), metal only outboard (R1 N4) |
| C9 | Creep conventions: EC5 kdef 0.6 (S\*) vs NDS Kcr 2.0 for glulam (S) | Section chosen to pass both in the base case; the engineer applies CSA O86 5.4 |
| C10 | Part 10 "box and rim joists 3.85" vs glulam band 3.7–3.8 | Gypsum on the glulam interior or 100 WF in the band; or the City treats the glulam as wall framing |
| C11 | User: "stacked studs" as the header option | Shown to fail by 13–20 × (§3.2). Recorded so the option is not re-proposed |
| C12 | R5 P6 ("soffit to head", glass up to a warm soffit) | Not possible with a floor above. The canopy soffit plays that role at 2800 |

## 8. Open questions

1. **Occupancy and size.** House, stacked units, D/E or Group A. This decides the fire rating of the header (§2.1), Part 4/5 and the Part 10 path.
2. **Joist direction and roof tributary.** Parallel joists cut the header to ≈ 175 × 532–570.
3. **CSA O86 values:** E for DF-L 24f-E glulam (12,400–12,800 assumed), the creep clause, camber and MC at delivery. Ask the supplier (Kalesnikoff, Western Archrib, Structurlam successors) for species and grade.
4. **Frame head dimensions and anchors** of the chosen PH wood-aluminium lift-and-slide (ENERsign Primus, Internorm HS 330, Unilux HS: S\* data only). Head-track height, slip-anchor detail, tape compatibility.
5. **Cassette product and box depth.** Fixscreen 150 evo box dimensions were not found. If its box is 150 square, deepen the liners to x −180 or omit the head block.
6. **Canopy:** 3-D χ of the three bracket plates; snow slide/drift from the upper roof; timber-outrigger alternative; a gutter or water-corner scupper.
7. **THERM** confirmation of §5.2 with the product frame.
8. **Spatial separation** of an east/west face with 13 m² of glazing, combustible WF and cedar, if near a property line.
9. **Floor line beside the opening:** rim board, interior batt and vapour-retarder piece. A separate junction sheet is needed.
10. **Wood fibre** S706.1 evidence (09 open item) now also covers the band and the canopy bracket zone.

## 9. Sources

**Codes:** V1, V2 (keys in §0.3; local text copies, clauses re-read this session).

**Structure and timber:**
- CWC-VM: https://cwc.ca/wp-content/uploads/publications-Design-and-Detailing-Solutions.pdf (S)
- CWC-GL: https://cwc.ca/wp-content/uploads/2019/03/Glulam-strength-grades.pdf (S)
- CALCS: https://calcs.com/blog/creep-deflection-in-structural-wood-beam-design (S)
- EC5 kdef summaries: https://www.universityofgalway.ie/media/timberengineeringresearchgroup/Design-of-timber-structures_Volume2_Rules-and-formulas-according-to-Eurocode-5.pdf ; https://help.masterseries.com/knowledge/article/2149 (S\*)
- Glulam E (S-P 10,300): https://beamdimensions.com/materials/Wood/CSA_O8614/Glulam (S\*, 403 when fetched)
- Floor-line shrinkage: https://iibec.org/wp-content/uploads/2021-01-wetherholt-hodgin-1.pdf ; https://structuremag.org/?p=25384 (S\*)

**Carbon:**
- EPD-LVL: https://old.cwc.ca/wp-content/uploads/2020/07/EPD-Industry-Average-LVL.pdf (S, expired 30 Jun 2025)
- AWC LVL EPD 2025: https://web-media.awc.org/wp-content/uploads/2021/12/11163423/LVL-EPD-2025.pdf (S\*)
- Boise Versa-Lam: https://www.astm.org/v3/assets/blt5eb0a2cb04534832/blt3cd8e9b189d36a90/697b1e90e4259882bfa78836/709.EPD_FOR_Boise_Cascade_20210817.pdf (S\*)
- BC LVL EPD (403): https://www.astm.org/v3/assets/blt5eb0a2cb04534832/blta2f92cfa88e89d45/69ce772ad437954f67d0391e/Cradle_to_Gate_BC_LVL_VLT_EPD_Final.pdf (not read)
- EPD-GL, EPD-LUM via `.sketch/rhino/materials.json` (S)

**Envelope:**
- BCH-AT: https://www.zebx.org/wp-content/uploads/2018/07/Illustrated-Guide-Achieving-Airtightness.pdf (S)
- Armatherm FRR: https://www.arcat.com/product/balcony-canopy-thermal-bridging-solution-199377 (S\*)
- Schöck canopy: https://www.schoeck.com/en-us/canopy-beam-products (S\*)
- BC Hydro BETB guide (not opened): https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/BETB-Building-Envelope-Thermal-Bridging-Guide-v1-3.pdf

**Shading:**
- PH-EXEC: https://phantomscreens.co.nz/downloads/phantom-executive-motorised.pdf (S)
- REN-150: https://baukobox.de/en/products/2420-renson-renson-fixscreen-150-evo (S)
- REN-150F: https://www.renson.eu/en-gb/producten-zoeken/zonwering/screens/fixscreen/fixscreen-150/fixscreen-150-m1-f (S)
- MHZ Zip 6: https://www.architonic.com/en/p/zip-6-20760530 (S\*)
- Renson Slidefix / Minimal: https://nbd-online.nl/download/39681-Concept-bestektekst-Slidefix-zonwering ; https://dam.renson.net/m/61ca7e04476476bb/original/TF_Fixscreen-Minimal-Curtain-wall-50-IM7.pdf (S\*)

**Frames:**
- ENERsign: https://www.bimobject.com/en-au/enersign/product/enersign-primus-755-lift-slide-oxxo (S\*)
- Internorm HS 330: https://uk.internorm.com/app/uploads/2023/01/HS330_TIMBER-ALU_LIFT_SLIDE.pdf (S\*)
- Böhler: https://baukobox.de/en/produkte/3418-boehler-fenster-gmbh-boehler-heeschiebetuerelement-vetro-xl-hs-holz (S\*)

**Benchmark:** DL (§0.3) (S, public pages).

**Project files:** 01, 06, 09, 11, 12; `.sketch/rhino/review/d2-lap2/review-R1…R5`, `lap2-summary.md`; `.sketch/rhino/detail02.mjs`, `materials.json`.

**Local scripts (I):** `scratchpad/r13/hdr.mjs` (header deflections), `scratchpad/r13/head2d.py` (2-D screening).

## Tally (approximate)

About 70 (S), 25 (S\*) and 120 (I). The band geometry (§4) is inferred, because no Canadian document gives a floor-band head for a flush lift-and-slide. Its limits are sourced:
- 3 mm deflection;
- 6 % slope, 50 mm upstand, 25 mm end dams, 10 mm lap and 5 mm drip (9.27.3.8);
- the shrinkage formula and 10 % EMC;
- tripled studs over 3 m;
- the single-cavity fire-block exemption;
- the exterior air-barrier preference;
- the screen size limits;
- the glulam, LVL and lumber carbon factors.
