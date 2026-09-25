import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import WaterBackdrop from "@/components/WaterBackdrop";
import "./globals.css";

/*
 * Ubuntu is the site's one face, as in the Figma: every font role in
 * globals.css (title, body, accent, and the page default) points at it.
 */
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

/*
 * What a link to the site shows when it is pasted into Discord, Slack,
 * iMessage and the like.
 *
 * The preview image is app/opengraph-image.jpg (and twitter-image.jpg, the
 * same picture for X): Next finds those files by name and writes the tags,
 * so nothing here points at them. `metadataBase` is what turns their paths
 * into the absolute URLs link previews require.
 *
 * Apps cache a link's preview, so after a change a link that was already
 * shared can keep showing the old one for a while; pasting it fresh (or with
 * `?v=2` on the end) fetches the new one.
 */
const previewText = "October 9-11 @ UNC - Register Now!";

export const metadata: Metadata = {
  metadataBase: new URL("https://hacknc.com"),
  title: "HackNC 2026",
  description: previewText,
  openGraph: {
    title: "HackNC 2026",
    description: previewText,
    url: "/",
    siteName: "HackNC 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackNC 2026",
    description: previewText,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * No `data-scroll-behavior` attribute here, on purpose. Next 16 stopped
   * overriding a global `scroll-behavior: smooth` during navigation, and that
   * attribute is the opt-in to bring the old instant snap back. We want the
   * opposite: the scroll-to-top on a page change should glide the same way the
   * in-page anchors do, so the smooth setting in globals.css is left to apply.
   */
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
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
        <ScrollToTop />
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
