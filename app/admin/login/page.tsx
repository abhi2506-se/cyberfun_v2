"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError("");
    const form = e.currentTarget;
    const email    = (form.elements.namedItem("email")    as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(json.error || "Login failed.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div className="relative w-full max-w-md px-4"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-purple-500 mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-[var(--text)]">Admin Portal</h1>
          <p className="text-[var(--muted)] mt-2 text-sm">Cyberfun Software — Restricted Access</p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-8 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[var(--text2)] block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input name="email" type="email" autoComplete="email"
                  defaultValue="admin@cyberfunsoftware.com"
                  className="flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg3)] pl-10 pr-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text2)] block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input name="password" type={showPw ? "text" : "password"} autoComplete="current-password"
                  className="flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg3)] pl-10 pr-10 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="••••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-sky-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--muted)]">Default: admin@cyberfunsoftware.com / Admin@Cyberfun2024!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
