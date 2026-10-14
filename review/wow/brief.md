# Reviewer brief: fun and "wow" (3 runs, web designer + user test)

## Context
The Living Edge: a landing page and a tool for architecture students and tutors, showing one sourced construction detail (a sliding glass wall meeting a garden, Vancouver) as live three.js rendered section-box axos and SVG ink drawings: ageing over 30 years, rain routes, a winter thermal field, a build sequence, a sources index. Pages: http://localhost:5179/landing.html and http://localhost:5179/index.html.

After ten review rounds the panel scored it 7.3/10, but the user says it is **"still not fun, no wow factor"**. The baseline user test (`review/wow/x0/usertest.md`) found it "correct rather than fun"; the risk is "dull", not "juvenile". The research behind this block is `research/19-wow-interactions.md` (patterns, 12 ranked proposals, a user-test script).

The language must stay drafting paper and ink, one signal red, Geist / Geist Mono / Barlow Condensed numerals. Fun must come from the building answering the visitor's hand, not from decoration.

## Each run
Folder `review/wow/xN/` holds:
- `d*.png` desktop 1440×900 and `m*.png` phone 390×844 captures of each band, plus `t*.png` tool captures;
- `usertest.md` from the simulated user test of that run (three personas doing tasks in the browser);
- `changes.md` of the previous run.

## Web designer review
Write `review-web-wow.md` into the run folder and return the same text, under 550 words:
1. Scores 0–10, then the mean: first impression, delight and discovery, direct manipulation, choreography and pacing, feedback and response, clarity while playing, phone experience, restraint (not juvenile), memorability, landing-to-tool pull.
2. Two things that work and must be kept.
3. The five changes that would most raise fun and wow, ranked, each concrete and buildable with the existing engine (three.js clipping planes, lifts, uniforms, SVG overlay); name the screenshot and place.

From run 2 onwards, read the previous run's reviews, user test and `changes.md`, and say what improved.

Do not edit project files other than your review file.
