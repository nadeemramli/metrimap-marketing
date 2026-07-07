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
export function PlanCta({ tier }: { tier: PricingTier }) {
  const fire = () =>
    track("pricing_plan_click", {
      plan: tier.name,
      price: tier.price,
      seats: tier.seats,
      action: tier.cta.kind, // signup | contact
      location: tier.cta.location,
    });

  return (
    <div className="mt-6">
      {tier.cta.kind === "signup" ? (
        <LinkButton
          external
          href={getStartedHref(tier.cta.location)}
          variant={tier.recommended ? "primary" : "outline"}
          size="md"
          className="w-full"
          onClick={fire}
        >
          {tier.cta.label}
        </LinkButton>
      ) : (
        <LinkButton
          href="/contact"
          variant={tier.recommended ? "primary" : "outline"}
          size="md"
          className="w-full"
          onClick={fire}
        >
          {tier.cta.label}
        </LinkButton>
      )}
      {tier.secondary ? (
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
