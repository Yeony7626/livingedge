# Review w4 (round 5, final): web-arch (architect, envelope tutor)

## 1. Scores
| Criterion | w3 | w4 |
|---|---|---|
| Information architecture and narrative | 8 | 8 |
| Layout and grid | 8 | 8 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 7 |
| Impact and memorability | 7 | 7 |
| Tool usability | 7 | 8 |
| Responsive behaviour | 6 | 6 |
| Accessibility | 7 | 7 |
| Landing-to-tool coherence | 8 | 7 |
| **Mean** | **7.2** | **7.3** |

I would use it in a crit now: Winter and Layers already work there. I would not yet print the Draft sheet, because it still says "SCALE: BAR".

**Round-4 points**
1. **Control layers: mostly fixed.** t02 draws water, air and thermal, and Vapour is greyed out with an honest note. Air is still a stub (x≈745–805, y≈405–510). "SCALE: BAR" is still on t01, t02 and d08.
2. **Hero junction: partly fixed.** The links carry `w=2000`, but t01–t04 open at w 900. The head link has no `w` at all, so t06 reads 6.0 °C where d06 says 6.1 °C. D2, T11 and T14 are still not keyed in t01.
3. **Build: partly fixed.** It is now pinned and stage 15 reads "Planting". There is still no "why" line (d07, the gap at y 360–410).
4. **Sources: mostly fixed.** There is a legend, "Manufacturer" is spelled out and "Other" is in. But "Part 9 scope · CODE · USED IN CALCULATION" is wrong: a scope clause is applied, not calculated. There are no junction chips.
5. **Thermal: partly fixed.** The d06 sentence is fixed. In t04 the table has not moved and there are no keys on the field. The "0 °C" label (490, 672) still sits on the isotherm, and in t06 the label at (455, 705) is overprinted by the ring.
6. **Collisions and scale: partly fixed.** The d06 figure is now sticky, and in m02 the heading now comes first. In d01 the "−0.007 LANDING" arrowhead still prints over its text (x≈625–638, y≈698). In m01 the axo is still about 170 px wide.

## 2. Keep
1. **"Why the head is cold"** (d06/m03): cause, generic versus certified frame, and the certificate governs. This is tutor-grade.
2. **Pinned build with later stages ghosted** (d07): it teaches sequence without any words.
3. **Honest tool states**: the disabled Vapour toggle with its reason (t02), and the "0.48 × below 0.70" in red with the heat balance at 0.00 % (t06).

## 3. What most raises the level (ranked)
1. **One number everywhere (t06, d06).**
   - Change the link to `#tab=thermal&case=head&w=2000`.
   - Default the tool to `w=2000` when there is no hash, so t01–t04 match d01's "CUT AT W 2000".
   - Bind the landing's 6.1 °C, 0.48 and 0.76 to the same solve output, so they cannot drift.
2. **Make the sheet citable (t01/t02 title block, d08 bottom-left).**
   - Replace "SCALE: BAR" with "1:5 @ A3".
   - Key D2, T11 and T14 in t01 (x 590–745, y 405–470) by raising the label cap to 16.
3. **Close the air line (t02).**
   - Draw the 2 px teal line continuously along the warm face: from the T5 course up the D11 sill to the F7 slab edge.
   - Wherever it is discontinuous, mark a red "×" with the tooltip "air line breaks here". That gap is the lesson.
4. **Add the build "why" (d07, y≈370).** Use `<p class="why">` at 15 px with `max-width:38ch`, one per stage. For example, stage 07: "Pan before sill: water must leave before the frame sits on it."
5. **Thermal sheet legibility (t04/t06).**
   - Move the U-factor table into x 840–1080, y 300–700.
   - Overlay the part keys at 60 % opacity.
   - Offset the isotherm labels 10 px along their normal, with `paint-order:stroke` and a 3 px paper halo.
   - Change the usage tag on scope clauses to "Applied" (d09).
6. **Small screens and datum (m01, m04, d01).**
   - Set the hero and build axo to `width:100%`, cropped to the section-box bounds. This fills the empty paper in m01 (y 240–640) and m04.
   - Start the d01 datum leaders 8 px clear, with `padding-right:12px` on the labels.
