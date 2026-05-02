"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const T = [
  { name:"Priya Sharma",   role:"CTO, FinovateAI",          content:"Cyberfun delivered our fintech platform 3 weeks ahead of schedule. Their technical expertise is unmatched.", avatar:"PS" },
  { name:"Rahul Mehta",    role:"Founder, MedConnect India", content:"They built our HIPAA-compliant healthcare platform with exceptional quality and guided us through compliance.", avatar:"RM" },
  { name:"Sarah Johnson",  role:"VP Eng, RetailGiant UK",    content:"60% faster page loads after their optimization work — directly increased our conversion rate by 23%.", avatar:"SJ" },
  { name:"Ahmed Al-Hassan",role:"CEO, TechVentures MENA",    content:"Outstanding AI solutions. The chatbot they built handles 80% of queries automatically with remarkable accuracy.", avatar:"AA" },
];

export function Testimonials() {
  const [cur, setCur] = useState(0);
  useEffect(() => { const t = setInterval(() => setCur(p => (p+1)%T.length), 5000); return () => clearInterval(t); }, []);
  const t = T[cur];
  return (
    <section className="py-24 bg-[var(--bg2)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-3">Loved by <span className="grad-text">Clients</span></h2>
        </motion.div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={cur} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.4}}
              className="glass rounded-2xl p-8 sm:p-12 border border-[var(--border)] text-center">
              <div className="flex justify-center mb-6 gap-0.5">
                {Array.from({length:5}).map((_,i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <blockquote className="text-lg sm:text-xl text-[var(--text)] leading-relaxed mb-8 font-light italic">"{t.content}"</blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                <div className="text-left"><div className="font-semibold">{t.name}</div><div className="text-sm text-[var(--muted)]">{t.role}</div></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setCur(p => (p-1+T.length)%T.length)} className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all text-[var(--muted)]"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-1.5">{T.map((_,i) => <button key={i} onClick={() => setCur(i)} className={`h-1.5 rounded-full transition-all ${i===cur?"w-6 bg-sky-400":"w-1.5 bg-[var(--border)]"}`} />)}</div>
            <button onClick={() => setCur(p => (p+1)%T.length)} className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all text-[var(--muted)]"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
