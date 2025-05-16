import React from "react";
import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";

export interface CaptchaBoxProps {
  label?: string;
  name?: string;
  id?: string;
  error?: string;
  imageUrl: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  inputProps?: Omit<InputProps, "id" | "name" | "type" | "value" | "onChange">;
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  inputClassName?: string;
}

const CaptchaBox: React.FC<CaptchaBoxProps> = ({
  label,
  name = "captcha",
  id = "captcha-input",
  error,
  imageUrl,
  onInputChange,
  inputValue,
  inputProps,
  className,
  imageWrapperClassName,
  imageClassName,
  inputWrapperClassName,
  errorTextClassName,
  inputClassName,
}) => {
  const formFieldLabelProps: LabelProps = {
    children: label || "CAPTCHA",
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
    <div className={`${className || ""}`}>
      {currentImageUrl && (
        <div className={`${imageWrapperClassName || ""}`}>
          <img
            src={currentImageUrl}
            alt="CAPTCHA challenge"
            className={`${imageClassName || ""}`}
          />
        </div>
      )}
      <FormField
        labelProps={formFieldLabelProps}
        inputProps={formFieldInputProps}
        error={error}
        inputWrapperClassName={inputWrapperClassName}
        errorTextClassName={errorTextClassName}
      />
    </div>
  );
};

export default CaptchaBox;
