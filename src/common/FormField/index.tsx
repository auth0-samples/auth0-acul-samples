import { forwardRef } from "react";
import Label from "@/common/Label";
import type { LabelProps } from "@/common/Label";
import Input from "@/common/Input";
import type { InputProps } from "@/common/Input";
import Icon from "@/common/Icon";
import { ExclamationCircleIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  labelProps: LabelProps;
  inputProps: InputProps;
  error?: string;
  className?: string;
  inputIcon?: React.ReactNode;
  isParentFocused?: boolean;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  /**
   * Help text to display below the input
   */
  helpText?: string;
  /**
   * Whether to show the error icon
   */
  showErrorIcon?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      labelProps,
      inputProps,
      error,
      className,
      inputIcon,
      isParentFocused = false,
      inputWrapperClassName,
      errorTextClassName,
      helpText,
      showErrorIcon = true,
    },
    ref,
  ) => {
    const {
      id: inputId,
      className: inputClassName,
      ...restInputProps
    } = inputProps;

    // Determine input variant based on error state
    const inputVariant = error ? "error" : "default";

    // Combine input classes
    const combinedInputClassName = cn(
      inputClassName,
      inputIcon ? "pr-16" : "", // Add padding for icon
    );

    // Enhanced input props with error handling
    const enhancedInputProps: InputProps = {
      ...restInputProps,
      id: inputId,
      className: combinedInputClassName,
      variant: inputVariant,
      forceFocusStyle: isParentFocused,
      "aria-invalid": !!error,
      "aria-describedby":
        cn(error && `${inputId}-error`, helpText && `${inputId}-help`) ||
        undefined,
    };

    return (
      <div className={className}>
        <div
          className={cn(
            "relative mt-1 rounded-md shadow-sm",
            inputWrapperClassName,
          )}
        >
          <div className="relative w-full">
            <Input ref={ref} {...enhancedInputProps} />
            <Label
              {...labelProps}
              htmlFor={inputId}
              isError={!!error}
              forceApplyFocusStyle={isParentFocused}
            />
            {inputIcon && (
              <div
                className={cn(
                  "absolute inset-y-0 right-0 flex items-center rounded-r-md mt-px mt-3",
                  isParentFocused && "bg-primary/15",
                )}
              >
                {inputIcon}
              </div>
            )}
          </div>
        </div>

        {/* Help text */}
        {helpText && !error && (
          <div
            id={`${inputId}-help`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helpText}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            id={`${inputId}-error`}
            className={cn(
              "flex items-center mt-2 text-sm text-error",
              errorTextClassName,
            )}
            role="alert"
            aria-live="polite"
          >
            {showErrorIcon && (
              <Icon
                As={ExclamationCircleIcon}
                className="h-4 w-4 mr-1 flex-shrink-0"
              />
            )}
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
