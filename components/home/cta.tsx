"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="relative rounded-3xl overflow-hidden p-12 sm:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-purple-600" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Let's transform your idea into a product users will love. Get a free consultation today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="h-13 px-8 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
                  Start a Project <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="h-13 px-8 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
