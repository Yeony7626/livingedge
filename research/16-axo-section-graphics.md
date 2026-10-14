# 16 — Axonometric section graphics (hero cut: edge meets garden)

Scope: graphic conventions for a sectional axo / cutaway block of the sliding wall, threshold, canopy, granite landing, rain garden and soil. Items marked **[practice]** are common studio convention that no fetched source stated directly. Treat them as judgement calls.

## 1. Projection choice

| Type | Angles | Axis scale | Use |
|---|---|---|---|
| Isometric | 30/30 | equal | Neutral object view. All faces distorted equally, so no face is true. |
| Plan oblique (military) | 45/45 | plan true, z often 0.5–1 | Site and plan work: the plan stays true. |
| Plan oblique 30/60 | 30/60 | plan true | One façade dominates. |
| Elevation oblique (cavalier / cabinet) | cut face frontal, depth receding at 30–45° | depth 1.0 / 0.5 | Front plane stays **true shape**. |

Sources: [Aalto Digital Design](https://digitaldesign.aalto.fi/digital-design-workflows/vector/2d-cad-drafting/drawing-3d-axonometry/), [UBC axonometric glossary](https://blogs.ubc.ca/axonometric/visualglossary/)

**Recommendation:** use an **elevation oblique**. Keep the section polygon frontal and true to scale, and recede the extrusion along the wall at 30° (or 45°) up and to the side, foreshortened to about 0.5 (cabinet). Your drawing *is* a section, so the cut face has to stay measurable, the way a 1:20 detail does. A 30/30 iso skews every layer and makes membrane thicknesses illegible. If you want a more spatial look, a 30/60 axo with the cut on the 60° face is the fallback. **Extrusion depth:** roughly 0.6–1.0 times the cut height. That is enough to show one mullion bay, a paver joint rhythm and a planting module, but short enough that the block reads as a slice rather than a building. Choisy's sliced worm's-eye axos are the precedent for combining a true cut with 3D depth in one image ([ACSA/TU Delft on Choisy](https://repository.tudelft.nl/file/File_cd512138-5b4d-4aa1-aed6-18ff760be308?preview=1)).

## 2. Cut face treatment

- **Hierarchy:** the cut line is heaviest, seen edges are medium, and surface or hatch lines are thinnest. Weight drops as edges recede from the cut plane. Typical pens: cut 0.5–0.7 mm, seen 0.25–0.35 mm, beyond 0.13–0.18 mm, hatch 0.13–0.18 mm, hidden/dashed 0.25 mm, ground line 1.0–1.4 mm. Sources: [learnarchitecture line weights](https://learnarchitecture.net/articles/39292-architectural-line-weights.html), [Illustrarch section guide](https://illustrarch.com/articles/77908-draw-architectural-section.html), [Studio Matrx sections & details](https://www.studiomatrx.org/students/interior-graphics-2/sections-and-details)
- **Poché vs hatch:** poché (solid black or dark grey) only says "solid". Hatch identifies the material. At detail scale, hatch or tint each layer and keep the hatch lighter than the cut outline. Earth gets an irregular diagonal hatch, concrete gets dots and triangles, insulation gets a batt/cloud pattern. Hatch only the surfaces the cut plane passes through, never the faces seen beyond it. Same sources, plus [SketchUp poché](https://blog.sketchup.com/article/quick-poché-for-your-section-cuts).
- **Ground:** a heavy ground line anchors the drawing ([learnarchitecture](https://learnarchitecture.net/articles/39292-architectural-line-weights.html)). For soil below grade, use the section-box "disc/slab" crop: the terrain is cut as a block with a straight bottom ([Architizer axo tutorials](https://architizer.com/blog/practice/tools/video-tutorials-to-level-up-axonometrics/)). **[practice]** End soil hatching in a ragged or fading lower edge, not a hard box, so the earth reads as continuous.

## 3. Depth cues

- Use one light tone on everything beyond the cut ([Illustrarch](https://illustrarch.com/articles/77908-draw-architectural-section.html)). Varying opacity and line weight builds depth ([Architizer section tutorials](https://architizer.com/blog/?p=146756)).
- Use the conventional 45° light, from the upper left, falling to the lower right. Shadow offset equals the projection, so a canopy that projects 900 mm casts a shadow 900 mm across and down. Keep one light direction across the whole drawing. Sources: [SketchUp forum](https://forums.sketchup.com/t/45-degree-shadows-without-pugins/84362), [Studio Matrx tone & light](https://www.studiomatrx.org/students/architectural-graphics-2/rendering-tone-light-and-context), [HUD Shades & Shadows](https://www.huduser.gov/Portal/sites/default/files/pdf/Shades-and-Shadows.pdf)
- Rudolph built depth with dense parallel and cross-hatched ink lines, in strong light/shadow contrast ([Drawing Matter](https://drawingmatter.org/?p=56378), [MoMA](https://www.moma.org/collection/works/561)).
- White model: render as white card in low-contrast greys ([Allplan white model](https://help.allplan.com/PLANBAR/2016-1/1033/New/85078.htm)). Use colour only on the key elements, as in the Bauhaus office axo ([search summary, Disegno](https://disegno.unioneitalianadisegno.it/index.php/disegno/article/download/462/734/4302)). **[practice]** Fake ambient occlusion with a 10–15% darker band along inside corners, such as sill to floor and paver to wall.

## 4. Composition

- Common crops: a floating cut block or disc showing the terrain section, a partial axo of one outdoor area, or a cutaway with the wall removed ([Architizer](https://architizer.com/blog/practice/tools/video-tutorials-to-level-up-axonometrics/)). **[practice]** For a hero, float the block on the page with clear margins, and let only the garden or ground plane fade out at the far end.
- Keep entourage restrained and abstract, at about eight heads per figure. Draw people and trees as line or silhouette so they don't compete with the architecture. Sources: [Illustrarch](https://illustrarch.com/articles/77908-draw-architectural-section.html), [Studio Matrx](https://www.studiomatrx.org/students/architectural-graphics-2/rendering-tone-light-and-context). Rudolph's loose figures exist "to illustrate scale" ([Drawing Matter](https://drawingmatter.org/?p=56378)).
- Annotation: call-outs on leaders, with detail bubbles giving name, number and scale ([Studio Matrx](https://www.studiomatrx.org/students/interior-graphics-2/sections-and-details)). **[practice]** Use numbered keys (1, 2, 3…) with a legend, as in DETAIL magazine's 1:20 details ([Leeds Beckett on DETAIL](https://libguides.leedsbeckett.ac.uk/az/detail-magazine)). The numbered-key convention itself is not verified from a fetched source.

## 5. Palettes

- **Monochrome plus one hue:** for example a red-hued section built from a SketchUp cut ([Architizer](https://architizer.com/blog/practice/tools/video-tutorials-to-level-up-axonometrics/)).
- **Black and white plus solid black shadows:** high-contrast linework (same source). Grimshaw's ink-on-tracing exploded wall axo is a line-only precedent ([V&A](https://collections.vam.ac.uk/item/O233383/exploded-axonometric-drawing-showing-wall-design-grimshaw-architects)).
- **Colour-coded blocks:** used for programme or labelling ([Architizer section tutorials](https://architizer.com/blog/?p=146756), [Illustrarch massing](https://illustrarch.com/articles/architectural-diagrams/75737-architectural-massing-diagrams.html)).
- **[practice] Muted material palette for this hero:**

| Element | Colour |
|---|---|
| Paper | #F4F1EA |
| Lines | #1E1E1E |
| Concrete cut | #BDB8AE |
| Granite | #8E8C88 |
| Soil | #6B5A47, ragged edge |
| Gravel/aggregate | #A39A8A |
| Glass | #CFE0E3 at 40% |
| Accent (rain-garden water path or planting) | #4F7A5A |

## 6. Renderer rules

1. Use an elevation oblique: cut polygon at true scale, depth vector `(cos30°, -sin30°) × 0.5 × depth`.
2. Set extrusion depth to 0.6–1.0 times the cut height. Clip the soil to the same depth.
3. Draw order is back to front: far face, top/side faces, then the cut face last.
4. Use these stroke weights (px at hero size): cut outline 2.0, ground line 2.5, seen extruded edges 1.0, edges on the back face 0.5 at 50% opacity, hatch 0.5.
5. Fill cut faces with the material tint and a hatch pattern clipped to the polygon. Leave extruded side faces flat tint only, never hatched.
6. Lighten extruded faces by 15% (top) and 30% (side) relative to the cut tint. This gives one consistent light from the upper left.
7. Cast a 45° shadow under the canopy and sill as an offset polygon (offset equals projection) at 12–18% black, multiply.
8. Add an AO band: a 4–6 px gradient stroke along every concave interior edge where materials meet.
9. Below the soil line, fade the hatch to 0 over the bottom 25%, or use a jagged break edge. No hard box bottom.
10. Use one accent colour only, for the water path or planting. Everything else stays neutral.
11. Make entourage one line-only figure and one tree silhouette at 0.75 px. Place them on the garden side and never overlapping the cut face.
12. Callouts are numbered dots on hairline leaders, each ending at a cut-face layer, with the legend outside the block. Cap them at 8–10 in the hero.

Gaps: no fetched source documented the house styles of DETAIL, detail-library.co.uk (its 3D is SketchUp-only, [site](https://www.detail-library.co.uk/)), Sergison Bates, Lacaton & Vassal, Zumthor or BIG. Look at their monographs before claiming any of these as precedent.
