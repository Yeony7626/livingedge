# Changes after line-weight run 1 (lw1 → lw2)

| Reviewer | Run 1 |
|---|---|
| lw-designer | 4.9 |
| lw-architect | 4.6 |
| **Mean** | **4.75** |

Run 1 (from research 18) fixed the device-pixel bug (widths now CSS px × DPR, ≥ 1 device px, alpha below), split roles (ground / outer / inner / joint), cut the hatch to 0.4 and made the ink sheet hatch screen-constant. Reviewers: "faint everywhere became heavy everywhere", and two views leaked lines.

## Rendered axos (edge3d.js)
- **Leaking lines fixed at the root.** Silhouette and crease segments spanned the whole 6 m wall; the line shader's clipping did not hold, and the old 85 % depth fade had hidden it. Every seen segment is now clipped to the section box on the CPU (Liang–Barsky) and coincident duplicates are dropped (the doubled fascia silhouette).
- **Softer rendered family** (designer): outer 1.5 px hero / 1.75 close in warm ink `#2A2620`; inner 0.75 at 75 %; silhouette 1.0; ground 3.0, now exactly 2× the cut (architect: ISO extra-wide = 2× wide).
- **Ground only on the grade line.** Soil's other box edges (the "stakes") draw as `beyond`, 0.5 at 35 %. The ragged soil break is a light break line (45 %), not ground.
- **Ghosts** keep silhouettes only, 0.5 px at 25 %.
- **With the thermal field on** the cut steps back: outer 1.0 at 45 %, inner 0.5 at 30 %, joints off.
- **Hatch** 0.5 hero / 0.55 close (architect: materials must stay legible); soil hatch at 60 % of that.
- **Dark renders lifted** (no surface below ~L 110): membranes `#4a4b4e`, any very dark tone pulled 35 % toward `#8a8784`.
- Explode connectors 0.75 px at 45 % `#8C8579`.

## Ink sheet (draft.js)
- **One edge, one weight.** After the fills, every polygon edge is classified by what lies 2.5 mm (or 1.5 px) either side: against air or a void → outer 2 px; between parts → inner 1 px, drawn once by the part on top; edges hidden under a later part are skipped. Gaps of ≤ 2.5 mm count as shared, so no more doubled rails; the 3 px under-stroke is gone.
- **Membranes** (EPDM, LDPE, HDPE, butyl, geotextile, SBS): ≤ 1.5 px rendered → a 1.5 px line; thicker → a double 0.75 px line on paper, never a black bar.

## Thermal plot (thermal.js)
- Part outlines ink 0.75 at 55 %; isotherms pale (`#F4F2EC`) 0.75 at 55 % / 1.25 at 70 %, special isotherms 1.75 solid; no casings, so parts and isotherms are told apart by tone.
