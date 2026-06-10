import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * "Ready when you are" CTA strip. The `.ctastrip` class isn't in globals.css,
 * so it's reproduced with Tailwind brand utilities + inline styles.
 */
export function AboutCta() {
  const { contact } = siteConfig;

  return (
    <section className="section-pad" style={{ paddingTop: "64px" }}>
      <div className="wrap">
        <Reveal>
          <div
            className="relative overflow-hidden bg-brand-ink text-brand-paper text-center"
            style={{ borderRadius: "24px", padding: "50px" }}
          >
            <span
              aria-hidden
              className="absolute"
              style={{
                left: "-60px",
                bottom: "-130px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(237,151,50,.3),transparent 68%)",
              }}
            />
            <h2
              className="relative z-[1]"
              style={{
                fontSize: "clamp(1.8rem,3vw,2.4rem)",
                marginBottom: "12px",
              }}
            >
              Ready when you are
            </h2>
            <p
              className="relative z-[1]"
              style={{ color: "#c2cbdc", maxWidth: "560px", margin: "0 auto 26px" }}
            >
              Start with a quick, no-obligation chat and see what is possible for
              your situation.
            </p>
            <div
              className="relative z-[1] flex flex-wrap justify-center gap-[14px]"
            >
              <Link className="btn btn-gold" href="/apply">
                Get Pre-Approved
              </Link>
              <a className="btn btn-light" href={contact.phoneHref}>
                Call Jess
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
