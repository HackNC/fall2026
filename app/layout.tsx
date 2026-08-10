import type { Metadata } from "next";
import { Geist, Geist_Mono, Istok_Web, Ubuntu } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Stand-ins for the style guide's Bubblebody Neue and Aptos. See the font
// stack comment in globals.css.
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} ${istokWeb.variable} h-full antialiased`}
    >
      {/*
        Browser extensions (Grammarly, password managers) inject attributes
        onto <body> before React hydrates, which React reports as a mismatch.
        Suppression applies one level deep — attributes on this element only,
        never its children — so real mismatches inside the app still surface.
      */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
