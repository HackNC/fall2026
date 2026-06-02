const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function Nav() {
  return (
    <header style={{ borderBottom: "4px solid #111", background: "#f5f0e8" }}>
      <div
        style={{
          fontFamily: M,
          fontSize: "10px",
          letterSpacing: "0.12em",
          borderBottom: "1px solid #111",
          padding: "6px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          color: "#555",
        }}
      >
        <span>UNC CHAPEL HILL, NC</span>
        <span>FALL 2026</span>
        <span style={{ visibility: "hidden" }}>PLACEHOLDER</span>
      </div>
      <div
        style={{
          padding: "14px 32px",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: D,
            fontSize: "26px",
            letterSpacing: "0.02em",
            color: "#111",
          }}
        >
          HACKNC
        </span>
        <nav
          style={{
            fontFamily: M,
            fontSize: "11px",
            letterSpacing: "0.12em",
            display: "flex",
            gap: "40px",
          }}
        >
          <a href="#about" style={{ color: "#111", textDecoration: "none" }}>
            ABOUT
          </a>
          <a
            href="#host-interest"
            style={{ color: "#111", textDecoration: "none" }}
          >
            INTEREST FORM
          </a>
          <a
            style={{
              color: "#4B9CD3",
              textDecoration: "none",
              visibility: "hidden",
            }}
          >
            PLACEHOLDER
          </a>
        </nav>
      </div>
    </header>
  );
}
