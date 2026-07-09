import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlanCta } from "@/components/pricing/plan-cta";
import { cn } from "@/lib/utils";
import {
  PRICING,
  type ComparisonGroup,
  type ComparisonValue,
  type PricingTier,
} from "@/lib/pricing";

function CellValue({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-success" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-foreground">{value}</span>;
}

/**
 * Feature-comparison matrix: features on the left, one column per plan.
 * Scrolls horizontally on small screens with the feature-label column
 * pinned left (the page body itself must never scroll sideways).
 */
export function ComparePlans({
  tiers,
  groups,
}: {
  tiers: PricingTier[];
  groups: ComparisonGroup[];
}) {
  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">
          Feature comparison across Canvasm plans
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="sticky left-0 z-10 w-52 border-r border-border bg-card px-4 py-5 text-left align-bottom text-sm font-medium text-muted-foreground"
            >
              Features
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                className={cn(
                  "px-4 py-5 text-left align-top",
                  tier.recommended && "bg-muted/40",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold tracking-tight text-foreground">
                    {tier.name}
                  </span>
                  {tier.recommended ? (
                    <Badge tone="success">Recommended</Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-normal text-muted-foreground">
                  <span className="font-semibold tabular-nums text-foreground">
                    {PRICING.currency}
                    {tier.price}
                  </span>
                  {PRICING.period} · {tier.seats}{" "}
                  {tier.seats === 1 ? "seat" : "seats"}
                </p>
                <div className="mt-3">
                  <PlanCta
                    tier={tier}
                    size="sm"
                    location={`pricing_compare_${tier.id}`}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:last-child]:border-b-0">
          {groups.map((group) => (
            <Fragment key={group.label}>
              <tr className="border-b border-border/60">
                <td colSpan={tiers.length + 1} className="p-0">
                  <div className="sticky left-0 w-max px-4 pb-3 pt-6 text-xs font-semibold uppercase tracking-wide text-foreground">
                    {group.label}
                  </div>
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-b border-border/60">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-r border-border bg-card px-4 py-3 text-left text-sm font-normal leading-snug text-muted-foreground"
                  >
                    {row.label}
                  </th>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn(
                        "px-4 py-3 text-center",
                        tier.recommended && "bg-muted/40",
                      )}
                    >
                      <CellValue value={row.values[tier.id] ?? false} />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
