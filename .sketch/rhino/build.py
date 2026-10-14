# Builds a Living Edge detail in Rhino from a JSON spec. Runs inside Rhino 8 (IronPython 2.7):
#   execfile(r"...\.sketch\rhino\build.py"); build(r"...\.sketch\rhino\detail01.json")
# Spec coordinates are millimetres in the section plane: x = depth (exterior negative), y = up,
# w = along the wall (0 at the back, L at the cut). Rhino: X = x, Y = -w, Z = y (keeps handedness).
import json
import Rhino
import System
from Rhino.Geometry import Point3d, Vector3d, Plane, PolylineCurve, LineCurve, Curve, Surface, Circle, Cylinder, CurveOffsetCornerStyle, Brep
from Rhino.DocObjects import ObjectAttributes, ObjectColorSource, Layer

ROOT = "Detail01"
ROLE_COLOR = {
    "concrete": (165, 165, 165), "ground": (181, 155, 120), "drainage": (120, 170, 200),
    "water": (40, 110, 200), "air": (210, 60, 60), "vapour": (150, 80, 190), "thermal": (240, 200, 60),
    "frame": (205, 170, 120), "cladding": (235, 230, 215), "furniture": (150, 100, 60), "metal": (90, 90, 95), "planting": (95, 135, 75),
}


def P(x, w, y):
    return Point3d(x, -w, y)


def layer_index(doc, names):
    # Nested layer ROOT::names[0]::names[1]..., created as needed.
    path, i = ROOT, doc.Layers.FindByFullPath(ROOT, -1)
    if i < 0:
        i = doc.Layers.Add(Layer(Name=ROOT))
    for name in names:
        parent = doc.Layers[i].Id
        path += "::" + name
        i = doc.Layers.FindByFullPath(path, -1)
        if i < 0:
            i = doc.Layers.Add(Layer(Name=name, ParentLayerId=parent))
    return i


def extrude(loop, w0, w1, tol):
    loop.Translate(Vector3d(0, -w0, 0))
    brep = Surface.CreateExtrusion(loop, Vector3d(0, -(w1 - w0), 0)).ToBrep().CapPlanarHoles(tol)
    if brep:
        brep.Faces.SplitKinkyFaces()
    return brep


def prism(part, w0, w1, tol):
    if part.get("axis") == "x":
        # Profile drawn in the (w, y) plane and extruded across the depth, e.g. a brace running along the wall.
        x0, x1 = part["x"]
        pts = [P(x0, w, y) for w, y in part["poly"]]
        pts.append(pts[0])
        brep = Surface.CreateExtrusion(PolylineCurve(pts), Vector3d(x1 - x0, 0, 0)).ToBrep().CapPlanarHoles(tol)
        if brep:
            brep.Faces.SplitKinkyFaces()
        return brep
    pts = [P(x, 0, y) for x, y in part["poly"]]
    pts.append(pts[0])
    return extrude(PolylineCurve(pts), w0, w1, tol)


def sheet(part, w0, w1, tol):
    # Thin material (flashing, membrane, trim) authored as its centreline plus thickness t.
    cl = PolylineCurve([P(x, 0, y) for x, y in part["path"]])
    pl = Plane(Point3d.Origin, Vector3d.XAxis, Vector3d.ZAxis)
    h = part["t"] / 2.0
    a = cl.Offset(pl, h, tol, CurveOffsetCornerStyle.Sharp)[0]
    b = cl.Offset(pl, -h, tol, CurveOffsetCornerStyle.Sharp)[0]
    b.Reverse()
    loop = Curve.JoinCurves([a, LineCurve(a.PointAtEnd, b.PointAtStart), b, LineCurve(b.PointAtEnd, a.PointAtStart)], tol)[0]
    return extrude(loop, w0, w1, tol)


def rods(part, tol):
    # Round parts: axis "y" vertical at (x, w) (bolts, piers), "x" horizontal at (y, w) (screws through layers),
    # "w" along the wall at (x, y) (pipes). "di" makes a tube.
    out = []
    a = part["axis"]
    length = part["to"] - part["from"]
    if a == "w":
        # "dy" falls (or rises) along the wall: y is at "from", the far end sits dy higher (an underdrain at 1 %).
        n = Vector3d(0, -length, part.get("dy", 0))
        length = n.Length
        n.Unitize()
        at = part.get("at", [[part.get("x"), part.get("y")]])
        places = [(P(x, part["from"], y), n) for x, y in at]
    elif a == "y":
        places = [(P(part["x"], w, part["from"]), Vector3d.ZAxis) for w in part["w"]]
    else:
        # "dy" makes a sloped run (a drain pipe at 1 %): y is at "from", and the far end sits dy higher.
        n = Vector3d(length, 0, part.get("dy", 0))
        length = n.Length
        n.Unitize()
        places = [(P(part["from"], w, y), n) for w in part["w"] for y in part.get("ys", [part.get("y")])]
    for base, n in places:
        b = Cylinder(Circle(Plane(base, n), part["d"] / 2.0), length).ToBrep(True, True)
        if part.get("di"):
            hole = Cylinder(Circle(Plane(base - n, n), part["di"] / 2.0), length + 2).ToBrep(True, True)
            b = Brep.CreateBooleanDifference(b, hole, tol)[0]
        out.append(b)
    return out


