"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Dependency-free theme toggle. The no-FOUC resolution happens in the inline
 * script in layout.tsx. This component is deliberately stateless: both icons
 * are rendered and CSS (`dark:` variant) controls which is visible, so there's
 * no hydration mismatch and no setState-in-effect.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground " +
        "transition-colors hover:bg-accent hover:text-accent-foreground " +
        (className ?? "")
      }
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
