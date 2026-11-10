import type { CSSProperties } from "react";
import { TITLE } from "@/lib/title-glyphs";

/**
 * One title word as real letter outlines, so each letter can be traced with a
 * pen and then inked in on first load. Sized in em, so it follows the h1's
 * font-size exactly like the text it replaces.
 */
export function DrawnWord({
  word,
  start,
  ink,
}: {
  word: keyof typeof TITLE;
  /** ms before the first letter starts */
  start: number;
  /** stroke + fill colour, a CSS colour or var() */
  ink: string;
}) {
  const t = TITLE[word];
  return (
    <svg
      viewBox={t.viewBox.join(" ")}
      style={{ width: `${t.w}em`, height: `${t.h}em` }}
      className="block overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      {t.glyphs.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill={ink}
          stroke={ink}
          className="draw-glyph"
          style={{ "--d": `${start + i * 70}ms` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
