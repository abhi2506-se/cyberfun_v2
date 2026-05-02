import { prisma } from "@/lib/prisma";
import { JobsClient } from "@/components/admin/jobs-client";
export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Job Postings</h1>
        <p className="text-[var(--muted)] mt-1">Manage career opportunities</p>
      </div>
      <JobsClient data={jobs} />
    </div>
  );
}
