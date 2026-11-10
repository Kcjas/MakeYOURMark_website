import { BinderClip, Handprint, PipeCleanerFlower, Pushpin, SquishyBlob, Tape } from "@/components/doodles";
import { TimeTag, vars } from "@/components/paper";
import { stations } from "@/lib/content";

const [flowers, squishies, board] = stations;

export function Stations() {
  return (
    <section
      aria-labelledby="stations-h"
      className="cork-texture relative bg-cork px-4 pb-20 pt-16 sm:px-8 lg:px-14 lg:pb-28 lg:pt-20"
      style={vars({ "--shade": "var(--color-cork-shade)" })}
    >
      <div className="relative w-fit">
        <Pushpin className="absolute -top-4 left-[45%] z-10 size-10" />
        <div className="tilt cut-sm" style={vars({ "--r": "var(--tilt-d)" })}>
          <div className="torn-all bg-card px-6 pb-4 pt-5">
            <h2 id="stations-h" className="text-[clamp(2.4rem,9vw,3.75rem)] font-black leading-none">
              Pick a table
            </h2>
            <p className="mt-1 font-bold">Or do all three. Nobody&rsquo;s checking.</p>
          </div>
        </div>
      </div>

      <ul className="mt-14 grid gap-y-4 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
        {/* 1. sticky note, pinned */}
        <li className="relative w-[88%] max-w-sm lg:col-span-4 lg:w-auto lg:max-w-none">
          <Pushpin className="absolute -top-4 left-1/2 z-10 size-10 -translate-x-1/2" />
          <article
            className="wiggle tilt cut-md relative origin-top bg-sunflower px-6 pb-7 pt-8"
            style={vars({ "--r": "var(--tilt-a)" })}
          >
            <PipeCleanerFlower className="absolute -right-4 -top-10 h-36 w-auto rotate-12 sm:h-40" />
            <h3 className="pr-20 text-[2.5rem] font-black leading-[0.9]">{flowers.name}</h3>
            <p className="mt-3 max-w-[26ch]">{flowers.line}</p>
            <TimeTag time={flowers.time} seed={41} />
          </article>
        </li>

        {/* 2. pinking-shear card, taped */}
        <li className="relative -mt-2 ml-auto w-[90%] max-w-sm lg:col-span-4 lg:col-start-6 lg:mt-24 lg:ml-0 lg:w-auto lg:max-w-none">
          <article className="wiggle tilt relative" style={vars({ "--r": "var(--tilt-b)" })}>
            <div className="cut-md">
              <div className="pinked bg-tomato px-7 pb-8 pt-7">
                <SquishyBlob className="float-right -mr-2 -mt-1 ml-2 h-24 w-auto" />
                <h3 className="text-[2.5rem] font-black leading-[0.9]">{squishies.name}</h3>
                <p className="mt-3 clear-right max-w-[28ch]">{squishies.line}</p>
                <TimeTag time={squishies.time} seed={42} />
              </div>
            </div>
            <Tape className="absolute -left-5 -top-1 h-7 w-24 -rotate-[38deg]" />
            <Tape className="absolute -right-5 -top-1 h-7 w-24 rotate-[36deg]" />
          </article>
        </li>

        {/* 3. big shared board, binder-clipped */}
        <li className="relative mt-10 lg:col-span-9 lg:col-start-3 lg:-mt-4">
          <BinderClip className="absolute -top-8 left-10 z-10 h-14 w-auto" />
          <article className="wiggle tilt relative origin-top-left" style={vars({ "--r": "var(--tilt-c)" })}>
            <div className="cut-md">
              <div className="torn relative overflow-hidden bg-cobalt px-7 pb-9 pt-10 text-card sm:grid sm:min-h-[17rem] sm:grid-cols-[1fr_16rem] sm:gap-6">
                <div className="relative order-2 h-32 sm:h-auto" aria-hidden>
                  <Handprint className="absolute left-0 top-0 h-28 w-auto -rotate-12 text-tomato sm:left-2 sm:top-2" />
                  <Handprint className="absolute left-[24%] top-3 h-24 w-auto rotate-[10deg] text-sunflower sm:left-32 sm:top-2" />
                  <Handprint className="absolute left-[50%] top-0 h-28 w-auto -rotate-[4deg] text-grass sm:left-8 sm:top-32" />
                  <Handprint className="absolute left-[74%] top-4 h-24 w-auto rotate-[18deg] text-card sm:left-40 sm:top-32" />
                </div>
                <div className="order-1 mt-4 sm:mt-0">
                  <h3 className="text-[2.5rem] font-black leading-[0.9] sm:text-6xl">{board.name}</h3>
                  <p className="mt-3 max-w-[34ch]">{board.line}</p>
                  <TimeTag time={board.time} seed={43} className="text-card" />
                </div>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </section>
  );
}
