"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  committeeLabel,
  type Committee,
  type TeamMember,
} from "@/data/teamMembers";

type CommitteeScreenProps = {
  committee: Committee;
  members: TeamMember[];
  /** Sits opposite the committee name on the title bar. */
  label: string;
  /** Omitted for a committee with no list to switch to. */
  actionLabel?: string;
  onAction?: () => void;
  onBack: () => void;
  /** Supplied on the directors list, where a tile opens that person's card. */
  onSelect?: (member: TeamMember) => void;
};

/*
 * Proportions measured off the two overlay mockups, as percentages of the
 * console window. The window carries the mockup's 1.512 aspect from 650px up,
 * so a width percentage and a height percentage are interchangeable through
 * that constant — which is why the vertical values below are written as
 * percentages of width (CSS resolves margin and padding percentages against
 * width, never height).
 *
 * Type is sized in `cqw` — 1% of the console window's width — because the
 * screen is a container query context. That makes every size literally the
 * percentage measured off the mockup, with no viewport arithmetic in between.
 *
 *   header          full width, its own 1292x126 aspect -> 14.6% of height
 *   header name     up to 5.37cqw, centred in its anchor (see below)
 *   director tile   24% wide, square, 10% gap, row centred
 *   member name     3.1cqw, on columns 22.5% apart (see the list)
 *   action pill     71.9% wide, starting 23.5% in, 3.2% of height off the
 *                   bottom
 *   back control    flush into the window's bottom-left corner
 */
const HEIGHT_TO_WIDTH = 1 / 1.512;

/** A percentage of the window's height, expressed as one of its width. */
export const pctOfHeight = (v: number) =>
  `${(v * HEIGHT_TO_WIDTH).toFixed(2)}%`;

/**
 * A committee's roster screen, used twice: for its directors, where a tile
 * opens that person's card, and for its members, where it is a flat list.
 */
export default function CommitteeScreen({
  committee,
  members,
  label,
  actionLabel,
  onAction,
  onBack,
  onSelect,
}: CommitteeScreenProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  /*
   * The two lists are drawn differently. Directors are never more than one
   * row — every committee has one or two — so they are large photo tiles that
   * open a card. Committee members have no photos yet, so they are names.
   */
  const directors = Boolean(onSelect);

  // The control that opened this screen is gone, so focus has to be placed
  // somewhere deliberate rather than falling back to the body.
  useEffect(() => {
    backRef.current?.focus();
  }, [committee]);

  return (
    <div className="flex h-full min-h-0 flex-col motion-safe:animate-channel-open">
      <ScreenTitleBar committee={committee} label={label} />

      <div className="flex min-h-0 flex-1 flex-col">
        {members.length === 0 ? (
          <p className="grid flex-1 place-items-center px-4 text-center font-accent text-section tracking-title text-ink lowercase">
            coming soon
          </p>
        ) : !directors ? (
          /*
            Committee members have no photos yet, so their list is names
            alone, on the committee mockup's columns: three to a row, centred
            at 27.5%, 50% and 72.5% of the window (22.5% apart), and set to
            its "name" — medium, 3.1cqw, lightly tracked.

            Real names run to 40% of the window at that size, far wider than
            a column, so each is stacked deliberately — first name over the
            rest — rather than left to wrap wherever it happens to break. Every
            name is then two lines, and the rows stay even.

            The block is centred in the same space as the directors' row; the
            bottom padding clears the back button, as there.
          */
          <ul className="mx-auto flex w-[67.5%] flex-1 flex-wrap content-center justify-center gap-y-[4cqw] pb-[4.1%] max-[649px]:w-full max-[649px]:gap-y-3 max-[649px]:px-5">
            {members.map((member) => (
              <li
                key={member.name}
                className="w-1/3 text-center font-accent text-[3.1cqw] leading-tight font-medium tracking-[0.08em] whitespace-nowrap text-ink max-[649px]:w-1/2 max-[649px]:text-[0.85rem]"
              >
                <span className="block">{firstName(member.name)}</span>
                <span className="block">{surname(member.name)}</span>
              </li>
            ))}
          </ul>
        ) : (
          /*
            The directors: one row, drawn large. The bottom padding is how far
            the back button rises above the footer row, so the row centres
            between the header and the top of the back button rather than the
            pill. The top padding then nudges it down a touch, by eye.
          */
          <ul className="flex flex-1 items-center justify-center gap-[10%] pt-[3%] pb-[4.1%] max-[649px]:gap-4 max-[649px]:px-5">
            {members.map((member) => (
              <li
                key={member.name}
                className="group/tile w-[24%] max-[649px]:w-[7rem]"
              >
                <Tile onSelect={onSelect} member={member}>
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      sizes="(min-width: 650px) 24vw, 7rem"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center px-1 text-center font-accent text-caption tracking-title text-ink/45 lowercase">
                      photo coming soon
                    </span>
                  )}
                </Tile>
                <p className="mt-[12%] truncate text-center font-accent text-[2.1cqw] font-bold tracking-body text-ink max-[649px]:text-[0.8rem]">
                  {member.name}
                </p>
              </li>
            ))}
          </ul>
        )}

        <ScreenFooter
          backRef={backRef}
          onBack={onBack}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      </div>
    </div>
  );
}

