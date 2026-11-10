import { SvgFilters } from "@/components/doodles";
import { PencilLine } from "@/components/pencil-line";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { Hero, HeroTop } from "@/components/sections/hero";
import { Questions } from "@/components/sections/questions";
import { Stations } from "@/components/sections/stations";
import { Venue } from "@/components/sections/venue";

export default function Home() {
  return (
    <>
      <SvgFilters />
      <HeroTop />
      <main className="relative isolate">
        <PencilLine />
        <Hero />
        <About />
        <Stations />
        <Questions />
        <Venue />
      </main>
      <Footer />
    </>
  );
}
