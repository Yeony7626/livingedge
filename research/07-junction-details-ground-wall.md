# 07 — Junction details at the ground–wall edge: D slab edge, E footing and drainage, F grade, G rainscreen field (Vancouver)

Researched: 2026-10-13. Scope: junctions D–G of the Part 9 wood-frame edge described below. Junctions A (base of wall: sill, sheathing, base flashing, cladding bottom), B (eave/soffit) and C (bench post) are covered by another researcher and are only referenced here where a control layer crosses into them.

## 0. How to read this file

### 0.1 Tags

- **Numbers** carry a round-bracket tag: `(S)` = SOURCED (the number is stated in the cited document), `(I)` = INFERRED (my calculation, a geometric consequence of the given assembly, or practice I could not tie to a document; the reason is given next to it).
- **Performance claims** carry a square-bracket tag: `[S]` sourced, `[I]` inferred.
- Values marked "(given)" come from the brief's assembly and are not tagged as either; they are counted separately at the end.
- Clause, page and year numbers are references, not values, and are not tagged.

### 0.2 Source keys

All URLs were opened in this session unless marked "search summary only". "pdf p." is the page index of the PDF file, not the printed page.

| key | document | how read |
|---|---|---|
| **V2** | City of Vancouver, *Vancouver Building By-law 2025*, Book I (General) Vol. 2 (Part 9 + Notes), convenience copy v3.00. https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf | Full text extracted (685 pp.); figures viewed. |
| **V1** | VBBL 2025 Book I Vol. 1 (Div. A, Div. B Parts 1–8, Part 10, Appendix C), convenience copy v4.01. https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf | Full text extracted (1071 pp.). |
| **BCBC** | Province of BC, *British Columbia Building Code 2024*, Book I. https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/revisions-and-mo/bcbc_2024.pdf | Full text extracted (1886 pp.). Used only for comparison; BCBC does not apply in Vancouver ([01: req.vbbl-governs-vancouver]). |
| **CMHC** | CMHC (1999, rev. 2001), *Best Practice Guide: Wood-Frame Envelopes in the Coastal Climate of British Columbia*, Cat. NH15-303/2001E, prepared by RDH Building Engineering with Morrison Hershfield. Official record: https://publications.gc.ca/site/eng/9.648461/publication.html | Read from an unofficial mirror, https://w.tboake.com/guides/BC_wood.pdf (cataloguing page inside confirms NH15-303/2001E). Detail 1 drawing viewed. |
| **IG4** | Homeowner Protection Office / BC Housing (printed 03/2015), *Illustrated Guide – Energy Efficiency Requirements for Houses in British Columbia, Climate Zone 4*, prepared by Innes Hood Consulting with RDH. Based on BCBC 2012 9.36. https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/guides/climatezone4.pdf | Full text + figures pp. 6, 9, 10, 13 viewed. |
| **CGSB** | CAN/CGSB-149.11-2019, *Radon control options for new construction in low-rise residential buildings* (Dec. 2019). Superseded by the 2024 edition (*Radon control options for new buildings*), which I did not read. | Read from the Town of Comox copy, https://www.comox.ca/sites/default/files/2024-04/CANCGSB-149.11.pdf (authorisation of that copy not confirmed). |
| **BUL** | City of Vancouver Bulletin 2009-009-BU (29 Apr 2009), *Rainscreen Design and Inspection for One and Two Family Dwellings*. https://vancouver.ca/files/cov/2009-009-rainscreen-design-and-inspection-for-one-and-two-family-dwellings.pdf | Full text (03 reported it as blocked; it was readable this time). |
| **BBY** | City of Burnaby, *Foundation and Surface Drainage Installation Guide* (rev. 2009-09-09). https://www.burnaby.ca/sites/default/files/acquiadam/2021-08/Foundation-and-Surface-Drainage-Installation-Informational-Guide.pdf | Full text + section drawing p. 1. Neighbouring municipality, not Vancouver. |
| **CNV** | City of North Vancouver, *Residential SFD/Duplex – Perimeter Drainage Inspection Guide*, Doc 2202749 (21 Jul 2022). https://www.cnv.org/-/media/City-of-North-Vancouver/Documents/Building-Inspection-Guides/PSP-Residential-SFD-Duplex-Perimeter-Drainage-Inspection-Guide.ashx | Full text (checklist only, no numbers). |
| **BSI011** | Lstiburek, J. (2014), *BSI-011: Capillarity—Small Sacrifices*, Building Science Corporation. https://buildingscience.com/documents/insights/bsi-011-capillarity-small-sacrifices | Read. |
| **BSD103** | Lstiburek, J. (2006), *BSD-103: Understanding Basements*, BSC. https://buildingscience.com/documents/digests/bsd-103-understanding-basements | Read. |
| **RDH13** | FPInnovations / RDH (March 2013), *Guide for Designing Energy-Efficient Building Enclosures for Wood-Frame Multi-Unit Residential Buildings in Marine to Cold Climate Zones in North America*. https://www.rdh.com/wp-content/uploads/2017/07/Guide-for-Designing-Energy-Efficient-Building-Enclosures-Web.pdf | Full text extracted. |
| **BEDG** | BC Housing (2020), *Building Enclosure Design Guide – Wood-Frame MURBs*, 2nd ed., **sample pages only**. https://www.crownpub.bc.ca/Content/documents/BEDG%20Sample%20Pages.pdf | The full guide (incl. its Detail 1 "Foundation Wall at Slab") is paywalled and was not read. |
| **DOE** | US DOE Building Science Education Solution Center, *Land is Graded: Final Grade Slopes Away from Foundation*. https://bsesc.energy.gov/energy-basics/land-graded-final-grade-slopes-away-foundation | Read. US guidance. |
| **IRC** | International Residential Code R401.3 (2009–2021 editions), as reproduced by Maricopa County and ICC proposal RB101-07/08. | **Search summary only** (codes.iccsafe.org returned 403). US code, not applicable in BC. |
| **OC** | Owens Corning, FoamSealR / ProPink ComfortSeal sill gasket data sheets. | **Search summary only**; thickness values conflict between sheets. |
| **DL** | Detail Library (UK), public product pages and preview drawings: DL371, DL174, DL207, MG1, TW3, EE02, EE12. https://detail-library.co.uk/ | Preview images and public descriptions only. Used for completeness benchmarking, not numbers. No forms submitted. |
| **NHBC** | NHBC Standards 6.11.8 *Render onto board backgrounds*. | **Search summary only** (page returned 403). |
| [01:…], [03:…], [04:…], [02:…] | Approved library entries in `01-codes-standards.md`, `03-assembly-climate.md`, `04-ecology.md`, `02-material-properties.md`. | Reused, not re-read at source. |

Not accessible: BC Housing *Building Envelope Guide for Houses* (2nd ed., 2020) is sold through Crown Publications; no free copy was found. CGSB 149.11-2024, CSA A23.1, ASTM C1063 and the BBA certificate for Knauf Aquapanel (09/4633) were not read.

### 0.3 Reference geometry used throughout (elevations in mm, 0 = finished grade at the wall face, up positive)

| element | elevation / size | tag and reason |
|---|---|---|
| Slab top = foundation wall top = underside of sill gasket | +200 | (given) |
| Slab underside (100 mm slab) | +100 | (I) 200 − 100 |
| Under-slab insulation underside, as given (50 mm) | +50 | (I) |
| Same, with the recommended 75 mm XPS | +25 | (I) |
| Underside of ≥100 mm granular base, as given / recommended | −50 / −75 | (I) |
| Underside of footing, default Vancouver frost case | −450 | (I) = minimum frost depth 450 (S) V1 1.1.3.2 |
| Top of footing (250 mm footing) | −200 | (I) |
| Foundation wall height, footing top to wall top | 400 | (I) |
| Footing projection each side (550 footing, 200 wall, centred) | 175 | (I) (550 − 200)/2 |

The sill plate (38×140, given) is assumed flush with the exterior face of the 200 mm wall, leaving a 60 mm (I) interior ledge of concrete beside the plate. Junction A decides this; if A moves the plate, the D details shift with it.

---

## Summary of decisions and biggest problems (detail follows in D–G)

| junction | key decisions | biggest performance problems in the current assembly |
|---|---|---|
| **D** slab edge / wall / sill | Add vertical slab-edge insulation between slab and wall; thicken under-slab insulation to reach the VBBL slab value; 0.25 mm soil-gas membrane over the insulation, lapped 300 mm, sealed, turned up and sealed to the wall; radon rough-in per VBBL 9.13.4.3; PT sill on a gasket; anchor bolts sized for Vancouver seismic. | **Fails VBBL 2025 Part 10:** slabs need RSI 2.45 (S) with insulation "under all slab area and around edge of slab"; the given 50 mm under-slab XPS reaches about RSI 1.88 (I) with no edge insulation. The concrete stem wall top is an uninsulated path from the slab edge and plate to a 200 mm (given) above-grade exposed face. The soil-gas barrier and its tie to the wall air barrier are not defined. |
| **E** footing / drainage | Footing underside ≥450 mm (S) below grade (1.2 m (S) on clay); capillary break over the footing top; dampproofing from grade to footing (required here); 100 mm (S) perforated pipe beside the footing, invert at footing base, in ≥150 mm (S) clean stone wrapped in geotextile; separate storm sump and cleanouts. | No capillary break between footing and wall; drain-rock filter not specified (silting is the main decades failure); footing depth not set relative to frost depth or soil type; outlet and roof-water separation not defined. |
| **F** grade at the wall | Treat the gravel top as "finished ground"; separate gravel from soil with geotextile and an edging; slope the subgrade under the gravel and the topsoil away at ≥5% for the first 3 m (US guidance; VBBL gives no number); keep plants and irrigation off the strip. | The plinth is exactly at code minimums: 200 mm (given) foundation exposure gives 200 mm (S required) stucco clearance with no allowance for settlement, mulch or soil creep; 2% (given) soil slope is below every numeric guidance found (4–5% (S) US); a gravel strip keeps the soil below it moist [S, 04: ev.eco.24] and admits roof/splash water straight into the backfill against the wall. |
| **G** rainscreen field | 19 mm (given) PT strapping 64 mm (I) wide on stud lines at 400 mm (S), fastened through the membrane into studs; insect screen at all vents; no fire blocks needed while the cavity is ≤25 mm (S); conventional equivalent = Part 9 three-coat stucco on self-furred lath over the strapping. | **Fails VBBL 2025 Part 10 walls RSI 3.85 (S):** 2×6 with batts is about RSI 2.88 (S, IG4). Cement board + lime render is not a Part 9 cladding and routes to Part 5 (S, V2 9.27.1.1.(6)); Part 9 stucco over cement board would still need lath (S, 9.28.1.2). Strapping wider than 80 mm at 400 mm would exceed the 20% furred-area limit (I). Movement joints are undefined. |

---

## D. Slab edge / foundation wall / sill

