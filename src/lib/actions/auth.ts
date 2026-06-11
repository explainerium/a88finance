"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { type FormState, str } from "@/lib/actions/form-state";

/**
 * Sign in with email OR username + password. We always run a bcrypt compare
 * (against a real or dummy hash) so timing doesn't reveal whether an account
 * exists.
 */
export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const identifier = str(formData, "identifier").toLowerCase();
  const password = str(formData, "password");
  const from = str(formData, "from");

  if (!identifier || !password) {
    return { ok: false, error: "Enter your email/username and password." };
  }

  const user = await prisma.user.findFirst({
    where: {
      deletedAt: null,
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  const hash =
    user?.hashedPassword ??
    "$2a$12$0000000000000000000000000000000000000000000000000000a"; // dummy
  const valid = await verifyPassword(password, hash);

  if (!user || !valid) {
    return { ok: false, error: "Invalid credentials. Please try again." };
  }

  await createSession({ id: user.id, email: user.email, role: user.role });

  // Only allow internal redirect targets.
  const target = from.startsWith("/dashboard") ? from : "/dashboard";
  redirect(target);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/dashboard/login");
}
