# designer-viz, round 3 (v2)

## 1. Scores

1 Lines 7 · 2 Hatch 7 · 3 Cut 7 · 4 Annotation 6 · 5 Datum 7 · 6 Render 6 · 7 Composition 6 · 8 Explode 6 · 9 Analysis 8 · 10 Consistency 6

**Mean: 6.6** (round 2: 6.3)

**Round 2 points:**
- **Mostly fixed:** 2 (sky IBL) and 4 (night: the 03 landing is #2C292A).
- **Partly fixed:** 1 (sun), 5 (rain), 6 (ghosts) and the meadow.
- **Open:** 3 (AO). `gtao.enabled = groups.every(g => !g.dy)` turns AO off in 02 and 07, and the 02 trench is still bare brown.

## 2. Keep

1. **03:** the warm interior against a dark exterior.
2. **01 / 10:** AgX, the cedar and grain. The meadow now reads.
3. **02:** the tag column. **06:** the field bubbles.

## 3. Fixes, ranked

1. **Alpha compositing bug.** It causes:
   - the white rain in 05;
   - the paper-white glass in 01 (#EFF2ED; v1 was #C1C4C0);
   - the glowing ghosts in 02 (x 870–1140) and 07 (x 970–1090).

   `OutputPass` encodes premultiplied rgb, so an 18% ghost is lighter than the paper.

   Replace `OutputPass` and the grade with one pass:
   - `rgb /= max(a, 1e-4)`, then AgX, sRGB, saturation 0.88 and grain;
   - then `mix(uBackdrop, rgb, a)`, with alpha 1.
2. **Night (03, 06).**
   - Draw the backdrop in that pass as a vignette: #111923 at the centre to #F2F1EC at r ≥ 0.95.
   - Exterior: `environmentIntensity` 0 and moon 0.6, to give ≈#2B3340.
   - The glass reads as a grey beam (03 x 1065–1150, y 340–560). Set its env to 0.1. Add a warm `RectAreaLight` (2.4 × 1.2 m, intensity 3) on the glass facing west, so light pools on the landing.
   - Route `uNight` to the flowers; they glow (03 x 650–760, y 600–700).
   - 06 reads grey (#58595A). Ramp ≤ 600 ms.
3. **Rain (05, x 720–1100, y 240–520).**
   - Streaks #3D6E8F. Use a 1.5 px quad with `smoothstep` coverage.
   - `len` 0.30–0.45 m with a `pow(vV, 2.0)` tail.
   - Fade the streaks to 40% at the far side.
   - Storm env horizon #EEF0F0, so the flat wet landing shows a sheen.
   - Use the same vignette in #DCE0E1.
4. **Explode (02, 07).**
   - AO per group, using `g.planes`. Otherwise add contact planes at 0.22 × (1 − lift / 1.7).
   - Equal 64 px gaps (T–F 26 px, H–D 180 px).
   - Draw the ghosts as a 0.5 px silhouette at 25% with no fill.
   - Cap the trench with tint and hatch.
   - Clip at `uYB + RAG`. The 07 shards (x 735–830, y 700–745) persist.
5. **Light.** 01 has no readable cast shadow. Landing and interior slab match (0x9B / 0x9D).
   - Glass `castShadow = true` (now `!glass`).
   - Lower the sun to 30°, so the meadow throws a 1 m shadow across the landing (01 x 800–950, y 640–700) to ≤ 0x78.
6. **Meadow and ageing.**
   - Fade the instance scale to 0 over the last 150 mm at w0.
   - Petals ×0.8.
   - In 04 the splash band and algae tags point at blank surfaces (x 575, y 300–330; x 530, y 590). Draw the splash band at albedo ×0.78 for 300 mm with a noisy top, and the algae as a 50 mm band of #3E4636 at 45%.
