# Review: web-ux, round w4 (final)

## 1. Scores
| Criterion | w3 | w4 |
|---|---|---|
| Information architecture and narrative | 8 | 8 |
| Layout and grid | 7 | 8 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 7 |
| Impact and memorability | 7 | 7 |
| Tool usability | 7 | 7 |
| Responsive behaviour | 6 | 7 |
| Accessibility | 7 | 7 |
| Landing-to-tool coherence | 8 | 8 |
| **Mean** | **7.1** | **7.4** |

## My round-4 points
1. **Desktop bands:** mostly fixed. Bands now start at the top, Winter is sticky, the "why" is two sentences, and all 15 Build stages fit (d07). New problem: the d06 figure renders at about 25% opacity.
2. **Mobile:** mostly fixed. Chips, sticky Rain and Winter, and heading-first are in. Still open:
   - m01: the model is still about 165px wide, with a void at y 440–640.
   - m04: the figure takes about 66% of the height and hides the 07/15 counter.
   - m04: the active chip "05" is clipped at the right edge.
3. **Tool on a phone:** fixed (t05).
4. **Thermal:** partly fixed. The deep link works (t06). The table is still in the panel, and in-field text is still about 8px.
5. **Vocabulary:** mostly fixed. The 3D switch matches (t03). The default w is still 900 (see fix 1).
6. **Honest controls:** fixed (t02, d09). One leftover: the D11 callout in t01 still says "(MAKER)".

## 2. Keep
1. **The hand-off:** "Run the head case in the tool" (d06) opens a red 0.48 (t06). Landing and tool agree on the story.
2. **The pinned Build (d07):** the scroll, stepper and list stay in sync.
3. **Sources as a working reference (d09),** plus teaching the failure in Winter.

## 3. Ranked: what most raises the level from here
1. **One number per fact (d03, d06, t06).**
   - The landing says head 6.1 °C at W 2000. The tool says "6.0 °C on head-frame-leg", and its case reads "Floor-band head (w 900)".
   - Make `w=2000` the tool's initial state for every entry point, and add head and threshold cases at w 2000.
   - Otherwise, caption the landing "head at w 900". A student must never see two values for one point.
2. **Thermal stage composition (t04, t06).**
   - Move the heat-flow and U-factor table into the stage at y 760–890, as a 3-column grid.
   - Set in-field labels (`EXTERIOR AIR · Rse`, `SOIL CROP…`) to an 11px floor with `paint-order:stroke; stroke:var(--bg); stroke-width:3px`.
   - Offset the fRsi tag 16px from its ring: in t06 it collides at (455, 705). Remove the stray "0 °C" at t04 (490, 672).
   - Pull the legend tags (x 926) to 8px from the bar.
   - Replace "X below 0.70" with "below 0.70".
3. **The d06 dim figure.**
   - Gate the hidden state on JS: `html.js .reveal{opacity:0}`.
   - Add `.in` from an IntersectionObserver with `threshold:.1`. Add a 600ms timeout fallback so the figure can never stay faded.
4. **Mobile figures (m01, m04).**
   - Fit the camera to 90% of the frame width.
   - Enforce `.frame{height:42svh}` in Build.
   - Mirror "07/15 · stage name" into the figure caption, so the state is visible while stepping.
   - On chip change, call `chip.scrollIntoView({inline:'center',block:'nearest'})` and set `scroll-padding-inline:16px`.
5. **3D tab (t03).**
   - Remove the nested scrollbar at x 1092 with `#three{overflow:hidden}`.
   - Wire the View buttons to camera presets per junction, or hide them on 3D.
   - Add raycast picking, so a clicked part shows its name and sources in the panel instead of "go to Draft".
   - Add `scrollbar-gutter:stable` on the panel. The cut slider jumps between 1407 and 1422 across tabs.
6. **Tool polish (t01, t05).**
   - Hide the subtitle under 600px ("Detail 02 S…").
   - Add a visually hidden `<h1>` and a skip link.
   - Add arrow-key roving to the role=tablist.
   - Rename D11 to "(manufacturer profile)".
