# Changes after web round 3 (w2 → w3)

| Reviewer | R1 (w0) | R2 (w1) | R3 (w2) |
|---|---|---|---|
| web-ux | 5.9 | 6.6 | 6.9 |
| web-visual | 5.2 | 6.1 | 6.6 |
| web-arch | 5.9 | 6.6 | 7.1 |
| **Mean** | 5.67 | 6.43 | **6.87** |

## Landing
- **Sources usable.** No nested scroll: eight rows per group, then a ruled "Show all N". A search field and source-type filters (All / Code / Standard / Paper / Guide / Maker) with a live count; groups open when they hold matches. Counts in one right-aligned column. Each row states its source type in a fixed vocabulary (Code, Standard, Guide, Paper, Manufacturer, Dataset, Secondary, Textbook) plus how it was used; each row has an `id="src-…"` anchor. The intro column is sticky.
- **Teach the failure.** Under the 0.48: why the head is cold (the coldest point is on the door frame's own head profile, not the installation), what research 13 §5.2 found (installation junction 0.91 once the steel lintel became glulam with a two-piece flashing; frame head 0.62–0.72, governed by the product's PHI certificate), and "confirm in THERM with the chosen product". The head label is full #FF6A4D.
- **Composed bands.** Each band is at least one viewport tall with its content centred; figure captions in the hero's form on Rain and Build ("AXO 03 · Rain · …").
- **Labels off ink.** The datum ladder sits 48 px left of the block's westmost point; "WIND FROM THE WEST" sits before its arrow, not on it.
- **Nav.** "01 Detail" added (tracks the hero), plus a skip link. "Run the head case" moved above the method note.
- **Small screens.** Age and Build figures are sticky under the bar (48 svh) while their controls scroll; on phones the hero caption has its own 56 px strip under the drawing.
- **Type floor.** Every overlay and footer label is at least 11 px.

## Tool
- **Stable keynotes.** Each part's key comes from the part list once (zone + order), so D2 is the same part on every sheet and at every width; a cropped part skips its number, nothing renumbers.
- **Cut ticks.** Jamb wall labels to the left of its tick, Water corner to the right: no overlap. The slider reports `aria-valuetext` ("900 mm, at the opening").
- **Views** as a three-column grid of mono-caps buttons. **Control layers** one per row with a 3 px colour rule and a line saying what each controls.
- **Thermal.** The value appears once (HUD); the panel keeps the sentence.
- **Phone.** One page scroll (the panel no longer scrolls inside); header title ellipsis; only the ±0.000 datum is labelled under 700 px.

## Not yet
- Scroll-pinned build (sticky figure + clickable list instead).
- Control-layer continuity on the Layers sheet (vapour / air drawn where the part list declares them).
- A true print scale in the title block.
