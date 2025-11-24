import { ULThemeButton } from "@/components/ULThemeButton";
import { translate } from "@/utils/helpers/localeTranslate";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function Footer() {
  const {
    texts,
    handleResendEmail,
    handleTryAnotherMethod,
    locales,
    useResend,
  } = useMfaEmailChallengeManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || locales.footer.resendText;
  const footerLinkResendText =
    texts?.resendActionText || locales.footer.resendActionText;
  const footerLinkTryAnotherMethodText =
    texts?.tryAnotherMethodText || locales.footer.tryAnotherMethodText;

  const { remaining, disabled } = useResend({
    timeoutSeconds: 30,
  });

  const handleResendClick = async () => {
    await handleResendEmail();
  };

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {footerLinkResendText && (
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
            : footerLinkResendText}
        </ULThemeButton>
      )}
      {footerLinkTryAnotherMethodText && (
        <ULThemeButton
          onClick={() => handleTryAnotherMethod()}
          variant="link"
          size="link"
        >
          {footerLinkTryAnotherMethodText}
        </ULThemeButton>
      )}
    </div>
  );
}

export default Footer;
