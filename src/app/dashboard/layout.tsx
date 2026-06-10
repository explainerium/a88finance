import type { Metadata } from "next";
import Link from "next/link";
import { FileText, LayoutDashboard, MessageSquare, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/dashboard/posts", icon: FileText },
  { label: "Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-paper-2">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <span className="grid size-8 place-items-center rounded-md bg-brand-gold font-display text-sm font-extrabold text-brand-ink">
            A88
          </span>
          <span className="font-display text-base font-semibold text-white">
            Dashboard
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link
            href="/"
            className="text-xs text-sidebar-foreground/70 transition-colors hover:text-sidebar-accent-foreground"
          >
            ← Back to website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
          <h1 className="font-display text-lg font-semibold text-brand-ink">
            A88 Finance Admin
          </h1>
          <span className="rounded-full bg-brand-paper-2 px-3 py-1 text-xs font-semibold text-brand-ink-3">
            Preview
          </span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
