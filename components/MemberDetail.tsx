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
    <div className="flex h-full min-h-0 flex-col motion-safe:animate-channel-open">
      <ScreenTitleBar committee={member.committee} />

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-2 pt-3 min-[391px]:px-5 min-[391px]:pt-4 min-[645px]:px-8 min-[645px]:pb-3 min-[645px]:pt-5 lg:px-10 lg:pb-4 lg:pt-6">
        <div className="grid gap-4 min-[481px]:gap-5 min-[645px]:grid-cols-[minmax(0,14rem)_1fr] min-[645px]:gap-8 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12">
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
              <span className="grid size-full place-items-center px-2 text-center font-title text-body tracking-title text-ink/45 lowercase">
                photo coming soon
              </span>
            )}
          </div>

          <dl className="min-w-0 font-body tracking-body text-ink">
            <dt className="sr-only">Name</dt>
            <dd className="text-center font-title text-section tracking-title text-royal lowercase">
              {member.name}
            </dd>

            <dt className="sr-only">Role</dt>
            <dd className="mt-2 text-center text-body font-bold lowercase">
              {member.role}
            </dd>

            {member.year ? (
              <div className="mt-4 flex gap-1.5 text-body max-[390px]:flex-col max-[390px]:gap-0.5 min-[645px]:mt-6">
                <dt className="shrink-0 font-bold lowercase">year:</dt>
                <dd className="lowercase">{member.year}</dd>
              </div>
            ) : null}

            {member.majors ? (
              <div className="mt-2 flex gap-1.5 text-body max-[390px]:flex-col max-[390px]:gap-0.5 min-[645px]:mt-3">
                <dt className="shrink-0 font-bold lowercase">major(s):</dt>
                <dd className="break-words lowercase">{member.majors}</dd>
              </div>
            ) : null}

            {member.funFact ? (
              <div className="mt-2 flex gap-1.5 text-body max-[390px]:flex-col max-[390px]:gap-0.5 min-[645px]:mt-3">
                <dt className="shrink-0 font-bold lowercase">fun fact:</dt>
                <dd className="max-w-[30rem] break-words leading-snug">
                  {member.funFact}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <ScreenFooter
          className="mt-auto pt-3 min-[391px]:pt-5 sm:pt-6"
          backRef={backRef}
          onBack={onBack}
          actionLabel="View Committee Members"
          onAction={onViewCommittee}
        />
      </div>
    </div>
  );
}
