export const scheduleDays = ["Friday", "Saturday", "Sunday"] as const;

export type ScheduleDay = (typeof scheduleDays)[number];

export type ScheduleEvent = {
  time: string;
  title: string;
  description: string;
};

export const schedule: Record<ScheduleDay, ScheduleEvent[]> = {
  Friday: [
    {
      time: "05:00 PM",
      title: "Check-in Opens",
      description: "Pick up your badge, meet fellow hackers, and get settled.",
    },
    {
      time: "07:00 PM",
      title: "Opening Ceremony",
      description: "Welcome remarks, weekend logistics, and challenge reveals.",
    },
    {
      time: "08:30 PM",
      title: "Team Formation",
      description: "Share ideas and find teammates before hacking begins.",
    },
  ],
  Saturday: [
    {
      time: "09:00 AM",
      title: "Breakfast",
      description: "Start the day with breakfast before workshops begin.",
    },
    {
      time: "11:00 AM",
      title: "Intro to Prototyping",
      description: "Turn an early concept into a testable project plan.",
    },
    {
      time: "01:00 PM",
      title: "Lunch",
      description: "Take a break, refuel, and connect with other teams.",
    },
    {
      time: "04:00 PM",
      title: "Mentor Office Hours",
      description: "Get technical guidance and project feedback from mentors.",
    },
  ],
  Sunday: [
    {
      time: "08:00 AM",
      title: "Breakfast",
      description: "Fuel up for the final stretch of hacking.",
    },
    {
      time: "10:00 AM",
      title: "Hacking Ends",
      description: "Submit your project and prepare for judging.",
    },
    {
      time: "11:00 AM",
      title: "Project Expo",
      description: "Demo your work and explore what other teams built.",
    },
    {
      time: "01:00 PM",
      title: "Closing Ceremony",
      description: "Celebrate the weekend and announce the award winners.",
    },
  ],
};
