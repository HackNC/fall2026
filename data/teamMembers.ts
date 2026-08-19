export const committeeNames = [
  "Leads",
  "Graphics",
  "Logistics",
  "Marketing",
  "Operations",
  "Design",
] as const;

export type Committee = (typeof committeeNames)[number];

export type TeamMember = {
  name: string;
  committee: Committee;
  role: string;
  bio: string;
  /**
   * Omitted until graphics delivers headshots. The channel tile and the
   * detail view both fall back to the mockup's grey placeholder block.
   */
  image?: string;
};

/*
 * The 2026 roster is not announced yet, so every committee is empty and the
 * page shows "coming soon" in place of the channel grid. Filling any
 * committee's array brings the tiles back with no component changes.
 *
 * The names that used to live here were invented for layout work, not real
 * members — see git history if you want them back as a shape reference.
 */
export const teamMembers: Record<Committee, TeamMember[]> = {
  Leads: [],
  Graphics: [],
  Logistics: [],
  Marketing: [],
  Operations: [],
  Design: [],
};
