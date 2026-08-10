"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { glossyPill } from "@/components/glossyPill";

const internalLinks = [
  { label: "about", href: "/about" },
  { label: "resources", href: "/resources" },
  { label: "schedule", href: "/schedule" },
];

const REGISTER_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLSfMx28v4vb33tfTGMJoqbkKMWl2Js5JSXjX9wPYvMZiHOpRCQ/viewform";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="px-2 pt-3 sm:px-4 sm:pt-5">
      <nav
        aria-label="Primary"
        // The MLH badge is fixed to the top right corner, so the bar keeps a
        // matching gutter on that side at every width.
        //
        // Liquid glass: the blur is what does the work, so the tint stays very
        // light where backdrop-filter is available and falls back to a much
        // more opaque white where it is not — an untinted, unblurred bar over
        // the home page water would leave the tab labels unreadable.
        className="relative mx-auto flex w-full max-w-[89rem] flex-wrap items-center gap-x-4 gap-y-3 overflow-hidden rounded-[20px] border border-white/45 bg-white/40 px-4 py-3 pr-20 shadow-[0_8px_32px_rgba(23,55,113,0.18),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/15 sm:px-6 sm:pr-32"
      >
        {/*
          Specular highlight across the top half — the same "reflection" layer
          glossyPill paints on the tabs, at the scale of the whole bar. Every
          sibling below is positioned so that plain DOM order keeps them above
          this: an absolute element outpaints static ones no matter the order.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/45 to-transparent"
        />

        <Link
          href="/"
          aria-label="HackNC home"
          className="relative shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          <Image
            src="/hacknc-logo.png"
            alt="HackNC logo"
            width={74}
            height={74}
            priority
            className="h-12 w-12 object-contain sm:h-[74px] sm:w-[74px]"
          />
        </Link>

        {/* Below sm the tabs take their own full-width row so they can sit two
            or three across instead of one per line. */}
        <ul className="relative flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:flex-1 sm:gap-3.5">
          {internalLinks.map((link) => {
            const isCurrent = pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={glossyPill(
                    isCurrent ? "pressed" : "royal",
                    "min-w-[6.5rem] sm:min-w-[8rem] lg:min-w-[11.2rem]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              className={glossyPill(
                "royal",
                "min-w-[6.5rem] sm:min-w-[8rem] lg:min-w-[11.2rem]"
              )}
            >
              portal
            </a>
          </li>
          {/* Not in the Figma nav, but dropping it would leave the site with no
              registration link. Styled with the style guide's accent colour so
              it reads as the call to action. */}
          <li>
            <a
              href={REGISTER_HREF}
              target="_blank"
              rel="noreferrer"
              className={glossyPill(
                "tangerine",
                "min-w-[6.5rem] sm:min-w-[8rem] lg:min-w-[11.2rem]"
              )}
            >
              register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
