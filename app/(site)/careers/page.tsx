"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronDown, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";

const JOBS = [
  { id:"1", title:"Senior Full-Stack Engineer", dept:"Engineering", loc:"New Delhi / Remote", type:"Full Time",  exp:"4-6 years",  sal:"₹18-28 LPA",    tags:["Next.js","TypeScript","PostgreSQL"] },
  { id:"2", title:"UI/UX Designer",             dept:"Design",      loc:"New Delhi / Hybrid", type:"Full Time",  exp:"3-5 years",  sal:"₹12-20 LPA",    tags:["Figma","Design Systems","Framer"] },
  { id:"3", title:"ML/AI Engineer",             dept:"AI Division", loc:"Remote",             type:"Full Time",  exp:"3-5 years",  sal:"₹20-35 LPA",    tags:["Python","TensorFlow","LLMs"] },
  { id:"4", title:"DevOps Engineer",            dept:"Engineering", loc:"New Delhi / Remote", type:"Full Time",  exp:"2-4 years",  sal:"₹15-25 LPA",    tags:["AWS","Kubernetes","Terraform"] },
  { id:"5", title:"React Native Developer",     dept:"Mobile",      loc:"Remote",             type:"Remote",     exp:"2-4 years",  sal:"₹12-22 LPA",    tags:["React Native","iOS","Android"] },
  { id:"6", title:"Business Dev Manager",       dept:"Sales",       loc:"New Delhi",          type:"Full Time",  exp:"4-7 years",  sal:"₹15-25 LPA + Comm", tags:["B2B Sales","SaaS","Enterprise"] },
];

type Job = typeof JOBS[0];

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading"); setError("");
    const form = e.currentTarget;
    const data = {
      jobId: job.id,
      name:  (form.elements.namedItem("name")  as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      resumeUrl:   (form.elements.namedItem("resumeUrl") as HTMLInputElement).value,
      coverLetter: (form.elements.namedItem("cover")    as HTMLTextAreaElement).value,
      portfolio:   (form.elements.namedItem("portfolio") as HTMLInputElement).value,
    };
    try {
      const res = await fetch("/api/apply", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      const json = await res.json();
      if (res.ok) setStatus("success");
      else { setError(json.error || "Failed. Try again."); setStatus("idle"); }
    } catch { setError("Network error."); setStatus("idle"); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
        className="relative w-full max-w-lg bg-[var(--bg2)] rounded-2xl border border-[var(--border)] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--bg2)] border-b border-[var(--border)] p-5 flex items-center justify-between">
          <div><h2 className="font-display text-xl font-semibold">Apply Now</h2><p className="text-sm text-sky-400">{job.title}</p></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg3)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-[var(--muted)]">We'll review your application and get back within 5-7 business days.</p>
              <Button className="mt-6" onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Full Name *</Label><Input name="name" placeholder="Your full name" required /></div>
              <div><Label>Email *</Label><Input name="email" type="email" placeholder="you@email.com" required /></div>
              <div><Label>Phone</Label><Input name="phone" placeholder="+91 98765 43210" /></div>
              <div>
                <Label>Resume Link *</Label>
                <Input name="resumeUrl" placeholder="https://drive.google.com/your-resume" required />
                <p className="text-xs text-[var(--muted)] mt-1">Paste a Google Drive / Dropbox link to your resume PDF</p>
              </div>
              <div><Label>Portfolio / LinkedIn</Label><Input name="portfolio" placeholder="https://linkedin.com/in/you" /></div>
              <div><Label>Cover Letter</Label><Textarea name="cover" rows={4} placeholder="Why are you a great fit?" /></div>
              {error && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
              <Button type="submit" variant="gradient" className="w-full h-11" disabled={status==="loading"}>
                {status==="loading" ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const [applyJob, setApplyJob] = useState<Job|null>(null);

  return (
    <div>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Careers</span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mt-3 mb-4">Join Our <span className="grad-text">Dream Team</span></h1>
            <p className="text-lg text-[var(--text2)] leading-relaxed">Join a team of exceptional engineers, designers, and builders passionate about creating products that matter.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
            {[["Remote Friendly","Work anywhere"],["Health Insurance","Full family"],["₹50K/yr Learning","Courses & certs"],["ESOPs","Equity participation"],["Flexible Hours","Async culture"],["Annual Retreats","Team off-sites"]].map(([l,d]) => (
              <div key={l} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg2)] text-center">
                <div className="font-semibold text-sm mb-1">{l}</div>
                <div className="text-xs text-[var(--muted)]">{d}</div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold mb-6">Open Positions <span className="text-[var(--muted)] text-lg font-normal">({JOBS.length} openings)</span></h2>
          <div className="space-y-3">
            {JOBS.map((job, i) => (
              <motion.div key={job.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.06}}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden hover:border-sky-500/40 transition-all">
                <button className="w-full p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3" onClick={() => setExpanded(expanded===job.id ? null : job.id)}>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/15 text-sky-400">{job.dept}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--bg3)] text-[var(--muted)]">{job.type}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-1.5 text-sm text-[var(--muted)]">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.loc}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.exp}</span>
                      <span className="font-medium text-[var(--text2)]">{job.sal}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-wrap gap-1.5">{job.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg3)] text-[var(--muted)]">{t}</span>)}</div>
                    <ChevronDown className={`w-5 h-5 text-[var(--muted)] shrink-0 transition-transform ${expanded===job.id?"rotate-180":""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {expanded === job.id && (
                    <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--border)]">
                        <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">Join our team and work on cutting-edge projects impacting thousands of users globally. Competitive compensation, equity, and an incredible growth environment.</p>
                        <Button variant="gradient" onClick={() => setApplyJob(job)}>Apply Now</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
