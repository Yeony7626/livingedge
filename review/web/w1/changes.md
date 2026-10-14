# Changes after web round 2 (w1 → w2)

| Reviewer | R1 (w0) | R2 (w1) |
|---|---|---|
| web-ux | 5.9 | 6.6 |
| web-visual | 5.2 | 6.1 |
| web-arch | 5.9 | 6.6 |
| **Mean** | 5.67 | **6.43** |

## Landing
- **Sources band (06).** All 212 reviewed entries, grouped (codes 39, materials 101, assemblies 30, climate 12, ecology 30), each with subject, claim, linked source and confidence; generated from `research/entries.json` at build. Linked from the nav, the footer, the ageing copy and the tool.
- **Nav.** Opaque bar. Night tone only while a night band (or the hero at night) sits under the bar (probe at 80 px, so the build band no longer gets a navy bar). The active band's link is marked (`aria-current`, ink underline).
- **Phones and tablets.** The hero drawing follows the headline, the rail sits under it as a three-way switch (Assembled / Taken apart / Winter night) that drives the same states in place; reduced-motion desktop uses the same switch. CTAs full width. Every band's figure comes before its copy; frames 1:1 on phones.
- **Build.** The 15 stages listed (two columns, mono), current stage bold, every row clickable; the figure is a sticky, taller frame (viewport height − 160 px), so the axo is larger and stays beside the list.
- **Typography.** Number and unit joined by a non-breaking space everywhere (`13.6 °C`). The f_Rsi stat label sits on the baseline. Datum labels 16 px further off the bed. No scale bar under the threshold label at night.
- **Footer.** The title block's top rule and cells share one edge; Detail and Sources in 48 px Barlow; "Open the tool" is the block's last, filled cell. Rev 5, 2026-10-14.
- **Rain button** reports `aria-pressed`.

## Tool
- **Ink controls.** Drafted cut slider with labelled ticks for Opening / Water corner / Jamb wall on the track (pressed state); square radios and checkboxes; square mono selects; "Run analysis" in the CTA style. Header chips as plain mono text ("Rev 5 · 163 parts").
- **Part panel.** Before a part is chosen it shows the sheet's keynote schedule (M1, M2, T1, D1 …), every row selects its part; sources are named by research note ("research 11 (sliding wall) T2"); an "All parts" button returns.
- **Print and SVG.** Print sends the sheet alone, A3 landscape (`@page`); SVG downloads the current sheet.
- **Thermal.** One headline value: the HUD carries ✓ meets / ✗ below 0.70; the legend no longer repeats it. Boundary options shortened ("ISO 13788 · −7 / 20 °C"). HUD and legend as ruled blocks, not cards.
- **Views** show a pressed state. **Tabs** have `aria-controls`, a `tabpanel`, roving tabindex and arrow keys.

## Not yet
- A detail index (only Detail 02 exists).
- A scroll-pinned build (the sticky frame + list is the step towards it).
