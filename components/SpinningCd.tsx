import Image from "next/image";

/**
 * The spinning disc that stands in for the mockup's "placeholder for graphic".
 *
 * Pure CSS and one image — no client component, no JS. The iridescence is a
 * conic gradient, the data tracks are a repeating radial gradient, and the
 * whole stack rotates on a keyframe.
 *
 * The sheen deliberately sits outside the rotating element. A highlight is the
 * reflection of a light in the room, so it stays put while the disc turns
 * under it; rotating it with the disc is the tell that makes CSS discs look
 * like spinning stickers.
 */
export default function SpinningCd() {
  return (
    <div
      // Decorative: the heading and copy beside it already say what this is.
      aria-hidden="true"
      className="group relative mx-auto aspect-square w-full max-w-[20rem] select-none"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(23,55,113,0.28)_0%,rgba(23,55,113,0)_72%)] blur-xl" />

      <div className="absolute inset-0 rounded-full shadow-[0_16px_36px_rgba(23,55,113,0.35)] motion-safe:animate-disc-spin motion-safe:group-hover:[animation-play-state:paused]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: [
              // Pressed data tracks, finest detail on top.
              "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16) 0 1px, rgba(23,55,113,0.07) 1px 3px)",
              // Shading from the clear inner ring out to the rim.
              "radial-gradient(circle at 50% 50%, rgba(244,255,254,0.95) 0 20%, rgba(255,255,255,0.35) 20% 26%, rgba(23,55,113,0.10) 26% 30%, rgba(255,255,255,0) 30% 94%, rgba(23,55,113,0.22) 100%)",
              // Iridescence.
              "conic-gradient(from 210deg, #ffd9f2, #bde0ff, #c7ffe6, #fff5c2, #ffc9d8, #d7c6ff, #bde0ff, #c7ffe6, #ffd9f2)",
            ].join(", "),
          }}
        />

        <div className="absolute inset-[27%] overflow-hidden rounded-full border border-white/70 bg-frost/80 shadow-[inset_0_2px_6px_rgba(23,55,113,0.2)]">
          <Image
            src="/hacknc-logo.webp"
            alt=""
            width={300}
            height={300}
            className="h-full w-full object-contain p-3"
          />
        </div>
      </div>

      {/* Fixed light source — see the note above. */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0)_28%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.12)_53%,rgba(255,255,255,0)_68%)]" />

      {/* Spindle hole. Rotationally symmetric, so it gains nothing by turning. */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-backdrop shadow-[inset_0_2px_5px_rgba(23,55,113,0.45)]" />

      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/60 ring-inset" />
    </div>
  );
}
