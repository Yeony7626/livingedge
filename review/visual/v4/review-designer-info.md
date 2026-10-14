# Review: designer-info, round 5 (v4)

## 1. Scores (v3 → v4)

Line 7→7 · Hatch 7→8 · Cut 7→7 · Annotation 6→7 · Datum 7→7 · Light 7→7 · Composition 7→7 · Explode 7→7 · Analysis 7→7 · Consistency 7→7 · **Mean 6.9 → 7.1**

**Round 4 points:**
- 1 Datums: **partly fixed.** Pitch and inset are fixed. The labels still sit on the bed in 01 (520–712, 779), 04 (65–255, 716) and 06 (63–257, 613). The 07 dash-dots strike "−0.007" (630–730, 710).
- 2 Truncation (08/09): **fixed.**
- 3 04 bubbles: **mostly fixed.** The captions don't match the tags.
- 4 Leaders: **mostly fixed.**
- 5 11: **partly fixed.** The card still covers the field. There are no line samples and no visible scale bar.
- 6 Colour residue: **mostly fixed.** The new 03 ticks are illegible.

## 2. Keep

1. **08/09:** the full two-line labels, the grey "(MAKER)" parts, the 20% tint under the hatch, and the title block with scale bar.
2. **06:** the stepped legend with its isotherm rows, the 50 mm bubble bars, and red only on the head.
3. **All views:** one W ◂—▸ E arrow under the scale bar, and identical datum text.

## 3. Fixes (ranked)

1. **Night text on paper (regression, 03/06).** The soft vignette puts white text on paper.
   - 03: the caption (505–735, 100–145) is invisible. Move it into the HTML in ink.
   - 03: the legend ticks are white and clipped at x 1395. Inset the legend to x ≤ 1330 and set its ticks in #1A1A1A at 11 px.
   - 06: the HEAD and THRESHOLD captions (60–190, 255/415) need ink too.
   - Rule: where the background luminance is above 0.5, use ink text with a 2 px paper halo. Never use box halos.
2. **06 collisions.**
   - The leader strikes "THRESHOLD" (686–720, 562). Stop it 4 px short and add a 16 px shoulder.
   - That label hides E and the scale bar. Move them to (720–880, 640).
   - "+2.785 HEAD" touches bubble 2. Use x ≥ 214.
3. **Datums over geometry (01, 04, 06, 07, 10).**
   - Hit-test the labels against the model silhouette. If they overlap, drop them below the soil break with a dog-leg.
   - 07: put a 3 px paper halo under the text.
   - 01: the lens leader crosses the head dash-dot at (870, 407). Reroute it.
4. **11 legend.**
   - The card (833–1041, 651–765) covers the field. Make it a horizontal strip below the domain, at y ≥ 780.
   - Add 24 px line samples for 11.9 °C and 0 °C.
   - Restore the 100 mm bar at (60, 775).
   - Subscript "fRsi" at (790, 365).
5. **04 bubbles.**
   - Make the captions read "2 · SPLASH BAND" and "3 · ALGAE LINE".
   - Each spot has two leaders. Remove the tag leaders and put 14 px numbered circles on the spots. This also removes the bubble 2 diagonal across the fascia.
   - Drop the cramped slider "1" label.
6. **02 explode.**
   - Delete the stray slivers at (690–745, 790), (810–850, 615) and (935–970, 700), and the wire ghost (838–970, 545–605).
   - The gaps are uneven: 75 / 65 / 45 px, and F, M and E overlap in y. Solve on the union boxes for 48 px gaps.
