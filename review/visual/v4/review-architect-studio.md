# Review: architect-studio, round 5 (v4)

## 1. Scores (v3 in brackets)

Line 7 (7) · Hatch 7 (6) · Cut 7 (7) · Annotation 6 (5) · Datum 6 (6) · Render 7 (7) · Composition 6 (6) · Explode 6 (7) · Analysis 7 (7) · Consistency 7 (7) · **Mean 6.6 (6.5)**

The sheet teaches. The renders still let labels land on the model.

Round 4 points:
- **Datums, partly fixed.** Labels are 16 px apart and ±0.000 is no longer clipped. They still sit on the bed (01: 520–715, 765–795; 04: 65–255, 700–730; 06: 60–255, 600–625).
- **08/09, mostly fixed.** Labels wrap, T2 has a dog-leg and the 09 hatch shows. F2 and T2 still run 6 px apart (773–800, 538–544).
- **04, mostly fixed.** The bubbles are split, numbered and zoomed. Bubble 3 shows no algae. Each spot has two leaders.
- **07, partly fixed.** NOW is fixed. Ghost debris at 620–760, 640–760 is new. The trench face is still unhatched (790–940, 610–690).
- **11, partly fixed.** The legend still covers the domain (833–1041, 651–763). There is no scale bar.
- **Orientation, partly fixed.** The single W–E arrow prints on the cut (01: 1150–1280, 680–745; 04; 10). In 06, E is lost. The lens leader still dies at (1062, 553), 78 px short of the ring.

## 2. Keep

1. **08/09 sheet.** Two-line tag columns, grey MAKER parts, the 12 dimension and the hatch under a 20% tint.
2. **05 and 10 datums.** A right-aligned column off the block, with 45° dog-legs. Use it everywhere.
3. **04/06 bubbles.** The YR 0 | YR 30 split and the field bubbles with 50 MM bars.

## 3. Fixes, ranked by what a student learns

1. **Datums and the arrow into the paper margin (01, 03, 04, 06, 07).**
   - Use the 05/10 rule. Split the label into "±0.000 FFL" and "−0.007 LANDING", right-align it to 12 px left of the bed's cut edge, and drop the halos.
   - Put the W–E arrow and scale bar 24 px below the ragged break, never on the cut. Restore E in 06.
2. **Leaders must reach their text and their spot.**
   - 06: THRESHOLD is struck through ("THRE:HOLD", 690–730, 562). Start the label 4 px past the leader's end.
   - 03: THRESHOLD hits "1 M" (1260, 688).
   - 01: draw the lens leader in the SVG overlay to the ring (1140, 612).
3. **03 caption.** Unreadable through the vignette (505–735, 100–145). Set it in #E8E4DC at a 32 px inset.
4. **Ghost hygiene (02, 07).**
   - Clip ghosts to their part box; delete shards (02: 690–790, 700–815; 07: 620–760, 640–760).
   - Hatch the 07 trench face with earth at 45° in a 0.25 px line.
   - 02: raise the F–M tag pitch from 40 to at least 52 px with a dog-leg.
5. **11 legend.**
   - Lay the legend horizontally under the domain (y 775–815, x 400–1040).
   - Add a 100 mm bar beside "SOIL CROP ADIABATIC".
   - Set the 11.9 label 8 px above its isotherm, not straddling it.
6. **04, one leader per spot.**
   - Delete the left tag leaders; set "1 · YR 30 · CEDAR SILVERED" under each bubble.
   - Zoom bubble 3 to the algae band until the change fills 30% of the circle.
