# Round 3 user test (simulated, final): The Living Edge, x3

Same method, personas and tasks as x0–x2 (research 19 (c)), run with real Playwright input: wheel, clicks, pointer drags, press-and-hold for rain, taps on the phone. Screenshots: `ut-*.png`. SEQ is shown as x3 (x2 / x1).

**Caveat (stronger than in x2):** headless WebGL ran at about **1.5 frames per second** in this run. Anything timed in frames is slowed or skipped: the 1.1 s wipe sweep reached the screen as one or two frames, and on the phone the rain routes took 15–20 s to fill instead of about 1.5 s. Queued wheel events also kept scrolling the page for several seconds after input stopped. I don't count timing or paging problems against the page. The behaviour was checked in the DOM and in code instead.

## A. Year-2 student (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Coldest | Yes | 4 | 8 (7/6) | The hero's winter state shows HEAD 6.1 °C · 0.48 with a small dashed red ring (ut-student-3). In Winter I dragged OUTSIDE upward. Somewhere past −1 °C the red line *"below the 9.3 °C dew point: condensation"* disappears, and dragging back brings it (and the ring) back (ut-student-4/5): *"So at minus one it starts getting wet inside. That's the bit."* The ring itself is small (r 12 px); the red sentence carries the idea. |
| 2 Rain | Yes | 2 | 7 (6/6) | The routes fill in order, and **"ITS OWN PIPE", then "UNDERDRAIN"** appear where the water ends (ut-student-6): *"Oh, it tells you where it goes."* Only the destinations get names. Sill, trench channel and drip are still unlabelled, though they're the middle of the story. "ITS OWN PIPE" sits on the threshold linework. |
| 3 Cedar 15 | Yes | 2 | 7 (6/6) | After a fresh load the wipe rests through the middle of the cedar head, YR 0 on the left (warm) and YR N on the right (silver). The split reads at once, and the bubbles repeat it (ut-student-8). At year 20 the sweep fired (the wipe position changed at that tick), but at 1.5 fps it showed as a jump, so I can't judge how it feels. **Once**, after the page had scrolled on by itself, I found the wipe parked at the far left (3 %): the whole model was in year 23 and the red line ran through the level labels (ut-student-9). I couldn't reproduce it after a reload. |
| 4 Warm sill | Yes | 3 | 7 (7/7) | Scrolling overshot to 08; clicking "07" in the stage list worked. **The header still floats above the slab at 07** (ut-student-11). There's no line on why the sill matters. Play, Pause and Resume work. |
| 5 Pin-up | Yes | 1 | 7 (7/7) | The tool still opens at **SECTION AT W 900** (ut-student-12), while every landing caption says W 2000. |

SUS ≈ 82 (81/80) · *clever, alive, convincing* · Remembers *"the head goes below the dew point at minus one"* · **Fun 8 (7/7)**

## B. Construction-tech tutor (1440×900)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 Trust | Yes | 2 | 6 (6/6) | No change: 212 entries, and the code rows link to the vancouver.ca PDFs. |
| 2 Sources | Partial | 7 | 4 (4/4) | Same as x2: "granite" 5, "warm sill" 0. **The search box's own placeholder suggests "f_Rsi", which finds 0 entries** (also "fRsi" 0, "dew point" 0, "M2" 0). On 0 results the groups still show their full counts (39, 101, …) with no "nothing found" message (ut-tutor-2). Part sources in the tool are still plain text (`<p class="src">Sources: research 14 … §3.3 #19; R5 P1</p>`, ut-tutor-3). Clicking the M2 balloon itself does nothing; you have to click the hatch. The new 50 % RH / Magnus assumption is stated in the hint but has no source entry. |
| 3 Head fails | Yes | 3 | 7 (7/7) | Now reads "Why the head fails". The dew-point threshold is a teaching gift: *"Drag to minus one and watch it tip. I'll use that."* Two problems: **landing 6.1 °C vs tool 6.0 °C, a third round running** (ut-tutor-5). And **from about −10 °C down, the "fRsi 0.70" and "9.3 °C dew point" legend labels print over each other**; at −14 °C neither is readable (ut-tutor-4, ut-tutor-8). A projected demo of "how cold before it fails" walks straight into this. The tool's Thermal tab has no dew-point line. |
| 4 Along wall | Yes | 2 | 6 (5/5) | **Fixed:** the jamb sheet is titled "JAMB WALL BASE", and the selected part clears when the cut moves (part=tray-slips dropped from the URL; ut-tutor-6). The URL still carries `case=head&bc=iso` on the Draft tab (harmless). |
| 5 Link | Yes | 3 | 6 (6/6) | "COPIED"; the clipboard holds the URL and restores the head case after a fresh load (ut-tutor-7). The stale part is gone, but the link still carries `w=-1000` from the last cut while the case says w 900. |

SUS ≈ 77 (76/76) · *rigorous, demonstrable, nearly-there* · no "childish" · **Fun 7 (7/7)**: the dew-point demo pushes towards 8, but the same three trust nicks (6.1/6.0, W 2000/900, unlinked sources) plus the legend overprint hold it back.

