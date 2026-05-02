import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "cyberfun-default-secret-key-change-in-prod!!"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow login page through — critical to prevent redirect loops
  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("cf_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      const { payload } = await jwtVerify(token, KEY);
      if ((payload as { role?: string }).role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    } catch {
      // Invalid/expired token
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
