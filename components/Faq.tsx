import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <section className="max-w-5xl mx-auto py-16 sm:py-20">
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer items-center gap-3 py-4 text-base sm:text-lg leading-6 text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <span className="text-slate-950 transition-transform duration-200 group-open:rotate-180 motion-safe:duration-200">
                ▾
              </span>
              <span>{faq.question}</span>
            </summary>
            <div className="pb-4 text-sm leading-7 text-slate-700">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
