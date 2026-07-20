export const committeeNames = [
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
};

export const teamMembers: Record<Committee, TeamMember[]> = {
  Graphics: [
    { name: "Alex Morgan", committee: "Graphics" },
    { name: "Jordan Lee", committee: "Graphics" },
    { name: "Sam Rivera", committee: "Graphics" },
    { name: "Taylor Brooks", committee: "Graphics" },
  ],
  Logistics: [
    { name: "Casey Patel", committee: "Logistics" },
    { name: "Riley Chen", committee: "Logistics" },
    { name: "Jamie Davis", committee: "Logistics" },
    { name: "Avery Wilson", committee: "Logistics" },
  ],
  Marketing: [
    { name: "Cameron Kim", committee: "Marketing" },
    { name: "Morgan Reed", committee: "Marketing" },
    { name: "Parker Singh", committee: "Marketing" },
    { name: "Quinn Bailey", committee: "Marketing" },
  ],
  Operations: [
    { name: "Drew Thompson", committee: "Operations" },
    { name: "Reese Nguyen", committee: "Operations" },
    { name: "Skyler Martin", committee: "Operations" },
    { name: "Emerson Clark", committee: "Operations" },
  ],
  Design: [
    { name: "Rowan Garcia", committee: "Design" },
    { name: "Finley Adams", committee: "Design" },
    { name: "Sage Robinson", committee: "Design" },
    { name: "Hayden Lewis", committee: "Design" },
  ],
};