### D.1 Layers in construction order

Order assumes the usual stem-wall sequence: wall cast with anchor bolts → interior base, insulation, membrane → slab → sill gasket and plate → framing. [I] (general practice; CGSB 7.1.4.5.5 requires the membrane to be sealed to the wall "prior to the concrete slab pour" [S]).

| # | component | material, dimensions | support / fastening | source |
|---|---|---|---|---|
| D1 | Foundation wall top (bearing surface for sill) | Cast concrete, 200 (given) wide, top screeded level at +200 (given). | Sill may sit directly on a level foundation or on a full mortar bed (S, rule). | V2 9.23.7.2.(1) (pdf p.135) |
| D2 | Anchor bolts (cast in with the wall) | ≥12.7 mm (S) diameter at ≤2.4 m (S) o.c. (basic rule). Vancouver Smax (Site Class C) = 0.884 (S) > 0.47 (S), so braced-wall-panel rules apply: ≥2 (S) bolts per braced wall panel, within 0.5 m (S) of the foundation end or 0.3 m (S) of the panel end, spaced per Table 9.23.6.1.-A, e.g. WSP-A panels 1.4 m (S) with 12.7 mm bolts or 2.1 m (S) with 15.9 mm bolts. Embedded ≥100 mm (S). Nut and washer (S). Bolt on the sill centreline, 70 mm (I) from the exterior face (half of 140). Hot-dip galvanized, because the sill is preservative-treated (I; V2 9.23.2.4 sets Z550 (S) galvanizing or stainless for connectors in contact with treated wood, and the bolt is a fastener through a connector-like contact). | Wet-set in concrete; tightened without withdrawal (S, rule). | V2 9.23.6.1.(2),(3),(5) and Table 9.23.6.1.-A (pdf p.133–134); Smax: V1 Table C-3 (pdf p.936); V2 9.23.2.4 (p.126) |
| D3 | Subgrade under slab | Topsoil and vegetable matter removed (S, rule); fill compacted unless it is clean coarse aggregate with ≤10% (S) passing 4 mm (S). | — | V2 9.12.1.1.(1) (p.83); 9.16.2.2.(3)–(4) (p.100) |
| D4 | Gas-permeable granular base | ≥100 mm (S) of coarse clean granular material with ≤10% (S) passing a 4 mm (S) sieve; e.g. 19 mm (I, typical BC clear crush, not found in a document) clear crushed stone. Typical void ratio of a working gas-permeable layer 35–40% (S). | Laid on D3. Need not be compacted (S, rule above). | V2 9.16.2.1.(1) (p.100), 9.13.4.3.(1)(b) (p.89), Note A-9.16.2.1.(1) (p.622); CGSB 3.17 Note (pdf p.13) |
| D5 | Radon rough-in (vent pipe) | Pipe and fittings per CGSB-149.11 7.1.3 (S, rule); diameter 100 mm (I, common practice). Deemed-to-comply inlet near the centre of the slab with gas-permeable material ≥100 mm (S) beyond the inlet. No perforations above the air barrier; sealed to it; labelled every 1.8 m (S) and at every change of direction; terminates outside ≥1.8 m (S) from a property line with a 10–12.5 mm (S) mesh screen. Where it runs through conditioned space it must be fully surrounded by conditioned space. | Inlet bedded in D4; riser through slab and membrane, sealed. | V2 9.13.4.3.(1)–(3) (p.89); Note A-9.13.4.3 (p.620) |
| D6 | Under-slab insulation | XPS (CAN/ULC-S701.1). Given 50 mm = RSI 1.68 (S). Needed: the slab assembly must reach RSI 2.45 (S) effective → 75 mm (I) XPS (calculation in D.2(d)); or ≥90 mm (I) EPS Type 2 (RSI 0.028/mm (S)). Over the full slab area (S, wording of the VBBL table). Two staggered layers preferred (I) to close joints. | On D4; compressive strength sufficient for the slab (S, rule for rigid PS used as dampproofing). | V1 Table 10.2.2.6 (pdf p.821); BCBC Table A-9.36.2.4.(1)-D (printed 9-874, pdf p.1796); V2 9.13.2.6.(1)(c) (p.87) |
| D7 | Slab-edge (perimeter) insulation — **missing in current assembly** | XPS strip against the inner face of the foundation wall, from the top of D6 to the slab top: height ≈175 mm (I) (100 slab + 75 board). Thickness: VBBL requires insulation "around edge of slab" but gives no separate edge value; I recommend the full value, 75 mm (I). Minimum if the BCBC thermal-break rule were accepted: ≥50% (S) of required resistance → about 38 mm (I) XPS. | Held by the slab pour; top cut flush with slab top (I). Also acts as the slab–wall isolation joint (I). | V1 Table 10.2.2.6; BCBC 9.36.2.8.(4)(b)(i) (printed 9-327, pdf p.1249); IG4 p.10 figure "1.2 m perimeter under the slab with a thermal break" |
| D8 | Soil-gas barrier / dampproofing / air barrier under slab | Polyethylene to CAN/CGSB-51.34; VBBL's note says 0.15 mm (S); CGSB-149.11 requires 0.25 mm (S) gas- and puncture-resistant polyolefin under slabs → specify 0.25 mm (I, choose the stricter). Joints lapped ≥300 mm (S) and sealed with compatible sealant (S). Laid **directly under the slab, over the insulation** [S: BSD103; CGSB 7.1.4.5.10 requires the barrier above rigid insulation that is not itself sealed as a barrier]. Turned up the slab edge, wrapped over the top of D7 and sealed to the 60 mm (I) concrete ledge with compatible tape or sealant [I; CGSB 7.1.4.5.5 requires sealing to the foundation wall before the pour (S)]. All penetrations sealed (S, rule). | Weighted by the slab; clamped/sealed at wall. | V2 9.25.3.6.(1)–(3),(5) (p.181), 9.13.4.2.(1) (p.89), Note A-9.25.3.6.(2) and (3) (p.659); CGSB 7.1.4.5.1–7.1.4.5.11 (pdf pp.24–26) |
| D9 | Slab | Concrete 100 (given), ≥75 mm (S) required. Finished smooth (S). Placed directly on polyethylene: do not finish until all bleed water has risen and evaporated (S). | On D8. | V2 9.16.4.1, 9.16.4.3 (p.101); Note A-9.25.3.6.(2) and (3) (p.659) |
| D10 | Slab perimeter seal | Floor-on-ground sealed around its perimeter to the inner surfaces of adjacent walls with **flexible sealant** (S, rule) — here the joint between slab/D7 top and the concrete ledge. CMHC's basement detail instead shows a ≥6 mm (S) gap filled with asphalt-impregnated fibreboard with polyethylene against the wall; D7 replaces that filler (I). | After slab cure, before plate/finish. | V2 9.25.3.6.(5) (p.181); CMHC Detail 1 SPA (p.6-5, pdf p.109) |
| D11 | Sill gasket | Closed-cell polyethylene foam, full plate width 140 mm (I); 3/16–1/4 in ≈ 5–6 mm (S, OC, conflicting sheets) thick. Function: air seal of the plate-to-foundation joint (S, required by V2 9.23.7.2.(2) via 9.25.3) and retarding moisture rising from concrete (S, CMHC). **Not marketed as a capillary break** [S, OC search summary]. | Laid on D1 over the bolts; holes cut tight, joints butted and sealed (I). | V2 9.23.7.2.(2) (p.135); CMHC Detail 2 note (p.6-6) |
| D12 | Capillary separator under sill (optional, recommended) | VBBL requires 0.05 mm (S) poly or Type S roll roofing only if untreated wood is <150 mm (S) above ground; here the plate is at +200 (given), so not required. I still recommend an EPDM or self-adhered sill membrane under or over the gasket as a true capillary break (I), because the slab top is level with the plate underside (see D.2(c)). | Between D11 and D1 (I). | V2 9.23.2.3 (p.126) |
| D13 | Sill / bottom plate | 38×140 (given), ≥38×89 (S) where bearing a floor. **Preservative-treated** recommended because concrete wicks water and the plate sits at slab level [S: CMHC Detail 1 and Detail 2 notes; Table 7.1 "wood plates in contact with grade level concrete: pressure preservative treat"]. If borate-treated, it must be kept from direct water exposure [S, V2 9.3.2.9.(6) via 01: req.boron-treated-limits]. | Anchor nuts with washers (S); a plate washer is common BC seismic practice (I, not found in VBBL text). | V2 9.23.7.1; CMHC pp.6-4, 6-6, 7-2 (pdf pp.108, 110, 200) |
| D14 | Interior air/vapour barrier tie-in at wall base | If the wall uses interior polyethylene (sealed polyethylene approach): poly lapped and sealed to the plate and to the concrete ledge or slab with acoustical sealant (I, detail); principle "floor slab sealed to the foundation wall; all joints between foundation and above-grade wall sealed" (S). If the air barrier is exterior (sheathing membrane), the tie happens in junction A. | — | IG4 p.13 figs 1–2; CMHC Table 6.1 (Detail 1 is drawn only for SPA) |
| D15 | Floor finish / baseboard | Covers D7 top and the ledge; allow slab-edge sealant to be inspected (I). | — | (I) |

Figures showing this detail: CMHC Detail 1 SPA (basement version: P.T. bottom plate on P.T. blocking, poly under slab, 6 mm isolation gap, dampproofing extended under the wall, drain beside footing); V2 Figure A-9.25.3.4 and 9.25.3.6.-A (p.659: flexible sealant at slab–wall joint, slab dampproofing and soil-gas barrier); IG4 p.10 (three insulation placements for a slab level with the stem-wall top, exactly this geometry) and p.13 (slab-to-foundation air leakage path); CGSB Figs 7.1.4.5.5–7.1.4.5.7 (membrane sealed vertically to wall, horizontally to footing, and below edge insulation).

### D.2 Performance

#### (a) Control-layer pen test

