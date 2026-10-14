# 11 — Large sliding / folding glazed wall: threshold and head junctions (Vancouver)

Researched: 2026-10-13. Scope: a single-storey building whose wall at the section is a large lift-and-slide, multi-slide or folding glazed wall. It meets exterior permeable pavers (a shrub nearby) with a near-flush, accessible threshold, and its head sits under a low-slope exterior-insulated roof with a 500–600 mm overhang (06 junction B). The wall faces east or west. The ground floor build-up (concrete + hempcrete topping and alternatives) and the paving are researched by other agents; this file states what they must provide. A fixed-glazing variant over stepped-down paving (W4) is added in §8 at the architect's request.

## 0. How to read this file

### 0.1 Tags

- Numbers carry a round-bracket tag (same convention as 07/08):
  - **(S)** SOURCED: stated in a document read this session, or in an approved project file (01–10), cited in the row.
  - **(S\*)** SOURCED, but only seen in a search-engine summary of the document. Usable as an indication; verify before it becomes a library value.
  - **(I)** INFERRED: my calculation, a geometric consequence, or practice I could not tie to a document. The reason is given beside it.
- Performance claims carry square brackets: **[S]**, **[S\*]**, **[I]**.
- "(given)" = from the brief. Clause, table and page numbers are references, not values, and are not tagged.
- Unit conversions (psf → Pa, Btu → W) are arithmetic on sourced values and keep the (S) tag; 1 psf = 47.88 Pa, 1 Btu/(h·ft²·°F) = 5.678 W/(m²·K).

### 0.2 Datums for drawing

- **Threshold (§3):** vertical **0 = interior finished floor level (FFL) at the door**, up positive. Horizontal **0 = exterior face of the door frame / track**, outward positive.
- **Head (§4):** vertical 0 = underside of the structural lintel/beam; horizontal 0 as above.
- 06/08 use y = 0 at finished grade at the wall face with the slab top at +300. That geometry does **not** survive at a flush door: see §6 and §9 (conflict C1).

### 0.3 Source keys

| key | document | URL | how read |
|---|---|---|---|
| **V1** | City of Vancouver, *Vancouver Building By-law 2025*, Book I Vol. 1, convenience copy v4.01: Div. B 3.8.3.6, 5.9.2.2, Table 10.2.2.7.(1) (pdf p.797), Note A-10.2.2.7.(3), Appendix C Table C-2 (pdf p.903) | https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf | Text layer extracted in the 07 session (local copy); Table 10.2.2.7.(1) rendered and viewed this session to read the "≥" symbols |
| **V2** | VBBL 2025 Book I Vol. 2 (Part 9 + Notes) v3.00: 9.6.1.3–9.6.1.4, 9.7.3–9.7.5, Notes A-9.7, A-9.7.3.2.(1)(a), A-9.7.4, A-9.7.4.2.(1), A-9.7.4.3.(2) | https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf | Local text copy (07 session); read this session |
| **BCBC18-C** | *British Columbia Building Code 2018*, Div. B Appendix C, **Table C-5 "Required Performance of Windows and Doors in Part 9 Buildings"** | https://free.bcpublications.ca/civix/document/id/public/bcbc2018/bcbc_2018dbac | Downloaded, text-extracted |
| **RDH-NAFS13** | RDH Building Engineering, *NAFS* presentation to BCBEC, 18 Apr 2013 | https://bcbec.com/wp-content/uploads/2018/03/RDH-NAFS-presentation-BCBEC-2013-04-18-1.pdf | Downloaded, text-extracted |
| **RDH-CS14** | Jaugelis, A. (RDH), *Specifying with the Canadian Supplement*, BOABC Fall Conference, 24 Sep 2014 | https://bcbec.com/wp-content/uploads/2018/03/Al-part1-BCBEC-Working-with-the-Canadian-Supplement-2014-09-24.pdf | Downloaded, text-extracted |
| **RDH-CHEAT** | RDH, *Summary of Allowable Canadian NAFS-08 Performance Grades* (cheat sheet v1.0) | https://bcbec.com/wp-content/uploads/2018/03/Al-part2-NAFS_Cheat_Sheet-Allowable_Canadian_Performance_Grades_1.0.pdf | Downloaded, text-extracted |
| **AB-NAFS16** | Berkeley Vadocz Engineering for CHBA Alberta, *Guideline for specifying the required NAFS ratings of fenestration in low-rise buildings* (11 May 2016), hosted by RDH | https://www.rdh.com/wp-content/uploads/2019/09/Guideline_NAFS_May11_2016.pdf | Downloaded, text-extracted (method and context only; values are Alberta) |
| **PHI-CAS** | Passive House Institute, component certificate 1260sl03, **Cascadia Slider PH**, Cascadia Windows & Doors, Langley BC; valid to 31 Dec 2026 | https://database.passivehouse.com/en/components/certificate/download/1108/en | Downloaded, text-extracted |
| **PHI-WES** | PHI certificate 1477sl03, **Westeck PH Vinyl Lift & Slide**, Westeck Windows & Doors, Chilliwack BC; valid to 31 Dec 2026 | https://database.passivehouse.com/en/components/certificate/download/1516/en | Downloaded, text-extracted |
| **PHI-PHT** | PHI certificate 2459sl03, **PH Tech Twist S-6350 sliding door**, Lévis QC; valid to 31 Dec 2026 | https://database.passivehouse.com/en/components/certificate/download/2505/en | Downloaded, text-extracted |
| **LOE-INST** | Loewen, *LiftSlide Installation Guide* (0716, web 2) | https://www.loewen.com/wp-content/uploads/2018/06/0716-LiftSlide-Installation-Guide-web-2.pdf | Downloaded, text-extracted (partly garbled layout) |
| **LOE-BRO** | Loewen, *LiftSlide Doors — Features and Benefits* (v3b, 2025) | https://www.loewen.com/wp-content/uploads/2025/09/Loewen-LiftSlideDoors-v3b.pdf | Downloaded, text-extracted |
| **MAR-ULS** | Marvin, *Ultimate Lift and Slide Site Preparation Guide* 19970284 (2026-08-26) | https://marvin.com/f/1019562/x/93386cf793/ultimate-lift-and-slide-site-preparation-guide-19970284.pdf | Downloaded, text-extracted (US product; used as reference practice) |
| **MAR-PS** | Marvin, *Ultimate Lift and Slide Performance Sill Site Prep Guide* 19971069 (2023-07-18) | https://www.marvin.com/f/1019562/x/d7112eef52/uls-performance-sill-site-prep-guide-19971069.pdf | Downloaded, text-extracted |
| **MAR-BF** | Marvin, *Ultimate Bi-Fold Door Site Prep Guide* 19915761 | https://marvin.com/f/1019562/x/4c558dd967/ultimate-bifold-door-site-prep-guide-19915761.pdf | Downloaded, text-extracted |
| **SP-LS** | Sierra Pacific, *Clad Lift and Slide Pocketing and Stacking Door Product Data Sheet* (15 Mar 2024) | https://www.sierrapacificwindows.com/Technical/Door/Lift%20and%20Slide/Aluminum%20Clad%20Wood/Lift%20&%20Slide%20Door/Product%20Summary/Clad%20Lift%20and%20Slide%20Pocketing%20and%20Stacking%20Door%20Product%20Data%20Sheet%203-15-2024.pdf | Downloaded, text-extracted (US product; reference) |
| **CMHC-BPG** | CMHC, *Wood-Frame Envelopes in the Coastal Climate of British Columbia — Best Practice Guide*, 2001 (06 key) | https://w.tboake.com/guides/BC_wood.pdf | Downloaded, text-extracted this session: Fig. 3.1, Fig. 5.1, Table 7.7, Details 3, 16, 17, door section p. 7-28 |
| **RDH-WPR** | RDH Building Engineering for CMHC/HPO, *Water Penetration Resistance of Windows — Study of Codes, Standards, Testing and Certification* (2002; CMHC Research Highlight 03-125) | https://rdh.com/wp-content/uploads/2017/07/Water-Penetration-Resistance-of-Windows-Study.pdf | Downloaded, text-extracted. Quotes CSA A440.4-98 cl. 6.7 |
| **RDH-CCBST03** | RDH, *Water Penetration Control for Windows*, CCBST 2003 | https://rdh.com/wp-content/uploads/2017/07/CCBST-2003-Water-Penetration-Control-for-Windows.pdf | Downloaded, text-extracted |
| **NRC-WWI** | Lacasse, M. (NRC) & Plescia, S. (CMHC), *Evaluating the effectiveness of window/wall interface details to manage rainwater*, BCBEC Symposium, 25 May 2006 | https://bcbec.com/wp-content/uploads/2017/10/Assessing-the-Effectiveness-of-Wall-to-window-Interface-Details-to-Manage-Rainwater.pdf | Downloaded, text-extracted (slides) |
| **BRE-GG47** | Stirling, C. (BRE Scotland), *Good Building Guide 47: Level external thresholds — reducing moisture penetration and thermal bridging*, BRE/CRC 2001 (adapts DETR *Accessible thresholds in new housing*, 1999) | https://nbco.nbco.localgov.ie/sites/default/files/4567776/2025-02/GG47%20Level%20external%20%20thresholds%20%20reducing%20moisture%20penetration%20%26%20thermal%20bridging%20%281%29.pdf | Downloaded, text-extracted (UK benchmark) |
| **DDH19** | *DDH* trade article (Gutjahr), "Barrierefreiheit: schwellenlos, regelgerecht, pragmatisch und sicher", 04/2019, citing the German flat-roof rules (FDR 4.4), DIN 18531-5 6.4.6 and DIN 18040-2 4.4.3 | https://www.gutjahr.com/Mediathek/Prospekte/Fachberichte/DDH_Fachbericht_Barrierefreiheit_schwellenlos_regelgerecht_pragmatisch_und_sicher_2019_04.pdf | Downloaded, text-extracted (German; benchmark) |
| **BNW-FDR** | BauNetz Wissen, *Flachdach: Anschlüsse an Türen* (summarising Flachdachrichtlinie 4.4) | https://www.baunetzwissen.de/flachdach/fachwissen/detailzeichnungen/anschluesse-an-tueren-156343 | Read |
| **B651** | CSA B651-18 *Accessible design for the built environment* (08 key): 4.3.2 Table 1, 4.3.4, 5.2.6, 7.4.7 | CSA-posted copy (08 key) | Local text copy from the 08 session; clauses re-read this session |
| **UBC-FEN** | Zargar, S. (2022), *Research on the Impacts of Innovative Fenestration Materials on the Embodied Carbon of Buildings*, UBC Sustainability Scholars report 2022-018 (Cascadia Windows partner) | https://sustain.ubc.ca/sites/default/files/2022-018_Research%20on%20the%20impacts%20of%20Innovative%20Fenestration%20Materials_Zargar.pdf | Downloaded, text-extracted |
| **TBS-CF** | Thermal Bridging Solutions, *Compacfoam* product sheet v1.5.21 (GBA-hosted) | https://images.greenbuildingadvisor.com/app/uploads/2022/10/05152334/31692_1664997814_Compacfoam-Thermal-Break-Material.pdf | Text-extracted; property table partly garbled |
| **PUR** | baukobox.de, *Puren GmbH — Purenit* product page | https://baukobox.de/en/products/4939-puren-gmbh-purenit | Read |
| **BC-B24-08** | BC Building and Safety Standards Branch, Information Bulletin **B24-08** *Protection from Overheating in Dwelling Units*, 19 Apr 2024 (BCBC 2024, not VBBL) | https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/bulletins/2024-code/b24-08_overheating.pdf | Text-extracted |
| **Reused** | 01 (`req.*`), 03 (`ev.*`), 06 (A, B), 07 (D), 08 (H, J), 09 (§2) | project files | Cited by key |

