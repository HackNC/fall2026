"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { glossyPill } from "@/components/glossyPill";

type SelectionMenuProps = {
  viewDirectorsDisabled?: boolean;
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
  viewDirectorsDisabled = false,
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

  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-menu-heading"
      className="fixed inset-0 z-50 m-auto grid h-fit max-h-[calc(100dvh-1.5rem)] w-[min(94%,42rem)] content-start overflow-auto rounded-window bg-[#111214] p-4 shadow-[0_18px_44px_rgba(23,55,113,0.45)] motion-safe:animate-channel-open min-[391px]:w-[min(92%,42rem)] min-[391px]:p-5 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3 px-1 pb-3 min-[391px]:gap-4 min-[391px]:pb-4">
        <h2
          id="selection-menu-heading"
          className="font-title text-[1.1rem] tracking-title text-white min-[391px]:text-section"
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
      <div className="grid gap-4 rounded-card bg-[#1c1e22] px-4 py-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] min-[391px]:gap-5 min-[391px]:px-6 min-[391px]:py-8 sm:gap-6 sm:px-10 sm:py-10">
        <button
          type="button"
          disabled={viewDirectorsDisabled}
          onClick={onViewDirectors}
          className={glossyPill(
            "pressed",
            "mx-auto w-full max-w-[22rem] cursor-pointer normal-case disabled:cursor-not-allowed disabled:opacity-45 disabled:brightness-95"
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

  if (typeof document === "undefined") return null;

  return createPortal(dialog, document.body);
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
