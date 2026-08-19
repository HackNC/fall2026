"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { glossyPill } from "@/components/glossyPill";
import type { Committee, TeamMember } from "@/data/teamMembers";

type CommitteeScreenProps = {
  committee: Committee;
  members: TeamMember[];
  onBack: () => void;
  onViewDirectors: () => void;
};

/**
 * A committee's roster screen: the blue title bar with the committee name,
 * then everyone on it as a photo and a name.
 *
 * Directors get their own screen (MemberDetail); this one is the flat list,
 * so the tiles here are not interactive.
 */
export default function CommitteeScreen({
  committee,
  members,
  onBack,
  onViewDirectors,
}: CommitteeScreenProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  // The control that opened this screen is gone, so focus has to be placed
  // somewhere deliberate rather than falling back to the body.
  useEffect(() => {
    backRef.current?.focus();
  }, [committee]);

  return (
    <div className="flex h-full min-h-0 flex-col motion-safe:animate-channel-open">
      <ScreenTitleBar committee={committee} variant="committee" />

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-2 pt-3 min-[391px]:px-5 min-[391px]:pt-4 min-[645px]:px-8 min-[645px]:pb-3 min-[645px]:pt-5 lg:px-10 lg:pb-4 lg:pt-6">
        {members.length === 0 ? (
          <p className="grid min-h-[11rem] place-items-center text-center font-title text-section tracking-title text-royal lowercase min-[645px]:min-h-[14rem]">
            coming soon
          </p>
        ) : (
          <ul className="mt-1.5 flex flex-wrap justify-center gap-3.5 min-[481px]:mt-2 min-[481px]:gap-4.5 min-[645px]:mt-3 min-[645px]:gap-7 lg:gap-8">
            {members.map((member) => (
              <li
                key={member.name}
                className="w-[5.8rem] min-[481px]:w-[6.5rem] min-[645px]:w-[8rem] lg:w-[8.75rem]"
              >
                <div className="relative aspect-square overflow-hidden rounded-inset bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      sizes="9rem"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center px-1 text-center font-title text-caption tracking-title text-ink/45 lowercase">
                      photo coming soon
                    </span>
                  )}
                </div>
                <p className="mt-3 truncate text-center font-body text-body font-bold tracking-body text-ink">
                  {member.name}
                </p>
              </li>
            ))}
          </ul>
        )}

        <ScreenFooter
          className="mt-auto pt-4 min-[645px]:pt-6"
          backRef={backRef}
          onBack={onBack}
          actionLabel="View Directors"
          onAction={onViewDirectors}
        />
      </div>
    </div>
  );
}

/**
 * Shared chrome for both member screens.
 *
 * Two shapes from the mockup, one component. The director screen runs the blue
 * across the full width with the committee name to the right; the committee
 * screen shortens it into a tab so "Committee Members" can sit beside it on the
 * white. Either way the corner where blue meets white is rounded away, which is
 * the detail that makes it read as a window header rather than a coloured strip.
 *
 * Negative margins cancel the window's padding so the bar bleeds to its edges,
 * and they track that padding if it ever changes.
 */
export function ScreenTitleBar({
  committee,
  variant = "director",
}: {
  committee: Committee;
  variant?: "director" | "committee";
}) {
  const name = (
    <span className="font-title text-page tracking-[0.28em] text-white [text-shadow:0_2px_6px_rgba(23,55,113,0.55)]">
      {committee}
    </span>
  );

  if (variant === "committee") {
    return (
      <div>
        <div className="rounded-t-window bg-cornflower px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {name}
            <p className="font-body text-body font-bold tracking-body text-white [text-shadow:0_1px_4px_rgba(23,55,113,0.45)]">
              Committee Members
            </p>
          </div>
        </div>
        <div className="-mt-5 h-5 rounded-tl-[2.5rem] bg-white" />
      </div>
    );
  }

  return (
    <div>
      <p className="rounded-t-window bg-cornflower px-4 py-3 text-right sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        {name}
      </p>
      {/* Curves the white content up into the blue on the left. */}
      <div className="-mt-5 h-5 rounded-tl-[2.5rem] bg-white" />
    </div>
  );
}

/**
 * Shared bottom bar: a back arrow on the left, the cross-navigation button on
 * the right. Mirrors the console's own bottom row.
 */
export function ScreenFooter({
  backRef,
  onBack,
  actionLabel,
  onAction,
  className = "",
}: {
  backRef?: React.RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  actionLabel: string;
  onAction: () => void;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-2.5 min-[481px]:grid-cols-2 min-[481px]:gap-3 min-[645px]:flex min-[645px]:gap-6 ${className}`}
    >
      {/*
        Not a pill: the mockup's back control is a bare icon over a small
        label, tucked into the window's bottom-left corner.
      */}
      <button
        ref={backRef}
        type="button"
        onClick={onBack}
        className="flex shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-card px-2 py-1 text-ink transition hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
      >
        <BackIcon />
        <span className="font-body text-caption tracking-body">Back</span>
      </button>

      {/* The action fills the remaining width, as in the mockup. */}
      <button
        type="button"
        onClick={onAction}
        className={glossyPill(
          "pressed",
          "w-full min-w-0 cursor-pointer rounded-full py-3 normal-case"
        )}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
    </svg>
  );
}
