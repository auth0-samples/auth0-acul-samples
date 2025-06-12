import React, { useEffect, useRef, useState } from "react";
import type { CaptchaWidgetProps, CaptchaResponse } from "../types";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const RecaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  onError,
  className = "",
}) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);

  if (config.provider !== "recaptcha") {
    return null;
  }

  const siteKey = config.siteKey;
  const theme = config.theme || "light";
  const size = config.size || "normal";

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;

      // Global callback for when reCAPTCHA loads
      (window as any).onRecaptchaLoad = () => {
        setIsLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadRecaptcha();

    return () => {
      // Cleanup
      if (widgetId !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetId);
        } catch (e) {
          console.warn("Error resetting reCAPTCHA:", e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && recaptchaRef.current && !widgetId) {
      try {
        const id = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: (token: string) => {
            const response: CaptchaResponse = {
              provider: "recaptcha",
              token,
            };
            onCaptchaResponse(response);
          },
          "expired-callback": () => {
            onCaptchaResponse(null);
          },
          "error-callback": () => {
            onError?.("reCAPTCHA error occurred");
            onCaptchaResponse(null);
          },
        });
        setWidgetId(id);
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        onError?.("Failed to render reCAPTCHA");
      }
    }
  }, [isLoaded, siteKey, theme, size, onCaptchaResponse, onError, widgetId]);

  return (
    <div className={`recaptcha-container ${className}`}>
      <div ref={recaptchaRef}></div>
    </div>
  );
};

export default RecaptchaWidget;
