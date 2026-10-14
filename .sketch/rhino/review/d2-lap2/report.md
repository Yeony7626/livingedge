# Review packet

Spec: C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\detail02.json
Version: d2v2

## Floating parts (touch nothing)
- none

## Clashes (overlap > 1 mm3, not declared in `embeds`)
- none

## Parts

| id | name | role | junction | x | y | w | touches | src |
|---|---|---|---|---|---|---|---|---|
| avb | Self-adhered air/vapour control layer on deck (pre-strip at wall line) | air | R | -630.0..2500.0 | 3273.0..3276.0 | -0..1800 | cant, deck, edge-nailer, roofins-1, sub-fascia | 06 B8; 06 B9 |
| band-cedar | One course of WRC channel siding (one face, no ripped course) | cladding | H | -144.6..-125.6 | 2752.0..2875.0 | -0..1300 | band-strap, band-vent | 09 W1; R5 D2 |
| band-closure | PT cavity-top closure (cavity not open to the soffit space) | frame | H | -125.6..-106.6 | 2896.0..2934.0 | -0..1400 | band-ei, band-strap, band-vent, band-windbarrier | 06 B22 |
| band-ei | Stone-wool board 130 on lintel face, up to the joists | thermal | H | -106.6..23.4 | 2748.0..3022.0 | -0..1500 | band-closure, band-screen, band-strap, band-windbarrier, ei-top, head-flashing, head-stripin | R1 F6; R1 F8 |
| band-screen | Black stainless insect screen ≤ 2 mm at the cavity base | metal | H | -125.6..-106.6 | 2749.5..2750.0 | -0..1400 | band-ei, band-strap | 08 L |
| band-strap | PT strapping 19x64 | frame | H | -125.6..-106.6 | 2750.0..2896.0 | 47..1311 | band-cedar, band-closure, band-ei, band-screen, band-vent | 06 A13 |
| band-vent | 21 mm black-mesh vent slot at the band top | metal | H | -145.1..-125.6 | 2875.0..2896.0 | -0..1400 | band-cedar, band-closure, band-strap, soffit | R5 D2 |
| band-windbarrier | Vapour-open wind barrier on the stone wool above the closure | air | H | -107.1..-106.6 | 2934.0..3022.0 | -0..1500 | band-closure, band-ei, ei-top | ABC 11 |
| base-1 | No. 57 base 150 on compacted subgrade (infiltrating) | drainage | P | -2250.0..-1852.0 | -320.6..-164.0 | -0..1800 | base-2, bedding-1, bedding-2, pocket-curb, subgrade | 08 H |
| base-2 | No. 57 base 150 on compacted subgrade (infiltrating) | drainage | P | -3250.0..-2250.0 | -337.3..-170.6 | 1100..1800 | base-1, bedding-1, bedding-2, edge-restraint, pocket-curb, pocket-curb-w, root-barrier-pocket, subgrade | 08 H |
| base-lined | No. 57 open-graded base 150 on the liner | drainage | M | -1848.0..-173.5 | -293.9..-116.0 | -0..1800 | bedding-lined, liner, rill-floor, rill-walls, underdrain | 08 H |
| bay-insul | Stone-wool fill over the lintel (air tie by membranes, no spray foam) | thermal | R | 63.0..185.0 | 3022.0..3257.0 | -0..1800 | blocking, ceiling, deck, joists, lintel, lintel-gyp | R4 (spray foam out) |
| beam | Engineered reinforced grade beam + footing under the opening (Part 4) | concrete | T | -120.0..331.0 | -470.0..-193.0 | -0..1800 | beam-insul, course, dampproof, interior-subgrade, pan-skirt, perim-geotextile, perim-rock, stone, subgrade | 12 foundation; 11 T1; R1 table; R2 VBBL 9.15.4.6 ruling |
| beam-insul | Graphite EPS Type 3 75 on beam face (drained by the perimeter drain) | thermal | T | -97.0..-22.0 | -320.0..-193.0 | -0..1800 | beam, haunch, perim-rock | 11 T2; R2 P4; R4 |
| bed-mulch | Wood-chip mulch 75, leaf litter left | ground | I | -5150.0..-3400.0 | -197.0..-107.3 | -0..1760 | bed-soil, edge-restraint, pocket-soil, rg-apron, rg-medium, rill-floor, rill-walls, runnel-walls, tree | 08 I |
| bed-soil | Planting bed medium 450, tree pit 1000 deep (R3 F8) | ground | I | -5150.0..-3400.0 | -1119.9..-182.3 | -0..1800 | bed-mulch, edge-restraint, pocket-soil, rg-apron, rg-medium, root-barrier-path, runnel-floor, runnel-walls, subgrade, tree | 08 I; R3 F8 |
| bedding-1 | No. 8 bedding 50 | drainage | P | -2250.0..-1852.0 | -170.6..-114.0 | -0..1800 | base-1, base-2, bedding-2, pavers-1, pavers-2, pocket-curb, rill-floor, rill-walls | 08 H |
| bedding-2 | No. 8 bedding 50 | drainage | P | -3250.0..-2250.0 | -187.3..-120.6 | 1100..1800 | base-1, base-2, bedding-1, edge-restraint, pavers-1, pavers-2, pocket-curb, pocket-curb-w, rill-floor, rill-walls | 08 H |
| bedding-lined | No. 8 open-graded bedding 50 | drainage | M | -1848.0..-173.5 | -143.9..-66.0 | -0..1800 | base-lined, liner, pavers-lined, rill-floor, rill-walls | 08 H |
| blocking | Full-depth blocking at the wall line, caulked 4 sides | frame | R | 25.0..63.0 | 3022.0..3257.0 | -0..1800 | bay-insul, deck, head-membrane, joists, lintel, membrane-top | 06 B4 |
| box-gutter | Charcoal box gutter, front face 236 deep (edge band) | water | R | -735.0..-657.0 | 3124.7..3322.3 | -0..1800 | gutter-skirt, membrane-roof | R5 D1; 08 J |
| cant | Cold overhang: PT firring + 12 ply, falling 26 % | frame | R | -650.0..-140.0 | 3276.0..3438.0 | -0..1600 | avb, edge-metal, edge-nailer, membrane-roof | R5 D1 |
| ceiling | Gypsum ceiling 12.7 (no ceiling poly: exterior-insulated roof) | frame | R | 167.7..2500.0 | 3009.3..3022.0 | -0..1800 | bay-insul, joists, lintel-gyp | ABC 16 |
| channel | Polymer-concrete trench channel, house wall top −92 (pan nose drains in), grate rebate | drainage | T | -171.5..-21.5 | -130.0..-6.0 | -0..1800 | grate, grate-screen, haunch, liner, pavers-lined, rill-floor, rill-grate, rill-walls | 11 T16; R1 F1; R4 |
| course | Structural PU thermal-break board 251 x 100 (Armatherm 500 class), drillable | thermal | T | -20.0..231.0 | -193.0..-93.0 | -0..1800 | beam, pan-back, pan-skirt, wedge | R1 F9 (b); 12 R; 11 T9 |
| coverboard | Cover board 12 | frame | R | -100.0..2500.0 | 3426.0..3490.0 | -0..1200 | edge-nailer, membrane-roof, roofins-2 | 06 B12 |
| dampproof | Water-based damp-proofing on beam face (EPS-compatible) | water | T | -21.0..-20.0 | -320.0..-195.0 | -0..1800 | beam, pan-skirt | 07 E6; ABC loop2 N10 |
| deck | Plywood roof deck 16 | frame | R | -630.0..2500.0 | 3257.0..3273.0 | -0..1800 | avb, bay-insul, blocking, ei-top, joists, membrane-top, sub-fascia | 06 B7 |
| edge-metal | Charcoal drip edge into the box gutter, strip-in over the flange | water | R | -663.5..-561.8 | 3243.8..3336.2 | -0..1700 | cant, membrane-roof | 06 B15; R5 D1 |
| edge-nailer | PT nailer at the insulation edge | frame | R | -140.0..-100.0 | 3276.0..3438.0 | -0..1600 | avb, cant, coverboard, membrane-roof, roofins-1, roofins-2 | 06 B11 |
| edge-restraint | Cast-in-place concrete edge restraint (open at the pocket) | concrete | P | -3400.0..-3250.0 | -357.3..-57.3 | 1100..1800 | base-2, bed-mulch, bed-soil, bedding-2, pavers-2, pocket-curb-w, rill-floor, rill-grate, rill-walls, runnel-floor, runnel-walls, subgrade | 08 H |
| edge-seal | Flexible perimeter sealant over the slot edge | air | F | 231.8..257.1 | -15.0..0.0 | -0..1800 | pan-back, slot-edge, soilgas | R1 table; VBBL 9.25.3.6(5) |
| ei-top | Stone-wool board between joists (wall-line thermal continuity) | thermal | R | -106.6..23.4 | 3022.0..3257.0 | -0..1500 | band-ei, band-windbarrier, deck, joists | 06 B6 |
| eps-1 | Graphite EPS Type 2, 50 (layer 1) | thermal | F | 232.1..2500.0 | -200.2..-150.2 | -0..1800 | eps-2, stone | 12 build-up |
| eps-2 | Graphite EPS Type 2, 50 (layer 2, joints staggered) | thermal | F | 232.1..2500.0 | -150.2..-100.2 | -0..1800 | eps-1, soilgas | 12 build-up |
| glass-1 | IGU pane 1 4 mm low-e, safety glass | cladding | T | 28.0..32.0 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| glass-2 | IGU centre lite 1.3 mm (thin-glass triple) | cladding | T | 49.3..50.7 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| glass-3 | IGU pane 3 4 mm low-e, safety glass | cladding | T | 68.0..72.0 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4; R4 thin-glass |
| gr-drain | Granular pumice drainage layer 30 (no plastic board) | drainage | R | 401.5..2500.0 | 3456.6..3528.6 | -0..1600 | gr-edge-profile, growing-medium | R4 |
| gr-edge-profile | Perforated green-roof edge profile | metal | R | 400.0..460.0 | 3455.0..3555.0 | -0..1700 | gr-drain, gravel-edge, growing-medium, membrane-roof | 09 d |
| grate | Stainless 316 heel-safe grate, slots ≤ 6.5 mm parallel to the door, top −6 | metal | T | -165.5..-31.5 | -26.0..-6.0 | -0..1800 | channel, grate-screen, grate-seat | 08b M; B651 4.3.4; R1 table |
| grate-screen | Dirt screen 1.0–1.2 mm under the grate | metal | T | -161.5..-40.0 | -26.5..-26.0 | -0..1800 | channel, grate, grate-seat | 11 T16 |
| grate-seat | Stainless grate seat hung from the nosing | metal | T | -40.0..-26.0 | -27.5..-8.0 | -0..1800 | grate, grate-screen, nosing | R1 F1; R1 F13 |
| gravel-edge | Washed gravel strip 500 x 60 at the roof edge (vegetation-free zone) | drainage | R | -98.0..400.0 | 3445.0..3515.0 | -0..1700 | gr-edge-profile, membrane-roof | 09 d |
| grout | Chloride-free grout under and behind the track (behind: to −21 only) | concrete | T | 0.0..231.0 | -80.4..-21.0 | -0..1800 | pan, pan-back, sill-foil, track, track-weeps | 11 T14; R1 table |
| growing-medium | Pumice-based extensive substrate 80 | ground | R | 401.5..2500.0 | 3486.6..3608.6 | -0..1500 | gr-drain, gr-edge-profile, sedum | R4; 09 d |
| gutter-skirt | Charcoal skirt below the gutter, closing to the sub-fascia | water | R | -735.0..-650.0 | 3086.0..3124.7 | -0..1800 | box-gutter, sub-fascia | R5 D1 |
| haunch | Concrete haunch under the channel, on the beam insulation and the drain stone | concrete | T | -171.5..-22.0 | -193.0..-130.0 | -0..1800 | beam-insul, channel, liner, perim-rock, rill-floor, rill-walls | R1 table; R2 9 |
| head-airseal | Interior backer + sealant, frame to packer | air | H | 170.0..180.0 | 2730.0..2742.5 | -0..1800 | head-tape, head-track | R1 F5; 11 H7 |
| head-flashing | Head flashing 24 ga charcoal, 6 % fall, hemmed stiffener, drip 5 past cladding | water | H | -154.8..24.5 | 2730.4..2830.0 | -0..1800 | band-ei, head-membrane, head-stripin | 11 H10; R1 F10 |
| head-membrane | Head air/water membrane (vapour-open), packer face into rough head | air | H | 24.5..100.0 | 2742.0..3022.0 | -0..1800 | blocking, head-flashing, head-tape, lintel-infill-2, membrane-top, packer | 11 H4; R1 F16 |
| head-stripin | Self-adhered strip-in lapping 70 over the flashing upstand | water | H | 23.4..23.9 | 2760.0..2900.0 | -0..1800 | band-ei, head-flashing | 11 H4 |
| head-tape | Three-zone pre-compressed tape in the head gap | air | H | 0.0..170.0 | 2730.0..2742.0 | -0..1800 | head-airseal, head-membrane, head-track | R1 F5 |
| head-track | Head track / head jamb | frame | H | 0.0..180.0 | 2690.0..2730.0 | -0..1800 | head-airseal, head-tape, sash-top | 11 H5 |
| interior-subgrade | Compacted subgrade under the slab | ground | F | 331.0..2500.0 | -1700.0..-300.0 | -0..1800 | beam, stone, subgrade | 12 |
| joists | Roof joists 38x235, tapered over the overhang to about 125 at the tip | frame | R | -630.0..2500.0 | 3022.0..3257.0 | 60..1698 | bay-insul, blocking, ceiling, deck, ei-top, membrane-top, soffit, soffit-furring, sub-fascia | 06 B3; R5 D1 |
| liner | 1.0 mm HDPE liner between 407 g/m² geotextiles, turned up at the channel, cut-off at 1.85 m | water | M | -1850.0..-171.5 | -296.0..-66.0 | -0..1800 | base-lined, bedding-lined, channel, haunch, pavers-lined, perim-geotextile, perim-rock, rill-floor, rill-walls, subgrade | 08b M; R4 |
| lintel | Steel W250x39 lintel (engineer: ≤ 3 mm incl. creep) | metal | H | 26.0..154.0 | 2770.0..3022.0 | -0..1800 | bay-insul, blocking, lintel-infill, lintel-infill-2, packer | R1 F7; R5 F3 |
| lintel-gyp | Gypsum board 12.7 on the lintel interior face | frame | H | 155.0..167.7 | 2742.5..3022.0 | -0..1800 | bay-insul, ceiling, packer | R1 F15 |
| lintel-infill | Stone-wool infill between the lintel flanges | thermal | H | 93.2..154.0 | 2782.5..3009.5 | -0..1800 | lintel | R1 F15 |
| lintel-infill-2 | Stone-wool infill between the lintel flanges | thermal | H | 26.0..86.8 | 2782.5..3009.5 | -0..1800 | head-membrane, lintel | R1 F15 |
| membrane-roof | 2-ply SBS, herbicide-free root-resistant cap | water | R | -657.0..2500.0 | 3200.0..3497.0 | -0..1700 | box-gutter, cant, coverboard, edge-metal, edge-nailer, gr-edge-profile, gravel-edge, roofins-1, sub-fascia | 09 d; R4 |
| membrane-top | Air/water membrane on blocking face to the deck pre-strip (bays) | air | R | 24.5..25.0 | 3022.0..3257.0 | -0..1800 | blocking, deck, head-membrane, joists | 06 B21 |
| nosing | Bevelled sill nosing 1:2, +5 to −6 | metal | T | -26.0..0.0 | -20.0..5.0 | -0..1800 | grate-seat, track | 11 §3.1; R1 F13 |
| packer | PT packer bolted to the lintel flange | frame | H | 25.0..155.0 | 2742.5..2770.0 | -0..1800 | head-membrane, lintel, lintel-gyp | 11 H3 |
| pan | Welded stainless sill pan 0.8, floor 6 %, nose dropping into the channel | water | T | -38.4..231.0 | -103.0..-66.5 | -0..1800 | grout, pan-back, pan-skirt, wedge | R1 F1; 11 T6; LOE-INST |
| pan-back | Pan back leg (welded), butyl-taped 100+ to the soil-gas poly | water | T | 231.0..231.8 | -110.0..-15.0 | -0..1800 | course, edge-seal, grout, pan, pan-skirt, sill-apron, sill-foil, soilgas, wedge | R1 table; R2 3 |
| pan-skirt | Self-adhered skirt under the pan, down the board face, lapped 100 over the damp-proofing | water | T | -21.5..231.0 | -293.0..-67.3 | -0..1800 | beam, course, dampproof, pan, pan-back, wedge | R1 F1; R2 3 |
| pavers-1 | Reclaimed granite planks 80 (sawn, warm grey) | ground | P | -2250.0..-1852.0 | -120.6..-34.0 | -0..1800 | bedding-1, bedding-2, pavers-2, pavers-lined, pocket-curb, rill-grate, rill-walls | R4; 08 H7 |
| pavers-2 | Reclaimed granite planks 80 (sawn, warm grey) | ground | P | -3250.0..-2250.0 | -137.3..-40.6 | 1100..1800 | bedding-1, bedding-2, edge-restraint, pavers-1, pocket-curb, pocket-curb-w, rill-grate, rill-walls | R4; 08 H7 |
| pavers-lined | Low-carbon concrete plank pavers 60 (150x450, warm grey), joints ≤ 6 mm, BPN ≥ 55 | ground | M | -1852.0..-171.5 | -94.0..-6.0 | -0..1800 | bedding-lined, channel, liner, pavers-1, person-terrace, rill-grate, rill-walls | 08b M; R4; R5 |
| perim-drain | Perforated drain 100, invert at the footing underside, own solid outlet to the storm sump | drainage | E | -240.0..-130.0 | -470.0..-360.0 | -0..1800 | perim-geotextile, perim-rock | R2 2; VBBL 9.14.2.1; 07 E8 |
| perim-geotextile | Nonwoven geotextile wrapping the drain envelope | drainage | E | -400.5..-120.0 | -470.5..-271.8 | -0..1800 | beam, liner, perim-drain, perim-rock, subgrade | 07 E9 |
| perim-rock | Clear crushed drain stone envelope (19 mm, ≤ 10 % passing 4 mm) | drainage | E | -400.0..-97.0 | -470.0..-193.0 | -0..1800 | beam, beam-insul, haunch, liner, perim-drain, perim-geotextile, subgrade | R2 2; 07 E9 |
| person-inside | Occupant standing inside (proxy) | furniture | K | 920.0..1280.0 | 0.0..1700.0 | 520..880 | slab | 08 K |
| person-terrace | Person on the landing (proxy) | furniture | K | -1480.0..-1120.0 | -21.8..1678.2 | 920..1280 | pavers-lined | 08 K |
| pocket-curb | Flush concrete curb, house side of the pocket | concrete | M | -2350.0..-2250.0 | -322.3..-40.6 | -0..1100 | base-1, base-2, bedding-1, bedding-2, pavers-1, pavers-2, pocket-curb-w, pocket-soil, root-barrier-pocket, subgrade | 08b M |
| pocket-curb-w | Flush concrete curb, terrace side of the pocket | concrete | M | -3250.0..-2350.0 | -337.3..-42.3 | 1000..1100 | base-2, bedding-2, edge-restraint, pavers-2, pocket-curb, pocket-soil, subgrade | 08b M |
| pocket-soil | Growing medium 600 in the pocket, open to the bed | ground | M | -3400.0..-2350.0 | -707.3..-92.3 | -0..1000 | bed-mulch, bed-soil, pocket-curb, pocket-curb-w, shrub, subgrade | 08b M; R3 F10 |
| rg-apron | Cobble apron at the runnel outfall (inner slope) | drainage | J | -5750.0..-5150.0 | -402.0..-122.0 | 1440..1800 | bed-mulch, bed-soil, rg-medium, runnel-walls | R3 F4 |
| rg-choker | Choker layer 100 | drainage | J | -7834.0..-5150.0 | -1075.0..-975.0 | -0..1800 | rg-medium, rg-riser, rg-rock, subgrade | 08 J |
| rg-medium | Bioretention medium 450 (≥ 70 mm/h), planted 3:1 slopes | ground | J | -7834.0..-5150.0 | -975.0..-122.0 | -0..1800 | bed-mulch, bed-soil, rg-apron, rg-choker, rg-mulch, rg-plant-1, rg-plant-3, rg-riser, runnel-floor, runnel-walls, subgrade | 08 J |
| rg-mulch | Stone mulch 75 on the garden floor (wood mulch floats) | ground | J | -6934.0..-6134.0 | -525.0..-450.0 | -0..1800 | rg-medium, rg-plant-2, rg-riser | 08 J; R3 F5 |
| rg-plant-1 | Slough sedge (wet slope) (proxy) | planting | J | -5900.0..-5300.0 | -292.0..428.0 | 100..700 | rg-medium | R3 F6 |
| rg-plant-2 | Common rush (garden floor) (proxy) | planting | J | -6700.0..-6100.0 | -470.0..250.0 | -100..500 | rg-mulch | R3 F6 |
| rg-plant-3 | Pacific ninebark (upper far slope) (proxy) | planting | J | -7600.0..-7000.0 | -348.0..372.0 | 700..1300 | rg-medium | R3 F6 |
| rg-riser | Overflow riser 200 with beehive grate at the crest, to tank and storm | drainage | J | -6639.0..-6429.0 | -1160.0..-250.0 | 795..1005 | rg-choker, rg-medium, rg-mulch, rg-rock, rg-subdrain | 08 J; R3 F5; VBBL Book II 2.4.2.5 |
| rg-rock | Clear rock reservoir 300 | drainage | J | -7834.0..-5150.0 | -1375.0..-1075.0 | -0..1800 | rg-choker, rg-riser, rg-subdrain, subgrade | 08 J |
| rg-subdrain | Perforated subdrain 150 near the TOP of the rock (infiltration below) | drainage | J | -6614.0..-6454.0 | -1240.0..-1080.0 | -0..1800 | rg-riser, rg-rock | R3 F3 |
| rill-floor | Rill trench floor | drainage | J | -3400.0..-171.5 | -172.3..-120.0 | 1590..1760 | base-lined, bed-mulch, bedding-1, bedding-2, bedding-lined, channel, edge-restraint, haunch, liner, rill-walls, runnel-walls | R2 P1 |
| rill-grate | Rill cover grate, heel-safe (B651 4.3.4, 8.2.4) | metal | J | -3400.0..-171.5 | -77.3..-6.0 | 1590..1760 | channel, edge-restraint, pavers-1, pavers-2, pavers-lined, rill-walls | R2 P1 |
| rill-walls | Rill trench walls (polymer concrete), 1 % fall | drainage | J | -3400.0..-171.5 | -172.3..-6.0 | 1580..1770 | base-lined, bed-mulch, bedding-1, bedding-2, bedding-lined, channel, edge-restraint, haunch, liner, pavers-1, pavers-2, pavers-lined, rill-floor, rill-grate, runnel-walls | R2 P1; R3 P2 |
| roofins-1 | Low-GWP polyiso 75 | thermal | R | -100.0..2500.0 | 3276.0..3351.0 | -0..1400 | avb, edge-nailer, membrane-roof, roofins-2 | 09 d |
| roofins-2 | Low-GWP polyiso tapered, 2 % to the edge | thermal | R | -100.0..2500.0 | 3351.0..3478.0 | -0..1300 | coverboard, edge-nailer, roofins-1 | 09 d |
| root-barrier-path | Ribbed HDPE root barrier 600 at the path edge | planting | I | -3404.0..-3402.0 | -784.3..-184.3 | 1100..1540 | bed-soil, runnel-walls, subgrade | 08 I |
| root-barrier-pocket | Ribbed HDPE root barrier 600 under the house-side curb | planting | M | -2301.0..-2299.0 | -921.5..-301.5 | -0..1100 | base-2, pocket-curb, subgrade | 08b M |
| runnel-floor | Stone runnel floor (sealed within 5 m) | drainage | J | -5150.0..-3400.0 | -272.0..-207.3 | 1590..1760 | bed-soil, edge-restraint, rg-medium, runnel-walls | R2 P1 |
| runnel-walls | Open mortared stone runnel walls, 150 x 100 | drainage | J | -5150.0..-3400.0 | -272.0..-107.3 | 1540..1800 | bed-mulch, bed-soil, edge-restraint, rg-apron, rg-medium, rill-floor, rill-walls, root-barrier-path, runnel-floor | R2 P1; R3 P2; 08 J16 |
| sash | Lift-and-slide sash, bottom rail (fibreglass) | frame | T | 15.0..85.0 | 10.0..120.0 | -0..1800 | glass-1, glass-2, glass-3, track-rails | 11 R1 |
| sash-top | Sash top rail | frame | H | 15.0..85.0 | 2600.0..2690.0 | -0..1800 | glass-1, glass-2, glass-3, head-track | 11 R1 |
| sedum | Biodiverse sedum and native forb mat | planting | R | 401.5..2500.0 | 3566.6..3647.0 | -0..1400 | growing-medium | 09 d; 08 L |
| shrub | Evergreen huckleberry, pruned 1.5 m, off the opening axis (proxy) | planting | M | -3350.0..-2250.0 | -119.8..1410.2 | -50..1050 | pocket-soil | 08b M; R5 F5 |
| sill-apron | Stone apron over the slot back | concrete | T | 181.0..231.0 | -20.0..0.0 | -0..1800 | pan-back, sill-foil | R1 table |
| sill-foil | EPDM sill foil, track to back dam (air seal) | air | T | 180.0..231.0 | -45.0..-2.0 | -0..1800 | grout, pan-back, sill-apron, track | R1 F2 |
| slab | Low-carbon concrete slab 100, ground/polished finish (mineral floor at the sill) | concrete | F | 257.3..2500.0 | -100.0..0.0 | -0..1800 | person-inside, soilgas | 12 build-up; 11 T20 |
| slot-edge | Expanded cork slab-edge strip 25 (VBBL 10.2.2.6 'around edge of slab') | thermal | F | 232.1..257.1 | -100.0..-15.0 | -0..1800 | edge-seal, soilgas | R1 F4; R2 P5 |
| soffit | Honey cedar soffit 19, raked 24°, open joints with mesh | cladding | R | -630.0..-144.6 | 2896.0..3132.9 | -0..1600 | band-vent, joists, soffit-furring, sub-fascia | 06 B20; 10; R5 D2 |
| soffit-furring | Tapered PT furring under the joists (soffit drop at the wall) | frame | R | -380.9..-144.6 | 2916.8..3022.0 | 60..1698 | joists, soffit | R5 D2 |
| soilgas | 0.25 mm soil-gas / air barrier, up the slot face, butyl-taped 100+ to the pan back leg | air | F | 231.8..2500.0 | -100.2..-15.0 | -0..1800 | edge-seal, eps-2, pan-back, slab, slot-edge | 12 sealing; R1 table; R2 3 |
| stone | Clear stone 100, gas-permeable layer and capillary break | drainage | F | 231.0..2500.0 | -320.0..-200.2 | -0..1800 | beam, eps-1, interior-subgrade | 12 build-up |
| sub-fascia | PT sub-fascia on the joist tips | frame | R | -650.0..-630.0 | 3086.0..3273.0 | -0..1700 | avb, deck, gutter-skirt, joists, membrane-roof, soffit | R5 D1 |
| subgrade | Compacted subgrade / native soil | ground | E | -8000.0..331.0 | -1700.0..-140.0 | -0..1800 | base-1, base-2, beam, bed-soil, edge-restraint, interior-subgrade, liner, perim-geotextile, perim-rock, pocket-curb, pocket-curb-w, pocket-soil, rg-choker, rg-medium, rg-rock, root-barrier-path, root-barrier-pocket | 07 E1; 08 H |
| track | Lift-and-slide sill/track, fibreglass with stainless rails, top +5, level ±1 mm | metal | T | 0.0..180.0 | -42.0..5.0 | -0..1800 | grout, nosing, sill-foil, track-rails | 11 T11; R4 (no aluminium in the sill) |
| track-rails | Stainless running rails | metal | T | 40.0..46.0 | 5.0..10.0 | -0..1800 | sash, track | R4 |
| track-weeps | Track drain tubes falling 2 % into the channel | water | T | -40.1..40.1 | -62.6..-49.0 | 294..1506 | grout | 11 T12; R1 F12 |
| tree | Small tree (Amelanchier alnifolia) in a 1 m tree pit (proxy) | planting | I | -5700.0..-3100.0 | -190.7..4184.3 | -400..2200 | bed-mulch, bed-soil | 08 I; R3 F8 |
| underdrain | Perforated HDPE underdrain 100 on the liner floor, own outlet with backwater flap | drainage | M | -1840.0..-1730.0 | -290.9..-180.9 | -0..1800 | base-lined | R2 3; 08b M |
| wedge | Mortar bed 10 to 25, 6 % outward | concrete | T | -20.0..231.0 | -93.0..-67.8 | -0..1800 | course, pan, pan-back, pan-skirt | R1 table; R2 3 |

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
- **channel**: Full opening width + 150 each side; outlet at the opening end through a silt box into the rill (never the foundation drain).
- **liner**: Where the rill crosses the two upturns, prefabricated HDPE boots are extrusion-welded to the liner and clamped to the rill walls (liner continuous under the rill).
- **underdrain**: Falls 1 % along the wall to its own outlet; cleanout at the high end.
- **perim-drain**: About 70 mm cover under the landing liner (the liner is the cap) — alternative-solution detail (R2 2). Never linked to the channel, underdrain or sub-slab stone.
- **root-barrier-pocket**: Top edge cast 20 into the curb underside, so roots cannot pass between curb and barrier.
- **rill-grate**: The box gutter's downspout discharges into the rill head (rain chain); channel and rill form one sealed system to the garden.
- **root-barrier-path**: Butt-sealed to the runnel walls where the runnel crosses.
- **rg-riser**: Stone collar around the riser; backflow flap at the tank connection; 1 m spillway notch in the far rim at crest + 45 (R3 F2, outside this slice).

## Spec parts missing from model

- none
