# Round 4 (v3): envelope architect

## 1. Scores
Line 7, Hatch 6, Cut 7, Annotation 5, Datum 6, Render 7, Composition 6, Explode 6, Analysis 7, Cross-view 6. **Mean 6.3** (was 6.0)

**Round 3 points:**
- 08 annotation: partly fixed. Left column and title block are in. Labels are cut at 26 characters ("SLAB 1", "75 ON") because `shortName()` slices before `wrap()`. No date or confidence key.
- Hatches: partly fixed. PU and liner done. 09 open: opaque cream erases the hatches.
- The 12: partly fixed. 06 done; 01 lens still a bare tag; 08 "−0.007" sits inside the granite cut.
- Render datums: partly fixed. The labels collide (fix 2). No heaviest ground line; soil still dashed.
- Analysis: mostly fixed. **I accept the drip rebuttal.** 757 mm at ≈73 px/m puts the tip at x≈1025; drip at 1030 (05).
- Explode: partly fixed. Ghosts and earth fixed; gaps and shards not.

## 2. Keep
1. 08 ink sheet: 4:2:1 line weights, the PU hatch, the scale bar and the 12 with its ticks.
2. Datums along the cut axis, plus finished grade, in every view.
3. The 02 key: tags and swatches match the tool.

## 3. Fixes, ranked
1. **08/09 schedule.**
   - Remove `.slice(0, colChars)` from `shortName`.
   - Left labels start at x 0; move FX 60 px right.
   - No tag reaches the sash, sill or door (636–770, 277–460):
     - always include the parts of the viewed junction (T, D);
     - set `rowsFit` to 10;
     - tint the maker door grey with no hatch, tagged "(MAKER)" (replaces my timber/aluminium ask).
   - The F2 and T2 leaders run 4 px apart (771–806, y 545/549). Keep at least 8 px.
2. **Render datums.**
   - The canvas edge (x 502) clips "±0.000" and "−0.105" in 01 and 03.
   - The labels overprint at a 9 px pitch in 04 (57–247, 711–727), 05, 06 and 07.
   - Fan to 14 px pitch, one 45° dog-leg; clamp x ≥ canvas + 8.
3. **Orientation.**
   - The circled E is identical to tag E (subgrade, 02 at 1117,743). Use one W ◂—▸ E arrow parallel to the scale bar.
   - 01: the W ring hits "PANEL" (719,337).
   - 05: draw the wind arrow along the model's W–E axis, not the screen horizontal.
4. **Threshold levels.**
   - 08: put "−0.007" at `ty0 − 5` with an open triangle.
   - 08: move "±0.000 FFL" off the sash (712–782, 388) into the gutter, and move E (790,812) outside the frame.
   - 08: delete the orphan dash at (568,450).
   - 01 lens: witness lines at −7 and +5.
5. **Analysis labels.**
   - 11: the isotherm strikes through "11.9 °C · fRsi 0.70" (855,380). Lift 6 px, add a halo.
   - 11: the card hides "INTERIOR AIR · Rsi"; move the card off the domain. E overprints "100 MM" (1027,780).
   - 03 (1170,643) and 06 (686,524): "THRESHOLD" sits on the field. Start 12 px clear, with a leader.
   - 09: tint at `fill-opacity:.2`, under the hatch.
6. **Explode and build.**
   - 02: H–D ≈ 6 px, D–T ≈ 5 px, and T and F overlap (515–650). Use equal 64 px gaps.
   - 07: the shards remain (745–835, 705–750).
   - Long diagonal leaders; use a horizontal run plus one 45° kink:
     - 07 NOW (807,238 → 1065,610);
     - 04 algae (322,296 → 530,590).
