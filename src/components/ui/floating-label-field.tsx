import * as React from "react";

import { Field as FieldPrimitive } from "@base-ui-components/react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const floatingLabelFieldVariants = cva(
  "bg-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive theme-default:active:scale-[0.99] relative box-border inline-flex w-full shrink-0 cursor-text items-center justify-center text-sm transition-[color,box-shadow] duration-150 ease-in-out outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-input-foreground shadow-input-resting hover:shadow-input-hover focus-within:ring-ring focus-within:ring-4",
        error:
          "text-destructive-foreground shadow-input-destructive-resting hover:shadow-input-destructive-hover focus-within:ring-destructive-border/15 focus-within:ring-4",
      },
      size: {
        default: "h-14 rounded-2xl",
        sm: "h-12 rounded-2xl",
        lg: "h-16 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface FloatingLabelFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: boolean;
  helperText?: string;
  size?: VariantProps<typeof floatingLabelFieldVariants>["size"];
  variant?: VariantProps<typeof floatingLabelFieldVariants>["variant"];
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  isRequired?: boolean;
}

const FloatingLabelField = React.forwardRef<
  HTMLInputElement,
  FloatingLabelFieldProps
>(
  (
    {
      className,
      variant,
      size,
      error,
      helperText,
      label,
      startAdornment,
      endAdornment,
      isRequired,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      Boolean(props.value || props.defaultValue)
    );
    const isDisabled = props.disabled;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(Boolean(e.target.value));
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value));
      props.onChange?.(e);
    };

    const isLabelFloating = focused || hasValue;

    return (
      <div>
        <FieldPrimitive.Root
          className={cn(
            floatingLabelFieldVariants({
              variant: error ? "error" : variant,
              size,
            }),
            "group relative items-end gap-0.5",
            isDisabled &&
              "bg-input-muted text-input-foreground cursor-not-allowed opacity-50",
            isDisabled && variant === "default" && "bg-input-muted",
            startAdornment && "pl-[5px]",
            endAdornment && "pr-[5px]",
            className
          )}
        >
          <FieldPrimitive.Label
            htmlFor={props.id}
            className={cn(
              "pointer-events-none absolute top-1/2 left-4 z-[10] -translate-y-1/2 text-sm transition-all duration-150 ease-in-out origin-left",
              startAdornment && "left-0",
              // Floating state - position within border area
              isLabelFloating &&
                "scale-80 -translate-y-[1.18rem] top-2 z-10 bg-input px-1",
              error ? "text-destructive-foreground" : "text-muted-foreground",
              focused && !error && "text-primary"
            )}
          >
            {label}
            {isRequired && (
              <span className="text-destructive-foreground">*</span>
            )}
          </FieldPrimitive.Label>
          {startAdornment && (
            <div className="flex h-full items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              {startAdornment}
            </div>
          )}
          <div className="relative flex-1">
            <FieldPrimitive.Control
              id={props.id}
              className={cn(
                "h-14 w-full flex-1 rounded-2xl bg-transparent px-3 py-4 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium",
                // Override browser autofill styles without blocking borders
                "autofill:bg-transparent",
                "autofill:[-webkit-text-fill-color:inherit]",
                "autofill:[transition:background-color_9999s_ease-in-out_0s]",
                isDisabled &&
                  "bg-input-muted text-input-foreground cursor-not-allowed opacity-50",
                startAdornment ? "rounded-l-none pl-0" : "pl-3",
                endAdornment ? "rounded-r-none pr-0" : "pr-3",
                size === "sm" && "h-12 py-3 text-sm",
                size === "lg" && "h-16 py-5 text-base"
              )}
              // Spread props first, then override with our handlers
              // This ensures our focus/blur handlers take precedence over React Hook Form's
              // allowing proper floating label state management
              {...props}
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {endAdornment && (
            <div className="flex h-full items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              {endAdornment}
            </div>
          )}
        </FieldPrimitive.Root>
        {helperText && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-destructive-foreground" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingLabelField.displayName = "FloatingLabelField";

export { FloatingLabelField, floatingLabelFieldVariants };
