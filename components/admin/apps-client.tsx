"use client";
import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type App = { id:string; name:string; email:string; phone:string|null; resumeUrl:string; status:string; createdAt:Date; job:{title:string} };

const STATUS_COLOR: Record<string,string> = {
  PENDING:"bg-yellow-500/15 text-yellow-400", REVIEWING:"bg-sky-500/15 text-sky-400",
  INTERVIEW:"bg-purple-500/15 text-purple-400", OFFER:"bg-green-500/15 text-green-400",
  REJECTED:"bg-red-500/15 text-red-400", WITHDRAWN:"bg-gray-500/15 text-gray-400",
};
const STATUSES = ["PENDING","REVIEWING","INTERVIEW","OFFER","REJECTED","WITHDRAWN"];

export function AppsClient({ data }: { data: App[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filtered = data.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.job.title.toLowerCase().includes(search.toLowerCase())
  );

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/app-status", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id,status}) });
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
        <Search className="w-4 h-4 text-[var(--muted)]" />
        <input placeholder="Search applications..." value={search} onChange={e=>setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Applicant","Position","Email","Status","Resume","Applied","Update"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-[var(--bg3)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[var(--text)]">{a.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--muted)] max-w-[150px] truncate">{a.job.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">{a.email}</td>
                <td className="px-4 py-3"><span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOR[a.status]||""}`}>{a.status}</span></td>
                <td className="px-4 py-3">
                  <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-sky-400 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" />View
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">{formatDate(a.createdAt)}</td>
                <td className="px-4 py-3">
                  <select defaultValue={a.status} onChange={e=>updateStatus(a.id,e.target.value)}
                    className="h-8 rounded-lg border border-[var(--border)] bg-[var(--bg3)] px-2 text-xs text-[var(--text)] focus:outline-none">
                    {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={7} className="text-center py-10 text-[var(--muted)]">No applications found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
