"use client";

import { useState, type KeyboardEvent } from "react";
import { glossyPill } from "@/components/glossyPill";
import {
  schedule,
  scheduleDates,
  scheduleDays,
  scheduleIsTentative,
  type ScheduleDay,
} from "@/data/schedule";

/*
 * The window is the Figma export (public/schedule-components/"window
 * frame.svg"): blue frame, gradient title bar with its minimise / maximise /
 * close drawn in, and the inner white panel. Its canvas is 1209 x 1733, and
 * the numbers below are measured off it:
 *
 *   frame       x 4..1205 (a 4px shadow margin each side, 8px below)
 *   title bar   y 0..84; the window controls take x 932..1182
 *   panel       x 28..1181, y 84..1674, 10px corners
 *
 * Nine-sliced, as the resources window is: the slices take the title bar and
 * every corner, and only the plain middle stretches to the day's events. The
 * slice widths are shares of the window's width (`cqw` on the wrapper), so the
 * title bar and its controls stay evenly scaled at any width.
 */
const ART_WIDTH = 1209;
const at = (px: number) => `calc(${px} * 100cqw / ${ART_WIDTH})`;

const SLICE = { top: 100, right: 40, bottom: 70, left: 40 };

/*
 * Drawn from a 2x WebP render of that SVG (same folder, rendered with
 * headless Chrome), not the SVG itself: the export is full of blur and
 * drop-shadow filters, and as a border image the browser re-ran them on every
 * repaint — scrolling, and anything moving behind the glass nav — which
 * stalled one frame in ten for up to a second. A raster is cheap to paint.
 * Re-render it if the SVG changes.
 *
 * A raster's slices are in its own pixels, hence RENDER_SCALE below; the widths
 * the slices are drawn at are unchanged, still in the artwork's units.
 */
const RENDER_SCALE = 2;

const windowStyle = {
  borderImageSource: 'url("/schedule-components/window frame.webp")',
  borderImageSlice: `${SLICE.top * RENDER_SCALE} ${SLICE.right * RENDER_SCALE} ${SLICE.bottom * RENDER_SCALE} ${SLICE.left * RENDER_SCALE} fill`,
  borderImageWidth: `${at(SLICE.top)} ${at(SLICE.right)} ${at(SLICE.bottom)} ${at(SLICE.left)}`,
  borderImageRepeat: "stretch",
  // The panel's edges, plus room inside it.
  paddingTop: `calc(${at(84)} + clamp(1.25rem, 3.5cqw, 2.5rem))`,
  paddingBottom: `calc(${at(59)} + clamp(1.25rem, 4cqw, 3rem))`,
  paddingInline: `calc(${at(28)} + clamp(1rem, 4.5cqw, 3.5rem))`,
} as const;

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<ScheduleDay>(scheduleDays[0]);
  const dayEvents = schedule[activeDay];

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % scheduleDays.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + scheduleDays.length) % scheduleDays.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = scheduleDays.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextDay = scheduleDays[nextIndex];
    setActiveDay(nextDay);
    document.getElementById(`schedule-tab-${nextDay.toLowerCase()}`)?.focus();
  }

  return (
    <section aria-labelledby="schedule-heading" className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 sm:gap-12">
          <span aria-hidden="true" className="h-[3px] w-12 bg-royal sm:w-32" />
          <h1
            id="schedule-heading"
            className="font-title text-page tracking-title text-royal lowercase"
          >
            schedule
          </h1>
          <span aria-hidden="true" className="h-[3px] w-12 bg-royal sm:w-32" />
        </div>

        {scheduleIsTentative ? (
          <p className="mx-auto mt-5 max-w-[22rem] text-center font-body text-base tracking-body text-ink/75 sm:mt-6 sm:max-w-none sm:text-lg">
            Times and events may change, so be sure to check back closer to the
            weekend!
          </p>
        ) : null}

        {/*
          The window is the Figma export (see the note at the top). The day
          tabs sit in its title bar from 768px up — the title bar's height,
          from the panel's left edge (x 28) to just short of the window
          controls (x 912) — and at the top of the panel below that, where
          the title bar is too short to hold them.
        */}
        <div className="mt-8 [container-type:inline-size] sm:mt-12">
          <div className="relative border-0" style={windowStyle}>
            <div
              role="tablist"
              aria-label="Schedule days"
              className="mb-6 flex flex-wrap justify-center gap-2 md:absolute md:top-0 md:left-[calc(28*100cqw/1209)] md:mb-0 md:h-[calc(84*100cqw/1209)] md:max-w-[calc(884*100cqw/1209)] md:flex-nowrap md:items-center md:justify-start md:gap-4 lg:gap-8"
            >
              {scheduleDays.map((day, index) => {
                const isActive = day === activeDay;

                return (
                  <button
                    key={day}
                    id={`schedule-tab-${day.toLowerCase()}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`schedule-panel-${day.toLowerCase()}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveDay(day)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={glossyPill(
                      isActive ? "pressed" : "blossom",
                      "min-w-[6.5rem] cursor-pointer md:min-w-[8.5rem] lg:min-w-[11.2rem]"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div
              id={`schedule-panel-${activeDay.toLowerCase()}`}
              role="tabpanel"
              aria-labelledby={`schedule-tab-${activeDay.toLowerCase()}`}
              className={`min-h-[24rem] sm:min-h-[34rem] ${
                dayEvents.length === 0
                  ? "grid place-items-center text-center"
                  : ""
              }`}
            >
              {dayEvents.length === 0 ? (
                <p className="font-title text-page tracking-title text-royal lowercase">
                  coming soon
                </p>
              ) : (
                <>
                  {/*
                    Date only: the weekday is already the label on the tab
                    above.
                  */}
                  <p className="mb-2 font-body text-sm font-bold tracking-[0.18em] text-royal uppercase sm:mb-3 sm:text-base">
                    {scheduleDates[activeDay]}
                  </p>
                  {dayEvents.map((event) => (
                    <article
                      key={`${event.time}-${event.title}`}
                      className="grid gap-1 border-b border-sky py-5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-x-16 sm:py-7"
                    >
                      <time className="font-body text-page tracking-body whitespace-nowrap text-ink">
                        {event.time}
                      </time>
                      <div className="font-body tracking-body text-ink">
                        <h2 className="text-base sm:text-2xl">{event.title}</h2>
                        {event.description ? (
                          <p className="mt-1 max-w-[46rem] text-base sm:text-2xl">
                            {event.description}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
