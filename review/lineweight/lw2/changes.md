# Changes after line-weight run 2 (lw2 → lw3)

| Reviewer | Run 1 | Run 2 |
|---|---|---|
| lw-designer | 4.9 | 5.3 |
| lw-architect | 4.6 | 5.4 |
| **Mean** | 4.75 | **5.35** |

## Rendered axos (edge3d.js)
- **Pale cut cards.** The unlit cut tint is lifted ×1.22 before the grade, so after AgX and AO the cards sit near the paving instead of below it (designer's top point: the tonal order was inverted).
- **Cut vs silhouette: a width and tone step.** Outer 1.75 hero / 2.0 close in warm ink; silhouette 0.85 at 85 %; ground 3.5 / 4.0 (2× the cut).
- **Membranes are one line.** Membrane-thin cut parts draw as their own ink fill only; their outline bundle is gone (neighbours meet them with inner lines).
- **Ground continuous.** The grade line is drawn wherever soil faces up against anything else (air or the sub-base), not only air.
- **Slivers** (cut strips under ~25 mm) take tint only, no pattern: one band, not a dashed bar.
- **Night.** Silhouettes and creases switch to paper (`#F4F2EC`) at 60 % / 30 %, so the block holds its shape on the dark ground.
- Very dark renders lifted further (threshold L 0.2, toward `#9a9690`).

## Ink sheet (draft.js)
- **Membranes and metal sheets thinner than 4 px draw as one 1.5 px line along their own path**, never a filled bar (sill pan, upstand, liner).
- **Ground line on the sheet**: the top of soil, wherever something sits on it, 3 px.

## Thermal plot (thermal.js)
- Part outlines on the flood use a mid-grey in difference blend: light on the cold end, dark on the warm end.

## Also in this run (user request)
- Level lines run along the axo axis to one staff (no dog-legs); FFL and −0.007 share one line; bubble and lens callouts use 45° + horizontal leaders.
