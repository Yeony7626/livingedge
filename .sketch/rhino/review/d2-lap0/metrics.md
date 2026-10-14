# Metrics

Spec: detail02.json

## Embodied carbon per metre of wall (A1–A3, kgCO2e)

Total 477 kgCO2e/m · biogenic carbon stored 162 kgCO2e/m (reported separately, not netted).

| junction | kgCO2e/m |
|---|---|
| E | 0.0 |
| F | 39.3 |
| H | 53.4 |
| I | 2.8 |
| J | 27.1 |
| M | 68.7 |
| R | 114.9 |
| T | 170.9 |

| material | kgCO2e/m | factor (kgCO2e/kg) | source |
|---|---|---|---|
| glass | 100.2 | 1.3 | ICE flat glass [I], not in 09 |
| concrete-exposed | 68.6 | 0.0857 | 09 E-CBC 25 MPa air GUL+25% SCM 205.65 kg/m3 [S]; k [I] |
| membrane-poly | 52.3 | 2.5 | generic polyethylene [I] |
| fibreglass | 52.1 | 3 | PLACEHOLDER [I]: pultruded fibreglass frame; 09/11 say fibreglass or timber frames roughly halve frame carbon vs aluminium (UBC-FEN) — needs a frame EPD |
| concrete-lowcarbon | 38.4 | 0.0463 | 09 CLF-G Lafarge 25 MPa 56 d 111 kg/m3 [S2]; k [I] |
| polyiso-lowgwp | 34.5 | 2.05 | 09 GAF EnergyGuard 1.69/RSI [S2]; R-5.6/in, 32 kg/m3 [I] |
| stainless | 29.4 | 2.9 | 09 stainless all-grade [S2] |
| sbs | 25.9 | 0.75 | 09 ARMA 5.8 kg/m2 for 2-ply [SN]; ~7 mm, 1100 kg/m3 [I] |
| aggregate | 15.7 | 0.005 | ICE aggregate [I] |
| graphite-eps | 13.3 | 2.39 | 09 CLF-G 1.47/RSI [S2]; Neopor R-4.7/in, 20 kg/m3 [I] |
| plywood | 10.8 | 0.453 | 09 E-PLY 219.32 kg/m3 at 484 [S]; biogenic OEK -10.29/m2 at 12 mm [S2/I] |
| steel-prefinished | 10.0 | 2.68 | 09 prefinished coil 2.60-2.75 [S2] |
| softwood-lumber | 9.7 | 0.14 | NOT IN 09 — placeholder [I], needs AWC/CWC softwood lumber EPD; k = 0.0085 RSI/mm (09 §0.3) |
| gypsum | 5.9 | 0.13 | ICE generic [I], not in 09 |
| comfortboard-80 | 4.9 | 1.057 | 09 E-RW 4.64/RSI, RSI 0.74 per 25.4 mm, 128 kg/m3 [S] |
| cedar-siding | 2.9 | 0.305 | 09 E-WRC 1.42 fossil, -3.95 biogenic per m2 at 4.65 kg/m2 [S]; density, k [I] |
| xps-hfo | 2.4 | 7.56 | 09 E-OCX FOAMULAR NGX 6.58/RSI [S]; R-5/in, 30 kg/m3 [I] |
| comfortbatt | 0.1 | 1.02 | 09 E-RW 1.43/RSI [S]; 40 kg/m3, k [I] |
| soil | 0.0 | 0 | not counted |

## Effective thermal resistance (parallel path)

| assembly | RSI eff. | target | pass |
|---|---|---|---|
| Floor (slab on 100 graphite EPS) | 3.48 | 2.45 | yes |
| Head band (lintel + 75 stone wool) | 3.63 | 3.85 | **no** |
| Roof (polyiso avg 190 + deck) | 7.70 | 4.3 | yes |

Parts without a material or quantity (not counted): person-inside, person-terrace, shrub, tree
