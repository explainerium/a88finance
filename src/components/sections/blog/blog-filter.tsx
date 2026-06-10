import Link from "next/link";
import { cn } from "@/lib/utils";

const chip =
  "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors";
const active = "border-brand-gold bg-brand-gold text-brand-ink";
const idle =
  "border-[color:var(--line)] text-brand-ink-3 hover:border-brand-gold hover:text-brand-gold-deep";

/**
 * Category filter chips for the blog. Each chip links to the (already SEO-
 * indexable) /blog/category/[slug] page; "All" links back to /blog.
 */
export function BlogCategoryFilter({
  categories,
  activeSlug,
}: {
  categories: { name: string; slug: string }[];
  activeSlug?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="Filter posts by category"
      className="mt-8 flex flex-wrap gap-2"
    >
      <Link href="/blog" className={cn(chip, activeSlug ? idle : active)}>
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/blog/category/${c.slug}`}
          className={cn(chip, activeSlug === c.slug ? active : idle)}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
