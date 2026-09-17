export const committeeNames = [
  "Leads",
  "Development",
  "Logistics",
  "Outreach",
  "Graphics",
  "SocialMedia",
  "Finance",
] as const;

export type Committee = (typeof committeeNames)[number];

export type TeamMember = {
  name: string;
  committee: Committee;
  /** e.g. "graphics co-director". Shown under the name on the detail screen. */
  role: string;
  /**
   * Directors get the full detail screen — photo, year, majors, fun fact.
   * Everyone else appears as a name and photo on their committee's screen,
   * which is why the fields below are optional.
   */
  isDirector?: boolean;
  year?: string;
  /** e.g. "cs & stats". One string, already formatted for display. */
  majors?: string;
  funFact?: string;
  /**
   * Omitted until graphics delivers headshots. The channel tile and the
   * detail view both fall back to the mockup's grey placeholder block.
   */
  image?: string;
};

/*
 * The 2026 directors. Committee members are not listed yet — add them to the
 * same arrays without `isDirector` and they appear on the committee screens.
 *
 * Headshots live in public/team/ as 600px square webp — every director has
 * one. Anyone added without an `image` renders initials on the tile and
 * "photo coming soon" on the detail screen until it is set.
 *
 * Array order is display order, so the pairs below sit side by side.
 */
export const teamMembers: Record<Committee, TeamMember[]> = {
  Leads: [
    {
      name: "Sanay Vastani",
      committee: "Leads",
      role: "Co-Lead",
      isDirector: true,
      year: "Junior",
      majors: "Computer Science + Economics",
      funFact: "I am a hoodie collector and have 20 hoodies.",
      image: "/team/sanay.webp",
    },
    {
      name: "Yahan Yang",
      committee: "Leads",
      role: "Co-Lead",
      isDirector: true,
      year: "Senior",
      majors: "Computer Science + Information Science",
      funFact:
        "If you ever watch a show (esp Asian ones and if it's recent), I probably know something about it (from clips) but I've never watched it, and most likely will not watch it.",
      image: "/team/yahan.webp",
    },
  ],
  Development: [
    {
      name: "Vihaan Kerekatte",
      committee: "Development",
      role: "Co-Director of Development",
      isDirector: true,
      year: "Sophomore",
      majors: "Computer Science + Data Science",
      funFact: "I love Mexican food!",
      image: "/team/vihaan.webp",
    },
    {
      name: "Rachel Lin",
      committee: "Development",
      role: "Co-Director of Development",
      isDirector: true,
      year: "Senior",
      majors: "Computer Science",
      funFact:
        "I have a soft spot for tabby cats after befriending a stray named Beans at UNC.",
      image: "/team/rachel.webp",
    },
  ],
  Logistics: [
    {
      name: "Harsehaj Dhami",
      committee: "Logistics",
      role: "Co-Director of Logistics",
      isDirector: true,
      year: "Junior",
      majors: "Computer Science + Statistics",
      funFact: "I've never tried coca-cola.",
      image: "/team/harsehaj.webp",
    },
    {
      name: "Sanya Saqib",
      committee: "Logistics",
      role: "Co-Director of Logistics",
      isDirector: true,
      year: "Sophomore",
      majors: "Computer Science",
      funFact:
        "I've loved watching Formula 1 since I went to the first race in Jeddah!",
      image: "/team/sanya.webp",
    },
  ],
  Outreach: [
    {
      name: "Robert Battle",
      committee: "Outreach",
      role: "Co-Director of Outreach",
      isDirector: true,
      year: "Senior",
      majors: "Computer Science & Mathematics",
      funFact: "I've been to every HackNC since 2022!",
      image: "/team/robert.webp",
    },
    {
      name: "Ishi Varshney",
      committee: "Outreach",
      role: "Co-Director of Outreach",
      isDirector: true,
      year: "Junior",
      majors: "Computer Science + Biostatistics",
      funFact:
        "I have travelled to more than 20 countries and still trying to grow the list!",
      image: "/team/ishi.webp",
    },
  ],
  Graphics: [
    {
      name: "Paige Pan",
      committee: "Graphics",
      role: "Co-Director of Graphics",
      isDirector: true,
      year: "Senior",
      majors: "Computer Science + Statistics",
      funFact:
        "If you show me a cat you found online, I can probably tell you its name.",
      image: "/team/paige.webp",
    },
    {
      name: "Angela Lam",
      committee: "Graphics",
      role: "Co-Director of Graphics",
      isDirector: true,
      year: "Senior",
      majors: "Biology",
      funFact: "I'm a big fountain pen and stationary collector!",
      image: "/team/angela.webp",
    },
  ],
  SocialMedia: [
    {
      name: "Rhea Kamisetty",
      committee: "SocialMedia",
      role: "Director of Social Media",
      isDirector: true,
      year: "Sophomore",
      majors: "Computer Science",
      funFact: "I was in chorus for 9 years!",
      image: "/team/rhea.webp",
    },
  ],
  Finance: [
    {
      name: "Kaya Li",
      committee: "Finance",
      role: "Director of Finance",
      isDirector: true,
      year: "Junior",
      majors: "Economics + Statistics",
      funFact:
        "I can name a majority of Pokémon in at least one language other than English.",
      image: "/team/kaya.webp",
    },
  ],
};
