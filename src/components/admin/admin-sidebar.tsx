"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "ADMIN" | "AUTHOR";
type NavLink = { label: string; href: string; icon: LucideIcon; exact?: boolean };

function navItemsFor(role: Role): NavLink[] {
  const base: NavLink[] = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Posts", href: "/admin/posts", icon: FileText },
  ];
  if (role === "ADMIN") {
    base.push(
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Tags", href: "/admin/tags", icon: Tags },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    );
  }
  return base;
}

/**
 * Inner sidebar content (logo + nav). The light slim column / mobile drawer
 * positioning is handled by <AdminShell>.
 */
export function AdminSidebar({
  role,
  onNavigate,
}: {
  role: Role;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = navItemsFor(role);

  const isActive = (item: NavLink) =>
    item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-gold font-display text-sm font-extrabold text-brand-ink">
          A88
        </span>
        <div className="leading-tight">
          <span className="block font-display text-sm font-semibold text-brand-ink">
            Finance
          </span>
          <span className="block text-[11px] text-brand-ink-3">Admin panel</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-brand-gold/12 font-semibold text-brand-ink"
                  : "font-medium text-brand-ink-3 hover:bg-brand-paper-2 hover:text-brand-ink",
              )}
            >
              <Icon
                className={cn(
                  "size-[18px] shrink-0 transition-colors",
                  active
                    ? "text-brand-gold-deep"
                    : "text-brand-ink-3 group-hover:text-brand-ink",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-3">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="text-xs text-brand-ink-3 transition-colors hover:text-brand-gold-deep"
        >
          ↗ View website
        </Link>
      </div>
    </>
  );
}
