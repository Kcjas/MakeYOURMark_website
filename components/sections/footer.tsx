import { INSTAGRAM_LABEL, INSTAGRAM_PLACEHOLDER, INSTAGRAM_URL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="torn-top bg-ink px-4 pb-10 pt-14 text-card sm:px-8 lg:px-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-4xl font-black">MakeYourMark</p>
          <p className="mt-1 max-w-[42ch]">
            Organised by EnROOT Group 6, part of ROOT.
          </p>
        </div>
        {INSTAGRAM_URL === INSTAGRAM_PLACEHOLDER ? (
          <p className="font-display text-3xl">Instagram coming soon</p>
        ) : (
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wiggle press inline-block w-fit font-display text-3xl underline decoration-sunflower decoration-4 underline-offset-[7px]"
          >
            Follow us on {INSTAGRAM_LABEL}
          </a>
        )}
      </div>
    </footer>
  );
}
