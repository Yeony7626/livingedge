# Side-by-side captures of the same junction window across model versions.
#   execfile(r"...\compare.py"); compare(r"...\review\compare", VERSIONS, REGIONS)
import os
import Rhino
from Rhino.Geometry import BoundingBox, Point3d, Vector3d

execfile(r"C:\Users\yeoni\OneDrive\Desktop\26termproject\.sketch\rhino\packet.py")  # for capture()

# version -> Rhino X offset; v0 keeps its own windows because its wall was drawn with a 1500 mm break.
VERSIONS = [("v0", 0), ("v1", 12000), ("v2", 24000)]
REGIONS = {
    "A-base": {"*": ([-180, 160], [140, 420])},
    "B-eave": {"*": ([-800, 250], [2950, 3600]), "v0": ([-700, 250], [1440, 1800])},
    "C-bench": {"*": ([-1260, -380], [-650, 470]), "v0": ([-560, -40], [-200, 480])},
    "D-slab": {"*": ([-60, 420], [-60, 420]), "v0": ([-60, 420], [-160, 320])},
    "E-footing": {"*": ([-700, 420], [-720, 20]), "v0": ([-640, 420], [-1200, -100])},
    "G-field": {"*": ([-130, 180], [1400, 1650]), "v0": ([-130, 180], [700, 950])},
}


def compare(out_dir, versions=VERSIONS, regions=REGIONS, L=900):
    doc = Rhino.RhinoDoc.ActiveDoc
    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)
    for rid, wins in regions.items():
        for ver, dx in versions:
            (x0, x1), (y0, y1) = wins.get(ver, wins["*"])
            box = BoundingBox(Point3d(x0 + dx, -L, y0), Point3d(x1 + dx, -L + 1, y1))
            capture(doc, "Perspective", box, Vector3d.YAxis, os.path.join(out_dir, "%s-%s.png" % (rid, ver)), (1000, 800), [])
    print("compare: %d regions x %d versions -> %s" % (len(regions), len(versions), out_dir))
