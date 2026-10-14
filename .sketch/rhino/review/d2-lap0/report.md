# Review packet

Spec: C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\detail02.json
Version: d2v1

## Floating parts (touch nothing)
- none

## Clashes (overlap > 1 mm3, not declared in `embeds`)
- none

## Parts

| id | name | role | junction | x | y | w | touches | src |
|---|---|---|---|---|---|---|---|---|
| avb | Self-adhered air/vapour control layer on deck (pre-strip at wall line) | air | R | -575.0..2500.0 | 3287.0..3290.0 | -0..1800 | deck, fascia, nailer-1, roofins-1 | 06 B8; 06 B9 |
| band-cedar | Western red cedar channel siding 19, bleaching oil | cladding | H | -89.6..-70.6 | 2752.0..2958.0 | -0..1300 | band-strap, band-vent | 09 W1; user decision |
| band-closure | PT cavity-top closure (cavity not open to soffit) | frame | H | -70.6..-51.6 | 2978.0..3017.0 | -0..1400 | band-ei, band-strap, soffit | 06 B22 |
| band-ei | Stone-wool board 75 on lintel face (head band) | thermal | H | -51.6..23.4 | 2748.0..3017.0 | -0..1500 | band-closure, band-screen, band-strap, head-flashing, head-stripin | 11 H9; 09 alternate |
| band-screen | Insect screen ≤ 2 mm at band cavity base | metal | H | -70.6..-51.6 | 2749.5..2750.0 | -0..1400 | band-ei, band-strap | 08 L; 06 A14 |
| band-strap | PT strapping 19x64 | frame | H | -70.6..-51.6 | 2750.0..2978.0 | 47..1309 | band-cedar, band-closure, band-ei, band-screen | 06 A13 |
| band-vent | Insect screen across cavity-top vent slot | metal | H | -90.1..-72.6 | 2958.0..3017.0 | -0..1400 | band-cedar, soffit | 06 B22 |
| base-1 | No. 57 base 150 on compacted subgrade (infiltrating) | drainage | H | -2000.0..-1852.0 | -324.6..-171.6 | -0..1800 | base-2, bedding-1, bedding-2, pocket-curb, subgrade | 08 H |
| base-2 | No. 57 base 150 on compacted subgrade (infiltrating) | drainage | H | -3200.0..-2000.0 | -348.6..-174.6 | -0..1800 | base-1, base-3, bedding-1, bedding-2, bedding-3, pocket-curb, pocket-curb-2, pocket-curb-w, root-barrier-pocket, subgrade | 08 H |
| base-3 | No. 57 base 150 on compacted subgrade (infiltrating) | drainage | H | -3250.0..-3200.0 | -349.6..-198.6 | -0..1800 | base-2, bedding-2, bedding-3, edge-restraint, pocket-curb-2, subgrade | 08 H |
| base-lined | No. 57 open-graded base 150, filling the underdrain trench | drainage | M | -1848.0..-173.5 | -476.6..-138.0 | -0..1800 | bedding-lined, liner, rainwater-line, subgrade, underdrain | 08 H |
| beam | Engineered reinforced grade beam + footing under the opening (Part 4) | concrete | T | -120.0..331.0 | -470.0..-181.0 | -0..1800 | beam-xps, dampproof, interior-subgrade, perinsul, stone, subgrade | 12 foundation; 11 T1 |
| beam-xps | XPS (HFO) 75 on beam face, footing to under the block course | thermal | T | -96.0..-21.0 | -320.0..-181.0 | -0..1800 | beam, dampproof, subgrade | 11 T2; 07 D7 |
| bed-mulch | Wood-chip mulch 75, leaf litter left | ground | I | -5150.0..-3400.0 | -533.1..-69.6 | -0..1800 | bed-soil, edge-restraint, rainwater-line, rg-medium, tree | 08 I |
| bed-soil | Planting bed growing medium 450, 15 % organic, <= 80 % compaction (bank about 22 %) | ground | I | -5150.0..-3400.0 | -983.1..-144.6 | -0..1800 | bed-mulch, edge-restraint, rainwater-line, rg-medium, root-barrier-path, subgrade, tree | 08 I |
| bedding-1 | No. 8 bedding 50 | drainage | H | -2000.0..-1852.0 | -174.6..-121.6 | -0..1800 | base-1, base-2, bedding-2, pavers-1, pavers-2, pavers-lined, pocket-curb | 08 H |
| bedding-2 | No. 8 bedding 50 | drainage | H | -3200.0..-2000.0 | -198.6..-124.6 | -0..1800 | base-1, base-2, base-3, bedding-1, bedding-3, pavers-1, pavers-2, pavers-3, pocket-curb, pocket-curb-2, pocket-curb-w | 08 H |
| bedding-3 | No. 8 bedding 50 | drainage | H | -3250.0..-3200.0 | -199.6..-148.6 | -0..1800 | base-2, base-3, bedding-2, edge-restraint, pavers-2, pavers-3, pocket-curb-2 | 08 H |
| bedding-lined | No. 8 open-graded bedding 50 | drainage | M | -1848.0..-173.5 | -171.5..-88.0 | -0..1800 | base-lined, liner, pavers-lined | 08 H |
| blocking | Full-depth blocking, caulked 4 sides | frame | R | 25.0..63.0 | 3036.0..3271.0 | -0..1800 | deck, foam, head-membrane, joists, lintel, membrane-top | 06 B4 |
| ceiling | Gypsum ceiling 12.7 (no ceiling poly: exterior-insulated roof) | frame | R | 185.0..2500.0 | 3023.3..3036.0 | -0..1800 | foam, joists | ABC 16 |
| channel | Polymer-concrete trench channel, inner 130, invert −120, side inlets for track weeps | drainage | T | -171.5..-21.5 | -130.0..-8.0 | -0..1800 | grate, grate-screen, haunch, liner, nosing, pan, pavers-lined, track-weeps | 11 T16; 08b M |
| coverboard | Cover board 12 | frame | R | -435.0..2500.0 | 3440.0..3510.7 | -0..1550 | membrane-roof, nailer-4, nailer-5, roofins-2 | 06 B12 |
| dampproof | Water-based damp-proofing on beam face (XPS-compatible) | water | T | -21.0..-20.0 | -320.0..-181.0 | -0..1800 | beam, beam-xps, perinsul | 07 E6; ABC loop2 N10 |
| deck | Plywood roof deck 16 | frame | R | -575.0..2500.0 | 3271.0..3287.0 | -0..1800 | avb, blocking, ei-top, fascia, foam, joists, membrane-top | 06 B7 |
| drain-mat | Drainage/retention board 20 | drainage | R | -98.5..2500.0 | 3467.3..3539.3 | -0..1450 | gr-edge-profile, growing-medium | 09 d |
| edge-metal | 24 ga metal edge over membrane, drip 12 off face | water | R | -619.5..-490.0 | 3339.8..3459.6 | -0..1500 | membrane-roof, nailer-3 | 06 B15 |
| edge-restraint | Cast-in-place concrete edge restraint | concrete | H | -3400.0..-3250.0 | -369.6..-69.6 | -0..1800 | base-3, bed-mulch, bed-soil, bedding-3, pavers-3, root-barrier-path, subgrade | 08 H |
| ei-top | Stone-wool infill between joists (wall-line thermal continuity) | thermal | R | -51.6..24.4 | 3036.0..3271.0 | -0..1800 | deck, joists | 06 B6 |
| eps-1 | Graphite EPS Type 2, 50 (layer 1) | thermal | F | 231.2..2500.0 | -200.2..-150.2 | -0..1800 | eps-2, stone | 12 build-up |
| eps-2 | Graphite EPS Type 2, 50 (layer 2, joints staggered) | thermal | F | 231.2..2500.0 | -150.2..-100.2 | -0..1800 | eps-1, soilgas | 12 build-up |
| fascia | Cedar fascia 25 on joist ends and nailer | cladding | R | -600.0..-575.0 | 3006.0..3452.0 | -0..1650 | avb, deck, gutter-spacers, joists, membrane-roof, nailer-1, nailer-2, nailer-3, nailer-4, nailer-5, soffit | 06 B18 |
| foam | Closed-cell spray foam air tie, lintel to deck | air | R | 63.0..185.0 | 3036.0..3271.0 | -0..1800 | blocking, ceiling, deck, joists, lintel | 06 B5 |
| frieze | Cedar frieze on soffit, vent slot below | cladding | H | -115.6..-96.6 | 2978.0..3017.0 | -0..1500 | soffit | 06 B24 |
| glass-1 | Triple IGU pane 1 (4 mm, low-e, argon, warm edge), safety glass | cladding | T | 28.0..32.0 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4 |
| glass-2 | Triple IGU pane 2 (4 mm, low-e, argon, warm edge), safety glass | cladding | T | 48.0..52.0 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4 |
| glass-3 | Triple IGU pane 3 (4 mm, low-e, argon, warm edge), safety glass | cladding | T | 68.0..72.0 | 60.0..2630.0 | -0..1800 | sash, sash-top | 11 R1; V2 9.6.1.4 |
| gr-edge-profile | Perforated green-roof edge profile | metal | R | -100.0..-40.0 | 3465.7..3565.7 | -0..1500 | drain-mat, gravel-edge, growing-medium, membrane-roof | 09 d |
| grate | Stainless heel-safe grate, slots ≤ 6.5 mm parallel to the door, top −8 | metal | T | -161.5..-31.5 | -28.0..-8.0 | -0..1800 | channel, grate-screen | 08b M; B651 4.3.4 |
| grate-screen | Dirt screen 1.0–1.2 mm under grate | metal | T | -161.5..-31.5 | -28.5..-28.0 | -0..1800 | channel, grate | 11 T16 |
| gravel-edge | Washed gravel edge strip 60 (green-roof fire/vegetation-free zone) | drainage | R | -488.0..-100.0 | 3459.0..3525.7 | -0..1500 | gr-edge-profile, membrane-roof | 09 d |
| grout | Chloride-free self-levelling grout around the track | concrete | T | 0.0..229.5 | -78.3..0.0 | -0..1800 | pan, track, track-weeps | 11 T14 |
| growing-medium | Extensive growing medium 80 | ground | R | -98.5..2500.0 | 3487.3..3619.3 | -0..1400 | drain-mat, gr-edge-profile, sedum | 09 d |
| gutter | Prefinished gutter on 8 mm stand-offs, leaf screen | water | R | -743.3..-608.0 | 3223.7..3334.0 | -0..1700 | gutter-spacers | 06 B19; 08 J; 11 H13 |
| gutter-spacers | Stainless stand-offs 8 | metal | R | -608.0..-600.0 | 3302.0..3322.0 | 290..1510 | fascia, gutter | ABC 3 |
| haunch | Concrete haunch under channel | concrete | T | -171.5..-21.5 | -165.0..-130.0 | -0..1800 | channel, liner, pan, subgrade | 11 T16 |
| head-flashing | Head flashing 24 ga prefinished, 6 % fall, drip 5 past cladding, end dams | water | H | -98.8..24.5 | 2733.8..2830.0 | -0..1800 | band-ei, head-membrane, head-stripin | 11 H10; 01 req.flashing-geometry |
| head-gap | Compressible insulation in head gap (no expanding foam) | thermal | H | 0.0..180.0 | 2730.0..2742.0 | -0..1800 | head-membrane, head-track | 11 H6 |
| head-membrane | Head air/water membrane, lintel face into rough head | air | H | 24.5..100.0 | 2742.0..3036.0 | -0..1800 | blocking, head-flashing, head-gap, joists, lintel, membrane-top, packer | 11 H4 |
| head-stripin | Self-adhered strip-in lapping 70 over the flashing upstand | water | H | 23.4..23.9 | 2760.0..2900.0 | -0..1800 | band-ei, head-flashing | 11 H4; NRC-WWI shingle order |
| head-track | Head track / head jamb | frame | H | 0.0..180.0 | 2690.0..2730.0 | -0..1800 | head-gap, sash-top | 11 H5 |
| interior-subgrade | Compacted subgrade under the slab | ground | F | 331.0..2500.0 | -1700.0..-300.0 | -0..1800 | beam, stone, subgrade | 12 |
| joists | Roof joists 38x235 over lintel, 575 cantilever | frame | R | -575.0..2500.0 | 3036.0..3271.0 | 60..1692 | blocking, ceiling, deck, ei-top, fascia, foam, head-membrane, lintel, membrane-top, soffit | 06 B3 |
| liner | 1.0 mm HDPE liner between geotextiles, turned up at the channel and as a cut-off at 1.85 m | water | M | -1850.0..-171.5 | -478.6..-88.0 | -0..1800 | base-lined, bedding-lined, channel, haunch, pavers-lined, rainwater-line, subgrade | 08b M |
| lintel | Glulam lintel 130x266 (engineer: deflection ≤ 3 mm) | frame | H | 25.0..155.0 | 2770.0..3036.0 | -0..1800 | blocking, foam, head-membrane, joists, membrane-top, packer | 11 H1 |
| membrane-roof | 2-ply SBS, root-resistant cap (green roof) | water | R | -607.0..2500.0 | 3400.0..3517.7 | -0..1500 | coverboard, edge-metal, fascia, gr-edge-profile, gravel-edge, nailer-5, roofins-2 | 09 d; RCABC |
| membrane-top | Air/water membrane on blocking face to deck (bays) | water | R | 24.5..25.0 | 3036.0..3271.0 | -0..1800 | blocking, deck, head-membrane, joists, lintel | 06 B21 |
| nailer-1 | PT nailer ply 1 of 4 | frame | R | -575.0..-435.0 | 3290.0..3328.0 | -0..1700 | avb, fascia, nailer-2, roofins-1 | 06 B11; ABC 13 |
| nailer-2 | PT nailer ply 2 of 4 | frame | R | -575.0..-435.0 | 3328.0..3366.0 | -0..1700 | fascia, nailer-1, nailer-3, roofins-1, roofins-2 | 06 B11; ABC 13 |
| nailer-3 | PT nailer ply 3 of 4 | frame | R | -575.0..-435.0 | 3366.0..3404.0 | -0..1700 | edge-metal, fascia, nailer-2, nailer-4, roofins-2 | 06 B11; ABC 13 |
| nailer-4 | PT nailer ply 4 of 4 | frame | R | -575.0..-435.0 | 3404.0..3442.0 | -0..1700 | coverboard, fascia, nailer-3, nailer-5, roofins-2 | 06 B11; ABC 13 |
| nailer-5 | PT nailer rip 10 | frame | R | -575.0..-435.0 | 3442.0..3452.0 | -0..1700 | coverboard, fascia, membrane-roof, nailer-4 | 06 B11; ABC 13 |
| nosing | Bevelled sill nosing 1:2, +5 to −8 | metal | T | -26.0..0.0 | -20.0..5.0 | -0..1800 | channel, track | 11 §3.1; B651 5.2.6 |
| packer | PT packer, continuous flat head surface | frame | H | 25.0..155.0 | 2742.5..2770.0 | -0..1800 | head-membrane, lintel | 11 H3 |
| pan | Liquid-applied sill pan: back dam to −15, 6 % floor, 50 downturn by the channel | water | T | -21.5..231.0 | -131.0..-15.0 | -0..1800 | channel, grout, haunch, perinsul, soilgas, wedge | 11 T6; LOE-INST; NRC-WWI |
| pavers-1 | Concrete permeable pavers 80 (unlined) | ground | H | -2000.0..-1852.0 | -124.6..-41.6 | -0..1800 | bedding-1, bedding-2, pavers-2, pavers-lined, pocket-curb | 08 H7 |
| pavers-2 | Concrete permeable pavers 80 (unlined) | ground | H | -3200.0..-2000.0 | -148.6..-44.6 | -0..1800 | bedding-1, bedding-2, bedding-3, pavers-1, pavers-3, pocket-curb, pocket-curb-2, pocket-curb-w | 08 H7 |
| pavers-3 | Concrete permeable pavers 80 (unlined) | ground | H | -3250.0..-3200.0 | -149.6..-68.6 | -0..1800 | bedding-2, bedding-3, edge-restraint, pavers-2, pocket-curb-2 | 08 H7 |
| pavers-lined | Concrete pavers 80, joints ≤ 6 mm, BPN ≥ 55 (lined landing) | ground | M | -1852.0..-171.5 | -121.6..-8.0 | -0..1800 | bedding-1, bedding-lined, channel, liner, pavers-1, person-terrace | 08b M; 08 H7 |
| perinsul | Load-bearing cellular-glass block course 100 (thermal break under the track) | thermal | T | -20.0..231.0 | -181.0..-81.0 | -0..1800 | beam, dampproof, pan, soilgas, wedge | 12 PERINSUL HL; 11 T9 (PUR alternate) |
| person-inside | Occupant standing inside (proxy) | furniture | K | 920.0..1280.0 | 0.0..1700.0 | 520..880 | slab | 08 K |
| person-terrace | Person on the terrace (proxy) | furniture | K | -1480.0..-1120.0 | -34.2..1665.8 | 920..1280 | pavers-lined | 08 K |
| pocket-curb | Flush concrete curb ring around the shrub pocket (x sides) | concrete | M | -2100.0..-2000.0 | -326.6..-44.6 | 300..1500 | base-1, base-2, bedding-1, bedding-2, pavers-1, pavers-2, pocket-curb-w, pocket-soil, root-barrier-pocket, subgrade | 08b M |
| pocket-curb-2 | Flush concrete curb ring (far side) | concrete | M | -3200.0..-3100.0 | -348.6..-66.6 | 300..1500 | base-2, base-3, bedding-2, bedding-3, pavers-2, pavers-3, pocket-curb-w, pocket-soil, subgrade | 08b M |
| pocket-curb-w | Flush concrete curb ring (w sides) | concrete | M | -3100.0..-2100.0 | -346.6..-46.6 | 300..1500 | base-2, bedding-2, pavers-2, pocket-curb, pocket-curb-2, pocket-soil, subgrade | 08b M |
| pocket-soil | Growing medium 600 in the shrub pocket, mulch 40 below curb | ground | M | -3100.0..-2100.0 | -706.6..-86.6 | 400..1400 | pocket-curb, pocket-curb-2, pocket-curb-w, shrub, subgrade | 08b M |
| rainwater-line | Solid PVC rainwater line 100 at 1 %, downspout + channel + underdrain to rain garden | drainage | J | -5710.5..-199.5 | -513.7..-348.6 | 1545..1655 | base-lined, bed-mulch, bed-soil, liner, rg-medium, root-barrier-path, subgrade, underdrain | 08 J; 11 T17; 08b M |
| rg-choker | Choker layer 100 | drainage | J | -7700.0..-5150.0 | -1283.1..-1183.1 | -0..1800 | rg-medium, rg-riser, rg-rock, subgrade | 08 J |
| rg-medium | Bioretention medium 450 (>= 70 mm/h) | ground | J | -7700.0..-5150.0 | -1183.1..-458.1 | -0..1800 | bed-mulch, bed-soil, rainwater-line, rg-choker, rg-mulch, rg-riser, subgrade | 08 J |
| rg-mulch | Rain garden mulch 75 | ground | J | -7100.0..-5750.0 | -733.1..-658.1 | -0..1800 | rg-medium, rg-riser | 08 J |
| rg-riser | Overflow riser 200 (top 100 below rim) to detention tank and storm | drainage | J | -6505.0..-6295.0 | -1418.1..-558.1 | 795..1005 | rg-choker, rg-medium, rg-mulch, rg-rock, rg-subdrain | 08 J; VBBL Book II 2.4.2.5 |
| rg-rock | Clear rock reservoir 300 with subdrain | drainage | J | -7700.0..-5150.0 | -1583.1..-1283.1 | -0..1800 | rg-choker, rg-riser, rg-subdrain, subgrade | 08 J |
| rg-subdrain | Perforated subdrain 150 to the overflow riser | drainage | J | -6480.0..-6320.0 | -1578.1..-1418.1 | -0..1800 | rg-riser, rg-rock | 08 J |
| roofins-1 | Low-GWP polyiso 75 | thermal | R | -435.0..2500.0 | 3290.0..3365.0 | -0..1650 | avb, nailer-1, nailer-2, roofins-2 | 09 d |
| roofins-2 | Low-GWP polyiso tapered, 2 % to eave | thermal | R | -435.0..2500.0 | 3365.0..3498.7 | -0..1600 | coverboard, membrane-roof, nailer-2, nailer-3, nailer-4, roofins-1 | 09 d |
| root-barrier-path | Ribbed HDPE root barrier 600 at the path edge | planting | I | -3402.0..-3400.0 | -746.6..-146.6 | -0..1800 | bed-soil, edge-restraint, rainwater-line, subgrade | 08 I |
| root-barrier-pocket | Ribbed HDPE root barrier 600 deep under the house-side curb | planting | M | -2051.0..-2049.0 | -925.6..-325.6 | 300..1500 | base-2, pocket-curb, subgrade | 08b M |
| sash | Lift-and-slide sash, bottom rail (fibreglass) | frame | T | 15.0..85.0 | 10.0..120.0 | -0..1800 | glass-1, glass-2, glass-3 | 11 R1 |
| sash-top | Sash top rail | frame | H | 15.0..85.0 | 2600.0..2690.0 | -0..1800 | glass-1, glass-2, glass-3, head-track | 11 R1 |
| sedum | Biodiverse sedum and native forb mat | ground | R | -98.5..2500.0 | 3567.3..3657.7 | -0..1350 | growing-medium | 09 d; 08 L |
| shrub | Evergreen huckleberry (Vaccinium ovatum), pruned 1.5 m (proxy) | planting | M | -3200.0..-2000.0 | -96.6..1403.4 | 300..1500 | pocket-soil | 08b M |
| slab | Low-carbon concrete slab 100, ground/polished finish (mineral apron at the sill) | concrete | F | 231.2..2500.0 | -100.0..0.0 | -0..1800 | person-inside, soilgas | 12 build-up; 11 T20 |
| soffit | Cedar soffit 19, open-joint vent with screen | cladding | R | -575.0..-52.1 | 3017.0..3036.0 | -0..1500 | band-closure, band-vent, fascia, frieze, joists | 06 B20; 10 |
| soilgas | 0.25 mm soil-gas / air barrier, up the slab edge to the pan back dam | air | F | 231.0..2500.0 | -100.2..-15.0 | -0..1800 | eps-2, pan, perinsul, slab, wedge | 12 sealing; 11 T7 |
| stone | Clear stone 100, gas-permeable layer and capillary break | drainage | F | 231.0..2500.0 | -320.0..-200.2 | -0..1800 | beam, eps-1, interior-subgrade | 12 build-up |
| subgrade | Compacted subgrade / native soil | ground | E | -8000.0..331.0 | -1700.0..-165.0 | -0..1800 | base-1, base-2, base-3, base-lined, beam, beam-xps, bed-soil, edge-restraint, haunch, interior-subgrade, liner, pocket-curb, pocket-curb-2, pocket-curb-w, pocket-soil, rainwater-line, rg-choker, rg-medium, rg-rock, root-barrier-path, root-barrier-pocket | 07 E1; 08 H |
| track | Lift-and-slide sill/track (fibreglass, 2 tracks), top +5, level ±1 mm | metal | T | 0.0..180.0 | -42.0..5.0 | -0..1800 | grout, nosing | 11 T11; MAR-ULS |
| track-weeps | Track drain tubes through the open slot face into the channel | water | T | -40.0..40.0 | -61.0..-49.0 | 294..1506 | channel, grout | 11 T12 |
| tree | Small tree (Amelanchier alnifolia) trunk + canopy (proxy) | planting | I | -5700.0..-3100.0 | -366.6..4008.4 | -400..2200 | bed-mulch, bed-soil | 08 I |
| underdrain | Perforated PVC underdrain 100 at the liner low point, tees into the rainwater line | drainage | M | -1755.0..-1645.0 | -473.6..-363.6 | -0..1800 | base-lined, rainwater-line | 08b M |
| wedge | Mortar bed sloped 6 % outward (pan bed) | concrete | T | -20.0..231.0 | -81.0..-66.0 | -0..1800 | pan, perinsul, soilgas | 11 T4 |

