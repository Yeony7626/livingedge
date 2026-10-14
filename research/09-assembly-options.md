# 09 — Assembly options study: the best ground–façade edge for a single-storey building in Vancouver

Researched: 2026-10-13. Status: **draft for the architect's review**. It is not an approved library entry.

Question asked: what is the **best** assembly for each element of the edge? The current v2 assembly (`.sketch/rhino/detail01.mjs`, research 06/07) is treated as one option among several, not as the default. Every option is judged on four criteria together:

1. Finished look from outside.
2. Thermal performance.
3. Moisture protection in Vancouver's coastal, wind-driven-rain climate.
4. Environmental sustainability: embodied carbon, biogenic storage, material health, durability, repairability, end of life and BC sourcing.

Code path and cost tier are reported beside the criteria. They are gates and practicalities, not criteria.

---

## 0. How to read this file

### 0.1 Tags (every number carries one)

| tag | meaning |
|---|---|
| **[S]** | SOURCED. Read in the cited document or web page this session, or in an approved/junction research file (cited as `03:…`, `06:…`, `07:…`). |
| **[S2]** | SOURCED, secondary. Read on an aggregator page (One Click LCA material page, OEKOBAU.DAT dataset page, the CLF BC sourcing guide, Wikipedia), not in the EPD or standard itself. Treat as sourced, but confirm against the primary before any compliance use. |
| **[SN]** | Seen only in a search-engine summary. Treat as a lead. |
| **[I]** | INFERRED. My calculation (shown, or method stated in §0.3) or professional judgement (reason given). |

Source keys (`[V1]`, `[E-GTX]` …) resolve in §14.

**How the sources were read.** Several EPD and code PDFs could not be rendered by the fetch tool. The tool saved them automatically to the session's tool-results folder. Their text layers were then extracted locally with `pdftotext`, and those values are tagged [S]. The research subagents note that these saved binaries exist; the user may want to clear them.

**Search budget.** The session's shared web-search budget ran out partway through. This is why several items remain [SN] or are listed under §13.

### 0.2 Scoring and comparison rules

- **Decision matrices** score each criterion 1–5, where 5 is best. Scores are [I] judgements built from the tagged evidence in the same section.
- **Equal weighting.** The "Σ4" column is the unweighted sum of the four criteria. It is a reading aid only. The recommendation text explains the trade-offs that the sum hides.
- **Embodied carbon is compared as A1–A3 fossil GWP** (kgCO2e) **per m² of assembly**, for the layers that differ between options only. Layers common to every option are excluded and named in each section.
- **Biogenic carbon** (CO2 stored in plant-based material) is reported **separately** and is never netted. Two reasons:
  - The NRC national wbLCA guide reports biogenic carbon separately and keeps it out of compliance [SN, NRC-G].
  - The City of Vancouver Addendum lets only *short-cycle* biogenic carbon count [S, CoV-A2]. Short-cycle means crops with a growing cycle of 10 years or less, waste-stream biomass, forestry residues and reused wood. *Long-cycle* forest wood does **not** count.
  - In the tables, "stored" is split where this matters.
- **End of life cuts both ways.** EN 15804 books biogenic uptake in A1 and re-emits it in C3 if the material is incinerated. For example, the GUTEX EPD gives C3 = +269 kgCO2e/m³ against −280 biogenic in A1–A3 [S, E-GTX]. Storage therefore lasts only while the material is in service or is reused.

### 0.3 Thermal method

**Walls: parallel path, calibrated to BC's own worked example** [S, IG4 p.9]:
- R-20 batt in 2×6 at 16" o.c.: nominal RSI 3.34, effective framed layer 2.36.
- Other layers: exterior film 0.03, cladding + air cavity 0.18, sheathing 0.11, gypsum 0.08, interior film 0.12, total 0.52. Whole wall 2.88.
- Calibration used for the other options [I]:
  - framing fraction 0.23
  - wood 0.0085 RSI/mm
  - this reproduces 2.36 exactly: 1/(0.77/3.34 + 0.23/1.19) = 2.36
- **Continuous exterior insulation** is added in series. A 5 % penalty is applied for strapping screws through it [S, 07:RDH13 p.3-46 "about a 5 % thermal penalty"].

**Roofs and floors** use the same series/parallel logic. Polyiso thickness uses the design value R-5.6/in, with the LTTR label R-6.05/in and the cold-climate R-5.0/in as bounds [S, BSI-502].

**Linear thermal bridges** (slab edge, sill, eave) are **not quantified**. No psi-values were found for these geometries. A 2-D model (THERM/Flixo) is needed (§11).

### 0.4 Building type sets the code path

The project's building is a single-storey pavilion with public seating. Its **major occupancy is not fixed** in the research so far, and the Vancouver By-law treats the cases very differently [S, V1 Div A 1.3.3.2–1.3.3.3]:

| if the pavilion is… | Div B parts that apply | energy path (Part 10) | embodied carbon (10.4) |
|---|---|---|---|
| **Group A assembly** (community pavilion, library, café seating area) | **Parts 3, 4, 5, 6** apply at any size (1.3.3.2(1)(b)(i)). It is a "Part 3 building". The envelope is designed under **Part 5**, with Part 9 details used as reference practice. | 10.2.1.2: ASHRAE 90.1-2016 (climate zone 4) or NECB 2020 (10.2.2.2 / 10.2.2.3) | 10.4.1 applies to Part 3 buildings, **except GFA ≤ 1,800 m²**, so exempt |
| **Group D or E** (small business, shop, café as mercantile), ≤ 600 m² | **Part 9**, but **Part 4 structural design applies anyway**: VBBL 1.3.3.2(3) applies Part 4 to all buildings except those with ≤ 2 dwelling units | 10.2.1.3: energy and emissions performance per Article 10.2.2.5 (TEUI/TEDI/GHGI tables). No prescriptive RSI table. | not in 10.4 scope |
| **Group C house / residential ≤ 3 storeys** | Part 9 | 10.2.1.4: **Table 10.2.2.6** (walls 3.85, slab 2.45, roof 4.30/7.04…) | not in 10.4 scope |

**Consequence [I].** The brief's targets (walls RSI 3.85, slab 2.45) are the **house** values in Table 10.2.2.6. They are the strictest prescriptive set. This study keeps them as **design targets** because they are conservative for every case. It also checks the ASHRAE 90.1 values that would formally govern a Group A pavilion (§2.1).

---

## 1. Bottom line

### 1.1 Recommended assembly per element (preferred → alternate)

| element | **preferred** | effective RSI [I] | A1–A3 fossil, differing layers [I] | biogenic stored [I] | look | **alternate** |
|---|---|---|---|---|---|---|
| (a) wall + cladding | 2×6 at 400, **dense-pack cellulose**, 6 mil poly (or a vapour retarder meeting VBBL 9.25.4), 12 mm plywood, breather sheathing membrane, **80 mm wood-fibre board** (CAN/ULC-S706.1 type), 19×64 PT strapping (19 mm drained, vented cavity), **19 mm western red cedar channel siding**, textured face, bleaching-oil/weathering finish, stainless fasteners | **4.84–4.94** (≥ 3.85 ✓) | **11–14 kg/m²** (current 25–28) | ≈ 55 kg CO2/m² (current ≈ 10); ≈ 14 short-cycle (cellulose) | warm red-brown boards weathering to an even silver-grey; fine horizontal shadow lines; crisp 600 mm eave shadow at the top | **Mineral-wool route:** R-22 stone-wool batts + 50–75 mm Comfortboard 80 + the same cedar. RSI 4.5–5.3, 15–20 kg/m². All listed and CCMC-evaluated, BC-made board, no wood-fibre approval risk. |
| (b) plinth / foundation wall | Right-sized cast stem in **low-carbon concrete**: exposed part F-2/C-2 air-entrained GUL with 25–40 % SCM; footing in a 56-day mix. **100 mm graphite EPS Type 2** outside, footing to foundation top (+300). **12 mm cement parging on wire lath**, dark mineral (silicate) finish, above grade and 200 mm below. Footing capillary break, damp-proofing and drain per 07. | ≈ 3.2 for the insulation layer (pavilion path ✓; 125 mm needed if the City counts it as a 3.85 "foundation wall") | **≈ 35–47 kg per m run** (current ≈ 83) | 0 | a 300 mm dark, fine-textured mineral band, set ≈ 20 mm behind the cedar face, under a thin stainless drip line | **Exposed board-formed concrete plinth.** Insulation inside the stem; cellular-glass load-bearing thermal break under the sill. Best look and no render to maintain, but a sill/stem thermal bridge that must be modelled. |
| (c) ground floor | **Slab-on-grade, lower carbon:** 100 mm slab in a 56-day low-carbon mix (or 28-day GUL + 40 % SCM) on 0.25 mm poly over **100 mm graphite EPS Type 2** (2 × 50 staggered), 25 mm EPS edge isolation, clear stone gas layer + radon rough-in | **≈ 2.9–3.2** (≥ 2.45 ✓) | **≈ 16–22 kg/m²** (current ≈ 39) | 0 | unchanged from outside: floor at +300, plinth reads as above | **Raised timber floor on helical (screw) piles, open ventilated perimeter.** About 16–20 kg/m², ≈ 50 stored, no concrete. The ground and planting run under the edge (a strong "living edge" move). Needs Part 4 piles, a ramp, and durable underfloor detailing. |
| (d) roof + eave | **Keep the exterior-insulated conventional low-slope roof:** SBS 2-ply with an FLL-tested root-resistant cap, **polyiso from a current low-GWP EPD**, tapered, ≥ 150 mm at drains, ≈ 180–200 mm average, 16 mm ply deck, self-adhered AVB. **Add an extensive, biodiverse green roof** (≈ 100 mm substrate, native coastal meadow + sedum, varied depths, deadwood/sand patches) behind a vegetation-free gravel edge strip. 600 mm cantilevered eave, cedar soffit, prefinished steel edge and gutter to a rain garden ≥ 5 m away. | ≈ 6.4–7.6 (≥ 7.04 house prescriptive at ≥ 180 mm average; ≥ 5.3 for 90.1) | ≈ 17–21 roof + ≈ 4–15 green layer = **21–36 kg/m²** | ≈ 0 | crisp dark metal edge and cedar soffit from the street; a soft green-brown fringe visible from a distance or from above; seasonal colour | **Same roof without vegetation**, with graphite EPS and self-adhered membranes. About 16–21 kg/m², with no structural upgrade and no green-roof maintenance contract. |
| (e) base flashing / trims / fasteners | **Base flashing and through-insulation drip in 0.6 mm stainless steel 304** (316 within sight of salt water), dull or dark finish, unhemmed 45° kick-out. **Stainless fasteners** for cladding, strapping and flashing. Roof edge metal and gutter in **24 ga prefinished galvanized steel** (RCABC). No copper or aluminium at the wall base. | — | flashing ≈ 2.3 kg/m (prefinished steel ≈ 2.9–3.0) | — | a fine, matte metal line at the plinth/cedar change; dark edge metal at the eave | **24 ga prefinished galvanized steel (Z275)** base flashing, isolated from PT wood and cement by membrane, with stainless fasteners. Lower cost; likely renewed with the cladding at 25–30 yr [I]. |

### 1.2 Headline trade-offs

1. **The current wall's biggest carbon item is the stucco, not the insulation.** 25 mm of three-coat stucco on lath is ≈ 12.6–14.8 kg/m² [I, from the ICE mortar factor]. The 50 mm stone-wool board is ≈ 5.9–6.9 [I, from S]. Coastal BC's leaky-condo record also ties failures to stucco and face-sealed claddings [S2, LEAKY]. A cedar rainscreen cladding is about 2 kg/m² fossil and stores ≈ 11.5 kg CO2/m² [I, from E-WRC]. Replacing the cladding is the single largest win on carbon *and* moisture risk. It also changes the look from monolithic render to timber.
2. **Wood fibre beats stone wool on carbon but carries approval and evidence risk.** Wood fibre is ≈ 2.5 kg fossil per m²·RSI with ≈ −9 kg biogenic. Stone wool is ≈ 4.0–4.6 fossil with no storage [S/S2]. Against that:
   - VBBL 2025 lists the wood-fibre insulation standard CAN/ULC-S706.1 [S, V2 9.25.2.2.(1)(i)].
   - However, **no GUTEX, STEICO or TimberHP board was found certified to S706.1 or CCMC-evaluated**, and no BC stockist was confirmed.
   - **No marine-climate field study of wood-fibre exterior insulation was found.**
   - Stone wool is the proven BC route (CCMC, Grand Forks BC plant).
   - **That is why the mineral-wool wall is the named alternate.**
