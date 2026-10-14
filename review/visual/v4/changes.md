# Changes after round 5 reviews (v4 → v5, final)

| Reviewer | R1 (v0) | R2 (v1) | R3 (v2) | R4 (v3) | R5 (v4) |
|---|---|---|---|---|---|
| Envelope architect | 4.0 | 5.4 | 6.0 | 6.3 | 7.0 |
| Studio architect | 3.6 | 5.4 | 6.2 | 6.5 | 6.6 |
| Information designer | 3.7 | 5.8 | 6.6 | 6.9 | 7.1 |
| Visualisation artist | 4.5 | 6.3 | 6.6 | 6.7 | 6.9 |
| **Round mean** | 3.95 | 5.7 | 6.35 | 6.6 | **6.9** |

Final screenshots: `review/visual/v5/` (not re-reviewed; the web block reviews from here).

## Night goes full-bleed (all four reviewers)
- The hero section's page tokens follow the night (`--wn`): paper → #111923, ink → #E6E3DC. The render's backdrop lerps the same way, so there is no rim, card or white-on-paper text.
- The winter band is permanently night. Overlay halos switch to the night ground automatically.
- Night caption inset 32 px in #E8E4DC; hero legend inset 48 px from the edge; non-breaking spaces in "−7 °C".

## Furniture never on the cut
- Datum labels share one right edge, 14 px left of the block's leftmost screen point; −0.007 LANDING has its own datum; the bed datum renamed "−0.105 BED GRADE" so it fits on paper.
- Scale bar and W ◂—▸ E arrow sit 28 px below the east end of the bottom front edge, parallel to it: never on the cut, never off the frame.
- Winter: no datums or arrow (the THRESHOLD label owns that corner). Build: no datums (it reads as sequence).
- Rain: wind arrow lifted clear of the head datum.

## Explode, lens, ageing
- Home ghosts removed while exploded (the "shards"). Tag pitch ≥ 52 px.
- Lens leader drawn over a 3.5 px paper halo, so it reads across the dark door frame.
- Ageing: one leader per spot (the tag leaders are gone); bubble captions carry the names ("2 · SPLASH BAND OVER THE CAP"); bubble 3 zoomed to the algae band.

## Tool
- Thermal: the plot leaves a 280 px column, legend top-right, never over the field. Special-isotherm labels in ink on a paper halo.
- HUD tween cancels on a newer call and always lands on the final value (it froze mid-tween at 503.41).
- Draft title block: SCALE: BAR · REV 4 · 2026-10-13.

## Deferred (noted, not done)
- Viz: spot-light spill pool at night, key-to-fill retune by day, puddle mask when wet, trench stipple. These change the lighting model; left for a dedicated lighting pass.
