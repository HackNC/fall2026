import { ArrowUpRight } from "lucide-react";
import { resourceCategories } from "@/data/resources";

const orbClasses =
  "rounded-full bg-radial-[at_30%_25%] from-white via-[#D5FF82] to-[#147842] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.7)]";

export default function ResourceList() {
  return (
    <section
      aria-labelledby="resources-heading"
      className="min-h-[70vh] bg-linear-to-b from-[#BAEFFF] to-[#1554C9] py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-3 bg-linear-to-b from-[#D5FF82] to-[#147842] px-4 py-2.5 sm:px-6">
            <span
              aria-hidden="true"
              className={`grid size-6 shrink-0 place-items-center text-[10px] font-bold text-[#0b4a28] ${orbClasses}`}
            >
              ?
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/60" />
            <h1
              id="resources-heading"
              className="font-[Tahoma,Verdana,sans-serif] text-lg font-bold tracking-wide text-[#0b4a28] lowercase sm:text-xl"
            >
              resources
            </h1>
            <span aria-hidden="true" className="h-px flex-1 bg-white/60" />
            <span aria-hidden="true" className="flex shrink-0 gap-1.5">
              <span className={`size-3.5 ${orbClasses}`} />
              <span className={`size-3.5 ${orbClasses}`} />
            </span>
          </header>
          <div className="bg-white/95 p-6 sm:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              {resourceCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={
                    index > 0
                      ? "md:border-l md:border-[#BAEFFF] md:pl-10"
                      : "md:pr-10"
                  }
                >
                  <h2 className="font-[Tahoma,Verdana,sans-serif] text-sm font-bold tracking-[0.12em] text-[#147842] uppercase">
                    {category.title}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {category.resources.map((resource) => (
                      <li key={resource.title}>
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group block rounded-2xl border border-[#BAEFFF] bg-linear-to-b from-white to-[#EAF9FF] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1554C9]"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-[#1554C9]">
                              {resource.title}
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-[#1554C9] opacity-60 transition group-hover:opacity-100"
                            />
                          </span>
                          <span className="mt-1 block text-sm text-slate-600">
                            {resource.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
