import Image from "next/image";
import { REGISTER_HREF } from "@/data/site";

/**
 * The registration fish: swims across the page and links to the form.
 *
 * Two nested elements, each running one animation. A single element can only
 * hold one transform at a time, so the crossing and the bob would overwrite
 * each other — the outer node travels, the inner one bobs and tilts.
 *
 * Both are `motion-safe:`, so under `prefers-reduced-motion` the fish simply
 * sits still at the right of the strip and stays a perfectly usable link.
 */
export default function RegistrationFish() {
  return (
    <div
      /*
       * Overlays the top of the sponsors section rather than sitting in the
       * flow, so the fish swims across it exactly as in the mockup and adds no
       * vertical space of its own.
       *
       * Full viewport width via left-1/2 + w-screen: inheriting the page's
       * padding and 7xl max-width made the fish vanish short of both screen
       * edges, and spend that inset distance off-stage, which read as a pause.
       *
       * pointer-events-none so the strip cannot swallow clicks meant for the
       * sponsor cards underneath; the link itself opts back in.
       *
       * overflow-x-clip, not overflow-hidden: `hidden` on one axis forces the
       * other to `auto`, which would clip the curved text above the fish (and
       * make a scroll container). `clip` constrains only the axis named, so the
       * page cannot widen while the fish stays free to overlap vertically.
       */
      className="pointer-events-none absolute inset-x-0 top-[7rem] left-1/2 z-30 sm:top-[4rem] w-screen -translate-x-1/2 overflow-x-clip"
    >
      <a
        href={REGISTER_HREF}
        target="_blank"
        rel="noreferrer"
        // Pauses on hover and focus: a link that is still moving when you
        // reach for it is a link you keep missing.
        className="group pointer-events-auto inline-block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal motion-safe:animate-fish-swim motion-safe:hover:[animation-play-state:paused] motion-safe:focus-visible:[animation-play-state:paused]"
      >
        <span className="sr-only">Register for HackNC 2026</span>

        <span
          aria-hidden="true"
          className="relative block w-[11rem] motion-safe:animate-fish-bob motion-safe:group-hover:[animation-play-state:paused] sm:w-[14rem] lg:w-[17rem]"
        >
          <Image
            src="/registration-fish.webp"
            alt=""
            width={1198}
            height={635}
            // Well below the fold, so it stays lazy — the default.
            className="h-auto w-full drop-shadow-[0_10px_18px_rgba(23,55,113,0.25)] transition duration-200 group-hover:brightness-105"
          />

          {/*
            Curved along the fish's back with an SVG textPath — the mockup arcs
            it, and a rotated block of text cannot follow a curve.

            The viewBox matches the artwork's pixel dimensions, so the path
            coordinates below are just positions on the fish and the whole thing
            scales with it. Marked aria-hidden because the link already carries
            its name in the sr-only span above; exposing this too would have a
            screen reader read the call to action twice.
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1198 635"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              id="fish-text-arc"
              d="M -55 445 C -90 170, 115 -32, 650 -48"
              fill="none"
            />
            {/*
              White halo behind the glyphs via paint-order, so the text stays
              legible where the arc crosses the fish's darker markings. The arc
              itself has to stay inside the artwork's box — the strip clips
              horizontally, and anything drawn above the fish was cut off.
            */}
            <text
              className="font-title fill-ink"
              fontSize="76"
              letterSpacing="1"
              stroke="#eaf4ff"
              strokeWidth="9"
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              <textPath href="#fish-text-arc" startOffset="0%">
                click me to register...
              </textPath>
            </text>
          </svg>
        </span>
      </a>
    </div>
  );
}
