# designer-viz, round 4 (v3)

## 1. Scores

1 Lines 7 · 2 Hatch 7 · 3 Cut 7 · 4 Annotation 5 · 5 Datum 7 · 6 Render 7 · 7 Composition 6 · 8 Explode 6 · 9 Analysis 8 · 10 Consistency 7

**Mean: 6.7** (round 3: 6.6)

**Round 3 points:**
- **Fixed:** 1 (compositing). The 01 glass is #C7C9C5 and the ghosts are silhouettes.
- **Mostly fixed:** 3 (rain). There is still no wet sheen.
- **Partly fixed:**
  - 2 (night): the frame is a hard card, and the warmth is lost.
  - 4 (explode): AO is off and the trench is bare.
  - 5 (light): no meadow shadow.
  - 6 (ageing): the 04 bubbles show no split.

## 2. Keep

1. **01 / 10:** the AgX grade, cedar grain, ragged soil break, meadow, and glass that reads as glass.
2. **03 / 06:** data only on the cut, dark poche on uncomputed faces, white night lines, and the stepped legend.
3. **02 / 07:** silhouette ghosts. **05:** streaks with tails and a depth fade.

## 3. Fixes, ranked

1. **The vignette misses the frame edges (03, 05, 06).**
   - `r = length(vUv-0.5)/0.71` gives r = 0.70 at the edge midpoints, below the 0.82 start. The 03 edges are pure #111923, a hard card, and the 06 corners are #8C8F91.
   - Use `d=(vUv-.5)*2.; r=max(length(d), pow(max(abs(d.x),abs(d.y)),6.))` with `smoothstep(.50,.97,r)`.
2. **The night warmth is lost (03, 06).**
   - The `uNightS` desaturation runs on `gl_FragColor` after lighting, so the 2700 K light turns grey. The 03 interior slab at (1250,520) is #6C6A68.
   - Desaturate `diffuseColor` instead. Targets: ≈#7A6248 inside by the glass, and a pool of ≈#3A2F25 on the landing.
   - The glass is a grey beam (#999A9C at 03 (1100,450)). Exclude it from the desaturation. At night use #1A1D22, opacity 0.25 and emissive #FFC58A × 0.12. Move `spill` 0.05 m off the pane.
3. **Collisions.**
   - The FFL label overprints FINISHED GRADE: 04 (57–250, 715–725), 05 y 707, 06 y 617, 07 y 722 and 10 y 796. Set a 14 px minimum pitch with a dog-leg.
   - 08 / 09: the left labels clip at x 0 (y 457, y 720). Wrap at 26 characters and clamp to x ≥ 16.
   - 01: the W ring sits on "PANEL" at (718,337).
4. **Explode (02).**
   - AO is still off. Wrap `gtao.renderOverride` to render normals per group, with `clippingPlanes = g.planes` and `autoClear = false`.
   - The trench at (1050,650) is flat #3E3125. Cap it with the soil tint and stipple.
   - T overlaps F at x 860–940, y 515–590. Solve the lifts from the projected boxes for 64 px gaps.
5. **07 shards.** Brown shards persist below the soil break at x 745–830, y 700–750.
   - Clip the lifted groups and their lines against the fixed world box.
   - Apply the ragged discard at `uYB`, not `uYB + dy`.
6. **Sun and wet surfaces (01, 05, 04).**
   - The 01 landing is flat (#958F86–#9F9A91): the sun at (−5, 3.7, −4) throws shadows away from the camera. Swing it to (−6, 3.7, +1.5) so the meadow shadow runs along the landing at ≤ #7A756D.
   - 05 wet faces: roughness 0.12 and `envMapIntensity` 0.9, with a #EEF0F0 storm horizon, for a sheen.
   - 04 bubbles: a 1 px ink diameter, with the left half rendered at `uAge = 0` via `setScissor`.
