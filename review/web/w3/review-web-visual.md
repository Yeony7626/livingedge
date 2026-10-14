# Review: web-visual, round 4 (w3)

## Scores
IA/narrative 7.5 · Layout/grid 6.5 · Typography 7 · Colour/imagery 7.5 · Motion 6 · Impact 7 · Tool usability 7 · Responsive 6 · Accessibility 6.5 · Coherence 7.5 · **Mean 6.85** (was 6.6)

## Round-3 points
1. **Band framing: partly fixed.** d05 is centred and has a caption. Still wrong:
   - d06 overflows: the h2 is cut at y=70, the HEAD lens at y=63, the button at y=890.
   - d07: the h2 sits at y=85 and the list runs off-screen.
   - The drawings stop at x=1255 (d05) and span only x=770–1215 (d07).
   - d04 and d06 have no AXO caption.
2. **Labels off ink: partly fixed.** The wind label (d05) and the slider ticks (t01) are fixed. Still wrong:
   - "BED GRADE" touches the bed (d01 x=638).
   - The LANDING arrow points into the grass (d04 x=165).
   - The FFL dash strikes "−0.007" (t01 y=399).
   - "0 °C" sits on the roof edge (d03 x=1345 y=212).
   - No halo.
3. **Sources: fixed** (d08, d09). New: a dead gap at d08 y=445–640.
4. **Pinned Build: mobile fixed (m04).** The desktop band is not pinned.
5. **Mobile: partly fixed.** The caption strip, the canopy and the t05 ellipsis are fixed. Still wrong:
   - The m01 axo spans only x=118–285.
   - The m02 axo is left-heavy.
   - The m02 h2 slices under the sticky figure (y=465).
6. **Tool panel: mostly fixed.** Still wrong:
   - "WATER CORNER" wraps (t01).
   - The t04 legend is unaligned.
   - The in-field labels are about 8 px.

## Keep
1. The hero triptych with the inverting nav (d01–d03).
2. Barlow numerals as the voice: 30, 0.76 against 0.48, 07/15, 212.
3. The draft and layer sheets (t01, t02) and the three-column sources table (d09).

## Fixes, ranked
1. **Pin Winter and Build.**
   - Apply `min-height:220svh` to both bands.
   - Make the figure `position:sticky;top:64px;height:calc(100svh - 64px)`.
   - In Build, set step = `ceil(progress*15)`.
   - Give sections `scroll-margin-top:96px`.
2. **Fill the frames.** Fit the camera to the projected bounding box: zoom = `min((w-48)/bw,(h-48)/bh)`, centred. Then d05 reaches x≈1385, d07 spans x≈520–1385, and m01/m02 fill 358 px of width.
3. **Halo and clearance.**
   - Apply `svg text{paint-order:stroke;stroke:var(--bg);stroke-width:4px;stroke-linejoin:round}`.
   - Put the datum ladder 24 px west of the bed (d01, d03, d04).
   - Mask the FFL dash under "−0.007" (t01).
   - Move the d03 legend to the bottom right (y≈560–700).
4. **Caption and numeral system.**
   - Add "AXO 02 · AGEING · W 2000" (d04) and "AXO 04 · WINTER · −7/20 °C" (d06).
   - On m04, add a 16 px caption-to-title gap and restore "07 / 15" in 64 px Barlow.
5. **Thermal sheet (t04).**
   - Move the legend into the empty x=800–1080 column, top-aligned to the field at y=265.
   - Set every in-field label to at least 10 px.
   - On t03, give the take-apart bar `align-items:center`.
   - On t01, set the view buttons to 10.5 px so "WATER CORNER" stays on one line.
6. **Entry motion and dead space.** Below the hero, motion is only colour transitions.
   - On band entry, step the caption on (`steps()`, 300 ms), then fade the drawing in with an 8 px rise (400 ms, `cubic-bezier(.2,.7,0,1)`). Gate it on reduced motion.
   - Give the m02 sticky figure `background:var(--bg)`, a 1 px rule and a 24 px mask fade.
   - Cut the d08 gap to 96 px.
