import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.safeParse(body);
    if (!data.success) return NextResponse.json({ error: "Please fill all required fields correctly." }, { status: 400 });
    await prisma.contact.create({ data: data.data });
    return NextResponse.json({ message: "Message sent! We'll get back to you within 24 hours." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
