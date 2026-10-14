# Review w1: web-arch (architect, envelope tutor)

## Scores
| Criterion | w0 | w1 |
|---|---|---|
| Information architecture and narrative | 6 | 7 |
| Layout and grid | 7 | 8 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 5 | 6 |
| Responsive behaviour | 4 | 5 |
| Accessibility | 4 | 5 |
| Landing-to-tool coherence | 5 | 7 |
| **Mean** | **5.9** | **6.6** |

The site now reads as a set of numbered sheets, not a product teaser. I would show it in a crit. I would not yet let a student cite it, because the sources still can't be checked.

## Round-1 points
1. Thermal card "597.48": **fixed** (t04 shows 0.76, limit 0.70).
2. Title block colliding with the scale bar: **fixed** (t01, t02).
3. Sources, method and index: **partly fixed.** The footer title block exists, Method links to #winter and the brand links back. But Sources (d08) is plain text with no link, and "Detail 02" is still not an index.
4. Mobile overlaps: **partly fixed.** Lenses and datums are hidden. But m01's axo starts below the fold and is cropped at the right, and m03's "THRESHOLD 13.6 °C · f…" label is clipped at the bottom of the figure.
5. Build: **partly fixed.** Prev/next and a range are in, but there is no stage list and no "why this comes before the next" line.
6. Accessibility:
   - Reduced motion: **fixed.**
   - Chip case and carbon labels: **fixed.**
   - Keyboard hold for rain: **can't be verified** from the shell.
   - Print/Export: **not done.**

The minor point (the hero cut not matching the tool's opening cut) is **fixed.**

## Keep
1. **The hero's three-step rail (d01–d03).** Assembled, taken apart, winter night is a real teaching sequence. The keyed exploded legend (H/D/T/F/M/E) is Detail Library grammar.
2. **d06 Winter.** It shows 0.76 and 0.48 side by side against the 0.70 line, names ISO 13788 and PHI, and says "not a certified THERM run".
3. **The t01 Draft sheet.** It has keynoted callouts and a clean two-line title block. Each band's "in the tool" deep link is exactly the bridge I asked for.

## Fixes (ranked)
1. **Make sources checkable.**
   - d08 footer, Sources column: link "212 reviewed research entries" to a `#sources` page or band, grouped by junction (author, year, title, link).
   - d04/m02 body copy: replace "reviewers' ageing tables" with named sources plus a "Sources →" link.
   - t01 part panel: show the citation line for the selected part.
2. **Print and export sheet (t01 top right, beside DARK).**
   - Add "Print sheet" and "SVG" buttons.
   - Add `@media print { header, aside { display:none } }` and `@page { size: A3 landscape; margin: 12mm }`.
   - Title block: replace "SCALE: BAR" with a true ratio such as "1:5 @ A3".
3. **Build must teach sequence (d07 left column, the empty area under "Read every part").**
   - Add `<p class="why">` with one sentence on why this stage precedes the next.
   - Add a 15-item `ol`: mono 12 px, current stage bold, each item clickable.
   - m04: put the figure above the controls (`order:-1`, `position:sticky; top:64px`).
   - Stage 15 "Planting and people" (d08) shows no people. Rename it or draw them.
4. **Detail index and empty part state (t01 header and panel).**
   - Make "Detail 02" a `<button aria-haspopup="listbox">` listing the details, with unbuilt ones greyed out as "in preparation".
   - With nothing selected, the panel shows only "Click a part…". Show the M1–T3 keynote schedule instead, with each row selecting its part.
5. **The thermal sheet must be readable as a section (t04).**
   - Overlay the Draft keynote circles at 60% on the field so students know which material is which.
   - Fix the garbled "0 °C" isotherm label at the bottom of the plot (≈485,672).
   - The Boundary select is truncated at "Rsi 0.:". Shorten the option to "ISO 13788 · −7 / 20 °C".
   - Move the U-factor table into the empty area below the plot.
6. **Collisions and wraps.**
   - d03: "THRESHOLD 13.6 °C" overprints the scale bar's "1 M" (≈1260,695). Move the label up 28 px.
   - d06/m03: "13.6 °C" and "6.1 °C" break before the unit. Use `&nbsp;` between number and unit.
   - m01: place the axo directly after the h1 (`order:2`, `width:100%`, `aspect-ratio:4/5`, `object-fit:contain`).
   - m03: hide the threshold bubble at ≤600 px, like the others.
