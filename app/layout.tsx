import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Londrina_Solid } from "next/font/google";
import "./globals.css";

const londrina = Londrina_Solid({
  variable: "--font-londrina",
  weight: ["400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "MakeYourMark · craft night at SUTD",
  description:
    "Free walk-in craft night at SUTD Campus Centre. Mon 16 Nov 2026, 5:30 to 8:30pm. Pipe cleaner flowers, squishies and a giant hand painting board.",
  openGraph: {
    title: "MakeYourMark · craft night at SUTD",
    description: "Mon 16 Nov, 5:30 to 8:30pm at Campus Centre. Free, just walk in.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-SG" className={`${londrina.variable} ${atkinson.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
