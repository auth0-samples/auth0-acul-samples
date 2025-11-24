import React, { useCallback, useEffect, useRef, useState } from "react";

import { WidgetInstance } from "friendly-challenge";

import { cn } from "@/lib/utils";
import { getCaptchaTheme } from "@/utils/theme/themeEngine";

import type { CaptchaResponse, CaptchaWidgetProps } from "../index";

declare global {
  interface Window {
    friendlyChallenge: {
      autoWidget: WidgetInstance | null;
    };
  }
}

const FRIENDLY_CAPTCHA_PROVIDER = "friendly_captcha";

const FriendlyCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
  error,
  theme,
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<WidgetInstance | null>(null);

  const siteKey = config.siteKey;
  const isFriendlyCaptcha = config.provider === FRIENDLY_CAPTCHA_PROVIDER;

  const handleDone = useCallback(
    (solution: string) => {
      setToken(solution);
      setErrorMessage(undefined);

      const response: CaptchaResponse = {
        provider: FRIENDLY_CAPTCHA_PROVIDER,
        token: solution,
      };
      onCaptchaResponse(response);
    },
    [onCaptchaResponse]
  );

  const handleError = useCallback(() => {
    setToken(undefined);
    onCaptchaResponse(null);
  }, [onCaptchaResponse]);

  // Client-only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update error state when props change
  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  // Load the script and initialize the widget
  useEffect(() => {
    if (
      !isClient ||
      !isFriendlyCaptcha ||
      !siteKey ||
      !containerRef.current ||
      widgetRef.current
    )
      return;

    const scriptAlreadyLoaded = !!window.friendlyChallenge;

    const initWidget = () => {
      widgetRef.current = new WidgetInstance(containerRef.current!, {
        sitekey: siteKey,
        doneCallback: handleDone,
        errorCallback: handleError,
      });
    };

    if (scriptAlreadyLoaded) {
      initWidget();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.min.js";
      script.async = true;
      script.onload = () => {
        initWidget();
      };
      document.head.appendChild(script);
    }
  }, [isClient, isFriendlyCaptcha, siteKey, handleDone, handleError]);

  if (!isClient || !isFriendlyCaptcha || !siteKey) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "w-full rounded-[3px]",
          errorMessage
            ? "border border-[#d93025] overflow-hidden"
            : "border border-[#d3d3d3] overflow-auto"
        )}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            data-testid="friendly-captcha-container"
            ref={containerRef}
            className={`frc-captcha ${getCaptchaTheme(theme)}`}
            data-sitekey={siteKey}
            style={{ transform: "scale(1.02)", transformOrigin: "0 0" }}
          />
        </form>
      </div>
      <input
        type="hidden"
        name="friendly-challenge-response"
        id="hidden-friendly-captcha"
        value={token || ""}
      />
    </div>
  );
};

export default FriendlyCaptchaWidget;
