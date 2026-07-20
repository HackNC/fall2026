import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { socials } from "@/data/socials";

const icons: Record<string, React.ReactNode> = {
  LinkedIn: <FaLinkedin className="h-5 w-5" aria-hidden="true" />,
  Instagram: <FaInstagram className="h-5 w-5" aria-hidden="true" />,
  Email: <FaEnvelope className="h-5 w-5" aria-hidden="true" />,
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between sm:px-8 lg:px-10 xl:px-12">
        <p className="text-sm text-slate-700">
          HackNC 2026
        </p>
        <ul className="flex items-center gap-5">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target={
                  social.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  social.href.startsWith("mailto:") ? undefined : "noreferrer"
                }
                aria-label={social.name}
                className="text-slate-700 transition-colors hover:text-slate-950"
              >
                {icons[social.name]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
