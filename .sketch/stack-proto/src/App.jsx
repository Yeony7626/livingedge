import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, animate } from "motion/react";
import Scene, { sunAt } from "./Scene.jsx";
import Section from "./Section.jsx";
import { StormChart, GrowthChart } from "./Charts.jsx";
import { COMP, MEMBRANES } from "./detail.js";

const NAMES = Object.fromEntries([...COMP.map((c) => [c.id, c.short]), ...MEMBRANES.map((m) => [m.id, m.name])]);
const KEYS = [0, 5, 15, 30];
const STAGE = { 0: "as built", 5: "biofilm", 15: "moss", 30: "moss and lichen" };

// Ambient rain in the browser: filtered noise, off until asked for.
function useRain(on) {
  const ctx = useRef(null), gain = useRef(null);
  useEffect(() => {
    if (!on && !ctx.current) return;
    if (!ctx.current) {
      const c = new AudioContext(), b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(); s.buffer = b; s.loop = true;
      const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1400; f.Q.value = 0.6;
      const g = c.createGain(); g.gain.value = 0; s.connect(f).connect(g).connect(c.destination); s.start();
      ctx.current = c; gain.current = g;
    }
    gain.current.gain.linearRampToValueAtTime(on ? 0.2 : 0, ctx.current.currentTime + 0.8);
  }, [on]);
}

export default function App() {
  const [hover, setHover] = useState(null);
  const [year, setYear] = useState(0);
  const [storm, setStorm] = useState(false);
  const [sound, setSound] = useState(false);
  const [hour, setHour] = useState(15);
  const [summer, setSummer] = useState(true);
  const gap = useSpring(0.12, { stiffness: 100, damping: 18 });
  const seq = useMotionValue(99);
  const [gapUi, setGapUi] = useState(0.12);
  useRain(storm && sound);

  const date = new Date(Date.UTC(2026, summer ? 5 : 11, 21, hour + 7 + (summer ? 0 : 1), 0));
  const sun = sunAt(date);
  const snap = (v) => { const k = KEYS.find((k) => Math.abs(k - v) <= 1); return k ?? v; };
  const keyframe = KEYS.includes(year);
  const assemble = () => { seq.set(0); gap.set(0); setGapUi(0); animate(seq, 18, { duration: 9, ease: "linear" }); };

  return (
    <div className="app">
      <header>
        <h1>The Living Edge <span>stack prototype</span></h1>
        <p>three.js · react-three-fiber · drei · Motion · clipper2-ts · simplex-noise · lindenmayer · procedural line trees · suncalc · d3</p>
      </header>
      <section className="views">
        <div className="view">
          <div className="vh"><span>Axonometric, 2:1</span><span className="mono">drag to orbit · point to name</span></div>
          <div className="canvas">
            <Scene gap={gap} seq={seq} hover={hover} setHover={setHover} year={year} storm={storm} date={date} />
            <AnimatePresence mode="wait">
              <motion.div key={hover ?? "rest"} className="readout" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>{hover ? NAMES[hover] : "rest"}</motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="view">
          <div className="vh"><span>Section</span><span className="mono">1:10</span></div>
          <div className="canvas"><Section hover={hover} setHover={setHover} year={year} /></div>
        </div>
      </section>
      <section className="controls">
        <div className="ctl">
          <label htmlFor="gap">Open the layers</label>
          <input id="gap" type="range" min="0" max="1" step="0.01" value={gapUi} onChange={(e) => { const v = +e.target.value; setGapUi(v); gap.set(v); }} />
          <button type="button" onClick={assemble}>Play the assembly</button>
        </div>
        <div className="ctl">
          <label htmlFor="year">Year {year} <em>{keyframe ? STAGE[year] : "blended, interpolated"}</em></label>
          <input id="year" type="range" min="0" max="30" step="1" value={year} onChange={(e) => setYear(snap(+e.target.value))} />
          <div className="ticks">{KEYS.map((k) => <button key={k} type="button" aria-pressed={year === k} onClick={() => setYear(k)}>{k}</button>)}</div>
        </div>
        <div className="ctl">
          <label htmlFor="hour">Sun, {summer ? "21 June" : "21 December"}, {String(hour).padStart(2, "0")}:00</label>
          <input id="hour" type="range" min="5" max="21" step="1" value={hour} onChange={(e) => setHour(+e.target.value)} />
          <div className="ticks">
            <button type="button" aria-pressed={summer} onClick={() => setSummer(true)}>June</button>
            <button type="button" aria-pressed={!summer} onClick={() => setSummer(false)}>December</button>
          </div>
          <p className="note">{sun.alt <= 0 ? "Sun below the horizon." : `Altitude ${Math.round(sun.alt)}°. ${sun.northLit ? "Sun reaches the north face." : "North face in shade."}`}</p>
        </div>
        <div className="ctl">
          <span className="lab">Weather</span>
          <div className="ticks">
            <button type="button" aria-pressed={storm} onClick={() => setStorm((s) => !s)}>{storm ? "Stop the storm" : "Play a storm"}</button>
            <button type="button" aria-pressed={sound} onClick={() => setSound((s) => !s)}>{sound ? "Sound on" : "Sound off"}</button>
          </div>
        </div>
      </section>
      <section className="charts">
        <figure><figcaption>One storm at year {year}, wetness (illustrative)</figcaption><StormChart year={year} /></figure>
        <figure><figcaption>Growth on the north render (qualitative)</figcaption><GrowthChart year={year} /></figure>
      </section>
    </div>
  );
}
