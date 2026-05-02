import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "@/components/admin/projects-client";
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Projects</h1>
        <p className="text-[var(--muted)] mt-1">Manage portfolio projects</p>
      </div>
      <ProjectsClient data={projects} />
    </div>
  );
}
