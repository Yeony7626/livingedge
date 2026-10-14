# Detail 02, lap 2 review R4: sustainability and materials

Reviewer: R4 (sustainability, materials, carbon accounting). Date: 2026-10-13.

**What I read**
- Spec: `detail02-v2.mjs` / `detail02-v2.json` (120 parts), `materials.json`, `metrics.mjs`.
- `review/d2-lap2/metrics.md`, `report.md`, `changes-v2.md`.
- Renders `exterior-eye.png` and `exterior-elevation.png`.
- My lap-1 review.
- Research 09 §3.1 and §8; 11 §2.2–2.5, §5.3–5.4 (W4); 12 §1.3, §3.4 and §4.5–4.6.

**How the numbers were made.** I re-ran `metrics.mjs` on `detail02-v2.json` and reproduced **662.1** exactly. I then applied every correction and proposal below as part overrides, using `metrics.mjs`'s own quantity rules. The scratch scripts are `parts2.mjs`, `corr.mjs`, `mkprop.mjs` and `bridge.mjs` in the session scratchpad.

**Tags**
- **SOURCED (S)**: read this session in the named document.
- **S2**: read via an aggregator listing (One Click LCA), a search summary or a research file's [S2] row.
- **INFERRED (I)**: my calculation or judgement, with the method stated.

**Units.** All carbon numbers are **A1–A3 fossil, kgCO2e per metre of opening** (the unit `metrics.mjs` reports for the 10.5 m strip), unless a per-m² value is stated. Biogenic carbon is reported separately and never netted.

---

## Headline

| run | total | biogenic (long-cycle) | what changed |
|---|---|---|---|
| lap 1, v1 corrected (my lap-1 figure) | 656 | 173 | — |
| **v2 as shown** (`metrics.md`) | **662** | 144 | — |
| **v2 corrected** (same design; wrong masses, factors and one unbuildable glass make-up fixed) | **720** (range ≈ 660–780) | 144 | findings N1–N10, bridge below |
| v2 corrected + the §4 proposals, glulam-header route | **535 (−26 %)** | 216 | §4 P1–P6 |
| v2 corrected + the §4 proposals, reclaimed-steel route | **525 (−27 %)** | 144 | P2 variant |
| 60-year view (A1–A3 + B4/B2 replacements) | corrected ≈ **934**; proposals ≈ **720** | — | finding N9 |

**The shown figure of 662 is about 8 % low.** In lap 1 it was 27 % low, so the accounting has improved a lot.

**Bridge from 662 to 720** (each step is cumulative):

| step | Δ |
|---|---|
| IGU 4T/4/4T (the 1.3 mm centre lite is not available at 2.4 × 2.6 m), glass fill 0.92 | +20.1 |
| Lintel at the real W250x39 mass, 5.1 m of steel per 4.8 m opening, +4 % plates | +8.1 |
| SBS factor 0.75 → 1.3 (North American EPDs) | +19.5 |
| Frame restructure (6 verticals, fill 0.2, hardware as stainless, gaskets added) | −1.9 |
| Stainless factor 2.9 → 5.0 (generic origin) | +49.9 |
| Grates at product mass, about 3 kg/m (fill 0.35 → 0.14) | −41.7 |
| Polymer-concrete channel at about 15 kg/m | +4.7 |
| Head tape as PU foam tape, not polyethylene at 940 kg/m³ | −3.2 |
| Green-roof filter and protection fabrics (missing) | +2.7 |
| **Total** | **+58.2** |

**Uncertainty on 720 (INFERRED):**
- The glass make-up: −30 if the supplier confirms a thin centre lite at this size.
- The stainless origin: −32 to +31 across 2.9–7.0.
- The SBS factor: −25 to +5.
- The fibreglass frame: about ±25. Cascadia's per-profile data suggests the frame may be about 10–30 low (§2.3).

**On lap-1 factors the design barely moved (662 vs 656).** The v2 gains were roughly spent by three swaps that went the wrong way for carbon [I]:
- Gains (≈ −100): reclaimed-granite terrace, pumice substrate and drainage, HDPE pipes, no spray foam, thin glass on paper.
- Losses (≈ +85):
  - steel lintel instead of glulam, +40;
  - PU course instead of cellular glass, +25;
  - a new stainless rill grate, +19.

### Corrected zones, reported in units that mean something (finding N5)

| zone | kgCO2e per m of opening | intensity |
|---|---|---|
| **D door unit** (IGU, frame, sill/track, hardware, gaskets) | 248.0 | **91 kgCO2e/m² of door elevation** (÷ 2.73 m). Cross-check: Cascadia fibreglass triple window 145/m² (S, UBC-FEN; small unit, high frame share); aluminium sliding doors 58–208/m² (S2) |
| T threshold (beam, rebar, PU course, pan, channel, grate, grout) | 98.5 | per m of opening (not per m²) |
| H head band + lintel | 67.3 | per m of opening |
| F floor | 40.5 | 18.1 /m² (2.24 m) |
| R roof + overhang + green roof | 136.5 | 43.6 /m² (3.13 m) |
| M lined landing | 53.1 | 31.6 /m² (1.68 m) |
| P granite terrace | 14.4 | 10.3 /m² (1.4 m) |
| I planting bed | 11.3 | 6.5 /m² (1.75 m) |
| J rill + rain garden | 45.6 | 16.0 /m² (2.85 m) |
| E perimeter drain | 5.2 | — |

**Hotspots after correction** (share of 720):

| item | kgCO2e/m | share |
|---|---|---|
| Triple IGU | 128 | 18 % |
| Fibreglass frame | 93 | 13 % |
| **Stainless** | **77** | **11 %** |
| Steel lintel | 53 | 7 % |
| SBS membranes | 46 | 6 % |
| Concrete pavers | 36 | 5 % |
| PU course | 32 | 4 % |
| Polyiso | 30 | 4 % |
| Low-carbon concrete | 28 | 4 % |

---

## Lap-1 findings status

