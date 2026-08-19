import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { glossyPill } from "./glossyPill";

const gridPlacement = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-start-2 lg:col-span-2",
  "lg:col-start-4 lg:col-span-2",
];

export default function Sponsors() {
  return (
    <section className="max-w-5xl mx-auto py-16 sm:py-20">
      <div className="text-center">
        <span
          className={glossyPill(
            "bubble",
            "min-w-[6.5rem] cursor-default sm:min-w-[8rem] lg:min-w-[11.2rem]"
          )}
        >
          our sponsors
        </span>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {sponsors.map((sponsor, index) => {
          const bubbleSize = Math.max(sponsor.width, sponsor.height) + 36;

          // deterministic pseudo-random based on index to avoid SSR hydration issues
          const seeded = Math.abs(Math.sin(index * 12.9898) * 43758.5453);
          const rnd = seeded - Math.floor(seeded);

          const duration = 9 + Math.round(rnd * 6); // 9..15s
          const delay = Math.round(rnd * 1200) / 1000; // 0..1.2s
          const swayX = 6 + Math.round(rnd * 12); // 6..18px
          const swayY = 2 + Math.round(rnd * 6); // 2..8px

          return (
            <div
              key={sponsor.name}
              className={`${gridPlacement[index]} flex justify-center`}
            >
              <div
                className={glossyPill(
                  "bubble",
                  "flex items-center justify-center overflow-hidden p-3 motion-safe:animate-bubble-sway"
                )}
                // The two custom properties drive the sway keyframes. Typed as
                // a CSSProperties intersection rather than cast through `any`,
                // so the rest of the object keeps its checking.
                style={
                  {
                    width: bubbleSize,
                    height: bubbleSize,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    willChange: "transform",
                    "--sway-x": `${swayX}px`,
                    "--sway-y": `${swayY}px`,
                  } as React.CSSProperties &
                    Record<"--sway-x" | "--sway-y", string>
                }
              >
                <Image
                  src={sponsor.logoSrc}
                  alt={sponsor.alt}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="h-[78%] w-[78%] object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
