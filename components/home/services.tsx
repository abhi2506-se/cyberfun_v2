"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Brain, Cloud, ArrowRight } from "lucide-react";

const SERVICES = [
  { icon:Globe,      color:"from-blue-500 to-cyan-500",    title:"Web Development", slug:"web",   desc:"Blazing-fast Next.js & React applications with exceptional UX.", tags:["Next.js","TypeScript","Node.js"] },
  { icon:Smartphone, color:"from-purple-500 to-pink-500",  title:"App Development", slug:"app",   desc:"Native-quality iOS & Android apps with React Native & Flutter.", tags:["React Native","Flutter","Expo"] },
  { icon:Palette,    color:"from-orange-500 to-red-500",   title:"UI/UX Design",    slug:"uiux",  desc:"Human-centered design systems that convert and delight users.", tags:["Figma","Prototyping","Research"] },
  { icon:Brain,      color:"from-green-500 to-emerald-500",title:"AI Solutions",    slug:"ai",    desc:"LLM integrations, ML models, and intelligent automation pipelines.", tags:["GPT-4","PyTorch","LangChain"] },
  { icon:Cloud,      color:"from-sky-500 to-indigo-500",   title:"Cloud & DevOps",  slug:"cloud", desc:"Scalable cloud infrastructure, CI/CD, and Kubernetes orchestration.", tags:["AWS","Kubernetes","Terraform"] },
];

export function Services() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">What We Do</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-3 mb-4">End-to-End <span className="grad-text">Digital Services</span></h2>
          <p className="text-[var(--text2)] max-w-xl mx-auto">From concept to deployment — comprehensive technology solutions tailored to your needs.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={s.slug} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}>
              <Link href={`/services#${s.slug}`}>
                <div className="h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] group hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-sky-400 transition-colors">{s.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg3)] text-[var(--muted)]">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium transition-colors">
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
