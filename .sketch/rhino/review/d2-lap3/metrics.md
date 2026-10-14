# Metrics

Spec: detail02.json

## Embodied carbon per metre of opening (A1–A3, kgCO2e)

The slice is taken as representative of the opening; items flagged per: "opening" are counted once per 4.8 m opening.

Total 692 kgCO2e/m · biogenic carbon stored 316 kgCO2e/m (reported separately, not netted).

| junction | kgCO2e per m of opening | basis | intensity (kgCO2e/m²) |
|---|---|---|---|
| D door unit (frame, glass, drive) | 292.2 | 2.785 m of elevation | 104.9 |
| E subgrade / drains | 4.3 | per m only | – |
| F floor | 39.1 | 2.24 m of plan | 17.4 |
| H floor-band head + canopy | 148.5 | per m only | – |
| I planting bed | 6.1 | 1.75 m of plan | 3.5 |
| J water corner + rain garden | 39.2 | per m only | – |
| M lined landing | 20.4 | 1.72 m of plan | 11.9 |
| P granite terrace + jamb ground | 8.9 | 1.4 m of plan | 6.4 |
| T threshold | 83.6 | per m only | – |
| U upper floor and wall | 20.3 | per m only | – |
| Z jamb A wall (W1) base | 29.5 | per m only | – |

A1–A3 only. Replacement over a 60-year study period (B4) is not included yet; R4 estimates it at about +214 kgCO2e/m for v2.

