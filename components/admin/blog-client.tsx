"use client";
import React, { useState } from "react";
import { formatDate, slugify } from "@/lib/utils";
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { useRouter } from "next/navigation";

type Post = { id:string; title:string; slug:string; tags:string[]; published:boolean; createdAt:Date };

export function BlogClient({ data }: { data: Post[] }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [titleVal, setTitleVal] = useState("");
  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    const f = e.currentTarget;
    const body = {
      title:     (f.elements.namedItem("title")   as HTMLInputElement).value,
      slug:      slugify((f.elements.namedItem("title") as HTMLInputElement).value),
      excerpt:   (f.elements.namedItem("excerpt") as HTMLTextAreaElement).value,
      content:   (f.elements.namedItem("content") as HTMLTextAreaElement).value,
      tags:      (f.elements.namedItem("tags")    as HTMLInputElement).value.split(",").map((t:string)=>t.trim()).filter(Boolean),
      published: (f.elements.namedItem("pub")     as HTMLInputElement).checked,
    };
    await fetch("/api/admin/create-post", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    setSaving(false); setShowForm(false); setTitleVal(""); router.refresh();
  }

  async function del(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch("/api/admin/delete-post", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />{showForm?"Cancel":"New Post"}
        </Button>
      </div>
      {showForm && (
        <div className="rounded-2xl border border-sky-500/30 bg-[var(--bg2)] p-6">
          <h3 className="font-display text-xl font-semibold mb-5 text-[var(--text)]">New Blog Post</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Title *</Label><Input name="title" value={titleVal} onChange={e=>setTitleVal(e.target.value)} placeholder="Post title" required /></div>
              <div><Label>Tags (comma separated)</Label><Input name="tags" placeholder="Next.js, React, Performance" /></div>
            </div>
            <div><Label>Excerpt *</Label><Textarea name="excerpt" rows={2} placeholder="Brief summary..." required /></div>
            <div><Label>Content *</Label><Textarea name="content" rows={6} placeholder="Full content (Markdown supported)..." required /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pub" name="pub" className="rounded w-4 h-4" />
              <label htmlFor="pub" className="text-sm text-[var(--text2)]">Publish immediately</label>
            </div>
            <Button type="submit" variant="gradient" disabled={saving}>{saving?"Creating...":"Create Post"}</Button>
          </form>
        </div>
      )}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-[var(--border)]">{["Title","Tags","Status","Date","Actions"].map(h=><th key={h} className="text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.map(p => (
              <tr key={p.id} className="hover:bg-[var(--bg3)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[var(--text)] max-w-[200px] truncate">{p.title}</td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{p.tags.slice(0,2).map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg3)] text-[var(--muted)]">{t}</span>)}</div></td>
                <td className="px-4 py-3">{p.published?<span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle className="w-3.5 h-3.5"/>Published</span>:<span className="flex items-center gap-1 text-xs text-[var(--muted)]"><XCircle className="w-3.5 h-3.5"/>Draft</span>}</td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3"><button onClick={()=>del(p.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4"/></button></td>
              </tr>
            ))}
            {data.length===0 && <tr><td colSpan={5} className="text-center py-10 text-[var(--muted)]">No posts yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
