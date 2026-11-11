import { AddToCalendar } from "@/components/add-to-calendar";
import { Countdown } from "@/components/countdown";
import {
  CottonTuft,
  FreeSticker,
  Offcuts,
  PaintSmear,
  PaintSplat,
  PipeCleanerWire,
  Tape,
  WireOver,
} from "@/components/doodles";
import { DrawnWord } from "@/components/drawn-word";
import { Strip, vars } from "@/components/paper";
import { Rough, roughPaths } from "@/components/rough";
import { when } from "@/lib/content";

const frames = [11, 12, 13, 14].map((seed) =>
  roughPaths([{ kind: "rect", x: 4, y: 4, w: 92, h: 92 }], { seed, roughness: 1.7, strokeWidth: 3 }),
);

/** Byline + sticker. The event facts live in <main> (see Hero). */
export function HeroTop() {
  return (
    <header className="relative flex items-start justify-between gap-4 px-4 pt-5 sm:px-8 lg:px-14 lg:pt-8">
      <p className="slap pt-2 font-display text-xl leading-none" style={vars({ "--d": "1850ms" })}>
        EnROOT Group 6
      </p>
      {/* on phones the sticker is stuck over the title's corner so the header stays one line tall */}
      <div
        className="tilt wiggle slap absolute right-3 top-3 z-40 shrink-0 lg:static lg:-mr-1"
        style={vars({ "--r": "8deg", "--d": "1850ms" })}
      >
        <FreeSticker className="size-[6.25rem] lg:size-32" />
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="title" className="relative isolate z-10 px-4 pb-16 sm:px-8 lg:px-14 lg:pb-24">
      <div className="relative mt-3 lg:mt-0">
        <PipeCleanerWire
          vertical
          className="absolute -left-4 -top-6 -z-10 h-[calc(100%+3rem)] w-[calc(100%+2rem)] lg:hidden"
        />
        <PipeCleanerWire className="absolute -left-14 top-0 -z-10 hidden h-full w-[calc(100%+7rem)] lg:block" />
        <h1
          id="title"
          className="flex flex-col font-black leading-[0.8] text-[clamp(4rem,min(28vw,12.5svh),9rem)] lg:flex-row lg:items-start lg:text-[min(15vw,14.5rem)]"
        >
          <span className="sr-only">MakeYourMark</span>
          <Strip paper="bg-tomato" tilt="var(--tilt-a)" className="relative z-10" delay={600}>
            <DrawnWord word="Make" start={800} ink="var(--color-ink)" />
          </Strip>
          <Strip
            paper="bg-grass"
            tilt="var(--tilt-b)"
            delay={680}
            className="relative z-20 -mt-1 self-end lg:-ml-8 lg:mt-20 lg:self-auto"
            overlay={<WireOver className="absolute -left-[0.06em] -top-10 z-30 hidden h-[calc(100%+1rem)] w-auto lg:block" />}
          >
            <DrawnWord word="Your" start={980} ink="var(--color-ink)" />
          </Strip>
          <Strip
            paper="bg-cobalt"
            tilt="var(--tilt-c)"
            delay={760}
            className="relative z-30 -mt-1 ml-[5%] lg:-ml-8 lg:mt-1"
          >
            <DrawnWord word="Mark" start={1160} ink="var(--color-card)" />
          </Strip>
        </h1>
      </div>

      <div className="mt-5 flex flex-col gap-7 sm:mt-9 sm:gap-12 lg:mt-14 lg:flex-row lg:items-end lg:gap-20">
        {/* z-20: the open calendar scrap has to sit over the countdown below it on phones */}
        <div className="relative z-20 flex flex-col items-start gap-6">
          <div className="tilt slap relative w-fit" style={vars({ "--r": "var(--tilt-b)", "--d": "1950ms" })}>
            <Tape className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3" />
            <div className="cut-md">
              <div className="torn-all bg-card px-6 pb-5 pt-6">
                <p className="font-display text-[2.6rem] font-black leading-none">
                  <time dateTime={when.isoStart}>{when.day}</time>
                </p>
                <p className="font-display text-3xl leading-tight">{when.time}</p>
                <p className="mt-1 text-lg font-bold">{when.place}, SUTD</p>
              </div>
            </div>
          </div>

          <div className="slap ml-2" style={vars({ "--d": "2020ms" })}>
            <AddToCalendar tilt="var(--tilt-c)" seed={71} />
          </div>
        </div>

        <div className="slap relative w-fit" style={vars({ "--d": "2100ms" })}>
          <PaintSmear className="absolute -left-5 top-7 -z-10 h-24 w-[calc(100%+2.5rem)] sm:h-28" />
          <Countdown frames={frames} />
        </div>
      </div>

      {/* table debris, desktop only: the session is mid-way */}
      <div
        className="slap pointer-events-none absolute bottom-10 right-14 hidden h-72 w-[30rem] lg:block"
        style={vars({ "--d": "2050ms" })}
        aria-hidden
      >
        <PaintSplat className="absolute right-10 top-0 h-36 w-auto rotate-12" color="var(--color-cobalt)" kind="smear" />
        <Offcuts className="absolute bottom-4 left-0 h-28 w-auto -rotate-6" variant={0} />
        <CottonTuft className="absolute right-48 top-10 h-12 w-auto" />
                <Rough
          w={160}
          h={90}
          className="absolute bottom-24 right-28 h-24 w-44 text-ink/70"
          shapes={[{ kind: "curve", points: [[6, 60], [30, 20], [50, 70], [74, 22], [96, 66], [120, 26], [150, 50]] }]}
          options={{ seed: 61, strokeWidth: 1.6, roughness: 1.4 }}
        />
      </div>
    </section>
  );
}
