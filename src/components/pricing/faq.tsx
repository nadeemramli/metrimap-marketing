"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion. Fires `faq_toggle` (with the question) when an item is
 * opened — so we can see which questions people actually care about. The
 * FAQPage JSON-LD on the page keeps all answers crawlable regardless.
 */
export function PricingFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <dl className="mt-10 divide-y divide-border rounded-xl border border-border">
      {items.map((item) => {
        const isOpen = open === item.q;
        return (
          <div key={item.q} className="px-5">
            <dt>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  const next = isOpen ? null : item.q;
                  setOpen(next);
                  if (next) track("faq_toggle", { question: item.q });
                }}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-semibold tracking-tight">{item.q}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </dt>
            {isOpen ? (
              <dd className="-mt-1 pb-5 leading-relaxed text-muted-foreground">
                {item.a}
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
