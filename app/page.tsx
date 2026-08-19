import FaqPlaylist from "@/components/FaqPlaylist";
import Hero from "@/components/Hero";
import WhatIsHackNC from "@/components/WhatIsHackNC";
// import Sponsors from "@/components/Sponsors";

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

        <section id="faq" aria-label="FAQ">
          <FaqPlaylist />
        </section>

        {/*
          Sponsors are not confirmed for 2026 yet, so the section is commented
          out rather than shipped with placeholder logos. Uncomment this and
          the import above to bring it back — components/Sponsors.tsx and
          data/sponsors.ts are both untouched and still build.
        */}
        {/*
        <section id="sponsors" aria-label="Sponsors">
          <Sponsors />
        </section>
        */}
      </div>
    </main>
  );
}
