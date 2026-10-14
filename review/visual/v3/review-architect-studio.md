# Review: architect-studio, round 4 (v3)

## 1. Scores (v2 in brackets)

Line 7 (6) · Hatch 6 (6) · Cut 7 (7) · Annotation 5 (5) · Datum 6 (7) · Render 7 (7) · Composition 6 (6) · Explode 7 (6) · Analysis 7 (6) · Consistency 7 (6) · **Mean 6.5 (6.2)**

The renders now approach the rendered-axo references. Collisions still undo the clamp reference's ink discipline.

Round 3 points:
- **Ageing, partly fixed.** The ticks, the column and the bubbles are in. The bubbles show no split and no change, and ALGAE is still a diagonal across the glass.
- **Night, mostly fixed.** The threshold bubble sits on "+2.785 HEAD" (06: 170–260, 395).
- **08 leaders, partly fixed.** Labels are truncated at 26 characters ("…PLANKS 6", "…75 ON") and clipped at x 0. T2 runs 4 px from F2 (770–810, 547).
- **Key, mostly fixed.** The hero says w 2000 and the tool says w 900.
- **Ghosts, partly fixed.** The silhouettes are right. The 07 shards and the "NOW…" diagonal remain.
- **Collisions, partly fixed;** new ones below.

## 2. Keep

1. **03/06.** Light colour and data colour are separate. The field sits only on the cut, with a stepped legend.
2. **02.** An honest key, swatches, silhouette ghosts and a tag pitch of at least 52 px.
3. **08.** The 12 dimensioned with ticks, −0.007, FFL, W/E in the corners and a one-line title block.

## 3. Fixes, ranked

1. **Datum overprint (04, 05, 06, 07, 10).**
   - "±0.000 FFL · −0.007 LANDING" prints over "−0.105 FINISHED GRADE" (04: 57–250, 712–726). Space the labels at least 14 px apart, with a 45° dog-leg to each tick.
   - 01: "±0.000" is clipped at x 502.
2. **08/09 column.**
   - Render the second line instead of truncating.
   - Move the frame from x 228 to 300.
   - Anchor T2 at about (720, 590), with a dog-leg in the 812–826 gutter.
   - 09: the thermal fill still hides every hatch. Use 20% alpha.
3. **04 must show ageing.**
   - Split each bubble with a 1 px ink divider: age 0 on the left, the slider year on the right, captioned "YR 0 | YR 30".
   - Zoom until the mark fills at least 30% of the bubble.
   - Number the bubbles 1–3 to match the tags.
   - Keep each rim 24 px clear of the model; it now overlaps the canopy (752–855, 220–320).
4. **07, fourth round.**
   - Clip the geometry at the ragged break; the shards are at 735–840, 700–750.
   - Hatch the brown trench face.
   - Wrap NOW at 28 characters.
   - Move NOW right of the block (1265, 560), with one 45° dog-leg to (1075, 605).
5. **11.**
   - Move the legend card off the domain (833–1041, 191–305); it hides "INTERIOR AIR · Rsi".
   - Lift the 11.9 label off its isotherm with a 3 px halo, and subscript Rsi.
   - Make W an 18 px circle. E prints over "100 MM" (1027, 780).
6. **Orientation and lens.**
   - E sits on the canopy deck in every render (01: 1258, 153). Place W and E on the FFL line, 24 px beyond the block.
   - W hits the lens caption (01: 719, 337) and the wind label (05: 787, 392).
   - The lens leader dies behind the sill (01: 1063, 553). Draw it to the ring at (1140, 612) without depth test.
   - Give the lens "12" ticks.
