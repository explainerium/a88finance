import Link from "next/link";

/**
 * Inner-page hero banner for the About page.
 * Replicates the mockup's `.pbanner` band (not in globals.css) with
 * Tailwind brand utilities + inline styles.
 */
export function AboutBanner() {
  return (
    <section
      className="relative overflow-hidden text-brand-paper"
      style={{
        background:
          "linear-gradient(120deg,#0d3158,#0b2a4a 60%,#0e3360)",
        padding: "66px 0 62px",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "-80px",
          top: "-120px",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(237,151,50,.34),transparent 68%)",
        }}
      />
      <div className="wrap relative z-[1]">
        <p
          className="mb-[14px]"
          style={{ fontSize: ".85rem", color: "#aebbd0", letterSpacing: ".01em" }}
        >
          <Link href="/" className="hover:text-brand-gold-soft">
            Home
          </Link>{" "}
          / <span className="text-brand-gold-soft">About</span>
        </p>
        <h1
          className="mb-[14px]"
          style={{ fontSize: "clamp(2.1rem,4.4vw,3.2rem)", lineHeight: 1.05 }}
        >
          Finance advice that starts with your story
        </h1>
        <p style={{ color: "#c2cbdc", maxWidth: "640px", fontSize: "1.06rem" }}>
          A88 Finance Group is a personal finance broking service helping
          everyday Australians find the right loan, with clarity, honesty, and a
          genuine no-judgment approach.
        </p>
      </div>
    </section>
  );
}
