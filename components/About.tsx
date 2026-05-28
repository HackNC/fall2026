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
        style={{
          borderBottom: "2px solid #111",
          padding: "12px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.15em", color: "#555" }}>
          ABOUT THE EVENT
        </span>
        <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.15em", color: "#4B9CD3" }}>
          § 01
        </span>
      </div>

      {/* Stats bar */}
      <div
        style={{
          borderBottom: "2px solid #111",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              padding: "28px 40px",
              borderRight: i < stats.length - 1 ? "2px solid #111" : "none",
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}
          >
            <span style={{ fontFamily: D, fontSize: "64px", lineHeight: 1, color: "#111" }}>
              {value}
            </span>
            <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.15em", color: "#4B9CD3" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Two-column body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "2px solid #111",
        }}
      >
        <div style={{ padding: "40px", borderRight: "2px solid #111" }}>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#222", margin: 0 }}>
            HackNC is a weekend for students of all skill levels to broaden their
            talents. Your challenge is to make an awesome project in just 24 hours.
            You will have access to hands-on tech workshops, sponsor networking, and
            exciting talks about what&apos;s happening right now in CS and tech —
            not to mention all of the free food, shirts, stickers, and swag!</p>
        </div>
        <div style={{ padding: "40px" }}>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#222", margin: 0 }}>
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
