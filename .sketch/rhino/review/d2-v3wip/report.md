# Review packet

Spec: C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\detail02.json
Version: d2v3

## Floating parts (touch nothing)
- none

## Clashes (overlap > 1 mm3, not declared in `embeds`)
- none

## Parts

| id | name | role | junction | x | y | w | touches | src |
|---|---|---|---|---|---|---|---|---|
| avb | Self-adhered air/vapour control layer on deck (pre-strip at wall line) | air | R | -630.0..2500.0 | 3273.0..3276.0 | -1200..1800 | cant, deck, edge-nailer, roofins-1, sub-fascia | 06 B8; 06 B9 |
| band-cedar | One course of WRC channel siding (one face, no ripped course) | cladding | H | -144.6..-125.6 | 2752.0..2875.0 | -1200..1300 | band-strap, band-vent | 09 W1; R5 D2 |
| band-closure | PT cavity-top closure (cavity not open to the soffit space) | frame | H | -125.6..-106.6 | 2896.0..2934.0 | -1200..1400 | band-ei, band-strap, band-vent, band-windbarrier | 06 B22 |
| band-ei | Stone-wool board 130 on lintel face, up to the joists | thermal | H | -106.6..23.4 | 2748.0..3022.0 | -1200..1500 | band-closure, band-screen, band-strap, band-windbarrier, ei-top, head-flashing, head-stripin | R1 F6; R1 F8 |
| band-screen | Black stainless insect screen ≤ 2 mm at the cavity base | metal | H | -125.6..-106.6 | 2749.5..2750.0 | -1200..1400 | band-ei, band-strap | 08 L |
| band-strap | PT strapping 19x64 | frame | H | -125.6..-106.6 | 2750.0..2896.0 | -1153..1311 | band-cedar, band-closure, band-ei, band-screen, band-vent | 06 A13 |
| band-vent | 21 mm black-mesh vent slot at the band top | metal | H | -145.1..-125.6 | 2875.0..2896.0 | -1200..1400 | band-cedar, band-closure, band-strap, soffit | R5 D2 |
| band-windbarrier | Vapour-open wind barrier on the stone wool above the closure | air | H | -107.1..-106.6 | 2934.0..3022.0 | -1200..1500 | band-closure, band-ei, ei-top | ABC 11 |
| base-lined | No. 57 open-graded base 150 on the liner | drainage | M | -1885.5..-173.5 | -324.6..-116.0 | -0..1800 | bedding-lined, jz-base, jz-bedding, liner, subgrade-jz, underdrain, underdrain-out | 08 H |
| base-t | No. 57 base 150 on compacted subgrade (infiltrating beyond 1.9 m) | drainage | P | -3291.5..-2043.5 | -338.0..-167.2 | -1200..1800 | bedding-t, edge-restraint, liner-edge-curb, rill-floor, subgrade-far | 08 H |
| basin-cobbles | Cobbles 100–150 filling the basin (splash and silt trap) | drainage | J | -1040.0..-560.0 | -350.0..-52.5 | -690..-210 | basin-ends, basin-shell | 10 §3.6; R5 P2 |
| basin-ends | Basin end walls | drainage | J | -1100.0..-500.0 | -410.0..-11.5 | -750..-150 | basin-cobbles, basin-shell, jz-base, jz-bedding, jz-pavers, subgrade-jz | R5 P2 |
| basin-shell | Reclaimed granite basin under the spout, sump floor −350 (silt settles here; removable bucket) | drainage | J | -1100.0..-500.0 | -410.0..-11.5 | -690..-210 | basin-cobbles, basin-ends, jz-base, jz-bedding, jz-pavers, rill-floor, rill-walls, subgrade-jz | R2 N2; R5 P2; R3 P1; 08b M9 |
| bay-insul | Stone-wool fill over the lintel (air tie by membranes, no spray foam) | thermal | R | 63.0..185.0 | 3022.0..3257.0 | -1200..1800 | blocking, ceiling, deck, joists, lintel, lintel-gyp | R4 (spray foam out) |
| beam | Engineered reinforced grade beam + footing under the opening (Part 4) | concrete | T | -20.0..231.0 | -530.0..-193.0 | -1200..1800 | course, dampproof, interior-subgrade, jamb-stem, pan-skirt, stone, subgrade, subgrade-jz | 12 foundation; 11 T1; R1 table; R2 VBBL 9.15.4.6 ruling |
| beam-insul | Graphite EPS Type 3 75 on beam face (drained by the perimeter drain) | thermal | T | -97.0..-22.0 | -530.0..-193.0 | -1200..1800 | haunch, jamb-parge, perim-geotextile, perim-geotextile-jz, perim-rock, perim-rock-jz, plinth-insul, subgrade, subgrade-jz | 11 T2; R2 P4; R4 |
| bed-mulch | Wood-chip mulch 75, leaf litter left | ground | I | -5150.0..-3441.5 | -197.0..-108.0 | -1200..1800 | bed-plant-1, bed-plant-2, bed-soil, edge-restraint, rg-medium, rill-floor, rill-walls, runnel-floor, runnel-walls, tree | 08 I |
| bed-plant-1 | Salal and sword fern understorey (proxy, R3 F6) | planting | I | -4150.0..-3450.0 | -130.9..689.1 | -150..550 | bed-mulch | R3 F6; 08 L1 |
| bed-plant-2 | Red-flowering currant (early bloom) (proxy, R3 F6) | planting | I | -5300.0..-4600.0 | -140.4..679.6 | 1200..1900 | bed-mulch | R3 F6; 08 L1 |
| bed-soil | Planting bed medium 450 | ground | I | -5150.0..-3441.5 | -647.0..-183.0 | -1200..1800 | bed-mulch, edge-restraint, rg-medium, rill-floor, runnel-floor, runnel-strip, runnel-walls, subgrade-far, tree, tree-pit | 08 I |
| bedding-lined | No. 8 open-graded bedding 50 | drainage | M | -1885.5..-173.5 | -144.6..-66.0 | -0..1800 | base-lined, jz-bedding, jz-pavers, liner, pavers-lined | 08 H |
| bedding-t | No. 8 bedding 50 | drainage | P | -3291.5..-2043.5 | -188.0..-117.2 | -1200..1800 | base-t, clapper, edge-restraint, liner-edge-curb, pavers-t, rill-floor, rill-walls | 08 H |
| blocking | Full-depth blocking at the wall line, caulked 4 sides | frame | R | 25.0..63.0 | 3022.0..3257.0 | -1200..1800 | bay-insul, deck, head-membrane, joists, lintel, membrane-top | 06 B4 |
| box-gutter | Charcoal box gutter, front face 236 deep (edge band) | water | R | -735.0..-657.0 | 3124.7..3322.3 | -1200..1800 | gutter-skirt, membrane-roof | R5 D1; 08 J |
| cant | Cold overhang: PT firring + 12 ply, falling 26 % | frame | R | -650.0..-140.0 | 3276.0..3438.0 | -1200..1600 | avb, edge-metal, edge-nailer, membrane-roof | R5 D1 |
| ceiling | Gypsum ceiling 12.7 (no ceiling poly: exterior-insulated roof) | frame | R | 167.7..2500.0 | 3009.3..3022.0 | -1200..1800 | bay-insul, joists, lintel-gyp | ABC 16 |
| channel | Polymer-concrete trench channel, house wall top −92 (pan nose drains in), grate rebate | drainage | T | -171.5..-21.5 | -130.0..-6.0 | -0..1800 | channel-drop, grate, grate-screen, haunch, jz-bedding, jz-pavers, liner, pavers-lined, plinth-insul | 11 T16; R1 F1; R4 |
| channel-drop | Channel bottom outlet, solid HDPE 63 (jointless through the envelope) | drainage | T | -165.8..-102.8 | -330.0..-120.0 | 44..106 | channel, channel-pipe, haunch | R2 N2; R2 N3 |
| channel-pipe | Solid HDPE 63 from the channel to its own storm-sump inlet, 1 % (R2 N3 second outlet) | drainage | T | -165.8..-102.7 | -374.6..-298.5 | -1200..107 | channel-drop, perim-rock-jz | R2 N2; R2 N3; 08 J12 |
| clapper | Granite clapper slab 80 over the rill, flush (B651 8.2.4) | ground | J | -2979.5..-1731.5 | -132.8..-32.0 | -600..-300 | bedding-t, jz-bedding, jz-pavers, liner-edge-curb, pavers-t, rill-walls | R3 P1; 08 J16 |
| course | Structural PU thermal-break board 251 x 100 (Armatherm 500 class), drillable | thermal | T | -20.0..231.0 | -193.0..-93.0 | -0..1800 | beam, jamb-stem, pan-back, pan-skirt, wedge | R1 F9 (b); 12 R; 11 T9 |
| coverboard | Cover board 12 | frame | R | -100.0..2500.0 | 3426.0..3490.0 | -1200..1200 | edge-nailer, membrane-roof, roofins-2 | 06 B12 |
| dampproof | Water-based damp-proofing on beam face (EPS-compatible) | water | T | -21.0..-20.0 | -530.0..-195.0 | -1200..1800 | beam, pan-skirt, subgrade, subgrade-jz | 07 E6; ABC loop2 N10 |
| deck | Plywood roof deck 16 | frame | R | -630.0..2500.0 | 3257.0..3273.0 | -1200..1800 | avb, bay-insul, blocking, ei-top, joists, membrane-top, sub-fascia | 06 B7 |
| edge-metal | Charcoal drip edge into the box gutter, strip-in over the flange | water | R | -663.5..-561.8 | 3243.8..3336.2 | -1200..1700 | cant, membrane-roof | 06 B15; R5 D1 |
| edge-nailer | PT nailer at the insulation edge | frame | R | -140.0..-100.0 | 3276.0..3438.0 | -1200..1600 | avb, cant, coverboard, membrane-roof, roofins-1, roofins-2 | 06 B11 |
| edge-restraint | Reclaimed granite curbstone on edge 150 (path edge) | ground | P | -3441.5..-3291.5 | -358.0..-58.0 | -1200..1800 | base-t, bed-mulch, bed-soil, bedding-t, pavers-t, rill-floor, rill-walls, root-barrier-edge, runnel-floor, runnel-strip, runnel-walls, subgrade-far | R5 N8; 08 H |
| edge-seal | Flexible perimeter sealant over the slot edge | air | F | 231.8..257.1 | -15.0..0.0 | -0..1800 | pan-back, slot-edge, soilgas | R1 table; VBBL 9.25.3.6(5) |
| ei-top | Stone-wool board between joists (wall-line thermal continuity) | thermal | R | -106.6..23.4 | 3022.0..3257.0 | -1200..1500 | band-ei, band-windbarrier, deck, joists | 06 B6 |
| eps-1 | Graphite EPS Type 2, 50 (layer 1) | thermal | F | 232.0..2500.0 | -200.2..-150.2 | -1200..1800 | eps-2, stone | 12 build-up |
| eps-2 | Graphite EPS Type 2, 50 (layer 2, joints staggered) | thermal | F | 232.0..2500.0 | -150.2..-100.2 | -1200..1800 | eps-1, soilgas | 12 build-up |
| glass-1 | IGU pane 1 4 mm low-e, safety glass | cladding | T | 28.0..32.0 | 60.0..2630.0 | -0..1800 | jamb-stem, sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| glass-2 | IGU centre lite 1.3 mm (thin-glass triple) | cladding | T | 49.4..50.7 | 60.0..2630.0 | -0..1800 | jamb-stem, sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| glass-3 | IGU pane 3 4 mm low-e, safety glass | cladding | T | 68.0..72.0 | 60.0..2630.0 | -0..1800 | jamb-stem, sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| gr-drain | Granular pumice drainage layer 30 (no plastic board) | drainage | R | 401.5..2500.0 | 3456.6..3528.6 | -1200..1600 | gr-edge-profile, growing-medium | R4 |
| gr-edge-profile | Perforated green-roof edge profile | metal | R | 400.0..460.0 | 3455.0..3555.0 | -1200..1700 | gr-drain, gravel-edge, growing-medium, membrane-roof | 09 d |
| grate | Stainless 316 heel-safe grate, slots ≤ 6.5 mm parallel to the door, top −6 | metal | T | -165.5..-31.5 | -26.0..-6.0 | -0..1800 | channel, grate-screen, grate-seat, jamb-parge, jz-pavers, plinth-insul | 08b M; B651 4.3.4; R1 table |
| grate-screen | Dirt screen 1.0–1.2 mm under the grate | metal | T | -161.5..-40.0 | -26.5..-26.0 | -0..1800 | channel, grate, grate-seat, jamb-parge, jz-pavers, plinth-insul | 11 T16 |
| grate-seat | Stainless grate seat hung from the nosing | metal | T | -40.0..-26.0 | -27.5..-8.0 | -0..1800 | grate, grate-screen, nosing, plinth-insul | R1 F1; R1 F13 |
| gravel-edge | Washed gravel strip 500 x 60 at the roof edge (vegetation-free zone) | drainage | R | -98.0..400.0 | 3445.0..3515.0 | -1200..1700 | gr-edge-profile, membrane-roof | 09 d |
| grout | Chloride-free grout under and behind the track (behind: to −21 only) | concrete | T | 0.0..231.0 | -80.4..-21.0 | -0..1800 | jamb-stem, pan, pan-back, sill-foil, track, track-weeps | 11 T14; R1 table |
| growing-medium | Pumice-based extensive substrate 80 | ground | R | 401.5..2500.0 | 3486.6..3608.6 | -1200..1500 | gr-drain, gr-edge-profile, sedum | R4; 09 d |
| gutter-skirt | Charcoal skirt below the gutter, closing to the sub-fascia | water | R | -735.0..-650.0 | 3086.0..3124.7 | -1200..1800 | box-gutter, sub-fascia | R5 D1 |
| haunch | Concrete haunch under the channel, on the beam insulation and the drain stone | concrete | T | -171.5..-22.0 | -193.0..-130.0 | -0..1800 | beam-insul, channel, channel-drop, jz-base, jz-bedding, liner, perim-rock, plinth-insul | R1 table; R2 9 |
| head-airseal | Interior backer + sealant, frame to packer | air | H | 170.0..180.0 | 2730.0..2742.5 | -0..1800 | head-tape, head-track | R1 F5; 11 H7 |
| head-flashing | Head flashing 24 ga charcoal, 6 % fall, hemmed stiffener, drip 5 past cladding | water | H | -154.8..24.5 | 2730.4..2830.0 | -1200..1800 | band-ei, head-membrane, head-stripin | 11 H10; R1 F10 |
| head-membrane | Head air/water membrane (vapour-open), packer face into rough head | air | H | 24.5..100.0 | 2742.0..3022.0 | -1200..1800 | blocking, head-flashing, head-tape, lintel-infill-2, membrane-top, packer | 11 H4; R1 F16 |
| head-stripin | Self-adhered strip-in lapping 70 over the flashing upstand | water | H | 23.4..23.9 | 2760.0..2900.0 | -1200..1800 | band-ei, head-flashing | 11 H4 |
| head-tape | Three-zone pre-compressed tape in the head gap | air | H | 0.0..170.0 | 2730.0..2742.0 | -0..1800 | head-airseal, head-membrane, head-track | R1 F5 |
| head-track | Head track / head jamb | frame | H | 0.0..180.0 | 2690.0..2730.0 | -0..1800 | head-airseal, head-tape, sash-top | 11 H5 |
| interior-subgrade | Compacted subgrade under the slab | ground | F | 231.0..2500.0 | -1700.0..-300.0 | -1200..1800 | beam, stone, subgrade, subgrade-jz | 12 |
| jamb-parge | Charcoal mineral parge on the plinth insulation (WIP) | concrete | Z | -107.0..-97.0 | -284.8..262.0 | -1200..-0 | beam-insul, grate, grate-screen, jz-base, jz-bedding, jz-pavers, perim-rock, perim-rock-jz, plinth-insul | R5 N3 |
| jamb-stem | Jamb wall concrete stem on the beam (WIP) | concrete | Z | -20.0..231.0 | -193.0..262.0 | -1200..-0 | beam, course, glass-1, glass-2, glass-3, grout, nosing, pan, pan-back, pan-skirt, sash, sill-apron, sill-foil, track, track-rails, wedge | massing |
| joists | Roof joists 38x235, tapered over the overhang to about 125 at the tip | frame | R | -630.0..2500.0 | 3022.0..3257.0 | -1140..1698 | bay-insul, blocking, ceiling, deck, ei-top, membrane-top, soffit, soffit-furring, sub-fascia | 06 B3; R5 D1 |
| jz-base | No. 57 base 150 (jamb), drains into the envelope | drainage | P | -1887.5..-107.0 | -314.6..-134.9 | -1200..0 | base-lined, basin-ends, basin-shell, haunch, jamb-parge, jz-bedding, liner, liner-edge-curb, perim-geotextile, perim-geotextile-jz, perim-rock, perim-rock-jz, rill-floor, subgrade, subgrade-jz, underdrain, underdrain-out | 08 H |
| jz-bedding | No. 8 bedding 50 (jamb) | drainage | P | -1887.5..-107.0 | -164.6..-84.9 | -1200..-0 | base-lined, basin-ends, basin-shell, bedding-lined, channel, clapper, haunch, jamb-parge, jz-base, jz-pavers, liner, liner-edge-curb, rill-floor, rill-walls | 08 H |
| jz-pavers | Reclaimed granite planks 80 in front of jamb A | ground | P | -1887.5..-107.0 | -114.6..-4.9 | -1200..-0 | basin-ends, basin-shell, bedding-lined, channel, clapper, grate, grate-screen, jamb-parge, jz-bedding, liner, liner-edge-curb, pavers-lined, rill-walls | R5 P1 |
| liner | 1.0 mm HDPE liner between 407 g/m² geotextiles; underdrain trench; cut-off at 1.89 m | water | M | -1887.5..-171.5 | -326.6..-66.0 | -0..1800 | base-lined, bedding-lined, channel, haunch, jz-base, jz-bedding, jz-pavers, liner-edge-curb, pavers-lined, perim-geotextile, perim-rock, subgrade, subgrade-jz | 08b M; R2 N2; R2 N4; R4 |
| liner-edge-curb | Reclaimed granite curbstone on edge 150, at the liner cut-off | ground | M | -2043.5..-1887.5 | -337.2..-34.6 | -1200..1800 | base-t, bedding-t, clapper, jz-base, jz-bedding, jz-pavers, liner, pavers-lined, pavers-t, rill-floor, rill-walls, root-barrier-liner, subgrade, subgrade-far, subgrade-jz | R3 F7; R5 N8 |
| lintel | Steel W250x39 lintel (engineer: ≤ 3 mm incl. creep) | metal | H | 26.0..154.0 | 2770.0..3022.0 | -1200..1800 | bay-insul, blocking, lintel-infill, lintel-infill-2, packer | R1 F7; R5 F3 |
| lintel-gyp | Gypsum board 12.7 on the lintel interior face | frame | H | 155.0..167.7 | 2742.5..3022.0 | -1200..1800 | bay-insul, ceiling, packer | R1 F15 |
| lintel-infill | Stone-wool infill between the lintel flanges | thermal | H | 93.2..154.0 | 2782.5..3009.5 | -1200..1800 | lintel | R1 F15 |
| lintel-infill-2 | Stone-wool infill between the lintel flanges | thermal | H | 26.0..86.8 | 2782.5..3009.5 | -1200..1800 | head-membrane, lintel | R1 F15 |
| membrane-roof | 2-ply SBS, herbicide-free root-resistant cap | water | R | -657.0..2500.0 | 3200.0..3497.0 | -1200..1700 | box-gutter, cant, coverboard, edge-metal, edge-nailer, gr-edge-profile, gravel-edge, roofins-1, sub-fascia | 09 d; R4 |
| membrane-top | Air/water membrane on blocking face to the deck pre-strip (bays) | air | R | 24.5..25.0 | 3022.0..3257.0 | -1200..1800 | blocking, deck, head-membrane, joists | 06 B21 |
| nosing | Bevelled sill nosing 1:2, +5 to −6 | metal | T | -26.0..0.0 | -20.0..5.0 | -0..1800 | grate-seat, jamb-stem, plinth-insul, track | 11 §3.1; R1 F13 |
| packer | PT packer bolted to the lintel flange | frame | H | 25.0..155.0 | 2742.5..2770.0 | -1200..1800 | head-membrane, lintel, lintel-gyp | 11 H3 |
| pan | Welded stainless sill pan 0.8, floor 6 %, nose dropping into the channel | water | T | -38.4..231.0 | -103.0..-66.5 | -0..1800 | grout, jamb-stem, pan-back, pan-skirt, plinth-insul, wedge | R1 F1; 11 T6; LOE-INST |
| pan-back | Pan back leg (welded), butyl-taped 100+ to the soil-gas poly | water | T | 231.0..231.8 | -110.0..-15.0 | -0..1800 | course, edge-seal, grout, jamb-stem, pan, pan-skirt, sill-apron, sill-foil, soilgas, wedge | R1 table; R2 3 |
| pan-skirt | Self-adhered skirt under the pan, down the board face, lapped 100 over the damp-proofing | water | T | -21.5..231.0 | -293.0..-67.3 | -0..1800 | beam, course, dampproof, jamb-stem, pan, pan-back, wedge | R1 F1; R2 3 |
| pavers-lined | Reclaimed granite planks 60 (150 wide, random 300–900, coursed parallel to the glass), joints 6, BPN ≥ 55 | ground | M | -1887.5..-171.5 | -94.6..-6.0 | -0..1800 | bedding-lined, channel, jz-pavers, liner, liner-edge-curb, person-wheelchair | 08b M12; R5 P1; R4 P3 |
| pavers-t | Reclaimed granite planks 80, coursed parallel to the glass | ground | P | -3291.5..-2043.5 | -138.0..-37.2 | -1200..1800 | bedding-t, clapper, edge-restraint, liner-edge-curb, person-terrace, rill-walls | R4 P3; R5 P1; 08 H7 |
| perim-drain | Perforated HDPE drain 100 at the footing base (invert −526, cover 152), own solid outlet to the storm sump | drainage | E | -240.0..-130.0 | -530.0..-420.0 | -1200..1800 | perim-geotextile, perim-geotextile-jz, perim-rock, perim-rock-jz | R2 2; R2 N5; VBBL 9.14.2.1; 07 E8 |
| perim-geotextile | Nonwoven geotextile wrapping the drain envelope | drainage | E | -400.5..-97.0 | -530.5..-271.8 | -0..1800 | beam-insul, jz-base, liner, perim-drain, perim-geotextile-jz, perim-rock, perim-rock-jz, subgrade, subgrade-jz | 07 E9 |
| perim-geotextile-jz | Nonwoven geotextile wrapping the drain envelope (jamb) | drainage | E | -400.5..-97.0 | -530.5..-289.8 | -1200..-0 | beam-insul, jz-base, perim-drain, perim-geotextile, perim-rock, perim-rock-jz, subgrade, subgrade-jz | 07 E9 |
| perim-rock | Clear crushed drain stone envelope (19 mm, ≤ 10 % passing 4 mm) | drainage | E | -400.0..-97.0 | -530.0..-193.0 | -0..1800 | beam-insul, haunch, jamb-parge, jz-base, liner, perim-drain, perim-geotextile, perim-geotextile-jz, perim-rock-jz, plinth-insul, subgrade, subgrade-jz | R2 2; R2 N5; 07 E9 |
| perim-rock-jz | Drain stone envelope in front of the jamb wall | drainage | E | -400.0..-97.0 | -530.0..-284.8 | -1200..0 | beam-insul, channel-pipe, jamb-parge, jz-base, perim-drain, perim-geotextile, perim-geotextile-jz, perim-rock, subgrade, subgrade-jz | R2 N5; 07 E9 |
| person-inside | Occupant standing inside (proxy) | furniture | K | 920.0..1280.0 | 0.0..1700.0 | 520..880 | slab | 08 K |
| person-terrace | Person on the terrace (proxy) | furniture | K | -2830.0..-2470.0 | -49.3..1652.7 | 1120..1480 | pavers-t | 08 K |
| person-wheelchair | Wheelchair user on the landing, eye 1250 (proxy, R3 F21) | furniture | K | -1350.0..-650.0 | -21.8..1230.2 | 650..1350 | pavers-lined | 08 K12; R3 F21 |
| pit-link | Clear-stone link in geotextile from the pit floor to the garden rock (no pipe) | drainage | I | -5150.0..-4900.0 | -1140.0..-1080.0 | 400..1400 | rg-choker, rg-rock, subgrade-far, tree-pit | R3 N6 |
| plinth-insul | Graphite EPS on the jamb stem (WIP) | thermal | Z | -97.0..-22.0 | -193.0..262.0 | -1200..-0 | beam-insul, channel, grate, grate-screen, grate-seat, haunch, jamb-parge, nosing, pan, perim-rock | massing |
| rg-apron | Cobble forebay 100 below the lip (the lip drops a sheet onto it; sediment collects here) | drainage | J | -6007.2..-5407.2 | -607.7..-307.7 | -700..-200 | rg-medium | R3 P2; 08 J11 |
| rg-choker | Choker layer 100 | drainage | J | -7909.0..-5150.0 | -1100.0..-1000.0 | -1200..1800 | pit-link, rg-medium, rg-riser, rg-rock, subgrade-far | 08 J |
| rg-medium | Bioretention medium 450 (≥ 70 mm/h), planted 3:1 slopes | ground | J | -7909.0..-5150.0 | -1000.0..-122.0 | -1200..1800 | bed-mulch, bed-soil, rg-apron, rg-choker, rg-mulch, rg-plant-1, rg-plant-3, rg-riser, runnel-floor, runnel-strip, runnel-walls, subgrade-far | 08 J |
| rg-mulch | Stone mulch 75 on the garden floor | ground | J | -7009.0..-6209.0 | -550.0..-475.0 | -1200..1800 | rg-medium, rg-plant-2, rg-riser | 08 J; R3 F5 |
| rg-plant-1 | Slough sedge (wet slope) (proxy) | planting | J | -6100.0..-5500.0 | -358.7..361.3 | 900..1500 | rg-medium | R3 F6; R3 N7 |
| rg-plant-2 | Common rush (garden floor) (proxy) | planting | J | -6900.0..-6300.0 | -495.0..225.0 | -0..600 | rg-mulch | R3 F6; R3 N7 |
| rg-plant-3 | Pacific ninebark (upper far slope) (proxy) | planting | J | -8000.0..-7400.0 | -264.7..455.3 | 900..1500 | rg-medium | R3 F6; R3 N7 |
| rg-riser | HDPE overflow riser 200, beehive grate at the crest, sealed base below the subdrain | drainage | J | -6714.0..-6504.0 | -1305.0..-275.0 | 795..1005 | rg-choker, rg-medium, rg-mulch, rg-rock, rg-subdrain | 08 J; R3 F5; R2 N4; VBBL Book II 2.4.2.5 |
| rg-rock | Clear rock reservoir 300 | drainage | J | -7909.0..-5150.0 | -1400.0..-1100.0 | -1200..1800 | pit-link, rg-choker, rg-riser, rg-subdrain, subgrade-far | 08 J |
| rg-subdrain | Perforated HDPE subdrain 150 near the top of the rock | drainage | J | -6689.0..-6529.0 | -1265.0..-1105.0 | -1200..1800 | rg-riser, rg-rock | R3 F3; R2 N4 |
| rill-floor | Rill floor, stone-faced precast U-trough 50 (sealed, gasketed joints) | drainage | J | -3441.5..-1100.0 | -218.4..-145.0 | -585..-315 | base-t, basin-shell, bed-mulch, bed-soil, bedding-t, edge-restraint, jz-base, jz-bedding, liner-edge-curb, rill-walls, runnel-floor, runnel-strip, runnel-walls | R2 N1; R2 N2; R3 P1 |
| rill-walls | Rill walls, flush with the paving (open water, moss patina) | drainage | J | -3441.5..-1100.0 | -168.4..-21.5 | -585..-315 | basin-shell, bed-mulch, bedding-t, clapper, edge-restraint, jz-bedding, jz-pavers, liner-edge-curb, pavers-t, rill-floor, runnel-floor, runnel-walls | R3 P1; R5 P2 |
| roofins-1 | Low-GWP polyiso 75 | thermal | R | -100.0..2500.0 | 3276.0..3351.0 | -1200..1400 | avb, edge-nailer, membrane-roof, roofins-2 | 09 d |
| roofins-2 | Low-GWP polyiso tapered, 2 % to the edge | thermal | R | -100.0..2500.0 | 3351.0..3478.0 | -1200..1300 | coverboard, edge-nailer, roofins-1 | 09 d |
| root-barrier-edge | Ribbed HDPE root barrier under the path edge, top cast 20 into the curbstone, to −700 | planting | P | -3367.5..-3365.5 | -700.0..-338.0 | -1200..1800 | edge-restraint, subgrade-far | R3 F7; 08 I2 |
| root-barrier-liner | Ribbed HDPE root barrier, top cast 20 into the curb, to −700 | planting | M | -1966.5..-1964.5 | -700.0..-315.9 | -1200..1800 | liner-edge-curb, subgrade-far | 08b M16; R3 F7 |
| runnel-floor | Runnel floor 50, 2 %, granite lip at the garden (67 above the crest) | drainage | J | -5407.2..-3441.5 | -257.7..-168.4 | -585..-315 | bed-mulch, bed-soil, edge-restraint, rg-medium, rill-floor, rill-walls, runnel-strip, runnel-walls | R2 N1; R3 N1; 08 J11 |
| runnel-strip | Compacted 19 mm crushed-rock strip 300 under the runnel, to the bed subgrade (no settlement) | drainage | J | -5150.0..-3441.5 | -647.0..-218.4 | -600..-300 | bed-soil, edge-restraint, rg-medium, rill-floor, runnel-floor, subgrade-far | R2 N1 |
| runnel-walls | Runnel walls, top at the bed and slope surface | drainage | J | -5407.2..-3441.5 | -207.7..-108.0 | -585..-315 | bed-mulch, bed-soil, edge-restraint, rg-medium, rill-floor, rill-walls, runnel-floor | R2 N1 |
| sash | Lift-and-slide sash, bottom rail (fibreglass) | frame | T | 15.0..85.0 | 10.0..120.0 | -0..1800 | glass-1, glass-2, glass-3, jamb-stem, track-rails | 11 R1 |
| sash-top | Sash top rail | frame | H | 15.0..85.0 | 2600.0..2690.0 | -0..1800 | glass-1, glass-2, glass-3, head-track | 11 R1 |
| sedum | Biodiverse sedum and native forb mat | planting | R | 401.5..2500.0 | 3566.6..3647.0 | -1200..1400 | growing-medium | 09 d; 08 L |
| sill-apron | Stone apron over the slot back | concrete | T | 181.0..231.0 | -20.0..0.0 | -0..1800 | jamb-stem, pan-back, sill-foil | R1 table |
| sill-foil | EPDM sill foil, track to back dam (air seal) | air | T | 180.0..231.0 | -45.0..-2.0 | -0..1800 | grout, jamb-stem, pan-back, sill-apron, track | R1 F2 |
| slab | Low-carbon concrete slab 100, ground/polished finish (mineral floor at the sill) | concrete | F | 257.3..2500.0 | -100.0..0.0 | -1200..1800 | person-inside, soilgas | 12 build-up; 11 T20 |
| slot-edge | Expanded cork slab-edge strip 25 (VBBL 10.2.2.6 'around edge of slab') | thermal | F | 232.0..257.1 | -100.0..-15.0 | -0..1800 | edge-seal, soilgas | R1 F4; R2 P5 |
| soffit | Honey cedar soffit 19, raked 24°, open joints with mesh | cladding | R | -630.0..-144.6 | 2896.0..3132.9 | -1200..1600 | band-vent, joists, soffit-furring, sub-fascia | 06 B20; 10; R5 D2 |
| soffit-furring | Tapered PT furring under the joists (soffit drop at the wall) | frame | R | -380.9..-144.6 | 2916.8..3022.0 | -1140..1698 | joists, soffit | R5 D2 |
| soilgas | 0.25 mm soil-gas / air barrier, up the slot face, butyl-taped 100+ to the pan back leg | air | F | 231.8..2500.0 | -100.2..-15.0 | -1200..1800 | edge-seal, eps-2, pan-back, slab, slot-edge | 12 sealing; R1 table; R2 3 |
| stone | Clear stone 100, gas-permeable layer and capillary break | drainage | F | 231.0..2500.0 | -300.0..-200.2 | -1200..1800 | beam, eps-1, interior-subgrade | 12 build-up |
| sub-fascia | PT sub-fascia on the joist tips | frame | R | -650.0..-630.0 | 3086.0..3273.0 | -1200..1700 | avb, deck, gutter-skirt, joists, membrane-roof, soffit | R5 D1 |
| subgrade | Compacted subgrade / native soil (landing) | ground | E | -1887.5..231.0 | -1700.0..-271.8 | -0..1800 | beam, beam-insul, dampproof, interior-subgrade, jz-base, liner, liner-edge-curb, perim-geotextile, perim-geotextile-jz, perim-rock, perim-rock-jz, subgrade-far, subgrade-jz | 07 E1; 08 H |
| subgrade-far | Native soil beyond the cut-off | ground | E | -8000.0..-1887.5 | -1700.0..-165.0 | -1200..1800 | base-t, bed-soil, edge-restraint, liner-edge-curb, pit-link, rg-choker, rg-medium, rg-rock, root-barrier-edge, root-barrier-liner, runnel-strip, subgrade, subgrade-jz, tree-pit | 07 E1; 08 H |
| subgrade-jz | Compacted subgrade (jamb ground) | ground | E | -1887.5..231.0 | -1700.0..-289.8 | -1200..0 | base-lined, basin-ends, basin-shell, beam, beam-insul, dampproof, interior-subgrade, jz-base, liner, liner-edge-curb, perim-geotextile, perim-geotextile-jz, perim-rock, perim-rock-jz, subgrade, subgrade-far, underdrain-out | 07 E1 |
| track | Lift-and-slide sill/track, fibreglass with stainless rails, top +5, level ±1 mm | metal | T | 0.0..180.0 | -42.0..5.0 | -0..1800 | grout, jamb-stem, nosing, sill-foil, track-rails | 11 T11; R4 (no aluminium in the sill) |
| track-rails | Stainless running rails | metal | T | 40.0..46.0 | 5.0..10.0 | -0..1800 | jamb-stem, sash, track | R4 |
| track-weeps | Track drain tubes falling 2 % into the channel | water | T | -40.1..40.1 | -62.6..-49.0 | 294..1506 | grout | 11 T12; R1 F12 |
| tree | Small tree in the 1 m tree pit, 1.3 m from the runnel (proxy) | planting | I | -5700.0..-3100.0 | -190.9..4184.1 | -400..2200 | bed-mulch, bed-soil | 08 I; R3 F8 |
| tree-pit | Tree pit 1.0 x 1.0 m in plan, 1 m deep, floor falling 2 % to the garden, base scarified 300 | ground | I | -4900.0..-3900.0 | -1120.0..-636.8 | 400..1400 | bed-soil, pit-link, subgrade-far | R3 F8; R3 N6; R2 N9; 08 I1 |
| underdrain | Perforated HDPE underdrain 100 in the liner trench, 0.5 % to jamb A, cleanout at the high end | drainage | M | -1840.0..-1730.0 | -320.9..-201.9 | -0..1800 | base-lined, jz-base, underdrain-out | R2 N4; 08b M |
| underdrain-out | Solid HDPE outlet from the underdrain to its own storm-sump inlet with a backwater valve | drainage | M | -1840.0..-1730.0 | -326.9..-210.9 | -1200..0 | base-lined, jz-base, subgrade-jz, underdrain | R2 N4; Book II 2.4.5.3 via 08b |
| wedge | Mortar bed 10 to 25, 6 % outward | concrete | T | -20.0..231.0 | -93.0..-67.8 | -0..1800 | course, jamb-stem, pan, pan-back, pan-skirt | R1 table; R2 3 |