**Search-engine summaries only (S\*), not opened in full:** Phonotherm RG 550/700 data (BOSIG/ETA-20/0743); Compacfoam CF200 NBS listing (λ 0.046, service stress 1.01 N/mm²); Weathershield multi-slide product sheets (low vs high sill riser); Western Window Systems 300 data sheet (water 3.76 psf); Centra Windows white paper (low-profile sills "Limited Water"); DWM Feb 2018 (NAFS-17 LW product types LWSHD, LWDASHD, LWFLD); NanaWall SL45/FSW75 manuals, Pella, Windsor and Quickslide header-deflection limits; Schüco ASE 80.HI (NBS listing E900; dealer Uw 0.92); ENERsign Primus 755 lift-and-slide (phB, wood-aluminium); OneClickLCA EPD summaries (aluminium sliding doors, Pilkington/Cardinal IGUs, wood-aluminium windows); Solarlux "Smart 10" track (10 mm threshold); SINTEF heavy sliding-door leakage at frame corners.

**Not accessible this session:** CSA A440S1 (paywalled; formula not read); CSA A440.4 current edition (only the 1998 clauses quoted in RDH-WPR); FGIA/AAMA 2400/2410 (not reached); BC Housing *Building Enclosure Design Guide* and *Building Envelope Guide for Houses* (paywalled, 06); RDH/FPInnovations *Using Overhangs to Reduce Building Façade Exposure to Rain* (landing page only; numbers not obtained, as in 03); City of Vancouver *Passive Design Toolkit* (403); UK Detail Library pages (not re-opened; web search hit its session limit mid-way). Westeck/Cascadia NAFS (air/water/structural) ratings are not published in anything I found.

### 0.4 Consistency with approved research

| # | Existing entry | This file | Status |
|---|---|---|---|
| 1 | 01 `req.flashing-over-openings-overhang` (VBBL 9.27.3.8.(3)): head flashing required when eave-to-trim > ¼ overhang | Used for the head (§4) **and** to unlock "Limited Water" doors (VBBL 9.7.4.2.(2)(c)) | Consistent; new consequence |
| 2 | 01 `req.flashing-geometry`: upstand ≥ 50, slope ≥ 6 %, end dams ≥ 25 mm (DRWP/10 = 16 mm) | Head flashing and W4 sill flashing use it; the threshold pan uses its water-head logic | Consistent |
| 3 | 01 `req.vancouver-climate-data`: DRWP 160 Pa, HWP 1/50 0.45 kPa | Used for NAFS selection | Consistent; Jan 2.5 % = −7 °C, 1 % = −9 °C (S, V1 Table C-2) added |
| 4 | 03 `ev.assembly.overhang-field-rdh-2003`, `ev.climate.wdr-direction` (east primary) vs BC Housing (south) | §5.3 run-off, §7 east vs west | Consistent; conflict carried |
| 5 | 06 A: foundation top +300 above grade; no aluminium against concrete; 24 ga flashings | At the door opening the floor meets paving near-flush: the +300 plinth cannot continue across the opening | **Conflict C1** (§9): plinth steps down at the jambs |
| 6 | 06 B: exterior-insulated low-slope roof, 600 mm cantilever, blocking sealed at wall line, deck pre-strip ≥ 50 mm past the interior wall face, cavity closed to soffit | Head (§4) reuses B4, B5, B8, B9, B19, B20, B22 | Consistent; the "wall line" becomes the lintel |
| 7 | 07 D: slab RSI 2.45 (V1 Table 10.2.2.6), slab-edge insulation 75 mm XPS, 0.25 mm soil-gas poly lapped 300 mm, slab-perimeter flexible sealant | Threshold rebate must keep these continuous (§3, §6) | Consistent; new geometry |
| 8 | 08 H: PICP from d +0.70 m at 2 % fall; inner curb as cut-off; pavers not within 0.70 m of the wall | Here pavers reach the threshold and a trench drain sits at the frame | **Conflict C2**: 08 H must be extended to the wall at the door (§6.2) |
| 9 | 08 J: gutter mandatory; roof water piped to rain garden, not to the perimeter drain | Trench drain also discharges to the J pipe, not to the foundation drain | Consistent |
| 10 | 09 §2.1: Part 10 RSI targets; Group A vs Part 9 routes | Part 10 fenestration USI added: 1.44 / 1.22 W/(m²·K) | New entry (Table 10.2.2.7.(1)) |

---

## 1. Summary of decisions

| topic | decision | basis |
|---|---|---|
| Operating type | **Lift-and-slide** (2–4 panels on 2 tracks). Not bifold, not plain multi-slide. | Lift-and-slide lowers the panels onto the gaskets when closed [S\*]; fewer vertical joints than a bifold [I]; NAFS-17 gives folding doors a "Limited Water" option [S\*], which signals low water performance; top-hung bifolds need the stiffest headers [S\*] |
| Frame | **Fibreglass or aluminium-clad timber, Passive-House class** (USL ≤ 0.80 W/(m²·K) with Ug 0.70). BC-made, PHI-certified sliders exist: Cascadia Slider PH (fibreglass, phA) and Westeck PH Vinyl Lift & Slide (phB). Thermally broken aluminium only if the slimmest sightline is the overriding aim. | PHI-CAS, PHI-WES (S); UBC-FEN embodied carbon (S); V1 Table 10.2.2.7.(1) |
| Glazing | **Triple, low-e, argon, warm-edge spacer** (Ug ≈ 0.6–0.7). Safety glass in every panel (tempered or laminated to CAN/CGSB-12.1); laminated inner pane recommended for security [I]. | V1 10.2.2.7: prescriptive USI 1.22 (S), performance 1.44 (S); V2 9.6.1.4.(1) |
| Ratings to specify | **Class LC (or R), PG ≥ 20 (DP ≥ 960 Pa), water ≥ 180 Pa code minimum; specify 260 Pa for an east-facing threshold, A3 air.** The rating must be for the **recessed/flush-sill configuration actually installed**. | BCBC18-C Table C-5 Vancouver region: DP 960, PG20, water 180 Pa (S); CMHC-BPG Table 7.7 B3 = 250 Pa coastal (S) → next NAFS value 260 Pa (S, RDH-CHEAT) |
| Threshold concept | **Near-flush walking surface, deep drained water level.** Track top ≤ +5 mm over FFL; a slotted trench drain right outside the track, grate at −8 mm; pavers at −8 falling 2 % away. The water level that wind pressure acts on is the trench and pan, about 60–120 mm below the walking surface, so the internal dam height (not the visible step) resists the 180–260 Pa test pressure. | MAR-ULS 5 mm exposed (S); B651 5.2.6 ≤ 13 mm, bevel 1:2 above 6 mm (S); BRE-GG47 landing ≤ 10 mm below sill nosing, drain channel (S); BNW-FDR/DDH19 channel lets 150 mm upstand drop (S); water head 180 Pa = 18 mm, 260 Pa = 27 mm (I) |
| Track support | Concrete **rebate (slot) in the slab/grade beam**, lined with a liquid or self-adhered **sill pan** (back dam to under the floor finish, end dams ≥ 150 mm up the jambs, floor sloped ≥ 6 % to an open front that discharges into the trench drain), on a **load-bearing thermal-break block** (high-density PUR board, e.g. Purenit/Phonotherm, ~50 mm (I)), levelled to ±1 mm (S), grouted with chloride-free self-levelling concrete (S). | MAR-ULS, MAR-PS, LOE-INST (S); NRC-WWI (S); PUR (S) |
| Trench drain | Proprietary channel 100–150 mm wide (S range), ≥ 100 mm deep (I; min 76 mm (S)); heel-safe grate with openings ≤ 13 mm, long dimension parallel to the wall (S); full door width + ≥ 150 mm each side (I); outlet to the 08 J solid pipe at ≥ 1 % (S), never to the foundation drain [I]. | B651 4.3.4; DDH19 ≥ 150 mm where not roof-protected; GG47 slots ≤ 18 mm; Marvin low-profile door 38 × 76 mm channel (S\*) |
| Overhang | Keep 600 mm; door head tucked within 150 mm of the soffit (I) so VBBL 9.27.3.8.(3) treats the head as sheltered. Overhang ratio for a 2.7 m wall ≈ 0.22 (I) → CMHC "medium" exposure at the threshold (I). **Gutter is mandatory** (06/08). | V2 / 01; CMHC-BPG Fig. 5.1 |
| Head | Steel or glulam lintel, **deflection ≤ 3 mm** over the span under superimposed load after dead load/sag (S); head gap filled with compressible backer/insulation, no expanding foam (S); metal head flashing with drip and end dams; air barrier wrapped from the frame over the lintel face to the roof deck pre-strip (06 B8); 50–75 mm (I) exterior insulation on the lintel face under the soffit. | MAR-ULS, LOE-INST (S); 01; 06 B |
| East vs west | **East:** wind-driven-rain side (RDH) → 260 Pa water, Performance-type sill, generous trench. **West:** low afternoon sun → exterior vertical shading or exterior blinds, lower SHGC on the west panes, UV-stable gaskets; the 600 mm overhang shades only ≈ 0.35 m (I) of glass at 30° profile angle. | 03; BC-B24-08 (S) |
| Interior floor | **No moisture-sensitive floor finish (hempcrete topping, wood) within 610 mm of the sill** (S, Marvin); use concrete/stone/tile there. In-floor heating near the sill recommended. | MAR-ULS (S) |

---

## 2. System options and recommendation

### 2.1 Code baseline for the glazed wall (Vancouver)

