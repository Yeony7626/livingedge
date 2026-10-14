# Review: web-ux, round w1

## Scores
| Criterion | w0 | w1 |
|---|---|---|
| Information architecture and narrative | 6 | 7 |
| Layout and grid | 6 | 7 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 5 | 6 |
| Responsive behaviour | 4 | 5 |
| Accessibility | 5 | 6 |
| Landing-to-tool coherence | 5 | 7 |
| **Mean** | **5.9** | **6.6** |

## Round-1 points
1. **Tool data defects:** fixed. The t04 HUD reads 0.76 against the 0.70 limit, the 3D HUD is gone and the t01 title block sits clear.
2. **Hand-off:** fixed. Every band has a deep link, the brand links back, and the d08 footer is a real title block.
3. **Hero narration:** fixed, through the rail. **Nav tone:** partly fixed. In d07 the nav is still navy over the paper Build band, with a navy seam at y≈64–72.
4. **Mobile:** partly fixed. The overlays are hidden, but the explode and winter toggle and the chip nav are missing. In m03 the threshold label is clipped.
5. **Panel information architecture:** mostly fixed. The View chips still show no selected state, and the cut ticks are not on the slider.
6. **Accessibility:** mostly fixed. Still open: `#rain-btn` has no `aria-pressed`, and the tool tabs have no `aria-controls` and no arrow-key roving.

## Keep
1. **The hero rail** (d01–d03). Three numbered states, with the active tick following the scroll, tell the story without any scroll cue.
2. **Band to tool links.** Each one is a mono caps underlined link ("Trace the water layer in the tool →", d05) and lands on the same state in the tool.
3. **The title-block footer** (d08). It has Project / Detail / Method / Sources / In the tool, plus scale, revision and date. The sheet convention runs from the landing page into the tool's t01 title block.

## Fixes, ranked
1. **Mobile drawings scroll away from their controls (m01, m02, m04).**
   - In m01 the axo starts at y≈690, below the fold.
   - In m02 the year slider sits about 400px under the drawing.
   - In m04 the stepper sits above a 140px-wide drawing.

   Below 900px, set `.frame { position:sticky; top:64px; height:min(48svh,420px); z-index:1 }` so the copy scrolls under a live figure. In the hero, show the rail as a 3-button segmented control (`aria-pressed`) that sets the hero phase. Add a chip row `02–05` under the header with `overflow-x:auto`.
2. **Nav state and band edges (d07, d06, d04).**
   - Drive `nav[data-tone]` from an IntersectionObserver with `rootMargin:"-64px 0px -90% 0px"`, not from band entry.
   - Add `aria-current="true"` plus a 1px ink underline to the active nav link. Today no link lights up (d04 shows Ageing with no state).
   - Add "01 Detail".
   - In d06 the eyebrow "04 Winter" and the head lens are hidden under the bar. Give the winter band's sticky inner `padding-top:96px`.
3. **Thermal panel (t04).**
   - 0.76 appears three times (HUD, panel and legend caption). Keep the HUD, add a state ("✓ meets 0.70" in ink, "✗ below 0.70" in signal) and drop the other two.
   - Restyle the native blue radios as a 2×2 segmented control, or set `accent-color:var(--fg)`.
   - Shorten the boundary option to "ISO 13788 · −7 / 20 °C" so it stops truncating at "Rsi 0.2".
   - Set "Case / Mesh" as mono caps h2, the same as "CUT".
   - Move the U-factor table into the empty area under the field (y 720–900).
4. **Panel selection state (t01, t02).**
   - Nothing in the View group is pressed. Set `aria-pressed` on the active view (Threshold).
   - Draw 1px ticks for Opening, Water corner and Jamb wall on the cut track at their w positions, with 10px mono labels below.
   - Layers: use "Water, Air, Thermal, Vapour" in sentence case, one per row, each with a 12px line saying what that layer controls.
5. **Winter readouts (d03, d06, m03).**
   - "13.6 °C" wraps and orphans its unit. Join the value and unit with `&nbsp;` and add `white-space:nowrap`.
   - In d03, "THRESHOLD 13.6 °C" overprints the "1 M" scale bar. Move the scale bar to the bottom-left of the stage.
   - In d06, "HEAD 6.1 °C · f_Rsi 0.48" is dimmed. Set it to full #FF6A4D.
   - In m03, add `padding-bottom:24px` to the frame so the label is not clipped.
6. **Build band (d07) and keyboard.**
   - The build axo uses x 780–1360 and leaves about 300px empty. Scale it to the same frame as Ageing (left edge at x≈60).
   - Hold for rain: toggle `aria-pressed` and support Space keydown/keyup hold.
   - Tool tabs: add `aria-controls` and `role="tabpanel"`, roving `tabindex`, and ArrowLeft/Right.
   - Capture t05 at 390px wide next round. Tool mobile is unreviewed.
