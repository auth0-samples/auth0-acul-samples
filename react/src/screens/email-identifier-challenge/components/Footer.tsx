import { useResend } from "@auth0/auth0-acul-react/email-identifier-challenge";

import { ULThemeButton } from "@/components/ULThemeButton";
import { translate } from "@/utils/helpers/localeTranslate";

import { useEmailIdentifierChallengeManager } from "../hooks/useEmailIdentifierChallengeManager";

function Footer() {
  const { texts, handleResendCode, handleReturnToPrevious, locales } =
    useEmailIdentifierChallengeManager();

  const { remaining, disabled } = useResend({
    timeoutSeconds: 30,
  });

  const resendText = texts?.resendText || locales?.footer?.resendText;
  const resendLinkText =
    texts?.resendActionText || locales?.footer?.resendActionText;
  const backButtonText =
    texts?.backButtonText || locales?.footer?.backButtonText;

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
        <span className="text-(length:--ul-theme-font-body-text-size) font-body">
          {resendText}{" "}
        </span>
        <ULThemeButton
          onClick={handleResendClick}
          variant="link"
          size="link"
          disabled={disabled}
        >
          {disabled
            ? translate(
                "footer.resendCooldown",
                { seconds: String(remaining) },
                locales
              )
            : resendLinkText}
        </ULThemeButton>
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
