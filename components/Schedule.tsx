"use client";

import { useState, type KeyboardEvent } from "react";
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
    <section aria-labelledby="schedule-heading" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          HackNC weekend
        </p>
        <h1
          id="schedule-heading"
          className="mt-4 font-display text-4xl leading-none font-black tracking-[-0.04em] text-accent uppercase sm:text-6xl"
        >
          Schedule
        </h1>

        <div
          role="tablist"
          aria-label="Schedule days"
          className="mt-10 flex gap-x-5 border-b border-foreground/30 sm:gap-x-8"
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
                className={`-mb-px cursor-pointer border-b-2 px-1 py-4 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground hover:border-foreground"
                }`}
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
          className="mt-8"
        >
          {schedule[activeDay].map((event) => (
            <article
              key={`${event.time}-${event.title}`}
              className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-foreground/30 py-6 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <time className="font-mono text-xs font-semibold tracking-[0.08em] text-accent sm:text-sm">
                {event.time}
              </time>
              <div>
                <h2 className="font-display text-xl leading-tight font-bold sm:text-2xl">
                  {event.title}
                </h2>
                <p className="mt-2 max-w-2xl font-serif text-base leading-7 sm:text-lg">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
