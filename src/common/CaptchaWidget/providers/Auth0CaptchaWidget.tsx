import React, { useState } from "react";
import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import { cn } from "@/utils/helpers/cn";
import type { CaptchaWidgetProps, CaptchaResponse } from "../types";

const Auth0CaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  label,
  error,
}) => {
  const [answer, setAnswer] = useState("");

  if (config.provider !== "auth0" && config.provider !== "auth0_v2") {
    return null;
  }

  // For auth0_v2, we'll use the challenge/response pattern
  const isV2 = config.provider === "auth0_v2";
  const imageUrl = config.image;
  const siteKey = config.siteKey;
  const placeholder = config.placeholder || "Enter the code shown above";
  const displayLabel = label || `${placeholder}*`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAnswer(value);

    const response: CaptchaResponse = {
      provider: config.provider,
      answer: value,
      ...(isV2 && siteKey && { token: `${siteKey}:${value}` }),
    };
    onCaptchaResponse(response);
  };

  const formFieldLabelProps: LabelProps = {
    children: displayLabel,
    htmlFor: "auth0-captcha-input",
  };

  const formFieldInputProps: InputProps = {
    id: "auth0-captcha-input",
    name: "auth0-captcha",
    type: "text",
    value: answer,
    onChange: handleInputChange,
    placeholder: "\u00A0",
    autoComplete: "off",
  };

  return (
    <div className={cn("auth0-captcha-container space-y-2", className)}>
      {/* CAPTCHA Image for v1 or generated challenge for v2 */}
      {(imageUrl || isV2) && (
        <div className="flex justify-center border border-gray-mid rounded p-8 bg-background-widget">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="CAPTCHA challenge"
              className="object-contain"
            />
          ) : isV2 ? (
            <div className="text-center space-y-2">
              <div className="text-2xl font-mono tracking-wider bg-gray-100 px-4 py-2 rounded border-2 border-dashed">
                {siteKey ? siteKey.slice(-8).toUpperCase() : "MOCK123"}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Answer input */}
      <FormField
        labelProps={formFieldLabelProps}
        inputProps={formFieldInputProps}
        error={error}
      />
    </div>
  );
};

export default Auth0CaptchaWidget;
