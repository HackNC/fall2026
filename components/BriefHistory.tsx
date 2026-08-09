export default function BriefHistory() {
  return (
    <section aria-labelledby="history-heading" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Our story
        </p>
        {/* h2, not h1: the team window above it is now the page's main heading. */}
        <h2
          id="history-heading"
          className="mt-4 max-w-3xl font-display text-4xl leading-none font-black tracking-[-0.04em] text-accent uppercase sm:text-6xl"
        >
          Brief History of HackNC
        </h2>
        <div className="mt-10 max-w-3xl space-y-6 font-serif text-lg leading-8 sm:text-xl sm:leading-9">
          <p>
            HackNC began as a student-led gathering at the University of North
            Carolina at Chapel Hill, built around a simple idea: give curious
            people a weekend to learn together and turn new ideas into working
            projects.
          </p>
          <p>
            Since then, the event has welcomed hackers from different schools,
            disciplines, and levels of experience. Workshops, mentors, and
            collaborative challenges help first-time hackers get started while
            giving experienced builders room to experiment.
          </p>
          <p>
            Today, HackNC continues to be organized by students who care about
            creating an open, supportive technology community. We are proud to
            make space for ambitious ideas, unexpected friendships, and a lot of
            learning along the way.
          </p>
        </div>
      </div>
    </section>
  );
}
