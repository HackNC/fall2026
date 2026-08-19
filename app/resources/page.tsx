import type { Metadata } from "next";
import ResourceList from "@/components/ResourceList";

export const metadata: Metadata = {
  title: "Resources | HackNC 2026",
  description:
    "Guides, past HackNC projects, and tools to help you hack at HackNC 2026.",
};

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <section id="resources" aria-labelledby="resources-heading">
          <ResourceList />
        </section>
      </div>
    </main>
  );
}
