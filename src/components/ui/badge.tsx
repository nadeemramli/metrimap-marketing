import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "info" | "warning" | "outline";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  success: "bg-success/12 text-success ring-1 ring-success/25",
  info: "bg-info/12 text-info ring-1 ring-info/25",
  warning: "bg-warning/15 text-warning-foreground ring-1 ring-warning/30",
  outline: "border border-border text-muted-foreground",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
