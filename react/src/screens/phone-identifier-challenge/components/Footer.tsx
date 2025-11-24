import { ULThemeButton } from "@/components/ULThemeButton";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function Footer() {
  const {
    texts,
    handleResendCode,
    handleReturnToPrevious,
    locales,
    useResend,
  } = usePhoneIdentifierChallengeManager();

  const { disabled } = useResend({
    timeoutSeconds: 10,
  });

  const resendText = texts?.resendText || locales.footer.resendCodeText;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resendButtonText;
  const resendLimitReachedText =
    texts?.resendLimitReachedText || locales.footer.limitReachedText;
  const backButtonText = texts?.backButtonText || locales.footer.backButtonText;

  const handleResendClick = async () => {
    await handleResendCode();
  };

  const handleReturnClick = async () => {
    await handleReturnToPrevious();
  };

  return (
    <div className="text-center space-y-4 mt-4">
      {/* Resend code section */}
      <div>
        {!disabled ? (
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
      {disabled && (
        <div>
          <ULThemeButton onClick={handleReturnClick} variant="link" size="link">
            {backButtonText}
          </ULThemeButton>
        </div>
      )}
    </div>
  );
}

export default Footer;
