# Review lw3: lw-architect

Coordinates are CSS px (image px ÷ 2). L is luma, 0–255.

## 1. Scores
| Criterion | lw2 | lw3 |
|---|---|---|
| Hierarchy | 6 | 7 |
| Step contrast | 5 | 6 |
| Cut-outline dominance | 6 | 6 |
| Silhouette / crease / internal | 5 | 6 |
| Hatch vs line | 6 | 6 |
| Tone, paper and night | 5 | 5 |
| Joins, ends, quality | 5 | 5 |
| Consistency | 5 | 6 |
| Match to references | 6 | 6 |
| Feels right | 5 | 6 |
| **Mean** | **5.4** | **5.9** |

## My run-2 points
1. **Membranes: partly fixed.**
   - Fixed: the L07 liner (x 33) is one line now. But it is 2 CSS, the same as the outer line.
   - Not fixed: the sill pan (L07 485–520, 119–125) is still a 10 device-px bar at L73. The upstand (489–492, 148–210) is still a 6 px bar.
   - Not fixed: the L04 head bundle (152–156, 150) is 8 px at L<25, twice the outer.
2. **Ground: fixed in the render, wrong on the sheet.**
   - L02 (545, 260): the ground is now 6 px at L17. In lw2 it was 2 px at L93.
   - L06: the sheet line is a 3 CSS fragment, 54 px long, at the F1/F10 joint (752–806, 732). I asked for that in run 2, and seeing it drawn, I was wrong. It is a subgrade joint, not a grade. It stops dead at the crop and reads as a stray line.
3. **Sheet classifier: not fixed.** The beam/T4 edge (L07 200, 380) is still 5 px at L27.
4. **Cut vs silhouette: fixed.** In L02 the glass-frame silhouette (592, 75) is 3 px at L36, against an outer line of 5 px at L18 (594, 220).
5. **Dark grounds: partly fixed.**
   - Fixed: night silhouettes now read, and thermal outlines hold on both ends of the scale.
   - Not fixed: the night canopy is still L14 on an L24 ground (L05 530, 220), and the explode subgrade is L99 (L03 870–920, 725–750).

## 2. Keep
1. **The hero order: ground > cut > silhouette.** It is now readable as width and tone, with the bed sitting on a heavy grade (L02). This is the 62c91a / ede6f9 skeleton.
2. **Outlines that adapt to the ground.** The thermal outlines in difference grey (L09) and the paper silhouettes at night (L05) stop the drawing dissolving.

## 3. Fixes, ranked
1. **R4 is still broken by three bars.**
   - Sill pan: change the `#4A4946` fill to paper. Draw the top face at 1.5 and the underside at 0.5.
   - Upstand: one 1.5 line.
   - L04 head: where two parallel cut edges sit within 2 CSS px of each other, drop the inner one, so cedar + WRB draws as 1.75 + 1.25 rather than a black strip.
   - The rule "<4 px → line" missed the pan because it renders at about 5 px. **c6 is wrong here:** any sheet metal or membrane under 6 mm at sheet scale is a line, never a fill.
2. **The cut cards are still grey.**
   - They measure L148–159 (L01 1340–1370, 550–560; L02 780–805, 120–130), about the same as the paving at L145–153. The ×1.22 lift bought about 7 L.
   - Composite the cut faces after the OutputPass, with no AgX and no GTAO. Target L205–215.
3. **Sheet classifier.**
   - Draw the beam/T4 edge (L07 200, 335–420) at 1.0, not 2.5.
   - Draw the liner at 1.5, not 2.0.
4. **Ground on the sheet: reserve 3.0 for the exterior finished grade only.**
   - Return the F1/F10 joint to inner 1.0.
   - **The standard is wrong:** c2's "cut meets soil" should read "finished grade". Buried interfaces are inner lines.
5. **Dark surfaces.**
   - Night canopy albedo: raise to at least L45.
   - The night outer line matches the silhouette (L05 602, 210: about 2 px at L110). Make the outer 1.5 paper at 80 % and the silhouette 1.0 at 60 %.
   - Explode subgrade: lift to L120 or more.