3. **Concrete and foam choices dominate the ground.** The Concrete BC industry baseline is 220–231 kg/m³ at 25 MPa [S, E-CBC]. Lower Mainland producers publish 90–132 kg/m³ low-carbon mixes, but rated at 56–91 days [S2, CLF-G]. Under the slab:
   - graphite EPS: ≈ 1.5 kg/m²·RSI [S2]
   - HFO XPS: ≈ 6.6 [S]
   - legacy HFC XPS: ≈ 20 [S2]

   Floor + perimeter on a reference 10 × 15 m pavilion falls by ≈ 45–60 % [I]. **The exposed plinth is the durability limit:** it still needs an air-entrained F-2/C-2 mix, not the lowest-carbon 56-day mix.
4. **The green roof is the one recommendation that adds carbon.** It adds ≈ 4–15 kg/m² [I], plus whatever structural upgrade the Part 4 check requires. In return it gives stormwater retention, biodiversity and probably longer membrane life (evidence weak: §7). It is recommended because the brief is a "living edge". **If roof maintenance cannot be committed** (the RCABC Vegetated Roof Guarantee makes maintenance mandatory [S2]), take the alternate.
5. **The raised-floor alternate is the most "living" ground plane but the least accessible.** It has the lowest concrete and lets soil, roots and water run under the building. A public pavilion must meet VBBL Section 3.8 accessibility (applies to all Part 9 buildings, Div A 1.3.3.2(5) [S, V1]). A floor at +450–600 mm needs a ramp. That is why it is the alternate, not the preferred option.
6. **Whole-edge effect** (reference pavilion 10 × 15 m, 3.0 m walls, 600 mm eaves; differing layers only; A1–A3 fossil) [I, §3.2]:

   | assembly | total |
   |---|---|
   | current | ≈ 17.1–18.4 t CO2e |
   | recommended **with** green roof | ≈ 9.9–14.5 t (−31 % at mid-range) |
   | recommended **without** green roof | ≈ 9.2–11.8 t (−41 %) |

   Biogenic storage in the walls rises from ≈ 1.5 t to ≈ 8.2–8.6 t CO2.

---

## 2. Code and policy baseline (Vancouver)

### 2.1 VBBL 2025 Part 10 thermal targets, including the roof value

**Table 10.2.2.6 "Minimum Effective Thermal Resistance of Assemblies"** [S, V1 Table 10.2.2.6, pdf p.821]. It applies to buildings under 10.2.1.4: Group C residential, < 4 storeys or ≤ 2 dwelling units, no hotel/motel.

| assembly | performance path (10.2.1.4.(2)) | prescriptive path (10.2.1.4.(3)) |
|---|---|---|
| **Roof assemblies** | **RSI 4.30** | **RSI 7.04** |
| Decks (flat roofs with pedestrian access over living space) > 10 m² | 4.30 | 7.04 |
| Attic space | 8.50 (single value) | |
| Walls (incl. frame crawl-space walls) | 3.85 | |
| Foundation walls | 3.85 | |
| Box and rim joists | 3.85 | |
| Suspended floors (framed), e.g. a raised floor over open air | **4.22** | |
| Concrete slabs on ground at, above or below grade ("insulation under all slab area and around edge of slab") | 2.45 | |
| Exposed slab edges / balconies | 0.42 | |

Notes on the table [S, V1]:
- Values are **effective** RSI.
- Note A-10.2.2.6 gives the calculation method.
- The table's layout centres single values across both path columns.
- A search summary of older City guidance gave roof-joist RSI 4.3 and other roofs 5.28/7.0 by house size [SN, agent]. The 2025 table read here shows **4.30 / 7.04 by path, not by size**.

**ASHRAE 90.1-2016, climate zone 4.** This is the path for a Group A pavilion. VBBL 10.2.2.2.(2)(b) fixes climate zone 4 [S, V1]. Values by element:

| element | requirement | equivalent | tag |
|---|---|---|---|
| Roof, insulation entirely above deck, nonresidential | U-0.032 / **R-30 c.i.** | ≈ RSI 5.5 assembly / 5.28 insulation [I] | [S, PNNL-90.1 slide 37 "Reference Table 5.5-4"] |
| Walls, wood-framed | U-0.064 | ≈ RSI 2.75 | [SN] |
| Slab, unheated | F-0.520, R-15 for 24 in | | [SN] |
| Walls, below grade | C-0.119 / R-7.5 c.i. | | [SN] |

**Reading [I].** Designing to the house values (walls 3.85, slab 2.45, roof ≥ 7.04 prescriptive) meets or exceeds every pavilion-path value above.

### 2.2 Embodied-carbon rules that actually apply

| rule | what it says | applies to this building? |
|---|---|---|
| **VBBL 2025 Section 10.4 "Low Carbon Materials and Construction"** | 10.4.1.1: applies to new buildings in Div A 1.3.3.2.(1), meaning Part 3 buildings, **except those with GFA ≤ 1,800 m²** (and those under 10.2.1.5, a known mis-reference for 10.2.1.4 per UDI). 10.4.1.2: whole-building embodied carbon "not more than double an acceptable benchmark", determined with the *National Whole-Building LCA Practitioner's Guide* and the *City of Vancouver Addendum* [S, V1 10.4.1; S2, UDI]. Note A-10.4.1.1.(1)(a): the intent is to exempt smaller buildings [S, V1]. VBBL 2025 in effect 15 Sep 2025 [S2, UDI]. | **No.** A Group A pavilion is a Part 3 building but is far below 1,800 m². A D/E/C Part 9 building is outside 10.4 [I, from S]. |
| National wbLCA Practitioner's Guide (NRC, 2024, DOI 10.4224/40003365) | 60-year study period; biogenic carbon reported separately and excluded from compliance [S record; SN for content, NRC-G] | Method reference only |
| **City of Vancouver Addendum v1.0**, Appendix II (Part 9 low-rise residential guide, amended 8 Dec 2025) | **Short-cycle biogenic carbon may be counted** toward compliance; long-cycle may not. Part 9 incentive track (Zero Emission Buildings in R1/RT/RA bulletin): ECI benchmark **200 kgCO2e/m² (A1–A3)**, limit **120** (−40 %); cradle-to-grave benchmark 250 / limit 150; 60-year default [S, CoV-A2 Table viii, §"Carbon Storage"] | Residential incentive only, not this building. Useful as a **benchmark**: Vancouver Part 9 houses ≈ 200 kgCO2e/m² A1–A3. |
| Rezonings (Green Buildings Policy for Rezonings) | An Embodied Carbon Design Report showing the project is "on track" for VBBL limits [SN, agent] | Only if the site is rezoned |
| Climate Emergency Action Plan, Big Move 5 | −40 % embodied carbon by 2030 (city-wide target) [S2, UDI] | Policy context |
| BC Building Code 2024 / BC Step Code | No embodied-carbon provisions found; national work under CBHCC [S2/I, agent] | — |
| Federal Greening Government Strategy | −30 % embodied carbon in major materials from 2025 (federal assets) [S2, agent] | Not applicable |

**Recommendation [I]:** run a **voluntary** wbLCA (A1–A3, plus B4 replacements and C) with the City Addendum method. Report short-cycle and long-cycle biogenic carbon separately. That keeps the tool's numbers comparable with the City's framework.

### 2.3 Part 9 clauses that shape the options (VBBL 2025 Vol. 2 text read this session [S, V2])

| clause | content | effect on the options |
|---|---|---|
| 9.25.2.2.(1) | Insulation must conform to a listed standard, including (e) CAN/ULC-S702.1 mineral fibre, (f) S703 cellulose, (d) S701.1 polystyrene, (g) S704.1 polyiso, **(i) CAN/ULC-S706.1 wood fibre insulating boards**, and (a) ASTM C726 mineral wool roof board | Wood-fibre board is a listed material type. Each product still needs evidence of conformity (no CCMC/S706.1 listing found, §4). |
| 9.25.2.2.(3) | Insulation in contact with the ground must be inert to soil and water and not significantly reduced by moisture | Governs below-grade EPS/XPS/cellular glass (§5). |
| 9.25.2.3.(6) | Exposed insulation subject to mechanical damage: ≥ 6 mm PT plywood **or 12 mm cement parging on wire lath** | Plinth protection (§5). A fibre-cement panel would be an alternative solution. |
| 9.25.5.1.(3)–(4) and 9.25.5.2 / Table 9.25.5.2 | Wood sheathing ≤ 12.5 mm is exempt. A layer with ≥ 30 ng/(Pa·s·m²) permeance, ≥ RSI 0.7 and HDD < 6,000 is exempt. Otherwise, low-permeance materials need an outboard/inboard RSI ratio ≥ **0.20** where HDD ≤ 4,999 (Vancouver ≈ 2,925 [S, 03]). | Foam exterior insulation passes: 50 mm XPS/EPS ratio ≈ 0.33–0.52 [I, agent]. Wood fibre and stone wool are vapour-open, so the rule does not bind. |
| 9.27.1.1.(1), (2), (6) | Lumber, fibre-cement, plywood… claddings follow 9.27.2–9.27.13 **or Part 5**. Stucco follows 9.27.2–9.27.5 + 9.28. **Any other cladding or substrate → Part 5.** | Lime render on board, terracotta and proprietary panels are Part 5. Cedar, TMT lumber and fibre cement are Part 9. |
| 9.27.6.1 | Drop, rustic, novelty, lapped and vertical wood siding ≥ 14.3 mm thick | 19 mm cedar channel siding ✓. |
| 9.23.2.4.(1) | Connectors in contact with preservative-treated wood: hot-dip galvanized ≥ **Z550**, equivalent, or **stainless** | Drives the fastener and flashing metal choice (§8). |
| 9.13.4.1.(1) | Soil-gas control applies to conditioned space with an assembly **in contact with the ground** | A floor raised over open air has no soil-gas rough-in requirement [I]. Slab-on-grade keeps the 07 radon detail. |
| 9.18.1.1 | "Crawl space" rules apply only where < 25 % of the perimeter wall area above ground is open | An open-skirted raised floor is an exposed floor (RSI 4.22), not a crawl space [I]. |
| 9.16.1.2 | Floors-on-ground that support superstructure loads → Part 4 | Insulated raft / FPSF → engineer. |
| 9.10.16.2 (via 07) | Fire blocks in a furring cavity are not needed while there is only one concealed air space ≤ 25 mm | Keep the single 19 mm cavity: horizontal siding on vertical strapping, no counter-battens (§4). |

---

## 3. Carbon factors used

### 3.1 Factor table

A1–A3, kgCO2e. "/RSI" means per m² at RSI 1.

