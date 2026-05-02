import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "cyberfun-default-secret-key-change-in-prod!!"
);
const COOKIE = "cf_session";

export type Session = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

export async function createSession(data: Session) {
  const token = await new SignJWT(data as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(KEY);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<Session | null> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, KEY);
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
