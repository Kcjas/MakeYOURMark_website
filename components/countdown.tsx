"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { PathInfo } from "roughjs/bin/core";
import { getPhase, splitDuration } from "@/lib/event";

/* ---------- a 1s clock shared by everyone ----------
   Paused while the tab is hidden or the timer is scrolled off screen,
   so a phone isn't re-rendering every second for nothing. */
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;
let hidden = false;
let offscreen = false;

function tick() {
  listeners.forEach((l) => l());
  // line up with the real second boundary so digits flip on time
  timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
}
function stop() {
  clearTimeout(timer);
  timer = undefined;
}
function sync() {
  const run = listeners.size > 0 && !hidden && !offscreen;
  if (run && !timer) tick();
  if (!run) stop();
}
function onVisibility() {
  hidden = document.hidden;
  sync();
}
function setOffscreen(value: boolean) {
  offscreen = value;
  sync();
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    hidden = document.hidden;
    document.addEventListener("visibilitychange", onVisibility);
    sync();
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

/* ---------- pieces ---------- */
const TILTS = ["-2deg", "1.5deg", "-1deg", "2.5deg"];
const EASE = [0.23, 1, 0.32, 1] as const;
/** first stamps wait for the title to finish drawing */
const FIRST_DELAY = 1.1;
const STAMP = { opacity: 0, scale: 1.5, rotate: -8 };
const LANDED = { opacity: 1, scale: 1, rotate: 0 };

type Unit = { value: number | null; label: string };

function Frame({ paths }: { paths: PathInfo[] }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={p.strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function Digit({
  char,
  index,
  settled,
  reduce,
  subtle,
}: {
  char: string;
  index: number;
  settled: boolean;
  reduce: boolean;
  /** seconds change every second: re-stamp gently */
  subtle: boolean;
}) {
  const initial = reduce
    ? false
    : !settled
      ? STAMP
      : subtle
        ? { opacity: 0.6, scale: 1.08 }
        : { opacity: 0.25, scale: 1.18 };
  return (
    <span className="inline-block w-[0.56em] text-center">
      <m.span
        key={char}
        className="inline-block"
        initial={initial}
        animate={LANDED}
        transition={{
          duration: !settled ? 0.24 : subtle ? 0.14 : 0.17,
          ease: EASE,
          delay: settled ? 0 : FIRST_DELAY + 0.05 * index,
        }}
      >
        {char}
      </m.span>
    </span>
  );
}

function Stamps({ units, frames, settled, reduce }: { units: Unit[]; frames: PathInfo[][]; settled: boolean; reduce: boolean }) {
  return (
    <ol className="flex gap-2.5 sm:gap-4">
      {units.map((u, i) => {
        const text = u.value === null ? "––" : String(u.value).padStart(2, "0");
        return (
          <li key={u.label} className="flex flex-col items-center gap-1.5">
            <span
              className="relative grid h-[4.6rem] w-[4.4rem] place-items-center text-ink sm:h-24 sm:w-[5.5rem]"
              style={{ rotate: TILTS[i % TILTS.length] }}
            >
              <Frame paths={frames[i % frames.length]} />
              <span className="stamp-ink font-display text-[2.7rem] font-black leading-none sm:text-6xl">
                {text.split("").map((c, j) => (
                  <Digit
                    key={j}
                    char={c}
                    index={i * 2 + j}
                    settled={settled}
                    reduce={reduce}
                    subtle={u.label === "sec"}
                  />
                ))}
              </span>
            </span>
            <span className="text-sm font-bold uppercase tracking-wide">{u.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function Countdown({ frames }: { frames: PathInfo[][] }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduce = useReducedMotion() ?? false;
  const ready = now !== null;
  const [settled, setSettled] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 1800);
    return () => clearTimeout(t);
  }, [ready]);

  // stop ticking while the timer is scrolled away
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    io.observe(el);
    return () => {
      io.disconnect();
      setOffscreen(false);
    };
  }, []);

  const stamp = reduce ? false : STAMP;
  let body;

  if (!ready) {
    body = (
      <div className="flex flex-col gap-3" role="timer" aria-label="Countdown to MakeYourMark">
        <p className="font-display text-2xl leading-none">Starts in</p>
        <Stamps
          units={["days", "hrs", "min", "sec"].map((label) => ({ value: null, label }))}
          frames={frames}
          settled
          reduce
        />
      </div>
    );
  } else {
    const p = getPhase(now * 1000);
    if (p.phase === "after") {
      body = (
        <div className="max-w-sm">
          <m.p
            className="inline-block origin-left font-display text-4xl leading-none"
            initial={stamp}
            animate={LANDED}
            transition={{ duration: 0.24, ease: EASE }}
          >
            That&rsquo;s a wrap!
          </m.p>
          <p className="mt-2">
            Thanks for coming down and making your mark. Hope your flower&rsquo;s still standing.
          </p>
        </div>
      );
    } else {
      const d = splitDuration(p.remaining);
      const units: Unit[] =
        p.phase === "before"
          ? [
              ...(d.days > 0 ? [{ value: d.days, label: d.days === 1 ? "day" : "days" }] : []),
              { value: d.hours, label: "hrs" },
              { value: d.minutes, label: "min" },
              { value: d.seconds, label: "sec" },
            ]
          : [
              { value: d.hours, label: "hrs" },
              { value: d.minutes, label: "min" },
              { value: d.seconds, label: "sec" },
            ];
      body = (
        <div className="flex flex-col gap-3" role="timer" aria-live="off" aria-label="Countdown to MakeYourMark">
          {p.phase === "before" ? (
            <p className="font-display text-2xl leading-none">Starts in</p>
          ) : (
            <p className="font-display text-2xl leading-none">
              <m.span
                className="inline-block bg-tomato px-2 py-0.5 text-ink"
                initial={stamp}
                animate={LANDED}
                transition={{ duration: 0.24, ease: EASE }}
              >
                Happening now!
              </m.span>{" "}
              <span className="whitespace-nowrap">Ends in</span>
            </p>
          )}
          <Stamps units={units} frames={frames} settled={settled} reduce={reduce} />
        </div>
      );
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div ref={box}>{body}</div>
    </LazyMotion>
  );
}
