import type { Metadata } from "next";
import Schedule from "@/components/Schedule";

export const metadata: Metadata = {
  title: "Schedule | HackNC 2026",
  description: "Explore the HackNC 2026 weekend schedule.",
};

export default function SchedulePage() {
  return (
    <main>
      <Schedule />
    </main>
  );
}
