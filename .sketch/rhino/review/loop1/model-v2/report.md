# Review packet

Spec: C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\detail01.json

## Floating parts (touch nothing)
- line-wire

## Clashes (overlap > 1 mm3, not declared in `embeds`)
- native x pier-base-1: 6283185 mm3
- native x pier-base-2: 6283185 mm3

## Parts

| id | name | role | junction | x | y | w | touches | src |
|---|---|---|---|---|---|---|---|---|
| abu-base-1 | Stainless standoff post base: base plate | metal | C | -893.0..-817.0 | 152.0..153.5 | 102..798 | abu-straps-1, anchor-washer-1, pier-1, pier-anchor-1 | 06 C5; ABC 22 |
| abu-base-2 | Stainless standoff post base: base plate | metal | C | -1153.0..-1077.0 | 152.0..153.5 | 102..798 | abu-straps-2, anchor-washer-2, pier-2, pier-anchor-2 | 06 C5; ABC 22 |
| abu-seat-1 | Standoff seat, 25 mm above concrete | metal | C | -900.0..-810.0 | 175.5..177.0 | 105..795 | abu-straps-1, post-1 | 06 C5 |
| abu-seat-2 | Standoff seat, 25 mm above concrete | metal | C | -1160.0..-1070.0 | 175.5..177.0 | 105..795 | abu-straps-2, post-2 | 06 C5 |
| abu-straps-1 | Standoff post base: side straps (12 ga) | metal | C | -893.0..-817.0 | 153.5..292.0 | 102..798 | abu-base-1, abu-seat-1, post-1, post-bolts-1-150, post-bolts-1-750 | 06 C5 |
| abu-straps-2 | Standoff post base: side straps (12 ga) | metal | C | -1153.0..-1077.0 | 153.5..292.0 | 102..798 | abu-base-2, abu-seat-2, post-2, post-bolts-2-150, post-bolts-2-750 | 06 C5 |
| anchor | Anchor bolt 12.7 HDG, embedded 100+ | metal | D | 63.7..76.3 | 200.0..362.0 | 694..706 | anchor-seal, batts, epdm, fwall, gasket, nut, sill, washer | 07 D2; 06 A8 |
| anchor-nut-1 | Stainless 5/8 nut on anchor | metal | C | -868.5..-841.5 | 156.5..170.5 | 136..764 | anchor-washer-1, pier-anchor-1 | ABC 20 |
| anchor-nut-2 | Stainless 5/8 nut on anchor | metal | C | -1128.5..-1101.5 | 156.5..170.5 | 136..764 | anchor-washer-2, pier-anchor-2 | ABC 20 |
| anchor-seal | Sealant collar where the bolt passes EPDM and gasket | air | D | 61.7..78.3 | 300.0..304.0 | 692..708 | anchor, epdm, fwall, gasket, sill | DEFG E6; ABC 17 |
| anchor-washer-1 | Stainless washer on anchor | metal | C | -877.0..-833.0 | 153.5..156.5 | 128..772 | abu-base-1, anchor-nut-1, pier-anchor-1 | ABC 20 |
| anchor-washer-2 | Stainless washer on anchor | metal | C | -1137.0..-1093.0 | 153.5..156.5 | 128..772 | abu-base-2, anchor-nut-2, pier-anchor-2 | ABC 20 |
| apron-1 | Oak apron 45x90, side-bolted to posts | furniture | C | -810.0..-765.0 | 285.0..375.0 | 90..810 | apron-bolts-1, post-1, post-cap-1, slat-1, slat-screws-1 | 06 C8 |
| apron-2 | Oak apron 45x90, side-bolted to posts | furniture | C | -1205.0..-1160.0 | 285.0..375.0 | 90..810 | apron-bolts-2, post-2, post-cap-2, slat-3, slat-screws-3 | 06 C8 |
| apron-bolts-1 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -900.0..-765.0 | 298.6..361.4 | 144..756 | apron-1, post-1, rail | 06 C7; 06 C8 |
| apron-bolts-2 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -1205.0..-1070.0 | 298.6..361.4 | 144..756 | apron-2, post-2, rail | 06 C7; 06 C8 |
| avb | Air/vapour control membrane on deck | air | B | -600.0..900.0 | 3351.0..3354.0 | -0..860 | deck, fascia-upper, nailer-1, nailer-screws--480, nailer-screws--580, prestrip, roofins-1 | 06 B9 |
| backfill | Free-draining backfill | ground | E | -1300.0..-63.0 | -450.0..-115.3 | -0..900 | edging, geo-gravel, geotextile, native, parging, pier-1, pier-2, topsoil | 07 E11 |
| basesheet | SBS base sheet, 52 down fascia face | water | B | -628.0..900.0 | 3464.0..3546.2 | -0..700 | capsheet, coverboard, edge-fasteners-a, edge-fasteners-b, edge-metal, fascia-upper, mastic, nailer-rip, roofins-2, stripin | 06 B13 |
| batts | Batt insulation | thermal | G | 0.0..140.0 | 342.0..3024.0 | -0..862 | anchor, plate1, sheath, sill, studs, washer | 07 G1 |
| bead-base | Zinc-alloy casing bead, 10+ above flashing, left open | metal | A | -108.8..-83.8 | 229.4..270.0 | -0..500 | paper, stucco | 06 A15a; ABC D2 |
| bead-top | Casing bead at stucco top | metal | B | -108.8..-83.8 | 2990.0..3020.6 | -0..500 | paper, screen-top, stucco | 06 B23 |
| blocking | Full-depth blocking, caulked 4 sides (air transfer + fire block) | frame | B | 0.0..38.0 | 3100.0..3335.0 | -0..862 | deck, foam, joists, plate2, sheath, sheath-top | 06 B4 |
| brace | Oak diagonal brace 45, post base to opposite rail end | furniture | C | -1070.0..-900.0 | 195.0..285.0 | 128..772 | brace-screws-1, brace-screws-2, post-1, post-2, rail | 06 C8; ABC 6 |
| brace-screws-1 | Stainless structural screw 8, post into brace | metal | C | -935.0..-830.0 | 231.0..239.0 | 146..754 | brace, post-1 | ABC 6 |
| brace-screws-2 | Stainless structural screw 8, post into brace | metal | C | -1140.0..-1035.0 | 246.0..254.0 | 146..754 | brace, post-2 | ABC 6 |
| capbreak | Capillary break coating on footing top, into keyway | water | E | -175.0..200.0 | -238.0..-199.0 | -0..900 | dampproof, fill, fnd-xps, footing, fwall, geotextile, rock | 07 E4 |
| capsheet | SBS cap sheet | water | B | -626.4..900.0 | 3520.3..3550.2 | -0..640 | basesheet, stripin | 06 B17 |
| ceiling | Gypsum ceiling 12.7 (no ceiling poly: roof is exterior-insulated) | frame | B | 153.9..900.0 | 3087.3..3100.0 | -0..900 | gypsum, joists | ABC 16 |
| cleat-screws | Cleat screws at 300 through fascia into nailer | metal | B | -625.6..-570.0 | 3437.8..3442.2 | 48..652 | edge-cleat, fascia-upper, nailer-3 | ABC 2 |
| closure | PT cavity-top closure (cavity not open to soffit) | frame | B | -82.1..-63.1 | 3043.0..3081.0 | -0..620 | closure-screws, ei, soffit-in, strap, windbarrier | 06 B22 |
| closure-screws | Closure screws through insulation into top plates | metal | B | -82.1..75.0 | 3059.0..3065.0 | 76..488 | closure, ei, membrane, membrane-lap, plate1, plate2, sheath | ABC 15 |
| coverboard | Cover board 12 | frame | B | -460.0..900.0 | 3504.0..3543.2 | -0..740 | basesheet, nailer-4, nailer-rip, roofins-2 | 06 B12 |
| dampproof | Damp-proofing (not code-required here, 9.13.2.1(1); best practice) | water | E | -1.0..0.0 | -199.0..224.7 | -0..900 | capbreak, fnd-xps, fwall, parging-anchors | 07 E6; DEFG 0 |
| deck | Plywood roof deck 16 | frame | B | -600.0..900.0 | 3335.0..3351.0 | -0..900 | avb, blocking, ei-top, fascia-lower, fascia-upper, foam, joists, membrane-top, nailer-screws--480, nailer-screws--580, prestrip, sheath-top, windbarrier | 06 B7 |
| drainpipe | Perforated PVC drain 100, invert at footing underside | drainage | E | -435.5..-325.5 | -454.0..-344.0 | -0..900 | rock | 07 E8 |
| edge-cap | Fibre-cement floor-edge cap 12, adhered (no fasteners through barrier) | frame | D | 154.0..295.0 | 301.4..313.4 | -0..900 | vpoly | DEFG E2 |
| edge-cleat | 24 ga continuous cleat engaging the drip | metal | B | -638.7..-625.0 | 3404.8..3460.0 | -0..700 | cleat-screws, edge-hem, edge-metal, fascia-screws-b, fascia-upper | ABC 2; RCABC P13 3.3(5) |
| edge-fasteners-a | Edge-metal fasteners, row 1 (203 o.c., staggered) | metal | B | -582.2..-577.8 | 3480.0..3520.6 | 48..661 | basesheet, edge-metal, mastic, nailer-4, nailer-rip, stripin | 06 B15 |
| edge-fasteners-b | Edge-metal fasteners, row 2 | metal | B | -542.2..-537.8 | 3480.0..3520.6 | 149..559 | basesheet, edge-metal, mastic, nailer-4, nailer-rip, stripin | 06 B15 |
| edge-hem | 12 mm hem of the edge metal, folded round the cleat tip | water | B | -639.7..-630.7 | 3402.9..3411.8 | -0..700 | edge-cleat | ABC 2; RCABC P13 3.2(2)(a) |
| edge-metal | 24 ga metal edge: 110 flange, face to 3416, 45 deg drip 12 off face | water | B | -640.5..-515.0 | 3403.8..3520.6 | -0..700 | basesheet, edge-cleat, edge-fasteners-a, edge-fasteners-b, mastic, nailer-3, stripin | 06 B15 |
| edge-xps | Slab-edge XPS 75 (thermal break, isolation joint) | thermal | D | 200.0..275.0 | 199.8..300.0 | -0..900 | fwall, soilgas, xps-b | 07 D7 |
| edging | Steel edging, top flush with grade | metal | F | -368.5..-363.5 | -145.0..-15.1 | -0..900 | backfill, geo-gravel, topsoil | 07 F3 |
| ei | Exterior rigid mineral wool 50, 128+ kg/m3 | thermal | G | -63.1..-13.1 | 232.0..3100.0 | -0..680 | closure, closure-screws, ei-top, membrane, screen-base, strap, strap-screws, windbarrier | 07 G.2(d); DEFG E4 |
| ei-top | Mineral wool infill between joists (wall-line thermal continuity) | thermal | B | -63.1..-13.1 | 3100.0..3335.0 | -0..680 | deck, ei, joists, windbarrier | 06 B6 |
| epdm | EPDM sill membrane, turned 40 down the foundation face | water | D | -1.0..140.0 | 260.0..301.0 | -0..900 | anchor, anchor-seal, fwall, gasket | 07 D12; DEFG E15 |
| fascia-lower | Larch fascia board 25 (lower), back-primed, ends sealed | cladding | B | -625.0..-600.0 | 3070.0..3340.0 | -0..800 | deck, fascia-screws-a, fascia-upper, joists, soffit-out | 06 B18; ABC 14 |
| fascia-screws-a | Stainless fascia screws into joist ends | metal | B | -625.0..-540.0 | 3197.5..3202.5 | 76..884 | fascia-lower, joists | 06 B18 |
| fascia-screws-b | Stainless fascia screws into nailer | metal | B | -625.0..-560.0 | 3445.5..3450.5 | 76..488 | edge-cleat, fascia-upper, nailer-3 | ABC 14 |
| fascia-upper | Larch fascia board 25 (upper), rebated drip joint | cladding | B | -625.0..-600.0 | 3340.0..3516.0 | -0..800 | avb, basesheet, cleat-screws, deck, edge-cleat, fascia-lower, fascia-screws-b, gutter-screws, gutter-spacers, nailer-1, nailer-2, nailer-3, nailer-4, nailer-rip, prestrip | 06 B18; ABC 14 |
| fill | Compacted subgrade, organics removed | ground | D | 200.0..900.0 | -450.0..23.8 | -0..900 | capbreak, footing, fwall, granular, native | 07 D3 |
| flash | Base flashing 24 ga prefinished steel, lap 75 over sill joint, 10% leg, 45 deg drip | water | A | -128.0..-12.0 | 206.9..360.0 | -0..790 | flash-nails, fnd-xps, membrane, parging, sheath | 06 A11 |
| flash-nails | Flashing fasteners at 300 o.c. into sill plate (under membrane lap) | metal | A | -12.6..45.0 | 328.1..331.9 | 73..677 | flash, membrane, sheath, sill | 06 A11 |
| fnd-xps | Foundation XPS 50, footing to flashing | thermal | D | -51.0..-1.0 | -199.0..224.7 | -0..790 | capbreak, dampproof, flash, geotextile, parging, parging-anchors, rock | DEFG D1; IG4 p.10 |
| foam | Closed-cell spray foam, top-plate poly to deck | air | B | 38.0..160.0 | 3100.1..3335.0 | -0..862 | blocking, deck, joists, vpoly-tail | 06 B5 |
| footing | Strip footing 550x250, underside at frost depth 450 | concrete | E | -175.0..375.0 | -450.0..-200.0 | -0..900 | capbreak, fill, geotextile, native | 07 E2; 07 E3 |
| frieze | Larch frieze trim fixed to soffit, 20 mm vent slot below | cladding | B | -134.8..-115.8 | 3040.0..3081.0 | -0..750 | soffit-in | 06 B24 |
| fwall | Concrete foundation wall 200, keyed into footing | concrete | E | 0.0..200.0 | -237.0..300.0 | -0..900 | anchor, anchor-seal, capbreak, dampproof, edge-xps, epdm, fill, granular, parging-anchors, soilgas, xps-a, xps-b | 07 E5; 06 A3 |
| gasket | Closed-cell sill gasket (air seal) | air | D | 0.0..140.0 | 301.0..304.0 | -0..900 | anchor, anchor-seal, epdm, sheath, sill | 07 D11; 06 A7 |
| geo-gravel | Geotextile under gravel strip | drainage | F | -363.5..-63.0 | -140.5..-15.0 | -0..900 | backfill, edging, gravel, parging | 07 F2 |
| geotextile | Non-woven geotextile wrapping the rock envelope | drainage | E | -586.0..-51.0 | -505.5..-149.5 | -0..900 | backfill, capbreak, fnd-xps, footing, native, parging, rock | 07 E9 |
| granular | Gas-permeable clear crushed stone 100 | drainage | D | 200.0..900.0 | 23.8..123.8 | -0..900 | fill, fwall, xps-a | 07 D4 |
| gravel | Gravel strip 300, washed stone, 5 % fall | drainage | F | -363.0..-63.0 | -140.0..0.0 | -0..900 | geo-gravel, parging, parging-anchors | 07 F4 |
| gutter | Prefinished gutter on 8 mm stand-offs | water | B | -768.3..-633.0 | 3289.7..3398.0 | -0..760 | gutter-screws, gutter-spacers | 06 B19; ABC 3 |
| gutter-screws | Gutter screws through stand-offs into nailer | metal | B | -633.6..-580.0 | 3377.5..3382.5 | 148..652 | fascia-upper, gutter, gutter-spacers, nailer-1 | ABC 3 |
| gutter-spacers | Stainless stand-offs 8 at each hanger | metal | B | -633.0..-625.0 | 3370.0..3390.0 | 140..660 | fascia-upper, gutter, gutter-screws | ABC 3 |
| gypsum | Gypsum board 12.7 | frame | G | 141.2..153.9 | 310.0..3100.0 | -0..900 | ceiling, joists, vpoly, vpoly-tail | 07 G (interior) |
| joists | Roof joists 38x235, 600 cantilever | frame | B | -600.0..900.0 | 3100.0..3335.0 | 60..900 | blocking, ceiling, deck, ei-top, fascia-lower, fascia-screws-a, foam, gypsum, membrane-lap, membrane-top, nailer-screws--480, nailer-screws--580, plate2, sheath-top, soffit-out, vpoly, vpoly-tail, windbarrier | 06 B3; ABC 1 |
| lath | Self-furred galvanized lath, 6 mm off paper | metal | G | -90.8..-89.8 | 230.6..3019.4 | -0..540 | lath-screws, stucco | 07 G8b |
| lath-screws | Lath screws with 25 mm washers into strapping, 150 o.c. | metal | G | -91.3..-64.1 | 373.0..2927.0 | 62..472 | lath, paper, strap, stucco | ABC 4; DEFG E10 |
| line-wire | Galvanized line wire 1.2 at 150, backing the paper between straps | metal | G | -83.3..-82.1 | 299.4..3000.6 | -0..570 |  | DEFG E3 |
| mastic | Mastic bed under metal flange | water | B | -628.0..-515.0 | 3519.0..3520.0 | -0..700 | basesheet, edge-fasteners-a, edge-fasteners-b, edge-metal | 06 B14 |
| membrane | Sheathing membrane, shingled over flashing upstand | water | A | -13.1..-12.0 | 240.0..3100.0 | -0..740 | closure-screws, ei, flash, flash-nails, membrane-lap, membrane-top, sheath, sheath-top, strap-screws | 06 A12; 07 G3 |
| membrane-lap | Upper sheathing membrane, lapped 100 over wall membrane | water | B | -13.0..-12.5 | 3000.0..3100.0 | 60..504 | closure-screws, joists, membrane, membrane-top | ABC 9 |
| membrane-top | Upper sheathing membrane to deck underside | water | B | -13.0..-12.5 | 3000.0..3335.0 | -0..740 | deck, joists, membrane, membrane-lap | 06 B21; ABC 9 |
| nailer-1 | PT nailer ply 1 of 4 (38) | frame | B | -600.0..-460.0 | 3354.0..3392.0 | -0..860 | avb, fascia-upper, gutter-screws, nailer-2, nailer-ply-screws, nailer-screws--480, nailer-screws--580, roofins-1 | 06 B11; ABC 13 |
| nailer-2 | PT nailer ply 2 of 4 (38) | frame | B | -600.0..-460.0 | 3392.0..3430.0 | -0..860 | fascia-upper, nailer-1, nailer-3, nailer-ply-screws, nailer-screws--480, nailer-screws--580, roofins-1, roofins-2 | 06 B11; ABC 13 |
| nailer-3 | PT nailer ply 3 of 4 (38) | frame | B | -600.0..-460.0 | 3430.0..3468.0 | -0..860 | cleat-screws, edge-metal, fascia-screws-b, fascia-upper, nailer-2, nailer-4, nailer-ply-screws, roofins-2 | 06 B11; ABC 13 |
| nailer-4 | PT nailer ply 4 of 4 (38) | frame | B | -600.0..-460.0 | 3468.0..3506.0 | -0..860 | coverboard, edge-fasteners-a, edge-fasteners-b, fascia-upper, nailer-3, nailer-ply-screws, nailer-rip, roofins-2 | 06 B11; ABC 13 |
| nailer-ply-screws | Ply-to-ply screws, staggered at 400 | metal | B | -542.5..-537.5 | 3380.0..3506.0 | 198..602 | nailer-1, nailer-2, nailer-3, nailer-4, nailer-rip | ABC 13 |
| nailer-rip | PT nailer rip 10, glued and nailed | frame | B | -600.0..-460.0 | 3506.0..3516.0 | -0..860 | basesheet, coverboard, edge-fasteners-a, edge-fasteners-b, fascia-upper, nailer-4, nailer-ply-screws | ABC 13 |
| nailer-screws--480 | Bottom nailer ply screws, 2 per joist, 50+ into joist | metal | B | -483.0..-477.0 | 3285.0..3392.0 | 76..884 | avb, deck, joists, nailer-1, nailer-2, prestrip | ABC 13 |
| nailer-screws--580 | Bottom nailer ply screws, 2 per joist, 50+ into joist | metal | B | -583.0..-577.0 | 3285.0..3392.0 | 76..884 | avb, deck, joists, nailer-1, nailer-2, prestrip | ABC 13 |
| native | Undisturbed native soil | ground | E | -1300.0..900.0 | -700.0..-450.0 | -0..900 | backfill, fill, footing, geotextile, pier-1, pier-2, pier-base-1, pier-base-2 | 07 E1 |
| nut | Anchor nut | metal | D | 59.0..81.0 | 347.0..358.0 | 689..711 | anchor, washer | 07 D2 |
| paper | Stucco backing paper | water | G | -83.8..-83.3 | 230.0..3020.0 | -0..570 | bead-base, bead-top, lath-screws, stucco | 07 G8b |
| parging | Cement parging 12 on lath, 150 below grade to flashing | concrete | F | -63.0..-51.0 | -149.5..220.8 | -0..740 | backfill, flash, fnd-xps, geo-gravel, geotextile, gravel, parging-anchors, parging-lath | DEFG D1; 07 F5 |
| parging-anchors | Insulation anchors with 50 mm washers into concrete | metal | F | -63.0..40.0 | -63.0..123.0 | 147..603 | dampproof, fnd-xps, fwall, gravel, parging, parging-lath | [I] |
| parging-lath | Galvanized lath in parging | metal | F | -57.5..-56.5 | -140.0..214.2 | -0..740 | parging, parging-anchors | 07 F5 |
| pier-1 | Concrete pier 200, 450+ below grade, top 152+ above, top falls 1:10, chamfered | concrete | C | -955.0..-755.0 | -500.0..152.0 | 50..850 | abu-base-1, backfill, native, pier-anchor-1, pier-base-1, topsoil | 06 C1; 06 C3; ABC 19; ABC 23 |
| pier-2 | Concrete pier 200, 450+ below grade, top 152+ above, top falls 1:10, chamfered | concrete | C | -1215.0..-1015.0 | -500.0..152.0 | 50..850 | abu-base-2, backfill, native, pier-anchor-2, pier-base-2, topsoil | 06 C1; 06 C3; ABC 19; ABC 23 |
| pier-anchor-1 | Cast-in stainless anchor 16 | metal | C | -863.0..-847.0 | -400.0..172.0 | 142..758 | abu-base-1, anchor-nut-1, anchor-washer-1, pier-1 | 06 C4 |
| pier-anchor-2 | Cast-in stainless anchor 16 | metal | C | -1123.0..-1107.0 | -400.0..172.0 | 142..758 | abu-base-2, anchor-nut-2, anchor-washer-2, pier-2 | 06 C4 |
| pier-base-1 | Compacted granular base under pier | drainage | C | -955.0..-755.0 | -600.0..-500.0 | 50..850 | native, pier-1 | 06 C2 |
| pier-base-2 | Compacted granular base under pier | drainage | C | -1215.0..-1015.0 | -600.0..-500.0 | 50..850 | native, pier-2 | 06 C2 |
| plate1 | Top plate (lower) | frame | B | 0.0..140.0 | 3024.0..3062.0 | -0..900 | batts, closure-screws, plate2, sheath, studs | 06 B1 |
| plate2 | Top plate (upper) | frame | B | 0.0..140.0 | 3062.0..3100.0 | -0..900 | blocking, closure-screws, joists, plate1, seal-plate, sheath, sheath-top, vpoly-tail | 06 B1 |
| post-1 | White oak post 90x90, end grain 25 above concrete | furniture | C | -900.0..-810.0 | 177.0..373.5 | 105..795 | abu-seat-1, abu-straps-1, apron-1, apron-bolts-1, brace, brace-screws-1, post-bolts-1-150, post-bolts-1-750, post-cap-1, rail, rail-tenon-1, tenon-pins-1-150, tenon-pins-1-750 | 06 C6; ABC 7 |
| post-2 | White oak post 90x90, end grain 25 above concrete | furniture | C | -1160.0..-1070.0 | 177.0..373.5 | 105..795 | abu-seat-2, abu-straps-2, apron-2, apron-bolts-2, brace, brace-screws-2, post-bolts-2-150, post-bolts-2-750, post-cap-2, rail, rail-tenon-2, tenon-pins-2-150, tenon-pins-2-750 | 06 C6; ABC 7 |
| post-bolts-1-150 | Stainless through-bolts 12.7 at catalogue holes | metal | C | -861.4..-848.6 | 215.1..276.4 | 102..198 | abu-straps-1, post-1 | 06 C5; ABC 18 |
| post-bolts-1-750 | Stainless through-bolts 12.7 at catalogue holes | metal | C | -861.4..-848.6 | 215.1..276.4 | 702..798 | abu-straps-1, post-1 | 06 C5; ABC 18 |
| post-bolts-2-150 | Stainless through-bolts 12.7 at catalogue holes | metal | C | -1121.3..-1108.7 | 215.1..276.4 | 102..198 | abu-straps-2, post-2 | 06 C5; ABC 18 |
| post-bolts-2-750 | Stainless through-bolts 12.7 at catalogue holes | metal | C | -1121.3..-1108.7 | 215.1..276.4 | 702..798 | abu-straps-2, post-2 | 06 C5; ABC 18 |
| post-cap-1 | Butyl/EPDM cap 1.5 on sealed post end grain, lapped 25 down free faces | water | C | -900.0..-810.0 | 373.5..375.0 | 105..795 | apron-1, post-1, rail, slat-1 | ABC 7 |
| post-cap-2 | Butyl/EPDM cap 1.5 on sealed post end grain, lapped 25 down free faces | water | C | -1160.0..-1070.0 | 373.5..375.0 | 105..795 | apron-2, post-2, rail, slat-3 | ABC 7 |
| prestrip | Self-adhered pre-strip, 50 past interior wall face | air | B | -600.0..205.0 | 3351.0..3352.5 | -0..880 | avb, deck, fascia-upper, nailer-screws--480, nailer-screws--580 | 06 B8; ABC 8 |
| rail | Oak cross rail 45x90, tenoned into posts | furniture | C | -1070.0..-900.0 | 285.0..375.0 | 128..772 | apron-bolts-1, apron-bolts-2, brace, post-1, post-2, post-cap-1, post-cap-2, rail-tenon-1, rail-tenon-2, slat-1, slat-2, slat-3, slat-screws-2 | 06 C8; ABC 6 |
| rail-tenon-1 | Rail tenon 25x30, 60 into post | furniture | C | -900.0..-840.0 | 315.0..345.0 | 138..762 | post-1, rail, tenon-pins-1-150, tenon-pins-1-750 | ABC 6 |
| rail-tenon-2 | Rail tenon 25x30, 60 into post | furniture | C | -1130.0..-1070.0 | 315.0..345.0 | 138..762 | post-2, rail, tenon-pins-2-150, tenon-pins-2-750 | ABC 6 |
| rock | Clear crushed drain rock, 150+ cover, stepped clear of the footing | drainage | E | -585.5..-51.0 | -505.0..-150.0 | -0..900 | capbreak, drainpipe, fnd-xps, geotextile | 07 E9; DEFG E7; DEFG E8 |
| roofins-1 | Polyiso 75 (layer 1) | thermal | B | -460.0..900.0 | 3354.0..3429.0 | -0..820 | avb, nailer-1, nailer-2, roofins-2 | 06 B10 |
| roofins-2 | Polyiso tapered (layer 2), 2 % to eave | thermal | B | -460.0..900.0 | 3429.0..3531.2 | -0..780 | basesheet, coverboard, nailer-2, nailer-3, nailer-4, roofins-1 | 06 B10; 06 B3 |
| screen-base | Perforated insect screen across cavity and insulation base | metal | A | -82.1..-13.1 | 231.5..232.0 | -0..620 | ei, strap | 06 A14; 07 G7 |
| screen-top | Insect screen across cavity-top vent slot | metal | B | -109.3..-84.1 | 3020.6..3081.0 | -0..620 | bead-top, soffit-in | 06 B22; 07 G7 |
| seal-floor | Acoustical sealant bead, wall poly to slab barrier | air | D | 150.0..156.0 | 300.2..301.2 | -0..900 | soilgas, vpoly | DEFG E1 |
| seal-plate | Acoustical sealant bead, poly to top plate | air | B | 140.0..141.0 | 3077.0..3083.0 | -0..900 | plate2, vpoly | ABC 10 |
| seal-sill | Acoustical sealant bead, poly to sill plate | air | D | 140.0..141.0 | 305.0..311.0 | -0..900 | sill, vpoly | DEFG E1; ABC 17 |
| sheath | Sheathing 12, bottom flush with sill underside | frame | A | -12.0..0.0 | 304.0..3100.0 | -0..840 | batts, blocking, closure-screws, flash, flash-nails, gasket, membrane, plate1, plate2, sheath-top, sill, strap-screws, studs | 06 A10; 07 G2 |
| sheath-top | Sheathing between joists to deck | frame | B | -12.0..0.0 | 3100.0..3335.0 | -0..840 | blocking, deck, joists, membrane, plate2, sheath | 06 B21 |
| sill | PT sill plate 38x140, flush with foundation face | frame | A | 0.0..140.0 | 304.0..342.0 | -0..900 | anchor, anchor-seal, batts, flash-nails, gasket, seal-sill, sheath, studs, washer | 06 A8; 07 D13 |
| slab | Concrete slab 100, reglet at perimeter | concrete | D | 275.2..900.0 | 200.0..300.0 | -0..900 | slab-seal, soilgas | 07 D9 |
| slab-seal | Flexible sealant at slab perimeter (VBBL 9.25.3.6(5)) | air | D | 275.2..281.2 | 294.0..300.0 | -0..900 | slab, soilgas | DEFG E5 |
| slat-1 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -920.0..-790.0 | 375.0..420.0 | 90..810 | apron-1, post-cap-1, rail, slat-screws-1 | 06 C9 |
| slat-2 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -1058.0..-928.0 | 375.0..420.0 | 90..810 | rail, slat-screws-2 | 06 C9 |
| slat-3 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -1196.0..-1066.0 | 375.0..420.0 | 90..810 | apron-2, post-cap-2, rail, slat-screws-3 | 06 C9 |
| slat-screws-1 | Stainless screws from below through apron | metal | C | -802.5..-797.5 | 300.0..410.0 | 108..792 | apron-1, slat-1 | ABC 21 |
| slat-screws-2 | Stainless screws from below through rail | metal | C | -992.5..-987.5 | 300.0..410.0 | 138..762 | rail, slat-2 | ABC 21 |
| slat-screws-3 | Stainless screws from below through apron | metal | C | -1182.5..-1177.5 | 300.0..410.0 | 108..792 | apron-2, slat-3 | ABC 21 |
| soffit-in | Larch soffit boards 19 | cladding | B | -277.4..-63.6 | 3081.0..3100.0 | -0..750 | closure, frieze, screen-top, soffit-mesh, windbarrier | 06 B20 |
| soffit-mesh | Soffit vent insect mesh | metal | B | -326.4..-274.4 | 3080.5..3081.0 | -0..750 | soffit-in, soffit-out | 06 B20 |
| soffit-out | Larch soffit boards 19 | cladding | B | -600.0..-323.4 | 3081.0..3100.0 | -0..750 | fascia-lower, joists, soffit-mesh | 06 B20 |
| soilgas | 0.25 mm soil-gas / air barrier, lapped 300, up slab edge, taped to ledge | air | D | 141.0..900.0 | 199.8..300.2 | -0..900 | edge-xps, fwall, seal-floor, slab, slab-seal, xps-b | 07 D8; 07 D10 |
| strap | PT strapping 19x64 on stud lines | frame | G | -82.1..-63.1 | 232.0..3043.0 | 47..517 | closure, ei, lath-screws, screen-base, strap-screws | 07 G4; 06 A13 |
| strap-screws | Strapping screws 6 mm through insulation into studs, 300 o.c. from y 375 | metal | G | -82.1..75.0 | 372.0..2953.0 | 76..488 | ei, membrane, sheath, strap, studs | DEFG E4; ABC 5 |
| stripin | SBS strip-in over flange, 101.6 onto field | water | B | -626.4..-407.0 | 3519.0..3522.6 | -0..680 | basesheet, capsheet, edge-fasteners-a, edge-fasteners-b, edge-metal | 06 B16 |
| stucco | Three-coat cement stucco 25 | cladding | G | -108.8..-83.8 | 230.0..3020.0 | -0..500 | bead-base, bead-top, lath, lath-screws, paper | 07 G9b; 06 A15a; DEFG D3 |
| studs | Studs 38x140 at 400 | frame | G | 0.0..140.0 | 342.0..3024.0 | 60..900 | batts, plate1, sheath, sill, strap-screws | 07 G1 |
| tenon-pins-1-150 | Stainless drawbore pins 10 | metal | C | -885.0..-855.0 | 325.0..335.0 | 105..195 | post-1, rail-tenon-1 | ABC 6 |
| tenon-pins-1-750 | Stainless drawbore pins 10 | metal | C | -885.0..-855.0 | 325.0..335.0 | 705..795 | post-1, rail-tenon-1 | ABC 6 |
| tenon-pins-2-150 | Stainless drawbore pins 10 | metal | C | -1115.0..-1085.0 | 325.0..335.0 | 105..195 | post-2, rail-tenon-2 | ABC 6 |
| tenon-pins-2-750 | Stainless drawbore pins 10 | metal | C | -1115.0..-1085.0 | 325.0..335.0 | 705..795 | post-2, rail-tenon-2 | ABC 6 |
| topsoil | Topsoil 100, 5 % fall for 3 m | ground | F | -1300.0..-368.5 | -161.9..-15.3 | -0..900 | backfill, edging, pier-1, pier-2 | 07 F6 |
| vpoly | 6 mil poly air/vapour barrier, lapped 104 onto slab barrier | air | D | 141.0..245.0 | 301.2..3100.0 | -0..900 | edge-cap, gypsum, joists, seal-floor, seal-plate, seal-sill, vpoly-tail | 07 D14; 06 B2; DEFG E1 |
| vpoly-tail | Wall poly turned 50 onto top plate | air | B | 90.0..141.2 | 3100.0..3100.1 | -0..862 | foam, gypsum, joists, plate2, vpoly | ABC 10 |
| washer | Plate washer | metal | D | 45.0..95.0 | 342.0..347.0 | 675..725 | anchor, batts, nut, sill | 07 D13 |
| windbarrier | Vapour-permeable wind barrier on eave mineral wool | air | B | -63.6..-63.1 | 3081.0..3335.0 | -0..680 | closure, deck, ei, ei-top, joists, soffit-in | ABC 11 |
| xps-a | Under-slab XPS 38 (layer 1 of 2, staggered) | thermal | D | 200.0..900.0 | 123.8..161.8 | -0..900 | fwall, granular, xps-b | 07 D6 |
| xps-b | Under-slab XPS 38 (layer 2 of 2) | thermal | D | 200.0..900.0 | 161.8..199.8 | -0..900 | edge-xps, fwall, soilgas, xps-a | 07 D6 |

