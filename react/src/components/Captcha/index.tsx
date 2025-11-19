import React from "react";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

import type { CaptchaContext } from "@auth0/auth0-acul-react/types";

import AuthChallengeWidget from "./providers/AuthChallengeWidget";
import FriendlyCaptchaWidget from "./providers/FriendlyCaptchaWidget";
import HCaptchaWidget from "./providers/HCaptchaWidget";
import RecaptchaCombinedWidget from "./providers/ReCaptchaCombinedWidget";
import SimpleCaptchaWidget from "./providers/SimpleCaptchaWidget";

// ---
// Interfaces
// ---

export interface CaptchaResponse {
  provider: string;
  token?: string;
  answer?: string;
  arkoseToken?: string;
}

export interface CaptchaWidgetProps<T extends FieldValues = FieldValues> {
  config: {
    provider: string;
    siteKey?: string;
    image?: string;
    size?: string;
    placeholder?: string;
  };
  control?: Control<T>;
  rules?: RegisterOptions<T>;
  name: Path<T>;
  onCaptchaResponse: (response: CaptchaResponse | null) => void;
  className?: string;
  label?: string;
  theme?: "light" | "dark" | "auto";
  error?: string;
}

// Use SDK's CaptchaContext interface
export type ICaptcha = CaptchaContext;

export interface CaptchaProps<T extends FieldValues = FieldValues> {
  captcha?: ICaptcha;
  onValidationChange?: (
    isValid: boolean,
    value?: string,
    error?: string
  ) => void;
  label?: string;
  sdkError?: string;
  theme?: "light" | "dark" | "auto";
  className?: string;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  name: Path<T>;
}

// ---
// Main Component
// ---

const Captcha = <T extends FieldValues = FieldValues>({
  control,
  rules,
  name,
  captcha,
  onValidationChange,
  label,
  sdkError,
  theme,
  className,
}: CaptchaProps<T>) => {
  // ---
  // Constants and Mappings
  // ---

  function getCaptchaWidgetMap<T extends FieldValues>() {
    return {
      recaptcha_v2: RecaptchaCombinedWidget as React.ComponentType<
        CaptchaWidgetProps<T>
      >,
      recaptcha_enterprise: RecaptchaCombinedWidget as React.ComponentType<
        CaptchaWidgetProps<T>
      >,
      hcaptcha: HCaptchaWidget as React.ComponentType<CaptchaWidgetProps<T>>,
      auth0_v2: AuthChallengeWidget as React.ComponentType<
        CaptchaWidgetProps<T>
      >,
      friendly_captcha: FriendlyCaptchaWidget as React.ComponentType<
        CaptchaWidgetProps<T>
      >,
    };
  }
  const CAPTCHA_WIDGET_MAP = getCaptchaWidgetMap<T>();
  const { provider, image, siteKey } = captcha || {};

  // If no provider is specified, render nothing.
  if (!provider) {
    return null;
  }

  const handleResponse = (res: CaptchaResponse | null) => {
    if (onValidationChange) {
      if (res) {
        const value =
          res.provider === "auth0" ? res.answer : res.token || res.arkoseToken;
        const isValid = !!value;
        onValidationChange(isValid, value);
      } else {
        onValidationChange(false);
      }
    }
  };

  // Handle the special case for SimpleCaptchaWidget (Auth0 v1)
  if (provider === "auth0") {
    return image ? (
      <SimpleCaptchaWidget
        config={{ provider: "auth0", image }}
        onCaptchaResponse={handleResponse}
        control={control}
        name={name}
        rules={rules}
        label={label}
        error={sdkError}
        className={className}
      />
    ) : null;
  }

  // Use the map for other providers
  const SpecificCaptchaWidget =
    CAPTCHA_WIDGET_MAP[provider as keyof typeof CAPTCHA_WIDGET_MAP];

  if (SpecificCaptchaWidget && siteKey) {
    return (
      <SpecificCaptchaWidget
        config={{ provider, siteKey }}
        name={name}
        onCaptchaResponse={handleResponse}
        theme={theme}
        label={label}
        error={sdkError}
        className={className}
      />
    );
  }
  return null;
};

export default Captcha;
