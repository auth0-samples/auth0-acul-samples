import { ULThemeButton } from "@/components/ULThemeButton";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Footer() {
  const {
    texts,
    data,
    handleResendCode,
    handleGetACall,
    handleTryAnotherMethod,
  } = useMfaSmsChallengeManager();

  const resendText = texts?.resendText || "Didn't receive a code?";
  const resendLinkText = texts?.resendActionText || "Resend";
  const getCallText = texts?.resendVoiceActionText || "get a call";
  const separatorText = texts?.resendVoiceActionSeparatorTextBefore || "or";
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || "Try another method";

  const handleResendClick = async () => {
    await handleResendCode();
  };

  const handleGetCallClick = async () => {
    await handleGetACall();
  };

  const handleTryAnotherMethodClick = async () => {
    await handleTryAnotherMethod();
  };

  return (
    <div className="text-center space-y-2 mt-4">
      {/* Resend code link with optional get a call */}
      <span className="text-(length:--ul-theme-font-body-text-size) font-body">
        {resendText}{" "}
      </span>
      <ULThemeButton onClick={handleResendClick} variant="link" size="link">
        {resendLinkText}
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

      {/* Try another method link */}
      <ULThemeButton
        onClick={handleTryAnotherMethodClick}
        variant="link"
        size="link"
      >
        {tryAnotherMethodText}
      </ULThemeButton>
    </div>
  );
}

export default Footer;
