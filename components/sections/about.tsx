import { PaintSmear, PaintSplat, Tape } from "@/components/doodles";
import { vars } from "@/components/paper";
import { Rough } from "@/components/rough";

export function About() {
  return (
    <section aria-labelledby="about-h" className="px-4 pb-20 pt-4 sm:px-8 lg:px-14 lg:pb-28">
      <div className="relative mx-auto max-w-2xl lg:ml-[12%]">
        <div className="pointer-events-none absolute -right-[22rem] top-6 hidden h-64 w-72 lg:block" aria-hidden>
          <PaintSplat className="absolute right-6 top-0 h-32 w-auto -rotate-[20deg]" color="var(--color-grass)" kind="spatter" />
          <PaintSmear className="absolute bottom-6 left-0 h-14 w-60 rotate-[8deg]" color="var(--color-tomato)" />
        </div>
        <Tape className="absolute -top-3 left-6 z-10 h-7 w-28 -rotate-6" />
        <Tape className="absolute -top-2 right-8 z-10 h-7 w-20 rotate-[5deg]" />
        <div className="tilt cut-md" style={vars({ "--r": "var(--tilt-c)", "--shade": "var(--color-sunflower)" })}>
          <div className="torn relative bg-card py-10 pl-10 pr-6 sm:pl-14 sm:pr-10">
            <span className="absolute inset-y-0 left-6 w-0.5 bg-tomato/45 sm:left-9" aria-hidden />
            <h2 id="about-h" className="text-[clamp(2.4rem,9vw,3.75rem)] font-black leading-[0.95]">
              Three hours of making stuff
            </h2>
            <div className="ruled mt-4 max-w-[52ch] text-lg leading-8">
              <p>A chill craft night: three tables, a pile of supplies, and a whole evening to mess around with them.</p>
              <p>You don&rsquo;t need to be good at art. You just need hands.</p>
              <p>
                Whatever you make, you{" "}
                <span className="relative inline-block whitespace-nowrap px-1 font-bold">
                  take home
                  <Rough
                    w={100}
                    h={40}
                    stretch
                    className="absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] text-tomato"
                    shapes={[{ kind: "ellipse", cx: 50, cy: 20, w: 98, h: 36 }]}
                    options={{ seed: 4, strokeWidth: 2.5, roughness: 1.8 }}
                  />
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-14 right-0 flex items-end gap-1 text-cobalt sm:-right-10" aria-hidden>
          <Rough
            w={70}
            h={50}
            className="mb-5 h-12 w-16"
            shapes={[
              { kind: "curve", points: [[66, 44], [40, 40], [16, 20], [8, 4]] },
              { kind: "linear", points: [[2, 16], [8, 4], [20, 10]] },
            ]}
            options={{ seed: 9, strokeWidth: 2.5, roughness: 1.1 }}
          />
          <span className="-rotate-6 font-display text-2xl">yes, really</span>
        </div>
      </div>
    </section>
  );
}