| id | requirement | value | source | notes |
|---|---|---|---|---|
| G1 | Part 9 windows and doors must conform to NAFS (AAMA/WDMA/CSA 101/I.S.2/A440) **and** CSA A440S1 | — | V2 9.7.4.2.(1) | Products outside NAFS scope (site-glazed, curtain wall, large custom units) go to Part 5 [S, V2 A-9.7, A-9.7.4] |
| G2 | Performance grades for a building ≤ 10 m tall may be taken from "Table C-5 of Appendix C" instead of a CSA A440S1 calculation | — | V2 9.7.4.3.(1) | **VBBL 2025 Appendix C has only Tables C-1 to C-3** (searched V1 text): the reference is dangling. The table exists in BCBC 2018 (BCBC18-C) |
| G3 | BCBC 2018 Table C-5, Vancouver region rows (Richmond, North Vancouver): 1/5 DRWP **160 Pa** (S), 1/50 HWP **0.45 kPa** (S), specified DRWP **160 Pa** (S), wind load **911 Pa (19.03 psf)** (S) → **DP 960 Pa, PG 20, water resistance 180 Pa** (S). West Vancouver: HWP 0.48 → DP 1200, PG 25, water 180 (S). | City of Vancouver (HWP 0.45, DRWP 160 (S, V1 Table C-2)) → **DP 960 / PG 20 / 180 Pa** (I, same inputs as Richmond) | BCBC18-C Table C-5 | Values are for open terrain (S\*, RDH-CS14 summary of the BC Rev. 8 basis) and low-rise ≤ 10 m (S). The Alberta guideline built on the same method uses exposure factor Ce = 1.0 for ≤ 10 m, open terrain (S, AB-NAFS16) |
| G4 | NAFS water test pressures exist only in steps: 140, 150, 180, 220, 260, 290, 330, 360 … Pa (S); the water pressure may exceed the PG value but not fall below it (S) | PG20 → ≥ 150 Pa (S); specified DRWP 160 → next step **180 Pa** (S) | RDH-CHEAT | Canada caps the water test at 720 Pa (15 psf) (S, RDH-NAFS13) |
| G5 | Code minimum performance class for Part 9 is R; LC is "moderate duty"; CW/AW are typical for Part 5 (S) | — | RDH-NAFS13 | |
| G6 | Canadian air infiltration/exfiltration level: code minimum **A2** for operable products; "Fixed" for non-operable (S) | — | RDH-NAFS13 | Values of A2/A3 in L/s·m² were not read |
| G7 | **"Limited Water" (LW) doors** may be used only (a) between a dwelling and an unconditioned garage/carport, (b) where the door is designed to the accessibility provisions of 3.8.3 (clear width, level space, operator, closer), or (c) where the head is sheltered per 9.27.3.8.(3) (eave-to-trim ≤ ¼ overhang) | 600 mm overhang → trim within **150 mm** of the eave (I, 0.25 × 600) | V2 9.7.4.2.(2); V1 5.9.2.2.(5) (same for Part 5) | LW exists for side-hinged doors (S, V2 A-9.7.4.2.(1)) and, since NAFS-17, folding doors (LWFLD) (S\*). **Not for sliding doors** (no LW sliding type found [S\*]): a lift-and-slide must carry a numeric water rating |
| G8 | Part 10 maximum USI for **"Windows, sliding, and folding doors with glazing"**: performance path **1.44** W/(m²·K), prescriptive path **1.22** (S); prescriptive for WWR ≥ 30 % **and** one-family dwelling ≥ 325 m²: area-weighted average ≤ **1.04** with no unit above 1.22 (S). Swinging doors: 1.80 (S) | — | V1 Table 10.2.2.7.(1) (pdf p.797), 10.2.1.4.(2)–(3) | Applies to buildings under 10.2.1.4 (Group C, < 4 storeys or ≤ 2 units). A Group A pavilion uses 10.2.1.2 (ASHRAE 90.1 / NECB; fenestration values not researched). Labels to NFRC 100 or CSA A440.2; values reported to two decimals, 1.23 fails 1.22 (S, Note A-10.2.2.7.(3)); large or imported units may use a sealed simulation report (S) |
| G9 | Metal frames and sashes need a thermal break (S); windows and doors must minimise warm-side condensation (S) | — | V2 9.7.3.2.(1)(a), 9.7.3.3.(1) | No Part 9 temperature-index table in VBBL 2025; Part 5 notes recommend specifying an I value tested to CSA A440.2 (S, V1 A-5.3.1.2) |
| G10 | Glass in sliding doors at every entrance to a dwelling unit and in public areas, sidelights within 915 mm of doors and > 500 mm wide → **safety glazing** (tempered or laminated, CAN/CGSB-12.1) or wired glass (S); transparent panels that could be mistaken for an exit need barriers/railings (S) | 915 mm, 500 mm (S) | V2 9.6.1.4.(1), (3) | Also covers W4 fixed panes next to the door |
| G11 | Sliding doors serving dwellings: panel not removable when locked; pin lock ≥ **9 mm** throw or ASTM F842 Grade 10 (S) | — | V2 9.7.5.1 (Resistance to forced entry) | |
| G12 | Accessible doorway threshold ≤ **13 mm** above finished floor, bevelled (S) | — | V1 3.8.3.6.(5) | **A detached house is exempt from 3.8** [S, V1 3.8.2.1.(1)(a) via 08]. For a Part 3 public building it applies |
| G13 | CSA B651-18: thresholds ≤ 13 mm; bevelled ≤ 1:2 where > 6 mm (S, 5.2.6); changes in level 0–6 mm vertical, 7–13 bevelled 1:2, > 13 at ≤ 1:12 (S, 4.3.2 Table 1); outdoor living areas of accessible dwellings need a "no step, level threshold" through patio doors (S, 7.4.7(e)); gratings ≤ 13 mm openings, long dimension perpendicular to travel (S, 4.3.4) | — | B651 | Benchmark where VBBL 3.8 does not apply |

### 2.2 Operating types

| type | how it seals | water/air evidence | threshold | head / structure | look | maintenance | verdict |
|---|---|---|---|---|---|---|---|
| **Lift-and-slide** (2–6 panels, 1–3 tracks) | Panel lifts off the gaskets to roll, drops onto them when closed [S\*] (trade press; Loewen LOE-BRO "panels fully engage to create a robust weather seal" [S]) | Sierra Pacific clad L&S: water no leakage **5.43 psf = 260 Pa** (S) with standard weep sill (LC-PG35); **7.52 psf = 360 Pa** (S) with drain tube and structural upgrade (LC-PG50); air A2 (S). Loewen: up to **PG70** (S) | Recessed/flush tracks offered by most makers: Loewen 1½ in (≈ 38 mm) flush track with drainage ports (S); Marvin flush/recessed sill exposed **5 mm** (S) | Head jamb is the panel guide; header deflection ≤ **3 mm** (S, MAR-ULS; LOE-INST 1/8 in) | Largest panes; one interlock per panel pair; Cascadia interlock (mullion) width **202 mm** (S), Westeck frames **177 mm** (S) | Rollers and lift gear adjustable; gaskets replaceable [I] | **Recommended** |
| Multi-slide (non-lift) | Brush/fin seals slide continuously against the sill [I] | One maker reports multi-panel slide air 0.14 vs lift-slide 0.02 cfm/ft² (S\*, forum quote) | Low/flush sills available; Weathershield notes a 1½ in low sill riser caps positive DP (by water test) at **20 psf** vs **50 psf** with a high riser (S\*) | As lift-and-slide | As lift-and-slide | Track debris more critical [I] | Second choice |
| Folding (bifold) | Many hinged vertical joints, each with a gasket [I] | NAFS-17 created LWFLD (limited-water folding door) (S\*); Solarlux claims "no compromise" with a 10 mm track but publishes no class (S\*) | 10 mm barrier-free track (Solarlux) (S\*) | Top-hung types: header deflection ≤ lesser of L/720 and 6 mm (NanaWall) (S\*); Marvin bifold ≤ **3 mm** with panel weight ≈ **7 psf** as permanent load (S, MAR-BF) | Panels stack as a block; more frame lines in the closed view [I] | Most hinges, seals and adjustment points [I] | Not recommended for an east (storm-side) wall; acceptable west under the 150 mm head rule if LW is accepted (G7) |

### 2.3 Frame materials and products available in BC (data found)

| product (maker, origin) | type / frame | thermal (whole unit) | threshold data | air / water | notes |
|---|---|---|---|---|---|
| **Cascadia Slider PH** (Cascadia, Langley BC) | Sliding door, **pultruded fibreglass** filled with Resolic foam λ 0.023 (S) | PHI **phA**, USL **0.76** W/(m²·K) with Ug **0.70**, triple 4/16/4/16/4 = 44 mm (S); 0.65 with Ug 0.55 (S); test size 2.40 × 2.50 m (S) | Threshold bf **168 mm**, Uf **0.74**, ψg 0.021, **fRsi 0.76** (S); ψinstall threshold **0.038 W/(m·K)** in an EIFS wall, head 0.005, jamb 0.010 (S) | Not published [I] | Not stated as lift-and-slide; threshold height not given. Lowest-carbon frame family found with BC data (UBC-FEN) |
| **Westeck PH Vinyl Lift & Slide** (Westeck, Chilliwack BC) | **Lift-and-slide, PVC**, PU-filled, fibreglass ("Innergy") reinforcement (S) | PHI **phB**, USL **0.78** with Ug 0.70, 42 mm (4/15/4/15/4) (S) | Threshold bf **177 mm**, Uf **0.84**, ψg 0.026, **fRsi 0.74** (S); ψinstall threshold operable **0.010**, fixed **0.007** W/(m·K) (EIFS) (S) | Not published | True lift-and-slide, BC-made, PH-certified; PVC look and higher thermal movement [I] |
| **PH Tech Twist S-6350** (Lévis QC) | Sliding door with FRP reinforcement (S) | **phB**, USL **0.80** (S) | Threshold bf **142 mm**, Uf **0.94**, fRsi **0.74** (S); ψinstall bottom **0.006** (S) | "Airtightness and structural report available" (S) | Quebec-made reference |
| **Loewen LiftSlide** (Steinbach MB) | **Aluminium-clad Douglas fir** lift-and-slide | "Common" U **0.36 Btu = 2.04** (dual) and **0.27 Btu = 1.53 W/(m²·K)** (triple) (S); "more aggressive performance can be achieved" (S) | 1½ in flush track, drainage ports; sill pan **mandatory** (S) | **PG70** max (S) | The common triple value **fails VBBL 1.44 and 1.22** (I, from S): a PH-grade glazing/spacer package would be required |
| **Sierra Pacific clad L&S** (US; reference) | Aluminium-clad wood | U **0.20–0.32 Btu = 1.14–1.82** W/(m²·K) by glazing (S) | Standard aluminium sill, weep gates or drain tube (S) | Water **260 / 360 Pa**; LC-PG35/50; A2 (S) | Shows the "drain tube" uplift in rated water |
| **Marvin Ultimate Lift and Slide** (US; reference) | Clad wood | not read | Flush/recessed sill exposed **5 mm** (S); Performance Sill for "air and water infiltration" with a higher exposed face (S) | not published (S\* search) | Best-documented site preparation (§3) |
| **Schüco ASE 80.HI** (DE; via fabricators) | Thermally broken aluminium lift-and-slide | "Passive house level" (S\*); dealer Uw 0.92 (S\*) | Zero threshold (S\*) | NBS listing: watertightness EN 12208 **E900** (triple track) (S\*) | Slimmest sightlines (40 mm interlock option (S\*)); highest frame carbon [I] |
| ENERsign Primus 755 (EU) | Wood-aluminium lift-and-slide | phB, 0.60 at 4.5 × 2.8 m (S\*) | barrier-free threshold (S\*) | — | Only wood-aluminium PH lift-and-slide found; imported |

