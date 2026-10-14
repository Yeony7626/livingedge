# Review packet for a built detail: junction captures, clashes, contacts (floating parts), parts list.
#   execfile(r"...\.sketch\rhino\packet.py"); packet(r"...\detail01.json", r"...\review\loop1")
import json
import os
import System
import Rhino
from Rhino.Geometry import BoundingBox, Point3d, Vector3d, Brep, TextDot

AXO = Vector3d(6.1, 6.1, -5)  # same 2:1 camera as the web prototype, mapped to Rhino


def parts_in_doc(doc, version):
    out = {}
    for o in doc.Objects.GetObjectList(Rhino.DocObjects.ObjectType.Brep):
        pid = o.Attributes.GetUserString("id")
        if pid and o.Attributes.GetUserString("version") == version:
            out.setdefault(pid, []).append(o)
    return out


def samples(brep):
    pts = [v.Location for v in brep.Vertices]
    for e in brep.Edges:
        pts.append(e.PointAt(e.Domain.Mid))
    for f in brep.Faces:
        u, v = f.Domain(0).Mid, f.Domain(1).Mid
        pts.append(f.PointAt(u, v))
    return pts


def gap(a, b):
    return min(min(b.ClosestPoint(p).DistanceTo(p) for p in samples(a)), min(a.ClosestPoint(p).DistanceTo(p) for p in samples(b)))


def capture(doc, view_name, box, direction, path, size, dots):
    view = doc.Views.Find(view_name, False)
    vp = view.ActiveViewport
    vp.ChangeToParallelProjection(True)
    c = box.Center
    vp.SetCameraLocations(c, c - direction * 10000)
    vp.CameraUp = Vector3d.ZAxis
    vp.ZoomBoundingBox(box)
    # ZoomBoundingBox parks the camera at the box face; pull it back so the near plane can't slice the model
    vi = Rhino.DocObjects.ViewportInfo(vp)
    vi.SetCameraLocation(vp.CameraTarget - direction * 10000)
    vi.SetFrustumNearFar(10, 30000)
    vp.SetViewProjection(vi, True)
    vp.DisplayMode = Rhino.Display.DisplayModeDescription.FindByName("Shaded")
    vp.ConstructionGridVisible = vp.ConstructionAxesVisible = vp.WorldAxesVisible = False
    ids = [doc.Objects.AddTextDot(d) for d in dots]
    # A display-mode switch only lands on the next full draw; capture twice so the first frame is discarded.
    for _ in range(2):
        view.Redraw()
        Rhino.RhinoApp.Wait()
        bmp = view.CaptureToBitmap(System.Drawing.Size(size[0], size[1]))
    bmp.Save(path)
    for i in ids:
        doc.Objects.Delete(i, True)
    view.Redraw()


def packet(spec_path, out_dir, version, dx=0):
    doc = Rhino.RhinoDoc.ActiveDoc
    tol = doc.ModelAbsoluteTolerance
    spec = json.load(open(spec_path))
    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)
    objs = parts_in_doc(doc, version)
    meta = dict((p["id"], p) for p in spec["parts"])
    breps = dict((k, [o.Geometry for o in v]) for k, v in objs.items())
    boxes = {}
    for k, bs in breps.items():
        bb = BoundingBox.Empty
        for b in bs:
            bb.Union(b.GetBoundingBox(True))
        boxes[k] = bb

    # Contacts and clashes, pairwise over parts whose boxes come within 1 mm.
    ids = sorted(breps)
    contacts = dict((k, set()) for k in ids)
    clashes = []
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            a, b = ids[i], ids[j]
            ba, bb_ = boxes[a], boxes[b]
            grown = BoundingBox(ba.Min - Vector3d(1, 1, 1), ba.Max + Vector3d(1, 1, 1))
            if not BoundingBox.Intersection(grown, bb_).IsValid:
                continue
            touching, vol = False, 0.0
            for x in breps[a]:
                for y in breps[b]:
                    if gap(x, y) < 0.05:
                        touching = True
                    r = Brep.CreateBooleanIntersection(x, y, tol)
                    if r:
                        touching = True  # catches line contact (round bar on a face) that point sampling misses
                        vol += sum(z.GetVolume() for z in r)
            if touching or vol > 1:
                contacts[a].add(b)
                contacts[b].add(a)
            allowed = b in meta.get(a, {}).get("embeds", []) or a in meta.get(b, {}).get("embeds", [])
            if vol > 1 and not allowed:
                clashes.append((a, b, vol))

    # Captures: section (Front view looks at the cut face) and axo, per junction window.
    for j in spec.get("views", []):
        x0, x1 = j["x"][0] + dx, j["x"][1] + dx
        y0, y1 = j["y"]
        sec = BoundingBox(Point3d(x0, -spec["L"], y0), Point3d(x1, -spec["L"] + 1, y1))
        axo = BoundingBox(Point3d(x0, -spec["L"], y0), Point3d(x1, -spec["L"] + j.get("depth", 300), y1))
        dots = []
        for k in ids:
            bx = boxes[k]
            c = bx.Center
            if x0 <= c.X <= x1 and y0 <= c.Z <= y1:
                dots.append(TextDot(k, Point3d(c.X, bx.Min.Y - 1, c.Z)))
        capture(doc, "Perspective", sec, Vector3d.YAxis, os.path.join(out_dir, j["id"] + "-section.png"), (1400, 1100), [])
        capture(doc, "Perspective", sec, Vector3d.YAxis, os.path.join(out_dir, j["id"] + "-section-labels.png"), (1400, 1100), dots)
        capture(doc, "Perspective", axo, AXO, os.path.join(out_dir, j["id"] + "-axo.png"), (1400, 1100), [])

    lines = ["# Review packet", "", "Spec: " + spec_path, "Version: " + version, ""]
    lines.append("## Floating parts (touch nothing)")
    floating = [k for k in ids if not contacts[k]]
    lines += ["- " + k for k in floating] or ["- none"]
    lines += ["", "## Clashes (overlap > 1 mm3, not declared in `embeds`)"]
    lines += ["- %s x %s: %.0f mm3" % c for c in clashes] or ["- none"]
    lines += ["", "## Parts", "", "| id | name | role | junction | x | y | w | touches | src |", "|---|---|---|---|---|---|---|---|---|"]
    for k in ids:
        m, bx = meta.get(k, {}), boxes[k]
        lines.append("| %s | %s | %s | %s | %.1f..%.1f | %.1f..%.1f | %.0f..%.0f | %s | %s |" % (
            k, m.get("name", ""), m.get("role", ""), m.get("junction", ""), bx.Min.X - dx, bx.Max.X - dx, bx.Min.Z, bx.Max.Z,
            -bx.Max.Y, -bx.Min.Y, ", ".join(sorted(contacts[k])), "; ".join(m.get("src", []))))
    lines += ["", "## Drawing notes", ""] + (["- **%s**: %s" % (p["id"], p["note"]) for p in spec["parts"] if p.get("note")] or ["- none"])
    missing = [p["id"] for p in spec["parts"] if p["id"] not in breps and p.get("type") != "virtual" and not p.get("void")]
    lines += ["", "## Spec parts missing from model", ""] + (["- " + k for k in missing] or ["- none"])
    open(os.path.join(out_dir, "report.md"), "w").write("\n".join(lines) + "\n")
    print("packet: %d parts, %d floating, %d clashes -> %s" % (len(ids), len(floating), len(clashes), out_dir))
