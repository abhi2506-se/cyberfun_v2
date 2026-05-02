// SECURITY: Remove this file after first use in production!
// This endpoint resets the admin password to: Admin@Cyberfun2024!
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  // Simple one-time secret to prevent abuse
  if (secret !== "cyberfun-setup-2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const password  = "Admin@Cyberfun2024!";
    const hashed    = await bcrypt.hash(password, 10);
    
    const existing = await prisma.user.findUnique({ 
      where: { email: "admin@cyberfunsoftware.com" } 
    });

    if (existing) {
      await prisma.user.update({
        where: { email: "admin@cyberfunsoftware.com" },
        data:  { password: hashed, role: "ADMIN" },
      });
      return NextResponse.json({ 
        success: true, 
        message: "Admin password reset successfully. You can now login.",
        email: "admin@cyberfunsoftware.com",
        password: "Admin@Cyberfun2024!"
      });
    } else {
      await prisma.user.create({
        data: {
          id:       "admin_cyberfun_001",
          name:     "Super Admin",
          email:    "admin@cyberfunsoftware.com",
          password: hashed,
          role:     "ADMIN",
        },
      });
      return NextResponse.json({ 
        success: true, 
        message: "Admin user created successfully!",
        email: "admin@cyberfunsoftware.com",
        password: "Admin@Cyberfun2024!"
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
