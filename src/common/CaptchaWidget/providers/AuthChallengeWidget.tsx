import React, { useState } from "react";
import FormField from "@/common/FormField";
import Button from "@/common/Button";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import { cn } from "@/utils/helpers/cn";
import type { CaptchaWidgetProps, CaptchaResponse } from "../types";

const AuthChallengeWidget: React.FC<CaptchaWidgetProps> = ({
  config,
  onCaptchaResponse,
  onError,
  className = "",
  label,
  error,
}) => {
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [isChallengeSent, setIsChallengeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (config.provider !== "auth-challenge") {
    return null;
  }

  const challengeType = config.challengeType;
  const endpoint = config.endpoint || "/api/auth/challenge";

  const displayLabel = label || `Enter ${challengeType.toUpperCase()} code*`;
  const challengeButtonText = `Send ${challengeType.toUpperCase()} Code`;

  const sendChallenge = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: challengeType,
          action: "send",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChallengeId(data.challengeId);
        setIsChallengeSent(true);
      } else {
        onError?.(`Failed to send ${challengeType} challenge`);
      }
    } catch (error) {
      console.error("Challenge send error:", error);
      onError?.(`Error sending ${challengeType} challenge`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCode(value);

    if (challengeId) {
      const response: CaptchaResponse = {
        provider: "auth-challenge",
        answer: value,
        challengeId: challengeId,
      };
      onCaptchaResponse(response);
    }
  };

  const formFieldLabelProps: LabelProps = {
    children: displayLabel,
    htmlFor: "auth-challenge-input",
  };

  const formFieldInputProps: InputProps = {
    id: "auth-challenge-input",
    name: "auth-challenge",
    type: "text",
    value: code,
    onChange: handleCodeChange,
    placeholder: "Enter verification code...",
    autoComplete: "one-time-code",
    disabled: !isChallengeSent,
  };

  return (
    <div className={cn("auth-challenge-container space-y-3", className)}>
      {/* Challenge initiation */}
      {!isChallengeSent && (
        <div className="space-y-3">
          <p className="text-body-text text-sm">
            We'll send a verification code to verify it's you.
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={sendChallenge}
            isLoading={isLoading}
            loadingText="Sending..."
            fullWidth
          >
            {challengeButtonText}
          </Button>
        </div>
      )}

      {/* Code input (appears after challenge is sent) */}
      {isChallengeSent && (
        <div className="space-y-3">
          <p className="text-body-text text-sm text-success">
            Verification code sent! Please check your{" "}
            {challengeType === "sms" ? "messages" : challengeType}.
          </p>
          <FormField
            labelProps={formFieldLabelProps}
            inputProps={formFieldInputProps}
            error={error}
          />
        </div>
      )}
    </div>
  );
};

export default AuthChallengeWidget;
