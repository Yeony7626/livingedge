# 05 — Visual tools for The Living Edge

Checked 2026-10-12. Scope: open-source or free-for-research libraries and tools for (a) the 1:10 2D construction section, (b) the 2:1 axonometric / sectional 3D view with exploded layers and assembly order, (c) the rain, sun, wind, growth and people overlays, and (d) the scroll-driven story with optional sound.

How each entry was checked:
- **Licence and latest release:** npm registry (`registry.npmjs.org`).
- **Archived flag, last push and licence:** GitHub REST API.
- **Size:** bundlephobia min+gzip for the whole package, unless marked "measured". "Measured" means the gzip size of the published dist file, fetched from unpkg. Tree-shaking usually ships less than the whole-package figure.
- **Vendor pricing:** read from the vendor's own pricing page on the date above.

Status key:
- **active:** a release or commit in the last 6 months.
- **slow:** nothing for 6 months or more; the date of the last release or push is given.
- **archived:** the repository is archived. None of the candidates below is archived.

SPEC §4 already fixes the stack as SVG for 2D and three.js through @react-three/fiber for 3D. SPEC §5 says the hairline look is "built in our own code; no external drawing package". The fit notes below take both as given.

---

## 1. 2D vector drawing and drafting

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| Native SVG `<pattern>` + `vector-effect: non-scaling-stroke` | Material hatches as tiled patterns. Pen weights stay constant when the section is zoomed. | n/a (web standard) | n/a | https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/pattern ; https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect | Best fit. It works inside a pure string renderer (`renderSection` → SVG string, deterministic) with no DOM and no dependency. |
| SVG.js (`@svgdotjs/svg.js`) | DOM-side SVG building and animation. | MIT | active (3.2.8, Aug 2026) | https://github.com/svgdotjs/svg.js | ~29 kB gzip. Needs a DOM, so it can't run in `core/`, and it adds little over React JSX. |
| Paper.js (`paper`) | Canvas vector scene graph with boolean path operations and SVG import/export. | MIT | slow (0.12.18, Jul 2024) | https://github.com/paperjs/paper.js | ~82 kB gzip. Canvas-first and heavy for static sections. |
| Two.js | Renderer-agnostic 2D drawing (SVG, canvas or WebGL) with a scene graph. | MIT | active (0.8.24, Aug 2026; push Oct 2026) | https://github.com/jonobr1/two.js | ~49 kB gzip (measured). Useful only for animated 2D overlays; JSX already covers static drawing. |
| Rough.js (`roughjs`) | Hand-drawn, sketchy rendering of lines, shapes and fills. | MIT | slow (4.6.6, Nov 2023; push Jul 2024) | https://github.com/rough-stuff/rough | ~9 kB gzip. Clashes with the drafting standard. Only worth it for an optional "sketch" mode. |
| Maker.js (`makerjs`) | 2D CAD-style paths and models with layers, plus export to DXF, SVG and PDF. | Apache-2.0 | active (0.19.2, Jan 2026; push Oct 2026) | https://github.com/microsoft/maker.js | ~44 kB gzip. Runs in Node. Good if a DXF export of the section is wanted. Has no dimensioning or hatch library. |
| dxf-parser | Reads DXF into JSON, for importing reference details from CAD. | MIT | slow (1.1.2, Nov 2021; push Jun 2024) | https://github.com/gdsestimating/dxf-parser | Read-only. |
| dxf-writer (js-dxf) | Simple DXF writer. | MIT | slow (1.18.4, Nov 2022; repo moved to tarikjabiri/js-dxf, push Mar 2024) | https://github.com/tarikjabiri/js-dxf | Superseded by the same author's `@tarikjabiri/dxf`. |
| `@tarikjabiri/dxf` (dxfjs/writer) | Modern TypeScript DXF writer. | MIT | active (2.9.0, Sep 2026) | https://github.com/dxfjs/writer | Hatch-entity support is unverified. |
| dxf-viewer | WebGL (three.js) DXF renderer. | MPL-2.0 | active (1.0.49, Sep 2026) | https://github.com/vagran/dxf-viewer | Hatch support is partial and there are no linetypes (all lines continuous). Viewer only. |
| dxf-doc | DXF writer with `HatchPattern.parse` for AutoCAD `acad.pat` files. | MIT | slow (0.1.6, Jan 2021) | https://github.com/YMSpektor/dxf-doc | The only `.pat` parser found. No JS library turned up that renders `.pat` hatches to SVG. |
| clipper2-ts | TypeScript port of Clipper2: polygon clipping, offsetting and triangulation. | BSL-1.0 | active (2.0.1-18, Jul 2026) | https://github.com/countertype/clipper2-ts | Pure TS, so it fits `core/`. Covers membrane and lap offsets and clipping hatch lines to layer outlines. Small maintainer base (41 stars). |
| clipper2-js | Earlier TS port of Clipper2. | BSL-1.0 | slow (1.2.4, Jan 2024) | https://github.com/IRobot1/clipper2-ts | Used by three-edge-projection. |
| js-angusj-clipper | Clipper 1 compiled to WASM. | MIT | slow (1.3.1, Feb 2023; push Apr 2024) | https://github.com/xaviergonz/js-angusj-clipper | WASM adds load cost. Prefer clipper2-ts. |
| clipper-lib | Clipper 6 JS port. | BSL (per npm) | slow (6.4.2, 2019) | https://github.com/junmer/clipper-lib | Legacy. |
| polygon-clipping | Boolean operations on polygons. | MIT | slow (0.15.7, Dec 2023) | https://github.com/mfogel/polygon-clipping | No offsetting. |
| `@flatten-js/core` | 2D geometry: shapes, intersections, distances, booleans. | MIT | active (1.6.14, Aug 2026) | https://github.com/alexbol99/flatten-js | Useful for leader and dimension placement maths. |
| textures (textures.js) | Ready-made SVG line, hatch and dot patterns. | MIT | slow (1.2.3, Apr 2021; push Jan 2023) | https://github.com/riccardoscalco/textures | Built on d3 and needs a d3 selection. Better as a source of ideas than as a dependency. |
| svg-patterns | Programmatic SVG patterns returned as virtual-dom nodes. | ISC | slow (2.0.1, May 2022) | https://github.com/derhuerst/svg-patterns | Small, but stale. |

