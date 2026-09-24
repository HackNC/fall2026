"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import questionMark from "@/app/figma/question mark button.png";

type HelpPopoverProps = {
  /**
   * The opening line, e.g. "Still have questions?". It is also the button's
   * accessible name, and the rest of the message is the same everywhere.
   */
  question: string;
  /** Extra classes for the orb image — the callers differ only in size. */
  orbClassName?: string;
  /**
   * Where the "?" is already drawn into a window's artwork: the button is
   * then an invisible hit target over it, and these classes size it. The
   * orb image is not rendered.
   */
  hotspotClassName?: string;
};

/*
 * The "?" orb in a green window's title bar and the glass bubble it opens.
 *
 * Shared by the FAQ player and the resources window, which ask the same thing
 * in slightly different words. The orb is artwork from the Figma rather than
 * a styled glyph — a text "?" sits high in a circle because the glyph's weight
 * is above the em-box centre — so the button is a bare hit target around it,
 * with no background, border or shadow of its own to fight the asset's gloss.
 */
export default function HelpPopover({
  question,
  orbClassName = "h-7 sm:h-8",
  hotspotClassName,
}: HelpPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /*
   * Escape and click-outside both dismiss the popover.
   *
   * It stays open until dismissed rather than timing out like the nav's portal
   * notice, because it contains a mailto link — a message that disappears on
   * its own is one you cannot click.
   */
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    function handlePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={question}
        onClick={() => setIsOpen((open) => !open)}
        className={
          hotspotClassName
            ? /*
                The orb is in the artwork beneath, so hover brightens that
                through a backdrop filter — the same 110% as the image
                version, clipped to the orb's oval by the rounding. The hit
                area reaches past the drawn orb, which is small on a phone.
              */
              `relative block cursor-pointer rounded-full transition-[backdrop-filter] duration-150 after:absolute after:-inset-4 after:content-[''] hover:backdrop-brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${hotspotClassName}`
            : "block cursor-pointer rounded-full transition duration-150 hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        }
      >
        {hotspotClassName ? null : (
          <Image
            src={questionMark}
            alt=""
            className={`w-auto ${orbClassName}`}
          />
        )}
      </button>

      {isOpen ? (
        <div
          role="status"
          className="absolute top-full left-0 z-30 mt-3 w-[min(20rem,calc(100vw-3rem))] motion-safe:animate-track-open"
        >
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-2.5 h-3 w-3 rotate-45 border-t border-l border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(214,239,219,0.75))] backdrop-blur-xl"
          />
          {/*
            The lead-in is one string and the `{" "}` after the link is
            explicit, both on purpose: the compiler trims the leading space of
            a text node that wraps onto a second line, which glued "Can't" to
            the question and "and" to the address when they were plain JSX.
          */}
          <p className="rounded-inset border border-white/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.92)_0%,rgba(214,239,219,0.8)_100%)] px-4 py-3.5 font-body text-sm leading-6 tracking-body text-ink shadow-[0_10px_26px_rgba(20,120,66,0.3),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl">
            {`${question} Can't find what you're looking for? Reach out to us at `}
            <a
              href="mailto:hello@hacknc.com"
              className="font-bold text-forest underline underline-offset-2 hover:text-forest/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              hello@hacknc.com
            </a>{" "}
            and we&rsquo;ll be happy to help!
          </p>
        </div>
      ) : null}
    </div>
  );
}
