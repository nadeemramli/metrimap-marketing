import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "@/components/ui/container";
import { SITE, FOOTER_NAV } from "@/lib/site";

export function Footer() {
  const year = 2026; // Build-time constant; no client clock needed.
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            The {SITE.productName} app lives at{" "}
            <a
              href={SITE.appUrl}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              use.canvasm.app
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