## 2. Axonometric / pseudo-3D and 3D

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| three.js | WebGL/WebGPU 3D engine: orthographic camera for 2:1 views, clipping planes for sections. | MIT | active (r186.1, Sep 2026) | https://github.com/mrdoob/three.js | ~181 kB gzip if imported whole. Already chosen in the SPEC. |
| `@react-three/fiber` | React renderer for three.js. | MIT | active (9.8.1, Sep 2026) | https://github.com/pmndrs/react-three-fiber | ~56 kB gzip. Peer dependency is `react >=19 <19.4`, so pin React to match. |
| `@react-three/drei` | R3F helpers, including `<Edges>` (EdgesGeometry creases), `<Outlines>` (inverted-hull silhouette), `<Line>` (Line2), `<OrthographicCamera>` and `ScrollControls`. | MIT | active (10.7.9, Sep 2026) | https://github.com/pmndrs/drei ; https://drei.docs.pmnd.rs/abstractions/edges | ~509 kB gzip if imported whole; tree-shake it. `<Edges>` + `<Outlines>` gives SPEC rule 5's "silhouette and one crease" directly. |
| EdgesGeometry (three core) | Creates edges only where the face angle exceeds a threshold, for crease lines. | MIT | active | https://threejs.org/docs/pages/EdgesGeometry.html | Lines render 1px in WebGL. Pair with Line2 for controlled widths. |
| Line2 / LineMaterial (three addons) | Wide lines with width set in pixels or world units, for hairline pen weights in 3D. | MIT | active | https://threejs.org/docs/pages/LineMaterial.html ; https://threejs.org/examples/webgl_lines_fat.html | Standard way to get consistent stroke weight. |
| Conditional lines (`LDrawConditionalLineMaterial`) | Draws a line only when its edge is on the silhouette from the current view, for clean outlines on rounded solids. | MIT | active | https://threejs.org/docs/pages/LDrawConditionalLineMaterial.html ; https://gkjohnson.github.io/threejs-sandbox/conditional-lines/ | Built for LDraw models; needs control points generated per edge. Best line quality for "rounded, built solids". |
| OutlinePass / Sobel (three) ; postprocessing + `@react-three/postprocessing` | Screen-space outline and edge detection. | MIT ; postprocessing Zlib, react-postprocessing MIT | active (6.39.5 / 3.2.0, Oct 2026) | https://threejs.org/examples/webgl_postprocessing_sobel.html ; https://github.com/pmndrs/postprocessing | Raster edges: softer, and they cost GPU every frame. A fallback, not the main line technique. |
| SVGRenderer (three addons) | Renders a three scene to SVG elements via Projector, with painter's-order sorting. | MIT | active | https://threejs.org/docs/pages/SVGRenderer.html ; https://threejs.org/examples/svg_lines.html | No true hidden-line removal; intersecting faces sort wrongly. OK for simple stacks of plates. |
| three-edge-projection (gkjohnson) | Projects visible edges to flat 2D segments (hidden-line removal) on three-mesh-bvh. Includes a silhouette generator and a planar-intersection example. | MIT | active repo (push Sep 2026) | https://github.com/gkjohnson/three-edge-projection | Gives crisp vector stills of the axonometric for print and SVG. Risk: the npm package was unpublished 2025-10-28, so install from GitHub (`github:` dependency). |
| three-mesh-bvh | BVH acceleration for raycasting and geometry queries. | MIT | active (0.9.16, Oct 2026) | https://github.com/gkjohnson/three-mesh-bvh | Dependency of the two gkjohnson tools. |
| three-bvh-csg | Fast CSG on three meshes, for section and cutaway cuts. | MIT | active (0.0.18, Feb 2026; push Sep 2026) | https://github.com/gkjohnson/three-bvh-csg | 0.0.x API may change. Clipping planes plus stencil caps may be enough (https://threejs.org/examples/webgl_clipping_stencil.html). |
| manifold-3d | Robust mesh booleans (WASM). | Apache-2.0 | active (3.5.4, Sep 2026) | https://github.com/elalish/manifold | Alternative to three-bvh-csg when it needs to be watertight. Adds a WASM download. |
| three-svg-renderer (LokiResearch) | SVG rendering of three scenes with hidden-line removal. | **GPL-3.0** | slow (1.0.4, May 2023) | https://github.com/LokiResearch/three-svg-renderer | Licence red flag for a closed or MIT app. Stale. |
| Zdog | Flat, round pseudo-3D engine for canvas and SVG. | MIT | slow (1.1.3, Jan 2022; push Jul 2023) | https://github.com/metafizzy/zdog | ~7 kB gzip (measured). The look is close to hairline, but there's no hidden-line removal and no maintenance. |
| Isomer | Isometric shapes on canvas. | MIT | slow (0.2.6, 2016; push 2022) | https://github.com/jdan/isomer | Effectively abandoned. Canvas only. |
| OpenCascade.js | OCCT B-rep CAD kernel compiled to WASM. | LGPL-2.1 | slow (stable 1.1.1, 2020; 2.0.0-beta, Mar 2023; push Aug 2023) | https://github.com/donalffons/opencascade.js | ~67 MB unpacked. Too heavy and stalled. |
| replicad | MIT CAD API over an OCCT WASM build. `drawProjection` and `makeProjectedEdges(…, withHiddenLines)` give exact visible and hidden edges as SVG. | MIT; kernel `replicad-opencascadejs` is LGPL-2.1 | active (1.1.0, Sep 2026) | https://github.com/sgenoud/replicad | WASM is 22 MB raw, ~7 MB gzip (measured). Use only at build time in Node to pre-render exact line drawings, not on the client. |
| JSCAD (`@jscad/modeling`) | Lightweight CSG modelling in JS. | MIT | active (2.13.0, Feb 2026; push Sep 2026) | https://github.com/jscad/OpenJSCAD.org | No B-rep and no hidden-line removal. Little gain over `core/geometry.ts`. |

