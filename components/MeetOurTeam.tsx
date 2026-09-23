"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import CommitteeScreen from "@/components/CommitteeScreen";
import MemberDetail from "@/components/MemberDetail";
import RosterScreen from "@/components/RosterScreen";
import SelectionMenu from "@/components/SelectionMenu";
import {
  committeeLabel,
  committeeNames,
  hasCommittee,
  teamMembers,
  type Committee,
  type TeamMember,
} from "@/data/teamMembers";

/*
 * The console screen itself: the Figma export (public/about-components/
 * "wii screen bg.svg"), a white rounded panel with its drop shadow baked in.
 *
 * Nine-sliced rather than stretched so the 100px corner radius holds at any
 * size while the flat white between corners stretches. The slice is the
 * radius plus the 9px the shadow occupies. `border-0` keeps it out of layout:
 * border-image paints without reserving space.
 */
const screenStyle = {
  borderImageSource: 'url("/about-components/wii screen bg.svg")',
  borderImageSlice: "120 fill",
  /*
    A variable so it can shrink on a phone: nine-slice corners paint at this
    width whatever the element's size, and a flat 120px turned a ~295px
    window into a pill.
  */
  borderImageWidth: "var(--screen-slice)",
  borderImageRepeat: "stretch",
} as const;

/*
 * The console's bottom buttons are the Figma exports, gloss and label baked
 * in, so this is only a hit target around the artwork: no background, border
 * or type of its own to fight it. The width is the share of the screen each
 * button takes in the mockup, which is what puts the pair at roughly the
 * quarter and three-quarter marks.
 */
const consoleButton =
  "block w-full cursor-pointer rounded-full transition duration-150 " +
  "hover:brightness-[1.04] active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal " +
  "min-[650px]:w-[27.6%]";

/*
 * The Figma's committee icons, by the names graphics gave the exports.
 *
 * Spelled out rather than derived from the committee name: the files do not
 * follow one rule ("dev" for Development, "social media" for SocialMedia), so
 * a mapping that can be read at a glance beats a clever transform that breaks
 * the next time a committee is added.
 *
 * Each export carries its own blue rounded-square background, so the tile
 * below adds no fill of its own — just the lift and the shadow.
 */
const committeeIcons: Record<Committee, string> = {
  Leads: "leads icon.svg",
  Development: "dev icon.svg",
  Logistics: "logistics icon.svg",
  Outreach: "outreach icon.svg",
  Graphics: "graphics icon.svg",
  SocialMedia: "social media icon.svg",
  Finance: "finance icon.svg",
};

// Rounded to the artwork's own corner (rx 20 on a 133 square), so the clip and
// the shadow follow it exactly at any tile size.
//
// The idle bob (channel-idle) animates `transform`, while the hover and focus
// lift below set the separate `translate` and `scale` properties, so the two
// stack instead of one overriding the other — and the transition names those
// two properties, since a `transform` transition would not ease them.
const committeeTile =
  "block aspect-square w-full cursor-pointer overflow-hidden rounded-[15%] " +
  "shadow-[0_4px_10px_rgba(23,55,113,0.3)] " +
  "transition-[translate,scale,box-shadow] duration-200 ease-out " +
  "group-hover/tile:-translate-y-2 group-hover/tile:scale-[1.06] " +
  "group-hover/tile:shadow-[0_16px_22px_rgba(23,55,113,0.4)] " +
  "focus-visible:-translate-y-2 focus-visible:scale-[1.06] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

function directorsOf(committee: Committee) {
  return teamMembers[committee].filter((member) => member.isDirector);
}

function membersOf(committee: Committee) {
  return teamMembers[committee].filter((member) => !member.isDirector);
}

function tileId(index: number) {
  return `committee-tile-${index}`;
}

/**
 * The About page's console.
 *
 * Committee-first, as in the Figma: the home screen is the seven committees,
 * choosing one opens the selection menu scoped to it, and from there you go to
 * that committee's directors or its members. The footer button on either list
 * swaps between the two without leaving the committee, and only directors
 * expand into a card — committee members are a flat list.
 *
 * The teams that are only directors (see `hasCommittee`) are the exception:
 * choosing one goes straight to that list, with no menu and nothing to
 * switch to.
 *
 * The console buttons are two shortcuts: Start opens the co-leads, and Menu
 * opens the full roster, every committee's names on one screen.
 */
