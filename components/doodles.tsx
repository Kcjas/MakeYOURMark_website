import clsx from "clsx";
import type React from "react";
import { Rough } from "./rough";

type P = { className?: string };
const a11y = { "aria-hidden": true, focusable: false } as const;

/** Shared SVG filters: pipe-cleaner fuzz and rubber-stamp / paint edges. */
export function SvgFilters() {
  return (
    <svg width="0" height="0" className="absolute" {...a11y}>
      <filter id="fuzz" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="2" />
        <feDisplacementMap in="SourceGraphic" scale="3.5" />
      </filter>
      <filter id="chenille" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="1" seed="6" />
        <feDisplacementMap in="SourceGraphic" scale="7" />
      </filter>
      <filter id="stamp-ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="5" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" result="d" />
        <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="1" seed="8" result="speck" />
        <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -5 3.9" result="holes" />
        <feComposite in="d" in2="holes" operator="in" />
      </filter>
      <filter id="paint" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" />
        <feDisplacementMap in="SourceGraphic" scale="6" />
      </filter>
    </svg>
  );
}

const petal = "M60 54 C 42 36, 48 14, 60 11 C 72 14, 78 36, 60 54";

export function PipeCleanerFlower({ className }: P) {
  return (
    <svg viewBox="0 0 120 170" className={className} {...a11y}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#fuzz)">
        <path d="M60 60 C 56 92, 68 122, 58 164" stroke="var(--color-grass)" strokeWidth="7" />
        <path
          d="M62 120 c 12 -16 32 -16 38 -8 c -10 10 -26 13 -38 8z"
          stroke="var(--color-grass)"
          strokeWidth="6"
        />
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d={petal}
            transform={`rotate(${deg} 60 54)`}
            stroke="var(--color-tomato)"
            strokeWidth="6"
          />
        ))}
      </g>
      <circle cx="60" cy="54" r="9" fill="var(--color-sunflower)" stroke="var(--color-ink)" strokeWidth="3" />
    </svg>
  );
}

export function SquishyBlob({ className }: P) {
  return (
    <svg viewBox="0 0 140 120" className={className} {...a11y}>
      {/* cotton bits */}
      <g fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="2.5">
        <path d="M112 22 c -4 -8 6 -14 11 -8 c 6 -4 13 3 9 9 c 5 5 -2 12 -8 9 c -4 6 -13 2 -12 -4 c -6 -1 -5 -8 0 -6z" />
        <path d="M14 26 c -2 -6 5 -10 9 -6 c 4 -3 10 2 7 7 c 3 4 -2 9 -6 6 c -4 4 -10 0 -9 -4 c -4 -1 -4 -5 -1 -3z" />
      </g>
      <path
        d="M34 102 C 12 98, 10 66, 24 50 C 38 32, 78 26, 102 40 C 124 54, 128 86, 110 100 C 92 112, 56 112, 34 102Z"
        fill="var(--color-sunflower)"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse cx="44" cy="80" rx="8" ry="4.5" fill="var(--color-tomato)" opacity=".75" />
      <ellipse cx="96" cy="80" rx="8" ry="4.5" fill="var(--color-tomato)" opacity=".75" />
      <circle cx="54" cy="68" r="4.5" fill="var(--color-ink)" />
      <circle cx="86" cy="68" r="4.5" fill="var(--color-ink)" />
      <path d="M62 82 q 8 8 16 0" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Handprint({ className }: P) {
  return (
    <svg viewBox="0 0 100 124" className={className} {...a11y}>
      <g fill="currentColor" filter="url(#paint)">
        <ellipse cx="50" cy="82" rx="27" ry="29" />
        <rect x="22" y="26" width="13" height="46" rx="6.5" transform="rotate(-14 28 66)" />
        <rect x="37" y="12" width="13" height="54" rx="6.5" transform="rotate(-4 43 64)" />
        <rect x="52" y="14" width="13" height="52" rx="6.5" transform="rotate(5 58 64)" />
        <rect x="66" y="28" width="12" height="42" rx="6" transform="rotate(15 72 66)" />
        <rect x="70" y="66" width="12" height="34" rx="6" transform="rotate(58 76 84)" />
        <circle cx="30" cy="118" r="3" />
        <circle cx="62" cy="120" r="2.2" />
      </g>
    </svg>
  );
}

/** The fuzzy wire threading the hero strips. */
export function PipeCleanerWire({ className, vertical }: P & { vertical?: boolean }) {
  const d = vertical
    ? "M300 -10 C 380 60, 20 90, 70 170 S 380 230, 330 330 S 10 380, 60 470 S 330 520, 360 600"
    : "M-20 120 C 120 -20, 220 260, 380 110 S 620 -10, 760 140 S 1000 260, 1120 90 S 1300 40, 1460 130";
  return (
    <svg
      viewBox={vertical ? "0 0 400 600" : "0 0 1440 260"}
      preserveAspectRatio="none"
      className={className}
      {...a11y}
    >
      <DrawOn id={vertical ? "wire-v" : "wire-h"} d={d} delay={0} box={vertical ? [400, 600] : [1440, 260]}>
        <Chenille d={d} />
      </DrawOn>
    </svg>
  );
}

/**
 * Reveals its children along path `d` on first load, like the wire being laid
 * down. A fat stroke in a mask is traced with stroke-dashoffset (CSS, so it runs
 * before hydration); with reduced motion the mask is simply full.
 */
function DrawOn({
  id,
  d,
  delay,
  box,
  children,
}: {
  id: string;
  d: string;
  delay: number;
  box: [number, number];
  children: React.ReactNode;
}) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={-120} y={-120} width={box[0] + 240} height={box[1] + 240}>
        <path
          d={d}
          pathLength={1}
          fill="none"
          stroke="#fff"
          strokeWidth={90}
          strokeLinecap="round"
          className="draw-on"
          style={{ "--d": `${delay}ms` } as React.CSSProperties}
        />
      </mask>
      <g mask={`url(#${id})`}>{children}</g>
    </>
  );
}

