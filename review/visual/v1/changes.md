# Changes after round 2 reviews (v1 → v2)

Round 2 means:

| Reviewer | Mean |
|---|---|
| Envelope architect | 5.4 |
| Studio architect | 5.4 |
| Information designer | 5.8 |
| Visualisation artist | 6.3 |
| **Round mean** | **5.73** (round 1: 3.95) |

Note: several of the round 2 "still open" tool items (the Layers tab, and datums / W-E / title block on Draft) were already done in the working copy after v1 was captured. They show for the first time in v2.

## Render (edge3d.js)

**Sky and light**
- Overcast-sky gradient environment (zenith #F3F1EC, horizon #CFD2D0, ground #8A857C) replaces RoomEnvironment.
- Sun from the west at 41°, 90° off the view, so cast shadows read. Hemisphere light 0.35.

**Materials**
- GTAO blend 1.0, scale 1.5, radius 0.15 m.
- Glass at 0.15 opacity with a Fresnel ramp to 0.6.
- Granite with a three-tone 2–4 mm speckle.
- Interior slab #BDB6AA.
- Wet roughness ×0.4.

**Night**
- Exposure −0.5 EV, hemisphere 0.12, moon 0.35 #9FB4D6, environment ×0.15.
- 2700 K RectAreaLight inside the room.
- Glass emissive removed.
- Frost mainly as lower roughness.
- Meadow tinted blue-grey through a per-view night uniform.

**Meadow**
- Strap blades (1 in 7, 3× wider).
- Straw seed heads #C9B98A.
- ±HSL variation.

**Lines**
- Every line point lifted 1 mm toward the camera, which stops the dotted cut edge (z-fighting).
- The red focus outline is gone. The threshold keeps its red hatch with an ink outline: one red subject.

**Build ghosts**
- Engine ghost: flat #8C8579 at 18%, depth-written, no shadows. Soil, caps, ink and planting hidden.

**Explode**
- Groups can also step sideways. The landing steps out 0.7 m on its own axis, so the slab and landing separate.
- Inferno starts at 0.1, so −7 °C is a colour, not a void.

## Landing page (landing3d.js / shell)

**Text**
- Paper halos on all overlay text (3 px; dark halos on night overlays).
- Hero card 0.48 set in ink.
- Ageing tags in ink: red now means only the threshold, plus failure in the winter section.

**Datums**
- They now run along the cut axis from a level staff west of the block to their element: FFL / landing, HEAD, U/S BEAM.

**Explode**
- Zone-letter tags E / F / M / T / D / H, the same letters the tool uses.
- Tag column moved right (W − 250).
- Home positions ghosted at 20% grey while apart.

**Detail A**
- The "12" text sits off the hatch.
- The 0–50 mm bar runs along the model's vertical axis.
- The leader drops from the lens and runs across to the ring, avoiding the glazing.

**Ageing**
- Tags in a left column, top to bottom, with no crossing leaders.

**Rain**
- Streaks at least one device pixel wide, with alpha carrying the thinness, water-tinted (#6B8CA3-ish).
- Wind arrow horizontal: "WIND FROM THE WEST".

**Winter**
- Cold-point labels in a right-hand column.
- Crop frame at half opacity.
- Field bubbles: 2D insets of the computed field at the head and the threshold, 1:5.

**Build**
- "NOW: <stage>" tag with a leader to the arriving stage.

**Layout**
- Embed controls moved bottom-right.
- Sections get scroll-margin-top 88 px.

## Tool

**Draft**
- Outer cut outline 2 px (a 4 px under-stroke) with 0.75 px joints.
- Datums at the right edge.
- W / E marks and a title block.
- Ink 12 mm dimension: extension lines at −7 and +5, ticks, no red dashes.
- Red crosshairs and the stray rule removed.
- Circled zone tags (F1, T2, …).
- Labels fitted to the column.
- Text halos.

**Hatches**
- EPS: 45° lines with a dotted line between, on a grey tint.
- Timber end grain: crossed.
- Granite: sparse strokes on grey.

**Layers**
- The ink sheet with the control layers as 2 px bands and 20% tints on the cut only.
- Air recoloured teal (#2E9E8F); red is kept for the signal.

**Thermal**
- Legend top-right, off the field.
- 0 °C at 0.75 px and the f_Rsi 0.70 line at 1.5 px, both labelled on the field.
- "EXTERIOR AIR · Rse" label.
- The HUD names the case.

## Still open
- Draft: a left label column for leaders that cross the section.
- Year-0 ghost outline in the ageing view.
