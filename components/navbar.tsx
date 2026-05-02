"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/",          label: "Home"      },
  { href: "/about",     label: "About"     },
  { href: "/services",  label: "Services"  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog",      label: "Blog"      },
  { href: "/careers",   label: "Careers"   },
  { href: "/contact",   label: "Contact"   },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-[var(--border)] shadow-xl" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg rotate-6 group-hover:rotate-12 transition-transform" />
              <div className="relative flex items-center justify-center w-full h-full">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="font-display font-bold text-lg grad-text hidden sm:block">Cyberfun</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-all",
                  pathname === l.href ? "text-sky-400" : "text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)]"
                )}>
                {l.label}
                {pathname === l.href && (
                  <motion.span layoutId="nav-pill"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg2)] transition-all">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <Link href="/contact" className="hidden lg:block">
              <button className="h-9 px-4 text-sm font-medium rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 text-white hover:opacity-90 transition-all shadow-lg shadow-sky-500/20">
                Hire Us
              </button>
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-[var(--text2)] hover:bg-[var(--bg2)]">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-[var(--border)] lg:hidden">
            <nav className="p-4 space-y-1 max-w-7xl mx-auto">
              {LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    pathname === l.href ? "bg-sky-500/10 text-sky-400" : "text-[var(--text2)] hover:bg-[var(--bg2)] hover:text-[var(--text)]"
                  )}>
                  {l.label}
                </Link>
              ))}
              <Link href="/contact">
                <button className="w-full mt-2 h-11 rounded-xl bg-gradient-to-r from-sky-500 to-purple-500 text-white font-medium text-sm">
                  Hire Us
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
