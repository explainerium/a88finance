import type { Metadata } from "next";
import { HeroHome } from "@/components/sections/hero-home";
import { StatStrip } from "@/components/sections/stat-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { StorySection } from "@/components/sections/story-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { JsonLd } from "@/components/shared/json-ld";
import { localBusinessSchema } from "@/lib/structured-data";
import { getPublishedPostCards } from "@/lib/blog";

// Rendered per-request so the "Your Finance Guide" teaser shows live posts.
// (DB access stays out of `next build` — the Prisma 7 query compiler crashes
// Next's Turbopack build workers; runtime is unaffected.)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "A88 Finance Group helps everyday Australians with personal, business, and car loans. Compare 25+ lenders with fast pre-approvals and honest, no-judgment guidance.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  // Latest published posts; fall back to the built-in demo posts when empty.
  const latest = await getPublishedPostCards(3);
  const blogPosts = latest.length > 0 ? latest : undefined;

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroHome />
      <StatStrip />
      <ServicesSection />
      <StorySection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection posts={blogPosts} />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
