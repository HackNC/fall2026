import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HostInterest from "@/components/HostInterest";
import MLHBadge from "@/components/MLHBadge";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <MLHBadge />
      <Nav />
      <main>
        <Hero />
        <About />
        <HostInterest />
      </main>
      <Footer />
    </>
  );
}