Brief names not covered by data: Euroline, Duxton, Inline, Alpen, Optimum, Lepage, Raico/Wicona, Pella. No public threshold or NAFS data was retrieved for them before the web limit.

### 2.4 How ratings fall with a low or flush sill

| evidence | value | tag |
|---|---|---|
| Sierra Pacific lift-and-slide: same door, water **260 Pa** with the standard weep sill vs **360 Pa** only with a drain tube and structural upgrade | 260 → 360 Pa | (S) |
| Weathershield multi-slide: low sill riser (1½ in) limits positive DP by water test to 20 psf vs 50 psf with high riser → by NAFS steps PG20 ↔ water ≥ 150 Pa vs PG50 ↔ ≥ 360 Pa | ≈ 150 vs 360 Pa | (S\*) / (I) conversion |
| Western Window Systems flush-sill data sheet: water 3.76 psf (configuration not confirmed) | 180 Pa | (S\*) |
| Centra Windows: low-profile sills "only perform up to Limited Water" | 0 Pa | (S\*) |
| RDH 2002 BC field programme: a causal factor for leakage directly through windows was design "limited by sill height" | qualitative | [S, RDH-WPR §6.2.3] |
| CMHC: accessible door sills (Details 16, 17) "should only be used" where the door has low exposure and little snow; otherwise lift door sills 200 mm above the deck drainage surface | 200 mm | (S, CMHC-BPG Details 3, 16, 17) |
| German flat-roof rule: door upstand 150 mm above surfacing; 50 mm only with a drainage channel directly at the door; barrier-free = special construction with extra measures; grates ≥ 150 mm wide where rain exposure is not reduced by a roof | 150 / 50 / ≥ 150 mm | (S, BNW-FDR; DDH19) |
| Physics: a static water column resisting a pressure P needs h = P/9.81 mm: 150 Pa → 15 mm, 180 → 18, 260 → 27, 360 → 37 mm | — | (I) |

**Reading [I].** A visible step of ≤ 13 mm can only hold back about 127 Pa if the step is the water dam. Flush doors therefore pass tests only when the dam is inside the frame and the exterior water level is held well below the walking surface, by drained tracks, drain tubes and an exterior channel. That is the basis of the §3 threshold.

### 2.5 Embodied carbon

| item | GWP A1–A3 | tag / source |
|---|---|---|
| Cascadia fibreglass **frame**, per m² of frame | **84.91** kg CO₂e | (S, UBC-FEN; TRACI 2.1; raw materials 71 %, energy 18 %) |
| Cascadia fibreglass **window, double** IGU, per m² | **121.20** kg CO₂e | (S, UBC-FEN Fig. 2) |
| Cascadia fibreglass **window, triple** IGU, per m² | **145.22** kg CO₂e | (S); +24 kg = +19.8 % (I); the report's text says "15 % higher" — internal inconsistency |
| Aluminium window EPDs reviewed (21 EPDs, 48 products) | mostly ≈ 110–180 per declared unit (1 m² or 1.23 × 1.48 m) | (S, UBC-FEN Table 2, values partly garbled in extraction) |
| Fibreglass vs wood-only windows | fibreglass "slightly higher" than wood-only | [S, UBC-FEN] |
| Aluminium sliding doors (various EPDs) | 58.5–208 kg CO₂e/m² | (S\*, OneClickLCA summaries) |
| Wood-aluminium windows (Nordic EPDs) | 52–63 kg CO₂e/m² | (S\*) |
| IGU only: Pilkington double vs triple | 47.6 vs 47.8 kg CO₂e/m² | (S\*) |
| IGU only: Cardinal double annealed vs triple annealed | 39.6 vs 59.0 (unit unconfirmed) | (S\*) |

**Reading [I].** Ranking per m², lowest first: timber or alu-clad timber, then fibreglass, then PVC (no BC data), then thermally broken aluminium. Glass weight (triple, laminated) adds roughly 20–25 kg CO₂e/m² over double in the one consistent data set (UBC-FEN). The triple-glazing penalty is repaid by heat saved: ΔU ≈ 0.6 W/(m²·K) × HDD 2825 (S, 01) × 24 h ≈ **41 kWh/(m²·yr)** (I). The carbon payback depends on the heating fuel's emission factor, which was not verified this session (open question Q7). Triple glazing is effectively required by G8 anyway (I).

### 2.6 Recommendation

**R1 (default for the tool): lift-and-slide, fibreglass or aluminium-clad timber, PHI-certified or equivalent (USL ≤ 0.80 W/(m²·K)), triple low-e argon, 2 panels on 2 tracks (OX or XO) up to ≈ 4.8 m wide × 2.4–2.7 m tall (I), recessed sill on a thermal-break block in a drained slot, with an exterior trench drain.**
- Ratings to specify for the installed sill configuration:
  - **East:** LC-PG20 (DP ≥ 960 Pa) or higher, water **260 Pa**, air **A3**.
  - **West:** water **≥ 180 Pa** (code), 260 Pa preferred.
  - (S for the code values; I for 260 Pa and A3.)
- Why:
  - Lift-and-slide gives the best seal per opening width [S\*/I].
  - It has the fewest joints along the threshold [I].
  - BC-made PH sliders already show threshold fRsi 0.74–0.76 (S), well above condensation risk (§5.4).
  - Fibreglass or timber frames halve frame carbon compared with aluminium [S/S\*].
  - Aluminium cladding or fibreglass gives the slim, durable, low-maintenance exterior finish that coastal exposure needs [I].
- Look: the exterior reads as large undivided triple-glazed panes. Frame sightlines are ≈ 150–180 mm at head and threshold and ≈ 200 mm at the interlock (S, PHI frame widths). Head and track can be hidden: the head tucks up behind a soffit/fascia band, and the track is flush with the floor (I).
- **R2 (thinnest lines):** thermally broken aluminium lift-and-slide (Schüco ASE 80.HI class) with a zero threshold. Check USI ≤ 1.22, and accept higher frame carbon and a lower fRsi at the threshold [I].
- **Not recommended:** bifold on the east wall, and any double-glazed unit (fails 1.22 prescriptive and usually 1.44) [I from S].

---

## 3. THRESHOLD (base) in construction order

### 3.1 Geometry baseline (datum: FFL = 0; x = 0 at the frame's exterior face, outward +)

| point | vertical (mm) | horizontal (mm) | tag / basis |
|---|---|---|---|
| Interior finished floor at the sill (non-hygroscopic strip, §6.1) | 0 | x ≤ −(frame depth) | datum |
| Top of track/sill, interior edge | **+5** | — | (S) Marvin flush/recessed sill exposed 5 mm; ≤ 13 mm (S, B651 5.2.6; V1 3.8.3.6.(5)) |
| Sill nosing, exterior edge, bevelled 1:2 | +5 → −8 | 0 → +26 | (I) 13 mm rise at 1:2 (S slope) |
| Trench-drain grate top | **−8** | +10 → +160 | (I) ≤ 10 mm below the sill leading edge in exposed locations (S, GG47); grate width 150 (S, DDH19) |
| Pavers at the grate | −8 (flush with grate) | from +160 | (I) |
| Paver fall away from the door | **2 %** (1:50) | to +1500 | (S) accessibility ≤ 1:50 (B651/VBBL via 08) and GG47 1:40–1:60; 08 H8 adopts 2 % |
| Paver surface at 1.5 m | −38 | +1500 | (I) 2 % of 1.5 m below −8 |
| Channel invert at the outlet end | ≤ −110 | — | (I) ≥ 100 mm channel depth; ≥ 76 mm (S\*, Marvin low-profile channel) |
| Slot (rebate) floor in the slab | **≈ −120** (front) / −110 (back) | −(frame depth + 25) → 0 | (I) = 67 mm overall slot recess incl. 25 mm shim space (S, MAR-ULS) + 50 mm thermal block (I); floor sloped ≥ 6 % outward (I from 6 % (S, A440.4-98 via RDH-WPR)) |
| Back dam (pan upturn) top | ≈ −15 (just under floor finish) | back face of slot | (I); ≥ 13 mm min (S, LOE-INST ½ in); ≥ 18–27 mm to beat 180–260 Pa (I) — achieved ≈ 95–105 mm (I) |
| End dams up the jambs | **≥ 150 mm** above slot floor | jamb faces | (S) LOE-INST 6 in; NRC-WWI "up 150 mm on jambs" |
| Pan exterior downturn into the channel | ≥ 50 mm | x = +0 → +25 | (S) 2 in exterior leg (LOE-INST); (I) drops into the channel body |
| Top of foundation stem / grade beam under the slot | ≈ −180 (I) | — | (I) slot + block + slab thickness; carries the sill full width (S, MAR-ULS) |
| Underside of footing | ≤ −450 below **exterior** finished grade | — | (S) frost depth 450 mm (06, VBBL19 1.1.3.2) |

### 3.2 Ordered layer table (T1 → T20)

