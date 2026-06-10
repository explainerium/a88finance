import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { BlogSection } from "@/components/sections/blog-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { BlogCategoryFilter } from "@/components/sections/blog/blog-filter";
import {
  getBlogCategories,
  getPublishedPostCards,
  type BlogCard,
} from "@/lib/blog";

// Rendered per-request (always current). We deliberately avoid DB access during
// `next build` — the Prisma 7 query compiler crashes Next's Turbopack build
// workers; runtime rendering is unaffected.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Clear, jargon-free finance articles from A88 Finance Group. Practical tips on car finance, business loans, refinancing, and rebuilding after credit issues.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  let posts: BlogCard[] = [];
  try {
    posts = await getPublishedPostCards();
  } catch {
    // DB not reachable yet — render the page shell with no cards.
    posts = [];
  }
  const categories = await getBlogCategories();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogHero />
      <BlogSection
        cta={undefined}
        posts={posts}
        filter={<BlogCategoryFilter categories={categories} />}
      />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}
