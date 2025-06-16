import React, { useEffect, useState } from "react";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

declare global {
  interface Window {
    Arkose: any;
    setupDetect: Function;
  }
}

const ArkoseWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
}) => {
  const [token, setToken] = useState("");

  if (config.provider !== "arkose") {
    return null;
  }

  const siteKey = config.siteKey;

  if (!siteKey) {
    return null;
  }

  window.Arkose = {};

  useEffect(() => {
    // Load Arkose API script
    const widgetScript = document.createElement("script");
    widgetScript.src = `//client-api.arkoselabs.com/v2/${siteKey}/api.js`;
    widgetScript.setAttribute("data-callback", "setupDetect");
    widgetScript.async = true;
    widgetScript.defer = true;
    document.head.appendChild(widgetScript);

    return () => {
      if (document.head.contains(widgetScript)) {
        document.head.removeChild(widgetScript);
      }
    };
  }, [siteKey]);

  function setupDetect(detectionObject: any) {
    window.Arkose = detectionObject;
    window.Arkose.setConfig({
      selector: "#arkose-trigger",
      styleTheme: "light",
      onReady: () => {
        detectionObject.run();
      },
      onCompleted: (response: any) => {
        setToken(response.token);
        const captchaResponse: CaptchaResponse = {
          provider: "arkose",
          arkoseToken: response.token,
        };
        onCaptchaResponse(captchaResponse);
      },
      onError: () => {
        onCaptchaResponse(null);
      },
    });
  }

  window.setupDetect = setupDetect;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full">
        <div id="arkose-trigger" />
        <input
          type="hidden"
          id="arkose-labs-captcha"
          name="captcha"
          value={token}
        />
      </div>
    </div>
  );
};

export default ArkoseWidget;