def revolve(part, tol):
    # Round part with a shaped profile (pier with a sloped top): [r, y] points from the axis back to the axis.
    out = []
    for w in part["w"]:
        pts = [P(part["x"] + r, w, y) for r, y in part["profile"]]
        axis = Rhino.Geometry.Line(P(part["x"], w, 0), P(part["x"], w, 1))
        out.append(Brep.CreateFromRevSurface(Rhino.Geometry.RevSurface.Create(PolylineCurve(pts), axis), False, False))
    return out


def build(spec_path, version, dx=0):
    # Each version keeps its own layer branch and sits dx along Rhino X, so versions compare side by side.
    # A rebuild replaces only that version's objects.
    doc = Rhino.RhinoDoc.ActiveDoc
    doc.AdjustModelUnitSystem(Rhino.UnitSystem.Millimeters, False)
    tol = doc.ModelAbsoluteTolerance
    spec = json.load(open(spec_path))
    L = spec["L"]
    global ROOT
    ROOT = spec.get("root", "Detail01")
    for o in list(doc.Objects.GetObjectList(Rhino.DocObjects.ObjectType.AnyObject)):
        if o.Attributes.GetUserString("id") and o.Attributes.GetUserString("version") == version:
            doc.Objects.Delete(o, True)
    for lay in list(doc.Layers):
        if lay.FullPath.startswith(ROOT + "::" + version + "::") and not doc.Objects.FindByLayer(lay):
            doc.Layers.Delete(lay.Index, True)
    move = Rhino.Geometry.Transform.Translation(dx, 0, 0)
    made, failed = 0, []
    geo = {}
    for part in spec["parts"]:
        kind = part.get("type", "prism")
        if kind == "rod":
            geo[part["id"]] = rods(part, tol)
        elif kind == "revolve":
            geo[part["id"]] = revolve(part, tol)
        elif kind == "virtual":
            geo[part["id"]] = []  # counted in metrics only (rebar, door hardware), no geometry
        else:
            make = prism if kind == "prism" else sheet
            runs = [[0, 0]] if part.get("axis") == "x" else part.get("runs", [[0, L]])
            geo[part["id"]] = [make(part, w0, w1, tol) for w0, w1 in runs]
    # Capped extrusions come out inward-facing for one polygon winding; booleans need them outward.
    for bs in geo.values():
        for b in bs:
            if b and b.SolidOrientation == Rhino.Geometry.BrepSolidOrientation.Inward:
                b.Flip()
    # "cuts": parts whose volume this part makes way for (soil around a pier, not a clash).
    for part in spec["parts"]:
        # Cuts run in order; an entry is a part id or an inline rod (Rhino won't subtract a solid that is
        # fully enclosed, so a buried base is cut as a rod reaching 1 mm into the hole the pier already made).
        cutters = [c for cid in part.get("cuts", []) for c in (rods(cid, tol) if isinstance(cid, dict) else geo[cid]) if c]
        for c in cutters:
            if c.SolidOrientation == Rhino.Geometry.BrepSolidOrientation.Inward:
                c.Flip()
            out = []
            for b in geo[part["id"]]:
                r = Brep.CreateBooleanDifference(b, c, tol)
                out.extend(r if r else [b])
            geo[part["id"]] = out
    for part in spec["parts"]:
        if part.get("void"):
            continue  # helper solid: only cuts other parts (an overflow notch), never drawn
        breps = geo[part["id"]]
        attr = ObjectAttributes()
        attr.LayerIndex = layer_index(doc, [version, part["id"]])
        attr.Name = part["id"]
        attr.SetUserString("version", version)
        attr.ColorSource = ObjectColorSource.ColorFromObject
        attr.ObjectColor = System.Drawing.Color.FromArgb(*ROLE_COLOR[part["role"]])
        for k in ("id", "name", "role", "junction", "note", "mat"):
            attr.SetUserString(k, str(part.get(k, "")))
        attr.SetUserString("step", str(part.get("step", 0)))
        attr.SetUserString("src", "; ".join(part.get("src", [])))
        for b in breps:
            if b is None or not b.IsValid:
                failed.append(part["id"])
                continue
            b.Transform(move)
            doc.Objects.AddBrep(b, attr)
            made += 1
    doc.Views.Redraw()
    print("%s: built %d solids from %d parts at dx %d; failed: %s" % (version, made, len(spec["parts"]), dx, ", ".join(failed) or "none"))