## Drawing notes

- **beam**: Part 4 engineered foundation (VBBL 9.15.4.6 does not bind it; the engineer documents that nothing moisture-sensitive sits within 150 of grade — R2). Underside 450+ below exterior grade; sill support level within 1 mm.
- **course**: PERINSUL SIB (North America) is veneer-only, 92 wide, not drillable (OC data sheet Jan 2023) — rejected. Engineer to confirm the board's compressive grade.
- **pan**: End dams 150+ up the jambs, welded; jamb membranes lap over them. Replaces the liquid pan (R1 F3).
- **stone**: Radon rough-in per VBBL 9.13.4.3: inlet near slab centre, pipe sealed at the barrier (outside this slice). Never linked to the perimeter drain.
- **soilgas**: Sequence: pan set and welded, slab poured, poly up the slot face and butyl-taped to the back leg (R2 slab-first order).
- **track**: Shims 25 (back) to 40 (front); anchored through the drillable PU board per maker; two sealant beads under the track.
- **glass-1**: Bird-safe: CSA A460 markers on the exterior surface (#1), 50 x 50 spacing (R3 F11).
- **door-verticals**: Counted per metre of a 4.8 m two-panel opening.
- **lintel**: Keeps the glass height; a glulam 175x456 alternative adds 190 to the band (R1 F7).
- **head-flashing**: Clips at 600 under the leg; end dams 25; fastened through the upstand above the water line.
- **joists**: Toe-nails and uplift ties per joist; green-roof load to be checked by the engineer (09).
- **box-gutter**: Brackets at 600 to the sub-fascia; outlet at the opening end into the rill head (rain chain); overflow scupper away from the door (R3).
- **liner**: Never pierced by surface water: the channel drains by its own solid pipe and the rill starts at jamb A outside the liner. w-end upturns wrap the channel end caps; the underdrain leaves through one welded boot in the w = 0 upturn (R2 N2, N4, N10).
- **underdrain**: R2 asked 1 %; 0.5 % fits the 30 mm trench over a 4.9 m run (INFERRED minimum for a perforated subdrain).
- **channel**: Opening width, 316 end caps flush with the reveal liners (R5 N3); bottom outlet near the jamb-A end to its own solid pipe (R2 N2, N3).
- **perim-drain**: Cleanouts at the corners; storm sump ≥ 750 deep with separate inlets for this drain and the underdrain (9.14.5 via 07 E10). Never linked to the channel, underdrain or sub-slab stone.
- **channel-pipe**: Channel catchment is the landing strip and glass wash only (roof water goes to the basin); 63 mm is INFERRED adequate — confirm with the channel maker.
- **basin-shell**: Inlet: the downspout from the roof above, spouting from the jamb-A wall. Overflow over the rim onto paving that falls away from the wall.
- **rg-riser**: Outlet to the tank / storm at invert ≤ PONDB − 785 with a backflow flap; 1 m spillway notch in the far rim at crest + 45 (outside this slice).

## Spec parts missing from model

- none
