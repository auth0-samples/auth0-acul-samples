import { forwardRef } from "react";
import { cn } from "@/lib/utils";
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
    const baseStyles =
      "inline-flex items-center justify-center font-medium focus:outline-none transition-colors duration-150 ease-in-out";

    const cursorStyles =
      disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer";

    let variantStyles = "";
    switch (variant) {
      case "primary":
        variantStyles =
          "bg-primary text-white hover:bg-primary/90 focus:ring-4 focus:ring-primary/15 disabled:opacity-70 disabled:bg-primary/70 px-4";
        break;
      case "secondary":
        variantStyles =
          "bg-background-widget text-text-default border border-gray-mid hover:bg-gray-100 focus:ring-4 focus:ring-primary/15 disabled:opacity-70";
        break;
      case "icon":
        variantStyles =
          "h-full flex items-center justify-center px-3 focus:outline-none hover:text-text-default disabled:opacity-50";
        break;
      default:
        variantStyles = "";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = variant === "icon" ? "" : "py-1 text-sm rounded-sm";
        break;
      case "md":
        sizeStyles = variant === "icon" ? "" : "py-4 text-md rounded";
        break;
      case "lg":
        sizeStyles = variant === "icon" ? "" : "py-5 text-lg rounded-lg";
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
