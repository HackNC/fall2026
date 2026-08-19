"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { glossyPill } from "@/components/glossyPill";
import wordmark from "@/app/figma/hacknc 2026.png";

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
  {
    className: "left-[3%] top-[62%] h-8 w-32 sm:h-10 sm:w-44",
    travel: "-6vh",
    delay: "600ms",
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

      <div className="relative w-full max-w-[67rem]">
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
        <span className="absolute -top-6 right-4 z-10 sm:-top-7 sm:right-8">
          <a
            href={REGISTER_HREF}
            target="_blank"
            rel="noreferrer"
            className={glossyPill(
              "blossom",
              "shadow-[0_6px_14px_rgba(23,55,113,0.35)] sm:px-10 sm:py-3 sm:text-2xl"
            )}
          >
            register here !
          </a>
        </span>

        {/*
          The glass is the panel, not the type. It is almost entirely clear —
          a faint white wash, a bright rim and a soft blur — so the sky and
          bubbles behind it stay readable straight through the middle.
        */}
        <div className="relative overflow-hidden rounded-panel border border-white/65 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.10)_55%,rgba(255,255,255,0.16)_100%)] px-6 pt-10 pb-12 shadow-[0_18px_48px_rgba(23,55,113,0.18)] backdrop-blur-md backdrop-saturate-125 sm:px-12 sm:pt-12 sm:pb-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white/25 to-transparent"
          />

          {/*
            Still artwork rather than live text, and it has to stay that way
            until the font is licensed.

            The Bubbleboddy Neue *trial* substitutes a "PERSONAL USE ONLY —
            ZETAFONTS.COM" watermark for every digit glyph, in all three
            weights. Letters render perfectly, so `font-title` is fine for
            headings; anything containing numbers is not. "hacknc 2026" set as
            live text renders as `hacknc` followed by four watermark badges.

            This export came from the Figma, which has the full family, so its
            numerals are correct. Swap back to live text with `font-title
            text-display font-light` once the commercial licence is bought.
          */}
          <h1 className="relative">
            <span className="sr-only">HackNC 2026</span>
            <Image
              src={wordmark}
              alt=""
              priority
              className="mx-auto h-auto w-full max-w-[46rem]"
            />
          </h1>
        </div>

        {/*
          Its own pane of glass rather than a pill, tucked under the panel's
          bottom-right corner and overlapping it. The negative margin is what
          makes the two sheets read as stacked; the right inset keeps it clear
          of the panel's rounded corner.
        */}
        <div
          className="relative flex justify-center px-4 sm:justify-end sm:pr-6"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Countdown to October 9, 2026 Eastern Time"
        >
          {timeLeft.hasStarted ? (
            <p className="rounded-control border border-white/65 bg-white/15 px-6 py-4 font-body text-body tracking-body text-white uppercase shadow-[0_10px_28px_rgba(23,55,113,0.18)] backdrop-blur-md [text-shadow:0_1px_2px_rgba(23,55,113,0.45)] sm:px-14 sm:text-2xl">
              event has started
            </p>
          ) : (
            // Tabular figures on purpose: without them the seconds digit
            // changes width every tick and the whole pane jitters.
            <p className="rounded-control border border-white/65 bg-white/15 px-5 py-4 text-center font-body text-sm tracking-body text-white tabular-nums uppercase shadow-[0_10px_28px_rgba(23,55,113,0.18)] backdrop-blur-md [text-shadow:0_1px_2px_rgba(23,55,113,0.45)] sm:px-14 sm:text-2xl">
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
