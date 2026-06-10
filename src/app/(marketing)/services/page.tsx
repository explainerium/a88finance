import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesCta } from "@/components/sections/services/services-cta";
import { ServicesSection } from "@/components/sections/services-section";
import { StorySection } from "@/components/sections/story-section";
import { ProcessSection } from "@/components/sections/process-section";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore A88 Finance Group's loan solutions: car, personal, business, specialty, low-doc and bad-credit finance. We compare 25+ lenders for fast, fair pre-approvals.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesHero />
      <ServicesSection cta={undefined} />
      <StorySection />
      <ProcessSection />
      <ServicesCta />
    </>
  );
}
