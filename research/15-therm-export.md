# 15 — THERM export: writing a THERM project file from The Living Edge

Researched: 2026-10-13. Status: **research draft**. It is not an approved library entry and no exporter code exists yet.

**Question.** Can a Node exporter take our section parts and write a file that LBNL THERM opens directly, ready to mesh and run for a certified U-factor? Each part is a closed polygon in mm (x horizontal, exterior negative; y up) with a material name and k in W/m·K. The section also has air cavities, thin membranes drawn as polygons, exterior and interior boundaries, an adiabatic cut edge, film coefficients and U-factor tags. If it can, which file format, what is the minimum content, and what can only a test in THERM settle?

---

## 0. How to read this file

### 0.1 Tags

| tag | meaning |
|---|---|
| **(S)** | SOURCED. Read this session in the opened source: a web page, source code, a schema, a real example file, or PDF text extracted locally with `pdftotext`. Source keys are in §0.2. |
| **(S\*)** | SOURCED from a search-engine summary only. The page itself was not opened or was refused (HTTP 403). Treat it as a lead. |
| **(I)** | INFERRED. My reading of code or schemas, a consequence of other facts, or a judgement. The reason is given. |

### 0.2 Sources

| key | source | what was read |
|---|---|---|
| L1 | LBNL, THERM Software Downloads and release notes — https://windows.lbl.gov/therm-software-downloads | version list, 8.1 and 7.8.x notes (fetched twice) |
| L2 | LBNL, WINDOW 8.1 / THERM 8.1 Beta Releases — https://windows.lbl.gov/window-81-therm-81-beta-releases | THMZ, beta status, THM→THMZ conversion |
| L3 | LBNL, Using THERM in Command Line Mode — https://windows.lbl.gov/using-therm-command-line-mode | CLI availability and registration |
| L4 | LBNL, THERM Documentation — https://windows.lbl.gov/node/31 | list of manuals, samples and the NFRC manual |
| L5 | THERM 7 User Manual ch. 3, Quick Start (June 2019) — https://windows.lbl.gov/sites/default/files/software/THERM/Therm7-03-QuickStart.pdf | §3.6 boundary conditions |
| L6 | THERM 7 User Manual §5.14, Drawing Tips (July 2019) — https://windows.lbl.gov/sites/default/files/software/THERM/Therm7-05-14-DrawingTips.pdf | DXF, units, arcs, autoconvert |
| L7 | THERM7/WINDOW7 NFRC Simulation Manual (July 2016 text; file named July 2017) — https://windows.lbl.gov/sites/default/files/Downloads/NFRCSim7-July2017.pdf | §6.3, §6.5, §6.6 (BCs, tags, voids, mesh, orientation). A July 2024 edition is linked from L4 and was not read. |
| L8 | LBNL, Updated Boundary Condition Library — https://windows.lbl.gov/updated-boundary-condition-library | 20° tilt interior h values |
| G1 | LBNL-ETA/LibraryFEMTherm v0.23.3 — https://github.com/LBNL-ETA/LibraryFEMTherm | README, `doc/python.md`, `src/Schemas/THMX Schema/{Therm,Geometry,Common,FileProperties,Preferences}.xsd`, `BC Steady State.xsd`, `BoundaryConditionsSteadyState.xml`, `Materials.xsd`, `UFactors.thml`, `src/THMZ/Model/migration/FrameCavity.hxx`, commit messages of 2026-05-18 and 2026-05-26, repository tree |
| G2 | LBNL-ETA/THMXParser — https://github.com/LBNL-ETA/THMXParser | README, `src/thmxParser.hpp`, real file `test/files/CS03.thmx` (THERM 7.5.18) |
| G3 | ladybug-tools/fairyfly-therm (pushed 2026-09-22) — https://github.com/ladybug-tools/fairyfly-therm | `writer.py`, `run.py`, `_templates/Default.xml`, `material/solid.py`, `material/cavity.py`, `condition/steadystate.py`, `simulation/mesh.py`, `simulation/exposure.py`, `lib/_loadconditions.py`, `lib/conditions.py`, `config.py`, `tests/assets/xml/{Materials,BoundaryConditionsSteadyState}.xml` |
| G4 | ladybug-tools/honeybee-legacy — https://github.com/ladybug-tools/honeybee-legacy | `src/Honeybee_Write THERM File.py`, `src/Honeybee_Honeybee.py` (`thermDefaults`, `thermBC`), `src/Honeybee_Create Therm Boundaries.py` |
| G5 | hendersontylerjohn/Thm-Reader — https://github.com/hendersontylerjohn/Thm-Reader | README |
| G6 | LBNL-ETA/HygroThermFEM — https://github.com/LBNL-ETA/HygroThermFEM | repository listing only |
| F1 | Ladybug forum, "Therm7.8 Compatiblity" (Apr–May 2026) — https://discourse.ladybug.tools/t/therm7-8-compatiblity/40333 | whole thread |
| F2 | Ladybug forum, "Error writing Therm (.thmx) file from Honeybee" (Dec 2018) — https://discourse.ladybug.tools/t/error-writing-therm-thmx-file-from-honeybee/4605 | whole thread |
| N1 | NFRC software approval — https://nfrccommunity.org/page/Software and windowanddoor.com news "NFRC approves LBNL WINDOW 7.8.71 / THERM 7.8.71" | search summary only; the NFRC page returned 403 |
| F3 | LBNL-THERM Google Group, "Issue Importing AutoCAD DXF File into THERM 7.8.71" — https://groups.google.com/g/LBNL-THERM/c/t565R_sRYsI | search summary only |

No installer was downloaded or run. The binary `.thmz` samples in G1 and G3 were found but **not downloaded**: they are listed in §2.4 as files to open in a later step. GitHub searches for "thmz" also return many new repositories described only as "content". They look like spam: do not use them.

---

## 1. Answer in brief

1. **Three formats exist** (S, L1/L2/F1/G5):
   - THERM 7 **`.thm`**: binary and undocumented.
   - THERM 7 **`.thmx`**: a single plain-XML file, "THERM-XML".
   - THERM 8 **`.thmz`**: a zip of XML files with published XSD schemas (G1).
2. **THMZ is the best documented and the easiest to validate.** It has:
   - XSDs and an LBNL C++/Python reader-writer (G1);
   - a working open-source writer that runs THERM 8 from the command line (G3).
   
   **But THERM 8.1 is still BETA.** LBNL says it is "not recommended … for conventional thermal modeling" (S, L1/L2; 8.1.68 released 2026-10-08). The NFRC-approved build that turned up is **THERM 7.8.71** (S\*, N1). THMZ is therefore not a certified-run format today (I).
3. **THMX is the practical certified route.** It is the format THERM 7 itself writes and reads:
   - the release notes refer to THMX files "opened in THERM" and to a "THMX schema" (S, L1);
   - Honeybee generated THMX and ran it in THERM 7.5/7.6 with a `-thmx … -calc` command line (S, G4/F2);
   - LBNL keeps a THMX parser and a real THERM-written example (S, G2).
   
   There is no published THMX schema. The skeleton in §6 is reconstructed from the real file, the Honeybee writer and the LBNL parser's data model (I).
