"use client";

import { useEffect, useRef } from "react";
import { ScreenFooter, ScreenTitleBar } from "@/components/CommitteeScreen";
import {
  committeeLabel,
  teamMembers,
  type Committee,
} from "@/data/teamMembers";

type RosterScreenProps = {
  onBack: () => void;
};

/*
 * The roster's three columns, top to bottom. Set by hand rather than left to
 * flow: the small directors-only teams stack under Logistics, which keeps the
 * three columns close in height.
 */
const columns: Committee[][] = [
  ["Leads", "Development"],
  ["Logistics", "SocialMedia", "Finance"],
  ["Outreach", "Graphics"],
];

/**
 * The whole team on one screen, opened from the console's Menu button: every
 * committee's directors and members, by name.
 *
 * Each committee is a block — its name, its directors, then its members in a
 * lighter weight, each name on one line. The three columns share the width
 * evenly, and the whole is centred in the same space as the other lists; the
 * bottom padding clears the back button, as there.
 */
export default function RosterScreen({ onBack }: RosterScreenProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  // The Menu button that opened this screen is gone, so focus is placed
  // deliberately rather than falling back to the body.
  useEffect(() => {
    backRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col motion-safe:animate-channel-open">
      <ScreenTitleBar title="Our Team" />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center pb-[4.1%] max-[649px]:py-5">
          <div className="grid w-[86%] grid-cols-3 items-start gap-x-[4%] max-[649px]:w-full max-[649px]:grid-cols-2 max-[649px]:gap-x-4 max-[649px]:px-5">
            {columns.map((column) => (
              <div
                key={column.join()}
                className="flex flex-col gap-[2.4cqw] max-[649px]:gap-4"
              >
                {column.map((committee) => (
                  <CommitteeBlock key={committee} committee={committee} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <ScreenFooter backRef={backRef} onBack={onBack} />
      </div>
    </div>
  );
}

/** One committee: its name, its directors, then its members. */
function CommitteeBlock({ committee }: { committee: Committee }) {
  const people = teamMembers[committee];
  const directors = people.filter((person) => person.isDirector);
  const members = people.filter((person) => !person.isDirector);

  return (
    <section
      aria-label={committeeLabel(committee)}
      className="text-center font-accent leading-snug text-ink"
    >
      <h2 className="mb-[0.6cqw] text-[2.2cqw] font-bold tracking-[0.06em] max-[649px]:text-[0.8rem]">
        {committeeLabel(committee)}
      </h2>
      <ul className="text-[1.85cqw] whitespace-nowrap max-[649px]:text-[0.72rem]">
        {directors.map((person) => (
          <li key={person.name} className="font-medium">
            {person.name}
          </li>
        ))}
        {members.map((person) => (
          <li key={person.name} className="text-ink/65">
            {person.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
