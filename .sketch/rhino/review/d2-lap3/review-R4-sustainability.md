# Detail 02, lap 3 review R4: sustainability and materials

Reviewer: R4 (embodied carbon, material health, end of life, BC sourcing). Date: 2026-10-13.

**What I read**
- Spec: `detail02-v3.mjs` and `detail02-v3.json` (162 parts), `materials.json`, `metrics.mjs`.
- This lap's `metrics.md`, `report.md` and `changes-v3.md`.
- The renders `exterior-close.png` and `exterior-eye.png`.
- My lap-2 review.
- Research 13 §3.5, §4.4–4.6; 14 §2, §5–§8; 09.

**How the numbers were made.**
- I re-ran the `metrics.mjs` quantity rules part by part on `detail02-v3.json` and reproduced **692.0** exactly (biogenic 316.4).
- I then applied every correction below as part overrides. The scratch scripts are in the session scratchpad: `l3/parts.mjs` (a per-part dump that also computes B4), `l3/corr.mjs` (corrections), `l3/rslmats.mjs` (RSL overlay) and `l3/prop.mjs` (proposals).

**Tags**
- **S**: read this session in the named document.
- **S2**: read in an aggregator listing or a search summary.
- **I**: my calculation or judgement, with the method stated.

**Units.** All numbers are A1–A3 fossil, in kgCO2e per metre of opening, unless a per-m² value is stated. Biogenic carbon is reported separately and never netted.

---

## Headline

| run | A1–A3 | B4 (60 yr) | A1–A3 + B4 | biogenic (long-cycle) |
|---|---|---|---|---|
| lap 2, v2 corrected (my lap-2 figure) | 720 | ≈ 214 | ≈ 934 | 144 |
| **v3 as shown** (`metrics.md`) | **692** | not computed | — | 316 |
| **v3 corrected** (same design; quantities and factors fixed, see the bridge) | **686** (range ≈ 630–760) | **361** | **1,047** | 334 |
| v3 corrected + §4 proposals P1–P4 and P6 | **585 (−15 %)** | 301 | **886 (−15 %)** | 343 |

**What happened in v3.** The shown total is now almost right, to within 1 %. That is luck more than accuracy: four errors of about 20 each cancel.
- Over-counted:
  - the glass is counted through the sightlines;
  - the canopy fascia is drawn as 7 mm solid steel.
- Under-counted:
  - the door carrier leaves out the track and sill;
  - only 1 of the 3 canopy brackets is counted, and at the hot-rolled factor.

**The design moved the right way.** Roughly 300 of new scope came in with no rise in the total: the upper floor band, glulam, canopy, ZIP screen, upper wall and the jamb wall. The moves that did it:
- glulam, not steel;
- reclaimed granite everywhere;
- no grates;
- no grout, wedge or apron;
- the lighter PU grade;
- no SBS;
- HDPE pipes.

**What is left.** The carbon now sits in four places:
- glass, 28 %;
- the ZIP screen, 12 %;
- the imported door frame and drive, 13 %;
- stainless, 6 %.

**B4 is +53 % and is still hidden.**

### Bridge from 692 to 686

| step | Δ |
|---|---|
| Glass net of the sightlines (jambs 165 × 2, interlock 120): `fill` 0.906 | **−19.6** |
| `door-unit` carrier: 75 → 91.5, adding the thermally broken track, sill nosing and head guide; split into frame, hardware and drive (N3) | **+16.5** |
| `cassette` (solid aluminium box proxy, 78.5) replaced by an EPD-based ZIP screen (82.1) | +3.6 |
| `canopy-fascia`: 7 mm solid steel → 24 ga sheet, 230 girth | **−19.0** |
| Canopy brackets: 1 → 3 per opening, HDG plate factor 2.0 instead of hot-rolled 1.22 | **+10.2** |
| Canopy runs 5.1 m per 4.8 m opening (cap, deck, frame, soffit, ledger); glulam 5.09 m | +2.1 |
| Downspout and spout drawn with 2 mm walls → 0.6 mm | −6.9 |
| Reveal liners: 2 per opening, not 2.67; jamb posts at both jambs | −1.2 |
| Perforated HDPE pipes drawn as solid 4–5 mm walls → corrugated product mass | −6.6 |
| Missing items: joist hangers, band screws, slab mesh, canopy membrane | +9.4 |
| Channel at about 15 kg/m (lap-2 N7, not done) | +4.8 |
| Purenit bearer at 550 kg/m³ and its own factor | +0.2 |
| **Total** | **−6.5** |

**Uncertainty on 686 [I]:**

| item | range | effect on 686 |
|---|---|---|
| IGU factor | 1.6–2.07 /kg | −21 to +28 |
| Door frame carrier | 75–120 | −17 to +28 |
| ZIP screen | ±25 | ±25 |
| Stainless origin | 2.9–7 | −18 to +17 |
| Reclaimed-granite supply failing | new granite | +48 A1–A3, plus ≈ +100 A4 (N13) |

### Corrected zones

| zone | kgCO2e/m | intensity |
|---|---|---|
| D door unit | 289.3 | 103.9 /m² of door elevation (÷ 2.785) |
| H floor-band head + canopy + screen | 147.9 | per m (the screen is 82 of it) |
| T threshold | 88.4 | per m |
| F floor | 42.0 | 18.8 /m² of plan |
| J water corner + rain garden | 29.3 | per m |
| Z jamb A wall base | 28.3 | per m |
| U upper floor and wall | 24.4 | per m |
| M lined landing | 18.7 | 10.9 /m² |
| P terrace + jamb ground | 8.9 | 6.4 /m² |
| I planting bed | 6.1 | 3.5 /m² |
| E subgrade and drains | 2.5 | — |

### Hotspots (corrected, share of 686)

