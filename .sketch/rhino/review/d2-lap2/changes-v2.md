# Detail 02: v1 → v2 changes and dispositions of lap 1 findings

The spec is `detail02-v2.mjs`, with generated geometry in `detail02-v2.json`. It is built in Rhino as `d2v2` (dx 54000) and as appearance model `d2v2-app` (dx 70000: a 5.4 m run plus 0.9 m of jamb wall as massing).

**QA (`report.md`):** 0 floating parts, 0 clashes, 120 parts.

**Metrics (`metrics.md`):**
- 662 kgCO2e per m of opening (A1–A3), biogenic 144 reported separately.
- Floor RSI 3.48, head band 7.05 (vented cladding excluded, flange steel path 10 %), roof 7.70.

Status key:
- **done**: modelled in geometry.
- **note**: resolved in a part note or the spec, not as geometry.
- **partial**: some of the finding is resolved.
- **open**: not yet addressed; it carries to lap 3.
- **declined**: not adopted, with the reason.

## R1: threshold and glazing

| finding | status | v2 |
|---|---|---|
| F1 pan has no outlet | done | Welded stainless pan, 0.8 mm, 6 % floor. Its nose drops to −103 inside the channel, whose house wall top was lowered to −92. |
| F2 air break pan/poly ↔ track | done | EPDM `sill-foil` runs from the track to the back dam, under a stone `sill-apron`. |
| F3 back dam / poly lap order | done | Welded `pan-back` leg; `soilgas` poly goes up the slot face and is butyl-taped 100+ to it. Slab-first sequence is noted. The wedge runs 10→25 with no feather edge. |
| F4 slab-edge bypass | done | Cork `slot-edge` 25 plus `edge-seal`; the slab starts at x 257.3. |
| F5 head air break | done | Three-zone `head-tape` in the gap, plus `head-airseal` backer and sealant to the packer. |
| F6 19 mm void at soffit | done | `band-ei` (130 stone wool) runs up to the joists; `ei-top` sits between the joists; `band-closure` closes the cavity top. |
| F7 glulam lintel too flexible | done | Steel W250x39, ≤ 3 mm including creep (engineer). The glulam 175x456 alternative is noted; it adds 190 to the band. |
| F8 head RSI 3.63 / counts cladding | done | 130 stone wool. The metric excludes the vented cladding and models the flanges as a 10 % steel path. |
| F9 UK thermal-break course | done | Option (b): structural PU board 251 x 100, Armatherm 500 class, drillable. PERINSUL SIB is rejected (veneer-only, 92 wide). |
| F10 head flashing | done/note | 24 ga, 6 % fall, hemmed stiffener, 5 drip past the cladding. Clips at 600 and 25 end dams are in the note. |
| F11 track anchorage | note | Shims 25–40, anchored through the PU board per the maker, two sealant beads. Not drawn. |
| F12 track weeps | done | Tubes fall 2 % into the channel. |
| F13 13 mm rise / haunch on soil | done | Bevelled nosing 1:2 (+5 to −6), grate top −6. The haunch is now 63 deep and sits on the beam insulation and the drain stone. |
| F14 glazing spec | partial | Thin-glass triple (4 / 1.3 / 4), safety glass and bird markers are specified. A440 and NAFS ratings are not yet stated. |
| F15 spray foam / lintel finish | done | No spray foam: stone-wool infill and fill, gypsum on the lintel's interior face. |
| F16 head membrane permeance, dog-ears | partial | The head membrane is vapour-open. Joist dog-ears are not addressed. |
| F17 grate | done | 316 heel-safe grate, slots ≤ 6.5 parallel to the door, a seat hung from the nosing, dirt screen. |
| F18 metric labels | done | Materials use the R4 factors. |
| F19 frieze fixing | done | The frieze is replaced by one cedar course on strapping. |
| F20 operating force | open | Hardware spec, not modelled. |
| P5 west shading | open | — |
| P5 bird-safe glass | note | CSA A460 markers on surface #1. |
| P6 coldest line | open | No 2D thermal tool in the loop yet. |

