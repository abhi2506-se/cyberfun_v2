"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value:150, suffix:"+", label:"Projects Delivered", desc:"Across 20+ countries" },
  { value:98,  suffix:"%", label:"Client Satisfaction", desc:"Based on NPS surveys" },
  { value:50,  suffix:"+", label:"Expert Engineers",    desc:"Full-stack specialists" },
  { value:5,   suffix:"yr",label:"Industry Experience", desc:"Since 2020" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0; const step = value / (1800/16);
    const t = setInterval(() => { cur += step; if (cur >= value) { setN(value); clearInterval(t); } else setN(Math.floor(cur)); }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-20 bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div key={s.label} className="text-center"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}>
            <div className="text-4xl sm:text-5xl font-display font-bold grad-text mb-2"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="font-semibold text-[var(--text)] mb-1">{s.label}</div>
            <div className="text-sm text-[var(--muted)]">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
