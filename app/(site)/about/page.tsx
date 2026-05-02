"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";

const TEAM = [
  { name:"Arjun Kapoor",  role:"CEO & Co-Founder",      bio:"10+ years in software architecture. Ex-Flipkart.",   g:"from-blue-400 to-cyan-400",    i:"AK" },
  { name:"Divya Sharma",  role:"CTO & Co-Founder",      bio:"Ex-Google, AI/ML specialist. IIT Delhi alumna.",    g:"from-purple-400 to-pink-400",  i:"DS" },
  { name:"Vikram Singh",  role:"Head of Design",         bio:"Award-winning UI/UX designer. 8+ years.",          g:"from-orange-400 to-red-400",   i:"VS" },
  { name:"Ananya Patel",  role:"Head of Engineering",    bio:"Full-stack & DevOps expert. Ex-Swiggy Tech Lead.",  g:"from-green-400 to-teal-400",   i:"AP" },
  { name:"Rajan Mehta",   role:"Business Development",   bio:"12+ years enterprise software sales.",              g:"from-yellow-400 to-orange-400",i:"RM" },
  { name:"Neha Gupta",    role:"Lead AI Engineer",        bio:"PhD ML, IIT Delhi. NLP & computer vision expert.", g:"from-cyan-400 to-indigo-400",  i:"NG" },
];

const TIMELINE = [
  { year:"2020", title:"Founded",           desc:"Incorporated in New Delhi with 5 passionate engineers." },
  { year:"2021", title:"First 20 Clients",  desc:"Grew to 20+ clients across India in web and app solutions." },
  { year:"2022", title:"AI Division",       desc:"Launched AI/ML practice, first intelligent automation project." },
  { year:"2023", title:"International",     desc:"Expanded to UK, UAE, USA. Team grew to 35+ engineers." },
  { year:"2024", title:"150+ Projects",     desc:"Crossed 150 project deliveries, launched Cloud Services." },
  { year:"2025", title:"Global Expansion",  desc:"Opening offices in Dubai & London. Scaling to 100+ team." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-6">We Build <span className="grad-text">Digital Excellence</span></h1>
            <p className="text-lg text-[var(--text2)] leading-relaxed">Cyberfun Software Services is a premier technology company headquartered in New Delhi. Since 2020, we've been crafting exceptional digital experiences for startups, enterprises, and everything in between.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon:Target, color:"from-blue-500 to-cyan-500",   title:"Mission", text:"To empower businesses worldwide with cutting-edge technology that drives growth and competitive advantage." },
            { Icon:Eye,    color:"from-purple-500 to-pink-500", title:"Vision",  text:"To be the most trusted software partner for innovative companies building the future of every industry." },
            { Icon:Rocket, color:"from-orange-500 to-red-500",  title:"Approach",text:"Agile methodology, clean code principles, and obsessive attention to quality. We ship fast without compromising." },
          ].map((item, i) => (
            <motion.div key={item.title} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)]"
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}><item.Icon className="w-6 h-6 text-white" /></div>
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">The Team</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mt-3">Meet the <span className="grad-text">Builders</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] group hover:border-sky-500/40 transition-all text-center"
                initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.08}}>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.g} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform`}>{m.i}</div>
                <div className="font-display text-lg font-semibold">{m.name}</div>
                <div className="text-sky-400 text-sm mb-2">{m.role}</div>
                <div className="text-[var(--muted)] text-sm">{m.bio}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bg2)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Journey</span>
            <h2 className="text-4xl font-display font-bold mt-3">Company <span className="grad-text">Timeline</span></h2>
          </motion.div>
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-purple-500" />
            <div className="space-y-8">
              {TIMELINE.map((e, i) => (
                <motion.div key={e.year} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}>
                  <div className="absolute left-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold" style={{marginTop:"2px"}}>{e.year.slice(2)}</div>
                  <div className="text-xs text-sky-400 font-semibold mb-0.5">{e.year}</div>
                  <div className="font-semibold text-lg mb-1">{e.title}</div>
                  <div className="text-sm text-[var(--muted)] leading-relaxed">{e.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
