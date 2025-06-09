/**
 * Utility function to combine class names
 * Similar to clsx but simpler and tailored for our needs
 */
export function cn(
  ...inputs: (string | string[] | undefined | null | false)[]
): string {
  return inputs.flat().filter(Boolean).join(" ").trim();
}
