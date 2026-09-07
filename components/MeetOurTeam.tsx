"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import CommitteeScreen from "@/components/CommitteeScreen";
import MemberDetail from "@/components/MemberDetail";
import SelectionMenu from "@/components/SelectionMenu";
import {
  committeeNames,
  teamMembers,
  type Committee,
} from "@/data/teamMembers";

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
  "relative block aspect-square w-full overflow-hidden rounded-card border border-royal/30 " +
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
  "min-w-[7.75rem] px-6 py-3 text-center font-title text-lg tracking-title text-ink lowercase " +
  "md:min-w-[15rem] md:px-14 md:py-5 md:text-2xl " +
  "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0)_46%),linear-gradient(to_bottom,#FBFDFF_0%,#DCE7F5_55%,#C2D3EA_100%)] " +
  "shadow-[0_6px_10px_rgba(23,55,113,0.35),inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(21,84,201,0.18)] " +
  "transition duration-150 hover:brightness-[1.04] active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

/*
 * The main grid is directors only. Everyone else is reached through that
 * committee's screen, which is what "Committee Members" lists, so a person
 * appears in exactly one place.
 *
 * Laid out six to a row rather than one row per committee: with two directors
 * on most committees, the per-committee rows left the grid mostly empty. Each
 * director's committee is still named on their own screen's title bar.
 *
 * `rows` stays a 2-D array so the roving-tabindex handlers below — which index
 * by [row][column] — keep working unchanged.
 */
const COLUMNS = 6;

const directors = committeeNames.flatMap((committee) =>
  teamMembers[committee].filter((member) => member.isDirector)
);

const rows = Array.from(
  { length: Math.ceil(directors.length / COLUMNS) },
  (_, row) => directors.slice(row * COLUMNS, (row + 1) * COLUMNS)
);

const rowStartIndices = rows.reduce<number[]>((acc, row, index) => {
  acc.push((acc[index - 1] ?? 0) + (rows[index - 1]?.length ?? 0));
  return acc;
}, []);

// Nothing announced yet renders as "coming soon" instead of an empty grid.
// The roving-tabindex handlers below all key off `rows`, so they are simply
// unreachable while there are no tiles to focus.
const hasMembers = rows.some((row) => row.length > 0);

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

/*
 * Takes row and column as separate arguments rather than a position object, on
 * purpose.
 *
 * With an object parameter the only call site reads `positionToIndex({ row,
 * column })`, and the production minifier inlines that helper while failing to
 * rename the shorthand properties — it emits `{row, column}` referencing
 * identifiers that no longer exist under minification, so every tile click
 * threw "row is not defined". Dev builds are unminified and never showed it.
 *
 * Scalar arguments leave no object literal to inline, so the bug has nothing
 * to bite on. Keep it this way, and avoid shorthand in anything else small
 * enough for the minifier to inline.
 */
function positionToIndex(row: number, column: number) {
  return rowStartIndices[row] + column;
}

function indexToPosition(index: number) {
  let remaining = index;

  for (let row = 0; row < rows.length; row += 1) {
    const rowLength = rows[row].length;
    if (remaining < rowLength) {
      return { row: row, column: remaining };
    }
    remaining -= rowLength;
  }

  return { row: 0, column: 0 };
}

