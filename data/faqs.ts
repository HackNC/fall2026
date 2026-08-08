export type FaqItem = {
  question: string;
  /**
   * Track length shown on the right of the FAQ playlist, "m:ss".
   *
   * Flavour, not a measurement — the values come from the mockup. The player
   * parses these and sums them for its total, so the running time stays right
   * no matter what is added, removed or reordered here.
   */
  duration: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What is a hackathon?",
    duration: "1:50",
    answer:
      "A hackathon is a weekend of fun and learning. You'll become a better programmer, meet awesome people, and make cool projects. There will also be opportunities to win fun prizes and network with our sponsors.",
  },
  {
    question: "Is this hackathon in-person or hybrid?",
    duration: "0:20",
    answer:
      "This year, we are running a completely in-person hackathon! We have lots of fun events and workshops for you all, and most importantly, free food!",
  },
  {
    question: "Do I need extensive coding knowledge for HackNC?",
    duration: "3:06",
    answer:
      "Not at all! HackNC is a completely beginner-friendly event, and we have a project track specifically for beginners. We'll have plenty of resources to help you get started, including beginner workshops, mentors, and more.",
  },
  {
    question: "How do teams work?",
    duration: "4:01",
    answer:
      "Teams can be organized prior to HackNC or during the event itself. If you are already in a team, then you're all set! If not, that's completely fine! We have a team-building event, where you can meet other participants and form your teams. We strongly recommend around 3-4 members.",
  },
  {
    question: "Where do I park?",
    duration: "5:10",
    answer:
      "Parking will be free over the weekend. Please find availability in Rams Deck, Craige Deck, or Cobb Deck.",
  },
];
