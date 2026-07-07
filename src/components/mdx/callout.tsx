import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "note" | "tip" | "warning";

const config: Record<
  CalloutType,
  { icon: typeof Info; className: string }
> = {
  note: { icon: Info, className: "border-info/30 bg-info/8" },
  tip: { icon: Lightbulb, className: "border-success/30 bg-success/8" },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/40 bg-warning/10",
  },
};

/** Custom MDX component authors can drop into articles. */
export function Callout({
  type = "note",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { icon: Icon, className } = config[type];
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4 text-sm [&>div>p]:my-0",
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
