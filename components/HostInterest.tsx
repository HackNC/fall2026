const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function HostInterest() {
  return (
    <section id="host-interest" style={{ borderBottom: "4px solid #111" }}>
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
        <span
          style={{
            fontFamily: M,
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "#555",
          }}
        >
          INTEREST FORM
        </span>
        <span
          style={{
            fontFamily: M,
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "#4B9CD3",
          }}
        >
          § 02
        </span>
      </div>

      {/* Asymmetric two-column */}
      <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr" }}>
        {/* Left: big heading */}
        <div
          style={{
            borderRight: "2px solid #111",
            padding: "48px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: D,
              fontSize: "clamp(56px, 7vw, 96px)",
              lineHeight: 0.92,
              color: "#111",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            COMING
            <br />
            TO
            <br />
            <span style={{ color: "#4B9CD3" }}>HACKNC?</span>
          </h2>
        </div>

        {/* Right: copy + CTA */}
        <div
          style={{
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: M,
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "#4B9CD3",
                marginBottom: "16px",
              }}
            >
              LET US KNOW YOU&apos;RE INTERESTED
            </p>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "#333",
                margin: "0 0 28px 0",
              }}
            >
              Registration isn&apos;t open yet, but fill out our interest form
              and we&apos;ll reach out as soon as applications go live. Takes
              less than a minute.
            </p>
          </div>

          <div style={{ paddingTop: "40px" }}>
            <a
              href="https://forms.gle/hj2APFBivY3rAYtz8"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: D,
                fontSize: "22px",
                color: "#f5f0e8",
                background: "#111",
                textDecoration: "none",
                padding: "16px 28px",
                display: "inline-block",
                letterSpacing: "0.03em",
              }}
            >
              FILL OUT THE FORM ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