| # | lap-1 finding | v2 status | evidence / what is left |
|---|---|---|---|
| 1 | Door under-counted (BLOCKER) | **partly fixed** | Done: `door-verticals` added, IGU counted per kg. Left: only 3 of 5–6 verticals; glass still full width (lap-1 `fill 0.91` not applied); horizontals at fill 0.3, not 0.2; hardware priced as fibreglass-equivalent. The thin-glass make-up is not buildable at this size (N2) |
| 2 | Cellular glass priced as EPS | **fixed (key) / made worse (carbon)** | Replaced by PU 320 kg/m³ at 4.0 → 32.1 vs 7.2 for PERINSUL (+25). The swap was driven by drillability. An over-strong grade was chosen; Armatherm has an EPD (N6) |
| 3 | Polymer concrete priced as ready-mix | **partly fixed** | Key fixed. Body still drawn with 10 mm walls: 6.5 kg/m vs ≈ 15+ kg/m for a real channel (N7) |
| 4 | Pavers priced as 25 MPa ready-mix | **fixed** | `concrete-paver` on the landing; reclaimed granite on the terrace. The landing is called "low-carbon" but uses the generic 0.15 factor |
| 5 | Pipes: factor and per-opening | **partly fixed** | Per-opening fixed; underdrain and subdrain are HDPE. New PVC added: `perim-drain`. Still PVC: `rg-riser`, `track-weeps` (N12) |
| 6 | Missing material/quantity | **partly fixed** | Added: rebar, liner geotextiles, perimeter geotextile. Missing: green-roof filter/protection fabrics, door gaskets, joist hangers or fixings, downspout or rain chain, and the detention tank as a per-lot system item |
| 7 | Lintel and PT placeholders | **fixed (keys) / made worse (lintel)** | Lap-1 D12 (keep glulam) was reversed to a steel W250x39: +40 vs glulam, not disclosed as a carbon trade |
| 8 | Spray foam | **fixed** | Removed; stone wool used |
| 9 | One-off features | **partly fixed** | `per: "opening"` added for rill, runnel, pocket, apron and riser. Left: the rain garden is still priced as continuous; `pavers-2`, `bedding-2`, `base-2` and `edge-restraint` are still counted over the pocket width (−3, N13) |
| 10 | Single KPI | **partly fixed** | Zone table added, but T and H are divided by plan depth: 427 and 285 kg/m² are meaningless (N5). No "A1–A3 only, B4 excluded" label |
| 11 | Junction tags | **fixed** | P for terrace, H for head. The door's head members still sit in H (N5) |
| 12 | Sheet thickness drawn | **not fixed (harmless)** | Liner t 2 at HDPE ≈ real HDPE + 2 × 407 g/m² PP: 8.3 vs 8.0 |
| 13 | Plastics one factor | **fixed** | `membrane-poly` was not renamed; it covers only small parts |
| 14 | Growing medium | **fixed** | Pumice substrate and pumice drainage layer |
| 15 | Imported soil | **fixed** | — |
| 16 | XPS on beam | **fixed** | Graphite EPS Type 3 |
| 17 | Grate mass unverified | **made worse** | Still `fill 0.35` (7.5 kg/m vs ≈ 3.0 for an A15 heel-safe grate, S2). The same unverified fill was copied onto the new `rill-grate` |
| 18 | Life-cycle stages hidden | **not fixed** | B4 ≈ +214 over 60 years (N9) |

| lap-1 proposal | status |
|---|---|
| D1 thin-glass triple | adopted, but **not buildable** at 2.4 × 2.6 m: my lap-1 proposal was wrong (N2) |
| D2 no aluminium in the sill | adopted |
| D3 frame EPD, BC maker, dry-glazed replaceable IGUs | **not adopted**. No fibreglass lift-and-slide product is identified (N11) |
| D4 reclaimed granite beyond the landing | adopted |
| D5 F-2/40 % SCM curbs, slimmer edge restraint | not adopted |
| D6 insulation stops at the wall line; pumice; granular drainage | adopted |
| D7 HDPE pipes | partly |
| D8 stone wool instead of spray foam | adopted |
| D9 slot-top or lighter grate | not adopted |
| D10 PNW EAF rebar | adopted |
| D11 untreated wood where dry | not adopted; PT now in 7 parts |
| D12 keep glulam lintel | reversed |

### Where I challenge `changes-v2.md`

- **R1 F14 "thin-glass triple … done".** It is not buildable at 2.4 × 2.57 m panes (N2). The carbon credit taken for it (≈ −30) is not real until a supplier confirms the size.
- **R1 F7 "glulam 175x456 adds 190 to the band".** That is true only if the joists bear on top of the beam. A **flush** glulam 175 × 494 with hung joists fits inside the existing 2742.5–3257 zone and adds nothing (P2).
- **R4 2 "done".** PU replaced cellular glass at +25 kgCO2e/m. Armatherm 500 has a valid EPD (EPD-IES-0026744, to 14 Nov 2030), so "INFERRED; needs a product EPD" is now a lookup. The 320 kg/m³ grade is over-specified for track loads (N6).
- **R4 3 "done: ACO EPD per kg".** The factor is right but the mass is about half (N7).
- **R4 6 "Only the planting and people proxies are uncounted".** Not true; see row 6 above.
- **R4 9 and 10 "done".** Partly; see the table above.
- **R1 F18 "Materials use the R4 factors".** Two of the inherited factors I had passed as "adequately sourced" are now shown to be low: stainless (2.9) and SBS (0.75). That is on me, and it is corrected here (§2).
- **"Herbicide-free root-resistant cap".** It must also be **copper-free**, because this roof drains to the rain garden (§4.8).

---

## 1. Score: environmental sustainability — **6 / 10** (lap 1: 5)

- **Better than lap 1:**
  - The headline is within about 8 % (was 27 %).
  - Per-opening accounting exists.
  - Reclaimed granite terrace.
  - Pumice substrate and granular drainage (no plastic board).
  - No spray foam, no XPS.
  - No aluminium in the sill.
  - HDPE for most pipes.
  - Herbicide-free cap.
- **Held back:**
  - Three swaps moved carbon the wrong way without being weighed: the steel lintel, the PU course and stainless proliferation.
  - The flagship glass make-up is not buildable at this size.
  - B4 (≈ 30 % of A1–A3) is still hidden.
  - T and H intensities mislead.
  - PVC remains.
  - The frame product does not exist as specified in BC (N11).

---

## 2. Quantity and factor audit (task item 1)

### 2.1 Items checked by hand

