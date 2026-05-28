export default function MLHBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=blue"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        top: 0,
        right: "24px",
        zIndex: 50,
        width: "72px",
        minWidth: "60px",
        maxWidth: "90px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-blue.svg"
        alt="Major League Hacking 2026 Hackathon Season"
        style={{ width: "100%" }}
      />
    </a>
  );
}
