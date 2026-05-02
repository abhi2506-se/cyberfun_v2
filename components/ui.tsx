"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", size = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default"|"gradient"|"outline"|"ghost"|"glass";
  size?: "default"|"sm"|"lg"|"xl"|"icon";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default"  && "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20",
        variant === "gradient" && "bg-gradient-to-r from-sky-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-sky-500/20",
        variant === "outline"  && "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg2)]",
        variant === "ghost"    && "text-[var(--text2)] hover:bg-[var(--bg2)] hover:text-[var(--text)]",
        variant === "glass"    && "glass text-[var(--text)] hover:bg-white/10",
        size === "sm"      && "h-8 px-3 text-sm",
        size === "default" && "h-10 px-4 text-sm",
        size === "lg"      && "h-11 px-6 text-base",
        size === "xl"      && "h-13 px-8 text-base",
        size === "icon"    && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none transition-all",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-[var(--text2)] block mb-1.5", className)} {...props} />;
}

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default"|"success"|"warning"|"danger"|"purple"|"secondary";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default"   && "bg-sky-500/15 text-sky-400",
        variant === "success"   && "bg-green-500/15 text-green-400",
        variant === "warning"   && "bg-yellow-500/15 text-yellow-400",
        variant === "danger"    && "bg-red-500/15 text-red-400",
        variant === "purple"    && "bg-purple-500/15 text-purple-400",
        variant === "secondary" && "bg-[var(--bg3)] text-[var(--muted)]",
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-[var(--border)] bg-[var(--bg2)]", className)} {...props} />;
}