| # | component | material | dimensions / laps / slopes | support and fixing | source |
|---|---|---|---|---|---|
| T1 | Footing + foundation stem / grade beam under the opening | Cast concrete | Underside ≥ 450 mm (S) below finished exterior grade. Stem top at ≈ −180 (I) under the slot so the threshold insulation can continue up (T5). Must give level support across the full opening width (S); sill variance ≤ **1 mm** over the whole length (S, MAR-ULS; MAR-PS) | On undisturbed soil (06) | 06 A1/C1; MAR-ULS |
| T2 | Exterior foundation insulation below the threshold | XPS, or cellular glass where loaded by the channel [I] | ≥ 75 mm (I, = 07 D7 slab-edge value) from the footing to the underside of the thermal block (T9), with no gap [I] | Adhered to the stem; protected below paving | 07 D6/D7 (RSI 2.45 slab target (S)); GG47 Fig. 10: insulation carried below the external landing (S) |
| T3 | Under-slab system | per 07 D3–D8 (granular, 75 mm XPS, **0.25 mm soil-gas poly lapped ≥ 300 mm** (S)) | Poly turned up and sealed to the stem at the threshold, under the slot [I] | — | 07 D8 |
| T4 | Slab / topping base with a **formed slot** | Concrete, slot formed with a box-out | Slot width = sill depth + **51 mm** (S, MAR-ULS "2 in wider and longer"); slot depth to suit (S table, MAR-PS: 125 mm for 1 track, 206 for 2, 303 for 3, 402 for 4); recess from FFL **67 mm** + block (S/I); floor sloped ≥ 6 % to the exterior (I) | Front face of the slot open to the exterior ("open face slot") (S, MAR-PS) so the pan drains out | MAR-ULS; MAR-PS |
| T5 | Slab-edge insulation at the slot | XPS strip | 75 mm (S, 07 D7) from slab underside to the slot floor, lining the slot's inner vertical face [I] | Cast against | 07 D7 |
| T6 | Primer + **sill pan** | Liquid-applied (PMMA/silicone) with fleece at corners, or self-adhered membrane; rigid stainless or prefinished 24 ga steel nosing at the open front [I] | Lines the slot floor, back face (back dam to ≈ −15) and ends; **end dams ≥ 150 mm** up the jamb rough openings (S); **exterior downturn ≥ 50 mm** into the channel (S) | Bonded to primed concrete; the rigid front piece sits in the membrane | LOE-INST ("rigid or flexible sill pan, or liquid flashing"; "sill pans must be used in every installation") (S); MAR-BF (ASTM E2112 pan types I–V) (S); NRC-WWI lesson #1 (S); 06 (no aluminium against concrete) |
| T7 | Pan integration with the soil-gas barrier | Compatible membrane strip | Lapped ≥ 100 mm (I) from the pan back dam onto the slab top under the floor finish, sealed to the poly upturn (T3) at the slab edge | Adhered | 07 D8/D10; [I] |
| T8 | Integration with wall WRB / air barrier at the jambs | Self-adhered membrane | Jamb membranes lap **over** the pan end dams (shingle order) [S principle]; continuous to the head (§4) | — | NRC-WWI; 06 A12 |
| T9 | **Load-bearing thermal-break block** under the track, full width | High-density recycled PUR board: Purenit (λ **0.096** rated (S), 550 kg/m³ (S), compressive stress up to **8 MPa** (S)) or Phonotherm RG 550 (λ **0.083** (S\*), ≈ 7000 kPa at 10 % (S\*)). Compacfoam CF200 (λ ≈ **0.046** (S); service stress 1.01 N/mm² (S\*)) where loads are lower | **50 mm** (I) thick, sill-width; top aligned with the slab-edge insulation line so the frame's thermal break continues the floor insulation [I] | Bedded in the pan on sealant; mechanically fixed through the pan only above the back-dam water line, with sealant-filled holes [I] | PUR; TBS-CF; panel weight "up to 1000 lbs" ≈ 454 kg (S, LOE-BRO) concentrated at rollers [I] |
| T10 | Shims / levelling | Plastic horseshoe shims under each bridge | **25 mm** shim space (S); bridges at 300–600 mm (12–24 in) (S, LOE-INST FASTrack) | On T9 | MAR-ULS; LOE-INST |
| T11 | **Track / sill** (recessed) | Stainless or aluminium track with drain channels (S) | Level within **1 mm** over full length (S); top +5 (S); interior edge flush with floor | Screwed through bridges; screw holes filled with sealant (S) | MAR-ULS; LOE-INST |
| T12 | Track drainage | Weep system / drain tubing | Drain locations fixed **before** grouting (S); tubes run from the track sump through the open slot face into the channel; Loewen transverse drains (S) | — | LOE-INST; MAR-ULS |
| T13 | Air seal under the track | **Two parallel sealant beads** below door thresholds (S, A440.4-98 6.7.2.4) plus continuous membrane/tape from the frame's interior flange to the slab (back-dam side) [I] | Interior plane of airtightness [S, NRC-WWI: an airtight plane on the interior keeps the rough sill dry] | — | RDH-WPR (A440.4-98); NRC-WWI |
| T14 | Slot grout | **Self-levelling concrete, free of chlorinated additives** (S) | Fills around the track to floor level, leaving drain paths and the pan front open | — | MAR-ULS; LOE-INST |
| T15 | Jambs, interlocks, panels | Per manufacturer | Rough opening plumb/square/true within **3 mm** (S) | Jambs fixed to a continuous flat solid surface (S) | MAR-ULS |
| T16 | **Trench drain** | Polymer-concrete or stainless proprietary channel with **heel-safe grate, openings ≤ 13 mm**, long side parallel to the wall (S, B651 4.3.4) and a dirt screen of 1.0–1.2 mm mesh under the grate (S, DDH19) | Width **100–150 mm** (S range: 150 DDH19 where not roof-protected; GG47 slots ≤ 18 mm) — 150 mm adopted (I); depth ≥ 100 mm (I); length = door + ≥ 150 mm each side (I); fall in the channel 0.5–1 % (I) or a built-in fall | On a concrete haunch over compacted base **outside** the foundation insulation (T2) [I]; top at −8 | B651; GG47; DDH19; BNW-FDR |
| T17 | Channel outlet | Solid PVC ⌀100 (I), solvent-welded | ≥ **1 %** (S, 08 J) to the rainwater line J12 / rain garden; cleanout at the channel end (S, GG47 rodding access) | — | 08 J; GG47 |
| T18 | Lined paving zone near the door | Pavers on open-graded bedding over an **impermeable liner or concrete sub-slab** falling to the channel | 0 → **1.0 m** (I) from the frame; beyond that, normal permeable section (08 H) | Liner turned up into the channel side [I] | 08 H.4 conflict 8 (ICPI/MV23 "downslope of foundations"; STEP 4 m with run-on) (S); [I] |
| T19 | Pavers | Concrete pavers (08 H7: 80 mm, joints ≤ 10 mm) | Flush with grate at −8; **2 %** fall away (S) | Edge restraint at the channel (channel body acts as restraint) [I] | 08 H; B651 |
| T20 | Interior floor finish strip at the sill | Concrete/stone/porcelain (not hempcrete, not wood) | **≥ 610 mm** wide from the interior side of the sill (S, MAR-ULS) | Laid after the track; perimeter flexible sealant to the track [I] | MAR-ULS; 07 D10 |

### 3.3 Accessibility check (I, against S limits)

- Interior FFL to track top: +5 mm. ≤ 6 mm, so it may be vertical (S, B651 Table 1).
- Track top to grate: 13 mm total at 1:2 bevel. Meets 5.2.6 and VBBL 3.8.3.6.(5) (S).
- Grate openings: ≤ 13 mm, long side parallel to the door line (perpendicular to travel) (S).
- Paving: cross fall and running slope 2 % ≤ 1:50 (S).
- Reserve: GG47 lets the landing sit up to 10 mm below the sill nosing in exposed locations (S). The design uses 8 mm, keeping 2 mm for paver settlement and tolerance [I]. **Settlement of > 2 mm at the channel edge breaks the 13 mm rule** [I]. The channel body therefore acts as a rigid edge and the first paver row is bedded on the T18 sub-slab [I].
- Door hardware and clear width: VBBL 3.8.3.6.(2) ≥ 850 mm clear for sliding doors (S, Part 3 only). Operating devices 900–1100 mm above floor (S, V1 3.8.3.6.(4); B651 5.2.7.1). Lift-and-slide handles need a lifting turn [I]. Check B651 4.2 operating force with the maker, or specify a motorised/assisted lift-slide where accessibility applies [I].

### 3.4 Protection by the roof overhang

- Overhang ratio (CMHC): overhang width ÷ wall height above the lowest affected element (S, CMHC-BPG p. 5-4).
  - 600 mm ÷ 2.7 m (assumed threshold-to-soffit height (I)) = **0.22** (I).
  - 500 mm ÷ 2.7 m = 0.19 (I).
- On CMHC Fig. 5.1, the guide's example of ratio 0.3 in terrain C reads "medium" exposure (S). At 0.2 in terrain C (suburban, low buildings within 5 heights) the reading is **medium, close to high** (I).
- The CMHC survey chart shows problem rates falling with overhang widths of 0, 1–300, 301–600 and > 600 mm (S, CMHC-BPG Fig. 3.1). 03 reports ≈ 90 % at 0 mm vs ≈ 25 % at ≈ 600 mm (S\*, via GBA).
- Code shelter: only the top **¼ × 600 = 150 mm** below the eave counts as sheltered (S, 01/03). The threshold is never sheltered; the **head** can be (§4).
- RDH Lower Mainland data: an east wall 4 m below a 500 mm overhang caught ≈ **3 %** of horizontal rain, vs ≈ 10 % with 50 mm and ≈ 13 % with none (S, 03).
- **Decision [I]:** treat the threshold as **medium exposure**. Use a drained threshold and a trench, never a "rely on overhang" detail. The overhang reduces load (§5.3); it does not replace the drain.

---

## 4. HEAD in construction order (datum: underside of lintel = 0; up +)

