"use client";

import { useState, type KeyboardEvent } from "react";
import { User } from "lucide-react";
import {
  committeeNames,
  teamMembers,
  type Committee,
} from "@/data/teamMembers";

export default function BoardMembers() {
  const [activeCommittee, setActiveCommittee] = useState<Committee>(
    committeeNames[0]
  );

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % committeeNames.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + committeeNames.length) % committeeNames.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = committeeNames.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextCommittee = committeeNames[nextIndex];
    setActiveCommittee(nextCommittee);
    document.getElementById(`tab-${nextCommittee.toLowerCase()}`)?.focus();
  }

  return (
    <section
      aria-labelledby="board-heading"
      className="border-t-2 border-foreground py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Meet the team
        </p>
        <h2
          id="board-heading"
          className="mt-4 font-display text-4xl leading-none font-black tracking-[-0.04em] text-accent uppercase sm:text-6xl"
        >
          Board Members + Committees
        </h2>

        <div
          role="tablist"
          aria-label="Board committees"
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-foreground/30 sm:gap-x-8"
        >
          {committeeNames.map((committee, index) => {
            const isActive = committee === activeCommittee;

            return (
              <button
                key={committee}
                id={`tab-${committee.toLowerCase()}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${committee.toLowerCase()}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveCommittee(committee)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`-mb-px cursor-pointer border-b-2 px-1 py-4 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground hover:border-foreground"
                }`}
              >
                {committee}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${activeCommittee.toLowerCase()}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCommittee.toLowerCase()}`}
          className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-10"
        >
          {teamMembers[activeCommittee].map((member) => (
            <article
              key={member.name}
              className="flex basis-[calc(50%-0.75rem)] flex-col items-center text-center"
            >
              <div className="flex size-28 items-center justify-center rounded-full border-2 border-foreground sm:size-32">
                <User
                  aria-hidden="true"
                  className="size-14 text-accent sm:size-16"
                  strokeWidth={1.25}
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-[0.65rem] tracking-[0.14em] text-accent uppercase">
                {member.committee}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
