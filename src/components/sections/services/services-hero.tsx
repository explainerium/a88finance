import Link from "next/link";
import styles from "./services-page.module.css";

export function ServicesHero() {
  return (
    <section className={styles.pbanner}>
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.crumbs}>
          <Link href="/">Home</Link> / <span>Services</span>
        </p>
        <h1>Finance solutions for every situation</h1>
        <p>
          From cars and personal loans to business and specialty finance, we
          compare more than 25 lenders to match you with the right option, fast.
        </p>
      </div>
    </section>
  );
}
