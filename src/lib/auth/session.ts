import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type Role,
} from "@/lib/auth/jwt";

/** Issue a signed session cookie for a freshly authenticated user. */
export async function createSession(user: {
  id: string;
  email: string;
  role: Role;
}): Promise<void> {
  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clear the session cookie (logout). */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/**
 * Resolve the current user from the session cookie, re-checking the DB so that
 * a deleted/soft-deleted/role-changed user is reflected immediately. Cached
 * per-request so repeated calls in one render don't re-query.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifySession(token);
  if (!payload) return null;

  const user = await prisma.user.findFirst({
    where: { id: payload.sub, deletedAt: null },
  });
  return user;
});

/** Require any authenticated user, or redirect to the login page. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/dashboard/login");
  return user;
}

/** Require an ADMIN, or redirect (to login if anon, to dashboard if author). */
export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/dashboard/login");
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
