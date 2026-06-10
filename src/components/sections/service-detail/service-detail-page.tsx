import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";
import { ProcessSection } from "@/components/sections/process-section";
import { ContactSection } from "@/components/sections/contact-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

export type ServiceFeature = {
  /** Inline SVG paths/shapes to render inside the icon tile. */
  icon: ReactNode;
  title: string;
  text: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetailContent = {
  /** Breadcrumb label + hero H1 + intro. */
  crumbLabel: string;
  heroTitle: string;
  heroIntro: string;
  /** Intro split section. */
  kicker: string;
  introHeading: string;
  introParagraphs: string[];
  /** Inline SVG for the split visual tile (fallback when no image is set). */
  visualIcon: ReactNode;
  /** Optional photo for the split visual tile; replaces the gradient + icon. */
  visualImage?: string;
  /** "Options we can help with" cards. */
  features: ServiceFeature[];
  faqs: ServiceFaq[];
};

/** Deep brand-blue gradient used for the hero band + split visual (from the mockup). */
const heroGradient = "linear-gradient(120deg,#0d3158,#0b2a4a 60%,#0e3360)";
const visualGradient = "linear-gradient(160deg,#0166BE,#0b2a4a)";

function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="svc-ic" style={{ marginBottom: 16 }}>
      <svg viewBox="0 0 24 24">{children}</svg>
    </div>
  );
}

function SectionHead({ kicker, heading }: { kicker: string; heading: string }) {
  return (
    <Reveal>
      <div className="shead" style={{ margin: "0 auto", textAlign: "center" }}>
        <span className="kicker" style={{ justifyContent: "center" }}>
          {kicker}
        </span>
        <h2>{heading}</h2>
      </div>
    </Reveal>
  );
}

export function ServiceDetailPage({ content }: { content: ServiceDetailContent }) {
  const {
    crumbLabel,
    heroTitle,
    heroIntro,
    kicker,
    introHeading,
    introParagraphs,
    visualIcon,
    visualImage,
    features,
    faqs,
  } = content;

  return (
    <>
      {/* ============ HERO BANNER ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: heroGradient,
          color: "var(--paper)",
          padding: "66px 0 62px",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            right: -80,
            top: -120,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(237,151,50,.34),transparent 68%)",
          }}
        />
        <div className="wrap relative z-[1]">
          <Reveal>
            <p
              className="mb-[14px]"
              style={{
                fontSize: ".85rem",
                color: "#aebbd0",
                letterSpacing: ".01em",
              }}
            >
              <Link href="/" className="hover:text-[#f6b968]">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/services" className="hover:text-[#f6b968]">
                Services
              </Link>{" "}
              / <span style={{ color: "var(--gold-soft)" }}>{crumbLabel}</span>
            </p>
            <h1
              className="mb-[14px]"
              style={{ fontSize: "clamp(2.1rem,4.4vw,3.2rem)", lineHeight: 1.05 }}
            >
              {heroTitle}
            </h1>
            <p style={{ color: "#c2cbdc", maxWidth: 640, fontSize: "1.06rem" }}>
              {heroIntro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ INTRO SPLIT ============ */}
      <section className="section-pad">
        <div className="wrap">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <Reveal>
              <span className="kicker">{kicker}</span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem,3vw,2.4rem)",
                  margin: "14px 0 16px",
                }}
              >
                {introHeading}
              </h2>
              {introParagraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--muted)",
                    marginBottom:
                      i < introParagraphs.length - 1 ? 14 : undefined,
                  }}
                >
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal>
              <div
                className="relative grid place-items-center overflow-hidden"
                style={{
                  borderRadius: 22,
                  aspectRatio: "4 / 3",
                  background: visualGradient,
                }}
              >
                {visualImage ? (
                  <Image
                    src={visualImage}
                    alt={introHeading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 72% 20%,rgba(255,255,255,.14),transparent 60%)",
                      }}
                    />
                    <svg
                      viewBox="0 0 24 24"
                      className="relative z-[1]"
                      style={{
                        width: 96,
                        height: 96,
                        stroke: "rgba(255,255,255,.9)",
                        fill: "none",
                        strokeWidth: 1.2,
                      }}
                    >
                      {visualIcon}
                    </svg>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ OPTIONS WE CAN HELP WITH ============ */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead kicker="What we cover" heading="Options we can help with" />
          <div className="svc-grid" style={{ marginTop: 46 }}>
            {features.map((feat, i) => (
              <Reveal className="svc-card" key={feat.title} delay={i * 0.05}>
                <IconTile>{feat.icon}</IconTile>
                <h3>{feat.title}</h3>
                <p>{feat.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <ProcessSection />

      {/* ============ FAQ ============ */}
      <section className="section-pad">
        <div className="wrap">
          <SectionHead kicker="FAQ" heading="Common questions" />
          <Reveal className="mx-auto mt-10 max-w-[840px]">
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-[14px] border bg-white px-6 last:border-b"
                  style={{ borderColor: "var(--line)" }}
                >
                  <AccordionTrigger className="py-5 font-display text-[1.04rem] font-semibold text-brand-ink hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[.98rem] text-[color:var(--muted)]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="section-pad" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <Reveal>
            <div
              className="relative overflow-hidden text-center"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                borderRadius: 24,
                padding: 50,
              }}
            >
              <span
                aria-hidden
                className="absolute"
                style={{
                  left: -60,
                  bottom: -130,
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(237,151,50,.3),transparent 68%)",
                }}
              />
              <div className="relative z-[1]">
                <h2
                  style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 12 }}
                >
                  Let us find your best option
                </h2>
                <p
                  className="mx-auto"
                  style={{ color: "#c2cbdc", maxWidth: 560, marginBottom: 26 }}
                >
                  A quick pre-approval chat is the easiest place to start. No
                  obligation.
                </p>
                <div className="flex flex-wrap justify-center gap-[14px]">
                  <Link className="btn btn-gold" href="/apply">
                    Get Pre-Approved
                  </Link>
                  <a className="btn btn-light" href={siteConfig.contact.phoneHref}>
                    Call Jess
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT + NEWSLETTER ============ */}
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
