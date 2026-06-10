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
    <section className="grid min-h-[calc(100vh-89px)] grid-cols-1 border-b-4 border-[#111] lg:grid-cols-[minmax(0,1fr)_260px]">
      {/* Left: title + copy */}
      <div className="flex min-w-0 flex-col justify-between px-4 pb-8 pt-10 sm:px-6 md:px-8 lg:border-r-4 lg:border-[#111] lg:px-10 lg:pb-10 lg:pt-12">
        <div className="flex flex-1 flex-col justify-center">
          <h1
            style={{
              fontFamily: D,
              fontSize: "clamp(56px, 18vw, 152px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              color: "#111",
              margin: 0,
              overflowWrap: "anywhere",
            }}
          >
            HACK
            <br />
            <span style={{ color: "#4B9CD3" }}>NC.</span>
          </h1>
          <div
            style={{
              borderTop: "4px solid #111",
              marginTop: "clamp(20px, 4vw, 32px)",
              paddingTop: "clamp(16px, 3vw, 28px)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px, 2.3vw, 18px)",
                lineHeight: 1.65,
                color: "#333",
                maxWidth: "520px",
                margin: 0,
              }}
            >
              An annual hackathon at UNC Chapel Hill. We bring together students
              from across the Southeast to build, hack, and deploy in one
              weekend. All skill levels welcome, first-timers especially!
            </p>
          </div>
        </div>

        <div className="flex justify-start pt-8 lg:justify-end">
          <a
            href="#host-interest"
            style={{
              fontFamily: D,
              fontSize: "clamp(18px, 4vw, 22px)",
              color: "#111",
              textDecoration: "none",
              borderTop: "3px solid #111",
              paddingTop: "8px",
              letterSpacing: "0.03em",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            REGISTER INTEREST ↗
          </a>
        </div>
      </div>

      {/* Right: metadata column */}
      <div
        className="flex flex-col gap-0 border-t-4 border-[#111] px-4 pb-8 pt-8 sm:px-6 md:px-8 lg:border-t-0 lg:px-7 lg:pb-10 lg:pt-12"
        style={{ fontFamily: M }}
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
        <div
          style={{
            borderTop: "2px solid #111",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        />
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
