import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";
import { prisma } from "./db";

const SESSION_COOKIE = "admin_session";
const SESSION_TOKEN = "authenticated";

export async function login(username: string, password: string): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({ where: { username } });
  console.log("[auth] login attempt:", username, "found:", !!user, "hash length:", user?.passwordHash?.length);
  if (!user) return false;
  const valid = await bcryptjs.compare(password, user.passwordHash);
  console.log("[auth] password valid:", valid);
  if (!valid) return false;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_TOKEN;
}
