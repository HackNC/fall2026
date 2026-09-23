"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  pctOfHeight,
  ScreenFooter,
  ScreenTitleBar,
} from "@/components/CommitteeScreen";
import { committeeLabel, type TeamMember } from "@/data/teamMembers";

type MemberDetailProps = {
  member: TeamMember;
  onBack: () => void;
  /** Omitted for a committee with no list to switch to. */
  onViewCommittee?: () => void;
};

/*
 * Proportions measured off the director mockup, as percentages of the console
 * window (see the note in CommitteeScreen for why vertical values are written
 * as percentages of width):
 *
 *   photo   42% wide, 531x484, starting 7.2% in and 17.5% down
 *   text    the column to its right, name and role centred over it, the
 *           facts left-aligned beneath
 */

/** One director's card: their photo, their details, and the way back. */
export default function MemberDetail({
  member,
  onBack,
  onViewCommittee,
}: MemberDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus();
  }, [member]);

  return (
    <div className="flex h-full min-h-0 flex-col motion-safe:animate-channel-open">
      <ScreenTitleBar title={committeeLabel(member.committee)} />

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          /*
            No padding on this row, on purpose: every percentage below is a
            share of the console window, and padding here would shrink the box
            they resolve against. The inset is a margin on the photo instead.
          */
          className="flex max-[649px]:flex-col max-[649px]:items-center max-[649px]:gap-4 max-[649px]:px-5"
          style={{ marginTop: pctOfHeight(2.9) }}
        >
          <div className="ml-[7.2%] w-[42%] shrink-0 max-[649px]:mx-0 max-[649px]:w-[11rem]">
            <div className="relative aspect-[531/484] w-full overflow-hidden rounded-[7%] bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt=""
                  fill
                  sizes="(min-width: 650px) 42vw, 11rem"
                  className="object-cover"
                />
              ) : (
                <span className="grid size-full place-items-center px-2 text-center font-accent text-body tracking-title text-ink/45 lowercase">
                  photo coming soon
                </span>
              )}
            </div>
          </div>

          {/*
            55.2%..90% of the window. Type is in `cqw`, 1% of the window's
            width. The margins inside are not: a percentage margin resolves
            against this column's width (34.8% of the window), so 1% of one is
            0.526% of the window's height.
          */}
          <dl className="ml-[6%] w-[34.8%] shrink-0 pt-[4.36%] font-accent tracking-body text-ink max-[649px]:mx-0 max-[649px]:w-full max-[649px]:pt-0">
            <dt className="sr-only">Name</dt>
            <dd className="text-center text-[2.45cqw] font-bold lowercase max-[649px]:text-[1.1rem]">
              {member.name.split(" ")[0]}
            </dd>

            <dt className="sr-only">Role</dt>
            <dd className="mt-[3.49%] text-center text-[2.37cqw] lowercase max-[649px]:mt-[3%] max-[649px]:text-[0.9rem]">
              {member.role}
            </dd>

            {member.year ? (
              <div className="mt-[9.82%] text-[2.1cqw] max-[649px]:mt-[7%] max-[649px]:text-[0.85rem]">
                <dt className="inline font-bold lowercase">year: </dt>
                <dd className="inline lowercase">{member.year}</dd>
              </div>
            ) : null}

            {member.majors ? (
              <div className="mt-[5.54%] text-[2.1cqw] max-[649px]:mt-[4%] max-[649px]:text-[0.85rem]">
                <dt className="inline font-bold lowercase">major(s): </dt>
                <dd className="inline lowercase">{member.majors}</dd>
              </div>
            ) : null}

            {member.funFact ? (
              <div className="mt-[3.24%] text-[2.1cqw] max-[649px]:mt-[4%] max-[649px]:text-[0.85rem]">
                <dt className="inline font-bold lowercase">fun fact: </dt>
                <dd className="inline">{member.funFact}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <ScreenFooter
          backRef={backRef}
          onBack={onBack}
          actionLabel={onViewCommittee ? "View Committee Members" : undefined}
          onAction={onViewCommittee}
        />
      </div>
    </div>
  );
}