4. **Boundary segments.** Both open-source writers write them explicitly: every perimeter and cavity edge, with BC name, U-factor tag, emissivity and adjacent polygon (S, G3/G4). THERM's own "generate boundary conditions" step (F10) redraws the perimeter with **Adiabatic** on every segment (S, L5). An exporter that leaves boundaries out hands all BC and tag assignment back to the modeller (I). **Write them explicitly.**
5. **Recommendation (§7).** Write a self-contained **THMX** file for THERM 7.8 from one format-neutral "section model" (polygons + boundary segments). Keep the THMZ serializer as a second back end, ready for when THERM 8 is NFRC-approved.

---

## 2. File formats

### 2.1 Overview

| | THERM 7 `.thm` | THERM 7 `.thmx` (THERM-XML) | THERM 8 `.thmz` |
|---|---|---|---|
| Encoding | binary (S, G5, F1) | one XML file, root `<THERM-XML xmlns="http://windows.lbl.gov">`, mostly attributes (S, G2 `CS03.thmx`) | zip of `Model.xml`, `Materials.xml`, `Gases.xml`, `SteadyStateBC.xml`, plus result files after a run (S, G1 `doc/python.md`, G3 `writer.py`) |
| Official documentation | none public (I) | release notes mention a "THMX schema" (S, L1, 7.8.24: "Update THMX schema to contain CMA results"); the schema was not found published (I) | XSDs in `src/Schemas/THMX Schema/` and library XSDs (S, G1) |
| LBNL code | — | THMXParser, C++ reader only (S, G2) | LibraryFEMTherm, C++20 read/write, Python bindings `pip install libraryfemtherm` v0.23.3 (S, G1) |
| Third-party writers | Thm-Reader (Rust), reverse-engineered read/write, "tested against THERM 7.8.71" (S, G5) | Honeybee legacy (IronPython, GPL), last targeting 7.5/7.6 (S, G4, F2) | fairyfly-therm (Python), pinned to THERM 8.1.30 (S, G3 `config.py`) |
| Opens in | THERM 7.x; THERM 8.1 converts THM to THMZ on open (S, L2) | THERM 7.x (S, L1/G4) | THERM 8.1 only (I) |
| Certified (NFRC) use | yes, through 7.8.71 (S\*, N1) | yes, once opened in 7.8.71 and saved as `.thm` (I) | not yet; 8.1 is beta (S, L1) |

### 2.2 Which is easier and better documented

- **Best documented: THMZ** (S, G1):
  - every element has an XSD;
  - `xs:sequence` gives a strict element order;
  - enumerations are spelled out, e.g. `PolygonType`, `SurfaceType`, `MesherOptions`, `ModelPurposeType`;
  - LBNL's library loads and saves it, so a written file can be round-tripped without THERM (I).
- **Simplest to write: THMX.** It is one file, flat, attribute-based and short (I, from G2/G4). Its weaknesses:
  - no published schema;
  - one forum user says it ".thmx doesn't expose full control over certain aspects of the simulation" (S, F1, tylerhenderson);
  - fairyfly's author says THMX is not worth supporting (S, F1, chris).
- **`.thm` binary: avoid.** It works (G5), but the THERM 7 EULA has a reverse-engineering clause the fairyfly author flagged (S, F1). It also adds a Rust dependency (I).

### 2.3 Open-source readers and writers found

- **LibraryFEMTherm** (LBNL, C++20 + pybind11) (S, G1):
  - reads and writes THMZ, materials, BCs, gases, mesh and results;
  - zip member names are constants: `Model.xml`, `Materials.xml`, `Gases.xml`, `SteadyStateBC.xml`, `Mesh.xml`, `SteadyStateResults.xml`, `MeshResults.xml`, `CMALibrary.xml`;
  - the licence reports as `NOASSERTION` on GitHub (S); read `LICENSE` before reuse (I).
- **THMXParser** (LBNL, C++) (S, G2):
  - parses `MeshControl`, `Materials`, `BoundaryConditions`, `Polygons`, `Boundaries` (BCPolygon), CMA and `Results`;
  - this field list is effectively the THMX data model.
- **fairyfly-therm** (Ladybug Tools) (S, G3):
  - full THMZ writer;
  - geometry clean-up (§5.1);
  - CLI runner and results reader.
  - This is the closest model for our exporter.
- **Honeybee legacy** (S, G4): a full THMX writer with explicit BCPolygons, auto-generated frame-cavity surfaces and a THERM 7 CLI runner.
- **Thm-Reader** (Rust) (S, G5): THERM 7 `.thm` binary read and write, JSON export.
- **No JS/Node package exists.** npm and GitHub code searches for THERM/THMZ/THERM-XML returned nothing relevant (S). We write our own.

### 2.4 Real example files located

- `LBNL-ETA/THMXParser/test/files/CS03.thmx`: plain XML, read in full (S). Excerpts in §6.1.
- `LBNL-ETA/LibraryFEMTherm/tst/products/sample-sill.thmz`, `sample-sill-no-results.thmz` and `ID50_CS_single.thmz`: binary zips, **not downloaded** (S, tree listing). Their unzipped `Model.xml` is the best THMZ reference. Open them in a later step, with the user's approval.
- `ladybug-tools/fairyfly-therm/tests/assets/thmz/test_no_result.thmz` and `test_result.thmz`: not downloaded (S, tree listing).
- LBNL also ships "Example THERM and DXF Files (ZIP)" and "Aluminum Slider Example Files (ZIP)" (S, L4). Not downloaded.

---

## 3. Minimum content of a valid file

### 3.1 THMZ (THERM 8): what the schema requires

Root `<ThermModel>`, in order (S, G1 `Therm.xsd`):

| element | required? |
|---|---|
| `Version` | required |
| `CalculationReady` (boolean) | required |
| `Preferences` | required |
| `Properties` | required |
| `GlazingOrigin` | required |
| `RadianceTags` | optional |
| `Cavities` | optional |
| `Polygons` | optional |
| `Boundaries` | optional; when present, ≥ 1 `Boundary` |
| `GlazingSystems` | optional |
| `CMAData` | optional |

The required parts break down as follows.

- **Preferences** (S, G1 `Preferences.xsd`):
  - `Settings`: Origin, Scale, ConductivityUnits, UValueBasis (default "Y-projected");
  - `Underlay`;
  - `Snap`.
- **Properties** (S, G1 `FileProperties.xsd`):
  - `General` (title, dates and so on, all optional);
  - `CalculationOptions`. Required inside it: `ModelingOptions`, `ConstantInitialConditionsTransient`, `ConstantInitialConditionsSteadyState` and `MeshControl`. The schema comment says MeshControl is required "because not all fields … have default values".
  - `ModelExposure`: GravityOrientation and Exposure (ModelPurpose plus one cross-section enum);
  - `Miscellaneous`: FloatTolerance (default 0.02), CheckingTolerance (default 0.1).
