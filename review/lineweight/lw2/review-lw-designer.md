# Line weight review, run 2: lw-designer

Coordinates are image px (÷2 = CSS px); "dev" = device px.

## 1. Scores

| Criterion | lw1 | lw2 |
|---|---|---|
| Hierarchy | 5 | 6 |
| Step contrast | 5 | 6 |
| Cut-outline dominance | 7 | 6 |
| Silhouette / crease / internal | 4 | 5 |
| Hatch vs line | 7 | 5 |
| Tone and contrast, paper and night | 4 | 4 |
| Joins, ends, quality | 5 | 6 |
| Consistency | 4 | 5 |
| Match to references | 4 | 5 |
| Feels right | 4 | 5 |
| **Mean** | 4.9 | **5.3** |

## Run-1 points

1. **Ghost lines leaking:** fixed. L04 and L05 are clean.
2. **Black 2.5 CSS outer:** fixed. In L02 the outer line is now 3 dev px at L 16–21. The fascia is not fixed: at L01 x2664 y425 it is still 6 dev px at L34, heavier than the cut.
3. **No ground line:** fixed. Ground is 6 dev px at L 8–17, twice the outer, and the stakes are gone. The bed soil is L186, short of the 205 target.
4. **Sheet rails:** mostly fixed. In L07 the line at y667 is 2 dev px, and the rim/base pair is 4 + 2 with no doubled rail. The liner at x66 is still 6 dev px (3 CSS), so it still breaks R4.
5. **Night/thermal:** partly fixed. Casings are gone and the cut steps back. But see fixes 3 and 4: the outlines are now lost on dark grounds.

The explode connector is still not depth-tested, but at L144 on L153 it no longer reads.

## 2. Keep

1. **The hero cut family:** ground 3 / outer 1.5 / inner 0.75 at 75 %, with no beading. It is the right skeleton.
2. **One edge, one weight on the sheet:** outer 4 dev px, inner 2 dev px. The ratio now reads like c628b7.

## 3. Fixes, ranked

1. **The hero cut card is darker than its surroundings.**
   - In L02 the cards measure L131–155; the slab at x1250–1350, y290–330 has a median of 115. The paving is L194 and the soil L227. The tonal order is inverted, and this is the main reason the drawing "doesn't feel right".
   - Cause: the tints are pale (`#e4e1da` ≈ L225), but AgX tone mapping (edge3d.js:502) and the GTAO pass darken them.
   - Fix: composite the cut faces and all lines after the OutputPass, or invert AgX on `uTint`, and exclude the cut from GTAO. Target card L200–215, so the 3 dev px outer reads on a pale card as in 62c91a.
   - **The standard is wrong here.** R3 cannot pass while the cut is tone-mapped. It must state "cut and lines bypass tone mapping". Also, `hatchK = band/0.7` makes the "0.5" hatch a 0.71 multiplier.
2. **Sheet R4 is still broken.**

   | Where | Measured |
   |---|---|
   | L07 liner, x66 | 6 dev px |
   | L07 beam/EPS boundary, x401 | 6 dev px |
   | L06, x1498, y780–1650 | 8 dev px (4 CSS), the heaviest line on the sheet |
   | L07 sill pan, x970–1040, y241–251 | a bar 10 dev px tall at L40 |

   - Fix: draw all of these as 1.5 CSS lines. Thicker metal takes the c6 metal hatch, not a solid bar.
3. **At night the model dissolves.**
   - In L05 the canopy top is L23 and the soil is L25 on a background of L24. The outlines are about 1 px at L80–117.
   - Fix: night sil in paper `#F4F2EC` at 1.0 CSS / 60 %, outer 1.0 / 55 %, and night surface albedo at L ≥ 45.
4. **Thermal part outlines have vanished.**
   - In L09 at x547, y1005, the ink outline at 55 % measures L30 on a flood of L32.
   - Fix: make them adaptive like the isotherms. Use paper at 35 % where the flood luma is below 0.2, and ink at 55 % above that, at 0.75 CSS.
5. **Hatch on slivers, and dark renders.**
   - In L01 the cedar cut strip (x2090–2300, y340–470) renders as a black band about 4 CSS wide with orange dashes. Slivers under 4 px should take tint plus one inner line, with no pattern.
   - Demote the fascia to sil 2 dev px.
   - In L03 the subgrade top (x1600–1880, y1430–1520) is still L53. Lift it to at least L120 per c8.
