# Axonometric graphic correction — 15 October 2026

Updated the active shared renderer and rebuilt `.sketch/viewer/landing.html`. The historical `axo.js` studies are not the active renderer and were left intact.

## Changes

- Reserved a 160 CSS-pixel left annotation margin in assembled views with no existing right column. Level notes now sit outside the planting rather than over it.
- Aligned level text to one column, separated note groups, and connected displaced notes back to their level triangles. Kept the FFL/landing pair together and all existing elevations unchanged.
- Set exploded assembly notes to 12 px, wrapped long names, kept numeric values with their MM units, and constrained the note rows vertically. Retained the existing E/F/M/T/D/H assembly keys and material anchor points.
- Removed the small material swatches from the exploded labels so the key, leader and assembly name read as one callout.
- Fixed the embedded drawing's inherited tablet/phone aspect ratio, which previously expanded the canvas beyond its frame. Reserved a separate strip for state controls.
- Rebalanced line weights and lightened secondary edges and hatching. Screen weights interpolate with model scale; these are CSS pixels, not a print pen specification.

At the middle zoom band (0.15 CSS px/model mm):

| Role | Before | After |
|---|---:|---:|
| Ground | 3.5 | 2.25 |
| Cut profile | 1.75 | 2.0 |
| Internal cut boundary | 0.75 | 0.75 |
| Visible silhouette | 0.85 | 1.0 |
| Crease | 0.75 | 0.45 |
| Material joint | 0.5 | 0.45 |
| Beyond | 0.5 | 0.35 |
| Hatch intensity parameter | 0.5 | 0.35 |

The hierarchy follows architectural drawing practice: strong cut/spatial profiles, lighter planar edges, and subordinate texture. Reference: [University of Memphis Department Drawing Standards](https://www.memphis.edu/architecture/docs/drawing.standards.pdf), plus the project's research/17 and research/18 graphic studies. This is a screen graphic refinement, not certification to a particular office's plotting standard.

## Verification

- Landing build completed: 92 section shapes, 7 plants.
- JavaScript syntax checks and `git diff --check` passed.
- Inspected assembled, exploded and winter states; checked the landing at 1440 × 1000 and embedded drawing at desktop, 760 × 900 and 390 × 844.
- Tablet exploded note bounds remained inside the SVG; mobile document had no horizontal overflow after the embedded sizing fix.
- The existing phone convention hides fine annotation; desktop/tablet remain the annotated views.
- The mechanical design scan reported existing broader-page issues (including button hover contrast and typography conventions); these were outside this drawing correction.

## Images

- [Before, assembled](axo-before.png)
- [After, landing](axo-after-landing.png)
- [After, tablet exploded](axo-after-tablet.png)
- [After, mobile](axo-after-mobile.png)

Source changes: `.sketch/viewer/edge3d.js`, `.sketch/viewer/landing3d.js`, `.sketch/viewer/landing-shell.html`; generated output: `.sketch/viewer/landing.html`.
