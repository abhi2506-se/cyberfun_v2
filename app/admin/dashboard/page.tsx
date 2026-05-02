import { prisma } from "@/lib/prisma";
import { MessageSquare, UserCheck, Briefcase, FolderOpen, Users, TrendingUp } from "lucide-react";
import { DashCharts } from "@/components/admin/dash-charts";

async function stats() {
  const [contacts, applications, jobs, projects, team] = await Promise.all([
    prisma.contact.count(),
    prisma.application.count(),
    prisma.job.count({ where: { isActive: true } }),
    prisma.project.count({ where: { published: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
  ]);
  const newContacts  = await prisma.contact.count({ where: { status: "NEW" } });
  const pendingApps  = await prisma.application.count({ where: { status: "PENDING" } });
  return { contacts, applications, jobs, projects, team, newContacts, pendingApps };
}

export default async function DashboardPage() {
  const s = await stats();

  const cards = [
    { label: "Total Contacts",  value: s.contacts,    badge: s.newContacts,  badgeLabel: "new",      icon: MessageSquare, color: "from-blue-500 to-cyan-500"   },
    { label: "Applications",    value: s.applications, badge: s.pendingApps,  badgeLabel: "pending",  icon: UserCheck,     color: "from-purple-500 to-pink-500" },
    { label: "Active Jobs",     value: s.jobs,         badge: 0,              badgeLabel: "",         icon: Briefcase,     color: "from-green-500 to-emerald-500"},
    { label: "Live Projects",   value: s.projects,     badge: 0,              badgeLabel: "",         icon: FolderOpen,    color: "from-orange-500 to-red-500"  },
    { label: "Team Members",    value: s.team,         badge: 0,              badgeLabel: "",         icon: Users,         color: "from-sky-500 to-indigo-500"  },
    { label: "Success Rate",    value: "98%",          badge: 0,              badgeLabel: "",         icon: TrendingUp,    color: "from-amber-500 to-yellow-500"},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Dashboard</h1>
        <p className="text-[var(--muted)] mt-1">Welcome back. Here's Cyberfun's current overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.label} className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6 overflow-hidden hover:border-sky-500/30 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${c.color} opacity-10 rounded-bl-3xl`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--muted)] mb-2">{c.label}</p>
                <p className="text-3xl font-display font-bold text-[var(--text)]">{c.value}</p>
                {c.badge > 0 && (
                  <span className="inline-flex text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full mt-2">
                    +{c.badge} {c.badgeLabel}
                  </span>
                )}
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashCharts />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
          <h3 className="font-semibold mb-4 text-[var(--text)]">Recent Activity</h3>
          <div className="space-y-3">
            {[
              ["New contact from TechCorp India",     "2 min ago",  "bg-green-400"],
              ["Job application: Senior Engineer",    "18 min ago", "bg-blue-400" ],
              ["Project published: FinTech Dashboard","1 hr ago",   "bg-purple-400"],
              ["New team member: Neha Gupta added",   "3 hrs ago",  "bg-orange-400"],
              ["Blog post draft created",             "5 hrs ago",  "bg-sky-400"  ],
            ].map(([text, time, dot], i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
                <span className="flex-1 text-[var(--text2)]">{text}</span>
                <span className="text-[var(--muted)] text-xs">{time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
          <h3 className="font-semibold mb-4 text-[var(--text)]">Quick Stats</h3>
          <div className="space-y-4">
            {[
              ["Contacts this week",      "12", "+40%", true ],
              ["Applications this month", "28", "+15%", true ],
              ["Avg. response time",      "4h",  "-30%", false],
              ["Project completion rate", "97%", "+2%",  true ],
            ].map(([label, val, change, up]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--text)]">{val}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