- **Polygon** (S, G1 `Geometry.xsd`):
  - `UUID`, `ID`, `MaterialUUID`, `MaterialName`, `Origin`, `Points/Point{x,y}`, `Type`;
  - optional: `GlazingSystem`, `Attributes`, `LinkID`, `Cavity{Gas,Ventilated}`;
  - `Type` is one of: Material, Glass, Gap, Boundary Condition, Spacer, Glass In, Glass Out, Shade Gap, Frame Cavity, Radiation Enclosure.
- **Boundary** (S, G1 `Geometry.xsd`):
  - required: `ID`, `UUID`, `Name` (the BC name), `FluxTag` (**the U-factor tag**), `IsBlocking`, `NeighborPolygonUUID`, `Origin`, `StartPoint`, `EndPoint`, `Side`, `ThermalEmissionProperties{Emissivity,Temperature,UseGlobalEmissivity}`, `EdgeID`, `Type`, `Color`, `Status`;
  - optional: `NeighborPolygonUUID2`, `IsIlluminated`, `MaterialSide`, `EnclosureNumber`;
  - `Type` is one of: Not A Surface, Boundary Condition, Glazing Cavity, Frame Cavity, Enclosure.
- **`Materials.xml`** (S, G1 `Materials.xsd`; G3 `solid.py`):
  - `<Materials><Version>1</Version><Material>…` with UUID, Name, Protected, Color and `Solid`;
  - conductivity is `Solid/HygroThermal/ThermalConductivityDry` (W/m·K);
  - emissivity is `Solid/Optical/Integrated/Infrared/Emissivity-Front|-Back`.
- **`SteadyStateBC.xml`** (S, G1 `BC Steady State.xsd`):
  - `<BoundaryConditions><Version>1</Version><BoundaryCondition>` with UUID, Name, Protected, Color, optional IGUSurface;
  - then exactly one of `Comprehensive`, `Simplified` or `RadiationSurface`:
    - `Comprehensive`: RelativeHumidity, Convection{Temperature, FilmCoefficient}, ConstantFlux, Radiation;
    - `Radiation` is a choice of `AutomaticEnclosure`, `ManualEnclosure`, `BlackBodyRadiation{Temperature,Emissivity,ViewFactor}` or `Linear{Temperature,FilmCoefficient}`;
    - `Simplified`: Temperature, FilmCoefficient, RelativeHumidity.
- **Packaging.** fairyfly writes all four XMLs, including every BC used plus Adiabatic, into the zip (S, G3 `model_to_thmz`). The file is self-contained and does not depend on the user's THERM library (I).

### 3.2 THMX (THERM 7): what real files contain

From the THERM-written `CS03.thmx` (S, G2) and the Honeybee writer (S, G4):

- **Header elements:** `ThermVersion`, `FileVersion`, `SaveDate`, `Title`, `CreatedBy`, `Company`, `Client`, `CrossSectionType`, `Notes`, `Units`, `MeshControl` (attributes).
- **`Materials/Material`** attributes: Name, Type, Conductivity, Tir, EmissivityFront, EmissivityBack, RGBColor; optional Absorptivity, CavityModel.
  - Solids also carry 8 `<Property Side Range Specularity T R/>` children.
  - Honeybee's 7.6 writer always emits the eight, all zero, for solids (S, G4 `dictToXMLMatV76`).
- **`BoundaryConditions/BoundaryCondition`** attributes: Name, Type, H, HeatFLux, Temperature, RGBColor, Tr, Hr, Ei, Viewfactor, RadiationModel, ConvectionFlag, FluxFlag, RadiationFlag, ConstantTemperatureFlag, EmisModifier.
- **`Polygons/Polygon`**: ID, Material (by **name**), NSides, Type, `units="mm"`, then `<Point index x y/>` children.
- **`Boundaries/BCPolygon`**: ID, BC (by **name**), `units="mm"`, MaterialName, PolygonID, EnclosureID, UFactorTag, Emissivity, MaterialSide, IlluminatedSurface, then two `<Point index x y/>` children.
- **`Results`**: optional (I). Honeybee writes an empty `<Results><Case><FrameCavities/></Case></Results>`; the THERM-written CS03 has none (S).
- THMX references materials and BCs **by name**, and the definitions sit inside the file. Like THMZ, it is self-contained (S, G2/G4).

### 3.3 Material definitions for our data

| our data | THMX | THMZ |
|---|---|---|
| solid, k, ε | `Type="0"` (Honeybee sets solids to 0) (S, G4). WINDOW-imported shade layers in CS03 are `Type="5"` (S, G2). `Conductivity` in W/m·K; `EmissivityFront/Back` (S) | `<Solid><HygroThermal><ThermalConductivityDry>` and `<Optical>…<Emissivity-Front/Back>` (S, G3) |
| air cavity (enclosed) | the material `Frame Cavity NFRC 100`: `Type="1" Conductivity="-1" CavityModel="4"`. Honeybee codes 4 = "Frame Cavity NFRC 100", 5 = "… Slightly Ventilated NFRC", 1 = "Frame Cavity - CEN Simplified" (S, G4). THERM itself makes one copy per cavity: `Frame Cavity NFRC 100_Cavity_267` (S, G2) | **two generations**, see §5.4 |
| thin membrane | an ordinary solid polygon; see the tolerance rules in §5.1 (I) | same (I) |

For NFRC work, frame cavities use **Frame Cavity NFRC 100**: ISO 15099 cavity model, gas Air, simplified radiation. THERM recalculates the cavity wall temperatures, emissivities and heat-flow direction (S, L7 §6.3.6). The default frame-cavity height is 1 m and the gravity vector comes from Cross Section Type (S, L7 §6.3.6).

### 3.4 Boundary conditions: names and h values

**NFRC 100-2010 set** (S, L7 Table 6-4; L8; G1 `BoundaryConditionsSteadyState.xml`):

| BC name (library spelling) | model | T (°C) | h_c (W/m²K), 90° | h_c, 20° tilt |
|---|---|---|---|---|
| `NFRC 100-2010 Exterior` | convection + blackbody radiation, ε 1 | −18 | 26 | 26 |
| `Interior Aluminum Frame (convection only)` | convection + automatic enclosure radiation | 21 | 3.29 | 4.65 |
| `Interior Thermally Broken Frame (convection only)` | same | 21 | 3.00 | 4.09 |
| `Interior Thermally Improved Frame (convection only)` | same | 21 | 3.12 | 4.32 |
| `Interior Wood/Vinyl Frame (convection only)` | same | 21 | 2.44 | 3.09 |
| `Adiabatic` | Simplified, h 0 | 0 | 0 | — |
| `Frame Cavity Surface` | THMX BC `Type="7"`, all flags 0 (S, G2); THMZ: fairyfly's fixed UUID `320f2027-a8f4-44d3-907f-1d90f5118632`, h 0 (S, G3) | — | — | — |

Notes on the table:

