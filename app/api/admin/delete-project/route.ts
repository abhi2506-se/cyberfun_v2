import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/admin-guard";
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return unauthorized();
  const { id } = await req.json();
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