| layer | continuous path through D | transfer to next component | breaks in the **current** assembly |
|---|---|---|---|
| Water-shedding / bulk water | Interior only: slab surface. Exterior bulk water is handled in E/F. | Slab top at the same level as the plate underside, so floor water (spills, mopping, leaks) runs to the plate [I]. | No curb or drained gap at the plate; plate wets from the inside [I]. |
| Moisture barrier (ground) | Under-slab poly → turned up slab edge → sealed to concrete ledge → concrete wall (dampproofed outside below grade, E) → sill gasket/membrane → plate. | Poly-to-concrete seal by tape/sealant; concrete-to-wood by gasket (and optional membrane). | No capillary break footing→wall (E); gasket is not a rated capillary break [S, OC]. |
| Air barrier / soil-gas barrier | Under-slab poly (lapped 300 mm (S), sealed) → slab-perimeter flexible sealant (S) → concrete foundation wall (the concrete is the most airtight element at this junction [S, RDH13 4.7.3]) → sill gasket (S, 9.23.7.2.(2)) → interior poly or exterior membrane of the wall (A). | Each joint is a seal, not a lap: tape, sealant bead, gasket compression. | Current assembly names no barrier under the slab and no seal at the slab perimeter. Without them VBBL 9.13.4.2.(1) and 9.25.3.6 are not met [S]. Anchor-bolt holes through the gasket are leakage points [I]. |
| Vapour control | Under-slab poly (low permeance) and XPS; concrete. Drying of the slab is upward only [S, RDH13 4.7.4 for the analogous wall; I for slab]. | — | Construction moisture in a 100 mm slab poured on poly must leave upward; floor finishes need a moisture test before installation [I]. |
| Thermal control | Under-slab XPS → **(missing) slab-edge XPS** → (gap: 200 mm concrete wall and 38 mm wood plate) → wall batts above the plate. | Board-to-board butt; no overlap with the wall insulation, which starts above the plate. | (1) Under-slab RSI ≈1.88 (I) < 2.45 (S). (2) No edge insulation: the slab edge touches a wall whose upper 200 mm (given) face is exposed to outdoor air. (3) Even with D7, the wall top and plate bridge the wall batts to the slab insulation; the planes are separated by the 200 mm wall thickness, and the BCBC rule of thumb would ask for one plane to extend 4× (S) that thickness = 800 mm (I) (BCBC 9.36.2.5.(5), not in force in Vancouver). |

#### (b) Component functions and failure modes

| component | function | failure if missing, mis-sized or reversed |
|---|---|---|
| Anchor bolts | Hold the wall frame to the foundation against wind uplift and seismic shear [S, V2 9.23.6.1]. | Frame slides or lifts off the wall in an earthquake; for Vancouver, spacing must follow braced-wall-panel rules, not just 2.4 m [S]. |
| Granular gas-permeable layer | Capillary break under the slab and the space a future radon fan depressurizes [S, V2 9.13.4.3; A-9.16.2.1.(1)]. | Compactable fill (with fines) blocks depressurization [S, Note A-9.13.4.3] and wicks soil water to the slab underside [I]. |
| Radon rough-in pipe | Lets a fan be added later without breaking the slab [S, Note A-9.13.4]. | Without it, mitigation needs slab coring or exterior suction [I]. Perforations above the barrier short-circuit the system [S, 9.13.4.3.(2)(a)]. |
| Under-slab XPS | Thermal control; keeps slab warm (comfort, no condensation at the floor) [S, V2 9.25.2.1 performance intent; I for comfort]. | Too thin = fails Part 10 [S]. Soft board crushes and the slab cracks [I]. |
| Slab-edge XPS | Thermal break at the highest-loss point of a slab-on-grade [S, IG4 p.10; DL MG1 label "perimeter insulation upstand to prevent thermal bridging"]; also isolates slab movement [I]. | Missing (current): perimeter heat loss through the stem wall to the above-grade face; cold floor edge and cold plate; condensation and mould risk behind baseboards in the coldest weeks (Vancouver January 2.5% design −7 °C (S), V1 Table C-2 p.934) [I]. |
| Poly soil-gas barrier | Air/soil-gas barrier and dampproofing for the floor [S, V2 9.25.3.6; 9.13.2.6]. | Missing or unsealed: radon and soil moisture enter; VBBL fails [S]. Placed **under** the insulation without sealing to the wall: gas bypasses at the edge [I]. Placed under a layer of sand: water trapped between poly and slab [S, BSD103 "avoid sand"]. |
| Slab-perimeter flexible sealant | Closes the air path between slab and wall [S]. | Rigid filler or no sealant: the joint opens as the slab shrinks and becomes the main radon/air entry path [S for the principle, A-9.13.4; I for mechanism]. |
| Sill gasket | Air seal at plate/concrete [S]; retards moisture rising into plate [S, CMHC]. | Missing: air leakage at every plate joint; the airtightness target (2.5 ACH50 (S), V1 Table 10.2.2.21.A pdf pp.828–829) becomes hard to meet [I]. Over-compressed or torn at bolts: leaks [I]. |
| PT sill plate | Decay resistance where the plate is wetted by concrete and slab-level water [S, CMHC]. | Untreated plate at slab level wets from spills and wicking; decays from the underside where it cannot be seen [I]. |
| Interior air-barrier tie-in | Connects floor barrier to wall barrier [S, IG4 p.13]. | Air leaks at the plate line, cold drafts at baseboard, interior moisture into the wall base [I]. |

#### (c) Moisture paths

- **Soil moisture / groundwater (from below):** rises by capillarity through footing and wall into the wall top and plate unless the footing top has a capillary break [S, BSI011; BSD103 Fig. 8 "Capillary rise through footing"]. Under the slab, the clean stone and poly stop it [S].
- **Splash and wind-driven rain on the exposed 200 mm (given) concrete face:** concrete absorbs and conducts water inward and upward toward the plate; the gasket/membrane is the only separation [I; CMHC Detail 2 note on the gasket (S)]. A drip/flashing at the plate line belongs to junction A.
- **Interior water:** slab top = plate underside, so water on the floor reaches the plate edge directly [I].
- **Construction moisture:** slab cast on poly dries only upward; bleed water is greater and slower [S, Note A-9.25.3.6.(2) and (3)].
- **Condensation:** at the cold slab edge, ledge and plate if the edge is uninsulated and interior air reaches it through an unsealed joint [I].
- **Drying:** the plate dries to the interior and into the wall cavity; the slab dries upward; the concrete wall dries outward above grade [I].

#### (d) Thermal bridges and insulation continuity (calculation)

Inputs (all S, BCBC Table A-9.36.2.4.(1)-D, pdf pp.1792, 1796–1797): XPS 50 mm = RSI 1.68 (S) (0.0336/mm (S)); XPS 25 mm = 0.88 (S) (0.035/mm (S)); EPS Type 2 0.028/mm (S); normal-density concrete 0.0004/mm (S); interior air film, floor, heat flow down 0.16 (S). VBBL A-10.2.2.6 says to sum the layers of a fully insulated slab (isothermal planes) [S, V1 p.835].

| case | sum | result |
|---|---|---|
| Given: 50 mm XPS + 100 mm slab + film | 1.68 (S) + 0.04 (I) + 0.16 (S) | **1.88 (I) < 2.45 (S) → fails** |
| 75 mm XPS (2.52–2.63 (I)) + slab + film | | 2.72–2.83 (I) ≥ 2.45 ✓ |
| EPS Type 2 needed | (2.45 − 0.20) / 0.028 | ≥80 mm (I) → specify 90–100 mm (I) |

- Comparison outside Vancouver: BCBC 2024 Table 9.36.2.8.-A (Zone 4, no HRV) needs only RSI 1.96 (S) for unheated floors above the frost line, with a 1.2 m (S) perimeter option and an edge break at ≥50% (S); Table 9.36.2.8.-C (dwelling-only buildings) needs 3.46 (S) under the full slab including edges (BCBC printed 9-325–9-327). VBBL 2025 deleted Section 9.36 (S, V2 p.238) and uses its own Part 10 value 2.45 (S) for both the performance and prescriptive paths (value centred across both columns in the table; layout read from the PDF coordinates).
- **The stem-wall bridge remains after D7:** the 200 mm concrete wall top and the 38 mm plate connect the slab-edge zone to the outdoor face above grade. Options, in order of thermal effectiveness [I]: (1) exterior insulation on the foundation wall from the plate down to the footing (IG4 p.10 option 1), protected above grade by ≥12 mm (S) cement parging on wire lath or ≥6 mm (S) PT plywood (V2 9.25.2.3.(6), p.179) — this moves the foundation face outboard and must be coordinated with junction A; (2) D6 + D7 as above plus extending one plane 4× the wall thickness (I, BCBC principle); (3) a thermally broken stem (the UK DL207 uses lightweight thermally efficient blockwork with EPS in the foundation cavity under the sole plate [S, DL preview]). Only a 2-D thermal model (e.g., THERM) can give the linear transmittance and the interior surface temperature at the plate; none was found for this geometry [I].
- Whether the above-grade 200 mm (given) strip of stem wall must meet the VBBL "Foundation walls RSI 3.85 (S)" row is not stated; VBBL A-10.2.2.6 says above-grade foundation walls separating conditioned from unconditioned space count in gross wall area [S]. Open question.

#### (e) Ageing and maintenance (feeds the decades timeline)

| period | expected state | evidence |
|---|---|---|
| Year 0–1 | Slab drying upward; floor finishes need moisture testing [I]. Slab shrinkage opens the perimeter joint, which is why the sealant must be flexible [S rule; I mechanism]. Wood plate shrinks across grain: 0.25% (S) per 1% MC change (CMHC 2-2) × ≈9% (I) drop × 76 mm (I) of plates ≈ 1.7 mm (I) — small for one storey. | CMHC p.2-2 (pdf p.18) |
| Year 5 | Sealant at slab perimeter: rainscreen-assembly sealants are planned for repair or replacement every 5 years (S) in CMHC's sample plan (window sealant, used here as a proxy) [I proxy]. Hidden under baseboard, so likely not maintained [I]. Radon test recommended once occupied; activate fan if above the Health Canada guideline 200 Bq/m³ (S, CGSB 3.31 note) [S]. | CMHC Table 9.2 (p.9-5); CGSB p.6 |
| Year 15 | Uninsulated edge: recurring winter condensation and mould at the baseboard/plate on north walls [I]. Gasket compression set; small leaks at bolts [I]. PT plate sound if the wall stays dry; untreated plate shows underside decay where floor water has reached it [I]. | — |
| Year 30 | Under-slab poly and XPS protected from UV and traffic: no maintenance and no expected failure found in sources [I]. Long-term XPS moisture uptake below a slab not quantified in any source read [gap]. Floor renewals may cut the perimeter sealant; renew it [I]. | — |

Maintenance: inspect and renew the slab-perimeter sealant at flooring changes; test radon after occupancy [I; S for testing intent, Note A-9.13.4].

### D.3 Conflicts between sources

1. **Membrane thickness:** VBBL Note A-9.25.3.6.(2)(3) says 0.15 mm (S) poly "in most cases"; CGSB-149.11-2019 7.1.4.5.1 requires 0.25 mm (S). VBBL 9.13.2.6 (dampproofing role) allows 100 mm (S) laps; 9.25.3.6.(3) (air-barrier role) needs 300 mm (S).
2. **Membrane position:** BSD103 puts poly over the insulation in direct contact with the slab; CGSB 7.1.4.5.7 puts the barrier **below** insulation where insulation runs between wall and slab, sealed to the footing; CGSB 7.1.4.5.10 puts it above insulation that is not itself sealed. CGSB's footing-seal option does not fit this geometry (footing is ~400 mm (I) below the slab), so the turn-up-and-seal-to-wall option (7.1.4.5.5) is used.
3. **Slab insulation requirement:** VBBL Part 10 RSI 2.45 (S) full slab plus edge vs BCBC 9.36 RSI 1.96 (S) with perimeter option vs BCBC Table 9.36.2.8.-C RSI 3.46 (S) vs CMHC 2001: "a 600 mm (S)-wide strip of rigid perimeter insulation **may** be provided" (CMHC p.6-4, pre-energy-code).
4. **Sill:** VBBL needs no separator above 150 mm (S); CMHC says the bottom plate "should be pressure-treated due to its close proximity to the concrete surface" even with a gasket.
5. **Anchorage:** the basic 2.4 m (S) rule vs braced-panel spacing as low as 0.5 m (S) (WSP-E, 12.7 mm bolts) in Table 9.23.6.1.-A. Vancouver's Smax puts every Part 9 house in the second regime.

