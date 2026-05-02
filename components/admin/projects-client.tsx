"use client";
import React, { useState } from "react";
import { formatDate, slugify } from "@/lib/utils";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { useRouter } from "next/navigation";

type Project = { id:string; title:string; slug:string; category:string; techStack:string[]; liveUrl:string|null; featured:boolean; published:boolean; createdAt:Date };

export function ProjectsClient({ data }: { data: Project[] }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [titleVal, setTitleVal] = useState("");
  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    const f = e.currentTarget;
    const body = {
      title:       (f.elements.namedItem("title")    as HTMLInputElement).value,
      slug:        slugify((f.elements.namedItem("title") as HTMLInputElement).value),
      category:    (f.elements.namedItem("cat")      as HTMLInputElement).value,
      description: (f.elements.namedItem("desc")     as HTMLTextAreaElement).value,
      client:      (f.elements.namedItem("client")   as HTMLInputElement).value,
      liveUrl:     (f.elements.namedItem("live")     as HTMLInputElement).value,
      githubUrl:   (f.elements.namedItem("github")   as HTMLInputElement).value,
      techStack:   (f.elements.namedItem("tech")     as HTMLInputElement).value.split(",").map((t:string)=>t.trim()).filter(Boolean),
    };
    await fetch("/api/admin/create-project", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    setSaving(false); setShowForm(false); setTitleVal(""); router.refresh();
  }

  async function del(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/admin/delete-project", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />{showForm?"Cancel":"Add Project"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-sky-500/30 bg-[var(--bg2)] p-6">
          <h3 className="font-display text-xl font-semibold mb-5 text-[var(--text)]">New Project</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Project Title *</Label><Input name="title" placeholder="FinTech Dashboard" required value={titleVal} onChange={e=>setTitleVal(e.target.value)} /></div>
            <div><Label>Category *</Label><Input name="cat" placeholder="Web App" required /></div>
            <div><Label>Client</Label><Input name="client" placeholder="Company Name" /></div>
            <div><Label>Tech Stack (comma separated) *</Label><Input name="tech" placeholder="Next.js, TypeScript, PostgreSQL" required /></div>
            <div><Label>Live URL</Label><Input name="live" placeholder="https://..." /></div>
            <div><Label>GitHub URL</Label><Input name="github" placeholder="https://github.com/..." /></div>
            <div className="sm:col-span-2"><Label>Description *</Label><Textarea name="desc" rows={3} placeholder="Project description..." required /></div>
            <div className="sm:col-span-2"><Button type="submit" variant="gradient" disabled={saving}>{saving?"Adding...":"Add Project"}</Button></div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(p => (
          <div key={p.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-5 group hover:border-sky-500/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-sky-500/15 text-sky-400 mb-1.5">{p.category}</span>
                <h3 className="font-semibold text-[var(--text)]">{p.title}</h3>
              </div>
              <button onClick={() => del(p.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {p.techStack.slice(0,3).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg3)] text-[var(--muted)]">{t}</span>)}
              {p.techStack.length > 3 && <span className="text-xs text-[var(--muted)]">+{p.techStack.length-3}</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--muted)]">{formatDate(p.createdAt)}</span>
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="p-1 text-[var(--muted)] hover:text-sky-400 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
            </div>
          </div>
        ))}
        {data.length===0 && <div className="col-span-3 text-center py-16 text-[var(--muted)]">No projects yet. Add your first!</div>}
      </div>
    </div>
  );
}
