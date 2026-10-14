# Review: web-visual, round 1 (w0)

## Scores
| Criterion | Score |
|---|---|
| Information architecture and narrative | 6 |
| Layout and grid | 5 |
| Typography | 5 |
| Colour and imagery | 7 |
| Motion and interaction | 5 |
| Impact and memorability | 5 |
| Tool usability | 6 |
| Responsive behaviour | 3 |
| Accessibility | 4 |
| Landing-to-tool coherence | 6 |
| **Mean** | **5.2** |

The drawings are professional. The page chrome around them is still a generic SaaS template, and that is why the result reads as "default".

## Keep
1. The exploded axo with lettered tags and swatch legend (d02), and the shift from paper to winter night (d03). That sequence is the signature of the page.
2. Barlow Condensed numerals: the 30 in d04, 07 / 15 in d07, and 0.76 against a red 0.48 in d06. Signal red is used only on failures.
3. The mono annotation system (datum ladder, haloed labels, scale bar), with inferno appearing only in analysis.

## Fixes, ranked
1. **Remove the SaaS chrome.** In `.cta`, change `border-radius:999px` to `0`. Render buttons as ruled boxes: 1px ink border, `font:500 12px/1 var(--mono)`, uppercase, `letter-spacing:.06em`, with a trailing "→". This applies to d01 "Open the tool / Watch it age", d05 "Hold for rain", d07 "Build it" and the t01 view chips (use 2px radius there). Replace the native `accent-color` range in d04 with a custom one: a 1px `--rule` track, tick marks every 5 years, and a 2px × 18px ink bar thumb. The "0 1" tick labels in d04 collide, so drop the "1".
2. **Use one grid.** `.wrap` is 1400px and `.pin` is 1520px, so hero copy sits at x=32 (d01) while the section copy sits at x=44 (d05, d07). Use a 12-column grid, 1440px wide, with 40px margins and 24px gutters on every band. Give each band a mono eyebrow ("02 — AGEING") and a 1px top rule, so the page reads as numbered sheets. Remove the grey vignette box behind the rain drawing (d05, right), because no other band has one.
3. **Theme the nav and close the seam.** The nav stays pale grey over navy (d03, d06 top). A 20px navy strip shows under the nav after winter (d04, d07 top). Write `--wn` onto `documentElement` so the nav's `color-mix` uses the same value. Fade the hero back to paper over the last 8% of the pin.
4. **Make the typography bolder and more precise.** Set h1 to `clamp(56px, 7.2vw, 112px)/.94`, keeping "ground" in italic. Every h2 is currently the same 48px; vary them with the eyebrow and limit line length to 14ch. In the d01 stats strip, "coldest f_Rsi, head" sits 7px below its neighbours. Set `sub{font-size:.75em; line-height:0}`.
5. **Fix mobile.** On m01, leader lines strike through the datum labels and the caption overprints them. The lens circles are cropped on m02. "THRESHOLD 13.6" is cut off on m03. The label overlaps a very small axo on m04. Below 600px: hide the datum ladder and lens, move `.caption` into a static `<figcaption>` under the stage, set the stage to 100vw at a 4/5 aspect ratio, and reduce callouts to tag letters with a list below.
6. **Give the ending some weight, and fix the tool bugs.** The footer in d08 is a single sentence. Make it a drawing title block: a ruled grid of cells for Project, Detail 02, Scale, Rev 4, Date, 212 sources and Credits, with a sheet-width "Open the tool" band. d07 leaves 40% of the screen empty, so pin it and let scroll drive the 15 stages across 300vh, instead of using a button. In the tool, the t04 card reads "597.48", a concatenation bug; it should be 0.76. The title block in t01 and t02 (bottom left) overprints the scale bar. The 692 card on the 3D tab (t03, top left) duplicates the panel. The landing page has no `prefers-reduced-motion` rule.
