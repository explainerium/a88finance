import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

type Feature = {
  icon: ReactNode;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    title: "Personal, one-to-one support",
    body: "You deal directly with Jess, not a call centre. Real conversations and real answers.",
  },
  {
    icon: <path d="M3 21h18M5 21V10M19 21V10M5 10l7-5 7 5M9 21v-6h6v6" />,
    title: "Access to 35+ lenders",
    body: "We compare a wide panel of lenders to find the option that genuinely fits your situation.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    title: "Fast pre-approvals",
    body: "Clear next steps and quick turnarounds so you are not left waiting and wondering.",
  },
  {
    icon: (
      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 7a5 5 0 0 1 9.5 5C19 16.5 12 21 12 21z" />
    ),
    title: "A no-judgment approach",
    body: "Bad credit, low income, or a complicated history are met with support, not lectures.",
  },
  {
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Specialty solutions",
    body: "Options for ex-bankruptcy, ATO debt, and credit rebuilding when other doors have closed.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
    title: "Support for new arrivals",
    body: "Friendly, flexible finance for migrants and visa holders without long credit histories.",
  },
];

/**
 * "Why A88" feature grid. The `.feat-grid`/`.feat` card classes aren't in
 * globals.css, so they're reproduced with Tailwind + inline styles. `.svc-ic`
 * is a shared global class.
 */
export function WhyA88() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <Reveal>
          <div className="shead" style={{ margin: "0 auto", textAlign: "center" }}>
            <span className="kicker" style={{ justifyContent: "center" }}>
              Why A88
            </span>
            <h2>What working with us feels like</h2>
          </div>
        </Reveal>

        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: "46px" }}
        >
          {features.map((f, i) => (
            <Reveal as="div" key={f.title} delay={i * 0.05}>
              <article
                className="h-full bg-white"
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r)",
                  padding: "26px",
                }}
              >
                <div className="svc-ic" style={{ marginBottom: "16px" }}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    {f.icon}
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.14rem", marginBottom: "8px" }}>
                  {f.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
