import { ULThemeButton } from "@/components/ULThemeButton";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

function Footer() {
  const { texts, handleResendOTP } = useLoginPasswordlessSmsOtpManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || "Didn't receive a code?";
  const footerLinkText = texts?.resendActionText || "Resend";

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
