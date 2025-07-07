import { forwardRef } from "react";
import { cn } from "@/lib/utils";

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
      "block w-full border rounded transition-all duration-200",
      "focus:outline-none focus:ring-1 peer box-border",
      "overflow-hidden text-ellipsis whitespace-nowrap",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ];

    const sizeStyles = {
      sm: "px-2 py-2 h-10 text-sm",
      md: "px-3 py-4 h-14 text-base",
      lg: "px-4 py-5 h-16 text-lg",
    };

    const variantStyles = {
      default: "border-gray-mid focus:border-link focus:ring-link",
      error:
        "border-error ring-1 ring-error focus:border-error focus:ring-error",
      success: "border-success focus:border-success focus:ring-success",
    };

    const focusStyles = forceFocusStyle
      ? "border-link ring-1 ring-link"
      : variantStyles[variant];

    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={cn(baseStyles, sizeStyles[size], focusStyles, className)}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
