import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

const { contact, hours } = siteConfig;

/**
 * "Find us" details + opening hours, using the mockup's `.office / .card /
 * .row / .hours` classes. Addresses, phone, email and hours come from
 * siteConfig.
 */
export function ContactOffice() {
  return (
    <section className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="office">
          <Reveal className="card">
            <h3>Find us</h3>
            <div className="row">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>{contact.addressMain}</div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>{contact.addressSecondary}</div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              <div>
                <a href={contact.emailHref}>{contact.email}</a>
              </div>
            </div>
          </Reveal>

          <Reveal className="card" delay={0.1}>
            <h3>Opening hours</h3>
            {hours.map((h) => (
              <div className="hours" key={h.day}>
                <span>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
