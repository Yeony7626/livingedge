# Round 0 user test (simulated): The Living Edge, w5 baseline

Method: research 19 (c). One simulated session per persona, run with real Playwright interactions. Screenshots are `ut-*.png` in this folder. "Acts" counts actions.

## A. Year-2 student (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Coldest point | Yes | 6 | 6 | Paging with PageDown skipped the hero night state: the hero runs 01→02→01→03→01, and night lasts only ~600 px, so I saw a grey wash with unreadable labels. Answered from Winter. *"Oh, it went dark, nice."* |
| 2 Rain at the door | Yes | 2 | 6 | The legend gives the answer as text. Holding the button works, but the rain is faint grey hairlines and stops the moment you let go. The trench channel isn't labelled on the drawing. |
| 3 Cedar at 15 | Yes | 2 | 5 | There's no 15 tick. The main render barely changes; the split roundels carry it. **Scrolling 300 px reset 15 to 23.** |
| 4 Warm sill stage | Yes | 2 | 7 | The list answers it. Clicking 07 jumps the page, and a small scroll moves the stage to 9. "Play the build" works. |
| 5 Pin-up drawing | Yes | 1 | 7 | Draft sheet with Print/SVG. It opens at w 900, but the landing said W 2000. |

SUS ≈ 78 · Words: *clean, serious, cool* · Remembers: the dark winter flip and the hero coming apart · **Fun/wow 6/10**

## B. Construction-tech tutor (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Trust in 2 min | Yes | 2 | 6 | VBBL clauses with page numbers. *"This is serious."* |
| 2 Granite + warm-sill sources | Partial | 6 | 3 | Landing search for "granite" found lecture notes and a climbing-wear paper. No warm-sill entry. Tool parts show "R5 P1; R4 P3" and "research 14 §3.1; ENS-K03", which aren't links. |
| 3 Why head fails 0.70 | Yes | 3 | 6 | THERM-like run in ~5 s, balance 0.00 %, circled point. The *why* is only on the landing. The landing says 6.1 °C, the tool 6.0 °C. NFRC gives f_Rsi 0.61 instead of 0.48 with no explanation: *"I'd get asked about that."* |
| 4 Same along the wall? | Partial | 2 | 5 | The jamb cut is clearly different, but a stray "12" and "−0.007" float over the concrete stem. The title still says threshold and the sill-block selection is stale. The cut is called W 2000, w 900 and w −700 in different places. |
| 5 Share lecture view | No | 4 | 2 | The URL saves the tab and cut only. My copied link reopened the threshold case with no result (the landing's `case=head` link does work). |

The "3D" tab doesn't orbit. SUS ≈ 70 · Words: *rigorous, trustworthy, dense* · No "childish" · **Fun/wow 5/10**

## C. Design-curious visitor (390×844 phone)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 5-second test | Yes | 0 | – | *"How a building meets the garden."* The headline does the work; the model is ~180 px with empty space below. |
| 2 Make it rain | Yes | 6 | 6 | *"Oh, it's raining!"* Best moment on the phone. The wind label is clipped and the model is cropped on the right. |
| 3 30 years | Partial | 8 | 2 | **The slider sits under the sticky canvas** at most scroll positions; the first drag did nothing. Reached 30, but the tiny model looks the same as at 0, and the phone has no roundels. *"Did anything happen?"* |
| 4 What doesn't work | Yes | 3 | 5 | Red "HEAD 0.48" reads as *"the top of the door is the bad bit"*. f_Rsi and the "why" paragraph are jargon. |
| 5 Free play | – | 7 | – | 1 replay (winter), 2 exclamations. **"Taken apart" renders as five specks**, and the switch sits below the model, so a tap shows nothing. Left at the tool: *"this is for architects."* |

Words: *pretty, technical, confusing* · Would share: *"maybe with an architect friend"* · **Fun/wow 4/10**

## Findings ranked by severity
1. **High (phone):** The ageing control is blocked by the sticky canvas, scroll doesn't drive it, and the result is invisible at phone size.
2. **High (phone):** The hero's exploded state is broken, the switch is out of view of the model, and the model is too small.
3. **High (tutor):** The view can't be shared: thermal case, conditions, view and selected part are never written to the URL.
4. **Medium:** Tool citations are internal codes, not links, and the landing search doesn't index parts.
5. **Medium:** Scroll-driven controls override manual choices (year, build stage). The hero night state is easy to scroll past.
6. **Medium:** Numbers disagree (W 2000 / w 900; 6.1 vs 6.0 °C), the NFRC change is unexplained, and the jamb cut keeps leftover annotations.
7. **Low:** "3D" doesn't orbit, the nav highlight lags behind the band, and rain stops instantly.

## Delight: where it happened and where it didn't
- **Present:** The Winter band flipping dark (all three). The exploded hero on desktop (A). Hold-for-rain (A, C). Clicking a part to get a red callout (B). The THERM-style run (B).
- **Missing:** Ageing (correct, but too subtle), Build (works but flat), Sources (a list), and most of the phone experience. The page is mostly *correct* rather than *fun*. Nobody used "childish"; the risk is "dull", not "juvenile".

## Top five changes for fun and wow (without going juvenile)
1. **Make ageing visible.** Stronger 0→30 contrast (silvering, the algae line, grass growth), roundels on the phone, the slider never covered, and a manual year that stays until you leave the band.
2. **Fix the phone hero.** Full-width model, a working exploded state, and tap-the-model (or a switch kept in view) to cycle the three states.
3. **Give rain weight.** Let the storm build and then drain for about 2 s after release, with routes filling in order and the sill, trench channel and drip labels appearing as the water reaches them.
4. **Winter probe and temperature scrub.** Drag the outside temperature and watch f_Rsi hold, with a note on why NFRC differs. This is the tutor's demonstration moment.
5. **Live provenance and a lecture link.** Source codes that link to the cited entry, a "Copy view link" button that saves case, conditions and part, and real orbit on the 3D tab (or rename it).
