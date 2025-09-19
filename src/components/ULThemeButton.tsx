import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

export type ULThemeButtonProps = ButtonProps;

export function ULThemeButton({
  variant = "primary",
  size = "default",
  className,
  ...props
}: ULThemeButtonProps) {
  // Using extractTokenValue utility to extract the link style variant type from the CSS variable
  const linkStyleValue =
    extractTokenValue("--ul-theme-font-links-style") === "normal"
      ? "no-underline"
      : "underline";

  // Variant-specific theme overrides for colors and states
  const variantThemeOverrides = {
    primary: cn(
      "p-6 border-0",
      "cursor-pointer",
      "theme-universal:bg-primary-button",
      "theme-universal:text-(--ul-theme-color-primary-button-label)", //text-color
      "theme-universal:hover:shadow-[var(--button-hover-shadow)]",
      "theme-universal:focus:outline-none theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15",
      "theme-universal:disabled:bg-primary-button/70",
      "theme-universal:disabled:border-primary-button/70",
      "theme-universal:disabled:cursor-not-allowed"
    ),
    secondary: "", // Add secondary overrides if needed
    destructive: "", // Add destructive overrides if needed
    outline: cn(
      "p-6",
      "cursor-pointer",
      "theme-universal:text-(--ul-theme-color-secondary-button-label)", //text-color
      "theme-universal:border-(--ul-theme-color-secondary-button-border)", //button-border color
      "theme-universal:hover:shadow-[var(--button-hover-shadow)]",
      "theme-universal:border-1 theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15",
      "theme-universal:disabled:cursor-not-allowed"
    ),
    ghost: "", // Add ghost overrides if needed
    link: `text-link-focus hover:no-underline cursor-pointer focus:rounded-(--ul-theme-border-links-border-radius) hover:text-link-focus/80 theme-universal:focus:outline-none theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 theme-universal:focus:bg-base-focus/15 ${linkStyleValue}`, // Add link overrides if needed
  };

  // Size-specific theme overrides for border radius and typography
  const sizeThemeOverrides = {
    default: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button", //font-weight
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)" //font-size
    ),
    xs: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    sm: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    lg: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    icon: cn("theme-universal:rounded-button"),
    link: cn(
      "theme-universal:text-(length:--ul-theme-font-links-size)",
      "theme-universal:font-(weight:--ul-theme-font-links-weight)"
    ),
  };

  // Combine all theme classes with proper type safety
  const themeClasses = cn(
    variant && variantThemeOverrides[variant],
    size && sizeThemeOverrides[size]
  );

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className, themeClasses)}
      {...props}
    />
  );
}
