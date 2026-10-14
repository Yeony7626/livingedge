# designer-viz, round 1

## 1. Scores

1. Line hierarchy: 6
2. Hatch legibility: 5
3. Cut vs not-cut: 7
4. Annotation: 4
5. Datum, scale, orientation: 2
6. Render light and colour: 5
7. Composition and restraint: 6
8. Explode: 4
9. Analysis honesty: 3
10. Cross-view consistency: 3

**Mean: 4.5**

## 2. Keep

1. **01 hero:** the ortho block on paper, the white ink-hatched caps and the ragged soil break.
2. **01, Detail A bubble:** the 4× inset with the single red accent.
3. **04, paving by the door (x 500–560, y 540):** the staining and the silvered cedar. Ageing through material state is right.

## 3. Fixes, ranked

1. **10, the 3D tab, looks like a WebGL default.** Hexagonal tree, Lambert cylinders, wide FOV. Reuse the hero pipeline: materials, lights, caps, LineSegments2 ink, paper and an `OrthographicCamera` at the hero azimuth. Draw the tree as a 0.75 px line silhouette at 30% ink.
2. **There is no AO or contact shadow.** In 01: sill to landing, cladding to canopy, meadow base.
   - Chain `EffectComposer` (samples 4) → `RenderPass` → `GTAOPass` (radius 0.15 m, blend 0.6) → `OutputPass`.
   - Draw the caps in a second `RenderPass` with `clear: false` after the AO, so the cut stays flat.
   - Drop the hemisphere light from 1.15 to 0.35, the environment to 0.4, and raise the sun to 3.2, so the canopy shadow reads.
3. **Grading.** In 01 the cedar (x 1040–1125, y 175–300) is oversaturated orange, the canopy top is a flat black void, and the granite reads as timber planks.
   - Use `AgXToneMapping` at exposure 0.9.
   - Add a `ShaderPass` for saturation 0.85 and 2% grain.
   - Set the steel roughness to 0.55.
   - Give the granite a procedural speckle at true grain scale.
4. **The rain in 05 is cartoonish.**
   - Streaks: about 2 px at 70% alpha now; make them 0.5–0.75 px at 18%, one 75° slant.
   - Delete the ring sprites (x 740–830, y 590–640). They read as © glyphs.
   - Clip the rain behind the cut plane.
   - Replace the full-bleed blue panel, which crops the canopy at y 64, with cool paper `#DCE0E1` plus `FogExp2`.
5. **03 and 06 do not read as night.** Paving, canopy and meadow stay daylit.
   - Lower the exposure to about 0.3 and tint the meadow `#8796AB`.
   - Add a 2700 K `RectAreaLight` inside the glass.
   - Turn the uncomputed caps into dark poché `#2A2F38`.
   - Remove the rounded card, the ghost captions (03: x 510, y 335 and y 855) and the banding (x 520–1000, y 230–290).
   - Replace the rainbow map, which §6 bans, with inferno-style 2 °C bands.
6. **Explode (02).**
   - Make the dashed leaders solid 0.75 px.
   - Renumber the tags in assembly order (now 06/05/04/02/03/01).
   - Add 1 px grey connectors.
   - Ghost the context at 20%.
   - Space the parts at an equal 60 px.
   - Cap or ghost the bare brown soil underside (x 560–950, y 690–820). Its black shards recur in 07 (x 745–850, y 655–705).

**Meadow (01).** One tint, one height, hard edge.
- Use `instanceColor` with ±8% HSL variation.
- Darken each blade root to tip, from 0.45 to 1.0.
- Jitter the heights by ±35%.
- Cut the flowers to 40%, in `#EDE6D2`.
- Fade the far edge into the paper.
