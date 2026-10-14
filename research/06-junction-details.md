# 06 — Junction details: base of wall, eave, freestanding bench (Vancouver, Part 9)

Researched: 2026-10-13. Purpose: replace the hand-invented junctions that the reviewing architect rejected with junctions resolved from published, citable sources.

The three failures being fixed:
1. The base flashing floated: it had no support, no fastening and no lap over the sill/foundation joint.
2. The bench posts were buried in topsoil.
3. The eave (cladding top / soffit / roof edge) was not detailed.

## 0. How to read this file

- **Marking.** Every number carries a tag:
  - **[S]** = sourced. The source key follows in the same row (see §0.2).
  - **[I]** = inferred. This is my judgment, and the reason is given in the row or note.
  - "(analogy)" means a sourced rule written for a different element (for example decks) and applied here by analogy.
- **Datums for drawing.**
  - Vertical: **0 = finished grade at the wall face** (top of the gravel strip). Up is positive.
  - Horizontal at the base of wall: **0 = exterior face of the concrete foundation**. Outward is positive.
- **Construction order.** Each table is ordered so that a layer never appears before the layer it laps onto or is fastened to. This keeps it consistent with the sequence in `03-assembly-climate.md` §3.
- **Code edition.** VBBL 2025 is the governing code (01). The vancouver.ca PDF returned HTTP 403 to my fetcher this session.
  - VBBL 2025 values are therefore taken from the approved `01-codes-standards.md` entries (cited as `VBBL25 x.x.x via 01`).
  - Clauses that 01 does not cover were read in **VBBL 2019** on free.bcpublications.ca (cited as `VBBL19`), or in BCBC 2018/2024 as quoted in Building Code Appeal Board decisions.
  - Each such clause is flagged "2025 text not re-verified".

### 0.1 Decisions in one place

| Junction | Decision | Basis |
|---|---|---|
| A | Foundation top **+300 mm** above grade. This gives room for a 75 mm flashing lap over the sill joint while keeping the cladding and stucco ≥200 mm above grade. | [I] built from sourced minimums: VBBL 9.15.4.6 (≥150), 9.28.1.4 (≥200), CMHC-FL Detail 2.17 (≥75 lap). |
| A | **Base flashing: one continuous 24 ga (0.61 mm) prefinished galvanized steel or stainless piece.** Top edge mechanically fastened at ≤300 mm o.c. through the sheathing into the sill plate. Vertical leg runs down over the sill/foundation joint to 75 mm below the top of the foundation, then a sloped leg (≥6 %) runs out under the cavity and cladding to ≥10–13 mm past the cladding face. Ends in a 45° kick-out drip. Sheathing membrane is shingle-lapped over the upstand (≥50 mm). | VBBL 9.27.3.7/9.27.3.8(4); CMHC-FL 2.15/2.17 and ch. 1; BCH-DECKS |
| A | Cavity bottom: 19 mm pressure-treated strapping cavity. Perforated metal insect screen at the bottom. Cladding held 6–10 mm above the flashing, with the gap left open (never caulked). | VBBL 9.27.2.2/9.27.5.3; CMHC-BPG ST-3 and Table 7.1; JH; CC-2026 |
| A | Sill: closed-cell sill gasket plus a 38×140 PT sill plate, flush with the foundation face. Anchor bolts ≥12.7 mm, embedded ≥100 mm, at ≤2.4 m o.c. (check Table 9.23.6.1 for Vancouver Sa). | CMHC-BPG Detail 2; VBBL19 9.23.6.1/9.23.7.2 |
| B | **Use an exterior-insulated (conventional, unvented) low-slope roof, not a vented joist roof.** BC Housing/RDH report frequent mould and decay in vented low-slope wood roofs in coastal BC. | BCH-BI21 |
| B | Joists cantilever 600 mm (≤600 for 38×235, by analogy). Full-depth blocking at the wall line, caulked on 4 sides in every bay: this is the air-barrier transfer and the fire block. Insulation infill outboard of the blocking. | VBBL19 9.23.9.9 (analogy); BCH-BI21 Fig. 10; BCBC 9.10.16.1(3) |
| B | Roof edge: wood blocking (nailer) → base sheet ≥50.8 mm down the face → metal edge flashing (flange ≥100, drop ≥50, hemmed drip ≥12 mm off the face, fasteners ≤203 mm o.c. in 2 staggered rows) → membrane strip-in ≥101.6 mm. Slope ≥2 % toward the eave. Gutter on the fascia. | RCABC-MET, RCABC-P13, RCABC slope |
| B | **Cavity top: closed off from the soffit space** (code), **vented to outside air** through a screened slot just below the soffit trim. The top of the wall is the best-sheltered zone (within O/4 = 150 mm of the eave). | VBBL25 9.27.2.2(3); Ge & Ye 2007 (via 03); CMHC-BPG Detail 4 |
| C | **No buried posts.** Each post stands on a cast-in concrete pier. Pier bottom ≥450 mm below grade (Vancouver frost depth); pier top ≥152 mm above grade. Simpson ABU44Z-type post base gives a **25 mm standoff**. | VBBL19 1.1.3.2; BCH-DECKS; SST |
| C | **Posts change from 45×45 to 90×90 (nominal 4×4).** The smallest catalogued standoff base is for a 3-9/16" (90 mm) post. Stainless anchors and bolts for oak. The bench frame must be self-bracing, because post bases do not resist rotation. | SST p. 76–77 |
| C | The bench sits 400 mm out, which straddles the 600 mm roof drip line. Either a gutter is mandatory or the bench moves beyond the drip line. | [I] geometry |

### 0.2 Source keys

| Key | Full citation | URL | Access this session |
|---|---|---|---|
| VBBL25 … via 01 | City of Vancouver, *Vancouver Building By-law 2025*, Book I Vol. 2 (Part 9), convenience copy v3.00 | https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf | 403 this session. Values come from approved `01-codes-standards.md` entries. |
| VBBL19 | City of Vancouver, *Vancouver Building By-law 2019*, Div. B. Sections read: 1.1 (doc 660342260), 9.12 (1995615990), 9.19 (1359519600), 9.23 (cached), 9.27 (cached), 9.28 (812754310) | https://free.bcpublications.ca/civix/document/id/public/vbbl2019/{doc id} | Read (pdftotext). 2025 wording not re-verified. |
| BCAB-1985 | BC Building Code Appeal Board, Decision 1985, "Requirement for fire blocks in an exterior wall assembly". Quotes **BCBC 2024** 9.10.16.2(1)–(2). | https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/building-code-appeal-board/building-code-appeal-board-decisions/bcab-1985 | Read |
| BCAB-1893 | BCAB Decision 1893, "Required fire blocking". Quotes **BCBC 2018** 9.10.16.1(1),(3). | …/bcab-1893 | Read |
| CMHC-BPG | CMHC, *Wood-Frame Envelopes in the Coastal Climate of British Columbia — Best Practice Guide, Building Technology*, rev. ed. 2001 (Cat. NH15-303/2001E; 1st ed. 1999) | Official 1999 PDF: https://publications.gc.ca/collections/collection_2016/schl-cmhc/NH15-303-1999-eng.pdf · 2001 copy read: https://w.tboake.com/guides/BC_wood.pdf | Text read. **The detail drawings are raster images, so their dimension callouts could not be read.** |
| CMHC-FL | Malhotra, A., CMHC, *Best Practice Guide — Building Technology: Flashings*, 1998 (reprinted 2001), Cat. NH15-132/2-1997E | Record: https://publications.gc.ca/site/eng/9.825779/publication.html · copy read: https://w.tboake.com/guides/Flashing.pdf | Text read. Drawings are images. |
| BCH-BI21 | BC Housing / RDH Building Science, *Builder Insight No. 21: Retrofit and Renewal of Low-Slope Vented Wood-Frame Roofs*, © 2025 | https://www.bchousing.org/sites/default/files/media/documents/Builder-Insight-No21-Retrofit-and-Renewal-of-Low-Slope-Vented-Wood-Frame-Roofs.pdf | Read in full |
| BCH-DECKS | BC Housing / RDH, *Illustrated Guide for Building Safe and Durable Wood Decks and Balconies* (c. 2017; cites BCBC 2012) | https://www.bchousing.org/publications/IG-Building-Safe-Durable-Decks-Balconies.pdf | Read |
| BCH-SFD | Horizon Engineering & RDH for BC Housing, *A Builder's Guide to Site and Foundation Drainage — Best Practices for Part 9 Buildings*, **DRAFT** 5 Dec 2017 | https://bcbec.com/wp-content/uploads/2018/11/114-3652-Site-And-Foundation-Drainage-Guide-20171205-R2.pdf | Read. The final edition (research-library.bchousing.org item 8687) failed with a TLS error. |
| BCH-EE4 | BC Housing / HPO, *Illustrated Guide — Energy Efficiency Requirements for Houses in BC, Climate Zone 4* (BCBC 2012 s. 9.36). States that it excludes the City of Vancouver. | https://www.bchousing.org/publications/IG-Energy-Efficiency-Houses-Climate-Zone-4-LowerMainland.pdf | Read |
| BCH-MM02 | BC Housing, *Maintenance Matters No. 2: Maintaining Your Roof* | https://www.bchousing.org/publications/Maintenance-Matters-02-Maintaining-Your-Roof.pdf | Read |
| RCABC-P13 | RCABC *Roofing Practices Manual*, Part 13 Linear Metal Flashing (SBS template) | https://rpm.rcabc.org/index.php?title=Template%3APart_13_-_SBS | Read (2026-10-13) |
| RCABC-MET | RCABC RPM Construction Detail "SBS Metal Edge Termination" (Part 10, Art. 10.3.4.2) | https://rpm.rcabc.org/index.php?title=SBS_Metal_Edge_Termination | Read |
| RCABC-SLOPE | RCABC RPM, SBS Roof Systems Standard and Roof Decks pages (minimum slope) | https://rpm.rcabc.org/index.php/SBS_Roof_Systems_Standard ; https://rpm.rcabc.org/index.php/Roof_Decks | Search-result extracts only |
| SST | Simpson Strong-Tie, *Wood Construction Connectors* catalog C-C-2026, pp. 76–77, "ABA/ABU/ABW Adjustable and Standoff Post Bases" | https://www.buildsite.com/pdf/simpsonstrongtie/ABAABUABW-Adjustable-and-Standoff-Post-Bases-Product-Data-2970078.pdf | Read |
| JH | James Hardie, *HardiePanel Vertical Siding HZ10 Installation Instructions* HS1236, effective Dec 2019 (**US document**, Florida approval FL13223) | https://floridabuilding.org/upload/PR_Instl_Docs/FL13223_R7_II_HardiePanel%20HZ10%20Install-Instr_stamp.pdf | Read. Some fraction glyphs were garbled. No Canadian edition was found. |
| CC-2026 | Vadeboncoeur, G. & Attar, M. (WSP), "Guardians of the gap: The crucial role of insect screens", *Construction Canada*, 10 Feb 2026 | https://www.constructioncanada.net/guardians-of-the-gap-the-crucial-role-of-insect-screens/ | Read |
| IRC | ICC *International Residential Code*, R703.7.2.1 Weep screeds (US) | (search extracts: buildingcodetrainer.com; revisor.mn.gov) | Search extracts only. Reference, not applicable in Vancouver. |
| 03:… | Entries in `03-assembly-climate.md` (Ge & Ye 2007; Smegal & Trainor 2015; Hubbs & Hircock 2003; BC Housing MM01/MM08; ECCC normals) | see 03 | Reused |
| DL-UK | Detail Library (UK) public product pages: DL371, DL170, DL174, DL175, PHT12, PHT47, DL464, TW3 | https://detail-library.co.uk/ | Descriptions only (drawings paywalled) |

