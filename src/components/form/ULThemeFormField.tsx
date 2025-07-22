import { cva } from "class-variance-authority";

import { useFormField } from "@/components/ui/form";
import {
  FormField as BaseFormField,
  type FormFieldProps as BaseFormFieldProps,
} from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

const ulThemeFormFieldVariants = cva(
  [
    // Layout & Spacing
    "mb-2",

    // Base Background & Colors
    "theme-universal:bg-input-bg",
    "theme-universal:text-input-text",

    // Border Styling
    "theme-universal:border-(length:--ul-theme-border-input-border-weight)",
    "theme-universal:border-input-border",

    // Border Radius
    "theme-universal:rounded-input",

    // Typography - Input Text
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body-text",

    // Placeholder Styling
    "theme-universal:placeholder:text-input-labels",
    "theme-universal:[&_input]:placeholder:text-input-labels",
    "theme-universal:placeholder:text-(length:--ul-theme-font-input-labels-size)",
    "theme-universal:[&_input]:placeholder:text-(length:--ul-theme-font-input-labels-size)",
    "theme-universal:placeholder:font-input-label",
    "theme-universal:[&_input]:placeholder:font-input-label",

    // Floating Label Background
    "theme-universal:[&_label]:bg-input-bg",

    // Floating Label - Base Styling (applies to all labels)
    "theme-universal:[&_label]:text-input-labels",
    "theme-universal:[&_label]:text-(length:--ul-theme-font-input-labels-size)",
    "theme-universal:[&_label]:font-input-label",
  ],
  {
    variants: {
      themeState: {
        default: [
          // Focus States - Default
          "theme-universal:focus-within:border-base-focus",
          "theme-universal:focus-within:ring-base-focus/15",
        ],
        error: [
          // Error States
          "theme-universal:text-error",
          "theme-universal:border-error",
          "theme-universal:focus-within:border-error",
          "theme-universal:focus-within:ring-error/15",

          // Error Label States - Force override using color CSS property
          "theme-universal:[&_label]:text-error",
        ],
      },
    },
    defaultVariants: {
      themeState: "default",
    },
  }
);

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
  // Get the form field context for proper ID association
  const { formItemId } = useFormField();

  // Determine variant based on error prop
  const effectiveVariant = error ? "error" : variant;

  // Generate theme classes using CVA - automatically use error state when error prop is true
  const themeOverrides = ulThemeFormFieldVariants({
    themeState: error ? "error" : "default",
  });

  return (
    <div className={cn("w-full", wrapperClassName)}>
      <BaseFormField
        id={formItemId}
        className={cn(className, themeOverrides)}
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
