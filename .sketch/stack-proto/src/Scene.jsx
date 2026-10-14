import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Edges, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import LSystem from "lindenmayer";
import { getPosition } from "suncalc";
import { lineTree } from "./tree.js";
import { COMP, L, T, mulberry32 } from "./detail.js";

const S = 0.001; // millimetres to metres
export const INK = { plate: "#fafaf9", lo: "#e0e0e4", mid: "#c3c3c9", edge: "#a4a4ac", hi: "#232327", water: "#3f7cb6", sun: "#d8a02a", grow: "#5f8445", sage: "#b7c99d" };

// One part of the detail: rounded extrusions in the ground colour, a silhouette outline, the cut outline.
function Part({ c, gap, seq, hover, setHover }) {
  const group = useRef();
  const runs = c.posts ?? [[c.w0 ?? 0, c.w1 ?? L]];
  const geos = useMemo(() => {
    const xs = c.poly.map((p) => p[0]), ys = c.poly.map((p) => T(p[1]));
    const minSide = Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    const bevel = 0;
    const shape = new THREE.Shape();
    c.poly.forEach(([x, y], i) => (i ? shape.lineTo(x * S, T(y) * S) : shape.moveTo(x * S, T(y) * S)));
    shape.closePath();
    return runs.map(([w0, w1]) => {
      const g = new THREE.ExtrudeGeometry(shape, { depth: (w1 - w0) * S - 2 * bevel, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelOffset: -bevel, bevelSegments: 3, curveSegments: 6 });
      g.translate(0, 0, w0 * S + bevel);
      return { g, w1 };
    });
  }, [c]);
  const outline = useMemo(() => c.poly.map(([x, y]) => [x * S, T(y) * S]).concat([[c.poly[0][0] * S, T(c.poly[0][1]) * S]]), [c]);
  const lit = hover === c.id;
  useFrame(() => {
    if (!group.current) return;
    const s = seq.get(), arrive = Math.min(1, Math.max(0, c.step - s)), amt = Math.max(gap.get(), arrive);
    group.current.position.set(c.ex[0] * S * amt, c.ex[1] * S * amt, 0);
    group.current.visible = s >= c.step - 1.5;
  });
  return (
    <group ref={group}>
      {geos.map(({ g, w1 }, i) => (
        <group key={i}>
          <mesh geometry={g} onPointerOver={(e) => { e.stopPropagation(); setHover(c.id); }} onPointerOut={() => setHover(null)}>
            <meshBasicMaterial color={INK.plate} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            <Edges threshold={15} color={lit ? INK.hi : c.beyond ? INK.mid : INK.edge} />
          </mesh>
          {(lit || w1 === L) && <Line points={outline.map(([x, y]) => [x, y, w1 * S + 0.0006])} color={lit ? INK.hi : INK.edge} lineWidth={lit ? 1.8 : 1.3} />}
        </group>
      ))}
    </group>
  );
}

// Rain: line segments falling on the wind, only while a storm plays.
function Rain({ on }) {
  const N = 420, ref = useRef();
  const pos = useMemo(() => { const r = mulberry32(3), a = new Float32Array(N * 6); for (let i = 0; i < N; i++) { const x = -1.6 + r() * 2.6, y = r() * 2.6 - 0.2, z = r() * 1.0; a.set([x, y, z, x + 0.03, y - 0.09, z], i * 6); } return a; }, []);
  useFrame((_, dt) => {
    if (!ref.current) return; ref.current.visible = on; if (!on) return;
    const a = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < N; i++) { const k = i * 6; a[k + 1] -= 3.2 * dt; a[k + 4] -= 3.2 * dt; a[k] -= 1.0 * dt; a[k + 3] -= 1.0 * dt; if (a[k + 4] < -0.05) { a[k + 1] += 2.7; a[k + 4] += 2.7; a[k] += 0.85; a[k + 3] += 0.85; } }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <lineSegments ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <lineBasicMaterial color={INK.water} transparent opacity={0.55} />
    </lineSegments>
  );
}

// The real Vancouver sun for the chosen day and hour. Exterior (-x) faces north; east is +z.
export function sunAt(date) {
  const p = getPosition(date, 49.2827, -123.1207);
  const az = p.azimuth * Math.PI / 180, altR = p.altitude * Math.PI / 180, alt = p.altitude; // degrees from suncalc 2.x
  const dir = new THREE.Vector3(-Math.cos(az) * Math.cos(altR), Math.sin(altR), Math.sin(az) * Math.cos(altR));
  const northLit = alt > 0 && -dir.x > 0.02;
  return { dir, alt, az, northLit };
}
function SunRays({ date }) {
  const { dir, alt } = sunAt(date);
  if (alt <= 0) return null;
  const targets = [0.35, 0.55, 0.75, 0.95, 1.15].map((y, i) => new THREE.Vector3(-0.06, y, 0.1 + i * 0.12));
  return targets.map((t, i) => <Line key={i} points={[t.clone().addScaledVector(dir, 3.2), t]} color={INK.sun} lineWidth={1} dashed dashSize={0.035} gapSize={0.05} />);
}