### 0.3 Documents I could not access (not cited for numbers)

- **BC Housing, *Building Envelope Guide for Houses — Part 9 Residential Construction*, 2nd ed. 2020.** Sold through Crown Publications (crownpub.bc.ca 7680003600 / 7630002069). No free PDF was found. This is the most directly relevant source for BC house base-of-wall and eave details.
- **BC Housing / RDH, *Building Enclosure Design Guide — Wood-Frame MURBs*, 2nd ed. 2020.** Paywalled.
- **BC Housing, *Illustrated Guide: Insulated Wood-Frame Vaulted and Flat Roofs* (2024).** The PDF exceeds my 10 MB fetch limit. It is cited by BCH-BI21 for flat-roof/eave details.
- **BC Housing, *Illustrated Guide: R22+ Effective Walls* (2017/2024).** 15 MB, and the vancouver.ca copy returned 403.
- **VBBL 2025 Vol. 1/Vol. 2 PDFs** (403 this session) and **BCBC 2024** (no free text; see 01 U1).
- **City of Vancouver Bulletin 2009-009 (rainscreen).** 403. I used 01's entry `req.cob-rainscreen-bulletin`.
- **USDA *Wood Handbook* ch. 14 (decay resistance of oak heartwood).** The fpl.fs.usda.gov links redirect away. The oak durability claim is therefore **inferred**.
- **Canadian HardiePanel installation guide.** Not found. Only the US HZ10 edition was read.

A note on the CMHC-BPG drawings: I attempted to view the drawings in the Browser pane. The host served the PDF as a download, which put a save dialog in front of the user. I did not retry, and I stopped using the Browser pane once I saw it was in use.

### 0.4 Consistency with approved research (01, 03): agreements and contradictions

