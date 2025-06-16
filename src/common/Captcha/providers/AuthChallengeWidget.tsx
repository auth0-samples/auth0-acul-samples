import React, { useState } from "react";
import Turnstile from "react-turnstile";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

const AuthChallengeWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
}) => {
  const [token, setToken] = useState("");

  if (config.provider !== "auth0_v2") {
    return null;
  }

  const siteKey = config.siteKey;

  if (!siteKey) {
    return null;
  }

  const handleVerify = (token: string) => {
    setToken(token);
    const response: CaptchaResponse = {
      provider: "auth0_v2",
      token: token,
    };
    onCaptchaResponse(response);
  };

  const handleError = () => {
    setToken("");
    onCaptchaResponse(null);
  };

  const handleExpire = () => {
    setToken("");
    onCaptchaResponse(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full flex justify-center">
        <Turnstile
          sitekey={siteKey}
          onVerify={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          theme="light"
          size="normal"
        />
        <input type="hidden" name="captcha" value={token} />
      </div>
    </div>
  );
};

export default AuthChallengeWidget;
