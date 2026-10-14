// Landing page data helpers (classic script, read by the 3D module): the reviewers' ageing keyframes.
const D = window.LANDING;
const lerp = (a, b, t) => a + (b - a) * t;
function keyframe(year) {
  const ys = D.ageing.years, i = Math.max(0, ys.findIndex((y, k) => year <= ys[k + 1] || k === ys.length - 2));
  return [i, Math.min(1, Math.max(0, (year - ys[i]) / (ys[i + 1] - ys[i])))];
}
// finish colour of a material at a given year, or null when the reviewers give no keyframes for it
function aged(mat, year) {
  const keys = D.ageing.rgb[mat];
  if (!keys) return null;
  const [i, t] = keyframe(year);
  return `rgb(${keys[i].map((v, k) => Math.round(lerp(v, keys[i + 1][k], t))).join(",")})`;
}
// planting size factor at a given year
function growth(kind, year) {
  const g = D.ageing.grow[kind];
  if (!g) return 1;
  const [i, t] = keyframe(year);
  return lerp(g[i], g[i + 1], t);
}
