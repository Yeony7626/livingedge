# 19 · Wow interactions: making the section fun to explore

Date 2026-10-14. Question from the user after web round 5 (panel mean 7.27): "still not fun, no wow factor".
Inputs read: `review/web/w4/changes.md`, `review-web-visual.md`, `review-web-ux.md`, screenshots `review/web/w5/` (d01–d09, m01–m04, t01–t06), and the engine hooks in `review/web/w5/landing3d.js`, `viewer.js` and `.sketch/viewer/edge3d.js`.
Convention: every claim from the web carries its URL. **[I]** marks an inference or a proposal of mine, not a sourced fact.

---

## 0. Diagnosis: why a 7.3 page still isn't fun [I]

The panel's lowest scores point the same way: Motion 6.5 and Impact 7 (visual), Impact 7 (UX). The screenshots show why.

1. **The visitor never touches the building.** Today the verbs are *scroll*, *hold a button*, *drag a slider*, *press a step arrow*. All of them drive a timeline the author choreographed. The model itself is inert: the camera is fixed (`VIEW = { az: -36, el: 28 }` in edge3d.js), and so is the cut (`CUTW = WC`, W 2000). On the landing you cannot grab anything in the 3D frame.
2. **Nothing can go wrong, so nothing is discovered.** Every state is a correct, finished drawing. The one "failure" (head f_Rsi 0.48) is told in text and a red number (d06). It is never provoked by the visitor.
3. **No answer to the hand.** Award-level 3D sites react to the cursor even at rest (§a.4). Here the page only moves when scrolled.
4. **No peak.** The hero explode (d02) is the one authored moment the visual reviewer named. It plays on scroll, though, so it happens *to* the visitor and is not done *by* them.

The fix is not more effects. It is to hand the visitor the **inputs of the physics and the drawing**: the cut, the outside temperature, the wind, the year, the layers. The page already computes or stores the outputs [I].

---

## (a) Patterns

