import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { Reveal } from "@/components/shared/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { ProcessSection } from "@/components/sections/process-section";
import { ApplyBanner } from "@/components/sections/apply/apply-banner";

export const metadata: Metadata = {
  title: "Apply for Finance",
  description:
    "Apply for car, personal, business or specialty finance online in minutes. Share a few details and A88 Finance compares 35+ lenders — no obligation, reply within one business day.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Apply", path: "/apply" },
        ])}
      />

      <ApplyBanner />

      <section className="section-pad">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <Reveal className="cform" style={{ maxWidth: "none" }}>
            <h3>Finance application</h3>
            <p className="sub">
              All fields help us match you with the right lender. We will never
              share your details without your consent. Where helpful, mention
              your approximate amount needed, your employment situation
              (full-time, casual, self-employed or contractor) and anything else
              we should know in the message — it helps us find your best options
              faster.
            </p>
            <LeadForm variant="full" submitLabel="Submit Application" />
            <p className="cform-note">
              No obligation, and we will get back to you within one business
              day.
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
    </>
  );
}
