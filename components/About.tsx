const D = "var(--font-display)";
const M = "var(--font-mono)";

const stats = [
  { value: "500+", label: "STUDENTS" },
  { value: "3", label: "DAYS" },
  { value: "50+", label: "PROJECTS" },
];

export default function About() {
  return (
    <section id="about" style={{ borderBottom: "4px solid #111" }}>
      {/* Section header */}
      <div
        className="flex items-baseline justify-between border-b-2 border-[#111] px-4 py-3 sm:px-6 md:px-8 lg:px-10"
      >
        <span
          style={{
            fontFamily: M,
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "#555",
          }}
        >
          ABOUT THE EVENT
        </span>
        <span
          style={{
            fontFamily: M,
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "#4B9CD3",
          }}
        >
          § 01
        </span>
      </div>

      {/* Stats bar */}
      <div
        className="grid grid-cols-1 border-b-2 border-[#111] sm:grid-cols-3"
      >
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              padding: "clamp(20px, 4vw, 28px) clamp(16px, 4vw, 40px)",
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              flexWrap: "wrap",
            }}
            className={`${i < stats.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2" : ""} border-[#111]`}
          >
            <span style={{ fontFamily: D, fontSize: "clamp(44px, 10vw, 64px)", lineHeight: 1, color: "#111" }}>
              {value}
            </span>
            <span
              style={{
                fontFamily: M,
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "#4B9CD3",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Two-column body */}
      <div
        className="grid grid-cols-1 border-b-2 border-[#111] lg:grid-cols-2"
      >
        <div className="px-4 py-8 sm:px-6 md:px-8 lg:border-r-2 lg:border-[#111] lg:px-10 lg:py-10">
          <p style={{ fontSize: "clamp(16px, 2.2vw, 17px)", lineHeight: 1.7, color: "#222", margin: 0 }}>
            HackNC is a weekend for students of all skill levels to broaden their
            talents. Your challenge is to make an awesome project in just 24 hours.
            You will have access to hands-on tech workshops, sponsor networking, and
            exciting talks about what&apos;s happening right now in CS and tech —
            not to mention all of the free food, shirts, stickers, and swag!</p>
        </div>
        <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-10">
          <p style={{ fontSize: "clamp(16px, 2.2vw, 17px)", lineHeight: 1.7, color: "#222", margin: 0 }}>
            You don&apos;t need to be a senior computer science student with four internships
            to show up. HackNC is explicitly built for people who are still figuring
            it out. The best projects usually come from people who had no idea what
            they were doing on Friday night.
          </p>
        </div>
      </div>
    </section>
  );
}
