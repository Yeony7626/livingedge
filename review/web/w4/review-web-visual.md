# Review: web-visual, round 5 (w4)

## 1. Scores
IA/narrative 7.5 · Layout/grid 7 · Typography 7.5 · Colour/imagery 7.5 · Motion 6.5 · Impact 7 · Tool usability 7.5 · Responsive 6 · Accessibility 6.5 · Coherence 8 · **Mean 7.1** (was 6.85)

**Round-4 points**
1. **Pin Winter/Build: partly fixed.** Build is pinned and stepped (d07). In Winter the h2 still sits under the bar (d06 "leaks." at y=85), and the figure was captured at about 30 % opacity.
2. **Fill the frames: not fixed.** The d07 drawing spans x=770–1355 with a dead band at x=480–760. d05 stops at x=1285. On m01 and m04 the axo is about 160 px wide in a 358 px stage.
3. **Halo/clearance: partly fixed.** d05, t03 and the d03 legend are clean. Still wrong: "BED GRADE" touches the block (d01 x=638, d04 x=175), the FFL dash still strikes "−0.007" (t01 y=399), and "THRESHOLD 13.6" sits on ink (m03 y=418).
4. **Captions: fixed on desktop.** m04 still has no "07 / 15" and no stage name in view.
5. **Thermal sheet: partly fixed.** "WATER CORNER" now fits (t01) and the t03 switch is aligned. Still wrong: the t04 legend tops out at y=72, not at the field, and the in-field labels are still about 7 px.
6. **Entry motion/dead space: partly fixed.** The rise exists and the d08 gap is gone. There is no mask fade, so text is sliced at y=515 (m02, m03).

## 2. Keep
1. The hero triptych with the inverting nav, and the labelled explode (d01–d03). It is the one moment that feels authored.
2. Barlow numerals as the voice: 30, 0.76 against a red 0.48, 07/15, 212.
3. The draft and layer sheets (t01, t02) and the sources table (d09).

## 3. What would most raise the level, ranked
1. **Fit every camera to its frame** (d05, d07, m01, m04).
   - Project the bounding box and set zoom = `min((w-48)/bw, (h-48)/bh)`, centred.
   - Expected result: d07 spans x≈500–1385, and m01/m04 fill about 340 px.
   - Empty frames are the single biggest thing that still looks "default".
2. **Mobile sticky figure** (m01–m04).
   - Set the stage to `height:46svh`, fitted as in point 1.
   - Add `figure::after{content:"";position:absolute;inset:auto 0 -24px;height:24px;background:linear-gradient(var(--bg),transparent)}`.
   - On m04, overlay "07 / 15" (Barlow 48 px) and the stage name at the top left of the frame.
3. **Winter band** (d06).
   - Set `.winter{padding-top:calc(var(--navh) + 56px)}`, so the h2 starts below the bar.
   - Trigger the reveal on the section, not the sticky figure: IntersectionObserver `threshold:0`, `rootMargin:"0px 0px -25% 0px"`.
   - Never leave the drawing below full opacity.
4. **One scroll grammar for every band.** Ageing (d04) and Rain (d05) are still click-only.
   - Pin Ageing at `height:240vh` and map progress to years 0–30, as Build does.
   - Pin Rain at `200vh` so the storm starts at 20 % progress. Keep the hold button as an override.
   - Count the Barlow numerals up with `font-variant-numeric:tabular-nums` (300 ms).
   - Under reduced motion, fall back to the static controls.
   - This turns a set of widgets into a choreographed story. It is the step from competent to memorable.
5. **Halo and clearance** (d01, d04, t01, m03).
   - Apply `svg text{paint-order:stroke;stroke:var(--bg);stroke-width:4px;stroke-linejoin:round}`.
   - Clamp the datum-ladder labels to at least 24 px west of the projected block's min-x.
   - Mask the FFL dash with a rect in `var(--bg)` behind "−0.007".
6. **Thermal and 3D tabs** (t03, t04, t06).
   - Set every in-field label to at least 10 px ("EXTERIOR AIR", "11.9 °C", "SOIL CROP").
   - Top-align the legend to the field (t04 y=265, t06 y=231).
   - Set the 0.76 and 0.48 headlines to 64 px Barlow, matching d06.
   - Remove the inner scrollbar at x=1092 (t03): `overflow:hidden` on the canvas wrap.
   - Set the 3D switch to uppercase mono, as on the landing (m01).
   - Fill the black "TOOL" cell in the footer (d08 x=1177–1385) with a small Draft-sheet thumbnail.