## C. Phone visitor (390×844)
| Task | OK | Acts | SEQ | Notes |
|---|---|---|---|---|
| 1 5-second | Yes | 0 | – | Unchanged (ut-phone-1): *"How a wall meets the garden."* The canopy is still cropped at the right edge. |
| 2 Rain | Yes | 4 | 7 (7/7) | Momentum overshot again; I scrolled back. *"Pouring!"* The labels arrive (UNDERDRAIN reads cleanly), but **"ITS OWN PIPE" runs off the right edge** and "THE WEST" is still clipped (ut-phone-3). The fill time is a headless artefact, not counted. |
| 3 30 years | Yes | 3 | 6 (5/4) | Tapped "30": the sweep fired (wipe at 90 %, then back to 39 %) and rests on the cedar head, with the cedar on the YR 30 side. Dragging the grip right turns the cedar warm brown (ut-phone-4 → 5): *"Oh, that's the new wood."* The YR tabs no longer clip. The model is still small (~210 px wide), and the cedar head is ~30 px, so the split is only legible once you know where to look. |
| 4 What fails | Yes | 3 | 6 (5/6) | **Fixed:** the HEAD label is visible, with the dashed ring (ut-phone-6). **New:** the OUTSIDE box now covers the start of the THRESHOLD label (*"…SHOLD 13.6 °C"*), and a leader line strikes through both labels. Dragging to −12 °C works (ut-phone-7), but the *"condensation"* sentence sits ~200 px below the fold, and the legend labels already crowd at −12 °C. |
| 5 Free play | – | 10 | – | The take-apart is still the best moment (ut-phone-8/12). In headless the switch trailed the model (still "Assembled" while the model was apart) but caught up within ~6 s; probably frame lag. **The nav highlight now matches the band** (fixed). The exploded phone model has no part labels; desktop has H/D/T/F/M/E. **Build Play still runs off-screen:** the figure ends 91 px from the top while Pause is in view (ut-phone-11). |

*pretty, surprising, satisfying* · Would share *"the take-apart and the rain"* · **Fun 7 (7/6)**

## Findings by severity
1. **High:** The numbers still disagree after three rounds: landing 6.1 °C vs tool 6.0 °C, landing W 2000 vs tool W 900 (opening link and title block). The tutor notices it every time.
2. **High (phone):** Moving the OUTSIDE box fixed HEAD but now covers THRESHOLD. The condensation sentence, the new payoff, sits below the fold.
3. **Medium:** The thermal legend overprints when colder than about −10 °C (fRsi 0.70 and dew-point labels converge near −16 °C). It reads as broken in exactly the demo the tutor wants to run.
4. **Medium:** In Sources, the suggested "f_Rsi" search returns 0, zero results show no message, part sources are not links, and the dew-point assumption has no entry.
5. **Medium (phone):** Build plays out of view. The ageing model is small. "ITS OWN PIPE" clips at the right edge, and "THE WEST" clips too.
6. **Low:** Mid-route rain stations (sill, trench, drip) are unnamed. The header floats over the slab at Build 07. The link carries a stale `w`. The phone take-apart has no part labels. The wipe was once seen parked at 3 % (not reproduced).

## Delight
- **New:** The **dew-point tipping point**. Dragging the outside temperature past −1 °C and watching the red "condensation" line appear turns a number into a consequence; both the student and the tutor remembered it. **Rain names its destinations** as the water arrives. The wipe rests on the cedar head, so the split is visible without touching anything.
- **Fixed, felt as relief:** HEAD readable on the phone, the jamb title, the part clearing, the nav in sync, "Why the head fails".
- **Not felt:** The wipe sweep. It now fires at the right moment (year 20/30), but it lasts 1.1 s while the eye is on the big year number; untestable here because of the frame rate.
- **Kept:** The take-apart (still the top phone moment), the Winter flip, hold-for-rain, the on-drawing temperature handle.
- **Still flat:** Build (no why per stage) and Sources (search dead ends). No "childish".

## Fun/wow
| | x0 | x1 | x2 | x3 |
|---|---|---|---|---|
| Student | 6 | 7 | 7 | 8 |
| Tutor | 5 | 7 | 7 | 7 |
| Phone | 4 | 6 | 7 | 7 |
| **Mean** | **5.0** | **6.7** | **7.0** | **7.3** |

## Top five remaining changes
1. **One number, one cut:** Use one head value (6.0 or 6.1) in both places, and open the tool at W 2000, or caption the landing W 900. The same fix was asked for in x1 and x2.
2. **Winter on the phone:** Place the OUTSIDE box clear of both junction labels (or above the drawing), and put the condensation sentence directly under the drawing.
3. **Legend collision:** When the fRsi 0.70 and dew-point labels come within ~14 px, stack them (or merge them into one line).
4. **Sources that answer:** Index part ids, f_Rsi/fRsi and "dew point"; show "no entries, try …" on zero; link the part sources to their entries.
5. **Phone Build and Rain:** Keep the build figure sticky while it plays; keep route labels inside the canvas, flipping them left near the right edge.
