# Review: architect-studio, round 3 (v2)

## 1. Scores (v1 in brackets)

Line 6 (5) · Hatch 6 (5) · Cut 7 (6) · Annotation 5 (5) · Datum 7 (5) · Render 7 (7) · Composition 6 (6) · Explode 6 (5) · Analysis 6 (6) · Consistency 6 (4) · **Mean 6.2 (5.4)**

Round 2 points:
- R2-1, Layers: **fixed**. Thermal is now a flat cream fill that hides the EPS hatch.
- R2-2, Draft: **partly fixed**. FFL, W/E, title block, the ink 12 dimension and the EPS hatch are done. Leaders still cross the cut (M1 y 457 from x 56; F2 y 582; T3 y 749). M2 and T2 are clipped at x 1077, and the title block sits on T3.
- R2-3, one key: **partly fixed**. Letters are now shared, but the 02 explode puts the grade beam under F while 08 tags it T3. The 11 card is still unnamed.
- R2-4, explode: **partly fixed**. Ghosts are white fog, not grey, and the T/F tags are 26 px apart.
- R2-5, thermal: **partly fixed**. The bubbles are in, but the crop is still drawn as 3D boxes.
- R2-6, collisions: **partly fixed**. 05 is fixed. 04 has no year-0 ghost, and 07 is clipped with shards.

## 2. Keep

1. **01 = 10.** The tool and the landing share one renderer. The canopy now casts a shadow on the glass (1100–1150, 340–420), and the lens has the red 12 and a vertical 0–50 bar.
2. **08/09.** One ink sheet with a 2 px cut outline, the standard hatches, the 12 dimension, FFL, a title block and a scale bar. Layers is the same sheet plus bands.
3. **05.** A horizontal wind arrow, water routes with arrowheads, and sentences as the legend.

## 3. Fixes, ranked

1. **The ageing view barely ages (04).** Year 30 looks like 01, and the tags point at changes the viewer cannot see.
   - Add three 160 px bubbles, as in 06, at the tagged points: the head face (577, 299), the canopy cap (577, 329) and the landing (530, 590). Each bubble is split, with year 0 on the left and year 30 on the right.
   - Add a 20% year-0 outline.
   - Set the ticks to 0/1/5/10/20/30.
   - Give each leader a horizontal shoulder at x 320. ALGAE now crosses the glass.
2. **Night mixes light colour with data colour (03, 06).**
   - The landing in 03 (1000–1370, 480–600) glows amber beside the inferno field. Desaturate every uncut surface at night to saturation ≤ 10%, and confine the 2700 K light to the interior.
   - Use one night ground, #111923; 06 is #4A4A4A grey.
   - Draw only the cut rectangle of each crop. The box edges cross the canopy (03: 1045–1230, 190–385; 06: 550–690, 175–320).
   - Give each 06 bubble a 0.75 px leader to its ring at (626, 276) and (634, 484), with the 11.9 °C line labelled inside.
3. **08 leaders.**
   - Anchor each tag at the point inside its part nearest the label column. M1 moves to about (470, 412), and T3 goes onto the beam, not x 250.
   - Wrap labels at 28 characters.
   - Move the title block under the scale bar (y ≥ 845).
4. **One key, honestly.**
   - Make the 02 tags read the tool's data. If the grade beam is T, set F to "SLAB ON GRAPHITE EPS" and T to "WARM SILL, GRADE BEAM, 12 MM".
   - Add a 12 px cut-tint swatch before each tag, as in the exploded reference.
   - Set the 11 card to "0.76 · threshold, w 900 · limit 0.70".
   - Add "w 900" to the hero caption.
5. **Ghosts in the reference style (02, 07).**
   - Draw ghosts as 0.75 px grey #8C8579 outlines at 35% with no fill, plus AO-only grey shading (the SketchUp-style references). They replace the cream fog (02: 820–1140, 255–440; 07: 970–1090, 360–560).
   - Delete the 07 shards (735–840, 700–750).
   - Keep tags at least 40 px apart; T and F sit at 562/588.
   - Wrap "NOW: …" so it does not clip at x 1380, and route its leader outside the head.
6. **Collisions.**
   - The W ring sits on "U/S BEAM" (01: 719, 836; 06: 306, 658; 10: 310, 855). The E ring sits on "THRESHOLD 13.6" (03: 1257, 653; 06: 708, 521).
   - Move both rings 40 px outward along the cut axis, and test their bounding boxes against the labels.
   - 01: the lens leader draws an L-frame (617, 345 → 617, 612 → 1140, 612) over the meadow. Replace it with one straight leader from the ring to the lens rim.
   - 06: the 0 °C marker strikes through its tick label (976, 493). Start the line at x 1020.