### D.4 UK benchmark (Detail Library previews) — what they include that ours lacks

| UK provision | seen in | ours | applies in Vancouver? |
|---|---|---|---|
| Perimeter insulation upstand at slab edge | MG1 | missing | **Yes** — required by VBBL Table 10.2.2.6 wording [S]. |
| DPM/radon barrier continuous, with the stepped DPC overlapping the VCL by 100 mm (S, UK value) | DL371 | barrier and overlap undefined | **Yes in principle** — VBBL 9.25.3.3/9.25.3.6 continuity [S]; use 300 mm (S) laps for the sheet itself. |
| DPM lapped ≥30 mm (S, UK value) down the slab edge | DL207 | — | Concept yes (turn-up + seal, CGSB 7.1.4.5.5) [S]. |
| Airtightness tape at plate/foundation; breather membrane taped to the insulated foundation | DL371, DL174 | — | **Yes** — needed to reach 2.5 ACH50 (S) [I]; exterior tie-in is junction A. |
| Thermally efficient/insulated stem under the sole plate | DL207 (lightweight blockwork + EPS cavity), DL371/DL174 (insulated EPS raft/ring beam) | uninsulated 200 mm concrete stem | Yes as a thermal goal [I]. An insulated raft is not a Part 9 prescriptive foundation; it would need Part 4 design (V2 9.16.1.2: floors that support the superstructure → Part 4) [S]. |
| Radon barrier | DL371 | absent | **Yes** — VBBL 9.13.4 applies to all floors-on-ground [S]. |

### D.5 Citations for D
V2 9.12.1.1, 9.13.2.6, 9.13.4.1–9.13.4.3, 9.16.2–9.16.4, 9.23.2.3–9.23.2.4, 9.23.6.1, 9.23.7, 9.25.2.3, 9.25.3.3, 9.25.3.6; Notes A-9.13.4, A-9.13.4.3, A-9.16.2.1.(1), A-9.25.3.4/9.25.3.6 (figs), A-9.25.3.6.(2)(3); Section 9.36 deleted (p.238). V1 Table 10.2.2.6 (p.821), 10.2.2.21 (p.829), A-10.2.2.6 (p.835), Tables C-2/C-3 (pp.934, 936). BCBC 9.36.2.5, 9.36.2.8, Table A-9.36.2.4.(1)-D. CMHC Detail 1 and 2 (pp.6-4–6-7), Table 7.1, p.2-2, Table 9.2. IG4 pp.6, 10, 13. CGSB 3.17, 3.31, 7.1.4.5. BSD103. RDH13 4.7. OC (summary). DL MG1, DL371, DL174, DL207.

---

## E. Footing / foundation wall / perimeter drainage

### E.1 Layers in construction order

| # | component | material, dimensions | support / fastening | source |
|---|---|---|---|---|
| E1 | Excavation | To undisturbed soil (S, rule); bottom free of organic material, standing water and frost (S, rules). | — | V2 9.12.1.1.(3)–9.12.2.1 (p.83) |
| E2 | Footing depth | Vancouver minimum frost penetration 450 mm (S). Table 9.12.2.2: heated building with footings **not** insulated → rock, coarse-grained and silt soils: no limit (S); clay or undefined soils: 1.2 m (S). If the foundation is insulated so that heat to the soil under the footings is reduced (D6/D7 do this), use the "no heated space" column (S, 9.12.2.2.(2)): silt or poorly drained coarse soils → below frost depth; clay → 1.2 m (S) and not less than frost depth. Lesser depths allowed where local experience or design shows them satisfactory (S, 9.12.2.2.(5)). **Default for the tool: footing underside −450 (I); −1200 (I) on clay unless engineered.** | — | V1 Div. B 1.1.3.2 (pdf p.80); V2 Table 9.12.2.2 (pp.83–84), Note A-9.12.2.2.(2) fig (p.618) |
| E3 | Strip footing | 550 × 250 (given). Minimum widths for exterior walls: 250 mm (S) for 1 storey, 350 mm (S) for 2, 450 mm (S) for 3. Thickness ≥ the greater of 100 mm (S) and the projection (175 mm (I)) → 250 OK (I). Where the water table is within one footing width below the bearing surface on gravel/sand/silt, double the width (S) → 500 (I) / 700 (I) mm for 1 / 2 storeys: the given 550 works for 1 storey only (I). Concrete ≥15 MPa (S). | On undisturbed soil, rock or compacted granular fill (S). | V2 9.15.3.2–9.15.3.8, Table 9.15.3.4 (pp.93–94); 9.3.1.6 via [01: req.concrete-plinth-strength] |
| E4 | Keyway and capillary break on footing top — **missing in current assembly** | Keyway at wall centreline (shown in CMHC Detail 1 [S figure]; size (I)). Capillary break: dampproofing, low-permeability or elastomeric coating over the footing top under the wall [S: BSI011 "installing a capillary break on the top of footings"; CMHC Detail 1 note "extend dampproofing to edge of footing and under wall"; BSD103]. Not a VBBL requirement [S, CGSB notes call it "not a current code requirement … best practice"]. Coating must not defeat the keyway/friction connection [I; practitioner concern in GBA thread, search summary]. | Applied after footing cure, before wall forms. | BSI011; BSD103; CMHC Detail 1 (p.6-5); CGSB notes to Figs 7.1.4.5.5–7 |
| E5 | Foundation wall | Cast-in-place concrete 200 (given) thick, 400 (I) tall. Table 9.15.4.2.-A: a 200 mm (S), 15 MPa (S) wall laterally unsupported at the top may retain up to 1.2 m (S) of finished ground above the interior floor/ground — here the exterior grade is below the slab, so OK (I). Extends ≥150 mm (S) above finished ground (given 200). Form ties removed at least flush (S); holes sealed before dampproofing (S). Crack-control joints in walls longer than 25 m (S) at ≤15 m (S). | On E3/E4 with keyway. | V2 9.15.4.2 (p.95), 9.15.4.6, 9.15.4.9 (p.99), 9.15.6.3 (p.100), 9.13.2.3.(5) (p.86) |
| E6 | Exterior dampproofing | Required where outside finished ground is higher than the ground level inside the foundation walls (S, rule). Here inside ground (top of the granular base under the slab insulation) is at −50 (I) to −75 (I), below the 0 grade, so **dampproofing is required** (I). Applied from finished ground level to the top of the exterior of the footing (S, rule), i.e. 0 to −200 (I); recommended extension over the footing top/edge (E4). Materials: e.g. ASTM D1227 Type III Class I asphalt emulsion, or a coating ≤43 ng/(Pa·s·m²) (S). Waterproofing (9.13.3) only where hydrostatic pressure occurs (S). | Brush/spray on cured concrete per manufacturer (S, rule). | V2 9.13.2.1–9.13.2.4 (pp.85–86), 9.13.3.1 (p.87); [01: req.dampproofing-foundation] |
| E7 | Wall drainage layer (optional) | Plastic drainage composite/dimple board on the dampproofing, down to the drain (CMHC Detail 1; RDH13 4.7–4.8 [S figure/text]). If crushed rock backfill or mineral-fibre insulation is used against the wall, it must reach footing level (S, rule). Our "free-draining backfill" (given) does the same job if it is clean and continuous to the drain rock [I]. | Mechanically fastened above grade line or held by backfill (I). | CMHC Detail 1; RDH13 pp.4-28–4-33; V2 9.14.2.1.(2), A-9.14.2.1.(2)(a) (pp.90, 620) |
| E8 | Perimeter drain pipe | Perforated pipe ≥100 mm (S) diameter, to a listed standard, e.g. CSA B182.1 PVC or BNQ 3624-115 PE (S, rule). Laid on undisturbed or well-compacted soil (S) **beside** the footing (S, CMHC Detail 1 and BBY section), invert at the footing underside, −450 (I), so the pipe sits fully within the footing depth and never below the footing bearing plane (I). Top of pipe must be below the bottom of the slab (S, rule) — trivially met here, −350 (I) vs +100 (I). BBY instead shows the high point of the drain tile 3 in ≈ 75 mm (S) below the **top** of the slab (weaker; see conflicts). Graded to the outlet (S, CNV checklist), e.g. 0.5–1% (I, no source found); cleanouts at high points (S, CNV; BBY shows C.O.). Rigid smooth-wall perforated PVC preferred for flushing (I). | On compacted bedding of clear stone (BBY "lay piping on a gravel bedding base or on undisturbed soil") [S]. | V2 9.14.3.1–9.14.3.3 (p.90); CMHC Detail 1; BBY p.1; CNV checklist |
| E9 | Drain rock and filter | Crushed stone or coarse clean granular material, ≥150 mm (S) over the top and sides of the pipe, ≤10% (S) passing 4 mm (S); BBY "6 in min. drain rock envelope all around" ≈ 150 mm (S). Size 19 mm (I, typical) clear crush. Geotextile: CMHC shows the pipe "with filter cloth wrap" [S]; BSD103 says the drain should be "wrapped completely in a geotextile" [S]. **Recommended: non-woven geotextile around the whole rock envelope**, not just a pipe sock, because Lower Mainland tills and silts migrate into open stone [I]. Rock top at about footing-top level, −200 (I). | — | V2 9.14.3.3.(4) (p.90); BBY p.1; CMHC Detail 1; BSD103 |
| E10 | Outlet | Foundation drains must go to a sewer, drainage ditch or dry well (S). Sump pit if provided: ≥750 mm (S) deep, ≥0.25 m² (S), cover resistant to removal by children and airtight (S); automatic pump if gravity is impractical (S). Dry wells only where groundwater is below their bottom and ≥5 m (S) from the foundation. VBBL also sets ≥5 m (S) from buildings for any infiltration system (trench, rain garden, soak-away) (figure). Burnaby practice: a **two-pipe** system — perimeter drain and rain-water-leader piping kept separate and both entering a storm sump; sump 24 in ≈ 610 mm (S) diameter up to 6 ft ≈ 1.8 m (S) deep, 30 in ≈ 760 mm (S) if deeper (Burnaby rules, not Vancouver). | — | V2 9.14.5.1–9.14.5.3 (p.91), Note A-9.14.5.3.(2) + Figure (pp.620–621); BBY pp.1–3 |
| E11 | Backfill | Free-draining granular (given). Within 600 mm (S) of the wall free of deleterious debris and boulders >250 mm (S); placed without damaging dampproofing or drain (S); graded so that after settling it does not drain toward the foundation (S). Cap the top 50–100 mm (S, DOE "2 to 4 inches of silty clay") with less-permeable soil sloped away, **except** under the gravel strip (see F) [S DOE; I application]. Compact (tamp) to limit settlement (S, DOE). | Placed after the floor/framing braces the wall [I; 03 sequence note]. | V2 9.12.3.1–9.12.3.3 (p.85); DOE |
| E12 | Sub-slab granular (interior) | See D4. A through-footing pipe can join separated sub-slab areas for depressurization [S, Note A-9.13.4.3.(2)(b)]. | — | V2 p.620 |