| material / product | factor | biogenic | source | tag |
|---|---|---|---|---|
| ROCKWOOL Comfortboard 80 | **4.64 /RSI** (A1–C4 5.40); RSI 0.74 per 25.4 mm; 128 kg/m³; CAN/ULC-S702 Type 1; plants incl. Grand Forks BC | ≈ 0 | E-RW Table B1/B2 (UL EPD 4790711618.101.3, issued 24 Feb 2025, updated Mar 2026); RW-TDS | [S] |
| same, CLF guide value | 4.00 /RSI | — | CLF-G | [S2] |
| ROCKWOOL Comfortbatt SS R22.5 | 1.43 /RSI (CLF: ROCKWOOL batt 1.18) | ≈ 0 | E-RW Table B1; CLF-G | [S]/[S2] |
| NAIMA fibreglass batt baseline | 1.01 /RSI (OC PINK Next Gen 0.66) | 0 | CLF-G | [S2] |
| Dense-pack cellulose | CIMA baseline 1.12 /RSI. Generic EU blown cellulose: fossil 9.74, biogenic −82.47 kgCO2e/m³ at 45 kg/m³ | yes, short-cycle (waste paper) | CLF-G; OEK | [S2] |
| **GUTEX wood-fibre boards** (dry process, avg 169 kg/m³) | per m³: GWP-fossil **75.8**; GWP-biogenic **−280**; total −204; C3 +269; D −168; λ 0.037–0.047; 73.9 kg C/m³ | −280 /m³ | E-GTX (IBU EPD-GTX-20250702-IBC1-DE, 17 Mar 2026 – 16 Mar 2031) | [S] |
| → per kg | fossil 0.449; biogenic −1.66 | | calc | [I] |
| STEICO dry-process boards | per m³: protect L dry 86.2 (110 kg/m³); protect M dry 105; H dry 136 (180 kg/m³), fossil-type. Older IBU EPD (expired Nov 2025): A1 −185, A2 2.43, A3 101 per m³ at 140 kg/m³ | yes | S2 via agent (One Click LCA / EPD Norge); E-STE | [S2]/[S] |
| TimberHP TimberBoard (Maine) | **−8.97 /RSI net** (incl. biogenic, TRACI); R-3.4–3.7/in; 44 perm/in; ICC-ES ESR-5387; CertainTeed is the exclusive Canadian distributor | included | E-THP | [SN] / [S] |
| Graphite EPS (BASF Neopor / Beaver Plastics Chrome, available in BC) | **1.47 /RSI** | 0 | CLF-G | [S2] |
| EPS-IA Type 1 average | 2.54 /RSI | 0 | CLF-G | [S2] |
| Owens Corning FOAMULAR NGX (HFO XPS) | **6.58 /RSI** A1–A3; 9.85 A1–A5 + C. Summary label mis-templated, values match the agent's OCL read. | 0 | E-OCX (Pub. 10024902-C, EPD valid 10 Jan 2024 – 9 Jan 2029) | [S] |
| Legacy HFC XPS, 25 psi | 20.2 /RSI A1–A3; 46.5 incl. blowing-agent release (A5/B1) | 0 | S2 via agent (One Click LCA) + calc | [S2]/[I] |
| Soprema Sopra-XPS (BC) | 1.95 /RSI | 0 | CLF-G | [S2] |
| FOAMGLAS (North America, Sedalia MO) | T4+ **22.7 /RSI**; S3 28.0 /RSI | 0 | E-FG (Pub. 10027885, EPD valid 26 Mar 2024 – 25 Mar 2029) | [S] |
| FOAMGLAS (Europe) | S3 1.438 /kg, F 1.45 /kg | ≈ 0 | E-FG-EU | [S2] |
| Polyiso roof board | GAF EnergyGuard 1.69 /RSI (2025). CLF baseline GRF 2.20, CGF 3.04. PIMA 2020 industry EPD (expired Feb 2026): **life-cycle total** 4.36 (GRF) / 5.96 (CGF) /RSI | 0 | S2 via agent (OCL, GAF EPD11106); CLF-G; E-PIMA (EPD10465) | [S2]/[S] |
| ROCKWOOL Toprock DD (roof) | 5.63 /RSI | 0 | look-up bulletin (agent) | [SN] |
| SBS 2-ply (ARMA industry) | ≈ 5.8 kg/m² (base 2.66 + cap 3.18) | — | ARMA | [SN]/[I] |
| Ready-mix concrete, Concrete BC industry EPD | 25 MPa non-air: baseline (GU + 20 % SCM) **219.70**; GUL + 40 % SCM 171.07. 25 MPa air F-2: baseline 230.52; GU 270.02; GUL 250.48; GUL + 25 % SCM 205.65; GUL + 40 % 178.62. 30 MPa F-2: 269.83 / GUL + 40 % 208.85. 32 MPa C-2: 285.31 / GUL + 40 % 220.11. All kg/m³, 28 d, cradle-to-gate. | 0 | E-CBC (EPD 348, ASTM, 27 Jul 2022 – 27 Jul 2027), Tables 8–12 | [S] |
| Low-carbon mixes, Metro Vancouver | Lafarge 111 / 123 / 132 (25 / 30 / 35 MPa, **56 d**); Heidelberg 90 / 148 / 138 (**91 d**; 30 MPa value flagged as a possible typo); Burnco 166 / 184 / 201 (56 d) | 0 | CLF-G (concrete data as of Jul 2024) | [S2] |
| Rebar | CRSI average 0.85 kg/kg; Nucor Seattle 0.53 | 0 | CLF-G | [S2] |
| Steel HSS (proxy for helical pile shafts) | **1.71 kg/kg** A1–A3 (industry average, North America) | 0 | E-HSS (Steel Tube Institute, UL 4790021087.101.1, 1 Jul 2021) | [S] |
| Softwood plywood (North America) | **219.32 kg/m³** A1–A3 (484 kg/m³) → 12.5 mm = 2.74 kg/m² | ≈ −10.3 kg/m² for 12 mm (EU generic −10.29) | E-PLY (AWC/CWC UL 4788424634.103.1); OEK | [S]/[I] |
| WRC bevel siding (½ × 6, 4.65 kg oven-dry wood/m²) | per m²: A1 fossil 0.91, A2 0.25, A3 0.26 → **A1–A3 fossil 1.42**; A1 biogenic removal −3.95; B2 maintenance (repaint every 15 yr) 5.56 fossil; cradle-to-grave total 3.93 | see left | E-WRC (WRCLA / FPInnovations, Jul 2025 – Jul 2030) | [S] |
| Thermally modified timber cladding | Moelven TMT pine 21 mm **6.50 kg/m²**; Stora Enso ThermoWood 114 kg/m³ → 2.4 kg/m² at 21 mm; Lunawood 3.0 kg/m² (CLF) | ≈ 15 kg CO2/m² stored | MOELVEN (NEPD-11611-11528); agent; CLF-G | [S2]/[SN]/[I] |
| James Hardie fibre cement (North America) | Plank/Panel HZ10 **6.84** fossil (4.90 total); HZ5 7.63 / 5.70; Backer 0.42" 7.05 — kg/m² installed, RSL 50 yr, landfill end of life | ≈ 0 | E-HJ (S-P-05037, valid to 21 Dec 2027) | [S] |
| Cement mortar 1:3 (proxy for stucco) | 0.2 kg/kg (ICE v3) | 0 | ICE-mortar | [S2] |
| CLT (EPD median) | 0.26 kg/kg excl. biogenic (81 EPDs) | large | RAS21 | [S] (abstract) |
| Metals, per kg | prefinished steel coil 2.60–2.75 (EU); stainless all-grade 2.90; zinc (VMZINC) 3.77–4.37; copper (EU, high recycled content) 0.38–0.96; aluminium ingot (Norway) 4.17–4.95 | — | S2 via agent (OCL listings; Wikipedia for stainless) | [S2] |

### 3.2 Reference-pavilion roll-up

A1–A3 fossil, differing layers only. Areas assumed [I]:

| item | quantity |
|---|---|
| walls | 50 m perimeter × 3.0 m = 150 m² |
| floor | 150 m² |
| roof incl. 600 mm eaves | 181 m² |
| base flashing | 50 m |
| roof edge | 55 m |

| item | current (t CO2e) | recommended (t) | recommended, no green roof (t) |
|---|---|---|---|
| walls (§4) | 3.7–4.2 | 1.7–2.1 | 1.7–2.1 |
| floor (§6) | 5.9 | 2.4–3.3 | 2.4–3.3 |
| perimeter footing + stem + plinth insulation (§5) | 4.2 | 1.8–2.4 | 1.8–2.4 |
| roof (§7) | 3.1–3.8 | 3.8–6.5 | 3.1–3.8 |
| metals (§8) | 0.3 | 0.3 | 0.3 |
| **total** | **17.1–18.4** | **9.9–14.5** | **9.2–11.8** |

Calculated with `scratchpad/opt09/rollup.mjs`. Gypsum, studs, joists, deck, AVB, cover board, windows and the WRB are excluded as common to all options.

---

## 4. (a) Exterior wall assembly and cladding

**Common to all options** (excluded from the carbon comparison): 12.7 mm gypsum, interior air/vapour control layer, studs/plates (except W5/W6), sheathing membrane, PT strapping (≈ 0.3 kg/m² [I]), paint.

### 4.1 Wall alternatives (structure + insulation)

The cladding is held at **cedar** so that the insulation strategies compare like-for-like, except W0 (current) and W3/W4 as described.

| id | assembly | effective RSI [I] | moisture (Vancouver) | A1–A3 fossil, differing layers [I] | biogenic stored [I] | look | code path | cost tier [I] |
|---|---|---|---|---|---|---|---|---|
| **W0 current** | 2×6 at 400, FG R-20, poly, 12 ply, breather membrane, 50 mm Comfortboard 80, 19 PT cavity, 25 mm three-coat stucco on lath | 4.36 (4.29 with penalty) [I, matches brief] | Rainscreen meets 9.27.2.2. Stone wool is vapour-open (≈ 1,768 ng/Pa·s·m² [S2]) and dries outward. **But:** stucco is heavy, cracks and wets [S, 02:ev.cement-render.cracking-trapping]. Cavity stucco cracks more if not moist-cured [S, 07:CMHC 7-17]. Coastal BC failure history is tied to stucco and face-sealed cladding [S2, LEAKY]. | FG 3.4 + ply 2.7 + board 5.9–6.9 + stucco 12.6–14.8 = **24.6–27.8** | ply ≈ 10 | Crisp monolithic render. Hairline cracks, algae streaks under sills and at the base, recoat at ~10 yr [S, 06:CMHC-BPG Table 9.2]. | Part 9 (9.28) ✓ | $$ |
| **W1** | 2×6 at 400, **dense-pack cellulose**, poly, 12 ply, breather membrane, **80 mm wood-fibre board**, 19 PT cavity, **cedar** | **4.94** at λ 0.040 (4.84 with penalty); 4.80/4.71 at λ 0.043 | Fully vapour-open outward: WF μ ≈ 3–4 [S/S2], 80 mm ≈ 1,300 ng/Pa·s·m² class [I]. The sheathing stays warm. **Exterior insulation improves sheathing drying in Vancouver monitoring** [S, 03:ev.assembly.rainscreen-performance, Finch 2007]. WF is hygroscopic and capillary-active: tolerant of short wetting, but **must be kept out of the splash zone and off standing water** (German plinth zoning [S, 03:Caparol]; DIN 68800-2 ≥ 30 cm wood-to-ground [SN, DIN68800]). **No PNW field study found** (gap). The WRB on the sheathing remains the code drainage plane; the WF face is a second, outer drainage surface. | cellulose 1.7–3.9 + ply 2.7 + WF 5.0–5.7 + cedar 1.9 = **11.3–14.2** | **≈ 55** (cellulose 14 short-cycle; WF 19–21, possibly short-cycle as forestry residue, needs a City ruling; ply 10 + cedar 11.5 long-cycle) | Warm cedar weathering to silver. A uniform, matte timber surface. | Materials are of listed types (S703, S706.1, 9.27.6). **No S706.1 or CCMC evidence found for the WF products**, so expect an alternative-solution submission [I]. | $$$ (WF imported: Germany or Maine) |
| **W2** (alternate) | 2×6 at 400, **R-22 stone-wool batt**, poly, 12 ply, breather membrane, **50 or 75 mm Comfortboard 80**, 19 PT cavity, cedar | 4.55 (50) / 5.29 (75); 4.48 / 5.18 with penalty | Vapour-open, non-hygroscopic, non-combustible. Proven split-insulation route in BC (RDH/BC Housing guidance referenced in 07:RDH13; the field reports themselves were not reached). | batt 4.6–5.5 + ply 2.7 + board 5.9–6.9 (50) or 8.9–10.3 (75) + cedar 1.9 = **15.1–17.0** (50) / **18.1–20.4** (75) | ≈ 22 (ply + cedar, long-cycle) | as W1 | Part 9 ✓. Comfortboard 80 CCMC 12718-R / 13573-L [SN]; S702 [S]. | $$–$$$ |
| W3 | 2×6, FG R-20, poly, 12 ply, membrane, **50 mm graphite EPS**, cavity, **fibre-cement plank** | 4.48 (4.40) [I, λ 0.031] | EPS ≈ 50 mm is semi-permeable. 9.25.5.2 ratio passes (≈ 0.33–0.38 [I]), but outward drying of the sheathing is slower than with W1/W2 [I]. Combustible foam. | 3.4 + 2.7 + 2.4 + 6.8 = **15.3** | ≈ 10 | Crisp painted plank, repaint ≈ 15 yr (finish warranty term [SN]). Algae on north faces [I]. | Part 9 ✓ (Hardie CCMC 12678-R [SN]) | $$ |
| W4 | as W1, but **lime render** on a ventilated render-carrier board instead of cedar | ≈ 4.9 | Lime absorbs readily and is bioreceptive (greening) [S, 02:ev.lime-render.*]. Sacrificial and needs limewash cycles (no interval sourced). Wood-fibre/lime ETICS without a cavity does not meet the 9.27.2.2 capillary break. | ≥ 12–19 + render (render not quantified; lime recarbonates 80–90 % of its lime content [S2, agent: Schlegel & Shtiza 2016]) | ≈ 45 | Soft mineral; greening and patina at the base | **Part 5** (9.27.1.1.(6)) [S, V2] | $$$$ |
| W5 | **2×10 at 400 + 235 mm cellulose**, no exterior insulation, ply, membrane, cavity, cedar | 4.58 [I] | All insulation inboard: **cold sheathing, higher winter moisture content**. Vancouver evidence favours exterior insulation for sheathing drying [S, 03]. Deeper reveals. | cellulose 2.8–6.6 + ply 2.7 + cedar 1.9 + extra framing (not quantified) ≈ **7–11+** | ≈ 60+ | as W1, thicker reveals | Part 9 ✓ (simplest) | $$ |
| W6 | **3-ply CLT 105 mm + 120 mm WF + cedar** | ≈ 4.2 [I] | Vapour-open. Needs weather protection during erection. | CLT ≈ 12.8 (0.26 kg/kg × ≈ 49 kg/m²) + WF ≈ 7.5 + cedar 1.9 ≈ **22** | ≈ 130 | as W1, deep timber reveals | **Part 4** structure; CLT not in Part 9 | $$$$ |

