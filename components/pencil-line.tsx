"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type Pt = [number, number];

/** Small seeded random so the line is the same on every visit. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STEP = 170; // px between wander points
const LOOP_EVERY = 5; // a little scribble loop every few points

/**
 * A wandering pencil path in real pixels (so loops stay round).
 * Points come from a fixed seed in order, so a taller page only changes the tail.
 */
function buildPath(w: number, h: number) {
  const rand = seeded(23);
  const pts: Pt[] = [];
  for (let y = 0; y < h; y += STEP) {
    const x = (0.08 + rand() * 0.84) * w;
    const jitter = (rand() - 0.5) * 50;
    pts.push([x, Math.max(0, y + (y === 0 ? 0 : jitter))]);
  }
  pts.push([(0.08 + rand() * 0.84) * w, h - 4]);

  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    // Catmull-Rom to cubic Bezier
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    if (i > 0 && i % LOOP_EVERY === 0 && i < pts.length - 2) {
      // a quick doodle loop that ends where it started
      const r = 14 + rand() * 8;
      const dir = p2[0] > w / 2 ? -1 : 1;
      d += ` c${f(dir * r * 1.6)} ${f(-r)} ${f(dir * r * 2)} ${f(r * 1.4)} ${f(dir * r * 0.6)} ${f(r * 1.2)}`;
      d += ` c${f(-dir * r * 1.2)} ${f(-r * 0.2)} ${f(-dir * r * 1.1)} ${f(-r * 1.6)} ${f(-dir * r * 0.6)} ${f(-r * 1.2)}`;
    }
  }
  return d;
}

/** Pencil drawn pointing right with its graphite tip at (0,0). */
function Pencil() {
  return (
    <svg width="1" height="1" overflow="visible" aria-hidden>
      <g strokeLinejoin="round">
        <path d="M0 0 L-6 -2.6 L-6 2.6Z" fill="var(--color-ink)" />
        <path d="M-6 -2.6 L-14 -6 L-14 6 L-6 2.6Z" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <rect x="-40" y="-6" width="26" height="12" fill="var(--color-sunflower)" stroke="var(--color-ink)" strokeWidth="1.4" />
        <path d="M-40 -2 L-14 -2 M-40 2 L-14 2" stroke="var(--color-ink)" strokeOpacity=".25" strokeWidth="1" />
        <rect x="-45" y="-6" width="5" height="12" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <path d="M-45 -6 L-51 -6 Q-54 0 -51 6 L-45 6Z" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/**
 * A graphite line that draws itself down the page as you scroll, with the
 * pencil riding its tip. It sits under every section, like a line drawn on
 * the table under the papers and the cork board.
 */
export function PencilLine() {
  const wrap = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const total = useRef(0);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rotate = useMotionValue(90);
  // the pencil only shows up once you start scrolling (keeps the hero opening clean)
  const pencilOpacity = useTransform(scrollYProgress, [0, 0.015], [0, 1]);

  // Measure the wrapper. Ignore small height changes (an FAQ opening, the URL bar).
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      setSize((prev) => (prev && prev.w === w && Math.abs(prev.h - h) < 60 ? prev : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const d = useMemo(() => (size ? buildPath(size.w, size.h) : null), [size]);

  // Put the pencil on the tip of the drawn line.
  const placeRef = useRef((p: number) => {
    const el = pathRef.current;
    if (!el || !total.current) return;
    const len = Math.min(1, Math.max(0, p)) * total.current;
    const a = el.getPointAtLength(Math.max(0, len - 3));
    const b = el.getPointAtLength(Math.max(3, len));
    x.set(b.x);
    y.set(b.y);
    rotate.set((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
  });

  useEffect(() => {
    const el = pathRef.current;
    if (!d || !el || typeof el.getTotalLength !== "function") return;
    total.current = el.getTotalLength();
    placeRef.current(scrollYProgress.get());
  }, [d, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (p) => placeRef.current(p));

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {size && d && (
        <LazyMotion features={domAnimation}>
          <svg width={size.w} height={size.h} className="absolute left-0 top-0">
            <m.path
              ref={pathRef}
              d={d}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: reduce ? 1 : scrollYProgress }}
            />
          </svg>
          {!reduce && (
            <m.div className="absolute left-0 top-0" style={{ x, y, rotate, opacity: pencilOpacity, transformOrigin: "0 0" }}>
              <Pencil />
            </m.div>
          )}
        </LazyMotion>
      )}
    </div>
  );
}
