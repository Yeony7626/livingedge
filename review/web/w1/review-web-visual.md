# Review: web-visual, round 2 (w1)

## Scores
| Criterion | Score |
|---|---|
| Information architecture and narrative | 7 |
| Layout and grid | 6 |
| Typography | 6 |
| Colour and imagery | 7 |
| Motion and interaction | 6 |
| Impact and memorability | 6 |
| Tool usability | 6 |
| Responsive behaviour | 5 |
| Accessibility | 5 |
| Landing-to-tool coherence | 7 |
| **Mean** | **6.1** (was 5.2) |

## Round-1 points
1. SaaS chrome: **fixed on the landing page** (ruled buttons, drafted slider, the colliding "1" removed). **Not fixed in the tool**: the round-thumb native range (t01, top right), blue native radios (t04), filled "v3 / 163 parts" pills (t01 header).
2. One grid: **partly fixed**. The 40px gutter and the eyebrows work. Drawings still float: the rain drawing ends at x=1255 (d05), the build drawing spans only 785–1135 (d07), and the hero runs to 1380.
3. Nav and seam: the seam is **fixed** (d04). There is a **regression**: the nav stays navy over the paper Build band (d07), with a dark strip at y=64–72.
4. Type: **partly fixed**. The stat label "coldest f_Rsi, head" still sits 7px low (d01, x=254 y=719).
5. Mobile: **partly fixed** (see fix 5).
6. Ending and tool bugs: the title-block footer, the "597.48" bug, the scale-bar overprint, the duplicate 692 card and reduced motion are **all fixed**. The pinned build is **not done**.

## Keep
1. The hero sequence: assembled, exploded with lettered tags, then winter night. The nav and the primary button both invert at night (d01–d03), and the 01/02/03 rail narrates it.
2. Barlow numerals as the page's voice: "30 years" (d04), 07 / 15 (d07), 0.76 against a signal-red 0.48 (d06).
3. The language of square mono-caps ruled boxes: the CTAs, the segmented tool tabs (t01) and the drafted take-apart slider (t03).

## Fixes, ranked
1. **Nav state.** Toggle `nav.dark` from an IntersectionObserver on `[data-night]` bands only, with `rootMargin:"-64px 0px -92% 0px"`, and remove the class when the band leaves (d07 top). Make the bar opaque: `background:var(--bg)`. At 88% opacity the heading and drawing show through (d08 at y=0–5 and 64–75).
2. **Bring the tool controls into ink.** Reuse the landing range CSS (hairline track, 4×22 ink bar thumb) on the t01 cut slider, and add ticks every 300 mm. Draw the t04 radios as 10px squares: `appearance:none`, 1px ink border, checked state `background:var(--fg); box-shadow:inset 0 0 0 2px var(--bg)`. Make the selects square, transparent, mono 12px. Fix "Rsi 0.2" being cut off by shortening the option text. "Run analysis" should use the `.cta` style. Set the header chips as plain mono text: "v3 · 163 parts". On t04, remove the white HUD and legend cards and use a 1px top rule instead. Drop the HUD 0.76, which is the third copy of the value.
3. **Typographic hygiene.** Use `.card small sub{vertical-align:baseline;position:relative;top:.3em}` (d01). Put `white-space:nowrap` and `&nbsp;` between each number and its unit, so "°C" no longer orphans (d06 at x=950 y=694; m03). The datum labels hit the grass ("-0.105 BED GRADE": d01 x=630 y=723, d04, t03). Shift the ladder 24px left and add a 3px paper halo. "THRESHOLD 13.6 °C" overprints the "1 M" of the scale bar (d03 x=1265 y=692). Move the scale bar to the bottom-left of the stage.
4. **Fix every drawing in one frame.** Put the drawing in columns 6–12 (x=700–1385), fit it to the frame, and add a baseline caption "AXO 0N · …" like the hero's on every band. Give each band `min-height:100dvh`, a 1px top rule you can actually see, and `scroll-margin-top:64px`. Two failures this solves: on d06 the eyebrow sits under the nav and the HEAD lens is cut at y=63, and d07 has 130px of dead space at the top.
5. **Mobile.** On m01 the axo starts at y=690 and bleeds off the right edge. Fit the camera to 100% of the width and move the stage up, directly under the h1. On m03 the threshold label is clipped at the bottom of the stage: add `padding-bottom:32px`. On m04 the drawing is about 140px wide and sits below the controls: put it above them at full width. Make both m01 CTAs `width:100%`.
6. **Weight at the end.** Pin Build: a sticky stage across 300vh, with the stage number `ceil(progress*15)`. Keep the buttons as a fallback. In the d08 title block, the full-bleed top rule (0–1425) does not match the inset cells (40–1385), so align them. Set "Detail 02" in Barlow at 48px, and make "OPEN THE TOOL" the last full-height cell of the block instead of a floating button.
