export type Resource = {
  title: string;
  description: string;
  href: string;
};

export type ResourceCategory = {
  title: string;
  resources: Resource[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    title: "Guides & Past Projects",
    resources: [
      {
        title: "HackNC 2024 on Devpost",
        description: "Browse every project submitted at last year's hackathon.",
        href: "https://hacknc-2024.devpost.com",
      },
      {
        title: "HackNC 2023 on Devpost",
        description: "See what past hackers built for inspiration.",
        href: "https://hacknc-2023.devpost.com",
      },
      {
        title: "MLH Hackathon Guide",
        description: "Everything a first-time hacker needs to know.",
        href: "https://guide.mlh.io",
      },
      {
        title: "Submitting on Devpost",
        description: "How to enter your project before the deadline.",
        href: "https://help.devpost.com/hc/en-us/articles/360054999651",
      },
    ],
  },
  {
    title: "Tools & Workshops",
    resources: [
      {
        title: "GitHub Student Developer Pack",
        description: "Free developer tools and credits for students.",
        href: "https://education.github.com/pack",
      },
      {
        title: "MLH Code of Conduct",
        description: "The community standards every hacker agrees to.",
        href: "https://mlh.io/code-of-conduct",
      },
      {
        title: "Figma for Education",
        description: "Design your UI with a free education plan.",
        href: "https://www.figma.com/education/",
      },
      {
        title: "Next.js Learn",
        description: "A hands-on course for building your first web app.",
        href: "https://nextjs.org/learn",
      },
    ],
  },
];