## 3. AEC / BIM viewers in the browser

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| That Open Engine (`@thatopen/components`, `-front`, `web-ifc`) | IFC loading, fragments, clipping planes and section/plan views (v3 `Clipper`, `ClipStyler`, `Views`, per third-party docs). | components MIT; web-ifc MPL-2.0 | active (3.4.9, Oct 2026) | https://github.com/ThatOpen/engine_components ; https://docs.thatopen.com/ | Only useful if real IFC files will be imported. Heavy (web-ifc WASM). Peer `three >=0.182`. |
| xeokit SDK | High-performance WebGL BIM/IFC viewer. | **AGPL-3.0** (commercial licence from Creoox) | active (2.6.114, Sep 2026) | https://github.com/xeokit/xeokit-sdk | Licence red flag: AGPL would require the whole web app's source to be released under AGPL. Not needed for one detail. |
| Speckle viewer (`@speckle/viewer`) | three.js-based viewer for Speckle model data (via Rhino, Revit and other connectors). | Apache-2.0 (the server monorepo has separate EE-licensed directories) | active (2.31.14, Jun 2026; push Oct 2026) | https://github.com/specklesystems/speckle-server/tree/main/packages/viewer ; https://docs.speckle.systems/developers/viewer/basic-setup | Loads from a Speckle server URL. Fits only if Rhino geometry is streamed through Speckle. |

