import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/admin-guard";
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return unauthorized();
  const body = await req.json();
  await prisma.job.create({ data: { ...body, isActive: true } });
  return NextResponse.json({ success: true });
}
