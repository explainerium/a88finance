import Link from "next/link";
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
          <div className="hero-frame hero-art">
            <HeroChart />
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

function HeroChart() {
  return (
    <svg viewBox="0 0 420 480" aria-hidden role="img">
      <defs>
        <linearGradient id="hb1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6b968" />
          <stop offset="1" stopColor="#ed9732" />
        </linearGradient>
        <linearGradient id="hb2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fb4e6" />
          <stop offset="1" stopColor="#0166be" />
        </linearGradient>
      </defs>

      {/* grid lines */}
      {[120, 200, 280, 360].map((y) => (
        <line
          key={y}
          x1="48"
          y1={y}
          x2="380"
          y2={y}
          stroke="rgba(255,255,255,.12)"
          strokeWidth="1"
        />
      ))}

      {/* bars */}
      {[
        { x: 70, h: 130, fill: "rgba(255,255,255,.28)" },
        { x: 138, h: 180, fill: "url(#hb2)" },
        { x: 206, h: 150, fill: "rgba(255,255,255,.28)" },
        { x: 274, h: 230, fill: "url(#hb1)" },
        { x: 342, h: 200, fill: "url(#hb2)" },
      ].map((b) => (
        <rect
          key={b.x}
          x={b.x - 22}
          y={400 - b.h}
          width="44"
          height={b.h}
          rx="10"
          fill={b.fill}
        />
      ))}

      {/* trend line */}
      <polyline
        points="70,300 138,250 206,260 274,180 342,150"
        fill="none"
        stroke="#ed9732"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [70, 300],
        [138, 250],
        [206, 260],
        [274, 180],
        [342, 150],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="6"
          fill="#0b2a4a"
          stroke="#f6b968"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
