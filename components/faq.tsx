"use client";

import * as Accordion from "@radix-ui/react-accordion";
import type { PathInfo } from "roughjs/bin/core";
import type { CSSProperties } from "react";
import { Pushpin, Staple, Tape } from "./doodles";

// wide cards need small tilts or they collide
const TILTS = ["-0.8deg", "0.6deg", "-0.5deg", "0.9deg", "-0.7deg"];

// each card is attached differently: staple, tape, pin
function Fastener({ i }: { i: number }) {
  switch (i % 3) {
    case 0:
      return <Staple className="absolute -top-1.5 left-8 z-10 h-4 w-14 -rotate-3" />;
    case 1:
      return <Tape className="absolute -top-3 right-10 z-10 h-6 w-20 rotate-[4deg]" />;
    default:
      return <Pushpin className="pointer-events-none absolute -top-4 left-[46%] z-10 size-8" />;
  }
}

export function Faq({ items, plus }: { items: readonly { q: string; a: string }[]; plus: PathInfo[] }) {
  return (
    <Accordion.Root type="multiple" className="flex flex-col gap-6">
      {items.map((item, i) => (
        <Accordion.Item
          key={item.q}
          value={`q${i}`}
          className="wiggle tilt relative"
          style={{ "--r": TILTS[i % TILTS.length] } as CSSProperties}
        >
          <Fastener i={i} />
          <div className="cut-sm bg-card">
            <Accordion.Header className="font-display">
              <Accordion.Trigger className="group press-wide flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-3.5 text-left text-[1.6rem] leading-tight sm:text-3xl">
                {item.q}
                <svg
                  viewBox="0 0 40 40"
                  className="size-8 shrink-0 text-tomato transition-[rotate] duration-200 ease-(--ease-out) group-data-[state=open]:rotate-45 motion-reduce:transition-none"
                  aria-hidden
                >
                  {plus.map((p, k) => (
                    <path key={k} d={p.d} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
                  ))}
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="motion-safe-accordion overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="px-5 pb-5">
                <p className="ruled max-w-[60ch] leading-8">{item.a}</p>
              </div>
            </Accordion.Content>
          </div>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
