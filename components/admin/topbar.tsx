"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, User } from "lucide-react";
import { Session } from "@/lib/session";

export function AdminTopbar({ user }: { user: Session }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--bg2)] flex items-center justify-between px-6 shrink-0">
      <Link href="/" target="_blank"
        className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-sky-400 transition-colors">
        <ExternalLink className="w-4 h-4" /> View Site
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-[var(--text)]">{user.name ?? "Admin"}</div>
            <div className="text-xs text-[var(--muted)]">{user.email}</div>
          </div>
        </div>
        <button onClick={logout} title="Sign out"
          className="p-2 rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
