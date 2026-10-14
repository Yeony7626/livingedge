import { useMemo } from "react";
import { inflatePathsD, JoinType, EndType } from "clipper2-ts";
import { COMP, MEMBRANES, T } from "./detail.js";
import { INK } from "./Scene.jsx";

const Y = (y) => -T(y);
const pts = (poly) => poly.map(([x, y]) => `${x},${Y(y)}`).join(" ");

// 1:10 section in drafting convention. Membranes are specified as lines and offset to bands with clipper2-ts.
export default function Section({ hover, setHover, year }) {
  const bands = useMemo(() => MEMBRANES.map((m) => {
    const out = inflatePathsD([m.path.map(([x, y]) => ({ x, y: Y(y) }))], m.width / 2, JoinType.Miter, EndType.Butt);
    return { ...m, d: out.map((p) => "M" + p.map((q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(" L") + "Z").join(" ") };
  }), []);
  const moss = useMemo(() => Array.from({ length: Math.round(year * 1.2) }, (_, i) => `M-55 ${Y(256 + (i % 5) * 4)} L${-60 - (i * 7) % 22} ${Y(290 + (i * 53) % (80 + year * 16))}`).join(" "), [Math.round(year)]);
  return (
    <svg viewBox="-1450 -1900 2500 3200" className="section" role="img" aria-label="Section, base of wall and eave, 1:10">
      <defs>
        <pattern id="h-conc" width="160" height="160" patternUnits="userSpaceOnUse"><g fill={INK.edge}><circle cx="30" cy="40" r="3" /><circle cx="110" cy="20" r="3" /><circle cx="80" cy="120" r="3" /><circle cx="140" cy="90" r="3" /></g><path d="M50 90 l14 8 l-12 7z M120 140 l12 6 l-10 8z" fill="none" stroke={INK.edge} strokeWidth="2" /></pattern>
        <pattern id="h-earth" width="200" height="200" patternUnits="userSpaceOnUse"><g stroke={INK.edge} strokeWidth="2.4">{[0, 12, 24].map((k) => <line key={k} x1={20 + k} y1="60" x2={54 + k} y2="26" />)}{[0, 12, 24].map((k) => <line key={"b" + k} x1={120 + k} y1="160" x2={154 + k} y2="126" />)}</g></pattern>
        <pattern id="h-rock" width="200" height="200" patternUnits="userSpaceOnUse"><g fill="none" stroke={INK.edge} strokeWidth="2.4"><circle cx="40" cy="50" r="22" /><circle cx="130" cy="40" r="18" /><circle cx="90" cy="130" r="24" /><circle cx="170" cy="150" r="16" /></g></pattern>
        <pattern id="h-gravel" width="120" height="120" patternUnits="userSpaceOnUse"><g fill="none" stroke={INK.edge} strokeWidth="2"><circle cx="20" cy="30" r="8" /><circle cx="70" cy="20" r="6" /><circle cx="50" cy="80" r="9" /><circle cx="100" cy="90" r="7" /></g></pattern>
        <pattern id="h-soil" width="140" height="140" patternUnits="userSpaceOnUse"><g fill={INK.edge}><circle cx="20" cy="30" r="2.6" /><circle cx="80" cy="50" r="2.6" /><circle cx="50" cy="110" r="2.6" /><circle cx="120" cy="100" r="2.6" /></g></pattern>
        <pattern id="h-batt" width="140" height="60" patternUnits="userSpaceOnUse"><path d="M0 0 C 40 0, 40 30, 70 30 S 100 60, 140 60 M0 60 C 40 60, 40 30, 70 30 S 100 0, 140 0" fill="none" stroke={INK.edge} strokeWidth="2" /></pattern>
        <pattern id="h-xps" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 24 L24 0 M0 0 L24 24" stroke={INK.mid} strokeWidth="1.6" /></pattern>
        <pattern id="h-render" width="60" height="60" patternUnits="userSpaceOnUse"><g fill={INK.edge}><circle cx="10" cy="12" r="1.6" /><circle cx="40" cy="30" r="1.6" /><circle cx="22" cy="50" r="1.6" /></g></pattern>
      </defs>
      <path d={`M-1300 ${Y(-26)} L-300 ${Y(-6)} L-5 0`} className="pen-edge" fill="none" />
      {COMP.filter((c) => c.id !== "leg" || true).map((c) => {
        const lit = hover === c.id;
        if (c.beyond) return <polygon key={c.id} points={pts(c.poly)} className="pen-hid" fill="none" />;
        const xs = c.poly.map((p) => p[0]), ys = c.poly.map((p) => Y(p[1]));
        return (
          <g key={c.id} onPointerEnter={() => setHover(c.id)} onPointerLeave={() => setHover(null)}>
            <polygon points={pts(c.poly)} fill={INK.plate} />
            {c.hatch && <polygon points={pts(c.poly)} fill={`url(#h-${c.hatch})`} />}
            {c.cross && <path d={`M${Math.min(...xs)} ${Math.min(...ys)} L${Math.max(...xs)} ${Math.max(...ys)} M${Math.min(...xs)} ${Math.max(...ys)} L${Math.max(...xs)} ${Math.min(...ys)}`} className="pen-fine" />}
            <polygon points={pts(c.poly)} fill="none" className={lit ? "pen-hi" : "pen-cut"} />
          </g>
        );
      })}
      {bands.map((b) => <path key={b.id} d={b.d} fill={INK.hi} onPointerEnter={() => setHover(b.id)} onPointerLeave={() => setHover(null)} />)}
      <rect x="-80" y={Y(1100) - 16} width="320" height="32" fill={INK.plate} />
      <path d={`M-110 ${Y(1100)} L-10 ${Y(1100)} L12 ${Y(1100) - 40} L42 ${Y(1100) + 40} L64 ${Y(1100)} L260 ${Y(1100)}`} className="pen-edge" fill="none" />
      <path d={moss} stroke={INK.grow} strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
      <g className="pen-fine"><line x1="-120" y1="0" x2="-120" y2={Y(252)} /><line x1="-150" y1="0" x2="-90" y2="0" /><line x1="-150" y1={Y(252)} x2="-90" y2={Y(252)} /></g>
      <text x="-135" y={Y(110)} className="dim" textAnchor="end">250</text>
      <text x="-1400" y={Y(-1270)} className="title">Detail 01. Base of wall and eave</text>
      <text x="-1400" y={Y(-1370)} className="dim">1:10, Vancouver. Clearance per VBBL 9.27.2.4</text>
    </svg>
  );
}
