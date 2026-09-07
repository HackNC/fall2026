import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { glossyPill } from "./glossyPill";

export default function Sponsors() {
  return (
    <section className="mx-auto max-w-6xl pt-4 pb-20 sm:pt-6 sm:pb-28">
      <div className="text-center">
        <span
          className={glossyPill(
            "bubble",
            // Larger than the nav pills this recipe usually dresses: it is the
            // section heading, so it carries its own padding and type size
            // rather than the shared defaults.
            "min-w-[8rem] cursor-default px-7 py-2.5 text-lg sm:min-w-[11rem] sm:px-9 sm:py-3 sm:text-xl lg:min-w-[14rem] lg:text-2xl"
          )}
        >
          our sponsors
        </span>
      </div>

      {/*
        Flex rather than grid, and deliberately so: the mockup runs three to a
        row with any short final row centred, which wrapping flex items do for
        free. A grid would left-align the stragglers, and pinning them with
        per-item column placement is what broke when the list grew past five.
      */}
      <ul className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-14 sm:mt-20">
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.name}
            className="w-[15rem] sm:w-[18rem] lg:w-[22rem]"
          >
            <a
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              aria-label={sponsor.name}
              className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal"
            >
              {/*
                Near-solid white rather than the mockup's flat grey: sponsor
                logos are normally supplied transparent and drawn for a white
                ground, so this is the canvas they need. The rim, blur and lift
                keep it in the same glass family as the nav and hero panels
                instead of reading as a pasted-on rectangle.

                The box keeps its landscape proportion whether or not a logo
                has arrived, so the rows do not reflow as artwork lands one
                sponsor at a time.
              */}
              <div className="relative aspect-[11/4] overflow-hidden rounded-card border border-white/70 bg-white/90 shadow-[0_6px_18px_rgba(23,55,113,0.14)] backdrop-blur-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-[0_10px_24px_rgba(23,55,113,0.2)]">
                {sponsor.logoSrc ? (
                  <Image
                    src={sponsor.logoSrc}
                    alt={sponsor.name}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 18rem, 15rem"
                    className="object-contain p-4"
                  />
                ) : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
