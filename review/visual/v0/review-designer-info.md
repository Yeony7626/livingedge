# Review: designer-info, round 1 (v0)

## 1. Scores

| # | Criterion | Score |
|---|---|---|
| 1 | Line hierarchy | 4 |
| 2 | Hatch legibility | 4 |
| 3 | Cut vs. not-cut | 5 |
| 4 | Annotation | 3 |
| 5 | Datum, scale, orientation | 1 |
| 6 | Render light and colour | 5 |
| 7 | Composition and restraint | 5 |
| 8 | Explode | 5 |
| 9 | Analysis honesty | 3 |
| 10 | Cross-view consistency | 2 |
| | **Mean** | **3.7** |

The landing page and the tool look like two different products. 01 is close to the reference bar. 08–10 look like a default diagram tool.

## 2. Keep

1. **01 hero block.** Inked white cut caps, a photographic meadow on warm paper, a ragged soil break and a block that floats with air around it. This is the house style; every other view should be measured against it.
2. **Landing typography.** A grotesk display head, 11 px uppercase mono captions with middots (01 bottom: "AXO 01 · THRESHOLD TO GARDEN…") and thin condensed stat numerals (01 "12 / 692 / 0.48", 04 "30", 07 "07"). Keep these three voices and use no others.
3. **One red accent with one meaning.** Red appears only on the threshold and the failing fRsi (01 stat 0.48, 02 tag 04, Detail A ring). Keep it to that.

## 3. Fixes (ranked)

1. **08 Draft / 09 Layers: redraw in the hero's ink language.**
   - Use paper `#F4F1EA`. Apply the §1 line weights: cut 2.0, ground 2.5, silhouette 1.0, hatch 0.5 @ 60%. Add the §2 hatches in place of the flat tan fills.
   - Delete the hexagon tree and the tan block at x≈680–745. If a tree is needed, draw it as a 0.5 px @ 50% "beyond" outline.
   - 09 must differ from 08: show the ink drawing with the layers as 2 px coloured bands on the cut only.
   - The air barrier is red, which collides with the accent. Draw it in ink as a 1.25 px membrane line with a tag.
2. **Thermal map (03, 06, 11).**
   - Replace the jet/rainbow map with inferno, stepped at 2 °C, on a fixed span of −7 to 20 °C.
   - Isotherms: 0.5 px every 2 °C, 1 px with labels every 10 °C.
   - Add solid special isotherms at 0 °C and 11.9 °C (fRsi 0.70 at −7/20).
   - Legend: a vertical stepped bar with ticks every 5 °C, stating the boundary conditions and the source (06 right column, 11 bottom-left).
   - 11: clip the stray model lines that run past the domain at y≈345–430, and the full-height line at x=530.
   - 03: remove the ghosted light-theme captions bleeding through the dark card (x≈520, y≈335 and the bottom line). Make the interior glow neutral, not orange, so light and data do not mix.
3. **Annotation system.**
   - 02: leaders must be solid 0.75 px @ 80%, not dashed (dashes mean confidence). Use 18 px circle tags with 0.75 px strokes.
   - 02: the tags read 06 / 05 / 04 / 02 / 03 / 01 from top to bottom. Make the column monotonic.
   - 06: move "HEAD 6.1 °C" off the canopy into a right-hand column with a 6 px shoulder.
   - Use the same tags in 08 and 10.
4. **Datums, scale and orientation (01, 08).**
   - Add long-dash-dot 0.75 px datums with 7 px filled triangles for FFL ±0.000, top of landing, finished grade and underside of footing. Set the values in 11 px tabular mono in the left margin.
   - Add a 0–500 mm scale bar next to the 01 caption, and a live one in 08.
   - Mark **W** at the garden end and **E** at the interior end.
   - Dimension the 12 mm threshold inside the Detail A bubble.
   - 08: add a title block at the bottom-right.
5. **10 3D: use the hero renderer.** Use the same ortho iso camera, section box, paper and inked caps. Remove the low-poly tree, the brown cylinders and the primary blue/red/yellow slabs. Frame the block with ≥64 px margins; it is currently cropped on three sides.
6. **05 rain, 04 ageing and 07 build.**
   - 05 rain streaks: cut the count by about 70%. Draw them at 0.5 px, 75°, 20% alpha, and mask them behind the cut.
   - 05 water route: draw it in `#3D6E8F` with arrowheads every 80 px and drip circles.
   - 05 layout: add a left text column with a route legend so the section matches 04 and 06. Add 96 px of top margin, because the canopy now touches the nav.
   - 04: place the scrubber ticks at true positions (0/1/5/10/20/30; equal spacing for 0/5/15/30 is misleading). Tag the changed parts "yr 30" in the accent colour. Delete the "Cedar 140,138,133" RGB text.
   - 07: hatch the flat brown slab, remove the stray shards at x≈760, y≈680, and tag the stage-7 part.
