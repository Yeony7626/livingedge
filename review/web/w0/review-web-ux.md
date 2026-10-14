# Review: web-ux, round w0

## Scores
| Criterion | Score |
|---|---|
| Information architecture and narrative | 6 |
| Layout and grid | 6 |
| Typography | 7 |
| Colour and imagery | 8 |
| Motion and interaction | 6 |
| Impact and memorability | 7 |
| Tool usability | 5 |
| Responsive behaviour | 4 |
| Accessibility | 5 |
| Landing-to-tool coherence | 5 |
| **Mean** | **5.9** |

## Keep
1. **The hero axo** (d01): it has a lens callout, a level ladder and an italic "ground". It reads like a studio monograph, not a SaaS template.
2. **The stat row** in Barlow numerals (12 / 692 / 0.48). It is echoed by the 0.76 / 0.48 pair in d06. Data is the brand here.
3. **Honest, plain copy**, for example "A screening, not a certified THERM run" (d06). The restrained palette also works: inferno appears only on dark bands.

## Fixes, ranked
1. **Tool data defects (t04, t03, t01).** The t04 HUD top-left reads "597.48", which is a concatenation bug. Make it render `0.76` with "limit 0.70 · pass" and a ✓/✗ state. In t03 the HUD repeats the panel's 692. Swap it for the active view name and the cut position. In t01/t02 the title-block text "THE LIVING EDGE" overprints the scale bar at the bottom left. Offset the title block by `padding-left: 140px`, or put the scale bar on its own row above it.
2. **Hand-off between pages.** Every "Open the tool" link is plain `index.html` (d01 nav, d08 footer). Deep-link each band:
   - `index.html#tab=3d&year=30`
   - `#tab=thermal&case=head`
   - `#tab=layers&layer=water`

   Parse the hash on load and `history.replaceState` on every tab or control change. Add a quiet "Open in the tool →" link under each band's copy. In the tool header, link the logo back to `landing.html`. The d08 footer is a single line. Add sources, method, credits and the four tool tabs as links.
3. **The pinned hero narrates nothing (d01→d02→d03).** The left copy stays fixed for 420vh while the scroll cue disappears. Add a three-step rail under the stats: `01 Assembled / 02 Taken apart / 03 Winter night`. Give it an active tick and one swapping caption line, and cut `.hero` to about 300vh. The nav stays cream over navy bands (d03, d06). A 20px navy strip also shows under the nav in d04 and d07. Use an IntersectionObserver to set `nav[data-tone=dark]`, and clip each band edge with `scroll-margin-top: 64px`.
4. **Mobile breaks the drawings (m01–m04).**
   - m01: the caption overprints the scale bar, and the level labels sit on the grass.
   - m02: the lens circles are clipped at the right edge.
   - m04: the axo is about 180px wide, and the "NOW" label sits on it.

   Below 600px, hide the lens and level ladder and set the caption as body text under the figure. Give the figure `min-height: 60svh`. Mobile also loses the explode and winter story because the pin is disabled at 900px. Add a "Take apart / Winter" segmented toggle in its place. Mobile also has no section nav, so add a horizontally scrolling chip row under the header.
5. **Tool panel information architecture (t01–t03).** The panel is the same on every tab.
   - Chip casing is mixed: "Opening" vs "threshold".
   - No chip shows a selected state.
   - The Layers checkboxes appear on the Draft and 3D tabs.
   - The carbon labels truncate ("D door unit (frame, …") and the list runs off the bottom.

   Make the groups context-sensitive per tab. Use sentence case throughout. Give chips `aria-pressed` with a filled-ink active state. Put Opening, Water corner and Jamb wall as labelled ticks on the cut slider itself. Wrap carbon labels to two lines and fold that block into a `<details>`.
6. **Accessibility and controls.**
   - The landing has no `prefers-reduced-motion` rule. Under reduce, show static end states.
   - "Hold for rain" (d05) needs Space/Enter keydown-hold and an `aria-pressed` toggle fallback.
   - `#embed-x` (t03, "TAKE APART") has no label.
   - Build (d07, d08) has only "Build it". Add prev/next buttons and a 1–15 range with `aria-valuetext` set to the step name.
   - The red 11px mono text "head fRsi… under 0.70" in d06 fails contrast on navy. Raise it to 13px and `#ff6a4d`.
   - The year ticks "0 1" collide (d04, m02). Drop the "1" tick.
