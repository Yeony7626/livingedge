# Round 1 (v0): envelope architect review

## Scores (§7 rubric)
| # | Criterion | Score |
|---|---|---|
| 1 | Line hierarchy | 4 |
| 2 | Hatch legibility | 4 |
| 3 | Cut vs. not-cut | 6 |
| 4 | Annotation | 3 |
| 5 | Datum, scale, orientation | 1 |
| 6 | Render light and colour | 6 |
| 7 | Composition and restraint | 6 |
| 8 | Explode | 4 |
| 9 | Analysis honesty | 4 |
| 10 | Cross-view consistency | 2 |
| | **Mean** | **4.0** |

## Keep
1. **The unlit, inked paper cap against the lit materials (01, 04).** The cut reads in under a second, and the ragged soil break floats the block well.
2. **The Detail A magnifier on the threshold (01).** The circle on the axo is tied to an enlarged bubble. This is the right device for a 12 mm junction.
3. **The thermal disclosure (06, 11).** The copy says "screening, not a certified THERM run", and gives the boundary conditions and the flow balance. The fRsi values check out: (13.6+7)/27 = 0.76 and (6.1+7)/27 = 0.48.

## Fixes, ranked
1. **The Draft sheet (08) is not a construction drawing.** It uses flat fills, one uniform thin grey stroke, and no hatch, labels or title block. Layers (09) is pixel-identical to it.
   - Redraw it in ink. Cut outlines 2.0 px `#1E1E1E`, joints 0.75 px, and the §2 hatches over pale tints.
   - Take the layer-key colours out of the base fills. Blue drain rock and yellow insulation currently pre-empt the water and thermal toggles. Keep colour for Layers only.
   - Replace the hexagon tree and the unexplained tan rectangle with a 0.75 px line tree, or delete them.
2. **No datums, scale or orientation anywhere.**
   - On 01, 08 and 11, add 7 px datum triangles at 0.75 px long-dash-dot with values to three decimals: FFL ±0.000, top of landing, finished grade (bed) and U/S grade beam.
   - Add a live scale bar, and **W | E** at the section ends.
   - In Detail A, dimension the threshold with ticks at "12". Replace "4X", which is meaningless at variable zoom, with a local scale bar.
   - Add the §3 title block to Draft.
3. **The hero hatches contradict the materials (01, zoom).**
   - The interior slab is cross-hatched, which is timber end grain. Use stipple and triangles.
   - The band below it uses the drain-rock circles, so no layer reads as the "graphite EPS" claimed in tag 02. Use 45° lines with a dotted line at 6 px on a grey tint.
   - The granite landing is single 45° lines. Use sparse strokes on `#8E8C88`.
   - The glulam head is uniform 45° lines. Draw lamella joints at true lam depth.
   - Keep the circles only for the landing bedding and the underdrain rock.
4. **The analysis overlays break §6 (03, 06, 11).**
   - The flood is rainbow/jet. Switch to inferno, in 2 °C stepped bands, on cut faces only.
   - The isotherms are dotted, which is the *illustrative* style, on a *computed* field. Make them solid 0.5 px, with every 10 °C at 1 px and labelled.
   - Add the fRsi 0.70 isotherm at 11.9 °C (−7/20) and the 0 °C isotherm, as solid contrast lines. Make the legend a vertical stepped bar.
   - In 11, clip the stray model lines that run past the domain (y≈345–432 to the left edge, and x≈530 to the page bottom). Label the white voids as "air cavity, λeq".
   - The landing page's "coldest 0.48" and the tool's "lowest 0.76" contradict each other. Name the junction in both places.
   - Rain (05): add a legend, arrowheads every 80 px and a 4 px drip-edge circle at the canopy nosing. The second dashed route at x≈948 sits on the room-side frame line and reads as water indoors. The rain streaks also overlap the head cut.
5. **The render's line hierarchy is inverted (01).**
   - The seen far edges of the landing and floor tops are drawn about 2.5 px, heavier than the cut outline. Set the cut to 2.0 px and the ground line *on the cut plane only* to 2.5 px.
   - Set seen silhouettes to 1.0 px and back edges to 0.5 px at 50%.
   - The 12 mm red sill smears at hero size. Draw its outline at 1.25 px ink, not a red fill.
6. **The explode (02, 07) does not follow assembly logic.**
   - The tag column reads 06, 05, 04, 02, 03, 01. Renumber bottom-up in assembly order.
   - Leaders are dashed, which is reserved for confidence. Make them solid 0.75 px at 30°, 45° or 60°, with a 6 px shoulder and a 3 px dot inside the material.
   - Gaps are unequal, from about 20 to 40 px, and the sill moves diagonally. Use equal 60 px gaps along +Z only.
   - Add 1 px grey solid connectors and ghost the context at 20%.
   - Remove the detached brown soil shards (02 bottom left, 07).
   - In 07, ghost the jambs and wall so the header does not float unsupported.
   - Red currently means tag, threshold and failure at once. Reserve it for the failure.
