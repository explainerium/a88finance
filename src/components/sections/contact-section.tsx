import { Clock, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const { contact } = siteConfig;

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="shead">
            <span className="kicker">Contact</span>
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
                <Phone aria-hidden />
              </span>
              <span className="ct">
                <small>Call Jess</small>
                <b>{contact.phone}</b>
              </span>
            </a>
            <a className="ctile" href={contact.emailHref}>
              <span className="ci alt">
                <Mail aria-hidden />
              </span>
              <span className="ct">
                <small>Email us</small>
                <b>{contact.email}</b>
              </span>
            </a>
          </div>

          <p className="contact-note">
            <Clock aria-hidden />
            Lines open Monday to Friday, 9:30am to 5:00pm
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="cform">
            <h3>Request a callback</h3>
            <p className="sub">
              Tell me a little about what you need and I&apos;ll be in touch.
            </p>
            <LeadForm variant="callback" />
            <p className="cform-note">
              No obligation, and I&apos;ll get back to you within one business
              day.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
