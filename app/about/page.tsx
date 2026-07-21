import type { Metadata } from "next";
import BoardMembers from "@/components/BoardMembers";
import BriefHistory from "@/components/BriefHistory";

export const metadata: Metadata = {
  title: "About | HackNC 2026",
  description: "Learn about HackNC and the students who make it possible.",
};

export default function AboutPage() {
  return (
    <main>
      <BriefHistory />
      <BoardMembers />
    </main>
  );
}
