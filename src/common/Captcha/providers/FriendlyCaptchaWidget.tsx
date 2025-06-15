import React, { useEffect, useRef } from "react";
import { WidgetInstance } from "friendly-challenge";
import type { CaptchaWidgetProps, CaptchaResponse } from "../index";
import { cn } from "@/utils/helpers/cn";

const FriendlyCaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  className = "",
}) => {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<WidgetInstance | null>(null);

  if (config.provider !== "friendly_captcha") {
    return null;
  }

  const siteKey = config.siteKey;

  useEffect(() => {
    if (!widget.current && container.current) {
      // Create the FriendlyCaptcha widget instance
      widget.current = new WidgetInstance(container.current, {
        sitekey: siteKey,
        doneCallback: (solution: string) => {
          const response: CaptchaResponse = {
            provider: "friendly_captcha",
            token: solution,
          };
          onCaptchaResponse(response);
        },
        errorCallback: (error: any) => {
          console.error("FriendlyCaptcha error:", error);
          onCaptchaResponse(null);
        },
      });
    }

    return () => {
      if (widget.current) {
        widget.current.reset();
      }
    };
  }, [siteKey, onCaptchaResponse]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full">
        <div
          ref={container}
          className="frc-captcha"
          data-sitekey={siteKey}
          data-solution-field-name="captcha"
        />
        <input
          type="hidden"
          name="captcha"
          id="hidden-friendly-captcha"
          value=""
        />
      </div>
    </div>
  );
};

export default FriendlyCaptchaWidget;
