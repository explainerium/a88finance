import Link from "next/link";
import Image from "next/image";
import { Layers, Zap } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const avatars = ["MS", "LW", "NP", "LT"];

export function HeroHome() {
  return (
    <section className="hero">
      <div className="wrap">
        <Reveal>
          <span className="kicker">Financial Services</span>
          <h1>
            Real Finance Solutions from <em>Someone Who Gets It</em>
          </h1>
          <p className="lead">
            Personal, business, and car loan solutions tailored for everyday
            Australians, delivered with clarity, honesty, and a no-judgment
            approach. Because good finance starts with understanding your story.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-ink" href="/apply">
              Get Pre-Approved
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Book a Call
            </Link>
          </div>
          <div className="trust-row">
            <div className="avs">
              {avatars.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <div>
              <div className="stars" aria-hidden>
                ★★★★★
              </div>
              Trusted by clients nationwide
            </div>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.1}>
          <div className="hero-blob">
            <Image
              src="/home/finance-advisor.webp"
              alt="A88 Finance Group finance advisor"
              fill
              sizes="(max-width: 980px) 100vw, 460px"
              className="hero-blob-img"
              priority
            />
          </div>
          <div className="chip c1">
            <span className="ic">
              <Layers aria-hidden />
            </span>
            <div>
              <b>25+</b>
              <small>Lenders compared</small>
            </div>
          </div>
          <div className="chip c2">
            <span className="ic">
              <Zap aria-hidden />
            </span>
            <div>
              <b>Fast</b>
              <small>Pre-approvals</small>
            </div>
          </div>
          <div className="hero-dot" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
