import Image from "next/image";
import Link from "next/link";

const internalLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Schedule", href: "/schedule" },
];

export default function Navigation() {
  return (
    <header className="border-b border-slate-200">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10 xl:px-12"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="HackNC home"
        >
          <Image
            src="/hacknc-logo.png"
            alt="HackNC logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-base font-semibold text-slate-950">HackNC</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
          {internalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-slate-950"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="#" className="transition-colors hover:text-slate-950">
              Portal
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfMx28v4vb33tfTGMJoqbkKMWl2Js5JSXjX9wPYvMZiHOpRCQ/viewform"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-4 py-2 text-white transition-colors hover:bg-slate-800"
            >
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
