import { BriefcaseBusiness, Camera, Code2 } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/HackNC",
    label: "HackNC on GitHub",
    icon: Code2,
  },
  {
    href: "https://www.instagram.com/thehacknc/",
    label: "HackNC on Instagram",
    icon: Camera,
  },
  {
    href: "https://www.linkedin.com/company/hacknc/",
    label: "HackNC on LinkedIn",
    icon: BriefcaseBusiness,
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row sm:px-8">
        <p className="font-mono text-xs tracking-[0.14em] uppercase">
          Made with care in Chapel Hill
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