- **Exterior h = 26 W/m²K.** It corresponds to 5.5 m/s wind (S, L7 §6.5.1).
- **Interior BCs use "Automatic Enclosure Model" radiation.** THERM then computes radiation between interior surfaces and does not use a combined h. NFRC requires this for all interior frame BCs (S, L7 §6.5.2).
- **The THERM 8 library spells three 20°-tilt interior names "Inerior …"** in the copy fairyfly ships (S, G3 test asset). LBNL's current copy is corrected (S, G1).
  - In THMZ, BCs are matched by name and the definitions travel inside the zip, so a spelling mismatch silently creates a second BC (I).
  - Copy names byte-for-byte from the target library (I).
- **"Interior Wood/Vinyl Frame (20 tilt) Simplified" was not found** in any library, manual or code read this session. Neither was any NFRC interior BC with a combined (simplified) h. The NFRC set is "convection only" + AutoEnclosure (S, L7/G1). Do not use that name until it is confirmed in the installed THERM's BC library (I).
- **For non-NFRC runs to ISO 10077-2 / ISO 6946 conventions**, define custom `Simplified` BCs (I, from those standards; values not sourced this session):
  - Rse 0.04 m²K/W → h 25 W/m²K;
  - Rsi 0.13 → h 7.69 W/m²K (or 0.20 → 5.0 at frame corners).
- **ISO 15099.** THERM's frame-cavity and radiation models are its implementation of ISO 15099. Cross Section Type feeds "the ISO 15099 simulation models" (S, L7 §6.3.2). In THERM, "ISO 15099 boundary conditions" therefore means the NFRC set above plus the ISO 15099 cavity model (I).
- **THMX encoding (I, from G4 `thermBC`/`Create Therm Boundaries`):**
  - Honeybee writes comprehensive BCs as `Type="1"`;
  - `RadiationModel="1"` with Viewfactor 1 for exterior (blackbody);
  - `RadiationModel="3"` when no view factor is given (automatic enclosure);
  - `Hr="-431602080.000000"` as a "not set" sentinel.
  
  These numeric codes are not documented anywhere found.
- **At least two non-adiabatic BCs** are needed for THERM to simulate (S, L5 §3.6).

### 3.5 U-factor tags

- **Where they go:** THMX `BCPolygon/@UFactorTag`; THMZ `Boundary/FluxTag` (S, G2/G1).
- **LBNL's tag library** (S, G1 `UFactors.thml`): `Edge`, `Frame`, `New`, `None`, `SHGC Exterior`, `ShadeInETag`, `ShadeOutETag`, `Spacer`.
- **For WINDOW:** use exactly `Frame`, `Edge`, `None`, `SHGC Exterior`; "WINDOW will not recognize any other values" (S, L7 §6.5.2).
  - `Frame`: all interior frame BCs, including glazing below the sight line.
  - `Edge`: 63.5 mm above the sight line.
  - `None`: the rest and the exterior glazing.
  - `SHGC Exterior`: exterior surfaces below the sight line.
- **Wall or threshold U-values** that do not go into WINDOW: Honeybee allows any string ("For example "Frame", "Edge", or "Spacer"") (S, G4). Whether THERM 7 accepts a tag missing from its U-factor-names library is an open question (§9, Q7).
- **Results stay blank** in THERM until at least one segment carries a tag (S, L5 §3.6 step 6).

### 3.6 Mesh and calculation settings

- **NFRC minimum** (S, L7 Table 6-5):
  - Quad Tree Mesh Parameter **≥ 6**;
  - Maximum % Error Energy Norm **10 %**;
  - Run Error Estimator **on**;
  - Relaxation Parameter 1.0 with automatic adjustment (S, L7 §6.6.3).
  - An error energy norm below 10 % is "equivalent to an uncertainty of less than 1% in the U-factor" (S, L7 §6.6.2).
- **THMX:** `<MeshControl MeshLevel="6" ErrorCheckFlag="1" ErrorLimit="10.000000" MaxIterations="5" CMAflag="0" />`. The real file uses MeshLevel 9 (S, G2); Honeybee defaults to 8 (S, G4).
- **THMZ:** `CalculationOptions/MeshControl{MeshType, MeshParameter, RunErrorEstimator, ErrorEnergyNorm, MaximumIterations}` (S, G1/G3).
  - `MeshType` is "QuadTree Mesher" or "Simmetrix Version 2022"; the schema default is Simmetrix (S, G1).
  - For a THERM 7-comparable steady U-factor, fairyfly's template uses `SimulationEngine=Conrad`, `CalculationMode=Steady-State` (S, G3 `Default.xml`). The schema defaults are HygroThermFEM/Transient, so set these explicitly (S, G1).

### 3.7 Units and orientation

- **Units:**
  - THERM's base unit is **mm in SI, inches in IP** (S, L6 §5.14);
  - THMX polygons and BCPolygons carry `units="mm"` and the header has `<Units>SI</Units>` (S, G2);
  - fairyfly converts every model to millimetres before writing THMZ (S, G3);
  - Thm-Reader: `.thm` is in millimetres with "Y increases upward" (S, G5);
  - **conductivity is W/m·K** in both formats. The THMZ `ConductivityUnits` preference only affects IP display (S, G1 `Preferences.xsd` annotation).
- **Orientation (NFRC)** (S, L7 §6.3.3):
  - inside surfaces face **right**, exterior faces **left**;
  - glass points **up** for sills and jambs and **down** for heads;
  - the gravity arrow is *Down* for sill and head and *Into screen* for jamb.
  
  Our convention (exterior = negative x, y up) already matches (I).
- **Origin is arbitrary.**
  - Real files sit around x ≈ 240–260 and y < 0 (S, G2).
  - Honeybee translates by (250, −50) (S, G4).
  - THERM's sticky distance (3 mm at default zoom, S, L6) suggests keeping the model near the origin and at 1:1 (I).

---

## 4. Boundary segments: explicit, or generated by THERM?

- **THERM can generate them.** Pressing the Boundary Conditions button (F10) draws the external boundary "automatically … (A default boundary condition of Adiabatic is assigned)" (S, L5 §3.6). The user then picks segments counter-clockwise and assigns BC and U-factor tag (S, L5/L7 §6.5.2).
- **Regeneration asks first.** THERM shows a three-choice dialog. The first choice picks up material emissivities (S, L7 §6.5.2).
- **THERM regenerates or rejects BCs when perimeter polygons change** (S, L7 §6.5.3).
- **Both automated writers write every segment explicitly** and run the file straight through the CLI with `-calc`. There is no GUI step (S, G3 `run.py`, G4 `runTHERMSim`). Explicit boundaries are therefore accepted, at least by THERM 7.5/7.6 (THMX) and THERM 8.1.30 (THMZ) (I).
- **Fairyfly's rules** (S, G3 `writer.py`):
  - one `Boundary` per segment;
  - segments of one logical boundary share a random 8-digit `EdgeID`;
  - every outer edge not covered by a user boundary gets an **Adiabatic** segment;
  - every cavity polygon edge gets a **Frame Cavity Surface** segment, with `Type=Frame Cavity`, `EnclosureNumber`, `Status=64`;
  - segment emissivity is copied from the adjacent solid material;
  - `NeighborPolygonUUID` names the adjacent polygon(s);
  - segment direction is flipped to follow the adjacent polygon's edge direction.
