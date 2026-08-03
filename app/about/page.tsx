import type { Metadata } from "next";
import BriefHistory from "@/components/BriefHistory";
import MeetOurTeam from "@/components/MeetOurTeam";

export const metadata: Metadata = {
  title: "About | HackNC 2026",
  description: "Learn about HackNC and the students who make it possible.",
};

export default function AboutPage() {
  return (
    <main>
      <MeetOurTeam />
      <BriefHistory />
    </main>
  );
}
