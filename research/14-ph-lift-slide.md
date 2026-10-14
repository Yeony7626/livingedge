# 14 — Passive-House wood-aluminium lift-and-slide for Detail 02: product, threshold, head, glazing, drive (Vancouver)

Researched: 2026-10-13. Status: **draft for the architect's review**. It is not an approved library entry.

**Brief (given).** Detail 02 is a two-panel glazed wall, 4.8 m wide and about 2.6–2.7 m tall, with a near-flush accessible threshold. B651 limits it to ≤ 13 mm, bevelled above 6 mm. It faces east or west, with a floor and wall above. The user has decided on:
- a **Passive-House-certified wood-aluminium lift-and-slide**;
- a **motor drive**, with controls 900–1100 mm high on both faces;
- **triple glazing**.

**What this file replaces.**
- The generic "fibreglass lift-and-slide" in `detail02.mjs`: parts `track`, `track-rails`, `nosing`, `grout`, `wedge`, `pan`, `pan-back`, `course`, `sill-foil`, `sill-apron`, `sash`, `glass-*`.
- The lap-2 findings it answers:
  - R4 N11, no fibreglass lift-and-slide exists in BC;
  - R4 N2, thin-glass triple;
  - R1 N1 and R3 N2, 16 mm threshold;
  - R1 N2 / P7, warm sill;
  - R1 N6 and R2 N8, pan sequence and anchors;
  - R1 F11, anchorage;
  - R1 F14, NAFS;
  - R2 N3, overflow hierarchy;
  - R3 N3, motor drive.
- The head study runs in parallel. Head dimensions here are for coordination only.

---

## 0. How to read this file

### 0.1 Tags

| tag | meaning |
|---|---|
| **(S)** | SOURCED. Stated in a document read this session (key in §0.3), or in an approved/project file (cited as `11 T9`, `R1 N3`). |
| **(S\*)** | SOURCED, but seen only in a search-engine summary or an aggregator listing. Treat as a lead; verify before it becomes a library value. |
| **(I)** | INFERRED. My calculation (method shown), a geometric consequence, or judgement (reason given). |
| **(S-d)** | Read off a **maker's drawing to scale**: the published 1:2 or 1:4 PDF, measured on a 1 mm grid overlaid on the vector render this session. Accuracy is about ±1 mm. It is a measurement, not a printed dimension; treat it as stronger than (I) and weaker than (S). |
| [S] / [S\*] / [I] | The same meanings, applied to performance claims. |

Clause, page and certificate numbers are references, not values, and are not tagged.

### 0.2 Datums (the `detail02.mjs` datums)

- **x = 0 at the frame's exterior face.** This is the exterior face of the aluminium shell at the head and jambs, i.e. the left end of the maker's 259 mm frame-depth dimension.
- **Exterior is negative; interior is positive.**
  - Note that 11 §0.2 used outward-positive. This file follows `detail02.mjs`, not 11.
- **y = 0 at the interior finished floor (FFL)**, up positive. Millimetres.
- ENERsign's own datum "±0,00" in ENS-K08 is the top of its sill block and the interior floor. It coincides with FFL.
- The section is cut **through the operable (sliding) sash**. The fixed-panel section differs (ENS-K03 p. 31) and is noted where it matters.

### 0.3 Source keys

| key | document | URL | how read |
|---|---|---|---|
| **PHI-ENS** | PHI component certificate **1831sl03 "ENERsign primus slide"**, ENERsign GmbH, Wittlich DE; cool-temperate; **valid until 31 Dec 2026** | https://database.passivehouse.com/en/components/certificate/download/1924/en | Downloaded; text extracted; pp. 3–4 rendered |
| **PHI-ENS-R** | PHI *certification report* 1831sl03 (16 pp., Flixo models, installation ψ), 8 Feb 2022 | https://www.enersign.com/inhalte/uploads/PHI-Zertifikatsbericht-ENERsign%C2%AE-primus-Hebeschiebetuer_2022.pdf | Downloaded; pp. 4–14 rendered and read |
| **PHIUS-ENS** | Phius door certificate **D-100181**, "ENERsign Primus Lift & Slide Door", Blue Path, NFRC CPD # ENS-K-3-00005-00001 (sheet dated 12/23/2025; last certified 02/20/2024) | https://www.phius.org/sites/default/files/certificates/door/D-100181_23-Dec-2025.pdf | Downloaded; text extracted |
| **ENS-WEB** | ENERsign, *primus lift and slide door* product page | https://www.enersign.com/en/produkte/holz-aluminium-enersign-primus-hebeschiebetur/ | Read (WebFetch) |
| **ENS-K03** | ENERsign *Kompendium V1.2020*, ch. 03 "Hebeschiebetüren" (system sections at 1:2, pp. 30–37) | https://www.enersign.com/inhalte/uploads/Kapitel-03_V1_2020_ENERsign-Hebeschiebetueren.pdf | Downloaded; vector pages rendered; dimension text extracted; sill measured on a mm grid |
| **ENS-K08** | ENERsign *Kompendium V1.2020*, ch. 08 "Drainage / Einbau-Situationen" (installation sections at 1:4, pp. 72–90) | https://www.enersign.com/inhalte/uploads/Kapitel-08_V1_2020_ENERsign-Drainage-Einbau-Situationen.pdf | Downloaded; p. 72 rendered and zoomed; text extracted |
| **ENS-BRO** | ENERsign, *ENERsign®primus* brochure (GB) | https://www.enersign.com/inhalte/uploads/Brochure-ENERsign%C2%AEprimus_GB.pdf | Downloaded; text extracted |
| **PHI-LIST** | PHI database, *Sliding doors* list: complete, 11 entries, "has-next-page = false" | https://database.passivehouse.com/en/components/list/sliding_door | Paginated list fetched; all rows read |
| **PHI-OPT** | PHI certificate **0515sl03 "MOTURA"**, OPTIWIN GmbH, Ebbs AT; phA; valid until 31 Dec 2026 | https://database.passivehouse.com/en/components/certificate/download/543/en | Downloaded; p. 4 rendered |
| **PHI-SMW** | PHI certificate **0399sl03 "smartwin sliding"**, pro Passivhausfenster GmbH | https://database.passivehouse.com/en/components/certificate/download/711/en | Downloaded; p. 4 rendered |
| **PHI-CRIT** | PHI, *Criteria and Algorithms for Certified Passive House Components: Transparent Building Components* | https://passivehouse.com/downloads/03_certification_criteria_transparent_components_en.pdf | Downloaded; text extracted (threshold clauses) |
| **OPT-WEB** | OPTIWIN, *Panorama Wood-Alu* product page | https://www.optiwin.net/products/panorama-wood-alu | Read |
| **FEN-PERF / FEN-LS / FEN-PH** | Fenstür (Wescon Cedar Products, Duncan BC): *Performance*, *Lift + slide doors*, *Passive House* pages | https://www.fenstur.com/performance ; https://www.fenstur.com/lift-slide-doors ; https://www.fenstur.com/passive-house | Read |
| **AGB-CT** | AGB (IT), *Climatech 68/78-80/92* lift-slide-for-wood product page, plus the leaflet *Lift-slide innovations for different situations* | https://www.agb.it/en-us/products/window-hardware/sliding-systems/lift-slide-wood/climatech-font-size-1-68-78-80-92-font ; https://www.agb.it/en-us/downloads/leaflets/sliding-systems/lift-slide/lift-slide-innovations-for-different-situations | Page read; leaflet downloaded and text-extracted |
| **SIE-HSA** | SIEGENIA, *DRIVE axxent HSA smart* technical data sheet H40.MOTS003EN (06.2017) | https://www.siegenia.com/api/service/file/188494_nl?locale=en | Downloaded; text extracted |
| **SIE-MHS** | SIEGENIA, *MHS400 smart* technical data sheet (06.2017) | https://www.siegenia.com/api/service/file/188495_nl?locale=en | Downloaded; text extracted |
| **SIE-LS** | SIEGENIA, *DRIVE axxent LS* product page | https://siegenia.com/en/products/sliding-door-systems/drives-for-lift-slide-systems/drive-axxent-ls | Search summary only (S\*) |
| **HAU-CD** | HAUTAU/MACO, *HS & S Comfort Drive*; HAUTAU *ATRIUM HS* catalogue | https://www.maco.eu/en-INT/Products/Sliding-doors/Sliding-Door-Lift-slide-hardware/HS-Motor-Comfort-drive ; https://www.hautau.de/fileadmin/user_upload/ATRIUM_HS_EN_web.pdf | Search summary only (S\*) |
| **CF** | Compacfoam CF200 listings (Green Building Store / NBS / 21degrees, the North American distributor) | https://www.greenbuildingstore.co.uk/product/compacfoam-200/ ; https://21degrees.com/compacfoam | Search summary only (S\*) |
| **A460** | CSA A460:19 via Walker Glass (AviProtek) and FLAP Canada | https://www.walkerglass.com/?p=23871 ; https://www.flap.org/bird-safe-windows-2 | Search summary only (S\*) |
| **EPD-W** | Wood-aluminium window EPDs via One Click LCA: Svenska Fönster S-P-01969, NorDan NTech 105/80, Norgesvinduet | https://materials.oneclicklca.com/en/material/wood-aluminium-window-fixed-per-m2/5f677d2e8199814dbdf707eb | Search summary only (S\*) |
| **Reused** | 11 (§2.1 G1–G13, §2.3, §3, §5), 12, R1/R2/R4 lap-2 reviews, `detail02.mjs` | project files | Cited by key |

