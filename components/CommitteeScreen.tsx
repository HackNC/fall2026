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
    <div className="motion-safe:animate-channel-open">
      <ScreenTitleBar committee={committee} variant="committee" />

      {members.length === 0 ? (
        <p className="grid min-h-[14rem] place-items-center text-center font-title text-section tracking-title text-royal lowercase">
          coming soon
        </p>
      ) : (
        <ul className="mt-8 flex flex-wrap gap-8 sm:mt-10 sm:gap-12">
          {members.map((member) => (
            <li key={member.name} className="w-[7.5rem] sm:w-[9rem]">
              <div className="relative aspect-square overflow-hidden rounded-inset bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="9rem"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <p className="mt-3 truncate text-center font-body text-body font-bold tracking-body text-ink">
                {member.name}
              </p>
            </li>
          ))}
        </ul>
      )}

      <ScreenFooter
        backRef={backRef}
        onBack={onBack}
        actionLabel="View Directors"
        onAction={onViewDirectors}
      />
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
      <div className="-mx-6 -mt-8 flex items-start sm:-mx-10 sm:-mt-12">
        <p className="w-[62%] rounded-tl-window rounded-br-[2.5rem] bg-cornflower px-6 py-4 sm:px-10 sm:py-5">
          {name}
        </p>
        <p className="ml-auto px-6 py-5 font-body text-body font-bold tracking-body text-ink sm:px-10 sm:py-6">
          Committee Members
        </p>
      </div>
    );
  }

  return (
    <div className="-mx-6 -mt-8 sm:-mx-10 sm:-mt-12">
      <p className="rounded-t-window bg-cornflower px-6 py-4 text-right sm:px-10 sm:py-5">
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
}: {
  backRef?: React.RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="mt-10 -mb-2 flex items-center gap-4 sm:gap-6">
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
          "w-full cursor-pointer rounded-full py-3 normal-case"
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
