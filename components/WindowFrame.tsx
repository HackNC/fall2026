import type { ReactNode } from "react";

/**
 * Retro OS window frame from the hacknc 2026 Figma file.
 *
 * The schedule (blue) and resources (green) windows are the same component
 * in different colourways, and the home page's FAQ playlist panel is the
 * green variant again — so the frame lives here, parameterised by variant.
 * Each page composes its own title bar: `titleBar` is the row's main content
 * (the day tabs on schedule, the heading on resources) and `controls` is the
 * decorative window chrome pinned to the row's far right (Windows-style
 * min/max/X on schedule, glossy circles on resources). All window chrome is
 * decorative; consumers must keep it aria-hidden and out of the tab order.
 *
 * The class strings are spelled out in full on purpose — Tailwind scans this
 * file as plain text, so an interpolated class name would never be generated.
 */
export type WindowVariant = "blue" | "green";

const variantClasses: Record<WindowVariant, string> = {
  blue:
    "border-[3px] border-royal/30 " +
    "bg-radial-[at_5%_5%] from-frost from-[25%] via-periwinkle via-[70%] to-cornflower to-[100%] " +
    "shadow-[0_4px_4px_rgba(23,55,113,0.45)]",
  green:
    "border border-forest/50 " +
    "bg-linear-to-t from-sprout/36 from-0% via-dew/68 via-[26.9%] to-frost to-[53.8%] " +
    "shadow-[0_4px_4px_rgba(20,120,66,0.3)]",
};

type WindowFrameProps = {
  variant: WindowVariant;
  /** Main title-bar content (day tabs, heading, ...). */
  titleBar: ReactNode;
  /** Decorative chrome at the title bar's far right. */
  controls?: ReactNode;
  /** Extra classes on the frame itself (margins, padding). */
  className?: string;
  /** Extra classes on the title-bar row (height, padding). */
  titleBarClassName?: string;
  children: ReactNode;
};

export default function WindowFrame({
  variant,
  titleBar,
  controls,
  className = "",
  titleBarClassName = "",
  children,
}: WindowFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-card ${variantClasses[variant]} ${className}`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 ${titleBarClassName}`}
      >
        {titleBar}
        {controls}
      </div>
      {children}
    </div>
  );
}