- **Honeybee does the same in THMX** (S, G4):
  - adiabatic by default;
  - `Frame Cavity Surface` loops with `EnclosureID` per cavity;
  - `PolygonID` and `Emissivity` from the adjacent polygon;
  - loops reversed to counter-clockwise.
- **A no-boundaries file is possible.** In THMZ, `Boundaries` is optional (S, G1). It would open as geometry only, to be finished by hand with F10 (I). It is a fallback, not the target.
- **DXF import avoids writing boundaries but loses materials** (§8.1).

---

## 5. Gotchas

### 5.1 Polygon rules

- **No voids, no overlaps, no unresolvable points** (S, L7 §6.5.3).
  - THERM detects voids and overlaps through "lonely edges": two adjacent edges with a different number of points (S, L7 §6.5.3).
  - **Shared edges must carry identical vertex lists on both sides.** Where a vertex of one part lies on another part's edge (a T-junction), insert that vertex into the other polygon too (I, from the lonely-edge rule; fairyfly does this with `Shape.intersect_adjacency` and inserts boundary end-points into shapes, S, G3).
- **Point tolerance** (S, L7 §6.5.3):
  - points closer than **0.01 mm** are merged automatically;
  - points between **0.01 and 0.1 mm** apart are flagged, with an offer to adjust them.
  - The THMZ `Miscellaneous` defaults are FloatTolerance 0.02 and CheckingTolerance 0.1 (S, G1); fairyfly's template uses 0.03 / 0.05 (S, G3).
  - Practical rule: no two distinct vertices within 0.1 mm (I).
  - fairyfly rounds coordinates to 0.1 mm; Honeybee rounds to 0.01 mm (S, G3/G4).
- **Thin membranes** (I):
  - A membrane thinner than about 0.1 mm will be flagged or collapsed (I, from the tolerance above).
  - Either model it ≥ 0.2 mm thick with k scaled to keep its R (k_model = k_real × t_model / t_real), or leave it out where its R is negligible.
  - Record the substitution in the export log.
- **Holes are not allowed.**
  - fairyfly rejects models that are not "a contiguous region without any holes" and splits polygons with holes into hole-free pieces (S, G3).
  - A part with an internal void must be split, and the void written as its own cavity polygon (I).
- **Winding:** fairyfly forces every polygon counter-clockwise (S, G3). Use CCW (I).
- **Curves:** THERM approximates arcs with straight segments. 30–45° per side keeps an NFRC model within 5 mm of the product (S, L6 §5.14.3). Many close points cause boundary and meshing problems (S, L6/L7 §6.6.1).
- **Maximum points per polygon or per model: not found.** See §9, Q6.
- **Empty spaces must be filled.** Fill them with a Frame Cavity material or THERM marks them (S\*, LBNL-THERM forum reply quoted in search; S, L5 Fill Void).

### 5.2 Format traps

- **Spelling of `HeatFLux`.** The THERM-written THMX spells the attribute `HeatFLux`, with a capital L (S, G2). Honeybee writes `HeatFlux` (S, G4). Copy THERM's spelling (I). Whether the parser is case-sensitive is unknown.
- **THMZ element order matters** wherever the XSD uses `xs:sequence`: `ThermModel`, `PolygonGeometry`, `BoundaryConditionGeometry` (S, G1). Order inside `xs:all` blocks is free.
- **IDs and UUIDs:**
  - THMZ polygons need a UUID **and** an integer ID; boundaries need both too (S, G1).
  - fairyfly uses one global counter for all IDs (S, G3).
  - THMX BCPolygon `PolygonID` must point to an existing `Polygon/@ID` (S, G2).
- **Cross Section Type drives the gravity vector** of the ISO 15099 cavity model (S, L7 §6.3.2). Set it:
  - THMX: `<CrossSectionType>`;
  - THMZ: `ModelExposure/Exposure`, with enums such as Sill/Head/Jamb, "Thermal Bridge", "Window Framing - Sill" (S, G1).
  - L1 7.8.80 fixed a bug where editing Cross Section Type inside a THMX file was ignored. Target 7.8.80 or confirm on 7.8.71 (S, L1).
- **Version string.** `ThermVersion` in THMX is "Version 7.5.18.0" in the real file (S, G2). Honeybee changed its writer between 7.5 and 7.6: it added `FileVersion` and the `Property` children (S, G4). Use the installed build's string (I).

### 5.3 Glazing for a certified fenestration run

- **NFRC frame runs import the glazing system from WINDOW.** THERM then auto-assigns the glazing BCs ("<file>:<glazing system> U-factor Inside Film", AutoEnclosure) and the Frame/Edge/None tags from the sight-line and 63.5 mm edge-of-glass inputs (S, L7 §6.5.1–6.5.2).
- **For a certified lift-slide run, the exporter should write frame, wall and floor polygons and leave the IGU to the simulator's WINDOW import** (I). Faking the IGU as solid polygons gives a usable design-stage number but not an NFRC result (I).
- "Import from WINDOW" brings in **glazing systems only**, not frame geometry. It is not an alternative export path for our parts (I, from L7).

### 5.4 Frame-cavity representation in THMZ is changing

- **fairyfly (pinned to THERM 8.1.30)** writes the legacy form (S, G3):
  - a cavity *material* (`<Cavity><CavityStandard>ISO15099</CavityStandard><Gas>Air</Gas>…`) in `Materials.xml`;
  - a `<Cavities><Cavity>` block;
  - a `CavityUUID` child on the polygon;
  - "Frame Cavity" boundary segments.
- **LibraryFEMTherm changed this on 2026-05-18 and 2026-05-26** (S, G1 commits, `migration/FrameCavity.hxx`):
  - polygons now carry `Type="Frame Cavity"` and `<Cavity><Gas>Air</Gas><Ventilated>false</Ventilated></Cavity>`;
  - `CalculationOptions/FrameCavityProperties/ConvectionModel` is `ISO15099` or `EN10077`;
  - legacy files are migrated on load.
- Which form THERM 8.1.68 writes natively is untested (§9, Q9). Legacy probably still loads, because the library migrates it (I).

---

## 6. Target file structure

### 6.1 Verbatim excerpts from a THERM-written THMX

Source: `LBNL-ETA/THMXParser/test/files/CS03.thmx` (THERM 7.5.18, saved 2017-09-28), lines quoted exactly, long material lists cut (S, G2).

