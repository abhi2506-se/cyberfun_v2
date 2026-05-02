"use client";
import React from "react";
import { motion } from "framer-motion";

const TECH = ["Next.js","React","TypeScript","Node.js","Python","PostgreSQL","MongoDB","Redis","AWS","Docker","Kubernetes","TensorFlow","React Native","Flutter","Figma","GraphQL","Prisma","Tailwind CSS","Stripe","Vercel","Go","Rust","Swift","Kotlin"];

function Row({ rev }: { rev?: boolean }) {
  const doubled = [...TECH, ...TECH];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-3 ${rev ? "animate-marquee2" : "animate-marquee"}`} style={{minWidth:"max-content"}}>
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg2)] whitespace-nowrap text-sm text-[var(--muted)] hover:text-[var(--text)] hover:border-sky-500/40 transition-colors cursor-default">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Technology</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Our <span className="grad-text">Tech Arsenal</span></h2>
        </motion.div>
      </div>
      <div className="space-y-4">
        <Row />
        <Row rev />
      </div>
    </section>
  );
}
