import React, { useEffect, useState } from "react";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

const HCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
}) => {
  const [token, setToken] = useState("");

  if (config.provider !== "hcaptcha") {
    return null;
  }

  const siteKey = config.siteKey;

  useEffect(() => {
    const addWidgetScript = document.createElement("script");
    addWidgetScript.src = "https://js.hcaptcha.com/1/api.js";
    addWidgetScript.async = true;
    addWidgetScript.defer = true;
    document.body.appendChild(addWidgetScript);

    (window as any).updateToken = (token: string) => {
      setToken(token);
      const response: CaptchaResponse = {
        provider: "hcaptcha",
        token: token,
      };
      onCaptchaResponse(response);
    };

    return () => {
      if (document.body.contains(addWidgetScript)) {
        document.body.removeChild(addWidgetScript);
      }
      // Clean up global callback
      delete (window as any).updateToken;
    };
  }, [onCaptchaResponse]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-center w-full">
        <div
          id="h-captcha"
          className="h-captcha"
          data-sitekey={siteKey}
          data-callback="updateToken"
          data-theme="light"
          data-size="normal"
        />
        <input
          type="hidden"
          name="captcha"
          id="hidden-h-captcha"
          value={token}
        />
      </div>
    </div>
  );
};

export default HCaptchaWidget;
