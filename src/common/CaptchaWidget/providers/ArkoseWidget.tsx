import React, { useEffect, useRef, useState } from "react";
import type { CaptchaWidgetProps, CaptchaResponse } from "../types";

declare global {
  interface Window {
    arkoseLabs: any;
    arkoseLabsClientApi: any;
  }
}

const ArkoseWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  onError,
  className = "",
}) => {
  const arkoseRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [enforcement, setEnforcement] = useState<any>(null);

  if (config.provider !== "arkose") {
    return null;
  }

  const publicKey = config.publicKey;
  const mode = config.mode || "inline";

  useEffect(() => {
    // Load Arkose Labs script
    const loadArkose = () => {
      if (window.arkoseLabsClientApi) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://client-api.arkoselabs.com/v2/${publicKey}/api.js`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        onError?.("Failed to load Arkose Labs script");
      };

      document.head.appendChild(script);
    };

    loadArkose();

    return () => {
      // Cleanup
      if (enforcement) {
        try {
          enforcement.destroy();
        } catch (e) {
          console.warn("Error destroying Arkose Labs:", e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (
      isLoaded &&
      arkoseRef.current &&
      !enforcement &&
      window.arkoseLabsClientApi
    ) {
      try {
        const enforcementInstance = new window.arkoseLabsClientApi({
          public_key: publicKey,
          target_html: arkoseRef.current,
          mode: mode,
          onCompleted: (response: any) => {
            const captchaResponse: CaptchaResponse = {
              provider: "arkose",
              arkoseToken: response.token,
            };
            onCaptchaResponse(captchaResponse);
          },
          onError: (error: any) => {
            console.error("Arkose Labs error:", error);
            onError?.("Arkose Labs challenge failed");
            onCaptchaResponse(null);
          },
          onSuppress: () => {
            // Challenge was suppressed (user likely passed)
            const captchaResponse: CaptchaResponse = {
              provider: "arkose",
              arkoseToken: "suppressed",
            };
            onCaptchaResponse(captchaResponse);
          },
        });

        setEnforcement(enforcementInstance);
      } catch (error) {
        console.error("Error initializing Arkose Labs:", error);
        onError?.("Failed to initialize Arkose Labs");
      }
    }
  }, [isLoaded, publicKey, mode, onCaptchaResponse, onError, enforcement]);

  return (
    <div className={`arkose-container ${className}`}>
      <div ref={arkoseRef}></div>
    </div>
  );
};

export default ArkoseWidget;
