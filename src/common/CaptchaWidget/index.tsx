import React from "react";
import type { CaptchaConfig, CaptchaResponse } from "./types";

// Import all provider widgets
import Auth0CaptchaWidget from "./providers/Auth0CaptchaWidget";
import RecaptchaWidget from "./providers/RecaptchaWidget";
import HCaptchaWidget from "./providers/HCaptchaWidget";
import ArkoseWidget from "./providers/ArkoseWidget";
import AuthChallengeWidget from "./providers/AuthChallengeWidget";

export interface UniversalCaptchaWidgetProps {
  config: CaptchaConfig;
  onCaptchaResponse: (response: CaptchaResponse | null) => void;
  onError?: (error: string) => void;
  className?: string;
  label?: string;
  error?: string;
}

/**
 * Universal CAPTCHA widget that can handle multiple providers
 */
const UniversalCaptchaWidget: React.FC<UniversalCaptchaWidgetProps> = (
  props,
) => {
  const { config } = props;

  // Render the appropriate widget based on provider
  switch (config.provider) {
    case "auth0":
    case "auth0_v2":
      return <Auth0CaptchaWidget {...props} />;

    case "recaptcha":
      return <RecaptchaWidget {...props} />;

    case "hcaptcha":
      return <HCaptchaWidget {...props} />;

    case "arkose":
      return <ArkoseWidget {...props} />;

    case "auth-challenge":
      return <AuthChallengeWidget {...props} />;

    default:
      console.warn(`Unsupported CAPTCHA provider: ${(config as any).provider}`);
      return (
        <div className="captcha-error p-4 border border-error rounded bg-error/10">
          <p className="text-error">
            Unsupported CAPTCHA provider: {(config as any).provider}
          </p>
        </div>
      );
  }
};

export default UniversalCaptchaWidget;

// Export types for external usage
export type { CaptchaConfig, CaptchaResponse, CaptchaProvider } from "./types";

// Utility function to create captcha config from Auth0 response
export const createCaptchaConfig = (captchaData: any): CaptchaConfig | null => {
  if (!captchaData) return null;

  const provider = captchaData.provider;

  switch (provider) {
    case "auth0":
      return {
        provider: "auth0",
        image: captchaData.image,
        placeholder: captchaData.placeholder,
      };

    case "auth0_v2":
      return {
        provider: "auth0_v2",
        siteKey: captchaData.siteKey,
        theme: captchaData.theme || "light",
      };

    case "recaptcha":
      return {
        provider: "recaptcha",
        siteKey: captchaData.siteKey,
        theme: captchaData.theme || "light",
        size: captchaData.size || "normal",
        version: captchaData.version || "v2",
      };

    case "hcaptcha":
      return {
        provider: "hcaptcha",
        siteKey: captchaData.siteKey,
        theme: captchaData.theme || "light",
        size: captchaData.size || "normal",
      };

    case "arkose":
      return {
        provider: "arkose",
        publicKey: captchaData.publicKey,
        mode: captchaData.mode || "inline",
      };

    case "auth-challenge":
      return {
        provider: "auth-challenge",
        challengeType: captchaData.challengeType || "sms",
        endpoint: captchaData.endpoint,
      };

    default:
      console.warn(`Unknown CAPTCHA provider: ${provider}`);
      return null;
  }
};
