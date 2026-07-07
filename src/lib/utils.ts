import { clsx, type ClassValue } from "clsx";

/**
 * Minimal class combiner. We deliberately avoid tailwind-merge here — the
 * primitives are hand-rolled and don't produce conflicting utility sets, so
 * clsx alone keeps the dependency surface small.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
