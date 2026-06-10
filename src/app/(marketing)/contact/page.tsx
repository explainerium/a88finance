import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { ContactBanner } from "@/components/sections/contact-page/contact-banner";
import { ContactDetails } from "@/components/sections/contact-page/contact-details";
import { ContactOffice } from "@/components/sections/contact-page/contact-office";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A88 Finance Group. Call, email, or request a callback for a no-obligation pre-approval chat about personal, business, or car finance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactBanner />
      <ContactDetails />
      <ContactOffice />
    </>
  );
}
