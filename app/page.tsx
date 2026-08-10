import FaqPlaylist from "@/components/FaqPlaylist";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ResourceList from "@/components/ResourceList";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import WaterBackdrop from "@/components/WaterBackdrop";
import WhatIsHackNC from "@/components/WhatIsHackNC";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      {/*
        Fixed and behind everything, so it also sits under the shared nav bar
        and gives the glass up there something to refract. It must not be
        wrapped in anything that sets a transform: a transformed ancestor
        becomes the containing block for its fixed descendants, which would
        pin the water to this element instead of the viewport.
      */}
      <WaterBackdrop />

      <div className="mx-auto w-full max-w-7xl space-y-24 sm:space-y-32">
        <section id="home" aria-label="Home">
          <Hero />
        </section>

        <section id="what-is-hacknc" aria-label="What is HackNC">
          <WhatIsHackNC />
        </section>

        <section id="faq" aria-label="FAQ">
          <FaqPlaylist />
        </section>

        <section id="sponsors" aria-label="Sponsors">
          <Sponsors />
        </section>

        <AboutSection />

        <section id="resources" aria-labelledby="resources-heading">
          <ResourceList />
        </section>

        <section id="schedule" aria-labelledby="schedule-heading">
          <Schedule />
        </section>
      </div>
    </main>
  );
}
