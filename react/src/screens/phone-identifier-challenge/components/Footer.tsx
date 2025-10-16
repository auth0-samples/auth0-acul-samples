import { useState } from "react";

import { ULThemeButton } from "@/components/ULThemeButton";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function Footer() {
  const { texts, handleResendCode, handleReturnToPrevious } =
    usePhoneIdentifierChallengeManager();

  const [hasResent, setHasResent] = useState(false);

  const resendText = texts?.resendText || "Didn't receive a code?";
  const resendLinkText = texts?.resendActionText || "Resend";
  const resendLimitReachedText =
    texts?.resendLimitReachedText || "Code has been resent.";
  const backButtonText = texts?.backButtonText || "Go back";

  const handleResendClick = async () => {
    await handleResendCode();
    setHasResent(true);
  };

  const handleReturnClick = async () => {
    await handleReturnToPrevious();
  };

  return (
    <div className="text-center space-y-4 mt-4">
      {/* Resend code section */}
      <div>
        {!hasResent ? (
          <>
            <span className="text-(length:--ul-theme-font-body-text-size) font-body">
              {resendText}{" "}
            </span>
            <ULThemeButton
              onClick={handleResendClick}
              variant="link"
              size="link"
            >
              {resendLinkText}
            </ULThemeButton>
          </>
        ) : (
          <span className="text-(length:--ul-theme-font-body-text-size) font-body">
            {resendLimitReachedText}
          </span>
        )}
      </div>

      {/* Go back button */}
      <div>
        <ULThemeButton onClick={handleReturnClick} variant="link" size="link">
          {backButtonText}
        </ULThemeButton>
      </div>
    </div>
  );
}

export default Footer;
