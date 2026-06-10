import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { PrivacyBanner } from "@/components/sections/privacy/privacy-banner";
import { PrivacyBody } from "@/components/sections/privacy/privacy-body";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the A88 Finance Group privacy policy: how we collect, use, disclose, secure, and let you access your personal information under Australian privacy law.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <PrivacyBanner />
      <PrivacyBody />
    </>
  );
}
