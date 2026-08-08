"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { glossyPill } from "@/components/glossyPill";
import type { TeamMember } from "@/data/teamMembers";

type MemberDetailProps = {
  member: TeamMember;
  onBack: () => void;
};

/**
 * A single member's channel.
 *
 * This replaces the grid inside the same window rather than floating over it,
 * which is what the mockup shows — so it is a view swap, not a dialog, and
 * deliberately carries no `role="dialog"` or focus trap.
 */
export default function MemberDetail({ member, onBack }: MemberDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  // Opening a channel takes focus with it; the tile that was activated no
  // longer exists, so leaving focus behind would drop it onto the body.
  useEffect(() => {
    backRef.current?.focus();
  }, [member]);

  return (
    <div className="motion-safe:animate-channel-open">
      <button
        ref={backRef}
        type="button"
        onClick={onBack}
        className={glossyPill("pressed", "cursor-pointer")}
      >
        back
      </button>

      <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-12">
        <div className="relative aspect-3/4 overflow-hidden rounded-[10px] bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]">
          {member.image ? (
            <Image
              src={member.image}
              alt=""
              fill
              sizes="(min-width: 640px) 18rem, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="grid size-full place-items-center font-body text-sm tracking-[0.05em] text-ink/50">
              member pic
            </span>
          )}
        </div>

        <div className="font-body tracking-[0.05em] text-ink">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {member.name}
          </h2>
          <p className="mt-1 text-center text-base sm:text-lg">{member.role}</p>
          <p className="mt-8 max-w-[34rem] text-base font-bold sm:text-lg">
            {member.bio}
          </p>
        </div>
      </div>

      {/*
        Committee tag, bleeding to the window's left edge the way the site
        footer's "find us here" band does. The negative margins cancel the
        window padding, so they track it if that padding ever changes.
      */}
      <p className="mt-10 -ml-6 w-[70%] max-w-[22rem] rounded-r-[10px] bg-linear-to-r from-[#7e9dcb] to-[#a5bddf] py-2.5 pr-6 pl-6 font-title text-lg tracking-[0.05em] text-white lowercase sm:-ml-10 sm:pl-10 sm:text-xl">
        {member.committee}
      </p>
    </div>
  );
}
