import { ULThemeButton } from "@/components/ULThemeButton";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

function Footer() {
  const { texts, locales, handleResendOTP } =
    useLoginPasswordlessSmsOtpManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || locales?.footer?.resendActionText;
  const footerLinkText =
    texts?.resendActionText || locales?.footer?.resendActionLinkText;

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {footerLinkText && (
        <ULThemeButton
          variant="link"
          size="link"
          onClick={() => handleResendOTP()}
        >
          {footerLinkText}
        </ULThemeButton>
      )}
    </div>
  );
}

export default Footer;
