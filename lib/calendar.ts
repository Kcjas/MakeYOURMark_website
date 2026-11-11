// Everything a calendar needs, built from the one set of event times in lib/event.ts.
import { calendar, when } from "@/lib/content";
import { EVENT_END, EVENT_START } from "@/lib/event";

const TITLE = "MakeYourMark";
const LOCATION = `${when.place}, SUTD`;

/** 2026-11-16T09:30:00Z */
const iso = (ms: number) => new Date(ms).toISOString().replace(/\.\d{3}Z$/, "Z");
/** 20261116T093000Z */
const stamp = (ms: number) => iso(ms).replace(/[-:]/g, "");

/** RFC 5545 text escaping */
const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** RFC 5545: lines over 75 octets continue on the next line after a space */
const fold = (line: string) => (line.match(/.{1,74}/g) ?? [""]).join("\r\n ");

/** Fixed, so the .ics route stays static at build time. */
const DTSTAMP = "20261111T000000Z";

export function icsText() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EnROOT Group 6//MakeYourMark//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:makeyourmark-20261116@enroot-group-6",
    `DTSTAMP:${DTSTAMP}`,
    `DTSTART:${stamp(EVENT_START)}`,
    `DTEND:${stamp(EVENT_END)}`,
    `SUMMARY:${esc(TITLE)}`,
    `LOCATION:${esc(LOCATION)}`,
    `DESCRIPTION:${esc(calendar.details)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(TITLE)} starts in 30 min`,
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
}

export const ICS_PATH = "/makeyourmark.ics";

export const googleUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${stamp(EVENT_START)}/${stamp(EVENT_END)}`,
    location: LOCATION,
    details: calendar.details,
    ctz: "Asia/Singapore",
  });

// office.com, not live.com: SUTD accounts are Microsoft 365
export const outlookUrl =
  "https://outlook.office.com/calendar/0/deeplink/compose?" +
  new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: TITLE,
    startdt: iso(EVENT_START),
    enddt: iso(EVENT_END),
    location: LOCATION,
    body: calendar.details,
  });
