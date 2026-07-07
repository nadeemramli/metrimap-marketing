import * as React from "react";
import { cn } from "@/lib/utils";

/** Eyebrow + title + optional lede, used to open page sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
