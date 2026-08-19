export const scheduleDays = ["Friday", "Saturday", "Sunday"] as const;

export type ScheduleDay = (typeof scheduleDays)[number];

export type ScheduleEvent = {
  time: string;
  title: string;
  description: string;
};

/*
 * The 2026 schedule is not published yet, so every day is empty and the page
 * shows "coming soon" in place of the timetable. Nothing else needs changing
 * when the real times land: fill a day's array and that tab starts rendering
 * events again.
 *
 * The placeholder times that used to live here were invented for layout work,
 * not supplied by the team — see git history if you want them back as a
 * reference while filling this in.
 */
export const schedule: Record<ScheduleDay, ScheduleEvent[]> = {
  Friday: [],
  Saturday: [],
  Sunday: [],
};
