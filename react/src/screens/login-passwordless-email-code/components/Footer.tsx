import { useResend } from "@auth0/auth0-acul-react/login-passwordless-email-code";

import { ULThemeButton } from "@/components/ULThemeButton";
import { translate } from "@/utils/helpers/localeTranslate";

import { useLoginPasswordlessEmailCodeManager } from "../hooks/useLoginPasswordlessEmailCodeManager";

function Footer() {
  const { texts, locales, handleResendEmailCode } =
    useLoginPasswordlessEmailCodeManager();

  // Use locales as fallback for SDK texts
  const resendText = texts?.resendText || locales.footer.resendActionText;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resendActionLinkText;

  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 30,
  });

  const handleResendClick = async () => {
    await handleResendEmailCode();
    startResend();
  };

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {resendText}
      </span>
      <ULThemeButton
        variant="link"
        size="link"
        disabled={disabled}
        onClick={handleResendClick}
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
  );
}

export default Footer;
