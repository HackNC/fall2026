"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type WiiCursorProps = {
  /** The element the pointer takes over. Nothing outside it is affected. */
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * The Wii Player 1 hand pointer, scoped to one container.
 *
 * The hand chases the real pointer instead of tracking it exactly — a Wii
 * remote never lands on a pixel instantly, and the lag plus the lean into
 * horizontal movement is most of what makes it read as a Wii cursor rather
 * than a hand-shaped mouse cursor.
 */
export default function WiiCursor({ containerRef }: WiiCursorProps) {
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
    const container = containerRef.current;
    const hand = handRef.current;
    if (!enabled || !container || !hand) return;

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

      // First reading of the session: drop the hand straight onto the pointer
      // rather than letting it fly in from the top-left corner. Revealing it
      // here rather than on pointerenter matters — enter fires before any
      // coordinates exist, which would show one frame parked at 0,0.
      if (!placed) {
        handX = pointerX;
        handY = pointerY;
        placed = true;
        if (hand) hand.style.opacity = "1";
      }
    }

    function handleEnter() {
      container?.classList.add("wii-pointer-active");
    }

    function handleLeave() {
      container?.classList.remove("wii-pointer-active");
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
      // re-render the whole window on every frame of pointer movement.
      if (hand) {
        hand.style.transform = `translate3d(${handX - 20}px, ${handY - 4}px, 0) rotate(${angle}deg)`;
      }

      frame = requestAnimationFrame(tick);
    }

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerenter", handleEnter);
    container.addEventListener("pointerleave", handleLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerenter", handleEnter);
      container.removeEventListener("pointerleave", handleLeave);
      container.classList.remove("wii-pointer-active");
    };
  }, [enabled, containerRef]);

  if (!enabled) return null;

  return (
    <svg
      ref={handRef}
      aria-hidden="true"
      viewBox="0 0 48 52"
      width="44"
      height="48"
      className="pointer-events-none fixed top-0 left-0 z-40 opacity-0 transition-opacity duration-150"
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
    </svg>
  );
}