| # | component | material | dimensions / laps / slopes | support and fixing | source |
|---|---|---|---|---|---|
| H1 | **Lintel / beam** over the opening | Steel W-section with timber packers, or glulam / LVL (I) | Span = opening width + bearings (e.g. 5.0 m for a 4.8 m opening) (I). **Deflection ≤ 3 mm over the unsupported span under superimposed (live/wind/snow) load, after natural sag and permanent loads** (S, MAR-ULS, MAR-PS); Loewen: ≤ 1/8 in (3 mm) after the roof is loaded (S). Panel weight ≈ 7 psf ≈ 0.34 kPa as permanent load for hung systems (S, MAR-BF). 3 mm on 5 m = L/1667 (I): **needs engineering**; a steel beam or deep glulam with low creep is likely (I) | On posts/jamb studs to the foundation; jamb posts are the pocket or stacking walls | MAR-ULS; LOE-INST; [I] |
| H2 | Roof structure at the wall line | Joists over or hung from H1; full-depth blocking sealed on 4 sides; spray-foam air tie; exterior-insulated deck | Per 06 B3–B10: 600 mm cantilever (S), deck pre-strip ≥ 50 mm past the interior wall face (S), A/V layer on the deck (S) | — | 06 B (BCH-BI21) |
| H3 | Rough head packer | PT or LVL packer, continuous | "Flat solid surface" for the head-jamb screws over the full length (S) | Screwed/bolted to H1 | MAR-ULS |
| H4 | Head air/water membrane | Self-adhered membrane | From the deck pre-strip (06 B8) **down** the outer face of the lintel and into the rough head, lapping over the jamb membranes (shingle order) [I]; ≥ 50 mm onto the inner face for the interior air seal [I] | Adhered on primer | 06 B8–B9; [I] |
| H5 | **Head track / head jamb** | Per maker | Fixed rigidly (it is the panel guide; the panel-to-track clearance must be kept (S)); levelled with adjustment screws (S) | Screws into H3 | MAR-ULS; LOE-INST |
| H6 | Head gap above the frame | **Compressible backer rod or compressible insulation; no expanding foam** (S) | Gap set by tolerance and beam live-load deflection: 10–15 mm (I) | — | LOE-INST |
| H7 | Interior air seal frame → lintel | Backer rod + sealant or tape, tied to H4 | Continuous with jamb seals | — | [I] |
| H8 | Interior trim / cap | U- or J-shaped cap metal, **not in contact** with the head track; caulk joint allows vertical movement (S) | — | Fixed to finish work | LOE-INST |
| H9 | Exterior insulation on the lintel face | Mineral-wool or wood-fibre board | **50–75 mm** (I) from the frame head to the soffit, aligning the frame thermal break with the roof insulation line [I] | Screwed through to H1 packers | [I]; 06 B6 logic |
| H10 | **Head flashing** | Prefinished 24 ga steel (06) | Upstand ≥ **50 mm** behind H4 (S), slope ≥ **6 %** (S), end dams ≥ **25 mm** (S), drip ≥ **5 mm** off the frame face (S); required by code only if the trim top is > ¼ overhang = **150 mm** below the eave (S); **fitted anyway** (Loewen: "drip flash or other means of water deflection" (S)) | Fastened through the upstand above the water line [S, 06 A11 logic] | 01 `req.flashing-geometry`; V2 9.27.3.8.(3)–(4); LOE-INST |
| H11 | Cladding / fascia band over the lintel | As wall cladding, or metal | Over a drained cavity; cavity top closed to the soffit (S) | Strapping | 01 `req.cavity-interruptions-and-top`; 06 B22 |
| H12 | Soffit and frieze | Per 06 B20/B24 (vented, screened) | Soffit underside ≤ 150 mm above the door-head trim (I) to stay within the O/4 rule | — | 06 B |
| H13 | Gutter + downspout | 06 B19 / 08 J | **Mandatory**: without it the drip line at 600 mm lands on the trench and the accessible landing [I] | — | 06; 08 J |
| H14 | Exterior shading (west; optional east) | Exterior venetian blind or roller screen in a head box hidden in the soffit, or vertical fins at jambs (I) | Box depth ≈ 150–200 mm (I) behind the fascia | Fixed to H1/H2 outside the air barrier [I] | BC-B24-08 (S): overhangs typically south, vertical shading east/west |

---

## 5. Performance

### 5.1 Control-layer pen test — threshold

| layer | path (outside → inside) | transfer | break / risk |
|---|---|---|---|
| **Water shedding** | Glass → panel bottom rail → track exterior lip → bevel → grate → channel | Rain film leaves the glass at the bottom rail; the track's outer chamber drains through weeps [S, LOE-INST] | Grate clogged (leaves from the shrub, grit) → water ponds at −8 and over-tops the 13 mm bevel [I] |
| **Drainage plane** | Track chambers → drain tubes → **sill pan** (slot) → open front → channel → pipe | Pan laps **under** the jamb membranes and **over** into the channel (≥ 50 mm downturn) (S) | Pan front buried by grout or paver bedding → slot fills and back-flows; channel outlet blocked → pan can't drain [I]. Back dam ≈ 100 mm ≫ 27 mm needed for 260 Pa (I) |
| **Air barrier** | Interior: panel gaskets (lift-slide compression) → track → **two sealant beads + membrane** at the interior flange → slab (concrete) → soil-gas poly (07 D8) | Bead/membrane, then concrete continuity, then poly upturn sealed at the slab edge (S/I) | Airtight plane must be **interior** of the pan so the pan sees no air-driven water [S, NRC-WWI]. Sill-to-slab joint is the main radon and air path if left to grout alone [I, from 07] |
| **Vapour control** | Concrete slab + 0.25 mm poly below; frame and glass impermeable | — | Hempcrete topping must stop short of the sill (T20) or it will wick from the slot [I] |
| **Thermal** | Triple IGU (Ug 0.7) → frame threshold (Uf 0.74–0.84 (S)) → **thermal block (T9)** → slab-edge XPS (T5) → foundation XPS (T2) | Block aligned with the insulation plane; trench and haunch kept outside T2 [I] | Concrete grout around the track bridges past the block [I]; stem wall under the slot runs from heated slab to cold paving unless T2 is carried up to the block [S, GG47 Fig. 10 principle] |

### 5.2 Control-layer pen test — head

| layer | path | transfer | break / risk |
|---|---|---|---|
| Water shedding | Roof membrane → edge metal → gutter (06 B) ; wall above opening → head flashing H10 → drip | Head inside the O/4 shelter band if trim ≤ 150 mm below soffit (I, S rule) | No gutter → overflow sheet onto the threshold [I] |
| Drainage plane | Fascia-band cavity → H10 upstand → out | WRB laps over H10 upstand ≥ 50 mm (S) | Reverse lap at the H4/H10 junction [S principle, 06] |
| Air barrier | Deck AVB (06 B9) → pre-strip (B8) → H4 down the lintel face → H7 seal to the frame | Membrane laps and sealant | Each joist bay above the lintel must be sealed (06 B4) — highest-risk air path [S, 06] |
| Vapour | Deck membrane (B9) only; no ceiling poly (avoid double VB) (S, 06/BCH-BI21) | — | — |
| Thermal | Roof insulation above deck → **H9** on lintel face → frame head (Uf 0.79 Cascadia head (S)) | Joints staggered [I] | Steel lintel uninsulated on its exterior face = large linear bridge [I]; Cascadia head ψinstall 0.005 in an EIFS wall (S) is achievable only with continuous outside insulation |
| Structure | Lintel deflection ≤ 3 mm (S) | — | Creep of timber beams under roof dead load closes panel-to-track clearance → panels bind, gaskets crush [I] |

### 5.3 Moisture paths and quantities

- **Arrives:**
  - Wind-driven rain on the glass. Glass absorbs nothing, so the whole catch runs down as a film to the bottom rail and track [I].
  - Splash from the paving and the grate.
  - Gutter overflow at the drip line, ≈ 600 mm out (S geometry).
  - Rain blown under the soffit onto the head.
  - Interior vapour condensing at the cold threshold (§5.4).
- **Run-off load at the threshold (I),** using sourced catch ratios (03) × design rain (01) × a 2.7 m glass height (I):

| case | catch ratio (S, 03) | annual rain (S) | annual run-off per metre of door width (I) | storm (10 mm in 15 min = 40 mm/h (S)) per metre width (I) |
|---|---|---|---|---|
| East, 500–600 mm overhang | ≈ 0.03 | 1325 mm | **≈ 107 L/(m·yr)** | ≈ 3 L/(m·h) |
| East, no overhang | ≈ 0.13 | 1325 mm | ≈ 465 L/(m·yr) | ≈ 14 L/(m·h) |
| BSD-148 upper bound, design wind ≈ 16 m/s with design rain, RDF 0.5, EHF 0.7, shelter 0.5 | (formula, 03) | — | — | ≈ 25 mm/h on the glass → ≈ 67 L/(m·h) |

**Reading [I].** Even the upper bound, ≈ 0.02 L/s per metre, is a tiny fraction of the capacity of any 100–150 mm channel. The trench drain is **clogging-limited, not capacity-limited**. Leaves from the nearby shrub, paver grit and joint aggregate are the threats. That is why the design specifies a dirt screen under the grate (S, DDH19), a rodding/cleanout point (S, GG47) and the 1.0 m lined zone (T18).

- **Drains:** track chambers → tubes → pan → channel → solid pipe at 1 % → rain garden (08 J) [S/I].
- **Dries:**
  - The slot is concrete and stainless, and is designed not to be wet in service [I].
  - The pan dries outward through the open front [I].
  - Construction water in the self-levelling grout dries to the interior. Keep floor finishes off until it does [I].
- **Capillary breaks:**
  - The bevel nosing projects over the channel, so there is no paver-to-frame contact [I].
  - Pan downturn into the channel [I].
  - The thermal block is closed-cell PUR. Purenit is "moisture-resistant" (S) and Phonotherm swells ≈ 1 % in 24 h immersion (S\*).

### 5.4 Thermal and condensation at the threshold

- **Vancouver design conditions:**
  - January 2.5 % design temperature −7 °C, 1 % −9 °C (S, V1 Table C-2).
  - Interior 20 °C (PHI convention) (I).
- **Surface temperature:** T_si = T_e + f_Rsi × (T_i − T_e).

| threshold frame | f_Rsi (S) | T_si at −7 °C (I) | T_si at −9 °C (I) |
|---|---|---|---|
| Cascadia Slider PH | 0.76 | 13.5 °C | 13.0 °C |
| Westeck PH L&S | 0.74 | 13.0 °C | 12.5 °C |
| PHI hygiene minimum | 0.70 (S) | 11.9 °C | 11.3 °C |
| Old CMHC coastal minimum, I48 (temperature index, CSA A440 test) | ≈ 0.48 (I; I and f_Rsi are measured differently — not interchangeable (S, V2 A-9.7.4.2.(1))) | ≈ 6 °C | ≈ 5 °C |

- **Dew points at 20 °C room air** (I, Magnus): 40 % RH → 6.0 °C; 50 % → 9.3 °C; 60 % → 12.0 °C; 65 % → 13.2 °C.
- **Reading [I]:**
  - A PH-class threshold stays dry up to ≈ 60–65 % room RH at design cold.
  - An ordinary thermally broken aluminium threshold condenses or frosts in kitchen-level humidity.
  - Marvin warns that frost may form on the interior side of sill and interlocks in cold climates and suggests in-floor heating (S, MAR-ULS).
- **Install psi:**
  - PHI-validated ψinstall for thresholds in EIFS walls: 0.007–0.038 W/(m·K) (S).
  - **No slab-on-grade flush-threshold psi value was found.** Expect it to be higher unless T2/T5/T9 align [I]. Needs a 2-D model (THERM/Flixo) for the tool's thermal keyframes (open question Q4).

### 5.5 Failure modes in coastal BC — evidence