/**
 * The window's blue header.
 *
 * One export, used both ways round. Its blue runs deeper on the right, which
 * is the director card's shape — the committee list mirrors it so the depth
 * falls on the left instead, exactly as the two mockups show. Mirroring is
 * safe because the artwork carries no text of its own; the names below are
 * laid over it.
 */
export function ScreenTitleBar({
  committee,
  label,
}: {
  committee: Committee;
  /** Omitted on a member's card, where the committee name stands alone. */
  label?: string;
}) {
  const mirrored = Boolean(label);

  return (
    /*
      Bled 4px past the panel on the top and both sides; the screen clips the
      overhang. Sitting exactly on the panel's edge left a hairline of its
      white showing around the blue.
    */
    <div className="relative -mt-[4px] shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/about-components/header.svg"
        alt=""
        className={`-mx-[4px] block w-[calc(100%+8px)] max-w-none ${mirrored ? "-scale-x-100" : ""}`}
      />

      {/* Laid over the artwork's own box, bleed included, so the anchor's
          percentages are shares of the export's 1292 width. */}
      <div className="absolute inset-y-0 -inset-x-[4px]">
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: NAME_DROP,
            bottom: `calc(-1 * ${NAME_DROP})`,
            ...(mirrored
              ? {
                  left: `calc(${NAME_MARGIN} - ${NAME_SHIFT})`,
                  right: `calc(${DEEP_START} + ${NAME_MARGIN} + ${NAME_SHIFT})`,
                }
              : {
                  left: `calc(${DEEP_START} + ${NAME_MARGIN} + ${NAME_SHIFT})`,
                  right: `calc(${NAME_MARGIN} - ${NAME_SHIFT})`,
                }),
          }}
        >
          <CommitteeName committee={committee} />
        </div>
      </div>

      {/*
        The list's label, on the white opposite the name, measured off the
        committee overlay mockup: medium weight, its baseline 9.34% of the
        window's width down from the top.

        Centred rather than right-aligned, on the middle of "Committee
        Members" as the mockup places it, so the much shorter "Directors"
        sits under the same point instead of hugging the edge.

        Ubuntu's line box at `leading-none` puts the baseline 0.87em below
        its top, so the top is 9.34 - 0.87 * 3.44 = 6.35cqw — plus the 4px
        this wrapper is raised by for the header's bleed.
      */}
      {label ? (
        <span className="absolute top-[calc(6.35cqw+4px)] left-[73.85%] -translate-x-1/2 font-accent text-[3.44cqw] font-medium leading-none whitespace-nowrap text-ink">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/*
 * The committee name's anchor: the stretch of the header from where the blue
 * starts to drop from its thin band (x 602 of the export's 1292) out to the
 * panel's edge, as marked on the mockup. An equal margin at each end keeps
 * the name centred between the two.
 */
const DEEP_START = `${((602 / 1292) * 100).toFixed(2)}%`;
const NAME_MARGIN = "4%";

/*
 * The whole anchor nudged, by eye: out towards the panel's edge (a share of
 * the header's width — left on the lists, right on the mirrored card) and
 * down (a share of its height).
 */
const NAME_SHIFT = "3.5%";
const NAME_DROP = "5%";

/*
 * The name's size when it has room, as a share of the window's width, and the
 * share of its anchor a long name is fitted to — scaled together, so every
 * name keeps its size relative to the others.
 */
const NAME_SCALE = 0.92 * 0.92;
const NAME_MAX_SIZE = 6.34 * NAME_SCALE;

/**
 * The committee name, sized to its anchor.
 *
 * Measured rather than guessed from its letter count: it is set at the full
 * size, and a name wider than the anchor is scaled down by exactly the
 * overflow. The size is in `cqw`, so the name and its anchor grow together
 * and one measurement holds at every window width. It is taken again once the
 * webfont has loaded, since the fallback face measures differently.
 */
function CommitteeName({ committee }: { committee: Committee }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const name = ref.current;
    const anchor = name?.parentElement;
    if (!name || !anchor) return;

    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      name.style.fontSize = `${NAME_MAX_SIZE}cqw`;
      // Layout widths, not bounding boxes: the screen opens with a scale
      // transform, and a box measured mid-animation would read small.
      const overflow = (anchor.clientWidth * NAME_SCALE) / name.offsetWidth;
      name.style.fontSize = `${NAME_MAX_SIZE * Math.min(1, overflow)}cqw`;
    };

    fit();
    document.fonts.ready.then(fit);
    return () => {
      cancelled = true;
    };
  }, [committee]);

  return (
    <span
      ref={ref}
      /*
        Set in the layout effect before first paint; the class is the same
        value, so nothing jumps if that effect has not run yet. The negative
        right margin takes back the tracking after the last letter, which
        would otherwise push the name off centre.
      */
      className="-mr-[0.16em] font-accent text-[5.37cqw] font-medium leading-none tracking-[0.16em] whitespace-nowrap text-white"
    >
      {committeeLabel(committee)}
    </span>
  );
}

