import type { Metadata } from "next";
import { Geist, Geist_Mono, Istok_Web, Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import WaterBackdrop from "@/components/WaterBackdrop";
import WiiCursor from "@/components/WiiCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
 * The style guide's title face. Zetafonts' trial cut, licensed for
 * non-commercial use — see the licence PDF that ships with the family.
 *
 * Subset to Latin and converted to woff2 before being committed: the source
 * TTFs carry full Cyrillic and Greek sets at ~190 KB each, which is 24 KB here
 * instead. Regenerate with pyftsubset if a weight or glyph range is missing.
 *
 * `display: "swap"` on purpose — the wordmark is artwork, so the only thing
 * waiting on this file is body-adjacent headline text, which is better shown
 * in the fallback than not shown at all.
 */
const bubbleboddy = localFont({
  variable: "--font-bubbleboddy",
  display: "swap",
  src: [
    { path: "./fonts/BubbleboddyNeue-Light.woff2", weight: "300" },
    { path: "./fonts/BubbleboddyNeue-Regular.woff2", weight: "400" },
    { path: "./fonts/BubbleboddyNeue-Bold.woff2", weight: "700" },
  ],
});

// Accent face. Ubuntu and Istok Web are the real specified faces now, not
// stand-ins for Tahoma/Aptos — see the font stack comment in globals.css.
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Body face.
const istokWeb = Istok_Web({
  variable: "--font-istok-web",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackNC 2026",
  description: "The official HackNC 2026 Website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bubbleboddy.variable} ${ubuntu.variable} ${istokWeb.variable} h-full antialiased`}
    >
      {/*
        Browser extensions (Grammarly, password managers) inject attributes
        onto <body> before React hydrates, which React reports as a mismatch.
        Suppression applies one level deep — attributes on this element only,
        never its children — so real mismatches inside the app still surface.
      */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/*
          Fixed and behind everything, so it also sits under the shared nav bar
          and gives the glass up there something to refract. It lives in the
          layout rather than on the home page because the nav and footer are
          shared — without it, the glass on the inner pages would have nothing
          but flat colour behind it.

          It must not be wrapped in anything that sets a transform: a
          transformed ancestor becomes the containing block for its fixed
          descendants, which would pin the backdrop to that element instead of
          the viewport.
        */}
        <WaterBackdrop />
        {/*
          Site-wide Player 1 hand. It portals itself to <body> and works in
          viewport coordinates, so mounting it here rather than per-section
          costs nothing and keeps one instance alive across navigations.

          It opts itself out on touch devices and under prefers-reduced-motion,
          where the native cursor stays put.
        */}
        <WiiCursor />
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
