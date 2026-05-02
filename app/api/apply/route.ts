import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  jobId:       z.string().min(1),
  name:        z.string().min(2),
  email:       z.string().email(),
  phone:       z.string().optional(),
  resumeUrl:   z.string().min(5),
  coverLetter: z.string().optional(),
  portfolio:   z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.safeParse(body);
    if (!data.success) return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    
    // Find first active job if jobId doesn't match (fallback for static job IDs)
    let jobId = data.data.jobId;
    const job = await prisma.job.findFirst({ where: { isActive: true } });
    if (job) jobId = job.id;
    
    await prisma.application.create({ data: { ...data.data, jobId } });
    return NextResponse.json({ message: "Application submitted successfully!" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