```xml
<?xml version="1.0"?>
<THERM-XML xmlns="http://windows.lbl.gov">
<ThermVersion>Version 7.5.18.0</ThermVersion>
<FileVersion>1</FileVersion>
<SaveDate>2017-09-28T16:06:26</SaveDate>
<CrossSectionType>Sill</CrossSectionType>
<Units>SI</Units>
<MeshControl MeshLevel="9" ErrorCheckFlag="1" ErrorLimit="10.000000" MaxIterations="5" CMAflag="0" />
<Materials>
	<Material Name="Frame Cavity NFRC 100_Cavity_267" Type="1" Conductivity="-1.000000" Tir="-1.000000" Absorptivity="0.500000" EmissivityFront="0.900000" EmissivityBack="0.900000" RGBColor="0x00FF00" CavityModel="4" />
</Materials>
<BoundaryConditions>
	<BoundaryCondition Name="Adiabatic" Type="0" H="0.000000" HeatFLux="0.000000" Temperature="0.000000" RGBColor="0x000000"
		Tr="0.000000" Hr="0.000000" Ei="1.000000" Viewfactor="1.000000" RadiationModel="0"
		ConvectionFlag="0" FluxFlag="1" RadiationFlag="0" ConstantTemperatureFlag="0" EmisModifier="1.000000" />
	<BoundaryCondition Name="Frame Cavity Surface" Type="7" H="0.000000" HeatFLux="0.000000" Temperature="0.000000" RGBColor="0x0000FF"
		Tr="0.000000" Hr="0.000000" Ei="1.000000" Viewfactor="1.000000" RadiationModel="0"
		ConvectionFlag="0" FluxFlag="0" RadiationFlag="0" ConstantTemperatureFlag="0" EmisModifier="1.000000" />
</BoundaryConditions>
<Polygons>
	<Polygon ID="275" Material="CS03:CS03_glueline.txt" NSides="4" Type="1" units="mm">
		<Point index="0" x="250.000000" y="-29.531977" />
		<Point index="1" x="246.189636" y="-29.531977" />
		<Point index="2" x="246.075485" y="-29.731958" />
		<Point index="3" x="250.000000" y="-29.731958" />
	</Polygon>
</Polygons>
<Boundaries>
	<BCPolygon ID="265" BC="Frame Cavity Surface" units="mm" MaterialName="CS03:CS03_glueline.txt" PolygonID="267" EnclosureID="1" UFactorTag="" Emissivity="0.781640" MaterialSide="Back" IlluminatedSurface="FALSE">
		<Point index="0" x="250.000000" y="-29.531977" />
		<Point index="1" x="246.189636" y="-29.531977" />
	</BCPolygon>
</Boundaries>
</THERM-XML>
```

What the real file shows (S, G2):

- polygons are written clockwise in screen terms (I, from the point order);
- cavity polygons use `Type="1"` like solids; the material, not the polygon, marks them as cavities;
- frame-cavity BCPolygons reference the **cavity** polygon (`PolygonID="267"`) and name the **solid** wall material (`MaterialName`, `MaterialSide="Back"`).

### 6.2 Annotated THMX skeleton for The Living Edge (target)

Every value marked `(I)` is to be confirmed by Q1–Q5 in §9.

```xml
<?xml version="1.0"?>
<THERM-XML xmlns="http://windows.lbl.gov">
<ThermVersion>Version 7.8.71.0</ThermVersion>   <!-- (I) match the installed NFRC-approved build -->
<FileVersion>1</FileVersion>                     <!-- (S) present from 7.6 on, G4 -->
<SaveDate>2026-10-13T12:00:00</SaveDate>
<Title>D02 threshold v3</Title>
<CreatedBy></CreatedBy><Company></Company><Client></Client>
<CrossSectionType>Sill</CrossSectionType>        <!-- (S) sets the gravity vector for ISO 15099 cavities, L7 §6.3.2 -->
<Notes>Living Edge export; source detail02.mjs; datum y=0 = FFL</Notes>
<Units>SI</Units>                                <!-- (S) mm geometry, W/m-K -->
<MeshControl MeshLevel="6" ErrorCheckFlag="1" ErrorLimit="10.000000" MaxIterations="5" CMAflag="0" />  <!-- (S) NFRC minimum, L7 T6-5 -->
<Materials>
  <!-- one per distinct (name, k, eps); Type 0 = solid (S, G4) -->
  <Material Name="LE Concrete 2400" Type="0" Conductivity="1.800000" Tir="0.000000"
            EmissivityFront="0.900000" EmissivityBack="0.900000" RGBColor="0x9A9A9A">
    <!-- (S, G4) 7.6+ writer emits these 8 for solids; zeros are fine for opaque parts (I) -->
    <Property Side="Front" Range="Visible" Specularity="Direct"  T="0.000000" R="0.000000"/>
    <!-- … the other 7 Side/Range/Specularity combinations … -->
  </Material>
  <!-- enclosed air gap: one shared cavity material (G4) or one copy per cavity as THERM saves it (G2) -->
  <Material Name="Frame Cavity NFRC 100" Type="1" Conductivity="-1.000000" Tir="-1.000000"
            Absorptivity="0.500000" EmissivityFront="0.900000" EmissivityBack="0.900000"
            RGBColor="0x00FF00" CavityModel="4" />
</Materials>
<BoundaryConditions>
  <!-- Adiabatic and Frame Cavity Surface: copy the verbatim lines from §6.1 -->
  <!-- (I) comprehensive BCs encoded as Honeybee does (G4 thermBC): Type 1, RadiationModel 1 = blackbody -->
  <BoundaryCondition Name="NFRC 100-2010 Exterior" Type="1" H="26.000000" HeatFLux="0.000000" Temperature="-18.000000" RGBColor="0x0080C0"
     Tr="-18.000000" Hr="-431602080.000000" Ei="1.000000" Viewfactor="1.000000" RadiationModel="1"
     ConvectionFlag="1" FluxFlag="0" RadiationFlag="1" ConstantTemperatureFlag="0" EmisModifier="1.000000" />
  <!-- (I) RadiationModel 3 = automatic enclosure (Honeybee default when no view factor) -->
  <BoundaryCondition Name="Interior Wood/Vinyl Frame (convection only)" Type="1" H="2.440000" HeatFLux="0.000000" Temperature="21.000000" RGBColor="0xFF0000"
     Tr="21.000000" Hr="-431602080.000000" Ei="1.000000" Viewfactor="1.000000" RadiationModel="3"
     ConvectionFlag="1" FluxFlag="0" RadiationFlag="1" ConstantTemperatureFlag="0" EmisModifier="1.000000" />
</BoundaryConditions>
<Polygons>
  <!-- every part, CCW (I), shared vertices identical, no two points < 0.1 mm apart -->
  <Polygon ID="1" Material="LE Concrete 2400" NSides="4" Type="1" units="mm">
    <Point index="0" x="-300.00" y="-200.00" />
    <Point index="1" x="0.00"    y="-200.00" />
    <Point index="2" x="0.00"    y="0.00" />
    <Point index="3" x="-300.00" y="0.00" />
  </Polygon>
  <Polygon ID="2" Material="Frame Cavity NFRC 100" NSides="4" Type="1" units="mm"> … </Polygon>
</Polygons>
<Boundaries>
  <!-- one BCPolygon per perimeter edge; IDs continue after the polygon IDs (G4 starts at 2·nPoly+1) -->
  <BCPolygon ID="101" BC="NFRC 100-2010 Exterior" units="mm" MaterialName="LE Concrete 2400"
             PolygonID="1" EnclosureID="0" UFactorTag="" Emissivity="0.900000"
             MaterialSide="Front" IlluminatedSurface="FALSE">
    <Point index="0" x="-300.00" y="0.00" />
    <Point index="1" x="-300.00" y="-200.00" />
  </BCPolygon>
  <!-- interior segments tagged for the U-factor; tag text per §3.5 -->
  <BCPolygon ID="102" BC="Interior Wood/Vinyl Frame (convection only)" … UFactorTag="Frame" …> … </BCPolygon>
  <!-- the cut edge of the wall/slab -->
  <BCPolygon ID="103" BC="Adiabatic" … UFactorTag="" …> … </BCPolygon>
  <!-- every edge of every cavity polygon; EnclosureID = 1..n per cavity; PolygonID = the cavity polygon -->
  <BCPolygon ID="104" BC="Frame Cavity Surface" units="mm" MaterialName="LE Concrete 2400"
             PolygonID="2" EnclosureID="1" UFactorTag="" Emissivity="0.900000"
             MaterialSide="Back" IlluminatedSurface="FALSE"> … </BCPolygon>
</Boundaries>
</THERM-XML>
```

