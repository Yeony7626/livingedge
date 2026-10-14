/**
 * Sitting: a bench on two supports against the foot of a wall. Moss grows as
 * short strokes over the seat; where someone sits, the seat is worn bare,
 * falling off to full growth away from them. The pointer is the sitter, read
 * on the seat's top plane; a small mark of dots says where they are. The
 * slider is the years of use.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const X0 = 5, X1 = 165, Y0 = 6, Y1 = 30, ZS = 17, HMAX = 24, R = 32, REST_X = 58;
const TUFTS = [];
for (let x = X0 + 5; x <= X1 - 5; x += 3.5) for (const y of [Y0 + 4, Y0 + 9, Y0 + 14, Y0 + 19]) TUFTS.push([x, y]);
/** Uneven lengths, fixed per position, so the seat's growth is a field and not a comb. */
const tuft = (x, y) => 0.45 + 0.55 * Math.abs(Math.sin(x * 0.29 + y) * Math.cos(x * 0.07 + y * 0.3));
/** How bare the seat is at d from the sitter: 1 under them, gone by 2R. */
const wear = (d) => clamp(1 - (d / (2 * R)) ** 1.6, 0, 1);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.55);
  fit(C, [[X0 - 5, -12, 0], [X1 + 5, Y1 + 4, 0], [X1 + 5, -12, 0], [X0 - 5, Y1 + 4, 0], [X0, -12, 46], [X1, -12, 46], [X1, Y1, ZS + HMAX]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [wr, wi] = rings(X0 - 5, -12, X1 + 5, -2, 3, 1.2);
  put(solid(g), prism(P, front, wr, wi, 0, 46));
  for (const sx of [X0 + 12, X1 - 24]) {
    const [r, i] = rings(sx, Y0 + 4, sx + 12, Y1 - 4, 2, 0.8);
    put(solid(g), prism(P, front, r, i, 0, ZS - 4));
  }
  const [sr, si] = rings(X0, Y0, X1, Y1, 3.5, 1.2);
  put(solid(g), prism(P, front, sr, si, ZS - 4, ZS));
  const moss = mk("path", { class: "nf" }, g);
  const mark = [flatDot(g, C, 1.6, "dot"), flatDot(g, C, 1.1, "dot m"), flatDot(g, C, 1.1, "dot m")];

  const sit = spring(REST_X, { eps: 0.05 }), yrs = spring(value, { eps: 0.02 });
  let drawn = "", last = null;

  function draw() {
    const key = sit.x.toFixed(2) + "|" + yrs.x.toFixed(2);
    if (key === drawn) return;
    drawn = key;
    let d = "";
    for (const [x, y] of TUFTS) {
      const h = HMAX * (yrs.x / 30) * tuft(x, y) * (1 - wear(Math.abs(x - sit.x)));
      if (h > 0.4) d += seg(P(x, y, ZS), P(x, y, ZS + h));
    }
    moss.setAttribute("d", d || "M0 0");
    const yc = (Y0 + Y1) / 2;
    place(mark[0], P(sit.x, yc, ZS));
    place(mark[1], P(sit.x - 5, yc, ZS));
    place(mark[2], P(sit.x + 5, yc, ZS));
  }

  const B = register(stage, (dt) => {
    const m = stepS(sit, dt) | stepS(yrs, dt);
    draw();
    return !!m;
  });
  bag.add(B.unregister);

  function retarget(p) {
    last = p;
    const w = p && unproj(C, p[0], p[1], ZS);
    const on = w && w[0] > X0 - 10 && w[0] < X1 + 10 && w[1] > Y0 - 14 && w[1] < Y1 + 14;
    sit.t = on ? clamp(w[0], X0 + 6, X1 - 6) : REST_X;
    read.textContent = on ? `${(sit.t / 100).toFixed(1)} m · ${Math.round(yrs.t)} yr` : "rest";
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => retarget(p), leave: () => retarget(null) }));
  bag.add(() => svg.replaceChildren());
  retarget(null);

  return {
    set: (v) => { yrs.t = v; retarget(last); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "sitting",
  means: "Where people sit, a bench stays worn bare; everywhere else on it, moss takes hold over the years.",
  rules: [1, 3, 5, 8],
  range: [5, 15, 30],
  tour: [[118, 140], [270, 215], [190, 175], null],
  mount,
});
