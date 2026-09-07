"use client";

import Image from "next/image";
import { useScrollProgress } from "@/components/useScrollProgress";

/**
 * The home page's sky, water and bubbles.
 *
 * A fixed, full-viewport stage sitting behind everything — including the nav
 * bar, so the liquid glass up there has real water to blur rather than flat
 * colour.
 *
 * This used to be procedural: a CSS sky gradient, blurred cloud blobs, three
 * animated SVG wave bands and seven CSS bubbles. All of that is now one
 * photograph from the mockup, because the procedural version defeated the
 * glass everywhere else on the page. backdrop-filter does not invent an
 * appearance, it redistributes whatever sits behind it — and blurring a smooth
 * gradient returns the same smooth gradient. The panels only read as glass
 * when there is real cloud and water texture underneath to smear.
 *
 * The scene eases down in intensity across the first viewport but keeps a
 * low-opacity presence after that, so the single-page layout has one
 * continuous backdrop from top to bottom.
 */
export default function WaterBackdrop() {
  useScrollProgress();

  return (
    <div
      aria-hidden="true"
      // `water-backdrop` is the hook globals.css matches on to switch off the
      // shared page texture, which would otherwise wash over the scene.
      className="water-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ opacity: "calc(1 - (var(--scroll-hero) * 0.7))" }}
      >
        {/*
          Anchored to the top so the sky — not the crop — fills the viewport at
          any aspect ratio, which keeps the waterline below the hero panel on
          wide screens.
        */}
        <Image
          src="/hero-backdrop.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
