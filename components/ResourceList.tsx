import { ArrowUpRight } from "lucide-react";
import HelpPopover from "@/components/HelpPopover";
import { resourceCategories } from "@/data/resources";

/*
 * The window is the Figma export (public/resource-components/"Group 1.svg"):
 * green frame, title bar with its "resources" heading and orbs, and the inner
 * white panel, all drawn in. Its canvas is 1371 x 1670, and the numbers below
 * are measured off it:
 *
 *   frame       x 5..1366 (a 5px shadow margin each side), y 0..1670
 *   panel       x 36..1335, y 75.2..1621.4, 33px corners
 *   "?" orb     x 24.8..72.3, y 11.7..55.3
 *
 * The panel is 1.2x as tall as it is wide, and the lists are not, so the
 * artwork is nine-sliced rather than scaled: the slices take the title bar and
 * every corner, and only the plain middle stretches to the content's height.
 *
 * The slice *widths* are all shares of the window's width (via `cqw` on the
 * wrapper), each exactly its slice times the window's scale. That keeps the
 * top band — title and orbs included — scaled evenly in both directions at
 * any width; a fixed-pixel slice would stretch the title sideways.
 */
const ART_WIDTH = 1371;
const at = (px: number) => `calc(${px} * 100cqw / ${ART_WIDTH})`;

const SLICE = { top: 110, right: 70, bottom: 82, left: 70 };

/*
 * Drawn from a 2x WebP render of that SVG (same folder, rendered with
 * headless Chrome), not the SVG itself: the export is full of blur and
 * drop-shadow filters, and as a border image the browser re-ran them on every
 * repaint — scrolling, and anything moving behind the glass nav — which
 * stalled one frame in ten for up to a second. A raster is cheap to paint.
 * Re-render it if the SVG changes.
 *
 * A raster's slices are in its own pixels, hence RENDER_SCALE below; the widths
 * the slices are drawn at are unchanged, still in the artwork's units.
 */
const RENDER_SCALE = 2;

const windowStyle = {
  borderImageSource: 'url("/resource-components/window frame.webp")',
  borderImageSlice: `${SLICE.top * RENDER_SCALE} ${SLICE.right * RENDER_SCALE} ${SLICE.bottom * RENDER_SCALE} ${SLICE.left * RENDER_SCALE} fill`,
  borderImageWidth: `${at(SLICE.top)} ${at(SLICE.right)} ${at(SLICE.bottom)} ${at(SLICE.left)}`,
  borderImageRepeat: "stretch",
  // The panel's edges, plus room inside it.
  paddingTop: `calc(${at(75.2)} + clamp(1.25rem, 4cqw, 3rem))`,
  paddingBottom: `calc(${at(48.6)} + clamp(1.25rem, 4cqw, 3rem))`,
  paddingInline: `calc(${at(36)} + clamp(1rem, 4.5cqw, 3.5rem))`,
} as const;

export default function ResourceList() {
  return (
    <section aria-labelledby="resources-heading" className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6">
        <div className="[container-type:inline-size]">
          <div className="relative border-0" style={windowStyle}>
            {/* The artwork carries the visible heading. */}
            <h1 id="resources-heading" className="sr-only">
              Resources
            </h1>

            {/* Over the "?" drawn into the title bar. */}
            <div
              className="absolute z-10"
              style={{ left: at(24.8), top: at(11.7) }}
            >
              <HelpPopover
                question="Want more resources?"
                hotspotClassName="h-[calc(43.6*100cqw/1371)] w-[calc(47.5*100cqw/1371)]"
              />
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {resourceCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={
                    index > 0
                      ? "md:border-l md:border-lime md:pl-10"
                      : "md:pr-10"
                  }
                >
                  <h2 className="font-body text-section tracking-body text-forest lowercase">
                    {category.title}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {category.resources.map((resource) => (
                      <li key={resource.title}>
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group block rounded-inset border border-lime bg-linear-to-b from-white to-lime/20 p-4 shadow-sm motion-safe:transition hover:shadow-md motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-body text-lg font-semibold tracking-body text-forest sm:text-2xl">
                              {resource.title}
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-forest opacity-60 motion-safe:transition group-hover:opacity-100"
                            />
                          </span>
                          <span className="mt-1 block font-body text-sm tracking-body text-forest sm:text-base">
                            {resource.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
