# Line weight + web wow: final report (2026-10-14)

Asked: "still the lineweight doesn't feel right. research first, and revise with designer and architect. do 3 runs and web design. still not fun wow factor. do 3 run with web designer and user test."

## Summary

| Track | Start | Run 1 | Run 2 | Run 3 |
|---|---|---|---|---|
| Line weight (designer + architect mean) | lw0 not scored ("faint everywhere") | 4.75 | 5.35 | **5.75** |
| Web wow: web designer | — | 6.0 | 6.2 | **6.55** |
| Web wow: user test fun/wow (student / tutor / phone) | 5.0 (6 / 5 / 4) | 6.7 (7 / 7 / 6) | 7.0 (7 / 7 / 7) | **7.3** (8 / 7 / 7) |

Both tracks improved every run; neither is finished. Line weight is the weaker one. Web wow is now "serious, beautiful, correct, not yet wow" (web designer).

## 1. Line weight (`research/18-lineweight.md`, `review/lineweight/lw0…lw3`)

**Fixed**
- A device-pixel bug that halved every line on HiDPI screens; the root of "faint everywhere".
- Depth fade no longer greys silhouettes; the hatch no longer outweighs the outline.
- Ground reads as one heavy line at finished grade: 6 px at L17 in lw3, against 2 px at L93 in lw2.
- After run 3 (not re-reviewed):
  - cut cards lifted toward the paper;
  - dark surfaces lifted into the mid-tones;
  - thin sheet parts (sill pan, upstand, liner) drawn as single lines, not bars;
  - the sheet ground limited to finished grade.

**Still open**
- **Hero head:** cedar, WRB and sheathing fuse into one dark bundle (8 px at L<25), and the fascia silhouette is heavier than the cut.
- **Cut and tone mapping:** the cut still goes through AgX tone mapping. The clean fix is to composite it after the output pass, targeting cards at L 205–215 with noise SD < 8.
- **Night view:** the canopy (L14 on L24) and the outer/silhouette step don't read.
- **Sheet:** the beam/T4 edge still classifies as an outer line.
- **Research 18:** four corrections still need writing in:
  - R3: the cut bypasses tone mapping.
  - c6: drop the 1.5–4 px tier; any membrane or sheet metal under 6 mm is a line.
  - c2: ground means finished grade.
  - Acceptance: measured in device px, within ±0.5.
- **Missing spot checks:** the after-run-3 notes mention spot-check captures in `lw4`, but that folder was never saved.

## 2. Web wow (`research/19-wow-interactions.md`, `review/wow/x0…x3`)

**Works**: what the user test and the web designer both liked
1. **Condensation threshold:** dragging the outside temperature below about −1 °C rings the head and prints "below the 9.3 °C dew point: condensation". The number becomes a consequence. This is the best interaction on the site.
2. **Rain that teaches:** routes fill in the order the water travels and name where they end ("ITS OWN PIPE", "UNDERDRAIN").
3. **Take-apart on the phone,** and the **ageing wipe** now resting mid-cedar, so the year 0 / year 30 split shows without touching anything.
4. **Restraint:** 9/10. Nothing juvenile; the ☝ glyph is gone.

**Still missing**: ranked
1. **Drag the cut on the hero:** a red "CUT W 2000" grip with the tool's three detents, carrying the visitor's own section into the tool. The web designer names this as the single biggest lift. It would raise direct manipulation, first impression, memorability and landing-to-tool pull together. The hero still reads as a still image.
2. **One spec, one number:** this is flagged for the third run in a row.
   - The landing builds from `detail02-app.json` (W 2000, head 6.1 °C).
   - The tool builds from `detail02.json` (w 900, head 6.0 °C).
   - Fix: build both pages from one spec.
3. **Winter legend overprint:** below about −10 °C the "f_Rsi 0.70" and "9.3 °C dew point" labels overlap and become unreadable at −14 °C. That's exactly the demo a tutor runs.
4. **Phone Winter:**
   - the OUTSIDE box now clips "THRESHOLD";
   - the condensation line sits about 200 px below the fold.
5. **Dead ends:**
   - the Sources search's own suggestion "f_Rsi" returns 0 entries, as do "dew point" and "M2";
   - a search with no results shows no message;
   - part sources in the tool aren't links;
   - the footer TOOL tile is empty.
6. **Phone Build and Rain:**
   - Build still plays off-screen above Pause;
   - "ITS OWN PIPE" and "THE WEST" clip at the edges;
   - the ageing model is small (about 210 px).
7. **Seen once:** the ageing wipe parked at 3 % after the page auto-scrolled; it was fine after a reload. The cause wasn't found.

**Not yet tried**: from the x2 review: dragging the wind arrow to steer rain, a probe with a leader readout on the winter cut, the 0 °C contour travelling on the landing, and Build parts lifting in.

## Method notes
- **Captures:**
  - x3 captures were retaken cleanly on 2026-10-14; x2's blank and shifted frames were a capture fault, not the page.
  - Changing only the tool URL's `#tab=` does not reload the page; capture from `about:blank`.
  - The thermal tab needs RUN ANALYSIS first.
- **User test:**
  - Headless WebGL ran at about 1.5 fps.
  - The sweep and phone rain timing were checked in page state and code, not by eye, and weren't held against the site.
- **Where the record lives:**
  - web designer: `review/wow/x3/review-web-wow.md`;
  - user test: `review/wow/x3/usertest.md` (32 screenshots);
  - line-weight reviews: `review/lineweight/lw3/review-lw-*.md`;
  - line-weight change log: `review/lineweight/lw3/changes.md`.

## Suggested next step
Build the landing and the tool from one spec (fixes item 2), then add the hero cut drag on top of it (item 1). Together they address the top of both lists. For line weight, the next run should do the post-tonemap cut composite and the head bundle.
