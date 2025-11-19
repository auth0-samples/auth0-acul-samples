import React, { useCallback, useEffect, useState } from "react";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import { cn } from "@/lib/utils";
import { getCaptchaTheme } from "@/utils/theme/themeEngine";

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

  // Only render HCaptcha on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "w-full rounded-sm",
          errorMessage
            ? "border border-[#d93025] overflow-hidden"
            : "none overflow-visible"
        )}
      >
        <div
          style={{
            transform: "scale(1.06)",
            transformOrigin: "0 0",
          }}
        >
          <HCaptcha
            sitekey={siteKey}
            onVerify={handleVerify}
            onExpire={handleExpired}
            onError={handleError}
            theme={getCaptchaTheme(theme)}
            size="normal"
          />
        </div>
      </div>
      <input
        type="hidden"
        name="h-captcha-response"
        id="hidden-h-captcha"
        value={token || ""}
      />
    </div>
  );
};

export default HCaptchaWidget;
