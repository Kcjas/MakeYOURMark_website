"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { vars } from "@/components/paper";
import { Tape } from "@/components/doodles";
import { ICS_PATH, googleUrl, outlookUrl } from "@/lib/calendar";
import { calendar } from "@/lib/content";
import { EVENT_END } from "@/lib/event";

const noop = () => () => {};
const isOver = () => Date.now() >= EVENT_END;

const options = [
  { label: calendar.options.apple, href: ICS_PATH, external: false },
  { label: calendar.options.google, href: googleUrl, external: true },
  { label: calendar.options.outlook, href: outlookUrl, external: true },
];

export function CalendarMenu({
  tilt,
  up,
  icon,
  caret,
}: {
  tilt: string;
  /** open above the button (when there's no room below) */
  up?: boolean;
  icon: ReactNode;
  caret: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  // nothing to save once it's over
  const over = useSyncExternalStore(noop, isOver, () => false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (over) return null;

  return (
    <div ref={root} className="relative w-fit">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group tilt wiggle press block cursor-pointer"
        style={vars({ "--r": tilt })}
      >
        <span className="cut-sm block">
          <span className="pinked flex min-h-13 items-center gap-2.5 bg-sunflower px-4 py-2.5 font-display text-[1.7rem] leading-none">
            {icon}
            {calendar.button}
            {/* points the way the scrap opens, flips once it's out */}
            <span
              className={clsx(
                "ml-0.5 transition-[rotate] duration-200 ease-(--ease-out) motion-reduce:transition-none",
                up ? "rotate-180 group-aria-expanded:rotate-0" : "group-aria-expanded:rotate-180",
              )}
            >
              {caret}
            </span>
          </span>
        </span>
      </button>

      {/* a scrap taped on, growing out of the button's corner */}
      <div
        id={id}
        data-open={open || undefined}
        // unreachable the moment it closes, even while it fades out
        inert={!open}
        className={clsx(
          "absolute left-0 z-50 w-max min-w-full",
          up ? "bottom-full mb-4 origin-bottom-left" : "top-full mt-4 origin-top-left",
          "invisible scale-95 opacity-0",
          "transition-[opacity,scale,visibility] duration-[120ms] ease-(--ease-out)",
          // visible at once on open; only the close waits for the fade
          "data-open:visible data-open:scale-100 data-open:opacity-100 data-open:transition-[opacity,scale] data-open:duration-[180ms]",
          "motion-reduce:scale-100",
        )}
      >
        <div className="tilt relative" style={vars({ "--r": "var(--tilt-b)" })}>
          <Tape className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-2" />
          <div className="cut-sm">
            <ul className="torn-all bg-card px-2 py-3">
              {options.map((o, i) => (
                <li key={o.label} className={clsx(i > 0 && "border-t-2 border-dashed border-ink/25")}>
                  <a
                    href={o.href}
                    {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    className="press-wide flex min-h-12 items-center px-4 py-2 font-display text-2xl leading-none decoration-tomato decoration-[3px] underline-offset-[5px] hover:underline"
                  >
                    {o.label}
                    {o.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
