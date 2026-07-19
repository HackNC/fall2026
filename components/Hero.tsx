"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
};

const EVENT_TIMESTAMP = Date.UTC(2026, 9, 9, 4, 0, 0);
const EVENT_DATE = new Date(EVENT_TIMESTAMP);

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
    <section className="min-h-[calc(100svh-5rem)] flex flex-col justify-center max-w-5xl mx-auto lg:px-12">
      <div className="mx-auto max-w-[min(40rem,100%)]">
        <h1 className="text-center text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">
          HACKNC 2026
        </h1>
        <div className="mt-6 text-base sm:text-lg leading-7 text-slate-700">
          <div
            className="text-center md:text-right"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Countdown to October 9, 2026 Eastern Time"
          >
            {timeLeft.hasStarted ? (
              <p className="text-lg sm:text-xl font-medium text-slate-950">
                Event has started
              </p>
            ) : (
              <p className="text-lg sm:text-xl font-medium flex flex-wrap justify-center gap-4 md:justify-end">
                <span>{timeLeft.days} days</span>
                <span>{formatUnit(timeLeft.hours)} hours</span>
                <span>{formatUnit(timeLeft.minutes)} minutes</span>
                <span>{formatUnit(timeLeft.seconds)} seconds</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
