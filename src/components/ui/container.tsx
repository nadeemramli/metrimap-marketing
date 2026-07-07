import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered max-width wrapper with consistent horizontal padding. */
export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper for page sections. */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      {children}
    </section>
  );
}
