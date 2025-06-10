import { forwardRef } from "react";
import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import { cn } from "@/utils/helpers/cn";

export interface CaptchaBoxProps {
  label: string;
  name?: string;
  id?: string;
  error?: string;
  imageUrl: string;
  imageAltText: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  /**
   * Additional props to pass to the input element
   * Note: id, name, type, value, onChange, size are controlled by this component
   */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "value" | "onChange" | "size"
  >;
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  inputClassName?: string;
}

const CaptchaBox = forwardRef<HTMLInputElement, CaptchaBoxProps>(
  (
    {
      label,
      name = "captcha",
      id = "captcha-input",
      error,
      imageUrl,
      imageAltText,
      onInputChange,
      inputValue,
      inputProps,
      className,
      imageWrapperClassName,
      imageClassName,
      inputWrapperClassName,
      errorTextClassName,
      inputClassName,
    },
    ref,
  ) => {
    const formFieldLabelProps: LabelProps = {
      children: label,
      htmlFor: id,
    };

    const formFieldInputProps: InputProps = {
      id: id,
      name: name,
      type: "text",
      className: inputClassName,
      value: inputValue,
      onChange: onInputChange,
      placeholder: "\u00A0",
      autoComplete: "off",
      ...inputProps,
    };

    const currentImageUrl = imageUrl;

    return (
      <div className={cn("space-y-2", className)}>
        {currentImageUrl && (
          <div
            className={cn(
              "flex justify-center border border-gray-mid rounded p-8 bg-background-widget",
              imageWrapperClassName,
            )}
          >
            <img
              src={currentImageUrl}
              alt={imageAltText}
              className={cn("object-contain", imageClassName)}
            />
          </div>
        )}
        <FormField
          ref={ref}
          labelProps={formFieldLabelProps}
          inputProps={formFieldInputProps}
          error={error}
          inputWrapperClassName={inputWrapperClassName}
          errorTextClassName={errorTextClassName}
        />
      </div>
    );
  },
);

CaptchaBox.displayName = "CaptchaBox";

export default CaptchaBox;
