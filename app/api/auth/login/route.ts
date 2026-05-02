import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user || !user.password) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Access denied." }, { status: 403 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
