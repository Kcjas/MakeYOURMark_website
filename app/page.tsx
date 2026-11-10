import { SvgFilters } from "@/components/doodles";
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
      <main>
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