Thermal arithmetic for all rows: `scratchpad/opt09/rsi.mjs` [I]. Note that 2×8 + cellulose without exterior insulation reaches only 3.70, which fails 3.85.

### 4.2 Cladding options

These sit on the W1/W2 back-up. Values are per m² of cladding.

| cladding | A1–A3 fossil | biogenic stored | durability / service life | Vancouver weathering and look 0 / 5 / 15 / 30 yr [I unless tagged] | maintenance | base detail | code |
|---|---|---|---|---|---|---|---|
| **WRC 19 mm channel / shiplap, horizontal, textured, bleaching oil, then left to weather** (preferred) | ≈ 1.9 [I, scaled from E-WRC 1.42 for 4.65 kg] | ≈ 11.5 (long-cycle) [I] | Heartwood EN 350 class 2 [S, 02]. The EPD assumes 50 yr [S, E-WRC]. Real Cedar: unfinished cedar "performs satisfactorily" but tends to a "dark, blotchy, grey" look [S2, RC]. | Red-brown / silver-grey, darker where shaded and in the splash band / even grey with fine checks, top 150 mm under the eave browner (O/4 shelter band [S, 03]) / grey; lowest boards may need replacing | Gentle annual wash [SN, RC]. Re-apply bleaching oil if uneven ("periodically" [S2, RC]; no interval sourced). No repaint cycle, which removes the EPD's B2 paint burden of 5.56 kg/m² [S]. | ≥ 200 mm to grade (9.27.2.4 [S, 03]); ≈ 6–10 mm above flashing, never caulked [S2, RC; 06]; end grain sealed [S2, RC]; **stainless ring-shank, 316 at seacoast** [S2, RC] | 9.27.6 ✓ |
| WRC, semi-transparent stain | as above + coating | ≈ 11.5 | as above | Even warm colour; fades by 3–6 yr | Restain every 3–6 yr [SN]; BC Housing repaints wood ≈ 7 yr [S, 03:MM01] | as above | ✓ |
| BC thermally modified hem-fir / pine (Western Forest Products kiln, Vancouver Island [S2, WFP]) | 2.4–6.5 [S2/I] | ≈ 15 [I] | Vendor claims EN 350 class 1–2 (conflicting) [SN]; greying slowed, not stopped [S, 02:ev.tmt.weathering] | Chocolate brown / patchy silver / even grey, very stable boards / grey | Optional UV-pigmented oil | **≥ 300 mm to ground; stainless only** [SN, Thermory]; ≥ 25 mm vent gap recommended by the vendor [SN] | 9.27.6 as lumber (confirm with AHJ) [I] |
| Charred (yakisugi) | no EPD | species value | **No reliable decay or fire gain** [S, HAS21]; char cracks admit water [S, KYM22] | Matte black / black with rub-off / brown-grey on weather faces / char wears in the splash band | Re-oil (no interval) | as wood | 9.27.6 |
| Larch / Douglas fir | ≈ 3.1–3.4 [I] | 16–18 [I] | Moderately durable (larch EN 350 3–4) [S, 02] | Orange-tan / silver, resin bleed / grey, end checks / lower courses replaced | as WRC | as wood | 9.27.6 |
| Fibre cement (Hardie HZ10) | **6.84** [S] | ≈ 0 | RSL 50 yr [S, E-HJ]; finish warranty 15 yr [SN] | Crisp painted / unchanged, algae on north / repaint / second repaint, sealant renewal | Repaint ≈ 15 yr | ¼" above flashing, not caulked [S, 06:JH] | ✓ CCMC 12678-R [SN] |
| Three-coat stucco 25 mm (current) | 12.6–14.8 [I] | 0 | — | Crisp / hairline cracks, streaks / recoat at 10 yr [S, 06] / patch + recoat | Recoat ≈ 10 yr | ≥ 200 mm; casing bead ≥ 10 mm above flashing [06] | 9.28 ✓ |
| Lime render | not quantified | 0 (recarbonates) | Sacrificial [S, 02] | Soft / greening / limewash cycles / depends on detailing | Limewash (no interval sourced) | needs Part 5 | Part 5 |
| Clay brick veneer | not obtained; highest fossil use among sidings in the WRCLA LCA [S2]; thin brick 12.0 [S2, CLF-G] | 0 | Long | Crisp / possible efflorescence / moss in shaded joints / stable | Repointing | 25 mm air space; bearing ledge; ~160–180 kg/m² [S/I, agent: 9.20] | 9.20 ✓ |

### 4.3 Decision matrix: wall + cladding

| option | look | thermal | moisture | sustainability | Σ4 | code path | cost |
|---|---|---|---|---|---|---|---|
| W0 current (MW + stucco) | 3 | 4 | 3 | 2 | 12 | Part 9 | $$ |
| **W1 cellulose + WF 80 + WRC** | **5** | **5** | 4 | **5** | **19** | Part 9 materials; WF product evidence → alternative solution | $$$ |
| **W2 MW batt + MW board + WRC** | **5** | 4–5 | **5** | 3 | **17–18** | Part 9 + CCMC | $$–$$$ |
| W3 FG + graphite EPS + fibre cement | 3 | 4 | 3 | 3 | 13 | Part 9 | $$ |
| W4 cellulose + WF + lime render | 4 | 5 | 2 | 4 | 15 | Part 5 | $$$$ |
| W5 2×10 cellulose, no exterior insulation, WRC | 4 | 4 | 3 | 5 | 16 | Part 9 | $$ |
| W6 CLT + WF + WRC | 5 | 4 | 4 | 4 | 17 | Part 4 | $$$$ |

Score reasons [I]:
- **Look.** Timber options give a repairable, ageing surface. Stucco and fibre cement need recoats and crack at joints.
- **Thermal.** Scored on RSI margin and continuity of the exterior layer.
- **Moisture.** Vapour-open exterior insulation plus a drained cavity scores best. Hygroscopic WF loses a point for the missing PNW field evidence. Render options lose points for absorption and cracking.
- **Sustainability.** Scored on fossil A1–A3, storage, health and end of life:
  - WF and cellulose are plant-based, with small PUR resin and fire-retardant additives.
  - The stone-wool HPD declares a phenol-formaldehyde binder (0–5 %) and an LT-1-flagged dedusting agent (0–1 %) [S, RW-HPD].
  - Fibre cement has a silica-dust cutting hazard and goes to landfill [SN].
  - Cedar boards are individually replaceable and re-usable.

### 4.4 Recommendation (a)

**Preferred: W1, with horizontal WRC channel siding.**

1. Cavity: dense-pack cellulose. Cellulose is sold in the Lower Mainland (Soprema, Applegate-Greenfiber [S2, CLF-G]); confirm the product's CAN/ULC-S703 listing.
2. Interior: 6 mil poly, or another membrane that meets the VBBL 9.25.4 vapour-barrier permeance limit (clause text not re-read this session). A variable-permeance retarder is acceptable only if its dry-cup data meets that limit; it adds summer inward drying [I].
3. 12 mm plywood, kept as the bracing panel for Vancouver seismic panels.
4. Breather sheathing membrane (CAN/CGSB-51.32), shingle-lapped. It stays the code drainage plane.
5. **80 mm wood-fibre board**, dry-process, hydrophobized, ≈ 140–160 kg/m³, λ ≈ 0.040. Candidate products:
   - GUTEX Multitherm or Thermowall
   - STEICO protect / universal dry
   - TimberHP TimberBoard (via CertainTeed in Canada)

   Require the supplier to evidence **CAN/ULC-S706.1** conformity, or submit an alternative solution.
6. 19×64 PT strapping on stud lines, screwed through the WF into the studs (stainless or ≥ Z550 HDG screws).
7. 19 mm drained, vented cavity, insect-screened at bottom and top (06).
8. 19 mm WRC channel siding, textured face, factory bleaching oil, stainless 304 ring-shank nails or screws (316 near salt water).

**Why horizontal siding.** It keeps a **single 19 mm cavity**. Vertical boards would need counter-battens, making a cavity over 25 mm, which triggers fire blocks under 9.10.16.2 (07 G6) [I].

**Alternate: W2.** Same cladding and cavity, with R-22 stone-wool batts and 50 mm (RSI 4.48) or 75 mm (5.18) Comfortboard 80. Choose it if:
- the City will not accept the WF board without a CCMC evaluation, or
- imported WF supply is uncertain, or
- non-combustible exterior insulation is wanted (for example a Group A building with limiting-distance constraints, not checked here).

The carbon penalty versus W1 is ≈ +4 to +7 kg/m² fossil and ≈ −33 kg/m² stored [I].

**Cladding alternate:** BC thermally modified hem-fir. It is more dimensionally stable and greys more evenly, but needs ≥ 300 mm to grade (met at +310 or more) and stainless fixings. Its BC supply is new.

**Trade-offs accepted:**
- Cedar needs a gentle annual wash and occasional board replacement in the splash band.
- WF needs strict base and opening details (§9).
- W1 depends on product evidence, as above.

---

## 5. (b) Plinth / foundation wall (above and below grade)

**Common to all:** footing capillary break, damp-proofing, drain and backfill per 07 E. Foundation top at **+300** (06 A.1; also matches the German 0–300 mm splash zone [S, 03] and the DIN 68800-2 30 cm rule [SN]).

### 5.1 Alternatives

| id | assembly | thermal [I] | moisture / durability | A1–A3 fossil per m run [I] | look | code path | cost [I] |
|---|---|---|---|---|---|---|---|
| **P0 current** | 200 stem + 550×250 footing (Concrete BC baseline concrete), 50 mm XPS outside, 12 mm parging on lath, damp-proofing | XPS 50 mm ≈ RSI 1.7–1.8; continuous with the wall above only via the flashing | Parging over foam cracks at board joints and in the splash band, and can delaminate on freeze–thaw (≈ 37 air cycles/yr [S, 03]) [I]. XPS below grade: low uptake in short-term lab tests [SN]; mixed long-term field data. | concrete + rebar ≈ 74.4 (agent: 0.2875 m³/m) + XPS ≈ 8.6 (NGX) = **≈ 83** | Grey parged band; cracks and algae | Part 9 (+ Part 4 for reinforced concrete, 9.3.1.1) | $$ |
| **P1 preferred** | Stem 150–200 and footing **sized by the engineer** (Part 4 applies anyway). **Exposed stem: 25 MPa F-2 air-entrained** GUL + 25–40 % SCM (206–179 kg/m³ [S, E-CBC]); **C-2 32 MPa** (≤ 220 with GUL + 40 % SCM) where de-icer splash from paths is possible. **Footing: 56-day low-carbon** (≈ 111 [S2]) if the engineer accepts later-age strength. **100 mm graphite EPS Type 2** from the footing top to +300. **12 mm cement parging on wire lath** with a mineral (silicate) finish in a dark grey, from +300 to −200 (Caparol "plinth" zone, 30 cm above to 20 cm below grade [S, 03]), control joints ≤ 3 m [I]. | EPS 100 mm ≈ **RSI 3.1–3.2** [I, λ 0.031–0.032], continuous with the wall WF above and the slab EPS inside. ≥ RSI 1.32 (90.1 below-grade). For the house-table 3.85, if the City counts the 300 mm upstand as a "foundation wall" (07 open question), use 125 mm. | Drained backfill. EPS long-term uptake below grade is disputed (industry-sponsored studies both ways: EPS 4.8 % vs XPS 18.9 % vol after 15 yr in one; the reverse in another [S2, EPS-moist]). Any uptake is limited by the drain. The parging sits ≈ 30 mm behind the base-flashing drip, so cladding runoff falls clear of it [I, §9]. **High-SCM mixes gain strength slowly in the Oct–Mar wet season, so plan curing and protection** [S2/I, agent]. | concrete + rebar **≈ 29–41** (agent, low-carbon cases) + EPS ≈ 3.5 + parging ≈ 2 = **≈ 35–47** | **A 300 mm dark mineral band, ≈ 20 mm behind the cedar face**, under a fine stainless drip line; the plinth reads as a shadowed base | Part 9 + Part 4; low-carbon mix = engineer's acceptance | $$ |
| **P2 alternate** | Board-formed **exposed concrete** stem (F-2/C-2 air-entrained low-carbon mix), **insulation inside**: slab-edge + under-slab EPS. **Load-bearing cellular-glass thermal-break block under the sill plate** (FOAMGLAS PERINSUL: made for use "under timber frame walls" [S2, agent]; North American SIB R-2.4/in [SN]). | Thermal bridge through the stem top and sill line, partly broken by the block. **Psi unknown, so THERM required.** Footing must stay at frost depth (450 mm; 1.2 m on clay) because heat to the soil is cut [S, 07 E2]. | Concrete is the most robust splash-zone surface; no render to crack. It carbonates and greens on shaded faces over time [S, 02:ev.concrete.*]. | concrete ≈ 50–56 [I] + block (not quantified) | **Best look:** raw board-formed texture, deep ≈ 130 mm recess under the cedar; ages to a mottled grey-green | Part 9 + Part 4; thermal-break product acceptance | $$$ |
| P3 | Helical piles + timber skirt / open perimeter (pairs with G2, §6) | n/a (the floor is insulated instead) | No concrete wicking; ventilated underfloor | piles ≈ **18.5 per m** (10.8 kg steel/m × 1.71) + galvanizing (not quantified) | The building "floats"; a shadow gap; ground continues under | **Part 4** (no Part 9 pile rules); Techno Metal Post CCMC 13059-R exists [S2] | $$$ |
| P4 | ICF stem (EPS both faces) | good | EPS above grade needs protection | not computed | Parged band | ICF in 9.15 is limited to single dwelling units → **Part 4** for a pavilion [S2, agent] | $$ |
| P5 | Insulated raft / frost-protected shallow foundation (e.g. Legalett) | best continuity | EPS under and around | not derivable. A Vancouver Part 9 study found **raft slabs with grade beams increased embodied carbon** [S, UBC20]. | Low plinth | **Part 4, P.Eng stamp** [S2, LEG; S, V2 9.16.1.2]. 9.25.2.3.(5) heat-to-ground rule applies. | $$$ |

