# Reviewer brief: The Living Edge graphics (visual block, 5 rounds)

## The tool
The Living Edge is a web tool for students and educators. It presents construction-detail sections of a building edge meeting a garden in Vancouver.

The building is a timber-frame house. Its edge has:
- a passive-house wood-aluminium lift-and-slide door with a 12 mm warm threshold
- a grade beam and a slab on graphite EPS
- a lined granite landing with an underdrain
- a planting bed with a meadow
- a steel canopy with a cedar soffit
- cedar cladding and a glulam header

Every graphic is drawn live from one sourced 3D model. Nothing is invented.

## The two pages
**Landing page**
- Hero: a section-box axo that explodes into construction layers on scroll, reassembles, then turns to a winter night with the computed temperature field on the cut.
- Ageing section (0–30 years).
- Rain section (a westerly storm).
- Winter thermal section.
- Build sequence.

**Tool**
- Draft tab: a 2D section sheet.
- Layers tab: a coloured section.
- 3D tab.
- Thermal tab: THERM-style screening.

## The user's references (the bar)
Twelve images:
- Rendered sectional axo fragments with photographic meadow planting, warm paper background, soft sun and ink-hatched cut faces.
- An exploded rendered wall-section axo with dashed leaders, uppercase labels and material swatches.
- Ink detail axos:
  - an isometric timber clamp with numbered circle callouts in a right-hand column, level datums, a ragged soil break and a text legend;
  - a red monochrome 1:10 axo;
  - a blue-background line axo with many leaders.
- SketchUp-style axos: lines plus grey shadows, with line-drawn figures.
- A student board with circular detail bubbles.

The user has rejected earlier work as "juvenile", "default graphic" and lacking a "lineweight rule". They want professional, eye-catching work.

## Standard and rubric
Read `research/17-graphic-standard.md`, especially §7 (the 10-criterion rubric). Skim `research/16-axo-section-graphics.md`.

## Screenshots
Each round's folder is `review/visual/vN/`. Screenshots are 1440×900 CSS px.
- Landing page:
  - 01 hero at rest
  - 02 hero exploded
  - 03 hero winter night
  - 04 ageing at 30 years
  - 05 rain held
  - 06 winter section
  - 07 build at stage 7
- Tool:
  - 08 Draft tab
  - 09 Layers tab
  - 10 3D tab
  - 11 Thermal tab

From round 2 onwards, also read the previous round's reviews and `changes.md` in the previous folder. Judge whether your earlier points were fixed.

## Output
Write your review to the round folder as `review-<your-id>.md`. Return the same text as your final answer, under 550 words, in this format:

1. Scores 0–10 for each of the 10 rubric criteria, then the overall mean.
2. Three things that already work and must be kept.
3. The six most important fixes, ranked. Each must be concrete and implementable in a three.js/SVG/CSS web page: say what to change, where, and to what value or convention.

Do not ask for new or invented construction; the model is sourced. Ask for changes to presentation, labelling, line and colour, or for new views of the existing model. Name the screenshot and the place on it for every point.

Do not edit any other files.
