import { forwardRef } from "react";
import { cn } from "@/utils/helpers/cn";
import type { IconProps } from "@/common/Icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link" | "social" | "icon";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactElement<IconProps>;
  iconRight?: React.ReactElement<IconProps>;
  /**
   * Loading text to display when isLoading is true - REQUIRED when isLoading is true
   */
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      className,
      disabled,
      type = "button",
      loadingText,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center text-button [font-weight:var(--font-weight-button)] focus:outline-none transition-colors duration-150 ease-in-out";

    const cursorStyles =
      disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer";

    // Variant styles
    let variantStyles = "";
    switch (variant) {
      case "primary":
        variantStyles =
          "bg-primary-button text-primary-button-label " +
          "border border-solid border-primary-button " +
          "rounded-button px-4 " +
          "hover:bg-primary-button/90 " +
          "focus:ring-4 focus:ring-primary-button/15 " +
          "disabled:opacity-70 disabled:bg-primary-button/70";
        break;
      case "secondary":
        variantStyles =
          "bg-widget-bg text-secondary-button-label " +
          "border border-solid border-secondary-button-border " +
          "rounded-button " +
          "hover:bg-widget-border/20 " +
          "focus:ring-4 focus:ring-primary-button/15 " +
          "disabled:opacity-70";
        break;
      case "icon":
        variantStyles =
          "h-full flex items-center justify-center px-3 " +
          "text-body-text hover:text-base-hover " +
          "focus:outline-none disabled:opacity-50";
        break;
      default:
        variantStyles = "";
        break;
    }

    // Size styles - clean and simple
    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = variant === "icon" ? "" : "py-1";
        break;
      case "md":
        sizeStyles = variant === "icon" ? "" : "py-4";
        break;
      case "lg":
        sizeStyles = variant === "icon" ? "" : "py-5";
        break;
    }

    const widthStyles = fullWidth ? "w-full" : "";
    const loadingStyles = isLoading ? "opacity-75" : "";

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        className={cn(
          baseStyles,
          variantStyles,
          sizeStyles,
          widthStyles,
          loadingStyles,
          cursorStyles,
          className,
        )}
        {...rest}
      >
        {isLoading && loadingText && (
          <span className="mr-2">{loadingText}</span>
        )}
        {!isLoading && iconLeft && (
          <span className="mr-2 flex items-center">{iconLeft}</span>
        )}
        {!isLoading && children}
        {!isLoading && iconRight && (
          <span className="ml-2 flex items-center">{iconRight}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export type { IconProps as ButtonIconProps } from "@/common/Icon";
export default Button;
