import { prisma } from "@/lib/prisma";
import { AppsClient } from "@/components/admin/apps-client";
export default async function ApplicationsPage() {
  const apps = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: { select: { title: true } } },
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Applications</h1>
        <p className="text-[var(--muted)] mt-1">{apps.length} total applications</p>
      </div>
      <AppsClient data={apps} />
    </div>
  );
}