Figures: CMHC Detail 1 (drain beside footing with filter cloth, gravel, drainage composite, dampproofing "to edge of footing and under wall"); BBY p.1 section (pipe beside footing, 6 in rock envelope, RWL pipe separate); VBBL Figure A-9.14.5.3.(2) (5 m infiltration setbacks); CGSB Figs 7.1.4.5.5–7 (dampproofing/capillary break notes).

### E.2 Performance

#### (a) Control-layer pen test

| layer | path | transfers | breaks in current assembly |
|---|---|---|---|
| Water shedding (surface) | Grade cap sloped away → topsoil (F) | Surface runoff away from wall | 2% (given) slope; gravel strip admits water directly into the backfill (F) [I]. |
| Drainage plane (soil water) | Free-draining backfill (or composite) → drain rock → perforated pipe → solid pipe → sump → storm | Gravity, continuous to footing level (S, 9.14.2.1.(2)) | No filter specified → silting [I]; no high-point cleanout [I]. |
| Water-resistive layer on the wall | Dampproofing from grade to footing top (S rule) | Ends at grade; above grade the concrete is bare or parged | Not stated whether the coating continues over the footing top (E4) [I]. |
| Capillary break | Footing top coating (missing); clean stone under slab (D4) | — | Footing→wall capillary path open [S, BSI011]. |
| Air / soil gas | Not at the wall below the slab: soil gas reaching the sub-slab stone through the wall is handled by the slab barrier (D) [I]. | — | — |
| Thermal / frost | Depth of footing below frost; insulation (D) changes which depth applies [S, 9.12.2.2.(2)]. | — | Footing depth not set; soil type unknown. |

#### (b) Component functions and failure modes

| component | function | failure |
|---|---|---|
| Footing depth | Avoid frost heave and clay shrink–swell movement [S, Table 9.12.2.2; A-Table 9.12.2.2]. | Too shallow on frost-susceptible silt or clay: seasonal movement, wall/slab cracking, stucco cracking above [I]. Trees on shrinkable clay make it worse [S, 04: ev.eco.26/.27]. |
| Footing capillary break | Stops water wicking from wet soil under the footing into the wall and up to the plate [S, BSI011]. | Missing: wall base permanently damp; efflorescence; moisture delivered to the plate and sub-slab [I]. |
| Dampproofing | Resists moisture transfer from soil through the wall [S, 9.13.2.2.(1)(a)]. | Missing: damp wall, moisture into the sub-slab space [I]. Not waterproofing: fails under hydrostatic head if the drain fails [S, 9.13.3]. |
| Drain pipe + rock | Remove water at the footing so no hydrostatic pressure builds [S, A-9.14.2.1.(2)(a)]. | Pipe above the footing top or missing: water ponds at the wall–footing joint [I]. Pipe below the footing base: undermines bearing soil [I]. |
| Geotextile | Keeps soil fines out of the stone and pipe [S principle, BSD103]. | Missing: silting over years; drain capacity declines [I; 03 and 04 gap: no measured silting rates]. |
| Outlet / sump / cleanouts | Discharge and maintenance access [S]. | Blocked outlet = drain becomes a reservoir at the footing [I]. RWL connected into the perimeter drain overloads it in storms and floods the footing zone [I; BBY two-pipe practice (S)]. |
| Backfill | Drains soil water to the pipe; supports grade [S]. | Fines-rich backfill holds water against the wall; settlement reverses grade [S, 9.12.3.2 intent; I mechanism]. |

#### (c) Moisture paths

- Rain on the gravel strip and splash zone percolates straight down the free-draining backfill to the drain [I] — the drain therefore carries a share of roof drip and splash in every storm, not only groundwater.
- Seasonal perched water on dense glacial till (common in Vancouver) rises around the footing in Oct–Mar, the wet season (72% (S) of annual rain, [03: ev.climate.rain-annual-monthly]) [I for soil behaviour].
- Capillary rise from wet soil under the footing (the drain sits above the footing base, so the base can stay wet even with a working drain) [S, BSI011 as quoted by GBA, search summary].
- Future climate: the 1-in-50 one-day rain rises from 112 mm (S) today to 117 mm (S) (2020s) and 127 mm (S) (2050s) in VBBL Table C-2 [S, V1 p.934] — peak drain loads grow over the 30-year horizon.
- Drying: none outward through soil; the wall dries upward and inward above the slab [S, RDH13 4.8.4 analogue].

#### (d) Thermal bridges and continuity
The footing and wall are outside the thermal envelope in the given design. Under-slab and edge insulation reduce heat flow to the footing soil and so can **raise** the required footing depth to the frost depth (S, 9.12.2.2.(2)) [S]. Exterior insulation to the footing (IG4 option 1) would keep the wall warm and drier [S, RDH13 4.8.1].

#### (e) Ageing and maintenance

| period | expected state | evidence |
|---|---|---|
| Year 0–5 | Backfill settles in the first wet seasons; the grade can flatten or reverse unless compacted and re-graded [S, 9.12.3.2 intent; DOE]. Drain clean and fully functional [I]. | V2; DOE |
| Year 5–15 | Fines migrate into unfiltered stone; roots enter perforations and joints where woody plants are near [S principle, 04: ev.eco.25 (sewers); I for foundation drains]. Flush and camera-inspect from the cleanouts (interval not found in any authoritative source; contractors offer hydro-flush + video [search summary only]) [I]. Sump sediment cleaned [I]. | 04 gap 4 |
| Year 15–30 | Partly silted drain → water stands at footing level longer each storm → wall base and footing damp; if fully blocked, hydrostatic pressure on a dampproofed (not waterproofed) wall [I]. Asphalt dampproofing ageing below grade not quantified in any source read [gap]. Concrete below grade: durable [I]. | — |

### E.3 Conflicts between sources

1. **Drain height:** VBBL: top of pipe below the **bottom** of the slab (S); BBY: high point 75 mm (S) below the **top** of the slab; CMHC Detail 1: pipe beside the footing at its base. CMHC/BSC logic (keep water below the wall–footing joint) is the strictest and is used.
2. **Filter:** CMHC wraps the pipe; BSD103 wraps the drain completely; VBBL has no filter requirement, only the ≤10% (S) fines limit on the stone.
3. **Footing capillary break:** recommended by BSC and CMHC; CGSB calls it "not a current code requirement"; VBBL is silent.
4. **Infiltration setback:** VBBL Figure A-9.14.5.3.(2) ≥5 m (S) from buildings vs City of North Vancouver rain gardens ≥3 m (S) [04: ev.eco.28]. In Vancouver the 5 m governs (S).
5. **Footing depth:** "no limit" (S) for heated buildings on coarse soils vs the 450 mm (S) minimum frost depth that applies once the foundation is insulated; the tool must decide which column applies from the insulation design.

### E.4 UK benchmark

| UK provision | seen in | ours | applies in Vancouver? |
|---|---|---|---|
| Land drain around the building 1000 mm (S, UK) from the ring beam, to a soakaway | DL371; DL174 "drain located min. 1 m from foundation" | footing drain only | **No as a substitute**: VBBL 9.14.2.1 drains the bottom of the foundation wall at the footing [S]. A shallow surface drain at 1 m could be an addition (I). Soakaways must be ≥5 m (S) from buildings in Vancouver. |
| 200 mm (S, UK) MOT Type 3 permeable sub-base under the raft | DL371 | ≥100 mm (S) clean stone | Equivalent in function; VBBL value governs. |
| Filtration trench drain near foundations needs structural engineer approval | EE02 description | — | Same caution applies: do not dig drains below the footing influence zone [I]. |

### E.5 Citations for E
V1 1.1.3.2 (p.80), Table C-2 (p.934). V2 9.12.1–9.12.3, Table 9.12.2.2, 9.13.2.1–9.13.2.4, 9.13.3.1, 9.14.2–9.14.5, 9.15.3, 9.15.4.2/6/9, 9.15.6.3; Notes A-9.12.2.2.(2), A-9.13.4.3.(2)(b), A-9.14.2.1.(2)(a), A-9.14.5.3.(2) and figure. CMHC Detail 1. BBY pp.1–3. CNV. BSI011. BSD103. RDH13 4.7–4.8. DOE. CGSB figure notes. DL371, DL174, EE02. [01: req.foundation-drainage, req.dampproofing-foundation, req.concrete-plinth-strength]; [03: ev.assembly.foundation-drain, ev.assembly.backfill-grade, ev.climate.rain-annual-monthly]; [04: ev.eco.25–.28].

---

## F. Grade at the wall

### F.1 Layers in construction order (outside the wall, after backfill E11)

| # | component | material, dimensions | support / fastening | source |
|---|---|---|---|---|
| F1 | Subgrade under the strip | Compacted (S principle, DOE "tamp") backfill top, shaped to fall away from the wall at ≥5% (I, see F.3) so that water passing the gravel is led away, not down the wall face. Option: a sloped impervious membrane (e.g. EPDM/poly) under the gravel from the wall face outward, lapped behind the dampproofing at grade (I). | On E11. | DOE; (I) |
| F2 | Separator | Non-woven geotextile lining the bed (bottom and outer side) to keep soil out of the stone (I, no source found for strips; same logic as E9). | — | (I) |
| F3 | Edging | Rigid edge (steel, aluminium, HDPE or a small precast curb) at the outer edge, top flush with gravel and soil (I). Stops mulch and soil creeping into the strip and fixes the strip width over decades (I). | Staked into subgrade (I). | (I) |
| F4 | Gravel strip | 300 mm (given) wide. Clean washed stone 20–40 mm (I), 100–150 mm (I) deep. Top at finished grade, 0 (I). No code requires a gravel strip (S, [01] gaps). Gravel (like mulch) keeps the soil below it moist [S, 04: ev.eco.24], so it is a splash reducer, not a drying layer [I]. Splash intensity ordering paving > bare soil > gravel ≈ mulch is illustrative only [03: ev.assembly.splash-gravel-vs-hard]. | On F2/F1. | [01]; [03]; [04] |
| F5 | Exposed foundation face (splash zone) | Concrete exposed 200 (given) above grade: ≥150 mm (S) required. Parging optional on cast concrete: CMHC says it may be sand-cement or an acrylic coating and is "primarily used for aesthetics reasons" [S]. If exterior foundation insulation is added (D options), protect it with ≥12 mm (S) cement parging on wire lath or ≥6 mm (S) PT plywood. | Bonded to concrete (I). | V2 9.15.4.6 (p.99), 9.25.2.3.(6) (p.179); CMHC Detail 2 note (p.6-6) |
| F6 | Topsoil and planting beyond the strip | Sloped 2% (given). Numeric guidance found (all non-Canadian): IRC R401.3 fall of 6 in (S) within the first 10 ft (S) ≈ 5% (I) for soil, and ≥2% (S) for impervious surfaces within 10 ft (S); DOE ≥0.5 in per ft (S) for 10 ft (S) ≈ 4% (I). VBBL gives no number, only "water will not accumulate at or near the building" (S) [S]. **Recommend ≥5% for the first 3 m (I)** for soil; 2% is acceptable only for paving. | — | V2 9.14.6.1 (p.91); IRC (summary); DOE |
| F7 | Roof water | Downspouts need extensions that discharge away without erosion if not connected to a sewer (S rule, [01: req.downspout-discharge]); Burnaby connects RWLs by separate pipe to the storm sump [S, BBY]. Never discharge onto the gravel strip (I). | — | V2 9.26.18.2 via [01]; BBY |

