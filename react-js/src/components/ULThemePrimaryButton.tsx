import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ULThemePrimaryButtonProps = ButtonProps;

export function ULThemePrimaryButton({
  variant = "primary",
  size = "default",
  className,
  ...props
}: ULThemePrimaryButtonProps) {
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
    outline: "", // Add outline overrides if needed
    ghost: "", // Add ghost overrides if needed
    link: "", // Add link overrides if needed
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
