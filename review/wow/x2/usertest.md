# Round 2 user test (simulated): The Living Edge, x2

Same method, personas and tasks as x0 and x1 (research 19 (c)), run with real Playwright input: wheel, PageDown, clicks, pointer drags, and press-and-hold for rain. Screenshots: `ut-*.png`. SEQ is shown as x2 (x1 / x0). Caveat: headless WebGL makes PageDown lag 1–2 s, so I don't count paging problems against the page.

## A. Year-2 student (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Coldest | Yes | 4 | 7 (6/6) | Scrolling now lands on "Taken apart" (600–1400 px) and then on the hero night (HEAD 6.1 °C, 0.48). Dragged the new OUTSIDE handle on the drawing, unprompted: *"Oh, the label on the drawing changes too."* The "why" text follows the drag (−3.2 °C). |
| 2 Rain | Yes | 2 | 6 (6/6) | No change. The legend answers it; sill, trench and drip are still not labelled on the drawing. |
| 3 Cedar 15 | Yes | 2 | 6 (6/5) | The wipe rests on the cedar head with a red grip; at 15 the split reads at once. **The entry sweep was never seen**, because it plays at year 0, when both sides are identical. |
| 4 Warm sill | Yes | 2 | 7 (7/7) | Play resumes from 07; Pause and Resume work. The header floats above the slab at 07 (*"what holds that up?"*). |
| 5 Pin-up | Yes | 1 | 7 (7/7) | Still w 900, while the landing says W 2000. |

SUS ≈ 81 (80/78) · *clean, clever, alive* · Remembers the head going below zero · **Fun 7 (7/6)**

## B. Construction-tech tutor (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Trust | Yes | 2 | 6 (6/6) | No change. |
| 2 Sources | Partial | 6 | 4 (4/3) | No change. Searching "granite" finds lecture notes and climbing wear; "warm sill" finds 0 entries. The M2 source is plain text ("R5 P1; R4 P3"). |
| 3 Head fails | Yes | 3 | 7 (7/6) | Scrubbing on the drawing is better for projecting. At +10 °C the panel reads *"Why the head is cold… (14.9 °C)"*: *"Students will laugh. Say 'coldest' or 'relatively'."* **Landing 6.1 °C vs tool 6.0 °C, still.** |
| 4 Along wall | Yes | 2 | 5 (5/5) | No change. The jamb sheet is titled "Threshold to garden", and a stale M2 part (`part=pavers-lined`) stays in the panel and the URL. |
| 5 Link | Yes | 3 | 6 (6/2) | "Copied" works and the link restores the head case, but it also carries `w=-700` and the stale part. |

SUS ≈ 76 (76/70) · *rigorous, demonstrable, unfinished-in-places* · no "childish" · **Fun 7 (7/5)**

## C. Phone visitor (390×844)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 5-second | Yes | 0 | – | The model now fills the frame (343×364): *"How a wall meets the garden."* The right edge is cropped. |
| 2 Rain | Yes | 3 | 7 (7/6) | *"Pouring!"* Scroll momentum overshoots the drawing. "THE WEST" is still clipped. |
| 3 30 years | Yes | 4 | 5 (4/2) | The wipe rests on the right edge of the cedar, so **the cedar face stays on the YR 0 side** (warm) at 30. Once I dragged the grip: *"Oh, it went grey."* The "YR 0" tab then clips off the screen. The ageing model is small (~210 px). |
| 4 What fails | Yes | 4 | 5 (6/6) | **The OUTSIDE box covers the HEAD label** on the phone, so the −3.2 °C value is hidden. I found the red 0.48 / −3.2 °C after scrolling. |
| 5 Free play | – | 11 | – | The tap cue works, and "taken apart" lands in about 0.6 s: *"Oh, it comes apart!"* Tapped three times. Winter settles in about 2.5 s, and during "taken apart" the switch still showed "Assembled". The nav lags by one band (it shows Detail in Ageing, Rain in Winter). Build "Play" runs off-screen because the anchor lands below the figure. |

*pretty, surprising, satisfying* · Would share *"the take-apart and the rain"* · **Fun 7 (6/4)**

## Findings by severity
1. **High:** The wipe sweep fires at year 0, so it compares nothing and nobody sees it. On the phone the resting position also leaves the cedar face on YR 0.
2. **High (phone):** The OUTSIDE handle covers the HEAD label, which is the failure the page exists to show.
3. **Medium:** Numbers still disagree (6.1 vs 6.0 °C; W 2000 vs w 900). "Why the head is cold" reads as nonsense at +10 °C.
4. **Medium:** Sources are not links; search doesn't index the parts.
5. **Medium:** A stale part persists across cuts and into the link; the jamb sheet is still titled "Threshold".
6. **Medium (phone):** The Build anchor skips its figure, so Play runs out of view. The ageing model is small. The hero switch lags the tap.
7. **Low:** The nav highlight lags; "THE WEST" and "YR 0" clip; the header floats over the slab at Build 07; rain is still unlabelled.

## Delight
- **New:** The phone take-apart (fast, cued, now big): the best moment on the phone. The on-drawing temperature handle with the "why" text following it. The wipe grip, once found. Build Pause, which was a relief rather than a delight.
- **Not felt:** The desktop 1.5° lean: nobody remarked on it. The wipe sweep: never seen.
- **Kept:** The Winter flip, hold-for-rain, the tutor's 0.48-holds demo.
- **Still flat:** Build, Sources, Rain labels. No "childish".

## Fun/wow
| | x0 | x1 | x2 |
|---|---|---|---|
| Student | 6 | 7 | 7 |
| Tutor | 5 | 7 | 7 |
| Phone | 4 | 6 | 7 |
| **Mean** | **5.0** | **6.7** | **7.0** |

## Top five changes
1. **Sweep at the right moment.** Start the sweep when the year first passes about 20, or set the year to 30 for the sweep. Rest the wipe so the cedar face sits on the year-N side on every viewport.
2. **Rain teaches:** Label sill → trench channel → drip as the water reaches each one, and briefly highlight each route on arrival.
3. **Winter on the phone:** Move the OUTSIDE box off the HEAD label. Below the room dew point, draw a hairline condensation mark at the ring, and say "coldest", not "cold".
4. **Build lifts:** Each stage drops 10 px into place and the "now" part gets a one-line why. On the phone, keep the figure sticky while it plays.
5. **One number, one link:** One head value in both places, W 2000 everywhere, and source codes that link to their entries. Clear the part when the cut changes.
