import FaqPlaylist from "@/components/FaqPlaylist";
import Hero from "@/components/Hero";
import RegistrationFish from "@/components/RegistrationFish";
import Sponsors from "@/components/Sponsors";
import WhatIsHackNC from "@/components/WhatIsHackNC";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-24 sm:space-y-32">
        <section id="home" aria-label="Home">
          <Hero />
        </section>

        <section id="what-is-hacknc" aria-label="What is HackNC">
          <WhatIsHackNC />
        </section>

        <section
          id="faq"
          aria-label="FAQ"
          /*
           * Tighter than the page's default section rhythm, because the fish
           * overlays the top of the sponsors and the usual gap left a
           * conspicuous empty band above it.
           *
           * The override goes here, not on the sponsors: Tailwind v4's
           * `space-y-*` sets `margin-block-end` on every child but the last,
           * so the gap belongs to this section — and adjacent margins collapse
           * to the larger of the two, so shrinking the sponsors' margin-top
           * did nothing. The `!` is needed because that generated selector
           * outranks a plain utility.
           */
          className="mb-12! sm:mb-16!"
        >
          <FaqPlaylist />
        </section>

        {/*
          The fish is positioned over this section rather than placed before
          it, so it swims across the sponsors the way the mockup shows without
          claiming a band of empty page to itself.
        */}
        <section id="sponsors" aria-label="Sponsors" className="relative">
          <RegistrationFish />
          <Sponsors />
        </section>
      </div>
    </main>
  );
}
