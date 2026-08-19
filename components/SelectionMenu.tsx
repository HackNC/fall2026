"use client";

import { useEffect, useRef } from "react";
import { glossyPill } from "@/components/glossyPill";

type SelectionMenuProps = {
  onViewDirectors: () => void;
  onViewCommittee: () => void;
  onClose: () => void;
};

/**
 * The console's SELECTION Menu, opened by the window's "menu" button.
 *
 * Unlike the member screens this really is a dialog — it sits over the team
 * window rather than replacing its contents — so it carries `role="dialog"`,
 * takes focus on open, and closes on Escape.
 *
 * The black bezel is the mockup's Wii screen: a deep rounded frame with the
 * live area inset inside it.
 */
export default function SelectionMenu({
  onViewDirectors,
  onViewCommittee,
  onClose,
}: SelectionMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-menu-heading"
      className="absolute inset-0 z-20 m-auto grid h-fit max-h-full w-[min(92%,42rem)] content-start overflow-auto rounded-window bg-[#111214] p-5 shadow-[0_18px_44px_rgba(23,55,113,0.45)] motion-safe:animate-channel-open sm:p-7"
    >
      <div className="flex items-center justify-between gap-4 px-1 pb-4">
        <h2
          id="selection-menu-heading"
          className="font-title text-section tracking-title text-white"
        >
          SELECTION Menu
        </h2>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={glossyPill(
            "pressed",
            "min-w-0 cursor-pointer gap-2 px-4 py-1.5 normal-case"
          )}
        >
          <HomeIcon />
          Close
        </button>
      </div>

      {/* The screen's live area, inset in the bezel. */}
      <div className="grid gap-5 rounded-card bg-[#1c1e22] px-6 py-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] sm:gap-6 sm:px-10 sm:py-14">
        <button
          type="button"
          onClick={onViewDirectors}
          className={glossyPill(
            "pressed",
            "mx-auto w-full max-w-[22rem] cursor-pointer normal-case"
          )}
        >
          View Directors
        </button>
        <button
          type="button"
          onClick={onViewCommittee}
          className={glossyPill(
            "pressed",
            "mx-auto w-full max-w-[22rem] cursor-pointer normal-case"
          )}
        >
          View Committee
        </button>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </svg>
  );
}
