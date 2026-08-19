"use client";

import { useState, type KeyboardEvent } from "react";
import { faqs } from "@/data/faqs";

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
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function selectTrack(index: number) {
    // Clicking the open track closes it; clicking any other opens that one.
    if (index === trackIndex && isPlaying) {
      setIsPlaying(false);
      return;
    }
    setTrackIndex(index);
    setIsPlaying(true);
  }

  // Skipping wraps, the way a playlist does, and always opens the track it
  // lands on — someone reaching for "next question" wants to read it, not to
  // move a selection they then have to activate separately.
  function skip(offset: number) {
    setTrackIndex((current) => (current + offset + faqs.length) % faqs.length);
    setIsPlaying(true);
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
          <span
            aria-hidden="true"
            // Flat forest rather than a gradient: white on the light end of a
            // gradient badge this size lands under 3:1.
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/70 bg-forest font-body text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_3px_rgba(20,120,66,0.4)]"
          >
            ?
          </span>

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
            const isOpen = isPlaying && index === trackIndex;

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
                  className="px-2 pt-1 pb-4 motion-safe:animate-track-open sm:px-4 sm:pl-13"
                >
                  <p className="max-w-[62ch] font-body text-base leading-7 tracking-body text-ink">
                    {faq.answer}
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
              onClick={() => setIsPlaying((playing) => !playing)}
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