## R2: floor, foundation, ground drainage

| finding | status | v2 |
|---|---|---|
| 1 drainage level chain | done | The buried rainwater line is removed (R2 P1, R3 P2). A covered `rill` crosses the terrace at 1 %, then an open stone `runnel` runs down the bed. The bed now falls about 0.8 % to the house rim at −122, with mulch 50 below the paving. The drop to the pond floor sits in the rain garden's house-side 3:1 slope: crest −250, pond floor −450, far rim −150. |
| 2 no perimeter drain | done | `perim-drain` 100 at (−185, −415), invert at the footing underside, in a geotextile-wrapped stone envelope with its own solid outlet. Cover is about 70 under the liner, which acts as the cap. This is an alternative-solution note. |
| 3 landing underdrain | done | The underdrain sits on the liner floor at x −1785 and falls 1 % along the wall to its own outlet with a backwater flap and a cleanout. |
| 4 rainwater line under landing | done | The line is removed. |
| 5 block-course face / pan onto haunch joint | done | The pan nose discharges into the channel. A `pan-skirt` runs down the board face, lapped about 100 over the damp-proofing. Graphite EPS sits on the beam face. |
| 6 slab-edge insulation and sealant | done | Cork strip plus sealant. |
| 7 soil-gas lap | done | See R1 F3. |
| 8 PERINSUL | done | See R1 F9. |
| 9 channel/haunch on frost-susceptible soil | done | The haunch sits on the beam insulation and the drain stone envelope. |
| 10 VBBL 9.15.4.6 | note | The beam is a Part 4 engineered foundation, per your ruling. |
| 11 footing depth, clay, jamb ends | partial | "Underside 450+ below exterior grade" is in a note. Jamb ends are massing only. |
| 12 floor RSI basis, door-edge ψ | open | No ψ calculation. |
| 13 channel fall / outlet invert | partial | The outlet is at the opening end, through a silt box into the rill. The channel is drawn at constant depth. |
| 14 terrace base outlet | open | Infiltrating; conditional on a soil test. |
| 15 separators, subgrade prep | open | — |
| 16 soil-gas notes | done | Radon rough-in note on the clear stone. |
| 17 footing/stem one pour | open | — |
| 18 RG subdrain | done | The subdrain sits near the top of the rock. |
| P1 rill | done | — |
| P2 rectangular beam | partial | The stepped poly is kept. |
| P4 graphite EPS | done | — |
| P5 cork | done | — |
| P6 thinner landing | partial | 60 pavers + 50 bedding + 150 base. |

## R3: landscape, people, ecology

| finding | status | v2 |
|---|---|---|
| F1 ponding | done | 200 mm. |
| F2 spill path | done | The far rim is lower than the house rim; the spillway notch is in a note. |
| F3 subdrain | done | — |
| F4 inlet | done | The pipe is replaced by the rill and runnel, with a cobble `rg-apron` at the outfall. |
| F5 riser | done | Beehive grate, stone collar (note). |
| F6 RG plants | done | Three proxies: slough sedge, common rush, Pacific ninebark. |
| F7 root path | partial | The pocket barrier's top is cast into the curb, and there is a path-edge barrier at the bed. **There is no barrier yet along the lined-zone edge at −1850.** |
| F8 tree soil | done | Tree pit 1000 deep under the tree; bed slope is about 0.8 %. |
| F9 line near tree | done | The line is removed. |
| F10 pocket sliver | done | The pocket is opened to the bed as a notch. |
| F11 bird collisions | note | CSA A460. |
| F12 terrace outlet | open | — |
| F13 landing fall | done | 1:60. |
| F14 gutter overflow at door | note | Box gutter; the overflow scupper is away from the door. |
| F15 two paver specs at −1850 | partial | The landing is low-carbon concrete planks 60; the terrace is reclaimed granite 80. The grate is specified. |
| F16 mulch flush | done | 50 below the edge restraint. |
| F17 22 % bank | done | Removed. |
| F18 shrub blocks view; alkaline soil | partial | The shrub is off-axis at w 500 and pruned to 1.5 m. Soil pH is not addressed. |
| F19 Amelanchier suckers | open | — |
| F20 green roof habitat | partial | Biodiverse sedum and native forbs on pumice substrate. |
| F21 wheelchair / seated proxy | open | — |
| F22 silt box | note | — |
| F23 track weeps open | open | — |
| F24 trench dams | n/a | No line. |

