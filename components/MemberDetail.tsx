"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScreenFooter, ScreenTitleBar } from "@/components/CommitteeScreen";
import type { TeamMember } from "@/data/teamMembers";

type MemberDetailProps = {
  member: TeamMember;
  onBack: () => void;
  onViewCommittee: () => void;
};

/**
 * A director's screen: photo on the left, details on the right, under the
 * committee title bar.
 *
 * This replaces the grid inside the same window rather than floating over it,
 * which is what the mockup shows — so it is a view swap, not a dialog, and
 * deliberately carries no `role="dialog"` or focus trap. The SELECTION menu is
 * the one thing here that *is* a dialog.
 */
export default function MemberDetail({
  member,
  onBack,
  onViewCommittee,
}: MemberDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  // Opening a channel takes focus with it; the tile that was activated no
  // longer exists, so leaving focus behind would drop it onto the body.
  useEffect(() => {
    backRef.current?.focus();
  }, [member]);

  return (
    <div className="motion-safe:animate-channel-open">
      <ScreenTitleBar committee={member.committee} />

      <div className="mt-6 grid gap-8 sm:mt-8 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-inset bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]">
          {member.image ? (
            <Image
              src={member.image}
              alt=""
              fill
              sizes="(min-width: 640px) 16rem, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="grid size-full place-items-center font-body text-caption tracking-body text-ink/50">
              member pic
            </span>
          )}
        </div>

        {/*
          Each row is optional so a half-filled member still reads correctly —
          the roster is being written after this screen, not before it.
        */}
        <dl className="font-body tracking-body text-ink">
          <dt className="sr-only">Name</dt>
          <dd className="text-center font-title text-section tracking-title text-royal lowercase">
            {member.name}
          </dd>

          <dt className="sr-only">Role</dt>
          <dd className="mt-2 text-center text-body font-bold lowercase">
            {member.role}
          </dd>

          {member.year ? (
            <div className="mt-7 flex gap-1.5 text-body">
              <dt className="shrink-0 font-bold lowercase">year:</dt>
              <dd className="lowercase">{member.year}</dd>
            </div>
          ) : null}

          {member.majors ? (
            <div className="mt-3 flex gap-1.5 text-body">
              <dt className="shrink-0 font-bold lowercase">major(s):</dt>
              <dd className="lowercase">{member.majors}</dd>
            </div>
          ) : null}

          {member.funFact ? (
            <div className="mt-3 flex gap-1.5 text-body">
              <dt className="shrink-0 font-bold lowercase">fun fact:</dt>
              <dd className="max-w-[30rem]">{member.funFact}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <ScreenFooter
        backRef={backRef}
        onBack={onBack}
        actionLabel="View Committee Members"
        onAction={onViewCommittee}
      />
    </div>
  );
}
