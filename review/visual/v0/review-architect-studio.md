# Review: architect-studio, round 1 (v0)

## 1. Scores

| # | Criterion | Score |
|---|---|---|
| 1 | Line hierarchy | 3 |
| 2 | Hatch legibility | 3 |
| 3 | Cut vs. not-cut | 5 |
| 4 | Annotation | 3 |
| 5 | Datum, scale, orientation | 1 |
| 6 | Render light and colour | 6 |
| 7 | Composition and restraint | 6 |
| 8 | Explode | 4 |
| 9 | Analysis honesty | 3 |
| 10 | Cross-view consistency | 2 |
| | **Mean** | **3.6** |

The landing hero shows the right ambition. The tool looks like a different, earlier product.

## 2. Keep

1. **01 hero.** Keep the floating section-box on paper, the ragged soil break, the meadow, and the Detail A circle bubble with the red 12 mm threshold as the only accent. This is the monograph image.
2. **02 explode.** Keep the right-hand label column: an aligned, uppercase mono column, numbered, with the threshold in the accent colour.
3. **06 winter copy.** Keep "a screening, not a certified THERM run", the fixed −7/20 °C span, and the fRsi rings with values at the head and threshold. The tone is honest.

## 3. Fixes, ranked

1. **Rebuild the tool renderer to match the landing (08, 09, 10).**
   - 08 and 09 are identical flat-fill blobs. Draft must become ink: cut 2.0 px, ground 2.5 px, silhouette 1.0 px, hatch 0.5 px at 60% (§1), with the §2 hatches. Layers keeps the same linework and adds the tints.
   - In 10, replace the hexagon tree, cylinders, translucent box and saturated blue/yellow/red with the hero's capped section-box axo, made orbitable.
   - Draw the tree as a 1 px ink line elevation at 30% alpha, as in the reference line axos.
   - Also in 01, move the cut caps off white and onto the §2 tints. Drain rock and EPS currently read the same (01, around 1000,640).
2. **Make the thermal field honest (03, 06, 11).**
   - Replace the rainbow with inferno, in stepped 2 °C bands.
   - Draw isotherms at 0.5 px every 2 °C, plus 1 px labelled lines every 10 °C.
   - Add solid special isotherms in white at 11.9 °C (fRsi 0.70 at −7/20) and at 0 °C.
   - Use a vertical stepped legend.
   - In 06, the field stops at hard vertical edges (about x 510 and x 710). Draw a 1 px grey domain frame there, labelled "adiabatic crop".
   - In 11, clip the model lines that spill outside the domain (y 345–435, x 0–59) and remove the full-height line at x 530.
3. **Fix the explode (02).**
   - Number the tags 01–06 from bottom to top. At present, 02 sits above 03.
   - Make the leaders solid, 0.75 px at 80%, because dashes are reserved for confidence.
   - Add 1 px light-grey connectors from the corners of each moved part to its home position.
   - Ghost the home positions at 20%.
   - Make the gaps equal at 56 px. The door currently touches the head while the sill floats about 20 px off.
4. **Give the rain a legend and a direction (05).**
   - Add a legend for direct rain, wind-driven rain, run-off and drained route.
   - Put arrowheads every 80 px, with weights of 1, 1.5 and 2.5 px by flow.
   - Add a labelled "W, westerly" wind arrow at the left edge.
   - Thin the streaks to 0.5 px at 20% alpha, because the flakes bury the head (820–950, 100–300).
   - Start the frame below the nav, because the canopy is clipped at y 65.
5. **Show change against a ghost (04, 07).**
   - In 04, overlay the year-0 outline at 20% and tag the changed elements "yr 30" in the accent colour. Set the ticks to 0/1/5/10/20/30 (now 0/5/15/30).
   - The copy cites a 6 m tree and 90 mm of sediment, but neither is drawn. Draw them from the model or cut the sentence.
   - In 07, ghost the future parts at 15% so the head does not float unsupported. Show "07 / N".
6. **Add datums, scale and orientation to every section (01, 05, 06, 08).**
   - Add FFL ±0.000, top of landing, finished grade and underside of footing as 7 px triangles.
   - Mark E and W at the two ends of the cut.
   - Add an axonometric scale bar along the cut axis.
   - Dimension the 12 mm threshold inside the Detail A bubble.
   - In 03, fix the dark-on-dark caption at y 855 and remove the ghost "DETAIL A" text at (520, 335).
