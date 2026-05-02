import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "cyberfun-default-secret-key-change-in-prod!!"
);

export async function isAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("cf_session")?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, KEY);
    return (payload as { role?: string }).role === "ADMIN";
  } catch { return false; }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
