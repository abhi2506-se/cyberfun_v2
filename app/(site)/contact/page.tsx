"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { COMPANY } from "@/lib/utils";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      phone:   (form.elements.namedItem("phone")   as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      const json = await res.json();
      if (res.ok) { setStatus("success"); setMsg(json.message); form.reset(); }
      else { setStatus("error"); setMsg(json.error || "Failed. Please try again."); }
    } catch { setStatus("error"); setMsg("Network error. Please try again."); }
    setTimeout(() => setStatus("idle"), 6000);
  }

  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Contact Us</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-4">Let's Build <span className="grad-text">Together</span></h1>
            <p className="text-[var(--text2)] text-lg max-w-xl mx-auto">Have a project in mind? We typically respond within 24 hours.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div className="space-y-4" initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:.2}}>
              {[
                { Icon:Mail,  label:"Email",  val:COMPANY.email,   href:`mailto:${COMPANY.email}` },
                { Icon:Phone, label:"Phone",  val:COMPANY.phone,   href:`tel:${COMPANY.phone}` },
                { Icon:MapPin,label:"Office", val:COMPANY.address, href:"#" },
              ].map(item => (
                <a key={item.label} href={item.href}
                  className="flex gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-sky-500/40 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <item.Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)] mb-0.5">{item.label}</div>
                    <div className="text-sm text-[var(--text)] font-medium">{item.val}</div>
                  </div>
                </a>
              ))}
              <div className="h-44 rounded-xl border border-[var(--border)] bg-[var(--bg2)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="relative text-center text-[var(--muted)]">
                  <MapPin className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                  <span className="text-sm">New Delhi, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:.3}}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h3 className="font-display text-2xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-[var(--muted)]">{msg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" placeholder="Arjun Kapoor" required /></div>
                      <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" placeholder="you@company.com" required /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" placeholder="+91 98765 43210" /></div>
                      <div><Label htmlFor="company">Company</Label><Input id="company" name="company" placeholder="Your Company Ltd." /></div>
                    </div>
                    <div><Label htmlFor="subject">Subject *</Label><Input id="subject" name="subject" placeholder="I need a web application..." required /></div>
                    <div><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" rows={5} placeholder="Tell us about your project, timeline, and budget..." required /></div>
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />{msg}
                      </div>
                    )}
                    <Button type="submit" variant="gradient" className="w-full h-11" disabled={status==="loading"}>
                      {status==="loading" ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span> : <span className="flex items-center gap-2"><Send className="w-4 h-4" />Send Message</span>}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