## Drawing notes

- **granular**: Radon rough-in per VBBL 9.13.4.3: vent-pipe inlet near slab centre, gas-permeable layer 100+ beyond the inlet, pipe sealed at the barrier, labelled every 1.8 m, terminates 1.8 m+ from the property line with a 10–12.5 mm screen (shown on plan, outside this slice).
- **soilgas**: Sequence: leave the upstand loose ~150 mm during the pour; after cure fold it over the edge XPS and tape it to the ledge, then EPDM, gasket, sill, framing, then lap and seal the wall poly (DEFG E14).
- **ei**: Stucco is hung on strapping screwed through 50 mm mineral wool: screw size and spacing to be confirmed by a structural engineer (RDH13 3-46).
- **lath-screws**: Lath fastened into 19 mm strapping, not 25 mm into framing: alternative solution under 9.27.5.7(3) / 9.28.4.6(2), needs engineer or manufacturer acceptance.
- **stucco**: Vertical control joints at 4.57 m max and at opening corners, through the lath; no T or L panels (CMHC 7-17). Stucco +230 is 30 above the 200 minimum: the decades view flags grade rise over 30 mm.
- **joists**: 3 x 82 mm toe-nails per joist to the plate (Table 9.23.3.4) and a galvanized uplift clip on each joist, installed before the spray foam (ABC 12).
- **membrane-top**: Self-adhered collar at each joist where it crosses the membrane: 3 sides, 50 mm onto the membrane (ABC 9).
- **fascia-upper**: Fascia stays under the roof edge (ABC D3 declined: the proposed outboard fascia puts the edge metal through it). Back-primed, end grain sealed; re-coating needs the gutter off, not the roof edge.
- **gutter**: Hangers at 600 max; gutter removable for re-coating the fascia (CMHC-FL 2.25); downspout piped separately to the storm sump.
- **drainpipe**: Falls 0.5–1 % to the storm sump (two-pipe system, roof water piped separately); cleanout at each high point (DEFG E9).

## Spec parts missing from model

- none
