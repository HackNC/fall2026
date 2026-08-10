"use client";

import { useEffect, useState } from "react";
import { glossyPill } from "@/components/glossyPill";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
};

const EVENT_TIMESTAMP = Date.UTC(2026, 9, 9, 4, 0, 0);
const EVENT_DATE = new Date(EVENT_TIMESTAMP);

const REGISTER_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLSfMx28v4vb33tfTGMJoqbkKMWl2Js5JSXjX9wPYvMZiHOpRCQ/viewform";

/*
 * Glass capsules drifting around the panel, straight from the mockup. Fixed
 * positions rather than generated ones, so the prerender and the client agree.
 */
const capsules = [
  {
    className: "left-[4%] top-[14%] h-6 w-24 sm:h-7 sm:w-32",
    travel: "-9vh",
    delay: "0ms",
  },
  {
    className: "right-[7%] top-[9%] h-5 w-16 sm:h-6 sm:w-24",
    travel: "-14vh",
    delay: "1200ms",
  },
];

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      hasStarted: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    hasStarted: false,
  };
}

function formatUnit(value: number) {
  return String(value).padStart(2, "0");
}

const initialTimeLeft: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  hasStarted: false,
};

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);

  useEffect(() => {
    const updateTimeLeft = () => {
      setTimeLeft(getTimeLeft());
    };

    updateTimeLeft();
    const interval = window.setInterval(updateTimeLeft, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-9rem)] items-center justify-center">
      {capsules.map((capsule) => (
        <span
          key={capsule.className}
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-full border border-white/45 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${capsule.className}`}
          style={{
            transform: `translate3d(0, calc(var(--scroll-hero) * ${capsule.travel}), 0)`,
          }}
        />
      ))}

      <div className="relative w-full max-w-5xl">
        {/*
          Registration is also in the nav, but the mockup puts the primary call
          to action here, tilted and breaking the panel's top edge so it reads
          as a tag stuck onto the glass rather than another tab.

          The positioning lives on this wrapper rather than being passed into
          glossyPill. The recipe already sets `relative`, and Tailwind emits
          `.relative` after `.absolute`, so an `absolute` handed to it loses on
          source order and the tag would sit in the flow instead of on the
          panel's corner.
        */}
        <span className="absolute -top-5 right-4 z-10 -rotate-3 sm:right-10">
          <a
            href={REGISTER_HREF}
            target="_blank"
            rel="noreferrer"
            className={glossyPill(
              "blossom",
              "shadow-[0_6px_14px_rgba(23,55,113,0.35)]"
            )}
          >
            register here !
          </a>
        </span>

        {/*
          The mockup's panel is nearly clear, which puts white type at about
          2.6:1 over the sky behind it. The royal tint here is what carries the
          wordmark to 3.2:1 — AA for text this size — while the blur, the white
          rim and the highlight below keep it reading as glass rather than a
          solid block.
        */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(to_bottom,rgba(21,84,201,0.62)_0%,rgba(21,84,201,0.74)_100%)] px-6 pt-14 pb-16 shadow-[0_18px_48px_rgba(23,55,113,0.32)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[40px] sm:px-12 sm:pt-20 sm:pb-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white/30 to-transparent"
          />

          <h1 className="relative text-center font-title text-[clamp(2.5rem,11vw,6.5rem)] leading-none tracking-[0.02em] text-white lowercase [text-shadow:0_4px_18px_rgba(23,55,113,0.55)]">
            hacknc 2026
          </h1>
        </div>

        <div
          className="relative -mt-7 flex justify-center px-4 sm:-mt-9 sm:justify-end sm:pr-10"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Countdown to October 9, 2026 Eastern Time"
        >
          {timeLeft.hasStarted ? (
            <p className="rounded-full border border-white/35 bg-[rgba(23,55,113,0.72)] px-6 py-3 font-body text-base tracking-[0.12em] text-white uppercase backdrop-blur-md sm:text-lg">
              event has started
            </p>
          ) : (
            // Tabular figures on purpose: without them the seconds digit
            // changes width every tick and the whole pill jitters.
            <p className="rounded-full border border-white/35 bg-[rgba(23,55,113,0.72)] px-5 py-3 text-center font-body text-sm tracking-[0.1em] text-white tabular-nums uppercase shadow-[0_8px_20px_rgba(23,55,113,0.35)] backdrop-blur-md sm:px-8 sm:text-lg">
              {timeLeft.days} days : {formatUnit(timeLeft.hours)} hrs :{" "}
              {formatUnit(timeLeft.minutes)} min :{" "}
              {formatUnit(timeLeft.seconds)} sec
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
