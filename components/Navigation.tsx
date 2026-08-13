"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MLHBadge from "@/components/MLHBadge";
import { glossyPill } from "@/components/glossyPill";

const internalLinks = [
  {
    label: "about",
    href: "#what-is-hacknc",
    sectionIds: ["what-is-hacknc", "faq", "sponsors", "about"],
  },
  { label: "resources", href: "#resources", sectionIds: ["resources"] },
  { label: "schedule", href: "#schedule", sectionIds: ["schedule"] },
];

const MLH_BADGE_WIDTH = "clamp(70px, 20vw, 100px)";
const MLH_BADGE_RIGHT_OFFSET = "clamp(10px, 3.5vw, 28px)";

export default function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPortalNotice, setShowPortalNotice] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const trackedIds = useMemo(
    () => Array.from(new Set(internalLinks.flatMap((link) => link.sectionIds))),
    []
  );

  useEffect(() => {
    const sections = trackedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibility.set(
            id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        let nextActive: string | null = null;
        let maxRatio = 0;

        for (const link of internalLinks) {
          const ratio = Math.max(
            ...link.sectionIds.map((id) => visibility.get(id) ?? 0)
          );

          if (ratio > maxRatio) {
            maxRatio = ratio;
            nextActive = link.label;
          }
        }

        setActiveSection(maxRatio > 0 ? nextActive : null);
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      }
    );

    for (const section of sections) {
      visibility.set(section.id, 0);
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [trackedIds]);

  useEffect(() => {
    if (!showPortalNotice) return;
    const timer = window.setTimeout(() => setShowPortalNotice(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showPortalNotice]);

  useEffect(() => {
    function syncCompactState() {
      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
      setIsCompact(isSmallScreen && window.scrollY > 10);
    }

    syncCompactState();
    window.addEventListener("scroll", syncCompactState, { passive: true });
    window.addEventListener("resize", syncCompactState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncCompactState);
      window.removeEventListener("resize", syncCompactState);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 px-2 transition-[padding] duration-200 sm:px-4 sm:pt-5 ${
        isCompact ? "pt-1.5" : "pt-3"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`relative mx-auto flex w-full max-w-[89rem] flex-wrap items-center gap-x-4 gap-y-3 overflow-visible rounded-[20px] border border-white/45 bg-white/40 px-4 shadow-[0_8px_32px_rgba(23,55,113,0.18),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl backdrop-saturate-150 transition-[padding] duration-200 supports-[backdrop-filter]:bg-white/15 sm:px-6 sm:py-3 ${
          isCompact ? "py-2" : "py-3"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-transparent"
        />

        <Link
          href="/"
          aria-label="HackNC home"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
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

        <ul className="relative flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:flex-1 sm:justify-center sm:gap-3.5">
          {internalLinks.map((link) => {
            const isCurrent = activeSection === link.label;

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (link.label !== "about") return;

                    const target = document.getElementById("what-is-hacknc");
                    if (!target) return;

                    event.preventDefault();
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "nearest",
                    });
                    window.history.replaceState(null, "", "#what-is-hacknc");
                  }}
                  aria-current={isCurrent ? "location" : undefined}
                  className={glossyPill(
                    isCurrent ? "pressed" : "royal",
                    "min-w-[6.5rem] sm:min-w-[8rem] lg:min-w-[11.2rem]"
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="relative">
            <button
              type="button"
              aria-expanded={showPortalNotice}
              onClick={() => setShowPortalNotice(true)}
              className={glossyPill(
                "royal",
                "min-w-[6.5rem] cursor-pointer sm:min-w-[8rem] lg:min-w-[11.2rem]"
              )}
            >
              portal
            </button>
            {showPortalNotice ? (
              <div
                role="status"
                aria-live="polite"
                className="absolute top-full left-1/2 z-30 mt-2 -translate-x-1/2"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-white/55 bg-[linear-gradient(145deg,rgba(255,255,255,0.65),rgba(216,236,255,0.55))] backdrop-blur-xl"
                />
                <span className="block whitespace-nowrap rounded-xl border border-white/55 bg-[linear-gradient(150deg,rgba(255,255,255,0.52)_0%,rgba(189,221,255,0.38)_100%)] px-3.5 py-1.5 text-sm tracking-[0.02em] text-[#12356b] shadow-[0_10px_26px_rgba(23,55,113,0.28),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl">
                  Portal is coming soon!
                </span>
              </div>
            ) : null}
          </li>
        </ul>

        <span
          aria-hidden="true"
          className="hidden shrink-0 sm:block"
          style={{
            width: MLH_BADGE_WIDTH,
            marginRight: MLH_BADGE_RIGHT_OFFSET,
          }}
        />

        <MLHBadge rightOffset={MLH_BADGE_RIGHT_OFFSET} />
      </nav>
    </header>
  );
}
