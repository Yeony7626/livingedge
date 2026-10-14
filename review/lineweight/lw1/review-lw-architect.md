# Review lw1: lw-architect

The hero now reads as a section, which it did not in lw0. Two views have regressed badly, though, and the ink sheet's hierarchy is upside down. Coordinates below are CSS px.

## Scores
| Criterion | Score |
|---|---|
| Hierarchy | 5 |
| Step contrast | 5 |
| Cut-outline dominance | 6 (hero 7, sheet inverted) |
| Silhouette / crease / internal | 5 |
| Hatch vs line | 4 |
| Tone and contrast, paper and night | 4 |
| Joins, ends, quality | 4 |
| Consistency | 4 |
| Match to references | 5 |
| Feels right | 4 |
| **Mean** | **4.6** |

## Keep
1. **Hero cut outline.** It is about 2.5 CSS px at luma 2 against faint creases (L01, slab edge at 1325, 548–583; the head cut). The cut now reads at a glance, as in 88ecae.
2. **Adaptive isotherms.** Paper-coloured lines on the dark flood, ink on the yellow, and the white 0 °C line (L09, 380–480, 400–690). The thermal field is legible for the first time.

## Fixes, ranked
1. **Ghost lines leak out of the section box.**
   - L04: 165–530, 140–560 is a black wireframe running over the roundels, labels and scale bar. L05: 648–907, 202–670 shows the same at night.
   - Cause: in `render()`, ghost groups keep each role's full width (outer 2.5, ground 3.5) at 0.25 alpha, and nothing clips them.
   - Fix: ghosts draw `sil` only, at 0.5 px, 25%, `#8C8579`, clipped to the box. Turn every other role off.
2. **Ink sheet hierarchy is inverted.**
   - L06: the grade-beam/EPS boundary (461, 612–828) measures 8 device px, which is 4 CSS. It is the heaviest line on the sheet. The granite top against air (y 409) is only 1.5.
   - L07: inner boundaries measure 2–2.5 where the table says 1.0–1.25. That looks like shared edges stroked by both polygons.
   - L07: the sill-pan strip (485–520, 119–126) is the darkest mass at the threshold.
   - Fix: stroke each shared edge once at 1.0. Use the 3.0 under-stroke on the assembly perimeter only. Draw the pan as a 1.5 px line.
3. **Ground is not the heaviest line, and verticals run into the soil.**
   - L01 at 1325: outer is 5 device px, ground only 6 (1.2×). Inner is 2–3 px at luma 20–40, nearly as black as outer.
   - Fix: ground goes to 2× outer (4 CSS in the hero band), on the grade line only (bed surface, top of soil). The ragged soil edge is a break line, not ground, so drop it to 0.75 @ 45%. Inner goes to 70% alpha, so the cut stays black and everything else turns grey, as in c628b7.
   - L02: the box-corner verticals at 155, 350–395 and 245, 320–365 are drawn at outer weight and stop mid-soil, so they read as stakes. Draw them as `beyond` (0.5 @ 35%) or stop them at the top of the soil.
4. **Hatch is over-corrected.** The cut card is now nearly blank. In L02 (250–550, 190–320) the gravel and cellular-glass rings have vanished, and the glulam head (L01) has lost its grain. You can no longer identify a material on the cut, though 62c91a keeps its hatch legible.
   - Fix: raise the hatch ink from 0.40 to 0.55, keeping the 0.5 core.
   - Restate R3 as: hatch ≤ ½ `inner`, card mean luma 190–200.
5. **The membrane cannot be found.** The bed liner and the slab DPM look exactly like outer cut lines.
   - Fix: membranes take 1.5 px ink with a 1 px paper halo on each side, in the hero and the sheet, so the water line can be traced.
   - Also lift the canopy render: it is still at luma about 86 (L01, 1008–1080, 274–302), below the c8 floor of 110, and it competes with the cut.

## Where the standard is wrong
- Ground at 1.5× outer is too timid. ISO extra-wide is 2× wide.
- Folding the soil break into `ground` is wrong. It is a break line and should be light.
- R3's luma ≥ 205 removes the material information from the cut.
- c9 gives part outlines and 2 °C isotherms the same weight (0.75 paper). In L09 (165–275, 290–350) the part rectangles and the isotherm curves cannot be told apart. Part outlines should go to 1.0 @ 60%, isotherms to 0.5 @ 40%.
- The membrane role needs its own graphic convention, not just a middle width.