/** Chenille: a solid core plus a dashed fuzz halo, both sunflower. */
function Chenille({ d, width = 18 }: { d: string; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path
        d={d}
        stroke="var(--color-sunflower)"
        strokeWidth={width + 9}
        strokeDasharray="1.5 2.5"
        filter="url(#chenille)"
        vectorEffect="non-scaling-stroke"
      />
      <path d={d} stroke="var(--color-sunflower)" strokeWidth={width} vectorEffect="non-scaling-stroke" filter="url(#fuzz)" />
    </g>
  );
}

/** A short bit of the wire that crosses over a strip, so it reads as threaded through. */
export function WireOver({ className }: P) {
  return (
    <svg viewBox="0 0 40 160" overflow="visible" className={clsx("pointer-events-none", className)} {...a11y}>
      <DrawOn id="wire-over" d="M-6 -4 C 30 30, 0 100, 40 150" delay={1100} box={[40, 160]}>
        <Chenille d="M-6 -4 C 30 30, 0 100, 40 150" width={22} />
      </DrawOn>
    </svg>
  );
}

const OFFCUTS: { d: string; c: string }[][] = [
  [
    { d: "M14 30 C 50 10, 80 40, 110 22", c: "tomato" },
    { d: "M60 96 c 20 -30 50 -30 40 -2 c -8 20 -34 8 -20 -12", c: "grass" },
    { d: "M150 64 L 204 88", c: "cobalt" },
  ],
  [
    { d: "M20 80 c 10 -40 40 -50 60 -20 s 30 30 50 -10", c: "cobalt" },
    { d: "M150 30 c 20 -10 40 4 52 -6", c: "sunflower" },
  ],
  [
    { d: "M30 40 l 46 18", c: "grass" },
    { d: "M40 70 l 40 6", c: "tomato" },
    { d: "M120 90 c 6 -30 40 -40 50 -14 c 6 16 -16 22 -20 8", c: "sunflower" },
  ],
];

/** Pipe-cleaner offcuts left on the table. Each variant is a different pile. */
export function Offcuts({ className, variant = 0 }: P & { variant?: 0 | 1 | 2 }) {
  return (
    <svg viewBox="0 0 220 120" className={className} {...a11y}>
      <g fill="none" strokeLinecap="round" filter="url(#fuzz)" strokeWidth="9">
        {OFFCUTS[variant].map((o) => (
          <path key={o.d} d={o.d} stroke={`var(--color-${o.c})`} />
        ))}
      </g>
    </svg>
  );
}

/** A wisp of loose cotton: fibres, not a cloud. */
export function CottonTuft({ className }: P) {
  return (
    <svg viewBox="0 0 70 44" className={className} {...a11y}>
      <path d="M8 26 C 14 10, 50 6, 62 20 C 66 32, 40 40, 20 36 C 10 34, 6 30, 8 26Z" fill="var(--color-card)" />
      <g fill="none" stroke="var(--color-ink)" strokeOpacity=".35" strokeWidth="1" strokeLinecap="round">
        <path d="M6 26 c 8 -6 18 -8 26 -4" />
        <path d="M14 16 c 10 -4 22 -2 30 4" />
        <path d="M30 10 c 10 0 22 4 30 12" />
        <path d="M18 34 c 12 2 26 0 40 -8" />
        <path d="M40 22 c 8 2 16 6 26 4" />
        <path d="M2 30 l 6 -2 M64 18 l 5 -3 M60 32 l 7 3" />
      </g>
    </svg>
  );
}

type SplatKind = "drip" | "smear" | "spatter";

