# Changes after round 1 reviews (v0 -> v1)

Round 1 mean scores: envelope architect 4.0, studio architect 3.6, information designer 3.7, visualisation artist 4.5. **Round mean: 3.95.**

Note: in v0, the tool's Draft tab (08) was broken by a regression: the `pip` helper had moved during the thermal refactor. 08 therefore showed the Layers drawing instead. This is fixed in v1.

## Section box
- Moved to w 800–2000. The cut now falls inside the sliding panel, where the running rail exists, so the 12 mm can be dimensioned honestly (tray slips at −7 to the rail top at +5).
- The thermal fields were re-solved at w 2000.

## Render (edge3d.js)
- GTAO ambient occlusion: radius 0.25 m, blend 0.6. Line and particle meshes are hidden from its normal pass, and it uses the clip planes.
- AgX tone mapping at 0.95, with a grade pass: saturation 0.88 and 2% static grain.
- Lighting: hemisphere 1.15 → 0.6, sun 2.7 → 3.2, environment 0.35 → 0.3.
- Cedar desaturated (#a8906f); steel roughness 0.55.
- Meadow: darker at the blade root, ±35% height jitter, flowers down to 40% and paler.
- Backdrop painted behind a transparent canvas (paper, cool storm paper #DCE0E1, night #111923), unaffected by tone mapping.

## Lines and hatches
- Weights by zoom band (research 17 §1):
  - fragment: cut 1.25 / joints 0.5 / silhouette 0.75 / crease 0.5 / focus 1.0
  - detail: cut 2.0 / 0.75 / 1.0 / 0.6 / 1.5
- Hatch library by material (§2):
  - concrete: stipple and triangles
  - glulam: lamella joints at 38 mm with end-grain cross
  - timber end grain: crossed
  - rigid insulation: 45° with a dotted line between
  - granite: sparse strokes
  - metal: close 45°, opposite angle
  - earth: long and short dashes
  - pebbles for gravel
- Cut faces on pale material tints instead of white.

## Thermal (landing and tool)
- Inferno map in 2 °C bands on the fixed span.
- Isotherms: 0.5 px every 2 °C, 1 px every 10 °C.
- Special isotherms, solid: 0 °C and 11.9 °C (f_Rsi 0.70 at −7/20).
- Vertical stepped legend with special-isotherm marks, boundary conditions and lowest f_Rsi.
- The solved crop is framed in grey and labelled "adiabatic crop".
- Tool: drawing clipped to the solved area.
- Night: uncomputed cut faces become dark poché, cut lines turn light, and the interior glow is less orange.
- Hero card says "coldest f_Rsi, head".

## Explode
- Equal steps: lifts 0/1/1/2/3/4 × 0.42 m.
- Tags numbered bottom-up as 18 px circles.
- Solid leaders 0.75 px with a dot.
- 1 px grey connectors to home positions.
- subgrade-far lifts with the bed, so there are no soil shards.

## Drawing furniture
- On hero, ageing, rain, winter and build:
  - long-dash-dot datums with filled triangles: ±0.000 FFL, +2.785 HEAD, −0.530 U/S BEAM
  - a 1 m scale bar along the cut axis
  - W and E marks
- Detail A: the dimension "12" with ticks, a 0–50 mm local scale bar, and "4X" removed.

## Ageing
- Ticks sit at their true positions.
- RGB values are stripped from the notes.
- Tree and sediment sentences are dropped, with a note that they lie outside the fragment.
- Accent "YR n" tags with leaders on the splash band, the silvered cedar and the algae line.

## Rain
- Streaks cut 70% to 650, about 0.6–0.8 px at 18–28% alpha, at about 75°.
- Splash ring sprites removed.
- Routes moved to an SVG overlay: water #3D6E8F, weights 1.5 and 2.5 px, arrowheads every 80 px animated in the flow direction.
- The glass route is drawn 12 mm outboard, so it reads as outside.
- 4 px drip-edge circle; "W · WESTERLY" wind arrow.
- Legend for rain, routes, drip edge and the route beyond the cut.
- Section laid out like the others: reading left, drawing right.

## Build
- Later stages ghosted at 15% (no caps or ink), so the head never floats.
- Counter shows "07 / 15".

## Tool
- 3D tab replaced by the hero renderer embedded, with "take apart" and "winter night" controls.
- Thermal tab as above.
- Draft regression fixed.

## Not yet done (queued for round 2)
- Tool Layers tab: ink drawing with layer bands.
- Draft datums, title block and W/E.
- Ghosted home positions in the explode.
