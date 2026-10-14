# Web-wow review, run x3 (final; reviewer: web-wow)

**Capture:** all 19 frames are clean, with no blank or shifted states. The x2 faults were in the capture, not the page. Two frames look odd, and both are real page behaviour:
- d05 is mid-fill. The canopy route stops at about 1000,540, so "UNDERDRAIN" has not arrived yet.
- m04 has the build figure half under the header. The stage render sits at 90–230 with an empty band from 230 to 410. This frame is byte-identical in size to x2.

The tool frames t01–t06 are unchanged from x2, and so are d01, d02, d07, d08 and d09. Everything new in x3 is in d03–d06, m01, m02 and m03.

## 1. Scores (x2 in brackets)
- First impression: 6.5 (6.5)
- Delight and discovery: 6.5 (6)
- Direct manipulation: 5.5 (5.5)
- Choreography and pacing: 6.5 (6)
- Feedback and response: 7 (6.5)
- Clarity while playing: 7 (6.5)
- Phone experience: 6 (5.5)
- Restraint: 9 (8.5)
- Memorability: 6 (5.5)
- Landing-to-tool pull: 5.5 (5.5)
- **Mean: 6.55 (6.2)**

The gains all come from existing inputs giving better answers: rain that arrives, a scrub that can now fail, a wipe that finally splits the cedar. No new input was added. That is why Direct manipulation, First impression and Pull stay flat.

## What happened to my run-2 points
1. **Drag the cut on the hero: not done.** d01 is the same as in x2. There is no grip at 1370,540, and the only response to the hand is still the 1.5° lean, which no user-test persona noticed. The W/w mismatch also stands:
   - d01 caption: "cut at W 2000"
   - t01 at 1119,169: "w = 900 mm"
   - d06 link at 950,870: "(W 900)"
2. **Make failure visible under the scrub: partly done.** Built:
   - a dashed red dew ring at the head (d06 at 625,265; d03 at 1145,328)
   - a 9.3 °C dew-point tick on the legend (d06 at 1083,320)
   - a red stats line, "below the 9.3 °C dew point: condensation" (d06 at 1177,647)
   - a hint that names the threshold of about −1 °C

   The ring is drawn only while Tsurf < DEW, so dragging past −1 °C now makes something switch on. That is the first provoked failure on the page and the right idea. Not built:
   - The 0 °C contour exists only as a legend tick. It does not travel across the drawing.
   - There is no probe and no `leader()` readout.
   - There are still two head values: 6.1 °C on the landing (d06 at 1177,595) and 6.0 °C in the tool (t06 at 1119,440).

   The 12 px ring is small against a 900 px figure.
3. **Park the wipe mid-cedar: done, apart from the bubbles.** The line moved from x 474 to x 502 in d04, and from 172 to 150 in m02. It is now computed from the projected box depth. The cedar visibly splits: fresh on the left, silver on the right. The sweep now waits until year ≥ 20, which fixes the "never seen" finding from the user test. Not done: the three split bubbles remain (d04 at 823,182 / 345 / 509), so the comparison is still told twice. The ↔ grip also still rests on the glass (d04 at 501,397) rather than on the cedar.
4. **Steer the rain: partly done.** Built:
   - Routes now draw in sequence with a dash offset, glass route first.
   - Each route's end is named when the water arrives there: "ITS OWN PIPE" (d05 at 1135,541).
   - Routes drain back when the rain stops.

   This is real choreography, and it answers the hold. Not built:
   - The wind arrow (d05, 783–845, 233–253) is still a static annotation. There is no `uWind` drag and no 75° detent.
   - Only end points are named, not SILL, TRENCH and DRIP on the way.
   - There is no dry shadow.
   - "ITS OWN PIPE" is set straight onto the trench hatch with no paper knockout. It is the least legible label on the page.
5. **Design the ending: mostly not done.**
   - Done: the ☝ glyph is gone from m01, where the cue at 16,748 is now plain mono.
   - Not done: the d08 TOOL tile (1177–1385 × 638–808) is still a black void with one link.
   - Not done: d07 is the same as in x2, with no visible lift-in.
   - Not done: the visitor's cut, year and temperature are still not carried into the tool.

## 2. Keep
- **The temperature scrub, now with a consequence.** You drag −7 °C, and below about −1 °C a ring, a legend tick and a red line appear. This is the Ciechanowski/Victor grammar plus a failure you caused yourself. It is the best thing on the site.
- **Hold for rain with routes that arrive.** The fill order teaches the path without a word of prose.
- **The mid-cedar wipe** (d04, m02). It is honest and quiet, and it now actually splits the material it is about.
- **Restraint.** After three runs there is nothing cute on the page. Mono labels, the single signal red and ISO numbers carry it. This is now a 9.

## 3. Remaining changes, ranked
1. **Drag the cut on the hero (d01, right face, about 1370,540).** This has been my first point for three runs, and the page still has no input on the building itself.
   - Add a red "CUT W 2000" grip on `plane.constant`, with detents at jamb wall, water corner and opening, matching the tool's slider (t01 at 1119–1407, 107).
   - Update the caption in tabular figures as the grip moves.
   - Rebuild `sectionShapes` only on a detent.
   - This also settles W 2000 against w 900 everywhere.
2. **Put the failure on the drawing, not only in the stats (d06, d03).**
   - Draw the 0 °C isotherm as an ink line across the cut, so it visibly crawls toward the room as you drag colder.
   - Grow the dew ring from 12 px to about 24 px, with a one-word "CONDENSATION" leader at 640,250.
   - Add the probe: a crosshair that samples the field and shows "x °C · f 0.xx", red below 0.70.
   - Make the landing and the tool show the same head value, 6.0 or 6.1, not both.
3. **Phone: keep the figure in view while the input moves (m03, m04).**
   - On m03 the scrub and legend fill the screen while the model sits above the fold. The relocated OUTSIDE handle (y ≈ 95) is just off-screen. Make the winter figure sticky at about 40 % height above the prose, or let the scrub live only on the figure.
   - On m04, pin the build figure so it does not slide under the header, and crop the 180 px dead band below it.
4. **Design the ending (d08 TOOL tile, 1177–1385 × 638–808).**
   - Render a live thumbnail of the Draft sheet at the visitor's last cut, year and temperature.
   - Label it "Take this sheet →" and pass those values in the Link parameters.
   - Right now the page ends on a black rectangle, and the strongest pull into the tool is a text link.
5. **Turn the wind and tidy the rain labels (d05).**
   - Make the arrow at 783–845, 233–253 drag `uWind`, with a detent at the sourced 75°.
   - Give "ITS OWN PIPE" (1093–1177, 541) a paper knockout and lift it off the hatch.
   - Ink SILL and TRENCH as the water passes them.
   - On Ageing, cut the three bubbles (d04, 776–872) to the one that the wipe cannot show: the algae line under the drip.

## 4. Final verdict
Honestly, no, not yet. This is a serious, beautiful, correct explainer with two good moments: the scrub that now fails below the dew point, and the rain that arrives route by route. A design jury would respect it, and nobody would call it juvenile. But wow comes from the scene answering the hand, and three runs have improved how the existing inputs respond without giving the visitor the building itself. The hero still reads as a still image, so the first ten seconds are the same as in x0. The single change that would move it most is the draggable cut on the hero, clicking through its detents and taking the visitor's own section with them into the tool. That one gesture would lift Direct manipulation, First impression, Memorability and Pull together.
