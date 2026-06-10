const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function Footer() {
  return (
    <footer style={{ borderTop: "4px solid #111", background: "#111" }}>
      <div
        className="flex flex-col items-start justify-between gap-6 px-4 py-8 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:px-10"
      >
        <div>
          <span
            style={{
              fontFamily: D,
              fontSize: "22px",
              color: "#f5f0e8",
              letterSpacing: "0.02em",
            }}
          >
            HACKNC 2026
          </span>
          <p style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.12em", color: "#666", margin: "6px 0 0 0", overflowWrap: "anywhere" }}>
            UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-4 sm:gap-6 lg:w-auto lg:justify-end lg:gap-8">
          <span style={{ fontFamily: M, fontSize: "10px", letterSpacing: "0.12em", color: "#555" }}>
            © {new Date().getFullYear()} HACKNC
          </span>
          <a
            href="https://mlh.io/code-of-conduct"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: M,
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#4B9CD3",
              textDecoration: "none",
              borderBottom: "1px solid #4B9CD3",
              paddingBottom: "2px",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            MLH CODE OF CONDUCT
          </a>
        </div>
      </div>
    </footer>
  );
}
