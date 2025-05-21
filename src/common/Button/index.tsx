import React from "react";
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
}

const Button: React.FC<ButtonProps> = ({
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
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium focus:outline-none transition-colors duration-150 ease-in-out";

  let cursorStyles =
    disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-primary text-white hover:bg-primary/90 focus:ring-4 focus:ring-primary/15 disabled:opacity-70 disabled:bg-primary/70 px-4 py-4 text-md rounded";
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
      sizeStyles = variant === "icon" ? "" : "py-1 text-md rounded";
      break;
    case "lg":
      sizeStyles = variant === "icon" ? "" : "py-1 text-lg rounded-lg";
      break;
  }

  const widthStyles = fullWidth ? "w-full" : "";
  const loadingStyles = isLoading ? "opacity-75" : "";

  const combinedClassName = [
    baseStyles,
    variantStyles,
    sizeStyles,
    widthStyles,
    loadingStyles,
    cursorStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={combinedClassName}
      {...rest}
    >
      {isLoading && <span className="mr-2">Processing...</span>}
      {!isLoading && iconLeft && (
        <span className="mr-2 flex items-center">{iconLeft}</span>
      )}
      {!isLoading && children}
      {!isLoading && iconRight && (
        <span className="ml-2 flex items-center">{iconRight}</span>
      )}
    </button>
  );
};

export type { IconProps as ButtonIconProps } from "@/common/Icon";
export default Button;