### 5.2 Decision matrix: plinth

| option | look | thermal | moisture | sustainability | Σ4 | code | cost |
|---|---|---|---|---|---|---|---|
| P0 current | 2 | 3 | 3 | 2 | 10 | Part 9 + 4 | $$ |
| **P1 low-carbon stem + 100 graphite EPS + mineral parging** | 3 | **5** | 4 | **4** | **16** | Part 9 + 4 | $$ |
| **P2 exposed board-formed, interior-insulated** | **5** | 3 | **5** | 3 | **16** | Part 9 + 4 + product | $$$ |
| P3 helical piles (with G2) | 4 | n/a (3) | 4 | 5 | 16 | Part 4 | $$$ |
| P4 ICF | 2 | 4 | 3 | 3 | 12 | Part 4 | $$ |
| P5 raft / FPSF | 3 | 5 | 4 | 2 | 14 | Part 4 | $$$ |

### 5.3 Recommendation (b)

**Preferred: P1.** It keeps the exterior insulation plane **continuous from the wall's WF down to the footing**. That is the only option here whose thermal performance is reliable without a 2-D model. It also halves the perimeter carbon.

**Alternate: P2.** Pick it if the architect values the plinth's material expression above thermal certainty and is willing to commission a THERM check. P1 and P2 tie on Σ4; P1 is preferred because its weakness (render maintenance) is visible and repairable, while P2's weakness (a hidden cold sill line) is not.

---

## 6. (c) Ground floor

**Common to all:** finished floor at +300; interior finishes excluded.

### 6.1 Alternatives

| id | assembly | thermal [I] | moisture / radon | A1–A3 fossil per m² floor [I] | look from outside | code path | cost [I] |
|---|---|---|---|---|---|---|---|
| **G0 current** | 100 mm slab (baseline 25 MPa), 0.25 mm poly, 2 × 38 XPS, 75 mm edge XPS, 100 mm clear stone | 2.66 + films ≈ 2.8 | Good (07 D) | slab 22.0 + NGX 2.64 RSI × 6.58 = 17.4 → **≈ 39** (legacy HFC XPS ≈ 75) | plinth at +300 | Part 9 | $$ |
| **G1 preferred** | 100 mm slab in a 56-day low-carbon mix (Lafarge ≈ 111 [S2]) or 28-day GUL + 40 % SCM (171 [S]); 0.25 mm poly over **100 mm graphite EPS Type 2** (2 × 50 staggered, ≥ 110 kPa); 25 mm EPS edge isolation strip; clear stone gas layer + radon rough-in per 07 | EPS ≈ 3.1–3.2 → assembly ≈ **3.2–3.4**; ≈ 2.9 with a 10 % below-grade derate [I] | As 07 D: poly over insulation, turned up and sealed. EPS under a drained, stone-bedded slab is a mild exposure [I]. | slab 11.1–17.1 + EPS ≈ 4.6 → **≈ 16–22** | same | Part 9 (+ engineer acceptance of 56-day strength) | $$ |
| **G2 alternate** | **Raised timber floor on helical piles.** 38×235 joists at 400 + 235 mm cellulose (or WF batts), 19 mm ply subfloor, vapour-open protective underside board, **open, screened perimeter (≥ 25 % open, so not a crawl space under 9.18.1.1)**, floor ≈ +450–600 | joists + cellulose framed ≈ 4.1 + layers ≈ **4.5** ≥ 4.22 suspended floor [I] | Underfloor air is humid (RH ≈ 86 % at 06:00 [S, 03]). Use PT or durable lowest members, keep ≥ 450 mm to grade [I], gravel ground. **No soil-gas rough-in, since the floor is not in contact with the ground** (9.13.4.1 [S]). Coastal-BC underfloor mould records **not researched**. | piles ≈ 7.7 (4.5 kg steel/m² × 1.71) + floor framing / subfloor / insulation / underside ≈ 8–12 → **≈ 16–20** | **The building floats:** a dark shadow gap above continuous ground and planting | **Part 4** piles and lateral design; **VBBL 3.8 accessibility → ramp** [S, V1 1.3.3.2(5)] | $$$ |
| G3 | Slab on **foamed-glass aggregate** bed (replaces clear stone, capillary break and insulation) | 2.45 needs ≈ 210–370 mm compacted [S2/I] | Excellent capillary break and gas layer | **≈ 13–36** (Nordic EPD proxies) | same as G1 | Part 9 + alternative solution for the radon layer | $$$ (no BC supplier found; US freight) |
| G4 | Insulated raft / FPSF | high | EPS-wrapped | not derivable; raft + grade beams raised EC in the Vancouver study [S, UBC20] | low plinth | Part 4 | $$$ |

### 6.2 Decision matrix: ground floor

"Look" here means the effect on the edge seen from outside.

| option | look | thermal | moisture | sustainability | Σ4 | code | cost |
|---|---|---|---|---|---|---|---|
| G0 current | 3 | 4 | 4 | 2 | 13 | Part 9 | $$ |
| **G1 low-carbon slab + graphite EPS** | 3 | **5** | 4 | 4 | **16** | Part 9 | $$ |
| **G2 raised timber on helical piles** | **5** | 4 | 3 | **5** | **17** | Part 4 + accessibility | $$$ |
| G3 slab on FGA | 3 | 4 | 5 | 3 | 15 | alternative solution | $$$ |
| G4 raft / FPSF | 3 | 5 | 4 | 2 | 14 | Part 4 | $$$ |

### 6.3 Recommendation (c)

**Preferred: G1, despite G2's higher Σ4.** The reasons are not captured by the four criteria:
1. A public pavilion must be accessible.
2. A slab at +300 can be reached with a short graded approach; +450–600 needs a long ramp.
3. G1 keeps the proven radon and floor detail from 07 D.

G1 still cuts the floor's fossil carbon by ≈ 45–60 % against the current slab [I].

**Alternate: G2.** It is the best fit to the "living edge" idea: soil, roots, water and small animals pass under the building, and the edge is a shadow, not a wall. It also has the lowest concrete use, and the piles can be removed and reused at end of life [I]. Choose it if the site grading can bring an accessible route up to +450 or more, and the engineer designs piles and lateral bracing. Pair it with P3 and with the W1 or W2 wall: the wall bottom plate sits on a PT rim, with the flashing logic of §9 applied to the rim.

---

## 7. (d) Roof and eave, including a green / biodiverse roof

**Common to all:** 38×235 joists, 16 mm ply deck (≈ 3.5 kg/m² [I]), self-adhered AVB, wall-line blocking and air seal (06 B), 600 mm cantilever.

**Rejected outright:**
- **Vented low-slope joist roofs:** mould and decay in coastal BC even when code-compliant [S, 06:BCH-BI21].
- **Wood-fibre boards sealed between the AVB and the membrane:** no approval for use under bituminous membranes found [SN], and no drying path [I].

### 7.1 Alternatives

| id | build-up | effective RSI [I] | moisture | A1–A3 fossil per m², insulation + membrane (+ green layer) [I] | biogenic | service life / maintenance | look | code path | cost [I] |
|---|---|---|---|---|---|---|---|---|---|
| **R0 current** | SBS 2-ply, 12 mm cover board, 2 layers polyiso tapered (≈ 175 mm average) | 6.1 (R-5.0/in) – 6.8 (5.6) – 7.3 (6.05 label) + ≈ 0.3 other layers | Deck warm and dry: the most durable roof type in coastal BC [S, 06:BCH-BI21] | polyiso 6.8 RSI × 1.69–2.20 = 11.5–15.0, + SBS ≈ 5.8 → **≈ 17–21** (≈ 35 using the older PIMA life-cycle total) | 0 | Membrane replaced every 15–25 yr [S, 06]; RoofStar 5/10/15-yr guarantee with reviews [S2, RCABC-RS] | Flat roof unseen from the street; crisp metal edge; cedar soffit | Part 9 roofing / RoofStar | $$ |
| **R1 preferred** | R0 + **extensive biodiverse green roof**: root-resistant SBS cap (FLL-tested), drainage/retention mat, filter fleece, ≈ 100 mm mineral substrate with varied depths, native coastal meadow + sedum, deadwood/sand patches, **vegetation-free gravel strip at the eave and at penetrations** | as R0 (substrate thermal benefit ignored) | Membrane shielded from UV and thermal cycling. Life-extension claims are weak (Portland "~40 years"; Carter & Keeler "> 200 %" via Wikipedia [S2]). Leaks are harder to locate (leak detection is generally optional [SN]). Root barrier is essential. | R0 + green layer **≈ 4–15** (Knauf Urbanspace 40 mm 3.97 [SN]; sedum mat 6.30 [SN]; EPS drainage panel ≈ 1.3 [SN/I]) → **≈ 21–36** | small | **RCABC RoofStar Vegetated Roof Guarantee** (since 1 Nov 2024) **with mandatory maintenance** by credentialed providers [S2, RCABC-RS]. Weeding and watering in the first 2 years; drain checks [S2, Portland]. | From the street: unchanged crisp edge. From a distance or above: a soft green-brown fringe and seasonal colour; habitat. | Part 4 structural check (saturated 95–110 kg/m² ≈ **0.93–1.08 kPa** for 90–100 mm systems [S2, ZINCO]; 150 mm ≈ 1.7–2.1 kPa [I]). Wind: CSA A123.24 is referenced in VBBL Part 5 [S, V1]. | $$$ |
| **R2 alternate** | R0 with **graphite EPS** (≈ 210–220 mm for RSI 6.8) or **current low-GWP polyiso**, cover board, **self-adhered** SBS (no torch on EPS), light cap sheet; no vegetation | ≈ 6.8 | as R0 | EPS 6.8 × 1.47 = 10.0 + 5.8 → **≈ 16** (polyiso: 17–21) | 0 | as R0 | as R0 (≈ 40 mm deeper fascia with EPS) | Part 9 / RoofStar | $$ |
| R3 | Stone-wool roof board (Toprock DD), ≈ 260 mm | ≈ 6.8 | Non-combustible; water-repellent; heavy | 6.8 × 5.63 = 38 + 5.8 → **≈ 44** | 0 | as R0 | as R0 | ✓ (RoofStar-accepted, 2008 listing [S2]) | $$$ |
| R4 | Protected-membrane roof: XPS NGX above the membrane (+ green) | nominal 6.8; **field retention 16–94 %** | **Western Canada field samples: XPS moisture 0.03–74 % by volume; 13 of 38 samples kept < 50 % of R** [S2, TOU18]. Needs a water-flow-reducing layer and a rain-cooling correction [SN]. | 6.8 × 6.58 = 45 + 5.8 → **≈ 51** | 0 | Boards may need replacing | as R1 if planted | RCABC PMR practice | $$$ |
| R5 | Cellular-glass compact roof | ≈ 6.8 | Vapour-tight, fully bonded, very durable | 6.8 × 22.7 = 154 + 5.8 → **≈ 160** | 0 | Long (not sourced) | as R0 | Listing not checked | $$$$ |

