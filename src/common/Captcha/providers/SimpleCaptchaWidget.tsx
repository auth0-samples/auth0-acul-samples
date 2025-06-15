import React, { useState } from "react";
import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

const SimpleCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  label = "",
  error,
}) => {
  const [answer, setAnswer] = useState("");

  if (config.provider !== "auth0") {
    return null;
  }

  const imageUrl = config.image;
  const placeholder = config.placeholder || "";
  const displayLabel = label;
  const imageAltText = "";

  // Handle input change for auth0 v1 (image captcha)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAnswer(value);

    const response: CaptchaResponse = {
      provider: "auth0",
      answer: value,
    };
    onCaptchaResponse(response);
  };

  const formFieldLabelProps: LabelProps = {
    children: displayLabel,
    htmlFor: "simple-captcha-input",
  };

  const formFieldInputProps: InputProps = {
    id: "simple-captcha-input",
    name: "simple-captcha",
    type: "text",
    value: answer,
    onChange: handleInputChange,
    placeholder: placeholder,
    autoComplete: "off",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {imageUrl && (
        <div
          className={cn(
            "flex justify-center border border-gray-mid rounded p-8 bg-background-widget",
          )}
        >
          <img
            src={imageUrl}
            alt={imageAltText}
            className={cn("object-contain")}
          />
        </div>
      )}

      <FormField
        labelProps={formFieldLabelProps}
        inputProps={formFieldInputProps}
        error={error}
      />
    </div>
  );
};

export default SimpleCaptchaWidget;
