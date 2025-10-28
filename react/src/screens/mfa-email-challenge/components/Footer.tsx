import { ULThemeButton } from "@/components/ULThemeButton";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function Footer() {
  const { texts, handleResendEmail, handleTryAnotherMethod } =
    useMfaEmailChallengeManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || "Didn't receive an email?";
  const footerLinkResendText = texts?.resendActionText || "Resend";
  const footerLinkTryAnotherMethodText =
    texts?.pickAuthenticatorText || "Try another method";

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {footerLinkResendText && (
        <ULThemeButton
          onClick={() => handleResendEmail()}
          variant="link"
          size="link"
        >
          {footerLinkResendText}
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
