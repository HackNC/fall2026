/**
 * Glossy pill chrome from the hacknc 2026 Figma file.
 *
 * The nav bar tabs and the schedule day tabs are the same Figma component
 * ("blue rectangle") in different colours, so they share one recipe here.
 * Each variant paints two background layers on a single element: the white
 * highlight sweep across the top half (Figma calls it the "reflection" layer)
 * over the variant's base gradient. The pair of inset shadows is the bevel
 * Figma draws on the button shape.
 *
 * The class strings are spelled out in full on purpose — Tailwind scans this
 * file as plain text, so an interpolated class name would never be generated.
 */

export type GlossyVariant = "royal" | "blossom" | "tangerine" | "pressed" | "bubble";

const base = [
  "relative inline-flex items-center justify-center rounded-[10px] border",
  "px-5 py-2 text-center font-body text-base tracking-[0.05em] lowercase sm:text-lg",
  "[text-shadow:0_2px_4px_rgba(23,55,113,0.65)]",
  "transition duration-150 hover:brightness-105 active:translate-y-px",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal",
].join(" ");

const bubbleBase = [
  "relative inline-flex items-center justify-center rounded-full border",
  "px-5 py-2 text-center font-body text-base tracking-[0.05em] lowercase sm:text-lg",
  "[text-shadow:0_2px_4px_rgba(23,55,113,0.65)]",
  "transition-none hover:brightness-100",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal",
].join(" ");

const variants: Record<GlossyVariant, string> = {
  royal:
    "border-royal/30 text-white " +
    "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_55%),linear-gradient(to_bottom,#1554C9_5%,rgba(244,255,254,0.95)_100%)] " +
    "shadow-[0_4px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_4px_0_rgba(255,255,255,0.25)]",

  blossom:
    "border-blossom text-plum " +
    "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_55%),linear-gradient(to_bottom,#FF98B8_5%,rgba(244,255,254,0.95)_100%)] " +
    "shadow-[0_4px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_4px_0_rgba(255,255,255,0.25)]",

  // Ink rather than white on the label: white would land at 1.7:1 on this
  // gradient, ink is 5.7:1.
  tangerine:
    "border-tangerine text-ink " +
    "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_55%),linear-gradient(to_bottom,#FF8000_5%,#FFDFA8_100%)] " +
    "shadow-[0_4px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_4px_0_rgba(255,255,255,0.25)]",

  // The "current page" / "selected day" state reads as pressed in: a flatter
  // drop shadow and an inset ring in place of the top highlight bar.
  pressed:
    "border-royal/30 text-ink " +
    "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_55%),linear-gradient(to_bottom,#8F9CB8_0%,#FFFFFF_100%)] " +
    "shadow-[0_1px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_0_0.5px_3px_rgba(21,84,201,0.25)]",

  bubble:
    "border-[#4d9ae8]/85 text-[#12356b] " +
    "bg-[image:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_45%,rgba(188,230,255,0.97)_100%)] " +
    "shadow-[0_4px_4px_rgba(23,55,113,0.45),inset_0_-2px_0_rgba(21,84,201,0.2),inset_0_4px_0_rgba(255,255,255,0.4)]",
};

export function glossyPill(variant: GlossyVariant, className = "") {
  const isBubble = variant === "bubble";
  return `${isBubble ? bubbleBase : base} ${variants[variant]} ${className}`.trim();
}
