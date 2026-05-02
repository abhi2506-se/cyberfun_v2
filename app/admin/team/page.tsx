import { prisma } from "@/lib/prisma";
import { TeamClient } from "@/components/admin/team-client";
export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Team Members</h1>
        <p className="text-[var(--muted)] mt-1">Manage your team roster</p>
      </div>
      <TeamClient data={members} />
    </div>
  );
}
