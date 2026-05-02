"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const CATS = ["All","Web App","Mobile","AI/ML","E-Commerce","Design"];
const PROJECTS = [
  { id:"1", title:"FinanceAI Dashboard",  cat:"AI/ML",      tags:["Next.js","Python","ML"],       grad:"from-blue-500/20 to-cyan-500/20",    desc:"Real-time financial analytics with ML predictions" },
  { id:"2", title:"MedConnect Platform",  cat:"Web App",    tags:["React","Node.js","WebRTC"],    grad:"from-green-500/20 to-teal-500/20",   desc:"HIPAA-compliant telemedicine for 50K+ patients" },
  { id:"3", title:"ShopAI Marketplace",   cat:"E-Commerce", tags:["Next.js","Stripe","Redis"],    grad:"from-purple-500/20 to-pink-500/20",  desc:"Multi-vendor marketplace with AR product preview" },
  { id:"4", title:"TradeRoute App",       cat:"Mobile",     tags:["React Native","Firebase"],     grad:"from-orange-500/20 to-red-500/20",   desc:"B2B trade platform for 10K+ SME businesses" },
  { id:"5", title:"DeepSense AI Vision",  cat:"AI/ML",      tags:["Python","PyTorch","OpenCV"],   grad:"from-indigo-500/20 to-violet-500/20",desc:"Computer vision defect detection for manufacturing" },
  { id:"6", title:"LegalTech Suite",      cat:"Web App",    tags:["Next.js","Prisma","OpenAI"],   grad:"from-amber-500/20 to-yellow-500/20", desc:"Document automation & case management system" },
  { id:"7", title:"FitLife Mobile",       cat:"Mobile",     tags:["Flutter","Firebase","ML"],     grad:"from-rose-500/20 to-pink-500/20",    desc:"Personal training app with 200K+ active users" },
  { id:"8", title:"BrandStudio Design",   cat:"Design",     tags:["Figma","Framer","Storybook"],  grad:"from-sky-500/20 to-blue-500/20",     desc:"Complete brand identity for 30+ startups" },
  { id:"9", title:"EdTech Platform",      cat:"Web App",    tags:["Next.js","WebRTC","Socket.io"],grad:"from-emerald-500/20 to-green-500/20",desc:"Live learning platform with 100K+ students" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);
  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-4">Our <span className="grad-text">Best Work</span></h1>
            <p className="text-[var(--text2)] text-lg max-w-xl mx-auto">A selection of projects we're incredibly proud of.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active===c ? "bg-sky-500 text-white" : "border border-[var(--border)] text-[var(--text2)] hover:border-sky-500/40 hover:text-[var(--text)]"}`}>
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div key={p.id} layout initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.9}}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
                  <div className={`h-44 bg-gradient-to-br ${p.grad} relative`}>
                    <div className="absolute top-3 left-3"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/15 text-sky-400">{p.cat}</span></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl font-display font-bold text-white/10">{p.id.padStart(2,"0")}</div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"><ExternalLink className="w-4 h-4 text-white" /></button>
                      <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"><Github className="w-4 h-4 text-white" /></button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold mb-1.5 group-hover:text-sky-400 transition-colors">{p.title}</h3>
                    <p className="text-[var(--muted)] text-sm mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg3)] text-[var(--muted)] border border-[var(--border)]">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
