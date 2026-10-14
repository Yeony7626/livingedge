# Changes after web round 1 (w0 → w1)

| Reviewer | R1 (w0) |
|---|---|
| web-ux (product/UX designer) | 5.9 |
| web-visual (visual/interaction designer) | 5.2 |
| web-arch (architect, envelope tutor) | 5.9 |
| **Mean** | **5.67** |

## Landing
- **No SaaS chrome.** Buttons are square ruled boxes, mono caps, 12 px, with a trailing arrow on links. Nav links in mono caps, numbered 02–05 to match the bands.
- **One grid.** Nav, hero and every band share one gutter: `max(40px, 50vw − 680px)` (a 1360 px measure). Hero copy and section copy now start on the same line.
- **Numbered sheets.** Each band has a 1 px top rule and a mono eyebrow (01 Detail 02 · Vancouver, 02 Ageing, 03 Rain, 04 Winter, 05 Build).
- **Hero narrates.** A three-step rail replaces the scroll cue: 01 Assembled / 02 Taken apart / 03 Winter night, active state follows the scroll. Pin cut from 420 to 360 vh. The night now returns to paper before the pin releases (no navy seam under the nav).
- **Nav over night.** The bar turns to night tokens over the winter band and the hero at night.
- **Type.** h1 up to 80 px / 0.96, −0.045 em; h2 up to 58 px, 14 ch measure. `sub` no longer pushes its line down.
- **Rain.** The storm greys the whole band (`--sk`), no box behind the drawing.
- **Range.** A drafted slider: hairline track, 4 × 22 px ink bar thumb. The colliding "1" tick is gone.
- **Build.** Prev / next buttons and a 1–15 stage range with `aria-valuetext` naming the stage; "Play the build" keeps the auto-play.
- **Deep links.** "Open the tool at this cut" (w 2000), and an "in the tool" link under every band: 3D, water layer at the same cut, the head thermal case, the part sheet.
- **Footer** is a title block: Project, Detail, Method (links to the winter method), Sources, the four tool views; scale, revision and date.
- **Winter contrast.** Signal on navy is #FF6A4D; stat captions 12 px.
- **Reduced motion.** No pinned scroll, static end states, no transitions.
- **Phones (≤ 600 px).** Lens, datum ladder, age bubbles, winter bubbles and the build NOW tag are hidden; the stage is 4:5; the caption sits under the drawing.

## Tool
- **HUD.** Tweens only within one quantity, so it can never show a blend of carbon and f_Rsi (the "597.48"). Hidden on the 3D tab (the panel already shows carbon).
- **Draft title block** on two lines, right-aligned, clear of the scale bar.
- **Shape and tabs.** All radii 2 px or square; the mode switch is a ruled segmented control in mono caps, filled for the active tab.
- **Deep links.** `index.html#tab=…&case=…&w=…` opens that state; the hash follows every tab and cut change. The brand links back to the overview.
- **Panel.** Control layers appear only on the Layers tab. Cut chips show a pressed state; view chips in sentence case. Carbon labels wrap (no ellipsis); the carbon block folds into a `<details>`.

## Not yet
- Mobile explode / winter toggle (the pin is off below 900 px).
- Pinned, scroll-driven build.
