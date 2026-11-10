// All times are SGT (+08:00). Everyone coming is in Singapore.
export const EVENT_START = new Date("2026-11-16T17:30:00+08:00").getTime();
export const EVENT_END = new Date("2026-11-16T20:30:00+08:00").getTime();

export type Phase =
  | { phase: "before"; remaining: number }
  | { phase: "live"; remaining: number }
  | { phase: "after" };

export function getPhase(nowMs: number): Phase {
  if (nowMs < EVENT_START) return { phase: "before", remaining: EVENT_START - nowMs };
  if (nowMs < EVENT_END) return { phase: "live", remaining: EVENT_END - nowMs };
  return { phase: "after" };
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