## R4: sustainability and materials

| finding | status | v2 |
|---|---|---|
| 1 door under-counted | done | Virtual `door-verticals`; IGU counted per kg. |
| 2 cellular glass priced as EPS | done | Replaced by PU, `pu-structural` 4.0 (INFERRED; needs a product EPD). |
| 3 polymer concrete | done | ACO EPD per kg. |
| 4 pavers | done | `concrete-paver` on the landing; reclaimed granite on the terrace. |
| 5 pipes; per opening | done | — |
| 6 missing material/qty | done | Only the planting and people proxies are uncounted. |
| 7 lintel/PT placeholders | done | `steel-section`, `softwood-pt`. |
| 8 spray foam | done | Removed. |
| 9 one-off features | done | Rill, runnel, pocket, apron and riser are flagged `per: "opening"` (once per 4.8 m). |
| 10 single KPI | done | Zone table in kgCO2e/m². |
| 11 junction tags | done | Terrace = P, head = H. |
| 12 sheet thickness drawn | open | The liner is drawn 2 mm (liner + geotextiles). |
| 13 plastics one factor | done | — |
| 14 growing medium | done | Pumice substrate. |
| 15 imported soil | done | 0.005. |
| 16 XPS on beam | done | Graphite EPS. |
| 17 grate mass | open | `fill` 0.35 is unverified. |
| 18 LC stages hidden | open | A1–A3 only. |

Proposals adopted:
- No aluminium in the sill: fibreglass track with stainless rails.
- Thin-glass triple.
- Reclaimed granite terrace.
- Granular pumice drainage, no plastic board.
- Herbicide-free root-resistant cap.
- Stone wool instead of spray foam.

## R5: appearance

| finding | status | v2 |
|---|---|---|
| B1 renders unusable | done | Appearance model plus finish palette (`render.py` PALETTE keyed by material). Renders: `exterior-eye.png`, `exterior-elevation.png`. |
| F1 eave 454, three materials | done | D1: thin cold overhang falling 26 %, insulation stopped at x −100, one charcoal box gutter with a 236 front face (3086–3322). |
| F2 head band fussy, 271 below soffit | done | D2: soffit raked 24°, head trim 150 below the soffit, one cedar course with a black-mesh vent slot. |
| F3 lintel | done | Steel keeps the glass height. |
| F4 palette not in spec | partial | The palette lives in `render.py`, not in the spec. |
| F5 shrub on axis | done | Off-axis at w 500. |
| F6 cedar in three exposures | partial | Siding silvers; the soffit is honey-oiled and sheltered; one band course. |
| F7 meshes show | done | Black mesh. |
| F8 flashing nose / end dams | done | Hemmed; 25 end dams. |
| F9 paving module | partial | Planks 150 x 450, warm grey, in the note. The geometry is still continuous slabs. |
| F10 bright grate strip | open | — |
| F11 overflow | note | — |
| F12 green roof not legible | open | D7 not adopted yet. |
| F13 RG hardware reads as plumbing | partial | Beehive grate, stone collar, stone runnel. |
| F14 mulch flush | done | — |
| F15 clear glass vs plants | note | Bird markers. |
| F16 jambs, plinth, interlock, eave corner | partial | Jamb wall as massing only (plinth, cedar). |
| D5 west shading | open | — |
