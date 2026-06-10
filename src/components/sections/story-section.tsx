import Image from "next/image";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { storyPersonas } from "@/lib/content";

export function StorySection() {
  return (
    <section className="story section-pad">
      <div className="wrap">
        <Reveal className="shead">
          <span className="kicker">Finance for Every Story</span>
          <h2>Everyone&apos;s Journey Is Different</h2>
          <p>
            Whether you&apos;re supporting a family, starting fresh in Australia,
            or running your own business, I offer tailored loan solutions built
            around real life.
          </p>
        </Reveal>

        <div className="story-grid">
          {storyPersonas.map((p, i) => (
            <Reveal as="article" className="story-card" key={p.title} delay={i * 0.06}>
              <div className={`ph ph-${p.variant}`}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span className="ph-badge">
                  <ContentIcon name={p.icon} />
                </span>
              </div>
              <div className="body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
