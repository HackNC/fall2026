/**
 * Sponsorship level, 1 being the highest. It sets how large the logo card is
 * and which row it sits in. Ranks only: the amounts behind them stay in the
 * finance team's spreadsheet, never in this public repo.
 */
export type SponsorTier = 1 | 2 | 3 | 4;

export type Sponsor = {
  name: string;
  /** The sponsor's site. Each logo links out to it. */
  href: string;
  tier: SponsorTier;
  /**
   * Omitted until the artwork arrives — a grey placeholder box renders in its
   * place, as in the mockup.
   *
   * Logos live in public/sponsors/ and are referenced from the site root, so a
   * file at public/sponsors/x.webp is "/sponsors/x.webp".
   *
   * Every file is prepared the same way, and the card relies on it:
   *   - transparent background, trimmed to the mark
   *   - centred on an 880×320 transparent canvas (the card's 11:4 shape)
   *   - scaled to fit 76% of the width and 55% of the height, whichever
   *     binds; dense marks get a further ~0.92–0.95 so they read the same
   *     size as the thin wordmarks
   *   - saved as WebP, quality ~88
   * Mixed sizes of raw logo would otherwise let tall marks fill the card
   * while wide wordmarks shrink, and the card adds no padding of its own.
   */
  logoSrc?: string;
};

/*
 * The 2026 sponsors. The page groups them by tier, so the order within a tier
 * is what matters here — alphabetical. Update `tier` when the spreadsheet
 * changes; the layout follows.
 */
export const sponsors: Sponsor[] = [
  {
    name: "Capital One",
    tier: 1,
    href: "https://www.capitalone.com",
    logoSrc: "/sponsors/capitalone.webp",
  },
  {
    name: "UNC School of Data and Information Sciences",
    tier: 2,
    href: "https://sdis.unc.edu",
    logoSrc: "/sponsors/unc-sdis.webp",
  },
  {
    name: "Photon",
    tier: 2,
    href: "https://photon.codes",
    logoSrc: "/sponsors/photon.webp",
  },
  {
    name: "Fidelity",
    tier: 3,
    href: "https://www.fidelity.com",
    logoSrc: "/sponsors/fidelity.webp",
  },
  {
    name: "Genesys",
    tier: 3,
    href: "https://www.genesys.com",
    logoSrc: "/sponsors/genesys.webp",
  },
  {
    name: "Labcorp",
    tier: 3,
    href: "https://www.labcorp.com",
    logoSrc: "/sponsors/labcorp.webp",
  },
  {
    name: "Lowe's",
    tier: 3,
    href: "https://www.lowes.com",
    logoSrc: "/sponsors/lowes.webp",
  },
  {
    name: "LPL Financial",
    tier: 3,
    href: "https://www.lpl.com",
    logoSrc: "/sponsors/lpl.webp",
  },
  {
    name: "NetApp",
    tier: 3,
    href: "https://www.netapp.com",
    logoSrc: "/sponsors/netapp.webp",
  },
  {
    name: "Pendo",
    tier: 3,
    href: "https://www.pendo.io",
    logoSrc: "/sponsors/pendo.webp",
  },
  {
    name: "Treasury",
    tier: 4,
    href: "https://treasury.sh",
    logoSrc: "/sponsors/treasury.webp",
  },
  {
    name: "Lafayette",
    tier: 4,
    href: "https://lafayettestandard.com",
    logoSrc: "/sponsors/lafayette.webp",
  },
];
