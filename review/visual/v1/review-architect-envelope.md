# Round 2 (v1): envelope architect

## 1. Scores (v0 → v1)
1 Line hierarchy 4→5, 2 Hatch 4→5, 3 Cut 6→6, 4 Annotation 3→5, 5 Datum 1→4, 6 Render 6→6, 7 Composition 6→6, 8 Explode 4→6, 9 Analysis 4→7, 10 Cross-view 2→4, **Mean 5.4**

**Round 1 status:**
- Draft: partly fixed (08 inked; 09 unchanged).
- Datums: partly fixed (landing only).
- Hero hatches: fixed in 01, regressed in 08.
- Analysis: largely fixed.
- Render line hierarchy: open.
- Explode: mostly fixed (ghosting and 07 shards open).

## 2. Keep
1. **The thermal arithmetic (06, 11).** L2D 0.674 = 18.21/27, the U-tags sum to 18.21, and the balance is 0.00 %. The failing head is shown.
2. **The "12" in Detail A (01) is correct.** Tray-slip top −7 to rail top +5 is the B651 height above the adjoining surface.
3. **The explode tags (02)** run bottom-up with solid leaders and connectors.

## 3. Fixes, ranked
1. **08: the hatches are swapped.**
   - The EPS uses the crossed timber hatch. Draw it as 45° lines with a dotted line between.
   - Give the crossed hatch to the wood sill (x 505–720, y 400–465) and the sash (y 215–375).
   - The granite slips (y 388–437) need sparse strokes on `#8E8C88`.
   - The 01 canopy cut is crossed too; draw the steel as solid poché.
2. **The 12 as a real dimension.**
   - 08: replace the red *dotted* "THRESHOLD 12" line (y 368) with ink extension lines at −7 and +5, a dimension line in the slot (x≈490) and ticks. Dotted means illustrative, and this value is computed.
   - 01 lens: move the dimension off the hatch.
   - Project the 0–50 bar vertically through `LENS.cam`; screen-horizontal is not a model axis.
   - Note "lip −12, local rise 17, B651 open".
3. **Anchor the datums.**
   - In 01 (x 512–625) the datums stop 90 px short of the box. A horizontal screen line is not an axo level.
   - Run each datum along the cut axis from a W-edge level staff to its element.
   - Add top of landing −0.007 and finished grade.
   - Repeat in 08, with W | E and a title block.
4. **Ground line (01, x 880–1130, y 610–700).**
   - The cut's top edge renders dashed (a confidence style). Make it 1.75 px continuous.
   - Set the pebble hatch to 60 %.
   - The hero sill (x 1120–1150, y 612–625) is still a red fill; draw it as a 1.25 px ink outline.
5. **Leaders.**
   - 08: leaders 02 and 07 cross the whole section (y 457 and y 750). Add a left label column.
   - 04: the YR 30 leaders cross each other, and the text overlaps the canopy (x 680–910, y 225–285).
   - 02: "04 WARM SILL" overlaps the slab (x 1100–1140).
6. **Explode logic.**
   - 02: layers 02 and 03 share a lift, so their gap is zero.
   - Number the tags by the 07 build stages, not by screen y.
   - Move the landing on its own step in +X.
   - Ghost the context at 20 % grey.
   - 07: delete the shards (x 740–830, y 665–705) and make the ghosts grey, not peach.

**11:**
- Label the 0 and 11.9 isotherms on the field.
- Label the white void (x 400–480, y 350–378) "exterior air, Rse".
- Move the legend off the domain.
- Make the card read "threshold".
