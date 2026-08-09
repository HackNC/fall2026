"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import MemberDetail from "@/components/MemberDetail";
import { committeeNames, teamMembers } from "@/data/teamMembers";

/**
 * Same Figma chrome as glossyPill's `royal` variant, reshaped into a square
 * channel tile: the white reflection sweep over the royal gradient, plus the
 * bevel insets. Spelled out in full because Tailwind scans this file as plain
 * text — see the note in components/glossyPill.ts.
 *
 * The raise is duplicated onto focus-visible so the tiles react the same way
 * whether they are reached by pointer or by keyboard.
 *
 * The raise fires on `group-hover/tile`, never plain `hover`: a hover that
 * translates the hovered element moves it out from under the pointer, which
 * ends the hover, which drops it back — an infinite oscillation at every edge.
 * The static <li> owns the hover instead, so the trigger area never moves. The
 * group is *named* because the window is an ancestor group too, and a bare
 * `group-hover` would raise every tile whenever the window was hovered.
 * focus-visible stays unqualified — focus is not position-dependent.
 */
const channelTile =
  "relative block aspect-square w-full overflow-hidden rounded-[10px] border border-royal/30 " +
  "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_55%),linear-gradient(to_bottom,#1554C9_5%,rgba(244,255,254,0.95)_100%)] " +
  "shadow-[0_4px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_4px_0_rgba(255,255,255,0.25)] " +
  "transition-[transform,box-shadow] duration-200 ease-out " +
  "group-hover/tile:-translate-y-2.5 group-hover/tile:scale-[1.06] group-hover/tile:shadow-[0_16px_22px_rgba(23,55,113,0.45)] " +
  "focus-visible:-translate-y-2.5 focus-visible:scale-[1.06] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

/**
 * The Wii's bottom menu buttons: stadium-shaped, large, and glossy.
 *
 * The gloss is a bright white sweep over the top 45% ending in a hard cutoff
 * at 46% rather than a soft fade — that hard edge is what separates the
 * console's look from a generic gradient — layered over a cool silver base.
 */
const wiiButton =
  "relative inline-flex items-center justify-center rounded-full border border-royal/25 " +
  "min-w-[11rem] px-10 py-4 text-center font-title text-xl tracking-[0.05em] text-ink lowercase " +
  "sm:min-w-[15rem] sm:px-14 sm:py-5 sm:text-2xl " +
  "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0)_46%),linear-gradient(to_bottom,#FBFDFF_0%,#DCE7F5_55%,#C2D3EA_100%)] " +
  "shadow-[0_6px_10px_rgba(23,55,113,0.35),inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(21,84,201,0.18)] " +
  "transition duration-150 hover:brightness-[1.04] active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

const rows = committeeNames.map((committee) => teamMembers[committee]);

