# Review: designer-info, round 4 (v3)

## 1. Scores (v2 → v3)

Line 7→7 · Hatch 7→7 · Cut 7→7 · Annotation 6→6 · Datum 7→7 · Light/colour 7→7 · Composition 6→7 · Explode 6→7 · Analysis 7→7 · Consistency 6→7 · **Mean 6.6 → 6.9**

**Round 3 points:**
- 1 Collisions: **partly fixed.** Fixed: E vs THRESHOLD (03, 06), T/F pitch (02), title block vs T3 (08), U/S BEAM strike. New: datum overprints, W on the lens caption, E on the 11 scale bar, truncated 08 labels.
- 2 Leaders: **partly fixed.** 01 lens, 02 T and the 08 columns are fixed. 04 ALGAE and 07 NOW are still long diagonals.
- 3 Ghosts: **fixed** in 02. The 07 shards are **open**.
- 4 Thermal legend: **mostly fixed** in 06. The 11 card still covers the domain.
- 5 Furniture: **mostly fixed.** Datums are in every view. 11 W/E are bare letters.
- 6 Colour: **mostly fixed.** 03 and 06 now share #111923. The rain is faint. The 09 fill still erases the hatch.

## 2. Keep

1. **02:** the tag column with 12 px swatches, ≥40 px pitch and grey home outlines.
2. **06:** the stepped legend, the bubbles with 50 mm bars and rim-to-ring leaders, and red only on the failing head.
3. **08:** left and right label columns, 18 px W/E, a one-line title block and a live scale bar.

## 3. Fixes (ranked)

1. **Datum stack (new regression).**
   - In 04 (56–250, 712–725), 05 (540–730, 700–712), 06 (56–246, 612–622), 07 (546–737, 715–728) and 10, "±0.000 FFL…" and "−0.105 FINISHED GRADE" overprint at a 10 px pitch.
   - In 01 and 03 (x 501), the canvas edge clips the values.
   - Set a 14 px minimum label pitch and fan the leaders to their triangles. Inset labels 24 px from the canvas edge. Use identical text in every view.
2. **08/09 labels are truncated.** `shortName()` slices to 26 characters before `wrap()` runs, so line 2 never exists ("PLANKS 6", "SLAB 1", "TYPE 3 75 ON", "UNDER T").
   - Remove the slice and let `wrap()` make two lines of 26 characters.
   - The left column touches x 0; give it a 24 px viewport margin.
3. **04 bubbles (752–855, 218–600).** They have no rim, split line or leader. They sit over the slab and landing, and the top bubble is clipped at x 855.
   - Use 06's component: a 0.75 px rim, a vertical split with "0" and "30" inside, and a rim-to-ring leader.
   - Move the column clear of the model or shrink the bubbles to 96 px.
   - Caption "0 | 30", not "0 | NOW", to match the "YR 30" tags.
4. **Leaders.**
   - 04: the ALGAE leader runs from (322, 296) to (530, 590). Seat its tag at y 590 with a horizontal leader and one 45° dog-leg.
   - 07: the NOW leader runs from (807, 238) to (1065, 610). Do the same, and wrap the label to two lines; don't use an ellipsis.
   - 02: the M and E leaders cross about 300 px of trench. Anchor them at visible right-hand points, about (915, 690) and (1080, 740).
5. **11.**
   - The card covers the domain at (833–1041, 191–305) and hides "INTERIOR AIR · Rsi". Move it below the domain (y ≥ 810).
   - Add 24 px line samples for 11.9 °C and 0 °C.
   - The isotherm strikes through "11.9 °C · fRsi 0.70" at (792–910, 380). Lift the label 8 px and give it a halo.
   - E prints on "100 MM" at (1027, 778), and W is a 9 px letter. Use 18 px circles outside the frame corners and a 100 px bar.
   - The card reads "f_Rsi"; use a subscript.
6. **Colour residue.**
   - 09: the thermal fill is opaque (238, 227, 189) at (520, 560). Draw a 20% tint under the hatch pattern.
   - 07: delete the shards at (745–840, 705–750); they strike through the datums.
   - 07: the arriving sill is still pale yellow at (1010–1090, 575–615).
   - 05: rain streaks read as mist. Raise the opacity to 0.6.
   - 03 legend (1360, 105–230): add "°C" and a 0 tick, and keep it clear of the slab edges.
   - 01 (718, 337): the W ring sits on "SLIDING PANEL". 01/03/04/05/07/10: E floats on the slab top. Put both rings 24 px past the ends of the cut axis, outside the geometry.
