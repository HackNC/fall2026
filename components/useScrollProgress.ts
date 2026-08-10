"use client";

import { useEffect } from "react";

/**
 * Publishes the scroll position to CSS as `--scroll-px` and `--scroll-hero`,
 * for the parallax layers to read. Both are registered in globals.css.
 *
 * Deliberately not React state. A scroll handler that called setState would
 * re-render every component under the page on every frame of a scroll; writing
 * the properties straight onto the document element instead lets the layers
 * move entirely in CSS, the same trade the Wii cursor makes for pointer
 * movement.
 *
 * Call this from exactly one component per page. Two callers would fight over
 * the same two properties every frame — harmless, since they would both write
 * the same numbers, but the second listener is pure waste.
 */
export function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    // The listener fires far more often than the compositor paints, so it only
    // ever flags that a write is due; the write itself happens once per frame.
    let queued = false;

    function publish() {
      queued = false;
      const scrollY = window.scrollY;
      root.style.setProperty("--scroll-px", String(scrollY));
      root.style.setProperty(
        "--scroll-hero",
        String(Math.min(1, scrollY / Math.max(1, window.innerHeight)))
      );
    }

    function handleScroll() {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(publish);
    }

    function stop() {
      cancelAnimationFrame(frame);
      queued = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      // Back to the registered initial values, so the layers settle into the
      // same at-rest positions the static export was built with.
      root.style.removeProperty("--scroll-px");
      root.style.removeProperty("--scroll-hero");
    }

    function start() {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      publish();
    }

    // Someone who asked for reduced motion should not be given a page where
    // every layer slides at a different speed. Read in an effect so the static
    // export still prerenders, and subscribed to so toggling the OS setting
    // takes effect without a reload.
    function sync() {
      stop();
      if (!reducedMotion.matches) start();
    }

    sync();
    reducedMotion.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      stop();
    };
  }, []);
}