### a.1 Ciechanowski: one idea per figure, the reader holds the input
In *Mechanical Watch* ([ciechanow.ski/mechanical-watch](https://ciechanow.ski/mechanical-watch/)), each section adds one subsystem in build order: power, gears, escapement, balance, and so on. Each figure isolates one concept. Its grammar:
- **The figure follows the paragraph that sets it up.** A short setup paragraph comes first, then the figure, then text that says what the reader should have just seen. Sometimes an overview figure is followed by a close-up of the same idea.
- **Controls are mostly sliders** (scrub time, wind a spring, change a ratio, magnify), plus **drag to rotate** and a few **buttons for discrete states**. One page-level link pauses every animation.
- **There are no figure captions.** Part names are **bold in the prose**, colour-matched to the part in the figure, and reused across sections, so the reader builds a vocabulary.
- **Imperative micro-instructions** in the text ("drag the slider") say what to do and what to look for.
- **Staged reveals, not full models.** Unrelated parts are hidden, a hole is cut in the barrel to show the spring, part of a gear surface is removed. These are cutaways and X-rays used one at a time.
- **Scale is an interaction:** a magnification slider with a credit-card outline for size.

*Cameras and Lenses* ([ciechanow.ski/cameras-and-lenses](https://ciechanow.ski/cameras-and-lenses/)) uses the same grammar. Its pinhole box is shown with the walls cut open and sliders for hole size and distance. Its depth-of-field figure has three sliders and coloured focus markers. The "aha" moments are causal: the image flips *because* the rays cross. Readers describe the effect as making a complex mechanism intuitive by letting them manipulate it ([neoteo summary](https://www.neoteo.com/en/how-a-mechanical-watch-works-interactive-guide); [Lemmy thread](https://lemmy.world/post/9434790)).

### a.2 Victor, Patel and Case: draggable inputs, scrubbable numbers, layered depth
- Bret Victor's **reactive documents** let a hurried reader skim, a casual reader read, a curious reader adjust the author's scenario, and an engaged reader build their own. The barrier is "simply click and drag", and the model is disclosed for scrutiny ([worrydream.com/ExplorableExplanations](https://worrydream.com/ExplorableExplanations/)).
- Amit Patel (Red Blob Games) draws the static diagram first, then makes the **algorithm's inputs** draggable and shows the outputs updating. He gives each visual layer its own draw and update code, ties prose to the figure with **scrubbable numbers**, and adds polish last: larger touch targets and cursor feedback ([making-of](https://www.redblobgames.com/making-of/line-drawing/); [scrubbable numbers](https://observablehq.com/@redblobgames/scrubbable-numbers)).
- Nicky Case defines an explorable as something that teaches and is "more interactive than a quiz with one right answer". Case argues play gets learners "much deeper, much faster" ([blog.ncase.me](https://blog.ncase.me/explorable-explanations); [Data Stories 103](https://datastori.es/103-explorable-explanations-with-nicky-case/)). One recommendation: open with a simplified version of the reader's problem so they recognise it.

### a.3 News explainers: the counterfactual and the failure
- NYT published a **rotating 3D model** of Notre-Dame about a day after the fire. Fire-safety experts used it to show how simple changes to the attic could have protected the building, with rotation and zoom pointing at the key places ([award entry](https://awards.journalists.org/entries/fire-mauls-beloved-notre-dame-cathedral-in-paris/); [FlowingData](https://flowingdata.com/2019/04/17/what-happened-at-notre-dame)). The teaching device is the **what-if**: the same structure with one decision changed.
- NYT's Surfside investigation used two trained architects. One model came from drone photogrammetry and one from the original drawings, to show a structure that was "flawed and failing" ([award entry](https://awards.journalists.org/entries/the-surfside-condo-was-flawed-and-failing-heres-a-look-inside/)). The Miami Herald's *House of Cards* used scrollytelling with 2D and 3D animation to explain why the tower fell ([GIJN](https://gijn.org/stories/5-takeaways-from-an-award-winning-interactive-expose-of-a-miami-condo-collapse/)).
- **Lesson [I]:** the memorable beat in these pieces is *the mechanism of failure made visible*. A detail page has the same material: the cold head, water at the threshold, rot at the splash band.

### a.4 Award-level 3D sites: the specific "wow" interaction
| Site | The interaction that does the work | Source |
|---|---|---|
| **Lusion** (SOTM) | A point light **follows the cursor**, and the camera rotates about 1.72° so you can "look around". The scene is never still. | [Awwwards case study](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html) |
| **Active Theory v4** (SOTM 2018) | Scene colour follows the content. **Hidden click-and-hold and scroll interactions** reveal that the scene is real-time. | [Awwwards](https://www.awwwards.com/active-theory-v4-wins-january-2018-site-of-the-month.html) |
| **Igloo Inc** (Developer SOTY 2024) | Each project sits in a procedurally grown **unique ice block**. Particles form shapes per link, with **sound synced to particle motion**. WebGL text effects. Performance measured continuously on low-end devices; shaders compiled during load. | [Awwwards case study](https://www.awwwards.com/igloo-inc-case-study.html) |
| **Bruno Simon** (SOTY) | A **physics** car you drive into things, **spatialised sound**, obscure achievements and easter eggs, shared weather. Lighting is faked with matcaps for speed. | [Awwwards case study](https://www.awwwards.com/brunos-portfolio-case-study.html); [Creative Bloq](https://www.creativebloq.com/news/3d-car-portfolio); [Mux interview](https://www.mux.com/blog/3d-web-development-and-beyond-a-chat-with-bruno-simon) |
| **Apple product pages** | **Scroll-scrubbed** frame sequences on a pinned stage; products rotate or **disassemble** as you scroll. Pinned containers are typically 200–500 vh. | [Prototypr analysis](https://blog.prototypr.io/master-the-art-of-apples-splash-pages-with-these-tricks-62a57d30960d) (secondary; Apple publishes nothing) |
| **Andrew Marsh's tools** (building science) | **Drag the site, the sun or the shading mask**, and the result updates immediately. The rays used for the computation can be shown. | [Site Designer](https://andrewmarsh.com/software/site-designer-web/); [3D Sun-Path](https://www.andrewmarsh.com/software/sunpath3d-web/) |
| **Herzog & de Meuron** (2023 site) | The opposite pole: a "radically minimalist" archive and an "almost invisible framework", weighted to process. Calm, not wow. | [designboom](https://www.designboom.com/architecture/interview-herzog-de-meuron-new-website-03-13-2023/) |

Reading [I]: the wow is never the polish. It is **the scene answering the hand** (Lusion's light, Bruno's car, Marsh's drag), plus **one reward you did not expect** (Bruno's easter eggs, Igloo's particles taking shape).

### a.5 Guard rails: what juries and users punish
- Awwwards weights are reported as **Design 40 %, Usability 30 %, Creativity 20 %, Content 10 %**. A dazzling but unusable site "gets an honorable mention and dies there" ([utsubo guide](https://www.utsubo.com/blog/award-winning-website-design-guide), third-party). Wow lives inside a usable frame.
- NN/g on **scrolljacking**: long scrolljacks make users think the site is broken. They are worst with text to read or horizontal motion, and worse on mobile. They are acceptable only when they reveal information step by step, are kept short, are mixed with normal scrolling, keep the vertical direction, and are skipped on mobile ([NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)). The page now pins Ageing for 240 vh, Rain for 200 vh, plus Build. That is close to the limit. **Do not add more pins; add direct manipulation instead [I].**
- The Pudding: keep scroll transitions only where they carry change over time or space. Size steps from `innerHeight`, not `vh`. **Remove hover on mobile.** Keep stories short. Let CSS `position: sticky` do the pinning and JS only the step triggers ([responsive scrollytelling](https://pudding.cool/process/responsive-scrollytelling/); [sticky](https://pudding.cool/process/scrollytelling-sticky/)).
- **Peak-end rule:** experiences are remembered by their most intense moment and their ending, not their average ([Laws of UX](https://lawsofux.com/articles/2020/peak-end-rule); Kahneman et al. 1993). Design **one peak** and **a deliberate ending**.

### a.6 What fits drafting paper and ink, and what turns juvenile [I]
| Fits (serious play) | Turns juvenile |
|---|---|
| Lines that **draw themselves** like a pen, then hatch, then tone | Chromatic aberration, glitch text, bloom (Igloo's language, not ours) |
| A **red** that appears only where the physics fails | Confetti, stars, badges and "achievements" |
| Barlow numerals that **count** as you drag, in tabular figures | Bouncy springs with overshoot; elastic easing |
| Detents: the cut **clicks** to named stations (jamb wall, water corner, opening) | Free-floating orbit with no way back to the drawing |
| A magnifier lens like a draughtsman's loupe | Fluid-simulation cursor trails |
| Paper-quiet, opt-in sound: rain hiss, a soft tick on a detent | Music by default; sound without a gesture |
| Spring back to the true drawing view on release | A permanent perspective camera; the drawing loses its axo |

---

## (b) Proposals for this page, ranked by impact ÷ effort

Scores: Impact (I) and Effort (E), each 1–5; rank = I ÷ E. Engine names refer to existing code: `uAge` and `timeU` uniforms, `lift`/`stackLifts`, `night()`, `rainU`, `drawLens`/`lensMarks`, `sectionShapes(p, w)`/`caps()`/`clipRect`, `toWorld`, `pxUniform`, viewer `Raycaster` and `OrbitControls`, and the SVG overlay through `setSvg`/`leader`.

| # | Proposal | Band | I | E | I÷E |
|---|---|---|---|---|---|
| 1 | Scrub the outside temperature in the sentence | Winter | 5 | 1 | **5.0** |
| 2 | Thermometer probe on the cut | Winter / hero night | 5 | 2 | **2.5** |
| 3 | Grab the drawing, it springs back | Hero | 4 | 2 | **2.0** |
| 4 | Year-0 / year-30 split wipe | Ageing | 4 | 2 | **2.0** |
| 5 | Drag the cut along the wall, with detents | Hero / Detail | 5 | 3 | **1.67** |
| 6 | Draggable loupe (the existing lens, live) | Hero | 5 | 3 | **1.67** |
| 7 | Ink draws itself on band entry | All bands | 3 | 2 | **1.5** |
| 8 | Pull a layer apart by hand, hover to read it | Hero explode | 4 | 3 | **1.33** |
| 9 | Turn the wind | Rain | 4 | 3 | **1.33** |
| 10 | Opt-in sound and detent feedback | Global | 2 | 2 | **1.0** |
| 11 | Predict the next stage | Build | 4 | 4 | **1.0** |
| 12 | Break it: the sourced what-if | Winter / Rain | 5 | 5 | **1.0** (highest teaching value) |

**Peak and ending [I].** Make **#5 Drag the cut** the signature peak: slicing the building is the gesture that defines a section, and no site in §a.4 has it. Make **#1 + #2** the teaching peak. Design the **ending** as well: at the footer, the model settles into the print sheet (t01) with its title block, and the call to action is "take this sheet". The tool is the reward, not a link.

---

### 1. Scrub the outside temperature in the sentence (Winter) · I5 E1
- **What the user does.** In "A still night at **−7 °C** against a **20 °C** room", the two numbers are dotted-underlined handles. Dragging −7 left to −20 or right to +5 recolours the field live; the inside temperature can be dragged too. Arrow keys work on focus. A tap cycles through presets (−20, −7, 0, +5).
- **What they see and learn.** Surface temperatures (6.1 °C at the head, 13.6 °C at the threshold) count up and down in Barlow. **f_Rsi stays at 0.48 and 0.76 whatever the weather.** That is *why* f_Rsi, not °C, is the criterion: it is the dimensionless temperature factor. Tutors get a one-gesture lecture.
- **How to build it.** For steady-state conduction with constant conductivities and surface resistances, the field is linear in the boundary temperatures. Store f(x) = (T − Te)/(Ti − Te) once from the existing −7/20 solve; then T′ = Te′ + f·(Ti′ − Te′) [I, standard linearity; temperature factor as in ISO 13788 / ISO 10211]. The colour ramp is a uniform remap: pass `uTe` and `uTi` to the thermal material, and the SVG overlay labels re-read the same maths. No re-solve is needed.
- **Reduced motion.** Values change instantly with no count-up. The presets remain as buttons.

### 2. Thermometer probe on the cut (Winter; hero night state) · I5 E2
- **What the user does.** Over the cut face (d06, t04), the pointer becomes a crosshair, and a hairline leader carries "11.2 °C · f 0.68" next to it. On touch, the user drags a probe handle. Pressing on a ring snaps the probe to that junction's coldest point.
- **What they see and learn.** Where the cold actually is, and how steep the gradient is across the frame. The readout turns red below f 0.70. This mirrors Marsh's immediacy (§a.4) and Ciechanowski's colour-to-vocabulary binding.
- **How to build it.** Raycast against the cut plane at w = WC, or intersect the ray with the plane analytically. Convert the hit to plane (u, v) through the inverse of `toWorld("w", u, v)`, then sample the solved grid that `thermal.js` already holds (bilinear). Draw the readout in the SVG overlay with `leader()`. Throttle to `requestAnimationFrame`.
- **Accessibility.** Arrow keys move the probe along the inside surface polyline, from one junction to the next. An `aria-live="polite"` readout is updated at most twice a second.
- **Reduced motion.** No change: the probe has no animation.

### 3. Grab the drawing; it springs back (hero) · I4 E2
- **What the user does.** Pressing and dragging on the axo turns it up to about ±25° yaw and ±10° pitch. On release it eases back over 400 ms to the drawing view (az −36°, el 28°), and the labels, datums and lens leaders redraw on arrival. At rest the camera drifts ≤1.5° with the cursor, as on Lusion (§a.4).
- **What they see and learn.** The drawing *is* a solid. Depth, the slab-to-grade-beam step and the head's cantilever read in parallax. The spring-back says "this view is the drawing", so the convention is kept and not broken.
- **How to build it.** The viewer already imports `OrbitControls`. On the landing, set clamped `minAzimuthAngle`/`maxAzimuthAngle` around VIEW and damping, then tween back to VIEWDIR on `end`. Hide the SVG overlay while the camera is off-axis, because the projected labels would drift. Use `touch-action: pan-y` on the canvas so vertical swipes still scroll on phones. On phones, enable turning with two fingers only, or after a long-press [I].
- **Reduced motion.** No idle drift and no ease-back: the view snaps back.

### 4. Year-0 / year-30 split wipe (Ageing) · I4 E2
- **What the user does.** A vertical hairline with a small handle crosses the model, labelled "YR 0 | YR 30". Dragging it wipes between new and aged across the same frame. The pinned scroll still drives the right-hand year, so the wipe compares *now* with *then*.
- **What they see and learn.** Silvered cedar, the splash band and the algae line are seen against their new state *in place*, not in three bubbles (d04). Before/after wipes are the most legible comparison grammar [I].
- **How to build it.** Add `uAgeL`, `uAgeR` and `uSplit` (screen x in px). The fragment shader picks the age by `gl_FragCoord.x < uSplit`. Plant growth (geometry) follows the side the bed sits on, or is drawn twice with a clip plane in screen space via a scissor rect, which is cheap. The handle is an SVG element.
- **Keyboard and reduced motion.** The handle is a slider (`role=slider`, arrow keys, Home/End). Under reduced motion it is static at 50 %.

### 5. Drag the cut along the wall, with detents (hero / Detail) · I5 E3 · **signature peak**
- **What the user does.** On the cut face sits a red grip: a short signal-red bar on the section-box edge, labelled "CUT W 2000". The user drags it along W. It **clicks** into named stations (jamb wall, water corner, sliding panel), the same stops as the tool's cut slider (t01/t03). The caption counts "cut at W 1 340 …" in tabular figures.
- **What they see and learn.** The hatch, the parts and the threshold change along the length of the wall. The detail at the jamb is not the detail at the panel. A student learns why a detail drawing must say *where* it is cut, the gap the panel itself named ("one number per fact").
- **How to build it.**
  - (i) The clipping plane at w is already in use (`clippingPlanes`); set `plane.constant` from the pointer projected onto the W axis.
  - (ii) Caps: most parts are prisms extruded along w, so their section is constant. Move the cap group to the new w with `toWorld` E-offset, and show or hide caps by each part's w-range. For parts that vary along w, call the existing `sectionShapes(p, w)` (the tool already does) and rebuild only those caps on detent, not every frame [I].
  - (iii) Re-project the SVG labels.
  - Stencil capping is the fragile alternative; three.js users report render-order bugs when the planes move ([three.js forum](https://discourse.threejs.org/t/how-to-render-caps-like-webgl-clipping-stencil/36727)). The CPU caps already used are the safer path. For a draggable section box, Speckle suggests transform handles constrained to the box normals ([Speckle](https://speckle.community/t/section-box-for-selected-objects-in-speckleadmin/543)).
- **Accessibility (WCAG 2.5.7).** The grip is also a slider: arrow keys step 50 mm, PageUp/PageDown jump between stations, and clicking a station name in the caption jumps there ([W3C 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)).
- **Reduced motion.** No inertia. Station buttons only, with instant jumps.
- **Data caveat.** The landing model is the 6 m spec, so the stations must exist in `detail02-app.json`. This is also the natural moment to close the open item "tool and landing on one spec".

### 6. Draggable loupe: the existing lens, live (hero) · I5 E3
- **What the user does.** The "A · THRESHOLD" magnifier circle in d01 can be picked up and moved over any part of the model. Inside the circle, the model renders at about 4× with full hatch, labels and the "12 mm" dimension. Released over the head, it shows the head. In night mode the loupe shows the thermal field; in Rain it shows the water path at the sill.
- **What they see and learn.** Scale as an interaction (Ciechanowski's magnification slider, §a.1). The 1:5 detail and the 1:50 context are held together. This is the draughtsman's loupe, and it fits the paper language [I].
- **How to build it.** Render a second orthographic camera, zoomed and centred on the loupe's world point, into a small render target only while the loupe moves (render on demand). Composite it in a circle in the SVG overlay as `<image>` with a `clipPath`, or as a screen-space quad with a circular mask uniform. The dual-scene X-ray composite in [Codrops 2026](https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/) is the reference without its fluid step. `drawLens`/`lensMarks` already draw the frame and leader.
- **Accessibility.** The loupe is focusable; arrow keys move it, and number keys 1–4 jump to threshold, head, floor and landing.
- **Reduced motion.** Fixed lenses, as today.

### 7. Ink draws itself on band entry (all bands) · I3 E2
- **What the user does.** Nothing; it plays once per band, ≤900 ms. The section outlines draw in like a pen at a stroke speed related to line weight, then the hatches fade in, then the tone.
- **What they see.** The "drawing" becomes an act. A strong first impression that belongs to paper and ink, not to WebGL effects [I].
- **How to build it.** `LineMaterial` supports dashes. Set `dashed`, `dashSize` = the line length and animate `dashOffset`; or add a per-vertex "draw order" attribute and a uniform threshold `uDraw` in `onBeforeCompile`. Cut-face caps first, projected edges second, then `uTone`. Trigger from the existing `watch()` IntersectionObserver. The w4 fix still applies: never leave a figure under full opacity; use a 600 ms fallback to the final state.
- **Reduced motion.** Skipped; the final state is shown.

### 8. Pull a layer apart by hand; hover to read it (hero explode) · I4 E3
- **What the user does.** In the "taken apart" state (d02), the user drags any layer (head, door, sill, slab, landing, subgrade) further along its lift axis. On release it settles where it is put; a double-click reassembles everything. Hovering a layer fades the others to the FADE colour and opens a two-line card from the existing labels: what it is, why it is there, and its source ID.
- **What they see and learn.** The order of layers and what each one does, at the visitor's own pace. A scroll-played explode is watched; a hand-made explode is understood [I].
- **How to build it.** Raycast to a part group (the viewer has a `Raycaster`). Each group's `lift` value becomes a per-group offset along the same vector `stackLifts()` uses. The other groups follow with a 40 ms stagger and critical damping (no overshoot). The card is an SVG `foreignObject` or an HTML tooltip anchored through `leader()`.
- **Mobile.** No hover (Pudding, §a.5): tap a label chip H/D/T/F/M/E to isolate.
- **Accessibility.** Each label in the right-hand list is a button that isolates and lifts its layer.
- **Reduced motion.** Discrete lifted or assembled states, no damping.

### 9. Turn the wind (Rain) · I4 E3
- **What the user does.** Drag the "WIND FROM THE WEST" arrow (d05) to swing the driving-rain angle from vertical to about 45°, with a detent at the sourced design angle (the page says "about 75°").
- **What they see and learn.** The rain slant changes, and a dry "shadow" behind the canopy drip edge grows or shrinks on the glass and the sill, drawn as a pale band on the cut. At steep wind angles the sill is wetted and the trench channel lights blue. The lesson: overhang depth versus driven rain, which is why the drip edge and the sill drain both exist.
- **How to build it.** `rainU` already has a direction in the vertex shader; expose `uWind`. The dry zone is a 2D ray from the canopy tip at the wind angle, intersected with the section polylines in plane coordinates, drawn in the SVG overlay. The angle range and the design value must come from the research files (driving rain, Vancouver), not be invented. Respect "details must be sourced".
- **Keyboard and reduced motion.** The arrow is a slider. Under reduced motion there are no particles; the slant is shown as static hatched rain lines.

### 10. Opt-in sound and detent feedback (global) · I2 E2
- **What the user does.** Turns on a "SOUND" toggle in the nav (default off). Rain hiss scales with storm intensity; a dry paper tick plays on every detent (cut stations, year ticks, build stages).
- **Why.** Igloo syncs sound to motion to make interaction "playful and satisfying". Bruno Simon spatialises it ([Igloo](https://www.awwwards.com/igloo-inc-case-study.html); [Bruno](https://www.awwwards.com/brunos-portfolio-case-study.html)).
- **How to build it.** Create the `AudioContext` inside the toggle's click, as Chrome's autoplay policy requires ([Chrome autoplay](https://developer.chrome.com/blog/autoplay)). Use two short buffers under 30 kB each.
- **Haptics.** `navigator.vibrate(8)` on detents where supported (Android). iOS Safari does not implement the Vibration API, and the hidden-switch workaround is unofficial and reportedly patched in iOS 26.5 ([web-haptics notes](https://www.mintlify.com/lochie/web-haptics/advanced/browser-support)). Treat haptics as a bonus only.
- **Reduced motion.** Unaffected; sound has its own toggle.

### 11. Predict the next stage (Build) · I4 E4
- **What the user does.** At each step the next part hovers above its place as a dashed ghost. "Place it" (click, Space or scroll) drops it with a short settle. An optional **predict mode** offers three candidate parts; choosing one shows whether it is right, with a one-line sourced reason (e.g. "the pan goes in before the sill: …").
- **What they see and learn.** Sequence as reasoning, not as a list. Testing "what comes next?" is the active-recall version of d07 [I].
- **How to build it.** `stageDefs` and `stageAt` exist. The ghost is the next stage's group drawn with `fadedLines` at reduced opacity and a lift offset; dropping it animates the lift to 0.
- **Blocker.** The panel's open item "Build why lines need a sourced reason per stage" must be done first. Do not write the reasons here.
- **Reduced motion.** No settle; the part appears in place.

### 12. Break it: the sourced what-if (Winter / Rain) · I5 E5 · highest teaching value
- **What the user does.** A switch such as "Without the warm sill", "Threshold without the pan" or "No thermal break at the head", modelled on the NYT Notre-Dame counterfactual (§a.3). Flipping it shows the failure on the same cut: the field turns red at the new coldest point, or water reaches the floor in the Rain band.
- **What they see and learn.** Why each layer exists, shown by its absence. This is the beat the news explainers are remembered for.
- **How to build it.** Precompute alternative thermal fields offline with the existing solver (the tool solves 155 645 unknowns in-browser, t04); load them lazily and cross-fade the field texture. For rain, use alternative path polylines.
- **Sourcing.** Every "broken" variant must be a documented failure mode from the research files (e.g. 07, 11, 12, 14) with its citation shown. This is the user's rule after the architect rejected invented junctions.
- **Reduced motion.** An instant swap, with a side-by-side static pair available.

### Cross-cutting rules for all twelve [I]
- **Every drag has a click or key twin** (WCAG 2.5.7) and a visible affordance: a red grip, a dotted-underlined number, a cursor change. Hidden interactions (Active Theory) are for bonus rewards only, never for content.
- **Text tells the hand what to do** in Ciechanowski's register: "Drag the red cut along the wall." Put it in the mono kicker, one line, as an imperative.
- **One idea per figure.** If a band needs two gestures, it needs two figures or two steps.
- **Do not add pins.** The new interactions live inside the existing pinned frames (§a.5).

---

## a.7 Performance and accessibility patterns

**WebGL budget** (rules of thumb; profile on real devices):
- **Render on demand.** Draw only on input, scroll progress change or tween, and stop when idle. Lusion-style idle drift should run only while the band is visible (existing `watch()` observer) ([hontran three.js perf](https://www.hontran.dev/blog/three-js-performance-optimization)).
- **Cap the pixel ratio** at `min(dpr, 2)` on desktop and about 1.5 on phones. Avoid double-scaling ([three.js forum](https://discourse.threejs.org/t/animate-low-performance-on-mobile-with-window-devicepixelratio-resize/23628)).
- **Draw calls.** Mid-range phones struggle past a few hundred; aim for about 100–150 (heuristic, same source). The 163 parts should be merged per material and layer group, keeping one group per liftable layer for #8 [I].
- **Second renders** (loupe #6, split #4) run only while active and into small targets. GTAO is off during drags and on again at rest [I].
- **Precompute heavy physics** (thermal what-ifs #12). Remap, don't re-solve (#1).
- Igloo's practice: measure continuously on low-end devices; compile shaders and load textures during the initial load and in the background ([Igloo](https://www.awwwards.com/igloo-inc-case-study.html)).

**Accessibility:**
- `prefers-reduced-motion`. WCAG technique C39 (CSS) and SCR40 (JS) for SC 2.3.3 Animation from Interactions. Parallax-like motion that the user doesn't directly control can trigger vestibular symptoms ([W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html); [Understanding 2.3.3](https://w3c.github.io/wcag/understanding/animation-from-interactions.html)). Each proposal above lists its fallback.
- **Dragging alternatives** (SC 2.5.7, AA in WCAG 2.2): tap-to-position or +/− buttons ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements); [tabnav](https://tabnav.com/academy/wcag/success-criterion-2.5.7)).
- **Keyboard.** Every handle is a focusable `role=slider` with `aria-valuetext` ("cut at W 2000, sliding panel"; "outside −12 °C, head 2.9 °C, f 0.48").
- **Auto-moving content** over 5 s, such as the rain loop and idle drift, needs pause (SC 2.2.2). The page-level "pause all motion" link copies Ciechanowski's (§a.1) ([W3C 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)).
- **Touch.** `touch-action: pan-y` on canvases so a vertical swipe still scrolls; explicit grips for drags; no hover-only content (Pudding).
- **Sound** is off by default and created on a user gesture (Chrome autoplay policy).

---

## (c) User-test script: 3 personas, quick moderated test

### Method
- **Who and how many.** NN/g: about 5 comparable users find most problems, and several small rounds beat one big one. With three or more distinct groups, test **3 per group** ([NN/g](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)). So: 3 students + 3 tutors + 3 phone visitors = 9 sessions of 30 min. Run **round 0 on the current w5 page** as the baseline, then round 1 on prototypes of proposals 1–6.
- **Format.** Moderated, in person or by call with screen share. **Concurrent think-aloud** ([NN/g](https://nngroup.com/articles/thinking-aloud-the-1-usability-tool/)). One moderator and one note-taker with a timestamped log. Record screen and voice with consent.
- **Neutral prompts only:** "What are you thinking now?", "Keep talking", "What did you expect to happen?", "What are you looking for?". Avoid "why" (it can sound judgmental, per Dumas and Redish), and never name the control ("try the slider"). Probe only at natural pauses (Pernice's interactive think-aloud, summarised in [City Univ. paper](https://openaccess.city.ac.uk/31246/1/uxpajournal.org-Talking%20About%20Thinking%20Aloud%20Perspectives%20from%20Interactive%20Think-Aloud%20Practitioners.pdf)).
- **Session flow (30 min).** Consent and recording (2) → warm-up "tell me about the last construction detail you studied or found interesting" (3) → 5-second first impression (1) → tasks (18) → reaction cards (3) → SUS for the tool, or the end questions (2) → debrief (1).

### Metrics
| Metric | How | Benchmark / target |
|---|---|---|
| Task success | 0 fail / 0.5 partial (with help or wrong path) / 1 success, judged against the criterion in each task | ≥ 0.8 mean per task |
| Time on task | From the end of reading the task to the declared answer | Compare round 0 and round 1 |
| **SEQ** | After each task: "Overall, how easy or difficult was this task?" 1 (very difficult) to 7 (very easy). Ask "what made it a [score]?" when ≤ 5 | Average about 5.5 ([MeasuringU](https://measuringu.com/seq10/)) |
| **SUS** | For the tool only, at the end (10 items) | 68 = 50th percentile; > 80.3 ≈ A ([MeasuringU](https://measuringu.com/interpret-sus-score/)) |
| **Delight moments** | Note-taker codes **unprompted** signs: an exclamation ("oh!", laugh), lean-in, **repeating an interaction without being asked**, showing the moderator, a spontaneous "can I…?". Log the time, band and interaction [I] | Target ≥ 1 per band in round 1; count replays |
| Reaction cards | Microsoft Desirability Toolkit: choose the words that fit from a balanced deck (~60 % positive), then narrow to 5. Include *fun, engaging, boring, confusing, trustworthy, rigorous, childish, dull, impressive, overwhelming* ([STC](https://www.stc.org/intercom/2012/11/users-tell-stories)) | Look for "fun/engaging" without "childish" |
| Teach-back | "Explain to a classmate in 2 sentences why the head is the cold point." Score against a 3-point rubric | Comprehension, not just usability |
| Peak-end recall | Debrief, or a message 24 h later: "What one moment do you remember?" | Should name the designed peak (#5 / #1) |

### Persona A: Year-2 architecture student (laptop, preparing a technology studio pin-up)
1. **"Find where this detail is coldest on a winter night and say why."** Success: names the head (6.1 °C / f 0.48) and says the frame's own profile is the reason. Watch whether they find the Winter band or the hero night state; in round 1, whether they use the probe (#2).
2. **"What stops rain driven against the glass from getting under the sliding door?"** Success: names the sill, the trench channel and the drip edge at the canopy tip. Watch whether "hold for rain" is discovered; in round 1, whether the wind drag (#9) is.
3. **"Show me the cedar after 15 years and tell me what changed."** Success: reaches year 15 (±2) and names silvering or erosion. Watch the pinned-scroll versus slider strategy, and any overshoot frustration (NN/g scrolljack signals).
4. **"At which build stage does the warm sill go in, and what has to be finished before it?"** Success: stage 07; names the channel and the pan (and the air and water barriers at 06).
5. **"Get a drawing of the threshold you could pin up."** Success: reaches the tool's Draft sheet and Print/SVG. Measures the landing-to-tool hand-off.

*Ask at the end:* "If you had to make this page more useful for your studio, what would you change?"

### Persona B: Construction-technology tutor (desktop, deciding whether to use it in a lecture)
1. **"In 2 minutes, decide whether you'd trust this detail. Show me what you'd check."** Success: opens Sources (d09) or a part's source in the tool. Measures the trust path; log what they look for first.
2. **"Find the source behind the reclaimed granite landing and the warm sill."** Success: reaches the entries for M2 / T-layers with citations.
3. **"Explain to me, as you would to students, why the head fails the 0.70 criterion."** Success: uses the field or the numbers to explain. In round 1, check whether they discover the scrubbable temperature (#1), and whether they *use it as a demonstration* that f_Rsi is independent of the outside temperature (the target delight moment).
4. **"Is the detail the same along the whole length of the wall? Show me."** Success: compares the jamb wall and opening cuts (tool cut slider; round 1: the landing drag-cut #5). This also tests the "one number per fact" problem (W 2000 vs w 900). Note any confusion.
5. **"Set up the exact view you'd project in class and send yourself the link."** Success: a deep link that restores the state. Tests shareability; failure here is a feature gap, not a user error.

*Ask at the end:* "Would you use this in a lecture or in an assignment? What would stop you?" Then the reaction cards.

### Persona C: Design-curious visitor (phone, about 3 minutes, no construction background)
1. **5-second test:** show the hero (m01) for 5 s, hide it, and ask "What was that page about?" Success: something like "how a building meets the garden / a wall detail". Measures first impression and the small hero model (m01 void).
2. **"Make it rain."** Success: starts the storm within 30 s. Watch for discovery of the hold-to-rain control and pinned scroll on a phone.
3. **"Show me what this looks like after 30 years."** Success: reaches year 30. Watch thumb scroll versus slider conflicts.
4. **"Is there anything about this wall that doesn't work well? Find it."** Success: finds the red 0.48 / cold head. Tests whether the failure reads to a lay person.
5. **Free play, 2 minutes:** "Do whatever you'd like; just keep talking." The **primary delight measure**: count unprompted interactions, replays and exclamations; note where they stop and where they leave.

*Ask at the end:* "Would you send this to someone? Who and why?" and "One word for how it felt."

### Reading the results [I]
- **Fun without comprehension** (delight high, teach-back low) means the interaction is decoration; tie it back to one idea per figure.
- **Comprehension without delight** means the gesture is hidden or the response is too subtle; make the grip visible, or make the change bigger and faster.
- **Child-like words on the reaction cards** ("cute", "game-like") from tutors mean the tone is slipping; remove effects, not interactions.
- **Fix, then retest** with 3 more per group (NN/g iterative rounds).
