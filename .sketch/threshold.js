/**
 * Threshold: the ground at a wall's foot, cut out and pulled slightly apart:
 * topsoil, gravel, filter fabric, drain rock, subsoil, with the plinth standing
 * through them at one end. The pointer picks how deep the water gets: every
 * layer down to the one chosen is wet, its drops lit on its top, and the gaps
 * the water has passed open up in turn from that layer. The slider is the rain,
 * in mm an hour: heavier rain opens the gaps wider.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, tween, tset, tval, tdone,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const LAYERS = [["topsoil", 10], ["gravel", 8], ["fabric", 2], ["drain rock", 12], ["subsoil", 14]];
const REST_GAP = [5, 3, 8, 4], X1 = 110, Y1 = 50, DROPS = [14, 34, 54, 74, 94], STAG = 40;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.5);
  fit(C, [[0, 0, 0], [X1 + 20, Y1 + 2, 0], [0, Y1, 0], [X1 + 20, -2, 0], [0, 0, 108], [X1 + 20, Y1 + 2, 108]], 200, 166);
  const P = proj(C), front = facing(C);
  let open = 4 + 8 * clamp(value / 40, 0, 1), act = -1;

  /** Top of layer i, given the gaps under it: the bottom layer stands on z 0. */
  const tops = (gaps) => {
    const t = [];
    let z = 0;
    for (let i = LAYERS.length - 1; i >= 0; i--) {
      z += LAYERS[i][1];
      t[i] = z;
      if (i > 0) z += gaps[i - 1];
    }
    return t;
  };
  const restTop = tops(REST_GAP);

  // Bottom to top, so each plate covers the one under it; each layer's drops sit
  // on its top, painted before the plate above. The plinth is nearest: last.
  const g = mk("g", {}, svg), layers = [];
  for (let i = LAYERS.length - 1; i >= 0; i--) {
    const [ring, inner] = rings(0, 0, X1, Y1, 4, LAYERS[i][1] > 3 ? 1.4 : 0.6);
    const el = solid(g), dots = DROPS.map(() => flatDot(g, C, 1.1, "dot off"));
    layers[i] = { ring, inner, el, dots, gap: i < LAYERS.length - 1 ? tween(REST_GAP[i]) : null, drawn: NaN };
  }
  const [pr, pi] = rings(X1 + 2, -2, X1 + 20, Y1 + 2, 3, 1.2);
  put(solid(g), prism(P, front, pr, pi, 0, 108));

  function draw(now) {
    const t = tops(REST_GAP.map((_, i) => tval(layers[i].gap, now)));
    layers.forEach((L, i) => {
      if (t[i] === L.drawn) return;
      L.drawn = t[i];
      put(L.el, prism(P, front, L.ring, L.inner, t[i] - LAYERS[i][1], t[i]));
      L.dots.forEach((d, k) => place(d, P(DROPS[k], Y1 - 5, t[i])));
    });
  }

  /** Picks by the rest pose (rule 01): the layer whose resting front edge is nearest the pointer's height on screen. */
  function hit(p) {
    if (p[0] < P(0, Y1, 0)[0] - 10 || p[0] > P(X1, 0, 0)[0] + 10) return -1;
    let best = -1, bd = Infinity;
    restTop.forEach((z, i) => {
      const d = Math.abs(P(X1 / 2, Y1, z)[1] - p[1]);
      if (d < bd) { bd = d; best = i; }
    });
    return bd < 40 ? best : -1;
  }

  const B = register(stage, (_dt, now) => {
    draw(now);
    return layers.some((L) => L.gap && !tdone(L.gap, now));
  });
  bag.add(B.unregister);

  /** Water reaches layer a (at rest, the gravel). Gaps it passed open, spreading out from a. */
  function setFront(a, force) {
    if (a === act && !force) return;
    act = a;
    const f = a < 0 ? 1 : a, now = performance.now();
    layers.forEach((L, i) => {
      if (L.gap) tset(L.gap, REST_GAP[i] + (a >= 0 && i < a ? open : 0), now, Math.abs(i - f) * STAG);
      L.el.sil.classList.toggle("hi", i === f);
      L.dots.forEach((d) => d.setAttribute("class", i <= f ? "dot m" : "dot off"));
    });
    read.textContent = a < 0 ? "rest" : `${LAYERS[a][0]} · wet`;
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setFront(hit(p)), leave: () => setFront(-1) }));
  bag.add(() => svg.replaceChildren());
  draw(performance.now());
  setFront(-1, true);

  return {
    set: (v) => { open = 4 + 8 * clamp(v / 40, 0, 1); setFront(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "threshold",
  means: "Rain finds its way down through the ground at a wall's foot, layer by layer, opening each gap it passes.",
  rules: [1, 2, 5, 6],
  range: [5, 15, 40],
  tour: [[150, 120], [150, 200], [150, 160], null],
  mount,
});