### 7.2 Eave options

| id | eave construction | thermal / air | moisture | look | note |
|---|---|---|---|---|---|
| **E1 preferred (as 06 B)** | 38×235 joists cantilever 600 mm through the wall line. Full-depth blocking, sealed on 4 sides in every bay; spray-foam air tie to the deck; mineral-wool or WF infill outboard of the blocking; deck AVB pre-strip | Each joist is a small wood bridge, plus a high-risk air path in every bay [S, 06 B.3]. Psi unknown. | Overhang framing outside the envelope dries through a vented soffit [S, 06] | **600 mm overhang:** deep shadow; the top ≈ 150 mm of the wall is fully sheltered (O/4 rule [S, 03]) | Proven BC detail (BCH-BI21 Fig. 10 via 06) |
| E2 alternate | Joists stop at the wall. **Ladder/outrigger overhang applied outside the air barrier**, on the deck edge or over the insulation | Continuous air and insulation planes; the eave can be renewed separately [I] | Same | Same | No published Vancouver detail or psi found [I]. Needs engineering of the outrigger fixing through the insulation. |

Keep **600 mm**:
- 06 limits a 38×235 cantilever to ≤ 600 by analogy [S, 06].
- Overhangs measurably cut wall wetting in Lower Mainland monitoring [S, 03:ev.assembly.overhang-*].

### 7.3 Decision matrix: roof

| option | look | thermal | moisture | sustainability | Σ4 | code | cost |
|---|---|---|---|---|---|---|---|
| R0 current polyiso conventional | 3 | 5 | 5 | 3 | 16 | ✓ | $$ |
| **R1 R0 + extensive biodiverse green roof** | **5** | 5 | 4 | **4** | **18** | ✓ + Part 4 + RoofStar vegetated | $$$ |
| **R2 conventional, graphite EPS or low-GWP polyiso, no vegetation** | 3 | 5 | 5 | 4 | **17** | ✓ | $$ |
| R3 stone-wool board | 3 | 5 | 5 | 2 | 15 | ✓ | $$$ |
| R4 PMR XPS (+ green) | 4 | 3 | 2 | 2 | 11 | ✓ | $$$ |
| R5 cellular-glass compact | 3 | 5 | 5 | 1 | 14 | ? | $$$$ |

Sustainability scores count stormwater, habitat and membrane protection as well as A1–A3 [I].

### 7.4 Recommendation (d)

**Preferred: R1 + E1.**

- **Insulation.** Use polyiso from a **current product EPD** (GAF-class ≈ 1.7 /RSI [S2]; avoid the older industry-average assumption) for the thin, torch-tolerant build-up. Taper it to ≥ 150 mm at drains and ≈ 180–200 mm average. That meets the 7.04 house value and well exceeds 90.1's R-30 c.i.
- **Membrane.** SBS 2-ply with an FLL root-resistant cap.
- **Green roof.** An extensive biodiverse system ≈ 100 mm, planted with a native coastal palette, not sedum alone: pure sedum on shallow substrate "is not suited to biodiversity" [S2, ZINCO].
- **Edge.** A gravel edge strip so the eave stays crisp and inspectable.
- **Water.** Roof water goes by downspout to the rain garden, which must be **≥ 5 m from the building** [S, 07 via VBBL Note A-9.14.5.3.(2)].
- **Structure.** The Part 4 engineer checks the 38×235 joists and the cantilever for +0.93–1.08 kPa saturated plus snow.

**Alternate: R2.** Pick it if the structural upgrade or the maintenance contract is not accepted. It is the lowest-carbon roof at ≈ 16–21 kg/m².

---

## 8. (e) Base flashing, trims and fasteners: metals

Per metre of a 200 mm-girth flashing [I, agent; gauges assumed: steel 0.70 mm, stainless 0.5 mm, zinc 0.7 mm, copper 4.84 kg/m², aluminium 0.81 mm]:

| metal | kgCO2e/kg | kg/m | **kgCO2e/m** | durability, coastal Vancouver | compatibility | end of life / repair | look | cost [I] |
|---|---|---|---|---|---|---|---|---|
| Prefinished galvanized steel 24 ga (current) | 2.60–2.75 (EU coil) [S2] | ≈ 1.1 | **≈ 2.9–3.0** | Paint chalks and fades; cut-edge corrosion over decades (no Vancouver data) [I] | **PT-wood contact:** 9.23.2.4 asks for ≥ Z550 or stainless for connectors [S, V2]. Typical prefinished coil is lighter-coated, so isolate it with membrane [I]. ACQ is the most corrosive treatment to steel [S2, SST-COR]. Copper runoff attacks zinc coatings [S2]. | Recyclable; replace with the cladding | Colour-matched line | $ |
| **Stainless 304 (316 near salt water)** | 2.90 (all-grade average; ≈ 60 % recycled) [S2] | ≈ 0.8 | **≈ 2.3** | Very durable; no coating to fail [I] | ✓ PT wood (9.23.2.4(c) [S]); ✓ cement, lime and parging; ✓ cedar (Real Cedar names stainless the best choice, 316 at seacoast [S2, RC]). **Isolate from galvanized lath and zinc** (≥ 0.15 V outdoors [S2]). | ≈ 100 % recyclable; outlives the cladding, so reusable at re-clad [I] | Fine matte line (specify a dull or dark finish) | $$ |
| Zinc (VMZINC) | 3.77–4.37 [S2] | ≈ 1.0 | ≈ 3.8–4.4 | 60–100 yr at 0.7 mm, ≈ 1 µm/yr [S2] | Avoid against wet alkaline cement/lime and below copper; cedar/oak runoff guidance not found | > 95 % recycled in Europe [S2] | Blue-grey patina | $$$ |
| Copper | 0.38–0.96 (EU, high recycled content) [S2] | ≈ 1.0 | ≈ 0.4–0.9 | Centuries [S2] | **Runoff corrodes downstream galvanized steel, aluminium and zinc** [S2]. **Dissolved copper at stormwater levels (0–20 µg/L) impairs salmon olfaction** [SN, SAND07], a concern for the rain garden and the watershed. Stains masonry. | ≈ 100 % recyclable | Bright, then patina | $$$$ |
| Aluminium, prefinished | ≥ 4.2–5.0 (ingot only) [S2] | ≈ 0.44 | ≥ 1.8–2.2 | Good in air | **Alkali attack from fresh concrete, stucco and lime** [S2/I]; VBBL separates aluminium from stucco (9.28.1.5 [S, 06]). Copper ions from treated wood. | Recyclable | Colour-matched | $ |

### Decision matrix: base flashing

| option | look | thermal | moisture / durability | sustainability | Σ4 | code | cost |
|---|---|---|---|---|---|---|---|
| Prefinished galvanized 24 ga (current) | 3 | — | 3 | 3 | 9 | ✓ | $ |
| **Stainless 304/316 0.5–0.6 mm** | 4 | — | **5** | **4** | **13** | ✓ | $$ |
| Zinc | 5 | — | 3 | 3 | 11 | ✓ | $$$ |
| Copper | 5 | — | 4 | 1 | 10 | ✓ | $$$$ |
| Aluminium | 3 | — | 2 | 2 | 7 | ✓ (not on cement) | $ |

### Recommendation (e)

**Preferred:**
- **Base flashing:** stainless 304 (316 within sight of salt water), 0.5–0.6 mm, unhemmed 45° kick-out at the wall base (06 A.6).
- **Fasteners:** stainless throughout the wall: siding nails, strapping screws, flashing fasteners.
- **Insect screens:** stainless perforated (06 A14).
- **Roof:** edge metal and gutters in **24 ga prefinished galvanized steel**, per RCABC (hemmed, on a cleat; 06 B15). They are renewed with the membrane anyway.
- **Excluded:** no copper anywhere upstream of the rain garden; no aluminium against concrete, parging or PT wood.

**Alternate:** prefinished galvanized base flashing as in the current design, with self-adhered membrane isolation from PT wood and cement and with stainless fasteners. Expect renewal at the first re-cladding [I].

---

## 9. Junction compatibility of the recommended set

Datums as 06/07:
- Vertical: y = 0 at finished grade (top of gravel) at the wall face.
- Horizontal: x = 0 at the exterior face of the concrete stem, positive outward.
- All values [I] unless tagged.

### 9.1 Base of wall (A) with W1 + P1 + G1 + stainless flashing

| item | position | note |
|---|---|---|
| Foundation top / slab top | y +300 | 06 A.1 [S] |
| Sill gasket + EPDM sill membrane + 38×140 PT sill | y +300 → +341 | 06/07 [S] |
| Plywood sheathing | x 0 → +12 | bottom edge at the sill underside, never on concrete (06 A10) |
| Breather membrane | on the sheathing, shingle-lapped **over** the flashing upstand by ≥ 50 mm | VBBL 9.27.3.8 [S, 06] |
| **Sill-joint transition membrane** | Self-adhered strip from the sheathing face down over the sill/concrete joint, 75 mm onto the concrete face, **behind** the plinth EPS | Replaces the vertical flashing leg of the current detail. The CMHC 75 mm lap is kept [S, 06]. |
| **Plinth EPS** 100 mm + 12 mm parging | x 0 → +100 → +112; y footing top → +300 (parging to −200) | EPS top cut to ≥ 6 % outward fall, or capped with a tapered PT/cellular-glass strip |
| **Stainless base flashing** | Upstand top ≈ y +360 behind the membrane, fastened ≤ 300 mm o.c. into the sill at ≈ +325 (06 A.1/A11). Sloped leg ≥ 6 % from x +12 out over the EPS and parging top, to a **drip at x ≈ +144**: ≈ 13 mm past the cedar face and ≈ 32 mm past the parging face. End dams ≥ 25 mm. | 06 A11 rules [S]; 5 mm minimum drip offset met [S, 03] |
| **Bottom course of wall insulation** | An 80 mm thick × ≈ 50 mm high **XPS or cellular-glass strip** sits on the flashing; WF starts at ≈ y +355 | Keeps hygroscopic WF out of standing water and splash. Follows the German plinth-zone logic [S, 03:Caparol; SN, DIN68800]. |
| Wood-fibre board 80 mm | x +12.6 → +92.6 | Face ≈ 7 mm behind the plinth EPS face (≈ 19 mm behind the parging face): near-flush insulation planes |
| PT strapping 19×64, bottom 10 mm above the flashing; stainless insect screen | x +92.6 → +111.6 | 06 A13/A14 [S] |
| WRC channel siding 19 mm | x +111.6 → +130.6; bottom edge ≈ y +303–310, about 10 mm clear above the sloped flashing (which falls to ≈ +293 at the cladding line), left open | ≥ 200 mm to grade (VBBL) ✓; ≥ 300 mm (TMT vendor, German splash zone) ✓ |

**Control-layer continuity check (Lstiburek pen test) [I]:**

| layer | path | status |
|---|---|---|
| Water | cedar → drip; cavity water → flashing → drip; membrane water → flashing upstand → out; joint water → transition membrane → plinth face below the EPS top | continuous |
| Air (interior poly) | poly → sill bead → gasket → concrete → slab poly turn-up (07 D14) | unchanged from 07 |
| Thermal | WF (wall) → XPS strip → (flashing, thin stainless) → plinth EPS → footing top; inside: slab EPS + 25 mm edge strip | **continuous plane** apart from the stainless sheet and the footing |
| Vapour | poly warm side; everything outboard is vapour-open (WF, EPS ≈ semi-open, parging) | the concrete stem dries outward through the parging |

### 9.2 Slab edge (D)

- The under-slab graphite EPS meets the stem's inner face through the 25 mm EPS edge strip.
- The stem is now **inside** the insulation (exterior EPS), so the 07 D7 75 mm edge break is no longer the main thermal line. It becomes the isolation joint [I].
- Footing depth: insulation reduces heat to the soil, so footings go to frost depth: 450 mm, or 1.2 m on clay [S, 07 E2].

### 9.3 Wall to roof (B)