| # | Existing entry | This file | Status |
|---|---|---|---|
| 1 | 01 `req.cavity-interruptions-and-top`: VBBL25 9.27.2.2(3) says the cavity must not connect to concealed spaces in a projection such as a soffit. | CMHC-BPG Detail 5 (p. 6-18, 2001) says the opposite: "Connecting the wall cavity to the soffit space … provides increased drying potential." | **Conflict between sources.** The by-law governs, so 01 is right. The CMHC 2001 advice is superseded. BCBC 2018 9.10.16.1(3) also requires fire blocks at vertical/horizontal concealed-space interconnections where FSR > 25 (BCAB-1893). |
| 2 | 01 / 03: wood must be ≥150 mm above ground, or separated from concrete (VBBL 9.23.2.3, 9.3.2.9). | CMHC-BPG p. 3-12 keeps wood components ≥200 mm above finished ground. BCH-SFD §3.3 (draft) gives ≥200 mm (8") from grade to the top of the foundation / start of framing. | Not a contradiction: the guides are stricter than the code. The design adopts **+300 mm**. |
| 3 | 01 `req.flashing-geometry`: lap ≥10 mm over the element below; drip ≥5 mm. | CMHC-FL Detail 2.17: starter/flashing ≥75 mm below the top of the foundation. CMHC-FL p. 1-13: drip ≥10 mm. RCABC-P13: drip ≥12 mm. BCH-DECKS: 13 mm gap plus a 45° drip. | Guides are stricter. The design meets all of them. |
| 4 | 03 `ev.assembly.drip-edge-lab` (Smegal & Trainor 2015): hems wick water back, so unhemmed 45° kick-outs shed best. | RCABC-P13 3.2(2)(a): **all** linear metal flashings must be hemmed. | **Conflict.** Roof edge: follow RCABC (hemmed; needed for clip engagement and the guarantee). Wall base: unhemmed 45° kick-out [I], see A.6. |
| 5 | 01 `req.flashing-material-min`: galvanized steel ≥0.33 mm. | RCABC-P13 2.1: ≥0.50 mm (26 ga) for roof flashings, 24 ga for the 15-year guarantee. BCH-DECKS: 24 ga recommended to resist surface-tension wicking. | Code minimum vs guide. The design uses 24 ga (0.61 mm). |
| 6 | 01 `req.furring-size`: ≥19×38 mm. No treatment is stated. | CMHC-BPG ST-3 (p. 5-11) and Table 7.1 (p. 7-3): strapping in a vented cavity should be **pressure-treated**. | Addition, not a contradiction. Add "PT" to the strapping. |
| 7 | 03 §3 step 6: "Sill separation (DPC / sill gasket) **or** PT sill." | CMHC-BPG Detail 2 (p. 6-6): sill gasket **and** PT bottom plate. | Minor. The design uses both. |
| 8 | 01 U4: clearance of non-moisture-sensitive cladding to grade is unknown. | JH (US) defers to the local code for grade and gives min. 1 in. to slabs, paths and steps. | Partly answers U4. The design keeps 200 mm anyway. |
| 9 | 01: frost depth not covered. | VBBL19 1.1.3.2(1): "Depth of frost penetration shall be no less than 450 mm." | New. **2025 text not re-verified.** |
| 10 | 03 `ev.assembly.overhang-code-quarter-rule`: a 600 mm overhang fully shelters only the top 150 mm. | Used to justify venting the cavity top (B) and to show the base (A) gets no shelter. | Consistent. |
| 11 | 01 `req.seating-no-code`: no code governs a façade bench. | C uses deck rules (BCH-DECKS, VBBL 9.12.2.2(7), 9.23.6.2) by analogy only. | Consistent. Every analogy is flagged. |

---

## A. Base of wall (foundation → sill → sheathing → flashing → cavity → cladding → grade)

### A.1 Geometry baseline for drawing

| Point | Height (mm, 0 = grade at wall face) | Status |
|---|---|---|
| Top of gravel strip at wall face (finished ground) | 0 | [I] Treated as "finished ground". Code definition open (01 U3). |
| Underside of footing | ≤ −450 (soil-dependent; −1200 in clay) | [S] VBBL19 1.1.3.2, Table 9.12.2.2 |
| Top of foundation wall | +300 | [I] Satisfies ≥150 [S] VBBL25 9.15.4.6 and ≥200 [S] BCH-SFD §3.3 / CMHC-BPG p. 3-12, with room for the 75 mm lap |
| Sill plate | +303 to +341 (gasket ≈3 mm compressed) | [I] |
| Flashing top edge (behind membrane) | +360 | [I] |
| Flashing fasteners | ≈+325 (into sill plate) | [I] |
| Bottom edge of sheathing membrane over flashing | ≈+240 | [I] |
| Flashing bend (vertical leg → sloped leg) | +225 (= 75 mm below top of foundation) | [S] lap 75 mm, CMHC-FL 2.17 |
| Flashing drip edge | ≈+205 | [I] |
| Bottom of cladding | +231 (fibre-cement, 6 mm gap) / +235 (stucco or render, 10 mm gap) | [I]; ≥200 [S] VBBL25 9.28.1.4 / 9.27.2.4 |

| Horizontal (mm, 0 = foundation exterior face) | Value | Status |
|---|---|---|
| Sill plate exterior face | 0 (flush) | [I] |
| Sheathing | 0 → +12 | [S] user assembly |
| Sheathing membrane | +12 → ≈+13 | [I] |
| Rainscreen cavity (PT strapping) | +13 → +32 (19 mm) | [S] VBBL 9.27.5.3; CMHC-BPG ST-3 |
| Cladding outer face | stucco ≈+57 (22 mm stucco + 3 mm backing/lath) · fibre-cement ≈+40 · board + render ≈+54 | [S] 22 mm stucco: CMHC-BPG ST-3 · others [I] |
| Flashing sloped-leg nose | cladding face + 10 to 13 | [S] ≥10 CMHC-FL p. 1-13; 13 BCH-DECKS |
| Drip kick-out | 45°, ≈5 mm further out | [S] angle: BCH-DECKS; [I] length |

### A.2 Ordered layer table (construction order)

| # | Component | Material | Dimensions / laps / slopes / gaps | Support and fastening | Source |
|---|---|---|---|---|---|
| A1 | Strip footing | Cast-in-place concrete | 550×250 (given). Underside ≥450 mm below finished grade [S] in coarse or silt soil with no heated-space credit. Clay: ≥1.2 m [S]. Unreinforced footing f'c ≥15 MPa [S]. | On undisturbed soil [S] | VBBL19 1.1.3.2(1); VBBL19 9.12.2.1, Table 9.12.2.2 (insulated-slab foundations take the "no heated space" column, 9.12.2.2(2)); VBBL25 9.3.1.6 via 01 |
| A2 | Capillary break, footing → wall | Liquid or sheet damp-proofing / waterproofing on top of footing, with keyway | Continuous across the wall footprint. No thickness given. | Applied before the wall pour | BCH-SFD §3.2 (draft) |
| A3 | Foundation wall | Cast-in-place concrete, 200 mm (given) | Top at +300 [I] (≥150 [S]). Form-tie holes sealed. | — | VBBL25 9.15.4.6 via 01; VBBL19 9.13.2.4(5) |
| A4 | Damp-proofing (below grade) | Bituminous or listed damp-proofing | From finished ground down to top of footing | Over sealed concrete | VBBL25 9.13.2.1 via 01 |
| A5 | Foundation drain | Perforated rigid PVC pipe in clear crushed stone | Pipe ≥100 mm Ø [S]. ≥150 mm granular cover [S]. Invert ≥300 mm (12") below top of interior slab [S]. Perforations facing down [S]. | On undisturbed or compacted soil | VBBL 9.14.3 via 01 (2019 values); BCH-SFD §5 (draft) |
| A6 | Under-slab system (context) | Clear crushed gravel 19–25 mm, 0 % passing #4 [S]; 50 mm rigid insulation (given); poly sealed to foundation [S]; 100 mm slab (given) | Gravel ≥150 mm best practice [S] (code min 100 mm for the radon layer [S]). **Slab-edge thermal break** [S] (option shown in BCH-EE4); thickness 25–50 mm [I]. | Slab air barrier sealed to foundation wall [S] | BCH-SFD §4 (draft); VBBL19 9.13.4.3(3)(a); BCH-EE4 pp. 9–12 |
| A7 | Sill gasket | Closed-cell foam sill gasket, full plate width | ≈6 mm uncompressed [I] | Clamped by the sill plate | CMHC-BPG Detail 2 text p. 6-6 (retards moisture rising from concrete; forms the air seal). VBBL 9.23.2.3 separation is not required at ≥150 mm above ground [S], but the gasket provides it anyway. |
| A8 | Sill (bottom) plate | 38×140 **pressure-treated** | Exterior face flush with foundation face [I] | Anchor bolts ≥12.7 mm Ø [S], ≤2.4 m o.c. [S] (or Table 9.23.6.1 where 0.70 < Sa(0.2) ≤ 1.8: two bolts per braced panel, within 0.5 m of the ends [S]). Embedded ≥100 mm [S], nuts and washers [S]. Plate-to-foundation joint sealed (9.25.3) [S]. | CMHC-BPG p. 6-6; VBBL19 9.23.6.1(2),(4),(5); 9.23.7.2(2) |
| A9 | Studs and insulation | 38×140 studs, batts; 6 mil poly (SPA) | Stud spacing 400 o.c. [I]. Poly lapped and sealed to the bottom plate [I]. | — | CMHC-BPG ST-3 p. 5-11 (6 mil poly assembly) |
| A10 | Sheathing | 12 mm plywood / OSB (given) | **Bottom edge flush with the underside of the sill plate (+303); not in contact with concrete** [I]. Rationale: concrete wicks water into wood (CMHC-BPG Detail 1, p. 6-4). | Nailed to plate and studs | [I] with CMHC principle |
| A11 | **Base flashing** (the rejected element) | **24 ga (0.61 mm) prefinished galvanized steel**, or stainless if stucco is used. **No aluminium against stucco or concrete.** | **Upstand:** top edge +360 [I]; ≥50 mm upward inboard of the sheathing membrane [S]; 110 mm provided [I]. **Lap over the sill joint:** vertical leg continues down past the sill/foundation joint to 75 mm below top of foundation [S] (code min 10 mm [S]), standing 12 mm off the concrete [I]. The 75 mm lap exceeds the 16 mm wind-driven water head (DRWP 160 Pa / 10) [S]. **Sloped leg:** ≥6 % outward after frame shrinkage [S]; CMHC prefers much steeper ("2:1") where joints occur [S]. Projects 10–13 mm past the cladding face [S]. **Drip:** 45° kick-out [S], unhemmed [I] (A.6), drip ≥5 mm beyond the face below [S] (≈70 mm provided [I]). **Ends:** end dams ≥25 mm at openings and terminations [S] (DRWP/10 = 16 mm < 25 [S]). **Joints:** lapped ≥100 mm and sealed [S], or S-lock [S]. Lengths ≤2400 mm [S]. Continuous and mitred at corners [S]. | **Mechanically fastened at ≤300 mm o.c.** [S] with corrosion-resistant fasteners compatible with the metal [S]. Fasteners go through the upstand into sheathing and sill plate, above the joint, and are covered by the membrane lap [S]. Self-supporting: rigid metal leg of ≤75 mm. A membrane flashing would need continuous solid support [S]. | VBBL25 9.27.3.7 / 9.27.3.8(4) via 01; CMHC-FL Detail 2.15 (p. 2-40), 2.17 (p. 2-44), ch. 1 pp. 1-12–1-13; CMHC-BPG p. 7-8; BCH-DECKS p. 26 (24 ga, 45° drip) |
| A12 | Sheathing membrane (drainage plane) | CAN/CGSB-51.32 breather type: 1×60-min or 2×30-min paper, or housewrap | Horizontal laps ≥100 mm, shingled [S]. **Laps over the flashing upstand** [S], stopping short of the sloped leg (bottom edge ≈+240 [I]) **so it does not wick** [S]. Permeance 170–1400 ng/Pa·s·m² [S]. | Stapled/cap-nailed to sheathing [I] | VBBL25 9.27.3.2–9.27.3.6 via 01; CMHC-FL Detail 2.1 checklist (p. 2-3); CMHC-BPG p. 7-5–7-6 |
| A13 | Strapping (cavity formers) | 19×38 PT lumber, vertical | 19 mm cavity [S] (code min 9.5 mm [S]; Vancouver note 19 mm [S]). ≤600 o.c. [S], on studs (400 o.c. [I]). Furring ≤20 % of wall area [S]. **Bottom end stops 10 mm above the flashing's sloped leg** [I], so the strapping never sits in water. | Nailed or screwed through membrane and sheathing into studs [I] | VBBL25 9.27.2.2(1)(a), (2) via 01; VBBL19 9.27.5.3; CMHC-BPG ST-3 and Table 7.1 (PT strapping) |
| A14 | Insect screen at cavity bottom | Perforated stainless or aluminium "J"/"U" profile (not fibreglass) | Spans the full 19 mm cavity [I]. Open area ≥ the cavity's free area [I]. No aperture is published. | Fixed to the strapping bottoms before cladding [I]; must not block drainage [S] | CC-2026; CoV Bulletin 2009-009 via 01 ("vents screened") |
| A15a | **Cladding, conventional option 1: cement stucco rainscreen** | Backing paper on strapping; self-furred lath; 3-coat Portland-cement stucco | Total ≥15 mm (2 base coats ≥6 mm, finish ≥3 mm) [S]; CMHC assembly 22 mm [S]. Lath held ≥6 mm off backing [S], lapped ≥50 mm [S]. **Bottom stop:** galvanized or zinc casing bead/plaster stop (not aluminium), **≥10 mm above the flashing, left open** [I]. CMHC uses the flashing itself as the plaster guard [S]. | Lath nails ≥3.2 mm Ø, heads ≥11.1 mm [S], ≥25 mm into framing [S], so through the 19 mm strapping into studs [I]. Spacing ≤150 o.c. vertically × ≤400 horizontally (or 100 × 600) [S]. | VBBL19 9.28.3.2, 9.28.4.4–9.28.4.6, 9.28.6.2–9.28.6.5; VBBL25 9.28.1.5 via 01; CMHC-BPG pp. 3-11, 5-11; CMHC-FL 2.15 |
| A15b | **Cladding, conventional option 2: fibre-cement panel rainscreen** | 8 mm fibre-cement panel on the strapping | **¼" (≈6 mm) gap above flashing; do not caulk** [S]. Fasteners ⅜" (≈10 mm) from panel edges [S] and ≥2" (≈51 mm) from corners [S]. Min 1" (25 mm) to slabs, paths and steps [S]. Grade clearance "per local code" [S], so 200 mm is kept [I]. | Stainless fasteners recommended in very humid climates [S] | JH (US HZ10, 2019) Figs. 3, 4, 6 and fastening notes |
| A15c | Cladding as designed: **lime render on 12 mm cement board** (Part 5 route) | Cement board on strapping; lime render | Board bottom ≥10 mm above flashing [I]. Starter/base profile of PVC or stainless with drip [I]. | Professional design required | VBBL25 9.27.1.1(6) via 01 (unlisted cladding → Part 5) |
| A16 | Parging / finish on exposed foundation face (0 to +300) | Sand-cement parging or acrylic coating | ≈6–10 mm [I]. CMHC calls it "primarily aesthetic" [S]. Avoid vapour-tight coatings that would trap moisture in the concrete [I]. | Bonded to concrete | CMHC-BPG Detail 2 text p. 6-6 |
| A17 | Backfill and grading | Clean backfill within 600 mm | Slopes away **≥2 %** past the backfill zone [S]. The user's 2 % topsoil is consistent. No boulders >250 mm within 600 mm [S]. | Compacted so settlement does not reverse the slope [S] | BCH-SFD §2 (draft); VBBL 9.12.3 via 03 |
| A18 | Gravel strip | Clear washed stone (19–38 mm) [I] over geotextile [I] | 300 mm wide [I], 100–150 mm deep [I], top sloped away with grade [I] | — | [I]. No code or BC guide value was found (01 Gaps). The German 0–300 mm splash zone (03) is a height, not a width. |

### A.3 Performance (A)

#### A.3.1 Control-layer pen test (Lstiburek): trace each layer from wall into foundation

| Layer | Path through the junction | Transfer (lap / seal / overlap) | Break? |
|---|---|---|---|
| **Water-shedding surface** | Cladding face → bottom edge → open gap → flashing sloped leg → 45° drip → falls ≈70 mm clear of the foundation face → gravel strip | Cladding sits above the flashing with a 6–10 mm open gap [S/I] (A15). The flashing projects 10–13 mm past the cladding [S]. | None if the gap stays open. Caulking the gap turns it into a dam (JH: "do not caulk") [S]. |
| **Drainage plane / WRB** | Sheathing membrane → shingle lap over flashing upstand (≥50 mm [S]) → flashing vertical leg → sloped leg → out | Membrane laps **over** the flashing [S] and stops short of the sloped leg [S] | **The sill/foundation joint is covered by the flashing's vertical leg (75 mm below the joint) [S].** In the rejected version this was the break. |
| **Air barrier** (SPA) | Interior poly → sealed to bottom plate [I] → sill gasket (plate-to-concrete seal [S]) → concrete foundation wall (air barrier [S]) → slab, sealed to the foundation [S] | Sealant bead poly → plate [I]; gasket compression [S]; slab-edge sealant [S] | Anchor-bolt holes through the gasket: seal them [I]. EABA alternative: tape the sheathing joints and carry a self-adhered strip from the sheathing onto the concrete face [I]. |
| **Vapour control** | 6 mil poly on the warm side of the wall [S] → under-slab poly [S] | Poly lapped onto the bottom plate [I]. Slab poly turned up and sealed at the foundation [S]. | The concrete stem wall between the two polys is a vapour-open, wick-prone element. It dries outward through parging, which is why parging should stay permeable [I]. |
| **Thermal control** | Wall batts (between studs) → stop at the bottom plate. Slab: 50 mm insulation under the slab. | **Discontinuity**: the stem wall and sill plate carry heat from the slab edge to outside. Mitigate with a vertical slab-edge thermal break (option in BCH-EE4 [S]; 25–50 mm [I]), or exterior foundation insulation, which would change the flashing geometry [I]. | Yes: a linear thermal bridge at slab edge and sill. |

#### A.3.2 What each component does, and what fails if it is missing or reversed

| Component | Function | Failure if missing or reversed | Status |
|---|---|---|---|
| Footing capillary break (A2) | Stops rising damp from the wet footing into the wall | Damp stem wall, which feeds moisture to the sill | [S] BCH-SFD §3.2 |
| Foundation +300 above grade | Keeps framing and cladding out of the splash zone (03: splash zone 0–300 German convention) | Sill and sheathing get splash-wetting; wood decay | [S] code ≥150 / guide ≥200; [I] 300 |
| Sill gasket | Air seal; retards capillary rise from concrete | Air leakage at the sill (cold floor edge); wicking into the plate | [S] CMHC-BPG p. 6-6 |
| PT sill | Decay resistance at the wettest framing member | Decay of the bottom plate if the flashing or WRB ever fails | [S] CMHC-BPG p. 6-6 |
| Flashing upstand ≥50 mm behind WRB | Catches water draining down the WRB | **Reverse lap (flashing over WRB) sends water behind the flashing and into the sill joint** | [S] VBBL 9.27.3.8(4)(a); CMHC-FL 2.15 |
| Flashing vertical leg 75 mm over the joint | Covers the sill/foundation joint against wind-driven rain | **The rejected detail's "floating" flashing left the joint exposed**, so water entered the sill joint | [S] CMHC-FL 2.15/2.17 |
| Flashing fastening ≤300 mm o.c. | Holds the flashing tight to the sheathing | Flashing loosens and gaps open behind it; wind rattle | [S] CMHC-FL 2.15 |
| Slope ≥6 % | Drains the cavity bottom outward after frame shrinkage | **Flat or back-sloped flashing ponds** and feeds water to the sill through joints and fasteners | [S] VBBL 9.27.3.8(4)(b) |
| Drip / kick-out | Breaks surface tension so water falls clear | **No drip: water tracks back along the underside and streaks the foundation** (lab: no drip ≈ 1.0× runoff on the wall below) | [S] 03 ev.assembly.drip-edge-lab |
| End dams ≥25 mm | Stop water running off the flashing ends into the wall | Water dumps into the wall at corners and openings | [S] VBBL; CMHC-BPG p. 7-11 |
| WRB stopped short of the sloped leg | Prevents wicking | Paper sitting in water wicks it up behind the flashing | [S] CMHC-FL Detail 2.1 |
| 19 mm drained, vented cavity | Capillary break; drainage; ventilation drying | Water bridges gaps up to ~6 mm, so cladding wets the WRB; slow drying | [S] VBBL 9.27.2.2; 03 BSD-013, Ge & Ye |
| PT strapping | Strapping sits in an intermittently wet cavity | Strapping decay; cladding loosens | [S] CMHC-BPG Table 7.1 |
| Insect screen | Keeps insects and rodents out of the cavity while allowing drainage | Nests block the cavity; rodent access. Fibreglass screens get chewed. | [S] CC-2026 |
| Open gap: cladding ↔ flashing | Drainage outlet and bottom vent | **Caulked or mortared gap traps water in the cavity** | [S] JH; [I] stucco |
| No aluminium against stucco or concrete | Avoids alkali corrosion | Pitting and perforation of the flashing | [S] CMHC-FL 2.15; VBBL 9.28.1.5 |
| Grade ≥2 % away plus gravel | Removes surface water; reduces splash | Ponding at the foundation; splash-back onto the cladding bottom | [S] BCH-SFD; [I] gravel |

#### A.3.3 Moisture paths (Vancouver)

- **Arrives:**
  - Wind-driven rain on the wall. East is the primary direction in RDH data; BC Housing says south. The conflict is unresolved (03).
  - The base gets **no** overhang shelter: it is well below O/4 = 150 mm from the eave (03 quarter rule).
  - Water running down the cladding face.
  - Splash-back from the ground in the 0–300 mm zone (03, illustrative).
  - Rain that penetrates the cladding into the cavity.
  - Capillary rise from the footing and foundation.
  - Construction moisture in the framing.
  - Interior vapour and air leakage.
- **Drains:**
  - Cavity → flashing → drip → gravel → graded soil → perimeter drain.
  - Code design driving-rain pressure is 160 Pa, which is about 16 mm of water head (01). The 75 mm joint lap and 25 mm end dams exceed it.
- **Dries:**
  - Sheathing dries outward through the breather membrane (2–16 perm) into the ventilated cavity (CMHC-BPG p. 7-5).
  - Inward drying is limited by the poly.
  - Drying season is May–September; net wetting October–April (03).
  - Bottom plus top cavity vents dry faster than bottom-only (Ge & Ye 2007, via 03), so B vents the top.
  - The concrete plinth dries outward through permeable parging [I].
- **Capillary breaks, outside to in:**
  - Cladding-to-flashing gap 6–10 mm. Note: 6 mm is right at the ~6 mm bridging limit (03), so 10 mm is preferred [I].
  - 19 mm cavity.
  - Breather WRB.
  - Gasket / PE between sill and concrete.
  - Footing-to-wall membrane.

#### A.3.4 Thermal (A)

- **Linear thermal bridge at the slab edge, foundation top and sill:**
  - Wall batts stop at the bottom plate.
  - Under-slab insulation is horizontal.
  - The 200 mm concrete stem wall bypasses both.
  - Insulation is **not** continuous.
- **Remedy:**
  - Slab-edge thermal break, as in BCH-EE4 ("slab on grade at foundation wall with … insulation … with a thermal break at the slab") [S].
  - Or exterior foundation insulation [I].
  - Vancouver's own Part 10 energy requirements were not researched (open question).

#### A.3.5 Durability and ageing (A): timeline for the decades view

| Horizon | What degrades first | Maintenance | Status |
|---|---|---|---|
| 0–5 yr | Debris and soil fouling the gravel strip and insect screen. Stucco shrinkage hairlines. Algae and splash staining at the cladding bottom. Sealant at flashing laps: low-performance sealant fails in 2–5 yr; high-performance urethane/silicone lasts 10–15 yr. | Clear vegetation from the cladding annually (MM08 via 03). Inspect the rainscreen every other year. Sealant repairs every ~5 yr. | [S] CMHC-FL p. 1-14–1-15; CMHC-BPG ch. 9 p. 9-3; 03 |
| 5–15 yr | Grade settlement can reverse the slope (03). Stucco coating chalking. Prefinished flashing paint fading. Gravel strip silting (no data, 03 gap). | Re-grade and top up gravel [I]. Clean and recoat stucco at **10 yr** [S]. Clean cladding with non-pressurised water every 2–3 yr [S]. | CMHC-BPG Table 9.2 (p. 9-5); MM08 via 03 |
| 15–30 yr | Flashing finish and corrosion at cut edges. WRB near end of life. Sill decay **only if** the flashing or lap failed. | Base flashing and WRB renewed together with any cladding renewal [I]. Fasteners, lath, paper and flashing must last at least as long as the stucco [S]. | CMHC-BPG ST-3 durability note (p. 5-11) |

### A.4 Benchmark against UK Detail Library (completeness, not numbers)

Pages read: DL371 "Insulated Foundation Junction with Timber Frame Wall" (render; **Oct 2025 update: cavity barrier provision behind cladding**), DL174 "Passivhaus Raft Foundation Wind Tightness Detail" (membrane and tape), TW3 "Timber Frame Wall, Render Finish".

| UK provision | In our junction? | Applies in Vancouver? |
|---|---|---|
| Cavity barrier behind cladding at the base / plinth (DL371 Oct 2025) | Not as a fire item | **Mostly no.** BCBC 2024 9.10.16.2(2)(a) exempts a wall with not more than one concealed air space ≤25 mm thick (BCAB-1985), and our cavity is 19 mm. **Becomes yes** if the cavity exceeds 25 mm (e.g. 2×19 mm crossed strapping): then fire blocks are needed at ≤3 m vertical / ≤20 m horizontal (BCAB-1985). VBBL 2025 text not re-verified. |
| Insulated foundation / perimeter insulation (DL371) | Not in the user's assembly | **Yes, physically** (thermal bridge, A.3.4). The code route depends on VBBL Part 10, not researched. |
| Wind-tightness membrane and taped laps at the base (DL174) | Breather WRB laps; tapes not specified | Yes. Tape the WRB laps at the base if it doubles as the air barrier (EABA) [I]. |
| Render base bead / starter track for the render carrier board (implied by TW3/DL371 render series; drawings unseen) | Added as A15c starter profile | Yes for the lime-render-on-board route. Use PVC or stainless, not aluminium [I]. |
| DPC under the sole plate | Sill gasket (+ optional PE) | Yes; equivalent to A7. |
| Insect mesh at the cavity base | A14 | Yes. |

### A.5 Conflicts (A)

- **Lap over the element below:** 10 mm (VBBL) vs 75 mm (CMHC-FL 2.17). The design uses 75 mm.
- **Drip projection:** 5 mm (VBBL) vs 10 mm (CMHC-FL) vs 12 mm (RCABC) vs 13 mm (BCH-DECKS). The design uses 10–13 mm past the cladding, which is ≈70 mm past the foundation face.
- **Height of framing above grade:** 150 mm (VBBL) vs 200 mm (CMHC-BPG, BCH-SFD draft). The design uses 300 mm.
- **Galvanized flashing thickness:** 0.33 mm (VBBL) vs 0.61 mm (24 ga, BCH-DECKS). The design uses 0.61 mm.

### A.6 Hem or no hem at the wall-base drip

- **No hem:** Smegal & Trainor (03) show unhemmed 45° kick-outs shed >90 % of water.
- **Hem:** RCABC requires hems on roof flashings for stiffness and clip engagement.
- For the base of wall, at about knee height next to a bench, a sharp unhemmed edge is a minor hazard.
- **Recommendation [I]:** unhemmed 45° kick-out with deburred edge on the wall base. Hemmed per RCABC at the roof edge.

---

## B. Top of wall at the eave (top plates → joists → blocking → roof edge → fascia → soffit → cavity top)

### B.1 Roof type decision (governs every eave layer)

The given assembly (38×235 joists, sheathing + membrane, "flat-ish") would by default be a **vented joist roof** under VBBL 9.19. BC Housing / RDH (BCH-BI21) report the following for that roof type:

- Low-slope vented wood-frame roofs in coastal BC "even when built in conformance with the building code" show high occurrences of mould, staining and sometimes decay.
- Night-sky cooling condenses the humid **ventilation air itself** on the underside of the sheathing, "and adding more ventilation may actually exacerbate the problem".
- An exterior-insulated (conventional or protected-membrane) roof "is the most durable option".
- Unvented assemblies are permitted only when exterior-insulated.

**Decision: B-1 = exterior-insulated conventional roof (all insulation above the deck, unvented).** B-2, the code-prescriptive vented variant, is listed in B.2.2 for completeness and is flagged as high moisture risk.

### B.2 Ordered layer table — B-1 (recommended)

Overhang is measured from the **cladding face to the fascia face**, following CMHC-BPG p. 5-4.

| # | Component | Material | Dimensions / laps / slopes | Support and fastening | Source |
|---|---|---|---|---|---|
| B1 | Top plates | 2 × 38×140 | ≥2 top plates in load-bearing walls [S]. Joints staggered ≥ one stud spacing [S]. Lapped or tied at corners [S]. | Nailed per Table 9.23.3.4 | VBBL19 9.23.11.3–9.23.11.4 |
| B2 | Wall air barrier at top (SPA) | 6 mil poly carried over the top-plate underside [I] | Leave ≥150 mm free for tie-in [I] (BCH-BI21 Fig. 10 item 2 says "leave sufficient … polyethylene"; no number) | Sealed to the top plate with acoustical sealant [I] | BCH-BI21 Fig. 10 |
| B3 | Roof joists | 38×235 (given) | Spacing 400 o.c. [I]. End bearing ≥38 mm [S]. **Cantilever 600 mm** [S] (by analogy: the limit for 38×235 floor joists carrying roof loads is ≤600 mm, 9.23.9.9(1)). Slope ≥2 % toward the eave [S], made with tapered insulation (B9) [I]. | Toe-nailed to plate with 3 × 82 mm nails [S]. Galvanized uplift tie [I]. | VBBL19 9.23.14.3, Table 9.23.3.4, 9.23.9.9; RCABC-SLOPE (1:50 required for the SBS 15-yr guarantee, strongly recommended otherwise) |
| B4 | **Blocking at the wall line** | 38×235 full depth, between joists, over the top plate | Every joist bay [S] | Nailed to joists and plate. **Caulked on all 4 sides in every bay** [S]. Function 1: air-barrier transfer from wall to roof. Function 2: **fire block** separating the wall/roof concealed spaces from the soffit/overhang space. BCBC 2018 9.10.16.1(3) requires fire blocks at vertical/horizontal concealed-space interconnections where FSR > 25 [S], and larch/SPF exceed 25 [I]. Function 3: lateral restraint of joists [I]. | BCH-BI21 Fig. 10 item 3; BCAB-1893 |
| B5 | Air-barrier tie, poly → deck | Spray foam (closed-cell) in each bay, from the top-plate poly to the underside of the deck at the wall line | Continuous [S] | Applied after framing has dried and shrunk [S] | BCH-BI21 Fig. 10 item 5 |
| B6 | Thermal infill outboard of blocking | Mineral wool board or the same spray foam, in each overhang bay against the outer face of the blocking | ≈89 mm [I] | Friction-fit and foamed edges [I] | [I]. Closes the wall-line thermal gap (B.3.4). |
| B7 | Roof deck | Plywood sheathing | 16 mm [S] (CMHC roof assemblies use 16 mm). Continuous over wall line and overhang. | Nailed to joists | CMHC-BPG WM-2 / WS-3 (pp. 5-21–5-24) |
| B8 | Deck pre-strip at the perimeter | Self-adhered membrane strip | Extends **≥50 mm past the interior face of the wall** [S] | Adhered to the deck, primed | BCH-BI21 Fig. 10 item 1 |
| B9 | Air / vapour control layer on the deck | Self-adhered SBS base or 2 layers of asphalt-laminate paper | Full deck, laps per manufacturer | Adhered or mechanically fastened [I] | CMHC-BPG WM-2 (p. 5-24): "two layers asphalt laminate paper provide the vapour barrier" |
| B10 | Roof insulation (exterior) | Polyiso or rigid mineral wool, 2 layers, joints staggered, tapered for slope | CMHC example 2 × 50 mm polyiso, RSI 3.52 [S]. **Vancouver Part 10 target not researched**: 150–200 mm placeholder [I]. | Adhered or mechanically fastened to the deck [I] | CMHC-BPG WM-2; BCH-BI21 |
| B11 | Perimeter wood blocking (nailer) at the roof edge | PT lumber, built up to the insulation + cover board height | Width ≥ the metal flange of 100 mm [I] | Screwed through the deck into joists [I] | RCABC-MET item 2B ("wood blocking — required for conventionally insulated roofs") |
| B12 | Cover board | Fibreboard or gypsum cover board | 12 mm [S] | Adhered | CMHC-BPG WM-2; BCH-BI21 Fig. 2 |
| B13 | SBS base sheet | 2-ply SBS system, base ply | Turned over the outside edge and down the vertical face **≥50.8 mm**, or ≥50.8 mm past any cold joint [S] | Adhered | RCABC-MET item 3 |
| B14 | Sealant / mastic bed | Membrane-compatible mastic | Continuous under the metal flange [S] | — | RCABC-MET item 4 |
| B15 | **Metal edge (fascia) flashing** | Galvanized steel **≥0.50 mm (26 ga)** [S]; 24 ga for the 15-yr guarantee [S]. Prefinished. | Flange **≥100 mm** wide [S]. Vertical drop **≥50 mm** with **hemmed** drip [S]. Drip extends **≥12 mm** from the vertical face [S]. Design value: face covers the nailer and continues **≥100 mm below the top of the fascia** [S] (CMHC-FL 2.24; conflict B.6). Segments **≤3000 mm** [S]. Joints S-lock or standing seam [S], or concealed laps ≥100 mm in mastic [S]. Mitred outside corners closed with a "rat tail" [S]. | Fasteners **≤203.2 mm o.c. in 2 offset rows** on the top flange [S]. Screws penetrate ≥19 mm into the substrate [S]. If hidden clips are used: ≥24 ga, ≤75 mm from the bottom edge, engaging the drip ≥12 mm, fasteners ≤300 mm o.c. [S]. | RCABC-P13 2.1, 3.2(1)(a), 3.2(2)(b), 3.2(4)(a)–(b), 3.3(2), 3.3(5)–(6), 3.3(8), 3.4(2); RCABC-MET item 5; CMHC-FL Detail 2.24 (p. 2-60) |
| B16 | Membrane strip-in | SBS flashing strip | Over the metal flange, overlapping the field membrane **≥101.6 mm** [S] | Torched or adhered; primed if required | RCABC-MET item 6 |
| B17 | Cap sheet and edge mastic | SBS cap sheet (granulated); edge mastic coated with granules | — | — | RCABC-MET items 7–8 |
| B18 | Fascia | Larch board | 25 mm thick [I]. Depth = joist + nailer build-up [I]. **Back-primed, with end grain sealed** [S]. | Stainless screws into joist ends or sub-fascia [I]. Edge metal covers the top [S]. | CMHC-BPG Table 7.1 (fascia/trim: back-prime, prime and paint/stain); BCH-DECKS durability table ("particularly on end-grain"). **Larch is not on BC Housing's durable-species list** [S] (BCH-DECKS p. 27). |
| B19 | Gutter (eavestrough) | Prefinished metal | Sized to the roof [I] | Hung from the fascia, **detailed to be removable for repainting a wood fascia** [S]. Downspout extension away from the wall [S]. | CMHC-FL Detail 2.25 (p. 2-62); VBBL25 9.26.18.2 via 01 |
| B20 | Soffit | Larch boards, spaced or with a vent strip | 19 mm [I]. **Vented with insect mesh** so the overhang framing can dry [S]. Vent strip 25–50 mm wide [I]. | Screwed to the underside of the cantilevered joists [I] | BCH-DECKS p. 26 ("soffit panels should be vented … to allow framing members to dry"; balconies, by analogy) |
| B21 | Sheathing membrane at the top of wall | Same WRB as A12 | Carried up to the underside of the deck behind the cavity-top closure [I]. Shingle order: deck pre-strip (B8) laps **over** the WRB head [I]. | Stapled | [I] |
| B22 | **Cavity top closure and vent** | Continuous PT 19×38 closure strip laid horizontally across the strapping tops just below the soffit, plus perforated stainless/aluminium insect screen | Cladding stops **≈20 mm below the soffit trim** [I], leaving a screened vent slot to outside air [I]. **The cavity must not open into the soffit space** [S]. If vented at top, CMHC says the flashing/closure should project 12 mm past the cladding face [S]. | Closure screwed to the strapping. Soffit-side blocking (B4) is the fire separation. | VBBL25 9.27.2.2(3) via 01; CMHC-BPG Detail 4 (p. 6-14); Ge & Ye 2007 via 03; CC-2026 ("openings at the top and bottom") |
| B23 | Cladding top termination | Stucco: casing bead · fibre-cement: top trim · render board: top profile | Held ≈20 mm below the soffit trim (the vent slot) [I] | Fixed to strapping [I] | [I] |
| B24 | Soffit-to-wall trim (frieze) | Larch or metal trim fixed **to the soffit**, not to the cladding | Leaves the B22 slot open [I] | — | [I] |

### B.2.2 Variant B-2: vented joist roof (code-prescriptive; **not recommended in coastal BC**)

| Item | Value | Source |
|---|---|---|
| Unobstructed vent area | ≥1/150 of insulated ceiling area (roof joists or slope < 1:6) [S] | VBBL19 9.19.1.2(2) |
| Vent distribution | Uniform on opposite sides; ≥25 % at the top [S] and ≥25 % at the bottom [S] of the space | VBBL19 9.19.1.2(3) |
| Joist-space interconnection | Purlins ≥38×38 mm on top of the joists, unless each bay is vented separately [S] | VBBL19 9.19.1.2(4) |
| Vents | CAN3-A93-M compliant | VBBL19 9.19.1.2(5) |
| Clearance, insulation to sheathing | ≥63 mm [S]. Typically 38 mm purlin space + 25 mm above the batts [S]. | VBBL19 9.19.1.3(1); BCH-BI21 p. 3 Fig. 2 |
| Insulation depth at the wall line ("heel") | 235 − 25 = 210 mm max in the joist [I]. A perimeter reduction is allowed only down to RSI 3.52 above the exterior wall [S] (BCBC 2012 9.36 per BCH-EE4; **not Vancouver**). | [I]; BCH-EE4 p. 6 |
| Risk mitigations if used anyway | Exterior insulation ≥R-5 on the deck [S]. Darker (more absorptive) membrane [S]. Airtight ceiling plane, smoke-tested [S]. No turbine or fan vents over a leaky ceiling [S]. | BCH-BI21 pp. 11–13 |
| Rule for split insulation | Keep venting unless ≥50 % of the nominal R-value is above the deck [S] | BCH-BI21 p. 8 |

### B.3 Performance (B)

#### B.3.1 Control-layer pen test (B-1)

| Layer | Path | Transfer | Break? |
|---|---|---|---|
| **Water-shedding (roof)** | Cap sheet → strip-in over flange (≥101.6 mm [S]) → metal edge → hemmed drip ≥12 mm off the fascia [S] → gutter | Shingled and sealed per RCABC-MET | Fasteners on the flange are covered by the strip-in [S]. Exposed fasteners on the top surface are prohibited [S]. |
| **Water-shedding (wall)** | Cladding → top terminates under a 600 mm overhang. Code shelter band = O/4 = 150 mm [S] (03). | No head flashing needed at the cavity top under the overhang [I] | — |
| **Drainage plane** | Wall WRB → up behind the cavity closure → under the deck pre-strip [I] | Shingled: roof layers lap over wall layers [I] | Under the overhang, the WRB head sees very little water [I] |
| **Air barrier** | Wall poly → sealed to the top plate → spray foam across the bay (B5) → underside of deck → pre-strip ≥50 mm past the interior wall face [S] → deck A/V membrane (B9) | Sealant, spray foam, adhered membrane [S] | **Each joist passes through the plane.** Every bay is sealed on 4 sides [S]. This is the highest-risk air path. |
| **Vapour control** | Wall poly → (no poly in the roof) → deck membrane under the insulation | Same tie as the air barrier | Avoid a second vapour barrier at the ceiling in an exterior-insulated roof: "double vapour barrier" [S] (BCH-BI21 p. 6, p. 9) |
| **Thermal** | Wall batts → top plates (76 mm wood, uninsulated) → wall-line plane between the plates and the deck (blocking + B6 infill) → deck → above-deck insulation | B6 infill or spray foam closes the plane [I] | **Thermal bridges:** double top plate; blocking; each joist runs continuously from the warm interior bay out to the cold overhang ("fin" bridge, unquantified [I]). The above-deck insulation itself is continuous to the edge [I]. |

#### B.3.2 What each component does, and what fails if it is missing or reversed

| Component | Function | Failure if missing or reversed | Status |
|---|---|---|---|
| Exterior insulation over the deck | Keeps the sheathing warm; removes the night-sky condensation risk | Vented-joist version: wet sheathing, mould, decay (observed in the Lower Mainland) | [S] BCH-BI21 |
| Blocking sealed in every bay | Air tie and fire block | Interior air leaks into the overhang. Condensation on the cold overhang framing. Fire path from the cavity or soffit into the roof. | [S] BCH-BI21; BCAB-1893 |
| ≥2 % slope | Positive drainage, no ponding | Ponding accelerates membrane degradation | [S] RCABC; BCH-MM02 |
| Base sheet ≥50.8 mm down the face | Waterproofs the edge behind the metal | Water behind the edge metal wets the nailer and fascia | [S] RCABC-MET |
| Strip-in ≥101.6 mm over the flange | Seals the metal/membrane joint | **Reverse lap (metal over membrane, no strip) lets water run under the flange** | [S] RCABC-MET |
| Hemmed drip ≥12 mm | Throws water clear of the fascia; stiffens the edge | Fascia staining and rot; edge uplift in wind | [S] RCABC-P13 |
| Gutter | Collects roof runoff at the eave | Concentrated drip line 600 mm out: splash onto the wall base and **onto the bench (C)** | [S] CMHC-FL 2.25; [I] bench |
| Vented, screened soffit | Dries the overhang framing (outside the thermal envelope) | Damp overhang joists; soffit decay | [S] BCH-DECKS (analogy) |
| Cavity closed to the soffit, vented to outside | Meets the code and fire separation; gives top-vent drying | Cavity open into the soffit is a fire path and code violation (VBBL 9.27.2.2(3)). A fully sealed top dries more slowly. | [S] VBBL; Ge & Ye via 03 |

#### B.3.3 Moisture paths (B)

- **Arrives:**
  - Rain on the roof and runoff to the eave.
  - Wind-driven rain on the fascia and soffit underside. Updrafts at building tops are a known wetting zone (03 Blocken & Carmeliet).
  - Interior air leakage into the joist bays, which is the B-2 risk.
  - Night-sky condensation, a B-2 risk only.
  - Construction moisture in the joists.
- **Drains:**
  - Membrane → edge metal → gutter → downspout extension away from the wall (VBBL 9.26.18.2).
- **Dries:**
  - Overhang framing through the vented soffit.
  - Wall cavity through the screened top slot and bottom vents.
  - Interior joist bays dry to the interior. The ceiling is not a vapour barrier in B-1 [I].
- **Capillary breaks:**
  - Metal drip off the fascia.
  - ≈20 mm cavity top slot.
  - Fascia held by the edge metal, not buried in membrane [I].

#### B.3.4 Thermal (B)

- **Continuous:** the above-deck insulation.
- **Discontinuous:** the wall-line plane between the top plates and the deck. Fix it with B6 infill or spray foam [I].
- **Remaining bridges:**
  - Top plates.
  - Joists running through to the overhang.
  - Perimeter nailer (B11). Wood, but outside the insulation at the edge [I].
- The cantilever-through-the-envelope geometry is inherently bridged. Psi-values were not found.

#### B.3.5 Durability and ageing (B)

| Horizon | What degrades first | Maintenance | Status |
|---|---|---|---|
| 0–5 yr | Gutter debris and overflow onto the wall. Moss on the membrane. Soffit and cavity-top insect screens fouling. Larch fascia/soffit coating weathering. | Inspect the roof **twice a year** (spring and fall) and after storms [S]. Clean gutters [S]. | BCH-MM02 |
| 5–15 yr | Coating on the larch fascia and soffit; repaint about every 7 yr [S] (MM01 via 03). Sealants at metal joints: 10–15 yr for high-performance [S]. | Recoat the fascia, with the gutter removable to allow it [S] | 03 MM01; CMHC-FL p. 1-15, 2.25 |
| 15–30 yr | SBS membrane at end of life. Roof replacement every **15–25 yr** [S]; CMHC example renewal at **20 yr including perimeter flashing** [S]. BC Housing gives roof life expectancy of 10 to >30 yr [S]. | Edge metal designed to be removable for re-roofing [S] | CMHC-BPG pp. 9-1, 9-5; BCH-MM02; CMHC-FL 2.23/2.24 |

### B.4 Benchmark against UK Detail Library

Pages read: PHT47 "Passivhaus Twin Stud Timber Frame Flat Roof Eaves"; DL170 / DL175 "Passivhaus Timber Frame Eaves Junction Airtightness / Wind Tightness Detail" (Feb 2023 update: **air vent added to the timber cladding cavity**); PHT12 "Passivhaus, Timber I Beam Wall, Eaves" (render; **Oct 2025 update to cavity barrier behind cladding**); DL464 "Timber Clad Timber Frame Eaves" (ventilated cavity with an **open-state cavity barrier**, ventilated soffit, over-fascia vents).

| UK provision | In our junction? | Applies in Vancouver? |
|---|---|---|
| VCL / airtight layer wrapped around the roof structure and sealed to the wall (PHT47) | B2, B4, B5, B8 | Yes. This is the BCH-BI21 tie. |
| Insect mesh at the high-level ventilation gap (PHT47) | B22 | Yes |
| Air vent at the top of the cladding cavity (DL170/175, 2023) | B22 | Yes. Supported by Ge & Ye (03). |
| Cavity barrier at the top of the cladding cavity (PHT12 2025; DL464 "open-state") | B4 / B22 closure | **Yes, in substance.** VBBL 9.27.2.2(3) forbids the cavity opening into the soffit, and BCBC 9.10.16.1(3) requires fire blocks at vertical/horizontal interconnections (FSR > 25). An "open-state" intumescent barrier (vent that closes in fire) is a UK product approach. In BC the simpler route is a solid closure plus a separate outside vent [I]. |
| Membrane upstand ≥150 mm at the flat-roof edge (PHT47) | Not applicable to a low edge (no upstand at a gutter edge). RCABC governs the edge (B13–B16). | Partly. UK upstand rules apply to abutments, not to a drip edge. |
| Falls: firrings 1:40 for a finished 1:80 (PHT47) | 1:50 (2 %) minimum | Use RCABC 1:50, not the UK 1:80 |
| Wind-tightness layer over the edge of the insulation (DL175) | Base sheet down the face (B13) and nailer (B11) close the insulation edge | Yes |
| Over-fascia ventilation (DL464, cold pitched roof) | n/a in B-1 (unvented) | Only for B-2 |

### B.5 Conflicts (B)

- **Edge metal face below blocking:** ≥50 mm (RCABC-P13 3.2(4)(b)) vs ≥100 mm (CMHC-FL 2.24). The design uses 100 mm.
- **Hem required (RCABC) vs hems reduce shedding (03).** At the roof edge, RCABC is followed.
- **Cavity to soffit:** CMHC-BPG Detail 5 recommends connecting; VBBL 9.27.2.2(3) prohibits it. VBBL is followed.
- **Venting at the cavity top:** CMHC-BPG Detail 4 reports "two schools of thought". Top venting risks pulling in water under negative pressure, but the eave sits in the best-sheltered zone. Design choice: vent it [I].

---

## C. Freestanding exterior timber bench to ground

### C.0 Code status

- No code governs a façade bench (01 `req.seating-no-code`).
- Deck rules are used **by analogy**:
  - VBBL19 9.12.2.2(7): the foundation depth table does not apply to freestanding platforms of ≤1 storey, ≤55 m², ≤600 mm to the joists, with no roof and not attached.
  - 9.12.2.2(8): surface foundations on other than coarse-grained, well-drained soil or rock need access for re-levelling.
  - 9.23.6.2: exterior posts anchored against uplift and lateral movement.
  - BCH-DECKS.
- The design still takes piers to frost depth, to avoid re-levelling a fixed bench [I].

### C.1 Ordered layer table

| # | Component | Material | Dimensions / clearances | Support and fastening | Source |
|---|---|---|---|---|---|
| C1 | Excavation | — | To undisturbed soil [S, analogy]. Bottom **≥450 mm below finished grade** [S] (Vancouver frost penetration). | — | VBBL19 9.12.2.1; VBBL19 1.1.3.2(1) (2025 not re-verified) |
| C2 | Granular base | Clear crushed stone | 100 mm compacted [I] | — | [I] |
| C3 | Concrete pier, one per post | Cast-in-place in a round form | Ø250 mm [I]. Must give ≥2" (51 mm) side cover to the anchor [S] (so ≥90 + 2×51 ≈ 192 mm min [I]). **Top ≥152 mm above finished grade** [S]. Top chamfered or sloped to shed water [I]. Concrete 32 MPa with 5–8 % air [S, analogy to exterior steps]. | — | BCH-DECKS p. 11; SST p. 76; VBBL25 9.3.1.6 via 01 (analogy; see 01 entry note) |
| C4 | Anchor | Cast-in 5/8" (16 mm) anchor bolt, hot-dip galvanized or **stainless** | Embedded ≥100 mm [I] (by analogy to 9.23.6.1(5)). Projection above concrete limited so the anchor stays **<1" (25 mm)** proud and clears the standoff [S]. | Nut and washer / load-transfer plate [S] | SST p. 76; BCH-DECKS (HDG anchor bolt in the post-base figure) |
| C5 | **Post base (standoff)** | Simpson ABU44Z (ZMAX G185) or stainless equivalent | **1" (25 mm) standoff** between post end grain and concrete [S]. ABU44Z: W 3-9/16" (90 mm), L 3" (76 mm), H 5-1/2" (140 mm), base 16 ga / strap 12 ga [S]. Allowable (DF/SP): uplift 1,900 lb with nails / 2,300 lb with bolts; download 7,570 lb [S]. | Fasteners: (12) 0.162×3-1/2" nails **or** (2) 1/2" through-bolts [S]. **Use bolts in oak, pre-drilled** [I]. | SST pp. 76–77; BCH-DECKS p. 26 ("typical post base stand-off height is 1" (25mm)") |
| C6 | Post | **Oak, 90×90** (to fit the 3-9/16" base); heartwood, no sapwood | End grain **25 mm above the concrete** [S] and ≥177 mm above grade (152 + 25) [I]. Bottom end sealed [I]. | In the post base | [I] size from SST product fit; the user's 45×45 cannot take a catalogued base [S] (smallest ABU/ABA/ABW is 4×4) |
| C6-alt | If 45×45 legs are kept | Custom stainless shoe: plate + knife plate in a kerf | 25 mm standoff [S, principle] | Stainless bolts [I] | [I]. Needs a structural check. |
| C7 | Bolts and screws | **Stainless steel (304/316)** | 1/2" (12.7 mm) bolts [S]. Stainless is "best results" [S]. Oak tannin/acid staining makes stainless preferable over galvanized [I]. | — | SST; BCH-DECKS p. 28 |
| C8 | Bench frame bracing | Oak rails/aprons, e.g. 45×90 [I], with moment-resisting joints or diagonal braces | Must be self-stable: "post bases do not provide adequate resistance to prevent members from rotating about the base" [S] | Stainless bolts or screws [I] | SST p. 76 |
| C9 | Seat slats | Oak, 45 mm (given) | Gaps **≥6 mm** between slats [S, analogy to decking]. Slight crown or ≥2 % cross-fall [I]. Ends sealed [I]. Width 90–140 mm [I]. | Stainless screws from below [I] | BCH-DECKS p. 26 |
| C10 | Ground around piers | Gravel; soil kept off the post bases | Grade falls away ≥2 % [S, analogy] | — | BCH-SFD (analogy); BCH-DECKS ("posts elevated above soil and hardscapes … splashing") |
| C11 | Position relative to the eave | — | Bench zone ≈400 to ≈850 mm from the cladding [I] vs drip line at 600 mm [S] (overhang). **Either a gutter at B19 or move the bench beyond about 700 mm** [I]. | — | [I] geometry |

### C.2 Performance (C): adapted control-layer check

| "Layer" | Path | Break / fix |
|---|---|---|
| Water shedding | Seat top (crown, 6 mm gaps) → rails → posts → post-base standoff → pier top (sloped) → gravel | Post end grain never touches standing water: 25 mm standoff [S], pier top 152 mm above grade [S]. |
| Capillary breaks | 25 mm air gap at the post end [S]; pier top above splash; no soil contact [S] | Burying the posts (the rejected design) leaves none. Ground-contact wood needs CSA O80 UC4.1 [S] (01), and BC Housing says untreated durable heartwood is not recommended for long-term ground contact (03 CWC summary). |
| Drainage / drying | Water drains through slat gaps; air dries end grain under the base | "Situations should … be avoided where the end grain … is maintained in a wet environment" [S] (BCH-DECKS) |
| Structure | Base anchors resist uplift and lateral load; the frame resists rotation | A base-only "fixed" post rotates [S] (SST) |

**What fails if each item is missing:**
- **No standoff:** end grain wicks water from the concrete, and decay follows. Inadequate base drainage and separation is common issue #5 in BCH-DECKS [S].
- **Pier flush with grade:** splash and soil contact keep the post base wet [S].
- **Galvanized or mild steel in oak:** black tannin staining and corrosion [I], so use stainless.
- **No slat gaps:** water and organic debris trapped between boards [S].
- **Bench under an unguttered eave:** concentrated roof runoff falls on the seat [I].

**Moisture paths:**
- Rain falls directly on the seat (partly sheltered under the overhang [I]).
- Roof drip if there is no gutter.
- Splash from the gravel.
- Condensation and dew on horizontal surfaces [I].
- The drying season is May–September (03).

**Thermal:** not applicable.

**Durability and ageing:**

| Horizon | What happens | Maintenance | Status |
|---|---|---|---|
| 0–5 yr | Oak greys and checks. Tannin bleed. Organic debris in post bases and slat gaps. | Clean post bases and gaps yearly [I] | [I] |
| 5–15 yr | Surface erosion of exposed wood ≈0.03–0.10 mm/yr (softwood data; oak not measured) [S] (03 Williams et al.). Fastener staining. | Re-oil or recoat if a finish is wanted, every 1–3 yr [I]. Replace any slat with decay at its ends [I]. | 03; [I] |
| 15–30 yr | Seat slats and rail ends are the first components to need replacement [I]. Concrete piers see about 37 air freeze–thaw cycles per year [S] (03), hence the air-entrained mix. | Replace slats [I]. Posts survive if the standoff is kept clear [I]. | 03; [I] |

### C.3 Species note

- **Oak:** BC Housing lists only western red cedar, eastern white cedar, yellow cedar and redwood **heartwood** as durable, and "all other wood species have limited natural durability" [S] (BCH-DECKS p. 27).
  - White oak heartwood is commonly rated decay-resistant in the USDA *Wood Handbook*, but I could not access the table this session [I].
  - Red oak is not durable [I].
- **Recommendation:** white oak (*Quercus alba*) or European oak heartwood only, sapwood-free, with all detailing above (standoff, gaps, sealed end grain) [I].
- **Alternatives:** yellow cedar heartwood; or treatable species to CSA O80 UC3.2 for posts above ground [S] (BCH-DECKS table / 01).

### C.4 UK benchmark

Not benchmarked: none of the Detail Library pages read covers external furniture.

---

## Open questions

1. **VBBL 2025 re-verification.** The following were read only in VBBL 2019, BCBC 2018/2024 or 01. Confirm against the vancouver.ca PDF (403 to my fetcher):
   - 1.1.3.2 frost depth (450 mm)
   - Table 9.12.2.2 and 9.12.2.2(7)–(8)
   - 9.19.1.1–9.19.1.3
   - 9.23.6.1 anchor table
   - 9.23.7.2, 9.23.9.9, 9.23.11.3–.4, 9.23.14.3
   - 9.28.3–9.28.6
   - 9.10.16.1–9.10.16.2 (fire blocks)
2. **Vancouver Sa(0.2)** (VBBL 2025 Appendix C) → anchor-bolt spacing per Table 9.23.6.1.
3. **Vancouver Part 10 energy targets.** These set the roof insulation thickness (B10), any slab-edge or foundation insulation requirement (A6 / A.3.4), and whether the wall-line thermal infill (B6) is code-driven.
4. **BC Housing *Building Envelope Guide for Houses* (2020).** Paywalled. It would supply BC-house base-of-wall and eave details with dimensions that could replace most of the [I] geometry here. Recommend purchasing.
5. **CMHC-BPG detail drawings** (Details 2, 4, 5, 6; pp. 6-7 to 6-25). These are raster images whose dimension callouts were not readable by text extraction. A human or vision pass should check:
   - where the sheathing stops relative to the foundation, and
   - the drawn flashing geometry.
6. **BC Housing *Insulated Wood-Frame Vaulted and Flat Roofs* (2024).** Over the size limit. Needed to confirm a published exterior-insulated flat roof eave **with a cantilevered overhang**, including the air-barrier tie and the thermal treatment at the wall line (B4–B6).
7. **Finished-ground definition** (01 U3). Is the top of the gravel strip "finished ground" for the 150 mm and 200 mm rules?
8. **Cavity-top venting.** Vented slot (design choice) vs closed (CMHC "two schools"). Confirm with the City or the reviewing architect.
9. **Fire blocking in the rainscreen cavity.** Confirm VBBL 2025 keeps the "single air space ≤25 mm" exception (BCBC 2024 9.10.16.2(2)(a)). Any cavity >25 mm needs fire blocks at ≤3 m vertical (BCAB-1985).
10. **Lime render on cement board** is a Part 5 route (VBBL 9.27.1.1(6)). It needs a professional; the base and top profile choices (A15c, B23) are inferred.
11. **Insect screen specification** (aperture, open area). No published number was found (CC-2026 gives none).
12. **Canadian HardiePanel instructions.** Only the US HZ10 (2019) was read.
13. **Oak durability rating.** *Wood Handbook* ch. 14 not accessed. BC Housing does not list oak as durable.
14. **Roof drainage layout.** Gutter at the eave (assumed) vs drains elsewhere. This decides the bench position (C11).
15. **Bench seat height and ergonomics.** Not researched; outside the code.
16. **Hem vs no hem** at the wall-base drip (A.6). A lab study and the RCABC rule point opposite ways.
17. **Edge-metal face depth:** 50 mm (RCABC) vs 100 mm (CMHC).
18. **Slab-edge thermal break thickness.** No source; 25–50 mm inferred.

## Tally

This is a mechanical count of tags in sections A–C. It covers numbers and tagged performance claims, and includes "[S, analogy]" under S.

| Junction | [S] sourced | [I] inferred |
|---|---|---|
| A (base of wall) | 117 | 65 |
| B (eave) | 79 | 49 |
| C (bench) | 34 | 39 |
| **Total** | **230** | **153** |

C is the most inferred because no code or guide covers a façade bench: deck guidance is applied by analogy. The two geometry choices made to meet sourced minimums are foundation top +300 and posts 90×90. Both are marked [I] and their constraints are [S].
