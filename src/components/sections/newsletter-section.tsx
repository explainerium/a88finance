import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="news section-pad">
      <div className="wrap">
        <Reveal>
          <div className="news-band">
            <div>
              <span className="kicker">Newsletter</span>
              <h2>Let&apos;s Stay Connected</h2>
              <p>
                Real stories, finance tips, and helpful resources to guide you on
                your journey, whether you&apos;re rebuilding your credit, buying a
                car, or growing your business.
              </p>
            </div>
            <div>
              <NewsletterForm />
              <p className="news-note">
                <Check aria-hidden />
                No spam, just useful finance tips. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
