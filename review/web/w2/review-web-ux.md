# Review: web-ux, round w2

## Scores
| Criterion | w1 | w2 |
|---|---|---|
| Information architecture and narrative | 7 | 8 |
| Layout and grid | 7 | 7 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 6 | 6 |
| Responsive behaviour | 5 | 5 |
| Accessibility | 6 | 7 |
| Landing-to-tool coherence | 7 | 8 |
| **Mean** | **6.6** | **6.9** |

## Round-2 points
1. **Mobile figure and controls:** partly fixed. The m01 drawing is now above the fold and the three-way switch works. There is still no sticky frame: in m02 and m04 the drawing has scrolled off before you reach the slider. There is no chip nav either, because `nav .links` is `display:none` with nothing in its place.
2. **Nav:** mostly fixed. The tone is right (d07 is paper) and the active link is marked (d04). Still open: there is no "01 Detail" link, and the eyebrows sit under the bar (d06 "04 Winter", d07 "05 Build"). The d06 head lens is clipped at y=64.
3. **Thermal (t04):** partly fixed. The HUD now shows its state and the boundary option is shortened. But 0.76 still appears twice (the HUD, plus the panel at y≈450), and y 720–900 under the field is still empty.
4. **Panel state:** partly fixed. Views now show a pressed state and the ticks exist, but their labels collide (see fix 5). The t02 layers still wrap inline with no explanations.
5. **Winter readouts:** mostly fixed. The non-breaking spaces, the d03 scale bar and the m03 clip are all fixed. In d06, "HEAD 6.1 °C" (x≈730, y≈160) is still dimmed.
6. **Build, keyboard, t05:** mostly fixed. Rain has `aria-pressed`, the tabs are complete and t05 was captured. The d07 axo still leaves x 480–760 empty.

## Keep
1. **The Sources band (d09).** "Every number has a source." with 212 entries, each with claim, citation and confidence, gives the project its credibility. The landing, footer and tool all link to it.
2. **The hero rail turned into a segmented switch on mobile (m01).** One component serves two layouts.
3. **The tool's keynote schedule before a part is chosen (t01 panel).** Each tag on the sheet is clickable in the panel.

## Fixes, ranked
1. **The tool on a phone (t05).**
   - The header title overflows at "garden, V". Below 600px, set `min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap`.
   - Datum labels overprint ("±0.0007FFL", and "−0.530 U/S BEAM" over the hatch). Below 600px, draw keynote circles only and rely on the schedule.
   - The aside scrolls inside the page (arrows at x≈380, y≈625). Below 860px, set `overflow:visible` so there is one scroll.
   - Give the stage `height:60svh` and add a Fit / 2× toggle.
2. **Sticky figures on mobile (m02, m04, m03).** Below 900px, set `.age .frame, .build .frame, .winter .frame { position:sticky; top:64px; z-index:1; height:min(46svh,400px); background:var(--bg) }`. Add a 44px mono chip row for 01–06 under the nav with `overflow-x:auto` and `aria-current`.
3. **Header offset and a11y (d06, d07).**
   - Add `section.band { scroll-margin-top:64px }`, and give the sticky inners `top:64px; padding-top:56px` so the eyebrows and the head lens clear the bar.
   - Set the d06 head label to `#FF6A4D` at full opacity.
   - Add "01 Detail" to the nav, plus a skip link (`<a href="#main" class="skip">`).
   - Move "Run the head case in the tool" (y≈895) above the method note.
4. **Thermal (t04).**
   - Delete the panel's 0.76 block (y 430–510) and keep its sentence as the HUD subline.
   - Move the heat-flow and U-factor table into the stage under the field (x 44–776, y 730–880) as a ruled table.
   - The "0 °C" isotherm label (x≈490, y≈672) sits on the curve. Give it an 8px paper halo.
5. **Cut ticks (t01, t03).** "Jamb wall" and "Water corner" overprint at x 1140–1230.
   - If two ticks fall within 72px of each other, alternate their labels above and below the track.
   - Add `aria-valuetext="900 mm, at the opening"` to `#w`.
   - In t02, put one layer per row with a 12px muted line underneath (Water: "sheds and drains rain", and so on).
6. **Sources (d09, d08).**
   - Remove the nested scroll (`details.src ol { max-height:560px; overflow:auto }`, line 187). It traps the wheel and shows a native scrollbar.
   - Put each count in a fixed right-aligned column (`grid-template-columns:1fr 64px 24px`). Today 39/101/30/12/30 sit ragged at x 968–1030.
   - Make the intro `position:sticky; top:112px` so the left half of d08 is not empty.
   - Add a text filter and confidence chips (Calculated / Qualitative) for the 212 rows.
