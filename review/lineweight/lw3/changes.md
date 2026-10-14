# Line weight: summary of three runs, and the pass after run 3

| Reviewer | Run 1 (lw1) | Run 2 (lw2) | Run 3 (lw3) |
|---|---|---|---|
| lw-designer | 4.9 | 5.3 | 5.6 |
| lw-architect | 4.6 | 5.4 | 5.9 |
| **Mean** | 4.75 | 5.35 | **5.75** |

Baseline (lw0) was not scored; both reviewers described it as "faint everywhere": a device-pixel bug halved every line on HiDPI screens, depth fade greyed silhouettes, and the hatch outweighed the outline.

## After run 3 (not re-reviewed; captures in lw4 are spot checks)
- **Pale cut cards.** Tint lift raised from ×1.22 to ×1.75 (uniform `uCardK`), so after AgX the cut cards read near the paper rather than the paving (both reviewers' first fix). A true post-tonemap composite is still the clean solution.
- **Dark surfaces lifted** into the mid-tones (any render below L≈0.32 pulled toward `#b8b3ab`), so lines win (research 18 c8).
- **Sheet bars gone.** Thin straight parts with no path (sill pan, upstand, liner) draw as one 1.5 px line on the strip's own axis; bent ones keep their outline.
- **Sheet ground = finished grade only** (soil open to the air); buried joints like F1/F10 are inner lines (architect: the standard's "cut meets soil" should read "finished grade").

## Still open (named by the reviewers)
- Compositing the cut after the output pass, without AgX or GTAO (target card L 205–215, noise SD < 8).
- The hero head: cedar + WRB fuse into one dark strip; the fascia silhouette is drawn heavier than the cut.
- Night canopy albedo (L14 on L24); night outer vs silhouette step.
- The beam/T4 edge on the sheet still classifies as outer.
- Standard corrections to write into research 18: R3 must say "cut bypasses tone mapping"; c6's "1.5–4 px → 75 % fill" tier should go (any membrane or sheet metal under 6 mm is a line); c2 ground = finished grade; acceptance should measure device px within ±0.5.
