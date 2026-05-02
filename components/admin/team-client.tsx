"use client";
import React, { useState } from "react";
import { Plus, Trash2, Linkedin, Github, Twitter } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { useRouter } from "next/navigation";

type Member = { id:string; name:string; role:string; bio:string|null; linkedin:string|null; github:string|null; twitter:string|null; isActive:boolean };

export function TeamClient({ data }: { data: Member[] }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    const f = e.currentTarget;
    const body = {
      name:     (f.elements.namedItem("name")     as HTMLInputElement).value,
      role:     (f.elements.namedItem("role")     as HTMLInputElement).value,
      bio:      (f.elements.namedItem("bio")      as HTMLTextAreaElement).value,
      linkedin: (f.elements.namedItem("linkedin") as HTMLInputElement).value,
      github:   (f.elements.namedItem("github")   as HTMLInputElement).value,
      twitter:  (f.elements.namedItem("twitter")  as HTMLInputElement).value,
    };
    await fetch("/api/admin/create-member", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    setSaving(false); setShowForm(false); router.refresh();
  }

  async function del(id: string) {
    if (!confirm("Remove this team member?")) return;
    await fetch("/api/admin/delete-member", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />{showForm?"Cancel":"Add Member"}
        </Button>
      </div>
      {showForm && (
        <div className="rounded-2xl border border-sky-500/30 bg-[var(--bg2)] p-6">
          <h3 className="font-display text-xl font-semibold mb-5 text-[var(--text)]">New Team Member</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Full Name *</Label><Input name="name" placeholder="Arjun Kapoor" required /></div>
            <div><Label>Role / Title *</Label><Input name="role" placeholder="Senior Engineer" required /></div>
            <div><Label>LinkedIn</Label><Input name="linkedin" placeholder="https://linkedin.com/in/..." /></div>
            <div><Label>GitHub</Label><Input name="github" placeholder="https://github.com/..." /></div>
            <div><Label>Twitter</Label><Input name="twitter" placeholder="https://twitter.com/..." /></div>
            <div className="sm:col-span-2"><Label>Bio</Label><Textarea name="bio" rows={2} placeholder="Brief biography..." /></div>
            <div className="sm:col-span-2"><Button type="submit" variant="gradient" disabled={saving}>{saving?"Adding...":"Add Member"}</Button></div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(m => (
          <div key={m.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-5 group hover:border-sky-500/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {m.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div><div className="font-semibold text-[var(--text)]">{m.name}</div><div className="text-sm text-sky-400">{m.role}</div></div>
              </div>
              <button onClick={() => del(m.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
            {m.bio && <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">{m.bio}</p>}
            <div className="flex gap-1">
              {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" className="p-1.5 text-[var(--muted)] hover:text-sky-400 transition-colors"><Linkedin className="w-4 h-4"/></a>}
              {m.github   && <a href={m.github}   target="_blank" rel="noreferrer" className="p-1.5 text-[var(--muted)] hover:text-sky-400 transition-colors"><Github   className="w-4 h-4"/></a>}
              {m.twitter  && <a href={m.twitter}  target="_blank" rel="noreferrer" className="p-1.5 text-[var(--muted)] hover:text-sky-400 transition-colors"><Twitter  className="w-4 h-4"/></a>}
            </div>
          </div>
        ))}
        {data.length===0 && <div className="col-span-3 text-center py-16 text-[var(--muted)]">No team members yet</div>}
      </div>
    </div>
  );
}
