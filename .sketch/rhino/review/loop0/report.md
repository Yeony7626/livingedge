# Review packet

Spec: C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\detail01.json

## Floating parts (touch nothing)
- none

## Clashes (overlap > 1 mm3, not declared in `embeds`)
- none

## Parts

| id | name | role | junction | x | y | w | touches | src |
|---|---|---|---|---|---|---|---|---|
| abu-base-1 | Standoff post base: base plate | metal | C | -758.0..-682.0 | 152.0..153.5 | 102..798 | abu-straps-1, pier-1, pier-anchor-1 | 06 C5 |
| abu-base-2 | Standoff post base: base plate | metal | C | -1018.0..-942.0 | 152.0..153.5 | 102..798 | abu-straps-2, pier-2, pier-anchor-2 | 06 C5 |
| abu-seat-1 | Standoff seat, 25 mm above concrete | metal | C | -765.0..-675.0 | 175.5..177.0 | 105..795 | abu-straps-1, post-1 | 06 C5 |
| abu-seat-2 | Standoff seat, 25 mm above concrete | metal | C | -1025.0..-935.0 | 175.5..177.0 | 105..795 | abu-straps-2, post-2 | 06 C5 |
| abu-straps-1 | Standoff post base: side straps (12 ga) | metal | C | -758.0..-682.0 | 153.5..292.0 | 102..798 | abu-base-1, abu-seat-1, post-1, post-bolt-1-150-230, post-bolt-1-150-270, post-bolt-1-750-230, post-bolt-1-750-270 | 06 C5 |
| abu-straps-2 | Standoff post base: side straps (12 ga) | metal | C | -1018.0..-942.0 | 153.5..292.0 | 102..798 | abu-base-2, abu-seat-2, post-2, post-bolt-2-150-230, post-bolt-2-150-270, post-bolt-2-750-230, post-bolt-2-750-270 | 06 C5 |
| anchor | Anchor bolt 12.7 HDG, embedded 100+ | metal | D | 63.7..76.3 | 200.0..362.0 | 694..706 | batts, epdm, fwall, gasket, nut, sill, washer | 07 D2; 06 A8 |
| apron-1 | Oak apron 45x90, side-bolted to posts | furniture | C | -675.0..-630.0 | 315.0..405.0 | 90..810 | apron-bolt-1-335, apron-bolt-1-385, post-1, slat-1 | 06 C8 |
| apron-2 | Oak apron 45x90, side-bolted to posts | furniture | C | -1070.0..-1025.0 | 315.0..405.0 | 90..810 | apron-bolt-2-335, apron-bolt-2-385, post-2, slat-3 | 06 C8 |
| apron-bolt-1-335 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -765.0..-630.0 | 328.6..341.4 | 144..756 | apron-1, post-1, rail | 06 C7; 06 C8 |
| apron-bolt-1-385 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -765.0..-630.0 | 378.6..391.4 | 144..756 | apron-1, post-1, rail | 06 C7; 06 C8 |
| apron-bolt-2-335 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -1070.0..-935.0 | 328.6..341.4 | 144..756 | apron-2, post-2, rail | 06 C7; 06 C8 |
| apron-bolt-2-385 | Stainless through-bolts, 2 per joint (moment connection) | metal | C | -1070.0..-935.0 | 378.6..391.4 | 144..756 | apron-2, post-2, rail | 06 C7; 06 C8 |
| avb | Air/vapour control membrane on deck | air | B | -679.6..900.0 | 3351.0..3354.0 | -0..860 | deck, fascia, nailer, nailer-screws, prestrip, roofins-1 | 06 B9 |
| backfill | Free-draining backfill | ground | E | -1300.0..-1.0 | -450.0..-125.5 | -0..900 | dampproof, edging, geo-gravel, geotextile, native, pier-1, pier-2, topsoil | 07 E11 |
| basesheet | SBS base sheet, 52 down fascia face | water | B | -707.6..900.0 | 3464.0..3547.8 | -0..700 | capsheet, coverboard, edge-fasteners-a, edge-fasteners-b, edge-metal, fascia, mastic, nailer, nailer-screws, roofins-2, stripin | 06 B13 |
| batts | Batt insulation | thermal | G | 0.0..140.0 | 342.0..3024.0 | -0..862 | anchor, plate1, sheath, sill, studs, vpoly, washer | 07 G1 |
| bead-base | Galvanized casing bead, 10+ above flashing, left open | metal | A | -104.6..-82.6 | 229.4..270.0 | -0..500 | paper, stucco | 06 A15a |
| bead-top | Casing bead at stucco top | metal | B | -104.6..-82.6 | 2990.0..3020.6 | -0..500 | paper, screen-top, stucco | 06 B23 |
| blocking | Full-depth blocking, caulked 4 sides (air transfer + fire block) | frame | B | 0.0..38.0 | 3100.0..3335.0 | -0..862 | deck, foam, joists, plate2, sheath, sheath-top | 06 B4 |
| capbreak | Capillary break coating on footing top, into keyway | water | E | -175.0..200.0 | -238.0..-199.0 | -0..900 | dampproof, fill, footing, fwall, geotextile, rock | 07 E4 |
| capsheet | SBS cap sheet | water | B | -706.0..900.0 | 3520.3..3551.8 | -0..640 | basesheet, stripin | 06 B17 |
| clip-screws | Concrete screws for clips | metal | A | -3.0..45.0 | 182.0..188.0 | 147..603 | flash-clip, fwall, parging | [I] |
| closure | PT cavity-top closure (cavity not open to soffit) | frame | B | -82.1..-63.1 | 3043.0..3081.0 | -0..620 | ei, soffit-in, strap | 06 B22 |
| coverboard | Cover board 12 | frame | B | -539.6..900.0 | 3504.0..3544.8 | -0..740 | basesheet, nailer, roofins-2 | 06 B12 |
| dampproof | Damp-proofing, grade to footing | water | E | -1.0..0.0 | -199.0..0.0 | -0..900 | backfill, capbreak, fwall, geo-gravel, geotextile, gravel, parging, rock | 07 E6 |
| deck | Plywood roof deck 16 | frame | B | -679.6..900.0 | 3335.0..3351.0 | -0..900 | avb, blocking, ei-top, fascia, foam, joists, membrane-top, nailer-screws, prestrip, sheath-top | 06 B7 |
| drainpipe | Perforated PVC drain 100, invert at footing underside | drainage | E | -435.5..-325.5 | -454.0..-344.0 | -0..900 | rock | 07 E8 |
| edge-fasteners-a | Edge-metal fasteners, row 1 (203 o.c., staggered) | metal | B | -662.2..-657.8 | 3480.0..3520.6 | 48..661 | basesheet, edge-metal, mastic, nailer, stripin | 06 B15 |
| edge-fasteners-b | Edge-metal fasteners, row 2 | metal | B | -622.2..-617.8 | 3480.0..3520.6 | 149..559 | basesheet, edge-metal, mastic, nailer, stripin | 06 B15 |
| edge-metal | 24 ga metal edge: 110 flange, 100 below fascia top, drip 12 off face | water | B | -720.1..-594.6 | 3403.8..3520.6 | -0..700 | basesheet, edge-fasteners-a, edge-fasteners-b, mastic, nailer, stripin | 06 B15 |
| edge-xps | Slab-edge XPS 75 (thermal break, isolation joint) | thermal | D | 200.0..275.0 | 199.8..300.0 | -0..900 | fwall, soilgas, xps-b | 07 D7 |
| edging | Steel edging, top flush with grade | metal | F | -305.5..-300.5 | -185.0..-15.1 | -0..900 | backfill, geo-gravel, topsoil | 07 F3 |
| ei | Exterior rigid mineral wool 50 | thermal | G | -63.1..-13.1 | 232.0..3100.0 | -0..680 | closure, ei-top, membrane, screen-base, soffit-in, strap, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500 | 07 G.2(d) |
| ei-top | Mineral wool infill between joists (wall-line thermal continuity) | thermal | B | -63.1..-13.1 | 3100.0..3335.0 | -0..680 | deck, ei, joists, soffit-in | 06 B6 |
| epdm | EPDM sill membrane (capillary break) | water | D | 0.0..140.0 | 300.0..301.0 | -0..900 | anchor, fwall, gasket, parging, vpoly | 07 D12 |
| fascia | Larch fascia 25, back-primed | cladding | B | -704.6..-679.6 | 3070.0..3516.0 | -0..800 | avb, basesheet, deck, fascia-screws, gutter, gutter-screws, joists, nailer, prestrip, soffit-out | 06 B18 |
| fascia-screws | Stainless fascia screws into joist ends | metal | B | -704.6..-619.6 | 3197.5..3202.5 | 76..488 | fascia, joists | 06 B18 |
| fill | Compacted subgrade, organics removed | ground | D | 200.0..900.0 | -450.0..23.8 | -0..900 | capbreak, footing, fwall, granular, native | 07 D3 |
| flash | Base flashing 24 ga prefinished steel, lap 75 over sill joint, 10% leg, 45 deg drip | water | A | -123.8..-12.0 | 207.4..360.0 | -0..790 | flash-clip, flash-nails, membrane, sheath | 06 A11 |
| flash-clip | Flashing support clip, 3 mm galv. steel, 600 o.c. [I] | metal | A | -108.8..0.0 | 160.0..225.9 | 125..625 | clip-screws, flash, fwall, parging | 06 A11 (75 mm span); [I] |
| flash-nails | Flashing fasteners at 300 o.c. into sill plate (under membrane lap) | metal | A | -12.6..45.0 | 328.1..331.9 | 73..677 | flash, membrane, sheath, sill | 06 A11 |
| foam | Closed-cell spray foam, top-plate poly to deck | air | B | 38.0..160.0 | 3100.0..3335.0 | -0..862 | blocking, deck, gypsum, joists, plate2, vpoly | 06 B5 |
| footing | Strip footing 550x250, underside at frost depth 450 | concrete | E | -175.0..375.0 | -450.0..-200.0 | -0..900 | capbreak, fill, geotextile, native | 07 E2; 07 E3 |
| frieze | Larch frieze trim fixed to soffit, 20 mm vent slot below | cladding | B | -130.6..-111.6 | 3040.0..3081.0 | -0..750 | soffit-in | 06 B24 |
| fwall | Concrete foundation wall 200, keyed into footing | concrete | E | 0.0..200.0 | -237.0..300.0 | -0..900 | anchor, capbreak, clip-screws, dampproof, edge-xps, epdm, fill, flash-clip, granular, parging, soilgas, xps-a, xps-b | 07 E5; 06 A3 |
| gasket | Closed-cell sill gasket (air seal) | air | D | 0.0..140.0 | 301.0..304.0 | -0..900 | anchor, epdm, sheath, sill, vpoly | 07 D11; 06 A7 |
| geo-gravel | Geotextile under gravel strip | drainage | F | -300.5..-1.0 | -140.5..-14.9 | -0..900 | backfill, dampproof, edging, gravel | 07 F2 |
| geotextile | Non-woven geotextile wrapping the rock envelope | drainage | E | -586.0..-1.0 | -505.5..-189.5 | -0..900 | backfill, capbreak, dampproof, footing, native, rock | 07 E9 |
| granular | Gas-permeable clear crushed stone 100 | drainage | D | 200.0..900.0 | 23.8..123.8 | -0..900 | fill, fwall, xps-a | 07 D4 |
| gravel | Gravel strip 300, washed stone | drainage | F | -300.0..-1.0 | -139.9..0.0 | -0..900 | dampproof, geo-gravel, parging | 07 F4 |
| gutter | Prefinished gutter hung on fascia | water | B | -839.9..-704.6 | 3289.7..3400.0 | -0..760 | fascia, gutter-screws | 06 B19 |
| gutter-screws | Gutter screws into fascia | metal | B | -705.2..-689.6 | 3377.5..3382.5 | 148..652 | fascia, gutter | 06 B19 |
| gypsum | Gypsum board 12.7 | frame | G | 140.2..152.9 | 310.0..3100.0 | -0..900 | foam, joists, vpoly | 07 G (interior) |
| joists | Roof joists 38x235, 600 cantilever | frame | B | -679.6..900.0 | 3100.0..3335.0 | 60..900 | blocking, deck, ei-top, fascia, fascia-screws, foam, gypsum, membrane-top, nailer-screws, plate2, sheath-top, soffit-out, vpoly | 06 B3 |
| lath | Self-furred galvanized lath, 6 mm off paper | metal | G | -89.6..-88.6 | 230.6..3019.4 | -0..540 | stucco | 07 G8b |
| mastic | Mastic bed under metal flange | water | B | -707.6..-594.6 | 3519.0..3520.0 | -0..700 | basesheet, edge-fasteners-a, edge-fasteners-b, edge-metal | 06 B14 |
| membrane | Sheathing membrane, shingled over flashing upstand | water | A | -13.1..-12.0 | 240.0..3100.0 | -0..740 | ei, flash, flash-nails, membrane-top, sheath, sheath-top, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500 | 06 A12; 07 G3 |
| membrane-top | Sheathing membrane to deck underside | water | B | -12.5..-12.0 | 3100.0..3335.0 | -0..740 | deck, joists, membrane, sheath, sheath-top | 06 B21 |
| nailer | PT perimeter nailer built up to insulation height | frame | B | -679.6..-539.6 | 3354.0..3516.0 | -0..860 | avb, basesheet, coverboard, edge-fasteners-a, edge-fasteners-b, edge-metal, fascia, nailer-screws, roofins-1, roofins-2 | 06 B11 |
| nailer-screws | Nailer screws into joists | metal | B | -573.0..-567.0 | 3300.0..3516.0 | 76..488 | avb, basesheet, deck, joists, nailer, prestrip | 06 B11 |
| native | Undisturbed native soil | ground | E | -1300.0..900.0 | -700.0..-450.0 | -0..900 | backfill, fill, footing, geotextile, pier-1, pier-2, pier-base-1, pier-base-2 | 07 E1 |
| nut | Anchor nut | metal | D | 59.0..81.0 | 347.0..358.0 | 689..711 | anchor, washer | 07 D2 |
| paper | Stucco backing paper | water | G | -82.6..-82.1 | 230.0..3020.0 | -0..570 | bead-base, bead-top, screen-base, strap, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500, stucco | 07 G8b |
| parging | Parging on exposed foundation | concrete | F | -8.0..0.0 | 0.0..300.0 | -0..900 | clip-screws, dampproof, epdm, flash-clip, fwall, gravel | 06 A16; 07 F5 |
| pier-1 | Concrete pier 250, 450+ below grade, top 152+ above | concrete | C | -845.0..-595.0 | -500.0..152.0 | 25..875 | abu-base-1, backfill, native, pier-anchor-1, pier-base-1, topsoil | 06 C1; 06 C3 |
| pier-2 | Concrete pier 250, 450+ below grade, top 152+ above | concrete | C | -1105.0..-855.0 | -500.0..152.0 | 25..875 | abu-base-2, backfill, native, pier-anchor-2, pier-base-2, topsoil | 06 C1; 06 C3 |
| pier-anchor-1 | Cast-in stainless anchor 16 | metal | C | -728.0..-712.0 | -400.0..172.0 | 142..758 | abu-base-1, pier-1 | 06 C4 |
| pier-anchor-2 | Cast-in stainless anchor 16 | metal | C | -988.0..-972.0 | -400.0..172.0 | 142..758 | abu-base-2, pier-2 | 06 C4 |
| pier-base-1 | Compacted granular base under pier | drainage | C | -845.0..-595.0 | -600.0..-500.0 | 25..875 | native, pier-1 | 06 C2 |
| pier-base-2 | Compacted granular base under pier | drainage | C | -1105.0..-855.0 | -600.0..-500.0 | 25..875 | native, pier-2 | 06 C2 |
| plate1 | Top plate (lower) | frame | B | 0.0..140.0 | 3024.0..3062.0 | -0..900 | batts, plate2, sheath, studs, vpoly | 06 B1 |
| plate2 | Top plate (upper) | frame | B | 0.0..140.0 | 3062.0..3100.0 | -0..900 | blocking, foam, joists, plate1, sheath, sheath-top, vpoly | 06 B1 |
| post-1 | White oak post 90x90, end grain 25 above concrete | furniture | C | -765.0..-675.0 | 177.0..405.0 | 105..795 | abu-seat-1, abu-straps-1, apron-1, apron-bolt-1-335, apron-bolt-1-385, post-bolt-1-150-230, post-bolt-1-150-270, post-bolt-1-750-230, post-bolt-1-750-270, rail, slat-1, xbrace-1 | 06 C6 |
| post-2 | White oak post 90x90, end grain 25 above concrete | furniture | C | -1025.0..-935.0 | 177.0..405.0 | 105..795 | abu-seat-2, abu-straps-2, apron-2, apron-bolt-2-335, apron-bolt-2-385, post-bolt-2-150-230, post-bolt-2-150-270, post-bolt-2-750-230, post-bolt-2-750-270, rail, slat-3, xbrace-2 | 06 C6 |
| post-bolt-1-150-230 | Stainless through-bolt 12.7, post base | metal | C | -726.4..-713.6 | 223.6..236.4 | 102..198 | abu-straps-1, post-1 | 06 C5; 06 C7 |
| post-bolt-1-150-270 | Stainless through-bolt 12.7, post base | metal | C | -726.4..-713.6 | 263.6..276.4 | 102..198 | abu-straps-1, post-1 | 06 C5; 06 C7 |
| post-bolt-1-750-230 | Stainless through-bolt 12.7, post base | metal | C | -726.4..-713.6 | 223.6..236.4 | 702..798 | abu-straps-1, post-1 | 06 C5; 06 C7 |
| post-bolt-1-750-270 | Stainless through-bolt 12.7, post base | metal | C | -726.4..-713.6 | 263.6..276.4 | 702..798 | abu-straps-1, post-1 | 06 C5; 06 C7 |
| post-bolt-2-150-230 | Stainless through-bolt 12.7, post base | metal | C | -986.4..-973.6 | 223.6..236.4 | 102..198 | abu-straps-2, post-2 | 06 C5; 06 C7 |
| post-bolt-2-150-270 | Stainless through-bolt 12.7, post base | metal | C | -986.4..-973.6 | 263.6..276.4 | 102..198 | abu-straps-2, post-2 | 06 C5; 06 C7 |
| post-bolt-2-750-230 | Stainless through-bolt 12.7, post base | metal | C | -986.4..-973.6 | 223.6..236.4 | 702..798 | abu-straps-2, post-2 | 06 C5; 06 C7 |
| post-bolt-2-750-270 | Stainless through-bolt 12.7, post base | metal | C | -986.4..-973.6 | 263.6..276.4 | 702..798 | abu-straps-2, post-2 | 06 C5; 06 C7 |
| prestrip | Self-adhered pre-strip, 50 past interior wall face | air | B | -679.6..200.0 | 3351.0..3352.5 | -0..880 | avb, deck, fascia, nailer-screws | 06 B8 |
| rail | Oak cross rail 45x90 | furniture | C | -935.0..-765.0 | 315.0..405.0 | 128..772 | apron-bolt-1-335, apron-bolt-1-385, apron-bolt-2-335, apron-bolt-2-385, post-1, post-2, slat-1, slat-2, slat-3, xbrace-1, xbrace-2 | 06 C8 |
| rock | Clear crushed drain rock, 150 cover top and sides | drainage | E | -585.5..-1.0 | -505.0..-190.0 | -0..900 | capbreak, dampproof, drainpipe, geotextile | 07 E9 |
| roofins-1 | Polyiso 75 (layer 1) | thermal | B | -539.6..900.0 | 3354.0..3429.0 | -0..820 | avb, nailer, roofins-2 | 06 B10 |
| roofins-2 | Polyiso tapered (layer 2), 2 % to eave | thermal | B | -539.6..900.0 | 3429.0..3532.8 | -0..780 | basesheet, coverboard, nailer, roofins-1 | 06 B10; 06 B3 |
| screen-base | Perforated insect screen across cavity and insulation base | metal | A | -82.1..-13.1 | 231.5..232.0 | -0..620 | ei, paper, strap | 06 A14; 07 G7 |
| screen-top | Insect screen across cavity-top vent slot | metal | B | -105.1..-84.1 | 3020.6..3081.0 | -0..620 | bead-top, soffit-in | 06 B22; 07 G7 |
| sheath | Sheathing 12, bottom flush with sill underside | frame | A | -12.0..0.0 | 304.0..3100.0 | -0..840 | batts, blocking, flash, flash-nails, gasket, membrane, membrane-top, plate1, plate2, sheath-top, sill, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500, studs | 06 A10; 07 G2 |
| sheath-top | Sheathing between joists to deck | frame | B | -12.0..0.0 | 3100.0..3335.0 | -0..840 | blocking, deck, joists, membrane, membrane-top, plate2, sheath | 06 B21 |
| sill | PT sill plate 38x140, flush with foundation face | frame | A | 0.0..140.0 | 304.0..342.0 | -0..900 | anchor, batts, flash-nails, gasket, sheath, studs, vpoly, washer | 06 A8; 07 D13 |
| slab | Concrete slab 100 | concrete | D | 275.2..900.0 | 200.0..300.0 | -0..900 | soilgas | 07 D9 |
| slat-1 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -785.0..-655.0 | 405.0..450.0 | 90..810 | apron-1, post-1, rail | 06 C9 |
| slat-2 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -923.0..-793.0 | 405.0..450.0 | 90..810 | rail | 06 C9 |
| slat-3 | Oak seat slat 45x130, 8 mm gaps | furniture | C | -1061.0..-931.0 | 405.0..450.0 | 90..810 | apron-2, post-2, rail | 06 C9 |
| soffit-in | Larch soffit boards 19 | cladding | B | -360.0..-63.1 | 3081.0..3100.0 | -0..750 | closure, ei, ei-top, frieze, screen-top, soffit-mesh | 06 B20 |
| soffit-mesh | Soffit vent insect mesh | metal | B | -403.0..-357.0 | 3080.5..3081.0 | -0..750 | soffit-in, soffit-out | 06 B20 |
| soffit-out | Larch soffit boards 19 | cladding | B | -679.6..-400.0 | 3081.0..3100.0 | -0..750 | fascia, joists, soffit-mesh | 06 B20 |
| soilgas | 0.25 mm soil-gas / air barrier, lapped 300, up slab edge, sealed to ledge | air | D | 141.0..900.0 | 199.8..300.2 | -0..900 | edge-xps, fwall, slab, vpoly, xps-b | 07 D8; 07 D10 |
| strap | PT strapping 19x64 on stud lines | frame | G | -82.1..-63.1 | 232.0..3043.0 | 47..517 | closure, ei, paper, screen-base, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500 | 07 G4; 06 A13 |
| strap-screw-1100 | Strapping screw through insulation into stud | metal | G | -82.1..75.0 | 1097.0..1103.0 | 76..488 | ei, membrane, paper, sheath, strap, studs | 07 G4; 07 G.2(d) |
| strap-screw-1700 | Strapping screw through insulation into stud | metal | G | -82.1..75.0 | 1697.0..1703.0 | 76..488 | ei, membrane, paper, sheath, strap, studs | 07 G4; 07 G.2(d) |
| strap-screw-2300 | Strapping screw through insulation into stud | metal | G | -82.1..75.0 | 2297.0..2303.0 | 76..488 | ei, membrane, paper, sheath, strap, studs | 07 G4; 07 G.2(d) |
| strap-screw-2900 | Strapping screw through insulation into stud | metal | G | -82.1..75.0 | 2897.0..2903.0 | 76..488 | ei, membrane, paper, sheath, strap, studs | 07 G4; 07 G.2(d) |
| strap-screw-500 | Strapping screw through insulation into stud | metal | G | -82.1..75.0 | 497.0..503.0 | 76..488 | ei, membrane, paper, sheath, strap, studs | 07 G4; 07 G.2(d) |
| stripin | SBS strip-in over flange, 101.6 onto field | water | B | -706.0..-486.6 | 3519.0..3522.6 | -0..680 | basesheet, capsheet, edge-fasteners-a, edge-fasteners-b, edge-metal | 06 B16 |
| stucco | Three-coat cement stucco 22 | cladding | G | -104.6..-82.6 | 230.0..3020.0 | -0..500 | bead-base, bead-top, lath, paper | 07 G9b; 06 A15a |
| studs | Studs 38x140 at 400 | frame | G | 0.0..140.0 | 342.0..3024.0 | 60..900 | batts, plate1, sheath, sill, strap-screw-1100, strap-screw-1700, strap-screw-2300, strap-screw-2900, strap-screw-500, vpoly | 07 G1 |
| topsoil | Topsoil, 5 % fall for 3 m | ground | F | -1300.0..-305.5 | -189.9..-15.2 | -0..900 | backfill, edging, pier-1, pier-2 | 07 F6 |
| vpoly | 6 mil poly air/vapour barrier, sealed to sill and lapped onto slab barrier | air | D | 140.0..180.0 | 300.2..3100.0 | -0..900 | batts, epdm, foam, gasket, gypsum, joists, plate1, plate2, sill, soilgas, studs | 07 D14; 06 B2 |
| washer | Plate washer | metal | D | 45.0..95.0 | 342.0..347.0 | 675..725 | anchor, batts, nut, sill | 07 D13 |
| xbrace-1 | Oak knee brace across the bench, 45x45 | furniture | C | -840.0..-765.0 | 240.0..315.0 | 128..772 | post-1, rail | 06 C8 |
| xbrace-2 | Oak knee brace across the bench, 45x45 | furniture | C | -935.0..-860.0 | 240.0..315.0 | 128..772 | post-2, rail | 06 C8 |
| xps-a | Under-slab XPS 38 (layer 1 of 2, staggered) | thermal | D | 200.0..900.0 | 123.8..161.8 | -0..900 | fwall, granular, xps-b | 07 D6 |
| xps-b | Under-slab XPS 38 (layer 2 of 2) | thermal | D | 200.0..900.0 | 161.8..199.8 | -0..900 | edge-xps, fwall, soilgas, xps-a | 07 D6 |

## Spec parts missing from model

- none
