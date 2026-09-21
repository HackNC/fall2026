export const scheduleDays = ["Friday", "Saturday", "Sunday"] as const;

export type ScheduleDay = (typeof scheduleDays)[number];

/* Shown above each day's events. Keep in step with EVENT_DATES in Hero.tsx. */
export const scheduleDates: Record<ScheduleDay, string> = {
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
 * The hacker-facing schedule, from the run of show (last updated 9/19/2026).
 *
 * Only the Public and Workshop rows of that sheet are here. Internal rows (setup,
 * deliveries, mentor and judge meetings, sleeping-area logistics) are
 * left out on purpose: this page is for hackers, and the run of show is the
 * team's document. "X ends" rows are folded into the "until" of the event they
 * close rather than listed on their own.
 *
 * Workshop titles marked TBD are still being confirmed with the presenters.
 * Rooms are deliberately not listed yet; they go in the descriptions once the
 * venue plan is final.
 */
/*
 * Shown as a note under the page heading while the run of show is still
 * moving. Flip to false once the schedule is locked.
 */
export const scheduleIsTentative = true;

export const schedule: Record<ScheduleDay, ScheduleEvent[]> = {
  Friday: [
    {
      time: "5:00 PM",
      title: "Kickoff + HackNC 101",
      description:
        "Welcome, what to expect over the weekend, and how to make the most of it.",
    },
    {
      time: "5:30 PM",
      title: "Workshop: CS+Social Good",
      description: "Topic to be announced.",
    },
    {
      time: "5:30 PM",
      title: "Team Matching",
      description:
        "Don't have a team yet? Come meet other hackers and form one.",
    },
  ],
  Saturday: [
    {
      time: "8:00 AM",
      title: "Check-In Opens",
    },
    {
      time: "8:30 AM",
      title: "Coffee & Breakfast",
      description: "Until 10:00 AM.",
    },
    {
      time: "10:30 AM",
      title: "Opening Ceremony",
      description: "Until 11:30 AM.",
    },
    {
      time: "11:30 AM",
      title: "Hacking Begins",
    },
    {
      time: "11:45 AM",
      title: "MLH Workshop: Google Gemini AI Studio",
    },
    {
      time: "11:45 AM",
      title: "Workshop: CS+Social Good",
      description: "Topic to be announced.",
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
      title: "Treasury Workshop: Beyond AI Slop",
    },
    {
      time: "3:15 PM",
      title: "Workshop: HackNC Dev Team",
      description: "Topic to be announced.",
    },
    {
      time: "4:15 PM",
      title: "MLH Workshop: Intro to GitHub Copilot",
    },
    {
      time: "4:30 PM",
      title: "Labcorp Workshop: Privilege, Trust, Accountability",
    },
    {
      time: "5:15 PM",
      title: "Workshop: HackNC Dev Team",
      description: "Topic to be announced.",
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
      title: "Skribbl.io",
      description: "Until 10:00 PM.",
    },
  ],
  Sunday: [
    {
      time: "8:30 AM",
      title: "Coffee & Breakfast",
      description: "Until 10:00 AM.",
    },
    {
      time: "11:00 AM",
      title: "Hacking Ends + Submit on Devpost",
      description: "Projects must be submitted on Devpost by 11:00 AM.",
    },
    {
      time: "12:00 PM",
      title: "Lunch",
      description: "Until 2:00 PM.",
    },
    {
      time: "1:00 PM",
      title: "Demo Fair & Judging",
      description:
        "Be at your table to demo your project to the judges. Until 2:30 PM.",
    },
    {
      time: "4:00 PM",
      title: "Closing Ceremony & Awards",
      description: "Until 5:00 PM.",
    },
  ],
};
