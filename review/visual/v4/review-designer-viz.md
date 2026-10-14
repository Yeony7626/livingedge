# designer-viz, round 5 (v4)

## 1. Scores

1 Lines 7 · 2 Hatch 7 · 3 Cut 7 · 4 Annotation 6 · 5 Datum 7 · 6 Render 7 · 7 Composition 6 · 8 Explode 7 · 9 Analysis 8 · 10 Consistency 7

**Mean: 6.9** (round 4: 6.7)

**Round 4 points:**
- **Partly fixed:**
  - 1 (vignette): the card is gone, but a paper rim now rings a dark pillow. The white 03 caption (505–735, 100–145) is lost on #F2F1EC, and the 03 legend ticks are clipped at x 1392.
  - 6 (light): the bubbles are fixed. The 01 landing is still flat (#928C83–#9E9F9B), and the 05 landing is uniform (#8E8E8C–#959DA0) with no sheen.
- **Mostly fixed:**
  - 2 (warmth): the interior is #765D45, but the spill floods the whole exterior landing (#584A41 at 03 (1000,620)).
  - 3 (collisions): the datum stack and 08 are fixed.
  - 4 (explode): AO is on and the gaps are even, but the trench is still flat #685544 (02 (800,760)).
- **Fixed:** 5 (07 shards).

## 2. Keep

1. **04 bubbles:** the split rims, YR 0 | YR 30 and the numbered tags.
2. **01 / 10:** the AgX grade, cedar grain, ragged break and meadow, plus the lens with the red-hatched 12 mm sill.
3. **03 / 06:** data only on the cut, a warm room and white night lines.

## 3. Fixes, ranked

1. **Night goes full-bleed (03, 06).**
   - Set `uVig = 0`. Transition the section `background-color` to #111923 with the same `k` (400 ms), and the text to #E6E3DC.
   - Every overlay becomes legible.
   - Inset the 03 legend 24 px, clear of the canopy at (1360, 170–230).
2. **Pool the spill (03, 06).**
   - Replace the `RectAreaLight` with a #FFC58A `SpotLight` inside the glass at y 1.2 m: angle 0.9, penumbra 0.8, distance 3.5, decay 2, `castShadow`.
   - Targets: ≈#3A2F25 at the sill, and cool #1E242C beyond 2 m. The sash shadow falls on the granite.
3. **Day key-to-fill (01, 04, 10).**
   - For the sun state, set `environmentIntensity` 0.45, hemi 0.25, sun 4.2 and `shadow.radius` 2.
   - The meadow casts shadows via an alphaTest `customDepthMaterial`.
   - Targets: lit landing ≈#B1AA9F, shadow ≤#77726A.
4. **Collisions.**
   - Add the scale bar and the W–E arrow to the label solver:
     - 03: "THRESHOLD 13.6 °C" overprints "1 M" (1170–1350, 680).
     - 06: the W arrow strikes "THRESHOLD" (626–700, 565–590).
   - The datum labels cross the bed outline in 01 (520–715, 770–795), 04 (65–255, 700–730) and 07 (537–730, 703–733). Use a 3 px paper halo by day and 2 px #111923 at night.
   - 11: move the card off the domain (833–1041, 650–765) to y ≥ 790. Put a paper halo on "11.9 °C", not a dark one on yellow.
5. **Wet read (05).**
   - On up-facing wet faces, use `pud = smoothstep(.55,.75,noise(xz*1.5))*wet`, then albedo ×(1 − 0.25·pud) and roughness `mix(r, .04, pud)`.
   - Use a PMREM env from a #EEF0F0 horizon to a #9AA3A8 zenith.
   - Darken wet cedar by 15%.
6. **Explode residue (02, 07).**
   - Stipple the trench top in #5A4A3C.
   - Drop ghost edges under 40 px or near view-parallel. These are the stroke bundles at 02 (690–750, 760–815) and (935–970, 690–715), and at 07 (690–760, 640–700).
   - Draw the 07 ghost bed under the datum halos.
