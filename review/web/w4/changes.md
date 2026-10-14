# Changes after web round 5 (w4 → w5, final)

| Reviewer | R1 (w0) | R2 (w1) | R3 (w2) | R4 (w3) | R5 (w4) |
|---|---|---|---|---|---|
| web-ux | 5.9 | 6.6 | 6.9 | 7.1 | 7.4 |
| web-visual | 5.2 | 6.1 | 6.6 | 6.85 | 7.1 |
| web-arch | 5.9 | 6.6 | 7.1 | 7.2 | 7.3 |
| **Mean** | 5.67 | 6.43 | 6.87 | 7.05 | **7.27** |

Final screenshots: `review/web/w5/` (not re-reviewed).

## One scroll grammar (desktop)
- **Ageing pins** (240 vh): scrolling ages the fragment 0 → 30 years; slider and ticks scroll to their year.
- **Rain pins** (200 vh): the storm runs between 18 % and 92 % of the band; holding the button still rains anywhere.
- **Build** keeps its pin; its grid widened to 5 : 7 so the drawing sits nearer the list.
- Under reduced motion or below 900 px every band falls back to its static controls.

## Fixed
- **Faded figures.** The entry motion no longer fades the drawings (a WebGL frame could stall the fade at 25 %); figures rise 8 px, captions step on. Observed per band.
- **Thermal labels** at about 11 px with a paper halo; two isotherm labels starting at one edge stack instead of overprinting. The HUD reads "below 0.70" / "meets 0.70".
- **Mobile.** The chip row scrolls the active band into view; the build caption carries the stage ("AXO 05 · Build · 07 / 15 · …").
- **Tool.** No nested scrollbar on the 3D tab; stable panel gutter; subtitle hidden under 600 px; maker parts tagged "(MANUFACTURER)"; the −0.007 label masks the FFL dash.
- **Type.** Long captions in sentence case; body text ≥ 12 px (design-hook findings).

## One number per fact: what is true, and what is labelled
- The tool is built from `rhino/detail02.json`, an **1800 mm detail fragment**; the landing from `rhino/detail02-app.json`, the **6 m model**. W 2000 exists only in the landing's model.
- Round 4 had sent the tool `w=2000` from the landing: that opens an empty sheet. **Reverted.** Tool links no longer carry `w`; the tool opens at its opening cut (w 900).
- So the head reads 6.1 °C at W 2000 (landing) and 6.0 °C at w 900 (tool); f_Rsi 0.48 in both. Both pages now name their cut ("AXO 04 · Winter · cut at W 2000"; "Run the head case in the tool (w 900)").
- Proper fix (follow-up): build the tool from the same 6 m spec, then put one cut and one solve behind both pages.

## Open (named by the panel, not done)
- Tool and landing on one spec (above).
- Control-layer continuity: the air line is drawn only where parts are declared `air`; no part is declared vapour (toggle disabled, says so).
- A true print scale in the title block ("SCALE: BAR" today).
- Build "why" lines: needs a sourced reason per stage, not written here.
- Camera fit to frame on tall drawings (Build, phone hero).
