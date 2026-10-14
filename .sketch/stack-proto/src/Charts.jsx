import { scaleLinear } from "d3-scale";
import { area, line, curveMonotoneX, curveStepAfter } from "d3-shape";
import { INK } from "./Scene.jsx";

// Illustrative rules only, to show the chart style: wetting during 6 h of rain, drying over 24 h.
function storm(exposure) {
  const out = []; let w = 0.1;
  for (let h = 0; h <= 30; h++) { if (h < 6) w += (1 - w) * 0.28 * exposure; else w -= w * 0.11; out.push([h, w]); }
  return out;
}
const STAGES = ["clean", "biofilm", "algae", "moss", "lichen"];
const growth = [[0, 0], [5, 1], [15, 3], [30, 4]];

export function StormChart({ year, overhang = 600 }) {
  const W = 300, H = 120, m = { l: 30, r: 8, t: 10, b: 22 };
  const x = scaleLinear([0, 30], [m.l, W - m.r]), y = scaleLinear([0, 1], [H - m.b, m.t]);
  const silt = 1 + year / 60, render = storm(Math.max(0.25, 1 - overhang / 1200) * silt), base = storm(0.55 * silt);
  const a = area().x((d) => x(d[0])).y0(y(0)).y1((d) => y(d[1])).curve(curveMonotoneX);
  const l = line().x((d) => x(d[0])).y((d) => y(d[1])).curve(curveMonotoneX);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Wetness over one storm, illustrative">
      <rect x={x(0)} y={m.t} width={x(6) - x(0)} height={H - m.b - m.t} fill={INK.water} opacity=".07" />
      <path d={a(render)} fill={INK.water} opacity=".12" />
      <path d={l(render)} stroke={INK.water} fill="none" strokeWidth="1.2" />
      <path d={l(base)} stroke={INK.edge} fill="none" strokeWidth="1" strokeDasharray="1 3" strokeLinecap="round" />
      {[0, 6, 12, 18, 24, 30].map((t) => <text key={t} x={x(t)} y={H - 6} className="tick" textAnchor="middle">{t}h</text>)}
      <text x={m.l} y={m.t + 8} className="tick">render</text>
      <text x={x(14)} y={y(base[14][1]) - 6} className="tick">plinth</text>
    </svg>
  );
}

export function GrowthChart({ year }) {
  const W = 300, H = 120, m = { l: 48, r: 8, t: 10, b: 22 };
  const x = scaleLinear([0, 30], [m.l, W - m.r]), y = scaleLinear([0, 4], [H - m.b, m.t]);
  const l = line().x((d) => x(d[0])).y((d) => y(d[1])).curve(curveStepAfter);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Growth stage on the north render, qualitative">
      {STAGES.map((s, i) => <text key={s} x={m.l - 6} y={y(i) + 3} className="tick" textAnchor="end">{s}</text>)}
      <path d={l(growth)} stroke={INK.grow} fill="none" strokeWidth="1.3" strokeDasharray="5 4" />
      <line x1={x(year)} x2={x(year)} y1={m.t} y2={H - m.b} stroke={INK.hi} strokeWidth="1" />
      {[0, 5, 15, 30].map((t) => <text key={t} x={x(t)} y={H - 6} className="tick" textAnchor="middle">{t}</text>)}
    </svg>
  );
}
