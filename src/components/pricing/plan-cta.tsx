"use client";

import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { getStartedHref } from "@/lib/site";
import type { PricingTier } from "@/lib/pricing";

/**
 * Pricing tier CTA with `pricing_plan_click` tracking (plan, price, seats,
 * action). Fixes the earlier gap where pricing CTAs were untracked.
 */
export function PlanCta({
  tier,
  size = "md",
  location,
}: {
  tier: PricingTier;
  /** "sm" is the compact form (no top margin, no secondary link) for the compare table. */
  size?: "sm" | "md";
  /** Overrides the tier's analytics location / utm_content (e.g. "pricing_compare_growth"). */
  location?: string;
}) {
  const trackedLocation = location ?? tier.cta.location;
  const fire = () =>
    track("pricing_plan_click", {
      plan: tier.name,
      price: tier.price,
      seats: tier.seats,
      action: tier.cta.kind, // signup | contact
      location: trackedLocation,
    });

  return (
    <div className={size === "sm" ? undefined : "mt-6"}>
      {tier.cta.kind === "signup" ? (
        <LinkButton
          external
          href={getStartedHref(trackedLocation)}
          variant={tier.recommended ? "primary" : "outline"}
          size={size}
          className="w-full"
          onClick={fire}
        >
          {tier.cta.label}
        </LinkButton>
      ) : (
        <LinkButton
          href="/contact"
          variant={tier.recommended ? "primary" : "outline"}
          size={size}
          className="w-full"
          onClick={fire}
        >
          {tier.cta.label}
        </LinkButton>
      )}
      {tier.secondary && size !== "sm" ? (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link
            href={tier.secondary.href}
            className="underline-offset-4 hover:underline"
          >
            {tier.secondary.label}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
