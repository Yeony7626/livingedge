# Detail 02: v2 → v3 changes and dispositions of lap-2 findings

The spec is `detail02-v3.mjs`; the generated parts are in `detail02-v3.json` and `detail02-v3-app.json`.
- Rhino `d2v3` is at dx 86000: a 3.0 m slice, w −1200 → 1800, covering jamb A and the sliding half.
- Rhino `d2v3-app` is at dx 102000: w −1200 → 6000, both jambs, upper storey drawn to 6.2 m.

**QA (`report.md`):** 0 floating, 0 clashes, 162 parts. The appearance model is visual only and was not QA'd.

**Metrics (`metrics.md`):**
- A1–A3: 692 kgCO2e per m of opening. This includes the canopy, the glulam and part of the upper floor and wall, which were not in v2. Biogenic carbon (316) is reported separately.
- RSI: floor 3.48, floor band 3.94, W1 wall 5.11.
- Factors are now R4's lap-2 corrections: stainless 5.0, SBS 1.3, IGU and steel notes. B4 is still not included.

## User decisions after lap 2 (2026-10-13)

1. **Water corner.** The water hardware moved out of the opening to jamb A: R2 N2 option B, R3 P1/P2, R5 P2.
2. **Not a one-storey building.** A floor and a wall sit above the opening. The roof, eave, box gutter and green roof are removed. The head is now a floor band with a flush glulam header (research 13).
3. **Lintel.** Glulam, or "stacked studs" if they work. Research 13 §3.2 shows built-up studs deflect 30–40 mm against the 3 mm limit, so the header is a glulam: 215 × 684 DF-L 24f-E, flush, joists hung. It is 215 wide (13's option) to meet the 259 deep frame.
4. **Door.** A passive-house wood-aluminium lift-and-slide, motorised: **ENERsign primus** (PHI phB, Phius), SIEGENIA DRIVE axxent HSA (research 14).

## New research

- **13 floor-band head:**
  - glulam 175/215 × 684;
  - two-piece head flashing (sub-flash plus a charcoal drip; no steel touches the header);
  - 30 mm stone-wool block in front of the frame head (f_Rsi ≈ 0.91 estimated, was 0.67);
  - ZIP screen cassette zone 160 × 118 in the head reveal;
  - charcoal reveal liners 150 deep;
  - canopy 656 deep on three thermally broken knife-plate brackets, honey soffit;
  - wood-fibre 80 band;
  - cedar continuous across the floor line.
- **14 PH lift-and-slide:**
  - ENERsign primus geometry: frame 259 deep, sill block 54 below FFL, nosing lip −12, track at FFL, rail +5;
  - threshold 12 mm via a 316 tray of granite slips at −7 with a 6 mm slot (B651 dip question open: 14 §3.2 Q2);
  - Purenit bearer;
  - machined PU course (no grout, no wedge, no apron);
  - cast-in dam angle (stage 1) plus a welded pan measured after framing (stage 2);
  - EPDM foil;
  - removable 316 floor plate;
  - glass 6 HS/FT (A460 dots #1) / 14 / 4 / 14 / 8.76 lam, about 310 kg sash;
  - overflow order −95 weir < −20 notch < −5 barrier.

  The door's own threshold f_Rsi is 0.62 (PHI certifies it under a separate rule). Mitigations: warm sill, floor heating within 1 m, and a THERM check.

## Lap-2 dispositions

| finding | status | v3 |
|---|---|---|
| R1 N1 / R3 N2: threshold 16 mm | done | 12 mm (tray −7 → rail +5). The dip-then-rise reading of B651 is open (14 Q2). |
| R1 N2: grout, wedge and apron bypass the break | done | None left. PU course machined to the fall, Purenit bearer, cork backer, 316 plate. |
| R1 N3 / R2 N3: overflow hierarchy | done (partly drawn) | Dam angle top −5. Overflow notch −20 over w 4200–4800 beyond the fixed leaf (appearance model). The weir −95 and the 0.5 % channel fall are notes, not drawn. |
| R1 N4: steel flashing on the steel lintel | done | No steel lintel. Two-piece flashing; the drip is outboard only. |
| R1 N5: lintel not real | done | Glulam 215 × 684; fixing ground 38 shimmed. |
| R1 N6 / R2 N8: pan sequence and anchors | done | Two stages. Screws stop in the bearer; no fastener through the pan. |
| R1 N7: jamb–sill corner | partial | Pan end dams 150 and the jamb membrane lap are in notes. The 3D corner is not modelled. |
| R1 F14: glazing / NAFS | partial | Make-up and safety glass specified. No NAFS test and no Canadian distributor found for ENERsign (14 §2.3). |
| R2 N1 / R3 N1: runnel dammed | done | Runnel 2 % from the rill (−145 at the basin, 1 %), ending on a lip at x ≈ −5407, y ≈ −208: 67 above the crest (−275), 22 above spill (−230). Cobble forebay 100 below the lip. Runnel on a 300 crushed-rock strip. |
| R2 N2: rill pierces the liner | done | The liner is never pierced. The channel drains by its own solid HDPE 63 pipe in the drain envelope. The rill starts at the jamb-A basin, outside the liner. |
| R2 N4: outlets undefined, underdrain fall | done | Underdrain in a 30 mm liner trench at 0.5 % (R2 asked 1 %) to its own outlet with a backwater valve (`underdrain-out`). Riser sealed base below the subdrain. Outlet table still a note. |
| R2 N5: footing margin, drain cover, cold joint | done | Rectangular beam to −530, one pour; drain at (−185, −475), cover 152. |
| R2 N9 / R3 N6: tree pit sump | done | Pit 1 × 1 m in plan (w 400–1400), floor falling 2 %, with a clear-stone link to the rain-garden rock. |
| R3 F7: root enclosure gaps | done | Granite curbstone at the liner edge with the barrier cast in. Path-edge barrier continuous under the rill. Pocket barriers under all pocket curbs (appearance model). |
| R3 F6: understorey | partial | Two bed proxies added (salal / sword fern, red-flowering currant). Bee bank not yet. |
| R3 N3 / R1 F20: operability | done | SIEGENIA drive; buttons at 900–1100 on both faces. |
| R3 N4 / R5 N2: water hardware in the opening | done | Water corner at jamb A. Shrub pocket moved to jamb B (appearance model). |
| R3 F21: wheelchair proxy | done | `person-wheelchair` on the landing. |
| R3 N7: rain-garden proxies vs hydrozones | done | Sedge on the wet slope, rush on the floor clear of the riser, ninebark on the upper far slope. |
| R4 N1: stainless | partial | Factor 5.0. The rill is open granite (no grate); no stainless grate (the tray is granite slips). The tray, pan, dam angle, plate and clips are still 316. |
| R4 N2: thin-glass triple | done | Replaced by 6 / 4 / 8.76 lam. Glass carbon is higher, honestly counted. |
| R4 N3 / P2: steel lintel | done | Glulam (user decision). |
| R4 N4: SBS | n/a | No roof membrane in v3 (floor above). |
| R4 N5: zone intensities | done | Door per m² of elevation; T and H per m only; ground zones per m² of plan. |
| R4 N6 / P5: PU course over-spec | done | `pu-structural-160` (Armatherm 500-080 class). |
| R4 N9: B4 hidden | open | Stated under the table; not computed. |
| R4 N11: fibreglass L&S not in BC | done | ENERsign wood-Al (user decision). No EPD: a carrier part `door-unit` uses research 14 §7 mid values. |
| R4 N12: PVC | done | Perimeter drain, riser and channel pipe are HDPE; track weeps deleted. |
| R4 P3: one-stone ground | done | Reclaimed granite throughout, on a 156 module. |
| R4 P4: EPDM roof | n/a | No roof. |
| R5 N1: gutter back to front | n/a | No gutter. The canopy cap falls 2 % outward to a hemmed drip. |
| R5 N3: jamb base | done | 09 §9.1 base of wall: stem to +300, plinth EPS 100 + charcoal parge, stainless base flashing (drip −107), cellular-glass strip, WF 80, cedar from +305. |
| R5 N4 / P3: west shading and picture frame | done | ZIP cassette in the head reveal; charcoal liners 56 proud of the cedar; canopy fascia caps the frame. |
| R5 N8 / P1: one ground, module | done | Granite 60 / 80 on the 156 module from the channel lip. |
| R5 N12: green roof legibility | n/a | No green roof. |
| R5 §6: renders | done | Elevation without proxies; new close view (`exterior-close.png`); both jambs and the upper storey in the appearance model. |
