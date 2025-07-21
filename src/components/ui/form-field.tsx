import { Field as FieldPrimitive } from "@base-ui-components/react";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const formFieldVariants = cva(
  "bg-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive theme-default:active:scale-[0.99] relative box-border inline-flex w-full shrink-0 cursor-text items-center justify-center gap-2 text-sm transition-[color,box-shadow] duration-150 ease-in-out outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-input-foreground shadow-input-resting hover:shadow-input-hover focus-within:ring-ring focus-within:ring-4",
        error:
          "text-destructive-foreground shadow-input-destructive-resting hover:shadow-input-destructive-hover focus-within:ring-destructive-border/15 focus-within:ring-4",
      },
      size: {
        default: "h-14 theme-universal:rounded-input",
        sm: "h-12 theme-universal:rounded-input",
        lg: "h-16 theme-universal:rounded-input",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: boolean;
  helperText?: string;
  size?: VariantProps<typeof formFieldVariants>["size"];
  variant?: VariantProps<typeof formFieldVariants>["variant"];
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
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
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const isDisabled = props.disabled;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
    };

    // Compose event handlers to work with React Hook Form
    const composedProps = {
      ...props,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
    };

    // Check if input has value - properly handle React Hook Form controlled inputs
    const hasValue = Boolean(
      (props.value !== undefined && props.value !== null && props.value !== '') ||
      (props.defaultValue !== undefined && props.defaultValue !== null && props.defaultValue !== '')
    );
    
    const isLabelFloating = focused || hasValue;

    return (
      <div>
        <FieldPrimitive.Root
          className={cn(
            formFieldVariants({ variant: error ? "error" : variant, size }),
            "group relative items-end gap-0.5",
            isDisabled &&
              "bg-input-muted text-input-foreground cursor-not-allowed opacity-50",
            isDisabled && variant === "default" && "bg-input-muted",
            startAdornment && "pl-[5px]",
            endAdornment && "pr-[5px]",
            className,
          )}
        >
          <FieldPrimitive.Label
            htmlFor={props.id}
            className={cn(
              "pointer-events-none absolute top-1/2 left-4 z-[10] -translate-y-1/2 text-sm transition-all duration-150 ease-in-out",
              startAdornment && "left-0",
              // Floating state - position within border area
              isLabelFloating &&
                "-translate-y-[1.18rem] top-2 z-10 bg-input px-2",
              error ? "text-destructive-foreground" : "text-muted-foreground",
              focused && !error && "text-primary",
            )}
          >
            {label}
          </FieldPrimitive.Label>
          {startAdornment && (
            <div className="flex h-full items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              {startAdornment}
            </div>
          )}
          <div className="relative flex-1">
            <FieldPrimitive.Control
              className={cn(
                "h-14 w-full flex-1 rounded-input bg-transparent px-3 py-4 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium",
                isDisabled &&
                  "bg-input-muted text-input-foreground cursor-not-allowed opacity-50",
                startAdornment ? "rounded-l-none pl-0" : "pl-3",
                endAdornment ? "rounded-r-none pr-0" : "pr-3",
                size === "sm" && "h-12 py-3 text-sm",
                size === "lg" && "h-16 py-5 text-base",
              )}
              ref={ref}
              {...composedProps}
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
              error ? "text-destructive-foreground" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export { FormField, formFieldVariants };