export default function MeetOurTeam() {
  /*
   * Which console screen the window is showing. Every committee screen
   * carries its committee, so the journey stays scoped to the one that was
   * chosen and Back always has somewhere definite to return to. The roster
   * spans every committee, so it carries none.
   */
  const [screen, setScreen] = useState<
    | { kind: "home" }
    | { kind: "directors"; committee: Committee }
    | { kind: "member"; committee: Committee; member: TeamMember }
    | { kind: "committee"; committee: Committee }
    | { kind: "roster" }
  >({ kind: "home" });

  /*
   * The selection menu overlays whatever screen is showing, and is always
   * opened for a particular committee — clicking a tile is what opens it, so
   * there is no unscoped state to represent.
   */
  const [menuCommittee, setMenuCommittee] = useState<Committee | null>(null);

  // Roving tabindex over the home tiles: the row is one tab stop, arrow keys
  // move within it. Same contract as the Schedule day tabs.
  const [active, setActive] = useState(0);
  const restoreFocusRef = useRef(false);

  // Coming back from a screen should land focus on the tile that opened it,
  // not at the top of the document.
  useEffect(() => {
    if (screen.kind !== "home" || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    document.getElementById(tileId(active))?.focus();
  }, [screen, active]);

  // A committee with members opens the menu to choose between its two lists;
  // one that is only directors goes straight to them.
  function openMenuFor(index: number) {
    const committee = committeeNames[index];
    setActive(index);
    if (hasCommittee(committee)) {
      setMenuCommittee(committee);
    } else {
      setScreen({ kind: "directors", committee });
    }
  }

  function goHome() {
    restoreFocusRef.current = true;
    setScreen({ kind: "home" });
  }

  function handleTileKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (active + 1) % committeeNames.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (active - 1 + committeeNames.length) % committeeNames.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = committeeNames.length - 1;
    }

    if (next === undefined) return;

    event.preventDefault();
    setActive(next);
    document.getElementById(tileId(next))?.focus();
  }

  // Escape backs out one screen at a time, menu first.
  function handleWindowKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape") return;
    if (menuCommittee) {
      setMenuCommittee(null);
    } else if (screen.kind === "member") {
      setScreen({ kind: "directors", committee: screen.committee });
    } else if (screen.kind !== "home") {
      goHome();
    }
  }

  return (
    <section aria-labelledby="team-heading" className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6">
        <div className="motion-safe:animate-window-float">
          <div
            /*
              From 650px up the window holds the mockup's 1628x1076 aspect, so
              every percentage inside it maps straight onto the Figma. Phones
              keep explicit heights and scroll instead.
            */
            onKeyDown={handleWindowKeyDown}
            style={screenStyle}
            className="relative h-[min(82vh,52rem)] min-h-[34rem] border-0 [--screen-slice:120px] max-[649px]:[--screen-slice:56px] min-[481px]:max-[649px]:h-[min(100vh,66rem)] min-[481px]:max-[649px]:min-h-[54rem] max-[520px]:h-[min(100vh,70rem)] max-[520px]:min-h-[58rem] max-[394px]:h-[min(98vh,60rem)] max-[394px]:min-h-[48rem] max-[360px]:h-[min(100vh,62rem)] max-[360px]:min-h-[50rem] max-[344px]:h-[min(100vh,64rem)] max-[344px]:min-h-[52rem] max-[320px]:h-[min(100vh,66rem)] max-[320px]:min-h-[54rem] min-[650px]:aspect-[1628/1076] min-[650px]:h-auto min-[650px]:min-h-0"
          >
            {/*
              Exactly the white panel, and clipped to it. The export draws the
              panel 9px in from its canvas (the shadow's margin) with 100px
              corners, both against a 120px slice — so both are taken as a
              share of the slice, and stay true when a phone shrinks it.
            */}
            <div className="absolute inset-[calc(var(--screen-slice)*9/120)] flex flex-col overflow-hidden rounded-[calc(var(--screen-slice)*100/120)] [container-type:inline-size]">
              {menuCommittee ? (
                <SelectionMenu
                  committee={menuCommittee}
                  onClose={() => setMenuCommittee(null)}
                  onViewDirectors={() => {
                    setScreen({ kind: "directors", committee: menuCommittee });
                    setMenuCommittee(null);
                  }}
                  onViewCommittee={() => {
                    setScreen({ kind: "committee", committee: menuCommittee });
                    setMenuCommittee(null);
                  }}
                />
              ) : null}

              {/*
                Scrolls inside the window rather than growing it, so a long
                roster on a phone can never push past the console buttons.
                Vertically only: the header bleeds past both sides on purpose,
                and would otherwise make the screen scroll sideways.
              */}
              <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
                {/* The home screen's heading is artwork; the others get this one. */}
                {screen.kind !== "home" ? (
                  <h1 id="team-heading" className="sr-only">
                    Meet Our Team
                  </h1>
                ) : null}

                {screen.kind === "roster" ? (
                  <RosterScreen onBack={goHome} />
                ) : screen.kind === "member" ? (
                  <MemberDetail
                    member={screen.member}
                    onBack={() =>
                      setScreen({
                        kind: "directors",
                        committee: screen.committee,
                      })
                    }
                    onViewCommittee={
                      hasCommittee(screen.committee)
                        ? () =>
                            setScreen({
                              kind: "committee",
                              committee: screen.committee,
                            })
                        : undefined
                    }
                  />
                ) : screen.kind === "directors" ? (
                  <CommitteeScreen
                    committee={screen.committee}
                    members={directorsOf(screen.committee)}
                    label="Directors"
                    onSelect={(member) =>
                      setScreen({
                        kind: "member",
                        committee: screen.committee,
                        member,
                      })
                    }
                    onBack={goHome}
                    {...(hasCommittee(screen.committee)
                      ? {
                          actionLabel: "View Committee Members",
                          onAction: () =>
                            setScreen({
                              kind: "committee",
                              committee: screen.committee,
                            }),
                        }
                      : {})}
                  />
                ) : screen.kind === "committee" ? (
                  <CommitteeScreen
                    committee={screen.committee}
                    members={membersOf(screen.committee)}
                    label="Committee Members"
                    onBack={goHome}
                    actionLabel="View Directors"
                    onAction={() =>
                      setScreen({
                        kind: "directors",
                        committee: screen.committee,
                      })
                    }
                  />
                ) : (
                  <div className="pt-[16.1%] pb-4 max-[649px]:px-5 max-[649px]:pt-6 max-[649px]:pb-2">
                    {/*
                      Artwork, not type: the Figma sets this heading in a face
                      the site does not license, so it ships as the export and
                      the real heading goes to screen readers only. Width is
                      the share of the screen it occupies in the mockup.
                    */}
                    <h1 id="team-heading">
                      <span className="sr-only">Meet Our Team</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/about-components/Meet Our Team text.svg"
                        alt=""
                        className="mx-auto block w-[70.6%]"
                      />
                    </h1>

                    <ul className="mx-auto mt-[7.4%] grid w-[85.1%] grid-cols-7 gap-[2.6%] max-[649px]:mt-7 max-[649px]:flex max-[649px]:w-auto max-[649px]:flex-wrap max-[649px]:justify-center max-[649px]:gap-3">
                      {committeeNames.map((committee, index) => (
                        <li
                          key={committee}
                          className="group/tile max-[649px]:w-[4.5rem]"
                        >
                          <button
                            id={tileId(index)}
                            type="button"
                            tabIndex={active === index ? 0 : -1}
                            aria-haspopup={
                              hasCommittee(committee) ? "dialog" : undefined
                            }
                            aria-label={`${committeeLabel(committee)} committee`}
                            onClick={() => openMenuFor(index)}
                            onFocus={() => setActive(index)}
                            onKeyDown={handleTileKeyDown}
                            className={`${committeeTile} motion-safe:animate-channel-idle`}
                            /*
                              Each tile half a second further into the bob
                              than the last, so the row ripples rather than
                              moving as one. Negative, so every tile is
                              already mid-motion on load.
                            */
                            style={{ animationDelay: `${index * -0.5}s` }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`/about-components/${committeeIcons[committee]}`}
                              alt=""
                              className="block size-full object-cover"
                            />
                          </button>
                          <p className="mt-2 truncate text-center font-accent text-caption font-bold tracking-body text-ink lowercase">
                            {committeeLabel(committee)}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-[4.5%] text-center font-accent text-base tracking-body text-ink/60 motion-safe:animate-wii-breathe max-[649px]:mt-8">
                      click to explore
                    </p>
                  </div>
                )}
              </div>

              {/*
                The console buttons belong to the home screen only: in the
                mockups each overlay fills the window and carries its own
                Back and action pill instead.
              */}
              {screen.kind === "home" ? (
                <div className="mt-auto grid grid-cols-1 gap-2.5 px-4 pb-5 min-[391px]:grid-cols-2 min-[391px]:gap-3 min-[391px]:px-5 min-[391px]:pb-6 min-[650px]:flex min-[650px]:items-center min-[650px]:justify-center min-[650px]:gap-[15.8%] min-[650px]:px-0 min-[650px]:pb-[4.6%]">
                  <button
                    type="button"
                    onClick={() => setScreen({ kind: "roster" })}
                    aria-label="Menu"
                    className={`${consoleButton} motion-safe:animate-wii-breathe`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about-components/menu button.svg"
                      alt=""
                      className="block w-full"
                    />
                  </button>
                  {/*
                    Start always opens the co-leads, whichever tile is
                    highlighted: the natural first stop. The Leads tile takes
                    the highlight, so Back returns focus there.
                  */}
                  <button
                    type="button"
                    onClick={() => {
                      setActive(committeeNames.indexOf("Leads"));
                      setScreen({ kind: "directors", committee: "Leads" });
                    }}
                    aria-label="Start"
                    className={`${consoleButton} motion-safe:animate-wii-breathe`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about-components/start button.svg"
                      alt=""
                      className="block w-full"
                    />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
