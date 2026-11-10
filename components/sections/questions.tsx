import { CottonTuft, Offcuts, PaintSplat, Tape } from "@/components/doodles";
import { Faq } from "@/components/faq";
import { Rough, roughPaths } from "@/components/rough";
import { faqs } from "@/lib/content";

const plus = roughPaths(
  [
    { kind: "line", from: [20, 5], to: [20, 35] },
    { kind: "line", from: [5, 20], to: [35, 20] },
  ],
  { seed: 31, roughness: 1, disableMultiStroke: true },
);

export function Questions() {
  return (
    <section aria-labelledby="faq-h" className="relative px-4 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="pointer-events-none absolute left-14 top-40 hidden h-96 w-72 lg:block" aria-hidden>
        <PaintSplat className="absolute left-4 top-0 h-40 w-auto -rotate-12" color="var(--color-tomato)" kind="smear" />
        <CottonTuft className="absolute left-44 top-20 h-12 w-auto" />
        <Offcuts className="absolute bottom-0 left-0 h-24 w-auto rotate-12" variant={1} />
      </div>
      <div className="mx-auto max-w-3xl lg:mr-[8%]">
        <h2 id="faq-h" className="relative w-fit text-[clamp(2.4rem,9vw,4rem)] font-black leading-[0.95]">
          <Tape className="absolute -right-16 -top-1 h-7 w-20 rotate-[28deg]" />
          Stuff people ask
          <Rough
            w={300}
            h={20}
            stretch
            className="absolute -bottom-3 left-0 h-4 w-full text-grass"
            shapes={[{ kind: "curve", points: [[2, 12], [80, 6], [170, 14], [298, 7]] }]}
            options={{ seed: 17, strokeWidth: 5, roughness: 1.2 }}
          />
        </h2>
        <div className="mt-10">
          <Faq items={faqs} plus={plus} />
        </div>
      </div>
    </section>
  );
}
