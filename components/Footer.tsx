import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { socials } from "@/data/socials";

const icons: Record<string, React.ReactNode> = {
  Email: <FaEnvelope className="h-5 w-5" aria-hidden="true" />,
  Instagram: <FaInstagram className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />,
};

export default function Footer() {
  return (
    <footer>
      {/* Clear space above the rule so it sits low, over the page background. */}
      <div className="h-14" />

      {/* Notched rule: raised on the left, stepping down to the right. */}
      <div aria-hidden="true" className="flex h-[26px] items-stretch">
        <div className="relative h-[26px] w-[38%] border-t-2 border-[#b9cee8] bg-white">
          <span className="absolute top-3 right-3 h-[9px] w-16 bg-[repeating-linear-gradient(to_right,#4a7fc1_0_2px,transparent_2px_5px)]" />
        </div>
        <svg
          viewBox="0 0 24 26"
          preserveAspectRatio="none"
          className="h-[26px] w-6 shrink-0 text-[#b9cee8]"
        >
          <polygon points="0,1 24,25 24,26 0,26" fill="white" />
          <line
            x1="0"
            y1="1"
            x2="24"
            y2="25"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="h-0 flex-1 self-end border-t-2 border-[#b9cee8]" />
      </div>

      <div className="flex flex-col items-center gap-6 bg-white pt-3 pb-6 sm:flex-row sm:justify-between sm:gap-8 sm:pb-3">
        <div className="flex w-full max-w-[42rem] items-center gap-5 rounded-r-2xl bg-gradient-to-r from-[#7e9dcb] to-[#a5bddf] px-6 py-5 sm:px-8">
          <p className="font-title text-section whitespace-nowrap text-white">
            find us here
          </p>
          <span aria-hidden="true" className="h-0.5 flex-1 bg-white/90" />
          <ul className="flex items-center gap-4">
            {socials.map((social) => {
              const isExternal = !social.href.startsWith("mailto:");

              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    aria-label={social.name}
                    className="block text-white transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {icons[social.name]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="px-6 text-center font-mono text-sm font-semibold text-ink sm:px-8 sm:text-base lg:px-10 xl:px-12">
          {"made with <3 by the hacknc graphics + dev team"}
        </p>
      </div>
    </footer>
  );
}
