"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe, Sparkles } from "lucide-react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .4,
      c: ["#0ea5e9","#a855f7","#06b6d4"][Math.floor(Math.random()*3)],
      o: Math.random() * .5 + .1,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.o; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = "#0ea5e9"; ctx.lineWidth = .5;
          ctx.globalAlpha = (1-d/120)*.08; ctx.stroke();
        }
      }));
      ctx.globalAlpha = 1; id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(id); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay:"1s"}} />

      {/* Floating icons */}
      {[{Icon:Code2,x:"10%",y:"25%",d:0},{Icon:Cpu,x:"84%",y:"18%",d:.5},{Icon:Globe,x:"82%",y:"68%",d:1},{Icon:Sparkles,x:"12%",y:"72%",d:1.5}].map(({Icon,x,y,d},i) => (
        <motion.div key={i} className="absolute hidden lg:flex items-center justify-center w-11 h-11 glass rounded-xl"
          style={{left:x,top:y}}
          initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1,y:[0,-10,0]}}
          transition={{opacity:{delay:d,duration:.5},scale:{delay:d,duration:.5},y:{delay:d,duration:3,repeat:Infinity,ease:"easeInOut"}}}>
          <Icon className="w-5 h-5 text-sky-400" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" /> Premium Software Solutions
          </span>
        </motion.div>

        <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight mb-6"
          initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>
          Building{" "}<span className="grad-text">Future-Ready</span><br />Digital Solutions
        </motion.h1>

        <motion.p className="text-lg sm:text-xl text-[var(--text2)] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.2}}>
          We craft exceptional web apps, mobile apps, AI solutions, and digital experiences that help businesses scale and succeed.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.3}}>
          <Link href="/contact">
            <button className="h-14 px-10 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-purple-500 text-white hover:opacity-90 shadow-xl shadow-sky-500/25 flex items-center gap-2 group">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/portfolio">
            <button className="h-14 px-10 text-base font-medium rounded-xl glass text-[var(--text)] hover:bg-white/10 flex items-center gap-2">
              View Our Work
            </button>
          </Link>
        </motion.div>

        <motion.div className="mt-14 flex flex-wrap items-center justify-center gap-6"
          initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.6}}>
          {["150+ Projects","98% Satisfaction","50+ Engineers","5 Years Experience"].map(t => (
            <div key={t} className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />{t}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{y:[0,8,0]}} transition={{duration:1.5,repeat:Infinity}}>
        <div className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-sky-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
