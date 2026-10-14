// v0: the original prototype detail (stack-proto/src/detail.js) as first modelled in Rhino, kept for
// side-by-side comparison. Its flashing polygon self-intersects, so it is rebuilt from a 2 mm centreline
// offset as it was in that first test. Not sourced; see research/06–07 for why it was replaced.
import { writeFileSync } from "node:fs";
import { COMP, L, T } from "../stack-proto/src/detail.js";

const ROLE = { footing: "concrete", fwall: "concrete", slab: "concrete", rock: "drainage", gravel: "drainage", backfill: "ground", topsoil: "ground",
  base: "ground", xps: "thermal", frame: "thermal", flash: "water", render: "cladding", seat: "furniture", leg: "furniture" };
const parts = COMP.map((c) => {
  const p = { id: c.id, name: c.name, role: ROLE[c.id] ?? "frame", junction: "v0", src: ["stack-proto detail.js (unsourced)"],
    poly: c.poly.map(([x, y]) => [x, T(y)]), runs: c.posts ?? [[c.w0 ?? 0, c.w1 ?? L]] };
  if (c.id === "flash") Object.assign(p, { type: "sheet", t: 2, path: [[-3, 345], [-3, 233], [-59, 233], [-69, 216]], poly: undefined });
  return p;
});
writeFileSync(new URL("./detail00.json", import.meta.url), JSON.stringify({ L, parts, views: [] }, null, 1));
console.log(`${parts.length} parts`);
