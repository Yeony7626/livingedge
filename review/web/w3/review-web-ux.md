# Review: web-ux, round w3

## Scores
| Criterion | w2 | w3 |
|---|---|---|
| Information architecture and narrative | 8 | 8 |
| Layout and grid | 7 | 7 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 6 | 7 |
| Responsive behaviour | 5 | 6 |
| Accessibility | 7 | 7 |
| Landing-to-tool coherence | 8 | 8 |
| **Mean** | **6.9** | **7.1** |

## My round-3 points
1. **Tool on a phone:** mostly fixed. The ellipsis, the single datum and the single scroll are in. Still open: in t05 the tabs wrap, DARK is lost, and the callouts take about 65% of the width, which leaves a 120px sliver of drawing.
2. **Sticky figures on mobile:** partly fixed. Age and Build stick (m02, m04). Winter and Rain don't (m03 shows a legend with no field). There is still no chip nav.
3. **Header offset and a11y:** partly fixed. The skip link, 01 Detail, the full-red head label and the moved CTA are all in. But the bands are now taller than 900px and centred, so d06 clips "leaks." and the head lens under the bar, and d07 has lost its eyebrow.
4. **Thermal:** partly fixed. 0.76 now appears once. The table is still in the panel, y 720–900 is still empty, and "0 °C" (x≈490, y≈672) still sits on its curve.
5. **Cut ticks and layers:** fixed (t01, t02).
6. **Sources:** fixed (d09). Small leftover: the filter says "MAKER" while the rows say "Manufacturer", and Dataset, Secondary and Textbook have no chip.

## Keep
1. **Sources as a working reference (d09).** Search, type chips, aligned counts and a sticky intro.
2. **Teaching the failure (d06).** The red 0.48, then "Why the head is cold", then THERM. This is the narrative climax.
3. **The keyed explode (d02) and one control layer per row (t02).**

## Fixes, ranked
1. **Desktop bands overflow (d06, d07).**
   - In `section.band`, change `align-content:center` to `align-content:start; padding-top:clamp(96px,12vh,140px)`.
   - Make the Winter figure sticky: `.winter .frame{position:sticky;top:88px;height:calc(100svh - 120px)}`.
   - Cut "Why the head is cold" to two sentences plus a `<details>` "Read the research".
   - Give the Build list `columns:3`, so the stepper and all 15 stages fit in 836px. Today "15 …" is cut at y 895.
2. **Mobile (m01–m04).**
   - Apply the sticky rule to `.winter .frame, .rain .frame`.
   - Put the eyebrow and h2 before the frame: in m02, "drag." slides under it at y≈465.
   - Add a 44px chip row for 01–06 under the nav, with `overflow-x:auto` and `aria-current`.
   - m01: the model is 170px wide in a 358px stage. Fit the camera to 90% of the width and set the stage to `aspect-ratio:4/5`.
3. **Tool on a phone (t05).**
   - Make the tabs a full-width 4-column grid, and move PRINT, SVG and DARK into a "More" menu.
   - Under 600px, show keynote circles only, give the schedule its place below, and set the stage to `height:62svh` with a Fit / 2× toggle.
4. **Thermal (t04).**
   - Move the heat-flow and U-factor table into the stage at y 730–880.
   - Give in-field text (`EXTERIOR AIR · Rse`, `11.9 °C · fRsi 0.70`, `SOIL CROP ADIABATIC`, about 8px) the 11px floor and a halo: `paint-order:stroke; stroke:var(--bg); stroke-width:3px`. This includes the "0 °C" label.
   - Check that `#tab=thermal&case=head` opens with a red 0.48 in the HUD.
5. **One vocabulary across landing and tool (t03).**
   - The landing says Assembled / Taken apart / Winter night. The tool shows a slider plus a "WINTER NIGHT" button (x 680–1070, y 850). Reuse the m01 segmented switch.
   - On 3D, "Parts tagged on this sheet" refers to tags that don't exist there. Change it to "Click a part in the model" and list parts by name.
   - The tool defaults to w 900 while every landing caption says W 2000, and the footer links (line 410) drop `w`. Pick one default.
6. **Honest controls (t02, d09).**
   - Vapour is checked but no purple line is drawn. Disable it, with the note "drawn in a later revision".
   - Rename MAKER to MANUFACTURER, and add a "More" chip for the three missing source types.
