import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 " +
  "whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonBaseProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

type LinkButtonProps = ButtonBaseProps &
  React.ComponentPropsWithoutRef<typeof Link> & {
    external?: boolean;
  };

/** A Link styled as a button. Use `external` for outbound (app/docs) links. */
export function LinkButton({
  variant,
  size,
  className,
  external,
  ...props
}: LinkButtonProps) {
  const classes = buttonClasses({ variant, size, className });
  if (external) {
    // Forward the anchor-relevant props — dropping onClick here silently
    // killed CTA analytics once (track() handlers never fired).
    const { href, children, onClick, target, rel } = props;
    return (
      <a
        className={classes}
        href={typeof href === "string" ? href : "#"}
        onClick={onClick}
        {...(target ? { target } : {})}
        {...(rel ? { rel } : {})}
      >
        {children}
      </a>
    );
  }
  return <Link className={classes} {...props} />;
}
