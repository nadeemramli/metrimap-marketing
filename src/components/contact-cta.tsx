"use client";

import { Mail } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/**
 * The site has no backend, so "contact" is an intent-tracked mailto. We record
 * contact_intent (CVS-288 taxonomy) then let the browser open the mail client.
 */
export function ContactCTA({
  subject = "Canvasm — hello",
  location = "contact_page",
  children,
}: {
  subject?: string;
  location?: string;
  children: React.ReactNode;
}) {
  const href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}`;
  return (
    <a
      href={href}
      onClick={() => track("contact_intent", { location, subject })}
      className={buttonClasses({ variant: "primary", size: "lg" })}
    >
      <Mail className="h-4 w-4" />
      {children}
    </a>
  );
}
