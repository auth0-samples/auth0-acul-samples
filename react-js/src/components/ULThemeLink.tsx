import * as React from "react";

import { Link, type LinkProps } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

export interface ULThemeLinkProps extends LinkProps {
  /**
   * The content of the link element.
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
  /**
   * Optional ref for the link element.
   */
  ref?: React.Ref<HTMLAnchorElement>;
}

const ULThemeLink = ({
  children,
  className,
  disabled = false,
  ref,
  ...props
}: ULThemeLinkProps) => {
  // Base component styles
  const baseStyles =
    "text-link-focus text-(length:--ul-theme-font-links-size) font-(weight:--ul-theme-font-links-weight) focus:rounded-(--ul-theme-border-links-border-radius) hover:text-link-focus/80";

  // Disabled state styles
  const disabledStyles = disabled
    ? "pointer-events-none text-muted cursor-not-allowed"
    : "";

  // UL theme overrides
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
};

export default ULThemeLink;
