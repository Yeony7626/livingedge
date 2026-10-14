# 17 — Graphic standard (screen): line, hatch, annotation, render, explode, overlays, rubric

This file builds on `16-axo-section-graphics.md` (projection, cut-face basics, 45° light, palette, the 12 renderer rules) and does not repeat it. Where a value here differs from 16, this file wins. **[practice]** marks values that no fetched source states and that are studio convention or derived judgement. It also respects SPEC §5: line before fill, colour carries information, and line style shows confidence (solid = calculated, dashed = qualitative, dotted = illustrative). Because dashed lines are reserved for confidence, the drafting standard below avoids dashes for anything else wherever it can.

## 0. Basis: paper pens and screen pixels

- **Pen series.** ISO 128-20 uses 0.13 / 0.18 / 0.25 / 0.35 / 0.5 / 0.7 / 1.0 / 1.4 / 2.0 mm, with each step about √2 apart. Extra-wide, wide and narrow lines sit in a **4:2:1** ratio ([search summary of ISO 128-20, law.resource.org IS 10714-20](https://law.resource.org/pub/in/bis/S01/is.10714.20.2001.pdf)). A US NCS office reports using 0.18 Fine, 0.25 Thin, 0.35 Medium, 0.50 Wide and 0.70 Extra Wide ([AUGI](https://forums.augi.com/archive/index.php/t-57882.html)). LibreCAD's ISO mapping assigns 0.70 to cutting and section lines, 0.35 to visible outlines, and 0.18 to dimensions and leaders ([LibreCAD](https://docs.librecad.org/en/2.2.0_a/_sources/appx/lines.rst.txt)).
- **Pens by role at detail scale.** Primary cut 0.70, secondary cut 0.50, seen 0.35, dimensions and leaders 0.25, hatch 0.13–0.18, ground 1.0–1.4. When the drawing gets smaller, shift the whole set down one step, and below about 0.13 mm delete texture rather than thin it ([learnarchitecture](https://learnarchitecture.net/articles/39292-architectural-line-weights.html)).
- **mm to px.** CSS fixes 1 px at 1/96 in, so 1 paper mm is 3.78 px. On that basis, 1:5 gives 0.76 px per model mm and 1:10 gives 0.38. Our **detail zoom of 0.4–0.6 px/mm** therefore sits between 1:10 and 1:6.5, so it uses the 1:10 pen set. Our **fragment view of 0.15 px/mm** is about 1:25, so it uses the 1:20 set shifted down one step.
- **Hairlines.** A proposed CSS `hairline` is "the thinnest width that the UA believes is recognizable" ([W3C CSS thread](https://lists.w3.org/Archives/Public/public-css-archive/2019Mar/0166.html)). WebGL ignores `linewidth`, so ink lines in three.js must be quad lines (`LineSegments2`/`LineMaterial`), never `LineBasicMaterial` ([three.js docs](https://threejs.org/docs/#api/en/materials/LineBasicMaterial.linewidth); not re-fetched here). In SVG, use `vector-effect: non-scaling-stroke` (see research 05).

## 1. Line-weight table (CSS px)

Strokes stay screen-constant **within** a zoom band and step **between** bands, the way Revit gives each pen a width per view scale ([learnarchitecture](https://learnarchitecture.net/articles/39292-architectural-line-weights.html)). Ink is `#1E1E1E`.

| Role | ISO type | Paper pen (1:5–1:10) | **Detail** 0.4–0.6 px/mm | **Fragment** ≈0.15 px/mm |
|---|---|---|---|---|
| Cut outline (each material boundary on the cut plane) | continuous, wide | 0.50–0.70 | **2.0** | **1.25** |
| Ground / grade line at the cut | continuous, extra-wide | 1.0 | **2.5** | **1.75** |
| Cut joints (lamellae, ply lines, laps, beads inside one cut solid) | continuous, narrow | 0.25 | **0.75** | **0.5** |
| Silhouette (outer profile of seen solids) | continuous, medium | 0.35 | **1.0** | **0.75** |
| Creases (inner seen edges, one per SPEC §5.5) | continuous, narrow | 0.18–0.25 | **0.6** | **0.5 @ 70%** |
| Beyond (far face and background) | continuous, narrow | 0.13–0.18 | **0.5 @ 50%** | **0.5 @ 30%** |
| Hatch | continuous, narrow | 0.13 | **0.5 @ 60%** | tint only (§2) |
| Dimensions, extension lines, leaders | continuous, narrow | 0.18–0.25 | **0.75 @ 80%** | **0.75 @ 80%** |
| Datum and level lines | long-dash-dot, narrow | 0.18 | **0.75**, 16-3-2-3 px | **0.75** |
| Break line (soil or member termination) | zigzag or freehand | 0.18 | **0.75** | **0.5** |
| Cutting-plane marker ends | chain, wide ends | 0.70 | **2.0** | **1.5** |

The detail column keeps the ISO 4:2:1 ratio: cut 2.0, silhouette 1.0, hatch 0.5. Hidden edges are omitted: dashes belong to the confidence styles. Above 1.0 px/mm (closer than about 1:4), keep the detail values and let the hatch spacing grow **[practice]**.

**DPR rule [practice]:** on 1× screens, render any width under 1 px as 1 px with alpha set to the width, so 0.5 becomes 1 px at 50%. On 2× screens and above, use the true width. Never go below 1 device pixel.

## 2. Hatch library (cut faces only)

The patterns are the long-standing drafting forms: earth as long-and-short diagonals, fill as angular fragments, sand and screed as stipple, rigid insulation as 45° lines plus dots, batts as a zigzag, end grain crossed, steel as close 45° lines ([draftsperson .PAT set](https://blog.draftsperson.net/material-hatch-patterns/)). Concrete is stipple plus triangles, and each layer gets its own hatch and a leader ([Studio Matrx](https://www.studiomatrx.org/students/drawing-fundamentals/material-hatching-patterns)). The material categories match BS 1192-3 / BS 8541-2 ([cadhatch](https://cadhatch.com/bs1192-hatch-patterns)). Exact spacings below are **[practice]**. Spacing is screen px at detail zoom, with patterns anchored to model origin. Line weight is 0.5 px at 60% ink unless stated.

| Material | Pattern | Spacing (detail) | Notes |
|---|---|---|---|
| Undisturbed earth / subsoil | 45° long-and-short dash pairs | 6 px | Ragged lower break per 16 |
| Topsoil / planting medium | earth pattern plus random dots | 6 px; dots 0.8 px | Darker tint `#6B5A47` |
| Hardcore / compacted fill | angular fragments, 4 angles | 8 px cell | |
| Drain rock / clear gravel | open rounded pebbles | 7 px cell | |
| Sand / bedding | fine even stipple | 3 px | |
| In-situ concrete (grade beam, slab) | aggregate stipple + small triangles + 45° lines for reinforced | 7 px cell; 45° at 8 px | |
| Screed / mortar / grout | dense fine stipple | 2.5 px | |
| Rigid insulation (XPS/EPS, mineral board) | 45° lines with dotted line between | 6 px | |
| Batt insulation | continuous loop or zigzag sized to the layer thickness | 1 loop per layer depth | 0.6 px |
| Sawn timber, cross-grain | crossed diagonals in each member | 5 px | |
| Sawn timber, along grain | wavy grain lines | 4–6 px, irregular | |
| Glulam header | lamella lines at true lam depth (0.75 px joints) + end-grain cross per lam | true scale | **[practice]** |
| Plywood / sheathing | ply lines at veneer pitch, or 2 lines if under 4 px thick | true scale | |
| Cedar cladding | end-grain cross or grain, as cut | 4 px | |
| Granite landing | sparse random short strokes, flat tint `#8E8C88` | 10 px cell | **[practice]** |
| Steel / aluminium, under 4 px thick | solid ink poché | — | Studio Matrx: steel solid |
| Steel / aluminium, 4 px or thicker | close 45° lines, opposite angle to concrete | 3 px | |
| Membranes (WRB, DPM, flashing) | single 1.25 px line, no hatch, drawn at minimum visible width whatever the true thickness | — | **[practice]** |
| Glass / IGU | two 0.75 px lines per pane, pale tint `#CFE0E3`, spacer solid | — | no hatch |
| Sealant / backer rod | solid ink / open circle | — | |
| Water (ponding) | broken horizontal lines | 4 px | water colour (§6) |

**Fragment view:** if a pattern's spacing would fall below 3 px, drop it to a flat material tint plus outline. Fine hatch greys out at small sizes ([Studio Matrx](https://www.studiomatrx.org/students/drawing-fundamentals/material-hatching-patterns)).

## 3. Annotation spec

- **Heights.** ISO 3098 uses 2.5 mm for notes and dimensions, 3.5 mm for secondary titles and 5 mm for primary titles, with a stroke of about h/10 ([draftsperson](https://blog.draftsperson.net/text-heights-in-drawings/)). At 96 dpi those are 9.4, 13.2 and 18.9 px. The screen floor is 11 px, so use **notes 12 px, dimensions 11 px, tags 11 px semibold, sub-titles 14 px, titles 19 px**. Text is annotative: it stays the same size at every zoom. Use one sans with tabular figures.
- **Leaders [practice].** 0.75 px, straight, at 30°, 45° or 60° only, with a 6 px horizontal shoulder into a text column aligned outside the drawing. Leaders never cross. Use a 3 px dot where a leader lands inside a material and a 6 px open arrow where it lands on an edge.
- **Number tags.** An 18 px circle with a 0.75 px stroke and a numeral, keyed to a legend, matching DETAIL's 1:20 numbered keys ([Leeds Beckett on DETAIL](https://libguides.leedsbeckett.ac.uk/az/detail-magazine), unverified per 16). Number in assembly order from outside to inside and from bottom to top. The hero takes at most 10 tags.
- **Datums.** Spot levels use a small triangle or cross with the value beside it ([draftsperson FFL](https://blog.draftsperson.net/what-does-ffl-mean-on-a-drawing/)). Use a 7 px filled triangle on a datum line, with values in metres to three decimals relative to FFL ±0.000. Mark FFL, top of sill, top of landing, finished grade and underside of footing **[practice]**. The 12 mm threshold is a dimension, not a level.
- **Scale, orientation, sections.** Ratio scales mean nothing at variable zoom, so a **graphic scale bar** that updates with zoom is mandatory. A North arrow goes with the scale ([Studio Matrx symbols](https://www.studiomatrx.org/guides/construction-drawing-symbols-homeowners-should-know)). In a section, mark **E** and **W** at the two ends instead of a north arrow. The key-plan section marker uses two bubbles on the cut line (`A / sheet`) ([LibreTexts](https://workforce.libretexts.org/Bookshelves/Arts_Audio_Visual_Technology_and_Communications/Tutorials_of_Visual_Graphic_Communication_Programs_for_Interior_Design_(Cho)/01%3A_Part_One._AutoCAD/07%3A_Chapter_7._Symbols_and_prints)).
- **Title block** (Draft sheet): title, detail number, reference scale at 100%, date, revision, the sources/confidence key, and the climate state shown.

## 4. Render spec (rendered section-box axo)

- **Light.** Use a sun and sky dome. Vancouver is at 49.3° N, so the noon sun stands about 64° high at the June solstice, 41° at the equinoxes and 17° at the December solstice. Default to the equinox sun from upper left, as in 16. Add a cloudy-sky IBL for the overcast states. A sun at about 55° or a cloudy HDRI is the standard clay-render setup ([myarchitectai](https://www.myarchitectai.com/blog/clay-rendering)).
- **Grading.** Desaturated and natural, in the manner of MIR, whose images run on "rich atmosphere and evocative natural settings" ([Architizer](https://architizer.com/blog/practice/materials/the-art-of-rendering-mir/)). Forbes Massie works the same way, with grain and a desaturated palette ([Dezeen](https://www.dezeen.com/2016/07/04/forbes-massie-cgi-renderings-architecture-protein-studios-gallery-london-exhibition-seduction-of-light/amp/)). Use AgX or ACES filmic tone mapping, saturation 0.85, no bloom **[practice]**.
- **AO.** Use screen-space GTAO/SSAO with a radius of about 150 mm in model units and an intensity that darkens concave corners by 10–15%, never more. The AO pass runs on lit surfaces only, never on the cut.
- **Materials.** Use real albedo and roughness, with no reflections stronger than glass. Detail lives in roughness, not in bump. Cedar, granite and concrete get true-scale texture. Glass is 40% clear with a faint Fresnel.
- **Cut face.** Cap the cut with an **unlit** material: the material tint from 16 with the §2 ink hatch and a 2 px outline. A capped section seals the cut and prevents light leaks, and a neutral cap material is the norm ([Novedge on V-Ray Clipper](https://novedge.com/blogs/design-news/v-ray-tip-v-ray-clipper-non-destructive-render-time-sections-with-capping)). The cut is the only flat, ink-drawn plane in a lit picture, which is how it reads as "drawing". Do not render it white, because white competes with the sky and paper.
- **Background.** Flat paper `#F4F1EA`, no sky image. The meadow fades into the paper toward the far end, and the soil ends in a ragged break.
- **Entourage.** At most one figure in line or silhouette and one tree, plus the meadow, which is instanced grass in two tints. No cars, birds or lens flare.
- **Weather and atmosphere [practice]:**

| State | Sky / exposure | Fog | Surfaces |
|---|---|---|---|
| Sunny | sun on, 0 EV | none | dry |
| Overcast (default) | IBL only, −0.3 EV | exp. fog, far end at 30% | dry |
| Rain | IBL, −0.7 EV, cooler white balance | 45% at far end | wet: albedo −15%, roughness ×0.4; streaks 0.5 px at 75°, 20% alpha |
| Winter night | sky deep blue-grey, −2 EV; interior 2700 K emissive glow; image white balance ≈5200 K so the interior reads warm ([CGArchitect](https://forums.cgarchitect.com/topic/26566-pgraphic-exposure-and-whitepoint-settings)) | light | thermal flood on the cut (§6) |

A cool exterior against a warm interior is the reliable evening contrast (search summary, [Studio Matrx lighting](https://www.studiomatrx.org/students/architectural-visualization-rendering/interior-and-artificial-lighting)). Light colour and data colour never mix: the glow is light, and the false colour lives only on the cut.

## 5. Explode spec

- Explode parts along their own assembly axis and in reverse assembly order: slabs and landings go up (+Z), cladding and the wall leaf go out (+X), and the header goes up. Parts move "in the order and direction in which they fit" ([search summary, wbez axonometric](https://tools.wbez.org/exploded-axonometric-drawing)).
- Use **equal gaps**, because "Consistency in the offset is everything." Archezin uses 80–120 px at A3 150 dpi ([Archezin](https://archezinternational.com/?p=8324)). For us that is a 48–72 px screen gap at hero size, constant in px.
- Draw **connector lines** from the corners of each moved part to its home position: 1 px light grey ([Archezin](https://archezinternational.com/?p=8324)). Make them solid, not dashed, because dashes are taken by SPEC §5.6.
- **Ghost** the unmoved context at 20% unlit, with no hatch **[practice]**. Tags travel with their parts. Keep the ground shadow on the base so nothing floats ([Archezin](https://archezinternational.com/?p=8324)). Use six to eight groups at most, one accent colour, and scroll-linked motion with 700 ms eases between stops (SPEC §5.3).

## 6. Analysis overlay spec

**Rain.** One water colour, `#3D6E8F`, kept distinct from the planting green.
- Routes are polylines with arrowheads every 80 px. Weight scales with flow: 1, 1.5 or 2.5 px, the way thicker lines mark primary movement ([Illustrarch](https://illustrarch.com/articles/architectural-diagrams/74847-circulation-flow-diagrams.html)). Line style carries confidence.
- Drip edges get a 4 px open circle, splash zones a dotted arc, and ponding a 25% fill with the water hatch.
- Every arrow type appears in a legend, as in [Philadelphia Water](https://water.phila.gov/pool/files/sample-conceptual-stormwater-management-plan.pdf).

**Thermal.**
- Colour the cut faces only, at 85% opacity, with the hatch dropped to 25% and the outlines kept on top.
- Use a perceptually uniform sequential map that reads from dark purple (cold) to yellow-white (warm), close to iron/inferno. The iron palette survives greyscale where rainbow does not ([NHBC thermal imaging](https://www.nhbc.co.uk/binaries/content/assets/nhbc/foundation/thermal-imaging-report-guide.pdf)). Rainbow and jet are banned ([Crameri et al. 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7595127)).
- The span is **fixed** to the boundary conditions, for example the NFRC −18 / +21 °C pair in research 15, never auto-ranged. Fixed spans are what make comparison defensible ([search summary, inspectandtest](https://inspectandtest.net/guides/what-is-a-thermal-image/)).
- Flood in stepped bands at **2 °C**, with isotherm lines every 2 °C at 0.5 px and every 10 °C highlighted at 1 px with labels. Flixo highlights every n-th isotherm and supports user-defined special isotherms ([Flixo manual](https://www.flixo.com/manual/flixo8/en/styledialogs_isotherms.htm)). THERM exposes min, max and interval ([LBNL](https://windows.lbl.gov/isotherm-display-control)).
- Add **special isotherms** in a contrast colour and **solid** line: the critical surface temperature for fRsi 0.70, θe + 0.70(θi − θe), which is 12.6 °C at −5/20 ([ISO-Chemie](https://www.iso-chemie.eu/en/isopedia/building-physics/temperature-factor-frsi)) and 9.3 °C at −18/21; and 0 °C.
- The legend is a vertical stepped bar with ticks every 5 °C. It states both boundary conditions, the source (computed or THERM) and the minimum fRsi.

**Ageing (0–30 years).**
- Use keyframes at years 0, 1, 5, 10, 20 and 30 on a scrubber.
- In the render, materials change state, for example cedar greying.
- In the line views, changed elements take the single highlight colour and a "yr N" tag. Line style carries confidence.
- Small multiples (0/10/30) appear side by side in the Draft sheet **[practice]**.

## 7. Scoring rubric (each criterion 0–10)

| # | Criterion | What a **9** looks like |
|---|---|---|
| 1 | Line hierarchy | Cut, silhouette and hatch sit visibly in 4:2:1. Ground line is heaviest. Beyond recedes. Values match §1 in both zoom bands, with no device-pixel dropouts. |
| 2 | Hatch legibility | Every cut layer gets the §2 hatch, clipped and anchored. Nothing seen beyond the cut is hatched. Membranes and glass are readable. The fragment view falls back to tint cleanly. |
| 3 | Cut vs. not-cut | In both the render and the line drawing, the cut plane is read in under a second. The cap is unlit and inked. No AO or light leaks on the cut. |
| 4 | Annotation | Text sizes are 11/12/14/19 px. Leaders are straight, don't cross and sit in an aligned column. Tags are numbered in assembly order, ≤10, with a legend. |
| 5 | Datum, scale, orientation | FFL ±0 and the key levels are shown. A live scale bar is present. E/W are marked. The 12 mm threshold is dimensioned. The title block is complete. |
| 6 | Render light and colour | One consistent sun, latitude-true. Grading is desaturated and natural. AO stays subtle. Materials are plausible but quiet. Only one accent hue appears. |
| 7 | Composition and restraint | The block floats with margins and a ragged soil break. The meadow fades into the paper. Entourage is ≤1 figure and ≤1 tree. Nothing overlaps the cut. |
| 8 | Explode | Parts move along true axes in reverse order with equal gaps. Connectors are grey. Context is ghosted. Tags travel with parts. The motion is smooth and reversible. |
| 9 | Analysis honesty | Each overlay has a legend. The thermal span is fixed. The map is perceptually uniform with 2 °C steps, and the fRsi isotherm is shown. Confidence styles are applied. Light colour and data colour are never mixed. |
| 10 | Cross-view consistency | The render, Draft sheet, ink axo and overlays share the same tokens: ink, palette, tags, line roles. The same element looks like itself in all three. Weather states read correctly at a glance. |

Score anchors: **0–3** means a convention is missing or broken, **5** means present but inconsistent, **9** means as described above, and **10** means publishable beside a DETAIL or detail-library.co.uk sheet.

Gaps: the line-type dash lengths in ISO 128-20 itself, BS 8541-2 symbol geometry, THERM's colour-flood palette and DETAIL's house style were not verified from primary text. Their values here are derived or marked **[practice]**.
