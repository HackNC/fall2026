"use client";

import { useScrollProgress } from "@/components/useScrollProgress";

/**
 * The home page's water, sky and bubbles.
 *
 * A fixed, full-viewport stage sitting behind everything — including the nav
 * bar, so the liquid glass up there has real water to blur rather than flat
 * colour. Layers move at different rates as the page scrolls, and the water
 * itself drifts sideways on its own so it reads as moving even at rest.
 *
 * The scene eases down in intensity across the first viewport but keeps a
 * low-opacity presence after that, so the single-page layout has one
 * continuous backdrop from top to bottom.
 */

/*
 * One wave tile. The curve leaves x=0 and arrives at x=1440 on the same y with
 * the same slope, which is what lets two copies sit end to end without a seam.
 * Changing a control point means changing its mirror on the other side too.
 */
const WAVE_CURVE =
  "M 0 100 C 120 40, 240 40, 360 100 C 480 160, 600 160, 720 100 C 840 40, 960 40, 1080 100 C 1200 160, 1320 160, 1440 100";
const WAVE_FILL = `${WAVE_CURVE} L 1440 200 L 0 200 Z`;

/*
 * Bubbles, positioned by hand to match the mockup rather than generated. A
 * random layout would differ between the prerender and the client and hydrate
 * with a mismatch, and these need to sit in specific gaps around the hero
 * panel anyway.
 */
const bubbles = [
  { left: "9%", top: "26%", size: "38px", delay: "0ms" },
  { left: "23%", top: "62%", size: "22px", delay: "900ms" },
  { left: "37%", top: "18%", size: "16px", delay: "1800ms" },
  { left: "61%", top: "34%", size: "54px", delay: "500ms" },
  { left: "74%", top: "12%", size: "26px", delay: "2400ms" },
  { left: "83%", top: "58%", size: "34px", delay: "1300ms" },
  { left: "48%", top: "72%", size: "18px", delay: "2000ms" },
];

type WaveBandProps = {
  /** Distance from the top of the viewport the crest sits at, un-scrolled. */
  top: string;
  /** How far the band rises over the first viewport of scroll. */
  travel: string;
  /** Crest strip height — this is what sets the visible wave amplitude. */
  crestClassName: string;
  driftClassName: string;
  fillClassName: string;
  color: string;
  /** Front band only: the white line of foam along the crest. */
  foam?: boolean;
};

function WaveBand({
  top,
  travel,
  crestClassName,
  driftClassName,
  fillClassName,
  color,
  foam = false,
}: WaveBandProps) {
  return (
    <div
      className="absolute inset-x-0"
      style={{
        top,
        transform: `translate3d(0, calc(var(--scroll-hero) * ${travel}), 0)`,
        willChange: "transform",
      }}
    >
      {/*
        The scroll offset is on the parent and the sideways drift is here, on a
        child that exists for no other reason. Both on one element and the
        running animation would overwrite the scroll transform every frame, so
        the band would drift but stop responding to the page at all.
      */}
      <div className={`flex w-[200%] ${crestClassName} ${driftClassName}`}>
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            className="h-full w-1/2 shrink-0"
            aria-hidden="true"
          >
            <path d={WAVE_FILL} fill={color} />
            {foam ? (
              <path
                d={WAVE_CURVE}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.55"
                strokeWidth="5"
              />
            ) : null}
          </svg>
        ))}
      </div>
      {/*
        Water below the crest. Tall enough that the band still reaches the
        bottom of the viewport at full travel — the stage clips the excess.
      */}
      <div className={`h-[130vh] ${fillClassName}`} />
    </div>
  );
}

export default function WaterBackdrop() {
  useScrollProgress();

  return (
    <div
      aria-hidden="true"
      // `water-backdrop` is the hook globals.css matches on to switch off the
      // shared page texture, which would otherwise wash over the waves.
      className="water-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ opacity: "calc(1 - (var(--scroll-hero) * 0.7))" }}
      >
        {/* Sky. The only layer that never moves. */}
        <div className="absolute inset-0 bg-linear-to-b from-[#f4fffe] from-0% via-[#dff2ff] via-30% to-[#a9e2fb] to-100%" />

        {/* Clouds: soft and barely parallaxed, so they read as far away. */}
        <div
          className="absolute inset-x-0 top-0 h-[60vh]"
          style={{
            transform: "translate3d(0, calc(var(--scroll-hero) * -6vh), 0)",
            willChange: "transform",
          }}
        >
          <div className="absolute -top-[8vh] -left-[6%] h-[38vh] w-[52%] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute top-[6vh] left-[38%] h-[30vh] w-[46%] rounded-full bg-white/55 blur-3xl" />
          <div className="absolute top-[22vh] -right-[10%] h-[26vh] w-[42%] rounded-full bg-white/45 blur-3xl" />
        </div>

        {/*
          Crests start 7–8vh apart. The travel figures step by 5vh rather than
          scaling with depth so that the nearest band, which moves most, cannot
          overtake the ones behind it before the scene fades — three crests
          collapsing into one is the thing that stops reading as water.
        */}
        <WaveBand
          top="56vh"
          travel="-14vh"
          crestClassName="h-[9vh]"
          driftClassName="motion-safe:animate-wave-back"
          fillClassName="bg-[#b6e4f7]"
          color="#b6e4f7"
        />
        <WaveBand
          top="63vh"
          travel="-19vh"
          crestClassName="h-[11vh]"
          driftClassName="motion-safe:animate-wave-mid"
          fillClassName="bg-[#83c9ec]"
          color="#83c9ec"
        />
        <WaveBand
          top="71vh"
          travel="-25vh"
          crestClassName="h-[13vh]"
          driftClassName="motion-safe:animate-wave-front"
          fillClassName="bg-linear-to-b from-[#4e9ed9] to-[#1554c9]"
          color="#4e9ed9"
          foam
        />

        {/* Bubbles ride between the middle and front water. */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(0, calc(var(--scroll-hero) * -18vh), 0)",
            willChange: "transform",
          }}
        >
          {bubbles.map((bubble) => (
            <span
              key={`${bubble.left}-${bubble.top}`}
              className="absolute rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_38%,rgba(122,197,236,0.28)_70%,rgba(21,84,201,0.16)_100%)] ring-1 ring-white/50 motion-safe:animate-bubble-bob"
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
                animationDelay: bubble.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
