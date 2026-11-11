import { Rough } from "@/components/rough";
import { CalendarMenu } from "@/components/calendar-menu";

/** Sunflower paper label that opens a taped scrap of calendar choices.
 *  Doodles are drawn here on the server so roughjs never ships to the phone. */
export function AddToCalendar({ tilt, seed, up }: { tilt: string; seed: number; up?: boolean }) {
  return (
    <CalendarMenu
      tilt={tilt}
      up={up}
      icon={
        <Rough
          w={30}
          h={30}
          className="size-7 shrink-0"
          shapes={[
            { kind: "rect", x: 3, y: 6, w: 24, h: 21 },
            { kind: "line", from: [3, 13], to: [27, 13] },
            { kind: "line", from: [10, 2], to: [10, 9] },
            { kind: "line", from: [20, 2], to: [20, 9] },
          ]}
          options={{ seed, strokeWidth: 2.4, roughness: 1.1 }}
        />
      }
      caret={
        <Rough
          w={18}
          h={14}
          className="h-3.5 w-[1.125rem]"
          shapes={[{ kind: "linear", points: [[3, 4], [9, 10], [15, 4]] }]}
          options={{ seed: seed + 1, strokeWidth: 2.8, roughness: 0.9 }}
        />
      }
    />
  );
}
