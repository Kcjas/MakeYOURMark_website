"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { PathInfo } from "roughjs/bin/core";
import { getPhase, splitDuration } from "@/lib/event";

/* ---------- a 1s clock shared by everyone, paused while the tab is hidden ---------- */
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
  listeners.forEach((l) => l());
  // line up with the real second boundary so digits flip on time
  timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
}
function stop() {
  clearTimeout(timer);
  timer = undefined;
}
function onVisibility() {
  if (document.hidden) stop();
  else if (!timer) tick();
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    tick();
    document.addEventListener("visibilitychange", onVisibility);
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

function Digit({ char, index, settled, reduce }: { char: string; index: number; settled: boolean; reduce: boolean }) {
  return (
    <span className="inline-block w-[0.56em] text-center">
      <m.span
        key={char}
        className="inline-block"
        initial={
          reduce
            ? false
            : settled
              ? { opacity: 0.25, scale: 1.18 }
              : { opacity: 0, scale: 1.55, rotate: -8 }
        }
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: settled ? 0.17 : 0.24,
          ease: EASE,
          delay: settled ? 0 : 0.05 * index,
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
                  <Digit key={j} char={c} index={i * 2 + j} settled={settled} reduce={reduce} />
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

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(t);
  }, [ready]);

  if (!ready) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="flex flex-col gap-3" role="timer" aria-label="Countdown to MakeYourMark">
          <p className="font-display text-2xl leading-none">Starts in</p>
          <Stamps
            units={["days", "hrs", "min", "sec"].map((label) => ({ value: null, label }))}
            frames={frames}
            settled
            reduce
          />
        </div>
      </LazyMotion>
    );
  }

  const p = getPhase(now * 1000);

  if (p.phase === "after") {
    return (
      <div className="max-w-sm">
        <p className="font-display text-4xl leading-none">That&rsquo;s a wrap!</p>
        <p className="mt-2">
          Thanks for coming down and making your mark. Hope your flower&rsquo;s still standing.
        </p>
      </div>
    );
  }

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

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col gap-3" role="timer" aria-live="off" aria-label="Countdown to MakeYourMark">
        {p.phase === "before" ? (
          <p className="font-display text-2xl leading-none">Starts in</p>
        ) : (
          <p className="font-display text-2xl leading-none">
            <span className="bg-tomato px-2 py-0.5 text-ink">Happening now!</span>{" "}
            <span className="whitespace-nowrap">Ends in</span>
          </p>
        )}
        <Stamps units={units} frames={frames} settled={settled} reduce={reduce} />
      </div>
    </LazyMotion>
  );
}
