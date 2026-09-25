import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * The design source for the link-preview image (Discord, Slack, iMessage,
 * X...). It lives in this private folder, so Next does not publish it; the
 * site serves app/opengraph-image.jpg, a render of it.
 *
 * Why not let Next serve this as a route: under the static export it is
 * written out with no file extension (so GitHub Pages would serve it as a
 * download, not an image) and as a ~1 MB PNG, too heavy for some previews.
 *
 * To re-render after a change:
 *   1. move this file to app/opengraph-image.tsx and delete
 *      app/opengraph-image.jpg (the two cannot coexist)
 *   2. `npm run build` — the render is out/opengraph-image (a PNG)
 *   3. save that as app/opengraph-image.jpg at quality 95, 4:4:4 chroma
 *      (full-resolution colour keeps the text edges crisp)
 *   4. move this file back here
 *
 * `next/og` renders with Satori, the same engine as the OG Image Playground
 * (og-playground.vercel.app), so this JSX can be pasted back and forth with
 * the playground and looks the same in both. Two differences from what the
 * playground shows by default:
 *
 *   - The text is Ubuntu, from the .ttf files in app/_og/ (converted from the
 *     subsets next/font already uses). The playground falls back to its own
 *     font unless one is loaded.
 *   - The images are local copies in app/_og/ — PNG and JPEG, because the
 *     renderer's PNG output cannot read WebP — rather than hacknc.com URLs, so
 *     the build never depends on the live site. The backdrop is pre-cropped
 *     to 1200 x 630, as `objectFit: "cover"` did.
 *
 * The arrow is drawn as an SVG, since Ubuntu's Latin subset has no "→". And
 * the button's label is in its own element: as a bare text node beside the
 * arrow, Satori laid it out but never painted it.
 */
export const alt = "HackNC 2026 — October 9-11 @ UNC. Register now!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build: the site is a static export, so there is no server
// to generate it on request.
export const dynamic = "force-static";

const asset = (file: string) => readFile(join(process.cwd(), "app/_og", file));

async function dataUrl(file: string, type: string) {
  return `data:${type};base64,${(await asset(file)).toString("base64")}`;
}

export default async function Image() {
  const [ubuntuMedium, ubuntuBold, backdrop, logo, cursor] = await Promise.all([
    asset("Ubuntu-Medium.ttf"),
    asset("Ubuntu-Bold.ttf"),
    dataUrl("backdrop.jpg", "image/jpeg"),
    dataUrl("logo.png", "image/png"),
    dataUrl("cursor.png", "image/png"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 52,
        position: "relative",
        fontFamily: "Ubuntu",
        color: "#173771",
      }}
    >
      <img
        src={backdrop}
        width={1200}
        height={630}
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <img
        src={logo}
        width={370}
        height={363}
        alt=""
        style={{ flexShrink: 0 }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textShadow: "0 0 22px rgba(255,255,255,0.9)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          HackNC 2026
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 48,
            fontWeight: 500,
          }}
        >
          October 9-11 @ UNC
        </div>

        <div style={{ display: "flex", position: "relative", marginTop: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 46px",
              borderRadius: 999,
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: "#ffffff",
              textShadow: "0 1px 2px rgba(23,55,113,0.45)",
              backgroundImage:
                "linear-gradient(180deg, #3f7ae0 0%, #1554c9 100%)",
              border: "2px solid rgba(255,255,255,0.55)",
              boxShadow:
                "0 12px 24px rgba(21,84,201,0.35), inset 0 2px 0 rgba(255,255,255,0.35)",
            }}
          >
            <div style={{ display: "flex" }}>Register Now</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "#ffffff",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="#1554c9"
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <img
            src={cursor}
            width={64}
            height={64}
            alt=""
            style={{ position: "absolute", right: -26, bottom: -40 }}
          />
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Ubuntu", data: ubuntuMedium, weight: 500, style: "normal" },
        { name: "Ubuntu", data: ubuntuBold, weight: 700, style: "normal" },
      ],
    }
  );
}
