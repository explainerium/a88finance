"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar, type AdminUser } from "@/components/admin/admin-topbar";
import { cn } from "@/lib/utils";

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-paper-2">
      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-ink/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-white md:flex">
          <AdminSidebar role={user.role} />
        </aside>

        {/* Mobile drawer */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-white transition-transform duration-200 md:hidden",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <AdminSidebar role={user.role} onNavigate={() => setDrawerOpen(false)} />
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AdminTopbar user={user} onMenu={() => setDrawerOpen(true)} />
          <main className="w-full flex-1 p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
