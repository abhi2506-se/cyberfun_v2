"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Brain, Cloud, CheckCircle2, ArrowRight } from "lucide-react";

const SERVICES = [
  { id:"web",  Icon:Globe,      grad:"from-blue-500 to-cyan-500",   title:"Web Development", tagline:"Blazing Fast. Beautifully Crafted.",
    desc:"We build performant, scalable web applications. From landing pages to complex SaaS platforms.",
    features:["Next.js & React","TypeScript backend","API design","Performance optimization","SEO-first","PWA development"],
    tech:["Next.js","React","TypeScript","Node.js","PostgreSQL","Redis"] },
  { id:"app",  Icon:Smartphone, grad:"from-purple-500 to-pink-500", title:"App Development", tagline:"Native Experiences. Everywhere.",
    desc:"Cross-platform mobile apps that feel truly native on both iOS and Android.",
    features:["React Native & Flutter","iOS & Android native","App Store optimization","Offline-first","Push notifications","In-app payments"],
    tech:["React Native","Flutter","Swift","Kotlin","Firebase","Expo"] },
  { id:"uiux", Icon:Palette,    grad:"from-orange-500 to-red-500",  title:"UI/UX Design",    tagline:"Design That Converts.",
    desc:"Human-centered design that combines aesthetics with functionality.",
    features:["User research","Wireframing & prototyping","Design systems","Accessibility WCAG 2.1","Usability testing","Motion design"],
    tech:["Figma","Framer","Adobe XD","Principle","Lottie","Storybook"] },
  { id:"ai",   Icon:Brain,      grad:"from-green-500 to-emerald-500",title:"AI Solutions",   tagline:"Intelligence, Engineered.",
    desc:"Harness AI to automate workflows, generate insights, and build smarter products.",
    features:["LLM integration (GPT, Claude)","Custom ML models","Computer vision","NLP & chatbots","Predictive analytics","AI automation"],
    tech:["Python","TensorFlow","PyTorch","OpenAI","LangChain","Hugging Face"] },
  { id:"cloud",Icon:Cloud,      grad:"from-sky-500 to-indigo-500",  title:"Cloud & DevOps",  tagline:"Scale Without Limits.",
    desc:"Modern cloud infrastructure that scales reliably with your business.",
    features:["AWS, GCP, Azure","Kubernetes orchestration","CI/CD pipelines","Infrastructure as Code","Security & compliance","Cost optimization"],
    tech:["AWS","GCP","Docker","Kubernetes","Terraform","GitHub Actions"] },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Services</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-4">Complete <span className="grad-text">Digital Services</span></h1>
            <p className="text-lg text-[var(--text2)] max-w-xl mx-auto">End-to-end technology solutions from design to deployment.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {SERVICES.map((s, i) => (
          <motion.div key={s.id} id={s.id}
            className={`flex flex-col ${i%2===0?"lg:flex-row":"lg:flex-row-reverse"} gap-12 items-center`}
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
            <div className="w-full lg:w-1/2">
              <div className={`rounded-3xl p-0.5 bg-gradient-to-br ${s.grad}`}>
                <div className="rounded-[22px] bg-[var(--bg2)] p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-6`}><s.Icon className="w-8 h-8 text-white" /></div>
                  <div className="grid grid-cols-3 gap-2">
                    {s.tech.map(t => <div key={t} className="p-2 rounded-lg bg-[var(--bg3)] text-xs text-center text-[var(--muted)] border border-[var(--border)]">{t}</div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">{s.tagline}</span>
              <h2 className="text-4xl font-display font-bold mt-2 mb-4">{s.title}</h2>
              <p className="text-[var(--text2)] leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--text2)]">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <button className="h-11 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-purple-500 text-white font-medium flex items-center gap-2 group hover:opacity-90 transition-all">
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
