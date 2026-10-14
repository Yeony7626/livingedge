# Review: web-visual, round 3 (w2)

## Scores
| Criterion | Score |
|---|---|
| Information architecture and narrative | 7.5 |
| Layout and grid | 6.5 |
| Typography | 6.5 |
| Colour and imagery | 7.5 |
| Motion and interaction | 6 |
| Impact and memorability | 6.5 |
| Tool usability | 6.5 |
| Responsive behaviour | 5.5 |
| Accessibility | 6 |
| Landing-to-tool coherence | 7.5 |
| **Mean** | **6.6** (was 6.1) |

## Round-2 points
1. **Nav: fixed.** The bar is opaque, paper over Build (d07) and night over Winter (d06), and the active link is underlined.
2. **Tool ink: mostly fixed.** Still open:
   - the "Jamb wall" and "Water corner" tick labels collide (t01, x=1140–1230, y=130–160);
   - the View buttons are sentence-case sans and wrap raggedly;
   - 0.76 still appears twice (t04: HUD at x=32 y=105, panel at x=1120 y=453).
3. **Type: partly fixed.** The f_Rsi baseline and the joined `13.6 °C` are fixed. The datum ladder still overprints the grass and its leaders (d01 x=530–640 y=680–715; d04 x=60–175 y=565–630; t03 x=80–220 y=690–725). New: "WIND FROM THE WEST" is struck through by its own leader (d05, x=797 y=305).
4. **One frame per drawing: not fixed.**
   - The d05 drawing stops at x=1255.
   - The d07 drawing spans only x=770–1215.
   - No band except the hero has an "AXO 0N" caption.
   - On d06 and d07 the h2 is jammed at y=85 and the eyebrow sits under the nav. The HEAD lens is cut at y=63 (d06).
5. **Mobile: partly fixed.** The switch and the full-width CTAs are good. Still wrong:
   - m01: the caption overprints the drawing (y=570–615) and the canopy is clipped at x=360.
   - m02: the drawing fills about 215 px of its square frame.
   - m04: the figure has scrolled away before the controls appear.
6. **Ending: footer fixed** (one edge, 48 px Barlow, filled last cell). The pinned Build is **not done**.

## Keep
1. The hero triptych: assembled, exploded with lettered tags, then winter night, with the nav inverting (d01–d03).
2. Barlow numerals as the page's voice: 30 years (d04), 07/15 (d07), 0.76 against a red 0.48 (d06), and 212 in the title block (d08).
3. The draft sheet with its keynote schedule (t01). It is the most professional surface on the site.

## Fixes, ranked
1. **Compose every band to the viewport.** Apply `section.band{min-height:100svh;display:grid;align-content:center}`. Fit each camera to the frame's bounding box with a 24 px inset, so the drawing reaches x=1385 (d05, d07). Add an `.axo-cap` mono caption under every figure, in the hero's form ("AXO 02 · AGEING · W 2000").
2. **Labels never cross ink.** Give every SVG label a halo: `paint-order:stroke;stroke:var(--bg);stroke-width:4px;stroke-linejoin:round`. Move the datum ladder 32 px clear of the bed edge (d01, d04, t03) and the wind label 16 px above its leader (d05). For close slider ticks (t01), alternate the labels above and below the track.
3. **Sources band (d09).**
   - Line up the counts in one column. Today they float between x=968 and 1030 because the summary uses `space-between`. Use `summary{display:grid;grid-template-columns:1fr 88px 24px}` with `b{text-align:right}`.
   - Drop the nested scroll box (`ol{max-height:560px;overflow:auto}`, whose OS scrollbar is at x=1377). Show 8 rows plus a "Show all 39" ruled button.
   - Make the left column `position:sticky;top:96px`. That fills the empty column on d08 (y=60–560).
4. **Pin Build.** On desktop, use a 300vh track with a sticky stage, where stage = `ceil(progress*15)`. On mobile, make the figure `position:sticky;top:64px;height:48svh` so the slider and the axo are visible together (m04).
5. **Mobile drawings.** Take the m01 caption out of absolute positioning and put it under the frame. Fit the camera with 16 px margins. Use a 4:3 frame on m02. On t05:
   - give the header title `text-overflow:ellipsis`;
   - stack "±0.000 FFL" and "−0.007" (they overprint at y=340);
   - move "−0.530 U/S BEAM" outside the sheet.
6. **Tool panel discipline.**
   - Set the View buttons in mono caps, 11 px, on `grid-template-columns:repeat(3,1fr)` (t01).
   - Replace the doubled checkbox-plus-swatch squares with a 16×3 px coloured rule (t02).
   - On t04, keep 0.76 in the HUD only. Align the legend to the field's top edge (y=265), and raise the in-field labels to at least 10 px.
