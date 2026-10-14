# 18 — Line weight: findings, diagnosis, revised standard

This file supersedes **§0–§1 of 17** (the line basis and the line-weight table). It also replaces the stroke values in 16 §6 rule 4, the hatch stroke weight in 17 §2, and the isotherm and outline weights in 17 §6. Everything else in 16 and 17 still stands.

Markers:
- **[I]** is an inference or a measurement I made. No source states it.
- **[M]** is a pixel measurement taken from a screenshot or reference image in this repo. Coordinates are in screenshot pixels: 1440×900, captured at DPR 1.
- **[S]** marks a claim that rests on a search-engine summary of a page I could not read in full.

---

## (a) Findings

### a1. Pen hierarchies on paper

| Source | What it says | Numbers |
|---|---|---|
| ISO 128-20, via the cadsetterout summary of the ISO groups ([cadsetterout](https://cadsetterout.com/drawing-standards/line-weights/)); IS 10714-20 is identical to ISO 128-20:1996 ([law.resource.org](https://law.resource.org/pub/in/bis/S01/is.10714.20.2001.pdf)) | Narrow, wide and extra-wide in **4:2:1**. Each step in the series is **1:√2**. A "graphical symbols" weight sits between narrow and wide. If you use only two weights, take the narrow and wide of one group. | Groups (narrow / symbol / wide / extra-wide, mm): 0.13/0.18/0.25/0.5, 0.18/0.25/0.35/0.7, **0.25/0.35/0.5/1.0**, 0.35/0.5/0.7/1.4 |
| US NCS v2, as one office's pen set ([AUGI forum](https://forums.augi.com/archive/index.php/t-57882.html)) | Fine, Thin, Medium, Wide, Extra Wide. "Screened [half-tone] lines are either 0.35 or 0.70 because thinner screened lines tend to disappear." | 0.18 / 0.25 / 0.35 / 0.50 / 0.70 (1.0 / 1.4 / 2.0) |
| Ching, quoted in Univ. of Memphis drawing standards ([memphis.edu](https://memphis.edu/architecture/docs/drawing.standards.pdf)) | **Heavy** weights "delineate the profiles of plan and section cuts as well as spatial edges" (Ching 2009, p. 18). Spatial edges "depict where solid matter meets spatial void." **Medium** weights mark "the edges and intersections of planes." **Light** weights mark shallow depth changes. **Very light** weights "suggest a change in material, color, or texture." "A decreasing line weight delineates the edges of progressively more distant objects from the plane of the cut" (Ching 1998, p. 158). | Heavy 0.5 (0.8 for section cuts and ground lines), medium 0.35, light 0.25, very light 0.13 |
| Ching's **axon** example, same document | "The heaviest line weight indicates **spatial edges**. Medium line weight indicates **planar corners**. Light … surface lines." | Silhouette > crease > surface line |
| Ching on scale, same document | "The visible range and contrast of line weights should be in proportion to the size and scale of a drawing" (2009, p. 18). | |
| learnarchitecture ([article](https://learnarchitecture.net/articles/39292-architectural-line-weights.html)) | Primary cut 0.70, secondary cut / heavier seen 0.50, seen 0.35, dims and leaders 0.25, hatch 0.13–0.18, ground and section marks 1.0–1.4. At smaller scales, shift the whole set down one step, and below about 0.13 mm delete texture rather than thin it. Use 3 tiers minimum and 5 as the practical maximum. **"0.18 mm and 0.25 mm look identical on a monitor."** | |
| SketchUp forum, line weights in LayOut ([forum](https://forums.sketchup.com/t/section-line-weight-in-layout/1785)) | Base edges are 1 px. The profile is "a minimum of double the width of the base linewidth" and the section line "a minimum of double the profile width". "All standard lineweight ratios can be achieved by setting … 1:2:4." | edges 1, profiles 2, section cut 4 |
| SketchUp edge styles ([help](https://help.sketchup.com/en/sketchup/edge-styles)) | Profiles thickness, Depth Cue (foreground thickness), Extension and Endpoints are all set in pixels. I found no documented default values. | |
| Practice, generic ([learnarchitecture](https://learnarchitecture.net/articles/39292-architectural-line-weights.html), [Illustrarch](https://illustrarch.com/articles/77908-draw-architectural-section.html)) | Cut heaviest, seen medium, hatch lightest. The ground line is the heaviest of all. | |

**Not verified:** detail-library.co.uk, DETAIL, Herzog & de Meuron and Caruso St John publish no pen tables. Their sheets are known here only through the user's reference images (a3).

**Takeaway.** Every source agrees on the order: ground ≥ cut > spatial edge (silhouette) > planar corner (crease) > beyond > surface texture and hatch. The steps between **adjacent roles** are ×2 (ISO 4:2:1 inside a group; SketchUp's 2× minimum), not the √2 series step. The √2 step only chooses the group for the scale.

### a2. Line weight in axonometric and illustration practice

- **Technical illustration.** Judy Martin's three conventions, as summarised by A. Gooch ([Gooch 1998 thesis §3.1.1](https://users.cs.northwestern.edu/~ago820/thesis/node10.html)):
  - one weight throughout;
  - **two weights, "the heavier describing the outer edges and parts with open space behind them"**;
  - perspective taper, "heavy lines in the foreground, tapering towards the farthest part."

  The most common practice is bold outer lines with thinner interior lines. "In almost all illustrations, lines are drawn in black" ([§3.1.2](https://users.cs.northwestern.edu/~ago820/thesis/node11.html)).
- **Shading.** Gooch shading keeps surface tone in the mid-tones so that black edge lines and white highlights stay dominant [S] ([Gooch 98](https://users.cs.northwestern.edu/~bgooch/PDFs/gooch98.pdf)).
- **Axo as a section.** The cut face follows section rules (heaviest outline, tonal poché inside). Seen solids follow Ching's axon rule (spatial edge > planar corner > surface) ([memphis.edu](https://memphis.edu/architecture/docs/drawing.standards.pdf)). Exploded views keep assembly dashes lighter than component outlines [S] ([SketchUp forum](https://forums.sketchup.com/t/section-line-weight-in-layout/1785), [CUNY assignment](https://openlab.citytech.cuny.edu/arch1101/files/2011/06/ARCH-1110-_-Assignment-04b_Cube_Isometric_drawing.pdf)).

### a3. The user's references, measured [M]

Widths are runs below a luminance threshold. L is the minimum sRGB luma (0–255). Paper is about 240–255.

| Reference (`visual reference/`) | Kind | Heavy line | Thin line | Notes |
|---|---|---|---|---|
| `88ecaeda…` (1200 px wide) | ink sectional axo | **2 px, L 7–43** | 1 px, L 89–132 | Weight **and** value both step, about 2× and about 3× darkness. No hatch. Silhouettes heavier than inner edges. |
| `c628b7a4…` (708 px) | ink section axo + numbered key | cut 2–3 px, L 50–80, poché inside | beyond 1 px, L 140–200 (grey) | The cut is black and heavy. Everything beyond is light **grey**, not thin black. |
| `6a7f0542…` (736 px) | ink section axo | 1–2 px, L 73–105 | 1 px, L 130–170 | A quiet, mostly single weight. Hierarchy comes from the cut poché. |
| `62c91a17…` (1080 px) | **rendered sectional axo** | cut-face lines 1–1.5 px, L 49–106, **warm** (RGB 56,50,28 on paper 240,228,202) | hatch faint | **Rendered surfaces carry no ink lines at all.** The cut card is paler than the render. |
| `86433fc9…`, `eaa5d547…`, `ede6f947…` | rendered axo | lines only on cut ends | none on surfaces | Same family as 62c91a. |
| `be7c1d73…` | rendered exploded axo | about 1 px dark outlines everywhere | fine stipple hatch | Light render, so the lines read. |
| `2e2aa79f…`, `adad3c61…`, `279db3b0…` | line + flat-shadow axo | none heavy | 1 px, L 140–200 | Hierarchy carried by fills and shadows. Lines stay quiet. |

**Two families** [I]:
- **Ink sheets.** The cut is **2–3× wider and much darker** than seen lines, and seen and beyond lines are **grey** rather than thin black.
- **Rendered sectional axos.** The render is pale, with no or very faint edge lines. All the ink sits on a **pale** cut card, so the cut reads by contrast, not by width.

### a4. Line drawings from 3D (NPR)

- **Isophote distance** ([Goodwin, Vollick, Hertzmann, NPAR 2007](https://www.dgp.toronto.edu/~todd/isophote/npar2007.pdf)):
  - Constant thickness "yields a somewhat mechanical appearance."
  - Gooch et al. 1999 make thickness "inversely proportional to object depth", which "conveys overall depth relationships."
  - Their own thickness depends on depth and radial curvature, and is clamped to "[Tmin, Tmax], … user-defined limits."
  - "Contours are not tapered … the hand-drawn contours do not taper when they become occluded."
  - "Artists draw strokes with a limited range of thicknesses."
- **Bénard & Hertzmann, *Line Drawings from 3D Models* (2019)** ([ar5iv](https://ar5iv.labs.arxiv.org/html/1810.01175)), §8.2:
  - Thickness is a per-vertex half-width w_i.
  - It allows "thicker strokes for nearer objects or less-curved objects."
  - Visibility may be "haloed" (Elber).
  - §8.1: smoothing strokes independently can make a "T-junction … break."
  - The tutorial gives no per-line-type width table.
- **Haloed lines.** A farther line gets a gap where a nearer one passes in front of it ([Appel, Rohlf, Stein, SIGGRAPH 1979](https://history.siggraph.org/?p=104577)).
- **Where people draw lines.** Artists' lines overlap mostly along **occluding contours**: 75% lie within 1 mm of another artist's line. Most of the rest follow large image-intensity gradients ([Cole et al. 2008](https://pixl.cs.princeton.edu/pubs/Cole_2008_WDP/index.php)) [S]. Silhouettes are the line class with the strongest agreement, so they deserve the strongest seen weight [I].
- **Tools.**
  - Blender Freestyle: base thickness defaults to 1.0 (absolute px). The "Distance from Camera" modifier maps distance through Range Min/Max to Value Min/Max ([Blender wiki](https://wiki.blender.org/index.php/User:Flokkievids/Freestyle/LineStyle), [API](https://docs.blender.org/api/4.4/bpy.types.LineStyleThicknessModifier_DistanceFromCamera.html)).
  - SketchUp's Depth Cue thickens foreground lines in px ([help](https://help.sketchup.com/en/sketchup/edge-styles)).
  - Enscape exposes outlines only as a 0–100% slider, with no px value ([Enscape](https://learn.enscape3d.com/blog/knowledgebase/rendering_styles)) [S].
  - I found no published Pencil+ defaults.

### a5. Screen practice

- **CSS px vs device px.** devicePixelRatio is "the ratio of the resolution in physical pixels to the resolution in CSS pixels." Canvases must be scaled by it to stay sharp ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)).
- **three.js r160 `LineMaterial`** ([source](https://unpkg.com/three@0.160.0/examples/jsm/lines/LineMaterial.js)):
  - Screen-space width is `offset *= linewidth; offset /= resolution.y`, so **`linewidth` is in units of `resolution`**.
  - Line bodies are hard-edged (`discard`). Only round caps get smooth alpha, and only under `alphaToCoverage`. Edge quality depends entirely on MSAA.
  - `LineSegments2` r160 has **no** `onBeforeRender` that sets the resolution ([source](https://unpkg.com/three@0.160.0/examples/jsm/lines/LineSegments2.js)).
- **Sub-pixel lines.** Skia draws widths below 1 px as "a line of width 1, and uses the width to modulate the alpha", to avoid "blotchiness/unevenness caused by undersampling or missed coverage" ([WHATWG list, 2013](https://lists.whatwg.org/pipermail/whatwg-whatwg.org/2013-August/082728.html)).
- **Gamma.** Coverage blending of black on white in sRGB makes thin lines look lighter or thinner. Thin lines need slight thickening, not only darkening ([cairo bug 28549](https://lists.freedesktop.org/archives/cairo/2010-June/020111.html), [jet.ro](https://jet.ro/2011/06/04/better-looking-anti-aliased-lines-with-simple-trick/)).
- **Width discrimination.** The JND for line width is about **0.7 px** constant below about 7 px. Above that it follows a Weber fraction of **0.11**. The test used a 28″ 4K display at DPR 1.5, 70 cm away, 200 ms exposures ([Sterzik et al. 2023, IEEE TVCG](https://arxiv.org/html/2308.04150v2)).
  - At DPR 1.5, 0.7 device px is about **0.47 CSS px**.
  - A JND is the side-by-side threshold. A hierarchy read **at a glance** across a drawing needs several JNDs, which is why drafting standards step ×2 [I].
- **Contrast floor.** Graphical objects needed to understand content must reach **3:1** against adjacent colours (WCAG 2.1 SC 1.4.11, [Deque](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)).

**Why lines "feel weak" on screen [I], from a5 and the measurements below:**
1. Sub-pixel widths collapse into "1 px of partial grey". 0.5, 0.6 and 0.75 all look like the same faint line, and learnarchitecture says the same of 0.18 vs 0.25 mm.
2. √2 steps (1.25 vs 1.0 vs 0.75) sit below the at-a-glance threshold.
3. Hatch gets anti-aliased into wide grey strokes whose ink mass rivals the outline.
4. Depth-fade and opacity push seen lines toward the surface tone.
5. A dark textured render steals the contrast the ink needs.
6. Fractional widths under 4×MSAA alternate between one dark pixel and two half-grey pixels, which reads as a "beaded" or dotted line.

---

## (b) Diagnosis of the current drawings

### b0. Code-level causes

| # | Finding | Evidence |
|---|---|---|
| C1 | **All three.js line widths are in device px, not CSS px.** `render()` sets `m.resolution.set(W * dpr, H * dpr)` and `linewidth = band[role]` (`.sketch/viewer/edge3d.js` ~l. 663–667; the same pattern is in `hero.js` l. 458/492 and `axo.js` l. 317/332). So "outer 1.25" is 1.25 device px. At **DPR 1.5 it is 0.83 CSS px; at DPR 2 it is 0.63 CSS px**, with crease 0.25 and silhouette 0.38. The screenshots (DPR 1) show the **best case**. The user's screen, if HiDPI, shows every ink line at ½–⅔ of the intended weight. | a5 LineMaterial source |
| C2 | **The hatch shader is in CSS px while lines are in device px.** `pxUniform = (cam.right − cam.left) / W` (CSS) drives `hair()` and the stroke spacing. At DPR 2 the hatch keeps its weight while every line halves, so **hatch overtakes outlines** on HiDPI. | edge3d.js l. 666, CUT_FRAG |
| C3 | **Hatch is heavy by construction.** `hair(d, w) = 1 − smoothstep(w/2, w/2 + 0.9, |d|)` with w = 0.35–0.45 makes a soft stroke about 1.3 px wide, then × 0.65–0.75 ink. Ink mass is about 0.9 px-equivalent against the outer outline at 1.25: a ratio of about **1.4:1**, where 17 §1 promised 4:1. | CUT_FRAG patterns 3–15 |
| C4 | **Joint = crease = 0.5**, and silhouette is 0.75. The roles meant to differ are identical or a √1.5 step apart. Below 1 device px they collapse (a5). | `WEIGHTS.fragment` |
| C5 | **No ground role.** 17 §1 lists ground 1.75/2.5, but `WEIGHTS` has none. The soil break is a 1.3 px shader edge, *lighter* than the cut outline. | edge3d.js l. 273, 319 |
| C6 | **Depth fade reaches 64% toward `#A8A397` on silhouettes** across the 1.2 m box (`/1.6 × 0.85`). Creases also take opacity 0.7. A back silhouette ends up at about L 120: grey on grey render. | `fadedLines` |
| C7 | **Draft sheet hatch scales with zoom.** Patterns are `userSpaceOnUse` inside the mm `viewBox`, so `stroke-width=".35"` means 0.35 **model mm**. At the default s ≈ 1.1 px/mm it is 0.4 px. At s ≈ 5 px/mm it is 1.75 px, **heavier than the 0.75 px cut joints** [I, from code]. | draft.js l. 27–34 |
| C8 | **Draft outer cut = 4 px under-stroke.** That is about 2 px visible outside plus a 0.375 px half-stroke, so about 2.4 px. Every other boundary is 0.75, and there is no middle tier. Thin parts (< 3 mm) are solid ink at true thickness, which at s ≈ 1.1 gives 3–5 px black bars, **heavier than the outline**. | draft.js l. 70–74 |
| C9 | **Thermal outlines** are 0.6 px black @35%, and isotherms darken the flood multiplicatively. Both are invisible on the dark half of inferno. | thermal.js l. 105–106, 134–136; CUT_FRAG field() |

### b1. `review/visual/v5/01-hero.png` [M]

- **Beaded cut edge.** The front cut edge of the floor slab (x 1330–1365, y ≈ 544–569) is 1 px wide, and its darkest luma alternates **55 → 16 → 65** along a 35 px run. That is fractional width under 4×MSAA (C1/C4). The head cut edges (x 1040–1150, y 165–200) read as dotted in a 4× zoom.
- **Cut card is mid-grey, not pale.** Mean luma: glulam head cut (x 1132–1150, y 185–300) 148; slab and gravel cut (x 1170–1260, y 600–640) 161; soil cut (x 700–800, y 760–800) 155. The 5th percentile is about 98, so hatch pixels reach L ≈ 75–100 against outline pixels at 16–65. **Hatch has nearly the outline's darkness at 5–6 px pitch** (C3), so the cut outline cannot dominate. Reference 62c91a keeps its card at about L 220.
- **Render competes.** The rendered canopy and granite (around x 980–1130, y 255–320) sit at L ≈ 77, **darker than the cut card**. The eye goes to the dark render, not the cut. The references keep renders pale (62c91a, be7c1d).
- **Creases fight texture.** On the cedar face (x 1045–1125, y 175–300) and the landing planks (x 700–1100, y 540–700), crease lines at 0.5 × 0.7 and the drawn texture joints have the same weight and value. They read as noise rather than as edges.
- **Far silhouettes vanish.** Back-of-box silhouettes (right end, x 1290–1375, y 480–600) are faded to about L 120 over surfaces at L 110–150, a contrast under 1.5:1 (C6).
- **No grade line** (C5). Datum dash-dot lines (+2.785 HEAD across x 640–1050, y 335–405) and the lens leader are 1 px dark and the same weight as model lines, so they cross the render at model weight.
- **Net effect:** one 1.25 px outline among many 1 px partial-grey lines, plus heavy grey hatch and dark render. That gives a flat, uniform, slightly fuzzy hierarchy. A width ratio of about 1.25:1 is below the at-a-glance threshold.

### b2. `02-explode.png` [M]

- The parts are small (about 120–180 px across), and the fragment weights still apply. The cut outlines (for example the sill block, x 830–885, y 490–540) are barely heavier than the creases.
- Leader lines (x 880–1110, y 188/367/515/604/657/771) and the vertical assembly connector (x ≈ 878, y 190–770) are about 1 px dark grey, **the same as part outlines**, and the connector runs through the parts.
- At this size creases and joints should be deleted, not thinned (learnarchitecture; Ching on scale).

### b3. `04-age30.png` [M]

The same faults as b1. The lens circles' 1 px outlines and leaders (x 555–785, y 285–590) are appropriate as thin lines, but they match the weight of the model's cut outline.

### b4. `08-tool-draft.png` and `09-tool-layers.png` [M]

- **Black strips outweigh the cut outline.** The membrane and flashing at x ≈ 745–752, y ≈ 400–470, the pan at x ≈ 745–806, y ≈ 400–410, and the edge bands at x ≈ 750–806, y ≈ 730–735 and x ≈ 264–296, y ≈ 692–697 are 3–6 px solid black. **Heavier than the 2.4 px cut outline** (C8).
- **Voids are rimmed like the assembly.** The air cavity at x ≈ 300–460, y ≈ 440–540 gets the same 2.4 px rim as the whole assembly, so interior voids shout.
- **No middle tier.** Material-to-material boundaries (for example concrete beam to EPS, x ≈ 750, y 470–830) are 0.75, the same as every minor seam.
- **Leaders weigh the same as cut boundaries.** Leaders at 0.75 @80% (for example F2/T2, x 600–825, y 540–570) carry about the ink mass of the cut boundaries they cross.
- **Hatch is fine at this zoom** (0.4 px) but grows with zoom (C7).
- **Layers mode.** Control-layer bands (thermal yellow, water blue) are 2 px, equal to the outer cut. The yellow on the pale tint is below 3:1.

### b5. `11-tool-thermal.png` [M]

- Part outlines are invisible over the dark field (x 45–400, y 380–690).
- The 2 °C isotherms cannot be found in the purple half.
- Only the light special isotherm (x ≈ 380–480, y 380–670) reads.

---

## (c) Revised line-weight standard

### c1. Units and rendering rules (apply first)

1. **Specify every width in CSS px.** Convert once, at the material:
   ```js
   // three.js (resolution stays in drawing-buffer px = W*dpr, H*dpr)
   function setWidth(m, css, alpha, dpr) {
     const dev = css * dpr;
     m.linewidth = Math.max(dev, 1);                 // never below 1 device px
     m.opacity = alpha * Math.min(dev, 1);           // Skia hairline rule: thinner -> fainter, not narrower
     m.transparent = m.opacity < 1;
   }
   ```
   This fixes C1. In SVG, use `stroke-width` in CSS px with `vector-effect: non-scaling-stroke`, and apply the same floor: `w < 1/dpr` becomes `1/dpr` with `stroke-opacity × w·dpr`.
2. **Hatch in the shader** uses the same CSS px as the lines. With C1 fixed, `uPx` stays CSS. This fixes C2.
3. **At DPR 1, prefer widths of 1, 1.5, 2, 2.5 or 3** for the roles that must look solid (ground, cut-outer, silhouette, cut-inner). Fractional values below 1.5 bead under 4×MSAA [I, from b1]. Request `samples: Math.min(8, gl.getParameter(gl.MAX_SAMPLES))` on the composer target [I].
4. **Zoom bands interpolate** rather than step: `w = lerp(w_band_lo, w_band_hi, smoothstep(p_lo, p_hi, log p))` across ±15% of each threshold, so widths don't pop while zooming. This keeps Revit's per-scale pens ([learnarchitecture](https://learnarchitecture.net/articles/39292-architectural-line-weights.html)) without jumps [I].
5. **Ink colour** is `#1B1B1A` for cut, ground, membrane and silhouette. Seen-line greys are made by **opacity on that ink**, never by a separate light grey, so they pick up the surface hue the way 62c91a's warm lines do.

### c2. Roles

| Code role | Meaning | Source of the rule |
|---|---|---|
| `ground` | grade line where the cut meets soil, and the soil break | ground heaviest (Ching elevation; learnarchitecture 1.0–1.4) |
| `outer` | cut boundary against air or void | heavy, cut profile (Ching; ISO wide or extra-wide) |
| `inner` | cut boundary between **different** materials | ISO "symbol"/medium; learnarchitecture secondary cut 0.5 |
| `joint` | seam inside **one** material (lamella, ply, lap, bead) | narrow |
| `sil` | silhouette or spatial edge (front/back-facing change, open boundary) | Ching axon "heaviest = spatial edges" (but below the cut in a section-axo) |
| `crease` | planar corner seen, dihedral > 30° | Ching axon medium/light |
| `beyond` | back face, far edges, ghosted context | "decreasing line weight … progressively more distant" |
| `hatch` | material pattern on the cut | very light |
| `membrane` | part under 1.5 px rendered thickness, drawn as one line | ISO graphical-symbol tier [I] |
| `leader`, `dim`, `datum`, `connector` | annotation | narrow (0.25 mm class) |
| `focus` | selected or threshold highlight | colour carries it, width = `outer` |

**Split the current `inner` into `inner` and `joint`.** Test whether the two cut polygons on either side of a segment share a `mat` key.

### c3. Width table, CSS px at DPR 1 (alpha in brackets when below 100%)

Band thresholds use p = CSS px per model mm, which is `W / ((cam.right − cam.left)·1000)` in edge3d.js and `s` in draft.js.

| Role | **Explode / thumb** p < 0.09 | **Rendered axo hero** 0.09 ≤ p < 0.30 | **Rendered axo close** p ≥ 0.30 | **Ink sheet** (SVG) s < 0.8 · **0.8–3** · > 3 | **Thermal plot** |
|---|---|---|---|---|---|
| ground | 2.25 | **3.0** | 3.5 | 2.0 · **3.0** · 3.5 | — |
| outer | 1.5 | **2.0** | 2.5 | 1.5 · **2.0** · 2.5 | — |
| inner | 0.75 | **1.0** | 1.25 | 0.75 · **1.0** · 1.25 | 0.75, paper-coloured (40%) on flood; ink (60%) in lines mode |
| joint | off | **0.5 (70%)** | 0.6 (70%) | off · **0.5 (70%)** · 0.6 (70%) | off |
| sil | 1.0 | **1.25** | 1.5 | — | — |
| crease | off | **0.75 (45%)** | 0.75 (55%) | — | — |
| beyond / ghost | 0.75 (25%) | **0.5 (35%)** | 0.5 (40%) | 0.5 (45%) | — |
| hatch | tint only | **0.5 core (40%)** | 0.5 core (45%) | tint · **0.4 (60%)** · 0.5 (55%) | dropped to 15% under flood |
| membrane | tint | **1.25** | 1.5 | 1.0 · **1.5** · see c6 | 1.0 |
| leader / dim | 0.75 (70%) | **0.75 (70%)** | 0.75 (70%) | **0.5 (100%)** | 0.5 (100%) |
| datum (16-3-2-3) | 0.75 (55%) | **0.75 (55%)** | 0.75 (55%) | 0.75 (55%) | — |
| connector (explode) | 0.75 (35%), `#8C8579`, depth-tested | — | — | — | — |
| focus | 1.5 signal | **2.0 signal** | 2.5 signal | 2.0 signal | 1.5 ink ring over a 4 px paper ring (as now) |
| isotherm 2 °C | — | — | — | — | **0.75** (c8 colour) |
| isotherm 10 °C | — | — | — | — | **1.25** |
| special isotherm (0 °C, fRsi) | — | — | — | — | **1.75**, solid, contrast colour |
| crop frame / adiabatic edge | — | — | — | 0.75 | 1.0, `#8B939C` |

Effective result at DPR 1 after the c1 floor, hero band:
- ground 3, outer 2, sil 1.25 and inner 1 are solid ink;
- crease is 1 px at 34% (0.75 × 45%), joint 1 px at 35%, beyond 1 px at 18%;
- hatch is about 1 px soft at 20%.

That reproduces the reference ink families: a heavy black cut with grey thin lines (88ecae, c628b7).

### c4. Ratio rules (check these in code and in review)

- **R1. Adjacent roles that meet must differ by at least ×2 in ink mass** (width × alpha), or at least ×1.6 in width at equal alpha. Pairs: ground/outer, outer/inner, inner/joint, outer/sil, sil/crease.
  - Hero: ground/outer 1.5× (also the heaviest in absolute terms), outer/inner 2×, inner/joint 2.9×, outer/sil 1.6×, sil/crease 3.7×.
  - Sources: ISO 4:2:1 ([cadsetterout](https://cadsetterout.com/drawing-standards/line-weights/)); SketchUp 2× minimum ([forum](https://forums.sketchup.com/t/section-line-weight-in-layout/1785)).
- **R2. Absolute step between any two named weights is at least 0.5 CSS px**, about one JND at the thin end ([Sterzik 2023](https://arxiv.org/html/2308.04150v2)). Roles thinner than 1 device px are separated by **alpha**, not width.
- **R3. Hatch ink mass is at most ¼ of `outer` and at most ½ of `inner`.** Measure it as the mean darkening of the cut card: (paper L − card mean L) ≤ 0.25 × (paper L − ink L).
  - The cut card's **mean luma must be ≥ 205** on a 241 paper.
  - Current: 148–161 (b1).
- **R4. Nothing outweighs `outer` except `ground`.** That covers membranes, solid poché strips, layer bands, leaders and datum lines.
- **R5. Seen lines keep at least 3:1 contrast against paper** (WCAG 1.4.11 floor). Silhouettes keep at least 4.5:1 [I].

### c5. Silhouette vs crease, and depth fade (three.js)

- **Classification** (keep `classify()`):
  - silhouette = the adjacent face normals straddle the view direction, or an open edge;
  - crease = both front-facing and the angle between normals > **30°** (raised from 20°, so plank and texture bevels don't ink).
  - Drop creases shorter than **6 CSS px** on screen [I].
- **Creases on textured renders.** Where a material texture already draws its joints (cedar courses, granite planks), set crease alpha to 30% of the table value on faces of that material [I, b1].
- **Depth fade** applies to `sil`, `crease` and `beyond` only. Never to `outer`, `inner`, `joint`, `ground`, `membrane` or `focus`.
  - t = clamp((z_cut − z) / D, 0, 1), where D = box depth (1.2 m now, `(WC − W0)·S`).
  - **sil:** width × (1 − 0.25 t); colour = INK.lerp(FADE `#A8A397`, 0.35 t). That gives at worst L ≈ 75, 7:1 on paper.
  - **crease:** alpha × (1 − 0.5 t).
  - **beyond:** fixed (35%).
  - Width tapering by depth follows Gooch et al. 1999's inverse-depth thickness ([Goodwin et al. 2007](https://www.dgp.toronto.edu/~todd/isophote/npar2007.pdf)). Taper is limited to 25% because "artists draw strokes with a limited range" (same source).
- **No end tapering** on contours: "contours are not tapered" when they become occluded (same source). Use round caps (the LineMaterial default) for joins.
- **Halos.** Explode connectors and leaders that pass behind or across parts get a 2 px gap each side (paper-coloured under-stroke 1.5 + 2×2 px, depth-tested) ([Appel et al. 1979](https://history.siggraph.org/?p=104577)). Datum lines stop 6 px short of the model silhouette instead of crossing the render [I].

### c6. Ink sheet (draft.js) specifics

- **outer:** the under-stroke width is `2·(outer − inner/2)`, which is 3.0 px at the detail band, replacing 4. Draw it only around the **assembly outline and voids ≥ 20 mm**. Voids under 20 mm get `inner` [I, b4].
- **inner / joint:** polygon stroke 1.0. Where the neighbour shares the same material (lamination or ply), stroke 0.5 at 70%.
- **membrane and thin parts.** Let t·s be the rendered thickness in px:
  - t·s ≤ 1.5 → a **1.5 px ink line** (minimum visible);
  - 1.5 < t·s < 4 → fill `#4A4946` (75% ink) with a 0.5 px ink edge;
  - t·s ≥ 4 → material hatch (17 §2 metal rule).

  This enforces R4. It replaces "solid ink at true thickness whenever < 3 mm".
- **Hatch stays screen-constant.** Rebuild `DEFS` in `drawDraft()` with `k = 1/s`: pattern `width/height = pitch_px·k` and `stroke-width = 0.4·k`. Dot radii likewise. Pitches (px) come from 17 §2. This fixes C7. Below s = 0.8, hatch becomes tint only (learnarchitecture: delete, don't thin).
- **Leaders** are 0.5 px at 100% ink, with a 2 px paper halo where they cross a cut face and a 2 px dot at the anchor.
- **Layers mode bands** are 2.5 px colour at 85%, under a 0.75 px ink core. Yellow (thermal) must reach 3:1 on the tint, so use an ochre ≤ L 150 [I].

### c7. Hatch shader (edge3d.js `CUT_FRAG`)

- `hair(d, w) = 1 − smoothstep(w·0.5, w·0.5 + 0.75, |d|)` with **w = 0.5** (the AA ramp shrinks from 0.9 to 0.75 px).
- **Ink multiplier 0.40** in the hero band and 0.45 close, replacing 0.65–0.75. Concrete triangles and pebble rings keep the same multiplier.
- **Pitches:** line hatches ≥ 6 px (metal ≥ 3.5 px); stipple cell ≥ 3.5 px, density ≤ 0.3, dot radius ≤ 0.45 px.
- Solid-ink thin parts (`uPat 7`) obey R4. If rendered thickness exceeds 2 px, use `uInk × 0.75`.
- **Explode band:** `uPat = 0` (tint only).
- **Acceptance:** cut-card mean luma ≥ 205 (R3).

### c8. Rendered surfaces (so lines can win)

- No rendered surface below **L 110** outside shadow cores. Ideally surfaces stay in L 150–235 (the 62c91a and be7c1d family).
- The cut card is the lightest large area in the image after the paper.
- This keeps shading in the mid-tones so that ink lines dominate (Gooch shading [S]).
- For the canopy membrane and dark granite, lift the albedo or the exposure locally [I].

### c9. Thermal plot (thermal.js and the field shader)

- **Isotherm colour adapts to the flood:** dark ink at 45% where the band luminance > 0.35, paper `#F4F2EC` at 50% where it is darker.
  - In the shader: `c = mix(c, lum(c) > 0.35 ? c*0.45 : mix(c, vec3(0.96), 0.5), line)`.
  - Widths per c3 (0.75 / 1.25 / 1.75). Steps are 1.67× and 1.4× in width, plus colour for the special isotherms.
- **Part outlines on the flood:** 0.75 px paper at 40%. In lines mode: 0.75 px ink at 60%.
- **The point marker** keeps its 4 px paper ring + 1.5 px ink ring. That is a halo, and it already works.

### c10. Implementation sketch (edge3d.js)

```js
const BANDS = [   // p = CSS px per model mm; widths CSS px; a = alpha
  { p: 0.06, ground: 2.25, outer: 1.5, inner: 0.75, joint: 0,   sil: 1.0,  crease: 0,    beyond: 0.75, hatch: 0 },
  { p: 0.15, ground: 3.0,  outer: 2.0, inner: 1.0,  joint: 0.5, sil: 1.25, crease: 0.75, beyond: 0.5,  hatch: 0.40 },
  { p: 0.45, ground: 3.5,  outer: 2.5, inner: 1.25, joint: 0.6, sil: 1.5,  crease: 0.75, beyond: 0.5,  hatch: 0.45 },
];
const ALPHA = { joint: 0.7, crease: 0.45, beyond: 0.35 };   // crease 0.55 in the close band
// per frame: interpolate BANDS in log p; for each line material:
//   setWidth(m, w[role], ALPHA[role] ?? 1, dpr); m.visible = w[role] > 0; m.resolution.set(W*dpr, H*dpr)
```

Fragment geometry needs a new `ground` LineSegments2: the grade polyline at the cut plus the ragged soil break. Drop the 1.3 px shader edge, or keep it only as a fill under the ground line.

### c11. Review checks (replaces rubric criterion 1 in 17 §7)

1. Screenshot at **DPR 1 and DPR 2**. Rendered widths (luma < 100 run length) match c3 × DPR within ±0.5 device px.
2. R1–R5 hold on the hero, the explode, the sheet at s = 1.1 and s = 5, and the thermal plot.
3. The darkest-pixel sequence along a cut edge varies by ≤ 30 luma (no beading).
4. The cut-card mean luma is ≥ 205.
5. A squint test at 25% scale shows ground > cut outline > silhouettes > everything else [I].

---

## Sources (consolidated)

- ISO 128-20 / IS 10714-20: https://law.resource.org/pub/in/bis/S01/is.10714.20.2001.pdf. Groups and ratios via https://cadsetterout.com/drawing-standards/line-weights/
- NCS pen set (AUGI): https://forums.augi.com/archive/index.php/t-57882.html
- Ching, via Univ. of Memphis drawing standards: https://memphis.edu/architecture/docs/drawing.standards.pdf
- learnarchitecture, line weights: https://learnarchitecture.net/articles/39292-architectural-line-weights.html
- SketchUp edge styles: https://help.sketchup.com/en/sketchup/edge-styles. LayOut ratios: https://forums.sketchup.com/t/section-line-weight-in-layout/1785
- Gooch 1998 thesis, line weight and colour: https://users.cs.northwestern.edu/~ago820/thesis/node10.html, https://users.cs.northwestern.edu/~ago820/thesis/node11.html
- Goodwin, Vollick, Hertzmann 2007, *Isophote Distance*: https://www.dgp.toronto.edu/~todd/isophote/npar2007.pdf
- Bénard & Hertzmann 2019, *Line Drawings from 3D Models*: https://ar5iv.labs.arxiv.org/html/1810.01175
- Appel, Rohlf, Stein 1979, haloed lines: https://history.siggraph.org/?p=104577
- Cole et al. 2008, *Where Do People Draw Lines?*: https://pixl.cs.princeton.edu/pubs/Cole_2008_WDP/index.php
- Blender Freestyle thickness modifiers: https://wiki.blender.org/index.php/User:Flokkievids/Freestyle/LineStyle, https://docs.blender.org/api/4.4/bpy.types.LineStyleThicknessModifier_DistanceFromCamera.html
- Enscape rendering styles: https://learn.enscape3d.com/blog/knowledgebase/rendering_styles
- MDN devicePixelRatio: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
- three.js r160 LineMaterial and LineSegments2: https://unpkg.com/three@0.160.0/examples/jsm/lines/LineMaterial.js, https://unpkg.com/three@0.160.0/examples/jsm/lines/LineSegments2.js
- Skia hairlines (WHATWG list): https://lists.whatwg.org/pipermail/whatwg-whatwg.org/2013-August/082728.html
- Gamma and thin lines: https://lists.freedesktop.org/archives/cairo/2010-June/020111.html, https://jet.ro/2011/06/04/better-looking-anti-aliased-lines-with-simple-trick/
- Sterzik et al. 2023, *Perception of Line Attributes for Visualization*: https://arxiv.org/html/2308.04150v2
- WCAG 2.1 SC 1.4.11: https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast

**Gaps:**
- I could not read the ISO 128-20 width clause, DETAIL's house pen set or Pencil+ defaults in primary text.
- SketchUp's default profile width is undocumented.
- Pixel values for the user's references are measurements of downsampled JPEGs. Treat them as ratios, not absolutes.
