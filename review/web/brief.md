# Reviewer brief: The Living Edge, web design (web block, 5 rounds)

## The product
The Living Edge is a web tool for architecture students and educators. It shows construction-detail sections of a building edge meeting a garden in Vancouver. All graphics are drawn live from one sourced 3D model, using three.js and SVG, as a single-file HTML page.

There are two pages.

**Landing page** (`landing.html`), in this order:
1. **Nav.**
2. **Pinned hero.** The copy sits on the left. On the right is a rendered section-box axo. On scroll it explodes into construction layers, reassembles, then turns to a winter night showing the computed temperature field.
3. **Ageing:** a 0–30 year scrubber.
4. **Rain:** a hold-to-rain storm.
5. **Winter:** the thermal field, with a legend and f_Rsi values.
6. **Build:** stage by stage.
7. **Footer.**

**Tool** (`index.html`):
- A header with four tabs: Draft (ink sheet), Layers (control layers), 3D (the hero renderer embedded) and Thermal (screening).
- A right-hand panel with cut, view, layers, part info and embodied carbon.

## What the user wants
The user wants the web design, the graphics and the overall impact raised to a professional level. They have rejected earlier work as "juvenile" and "default graphic". The visual block (5 rounds, by architects and graphic designers) has already brought the drawings up to standard. This block is about the web experience:
- information architecture and narrative;
- layout and grid;
- typography;
- motion and interaction;
- impact and memorability;
- tool usability;
- responsive behaviour, accessibility and performance;
- how the landing page and the tool connect.

The visual direction: drafting paper and ink, one signal red, water blue and inferno only inside analysis. Type is Geist / Geist Mono, with Barlow Condensed for numerals. The user's inspiration links for the landing page were two Dribbble shots: an AI creative-assistant landing page and an AI-agents control platform.

## Screenshots
Each round's folder is `review/web/wN/`. Desktop captures are 1440×900; mobile captures are 390×844.
- `d01-hero.png`, `d02-explode.png`, `d03-hero-winter.png`, `d04-age.png`, `d05-rain.png`, `d06-winter.png`, `d07-build.png`, `d08-footer.png`: landing page at desktop size.
- `m01-hero.png` … `m04-build.png`: landing page on mobile.
- `t01-draft.png`, `t02-layers.png`, `t03-3d.png`, `t04-thermal.png`: the tool.
- `landing-shell.html` and `shell.html`: the page source, for reference.

From round 2 onwards, also read the previous round's reviews and its `changes.md`, and judge whether your earlier points were fixed.

## Output
Write your review to the round folder as `review-<your-id>.md`. Return the same text as your final answer, under 550 words:

1. Scores 0–10 for each criterion, then the mean:
   - information architecture and narrative
   - layout and grid
   - typography
   - colour and imagery
   - motion and interaction
   - impact and memorability
   - tool usability
   - responsive behaviour
   - accessibility
   - landing-to-tool coherence
2. Three things that work and must be kept.
3. The six most important fixes, ranked. Each must be concrete and implementable with HTML, CSS and JS: say what to change, where, and to what values or patterns. Name the screenshot and the place on it for every point.

Do not edit any project files.