## 4. Animation and scroll storytelling

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| Motion (`motion`, `motion/react`) | Springs, tweens, `useScroll` and `scroll()`, and layout animation. Can drive R3F values too. | MIT | active (14.1.0, Oct 2026) | https://github.com/motiondivision/motion ; https://motion.dev/docs/react-scroll-animations | ~47 kB gzip. Springs match SPEC rule 3 (springs for continuous input, ~700 ms eases). Motion+ is a separate paid add-on ($399) and not needed. |
| GSAP + ScrollTrigger | Timelines, pinning and scrubbed scroll scenes. | Webflow "Standard no-charge licence" (effective 30 Apr 2025): free for commercial use, all plugins included | active (3.15.0, Apr 2026) | https://gsap.com/community/standard-license/ ; https://github.com/greensock/GSAP | ~27 kB gzip core. Not an OSI licence. It bans use in no-code visual animation builders that compete with Webflow, which doesn't affect this project. Webflow can change the terms. |
| Lenis | Smooth-scroll normaliser for scroll-linked scenes. | MIT | active (1.3.26, Aug 2026) | https://github.com/darkroomengineering/lenis | ~5 kB gzip. Optional. Respect reduced-motion settings. |
| CSS scroll-driven animations (`animation-timeline`) | Native scroll-linked animation with no JS. | n/a (web standard) | Chrome/Edge 115+, Safari 26; Firefox still behind a flag in mid-2026 (secondary sources) | https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline | Use only as progressive enhancement under `@supports`. |
| Theatre.js (`@theatre/core`, `@theatre/r3f`, `@theatre/studio`) | Visual keyframe sequence editor for R3F scenes. | core and r3f Apache-2.0; **studio AGPL-3.0** (dev-time only, not bundled) | slow (0.7.2, May 2024; push Aug 2024; README says development moved to a private repo for 1.0) | https://github.com/theatre-js/theatre | ~31 kB gzip core. Stalled publicly. Nice for authoring the assembly sequence, but risky. |
| Lottie (`lottie-web`) | Plays After Effects (Bodymovin) vector animations. | MIT | slow (5.13.0, May 2025; push Sep 2025) | https://github.com/airbnb/lottie-web | ~75 kB gzip. Needs After Effects or LottieFiles to author. Can't share geometry with the model. |
| dotLottie (`@lottiefiles/dotlottie-web`, `-react`) | Newer Lottie player with a WASM renderer. | MIT | active (0.81.0 / 0.20.0, Oct 2026) | https://github.com/LottieFiles/dotlottie-web | ~33 kB gzip JS plus a WASM renderer (size unverified). |
| Rive (`@rive-app/react-canvas`) | Interactive state-machine animations. | runtime MIT; editor proprietary | active (4.36.0, Sep 2026) | https://github.com/rive-app/rive-react ; https://rive.app/pricing | ~63 kB gzip JS plus WASM. Free plan exports carry a Rive splash screen; Cadet ($9/seat/month) removes it. |