### 6.3 Annotated THMZ skeleton (second back end)

**Zip members:** `Model.xml`, `Materials.xml`, `SteadyStateBC.xml`, `Gases.xml`. Each is written as UTF-8 and stored at the zip root (S, G3 `model_to_thmz`).

`Model.xml`: element names and order from `Therm.xsd` / `Geometry.xsd` (S, G1); values from fairyfly's template and docstrings (S, G3).

```xml
<ThermModel>
  <Version>1</Version>
  <CalculationReady>true</CalculationReady>          <!-- (I) false for a geometry-only file -->
  <Preferences>
    <Settings><Origin><x>0</x><y>0</y></Origin><Scale>1</Scale>
      <ConductivityUnits>Btu/hr-ft-F</ConductivityUnits>   <!-- display only, IP -->
      <UValueBasis>Y-projected</UValueBasis><CondensationResistanceModel>false</CondensationResistanceModel></Settings>
    <Underlay>…</Underlay><Snap>…</Snap>             <!-- copy fairyfly Default.xml -->
  </Preferences>
  <Properties>
    <General><Title>D02 threshold v3</Title> …</General>
    <CalculationOptions>
      <SimulationEngine>Conrad</SimulationEngine><CalculationMode>Steady-State</CalculationMode>
      <ModelingOptions>…all Exclude* true…</ModelingOptions>
      <ConstantInitialConditionsTransient>…</ConstantInitialConditionsTransient>
      <ConstantInitialConditionsSteadyState>…</ConstantInitialConditionsSteadyState>
      <MeshControl><MeshType>QuadTree Mesher</MeshType><MeshParameter>6</MeshParameter>
        <RunErrorEstimator>true</RunErrorEstimator><ErrorEnergyNorm>10</ErrorEnergyNorm>
        <MaximumIterations>5</MaximumIterations></MeshControl>
    </CalculationOptions>
    <ModelExposure><ModelOrientation>0</ModelOrientation><GravityOrientation>Down</GravityOrientation>
      <Exposure><ModelPurpose>Opaque Facade</ModelPurpose><OpaqueCrossSection>Thermal Bridge</OpaqueCrossSection></Exposure>
    </ModelExposure>
    <Miscellaneous><FloatTolerance>0.02</FloatTolerance><CheckingTolerance>0.1</CheckingTolerance></Miscellaneous>
  </Properties>
  <GlazingOrigin><x>0</x><y>0</y></GlazingOrigin>
  <Polygons>
    <Polygon>
      <UUID>…</UUID><ID>1</ID>
      <MaterialUUID>…same UUID as in Materials.xml…</MaterialUUID><MaterialName>LE Concrete 2400</MaterialName>
      <Origin><x>0</x><y>0</y></Origin>
      <Points><Point><x>-300</x><y>-200</y></Point> …</Points>
      <Type>Material</Type>
    </Polygon>
  </Polygons>
  <Boundaries>
    <Boundary>
      <ID>45</ID><UUID>…</UUID><Name>NFRC 100-2010 Exterior</Name>
      <FluxTag></FluxTag>                              <!-- U-factor tag -->
      <IsBlocking>true</IsBlocking>
      <NeighborPolygonUUID>…polygon UUID…</NeighborPolygonUUID>
      <Origin><x>0</x><y>0</y></Origin>
      <StartPoint><x>-300</x><y>0</y></StartPoint><EndPoint><x>-300</x><y>-200</y></EndPoint>
      <Side>0</Side>
      <ThermalEmissionProperties><Emissivity>0.9</Emissivity><Temperature>0</Temperature>
        <UseGlobalEmissivity>true</UseGlobalEmissivity></ThermalEmissionProperties>
      <IsIlluminated>false</IsIlluminated>
      <EdgeID>12345678</EdgeID>                        <!-- shared by the segments of one logical boundary (G3) -->
      <Type>Boundary Condition</Type><Color>0x0080C0</Color><Status>0</Status>
    </Boundary>
  </Boundaries>
</ThermModel>
```

Elements in the excerpt that came verbatim from fairyfly docstrings (S, G3):

- `<Name>NFRC 100-2010 Exterior</Name>`, `<IsBlocking>true</IsBlocking>`, `<Side>0</Side>`, `<UseGlobalEmissivity>true</UseGlobalEmissivity>`, `<Status>0</Status>`;
- in `SteadyStateBC.xml`: `<Convection><Temperature>-18</Temperature><FilmCoefficient>26</FilmCoefficient></Convection>` and `<BlackBodyRadiation>` with `<Emissivity>1</Emissivity>`.

The LBNL library copy has `<Name>NFRC 100-2010 Exterior</Name>` with UUID `1810f37a-de4d-4e2d-95d5-09fe01157c34` (S, G1/G3).

---

## 7. Recommended export route

**Write a self-contained THERM 7 THMX file from a format-neutral section model, and keep a THMZ writer behind the same interface.** (I, reasoned from §1–§5)

Why THMX first:

- **Certification.** It is the only text format the NFRC-approved THERM line (7.8.71, S\*) reads. THMZ needs THERM 8, which is beta (S).
- **Size.** It is one flat file: about 5 element types plus a fixed header. A Node writer is a few hundred lines with no dependencies (I).
- **References.** A real THERM-written file (G2), a field-for-field parser (G2) and a writer that ran THERM 7 (G4) exist.
- **Escape hatch.** THERM 8.1 converts THERM 7 files on open (S, L2; stated for THM, assumed for THMX, Q10). The same file can be checked in THERM 8.

Why keep THMZ as a second serializer:

- it is schema-checked;
- LBNL's own library can round-trip it without THERM (G1);
- it becomes the primary target once THERM 8 is NFRC-approved (I).