- **Insulation.** The WF runs up to the soffit line. Above the deck, polyiso. Between them, at the wall line, blocking + spray-foam air tie + **mineral-wool or WF infill** outboard of the blocking (06 B4–B6).
- **Air barrier.** Wall poly → top plate → spray foam → deck → AVB pre-strip ≥ 50 mm past the interior wall face [S, 06].
- **Cavity top.** Closed to the soffit space (VBBL 9.27.2.2.(3)), vented to outside below the soffit trim (06 B22).
- **Cedar soffit.** Vented with mesh, matching the wall cladding.
- **Green roof edge.** Gravel strip, then the RCABC metal edge with its hemmed drip (06 B15), then the gutter. The gravel keeps substrate and roots off the edge metal and allows inspection [I].

### 9.4 Metals

- **Stainless base flashing vs galvanized lath in the parging.** Keep them apart with the transition membrane, or use stainless lath [I].
- **Galvanized roof edge.** Stainless screws are acceptable (small cathode, large anode) [I].
- **No copper** above the rain garden or any galvanized or zinc part.

### 9.5 Landscape

- **Gravel strip.** Separated by geotextile and an edging, per 07 F.
- **Bench.** Stays beyond the gutter drip line (06 C).
- **Rain garden.** ≥ 5 m from the building (VBBL) [S, 07].
- **Trees on clay.** Keep clear of the footing zone (04 ev.eco.26/.27 via 07).
- **Green roof.** It and the rain garden form one water chain: roof → gutter → downspout → rain garden. The gravel strip at the wall base catches only splash and the wall's own runoff.

---

## 10. Look and ageing of the recommended edge, 0 / 5 / 15 / 30 years [I unless tagged]

| horizon | cedar wall | plinth | metals | roof | maintenance due |
|---|---|---|---|---|---|
| 0 | Warm red-brown, textured; even after the bleaching oil | Dark mineral band, sharp edges | Matte stainless drip line | Young planting; gravel edge | — |
| 5 | Silver-grey on exposed faces. Browner top band under the eave (O/4 shelter [S, 03]). Darker, mildewed splash band above the flashing on north and tree-shaded faces [S, 03:ev.assembly.orientation-drying]. | Algae on north faces; hairline cracks at control joints | Unchanged | Vegetation established | Annual wash and vegetation clearance [S, 03:MM08]. Re-oil uneven areas. Gravel top-up. Insect-screen clean. Roof maintenance twice yearly [S, 06:MM02]. Sealants ≈ 5 yr [S, 06]. |
| 15 | Even grey, fine checking; a few boards cupped near the base | Patch cracks; refresh the silicate finish | Unchanged | Membrane mid-life; roof shielded by vegetation (claimed longer life, weak evidence) | Replace isolated boards. Re-grade settled soil (07 F). Recoat the parging finish. |
| 30 | Grey, eroded ≈ 1–3 mm (bare softwood erodes 34–101 µm/yr [S, 03]). Lower 1–2 courses replaced; the rest sound if the cavity and flashing work. | Second refresh | Stainless reusable at re-clad | **Membrane replacement window** (15–25 yr [S, 06]). Green-roof layers lifted and re-laid. | Roof renewal with new edge metal. WRB/WF are inspected through the removed cladding courses. |

---

## 11. Items that need professional design or an alternative solution

| item | why | who |
|---|---|---|
| **Occupancy classification** | Group A makes this a Part 3 building: envelope under Part 5, energy under ASHRAE 90.1/NECB. D/E stays Part 9 but needs Part 4 structure [S, V1 1.3.3.2]. | Architect + City |
| **Structure** (all options) | VBBL 1.3.3.2(3): Part 4 applies to every building except ≤ 2 dwelling units [S, V1]. Footing sizes, piles, the green-roof load on the joists and cantilever, and seismic anchorage (07 D2) are engineered. | Structural engineer |
| Low-carbon (56/91-day) concrete; plinth exposure class | The engineer accepts later-age strength. The exposed stem is F-2 or C-2 air-entrained [S2/I]. | Structural engineer + supplier |
| **Wood-fibre exterior insulation** | Listed type (S706.1) but no product-level S706.1 or CCMC evidence found. The supplier's evidence or an alternative-solution submission is needed. Not a substitute for the CGSB 51.32 sheathing membrane [S2, GBA-GTX]. | Envelope consultant |
| Lime render, terracotta, any proprietary panel cladding | 9.27.1.1.(6) → Part 5 [S, V2] | Envelope professional |
| Fibre-cement plinth panel instead of parging | Alternative to 9.25.2.3.(6) [S, V2] | Minor alternative solution |
| **Linear thermal bridges** (slab edge, sill, eave joists, P2 stem) | No psi-values found; 2-D model needed | Energy / envelope consultant |
| Green roof | RCABC Vegetated Roof Guarantee; CSA A123.24 wind resistance (referenced at VBBL 5.2.2.2.(6) [S, V1]); a standard practice for dead and live loads of vegetative roofs is listed against Table 5.9.1.1 (the publisher column was garbled in the text copy) | Roofing consultant + landscape architect |
| Raised floor (G2) | Part 4 piles; accessible route (3.8); underfloor durability | Engineer + architect |
| Insulated raft / FPSF (if chosen) | 9.16.1.2 → Part 4; geotechnical report [S] | Engineer |

---

## 12. Consistency with approved and junction research (01–07)

| entry | this file | status |
|---|---|---|
| 06 A11: base flashing "24 ga prefinished galvanized steel or stainless" | Recommends stainless (galvanized as alternate) | consistent; narrows the choice |
| 06 A15a / 07 G9b: Part 9 stucco as the conventional cladding | Stucco is kept as an evaluated option but **not recommended** (carbon, cracking, leaky-condo history) | design change, not a contradiction |
| 06 B.1: exterior-insulated unvented roof | Kept (R1/R2); vented roof rejected | consistent |
| 06 B10: "Vancouver Part 10 roof target not researched" | **Closed:** roof 4.30 (performance) / 7.04 (prescriptive), attic 8.50 [S, V1] | new |
| 07 D6: 75 mm XPS needed for slab RSI 2.45 | 100 mm graphite EPS proposed instead (lower GWP; thicker) | consistent with the target |
| 07 G.2(d): exterior insulation needed to reach RSI 3.85 | Confirmed by calculation: 2×8 + cellulose without exterior insulation = 3.70 [I] | consistent |
| 07 open question "is the 200 mm stem a foundation wall (RSI 3.85)?" | Still open. P1 sizes for the pavilion path and gives the 125 mm upgrade. | open |
| 02 ev.charred-timber.decay; ev.tmt.weathering | Used to downgrade charred cladding and to describe TMT greying | consistent |
| 03 cavity 19 mm; overhang evidence | Kept: single 19 mm cavity, 600 mm overhang | consistent |
| 01 Gaps "energy rules at the plinth not researched" | Partly closed (§2.1). Part 10 house table vs pavilion path explained. | new |
| Clause numbers | Cladding agent read VBBL 2014 (unlisted cladding → 9.27.1.1(5)); **VBBL 2025 numbers it 9.27.1.1.(6)** [S, V2] | corrected here |
| **10-exterior-finish.md** (parallel appearance study, found in the folder at the end of this session; read only its §0.1 summary) | 10 recommends **charred, oiled WRC board-on-board, vertical**, on 19 mm vertical strapping + 38 mm horizontal battens (a **57 mm cavity**), over a recessed pigmented mineral plinth, with a charcoal-PVDF 24 ga steel flashing hidden in the board shadow. 09 recommends **weathered WRC horizontal channel siding** on a single 19 mm cavity, with a stainless flashing. | **Two points to resolve:** (1) A cavity over 25 mm triggers fire blocks in the furring space at ≤ 3 m vertical / ≤ 20 m horizontal (VBBL 9.10.16.2, see 07 G6). 10 does not mention this; it is detailable, but it must be drawn. (2) Charring gives no reliable decay or fire benefit [S, HAS21; 02] and needs re-oiling every 5–10 yr per 10's vendor source. On 09's four criteria, charred and weathered cedar are close on carbon (same substrate), so the choice is mainly about **look**. 10's argument that black hides uneven weathering on unprotected walls is a legitimate look criterion. **Agreement:** recessed mineral plinth, the flashing drip kept in shadow and clear of the plinth face, stainless fasteners (316 at seacoast), no zinc, galvanized or copper above moss or rain-garden zones. |

---

## 13. Could not access / gaps

- **Wood-fibre evidence.** No marine-climate (PNW, Ireland, UK coastal) field or hygrothermal study of wood-fibre exterior insulation on wood frame was found. No CAN/ULC-S706.1 scope or edition, and no product listing, was found. No BC stockist was confirmed for GUTEX, STEICO or TimberHP.
- **BC Housing documents.** *Building Envelope Guide for Houses* (2020), *R22+ Effective Walls*, *Insulated Flat Roofs* and RDH field reports were not reached: paywalled, over the size limit, or the BC Housing library failed with a TLS error. These would replace several [I] judgements.
- **Green roofs.** No green-roof system EPD with a 100 mm substrate was obtained. ZinCo EPDs exist but values were not read. No Vancouver/BCIT monitoring of green-roof retention or thermal effect. No native-plant palette source.
- **Psi-values** for the cantilevered eave, the slab edge with exterior stem insulation, and the P2 sill thermal break.
- **North American EPDs.** No EPS Type 2 EPD (Plasti-Fab) and no NAIMA batt EPD values; CLF guide values were used. No brick veneer per-m² GWP. No lime render GWP.
- **Missing values.** Screw-pile galvanizing GWP; accessibility ramp geometry; Vancouver ISO 9223 corrosivity category.
- **City pages.** The City's Embodied Carbon Guidelines PDF and rezoning bulletin (vancouver.ca 403); values came via secondary pages.
- **Cost.** All cost tiers are judgement; no BC unit-price source was used.
- **Search budget.** The session's shared web-search budget was exhausted during the subagent research, so some items stayed at [SN].

---

## 14. Sources

**Codes and policy**
- **V1:** City of Vancouver, *Vancouver Building By-law 2025*, Book I Vol. 1, convenience copy v4.01. Div A 1.3.3.2–1.3.3.3; Div B 10.2.1.1–10.2.1.4, 10.2.2.2–10.2.2.3, **Table 10.2.2.6 (pdf p.821)**, 10.4.1.1–10.4.1.2, Note A-10.4.1.1.(1)(a); Table 5.9.1.1 / 5.2.2.2.(6) green-roof references. https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf. Read from the text layer extracted in the 07 session (vancouver.ca returned 403 to WebFetch today). [S]
- **V2:** same by-law, Vol. 2 (Part 9), v3.00. 9.13.4.1–2, 9.16.1.2, 9.18.1.1, 9.18.3, 9.23.2.3–2.4, 9.25.2.2–2.3, 9.25.5.1–5.2, Table 9.25.5.2, 9.27.1.1, 9.27.6.1. https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf. Read the same way. [S]
- **CoV-A2:** City of Vancouver, *Appendix II: Embodied Carbon Assessment Guide for Low-rise Residential Buildings (Part 9)*, Appendix to the City of Vancouver Addendum v1.0 to the National wbLCA Practitioner's Guide, last amended 8 Dec 2025. Table viii; "Carbon Storage". Third-party-hosted copy: https://capitalhomeenergy.com/wp-content/uploads/embodied-carbon-low-rise-residential-part-9-appendix-ii-2025-12-08.pdf. [S]
- **UDI:** Urban Development Institute, "City of Vancouver – Vancouver Building Bylaw" advocacy updates (entry 14 Oct 2025). https://udi.org/advocacy/updates/city-of-vancouver-vancouver-building-bylaw. [S2]
- **NRC-G:** Picken et al., *National Whole-Building Life Cycle Assessment Practitioner's Guide*, NRC Construction Research Centre, 2024, DOI 10.4224/40003365. https://nrc-publications.canada.ca/eng/view/object/?id=533906ca-65eb-4118-865d-855030d91ef2. Record [S]; content [SN].
- **PNNL-90.1:** US DOE Building Energy Codes Program / PNNL, *ANSI/ASHRAE/IES Standard 90.1-2016: Envelope* (training slides), slide 37 "Reference Table 5.5-4". Read from a copy fetched by a research agent; the energycodes.gov URL was not recorded. Other zone-4 values: Oregon BCD extract https://www.oregon.gov/bcd/codes-stand/Documents/ashrae90.1-2016-envelope.pdf [SN].
- **IG4:** Homeowner Protection Office / BC Housing, *Illustrated Guide – Energy Efficiency Requirements for Houses in BC, Climate Zone 4* (2015), p.9. https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/guides/climatezone4.pdf. [S]
- **DIN68800:** DIN 68800-2 §5.2.1.3 plinth clearances (30 cm; 15 cm with a gravel bed), as quoted in a Wolfin manufacturer brochure. https://heinze.de/m2/43/63443/pdf/86/22249686px595x842.pdf. [SN]
- **LEAKY:** Wikipedia, "Leaky condo crisis" (Barrett Commission 1998; scale; rainscreen adoption). https://en.wikipedia.org/wiki/Leaky_condo_crisis. [S2]

