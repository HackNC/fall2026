const D = "var(--font-display)";
const M = "var(--font-mono)";

const meta = [
  { label: "DATE", value: "OCT 2026\nTBD" },
  { label: "WHERE", value: "UNC CHAPEL HILL\nCHAPEL HILL, NC" },
  { label: "DURATION", value: "24 HOURS" },
  { label: "COST", value: "FREE" },
];

export default function Hero() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 260px",
        minHeight: "calc(100vh - 89px)",
        borderBottom: "4px solid #111",
      }}
    >
      {/* Left: title + copy */}
      <div
        style={{
          borderRight: "4px solid #111",
          padding: "48px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1
            style={{
              fontFamily: D,
              fontSize: "clamp(96px, 13vw, 152px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              color: "#111",
              margin: 0,
            }}
          >
            HACK
            <br />
            <span style={{ color: "#4B9CD3" }}>NC.</span>
          </h1>
          <div
            style={{
              borderTop: "4px solid #111",
              marginTop: "32px",
              paddingTop: "28px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.65,
                color: "#333",
                maxWidth: "520px",
                margin: 0,
              }}
            >
              An annual hackathon at UNC Chapel Hill. We bring together
              students from across the Southeast to build, hack, and deploy in
              one weekend. All skill levels welcome, first-timers especially!
            </p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "32px" }}>
          <a
            href="#host-interest"
            style={{
              fontFamily: D,
              fontSize: "22px",
              color: "#111",
              textDecoration: "none",
              borderTop: "3px solid #111",
              paddingTop: "8px",
              letterSpacing: "0.03em",
            }}
          >
            REGISTER INTEREST ↗
          </a>
        </div>
      </div>

      {/* Right: metadata column */}
      <div
        style={{
          padding: "48px 28px 40px",
          fontFamily: M,
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        <p
          style={{
            fontSize: "clamp(36px, 4vw, 52px)",
            fontFamily: D,
            color: "#4B9CD3",
            margin: "0 0 24px 0",
            lineHeight: 1,
          }}
        >
          2026
        </p>
        <div style={{ borderTop: "2px solid #111", marginBottom: "32px" }} />
        {meta.map(({ label, value }) => (
          <div key={label} style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "#4B9CD3",
                margin: "0 0 6px 0",
                textTransform: "uppercase",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#111",
                margin: 0,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
