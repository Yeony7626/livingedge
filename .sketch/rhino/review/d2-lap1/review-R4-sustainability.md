# Detail 02 — lap 1 review R4: sustainability and materials

Reviewer: R4 (sustainability, materials, carbon accounting). Date: 2026-10-13. Spec read: `detail02.mjs` / `detail02.json` (d2v1), `materials.json`, `metrics.mjs`, `review/d2-lap0/metrics.md` + `report.md`. Research checked: 09 §1–3 (factor table, roll-up, matrices), 11 §2.3–2.6 and T-table, 12 §1.2–1.4 and §3.4, 10 §3.6–3.8, 02 §2.6–2.11, 08 J, 08b M.

Tags: **SOURCED** = value read this session in the EPD/document named (S2 = via an aggregator page or a research file's [S2] row; "expired" = EPD past its validity, still the best public number found). **INFERRED** = my calculation or judgement, method stated.

All carbon numbers are **A1–A3 fossil, kgCO2e per 1 m strip of the 10.5 m-deep section** (the unit `metrics.mjs` reports), unless a per-m² or per-m-of-opening value is given. Biogenic carbon is reported separately and never netted.

---

## Headline

| run | total | biogenic stored | what changed |
|---|---|---|---|
| lap 0 as shown to users | **477** | 162 | — |
| factors only (placeholders → sourced, same `mat` keys) | 539 (+13 %) | 172 | softwood, gypsum, glass→IGU, fibreglass |
| + wrong `mat` keys fixed, missing parts added, once-per-opening items prorated | 662 (+39 %) | 173 | findings 1–8 |
| + shrub pocket counted once per opening, not once per 1.8 m slice | **656 (+38 %)** ← corrected total | 173 | finding 9 |
| corrected + the design proposals in §4 | **514 (−22 % vs corrected)** | 173 | §4 D1–D12 |

The lap-0 figure of 477 is **about 27 % low**. The tool should not show it. The largest single error is the glazed door: 152 counted vs ≈ 238 corrected (IGU factor, missing vertical frame members and hardware, track material). Uncertainty on the corrected total is roughly ±15 % [INFERRED], driven by the IGU factor (1.5–2.6 kg/kg), the paver factor (0.09–0.23) and the fibreglass factor (3–4.5).

Corrected total by zone, and as intensities a user can compare (pocket-fixed run):

| zone | kgCO2e per 1 m strip | zone depth | intensity [INFERRED] |
|---|---|---|---|
| T threshold + H head (the edge) | 293.2 + 33.8 = **327** | — | **327 kgCO2e per m of opening**; the door unit alone (IGU + frame + sill + hardware) ≈ 238 ≈ **86 kgCO2e/m² of door** (2.77 m tall) |
| F floor | 39.1 | 2.27 m | **17 kg/m²** (12 §1.3 predicts ≈ 15 for the 56-day mix ✓) |
| R roof + eave + green roof | 139.6 | 3.1 m | **45 kg/m²**, of which green-roof layers ≈ 13 kg/m² (09: 4–15 ✓) |
| M lined landing (+ pocket share) | 68.7 | 1.68 m | **41 kg/m²** |
| P unlined terrace and path | 42.3 | 1.55 m | **27 kg/m²** |
| I planting bed | 8.0 | 1.75 m | 5 kg/m² |
| J rain garden + rainwater line | 31.6 | 2.55 m | 12 kg/m² |

Hotspots after correction (share of 656): triple IGU 126 (19 %), door frame + sill + hardware 112 (17 %), concrete pavers 79 (12 %), roof insulation + membranes 60 (9 %), green-roof layers 34 (5 %), structural low-carbon concrete + rebar 49 (8 %), stainless (grate, edge profile, screens) 33 (5 %), plastics (HDPE, PVC, PP) 40 (6 %).

---

## 1. Score: environmental sustainability — **5 / 10**

- **What the design gets right (would score ≈ 7 on design choices alone).**
  - 56-day low-carbon slab (Lafarge 111 kg/m³) on graphite EPS, the lowest-carbon insulation per RSI in 09.
  - Glulam lintel, not steel.
  - Fibreglass frame from a BC maker, not aluminium.
  - BC cedar and BC stone wool at the head.
  - Cellular glass, not foam, under the sill.
  - Polyiso roof, which beats stone wool and wood fibre on fossil carbon per RSI.
  - Green roof, rain garden and permeable paving give the ecology the brief asks for.
  - Biogenic carbon is already kept out of the total.
- **What pulls it down (accounting ≈ 3–4).**
  - The number the tool will show is about 27 % low.
  - Eight placeholder or wrong factors remain.
  - Five parts carry the wrong `mat` key: cellular glass as EPS, polymer concrete as ready-mix, PVC as PE, spray foam as EPS, glulam as sawn lumber.
  - Door verticals, hardware, rebar and geotextiles are missing.
  - One-off features (shrub pocket, rainwater line, riser) are multiplied as if they repeated every 1.8 m.
  - The single "per metre of section" total mixes a door, a floor, a roof and 8 m of garden.
- **Avoidable material-health and end-of-life choices.**
  - PVC pipes.
  - Closed-cell spray foam.
  - XPS where 09 already recommends graphite EPS.
  - PT lumber where untreated would do.
  - A root-resistant cap that may leach herbicide into the rain garden.
  - No end-of-life or replacement (B4) visibility for the IGU, membrane and finish.

---

## 2. Sourced factor table for `materials.json`

### 2.1 Summary

| key | density kg/m³ | A1–A3 kgCO2e/kg | biogenic kgCO2/kg | k W/mK | tag | basis |
|---|---|---|---|---|---|---|
| softwood-lumber (replace) | 471 | **0.0881** | −1.667 | 0.118 | SOURCED | CWC EPD 845 (2025), **BC** region: 41.5 /m³ fossil, 428 kg od/m³, 785.4 kgCO2/m³ stored |
| glulam (new) | 482 | **0.2585** | −1.698 | 0.12 | SOURCED | Kalesnikoff EPD 296 (ASTM, **South Slocan BC**, valid to 16 Mar 2027): 124.50 /m³ fossil, 481.68 kg/m³, 817.67 kgCO2/m³ stored |
| softwood-pt (new) | 520 | 0.15 | −1.51 | 0.118 | INFERRED | lumber 0.088 + preservative/re-drying ≈ +0.06; no treated-wood EPD found |
| gypsum (replace) | 671 | **0.2795** | — | 0.16 | SOURCED (expired) | GA industry EPD 10270 (NSF), 5/8" Type X: 277 kgCO2e / 991 kg / 92.9 m² × 15.9 mm; valid to 15 Apr 2026 |
| igu-triple (new; use for the panes) | 2500 | **1.8** per kg of glass | — | 1.0 | INFERRED | NGA flat glass 1.43 (S2) + coating, tempering, spacer, sealant and argon. Pilkington 4/12/4/12/4 IGU 47.8 /m² at 31 kg/m² = 1.54 (S2); Cardinal triple 59.0 (11 §2.5, S\*). Range 1.5–2.6 |
| glass (replace; plain float only) | 2500 | **1.43** | — | 1.0 | SOURCED (S2, expired) | NGA industry flat glass EPD 2019, 1,430 kg/t (expired Dec 2024); Vitro 2023 1.35 |
| fibreglass (replace) | 1900 | **4.16** | — | 0.30 | SOURCED | Wagners pultruded GFRP EPD S-P-10246 (EPD Australasia, valid to 24 Nov 2028): 16.3 kgCO2e fossil per m at 3.92 kg/m; 73.7 % glass fibre, 15.6 % vinyl ester. Australian grid; no North American window-pultrusion EPD found (Silex EPD exists but returned 403) |
| aluminium (replace) | 2700 | **6.57** | — | 160 | SOURCED (expired) | Aluminum Association extruded aluminium EPD (UL 4786092064.102.1, extended to 16 Aug 2022): 6,570 kg/t A1–A3; D credit −4.13 |
| hdpe (new) | 950 | **2.15** | — | 0.45 | SOURCED (proxy) | PPI EPD 1045, 4" DR11 HDPE conduit, 1 kg, valid to 24 Jul 2030: GWP 2.15. Used for liner, root barriers, drain board and corrugated pipe [INFERRED proxy] |
| pvc-pipe (new) | 1400 | **2.23** | — | 0.16 | SOURCED | Uni-Bell EPD10047 (NSF, 21 Mar 2023): 8" DR35 sewer 4,310 kgCO2e per 1,931 kg; 8" DR18 2.29; range 1.9–2.6 |
| ldpe-film (new) | 920 | 2.3 | — | 0.33 | INFERRED | LDPE resin + film blowing ≈ PPI HDPE + 0.15 |
| geotextile-pp (new) | 910 | 2.3 | — | 0.10 | INFERRED | PP nonwoven; draw as mass-equivalent sheet t = (g/m²)/910, e.g. 270 g/m² → t 0.3 |
| polymer-concrete (new) | 2300 | **0.555** | — | 1.5 | SOURCED | ACO Multiline Seal in V150S Type 10.0, IBU EPD-ACO-20250409-CBK1-DE (valid to 17 Mar 2031): 18.8 kgCO2e fossil per running metre at 33.9 kg/rm, including a 4–10 % galvanised edge rail |
| concrete-paver (new) | 2350 | **0.15** | — | 1.7 | INFERRED | Dry-cast paver mix 316 kg cement + 79 kg fly ash /m³ (Expocrete EPD10067, Balzac AB, S, expired 2020) with current GUL factors. Bounds: 0.225 (Expocrete 539 /m³, S, expired) and 0.088 (Marshalls UK 12.2 /m² at 138 kg/m², S2) |
| cellular-glass (new) | 200 | **1.44** | — | 0.058 | SOURCED (S2 / S) | FOAMGLAS EU S3 1.438 /kg (09 §3.1, S2); PERINSUL HL 200 kg/m³, λD 0.058 (12 §3.4, S). Do **not** use the North American FOAMGLAS factor (22.7 /RSI, Sedalia); PERINSUL is EU-made |
| ccspf-hfo (new) | 32 | 5.5 | — | 0.024 | INFERRED | SPFA HFO summary 4.2 kgCO2e per m²·RSI-1 (S2, stage scope not stated) ÷ 0.77 kg per m²·RSI |
| gr-media (new; expanded clay or shale substrate) | 1000 dry | 0.08 | — | 0.6 | INFERRED | Leca EPDs 34–54 /m³ at 275–430 kg/m³ ≈ 0.125 /kg (S2) × ≈ 60 % mineral share |
| gr-media-pumice (new) | 1000 dry | 0.02 | — | 0.6 | INFERRED | mined and screened pumice (Pacific NW / BC) + compost |
| soil-imported (new) | 1400 | 0.005 | — | 1.5 | INFERRED | screened topsoil, sand and compost blend; compost under the cut-off rule; aggregate-like |
| reclaimed-stone (new) | 2600 | 0.01 | — | 2.5 | INFERRED | reuse carries no A1–A3 burden under the cut-off rule; cleaning, re-sawing and local haul |
| concrete-f2-40scm (new) | 2400 | **0.0744** | — | 1.7 | SOURCED | Concrete BC EPD 348, 25 MPa air F-2, GUL + 40 % SCM: 178.62 /m³ (09 §3.1, S) |
| rebar-eaf-pnw (new) | 7850 | **0.53** | — | 50 | SOURCED (S2) | Nucor Seattle (09 §3.1 via CLF-G) |
| aggregate (retag) | 1600 | 0.005 (keep) | — | 2.0 | SOURCED (S2) | California Buy Clean crushed aggregate 1.94 kg/t; UEPG EU average 5 kg/t; Holcim UK granite 5.19 kg/t (12 AGG, S\*). A4 haul often exceeds A1–A3 |
| oak | — | not sourced | — | — | — | not used in Detail 02; leave flagged |
| membrane-poly → rename `membrane-generic` | 940 | 2.5 (keep) | — | 0.4 | INFERRED | keep only for the small liquid and self-adhered flashings (pan, strip-in, head membrane, damp-proofing) |

Unchanged and adequately sourced already: concrete-lowcarbon, concrete-exposed, graphite-eps, xps-hfo, polyiso-lowgwp, comfortboard-80, comfortbatt, plywood, cedar-siding, sbs, steel-prefinished, rebar, stainless.
- stainless 2.9 is the low end (high recycled content). A generic import is likely higher [INFERRED].

### 2.2 Ready-to-paste JSON entries

```json
 "softwood-lumber": { "density": 471, "a1a3": 0.0881, "biogenic": -1.667, "k": 0.118,
  "src": "SOURCED CWC EPD 845 (ASTM, 4 Feb 2025) Table 5 BC: GWP-fossil A1-A3 41.5 kgCO2e/m3; 428 kg od/m3; 785.4 kgCO2/m3 stored (C3/C4); per kg at 471 = 428 od x 1.10 MC [I]. https://cwc.ca/wp-content/uploads/2025/02/CWC-lumber-EPD-2025-Feb-4.pdf; k 0.0085 RSI/mm (09 §0.3)" },
 "glulam": { "density": 482, "a1a3": 0.2585, "biogenic": -1.698, "k": 0.12,
  "src": "SOURCED Kalesnikoff glulam EPD 296 (ASTM; South Slocan BC; 16 Mar 2022-16 Mar 2027): A1-A3 fossil 124.50 kgCO2e/m3, 481.68 kg/m3 (446 od), 817.67 kgCO2/m3 stored (C3/C4). https://kalesnikoff.com/wp-content/uploads/2022/05/Kalesnikoff-Glulam-EPD-.pdf; k [I]" },
 "softwood-pt": { "density": 520, "a1a3": 0.15, "biogenic": -1.51, "k": 0.118,
  "src": "INFERRED: CWC BC lumber 0.088 + MCA/CA treatment and re-drying ~0.06; no treated-wood EPD found; density incl. retention + MC [I]" },
 "gypsum": { "density": 671, "a1a3": 0.2795, "k": 0.16,
  "src": "SOURCED Gypsum Association industry EPD 10270 (NSF; 28 Apr 2020-15 Apr 2026, EXPIRED): 5/8 Type X, 277 kgCO2e A1-A3 per 92.9 m2 = 991 kg at 15.9 mm. https://info.nsf.org/Certified/Sustain/ProdCert/EPD10270.pdf; k [I]" },
 "igu-triple": { "density": 2500, "a1a3": 1.8, "k": 1.0,
  "src": "INFERRED per kg of glass in a triple tempered low-e argon IGU: NGA flat glass 1.43 (S2, expired 2024) + tempering/coating/spacer/sealant/gas; Pilkington 4/12/4/12/4 47.8 kgCO2e/m2 at 31 kg/m2 = 1.54 (S2, One Click LCA); Cardinal triple 59.0 (11 §2.5, S*); range 1.5-2.6" },
 "glass": { "density": 2500, "a1a3": 1.43, "k": 1.0,
  "src": "SOURCED (S2) NGA industry flat glass EPD 2019, 1,430 kgCO2e/t (expired Dec 2024); Vitro 2023 EPD 1,350 kg/t. Plain float only - use igu-triple for IGU panes" },
 "fibreglass": { "density": 1900, "a1a3": 4.16, "k": 0.3,
  "src": "SOURCED Wagners pultruded GFRP SHS EPD S-P-10246 (EPD Australasia; 24 Nov 2023-24 Nov 2028): GWP-fossil A1-A3 16.3 kgCO2e/m at 3.92 kg/m; 73.7 % ECR glass fibre, 15.6 % vinyl ester. https://www.environdec.com/library/epd10246. Proxy for window pultrusions [I]; replace with the chosen frame maker's EPD; density [I]" },
 "aluminium": { "density": 2700, "a1a3": 6.57, "k": 160,
  "src": "SOURCED Aluminum Association extruded aluminum EPD UL 4786092064.102.1 (2014, extended to 16 Aug 2022, EXPIRED): 6,570 kgCO2e/t A1-A3, D -4,130. https://www.aluminum.org/sites/default/files/2022-04/102.1_AluminumAssocication_EPD_ExtrudedAluminum.pdf; imported extrusions can be 2-3x [I]" },
 "hdpe": { "density": 950, "a1a3": 2.15, "k": 0.45,
  "src": "SOURCED (proxy) PPI EPD 1045, 4in DR11 HDPE conduit, 1 kg, valid to 24 Jul 2030: GWP 2.15 kgCO2e/kg (A1 1.66, A2 0.137, A3 0.359). Used for geomembrane, root barrier, drain board, corrugated pipe [I]" },
 "pvc-pipe": { "density": 1400, "a1a3": 2.23, "k": 0.16,
  "src": "SOURCED Uni-Bell PVC Pipe Association EPD10047 (NSF, 21 Mar 2023, 5 yr): 8in DR35 ASTM D3034 sewer 4,310 kgCO2e / 1,931 kg per 1,000 ft; pressure 2.29-2.55; density [I]" },
 "ldpe-film": { "density": 920, "a1a3": 2.3, "k": 0.33, "src": "INFERRED: LDPE resin + film blowing, ~PPI HDPE 2.15 + 0.15" },
 "geotextile-pp": { "density": 910, "a1a3": 2.3, "k": 0.1, "src": "INFERRED: PP nonwoven; model as mass-equivalent sheet t = (g/m2)/910" },
 "polymer-concrete": { "density": 2300, "a1a3": 0.555, "k": 1.5,
  "src": "SOURCED ACO DRAIN Multiline Seal in V150S Type 10.0, IBU EPD-ACO-20250409-CBK1-DE (18 Mar 2026-17 Mar 2031): GWP-fossil A1-A3 18.8 kgCO2e per running metre at 33.9 kg/rm (polymer concrete 89-96 %, galvanised edge rail 4-10 %); density, k [I]" },
 "concrete-paver": { "density": 2350, "a1a3": 0.15, "k": 1.7,
  "src": "INFERRED: dry-cast paver mix 316 cement + 79 fly ash /m3 (Expocrete EPD10067, Balzac AB, S, expired) at current GUL factors + plant; bounds 0.225 (Expocrete 539 kgCO2e/m3, 2015) and 0.088 (Marshalls UK 12.2 kgCO2e/m2 at 138 kg/m2, S2). Replace with the BC supplier's EPD" },
 "cellular-glass": { "density": 200, "a1a3": 1.44, "k": 0.058,
  "src": "SOURCED FOAMGLAS EU S3 1.438 kgCO2e/kg (09 §3.1, S2); PERINSUL HL 200 kg/m3, lambdaD 0.058 (12 §3.4, PER, S). EU-made; not the North American 22.7/RSI factor" },
 "ccspf-hfo": { "density": 32, "a1a3": 5.5, "k": 0.024, "src": "INFERRED from SPFA HFO ccSPF 4.2 kgCO2e per m2 RSI-1 (S2 summary, stages unstated) / 0.77 kg per m2-RSI" },
 "gr-media": { "density": 1000, "a1a3": 0.08, "k": 0.6, "src": "INFERRED: extensive substrate with ~60 % expanded clay/shale; Leca EPDs ~0.125 kgCO2e/kg (S2, One Click LCA); dry bulk density [I]" },
 "gr-media-pumice": { "density": 1000, "a1a3": 0.02, "k": 0.6, "src": "INFERRED: pumice-based substrate (mined, screened, Pacific NW/BC) + compost" },
 "soil-imported": { "density": 1400, "a1a3": 0.005, "k": 1.5, "src": "INFERRED: imported growing / bioretention medium (screened soil, sand, compost under cut-off); aggregate-like" },
 "reclaimed-stone": { "density": 2600, "a1a3": 0.01, "k": 2.5, "src": "INFERRED: salvaged granite setts/slabs or salvaged pavers; cleaning, re-sawing, local haul only (cut-off rule)" },
 "concrete-f2-40scm": { "density": 2400, "a1a3": 0.0744, "k": 1.7, "src": "SOURCED Concrete BC EPD 348 25 MPa air F-2 GUL+40 % SCM 178.62 kgCO2e/m3 (09 §3.1, S); k [I]" },
 "rebar-eaf-pnw": { "density": 7850, "a1a3": 0.53, "k": 50, "src": "SOURCED (S2) Nucor Seattle rebar via CLF-G (09 §3.1)" },
 "aggregate": { "density": 1600, "a1a3": 0.005, "k": 2,
  "src": "SOURCED (S2): California Buy Clean crushed aggregate 1.94 kg/t; UEPG EU average 5 kg/t; Holcim UK granite 5.19 kg/t (12 AGG, S*); bulk density [I]; A4 haul often exceeds A1-A3" }
```

---

## 3. Findings

Δ values are changes to the 1 m-strip total from the lap-0 figure of 477, computed with the factors in §2.

**1. BLOCKER — The glazed door is under-counted by ≈ 86 kgCO2e/m.**
- Parts: `glass-1..3`, `sash`, `sash-top`, `head-track`, `track`, `nosing`; missing vertical members and hardware.
- Problem:
  - (a) Glass is priced as bare float at 1.3 /kg. An IGU carries coatings, tempering, spacer, sealants and gas [INFERRED from S2].
  - (b) A horizontal slice cannot see jambs, stiles or interlocks. For an OX pair ≈ 5 m × 2.73 m that is 6 members × 2.6 m ≈ 3.25 m of profile per metre of wall, which is as much as the four horizontal rails.
  - (c) No lift-and-slide gear, rollers or gaskets are counted.
  - (d) The track is drawn as fibreglass, but 11 T11 says "stainless or aluminium track" (S).
  - (e) Glass is drawn full-width through the stiles (≈ 9 % too much).
- Exact fix:
  - `glass-1..3`: `mat: "igu-triple"`, `fill: 0.91` (glass area net of stiles and interlock [INFERRED]).
  - `sash`, `sash-top`, `head-track`: `fill: 0.2`. Pultrusions with ≈ 3 mm walls and two webs come to ≈ 0.19 [INFERRED]. Replace with the maker's kg/m when a product is chosen.
  - `track`: `mat: "aluminium", fill: 0.22` (thermally broken 2-track sill ≈ 5 kg/m [INFERRED]). If the chosen product has a fibreglass sill, see D2 instead.
  - Add `{ id: "door-verticals", junction: "T", mat: "fibreglass", m3PerMetre: 0.0050, name: "Jambs, stiles and interlock, 3.25 m of profile per m of opening (not cut by the slice)" }`. This is 3.25 m × 0.0077 m² × 0.2 [INFERRED].
  - Add `{ id: "door-hardware", junction: "T", mat: "stainless", m3PerMetre: 0.00015 }`: lift-slide gear, rollers and handle ≈ 6 kg per operable sash per 5 m [INFERRED].
- Effect: door 152 → **238** (IGU 126, frame 75, sill 33, hardware 3.5) ≈ 86 kgCO2e/m² of door.
  - Cross-check: inside 11 §2.5's aluminium sliding-door range of 58–208 /m² (S\*), and below the Cascadia fibreglass *window* at 145 /m² (S), as expected for a large door with a low frame fraction.
- Tag: SOURCED factors; INFERRED quantities.

**2. MAJOR — The cellular-glass thermal break is priced and rated as graphite EPS.**
- Part: `perinsul` (FOAMGLAS PERINSUL HL).
- Problem: `mat: "graphite-eps"` gives density 20 instead of 200, factor 2.39 instead of 1.44, and k 0.0307 instead of 0.058. Mass is understated 10×, and any thermal calculation through the sill would be wrong by 2×.
- Exact fix: `mat: "cellular-glass"` (new key, §2).
- Effect: 1.2 → **7.2** (+6.0). SOURCED.

**3. MAJOR — The polymer-concrete channel is priced as ready-mix, at a quarter of its real mass.**
- Part: `channel`.
- Problem: `concrete-exposed` at 0.0857 and the 10 mm drawn walls give 8.7 kg/m and 0.74 kgCO2e/m. ACO's 150-class channel declares 33.9 kg/rm and 18.8 kgCO2e/rm (S).
- Exact fix: `mat: "polymer-concrete"`, plus either `m3PerMetre: 0.01474` (33.9/2300) or redraw the body with ≈ 20 mm walls and a 30 mm invert.
- Effect: **+18.1**. SOURCED.

**4. MAJOR — The pavers are priced as 25 MPa ready-mix.**
- Parts: `pavers-lined`, `pavers-1..3`.
- Problem: dry-cast pavers (CSA A231.2, ≥ 50 MPa, freeze–thaw) carry ≈ 395 kg binder/m³. The 0.0857 factor is a 25 MPa air-entrained cast-in-place mix.
- Exact fix: `mat: "concrete-paver"` (0.15 [INFERRED], range 0.09–0.225 S/S2). Ask the BC supplier (Abbotsford Concrete Products or Mutual Materials) for an EPD.
- Effect: **+26.8** (and +41 once finding 9 is fixed, because more paver area is counted).

**5. MAJOR — The pipes have the wrong density and factor, and runs that occur once per opening are multiplied per 1.8 m slice.**
- Parts: `rainwater-line`, `rg-riser`, `underdrain`, `rg-subdrain`, `track-weeps`.
- Problem:
  - PVC is priced as PE (density 940 instead of 1400; factor 2.5 instead of 2.23).
  - `metrics.mjs` counts an x- or y-axis rod as "one per slice of L = 1.8 m". The rainwater line and the overflow riser exist once per opening (08 J12: one downspout, one line), so they are counted 2.8× (with a 5 m opening [INFERRED]).
- Exact fix:
  - All five parts: `mat: "pvc-pipe"`, or `hdpe` per D7.
  - `rainwater-line`: `m3PerMetre: 0.001468` = ring 1332 mm² × 5.51 m / 5 m.
  - `rg-riser`: `m3PerMetre: 0.000554`.
  - Better: add a generic `per: <repeat length mm>` field to `metrics.mjs` (see finding 9).
- Effect: 22.1 → 18.1 (**−4.0**). SOURCED factor.

**6. MAJOR — Material and quantity are missing for parts the spec names.**
- Missing items and fixes:
  - **Rebar** in the "reinforced grade beam": add `{ id: "beam-rebar", mat: "rebar", m3PerMetre: 0.00164 }`. That is ≈ 12.9 kg/m: 6–15M bars plus 10M stirrups at 300 [INFERRED; engineer to confirm]. **+11.0**.
  - **Geotextiles** each side of the liner ("between geotextiles", 08b M4): add a `geotextile-pp` sheet along the liner path, t 0.6 (2 × 270 g/m²). **+2.9**.
  - **Green-roof protection/retention mat and filter fabric** (≈ 500 + 150 g/m²): add `{ id: "gr-filter-protection", mat: "geotextile-pp", junction: "R", m3PerMetre: 0.0019 }`. **+3.1**.
  - **Door verticals and hardware**: see finding 1.
  - **Outside the slice, but attributable:**
    - downspout (≈ 3 m of 24 ga steel per opening, ≈ +1);
    - the VBBL small-site **detention tank** the riser feeds (08 J: 3,400–7,200 L), ≈ +20–40 per m of façade for a polyethylene or precast tank [INFERRED].
    - List both in the metrics as "system items per opening/lot".
- Effect: **+17 in-slice**. INFERRED quantities, SOURCED factors.

**7. MINOR — The lintel and PT parts carry the sawn-lumber placeholder.**
- Parts: `lintel`; and `packer`, `band-strap`, `band-closure`, `nailer-1..5`.
- Exact fix:
  - `lintel`: `mat: "glulam"` (BC EPD).
  - PT parts: `mat: "softwood-pt"`, or untreated `softwood-lumber` per D11.
  - `joists` and `blocking` stay `softwood-lumber` (now sourced).
- Effect:
  - lintel 2.2 → 4.3 fossil;
  - joists and blocking −2.0 (the BC lumber factor is lower than the placeholder);
  - PT parts +0.4;
  - biogenic stored 162 → 173.
- SOURCED.

**8. MINOR — Closed-cell spray foam is priced as EPS.**
- Part: `foam`.
- Problem: `graphite-eps` 2.39 vs ccSPF ≈ 5.5 [INFERRED].
- Exact fix: `mat: "ccspf-hfo"` if kept (+3.3). Preferred: replace it per D8 (`comfortbatt`).
- Material health: see §4.3.

**9. MAJOR — One-off plan features are counted as if they repeated every 1.8 m.**
- Parts: `pocket-curb`, `pocket-curb-2`, `pocket-curb-w`, `pocket-soil`, `root-barrier-pocket`, `pavers-2`, `bedding-2`, `base-2`; also `rg-*` and `tree`.
- Problem:
  - `share()` gives a single-run part (e.g. `runs: [[300,1500]]`) a share of 1, so the 1.2 m pocket curb is priced as a continuous curb.
  - The two-run parts divide by the run span (1.2 m), not the slice.
  - The net effect models one 1.2 × 1.2 m shrub pocket per 1.8 m of wall. 08b M18 has **one** pocket centred at d ≈ 2.6 m.
  - The rain garden is "≈ 10 % of roof area" (08 J). For the 08 example that is ≈ 4.2 m along a 10 m façade, yet it is priced as continuous.
- Exact fix: add a `per` field (repeat length, mm) to `metrics.mjs`. The quantity becomes `area × along-wall length / per`, with `per: 5000` for pocket parts and `per: <façade length / garden length>` for rain-garden parts. Until then, use `m3PerMetre` overrides:
  - `pocket-curb` and `-2`: `area × 1.2/5`;
  - `pocket-curb-w`: `area × 0.2/5`;
  - `pocket-soil`: `area × 1.0/5`;
  - `pavers-2`, `bedding-2`, `base-2`: `area × 0.76`.
- Effect:
  - pocket fix: −6.1 net (curbs −16, pavers +14);
  - rain garden at 42 % of façade length: a further ≈ −13 to −18 [INFERRED], not included in the 656.
- INFERRED.

**10. MAJOR (method) — "Total per metre of section" is not a meaningful single KPI.**
- The 10.5 m strip adds a door (per m of opening), 2.27 m of floor, 3.1 m of roof and 8 m of garden. The total moves with arbitrary drawing extents: the interior is cut at 2.5 m and the garden at −8 m.
- Exact fix: `metrics.mjs` should report three things.
  - (a) The **edge** (T + H + door) per m of opening.
  - (b) Each field zone **per m²**, with its depth (table in the Headline). Zone depth comes from each junction's x-range.
  - (c) The strip total, labelled with its extents.
- Also state on the output "A1–A3 only; B4 replacements excluded".
- INFERRED.

**11. MINOR — Junction tags send landscape carbon to the head.**
- Parts: `pavers-1..3`, `bedding-1..3`, `base-1..3`, `edge-restraint` are tagged `junction: "H"` (Head).
- Effect: about 20 kgCO2e/m appears under the head, so lap-0 "H 53.4" is really head ≈ 33 + path ≈ 20.
- Exact fix: `junction: "P"` (new: path/unlined terrace), or `"M"`.

**12. MINOR — Sheet thickness is drawn, not real.**
- Part: `liner` (`t: 2` for a 1.0 mm HDPE).
- Exact fix: `t: 1`, `mat: "hdpe"`, and model the geotextiles separately (finding 6).
- General rule for the tool: sheets drawn thicker for legibility need a `tReal` (or `m3PerMetre`).
- Root barriers at t 2 are acceptable: ribbed HDPE panels are 1–2 mm (08b, S).

**13. MINOR — The plastics carry one generic factor.**
- Exact fix:
  - `liner`, `root-barrier-path`, `root-barrier-pocket`, `drain-mat`: `mat: "hdpe"`;
  - `soilgas`: `mat: "ldpe-film"`;
  - keep `membrane-generic` for `pan`, `head-membrane`, `head-stripin`, `membrane-top`, `dampproof` and `track-weeps` (all < 1 kg).
- Effect: liner 11.0 → 4.8; drain-mat 9.8 → 8.5. SOURCED (proxy).

**14. MINOR — The roof growing medium is priced as clear stone at 1600 kg/m³ and 0.005.**
- Part: `growing-medium`.
- Exact fix: `mat: "gr-media"` (0.08, 1000 kg/m³ dry).
- Effect: **+15.0**. Specifying pumice (D6) brings it back to +2.5.
- INFERRED. The single biggest uncertainty in the roof.

**15. MINOR — Imported soils are priced at zero.**
- Parts: `rg-medium`, `bed-soil`, `pocket-soil`.
- Exact fix: `mat: "soil-imported"` (0.005 [INFERRED], low confidence). Keep `soil` (0) for `subgrade`, `interior-subgrade` and the mulches.
- Report mulch biogenic as **not stored**: it decays in 2–5 years.
- Effect: +16 to +19.

**16. MINOR — The XPS on the beam face conflicts with 09 (b).**
- Part: `beam-xps`.
- 09 recommends graphite EPS below grade (1.47 /RSI vs HFO XPS 6.58 /RSI).
- Exact fix: `mat: "graphite-eps"` (a below-grade-rated Type 2/3, thickness unchanged). The thermal reviewer should check its k.
- Effect: −1.9. SOURCED.

**17. MINOR — Grate mass is unverified.**
- Part: `grate`.
- `fill: 0.35` gives 7.3 kg/m of stainless, the sixth-largest item (21 kgCO2e/m).
- Exact fix: replace `fill` with the product's kg/m (`m3PerMetre = kg/8000`). See D9 for a slot top at ≈ 2.8 kg/m.

**18. MINOR — Life cycle stages are hidden.**
- A1–A3 alone hides the dominant replacement items over the 60-year NRC/CoV study period:
  - IGU seal life 25–35 yr → one B4 replacement, +126 [INFERRED];
  - SBS under the green roof, ≈ 30–40 yr → one replacement, +26 [INFERRED];
  - cedar finish B2 5.56 kgCO2e/m² per repaint cycle (E-WRC via 09, S).
- Exact fix: add optional `rsl` (reference service life, years) to `materials.json`. Have `metrics.mjs` print a "60-yr incl. B4" column beside A1–A3. Suggested rsl: igu 30, sbs 35, gaskets/hardware 20, everything else ≥ 60 [INFERRED].

---

## 4. Design proposals

Each Δ is measured against the corrected 656 and was computed with the §2 factors. Together they give **514 (−142, −22 %)**.

### 4.1 Glazed wall (the largest block)

**D1. Thin-glass triple IGU: 4 mm tempered / 1.3 mm annealed centre lite / 4 mm tempered (or laminated inner).**
- Effect: −28 kgCO2e/m (glass mass −22 %).
- Thermal: Ug unchanged in principle (same coatings and cavities).
- Other gains: lighter sashes, so less roller and gear wear and easier operation for every user (accessibility).
- Look: unchanged.
- Safety glazing applies to the exposed lites; the centre lite can be annealed [INFERRED; confirm against CAN/CGSB-12.1 and VBBL 9.6.1.4 with the supplier]. Thin-centre triples are made by Cardinal and Guardian [SN].
- Emerging alternative: a 2-pane vacuum IGU (≈ −40 % glass). Too new for a 2.5 m lift-and-slide sash today [INFERRED].

**D2. No aluminium in the sill.**
- Use a fibreglass sill with a stainless running rail (`track`: `mat: "fibreglass", fill: 0.22`, plus a `track-rail` part of 1.2 kg/m stainless).
- Effect: −15 kgCO2e/m.
- Performance: also removes the conductive aluminium path 11 §5.4 warns about (a thermally broken aluminium threshold "condenses or frosts" (S)), so fRsi rises.

**D3. Frame procurement (same look; process change).**
- Require a product EPD. Prefer the BC-made PHI fibreglass slider (Cascadia, Langley; 11 §2.3) to keep transport and grid factors local.
- Specify **dry-glazed IGUs behind removable stops**, so a failed IGU (finding 18) can be replaced without cutting a bonded sash. This makes the B4 event a 1-hour repair, not a sash replacement.
- An aluminium-clad timber lift-and-slide would be ≈ −40 to −60 frame carbon (wood-alu 52–63 /m² vs fibreglass "slightly higher than wood", 11 §2.5 S\*). It needs a PH glazing package (the Loewen common triple fails 1.44) and more coastal maintenance. Offer it as an alternate, not the default.

### 4.2 Ground, landscape and roof

**D4. Paving: reuse where precision is not critical.**
- **Lined landing** (accessible route, 0–1.85 m): 60 mm pedestrian pavers (`pavers-lined` `fill: 0.75`) in a low-cement or carbon-cured mix, or permeable **clay pavers** (≈ equal carbon per m²; colour-fast; 100-yr life and relayable [INFERRED]).
- **Unlined terrace and path** (`pavers-1..3`): `mat: "reclaimed-stone"`. Use sawn, flamed **salvaged granite setts/slabs** or salvaged pavers from Lower Mainland demolition.
- Effect: **−41**.
- Look: the grey stone matches 10 §4.1 "Black timber, grey ground"; flamed tops give BPN ≥ 55.
- Performance: keep joints ≤ 6 mm on the route and use the same bedding and base. The water and permeability design is unchanged.

**D5. Exterior cast-in-place concrete.**
- `pocket-curb*` and `edge-restraint`: `mat: "concrete-f2-40scm"` (F-2 is right for a private walk without de-icing salt; C-2 only if salts are used).
- Slim `edge-restraint` from 150 × 300 to 100 × 250 [INFERRED; landscape engineer], or use reclaimed granite curb.
- Effect: −2 to −6 (small once finding 9 is fixed).

**D6. Roof.**
- (a) **Stop the polyiso at the wall line** and taper the overhang on sloped sleepers (`roofins-1/2` `fill: 0.88`). Effect: −4.1. It also gives the thinner ≈ 320 mm fascia of 10 §3.6, a better look.
- (b) **Pumice-based substrate** (`growing-medium` → `gr-media-pumice`). Effect: −12.5.
- (c) **Granular pumice drainage layer** instead of the HDPE board. Effect: −7.8, with more water retention; adds ≈ 14 kg/m² dead load, so the engineer must check.
- **Keep polyiso.** Per RSI it is 1.69 fossil vs wood fibre 3.18 fossil (−11.8 biogenic, but long-cycle and not creditable under the CoV Addendum) and stone wool 5.63 (09 §3.1). Graphite EPS (1.47) would save only ≈ 4 and needs a cover board under SBS anyway.
- **Insulation level is a fuel question** (11 open Q7). The roof is at RSI 7.70.
  - If the 4.30 performance path governs and the building is all-electric on BC Hydro (≈ 0.011 kgCO2e/kWh [SN]), polyiso beyond RSI 4.3 pays back its ≈ 5 kgCO2e/m² in about 200 years [INFERRED]. Trim it (≈ −14).
  - With gas heat the payback is ≈ 4 years, so keep it.
  - If the 7.04 prescriptive path governs, keep the thickness.

**D7. Pipes.**
- Use **corrugated HDPE** for the perforated underdrain and the garden subdrain (≈ 0.5 and 1.0 kg/m).
- Use solid HDPE or PP for the rainwater line, with fused joints. Fused joints also answer 08's "no fittings within 700 mm of the foundation" leak worry better than solvent welds [INFERRED].
- Effect: −8.5 for the two subdrains (the solid line is about neutral per kg), and no PVC (§4.3).

**D8. Replace the spray-foam air tie.**
- Use stone-wool batt or board in `foam` (`mat: "comfortbatt"`). The air seal is the existing `membrane-top` on caulked blocking (06 B4/B21).
- Effect: −3.5 vs corrected.
- Health: removes on-site MDI and a halogenated flame retardant. Repairability: removable.

**D9. Grate.**
- Use a stainless **slot top** (≤ 6.5 mm slot, B651) on the same polymer channel, ≈ 2.8 kg/m instead of 7.3.
- Effect: −13.
- Look: cleaner (one fine line at the sill).
- Performance: heel- and wheel-safe. Needs a removable access section at the outlet for cleaning.

**D10. Rebar and beam.**
- Specify PNW EAF rebar (`rebar-eaf-pnw`, 0.53, S2). Effect: −4.2.
- Keep the 56-day mix for the beam if the engineer accepts it.

**D11. Untreated wood where code and practice allow.**
- Use kiln-dried, untreated nailers under the membrane (where RCABC accepts) and in the ventilated-cavity strapping and closure; or WRC heartwood strapping.
- Effect: −0.9 net (PT −1.9, untreated +1.0).
- Health and end of life: no copper biocide, and the wood stays burnable or compostable at end of life.
- Keep PT only where wood touches concrete or soil.

**D12. Keep the glulam lintel, and design for 3 mm deflection by depth, not by steel.**
- A 130 × 342 glulam adds ≈ +1.3. A W-section or flitch plate would add ≈ +35–50 [INFERRED: ≈ 30 kg/m steel × 1.2–1.7] plus a thermal bridge in the head.
- Source glulam from Kalesnikoff (BC, EPD 296), so the factor is already local.

**Not recommended as carbon moves:**
- Swapping polyiso for stone wool or wood fibre on the roof (higher fossil carbon).
- Dropping triple glazing (fails USI 1.22).
- Dropping the green roof. It adds ≈ 13 kg/m² roof but delivers the brief's ecology and stormwater. If kept, see the cap-sheet note in §4.3.

### 4.3 Material health and end of life

| material / part | concern | recommendation |
|---|---|---|
| PVC pipes (`rainwater-line`, `underdrain`, `rg-*`) | Chlorine chemistry; organotin or lead stabilisers in some imports; dioxins if burned; on the Healthy Building Network Red List | HDPE or PP (D7). Buried pipe is left in place at end of life either way. |
| ccSPF (`foam`) | On-site MDI exposure; TCPP (halogenated flame retardant); cannot be separated at end of life | Stone wool (D8). |
| Polyiso (`roofins-*`) | TCPP flame retardant | Keep for carbon; ask for a halogen-free flame-retardant grade if one is offered. Dry boards are reusable at re-roofing. |
| XPS (`beam-xps`) | Lower-GWP HFO blowing agent, but 4.5× the carbon per RSI of graphite EPS | Graphite EPS (finding 16). EPS uses polymeric flame retardant (HBCD is phased out). |
| Root-resistant SBS cap (`membrane-roof`) | Some FLL-certified bitumen caps get root resistance from a mecoprop-type root inhibitor that washes into run-off. **This roof drains to the rain garden.** | Specify a cap that is root-resistant by a **physical barrier** (polyester, PE or metal-free foil), herbicide-free [INFERRED; check the product safety data sheet]. |
| PT lumber | Copper (MCA/CA) leaches; aquatic toxicity near the rain garden; end-of-life limits | Untreated where allowed (D11). |
| Cedar bleaching oil | Volatile organic compounds | Low-VOC, linseed-based product. |
| Wood-chip mulch | Dyed or recycled-pallet chips may contain CCA or nails | Untreated local arborist chips. |
| Concrete pavers | Sealers | None; let them patina. Pavers are fully relayable or reusable. |
| Polymer concrete channel | Styrene in production; inert in use | Acceptable. 50+ yr life; recycled as aggregate only. |
| Fibreglass frame | Thermoset: landfill or cement-kiln at end of life | Accept. Long life; make IGUs replaceable (D3). |
| IGU | Coatings and laminate hamper cullet recycling | Glazier take-back to cullet or glass-wool recycling. |
| Cellular glass, stainless, HDPE liner | Inert, A1 fire class, very durable | Good choices. Cellular glass and stainless are recyclable. |

### 4.4 Durability, maintenance and BC sourcing

**Durability vs maintenance** (service lives [INFERRED] unless noted):

| item | service life | consequence |
|---|---|---|
| IGU | 25–35 yr | ×2 over 60 yr |
| Lift-slide gaskets and gear | 15–25 yr | cheap if accessible |
| Fibreglass frame | 50+ yr | — |
| SBS under the green roof | 30–40 yr | the vegetation protects it from UV; the RCABC Vegetated Roof Guarantee makes maintenance mandatory (09, S2) |
| Polymer channel, stainless grate, HDPE liner | 50–100 yr | — |
| Pavers | 40+ yr | relay as needed |
| Rain-garden medium | silts ≈ 3 mm/yr (08, S) | top 100 mm renewed at ≈ 30 yr |
| Cedar | 30–40 yr | finish renewed every 5–10 yr |

**Local (BC) sourcing:**
- Already local: glulam (Kalesnikoff, South Slocan); lumber, plywood and cedar (BC mills); stone wool (Rockwool, Grand Forks); EPS (BC/AB moulders); low-carbon ready-mix (Lafarge, Heidelberg, Burnco Metro Vancouver); aggregates (Sechelt barge); pavers (Abbotsford, Langley); fibreglass slider (Cascadia, Langley).
- Imported: PERINSUL (Belgium/Czechia, ship); polyiso (AB/US); ACO channel (check the Canadian plant); stainless grate.
- Possibly local: pumice (Pemberton area, BC [SN/INFERRED]).

**Biogenic:** 173 kgCO2/m is stored, all **long-cycle** wood, so it counts as **0** under the CoV Addendum's short-cycle rule (09 §0.2). Report it with that label.

---

## 5. Top 3 changes that would raise the score most

1. **Make the number trustworthy (+1.5 → 6.5).**
   - Paste the §2 factors.
   - Re-key `perinsul`, `channel`, `pavers*`, the pipes, `foam` and `lintel`.
   - Add `door-verticals`, `door-hardware`, `beam-rebar` and the geotextiles.
   - Prorate once-per-opening items (`per` field).
   - Fix the junction tags.
   - Report the edge per m of opening and the zones per m².
   - Corrected total: **≈ 656 kgCO2e/m** (not 477). The edge is ≈ 327 per m of opening; the door ≈ 86 /m².
2. **Glazed wall: thin-glass triple + no aluminium in the sill + an EPD-backed BC frame with replaceable IGUs (D1–D3) (+1).**
   - Effect: ≈ −43 now, and the 60-year IGU replacement becomes a repair. Look unchanged; threshold fRsi improves.
3. **Ground and roof: reclaimed granite or salvaged pavers beyond the landing, 60 mm low-carbon pavers on it, pumice substrate with a granular drainage layer, and HDPE instead of PVC pipes (D4, D6b–c, D7) (+1).**
   - Effect: ≈ −70 together.
   - Matches the "grey ground" palette, removes PVC, and improves roof water retention.

With all of §4 applied: **≈ 514 kgCO2e/m (−22 %)**, biogenic 173 (long-cycle). My score would rise to about **7.5–8** once the accounting fixes land and D1–D7 are adopted.

---

### Sources read this session
- CWC, *A Regionalized Industry Average EPD for Canadian Softwood Lumber*, EPD 845 (2025): https://cwc.ca/wp-content/uploads/2025/02/CWC-lumber-EPD-2025-Feb-4.pdf
- Kalesnikoff Lumber Co., *Glulam EPD 296* (ASTM, 2022–2027): https://kalesnikoff.com/wp-content/uploads/2022/05/Kalesnikoff-Glulam-EPD-.pdf
- Gypsum Association, *Industry Average EPD for 5/8" Type X Conventional Gypsum Board*, EPD 10270 (NSF): https://info.nsf.org/Certified/Sustain/ProdCert/EPD10270.pdf
- ACO Ahlmann, *ACO DRAIN Multiline Seal in V150S*, IBU EPD-ACO-20250409-CBK1-DE: https://at.hagebau.com/jupi/AT0772/mime/mime_AT0772_536_4.pdf
- Wagners CFT, *Square Hollow Pultruded GFRP Section WGN-S1000*, S-P-10246: https://www.environdec.com/library/epd10246
- Aluminum Association, *Extruded Aluminum EPD* 4786092064.102.1: https://www.aluminum.org/sites/default/files/2022-04/102.1_AluminumAssocication_EPD_ExtrudedAluminum.pdf
- Plastics Pipe Institute, *EPD 1045, 4" DR11 HDPE conduit*: https://www.plasticpipe.org/common/Uploaded%20files/1-PPI/Divisions/Power%20and%20Communications/FAQ/EPD_PPI_Clean_4_HDPE_Conduit_Orange_07-22-2025.pdf
- Uni-Bell PVC Pipe Association, *EPD10047*: https://info.nsf.org/Certified/Sustain/ProdCert/EPD10047.pdf
- Expocrete (Oldcastle), *Interlocking Concrete Pavers and Paving Slabs*, EPD10067 (expired): https://info.nsf.org/Certified/Sustain/ProdCert/EPD10067.pdf

**Search summaries only (S2/SN):**
- NGA flat glass 1,430 kg/t and Vitro 1,350 kg/t.
- Pilkington / Saint-Gobain triple IGU EPDs (One Click LCA).
- Marshalls block paving 12.2 /m².
- Leca expanded clay EPDs.
- SPFA HFO ccSPF 4.2 /RSI.
- California Buy Clean aggregate 1.94 kg/t.

**Blocked (403):** ASTM-hosted Silex fibreglass sliding-door EPD; CWC BC lumber EPD 903; GA glass-mat gypsum EPD.

Reproduction: the scratch scripts `parts.mjs` and `recompute.mjs` (session scratchpad) apply exactly the `mat`, `fill`, `m3PerMetre` and new-part changes listed in findings 1–16 and proposals D1–D11 to `detail02.json` using `metrics.mjs`'s own quantity rules. Run modes: `lap0`, `factors`, `corrected`, `pocketfix`, `proposed`.