### F.2 Clearances at the wall (finished ground = top of gravel strip, measured conservatively at the highest adjacent surface [I; definition open, 01: U3])

| item | required | current assembly | margin |
|---|---|---|---|
| Foundation above finished ground | ≥150 mm (S) V2 9.15.4.6 | 200 (given) | 50 mm (I) |
| Structural wood (sill plate) above ground without treatment | ≥150 mm (S) V2 9.3.2.9.(3) [01] | +200 (given) at plate underside | 50 mm (I) |
| Untreated wood on ground-contact concrete without separator | ≥150 mm (S) V2 9.23.2.3.(2) | +200 (given) | 50 mm (I) |
| Wood joist/beam ends into concrete at/below grade | treated or 12 mm (S) air space, V2 9.23.2.2 | not applicable (no members pocketed) (I) | — |
| Sheathing (structural wood panel) | No explicit clearance; it is structural wood, so the 150 mm (S) treatment trigger of 9.3.2.9.(3) applies [I interpretation] | bottom edge at about +200 or lapped lower (junction A) | depends on A |
| Moisture-sensitive cladding | ≥200 mm (S) V2 9.27.2.4.(1) | cement board + render are not in the listed examples (untreated wood, plywood, OSB, hardboard) [S] | — |
| Stucco (render) on wood frame | ≥200 mm (S) V2 9.28.1.4 (exempt only over concrete or masonry) | render bottom ≈ +200 to +215 (I) above the base flashing (A) | **0–15 mm (I)** |
| Splash zone (German practice) | 0–300 mm (S) above ground should be splash-resistant [03: ev.assembly.splash-zone-de] | render starts at ≈ +200 | render sits inside the splash zone (I) |
| UK DPC above external ground | ≥150 mm (S, UK) DL371, DL207, MG1 | — | Vancouver values above govern |

**Main F problem:** every clearance is at its code minimum on day 0. Settlement, mulch, added soil or gravel top-ups of 25–75 mm (I, illustrative) over the decades put the render and possibly the sheathing below the line. Raising the foundation to ≥300 mm (I) above finished grade, or lowering the grade at the wall, gives a 100 mm (I) allowance and moves the render out of the splash zone [I].

### F.3 Performance

#### (a) Control-layer pen test

| layer | path | breaks |
|---|---|---|
| Surface water shedding | Topsoil at 2% (given) → gravel top → (under) sloped subgrade/membrane → away | 2% too flat for soil (F6); flat-bottomed strip ponds against the wall face [I]. |
| Splash control | Gravel surface absorbs drop energy [illustrative, 03]; foundation 200 (given) between gravel and render | Splash still reaches 200–300 mm (S zone) [I]. |
| Water at the wall face below grade | Dampproofing from grade down (E6) | Water entering the gravel goes straight to the wall–backfill interface [I]. |
| Biological / root control | Edging + geotextile + no planting in strip | None defined [I]. |

#### (b) Components

| component | function | failure |
|---|---|---|
| Gravel strip | Reduces splash and soil spatter on the plinth; keeps vegetation off the wall; inspection zone [S for vegetation, 03: ev.assembly.cladding-maintenance-bc "remove vegetation encroaching on cladding"; I otherwise]. | Without separator/edging it fills with soil and leaf litter and becomes a planting bed within a few years [I]. Gravel raised against the wall reduces clearance [S principle, 04: ev.eco.24]. |
| Sloped subgrade/membrane | Leads infiltrating water away from the wall [I]. | Flat or back-sloped: the strip acts as a gutter along the wall [I]. |
| Edging | Holds geometry; stops mulch creep [I]. | Soil creeps over, grade rises [I]. |
| Topsoil slope | Sheds surface water [S, 9.14.6.1 intent]. | Settled or flat soil: water accumulates at the building [S intent]. |
| Exposed concrete / parging | Durable splash-zone material [I]. | Parging delaminates where water gets behind it and freezes (≈37 (S) air freeze–thaw cycles a year, [03: ev.climate.freeze-thaw]) [I]. |

#### (c) Moisture paths
Wind-driven rain on the wall runs down the render, off the base drip (A), onto the gravel; splash rebounds onto the concrete and render up to the splash zone [I; S for zone height]. Roof drip if there are no gutters lands at the drip line — a 300 mm (given) strip catches it only if the eave projection is ≤ about the strip width (I). Soil moisture under the gravel stays high [S, 04: ev.eco.24]. North and tree-shaded faces dry slowest [S, 03: ev.assembly.orientation-drying].

#### (d) Thermal
No thermal role, except: the above-grade 200 mm (given) concrete face is the cold path of D; insulating it (D options) changes the splash-zone material to parging on lath (F5) [S rule; I consequence].

#### (e) Ageing and maintenance — soil, plants and roots

| period | expected state | evidence |
|---|---|---|
| Year 0–5 | Backfill and topsoil settle; slope flattens; owners add mulch or soil against the wall (common) [I]. Leaf litter and soil enter the strip; first moss/algae on the plinth on shaded faces [04 stages; I timing]. | 04; DOE |
| Year 5–15 | Unseparated gravel silts and supports weeds; grade rises 25–75 mm (I, illustrative); splash and biofilm on render base increase [I]. Shrubs planted next to the wall root into the moist strip and towards the drain rock [I]; roots exploit existing joints and cracks, not sound pipe [S, 04: ev.eco.25]. | 04 |
| Year 15–30 | Edging displaced by roots or frost (I). On shrinkable clay, trees within about their mature height dry the soil and move the foundation (UK/Ottawa rule, apply only on clay) [S, 04: ev.eco.26/.27]. | 04 |

Maintenance: annual review and removal of vegetation encroaching on cladding [S, 03: ev.assembly.cladding-maintenance-bc]; re-level and wash or replace the gravel and restore the slope when the clearance drops (I); keep irrigation heads and infiltration features off the strip — VBBL infiltration ≥5 m (S) from buildings (not applicable to ordinary landscaping (S)).

### F.4 Conflicts between sources
1. **Slope:** VBBL none; IRC ≈5% (I from 6 in/10 ft (S)) soil and 2% (S) paving; DOE ≈4% (I); the brief's 2% (given) matches only the paving value.
2. **Gravel at the wall:** used as splash protection in practice, but 04 (Kentucky extension) treats gravel like mulch: it keeps soil moist and should not be heaped against walls [S, 04: ev.eco.24].
3. **Splash height:** VBBL 200 mm (S) clearance vs German 300 mm (S) splash zone vs UK 150 mm (S) DPC.
4. **"Finished ground" with a gravel strip:** undefined in VBBL [01: U3].

### F.5 UK benchmark
| UK provision | seen in | ours | applies? |
|---|---|---|---|
| Dimensioned ground-to-DPC/render distance on the drawing ("150mm minimum") | DL371, DL207, MG1 | not dimensioned | **Yes**: dimension the 200 mm (S) clearance from the gravel top and add the settlement allowance [I]. |
| Stop bead to render at the base | DL371 | not specified | Yes (junction A). |
| Gravel strip / external drainage build-ups | EE12 (linear drainage), EE02 (filtration trench) — public pages give titles and short notes only, no build-up | — | Could not be benchmarked; numbers paywalled. |

### F.6 Citations for F
V2 9.14.6.1, 9.15.4.6, 9.23.2.2–9.23.2.3, 9.25.2.3.(6), 9.27.2.4, 9.28.1.4; [01: req.wood-structural-decay-treatment, req.cladding-clearance-to-grade, req.stucco-clearance-to-grade, req.surface-grading, req.downspout-discharge, U3]; CMHC Detail 2 note; DOE; IRC (summary); BBY; [03: ev.assembly.splash-*, ev.assembly.cladding-maintenance-bc, ev.climate.freeze-thaw, ev.assembly.orientation-drying]; [04: ev.eco.24–.28]; DL371, DL207, MG1, EE02, EE12.

---

## G. Rainscreen wall field

Assumptions: studs at 400 mm (I) o.c. (not given); air barrier is interior polyethylene (sealed polyethylene approach) (I), the most common BC Part 9 approach and the only one CMHC draws for Detail 1; if the design uses the sheathing membrane as air barrier, its laps must be sealed (I).

### G.1 Layers in construction order (inside → outside)

