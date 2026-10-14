import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { SPECIES, lineTree, leafTree } from "./tree.js";
import "./styles.css";

function LeafCanvas({ species, seed, age }) {
  const ref = useRef();
  useEffect(() => { leafTree(ref.current, { species, seed, age }); }, [species, seed, age]);
  return <canvas ref={ref} width="520" height="620" className="leaf" />;
}

function Study() {
  const [age, setAge] = useState(1);
  const [seed, setSeed] = useState(3);
  return (
    <div className="app">
      <header><h1>Tree study <span>procedural, line and rendered</span></h1>
        <p>Same seed and age always draw the same tree. Crowns are merged leaf clusters (clipper2-ts) with fringed edges (simplex-noise).</p></header>
      <section className="tree-ctl">
        <label htmlFor="age">Age <em>{Math.round(age * 30)} years</em></label>
        <input id="age" type="range" min="0.15" max="1" step="0.01" value={age} onChange={(e) => setAge(+e.target.value)} />
        <button type="button" onClick={() => setSeed((s) => s + 1)}>Another tree</button>
      </section>
      <section className="tree-grid">
        {Object.entries(SPECIES).map(([k, sp]) => (
          <figure key={k}>
            <figcaption>{sp.label}</figcaption>
            <div className="pair">
              <div className="line" dangerouslySetInnerHTML={{ __html: lineTree({ species: k, seed, age }).svg }} />
              <LeafCanvas species={k} seed={seed} age={age} />
            </div>
          </figure>
        ))}
      </section>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<Study />);
