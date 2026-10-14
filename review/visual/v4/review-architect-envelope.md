# Round 5 (v4): envelope architect

## 1. Scores
Line 7, Hatch 7, Cut 7, Annotation 6, Datum 7, Render 8, Composition 7, Explode 7, Analysis 7, Cross-view 7. **Mean 7.0** (was 6.3)

**Round 4 points:**
1. 08/09 schedule: **mostly fixed.** Full names, a clear left column and a grey "(MAKER)" door are all in. F2/T2 still run 4.7 px apart (772–800, y 539/544).
2. Render datums: **fixed** for pitch and clipping. **New:** the dash-dot lines and triangles strike through the label text (01 at 630–712, 771; 04 at 150–260, 708–724; 07 at 600–730, 710–726).
3. Orientation: **fixed.** **New:** in 03, THRESHOLD prints over "1 M" (1260, 685). In 06, the E arrowhead sits under "THRESHOLD" (690–720, 562).
4. Threshold levels: **mostly fixed.** The −0.007 open triangle and FFL in the gutter are in. The dash at (579–590, 451) remains. The 01 lens still has no −7/+5 witness lines.
5. Analysis labels: **partly fixed.** 09 is fixed and 03/06 THRESHOLD is clear of the field. In 11, the card still covers the domain and hides the 100 MM bar.
6. Explode/build: **mostly fixed.** The 07 shards and the NOW/ALGAE diagonals are gone, and the 02 gaps are 45–70 px. Stray stroke clusters remain in 02.

## 2. Keep
1. **08:** the 4:2:1 ink, full two-line schedule, flat-grey maker part, −0.007 above the granite and the dimensioned 12.
2. **04:** split bubbles (YR 0 | YR 30), numbered 1–3 to match the tags, with horizontal leaders.
3. **One W ◂—▸ E arrow beside the scale bar**, and identical datum text in every render.

## 3. Fixes, ranked by impact on a professional reader
1. **Datum lines through text (01, 04, 07, 03, 06).**
   - End each dash-dot at its triangle.
   - Place the triangle 6 px right of the label box, never under a glyph.
   - Reject any label position whose box meets the projected model box. Fall back to below the ragged break.
   - In 03/06, replace the white plate halos with a 2 px text-shadow in the field colour.
2. **11 legend card (833–1081, 651–883).**
   - Move the card into the sidebar or below y 805 so the domain and the 100 MM bar (≈940–1030, 790) show.
   - Isotherm label (790–910, 365): stroke #F4F2EC, not #111, at fs/8. Set Rsi as a `<tspan baseline-shift="sub">`.
3. **03 night furniture.**
   - The caption (505–735, 100–145) is white on a fading paper ground and illegible. Set it below the frame in #1E1E1E.
   - The legend labels are clipped at x 1395 ("2", "0", "-"). Inset the legend 48 px from the canvas edge.
   - Drop the scale group 40 px so it clears the THRESHOLD label.
4. **06 left stack.**
   - "+2.785 HEAD" (165–243, 395) touches the threshold bubble rim. Move it below y 420.
   - "THRESHOLD" is clipped at x 58. Inset the bubbles to x ≥ 84.
   - Seat the W–E arrow 24 px below the THRESHOLD label.
5. **Threshold, 08 and 01.**
   - T2: put the 45° kink at x ≤ 752, so its run at y 569 never parallels F2.
   - Delete or tag the dash at (579–590, 451).
   - Title block: add the revision, the date and "SCALE: BAR".
   - 01 lens: add −7/+5 witness lines on the red sill. Draw the leader with depthTest off; it dies at (1035, 532), short of the ring (1140, 612).
6. **02 debris.**
   - Hide the ghost edge and hatch lines while exploded, keeping only the 0.5 px silhouettes. These clusters read as shards: (705–740, 765–800), (807–842, 605–627), (835–855, 720–740) and (940–967, 690–710).
   - Lower the M leader from y 657 to ≥ 668 so it leaves F's lower edge.
