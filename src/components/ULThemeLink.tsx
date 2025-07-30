import * as React from "react";
import { Link as LinkComponent, type LinkProps } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) =>
  LinkComponent(props, ref)
);

export interface ULThemeLinkProps extends LinkProps {
  /**
   * The content of the card element.
   */
  children: React.ReactNode;
  /**
   * Additional class names for custom styling.
   */
  className?: string;
  /**
   * Optional flag to disable the link.
   */
  disabled?: boolean;
}

const ULThemeLink = React.forwardRef<HTMLAnchorElement, ULThemeLinkProps>(
  ({ children, className, disabled = false, ...props }, ref) => {
    // Base component styles
    const baseStyles =
      "text-link-focus text-(length:--ul-theme-font-links-size) font-(weight:--ul-theme-font-links-weight) focus:rounded-(--ul-theme-border-links-border-radius) hover:text-link-focus/80";
    // Disabled state styles
    const disabledStyles = disabled
      ? "pointer-events-none text-muted cursor-not-allowed"
      : "";
    // UL theme overrrides
    const variantThemeOverrides =
      "theme-universal:focus:outline-none theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 theme-universal:focus:bg-base-focus/15"; // focus base color

    // Using extractTokenValue utility to extract the link style variant type from the CSS variable
    const linkStyleValue =
      extractTokenValue("--ul-theme-font-links-style") === "normal"
        ? "none"
        : "always";

    return (
      <Link
        ref={ref}
        className={cn(
          baseStyles,
          disabledStyles,
          variantThemeOverrides,
          className
        )}
        underline={linkStyleValue}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

ULThemeLink.displayName = "ULThemeLink";

export default ULThemeLink;
