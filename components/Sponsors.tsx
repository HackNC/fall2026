import Image from "next/image";
import { sponsors, type SponsorTier } from "@/data/sponsors";
import { glossyPill } from "./glossyPill";

/*
 * Card width per tier. The steps are deliberately gentle — the rows should
 * read as one field of cards that grows towards the top, not as separate
 * blocks — and everyone in a row is the same size as their neighbours.
 *
 * Every logo file shares one 11:4 canvas with the same inset, so a wider card
 * simply means a proportionally bigger logo with identical margins — nothing
 * per-sponsor to tune here.
 *
 * Spelled out in full for Tailwind's scanner; the `sizes` hint mirrors each
 * width so the browser fetches sensibly.
 */
const tierCard: Record<SponsorTier, { className: string; sizes: string }> = {
  1: {
    className: "w-[17rem] sm:w-[22rem] lg:w-[25.5rem]",
    sizes: "(min-width: 1024px) 25.5rem, (min-width: 640px) 22rem, 17rem",
  },
  2: {
    className: "w-[15.5rem] sm:w-[20rem] lg:w-[24rem]",
    sizes: "(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 15.5rem",
  },
  3: {
    // Fluid from xl up: a quarter of the row less the gaps, so seven cards
    // always break 4+3 rather than 3+3+1 with one stranded, and grow with the
    // row up to the section's max width (~18.5rem there).
    className: "w-[13rem] sm:w-[16rem] lg:w-[17.5rem] xl:w-[calc(25%-1.5rem)]",
    sizes:
      "(min-width: 1280px) 18.5rem, (min-width: 1024px) 17.5rem, (min-width: 640px) 16rem, 13rem",
  },
  4: {
    className: "w-[12rem] sm:w-[14.5rem] lg:w-[17rem]",
    sizes: "(min-width: 1024px) 17rem, (min-width: 640px) 14.5rem, 12rem",
  },
};

const tiers: SponsorTier[] = [1, 2, 3, 4];

export default function Sponsors() {
  return (
    // 7xl rather than the 6xl used elsewhere: the four fluid tier-3 cards
    // need the room, and this is the page wrapper's width anyway.
    <section className="mx-auto max-w-7xl pt-4 pb-20 sm:pt-6 sm:pb-28">
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
        One row per tier, top tier first, each row centred on its own. The
        rows are separate lists rather than one wrapped flex so that a tier
        never shares a line with the one below it, whatever the viewport. The
        space between rows matches the gap within a row on purpose, so the
        tiers are told apart by size alone rather than by a visible break.

        Within a row, wrapping flex (not grid) keeps any short final line
        centred, which is what the mockup does with stragglers.
      */}
      <div className="mt-14 space-y-10 sm:mt-20">
        {tiers.map((tier) => {
          const members = sponsors.filter((sponsor) => sponsor.tier === tier);
          if (members.length === 0) return null;
          const card = tierCard[tier];

          return (
            <ul
              key={tier}
              aria-label={`Tier ${tier} sponsors`}
              className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8"
            >
              {members.map((sponsor) => (
                <li key={sponsor.name} className={card.className}>
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={sponsor.name}
                    className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal"
                  >
                    {/*
                      Near-solid white rather than the mockup's flat grey:
                      sponsor logos are normally supplied transparent and drawn
                      for a white ground, so this is the canvas they need. The
                      rim, blur and lift keep it in the same glass family as
                      the nav and hero panels instead of reading as a pasted-on
                      rectangle.

                      The box keeps its landscape proportion whether or not a
                      logo has arrived, so the rows do not reflow as artwork
                      lands one sponsor at a time.

                      No padding on the image on purpose. Every logo file is
                      composed on the same 11:4 canvas as this box, centred
                      inside a shared safe area, so the spacing lives in the
                      asset and is identical for all of them. Padding here
                      would stack on top of it and shrink everything. See
                      data/sponsors.ts for the recipe.
                    */}
                    <div className="relative aspect-[11/4] overflow-hidden rounded-card border border-white/70 bg-white/90 shadow-[0_6px_18px_rgba(23,55,113,0.14)] backdrop-blur-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-[0_10px_24px_rgba(23,55,113,0.2)]">
                      {sponsor.logoSrc ? (
                        <Image
                          src={sponsor.logoSrc}
                          alt={sponsor.name}
                          fill
                          sizes={card.sizes}
                          className="object-contain"
                        />
                      ) : null}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}
