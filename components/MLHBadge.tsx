type MLHBadgeProps = {
  rightOffset?: string;
  zIndex?: number;
};

export default function MLHBadge({
  rightOffset = "clamp(8px, 3vw, 24px)",
  zIndex = 50,
}: MLHBadgeProps) {
  return (
    <a
      id="mlh-trust-badge"
      href="https://www.mlh.com/seasons/2026/events"
      target="_blank"
      rel="noreferrer"
      className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
      style={{
        position: "fixed",
        top: 0,
        right: rightOffset,
        zIndex,
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
