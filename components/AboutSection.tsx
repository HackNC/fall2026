import MeetOurTeam from "@/components/MeetOurTeam";

/*
 * The Wii cursor used to be mounted here behind an IntersectionObserver, so
 * the hand only appeared once the team window was on screen. It is site-wide
 * now and lives in app/layout.tsx, which leaves this as a plain landmark
 * wrapper — no state, no effects, so no "use client" either.
 */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="team-heading">
      <MeetOurTeam />
    </section>
  );
}
