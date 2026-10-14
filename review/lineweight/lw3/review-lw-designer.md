# Line weight review, run 3 (final): lw-designer

Coordinates are image px (÷2 = CSS px). Luma is L 0–255. "dev" means device px.

## 1. Scores

| Criterion | lw1 | lw2 | lw3 |
|---|---|---|---|
| Hierarchy | 5 | 6 | 6 |
| Step contrast | 5 | 6 | 6 |
| Cut-outline dominance | 7 | 6 | 6 |
| Silhouette / crease / internal | 4 | 5 | 5 |
| Hatch vs line | 7 | 5 | 6 |
| Tone, paper and night | 4 | 4 | 5 |
| Joins, ends, quality | 5 | 6 | 6 |
| Consistency | 4 | 5 | 6 |
| Match to references | 4 | 5 | 5 |
| Feels right | 4 | 5 | 5 |
| **Mean** | 4.9 | 5.3 | **5.6** |

## My run-2 points

1. **Cut card tone: partly fixed.**
   - In L02 the card mean went from 143 to 151 at x1550 (y262–300), and from 144 to 153 at x1400. Across lw0 to lw3 it has gone 140 → 140 → 143 → 151.
   - The card now matches the paving (L150) instead of sitting below it. It is still far from the R3 target of 205.
   - Correction: the box I cited in run 2 was the floor's top surface, not the card. That surface is still L114.
2. **Sheet R4: not fixed.**
   - The L07 sill pan is pixel-identical: a 10 dev bar at L73 between L27 edges (x1000, y238–251).
   - The upstand (x979–985) is still 6 dev, and the beam/EPS edge (x401) is still 5 dev.
   - The liner went from 6 dev of mixed tone to 4 dev of solid L27. Where it meets the base outline (y700) the two fuse into a 6 dev bar.
   - Cause: the new polyline branch in draft.js runs only when `p.path` exists, and these parts don't have one.
3. **Night: mostly fixed.**
   - In L05 the canopy silhouette now reads at L121–156 (x1094, y512–516).
   - The canopy faces are still L10–15 on a background of L24, so they read as holes.
4. **Thermal outlines: fixed.** In L09 they measure L46–80 on the L15 flood and L89 on paper.
5. **Slivers, fascia and subgrade: not fixed.**
   - The L01 fascia (x2664, y425–430) is still 6 dev at L34.
   - The cedar strip is unchanged (median 143).
   - The L03 subgrade rose from L89 to L105, still short of 120.

## 2. Keep

1. **The continuous ground line.**
   - L02 bay 1 now has a 4 dev line at L19 (x620, y636). At x1550 the ground is 7 dev, against a cut line of 3 dev.
   - The section finally sits on the earth.
2. **Sheet ground and the adaptive thermal outlines.**
   - L06 at x1550, y1462–1467: one 6 dev ground line.
   - The thermal outlines hold on both ends of the flood.

## 3. What would most improve the "feel", ranked

1. **Make the cut card the palest thing in the frame.**
   - Today the drawing is heavy black outlines around grey, AO-speckled cards (L02, x1100–1300, y330–460). That reads as cartoon, not as 62c91a or be7c1d.
   - Composite the cut after the OutputPass and exclude it from GTAO.
   - Card mean from 151 to at least 205, and the noise standard deviation under 8.
   - **The standard is wrong:** R3 cannot pass while the cut is tone-mapped. It must say so.
2. **Separate the cut from the silhouette.**
   - In L02 the glass stile (x1184–1187) is 3 dev at L34–38. The cut top (x1550, y251–253) is also 3 dev, at L7–17.
   - The claimed 1.75 / 0.85 did not land. Set outer to a true 4 dev, and sil to 2 dev at L≈85.
   - The standard should require measured device px within ±0.5 of the table at acceptance.
3. **Sheet R4.**
   - When a part has no `p.path`, use the polygon's long edge as the path.
   - Sill pan: from the 10 dev L73 bar to one 3 dev ink line.
   - Upstand and liner: 3 dev, with a 1.5 dev paper gap so the outer line can't fuse with them.
   - Beam/EPS (x401): from 5 dev to the inner weight of 2 dev.
   - Delete c6's "1.5–4 px → 75 % fill" tier. It is what makes the bars.
4. **Lift the dark surfaces so the lines win (c8).**

   | Where | Now | Target |
   |---|---|---|
   | L02 floor top | L114 | ≥ 150 |
   | L01 canopy | L109 | ≥ 150 |
   | L03 subgrade | L105 | ≥ 130 |
   | Night faces | L10–15 | ≥ 40 |

5. **The hero head.**
   - Fascia: from 6 dev at L34 down to sil weight (2 dev).
   - The beaded black cedar/WRB band (L01, x2090–2300, y340–470): replace it with one 3 dev membrane line.
