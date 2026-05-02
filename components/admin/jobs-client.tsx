"use client";
import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { useRouter } from "next/navigation";

type Job = { id:string; title:string; department:string; location:string; type:string; experience:string; salary:string|null; isActive:boolean; createdAt:Date; _count:{applications:number} };

export function JobsClient({ data }: { data: Job[] }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    const f = e.currentTarget;
    const body = {
      title:       (f.elements.namedItem("title")       as HTMLInputElement).value,
      department:  (f.elements.namedItem("dept")        as HTMLInputElement).value,
      location:    (f.elements.namedItem("location")    as HTMLInputElement).value,
      type:        (f.elements.namedItem("type")        as HTMLSelectElement).value,
      experience:  (f.elements.namedItem("exp")         as HTMLInputElement).value,
      salary:      (f.elements.namedItem("salary")      as HTMLInputElement).value,
      description: (f.elements.namedItem("desc")        as HTMLTextAreaElement).value,
      requirements:(f.elements.namedItem("req")         as HTMLTextAreaElement).value,
    };
    await fetch("/api/admin/create-job", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    setSaving(false); setShowForm(false); router.refresh();
  }

  async function del(id: string) {
    if (!confirm("Delete this job posting?")) return;
    await fetch("/api/admin/delete-job", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />{showForm ? "Cancel" : "New Job Posting"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-sky-500/30 bg-[var(--bg2)] p-6">
          <h3 className="font-display text-xl font-semibold mb-5 text-[var(--text)]">New Job Posting</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Job Title *</Label><Input name="title" placeholder="Senior Frontend Engineer" required /></div>
            <div><Label>Department *</Label><Input name="dept" placeholder="Engineering" required /></div>
            <div><Label>Location *</Label><Input name="location" placeholder="New Delhi / Remote" required /></div>
            <div>
              <Label>Type *</Label>
              <select name="type" required className="flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="FULL_TIME">Full Time</option><option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option><option value="INTERNSHIP">Internship</option><option value="REMOTE">Remote</option>
              </select>
            </div>
            <div><Label>Experience *</Label><Input name="exp" placeholder="3-5 years" required /></div>
            <div><Label>Salary Range</Label><Input name="salary" placeholder="₹15-25 LPA" /></div>
            <div className="sm:col-span-2"><Label>Description *</Label><Textarea name="desc" rows={3} placeholder="Job description..." required /></div>
            <div className="sm:col-span-2"><Label>Requirements *</Label><Textarea name="req" rows={3} placeholder="Key requirements..." required /></div>
            <div className="sm:col-span-2"><Button type="submit" variant="gradient" disabled={saving}>{saving?"Creating...":"Create Posting"}</Button></div>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Title","Dept","Type","Active","Applications","Posted","Actions"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.map(j => (
              <tr key={j.id} className="hover:bg-[var(--bg3)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[var(--text)]">{j.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">{j.department}</td>
                <td className="px-4 py-3"><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--bg3)] text-[var(--muted)]">{j.type.replace("_"," ")}</span></td>
                <td className="px-4 py-3">{j.isActive ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}</td>
                <td className="px-4 py-3 text-sm text-[var(--text)]">{j._count.applications}</td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">{formatDate(j.createdAt)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => del(j.id)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {data.length===0 && <tr><td colSpan={7} className="text-center py-10 text-[var(--muted)]">No job postings yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
