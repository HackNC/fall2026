"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-foreground">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 w-full max-w-5xl items-center justify-between gap-6 px-6 pr-28 sm:px-8 sm:pr-36"
      >
        <Link
          href="/"
          className="font-display text-xl font-black tracking-tight text-accent uppercase"
        >
          HackNC
        </Link>
        <div className="flex items-center gap-5 sm:gap-8">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 py-2 font-mono text-xs font-semibold tracking-[0.16em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground hover:border-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
