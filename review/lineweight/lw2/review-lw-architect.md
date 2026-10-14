# Review lw2: lw-architect

Coordinates are CSS px (image px ÷ 2). Luma is L 0–255.

## Scores
| Criterion | lw1 | lw2 |
|---|---|---|
| Hierarchy | 5 | 6 |
| Step contrast | 5 | 5 |
| Cut-outline dominance | 6 | 6 |
| Silhouette / crease / internal | 5 | 5 |
| Hatch vs line | 4 | 6 |
| Tone, paper and night | 4 | 5 |
| Joins, ends, quality | 4 | 5 |
| Consistency | 4 | 5 |
| Match to references | 5 | 6 |
| Feels right | 4 | 5 |
| **Mean** | **4.6** | **5.4** |

## My run-1 points
1. **Ghost leak: fixed.** L04 and L05 are clean section boxes.
2. **Inverted sheet hierarchy: mostly fixed.** In L07 the inner lines are now 1 px. Two faults remain:
   - The grade-beam/EPS boundary (L06, 461, 612–828) is still 5 device px. The beam's paper-white fill seems to be read as void.
   - The sill pan (L07, 485–520, 119–125) is still the darkest mass at the threshold.
3. **Ground: partly fixed.** In L02 at x 700 the ground is 4–5 device px at L18 against an outer line of 2 px. The break line is light and the stakes are gone. But under landing bay 1 (L02, 240–375, y≈319) the sub-base/soil line is only 1.5 px at L112, so the grade breaks off. The ink sheet has no ground line at all.
4. **Hatch: fixed.** Gravel rings and glulam grain read again.
5. **Membrane: not fixed.**
   - L04 head (152–156, 150): cladding, WRB and sheathing merge into one 10 device-px black bundle.
   - L06 liner (293–295, 600): the double line fills in to a 5 px bar.
   - L07 slab-edge upstand (489–492, 148–210): a solid bar about 5 device px wide.
   - The canopy was lifted only from L80 to L100 (L01, 1015–1090, 272–288), still below 110.

## Keep
1. **Clean box, ground at 2× cut, light soil break.** For the first time the bed reads as earth, with the section sitting on it (L02).
2. **Inner lines once at 1 px on the sheet, and screen-constant hatch.** L07 now reads like a Detail Library sheet.

## Fixes, ranked
1. **Give membranes a convention of their own.**
   - Draw each one as a single ink line, 1.25 px in the render and 1.5 px on the sheet. Never fill it.
   - Clear a 0.75 px paper gap each side, and drop neighbouring cut edges that fall within 1.5 device px.
   - Sill pan (L07, 485–520, 119–125): change the `#4A4946` fill to paper. The upper face gets 1.5 ink and the underside 0.5.
   - Upstand (L07, 489–492, 148–210): one 1.5 px line.
   - The standard is wrong here. c6 "1.5 < t·s < 4 → 75 % ink fill" produces these bars.
2. **Draw the ground continuously.**
   - Classify it by soil contact along the whole cut, not per box. In L02 bay 1 (240–375, 319) raise it from 0.75 to 3.0.
   - On the sheet, draw the top of compacted subgrade (F1/F10 interface, L06 ≈ 752–806, 732) at 3.0, so the sheet and the axo agree.
3. **Fix the sheet classifier.** Sample part IDs, not fill colour. The beam/T4 edge (L06, 461, 612–828) should go from 2.5 to 1.0.
4. **Separate cut from silhouette in the hero.**
   - Outer is 1.5 and sil 1.0 in near-identical ink. That is 1.5×, which fails R1. At the threshold (L02, x 700) the cut and the glass-frame silhouettes read alike.
   - Change sil to 0.75 at 85 %, or raise outer to 1.75 hero / 2.0 close.
   - The standard is wrong here too. R1 needs a tone step as well as a width ratio when both lines are near-black.
5. **Tone on dark grounds.**
   - Night: the canopy is L13 on a background of L24 (L05, 525–565, 235–245), so its silhouette disappears. Draw sil there in paper at 45 %, 1.0 px.
   - Thermal: dark-ink part outlines vanish on the cold flood (L09, 45–295, 380–445). The lw1 adaptive rule from c9 was right; restore paper at 40 % where luminance is below 0.35.
   - Also lift the canopy to L ≥ 120 and the explode subgrade from L85 to at least 120 (L03, 880–940, 725–740).
