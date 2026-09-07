export type Sponsor = {
  name: string;
  /** The sponsor's site. Each logo links out to it. */
  href: string;
  /**
   * Omitted until the artwork arrives — a grey placeholder box renders in its
   * place, as in the mockup.
   *
   * Logos live in public/sponsors/ and are referenced from the site root, so a
   * file at public/sponsors/x.png is "/sponsors/x.png". The box has a fixed
   * aspect ratio and the logo is contained inside it, so no dimensions are
   * needed here — any reasonably sized landscape file works.
   */
  logoSrc?: string;
};

/* The 2026 sponsors, in the order they appear on the page. */
export const sponsors: Sponsor[] = [
  {
    name: "Capital One",
    href: "https://www.capitalone.com",
    logoSrc: "/sponsors/capitalone.webp",
  },
  {
    name: "Fidelity",
    href: "https://www.fidelity.com",
    logoSrc: "/sponsors/fidelity.webp",
  },
  {
    name: "Genesys",
    href: "https://www.genesys.com",
    logoSrc: "/sponsors/genesys.webp",
  },
  {
    name: "Labcorp",
    href: "https://www.labcorp.com",
    logoSrc: "/sponsors/labcorp.webp",
  },
  {
    name: "Lowe's",
    href: "https://www.lowes.com",
    logoSrc: "/sponsors/lowes.webp",
  },
  {
    name: "LPL Financial",
    href: "https://www.lpl.com",
    logoSrc: "/sponsors/lpl.webp",
  },
  {
    name: "NetApp",
    href: "https://www.netapp.com",
    logoSrc: "/sponsors/netapp.webp",
  },
  {
    name: "Pendo",
    href: "https://www.pendo.io",
    logoSrc: "/sponsors/pendo.webp",
  },
];
