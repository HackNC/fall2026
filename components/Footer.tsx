const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function Footer() {
  return (
    <footer style={{ borderTop: "4px solid #111", background: "#111" }}>
      <div
        style={{
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
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
          <p
            style={{
              fontFamily: M,
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#666",
              margin: "6px 0 0 0",
            }}
          >
            UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span
            style={{
              fontFamily: M,
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#555",
            }}
          >
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
            }}
          >
            MLH CODE OF CONDUCT
          </a>
        </div>
      </div>
    </footer>
  );
}