export default function MeetOurTeam() {
  const [selectedDirectorIndex, setSelectedDirectorIndex] = useState<
    number | null
  >(null);
  // Roving tabindex position: the grid is one tab stop, arrow keys move within
  // it. Same contract as the Schedule day tabs, extended to two axes.
  const [active, setActive] = useState({ row: 0, column: 0 });
  // Which console screen the window is showing. The grid and the member
  // screens swap the window contents; the selection menu overlays them.
  const [screen, setScreen] = useState<
    { kind: "grid" } | { kind: "committee"; committee: Committee }
  >({ kind: "grid" });
  const [menuOpen, setMenuOpen] = useState(false);
  const restoreFocusRef = useRef(false);

  const selectedMember =
    selectedDirectorIndex !== null ? directors[selectedDirectorIndex] : null;
  const isStartScreen =
    screen.kind === "grid" && selectedDirectorIndex === null;
  const currentDirectorIndex = selectedDirectorIndex;
  const isLastDirector =
    hasMembers &&
    currentDirectorIndex !== null &&
    currentDirectorIndex >= directors.length - 1;
  const startDisabled =
    !hasMembers ||
    screen.kind === "committee" ||
    (currentDirectorIndex !== null && isLastDirector);

  // Returning from a channel puts focus back on the tile that opened it.
  useEffect(() => {
    if (selectedMember || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    document.getElementById(tileId(active.row, active.column))?.focus();
  }, [selectedMember, active]);

  function openChannel(row: number, column: number) {
    setActive({ row, column });
    setSelectedDirectorIndex(positionToIndex(row, column));
  }

  function closeChannel() {
    restoreFocusRef.current = true;
    setSelectedDirectorIndex(null);
  }

  function goToStartScreen() {
    setScreen({ kind: "grid" });
    setSelectedDirectorIndex(null);
    setActive({ row: 0, column: 0 });
  }

  function handleStart() {
    if (startDisabled || screen.kind !== "grid") return;

    const nextIndex =
      currentDirectorIndex === null ? 0 : currentDirectorIndex + 1;
    const next = indexToPosition(nextIndex);
    setActive(next);
    setSelectedDirectorIndex(nextIndex);
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
        <div className="motion-safe:animate-window-float">
          <div
            onKeyDown={handleWindowKeyDown}
            className="relative h-[min(82vh,52rem)] min-h-[34rem] rounded-window border border-white/70 bg-white/95 shadow-[0_10px_30px_rgba(23,55,113,0.35)] min-[481px]:max-[649px]:h-[min(100vh,66rem)] min-[481px]:max-[649px]:min-h-[54rem] max-[520px]:h-[min(100vh,70rem)] max-[520px]:min-h-[58rem] max-[394px]:h-[min(98vh,60rem)] max-[394px]:min-h-[48rem] max-[360px]:h-[min(100vh,62rem)] max-[360px]:min-h-[50rem] max-[344px]:h-[min(100vh,64rem)] max-[344px]:min-h-[52rem] max-[320px]:h-[min(100vh,66rem)] max-[320px]:min-h-[54rem] min-[650px]:h-[min(80vh,52rem)] min-[650px]:min-h-[38rem]"
          >
            <div className="flex h-full min-h-0 flex-col gap-5 sm:gap-6 lg:gap-8">
              {menuOpen ? (
                <SelectionMenu
                  viewDirectorsDisabled={isStartScreen}
                  onClose={() => setMenuOpen(false)}
                  onViewDirectors={() => {
                    if (isStartScreen) return;
                    setMenuOpen(false);
                    goToStartScreen();
                  }}
                  onViewCommittee={() => {
                    setMenuOpen(false);
                    setScreen({
                      kind: "committee",
                      committee: selectedMember?.committee ?? committeeNames[0],
                    });
                  }}
                />
              ) : null}

              <div className="min-h-0 flex-1">
                {screen.kind === "committee" ? (
                  <>
                    <h1 id="team-heading" className="sr-only">
                      Meet Our Team
                    </h1>
                    <CommitteeScreen
                      committee={screen.committee}
                      members={teamMembers[screen.committee].filter(
                        (member) => !member.isDirector
                      )}
                      onBack={goToStartScreen}
                      onViewDirectors={goToStartScreen}
                    />
                  </>
                ) : selectedMember ? (
                  <>
                    <h1 id="team-heading" className="sr-only">
                      Meet Our Team
                    </h1>
                    <MemberDetail
                      member={selectedMember}
                      onBack={closeChannel}
                      onViewCommittee={() =>
                        setScreen({
                          kind: "committee",
                          committee: selectedMember.committee,
                        })
                      }
                    />
                  </>
                ) : (
                  <div className="px-5 pb-2 pt-6 sm:px-8 sm:pb-3 sm:pt-8 lg:px-10 lg:pb-4 lg:pt-10">
                    <h1
                      id="team-heading"
                      className="text-center font-title text-page tracking-title text-royal"
                    >
                      Meet Our Team
                    </h1>

                    <div className="mt-6 sm:mt-8 lg:mt-10">
                      {!hasMembers ? (
                        <p className="grid min-h-[14rem] place-items-center text-center font-title text-page tracking-title text-royal lowercase sm:min-h-[18rem]">
                          coming soon
                        </p>
                      ) : (
                        rows.map((rowMembers, row) => (
                          <ul
                            key={row}
                            className="mt-4 grid grid-cols-3 gap-3 first:mt-0 min-[481px]:grid-cols-4 min-[481px]:gap-3.5 min-[645px]:mt-5 min-[645px]:grid-cols-6 min-[645px]:gap-4"
                          >
                            {rowMembers.map((member, column) => (
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
                                        // The top row is above the fold and any
                                        // of its tiles can win LCP depending on
                                        // viewport, so they load eagerly. Not
                                        // `preload`: the docs rule that out
                                        // precisely when the LCP element is
                                        // ambiguous between several images.
                                        loading={row === 0 ? "eager" : "lazy"}
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
                                <p className="mt-1.5 truncate text-center font-body text-caption tracking-body text-ink">
                                  {member.name}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ))
                      )}
                    </div>

                    {hasMembers ? (
                      <p className="mt-8 text-center font-body text-base tracking-body text-ink/60 motion-safe:animate-wii-breathe sm:mt-10">
                        click to explore
                      </p>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Bottom-left and bottom-right, as on the console. */}
              <div className="mt-auto grid grid-cols-1 gap-2.5 px-4 pb-5 min-[391px]:grid-cols-2 min-[391px]:gap-3 min-[391px]:px-5 min-[391px]:pb-6 min-[645px]:flex min-[645px]:items-center min-[645px]:justify-between min-[645px]:gap-4 min-[645px]:px-8 min-[645px]:pb-8 lg:px-10 lg:pb-10">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                  className={`${wiiButton} w-full min-w-0 cursor-pointer motion-safe:animate-wii-breathe min-[645px]:w-auto min-[645px]:min-w-[15rem]`}
                >
                  menu
                </button>
                {/* Nothing to open until the roster lands, so the console's
                    start button is disabled rather than silently inert. */}
                <button
                  type="button"
                  disabled={startDisabled}
                  onClick={handleStart}
                  className={`${wiiButton} w-full min-w-0 cursor-pointer motion-safe:animate-wii-breathe disabled:cursor-not-allowed disabled:opacity-50 disabled:motion-safe:animate-none min-[645px]:w-auto min-[645px]:min-w-[15rem]`}
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
