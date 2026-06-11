"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  FolderTree,
  LayoutDashboard,
  Newspaper,
  Settings,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "ADMIN" | "AUTHOR";
type NavLink = { label: string; href: string; icon: LucideIcon; exact?: boolean };
type NavGroup = { label: string; icon: LucideIcon; children: NavLink[] };
type NavEntry = NavLink | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

function navFor(role: Role): NavEntry[] {
  const blogChildren: NavLink[] = [
    { label: "Posts", href: "/dashboard/posts", icon: FileText },
  ];
  if (role === "ADMIN") {
    blogChildren.push(
      { label: "Categories", href: "/dashboard/categories", icon: FolderTree },
      { label: "Tags", href: "/dashboard/tags", icon: Tags },
    );
  }

  const entries: NavEntry[] = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: "Blog", icon: Newspaper, children: blogChildren },
  ];
  if (role === "ADMIN") {
    entries.push(
      { label: "Users", href: "/dashboard/users", icon: Users },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    );
  }
  return entries;
}

function isActiveLink(item: NavLink, pathname: string) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLinkItem({
  item,
  pathname,
  onNavigate,
  nested = false,
}: {
  item: NavLink;
  pathname: string;
  onNavigate?: () => void;
  nested?: boolean;
}) {
  const Icon = item.icon;
  const active = isActiveLink(item, pathname);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        nested && "pl-9",
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
}

function NavGroupItem({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = group.icon;
  const childActive = group.children.some((c) => isActiveLink(c, pathname));
  const [open, setOpen] = useState(childActive);

  // Auto-expand when navigating into one of the group's pages.
  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          childActive
            ? "text-brand-ink"
            : "text-brand-ink-3 hover:bg-brand-paper-2 hover:text-brand-ink",
        )}
      >
        <Icon className="size-[18px] shrink-0" />
        {group.label}
        <ChevronDown
          className={cn(
            "ml-auto size-4 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="mt-1 space-y-1">
          {group.children.map((c) => (
            <NavLinkItem
              key={c.href}
              item={c}
              pathname={pathname}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </div>
      )}
    </div>
  );
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
  const entries = navFor(role);

  return (
    <>
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          aria-label="A88 Finance dashboard"
        >
          <Image
            src="/logo.svg"
            alt="A88 Finance Group"
            width={72}
            height={58}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {entries.map((entry) =>
          isGroup(entry) ? (
            <NavGroupItem
              key={entry.label}
              group={entry}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ) : (
            <NavLinkItem
              key={entry.href}
              item={entry}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ),
        )}
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
