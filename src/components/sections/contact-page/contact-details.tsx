import { Reveal } from "@/components/shared/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

const { contact } = siteConfig;

/**
 * Contact section: intro + call/email tiles on the left, the full LeadForm
 * (name/phone/email/finance-type/message) on the right.
 * Reuses the mockup's `.contact / .ctile / .ci / .ct / .cform` classes.
 */
export function ContactDetails() {
  return (
    <section className="contact section-pad">
      <div className="wrap">
        <Reveal>
          <span className="kicker" style={{ color: "var(--gold-soft)" }}>
            Contact
          </span>
          <div className="shead">
            <h2>Start With a 5-Minute Pre-Approval Chat</h2>
            <p>
              A quick pre-approval chat helps us understand what you&apos;re
              looking for, suggest the most suitable options, and guide you
              step-by-step so you feel confident moving forward.
            </p>
          </div>
          <div className="contact-cta">
            <a className="ctile" href={contact.phoneHref}>
              <span className="ci">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="ct">
                <small>Call Jess</small>
                <b>{contact.phone}</b>
              </span>
            </a>
            <a className="ctile" href={contact.emailHref}>
              <span className="ci alt">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <span className="ct">
                <small>Email us</small>
                <b>{contact.email}</b>
              </span>
            </a>
          </div>
          <p className="contact-note">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>{" "}
            Lines open Monday to Friday, 9:30am to 5:00pm
          </p>
        </Reveal>

        <Reveal className="cform" delay={0.1}>
          <h3>Request a callback</h3>
          <p className="sub">
            Tell me a little about what you need and I&apos;ll be in touch.
          </p>
          <LeadForm variant="full" submitLabel="Send Message" />
          <p className="cform-note">
            No obligation, and I&apos;ll get back to you within one business day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
