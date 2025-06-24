import { forwardRef } from "react";
import { cn } from "@/utils/helpers/cn";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * The unique id of the input field.
   */
  id: string;
  /**
   * The name of the input field.
   */
  name: string;
  /**
   * Optional class names for styling.
   */
  className?: string;
  /**
   * Force focus styling (used by FormField for complex interactions)
   */
  forceFocusStyle?: boolean;
  /**
   * Input size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Input variant for different contexts
   */
  variant?: "default" | "error" | "success";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className,
      id,
      name,
      forceFocusStyle = false,
      placeholder = "\u00A0",
      size = "md",
      variant = "default",
      ...rest
    },
    ref,
  ) => {
    const baseStyles = [
      "block w-full border border-solid rounded-input transition-all duration-200",
      "focus:outline-none focus:ring-1 peer box-border",
      "overflow-hidden text-ellipsis whitespace-nowrap",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // Typography using Auth0 tokens
      "[font-weight:var(--font-weight-input-label)]",
    ];

    const sizeStyles = {
      sm: "px-2 py-2 h-10 text-sm",
      md: "px-3 py-4 h-14",
      lg: "px-4 py-5 h-16 text-lg",
    };

    const variantStyles = {
      default:
        "border-input-border bg-input-bg text-input-text " +
        "focus:border-base-focus focus:ring-base-focus",
      error:
        "border-error ring-1 ring-error bg-input-bg text-input-text " +
        "focus:border-error focus:ring-error",
      success:
        "border-success bg-input-bg text-input-text " +
        "focus:border-success focus:ring-success",
    };

    const focusStyles = forceFocusStyle
      ? "border-base-focus ring-1 ring-base-focus"
      : variantStyles[variant];

    const allClasses = cn(baseStyles, sizeStyles[size], focusStyles, className);

    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={allClasses}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
