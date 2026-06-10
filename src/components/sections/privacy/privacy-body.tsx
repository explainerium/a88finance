import { siteConfig } from "@/lib/site-config";

/**
 * Long-form Privacy Policy body. Faithfully reproduces every heading and
 * clause from the mockup. Typography uses Tailwind brand utilities for a
 * clean, readable legal layout. Not wrapped in Reveal (long text body).
 */
export function PrivacyBody() {
  const { contact } = siteConfig;

  return (
    <section className="section-pad">
      <div className="wrap">
        <article className="mx-auto max-w-[760px]">
          <p className="text-sm italic text-brand-ink-2">
            <em>
              This page is a template provided for layout. Please review and
              replace it with your approved privacy policy before publishing, as
              credit and finance businesses have specific obligations under
              Australian law.
            </em>
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Who we are
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            A88 Finance Group Pty Ltd (ABN 66 673 606 614) is a credit
            representative (Credit Representative 572530) authorised under
            Australian Credit Licence 549146, and a member of the FBAA. We are
            committed to protecting your privacy and handling your personal
            information in line with the Privacy Act 1988 and the Australian
            Privacy Principles.
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Information we collect
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            We may collect information you provide when you enquire or apply for
            finance, including your name, contact details, employment and income
            details, identification, and information relevant to assessing a
            loan.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-relaxed text-brand-ink-2 marker:text-brand-gold-deep">
            <li>Contact details such as your name, phone number, and email</li>
            <li>
              Financial information needed to assess and submit a finance
              application
            </li>
            <li>Identification and verification documents</li>
            <li>Records of our communications with you</li>
          </ul>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            How we use your information
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            We use your information to understand your needs, compare lenders,
            prepare and submit applications, meet our legal and regulatory
            obligations, and communicate with you about your enquiry.
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Disclosure
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            We may share your information with lenders and credit providers, our
            authorising licensee, and service providers who help us operate,
            always for the purposes described above and in line with the law.
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Keeping your information secure
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            We take reasonable steps to protect your personal information from
            misuse, loss, and unauthorised access, and to keep it accurate and up
            to date.
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Access and correction
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            You can ask to access or correct the personal information we hold
            about you at any time by contacting us using the details below.
          </p>

          <h2 className="mt-12 mb-3 text-2xl font-semibold text-brand-ink">
            Complaints and contact
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-brand-ink-2">
            If you have a question or concern about how we handle your
            information, please contact us at{" "}
            <a
              href={contact.emailHref}
              className="font-semibold text-brand-gold-deep underline-offset-2 hover:underline"
            >
              {contact.email}
            </a>{" "}
            or on{" "}
            <a
              href={contact.phoneHref}
              className="font-semibold text-brand-gold-deep underline-offset-2 hover:underline"
            >
              {contact.phone}
            </a>{" "}
            and we will respond promptly.
          </p>
        </article>
      </div>
    </section>
  );
}
