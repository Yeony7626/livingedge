# Web-wow review, run x2 (reviewer: web-wow)

**Capture warning:** d02, d06 and m03 are blank. d01, m02 and m04 are shifted down, with the header partway down the frame. Winter cannot be judged. Recapture; if the shift is real, it is a P0.

## 1. Scores (x1 in brackets)
- First impression: 6.5 (6.5)
- Delight and discovery: 6 (5.5)
- Direct manipulation: 5.5 (5)
- Choreography and pacing: 6 (6)
- Feedback and response: 6.5 (6)
- Clarity while playing: 6.5 (6.5)
- Phone experience: 5.5 (4.5)
- Restraint: 8.5 (9)
- Memorability: 5.5 (5.5)
- Landing-to-tool pull: 5.5 (5.5)
- **Mean: 6.2 (6.0)**

## What happened to my run-1 points
1. **Cut drag: half done.** The 1.5° cursor lean is in, but there is no cut grip. d01 still reads as a still image. W 2000 (landing) against w 900 (t01, t03) is unresolved.
2. **Winter on the drawing: partly done, and unverified.** The corner handle was built. There is no probe, isotherm or legend bead.
3. **Ageing wipe: clearly better.** It has a red line, a grip, boxed tabs and a sweep, and the cedar now greys visibly (d04). But it rests on the cedar's left edge (x 474). On m02 the whole cedar sits on the YR 30 side, so there is no side-by-side. The bubbles were not demoted.
4. **Wind: not done.** d05 is unchanged.
5. **Phone hero: fixed (m01).** The TOOL tile is still empty (d08).

Also unchanged: the head reads 6.1 °C on the landing (d03) and 6.0 °C in the tool (t06).

## 2. Keep
- **The temperature scrub.** A dashed red value in the sentence, now echoed on the drawing. It is still the best interaction on the site.
- **The rebuilt wipe** (d04): serious and legible; only where it rests is wrong.

## 3. Five changes, ranked
1. **Drag the cut on the hero (d01, right face, about 1370,540).** Add a red "CUT W 2000" grip that drives `plane.constant`, with the tool's three detents (t01). Rebuild `sectionShapes` only on a detent. This makes the lean feel earned and ends the W/w mismatch.
2. **Make failure visible under the scrub (d03 head ring at 1145,328; d06).**
   - Port the tool's 0 °C contour (t04) so it travels as you drag.
   - Below the room dew point (about 9.3 °C), ink a hairline condensation mark at the ring.
   - Add a probe with a `leader()` readout, red below 0.70.
   - Use one head value on both pages.
3. **Park the wipe mid-cedar.** Use the cedar's projected bounding-box centre, not `cx + 22`: about x 508 in d04 and about 255 in m02. Then cut the three bubbles to one.
4. **Steer the rain (d05).** Make the arrow at 647,253 drag `uWind`, with a detent at the sourced 75°. Ink in "SILL", "TRENCH" and "DRIP" as the water reaches each one.
5. **Design the ending.** Give the d08 TOOL tile a live thumbnail of the visitor's own cut, year and temperature, with "Take this sheet →" and Link parameters. On Build (d07), lift each part in over 300 ms. Delete the ☝ glyph in the m01 cue; it is the only juvenile mark.

The x2 user test had not been written when I finished.
