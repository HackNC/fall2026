import SpinningCd from "@/components/SpinningCd";

/*
 * Both surfaces here are the Figma exports themselves, untouched, from
 * app/figma/ and served from public/ as lossless WebP: "window frame.png"
 * for the blue window and "text box rounded & sharp.png" for the white box
 * with the folder-tab notch (its drop shadow is part of the export).
 *
 * Each is applied as a nine-slice border image rather than a stretched <img>.
 * The slice lines cut every corner, the notch and the slashes into regions
 * that are drawn at a fixed size, and only the straight runs between them
 * stretch — so the artwork fits any width and any amount of text with its
 * curves and diagonal intact. `fill` paints the centre region too.
 *
 * `--art` is the scale the regions are drawn at: 1 on phones, 1.5 from `sm`
 * up, which is roughly the size the exports appear at in the Figma.
 */

// Slices in source px: the top 205 hold the gloss highlight, the right 150
// hold the three slashes, the bottom 60 and left 40 are the corners.
const frameStyle = {
  borderImageSource: "url(/home-components/what-is-hacknc-frame.webp)",
  borderImageSlice: "205 150 60 40 fill",
  borderImageWidth:
    "calc(205px * var(--art)) calc(150px * var(--art)) calc(60px * var(--art)) calc(40px * var(--art))",
  borderImageRepeat: "stretch",
} as const;

// Slices in source px: the top 70 hold the notch (its raised edge, the
// diagonal and the top-left arc, which ends at y≈67), the bottom 45 hold the
// bottom-right arc and the export's shadow, and 40 a side holds the corners.
// The diagonal lives in the top-middle region, so it scales with the width —
// the tab starts 56% of the way across at every size, as in the export.
const textBoxStyle = {
  borderImageSource: "url(/home-components/what-is-hacknc-textbox.webp)",
  borderImageSlice: "70 40 45 40 fill",
  borderImageWidth:
    "calc(70px * var(--art)) calc(40px * var(--art)) calc(45px * var(--art)) calc(40px * var(--art))",
  borderImageRepeat: "stretch",
} as const;

// The notch's lower edge sits 35px down the export. The heading is pulled
// into that band so it sits in the notch beside the tab, as in the mockup.
const NOTCH_DEPTH = "calc(35px * var(--art))";

export default function WhatIsHackNC() {
  return (
    <section aria-labelledby="what-is-hacknc-heading">
      {/* No side inset: the row spans the page wrapper edge to edge, so the box
          and the record together take exactly the width of the FAQ box below. */}
      <div className="grid items-center gap-10 [--art:1] sm:[--art:1.5] lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
        <div
          style={frameStyle}
          className="relative border-0 px-4 pt-5 pb-8 [container-type:inline-size] [filter:drop-shadow(0_10px_28px_rgba(23,55,113,0.28))] sm:px-7 sm:pt-6 sm:pb-10"
        >
          <div
            className="relative z-10 flex items-end pr-[44%] pb-1 pl-4 sm:items-center sm:pb-0 sm:pl-8"
            style={{ minHeight: NOTCH_DEPTH }}
          >
            {/*
              Sized from the frame's own width (cqw), not the viewport: the
              notch it has to fit in is a fixed share of the box, so the
              heading scales with the box and never wraps into the tab. The
              cap is the page-heading size; on phones it bottoms out at a
              readable size and wraps to two lines instead, and the band
              grows upward to hold them (its bottom stays on the notch line).
            */}
            <h2
              id="what-is-hacknc-heading"
              className="font-title text-[clamp(1.25rem,5.4cqw,2.25rem)] leading-tight tracking-title text-white [text-shadow:0_2px_6px_rgba(23,55,113,0.55)] sm:leading-none sm:whitespace-nowrap"
            >
              What is HackNC ?
            </h2>
          </div>

          <div
            style={{ ...textBoxStyle, marginTop: `calc(-1 * ${NOTCH_DEPTH})` }}
            className="space-y-5 border-0 px-7 pt-[72px] pb-9 sm:px-12 sm:pt-[92px] sm:pb-10"
          >
            <p className="font-body text-body leading-8 tracking-body text-ink sm:text-xl sm:leading-8">
              HackNC is a weekend for students of all skill levels to broaden
              their talents. Your challenge is to make an awesome project in
              just 24 hours.
            </p>
            <p className="font-body text-body leading-8 tracking-body text-ink sm:text-xl sm:leading-8">
              You will have access to hands-on tech workshops, sponsor
              networking, as well as exciting talks about the awesome things
              happening right now with computer science and technology &ndash;
              not to mention all of the free food, shirts, stickers, and swag!
            </p>
          </div>
        </div>

        {/* Fills its column, as the graphic does in the mockup (3:2 beside the box). */}
        <div
          className="motion-safe:will-change-transform"
          style={{
            transform:
              "translate3d(0, calc((var(--scroll-page) - 0.25) * -24px), 0)",
          }}
        >
          <SpinningCd className="lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
