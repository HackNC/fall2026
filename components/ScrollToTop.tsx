"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Scrolls to the very top on every route change.
 *
 * Next's own navigation scroll targets the first element of the changed route
 * segment, not the document. Here that is <main>, which sits below the sticky
 * nav in the shared layout — so a page change landed a header's height short
 * of the top, and the nav then covered the start of the new page.
 *
 * Ordering matters and needs no deferral: Next's scroll runs in the layout
 * phase (a class-component lifecycle), and a passive useEffect fires after
 * that in the same commit, so this scrollTo is the one the browser honours.
 * Skipped on first mount, where there is nothing to scroll away from and a
 * reload should keep the browser's restored position; and skipped for hash
 * URLs, which are pointing at a specific element on purpose.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // "instant", not "auto": auto defers to the stylesheet, and globals.css
    // sets scroll-behavior: smooth, so it would animate anyway.
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }, [pathname]);

  return null;
}