## 5. Natural elements

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| three.js Points / InstancedMesh + custom shader (technique) | Rain streaks, splash and drip particles in the same scene and pen style. | MIT | active | https://threejs.org/examples/webgpu_compute_particles_rain.html ; https://threejs.org/examples/webgl_points_sprites.html | No extra dependency. Draw rain as short line segments to stay in the hairline style. |
| drei `<Sky>`, `<Cloud>`, `<Sparkles>`, `<Instances>` | Ready-made sky, cloud, particle and instancing helpers. | MIT | active | https://drei.docs.pmnd.rs/staging/sky ; https://drei.docs.pmnd.rs/performances/instances | Sky and cloud are photoreal-leaning; `<Instances>` is the useful one. |
| tsParticles (`@tsparticles/react`, `@tsparticles/slim`) | 2D canvas particle overlays (rain, snow). | MIT | active (4.4.0, Aug 2026) | https://github.com/tsparticles/tsparticles | ~30 kB gzip (slim). A separate canvas, so it can't be occluded by 3D geometry. |
| three-nebula | Particle engine for three.js. | MIT | active (13.3.0, Sep 2026) | https://github.com/creativelifeform/three-nebula | More than this project needs. |
| ez-tree (`@dgreenheck/ez-tree`) | Seeded procedural trees for three: branch levels, leaves, LODs, GLB export. | MIT | active (1.1.0, Jan 2026; push Jul 2026) | https://github.com/dgreenheck/ez-tree | Tweening the parameters can show 30-year growth. Needs re-skinning to lines and plates. Peer `three >=0.167`. |
| lindenmayer | L-system strings and turtle interpretation. | MIT | slow (1.5.4, Jun 2020; push Jun 2025) | https://github.com/nylki/lindenmayer | Deterministic, so it fits `core/`. Good for 2D vine and grass growth in the section. |
| simplex-noise | Seeded 2D/3D/4D noise in TypeScript. | MIT | slow (4.0.3, Jul 2024) | https://github.com/jwagner/simplex-noise.js | Deterministic moss and wetness masks in `core/`. Stable and tiny. |
| three-custom-shader-material | Extends built-in three materials with custom shader chunks. | MIT | slow (6.4.0, Oct 2025) | https://github.com/FarazzShaikh/THREE-CustomShaderMaterial | For moss growth: noise × wetness × years, blended over plates. |
| LYGIA | GLSL/WGSL shader library: noise, generative, SDF. | Prosperity + Patron (**non-commercial** free; commercial needs patronage) | active (push Sep 2026) | https://github.com/patriciogonzalezvivo/lygia | Fine for coursework. A licence flag if the tool is ever commercial. |
| suncalc | Sun azimuth and altitude, sunrise and sunset for a latitude, longitude and date. | BSD-2-Clause | active (2.1.1, Oct 2026; now ESM) | https://github.com/mourner/suncalc | Tiny. Drives Vancouver sun angles and the shadow overlay. |

