"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { faqs } from "@/data/faqs";
import questionMark from "@/app/figma/question mark button.png";

/*
 * Track lengths are authored as "m:ss" because that is what the mockup shows
 * and what is readable in the data file. Everything the player needs to do
 * with them is arithmetic, so they are converted once, here, at module scope —
 * `faqs` is a static import, so this runs a single time for the whole app.
 */
function toSeconds(duration: string) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatClock(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const trackSeconds = faqs.map((faq) => toSeconds(faq.duration));
// Summed rather than written down, so adding a question cannot leave a running
// time that no longer adds up.
const runningTime = formatClock(trackSeconds.reduce((sum, s) => sum + s, 0));

/** Playhead position: everything before the current track has "played". */
function elapsedBefore(index: number) {
  return formatClock(
    trackSeconds.slice(0, index).reduce((sum, s) => sum + s, 0)
  );
}

const transportButton =
  "grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-forest/25 " +
  "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_52%),linear-gradient(to_bottom,#EAF8EC_0%,#BFE6C6_100%)] " +
  "text-forest shadow-[0_2px_3px_rgba(20,120,66,0.3)] transition duration-150 " +
  "hover:brightness-105 active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export default function FaqPlaylist() {
  /*
   * Which answers are expanded. A set rather than a single index, because each
   * question toggles on its own — opening one no longer closes the others.
   *
   * `trackIndex` survives alongside it as the playhead: the transport row still
   * needs a notion of "current track" for skip and for the elapsed clock.
   */
  const [openIndices, setOpenIndices] = useState<ReadonlySet<number>>(
    () => new Set()
  );
  const [trackIndex, setTrackIndex] = useState(0);
  const isPlaying = openIndices.has(trackIndex);
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  function toggleTrack(index: number, force?: boolean) {
    setOpenIndices((current) => {
      const next = new Set(current);
      const shouldOpen = force ?? !next.has(index);
      if (shouldOpen) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  }
  /*
   * Escape and click-outside both dismiss the help popover.
   *
   * It stays open until dismissed rather than timing out like the nav's portal
   * notice, because it contains a mailto link — a message that disappears on
   * its own is one you cannot click.
   */
  useEffect(() => {
    if (!showHelp) return;

    function handleKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setShowHelp(false);
    }
    function handlePointer(event: PointerEvent) {
      if (!helpRef.current?.contains(event.target as Node)) setShowHelp(false);
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [showHelp]);

  // Each row is an independent toggle. The playhead follows the row that was
  // clicked so the transport controls stay anchored to what you last touched.
  function selectTrack(index: number) {
    setTrackIndex(index);
    toggleTrack(index);
  }

  // Skipping wraps, the way a playlist does, and always opens the track it
  // lands on — someone reaching for "next question" wants to read it, not to
  // move a selection they then have to activate separately.
  function skip(offset: number) {
    // Computed outside the updater on purpose: calling another setter from
    // inside one makes it impure, and React may invoke updaters twice.
    const next = (trackIndex + offset + faqs.length) % faqs.length;
    setTrackIndex(next);
    toggleTrack(next, true);
  }

  // Arrow keys move focus only, per the accordion pattern: moving the open
  // panel as focus travels would make it impossible to tab past the list.
  function handleTrackKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % faqs.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + faqs.length) % faqs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = faqs.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    document.getElementById(`faq-track-${nextIndex}`)?.focus();
  }

  return (
    <section aria-labelledby="faq-heading">
      {/* Retro player window, built like the schedule frame in the mockups'
          green register. */}
      <div className="overflow-hidden rounded-inset border-[3px] border-forest/25 bg-linear-to-b from-[#F4FFFE] from-0% via-[#EDFAF0] via-55% to-[#D6EFDB] to-100% px-3 pt-3 pb-4 shadow-[0_4px_10px_rgba(20,120,66,0.28)] sm:px-5 sm:pt-4 sm:pb-6">
        <div className="flex items-center gap-3 pb-3 sm:gap-4">
          <div ref={helpRef} className="relative shrink-0">
            {/*
              The orb is artwork from the Figma rather than a styled glyph, so
              the button is a bare hit target around it — no background, border
              or shadow of its own to fight the asset's own gloss.
            */}
            <button
              type="button"
              aria-expanded={showHelp}
              aria-label="Still have questions?"
              onClick={() => setShowHelp((open) => !open)}
              className="block cursor-pointer rounded-full transition duration-150 hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <Image src={questionMark} alt="" className="h-7 w-auto sm:h-8" />
            </button>

            {showHelp ? (
              <div
                role="status"
                className="absolute top-full left-0 z-30 mt-3 w-[min(20rem,calc(100vw-3rem))] motion-safe:animate-track-open"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 left-2.5 h-3 w-3 rotate-45 border-t border-l border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(214,239,219,0.75))] backdrop-blur-xl"
                />
                <p className="rounded-inset border border-white/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.92)_0%,rgba(214,239,219,0.8)_100%)] px-4 py-3.5 font-body text-sm leading-6 tracking-body text-ink shadow-[0_10px_26px_rgba(20,120,66,0.3),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl">
                  Still have questions? Can&rsquo;t find what you&rsquo;re
                  looking for? Reach out to us at{" "}
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

          <span aria-hidden="true" className="h-[3px] flex-1 bg-forest/70" />
          <h2
            id="faq-heading"
            className="shrink-0 font-title text-lg tracking-title text-forest lowercase sm:text-2xl"
          >
            FAQ playlist
          </h2>
          <span aria-hidden="true" className="h-[3px] flex-1 bg-forest/70" />

          {/* Decoration, like the schedule window's controls: a page cannot
              minimise or close itself, so these are not buttons. */}
          <span aria-hidden="true" className="flex shrink-0 gap-2">
            <i className="block h-4 w-4 rounded-full bg-linear-to-b from-[#E9FFD6] to-[#7FC08C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(20,120,66,0.35)]" />
            <i className="block h-4 w-4 rounded-full bg-linear-to-b from-[#D5FF82] to-[#4E9E68] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(20,120,66,0.35)]" />
          </span>
        </div>

        <ul className="rounded-card bg-white px-2 py-3 shadow-[0_2px_4px_rgba(20,120,66,0.2),inset_0_3px_6px_rgba(20,120,66,0.18)] sm:px-4 sm:py-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.has(index);

            return (
              <li key={faq.question}>
                <button
                  id={`faq-track-${index}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => selectTrack(index)}
                  onKeyDown={(event) => handleTrackKeyDown(event, index)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-3 text-left font-body tracking-body text-forest transition-colors duration-150 hover:bg-lime/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:gap-4 sm:px-4 ${
                    isOpen ? "bg-lime/35" : ""
                  }`}
                >
                  <span className="w-5 shrink-0 tabular-nums sm:w-6">
                    {index + 1}.
                  </span>
                  <span className="flex-1 text-body">{faq.question}</span>

                  {isOpen ? (
                    <span
                      aria-hidden="true"
                      className="flex h-4 shrink-0 items-end gap-[3px]"
                    >
                      {["0ms", "180ms", "360ms"].map((delay) => (
                        <i
                          key={delay}
                          className="block h-4 w-[3px] origin-bottom rounded-full bg-forest motion-safe:animate-equalizer"
                          style={{ animationDelay: delay }}
                        />
                      ))}
                    </span>
                  ) : null}

                  {/* Full-strength forest, not a faded one: at 75% it drops to
                      3.4:1 on white. The smaller size carries the hierarchy. */}
                  <span className="shrink-0 text-sm tabular-nums text-forest sm:text-base">
                    {faq.duration}
                  </span>
                </button>

                {/*
                  Always rendered and hidden with `hidden`, rather than removed
                  when closed. The button's aria-controls has to resolve to a
                  real element at all times, and unhiding restarts the open
                  animation just as remounting did.
                */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-track-${index}`}
                  hidden={!isOpen}
                  className="px-2 pt-1 pb-4 motion-safe:animate-track-open sm:px-4"
                >
                  {/*
                    No measure cap and no hanging indent: the ticket asks for
                    answers to run the full width of the container.
                  */}
                  <p className="w-full font-body text-base leading-7 tracking-body text-ink">
                    {faq.answerHref ? (
                      <a
                        href={faq.answerHref}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-forest underline underline-offset-2 hover:text-forest/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                      >
                        {faq.answer}
                      </a>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-3 pt-4 sm:gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous question"
              onClick={() => skip(-1)}
              className={transportButton}
            >
              <SkipIcon direction="back" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Hide the answer" : "Show the answer"}
              onClick={() => toggleTrack(trackIndex)}
              className={transportButton}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              aria-label="Next question"
              onClick={() => skip(1)}
              className={transportButton}
            >
              <SkipIcon direction="forward" />
            </button>
          </div>

          {/*
            Flavour rather than information — which question is open is already
            carried by the highlighted row and its aria-expanded — so it is
            hidden from assistive tech instead of read out as a stray timecode.
          */}
          <p
            aria-hidden="true"
            className="rounded-md border border-forest/25 bg-white px-3 py-1.5 font-mono text-sm tabular-nums text-forest shadow-[inset_0_1px_3px_rgba(20,120,66,0.25)]"
          >
            {isPlaying ? elapsedBefore(trackIndex) : "00:00"}/{runningTime}
          </p>
        </div>
      </div>
    </section>
  );
}

function SkipIcon({ direction }: { direction: "back" | "forward" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
      style={direction === "back" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 3.2c0-.5.55-.8.97-.54l6.4 4.05c.38.24.38.8 0 1.04L2.97 12.8A.64.64 0 0 1 2 12.26V3.2Z" />
      <rect x="11.6" y="2.6" width="2.4" height="10.8" rx="0.6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M3.5 2.6c0-.5.55-.81.98-.55l9 5.4a.64.64 0 0 1 0 1.1l-9 5.4a.64.64 0 0 1-.98-.55V2.6Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <rect x="3" y="2.5" width="3.6" height="11" rx="0.8" />
      <rect x="9.4" y="2.5" width="3.6" height="11" rx="0.8" />
    </svg>
  );
}