function tileId(row: number, column: number) {
  return `team-tile-${row}-${column}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MeetOurTeam() {
  const [selected, setSelected] = useState<{
    row: number;
    column: number;
  } | null>(null);
  // Roving tabindex position: the grid is one tab stop, arrow keys move within
  // it. Same contract as the Schedule day tabs, extended to two axes.
  const [active, setActive] = useState({ row: 0, column: 0 });
  const restoreFocusRef = useRef(false);

  const selectedMember = selected ? rows[selected.row][selected.column] : null;

  // Returning from a channel puts focus back on the tile that opened it.
  useEffect(() => {
    if (selectedMember || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    document.getElementById(tileId(active.row, active.column))?.focus();
  }, [selectedMember, active]);

  function openChannel(row: number, column: number) {
    setActive({ row, column });
    setSelected({ row, column });
  }

  function closeChannel() {
    restoreFocusRef.current = true;
    setSelected(null);
  }

  function handleTileKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    row: number,
    column: number
  ) {
    let next: { row: number; column: number } | undefined;

    if (event.key === "ArrowRight") {
      next = { row, column: (column + 1) % rows[row].length };
    } else if (event.key === "ArrowLeft") {
      next = {
        row,
        column: (column - 1 + rows[row].length) % rows[row].length,
      };
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const step = event.key === "ArrowDown" ? 1 : -1;
      const nextRow = (row + step + rows.length) % rows.length;
      // Rows are uneven, so hold the column where possible and clamp to the
      // end of a shorter row rather than wrapping to somewhere unrelated.
      next = {
        row: nextRow,
        column: Math.min(column, rows[nextRow].length - 1),
      };
    } else if (event.key === "Home") {
      next = { row: 0, column: 0 };
    } else if (event.key === "End") {
      next = { row: rows.length - 1, column: rows[rows.length - 1].length - 1 };
    }

    if (!next) return;

    event.preventDefault();
    setActive(next);
    document.getElementById(tileId(next.row, next.column))?.focus();
  }

  function handleWindowKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && selectedMember) {
      event.preventDefault();
      closeChannel();
    }
  }

  return (
    <section aria-labelledby="team-heading" className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6">
        {/*
          Three nested elements, each doing exactly one job:

          1. the hover target, which never moves, so the raise cannot pull the
             window out from under the pointer and start an oscillation;
          2. the idle drift, on its own node because a running transform
             animation overrides a transform utility on the same element;
          3. the raise itself, fired from the group above.

          Tiles below are built the same way.
        */}
        <div className="group/window">
          <div className="motion-safe:animate-window-float">
            <div
              onKeyDown={handleWindowKeyDown}
              className="relative rounded-[28px] border border-white/70 bg-white/95 px-6 py-8 shadow-[0_10px_30px_rgba(23,55,113,0.35)] transition-[transform,box-shadow] duration-300 ease-out group-hover/window:-translate-y-1.5 group-hover/window:shadow-[0_18px_40px_rgba(23,55,113,0.45)] sm:px-10 sm:py-12"
            >
              {selectedMember && selected ? (
                <>
                  <h1 id="team-heading" className="sr-only">
                    Meet Our Team
                  </h1>
                  <MemberDetail member={selectedMember} onBack={closeChannel} />
                </>
              ) : (
                <>
                  <h1
                    id="team-heading"
                    className="text-center font-title text-3xl tracking-[0.05em] text-royal sm:text-6xl"
                  >
                    Meet Our Team
                  </h1>

                  <div className="mt-8 sm:mt-12">
                    {committeeNames.map((committee, row) => (
                      <section
                        key={committee}
                        aria-label={committee}
                        className="mt-8 first:mt-0"
                      >
                        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-7 sm:gap-4">
                          {teamMembers[committee].map((member, column) => (
                            <li key={member.name} className="group/tile">
                              <div
                                className="motion-safe:animate-channel-idle"
                                // Staggered so the row breathes as a wave instead
                                // of pulsing in lockstep. Wraps only the tile, so
                                // the name below stays still and readable.
                                style={{
                                  animationDelay: `${(row * 7 + column) * 180}ms`,
                                }}
                              >
                                <button
                                  id={tileId(row, column)}
                                  type="button"
                                  aria-label={`${member.name}, ${member.role}`}
                                  tabIndex={
                                    active.row === row &&
                                    active.column === column
                                      ? 0
                                      : -1
                                  }
                                  onClick={() => openChannel(row, column)}
                                  onFocus={() => setActive({ row, column })}
                                  onKeyDown={(event) =>
                                    handleTileKeyDown(event, row, column)
                                  }
                                  className={channelTile}
                                >
                                  {member.image ? (
                                    <Image
                                      src={member.image}
                                      alt=""
                                      fill
                                      sizes="(min-width: 640px) 10rem, 25vw"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="grid size-full place-items-center font-title text-base text-white [text-shadow:0_2px_4px_rgba(23,55,113,0.65)] sm:text-2xl"
                                    >
                                      {initials(member.name)}
                                    </span>
                                  )}
                                </button>
                              </div>
                              <p className="mt-1.5 truncate text-center font-body text-[0.7rem] tracking-[0.05em] text-ink sm:text-xs">
                                {member.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p
                          aria-hidden="true"
                          className="mt-2 font-body text-sm tracking-[0.05em] text-ink/70 lowercase"
                        >
                          {committee}
                        </p>
                      </section>
                    ))}
                  </div>

                  <p className="mt-10 text-center font-body text-base tracking-[0.05em] text-ink/60 motion-safe:animate-wii-breathe">
                    click to explore
                  </p>
                </>
              )}

              {/* Bottom-left and bottom-right, as on the console. */}
              <div className="mt-10 flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className={`${wiiButton} motion-safe:animate-wii-breathe`}
                >
                  menu
                </Link>
                <button
                  type="button"
                  onClick={() => openChannel(active.row, active.column)}
                  className={`${wiiButton} cursor-pointer motion-safe:animate-wii-breathe`}
                >
                  start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
