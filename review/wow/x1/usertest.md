# Round 1 user test (simulated): The Living Edge, x1

Same method, personas and tasks as x0, run with real Playwright interactions. Screenshots: `ut-*.png`. SEQ shown as x1 (x0).

## A. Year-2 student (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Coldest | Yes | 4 | 6 (6) | PageDown now catches the hero night but skips "Taken apart". Dragged the scrub twice, unprompted: *"Oh, it creeps in."* |
| 2 Rain | Yes | 2 | 6 (6) | Denser, eases off: *"It drains away."* Sill, trench and drip still unlabelled on the drawing. |
| 3 Cedar 15 | Yes | 3 | 6 (5) | Holds after scrolling. Saw the change only after dragging the wipe: *"Oh, that's the colour it was."* |
| 4 Warm sill | Yes | 1 | 7 (7) | No page jump; the stage holds. |
| 5 Pin-up | Yes | 1 | 7 (7) | Still w 900 vs the landing's W 2000. |

SUS ≈ 80 (78) · *clean, clever, serious* · Remembers dragging the temperature · **Fun 7 (6)**

## B. Construction-tech tutor (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Trust | Yes | 2 | 6 (6) | Unchanged. |
| 2 Sources | Partial | 6 | 4 (3) | Labels are readable ("research 14 (lift-and-slide) §3.1"), but not links. Search "granite" still returns lecture notes and climbing wear. |
| 3 Head fails | Yes | 3 | 7 (6) | **Target moment hit.** Scrubbed −25 to +10 °C and 0.48 holds: *"That's my lecture slide."* The NFRC note answers x0's question. |
| 4 Along wall | Yes | 2 | 5 (5) | Stray annotations gone; the title still says "Threshold" and a stale part persists. |
| 5 Link | Yes | 3 | 6 (2) | Shows "Copied" and reopens with the head case auto-run. Drops the View zoom. |

SUS ≈ 76 (70) · *rigorous, trustworthy, demonstrable* · no "childish" · **Fun 7 (5)**

## C. Phone visitor (390×844)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 5-second | Yes | 0 | – | *"How a building meets the ground."* Model still about 180 px. |
| 2 Rain | Yes | 2 | 7 (6) | Button under the figure: *"Oh, it's pouring!"* "THE WEST" clipped. |
| 3 30 years | Yes | 3 | 4 (2) | Slider reachable. **The default wipe leaves the cedar on the YR 0 side**, so it looks new at 30: *"Did it change?"* |
| 4 What fails | Yes | 3 | 6 (5) | At −25 the head reads −3.2 °C: *"The inside of the door is below freezing? That's bad."* |
| 5 Free play | – | 9 | – | Tapped the hero to zoom and it came apart: *"Oh!"* (no cue). Winter takes ~3 s, its caption overlaps the model, the label is clipped, and the header **stays dark** through Ageing. Replays: rain 2, scrub 1, tap 3. |

*pretty, surprising, technical* · Would share *"the freezing door bit"* · **Fun 6 (4)**

## Findings by severity
1. **High (phone):** The hero tap has no cue, and Winter is slow, overlapped and clipped. The header stays dark afterwards; the model is small.
2. **High:** The default wipe compares nothing useful, and on the phone it hides the cedar change.
3. **Medium:** Numbers disagree: 6.0 vs 6.1 °C, −3.3 vs −3.2. The "why" text and caption ignore the scrub; W 2000 vs w 900.
4. **Medium:** Sources aren't links, and search doesn't index parts.
5. **Medium:** The link drops the View; a stale part persists across cuts; the jamb sheet says "Threshold".
6. **Low:** The Winter anchor lands below the scrub, the phone nav lags, there is no Pause on Play, and PageDown skips "Taken apart".

## Delight
- **New:** The temperature scrub for all three: the tutor's demo, the student's replay, the visitor's "below freezing". The rain fade-out, the phone hero coming apart, and the wipe once dragged.
- **Kept:** The Winter flip and hold-for-rain.
- **Still flat:** Build and Sources.
- No "childish".

## Fun/wow
| | x0 | x1 |
|---|---|---|
| Student | 6 | 7 |
| Tutor | 5 | 7 |
| Phone | 4 | 6 |
| **Mean** | **5.0** | **6.7** |

## Top five changes
1. **Wipe:** Sweep it once across the cedar on entry, then rest it mid-cedar on every viewport. Give it a visible grip, and strengthen the algae and grass.
2. **Scrub:** Update the "why" text and caption, and use one head value. Below the room dew point, show a hairline condensation mark at the ring: physics, not decoration.
3. **Phone hero:** Add a tap cue, keep the transition under 1 s, keep the caption off the model and the labels in frame, and restore the header.
4. **Rain:** Label sill, trench channel and drip as the water reaches each one.
5. **Build:** Lift each stage into place, ring the "now" part with a one-line why, and add Pause.