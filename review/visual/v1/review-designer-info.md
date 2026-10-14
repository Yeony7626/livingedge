# Review: designer-info, round 2 (v1)

## 1. Scores (v0 → v1)

| Criterion | Score |
|---|---|
| 1. Line hierarchy | 4 → 6 |
| 2. Hatch | 4 → 6 |
| 3. Cut vs. not-cut | 5 → 7 |
| 4. Annotation | 3 → 5 |
| 5. Datum, scale, orientation | 1 → 5 |
| 6. Light and colour | 5 → 6 |
| 7. Composition | 5 → 6 |
| 8. Explode | 5 → 6 |
| 9. Analysis honesty | 3 → 6 |
| 10. Consistency | 2 → 5 |
| **Mean** | **3.7 → 5.8** |

**Round 1 points:**
- Fixed: 5 (3D tab).
- Mostly fixed: 2 (thermal).
- Partly fixed:
  - 1: 08 is inked, but 09 is unchanged.
  - 3: 02 is fixed; 06 and 08 are open.
  - 4: 08 is open.
  - 6: the 07 shards are open.

## 2. Keep

1. One renderer with inked, hatched caps across 01–07 and 10.
2. The 02 tag column: circles numbered bottom-up and aligned.
3. The 06 stepped legend, with its isotherm marks and boundary conditions.

## 3. Fixes (ranked)

1. **Collisions.**
   - Give all SVG text a 3 px paper halo.
   - Keep label columns 48 px clear of the drawing:
     - 02: "04 WARM SILL" sits on the slab corner (x 1100–1140).
     - 04: the YR 30 tags overprint the canopy (y 230–256), clip at x 910, and their leaders cross.
     - 03/06: "HEAD 0.48" sits on the canopy.
   - 01: the W circle sits on the caption (x 719, y 845).
   - 01: the Detail A leader ends at (1062, 550), not at the ring (1140, 612).
2. **09 Layers is still v0.**
   - Use the 08 ink drawing at 0.5 px @ 50%, with 3 px control-layer bands on the cut only.
   - Delete the hexagon tree and the tan block (x 682–745).
   - Draw air in ink, not red.
3. **08 sheet.**
   - Wrap the labels in a 260 px column; 06 and 07 truncate at x 1090.
   - Use circled tags in assembly order.
   - Replace the red dotted "THRESHOLD 12" (y 368) with an ink dimension.
   - Delete the crosshairs (x 15–25) and the stray line at x 818.
   - Hatch the EPS to §2; the crosshatch reads as timber end grain.
   - Add datums, W/E and a title block (this also fixes "100 mmD02").
4. **One furniture component for every view.**
   - Datums, the scale bar and W/E are missing in 04, 05 and 07.
   - Run each datum line to the W cut face at its true level. In 01 the lines stop about 90 px short.
   - 10: the W mark hides under the controls (y 862).
   - 06: the panel sits under the nav. Set the sticky `top: 88px`.
5. **Thermal.**
   - 11: move the legend off the field (x 18–278, y 650–765).
   - 11: the 0 °C and 11.9 °C isotherms look identical. Label them and draw them at 0.75 px and 1.5 px.
   - 11: start the ramp at inferno 0.1, so −7 °C does not read as a void.
   - 03/06: the field fills under 2% of the frame. Add a 280×200 2D inset of the cut.
6. **Colour and restraint.**
   - Red means four things (threshold, failure, ageing, air). Use one red subject per view.
   - 01/02: set "0.48 head" in ink.
   - 07: draw the ghosts as 15% ink outlines, without peach fill or bloom. Delete the shards (x 735–845, y 660–705).
   - 05: the streaks read as white stipple. Draw them as 0.5 px `#3D6E8F` @ 20%.