| material | kgCO2e/m | factor (kgCO2e/kg) | source |
|---|---|---|---|
| igu-triple | 208.6 | 1.8 | INFERRED per kg of glass, triple tempered low-e argon: Pilkington Insulight Triple 4/12/4/12/4 EPD-IES-0002592 47.8 kgCO2e/m2 (2023) and ift 2017 40.4; Saint-Gobain Climatop 4-14-4-14-4 49.6 (S2, One Click LCA) = 1.35-1.65/kg on EU float; + North American float (NGA 1,430 kg/t, S2, expired Dec 2024; Vitro 2023 1,350) and tempering of two lites -> 1.8. Valid for 4/4/4 to 6/4/6; thin-centre triples keep ~6-8 kg/m2 of fixed per-m2 items |
| aluminium | 78.5 | 6.57 | SOURCED Aluminum Association extruded aluminum EPD UL 4786092064.102.1 (2014, extended to 16 Aug 2022, EXPIRED): 6,570 kgCO2e/t A1-A3, D -4,130. https://www.aluminum.org/sites/default/files/2022-04/102.1_AluminumAssocication_EPD_ExtrudedAluminum.pdf; imported extrusions can be 2-3x [I] |
| door-unit-woodalu | 75.0 | 1 | CARRIER (quantity entered as kgCO2e/1000 per m of opening): research 14 §7 ENERsign primus wood-Al lift-and-slide, A1-A3 excl. glass: frame 10-21 (mid 15) + hardware 3-7.5 (5) + SIEGENIA drive ~7 = 27 kgCO2e/m2 of opening x 2.785 m = 75 kgCO2e per m [I from S*: Nordic wood-Al EPDs 52-63/m2 incl. glass]. No product EPD: require EN 15804+A2 EPD in tender |
| steel-prefinished | 51.3 | 2.68 | 09 prefinished coil 2.60-2.75 [S2] |
| stainless | 43.0 | 5 | INFERRED generic austenitic 304/316 of unstated origin: midpoint of European average 2.8 kgCO2/kg (Outokumpu 2023, S2) and global average 7 kgCO2e/kg (Outokumpu citing CRU/worldstainless 2023-24, S2); range 1.8-7; fabrication excluded. Use stainless-epd when the spec names an EPD-backed mill |
| concrete-lowcarbon | 26.1 | 0.0463 | 09 CLF-G Lafarge 25 MPa 56 d 111 kg/m3 [S2]; k [I] |
| hdpe | 24.7 | 2.15 | SOURCED (proxy) PPI EPD 1045, 4in DR11 HDPE conduit, 1 kg, valid to 24 Jul 2030: GWP 2.15 kgCO2e/kg (A1 1.66, A2 0.137, A3 0.359). Used for geomembrane, root barrier, drain board, corrugated pipe [I] |
| pu-structural-160 | 19.8 | 4 | Armatherm 500-080 class: CS 210 psi = 1.45 MPa, lambda 0.26 Btu-in = 0.0375 (US data sheet V3, S2); ~160 kg/m3 (older UK sheet lowest grade: 2.0 MPa, lambda 0.031) [S2/I]. Engineer to confirm long-term stress and creep under the track |
| concrete-f2-40scm | 19.2 | 0.0744 | SOURCED Concrete BC EPD 348 25 MPa air F-2 GUL+40 % SCM 178.62 kgCO2e/m3 (09 §3.1, S); k [I] |
| glulam | 18.3 | 0.2585 | SOURCED Kalesnikoff glulam EPD 296 (ASTM; South Slocan BC; 16 Mar 2022-16 Mar 2027): A1-A3 fossil 124.50 kgCO2e/m3, 481.68 kg/m3 (446 od), 817.67 kgCO2/m3 stored (C3/C4). https://kalesnikoff.com/wp-content/uploads/2022/05/Kalesnikoff-Glulam-EPD-.pdf; k [I] |
| soil-imported | 18.0 | 0.005 | INFERRED: imported growing / bioretention medium (screened soil, sand, compost under cut-off); aggregate-like |
| aggregate | 17.9 | 0.005 | SOURCED (S2): California Buy Clean crushed aggregate 1.94 kg/t; UEPG EU average 5 kg/t; Holcim UK granite 5.19 kg/t (12 AGG, S*); bulk density [I]; A4 haul often exceeds A1-A3 |
| plywood | 14.8 | 0.453 | 09 E-PLY 219.32 kg/m3 at 484 [S]; biogenic OEK -10.29/m2 at 12 mm [S2/I] |
| graphite-eps | 12.6 | 2.39 | 09 CLF-G 1.47/RSI [S2]; Neopor R-4.7/in, 20 kg/m3 [I] |
| woodfibre-board | 10.5 | 0.449 | 09 E-GTX GUTEX 75.8 / -280 per m3 at 169 kg/m3 [S]; k mid of 0.037-0.047 [I] |
| reclaimed-stone | 10.0 | 0.01 | INFERRED: salvaged granite setts/slabs or salvaged pavers; cleaning, re-sawing, local haul only (cut-off rule) |
| gypsum | 8.8 | 0.2795 | SOURCED Gypsum Association industry EPD 10270 (NSF; 28 Apr 2020-15 Apr 2026, EXPIRED): 5/8 Type X, 277 kgCO2e A1-A3 per 92.9 m2 = 991 kg at 15.9 mm. https://info.nsf.org/Certified/Sustain/ProdCert/EPD10270.pdf; k [I] |
| rebar-eaf-pnw | 4.8 | 0.53 | SOURCED (S2) Nucor Seattle rebar via CLF-G (09 §3.1) |
| membrane-poly | 4.0 | 2.5 | generic polyethylene [I] |
| polymer-concrete | 3.5 | 0.555 | SOURCED ACO DRAIN Multiline Seal in V150S Type 10.0, IBU EPD-ACO-20250409-CBK1-DE (18 Mar 2026-17 Mar 2031): GWP-fossil A1-A3 18.8 kgCO2e per running metre at 33.9 kg/rm (polymer concrete 89-96 %, galvanised edge rail 4-10 %); density, k [I] |
| cellulose-dense | 3.5 | 0.513 | 09 CLF-G CIMA 1.12/RSI [S2]; OEK biogenic -82.47/m3 at 45 kg/m3 [S2]; 56 kg/m3 dense-pack, k [I] |
| cedar-siding | 3.4 | 0.305 | 09 E-WRC 1.42 fossil, -3.95 biogenic per m2 at 4.65 kg/m2 [S]; density, k [I] |
| softwood-pt | 3.0 | 0.15 | INFERRED: CWC BC lumber 0.088 + MCA/CA treatment and re-drying ~0.06; no treated-wood EPD found; density incl. retention + MC [I] |
| pu-structural | 2.8 | 4 | INFERRED 4.0/kg rigid PU. Armatherm 500 EPD EPD-IES-0026744 (EN 15804+A2, USA, 14 Nov 2025 - 14 Nov 2030) exists - paste its A1-A3 value. Grade 500-320: BBA fck 6.3 MPa, lambda 0.054 (S2) |
| steel-section | 2.5 | 1.22 | S2: Buy Clean California hot-rolled sections GWP limit 1.01 mill gate / 1.22 incl. US-average fabrication (AISC/STI/CRSI/AISI quick guide, 8 Mar 2022) = AISC fabricated hot-rolled sections industry EPD (31 Mar 2021, 5 yr: EXPIRED); US EAF mills (Nucor, SDI, Gerdau). Imported BOF sections 2.0-2.5 [I] |
| softwood-lumber | 2.3 | 0.0881 | SOURCED CWC EPD 845 (ASTM, 4 Feb 2025) Table 5 BC: GWP-fossil A1-A3 41.5 kgCO2e/m3; 428 kg od/m3; 785.4 kgCO2/m3 stored (C3/C4); per kg at 471 = 428 od x 1.10 MC [I]. https://cwc.ca/wp-content/uploads/2025/02/CWC-lumber-EPD-2025-Feb-4.pdf; k 0.0085 RSI/mm (09 §0.3) |
| cedar-soffit | 1.4 | 0.305 | as cedar-siding (honey-oiled soffit boards, sheltered; only the finish colour differs) [I] |
| ldpe-film | 1.2 | 2.3 | INFERRED: LDPE resin + film blowing, ~PPI HDPE 2.15 + 0.15 |
| geotextile-pp | 0.7 | 2.3 | INFERRED: PP nonwoven; model as mass-equivalent sheet t = (g/m2)/910 |
| parge-charcoal | 0.5 | 0.2 | INFERRED: mineral silicate parge/render coat ~10 mm, cement-lime base; dark pigment (R5 lap 2 N3) |
| comfortboard-80 | 0.4 | 1.057 | 09 E-RW 4.64/RSI, RSI 0.74 per 25.4 mm, 128 kg/m3 [S] |
| cellular-glass | 0.3 | 1.44 | SOURCED FOAMGLAS EU S3 1.438 kgCO2e/kg (09 §3.1, S2); PERINSUL HL 200 kg/m3, lambdaD 0.058 (12 §3.4, PER, S). EU-made; not the North American 22.7/RSI factor |
| epdm | 0.2 | 3 | S2 (One Click LCA listing): Holcim/Firestone RubberGard 60 mil non-reinforced EPDM, ASTM EPD-900: 4.69 kgCO2e/m2 at 1.37 mm (~1.58 kg/m2) = 3.0/kg; 45 mil 3.48, 90 mil 6.85 /m2. Carlisle Sure-Seal TDS is in the RCABC RPM (S2). FLL root resistance: check the product certificate |
| butyl-sealant | 0.2 | 3 | INFERRED: butyl / MS sealants generic |
| comfortbatt | 0.1 | 1.02 | 09 E-RW 1.43/RSI [S]; 40 kg/m3, k [I] |
| cork | 0.1 | 0.2 | INFERRED: expanded insulation corkboard; R2 P5; generic EPD values 0.1-0.4 fossil, large biogenic — needs Amorim EPD |
| soil | 0.0 | 0 | not counted |

## Effective thermal resistance (parallel path)

| assembly | RSI eff. | target | pass |
|---|---|---|---|
| Floor (slab on 100 graphite EPS) | 3.48 | 2.45 | yes |
| Floor band (glulam 215 + WF 80; vented cladding excluded) | 3.94 | 3.85 | yes |
| Wall W1 (ply + 2x6 cellulose, 23 % framing + WF 80) | 5.11 | 3.85 | yes |

Parts without a material or quantity (not counted): person-inside, person-wheelchair, person-terrace, tree, bed-plant-1, bed-plant-2, rg-plant-1, rg-plant-2, rg-plant-3
