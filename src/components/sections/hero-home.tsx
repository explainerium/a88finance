import Link from "next/link";
import Image from "next/image";
import { Layers, Zap } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

const reviewAvatars = [
  "https://lh3.googleusercontent.com/a-/ALV-UjUMMHGWvxqqAg0Hhq8XO9qlMT6tNqd60EykVMwuxg40EeZqFDrZSg=w36-h36-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjVJRxdCJXcgnf5wdZE4zPILpjwTvShz7nb49cySF83fQSEKJehp=w36-h36-p-rp-mo-ba12-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjVbifXrU5F7l1T7kPmgPgYjU0HIB9X_nJwVEY7LL8DQ9QyxWUYS=w36-h36-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjUGSyaDOvEyYlIR0hoGpGuuAinUj6XambDTuEQI4lSJIlOPpmPS=w36-h36-p-rp-mo-br100",
];

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
          <a
            className="trust-row"
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read our reviews on Google Maps"
          >
            <AvatarGroup>
              {reviewAvatars.map((src, i) => (
                <Avatar key={i} className="size-9 ring-2 ring-brand-paper">
                  <AvatarImage src={src} alt="" />
                  <AvatarFallback className="bg-brand-ink-3 text-brand-gold-soft">
                    ★
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <div>
              <div className="stars" aria-hidden>
                ★★★★★
              </div>
              Trusted by clients nationwide
            </div>
          </a>
        </Reveal>

        <Reveal className="hero-visual" delay={0.1}>
          <div className="hero-blob">
            <Image
              src="/home/hero-fleet.jpg"
              alt="Truck, van, and car finance with A88 Finance Group"
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
