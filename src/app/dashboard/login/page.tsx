import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { LoginForm } from "@/components/dashboard/login-form";

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
  if (user) redirect("/dashboard");

  const safeFrom = from?.startsWith("/dashboard") ? from : "/dashboard";

  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper-2 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.svg"
            alt="A88 Finance Group"
            width={120}
            height={97}
            className="h-14 w-auto"
            priority
          />
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
