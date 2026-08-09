import { ArrowUpRight } from "lucide-react";
import { glossyOrb } from "@/components/glossyOrb";
import WindowFrame from "@/components/WindowFrame";
import { resourceCategories } from "@/data/resources";

export default function ResourceList() {
  return (
    <section aria-labelledby="resources-heading" className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6">
        <WindowFrame
          variant="green"
          titleBarClassName="min-h-[70px] px-4 sm:px-6"
          titleBar={
            <>
              {/*
                Window chrome is pure decoration — the "?" and the circles do
                nothing — so they are aria-hidden spans, never focusable.
              */}
              <span
                aria-hidden="true"
                className={glossyOrb(
                  "grid size-9 place-items-center font-body text-lg font-bold text-white [text-shadow:0_1px_2px_rgba(20,120,66,0.65)] sm:size-[43px] sm:text-2xl"
                )}
              >
                ?
              </span>
              <div className="flex flex-1 items-center justify-center gap-3 sm:gap-6">
                <span
                  aria-hidden="true"
                  className="h-[3px] w-6 bg-forest sm:w-32"
                />
                <h1
                  id="resources-heading"
                  className="font-title text-2xl tracking-[0.05em] text-forest lowercase sm:text-4xl"
                >
                  resources
                </h1>
                <span
                  aria-hidden="true"
                  className="h-[3px] w-6 bg-forest sm:w-32"
                />
              </div>
            </>
          }
          controls={
            <span aria-hidden="true" className="flex shrink-0 gap-[19px]">
              <span className={glossyOrb("size-6 sm:size-7")} />
              <span className={glossyOrb("size-6 sm:size-7")} />
            </span>
          }
        >
          {/* Divider rule spanning the window's inner width. */}
          <span aria-hidden="true" className="block h-px bg-forest/25" />

          {/* White content panel, inset ~2.3% from the window's edges. */}
          <div className="p-[2.3%]">
            <div className="rounded-[10px] bg-white px-5 py-6 shadow-[0_4px_4px_rgba(20,120,66,0.2),inset_0_4px_4px_rgba(20,120,66,0.2)] sm:px-8 sm:py-10">
              <div className="grid gap-10 md:grid-cols-2">
                {resourceCategories.map((category, index) => (
                  <div
                    key={category.title}
                    className={
                      index > 0
                        ? "md:border-l md:border-lime md:pl-10"
                        : "md:pr-10"
                    }
                  >
                    <h2 className="font-body text-xl tracking-[0.05em] text-forest lowercase sm:text-2xl">
                      {category.title}
                    </h2>
                    <ul className="mt-5 space-y-4">
                      {category.resources.map((resource) => (
                        <li key={resource.title}>
                          <a
                            href={resource.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group block rounded-2xl border border-lime bg-linear-to-b from-white to-lime/20 p-4 shadow-sm motion-safe:transition hover:shadow-md motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-body text-lg font-semibold tracking-[0.05em] text-forest sm:text-2xl">
                                {resource.title}
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 shrink-0 text-forest opacity-60 motion-safe:transition group-hover:opacity-100"
                              />
                            </span>
                            <span className="mt-1 block font-body text-sm tracking-[0.05em] text-forest sm:text-base">
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
        </WindowFrame>
      </div>
    </section>
  );
}
