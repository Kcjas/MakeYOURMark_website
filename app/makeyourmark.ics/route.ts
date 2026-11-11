import { icsText } from "@/lib/calendar";

// No runtime data, so this is prerendered at build time.
// Served inline so iPhone Safari opens its "Add to Calendar" sheet.
export function GET() {
  return new Response(icsText(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="makeyourmark.ics"',
    },
  });
}
