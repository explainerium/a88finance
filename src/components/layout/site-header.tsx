"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Car,
  ChevronDown,
  User,
  type LucideIcon,
} from "lucide-react";
import { navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const submenuIcons: Record<string, LucideIcon> = {
  user: User,
  building: Building2,
  car: Car,
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={cn("nav", scrolled && "scrolled")}>
      <div className="wrap">
        <Link className="brand" href="/" aria-label="A88 Finance Group home">
          <Image
            src="/logo.svg"
            alt="A88 Finance Group"
            width={72}
            height={58}
            priority
          />
        </Link>

        <ul className={cn("menu", menuOpen && "open")} id="menu">
          {navItems.map((item) => (
            <li key={item.href} className={cn(isCurrent(item.href) && "current")}>
              <Link href={item.href}>
                {item.label}
                {item.children && (
                  <ChevronDown className="caret" aria-hidden />
                )}
              </Link>

              {item.children && (
                <ul className="submenu">
                  {item.children.map((child) => {
                    const Icon = submenuIcons[child.icon] ?? User;
                    return (
                      <li key={child.href}>
                        <Link href={child.href}>
                          <span className="mi">
                            <Icon aria-hidden />
                          </span>
                          <span className="mt">
                            {child.label}
                            <small>{child.description}</small>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="sub-all">
                    <Link href={item.href}>
                      View all services
                      <ArrowRight aria-hidden />
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
          <li className="m-apply">
            <Link
              className="btn btn-gold"
              href="/apply"
              style={{ width: "100%" }}
            >
              Apply Now
            </Link>
          </li>
        </ul>

        <div className="nav-cta">
          <Link className="btn btn-gold" href="/apply">
            Apply Now
          </Link>
          <button
            className={cn("burger", menuOpen && "open")}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
