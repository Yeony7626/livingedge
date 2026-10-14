# Review: designer-info, round 3 (v2)

## 1. Scores (v1 → v2)

Line 6→7 · Hatch 6→7 · Cut 7→7 · Annotation 5→6 · Datum 5→7 · Light/colour 6→7 · Composition 6→6 · Explode 6→6 · Analysis 6→7 · Consistency 5→6 · **Mean 5.8 → 6.6**

**Round 2 points:**
- Fixed: 2 (09 is the ink sheet).
- Mostly fixed: 3 (08), 5 (thermal).
- Partly fixed:
  - 1, collisions: 02 and 04 are fixed, with new ones below.
  - 4, furniture.
  - 6, colour: 0.48 is in ink; the 07 ghosts, the shards and the 05 streaks are unchanged.

## 2. Keep

1. **08/09:** the ink sheet with §2 hatches, circled tags, title block and scale bar. Tool and landing now read as one product.
2. **06:** the stepped legend, the 1:5 field bubbles, and red only on the failing head.
3. **01/03/10 furniture:** level-staff datums along the cut axis, a model-axis scale bar, W/E circles and text halos.

## 3. Fixes (ranked)

1. **Collisions.** Test label boxes against each other and offset overlaps.
   - 03 (1258, 653) and 06 (708, 521): the E circle prints over "THRESHOLD 13.6".
   - 02 (y 562/588): the T and F circles touch. Use a pitch of at least 32 px.
   - 08/09 (y 744): the title block covers T3. Move the block below the frame.
   - 08/09: M2 and T2 truncate at x 1078. Wrap them at 240 px.
   - 07: "NOW: …WAR" clips at x 1380.
   - 01/03/10: the datum line strikes through "−0.530 U/S BEAM", and the W ring touches that label.
2. **One leader rule:** horizontal from the label column, with at most one 45° dog-leg in a 48 px gutter.
   - 01 (y 612): the Detail A leader crosses 520 px of landing. Draw it straight from the bubble rim to the ring.
   - 02: the T leader slants over the slab.
   - 04: the leaders are 300 px diagonals.
   - 07: the NOW leader cuts through the canopy.
   - 08: F2 (y 582) and T3 (y 749) cross the whole section. Add the left label column.
3. **Ghosts and shards are unchanged.**
   - 02 (x 820–1140, y 255–440) and 07 (x 790–1090, y 360–670) still glow cream. Draw them as `#8C8579` @ 18%, `toneMapped: false`, with no bloom.
   - 07: clip the shards at x 735–830, y 700–750.
4. **One thermal legend component.**
   - 06 (y 493): the 0 °C stroke strikes through its tick label. End the stroke at the bar.
   - 06: the bottom swatch is black. Start it at inferno 0.1.
   - 11: the legend has lost its strokes. Its card also covers the domain corner (x 833–1041, y 191–305); move it below the domain.
   - 03: there is no legend. Add the 06 bar at 8×120 px.
5. **Furniture in every view.**
   - Datums are missing in 04, 05, 07 and 11.
   - 11 has no W/E and no scale bar.
   - 08: W and E are 9 px letters. Use 18 px circles.
   - 01/04/05/07/10: E floats mid-block. Place it 24 px past the interior end of the cut axis.
6. **Colour.**
   - 05 (x 730–1010, y 240–600): the rain is still white stipple. Draw it in `#3D6E8F`.
   - 03 is navy and 06 is #4A4A4A grey. Use one night token.
   - 01 bubble (x 520–600, y 195–230): red flecks sit on the white band.
   - 07: the arriving warm sill is pale yellow. Use 01's red hatch so it looks like itself.
   - 09: the yellow tint hides the EPS hatch; keep it at 25%. The checkboxes show unticked while the layers are drawn.
