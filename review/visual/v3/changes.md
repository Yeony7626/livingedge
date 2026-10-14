# Changes after round 4 reviews (v3 → v4)

| Reviewer | Round 3 | Round 4 |
|---|---|---|
| Envelope architect | 6.0 | 6.3 |
| Studio architect | 6.2 | 6.5 |
| Information designer | 6.6 | 6.9 |
| Visualisation artist | 6.6 | 6.7 |
| **Round mean** | 6.35 | **6.6** |

The envelope architect accepted the drip rebuttal after measuring it.

## Render (edge3d.js)

**Night**
- The vignette now reaches every edge and corner, using a rounded-rectangle distance with smoothstep 0.50–0.97. There is no hard card.
- Desaturation acts on the albedo, not on the lit result, so the 2700 K light stays warm. Glass is excluded.
- Glass at night is #1A1D22 with a #FFC58A ×0.12 glow. The spill panel sits 0.05 m off the pane.

**Explode AO**
- Ambient occlusion stays on while the layers are apart. Normals are rendered group by group, each with its own clip planes.

**Light and rain**
- Sun swung to (−6, 3.7, +1.5) from the target, so the meadow and canopy shadows fall along the landing.
- Wet faces get roughness 0.12, with environment reflections rising with wetness to give a sheen.

## Landing page

**Datums**
- Labels sit at least 16 px apart.
- Each label is inset 24 px from the frame, with a 45° dog-leg leader to its staff when displaced.

**Orientation**
- One W ◂—▸ E arrow along the cut axis, under the scale bar. It replaces the circled letters, which read like the E layer tag.

**Explode**
- Lifts are solved on projected screen boxes, iterated at the exploded framing, for equal visible gaps of about 64 px.
- The M and E tags anchor at visible right-hand points.

**Lens**
- The leader end point is measured along the leader itself; it used to stop short.

**Ageing**
- The view leaves a right column of 150 px for the bubbles.
- Bubbles are numbered 1–3 to match the tags.
- Each bubble is 96 px with a 0.75 px rim and a 1 px ink split, labelled YR 0 | YR n, zoomed to the mark.
- Leaders run from each rim to its spot.
- Tags sit at their anchors' heights, so the ALGAE leader no longer crosses the glass.

**Rain**
- Streaks stronger.
- Wind arrow along the model's W–E axis.

**Winter**
- The threshold label starts clear of the colour field.

**Hero winter legend**
- A 0 °C tick and °C units.

**Build**
- The native soil beyond the cut-off is omitted; it caused the shards under the ghosted bed.
- "NOW · …" sits to the right of the block on two lines (up to 28 characters each), with a rule leader.

## Tool

**Draft labels**
- Names are no longer truncated; `shortName` sliced them before the wrap ran.
- Two lines of up to 26 characters.
- Left column 236 px, so labels clear the edge.
- Up to 12 rows.

**Draft drawing**
- Maker parts (the door unit) are flat grey with no hatch, tagged "(MAKER)".
- "−0.007" sits above the granite with an open triangle.
- Datum labels moved to the frame's left, off the sash.
- W ◂—▸ E arrow above the frame.

**Layers**
- The band tint sits under the material hatch at 20%.

**Thermal**
- Legend moved bottom-right, off the field.
- Special-isotherm labels lifted, with halos.
- W and E as circles outside the frame's top corners.
- HUD shows f_Rsi with a subscript.
