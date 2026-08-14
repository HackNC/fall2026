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

          return (
            <div
              key={sponsor.name}
              className={`${gridPlacement[index]} flex justify-center`}
            >
              <div
                className={glossyPill(
                  "bubble",
                  "flex items-center justify-center overflow-hidden p-3"
                )}
                style={{
                  width: bubbleSize,
                  height: bubbleSize,
                }}
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
