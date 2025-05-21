import React, { useRef } from "react";
import Label from "@/common/Label";
import type { LabelProps } from "@/common/Label";
import Input from "@/common/Input";
import type { InputProps } from "@/common/Input";
import Icon from "@/common/Icon";
import { ExclamationCircleIcon } from "@/assets/icons";

export interface FormFieldProps {
  labelProps: LabelProps;
  inputProps: InputProps;
  error?: string;
  className?: string;
  inputIcon?: React.ReactNode;
  isParentFocused?: boolean;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  labelProps,
  inputProps,
  error,
  className,
  inputIcon,
  isParentFocused,
  inputWrapperClassName,
  errorTextClassName,
}) => {
  const { id: inputId, className: inputSpecificClassName } = inputProps;
  const internalInputRef = useRef<HTMLInputElement>(null);

  let inputCombinedClassName = inputSpecificClassName || "";
  const errorRingStyles = "border-error focus:ring-error focus:border-error";

  let finalInputProps = { ...inputProps };
  delete finalInputProps.className;

  if (inputIcon) {
    inputCombinedClassName += " pr-16";
  }

  if (error) {
    inputCombinedClassName += ` ${errorRingStyles}`;
  } else if (isParentFocused) {
    finalInputProps.forceFocusStyle = true;
  }

  return (
    <div className={`${className || ""}`}>
      <div
        className={`relative mt-1 rounded-md shadow-sm ${inputWrapperClassName || ""}`}
      >
        <div className="relative w-full">
          <Input
            {...finalInputProps}
            ref={internalInputRef}
            className={inputCombinedClassName}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
          <Label {...labelProps} htmlFor={inputId} isError={!!error} />
          {inputIcon && (
            <div
              className={`absolute inset-y-0 right-0 flex items-center rounded-r-md mt-px mt-3 ${isParentFocused ? "bg-primary/15" : ""}`}
            >
              {inputIcon}
            </div>
          )}
        </div>
      </div>
      {error && (
        <div
          id={`${inputId}-error`}
          className={`flex items-center mt-2 text-sm text-error ${errorTextClassName || ""}`}
          role="alert"
        >
          <Icon As={ExclamationCircleIcon} className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
