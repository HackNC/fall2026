/**
 * Glossy sphere chrome from the hacknc 2026 Figma file.
 *
 * The aqua "?" orb and the pair of small circles in a green window's title
 * bar are the same component at different sizes: a radial white → lime →
 * forest fill whose off-centre origin reads as the specular highlight at the
 * top, plus an inset shadow at the bottom for the shadow ellipse. Pure CSS —
 * no artwork, so there is nothing to swap when final graphics land.
 *
 * As with glossyPill, the class strings are spelled out in full so Tailwind's
 * scanner sees them.
 */
export function glossyOrb(className = "") {
  return [
    "inline-block shrink-0 rounded-full",
    "bg-radial-[at_32%_25%] from-white from-0% via-lime via-[45%] to-forest to-[100%]",
    "shadow-[inset_0_-2px_3px_rgba(20,120,66,0.5),inset_0_2px_2px_rgba(255,255,255,0.85),0_2px_3px_rgba(20,120,66,0.3)]",
    className,
  ].join(" ");
}
