import ULThemeLink from "@/components/ULThemeLink";

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
        <ULThemeLink
          href="javascript:void(0)"
          onClick={() => handleResendEmail()}
        >
          {footerLinkResendText}
        </ULThemeLink>
      )}
      {footerLinkTryAnotherMethodText && (
        <ULThemeLink
          href="javascript:void(0)"
          onClick={() => handleTryAnotherMethod()}
        >
          {footerLinkTryAnotherMethodText}
        </ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
