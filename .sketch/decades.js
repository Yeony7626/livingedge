/**
 * Decades: a small pavilion edge standing on a ground slab, a gravel strip
 * dashed round its plinth, a seat against one face, a thin roof plate above.
 * Growth rises as short strokes from the foot of each rendered face. The
 * pointer is the sun, read on the ground plane: a face turned from it stays
 * damp and grows tall, a face turned to it dries and stays low. The slider is
 * the years. The face with the most growth takes the bright stroke.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg, unproj, spring, stepS,
  mk, pointer, put, register, disposer, solid,
} = HL;

const W0 = 30, W1 = 90, PL = 7, TOP = 52, HMAX = 42, MID = 60, STEP = 2.5;
const STAGES = [[0.1, "clean"], [0.3, "biofilm"], [0.55, "algae"], [0.8, "moss"], [9, "lichen"]];

// The two faces the camera sees: +x and +y, each with its outward normal.
const FACES = [
  { n: [1, 0], at: (s) => [W1, s] },
  { n: [0, 1], at: (s) => [s, W1] },
];

/** Shade of a face from a sun direction: 0 facing it, 1 turned away, floored so nothing is bare forever. */
const shade = (n, d) => clamp(0.5 - 0.5 * (n[0] * d[0] + n[1] * d[1]), 0.12, 1);
/** Uneven tuft lengths, fixed per position, so rest is a composition and not a comb. */
const tuft = (s) => 0.5 + 0.5 * Math.abs(Math.sin(s * 0.37) * Math.cos(s * 0.11 + 1.3));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[0, 0, -5], [120, 120, -5], [120, 0, -5], [0, 120, -5], [20, 20, TOP + 4], [100, 100, TOP + 4]], 200, 166);
  const P = proj(C), front = facing(C);
  const REST = [-0.8, 0.6]; // a low sun from the far left: the +x face greens, the +y face half.

  const g = mk("g", {}, svg);
  const [sr, si] = rings(0, 0, 120, 120, 10, 2.2);
  put(solid(g), prism(P, front, sr, si, -5, 0));
  // The gravel strip: a dashed guide on the ground, painted before the plinth that covers its far side.
  const [gr] = rings(W0 - 9, W0 - 9, W1 + 9, W1 + 9, 6, 1);
  mk("path", { class: "dash nf", d: "M" + gr.map((q) => P(q.u, q.v, 0).join(",")).join("L") + "Z" }, g);
  const [pr, pi] = rings(W0 - 2, W0 - 2, W1 + 2, W1 + 2, 3, 1);
  put(solid(g), prism(P, front, pr, pi, 0, PL));
  const [wr, wi] = rings(W0, W0, W1, W1, 3, 1.2);
  put(solid(g), prism(P, front, wr, wi, PL, TOP));

  const faces = FACES.map((f) => ({ ...f, sp: spring(shade(f.n, REST), { eps: 0.002 }), el: mk("path", { class: "nf lo" }, g), drawn: "" }));
  const [br, bi] = rings(W0 + 8, W1 + 5, W1 - 8, W1 + 13, 2.5, 0.9);
  put(solid(g), prism(P, front, br, bi, 0, 10));
  const [rr, ri] = rings(W0 - 10, W0 - 10, W1 + 10, W1 + 10, 4, 1.4);
  put(solid(g), prism(P, front, rr, ri, TOP, TOP + 4));

  const yrs = spring(value, { eps: 0.02 });
  let over = null, lead = null;

  function draw() {
    let best = faces[0];
    for (const f of faces) {
      const h = HMAX * (yrs.x / 30) * f.sp.x, key = h.toFixed(2);
      if (f.sp.t > best.sp.t) best = f;
      if (key === f.drawn) continue;
      f.drawn = key;
      let d = "";
      for (let s = W0 + 3; s <= W1 - 3; s += STEP) {
        const [x, y] = f.at(s);
        d += seg(P(x, y, PL), P(x, y, PL + Math.max(0.6, h * tuft(s))));
      }
      f.el.setAttribute("d", d);
    }
    if (best !== lead) {
      lead = best;
      faces.forEach((f) => f.el.setAttribute("class", f === lead ? "nf hi" : "nf lo"));
    }
  }

  const B = register(stage, (dt) => {
    let m = stepS(yrs, dt);
    for (const f of faces) if (stepS(f.sp, dt)) m = true;
    draw();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    let d = REST;
    if (over) {
      const dx = over[0] - MID, dy = over[1] - MID, r = Math.hypot(dx, dy) || 1;
      d = [dx / r, dy / r];
    }
    for (const f of faces) f.sp.t = shade(f.n, d);
    const top = Math.max(...faces.map((f) => f.sp.t)) * (yrs.t / 30);
    read.textContent = over ? `${Math.round(yrs.t)} yr · ${STAGES.find((s) => top < s[0])[1]}` : "rest";
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());
  retarget();

  return {
    set: (v) => { yrs.t = v; retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "decades",
  means: "Over the years, growth climbs the faces of an edge that the sun leaves damp.",
  rules: [1, 3, 5, 9],
  range: [5, 15, 30],
  tour: [[300, 175], [100, 175], [200, 262], null],
  mount,
});
