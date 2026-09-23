"use client";

import Image from "next/image";
import { useScrollProgress } from "@/components/useScrollProgress";

/**
 * The home page's sky, water, and parallax depth layers.
 *
 * A fixed, full-viewport stage sitting behind everything — including the nav
 * bar, so the liquid glass up there has real water and atmosphere to blur.
 *
 * Implements multi-layered parallax scrolling:
 * 1. The background photo eases upward at a slower rate than foreground
 *    scrolling via `--scroll-hero`, creating physical depth behind the glass panels.
 * 2. Multi-layer ambient bubbles drift vertically at varying rates tied to
 *    `--scroll-px`, giving the page continuous aquatic depth from top to bottom.
 *
 * All motion is driven directly through CSS custom properties with zero React
 * re-renders on scroll, and respects `prefers-reduced-motion`.
 */

const ambientBubbles = [
  // Deep layer (smaller, soft depth, gentle parallax travel)
  {
    left: "8%",
    top: "22%",
    size: "26px",
    travel: "-0.07px",
    delay: "0ms",
    opacity: "opacity-60",
  },
  {
    left: "88%",
    top: "35%",
    size: "22px",
    travel: "-0.08px",
    delay: "1200ms",
    opacity: "opacity-55",
  },
  {
    left: "5%",
    top: "68%",
    size: "20px",
    travel: "-0.06px",
    delay: "2400ms",
    opacity: "opacity-50",
  },
  {
    left: "92%",
    top: "78%",
    size: "24px",
    travel: "-0.09px",
    delay: "800ms",
    opacity: "opacity-60",
  },

  // Midground layer (medium size, balanced travel)
  {
    left: "14%",
    top: "16%",
    size: "38px",
    travel: "-0.15px",
    delay: "400ms",
    opacity: "opacity-75",
  },
  {
    left: "83%",
    top: "14%",
    size: "34px",
    travel: "-0.17px",
    delay: "1800ms",
    opacity: "opacity-70",
  },
  {
    left: "6%",
    top: "45%",
    size: "42px",
    travel: "-0.16px",
    delay: "900ms",
    opacity: "opacity-75",
  },
  {
    left: "89%",
    top: "56%",
    size: "36px",
    travel: "-0.18px",
    delay: "2200ms",
    opacity: "opacity-70",
  },
  {
    left: "11%",
    top: "84%",
    size: "32px",
    travel: "-0.14px",
    delay: "1500ms",
    opacity: "opacity-65",
  },

  // Foreground layer (larger, crisp, faster travel)
  {
    left: "3%",
    top: "28%",
    size: "50px",
    travel: "-0.26px",
    delay: "700ms",
    opacity: "opacity-85",
  },
  {
    left: "93%",
    top: "42%",
    size: "56px",
    travel: "-0.28px",
    delay: "1600ms",
    opacity: "opacity-85",
  },
  {
    left: "7%",
    top: "90%",
    size: "46px",
    travel: "-0.24px",
    delay: "300ms",
    opacity: "opacity-80",
  },
];

export default function WaterBackdrop() {
  useScrollProgress();

  return (
    <div
      aria-hidden="true"
      // `water-backdrop` is the hook globals.css matches on to switch off the
      // shared page texture, which would otherwise wash over the scene.
      className="water-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/*
        Backdrop Image Layer with Parallax Translation:
        Scaled slightly with an overshoot margin so that translating vertically
        by -6vh never uncovers unpainted viewport edges during scroll.
      */}
      <div
        className="absolute -inset-y-8 inset-x-0 transition-opacity duration-300 motion-safe:will-change-transform"
        style={{
          opacity: "calc(1 - (var(--scroll-hero) * 0.65))",
          transform: "translate3d(0, calc(var(--scroll-hero) * -6vh), 0)",
        }}
      >
        <Image
          src="/other/hero-backdrop.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="scale-105 object-cover object-top"
        />
      </div>

      {/*
        Multi-Layer Ambient Parallax Bubbles:
        Distributed in deep, midground, and foreground planes that travel at
        differing velocities as the user scrolls, creating authentic underwater depth.
      */}
      <div className="absolute inset-0">
        {ambientBubbles.map((bubble, i) => (
          <span
            key={`ambient-bubble-${i}`}
            className={`absolute rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.38)_36%,rgba(122,197,236,0.26)_70%,rgba(21,84,201,0.14)_100%)] ring-1 ring-white/45 shadow-[0_4px_16px_rgba(23,55,113,0.15)] motion-safe:animate-bubble-bob motion-safe:will-change-transform ${bubble.opacity}`}
            style={{
              left: bubble.left,
              top: bubble.top,
              width: bubble.size,
              height: bubble.size,
              animationDelay: bubble.delay,
              transform: `translate3d(0, calc(var(--scroll-px) * ${bubble.travel}), 0)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
