import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha-enterprise";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

const RecaptchaEnterpriseWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
}) => {
  const [token, setToken] = useState("");

  if (config.provider !== "recaptcha_enterprise") {
    return null;
  }

  const siteKey = config.siteKey;

  if (!siteKey) {
    return null;
  }

  const handleChange = (value: string | null) => {
    const newToken = value || "";
    setToken(newToken);

    if (value) {
      const response: CaptchaResponse = {
        provider: "recaptcha_enterprise",
        token: value,
      };
      onCaptchaResponse(response);
    } else {
      onCaptchaResponse(null);
    }
  };

  const reCaptchaWidgetStyle = {
    transform: "scale(1.06)",
    transformOrigin: "0 0",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex w-full">
        <div style={reCaptchaWidgetStyle}>
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={handleChange}
            theme="light"
            size="normal"
          />
        </div>
        <input
          type="hidden"
          name="captcha"
          id="hidden-recaptcha-enterprise"
          value={token}
        />
      </div>
    </div>
  );
};

export default RecaptchaEnterpriseWidget;
