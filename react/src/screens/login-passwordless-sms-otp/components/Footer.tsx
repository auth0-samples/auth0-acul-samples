import { useResend } from "@auth0/auth0-acul-react/login-passwordless-sms-otp";

import { ULThemeButton } from "@/components/ULThemeButton";
import { translate } from "@/utils/helpers/localeTranslate";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

function Footer() {
  const { texts, locales, handleResendOTP } =
    useLoginPasswordlessSmsOtpManager();

  // Use locales as fallback for SDK texts
  const resendText = texts?.resendText || locales.footer.resendActionText;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resendActionLinkText;

  const { remaining, disabled } = useResend({
    timeoutSeconds: 30,
  });

  const handleResendClick = async () => {
    await handleResendOTP();
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
