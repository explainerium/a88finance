import Link from "next/link";
import styles from "./blog-hero.module.css";

/**
 * Inner-page hero band for the Blog listing page.
 * Replicates the mockup's `.pbanner` / `.crumbs` band.
 */
export function BlogHero() {
  return (
    <section className={styles.pbanner}>
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.crumbs}>
          <Link href="/">Home</Link> / <span>Blog</span>
        </p>
        <h1>Your finance guide, clear and jargon-free</h1>
        <p>
          Easy-to-read articles that explain the finance process, answer common
          questions, and help you make informed choices.
        </p>
      </div>
    </section>
  );
}
