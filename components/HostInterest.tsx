const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function HostInterest() {
  return (
    <section id="host-interest" style={{ borderBottom: "4px solid #111" }}>
      {/* Section header */}
      <div
        className="flex items-baseline justify-between border-b-2 border-[#111] px-4 py-3 sm:px-6 md:px-8 lg:px-10"
      >
        <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.15em", color: "#555" }}>
          INTEREST FORM
        </span>
        <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.15em", color: "#4B9CD3" }}>
          § 02
        </span>
      </div>

      {/* Asymmetric two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr]">
        {/* Left: big heading */}
        <div
          className="px-4 py-8 sm:px-6 md:px-8 lg:border-r-2 lg:border-[#111] lg:px-10 lg:py-12"
        >
          <h2
            style={{
              fontFamily: D,
              fontSize: "clamp(44px, 14vw, 96px)",
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
          className="flex flex-col justify-between border-t-2 border-[#111] px-4 py-8 sm:px-6 md:px-8 lg:border-t-0 lg:px-10 lg:py-12"
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
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#333", margin: "0 0 28px 0" }}>
              Registration isn&apos;t open yet, but fill out our interest form and
              we&apos;ll reach out as soon as applications go live. Takes less than
              a minute.
            </p>
          </div>

          <div style={{ paddingTop: "clamp(24px, 5vw, 40px)" }}>
            <a
              href="https://forms.gle/hj2APFBivY3rAYtz8"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: D,
                fontSize: "clamp(18px, 4vw, 22px)",
                color: "#f5f0e8",
                background: "#111",
                textDecoration: "none",
                padding: "14px clamp(18px, 4vw, 28px)",
                display: "inline-block",
                letterSpacing: "0.03em",
                minHeight: "44px",
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
