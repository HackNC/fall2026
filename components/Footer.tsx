import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { socials } from "@/data/socials";

const icons: Record<string, React.ReactNode> = {
  LinkedIn: <FaLinkedin className="h-6 w-6" aria-hidden="true" />,
  Instagram: <FaInstagram className="h-6 w-6" aria-hidden="true" />,
  Email: <FaEnvelope className="h-6 w-6" aria-hidden="true" />,
};

export default function Footer() {
  return (
    <footer className="relative mt-16 pt-8">
      {/*
        The band steps up on the left, so it is a clipped white layer rather
        than a plain background. drop-shadow follows the clip path; box-shadow
        would trace the unclipped box instead.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [filter:drop-shadow(0_-3px_2px_rgba(23,55,113,0.35))]"
      >
        <div className="size-full bg-white [clip-path:polygon(0_0,37.15%_0,39.41%_31px,100%_31px,100%_100%,0_100%)]" />
        {/* Grip detail sitting on the taller left half of the step. */}
        <div className="absolute top-[18px] left-[31.7%] h-[9px] w-[66px] bg-[repeating-linear-gradient(to_right,rgba(21,84,201,0.7)_0_3.5px,transparent_3.5px_7px)]" />
      </div>

      <div className="relative flex flex-col gap-6 pt-8 pb-8 sm:flex-row sm:items-center sm:gap-0 sm:pt-11 sm:pb-10">
        <div className="flex w-full shrink-0 items-center gap-5 rounded-r-[10px] bg-linear-to-r from-[#769FDC] to-[#78A1BE] py-4 pr-6 pl-6 sm:w-[50.6%] sm:gap-4 sm:pr-10 sm:pl-13">
          <p className="font-title text-xl tracking-[0.05em] whitespace-nowrap text-white sm:text-2xl">
            find us here
          </p>
          <span
            aria-hidden="true"
            className="h-[3px] min-w-6 flex-1 bg-white/80"
          />
          <ul className="flex shrink-0 items-center gap-4">
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
                  className="block rounded text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {icons[social.name]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="px-6 font-body text-base tracking-[0.05em] text-ink sm:pr-10 sm:pl-9 sm:text-lg">
          made with &lt;3 by the hacknc graphics + dev team
        </p>
      </div>
    </footer>
  );
}
