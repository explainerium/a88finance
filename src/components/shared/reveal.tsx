"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Render as a different element (defaults to a div). */
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-reveal wrapper replicating the mockup's `.reveal` effect
 * (fade up + translateY) using motion, with reduced-motion support.
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  as = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
