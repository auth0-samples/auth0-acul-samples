import React, { useEffect, useRef, useState } from "react";
import Turnstile from "react-turnstile";

import { cn } from "@/lib/utils";

import type { CaptchaResponse, CaptchaWidgetProps } from "../index";

const MAX_RETRY_ATTEMPTS = 3; // Define a maximum number of retries

const AuthChallengeWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  theme,
  error,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error); // Manage internal as well as error from backend
  const retryCount = useRef(0); // Use a ref to persist retry count across renders

  // Update internal error if external error prop changes
  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  if (config.provider !== "auth0_v2") {
    return null;
  }

  const siteKey = config.siteKey;

  if (!siteKey) {
    return null;
  }

  const handleVerify = (token: string) => {
    retryCount.current = 0; // Reset retry count on successful verification
    setErrorMessage(undefined); // Clear any previous error

    const response: CaptchaResponse = {
      provider: "auth0_v2",
      token: token,
    };
    onCaptchaResponse(response);
  };

  const handleError = (error: string) => {
    onCaptchaResponse(null);

    if (retryCount.current < MAX_RETRY_ATTEMPTS) {
      retryCount.current += 1;
      return;
    } else {
      setErrorMessage(`Verification failed after multiple attempts: ${error}`);
    }
  };

  const handleExpire = () => {
    onCaptchaResponse(null);
    retryCount.current = 0; // Reset retry count on expiration
  };

  const auth0CaptchaWidgetStyle = {
    transform: "scale(1.06)",
    transformOrigin: "0 0",
    overflow: "hidden",
    display: "inline-block",
    lineHeight: 0,
    fontSize: 0,
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "rounded-sm inline-block",
          errorMessage ? "border border-[#d93025]" : "none"
        )}
        style={auth0CaptchaWidgetStyle}
      >
        <Turnstile
          sitekey={siteKey}
          onVerify={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          theme={theme}
          size="normal"
        />
      </div>
    </div>
  );
};

export default AuthChallengeWidget;