| # | component | material, dimensions | support / fastening | source |
|---|---|---|---|---|
| G1 | Studs + batts | 38×140 (given) with batts. For R-20 batts in 2×6 at 16 in: framed portion effective RSI 2.36 (S) (nominal 3.34 (S)); whole wall with typical layers RSI 2.88 (S). **VBBL 2025 requires RSI 3.85 (S) effective for walls on both paths** → shortfall ≈0.97 (I). | — | IG4 p.9; V1 Table 10.2.2.6 (p.821) |
| G2 | Sheathing | 12 mm (given) wood-based; wood sheathing ≤12.5 mm (S) is exempt from the low-permeance position rule [S]. | Nailed to studs (Part 9 tables, not reviewed) | V2 9.25.5.1.(3) (p.182) |
| G3 | Sheathing membrane (WRB, drainage plane inner boundary) | CAN/CGSB-51.32 breather type (S, rule); laps ≥100 mm (S), upper over lower (S). City: one layer of 60-minute paper, two layers of 30-minute paper, or an approved housewrap; compatible materials if more than one (S). Integrated with every flashing (junction A, openings). | Stapled; held by strapping (I). | V2 9.27.3.2–9.27.3.3 (p.196); BUL p.3 |
| G4 | Strapping (furring) | Required minimum 19×38 mm (S) over sheathing, ≤600 mm (S) o.c., "securely fastened to the framing" (S). Recommended: 19 (given) × 64 mm (I) preservative-treated (CMHC ST-3 "P.T. wood strapping" [S]) on every stud line at 400 mm (S, CMHC for stucco). **Furring may cover ≤20% (S) of the furred area**: 64/400 = 16% (I) OK; 89/400 = 22% (I) not OK; 38/400 = 9.5% (I). At cement-board vertical joints, use a 64 mm (I) or doubled strap so both boards get edge fasteners (I). Strapping must not block drainage at window jambs [S, CMHC 5-11; BEDG 5-15]. | Through membrane and sheathing into studs: for heavy claddings such as stucco on 19 mm strapping at 400 mm, CMHC suggests 64 mm (S) nails at 300 mm (S) o.c. on stud lines. City inspection: "furring strips, nailed 400 mm (S) on centre" (ambiguous: spacing of strips or nails). Fasteners corrosion-resistant (S) and compatible with the PT chemistry (S, BUL; City Bulletin 2006-002-BU, not read). I recommend stainless or hot-dip galvanized screws, 76 mm (I), at 300 mm (I), because cement board + render is heavier than siding (I). | V2 9.27.5.3 (p.199), 9.27.2.2.(2)(c) (p.195), 9.27.5.5 (p.200); CMHC p.5-7 (pdf p.71), p.5-11; BUL pp.2–3 |
| G5 | Drained and vented cavity | 19 mm (given). Code capillary break: drained and vented air space ≥9.5 mm (S) over the full wall; Note A-9.27.3.1: drainage space ≥10 mm (S); City: ≥10 mm (S), 80% (S) open, vented to outside; Vancouver Part 5 note recommends ≥19 mm (S) [01: req.part5-rainscreen-note]. 19 mm dries better than 10 mm with little gain beyond [S, 03: ev.assembly.cavity-depth-ventilation]. Vented at bottom **and** top (top + bottom dried faster than bottom only) [S, same entry]. Cavity top must not connect to the soffit/concealed space above (S rule; junction B). May be interrupted only by penetrations, flashing and ≤20% (S) furring. | — | V2 9.27.2.2.(1)–(3) (pp.194–195); A-9.27.3.1 (p.669); BUL pp.2–3 |
| G6 | Fire blocking in the cavity | VBBL requires fire blocks in concealed wall spaces "including spaces created by furring" at each floor level and at ≤3 m (S) vertical / ≤20 m (S) horizontal — **except** where the insulated wall has not more than one concealed air space ≤25 mm (S) thick [S]. Our 19 mm (given) cavity is the only air space (stud bays are filled with batts) → **no fire blocks required** [S]. If the cavity is deepened beyond 25 mm (S) (e.g. UK-style 50 mm), fire blocks become mandatory and must be detailed to drain (I). | — | V2 9.10.16.2.(1)–(2) (p.72); 9.10.16.3 materials (p.72–73) |
| G7 | Insect screen | Required at all vent openings (S rule of the City bulletin). Corrosion-resistant perforated vent strip or mesh at the cavity base (A) and top (B) (I); open area not specified in any source read (I). | Fixed to strapping ends (I). | BUL pp.2–3; CMHC 4-D details list "insect screen"; DL371 "insect mesh to base of ventilated cavity" |
| **As drawn** G8a | Cement-board carrier | 12 mm (given) cement board. Not a cladding listed in 9.27.1.1; with a render it is a non-listed cladding/substrate → **Part 5** (S, 9.27.1.1.(6)) unless a CCMC-evaluated system is used (I). Fastening (no North American exterior manufacturer guide was obtained): by analogy with VBBL panel cladding, nails 51 mm (S) for panels >7 mm thick at 150 mm (S) along edges and 300 mm (S) along intermediate supports (table layout read from the PDF; analogy is (I)). Board joints over strapping with a small gap (3 mm reported by a UK installer, search summary only; (I)), staggered (I), taped with alkali-resistant mesh (I). | Corrosion-resistant screws (I). | V2 9.27.1.1, Table 9.27.5.4.-A (pp.193–200); Knauf/NHBC (summary only) |
| **As drawn** G9a | Render 20 mm (given) | Lime render is not a Part 9 cladding → Part 5 (S, [01: req.cladding-route-9-27-or-part5]). UK practice for render on boards: alkali-resistant mesh embedded in the basecoat over the whole surface; movement joints formed through the board at floor zones, per system manufacturer [NHBC 6.11.8, search summary only]. | Bonded to board (I). | [01]; NHBC (summary) |
| **Conventional Part 9 equivalent** G8b | Backing paper + stucco lath | Lath required for stucco on any substrate other than masonry — **including cement board** (S rule, 9.28.1.2.(1)). Galvanized (or painted copper-alloy steel) expanded metal ≥0.98 kg/m² (S) or welded/woven wire (e.g. 1.15 mm (S) wire at ≤25 mm (S) mesh). Held ≥6 mm (S) off the backing by self-furring devices; long dimension horizontal; laps ≥50 mm (S); end joints staggered over framing. Fasteners corrosion-resistant, not aluminium; nails ≥3.2 mm (S) diameter with ≥11.1 mm (S) heads, or staples ≥1.98 mm (S), penetrating 25 mm (S) into framing; spacing ≤150 mm (S) vertical × 400 mm (S) horizontal, or 100 × 600 mm (S), or ≥20 (S) fasteners per m². CMHC for stucco over strapping: 50 mm (S) stainless staples at 150 mm (S) with strapping at 400 mm (S); or fasten strapping lightly and then lath through to studs with longer fasteners [S]. | Into strapping/studs | V2 9.28.1.2, 9.28.3, 9.28.4 (pp.205–207); CMHC p.5-7 |
| **Conventional** G9b | Three-coat portland cement stucco | ≥2 base coats + 1 finish, total ≥15 mm (S): first coat ≥6 mm (S) fully embedding lath and scored; second ≥6 mm (S); finish ≥3 mm (S). CMHC typical 22 mm (S) in three layers. Mix 1 portland cement : 0.25–1 (S) lime : 3.25–4 (S) parts aggregate per part cementitious (or 1:1 masonry cement). Base above freezing; stucco ≥10 °C (S) during and for 48 h (S) after application. A drained cavity dries the stucco from both sides; extra moist curing may be needed [S, CMHC 7-17]. Clearance ≥200 mm (S) above finished ground. | — | V2 9.28.5–9.28.6, 9.28.1.4 (pp.205–208); CMHC pp.7-16–7-17 |
| G10 | Movement / control joints | CMHC: control joints wherever differential movement is possible and in areas exceeding 4572 mm (S) in length, carried through the lath and accessories; avoid T- or L-shaped panels [S]. PCA/ASTM C1063-type guidance: no panel dimension >18 ft ≈ 5.5 m (S) and ≈13.4 m² (S) per panel [secondary: 03 unverified list; USG search summary]. Horizontal joint at each floor line for frame shrinkage (CMHC: a 3-storey frame can shrink 15–20 mm (S)) [S]; for this single storey, plates shrink ≈1.7 mm (I) (D.2(e)). | — | CMHC pp.2-9, 7-17 |
| G11 | Sealant joints | Required where different claddings meet vertically unless lapped/flashed (S rule, [01: req.sealant-cladding-change]); backer rod + sealant at openings (CMHC details). | — | [01]; CMHC 4-D details |

Figures: CMHC 4-D build details pp.6-88–6-93 (P.T. strapping, insect screen, stucco "including lath, paper & accessories"); CMHC ST-3 assembly sheet p.5-11 (22 mm stucco, 19 mm cavity, P.T. strapping, sheathing paper); UK TW3 preview (breather membrane, 25 mm vertical treated battens, paper-backed metal lath, 3-coat render).

### G.2 Performance

#### (a) Control-layer pen test (wall field)

| layer | element | continuity / transfer | breaks or weaknesses |
|---|---|---|---|
| Water shedding (1st plane) | Render face (+ finish coat) | Sheds to base drip (A) | Lime render absorbs water readily [S, 02: ev.lime-render.absorption]; cracks admit water [S, 02: ev.cement-render.cracking-trapping]. |
| Capillary break / drainage | 19 mm (given) vented cavity | Water on the back of the board runs down to the base flashing (A) | Strap fastener holes are behind the strap, sheltered (I). Mortar droppings or render squeeze-through can bridge the cavity (I). |
| Drainage plane / WRB (2nd plane) | Sheathing membrane, shingle-lapped ≥100 mm (S) | Laps onto flashings at openings and base (A) | Fastener penetrations at every strap fastener (I); membrane not waterproof — adequate only with a ≥9.5 mm (S) drainage space [S, A-9.27.3.1]. |
| Air barrier | Interior poly (assumed) | Sealed to plate/slab at base (D14), to ceiling poly (B) | Electrical boxes, top/bottom plates [S, IG4 pp.13–16]. Wind pressure on the cladding is not resisted by the poly; the cavity pressure-equalizes poorly without compartment seals at corners [S, CMHC 3-6–3-8]. |
| Vapour control | Interior poly ≤60 ng/(Pa·s·m²) (S) | — | Inward vapour drive from sun-heated wet render is reduced by the vented cavity [S, CMHC 3-13]. A low-perm render coating is allowed because it is outboard of a vented space (S, V2 9.25.5.2.(1)(c)–(2)) [S]. |
| Thermal | Batts between studs | Stops at the plate (D) | Effective RSI 2.88 (S) < 3.85 (S) required. Strapping and cavity add only ≈0.16 (S) [CMHC ST-3 table]. |

#### (b) Components

| component | function | failure if missing / reversed |
|---|---|---|
| Sheathing membrane | Intercepts incidental water; inner boundary of drainage plane [S, 9.27.3.1]. | Reverse laps send water behind the membrane into sheathing [S, 9.27.3.3.(3) rule]. |
| Strapping | Forms the capillary break and the drainage/vent space; carries the cladding [S]. | A cavity that is not vertically oriented "can retain water against the sheathing paper at each horizontal bearing line" (CMHC 3-10, said of lapped siding without strapping) — so strapping must run vertically [S]; undersized fastening lets heavy render sag or crack [S, CMHC 5-7]. Wider than 20% (S) coverage reduces drainage/ventilation area below the code limit [S]. |
| Vented cavity | Drainage and ventilation drying of sheathing [S, 03: ev.assembly.rainscreen-performance]. | <6 mm (S) gaps are bridged by water [S, 03: ev.assembly.capillary-gap-physics]; unvented top roughly halves the drying benefit (illustrative) [03]. |
| Insect screen | Keeps insects and rodents out of the cavity [S intent, BUL]. | Missing: nests block drainage at the base [I]. Fine mesh clogs with debris and cuts venting [I]. |
| Cement board | Stable, non-combustible substrate for render [I]. | Joints not on strapping crack the render along the joint [I]. |
| Lath (conventional) | Holds stucco, limits crack width [S, CMHC 7-16]. | Without lath on board, Part 9 stucco is non-compliant [S]. |
| Control joints | Relieve shrinkage and frame movement [S, CMHC]. | Random cracking, worst at opening corners [S, 03 unverified list; CMHC "excessive cracking reported with cavity stucco"]. |

