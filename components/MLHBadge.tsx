export default function MLHBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=blue"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        top: 0,
        right: "24px",
        zIndex: 50,
        width: "100px",
        minWidth: "80px",
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
