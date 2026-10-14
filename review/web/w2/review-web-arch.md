# Review w2: web-arch (architect, envelope tutor)

## Scores
| Criterion | w1 | w2 |
|---|---|---|
| Information architecture and narrative | 7 | 8 |
| Layout and grid | 8 | 8 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 6 | 7 |
| Responsive behaviour | 5 | 6 |
| Accessibility | 5 | 6 |
| Landing-to-tool coherence | 7 | 8 |
| **Mean** | **6.6** | **7.1** |

A student can now cite this site. I would use it in a crit, but only on desktop.

## Round-2 points
1. **Sources: largely fixed.** d09 has clause-level references, d04 names research 10, and the part panel names its research note. The band is still grouped by type rather than by junction, and it scrolls inside the page.
2. **Print/SVG: fixed.** The title block still says "SCALE: BAR" (t01, t02, d08).
3. **Build: partly fixed.** The list and the larger figure are in. There is still no "why" line, the m04 figure scrolls away from the controls, and stage 15 still says "people".
4. **Index: not done** (acknowledged). **Empty part state: fixed.**
5. **Thermal: partly fixed.** The Boundary label is fixed. There are no keynotes on the field, and the U-factor table has not moved.
6. **Collisions: mostly fixed.** The d03 collision, the nbsp breaks and m03 are fixed. The m01 caption now overprints the grass bed (y≈580).

## Keep
1. **d09 citations.** For example "VBBL25-V2, 9.27.2.2.(5) (pdf p. 195)". This is checkable, and it is what makes the site academic.
2. **The t01 keynote schedule.** Full spec lines such as "T2 … Armatherm 500-080 class, top cut to the 6 % fall" read like a real specification.
3. **The honesty of the thermal results** (d06, t04). Both values are set against 0.70, it says "not a certified THERM run", and it reports the heat balance (0.00 %) and L2D.

## Fixes (ranked)
1. **Use the same keynotes on every sheet and at every width (t05 vs t01).**
   - On the phone, D2 is the outer lite and F1 is EPS. On desktop, D2 is the sash rail and F1 is the slab.
   - Derive each key from the part id once and reuse it. If a part is cropped out, skip its number; never renumber.
   - Also in t05: "±0.000 FFL" collides with "−0.007" (≈60,340), and "−0.530 U/S BEAM" overprints the hatch. At ≤600 px, move the datums into the left gutter with 14 px leading.
2. **Make the sources band usable (d09).**
   - Remove the inner scroll (`max-height:none`) and add "Show all / Show 10".
   - Add a search field and junction filter chips (Threshold, Head, Landing, Water corner …).
   - Right-align the counts in a fixed column (`grid-template-columns:1fr 64px 24px`). Today 39, 101 and 30 drift.
   - Code clauses are labelled "CALCULATED". Use a stated vocabulary instead (Code · Measured · Manufacturer · Calculated · Judgement) and add a legend.
   - Give each row an `id="src-…"` that the tool's part panel links to.
3. **Teach the failure (d06 and m03, under the 0.48 stat).**
   - Add two lines: why the head is cold (the path through the track and header), and the sourced remedy (from research 13), with a link to `case=head`.
   - At present the page shows a fail and moves on.
4. **Control layers must be credible (t02).**
   - Vapour is ticked but no purple line appears, and the air line is only a stub at the sill.
   - Either draw both continuously, or show grey text next to the toggle saying which material acts as the control layer in this cut.
   - Title block: change "SCALE: BAR" to "1:5 @ A3".
5. **Build (d07).**
   - Put `<p class="why">` in the empty band under the stage name (y≈400–460).
   - m04: give the figure `position:sticky; top:64px; max-height:42vh` so the arrows visibly change it.
   - Rename stage 15 "Planting".
6. **Small tool and landing fixes.**
   - t01: the cut ticks "Jamb wall" and "Water corner" overlap (≈1140–1230, 130–160). Put the labels on alternating sides of the track.
   - The tool opens at w 900, but the hero cut is W 2000. Make the default 2000.
   - t04: move the U-factor table into the empty area under the legend (x 840–1080, y 300–700), and overlay the keynote circles at 60 % opacity.
   - m01: give the caption `margin-top:16px` so it sits clear of the drawing.