**Not obtained this session:**
- ENERsign's installation instructions or anchorage drawing. They are not on the download pages; the DWG library is "not working at the moment" (ENS downloads page).
- The identity of ENERsign's lift-slide fitting (Siegenia / HAUTAU / G-U).
- Any NAFS / CSA A440S1 test of any candidate except Fenstür's grade.
- A Canadian distributor for ENERsign or Optiwin.
- Any product EPD for a wood-aluminium lift-and-slide.
- CSA A460 and CSA B651 figures (B651 is used from the 11/08 local copy).

### 0.4 Consistency with approved research and the lap-2 reviews

| # | existing | this file | status |
|---|---|---|---|
| 1 | 11 §2.3 named ENERsign Primus 755 phB 0.60 at 4.5 × 2.8 m (S\*) | Confirmed from primary documents: PHI 1831sl03 phB (S), Phius D-100181 lift-slide (S), Uw 0.60 at 4.5 × 2.8 m (S, ENS-WEB) | Upgraded S\* → S |
| 2 | 11 §1: track top +5, trench at −8 | ENERsign track top = FFL, rail ≈ +5 (S-d); maker's grate −11 (S) | Revised, §3 |
| 3 | 11 T9 / R1 P7 warm sill | Same principle. **The maker itself shows the sill block on an 80 mm insulating base, with no grout** (S, ENS-K08) | Consistent; now maker-backed |
| 4 | 11 §5.4 assumed a PH threshold f_Rsi of 0.74–0.76 | **ENERsign threshold f_Rsi = 0.62** (S, PHI-ENS); **0.615** installed in EIFS (S, PHI-ENS-R) | **Conflict C1** (§9) |
| 5 | ENS-BRO says "ENERslide … certified in efficiency class **phA**" | PHI-ENS (2022) says **phB** | Use phB (the certificate) |
| 6 | 11 §2.3: Westeck cert valid to 31 Dec 2026 (S) | A 2026 search summary says 31 Dec **2025** (S\*) | Re-check if Westeck is reconsidered |
| 7 | R2 N3 overflow: notch crest −20, interior barrier top −5 | Adopted unchanged | Consistent |
| 8 | R1 N3 channel geometry (house wall −92, weir −95), R2 N5 deeper beam | Kept; only the beam's back edge moves (231 → 240.4) | Consistent |

---

## 1. Summary of decisions

