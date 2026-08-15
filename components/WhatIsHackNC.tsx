import SpinningCd from "@/components/SpinningCd";

export default function WhatIsHackNC() {
  return (
    <section aria-labelledby="what-is-hacknc-heading">
      <div className="mx-4 grid items-center gap-10 sm:mx-8 lg:mx-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
        {/* Blue frame with the white panel inset, as in the mockup: the frame
            shows through as a title bar above and a thin border elsewhere. */}
        <div className="relative rounded-[22px] bg-linear-to-br from-[#2b62c4] from-0% via-[#5f93dd] via-55% to-[#a8c6ec] to-100% p-2 pt-3 shadow-[0_10px_28px_rgba(23,55,113,0.28)] sm:rounded-[26px] sm:p-2.5 sm:pt-4">
          <div className="flex items-center justify-between gap-4 px-4 pb-3 sm:px-6">
            <h2
              id="what-is-hacknc-heading"
              className="font-title text-xl tracking-[0.02em] text-white [text-shadow:0_2px_6px_rgba(23,55,113,0.55)] sm:text-2xl"
            >
              What is HackNC ?
            </h2>
            <span aria-hidden="true" className="flex shrink-0 gap-1.5">
              <i className="block h-4 w-[3px] -skew-x-[28deg] rounded-full bg-white/85" />
              <i className="block h-4 w-[3px] -skew-x-[28deg] rounded-full bg-white/60" />
              <i className="block h-4 w-[3px] -skew-x-[28deg] rounded-full bg-white/40" />
            </span>
          </div>

          <div className="space-y-5 rounded-[16px] rounded-tr-[34px] bg-white px-6 py-7 shadow-[0_2px_6px_rgba(23,55,113,0.18)] sm:px-9 sm:py-9">
            <p className="font-body text-base leading-7 tracking-[0.01em] text-ink sm:text-lg sm:leading-8">
              HackNC is a weekend for students of all skill levels to broaden
              their talents. Your challenge is to make an awesome project in
              just 24 hours.
            </p>
            <p className="font-body text-base leading-7 tracking-[0.01em] text-ink sm:text-lg sm:leading-8">
              You will have access to hands-on tech workshops, sponsor
              networking, as well as exciting talks about the awesome things
              happening right now with computer science and technology &ndash;
              not to mention all of the free food, shirts, stickers, and swag!
            </p>
          </div>
        </div>

        <SpinningCd />
      </div>
    </section>
  );
}
