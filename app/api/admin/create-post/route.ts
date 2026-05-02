import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/admin-guard";
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return unauthorized();
  const { published, ...body } = await req.json();
  await prisma.blogPost.create({ data: { ...body, published: !!published, publishedAt: published ? new Date() : null } });
  return NextResponse.json({ success: true });
}
