import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine class names with Tailwind CSS conflict resolution
 * Uses clsx for conditional classes and tailwind-merge for Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
