import type { Metadata } from "next";
import BriefHistory from "@/components/BriefHistory";
import MeetOurTeam from "@/components/MeetOurTeam";
import WiiCursor from "@/components/WiiCursor";

export const metadata: Metadata = {
  title: "About | HackNC 2026",
  description: "Learn about HackNC and the students who make it possible.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Page-scoped, so it takes over the pointer everywhere on /about
          rather than only inside the team window. */}
      <WiiCursor />
      <MeetOurTeam />
      <BriefHistory />
    </main>
  );
}
