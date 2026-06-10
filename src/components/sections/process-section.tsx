import { Reveal } from "@/components/shared/reveal";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return (
    <section className="process section-pad">
      <div className="wrap">
        <Reveal className="shead" >
          <span className="kicker">Process</span>
          <h2>Fast &amp; Stress-Free Process</h2>
          <p>
            Here&apos;s a simple breakdown of how the entire process works from
            start to finish.
          </p>
        </Reveal>

        <div className="steps">
          {processSteps.map((step, i) => (
            <Reveal className="step" key={step.title} delay={i * 0.06}>
              <div className="num">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