| item | kgCO2e/m | share |
|---|---|---|
| Triple IGU 6/4/8.76 | 189.0 | 28 % |
| ZIP screen (west) | 82.1 | 12 % |
| Wood-Al frame + track (carrier) | 58.0 | 8 % |
| Concrete (slab, haunch, beam, stem) | 45.3 | 7 % |
| Stainless (8.6 kg/m) | 43.0 | 6 % |
| Prefinished steel (cap, fascia, liners, downspout) | 24.1 | 4 % |
| PU course | 19.8 | 3 % |
| Drive | 19.5 | 3 % |
| Glulam | 19.4 | 3 % |
| HDPE | 18.1 | 3 % |
| Lift-slide hardware | 14.0 | 2 % |
| Canopy brackets | 12.3 | 2 % |

---

## Lap-2 findings status

| # | lap-2 finding | v3 status | evidence / what is left |
|---|---|---|---|
| N1 | Stainless: factor, grate mass, proliferation | **partly fixed** | Grates gone (open granite rill, granite slips in the tray). Factor 5.0 adopted. Still 8.6 kg/m = **43.0**, the 5th-largest item. The no-look-change fix (`stainless-epd`) is not adopted: −26 (P2) |
| N2 | Thin-glass triple not buildable | **fixed / new error** | 6 / 4 / 8.76 lam is buildable. But the glass is counted at full width through the jambs and interlock: −19.6 (N1 below) |
| N3 | Steel lintel | **fixed** | Glulam 215 × 684 (−48 vs steel) |
| N4 | SBS factor | n/a | No roof. The canopy membrane is uncounted (+1.4) |
| N5 | T/H intensities | **fixed** | D per m² of elevation; T and H per m. Left: the header still prints `Spec: detail02.json`; the B4 note quotes my stale v2 figure |
| N6 | PU course over-spec | **fixed** | 500-080 class. The Armatherm EPD value is still not pasted (second lap) |
| N7 | Channel half mass | **not fixed** | 6.3 kg/m drawn vs ≈ 15: +4.8 |
| N8 | Frame structure | superseded | Carrier part; see N3 |
| N9 | B4 hidden | **not fixed** | `materials.json` already carries `rsl` on four materials, but `metrics.mjs` ignores it. Now **+361** (N5) |
| N10 | Green-roof fabrics | n/a | No green roof |
| N11 | Frame product unnamed | **fixed / partly** | ENERsign primus named. No EPD; the carrier misses the track (N3); A4 from Germany is ≈ +27/m and uncounted |
| N12 | PVC | **fixed in pipes / re-entered elsewhere** | HDPE everywhere in the ground. New: PVC thermal break in `sill-nosing` (maker part), **PVDF named on the liners**, a probable PVC-coated screen fabric (N12 below) |
| N13 | Pocket counted as terrace | n/a | Pocket moved to jamb B (appearance model only). The rain garden is still continuous along the façade (see N7, bay convention) |
| N14 | PT lumber | **mostly fixed** | Packer gone; head ground untreated. PT stays in the cant, ledger, canopy frame, strapping and sill plate: acceptable (exterior or on concrete) |
| N15 | Grout locks the track | **fixed** | Machined PU course, Purenit bearer, no grout, wedge or apron; removable 316 floor plate |
| P1 | Stainless package | **partly** | Granite rill (open) adopted. EPD-backed stainless not adopted |
| P2 | Lintel | **adopted** (glulam) | — |
| P3 | One-stone ground | **adopted** | No supply fallback written (N13) |
| P4 | EPDM roof | n/a | — |
| P5 | PU grade | **adopted** | — |
| P6 | PVC out | adopted in pipes | See N12 |
| P7 | Wood-Al lift-slide | **adopted** (ENERsign) | My lap-2 frame estimate (−24 to −49) is now carrier-based; frame material is not the lever, glass is (agrees with 14 §7) |
| 4.8 | Health: tin-free sealant, A460 markers etched or fritted, no applied film | **adopted** | `edge-seal` tin-free; #1 dots |
| 4.8 | Health: PFAS-free coil coatings | **made worse** | The liners are now explicitly "PVDF" |
| 4.9 | Dry-glazed IGUs | **adopted** | Glass-1 note: "Dry-glazed for the year-30 IGU change" |

### Where I challenge `changes-v3.md`

- **"R4 N2 done … glass carbon is higher, honestly counted."** It is counted on 1.000 m per m of opening. The 165 jambs and the 120 interlock carry no glass (14 §4), so the net is 0.906 (−19.6).
- **"R4 N11 done … `door-unit` uses research 14 §7 mid values."**
  - The §7 frame row (10–21) is scaled from whole-window EPDs. Windows have no lift-slide running track, sill nosing or head guide.
  - The 4.8 m thermally broken track plus nosing is ≈ 3 kg/m of aluminium, ≈ 115 kgCO2e per opening (≈ 24/m) [I].
  - One lump cannot carry three RSLs (frame 60, hardware 30, drive 20).
- **"R4 N12 PVC done."** It is done for pipes only. PVC and PFAS came back in:
  - the maker's nosing break;
  - the ZIP fabric;
  - PVDF named on the liners.
- **"R4 N9 open: stated under the table."** The line quotes my v2 figure (+214). For v3 it is **+361**, and the inputs (`rsl`) are already in `materials.json`.
- **"R4 P3 done."** Yes for the look. But about 1,000 kg/m of stone rides on a supply that is not yet named (N13).
- **"Factors are now R4's lap-2 corrections."** Yes. But `steel-section` (1.22, hot-rolled) is now used for HDG knife plates, which is a plate-and-galvanizing product (N4).
- **Research 13 §3.5 lists the hangers (19.3 per opening) and screws (5.8).** Neither was modelled (N9).

---

## 1. Score: environmental sustainability — **7 / 10** (lap 2: 6)

**Better:**
- Every lap-2 "wrong-way" swap is reversed:
  - glulam replaces the steel lintel;
  - the PU grade dropped;
  - the grates are gone;
  - the grout is gone.
- Granite and HDPE everywhere in the ground.
- Dry glazing.
- The headline is within 1 %.

**Held back:**
- B4 is +53 % and still not computed.
- Two big items rest on placeholders:
  - the door carrier (no EPD);
  - the screen, whose cassette is a geometric guess.
- Stainless is not EPD-backed.
- PVDF, PVC and a likely PVC fabric are on the façade.
- The glass, at 28 %, has not been worked on beyond buildability.

---

## 2. Quantity and factor audit

