"use client";
import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Mail, Trash2, Eye, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Contact = { id:string; name:string; email:string; phone:string|null; company:string|null; subject:string; message:string; status:string; createdAt:Date };

const STATUS_COLOR: Record<string,string> = {
  NEW:"bg-sky-500/15 text-sky-400", READ:"bg-gray-500/15 text-gray-400",
  REPLIED:"bg-green-500/15 text-green-400", ARCHIVED:"bg-red-500/15 text-red-400",
};

export function ContactsClient({ data }: { data: Contact[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact|null>(null);
  const router = useRouter();
  const filtered = data.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/contact-status", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id,status}) });
    router.refresh();
  }
  async function del(id: string) {
    if (!confirm("Delete this contact?")) return;
    await fetch("/api/admin/delete-contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) });
    router.refresh();
  }

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--muted)]" />
          <input placeholder="Search contacts..." value={search} onChange={e=>setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Name","Email","Subject","Status","Date","Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[var(--bg3)] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[var(--text)]">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--muted)]">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text2)] max-w-[200px] truncate">{c.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOR[c.status]||""}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--muted)]">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(c)} title="View" className="p-1.5 rounded-lg text-[var(--muted)] hover:text-sky-400 hover:bg-sky-500/10 transition-all"><Eye className="w-4 h-4" /></button>
                      <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} title="Reply" className="p-1.5 rounded-lg text-[var(--muted)] hover:text-green-400 hover:bg-green-500/10 transition-all"><Mail className="w-4 h-4" /></a>
                      <button onClick={() => del(c.id)} title="Delete" className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={6} className="text-center py-10 text-[var(--muted)]">No contacts found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setSelected(null)} />
          <div className="relative w-full max-w-lg bg-[var(--bg2)] rounded-2xl border border-[var(--border)] p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold mb-4 text-[var(--text)]">{selected.subject}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div><span className="text-[var(--muted)]">From:</span> <span className="text-[var(--text)]">{selected.name}</span></div>
              <div><span className="text-[var(--muted)]">Email:</span> <span className="text-[var(--text)]">{selected.email}</span></div>
              {selected.phone   && <div><span className="text-[var(--muted)]">Phone:</span>   <span className="text-[var(--text)]">{selected.phone}</span></div>}
              {selected.company && <div><span className="text-[var(--muted)]">Company:</span> <span className="text-[var(--text)]">{selected.company}</span></div>}
            </div>
            <div className="bg-[var(--bg3)] rounded-xl p-4 text-sm text-[var(--text2)] leading-relaxed mb-5 max-h-48 overflow-y-auto">{selected.message}</div>
            <div className="flex gap-2">
              <select defaultValue={selected.status} onChange={e=>updateStatus(selected.id,e.target.value)}
                className="flex-1 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg3)] px-3 text-sm text-[var(--text)] focus:outline-none">
                {["NEW","READ","REPLIED","ARCHIVED"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <a href={`mailto:${selected.email}`} className="h-9 px-4 rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 text-white text-sm font-medium flex items-center gap-1">
                <Mail className="w-4 h-4" /> Reply
              </a>
              <button onClick={()=>setSelected(null)} className="h-9 px-4 rounded-lg border border-[var(--border)] text-sm text-[var(--text2)] hover:bg-[var(--bg3)]">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
