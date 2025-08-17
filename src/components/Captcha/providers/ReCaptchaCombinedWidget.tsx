import React, { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ReCAPTCHAEnterprise from "react-google-recaptcha-enterprise";

import { cn } from "@/lib/utils";

import type { CaptchaResponse, CaptchaWidgetProps } from "../index";

const RECAPTCHA_V2_PROVIDER = "recaptcha_v2";
const RECAPTCHA_ENTERPRISE_PROVIDER = "recaptcha_enterprise";

// Type alias for the component prop to be rendered
type ReCAPTCHAComponent = typeof ReCAPTCHA | typeof ReCAPTCHAEnterprise;

const RecaptchaCombinedWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  error,
  theme,
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);

  const handleChange = useCallback(
    (value: string | null) => {
      const newToken = value || undefined;
      setToken(newToken);
      setErrorMessage(undefined);

      if (value) {
        const response: CaptchaResponse = {
          provider: config.provider,
          token: value,
        };
        onCaptchaResponse(response);
      } else {
        onCaptchaResponse(null);
      }
    },
    [config.provider, onCaptchaResponse]
  );

  const handleExpired = useCallback(() => {
    handleChange(null);
  }, [handleChange]);

  const handleError = useCallback(() => {
    setToken(undefined);
    onCaptchaResponse(null);
  }, [onCaptchaResponse]);

  console.log("RecaptchaCombinedWidget errorMessage:", errorMessage);

  // --- Guards ---
  const isEnterprise = config.provider === RECAPTCHA_ENTERPRISE_PROVIDER;
  const isV2 = config.provider === RECAPTCHA_V2_PROVIDER;

  if (!isEnterprise && !isV2) {
    return null;
  }

  const siteKey = config.siteKey;
  if (!siteKey) {
    return null;
  }

  // --- Helper Functions ---
  const getRecaptchaTheme = (): "light" | "dark" => {
    if (theme === "auto") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
      return "light";
    }
    return theme || "light";
  };

  const ReCAPTCHAComponent: ReCAPTCHAComponent = isEnterprise
    ? ReCAPTCHAEnterprise
    : ReCAPTCHA;

  // --- Render ---
  const reCaptchaWidgetStyle = {
    transform: "scale(1.06)",
    transformOrigin: "0 0",
  };

  const inputName = isEnterprise
    ? "g-recaptcha-response-enterprise"
    : "g-recaptcha-response";
  const inputId = isEnterprise
    ? "hidden-recaptcha-enterprise"
    : "hidden-recaptcha-v2";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex w-full">
        <div style={reCaptchaWidgetStyle}>
          <ReCAPTCHAComponent
            sitekey={siteKey}
            onChange={handleChange}
            onExpired={handleExpired}
            onError={handleError}
            theme={getRecaptchaTheme()}
            size="normal"
          />
        </div>
        <input type="hidden" name={inputName} id={inputId} value={token} />
      </div>
    </div>
  );
};

export default RecaptchaCombinedWidget;