### 2.1 Items checked by hand

| item | spec (v3) | hand check | verdict / corrected |
|---|---|---|---|
| **Glass mass** | 3 lites 6 + 4 + 8.76 = 18.76 mm × 2.471 m × 2.5 = 115.9 kg/m, on runs `[[165,1800]]`, so share = 1 | Glass width per opening = 2 × 2175 = 4350 of 4800 (jamb 165 × 2, interlock 120: 14 §4, S) | **`fill: 0.906`** on `glass-1..3` → 105.0 kg/m, **189.0** (was 208.6) |
| **Glass factor** | `igu-triple` 1.8 /kg | German industry Muster-EPD for flat glass (ift, **M-EPD-VMG-002002**, 24 Jan 2024, EN 15804+A2; semcoglas issue, S): MIG 3-fach 4/A/4/A/4 uncoated **57.2 kgCO2e/m² fossil A1–A3** (31.3 kg/m²); VSG 6 / 1.52 PVB / 6 **65.16 /m²**; PVB alone 14.35 /m² per 1.52 mm; Low-E **+1.28 /m² of coated face**. These values **include a 30 % ÖKOBAUDAT safety surcharge** (S). Scaling to 6 / 4 / 8.76 (+6 mm glass at ≈ 3.85 /m²·mm, +0.76 PVB, lamination, HS of #1, 2 low-e) gives ≈ 97 /m² = **2.07 /kg with surcharge, ≈ 1.6 /kg without** [I] | **1.8 holds** as the midpoint; add the bracket to `src` |
| **Door carrier** | 75 = 27 /m² × 2.785 | 14 §7: frame 10–21 (from window EPDs), hardware 3–7.5, drive ≈ 7. Missing: lift-slide **track + sill nosing + head guide** ≈ (2.0 + 1.0 kg/m Al) × 4.8 m ≈ 14 kg Al per opening × ≈ 8 kgCO2e/kg (EU extrusion) ≈ 115 → **≈ 6 /m²** [I]. The 14 §7 own advice: generic + 1.2 safety factor when there is no EPD | frame + track **21 /m² → 58.0**, hardware 5 → **14.0**, drive 7 → **19.5**; total **91.5** (range 75–120). Split so RSL can apply (§2.2) |
| **ZIP screen** | `cassette`: aluminium 150 × 118 box at `fill 0.25` = 11.95 kg/m Al → **78.5** | Hunter Douglas **ProScreen ZIP 95 motorised, NEPD-7817-7494-EN** (EPD Norway, 17 Oct 2024–17 Oct 2029, S): per **m² of screen** 5.37 kg (Al+Zn 1.91, steel 2.48, plastics 0.31, other 0.63), **GWP-fossil A1–A3 37.7 kgCO2e/m²**, **RSL 15 yr**, glass-fibre fabric. Here 4.8 × 2.6 = 12.5 m² per opening; a 140–180 headbox but a lower edge-to-area ratio → mass/m² × 0.84 [I] | **82.1** (+3.6): the geometric proxy was right by coincidence. Replace it with virtual parts that carry RSL (§2.2) |
| **Glulam** | 215 × 684 × 482 kg/m³ × 0.2585 = **18.3**; runs `[-145, 1800]` → share 1 | Real length 4800 + 2 × 145 = 5.09 m per opening (13 §3.4). Kalesnikoff 124.5 /m³ is per m³, so density does not matter (S, EPD 296, valid to 16 Mar 2027) | `fill: 1.06` → **19.4**. Biogenic 127 (long-cycle, 0 under the CoV rule) |
| **Canopy fascia** | `R(-757, 2795, -750, …)`: **7 mm solid steel** × 150 = 8.24 kg/m → **22.1** | A 24 ga fascia is 0.6 mm sheet, girth ≈ 230 (face + hem + returns) | `m3PerMetre: 0.23*0.0006*5.1/4.8` → **3.1** (−19.0) |
| **Canopy cap** | 0.6 × ≈ 830 girth = 3.9 kg/m → 10.4 | Geometry right; length 5.1 m per 4.8 m | `fill: 1.0625` → 11.1 |
| **Knife plates, back plates, pads** | `per: "opening"`, one bracket in the slice (w 295–305) → 1.27 + 0.79 kg/m at 1.22 = 2.5 | **3 brackets per opening** (13 §4.6). These are plate, galvanized, not a hot-rolled section. Buy Clean California hot-rolled limit is 1.01 (S2, DGS); plate is higher (DGS row not read; the 2027 draft table lists plate ≈ 1.86–2.6, S2) + HDG ≈ 0.3 [I] | `fill: 3` on knife, plate and pad; `mat: "steel-plate-hdg"` (2.0) → **12.9** (+10.2) |
| **Stainless** | 8.6 kg/m at 5.0 = **43.0**: tray 3.79 kg (1.5 × 315 girth), pan 1.91, floor plate 0.86, dam angle 0.84, stools, clips, screens | Geometry consistent | Accounting OK. Design: P2 |
| **Wood fibre** | `wf-band` 12.2 kg/m (80 × 905 band) + `jamb-wf` 11.2 (per opening) at 0.449 /kg | GUTEX 75.8 /m³ (09, S) is right for an EU dry-process board. Board imported from Germany. NA option: **TimberHP TimberBoard** (Maine), EPD HUB-6324 (2026–2027, S2: TRACI A1–A3 −8.97 /m²·RSI incl. biogenic; fossil value not read) | OK. Ask for the fossil row if TimberHP is chosen |
| **Cellulose** | `jamb-core` and `upper-core`: whole cavity priced as cellulose at 56 kg/m³ | Studs (23 %) priced as cellulose: understated by ≈ 0.3 /m, biogenic by ≈ 4 [I] | Accept; note |
| **Granite** | `reclaimed-stone` 0.01 on ≈ 1,000 kg/m (pavers 60/80, curbs, slips, basin, rill) → **10.0** | Cut-off rule is fine for genuinely salvaged stone. New granite: **Marshalls Chinese granite EPD 58.4 kgCO2e/t A1–A3** (S2), plus sea freight | Keep 0.01 with a fallback note (N13) |
| **Per-opening jamb parts** | `per: "opening"` divides the jamb-A slice by 4.8 | (a) The liners use the default 1000/L → **2.67 liners per opening**; the real count is 2. (b) `jamb-posts`, `jamb-ply-p` and `jamb-gyp-p` count one jamb; the glulam bears on both. (c) The jamb-A wall (1.2 m) counts once per opening: right if piers are 1.2 m each, shared | liners `fill ×0.75`; posts, ply-p and gyp-p ×2. **State the bay** in `zones` (N7) |
| **Pipes** | `underdrain`, `perim-drain`: d110/di102 solid ring = 1.27 kg/m; `rg-subdrain` d160/di150 = 2.31 kg/m | Perforated corrugated HDPE: 4 in ≈ 0.45 kg/m, 6 in ≈ 0.9 kg/m [I, coil weights] (lap-2 N12 gave `0.5/950`) | `m3PerMetre: 0.45/950` (×2), `0.9/950` → −6.6 |
| **Downspout, spout** | d100/di96 = 2 mm steel wall → 3.1 kg/m | 24–26 ga downspout ≈ 0.6 mm | `fill: 0.304` → −6.9 |
| **Sill bearer** | `pu-structural` at 320 kg/m³ | The name says Purenit 550 kg/m³; it is recycled rigid-PU chips + PU binder, so its factor is below virgin PU. No EPD found | `mat: "purenit"` (550, 2.5 [I]) → 2.8 (≈ 0) |
| **Slab** | `concrete-lowcarbon` 111 /m³ (CLF-G Lafarge 56 d, S2) | Already a strong mix; Concrete BC EPD 348 F-2 40 % SCM is 178.6 | OK. Require the supplier EPD ≤ 120 /m³ at 56 d; P6 |

### 2.2 Paste-ready `materials.json` entries

Replace `door-unit-woodalu` and update `igu-triple`. Add the rest.

```json
 "igu-triple": { "density": 2500, "a1a3": 1.8, "k": 1.0, "rsl": 30,
  "src": "INFERRED per kg of glass for 6 HS/14 Ar/4/14 Ar/8.76 lam, EU-made: bracketed by the German flat-glass Muster-EPD (ift M-EPD-VMG-002002, EN 15804+A2, 24 Jan 2024, semcoglas issue, S): MIG 3-fach 4/A/4/A/4 57.2 kgCO2e/m2 fossil A1-A3 at 31.3 kg/m2; VSG 6/1.52/6 65.16/m2; PVB 14.35/m2 per 1.52 mm; low-E +1.28/m2 per coated face; all incl. a 30 % ÖKOBAUDAT surcharge. Scaled: 2.07/kg with surcharge, ~1.6 without -> 1.8. Pilkington Insulight Triple 47.8/m2 (EPD-IES-0002592, S2) consistent" },
 "igu-triple-lowc": { "density": 2500, "a1a3": 1.37, "k": 1.0, "rsl": 30,
  "src": "INFERRED: as igu-triple with all lites on low-carbon float (Saint-Gobain ORAE: 5.86 kgCO2e/m2 A1-A3 at 4 mm/10 kg, S-P-08970 via One Click LCA (S2); -42 % vs PLANICLEAR, S2 product data); saving ~0.45 kgCO2e/kg of glass x 0.96 glass share. Pilkington Mirai / AGC low-carbon float are alternatives. Require the IGU maker to name the substrate EPD" },
 "door-frame-woodalu": { "density": 1000, "a1a3": 1, "rsl": 60,
  "src": "CARRIER (m3PerMetre = kgCO2e/1000): ENERsign primus wood-Al frame + sashes + thermally broken lift-slide track, sill nosing and head guide: 15 /m2 (14 par.7 frame mid, from Nordic wood-Al window EPDs 52-63/m2 incl. glass, S*) + 6 /m2 track/nosing (~14 kg EU Al extrusion per opening x ~8 kgCO2e/kg, I) = 21 /m2 x 2.785 = 58. No product EPD: require EN 15804+A2 in tender. A4 EU->Vancouver ~+27/m for the whole unit, not counted" },
 "door-hw": { "density": 1000, "a1a3": 1, "rsl": 30,
  "src": "CARRIER: lift-slide gear, rollers, lift mechanism, gaskets ~20 kg/opening; 5 /m2 x 2.785 = 14 (14 par.7, I). RSL 30: rollers, seals and gear replaced once (14 par.8 service at 5/15 yr)" },
 "door-drive": { "density": 1000, "a1a3": 1, "rsl": 20,
  "src": "CARRIER: SIEGENIA DRIVE axxent HSA ~6 kg incl. electronics x ~15 kgCO2e/kg = 7 /m2 x 2.785 = 19.5 (14 par.7, I). Tested 25,000 cycles (S, 14 par.6); electronics RSL ~20 yr [I]" },
 "zip-screen": { "density": 1000, "a1a3": 7.02, "rsl": 15,
  "src": "SOURCED proxy: Hunter Douglas ProScreen ZIP 95 motorised, NEPD-7817-7494-EN (EPD Norway, 17.10.2024-17.10.2029): 1 m2 = 5.37 kg (Al+Zn 1.91, steel 2.48, plastics 0.31, other 0.63), GWP-fossil A1-A3 37.7 kgCO2e/m2 -> 7.02 per kg; RSL 15 yr. https://epd-global.com/getfile.php/1370537-1729258401/EPDer/Byggevarer/NEPD-7817-7494_ProScreen-ZIP-95---MOTORISED---TUBE63.pdf . Large 4.8 x 2.6 unit: 0.84 x mass/m2 [I]" },
 "steel-plate-hdg": { "density": 7850, "a1a3": 2.0, "k": 50, "rsl": 60,
  "src": "INFERRED: NA steel plate, fabricated, ~1.7 (Buy Clean California plate row not read; hot-rolled 1.01 confirmed on the DGS table, S2; 2027 draft table plate ~1.86-2.6, S2) + hot-dip galvanizing ~0.3. Knife and back plates" },
 "steel-galv": { "density": 7850, "a1a3": 2.68, "k": 50,
  "src": "as steel-prefinished (09 coil 2.60-2.75, S2): galvanized hangers, straps, structural screws" },
 "purenit": { "density": 550, "a1a3": 2.5, "k": 0.096,
  "src": "INFERRED: Puren purenit (recycled rigid-PU chips + PU binder), 550 kg/m3, lambda 0.096 (14 par.3.3, S). No EPD found this session; factor below virgin PU 4.0 because the chip input is burden-free under cut-off" },
 "concrete-lc90": { "density": 2400, "a1a3": 0.0375, "k": 1.7,
  "src": "INFERRED target: 25 MPa 91-day high-SCM mix at <= 90 kgCO2e/m3 (R4 lap 2 P7, Heidelberg S2). Supplier EPD required" }
```

Append to existing `src` fields:
- `reclaimed-stone`: "Fallback if salvage fails: new granite 0.058 kgCO2e/kg A1–A3 (Marshalls Chinese granite EPD, S2) plus sea freight ≈ 0.1/kg A4. Require chain of custody for the salvage."
- `woodfibre-board`: "NA option: TimberHP TimberBoard (Maine), EPD HUB-6324 (S2)."
- `cedar-siding`: add `"rsl": 40`.

### 2.3 Paste-ready part changes (`detail02-v3.mjs`)

```js
// glass net of sightlines
for (...) add({ id: `glass-${i + 1}`, ..., fill: 4350 / 4800 });
// carrier split (delete "door-unit")
add({ id: "door-frame", junction: "D", mat: "door-frame-woodalu", type: "virtual", m3PerMetre: 58 / 1000, name: "Wood-Al frame, sashes, track, nosing (carrier)" });
add({ id: "door-hardware", junction: "D", mat: "door-hw", type: "virtual", m3PerMetre: 14 / 1000, name: "Lift-slide gear and gaskets (carrier)" });
add({ id: "door-drive", junction: "D", mat: "door-drive", type: "virtual", m3PerMetre: 19.5 / 1000, name: "SIEGENIA drive (carrier)" });
// screen: keep "cassette" for drawing but nocarbon: true; carry it virtually
add({ id: "screen-housing", junction: "H", mat: "zip-screen", type: "virtual", m3PerMetre: 0.65 * 11.7 / 1000, rsl: 60 });
add({ id: "screen-fabric-motor", junction: "H", mat: "zip-screen", type: "virtual", m3PerMetre: 0.35 * 11.7 / 1000, rsl: 15 });
// canopy
"canopy-fascia": type "sheet", t: 0.6, girth path ≈ 230   // or m3PerMetre: 0.23 * 0.0006 * 5.1 / 4.8
"canopy-cap" | "canopy-deck" | "canopy-soffit" | "canopy-ledger": fill: 5.1 / 4.8; "canopy-frame": fill: 0.25 * 5.1 / 4.8
"canopy-knife" | "canopy-plate" | "canopy-pad": fill: 3 (3 brackets per opening); knife + plate mat: "steel-plate-hdg"
"glulam": fill: 5090 / 4800
// jamb counting
"liner-jamb-a": fill: 0.75; "liner-frame-a": fill: 0.05 * 0.75     // 2 liners per opening, not 2.67
"jamb-posts": fill: 1.8; "jamb-ply-p" | "jamb-gyp-p": fill: 2      // both jambs
// thin-walled and corrugated products
"downspout" | "spout": di: 98.8                                     // 0.6 mm wall
"underdrain" | "perim-drain": m3PerMetre: 0.45 / 950; "rg-subdrain": m3PerMetre: 0.9 / 950
"channel": m3PerMetre: 15 / 2300
"sill-bearer": mat: "purenit"
// missing
add({ id: "joist-hangers", junction: "U", mat: "steel-galv", type: "virtual", m3PerMetre: 1.5 / 7850 });   // 12 × 0.6 kg / 4.8 m (13 §3.5)
add({ id: "band-screws", junction: "H", mat: "steel-galv", type: "virtual", m3PerMetre: 0.42 / 7850 });    // ≈ 2 kg / opening (13 §3.5)
add({ id: "slab-mesh", junction: "F", mat: "rebar", type: "virtual", m3PerMetre: 3.4 / 7850 });            // 6x6 W2.9 ≈ 1.5 kg/m² × 2.27 m
add({ id: "canopy-membrane", junction: "H", mat: "sbs", type: "virtual", m3PerMetre: 0.66 * 1.0625 * 1.5 / 1100, rsl: 45 });
```

---

## 3. New findings, by severity

**N1. MAJOR — Glass is counted through the frame sightlines.** −19.6.
- **Parts:** `glass-1..3`, runs `[[165,1800]]` (one run, so share 1).
- **Fix:** `fill: 0.906` (4350 / 4800).
- **Factor:** keep 1.8, now bracketed by the German Muster-EPD at 1.6–2.07 (§2.1).

**N2. MAJOR — The ZIP screen is the second-largest item.** 82 A1–A3 and **87 B4**.
- **What is wrong:**
  - It is drawn as a solid-aluminium box guess.
  - It has a 15-year life.
  - It is counted on every opening, although 13 §4.4 reserves the east zone.
  - Its fabric is probably PVC-coated glass fibre.
- **Fixes:**
  - Carry it by the two virtual parts in §2.3.
  - Fit it **west only**, and state this in `zones`. East openings are then 82 lower (A1–A3) and 87 lower (B4).
  - Tender for a product with an EPD.
  - Require a **PVC-free fabric** and a **replaceable fabric, tube and motor cartridge** in a reusable headbox.
- **Performance:** keep it on the west. 13 §4.6 shows the canopy shades only ≈ 0.38 m of glass at a 30° profile.

**N3. MAJOR — The `door-unit` carrier is low and cannot carry RSL.** +16.5.
- **Problem:** it leaves out the lift-slide track, nosing and head guide.
- **Fix:** the three-part split in §2.2–2.3.
- **Tender requirements:**
  - an EN 15804+A2 product EPD for the door;
  - the IGU substrate EPD;
  - the aluminium cladding's recycled content (≥ 75 % post-consumer billet, e.g. Hydro CIRCAL class [I]).
- **Disclosure:** A4 from Germany is ≈ 160 kg/m × 0.17 kgCO2e/kg ≈ **+27/m** [I]. It is excluded by the A1–A3 method; say so in `metrics.md`.

**N4. MAJOR — The canopy is mis-modelled.** Net −8.8.
- The fascia is drawn as 7 mm solid steel (−19.0).
- 1 of 3 brackets is counted, at the hot-rolled factor (+10.2).
- The length is 4.8 m, not 5.1 m (+1.0).
- **Fix:** see §2.3. Then consider P4 (timber arms).

**N5. MAJOR (method) — B4 is still not computed, though the inputs exist.** **+361 over 60 years (+53 %).**

| item | RSL | replacements | B4 |
|---|---|---|---|
| IGU | 30 | 1 | 189 |
| Screen fabric, tube and motor | 15 | 3 | 86 |
| Drive | 20 | 2 | 39 |
| Prefinished steel: cap, fascia, drip, downspout, liners | 50 | 1 | 24 |
| Lift-slide gear | 30 | 1 | 14 |
| Cedar and soffit | 40 | 1 | 5 |
| Canopy deck and membrane | 45 | 1 | 3 |
| **Total** | | | **361** |

- **Not included:** the rain-garden top-up (≈ +3) and the cedar oil (B2).
- **Should `metrics.mjs` carry RSL? Yes.** The two largest B4 items (IGU, screen) are ≈ 40 % of A1–A3 again. A 60-year view changes design choices:
  - dry glazing;
  - a replaceable screen cartridge;
  - a repairable drive.
- **Patch for `metrics.mjs`:**

```js
const ESP = spec.study_years ?? 60;                       // CoV/NRC study period
// in the row loop, after kg:
const rsl = p.rsl ?? m.rsl ?? null;                       // null = assumed >= ESP
const nrep = rsl ? Math.max(0, Math.ceil(ESP / rsl) - 1) : 0;   // EN 15978 replacement count
rows.push({ id: p.id, junction: p.junction, mat: p.mat, m3: v, kg, co2: kg * m.a1a3, b4: kg * m.a1a3 * nrep, rsl, bio: kg * (m.biogenic ?? 0) });
// headline:
`Total A1–A3 ${sum("co2").toFixed(0)} · B4 (${ESP} yr, replacement products A1–A3 only) ${sum("b4").toFixed(0)} · A1–A3 + B4 ${(sum("co2") + sum("b4")).toFixed(0)} kgCO2e/m`
// junction table: add a "B4" column  sum("b4", r => r.junction === j)
// footer: list materials/parts with rsl and those assumed >= ESP
```

- **Also:**
  - Delete the stale "+214 for v2" sentence.
  - Print the spec file name with its version.

**N6. MINOR — The downspout and spout are drawn with 2 mm walls.** −6.9.
- **Fix:** `di: 98.8`.
- **Also:** the downspout is prefinished steel discharging into the basin. Use an AZ-coated steel with an SMP or HDP finish (see N12), not zinc or copper, because it feeds the rain garden.

**N7. MINOR (method) — Per-opening counting.**
- The liners count 2.67 per opening (−2.0). The jamb posts count one jamb (+0.8).
- **The basis is mixed:**
  - Continuous parts (slab, terrace, rain garden, subfloor; runs over −1200 → 1800, share 1) are effectively **per m of façade**.
  - The jamb extras are **per opening ÷ 4.8**.
- With 1.2 m piers the bay is 6.0 m. Continuous items "per m of opening" are then understated by up to 1.25×.
- **Fix:** add `bay_mm: 6000` to the spec and report both "per m of opening" and "per m of façade bay". Do not change the totals until the user fixes the pier width.

**N8. MINOR — Perforated HDPE pipes are drawn as solid-wall pipe.** −6.6. Fix in §2.3. This repeats lap-2 N12.

**N9. MINOR — Missing items.** +9.4.
- joist hangers, which 13 §3.5 lists;
- band screws;
- slab mesh, needed to hold the floor heating;
- the canopy self-adhered membrane.

**N10. MINOR — The channel is still half its mass.** +4.8. Repeats lap-2 N7.

**N11. MINOR — The Purenit bearer is priced as 320 kg/m³ virgin PU.** Net ≈ 0.
- **Fix:** add the `purenit` entry.
- **Ask Puren for its EPD.** Purenit is mostly recycled PU, which is the right material story for a thermal bearer.

**N12. MAJOR (health) — PFAS and PVC are back on the façade.**
- **`liner-jamb-a` "Charcoal PVDF".** PVDF is a fluoropolymer, so it is a PFAS under the OECD definition [I], on the most visible metal in the elevation.
  - Fix: **SMP or HDP polyester on AZ150 steel**, Declare or HPD showing PFAS-free.
  - Apply the same to the cap, fascia, drip and downspout.
  - The colour-retention difference in a charcoal is small under a 656 canopy [I].
- **`sill-nosing` "aluminium … with PVC break".** This is a maker part.
  - Ask ENERsign for a **polyamide (PA66-GF)** break, the usual alternative.
  - If PVC stays, record it as a declared exception.
- **ZIP fabric.** It is not specified. Exterior ZIP fabrics are usually PVC-coated glass fibre or polyester.
  - Specify PVC-free and PFAS-free (no fluorinated soil-release finish).
  - The NEPD proxy uses glass-fibre fabric [S].

**N13. MINOR (sourcing risk) — The ground is ≈ 1,000 kg/m of stone at a reclaimed factor.**
- **If salvage fails** and new imported granite is used: +48 A1–A3 (58 kg/t, S2) and ≈ +100 A4.
- **Fixes:**
  - **Procurement clause:** reclaimed granite with chain of custody (City of Vancouver street-works salvage or a salvage yard; to be confirmed).
  - **Fallback:** PNW stone, or a concrete paver with an EPD ≤ 0.12 kgCO2e/kg.
  - **Terrace 80 → 60 mm** where it is pedestrian only. That saves 25 % of the terrace stone if the fallback is ever used.

**N14. INFO — The Armatherm 500 EPD value is still not pasted** (EPD-IES-0026744, valid to 2030). I could not retrieve its tables again this lap. Ask Armatherm for the PDF.

---

## 4. Proposals: biggest reductions that keep the look and performance

Each Δ is measured against the corrected **686** (A1–A3) and **361** (B4).

| # | move | Δ A1–A3 | Δ B4 | look | performance |
|---|---|---|---|---|---|
| **P1** | **Low-carbon float in the IGU** (ORAÉ / Mirai class) for all three lites, from the EU IGU line | **−45.2** | −45 | identical (clear float; check the edge tint with a sample) | identical |
| **P2** | **EPD-backed stainless** (`stainless-epd` ≤ 2.2) for the pan, tray, angle, plate, clips and screens; tray 1.5 → 1.2 with folded stiffeners | **−26.0** | 0 | identical | identical (tray: engineer for the slip load) |
| **P3** | **Inner lite 8.76 → 6.76 lam (3.3.1)**, or 6 FT if security does not need laminated | **−20.2** (−28 with 6 FT) | −20 | identical | sash 310 → ≈ 285 kg (more drive margin). Ug unchanged. R1: wind (E1300) and safety (CGSB-12.1) checks |
| **P4** | **Timber canopy arms**: 3 glulam arms 80 × 300 screwed to the glulam face (13 §4.6 variant), no knife plates or pads | **−9.8** | 0 | identical (inside the soffit) | WRB: 3 × 80 wide penetrations taped as at the joists; thermal bridge lower than steel; engineer: root moment in inclined screws |
| **P5** | Cellular glass instead of the PU course | −11 | 0 | invisible | **Rejected**: λ 0.058 vs 0.0375 lowers the course RSI from ≈ 3.2 to ≈ 2.1 at the threshold, which already has f_Rsi 0.62. Keep PU; paste its EPD |
| **P6** | Slab at a 91-day mix ≤ 90 /m³ | −4.7 | 0 | none | engineer to accept 91-day strength |
| **Total P1–P4 + P6** | | **−101 → 585 (−15 %)** | **−60 → 301** | | |

**Quantified but not in the total:**

| move | Δ | why not |
|---|---|---|
| **Screen on the west only** | −82 A1–A3, −87 B4 per east opening | A façade decision, not a change to this west detail. Do it |
| Vacuum or hybrid-VIG triple (≈ −40 % glass mass) | −50 to −70 [I] | Not offered by ENERsign at 5.6 m² panes; revisit at lap 5 |
| Grade-beam mix at 50 % slag (F-2) | ≈ −3 | CSA A23.1 F-2 SCM limits; engineer |
| Recycled-billet aluminium cladding (CIRCAL-class) in the frame | −10 to −20 [I] | Needs ENERsign's supply chain; ask in the tender (N3) |

---

## 5. Material health

| item / part | concern | recommendation |
|---|---|---|
| **PVDF liners** (`liner-jamb-a`, `liner-frame-a`) and other coil (cap, fascia, drip, downspout) | Fluoropolymer, PFAS by the OECD definition [I] | SMP or HDP polyester on AZ150, PFAS-free declared (N12) |
| **ZIP screen fabric** | Usually PVC-coated; some carry fluorinated finishes | PVC-free, PFAS-free fabric; Declare or HPD |
| **Sill-nosing thermal break** (ENERsign) | PVC | PA66-GF break; else a declared exception |
| Cellulose (`jamb-core`, `upper-core`) | Borate fire retardant (boric acid is an EU SVHC, Repr. 1B) [I] | Borate-only grade (no ammonium sulfate: it corrodes fasteners). Dense-pack behind the airtight layer: no occupant exposure |
| Wood fibre 80 | Dry-process boards use a PMDI binder (cured, inert in place) [I] | Accept; a wet-process (binder-free) board if a thinner layer is enough |
| Glulam, exposed interior face | Adhesive (PRF/MUF/PUR, formaldehyde class) | Ask Kalesnikoff for the adhesive and the emission class; prefer PUR or EPI-bonded |
| Graphite EPS | Polymeric brominated FR | Accept: below grade, no indoor exposure |
| PU course, Purenit, Armatherm pads | MDI thermosets | Ask for HPDs; Purenit is recycled content |
| Sealants | Tin-free MS adopted | Keep; no biocide grades in the basin and rain-garden catchment |
| Bird markers | Etched or fritted dots on #1 adopted | Keep; no applied film |
| PT lumber (cant, ledger, canopy frame, strapping, sill plate) | MCA/CA copper | Accept: all exterior or on concrete. Keep PT offcuts out of chipping |
| Granite, stainless, HDPE, cork, cellular glass, gypsum | Inert | Good |

## 6. End of life and disassembly

| element | as drawn | route | change |
|---|---|---|---|
| IGU | **dry-glazed** (adopted) | Glazier take-back. Laminated cullet needs PVB separation [I] | P3 thinner lam; ask for take-back in the tender |
| Wood-Al frame | screwed into the Purenit bearer, no grout | Al recycled; wood recovered | Good. Ask ENERsign for a take-back scheme |
| Track, pan, tray | no grout; removable floor plate; lift-out tray ≤ 1 m | Stainless reusable or recyclable | Good (lap-2 N15 fixed) |
| Drive | head-mounted, plug-in | WEEE (electronics) | Specify a repairable drive with a parts guarantee ≥ 10 yr |
| ZIP screen | cassette + fabric + motor | Housing reusable; fabric landfilled | Cartridge-replaceable fabric and tube; PVC-free fabric |
| Glulam header | screwed, hung joists | Reusable beam | Good |
| Canopy | screwed timber, plates, cap | Steel recycled; ply landfilled or burned | Timber arms (P4) keep it one material family |
| Wood fibre, cellulose | mechanically fixed / blown | WF recyclable or compostable (wet process); cellulose re-vacuumed | Good |
| Ground | unbound granite on open-graded base | Relay or reuse, > 100 yr | Good |
| Channel | polymer concrete | Landfill or crushed fill | Accept; it outlives the door |
| Liner, root barriers, pipes | HDPE | Recoverable | Good |

## 7. Durability: 0 / 5 / 15 / 30 years (INFERRED unless noted)

| item | year 0 | year 5 | year 15 | year 30 |
|---|---|---|---|---|
| IGU | crisp | — | argon −10–15 % | **seal end of life**: replace 11 m² per opening (dry-glazed: a repair) |
| Lift-slide gear, gaskets | — | maker service (14 §8) | service | **replace gear** |
| Drive | — | — | electronics ageing | **replace** (≈ 20 yr) |
| ZIP screen (west) | — | fabric soiling | **fabric + motor replaced** | second set; housing kept |
| 316 tray and plate (sheltered under the canopy) | bright | tea-staining unless electropolished and washed | — | sound |
| Prefinished charcoal (liners, cap) | uniform | — | SMP: slight fade (PVDF less) | recoat or replace at 40–50 yr |
| Cedar band and jamb cedar | warm | under the canopy: uneven silvering at the cap line | re-oil the soffit | courses renewed at ≈ 40 yr |
| Granite ground | sawn, flamed | patina | relay local settlement | unchanged |
| Rain garden | establishing | mulch top-ups | silting ≈ 3 mm/yr (08, S) | top 100 mm renewed |
| Concealed: PU course, Purenit, pan | — | — | — | sound; reached at track renewal |

## 8. BC sourcing

| status | items |
|---|---|
| **Local / BC** | glulam (Kalesnikoff, EPD 296); lumber, plywood, cedar; ready-mix and aggregates; EPS; reclaimed granite (to be named); cellulose (regional) |
| **North American** | HDPE pipes and liner; prefinished steel; rebar (Nucor Seattle); Armatherm (USA); stainless (NAS, Kentucky: no EPD found) |
| **Imported from the EU** | door, IGU, drive (Germany); wood fibre (GUTEX); Purenit; cellular glass; probably the screen |
| **Effect** | The EU door + IGU is ≈ 380/m A1–A3 (55 %) plus ≈ 27/m A4. P1 and P3 cut that by −65 without changing the product. A NAFS-tested BC wood-Al lift-slide with an EPD does not exist yet (14 §2.1). Fenstür (Duncan) is the local fallback if ENERsign fails NAFS |

**Biogenic:** 334 (glulam 127, plywood, wood fibre, cellulose, lumber), all long-cycle. It counts as 0 under the CoV short-cycle rule (09 §0.2). Report it with that label.

---

## 9. Score and top 3

**Score: 7 / 10** (lap 2: 6).

**Corrected total: 686 kgCO2e/m A1–A3 (range ≈ 630–760); 361 B4; 1,047 over 60 years.**

1. **Glass first: low-carbon float in the EU IGU, inner lite 6.76 lam (P1 + P3).**
   - **−65 A1–A3 and −65 B4.**
   - Zero change to the look, Ug or the PH certificate.
   - Glass is 28 % of the total and is replaced at year 30, so this is the largest lever on both counts.
2. **Make the 60-year number real.**
   - Put the `metrics.mjs` RSL patch in (N5).
   - Split the door carrier and the screen carrier (N2, N3).
   - Apply the accounting fixes (N1, N4, N6–N10).
   - The honest figures are **686 / 1,047**. The screen and drive become visible as the B4 drivers, which argues for the west-only screen with a replaceable cartridge and for a repairable drive.
3. **No-look-change metal clean-up (P2 + N12 + P4).**
   - EPD-backed stainless (−26).
   - Timber canopy arms (−10).
   - SMP or HDP instead of PVDF.
   - PVC-free screen fabric and a polyamide nosing break.

With all three, the result is ≈ **585 A1–A3 (−15 %)** and ≈ **886 over 60 years**, and the score reaches about **8**.

---

### Sources read this session

**Read in full or in part (S):**
- Hunter Douglas, *ProScreen ZIP 95 motorised TUBE63*, NEPD-7817-7494-EN (EPD Norway, 2024–2029): https://epd-global.com/getfile.php/1370537-1729258401/EPDer/Byggevarer/NEPD-7817-7494_ProScreen-ZIP-95---MOTORISED---TUBE63.pdf
- ift Rosenheim / semcoglas, *Muster-EPD Verbundsicherheitsglas und Mehrscheibenisolierglas*, M-EPD-VMG-002002 (24 Jan 2024): https://www.semcoglas.com/fileadmin/Service/EPDs/2024-02-05_M-EPD-VMG-001002_semcoglas.pdf
- Research 13 §3.5, §4.4–4.6; 14 §2, §5–§8 (project files).

**Aggregator or search summaries (S2):**
- Saint-Gobain ORAÉ: 5.86 kgCO2e/m² A1–A3 at 4 mm (S-P-08970 via One Click LCA); −42 % vs PLANICLEAR: https://materials.oneclicklca.com/en/material/low-carbon-glass/646149b86ead431142f3cf35, https://saint-gobain-glass.co.uk/product/orae
- Marshalls Chinese granite EPD, 58.4 kgCO2e/t A1–A3: https://media.marshalls.co.uk/image/upload/chinese-granite-callisto-epd-document.pdf
- Buy Clean California GWP limits (hot-rolled 1.01, HSS 1.71; plate row not read): https://www.dgs.ca.gov/PD/Resources/page-content/Procurement-Division-Resources-List-Folder/Buy-Clean-California-Act; 2027 draft: https://www.dgs.ca.gov/-/media/Divisions/BSC/03-Rulemaking/2027-Triennial-Cycle/PreCycle/2026-09-24-CCRC/BSC-PT11-Embodied-Carbon-Regulations-ET-DRAFT.pdf
- TimberHP TimberBoard EPD HUB-6324: https://www.arcat.com/datasheets/timberhp/TimberHP_TimberBoard_Published_EPD.pdf
- Armatherm 500 EPD listing (values not retrievable): https://environdec.com/library/epd26744
- heroal aluminium lift-slide EPDs (values not read): https://www.heinze.de/epd/pdf/lift-and-slide-elements-made-of-aluminium/6b07417f-19d7-4fcd-8527-bf5b0e86c64a/

**Not found:** a wood-aluminium lift-slide product EPD; a Purenit EPD; a North American Stainless EPD; Renson Fixscreen 150 component masses.
