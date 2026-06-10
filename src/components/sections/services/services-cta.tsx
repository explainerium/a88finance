import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";
import styles from "./services-page.module.css";

export function ServicesCta() {
  const { contact } = siteConfig;

  return (
    <section className="section-pad" style={{ paddingTop: 64 }}>
      <div className="wrap">
        <Reveal className={styles.ctastrip}>
          <h2>Not sure which option fits?</h2>
          <p>
            Tell us a little about what you need and we will point you in the
            right direction.
          </p>
          <div className={styles.row}>
            <Link className="btn btn-gold" href="/apply">
              Get Pre-Approved
            </Link>
            <a className="btn btn-light" href={contact.phoneHref}>
              Call Jess
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
