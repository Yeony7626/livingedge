# Changes after web round 4 (w3 → w4)

| Reviewer | R1 (w0) | R2 (w1) | R3 (w2) | R4 (w3) |
|---|---|---|---|---|
| web-ux | 5.9 | 6.6 | 6.9 | 7.1 |
| web-visual | 5.2 | 6.1 | 6.6 | 6.85 |
| web-arch | 5.9 | 6.6 | 7.1 | 7.2 |
| **Mean** | 5.67 | 6.43 | 6.87 | **7.05** |

## Landing
- **Build is pinned on desktop.** The band holds for 300 vh; scrolling through it builds the fragment stage by stage (01 → 15). The arrows, the range, the stage list and "Play the build" all scroll to their stage, so state and scroll agree. Stage 15 is "Planting" (no people are modelled).
- **Bands start at the top** (no more centring that pushed headings under the bar); Winter's figure is sticky beside its text on desktop.
- **Captions on every figure:** AXO 02 Ageing, AXO 03 Rain, AXO 04 Winter, AXO 05 Build.
- **Entry motion.** Each band's figure rises 8 px and fades in once as it arrives (400 ms, `cubic-bezier(.2,.7,0,1)`); off under reduced motion.
- **Small screens.** A chip row (01–06) under the bar; in every band the eyebrow and heading come first, then the figure, which stays sticky (42 svh, paper ground, hairline) while the controls scroll; the hero stage is 4:5.
- **Winter.** "Why the head is cold" in two sentences, now stating that the generic frame gives 0.48 while certified frames reach 0.62–0.72; the research detail sits in "Read the research". Hero night legend moved off the roof to the stage's left.
- **Sources.** "Manufacturer" spelled out; an "Other" filter for dataset / secondary / textbook / unclassified; a one-line legend for the usage tag (used in calculation / guidance / illustrative).
- **Labels.** Datum ladder 72 px west of the block; rain fitted tighter (margin 3 %); the footer gap removed.
- **All tool links carry the hero cut** (`w=2000`).

## Tool
- **Deep links fixed.** The opening hash is read before the views initialise (it was being overwritten), and the case is applied after the case list exists: `#tab=thermal&case=head` opens with the head case and a red 0.48; `w=2000` now holds.
- **3D tab** uses the landing's three-state switch (Assembled / Taken apart / Winter night) instead of a slider and a toggle; its part panel no longer refers to sheet tags.
- **Vapour toggle** is disabled and says why: no part in the model is declared as the vapour control (open item).
- **Phone.** Tabs as a full-width four-column grid; Print / SVG / Dark hidden; the sheet shows keynote circles only (the schedule below names them), so the drawing gets the width; the scale bar drops its middle label.
