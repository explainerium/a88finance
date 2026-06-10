import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

/**
 * "Who we are" split section. The `.split`/`.visual` layout classes are not
 * in globals.css, so they're reproduced with Tailwind + inline styles.
 */
export function WhoWeAre() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div
          className="grid items-center gap-[56px] md:grid-cols-2"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <Reveal>
            <span className="kicker">Who we are</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3vw,2.5rem)",
                margin: "14px 0 16px",
              }}
            >
              More than 20 years helping people say yes to their next step
            </h2>
            <p className="mb-[14px]" style={{ color: "var(--muted)" }}>
              At A88 Finance Group, finance is personal. Led by Jess, we take the
              time to understand where you are, what you need, and what matters to
              you, then do the legwork of comparing lenders so you do not have to.
            </p>
            <p className="mb-[14px]" style={{ color: "var(--muted)" }}>
              With access to more than 25 lenders, we match you with options built
              around your real situation, whether you are a family upgrading the
              car, someone building credit in a new country, or a business owner
              who needs finance that moves at your pace.
            </p>
            <p style={{ color: "var(--muted)" }}>
              No pressure. No judgment. Just clear guidance and honest advice at
              every step.
            </p>
          </Reveal>

          <Reveal>
            <div
              className="relative grid place-items-center overflow-hidden"
              style={{
                borderRadius: "22px",
                aspectRatio: "4 / 3",
                background: "linear-gradient(160deg,#0166BE,#0b2a4a)",
              }}
            >
              <Image
                src="/about/Police%20certificate%20Marketing.webp"
                alt="A88 Finance Group — accredited, police-checked finance broking"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