| item | spec (v2) | hand check | verdict | corrected |
|---|---|---|---|---|
| **Stainless factor** | 2.9 "09 all-grade [S2]" (Wikipedia via 09) | Outokumpu cold-rolled austenitic EPD (304/304L/316L), EPD-IES-0017264: **1,830 kgCO2e/t fossil A1–A3** (S). Outokumpu: European average **2.8**, global average **7 kgCO2e/kg** (S2). Grade 316 carries more Ni and Mo than 304 [I] | 2.9 is only valid for an EU or EPD-backed mill. A grate or pan of unstated origin is likely 4–7 | `stainless` **5.0** generic; `stainless-epd` **2.2** when specified (§2.2) |
| **Main grate** `grate` | fill 0.35 on 134 × 20 → 7.5 kg/m | Stainless HeelSafe A15 grate, 135 wide: **3.02 kg per 998 mm** (S2, retailer data for ACO-type DN100) | 2.5× too heavy | `fill: 0.14` (or `m3PerMetre: 0.000375`) → 3.0 kg/m |
| **Rill grate** `rill-grate` | fill 0.35, 170 × 20 × 3.23 m per opening → 30.7 kg = 9.5 kg per m of rill | as above, scaled to 170 wide ≈ 3.8 kg/m | 2.5× too heavy | `fill: 0.14`, then P1 (granite lids) |
| **Rails, pan, screens** | 0.24 + 1.85 + 0.61 + 0.49 + 0.38 + 0.24 kg/m | geometry correct (0.8 welded pan, 1.5 seat) | OK | factor only |
| **Door hardware** | 20 kg per opening, priced as fibreglass-equivalent at 2.9/4.16 | 20 kg is plausible for lift gear, rollers and handle [I] | Wrong place: it does not follow the stainless factor | split into `door-hardware` (stainless) |
| **Fibreglass frame `fill`** | 0.3 on gross boxes (sash, sash-top, head-track, track); verticals 3 × 2.7 m × 0.007 × 0.3 | Window pultrusions: 2.5–3 mm walls plus webs → fill **0.17–0.2** [I]. An OX lift-and-slide has **6 verticals** (2 jambs, 4 stiles; Cascadia interlock 202 wide, 11 §2.2 S). Cascadia frame: 84.91 kgCO2e/m² of window at 5.67 m of lineal/m² → **≈ 15 kgCO2e per m of profile, all-in** (S, UBC-FEN Table 1; per-profile division [I]). The door has 7.4 m of profile per m of opening → ≈ 110 all-in | The fill is too high and the verticals too few; the two roughly cancel. The frame total (93 + 5.5 gaskets) may be 10–30 low against Cascadia | horizontals `fill 0.2` (track keeps 0.3); `door-verticals` 6 members at 0.2; add gaskets. Replace everything with the maker's EPD (N11) |
| **Fibreglass factor** | 4.16 (Wagners GFRP, Australia) | No North American lineal EPD found. Cascadia publishes fenestration EPDs under the 2023 PCR (S2) | Keep as proxy | — |
| **IGU per kg** | 1.8 /kg × (4 + 1.3 + 4) mm, full width | Per m², 4/12/4/12/4 IGUs: Pilkington 47.8 (2023, EPD-IES-0002592) and 40.4 (2017); Saint-Gobain Climatop 4-14-4-14-4: 49.6 (S2) → 1.35–1.65/kg on EU float. Adding the North American float premium (NGA 1.43, S2) and tempering of two lites gives ≈ 1.75 [I] | **The factor is fine.** On a per-m² basis the thin triple comes to ≈ 42 kg/m², the same as 1.8 × 23.25 [I]. The problems are **mass** (N2) and **fill** | `igu-triple` stays 1.8; panes `fill 0.92`; `glass-2` t 4 unless a supplier confirms 1.3 at size |
| **Steel W250x39** | drawn 128 × 252, tf 12.5 → 36.5 kg/m; counted over 4.8 m | CISC W250x39 = **39 kg/m** by designation. Bearing ≈ 150 each end → 5.1 m per 4.8 m opening; end plates and clips +4 % [I] → **43.1 kg/m** | −15 % mass | `m3PerMetre: 0.00549` |
| **Steel factor** | 1.22 "AISC 2021 … verify" | Buy Clean California hot-rolled sections: **1.01 mill-gate, 1.22 including US-average fabrication** (AISC/STI quick guide 2022, S2). The AISC fabricated-sections EPD was reissued 31 Mar 2021 for 5 years, so it is **now expired** (S2). The mills are US EAF (Nucor, SDI, Gerdau). An imported BOF section would be 2.0–2.5 [I] | Factor OK for US EAF; tag as expired | keep 1.22, add the provenance |
| **PU course** | 251 × 100, 320 kg/m³, 4.0 → 8.0 kg/m, 32.1 | Armatherm 500 **EPD exists**: EPD-IES-0026744, EN 15804+A2, USA, valid to 14 Nov 2030 (S, listing; values not retrievable: download blocked). Grades (S2): UK BBA 500-250/320/490 kg/m³, λ 0.045/0.054/0.078, fck 4.3/6.3/13.3 MPa; US 500-080/150/200/280, CS 210/560/1100/2150 psi (1.45/3.9/7.6/14.8 MPa), λ 0.0375/0.046/0.056/0.076. The lowest grade ≈ 160 kg/m³ (older UK sheet: 2.0 MPa, λ 0.031) [S2/I]. 320 matches the "6.3 MPa" grade | **Density and λ are consistent with grade 320**, but that grade is about 4× stronger than the track needs [I: lift-slide sash ≤ 400 kg on 2 carriages, spread by track and grout → < 0.3 MPa]. 4.0/kg is reasonable for rigid PU [I] | keep for the corrected run; paste the EPD value when obtained; P5 |
| **Polymer concrete** | `channel` 10 mm walls → 6.5 kg/m at 0.555 | ACO EPD factor 0.555/kg is right (18.8 per 33.9 kg/rm, S). A shallow 100–150-class channel weighs **≈ 15 kg/m** [I: 15 mm walls, 20 mm invert → 6,100 mm²] | Mass about half | `m3PerMetre: 0.00652`, or redraw 15/20 walls. Rill walls and floor are also thin (13.5 kg/m vs ≈ 20–25; +2, not in the corrected run) |
| **SBS** | 0.75 "ARMA 5.8 kg/m² [SN]" | North American EPDs (S2, One Click LCA listings of ASTM EPDs): Holcim SBS Hot Torch FR, **EPD-906**, 7.11 kgCO2e/m² at 4.98 kg/m² = **1.43/kg**; GAF Ruberoid Energy Cap 5.88 at 4.78 = **1.23/kg**. EU: Soprema 0.75/kg; BMI base 0.67/kg | 0.75 is the EU low end; BC supply is North American | `sbs` **1.3** |
| **Head tape** | `membrane-poly` 940 kg/m³ × 170 × 12 → 4.8 | Pre-compressed PU foam tape at about 200 kg/m³ installed [I] | 3× too high | new `pu-foam-tape` → 1.6 |
| **T zone 427 kg/m²** | 282.2 ÷ 0.66 m plan depth | A 2.7 m-tall door divided by a 0.66 m plan strip | **meaningless** (and H's 285 likewise) | report D per m² of elevation (91), T and H per m of opening (N5) |

### 2.2 Ready-to-paste `materials.json` entries

```json
 "stainless": { "density": 8000, "a1a3": 5.0, "k": 16,
  "src": "INFERRED generic austenitic 304/316 of unstated origin: midpoint of European average 2.8 kgCO2/kg (Outokumpu 2023, S2) and global average 7 kgCO2e/kg (Outokumpu citing CRU/worldstainless 2023-24, S2); range 1.8-7; fabrication excluded. Use stainless-epd when the spec names an EPD-backed mill" },
 "stainless-epd": { "density": 7900, "a1a3": 2.2, "k": 16, "rsl": 100,
  "src": "SOURCED Outokumpu cold-rolled austenitic (304/304L/304LN/321/316L) EPD-IES-0017264 (EN 15804+A2, 7 Nov 2024 - 7 Nov 2029): GWP-fossil A1-A3 1,830 kgCO2e/t (total 1,870), D -113; mills Tornio, Avesta, Krefeld, Calvert AL. https://www.outokumpu.com/en/sustainability/sustainable-stainless-steel/epds ; + ~0.35 cutting, welding, pickling [I]" },
 "sbs": { "density": 1100, "a1a3": 1.3, "k": 0.2, "rsl": 35,
  "src": "S2 (One Click LCA listings of ASTM EPDs): Holcim SBS Hot Torch FR EPD-906 (2025) 7.11 kgCO2e/m2 at 4.98 kg/m2 = 1.43/kg; GAF Ruberoid Energy Cap HW 5.88 at 4.78 kg/m2 = 1.23/kg; EU Soprema 0.75, BMI base 0.67/kg. North American supply -> 1.3 [I]" },
 "epdm": { "density": 1150, "a1a3": 3.0, "k": 0.25, "rsl": 45,
  "src": "S2 (One Click LCA listing): Holcim/Firestone RubberGard 60 mil non-reinforced EPDM, ASTM EPD-900: 4.69 kgCO2e/m2 at 1.37 mm (~1.58 kg/m2) = 3.0/kg; 45 mil 3.48, 90 mil 6.85 /m2. Carlisle Sure-Seal TDS is in the RCABC RPM (S2). FLL root resistance: check the product certificate" },
 "igu-triple": { "density": 2500, "a1a3": 1.8, "k": 1.0, "rsl": 30,
  "src": "INFERRED per kg of glass, triple tempered low-e argon: Pilkington Insulight Triple 4/12/4/12/4 EPD-IES-0002592 47.8 kgCO2e/m2 (2023) and ift 2017 40.4; Saint-Gobain Climatop 4-14-4-14-4 49.6 (S2, One Click LCA) = 1.35-1.65/kg on EU float; + North American float (NGA 1,430 kg/t, S2, expired Dec 2024; Vitro 2023 1,350) and tempering of two lites -> 1.8. Valid for 4/4/4 to 6/4/6; thin-centre triples keep ~6-8 kg/m2 of fixed per-m2 items" },
 "steel-section": { "density": 7850, "a1a3": 1.22, "k": 50,
  "src": "S2: Buy Clean California hot-rolled sections GWP limit 1.01 mill gate / 1.22 incl. US-average fabrication (AISC/STI/CRSI/AISI quick guide, 8 Mar 2022) = AISC fabricated hot-rolled sections industry EPD (31 Mar 2021, 5 yr: EXPIRED); US EAF mills (Nucor, SDI, Gerdau). Imported BOF sections 2.0-2.5 [I]" },
 "steel-reclaimed": { "density": 7850, "a1a3": 0.1, "k": 50,
  "src": "INFERRED from S2: EMR reusable structural steel EPD 46.6 kgCO2e/t A1-A3 (2022); Cleveland Steel & Tubes recovered I-beam EPD 69.8 kgCO2e/t (A1 = 0 by cut-off); + BC re-fabrication, testing and haul -> 0.1. Grade/test per IStructE 'Reusing structural steel' guide (2023)" },
 "pu-structural": { "density": 320, "a1a3": 4.0, "k": 0.054,
  "src": "INFERRED 4.0/kg rigid PU. Armatherm 500 EPD EPD-IES-0026744 (EN 15804+A2, USA, 14 Nov 2025 - 14 Nov 2030) exists - paste its A1-A3 value. Grade 500-320: BBA fck 6.3 MPa, lambda 0.054 (S2)" },
 "pu-structural-160": { "density": 160, "a1a3": 4.0, "k": 0.0375,
  "src": "Armatherm 500-080 class: CS 210 psi = 1.45 MPa, lambda 0.26 Btu-in = 0.0375 (US data sheet V3, S2); ~160 kg/m3 (older UK sheet lowest grade: 2.0 MPa, lambda 0.031) [S2/I]. Engineer to confirm long-term stress and creep under the track" },
 "pu-foam-tape": { "density": 200, "a1a3": 4.0, "k": 0.05, "rsl": 25,
  "src": "INFERRED: pre-compressed acrylic-impregnated PU foam tape, ~60 kg/m3 foam at 3-4x compression; factor as rigid PU" },
 "fibreglass": { "density": 1900, "a1a3": 4.16, "k": 0.3,
  "src": "SOURCED Wagners pultruded GFRP EPD S-P-10246 (proxy, Australian grid): 16.3 kgCO2e/m at 3.92 kg/m. Cross-check: Cascadia (Langley BC) fibreglass frame 84.91 kgCO2e per m2 of window with 5.67 m of lineal per m2 (UBC SEEDS 2022-018, Zargar, TRACI; incl. paint, gaskets, foam, shear blocks, energy) = ~15 kgCO2e per m of profile all-in [S/I]. Replace with the door maker's EPD" }
```

`concrete-paver`: keep 0.15, but append to `src`: "The spec's 'low-carbon' label is not reflected here; replace with the supplier's EPD (Abbotsford Concrete Products, Mutual Materials) before claiming it."

---

## 3. New findings (task items 1 and 5)

**N1. MAJOR — Stainless: the factor is low for a generic origin, the grates are 2.5× too heavy, and stainless has spread.** Accounted: 57 → **77** corrected. This is 11 % of the total, almost all of it avoidable.
- **Parts:**
  - `grate`, `rill-grate`, `gr-edge-profile`, `pan`, `pan-back`, `grate-seat`, `grate-screen`, `track-rails`, `band-vent`, `band-screen`;
  - the hardware inside `door-verticals`.
- **Exact fix (accounting):**
  - Paste `stainless` 5.0 and `stainless-epd` 2.2.
  - `grate`: `fill: 0.14`. `rill-grate`: `fill: 0.14`.
  - Split hardware out of `door-verticals`: `{ id: "door-hardware", junction: "D", mat: "stainless", type: "virtual", m3PerMetre: 20/8000/4.8 }`.
- **Design fixes:** P1 in §4.
- **Durability:** the threshold grate sits under the overhang (x −31 to −165, tip at −650), so rain will not wash it. Within sight of salt water, 316 tea-stains in sheltered spots. Specify an **electropolished** finish and a liftable grate for washing [I].

**N2. MAJOR — The thin-glass triple (4 / 1.3 / 4) is not buildable at this pane size; the glass is also counted through the stiles.** +20.1.
- **Size limits.** Cardinal's IG23 (Apr 2024) size bulletin starts at **2.2 mm**. It limits 2.2 mm annealed lites in double or triple units to **10 ft² (0.93 m²), 24 in. max length** (S2). It lists no 1.3 mm row at all. One sash pane here is ≈ 2.4 × 2.57 m = **6.2 m²** (67 ft²).
- **Safety and testing.** Impact testing of thin glass to ANSI Z97.1 "may not be possible" (S2). Thin-centre triples are a renovation product today.
- **My error.** Lap-1 D1 should not have been offered without a size check.
- **Exact fix:**
  - `glass-2`: `t` 1.3 → **4** (name "IGU centre lite 4 mm"), unless a supplier confirms a thin lite at size in writing.
  - `glass-1..3`: `fill: 0.92` (glass net of stiles and interlock: Cascadia interlock 202 (S); jambs ≈ 80 each [I]).
- **Effect:** IGU 107.6 → **127.7**.
- **Note:** the wind-load glass check is R1's. If the outer lites must go to 5 or 6 mm, add +11 to +21 per mm pair [I].

**N3. MAJOR — Steel lintel: carbon cost undisclosed, and the mass is under-drawn.** +8.1 accounting. +38 to +48 avoidable (P2).
- **Part:** `lintel`.
- **Accounting fix:** `m3PerMetre: 0.00549` (39 kg/m × 5.1/4.8 × 1.04). A W250x39 drawn at 128 × 252 is lighter than the real section.
- **Design:** P2.

**N4. MAJOR — The SBS factor is the European low end.** +19.5.
- **Parts:** `membrane-roof`, `avb`.
- **Fix:** `sbs` 1.3 (§2.2), or the chosen product's EPD.

**N5. MAJOR (method) — The T and H intensities (427 and 285 kg/m²) are not intensities.** `metrics.mjs` divides a 2.7 m-tall door by a plan depth.
- **Exact fix:**
  - Add junction **`D`** (door unit) for `glass-1..3`, `sash`, `sash-top`, `head-track`, `track`, `track-rails`, `nosing`, `door-verticals`, `door-hardware`, `door-gaskets`.
  - Zones:
    - `D: { label: "door unit", height_m: 2.73 }` → kgCO2e per m² of **elevation**;
    - `T` and `H`: `{ perOpening: true }` → print "per m of opening" and no m² value.
- **Corrected readout:** D **91 /m² of door**, T **98.5 /m**, H **67.3 /m** (Headline).
- **Also:**
  - Print "A1–A3 only; B4 excluded" under the total.
  - Name the strip extents ("interior to 2.5 m, garden to −8 m").
  - Name the spec file with its version: the `metrics.md` header says `detail02.json`.

**N6. MAJOR — The PU course is over-specified.** 32.1, the 7th-largest item.
- **Part:** `course`.
- **Problem:** the 320 kg/m³ grade (fck 6.3 MPa) carries a lift-and-slide track. Its service stress is well under 1 MPa [I].
- **Missing number:** Armatherm 500 has a valid EPD (EPD-IES-0026744). Its value has not been pasted.
- **Exact fix:**
  - `mat: "pu-structural-160"` (Armatherm 500-080 class: 1.45 MPa, λ 0.0375), engineer to confirm creep.
  - Or the 500-150 class (≈ 250 kg/m³, 3.9 MPa, λ 0.046): −7.
- **Effect:** **−16.0**, and the course RSI rises from 1.85 to 2.67, a better threshold fRsi. Look unchanged. This is P5.

**N7. MINOR — The polymer-concrete channel is half its mass.** +4.7.
- **Part:** `channel`.
- **Fix:** `m3PerMetre: 0.00652`, or redraw with 15 mm walls and a 20 mm invert.
- **Also:** the channel runs "full opening width + 150 each side" (×1.06, +0.5). The rill walls and floor are similarly thin (+2).

**N8. MINOR — The frame is structured wrongly, though the net is ≈ 0.**
- **Problem:** see §2.1. A reviewer who fixes the fill without the verticals, or the reverse, will move the total by ±20.
- **Exact fix:**
  - `sash`, `sash-top`, `head-track`: `fill: 0.2`.
  - `door-verticals`: `m3PerMetre: (6*2.7*0.007*0.2)/4.8` (= 0.004725), fibreglass only.
  - Add `{ id: "door-gaskets", junction: "D", mat: "epdm", type: "virtual", m3PerMetre: 7.3*0.25/1150, rsl: 20 }` (0.25 kg/m of EPDM over 7.3 m of profile per m [I]).
- **Net:** −1.9.

**N9. MAJOR — B4 is still hidden.** Lap-1 finding 18 is not fixed. Over the 60-year study period (CoV/NRC):
- IGU × 1: +128 (seal life 25–35 years).
- SBS under the green roof × 1: +33.
- Lift-slide gear × 1: +21.
- Gaskets × 2: +11.
- Sealants and tape × 2: +7.
- Cedar oil, B2 (09 E-WRC 5.56/m² per cycle, S): +12.
- Rain-garden top 100 mm: +3.
- **Total ≈ +214**, which is **+30 % on A1–A3**.
- **Exact fix:**
  - Add `rsl` to `materials.json` (values in §2.2: igu 30, sbs 35, epdm 45, pu-foam-tape 25; gaskets and hardware set at part level, 20 and 25).
  - In `metrics.mjs`'s row loop add:
    `const rsl = p.rsl ?? m.rsl ?? 100; const b4 = kg * m.a1a3 * Math.max(0, Math.ceil(60 / rsl) - 1);`
  - Print a "60-yr (A1–A3 + B4)" total beside A1–A3.
- **Biggest lever:** dry-glazed IGUs behind removable stops (lap-1 D3, not adopted). They do not change the number, but they make the year-30 event a one-hour repair instead of a sash replacement.

**N10. MINOR — Green-roof filter and protection fabrics are missing.** +2.7.
- **Problem:** FLL needs a filter fleece between the substrate and the pumice drainage layer, and a protection fleece on the membrane.
- **Fix:** add `{ id: "gr-fabrics", junction: "R", mat: "geotextile-pp", type: "virtual", m3PerMetre: 2.6*0.45/910 }` (≈ 150 + 300 g/m² over 2.6 m).

**N11. MAJOR (procurement, health) — The specified product, a "fibreglass lift-and-slide", was not found in BC.**
- **What 11 §2.3 found:**
  - Cascadia's Slider PH (Langley) is "not stated as lift-and-slide" (S).
  - The only BC-made, PH-certified lift-and-slide is **Westeck PH Vinyl L&S** (Chilliwack): a **PVC** frame, PU-filled, with fibreglass reinforcement (S).
- **Risk:** if the build falls back to Westeck, the frame becomes a Red List material (PVC) and the carbon changes.
- **Exact fix:**
  - Name the product (or two) before lap 3.
  - Require a product EPD (Cascadia already publishes fenestration EPDs under the 2023 PCR, S2).
  - Require dry-glazed IGUs.
  - If no fibreglass lift-and-slide exists, choose between a Cascadia non-lift PH slider and a PH-certified wood-aluminium lift-and-slide (§4.7) on evidence.

**N12. MINOR (health) — PVC remains:** `perim-drain` (new in v2), `rg-riser`, `track-weeps`.
- **Fix:**
  - `perim-drain`: `mat: "hdpe"`, `m3PerMetre: 0.5/950` (corrugated perforated HDPE, the BC norm for foundation drains [I]).
  - `rg-riser`: `mat: "hdpe"`.
  - `track-weeps`: `mat: "hdpe"`.
- **Effect:** −3.7. Removes the last Red List PVC.

**N13. MINOR — The pocket is still counted as terrace and restraint.**
- **Parts:** `pavers-2`, `bedding-2`, `base-2`, `edge-restraint` use `runs: TER` (one run → share 1). The pocket takes 1.1 m of each 4.8 m opening.
- **Fix:** add `fill: 0.77` to the four parts.
- **Effect:** −3. Not in the corrected run.
- **Also:** the rain garden is still priced as continuous along the façade (lap-1 finding 9). If it is shorter in plan, list its length in `zones`.

**N14. MINOR — PT lumber has spread** to 7 parts: `packer`, `band-strap`, `band-closure`, `soffit-furring`, `sub-fascia`, `edge-nailer`, `cant`.
- **Fix:** `softwood-lumber` (kiln-dried, untreated) for the parts that are dry and inside or sheltered:
  - `packer`: interior, inside the air barrier;
  - `soffit-furring`;
  - `band-closure`.
- Keep PT only where the wood is under the membrane or touches concrete.
- **Effect:** carbon −0.3; the wood stays chippable or burnable at end of life.

**N15. MINOR (end of life) — The grout bed and mortar wedge lock the track and pan in.** `grout`, `wedge`.
- **Problem:** replacing the frame at about 50 years means breaking out grout over a welded pan.
- **Fix:** bed the track on a continuous **structural PU or FRP shim bar**, mechanically anchored with sealant beads, instead of grout. Keep the wedge only under the pan.
- **Check:** R1 to confirm that bearing and ±1 mm level hold.

---

## 4. Proposals: biggest reductions that keep the look and performance (task item 3)

Each Δ is against the corrected **720**. Together they give **535 (glulam route)** or **525 (reclaimed-steel route)**, −26 to −27 %. Biogenic is 216 with the glulam.

| # | move | Δ kgCO2e/m | look | performance |
|---|---|---|---|---|
| **P1** | Stainless package: granite rill lids, granite edge setts, EPD-backed stainless | **−51.8** | better: one stone language, no bright strip across the terrace (R5 F10) | same; heel-safe kept |
| **P2** | Lintel: reclaimed W-section, or a flush glulam header | **−48.2** / **−38.5** | identical | same; glulam improves head RSI |
| **P3** | One-stone ground: reclaimed granite landing, edge restraint and pocket curbs | **−43.1** | better: one surface instead of two specs (R3 F15) | same; flamed BPN ≥ 55, joints ≤ 6 |
| **P4** | Roof: loose-laid EPDM ballasted by the green roof, no cover board, 1 mm SA AVB | **−32.1** | invisible | same or better: biocide-free root resistance, separable |
| **P5** | PU course grade 500-080 class | **−16.0** | invisible | better: RSI +0.8 at the sill |
| **P6** | PVC out | −3.7 | invisible | same |
| **Total (with interactions)** | | **−185 (glulam) / −195 (steel)** | | |

### P1. Stainless package (−51.8): 77 → 25

- **(a) Rill cover.**
  - Replace the 3.23 m stainless grate with **sawn reclaimed granite lids**, 60 × 190 × 450, with **8 mm open cross-joints**.
  - Cross-joints are perpendicular to travel and ≤ 13 mm, so they meet B651 4.3.4.
  - Keep a **0.45 m** stainless grate only where the rain chain lands.
  - The rill is a conveyance from the channel to the runnel. The landing drains through its own lined base and underdrain, so the rill needs no inlet along its length [I].
  - Lids weigh about 13 kg each, so one person can lift them for cleaning.
  - Spec:
    - `rill-grate`: `fill: 0.14*0.45/3.23`.
    - Add `{ id: "rill-lids", junction: "J", type: "virtual", mat: "reclaimed-stone", m3PerMetre: 2.78*0.19*0.06/4.8 }` (already per opening), or draw the lids with `per: "opening"`.
    - Lower the rill wall tops by 40.
  - Effect: −10.8.
- **(b) Green-roof edge.**
  - Replace the 1.5 mm stainless profile (`gr-edge-profile`) with **reclaimed granite setts set on edge**, 100 × 100, as the vegetation-free-zone border, over the filter fleece [I; FLL accepts kerbs or setts as the separating element].
  - Effect: −9.2.
- **(c) EPD-backed stainless.** For everything that stays (pan, threshold grate, rails, screens, gear):
  - The spec requires a mill EPD of ≤ 2.0 kgCO2e/kg at coil (Outokumpu or Aperam class).
  - Spec: `mat: "stainless-epd"`.
  - Effect: −31.8 (the remaining mass is ≈ 11.5 kg/m).
- **Look:** the bright line across the terrace in `exterior-eye.png` becomes a granite band with a fine joint rhythm. Only the threshold grate stays metal, and it should be electropolished or dark.

### P2. Lintel (−48.2 or −38.5)

- **Route A, reclaimed W-section (preferred: zero design change).**
  - `lintel`: `mat: "steel-reclaimed"`.
  - Specify a salvaged W-section with Ix ≥ W250x39 (W250x39–45, or W310x33 if the band can take +51), graded and tested per the IStructE reuse guide.
  - Fallback: new US-EAF steel with a plant EPD ≤ 1.0 at mill gate.
  - Use bolted connections, so the beam can be reused again.
  - Effect: −48.2.
  - Supply in Metro Vancouver is plausible from used-steel yards but is not verified [I]. Name a source before lap 3.
- **Route B, flush glulam 175 × 494, steel-free.**
  - Run it from 2742.5 to 3236.5, inside the existing zone between the head gap and the joist top. It needs **no packer** (glulam takes fixings), and it **adds 0 to the band**, unlike the 190 in R1 F7.
  - Joists hang on face-mount hangers (12 per opening, ≈ 0.6 kg each).
  - The overhang tails become **tapered lookouts** screwed to the glulam's outer face. Each carries M ≈ 0.3 kN·m [I: (1.8 snow + 0.5 dead) kPa × 0.4 m × 0.65²/2, plus gutter water]. That is within two inclined fully threaded screws [I; engineer].
  - 175 × 494 has about 27 % more stiffness than the 175 × 456 R1 already accepted for ≤ 3 mm including creep.
  - Spec:
    - `lintel`: `mat: "glulam"`, `m3PerMetre: 0.175*0.494*5.1/4.8`.
    - Remove `packer`, `lintel-infill`, `lintel-infill-2`.
    - Add `hangers` (`steel-prefinished`, 1.5 kg/m).
  - Effect: −38.5; biogenic +72 (long-cycle, reported separately).
  - Head RSI rises, because the 10 % steel flange path goes.
  - Kalesnikoff glulam (South Slocan BC, EPD 296) is local.

### P3. One-stone ground (−43.1)

- **Changes:**
  - `pavers-lined`: `mat: "reclaimed-stone"`, as **sawn, flamed reclaimed granite planks 60**, sawn to ±1 mm, joints ≤ 6, BPN ≥ 55 wet.
  - `edge-restraint`, `pocket-curb`, `pocket-curb-w`: `mat: "reclaimed-stone"`, as **salvaged granite curb**.
- **Why:** salvaged curb is already about 150 × 300, the restraint's size [I]. Vancouver-area street works produce granite curb [I; supply to be confirmed].
- **Look:** the landing and terrace read as one warm-grey stone field, which settles R3 F15 and R5 F9.
- **Performance:**
  - Granite lasts more than 100 years and is relayable.
  - It needs no sealer.
  - It avoids the 40-year replacement of concrete planks.

### P4. Roof membrane (−32.1)

- **Changes:**
  - `membrane-roof` → **1.5 mm EPDM, loose-laid and ballasted by the green roof** (`mat: "epdm"`, `m3PerMetre: 3.28*1.58/1150`), adhered only at the edges and the overhang.
  - Delete `coverboard`. Loose-laid EPDM over faced polyiso needs no cover board; the protection fleece is in `gr-fabrics`.
  - `avb` → a 1 mm self-adhered AVB (`m3PerMetre: 3.13*1.1/1100`).
- **Why:**
  - EPDM is root-resistant by its chemistry. It needs **no herbicide and no copper**, which matters because the roof drains to the rain garden.
  - Its life is 40–50 years, against 30–40 for SBS.
  - It and the polyiso below can be lifted and reused at re-roofing.
  - It is in the RCABC Roofing Practices Manual (Carlisle Sure-Seal TDS hosted there, S2).
- **Check:** FLL certificate; seam tape; edge securement at the gravel strip.

### P5. Thermal-break course (−16.0)

- Spec: `course`: `mat: "pu-structural-160"`.
- Paste the Armatherm EPD value when it is obtained.
- The R1 and R2 engineer confirms creep.

### P6. PVC out (−3.7). See N12.

### P7. Considered and quantified, but not in the total

| move | Δ | why not now |
|---|---|---|
| Direct-glaze the fixed panel of the OX pair (no sash: −2 stiles, −2 rails, −1 set of gear) | **−20 to −30** [I] | Strong candidate. Needs a matching sightline profile from the maker, or the fixed panel reads thinner. Also cuts frame U and seals |
| Wood-aluminium PH lift-and-slide instead of fibreglass (ENERsign Primus class, phB 0.60 at 4.5 × 2.8 m, S2) | frame ≈ −24 to −49 [I: ≈ 3.5–7.4 kgCO2e/m of profile vs 11–15] but **+≈ 16 A4** shipping glazed units from the EU | Net −8 to −33 with high uncertainty. A North American clad-wood frame (Loewen) fails USI 1.22 with its common triple (11 §2.3, S), and ΔU 0.35 × 60 years ≈ 43 kgCO2e/m on BC Hydro [I]. Choose on two EPDs, not on a guess |
| Vacuum IGU, hybrid or tempered VIG (≈ −33 % glass mass) | −25 to −40 [I] | Not proven at 6.2 m² in a lift-and-slide sash. Revisit at lap 5 |
| Thin centre lite, if a supplier confirms the size | −29.5 | See N2 |
| Polyiso trimmed from RSI 7.7 to ≈ 5.5 | −9 to −14 | All-electric on BC Hydro pays back in about 200 years; on gas, about 4. Performance is the user's priority, so keep it |
| Heidelberg 91-day mix (90 kg/m³, S2) for the slab | −4.6 | Needs the engineer's acceptance. The slab is already in 12's recommended band (18 /m²) |
| Floor EPS 100 → 75, head stone wool 130 → 90 | −2.7, −1.5 | RSI margin is comfort at the glass; not worth it |
| Earthen floor or suspended timber floor | — | 12 §4.5–4.6 already rejects both at a flush threshold |

### 4.8 Material health (task item 4)

| item / part | concern | recommendation |
|---|---|---|
| PVC: `perim-drain`, `rg-riser`, `track-weeps` (and a Westeck PVC fallback frame, N11) | **LBC Red List** (PVC). Phthalate and organotin stabilisers in some imports | HDPE or PP (N12). Name the frame product |
| Polyiso `roofins-*` | TCPP (halogenated flame retardant: Red List class) | Keep for carbon per RSI. Ask for a Declare/HPD; loose-lay it so it can be reused (P4) |
| Graphite EPS `eps-*`, `beam-insul` | Polymeric brominated FR (Red List HFR class; HBCD phased out) | Accept; below grade or under the slab, no indoor exposure |
| PU course `course` | MDI-based thermoset; FR content unknown | Read the EPD and ask for an HPD. Lower-density grade (P5) |
| **Root-resistant cap** `membrane-roof` | "Herbicide-free" is necessary but not enough. Some FLL caps get root resistance from mecoprop-type esters, others from **copper foil or copper compounds**. Copper at 0–20 µg/L impairs salmon olfaction (09 §8, SN), and this roof drains to the rain garden | EPDM (P4), or an SBS cap that is root-resistant by a **physical** polyester/PE layer, with a safety data sheet showing no biocide and no copper |
| Root barriers `root-barrier-pocket`, `-path` | Ribbed HDPE is physical: good. Avoid "chemical" barriers (trifluralin-releasing) and copper-hydroxide-coated geotextiles | Keep HDPE; state "physical only, no biocide" in the note |
| **Prefinished steel** (`box-gutter`, `gutter-skirt`, `edge-metal`, `head-flashing`) | Charcoal coil is usually **PVDF**, a fluoropolymer and so a PFAS by the OECD definition (manufacture and end of life) [I] | Specify **SMP or HDP polyester** on AZ (Al-Zn) coated steel, PFAS-free (Declare or HPD). Not zinc or copper: runoff goes to the rain garden |
| Vapour-open membranes, flashing tapes, the bird-marker film on #1 | Some carry fluorinated water-repellent finishes. Applied marker films can be PVC | Ask for PFAS-free declarations. Bird markers by **acid-etch or ceramic frit** (permanent, no film) |
| Sealants `edge-seal`, `head-airseal` | MS-polymer sealants often use organotin catalysts; "mildew-resistant" grades add biocides | Tin-free MS or butyl; no biocide grades in the rain-garden catchment |
| Stone wool (`band-ei`, `ei-top`, `lintel-infill*`, `bay-insul`) | Cured phenol-formaldehyde binder (Red List "added formaldehyde" unless exempt) | Outside the air barrier except `bay-insul` and the infills. Check the ROCKWOOL Declare label |
| PT lumber (7 parts) | Copper (MCA) leaching; blocks chipping or burning at end of life | Untreated where dry (N14) |
| Cedar oil, honey soffit | VOCs | Low-VOC linseed-based oil |
| Stainless, cellular glass, granite, HDPE liner, cork | Inert | Good |

### 4.9 End of life and disassembly

| element | as drawn | end-of-life route | design change |
|---|---|---|---|
| IGU | sealed in sash (glazing method not stated) | coated and laminated cullet is downcycled | **Dry-glazed behind removable stops** (lap-1 D3); glazier take-back |
| Fibreglass frame | thermoset | landfill or cement kiln | Accept with an EPD. Or a wood-aluminium frame (separable Al recyclable, wood recoverable), §4.7 |
| Track and pan | grout bed + mortar wedge + welded pan | broken out at frame replacement | Shim bar, no grout (N15). The stainless pan is then reusable |
| PU course | thermoset | landfill | Accept; it outlives the door |
| Lintel | steel, bolted / glulam | reuse (both) | Bolted connections, no site welding |
| Roof | SBS adhered to gypsum cover board | landfill | **Loose-laid EPDM + polyiso** (P4): both recoverable |
| Paving | unbound on open-graded base | relay or reuse | All granite (P3): lasts more than 100 years |
| Rill | polymer concrete + stainless grate | crushed fill + scrap | Granite lids (P1); the body stays |
| Liner, root barriers | HDPE, welded | recoverable | — |
| Soils, aggregates | unbound | reuse on site | — |
| Wood framing | partly PT | untreated: chip or burn; PT: special waste | N14 |

### 4.10 Durability against the 0 / 5 / 15 / 30-year view (INFERRED unless noted)

| item | year 0 | year 5 | year 15 | year 30 |
|---|---|---|---|---|
| Door: IGU, gaskets, gear | crisp | — | gaskets, rollers and seals serviced; argon down ≈ 10–15 % | **IGU seal end of life (25–35 yr)**: replace all panes (+128). Dry glazing makes this a repair |
| Fibreglass frame finish | factory urethane | — | possible chalking on the west face; repaint | sound (50+ yr) |
| Threshold grate (316, sheltered) | bright line (R5 F10) | **tea-staining** unless electropolished and washed | — | sound |
| Rill: stainless grate → granite lids (P1) | metal stripe → stone band | lids weather with the terrace | relay lids | unchanged |
| Landing: concrete planks → granite (P3) | uniform | concrete: efflorescence, soiling; granite: patina | concrete: exposed aggregate, resetting | concrete: likely replacement (+36); granite: unchanged |
| Cedar band (sheltered) and honey soffit | warm | **uneven silvering** (band under the overhang) | re-oil soffit; band course replaceable | band renewed (cheap, one course) |
| Box gutter coating | charcoal | — | SMP or HDP: slight fade (PVDF less) | recoat or replace with the membrane |
| Roof membrane | — | — | — | **SBS at end of life (30–40 yr)**: strip the green roof (+33); EPDM 40–50 yr |
| Green roof | establishing | full cover | stable (pumice does not break down) | substrate reused at re-roofing |
| Rain garden | — | mulch top-ups | silting ≈ 3 mm/yr (08, S) | top 100 mm renewed |
| Concealed: PU course, pan, beam | — | — | — | sound; only reached at frame replacement (N15) |

### 4.11 BC sourcing

| status | items |
|---|---|
| **Local** | glulam (Kalesnikoff); lumber, plywood, cedar; stone wool (Grand Forks); EPS; ready-mix; aggregates and pumice (BC, SN); concrete planks (Abbotsford/Langley); reclaimed granite (Lower Mainland, to be confirmed) |
| **Imported** | W-section (US EAF mills); stainless (no Canadian mill); Armatherm PU (USA); polymer-concrete channel; SBS or EPDM (US); fibreglass frame of uncertain origin (N11) |
| **Effect of the proposals** | P1 and P3 move about 95 kgCO2e/m of imported metal and cement to local reuse; P2 Route B moves the lintel to a BC glulam with a BC EPD |

**Biogenic:** 144 → 216 with P2 Route B. All of it is long-cycle wood, so it counts as **0** under the CoV Addendum's short-cycle rule (09 §0.2). Report it with that label.

---

## 5. Top 3 changes that would raise the score most

**Score now: 6 / 10.**

**What holds it back:**
- The steel lintel, PU course and stainless swaps were made without a carbon check. They cancel the v2 gains.
- The flagship glass make-up cannot be built at this size.
- The headline is about 8 % low.
- T and H "per m²" figures mislead.
- B4 (+30 %) is hidden.
- PVC remains.
- The frame product is unidentified.

1. **Stainless package (P1) and honest metal accounting (N1)** (+1).
   - Real grate masses.
   - Granite rill lids with a 0.45 m stainless grate at the rain chain.
   - Granite setts at the green-roof edge.
   - EPD-backed stainless (≤ 2.2) for everything left.
   - Effect: **−52** vs corrected, and the terrace loses its bright stripe.
2. **Lintel without new steel (P2)** (+0.5).
   - A reclaimed W-section (**−48**, identical design), or a flush glulam 175 × 494 with hung joists and screwed lookouts (**−39**, +72 biogenic, better head RSI, band depth unchanged).
3. **One-stone ground plus a biocide-free, separable roof (P3 + P4)** (+0.5).
   - Reclaimed granite on the landing, restraint and curbs (**−43**).
   - Loose-laid EPDM ballasted by the green roof, no cover board, light AVB (**−32**).
   - Together they settle the two-paver-spec and root-inhibitor questions.

**Required alongside these: the accounting fixes N2, N5, N9 and N11.**
- 4T/4/4T glass at fill 0.92.
- Door per m² of elevation; T and H per m of opening.
- A 60-year column.
- A named frame product with an EPD.

With the top 3, the score reaches about **7**. With those plus P5, P6 and the accounting fixes it reaches about **8**: **≈ 525–535 kgCO2e/m A1–A3 (−26 %)**, ≈ 720 over 60 years.

---

### Sources read this session

**Read in full (S):**
- Outokumpu, *EPD Cold Rolled Austenitic*, EPD-IES-0017264 (2024–2029): https://www.outokumpu.com/-/media/files/sustainability/epd-cold-rolled-austenitic.pdf (EPD index: https://www.outokumpu.com/en/sustainability/sustainable-stainless-steel/epds)
- Zargar, S. (2022), *Research on the Impacts of Innovative Fenestration Materials*, UBC SEEDS 2022-018 (Cascadia): https://sustain.ubc.ca/sites/default/files/2022-018_Research%20on%20the%20impacts%20of%20Innovative%20Fenestration%20Materials_Zargar.pdf
- Environdec listing, Armatherm 500 EPD-IES-0026744 (valid to 14 Nov 2030; values not retrievable): https://environdec.com/library/epd26744

**Aggregator or search summaries (S2):**
- Outokumpu global average 7 and European average 2.8 kgCO2e/kg: https://www.outokumpu.com/en/expertise/2023/how-heavy-industry-can-benefit-from-product-specific-carbon-footprint
- AISC/STI/CRSI/AISI, *Quick Guide to Buy Clean California's Steel Provisions* (2022): https://www.aisc.org/contentassets/937a380ddd404a2da0c48669d438bf3b/quickguide_buycleancali2022.pdf
- Armatherm 500 Series data sheet V3: https://images.greenbuildingadvisor.com/app/uploads/2025/11/18152051/32402_1763497251_Armatherm_500Series_Data_Sheet_V3.pdf, and UK sheet: https://www.barbourproductsearch.info/Armatherm%20500%20-%20Structural%20Thermal%20Break%20Material-file111695.pdf
- SBS: Holcim EPD-906 via One Click LCA: https://materials.oneclicklca.com/en/material/sbs-modified-bitumen-roofing-membrane-torch-applied/68432b56c6ee4b1007bb9917 (GAF, Soprema and BMI values from the same search)
- EPDM: Holcim/Firestone RubberGard EPD-900/901/903 via One Click LCA (search summary); Carlisle Sure-Seal TDS in the RCABC RPM: https://www.rpm.rcabc.org/images/9/9e/Carlisle_Sure-Seal_non-reinforced_EPDM_TDS.pdf
- Triple IGU EPDs (Pilkington 2017 and 2023, Saint-Gobain Climatop) via One Click LCA: https://materials.oneclicklca.com/en/material/insulating-glass-triple-glazed/5f152fa894068e28b62e8812
- Cardinal IG23 glass size bulletin (Apr 2024): https://www.cardinalcorp.com/wp-content/uploads/2024/04/IG23_04-2024.pdf; LBNL thin-triple guidance (search summary)
- NGA flat glass 1,430 kg/t (expired Dec 2024), Vitro 1,350, GSA limits: https://glass.org/sustainability
- Stainless HeelSafe A15 grate, 135 wide, 3.02 kg/m: https://vodaland.co.uk/products/base-dn100-stainless-steel-heelsafe-grate-a15
- Reused steel EPDs (EMR 46.6 kg/t, CST 69.8 kg/t) and Holbein Gardens: https://istructe.org/journal/volumes/volume-101-(2023)/issue-3/holbein-gardens-low-carbon-reclaimed-steel

**Blocked:** ASTM-hosted Holcim EPD-906 PDF (403); Armatherm EPD download; a Purenit EPD (none found).