| topic | decision | basis |
|---|---|---|
| **Product (recommended)** | **ENERsign primus lift & slide ("ENERslide")**: aluminium-clad spruce (larch/oak optional), 2 panels, scheme A (1 fixed + 1 sliding) | **The only wood-aluminium lift-and-slide certified by both PHI (1831sl03, phB) and Phius (D-100181). It is NFRC-simulated (CPD ENS-K-3-00005-00001)** (S). Max height 2800, width 6000 scheme A (S). Uw 0.60 at 4.5 × 2.8 m (S). Published sill and drain installation sections (S) |
| **Fallback (certified)** | **OPTIWIN MOTURA** (PHI 0515sl03, **phA**, Uw 0.79, threshold f_Rsi **0.70**) | PHI-OPT (S). Better threshold than ENERsign, but no North American channel found (a 2017 Canadian rep, S\*). Not on Optiwin's current product list: its lift-slide is now "Panorama Wood-Alu" (S, OPT-WEB), which is not in PHI-LIST |
| **Fallback (local, not PH-certified)** | **Fenstür lift + slide** (Duncan BC), wood-aluminium-clad on the AGB Climatech/Imago system | **NAFS LC30, OX up to 168 × 156 in (4267 × 3962 mm), 400 kg** (S, FEN-PERF). Low-profile fibreglass threshold (S), flush "ClimaZero" kit available from AGB (S). **No PHI lift-slide certificate** (S, PHI-LIST). Use only with THERM proof of f_Rsi ≥ 0.70 and USI ≤ 1.22 |
| Rejected | Internorm HS 330, Gaulhofer, Josko, Unilux, Loewen | None is in PHI-LIST (S). Loewen's common triple U 1.53 fails VBBL 1.22 (S, 11). Internorm has a Canadian importer (S\*) but no PH lift-slide certificate. "Pazen" **is** ENERsign: the PHI report names "ENERsign GmbH, Günter Pazen" (S) |
| **Threshold achieved** | **12 mm**: landing/tray at **−7**, nosing lip −12, track at FFL, running rail **+5** | Maker geometry (S/S-d) plus a project tray (I). The maker's own detail is **16 mm** (grate −11 → rail +5), which fails B651 13 (I from S) |
| **Sill profile** | **Frame depth 259; sill block 134 wide (x 100→234) × 54 deep (y −54.5→0); drained Al/PVC nosing x 91→183; thermally broken track x 183→233 at FFL; rail ridge ≈ +5; sash bottom rail 100 high above FFL; threshold b_f 154, U_f 1.15** | ENS-K03 p. 30 (S), PHI-ENS (S), ENS-K03 measurement (S-d) |
| Below the sill | **No grout, no mortar.** Purenit bearer (screw ground) 9–18 mm above the pan + machined PU course 112–128 mm below the pan. That is ≈ 135 mm of structural insulation, against the maker's 80 mm insulating base | ENS-K08 80 mm base (S); R1 P7; geometry (I) |
| Pan and anchorage | Two-stage pan (R1 N6): 316 **dam-angle cast in** before the pour, plus a welded pan after framing. **No fastener reaches the pan**: block screws stop in the Purenit bearer, and clips go to the dam-angle above −30 | R1 N6, F11; R2 N8; geometry (I) |
| Drainage | R1/R2 channel kept (house wall −92, weir −95, notch −20). A **paver-slip 316 tray at −7** spans channel → frame. One **6 mm heel-safe slot** sits under the nosing lip and drops onto the pan nose | R1 P8, R2 N3 (S project); B651 4.3.4 (S via 11) |
| **Drive** | **SIEGENIA DRIVE axxent HSA smart** (part-concealed; ≤ 400 kg; jam protection; light-curtain option; manual emergency key), **or the concealed DRIVE axxent LS** if ENERsign's fitting is SIEGENIA PORTAL HS. HAUTAU HS Comfort Drive (≤ 330 kg single) if the fitting is HAUTAU | SIE-HSA (S); SIE-LS, HAU-CD (S\*) |
| **Glass** | **6 mm heat-strengthened/tempered (#1 bird markers, #2 low-e) / 14 Ar / 4 / 14 Ar / 8.76 laminated (#5 low-e) ≈ 46.8 mm; Ug ≈ 0.55–0.6; g ≈ 0.35–0.50 by face; ≈ 47 kg/m²** | Rebate is for a 48 mm unit (S, PHI-ENS); size and wind check by the maker to DP 960 (R1 F14); values (I) |
| Ratings to require | NAFS-17 / A440S1 label **for this flush sill**: LC-PG20 (DP ≥ 960) minimum; water ≥ 180 Pa (code), 260 Pa east; air A3. USI ≤ 1.22 to CSA A440.2 / NFRC 100 | 11 §1, G1–G8 (S); R1 F14. **No NAFS test of ENERsign was found** (§2.4) |
| Carbon | ≈ **75–115 kgCO₂e per m² of opening (A1–A3), central ≈ 93**. Glass ≈ 60 % of it | §7 (I from S/S\* factors) |

---

## 2. Products

### 2.1 Every PHI-certified sliding door (complete list, PHI-LIST)

| product | maker | class | frame | Uw | certified | relevance |
|---|---|---|---|---|---|---|
| **ENERsign primus slide** | ENERsign GmbH (DE) | phB | **Timber/aluminium** | 0.80 | Feb 2022 | **Lift-and-slide** (S, PHI-ENS-R title "Hebeschiebetür"; Phius "Operation Type: Lift Slide Door") |
| **MOTURA** | OPTIWIN GmbH (AT) | **phA** | **Timber/aluminium** | 0.79 | Apr 2013 | Type not stated on the certificate (S). The drawing shows a sliding sash on a low steel rail (S) |
| smartwin sliding | pro Passivhausfenster (DE) | phA | Timber/alu + wood fibre | 0.78 | Feb 2012 | Type not stated; no North American channel found |
| Milux Passive 135 | Beijing Milan (CN) | phA | Timber/aluminium | 0.79 | Aug 2016 | No North American channel found |
| Cascadia Slider PH | Cascadia (BC) | phA | GFRP | 0.76 | Jul 2018 | Not lift-and-slide (11) |
| Westeck PH Vinyl L&S | Westeck (BC) | phB | PVC | 0.78 | Nov 2019 | Lift-and-slide, but PVC (R4 N11) |
| PH Tech Twist S-6350 | PH Tech (QC) | phB | PVC | 0.80 | May 2025 | Not wood |
| E9-ALS245, HST eco230, Purso LK100ECO, ASD210L | various | phB | Aluminium | 0.80–1.00 | 2016–2024 | Not wood |

**Reading [S].** Only **two** PHI-certified wood-aluminium sliding doors have a plausible European supply chain, ENERsign and Optiwin. **Only ENERsign is certified as a lift-and-slide by both PHI and Phius.** Internorm HS 330, Gaulhofer, Josko and Unilux are absent from PHI-LIST; their "Passivhaus" claims are marketing or U-value claims (S\*).

### 2.2 Candidate data

| item | **ENERsign primus lift & slide** | **Optiwin MOTURA** | **Fenstür lift + slide** (fallback, not PH-cert.) |
|---|---|---|---|
| Certificates | PHI 1831sl03 phB, valid to 31 Dec 2026 (S). Phius D-100181 Blue Path (S). NFRC CPD ENS-K-3-00005-00001 (S) | PHI 0515sl03 phA, valid to 31 Dec 2026 (S) | NAFS LC30 (S). NFRC "compliant" (S). PHI certificates for other Fenstür windows/doors, **not** the lift-slide (S, FEN-PH) |
| Uw | 0.80 at 2.40 × 2.50 m with Ug 0.70 (S). 0.66 with Ug 0.52 (S, PHI table). **0.60 at 4.5 × 2.8 m, 0.64 at 2.4 × 2.5 m with Ug 0.52** (S, ENS-WEB). Phius whole door 0.69 W/m²K (zone 4A/4B column) at 2.0 × 2.0 m (S) | 0.79 with Ug 0.70; 0.66 with Ug 0.54 (S) | Not published. AGB Climatech 92 "up to 0.69 with glass 0.50" (S, AGB-CT leaflet) |
| Frame parts (b_f / U_f / f_Rsi) | Threshold **154 / 1.15 / 0.62**; head 156 / 1.05 / 0.72; jamb 165 / 0.86 / 0.71; mullion (interlock) 120 / 1.19 / 0.70; fixed bottom 100 / 0.54 / 0.72 (S, PHI-ENS). Phius sill (sliding lite) 155 mm, U_f 1.14 (S) | Threshold **126 / 1.11 / 0.70**; head 87 / 0.92 / 0.70; jamb 98 / 0.70 / 0.70; mullion 100 / 1.26 / 0.70 (S) | Not published |
| Installation ψ (EIFS model) | threshold 0.031, head 0.009, jamb 0.015 W/(m·K) (S, PHI-ENS-R p. 4). **Installed threshold f_Rsi 0.615 (θsi 8.46 °C at −10/+20)** (S, PHI-ENS-R p. 12). Uw,installed 0.88 (S) | Not in the certificate | — |
| Max size / weight | H ≤ **2800**; overall W ≤ 6000 (scheme A), 10 000 (scheme C) (S, ENS-WEB/BRO). Visible frame width "94 mm" (S, BRO). Max sash weight **not stated** (S) | Not found | OX 72–168 in wide × 80–156 in high; OXXO up to 312 in; **400 kg (880 lb)** (S) |
| Frame depth | **259** (10 + 43 + 68 + 138) (S, ENS-K03) | Not given | 78 mm lift-slide construction (S, FEN-LS); 106 mm window system (S) |
| Threshold type | "Barrier-free" (S). Wood sill block on an insulating base, thermally broken Al/PVC track and drained nosing (S, ENS-K03/K08). Rail ≈ +5 (S-d); maker's grate −11 (S) | Low steel rail on timber; GFRP exterior sill on insulation (S, drawing). Height not given | AGB **Climatech** fibreglass-reinforced threshold, ¾ in (≈ 19 mm) tall (S, FEN-LS). **ClimaZero** kit makes it "coplanar with the internal and external floor" (S, AGB) |
| Glass | Triple; standard **Ug 0.52, g 53 %, LT 71 %, 4 mm lites**, Swisspacer Ultimate PU (S, ENS-WEB). PHI unit 4/18/4/18/4 = **48 mm**, rebate 19 mm (S). Phius unit 4/4/4 Ar, 1-7/8 in (S). Safety and solar glass on request (S) | 4/18/4/18/4 = 48 mm, glass cover 15 mm (S) | Double or triple; premium triple centre-of-glass 0.70 (S, FEN-PERF) |
| Motor | Not mentioned (S, ENS-WEB) → fitting maker to be confirmed (§5) | Not found for MOTURA. Optiwin's Panorama has an "electric upgrade" with BUS (S, OPT-WEB) | Not mentioned; "hydraulic handle assistance" (S) |
| NAFS / A440 | **None found** (§2.4). EU tested to DIN 18055, class not stated (S) | None found | **LC30** for OX and OXXO (S). Water and air classes not published (S) |
| Canada supply | No distributor found. Phius and NFRC listings point to a North American sales path (I). ENERsign's site shows a Passive House Canada logo (S) | Durfeld named Canadian rep in 2017 (S\*) | **Made in BC** (Duncan), 250 748 5234 (S) |
| EPD | None found | None found | None found |

### 2.3 Why ENERsign, and what that costs

**For it:**
- Lift-and-slide confirmed by PHI and Phius (S).
- North American thermal paperwork already exists (NFRC CPD) (S). VBBL 10.2.2.7 needs NFRC 100 / CSA A440.2 labels (S, 11 G8).
- Fits the opening:
  - 4.8 m is within scheme A's 6000 (S);
  - the 2.78 m frame is within 2800 (I from S);
  - the 4.5 × 2.8 m PH test size is almost this door (S).
- The maker publishes the sill installation: block on an insulating base, channel in front, no grout (S). That is the R1 P7 "warm sill" in the maker's own drawing.

**Against it:**
1. **Threshold f_Rsi 0.62** (frame) and **0.615** (installed, EIFS) (S), below the 0.70 hygiene line.
   - PHI applies a separate **dew-point criterion to door thresholds** (S, PHI-CRIT §2.3 note 1 and "the minimum temperature factor … may be lower at the threshold profile"), which is why the door is certified anyway.
   - At −7 °C / 20 °C, 0.62 gives a 9.7 °C surface. That is the dew point of 20 °C air at ≈ 52 % RH (I, Magnus).
   - The warm sill (§3) is therefore **necessary** and should be checked in THERM. Floor heating within 1 m of the sill is recommended (S, 11 §6.1, Marvin).
2. **No NAFS label.**
   - VBBL 9.7.4.2 needs NAFS + A440S1 (S, 11 G1).
   - Either ENERsign tests the flush-sill configuration at a NAFS lab, or the door goes to Part 5 / an alternative solution (R1 F14).
3. **Import:**
   - EU lead time and A4 shipping;
   - safety glass must be certified to **CAN/CGSB-12.1** (S, 11 G10), not only EN 12150 (I);
   - the drive must carry a Canadian electrical approval (CSA/cUL or field evaluation) (I).
4. **Certificate expiry 31 Dec 2026** (S). A renewed certificate is needed at tender (I).

**Optiwin MOTURA** has the better threshold (0.70, S) and class (phA, S). Ask both makers for a price and for NAFS. Choose MOTURA if Optiwin can supply it with the 2027 certificate.

### 2.4 Rating evidence

| evidence | value | tag |
|---|---|---|
| ENERsign: air and driving rain to DIN 18055; "strain group C" | no class stated | (S, ENS-WEB) |
| AGB Climatech (Fenstür system): water up to **9A** (EN 12208, 600 Pa), air class 4, wind C2–C3 | EU classes | (S, AGB-CT) |
| Fenstür lift-slide NAFS performance grade | **LC30** (DP 1440 Pa ≥ 960 required) | (S, FEN-PERF); conversion (I) |
| Code need (Vancouver, ≤ 10 m) | DP 960 / PG20 / water 180 Pa; 260 Pa on the east | (S, 11 G3, §7) |

---

## 3. THRESHOLD: maker's section, and the drawable warm sill

### 3.1 ENERsign sill, as published (operable-sash section)

| element | x (mm) | y (mm) | tag / source |
|---|---|---|---|
| Frame overall depth | 0 → **259** | — | (S) ENS-K03 p. 30 chain 10 / 90 / 21 / 113 / 25 |
| Sill block, exterior strip (lighter hatch; material not labelled) | 100 → 121 | −54.5 → −19 | (S) 21 wide; heights (S-d) |
| Sill block, main (timber section; PHI model "Spruce" λ 0.11) | 121 → 234 | −54.5 → −19 (front), → −1 (under the track) | (S) 113 wide, **54 deep below ±0,00**; steps (S-d) |
| Drained exterior sill (nosing), Al with PVC thermal separation | lip **91** → 183 | lip top **−12**, lip curl to −21; rises to −1 at x 183 (slope ≈ 1:8.4) | (S-d); PVC break (S, PHI-ENS-R p. 5 legend) |
| Running track, thermally broken (Al/PVC), V-legs into the block | 183 → 233 | −15 → **0 (= FFL)** | (S-d); ±0,00 at track and floor (S, ENS-K08) |
| Running-rail ridge (exposed when the sash is open) | ≈ 205 → 215 | top **≈ +5** | (S-d) |
| Sliding sash (Al-clad timber), bottom | 147 (Al shell) → 259 | bottom ≈ +1 closed; rail 77 + bead 23 → glass from ≈ **+101** | (S) 77 / 23; (S-d) +1 |
| IGU (48 mm) | ≈ 168 → 216 | from ≈ +101 | (S) 48; x (S-d) |
| Interior floor at FFL, running **under** the 25 mm sash overhang | 234 → | 0 | (S) ENS-K03 (25 dim), ENS-K08 hatch |
| Maker's drainage zone in front of the block (open, labelled "Drainage") | 10 → 100 | −8 → −54.5 | (S-d) |
| **Maker's installation (ENS-K08 p. 72):** insulating base under block and channel, **80** thick, **377** wide; block 54 + base 80 = **134** below FFL; channel "Drain 252-40" (40 mm build height) with grate "Rost 252", **grate top −0,011** | base x ≈ −143 → 234 | −54 → −134; grate −11 | (S). x from the 377 width aligned to the block back (I) |
| ENERsign channel range | widths 102 / 142 / 162 / 202 / 252; build height 40 (also 50, 60) | — | (S) ENS-K08 p. 90 |
| Fixed-panel section: fixed frame 10 + 43 + 68 = 121 on the outer zone, then 113 block, 25 | 0 → 259 | 54 below FFL | (S) ENS-K03 p. 31 |

**Threshold height as published.** Grate −11 → nosing lip −12 → slope → track 0 → rail **+5**. That is **16 mm** above the landing (I from S/S-d). It meets DIN 18040's "barrier-free" ≤ 20 mm (PHI-CRIT quotes ≤ 20 mm for entrance doors, S). It **fails CSA B651 5.2.6 ≤ 13 mm** (S via 11 G13). This is R1 N1 again, now in the maker's own geometry. The lip-to-rail rise (≈ 17 mm, S-d) is fixed by the extrusion; only the landing level can change.

### 3.2 Project geometry: what changes, and why

- **Landing at −7, not −11 or −6.**
  - A project 316 tray carries paver slips at **−7** from the channel to a **6 mm slot** directly under the nosing lip (x 85 → 91).
  - Rise from landing to rail top: **−7 → +5 = 12 mm** (I) ✓ ≤ 13.
  - Vertical edges:
    - the 5 mm drop across the slot to the lip (−7 → −12): ≤ 6 ✓;
    - the rail, 5: ≤ 6 ✓.
  - The nosing rise of 11 mm at ≈ 1:8.4 is gentler than the 1:2 bevel B651 Table 1 permits for 7–13 mm (S via 11) ✓.
  - **Open:** B651 does not say whether a dip followed by a 17 mm local rise (lip −12 → rail +5) counts as one level change (I). Confirm against the B651 threshold figure (§10 Q2).
  - If it counts, the only fixes are a maker "zero" track or the Fenstür/AGB ClimaZero fallback.
- **The pan stays at R1 levels.** R1 and R2 fix the pan nose at ≈ −82 above the channel house wall −92 / weir −95, so the pan cannot drop to the maker's −134 base without lowering the whole rill chain (R2).
  - The maker's 80 mm base is therefore split around the pan:
    - Purenit **bearer** 9–18 mm above it;
    - PU **course** 112–128 mm below it;
    - total ≈ 135 mm, more than 80 (I).
  - ENERsign to confirm (§10 Q3).
- **The beam / slot back moves from 231 to 240.4**, because the frame is 259 deep. The block's back face is at 234, and the foil, pan upturn and dam-angle need ≈ 6 mm (I).

### 3.3 Drawable threshold layer table, in construction order

Datums as §0.2. The pan floor is `PAN(x) = −66 − 0.06·(240 − x)` (6 % outward; pan top face). Polygons are `[[x,y],…]`; `R(x0,y0,x1,y1)` is a rectangle. "Unchanged" means the lap-2 R1/R2 geometry.

| # | part id | component / material | geometry (mm) | support, fixing, laps | basis |
|---|---|---|---|---|---|
| 1 | `beam` | Engineered grade beam (R2 N5 deeper beam) | Top **−193 over x −20 → 240.4**. Slot-back step at **x 240.4** (was 231). Underside −530 | Part 4; sill support level ±1 mm over 4.8 m | R2 N5; MAR via 11 T1 (S); x (I) |
| 2 | `dampproof`, `beam-insul`, `pan-skirt` | As lap 2 | unchanged | Skirt laps 100 over the damp-proofing | R1/R2 |
| 3 | `course` | **Machined structural PU** (Armatherm 500-080 class, λ ≈ 0.0375, 1.45 MPa, S\* via R4 N6), top cut to the 6 % fall; **no wedge, no mortar** | `[[-20,-193],[240.4,-193],[240.4,-66.4],[-20,-82.0]]` (112–128 thick) | Bedded on the beam on PU adhesive. Drillable only **below** the pan line | R1 N2/P7; R4 N6/P5; (I) |
| 4 | `dam-angle` | 316 stainless 1.0, cast in **before the pour** (stage 1) | path `[[240.9,-5],[240.9,-110]]`. **Top −5** (R2 N3 item 4) | Screwed to the course's interior face at y −105 (below the pan, inside) | R1 N6; R2 N3 (S project) |
| 5 | `stone`, `eps-1/2`, `soilgas` | As 12 / lap 2; slab-side start moves to x 241.65 | poly up the angle's interior face at **x 241.525, −100 → −15** (85 butyl) | Poly butyl-taped to the angle, then cork, then pour | R1 N6; R2 N6 |
| 6 | `slot-edge` | Expanded cork 25 | R(241.65, −100, 266.65, −8) | Cast against | 12; R1 F4 |
| 7 | `slab` | Low-carbon slab 100, ground finish; mineral floor ≥ 610 from the sill | R(267, −100, 2500, 0) | — | 11 T20 (S, Marvin 610) |
| 8 | (framing) | Jamb posts, rough opening; jamb membranes down to the slab | RO plumb/square ±3 | — | 11 T15 (S) |
| 9 | `pan` | **316 0.8 welded pan, measured to the framed RO** (stage 2); end dams **150** up the jambs, welded | path `[[240,-25],[240,-66.0],[-20,-81.6],[-38,-82.7],[-38,-103]]` | Back upturn set against the dam-angle's exterior face; lap −60 → −25 butyl. Jamb membranes lap ≥ 100 over the end dams. **No fastener through the floor** | R1 N6/N7; 11 T6 (S: 150 end dams); R2 N8 |
| 10 | `haunch`, `channel`, `channel-seal`, silt box | As R1 N3 / R2 N3: channel x −171.5 → −21.5, house wall top −92, invert −95 → −120 (0.5 %), weir crest −95, **overflow notch −20** at the outlet end beyond the leaf, second outlet optional | unchanged | Channel 150 past each jamb, welded end caps | R1 N3; R2 N3 |
| 11 | `sill-bearer` | **Purenit** high-density PUR (550 kg/m³, compressive up to 8 MPa, λ 0.096; S via 11 PUR). It is the screw ground. Underside machined to the fall, with **5 × 3 mm drainage grooves at 150 o.c.** running outward | `[[98,-54.5],[236,-54.5],[236,-63.7],[98,-72.0]]` (9.2 → 17.5 thick; 2–3 mm pad zone to the pan below) | Bedded on the pan on **discrete** injected PU/epoxy pads (2–3 mm) at the frame's fixing points, gaps left as drainage. Top machined level ±1 mm over the opening | R1 N2 (bearer); 11 T10 (±1 mm, S); grooves (I) |
| 12 | `sill-block` | **ENERsign sill block** (maker; timber/insulation composite), set dry | `[[100,-54.5],[234,-54.5],[234,-1],[183,-1],[183,-19],[100,-19]]` | **Screws through the block into the bearer only.** Screw length ≤ block + bearer − 3 at each point (< pan). Plus 316 clips from the block's interior face to `dam-angle` above y −30 (R1 F11). Jamb fixings per maker | ENS-K03 (S/S-d); anchorage (I) |
| 13 | `sill-nosing` | ENERsign drained Al sill with PVC break (maker) | `[[91,-12],[183,-1],[183,-19],[100,-19],[100,-21],[91,-21]]` | Clipped to block and track per maker | (S-d) |
| 14 | `track` + `track-rail` | ENERsign thermally broken running track (maker) | `track` R(183, −15, 233, 0); `track-rail` R(205, 0, 215, 5) | In the block groove; end caps set in sealant on the pan end dams | (S-d) |
| 15 | `sill-foil` | EPDM air-seal foil, 1.0 | path `[[234.5,-2],[234.5,-36],[239.1,-36],[239.1,-58]]` | **Bonded 34 to the block's interior face, 22 to the pan upturn's exterior face.** The pan–angle butyl lap and the poly complete the air line. Turned 100 up each jamb post, under the jamb air seal | R1 N2/N7/N13 (≥ 30 bonds); (I) |
| 16 | `back-fill` | Cork strip / PU backer | R(235, −34, 239, −8) | Loose fit; removable | R1 N2 |
| 17 | `sill-cover` + `edge-seal` | **4 mm 316 (or bronze) floor plate** + tin-free MS sealant joint | plate R(235, −4, 262, 0); seal R(262, −8, 267, 0) | Plate bonded on the cork and the angle top, with 2 mm sealant at the block face. Removable for the 30-year track renewal | R1 P7; R2 N3 (5 mm seal over the −5 barrier); R4 4.8 (tin-free) |
| 18 | `tray-ledge` | **Discrete** 316 angle clips 40 × 40 × 3, **50 long at 300 o.c.** (so the slot drains between them) | path `[[85,-40.5],[97,-40.5],[97,-70]]` | Screwed into the **bearer's front face only** (y −70 → −56), above the pan | (I); fixings above the pan per R1 table |
| 19 | `landing-tray` | **316 tray 1.5, folded edges, filled with 30 mm paver slips** (P8), lift-out lengths ≤ 1 m, clip-locked | R(−165.5, −39, 85, −7): top **−7** | Bears on the channel's 316 edge rail (outer, ≥ 10 bearing), the channel house wall via 316 stools, and the ledge (18). The underside is perforated over the channel | R1 P8, N8; (I) |
| 20 | `slot` + `slot-screen` | 6 mm heel-safe slot, long side parallel to the door; perforated 316 dirt screen (1.0–1.2 mm) below at −45 | slot x 85 → 91; screen R(85, −46, 97, −45), clipped between the ledge clips | Nosing lip drips into the slot, then onto the pan nose, then into the channel | B651 4.3.4 (S via 11); DDH19 screen (S via 11) |
| 21 | `sash`, `glass-1..3`, `door-verticals`, `door-hardware`, `drive` | ENERsign sliding sash + IGU (§5); drive (§6) | sash R(147, 1, 259, 101) at the bottom; IGU x 168 → 216 from +101 | Maker | ENS-K03 (S/S-d) |
| 22 | `pavers-lined` | Landing (granite per R4 P3), **top −7 at the channel**, 1:60 away | `PT(x) = −7 − (−171.5 − x)/60` | Rigid edge on the channel rail | R3 1:60; (I) |

**Delete:** `grout`, `wedge`, `sill-apron`, `pan-back`, `track-weeps` (R1 F12), the old fibreglass `nosing`, `grate`, `grate-seat`.

### 3.4 Accessibility check

- **Interior:** FFL 0 → track 0 → rail +5 (vertical, ≤ 6 ✓).
- **Exterior:** tray −7 → slot (6 mm, ≤ 13 ✓) → nosing lip −12 (5 mm drop ✓) → 1:8.4 to −1 → track 0 → rail +5.
  - Threshold height above both adjoining surfaces: **12 mm** (I) ≤ 13 (S, B651 5.2.6; VBBL 3.8.3.6.(5) for Part 3).
  - Open point §3.2 (dip and local rise).
- **Tolerance:**
  - The tray is carried by the channel and the bearer, not by the paving. Settlement of the landing therefore cannot raise the threshold height (I).
  - The 1 mm reserve (12 vs 13) covers the rail scaling uncertainty (±1, S-d).

### 3.5 Overflow hierarchy (R2 N3) with the ENERsign sill

| level | y (mm) | element | rule |
|---|---|---|---|
| Rail top | +5 | track | — |
| FFL / track / plate | 0 | — | — |
| **Interior water-barrier top** | **−5** | `dam-angle` top under the 5 mm seal | must exceed every overflow crest |
| Landing / tray top | −7 | tray | — |
| Nosing lip | −12 | maker | — |
| **Channel emergency overflow (notch)** | **−20** | channel outlet end, outside the leaf | crest < −5 ✓ (15 mm margin) |
| Pan upturn top (lapped to the angle) | −25 | pan | — |
| Sill-block underside | −54.5 | maker | wetted only above the notch level: a once-in-life event; inspect the block (I) |
| Pan nose (front) | −81.6 | pan | > house wall −92 ✓ |
| Channel house-wall top | −92 | channel | — |
| **Normal flood level (silt-box weir)** | **−95** | weir to the rill | the pan front stays dry in a blinded-basket event (R1 N3) |
| Channel invert | −95 → −120 | 0.5 % | — |

**Reading [I].** The order holds: −95 (weir) < −20 (notch) < −5 (barrier). It also stays below the nosing lip (−12), so the maker's track chambers never back-flood from the channel.

### 3.6 What each threshold part does, and what fails without it

| part | function | if missing or reversed |
|---|---|---|
| Purenit bearer + PU course (no grout) | Thermal break continues from the frame block down to the beam insulation | Concrete under a 0.62 threshold drives it below 0.60 (I, from R1 2D-FD case T as drawn: 0.65 on a fibreglass frame) |
| Screws stop in the bearer | Pan stays unpunctured | Water to the slab edge (R2 N8) |
| Dam-angle + welded pan (two stages) | Pan made to the measured RO; air and soil-gas line continuous | Pan built before framing (R1 N6) |
| Grooves under the bearer | Pan drains under the bearer | Bearer becomes a dam; water ponds behind it at the slab edge (I) |
| Tray at −7 + lip slot | ≤ 13 mm threshold; lip water handled | Maker's −11 grate gives 16 mm (§3.1) |
| Floor heating within ≈ 1 m | Lifts a 0.62 threshold | Frost or condensation at the sill in a humid room (S, Marvin via 11; I) |

---

## 4. HEAD AND JAMB FRAME PROFILES (for the parallel head study)

| item | value | tag |
|---|---|---|
| Frame depth at the head and jambs | **259** (10 + 43 + 68 + 138) | (S) ENS-K03 pp. 30, 32 |
| Head, over the sliding sash | Frame member **42**, then **16** lift/guide clearance, then sash top rail **77** + bead **23**. Glass edge **157–158** below the frame top | (S) dims; sum (I) |
| Head, fixed panel (exterior zone x 0 → 121) | Frame height **100** (45 + 55) | (S) |
| Head b_f / U_f / f_Rsi | 156 / 1.05 / 0.72 | (S) PHI-ENS |
| Jamb, operable | Sightline **165** (60 frame + 5 + 77 sash + 23 bead); b_f 165, U_f 0.86, f_Rsi 0.71 | (S) |
| Jamb, fixed | 100; U_f 0.53, f_Rsi 0.72 | (S) |
| Interlock (mullion with one sash) | **120** (55 + 10 + 55); U_f 1.19, f_Rsi 0.70 | (S) |
| Installation gap in PHI's models | **10 mm** | (S) PHI-ENS-R p. 3 |
| Installation ψ (EIFS): head operable / head fixed / jamb operable / jamb fixed | 0.009 / −0.001 / 0.015 / −0.001 W/(m·K) | (S) PHI-ENS / PHI-ENS-R |
| Proposed coordinates in this detail | Frame top **y 2730** (as now). Frame height = 2730 + 54.5 = **2784.5** ≤ 2800 max ✓. Sash 1 → ≈ 2672. Glass ≈ +101 → ≈ 2573, i.e. **visible glass ≈ 2470 high** | (I from S) |
| Fixing to the glulam | Frame screws through the head into the glulam in the 10–15 mm gap. Three-zone tape plus an interior airtight tape. No foam | 11 H5–H7 (S) |
| Deflection | **≤ 3 mm** under superimposed load after creep (S, 11 H1). The 16 mm guide clearance is the hard limit the lift and deflection must share (I) | (S/I) |
| Exterior blind | ENERsign's integrated exterior venetian blind (EL 80 L) uses a head box **485 deep × 200 high** above the frame (S, ENS-K08 p. 72). This is the West option in 11 H14 | (S) |
| Drive at the head | See §6. The SIEGENIA HSA needs **≈ 45 mm** at the top of the frame, room side (S) | (S) |

---

## 5. GLAZING

| item | value | tag |
|---|---|---|
| Pane size (2-panel, 4.8 × 2.785 frame) | Sash ≈ 2.45 × 2.67 m. Glass ≈ **2.25 × 2.47 m = 5.6 m²** per sash | (I) from §4 sightlines |
| Rebate / unit thickness | **48 mm** unit (4/18/4/18/4), glass cover 19 mm | (S) PHI-ENS |
| Maker standard | 4 / 4 / 4 triple, Ug **0.52**, g **0.53**, LT 0.71, Swisspacer Ultimate PU; **≈ 30 kg/m²** | (S) ENS-WEB; mass (I: 12 mm × 2.5 kg/m²·mm) |
| Thin-glass triple (4 / 1.3 / 4) | **Not buildable at this size** | (S) R4 N2 (Cardinal IG23) |
| **Recommended make-up** | **6 mm HS or FT (#1 bird markers, #2 low-e) / 14 Ar / 4 mm / 14 Ar / 8.76 (4.4.2 laminated, #5 low-e)** = **46.8 mm** ≤ 48 ✓. **≈ 47 kg/m², ≈ 263 kg of glass per sash**; with sash and hardware ≈ 310 kg | Make-up (I); fits the S rebate. Mass (I: 18.76 mm × 2.5) |
| Ug / g | Ug ≈ 0.55–0.60 with two low-e coatings and 14 mm argon (I). Uw from PHI's table at Ug 0.58 → **0.71** (2.4 × 2.5 m) (S); at the 4.5 × 2.8 m size, lower (≈ 0.65, I by ratio to 0.60/0.64). Both are far inside VBBL 1.22 (S, 11 G8) | (S/I) |
| g by face | East g ≈ 0.45–0.50. West g ≈ 0.35–0.40, keeping ≥ 0.28 (S\*, 11 §7) | (I) |
| Wind-load check | Outer lites sized by the maker to **DP 960 Pa** (ASTM E1300 / CAN/CGSB-12.20). 4 mm outer lites "very likely exceed" deflection limits at this size | (S project) R1 F14 (I there) |
| Safety glass | Every sash (VBBL 9.6.1.4) to **CAN/CGSB-12.1**: FT outer, laminated inner. EU-made glass needs CGSB certification or a Canadian-listed IGU fabricator | (S) 11 G10; import step (I) |
| Bird-safe | **CSA A460**: visual markers on **surface #1**, spacing ≤ **50 × 50 mm** (S\*, FLAP; Walker). Acid-etched dots (Walker AviProtek 217: 5 mm dots on a 2 in grid, #1, S\*) or **ceramic-frit dots on #1** (needs the HS/FT outer lite, I). UV-only patterns (ORNILUX) have no A460 test in what I found (S\*). Avoid applied film (R4 4.8: PVC/PFAS) | (S\*/I) |
| Weight vs hardware | 310 kg ≤ SIEGENIA HSA/LS 400 kg (S); ≤ HAUTAU HS 330 kg (S\*) with ≈ 6 % margin (I); ≤ Fenstür 400 kg (S) | (I) |
| Dry glazing | Ask for IGUs behind removable beads. The year-30 IGU change is then a repair (R4 N9) | (S project) |

---

## 6. MOTOR DRIVE

| item | SIEGENIA **DRIVE axxent HSA smart** (recommended if the fitting is SIEGENIA PORTAL HS) | SIEGENIA **DRIVE axxent LS** (concealed) | HAUTAU **HS Comfort Drive** (if the fitting is HAUTAU) |
|---|---|---|---|
| Mounting | **Part-concealed**: lift drive in the sash, slide drive on the **upper frame**, room side | **Fully concealed**, timber/PVC/Al sashes with SC guide rail | Concealed version for timber and timber-Al; or surface-mounted |
| Capacity | **≈ 400 kg** incl. glass (S). Scheme A inside frame width **2144–6666** (S). Sash height ≤ **3300** (S) | 400 kg (S\*) | **330 kg** single; up to 440 kg tandem (S\*) |
| Space | **≈ 45 mm at the top of the frame** (S). Slide drive can move down, profile-dependent (S) | Not found | Not found |
| Power | **120–230 V AC, 22 W**; 24 V internal (S). Mains 5 × 1.5 mm², concealed cable channel, ≤ 2.5 mm² supply (S, MHS400) | 24 V DC (S\*) | 24 V DC from 230 V PSU (S\*) |
| Speed / time | ≈ **150 mm/s**; lift ≈ **7 s**; slide force ≈ 50 N (S) | 140 mm/s (≤ 250 kg), 110 mm/s (251–400 kg); lift **3 s**; 60 N (S\*) | — |
| Obstacle detection | **Jam protection by current limiter; no dead-man control needed**; force limit to DIN 60335-2-103. Optional terminal board **pre-equipped for a light curtain** (S). Risk analysis to DIN 18650 / EN 12453 required at planning (S) | Not found | Integrated anti-pinch to 330 kg; external safety devices above 330 kg (S\*) |
| Manual override | **Manual emergency operation** on power failure; emergency key ≈ 2 Nm (S) | (S\*) yes | — |
| Accessibility | "Wheelchair-accessible design and operation to DIN 18040 possible (**flat threshold required**)" (S) | — | — |
| Controls | App, IR remote, buttons (S). **Project: hard-wired push buttons (or radio + battery) at 900–1100 mm on both faces**, on the jamb return and the exterior jamb cladding (S, V1 3.8.3.6.(4)/B651 via 11). Exterior button weather-rated | — | — |
| Durability | Tested **25 000 cycles at 400 kg** (S). IP20, dry locations, −5 to 50 °C (S) | −20 to 60 °C (S\*) | — |

**Routing (I):**
- A dedicated 120 V branch circuit runs to a junction box in the **fixed-panel jamb wall** at the head (interior, inside the air barrier).
- The cable runs in the maker's concealed channel into the head frame.
- Low-voltage control cable runs down the jamb stud cavity to the 900–1100 mm buttons.
- The exterior button cable passes through the jamb air barrier in a sealed grommet. It must not cross the pan end dam or the jamb membrane below 150 mm.
- Canadian approval of the drive: CB-certified (S, MHS400). It needs a CSA/cUL mark or a field evaluation (I).

**Decision (I).**
- **Ask ENERsign which fitting it uses** (not stated in any document read).
- If SIEGENIA PORTAL HS: use **DRIVE axxent HSA smart**, which is the best-documented. Prefer **LS** if the 45 mm head zone conflicts with the glulam soffit.
- If HAUTAU: use the HS Comfort Drive, concealed, after checking that the ≈ 310 kg sash is under 330 kg.
- The drive answers R3 N3 and R1 F20 (operating force).

---

## 7. CARBON (A1–A3, per m² of opening; opening 4.8 × 2.785 = 13.4 m²)

| item | basis | kgCO₂e/m² of opening | tag |
|---|---|---|---|
| Glass, recommended make-up (47 kg/m² × 11.1 m² glass) | 1.43 kgCO₂e/kg flat glass (NGA, S via R4), plus ≈ +5 /m² glass for spacer, PVB, coatings and gas (I) | **≈ 60** (glass fraction 0.83) | (I from S) |
| Glass, maker standard 4/4/4 | Triple IGU EPD **47.8 /m²** (Pilkington, S\* via 11) | ≈ 40 | (I from S\*) |
| Frame (Al-clad spruce) | R4 P7: wood-Al **3.5–7.4 kgCO₂e per m of profile** (I there) × ≈ 38 m per opening | **10–21** | (I) |
| Cross-check: whole wood-Al windows | 52.2 (Svenska Fönster, triple), 56.7 (NorDan NTech), 63.1 (Norgesvinduet, Al clad) /m² of window, small units | — | (S\*) EPD-W |
| Lift-slide hardware ≈ 20 kg | 2.2–5.0 kgCO₂e/kg stainless/steel (R4) | 3–7.5 | (I from S project) |
| Drive (≈ 6 kg incl. electronics) | ≈ 15 kgCO₂e/kg electronics-heavy assembly | ≈ 7 | (I) |
| A4, EU → Vancouver | R4: +≈ 16 kgCO₂e per m of detail ÷ 2.785 m | ≈ 6 | (I from R4) |
| **Total** | — | **≈ 93 (range 75–115)** | (I) |

**Reading [I].**
- This is level with R4's corrected fibreglass door (91 /m² of door). The frame material is not the lever; **glass mass is.** If ENERsign/E1300 allow 5 mm instead of 6 + 8.76 laminated, about −10 to −15 /m².
- Wood-Al is separable at end of life: the Al is recyclable and the wood recoverable (R4 4.9).
- **No product EPD exists.** Require an EN 15804+A2 EPD in the tender, or use the EPD-W class values with a 1.2 safety factor (I).

---

## 8. Failure modes (coastal BC, 0 / 5 / 15 / 30 years)

| mode | where | consequence | mitigation | tag |
|---|---|---|---|---|
| Cold threshold (f_Rsi 0.62) | Track / block interior face | Condensation above ≈ 52 % RH at −7 °C; frost at −9 °C | Warm sill §3; floor heating ≤ 1 m; THERM check; or the MOTURA fallback | (S/I) |
| Nosing lip slot clogs (leaves, grit) | x 85–91 | Lip water ponds on the tray edge, then on the nosing | Lift-out tray, screen, clean twice a year (11 §5.7). The slot is above the pan, so a blockage is visible and not hidden | (S/I) |
| Pan drainage blocked under the bearer | Under the bearer | Water stands at the slab edge | Grooves + discrete pads (§3.3 row 11). Pan inspection is possible only at track renewal | (I) |
| Screw too long through the bearer | Bearer, x 98–236 | Pan punctured | Screw schedule on the drawings; bearer ≥ 9 mm; dam-angle clips for uplift | (I) |
| Channel blinded + weir blinded | Channel | Flood to the notch −20; block underside wetted | Two-stage overflow; inspect the block if it ever happens | (I) |
| Rail wear and gasket compression | Track | Air leakage; sash drags | Maker service at 5 and 15 years; gaskets replaceable (S\*/I) | (I) |
| Drive failure / power cut | Head | Door inoperable from outside | Emergency key (S); second operable route (I) | (S/I) |
| Header creep > 3 mm | Head | Sash binds within the 16 mm clearance | Glulam sized for creep (head study) | (S/I) |
| West sun on dark Al shell | Exterior | Thermal bow, gasket wear | Light/mid colours; EL 80 blind (S) | (I) |
| IGU seal end of life (25–35 yr) | Sashes | Fogging; replace ≈ 11 m² | Dry glazing; glazier take-back (R4) | (S project) |
| Certificate lapse / product discontinued | Procurement | Loss of PH status | Tender requires the current certificate; MOTURA as alternate; Fenstür as local | (I) |

---

## 9. Conflicts

| # | conflict | handling |
|---|---|---|
| C1 | 11 §5.4 / R1 assumed a threshold f_Rsi of 0.74–0.76; ENERsign's is 0.62 (S) | Warm sill + floor heating; THERM; MOTURA (0.70) as the thermal fallback |
| C2 | Maker's threshold 16 mm vs B651 13 | Project tray at −7 → 12 mm; confirm the dip reading (Q2) |
| C3 | Maker's 80 mm insulating base vs the R1/R2 pan levels (pan nose ≥ −82) | Base split around the pan, ≈ 135 mm total; maker to confirm (Q3) |
| C4 | ENS-BRO "phA" vs PHI-ENS "phB" | Use the certificate |
| C5 | User requires PH certification; the only BC-made wood-Al lift-slide (Fenstür) is not certified | Fenstür is a non-certified fallback, conditional on THERM + NAFS |
| C6 | NAFS is required (VBBL 9.7.4.2); no ENERsign NAFS was found | Test or Part 5 (R1 F14) |
| C7 | Frame depth 259 vs the head zone (lintel 7–154, gyp to 169) | The frame projects ≈ 90 mm into the room past the gyp. The head study must wrap or recess it (I) |

## 10. Open questions (to the maker unless noted)

1. **ENERsign:**
   - Canadian/US distributor and lead time;
   - NAFS-17 / A440S1 test of the flush sill (water ≥ 180 / 260 Pa);
   - fitting maker and drive compatibility;
   - certificate renewal after 2026;
   - EPD;
   - CGSB-12.1 glass;
   - IGU dry-glazing option.
2. **B651 (architect / access consultant):** does a 5 mm dip at a 6 mm slot, followed by the 1:8.4 nosing and a 5 mm rail, satisfy 5.2.6 when the threshold is 12 mm above both floors? If not, a zero track or the AGB ClimaZero route is needed.
3. **ENERsign:** is ≈ 135 mm of split structural insulation (Purenit 9–18 above the pan, PU 112–128 below) an acceptable substitute for its 80 mm base? Where are the block fixing points? What are the jamb end-cap details?
4. **THERM/Flixo** of the §3.3 build-up. Target f_Rsi ≥ 0.70 at the track interior; report ψ_install for slab-on-grade (11 Q4).
5. **Optiwin:** is MOTURA still made? Is there a North American supplier? Threshold height? NAFS?
6. **Fenstür:** U_f/ψ/f_Rsi for Climatech 92 + ClimaZero; NAFS water class; motor option; EPD.
7. **Glass:** maker's E1300 / CGSB-12.20 sizing at DP 960; A460-compliant #1 marker product available to the EU IGU line.

## Tally (approximate)

- About 120 (S), 25 (S-d), 25 (S\*) and 70 (I).
- The sill geometry is maker-sourced: the 259, 134, 54, 80, 134, −11 and 154 dimensions are printed. Lip, rail and track heights are measured from the 1:2 vector drawing.
- The project-specific warm-sill split, tray and fixing strategy are inferred, and are flagged for the maker's confirmation.

### Sources (URLs)

- PHI certificate 1831sl03: https://database.passivehouse.com/en/components/certificate/download/1924/en
- PHI report 1831sl03: https://www.enersign.com/inhalte/uploads/PHI-Zertifikatsbericht-ENERsign%C2%AE-primus-Hebeschiebetuer_2022.pdf
- PHI component page 1831sl03: https://database.passivehouse.com/pl/components/details/sliding_door/enersign-gmbh-enersign-primus-slide-1831sl03
- Phius D-100181: https://www.phius.org/sites/default/files/certificates/door/D-100181_23-Dec-2025.pdf
- ENERsign lift-slide page: https://www.enersign.com/en/produkte/holz-aluminium-enersign-primus-hebeschiebetur/
- ENERsign Kompendium ch. 03: https://www.enersign.com/inhalte/uploads/Kapitel-03_V1_2020_ENERsign-Hebeschiebetueren.pdf
- ENERsign Kompendium ch. 08: https://www.enersign.com/inhalte/uploads/Kapitel-08_V1_2020_ENERsign-Drainage-Einbau-Situationen.pdf
- ENERsign downloads (system sections): https://www.enersign.com/en/downloads/downloads-systemschnitte/
- ENERsign brochure: https://www.enersign.com/inhalte/uploads/Brochure-ENERsign%C2%AEprimus_GB.pdf
- PHI sliding-door list: https://database.passivehouse.com/en/components/list/sliding_door
- PHI certificate 0515sl03 (Optiwin MOTURA): https://database.passivehouse.com/en/components/certificate/download/543/en
- PHI certificate 0399sl03 (smartwin sliding): https://database.passivehouse.com/en/components/certificate/download/711/en
- PHI transparent-component criteria: https://passivehouse.com/downloads/03_certification_criteria_transparent_components_en.pdf
- Optiwin Panorama: https://www.optiwin.net/products/panorama-wood-alu
- Optiwin Canada rep (2017): https://magazine.glasscanadamag.com/june-2017/page-20
- Fenstür performance / lift-slide / Passive House: https://www.fenstur.com/performance ; https://www.fenstur.com/lift-slide-doors ; https://www.fenstur.com/passive-house
- AGB Climatech: https://www.agb.it/en-us/products/window-hardware/sliding-systems/lift-slide-wood/climatech-font-size-1-68-78-80-92-font
- AGB leaflet: https://www.agb.it/en-us/downloads/leaflets/sliding-systems/lift-slide/lift-slide-innovations-for-different-situations
- SIEGENIA DRIVE axxent HSA smart: https://www.siegenia.com/api/service/file/188494_nl?locale=en
- SIEGENIA MHS400 smart: https://www.siegenia.com/api/service/file/188495_nl?locale=en
- SIEGENIA DRIVE axxent LS: https://siegenia.com/en/products/sliding-door-systems/drives-for-lift-slide-systems/drive-axxent-ls
- HAUTAU/MACO HS Comfort Drive: https://www.maco.eu/en-INT/Products/Sliding-doors/Sliding-Door-Lift-slide-hardware/HS-Motor-Comfort-drive
- Internorm Canadian importer (NeüFenster): https://www.houzz.com/professionals/window-sales-and-installation/neufenster-european-doors-and-windows-pfvwus-pf~253506608
- Gaulhofer Canada (Fenster-Tek, Calgary): https://www.rateitgreen.com/green-building-directory/products/fenster-tek-ltd/gaulhofer/3457
- Compacfoam CF200: https://www.greenbuildingstore.co.uk/product/compacfoam-200/ ; https://21degrees.com/compacfoam
- CSA A460 markers: https://www.walkerglass.com/?p=23871 ; https://www.flap.org/bird-safe-windows-2
- Wood-Al window EPDs: https://materials.oneclicklca.com/en/material/wood-aluminium-window-fixed-per-m2/5f677d2e8199814dbdf707eb
