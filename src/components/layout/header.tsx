"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_NAV, getStartedHref, signInHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            const cls =
              "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cls}
                  onClick={() =>
                    track("docs_click", { location: "header_nav" })
                  }
                >
                  {item.label}
                </a>
              );
            }
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LinkButton
            external
            href={signInHref("header")}
            variant="ghost"
            size="sm"
            onClick={() => track("use_app_click", { location: "header_signin" })}
          >
            Sign in
          </LinkButton>
          <LinkButton
            external
            href={getStartedHref("header")}
            variant="primary"
            size="sm"
            onClick={() => track("cta_click", { location: "header" })}
          >
            Get started
          </LinkButton>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {PRIMARY_NAV.map((item) => {
              const cls =
                "rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent";
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    track("docs_click", { location: "mobile_nav" });
                    closeMenu();
                  }}
                  className={cls}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cls}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2">
              <LinkButton
                external
                href={signInHref("mobile_menu")}
                variant="outline"
                size="md"
                onClick={() => {
                  track("use_app_click", { location: "mobile_signin" });
                  closeMenu();
                }}
              >
                Sign in
              </LinkButton>
              <LinkButton
                external
                href={getStartedHref("mobile_menu")}
                variant="primary"
                size="md"
                onClick={() => {
                  track("cta_click", { location: "mobile_menu" });
                  closeMenu();
                }}
              >
                Get started
              </LinkButton>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
