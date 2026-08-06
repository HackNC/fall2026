"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * The Wii Player 1 hand pointer, covering the whole page it is mounted on.
 *
 * The hand chases the real pointer instead of tracking it exactly — a Wii
 * remote never lands on a pixel instantly, and the lag plus the lean into
 * horizontal movement is most of what makes it read as a Wii cursor rather
 * than a hand-shaped mouse cursor.
 */
export default function WiiCursor() {
  const [enabled, setEnabled] = useState(false);
  const handRef = useRef<SVGSVGElement>(null);

  // Touch devices have no pointer to replace, and someone who asked for
  // reduced motion should not be given a cursor that drifts and tilts. Read
  // in an effect so the static export still prerenders.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    }

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const hand = handRef.current;
    if (!enabled || !hand) return;

    const root = document.documentElement;

    let pointerX = 0;
    let pointerY = 0;
    let handX = 0;
    let handY = 0;
    let angle = 0;
    let placed = false;
    let frame = 0;

    function handleMove(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;

      // First reading: drop the hand straight onto the pointer rather than
      // letting it fly in from the top-left corner, and only reveal it once
      // there are real coordinates to place it at.
      if (!placed) {
        handX = pointerX;
        handY = pointerY;
        placed = true;
        if (hand) hand.style.opacity = "1";
      }
    }

    // Only hides when the pointer genuinely leaves the viewport — for the
    // browser chrome or another window. There is deliberately no per-element
    // boundary: a hover raise moves the element out from under the pointer,
    // so enter/leave on anything that animates oscillates forever.
    function handleLeaveViewport() {
      if (hand) hand.style.opacity = "0";
      placed = false;
    }

    function tick() {
      const previousX = handX;

      handX += (pointerX - handX) * 0.2;
      handY += (pointerY - handY) * 0.2;

      const lean = Math.max(-8, Math.min(8, (handX - previousX) * 1.6));
      angle += (lean - angle) * 0.15;

      // Written straight to the node: running this through state would
      // re-render the page on every frame of pointer movement.
      if (hand) {
        hand.style.transform = `translate3d(${handX - 20}px, ${handY - 4}px, 0) rotate(${angle}deg)`;
      }

      frame = requestAnimationFrame(tick);
    }

    root.classList.add("wii-pointer-active");
    window.addEventListener("pointermove", handleMove, { passive: true });
    root.addEventListener("pointerleave", handleLeaveViewport);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeaveViewport);
      // Without this the native cursor stays hidden after navigating away.
      root.classList.remove("wii-pointer-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  /*
   * Portaled to <body> on purpose, and it must stay that way.
   *
   * A transformed ancestor becomes the containing block for a position: fixed
   * descendant, so nesting this anywhere inside the team window — which both
   * drifts and raises — would position the hand relative to that window while
   * the pointer coordinates driving it stay relative to the viewport. The hand
   * then sits a window's-offset away from the real pointer and slides further
   * on scroll. Portaling out is what guarantees the viewport is the reference.
   */
  return createPortal(
    <svg
      ref={handRef}
      aria-hidden="true"
      viewBox="0 0 48 52"
      width="44"
      height="48"
      // z-60 keeps it above the fixed MLH badge at z-index 50.
      className="pointer-events-none fixed top-0 left-0 z-[60] opacity-0 transition-opacity duration-150"
      style={{
        // Rotation pivots on the fingertip, which is also the point the
        // translate above aligns to the real pointer.
        transformOrigin: "20px 4px",
        willChange: "transform",
        filter: "drop-shadow(0 3px 4px rgba(23, 55, 113, 0.45))",
      }}
    >
      <path
        d="M21.5 4C19.6 4 18 5.6 18 7.5V30.2L15.1 26.9C13.8 25.4 11.5 25.3 10.1 26.6C8.6 27.9 8.5 30.2 9.8 31.7L18.6 41.7C21.3 44.8 25.2 46.6 29.3 46.6H32.5C39.4 46.6 45 41 45 34.1V22.5C45 20.6 43.4 19 41.5 19C40.6 19 39.8 19.3 39.2 19.9C38.8 18.3 37.3 17 35.5 17C34.6 17 33.8 17.3 33.2 17.9C32.8 16.3 31.3 15 29.5 15C28.2 15 27 15.7 26.3 16.7C26 16.5 25.5 16.4 25 16.4V7.5C25 5.6 23.4 4 21.5 4Z"
        fill="#ffffff"
        stroke="#173771"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Player number, the way a Wii pointer identifies whose remote it is. */}
      <circle cx="34" cy="36" r="8" fill="#1554C9" />
      <text
        x="34"
        y="36"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="700"
        fontFamily="Tahoma, Verdana, sans-serif"
        fill="#ffffff"
      >
        1
      </text>
    </svg>,
    document.body
  );
}
