# Reviewer brief: line weight (3 runs)

## Context
The Living Edge draws one sourced construction detail (a sliding glass wall meeting a garden, Vancouver) live in the browser:
- **Rendered section-box axos** (landing page; three.js with screen-space lines over a rendered model, hatched cut faces).
- **Ink sheets** (the tool's Draft and Layers tabs; SVG section with hatches, keynotes, datums, title block).
- **Thermal plot** (the tool's Thermal tab; computed field with isotherms over the section).

The user, an architect, has said after ten review rounds: **"the lineweight doesn't feel right."** This block is only about line weight and what makes it read: the hierarchy of cut, profile, edges beyond, hatch, annotation; ratios between steps; tone and contrast; joins and ends; how hatch and rendered shading compete with lines.

The bar is the user's reference images in `visual reference/` (look at all of them): ink detail axos with a heavy outer profile and fine internal lines, rendered sectional axos with crisp outlines, SketchUp-style line + shadow axos.

The research behind this block is `research/18-lineweight.md` (findings, diagnosis and the revised standard). Judge the drawings against it and against the references, and say where the standard itself is wrong.

## Screenshots
Each run folder `review/lineweight/lwN/` holds captures at **2× device scale** (so 1 CSS px = 2 image px):
- `L01-hero.png`: hero axo, full frame. `L02-hero-threshold.png`: close-up of the threshold and bed.
- `L03-explode.png`: exploded layers. `L04-age-head.png`: close-up of the head at year 30. `L05-winter.png`: winter thermal band.
- `L06-draft.png`, `L07-draft-sill.png`: ink sheet and a close-up of the sill. `L08-layers.png`: control-layer sheet. `L09-thermal.png`: thermal plot.
- Source copies of the drawing code (`edge3d.js`, `landing3d.js`, `draft.js`, `thermal.js`).

From run 2 onwards, also read the previous run's reviews and `changes.md`, and say whether your points were fixed.

## Output
Write `review-<your-id>.md` into the run folder and return the same text, under 500 words:
1. Scores 0–10, then the mean:
   - hierarchy (cut > profile > beyond > hatch > annotation)
   - step contrast (are adjacent weights far enough apart to read)
   - cut-outline dominance
   - silhouette vs crease vs internal edge (rendered axos)
   - hatch vs line balance
   - tone and contrast on paper (and at night)
   - joins, ends and line quality
   - consistency across render, ink sheet and thermal plot
   - match to the reference images
   - overall: does it "feel right"
2. Two things that work and must be kept.
3. The five most important fixes, ranked. Each must be concrete: which role, which view, from what px / colour / opacity to what. Name the screenshot and the place on it (image px ÷ 2 = CSS px).

Do not edit project files other than your review file.