## 6. Sound

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| Web Audio API | Filtered noise (BiquadFilterNode) for rain and wind beds, gain envelopes tied to scroll. | n/a (web standard) | n/a | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API | Zero bundle cost. Audio must start from a user gesture. |
| Tone.js (`tone`) | Synthesis, noise sources, filters, and a transport synced to a timeline. | MIT | active (15.1.22, Apr 2025; push Oct 2026) | https://github.com/Tonejs/Tone.js | ~80 kB gzip (measured). Only worth it for generative or musical sound. |
| howler.js | Sample playback with fades, sprites and audio unlock. | MIT | slow (2.2.4, Sep 2023; push Nov 2025) | https://github.com/goldfire/howler.js | ~8 kB gzip (measured, core). Simple choice for looping recorded ambiences. |
| three.js PositionalAudio | Spatial sound attached to 3D objects. | MIT | active | https://threejs.org/docs/pages/PositionalAudio.html | Optional (for example, a drip at the wall foot). |
| Freesound (sample source) | Recorded rain and wind loops. | per sound: CC0, CC-BY or CC-BY-NC | active | https://freesound.org/help/faq/ | Use CC0 or CC-BY only and record the attributions. Avoid NC. |

## 7. Diagrams and charts for evidence and timelines

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| D3 (`d3-scale`, `d3-shape` modules) | Scales, axes maths, line and area generators. | ISC | last release Mar 2024 (7.9.0); repo active (push May 2026) | https://github.com/d3/d3 | ~90 kB gzip whole; import single modules. Pure functions fit the server SVG strings and the same pen tokens. |
| Observable Plot | Concise chart grammar that outputs SVG. | ISC | release Feb 2025 (0.6.17); repo active (push Sep 2026) | https://github.com/observablehq/plot | ~125 kB gzip. Fast for exploratory evidence charts. Restyling to hairline takes work. |
| visx | Low-level React SVG chart primitives. | MIT | active (4.0.0, Jun 2026) | https://github.com/airbnb/visx | Modular and React-native. Good if charts become interactive components. |
| Mermaid | Flowcharts, timelines and gantt charts from text. | MIT | active (12.1.0, Oct 2026) | https://github.com/mermaid-js/mermaid | ~169 kB gzip. Fine for docs. Its look is hard to match to the visual language. |

## 8. Design and prototyping tools

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| Figma | Storyboards, scroll-story layout, token design. Dev Mode for inspection. | proprietary; verified students get the Professional tier free | active | https://www.figma.com/education/ | Design only; no geometry export worth using. |
| Penpot | Open-source, SVG-native design tool, an alternative to Figma. | MPL-2.0 | active (push Oct 2026) | https://github.com/penpot/penpot | Fully open option for coursework. |
| Spline | Browser 3D scene editor with web embed and React runtime. | proprietary; npm runtime licence unspecified | active (`@splinetool/runtime` 2.0.76, Oct 2026) | https://spline.design/pricing | Free plan web exports carry a Spline logo. Code export starts at Pro ($25–30/seat/month). Soft-3D look and lock-in; poor fit. |
| Rhino + Grasshopper, Rhino.Compute, rhino3dm | Parametric detail generation. Compute serves Grasshopper over REST. rhino3dm reads and writes .3dm in browser or Node without Rhino. | Rhino commercial (price unverified); compute.rhino3d code MIT; rhino3dm MIT | active (rhino3dm 8.35.0, Sep 2026; compute push Oct 2026) | https://developer.rhino3d.com/guides/compute/core-hour-billing/ ; https://github.com/mcneel/rhino3dm | Production Compute on Windows Server uses core-hour billing ($0.10/core-hour in McNeel's guide; may have changed). Cannot run on Vercel. rhino3dm is the light path for importing details. |
| ShapeDiver | Hosted Grasshopper definitions with a web viewer and App Builder. | commercial SaaS | active | https://shapediver.com/pricing | The pricing page shows Startup from €199/month, a 14-day trial, and academic deals (up to 50% off or a 3-month trial, non-commercial). It lists no permanent free plan, though some third-party listings mention one. |
| Blender (Line Art, Freestyle, Grease Pencil SVG export) | Offline reference drawings: Line Art modifier and Freestyle line styles, exported as SVG or PDF via Grease Pencil. | GPL (tool only; outputs are yours) | active (manual is at 5.2 LTS) | https://docs.blender.org/manual/en/latest/grease_pencil/modifiers/generate/line_art.html ; https://docs.blender.org/manual/en/latest/files/import_export/grease_pencil_svg.html | Good for testing pen weights and 2:1 views before coding. Not a runtime dependency. |

