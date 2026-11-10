// Every word on the page lives here, so edits don't need a dev.

// TODO: replace with the real Instagram account, e.g. "https://www.instagram.com/your_handle/".
// While it equals the placeholder, the footer shows "Instagram coming soon" instead of a link.
export const INSTAGRAM_PLACEHOLDER = "https://www.instagram.com/";
export const INSTAGRAM_URL: string = INSTAGRAM_PLACEHOLDER;
export const INSTAGRAM_LABEL = "Instagram";

export const when = {
  day: "Mon 16 Nov",
  time: "5:30 – 8:30pm",
  place: "Campus Centre",
  isoStart: "2026-11-16T17:30:00+08:00",
  isoEnd: "2026-11-16T20:30:00+08:00",
};

export const stations = [
  {
    id: "flowers",
    name: "Pipe cleaner flowers",
    line: "Twist, loop, bend. A bouquet that never dies.",
    time: "~15 min",
  },
  {
    id: "squishies",
    name: "Squishies",
    line: "Draw a little guy, stuff him with cotton, squish forever.",
    time: "~30 min",
  },
  {
    id: "board",
    name: "Hand painting board",
    line: "Dip your hand in paint and stamp it on one big board we all share. Stay as long as you like.",
    time: "~2 min",
  },
] as const;

export const faqs = [
  {
    q: "Is it free?",
    a: "Yep, totally free. No ticket, no sign-up. Just walk in.",
  },
  {
    q: "Do I need to bring anything?",
    a: "Nope, all the supplies are there. Maybe skip your nicest shirt, there's paint.",
  },
  {
    q: "Can I bring friends?",
    a: "Yes, as long as they're SUTD too. It's for the SUTD community, so grab your floor or your class.",
  },
  {
    q: "Can I take my crafts home?",
    a: "That's the whole point. Flowers and squishies go home with you. The painting board stays, since everyone's hand is on it.",
  },
  {
    q: "Is there food?",
    a: "Light snacks, while they last. Come earlier if that matters to you.",
  },
] as const;
