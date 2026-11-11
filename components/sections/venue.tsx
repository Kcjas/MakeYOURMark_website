import { CottonTuft, Offcuts, PaintSplat, Tape } from "@/components/doodles";
import { AddToCalendar } from "@/components/add-to-calendar";
import { vars } from "@/components/paper";
import { when } from "@/lib/content";

export function Venue() {
  return (
    <section aria-labelledby="where-h" className="relative px-4 pb-24 pt-2 sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute right-[12%] top-0 hidden h-72 w-[26rem] lg:block" aria-hidden>
        <PaintSplat className="absolute left-0 top-4 h-40 w-auto rotate-6" color="var(--color-sunflower)" kind="spatter" />
        <Offcuts className="absolute right-0 top-16 h-28 w-auto -rotate-12" variant={2} />
        <CottonTuft className="absolute bottom-6 left-40 h-10 w-auto rotate-12" />
      </div>
      <div className="tilt relative w-fit sm:ml-[6%]" style={vars({ "--r": "var(--tilt-b)" })}>
        <Tape className="absolute -top-3 left-10 z-10 h-8 w-28 -rotate-2" />
        <div className="cut-md">
          <div className="torn-all bg-grass px-7 pb-7 pt-9 text-ink">
            <h2 id="where-h" className="text-[clamp(2.6rem,11vw,5rem)] font-black leading-[0.9]">
              See you at
              <br />
              {when.place}
            </h2>
            <p className="mt-3 text-lg font-bold">
              <span className="whitespace-nowrap">{when.day}</span> ·{" "}
              <span className="whitespace-nowrap">{when.time}</span> ·{" "}
              <span className="whitespace-nowrap">just walk in</span>
            </p>
          </div>
        </div>
      </div>
      {/* opens upward: the footer sits right below */}
      <div className="relative z-10 mt-7 ml-3 sm:ml-[calc(6%+0.75rem)]">
        <AddToCalendar tilt="var(--tilt-a)" seed={83} up />
      </div>
    </section>
  );
}
