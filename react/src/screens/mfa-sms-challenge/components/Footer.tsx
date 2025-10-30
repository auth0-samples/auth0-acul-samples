import { useResend } from "@auth0/auth0-acul-react/mfa-sms-challenge";

import { ULThemeButton } from "@/components/ULThemeButton";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Footer() {
  const {
    texts,
    data,
    handleResendCode,
    handleGetACall,
    handleTryAnotherMethod,
    locales,
  } = useMfaSmsChallengeManager();

  // Use the resend hook for managing cooldown
  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 30,
  });

  const resendText = texts?.resendText || locales.footer.resend.text;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resend.linkText;
  const getCallText =
    texts?.resendVoiceActionText || locales.footer.resend.getCall;
  const separatorText =
    texts?.resendVoiceActionSeparatorTextBefore ||
    locales.footer.resend.separator;
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || locales.footer.tryAnother;

  const handleResendClick = async () => {
    startResend();
    await handleResendCode();
  };

  const handleGetCallClick = async () => {
    await handleGetACall();
  };

  const handleTryAnotherMethodClick = async () => {
    await handleTryAnotherMethod();
  };

  return (
    <div className="text-center mt-4">
      {/* Resend code link with optional get a call */}
      <div className="mb-2">
        <span className="text-(length:--ul-theme-font-body-text-size) font-body">
          {resendText}{" "}
        </span>
        <ULThemeButton
          onClick={handleResendClick}
          variant="link"
          size="link"
          disabled={disabled}
        >
          {disabled ? `${resendLinkText} in ${remaining}s` : resendLinkText}
        </ULThemeButton>
        {data?.showLinkVoice && (
          <>
            <span className="text-(length:--ul-theme-font-body-text-size) font-body">
              {" "}
              {separatorText}{" "}
            </span>
            <ULThemeButton
              onClick={handleGetCallClick}
              variant="link"
              size="link"
            >
              {getCallText}
            </ULThemeButton>
          </>
        )}
      </div>

      {/* Try another method link */}
      <div>
        <ULThemeButton
          onClick={handleTryAnotherMethodClick}
          variant="link"
          size="link"
        >
          {tryAnotherMethodText}
        </ULThemeButton>
      </div>
    </div>
  );
}

export default Footer;
