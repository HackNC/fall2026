"use client";

import { useEffect, useRef } from "react";
import { committeeLabel, type Committee } from "@/data/teamMembers";

type SelectionMenuProps = {
  onViewDirectors: () => void;
  onViewCommittee: () => void;
  onClose: () => void;
  /** Named inside the screen, so it is clear which roster the choices lead to. */
  committee: Committee;
};

/*
 * The overlay is the Figma export ("selection menu overlay.svg"): the black
 * bezel, its drop shadow, the "SELECTION Menu" lettering and the translucent
 * inner screen, all baked in. Only the controls are live.
 *
 * Everything below is positioned as a percentage of that artwork, measured off
 * the export's own 1310x873 canvas, so the whole thing scales as one piece:
 *
 *   shadow margin   9px all round  -> the bezel is 1301x864 inside it
 *   inner screen    x 110..1199    -> 8.4% in from the left, 8.5% from the right
 *                   y 169..704     -> 19.4% down, 19.4% up from the bottom
 *
 * The band above the screen holds the baked lettering on the left, which is
 * why Close sits at its right and the committee name goes inside the screen
 * rather than beside a heading that cannot be edited.
 */
const ART_RATIO = "1310 / 873";
const SCREEN_INSET = {
  left: "8.4%",
  right: "8.5%",
  top: "19.4%",
  bottom: "19.4%",
} as const;

/* Hit target only: each button's artwork carries its own label and gloss. */
const artButton =
  "block cursor-pointer rounded-full transition duration-150 " +
  "hover:brightness-[1.06] active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/**
 * The console's SELECTION Menu, opened by choosing a committee.
 *
 * It is always scoped to one committee: the two choices lead to that
 * committee's directors or its members.
 */
export default function SelectionMenu({
  onViewDirectors,
  onViewCommittee,
  onClose,
  committee,
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
    /*
      Absolute, not fixed, and not portalled: the console is a self-contained
      sub-window, so its menu dims and covers only the console. Nothing
      outside it moves or changes. The window is the positioned ancestor.

      The scrim earns its place twice over — it is the click-anywhere-out
      dismiss, and the export's inner screen is deliberately translucent, so
      without something dark behind it the white console showed through and
      washed the panel to grey.
    */
    <div
      // The console's screen clips this to its white panel.
      className="absolute inset-0 z-40 grid place-items-center bg-ink/55 p-4 backdrop-blur-[2px] motion-safe:animate-channel-open"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="selection-menu-heading"
        className="w-full max-w-[46rem]"
        // The dialog is inside the scrim, so a click on it would bubble up and
        // dismiss the very thing that was clicked.
        onClick={(event) => event.stopPropagation()}
      >
        {/*
          The artwork sets the box, so the controls laid over it never drift
          out of the bezel however wide the dialog is.
        */}
        <div
          className="relative w-full bg-contain bg-center bg-no-repeat"
          style={{
            aspectRatio: ART_RATIO,
            backgroundImage:
              'url("/about-components/selection menu overlay.svg")',
          }}
        >
          {/* The visible name is inside the screen; this carries it to the a11y tree. */}
          <h2 id="selection-menu-heading" className="sr-only">
            SELECTION Menu — {committeeLabel(committee)}
          </h2>

          {/* Right of the baked lettering, in the band above the screen. */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${artButton} absolute w-[17%]`}
            style={{ top: "4.5%", right: SCREEN_INSET.right }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-components/close button.svg"
              alt=""
              className="block w-full"
            />
          </button>

          <div
            className="absolute flex flex-col items-center justify-center gap-[4%]"
            style={{
              left: SCREEN_INSET.left,
              right: SCREEN_INSET.right,
              top: SCREEN_INSET.top,
              bottom: SCREEN_INSET.bottom,
            }}
          >
            <p className="font-accent text-[clamp(0.7rem,1.8vw,1.05rem)] font-bold tracking-[0.12em] text-white/85 lowercase">
              {committeeLabel(committee)}
            </p>

            <button
              type="button"
              onClick={onViewDirectors}
              aria-label="View Directors"
              className={`${artButton} w-[62%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-components/view directors button.svg"
                alt=""
                className="block w-full"
              />
            </button>

            <button
              type="button"
              onClick={onViewCommittee}
              aria-label="View Committee"
              className={`${artButton} w-[62%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-components/view committee button.svg"
                alt=""
                className="block w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
