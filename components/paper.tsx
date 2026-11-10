import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { Rough } from "./rough";

/** Inline CSS custom properties without fighting TS. */
export const vars = (v: Record<string, string>) => v as CSSProperties;

/** A torn strip of coloured paper with a flat cutout shadow. */
export function Strip({
  children,
  className,
  paper,
  tilt,
  overlay,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  paper: string;
  tilt: string;
  /** drawn above the paper, outside its torn mask */
  overlay?: ReactNode;
  /** stagger for the slap-down entrance, in ms */
  delay?: number;
}) {
  return (
    <span className={clsx("tilt slap block w-fit", className)} style={vars({ "--r": tilt, "--d": `${delay}ms` })}>
      <span className="cut-md block">
        <span className={clsx("torn block px-[0.13em] py-[0.08em]", paper)}>{children}</span>
      </span>
      {overlay}
    </span>
  );
}

/** "takes ~15 min" with a hand-drawn loop around the time. */
export function TimeTag({ time, seed, className }: { time: string; seed: number; className?: string }) {
  return (
    <p className={clsx("mt-5 flex flex-wrap items-center gap-x-2 text-base font-bold", className)}>
      takes
      <span className="relative px-4 py-1.5 font-display text-2xl font-normal leading-none">
        {time}
        <Rough
          w={100}
          h={40}
          stretch
          className="absolute -inset-x-1 inset-y-0 h-full w-[calc(100%+0.5rem)]"
          shapes={[{ kind: "ellipse", cx: 50, cy: 20, w: 98, h: 38 }]}
          options={{ seed, strokeWidth: 2.5, roughness: 1.6 }}
        />
      </span>
    </p>
  );
}
