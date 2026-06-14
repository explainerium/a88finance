import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

/**
 * "Who we are" section — a personal introduction to Jess, the founder, with
 * her portrait and a first-person message so visitors connect with the person
 * behind A88 Finance Group. Image sits on the left, message on the right.
 */
export function MeetJess() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div
          className="grid items-center gap-[56px] md:grid-cols-2"
          style={{ gridTemplateColumns: "1fr 1.2fr" }}
        >
          <Reveal>
            <div
              className="relative mx-auto w-full max-w-[420px] overflow-hidden"
              style={{
                borderRadius: "22px",
                aspectRatio: "4 / 5",
                background: "linear-gradient(160deg,#0166BE,#0b2a4a)",
              }}
            >
              <Image
                src="/home/finance-advisor.webp"
                alt="Jess — founder and finance broker at A88 Finance Group"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <span className="kicker">Who we are</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3vw,2.5rem)",
                margin: "14px 0 16px",
              }}
            >
              Meet Jess, the person behind A88 Finance
            </h2>
            <p className="mb-[14px]" style={{ color: "var(--muted)" }}>
              &ldquo;Hi, I&rsquo;m Jess. After more than 20 years in finance, I
              started A88 Finance Group because I believe everyone deserves a
              fair go, no matter their background, credit history, or situation.&rdquo;
            </p>
            <p className="mb-[14px]" style={{ color: "var(--muted)" }}>
              Whether you&rsquo;re a family upgrading the car, a newcomer
              building credit in Australia, or a business owner who needs
              finance that moves at your pace, I&rsquo;ll do the legwork of
              comparing lenders so you don&rsquo;t have to.
            </p>
            <p className="mb-[18px]" style={{ color: "var(--muted)" }}>
              No pressure. No judgment. Just honest, personal advice from
              someone who genuinely gets it.
            </p>
            <div>
              <strong style={{ display: "block", lineHeight: 1.3 }}>Jess</strong>
              <small style={{ color: "var(--muted)" }}>
                Founder &amp; Finance Broker, A88 Finance Group &middot; FBAA Accredited
              </small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
