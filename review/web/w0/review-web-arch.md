# Review w0: web-arch (architect, envelope tutor)

## Scores
| Criterion | Score |
|---|---|
| Information architecture and narrative | 6 |
| Layout and grid | 7 |
| Typography | 7 |
| Colour and imagery | 8 |
| Motion and interaction | 6 |
| Impact and memorability | 7 |
| Tool usability | 5 |
| Responsive behaviour | 4 |
| Accessibility | 4 |
| Landing-to-tool coherence | 5 |
| **Mean** | **5.9** |

The drawings already read as serious. The site around them still feels like a product teaser, not an academic resource. There are no sources, no detail index and no way to take a sheet into a crit.

## Keep
1. **The d01 hero with its lens.** The circle callout "A · Threshold at the sliding panel", the datum levels and the caption line read like a real sheet.
2. **d06 "Where the heat leaks."** It gives the method, ISO 13788 and the "screening, not a certified THERM run" disclaimer, and shows 0.48 in red against the 0.70 line. That is honest and it teaches.
3. **The tool's Draft sheet (t01).** It has numbered keyed callouts (M1, F2, T1), a title block with rev and date, and a part panel promising "what, why, where from". This is the Detail Library convention that students already trust.

## Fixes (ranked)
1. **Thermal stat card shows "597.48" (t04, top-left).** Two values are concatenated. It also contradicts the panel, which says 0.76 for the threshold case. Bind the card to the selected case only: `0.76` / "threshold f_Rsi · limit 0.70". Colour it red only when it is under 0.70.
2. **Title block collides with the scale bar (t01/t02, bottom).** "THE LIVING EDGE" is struck through by the 0–50–100 mm bar. Move the scale bar into its own row above the title strip (`margin-bottom: 16px`), or put it in a left cell of a two-cell title block grid (`grid-template-columns: 120px 1fr`).
3. **No sources, method or index anywhere (d08 footer, tool header).** The hero claims "drawn from sourced research", so let a tutor check it:
   - Add a footer with three columns: Sources (link to the research list), Method (thermal and ageing assumptions), Credits/licence.
   - In the tool header, make "Detail 02" a dropdown listing all details, with a key plan.
   - Add a link back to the landing page.
4. **Mobile drawings overlap and clip (m01 bottom, m02 top right, m03 top, m04 middle).**
   - m01: datum labels and the AXO caption overprint the model.
   - m02: the lenses are cropped at the right edge.
   - m04: "NOW · CHANNEL…" sits on top of the model.

   Below 600px: hide the leader-line labels and datum stack, move the caption under the figure as normal text, stack the lenses below the axo, and set the build figure to `min-height: 60vh`.
5. **Build section is under-used (d07, d08).** A single "Build it" button with 70% empty canvas does not teach sequence.
   - Add a numbered 15-step list in the left column (`ol`, current step bold, others clickable).
   - Add prev/next arrows and left/right key support.
   - Give each step one line on *why it goes before the next one*. That is the crit question.
6. **Accessibility and interaction.**
   - The landing source has no `prefers-reduced-motion` rule. Add one that turns off the pinned explode and the rain loop, and shows static frames instead.
   - "Hold for rain" (d05) needs keyboard support (Space/Enter hold via `keydown`/`keyup`) and a toggle fallback.
   - In the tool, chip case is inconsistent ("Opening" vs "threshold"). Use sentence case throughout.
   - The carbon list labels are truncated ("D door unit (frame, …"). Give the label column `minmax(0,1fr)` and add `title` attributes, or wrap the labels.
   - Add a "Print sheet / Export SVG" button beside Dark (t01, top-right). That is what makes me use it in a crit.

Minor: the landing hero cuts at W 2000 but the tool opens at w 900. Open the tool at the same cut, or say so ("Open the tool at this cut").
