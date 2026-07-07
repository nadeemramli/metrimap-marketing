"use client";

import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { buttonClasses, type ButtonBaseProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/**
 * "Book a discovery call" — the consultation entry point. Fires `book_call`
 * and routes to SITE.bookingUrl (a real scheduler) when configured, otherwise
 * to /contact so there's never a dead link. Config-gated the same way as the
 * live-demo embed.
 */
export function BookCall({
  location,
  variant = "primary",
  size = "lg",
  className,
  children = "Book a discovery call",
  icon = true,
}: ButtonBaseProps & {
  location: string;
  children?: React.ReactNode;
  icon?: boolean;
}) {
  const classes = buttonClasses({ variant, size, className });
  const fire = () => track("book_call", { location });
  const inner = (
    <>
      {icon ? <CalendarClock className="h-4 w-4" aria-hidden /> : null}
      {children}
    </>
  );

  if (SITE.bookingUrl) {
    return (
      <a
        href={SITE.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={fire}
        className={classes}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href="/contact" onClick={fire} className={classes}>
      {inner}
    </Link>
  );
}
