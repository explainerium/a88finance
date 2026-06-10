import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  // Already signed in → straight to the dashboard.
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  const safeFrom = from?.startsWith("/admin") ? from : "/admin";

  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper-2 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="grid size-9 place-items-center rounded-md bg-brand-gold font-display text-sm font-extrabold text-brand-ink">
            A88
          </span>
          <span className="font-display text-lg font-semibold text-brand-ink">
            Finance Admin
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h1 className="mb-1 font-display text-xl font-semibold text-brand-ink">
            Welcome back
          </h1>
          <p className="mb-5 text-sm text-brand-ink-3">
            Sign in to manage posts, users, and settings.
          </p>
          <LoginForm from={safeFrom} />
        </div>
      </div>
    </main>
  );
}
