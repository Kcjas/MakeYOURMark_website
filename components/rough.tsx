import rough from "roughjs";
import type { Options, PathInfo } from "roughjs/bin/core";

type Point = [number, number];

export type Shape =
  | { kind: "line"; from: Point; to: Point }
  | { kind: "ellipse"; cx: number; cy: number; w: number; h: number }
  | { kind: "rect"; x: number; y: number; w: number; h: number }
  | { kind: "curve"; points: Point[] }
  | { kind: "linear"; points: Point[] }
  | { kind: "polygon"; points: Point[] };

const gen = rough.generator();

/** Hand-drawn paths, computed once on the server. Seeds keep them stable. */
export function roughPaths(shapes: Shape[], options: Options = {}): PathInfo[] {
  const opts: Options = {
    stroke: "currentColor",
    strokeWidth: 2.5,
    roughness: 1.3,
    bowing: 1.2,
    seed: 7,
    ...options,
  };
  return shapes.flatMap((s) => {
    switch (s.kind) {
      case "line":
        return gen.toPaths(gen.line(s.from[0], s.from[1], s.to[0], s.to[1], opts));
      case "ellipse":
        return gen.toPaths(gen.ellipse(s.cx, s.cy, s.w, s.h, opts));
      case "rect":
        return gen.toPaths(gen.rectangle(s.x, s.y, s.w, s.h, opts));
      case "curve":
        return gen.toPaths(gen.curve(s.points, opts));
      case "linear":
        return gen.toPaths(gen.linearPath(s.points, opts));
      case "polygon":
        return gen.toPaths(gen.polygon(s.points, opts));
    }
  });
}

export function RoughPaths({ paths, stretch }: { paths: PathInfo[]; stretch?: boolean }) {
  return paths.map((p, i) => (
    <path
      key={i}
      d={p.d}
      stroke={p.stroke}
      strokeWidth={p.strokeWidth}
      fill={p.fill ?? "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect={stretch ? "non-scaling-stroke" : undefined}
    />
  ));
}

export function Rough({
  w,
  h,
  shapes,
  options,
  className,
  stretch,
}: {
  w: number;
  h: number;
  shapes: Shape[];
  options?: Options;
  className?: string;
  stretch?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio={stretch ? "none" : undefined}
      className={className}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      <RoughPaths paths={roughPaths(shapes, options)} stretch={stretch} />
    </svg>
  );
}
