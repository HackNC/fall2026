import type { Metadata } from "next";
import ResourceList from "@/components/ResourceList";

export const metadata: Metadata = {
  title: "Resources | HackNC 2026",
  description:
    "Guides, past HackNC projects, and tools to help you hack at HackNC 2026.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ResourceList />
    </main>
  );
}
