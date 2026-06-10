import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";

let seeded = false;

/**
 * Ensure a single ADMIN account exists, sourced from ADMIN_EMAIL /
 * ADMIN_PASSWORD. Idempotent: creates the admin if missing, otherwise just
 * guarantees the account is an active ADMIN. Runs on server start via
 * instrumentation.ts — never through the UI.
 *
 * The password is set only on initial creation, so an admin who later changes
 * their password in the dashboard is not reset to the env value on each deploy.
 */
export async function seedAdmin(): Promise<void> {
  if (seeded) return;
  seeded = true;

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "[seed-admin] ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin seed.",
    );
    return;
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      if (existing.role !== "ADMIN" || existing.deletedAt) {
        await prisma.user.update({
          where: { email },
          data: { role: "ADMIN", deletedAt: null },
        });
      }
      return;
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
        role: "ADMIN",
        name: "Admin",
      },
    });
    console.log(`[seed-admin] Created initial admin: ${email}`);
  } catch (error) {
    // Don't crash boot if the DB isn't reachable yet (e.g. DATABASE_URL unset).
    console.error("[seed-admin] Failed to seed admin:", error);
  }
}
