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
  /**
   * Turns the answer into a link. The MLH code of conduct is published by MLH
   * rather than restated here, which is how fall2025 handled it too.
   */
  answerHref?: string;
};

/*
 * Questions and answers carried over verbatim from fall2025.hacknc.com; the
 * order matches the FAQ playlist in the Figma.
 */
export const faqs: FaqItem[] = [
  {
    question: "What is a hackathon?",
    duration: "1:50",
    answer:
      "A hackathon is a weekend of fun and learning. You'll become a better builder, meet awesome people, and make cool projects. There will also be opportunities to win fun prizes and network with our sponsors.",
  },
  {
    question: "Who can hack?",
    duration: "1:00",
    answer:
      "If you are a student at UNC, there is no age requirement. Otherwise, you must be 18 years of age or older to attend. High schoolers, undergraduates, and graduate students from any school are welcome to participate as hackers.",
  },
  {
    question: "Is this hackathon in-person or hybrid?",
    duration: "0:20",
    answer:
      "HackNC is fully in-person! We'll have fun events, free food, and workshops for everyone!",
  },
  {
    question: "Where do I park?",
    duration: "5:10",
    answer:
      "Parking will be free over the weekend. Please find availability in Rams Deck, Craige Deck, or Cobb Deck.",
  },
  {
    question: "What is the MLH Code of Conduct?",
    duration: "2:01",
    answer: "You can find the official MLH Code of Conduct here.",
    answerHref:
      "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
  },
  {
    question: "Do I need extensive coding knowledge for HackNC?",
    duration: "3:06",
    answer:
      "Not at all! HackNC is a completely beginner friendly event, with a project track specifically for beginners. We'll have plenty of resources to help you get started, including beginner workshops, mentors, and more.",
  },
  {
    question: "How do teams work?",
    duration: "4:01",
    answer:
      "You can come in with or without a team, we recommend 3-4 members. We'll have a team building event if you're looking for teammates!",
  },
  {
    question: "Will travel be reimbursed?",
    duration: "2:33",
    answer:
      "Unfortunately, we will not be able to offer travel reimbursements this year. We encourage students to reach out to their CS departments for potential funding.",
  },
];
