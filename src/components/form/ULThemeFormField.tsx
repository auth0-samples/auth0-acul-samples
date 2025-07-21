import {
  FormField as BaseFormField,
  type FormFieldProps as BaseFormFieldProps,
} from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export interface ULThemeFormFieldProps extends BaseFormFieldProps {
  /**
   * Additional wrapper class for form field container
   */
  wrapperClassName?: string;
}

const ULThemeFormField = ({
  className,
  variant = "default",
  size = "default",
  wrapperClassName,
  error,
  ...props
}: ULThemeFormFieldProps) => {
  // Determine variant based on error prop
  const effectiveVariant = error ? "error" : variant;

  // Theme overrides for the form field
  const themeOverrides = cn(
    "mb-2",
    // Base styling with Auth0 theme variables
    "theme-universal:bg-(--ul-theme-color-input-background)",
    "theme-universal:text-input-filled-text",
    "theme-universal:border-(length:--ul-theme-input-border-weight)",
    "theme-universal:border-(--ul-theme-color-input-border)",
    "theme-universal:placeholder:text-input-labels-placeholders",
    "theme-universal:rounded-input",
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body-text",
    // Focus states
    "theme-universal:focus-within:border-base-focus",
    "theme-universal:focus-within:ring-base-focus/15",
    // Floating label background override to match input background
    "theme-universal:[&_label]:bg-(--ul-theme-color-input-background)",
    // Error states
    error && [
      "theme-universal:text-error",
      "theme-universal:border-error",
      "theme-universal:focus-within:border-error",
      "theme-universal:focus-within:ring-error/15",
    ]
  );

  return (
    <div className={cn("w-full", wrapperClassName)}>
      <BaseFormField
        className={cn(themeOverrides, className)}
        variant={effectiveVariant}
        size={size}
        error={error}
        {...props}
      />
    </div>
  );
};

ULThemeFormField.displayName = "ULThemeFormField";

export { ULThemeFormField };
