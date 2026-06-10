import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogSection } from "@/components/sections/blog-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getTagWithPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

// On-demand ISR (no build-time DB enumeration — see blog/[slug]/page.tsx note).
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTagWithPosts(slug).catch(() => null);
  if (!data) return { title: "Tag not found", robots: { index: false } };

  return {
    title: `#${data.tag.name} articles`,
    description: `Finance articles tagged ${data.tag.name} from A88 Finance Group.`,
    alternates: { canonical: `/blog/tag/${slug}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const data = await getTagWithPosts(slug).catch(() => null);
  if (!data) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: `#${data.tag.name}`, path: `/blog/tag/${slug}` },
        ])}
      />
      <BlogSection
        kicker="Tag"
        title={`#${data.tag.name}`}
        intro={`Articles tagged ${data.tag.name}.`}
        posts={data.posts}
        cta={{ label: "All articles", href: "/blog" }}
      />
      <NewsletterSection />
    </>
  );
}
