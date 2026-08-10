"use client";

import { useEffect, useRef, useState } from "react";
import BriefHistory from "@/components/BriefHistory";
import MeetOurTeam from "@/components/MeetOurTeam";
import WiiCursor from "@/components/WiiCursor";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      {
        threshold: [0, 0.3, 0.6],
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} aria-labelledby="team-heading">
      {isActive ? <WiiCursor /> : null}
      <MeetOurTeam />
      <BriefHistory />
    </section>
  );
}
