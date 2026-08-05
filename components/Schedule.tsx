"use client";

import { useState, type KeyboardEvent } from "react";
import { glossyPill } from "@/components/glossyPill";
import { schedule, scheduleDays, type ScheduleDay } from "@/data/schedule";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<ScheduleDay>(scheduleDays[0]);

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
            className="font-title text-2xl tracking-[0.05em] text-royal lowercase sm:text-4xl"
          >
            schedule
          </h1>
          <span aria-hidden="true" className="h-[3px] w-12 bg-royal sm:w-32" />
        </div>

        {/* Retro OS window frame. */}
        <div className="mt-8 overflow-hidden rounded-[10px] border-[3px] border-royal/30 bg-radial-[at_5%_5%] from-[#F4FFFE] from-[25%] via-[#B8D2F2] via-[70%] to-[#487DDF] to-[100%] px-4 pt-4 pb-8 shadow-[0_4px_4px_rgba(23,55,113,0.45)] sm:mt-12 sm:px-6 sm:pt-5 sm:pb-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Schedule days"
              className="flex flex-wrap gap-2 sm:gap-4 lg:gap-8"
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
                      "min-w-[6.5rem] cursor-pointer sm:min-w-[8.5rem] lg:min-w-[11.2rem]"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/*
              Window controls are pure decoration — a page cannot minimise or
              close itself — so they are hidden from assistive tech rather than
              exposed as buttons that do nothing.
            */}
            {/* Flush to the frame's top-right corner, as in the mockup. */}
            <div className="-mt-4 -mr-4 ml-auto hidden sm:-mt-5 sm:-mr-6 sm:flex">
              <span
                aria-hidden="true"
                className="grid h-[38px] w-[62px] place-items-end border-b border-l border-royal/25 bg-linear-to-b from-[#F7FAFF] to-[#D2E1F6] pr-4 pb-1.5 text-base text-ink/70 shadow-[0_1px_4px_rgba(23,55,113,0.3)]"
              >
                &#8211;
              </span>
              <span
                aria-hidden="true"
                className="grid h-[38px] w-[62px] place-items-center border-b border-l border-royal/25 bg-linear-to-b from-[#F7FAFF] to-[#D2E1F6] text-xs text-ink/70 shadow-[0_1px_4px_rgba(23,55,113,0.3)]"
              >
                &#9744;
              </span>
              <span
                aria-hidden="true"
                className="grid h-[38px] w-[72px] place-items-center rounded-tr-[7px] rounded-bl-[5px] border-[1.5px] border-[#BA0303]/30 bg-linear-to-b from-[#CC5959] from-[32%] to-[#FFBEBE] to-[72%] font-body text-lg text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] [text-shadow:0_1px_4px_rgba(23,55,113,0.5)]"
              >
                X
              </span>
            </div>
          </div>

          <div
            id={`schedule-panel-${activeDay.toLowerCase()}`}
            role="tabpanel"
            aria-labelledby={`schedule-tab-${activeDay.toLowerCase()}`}
            className="mt-4 min-h-[28rem] rounded-[10px] bg-white px-5 py-6 shadow-[0_4px_4px_rgba(23,55,113,0.25),inset_0_4px_4px_rgba(23,55,113,0.25)] sm:mt-3.5 sm:min-h-[40rem] sm:px-12 sm:py-10"
          >
            {schedule[activeDay].map((event) => (
              <article
                key={`${event.time}-${event.title}`}
                className="grid gap-1 border-b border-sky py-5 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-x-16 sm:py-7"
              >
                <time className="font-body text-lg tracking-[0.05em] whitespace-nowrap text-ink sm:text-[2rem]">
                  {event.time}
                </time>
                <div className="font-body tracking-[0.05em] text-ink">
                  <h2 className="text-base sm:text-2xl">{event.title}</h2>
                  <p className="mt-1 max-w-[46rem] text-base sm:text-2xl">
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
