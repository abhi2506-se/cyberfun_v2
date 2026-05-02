"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const PROJS = [
  { title:"FinanceAI Dashboard", cat:"Web App",    grad:"from-blue-500/20 to-cyan-500/20",   accent:"bg-blue-500",   tech:["Next.js","Python","TensorFlow"], desc:"Real-time financial analytics with AI-powered predictions." },
  { title:"MedConnect Platform", cat:"Full Stack",  grad:"from-green-500/20 to-teal-500/20",  accent:"bg-green-500",  tech:["React","Node.js","WebRTC"],      desc:"HIPAA-compliant telemedicine serving 50K+ patients." },
  { title:"ShopAI Marketplace",  cat:"E-Commerce", grad:"from-purple-500/20 to-pink-500/20", accent:"bg-purple-500", tech:["Next.js","Stripe","Redis"],      desc:"Multi-vendor marketplace with AR product preview." },
];

export function Projects() {
  return (
    <section className="py-24 bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="flex items-end justify-between mb-14" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Our Work</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mt-2">Featured <span className="grad-text">Projects</span></h2>
          </div>
          <Link href="/portfolio" className="hidden sm:flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium text-sm transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJS.map((p, i) => (
            <motion.div key={p.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.12}} className="group">
              <div className={`rounded-2xl bg-gradient-to-br ${p.grad} border border-[var(--border)] p-6 h-full hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300`}>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-sky-500/15 text-sky-400 mb-4">{p.cat}</span>
                <div className="relative h-36 mb-5 rounded-xl overflow-hidden bg-[var(--bg3)] border border-[var(--border)]">
                  <div className="absolute top-2 left-2 flex gap-1">
                    {["bg-red-400","bg-yellow-400","bg-green-400"].map(c => <div key={c} className={`w-2 h-2 rounded-full ${c}`} />)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-2xl ${p.accent} opacity-30 blur-xl`} />
                    <div className={`absolute w-8 h-8 rounded-xl ${p.accent} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white/60 rounded" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 space-y-1">
                    <div className="h-1.5 bg-[var(--border)] rounded-full w-3/4" />
                    <div className="h-1.5 bg-[var(--border)] rounded-full w-1/2" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-sky-400 transition-colors">{p.title}</h3>
                <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]">{t}</span>)}
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href="/portfolio" className="flex items-center gap-1 text-sm text-sky-400 font-medium">
                    <ExternalLink className="w-4 h-4" /> Case Study
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
