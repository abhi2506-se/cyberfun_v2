"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const POSTS = [
  { id:"1", slug:"nextjs-15-app-router",    cat:"Engineering", title:"Mastering Next.js 15 App Router: Performance Patterns for 2025",         excerpt:"Deep dive into Server Components, Partial Prerendering, and Turbopack to build ultra-fast web apps.", date:"Jan 15, 2025", read:"12 min", grad:"from-blue-500/20 to-cyan-500/20" },
  { id:"2", slug:"llms-in-production",       cat:"AI/ML",       title:"Running LLMs in Production: Cost, Latency & Reliability at Scale",       excerpt:"Practical guide to deploying AI language models — caching, RAG architecture, and managing API costs.", date:"Jan 8, 2025",  read:"15 min", grad:"from-green-500/20 to-emerald-500/20" },
  { id:"3", slug:"design-system-guide",      cat:"Design",      title:"Building a World-Class Design System: From Figma to Production",          excerpt:"How we built and shipped a complete design system — tokens, components, documentation, and process.", date:"Dec 28, 2024", read:"10 min", grad:"from-purple-500/20 to-pink-500/20" },
  { id:"4", slug:"postgresql-optimization",  cat:"Backend",     title:"PostgreSQL Query Optimization: Indexing Strategies That Actually Work",   excerpt:"Real-world techniques to speed up slow queries — index design, partitioning, and connection pooling.", date:"Dec 20, 2024", read:"8 min",  grad:"from-orange-500/20 to-yellow-500/20" },
  { id:"5", slug:"react-native-vs-flutter",  cat:"Mobile",      title:"React Native vs Flutter in 2025: A Data-Driven Comparison",               excerpt:"We've shipped 30+ apps in both frameworks. Here's our performance-benchmarked, honest comparison.", date:"Dec 10, 2024", read:"11 min", grad:"from-sky-500/20 to-indigo-500/20" },
  { id:"6", slug:"startup-tech-stack-2025",  cat:"Strategy",    title:"The Ideal Tech Stack for Startups in 2025: Our Proven Blueprint",         excerpt:"After helping 50+ startups launch, we developed an opinionated stack balancing speed and scalability.", date:"Nov 30, 2024", read:"9 min",  grad:"from-rose-500/20 to-red-500/20" },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Blog</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-4">Engineering <span className="grad-text">Insights</span></h1>
            <p className="text-[var(--text2)] text-lg max-w-xl mx-auto">Deep technical articles and lessons from building production software.</p>
          </motion.div>

          <motion.div className="mb-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2}}>
            <Link href={`/blog/${featured.slug}`}>
              <div className={`rounded-3xl border border-[var(--border)] bg-gradient-to-br ${featured.grad} p-8 sm:p-12 hover:border-sky-500/40 transition-all group`}>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-sky-500/15 text-sky-400 mb-4">{featured.cat}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 group-hover:text-sky-400 transition-colors max-w-2xl">{featured.title}</h2>
                <p className="text-[var(--text2)] text-lg mb-6 max-w-2xl leading-relaxed">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.read} read</span>
                  <span className="flex items-center gap-2 ml-auto text-sky-400 font-medium">Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3+i*.07}}>
                <Link href={`/blog/${p.slug}`}>
                  <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden hover:border-sky-500/40 transition-all group">
                    <div className={`h-28 bg-gradient-to-br ${p.grad} relative`}>
                      <div className="absolute top-3 left-3"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/15 text-sky-400">{p.cat}</span></div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-[var(--muted)] text-sm leading-relaxed mb-3 line-clamp-2">{p.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.read} read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
