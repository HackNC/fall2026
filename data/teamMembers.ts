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

const placeholderBio =
  "member details here so people can read more about us this is placeholder";

export const teamMembers: Record<Committee, TeamMember[]> = {
  Leads: [
    {
      name: "Alex Morgan",
      committee: "Leads",
      role: "Director",
      bio: placeholderBio,
    },
    {
      name: "Jordan Lee",
      committee: "Leads",
      role: "Co-Director",
      bio: placeholderBio,
    },
    {
      name: "Sam Rivera",
      committee: "Leads",
      role: "Graphics Lead",
      bio: placeholderBio,
    },
    {
      name: "Taylor Brooks",
      committee: "Leads",
      role: "Logistics Lead",
      bio: placeholderBio,
    },
    {
      name: "Casey Patel",
      committee: "Leads",
      role: "Marketing Lead",
      bio: placeholderBio,
    },
    {
      name: "Riley Chen",
      committee: "Leads",
      role: "Operations Lead",
      bio: placeholderBio,
    },
    {
      name: "Jamie Davis",
      committee: "Leads",
      role: "Design Lead",
      bio: placeholderBio,
    },
  ],
  Graphics: [
    {
      name: "Avery Wilson",
      committee: "Graphics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Cameron Kim",
      committee: "Graphics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Morgan Reed",
      committee: "Graphics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Parker Singh",
      committee: "Graphics",
      role: "member role",
      bio: placeholderBio,
    },
  ],
  Logistics: [
    {
      name: "Quinn Bailey",
      committee: "Logistics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Drew Thompson",
      committee: "Logistics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Reese Nguyen",
      committee: "Logistics",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Skyler Martin",
      committee: "Logistics",
      role: "member role",
      bio: placeholderBio,
    },
  ],
  Marketing: [
    {
      name: "Emerson Clark",
      committee: "Marketing",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Rowan Garcia",
      committee: "Marketing",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Finley Adams",
      committee: "Marketing",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Sage Robinson",
      committee: "Marketing",
      role: "member role",
      bio: placeholderBio,
    },
  ],
  Operations: [
    {
      name: "Hayden Lewis",
      committee: "Operations",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Micah Foster",
      committee: "Operations",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Rory Bennett",
      committee: "Operations",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Elliot Hayes",
      committee: "Operations",
      role: "member role",
      bio: placeholderBio,
    },
  ],
  Design: [
    {
      name: "Marlow Price",
      committee: "Design",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Sasha Turner",
      committee: "Design",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Noel Carter",
      committee: "Design",
      role: "member role",
      bio: placeholderBio,
    },
    {
      name: "Devon Ellis",
      committee: "Design",
      role: "member role",
      bio: placeholderBio,
    },
  ],
};
