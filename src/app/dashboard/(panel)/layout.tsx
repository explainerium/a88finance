import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { AdminShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative server-side gate (middleware is the first line of defense).
  const user = await requireUser();

  return (
    <AdminShell
      user={{
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      }}
    >
      {children}
    </AdminShell>
  );
}
