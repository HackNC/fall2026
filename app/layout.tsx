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

export const metadata: Metadata = {
  title: "HackNC 2026",
  description: "The official HackNC 2026 Website.",
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
