import type { Metadata } from "next";
import Schedule from "@/components/Schedule";

export const metadata: Metadata = {
  title: "Schedule | HackNC 2026",
  description: "Explore the HackNC 2026 weekend schedule.",
};

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <section id="schedule" aria-labelledby="schedule-heading">
          <Schedule />
        </section>
      </div>
    </main>
  );
}
