# Exterior views for the appearance review: material colours by `mat`, Rendered display mode,
# an eye-level view from the garden and a straight exterior elevation.
#   execfile(r"...\render.py"); render("v3", 36000, r"...\review\lap1", PALETTE, L)
import os
import System
import Rhino
from Rhino.Geometry import BoundingBox, Point3d, Vector3d

# Finish colours (sRGB) by material key; anything unlisted falls back to its role colour from build.py.
PALETTE = {
    # R5 lap 1: one charcoal for frames and all metal; honey cedar soffit vs silvering siding; warm-grey pavers.
    "steel-prefinished": (52, 54, 56), "aluminium": (52, 54, 56), "fibreglass": (52, 54, 56), "stainless": (150, 152, 154),
    "polymer-concrete": (70, 72, 74), "parge-charcoal": (78, 78, 76), "woodfibre-board": (150, 120, 85), "cellular-glass": (60, 60, 62), "glass": (150, 175, 185), "igu-triple": (150, 175, 185),
    "cedar-siding": (150, 146, 138), "cedar-soffit": (182, 136, 96), "glulam": (196, 160, 118), "softwood-lumber": (196, 160, 118),
    "softwood-pt": (176, 150, 112), "plywood": (200, 170, 130),
    "concrete-lowcarbon": (176, 173, 166), "concrete-exposed": (168, 165, 158), "concrete-f2-40scm": (176, 173, 166),
    "concrete-paver": (132, 128, 120), "reclaimed-stone": (140, 138, 132), "aggregate": (158, 153, 143),
    "soil": (86, 66, 50), "soil-imported": (92, 70, 52), "mulch": (70, 52, 38), "vegetation": (98, 126, 74),
    "gr-media": (95, 80, 60), "gr-media-pumice": (110, 100, 88), "sbs": (40, 40, 42),
    "hdpe": (30, 30, 32), "pvc-pipe": (60, 62, 64), "membrane-poly": (60, 62, 64), "geotextile-pp": (210, 210, 205),
    "graphite-eps": (120, 120, 125), "cellular-glass": (60, 60, 62), "xps-hfo": (150, 190, 210), "comfortboard-80": (200, 185, 120),
    "comfortbatt": (210, 195, 130), "gypsum": (236, 234, 228), "ccspf-hfo": (230, 220, 160),
}


def _material(doc, key, rgb):
    name = "LE-" + key
    i = doc.Materials.Find(name, True)
    m = doc.Materials[i] if i >= 0 else Rhino.DocObjects.Material()
    m.Name = name
    m.DiffuseColor = System.Drawing.Color.FromArgb(*rgb)  # palette changes apply on every render
    if key in ("glass", "igu-triple"):
        m.Transparency = 0.85
        m.Reflectivity = 0.2
    if i >= 0:
        m.CommitChanges()
    else:
        i = doc.Materials.Add(m)
    return i


def _shot(doc, view, cam, target, lens, size, path, parallel=False, box=None):
    vp = view.ActiveViewport
    if parallel:
        vp.ChangeToParallelProjection(True)
    else:
        vp.ChangeToPerspectiveProjection(True, lens)
    vp.SetCameraLocations(target, cam)
    vp.CameraUp = Vector3d.ZAxis
    if box is not None:
        vp.ZoomBoundingBox(box)
        d = (target - cam)
        d.Unitize()
        vi = Rhino.DocObjects.ViewportInfo(vp)
        vi.SetCameraLocation(vp.CameraTarget - d * 50000)
        vi.SetFrustumNearFar(10, 120000)
        vp.SetViewProjection(vi, True)
    vp.DisplayMode = Rhino.Display.DisplayModeDescription.FindByName("Rendered")
    # Render meshes for new objects are built on the first draw; a capture before that falls back to shaded.
    for _ in range(2):
        view.Redraw()
        Rhino.RhinoApp.Wait()
        bmp = view.CaptureToBitmap(System.Drawing.Size(size[0], size[1]))
    bmp.Save(path)


def render(version, dx, out_dir, palette=PALETTE, L=900, top=3700):
    doc = Rhino.RhinoDoc.ActiveDoc
    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)
    for o in doc.Objects.GetObjectList(Rhino.DocObjects.ObjectType.Brep):
        if o.Attributes.GetUserString("version") != version:
            continue
        key = o.Attributes.GetUserString("mat") or ""
        rgb = palette.get(key) or ROLE_COLOR.get(o.Attributes.GetUserString("role"), (200, 200, 200))
        a = o.Attributes.Duplicate()
        a.MaterialIndex = _material(doc, key or o.Attributes.GetUserString("role"), rgb)
        a.MaterialSource = Rhino.DocObjects.ObjectMaterialSource.MaterialFromObject
        doc.Objects.ModifyAttributes(o, a, True)
    # Hide everything that is not this version (other versions sit in line along Rhino X).
    hidden = []
    for o in doc.Objects.GetObjectList(Rhino.DocObjects.ObjectType.AnyObject):
        if o.Attributes.GetUserString("version") != version and o.Visible:
            hidden.append(o.Id)
            doc.Objects.Hide(o.Id, True)
    view = doc.Views.Find("Perspective", False)
    w_mid = -L * 0.35  # Rhino Y of a point along the finished (not cut-away) part of the wall
    # Eye level 1.6 m above grade, about 9 m out in the garden, looking back at the threshold and eave.
    _shot(doc, view, Point3d(dx - 9000, w_mid - 4200, 1600), Point3d(dx - 300, w_mid, 1300), 28, (1600, 1000),
          os.path.join(out_dir, "exterior-eye.png"))
    # Close view from the garden path toward jamb A: water corner, picture frame, threshold, canopy (R5 lap 2 s6).
    _shot(doc, view, Point3d(dx - 3200, 1500, 1350), Point3d(dx - 250, -700, 1100), 30, (1600, 1000),
          os.path.join(out_dir, "exterior-close.png"))
    # Straight elevation from outside, without the planting and people proxies in front of the wall (R5 lap 2 s6).
    proxies = []
    for o in doc.Objects.GetObjectList(Rhino.DocObjects.ObjectType.Brep):
        if o.Attributes.GetUserString("version") == version and o.Attributes.GetUserString("role") in ("planting", "furniture"):
            proxies.append(o.Id)
            doc.Objects.Hide(o.Id, True)
    box = BoundingBox(Point3d(dx - 1300, -L, -300), Point3d(dx - 1299, 1200, top))
    _shot(doc, view, Point3d(dx - 20000, -L / 2.0, 1700), Point3d(dx, -L / 2.0, 1700), 50, (1600, 1000),
          os.path.join(out_dir, "exterior-elevation.png"), parallel=True, box=box)
    for i in proxies:
        doc.Objects.Show(i, True)
    for i in hidden:
        doc.Objects.Show(i, True)
    doc.Views.Redraw()
    print("render: %s -> %s" % (version, out_dir))
