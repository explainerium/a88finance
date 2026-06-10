import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper px-6 text-center">
      <div className="max-w-md space-y-5">
        <span className="kicker justify-center">Error 404</span>
        <h1 className="font-display text-4xl font-semibold text-brand-ink">
          We couldn&apos;t find that page
        </h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="btn btn-ink" href="/">
            Back to Home
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
