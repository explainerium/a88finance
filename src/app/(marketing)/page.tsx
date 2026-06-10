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

export const metadata: Metadata = {
  description:
    "A88 Finance Group helps everyday Australians with personal, business, and car loans. Compare 25+ lenders with fast pre-approvals and honest, no-judgment guidance.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroHome />
      <StatStrip />
      <ServicesSection />
      <StorySection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