### 7.1 Exporter pipeline (Node)

1. **Collect.** For each part: CCW polygon in mm, material {name, k, ε}, role (solid | cavity). Plus boundary polylines tagged {bc, uTag}. Exterior is at −x, which matches NFRC "exterior left" (S, L7).
2. **Clean geometry** (I; mirrors G3 `model_to_therm_xml`):
   - snap to a 0.01 mm grid;
   - merge near-duplicate vertices;
   - reject any vertex pair 0.01–0.1 mm apart;
   - insert T-junction vertices into neighbours;
   - split polygons with holes;
   - check that the union is one hole-free region;
   - check pairwise overlap area = 0.
3. **Membranes.** Thicken any part below the threshold with equivalent k and log it (I, §5.1).
4. **Edge graph.** Key each edge by its sorted endpoints:
   - edges used once are **perimeter edges**;
   - edges between a solid and a cavity are **cavity edges**.
5. **Assign BCs.**
   - Perimeter edges that coincide with a declared boundary take its BC and U-tag; all others become **Adiabatic** (S, THERM default, L5).
   - Each cavity edge becomes a "Frame Cavity Surface" segment with `EnclosureID` = cavity index (S, G2/G4).
   - Emissivity comes from the adjacent solid (S, G3/G4).
6. **Serialize** THMX (§6.2) or THMZ (§6.3; zip with `fflate` or `jszip`, I).
7. **Self-check without THERM** (I):
   - re-parse the written file and compare it with the input model: polygon count, total area, perimeter length per BC, tag lengths;
   - optionally validate THMZ against G1's XSDs (`xmllint --schema`) or load it with `pylibraryfemtherm`. That needs a pip install: ask the user first.
8. **Run** (S, G3/G4):
   - interactively in THERM;
   - or through the CLI: `THERM8.exe -pw <pw> -thmz <file> -log <log> -calc -exit`, or `Therm7.exe -pw <pw> -log <log> -ini <ini> -thmx <file> -calc -exit`.
   - The password comes from LBNL's free command-line registration (S, L3). The open-source wrappers hard-code it; do not register on the user's behalf.
   - fairyfly treats "Calculation complete." in the log as success (S, G3).

### 7.2 Can a valid file be produced without THERM installed?

- **Structurally, yes** (I):
  - THMZ can be schema-validated (G1);
  - THMX can be checked against the real example and THMXParser's fields (G2).
- **"Opens, meshes and runs" can only be confirmed by THERM on Windows.** Plan one round-trip test with a minimal model (Q1–Q12).

---

## 8. Alternatives considered

### 8.1 DXF underlay with Autoconvert

- THERM imports one DXF at a time as an underlay (S, L6).
- **Autoconvert** turns *closed* polylines into polygons; open lines and polylines are not converted (S, L6 §5.14.4).
- Autoconverted polygons take **the currently selected material** (S\*, older manual quoted in search). Every polygon needs its material reassigned by hand (I).
- Duplicate or overlapping polylines create overlapping polygons (S, L6).
- THERM assumes DXF files are in **IP units** unless told otherwise (S, L6).
- Arcs are faceted by the "Arc to Polygon" setting (S, L6).
- No boundaries, BCs or tags carry over (I).
- An LBNL reply in 2026 confirms that without Autoconvert the underlay must be traced (S\*, F3).
- **Verdict:** a useful fallback for geometry only (I).

### 8.2 THERM "import from WINDOW"

Imports a glazing system (IGU) into an existing THERM cross-section, with automatic glazing BCs and tags (S, L7 §6.5). It does not carry frame or wall geometry (I). The certified workflow needs it anyway, for the lift-slide's triple glazing (§5.3).

### 8.3 Engines outside THERM

- **LibraryFEMTherm** handles files only, not solving (S, G1 README).
- **HygroThermFEM** is LBNL's public FEM engine repository, active 2026-10 (S, G6). The THMZ schema names it as the newer engine beside Conrad (S, G1). Using it standalone would mean building C++ and supplying a mesh. It would not be a certified THERM run (I).
- **Windows-CalcEngine / WinCalc / pyWinCalc** compute glazing-system (centre-of-glass) properties, not 2D frame conduction (I). They were not read beyond the repository list.

### 8.4 Command line and batch

- THERM 7 and later have a command-line mode, password-gated with free registration; LBNL offers "very limited support" (S, L3).
- The switches seen in working code (S, G3/G4): `-pw`, `-log`, `-ini` (THERM 7), `-thmx` (THERM 7), `-thmz` (THERM 8), `-calc`, `-exit`.
- THERM 7 needs `SaveXML=1` etc. in its INI to write results, which Honeybee patches (S, G4 `checkThermSettings`).
- THERM 7.8 also has **Calc Manager** for batches of up to 10,000 runs (S, L1).

### 8.5 Binary `.thm` through Thm-Reader

Technically possible (S, G5). It adds a Rust toolchain and carries the EULA question (S, F1). Not recommended (I).

---

## 9. Open questions that only a THERM test can settle

Test with one minimal model: two solids, one cavity, exterior, interior and adiabatic edges, one tag.

1. **Does THERM 7.8.71 open a hand-written THMX through File/Open** (not only through the CLI), with Honeybee-style BC attributes?
2. **Does it keep our explicit `BCPolygon`s?** Or does it ask to regenerate on open or on calculate, and with what result?
3. **What do the THMX numeric codes mean?** Check `BoundaryCondition/@Type` (0/1/7), `@RadiationModel` (0/1/3 assumed: none, blackbody, auto-enclosure) and `Material/@Type` (0/1/5) by saving a GUI-made file and diffing it against ours.
4. **Is `HeatFLux` vs `HeatFlux` accepted either way?** Are the 8 `Property` children required for solids?
5. **Is BCPolygon point order significant?** Must it follow the polygon's winding? Does `MaterialSide` Front/Back flip the side?
6. **What are the maximum points per polygon and per model,** and the practical mesher limit at MeshLevel 6 for a 4.8 m-wide, floor-to-head section?
7. **Are custom U-factor tags accepted** (e.g. `Threshold`, `Wall`) if they are absent from THERM's U-factor names library? Do they appear in Show U-factors?
8. **Are file-local BC names that differ from the user's library** (e.g. the "Inerior" spelling) used as written or remapped?
9. **THMZ: which cavity form does THERM 8.1.68 accept or write?** Legacy cavity material + `CavityUUID`, or polygon `Type="Frame Cavity"` + `<Cavity>`? Does `Status=64` matter?
10. **Does THERM 8.1 open a THMX** and convert it to THMZ (stated only for THM, L2)? Do the U-factors match THERM 7.8 within the error-norm tolerance?
11. **How small can a membrane polygon be** before THERM's 0.1 mm point check flags it? Does "automatically adjust points" distort neighbouring parts?
12. **Which build is NFRC-approved today?** The NFRC page returned 403; 7.8.71 is from a 2023 notice (S\*). Confirm before calling any run "certified".
