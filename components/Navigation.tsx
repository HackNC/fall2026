"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MLHBadge from "@/components/MLHBadge";
import { glossyPill } from "@/components/glossyPill";

const internalLinks = [
  { label: "about", href: "/about" },
  { label: "resources", href: "/resources" },
  { label: "schedule", href: "/schedule" },
];

const MLH_BADGE_WIDTH = "clamp(70px, 20vw, 100px)";
const MLH_BADGE_RIGHT_OFFSET = "clamp(10px, 3.5vw, 28px)";

export default function Navigation() {
  const pathname = usePathname();
  const [showPortalNotice, setShowPortalNotice] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  /*
   * Phone layout only. Below `sm` the four pills no longer fit beside the
   * logo, so they collapse into a dropdown behind a "menu" pill. The state is
   * harmless on wider screens: the toggle is hidden there and the list is
   * forced visible by its own `sm:flex`.
   */
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!showPortalNotice) return;
    const timer = window.setTimeout(() => setShowPortalNotice(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showPortalNotice]);

  // Following a link should close the menu, and so should Escape.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

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
        className={`relative mx-auto flex w-full max-w-[89rem] flex-wrap items-center gap-x-3 gap-y-3 overflow-visible rounded-control border border-white/45 bg-white/40 px-3 shadow-[0_8px_32px_rgba(23,55,113,0.18),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl backdrop-saturate-150 transition-[padding] duration-200 supports-[backdrop-filter]:bg-white/15 sm:gap-x-4 sm:px-6 sm:py-3 ${
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
            src="/hacknc-logo.webp"
            alt="HackNC logo"
            width={74}
            height={74}
            loading="eager"
            className="h-12 w-12 object-contain sm:h-[74px] sm:w-[74px]"
          />
        </Link>

        {/* Phone only: the dropdown toggle, pushed right against the badge's
            reserved corner. */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
          className={glossyPill(
            menuOpen ? "pressed" : "royal",
            "ml-auto min-w-[5.5rem] cursor-pointer sm:hidden"
          )}
        >
          {menuOpen ? "close" : "menu"}
        </button>

        {/*
          Reserves the badge's corner so nothing renders under it. Always
          present: on a phone it keeps the toggle clear of the badge, on wider
          screens it holds the link row away from it. It sits before the list
          in DOM order for the phone layout (where the list wraps to its own
          line), so from `sm` up it is ordered last to land after the row.
        */}
        <span
          aria-hidden="true"
          className="shrink-0 sm:order-last"
          style={{
            width: MLH_BADGE_WIDTH,
            marginRight: MLH_BADGE_RIGHT_OFFSET,
          }}
        />

        {/*
          On a phone this is the dropdown: a full-width row that wraps under
          the logo line (hence `order-last`) and stacks its pills. From `sm`
          up it is the inline link row it always was, sitting between the logo
          and the badge spacer in DOM order.
        */}
        <ul
          id="primary-links"
          className={`${
            menuOpen ? "flex" : "hidden"
          } order-last w-full flex-col items-stretch gap-2 pb-1 sm:order-none sm:flex sm:w-auto sm:flex-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5 sm:pb-0`}
        >
          {internalLinks.map((link) => {
            const isCurrent = pathname === link.href;

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={glossyPill(
                    isCurrent ? "pressed" : "royal",
                    "w-full sm:w-auto sm:min-w-[8rem] lg:min-w-[11.2rem]"
                  )}
                >
                  {link.label}
                </Link>
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
                "w-full cursor-pointer sm:w-auto sm:min-w-[8rem] lg:min-w-[11.2rem]"
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
                <span className="block whitespace-nowrap rounded-inset border border-white/55 bg-[linear-gradient(150deg,rgba(255,255,255,0.52)_0%,rgba(189,221,255,0.38)_100%)] px-3.5 py-1.5 font-body text-sm tracking-body text-ink shadow-[0_10px_26px_rgba(23,55,113,0.28),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl">
                  Portal is coming soon!
                </span>
              </div>
            ) : null}
          </li>
        </ul>

        <MLHBadge rightOffset={MLH_BADGE_RIGHT_OFFSET} />
      </nav>
    </header>
  );
}