#### (c) Moisture paths
Wind-driven rain (east-weighted in Vancouver per RDH, south per BC Housing — unresolved [03: ev.climate.wdr-direction]) wets the render; water through cracks and joints runs down the board back, across the cavity only where bridged, and out at the base [S principle; I path]. Driving-rain wind pressure 160 Pa (S) [V1 Table C-2] can push water through open board joints [I]. Sheathing re-wets from October and dries May–September [S, 03: ev.assembly.seasonal-drying-monitor]. Interior vapour is stopped by the poly [S].

#### (d) Thermal bridging
Studs, plates and headers are the bridges in the given wall (counted in the RSI 2.36 (S) framed value). Reaching RSI 3.85 (S) needs exterior insulation (e.g. 38 mm (S) rigid mineral wool behind the strapping, as in BEDG's sample assemblies) or deeper/double framing; with exterior insulation, the strapping is fastened with long screws through the insulation, typically every 12–24 in ≈ 300–600 mm (S), at about a 5% (S) thermal penalty [S, RDH13 3-46]. This changes G4 and junction A [I].

#### (e) Ageing and maintenance

| period | expected state | evidence |
|---|---|---|
| Year 0–2 | Shrinkage hairline cracks in render, concentrated at opening corners; cavity stucco may crack more if not moist-cured [S, CMHC 7-17]. | CMHC |
| Year 5 | Sealant repairs/replacement at openings in a rainscreen assembly every 5 years (S); inspection every other year (S) [S, CMHC 9-3, Table 9.2]. Biofilm/green growth starts on north and shaded faces and in the splash zone [04 stages; I timing]. Clean with non-pressurised water; pressure washing drives water behind cladding [S, 03: ev.assembly.cladding-maintenance-bc]. | CMHC; 03; 04 |
| Year 10–15 | Recoat stucco with a new acrylic coating at about 10 years (S) in CMHC's sample renewal plan [S]. Lime render: sacrificial surface renewed with limewash; frequency product-specific [S, 02: ev.lime-render.weathering]. Insect screens partly clogged; clean at the base [I]. | CMHC Table 9.2; 02 |
| Year 15–30 | Galvanized fasteners in a wet cavity corrode; CMHC requires lath, membrane and flashing fasteners to last at least as long as the stucco [S]. PT strapping sound if drained [I]. Cracks widen at uncontrolled panels; local render repair or full re-render near year 30 if joints were omitted [I]. Second-plane membrane protected from UV: no renewal expected in sources read [I]. | CMHC 5-11 |

### G.3 Conflicts between sources
1. **Cavity depth:** VBBL 9.5 mm (S) vs Note/City 10 mm (S) vs Vancouver Part 5 note 19 mm (S) vs UK insurers/NHBC 25 mm (S, summary) and DL207 50 mm (S, UK). 19 mm (given) meets Vancouver; deeper than 25 mm (S) triggers fire blocks.
2. **Strapping fastening:** VBBL "securely fastened" only; City "nailed 400 mm on centre" (ambiguous); CMHC 64 mm (S) nails at 300 mm (S) for stucco. No source gives a value for cement board + render.
3. **Control-joint spacing:** CMHC 4572 mm (S) vs PCA/ASTM 18 ft ≈5.5 m (S, secondary).
4. **Render substrate:** VBBL Part 9 stucco needs lath even over cement board (S); proprietary thin-coat systems on board (UK practice, NHBC) are Part 5 in Vancouver (S).
5. **Library check:** [03: ev.assembly.capillary-break-code] quotes VBBL 2014 "open drainage material at least 9.5 mm"; VBBL 2025 9.27.2.2.(1)(b) requires 10 mm (S) thick, 80% (S) open. 01 already records the change; 03 should be updated.

### G.4 UK benchmark
| UK provision | seen in | ours | applies in Vancouver? |
|---|---|---|---|
| Cavity barriers behind cladding (DL371 Oct 2025 update) | DL371 description | none | BC equivalent is VBBL 9.10.16.2 fire blocks; **not required** for a single ≤25 mm (S) air space [S]. Required if the cavity is >25 mm (S). |
| Paper-backed metal lath on 25 mm (S, UK) vertical treated battens, 3-coat render | TW3 | cement board + 20 mm render | Confirms the Part 9 conventional equivalent (G8b/G9b) [S]. |
| Treated battens and counter-battens, minimum 50 mm (S, UK) cavity | DL207 | 19 mm (given) | No — Vancouver minimum 9.5–19 mm (S); 50 mm would need fire blocks. |
| Breather membrane overlaps sealed with tape | DL207, DL174 | lapped only | Only if the membrane is the air barrier [I]; VBBL requires laps ≥100 mm (S). |
| Insect mesh at the cavity base | DL371, DL207 | not specified | **Yes**, required by the City bulletin [S]. |
| Alkali-resistant mesh over whole board; movement joints through board at floor zones | NHBC 6.11.8 (summary) | not specified | Yes as practice for a Part 5 board system [I]. |

### G.5 Citations for G
V2 9.10.16.2–9.10.16.3, 9.25.4.2, 9.25.5.1–9.25.5.2, 9.27.1.1, 9.27.2.2, 9.27.3.2–9.27.3.3, 9.27.5.1–9.27.5.7, 9.28; Notes A-9.27.2, A-9.27.2.2, A-9.27.3.1. V1 Table 10.2.2.6, Table C-2. BUL. CMHC pp.2-9, 3-6–3-13, 5-7, 5-11, 6-88–6-93, 7-16–7-17, 9-3, Table 9.2. IG4 p.9. RDH13 pp.3-45–3-49. BEDG sample pp.5-15, 6-8. [01], [02], [03] entries named above. DL371, DL174, DL207, TW3. NHBC/Knauf (summary only).

---

## Library cross-check (entries in 01/03/04 affected by this work)

| entry | finding | action |
|---|---|---|
| 01 Gaps: "Thermal and energy rules at the plinth … were not researched" | VBBL 2025 **deletes Section 9.36** (V2 p.238); energy is in V1 Part 10. Slabs RSI 2.45 (S), walls and foundation walls RSI 3.85 (S), airtightness 2.5 ACH50 (S) for houses (10.2.1.4). BC Energy Step Code (BCBC 9.36.6) therefore does not apply inside Vancouver; Vancouver uses its own TEDI ≤20 kWh/m²·a (S) performance path (V1 10.2.2.4). [S for values; I for the Step-Code statement, drawn from the deletion] | Add entries. |
| 01 U6 (9.27.5.3/5.5/5.7 and 9.14.3–9.14.5 read only in 2019) | Confirmed in VBBL 2025 text with the same values. | Close U6. |
| 03 ev.assembly.capillary-break-code | Drainage material 9.5 mm (2014) → 10 mm (S) in 2025. | Update. |
| 03 Unverified: Bulletin 2009-009 blocked | Read this session (BUL). Adds "insect screening is required at all vent openings" and "furring strips, nailed 400 mm on centre". | Close. |
| 04 ev.eco.28 (rain gardens ≥3 m, North Vancouver) | Conflicts with VBBL Note A-9.14.5.3.(2): infiltration systems ≥5 m (S) from buildings in Vancouver. | Add conflict note. |
| 04 ev.eco.24 (gravel keeps soil moist) | Consistent; the tool must not model the gravel strip as a drying layer. | None. |
| SPEC `ground_clearance_mm` | Needs a stated datum where a gravel strip exists (top of gravel used here). | Flag to spec owner. |

No approved entry is contradicted on a governing value; the two items above are edition updates.

---

## Open questions

1. **Part 10 interpretation (City of Vancouver energy staff):** does "insulation under all slab area and around edge of slab" require the slab-edge strip to reach RSI 2.45, or is a thermal break accepted? Does the 200 mm above-grade strip of stem wall count as a "foundation wall" (RSI 3.85)?
2. **Building type:** is the tool's building a house under 10.2.1.4 (prescriptive/performance path) or another use under 10.2.1.2 (ASHRAE 90.1/NECB)? This changes every thermal target.
3. **Wall thermal strategy:** the given wall (≈RSI 2.88) fails RSI 3.85. Will the design add exterior insulation (changes G4 fastening, D/A continuity) or deepen framing?
4. **Soil and groundwater at the site:** clay vs till vs sand changes footing depth (450 mm vs 1.2 m), dampproofing vs waterproofing, and tree setbacks.
5. **Vancouver storm connection rules** (Book II 2.4.2.5, City sewer by-law): is a two-pipe system to a storm sump required as in Burnaby? Not read.
6. **"Finished ground" datum** with a gravel strip, and whether the City measures 9.28.1.4 from gravel or soil ([01: U3]; BC Code Appeal Board decision #1114 not read).
7. **Cement board + render system:** is a CCMC-evaluated system intended? Otherwise a Part 5 professional design is required. No North American manufacturer installation guide for exterior cement-board render over strapping was obtained; fastener, joint gap and movement-joint values above are inferred.
8. **Air-barrier strategy** for the wall (interior poly vs exterior membrane) decides the D14 and junction A tie-ins.
9. **2-D thermal model** of the slab edge/stem/plate to get the linear transmittance and the interior surface temperature at −7 °C (S) design (THERM or similar). No published value for this geometry was found.
10. **Drain maintenance interval** (flushing, camera inspection) and silting rates: no authoritative source (same gap as 03/04).
11. **Paywalled or unread sources** that likely hold the actual drawn details: BC Housing *Building Envelope Guide for Houses* (2nd ed. 2020); BEDG 2nd ed. Detail 1 "Foundation Wall at Slab Thermal Insulation"; CGSB-149.11-2024; ASTM C1063; Knauf BBA 09/4633; City Bulletin 2006-002-BU (fasteners in PT wood).
12. **Seismic bracing:** which braced-wall-panel type the wall uses (WSP-A … DWB) sets anchor-bolt spacing (0.5–2.4 m (S)).

---

## Counts

Counted with a text search over this file after writing (tags as defined in 0.1; the legend and this paragraph are excluded). A number repeated in two places is counted twice.

| section | numbers SOURCED (S) | numbers INFERRED (I) |
|---|---|---|
| Summary table + reference geometry (0.3) + library cross-check | 18 | 12 |
| D slab edge / wall / sill | 80 | 29 |
| E footing / drainage | 57 | 22 |
| F grade at the wall | 27 | 28 |
| G rainscreen field | 91 | 29 |
| **Total** | **273** | **120** |

Values taken from the brief and marked "(given)": 40 occurrences. Performance claims: about 131 tagged [S] and 90 tagged [I].

Recount after edits with `grep -o` on the round-bracket tags and subtract the two legend/instruction occurrences of each.
