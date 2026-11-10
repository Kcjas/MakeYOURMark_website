# MakeYourMark

One-page site for MakeYourMark, a free walk-in craft night at SUTD Campus Centre (Mon 16 Nov 2026, 5:30–8:30pm SGT). By EnROOT Group 6, part of ROOT.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
```

Deploy: import the repo on Vercel, no settings needed.

## Where to change things

| What | File |
| --- | --- |
| All copy, stations, FAQ, **Instagram link (TODO)** | `lib/content.ts` |
| Event start/end (SGT) for the countdown | `lib/event.ts` |
| Colours, fonts, tilts, shadows, motion curve | `app/globals.css` (`@theme`) |
| Sections | `components/sections/*.tsx` |
| Hand-drawn doodles | `components/doodles.tsx` |

The countdown switches on its own: "Starts in" before 5:30pm, "Happening now" until 8:30pm, then a thank-you note.

## Libraries

- [Motion](https://motion.dev): countdown stamp animation
- [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion): FAQ
- [Rough.js](https://roughjs.com): sketchy lines, computed on the server with fixed seeds
- `next/font`: Londrina Solid + Atkinson Hyperlegible Next, self-hosted (no requests to Google)
