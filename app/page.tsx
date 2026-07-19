import Faq from "@/components/Faq";
import Sponsors from "@/components/Sponsors";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 py-10 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-24">
        <Hero />
        <Faq />
        <Sponsors />
      </div>
    </main>
  );
}