| evidence | finding | tag |
|---|---|---|
| RDH 2002 BC field testing (for CMHC/HPO) | QA tests of **new** windows: **41 %** failed (S). Condition assessments of in-service units: only **10 %** passed (S). **75 %** of 215 leaks went directly through the window assembly (S). Causes include design "limited by sill height" (S). One exposed sliding door per project is recommended in field-test sampling (S, CMHC-BPG Table 7.9) | (S) RDH-WPR; CMHC-BPG |
| RDH CCBST 2003 | A face-sealed window under a balcony or large roof overhang performs well because it is rarely wetted. Sub-sill drainage supplies the redundancy every other case needs [S] | RDH-CCBST03 |
| NRC/CMHC 2006 lab | Water pooled on a shallow rigid sill flashing **surmounted a ~4 mm up-leg** (S). Water entry rose with pressure and with an exterior plane of airtightness [S]. Remedy: sloped rough sill, back dam, membrane up 150 mm on jambs, airtight plane inboard (S) | NRC-WWI |
| CMHC coastal guide | Residential doors historically relied on canopies and "have not advanced to the water resistance levels of sliding patio doors and windows" [S]. Accessible sills only in low exposure [S] | CMHC-BPG p. 7-28, Details 16–17 |
| BRE GG47 | Friction-fit and brush weather seals deform with time and let water in; replacement should not disturb landing or floor; channel covers fixed by small grub screws become loose if screws aren't replaced [S] | BRE-GG47 Maintenance |
| DDH19 | Grates draining only into a gravel bed without a dirt screen silt up, and back-flow follows in heavy rain [S] | DDH19 |
| SINTEF (Norway) | Heavy sliding doors leak most often at frame corners (S\*) | search summary |
| Marvin | Moisture-sensitive floors closer than 610 mm to the sill are at risk (S) | MAR-ULS |

### 5.6 What each component does, and what fails if it is missing

| component | function | failure if missing / reversed |
|---|---|---|
| Trench drain at −8 | Keeps the exterior water level ≥ 60 mm (I) below the sill seal; collects glass run-off and splash | Water stands at the bevel; 13 mm step = ≈ 127 Pa static head (I) < 180 Pa code test → leaks in east storms [I] |
| Sill pan with back dam and end dams | Second line of defence under the track | Water leaking through track joints runs into the slab edge, hempcrete topping and insulation [S principle, CMHC-BPG/RDH] |
| Open slot front | Pan outlet | Pan becomes a tank [I] |
| Thermal block aligned with insulation | Breaks the slab-to-paving bridge | Cold strip, condensation, frost at the sill (S, Marvin), mould under floor finishes [I] |
| Level ≤ 1 mm track | Panels seal and roll | Gaps at gaskets, binding [S, MAR-ULS] |
| Lintel ≤ 3 mm | Head clearance kept | Panels bind; head seals crushed or open [S/I] |
| Gutter | Moves the drip line off the landing | Concentrated splash at 600 mm out, onto the channel [I] |
| Non-hygroscopic floor strip | Keeps the moisture-sensitive topping away | Hempcrete wets from grout/condensation [I] |

### 5.7 Ageing and maintenance (timeline keyframes)

| year | threshold | head | evidence |
|---|---|---|---|
| **0** | Grout dry, floor finish laid after drying; channel, tubes and grate clean; gaskets new | Lintel settled under roof dead load (check ≤ 3 mm before the panels go in) | (S) MAR-ULS; (I) |
| **5** | Leaves/grit in the channel and track every autumn; clean the grate dirt screen ≥ 2× per year (I, autumn + spring, matching the roof review cycle (S, 06 BCH-MM02)). First paver settlement near the channel — re-level if the step exceeds 13 mm (S limit). Lift-slide roller adjustment (I) | Head gap backer intact; exterior blind (west) first service (I) | (S) GG47, DDH19; (I) |
| **15** | Perimeter sealants at end of life (10–15 yr high-performance (S, 06 CMHC-FL)); brush/fin and compression gaskets compressed → replace (S principle GG47; I timing); channel body sound; track drains rodded | Head flashing/membrane intact if shingled; roof membrane mid-life (15–25 yr (S, 06)) | (S/I) |
| **30** | IGU seal failures become likely; replace IGUs in panels (I, no BC IGU life data found). Thermal block and pan should be original (inaccessible) — the threshold must be designed so the track can be lifted and re-bedded without breaking the floor or landing (S principle, GG47). West: UV-aged gaskets and finish first [I] | Roof replacement with new edge metal (06); head flashing renewed with it [I] | (S) GG47; 06; (I) |

---

## 6. Interfaces (what other trades must provide)

### 6.1 Ground floor (concrete + hempcrete topping and alternatives)

- **Slot:** a formed rebate in the structural slab, recess **≈ 120 mm** below FFL (I).
  - Made of 67 mm overall slot recess incl. 25 mm shim space (S) + 50 mm block (I).
  - Plan width = sill depth + 51 mm (S).
  - Floor sloped ≥ 6 % outward (I), open-faced to the exterior (S).
  - Level tolerance for the bearing ±1 mm after shimming (S).
- **Interior finish strip:**
  - **No hempcrete topping and no wood within 610 mm of the interior side of the sill** (S, MAR-ULS; hempcrete classed as moisture-sensitive [I]).
  - Use a 610 mm (S) wide concrete, stone or porcelain strip at FFL.
  - Stop the hempcrete at a sealed edge profile (I).
  - FFL fixed and marked at the opening before the slab pour (S, LOE-INST/MAR-ULS).
- **Edge insulation:** slab-edge XPS ≥ 75 mm (07 D7) continued around the slot's inner face to the thermal block (T5) [I]. Under-slab insulation to RSI 2.45 (S, 07).
- **Barrier continuity:**
  - 0.25 mm soil-gas poly (07 D8) turned up and sealed at the slot.
  - Pan membrane lapped onto it (T7).
  - Slab-perimeter flexible sealant to the frame (07 D10) [I].
- **In-floor heating** within ≈ 1 m of the sill if possible (S, Marvin "should be considered").
- **Chloride-free** concrete/grout around the track (S).

### 6.2 Exterior paving, drain and landscape (08 H/J must change)

- **Pavers reach the wall** at the door (conflict C2 with 08 H, which started at d +0.70 m).
- **Levels:**
  - Grate and first paver at **FFL − 8 mm** (I).
  - **2 %** fall away (S).
  - No cross-fall on the landing (S, GG47: single fall direction).
- **Landing:** level, firm landing in front of the door ≥ 1500 × 1500 mm (I; B651 manoeuvring space not re-read this session).
- **Zones:**
  - 0–1.0 m: pavers on a liner/sub-slab draining to the channel (I).
  - Beyond 1.0 m: permeable PICP (08 H) with subgrade falling away (08 H2).
- **Channel:** 150 mm wide, heel-safe ≤ 13 mm openings (S), dirt screen (S), outlet to the 08 J solid pipe at ≥ 1 % (S), cleanout at the end (S). Not into the perimeter foundation drain (08 J principle).
- **Shrub:**
  - Keep the shrub's drip line and leaf fall clear of the channel. A canopy edge ≥ 1.5 m from the door (I) reduces leaf load.
  - Mulch and soil must not wash onto the landing: the bed falls away and has a kerb (S, 08 H10/GG47 edgings).
- **Gutter** at the eave mandatory (06, 08 J).

### 6.3 Foundation

- Continuous **grade beam or stem** under the opening, carrying the sill across the full width (S) at ±1 mm (S).
- Underside of footing ≥ 450 mm below exterior grade (S, frost).
- Stem top **lowered** across the opening to ≈ −180 below FFL (I). The +300 plinth of 06 A stops at the jambs and turns down with an end-dammed flashing return (conflict C1).
- Exterior insulation (T2) from footing to thermal block, without a gap under the channel haunch (I).
- The channel sits on its own haunch outside the insulation, never cast into the stem (I).
- Jamb posts and pocket walls bear on the foundation; lintel posts per engineer (I).

### 6.4 Roof / eave (06 B)

- The lintel replaces the wall line.
  - Blocking, spray-foam air tie and deck pre-strip as 06 B4–B8 (S).
  - Membrane H4 wraps the lintel face (I).
- Soffit underside ≤ 150 mm above the door-head trim (I).
- Head box for exterior shading, if used, integrated in the soffit (I).
- Gutter and leaf screen (08 J) mandatory.

### 6.5 Opaque wall at jambs

- Jamb WRB/membranes lap over the pan end dams and continue up to the head membrane (S principle; NRC-WWI).
- Wall air barrier sealed to the frame jamb (I).
- Cladding returns stop ≥ 6–10 mm from the frame with an open or backer-rod joint (06 A15b logic) (I).

---

## 7. East vs west — what changes

| aspect | **East** | **West** | tag |
|---|---|---|---|
| Wind-driven rain | Primary WDR direction in RDH Vancouver data (east ≈ 3 × south). Design the threshold for the full storm load | Not measured by RDH. BC Housing says storms come "from the south and sides" (conflict, 03) | (S, 03) |
| Water rating | Specify **260 Pa** (CMHC B3 250 Pa → NAFS step) | ≥ **180 Pa** code; 260 Pa preferred | (S/I) |
| Threshold | Performance-type sill / extra-deep pan; channel 150 mm | Same detail; 100–150 mm channel acceptable | (I) |
| Head | Head within 150 mm of soffit; head flashing | Same | (S rule) |
| Sun | Morning sun; overheating less critical; glare in the morning | **Low afternoon sun on the hottest part of the day** → overheating and glare; exterior **vertical shading or exterior blinds** (S, BC-B24-08: overhangs typically south, vertical shading east/west); lower-SHGC coating on west panes, keeping SHGC ≥ 0.28 to avoid darkening (S\*) | (S/S\*) |
| Overhang shading | Overhang depth 0.6 m shades 0.6 × tan(profile angle) of glass: 0.16 m at 15°, 0.35 m at 30°, 0.60 m at 45° (I). Full shade of a 2.7 m door needs a profile angle ≥ 77° (I) | Same geometry; afternoon profile angles are low → overhang ineffective | (I) |
| Materials ageing | Wetter: track/channel debris and algae; slower drying in the morning shade of the overhang [I] | **UV and heat:** gasket and sealant ageing faster; dark frames expand more → seal wear (I); exterior blind maintenance | (I) |
| Drying | East walls dried better than north/west-shaded in West Vancouver monitoring (S, 03 Atwal) | Unshaded west dries well; tree-shaded west ≈ north (S, 03) | (S) |

---

## 8. Variant W4: fixed glazing sill over stepped-down pavers

The first release also ships a **fixed glazed window wall (no door)** whose sill meets paving that is **stepped down**, not flush (architect, decided).

### 8.1 Sill height above the exterior paving