/**
 * The window's bottom row: the back control tucked into the corner, and the
 * wide action pill beside it.
 */
export function ScreenFooter({
  backRef,
  onBack,
  actionLabel,
  onAction,
}: {
  backRef?: React.RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  /** Omitted where there is nothing to switch to, leaving only Back. */
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div
      className="relative mt-auto flex items-end"
      style={{ paddingBottom: pctOfHeight(3.2) }}
    >
      {/*
        Flush into the window's bottom-left corner, as drawn: the export is a
        corner piece, so it is positioned rather than placed in the row.

        The export draws its shape 18.7px in and 20.3px up from the corner of
        its 261x207 canvas, room for its shadow. The button crops that margin
        off, so the shape itself meets the panel's edges: its box is the
        remaining 242.3x186.7, and the artwork inside is shifted left by the
        18.7px. Cropped rather than pulled out past the edge, because anything
        hanging off the bottom made the screen scrollable.
      */}
      <button
        ref={backRef}
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute bottom-0 left-0 block aspect-[242.3/186.7] w-[19%] cursor-pointer overflow-hidden transition duration-150 hover:brightness-[1.04] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal max-[649px]:w-[4.6rem]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-components/back button.svg"
          alt=""
          className="absolute top-0 left-[-7.72%] block w-[107.72%] max-w-none"
        />
      </button>

      {/*
        Two exports: one with "View Committee Members" already set, and the
        same pill blank for every other label, which is then laid over it.
      */}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          aria-label={actionLabel}
          className="relative ml-[23.5%] block w-[71.9%] cursor-pointer transition duration-150 hover:brightness-[1.04] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal max-[649px]:mr-4 max-[649px]:ml-[5.5rem] max-[649px]:w-auto max-[649px]:flex-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              actionLabel === "View Committee Members"
                ? "/about-components/view commitee members button.svg"
                : "/about-components/view commitee members button-1.svg"
            }
            alt=""
            className="block w-full"
          />
          {actionLabel === "View Committee Members" ? null : (
            <span className="absolute inset-0 grid place-items-center font-accent text-[2.3cqw] tracking-[0.06em] text-ink max-[649px]:text-[0.8rem]">
              {actionLabel}
            </span>
          )}
        </button>
      ) : (
        /*
          The pill's space kept without the pill, so the row keeps its height
          and everything centred against it sits exactly where it does on
          every other committee.
        */
        <div
          aria-hidden="true"
          className="invisible ml-[23.5%] w-[71.9%] max-[649px]:mr-4 max-[649px]:ml-[5.5rem] max-[649px]:w-auto max-[649px]:flex-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-components/view commitee members button-1.svg"
            alt=""
            className="block w-full"
          />
        </div>
      )}
    </div>
  );
}

/* A member's name split for the two-line stack: first name, then the rest. */
function firstName(name: string) {
  return name.split(" ")[0];
}

function surname(name: string) {
  return name.split(" ").slice(1).join(" ");
}

/** The photo frame, made interactive only where there is somewhere to go. */
function Tile({
  member,
  onSelect,
  children,
}: {
  member: TeamMember;
  onSelect?: (member: TeamMember) => void;
  children: React.ReactNode;
}) {
  const frame =
    "relative aspect-square w-full overflow-hidden rounded-[14%] bg-[#D9D9D9] shadow-[inset_0_2px_6px_rgba(23,55,113,0.25)]";

  if (!onSelect) return <div className={frame}>{children}</div>;

  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      aria-label={`${member.name}, ${member.role}`}
      className={`${frame} cursor-pointer transition-[translate,scale,box-shadow] duration-200 ease-out group-hover/tile:-translate-y-1.5 group-hover/tile:scale-[1.05] focus-visible:-translate-y-1.5 focus-visible:scale-[1.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal`}
    >
      {children}
    </button>
  );
}
