import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "About | HackNC 2026",
  description: "Learn about HackNC and the students who make it possible.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <AboutSection />
      </div>
    </main>
  );
}
