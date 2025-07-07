import React from "react";
import { FormField, FormFieldProps } from "@/components/ui/form-field"; // Import the FormField component and its props
import { cn } from "@/utils/helpers/cn"; // Utility function for conditional class names

// Extend FormFieldProps to include additional props for the wrapper component
interface FormFieldWrapperProps extends FormFieldProps {
  className?: string; // Optional custom class for the wrapper
  errorMessage?: string; // Custom error message for the field
  forceFocusStyle?: boolean; // Flag to force focus styles
}

// Wrapper component for FormField to add additional functionality or styling
const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  className,
  label,
  error,
  errorMessage,
  helperText,
  startAdornment,
  endAdornment,
  size,
  variant = "default",
  forceFocusStyle = false,
  ...props
}) => {
  // Theme overrides for consistent styling
  const themeOverrides = "theme-universal:rounded-input theme-universal:bg-primary-button-label";

  return (
    <FormField
      className={cn(className, themeOverrides)} // Combine custom class with theme overrides
      label={label}
      error={error} // Pass error state to FormField
      helperText={helperText || errorMessage} // Display helper text or custom error message
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      size={size}
      variant={variant}
      {...props} // Spread additional props to FormField
    />
  );
};

export default FormFieldWrapper; // Export the wrapper component default FormFieldWrapper; // Export the wrapper component