// Moss on the render face, placed by simplex noise so the same wall always grows the same way.
function Moss({ year }) {
  const geo = useMemo(() => {
    const noise = createNoise2D(mulberry32(11)), r = mulberry32(12), pts = [];
    const reach = year / 30;
    for (let z = 20; z < L - 410; z += 9) for (let y = 260; y < 1100; y += 14) {
      const n = (noise(z * 0.004, y * 0.003) + 1) / 2, damp = 1 - (y - 260) / 900; // wetter low on the wall
      if (n * 0.6 + damp * 0.7 > 1.25 - reach * 0.75) { const h = (30 + r() * 120) * (0.3 + reach); pts.push(-0.055, y * S, z * S, -0.06 - r() * 0.012, (y + h) * S, (z + r() * 10 - 5) * S); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); return g;
  }, [Math.round(year)]);
  return <lineSegments geometry={geo}><lineBasicMaterial color={INK.grow} /></lineSegments>;
}

// Groundcover grown by an L-system, in vertical planes on the topsoil.
function Plants({ year }) {
  const geo = useMemo(() => {
    const sys = new LSystem({ axiom: "X", productions: { X: "F[+X]F[-X]+X", F: "FF" } });
    sys.iterate(3);
    const str = sys.getString(), r = mulberry32(21), pts = [], k = (0.25 + year / 30 * 0.75) * 0.016;
    for (let p = 0; p < 9; p++) {
      const x0 = -1.25 + r() * 0.9, z0 = 0.05 + r() * 0.8, st = [];
      let x = 0, y = 0, a = Math.PI / 2;
      for (const ch of str) {
        if (ch === "F") { const nx = x + Math.cos(a), ny = y + Math.sin(a); pts.push(x0 + x * k, -0.02 + y * k, z0, x0 + nx * k, -0.02 + ny * k, z0); x = nx; y = ny; }
        else if (ch === "+") a += 0.45; else if (ch === "-") a -= 0.45; else if (ch === "[") st.push([x, y, a]); else if (ch === "]") [x, y, a] = st.pop();
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); return g;
  }, [Math.round(year)]);
  return <lineSegments geometry={geo}><lineBasicMaterial color={INK.grow} /></lineSegments>;
}

// One drawn tree: the procedural line tree, rasterised once per year and shown upright, always facing the viewer.
function OneTree({ year }) {
  const age = Math.max(0.2, Math.round(year) / 30);
  const tex = useMemo(() => {
    const { svg, aspect } = lineTree({ species: "layered", seed: 4, age });
    const canvas = document.createElement("canvas"); canvas.width = 900; canvas.height = Math.round(900 / aspect);
    const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.userData.aspect = aspect;
    const img = new Image();
    img.onload = () => { canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height); t.needsUpdate = true; };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    return t;
  }, [age]);
  const h = 0.8 + 1.1 * age, w = h * tex.userData.aspect;
  return (
    <Billboard position={[-1.22, -0.026 + h / 2, 0.05]} lockX lockZ>
      <mesh><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} transparent alphaTest={0.04} /></mesh>
    </Billboard>
  );
}

export default function Scene({ gap, seq, hover, setHover, year, storm, date }) {
  return (
    <Canvas flat gl={{ antialias: true }} style={{ background: INK.plate }} onPointerMissed={() => setHover(null)}>
      {/* 2:1 view: 45 degrees round, 30 degrees up */}
      <OrthographicCamera makeDefault position={[-0.61 * 10 - 0.25, 0.5 * 10 + 0.55, 0.61 * 10 + 0.45]} zoom={118} near={0.1} far={50} />
      <OrbitControls target={[-0.25, 0.55, 0.45]} enablePan={false} enableDamping dampingFactor={0.12} minZoom={90} maxZoom={420} />
      {COMP.map((c) => <Part key={c.id} c={c} gap={gap} seq={seq} hover={hover} setHover={setHover} />)}
      <Moss year={year} />
      <Plants year={year} />
      <OneTree year={year} />
      <Rain on={storm} />
      <SunRays date={date} />
    </Canvas>
  );
}
