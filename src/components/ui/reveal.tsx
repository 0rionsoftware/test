"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Wrap a section or a single element; children of a
 * `RevealGroup` inherit its stagger instead of animating independently.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const { x, y } = reduced ? offset.none : offset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word heading reveal. Splits on whitespace and preserves wrapping by
 * rendering each word as an inline-block with its own overflow clip.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Words rendered in the brass accent colour. */
  highlight?: string[];
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const highlighted = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <motion.h1
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : 0.05, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        // The clip is what makes the slide-up read as a reveal, but it also
        // cuts descenders. Pad the box and pull the same amount back off the
        // margin, so glyphs clear the edge without changing the line's
        // vertical rhythm.
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em]"
        >
          <motion.span
            className={cn(
              "inline-block",
              highlighted.has(word.toLowerCase().replace(/[^a-z]/g, "")) &&
                "text-accent",
            )}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
