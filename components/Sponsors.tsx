import Image from "next/image";
import { sponsors } from "@/data/sponsors";

const gridPlacement = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-start-2 lg:col-span-2",
  "lg:col-start-4 lg:col-span-2",
];

export default function Sponsors() {
  return (
    <section className="max-w-5xl mx-auto py-16 sm:py-20">
      <div className="text-center">
        <p className="text-base sm:text-lg font-semibold text-slate-950">
          Brought to you by our sponsors
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {sponsors.map((sponsor, index) => (
          <div
            key={sponsor.name}
            className={`${gridPlacement[index]} flex justify-center`}
          >
            <Image
              src={sponsor.logoSrc}
              alt={sponsor.alt}
              width={sponsor.width}
              height={sponsor.height}
              className="h-[72px] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