| source | requirement | value |
|---|---|---|
| VBBL 9.15.4.6 (via 01) | Foundation walls ≥ 150 mm above finished ground | **150 mm** (S) |
| VBBL 9.27.2.4 (via 01) | Moisture-sensitive cladding ≥ 200 mm above finished ground (also the 06 base) | **200 mm** (S) |
| CMHC-BPG Detail 3 | Door sills "whenever possible" 200 mm above the drainage surface | **200 mm** (S) |
| German FDR 4.4 | Standard upstand of door/opening connections 150 mm above surfacing | **150 mm** (S) |
| German splash zone (03 Caparol) | 0–300 mm above ground is the splash zone | **300 mm** (S) |
| 06 decision A | Foundation top +300 above grade | **300 mm** (I in 06) |

**Recommendation:**
- **Minimum 150 mm** (S, code floor and FDR) from paving to the underside of the sub-sill flashing.
- **Preferred 200–300 mm** (I) so the frame and glass bottom are out of the splash zone and the 06 plinth line continues unbroken.
- Fixed glazing has no accessibility constraint, so there is no reason to go lower [I].

**Two layouts:**
- **(a) Paving stepped down, interior floor unchanged.** The curb is the exposed plinth. If the step sits beside the accessible landing or route and drops 75–600 mm, add **≥ 100 mm edge protection** (S, B651 8.2.5 via 08 H10) or a planted/gravel strip between them (I).
- **(b) Raised interior sill (window seat).** The paving can then stay closer to the door level.

### 8.2 Layer table W4 (construction order; datum: FFL = 0, paving at −200 (I))

| # | component | material | dimensions | source |
|---|---|---|---|---|
| W1 | Footing + stem / curb | Cast concrete, monolithic with the foundation | Footing ≥ 450 below grade (S); curb top at **FFL −20 to 0** (I); exposed curb face 150–300 mm above paving (S/I) | 06 A; §8.1 |
| W2 | Exterior insulation on the curb and stem | XPS or mineral-wool board, protected | **≥ 75 mm** (I, = 07 D7) from footing to the underside of the sill flashing; finished with parging on lath (≥ 12 mm, 08/07) or a fibre-cement/metal board (I) | 07; 08 |
| W3 | Under-slab, slab-edge insulation, soil-gas poly | per 07 D | Poly turned up and sealed to the curb's inner face (S, 07) | 07 D8 |
| W4 | Thermal-break block / sill support | High-density PUR (Purenit/Phonotherm) or Compacfoam | 40–60 mm (I); top flush with the curb top; outer face aligned with W2 | PUR; TBS-CF |
| W5 | **Sill pan** | Self-adhered or liquid membrane, or rigid pan | Slope ≥ **6 %** to the exterior (S); back dam ≥ **25 mm** (I; ≥ 16 mm water head (S, 01); Loewen ½ in min (S)); end dams up jambs ≥ **150 mm** (S) | A440.4-98 via RDH-WPR; 01; NRC-WWI |
| W6 | Frame (fixed) | Same frame family as the door, fixed sash | Cascadia fixed bottom bf **81 mm**, Uf 0.74, **fRsi 0.80** (S); fixed-glazing threshold ψinstall 0.038 (Cascadia), 0.007 (Westeck), bottom fixed 0.006 (PH Tech) (S, EIFS walls) | PHI-CAS/WES/PHT |
| W7 | Air seal | Two sealant beads under the frame + tape/membrane from the frame's interior flange to the curb top (I) | Interior plane of airtightness (S, NRC-WWI) | — |
| W8 | **Sub-sill flashing over the curb** | Prefinished 24 ga steel or stainless (no aluminium on concrete (S, 06)) | Under the frame nose, over W2, slope ≥ 6 % (S), drip **≥ 5 mm** off the face below (S); 10–13 mm past the finish (S, 06 A11); end dams ≥ 25 mm (S); lap ≥ 10 mm over the board below (S), 75 mm preferred (S, CMHC-FL via 06) | 01; 06 A11 |
| W9 | Paving and splash strip | Pavers at −200 (I) on a base falling **2 %** away (S) | Gravel strip or pavers ≥ 300 mm wide (I, 06 A18) at the curb face; no channel needed (I) | 06; 08 |
| W10 | Safety glazing | Tempered/laminated if within 915 mm of the door and > 500 mm wide, or if it could be mistaken for an exit (S) | Manifestation or a curb ≥ 150 mm reads as "not a door" (I) | V2 9.6.1.4 |

### 8.3 Performance and differences from the sliding threshold

- **Water:** fixed glazing is a non-operable product. Its NAFS water rating is set by the same Table C-5 (≥ 180 Pa (S)) and is easier to exceed [I].
  - The sill sits ≥ 150 mm above the paving, so splash and standing water never reach the frame [I].
  - The sub-sill flashing sheds run-off clear of the curb with a drip (S, 03 drip study: unhemmed 45° kick-outs shed > 90 % within 1.2 m).
- **Air / thermal:**
  - The concrete curb carries the air barrier from frame to slab [S, 07].
  - The thermal line is W2 → W4 → frame.
  - Fixed-glazing frames are narrower (81 mm bottom) and warmer (fRsi 0.80) than the operable threshold (168 mm, 0.76) (S).
- **What differs from the sliding threshold:**
  1. No accessibility limit: the sill is high and the pan has a real 25 mm+ back dam and a 6 % slope (S/I).
  2. No recessed track, no slot in the slab, no trench drain.
  3. The curb face is exposed plinth: insulation and a durable finish are needed, as in 06 A16 / 07.
  4. Maintenance is low: clean the glass and the gravel strip; re-seal at 10–15 yr (S, 06).
  5. The paving step needs edge protection where it meets an accessible route (S).

---

## 9. Conflicts

| # | conflict | handling |
|---|---|---|
| C1 | 06 A sets the foundation top +300 above grade for wood framing and cladding clearance. A flush door needs the floor ≈ 8 mm above paving | The +300 plinth continues at the opaque wall and W4. At the door opening the stem drops; the jamb studs stay ≥ 150 mm above grade on concrete jamb piers (I); the plinth flashing returns with end dams at both jambs (I). **06 A must record the step-down.** |
| C2 | 08 H starts the paving at d +0.70 m behind a gravel strip and planting strip. Here pavers and a trench reach the frame | 08 H to add a "door landing" zone with a lined 1.0 m strip and channel (I). The paving agent decides finishes |
| C3 | Accessibility (≤ 13 mm, "level threshold through patio doors" (S, B651)) vs water (FDR 150/50 mm; CMHC 200 mm, accessible sills only in low exposure) | Drained threshold + trench (BRE-GG47, FDR "special construction") (S). The residual risk is clogging, so maintenance is part of the design [I] |
| C4 | VBBL 9.7.4.3.(1) points to "Table C-5 of Appendix C", which is not in VBBL 2025 Appendix C | Use BCBC 2018 Table C-5 Vancouver-region values (DP 960, PG20, 180 Pa); confirm with the City (Q1) |
| C5 | Code water 180 Pa (Table C-5) vs CMHC coastal recommendation B3 = 250 Pa (2001) | Specify 260 Pa on the east, ≥ 180 Pa west |
| C6 | LW doors allowed when accessible or sheltered (VBBL 9.7.4.2.(2)) vs CMHC preferring storm doors/overhangs; LW not available for sliding doors (S\*) | Lift-and-slide must carry a numeric rating; a bifold could use LW only under (b)/(c) |
| C7 | Header deflection limits: 3 mm (Marvin, Loewen) (S) vs 1/4 in, L/720 or 9 mm cap (Pella, NanaWall, Quickslide) (S\*) | Design to 3 mm (strictest) |
| C8 | Floor agent's hempcrete topping vs Marvin's ≥ 610 mm moisture-sensitive-floor clearance | Non-hygroscopic 610 mm strip (T20) |
| C9 | Loewen's "common" triple U 1.53 W/(m²·K) vs VBBL 1.44/1.22 | Require PH-grade glazing package or choose a certified product |
| C10 | UBC-FEN: triple "15 % higher" in text vs 19.8 % from its own figures | Use the figures (121.20 / 145.22) |
| C11 | WDR direction east (RDH) vs south and sides (BC Housing) (03) | Both orientations get the full drained threshold; east gets the higher rating |
| C12 | Hem vs no hem (06 A.6) | W4 sub-sill drip unhemmed 45° (06 decision); head flashing per roofing practice |

## 10. Open questions

1. **City of Vancouver position on Table C-5** (dangling VBBL reference). Does the City accept the BCBC 2018 Table C-5 values, or require a CSA A440S1 calculation (A440S1 Table A.1 DRWP per 9.7.4.3.(2))?
2. **Building classification.** Part 9 house (3.8 exempt, Part 10 house table) vs Part 3 public building (3.8.3.6.(5) threshold mandatory; 10.2.1.2 ASHRAE/NECB fenestration values not read). This decides whether ≤ 13 mm is code or benchmark.
3. **Rated water performance of recessed/flush sills.** Cascadia, Westeck, Loewen, Euroline, Optimum and Lepage do not publish NAFS water values for flush configurations. Ask each for the NAFS label of the **installed** sill type.
4. **Linear thermal transmittance (ψ) of a flush threshold at slab-on-grade** with the T2/T5/T9 alignment. Only EIFS-wall ψinstall values (0.007–0.038) were found. Model in THERM/Flixo.
5. **CSA A440.4 (current) and FGIA/AAMA 2400/2410** were not read; the pan clauses rely on A440.4-98 as quoted by RDH and on manufacturer guides.
6. **Trench-drain product and grate** (heel-safe, ≤ 13 mm, load class for pedestrians), and whether the City counts the channel discharge as "directed water" under the rainwater rules (08 J).
7. **BC electricity emission factor** for the triple-glazing carbon payback (not verified this session).
8. **Lintel design:** span, roof loads and creep for ≤ 3 mm. Steel vs glulam decision by the structural engineer.
9. **Operating force** of manual lift-and-slide handles vs B651 4.2. A motorised lift may be needed where accessibility applies.
10. **Bird-friendly glazing** (City of Vancouver Bird Strategy) for a large clear glass wall near a shrub was not researched.
11. **BC Housing *Building Enclosure Design Guide*** and RDH/FPInnovations overhang report (paywalled/unreached) may hold BC-specific door-sill details and overhang reduction factors.

## Tally (approximate)

Numbers tagged in §1–§8: about 150 (S), 25 (S\*) and 95 (I). The threshold geometry (§3.1) is mostly inferred, because no Canadian document gives a full flush-threshold section. Its limits (13 mm, 1:2, 2 %, 6 %, 150 mm end dams, 67 mm recess, 1 mm level, 3 mm deflection, 610 mm floor clearance) are all sourced.
