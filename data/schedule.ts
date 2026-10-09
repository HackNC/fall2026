export const scheduleDays = [
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type ScheduleDay = (typeof scheduleDays)[number];

/* Shown above each day's events. Keep in step with EVENT_DATES in Hero.tsx. */
export const scheduleDates: Record<ScheduleDay, string> = {
  Thursday: "October 8",
  Friday: "October 9",
  Saturday: "October 10",
  Sunday: "October 11",
};

export type ScheduleEvent = {
  time: string;
  title: string;
  /** Optional: only rows with something to add beyond the title carry one. */
  description?: string;
};

/*
 * The hacker-facing schedule, from the team's schedule sheet (October 2026).
 *
 * Each row is its start time; where the sheet gives an end time it goes in the
 * description as "Until ...". Locations are deliberately left out for now.
 * Thursday's Mini Hackathon is a pre-event, ahead of the main October 9-11
 * weekend.
 */
/*
 * Shown as a note under the page heading while the run of show is still
 * moving. Flip to false once the schedule is locked.
 */
export const scheduleIsTentative = true;

export const schedule: Record<ScheduleDay, ScheduleEvent[]> = {
  Thursday: [
    {
      time: "5:30 PM",
      title: "Mini Hackathon with Lafayette Co.",
      description: "Until 7:30 PM.",
    },
  ],
  Friday: [
    {
      time: "5:30 PM",
      title: "HackNC Kickoff + 101 Workshop with Lead Directors",
      description:
        "What to expect over the weekend, and how to make the most of it. Until 6:00 PM.",
    },
    {
      time: "5:30 PM",
      title: "Team Matching Event",
      description:
        "Don't have a team yet? Come meet other hackers and form one. Until 6:00 PM.",
    },
  ],
  Saturday: [
    {
      time: "8:00 AM",
      title: "Hacker Check-In Begins",
      description: "Until 10:30 AM.",
    },
    {
      time: "8:30 AM",
      title: "Breakfast",
      description: "Until 10:00 AM.",
    },
    {
      time: "10:30 AM",
      title: "Opening Ceremony",
      description: "Until 11:30 AM.",
    },
    {
      time: "11:30 AM",
      title: "Hacking Begins!",
    },
    {
      time: "11:45 AM",
      title: "Intro to Web Dev Workshop with CS+SG",
      description: "Until 12:30 PM.",
    },
    {
      time: "11:45 AM",
      title: "Google Gemini AI Studio Workshop with MLH",
      description: "Until 12:30 PM.",
    },
    {
      time: "12:30 PM",
      title: "Lunch",
      description: "Until 2:00 PM.",
    },
    {
      time: "1:00 PM",
      title: "Sponsorship Fair",
      description:
        "Meet our sponsors, ask about internships and jobs, and pick up some swag. Until 3:00 PM.",
    },
    {
      time: "3:15 PM",
      title: "Sponsor Workshop with Treasury: Beyond AI Slop",
      description: "Until 4:00 PM.",
    },
    {
      time: "3:15 PM",
      title: "UNC FLUX Workshop: Intro to UI/UX",
      description: "Until 4:00 PM.",
    },
    {
      time: "4:15 PM",
      title: "MLH Workshop: Intro to GitHub Copilot",
      description: "Until 5:00 PM.",
    },
    {
      time: "4:15 PM",
      title: "Sponsor Workshop with Labcorp: Privilege, Trust, Accountability",
      description: "Until 5:00 PM.",
    },
    {
      time: "5:15 PM",
      title: "UNC Dev Workshop: Hacking with AI",
      description: "Until 6:00 PM.",
    },
    {
      time: "5:15 PM",
      title:
        "Sponsor Workshop with Lafayette Co.: How to Pitch and Raise Money",
      description: "Until 6:00 PM.",
    },
    {
      time: "6:00 PM",
      title: "Dinner",
      description: "Until 8:00 PM.",
    },
    {
      time: "7:30 PM",
      title: "Trivia",
      description: "Until 8:30 PM.",
    },
    {
      time: "9:00 PM",
      title: "Skribbl.io Game",
      description: "Until 10:00 PM.",
    },
  ],
  Sunday: [
    {
      time: "6:00 AM",
      title: "Discord \u201cBest Meme\u201d Due",
    },
    {
      time: "7:30 AM",
      title: "Breakfast",
      description: "Until 9:00 AM.",
    },
    {
      time: "10:00 AM",
      title: "Hacking Ends!",
      description: "Final deadline for submissions via Devpost.",
    },
    {
      time: "11:00 AM",
      title: "Lunch",
      description: "Until 1:00 PM.",
    },
    {
      time: "12:00 PM",
      title: "Demo Fair",
      description: "Until 1:30 PM.",
    },
    {
      time: "3:00 PM",
      title: "Closing Ceremony",
      description: "Until 4:00 PM.",
    },
  ],
};
