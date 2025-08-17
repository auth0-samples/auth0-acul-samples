import React, { useCallback, useEffect, useState } from "react";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import { cn } from "@/lib/utils";

import type { CaptchaResponse, CaptchaWidgetProps } from "../index";

const HCAPTCHA_PROVIDER = "hcaptcha";

const HCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  error,
  theme,
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
  const [isClient, setIsClient] = useState(false);

  console.log("HCaptchaWidget errorMessage:", errorMessage);

  const hCaptchaWidgetStyle = {
    transform: "scale(1.06)",
    transformOrigin: "0 0",
  };

  const handleVerify = useCallback(
    (value: string | null) => {
      const newToken = value || undefined;
      setToken(newToken);
      setErrorMessage(undefined);

      if (value) {
        const response: CaptchaResponse = {
          provider: HCAPTCHA_PROVIDER,
          token: value,
        };
        onCaptchaResponse(response);
      } else {
        onCaptchaResponse(null);
      }
    },
    [onCaptchaResponse]
  );

  const handleExpired = useCallback(() => {
    handleVerify(null);
  }, [handleVerify]);

  const handleError = useCallback(() => {
    setToken(undefined);
    onCaptchaResponse(null);
  }, [onCaptchaResponse]);

  useEffect(() => {
    // This effect runs only on the client side after the component mounts
    setIsClient(true);
  }, []);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  if (config.provider !== HCAPTCHA_PROVIDER) {
    return null;
  }
  const { siteKey } = config;
  if (!siteKey) {
    return null;
  }

  const getHCaptchaTheme = (): "light" | "dark" => {
    if (
      isClient &&
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return theme === "dark" ? "dark" : "light";
  };

  // Only render HCaptcha on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-center w-full">
        <div style={hCaptchaWidgetStyle}>
          <HCaptcha
            sitekey={siteKey}
            onVerify={handleVerify}
            onExpire={handleExpired}
            onError={handleError}
            theme={getHCaptchaTheme()}
            size="normal"
          />
        </div>
        <input
          type="hidden"
          name="h-captcha-response"
          id="hidden-h-captcha"
          value={token || ""}
        />
      </div>
    </div>
  );
};

export default HCaptchaWidget;
