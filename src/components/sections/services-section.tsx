import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { services as defaultServices, type Service } from "@/lib/content";

type ServicesSectionProps = {
  kicker?: string;
  title?: string;
  intro?: string;
  items?: Service[];
  cta?: { label: string; href: string };
};

export function ServicesSection({
  kicker = "Services",
  title = "Smart Finance Starts Here",
  intro = "With access to over 35 lenders, I compare your choices and match you with the finance solution that works best for your situation.",
  items = defaultServices,
  cta = { label: "All Services", href: "/services" },
}: ServicesSectionProps) {
  return (
    <section className="services section-pad">
      <div className="wrap">
        <div className="svc-top">
          <Reveal className="shead">
            <span className="kicker">{kicker}</span>
            <h2>{title}</h2>
            <p>{intro}</p>
          </Reveal>
          {cta && (
            <Link className="btn btn-ghost" href={cta.href}>
              {cta.label}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        <div className="svc-grid">
          {items.map((s, i) => {
            const card = (
              <>
                <div className="svc-ic">
                  <ContentIcon name={s.icon} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </>
            );
            return (
              <Reveal as="article" className="svc-card" key={s.title} delay={i * 0.04}>
                {s.href ? <Link href={s.href}>{card}</Link> : card}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
