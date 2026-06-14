import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { StatStrip } from "@/components/sections/stat-strip";
import { AboutBanner } from "@/components/sections/about/about-banner";
import { MeetJess } from "@/components/sections/about/meet-jess";
import { WhoWeAre } from "@/components/sections/about/who-we-are";
import { WhyA88 } from "@/components/sections/about/why-a88";
import { AboutCta } from "@/components/sections/about/about-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet A88 Finance Group: 20+ years helping everyday Australians find the right loan across 35+ lenders, with personal, honest, no-judgment finance guidance.",
  alternates: { canonical: "/about" },
};

const aboutStats = [
  { value: "20+", label: "Years Experience" },
  { value: "35+", label: "Lenders" },
  { value: "1:1", label: "Personal Support" },
  { value: "FBAA", label: "Accredited Member" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutBanner />
      <MeetJess />
      <WhoWeAre />
      <StatStrip stats={aboutStats} />
      <WhyA88 />
      <AboutCta />
    </>
  );
}
