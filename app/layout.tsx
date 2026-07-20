import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import MLHBadge from "@/components/MLHBadge";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MLHBadge />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