/** Paint mess: a drip, a dry-brush thumb smear, or a spatter. */
export function PaintSplat({
  className,
  color = "var(--color-tomato)",
  kind = "drip",
}: P & { color?: string; kind?: SplatKind }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...a11y}>
      <g fill={color} stroke={color} filter="url(#paint)">
        {kind === "drip" && (
          <>
            <path
              strokeWidth="0"
              d="M10 50 C 18 30, 60 20, 96 34 C 112 42, 108 58, 90 62 L 86 112 C 85 122, 76 122, 76 112 L 72 66 C 52 70, 22 70, 12 62 C 6 58, 6 54, 10 50Z"
            />
            <circle cx="100" cy="86" r="5" strokeWidth="0" />
          </>
        )}
        {kind === "smear" && (
          <g fill="none" strokeLinecap="round">
            <path d="M8 70 C 40 52, 80 50, 112 62" strokeWidth="20" />
            <path d="M14 52 C 44 40, 80 40, 106 46" strokeWidth="3" />
            <path d="M18 90 C 50 80, 84 78, 110 84" strokeWidth="4" />
            <path d="M30 96 C 54 90, 80 90, 100 94" strokeWidth="2" />
          </g>
        )}
        {kind === "spatter" && (
          <g strokeWidth="0">
            <circle cx="56" cy="64" r="16" />
            <circle cx="84" cy="44" r="6" />
            <circle cx="30" cy="40" r="4" />
            <circle cx="92" cy="86" r="8" />
            <circle cx="26" cy="92" r="5" />
            <circle cx="70" cy="104" r="3" />
            <circle cx="104" cy="60" r="2.5" />
            <circle cx="14" cy="66" r="2.5" />
          </g>
        )}
      </g>
    </svg>
  );
}

export function Staple({ className }: P) {
  return (
    <svg viewBox="0 0 60 16" className={clsx("pointer-events-none", className)} {...a11y}>
      <path d="M4 12 L4 5 L56 5 L56 12" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M8 7 L52 7" stroke="var(--color-card)" strokeOpacity=".55" strokeWidth="1.2" />
    </svg>
  );
}

export function Pushpin({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...a11y}>
      <ellipse cx="23" cy="23" rx="11" ry="10" fill="var(--color-cork-shade)" />
      <circle cx="19" cy="18" r="11" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <ellipse cx="15.5" cy="14" rx="3.5" ry="2.3" fill="var(--color-card)" opacity=".8" />
    </svg>
  );
}

/** Masking tape with torn ends. Stretch it with width/height classes. */
export function Tape({ className }: P) {
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className={clsx("pointer-events-none", className)} {...a11y}>
      <polygon
        points="3,3 97,0 94,6 99,11 95,17 99,22 96,28 2,26 5,20 0,14 4,8"
        fill="var(--color-tape)"
        fillOpacity=".82"
      />
      <path d="M22 2 L26 27 M61 1 L57 27 M80 2 L84 26" stroke="var(--color-card)" strokeOpacity=".45" strokeWidth="1.2" />
    </svg>
  );
}

export function BinderClip({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} {...a11y}>
      <g fill="none" stroke="var(--color-ink)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 36 L18 4 L40 12" />
        <path d="M54 36 L62 4 L40 12" />
      </g>
      <path d="M8 32 L72 32 L66 62 L14 62Z" fill="var(--color-ink)" />
      <path d="M16 40 L64 40" stroke="var(--color-card)" strokeOpacity=".35" strokeWidth="2" />
    </svg>
  );
}

/** Jagged sunflower sticker for the hero. */
export function FreeSticker({ className }: P) {
  const pts: [number, number][] = Array.from({ length: 28 }, (_, i) => {
    const ang = (i / 28) * Math.PI * 2;
    const rad = i % 2 ? 41 : 50;
    return [55 + Math.cos(ang) * rad, 55 + Math.sin(ang) * rad];
  });
  return (
    <div className={clsx("relative grid place-items-center", className)}>
      <Rough
        w={110}
        h={110}
        className="absolute inset-0 size-full text-ink"
        shapes={[{ kind: "polygon", points: pts }]}
        options={{ fill: "var(--color-sunflower)", fillStyle: "solid", seed: 21, roughness: 0.9 }}
      />
      <span className="relative font-display text-[1.6rem] leading-[0.85] text-ink text-center font-black">
        free
        <br />
        <span className="text-base font-normal">walk in!</span>
      </span>
    </div>
  );
}

export function PaintSmear({ className, color = "var(--color-sunflower)" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 400 70" preserveAspectRatio="none" className={className} {...a11y}>
      <path
        filter="url(#paint)"
        fill={color}
        d="M10 34 C 40 10, 120 20, 200 14 S 330 6, 390 22 C 398 42, 384 56, 340 54 S 160 66, 60 60 S 2 56, 10 34Z"
      />
    </svg>
  );
}