**EPDs and product data**
- **E-RW:** ROCKWOOL North America, *Mineral Wool Board and Batt Insulation Products* EPD, UL Solutions, decl. 4790711618.101.3, issued 24 Feb 2025, updated Mar 2026. Appendix B Tables B1/B2; plants incl. Grand Forks BC. https://www.rockwool.com/siteassets/o2-rockwool/documentation/epd/rockwool-stone-wool-environmental-product-declaration-epd.pdf (read from a fetched copy). [S]
- **RW-TDS:** ROCKWOOL Comfortboard 80 technical data sheet (R-4.2/in, RSI 0.74/25.4 mm, 128 kg/m³, CAN/ULC-S702 Type 1). Product page https://www.rockwool.com/north-america/applications/products/comfortboard-80. [S]
- **RW-HPD:** HPD v2.3 "ROCKWOOL Comfortboard 80 and 110", ID 142710888448 (hazard screening 2025-05-13). URL not recorded. [S]
- **E-GTX:** GUTEX, *Wood fibre insulation boards* EPD, IBU, EPD-GTX-20250702-IBC1-DE, issued 17 Mar 2026, expires 16 Mar 2031. Copy also listed at https://www.sto.de/cepcom/de/Dokumente/Service-Tools/EPD/Holzfaserdaemmplatten-(1).pdf. [S]
- **E-STE:** STEICO, *Wood fibre insulation boards (dry process)* EPD, IBU, EPD-STE-20200173-IBA1-EN, 20 Nov 2020 – 19 Nov 2025 (expired). Listing https://asbp.org.uk/epd/steico-woodfibre-dry. [S]. Newer STEICO EPD Norge values via One Click LCA: https://materials.oneclicklca.com/se/manufacturer/steico. [S2]
- **E-THP:** TimberHP TimberBoard product page https://www.timberhp.com/products/timberboard [S]. EPD HUB-6324 https://www.arcat.com/datasheets/timberhp/TimberHP_TimberBoard_Published_EPD.pdf [SN]. CertainTeed distribution https://hardlines.ca/gp_dailynews/certainteed-and-timberhp-enter-partnership [S].
- **E-OCX:** Owens Corning, *Product Environmental Footprint Summary – FOAMULAR NGX XPS*, Pub. 10024902-C (Jul 2025; EPD valid 10 Jan 2024 – 9 Jan 2029). https://www.owenscorning.com/dms/10024902. [S]
- **E-FG:** Owens Corning / Pittsburgh Corning, *Product Environmental Footprint Summary – FOAMGLAS*, Pub. 10027885 (Apr 2025; EPD valid 26 Mar 2024 – 25 Mar 2029). https://www.owenscorning.com/dms/10027885. [S]
- **E-FG-EU:** FOAMGLAS S3 IBU EPD (heinze.de HTML). https://www.heinze.de/epd/foamglas-s3/f0b20a40-b4cb-4c34-9f2e-145e3d9af024/. [S2]
- **E-PIMA:** Polyisocyanurate Insulation Manufacturers Association, *Polyiso Roof Insulation Boards* EPD, UL, EPD10465, issued 4 Nov 2020, valid to 28 Feb 2026. Tables 10/14. URL not recorded. [S]. GAF EnergyGuard Tapered (EPD11106): https://materials.oneclicklca.com/en/material/polyisocyanurate-insulation-board-for-roof/69ebb95c7834952303679796. [S2]
- **E-CBC:** Concrete BC, *Member Industry-Wide EPD for Ready-Mixed Concrete*, ASTM International, EPD 348, 27 Jul 2022 – 27 Jul 2027. Tables 8–12. https://concretebc.ca/wp-content/uploads/2022/10/810.CRMCA_EPD_BC.pdf. [S]
- **CLF-G:** CLF British Columbia (ZEIC), *Low-Carbon Material Sourcing Guide*, updated 9 Feb 2026 (EC3 data, A1–A3). https://clfbritishcolumbia.com/low-carbon-material-sourcing-guide/. [S2]
- **E-WRC:** WRCLA / FPInnovations, *Typical Western Red Cedar Bevel Siding ½ × 6 Clear Grade, Stained* EPD, issued Jul 2025, valid to Jul 2030. https://cms.realcedar.com/wp-content/uploads/2025/07/20250714-EPD_WesternRedCedar_Sidng.pdf. [S]
- **E-HJ:** James Hardie, *Fiber Cement Products* EPD, International EPD System S-P-05037, valid to 21 Dec 2027. https://www.environdec.com/library/epd5037. [S]
- **E-PLY:** AWC / CWC, *North American Softwood Plywood* EPD, UL 4788424634.103.1, Table 8. https://awc.org/wp-content/uploads/2021/11/AWC_EPD_NorthAmericanSoftwoodPlywood_20200605.pdf. [S]
- **E-HSS:** Steel Tube Institute, *Hollow Structural Sections* industry-average EPD, UL 4790021087.101.1, 1 Jul 2021, Table 2. URL not recorded. [S]
- **OEK:** OEKOBAU.DAT generic blown cellulose dataset. https://www.oekobaudat.de/OEKOBAU.DAT/datasetdetail/process.xhtml?lang=en&uuid=5fac6347-55b0-47be-9118-d8229d7e62c4&version=20.26.070. [S2]
- **MOELVEN:** Moelven TMT pine cladding, NEPD-11611-11528 (One Click LCA). https://materials.oneclicklca.com/en/material/exterior-cladding-panel-from-thermally-modified-pine-with-colored-oil-coating-for-building-facades/6a3587f10fbb2e2a98e937a1. [S2]
- **ICE-mortar:** ICE v3 cement mortar 1:3 factor via Climatiq. https://www.climatiq.io/data/emission-factor/11890229-3b54-46b0-a5b3-82002fadf549. [S2]
- **ZINCO:** ZinCo system pages: Sedum Carpet, Rockery Type Plants, Biodiversity Green Roof. https://zinco-greenroof.com/systems/sedum-carpet ; https://zinco-greenroof.com/systems/rockery-type-plants ; https://zinco-greenroof.com/systems/biodiversity-green-roof. [S2]
- **GR-EPD:** Knauf Urbanspace extensive (IBU 2016, 3.97 kg/m²); Swedish sedum mat EPD (6.30 kg/m²); Soprema EPS drainage panel. Search summary; e.g. https://materials.oneclicklca.com/en/material/extensive-green-roof-system/582b89f17d1eebfaeba2ab24. [SN]
- **RCABC-RS:** RCABC RoofStar Guarantee program details; Vegetated Roof Guarantee release (2024). https://www.rcabc.org/roofstar-guarantee/program-details/ ; https://www.rcabc.org/rcabc-launches-new-green-roofing-program/. [S2]
- **ARMA:** ARMA SBS torch-applied EPD 103.2 (IKO-hosted). https://www.iko.com/comm/wp-content/uploads/sites/7/2024/06/103.2_ARMA-SBS-Torch-Applied.pdf. [SN]
- **BSI-502:** Building Science Corp., Info-502 "Temperature dependence of R-values in polyiso roof insulation". https://www.buildingscience.com/documents/information-sheets/info-502-temperature-dependent-r-value. [S2]
- **TOU18:** Tougas, Peer & Tariku (2018), "Moisture accumulation in exposed extruded polystyrene insulation in western Canada", IIBEC BETS. https://iibec.org/publication-post/2018-bes-tougas-peer-tariku/. [S2]
- **EPS-moist:** Stassi (2019), Construction Canada, https://www.constructioncanada.net/sink-or-swim-a-comparison-of-below-grade-rigid-foam-insulation-moisture-performance/3/ (EPS industry); Woestman (2020), Construction Specifier, https://www.constructionspecifier.com/xps-delivers-high-r-values-in-below-grade-applications/3/ (XPS industry). [S2]
- **LEG:** Legalett FAQ (FPSF is Part 4, P.Eng stamp). https://legalett.ca/resources/faqs-for-frost-protected-shallow-foundations-air-heated-radiant-floors/. [S2]
- **TMP:** Techno Metal Post certifications (CCMC 13059-R, ICC-ES ESR-3418). https://www.technopieux.com/es-ES/certificaciones/. [S2]
- **FGA:** Fine Homebuilding #288 (Glavel R-1.7/in compacted), https://finehomebuilding.com/2019/11/05/insulating-gravel ; GreenBuildingAdvisor (AeroAggregates), https://www.greenbuildingadvisor.com/article/foamed-glass-aggregate. [S2]

**Research and guidance**
- **UBC20:** Vanderfleet, O. (2020), *Embodied Carbon in Passive House Part 9 Buildings*, UBC Sustainability Scholars for ZEBx (Vancouver single-family; 130–150 kgCO2e/m² GFA; raft + grade beams and basements raise embodied carbon; EPS foundations, cellulose and mineral wool lower it). https://sustain.ubc.ca/sites/default/files/2020-24_Embodied%20Carbon%20in%20Part%209%20Passive%20Houses_Vanderfleet.pdf. [S]
- **RAS21:** Rasmussen, F.N. et al. (2021), "Environmental Product Declarations of Structural Wood: A Review of Impacts and Potential Pitfalls for Practice", *Buildings* 11(8) 362, doi:10.3390/buildings11080362. https://vbn.aau.dk/en/publications/environmental-product-declarations-of-structural-wood-a-review-of. [S] (abstract)
- **RC:** Real Cedar (WRCLA), Siding pre-installation and Finishing pages. https://realcedar.com/siding/pre-installation ; https://www.realcedar.com/siding/finishing. [S2]
- **WFP:** Western Forest Products, "Thermal News" (Jartek thermal-modification kiln, Vancouver Island). https://www.westernforest.com/products/thermally-modified-wood/thermal-news/. [S2]
- **HAS21:** Hasburgh, L.E. et al. (2021), "Durability and fire performance of charred wood siding (shou sugi ban)", *Forests* 12(9) 1262. https://research.fs.usda.gov/treesearch/64332. [S]
- **KYM22:** Kymäläinen, M. et al. (2022), *Materials* 15:8410. https://pmc.ncbi.nlm.nih.gov/articles/PMC9737049/. [S2]
- **SST-COR:** Simpson Strong-Tie, "General Corrosion Information". https://www.strongtie.com/corrosion. [S2]
- **SAND07:** Sandahl, J.F. et al. (2007), dissolved copper and coho salmon olfaction (0–20 µg/L), *Environ. Sci. Technol.* Copy: https://www.waterboards.ca.gov/waterrights/water_issues/programs/bay_delta/docs/cmnt081712/sldmwa/sandahletal2007.pdf. [SN]
- **GBA-GTX:** GreenBuildingAdvisor Q&A (2019), GUTEX as WRB near Vancouver. https://greenbuildingadvisor.com/question/wall-assembly-for-new-home-near-vancouver-canada-and-is-gutex-wood-fiber-insulation-recognized-as-a-wrb-by-code. [S2]
- **Metals (S2, One Click LCA / manufacturer pages):**
  - Tata Steel: https://materials.oneclicklca.com/en/manufacturer/tata-steel
  - Ruukki: https://materials.oneclicklca.com/en/manufacturer/ruukki
  - VMZINC: https://materials.oneclicklca.com/en/manufacturer/vm-building-solutions
  - VMZINC characteristics: https://www.vmzinc.com/sustainable-building/characteristics-of-zinc
  - Aurubis copper: https://materials.oneclicklca.com/en/material/mill-finished-copper-sheet-and-strip/64e241456200d44a17220ef5
  - Hydro aluminium: https://materials.oneclicklca.com/en/manufacturer/hydro-aluminium
  - Stainless average: https://en.wikipedia.org/wiki/Stainless_steel
  - Galvanic index: https://en.wikipedia.org/wiki/Galvanic_corrosion
- **Prior research (approved / junction files):**
  - 02 (material properties)
  - 03 (assembly and climate: overhang monitoring, rainscreen performance, Finch 2007, BC Housing MM01/MM08, Caparol *Sockel*)
  - 04 (ecology)
  - 06 (junctions A–C: CMHC-BPG, CMHC-FL, BCH-BI21, RCABC, BCH-DECKS, BCH-MM02)
  - 07 (junctions D–G: V1/V2 reads, RDH13, CGSB-149.11, IG4)

**Local calculation scripts** [I]:
- `…/scratchpad/opt09/rsi.mjs` (wall RSI)
- `…/scratchpad/opt09/rollup.mjs` (reference-pavilion roll-up)
