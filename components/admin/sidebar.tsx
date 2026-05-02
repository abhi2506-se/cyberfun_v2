"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, MessageSquare, UserCheck, Briefcase, FolderOpen, FileText, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard",    icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/admin/contacts",     icon: MessageSquare,   label: "Contacts"     },
  { href: "/admin/applications", icon: UserCheck,       label: "Applications" },
  { href: "/admin/jobs",         icon: Briefcase,       label: "Jobs"         },
  { href: "/admin/projects",     icon: FolderOpen,      label: "Projects"     },
  { href: "/admin/blog",         icon: FileText,        label: "Blog"         },
  { href: "/admin/team",         icon: Users,           label: "Team"         },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--bg2)] transition-all duration-300 shrink-0",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className={cn("flex items-center h-16 border-b border-[var(--border)] px-4", collapsed ? "justify-center" : "gap-3")}>
        <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && <span className="font-display font-bold text-sm grad-text">Admin Panel</span>}
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  : "text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]",
                collapsed && "justify-center px-2"
              )}>
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-2 border-t border-[var(--border)]">
        <button onClick={() => setCollapsed(!collapsed)}
          className={cn("flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[var(--muted)] hover:bg-[var(--bg3)] transition-all", collapsed && "justify-center")}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