## 9. `@lucasmarkes/hairline`

| name | what it does for this project | licence | status | url | notes (fit, risks) |
|---|---|---|---|---|---|
| `@lucasmarkes/hairline` | Animated isometric line figures that respond to the pointer (README lists 33). SVG output with opaque plates painted back to front. Camera `Cam(az, k, S)`, where k = 0.5 is "the 2:1 view". Theme tokens: `--hairline-plate`, `-hi`, `-edge`, `-mid`, `-lo`, `-stroke`. React `<Terrain />` entry. No dependencies, ESM only. | MIT | active (0.5.0, 8 Oct 2026; ~1.8k stars) | https://github.com/lucasmarkes/hairline ; https://www.npmjs.com/package/@lucasmarkes/hairline | `dist/index.js` is 214 kB unminified, ~62 kB gzip (measured). The public API exposes only the fixed figures. Custom figures come through the `hairline-create` skill's kernel as standalone HTML. SPEC §5 says no external drawing package, so use it as the style reference (MIT allows borrowing with attribution). |

---

## Licence flags

- **Copyleft:**
  - xeokit: AGPL-3.0.
  - three-svg-renderer: GPL-3.0.
  - Theatre.js studio: AGPL-3.0 (dev-time only).
  - OpenCascade.js and replicad's kernel: LGPL-2.1.
  - dxf-viewer and web-ifc: MPL-2.0, file-level (acceptable).
- **Not OSI:**
  - GSAP: Webflow no-charge licence.
  - LYGIA: Prosperity, non-commercial.
- **Proprietary tools with free-tier limits:**
  - Spline: logo on free exports; runtime licence unspecified.
  - Rive: splash screen on free exports.
- **Paid server-side tools:** Rhino.Compute (Rhino licence or core-hour billing) and ShapeDiver.
- **Samples:** Freesound CC-BY-NC sounds.
- **Supply risk:** three-edge-projection is no longer on npm and must be installed from GitHub.

## Recommended stack

1. **(a) 2D section:** a hand-written SVG string renderer in `core/`, with native `<pattern>` hatches and non-scaling strokes, plus **clipper2-ts** for membrane offsets and hatch clipping. Add Maker.js later only if DXF export is wanted.
2. **(b) 3D and axonometric:** **three + @react-three/fiber + drei**. Use an orthographic camera at the 2:1 angle, opaque basic-material plates, `<Edges>`/Line2 for creases and `<Outlines>` or conditional lines for silhouettes. Clipping planes handle the cut. **three-edge-projection** (from GitHub) is only for crisp SVG and print stills.
3. **(b)+(d) motion:** **Motion** drives springs, ~700 ms eases, the explode and assembly sequence, and `useScroll` for the story, with CSS scroll-timeline as enhancement. This avoids GSAP's non-OSI licence and Theatre.js's stall.
4. **(c) overlays:**
   - Own instanced line-segment rain and wind shaders in three.
   - **@dgreenheck/ez-tree** for plants, re-skinned to lines.
   - **simplex-noise** + **lindenmayer** in `core/` for deterministic moss and vine growth.
   - **suncalc** for the Vancouver sun path.
5. **(d) sound:** the plain **Web Audio API** (filtered noise for rain and wind) plus CC0 Freesound loops. Add howler.js (~8 kB) only if sample management grows.
6. **Evidence charts:** **d3-scale/d3-shape** modules rendered as React SVG with the same pen tokens. No Plot or Mermaid in the bundle.
7. **References, not dependencies:** Blender Line Art and `@lucasmarkes/hairline`, per SPEC §5.
