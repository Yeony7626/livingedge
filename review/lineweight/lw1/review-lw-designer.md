# Line weight review, run 1: lw-designer

Coordinates are image px (÷2 = CSS px). "dev" means device px.

## 1. Scores

| Criterion | Score |
|---|---|
| Hierarchy | 5 |
| Step contrast | 5 |
| Cut-outline dominance | 7 (now too dominant) |
| Silhouette vs crease vs internal edge | 4 |
| Hatch vs line balance | 7 |
| Tone and contrast, paper and night | 4 |
| Joins, ends and line quality | 5 |
| Consistency across render, sheet and thermal | 4 |
| Match to the reference images | 4 |
| Overall feel | 4 |
| **Mean** | **4.9** |

Before the revision the drawings were faint everywhere. Now they are heavy everywhere. The middle of the hierarchy is still missing:
- The soil break is unchanged.
- Ghost lines are drawn at cut weight.
- In L03, the explode connector at x≈1755, y 1150–1830 still runs in front of the slab, 2 dev px wide and with no depth test.
- The parts' back and left ends have no silhouette.

## 2. Keep

1. **Hatch as tone.**
   - Draft hatch is now constant on screen. In L07 the cut cards are at L 201–238.
   - Shader hatch at 0.40 means the L02 threshold no longer looks like grey noise.
   - The explode is tint only.
2. **Solid lines at the right DPR.**
   - No beading: L01 cut edges run 5 dev px at L 2–20.
   - The white 1.75 px 0 °C isotherm in L09 reads at once.

## 3. Fixes, ranked

1. **Ghost / beyond lines are drawn at outer weight and are not clipped.**
   - **Where:** L04, x 350–1060, y 280–1120. A scan at x 700, y 453–485 finds 4 dev px runs at L 34–56. They cross the lens labels "SILVERED", "YR 30" and "UNDER THE DRIP". L05 has the same fault, image x ≈1250–1815, y 430–1340.
   - **Fix:** clip them to the section-box planes and draw them as `beyond`: 0.5 CSS at 35%, which gives about 1 dev px at L≈200. At night use `#8C8579` at 20%.
2. **The standard is wrong for rendered axos: pure-black outer lines at 2.0/2.5 CSS make the parts look like cartoon boxes.**
   - **Evidence:** in L04, at x 180–560, y 110–480, every glulam and frame part is ringed in 5 dev px of black around a blank card. Reference 62c91a carries its cut with 1–1.5 px *warm* lines on a pale card.
   - **Change for the rendered family:**

     | Role | From | To |
     |---|---|---|
     | outer | 2.0 / 2.5 CSS `#1B1B1A` | 1.5 hero / 1.75 close, `#2A2620` |
     | inner | 1.0 | 0.75 at 85% |
     | sil | 1.25 | 1.0 |

   - **Keep** ground at 3.0, so the ground line becomes the only truly heavy line.
   - **Also:** in L01 the canopy fascia's lower silhouette (x 2664, y 425) is 6 dev px at L 18, heavier than the 5 dev px cut. It is probably drawn twice; deduplicate coincident sil segments.
3. **There is still no ground line.**
   - **Where:** in L02 the ragged soil break (x 300–1620, y 615–820) is 2 dev px at L 94–100, the same as lw0. It is lighter than every cut line.
   - **Fix:** draw it as the `ground` role, 3.0 CSS ink, and run it across the bed grade.
   - **Also:** lift the soil card from mean L 163–181 to at least 205 by setting soil dash ink to 0.25.
4. **Draft sheet: there is no middle tier, and rims are doubled.** Polygons separated by tiny gaps are treated as boundaries against air, so they get the outer under-stroke. In L07:

   | Location | Measured | Problem |
   |---|---|---|
   | base / clear-stone line, y 665 | 6 dev px | should be inner |
   | cavity rim y 504 and base top y 526 | 6 dev px each | two heavy rails 22 px apart |
   | liner bar, x 64 | 10 dev px (5 CSS) | breaks R4 (heavier than outer) |

   - **Fix:** treat gaps of 2 mm or less as shared edges and draw them `inner` at 1.0 CSS.
   - Draw the outer stroke only on the assembly outline and on voids of 20 mm or more.
   - Draw the liner as a 1.5 CSS line (c6).
5. **Night and thermal views: the outlines bury the field.**
   - **L05 head:** the pale cut outlines are about 2.5 CSS wide and swamp a field strip only a few px wide. With the field on, make outer 1.0 CSS at paper 45% and inner 0.5 at 30%.
   - **L09, x 560–920, y 680–1040:** isotherms are cased (dark, light, dark; about 4 dev px), and part outlines are 1 px in the same pale tone, so you cannot tell an isotherm from a part edge.
     - Isotherms: a single 0.75 CSS stroke at paper 55%, with no casing.
     - Part outlines: 0.5 CSS at paper 25%.
