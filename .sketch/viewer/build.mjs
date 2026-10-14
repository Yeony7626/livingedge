// Bakes a detail spec + materials into one self-contained page (no server needed; three.js from jsDelivr).
//   node build.mjs [../rhino/detail02.json]  ->  index.html   (page shell: shell.html)
import { readFileSync, writeFileSync } from "node:fs";

const here = (f) => new URL(f, import.meta.url);
const specPath = process.argv[2] ?? "../rhino/detail02.json";
const spec = JSON.parse(readFileSync(new URL(specPath, import.meta.url), "utf8"));
const mats = JSON.parse(readFileSync(here("../rhino/materials.json"), "utf8"));
const used = Object.fromEntries(Object.entries(mats).filter(([k]) => spec.parts.some((p) => p.mat === k)));
// thermal-core.mjs is shared with the landing build: inlined here with its "export" dropped
const js = ["viewer.js", "thermal-core.mjs", "thermal.js", "draft.js"].map((f) => readFileSync(here(`./${f}`), "utf8").replace(/^export /gm, "")).join("\n");
const data = JSON.stringify({ spec, mats: used }).replace(/</g, "\\u003c");
const html = readFileSync(here("./shell.html"), "utf8")
  .replace("__PARTS__", String(spec.parts.length))
  .replace("__DATA__", () => data)
  .replace("__JS__", () => js);
writeFileSync(here("./index.html"), html);
console.log("index.html written", spec.parts.length, "parts");
