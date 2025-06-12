import React, { useEffect, useRef, useState } from "react";
import type { CaptchaWidgetProps, CaptchaResponse } from "../types";

declare global {
  interface Window {
    hcaptcha: any;
  }
}

const HCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  onError,
  className = "",
}) => {
  const hcaptchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  if (config.provider !== "hcaptcha") {
    return null;
  }

  const siteKey = config.siteKey;
  const theme = config.theme || "light";
  const size = config.size || "normal";

  useEffect(() => {
    // Load hCaptcha script
    const loadHCaptcha = () => {
      if (window.hcaptcha) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://js.hcaptcha.com/1/api.js?onload=onHCaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;

      // Global callback for when hCaptcha loads
      (window as any).onHCaptchaLoad = () => {
        setIsLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadHCaptcha();

    return () => {
      // Cleanup
      if (widgetId && window.hcaptcha) {
        try {
          window.hcaptcha.remove(widgetId);
        } catch (e) {
          console.warn("Error removing hCaptcha:", e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && hcaptchaRef.current && !widgetId) {
      try {
        const id = window.hcaptcha.render(hcaptchaRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: (token: string) => {
            const response: CaptchaResponse = {
              provider: "hcaptcha",
              token,
            };
            onCaptchaResponse(response);
          },
          "expired-callback": () => {
            onCaptchaResponse(null);
          },
          "error-callback": () => {
            onError?.("hCaptcha error occurred");
            onCaptchaResponse(null);
          },
        });
        setWidgetId(id);
      } catch (error) {
        console.error("Error rendering hCaptcha:", error);
        onError?.("Failed to render hCaptcha");
      }
    }
  }, [isLoaded, siteKey, theme, size, onCaptchaResponse, onError, widgetId]);

  return (
    <div className={`hcaptcha-container ${className}`}>
      <div ref={hcaptchaRef}></div>
    </div>
  );
};

export default HCaptchaWidget;
