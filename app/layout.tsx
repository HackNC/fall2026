import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-mono",
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
    <html lang="en" className={`${anton.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
