# Changes after round 3 reviews (v2 → v3)

| Reviewer | Round 2 | Round 3 |
|---|---|---|
| Envelope architect | 5.4 | 6.0 |
| Studio architect | 5.4 | 6.2 |
| Information designer | 5.8 | 6.6 |
| Visualisation artist | 6.3 | 6.6 |
| **Round mean** | 5.73 | **6.35** |

## Render pipeline (edge3d.js)

**Compositing bug fixed (traced by designer-viz)**
- `OutputPass` and the grade pass are replaced by one final pass: un-premultiply, AgX, sRGB, saturation 0.88 and grain, then composite over the backdrop (opaque output).
- Rain, glass and ghosts are no longer lighter than the paper.

**Backdrop**
- The backdrop and an optional vignette are drawn in that final pass: night #111923 and storm #DCE0E1 fade to the paper at the frame rim. Hero, rain and winter frames have no hard card.

**Night**
- No sky ambient outside; moon 0.6.
- Glass reflects 10%.
- A warm 2400 × 1200 panel at the glass faces west, so light pools on the landing.
- Uncut surfaces desaturate to ≤ 10%, so light colour never mixes with data colour.
- Flowers dim; the night falls in 0.5 s.

**Light**
- Sun lowered to 30° from the west.
- Glass casts shadows.

**Ghosts (build and explode)**
- Silhouettes only, 0.5 px at 25% grey, no fill.
- Not tone-mapped.
- Soil, caps, planting and creases are hidden.

**Lines**
- Cut outlines drawn without depth test, so the dotted dropouts on the ground and slab line are gone.

**Ageing marks**
- Splash band: albedo ×0.78 over 300 mm with a noisy top.
- Algae: a 50 mm band of #3E4636 at 45%.

**Meadow and the thermal scale**
- The meadow fades out over the last 150 mm at the back plane.
- Petals smaller.
- Inferno from 0.1.

## Landing page (landing3d.js / shell)

**Leaders**
- One rule everywhere: horizontal from the label, at most one 45° dog-leg at the anchor. Applied to the explode, ageing, winter and build views.

**Datums**
- In every view: hero, ageing, rain, winter, build.
- Labels sit left of the level staff, so the line never strikes through them.
- New: −0.105 FINISHED GRADE (BED).

**Explode**
- One honest key: all of junction T (grade beam, channel, pan, sill) is the T layer, as the tool tags it. F is "slab on graphite EPS".
- Earth under the slab stays with the subgrade.
- Lifts come from each layer's real height inside the box, for equal visible gaps of about 64 px.
- The landing steps out sideways.
- Tag pitch ≥ 40 px, each tag with a 12 px cut-tint swatch.
- Home positions drawn as grey outlines at 35%.

**Orientation and lens**
- W / E marks above the two top corners, clear of labels.
- Detail A: one straight leader.
- Caption gives the cut position (w 2000, sliding panel).

**Ageing**
- Ticks at 0 / 1 / 5 / 10 / 20 / 30.
- Three split bubbles (year 0 | the chosen year) at the cedar, over the cap and at the drip line.
- Tags in ink in a left column.

**Winter**
- No crop boxes.
- Bubble leaders from each rim to its ring; bubble captions carry a 0–50 mm bar.
- The legend's special-isotherm strokes end at the bar.

**Hero winter**
- The same stepped legend, small, top-right.

**Rain**
- Streaks in water blue #3D6E8F, 1.5 px with soft coverage, 0.30–0.45 m long with a tail, fading to 40% toward the back.

**Build**
- "NOW · <stage>" in the left column, shortened, with a rule leader.

## Tool

**Draft**
- A left label column on wide screens: parts in the left half of the frame are labelled left, so no leader crosses the section.
- Labels wrap to two lines of 26 characters.
- Title block is one line under the frame.
- W and E in 18 px circles.
- Membranes are no longer thickened by the outline under-stroke.
- The PU course has its own 4 px 45° hatch on a darker tint.
- The −0.007 witness label is added.

**Layers**
- Tints at 20%.
- Checkboxes ticked to match the bands drawn.

**Thermal**
- "INTERIOR AIR · Rsi" and "EXTERIOR AIR · Rse" labels.
- W and E marks and a scale bar.
- Note: "soil crop adiabatic; ground temperatures indicative".

## Not changed, with reason
- **Drip position (envelope):** the model has the canopy cap and fascia tip at x −757, and the drip circle is drawn there. The apparent offset is the oblique view of the cut plane.
- **Per-group AO in the explode (viz):** AO needs the same clip planes for every group, so it stays off while the layers are apart.
- Final pass re-links the live backdrop uniform (ShaderPass clones uniforms); night vignette widened (dark to 82 % of the radius); night exposure -0.3 EV.
