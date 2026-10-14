# Metrics

Spec: detail02.json

## Embodied carbon per metre of opening (A1–A3, kgCO2e)

The slice is taken as representative of the opening; items flagged per: "opening" are counted once per 4.8 m opening.

Total 662 kgCO2e/m · biogenic carbon stored 144 kgCO2e/m (reported separately, not netted).

| junction | kgCO2e per m of opening | zone depth (m) | kgCO2e/m² |
|---|---|---|---|
| E subgrade / drain | 5.2 | 0.4 | 12.9 |
| F floor | 40.5 | 2.24 | 18.1 |
| H head band + lintel | 93.9 | 0.33 | 284.6 |
| I planting bed | 11.3 | 1.75 | 6.5 |
| J rill + rain garden | 51.4 | 2.85 | 18.0 |
| M lined landing | 53.1 | 1.68 | 31.6 |
| P granite terrace | 14.4 | 1.4 | 10.3 |
| R roof + overhang | 110.2 | 3.13 | 35.2 |
| T threshold | 282.2 | 0.66 | 427.5 |

| material | kgCO2e/m | factor (kgCO2e/kg) | source |
|---|---|---|---|
| fibreglass | 112.3 | 4.16 | SOURCED Wagners pultruded GFRP SHS EPD S-P-10246 (EPD Australasia; 24 Nov 2023-24 Nov 2028): GWP-fossil A1-A3 16.3 kgCO2e/m at 3.92 kg/m; 73.7 % ECR glass fibre, 15.6 % vinyl ester. https://www.environdec.com/library/epd10246. Proxy for window pultrusions [I]; replace with the chosen frame maker's EPD; density [I] |
| igu-triple | 107.6 | 1.8 | INFERRED per kg of glass in a triple tempered low-e argon IGU: NGA flat glass 1.43 (S2, expired 2024) + tempering/coating/spacer/sealant/gas; Pilkington 4/12/4/12/4 47.8 kgCO2e/m2 at 31 kg/m2 = 1.54 (S2, One Click LCA); Cardinal triple 59.0 (11 §2.5, S*); range 1.5-2.6 |
| stainless | 56.9 | 2.9 | 09 stainless all-grade [S2] |
| steel-section | 44.6 | 1.22 | S2: AISC fabricated hot-rolled structural sections industry EPD 2021, 1.22 kgCO2e/kg A1-A3 (EAF, US) — verify |
| concrete-paver | 35.5 | 0.15 | INFERRED: dry-cast paver mix 316 cement + 79 fly ash /m3 (Expocrete EPD10067, Balzac AB, S, expired) at current GUL factors + plant; bounds 0.225 (Expocrete 539 kgCO2e/m3, 2015) and 0.088 (Marshalls UK 12.2 kgCO2e/m2 at 138 kg/m2, S2). Replace with the BC supplier's EPD |
| pu-structural | 32.1 | 4 | INFERRED: Armatherm 500-class high-density PU structural thermal break (S* search summary: 2.0-18.5 MPa, lambda 0.031-0.078); rigid PU ~3.5-4.5 kgCO2e/kg generic — needs product EPD (R1 F9 b) |
| polyiso-lowgwp | 30.0 | 2.05 | 09 GAF EnergyGuard 1.69/RSI [S2]; R-5.6/in, 32 kg/m3 [I] |
| concrete-lowcarbon | 27.5 | 0.0463 | 09 CLF-G Lafarge 25 MPa 56 d 111 kg/m3 [S2]; k [I] |
| sbs | 26.7 | 0.75 | 09 ARMA 5.8 kg/m2 for 2-ply [SN]; ~7 mm, 1100 kg/m3 [I] |
| soil-imported | 21.3 | 0.005 | INFERRED: imported growing / bioretention medium (screened soil, sand, compost under cut-off); aggregate-like |
| hdpe | 19.0 | 2.15 | SOURCED (proxy) PPI EPD 1045, 4in DR11 HDPE conduit, 1 kg, valid to 24 Jul 2030: GWP 2.15 kgCO2e/kg (A1 1.66, A2 0.137, A3 0.359). Used for geomembrane, root barrier, drain board, corrugated pipe [I] |
| concrete-f2-40scm | 17.8 | 0.0744 | SOURCED Concrete BC EPD 348 25 MPa air F-2 GUL+40 % SCM 178.62 kgCO2e/m3 (09 §3.1, S); k [I] |
| aggregate | 16.6 | 0.005 | SOURCED (S2): California Buy Clean crushed aggregate 1.94 kg/t; UEPG EU average 5 kg/t; Holcim UK granite 5.19 kg/t (12 AGG, S*); bulk density [I]; A4 haul often exceeds A1-A3 |
| steel-prefinished | 12.1 | 2.68 | 09 prefinished coil 2.60-2.75 [S2] |
| gypsum | 12.1 | 0.2795 | SOURCED Gypsum Association industry EPD 10270 (NSF; 28 Apr 2020-15 Apr 2026, EXPIRED): 5/8 Type X, 277 kgCO2e A1-A3 per 92.9 m2 = 991 kg at 15.9 mm. https://info.nsf.org/Certified/Sustain/ProdCert/EPD10270.pdf; k [I] |
| concrete-exposed | 11.7 | 0.0857 | 09 E-CBC 25 MPa air GUL+25% SCM 205.65 kg/m3 [S]; k [I] |
| graphite-eps | 11.3 | 2.39 | 09 CLF-G 1.47/RSI [S2]; Neopor R-4.7/in, 20 kg/m3 [I] |
| plywood | 11.0 | 0.453 | 09 E-PLY 219.32 kg/m3 at 484 [S]; biogenic OEK -10.29/m2 at 12 mm [S2/I] |
| polymer-concrete | 8.7 | 0.555 | SOURCED ACO DRAIN Multiline Seal in V150S Type 10.0, IBU EPD-ACO-20250409-CBK1-DE (18 Mar 2026-17 Mar 2031): GWP-fossil A1-A3 18.8 kgCO2e per running metre at 33.9 kg/rm (polymer concrete 89-96 %, galvanised edge rail 4-10 %); density, k [I] |
| comfortboard-80 | 8.5 | 1.057 | 09 E-RW 4.64/RSI, RSI 0.74 per 25.4 mm, 128 kg/m3 [S] |
| membrane-poly | 6.6 | 2.5 | generic polyethylene [I] |
| pvc-pipe | 6.1 | 2.23 | SOURCED Uni-Bell PVC Pipe Association EPD10047 (NSF, 21 Mar 2023, 5 yr): 8in DR35 ASTM D3034 sewer 4,310 kgCO2e / 1,931 kg per 1,000 ft; pressure 2.29-2.55; density [I] |
| gr-media-pumice | 4.6 | 0.02 | INFERRED: pumice-based substrate (mined, screened, Pacific NW/BC) + compost |
| rebar-eaf-pnw | 4.4 | 0.53 | SOURCED (S2) Nucor Seattle rebar via CLF-G (09 §3.1) |
| softwood-lumber | 3.8 | 0.0881 | SOURCED CWC EPD 845 (ASTM, 4 Feb 2025) Table 5 BC: GWP-fossil A1-A3 41.5 kgCO2e/m3; 428 kg od/m3; 785.4 kgCO2/m3 stored (C3/C4); per kg at 471 = 428 od x 1.10 MC [I]. https://cwc.ca/wp-content/uploads/2025/02/CWC-lumber-EPD-2025-Feb-4.pdf; k 0.0085 RSI/mm (09 §0.3) |
| reclaimed-stone | 3.2 | 0.01 | INFERRED: salvaged granite setts/slabs or salvaged pavers; cleaning, re-sawing, local haul only (cut-off rule) |
| softwood-pt | 2.4 | 0.15 | INFERRED: CWC BC lumber 0.088 + MCA/CA treatment and re-drying ~0.06; no treated-wood EPD found; density incl. retention + MC [I] |
| comfortbatt | 2.2 | 1.02 | 09 E-RW 1.43/RSI [S]; 40 kg/m3, k [I] |
| butyl-sealant | 2.1 | 3 | INFERRED: butyl / MS sealants generic |
| ldpe-film | 1.2 | 2.3 | INFERRED: LDPE resin + film blowing, ~PPI HDPE 2.15 + 0.15 |
| cedar-soffit | 1.1 | 0.305 | as cedar-siding (honey-oiled soffit boards, sheltered; only the finish colour differs) [I] |
| geotextile-pp | 0.5 | 2.3 | INFERRED: PP nonwoven; model as mass-equivalent sheet t = (g/m2)/910 |
| epdm | 0.3 | 3 | INFERRED: EPDM membrane generic ~3 kgCO2e/kg |
| cedar-siding | 0.3 | 0.305 | 09 E-WRC 1.42 fossil, -3.95 biogenic per m2 at 4.65 kg/m2 [S]; density, k [I] |
| cork | 0.0 | 0.2 | INFERRED: expanded insulation corkboard; R2 P5; generic EPD values 0.1-0.4 fossil, large biogenic — needs Amorim EPD |
| vegetation | 0.0 | 0 | living material, not counted |
| soil | 0.0 | 0 | not counted |

## Effective thermal resistance (parallel path)

| assembly | RSI eff. | target | pass |
|---|---|---|---|
| Floor (slab on 100 graphite EPS) | 3.48 | 2.45 | yes |
| Head band (W250 lintel: flanges as a 10 % steel path, + 130 stone wool) | 7.05 | 3.85 | yes |
| Roof (polyiso avg 190 + deck) | 7.70 | 4.3 | yes |

Parts without a material or quantity (not counted): person-inside, person-terrace, shrub, tree, rg-plant-1, rg-plant-2, rg-plant-3
