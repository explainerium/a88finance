"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export type AdminUser = {
  name: string | null;
  email: string;
  role: "ADMIN" | "AUTHOR";
  image: string | null;
};

function initialsFor(user: AdminUser): string {
  const source = user.name?.trim() || user.email;
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (letters || source.slice(0, 2)).toUpperCase();
}

export function AdminTopbar({
  user,
  onMenu,
}: {
  user: AdminUser;
  onMenu: () => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    const query = typeof q === "string" ? q.trim() : "";
    router.push(query ? `/admin/posts?q=${encodeURIComponent(query)}` : "/admin/posts");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="grid size-9 place-items-center rounded-lg text-brand-ink-3 hover:bg-brand-paper-2 md:hidden"
      >
        <Menu className="size-5" />
      </button>

      <form onSubmit={onSearch} className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-ink-3" />
        <input
          name="q"
          type="search"
          placeholder="Search posts…"
          className="w-full rounded-lg border border-border bg-brand-paper-2 py-2 pl-9 pr-3 text-sm text-brand-ink outline-none transition-colors placeholder:text-brand-ink-3/70 focus:border-brand-gold focus:bg-white"
        />
      </form>

      <div className="relative ml-auto" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-brand-paper-2"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <span className="grid size-8 place-items-center rounded-full bg-brand-ink text-xs font-bold text-white">
              {initialsFor(user)}
            </span>
          )}
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold text-brand-ink">
              {user.name || user.email.split("@")[0]}
            </span>
            <span className="block text-xs text-brand-ink-3">
              {user.role === "ADMIN" ? "Administrator" : "Author"}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-brand-ink-3 transition-transform",
              menuOpen && "rotate-180",
            )}
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white shadow-[0_12px_40px_-12px_rgba(11,42,74,0.28)]"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="truncate text-sm font-semibold text-brand-ink">
                {user.name || "Account"}
              </p>
              <p className="truncate text-xs text-brand-ink-3">{user.email}</p>
            </div>
            <Link
              href="/"
              target="_blank"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-ink transition-colors hover:bg-brand-paper-2"
            >
              <ExternalLink className="size-4 text-brand-ink-3" />
              View website
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
