/**
 * Next.js instrumentation hook — runs once when the server starts.
 * We seed the initial admin here (Node runtime only; Prisma/bcrypt can't run
 * on the edge).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { seedAdmin } = await import("@/lib/seed-admin");
    await seedAdmin();
  }
}
