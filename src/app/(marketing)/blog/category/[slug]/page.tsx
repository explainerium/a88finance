import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogSection } from "@/components/sections/blog-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getCategoryWithPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

// On-demand ISR (no build-time DB enumeration — see blog/[slug]/page.tsx note).
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug).catch(() => null);
  if (!data) return { title: "Category not found", robots: { index: false } };

  const description =
    data.category.description ||
    `Finance articles in ${data.category.name} from A88 Finance Group.`;
  return {
    title: `${data.category.name} articles`,
    description,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug).catch(() => null);
  if (!data) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: data.category.name, path: `/blog/category/${slug}` },
        ])}
      />
      <BlogSection
        kicker="Category"
        title={data.category.name}
        intro={
          data.category.description ||
          `Articles about ${data.category.name.toLowerCase()}.`
        }
        posts={data.posts}
        cta={{ label: "All articles", href: "/blog" }}
      />
      <NewsletterSection />
    </>
  );
}
