# designer-viz, round 2

## 1. Scores

1. Line hierarchy: 7
2. Hatch: 7
3. Cut vs not-cut: 7
4. Annotation: 6
5. Datum, scale, orientation: 6
6. Render light and colour: 6
7. Composition: 6
8. Explode: 6
9. Analysis honesty: 7
10. Consistency: 5

**Mean: 6.3** (round 1: 4.5)

**Round 1 points:**
- **Fixed:** 1 (3D tab).
- **Mostly fixed:** 3 (grading; granite speckle still open) and 6 (explode; ghosting and the soil cavity still open).
- **Partly fixed:** 2 (AO), 4 (rain), 5 (night) and the meadow.

## 2. Keep

1. **01:** the desaturated cedar, the steel canopy, the pale hatched caps and the ragged break on paper.
2. **10:** the 3D tab now uses the hero renderer.
3. **06 / 11:** the inferno 2 °C flood on the cut only, with the stepped legend and the solid 11.9 / 0 °C isotherms.

## 3. Fixes, ranked

1. **The sun is front-lit, so 01 has no visible cast shadow.** It sits about 20° off `VIEWDIR`, so the shadows fall behind their casters.
   - Set `sun.position = target + (−5, 5.6, −4)`: from the west, 90° off the view, at 41°.
   - Hemisphere 0.6 → 0.35. Shadow `radius` 4.
   - Check: the canopy shadow should land on the cedar and glass (x 1040–1160, y 280–560).
2. **Replace `RoomEnvironment`, the WebGL-default tell, with an overcast sky IBL.**
   - Use PMREM `fromScene` of a gradient sphere: `#F3F1EC` zenith, `#CFD2D0` horizon, `#8A857C` ground.
   - Glass (01 x 1065–1150, y 340–560) reads as plastic. Use opacity 0.15 with a Fresnel ramp to 0.6.
   - Granite: three-tone speckle at 2–4 mm.
   - Interior slab: `#BDB6AA` with a ±4% mottle; it now matches the landing grey.
3. **AO is invisible, and it is off in 02.**
   - Set GTAO `blendIntensity` 1.0, `scale` 1.5, radius 0.15 m, for 10–15% darkening at the sill (01 x 1060–1130, y 545–600).
   - In 02, add a multiply contact-shadow plane under each lifted group at opacity 0.22 × (1 − lift/1.7 m).
   - Cap the brown subgrade top (02 x 770–960, y 655–755) with the earth tint and hatch.
4. **Night still reads as daylight.** The 03 landing (x 700–1100, y 560–700) is ≈`#8E9196`; it should be ≈`#3A4250`.
   - Exposure 0.45, hemisphere 0.12, moon 0.35 `#9FB4D6`.
   - Show frost as roughness, not lighter albedo.
   - Meadow ×`#5D6B80` through a `uNight` uniform.
   - Glass emissive → 0; it reads as a tan panel. Add a 2700 K `RectAreaLight` (2.4 × 1.2 m, intensity 8) on the inside ceiling, facing down.
   - Fade the section to `#111923` instead of using a hard card. In 06 the card runs under the nav.
5. **The rain in 05 renders as dotted dashes** (x 740–1000, y 200–700): the 0.30–0.42 px quads are sub-pixel.
   - Clamp the width to ≥ 1 device px, alpha scaled to match. Fade the tail over 20–30 px. Slant at a true 75° on screen.
   - Wet roughness ×0.4. `FogExp2` reaching 45% at the E end.
   - Replace the hard panel with a section fade to `#DCE0E1`.
6. **The build ghosts in 07 stack into brown sludge, white slabs (x 790–1030, y 545–640) and shards (x 735–850, y 640–705).**
   - Use a depth prepass, then `MeshBasicMaterial` `#8C8579` at 0.18 with no shadows, plus a 0.5 px silhouette at 25%.
   - Hide the soil undersides of the ghosted groups.

**Meadow:** add strap blades 3× wider, straw `#C9B98A` seed tufts at 15%, and an alpha fade at the far edge.
