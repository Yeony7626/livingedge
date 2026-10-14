# Review w3: web-arch (architect, envelope tutor)

## Scores
| Criterion | w2 | w3 |
|---|---|---|
| Information architecture and narrative | 8 | 8 |
| Layout and grid | 8 | 8 |
| Typography | 7 | 7 |
| Colour and imagery | 8 | 8 |
| Motion and interaction | 6 | 6 |
| Impact and memorability | 7 | 7 |
| Tool usability | 7 | 7 |
| Responsive behaviour | 6 | 6 |
| Accessibility | 6 | 7 |
| Landing-to-tool coherence | 8 | 8 |
| **Mean** | **7.1** | **7.2** |

The landing page now teaches. In the tool, the Layers sheet and the default cut still undercut it in a crit.

## Round-3 points
1. **Keynotes: fixed.** D14, D11, T5, T4 and T1 match between t01 and t05. The ±0.000 label still sits on hatch in t05 (x≈45–95, y≈341).
2. **Sources: mostly fixed.** No inner scroll, "Show all 39", search, right-aligned counts and anchors are all in. Code clauses still carry "CALCULATED" (d09: "Part 9 scope · CODE · CALCULATED") with no legend, and there are no junction filters.
3. **Teach the failure: fixed, and well done** (d06). One gap: the page never says outright that 0.48 is the generic frame and 0.62–0.72 is a certified one.
4. **Control layers: not fixed** (acknowledged). The vapour line is missing in t02, and the air line is only a stub (x≈745–778, y≈405–460). The title block still reads "SCALE: BAR" (t01, t02, d08).
5. **Build: partly fixed.** The m04 figure is now sticky. There is still no "why" line (d07, y≈400–450), and stage 15 still reads "Planting and people".
6. **Small fixes: half done.** The cut ticks and the m01 caption are fixed. The tool still opens at w 900 while d01 says W 2000. The t04 table has not moved and there are no keys on the field.

## Keep
1. **The "Why the head is cold" paragraph** (d06/m03). It gives the cause, the source clause, the remedy and "confirm in THERM". That is how a tutor talks.
2. **Stable keynotes across sheets and widths** (t01/t05). Students can now cross-reference.
3. **Honest thermal reporting** (t04): "screening only", the heat balance at 0.00 %, L2D and the method note.

## Fixes (ranked)
1. **Draw the control layers (t02).**
   - For each part, read `controls:["air","vapour"]` from the part list and stroke a 2 px line along that part's warm face, joined across parts.
   - If no part declares a layer in this cut, grey out its toggle and add "no vapour control in this cut".
   - Change the title block from "SCALE: BAR" to "1:5 @ A3" (t01, t02, d08 bottom-left).
2. **Open the tool on the hero junction (t01–t04, panel "w = 900 mm").**
   - Default to `w=2000` so the tool matches d01's "CUT AT W 2000".
   - Key the parts the story is about on the desktop sheet: D2 sill block, T11 paver slips and T14 haunch are keyed in t05 but missing in t01 (x 590–745, y 405–470). Raise the label cap to 16 and alternate the leaders left and right.
3. **Build (d07).**
   - Add a 2-line `<p class="why">` (15 px, `max-width:38ch`) at y≈410, e.g. "Pan before sill: water must leave before the frame sits on it."
   - Rename stage 15 to "Planting".
4. **Sources vocabulary (d09, right column).**
   - Replace the second tag with Applied · Checked · Context.
   - Add a one-line legend under the filter row.
   - Add junction chips (Threshold · Head · Landing · Water corner) that filter on the part ids each entry cites.
5. **Thermal sheet (t04).**
   - Overlay the part keys at 60 % opacity on the field.
   - Move the U-factor table into the empty area at x 840–1080, y 300–700.
   - Move the "0 °C" label at (485, 672) off the isotherm.
   - In d06, under the 0.48, add: "Generic frame here; certified frames reach 0.62–0.72."
6. **Collisions and scale.**
   - d01/d03: the "−0.007 LANDING" arrowhead overprints its own text (x≈625–638, y≈698). Add `padding-right:12px` to the labels and start the leaders 8 px clear.
   - d06: the figure scrolls away while you read the text (empty at y 500–900). Make it `position:sticky; top:72px`.
   - m01: the axo is about 170 px wide on a 390 px screen. Set it to `width:100%`.
   - m02: the sticky figure clips "drag." at y≈465. Add `scroll-margin-top:50svh` to the h2, or move the heading above the figure.