## Drawing notes

- **beam**: Grade beam and footing by a structural engineer; underside 450+ below exterior grade (frost); sill support level within 1 mm over the opening.
- **perinsul**: FOAMGLAS PERINSUL HL (λ 0.058, 2.75 MPa); Canadian supply unconfirmed — alternate: Purenit/Phonotherm PUR block 50 (research/11 T9).
- **stone**: Radon rough-in per VBBL 9.13.4.3: inlet near slab centre, pipe sealed at the barrier (outside this slice).
- **pan**: End dams 150+ up the jambs (outside this slice); jamb membranes lap over the end dams.
- **track**: Two sealant beads under the track (A440.4); screw holes sealed; drains fixed before grouting.
- **lintel**: 5 m span at L/1667 needs engineering; a steel or flitch beam may be required.
- **head-flashing**: Fastened through the upstand above the water line; head membrane laps over the upstand.
- **joists**: Toe-nails and uplift ties per joist; green-roof load to be checked by the engineer (09).
- **edge-metal**: Continuous cleat and hemmed drip as Detail 01 v2 (ABC 2); strip-in over the flange.
- **gutter**: Downspout at the end of the opening with a boot + cleanout; leader piped (solid PVC, 1 %) to the rain garden, never onto the landing.
- **channel**: Full opening width + 150 each side; outlet at the channel end through a silt box and cleanout into the solid rainwater line (never the foundation drain).
- **rainwater-line**: Sealed boot where it passes the liner trench; tee with the underdrain; sleeve through the root barrier; surfaces at the garden rim onto a splash rock, 50+ above the overflow; no fittings within 700 mm of the foundation.

## Spec parts missing from model

- none
