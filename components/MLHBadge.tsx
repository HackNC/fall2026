export default function MLHBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://www.mlh.com/seasons/2026/events"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        top: 0,
        right: "clamp(8px, 3vw, 24px)",
        zIndex: 50,
        width: "clamp(70px, 20vw, 100px)",
        minWidth: "70px",
        maxWidth: "120px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mlh-logo-blue.svg"
        alt="Major League Hacking 2027 Hackathon Season"
        style={{ width: "100%" }}
      />
    </a>
  );
}
